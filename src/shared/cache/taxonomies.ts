"use server"
import { unstable_cache } from "next/cache"
import { drupal } from "@shared/lib/drupal"
import { DrupalJsonApiParams } from "drupal-jsonapi-params"

async function fetchCities(): Promise<Record<string, string>> {
  const params = new DrupalJsonApiParams()
    .addFilter("status", "1")
    .addFields("taxonomy_term--location", ["name"])
    .addPageLimit(100)

  const cities = await drupal.getResourceCollection("taxonomy_term--location", {
    params: params.getQueryObject(),
  })

  return cities.reduce(
    (acc, term) => {
      acc[term.id] = term.name
      return acc
    },
    {} as Record<string, string>
  )
}

async function fetchCategories(): Promise<Record<string, string>> {
  const params = new DrupalJsonApiParams()
    .addFilter("status", "1")
    .addFields("taxonomy_term--category", ["name"])
    .addPageLimit(100)

  const categories = await drupal.getResourceCollection(
    "taxonomy_term--category",
    {
      params: params.getQueryObject(),
    }
  )

  return categories.reduce(
    (acc, term) => {
      acc[term.id] = term.name
      return acc
    },
    {} as Record<string, string>
  )
}

// Кэшированные функции
export const getCities = unstable_cache(fetchCities, ["cities"], {
  revalidate: 3600,
  tags: ["taxonomies", "cities"],
})

export const getCategories = unstable_cache(fetchCategories, ["categories"], {
  revalidate: 3600,
  tags: ["taxonomies", "categories"],
})

// Хелперы для получения конкретных названий
export async function getCityName(id: string): Promise<string> {
  const cities = await getCities()
  return cities[id] || id
}

export async function getCategoryName(id: string): Promise<string> {
  const categories = await getCategories()
  return categories[id] || id
}
