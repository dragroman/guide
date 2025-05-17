import { FieldErrors } from "react-hook-form"
import { ApplicationSchemaType } from "../config/schemas/applicationSchema"

/**
 * Получает значение из вложенного объекта по строковому пути
 */
export const getNestedValue = (obj: any, path: string | undefined) => {
  if (!path) return undefined

  return path
    .split(".")
    .reduce((prev, curr) => (prev ? prev[curr] : undefined), obj)
}

/**
 * Проверяет наличие ошибки в группе опций (когда ничего не выбрано)
 */
export const hasOptionsError = (
  errors: FieldErrors<ApplicationSchemaType>,
  path: string | undefined
) => {
  if (!path) return false

  const errorObj = getNestedValue(errors, path)
  return (
    errorObj &&
    typeof errorObj === "object" &&
    !errorObj.otherDescription &&
    (errorObj._error || errorObj.message)
  )
}

/**
 * Проверяет наличие ошибки в поле "другое"
 */
export const hasOtherDescriptionError = (
  errors: FieldErrors<ApplicationSchemaType>,
  path: string | undefined
) => {
  if (!path) return false

  const errorPath = `${path}.otherDescription`
  return getNestedValue(errors, errorPath)
}

/**
 * Получает текст ошибки из объекта errors
 */
export const getErrorMessage = (
  errors: FieldErrors<ApplicationSchemaType>,
  path: string | undefined,
  message: string
): string => {
  if (!path) return ""

  const errorObj = getNestedValue(errors, path)

  if (!errorObj) return ""

  if (typeof errorObj === "string") {
    return errorObj
  }

  if (errorObj._error?.message) {
    return errorObj._error.message
  }

  if (errorObj.message) {
    return errorObj.message
  }

  return message
}
