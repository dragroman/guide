import React, { useState, useEffect } from "react"
import { Controller } from "react-hook-form"
import { StepProps } from "../types"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { getDaysText } from "../utils"
import { formatNumberWithSpaces } from "../utils/formatUtils"
import { HelpCircle, Check, CircleX } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import texts from "../localization/ru"

export function StepBudget({ control, formData, setValue }: StepProps) {
  const t = texts.budget

  const [localBudget, setLocalBudget] = useState<number>(
    formData.budget || 30000
  )

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

      <div>
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
            <Dialog>
              <DialogTrigger asChild>
                <button className="text-muted-foreground hover:text-primary transition-colors">
                  <HelpCircle className="h-4 w-4" />
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader className="text-left">
                  <DialogTitle>
                    Расчет стоимости по возрастным группам
                  </DialogTitle>
                  <DialogDescription>
                    Для удобства расчета общей стоимости применяются следующие
                    коэффициенты
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                  <p>
                    Стоимость рассчитывается с учетом возрастных коэффициентов:
                  </p>
                  <ul className="list-disc list-inside mt-3 space-y-1">
                    <li>Взрослые: 100% стоимости</li>
                    <li>Подростки (13-17 лет): 90% стоимости</li>
                    <li>Пожилые (70+ лет): 80% стоимости</li>
                    <li>Дети (7-12 лет): 50% стоимости</li>
                    <li>Дети (3-6 лет): 30% стоимости</li>
                    <li>Младенцы (до 2 лет): бесплатно</li>
                  </ul>
                </div>
              </DialogContent>
            </Dialog>
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
