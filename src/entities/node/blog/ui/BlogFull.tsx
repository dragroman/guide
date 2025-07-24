import { formatDate } from "@shared/lib/utils"
import { TNodeBlog } from "../model/types"

export const BlogFull = ({
  node,
  cover,
  paragraphs,
}: {
  node: TNodeBlog
  cover: React.ReactNode
  paragraphs: React.ReactNode
}) => {
  return (
    <>
      <div className="mb-4 text-gray-600">
        {node.uid?.display_name ? (
          <span>
            Posted by{" "}
            <span className="font-semibold">{node.uid?.display_name}</span>
          </span>
        ) : null}
        <span> - {formatDate(node.created)}</span>
      </div>
      {cover}
      {paragraphs}
    </>
  )
}
