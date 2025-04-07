// src/components/application/hooks/useLocationData.ts

import { useState, useEffect } from "react"
import { LocationData } from "../types"

export function useLocationData(locationId: string | null | undefined) {
  const [locationData, setLocationData] = useState<LocationData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Сбрасываем данные, если нет ID
    if (!locationId) {
      setLocationData(null)
      return
    }

    // Загрузка данных о локации
    setIsLoading(true)
    setError(null)

    fetch(`/api/taxonomy/location/${locationId}`)
      .then((response) => {
        if (!response.ok)
          throw new Error("Не удалось загрузить данные о локации")
        return response.json()
      })
      .then(({ data }) => {
        const formattedData: LocationData = {
          id: data.id,
          name: data.name,
          description: data.description,
          field_title_cn: data.field_title_cn,
          field_select_text: data.field_select_text,
          drupal_internal__tid: data.drupal_internal__tid,
          image: data.field_image
            ? {
                url: data.field_image.url,
                alt: data.field_image.alt || data.name,
              }
            : undefined,
        }

        setLocationData(formattedData)
      })
      .catch((err) => {
        console.error("Ошибка при загрузке данных о локации:", err)
        setError(err.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [locationId])

  return { locationData, isLoading, error }
}
