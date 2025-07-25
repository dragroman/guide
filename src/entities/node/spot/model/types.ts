import { TCityTeaser } from "@entities/term/city"
import {
  DrupalFile,
  DrupalMedia,
  DrupalNode,
  DrupalParagraph,
  DrupalTaxonomyTerm,
} from "next-drupal"

export interface TSpotDefaultTeaser extends DrupalNode {
  field_category: DrupalTaxonomyTerm
  field_location: TCityTeaser
  field_address_cn?: string
  field_name_cn?: string
  field_cuisine_type: string
  field_images: {
    field_media_image: DrupalFile
  }[]
}

export interface TSpotDefaultFull extends TSpotDefaultTeaser {
  field_body: DrupalParagraph[]
}
