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
import { Badge } from "@/components/ui/badge"
import { ChevronsUpDown, Check, X, Loader2, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { useDebounce } from "@/hooks/useDebounce"

export interface TaxonomyTerm {
  id: string
  name: string
  path?: string
  description?: string
  weight?: number
  changed?: string
}

interface SelectedTerm {
  id: string
  name: string
}

interface TaxonomyMultiSelectProps {
  value: string[] // массив идентификаторов выбранных терминов
  onChange: (value: string[]) => void
  onTermsChange?: (terms: SelectedTerm[]) => void
  vocabularyId: string // ID словаря таксономии, например "tags"
  placeholder?: string
  className?: string
  badgeVariant?: "default" | "secondary" | "outline"
  disabled?: boolean
  maxItems?: number // Максимальное количество выбранных элементов
}

export default function TaxonomyMultiSelect({
  value = [],
  onChange,
  onTermsChange,
  vocabularyId,
  placeholder = "Выберите...",
  className,
  badgeVariant = "secondary",
  disabled = false,
  maxItems,
}: TaxonomyMultiSelectProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const debouncedSearch = useDebounce(search, 300)

  const [availableTerms, setAvailableTerms] = useState<TaxonomyTerm[]>([])
  const [selectedTerms, setSelectedTerms] = useState<SelectedTerm[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

      queryParams.set("limit", "100")

      const url = `/api/taxonomy/${vocabularyId}?${queryParams.toString()}`
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`Ошибка при загрузке терминов: ${response.statusText}`)
      }

      const { data } = await response.json()

      // Фильтруем уже выбранные термины
      const filtered = (data || []).filter(
        (term: TaxonomyTerm) => !value.includes(term.id)
      )

      setAvailableTerms(filtered)
    } catch (error) {
      console.error("Ошибка при загрузке терминов таксономии:", error)
      setError(
        error instanceof Error ? error.message : "Не удалось загрузить данные"
      )
    } finally {
      setIsLoading(false)
    }
  }, [vocabularyId, debouncedSearch, value])

  // Загружаем список выбранных терминов при инициализации
  const fetchSelectedTerms = useCallback(async () => {
    if (!value.length || !vocabularyId) return

    setIsLoading(true)

    try {
      // Загружаем данные для уже выбранных терминов
      const promises = value.map(async (id) => {
        // Если термин уже в списке selectedTerms, используем его
        const existingTerm = selectedTerms.find((term) => term.id === id)
        if (existingTerm) return existingTerm

        // Иначе загружаем информацию о термине
        try {
          const response = await fetch(`/api/taxonomy/${vocabularyId}/${id}`)
          if (!response.ok) throw new Error(`Ошибка загрузки термина: ${id}`)

          const { data } = await response.json()
          return { id, name: data.name }
        } catch (e) {
          console.error(`Ошибка при загрузке термина ${id}:`, e)
          return { id, name: `Термин #${id.substring(0, 8)}` }
        }
      })

      const terms = await Promise.all(promises)
      setSelectedTerms(terms)

      // Если предоставлен onTermsChange, вызываем его
      if (onTermsChange) {
        onTermsChange(terms)
      }
    } catch (error) {
      console.error("Ошибка при загрузке выбранных терминов:", error)
    } finally {
      setIsLoading(false)
    }
  }, [value, vocabularyId, selectedTerms, onTermsChange])

  // Загружаем термины при изменении поискового запроса
  useEffect(() => {
    if (open) {
      fetchTerms()
    }
  }, [open, fetchTerms])

  // Загружаем выбранные термины при изменении value
  useEffect(() => {
    fetchSelectedTerms()
  }, [fetchSelectedTerms])

  // Обработчик выбора термина
  const handleSelect = (term: TaxonomyTerm) => {
    // Проверяем лимит выбранных элементов
    if (maxItems && value.length >= maxItems) {
      return
    }

    const newValue = [...value, term.id]
    onChange(newValue)

    const newSelectedTerms = [
      ...selectedTerms,
      { id: term.id, name: term.name },
    ]
    setSelectedTerms(newSelectedTerms)

    if (onTermsChange) {
      onTermsChange(newSelectedTerms)
    }

    setSearch("")
    // Оставляем выпадающий список открытым для возможности выбора нескольких элементов
  }

  // Удаление выбранного термина
  const handleRemove = (id: string) => {
    const newValue = value.filter((v) => v !== id)
    onChange(newValue)

    const newSelectedTerms = selectedTerms.filter((term) => term.id !== id)
    setSelectedTerms(newSelectedTerms)

    if (onTermsChange) {
      onTermsChange(newSelectedTerms)
    }
  }

  // Очистка всех выбранных терминов
  const handleClear = () => {
    onChange([])
    setSelectedTerms([])

    if (onTermsChange) {
      onTermsChange([])
    }
  }

  const isMaxItemsReached = maxItems ? value.length >= maxItems : false

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full justify-between text-sm font-normal",
              !value.length && "text-muted-foreground",
              isMaxItemsReached && "opacity-70",
              className
            )}
            onClick={() => setOpen((prev) => !prev)}
            disabled={disabled || isLoading || isMaxItemsReached}
          >
            <span className="flex items-center gap-2">
              {value.length > 0 ? (
                <span>
                  {value.length}{" "}
                  {value.length === 1 ? "элемент выбран" : "элемента выбрано"}
                </span>
              ) : (
                <span>{placeholder}</span>
              )}
            </span>
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
              disabled={isMaxItemsReached}
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
              ) : isMaxItemsReached ? (
                <div className="py-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    Достигнуто максимальное количество элементов ({maxItems})
                  </p>
                </div>
              ) : availableTerms.length === 0 ? (
                <CommandEmpty>Ничего не найдено.</CommandEmpty>
              ) : (
                <CommandGroup>
                  {availableTerms.map((term) => (
                    <CommandItem
                      key={term.id}
                      value={term.name}
                      onSelect={() => handleSelect(term)}
                    >
                      <div className="flex items-center gap-2 w-full">
                        <Plus className="h-4 w-4" />
                        <span>{term.name}</span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Отображение выбранных терминов */}
      {selectedTerms.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedTerms.map((term) => (
            <Badge
              key={term.id}
              variant={badgeVariant}
              className="pl-2 pr-1 py-1 text-sm flex items-center"
            >
              <span>{term.name}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5 ml-1 p-0 hover:bg-transparent hover:text-destructive"
                onClick={() => handleRemove(term.id)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}

          {selectedTerms.length > 1 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-xs text-muted-foreground"
              onClick={handleClear}
            >
              Очистить все
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
