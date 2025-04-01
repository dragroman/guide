import React, { useEffect, useState } from "react"
import { Controller } from "react-hook-form"
import { FormField } from "../components/FormField"
import { AgeGroupDrawer } from "../components/PeopleCounter"
import { StepProps } from "../types"
import texts from "../localization/ru"
import { LocationSelect } from "../components/LocationSelect"
import { useSearchParams } from "next/navigation"
import { ShareForm } from "../components/ShareForm"

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

  // Функция для включения редактирования предзаполненного email
  const handleEnableExpertEmailEdit = () => {
    setIsExpertEmailDisabled(false)
    setIsEditExpertEmail(true)
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
      {/* Выбор города */}
      <div className="space-y-2">
        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <LocationSelect
              label={t.city}
              value={field.value}
              placeholder={t.cityPlaceholder}
              onChange={field.onChange}
              error={errors.city?.message as string}
            />
          )}
        />
      </div>
    </div>
  )
}
