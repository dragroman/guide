"use client"

import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Button } from "@shared/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shared/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@shared/ui/form"
import { Input } from "@shared/ui/input"
import { Textarea } from "@shared/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shared/ui/select"
import { FileUpload } from "./file-upload"
import { Loader2, Save } from "lucide-react"
import { createNode, createMediaFromFile } from "../api/create-node"
import { nodeSchema, type NodeFormData } from "../model/validation"

// Примерные категории - замените на ваши
const CATEGORIES = [
  { value: "news", label: "Новости" },
  { value: "articles", label: "Статьи" },
  { value: "guides", label: "Руководства" },
  { value: "reviews", label: "Обзоры" },
]

export function NodeCreator() {
  const [isPending, startTransition] = useTransition()
  const [uploadingImages, setUploadingImages] = useState(false)

  const form = useForm<NodeFormData>({
    resolver: zodResolver(nodeSchema),
    defaultValues: {
      title: "",
      field_body: "",
      field_category: "",
      images: [],
    },
  })

  const onSubmit = async (data: NodeFormData) => {
    startTransition(async () => {
      try {
        let mediaIds: string[] = []

        // Загружаем изображения если они есть
        if (data.images && data.images.length > 0) {
          setUploadingImages(true)
          toast.info("Загрузка изображений...")

          const uploadPromises = data.images.map((file) =>
            createMediaFromFile(file, `Изображение для: ${data.title}`)
          )

          const mediaEntities = await Promise.all(uploadPromises)
          mediaIds = mediaEntities.map((media) => media.id)

          setUploadingImages(false)
          toast.success("Изображения загружены успешно")
        }

        // Создаем материал
        toast.info("Создание материала...")

        const result = await createNode({
          title: data.title,
          field_body: {
            value: data.field_body,
            format: "full_html",
          },
          field_category: data.field_category,
          field_images: mediaIds.length > 0 ? mediaIds : undefined,
        })

        if (result.success) {
          toast.success(result.message)
          form.reset()
        } else {
          toast.error(result.error)
        }
      } catch (error) {
        console.error("Ошибка при создании материала:", error)
        toast.error("Произошла неожиданная ошибка")
      } finally {
        setUploadingImages(false)
      }
    })
  }

  const isLoading = isPending || uploadingImages

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Save className="h-5 w-5" />
          Создать новый материал
        </CardTitle>
        <CardDescription>
          Заполните форму для создания нового материала в Drupal
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Заголовок */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Заголовок *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Введите заголовок материала"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Категория */}
            <FormField
              control={form.control}
              name="field_category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Категория *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите категорию" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {CATEGORIES.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Содержимое */}
            <FormField
              control={form.control}
              name="field_body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Содержимое *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Введите содержимое материала"
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Основной текст вашего материала
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Изображения */}
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Изображения</FormLabel>
                  <FormControl>
                    <FileUpload
                      files={field.value || []}
                      onFilesChange={field.onChange}
                      maxFiles={5}
                    />
                  </FormControl>
                  <FormDescription>
                    Загрузите до 5 изображений (JPEG, PNG, GIF, WebP, максимум
                    5МБ каждое)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Кнопка отправки */}
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {uploadingImages
                    ? "Загрузка изображений..."
                    : "Создание материала..."}
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Создать материал
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
