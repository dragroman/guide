"use client"
import { useCallback } from "react"
import { DateRange } from "react-day-picker"
import { differenceInDays } from "date-fns"
import { saveFormDraft } from "@/lib/formStorage"
import { ApplicationSchemaType } from "../schemas/applicationSchema"

/**
 * Хук для обработчиков различных типов полей формы
 */
export function useFieldHandlers(
  formData: ApplicationSchemaType,
  dispatch: Function,
  clearFieldErrors: (fieldName: string) => void
) {
  /**
   * Обновление данных формы
   */
  const updateFormData = useCallback(
    (fieldName: string, value: any) => {
      dispatch({ type: "SET_FIELD", field: fieldName, value })

      // Очищаем ошибку для обновляемого поля и всех связанных полей
      clearFieldErrors(fieldName)

      // Сохраняем черновик при каждом изменении
      const updatedData = {
        ...formData,
        [fieldName]: value,
      } as ApplicationSchemaType
      saveFormDraft(updatedData)
    },
    [formData, clearFieldErrors, dispatch]
  )

  /**
   * Обработчик для стандартных HTML-инпутов
   */
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target
      updateFormData(name, value)
    },
    [updateFormData]
  )

  /**
   * Обработчик для компонента выбора дат
   */
  const handleDateChange = useCallback(
    (dateRange: DateRange | undefined) => {
      const datesSelected = !!(dateRange?.from && dateRange?.to)

      let daysCount = null
      if (datesSelected && dateRange?.from && dateRange?.to) {
        // Рассчитываем количество дней, включая начальный и конечный дни
        daysCount = differenceInDays(dateRange.to, dateRange.from) + 1
      }

      // Преобразуем в ожидаемый формат даты
      const formattedDateRange = dateRange
        ? {
            from: dateRange.from,
            to: dateRange.to,
          }
        : undefined

      // Обновляем оба поля
      updateFormData("dateRange", formattedDateRange)
      updateFormData("daysCount", daysCount)

      if (datesSelected) {
        dispatch({ type: "SET_DATES_SELECTED", selected: true })
      }
    },
    [updateFormData, dispatch]
  )

  /**
   * Обработчик изменения целей поездки
   */
  const handlePurposeChange = useCallback(
    (name: string, checked: boolean) => {
      const updatedPurpose = {
        ...formData.tripPurpose,
        [name]: checked,
      }

      // Если снимаем галочку "Другое", очищаем описание
      if (name === "other" && !checked) {
        updatedPurpose.otherDescription = ""
        dispatch({ type: "CLEAR_ERROR", field: "tripPurpose.otherDescription" })
      }

      updateFormData("tripPurpose", updatedPurpose)
    },
    [formData.tripPurpose, updateFormData, dispatch]
  )

  /**
   * Обработчик изменения текстового описания целей поездки
   */
  const handlePurposeTextChange = useCallback(
    (value: string) => {
      const updatedPurpose = {
        ...formData.tripPurpose,
        otherDescription: value,
      }

      updateFormData("tripPurpose", updatedPurpose)
    },
    [formData.tripPurpose, updateFormData]
  )

  /**
   * Обработчик изменения типа размещения
   */
  const handleAccommodationChange = useCallback(
    (name: string, checked: boolean) => {
      const updatedAccommodation = {
        ...formData.accommodation,
        [name]: checked,
      }

      // Если снимаем галочку "Другое", очищаем описание
      if (name === "other" && !checked) {
        updatedAccommodation.otherDescription = ""
        dispatch({
          type: "CLEAR_ERROR",
          field: "accommodation.otherDescription",
        })
      }

      updateFormData("accommodation", updatedAccommodation)
    },
    [formData.accommodation, updateFormData, dispatch]
  )

  /**
   * Обработчик изменения текстового описания типа размещения
   */
  const handleAccommodationTextChange = useCallback(
    (value: string) => {
      const updatedAccommodation = {
        ...formData.accommodation,
        otherDescription: value,
      }

      updateFormData("accommodation", updatedAccommodation)
    },
    [formData.accommodation, updateFormData]
  )

  /**
   * Обработчик изменения предпочтений к размещению
   */
  const handlePreferenceChange = useCallback(
    (name: string, checked: boolean) => {
      const updatedPreferences = {
        ...formData.accommodationPreferences,
        [name]: checked,
      }

      // Если снимаем галочку "Другое", очищаем описание
      if (name === "other" && !checked) {
        updatedPreferences.otherDescription = ""
        dispatch({
          type: "CLEAR_ERROR",
          field: "accommodationPreferences.otherDescription",
        })
      }

      updateFormData("accommodationPreferences", updatedPreferences)
    },
    [formData.accommodationPreferences, updateFormData, dispatch]
  )

  /**
   * Обработчик изменения текстового описания предпочтений к размещению
   */
  const handlePreferenceTextChange = useCallback(
    (value: string) => {
      const updatedPreferences = {
        ...formData.accommodationPreferences,
        otherDescription: value,
      }

      updateFormData("accommodationPreferences", updatedPreferences)
    },
    [formData.accommodationPreferences, updateFormData]
  )

  return {
    updateFormData,
    handleChange,
    handleDateChange,
    handlePurposeChange,
    handlePurposeTextChange,
    handleAccommodationChange,
    handleAccommodationTextChange,
    handlePreferenceChange,
    handlePreferenceTextChange,
  }
}
