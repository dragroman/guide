import { NextRequest, NextResponse } from "next/server"
import { otpService } from "@features/auth/sign-up/server"
import type { ApiResponse } from "@features/auth/sign-up"

export async function GET(
  request: NextRequest
): Promise<NextResponse<ApiResponse>> {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get("email")

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          error: "Email параметр обязателен",
        },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          error: "Неверный формат email",
        },
        { status: 400 }
      )
    }

    // Get session info
    const sessionInfo = await otpService.getSessionInfo(email)

    if (!sessionInfo) {
      return NextResponse.json(
        {
          success: false,
          error: "Сессия OTP не найдена",
        },
        { status: 404 }
      )
    }

    // Check if can resend
    const resendCheck = await otpService.canResendOtp(email)

    return NextResponse.json({
      success: true,
      data: {
        expiresAt: sessionInfo.expiresAt,
        attempts: sessionInfo.attempts,
        maxAttempts: sessionInfo.maxAttempts,
        canResend: resendCheck.canResend,
        resendCooldown: resendCheck.cooldownRemaining || 0,
        timeRemaining: Math.max(0, sessionInfo.expiresAt - Date.now()),
      },
    })
  } catch (error) {
    console.error("Get OTP info error:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Внутренняя ошибка сервера",
      },
      { status: 500 }
    )
  }
}
