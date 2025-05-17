import React from "react"
import { StepIndicator } from "./StepIndicator"
import { STEPS } from "../config/constants"
import { Button } from "@shared/ui/button"
import { ChevronLeft, History } from "lucide-react"
import Image from "next/image"
import MenuMobile from "@/widgets/header/ui/MenuMobile"

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
        <div className="bg-white border-b border-slate-200 w-full">
          <div className="grid grid-cols-3 h-12 mx-2 items-center">
            <div>
              {currentStep === 0 && showDraftNotice && hasDraft && (
                <Button variant="outline" size="sm" onClick={restoreDraft}>
                  <History className="h-4 w-4" />
                  Восстановить
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
            <div className="flex flex-row justify-center items-center gap-4">
              <div>
                <Image
                  src="/logo/logo.svg"
                  width={30}
                  height={30}
                  alt="Запрос на индивидуальный тур"
                />
              </div>
              <div>Планирование</div>
            </div>
            <div className="flex justify-end">
              <MenuMobile className="text-muted-foreground" />
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
