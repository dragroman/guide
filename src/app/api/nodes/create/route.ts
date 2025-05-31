// pages/api/nodes/create.ts или app/api/nodes/create/route.ts
import { NextRequest, NextResponse } from "next/server"
import { drupal } from "@shared/lib/drupal"

// Маппинг типов узлов к их Drupal machine names
const NODE_TYPE_MAPPING = {
  restaurant: "restaurant",
  hotel: "hotel",
  attraction: "attraction",
} as const

type NodeType = keyof typeof NODE_TYPE_MAPPING

interface CreateNodeRequest {
  nodeType: NodeType
  data: Record<string, any>
}

export async function POST(request: NextRequest) {
  try {
    const { nodeType, data }: CreateNodeRequest = await request.json()

    // Проверяем валидность типа узла
    if (!NODE_TYPE_MAPPING[nodeType]) {
      return NextResponse.json(
        { error: "Неподдерживаемый тип узла" },
        { status: 400 }
      )
    }

    // Создаем параграф с описанием, если оно есть
    let paragraphId = null
    if (data.description) {
      const paragraph = await drupal.createResource("paragraph--text", {
        data: {
          attributes: {
            field_text: {
              value: data.description,
              format: "basic_html",
            },
          },
        },
      })
      paragraphId = paragraph.id
    }

    // Подготавливаем данные для Drupal в правильном формате
    const nodeData = {
      data: {
        attributes: {
          title: data.title,
          status: true,
          ...mapAttributesForDrupal(data, nodeType),
        },
        relationships: mapRelationshipsForDrupal(data, nodeType, paragraphId),
      },
    }

    // Создаем узел через Drupal API
    const node = await drupal.createResource(
      `node--${NODE_TYPE_MAPPING[nodeType]}`,
      nodeData
    )

    return NextResponse.json({
      success: true,
      node: {
        id: node.id,
        title: node.title,
        type: nodeType,
      },
    })
  } catch (error) {
    console.error("Ошибка создания узла:", error)
    return NextResponse.json(
      { error: "Ошибка сервера при создании узла" },
      { status: 500 }
    )
  }
}

// Маппинг атрибутов для разных типов узлов
function mapAttributesForDrupal(data: Record<string, any>, nodeType: NodeType) {
  // Общие атрибуты для всех типов узлов
  const baseAttributes = {
    field_title_zh: data.titleZh || "",
    field_address_zh: data.addressZh || "",
    // Поле body как параграфы
    field_body: data.description
      ? {
          value: data.description,
          format: "basic_html", // или 'full_html' в зависимости от настроек
        }
      : null,
  }

  switch (nodeType) {
    case "restaurant":
      return {
        ...baseAttributes,
        field_phone: data.phone || "",
        field_working_hours: data.workingHours || "",
      }

    case "hotel":
      return {
        ...baseAttributes,
        field_phone: data.phone || "",
        field_rating: data.rating || 0,
      }

    case "attraction":
      return {
        ...baseAttributes,
        field_opening_hours: data.openingHours || "",
      }

    default:
      return baseAttributes
  }
}

// Маппинг связей для разных типов узлов
function mapRelationshipsForDrupal(
  data: Record<string, any>,
  nodeType: NodeType,
  paragraphId?: string | null
) {
  const relationships: Record<string, any> = {}

  // Общие связи для всех типов
  if (data.cityId) {
    relationships.field_city = {
      data: { type: "taxonomy_term--city", id: data.cityId },
    }
  }

  if (data.categoryId) {
    relationships.field_category = {
      data: { type: "taxonomy_term--category", id: data.categoryId },
    }
  }

  // Привязываем созданный параграф с описанием
  if (paragraphId) {
    relationships.field_body = {
      data: {
        type: "paragraph--text",
        id: paragraphId,
      },
    }
  }

  return relationships
}
