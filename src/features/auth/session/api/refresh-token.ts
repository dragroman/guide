// src/features/auth/session/api/refresh-token.ts
import { JWT } from "next-auth/jwt"
import { Redis } from "ioredis"

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379")

export async function refreshAccessToken(token: JWT): Promise<JWT> {
  const userKey = token.userId || token.sub || "anonymous"
  const lockKey = `refresh_lock:${userKey}`
  const lockTimeout = 30

  try {
    // Сначала проверим кэшированный токен
    const cachedToken = await redis.get(`token_cache:${userKey}`)
    if (cachedToken) {
      const parsed = JSON.parse(cachedToken)
      if (parsed.accessTokenExpires > Date.now()) {
        return { ...token, ...parsed, error: undefined }
      }
    }

    // Попытка получить блокировку
    const lockResult = await redis.set(
      lockKey,
      "locked",
      "EX",
      lockTimeout,
      "NX"
    )

    if (!lockResult) {
      let attempts = 0
      while (attempts < 15) {
        // Максимум 3 секунды ожидания
        await new Promise((resolve) => setTimeout(resolve, 200))
        const lockExists = await redis.exists(lockKey)
        if (!lockExists) break
        attempts++
      }
      return token
    }

    const formData = new URLSearchParams()
    formData.append("grant_type", "refresh_token")
    formData.append("client_id", process.env.DRUPAL_USER_CLIENT_ID as string)
    formData.append(
      "client_secret",
      process.env.DRUPAL_USER_CLIENT_SECRET as string
    )
    formData.append("refresh_token", token.refreshToken)
    formData.append("scope", "authenticated")

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/oauth/token`,
      {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        signal: AbortSignal.timeout(10000),
      }
    )
    const refreshedTokens = await response.json()

    if (!response.ok) {
      console.error(
        `[RefreshToken] Ошибка ${response.status}:`,
        refreshedTokens
      )

      if (
        refreshedTokens.error === "invalid_grant" ||
        refreshedTokens.error === "invalid_scope" ||
        response.status === 400
      ) {
        return {
          ...token,
          error: "SessionExpired",
        }
      }

      throw new Error(`Token refresh failed: ${refreshedTokens.error}`)
    }

    const newExpiry = Date.now() + refreshedTokens.expires_in * 1000

    // Кэшируем новый токен в Redis для других процессов
    const tokenData = {
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: newExpiry,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    }

    await redis.setex(`token_cache:${userKey}`, 300, JSON.stringify(tokenData))

    return {
      ...token,
      ...tokenData,
      error: undefined,
    }
  } catch (error) {
    console.error("[RefreshToken] ❌ Критическая ошибка:", error)
    return {
      ...token,
      error: "RefreshAccessTokenError",
    }
  } finally {
    await redis.del(lockKey)
  }
}
