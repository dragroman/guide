import { locale } from "@/shared/config/i18n/messages/ru"
import { drupal } from "@/shared/lib/drupal"
import { ViewsBlog } from "@/widgets/views-blog"
import { DrupalNode } from "next-drupal"

export default async function BlogPage() {
  const t = locale.blog
  const nodes = await drupal.getResourceCollection<DrupalNode[]>(
    "node--article",
    {
      params: {
        "filter[status]": 1,
        "fields[node--article]":
          "title,path,field_image,uid,created,drupal_internal__nid",
        include: "field_image,uid",
        sort: "-created",
        "page[limit]": 3,
      },
      next: {
        revalidate: 3600,
      },
    }
  )
  return (
    <div>
      <h1 className="font-bold text-2xl mb-4">{t.title}</h1>
      <ViewsBlog nodes={nodes} />
    </div>
  )
}
