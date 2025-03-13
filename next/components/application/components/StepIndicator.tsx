import React from "react"
import { CheckCircle2 } from "lucide-react"

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
  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => (
        <div key={index} className="flex flex-col items-center">
          <button
            type="button"
            onClick={() => goToStep(index)}
            disabled={index > currentStep}
            className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all
              ${
                index === currentStep
                  ? "bg-primary text-primary-foreground"
                  : index < currentStep
                    ? "bg-primary/20 text-primary cursor-pointer"
                    : "bg-muted text-muted-foreground"
              }`}
            aria-current={index === currentStep ? "step" : undefined}
          >
            {index < currentStep ? (
              <CheckCircle2 className="h-5 w-5" />
            ) : (
              <span>{index + 1}</span>
            )}
          </button>
          <p
            className={`text-xs font-medium ${
              index === currentStep ? "text-primary" : "text-muted-foreground"
            }`}
          >
            {step.title}
          </p>
        </div>
      ))}
    </div>
  )
}
