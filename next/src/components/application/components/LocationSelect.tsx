"use client"

import { useState, useEffect } from "react"
import TaxonomySelect from "@/components/drupal/TaxonomySelect"
import { Label } from "@/components/ui/label"
import { LocationDescription } from "./LocationDescription"

interface LocationSelectProps {
  label: string
  value: string
  placeholder?: string
  onChange: (value: string, internalId?: number) => void
  error?: string
  className?: string
}

// Расширенный интерфейс для данных о городе
export interface LocationData {
  id: string
  drupal_internal__tid: number
  name: string
  description?: string
  field_select_text?: string
  image?: {
    url: string
    alt?: string
  }
}

export function LocationSelect({
  label,
  value,
  placeholder = "Выберите город...",
  onChange,
  error,
  className,
}: LocationSelectProps) {
  // Состояние для хранения данных о выбранном городе
  const [locationData, setLocationData] = useState<LocationData | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Функция для получения подробных данных о городе
  const fetchLocationData = async (termId: string) => {
    if (!termId) return null

    setIsLoading(true)
    try {
      const response = await fetch(`/api/taxonomy/location/${termId}`)
      if (!response.ok) {
        throw new Error("Не удалось загрузить данные о городе")
      }

      const { data } = await response.json()
      const processedData = {
        id: data.id,
        drupal_internal__tid: data.drupal_internal__tid,
        name: data.name,
        description: data.description,
        field_select_text: data.field_select_text,
        image: data.field_image
          ? {
              url: data.field_image.url,
              alt: data.field_image.alt || data.name,
            }
          : undefined,
      }

      setLocationData(processedData)
      return processedData
    } catch (error) {
      console.error("Ошибка при загрузке данных о городе:", error)
      setLocationData(null)
      return null
    } finally {
      setIsLoading(false)
    }
  }

  // Обработчик выбора локации
  const handleTagChange = async (id: string, name: string, term?: any) => {
    let data: LocationData | null = null

    // Если у нас есть полные данные о термине из компонента выбора
    if (term && term.field_select_text) {
      data = {
        id,
        drupal_internal__tid: term.drupal_internal__tid,
        name,
        field_select_text: term.field_select_text,
        image: term.field_image
          ? {
              url: term.field_image.url,
              alt: term.field_image.alt || name,
            }
          : undefined,
      }
      setLocationData(data)
    } else {
      // Иначе загружаем данные отдельным запросом
      data = await fetchLocationData(id)
    }

    onChange(id, data?.drupal_internal__tid)
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

      {/* Показываем информацию о выбранном городе */}
      {value &&
        (isLoading ? (
          <div className="animate-pulse">
            <div className="h-24 bg-gray-200 rounded-md"></div>
          </div>
        ) : (
          locationData && (
            <LocationDescription value={value} locationData={locationData} />
          )
        ))}
    </div>
  )
}
