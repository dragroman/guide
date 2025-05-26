import { drupal } from "@shared/lib/drupal"
import { CityFull, TCityFull } from "@/entities/term/city"
import { ViewsCityRestaurant } from "@/widgets/views/restaurant"
import { TRestaurantTeaser } from "@/entities/node/restaurant"
import { DrupalJsonApiParams } from "drupal-jsonapi-params"

export default async function CityFullPage({
  params,
}: {
  params: Promise<{ machine_name: string }>
}) {
  const { machine_name } = await params
  const city = await drupal.getResourceByPath<TCityFull>(
    `/location/${machine_name}`,
    {
      params: {
        include: "field_image",
      },
    }
  )
  const restaurantsParams = new DrupalJsonApiParams()
    .addInclude(["field_category"])
    .addFilter("field_location.id", city.id)
    .addFilter("field_category.machine_name", "restaurant")
  const restaurants = await drupal.getResourceCollection<TRestaurantTeaser[]>(
    "node--spot",
    {
      params: restaurantsParams.getQueryObject(),
    }
  )
  return (
    <>
      <CityFull city={city} />
      <ViewsCityRestaurant items={restaurants} />
    </>
  )
}
