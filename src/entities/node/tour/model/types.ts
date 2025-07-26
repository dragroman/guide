import { TApplicationTeaser } from "@entities/node/application/model/types"
import { TSpotDefaultTeaser } from "@entities/node/spot"
import { DrupalNode, DrupalUser } from "next-drupal"

export interface TTourTeaser extends DrupalNode {
  field_participants: DrupalUser
}

export interface TTourFull extends DrupalNode {
  field_spots: TSpotDefaultTeaser[]
  field_application: TApplicationTeaser
}
