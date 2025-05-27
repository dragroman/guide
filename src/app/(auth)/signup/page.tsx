"use client"

import {
  useRegistration,
  RegistrationForm,
  OtpForm,
  SuccessScreen,
} from "@features/auth/sign-up"
import { Toaster } from "sonner"

export default function RegisterPage() {
  const {
    step,
    isLoading,
    error,
    registrationData,
    otpInfo,
    sendOtp,
    verifyOtp,
    resendOtp,
    goBack,
  } = useRegistration()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="w-full max-w-md">
        {step === "form" && (
          <RegistrationForm
            onSubmit={sendOtp}
            isLoading={isLoading}
            error={error}
          />
        )}

        {step === "otp" && registrationData && (
          <OtpForm
            email={registrationData.email}
            onSubmit={verifyOtp}
            onResend={resendOtp}
            onBack={goBack}
            isLoading={isLoading}
            error={error}
            otpInfo={otpInfo}
          />
        )}

        {step === "success" && registrationData && (
          <SuccessScreen email={registrationData.email} />
        )}
      </div>
    </div>
  )
}
