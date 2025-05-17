import React from "react"
import { Button } from "@shared/ui/button"
import { Loader2 } from "lucide-react"
import { scrollToFormTop } from "../utils/scrollUtils"

interface FormNavigationProps {
  currentStep: number
  totalSteps: number
  onNext: (e: React.FormEvent) => void
  isSubmitting: boolean
}

export function FormNavigation({
  currentStep,
  totalSteps,
  onNext,
  isSubmitting,
}: FormNavigationProps) {
  // Обработчик нажатия на кнопку "Далее" или "Отправить"
  const handleClick = (e: React.FormEvent) => {
    // Вызываем родительский обработчик
    onNext(e)
  }

  return (
    <div className="flex justify-between">
      {currentStep < totalSteps - 1 ? (
        <Button
          type="submit"
          size={"lg"}
          onClick={handleClick}
          className="w-full"
          disabled={isSubmitting}
        >
          Далее
        </Button>
      ) : (
        <Button
          type="submit"
          onClick={handleClick}
          size={"lg"}
          className="w-full"
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
