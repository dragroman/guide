import { drupal } from "@shared/lib/drupal"
import { notFound } from "next/navigation"
import type { Metadata, ResolvingMetadata } from "next"
import { NodeBlog } from "@widgets/node-blog"
import { getBlogNode } from "@entities/node/blog"

// Кешированная функция для получения данных блог-поста

export async function generateStaticParams() {
  const resources =
    await drupal.getResourceCollectionPathSegments("node--article")

  return resources
    .filter((resource) => resource.segments.length >= 1)
    .map((resource) => ({
      id: resource.segments[resource.segments.length - 1],
    }))
}

// SEO-оптимизированная функция генерации метаданных
export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params

  // Получаем данные блог-поста
  const node = await getBlogNode(id)

  if (!node) {
    return {
      title: "Блог-пост не найден",
      description: "Запрашиваемый блог-пост не существует",
    }
  }

  // Извлекаем данные из Drupal node
  const title = node.title || "Блог-пост"
  const description =
    node.field_meta_description ||
    extractTextFromBody(node.field_body) ||
    "Читайте наш блог-пост"

  // Получаем URL изображения для Open Graph
  const featuredImage =
    node.field_featured_image?.field_media_image?.uri?.url ||
    node.field_body?.field_image?.field_media_image?.uri?.url

  // Получаем родительские метаданные для наследования
  const previousImages = (await parent).openGraph?.images || []

  // Формируем canonical URL
  const canonicalUrl = `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${node.path?.alias || `/blog/${id}`}`

  // Форматируем дату публикации
  const publishedTime = node.created
    ? new Date(node.created).toISOString()
    : undefined

  // Получаем имя автора
  const authorName = node.uid?.display_name || node.uid?.name || "Автор"

  return {
    title: title,
    description: description,

    // Ключевые слова (если поле существует в Drupal)
    keywords:
      node.field_meta_keywords?.split(",").map((k: string) => k.trim()) || [],

    // Автор
    authors: [{ name: authorName }],

    // Дата публикации
    ...(publishedTime && {
      other: {
        "article:published_time": publishedTime,
        "article:author": authorName,
      },
    }),

    // Canonical URL для SEO
    alternates: {
      canonical: canonicalUrl,
    },

    // Open Graph метаданные для социальных сетей
    openGraph: {
      type: "article",
      title: title,
      description: description,
      url: canonicalUrl,
      siteName: "Название вашего сайта", // замените на реальное название
      locale: "ru_RU",
      ...(publishedTime && { publishedTime }),
      ...(authorName && {
        authors: [authorName],
      }),
      images: featuredImage
        ? [
            {
              url: featuredImage,
              width: 1200,
              height: 630,
              alt: title,
            },
            ...previousImages,
          ]
        : previousImages,
    },

    // Twitter Card метаданные
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      ...(featuredImage && {
        images: [featuredImage],
      }),
    },

    // Robots метаданные
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  }
}

// Вспомогательная функция для извлечения текста из body (первые 160 символов)
function extractTextFromBody(body: any): string | null {
  if (!body || !body.processed) return null

  // Удаляем HTML теги и берем первые 160 символов
  const plainText = body.processed.replace(/<[^>]*>/g, "").trim()
  return plainText.length > 160
    ? plainText.substring(0, 157) + "..."
    : plainText
}

export default async function BlogFullPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  // Переиспользуем кешированную функцию
  const node = await getBlogNode(id)

  if (!node) {
    return notFound()
  }

  return <NodeBlog node={node} />
}
