import type { LocationData, LocationApiResponse } from "../model/types"

export async function getCityData(cityId: string): Promise<LocationData> {
  if (!cityId) {
    throw new Error("City ID is required")
  }

  const response = await fetch(`/api/taxonomy/location/${cityId}`)

  if (!response.ok) {
    throw new Error(`Ошибка при загрузке данных города: ${response.statusText}`)
  }

  const result: LocationApiResponse = await response.json()
  return result.data
}

export async function searchCities(
  query: string,
  options?: { limit?: number }
) {
  const queryParams = new URLSearchParams()
  queryParams.set("search", query)

  if (options?.limit) {
    queryParams.set("limit", options.limit.toString())
  }

  const response = await fetch(
    `/api/taxonomy/location?${queryParams.toString()}`
  )

  if (!response.ok) {
    throw new Error(`Ошибка при поиске городов: ${response.statusText}`)
  }

  return response.json()
}
