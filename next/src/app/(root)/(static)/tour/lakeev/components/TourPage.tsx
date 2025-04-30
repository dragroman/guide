// components/tours/TourPageWithData.tsx
import { TourHeader } from "./TourHeader"
import { TourDetailContainer } from "./TourDetailContainer"
import { TourFeatureCard } from "./TourFeatureCard"
import { TourHighlights } from "./TourHighlights"
import { TourDaySchedule } from "./TourDaySchedule"
import { TourInfoCard } from "./TourInfoCard"
import { TourPricePackage } from "./TourPricePackage"
import { TourRecommendedCard } from "./TourRecommendedCard"
import { TourCta } from "./TourCta"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Check, AlertTriangle } from "lucide-react"
import {
  Users,
  Hotel,
  UtensilsCrossed,
  Rocket,
  Cloud,
  Leaf,
  Gift,
  Download,
  MessageCircle,
  Camera,
  ShoppingBag,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { TourMapPoints } from "./TourMapPoints"

export const TourPage = () => {
  // Константы и данные для тура на основе заявки
  const BASE_PRICE = 3300 * 4 * 5 // Цена в день * 4 человека * 5 дней
  const VIP_PRICE = 4500 * 4 * 5 // Повышенная цена в день * 4 человека * 5 дней

  // Данные для вкладок
  const tourTabs = [
    {
      id: "program",
      label: "Программа",
      content: (
        <div className="space-y-6">
          <TourDaySchedule
            day={1}
            title="Прибытие и знакомство с Харбином"
            items={[
              {
                time: "14:00",
                title: "Заселение в отель Shangri-La Harbin",
                description:
                  "Отель 4* в центре города с гипоаллергенными номерами",
              },
              {
                time: "15:30",
                title: "Обед в ресторане Fusheng Yuan",
                description:
                  "Ресторан с меню без молочных продуктов и яиц (для аллергика)",
              },
              {
                time: "17:00",
                title: "Прогулка по Центральной улице",
                description:
                  "Знаменитая пешеходная улица с русской архитектурой",
              },
              {
                time: "19:00",
                title: "Ужин в ресторане Da Wan Ju",
                description:
                  "Традиционная китайская кухня с индивидуальным заказом для ребенка с аллергией",
              },
            ]}
          />

          <TourDaySchedule
            day={2}
            title="Культурные достопримечательности"
            items={[
              {
                time: "09:30",
                title: "Экскурсия в Софийский собор",
                description:
                  "Главная историческая достопримечательность города",
              },
              {
                time: "12:00",
                title: "Обед в Modern Pot",
                description:
                  "Ресторан с безглютеновыми и безлактозными блюдами",
              },
              {
                time: "14:00",
                title: "Посещение Музея провинции Хэйлунцзян",
                description:
                  "Интерактивные экспозиции интересные для детей и подростков",
              },
              {
                time: "17:00",
                title: "Прогулка по парку Сталина",
                description: "Красивый парк с исторической атмосферой",
              },
              {
                time: "19:00",
                title: "Ужин в ресторане Huamei Western Restaurant",
                description: "Западная кухня с отдельным меню для аллергиков",
              },
            ]}
          />

          <TourDaySchedule
            day={3}
            title="Шоппинг-день"
            items={[
              {
                time: "10:00",
                title: "Посещение Qiulin Sport Trade Area",
                description:
                  "Специализированный район с качественными спортивными товарами",
              },
              {
                time: "13:00",
                title: "Обед в Daqucun",
                description: "Китайская кухня с блюдами без аллергенов",
              },
              {
                time: "14:30",
                title: "Шоппинг в Harbin Far East Fashion Shopping Mall",
                description:
                  "Крупный торговый центр с товарами местных и международных брендов",
              },
              {
                time: "18:00",
                title: "Ужин в Xin Zhong Guo Dumplings",
                description:
                  "Известный ресторан пельменей с вариантами без яиц и молока",
              },
            ]}
          />

          <TourDaySchedule
            day={4}
            title="Гастрономический день"
            items={[
              {
                time: "09:00",
                title: "Посещение Центрального рынка",
                description: "Знакомство с местными продуктами и деликатесами",
              },
              {
                time: "12:00",
                title: "Мастер-класс китайской кухни",
                description:
                  "Специальный мастер-класс с учетом пищевой аллергии ребенка",
              },
              {
                time: "15:00",
                title: "Посещение шоколадной фабрики Qiaokou",
                description: "Дегустация темного шоколада без молока",
              },
              {
                time: "17:00",
                title: "Шоппинг в Mykal Department Store",
                description: "Популярный аутлет с хорошими скидками",
              },
              {
                time: "19:30",
                title: "Ужин в Harbin Grand Dynasty Culture Hotel",
                description:
                  "Ресторан маньчжурской кухни с адаптированным меню",
              },
            ]}
          />

          <TourDaySchedule
            day={5}
            title="Отъезд"
            items={[
              {
                time: "10:00",
                title: "Завтрак в отеле",
                description: "Специальное меню без аллергенов",
              },
              {
                time: "11:00",
                title: "Последние покупки в сувенирных магазинах",
                description: "Рядом с отелем",
              },
              {
                time: "14:00",
                title: "Выселение из отеля и трансфер",
                description: "Самостоятельный выезд (по запросу клиента)",
              },
            ]}
            isLast={true}
          />
        </div>
      ),
    },
    {
      id: "overview",
      label: "Обзор",
      content: (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <span>Отель 4* в центре</span>
            </TourFeatureCard>

            <TourFeatureCard
              title="Питание"
              icon={
                <UtensilsCrossed className="h-5 w-5 mr-2 text-muted-foreground" />
              }
            >
              <span>С учетом аллергии</span>
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
        </>
      ),
    },

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

          <Card>
            <CardHeader>
              <CardTitle>Что включено</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>
                    Проживание в отеле 4* в центре города с гипоаллергенными
                    номерами
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Завтраки с учетом пищевой аллергии</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Русскоговорящий гид на экскурсиях</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Все входные билеты по программе</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>
                    Подбор ресторанов с учетом пищевой аллергии ребенка
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Дополнительные опции</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Gift className="h-5 w-5 mr-2 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">Личный шоппинг-гид</span>
                    <p className="text-sm text-muted-foreground">
                      +$120 за день шоппинга
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Gift className="h-5 w-5 mr-2 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">Трансфер в/из аэропорта</span>
                    <p className="text-sm text-muted-foreground">
                      +$50 в одну сторону
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
      id: "map",
      label: "Карта",
      content: <TourMapPoints />,
    },
  ]

  return (
    <div className="container mx-auto py-6 px-4 max-w-7xl">
      <TourHeader
        title="Харбин: гастрономия, шоппинг и культура"
        subtitle="Персонализированное путешествие для семьи с учетом пищевой аллергии ребенка"
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

      <div className="flex flex-col space-y-6">
        {/* Основной контент */}
        <div>
          <TourDetailContainer tabs={tourTabs} defaultTab="overview" />
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
                  <Button className="w-full mt-2" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Скачать полную заявку
                  </Button>
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
        primaryButtonText="Связаться с клиентом"
        secondaryButtonText="Обсудить детали"
      />
    </div>
  )
}
