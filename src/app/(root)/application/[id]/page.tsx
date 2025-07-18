import { ApplicationFull } from "@entities/node/application"
import { TApplicationFull } from "@entities/node/application/model/types"
import { drupal } from "@shared/lib/drupal"
import { Typography } from "@shared/ui/typography"
import { Metadata } from "next"
import { notFound } from "next/navigation"
export const metadata: Metadata = {
  title: "PageApplicationFull",
  description: "",
}

async function getNode(id: string): Promise<TApplicationFull> {
  try {
    // Если не UUID, пробуем как путь
    return await drupal.getResourceByPath<TApplicationFull>(`/node/${id}`)
  } catch {
    return notFound()
  }
}

export default async function PageApplicationFull({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const node = await getNode(id)

  return (
    <>
      <Typography title={node.title} />
      <ApplicationFull node={node} />
    </>
  )
}
