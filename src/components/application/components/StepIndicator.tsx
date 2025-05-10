import React, { useEffect, useRef } from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { scrollToFormTop } from "../utils/scrollUtils"

interface Step {
  title: string
  description: string
}
interface StepIndicatorProps {
  steps: Step[]
  currentStep: number
  goToStep: (step: number) => void
}

export function StepIndicator({
  steps,
  currentStep,
  goToStep,
}: StepIndicatorProps) {
  // Создаем ref для контейнера с шагами и для текущего активного шага
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const currentStepRef = useRef<HTMLDivElement>(null)

  // Эффект для автоматической прокрутки к текущему шагу
  useEffect(() => {
    if (scrollContainerRef.current && currentStepRef.current) {
      const container = scrollContainerRef.current
      const activeStep = currentStepRef.current

      // Рассчитываем позицию для центрирования элемента
      const containerWidth = container.offsetWidth
      const stepWidth = activeStep.offsetWidth
      const stepLeft = activeStep.offsetLeft

      // Центрируем элемент в контейнере с плавной прокруткой
      container.scrollTo({
        left: stepLeft - containerWidth / 2 + stepWidth / 2,
        behavior: "smooth",
      })
    }
  }, [currentStep]) // Запускаем эффект при изменении currentStep

  // Обработчик перехода на определенный шаг
  const handleStepClick = (step: number) => {
    if (step === currentStep) return // Если уже на этом шаге, ничего не делаем

    goToStep(step)

    // После перехода на шаг прокручиваем страницу наверх
    // scrollToFormTop() - не нужно вызывать здесь, т.к. это теперь происходит в useApplicationForm
  }

  return (
    <div className="w-full">
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto lg:py-2 scrollbar-non px-4 py-2"
        style={{
          // Скрываем стандартный скролл
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {/* Стили для скрытия скроллбара в WebKit (Chrome, Safari) */}
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {steps.map((step, index) => {
          // Определяем статус шага
          const isCompleted = index < currentStep
          const isCurrent = index === currentStep
          const isPending = index > currentStep

          return (
            <div
              key={index}
              ref={isCurrent ? currentStepRef : null}
              className={cn(
                "flex-shrink-0 flex flex-col items-center mx-1 first:ml-0 last:mr-0 ",
                index === 0 ? "pl-0" : "",
                index === steps.length - 1 ? "pr-0" : ""
              )}
              style={{ width: `${100 / Math.min(steps.length, 5)}%` }}
            >
              {/* Верхняя линия прогресса */}
              <div className="w-full flex items-center">
                {/* Линия слева */}
                {index > 0 && (
                  <div
                    className={cn(
                      "h-1 flex-grow transition-colors duration-300",
                      isCompleted ? "bg-primary" : "bg-muted"
                    )}
                  />
                )}

                {/* Индикатор */}
                <button
                  type="button"
                  onClick={() => handleStepClick(index)}
                  disabled={isPending}
                  className={cn(
                    "h-7 w-7 rounded-full flex items-center justify-center border-2 transition-all relative z-10",
                    isCompleted
                      ? "bg-primary border-primary text-primary-foreground"
                      : isCurrent
                        ? "border-primary bg-white text-primary"
                        : "border-muted bg-muted/30 text-muted-foreground"
                  )}
                >
                  {isCompleted ? (
                    <span className="text-xs font-medium">{index + 1}</span>
                  ) : (
                    <span className="text-xs font-medium">{index + 1}</span>
                  )}
                </button>

                {/* Линия справа */}
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "h-1 flex-grow transition-colors duration-300",
                      index < currentStep ? "bg-primary" : "bg-muted"
                    )}
                  />
                )}
              </div>

              {/* Метка */}
              <div
                className={cn(
                  "text-center transition-colors pt-1 w-full hidden lg:block",
                  isCurrent
                    ? "text-primary"
                    : isCompleted
                      ? "text-foreground"
                      : "text-muted-foreground"
                )}
              >
                <span className="text-xs font-medium block truncate">
                  {step.title}
                </span>
                {isCurrent && (
                  <span className="text-[10px] text-muted-foreground mt-0.5 line-clamp-1">
                    {step.description}
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
