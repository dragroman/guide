import { getDaysText } from "@shared/lib/utils"
import { Badge } from "@shared/ui/badge"
import { ChevronRight } from "lucide-react"
import { DrupalNode } from "next-drupal"
import Link from "next/link"

export const DashboardList = ({ nodes }: { nodes: DrupalNode[] }) => {
  return (
    <>
      <div className="space-y-3">
        {nodes.map((node) => (
          <Link
            key={node.id}
            href={`/dashboard/application/${node.drupal_internal__nid}`}
            className="block relative"
          >
            <div className="border border-border/40 rounded-lg p-4 hover:border-border/80 transition-colors bg-white">
              <div className="flex flex-col gap-2">
                <h3 className="font-medium text-foreground/90 line-clamp-2">
                  {node.title}
                </h3>
                <div className="flex flex-col text-sm text-muted-foreground">
                  <div>
                    Количество людей {" - "}
                    {node.field_people_count}
                  </div>
                  <div>
                    Продолжительность {" - "}
                    {`${node.field_days_count} ${getDaysText(node.field_days_count)}`}
                  </div>
                  <div>
                    {new Date(node.field_date_from).toLocaleDateString("ru")}
                    {" - "}
                    {new Date(node.field_date_to).toLocaleDateString("ru")}
                  </div>
                </div>
                {/* Статус бейдж */}
                <div className="absolute top-4 right-4">
                  <Badge>Новая</Badge>
                </div>
              </div>
              {/* Дополнительная мета-информация */}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/10">
                <span className="text-xs text-muted-foreground">
                  Дата создания{" "}
                  {new Date(node.created).toLocaleDateString("ru")}
                </span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
