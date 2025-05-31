import type { TaxonomyApiResponse } from "../model/types"

export async function getTaxonomyTerms(
  vocabularyId: string,
  options?: {
    search?: string
    limit?: number
    page?: number
  }
): Promise<TaxonomyApiResponse> {
  const queryParams = new URLSearchParams()

  if (options?.search) {
    queryParams.set("search", options.search)
  }

  if (options?.limit) {
    queryParams.set("limit", options.limit.toString())
  }

  if (options?.page) {
    queryParams.set("page", options.page.toString())
  }

  const url = `/api/taxonomy/${vocabularyId}?${queryParams.toString()}`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Ошибка при загрузке терминов: ${response.statusText}`)
  }

  return response.json()
}
