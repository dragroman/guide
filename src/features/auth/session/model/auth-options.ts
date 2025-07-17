import { jwtDecode } from "jwt-decode"
import CredentialsProvider from "next-auth/providers/credentials"
import { drupal } from "@shared/lib/drupal"
import type { NextAuthOptions } from "next-auth"
import { DrupalUser } from "next-drupal"
import { refreshAccessToken } from "../api/refresh-token"

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

          console.log(data)

          if (response.ok && data?.access_token) {
            const decoded = jwtDecode<{ id: string; lang: string }>(
              data.access_token
            )

            return {
              ...data,
              user: {
                id: decoded.id,
                lang: decoded.lang,
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
        // Сохраняем токены
        token.accessToken = user.access_token
        token.accessTokenExpires = Date.now() + user.expires_in * 1000
        token.refreshToken = user.refresh_token
        token.userId = user.user?.id
        token.lang = user.user?.lang
      }

      // Если токен не истек или время истечения не определено, возвращаем его
      if (token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
        return token
      }

      const refreshedToken = await refreshAccessToken(token)

      // Если токен истек, обновляем его
      return refreshedToken
    },

    async session({ session, token }) {
      if (token?.accessToken) {
        session.accessToken = token.accessToken
        session.refreshToken = token.refreshToken || ""
        if (typeof token.userId === "string") {
          session.userId = token.userId
        }

        if (typeof token.lang === "string") {
          session.lang = token.lang
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
