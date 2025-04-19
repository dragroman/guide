// src/components/application/components/LocationSelect.tsx (обновленная версия)

import React, { useState } from "react"
import TaxonomySelect from "@/components/drupal/TaxonomySelect"
import { Label } from "@/components/ui/label"
import { LocationDescription } from "./LocationDescription"
import { useLocationData } from "../hooks/useLocationData"
import { Button } from "@/components/ui/button"
import { PlusCircle, X } from "lucide-react"

interface City {
  id: string
  internalId?: number
  name?: string
}

interface LocationSelectProps {
  label: string
  value: string | string[]
  placeholder?: string
  onChange: (value: string, internalId?: number, cities?: City[]) => void
  error?: string
  className?: string
  multiSelect?: boolean
}

export function LocationSelect({
  label,
  value,
  placeholder = "Выберите город...",
  onChange,
  error,
  className,
}: LocationSelectProps) {
  // Преобразуем value в массив в случае, если это строка
  const initialValue = Array.isArray(value) ? value : value ? [value] : []

  // Состояние для хранения списка городов
  const [cities, setCities] = useState<City[]>(
    initialValue.map((id) => ({ id }))
  )

  // Если нет городов, добавляем пустой элемент
  if (cities.length === 0) {
    setCities([{ id: "" }])
  }

  // Используем хук для загрузки данных первого города
  const { locationData } = useLocationData(cities[0]?.id || "")

  // Обработчик выбора локации
  const handleCityChange = (
    index: number,
    id: string,
    name: string,
    term?: any
  ) => {
    const newCities = [...cities]
    newCities[index] = {
      id,
      internalId: term?.drupal_internal__tid,
      name,
    }
    setCities(newCities)

    // Возвращаем первый город для обратной совместимости
    // и полный список городов для нового функционала
    onChange(newCities[0]?.id || "", newCities[0]?.internalId, newCities)
  }

  // Добавление нового города
  const handleAddCity = () => {
    setCities([...cities, { id: "" }])
  }

  // Удаление города
  const handleRemoveCity = (index: number) => {
    const newCities = [...cities]
    newCities.splice(index, 1)

    // Если удалили все города, добавляем пустой
    if (newCities.length === 0) {
      newCities.push({ id: "" })
    }

    setCities(newCities)
    onChange(newCities[0]?.id || "", newCities[0]?.internalId, newCities)
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <Label htmlFor="city">{label}</Label>
        {cities.length > 0 && cities.some((city) => city.id) && (
          <Button
            type="button"
            variant="link"
            size="sm"
            onClick={handleAddCity}
          >
            <PlusCircle className="h-4 w-4" />
            Добавить город
          </Button>
        )}
      </div>

      {cities.map((city, index) => (
        <div key={index} className="relative mb-4">
          <div className="flex gap-2 items-center">
            <div className="flex-grow">
              <TaxonomySelect
                value={city.id}
                onChange={(id, name, term) =>
                  handleCityChange(index, id, name, term)
                }
                vocabularyId="location"
                placeholder={placeholder}
                className={error ? "border-destructive" : ""}
                showDescription={false}
              />
            </div>
            {cities.length > 1 && (
              <Button
                variant="ghost"
                size="icon"
                type="button"
                onClick={() => handleRemoveCity(index)}
                className="flex-shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Отображаем описание города, если город выбран */}
        </div>
      ))}
      {cities.length > 1 ? (
        <div className="grid grid-cols-2 gap-2">
          {cities.map((city, index) => (
            <LocationDescription
              value={city.id}
              key={index}
              length={cities.length}
            />
          ))}
        </div>
      ) : (
        cities.map((city, index) => (
          <LocationDescription value={city.id} key={index} />
        ))
      )}
      {error && <p className="text-sm font-medium text-destructive">{error}</p>}
    </div>
  )
}
