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

    // Важно: Обеспечиваем безопасное преобразование типов, гарантируя, что все необходимые поля существуют
    const formData = {
      ...parsedData,
      // Обеспечиваем, что dateRange и его поля существуют
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

      // Обеспечиваем, что все вложенные объекты содержат необходимые поля
      tripPurpose: {
        excursion: Boolean(parsedData.tripPurpose?.excursion),
        business: Boolean(parsedData.tripPurpose?.business),
        shopping: Boolean(parsedData.tripPurpose?.shopping),
        food: Boolean(parsedData.tripPurpose?.food),
        fun: Boolean(parsedData.tripPurpose?.fun),
        other: Boolean(parsedData.tripPurpose?.other),
        otherDescription: parsedData.tripPurpose?.otherDescription || "",
      },

      accommodation: {
        hotel3: Boolean(parsedData.accommodation?.hotel3),
        hotel4: Boolean(parsedData.accommodation?.hotel4),
        hotel5: Boolean(parsedData.accommodation?.hotel5),
        apartment: Boolean(parsedData.accommodation?.apartment),
        hostel: Boolean(parsedData.accommodation?.hostel),
        other: Boolean(parsedData.accommodation?.other),
        otherDescription: parsedData.accommodation?.otherDescription || "",
      },

      accommodationPreferences: {
        centralLocation: Boolean(
          parsedData.accommodationPreferences?.centralLocation
        ),
        nearShoppingCenters: Boolean(
          parsedData.accommodationPreferences?.nearShoppingCenters
        ),
        poolAndSpa: Boolean(parsedData.accommodationPreferences?.poolAndSpa),
        other: Boolean(parsedData.accommodationPreferences?.other),
        otherDescription:
          parsedData.accommodationPreferences?.otherDescription || "",
      },
    }

    return formData as ApplicationSchemaType
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
