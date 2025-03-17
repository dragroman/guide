import { useState, useEffect, useCallback, useRef } from "react"
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

  // Флаг, указывающий, что пользователь уже принял решение по черновику
  const userMadeDecision = useRef(false)

  // Используем ref для отслеживания времени последнего сохранения
  const lastSaveTime = useRef(0)

  // Проверка наличия черновика при загрузке компонента
  useEffect(() => {
    // Проверяем черновик только при инициализации и если пользователь еще не принял решение
    if (draftData && !userMadeDecision.current) {
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

          // Проверка объектов с options и otherDescription (новая структура)
          if (
            key === "options" &&
            typeof value === "object" &&
            value !== null
          ) {
            // Приводим value к типу Record<string, any> для доступа к произвольным свойствам
            const optionsObj = value as Record<string, any>
            return Object.entries(optionsObj).some(
              ([k, v]) => k !== "otherDescription" && v === true
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

      // Проверяем наличие данных в черновике
      const hasData = hasAnyData(draftData)
      setShowDraftNotice(hasData)
    }
  }, [draftData]) // Зависимость только от draftData

  // Сохранение черновика при изменении формы
  const saveDraft = useCallback(() => {
    // Не сохраняем черновик, если пользователь уже решил игнорировать его
    if (userMadeDecision.current && !showDraftNotice) {
      return
    }

    // Проверяем, есть ли в форме хоть какие-то данные, которые стоит сохранить
    const hasAnyValue =
      formData.name ||
      formData.contact.email ||
      formData.contact.phone ||
      (formData.trip.dateRange &&
        (formData.trip.dateRange.from || formData.trip.dateRange.to)) ||
      // Проверка целей поездки
      Object.values(formData.trip.purpose.options).some(
        (val) => val === true
      ) ||
      // Проверка типов размещения
      Object.values(formData.accommodation.options).some(
        (val) => typeof val === "boolean" && val === true
      ) ||
      // Проверка предпочтений размещения
      Object.values(formData.accommodation.preferences).some(
        (val) => typeof val === "boolean" && val === true
      )

    if (hasAnyValue) {
      // Обновляем время последнего сохранения
      lastSaveTime.current = Date.now()
      setDraftData(formData)
    }
  }, [formData, setDraftData, showDraftNotice])

  // Автоматическое сохранение черновика при изменении данных формы
  useEffect(() => {
    // Не устанавливаем таймер, если пользователь уже решил игнорировать черновик
    if (userMadeDecision.current && !showDraftNotice) {
      return
    }

    const timer = setTimeout(() => {
      saveDraft()
    }, 1000)

    return () => clearTimeout(timer)
  }, [formData, saveDraft, showDraftNotice])

  // Восстановление черновика
  const restoreDraft = useCallback(() => {
    if (draftData) {
      // Рекурсивная функция для обхода вложенных объектов
      const setNestedValues = (data: any, prefix = "") => {
        Object.entries(data).forEach(([key, value]) => {
          const path = prefix ? `${prefix}.${key}` : key

          // Специальная обработка для dateRange
          if (path === "dateRange" && value && typeof value === "object") {
            const dateRange: Record<string, Date> = {}

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
          // Обработка для ageGroups (и других объектных типов без преобразования)
          else if (
            (path === "ageGroups" ||
              path === "accommodation" ||
              path === "tripPurpose" ||
              path === "accommodationPreferences") &&
            value &&
            typeof value === "object" &&
            !Array.isArray(value)
          ) {
            // Установка объекта напрямую
            setValue(path as any, { ...value })
          }
          // Если значение - объект и не null/undefined, обрабатываем его рекурсивно
          else if (
            value !== null &&
            typeof value === "object" &&
            !Array.isArray(value) &&
            !(value instanceof Date)
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
    // Отмечаем, что пользователь принял решение по черновику
    userMadeDecision.current = true
    // Удаляем черновик
    removeDraftData()
    // Скрываем уведомление о черновике
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
