// types/next-auth.d.ts
import { DefaultSession } from "next-auth"
import { DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string
      email?: string
      lang: string
      roles: string[]
    } & DefaultSession["user"]
    accessToken: string
    refreshToken: string
    error?: string
  }

  interface User {
    access_token: string
    refresh_token: string
    expires_in: number
    user: {
      id: string
      name?: string
      email?: string
      lang: string
      roles: string[]
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string
    accessTokenExpires?: number
    refreshToken: string
    userId: string
    userName?: string
    userEmail?: string
    lang?: string
    roles?: string[]
    lastRefresh?: number
    error?: string
  }
}
