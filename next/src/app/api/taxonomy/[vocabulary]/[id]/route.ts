// src/app/api/taxonomy/[vocabulary]/[id]/route.ts
import { NextRequest, NextResponse } from "next/server"
import { drupal } from "@/lib/drupal"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ vocabulary: string; id: string }> }
) {
  const { vocabulary, id } = await params

  try {
    const resourceType = `taxonomy_term--${vocabulary}`
    const apiParams: Record<string, any> = {
      include: "field_image",
    }

    apiParams[`fields[taxonomy_term--${vocabulary}]`] =
      "name,path,description,field_image,field_select_text,drupal_internal__tid"

    // Получаем один термин таксономии по ID
    const term = await drupal.getResource(resourceType, id, {
      params: apiParams,
    })

    if (!term) {
      return NextResponse.json({ error: "Термин не найден" }, { status: 404 })
    }

    // Преобразуем данные в нужный формат
    const formattedTerm = {
      id: term.id,
      name: term.name,
      path: term.path?.alias || null,
      description: term.description?.value || null,
      field_select_text: term.field_select_text || null,
      weight: term.weight || 0,
      changed: term.changed || null,
      drupal_internal__tid: term.drupal_internal__tid,
      field_image: term.field_image
        ? {
            url: term.field_image.uri?.url,
            width: term.field_image.resourceIdObjMeta?.width,
            height: term.field_image.resourceIdObjMeta?.height,
            alt: term.field_image.resourceIdObjMeta?.alt,
            title: term.field_image.resourceIdObjMeta?.title,
          }
        : null,
    }

    return NextResponse.json({
      data: formattedTerm,
    })
  } catch (error) {
    console.error(
      `Ошибка при получении термина таксономии ${vocabulary}/${id}:`,
      error
    )

    return NextResponse.json(
      {
        error: "Не удалось получить термин таксономии",
        message: error instanceof Error ? error.message : "Неизвестная ошибка",
      },
      { status: 500 }
    )
  }
}
