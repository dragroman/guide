import Image from "next/image"
import { DrupalNode } from "next-drupal"
import { absoluteUrl, formatDate } from "@shared/lib/utils"
import { Paragraph } from "@entities/paragraph"
import { PageTitle } from "@shared/ui/page-title"

export const BlogFull = ({ node }: { node: DrupalNode }) => {
  return (
    <article>
      <PageTitle title={node.title} />
      <div className="mb-4 text-gray-600">
        {node.uid?.display_name ? (
          <span>
            Posted by{" "}
            <span className="font-semibold">{node.uid?.display_name}</span>
          </span>
        ) : null}
        <span> - {formatDate(node.created)}</span>
      </div>
      {node.field_image && (
        <figure>
          <Image
            src={absoluteUrl(node.field_image.url.uri)}
            width={768}
            height={400}
            alt={node.field_image.resourceIdObjMeta.alt || ""}
            priority
          />
          {node.field_image.resourceIdObjMeta.title && (
            <figcaption className="py-2 text-sm text-center text-gray-600">
              {node.field_image.resourceIdObjMeta.title}
            </figcaption>
          )}
        </figure>
      )}
      <Paragraph paragraphs={node.field_body} />
    </article>
  )
}
