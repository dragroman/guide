import Image from "next/image"
import { DrupalParagraph } from "next-drupal"
import { absoluteUrl } from "@shared/lib/utils"

export const Paragraph = ({
  paragraphs,
}: {
  paragraphs: DrupalParagraph[]
}) => {
  if (!paragraphs?.length) {
    return null
  }

  return (
    <>
      {paragraphs.map((paragraph) => {
        switch (paragraph.type) {
          case "paragraph--text":
            return (
              <div key={paragraph.id}>
                {paragraph.field_title ? (
                  <h2>{paragraph.field_title}</h2>
                ) : null}
                <div
                  dangerouslySetInnerHTML={{
                    __html: paragraph.field_body.processed,
                  }}
                  className="mt-6 text-xl prose"
                />
              </div>
            )

          case "paragraph--text_image":
            return (
              <div key={paragraph.id}>
                <h2>{paragraph.field_title}</h2>
                <div className="flex flex-col md:flex-row gap-6">
                  {/* TODO: ${paragraph.field_image_align ? "order-first" : ""} */}
                  <div
                    className={`md:w-1/2 text-xl prose`}
                    dangerouslySetInnerHTML={{
                      __html: paragraph.field_body.processed,
                    }}
                  />
                  {paragraph.field_image && (
                    <div className="md:w-1/2 md:flex md:justify-end">
                      <Image
                        src={absoluteUrl(
                          paragraph.field_image.field_media_image.uri.url
                        )}
                        width={200}
                        height={100}
                        alt={paragraph.field_image.resourceIdObjMeta?.alt || ""}
                        className="rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </div>
            )

          case "paragraph--image":
            return paragraph.field_image ? (
              <div key={paragraph.id}>
                <h2>{paragraph.field_title}</h2>
                <div key={paragraph.id} className="mt- mb-12">
                  <Image
                    src={absoluteUrl(paragraph.field_image.uri.url)}
                    width={800}
                    height={500}
                    alt={paragraph.field_image.resourceIdObjMeta?.alt || ""}
                    className="rounded-lg mx-auto"
                  />
                  {paragraph.field_image.resourceIdObjMeta?.title && (
                    <p className="text-center text-gray-600 mt-2 text-sm">
                      {paragraph.field_image.resourceIdObjMeta.title}
                    </p>
                  )}
                </div>
              </div>
            ) : null
        }
      })}
    </>
  )
}
