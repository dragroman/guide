// src/components/application/steps/StepPersonalInfo.tsx (обновленный)

import React, { useEffect, useState } from "react"
import { Controller } from "react-hook-form"
import { FormField } from "../FormField"
import { AgeGroupDrawer } from "../PeopleCounter"
import { StepProps } from "../../model/types"
import texts from "../../localization/ru"
import { useSearchParams } from "next/navigation"
import { ShareForm } from "../ShareForm"
import { LocationSelect } from "../LocationSelect"

export function StepPersonalInfo({
  control,
  errors,
  setValue,
  formData,
}: StepProps) {
  const t = texts.baseInfo
  const searchParams = useSearchParams()
  const [isExpertEmailDisabled, setIsExpertEmailDisabled] = useState(false)
  const [isEditExpertEmail, setIsEditExpertEmail] = useState(false)
  const [hasExpertEmail, setHasExpertEmail] = useState(false)

  // Проверяем наличие email в URL-параметрах
  useEffect(() => {
    const emailFromUrl = searchParams.get("email")
    if (emailFromUrl && validateEmail(emailFromUrl)) {
      setValue("expertEmail", emailFromUrl)
      setIsExpertEmailDisabled(true)
    } else {
      setHasExpertEmail(true)
    }
  }, [searchParams, setValue])

  // Простая валидация email
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  // Обработчик выбора городов
  const handleCitiesChange = (
    value: string,
    internalId?: number,
    cities?: Array<{ id: string; internalId?: number; name?: string }>
  ) => {
    // Устанавливаем значение основного города (для обратной совместимости)
    setValue("city", value)
    setValue("cityInternalId", internalId || 0)

    // Устанавливаем массив всех выбранных городов
    if (cities) {
      const validCities = cities.filter((city) => city.id)

      setValue(
        "cities",
        validCities.map((city) => city.id)
      )

      // Проверяем и устанавливаем internalIds
      const internalIds = validCities.map((city) => {
        if (city.internalId) return city.internalId
        return 0
      })

      setValue("citiesInternalIds", internalIds)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t.title}</h1>
        {hasExpertEmail && <ShareForm />}
      </div>
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

      <div className="space-y-2">
        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <LocationSelect
              label={t.city}
              value={formData.cities?.length ? formData.cities : field.value}
              placeholder={t.cityPlaceholder}
              onChange={handleCitiesChange}
              error={errors.city?.message as string}
              multiSelect={true}
            />
          )}
        />
      </div>
    </div>
  )
}
