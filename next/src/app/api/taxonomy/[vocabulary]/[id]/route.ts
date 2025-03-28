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
    const params: Record<string, any> = {}

    params[`fields[taxonomy_term--${vocabulary}]`] =
      "name,path,description,weight,changed"

    // Получаем один термин таксономии по ID
    const term = await drupal.getResource(resourceType, id, {
      params,
      cache: "force-cache",
      next: {
        revalidate: 3600, // Кешируем на 1 час
      },
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
      weight: term.weight || 0,
      changed: term.changed || null,
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
