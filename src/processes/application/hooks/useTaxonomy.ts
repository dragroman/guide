import { LocationData } from "../model/types"

export async function fetchLocationData(
  termId: string
): Promise<LocationData | null> {
  if (!termId) return null

  try {
    const response = await fetch(`/api/taxonomy/location/${termId}`)
    if (!response.ok) {
      throw new Error("Не удалось загрузить данные о городе")
    }

    const { data } = await response.json()
    return {
      id: data.id,
      name: data.name,
      field_title_cn: data.field_title_cn,
      machine_name: data.machine_name,
      description: data.description,
      field_select_text: data.field_select_text,
      image: data.field_image
        ? {
            url: data.field_image.url,
            alt: data.field_image.alt || data.name,
          }
        : undefined,
    }
  } catch (error) {
    console.error("Ошибка при загрузке данных о городе:", error)
    return null
  }
}
