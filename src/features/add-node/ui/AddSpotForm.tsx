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
import { useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@shared/ui/input"
import { Button } from "@shared/ui/button"
import { CitySelect } from "@entities/term/city"
import { CategorySelect } from "@entities/term/category"

import { toast } from "sonner" // или ваша система уведомлений
import { createMediaFromFile, createNode } from "../api/createNode"
import { useState } from "react"
import { formSpotSchema } from "../model/schema"
import { TipTapEditor } from "@shared/ui/tiptap"
import { FileUpload } from "@shared/ui/file-upload"
import { ConditionalFields } from "./ConditionalFields"
import { Badge } from "@shared/ui/badge"
import { POPULAR_CATEGORIES, POPULAR_CITIES } from "../model/constants"
import { Plus, X } from "lucide-react"
import { FieldWorkingHours } from "./FieldWorkingHours"

type FormData = z.infer<typeof formSpotSchema>

export const AddSpotForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const [loading, setLoading] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [uploadKey, setUploadKey] = useState(0)
  const [workingHours, setWorkingHours] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(formSpotSchema),
    defaultValues: {
      title: "",
      titleZh: "",
      cityId: "",
      categoryId: "",
      body: "",
      addressZh: "",
      mapLinks: [],
      workingHours: [],
      rating: "",
    },
  })

  // Отслеживаем выбранную категорию
  const watchedCategoryId = form.watch("categoryId")

  const handleFilesChange = async (files: File[]) => {
    setSelectedFiles(files)
  }

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "mapLinks",
  })

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
        onSuccess?.()
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
              {POPULAR_CITIES.map((city) => (
                <Badge
                  key={city.id}
                  variant={field.value === city.id ? "default" : "secondary"}
                  className="cursor-pointer"
                  onClick={() => {
                    field.onChange(city.id)
                  }}
                >
                  {city.name}
                </Badge>
              ))}
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
                    form.setValue("cuisineTypes", [])
                    form.setValue("hotelStars", [])
                    form.setValue("attractionTypes", [])
                  }}
                  placeholder="Выберите категорию..."
                  error={form.formState.errors.categoryId?.message}
                />
              </FormControl>
              {POPULAR_CATEGORIES.map((category) => (
                <Badge
                  key={category.id}
                  variant={
                    field.value === category.id ? "default" : "secondary"
                  }
                  className="cursor-pointer"
                  onClick={() => {
                    field.onChange(category.id)
                    form.setValue("cuisineTypes", [])
                    form.setValue("hotelStars", [])
                    form.setValue("attractionTypes", [])
                  }}
                >
                  {category.name}
                </Badge>
              ))}
              <FormDescription>
                Выберите тип заведения или место.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Условные поля на основе выбранной категории */}
        <ConditionalFields
          control={form.control}
          categoryId={watchedCategoryId}
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
          name="mapLinks"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ссылки на карты</FormLabel>
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <FormControl>
                    <Input
                      placeholder="https://maps.baidu.com/....."
                      {...form.register(`mapLinks.${index}.url`)}
                    />
                  </FormControl>
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={() => remove(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => append({ url: "" })}
                >
                  <Plus className="h-4 w-4" />
                  Добавить ссылку
                </Button>
              </div>
              <FormDescription>
                Google Maps, Baidu, 2GIS и другие карты
              </FormDescription>
            </FormItem>
          )}
        />

        <FieldWorkingHours form={form} />

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
