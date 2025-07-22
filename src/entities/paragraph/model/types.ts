// entities/paragraph/model/types.ts

import { DrupalFile, DrupalMedia, JsonApiResource } from "next-drupal"

// Базовый интерфейс для всех параграфов
export interface DrupalParagraph extends JsonApiResource {
  drupal_internal__id: number
  drupal_internal__revision_id: number
  status: boolean
  created: string
  parent_id: string
  parent_type: string
  parent_field_name: string
  behavior_settings: any[]
  default_langcode: boolean
}

// Параграф с текстом
export interface ParagraphText extends DrupalParagraph {
  type: "paragraph--text"
  field_title?: string
  field_body: {
    value: string
    format: string
    processed: string
  }
}

// Параграф с изображением
export interface ParagraphImage extends DrupalParagraph {
  type: "paragraph--image"
  field_title?: string
  field_image: DrupalMedia & {
    field_media_image: DrupalFile
  }
  field_image_alt?: string
  field_image_title?: string
}

// Параграф с текстом и изображением
export interface ParagraphTextImage extends DrupalParagraph {
  type: "paragraph--text_image"
  field_title?: string
  field_body: {
    value: string
    format: string
    processed: string
  }
  field_image: DrupalMedia & {
    field_media_image: DrupalFile
  }
  field_image_position?: "left" | "right"
}

// Параграф с галереей
export interface ParagraphGallery extends DrupalParagraph {
  type: "paragraph--gallery"
  field_title?: string
  field_images: Array<
    DrupalMedia & {
      field_media_image: DrupalFile
    }
  >
  field_columns?: number
}

// Параграф с видео
export interface ParagraphVideo extends DrupalParagraph {
  type: "paragraph--video"
  field_title?: string
  field_video_url?: string
  field_video_file?: DrupalMedia & {
    field_media_video_file: DrupalFile
  }
  field_video_caption?: string
}

// Параграф с цитатой
export interface ParagraphQuote extends DrupalParagraph {
  type: "paragraph--quote"
  field_quote_text: string
  field_quote_author?: string
  field_quote_source?: string
}

// Объединенный тип для всех параграфов
export type Paragraph =
  | ParagraphText
  | ParagraphImage
  | ParagraphTextImage
  | ParagraphGallery
  | ParagraphVideo
  | ParagraphQuote
