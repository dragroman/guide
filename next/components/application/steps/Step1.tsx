import React from "react"
import { StepProps } from "../types"
import { FormField } from "../components/FormField"

export function StepPersonalInfo({
  formData,
  errors,
  handleChange,
}: StepProps) {
  return (
    <FormField
      label="Имя *"
      name="name"
      value={formData.name}
      onChange={handleChange}
      placeholder="Ваше имя"
      error={errors.name}
    />
  )
}
