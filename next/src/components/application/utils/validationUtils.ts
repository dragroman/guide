// components/application/utils/validationUtils.ts
import {
  UseFormSetError,
  UseFormTrigger,
  UseFormGetValues,
} from "react-hook-form"
import { ApplicationSchemaType } from "../schemas/applicationSchema"

/**
 * Проверяет, что если выбрано "Другое", то заполнено описание
 */
export function validateOtherDescription(
  data: { other: boolean; otherDescription?: string },
  fieldPath: string,
  setError: UseFormSetError<ApplicationSchemaType>
): boolean {
  if (
    data.other &&
    (!data.otherDescription || data.otherDescription.trim() === "")
  ) {
    setError(`${fieldPath}.otherDescription` as any, {
      type: "custom",
      message: 'Укажите описание для пункта "Другое"',
    })
    return false
  }
  return true
}

/**
 * Проверяет, что выбран хотя бы один элемент из списка чекбоксов
 */
export function validateAtLeastOneSelected(
  options: Record<string, any>,
  fieldPath: string,
  errorMessage: string,
  setError: UseFormSetError<ApplicationSchemaType>
): boolean {
  const hasSelection = Object.entries(options)
    .filter(([key]) => key !== "otherDescription" && key !== "_error")
    .some(([_, value]) => value === true)

  if (!hasSelection) {
    setError(fieldPath as any, {
      type: "custom",
      message: errorMessage,
    })
    return false
  }
  return true
}

/**
 * Проверяет заполненность диапазона дат
 */
export function validateDateRange(
  dateRange: { from?: Date | null; to?: Date | null } | undefined,
  setError: UseFormSetError<ApplicationSchemaType>
): boolean {
  if (!dateRange || !dateRange.from || !dateRange.to) {
    setError("trip.dateRange", {
      type: "custom",
      message: "Пожалуйста, выберите даты поездки",
    })
    return false
  }
  return true
}

/**
 * Валидация для шага с личной информацией (шаг 0)
 */
export async function validateBaseInfo(
  trigger: UseFormTrigger<ApplicationSchemaType>
): Promise<boolean> {
  return await trigger(["name", "peopleCount", "ageGroups", "city"])
}

/**
 * Валидация для шага с информацией о поездке (шаг 1)
 */
export async function validateTripInfo(
  trigger: UseFormTrigger<ApplicationSchemaType>,
  getValues: UseFormGetValues<ApplicationSchemaType>,
  setError: UseFormSetError<ApplicationSchemaType>
): Promise<boolean> {
  const dateRange = getValues("trip.dateRange")
  const dateRangeValid = validateDateRange(dateRange, setError)

  // Если даты не заполнены, показываем ошибку сразу
  if (!dateRangeValid) {
    return false
  }
  // Сначала проверяем стандартные поля через схему
  const isStepValid = await trigger(["trip"])
  if (!isStepValid) return false

  // Проверяем даты поездки
  if (!validateDateRange(getValues("trip.dateRange"), setError)) {
    return false
  }

  // Проверяем, что выбрана хотя бы одна цель поездки
  const tripPurposeOptions = getValues("trip.purpose.options")
  if (
    !validateAtLeastOneSelected(
      tripPurposeOptions,
      "trip.purpose.options",
      "Выберите хотя бы одну цель поездки",
      setError
    )
  ) {
    return false
  }

  // Проверяем поле "Другое" если оно выбрано
  if (
    !validateOtherDescription(
      {
        other: tripPurposeOptions.other,
        otherDescription: getValues("trip.purpose.otherDescription"),
      },
      "trip.purpose",
      setError
    )
  ) {
    return false
  }

  return true
}

/**
 * Валидация для шага с размещением (шаг 2)
 */
export async function validateAccommodation(
  trigger: UseFormTrigger<ApplicationSchemaType>,
  getValues: UseFormGetValues<ApplicationSchemaType>,
  setError: UseFormSetError<ApplicationSchemaType>
): Promise<boolean> {
  // Сначала проверяем стандартные поля
  const isStepValid = await trigger(["accommodation"])
  if (!isStepValid) return false

  // Проверяем тип размещения
  const accommodationOptions = getValues("accommodation.options")
  if (
    !validateAtLeastOneSelected(
      accommodationOptions,
      "accommodation.options",
      "Выберите хотя бы один тип размещения",
      setError
    )
  ) {
    return false
  }

  // Проверяем поле "Другое" для типа размещения
  if (
    !validateOtherDescription(
      {
        other: accommodationOptions.other,
        otherDescription: getValues("accommodation.options.otherDescription"),
      },
      "accommodation.options",
      setError
    )
  ) {
    return false
  }

  // Проверяем поле "Другое" для предпочтений размещения
  const accommodationPreferences = getValues("accommodation.preferences")
  if (
    !validateOtherDescription(
      {
        other: accommodationPreferences.other,
        otherDescription: getValues(
          "accommodation.preferences.otherDescription"
        ),
      },
      "accommodation.preferences",
      setError
    )
  ) {
    return false
  }

  return true
}

