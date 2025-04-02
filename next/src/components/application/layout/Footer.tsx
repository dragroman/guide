// src/components/application/layout/Footer.tsx
import React from "react"
import { FormNavigation } from "../components/FormNavigation"
import { TOTAL_STEPS } from "../constants"
import { Button } from "@/components/ui/button"

interface ApplicationFooterProps {
  currentStep: number
  onNext: (e: React.FormEvent) => void
  isSubmitting: boolean
  onSkip?: () => void
}

export default function ApplicationFooter({
  currentStep,
  onNext,
  isSubmitting,
  onSkip,
}: ApplicationFooterProps) {
  // Определяем, на каких шагах показывать кнопку "Пропустить"
  const showSkipButton = currentStep === 4 || currentStep === 5 // StepFood (4) и StepShopping (5)

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-10">
        <div className="max-w-[500px] mx-auto">
          <div className="flex flex-col gap-2">
            {showSkipButton && onSkip && (
              <Button
                type="button"
                variant="ghost"
                onClick={onSkip}
                className="w-full text-muted-foreground"
                disabled={isSubmitting}
              >
                Пропустить этот шаг
              </Button>
            )}
            <FormNavigation
              currentStep={currentStep}
              totalSteps={TOTAL_STEPS}
              onNext={onNext}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </div>
    </>
  )
}
