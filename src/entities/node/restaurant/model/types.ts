import { TCityTeaser } from "@entities/term/city"
import { DrupalNode, DrupalParagraph, DrupalTaxonomyTerm } from "next-drupal"

export interface TRestaurantFull extends DrupalNode {
  field_category: DrupalTaxonomyTerm
  field_location: TCityTeaser
  field_body: DrupalParagraph[]
  field_address_cn?: string
  field_name_cn?: string
  field_phone?: string
}

export interface TRestaurantTeaser extends DrupalNode {
  field_category: string
  field_location: string
  field_address_cn?: string
  field_name_cn?: string
}
