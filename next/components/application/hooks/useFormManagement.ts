"use client"
import { loadFormDraft, clearFormDraft } from "@/lib/formStorage"
import { useFormState } from "./useFormState"
import { useFieldHandlers } from "./useFieldHandlers"
import { useFormValidation } from "./useFormValidation"
import { useFormNavigation } from "./useFormNavigation"
import { useFormSubmission } from "./useFormSubmission"

/**
 * Основной хук для управления формой
 * Собирает функциональность из других хуков
 */
export function useFormManagement() {
  // Получаем базовое состояние и функции
  const { state, dispatch, clearFieldErrors, progress } = useFormState()

  const {
    formData,
    currentStep,
    errors,
    isSubmitting,
    isSuccess,
    isError,
    errorMessage,
    hasDraft,
    datesSelected,
  } = state

  // Обработчики полей
  const {
    updateFormData,
    handleChange,
    handleDateChange,
    handlePurposeChange,
    handlePurposeTextChange,
    handleAccommodationChange,
    handleAccommodationTextChange,
    handlePreferenceChange,
    handlePreferenceTextChange,
  } = useFieldHandlers(formData, dispatch, clearFieldErrors)

  // Валидация формы
  const { validateStep, validateForm } = useFormValidation(
    formData,
    currentStep,
    datesSelected,
    errors,
    dispatch
  )

  // Навигация между шагами
  const { nextStep, prevStep, goToStep } = useFormNavigation(
    currentStep,
    validateStep,
    dispatch
  )

  // Отправка формы
  const { handleSubmit } = useFormSubmission(
    formData,
    currentStep,
    validateStep,
    validateForm,
    dispatch
  )

  // Загрузка сохраненного черновика
  const loadSavedDraft = () => {
    const savedForm = loadFormDraft()
    if (savedForm) {
      // Убедимся, что все поля otherDescription существуют
      const formData = {
        ...savedForm,
        tripPurpose: {
          ...savedForm.tripPurpose,
          otherDescription: savedForm.tripPurpose.otherDescription || "",
        },
        accommodation: {
          ...savedForm.accommodation,
          otherDescription: savedForm.accommodation.otherDescription || "",
        },
        accommodationPreferences: {
          ...savedForm.accommodationPreferences,
          otherDescription:
            savedForm.accommodationPreferences.otherDescription || "",
        },
      }

      dispatch({
        type: "LOAD_DRAFT",
        formData: formData,
      })
    }
  }

  // Игнорирование сохраненного черновика
  const ignoreDraft = () => {
    dispatch({ type: "IGNORE_DRAFT" })
    clearFormDraft()
  }

  // Сброс формы
  const resetForm = () => {
    dispatch({ type: "RESET_FORM" })
    clearFormDraft()
  }

  // Возвращаем всё, что нужно компонентам формы
  return {
    state,
    formData,
    currentStep,
    errors,
    isSubmitting,
    isSuccess,
    isError,
    errorMessage,
    hasDraft,
    progress,
    updateFormData,
    handleChange,
    handleDateChange,
    handlePurposeChange,
    handlePurposeTextChange,
    handleAccommodationChange,
    handleAccommodationTextChange,
    handlePreferenceChange,
    handlePreferenceTextChange,
    nextStep,
    prevStep,
    goToStep,
    handleSubmit,
    resetForm,
    loadSavedDraft,
    ignoreDraft,
  }
}
