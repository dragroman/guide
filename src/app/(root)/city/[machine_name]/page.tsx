import { drupal } from "@shared/lib/drupal"
import { CityFull, TCityFull } from "@entities/term/city"
import { DrupalJsonApiParams } from "drupal-jsonapi-params"
import { ViewsSpotDefault } from "@widgets/views/spots"
import { TSpotDefaultTeaser } from "@entities/node/spot"

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
  const spotsParams = new DrupalJsonApiParams()
    .addInclude(["field_category"])
    .addInclude(["field_images.field_media_image"])
    .addFilter("field_location.id", city.id)
    .addFields("taxonomy_term--category", ["name"])
    .addFields("media--image", ["field_media_image", "name"])

  const spots = await drupal.getResourceCollection<TSpotDefaultTeaser[]>(
    "node--spot",
    {
      params: spotsParams.getQueryObject(),
    }
  )

  return (
    <>
      <CityFull city={city} />
      <ViewsSpotDefault nodes={spots} />
    </>
  )
}
