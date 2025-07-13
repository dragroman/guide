import { PageTitle } from "@shared/ui/page-title"
import { TNodeBlog } from "@entities/node/blog/model/types"
import { BlogCover, BlogFull } from "@entities/node/blog"
import { ParagraphRenderer } from "@entities/paragraph"

export const NodeBlog = ({ node }: { node: TNodeBlog }) => {
  return (
    <article>
      <PageTitle title={node.title} />
      <BlogFull
        node={node}
        cover={node.field_cover && <BlogCover cover={node.field_cover} />}
        paragraphs={<ParagraphRenderer paragraphs={node.field_body} />}
      />
    </article>
  )
}
