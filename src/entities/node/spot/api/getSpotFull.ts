import { drupal } from "@shared/lib/drupal"
import { DrupalJsonApiParams } from "drupal-jsonapi-params"
import { TSpotDefaultFull, TSpotDefaultTeaser } from "../model/types"
import { notFound } from "next/navigation"

export async function getSpotFull(id: string): Promise<TSpotDefaultFull> {
  try {
    const params = new DrupalJsonApiParams()
      .addFilter("status", "1")
      .addInclude(["field_images.field_media_image"])
      .addFields("media--image", ["field_media_image", "name"])

    const res = await drupal.getResourceByPath<TSpotDefaultFull>(
      `/spot/${id}`,
      {
        params: params.getQueryObject(),
      }
    )
    return res
  } catch (error: any) {
    if (error?.statusCode === "404" || error?.statusCode === 404) {
      return notFound()
    }
    throw error
  }
}
