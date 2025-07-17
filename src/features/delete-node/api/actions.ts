// lib/actions.ts
"use server"

import { drupal } from "@shared/lib/drupal"
import { revalidatePath } from "next/cache"

export async function deleteNodeAction(
  nodeType: string,
  nodeId: string,
  accessToken: string
) {
  try {
    const deleted = await drupal.deleteResource(nodeType, nodeId, {
      withAuth: () => `Bearer ${accessToken}`,
    })

    // Обновляем кеш страниц
    revalidatePath("/")
    revalidatePath("/[...slug]", "page")

    return { success: true, message: "Анкета успешно удалена" }
  } catch (error) {
    console.error("Ошибка при удалении ноды:", error)
    return { success: false, message: "Не удалось удалить ноду" }
  }
}
