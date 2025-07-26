"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "@features/auth/session"
import { revalidateTag } from "next/cache"

async function getAccessToken(): Promise<string> {
  const session = await getServerSession(authOptions)
  if (!session?.accessToken) {
    throw new Error("Пользователь не авторизован")
  }
  return session.accessToken
}

export async function addFlag(flagId: string, entityId: string) {
  const token = await getAccessToken()

  // Используем кастомный API endpoint вместо JSON:API
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/api/flagging?_format=json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        flag_id: flagId,
        entity_id: entityId,
      }),
    }
  )

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return await response.json()
}

export async function removeFlag(flagId: string, entityId: string) {
  const token = await getAccessToken()

  // Используем кастомный API endpoint вместо JSON:API
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/api/unflagging?_format=json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        flag_id: flagId,
        entity_id: entityId,
      }),
    }
  )

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return await response.json()
}
