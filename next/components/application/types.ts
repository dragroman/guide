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

// Типы для компонентов шагов
export interface StepProps {
  // React Hook Form props
  control: Control<ApplicationSchemaType>
  errors: FieldErrors<ApplicationSchemaType>
  formData: ApplicationSchemaType
  setValue: (name: any, value: any) => void

  // Обработчики для старых компонентов (для обратной совместимости)
  handleChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  updateFormData?: (fieldName: string, value: any) => void

  // Специфичные обработчики
  handleDateChange?: (dateRange: DateRange | undefined) => void
  handlePurposeChange?: (name: string, checked: boolean) => void
  handlePurposeTextChange?: (value: string) => void
  handleAccommodationChange?: (name: string, checked: boolean) => void
  handleAccommodationTextChange?: (value: string) => void
  handlePreferenceChange?: (name: string, checked: boolean) => void
  handlePreferenceTextChange?: (value: string) => void
}

// Дополнительные пропсы для специфичных шагов
export interface TripPurposeStepProps extends StepProps {
  handlePurposeChange: (name: string, checked: boolean) => void
  handlePurposeTextChange: (value: string) => void
  handleDateChange: (dateRange: RDPDateRange | undefined) => void
}

export interface AccommodationStepProps extends StepProps {
  handleAccommodationChange: (name: string, checked: boolean) => void
  handleAccommodationTextChange: (value: string) => void
  handlePreferenceChange: (name: string, checked: boolean) => void
  handlePreferenceTextChange: (value: string) => void
}

export interface TripDatesStepProps extends StepProps {}
