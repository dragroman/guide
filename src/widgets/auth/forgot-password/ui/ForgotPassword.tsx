"use client"

import {
  EmailForm,
  ResetPasswordForm,
  ForgotPasswordSuccess,
  useForgotPassword,
} from "@features/auth/forgot-password"
import { OtpForm } from "@features/auth/sign-up"

export const ForgotPassword = () => {
  const {
    step,
    isLoading,
    error,
    email,
    remainingAttempts,
    requestPasswordReset,
    verifyOtp,
    resetPassword,
    resendOtp,
    goBack,
  } = useForgotPassword()

  return (
    <div className="w-full max-w-md mx-auto">
      {step === "email" && (
        <EmailForm
          onSubmit={requestPasswordReset}
          isLoading={isLoading}
          error={error}
          remainingAttempts={remainingAttempts}
        />
      )}

      {step === "otp" && (
        <OtpForm
          email={email}
          onSubmit={verifyOtp}
          onResend={resendOtp}
          onBack={goBack}
          isLoading={isLoading}
          error={error}
          otpInfo={null} // Можно добавить информацию о таймере
        />
      )}

      {step === "reset" && (
        <ResetPasswordForm
          email={email}
          onSubmit={resetPassword}
          isLoading={isLoading}
          error={error}
        />
      )}

      {step === "success" && <ForgotPasswordSuccess />}
    </div>
  )
}
