// src/components/drupal/ArticleTeaser.tsx
import Image from "next/image"
import { Link } from "@/components/navigation/Link"
import { absoluteUrl, formatDate } from "@/lib/utils"
import type { DrupalNode } from "next-drupal"
import { CalendarDays, Clock, ArrowRight } from "lucide-react"

interface ArticleTeaserProps {
  node: DrupalNode
}

export function ArticleTeaser({ node, ...props }: ArticleTeaserProps) {
  return (
    <article className="flex flex-col md:flex-row" {...props}>
      {/* Изображение */}
      {node.field_image && (
        <div className="md:w-1/3 flex-shrink-0">
          <figure className="h-full">
            <Link href={node.path.alias} className="block h-full">
              <div className="relative h-60 md:h-full w-full">
                <Image
                  src={absoluteUrl(node.field_image.uri.url)}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                  alt={node.field_image.resourceIdObjMeta.alt || node.title}
                  className="transition-all duration-300 hover:scale-105"
                />
              </div>
            </Link>
          </figure>
        </div>
      )}

      {/* Контент */}
      <div className="p-6 md:w-2/3 flex flex-col">
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <CalendarDays className="h-4 w-4 mr-1" />
          <time dateTime={node.created}>{formatDate(node.created)}</time>
          <span className="mx-2">•</span>
          <Clock className="h-4 w-4 mr-1" />
          <span>5 мин. чтения</span>
        </div>

        <Link href={node.path.alias} className="no-underline group">
          <h2 className="text-2xl font-bold mb-3 group-hover:text-pink-600 transition-colors font-mono">
            {node.title}
          </h2>
        </Link>

        <p className="text-gray-600 mb-4 line-clamp-3">
          {node.field_image?.resourceIdObjMeta?.alt ||
            "Погрузитесь в увлекательное путешествие по уголкам Харбина. Узнайте о скрытых жемчужинах города и получите практические советы от местного жителя."}
        </p>

        <div className="mt-auto pt-4">
          <div className="flex items-center justify-between">
            {node.uid?.display_name && (
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mr-2">
                  {node.uid.display_name.charAt(0)}
                </div>
                <span className="text-sm font-medium">
                  {node.uid.display_name}
                </span>
              </div>
            )}

            <Link
              href={node.path.alias}
              className="flex items-center text-pink-600 hover:text-pink-700 font-medium text-sm group"
            >
              Читать статью
              <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
