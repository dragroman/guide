import React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface FormFieldProps {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  error?: string
}

export function FormField({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
}: FormFieldProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor={name}>{label}</Label>
        <Input
          id={name}
          name={name}
          value={value}
          onChange={onChange}
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
