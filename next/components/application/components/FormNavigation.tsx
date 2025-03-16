import React from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

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
  return (
    <div className="flex justify-between">
      {currentStep < totalSteps - 1 ? (
        <Button
          type="submit"
          size={"lg"}
          onClick={(e) => onNext(e)}
          className="w-full"
          disabled={isSubmitting}
        >
          Далее
        </Button>
      ) : (
        <Button
          type="submit"
          onClick={(e) => onNext(e)}
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
