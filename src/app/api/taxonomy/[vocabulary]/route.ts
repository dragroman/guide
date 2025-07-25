// src/app/api/taxonomy/[vocabulary]/route.ts
import { NextRequest, NextResponse } from "next/server"
import { drupal } from "@shared/lib/drupal"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ vocabulary: string }> }
) {
  const { vocabulary } = await params
  const searchParams = request.nextUrl.searchParams

  // Получаем параметры запроса
  const search = searchParams.get("search") || ""
  const limit = parseInt(searchParams.get("limit") || "50", 10)
  const page = parseInt(searchParams.get("page") || "0", 10)

  try {
    const resourceType = `taxonomy_term--${vocabulary}`

    // Формируем параметры запроса к Drupal JSON API
    const apiParams: Record<string, any> = {
      "filter[status]": 1,
      sort: "weight",
      "page[limit]": limit,
      "page[offset]": page * limit,
    }

    // Добавляем поля как отдельный параметр (решение проблемы с синтаксисом)
    apiParams[`fields[taxonomy_term--${vocabulary}]`] =
      "name,path,description,weight,changed,drupal_internal__tid,field_select_text,field_title_cn"

    // Добавляем поиск, если указан
    if (search && search.length >= 2) {
      apiParams["filter[name][operator]"] = "CONTAINS"
      apiParams["filter[name][value]"] = search
    }

    // Выполняем запрос к API Drupal
    const data = await drupal.getResourceCollection<any[]>(resourceType, {
      params: apiParams,
      cache: search ? "no-store" : "force-cache",
      next: {
        revalidate: search ? 0 : 3600,
      },
    })

    // Преобразуем данные в нужный формат
    const terms = (data || []).map((item) => ({
      id: item.id,
      name: item.name,
      path: item.path?.alias,
      description: item.description?.value || null,
      weight: item.weight || 0,
      changed: item.changed || null,
      field_select_text: item.field_select_text?.value || null,
      drupal_internal__tid: item.drupal_internal__tid,
      field_title_cn: item.field_title_cn?.value || null,
      field_image: item.field_image
        ? {
            url: item.field_image.uri?.url,
            width: item.field_image.resourceIdObjMeta?.width,
            title: item.field_image.resourceIdObjMeta?.title,
          }
        : null,
    }))

    return NextResponse.json({
      data: terms,
      meta: {
        total: data?.length || 0,
        page,
        limit,
      },
    })
  } catch (error) {
    console.error(
      `Ошибка при получении терминов таксономии ${vocabulary}:`,
      error
    )

    return NextResponse.json(
      {
        error: "Не удалось получить термины таксономии",
        message: error instanceof Error ? error.message : "Неизвестная ошибка",
      },
      { status: 500 }
    )
  }
}
