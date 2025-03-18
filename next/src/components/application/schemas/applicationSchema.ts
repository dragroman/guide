import { z } from "zod"

// Типизированная структура данных приложения с единым стилем
export type ApplicationSchemaType = {
  // Основная информация
  name: string
  peopleCount: number
  ageGroups: Record<string, number>

  // Контактная информация
  contact: {
    phone: string
    email: string
  }

  // Информация о поездке
  trip: {
    dateRange?: DateRange
    daysCount: number | null
    purpose: {
      options: {
        excursion: boolean
        business: boolean
        shopping: boolean
        food: boolean
        fun: boolean
        health: boolean
        other: boolean
      }
      otherDescription: string
    }
  }

  // Размещение
  accommodation: {
    options: {
      hotel3: boolean
      hotel4: boolean
      hotel5: boolean
      apartment: boolean
      hostel: boolean
      other: boolean
      otherDescription: string
    }
    preferences: {
      centralLocation: boolean
      nearShoppingCenters: boolean
      poolAndSpa: boolean
      other: boolean
      otherDescription: string
    }
  }

  // Транспорт
  transport: {
    transfer: {
      airport: boolean
      individual: boolean
      none: boolean
      other: boolean
      otherDescription: string
    }
    preferences: {
      privateDriver: boolean
      publicTransport: boolean
      taxi: boolean
      other: boolean
      otherDescription: string
    }
  }

  // Питание
  food: {
    cuisine: {
      chinese: boolean
      european: boolean
      japanese: boolean
      russian: boolean
      other: boolean
      otherDescription: string
    }
    preferences: {
      tryLocal: boolean
      spicyOk: boolean
      fattyOk: boolean
      other: boolean
      otherDescription: string
    }
  }

  // Покупки
  shopping: {
    budget: {
      economy: boolean
      medium: boolean
      luxury: boolean
    }
    shoppingPlaces: {
      malls: boolean
      boutiques: boolean
      markets: boolean
      outlets: boolean
      other: boolean
      otherDescription: string
    }
    specialWishes?: string
    shoppingTime: {
      fewHours: boolean
      halfDay: boolean
      fullDay: boolean
    }
    deliveryServices: {
      needed: boolean
    }
  }
  budget: number
  needVisa: boolean
  needInsurance: boolean
}

export type DateRange = {
  from?: Date | undefined
  to?: Date | undefined
}

// Значения формы по умолчанию
export const defaultFormValues: ApplicationSchemaType = {
  name: "",
  peopleCount: 1,
  ageGroups: {
    adults: 1,
  },

  contact: {
    phone: "",
    email: "",
  },

  trip: {
    dateRange: undefined,
    daysCount: null,
    purpose: {
      options: {
        excursion: false,
        business: false,
        shopping: false,
        food: false,
        fun: false,
        health: false,
        other: false,
      },
      otherDescription: "",
    },
  },

  accommodation: {
    options: {
      hotel3: false,
      hotel4: false,
      hotel5: false,
      apartment: false,
      hostel: false,
      other: false,
      otherDescription: "",
    },
    preferences: {
      centralLocation: false,
      nearShoppingCenters: false,
      poolAndSpa: false,
      other: false,
      otherDescription: "",
    },
  },

  transport: {
    transfer: {
      airport: false,
      individual: false,
      none: false,
      other: false,
      otherDescription: "",
    },
    preferences: {
      privateDriver: false,
      publicTransport: false,
      taxi: false,
      other: false,
      otherDescription: "",
    },
  },

  food: {
    cuisine: {
      chinese: false,
      european: false,
      japanese: false,
      russian: false,
      other: false,
      otherDescription: "",
    },
    preferences: {
      tryLocal: false,
      spicyOk: false,
      fattyOk: false,
      other: false,
      otherDescription: "",
    },
  },

  shopping: {
    budget: {
      economy: false,
      medium: false,
      luxury: false,
    },
    shoppingPlaces: {
      malls: false,
      boutiques: false,
      markets: false,
      outlets: false,
      other: false,
      otherDescription: "",
    },
    specialWishes: "",
    shoppingTime: {
      fewHours: false,
      halfDay: false,
      fullDay: false,
    },
    deliveryServices: {
      needed: false,
    },
  },
  budget: 1000,
  needVisa: false,
  needInsurance: false,
}