/**
 * Валидация для шага с транспортом (шаг 3)
 */
export async function validateTransport(
  trigger: UseFormTrigger<ApplicationSchemaType>,
  getValues: UseFormGetValues<ApplicationSchemaType>,
  setError: UseFormSetError<ApplicationSchemaType>
): Promise<boolean> {
  // Сначала проверяем стандартные поля
  const isStepValid = await trigger(["transport"])
  if (!isStepValid) return false

  // Валидируем трансфер
  const transfer = getValues("transport.transfer")
  const transferSelected = Object.entries(transfer)
    .filter(([key]) => key !== "otherDescription" && key !== "_error")
    .filter(([_, value]) => value === true).length

  if (transferSelected !== 1) {
    setError("transport.transfer", {
      type: "custom",
      message: "Выберите один вариант трансфера",
    })
    return false
  }

  // Проверяем описание для "Другое" в трансфере
  if (
    !validateOtherDescription(
      {
        other: transfer.other,
        otherDescription: getValues("transport.transfer.otherDescription"),
      },
      "transport.transfer",
      setError
    )
  ) {
    return false
  }

  // Проверяем предпочтения по транспорту
  const transportPreferences = getValues("transport.preferences")
  if (
    !validateOtherDescription(
      {
        other: transportPreferences.other,
        otherDescription: getValues("transport.preferences.otherDescription"),
      },
      "transport.preferences",
      setError
    )
  ) {
    return false
  }

  return true
}

/**
 * Валидация для шага с питанием (шаг 4)
 */
export async function validateFood(
  trigger: UseFormTrigger<ApplicationSchemaType>,
  getValues: UseFormGetValues<ApplicationSchemaType>,
  setError: UseFormSetError<ApplicationSchemaType>
): Promise<boolean> {
  // Сначала проверяем стандартные поля
  const isStepValid = await trigger(["food"])
  if (!isStepValid) return false

  // Проверяем выбор типа кухни
  const cuisine = getValues("food.cuisine")

  // Проверяем описание для "Другое" в выборе кухни
  if (
    !validateOtherDescription(
      {
        other: cuisine.other,
        otherDescription: getValues("food.cuisine.otherDescription"),
      },
      "food.cuisine",
      setError
    )
  ) {
    return false
  }

  // Проверяем особые требования к питанию
  const preferences = getValues("food.preferences")
  if (
    !validateOtherDescription(
      {
        other: preferences.other,
        otherDescription: getValues("food.preferences.otherDescription"),
      },
      "food.preferences",
      setError
    )
  ) {
    return false
  }

  return true
}

/**
 * Валидация для шага с контактами (шаг 5)
 */
export async function validateContact(
  trigger: UseFormTrigger<ApplicationSchemaType>,
  getValues: UseFormGetValues<ApplicationSchemaType>,
  setError: UseFormSetError<ApplicationSchemaType>,
  clearErrors: Function
): Promise<boolean> {
  const contact = getValues("contact")
  if (
    contact.phone ||
    contact.email ||
    contact.wechat ||
    contact.telegram ||
    contact.whatsapp
  ) {
    clearErrors("contact")
    return true
  }

  // Если ни одно поле не заполнено, устанавливаем ошибку
  setError("contact", {
    type: "custom",
    message: "Укажите хотя бы один способ связи",
  })
  return false
}

export async function validateShopping(
  trigger: UseFormTrigger<ApplicationSchemaType>,
  getValues: UseFormGetValues<ApplicationSchemaType>,
  setError: UseFormSetError<ApplicationSchemaType>
): Promise<boolean> {
  // Сначала проверяем стандартные поля через схему
  const isStepValid = await trigger(["shopping"])
  if (!isStepValid) return false

  // Проверка мест для шоппинга
  const shoppingPlaces = getValues("shopping.shoppingPlaces")

  // Проверка поля "Другое" для мест шоппинга
  if (
    !validateOtherDescription(
      {
        other: shoppingPlaces.other,
        otherDescription: getValues("shopping.shoppingPlaces.otherDescription"),
      },
      "shopping.shoppingPlaces",
      setError
    )
  ) {
    return false
  }
  return true
}

export async function validateBudget(
  trigger: UseFormTrigger<ApplicationSchemaType>
): Promise<boolean> {
  return await trigger(["budget"])
}
