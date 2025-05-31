"use client"

import { useState, useEffect, useCallback } from "react"
import { useDebounce } from "@shared/hooks/useDebounce"
import { getTaxonomyTerms } from "../api/taxonomyApi"
import type { TaxonomyTerm } from "./types"

export function useTaxonomyTerms(
  vocabularyId: string,
  options?: {
    searchDebounce?: number
    limit?: number
    autoLoad?: boolean
  }
) {
  const [terms, setTerms] = useState<TaxonomyTerm[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState("")

  const debouncedSearch = useDebounce(search, options?.searchDebounce ?? 300)

  const fetchTerms = useCallback(async () => {
    if (!vocabularyId) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await getTaxonomyTerms(vocabularyId, {
        search: debouncedSearch || undefined,
        limit: options?.limit ?? 100,
      })

      setTerms(response.data || [])
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Не удалось загрузить данные"
      setError(errorMessage)
      console.error("Ошибка при загрузке терминов таксономии:", err)
    } finally {
      setIsLoading(false)
    }
  }, [vocabularyId, debouncedSearch, options?.limit])

  useEffect(() => {
    if (options?.autoLoad !== false) {
      fetchTerms()
    }
  }, [fetchTerms, options?.autoLoad])

  const refetch = useCallback(() => {
    fetchTerms()
  }, [fetchTerms])

  return {
    terms,
    isLoading,
    error,
    search,
    setSearch,
    refetch,
  }
}
