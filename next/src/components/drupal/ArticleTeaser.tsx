import Image from "next/image"
import { Link } from "@/components/navigation/Link"
import { absoluteUrl, formatDate, cn } from "@/lib/utils"
import type { DrupalNode } from "next-drupal"
import { CalendarDays, Clock, ArrowRight, User } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface ArticleTeaserProps {
  node: DrupalNode
  variant?: "default" | "compact"
  className?: string
}

export function ArticleTeaser({
  node,
  variant = "default",
  className,
  ...props
}: ArticleTeaserProps) {
  const isCompact = variant === "compact"

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all hover:shadow-md",
        isCompact ? "flex flex-row h-full" : "flex flex-col",
        className
      )}
      {...props}
    >
      {/* Изображение */}
      {node.field_image && (
        <div
          className={cn(
            "overflow-hidden bg-muted",
            isCompact ? "w-1/3 flex-shrink-0" : "aspect-video w-full"
          )}
        >
          <Link href={node.path.alias} className="block h-full">
            <div className="relative h-full w-full">
              <Image
                src={absoluteUrl(node.field_image.uri.url)}
                fill
                sizes={
                  isCompact
                    ? "(max-width: 768px) 100vw, 33vw"
                    : "(max-width: 768px) 100vw, 100vw"
                }
                style={{ objectFit: "cover" }}
                alt={node.field_image.resourceIdObjMeta.alt || node.title}
                className="transition-all duration-300 hover:scale-105"
              />
            </div>
          </Link>
        </div>
      )}

      {/* Контент */}
      <div className="flex flex-col flex-grow">
        <CardContent
          className={cn("flex-grow flex flex-col", isCompact ? "p-4" : "p-6")}
        >
          <div className="flex items-center text-sm text-muted-foreground mb-3">
            <CalendarDays className="h-4 w-4 mr-1" />
            <time dateTime={node.created}>{formatDate(node.created)}</time>
            <span className="mx-2">•</span>
            <Clock className="h-4 w-4 mr-1" />
            <span>5 мин. чтения</span>
          </div>

          <Link href={node.path.alias} className="no-underline group">
            <h2
              className={cn(
                "font-bold mb-3 group-hover:text-primary transition-colors",
                isCompact ? "text-lg" : "text-2xl"
              )}
            >
              {node.title}
            </h2>
          </Link>

          <p className="text-muted-foreground mb-4 line-clamp-3">
            {node.field_image?.resourceIdObjMeta?.alt ||
              "Погрузитесь в увлекательное путешествие по уголкам Харбина. Узнайте о скрытых жемчужинах города и получите практические советы от местного жителя."}
          </p>

          {/* Категории статьи (если они есть) */}
          {node.field_tags && (
            <div className="flex flex-wrap gap-2 mt-auto">
              {Array.isArray(node.field_tags) ? (
                node.field_tags.map((tag) => (
                  <Badge key={tag.id} variant="secondary" className="text-xs">
                    {tag.name}
                  </Badge>
                ))
              ) : (
                <Badge variant="secondary" className="text-xs">
                  {node.field_tags.name}
                </Badge>
              )}
            </div>
          )}
        </CardContent>

        <CardFooter
          className={cn(
            "border-t px-6 py-4 flex justify-between items-center",
            isCompact ? "px-4" : "px-6"
          )}
        >
          {node.uid?.display_name ? (
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarFallback className="bg-muted">
                  {node.uid.display_name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">
                {node.uid.display_name}
              </span>
            </div>
          ) : (
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarFallback className="bg-muted">
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">Автор</span>
            </div>
          )}

          <Button
            variant="ghost"
            size="sm"
            className="flex items-center text-primary group"
            asChild
          >
            <Link href={node.path.alias}>
              Читать
              <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </CardFooter>
      </div>
    </Card>
  )
}
