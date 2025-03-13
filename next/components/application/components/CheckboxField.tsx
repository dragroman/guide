// в components/application-form/components/CheckboxField.tsx
import React from "react"
import { Checkbox } from "@/components/ui/checkbox"

interface CheckboxFieldProps {
  label: string
  name: string
  checked: boolean
  onChange: (name: string, checked: boolean) => void
  groupName?: string // добавить для уникальности id
}

export function CheckboxField({
  label,
  name,
  checked,
  onChange,
  groupName = "",
}: CheckboxFieldProps) {
  const id = groupName ? `${groupName}-${name}` : name

  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={(checked) => onChange(name, checked as boolean)}
      />
      <label
        htmlFor={id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  )
}
