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
        // Код не меняется
        const formData = new URLSearchParams()
        formData.append("grant_type", "password")
        formData.append("client_id", process.env.DRUPAL_CLIENT_ID || "")
        formData.append("client_secret", process.env.DRUPAL_CLIENT_SECRET || "")
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

          if (response.ok && data?.access_token && data?.refresh_token) {
            const decoded = jwtDecode<{ uuid: string }>(data.access_token)
            const userId = decoded.uuid

            try {
              const userData = await drupal.getResource<DrupalUser>(
                "user--user",
                userId,
                {
                  withAuth: data.access_token,
                }
              )
              return {
                ...data,
                user: userData,
              }
            } catch (error) {
              console.error("Ошибка при получении данных пользователя:", error)
              return null
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
      // При первом входе пользователя
      if (user) {
        token.accessToken = user.access_token
        token.accessTokenExpires = Date.now() + user.expires_in * 1000
        token.refreshToken = user.refresh_token
      }

      // Если токен не истек или время истечения не определено, возвращаем его
      if (token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
        return token
      }

      // Если токен истек, обновляем его
      return refreshAccessToken(token)
    },

    async session({ session, token }) {
      if (token?.accessToken) {
        session.accessToken = token.accessToken
        session.refreshToken = token.refreshToken || ""

        try {
          const decoded = jwtDecode<{
            uuid: string
            email?: string
            username?: string
          }>(token.accessToken)
          session.user.id = decoded.uuid
          session.user.email = decoded.email || null
          session.user.username = decoded.username
        } catch (e) {
          console.error("Ошибка декодирования токена:", e)
          session.error = "TokenDecodeError"
        }

        if (token.error && !session.error) {
          session.error = token.error
        }
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
}
