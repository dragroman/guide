import { JWT } from "next-auth/jwt"

// Функция для обновления токена доступа
export async function refreshAccessToken(token: JWT) {
  try {
    const formData = new URLSearchParams()

    if (!token.refreshToken) {
      console.error("Отсутствует refresh token")
      return {
        ...token,
        error: "NoRefreshToken",
      }
    }

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
  }
}
