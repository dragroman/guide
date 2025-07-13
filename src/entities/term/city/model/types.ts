import { DrupalTaxonomyTerm } from "next-drupal"

export interface TCityFull extends TCityTeaser {
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

export type CityPrices = {
  apt_1bed_center?: number
  apt_1bed_outside?: number
  apt_3bed_center?: number
  apt_3bed_outside?: number
  avg_monthly_salary?: number
  cigarettes?: number
  gas_1l?: number
  meal_cheap?: number
  meal_mid?: number
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
