import { draftMode } from "next/headers"
import { notFound } from "next/navigation"
import { getDraftData } from "next-drupal/draft"
import { Article } from "@/components/drupal/Article"
import { BasicPage } from "@/components/drupal/BasicPage"
import { drupal } from "@/lib/drupal"
import type { Metadata, ResolvingMetadata } from "next"
import type { DrupalNode, JsonApiParams } from "next-drupal"

async function getNode(slug: string[]) {
  const path = `/blog/${slug.join("/")}`

  const params: JsonApiParams = {}

  const draftData = await getDraftData()

  if (draftData.path === path) {
    params.resourceVersion = draftData.resourceVersion
  }

  // Translating the path also allows us to discover the entity type.
  const translatedPath = await drupal.translatePath(path)

  if (!translatedPath) {
    throw new Error("Resource not found", { cause: "NotFound" })
  }

  const type = translatedPath.jsonapi?.resourceName!
  const uuid = translatedPath.entity.uuid
  const tag = `${translatedPath.entity.type}:${translatedPath.entity.id}`

  if (type === "node--article") {
    params.include = "field_image,uid,field_body.field_image.field_media_image"
  }

  const resource = await drupal.getResource<DrupalNode>(type, uuid, {
    params,
    cache: "force-cache",
    next: {
      revalidate: 3600,
      // Replace `revalidate` with `tags` if using tag based revalidation.
      // tags: [tag],
    },
  })

  if (!resource) {
    throw new Error(
      `Failed to fetch resource: ${translatedPath?.jsonapi?.individual}`,
      {
        cause: "DrupalError",
      }
    )
  }

  return resource
}

type NodePageParams = {
  slug: string[]
}
type NodePageProps = {
  params: Promise<NodePageParams>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
  props: NodePageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await props.params

  const { slug } = params

  let node
  try {
    node = await getNode(slug)
  } catch (e) {
    // If we fail to fetch the node, don't return any metadata.
    return {}
  }

  return {
    title: node.title,
  }
}

const RESOURCE_TYPES = ["node--page", "node--article"]

export async function generateStaticParams(): Promise<NodePageParams[]> {
  try {
    const resources = await drupal.getResourceCollectionPathSegments(
      RESOURCE_TYPES,
      {
        // The pathPrefix will be removed from the returned path segments array.
        // pathPrefix: "/blog",
        // The list of locales to return.
        // locales: ["en", "es"],
        // The default locale.
        // defaultLocale: "en",
      }
    )

    return resources.map((resource) => {
      // resources is an array containing objects like: {
      //   path: "/blog/some-category/a-blog-post",
      //   type: "node--article",
      //   locale: "en", // or `undefined` if no `locales` requested.
      //   segments: ["blog", "some-category", "a-blog-post"],
      // }
      return {
        slug: resource.segments,
      }
    })
  } catch (error) {
    console.warn(
      "Unable to fetch blog paths during build time. Will use fallback.",
      error
    )
    return [] // возвращаем пустой массив, если сервер Drupal недоступен
  }
}

export default async function NodePage(props: NodePageProps) {
  const params = await props.params

  const { slug } = params

  const draft = await draftMode()
  const isDraftMode = draft.isEnabled

  let node
  try {
    node = await getNode(slug)
  } catch (error) {
    // If getNode throws an error, tell Next.js the path is 404.
    notFound()
  }

  // If we're not in draft mode and the resource is not published, return a 404.
  if (!isDraftMode && node?.status === false) {
    notFound()
  }

  return <>{node.type === "node--article" && <Article node={node} />}</>
}
