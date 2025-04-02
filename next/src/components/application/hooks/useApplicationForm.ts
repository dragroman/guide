import { useReducer, useCallback, useEffect } from "react"
import { Resolver, SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { DateRange } from "react-day-picker"
import { differenceInDays } from "date-fns"
import {
  applicationSchema,
  ApplicationSchemaType,
  defaultFormValues,
} from "../schemas/applicationSchema"
import { TOTAL_STEPS } from "../constants"
import { useDraftForm } from "./useDraftForm"
import {
  validateBaseInfo,
  validateTripInfo,
  validateAccommodation,
  validateTransport,
  validateFood,
  validateContact,
  validateShopping,
  validateBudget,
} from "../utils/validationUtils"
import { scrollToFormTop, scrollToFirstError } from "../utils/scrollUtils"

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

// Основной хук для управления формой
export function useApplicationForm() {
  // React Hook Form для управления полями и валидации
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting: isFormSubmitting },
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
    mode: "onChange",
  })

  const [state, dispatch] = useReducer(formReducer, initialState)

  // Наблюдаем за всеми полями формы
  const formData = watch()

  // Интеграция функциональности черновика
  const { hasDraft, showDraftNotice, saveDraft, restoreDraft, ignoreDraft } =
    useDraftForm(formData, setValue)

  // Вычисляем прогресс заполнения формы
  const progress = Math.floor(((state.currentStep + 1) / TOTAL_STEPS) * 100)

  // Эффект для прокрутки наверх при смене шага
  useEffect(() => {
    scrollToFormTop()
  }, [state.currentStep])

  // Эффект для прокрутки к ошибке при их появлении
  useEffect(() => {
    // Если есть ошибки и мы не в процессе отправки формы
    if (Object.keys(errors).length > 0 && !isFormSubmitting) {
      scrollToFirstError(errors)
    }
  }, [errors, isFormSubmitting])

  // Основная функция валидации текущего шага - использует функции из validationUtils
  const validateCurrentStep = useCallback(async () => {
    let isValid = false

    switch (state.currentStep) {
      case 0:
        isValid = await validateBaseInfo(trigger)
        break
      case 1:
        isValid = await validateTripInfo(trigger, getValues, setError)
        break
      case 2:
        isValid = await validateAccommodation(trigger, getValues, setError)
        break
      case 3:
        isValid = await validateTransport(trigger, getValues, setError)
        break
      case 4:
        isValid = await validateFood(trigger, getValues, setError)
        break
      case 5:
        isValid = await validateShopping(trigger, getValues, setError)
        break
      case 6:
        isValid = await validateBudget(trigger)
        break
      case 7:
        isValid = await validateContact(
          trigger,
          getValues,
          setError,
          clearErrors
        )
        break
      case 8:
        isValid = await trigger()
        break
      default:
        isValid = true
        break
    }

    // Если валидация не прошла, прокручиваем к первой ошибке
    if (!isValid) {
      scrollToFirstError(errors)
    }

    return isValid
  }, [state.currentStep, trigger, getValues, setError, clearErrors, errors])

  // Принимает путь к данным в форме, имя опции и новое состояние
  const handleOptionChange = useCallback(
    (path: string, name: string, checked: boolean) => {
      try {
        // Получаем текущие значения по пути
        const currentValues = getValues(path as any) || {}

        // Создаем обновленный объект с новым значением
        const updatedValues = {
          ...currentValues,
          [name]: checked,
        }

        // Если снимаем галочку "Другое", очищаем описание
        if (name === "other" && !checked) {
          updatedValues.otherDescription = ""
        }

        // Обновляем значение в форме
        setValue(path as any, updatedValues)

        // Проверяем, есть ли хотя бы один выбранный вариант
        const hasSelection = Object.entries(updatedValues)
          .filter(([key]) => key !== "otherDescription" && key !== "_error")
          .some(([_, value]) => value === true)

        // Если выбран хотя бы один вариант, снимаем ошибку
        if (hasSelection) {
          clearErrors(`${path}._error` as any)
          clearErrors(path as any)
        }
      } catch (error) {
        console.error(`Ошибка в handleOptionChange для пути ${path}:`, error)
      }
    },
    [getValues, setValue, clearErrors]
  )

  // Универсальный обработчик для изменения текстовых описаний
  const handleTextChange = useCallback(
    (path: string, value: string) => {
      try {
        setValue(`${path}.otherDescription` as any, value)

        // Если поле заполнено, снимаем ошибку
        if (value.trim() !== "") {
          clearErrors(`${path}.otherDescription` as any)
        }
      } catch (error) {
        console.error(`Ошибка в handleTextChange для пути ${path}:`, error)
      }
    },
    [setValue, clearErrors]
  )

  // Обработчик для диапазона дат
  const handleDateChange = useCallback(
    (dateRange: DateRange | undefined) => {
      setValue("trip.dateRange", dateRange as any)

      // Очищаем ошибки после выбора дат
      if (dateRange?.from && dateRange?.to) {
        clearErrors("trip.dateRange")
      }

      if (dateRange?.from && dateRange?.to) {
        // Рассчитываем количество дней, включая начальный и конечный дни
        const daysCount = differenceInDays(dateRange.to, dateRange.from) + 1
        setValue("trip.daysCount", daysCount)
      } else {
        setValue("trip.daysCount", null)
      }
    },
    [setValue, clearErrors]
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

  const skipStep = useCallback(() => {
    const nextStep = state.currentStep + 1
    dispatch({ type: "SET_STEP", step: nextStep })
  }, [state.currentStep, dispatch])

  // Обработчик отправки формы
  const submitForm: SubmitHandler<ApplicationSchemaType> = useCallback(
    async (data) => {
      try {
        // Отправка данных на сервер
        const response = await fetch("/api/application", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
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

        // Прокручиваем к сообщению об ошибке
        setTimeout(() => {
          const errorAlert = document.querySelector(
            '.bg-destructive, .text-destructive, [variant="destructive"]'
          )
          if (errorAlert) {
            const offsetTop =
              errorAlert.getBoundingClientRect().top + window.scrollY - 150
            window.scrollTo({
              top: offsetTop,
              behavior: "smooth",
            })
          }
        }, 100)
      }
    },
    [ignoreDraft]
  )

  // Обработчик для кнопки отправки/следующего шага
  const handleFormAction = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()

      if (state.currentStep === TOTAL_STEPS - 1) {
        dispatch({ type: "SUBMIT_START" })
        handleSubmit(submitForm)(e)
      } else {
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

    // Универсальные обработчики
    handleOptionChange,
    handleTextChange,

    // Обработчики ввода
    handleDateChange,

    // Навигация
    nextStep,
    prevStep,
    goToStep,
    skipStep,

    // Отправка формы
    handleFormAction,
    submitForm,

    // Управление черновиками
    resetForm,
  }
}
