import { Redis } from "ioredis"
import { otpService } from "@features/auth/sign-up/server"
import { emailService } from "@features/auth/sign-up/server"
import { checkUserExists } from "@features/auth/sign-up/server"
import { rateLimiter } from "@features/auth/sign-up/server"
import type { ForgotPasswordSession } from "../model/types"
import { drupal } from "@shared/lib/drupal"

class PasswordResetService {
  private redis: Redis
  private readonly MAX_ATTEMPTS = 5
  private readonly BLOCK_DURATION = 30 * 60 * 1000 // 30 минут

  constructor() {
    this.redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379")
  }

  async checkAttempts(
    email: string
  ): Promise<{ canAttempt: boolean; remainingAttempts: number }> {
    const sessionKey = `forgot_password:${email}`
    const sessionData = await this.redis.get(sessionKey)

    if (!sessionData) {
      return { canAttempt: true, remainingAttempts: this.MAX_ATTEMPTS }
    }

    const session: ForgotPasswordSession = JSON.parse(sessionData)

    // Проверяем блокировку
    if (session.blockedUntil && Date.now() < session.blockedUntil) {
      return { canAttempt: false, remainingAttempts: 0 }
    }

    // Сбрасываем блокировку, если время истекло
    if (session.blockedUntil && Date.now() >= session.blockedUntil) {
      session.attempts = 0
      session.blockedUntil = undefined
      await this.redis.setex(sessionKey, 3600, JSON.stringify(session))
    }

    return {
      canAttempt: session.attempts < this.MAX_ATTEMPTS,
      remainingAttempts: this.MAX_ATTEMPTS - session.attempts,
    }
  }

  async incrementAttempts(email: string): Promise<void> {
    const sessionKey = `forgot_password:${email}`
    const sessionData = await this.redis.get(sessionKey)

    let session: ForgotPasswordSession = sessionData
      ? JSON.parse(sessionData)
      : { email, attempts: 0 }

    session.attempts++

    // Блокируем после MAX_ATTEMPTS попыток
    if (session.attempts >= this.MAX_ATTEMPTS) {
      session.blockedUntil = Date.now() + this.BLOCK_DURATION
    }

    await this.redis.setex(sessionKey, 3600, JSON.stringify(session))
  }

  async sendResetCode(
    email: string
  ): Promise<{ success: boolean; error?: string }> {
    // Проверяем попытки
    const { canAttempt, remainingAttempts } = await this.checkAttempts(email)

    if (!canAttempt) {
      return {
        success: false,
        error: "Превышено количество попыток. Попробуйте через 30 минут.",
      }
    }

    // Проверяем rate limit
    const canSend = await rateLimiter.checkLimit(
      `password_reset:${email}`,
      3,
      60 * 60 * 1000 // 3 раза в час
    )

    if (!canSend) {
      return {
        success: false,
        error: "Слишком много запросов. Попробуйте позже.",
      }
    }

    // Проверяем существование пользователя
    const userExists = await checkUserExists(email)

    if (!userExists.exists) {
      // Увеличиваем счетчик попыток даже для несуществующих пользователей
      await this.incrementAttempts(email)
      return {
        success: false,
        error: `Email не найден. Осталось попыток: ${remainingAttempts - 1}`,
      }
    }

    // Генерируем и отправляем OTP
    const otpCode = otpService.generateOtp()

    // Сохраняем OTP для восстановления пароля
    await this.redis.setex(`password_reset_otp:${email}`, 600, otpCode)

    // Отправляем email
    await this.sendPasswordResetEmail(email, otpCode)

    return { success: true }
  }

  private async sendPasswordResetEmail(
    email: string,
    otpCode: string
  ): Promise<void> {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Восстановление пароля</h2>
        <p>Вы запросили восстановление пароля. Ваш код подтверждения:</p>
        <div style="background: #f5f5f5; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; margin: 20px 0;">
          ${otpCode}
        </div>
        <p style="color: #666;">
          Код действителен в течение 10 минут.<br>
          Если вы не запрашивали восстановление пароля, просто проигнорируйте это письмо.
        </p>
      </div>
    `

    await emailService.transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: email,
      subject: "Восстановление пароля",
      html: htmlContent,
    })
  }

  async verifyResetOtp(email: string, otpCode: string): Promise<boolean> {
    const storedOtp = await this.redis.get(`password_reset_otp:${email}`)

    if (!storedOtp || storedOtp !== otpCode) {
      return false
    }

    // Удаляем использованный OTP
    await this.redis.del(`password_reset_otp:${email}`)

    // Создаем временный токен для сброса пароля
    const resetToken = crypto.randomUUID()
    await this.redis.setex(`password_reset_token:${resetToken}`, 1800, email) // 30 минут

    return true
  }

  async resetPassword(
    email: string,
    newPassword: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      // Сначала находим пользователя по email
      const users = await drupal.getResourceCollection<any[]>("user--user", {
        params: {
          "filter[mail]": email,
        },
        withAuth: true, // Требуется авторизация для работы с пользователями
      })

      if (!users || users.length === 0) {
        return {
          success: false,
          error: "Пользователь не найден",
        }
      }

      const user = users[0]

      // Обновляем пароль пользователя
      await drupal.updateResource(
        "user--user",
        user.id,
        {
          data: {
            attributes: {
              pass: newPassword,
            },
          },
        },
        {
          withAuth: true, // Обязательно нужна авторизация
        }
      )

      // Очищаем все сессии восстановления
      await this.redis.del(`forgot_password:${email}`)

      return { success: true }
    } catch (error) {
      console.error("Ошибка обновления пароля:", error)
      return {
        success: false,
        error: "Ошибка обновления пароля. Попробуйте позже.",
      }
    }
  }
}

export const passwordResetService = new PasswordResetService()
