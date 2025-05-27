export interface RegistrationData {
  email: string
  username: string
  password: string
  firstName?: string
  lastName?: string
}

export interface OtpVerificationData {
  email: string
  otpCode: string
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface OtpSession {
  email: string
  hashedData: string
  expiresAt: number
  attempts: number
  lastResent?: number
}
