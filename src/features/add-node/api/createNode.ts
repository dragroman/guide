"use server"

import { drupal } from "@shared/lib/drupal"
import { revalidatePath } from "next/cache"
import { DrupalMedia, DrupalFile } from "next-drupal"

import { SpotFormData } from "../model/schema"
import { getServerSession } from "next-auth"

export async function createMediaFromFile(
  file: File,
  alt?: string
): Promise<DrupalMedia> {
  const session = await getServerSession()
  if (!session) {
    throw new Error("Unauthorized")
  }
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
        withAuth: `Bearer ${session.accessToken}`,
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
        withAuth: `Bearer ${session.accessToken}`,
      }
    )

    return media
  } catch (error) {
    console.error("Ошибка создания медиа:", error)
    throw new Error("Не удалось загрузить файл")
  }
}

export async function createNode(data: SpotFormData) {
  const session = await getServerSession()
  if (!session) {
    throw new Error("Unauthorized")
  }
  try {
    const nodeData = {
      data: {
        attributes: {
          title: data.title,
          field_description: {
            format: "basic_html",
            value: data.body,
          },
          field_name_cn: data.titleZh,
          field_address_cn: data.addressZh,
          field_map_link: data.mapLinks?.map((link) => ({ uri: link.url })),
          field_opening_hours: data.workingHours,
          field_cuisine_type: data.cuisineTypes,
        },
        relationships: {
          field_category: {
            data: { type: "taxonomy_term--category", id: data.categoryId },
          },
          field_location: {
            data: { type: "taxonomy_term--location", id: data.cityId },
          },
          ...(data.images &&
            data.images.length > 0 && {
              field_images: {
                data: data.images.map((id) => ({
                  type: "media--image",
                  id: id,
                })),
              },
            }),
        },
      },
    }

    const node = await drupal.createResource("node--spot", nodeData as any, {
      withAuth: `Bearer ${session.accessToken}`,
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
