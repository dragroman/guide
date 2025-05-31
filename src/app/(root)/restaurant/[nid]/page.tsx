import { RestaurantFull } from "@entities/node/restaurant"
import { TRestaurantFull } from "@entities/node/restaurant/model/types"
import { drupal } from "@shared/lib/drupal"
import { DrupalJsonApiParams } from "drupal-jsonapi-params"

export default async function RestaurantFullPage({
  params,
}: {
  params: Promise<{ nid: string }>
}) {
  const { nid } = await params
  const apiRestaurant = new DrupalJsonApiParams()
    .addInclude(["field_category", "field_location", "field_body"])
    .addFields("taxonomy_term--category", ["name"])
    .addFields("taxonomy_term--location", ["name"])
  const restaurant = await drupal.getResourceByPath<TRestaurantFull>(
    `/node/${nid}`,
    { params: apiRestaurant.getQueryObject() }
  )
  return <RestaurantFull item={restaurant} />
}
