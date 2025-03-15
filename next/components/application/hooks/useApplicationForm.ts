import { useReducer, useCallback, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { DateRange } from "react-day-picker"
import { differenceInDays, format } from "date-fns"
import {
  applicationSchema,
  ApplicationSchemaType,
} from "../schemas/applicationSchema"
import { defaultFormValues, TOTAL_STEPS } from "../constants"
import { useDraftForm } from "./useDraftForm"

// Типы для состояния формы
type FormState = {
  currentStep: number
  isSubmitting: boolean
  isSuccess: boolean
  isError: boolean
  errorMessage: string
}

// Типы действий для редьюсера
type FormAction =
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "SET_STEP"; step: number }
  | { type: "SUBMIT_START" }
  | { type: "SUBMIT_SUCCESS" }
  | { type: "SUBMIT_ERROR"; message: string }
  | { type: "RESET_FORM" }

// Начальное состояние формы
const initialState: FormState = {
  currentStep: 0,
  isSubmitting: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
}

// Редьюсер для управления состоянием формы
function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
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
    case "SET_STEP":
      if (action.step >= 0 && action.step < TOTAL_STEPS) {
        return { ...state, currentStep: action.step }
      }
      return state
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
      }
    case "SUBMIT_ERROR":
      return {
        ...state,
        isSubmitting: false,
        isError: true,
        errorMessage: action.message,
      }
    case "RESET_FORM":
      return { ...initialState }
    default:
      return state
  }
}

// Определяем поля для валидации на каждом шаге
const stepValidationFields = [
  ["name", "peopleCount", "ageGroups"],
  ["dateRange", "tripPurpose"], // даты и цель поездки
  ["accommodation", "accommodationPreferences"], // размещение
  ["phone", "email"], //  контактная информация
  [], // Шаг 4 - подтверждение, проверяем всю форму
]

