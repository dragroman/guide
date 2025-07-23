import { jwtDecode } from "jwt-decode"
import CredentialsProvider from "next-auth/providers/credentials"
import type { NextAuthOptions } from "next-auth"
import { refreshAccessToken } from "../api/refresh-token"

interface DecodedToken {
  id: string
  name?: string
  email?: string
  lang: string
  roles?: string[]
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Drupal",
      credentials: {
        username: { label: "Имя пользователя", type: "text" },
        password: { label: "Пароль", type: "password" },
      },
      async authorize(credentials) {
        const formData = new URLSearchParams()
        formData.append("grant_type", "password")
        formData.append("client_id", process.env.DRUPAL_USER_CLIENT_ID || "")
        formData.append(
          "client_secret",
          process.env.DRUPAL_USER_CLIENT_SECRET || ""
        )
        formData.append("username", credentials?.username || "")
        formData.append("password", credentials?.password || "")

        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/oauth/token`,
            {
              method: "POST",
              body: formData,
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          )

          const data = await response.json()

          if (response.ok && data?.access_token) {
            const decoded = jwtDecode<DecodedToken>(data.access_token)

            console.log(decoded)

            return {
              ...data,
              user: {
                id: decoded.id,
                name: decoded.name,
                email: decoded.email,
                lang: decoded.lang,
                roles: decoded.roles || [], // массив ролей из токена
              },
            }
          }
          return null
        } catch (error) {
          console.error("Ошибка авторизации:", error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.access_token
        token.accessTokenExpires = Date.now() + user.expires_in * 1000
        token.refreshToken = user.refresh_token
        token.userId = user.user?.id
        token.userName = user.user?.name
        token.userEmail = user.user?.email
        token.lang = user.user?.lang
        token.roles = user.user?.roles
        token.lastRefresh = Date.now()
        return token
      }

      if (token.lastRefresh && Date.now() - Number(token.lastRefresh) < 10000) {
        return token
      }

      const bufferTime = 30 * 1000
      if (
        token.accessTokenExpires &&
        Date.now() < token.accessTokenExpires - bufferTime
      ) {
        return token
      }

      if (!token.refreshToken) {
        console.error("Отсутствует refresh token")
        return { ...token, error: "NoRefreshToken" }
      }

      if (token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
        return token
      }

      const refreshedToken = await refreshAccessToken(token)
      token.lastRefresh = Date.now()

      return refreshedToken
    },

    async session({ session, token }) {
      if (!token?.accessToken || !token?.refreshToken) {
        throw new Error("Отсутствуют необходимые токены")
      }

      if (token?.accessToken) {
        session.accessToken = token.accessToken
        session.refreshToken = token.refreshToken

        // Заполняем объект user
        session.user = {
          id: token.userId || "",
          name: token.userName || null,
          email: token.userEmail || null,
          image: null,
          lang: token.lang || "en",
          roles: token.roles || [],
        }

        if (token.error && !session.error) {
          session.error = token.error
        }
      }
      return session
    },
  },
  pages: {
    signIn: "/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
}
