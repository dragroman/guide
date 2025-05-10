import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Базовая валидация
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { message: "Все поля должны быть заполнены" },
        { status: 400 }
      )
    }

    // Проверка формата email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { message: "Пожалуйста, введите корректный email адрес" },
        { status: 400 }
      )
    }

    // Формируем запрос к Drupal
    const drupalResponse = await fetch(
      `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/webform_rest/submit`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          webform_id: "contact",
          name: body.name,
          email: body.email,
          message: body.message,
        }),
      }
    )

    // Проверяем ответ от Drupal
    if (!drupalResponse.ok) {
      const errorData = await drupalResponse.json()
      return NextResponse.json(
        { message: errorData.message || "Ошибка при отправке формы" },
        { status: drupalResponse.status }
      )
    }

    const data = await drupalResponse.json()
    return NextResponse.json({
      success: true,
      message: "Форма успешно отправлена",
    })
  } catch (error) {
    console.error("Ошибка обработки запроса:", error)
    return NextResponse.json(
      { message: "Внутренняя ошибка сервера" },
      { status: 500 }
    )
  }
}
