import React from "react"
import { StepIndicator } from "../components/StepIndicator"
import { STEPS } from "../constants"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ChevronLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ApplicationHeaderProps {
  currentStep: number
  goToStep: (step: number) => void
  onPrev: () => void
  isSubmitting: boolean
  hasDraft: boolean
  showDraftNotice: boolean
  restoreDraft: () => void
}

export default function ApplicationHeader({
  currentStep,
  onPrev,
  goToStep,
  isSubmitting,
  hasDraft,
  showDraftNotice,
  restoreDraft,
}: ApplicationHeaderProps) {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 bg-slate-50 border-b border-gray-200 z-10">
        <div className="bg-white border-b border-slate-200">
          <div className="flex flex-row items-center justify-between h-12 mx-2">
            <div>
              {currentStep === 0 && showDraftNotice && hasDraft && (
                <Button variant="outline" size="sm" onClick={restoreDraft}>
                  Восстановить черновик
                </Button>
              )}
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
            <div className="flex flex-row items-center gap-4">
              <div>Едем в Китай</div>
              <div>
                <Image
                  src="/logo/logo.svg"
                  width={30}
                  height={30}
                  alt="Запрос на индивидуальный тур"
                />
              </div>
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
