"use client"
import { useReducer, useCallback, useEffect } from "react"
import { ZodError } from "zod"
import { DateRange } from "react-day-picker"
import { FormState, FormAction, ApplicationSchemaType } from "../types"
import { formReducer } from "../reducer"
import { defaultFormValues, TOTAL_STEPS } from "../constants"
import { applicationSchema } from "@/components/application/schemas/applicationSchema"
import { saveFormDraft, loadFormDraft, clearFormDraft } from "@/lib/formStorage"
import { handleZodError, formatDateRangeForSubmission } from "../utils"

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

export function useFormManagement() {
  const [state, dispatch] = useReducer(formReducer, initialState)
  const {
    formData,
    currentStep,
    errors,
    isSubmitting,
    isSuccess,
    isError,
    errorMessage,
    hasDraft,
  } = state

  // При монтировании компонента проверяем наличие сохраненного черновика
  useEffect(() => {
    const savedForm = loadFormDraft()
    if (savedForm) {
      dispatch({ type: "DRAFT_FOUND" })
    }
  }, [])

  /**
   * Валидация поля с использованием Zod
   */
  const validateField = useCallback(
    (name: keyof ApplicationSchemaType, value: any) => {
      try {
        // Создаем частичную схему для валидации только одного поля
        const partialSchema = applicationSchema.pick({ [name]: true } as {
          [key in keyof ApplicationSchemaType]?: true | undefined
        })
        partialSchema.parse({ [name]: value })

        // Если валидация успешна, очищаем ошибку для этого поля
        dispatch({ type: "CLEAR_ERROR", field: name })
        return true
      } catch (error) {
        if (error instanceof ZodError) {
          // Извлекаем сообщение об ошибке для этого поля
          const fieldError = error.errors.find((err) => err.path[0] === name)
          if (fieldError) {
            dispatch({
              type: "SET_ERROR",
              field: name,
              message: fieldError.message,
            })
          }
        }
        return false
      }
    },
    []
  )

  /**
   * Обновление данных формы
   */
  const updateFormData = useCallback(
    (fieldName: string, value: any) => {
      dispatch({ type: "SET_FIELD", field: fieldName, value })
      validateField(fieldName as keyof ApplicationSchemaType, value)

      // Сохраняем черновик
      const updatedData = {
        ...formData,
        [fieldName]: value,
      } as ApplicationSchemaType
      saveFormDraft(updatedData)
    },
    [formData, validateField]
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
        const diffTime = dateRange.to.getTime() - dateRange.from.getTime()
        daysCount = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1
      }

      // Обновляем оба поля
      updateFormData("dateRange", dateRange || undefined)
      updateFormData("daysCount", daysCount)

      if (datesSelected) {
        dispatch({ type: "SET_DATES_SELECTED", selected: true })
      }
    },
    [updateFormData]
  )

  const handlePurposeChange = useCallback(
    (name: string, checked: boolean) => {
      const updatedPurpose = {
        ...formData.tripPurpose,
        [name]: checked,
      }

      updateFormData("tripPurpose", updatedPurpose)
    },
    [formData.tripPurpose, updateFormData]
  )

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

  const handleAccommodationChange = useCallback(
    (name: string, checked: boolean) => {
      const updatedAccommodation = {
        ...formData.accommodation,
        [name]: checked,
      }

      updateFormData("accommodation", updatedAccommodation)
    },
    [formData.accommodation, updateFormData]
  )

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

  const handlePreferenceChange = useCallback(
    (name: string, checked: boolean) => {
      const updatedPreferences = {
        ...formData.accommodationPreferences,
        [name]: checked,
      }

      updateFormData("accommodationPreferences", updatedPreferences)
    },
    [formData.accommodationPreferences, updateFormData]
  )

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

  /**
   * Валидация текущего шага формы
   */
  const validateStep = useCallback(() => {
    try {
      switch (currentStep) {
        case 0: // Имя
          applicationSchema.pick({ name: true }).parse(formData)
          return true
        case 1: // Телефон и email
          applicationSchema.pick({ phone: true }).parse(formData)
          applicationSchema.pick({ email: true }).parse(formData)
          return true
        case 2:
          const anyPurposeSelected = Object.entries(formData.tripPurpose)
            .filter(([key]) => key !== "otherDescription")
            .some(([_, value]) => value === true)

          if (!anyPurposeSelected) {
            throw new Error("Выберите хотя бы одну цель поездки")
          }

          // Если выбрано "Другое", проверяем наличие описания
          if (
            formData.tripPurpose.other &&
            !formData.tripPurpose.otherDescription
          ) {
            throw new Error("Укажите описание для пункта 'Другое'")
          }
          if (!state.datesSelected) {
            if (!formData.dateRange?.from || !formData.dateRange?.to) {
              throw new Error("Укажите даты начала и окончания поездки")
            }
          }
          applicationSchema.pick({ dateRange: true }).parse(formData)

          return true
        case 3:
          const anyAccommodationSelected = Object.entries(
            formData.accommodation
          )
            .filter(([key]) => key !== "otherDescription")
            .some(([_, value]) => value === true)

          if (!anyAccommodationSelected) {
            throw new Error("Выберите хотя бы один тип размещения")
          }

          // Если выбрано "Другое", проверяем наличие описания
          if (
            formData.accommodation.other &&
            !formData.accommodation.otherDescription
          ) {
            throw new Error("Укажите описание для пункта 'Другое'")
          }

          return true
          return true
        case 4: // Подтверждение - считаем валидным
          return true
        default:
          return false
      }
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMap = handleZodError(error)

        // Обновляем состояние ошибок
        Object.entries(errorMap).forEach(([field, message]) => {
          dispatch({ type: "SET_ERROR", field, message })
        })
      } else if (error instanceof Error) {
        // Определяем правильное поле для ошибки в зависимости от текущего шага
        let errorField
        switch (currentStep) {
          case 0:
            errorField = "name"
            break
          case 1:
            errorField = error.message.toLowerCase().includes("телефон")
              ? "phone"
              : "email"
            break
          case 2:
            if (error.message.includes("Другое")) {
              errorField = "tripPurpose.otherDescription"
            } else {
              errorField = "tripPurpose"
            }
            break
          case 3:
            errorField = "dateRange"
            break
          default:
            errorField = ""
        }

        dispatch({
          type: "SET_ERROR",
          field: errorField,
          message: error.message,
        })
      }
      return false
    }
  }, [currentStep, formData, state.datesSelected])

  /**
   * Переход к следующему шагу
   */
  const nextStep = useCallback(() => {
    if (validateStep()) {
      dispatch({ type: "NEXT_STEP" })
    }
  }, [validateStep])

  /**
   * Переход к предыдущему шагу
   */
  const prevStep = useCallback(() => {
    dispatch({ type: "PREV_STEP" })
  }, [])

  /**
   * Переход к конкретному шагу
   */
  const goToStep = useCallback(
    (step: number) => {
      if (step < currentStep) {
        dispatch({ type: "SET_STEP", step })
      }
    },
    [currentStep]
  )

  /**
   * Загрузка сохраненного черновика
   */
  const loadSavedDraft = useCallback(() => {
    const savedForm = loadFormDraft()
    if (savedForm) {
      dispatch({
        type: "LOAD_DRAFT",
        formData: savedForm as ApplicationSchemaType,
      })
    }
  }, [])

  /**
   * Игнорирование сохраненного черновика
   */
  const ignoreDraft = useCallback(() => {
    dispatch({ type: "IGNORE_DRAFT" })
  }, [])

  /**
   * Отправка формы
   */
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()

      // На последнем шаге (подтверждение) нам не нужно валидировать снова,
      // так как все уже должно быть валидным. Но мы проверяем все данные перед отправкой.
      if (currentStep !== TOTAL_STEPS - 1) {
        if (!validateStep()) {
          return
        }
      }

      dispatch({ type: "SUBMIT_START" })

      try {
        // Проверка, что даты существуют
        if (!formData.dateRange?.from || !formData.dateRange?.to) {
          throw new Error("Пожалуйста, укажите даты начала и окончания поездки")
        }

        // Полная валидация всей формы перед отправкой
        try {
          applicationSchema.parse(formData)
        } catch (validationError) {
          if (validationError instanceof ZodError) {
            const errorMap = handleZodError(validationError)
            dispatch({
              type: "SUBMIT_ERROR",
              message: "Пожалуйста, исправьте ошибки в форме перед отправкой",
              errors: errorMap,
            })
            return
          }
          throw validationError
        }

        // Форматируем даты для отправки
        const formattedDates = formatDateRangeForSubmission(formData.dateRange)

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

        if (error instanceof ZodError) {
          const errorMap = handleZodError(error)

          dispatch({
            type: "SUBMIT_ERROR",
            message: "Пожалуйста, исправьте ошибки в форме",
            errors: errorMap,
          })
        } else {
          dispatch({
            type: "SUBMIT_ERROR",
            message:
              error instanceof Error
                ? error.message
                : "Произошла ошибка при отправке формы",
          })
        }
      }
    },
    [formData, validateStep, currentStep]
  )

  /**
   * Сброс формы для отправки новой заявки
   */
  const resetForm = useCallback(() => {
    dispatch({ type: "RESET_FORM" })
  }, [])

  // Прогресс заполнения формы
  const progress = Math.floor(((currentStep + 1) / TOTAL_STEPS) * 100)

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
