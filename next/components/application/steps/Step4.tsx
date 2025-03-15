import React from "react"
import { Controller } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { StepProps } from "../types"
import { FormField } from "../components/FormField"
import { PhoneInput } from "../components/PhoneInput"

export function StepContactInfo({ control, errors }: StepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="phone">Телефон *</Label>
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <PhoneInput
              id="phone"
              value={field.value}
              onChange={field.onChange}
              className={errors.phone ? "border-destructive" : ""}
              defaultCountry="RU"
              international
            />
          )}
        />
        <p className="text-xs text-muted-foreground">
          Введите номер телефона в международном формате
        </p>
        {errors.phone && (
          <p className="text-sm font-medium text-destructive">
            {errors.phone.message}
          </p>
        )}
      </div>

      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <FormField
            label="Электронная почта *"
            {...field}
            placeholder="Электронная почта"
            error={errors.email?.message}
          />
        )}
      />
    </div>
  )
}