// Основной хук для управления формой
export function useApplicationForm() {
  // React Hook Form для управления полями и валидации
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
    getValues,
    reset,
    trigger,
    setError,
    clearErrors,
  } = useForm<ApplicationSchemaType>({
    resolver: zodResolver(applicationSchema),
    defaultValues: defaultFormValues,
    mode: "onChange", // Валидация при изменении
  })

  const [state, dispatch] = useReducer(formReducer, initialState)

  // Наблюдаем за всеми полями формы
  const formData = watch()

  // Интеграция функциональности черновика
  const { hasDraft, showDraftNotice, saveDraft, restoreDraft, ignoreDraft } =
    useDraftForm(formData, setValue)

  // Вычисляем прогресс заполнения формы
  const progress = Math.floor(((state.currentStep + 1) / TOTAL_STEPS) * 100)

  // Валидация текущего шага
  const validateCurrentStep = useCallback(async () => {
    // На последнем шаге проверяем всю форму
    if (state.currentStep === TOTAL_STEPS - 1) {
      return await trigger()
    }

    // Обязательная валидация полей текущего шага
    const fieldsToValidate = stepValidationFields[state.currentStep]
    const isStepValid = await trigger(fieldsToValidate as any)

    // Для шага 2 (индекс 2) - даты и цель поездки - проверяем особые условия
    if (state.currentStep === 1) {
      // Проверяем, что дата выбрана
      const dateRange = getValues("dateRange")
      if (!dateRange || !dateRange.from || !dateRange.to) {
        setError("dateRange", {
          type: "custom",
          message: "Пожалуйста, выберите даты поездки",
        })
        return false
      }

      // Проверяем, что выбрана хотя бы одна цель поездки
      const tripPurpose = getValues("tripPurpose")
      const hasPurpose = Object.entries(tripPurpose)
        .filter(([key]) => key !== "otherDescription")
        .some(([_, value]) => value === true)

      if (!hasPurpose) {
        setError("tripPurpose", {
          type: "custom",
          message: "Выберите хотя бы одну цель поездки",
        })
        return false
      }

      // Проверяем, что если выбрано "Другое", то заполнено описание
      if (
        tripPurpose.other &&
        (!tripPurpose.otherDescription ||
          tripPurpose.otherDescription.trim() === "")
      ) {
        setError("tripPurpose.otherDescription", {
          type: "custom",
          message: "Укажите описание для пункта 'Другое'",
        })
        return false
      }
    }

    // Для шага 3 (индекс 3) - размещение - проверяем особые условия
    if (state.currentStep === 2) {
      // Проверяем, что выбран хотя бы один тип размещения
      const accommodation = getValues("accommodation")
      const hasAccommodation = Object.entries(accommodation)
        .filter(([key]) => key !== "otherDescription")
        .some(([_, value]) => value === true)

      if (!hasAccommodation) {
        setError("accommodation", {
          type: "custom",
          message: "Выберите хотя бы один тип размещения",
        })
        return false
      }

      // Проверяем, что если выбрано "Другое", то заполнено описание
      if (
        accommodation.other &&
        (!accommodation.otherDescription ||
          accommodation.otherDescription.trim() === "")
      ) {
        setError("accommodation.otherDescription", {
          type: "custom",
          message: "Укажите описание для пункта 'Другое'",
        })
        return false
      }

      // Проверяем предпочтения к размещению если выбрано "Другое"
      const preferences = getValues("accommodationPreferences")
      if (
        preferences.other &&
        (!preferences.otherDescription ||
          preferences.otherDescription.trim() === "")
      ) {
        setError("accommodationPreferences.otherDescription", {
          type: "custom",
          message: "Укажите описание для пункта 'Другое'",
        })
        return false
      }
    }

    return isStepValid
  }, [state.currentStep, trigger, getValues, setError])

  // Обработчик для диапазона дат
  const handleDateChange = useCallback(
    (dateRange: DateRange | undefined) => {
      setValue("dateRange", dateRange as any)

      // Очищаем ошибки после выбора дат
      if (dateRange?.from && dateRange?.to) {
        clearErrors("dateRange")
      }

      if (dateRange?.from && dateRange?.to) {
        // Рассчитываем количество дней, включая начальный и конечный дни
        const daysCount = differenceInDays(dateRange.to, dateRange.from) + 1
        setValue("daysCount", daysCount)
      } else {
        setValue("daysCount", null)
      }
    },
    [setValue, clearErrors]
  )

  // Обработчик для чекбоксов типа поездки
  const handlePurposeChange = useCallback(
    (name: string, checked: boolean) => {
      const currentPurpose = getValues("tripPurpose")

      const updatedPurpose = {
        ...currentPurpose,
        [name]: checked,
      }

      // Если снимаем галочку "Другое", очищаем описание
      if (name === "other" && !checked) {
        updatedPurpose.otherDescription = ""
      }

      setValue("tripPurpose", updatedPurpose)

      // Если выбрана хотя бы одна цель, снимаем ошибку
      const hasPurpose = Object.entries(updatedPurpose)
        .filter(([key]) => key !== "otherDescription")
        .some(([_, value]) => value === true)

      if (hasPurpose) {
        clearErrors("tripPurpose")
      }
    },
    [getValues, setValue, clearErrors]
  )

  // Обработчик для текстового описания цели поездки
  const handlePurposeTextChange = useCallback(
    (value: string) => {
      const currentPurpose = getValues("tripPurpose")

      setValue("tripPurpose", {
        ...currentPurpose,
        otherDescription: value,
      })

      // Если поле заполнено, снимаем ошибку
      if (value.trim() !== "") {
        clearErrors("tripPurpose.otherDescription")
      }
    },
    [getValues, setValue, clearErrors]
  )

  // Обработчик для чекбоксов типа размещения
  const handleAccommodationChange = useCallback(
    (name: string, checked: boolean) => {
      const currentAccommodation = getValues("accommodation")

      const updatedAccommodation = {
        ...currentAccommodation,
        [name]: checked,
      }

      // Если снимаем галочку "Другое", очищаем описание
      if (name === "other" && !checked) {
        updatedAccommodation.otherDescription = ""
      }

      setValue("accommodation", updatedAccommodation)

      // Если выбран хотя бы один тип размещения, снимаем ошибку
      const hasAccommodation = Object.entries(updatedAccommodation)
        .filter(([key]) => key !== "otherDescription")
        .some(([_, value]) => value === true)

      if (hasAccommodation) {
        clearErrors("accommodation")
      }
    },
    [getValues, setValue, clearErrors]
  )

  // Обработчик для текстового описания типа размещения
  const handleAccommodationTextChange = useCallback(
    (value: string) => {
      const currentAccommodation = getValues("accommodation")

      setValue("accommodation", {
        ...currentAccommodation,
        otherDescription: value,
      })

      // Если поле заполнено, снимаем ошибку
      if (value.trim() !== "") {
        clearErrors("accommodation.otherDescription")
      }
    },
    [getValues, setValue, clearErrors]
  )

  // Обработчик для чекбоксов предпочтений размещения
  const handlePreferenceChange = useCallback(
    (name: string, checked: boolean) => {
      const currentPreferences = getValues("accommodationPreferences")

      const updatedPreferences = {
        ...currentPreferences,
        [name]: checked,
      }

      // Если снимаем галочку "Другое", очищаем описание
      if (name === "other" && !checked) {
        updatedPreferences.otherDescription = ""
      }

      setValue("accommodationPreferences", updatedPreferences)
    },
    [getValues, setValue]
  )

  // Обработчик для текстового описания предпочтений
  const handlePreferenceTextChange = useCallback(
    (value: string) => {
      const currentPreferences = getValues("accommodationPreferences")

      setValue("accommodationPreferences", {
        ...currentPreferences,
        otherDescription: value,
      })

      // Если поле заполнено, снимаем ошибку
      if (value.trim() !== "") {
        clearErrors("accommodationPreferences.otherDescription")
      }
    },
    [getValues, setValue, clearErrors]
  )

  // Переход к следующему шагу с валидацией
  const nextStep = useCallback(async () => {
    const isValid = await validateCurrentStep()
    if (isValid) {
      dispatch({ type: "NEXT_STEP" })
    }
  }, [validateCurrentStep])

  // Переход к предыдущему шагу
  const prevStep = useCallback(() => {
    dispatch({ type: "PREV_STEP" })
  }, [])

  // Переход к произвольному шагу
  const goToStep = useCallback(
    async (step: number) => {
      // К предыдущим шагам можно переходить без валидации
      if (step < state.currentStep) {
        dispatch({ type: "SET_STEP", step })
      }
      // На текущий шаг переходить не нужно
      else if (step === state.currentStep) {
        return
      }
      // К следующим шагам только с валидацией
      else {
        const isValid = await validateCurrentStep()
        if (isValid) {
          dispatch({ type: "SET_STEP", step })
        }
      }
    },
    [state.currentStep, validateCurrentStep]
  )

  // Обработчик отправки формы
  const submitForm = useCallback(
    async (data: ApplicationSchemaType) => {
      try {
        // Форматируем даты для отправки
        const formattedDates = {
          from: data.dateRange?.from
            ? format(data.dateRange.from, "yyyy-MM-dd")
            : undefined,
          to: data.dateRange?.to
            ? format(data.dateRange.to, "yyyy-MM-dd")
            : undefined,
        }

        // Отправка данных на сервер
        const response = await fetch("/api/application", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: data.name,
            peopleCount: data.peopleCount,
            phone: data.phone,
            date_from: formattedDates.from,
            date_to: formattedDates.to,
            email: data.email,
            daysCount: data.daysCount,
            tripPurpose: data.tripPurpose,
            accommodation: data.accommodation,
            accommodationPreferences: data.accommodationPreferences,
            ageGroups: data.ageGroups,
          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(
            errorData.message || "Произошла ошибка при отправке формы"
          )
        }

        // При успешной отправке удаляем черновик
        ignoreDraft()
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
    [ignoreDraft]
  )

  // Обработчик для кнопки отправки/следующего шага
  const handleFormAction = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()

      if (state.currentStep === TOTAL_STEPS - 1) {
        // Если это последний шаг - отправляем форму
        dispatch({ type: "SUBMIT_START" })

        // Используем handleSubmit из react-hook-form для валидации и отправки
        handleSubmit(submitForm)(e)
      } else {
        // Иначе переходим к следующему шагу
        nextStep()
      }
    },
    [state.currentStep, handleSubmit, submitForm, nextStep]
  )

  // Сброс формы
  const resetForm = useCallback(() => {
    reset(defaultFormValues)
    ignoreDraft() // Удаляем черновик при сбросе формы
    dispatch({ type: "RESET_FORM" })
  }, [reset, ignoreDraft])

  // Возвращаем все необходимые данные и функции
  return {
    // Состояние формы
    formData,
    currentStep: state.currentStep,
    isSubmitting: state.isSubmitting,
    isSuccess: state.isSuccess,
    isError: state.isError,
    errorMessage: state.errorMessage,
    progress,
    errors,

    // React Hook Form
    control,
    register,
    setValue,
    getValues,

    // Функционал черновика
    hasDraft,
    showDraftNotice,
    restoreDraft,
    ignoreDraft,

    // Обработчики ввода
    handleDateChange,
    handlePurposeChange,
    handlePurposeTextChange,
    handleAccommodationChange,
    handleAccommodationTextChange,
    handlePreferenceChange,
    handlePreferenceTextChange,

    // Навигация
    nextStep,
    prevStep,
    goToStep,

    // Отправка формы
    handleFormAction,
    submitForm,

    // Управление черновиками
    resetForm,
  }
}
