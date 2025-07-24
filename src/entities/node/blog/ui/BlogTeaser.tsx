import { absoluteUrl, cn, formatDate } from "@shared/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@shared/ui/card"
import { DrupalNode } from "next-drupal"
import Link from "next/link"
import { ArrowRight, CalendarDays, Clock, User } from "lucide-react"
import { Badge } from "@shared/ui/badge"
import { Avatar, AvatarFallback } from "@shared/ui/avatar"
import { Button } from "@shared/ui/button"
import Image from "next/image"

export const BlogTeaser = ({ node }: { node: DrupalNode }) => {
  return (
    <Card className={cn("overflow-hidden transition-all hover:shadow-md")}>
      {/* Изображение */}
      {/* {node.field_image && (
        <div className={cn("overflow-hidden bg-muted")}>
          <Link href={node.path.alias} className="block h-full">
            <div className="relative h-full w-full">
              <Image
                src={absoluteUrl(node.field_image.uri.url)}
                fill
                sizes={"(max-width: 768px) 100vw, 100vw"}
                style={{ objectFit: "cover" }}
                alt={node.field_image.resourceIdObjMeta.alt || node.title}
                className="transition-all duration-300 hover:scale-105"
              />
            </div>
          </Link>
        </div>
      )} */}
      <CardHeader>
        <CardTitle>
          <Link href={`/blog/${node.drupal_internal__nid}`}>{node.title}</Link>
        </CardTitle>
        <CardDescription>
          <div className="flex items-center">
            <CalendarDays className="h-4 w-4 mr-1" />
            <time dateTime={node.created}>{formatDate(node.created)}</time>
            <span className="mx-2">•</span>
            <Clock className="h-4 w-4 mr-1" />
            <span>5 мин. чтения</span>
          </div>
        </CardDescription>
      </CardHeader>

      {/* Контент */}
      <CardContent className={cn("flex-grow flex flex-col")}>
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
        className={cn("border-t px-6 py-4 flex justify-between items-center")}
      >
        {node.uid?.display_name ? (
          <div className="flex items-center">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarFallback className="bg-muted">
                {node.uid.display_name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{node.uid.display_name}</span>
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
          <Link href={`/blog/${node.drupal_internal__nid}`}>
            Читать
            <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
