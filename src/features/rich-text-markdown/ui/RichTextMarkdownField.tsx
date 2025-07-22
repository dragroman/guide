"use client"

import React, { useState } from "react"
import { Control, useController } from "react-hook-form"
import {
  Bold,
  Italic,
  Link,
  List,
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  Heading3,
  Code,
} from "lucide-react"
import { Button } from "@shared/ui/button"
import { Textarea } from "@shared/ui/textarea"
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@shared/ui/form"
import { cn } from "@shared/lib/utils"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"

interface LivePreviewMarkdownFieldProps {
  control: Control<any>
  name: string
  label?: string
  description?: string
  placeholder?: string
  className?: string
  rows?: number
  outputFormat?: "html" | "markdown"
}

interface ToolbarButton {
  icon: React.ComponentType<{ className?: string }>
  label: string
  action: () => void
  shortcut?: string
}

const markdownToHtml = (markdown: string): string => {
  return markdown
    .replace(/^### (.*$)/gim, "<h3>$1</h3>")
    .replace(/^## (.*$)/gim, "<h2>$1</h2>")
    .replace(/^# (.*$)/gim, "<h1>$1</h1>")
    .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/gim, "<em>$1</em>")
    .replace(/\[([^\]]*)\]\(([^\)]*)\)/gim, '<a href="$2">$1</a>')
    .replace(/`([^`]*)`/gim, "<code>$1</code>")
    .replace(/^> (.*$)/gim, "<blockquote>$1</blockquote>")
    .replace(/^\- (.*$)/gim, "<li>$1</li>")
    .replace(/^\d+\. (.*$)/gim, "<li>$1</li>")
    .replace(/\n\n/gim, "\n</p>\n<p>")
    .replace(/^(?!<[hulo])(.+)$/gim, "<p>$1</p>")
    .replace(/<li>(.*?)<\/li>(\s*<li>.*?<\/li>)*/gim, (match) => {
      const items = match.match(/<li>.*?<\/li>/g)
      return `<ul>${items?.join("") || ""}</ul>`
    })
    .replace(/<p><\/p>/gim, "")
    .trim()
}

export const RichTextMarkdownField: React.FC<LivePreviewMarkdownFieldProps> = ({
  control,
  name,
  label,
  description,
  placeholder = "Введите текст...",
  className,
  rows = 10,
  outputFormat = "html",
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: "",
  })

  const [textareaRef, setTextareaRef] = useState<HTMLTextAreaElement | null>(
    null
  )
  const [markdownValue, setMarkdownValue] = useState(field.value || "")

  const handleTextChange = (markdown: string) => {
    setMarkdownValue(markdown)

    if (outputFormat === "html") {
      field.onChange(markdownToHtml(markdown))
    } else {
      field.onChange(markdown)
    }
  }

  // Функции для работы с текстом
  const insertTextAtCursor = (
    before: string,
    after: string = "",
    placeholder: string = ""
  ) => {
    if (!textareaRef) return

    const start = textareaRef.selectionStart
    const end = textareaRef.selectionEnd
    const selectedText = markdownValue.substring(start, end)
    const textToInsert = selectedText || placeholder
    const newText =
      markdownValue.substring(0, start) +
      before +
      textToInsert +
      after +
      markdownValue.substring(end)

    handleTextChange(newText)

    setTimeout(() => {
      const newCursorPos =
        start + before.length + textToInsert.length + after.length
      textareaRef.setSelectionRange(newCursorPos, newCursorPos)
      textareaRef.focus()
    }, 0)
  }

  const insertAtBeginningOfLine = (prefix: string) => {
    if (!textareaRef) return

    const start = textareaRef.selectionStart
    const lines = markdownValue.split("\n")
    let currentLine = 0
    let charCount = 0

    for (let i = 0; i < lines.length; i++) {
      if (charCount + lines[i].length >= start) {
        currentLine = i
        break
      }
      charCount += lines[i].length + 1
    }

    lines[currentLine] = prefix + lines[currentLine]
    const newText = lines.join("\n")

    handleTextChange(newText)

    setTimeout(() => {
      const newCursorPos = start + prefix.length
      textareaRef.setSelectionRange(newCursorPos, newCursorPos)
      textareaRef.focus()
    }, 0)
  }

  // Панель инструментов
  const toolbarButtons: ToolbarButton[] = [
    {
      icon: Heading1,
      label: "Заголовок 1",
      action: () => insertAtBeginningOfLine("# "),
    },
    {
      icon: Heading2,
      label: "Заголовок 2",
      action: () => insertAtBeginningOfLine("## "),
    },
    {
      icon: Heading3,
      label: "Заголовок 3",
      action: () => insertAtBeginningOfLine("### "),
    },
    {
      icon: Bold,
      label: "Жирный",
      action: () => insertTextAtCursor("**", "**", "жирный текст"),
      shortcut: "Ctrl+B",
    },
    {
      icon: Italic,
      label: "Курсив",
      action: () => insertTextAtCursor("*", "*", "курсив"),
      shortcut: "Ctrl+I",
    },
    {
      icon: Link,
      label: "Ссылка",
      action: () => insertTextAtCursor("[", "](url)", "текст ссылки"),
    },
    {
      icon: Quote,
      label: "Цитата",
      action: () => insertAtBeginningOfLine("> "),
    },
    {
      icon: List,
      label: "Список",
      action: () => insertAtBeginningOfLine("- "),
    },
    {
      icon: ListOrdered,
      label: "Нумерованный список",
      action: () => insertAtBeginningOfLine("1. "),
    },
    {
      icon: Code,
      label: "Код",
      action: () => insertTextAtCursor("`", "`", "код"),
    },
  ]

  // Обработка горячих клавиш
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case "b":
          e.preventDefault()
          insertTextAtCursor("**", "**", "жирный текст")
          break
        case "i":
          e.preventDefault()
          insertTextAtCursor("*", "*", "курсив")
          break
        case "k":
          e.preventDefault()
          insertTextAtCursor("[", "](url)", "текст ссылки")
          break
      }
    }
  }

  return (
    <FormItem className={className}>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <div className="space-y-3">
          {/* Панель инструментов */}
          <div className="flex items-center gap-1 p-2 bg-muted/30 rounded-lg overflow-x-auto">
            {toolbarButtons.map((button, index) => (
              <Button
                key={index}
                type="button"
                variant="ghost"
                size="sm"
                onClick={button.action}
                className="h-8 w-8 p-0 shrink-0"
                title={`${button.label}${button.shortcut ? ` (${button.shortcut})` : ""}`}
              >
                <button.icon className="h-4 w-4" />
              </Button>
            ))}
          </div>

          {/* Редактор с живым просмотром */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Textarea для ввода */}
            <div className="space-y-2">
              <div className="text-xs font-medium text-muted-foreground">
                Редактор
              </div>
              <Textarea
                ref={setTextareaRef}
                placeholder={placeholder}
                value={markdownValue}
                onChange={(e) => handleTextChange(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={rows}
                className={cn(
                  "font-mono text-sm resize-none",
                  error && "border-destructive"
                )}
              />
            </div>

            {/* Живой просмотр */}
            <div className="space-y-2">
              <div className="text-xs font-medium text-muted-foreground">
                Просмотр
              </div>
              <div
                className={cn(
                  "p-3 border rounded-md bg-background overflow-auto",
                  `min-h-[${rows * 24}px]`
                )}
              >
                {markdownValue ? (
                  <div className="prose prose-sm max-w-none dark:prose-invert">
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
                      {markdownValue}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <div className="text-muted-foreground text-sm">
                    Начните печатать, чтобы увидеть результат
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Подсказки по Markdown */}
          <div className="text-xs text-muted-foreground">
            <div className="flex flex-wrap gap-4">
              <span>
                <code>**жирный**</code>
              </span>
              <span>
                <code>*курсив*</code>
              </span>
              <span>
                <code>[ссылка](url)</code>
              </span>
              <span>
                <code># заголовок</code>
              </span>
              <span>
                <code>- список</code>
              </span>
            </div>
          </div>
        </div>
      </FormControl>
      <FormDescription>{description}</FormDescription>
      <FormMessage />
    </FormItem>
  )
}