// Zod схема для валидации новой структуры данных
export const applicationSchema = z.object({
  // Основная информация
  name: z
    .string({ required_error: "Имя обязательно для заполнения" })
    .min(2, "Имя должно содержать не менее 2 символов")
    .max(100, "Имя не должно превышать 100 символов"),

  peopleCount: z
    .number()
    .min(1, "Количество участников должно быть больше 0")
    .max(20, "Количество участников не должно превышать 20"),

  ageGroups: z
    .record(
      z.string(),
      z
        .number()
        .min(0, "Количество не может быть отрицательным")
        .max(10, "Максимальное количество - 10 человек в одной группе")
    )
    .refine(
      (data) => {
        const totalPeople = Object.values(data).reduce(
          (sum, count) => sum + count,
          0
        )
        return totalPeople > 0
      },
      {
        message: "Должен быть хотя бы один путешественник",
      }
    ),

  // Контактная информация
  contact: z.object({
    phone: z
      .string({ required_error: "Телефон обязателен для заполнения" })
      .min(8, "Введите полный номер телефона")
      .refine(
        (value) => /^\+[1-9]\d{1,14}$/.test(value),
        "Телефон должен быть в международном формате, например +79123456789"
      ),

    email: z.string().email("Email должен быть корректным"),
  }),

  // Информация о поездке
  trip: z.object({
    dateRange: z
      .object({
        from: z.date().optional(),
        to: z.date().optional(),
      })
      .refine(
        (data) => {
          if (data.from && data.to) {
            return data.to >= data.from
          }
          return true
        },
        {
          message: "Дата окончания поездки не может быть раньше даты начала",
          path: ["to"],
        }
      )
      .refine((data) => data.from !== undefined, {
        message: "Дата начала поездки обязательна",
        path: ["from"],
      })
      .refine((data) => data.to !== undefined, {
        message: "Дата окончания поездки обязательна",
        path: ["to"],
      })
      .optional(),

    daysCount: z.number().nullable(),

    purpose: z
      .object({
        options: z.object({
          excursion: z.boolean(),
          business: z.boolean(),
          shopping: z.boolean(),
          food: z.boolean(),
          fun: z.boolean(),
          health: z.boolean(),
          other: z.boolean(),
        }),
        otherDescription: z.string(),
      })
      .refine(
        (data) => {
          const hasSelectedOptions = Object.entries(data.options)
            .filter(([key]) => key !== "other")
            .some(([_, value]) => value === true)
          return hasSelectedOptions
        },
        {
          message: "Выберите хотя бы одну цель поездки",
          path: ["options"],
        }
      )
      .refine(
        (data) => {
          if (data.options.other) {
            return data.otherDescription.trim() !== ""
          }
          return true
        },
        {
          message: "Укажите описание для пункта 'Другое'",
          path: ["otherDescription"],
        }
      ),
  }),

  // Размещение
  accommodation: z.object({
    options: z
      .object({
        hotel3: z.boolean(),
        hotel4: z.boolean(),
        hotel5: z.boolean(),
        apartment: z.boolean(),
        hostel: z.boolean(),
        other: z.boolean(),
        otherDescription: z.string(),
      })
      .refine(
        (data) => {
          const hasSelectedOptions = [
            data.hotel3,
            data.hotel4,
            data.hotel5,
            data.apartment,
            data.hostel,
            data.other,
          ].some((value) => value === true)
          return hasSelectedOptions
        },
        {
          message: "Выберите хотя бы один тип размещения",
          path: ["_error"],
        }
      )
      .refine(
        (data) => {
          if (data.other) {
            return data.otherDescription.trim() !== ""
          }
          return true
        },
        {
          message: "Укажите описание для пункта 'Другое'",
          path: ["otherDescription"],
        }
      ),

    preferences: z
      .object({
        centralLocation: z.boolean(),
        nearShoppingCenters: z.boolean(),
        poolAndSpa: z.boolean(),
        other: z.boolean(),
        otherDescription: z.string(),
      })
      .refine(
        (data) => {
          if (data.other) {
            return data.otherDescription.trim() !== ""
          }
          return true
        },
        {
          message: "Укажите описание для пункта 'Другое'",
          path: ["otherDescription"],
        }
      ),
  }),

  // Транспорт
  transport: z.object({
    transfer: z
      .object({
        airport: z.boolean(),
        individual: z.boolean(),
        none: z.boolean(),
        other: z.boolean(),
        otherDescription: z.string(),
      })
      .refine(
        (data) => {
          const hasSelectedOptions = [
            data.airport,
            data.individual,
            data.none,
            data.other,
          ].filter(Boolean).length
          return hasSelectedOptions === 1
        },
        {
          message: "Выберите хотя бы один тип трансфера",
          path: ["_error"],
        }
      )
      .refine(
        (data) => {
          if (data.other) {
            return data.otherDescription.trim() !== ""
          }
          return true
        },
        {
          message: "Укажите описание для пункта 'Другое'",
          path: ["otherDescription"],
        }
      ),

    preferences: z
      .object({
        privateDriver: z.boolean(),
        publicTransport: z.boolean(),
        taxi: z.boolean(),
        other: z.boolean(),
        otherDescription: z.string(),
      })
      .refine(
        (data) => {
          if (data.other) {
            return data.otherDescription.trim() !== ""
          }
          return true
        },
        {
          message: "Укажите описание для пункта 'Другое'",
          path: ["otherDescription"],
        }
      ),
  }),

  // Питание
  food: z.object({
    cuisine: z
      .object({
        chinese: z.boolean(),
        european: z.boolean(),
        japanese: z.boolean(),
        russian: z.boolean(),
        other: z.boolean(),
        otherDescription: z.string(),
      })
      .refine(
        (data) => {
          const hasSelectedOptions = [
            data.chinese,
            data.european,
            data.japanese,
            data.russian,
            data.other,
          ].some((value) => value === true)
          return hasSelectedOptions
        },
        {
          message: "Выберите хотя бы один тип кухни",
          path: ["_error"],
        }
      )
      .refine(
        (data) => {
          if (data.other) {
            return data.otherDescription.trim() !== ""
          }
          return true
        },
        {
          message: "Укажите описание для пункта 'Другое'",
          path: ["otherDescription"],
        }
      ),

    preferences: z
      .object({
        tryLocal: z.boolean(),
        spicyOk: z.boolean(),
        fattyOk: z.boolean(),
        other: z.boolean(),
        otherDescription: z.string(),
      })
      .refine(
        (data) => {
          if (data.other) {
            return data.otherDescription.trim() !== ""
          }
          return true
        },
        {
          message: "Укажите описание для пункта 'Другое'",
          path: ["otherDescription"],
        }
      ),
  }),

  // Шоппинг

  shopping: z.object({
    budget: z
      .object({
        economy: z.boolean(),
        medium: z.boolean(),
        luxury: z.boolean(),
      })
      .refine(
        (data) => {
          // Проверяем, что выбран ровно один вариант
          const selectedCount = [data.economy, data.medium, data.luxury].filter(
            Boolean
          ).length
          return selectedCount === 1
        },
        {
          message: "Выберите один бюджетный вариант",
          path: ["_error"],
        }
      ),

    shoppingPlaces: z
      .object({
        malls: z.boolean(),
        boutiques: z.boolean(),
        markets: z.boolean(),
        outlets: z.boolean(),
        other: z.boolean(),
        otherDescription: z.string(),
      })
      .refine(
        (data) => {
          const hasSelectedOptions = Object.entries(data)
            .filter(([key]) => key !== "otherDescription")
            .some(([_, value]) => value === true)
          return hasSelectedOptions
        },
        {
          message: "Выберите хотя бы одно место для шоппинга",
          path: ["_error"],
        }
      )
      .refine(
        (data) => {
          if (data.other) {
            return data.otherDescription.trim() !== ""
          }
          return true
        },
        {
          message: "Укажите описание для пункта 'Другое'",
          path: ["otherDescription"],
        }
      ),

    specialWishes: z.string().optional(),

    shoppingTime: z
      .object({
        fewHours: z.boolean(),
        halfDay: z.boolean(),
        fullDay: z.boolean(),
      })
      .refine(
        (data) => {
          // Проверяем, что выбран ровно один вариант
          const selectedCount = [
            data.fewHours,
            data.halfDay,
            data.fullDay,
          ].filter(Boolean).length
          return selectedCount === 1
        },
        {
          message: "Выберите одну продолжительность шоппинга",
          path: ["_error"],
        }
      ),

    deliveryServices: z.object({
      needed: z.boolean(),
    }),
  }),
  budget: z.number().min(0).max(100000),
  needVisa: z.boolean(),
  needInsurance: z.boolean(),
})
