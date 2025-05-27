import crypto from "crypto"
import { Redis } from "ioredis"
import { rateLimiter } from "../model/rate-limiter"
import type { RegistrationData, OtpSession } from "../model/registration"

class OtpService {
  private redis: Redis
  private readonly OTP_EXPIRY = 10 * 60 * 1000 // 10 minutes
  private readonly MAX_ATTEMPTS = 3
  private readonly RESEND_COOLDOWN = 60 * 1000 // 1 minute

  constructor() {
    this.redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379")
  }

  generateOtp(): string {
    return crypto.randomInt(100000, 999999).toString()
  }

  private hashData(data: RegistrationData): string {
    return crypto
      .createHash("sha256")
      .update(JSON.stringify(data) + process.env.OTP_SALT)
      .digest("hex")
  }

  async createOtpSession(
    email: string,
    registrationData: RegistrationData
  ): Promise<string> {
    // Check rate limit for OTP sending
    const canSend = await rateLimiter.checkLimit(
      `otp_send:${email}`,
      5,
      60 * 60 * 1000
    ) // 5 per hour
    if (!canSend) {
      throw new Error("Превышен лимит отправки OTP. Попробуйте позже.")
    }

    const otp = this.generateOtp()
    const hashedData = this.hashData(registrationData)

    const session: OtpSession = {
      email,
      hashedData,
      expiresAt: Date.now() + this.OTP_EXPIRY,
      attempts: 0,
    }

    // Store session and OTP separately for security
    await this.redis.setex(`otp_session:${email}`, 600, JSON.stringify(session))
    await this.redis.setex(`otp_code:${email}`, 600, otp)

    return otp
  }

  async verifyOtp(
    email: string,
    otpCode: string,
    registrationData: RegistrationData
  ): Promise<boolean> {
    const sessionData = await this.redis.get(`otp_session:${email}`)
    const storedOtp = await this.redis.get(`otp_code:${email}`)

    if (!sessionData || !storedOtp) {
      throw new Error("OTP код не найден или истек")
    }

    const session: OtpSession = JSON.parse(sessionData)

    // Check expiry
    if (Date.now() > session.expiresAt) {
      await this.cleanup(email)
      throw new Error("OTP код истек")
    }

    // Check attempts
    if (session.attempts >= this.MAX_ATTEMPTS) {
      await this.cleanup(email)
      throw new Error("Превышено количество попыток. Запросите новый код.")
    }

    // Increment attempts
    session.attempts++
    await this.redis.setex(`otp_session:${email}`, 600, JSON.stringify(session))

    // Verify OTP
    if (otpCode !== storedOtp) {
      const remaining = this.MAX_ATTEMPTS - session.attempts
      throw new Error(`Неверный OTP код. Осталось попыток: ${remaining}`)
    }

    // Verify data integrity
    const expectedHash = this.hashData(registrationData)
    if (session.hashedData !== expectedHash) {
      await this.cleanup(email)
      throw new Error("Данные регистрации были изменены. Начните заново.")
    }

    await this.cleanup(email)
    return true
  }

  async canResendOtp(
    email: string
  ): Promise<{ canResend: boolean; cooldownRemaining?: number }> {
    const sessionData = await this.redis.get(`otp_session:${email}`)
    if (!sessionData) {
      return { canResend: false }
    }

    const session: OtpSession = JSON.parse(sessionData)
    if (!session.lastResent) {
      return { canResend: true }
    }

    const timeSinceLastResend = Date.now() - session.lastResent
    if (timeSinceLastResend < this.RESEND_COOLDOWN) {
      return {
        canResend: false,
        cooldownRemaining: Math.ceil(
          (this.RESEND_COOLDOWN - timeSinceLastResend) / 1000
        ),
      }
    }

    return { canResend: true }
  }

  async resendOtp(
    email: string,
    registrationData: RegistrationData
  ): Promise<string> {
    const resendCheck = await this.canResendOtp(email)
    if (!resendCheck.canResend) {
      throw new Error(
        `Повторная отправка доступна через ${resendCheck.cooldownRemaining} секунд`
      )
    }

    // Check rate limit
    const canSend = await rateLimiter.checkLimit(
      `otp_resend:${email}`,
      3,
      60 * 60 * 1000
    ) // 3 per hour
    if (!canSend) {
      throw new Error("Превышен лимит повторной отправки OTP")
    }

    const sessionData = await this.redis.get(`otp_session:${email}`)
    if (!sessionData) {
      throw new Error("Сессия не найдена. Начните регистрацию заново.")
    }

    const session: OtpSession = JSON.parse(sessionData)
    session.lastResent = Date.now()
    session.attempts = 0 // Reset attempts on resend

    const newOtp = this.generateOtp()

    await this.redis.setex(`otp_session:${email}`, 600, JSON.stringify(session))
    await this.redis.setex(`otp_code:${email}`, 600, newOtp)

    return newOtp
  }

  private async cleanup(email: string): Promise<void> {
    await this.redis.del(`otp_session:${email}`)
    await this.redis.del(`otp_code:${email}`)
  }

  async getSessionInfo(email: string): Promise<{
    expiresAt: number
    attempts: number
    maxAttempts: number
  } | null> {
    const sessionData = await this.redis.get(`otp_session:${email}`)
    if (!sessionData) return null

    const session: OtpSession = JSON.parse(sessionData)
    return {
      expiresAt: session.expiresAt,
      attempts: session.attempts,
      maxAttempts: this.MAX_ATTEMPTS,
    }
  }
}

export const otpService = new OtpService()
