import { ApplicationFull } from "@entities/node/application"
import { TApplicationFull } from "@entities/node/application/model/types"
import { DeleteNode } from "@features/delete-node"
import { drupal } from "@shared/lib/drupal"
import { Typography } from "@shared/ui/typography"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { Suspense } from "react"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params

  // Получаем данные блог-поста
  const node = await getNode(id)

  // Извлекаем данные из Drupal node
  const title = node.title || "Анкета"
  const description = node.field_meta_description

  return {
    title: title,
    description: description,
  }
}

async function getNode(id: string): Promise<TApplicationFull> {
  try {
    return await drupal.getResourceByPath<TApplicationFull>(
      `/application/${id}`
    )
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

  return (
    <Suspense fallback="Грузим...">
      <ApplicationContent id={id} />
    </Suspense>
  )
}

async function ApplicationContent({ id }: { id: string }) {
  const node = await getNode(id)
  return (
    <>
      <Typography title={node.title} />
      <ApplicationFull
        node={node}
        actions={<DeleteNode nodeId={node.id} nodeType={node.type} />}
      />
    </>
  )
}
