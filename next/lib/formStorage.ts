import { ApplicationSchemaType } from "../components/application/schemas/applicationSchema"

const STORAGE_KEY = "application_form_draft"

// Сохранение данных формы в localStorage
export const saveFormDraft = (data: ApplicationSchemaType): void => {
  try {
    // Преобразуем объект с датами в формат, который можно сериализовать
    const serializedData = {
      ...data,
      dateRange: data.dateRange
        ? {
            from: data.dateRange.from?.toISOString(),
            to: data.dateRange.to?.toISOString(),
          }
        : undefined,
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(serializedData))
  } catch (error) {
    console.error("Ошибка при сохранении черновика формы:", error)
  }
}

// Загрузка данных формы из localStorage
export const loadFormDraft = (): ApplicationSchemaType | null => {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY)

    if (!savedData) return null

    const parsedData = JSON.parse(savedData)

    // Преобразуем строки ISO дат обратно в объекты Date
    return {
      ...parsedData,
      dateRange: parsedData.dateRange
        ? {
            from: parsedData.dateRange.from
              ? new Date(parsedData.dateRange.from)
              : undefined,
            to: parsedData.dateRange.to
              ? new Date(parsedData.dateRange.to)
              : undefined,
          }
        : undefined,
    }
  } catch (error) {
    console.error("Ошибка при загрузке черновика формы:", error)
    return null
  }
}

// Очистка сохраненного черновика
export const clearFormDraft = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error("Ошибка при удалении черновика формы:", error)
  }
}
