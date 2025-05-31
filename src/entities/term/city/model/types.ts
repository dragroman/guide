import { DrupalTaxonomyTerm } from "next-drupal"

export interface TCityFull extends DrupalTaxonomyTerm {
  field_title_cn: string
  machine_name: string
  field_select_text?: string
  image?: {
    url: string
    alt?: string
  }
}

export interface TCityTeaser extends DrupalTaxonomyTerm {
  field_title_cn: string
  machine_name: string
}

export interface City {
  id: string
  internalId?: number
  name: string
  machine_name?: string
}

export interface LocationData {
  id: string
  name: string
  machine_name: string
  field_title_cn?: string
  field_select_text?: string
  image?: {
    url: string
    alt?: string
  }
}

export interface LocationApiResponse {
  data: LocationData
}
