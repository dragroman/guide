// src/features/auth/session/api/refresh-token.ts
import { JWT } from "next-auth/jwt"
import { Redis } from "ioredis"

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379")

export async function refreshAccessToken(token: JWT) {
  const lockKey = `refresh_lock:${token.userId || token.sub}`
  const lockTimeout = 10 // секунды

  try {
    // Попытка получить блокировку
    const lockResult = await redis.set(
      lockKey,
      "locked",
      "EX",
      lockTimeout,
      "NX"
    )

    if (!lockResult) {
      // Блокировка не получена, ждем и возвращаем текущий токен
      console.log("[RefreshToken] Refresh уже выполняется, пропускаем")
      await new Promise((resolve) => setTimeout(resolve, 100))
      return token
    }

    console.log("[RefreshToken] Начинаем обновление токена")

    const formData = new URLSearchParams()
    formData.append("grant_type", "refresh_token")
    formData.append("client_id", process.env.DRUPAL_USER_CLIENT_ID as string)
    formData.append(
      "client_secret",
      process.env.DRUPAL_USER_CLIENT_SECRET as string
    )
    formData.append("refresh_token", token.refreshToken)

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

    const refreshedTokens = await response.json()

    if (!response.ok) {
      if (refreshedTokens.error === "invalid_grant") {
        return {
          ...token,
          error: "SessionExpired",
        }
      }
      throw refreshedTokens
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
      error: undefined,
    }
  } catch (error) {
    console.error("Ошибка обновления токена доступа:", error)
    return {
      ...token,
      error: "RefreshAccessTokenError",
    }
  } finally {
    // Всегда освобождаем блокировку
    await redis.del(lockKey)
  }
}
