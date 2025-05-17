"use client"

import React, { useEffect } from "react"
import { Alert, AlertTitle, AlertDescription } from "@shared/ui/alert"
import { useApplicationForm } from "./model/useApplicationForm"
import { DraftNotice } from "./ui/DraftNotice"

// Компоненты шагов
import { StepPersonalInfo } from "./ui/steps/StepPersonalInfo"
import { StepContactInfo } from "./ui/steps/StepContactInfo"
import { StepTripPurpose } from "./ui/steps/StepTripPurpose"
import { StepAccommodation } from "./ui/steps/StepAccommodation"
import { StepFood } from "./ui/steps/StepFood"
import { StepTransport } from "./ui/steps/StepTransport"
import { StepConfirmation } from "./ui/steps/stepFinal"

// Вспомогательные компоненты
import { SuccessView } from "./ui/SuccessView"
import { StepProps } from "./model/types"
import ApplicationHeader from "./ui/ApplicationHeader"
import ApplicationFooter from "./ui/ApplicationFooter"
import { StepShopping } from "./ui/steps/StepShopping"
import { StepBudget } from "./ui/steps/StepBudget"
import { STEPS, TOTAL_STEPS } from "./config/constants"

export default function MultistepForm() {
  const {
    // Состояние форм
    formData,
    currentStep,
    isSubmitting,
    isSuccess,
    isError,
    errorMessage,
    errors,

    // React Hook Form
    control,
    setValue,
    getValues,

    // Функционал черновика
    hasDraft,
    showDraftNotice,
    restoreDraft,
    ignoreDraft,

    // Универсальные обработчики
    handleOptionChange,
    handleTextChange,

    // Специфичные обработчики
    handleDateChange,

    // Навигация
    nextStep,
    prevStep,
    goToStep,
    skipStep,

    // Управление формой
    handleFormAction,

    // Черновики
    resetForm,
  } = useApplicationForm()

  useEffect(() => {
    // Функция для отслеживания закрытия страницы
    const handleBeforeUnload = () => {
      if (!isSuccess && currentStep > 0) {
        window.dataLayer?.push({
          event: "form_exit",
          formName: "application_form",
          lastStepNumber: currentStep,
          lastStepName: STEPS[currentStep]?.title || `Шаг ${currentStep + 1}`,
          formProgress: Math.floor(((currentStep + 1) / TOTAL_STEPS) * 100),
        })
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [currentStep, isSuccess])

  // Если форма успешно отправлена, показываем экран успеха
  if (isSuccess) {
    return <SuccessView onReset={resetForm} />
  }

  // Функция для рендеринга текущего шага
  const renderCurrentStep = () => {
    // Общие пропсы для всех шагов
    const stepProps: StepProps = {
      formData,
      errors,
      control,
      setValue,
      // Универсальные обработчики
      handleOptionChange,
      handleTextChange,
      // Специфичные обработчики (для обратной совместимости)
      handleDateChange,
    }

    switch (currentStep) {
      case 0:
        return <StepPersonalInfo {...stepProps} />
      case 1:
        return <StepTripPurpose {...stepProps} />
      case 2:
        return <StepAccommodation {...stepProps} />
      case 3:
        return <StepTransport {...stepProps} />
      case 4:
        return <StepFood {...stepProps} />
      case 5:
        return <StepShopping {...stepProps} />
      case 6:
        return <StepBudget {...stepProps} />
      case 7:
        return <StepContactInfo {...stepProps} />
      case 8:
        return <StepConfirmation {...stepProps} />
      default:
        return null
    }
  }

  return (
    <>
      {/* Навигация по шагам */}
      <ApplicationHeader
        currentStep={currentStep}
        goToStep={goToStep}
        onPrev={prevStep}
        isSubmitting={isSubmitting}
        hasDraft={hasDraft}
        showDraftNotice={showDraftNotice}
        restoreDraft={restoreDraft}
      />
      <div className="w-full mx-auto mb-10 pt-32 lg:pt-48 px-4">
        {isError && (
          <Alert variant="destructive" className="mb-6">
            <AlertTitle>Ошибка</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        {/* Форма с текущим шагом */}
        <form onSubmit={handleFormAction} className="flex flex-col">
          <div className="flex-grow pb-24" id="form-content">
            {renderCurrentStep()}
          </div>

          <ApplicationFooter
            currentStep={currentStep}
            onNext={handleFormAction}
            isSubmitting={isSubmitting}
            onSkip={skipStep}
          />
        </form>
      </div>
    </>
  )
}
