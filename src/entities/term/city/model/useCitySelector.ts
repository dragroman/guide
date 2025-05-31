"use client"

import { useState, useEffect, useRef } from "react"
import type { City } from "../model/types"

interface UseLocationSelectorProps {
  value: string | string[]
  onChange: (value: string, internalId?: number, cities?: City[]) => void
}

export function useLocationSelector({
  value,
  onChange,
}: UseLocationSelectorProps) {
  // Преобразуем value в массив в случае, если это строка
  const initialValue = Array.isArray(value) ? value : value ? [value] : []

  // Состояние для хранения списка городов
  const [cities, setCities] = useState<City[]>(
    initialValue.length > 0
      ? initialValue.map((id) => ({ id, name: "" }))
      : [{ id: "", name: "" }]
  )

  // Если нет городов, добавляем пустой элемент
  if (cities.length === 0) {
    setCities([{ id: "", name: "" }])
  }

  const prevValueRef = useRef<string | string[]>(value)

  useEffect(() => {
    // Сравниваем текущее значение с предыдущим
    const prevValue = prevValueRef.current
    const valueChanged = JSON.stringify(prevValue) !== JSON.stringify(value)

    // Обновляем ref на новое значение
    prevValueRef.current = value

    // Обновляем состояние только если значение изменилось
    if (valueChanged) {
      const currentValue = Array.isArray(value)
        ? value
        : value && typeof value === "string"
          ? [value]
          : []

      // Важно! Сохраняем существующие internalId при обновлении
      const newCities =
        currentValue.length > 0
          ? currentValue.map((id) => {
              // Ищем существующий город с таким id
              const existingCity = cities.find((city) => city.id === id)
              // Возвращаем город с сохраненным internalId, если он есть
              return existingCity ? existingCity : { id, name: "" }
            })
          : [{ id: "", name: "" }]

      setCities(newCities)
    }
  }, [value, cities])

  // Обработчик выбора локации
  const handleCityChange = (
    index: number,
    id: string,
    internalId?: number,
    name?: string
  ) => {
    const newCities = [...cities]
    newCities[index] = {
      id,
      internalId,
      name: name || "",
    }
    setCities(newCities)

    // Возвращаем первый город для обратной совместимости
    // и полный список городов для нового функционала
    onChange(newCities[0].id || "", newCities[0].internalId, newCities)
  }

  // Добавление нового города
  const handleAddCity = () => {
    setCities([...cities, { id: "", name: "" }])
  }

  // Удаление города
  const handleRemoveCity = (index: number) => {
    const newCities = [...cities]
    newCities.splice(index, 1)

    setCities(newCities)
    onChange(newCities[0]?.id || "", newCities[0]?.internalId, newCities)
  }

  return {
    cities,
    handleCityChange,
    handleAddCity,
    handleRemoveCity,
  }
}
