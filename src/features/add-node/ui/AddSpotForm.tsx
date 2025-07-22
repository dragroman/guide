"use client"

import { z } from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@shared/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@shared/ui/input"
import { Button } from "@shared/ui/button"
import { CitySelect } from "@entities/term/city"
import { CategorySelect } from "@entities/term/category"

import { toast } from "sonner" // или ваша система уведомлений
import { FileUpload } from "@features/file-upload"
import { createMediaFromFile, createNode } from "../api/createNode"
import { useEffect, useState } from "react"
import { Textarea } from "@shared/ui/textarea"
import { formSpotSchema } from "../model/schema"
import { WorkingHoursField } from "@features/office-hours"
import { ResponsiveWorkingHoursField } from "@features/office-hours/ui/ResponsiveWorkingHoursField"
import { RichTextMarkdownField } from "@features/rich-text-markdown"

type FormData = z.infer<typeof formSpotSchema>

export const AddSpotForm = () => {
  const [loading, setLoading] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [uploadKey, setUploadKey] = useState(0)

  const form = useForm<FormData>({
    resolver: zodResolver(formSpotSchema),
    defaultValues: {
      title: "Test",
      titleZh: "中文",
      cityId: "a1ebf855-942e-46fe-92e8-29e5c45a22cb",
      categoryId: "54d9907a-95cb-4f5f-a6ba-f5493a117540",
      body: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa ut voluptatibus sunt corporis error quis quas eius labore voluptate aut! Molestiae blanditiis fugiat minima, officia enim adipisci aut praesentium illum, iusto nobis ducimus, atque necessitatibus? Qui cumque dolore, nostrum, repellat sit, eaque ipsam ipsum rem natus officiis nemo minus amet fuga id nobis corrupti quaerat aperiam numquam. Officia doloremque voluptas, commodi eveniet pariatur ex voluptatem maxime labore aperiam. Doloribus, ducimus obcaecati. Vel autem impedit fuga repellendus vero quis dolor magni quia a minus ea perferendis quaerat, fugiat magnam repellat beatae dicta? Maiores eos assumenda ab harum facere culpa sed doloremque!",
      addressZh: "中文地址",
      phone: "79146998349",
      workingHours: [],
    },
  })

  const handleFilesChange = async (files: File[]) => {
    setSelectedFiles(files)
  }

  async function onSubmit(values: FormData) {
    setLoading(true)

    try {
      // Загружаем файлы только при отправке
      const imageIds = []
      for (const file of selectedFiles) {
        const media = await createMediaFromFile(file)
        imageIds.push(media.id)
      }

      const result = await createNode({
        ...values,
        images: imageIds,
      })

      if (result?.success) {
        toast.success("Материал создан!")
        form.reset()
        setSelectedFiles([])
      }
      setUploadKey((prev) => prev + 1)
      setSelectedFiles([])
    } catch (error) {
      toast.error("Ошибка загрузки")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название</FormLabel>
              <FormControl>
                <Input placeholder="Название ресторана" {...field} />
              </FormControl>
              <FormDescription>
                Наименование ресторана должно быть от 2 до 50 символов. На
                русском языке, без знаков препинания. Например: «Красная кухня».
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="titleZh"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название на китайском</FormLabel>
              <FormControl>
                <Input placeholder="餐厅名称 (中文)" {...field} />
              </FormControl>
              <FormDescription>
                Название ресторана на китайском языке.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="addressZh"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Адрес на китайском</FormLabel>
              <FormControl>
                <Input placeholder="餐厅地址 (中文)" {...field} />
              </FormControl>
              <FormDescription>
                Адрес ресторана на китайском языке.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cityId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Город</FormLabel>
              <FormControl>
                <CitySelect
                  value={field.value}
                  onChange={(cityId, internalId, name) => {
                    field.onChange(cityId)
                  }}
                  placeholder="Выберите город..."
                  error={form.formState.errors.cityId?.message}
                />
              </FormControl>
              <FormDescription>
                Укажите город, где находится ресторан.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Категория</FormLabel>
              <FormControl>
                <CategorySelect
                  value={field.value}
                  onChange={(categoryId, internalId, name) => {
                    field.onChange(categoryId)
                  }}
                  placeholder="Выберите категорию..."
                  error={form.formState.errors.categoryId?.message}
                />
              </FormControl>
              <FormDescription>Укажите категорию.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Телефон</FormLabel>
              <FormControl>
                <Input placeholder="Телефон" {...field} />
              </FormControl>
              <FormDescription>Контактный телефон ресторана.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <ResponsiveWorkingHoursField
          control={form.control}
          name="workingHours"
          label="Часы работы"
          description="Укажите часы работы ресторана. Можете использовать предустановки или настроить вручную."
        />

        <RichTextMarkdownField
          control={form.control}
          name="body"
          label="Содержание"
          description="Используйте Markdown для форматирования текста"
          placeholder="Расскажите о заведении..."
          rows={15}
        />

        <FileUpload onFilesChange={handleFilesChange} key={uploadKey} />

        <Button type="submit" disabled={loading}>
          {loading ? "Создание..." : "Создать ресторан"}
        </Button>
      </form>
    </Form>
  )
}
