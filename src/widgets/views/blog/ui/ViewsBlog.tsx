import { BlogTeaser } from "@entities/node/blog"
import { DrupalNode } from "next-drupal"

export const ViewsBlog = async ({ nodes }: { nodes: DrupalNode[] }) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        {nodes?.length ? (
          nodes.map((node) => <BlogTeaser node={node} key={node.id} />)
        ) : (
          <p className="py-4 text-gray-500">Записи не найдены</p>
        )}
      </div>
    </>
  )
}
