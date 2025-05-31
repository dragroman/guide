"use client"

import { useState } from "react"
import { Button } from "@shared/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@shared/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@shared/ui/popover"
import { ChevronsUpDown, Check, Loader2 } from "lucide-react"
import { cn } from "@shared/lib/utils"

interface SearchableSelectProps<T> {
  items: T[]
  value: string
  onChange: (value: string, item: T) => void
  placeholder?: string
  renderItem: (item: T) => React.ReactNode
  getItemValue: (item: T) => string
  getItemKey: (item: T) => string | number
  isLoading?: boolean
  error?: string | null
  onSearch?: (search: string) => void
  searchValue?: string
  disabled?: boolean
  className?: string
  emptyMessage?: string
}

export function SearchableSelect<T>({
  items,
  value,
  onChange,
  placeholder = "Выберите...",
  renderItem,
  getItemValue,
  getItemKey,
  isLoading = false,
  error = null,
  onSearch,
  searchValue = "",
  disabled = false,
  className,
  emptyMessage = "Ничего не найдено.",
}: SearchableSelectProps<T>) {
  const [open, setOpen] = useState(false)
  const [internalSearch, setInternalSearch] = useState("")

  const selectedItem = items.find((item) => getItemValue(item) === value)
  const displayValue = selectedItem ? renderItem(selectedItem) : placeholder

  const currentSearch = searchValue !== undefined ? searchValue : internalSearch

  const handleSearch = (search: string) => {
    setInternalSearch(search)
    onSearch?.(search)
  }

  const handleSelect = (item: T) => {
    onChange(getItemValue(item), item)
    setOpen(false)
    setInternalSearch("")
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between text-sm font-normal h-12",
            !value && "text-muted-foreground",
            className
          )}
          disabled={disabled || isLoading}
        >
          {isLoading && !selectedItem ? (
            <span className="flex items-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Загрузка...
            </span>
          ) : (
            displayValue
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="min-w-[var(--radix-popover-trigger-width)] p-0"
      >
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={placeholder}
            value={currentSearch}
            onValueChange={handleSearch}
            className="h-9"
          />
          <CommandList>
            {isLoading ? (
              <div className="py-6 text-center">
                <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                <p className="text-sm text-muted-foreground mt-2">
                  Загрузка...
                </p>
              </div>
            ) : error ? (
              <div className="py-6 text-center">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            ) : items.length === 0 ? (
              <CommandEmpty>{emptyMessage}</CommandEmpty>
            ) : (
              <CommandGroup>
                {items.map((item) => (
                  <CommandItem
                    key={getItemKey(item)}
                    onSelect={() => handleSelect(item)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === getItemValue(item)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {renderItem(item)}
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
