"use client"

import React from "react"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { useApplicationForm } from "./hooks/useApplicationForm"
import { DraftNotice } from "./components/DraftNotice"

// Компоненты шагов
import { StepPersonalInfo } from "./steps/StepPersonalInfo"
import { StepContactInfo } from "./steps/StepContactInfo"
import { StepTripPurpose } from "./steps/StepTripPurpose"
import { StepAccommodation } from "./steps/StepAccommodation"
import { StepFood } from "./steps/StepFood"
import { StepTransport } from "./steps/StepTransport"
import { StepConfirmation } from "./steps/stepFinal"

// Вспомогательные компоненты
import { SuccessView } from "./components/SuccessView"
import { StepProps } from "./types"
import ApplicationHeader from "./layout/Header"
import ApplicationFooter from "./layout/Footer"
import { StepShopping } from "./steps/StepShopping"

export default function MultistepForm() {
  const {
    // Состояние формы
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

    // Управление формой
    handleFormAction,

    // Черновики
    resetForm,
  } = useApplicationForm()

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
        return <StepContactInfo {...stepProps} />
      case 7:
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
      />

      <div className="w-full mx-auto mb-10 pt-32 lg:pt-48 px-4">
        {isError && (
          <Alert variant="destructive" className="mb-6">
            <AlertTitle>Ошибка</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        {/* Форма с текущим шагом */}
        <form onSubmit={handleFormAction} className="flex flex-col ">
          <div className="flex-grow pb-24">{renderCurrentStep()}</div>
          {/* Уведомление о черновике только на первом шаге */}
          {currentStep === 0 && showDraftNotice && hasDraft && (
            <DraftNotice onLoad={restoreDraft} onIgnore={ignoreDraft} />
          )}
          <ApplicationFooter
            currentStep={currentStep}
            onNext={handleFormAction}
            isSubmitting={isSubmitting}
          />
        </form>
      </div>
    </>
  )
}
