"use client"

import { useState, useEffect } from "react"
import TaxonomySelect from "@/components/drupal/TaxonomySelect"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { absoluteUrl } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { LocationDescription } from "./LocationDescription"

interface LocationSelectProps {
  label: string
  value: string // Значение из React Hook Form
  placeholder?: string
  onChange: (value: string, internalId?: number) => void
  error?: string // Ошибка валидации
  className?: string
}

// Расширенный интерфейс для данных о городе
interface LocationData {
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

  useEffect(() => {
    if (value && !locationData) {
      fetchLocationData(value)
    }
  }, [value, locationData])

  // Функция для получения подробных данных о городе
  const fetchLocationData = async (termId: string) => {
    if (!termId) return

    setIsLoading(true)
    try {
      const response = await fetch(`/api/taxonomy/location/${termId}`)
      if (!response.ok) {
        throw new Error("Не удалось загрузить данные о городе")
      }

      const { data } = await response.json()
      setLocationData({
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
      })
    } catch (error) {
      console.error("Ошибка при загрузке данных о городе:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Обработчик выбора локации
  const handleTagChange = (id: string, name: string, term?: any) => {
    // Если у нас есть полные данные о термине из компонента выбора
    if (term && term.field_select_text) {
      setLocationData({
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
      })
    } else {
      // Иначе загружаем данные отдельным запросом
      fetchLocationData(id)
    }

    onChange(id, term?.drupal_internal__tid)
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <Label htmlFor="city">{label}</Label>
      <TaxonomySelect
        value={value} // Используем значение напрямую из формы
        onChange={handleTagChange}
        vocabularyId="location"
        placeholder={placeholder}
        className={error ? "border-destructive" : ""}
        showDescription={false}
      />
      {error && <p className="text-sm font-medium text-destructive">{error}</p>}

      {/* Показываем информацию о выбранном городе */}
      {value && locationData && <LocationDescription value={value} />}
    </div>
  )
}
