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
  data: Record<string, any>,
  fieldPath: string,
  errorMessage: string,
  setError: UseFormSetError<ApplicationSchemaType>
): boolean {
  const hasSelection = Object.entries(data)
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
    setError("dateRange", {
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
export async function validatePersonalInfo(
  trigger: UseFormTrigger<ApplicationSchemaType>
): Promise<boolean> {
  return await trigger(["name", "peopleCount", "ageGroups"])
}

/**
 * Валидация для шага с информацией о поездке (шаг 1)
 */
export async function validateTripInfo(
  trigger: UseFormTrigger<ApplicationSchemaType>,
  getValues: UseFormGetValues<ApplicationSchemaType>,
  setError: UseFormSetError<ApplicationSchemaType>
): Promise<boolean> {
  // Сначала проверяем стандартные поля
  const isStepValid = await trigger(["dateRange", "tripPurpose"])
  if (!isStepValid) return false

  // Проверяем даты поездки
  if (!validateDateRange(getValues("dateRange"), setError)) {
    return false
  }

  // Проверяем, что выбрана хотя бы одна цель поездки
  const tripPurpose = getValues("tripPurpose")
  if (
    !validateAtLeastOneSelected(
      tripPurpose,
      "tripPurpose",
      "Выберите хотя бы одну цель поездки",
      setError
    )
  ) {
    return false
  }

  // Проверяем поле "Другое" если оно выбрано
  if (!validateOtherDescription(tripPurpose, "tripPurpose", setError)) {
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
  const isStepValid = await trigger([
    "accommodation",
    "accommodationPreferences",
  ])
  if (!isStepValid) return false

  // Проверяем тип размещения
  const accommodation = getValues("accommodation")
  if (
    !validateAtLeastOneSelected(
      accommodation,
      "accommodation",
      "Выберите хотя бы один тип размещения",
      setError
    )
  ) {
    return false
  }

  // Проверяем поле "Другое" для типа размещения
  if (!validateOtherDescription(accommodation, "accommodation", setError)) {
    return false
  }

  // Проверяем поле "Другое" для предпочтений размещения
  const preferences = getValues("accommodationPreferences")
  if (
    !validateOtherDescription(preferences, "accommodationPreferences", setError)
  ) {
    return false
  }

  return true
}

/**
 * Валидация для шага с транспортом (шаг 3)
 */
export async function validateTransport(
  getValues: UseFormGetValues<ApplicationSchemaType>,
  setError: UseFormSetError<ApplicationSchemaType>
): Promise<boolean> {
  // Валидируем трансфер
  const transfer = getValues("transport.transfer")
  if (
    !validateAtLeastOneSelected(
      transfer,
      "transport.transfer._error",
      "Выберите хотя бы один тип трансфера",
      setError
    )
  ) {
    return false
  }

  // Проверяем описание для "Другое" в трансфере
  if (!validateOtherDescription(transfer, "transport.transfer", setError)) {
    return false
  }

  // Проверяем предпочтения по транспорту
  const transportPreferences = getValues("transport.transportPreferences")
  if (
    !validateOtherDescription(
      transportPreferences,
      "transport.transportPreferences",
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
  getValues: UseFormGetValues<ApplicationSchemaType>,
  setError: UseFormSetError<ApplicationSchemaType>
): Promise<boolean> {
  // Проверяем выбор типа кухни
  const cuisine = getValues("foodPreferences.cuisine")
  if (
    !validateAtLeastOneSelected(
      cuisine,
      "foodPreferences.cuisine._error",
      "Выберите хотя бы один тип кухни",
      setError
    )
  ) {
    return false
  }

  // Проверяем описание для "Другое" в выборе кухни
  if (!validateOtherDescription(cuisine, "foodPreferences.cuisine", setError)) {
    return false
  }

  // Проверяем особые требования к питанию
  const preferences = getValues("foodPreferences.preferences")
  if (
    !validateOtherDescription(
      preferences,
      "foodPreferences.preferences",
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
  trigger: UseFormTrigger<ApplicationSchemaType>
): Promise<boolean> {
  return await trigger(["phone", "email"])
}
