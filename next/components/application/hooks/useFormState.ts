import { useReducer, useEffect } from "react"
import { FormState } from "../types"
import { formReducer } from "../reducer"
import { defaultFormValues, TOTAL_STEPS } from "../constants"
import { loadFormDraft } from "@/lib/formStorage"

// Начальное состояние формы
const initialState: FormState = {
  formData: defaultFormValues,
  isSubmitting: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
  hasDraft: false,
  errors: {},
  currentStep: 0,
  datesSelected: false,
}

/**
 * Хук для управления состоянием формы
 */
export function useFormState() {
  const [state, dispatch] = useReducer(formReducer, initialState)

  // При монтировании компонента проверяем наличие сохраненного черновика
  useEffect(() => {
    const savedForm = loadFormDraft()
    if (savedForm) {
      dispatch({ type: "DRAFT_FOUND" })
    }
  }, [])

  // Вычисляем прогресс заполнения формы
  const progress = Math.floor(((state.currentStep + 1) / TOTAL_STEPS) * 100)

  // Очистка ошибок для полей
  const clearFieldErrors = (fieldName: string) => {
    // Очищаем ошибку самого поля
    dispatch({ type: "CLEAR_ERROR", field: fieldName })

    // Очищаем связанные ошибки
    if (fieldName === "tripPurpose") {
      dispatch({ type: "CLEAR_ERROR", field: "tripPurpose.otherDescription" })
    } else if (fieldName === "accommodation") {
      dispatch({ type: "CLEAR_ERROR", field: "accommodation.otherDescription" })
    } else if (fieldName === "dateRange") {
      dispatch({ type: "CLEAR_ERROR", field: "dateRange.from" })
      dispatch({ type: "CLEAR_ERROR", field: "dateRange.to" })
    }

    // Если меняем поле otherDescription, очищаем ошибку родительского поля
    if (fieldName.includes("otherDescription")) {
      const parentField = fieldName.split(".")[0]
      dispatch({ type: "CLEAR_ERROR", field: parentField })
    }
  }

  return {
    state,
    dispatch,
    clearFieldErrors,
    progress,
  }
}
