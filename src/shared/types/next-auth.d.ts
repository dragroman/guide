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
    user: DefaultSession["user"] & {
      id: string
      uid?: number
      firstName?: string
      lastName?: string
      phone?: string
      created?: string
      preferred_langcode: string
    }
  }

  /**
   * Расширяем тип User для более точной типизации
   */
  interface User {
    access_token: string
    refresh_token: string
    expires_in: number
    user?: any
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    accessToken?: string
    accessTokenExpires?: number
    refreshToken: string
    error?: string
    userData?: {
      id: string
      uid: number
      name: string
      email: string
      firstName?: string
      lastName?: string
      phone?: string
      created: string
      preferred_langcode: string
    }
  }
}
