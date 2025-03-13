import { useReducer, useCallback, useEffect } from "react"
import { DateRange } from "react-day-picker"
import { differenceInDays } from "date-fns"
import { FormState, ApplicationSchemaType } from "../types"
import { formReducer } from "../reducer"
import { defaultFormValues, TOTAL_STEPS } from "../constants"
import { saveFormDraft, loadFormDraft, clearFormDraft } from "@/lib/formStorage"
import { formatDateRangeForSubmission } from "../utils"

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
 * Хук для управления состоянием формы заявки на тур
 */
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
   * Очищает ошибки для указанного поля и всех его вложенных полей
   */
  const clearFieldErrors = useCallback(
    (fieldName: string) => {
      // Очищаем ошибку самого поля
      dispatch({ type: "CLEAR_ERROR", field: fieldName })

      // Очищаем связанные ошибки
      if (fieldName === "tripPurpose") {
        dispatch({ type: "CLEAR_ERROR", field: "tripPurpose.otherDescription" })
      } else if (fieldName === "accommodation") {
        dispatch({
          type: "CLEAR_ERROR",
          field: "accommodation.otherDescription",
        })
      } else if (fieldName === "dateRange") {
        dispatch({ type: "CLEAR_ERROR", field: "dateRange.from" })
        dispatch({ type: "CLEAR_ERROR", field: "dateRange.to" })
      }

      // Если меняем поле otherDescription, очищаем ошибку родительского поля
      if (fieldName.includes("otherDescription")) {
        const parentField = fieldName.split(".")[0]
        dispatch({ type: "CLEAR_ERROR", field: parentField })
      }
    },
    [dispatch]
  )

  /**
   * Обновление данных формы
   */
  const updateFormData = useCallback(
    (fieldName: string, value: any) => {
      dispatch({ type: "SET_FIELD", field: fieldName, value })

      // Очищаем ошибку для обновляемого поля и всех связанных полей
      clearFieldErrors(fieldName)

      // Сохраняем черновик при каждом изменении
      const updatedData = {
        ...formData,
        [fieldName]: value,
      } as ApplicationSchemaType
      saveFormDraft(updatedData)
    },
    [formData, clearFieldErrors, dispatch]
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
        // Рассчитываем количество дней, включая начальный и конечный дни
        daysCount = differenceInDays(dateRange.to, dateRange.from) + 1
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

  /**
   * Обработчик изменения целей поездки
   */
  const handlePurposeChange = useCallback(
    (name: string, checked: boolean) => {
      const updatedPurpose = {
        ...formData.tripPurpose,
        [name]: checked,
      }

      // Если снимаем галочку "Другое", очищаем описание
      if (name === "other" && !checked) {
        updatedPurpose.otherDescription = ""
        dispatch({ type: "CLEAR_ERROR", field: "tripPurpose.otherDescription" })
      }

      updateFormData("tripPurpose", updatedPurpose)
    },
    [formData.tripPurpose, updateFormData, dispatch]
  )

  /**
   * Обработчик изменения текстового описания целей поездки
   */
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

  /**
   * Обработчик изменения типа размещения
   */
  const handleAccommodationChange = useCallback(
    (name: string, checked: boolean) => {
      const updatedAccommodation = {
        ...formData.accommodation,
        [name]: checked,
      }

      // Если снимаем галочку "Другое", очищаем описание
      if (name === "other" && !checked) {
        updatedAccommodation.otherDescription = ""
        dispatch({
          type: "CLEAR_ERROR",
          field: "accommodation.otherDescription",
        })
      }

      updateFormData("accommodation", updatedAccommodation)
    },
    [formData.accommodation, updateFormData, dispatch]
  )

  /**
   * Обработчик изменения текстового описания типа размещения
   */
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

  /**
   * Обработчик изменения предпочтений к размещению
   */
  const handlePreferenceChange = useCallback(
    (name: string, checked: boolean) => {
      const updatedPreferences = {
        ...formData.accommodationPreferences,
        [name]: checked,
      }

      // Если снимаем галочку "Другое", очищаем описание
      if (name === "other" && !checked) {
        updatedPreferences.otherDescription = ""
        dispatch({
          type: "CLEAR_ERROR",
          field: "accommodationPreferences.otherDescription",
        })
      }

      updateFormData("accommodationPreferences", updatedPreferences)
    },
    [formData.accommodationPreferences, updateFormData, dispatch]
  )

  /**
   * Обработчик изменения текстового описания предпочтений к размещению
   */
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
   * Валидация данных для текущего шага формы
   */
  const validateStep = useCallback(() => {
    // Очищаем ошибки перед валидацией
    const currentErrors = { ...errors }
    dispatch({ type: "SET_ERRORS", errors: {} })

    try {
      switch (currentStep) {
        case 0: // Имя
          if (!formData.name.trim()) {
            dispatch({
              type: "SET_ERROR",
              field: "name",
              message: "Имя обязательно для заполнения",
            })
            return false
          }

          if (formData.name.trim().length < 2) {
            dispatch({
              type: "SET_ERROR",
              field: "name",
              message: "Имя должно содержать не менее 2 символов",
            })
            return false
          }

          return true

        case 1: // Телефон и email
          let isValid = true

          // Валидация телефона
          if (!formData.phone) {
            dispatch({
              type: "SET_ERROR",
              field: "phone",
              message: "Телефон обязателен для заполнения",
            })
            isValid = false
          } else if (!/^\+[1-9]\d{1,14}$/.test(formData.phone)) {
            dispatch({
              type: "SET_ERROR",
              field: "phone",
              message:
                "Телефон должен быть в международном формате, например +79123456789",
            })
            isValid = false
          }

          // Валидация email
          if (!formData.email) {
            dispatch({
              type: "SET_ERROR",
              field: "email",
              message: "Email обязателен для заполнения",
            })
            isValid = false
          } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            dispatch({
              type: "SET_ERROR",
              field: "email",
              message: "Введите корректный email адрес",
            })
            isValid = false
          }

          return isValid

        case 2: // Цель поездки и даты
          let stepValid = true

          // Проверка выбора хотя бы одной цели поездки
          const anyPurposeSelected = Object.entries(formData.tripPurpose)
            .filter(([key]) => key !== "otherDescription")
            .some(([_, value]) => value === true)

          if (!anyPurposeSelected) {
            dispatch({
              type: "SET_ERROR",
              field: "tripPurpose",
              message: "Выберите хотя бы одну цель поездки",
            })
            stepValid = false
          }

          // Если выбрано "Другое", проверяем наличие описания
          if (
            formData.tripPurpose.other &&
            !formData.tripPurpose.otherDescription.trim()
          ) {
            dispatch({
              type: "SET_ERROR",
              field: "tripPurpose.otherDescription",
              message: "Укажите описание для пункта 'Другое'",
            })
            stepValid = false
          }

          // Проверка выбора дат
          if (!formData.dateRange?.from || !formData.dateRange?.to) {
            dispatch({
              type: "SET_ERROR",
              field: "dateRange",
              message: "Укажите даты начала и окончания поездки",
            })
            stepValid = false
          } else {
            // Проверяем, что дата начала не в прошлом
            const today = new Date()
            today.setHours(0, 0, 0, 0)

            if (formData.dateRange.from < today) {
              dispatch({
                type: "SET_ERROR",
                field: "dateRange",
                message: "Дата начала поездки не может быть в прошлом",
              })
              stepValid = false
            }

            // Проверяем, что дата окончания не раньше даты начала
            if (formData.dateRange.to < formData.dateRange.from) {
              dispatch({
                type: "SET_ERROR",
                field: "dateRange",
                message:
                  "Дата окончания поездки не может быть раньше даты начала",
              })
              stepValid = false
            }
          }

          return stepValid

        case 3: // Размещение
          let accommodationValid = true

          // Проверка выбора хотя бы одного типа размещения
          const anyAccommodationSelected = Object.entries(
            formData.accommodation
          )
            .filter(([key]) => key !== "otherDescription")
            .some(([_, value]) => value === true)

          if (!anyAccommodationSelected) {
            dispatch({
              type: "SET_ERROR",
              field: "accommodation",
              message: "Выберите хотя бы один тип размещения",
            })
            accommodationValid = false
          }

          // Если выбрано "Другое", проверяем наличие описания
          if (
            formData.accommodation.other &&
            !formData.accommodation.otherDescription.trim()
          ) {
            dispatch({
              type: "SET_ERROR",
              field: "accommodation.otherDescription",
              message: "Укажите описание для пункта 'Другое'",
            })
            accommodationValid = false
          }

          return accommodationValid

        case 4: // Подтверждение - считаем валидным
          return true

        default:
          return false
      }
    } catch (error) {
      // Восстанавливаем предыдущие ошибки если что-то пошло не так
      dispatch({ type: "SET_ERRORS", errors: currentErrors })
      return false
    }
  }, [currentStep, formData, errors])

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
    [currentStep, validateStep]
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
    // Удаляем черновик из хранилища
    clearFormDraft()
  }, [])

  /**
   * Валидация всей формы перед отправкой
   */
  const validateForm = useCallback(() => {
    // Сбрасываем все ошибки
    dispatch({ type: "SET_ERRORS", errors: {} })

    try {
      // Проверяем каждый шаг по отдельности
      // Имя
      if (!formData.name.trim()) {
        dispatch({
          type: "SET_ERROR",
          field: "name",
          message: "Имя обязательно для заполнения",
        })
        return false
      }

      // Телефон и email
      if (!formData.phone) {
        dispatch({
          type: "SET_ERROR",
          field: "phone",
          message: "Телефон обязателен для заполнения",
        })
        return false
      } else if (!/^\+[1-9]\d{1,14}$/.test(formData.phone)) {
        dispatch({
          type: "SET_ERROR",
          field: "phone",
          message:
            "Телефон должен быть в международном формате, например +79123456789",
        })
        return false
      }

      if (!formData.email) {
        dispatch({
          type: "SET_ERROR",
          field: "email",
          message: "Email обязателен для заполнения",
        })
        return false
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        dispatch({
          type: "SET_ERROR",
          field: "email",
          message: "Введите корректный email адрес",
        })
        return false
      }

      // Цель поездки и даты
      const anyPurposeSelected = Object.entries(formData.tripPurpose)
        .filter(([key]) => key !== "otherDescription")
        .some(([_, value]) => value === true)

      if (!anyPurposeSelected) {
        dispatch({
          type: "SET_ERROR",
          field: "tripPurpose",
          message: "Выберите хотя бы одну цель поездки",
        })
        return false
      }

      if (
        formData.tripPurpose.other &&
        !formData.tripPurpose.otherDescription.trim()
      ) {
        dispatch({
          type: "SET_ERROR",
          field: "tripPurpose.otherDescription",
          message: "Укажите описание для пункта 'Другое'",
        })
        return false
      }

      if (!formData.dateRange?.from || !formData.dateRange?.to) {
        dispatch({
          type: "SET_ERROR",
          field: "dateRange",
          message: "Укажите даты начала и окончания поездки",
        })
        return false
      }

      // Размещение
      const anyAccommodationSelected = Object.entries(formData.accommodation)
        .filter(([key]) => key !== "otherDescription")
        .some(([_, value]) => value === true)

      if (!anyAccommodationSelected) {
        dispatch({
          type: "SET_ERROR",
          field: "accommodation",
          message: "Выберите хотя бы один тип размещения",
        })
        return false
      }

      if (
        formData.accommodation.other &&
        !formData.accommodation.otherDescription.trim()
      ) {
        dispatch({
          type: "SET_ERROR",
          field: "accommodation.otherDescription",
          message: "Укажите описание для пункта 'Другое'",
        })
        return false
      }

      return true
    } catch (error) {
      console.error("Ошибка при валидации формы:", error)
      return false
    }
  }, [formData, dispatch])

  /**
   * Отправка формы
   */
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()

      // Если мы на последнем шаге, валидируем всю форму перед отправкой
      if (currentStep === TOTAL_STEPS - 1) {
        if (!validateForm()) {
          return
        }
      } else {
        // Если мы не на последнем шаге, валидируем только текущий шаг
        if (!validateStep()) {
          return
        }

        // Переходим к следующему шагу
        dispatch({ type: "NEXT_STEP" })
        return
      }

      dispatch({ type: "SUBMIT_START" })

      try {
        // Форматируем даты для отправки
        if (!formData.dateRange?.from || !formData.dateRange?.to) {
          throw new Error("Пожалуйста, укажите даты начала и окончания поездки")
        }

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

        dispatch({
          type: "SUBMIT_ERROR",
          message:
            error instanceof Error
              ? error.message
              : "Произошла ошибка при отправке формы",
        })
      }
    },
    [formData, validateStep, validateForm, currentStep]
  )

  /**
   * Сброс формы для отправки новой заявки
   */
  const resetForm = useCallback(() => {
    dispatch({ type: "RESET_FORM" })
    clearFormDraft()
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
