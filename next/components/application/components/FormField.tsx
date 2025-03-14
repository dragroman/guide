import React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface FormFieldProps {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement> | string) => void
  placeholder?: string
  error?: string
  // Добавляем поля для поддержки React Hook Form
  onBlur?: () => void
  ref?: React.Ref<HTMLInputElement>
}

export function FormField({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  onBlur,
  ref,
}: FormFieldProps) {
  // Функция-обертка для поддержки как обычных событий, так и прямых значений
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof onChange === "function") {
      onChange(e)
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor={name}>{label}</Label>
        <Input
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={onBlur}
          ref={ref}
          placeholder={placeholder}
          className={error ? "border-destructive" : ""}
        />
        {error && (
          <p className="text-sm font-medium text-destructive">{error}</p>
        )}
      </div>
    </div>
  )
}
