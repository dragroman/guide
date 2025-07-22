import { z } from "zod"

export const nodeSchema = z.object({
  title: z
    .string()
    .min(1, "Заголовок обязателен")
    .max(255, "Заголовок не должен превышать 255 символов"),
  field_body: z
    .string()
    .min(1, "Содержимое обязательно")
    .max(10000, "Содержимое не должно превышать 10000 символов"),
  field_category: z.string().min(1, "Категория обязательна"),
  images: z
    .array(z.instanceof(File))
    .optional()
    .refine(
      (files) => !files || files.every((file) => file.size <= 5 * 1024 * 1024),
      "Размер файла не должен превышать 5МБ"
    )
    .refine(
      (files) =>
        !files ||
        files.every((file) =>
          ["image/jpeg", "image/png", "image/gif", "image/webp"].includes(
            file.type
          )
        ),
      "Поддерживаются только изображения (JPEG, PNG, GIF, WebP)"
    ),
})

export type NodeFormData = z.infer<typeof nodeSchema>
