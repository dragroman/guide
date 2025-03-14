import { NextRequest, NextResponse } from "next/server"
import { applicationSchema } from "@/components/application/schemas/applicationSchema"
import { format } from "date-fns"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Проверяем что получены все необходимые данные
    if (!body.name || !body.phone || !body.date_from || !body.date_to) {
      return NextResponse.json(
        { message: "Все обязательные поля должны быть заполнены" },
        { status: 400 }
      )
    }

    console.log(body)

    const tripPurpose = body.tripPurpose || {}
    const accommodation = body.accommodation || {}
    const accommodationPreferences = body.accommodationPreferences || {}

    // Дополнительная валидация с помощью Zod
    try {
      // Преобразуем данные в формат, ожидаемый схемой
      applicationSchema.parse({
        name: body.name,
        phone: body.phone,
        dateRange: {
          from: new Date(body.date_from),
          to: new Date(body.date_to),
        },
        email: body.email,
        daysCount: body.daysCount,
        tripPurpose: body.tripPurpose,
        accommodation: body.accommodation,
        accommodationPreferences: body.accommodationPreferences,
        peopleCount: body.peopleCount,
      })
    } catch (error) {
      if (error instanceof Error) {
        return NextResponse.json({ message: error.message }, { status: 400 })
      }
    }

    const purposeArray = Object.entries(tripPurpose)
      .filter(([key, value]) => key !== "otherDescription" && value === true)
      .map(([key]) => key)

    const accommodationArray = Object.entries(accommodation)
      .filter(([key, value]) => key !== "otherDescription" && value === true)
      .map(([key]) => key)

    const accommodationPreferencesArray = Object.entries(
      accommodationPreferences
    ).map(([key]) => key)

    const drupalResponse = await fetch(
      `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/webform_rest/submit`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          webform_id: "application",
          name: body.name,
          phone: body.phone,
          date_from: body.date_from,
          date_to: body.date_to,
          email: body.email,
          days_count: body.daysCount,
          purpose: purposeArray,
          purpose_other: tripPurpose.other ? tripPurpose.otherDescription : "",
          accommodation: accommodationArray,
          accommodation_other: accommodation.other
            ? accommodation.otherDescription
            : "",
          accommodation_preferences: accommodationPreferencesArray,
          people_count: body.peopleCount,
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
      message: "Заявка успешно отправлена",
    })
  } catch (error) {
    console.error("Ошибка обработки запроса:", error)
    return NextResponse.json(
      { message: "Внутренняя ошибка сервера" },
      { status: 500 }
    )
  }
}
