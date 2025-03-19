import React from "react"
import { StepIndicator } from "../components/StepIndicator"
import { STEPS } from "../constants"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

interface ApplicationHeaderProps {
  currentStep: number
  goToStep: (step: number) => void
  onPrev: () => void
  isSubmitting: boolean
}

export default function ApplicationHeader({
  currentStep,
  onPrev,
  goToStep,
  isSubmitting,
}: ApplicationHeaderProps) {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 bg-slate-50 border-b border-gray-200 z-10">
        <div className="p-2">
          <div className="flex flex-row items-center justify-between">
            <div>
              {currentStep > 0 && (
                <Button
                  type="button"
                  variant={"outline"}
                  size="sm"
                  onClick={onPrev}
                  disabled={isSubmitting}
                >
                  <ChevronLeft className="h-4 w-4" /> Назад
                </Button>
              )}
            </div>
            <div>
              <Link href="/" title="На главную" className="text-blue-600">
                На сайт
              </Link>
            </div>
          </div>
        </div>
        <StepIndicator
          steps={STEPS}
          currentStep={currentStep}
          goToStep={goToStep}
        />
      </div>
    </>
  )
}
