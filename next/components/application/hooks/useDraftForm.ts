import { useState, useEffect, useCallback } from "react"
import { useLocalStorage } from "./useLocalStorage"
import { ApplicationSchemaType } from "../schemas/applicationSchema"

const DRAFT_STORAGE_KEY = "application_form_draft"

export function useDraftForm(
  formData: ApplicationSchemaType,
  setValue: (name: any, value: any) => void
) {
  // Хук для работы с черновиком в localStorage
  const [draftData, setDraftData, removeDraftData] =
    useLocalStorage<ApplicationSchemaType | null>(DRAFT_STORAGE_KEY, null)

  // Состояние для отображения уведомления о черновике
  const [showDraftNotice, setShowDraftNotice] = useState(false)

  // Проверка наличия черновика при загрузке компонента
  useEffect(() => {
    if (draftData) {
      // Рекурсивная функция для проверки наличия данных в объекте
      const hasAnyData = (obj: Record<string, any>): boolean => {
        return Object.entries(obj).some(([key, value]) => {
          // Проверка примитивных типов
          if (typeof value === "string" && value.trim() !== "") {
            return true
          }

          // Проверка числовых значений
          if (typeof value === "number" && !isNaN(value)) {
            return true
          }

          // Проверка дат
          if (value instanceof Date) {
            return true
          }

          // Проверка массивов
          if (Array.isArray(value) && value.length > 0) {
            return true
          }

          // Проверка булевых значений в объектах типа checkboxes
          if (
            key === "tripPurpose" ||
            key === "accommodation" ||
            key === "accommodationPreferences"
          ) {
            return (
              typeof value === "object" &&
              value !== null &&
              Object.entries(value).some(
                ([k, v]) => k !== "otherDescription" && v === true
              )
            )
          }

          // Проверка объекта dateRange
          if (key === "dateRange") {
            return value && (value.from || value.to)
          }

          // Рекурсивная проверка вложенных объектов
          if (typeof value === "object" && value !== null) {
            return hasAnyData(value)
          }

          return false
        })
      }

      const hasData = hasAnyData(draftData)
      setShowDraftNotice(hasData)
    }
  }, [draftData])

  // Сохранение черновика при изменении формы
  const saveDraft = useCallback(() => {
    // Проверяем, есть ли в форме хоть какие-то данные, которые стоит сохранить
    const hasAnyValue =
      formData.name ||
      formData.email ||
      formData.phone ||
      (formData.dateRange &&
        (formData.dateRange.from || formData.dateRange.to)) ||
      Object.values(formData.tripPurpose).some((val) => val === true) ||
      Object.values(formData.accommodation).some((val) => val === true) ||
      Object.values(formData.accommodationPreferences).some(
        (val) => val === true
      )

    if (hasAnyValue) {
      setDraftData(formData)
    }
  }, [formData, setDraftData])

  // Автоматическое сохранение черновика при изменении данных формы
  useEffect(() => {
    const timer = setTimeout(() => {
      saveDraft()
    }, 1000)

    return () => clearTimeout(timer)
  }, [formData, saveDraft])

  // Восстановление черновика
  const restoreDraft = useCallback(() => {
    if (draftData) {
      // Рекурсивная функция для обхода вложенных объектов
      const setNestedValues = (data: any, prefix = "") => {
        Object.entries(data).forEach(([key, value]) => {
          const path = prefix ? `${prefix}.${key}` : key

          // Специальная обработка для dateRange (преобразование ISO-строк в объекты Date)
          if (path === "dateRange" && value && typeof value === "object") {
            const dateRange: Record<string, Date> = {}

            // Используем явное приведение типов и проверки
            const dateObj = value as Record<string, unknown>

            if (dateObj && typeof dateObj === "object") {
              // Проверяем и конвертируем дату начала
              if (dateObj.hasOwnProperty("from") && dateObj["from"]) {
                const fromValue = dateObj["from"]
                if (typeof fromValue === "string") {
                  try {
                    dateRange["from"] = new Date(fromValue)
                  } catch (e) {
                    console.error("Ошибка при парсинге даты начала:", e)
                  }
                }
              }

              // Проверяем и конвертируем дату окончания
              if (dateObj.hasOwnProperty("to") && dateObj["to"]) {
                const toValue = dateObj["to"]
                if (typeof toValue === "string") {
                  try {
                    dateRange["to"] = new Date(toValue)
                  } catch (e) {
                    console.error("Ошибка при парсинге даты окончания:", e)
                  }
                }
              }

              if (Object.keys(dateRange).length > 0) {
                setValue("dateRange", dateRange)
              }
            }
          }
          // Если значение - объект и не null/undefined, обрабатываем его рекурсивно
          else if (
            value !== null &&
            typeof value === "object" &&
            !Array.isArray(value)
          ) {
            setNestedValues(value, path)
          } else if (value !== undefined) {
            // Иначе устанавливаем значение
            setValue(path as any, value)
          }
        })
      }

      // Восстанавливаем все поля, включая вложенные
      setNestedValues(draftData)

      setShowDraftNotice(false)
    }
  }, [draftData, setValue])

  // Игнорирование черновика
  const ignoreDraft = useCallback(() => {
    removeDraftData()
    setShowDraftNotice(false)
  }, [removeDraftData])

  return {
    hasDraft: Boolean(draftData),
    showDraftNotice,
    saveDraft,
    restoreDraft,
    ignoreDraft,
  }
}
