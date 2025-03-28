"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ChevronsUpDown, Check, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useDebounce } from "@/hooks/useDebounce" // Создайте этот хук или используйте npm-пакет use-debounce

export interface TaxonomyTerm {
  id: string
  name: string
  path?: string
  description?: string
  weight?: number
  changed?: string
}

interface TaxonomySelectApiProps {
  value: string
  onChange: (termId: string, termName: string, term?: TaxonomyTerm) => void
  vocabularyId: string // ID словаря таксономии, например "tags"
  placeholder?: string
  className?: string
  showDescription?: boolean
  disabled?: boolean
  searchDebounce?: number
}

export default function TaxonomySelectApi({
  value,
  onChange,
  vocabularyId,
  placeholder = "Выберите...",
  className,
  showDescription = false,
  disabled = false,
  searchDebounce = 300,
}: TaxonomySelectApiProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const debouncedSearch = useDebounce(search, searchDebounce)

  const [terms, setTerms] = useState<TaxonomyTerm[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const selectedTerm = terms.find((term) => term.id === value)
  const selectedName = selectedTerm ? selectedTerm.name : placeholder

  // Загрузка терминов таксономии через API маршрут
  const fetchTerms = useCallback(async () => {
    if (!vocabularyId) return

    setIsLoading(true)
    setError(null)

    try {
      // Формируем URL с учетом поискового запроса
      const queryParams = new URLSearchParams()

      if (debouncedSearch) {
        queryParams.set("search", debouncedSearch)
      }

      queryParams.set("limit", "50")

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
  }, [vocabularyId, debouncedSearch])

  // Загружаем термины при изменении поискового запроса или словаря
  useEffect(() => {
    fetchTerms()
  }, [fetchTerms])

  // Начальная загрузка при открытии списка
  useEffect(() => {
    if (open && terms.length === 0) {
      fetchTerms()
    }
  }, [open, terms.length, fetchTerms])

  // Обработчик выбора термина
  const handleSelect = (term: TaxonomyTerm) => {
    onChange(term.id, term.name, term)
    setOpen(false)
    setSearch("")
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between text-sm font-normal",
            !value && "text-muted-foreground",
            className
          )}
          onClick={() => setOpen((prev) => !prev)}
          disabled={disabled || isLoading}
        >
          {isLoading && !selectedTerm ? (
            <span className="flex items-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Загрузка...
            </span>
          ) : (
            selectedName
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="min-w-[var(--radix-popover-trigger-width)] p-0"
      >
        <Command>
          <CommandInput
            placeholder="Поиск термина..."
            value={search}
            onValueChange={setSearch}
            className="h-9"
          />
          <CommandList>
            {isLoading ? (
              <div className="py-6 text-center">
                <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                <p className="text-sm text-muted-foreground mt-2">
                  Загрузка терминов...
                </p>
              </div>
            ) : error ? (
              <div className="py-6 text-center">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            ) : terms.length === 0 ? (
              <CommandEmpty>Ничего не найдено.</CommandEmpty>
            ) : (
              <CommandGroup>
                {terms.map((term) => (
                  <CommandItem
                    key={term.id}
                    value={term.name}
                    onSelect={() => handleSelect(term)}
                    className={
                      showDescription ? "flex flex-col items-start py-2" : ""
                    }
                  >
                    <div className="flex items-center w-full">
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4 flex-shrink-0",
                          value === term.id ? "opacity-100" : "opacity-0"
                        )}
                      />
                      <span>{term.name}</span>
                    </div>
                    {showDescription && term.description && (
                      <p className="text-xs text-muted-foreground mt-1 ml-6 line-clamp-2">
                        {term.description}
                      </p>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
