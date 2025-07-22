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
import { createMediaFromFile, createNode } from "../api/createNode"
import { useState } from "react"
import { formSpotSchema } from "../model/schema"
import { ResponsiveWorkingHoursField } from "@features/office-hours/ui/ResponsiveWorkingHoursField"
import { TipTapEditor } from "@shared/ui/tiptap"
import { FileUpload } from "@shared/ui/file-upload"

type FormData = z.infer<typeof formSpotSchema>

export const AddSpotForm = () => {
  const [loading, setLoading] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [uploadKey, setUploadKey] = useState(0)

  const form = useForm<FormData>({
    resolver: zodResolver(formSpotSchema),
    defaultValues: {
      title: "",
      titleZh: "",
      cityId: "",
      categoryId: "",
      body: "",
      addressZh: "",
      phone: "",
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
        toast.success("Место создано!")
        form.reset()
        setSelectedFiles([])
      }
      setUploadKey((prev) => prev + 1)
      setSelectedFiles([])
    } catch (error) {
      toast.error("Ошибка создания")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                Выберите город, где находится место.
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
              <FormDescription>
                Выберите тип заведения или место.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название</FormLabel>
              <FormControl>
                <Input placeholder="Название места" {...field} />
              </FormControl>
              <FormDescription>
                Наименование места должно быть от 2 до 50 символов. На русском
                языке, без лишних знаков препинания.
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
                <Input placeholder="地方名称 (中文)" {...field} />
              </FormControl>
              <FormDescription>
                Название места на китайском языке.
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
                <Input placeholder="地址 (中文)" {...field} />
              </FormControl>
              <FormDescription>Адрес места на китайском языке.</FormDescription>
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
              <FormDescription>Контактный телефон места.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <ResponsiveWorkingHoursField
          control={form.control}
          name="workingHours"
          label="Часы работы"
          description="Укажите часы работы места. Можете использовать предустановки или настроить вручную."
        />

        <TipTapEditor
          control={form.control}
          name="body"
          label="Описание места"
          description="Расскажите об особенностях, услугах, атмосфере заведения."
          placeholder="Например: Уютное место с хорошим сервисом, удобным расположением..."
          minHeight={150}
        />

        <FileUpload onFilesChange={handleFilesChange} key={uploadKey} />

        <Button type="submit" disabled={loading}>
          {loading ? "Создание..." : "Создать место"}
        </Button>
      </form>
    </Form>
  )
}
