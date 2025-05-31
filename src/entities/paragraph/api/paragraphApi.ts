// entities/paragraph/model/api.ts

import { NextDrupal } from "next-drupal"
import type {
  CreateParagraphData,
  ParagraphReference,
  Paragraph,
} from "../model/types"

// Маппинг типов параграфов для Drupal
const PARAGRAPH_TYPE_MAP: Record<string, string> = {
  text: "paragraph--text",
  image: "paragraph--image",
  text_image: "paragraph--text_image",
  gallery: "paragraph--gallery",
  video: "paragraph--video",
  quote: "paragraph--quote",
}

/**
 * Создает параграфы в Drupal
 * @param drupal - Экземпляр NextDrupal клиента
 * @param paragraphs - Массив данных для создания параграфов
 * @returns Массив ID созданных параграфов
 */
export async function createParagraphs(
  drupal: NextDrupal,
  paragraphs: CreateParagraphData[]
): Promise<string[]> {
  const createdIds: string[] = []

  try {
    for (const paragraphData of paragraphs) {
      const drupalType = PARAGRAPH_TYPE_MAP[paragraphData.type]

      if (!drupalType) {
        throw new Error(`Неизвестный тип параграфа: ${paragraphData.type}`)
      }

      const requestData = mapParagraphDataToDrupal(paragraphData, drupalType)

      const created = await drupal.createResource(drupalType, requestData, {
        withAuth: true,
      })

      createdIds.push(created.id)
    }

    return createdIds
  } catch (error) {
    // Откат транзакции - удаляем созданные параграфы
    for (const id of createdIds) {
      try {
        const type = PARAGRAPH_TYPE_MAP[paragraphs[createdIds.indexOf(id)].type]
        await drupal.deleteResource(type, id, { withAuth: true })
      } catch (deleteError) {
        console.error("Ошибка при откате параграфа:", deleteError)
      }
    }

    throw error
  }
}

/**
 * Маппинг данных параграфа для Drupal JSON:API
 */
function mapParagraphDataToDrupal(
  data: CreateParagraphData,
  drupalType: string
): any {
  const baseData = {
    data: {
      type: drupalType,
      attributes: {
        status: true,
      },
      relationships: {},
    },
  }

  switch (data.type) {
    case "text":
      return {
        ...baseData,
        data: {
          ...baseData.data,
          attributes: {
            ...baseData.data.attributes,
            field_title: data.title,
            field_body: {
              value: data.body,
              format: data.format || "full_html",
            },
          },
        },
      }

    case "image":
      return {
        ...baseData,
        data: {
          ...baseData.data,
          attributes: {
            ...baseData.data.attributes,
            field_title: data.title,
            field_image_alt: data.alt,
            field_image_title: data.imageTitle,
          },
          relationships: {
            field_image: {
              data: {
                type: "media--image",
                id: data.imageId,
              },
            },
          },
        },
      }

    case "text_image":
      return {
        ...baseData,
        data: {
          ...baseData.data,
          attributes: {
            ...baseData.data.attributes,
            field_title: data.title,
            field_body: {
              value: data.body,
              format: data.format || "full_html",
            },
            field_image_position: data.imagePosition || "right",
          },
          relationships: {
            field_image: {
              data: {
                type: "media--image",
                id: data.imageId,
              },
            },
          },
        },
      }

    case "gallery":
      return {
        ...baseData,
        data: {
          ...baseData.data,
          attributes: {
            ...baseData.data.attributes,
            field_title: data.title,
            field_columns: data.columns || 3,
          },
          relationships: {
            field_images: {
              data: data.imageIds.map((id) => ({
                type: "media--image",
                id,
              })),
            },
          },
        },
      }

    case "video":
      const videoData: any = {
        ...baseData,
        data: {
          ...baseData.data,
          attributes: {
            ...baseData.data.attributes,
            field_title: data.title,
            field_video_caption: data.caption,
          },
        },
      }

      if (data.videoUrl) {
        videoData.data.attributes.field_video_url = data.videoUrl
      }

      if (data.videoFileId) {
        videoData.data.relationships.field_video_file = {
          data: {
            type: "media--video",
            id: data.videoFileId,
          },
        }
      }

      return videoData

    case "quote":
      return {
        ...baseData,
        data: {
          ...baseData.data,
          attributes: {
            ...baseData.data.attributes,
            field_quote_text: data.quoteText,
            field_quote_author: data.author,
            field_quote_source: data.source,
          },
        },
      }

    default:
      throw new Error(`Неподдерживаемый тип параграфа`)
  }
}

/**
 * Создает ссылки на параграфы для связывания с узлом
 */
export function createParagraphReferences(
  paragraphIds: string[],
  paragraphTypes: string[]
): ParagraphReference[] {
  return paragraphIds.map((id, index) => ({
    type: PARAGRAPH_TYPE_MAP[paragraphTypes[index]],
    id,
    meta: {
      target_revision_id: null,
    },
  }))
}

/**
 * Получает параграфы с включенными медиа
 */
export async function getParagraphsWithMedia(
  drupal: NextDrupal,
  nodeType: string,
  nodeId: string,
  fieldName: string = "field_body"
): Promise<Paragraph[]> {
  const params = {
    include: `${fieldName},${fieldName}.field_image,${fieldName}.field_image.field_media_image,${fieldName}.field_images,${fieldName}.field_images.field_media_image,${fieldName}.field_video_file,${fieldName}.field_video_file.field_media_video_file`,
  }

  const node = await drupal.getResource(nodeType, nodeId, {
    params,
    withAuth: false,
  })

  return node[fieldName] || []
}
