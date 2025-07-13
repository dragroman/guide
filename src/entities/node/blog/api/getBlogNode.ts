import { drupal } from "@shared/lib/drupal"
import { DrupalJsonApiParams } from "drupal-jsonapi-params"
import { TNodeBlog } from "../model/types"

export const getBlogNode = async (id: string) => {
  try {
    // Переводим путь для получения информации о сущности (entity)
    const translatedPath = await drupal.translatePath(`/blog/${id}`)

    if (!translatedPath) {
      return null
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
        "field_cover",
      ])
      .addInclude([
        "field_body",
        "field_body.field_image.field_media_image",
        "field_cover.field_media_image",
        "uid",
      ])

    // Получаем данные статьи с настройками кэширования
    const node = await drupal.getResource<TNodeBlog>(type!, uuid!, {
      params: request.getQueryObject(),
      cache: "force-cache",
      next: {
        tags: [tag],
        revalidate: 3600,
      },
    })

    return node
  } catch (error) {
    console.error("Ошибка при получении данных статьи:", error)
    return null
  }
}
