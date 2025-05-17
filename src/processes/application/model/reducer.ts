// components/application/reducer.ts
import { TOTAL_STEPS } from "../config/constants"

// Упрощенные типы для состояния формы
export type FormState = {
  currentStep: number
  isSubmitting: boolean
  isSuccess: boolean
  isError: boolean
  errorMessage: string
}

// Упрощенные типы действий - сократили количество типов
export type FormAction =
  | { type: "NAVIGATION"; action: "NEXT" | "PREV" | "GO_TO"; step?: number }
  | {
      type: "SUBMISSION"
      status: "START" | "SUCCESS" | "ERROR"
      message?: string
    }
  | { type: "RESET" }

// Начальное состояние формы
export const initialState: FormState = {
  currentStep: 0,
  isSubmitting: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
}

// Упрощенный редьюсер с меньшим количеством типов действий
export function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    // Объединили все действия, связанные с навигацией
    case "NAVIGATION":
      switch (action.action) {
        case "NEXT":
          return {
            ...state,
            currentStep: Math.min(state.currentStep + 1, TOTAL_STEPS - 1),
          }
        case "PREV":
          return {
            ...state,
            currentStep: Math.max(state.currentStep - 1, 0),
          }
        case "GO_TO":
          if (
            action.step !== undefined &&
            action.step >= 0 &&
            action.step < TOTAL_STEPS
          ) {
            return { ...state, currentStep: action.step }
          }
          return state
      }

    // Объединили все действия, связанные с отправкой формы
    case "SUBMISSION":
      switch (action.status) {
        case "START":
          return {
            ...state,
            isSubmitting: true,
            isError: false,
            errorMessage: "",
          }
        case "SUCCESS":
          return {
            ...state,
            isSubmitting: false,
            isSuccess: true,
            isError: false,
            errorMessage: "",
          }
        case "ERROR":
          return {
            ...state,
            isSubmitting: false,
            isError: true,
            errorMessage: action.message || "Произошла ошибка",
          }
      }

    // Сброс формы
    case "RESET":
      return { ...initialState }

    default:
      return state
  }
}
