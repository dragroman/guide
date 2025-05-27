import { NextRequest, NextResponse } from "next/server"
import {
  registrationSchema,
  otpSchema,
  type ApiResponse,
  createDrupalUser,
} from "@features/auth/sign-up"
import { z } from "zod"
import { otpService } from "@/features/auth/sign-up/server"

export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse>> {
  try {
    const body = await request.json()

    // Validate OTP input
    const { email, otpCode } = otpSchema.parse(body)

    // Validate registration data
    const registrationData = registrationSchema.parse(body)

    // Verify OTP
    await otpService.verifyOtp(email, otpCode, registrationData)

    // Create user in Drupal
    const user = await createDrupalUser(registrationData)

    return NextResponse.json({
      success: true,
      message: "Регистрация успешно завершена",
      data: {
        userId: user.id,
        email: user.email,
        username: user.username,
      },
    })
  } catch (error) {
    console.error("Verify OTP error:", error)

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
      { status: 400 }
    )
  }
}
