import React from "react"
import { Controller } from "react-hook-form"
import { FormField } from "../components/FormField"
import { PeopleCounter } from "../components/PeopleCounter"
import { StepProps } from "../types"

export function StepPersonalInfo({
  control,
  errors,
  setValue,
  formData,
}: StepProps) {
  return (
    <div className="space-y-8">
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <FormField
            label="Давайте знакомится"
            name="name"
            value={field.value}
            onChange={field.onChange}
            placeholder="Ваше имя"
            error={errors.name?.message as string}
          />
        )}
      />

      <Controller
        name="peopleCount"
        control={control}
        render={() => (
          <PeopleCounter
            label="Сколько вас будет путешествовать?"
            description="Укажите точное число участников тура"
            min={1}
            max={10}
            onChange={(count) => setValue("peopleCount", count)}
          />
        )}
      />
    </div>
  )
}
