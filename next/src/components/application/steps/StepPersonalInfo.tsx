import React from "react"
import { Controller } from "react-hook-form"
import { FormField } from "../components/FormField"
import { AgeGroupDrawer } from "../components/PeopleCounter"
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
            type="email"
            name="name"
            value={field.value}
            onChange={field.onChange}
            placeholder="Ваше имя"
            error={errors.name?.message as string}
          />
        )}
      />

      {/* Компонент с возрастными группами */}
      <div className="space-y-8">
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Выберите путешественников
          </label>
          <Controller
            name="ageGroups"
            control={control}
            render={({ field }) => (
              <AgeGroupDrawer
                label="Возрастные группы"
                description="Укажите сколько людей и какого возраста поедут в тур"
                value={field.value}
                onChange={(groups) => {
                  field.onChange(groups)
                  // Также можно обновить peopleCount для совместимости
                  const totalPeople = Object.values(groups).reduce(
                    (sum, count) => sum + count,
                    0
                  )
                  setValue("peopleCount", totalPeople)
                }}
              />
            )}
          />
        </div>
      </div>
    </div>
  )
}
