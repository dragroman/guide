"use client"

import {
  useRegistration,
  RegistrationForm,
  OtpForm,
  SuccessScreen,
} from "@features/auth/sign-up"

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
    <>
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
    </>
  )
}
