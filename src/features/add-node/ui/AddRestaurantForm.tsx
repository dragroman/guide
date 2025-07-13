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
import { formRestaurantSchema } from "../model/schema"
import { toast } from "sonner" // или ваша система уведомлений
import { useCreateNode } from "../api/apiAddNode"
import { FileUpload } from "@features/file-upload"

type FormData = z.infer<typeof formRestaurantSchema>

export const AddRestaurantForm = () => {
  const { createNode, loading, error } = useCreateNode()

  const form = useForm<FormData>({
    resolver: zodResolver(formRestaurantSchema),
    defaultValues: {
      title: "",
      titleZh: "",
      cityId: "",
      categoryId: "",
      description: "",
      addressZh: "",
      phone: "",
      workingHours: "",
    },
  })

  async function onSubmit(values: FormData) {
    const result = await createNode({
      nodeType: "spot",
      data: values,
    })

    if (result?.success) {
      toast.success("Ресторан успешно создан!")
      form.reset()
    } else {
      toast.error(error || "Ошибка при создании ресторана")
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
                    console.log("Selected:", cityId, internalId, name)
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
                    console.log("Selected:", categoryId, internalId, name)
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Описание</FormLabel>
              <FormControl>
                <Input placeholder="Описание ресторана" {...field} />
              </FormControl>
              <FormDescription>
                Добавьте краткое описание ресторана.
              </FormDescription>
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

        <FormField
          control={form.control}
          name="workingHours"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Часы работы</FormLabel>
              <FormControl>
                <Input placeholder="Например: 10:00-22:00" {...field} />
              </FormControl>
              <FormDescription>Укажите часы работы ресторана.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FileUpload />

        <Button type="submit" disabled={loading}>
          {loading ? "Создание..." : "Создать ресторан"}
        </Button>
      </form>
    </Form>
  )
}
