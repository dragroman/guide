import { TaxonomySelect } from "@entities/term/taxonomy"
import type { TaxonomyTerm } from "@entities/term/taxonomy"

interface CategorySelectProps {
  value: string
  onChange: (categoryId: string, internalId?: number, name?: string) => void
  placeholder?: string
  className?: string
  error?: string
  disabled?: boolean
}

export function CategorySelect({
  value,
  onChange,
  placeholder = "Выберите категорию...",
  className,
  error,
  disabled = false,
}: CategorySelectProps) {
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
      vocabularyId="category"
      placeholder={placeholder}
      className={error ? `border-destructive ${className}` : className}
      disabled={disabled}
      showDescription={false}
    />
  )
}
