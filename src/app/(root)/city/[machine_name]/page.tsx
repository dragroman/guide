import { Suspense } from "react"
import { drupal } from "@shared/lib/drupal"
import { CityFull, TCityFull } from "@entities/term/city"
import { DrupalJsonApiParams } from "drupal-jsonapi-params"
import { ViewsSpotDefault } from "@widgets/views/spots"
import { TSpotDefaultTeaser } from "@entities/node/spot"
import { getUserFlags } from "@features/favorites"
import { getServerSession } from "next-auth"
import { authOptions } from "@features/auth/session"

export default async function CityFullPage({
  params,
}: {
  params: Promise<{ machine_name: string }>
}) {
  const { machine_name } = await params

  const session = await getServerSession(authOptions)

  const cityParams = new DrupalJsonApiParams().addInclude(["field_image"])
  const city = await drupal.getResourceByPath<TCityFull>(
    `/location/${machine_name}`,
    {
      params: cityParams.getQueryObject(),
    }
  )

  // Обновляем фильтр с реальным ID города
  const spotsParams = new DrupalJsonApiParams()
    .addInclude(["field_category", "field_images.field_media_image"])
    .addFilter("field_location.id", city.id)
    .addFields("taxonomy_term--category", ["name"])
    .addFields("media--image", ["field_media_image", "name"])

  const spots = await drupal.getResourceCollection<TSpotDefaultTeaser[]>(
    "node--spot",
    {
      params: spotsParams.getQueryObject(),
    }
  )

  const userFlags = session?.user?.id
    ? await getUserFlags(session.user.id, session.accessToken)
    : []

  return (
    <>
      <CityFull city={city} />
      <ViewsSpotDefault userFlags={userFlags} nodes={spots} />
    </>
  )
}
