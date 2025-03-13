import React from "react"
import { Label } from "@/components/ui/label"
import { StepProps } from "../types"
import { FormField } from "../components/FormField"
import { PhoneInput } from "../components/PhoneInput"

export function StepContactInfo({
  formData,
  errors,
  handleChange,
  updateFormData,
}: StepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="phone">Телефон *</Label>
        <PhoneInput
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={(value) => updateFormData("phone", value || "")}
          className={errors.phone ? "border-destructive" : ""}
          defaultCountry="RU"
          international
        />
        <p className="text-xs text-muted-foreground">
          Введите номер телефона в международном формате
        </p>
        {errors.phone && (
          <p className="text-sm font-medium text-destructive">{errors.phone}</p>
        )}
      </div>

      <FormField
        label="Электронная почта *"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Электронная почта"
        error={errors.email}
      />
    </div>
  )
}
