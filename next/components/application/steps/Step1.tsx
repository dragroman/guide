import React from "react"
import { Controller } from "react-hook-form"
import { FormField } from "../components/FormField"
import { StepProps } from "../types"

export function StepPersonalInfo({ control, errors }: StepProps) {
  return (
    <Controller
      name="name"
      control={control}
      render={({ field }) => (
        <FormField
          label="Имя *"
          name="name"
          value={field.value}
          onChange={field.onChange}
          placeholder="Ваше имя"
          error={errors.name?.message as string}
        />
      )}
    />
  )
}
