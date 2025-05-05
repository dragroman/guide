import { AlertTriangle, Hotel, Link2, Users } from "lucide-react"
import { TourFeatureCard } from "../TourFeatureCard"
import { TourInfoCard } from "../TourInfoCard"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { TourHighlights } from "../TourHighlights"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BaseInfo } from "@/types/tour"

export default function TourBaseInfo({
  baseInfoData,
}: {
  baseInfoData: BaseInfo
}) {
  const data = baseInfoData
  return (
    <>
      <TourInfoCard title="Важная информация" items={data.features} />

      <div className="grid gap-4">
        <TourFeatureCard
          title="Для кого"
          icon={<Users className="h-5 w-5 mr-2 text-muted-foreground" />}
        >
          <span>{data.ageGroups}</span>
        </TourFeatureCard>

        <TourFeatureCard
          title="Проживание"
          icon={<Hotel className="h-5 w-5 mr-2 text-muted-foreground" />}
        >
          <div className="space-y-2">
            <div>{data.accommodation.label}</div>
            <div>{data.accommodation.name}</div>
            <Button variant="outline">
              <Link2 />
              <a href={data.accommodation.urlMap} target="_blank">
                Ссылка на карте
              </a>
            </Button>
          </div>
        </TourFeatureCard>
      </div>
      {data.remarks.title && (
        <Alert className="mt-4 mb-6 border-amber-500">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          <AlertTitle>{data.remarks.title}</AlertTitle>
          <AlertDescription>{data.remarks.description}</AlertDescription>
        </Alert>
      )}

      <TourHighlights
        highlights={data.highlights.map((h) => ({
          icon: <h.icon className="h-5 w-5 text-primary" />,
          title: h.title,
          description: h.description,
        }))}
      />

      <div className="p-4 bg-muted/50 rounded-lg mt-6">
        <h3 className="text-lg font-semibold mb-2">{data.personal.title}</h3>
        <p className="text-muted-foreground">{data.personal.text}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Дополнительные опции</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {data.options.map((option, idx) => (
              <li className="flex items-start" key={idx}>
                <option.icon className="h-5 w-5 mr-2 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium">{option.label}</span>
                  <p className="text-sm text-muted-foreground">
                    {option.price}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </>
  )
}
