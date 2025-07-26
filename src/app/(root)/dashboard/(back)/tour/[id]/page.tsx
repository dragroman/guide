import { TSpotDefaultTeaser } from "@entities/node/spot"
import { TourFull } from "@entities/node/tour"
import { TTourFull } from "@entities/node/tour/model/types"
import { authOptions } from "@features/auth/session"
import { DeleteNode } from "@features/delete-node"
import { getUserFlags } from "@features/favorites"
import { drupal } from "@shared/lib/drupal"
import { Typography } from "@shared/ui/typography"
import { ViewsSpotDefault } from "@widgets/views/spots"
import { DrupalJsonApiParams } from "drupal-jsonapi-params"
import { Metadata } from "next"
import { getServerSession } from "next-auth"

import { notFound } from "next/navigation"
export const metadata: Metadata = {
  title: "PageTourFull",
  description: "",
}

async function getNode(id: string, token: string): Promise<TTourFull> {
  const tourParams = new DrupalJsonApiParams()
    .addInclude(["field_spots", "field_spots.field_category"])
    .addFields("taxonomy_term--category", ["name"])
    .addInclude(["field_spots.field_images.field_media_image"])
    .addFields("media--image", ["field_media_image", "name"])

  return await drupal.getResourceByPath<TTourFull>(`/tour/${id}`, {
    params: tourParams.getQueryObject(),
    withAuth: `Bearer ${token}`,
  })
}

export default async function PageTourFull({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const session = await getServerSession(authOptions)

  if (!session) {
    return <div>Access denied!</div>
  }

  const node = await getNode(id, session.accessToken)

  const userFlags = await getUserFlags(session.user.id, session.accessToken)

  const spots = node.field_spots

  return (
    <>
      <Typography title={node.title} />
      <TourFull
        node={node}
        actions={<DeleteNode nodeId={node.id} nodeType={node.type} />}
      />
      <ViewsSpotDefault userFlags={userFlags} nodes={spots} />
    </>
  )
}
