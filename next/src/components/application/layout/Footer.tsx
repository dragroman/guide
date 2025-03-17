import React from "react"
import { FormNavigation } from "../components/FormNavigation"
import { TOTAL_STEPS } from "../constants"

interface ApplicationFooterProps {
  currentStep: number
  onNext: (e: React.FormEvent) => void
  isSubmitting: boolean
}

export default function ApplicationFooter({
  currentStep,
  onNext,
  isSubmitting,
}: ApplicationFooterProps) {
  return (
    <>
      {/* Фиксированная панель навигации внизу экрана */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-10">
        <div className="max-w-screen-md mx-auto">
          {/* Индикатор прогресса */}
          {/* <ProgressIndicator
                currentStep={currentStep}
                totalSteps={TOTAL_STEPS}
                progress={progress}
              /> */}
          <FormNavigation
            currentStep={currentStep}
            totalSteps={TOTAL_STEPS}
            onNext={onNext}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </>
  )
}
