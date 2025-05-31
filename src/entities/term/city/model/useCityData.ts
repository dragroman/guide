"use client"

import { useState, useEffect } from "react"
import { getCityData } from "../api/cityApi"
import type { LocationData } from "./types"

export function useCityData(cityId: string | null) {
  const [cityData, setCityData] = useState<LocationData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!cityId) {
      setCityData(null)
      setIsLoading(false)
      setError(null)
      return
    }

    setIsLoading(true)
    setError(null)

    getCityData(cityId)
      .then((data) => {
        setCityData(data)
      })
      .catch((err) => {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Не удалось загрузить данные города"
        setError(errorMessage)
        console.error("Ошибка при загрузке данных города:", err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [cityId])

  return {
    cityData,
    isLoading,
    error,
  }
}
