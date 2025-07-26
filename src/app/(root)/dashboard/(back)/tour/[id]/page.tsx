import { ApplicationTeaser } from "@entities/node/application"
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
import { Suspense } from "react"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params

  // Получаем данные блог-поста
  const session = await getServerSession(authOptions)

  const node = await getNode(id, session?.accessToken ?? "")

  // Извлекаем данные из Drupal node
  const title = node.title || "Анкета"
  const description = node.field_meta_description

  return {
    title: title,
    description: description,
  }
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

  return (
    <div className="space-y-12">
      <Suspense fallback={<div>Загрузка тура...</div>}>
        <TourContent id={id} session={session} />
      </Suspense>
    </div>
  )
}

async function TourContent({ id, session }: { id: string; session: any }) {
  const [node, userFlags] = await Promise.all([
    getNode(id, session.accessToken),
    getUserFlags(session.user.id, session.accessToken),
  ])

  if (!node.field_application.drupal_internal__nid) {
    notFound()
  }

  const spots = node.field_spots

  return (
    <>
      <Typography title={node.title} />
      <TourFull
        node={node}
        actions={<DeleteNode nodeId={node.id} nodeType={node.type} />}
      />
      <div className="space-y-4">
        <Typography level="h3">Анкета</Typography>
        <ApplicationTeaser
          node={node.field_application}
          key={node.id}
          actions={<></>}
        />
      </div>
      <ViewsSpotDefault userFlags={userFlags} nodes={spots} />
    </>
  )
}

async function getNode(id: string, token: string): Promise<TTourFull> {
  const tourParams = new DrupalJsonApiParams()
    .addInclude([
      "field_spots",
      "field_spots.field_category",
      "field_application.field_cities",
      "field_spots.field_location",
    ])
    .addInclude(["field_spots.field_images.field_media_image"])
    .addFields("media--image", ["field_media_image", "name"])
    .addFields("taxonomy_term--category", ["name"])
    .addFields("taxonomy_term--location", ["name"])

  return await drupal.getResourceByPath<TTourFull>(`/tour/${id}`, {
    params: tourParams.getQueryObject(),
    withAuth: `Bearer ${token}`,
  })
}
