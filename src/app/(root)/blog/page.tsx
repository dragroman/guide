import { drupal } from "@shared/lib/drupal"
import { PageTitle } from "@shared/ui/page-title"
import { ViewsBlog } from "@widgets/views/blog"
import { DrupalJsonApiParams } from "drupal-jsonapi-params"
import { DrupalNode } from "next-drupal"
import { getTranslations } from "next-intl/server"

export default async function BlogPage() {
  const t = await getTranslations("blog")
  const api = new DrupalJsonApiParams()
    .addFilter("status", "1")
    .addFields("node--article", [
      "title",
      "path",
      "field_image",
      "uid",
      "created",
      "drupal_internal__nid",
    ])
    .addSort("-created")
    .addPageLimit(10)
  const nodes = await drupal.getResourceCollection<DrupalNode[]>(
    "node--article",
    {
      params: api.getQueryObject(),
      next: {
        revalidate: 3600,
      },
    }
  )
  return (
    <div>
      <PageTitle title={t("title")} />
      <ViewsBlog nodes={nodes} />
    </div>
  )
}
