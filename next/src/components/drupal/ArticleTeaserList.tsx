import { drupal } from "@/lib/drupal"
import { DrupalNode } from "next-drupal"
import React from "react"
import { ArticleTeaser } from "./ArticleTeaser"

type Props = {}

export default async function ArticleTeaserList({}: Props) {
  const nodes = await drupal.getResourceCollection<DrupalNode[]>(
    "node--article",
    {
      params: {
        "filter[status]": 1,
        "fields[node--article]": "title,path,field_image,uid,created",
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
    <>
      {nodes?.length ? (
        nodes.map((node) => (
          <div
            key={node.id}
            className="bg-white rounded-xl overflow-hidden shadow-md"
          >
            <ArticleTeaser node={node} />
          </div>
        ))
      ) : (
        <p className="py-4 text-gray-500">Записи не найдены</p>
      )}
    </>
  )
}
