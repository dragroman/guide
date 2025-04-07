import { Control, FieldErrors } from "react-hook-form"
import { DateRange, DateRange as RDPDateRange } from "react-day-picker"
import { ApplicationSchemaType } from "./schemas/applicationSchema"

// Типы для состояния формы
export type FormState = {
  formData: ApplicationSchemaType
  isSubmitting: boolean
  isSuccess: boolean
  isError: boolean
  errorMessage: string
  errors: Record<string, string>
  currentStep: number
  datesSelected: boolean
}

// Типы действий для редьюсера
export type FormAction =
  | { type: "SET_FIELD"; field: string; value: any }
  | { type: "SET_ERROR"; field: string; message: string }
  | { type: "SET_ERRORS"; errors: Record<string, string> }
  | { type: "CLEAR_ERROR"; field: string }
  | { type: "CLEAR_ALL_ERRORS" }
  | { type: "SET_STEP"; step: number }
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "SUBMIT_START" }
  | { type: "SUBMIT_SUCCESS" }
  | { type: "SUBMIT_ERROR"; message: string; errors?: Record<string, string> }
  | { type: "SET_DATES_SELECTED"; selected: boolean }
  | { type: "RESET_FORM" }

// Типы для компонентов шагов с добавлением новых универсальных обработчиков
export interface StepProps {
  // React Hook Form props
  control: Control<ApplicationSchemaType>
  errors: FieldErrors<ApplicationSchemaType>
  formData: ApplicationSchemaType
  setValue: (name: any, value: any) => void

  // Универсальные обработчики для опций и текстовых полей
  handleOptionChange?: (path: string, name: string, checked: boolean) => void
  handleTextChange?: (path: string, value: string) => void

  // Обработчики для старых компонентов (для обратной совместимости)
  handleChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  updateFormData?: (fieldName: string, value: any) => void

  // Специфичные обработчики (для обратной совместимости)
  handleDateChange?: (dateRange: DateRange | undefined) => void
}

// Дополнительные пропсы для специфичных шагов
export interface TripPurposeStepProps extends StepProps {
  handleDateChange: (dateRange: RDPDateRange | undefined) => void
}

export interface LocationData {
  id: string
  name: string
  field_title_cn: string
  description?: string
  field_select_text?: string
  drupal_internal__tid?: number
  image?: {
    url: string
    alt?: string
  }
}
