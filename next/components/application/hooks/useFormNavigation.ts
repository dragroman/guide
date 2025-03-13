"use client"
import { useCallback } from "react"
import { TOTAL_STEPS } from "../constants"

/**
 * Хук для навигации между шагами формы
 */
export function useFormNavigation(
  currentStep: number,
  validateStep: () => boolean,
  dispatch: Function
) {
  /**
   * Переход к следующему шагу
   */
  const nextStep = useCallback(() => {
    if (validateStep()) {
      dispatch({ type: "NEXT_STEP" })
    }
  }, [validateStep, dispatch])

  /**
   * Переход к предыдущему шагу
   */
  const prevStep = useCallback(() => {
    dispatch({ type: "PREV_STEP" })
  }, [dispatch])

  /**
   * Переход к конкретному шагу
   */
  const goToStep = useCallback(
    (step: number) => {
      if (step < currentStep) {
        dispatch({ type: "SET_STEP", step })
      } else if (step === currentStep) {
        // Уже на этом шаге, ничего не делаем
        return
      } else {
        // Пытаемся перейти на шаг вперед - нужно пройти валидацию
        // Для простоты просто вызываем nextStep нужное количество раз
        for (let i = currentStep; i < step; i++) {
          if (!validateStep()) {
            return // Останавливаемся, если валидация не прошла
          }
          dispatch({ type: "NEXT_STEP" })
        }
      }
    },
    [currentStep, validateStep, dispatch]
  )

  /**
   * Управление черновиками
   */
  const loadSavedDraft = useCallback(
    (formData: any) => {
      dispatch({
        type: "LOAD_DRAFT",
        formData: formData,
      })
    },
    [dispatch]
  )

  /**
   * Игнорирование сохраненного черновика
   */
  const ignoreDraft = useCallback(() => {
    dispatch({ type: "IGNORE_DRAFT" })
  }, [dispatch])

  /**
   * Сброс формы
   */
  const resetForm = useCallback(() => {
    dispatch({ type: "RESET_FORM" })
  }, [dispatch])

  return {
    nextStep,
    prevStep,
    goToStep,
    loadSavedDraft,
    ignoreDraft,
    resetForm,
  }
}
