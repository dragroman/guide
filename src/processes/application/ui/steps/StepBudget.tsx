import React, { useState, useEffect, Suspense } from "react"
import { Controller } from "react-hook-form"
import { HelpCircle, Check, CircleX } from "lucide-react"
import { Slider } from "@shared/ui/slider"
import { Badge } from "@shared/ui/badge"
import { Switch } from "@shared/ui/switch"
import { Label } from "@shared/ui/label"
import texts from "../../localization/ru"
import { StepProps } from "../../model/types"
import { getDaysText } from "@shared/lib/utils"
import { formatNumberWithSpaces } from "../../utils/formatUtils"
import { HelpTotal, HelpVisa } from "../Help"

export function StepBudget({ control, formData, setValue, errors }: StepProps) {
  const t = texts.budget

  const [localBudget, setLocalBudget] = useState<number>(formData.budget)

  const [isDragging, setIsDragging] = useState(false)

  // Получаем общие данные из формы
  const peopleCount = formData.peopleCount || 1
  const daysCount = formData.trip?.daysCount || 1

  // Вычисляем стоимость визы
  const VISA_COST_PER_PERSON = 10000
  const INSURANCE_COST_PER_PERSON = 8000

  const visaCost = formData.needVisa ? VISA_COST_PER_PERSON * peopleCount : 0
  const insuranceCost = formData.needInsurance
    ? INSURANCE_COST_PER_PERSON * peopleCount
    : 0

  // Вычисляем коэффициенты ageGroups
  const ageGroupCoefficients = {
    adults: 1.0,
    children: 0.5,
    infants: 0.0,
    seniors: 0.8,
    teens: 0.9,
    toddlers: 0.3,
  }

  const adultsCount = formData.ageGroups.adults || 1
  const childrenCount = formData.ageGroups.children || 0
  const infantsCount = formData.ageGroups.infants || 0
  const seniorsCount = formData.ageGroups.seniors || 0
  const teensCount = formData.ageGroups.teens || 0
  const toddlersCount = formData.ageGroups.toddlers || 0

  const effectivePeopleCount =
    adultsCount * ageGroupCoefficients.adults +
    childrenCount * ageGroupCoefficients.children +
    infantsCount * ageGroupCoefficients.infants +
    seniorsCount * ageGroupCoefficients.seniors +
    teensCount * ageGroupCoefficients.teens +
    toddlersCount * ageGroupCoefficients.toddlers

  // Вычисляем общий бюджет на всех участников
  const totalBudgetPerDay = Math.round(localBudget * effectivePeopleCount)
  const totalBudget = totalBudgetPerDay * daysCount + visaCost + insuranceCost

  // Обработчик изменения значения слайдера
  const handleBudgetChange = (value: number[]) => {
    setLocalBudget(value[0])
    if (!isDragging) {
      setValue("budget", value[0])
    }
  }

  // Обновление значения в форме после окончания перетаскивания
  useEffect(() => {
    if (!isDragging && localBudget !== formData.budget) {
      setValue("budget", localBudget)
    }
  }, [isDragging, localBudget, setValue, formData.budget])

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{t.messages[0].title}</h1>
      <p className="text-muted-foreground">{t.description}</p>

      <Controller
        name="needVisa"
        control={control}
        render={({ field }) => (
          <div className="flex items-center space-x-2">
            <Switch
              id="needVisa"
              checked={field.value}
              onChange={field.onChange}
              onCheckedChange={(checked) => {
                field.onChange(checked)
                setValue("needVisa", checked)
              }}
            />
            <Label htmlFor="needVisa">{t.visaQuestion}</Label>
            <Suspense
              fallback={
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
              }
            >
              <HelpVisa />
            </Suspense>
          </div>
        )}
      />

      <Controller
        name="needInsurance"
        control={control}
        render={({ field }) => (
          <div className="flex items-center space-x-2">
            <Switch
              id="needInsurance"
              checked={field.value}
              onChange={field.onChange}
              onCheckedChange={(checked) => {
                field.onChange(checked)
                setValue("needInsurance", checked)
              }}
            />
            <Label htmlFor="needInsurance">{t.insuranceQuestion}</Label>
          </div>
        )}
      />

      <Controller
        name="needGuide"
        control={control}
        render={({ field }) => (
          <div className="flex items-center space-x-2">
            <Switch
              id="needGuide"
              checked={field.value}
              onChange={field.onChange}
              onCheckedChange={(checked) => {
                field.onChange(checked)
                setValue("needGuide", checked)
              }}
            />
            <Label htmlFor="needGuide">{t.guideQuestion}</Label>
          </div>
        )}
      />

      <div>
        <div className="">{t.label}</div>
        <div
          className={`flex ${formData.peopleCount > 1 ? "justify-between" : "justify-end"} items-center mb-8 mt-4`}
        >
          {formData.peopleCount > 1 && (
            <div>
              <Badge variant="outline" className="text-lg font-normal">
                {formatNumberWithSpaces(localBudget)} ₽
              </Badge>
              <div className="text-xs ml-1 text-muted-foreground">
                {t.perPerson}
              </div>
            </div>
          )}
          <div className="text-right">
            <Badge variant="secondary" className="text-lg">
              {formatNumberWithSpaces(totalBudgetPerDay)} ₽
            </Badge>
            <div className="text-xs ml-1 text-muted-foreground">{t.perDay}</div>
          </div>
        </div>

        {errors.budget && (
          <div className="text-sm font-medium text-destructive mb-4">
            {typeof errors.budget === "object" && errors.budget.message
              ? errors.budget.message
              : "Пожалуйста, укажите бюджет"}
          </div>
        )}

        <Controller
          name="budget"
          control={control}
          render={({ field }) => (
            <Slider
              min={1000}
              max={100000}
              step={100}
              value={[localBudget]}
              onValueChange={handleBudgetChange}
              onValueCommit={(value) => {
                setValue("budget", value[0])
              }}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onTouchStart={() => setIsDragging(true)}
              onTouchEnd={() => setIsDragging(false)}
              onChange={field.onChange}
              className="mb-8"
            />
          )}
        />

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-muted/30 p-4 rounded-lg text-center">
            <div className="text-xs text-muted-foreground mb-1">
              {t.participants}
            </div>
            <div className="text-xl font-medium">{peopleCount} чел.</div>
          </div>
          <div className="bg-muted/30 p-4 rounded-lg text-center flex flex-col justify-between">
            <div className="text-xs text-muted-foreground mb-1">
              {t.duration}
            </div>
            <div className="text-xl font-medium">
              {daysCount} {getDaysText(daysCount)}
            </div>
          </div>
        </div>

        <div className="bg-muted/30 p-4 rounded-lg text-center">
          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1 justify-center">
            <div>{t.totalAmount}</div>

            <HelpTotal />
          </div>
          <div className="text-xl font-bold">
            {formatNumberWithSpaces(totalBudget)} ₽
          </div>
        </div>
      </div>

      <div className="text-lg">{t.servicesIncluded}</div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3">
        {t.services.map((service) => (
          <div key={service.key} className="flex gap-3 text-sm items-center">
            <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
              {service.included ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <CircleX className="w-4 h-4 text-red-500" />
              )}
            </div>
            <span
              className={`${service.included ? "text-gray-900" : "text-red-500"}`}
            >
              {service.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
