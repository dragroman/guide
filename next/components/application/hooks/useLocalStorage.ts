import { useState, useEffect } from "react"

// Хук для работы с данными в localStorage
export function useLocalStorage<T>(key: string, initialValue: T) {
  // Создаем состояние для хранения значения
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue
    }

    try {
      // Проверяем наличие значения в localStorage
      const item = window.localStorage.getItem(key)
      // Если значение найдено, возвращаем его, иначе возвращаем initialValue
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Ошибка получения из localStorage (${key}):`, error)
      return initialValue
    }
  })

  // Функция для обновления значения в localStorage и в состоянии
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Поддерживаем функцию в качестве аргумента
      const valueToStore =
        value instanceof Function ? value(storedValue) : value

      // Сохраняем в состоянии
      setStoredValue(valueToStore)

      // Сохраняем в localStorage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error(`Ошибка сохранения в localStorage (${key}):`, error)
    }
  }

  // Функция для удаления значения из localStorage
  const removeValue = () => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(key)
        setStoredValue(initialValue)
      }
    } catch (error) {
      console.error(`Ошибка удаления из localStorage (${key}):`, error)
    }
  }

  return [storedValue, setValue, removeValue] as const
}
