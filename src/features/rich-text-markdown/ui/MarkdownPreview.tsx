"use client"

import React from "react"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import { cn } from "@shared/lib/utils"

interface MarkdownPreviewProps {
  content: string
  className?: string
}

export const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({
  content,
  className,
}) => {
  if (!content) {
    return (
      <div className="text-muted-foreground text-sm">
        Нет содержимого для предварительного просмотра
      </div>
    )
  }

  return (
    <div
      className={cn("prose prose-sm max-w-none dark:prose-invert", className)}
    >
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({ children, ...props }) => (
            <h1 className="text-xl font-bold mb-2" {...props}>
              {children}
            </h1>
          ),
          h2: ({ children, ...props }) => (
            <h2 className="text-lg font-semibold mb-2" {...props}>
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3 className="text-base font-medium mb-1" {...props}>
              {children}
            </h3>
          ),
          p: ({ children, ...props }) => (
            <p className="mb-2" {...props}>
              {children}
            </p>
          ),
          code: ({ children, className, ...props }) => {
            const isInline = !className
            return isInline ? (
              <code
                className="px-1 py-0.5 bg-muted rounded text-sm font-mono"
                {...props}
              >
                {children}
              </code>
            ) : (
              <code
                className="block p-2 bg-muted rounded text-sm font-mono overflow-x-auto"
                {...props}
              >
                {children}
              </code>
            )
          },
          blockquote: ({ children, ...props }) => (
            <blockquote
              className="border-l-4 border-muted-foreground pl-4 italic"
              {...props}
            >
              {children}
            </blockquote>
          ),
          ul: ({ children, ...props }) => (
            <ul className="list-disc pl-6 mb-2" {...props}>
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol className="list-decimal pl-6 mb-2" {...props}>
              {children}
            </ol>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
