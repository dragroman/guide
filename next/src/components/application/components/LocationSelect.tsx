// src/components/application/components/LocationSelect.tsx

import TaxonomySelect from "@/components/drupal/TaxonomySelect"
import { Label } from "@/components/ui/label"
import { LocationDescription } from "./LocationDescription"
import { useLocationData } from "../hooks/useLocationData"

interface LocationSelectProps {
  label: string
  value: string
  placeholder?: string
  onChange: (value: string, internalId?: number) => void
  error?: string
  className?: string
}

export function LocationSelect({
  label,
  value,
  placeholder = "Выберите город...",
  onChange,
  error,
  className,
}: LocationSelectProps) {
  // Используем хук для загрузки данных
  const { locationData } = useLocationData(value)

  // Обработчик выбора локации
  const handleTagChange = (id: string, name: string, term?: any) => {
    onChange(id, term?.drupal_internal__tid)
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <Label htmlFor="city">{label}</Label>
      <TaxonomySelect
        value={value}
        onChange={handleTagChange}
        vocabularyId="location"
        placeholder={placeholder}
        className={error ? "border-destructive" : ""}
        showDescription={false}
      />
      {error && <p className="text-sm font-medium text-destructive">{error}</p>}

      {/* Отображаем компонент с данными */}
      {value && (
        <LocationDescription
          value={value}
          locationData={locationData || undefined}
        />
      )}
    </div>
  )
}
