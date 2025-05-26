import { BlogFull } from "@entities/node/blog"
import { drupal } from "@shared/lib/drupal"
import { DrupalNode } from "next-drupal"
import { DrupalJsonApiParams } from "drupal-jsonapi-params"
import { notFound } from "next/navigation"

export async function generateStaticParams() {
  const resources =
    await drupal.getResourceCollectionPathSegments("node--article")

  return resources
    .filter((resource) => resource.segments.length >= 1)
    .map((resource) => ({
      id: resource.segments[resource.segments.length - 1],
    }))
}

export default async function BlogFullPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  try {
    // Переводим путь для получения информации о сущности (entity)
    const translatedPath = await drupal.translatePath(`/blog/${id}`)

    if (!translatedPath) {
      return notFound()
    }

    // Получаем тип ресурса и UUID для запроса
    const type = translatedPath.jsonapi?.resourceName
    const uuid = translatedPath.entity.uuid

    // Создаем тег кэширования в формате `entity_type:entity_id`
    const tag = `${translatedPath.entity.type}:${translatedPath.entity.id}`

    // Подготавливаем параметры запроса API
    const request = new DrupalJsonApiParams()
      .addFields("node--article", [
        "title",
        "path",
        "field_body",
        "uid",
        "created",
      ])
      .addInclude(["field_body", "field_body.field_image.field_media_image"])

    // Получаем данные статьи с настройками кэширования
    const node = await drupal.getResource<DrupalNode>(type!, uuid!, {
      params: request.getQueryObject(),
      cache: "force-cache",
      next: {
        tags: [tag],
        revalidate: 3600,
      },
    })

    if (!node) {
      return notFound()
    }

    return <BlogFull node={node} />
  } catch (error) {
    console.error("Ошибка при получении данных статьи:", error)
    return notFound()
  }
}
