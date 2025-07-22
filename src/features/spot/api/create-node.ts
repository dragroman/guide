"use server"

import { drupal } from "@shared/lib/drupal"
import { revalidatePath } from "next/cache"
import { DrupalMedia, DrupalFile } from "next-drupal"
import { NodeCreateData } from "../model/types"

export async function createMediaFromFile(
  file: File,
  alt?: string
): Promise<DrupalMedia> {
  try {
    // Создаем файл
    const fileBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(fileBuffer)
    const drupalFile = (await drupal.createFileResource(
      "file--file",
      {
        data: {
          attributes: {
            type: "media--image",
            field: "field_media_image",
            filename: file.name,
            file: buffer,
          },
        },
      },
      {
        withAuth: true,
      }
    )) as DrupalFile

    // Создаем медиа-сущность
    const media = await drupal.createResource<DrupalMedia>(
      "media--image",
      {
        data: {
          attributes: {
            name: file.name,
          },
          relationships: {
            field_media_image: {
              data: {
                type: "file--file",
                id: drupalFile.id,
              },
            },
          },
        },
      },
      {
        withAuth: true,
      }
    )

    return media
  } catch (error) {
    console.error("Ошибка создания медиа:", error)
    throw new Error("Не удалось загрузить файл")
  }
}

export async function createNode(data: NodeCreateData) {
  try {
    const nodeData: any = {
      data: {
        attributes: {
          title: data.title,
          field_body: data.field_body,
          field_category: data.field_category,
        },
      },
    }

    // Добавляем связи с изображениями если они есть
    if (data.field_images && data.field_images.length > 0) {
      nodeData.data.relationships = {
        field_images: {
          data: data.field_images.map((id) => ({
            type: "media--image",
            id: id,
          })),
        },
      }
    }

    const node = await drupal.createResource("node--article", nodeData, {
      withAuth: true,
    })

    revalidatePath("/")

    return {
      success: true,
      node,
      message: "Материал успешно создан",
    }
  } catch (error) {
    console.error("Ошибка создания материала:", error)
    return {
      success: false,
      error: "Не удалось создать материал. Попробуйте еще раз.",
    }
  }
}
