import { NextRequest, NextResponse } from "next/server"
import { passwordResetService } from "@features/auth/forgot-password/server"

export async function POST(request: NextRequest) {
  try {
    const { email, otpCode } = await request.json()

    const isValid = await passwordResetService.verifyResetOtp(email, otpCode)

    if (isValid) {
      return NextResponse.json({
        success: true,
        message: "Код подтвержден",
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "Неверный или истекший код",
        },
        { status: 400 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Внутренняя ошибка сервера",
      },
      { status: 500 }
    )
  }
}
