// app/api/register/route.ts
import { drupal } from "@shared/lib/drupal"
import { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, username, password } = await request.json()

    if (!email || !username || !password) {
      return Response.json(
        { success: false, message: "Все поля обязательны для заполнения" },
        { status: 400 }
      )
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/user/register?_format=json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: [{ value: username }],
          mail: [{ value: email }],
          pass: [{ value: password }],
        }),
      }
    )

    if (!response.ok) {
      let errorMessage = "Произошла ошибка при регистрации"
      let errorData = null

      try {
        errorData = await response.json()
      } catch (parseError) {
        console.error("Не удалось распарсить ошибку:", parseError)
      }

      switch (response.status) {
        case 400:
          errorMessage =
            "Неверные данные. Проверьте корректность введенной информации"
          if (errorData?.message) {
            errorMessage = errorData.message
          }
          break

        case 403:
          errorMessage = "Регистрация запрещена. Обратитесь к администратору"
          // Возможные причины 403:
          // - Регистрация отключена в Drupal
          // - Нет разрешений на создание аккаунтов
          // - IP заблокирован
          break

        case 409:
          errorMessage = "Пользователь с таким именем или email уже существует"
          break

        case 422:
          errorMessage = "Данные не прошли валидацию"
          if (errorData?.violations) {
            // Обработка детальных ошибок валидации Drupal
            const violations = errorData.violations
              .map((v: any) => v.message)
              .join(", ")
            errorMessage = `Ошибки валидации: ${violations}`
          }
          break

        case 500:
          errorMessage = "Внутренняя ошибка сервера. Попробуйте позже"
          break

        default:
          if (errorData?.message) {
            errorMessage = errorData.message
          }
      }

      return Response.json(
        {
          success: false,
          message: errorMessage,
          details: errorData, // Для отладки (удалите в продакшене)
        },
        { status: response.status }
      )
    }

    const userData = await response.json()

    return Response.json({
      success: true,
      message: "Пользователь успешно зарегистрирован",
      user: {
        id: userData.uid?.[0]?.value,
        name: userData.name?.[0]?.value,
        email: userData.mail?.[0]?.value,
      },
    })
  } catch (error) {
    console.error("Registration error:", error)

    return Response.json(
      {
        success: false,
        message: "Внутренняя ошибка сервера при регистрации",
      },
      { status: 500 }
    )
  }
}
