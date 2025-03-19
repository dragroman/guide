import React from "react"
import { Controller } from "react-hook-form"
import { FormField } from "../components/FormField"
import { AgeGroupDrawer } from "../components/PeopleCounter"
import { StepProps } from "../types"
import texts from "../localization/ru"

export function StepPersonalInfo({
  control,
  errors,
  setValue,
  formData,
}: StepProps) {
  const t = texts.personalInfo

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">{t.title}</h1>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <FormField
            label={t.nameLabel}
            name="name"
            value={field.value}
            onChange={field.onChange}
            placeholder={t.namePlaceholder}
            error={errors.name?.message as string}
          />
        )}
      />

      {/* Компонент с возрастными группами */}
      <div className="space-y-8">
        <div className="space-y-2">
          <label className="text-sm font-medium">{t.travelers}</label>
          <Controller
            name="ageGroups"
            control={control}
            render={({ field }) => (
              <AgeGroupDrawer
                label={t.ageGroups}
                description={t.ageGroupsDescription}
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
