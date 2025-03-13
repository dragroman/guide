import { useCallback } from "react"
import { TOTAL_STEPS } from "../constants"
import { formatDateRangeForSubmission } from "../utils"
import { clearFormDraft } from "@/lib/formStorage"
import { ApplicationSchemaType } from "../schemas/applicationSchema"

/**
 * Хук для обработки отправки формы
 */
export function useFormSubmission(
  formData: ApplicationSchemaType,
  currentStep: number,
  validateStep: () => boolean,
  validateForm: () => boolean,
  dispatch: Function
) {
  /**
   * Отправка формы
   */
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()

      if (currentStep === TOTAL_STEPS - 1) {
        if (!validateForm()) {
          return
        }
      } else {
        if (!validateStep()) {
          return
        }

        // Переходим к следующему шагу
        dispatch({ type: "NEXT_STEP" })
        return
      }

      dispatch({ type: "SUBMIT_START" })

      try {
        // Форматируем даты для отправки
        if (!formData.dateRange?.from || !formData.dateRange?.to) {
          throw new Error("Пожалуйста, укажите даты начала и окончания поездки")
        }

        const formattedDates = formatDateRangeForSubmission({
          from: formData.dateRange.from,
          to: formData.dateRange.to,
        })

        // Отправка данных на сервер
        const response = await fetch("/api/application", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            phone: formData.phone,
            date_from: formattedDates.from,
            date_to: formattedDates.to,
            email: formData.email,
            days_count: formData.daysCount,
            tripPurpose: formData.tripPurpose,
            accommodation: formData.accommodation,
            accommodationPreferences: formData.accommodationPreferences,
          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(
            errorData.message || "Произошла ошибка при отправке формы"
          )
        }

        // Удаляем черновик после успешной отправки
        clearFormDraft()

        // Устанавливаем состояние успешной отправки
        dispatch({ type: "SUBMIT_SUCCESS" })
      } catch (error) {
        console.error("Ошибка отправки формы:", error)

        dispatch({
          type: "SUBMIT_ERROR",
          message:
            error instanceof Error
              ? error.message
              : "Произошла ошибка при отправке формы",
        })
      }
    },
    [formData, validateStep, validateForm, currentStep, dispatch]
  )

  return {
    handleSubmit,
  }
}
