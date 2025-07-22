import { DrupalNode, DrupalMedia, DrupalFile } from "next-drupal"

export interface NodeCreateData {
  title: string
  field_body: {
    value: string
    format: string
  }
  field_category: string
  field_images?: string[] // Array of media IDs
}

export interface ExtendedDrupalNode extends DrupalNode {
  field_body: {
    value: string
    format: string
    processed: string
  }
  field_category: string
  field_images?: DrupalMedia[]
}
