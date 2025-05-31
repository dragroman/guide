// entities/paragraph/ui/ParagraphRenderer.tsx

import React from "react"
import { cn } from "@shared/lib/utils"
import type { ParagraphRendererProps, Paragraph } from "../model/types"

// Импорт компонентов параграфов
import TextParagraph from "./components/TextParagraph"
import ImageParagraph from "./components/ImageParagraph"
import TextImageParagraph from "./components/TextImageParagraph"

/**
 * Универсальный компонент для рендеринга параграфов
 * Автоматически выбирает нужный компонент в зависимости от типа параграфа
 */
export const ParagraphRenderer: React.FC<ParagraphRendererProps> = ({
  paragraphs = [],
  className,
  components = {},
}) => {
  // Пустой массив параграфов
  if (!paragraphs || paragraphs.length === 0) {
    return null
  }

  // Компоненты по умолчанию с возможностью переопределения
  const paragraphComponents = {
    text: components.text || TextParagraph,
    image: components.image || ImageParagraph,
    textImage: components.textImage || TextImageParagraph,
  }

  /**
   * Рендерит отдельный параграф
   */
  const renderParagraph = (paragraph: Paragraph, index: number) => {
    // Определяем приоритет для изображений (первые 2 изображения)
    const priority =
      index < 2 &&
      (paragraph.type === "paragraph--image" ||
        paragraph.type === "paragraph--text_image")

    // Базовые классы для всех параграфов
    const baseClasses = "paragraph-item"

    switch (paragraph.type) {
      case "paragraph--text":
        const TextComponent = paragraphComponents.text
        return (
          <TextComponent
            key={paragraph.id}
            paragraph={paragraph}
            className={baseClasses}
          />
        )

      case "paragraph--image":
        const ImageComponent = paragraphComponents.image
        return (
          <ImageComponent
            key={paragraph.id}
            paragraph={paragraph}
            className={baseClasses}
            priority={priority}
          />
        )

      case "paragraph--text_image":
        const TextImageComponent = paragraphComponents.textImage
        return (
          <TextImageComponent
            key={paragraph.id}
            paragraph={paragraph}
            className={baseClasses}
            priority={priority}
          />
        )

      default:
        // Неизвестный тип параграфа - логируем для отладки
        console.warn(`Неизвестный тип параграфа`)
        return null
    }
  }

  return (
    <div
      className={cn("paragraph-renderer space-y-8 md:space-y-12", className)}
    >
      {paragraphs.map((paragraph, index) => renderParagraph(paragraph, index))}
    </div>
  )
}

// Экспорт для переиспользования
export default ParagraphRenderer
