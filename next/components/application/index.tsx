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
import { useFormManagement } from "./hooks"

// Компоненты шагов
import { StepPersonalInfo } from "./steps/Step1"
import { StepContactInfo } from "./steps/Step2"
import { StepTripPurpose } from "./steps/Step3"
import { StepAccommodation } from "./steps/Step4"
import { StepConfirmation } from "./steps/stepFinal"

// Вспомогательные компоненты
import { SuccessView } from "./components/SuccessView"
import { DraftNotice } from "./components/DraftNotice"
import { ProgressIndicator } from "./components/ProgressIndicator"
import { StepIndicator } from "./components/StepIndicator"
import { FormNavigation } from "./components/FormNavigation"

export default function MultistepForm() {
  const {
    state,
    formData,
    currentStep,
    errors,
    isSubmitting,
    isSuccess,
    isError,
    errorMessage,
    hasDraft,
    progress,
    updateFormData,
    handleChange,
    handleDateChange,
    handlePurposeChange,
    handlePurposeTextChange,
    handleAccommodationChange,
    handleAccommodationTextChange,
    handlePreferenceChange,
    handlePreferenceTextChange,
    nextStep,
    prevStep,
    goToStep,
    handleSubmit,
    resetForm,
    loadSavedDraft,
    ignoreDraft,
  } = useFormManagement()

  // Если форма успешно отправлена, показываем экран успеха
  if (isSuccess) {
    return <SuccessView onReset={resetForm} />
  }

  // Функция для рендеринга текущего шага
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <StepPersonalInfo
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            updateFormData={updateFormData}
          />
        )
      case 1:
        return (
          <StepContactInfo
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            updateFormData={updateFormData}
          />
        )
      case 2:
        return (
          <div>
            <StepTripPurpose
              formData={formData}
              errors={errors}
              handleChange={handleChange}
              updateFormData={updateFormData}
              handlePurposeChange={handlePurposeChange}
              handlePurposeTextChange={handlePurposeTextChange}
              handleDateChange={handleDateChange}
            />
          </div>
        )
      case 3:
        return (
          <StepAccommodation
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            updateFormData={updateFormData}
            handleAccommodationChange={handleAccommodationChange}
            handleAccommodationTextChange={handleAccommodationTextChange}
            handlePreferenceChange={handlePreferenceChange}
            handlePreferenceTextChange={handlePreferenceTextChange}
          />
        )
      case 4:
        return (
          <StepConfirmation
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            updateFormData={updateFormData}
          />
        )
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
          {isError && (
            <Alert variant="destructive" className="mb-6">
              <AlertTitle>Ошибка</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          {/* Содержимое текущего шага */}
          {renderCurrentStep()}

          {/* Кнопки навигации */}
          <FormNavigation
            currentStep={currentStep}
            totalSteps={TOTAL_STEPS}
            onPrev={prevStep}
            onNext={nextStep}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </CardContent>
      </Card>
      {/* Навигация по шагам */}
      <StepIndicator
        steps={STEPS}
        currentStep={currentStep}
        goToStep={goToStep}
      />
      {/* Предупреждение о наличии черновика */}
      {hasDraft && (
        <div className="max-w-md mx-auto">
          <DraftNotice onLoad={loadSavedDraft} onIgnore={ignoreDraft} />
        </div>
      )}
    </>
  )
}
