// entities/paragraph/ui/components/TextImageParagraph.tsx

import React from "react"
import Image from "next/image"
import { cn } from "@shared/lib/utils"
import type { TextImageParagraphProps } from "../../model/types"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"

/**
 * Компонент для отображения параграфа с текстом и изображением
 * Поддерживает расположение изображения слева или справа
 */
export const TextImageParagraph: React.FC<TextImageParagraphProps> = ({
  paragraph,
  className,
  priority = false,
}) => {
  // Получаем данные изображения
  const imageData = paragraph.field_image?.field_media_image
  const imagePosition = paragraph.field_image_position || "right"

  if (!imageData?.uri?.url) {
    return null
  }

  // Формируем URL изображения
  const imageUrl = `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${imageData.uri.url}`

  // Получаем размеры изображения
  const width = imageData.resourceIdObjMeta?.width || 800
  const height = imageData.resourceIdObjMeta?.height || 600

  // Alt текст с fallback
  const altText =
    imageData.resourceIdObjMeta?.alt || paragraph.field_title || "Изображение"

  // Проверяем, является ли контент Markdown
  const isMarkdown = paragraph.field_body?.format === "markdown"

  return (
    <div className={cn("paragraph-text-image", className)}>
      {/* Заголовок параграфа */}
      {paragraph.field_title && (
        <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
          {paragraph.field_title}
        </h3>
      )}

      {/* Контейнер с текстом и изображением */}
      <div
        className={cn(
          "flex flex-col lg:flex-row gap-6 lg:gap-8 items-center",
          imagePosition === "left" ? "lg:flex-row-reverse" : ""
        )}
      >
        {/* Текстовый контент */}
        <div className="flex-1 prose prose-lg max-w-none dark:prose-invert">
          {paragraph.field_body?.processed &&
            (isMarkdown ? (
              <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                {paragraph.field_body.processed}
              </ReactMarkdown>
            ) : (
              <div
                dangerouslySetInnerHTML={{
                  __html: paragraph.field_body.processed,
                }}
                className="wysiwyg-content"
              />
            ))}
        </div>

        {/* Изображение */}
        <div className="flex-shrink-0 w-full lg:w-1/3 xl:w-2/5">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 shadow-lg">
            <Image
              src={imageUrl}
              alt={altText}
              width={width}
              height={height}
              className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
              priority={priority}
              loading={priority ? "eager" : "lazy"}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// Экспорт для переиспользования
export default TextImageParagraph
