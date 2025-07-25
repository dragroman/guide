import { getSpotFull, SpotFull } from "@entities/node/spot"
import { TSpotDefaultFull } from "@entities/node/spot"
import { DeleteNode } from "@features/delete-node"
import { drupal } from "@shared/lib/drupal"
import { Metadata } from "next"
import { notFound } from "next/navigation"
export const metadata: Metadata = {
  title: "PageSpotFull",
  description: "",
}

export default async function PageSpotFull({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const node = await getSpotFull(id)

  return (
    <>
      <SpotFull
        node={node}
        actions={<DeleteNode nodeId={node.id} nodeType={node.type} />}
      />
    </>
  )
}
