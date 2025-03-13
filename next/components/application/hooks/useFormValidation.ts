import { useCallback } from "react"
import { ApplicationSchemaType } from "../schemas/applicationSchema"

/**
 * Хук для валидации формы
 */
export function useFormValidation(
  formData: ApplicationSchemaType,
  currentStep: number,
  datesSelected: boolean,
  errors: Record<string, string>,
  dispatch: Function
) {
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
            !formData.tripPurpose.otherDescription?.trim()
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
            !formData.accommodation.otherDescription?.trim()
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
  }, [currentStep, formData, errors, dispatch])

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
        !formData.tripPurpose.otherDescription?.trim()
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
        !formData.accommodation.otherDescription?.trim()
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

  return {
    validateStep,
    validateForm,
  }
}
