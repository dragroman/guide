import { useCallback } from "react"

// src/hooks/useGtmEvents.ts
export const useGtmEvents = () => {
  const trackFormStep = useCallback((stepNumber: number, stepName: string) => {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "form_step",
        formName: "application_form",
        stepNumber,
        stepName,
        formProgress: Math.floor(((stepNumber + 1) / 9) * 100),
      })
    }
  }, [])

  const trackFormSubmit = useCallback((success: boolean) => {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "form_submit",
        formName: "application_form",
        success,
      })
    }
  }, [])

  return { trackFormStep, trackFormSubmit }
}
