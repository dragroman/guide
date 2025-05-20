import { useState, useEffect, useCallback, useMemo } from "react"
import { useDebounce } from "./useDebounce"

export interface TaxonomyTerm {
  id: string
  name: string
  path?: string
  description?: string
  weight?: number
  changed?: string
}

interface UseTaxonomyTermsApiOptions {
  vocabularyId: string
  initialValue?: string | string[]
  searchQuery?: string
  limit?: number
  searchDebounce?: number
  enabled?: boolean
}

interface UseTaxonomyTermsApiResult {
  terms: TaxonomyTerm[]
  selectedTerm: TaxonomyTerm | null
  selectedTerms: TaxonomyTerm[]
  isLoading: boolean
  isLoadingSelected: boolean
  error: string | null
  searchTerms: (query: string) => void
  fetchTerms: () => Promise<void>
  fetchTermById: (id: string) => Promise<TaxonomyTerm | null>
}

/**
 * Хук для работы с терминами таксономии через API
 *
 * @param options Параметры для загрузки терминов
 * @returns Результаты запроса и функции для работы с терминами
 */
export function useTaxonomyTermsApi({
  vocabularyId,
  initialValue,
  searchQuery = "",
  limit = 50,
  searchDebounce = 300,
  enabled = true,
}: UseTaxonomyTermsApiOptions): UseTaxonomyTermsApiResult {
  const [search, setSearch] = useState<string>(searchQuery)
  const debouncedSearch = useDebounce(search, searchDebounce)

  const [terms, setTerms] = useState<TaxonomyTerm[]>([])
  const [selectedTerm, setSelectedTerm] = useState<TaxonomyTerm | null>(null)
  const [selectedTerms, setSelectedTerms] = useState<TaxonomyTerm[]>([])

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoadingSelected, setIsLoadingSelected] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  // Функция для загрузки терминов
  const fetchTerms = useCallback(async () => {
    if (!vocabularyId || !enabled) return

    setIsLoading(true)
    setError(null)

    try {
      // Формируем URL с учетом поискового запроса
      const queryParams = new URLSearchParams()

      if (debouncedSearch) {
        queryParams.set("search", debouncedSearch)
      }

      queryParams.set("limit", limit.toString())

      const url = `/api/taxonomy/${vocabularyId}?${queryParams.toString()}`
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`Ошибка при загрузке терминов: ${response.statusText}`)
      }

      const { data } = await response.json()
      setTerms(data || [])
    } catch (error) {
      console.error("Ошибка при загрузке терминов таксономии:", error)
      setError(
        error instanceof Error ? error.message : "Не удалось загрузить данные"
      )
    } finally {
      setIsLoading(false)
    }
  }, [vocabularyId, debouncedSearch, limit, enabled])

  // Функция для поиска терминов (обновляет значение search)
  const searchTerms = useCallback((query: string) => {
    setSearch(query)
  }, [])

  // Функция для загрузки термина по ID
  const fetchTermById = useCallback(
    async (id: string): Promise<TaxonomyTerm | null> => {
      if (!vocabularyId || !id) return null

      try {
        const response = await fetch(`/api/taxonomy/${vocabularyId}/${id}`)

        if (!response.ok) {
          throw new Error(`Ошибка при загрузке термина: ${response.statusText}`)
        }

        const { data } = await response.json()
        return data || null
      } catch (error) {
        console.error(`Ошибка при загрузке термина ${id}:`, error)
        return null
      }
    },
    [vocabularyId]
  )

  // Загрузка начального значения (для single select)
  const fetchInitialTerm = useCallback(async () => {
    if (!initialValue || typeof initialValue !== "string" || !vocabularyId)
      return

    setIsLoadingSelected(true)

    try {
      const term = await fetchTermById(initialValue)
      if (term) {
        setSelectedTerm(term)
      }
    } catch (error) {
      console.error(
        `Ошибка при загрузке выбранного термина ${initialValue}:`,
        error
      )
    } finally {
      setIsLoadingSelected(false)
    }
  }, [initialValue, vocabularyId, fetchTermById])

  // Загрузка начальных значений (для multi select)
  const fetchInitialTerms = useCallback(async () => {
    if (
      !initialValue ||
      !Array.isArray(initialValue) ||
      initialValue.length === 0 ||
      !vocabularyId
    )
      return

    setIsLoadingSelected(true)

    try {
      const promises = initialValue.map(fetchTermById)
      const terms = await Promise.all(promises)

      // Фильтруем и убираем null значения
      const validTerms = terms.filter(
        (term): term is TaxonomyTerm => term !== null
      )

      setSelectedTerms(validTerms)
    } catch (error) {
      console.error("Ошибка при загрузке выбранных терминов:", error)
    } finally {
      setIsLoadingSelected(false)
    }
  }, [initialValue, vocabularyId, fetchTermById])

  // Загружаем термины при изменении поискового запроса
  useEffect(() => {
    if (enabled) {
      fetchTerms()
    }
  }, [fetchTerms, enabled])

  // Загружаем начальное значение
  useEffect(() => {
    if (initialValue && enabled) {
      if (typeof initialValue === "string") {
        fetchInitialTerm()
      } else if (Array.isArray(initialValue)) {
        fetchInitialTerms()
      }
    }
  }, [fetchInitialTerm, fetchInitialTerms, initialValue, enabled])

  // Обновляем поисковый запрос при изменении searchQuery из параметров
  useEffect(() => {
    setSearch(searchQuery)
  }, [searchQuery])

  return useMemo(
    () => ({
      terms,
      selectedTerm,
      selectedTerms,
      isLoading,
      isLoadingSelected,
      error,
      searchTerms,
      fetchTerms,
      fetchTermById,
    }),
    [
      terms,
      selectedTerm,
      selectedTerms,
      isLoading,
      isLoadingSelected,
      error,
      searchTerms,
      fetchTerms,
      fetchTermById,
    ]
  )
}
