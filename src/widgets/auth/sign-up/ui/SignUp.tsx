"use client"
import {
  OtpForm,
  SignUpForm,
  SuccessScreen,
  useRegistration,
} from "@features/auth/sign-up"

export const SignUp = () => {
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
        <SignUpForm onSubmit={sendOtp} isLoading={isLoading} error={error} />
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
