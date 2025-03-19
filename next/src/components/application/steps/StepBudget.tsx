import React, { useState, useEffect } from "react"
import { Controller } from "react-hook-form"
import { StepProps } from "../types"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { getDaysText } from "../utils"
import { formatNumberWithSpaces } from "../utils/formatUtils"
import { HandCoins, HelpCircle, Check, CircleX } from "lucide-react"
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
import { get } from "http"

export function StepBudget({ control, formData, setValue }: StepProps) {
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

  // Что включено

  const services = [
    { icon: Check, title: "Проживание" },
    { icon: Check, title: "Транспорт внутри страны" },
    { icon: Check, title: "Незабываемые впечатления" },
    { icon: Check, title: "Дорожный путеводитель с рекомендациями" },
    { icon: Check, title: "Круглосуточная поддержка" },
    // { icon: Check, title: "Консьерж-сервис во время поездки" },
    { icon: Check, title: "Индивидуальное планирование путешествия" },
    { icon: Check, title: "Помощь при въезде и выезде" },
    {
      icon: CircleX,
      title: "Международные перелеты не включены",
      excluded: true,
    },
  ]

  // Обработчик изменения значения слайдера
  const handleBudgetChange = (value: number[]) => {
    setLocalBudget(value[0])
    if (!isDragging) {
      setValue("budget", value[0])
    }
  }

  // Разные тексты
  type BudgetMessage = {
    emotion: string
    title: string
    text: string
  }
  const budgetMessages: BudgetMessage[] = [
    {
      emotion: "friendliness",
      title: "Подберём идеальный тур!",
      text: "Чтобы подобрать для вас идеальный тур, нам нужно знать ваш бюджет. Так мы сможем предложить наилучшие варианты, подходящие именно вам!",
    },
    {
      emotion: "joy",
      title: "Чем точнее бюджет – тем лучше путешествие!",
      text: "Давайте сделаем ваш отдых незабываемым, подобрав оптимальные варианты!",
    },
    {
      emotion: "playfulness",
      title: "Хотите увидеть лучшие предложения?",
      text: "Расскажите, какой у нас бюджет, и мы соберём для вас идеальный тур!",
    },
    {
      emotion: "reasonableness",
      title: "Оптимальный выбор для вас!",
      text: "Мы ценим ваше время и деньги, поэтому, зная ваш бюджет, сможем предложить только лучшие варианты без лишнего.",
    },
    {
      emotion: "wanderLust",
      title: "Откройте мир с нами!",
      text: "Мир огромен, и вариантов много! Сориентируйте нас по бюджету, и мы найдём для вас идеальный маршрут!",
    },
    {
      emotion: "openCommunication",
      title: "Ваш бюджет – не ограничение!",
      text: "Это возможность выбрать лучшее в своей категории! Давайте подберём варианты!",
    },
    {
      emotion: "expertise",
      title: "Доверьтесь профессионалам!",
      text: "Мы знаем, как сделать ваш отдых комфортным и незабываемым в рамках вашего бюджета. Просто сообщите сумму, и мы всё рассчитаем!",
    },
    {
      emotion: "practicality",
      title: "Никаких лишних расходов!",
      text: "Чем точнее бюджет, тем точнее расчёт тура – без ненужных опций, только самое лучшее для вас!",
    },
    {
      emotion: "personalization",
      title: "Тур под ваши желания!",
      text: "Мы хотим создать путешествие именно под вас! Дайте нам ориентир по бюджету, и мы подберём тур вашей мечты.",
    },
    {
      emotion: "inspiration",
      title: "Воплотим мечты в реальность!",
      text: "Укажите бюджет, и мы найдём для вас путешествие, о котором вы давно мечтали!",
    },
    {
      emotion: "individualApproach",
      title: "Индивидуальный подход для каждого!",
      text: "Каждый путешественник уникален! Расскажите нам про бюджет, и мы соберём маршрут, который вам идеально подойдёт.",
    },
    {
      emotion: "energy",
      title: "Готовы к приключениям?",
      text: "Укажите сумму, и мы подберём лучшие предложения, чтобы ваше путешествие было крутым!",
    },
    {
      emotion: "luxuryAndComfort",
      title: "Роскошь и комфорт в каждой детали!",
      text: "Ваш комфорт – наш приоритет! Сообщите нам бюджет, и мы подберём лучшие отели, перелёты и экскурсии.",
    },
    {
      emotion: "care",
      title: "Позаботимся о вашем комфорте!",
      text: "Нам важно, чтобы ваше путешествие было комфортным и без неожиданных расходов. Давайте определим бюджет заранее!",
    },
    {
      emotion: "honestyAndTransparency",
      title: "Честный и прозрачный расчёт!",
      text: "Мы не предлагаем то, что вам не подходит. С бюджетом мы сможем рассчитать тур, который вам точно понравится!",
    },
  ]

  const getTitleByEmotion = (emotion: string) => {
    return budgetMessages.find((message) => message.emotion === emotion)?.title
  }

  // Обновление значения в форме после окончания перетаскивания
  useEffect(() => {
    if (!isDragging && localBudget !== formData.budget) {
      setValue("budget", localBudget)
    }
  }, [isDragging, localBudget, setValue, formData.budget])

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{getTitleByEmotion("joy")}</h1>
      <p className="text-muted-foreground">
        Мы хотим создать путешествие именно под вас! Дайте нам ориентир по
        бюджету, и мы подберём тур вашей мечты.
      </p>
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
            <Label htmlFor="needVisa">
              Требуются ли услуги оформления виз?
            </Label>
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
                setValue("needInsurance", checked) // Важно: явно обновляем значение в форме
              }}
            />
            <Label htmlFor="needInsurance">Страховка нужна?</Label>
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
                на человека в день
              </div>
            </div>
          )}
          <div className="text-right">
            <Badge variant="secondary" className="text-lg">
              {formatNumberWithSpaces(totalBudgetPerDay)} ₽
            </Badge>
            <div className="text-xs ml-1 text-muted-foreground">
              всего в день
            </div>
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
              Количество участников
            </div>
            <div className="text-xl font-medium">{peopleCount} чел.</div>
          </div>
          <div className="bg-muted/30 p-4 rounded-lg text-center flex flex-col justify-between">
            <div className="text-xs text-muted-foreground mb-1 ">
              Продолжительность
            </div>
            <div className="text-xl font-medium">
              {daysCount} {getDaysText(daysCount)}
            </div>
          </div>
        </div>
        <div className="bg-muted/30 p-4 rounded-lg text-center ">
          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1 justify-center">
            <div>Примерная сумма всей поездки</div>
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
      <div className="text-lg">
        Что будет включено в стоимость индивидуального тура?
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3">
        {services.map(({ icon: Icon, title, excluded }) => (
          <div key={title} className="flex gap-3 text-sm items-center">
            <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
              <Icon
                className={`w-4 h-4 ${excluded ? "text-red-500" : "text-green-600"}`}
              />
            </div>
            <span className={`${excluded ? "text-red-500" : "text-gray-900"}`}>
              {title}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
