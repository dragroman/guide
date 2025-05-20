// types/next-auth.d.ts
import { DefaultSession } from "next-auth"
import { DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
  /**
   * Расширяем тип Session
   */
  interface Session extends DefaultSession {
    accessToken: string
    refreshToken: string
    error?: string
    user: {
      id?: string | number | null
      name?: string | null
      email?: string | null
      image?: string | null
      username?: string
    } & DefaultSession["user"]
  }

  /**
   * Расширяем тип User для более точной типизации
   */
  interface User {
    access_token: string
    expires_in: number
    refresh_token: string
    user?: any
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    uuid: string
    accessToken?: string
    accessTokenExpires?: number
    refreshToken: string
    error?: string
    email?: string
    username?: string
  }
}
