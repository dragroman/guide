import { NextRequest, NextResponse } from "next/server"
import { registrationSchema, type ApiResponse } from "@features/auth/sign-up"
import {
  otpService,
  emailService,
  rateLimiter,
} from "@features/auth/sign-up/server"
import { z } from "zod"

export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse>> {
  try {
    const body = await request.json()

    // Validate registration data
    const validatedData = registrationSchema.parse(body)

    // Check rate limit for resend requests
    const clientIp =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown"

    const canResend = await rateLimiter.checkLimit(
      `resend_otp:${validatedData.email}:${clientIp}`,
      3, // 3 resends per hour
      60 * 60 * 1000
    )

    if (!canResend) {
      const remaining = await rateLimiter.getRemainingAttempts(
        `resend_otp:${validatedData.email}:${clientIp}`,
        3,
        60 * 60 * 1000
      )

      return NextResponse.json(
        {
          success: false,
          error: `Превышен лимит повторной отправки. Попробуйте через час. Осталось попыток: ${remaining}`,
        },
        { status: 429 }
      )
    }

    // Check if OTP session exists and can be resent
    const resendCheck = await otpService.canResendOtp(validatedData.email)

    if (!resendCheck.canResend) {
      if (resendCheck.cooldownRemaining) {
        return NextResponse.json(
          {
            success: false,
            error: `Повторная отправка доступна через ${resendCheck.cooldownRemaining} секунд`,
            data: {
              cooldownRemaining: resendCheck.cooldownRemaining,
            },
          },
          { status: 400 }
        )
      } else {
        return NextResponse.json(
          {
            success: false,
            error:
              "Сессия регистрации не найдена. Начните процесс регистрации заново.",
          },
          { status: 400 }
        )
      }
    }

    // Generate and send new OTP
    const newOtpCode = await otpService.resendOtp(
      validatedData.email,
      validatedData
    )
    await emailService.sendOtpEmail(validatedData.email, newOtpCode, true) // isResend = true

    return NextResponse.json({
      success: true,
      message: "Новый код подтверждения отправлен на ваш email",
      data: {
        email: validatedData.email,
        expiresIn: 600, // 10 minutes
        resendCooldown: 60, // 1 minute cooldown
      },
    })
  } catch (error) {
    console.error("Resend OTP error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: error.errors[0].message,
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Внутренняя ошибка сервера",
      },
      { status: 500 }
    )
  }
}
