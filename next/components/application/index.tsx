"use client"

import React from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { STEPS, TOTAL_STEPS } from "./constants"
import { useApplicationForm } from "./hooks/useApplicationForm"
import { DraftNotice } from "./components/DraftNotice"

// Компоненты шагов
import { StepPersonalInfo } from "./steps/Step1"
import { StepContactInfo } from "./steps/Step2"
import { StepTripPurpose } from "./steps/Step3"
import { StepAccommodation } from "./steps/Step4"
import { StepConfirmation } from "./steps/stepFinal"

// Вспомогательные компоненты
import { SuccessView } from "./components/SuccessView"
import { ProgressIndicator } from "./components/ProgressIndicator"
import { StepIndicator } from "./components/StepIndicator"
import { FormNavigation } from "./components/FormNavigation"
import { StepProps } from "./types"

export default function MultistepForm() {
  const {
    // Состояние формы
    formData,
    currentStep,
    isSubmitting,
    isSuccess,
    isError,
    errorMessage,
    progress,
    errors,

    // React Hook Form
    control,
    setValue,

    // Функционал черновика
    hasDraft,
    showDraftNotice,
    restoreDraft,
    ignoreDraft,

    // Обработчики
    handleDateChange,
    handlePurposeChange,
    handlePurposeTextChange,
    handleAccommodationChange,
    handleAccommodationTextChange,
    handlePreferenceChange,
    handlePreferenceTextChange,

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
      handleDateChange,
      handlePurposeChange,
      handlePurposeTextChange,
      handleAccommodationChange,
      handleAccommodationTextChange,
      handlePreferenceChange,
      handlePreferenceTextChange,
    }

    switch (currentStep) {
      case 0:
        return <StepPersonalInfo {...stepProps} />
      case 1:
        return <StepContactInfo {...stepProps} />
      case 2:
        return <StepTripPurpose {...stepProps} />
      case 3:
        return <StepAccommodation {...stepProps} />
      case 4:
        return <StepConfirmation {...stepProps} />
      default:
        return null
    }
  }

  return (
    <>
      {/* Индикатор прогресса */}
      <ProgressIndicator
        currentStep={currentStep}
        totalSteps={TOTAL_STEPS}
        progress={progress}
      />
      <Card className="w-full max-w-md mx-auto mb-10">
        <CardHeader>
          <CardTitle>{STEPS[currentStep].title}</CardTitle>
          <CardDescription>{STEPS[currentStep].description}</CardDescription>
        </CardHeader>

        <CardContent>
          {/* Уведомление о черновике только на первом шаге */}
          {currentStep === 0 && showDraftNotice && hasDraft && (
            <DraftNotice onLoad={restoreDraft} onIgnore={ignoreDraft} />
          )}

          {isError && (
            <Alert variant="destructive" className="mb-6">
              <AlertTitle>Ошибка</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          {/* Форма с текущим шагом */}
          <form onSubmit={handleFormAction}>
            {renderCurrentStep()}

            {/* Кнопки навигации */}
            <FormNavigation
              currentStep={currentStep}
              totalSteps={TOTAL_STEPS}
              onPrev={prevStep}
              onNext={handleFormAction}
              isSubmitting={isSubmitting}
            />
          </form>
        </CardContent>
      </Card>

      {/* Навигация по шагам */}
      <StepIndicator
        steps={STEPS}
        currentStep={currentStep}
        goToStep={goToStep}
      />
    </>
  )
}
