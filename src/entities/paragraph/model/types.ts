// entities/paragraph/model/types.ts

import { TSpotDefaultTeaser } from "@entities/node/spot"
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

// Тип для создания параграфов
export interface CreateParagraphBase {
  type: string
  title?: string
}

export interface CreateParagraphText extends CreateParagraphBase {
  type: "text"
  body: string
  format?: string
}

export interface CreateParagraphImage extends CreateParagraphBase {
  type: "image"
  imageId: string
  alt?: string
  imageTitle?: string
}

export interface CreateParagraphTextImage extends CreateParagraphBase {
  type: "text_image"
  body: string
  imageId: string
  imagePosition?: "left" | "right"
  format?: string
}

export interface CreateParagraphGallery extends CreateParagraphBase {
  type: "gallery"
  imageIds: string[]
  columns?: number
}

export interface CreateParagraphVideo extends CreateParagraphBase {
  type: "video"
  videoUrl?: string
  videoFileId?: string
  caption?: string
}

export interface CreateParagraphQuote extends CreateParagraphBase {
  type: "quote"
  quoteText: string
  author?: string
  source?: string
}

export type CreateParagraphData =
  | CreateParagraphText
  | CreateParagraphImage
  | CreateParagraphTextImage
  | CreateParagraphGallery
  | CreateParagraphVideo
  | CreateParagraphQuote

// Тип для связывания параграфа с узлом
export interface ParagraphReference {
  type: string
  id: string
  meta?: {
    target_revision_id: null
  }
}

// Props для компонентов
export interface ParagraphRendererProps {
  paragraphs: Paragraph[]
  className?: string
  components?: {
    text?: React.ComponentType<TextParagraphProps>
    image?: React.ComponentType<ImageParagraphProps>
    textImage?: React.ComponentType<TextImageParagraphProps>
    gallery?: React.ComponentType<GalleryParagraphProps>
    video?: React.ComponentType<VideoParagraphProps>
    quote?: React.ComponentType<QuoteParagraphProps>
  }
}

export interface TextParagraphProps {
  paragraph: ParagraphText
  className?: string
}

export interface ImageParagraphProps {
  paragraph: ParagraphImage
  className?: string
  priority?: boolean
}

export interface TextImageParagraphProps {
  paragraph: ParagraphTextImage
  className?: string
  priority?: boolean
}

export interface GalleryParagraphProps {
  paragraph: ParagraphGallery
  className?: string
}

export interface VideoParagraphProps {
  paragraph: ParagraphVideo
  className?: string
}

export interface QuoteParagraphProps {
  paragraph: ParagraphQuote
  className?: string
}

export interface ParagraphTextData {
  type: "paragraph--text"
  field_text: {
    value: string
    format: string
  }
}

export interface ParagraphImageData {
  type: "paragraph--image"
  field_image: string // Media ID
  field_caption?: string
}

export interface ParagraphTextImageData {
  type: "paragraph--text_image"
  field_text: {
    value: string
    format: string
  }
  field_image: string // Media ID
  field_caption?: string
}

export type ParagraphData =
  | ParagraphTextData
  | ParagraphImageData
  | ParagraphTextImageData

export interface ExtendedDrupalParagraph extends DrupalParagraph {
  field_text?: {
    value: string
    format: string
    processed: string
  }
  field_image?: {
    id: string
    uri: {
      url: string
    }
    resourceIdObjMeta?: {
      alt?: string
      title?: string
    }
  }
  field_caption?: string
}

export interface TParagraphSpotDetails {
  type: "paragraph--tour_spot_details"
  drupal_internal__id: number
  field_spot: TSpotDefaultTeaser
  field_instructions?: {
    value: string
    format: string
    processed: string
  }
  field_additional_notes?: {
    value: string
    format: string
    processed: string
  }
}

export interface TParagraphTourDay {
  type: "paragraph--tour_day"
  drupal_internal__id: number
  field_day_number: number
  field_day_title?: string
  field_day_description?: {
    value: string
    format: string
    processed: string
  }
  field_day_spots: TParagraphSpotDetails[]
}
