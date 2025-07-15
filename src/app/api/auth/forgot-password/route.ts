import { NextRequest, NextResponse } from "next/server"
import { forgotPasswordSchema } from "@features/auth/forgot-password"
import { passwordResetService } from "@features/auth/forgot-password/server"
import { z } from "zod"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = forgotPasswordSchema.parse(body)

    const result = await passwordResetService.sendResetCode(email)

    const { canAttempt, remainingAttempts } =
      await passwordResetService.checkAttempts(email)

    return NextResponse.json({
      success: result.success,
      error: result.error,
      remainingAttempts,
    })
  } catch (error) {
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
        error: "Внутренняя ошибка сервера",
      },
      { status: 500 }
    )
  }
}
