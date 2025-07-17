import { DrupalNode } from "next-drupal"

export interface TApplicationTeaser extends DrupalNode {
  field_date_from: string
  field_date_to: string
}

export interface TApplicationFull extends TApplicationTeaser {
  field_accommodation: string[]
  field_accommodation_other: string
  field_accommodation_preferences: string[]
  field_accommodation_pref_other: string
  field_adults: number
  field_budget: number
  field_children: number
  field_cuisines: string[]
  field_cuisines_other: string
  field_days_count: number
  field_email: string
  field_expert_email: string
  field_food_preferences: string[]
  field_food_preferences_other: string
  field_infants: number
  field_name: string
  field_need_breakfast: boolean
  field_need_guide: boolean
  field_need_insurance: boolean
  field_need_visa: boolean
  field_people_count: number
  field_phone: string
  field_purpose: string[]
  field_purpose_other: string
  field_seniors: number
  field_shopping_budget: string
  field_shopping_places: string[]
  field_shopping_places_other: string
  field_shopping_special_wishes: string
  field_shopping_time: string
  field_teens: number
  field_telegram: string
  field_toddlers: number
  field_transport_preferences: string[]
  field_transport_pref_other: string
  field_transport_transfer: string[]
  field_transport_transfer_other: string
  field_wechat: string
  field_whatsapp: string
}
