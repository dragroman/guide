import React from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface FormNavigationProps {
  currentStep: number
  totalSteps: number
  onPrev: () => void
  onNext: () => void
  onSubmit: (e: React.FormEvent) => void
  isSubmitting: boolean
}

export function FormNavigation({
  currentStep,
  totalSteps,
  onPrev,
  onNext,
  onSubmit,
  isSubmitting,
}: FormNavigationProps) {
  return (
    <div className="flex justify-between mt-8">
      {currentStep > 0 && (
        <Button
          type="button"
          variant="outline"
          onClick={onPrev}
          disabled={isSubmitting}
        >
          Назад
        </Button>
      )}

      {currentStep < totalSteps - 1 ? (
        <Button
          type="button"
          onClick={onNext}
          className={currentStep === 0 ? "w-full" : "ml-auto"}
          disabled={isSubmitting}
        >
          Далее
        </Button>
      ) : (
        <Button
          type="button"
          onClick={onSubmit}
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
