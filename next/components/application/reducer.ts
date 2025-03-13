import { FormState, FormAction } from "./types"
import { TOTAL_STEPS, defaultFormValues } from "./constants"

/**
 * Редьюсер для управления состоянием формы
 */
export function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.field]: action.value,
        },
      }
    case "SET_ERROR":
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: action.message,
        },
      }
    case "SET_ERRORS":
      return {
        ...state,
        errors: action.errors || {},
      }
    case "CLEAR_ERROR":
      const newErrors = { ...state.errors }
      delete newErrors[action.field]
      return {
        ...state,
        errors: newErrors,
      }
    case "CLEAR_ALL_ERRORS":
      return {
        ...state,
        errors: {},
      }
    case "SET_STEP":
      // Проверяем, что шаг в допустимых пределах
      if (action.step >= 0 && action.step < TOTAL_STEPS) {
        return {
          ...state,
          currentStep: action.step,
        }
      }
      return state
    case "NEXT_STEP":
      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, TOTAL_STEPS - 1),
      }
    case "PREV_STEP":
      return {
        ...state,
        currentStep: Math.max(state.currentStep - 1, 0),
      }
    case "SUBMIT_START":
      return {
        ...state,
        isSubmitting: true,
        isError: false,
        errorMessage: "",
      }
    case "SUBMIT_SUCCESS":
      return {
        ...state,
        isSubmitting: false,
        isSuccess: true,
        isError: false,
        errorMessage: "",
        hasDraft: false,
        errors: {},
      }
    case "SUBMIT_ERROR":
      return {
        ...state,
        isSubmitting: false,
        isError: true,
        errorMessage: action.message,
        errors: action.errors || state.errors,
      }
    case "DRAFT_FOUND":
      return {
        ...state,
        hasDraft: true,
      }
    case "LOAD_DRAFT":
      return {
        ...state,
        formData: action.formData,
        hasDraft: false,
        datesSelected: !!(
          action.formData.dateRange?.from && action.formData.dateRange?.to
        ),
      }
    case "IGNORE_DRAFT":
      return {
        ...state,
        hasDraft: false,
      }
    case "SET_DATES_SELECTED":
      return {
        ...state,
        datesSelected: action.selected,
      }
    case "RESET_FORM":
      return {
        ...state,
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
    default:
      return state
  }
}
