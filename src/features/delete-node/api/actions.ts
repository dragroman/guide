// lib/actions.ts
"use server"

import { authOptions } from "@features/auth/session"
import { drupal } from "@shared/lib/drupal"
import { getServerSession, Session } from "next-auth"
import { revalidateTag } from "next/cache"

export async function deleteNodeAction(nodeType: string, nodeId: string) {
  const session = await getServerSession(authOptions)

  if (!session) {
    throw Error("Authentication failed!")
  }
  try {
    const deleted = await drupal.deleteResource(nodeType, nodeId, {
      withAuth: () => `Bearer ${session.accessToken}`,
    })

    revalidateTag(`user-applications ${session.user.id}`)

    return { success: true, message: "Анкета успешно удалена" }
  } catch (error) {
    console.error("Ошибка при удалении ноды:", error)
    return { success: false, message: "Не удалось удалить ноду" }
  }
}
