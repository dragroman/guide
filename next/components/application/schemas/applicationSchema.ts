import { z } from "zod"
import { addDays } from "date-fns"

// Функция для создания объекта Date из строки или объекта Date
const parseDate = (value: unknown): Date | null => {
  if (value instanceof Date) return value
  if (typeof value === "string") {
    const date = new Date(value)
    return isNaN(date.getTime()) ? null : date
  }
  return null
}

// Добавляем схему для возрастных групп
const ageGroupsSchema = z
  .record(
    z.string(), // ключ - id возрастной группы
    z
      .number() // значение - количество человек
      .min(0, "Количество не может быть отрицательным")
      .max(10, "Максимальное количество - 10 человек в одной группе")
  )
  .refine(
    (data) => {
      // Проверяем, что есть хотя бы один человек
      const totalPeople = Object.values(data).reduce(
        (sum, count) => sum + count,
        0
      )
      return totalPeople > 0
    },
    {
      message: "Должен быть хотя бы один путешественник",
    }
  )

// Создаем схему для диапазона дат
const dateRangeSchema = z
  .object({
    from: z.preprocess(
      parseDate,
      z
        .date({
          required_error: "Дата начала поездки обязательна",
          invalid_type_error:
            "Дата начала поездки должна быть действительной датой",
        })
        .refine(
          (date) => date >= new Date(new Date().setHours(0, 0, 0, 0)),
          "Дата начала поездки не может быть в прошлом"
        )
        .optional() // Делаем поле from опциональным
    ),
    to: z.preprocess(
      parseDate,
      z
        .date({
          required_error: "Дата окончания поездки обязательна",
          invalid_type_error:
            "Дата окончания поездки должна быть действительной датой",
        })
        .refine(
          (date) => date >= new Date(new Date().setHours(0, 0, 0, 0)),
          "Дата окончания поездки не может быть в прошлом"
        )
        .optional() // Делаем поле to опциональным
    ),
  })
  .refine(
    (data) => {
      // Если оба поля определены, проверяем, что конечная дата не раньше начальной
      if (data.from && data.to) {
        return data.to >= data.from
      }
      // Если одно из полей не определено, проверка проходит
      return true
    },
    {
      message: "Дата окончания поездки не может быть раньше даты начала",
      path: ["to"],
    }
  )
  .optional()
  .superRefine((data, ctx) => {
    if (!data) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Даты поездки обязательны",
        path: [],
      })
      return
    }

    if (!data.from) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Дата начала поездки обязательна",
        path: ["from"],
      })
    }

    if (!data.to) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Дата окончания поездки обязательна",
        path: ["to"],
      })
    }
  })

// Схема для валидации типа размещения
const accommodationSchema = z
  .object({
    hotel3: z.boolean(),
    hotel4: z.boolean(),
    hotel5: z.boolean(),
    apartment: z.boolean(),
    hostel: z.boolean(),
    other: z.boolean(),
    otherDescription: z.string().optional(),
  })
  .refine(
    (data) => {
      // Проверка, что выбран хотя бы один тип размещения
      return Object.entries(data)
        .filter(([key]) => key !== "otherDescription")
        .some(([_, value]) => value === true)
    },
    {
      message: "Выберите хотя бы один тип размещения",
      path: ["accommodation"],
    }
  )
  .refine(
    (data) => {
      // Если выбрано "Другое", проверяем наличие описания
      if (
        data.other &&
        (!data.otherDescription || data.otherDescription.trim() === "")
      ) {
        return false
      }
      return true
    },
    {
      message: "Укажите описание для пункта 'Другое'",
      path: ["otherDescription"],
    }
  )

// Основная схема для формы заявки
export const applicationSchema = z.object({
  name: z
    .string({ required_error: "Имя обязательно для заполнения" })
    .min(2, "Имя должно содержать не менее 2 символов")
    .max(100, "Имя не должно превышать 100 символов"),

  phone: z
    .string({ required_error: "Телефон обязателен для заполнения" })
    .min(8, "Введите полный номер телефона")
    .refine(
      (value) => /^\+[1-9]\d{1,14}$/.test(value),
      "Телефон должен быть в международном формате, например +79123456789"
    ),

  email: z.string().email("Email обязателен для заполнения"),
  peopleCount: z
    .number()
    .min(1, "Количество участников должно быть больше 0")
    .max(20, "Количество участников не должно превышать 10"),
  daysCount: z.number().optional().nullable(),
  ageGroups: ageGroupsSchema,

  dateRange: dateRangeSchema,

  accommodation: accommodationSchema,

  accommodationPreferences: z
    .object({
      centralLocation: z.boolean(),
      nearShoppingCenters: z.boolean(),
      poolAndSpa: z.boolean(),
      other: z.boolean(),
      otherDescription: z.string().optional(),
    })
    .refine(
      (data) => {
        // Если выбрано "Другое", проверяем наличие описания
        if (
          data.other &&
          (!data.otherDescription || data.otherDescription.trim() === "")
        ) {
          return false
        }
        return true
      },
      {
        message: "Укажите описание для пункта 'Другое'",
        path: ["otherDescription"],
      }
    ),

  tripPurpose: z
    .object({
      excursion: z.boolean(),
      business: z.boolean(),
      shopping: z.boolean(),
      food: z.boolean(),
      fun: z.boolean(),
      other: z.boolean(),
      otherDescription: z.string().optional(),
    })
    .refine(
      (data) => {
        // Проверяем, что хотя бы одна цель выбрана
        return Object.entries(data)
          .filter(([key]) => key !== "otherDescription")
          .some(([_, value]) => value === true)
      },
      {
        message: "Выберите хотя бы одну цель поездки",
        path: ["tripPurpose"], // Указываем правильный путь для ошибки
      }
    )
    .refine(
      (data) => {
        // Если выбрано "Другое", проверяем наличие описания
        if (
          data.other &&
          (!data.otherDescription || data.otherDescription.trim() === "")
        ) {
          return false
        }
        return true
      },
      {
        message: "Укажите описание для пункта 'Другое'",
        path: ["otherDescription"], // Указываем конкретное поле для ошибки
      }
    ),
})

// Тип данных формы, автоматически выводимый из схемы Zod
export type ApplicationSchemaType = z.infer<typeof applicationSchema>

// Начальные значения для формы
export const defaultFormValues: ApplicationSchemaType = {
  name: "",
  peopleCount: 1,
  ageGroups: {
    adults: 1,
    children: 0,
    seniors: 0,
    toddlers: 0,
    infants: 0,
    teens: 0,
  },
  phone: "",
  dateRange: {
    from: addDays(new Date(), 7),
    to: addDays(new Date(), 14),
  },
  email: "",
  daysCount: 8,
  tripPurpose: {
    excursion: false,
    business: false,
    shopping: false,
    food: false,
    fun: false,
    other: false,
    otherDescription: "",
  },
  accommodation: {
    hotel3: false,
    hotel4: false,
    hotel5: false,
    apartment: false,
    hostel: false,
    other: false,
    otherDescription: "",
  },
  accommodationPreferences: {
    centralLocation: false,
    nearShoppingCenters: false,
    poolAndSpa: false,
    other: false,
    otherDescription: "",
  },
}
