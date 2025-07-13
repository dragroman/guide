import { absoluteUrl } from "@shared/lib/utils"
import { TNodeBlog } from "../model/types"
import Image from "next/image"

export const BlogCover = ({ cover }: { cover: TNodeBlog["field_cover"] }) => {
  return (
    <figure className="md:-mx-20 rounded-2xl overflow-hidden">
      <Image
        src={absoluteUrl(cover.field_media_image.uri.url)}
        width={768}
        height={400}
        alt={cover.field_media_image.resourceIdObjMeta?.alt || ""}
        priority
      />
    </figure>
  )
}
