// entities/paragraph/ui/components/TextParagraph.tsx

import React from "react"
import { cn } from "@shared/lib/utils"
import type { TextParagraphProps } from "../../model/types"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"

/**
 * Компонент для отображения текстового параграфа
 * Поддерживает HTML и Markdown контент
 */
export const TextParagraph: React.FC<TextParagraphProps> = ({
  paragraph,
  className,
}) => {
  // Проверяем, является ли контент Markdown
  const isMarkdown = paragraph.field_body?.format === "markdown"

  console.log(paragraph)

  return (
    <div className={cn("paragraph-text", className)}>
      {/* Заголовок параграфа */}
      {paragraph.field_title && <h3>{paragraph.field_title}</h3>}

      {/* Контент параграфа */}
      {paragraph.field_body?.processed && (
        <div>
          {isMarkdown ? (
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
          )}
        </div>
      )}
    </div>
  )
}

// Экспорт для переиспользования
export default TextParagraph
