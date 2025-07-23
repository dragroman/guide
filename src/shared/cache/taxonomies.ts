// cache/taxonomies.ts
import { drupal } from "@shared/lib/drupal"
import { DrupalJsonApiParams } from "drupal-jsonapi-params"

let categoriesCache: Record<string, string> | null = null
let citiesCache: Record<string, string> | null = null
let lastCacheUpdate: number = 0

const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 часа

async function loadCategories(): Promise<Record<string, string>> {
  try {
    const params = new DrupalJsonApiParams()
      .addFilter("status", "1")
      .addFields("taxonomy_term--category", ["name"])
      .addPageLimit(100)

    const categories = await drupal.getResourceCollection(
      "taxonomy_term--category",
      {
        params: params.getQueryObject(),
        cache: "force-cache",
        next: { revalidate: 3600 },
      }
    )

    return categories.reduce(
      (acc, term) => {
        acc[term.id] = term.name
        return acc
      },
      {} as Record<string, string>
    )
  } catch (error) {
    console.error("Ошибка загрузки категорий:", error)
    return {}
  }
}

async function loadCities(): Promise<Record<string, string>> {
  try {
    const params = new DrupalJsonApiParams()
      .addFilter("status", "1")
      .addFields("taxonomy_term--location", ["name"])
      .addPageLimit(100)

    const cities = await drupal.getResourceCollection(
      "taxonomy_term--location",
      {
        params: params.getQueryObject(),
        cache: "force-cache",
        next: { revalidate: 3600 },
      }
    )

    return cities.reduce(
      (acc, term) => {
        acc[term.id] = term.name
        return acc
      },
      {} as Record<string, string>
    )
  } catch (error) {
    console.error("Ошибка загрузки городов:", error)
    return {}
  }
}

async function updateCacheIfNeeded() {
  const now = Date.now()
  if (now - lastCacheUpdate > CACHE_DURATION) {
    const [categories, cities] = await Promise.all([
      loadCategories(),
      loadCities(),
    ])

    categoriesCache = categories
    citiesCache = cities
    lastCacheUpdate = now
  }
}

export async function getCategoryName(id: string): Promise<string> {
  if (!categoriesCache) {
    await updateCacheIfNeeded()
  }
  return categoriesCache?.[id] || id
}

export async function getCityName(id: string): Promise<string> {
  if (!citiesCache) {
    await updateCacheIfNeeded()
  }
  return citiesCache?.[id] || id
}

// Дополнительно: функция для принудительного обновления кеша
export async function refreshCache() {
  lastCacheUpdate = 0
  await updateCacheIfNeeded()
}
