import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { TourApplication } from "@/types/tour"

export default function TourAdditional({
  application,
}: {
  application: TourApplication
}) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Сведения о заявке</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Имя:</span>
              <span className="font-semibold">{application.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Состав:</span>
              <span className="font-semibold">{application.group}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Даты:</span>
              <span className="font-semibold">{application.dates}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Бюджет/день:</span>
              <span className="font-semibold">{application.budget}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {application.tags?.map((tag) => (
              <Badge variant="secondary" key={tag}>
                {tag}
              </Badge>
            ))}
          </div>
          <div className="border-t pt-4 mt-2">
            <a target="_blank" href={application.pdf}>
              <Button className="w-full mt-2" variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Скачать полную заявку
              </Button>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
