"use client"

import { SearchableSelect } from "@shared/ui/searchable-select"
import { useTaxonomyTerms } from "../model/useTaxonomyTerms"
import type { TaxonomyTerm } from "../model/types"

interface TaxonomySelectProps {
  value: string
  onChange: (termId: string, termName: string, term?: TaxonomyTerm) => void
  vocabularyId: string
  placeholder?: string
  className?: string
  showDescription?: boolean
  disabled?: boolean
  searchDebounce?: number
}

export function TaxonomySelect({
  value,
  onChange,
  vocabularyId,
  placeholder = "Выберите...",
  className,
  showDescription = false,
  disabled = false,
  searchDebounce = 300,
}: TaxonomySelectProps) {
  const { terms, isLoading, error, search, setSearch } = useTaxonomyTerms(
    vocabularyId,
    { searchDebounce }
  )

  const handleChange = (termId: string, term: TaxonomyTerm) => {
    onChange(termId, term.name, term)
  }

  const renderItem = (term: TaxonomyTerm) => (
    <div className={showDescription ? "flex flex-col items-start" : ""}>
      <span>{term.name}</span>
      {showDescription && term.description && (
        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
          {term.description}
        </p>
      )}
    </div>
  )

  return (
    <SearchableSelect
      items={terms}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      renderItem={renderItem}
      getItemValue={(term) => term.id}
      getItemKey={(term) => term.id}
      isLoading={isLoading}
      error={error}
      onSearch={setSearch}
      searchValue={search}
      disabled={disabled}
      className={className}
    />
  )
}
