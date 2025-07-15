import { NextRequest, NextResponse } from "next/server"
import { passwordResetService } from "@features/auth/forgot-password/server"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    const result = await passwordResetService.resetPassword(email, password)

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: "Пароль успешно изменен",
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
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
