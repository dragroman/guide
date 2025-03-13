import React from "react"
import { Checkbox } from "@/components/ui/checkbox"

interface PurposeCheckboxProps {
  label: string
  name: string
  checked: boolean
  onChange: (name: string, checked: boolean) => void
}

export function PurposeCheckbox({
  label,
  name,
  checked,
  onChange,
}: PurposeCheckboxProps) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={`purpose-${name}`}
        checked={checked}
        onCheckedChange={(checked) => onChange(name, checked as boolean)}
      />
      <label
        htmlFor={`purpose-${name}`}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  )
}
