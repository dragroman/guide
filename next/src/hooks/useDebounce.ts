import { useState, useEffect } from "react"

/**
 * Хук для создания отложенного значения
 * Полезно при обработке частых изменений, например, при поиске
 *
 * @param value Исходное значение
 * @param delay Задержка в миллисекундах
 * @returns Отложенное значение
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    // Устанавливаем таймер для обновления отложенного значения
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Очищаем таймер при изменении значения или размонтировании компонента
    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}
