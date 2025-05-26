import { locale } from "@shared/config/i18n/messages/ru"
import { drupal } from "@shared/lib/drupal"
import { PageTitle } from "@shared/ui/page-title"
import { ViewsBlog } from "@widgets/views/blog"
import { DrupalJsonApiParams } from "drupal-jsonapi-params"
import { DrupalNode } from "next-drupal"

export default async function BlogPage() {
  const t = locale.blog
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
    .addPageLimit(3)
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
      <PageTitle title={t.title} />
      <ViewsBlog nodes={nodes} />
    </div>
  )
}
