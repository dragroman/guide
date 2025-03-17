import React from "react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface ProgressIndicatorProps {
  currentStep: number
  totalSteps: number
  progress: number
}

export function ProgressIndicator({
  currentStep,
  totalSteps,
  progress,
}: ProgressIndicatorProps) {
  return (
    <div className="mb-6">
      <Progress value={progress} className="h-2" />
      <div className="flex justify-between mt-1">
        <p className="text-xs text-muted-foreground">
          Шаг {currentStep + 1} из {totalSteps}
        </p>
        <Badge variant="outline">{progress}%</Badge>
      </div>
    </div>
  )
}
