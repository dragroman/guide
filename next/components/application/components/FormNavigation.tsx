import React from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface FormNavigationProps {
  currentStep: number
  totalSteps: number
  onPrev: () => void
  onNext: (e: React.FormEvent) => void
  isSubmitting: boolean
}

export function FormNavigation({
  currentStep,
  totalSteps,
  onPrev,
  onNext,
  isSubmitting,
}: FormNavigationProps) {
  return (
    <div className="flex justify-between mt-8">
      {currentStep > 0 && (
        <Button
          type="button" // Это кнопка типа button, чтобы она не отправляла форму
          variant="outline"
          onClick={onPrev}
          disabled={isSubmitting}
        >
          Назад
        </Button>
      )}

      {currentStep < totalSteps - 1 ? (
        <Button
          type="submit" // Используем тип submit, чтобы сработал обработчик формы
          onClick={(e) => onNext(e)}
          className={currentStep === 0 ? "w-full" : "ml-auto"}
          disabled={isSubmitting}
        >
          Далее
        </Button>
      ) : (
        <Button
          type="submit" // Для последнего шага тоже используем тип submit
          onClick={(e) => onNext(e)}
          className="ml-auto"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Отправка...
            </>
          ) : (
            "Отправить"
          )}
        </Button>
      )}
    </div>
  )
}
