"use client"

import React, { useState } from "react"
import { Control, useController } from "react-hook-form"
import { Eye, Edit3, Bold, Italic, Link, List } from "lucide-react"
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

interface SimpleMarkdownFieldProps {
  control: Control<any>
  name: string
  label?: string
  description?: string
  placeholder?: string
  className?: string
  rows?: number
}

export const SimpleMarkdownField: React.FC<SimpleMarkdownFieldProps> = ({
  control,
  name,
  label,
  description,
  placeholder = "Введите текст...",
  className,
  rows = 10,
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: "",
  })

  const [mode, setMode] = useState<"edit" | "preview">("edit")

  return (
    <FormItem className={className}>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <div className="space-y-2">
          {/* Переключатель режимов */}
          <div className="flex justify-between items-center">
            <div className="flex gap-1">
              <Button
                type="button"
                variant={mode === "edit" ? "default" : "ghost"}
                size="sm"
                onClick={() => setMode("edit")}
                className="h-7 px-2 text-xs"
              >
                <Edit3 className="h-3 w-3 mr-1" />
                Редактор
              </Button>
              <Button
                type="button"
                variant={mode === "preview" ? "default" : "ghost"}
                size="sm"
                onClick={() => setMode("preview")}
                className="h-7 px-2 text-xs"
              >
                <Eye className="h-3 w-3 mr-1" />
                Просмотр
              </Button>
            </div>

            {/* Краткая подсказка */}
            <div className="text-xs text-muted-foreground hidden sm:block">
              **жирный** *курсив* [ссылка](url) # заголовок
            </div>
          </div>

          {/* Редактор или превью */}
          {mode === "edit" ? (
            <Textarea
              placeholder={placeholder}
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              rows={rows}
              className={cn(
                "font-mono text-sm resize-y",
                error && "border-destructive"
              )}
            />
          ) : (
            <div
              className={cn(
                "min-h-[200px] p-3 border rounded-md bg-background overflow-auto",
                `min-h-[${rows * 24}px]`
              )}
            >
              {field.value ? (
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                    {field.value}
                  </ReactMarkdown>
                </div>
              ) : (
                <div className="text-muted-foreground text-sm">
                  Нет содержимого для просмотра
                </div>
              )}
            </div>
          )}
        </div>
      </FormControl>
      <FormDescription>{description}</FormDescription>
      <FormMessage />
    </FormItem>
  )
}
