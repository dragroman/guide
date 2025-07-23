// src/features/auth/session/model/auth-options.ts
import { jwtDecode } from "jwt-decode"
import CredentialsProvider from "next-auth/providers/credentials"
import type { NextAuthOptions, Session } from "next-auth"
import { refreshAccessToken } from "../api/refresh-token"

interface JWTPayload {
  id: string
  name: string
  email: string
  lang: string
  roles: string[]
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
        formData.append("scope", "authenticated")

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
            const decoded = jwtDecode<JWTPayload>(data.access_token)

            return {
              ...data,
              user: {
                id: decoded.id,
                lang: decoded.lang,
                email: decoded.email,
                roles: decoded.roles,
                name: decoded.name,
              },
            }
          }

          console.error("Авторизация не удалась:", data)
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
        token.roles = user.user?.roles
        token.lang = user.user?.lang
        return token
      }

      // Проверяем истечение токена с буфером
      const REFRESH_BUFFER = 5 * 60 * 1000

      if (
        token.accessTokenExpires &&
        Date.now() < token.accessTokenExpires - REFRESH_BUFFER
      ) {
        return token
      }

      return await refreshAccessToken(token)
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
          name: token.userName || "",
          email: token.userEmail || "",
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
