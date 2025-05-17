interface BaseParagraph {
  id: string
  type: string
}

interface TextParagraph extends BaseParagraph {
  type: "paragraph--text"
  field_body: {
    processed: string
  }
  field_title?: string
}

interface ImageParagraph extends BaseParagraph {
  type: "paragraph--image"
  field_title?: string
  field_image: {
    uri: {
      url: string
    }
    resourceIdObjMeta?: {
      alt?: string
      title?: string
    }
  } | null
}

interface TextImageParagraph extends BaseParagraph {
  type: "paragraph--text_image"
  field_title?: string
  field_body: {
    processed: string
  }
  field_image: {
    field_media_image: {
      uri: {
        url: string
      }
    }
    resourceIdObjMeta?: {
      alt?: string
      title?: string
    }
  } | null
}
