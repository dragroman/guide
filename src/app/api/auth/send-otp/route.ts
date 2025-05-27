import { NextRequest, NextResponse } from "next/server"
import {
  registrationSchema,
  type ApiResponse,
  checkUserExists,
} from "@features/auth/sign-up"
import { z } from "zod"
import { emailService, otpService } from "@features/auth/sign-up/server"

export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse>> {
  try {
    const body = await request.json()

    // Validate input
    const validatedData = registrationSchema.parse(body)

    // Check if user already exists (call to Drupal)
    const userExists = await checkUserExists(
      validatedData.email,
      validatedData.username
    )
    if (userExists.exists) {
      return NextResponse.json(
        {
          success: false,
          error: `Пользователь с таким ${userExists.field} уже существует`,
        },
        { status: 400 }
      )
    }

    // Generate and send OTP
    const otpCode = await otpService.createOtpSession(
      validatedData.email,
      validatedData
    )

    // await emailService.sendOtpEmail(validatedData.email, otpCode)

    console.log("OTP sent:", otpCode)

    return NextResponse.json({
      success: true,
      message: "Код подтверждения отправлен на ваш email",
      data: {
        email: validatedData.email,
        expiresIn: 600, // 10 minutes
      },
    })
  } catch (error) {
    console.error("Send OTP error:", error)

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
