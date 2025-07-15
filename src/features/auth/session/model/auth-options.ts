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

          if (response.ok && data?.access_token) {
            const decoded = jwtDecode<{ sub: string }>(data.access_token)

            try {
              // Загружаем полные данные пользователя
              const userData = await drupal.getResourceByPath<DrupalUser>(
                `/user/${decoded.sub}`,
                {
                  params: {
                    // Указываем нужные поля
                    "fields[user--user]":
                      "drupal_internal__uid,name,mail,field_firstname,field_lastname,field_phone,status,created,preferred_langcode",
                  },
                  withAuth: {
                    access_token: data.access_token,
                    token_type: "Bearer",
                    expires_in: data.expires_in,
                  },
                }
              )

              return {
                ...data,
                user: userData,
              }
            } catch (error) {
              console.error("Ошибка загрузки профиля пользователя:", error)
              // Можно вернуть базовые данные из токена
              return {
                ...data,
                user: {
                  id: decoded.sub,
                  name: credentials?.username,
                  // остальные поля будут загружены позже
                },
              }
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

        // Сохраняем данные пользователя только если они есть
        if (user.user && typeof user.user === "object") {
          token.userData = {
            id: user.user.id,
            uid: user.user.drupal_internal__uid,
            name: user.user.name,
            email: user.user.mail,
            firstName: user.user.field_firstname || null,
            lastName: user.user.field_lastname || null,
            phone: user.user.field_phone || null,
            created: user.user.created,
            preferred_langcode: user.user.preferred_langcode,
          }
        } else {
          console.warn("No user data found in user object:", user)
        }
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

        if (token.userData) {
          session.user = {
            ...session.user,
            id: token.userData.id,
            uid: token.userData.uid,
            name: token.userData.name,
            email: token.userData.email,
            firstName: token.userData.firstName,
            lastName: token.userData.lastName,
            phone: token.userData.phone,
            created: token.userData.created,
            preferred_langcode: token.userData.preferred_langcode,
          }
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
