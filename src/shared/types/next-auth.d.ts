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
    userId: string
    lang: string
    error?: string
  }

  /**
   * Расширяем тип User для более точной типизации
   */
  interface User extends DefaultUser {
    access_token: string
    refresh_token: string
    expires_in: number
    user?: {
      id: string
      lang: string
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    accessToken?: string
    accessTokenExpires?: number
    refreshToken: string
    error?: string
    userId?: string
    lang?: string
  }
}
