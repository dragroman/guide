"use client"

import React from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import { StarterKit } from "@tiptap/starter-kit"
import { Control, useController } from "react-hook-form"
import { Bold, Italic, List, ListOrdered } from "lucide-react"
import { Button } from "@shared/ui/button"
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@shared/ui/form"
import { cn } from "@shared/lib/utils"

interface TipTapEditorProps {
  control: Control<any>
  name: string
  label?: string
  description?: string
  placeholder?: string
  className?: string
  minHeight?: number
}

export const TipTapEditor: React.FC<TipTapEditorProps> = ({
  control,
  name,
  label = "Описание",
  description,
  placeholder = "Введите текст...",
  className,
  minHeight = 120,
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: "",
  })

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Отключаем ненужные расширения
        heading: false,
        horizontalRule: false,
        blockquote: false,
        codeBlock: false,
        code: false,
        strike: false,
      }),
    ],
    content: field.value,
    editable: true,
    onUpdate: ({ editor }) => {
      field.onChange(editor.getHTML())
    },
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: cn(
          "prose prose-sm max-w-none focus:outline-none px-3 py-2",
          `min-h-[${minHeight}px]`
        ),
      },
    },
  })

  // Синхронизация с внешними изменениями поля
  React.useEffect(() => {
    if (editor && field.value !== editor.getHTML()) {
      editor.commands.setContent(field.value)
    }
  }, [field.value, editor])

  if (!editor) {
    return (
      <FormItem className={className}>
        {label && <FormLabel>{label}</FormLabel>}
        <FormControl>
          <div
            className={cn(
              "border border-input rounded-md p-3 bg-background",
              `min-h-[${minHeight}px]`
            )}
          >
            <div className="text-muted-foreground">Загрузка редактора...</div>
          </div>
        </FormControl>
        {description && <FormDescription>{description}</FormDescription>}
        <FormMessage />
      </FormItem>
    )
  }

  return (
    <FormItem className={className}>
      {label && <FormLabel>{label}</FormLabel>}
      <FormControl>
        <div className="border border-input rounded-md overflow-hidden bg-background">
          {/* Панель инструментов */}
          <div className="flex items-center gap-1 p-2 border-b border-border bg-muted/30">
            <Button
              type="button"
              variant={editor.isActive("bold") ? "default" : "ghost"}
              size="sm"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className="h-8 w-8 p-0"
              title="Жирный (Ctrl+B)"
            >
              <Bold className="h-4 w-4" />
            </Button>

            <Button
              type="button"
              variant={editor.isActive("italic") ? "default" : "ghost"}
              size="sm"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className="h-8 w-8 p-0"
              title="Курсив (Ctrl+I)"
            >
              <Italic className="h-4 w-4" />
            </Button>

            <div className="w-px h-6 bg-border mx-1" />

            <Button
              type="button"
              variant={editor.isActive("bulletList") ? "default" : "ghost"}
              size="sm"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className="h-8 w-8 p-0"
              title="Маркированный список"
            >
              <List className="h-4 w-4" />
            </Button>

            <Button
              type="button"
              variant={editor.isActive("orderedList") ? "default" : "ghost"}
              size="sm"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className="h-8 w-8 p-0"
              title="Нумерованный список"
            >
              <ListOrdered className="h-4 w-4" />
            </Button>
          </div>

          {/* Область редактора */}
          <div className="relative">
            <EditorContent
              editor={editor}
              className={cn(
                "prose prose-sm max-w-none",
                `min-h-[${minHeight}px]`
              )}
            />

            {/* Плейсхолдер */}
            {editor.isEmpty && (
              <div className="absolute top-3 left-3 text-muted-foreground pointer-events-none">
                {placeholder}
              </div>
            )}
          </div>
        </div>
      </FormControl>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  )
}
