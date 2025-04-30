// components/tours/TourPageWithData.tsx
import { TourHeader } from "./TourHeader"
import { TourDetailContainer } from "./TourDetailContainer"
import { TourFeatureCard } from "./TourFeatureCard"
import { TourHighlights } from "./TourHighlights"
import { TourInfoCard } from "./TourInfoCard"
import { TourCta } from "./TourCta"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Check, AlertTriangle, Link2, UserCircle2Icon } from "lucide-react"
import {
  Users,
  Hotel,
  UtensilsCrossed,
  Rocket,
  Leaf,
  Gift,
  Download,
  ShoppingBag,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { TourMapPoints } from "./TourMapPoints"
import Link from "next/link"
import TourRestaurant from "./TourRestaurant"
import TourExcursion from "./TourExcursion"
import TourShopping from "./TourShopping"

export const TourPage = () => {
  // Данные для вкладок
  const tourTabs = [
    {
      id: "info",
      label: "Информация",
      content: (
        <>
          <TourInfoCard
            title="Важная информация"
            items={[
              {
                title: "Особые потребности в питании",
                content:
                  "Все рестораны маршрута проверены на наличие блюд без молочного белка и белка куриного яйца для ребенка с аллергией",
              },
              {
                title: "Транспорт",
                content:
                  "Комбинация общественного транспорта и такси по запросу клиента (трансфер не требуется)",
              },
              {
                title: "Шоппинг",
                content:
                  "Выделено специальное время для шоппинга спортивных товаров в лучших торговых центрах и аутлетах",
              },
            ]}
          />

          <div className="grid gap-4">
            <TourFeatureCard
              title="Для кого"
              icon={<Users className="h-5 w-5 mr-2 text-muted-foreground" />}
            >
              <span>Семья с детьми (7-17 лет)</span>
            </TourFeatureCard>

            <TourFeatureCard
              title="Проживание"
              icon={<Hotel className="h-5 w-5 mr-2 text-muted-foreground" />}
            >
              <div className="space-y-2">
                <div>Отель 4* в центре</div>
                <div>万达假日酒店</div>
                <Button variant="outline">
                  <Link2 />
                  <Link href="https://j.map.baidu.com/0d/0Ryi" target="_blank">
                    Ссылка на карте
                  </Link>
                </Button>
              </div>
            </TourFeatureCard>
          </div>

          <Alert className="mt-4 mb-6 border-amber-500">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <AlertTitle>Важно: особые потребности в питании</AlertTitle>
            <AlertDescription>
              Ребенок с аллергией на молочный белок и белок куриного яйца. Все
              рестораны в маршруте подобраны с учетом этой особенности.
            </AlertDescription>
          </Alert>

          <TourHighlights
            highlights={[
              {
                icon: <Rocket className="h-5 w-5 text-primary" />,
                title: "Культурные экскурсии",
                description:
                  "Посещение главных достопримечательностей и музеев Харбина с русскоговорящим гидом",
              },
              {
                icon: <UtensilsCrossed className="h-5 w-5 text-primary" />,
                title: "Гастрономические открытия",
                description:
                  "Рестораны с безопасными блюдами для аллергиков и традиционной китайской кухней",
              },
              {
                icon: <ShoppingBag className="h-5 w-5 text-primary" />,
                title: "Шоппинг в лучших местах",
                description:
                  "Посещение торговых центров и аутлетов с качественными спортивными товарами",
              },
              {
                icon: <Leaf className="h-5 w-5 text-primary" />,
                title: "Комфортные перемещения",
                description:
                  "Оптимальное сочетание общественного транспорта и такси для экономии времени",
              },
            ]}
          />

          <div className="p-4 bg-muted/50 rounded-lg mt-6">
            <h3 className="text-lg font-semibold mb-2">Персональный подход</h3>
            <p className="text-muted-foreground">
              Маршрут составлен специально под запрос Ольги для семьи из 4
              человек (2 взрослых, ребенок 7-12 лет и подросток 13-17 лет) с
              учетом аллергии ребенка и интересов всех членов семьи.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Дополнительные опции</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <UserCircle2Icon className="h-5 w-5 mr-2 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">Личный шоппинг-гид</span>
                    <p className="text-sm text-muted-foreground">
                      +1000¥ за день
                    </p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </>
      ),
    },
    {
      id: "restaurant",
      label: "Рестораны",
      content: <TourRestaurant />,
    },
    {
      id: "excursion",
      label: "Экскурсии",
      content: <TourExcursion />,
    },
    {
      id: "shopping",
      label: "Шоппинг",
      content: <TourShopping />,
    },

    {
      id: "other",
      label: "Другое",
      content: <TourMapPoints />,
    },
  ]

  return (
    <div className="container mx-auto py-6 px-4 max-w-7xl">
      <TourHeader
        title="Харбин: гастрономия, шоппинг и культура"
        subtitle="Персонализированное путешествие для семьи Лакеевых в Харбин"
        dates="29 апреля – 3 мая 2025"
        duration="5 дней"
        imagePath="/harbin-family.jpg"
        badges={[
          "Учет пищевой аллергии",
          "Шоппинг спортивных товаров",
          "Гастрономические открытия",
          "Культурные экскурсии",
        ]}
      />

      <div className="flex flex-col space-y-6 mb-6">
        {/* Основной контент */}
        <div>
          <TourDetailContainer tabs={tourTabs} defaultTab="info" />
        </div>

        {/* Боковая панель */}
        <div>
          <div className="sticky top-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Сведения о заявке</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Имя:</span>
                    <span className="font-semibold">Ольга</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Состав:</span>
                    <span className="font-semibold">2 взр, 1 реб, 1 подр</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Даты:</span>
                    <span className="font-semibold">29.04 - 03.05.2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Бюджет/день:</span>
                    <span className="font-semibold">3 300 ₽/чел</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="secondary">Экскурсии</Badge>
                  <Badge variant="secondary">Шоппинг</Badge>
                  <Badge variant="secondary">Гастрономия</Badge>
                </div>

                <div className="border-t pt-4 mt-2">
                  <a href="https://img.chinq.ru/guide/public/pdf/lakeev.pdf">
                    <Button className="w-full mt-2" variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Скачать полную заявку
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA в конце страницы */}
      <TourCta
        title="Связь с экспертом"
        description="Мы внимательно изучили вашу заявку и подготовили персонализированный маршрут с учетом всех пожеланий, включая особые диетические требования вашего ребенка. Готовы обсудить детали и внести корректировки."
        primaryButtonText="Позвонить"
        secondaryButtonText="Whatsapp"
      />
    </div>
  )
}
