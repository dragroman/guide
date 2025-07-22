"use client"

import React, { useState, useEffect } from "react"
import { Control } from "react-hook-form"
import { WorkingHoursField } from "./WorkingHoursField"
import { MobileWorkingHoursField } from "./MobileWorkingHoursField"

interface ResponsiveWorkingHoursFieldProps {
  control: Control<any>
  name: string
  label?: string
  description?: string
  className?: string
  breakpoint?: number // ширина экрана в пикселях для переключения между версиями
}

export const ResponsiveWorkingHoursField: React.FC<
  ResponsiveWorkingHoursFieldProps
> = ({
  control,
  name,
  label,
  description,
  className,
  breakpoint = 768, // по умолчанию md breakpoint
}) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < breakpoint)
    }

    // Проверяем при монтировании
    checkIfMobile()

    // Добавляем слушатель на изменение размера окна
    window.addEventListener("resize", checkIfMobile)

    // Убираем слушатель при размонтировании
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [breakpoint])

  // Используем разные компоненты в зависимости от размера экрана
  if (isMobile) {
    return (
      <MobileWorkingHoursField
        control={control}
        name={name}
        label={label}
        description={description}
        className={className}
      />
    )
  }

  return (
    <WorkingHoursField
      control={control}
      name={name}
      label={label}
      description={description}
      className={className}
    />
  )
}

// Экспортируем также отдельные компоненты для случаев, когда нужен конкретный вариант
export { WorkingHoursField, MobileWorkingHoursField }
