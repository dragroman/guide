import { ApplicationFull } from "@entities/node/application"
import { TApplicationFull } from "@entities/node/application/model/types"
import { drupal } from "@shared/lib/drupal"
import { Typography } from "@shared/ui/typography"
import { Metadata } from "next"
export const metadata: Metadata = {
  title: "PageApplicationFull",
  description: "",
}
export default async function PageApplicationFull({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const node = await drupal.getResourceByPath<TApplicationFull>(`/node/${id}`)
  return (
    <>
      <Typography title={node.title} />
      <ApplicationFull node={node} />
    </>
  )
}
