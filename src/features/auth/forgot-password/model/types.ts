export interface ForgotPasswordData {
  email: string
}

export interface ResetPasswordData {
  email: string
  password: string
  confirmPassword: string
}

export interface ForgotPasswordSession {
  email: string
  attempts: number
  blockedUntil?: number
}
