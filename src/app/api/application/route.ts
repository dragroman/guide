import { NextRequest, NextResponse } from "next/server"
import { applicationSchema } from "@processes/application/config/schemas/applicationSchema"
import { drupal } from "@shared/lib/drupal"
import { format } from "date-fns"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

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

    // Преобразуем данные в формат, ожидаемый схемой
    const validatedData = applicationSchema.parse({
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

    const drupalResponse = await drupal.createResource(
      "node--application",
      {
        data: {
          attributes: {
            title: body.name + body.trip.daysCount,
            field_name: body.name,
            field_phone: body.contact.phone,
            field_email: body.contact.email,
            field_whatsapp: body.contact.whatsapp,
            field_telegram: body.contact.telegram,
            field_wechat: body.contact.wechat,
            field_people_count: body.peopleCount,
            field_adults: body.ageGroups.adults,
            field_children: body.ageGroups.children,
            field_seniors: body.ageGroups.seniors,
            field_toddlers: body.ageGroups.toddlers,
            field_infants: body.ageGroups.infants,
            field_teens: body.ageGroups.teens,
            field_date_from: validatedData.trip.dateRange?.from
              ? format(
                  new Date(validatedData.trip.dateRange.from),
                  "yyyy-MM-dd'T'HH:mm:ssxxx"
                )
              : "",
            field_date_to: validatedData.trip.dateRange?.to
              ? format(
                  new Date(validatedData.trip.dateRange.to),
                  "yyyy-MM-dd'T'HH:mm:ssxxx"
                )
              : "",
            field_days_count: body.trip.daysCount,
            field_purpose: purposeArray,
            field_purpose_other: body.trip.purpose.options.other
              ? body.trip.purpose.otherDescription
              : "",
            field_accommodation: accommodationArray,
            field_accommodation_other: body.accommodation.options.other
              ? body.accommodation.options.otherDescription
              : "",
            field_need_breakfast: body.accommodation.needBreakfast,
            field_accommodation_preferences: accommodationPreferencesArray,
            field_accommodation_pref_other: body.accommodation.preferences.other
              ? body.accommodation.options.otherDescription
              : "",
            field_cuisines: foodCuisinesArray,
            field_cuisines_other: body.food.cuisine.other
              ? body.food.cuisine.otherDescription
              : "",
            field_food_preferences: foodPreferencesArray,
            field_food_preferences_other: body.food.preferences.other
              ? body.food.preferences.otherDescription
              : "",
            field_transport_transfer: transportTransferArray,
            field_transport_transfer_other: body.transport.transfer.other
              ? body.transport.transfer.otherDescription
              : "",
            field_transport_preferences: transportPreferencesArray,
            field_transport_pref_other: body.transport.preferences.other
              ? body.transport.preferences.otherDescription
              : "",
            field_shopping_budget: shoppingBudgetArray,
            field_shopping_places: shoppingPlacesArray,
            field_shopping_places_other: body.shopping.shoppingPlaces.other
              ? body.shopping.shoppingPlaces.otherDescription
              : "",
            field_shopping_time: shoppingTimeArray,
            field_shopping_special_wishes: body.shopping.specialWishes,
            field_budget: body.budget,
            field_need_visa: body.needVisa,
            field_need_insurance: body.needInsurance,
            field_need_guide: body.needGuide,
            field_expert_email: body.expertEmail,
          },
          relationships: {
            field_cities: {
              data: body.cities.map((cityId: string) => ({
                type: "taxonomy_term--location",
                id: cityId,
              })),
            },
            field_city: {
              data: { type: "taxonomy_term--location", id: body.city },
            },
          },
        },
      },
      { withAuth: false }
    )

    // Проверяем ответ от Drupal
    if (!drupalResponse.ok) {
      const error = await drupalResponse.json()
      throw new Error(error.message || "Ошибка отправки пользователя")
    }

    return await drupalResponse.json()
  } catch (error) {
    console.error("Error creating Drupal user:", error)
    throw new Error("Ошибка создания пользователя в системе")
  }
}
