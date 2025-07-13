// entities/paragraph/ui/components/ImageParagraph.tsx

import React from "react"
import Image from "next/image"
import { cn } from "@shared/lib/utils"
import type { ImageParagraphProps } from "../../model/types"

/**
 * Компонент для отображения параграфа с изображением
 * Использует Next.js Image для оптимизации
 */
export const ImageParagraph: React.FC<ImageParagraphProps> = ({
  paragraph,
  className,
  priority = false,
}) => {
  // Получаем данные изображения
  const imageData = paragraph.field_image?.field_media_image

  if (!imageData?.uri?.url) {
    return null
  }

  // Формируем URL изображения
  const imageUrl = `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${imageData.uri.url}`

  // Получаем размеры изображения
  const width = imageData.resourceIdObjMeta?.width || 1200
  const height = imageData.resourceIdObjMeta?.height || 800

  // Alt текст с fallback
  const altText =
    paragraph.field_image_alt ||
    imageData.resourceIdObjMeta?.alt ||
    paragraph.field_title ||
    "Изображение"

  // Title для изображения
  const titleText =
    paragraph.field_image_title || imageData.resourceIdObjMeta?.title || ""

  return (
    <figure className={cn("paragraph-image", className)}>
      {/* Заголовок параграфа */}
      {paragraph.field_title && <h3>{paragraph.field_title}</h3>}

      {/* Контейнер для изображения */}
      <div className="relative aspect-video w-ful">
        <Image
          src={imageUrl}
          alt={altText}
          title={titleText}
          width={width}
          height={height}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        />
      </div>

      {/* Подпись к изображению */}
      {titleText && (
        <figcaption className="mt-2 text-sm text-gray-600 dark:text-gray-400 text-center">
          {titleText}
        </figcaption>
      )}
    </figure>
  )
}

// Экспорт для переиспользования
export default ImageParagraph
