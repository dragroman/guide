import { DrupalMedia, DrupalNode } from "next-drupal"

export interface TNodeSpot extends DrupalNode {
  field_description: string
  field_category: string
  field_name_cn: string
  field_location: string
  field_address_cn: string
  field_phone: string
  field_opening_hours: {
    day: number
    all_day?: boolean
    starthours?: number
    endhours?: number
    comment?: string
  }
  field_images?: DrupalMedia[]
}
