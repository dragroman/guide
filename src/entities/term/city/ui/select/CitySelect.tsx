import { TaxonomySelect } from "@entities/term/taxonomy"
import type { TaxonomyTerm } from "@entities/term/taxonomy"

interface CitySelectProps {
  value: string
  onChange: (cityId: string, internalId?: number, name?: string) => void
  placeholder?: string
  className?: string
  error?: string
  disabled?: boolean
}

export function CitySelect({
  value,
  onChange,
  placeholder = "Выберите город...",
  className,
  error,
  disabled = false,
}: CitySelectProps) {
  const handleChange = (
    termId: string,
    termName: string,
    term?: TaxonomyTerm
  ) => {
    onChange(termId, term?.drupal_internal__tid, termName)
  }

  return (
    <TaxonomySelect
      value={value}
      onChange={handleChange}
      vocabularyId="location"
      placeholder={placeholder}
      className={error ? `border-destructive ${className}` : className}
      disabled={disabled}
      showDescription={false}
    />
  )
}
