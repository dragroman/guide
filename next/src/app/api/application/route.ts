import { NextRequest, NextResponse } from "next/server"
import { applicationSchema } from "@/components/application/schemas/applicationSchema"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("Полученные данные API:", body)

    // Проверяем что получены все необходимые данные
    if (
      !body.name ||
      !(
        body.contact.phone ||
        body.contact.email ||
        body.contact.wechat ||
        body.contact.telegram ||
        body.contact.whatsapp
      ) ||
      !body.trip.dateRange.from ||
      !body.trip.dateRange.to
    ) {
      return NextResponse.json(
        { message: "Все обязательные поля должны быть заполнены" },
        { status: 400 }
      )
    }

    const expertEmail =
      body.expertEmail || request.nextUrl.searchParams.get("email") || ""

    // Дополнительная валидация с помощью Zod
    try {
      // Преобразуем данные в формат, ожидаемый схемой
      applicationSchema.parse({
        name: body.name,
        peopleCount: body.peopleCount,
        ageGroups: body.ageGroups,
        contact: body.contact,
        trip: {
          dateRange: {
            from: new Date(body.trip.dateRange.from),
            to: new Date(body.trip.dateRange.to),
          },
          daysCount: body.trip.daysCount,
          purpose: body.trip.purpose,
        },
        accommodation: body.accommodation,
        transport: body.transport,
        food: body.food,
        shopping: body.shopping,
        budget: body.budget,
        needVisa: body.needVisa,
        needInsurance: body.needInsurance,
        needGuide: body.needGuide,
        expert_email: expertEmail,
        city: body.city,
        cityInternalId: body.cityInternalId,
        cities: body.cities,
        citiesInternalIds: body.citiesInternalIds,
      })
    } catch (error) {
      if (error instanceof Error) {
        return NextResponse.json({ message: error.message }, { status: 400 })
      }
    }

    const citiesArray = Object.entries(body.citiesInternalIds).map(
      ([key, value]) => value
    )

    const purposeArray = Object.entries(body.trip.purpose.options)
      .filter(([key, value]) => key !== "otherDescription" && value === true)
      .map(([key]) => key)

    const accommodationArray = Object.entries(body.accommodation.options)
      .filter(([key, value]) => key !== "otherDescription" && value === true)
      .map(([key]) => key)

    const accommodationPreferencesArray = Object.entries(
      body.accommodation.preferences
    )
      .filter(([key, value]) => key !== "otherDescription" && value === true)
      .map(([key]) => key)

    const foodPreferencesArray = Object.entries(body.food.preferences)
      .filter(([key, value]) => key !== "otherDescription" && value === true)
      .map(([key]) => key)

    const foodCuisinesArray = Object.entries(body.food.cuisine)
      .filter(([key, value]) => key !== "otherDescription" && value === true)
      .map(([key]) => key)

    const transportTransferArray = Object.entries(body.transport.transfer)
      .filter(([key, value]) => key !== "otherDescription" && value === true)
      .map(([key]) => key)

    const transportPreferencesArray = Object.entries(body.transport.preferences)
      .filter(([key, value]) => key !== "otherDescription" && value === true)
      .map(([key]) => key)

    const shoppingBudgetArray =
      Object.entries(body.shopping.budget).find(
        ([_, value]) => value === true
      )?.[0] || ""

    const shoppingPlacesArray = Object.entries(body.shopping.shoppingPlaces)
      .filter(([key, value]) => key !== "otherDescription" && value === true)
      .map(([key]) => key)

    const shoppingTimeArray =
      Object.entries(body.shopping.shoppingTime).find(
        ([_, value]) => value === true
      )?.[0] || ""

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
          phone: body.contact.phone,
          email: body.contact.email,
          whatsapp: body.contact.whatsapp,
          telegram: body.contact.telegram,
          wechat: body.contact.wechat,
          people_count: body.peopleCount,
          adults: body.ageGroups.adults,
          children: body.ageGroups.children,
          seniors: body.ageGroups.seniors,
          toddlers: body.ageGroups.toddlers,
          infants: body.ageGroups.infants,
          teens: body.ageGroups.teens,
          date_from: body.trip.dateRange.from,
          date_to: body.trip.dateRange.to,
          days_count: body.trip.daysCount,
          purpose: purposeArray,
          purpose_other: body.trip.purpose.options.other
            ? body.trip.purpose.otherDescription
            : "",
          accommodation: accommodationArray,
          accommodation_other: body.accommodation.options.other
            ? body.accommodation.options.otherDescription
            : "",
          accommodation_need_breakfast: body.accommodation.needBreakfast,
          accommodation_preferences: accommodationPreferencesArray,
          accommodation_preferences_other: body.accommodation.preferences.other
            ? body.accommodation.options.otherDescription
            : "",
          cuisines: foodCuisinesArray,
          cuisines_other: body.food.cuisine.other
            ? body.food.cuisine.otherDescription
            : "",
          food_preferences: foodPreferencesArray,
          food_preferences_other: body.food.preferences.other
            ? body.food.preferences.otherDescription
            : "",
          transport_transfer: transportTransferArray,
          transport_transfer_other: body.transport.transfer.other
            ? body.transport.transfer.otherDescription
            : "",
          transport_preferences: transportPreferencesArray,
          transport_preferences_other: body.transport.preferences.other
            ? body.transport.preferences.otherDescription
            : "",
          shopping_budget: shoppingBudgetArray,
          shopping_places: shoppingPlacesArray,
          shopping_places_other: body.shopping.shoppingPlaces.other
            ? body.shopping.shoppingPlaces.otherDescription
            : "",
          shopping_time: shoppingTimeArray,
          shopping_special_wishes: body.shopping.specialWishes,
          budget: body.budget,
          need_visa: body.needVisa,
          need_insurance: body.needInsurance,
          need_guide: body.needGuide,
          expert_email: body.expertEmail,
          city: body.cityInternalId,
          cities: citiesArray,
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
