import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import {
  ArrowRight,
  Compass,
  Utensils,
  MapPin,
  Calendar,
  Star,
  Coffee,
  Archive,
} from "lucide-react"
import ArticleTeaserList from "@/components/drupal/ArticleTeaserList"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Путеводитель по Китаю",
  description: "Лучший путеводитель по Китаю от местного жителя",
}

export default async function Home() {
  return (
    <>
      {/* Hero секция */}
      <section className="relative h-[100vh] sm:h-[50vh] overflow-hidden">
        {/* Оптимизированное изображение с next/image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero.jpg"
            alt="Панорама Харбина"
            fill
            priority
            quality={85}
            sizes="100vw"
            style={{
              objectFit: "cover",
              objectPosition: "center",
              opacity: 1,
            }}
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>

        {/* Контент */}
        <div className="container relative h-full flex flex-col justify-center items-start max-w-5xl mx-auto px-4 z-10">
          <Badge className="mb-4 text-white" variant="outline">
            Ваш гид по Китаю
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white">
            Откройте для себя
            <br />
            настоящий <span className="text-primary">Китай</span>
          </h1>
          <p className="text-xl text-white max-w-xl mb-8">
            Уникальный взгляд на город, где Восток встречается с Западом. Мой
            второй дом последние 10 лет.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/application">
              <Button size="lg" className="px-8">
                Подобрать тур
              </Button>
            </Link>
            <Link href="/blog">
              <Button size="lg" variant="outline" className="px-8">
                Читать блог
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* О проекте */}
      <section className="py-20 bg-muted/30">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-16">
            <Badge className="mb-2">О путеводителе</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Что вас ждет в этом путеводителе
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Исследуйте Китай с местными экспертами — от тайных кофеен до
              культовых достопримечательностей
            </p>
            <Separator className="mt-8 mb-12 w-24" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Compass className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Локации</CardTitle>
                <CardDescription>Для настоящих исследователей</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Секретные места, о которых не пишут в путеводителях и не знают
                  обычные туристы
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Utensils className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Гастрономия</CardTitle>
                <CardDescription>Вкусная сторона Китая</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Проверенные рестораны, уличная еда и самые интересные
                  кулинарные эксперименты
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <MapPin className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Маршруты</CardTitle>
                <CardDescription>Готовые путешествия</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Готовые дневные маршруты для разных сезонов, интересов и
                  длительности пребывания
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Особенности */}
      <section className="py-20">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="mb-4">Ваш личный гид</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Современный взгляд на традиционный Китай
              </h2>
              {/* <p className="text-muted-foreground mb-8">
                Последние 10 лет я живу в Харбине — удивительном городе, где
                китайская культура тесно переплетается с русским наследием.
                Здесь я собрала для вас всё, что поможет увидеть настоящий Китай
                глазами местного жителя.
              </p> */}

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">
                      Актуальная информация
                    </h3>
                    <p className="text-muted-foreground">
                      Регулярно обновляемый контент с учетом сезонных событий
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary">
                    <Star className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">
                      Проверено лично
                    </h3>
                    <p className="text-muted-foreground">
                      Все заведения и маршруты проверены и отобраны на основе
                      личного опыта
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary">
                    <Coffee className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">
                      Аутентичный опыт
                    </h3>
                    <p className="text-muted-foreground">
                      Погружение в местную культуру, вдали от туристических
                      маршрутов
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden aspect-[4/5] relative">
              <Image
                src="/day-city-view.jpg"
                alt="Туристический опыт в Харбине"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Блог */}
      <section className="py-20 bg-muted/30">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-16">
            <Badge className="mb-2">Блог</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Последние публикации
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Истории, советы и наблюдения из жизни в Китае
            </p>
            <Separator className="mt-8 mb-12 w-24" />
          </div>

          <div className="space-y-10">
            <ArticleTeaserList />
          </div>

          <div className="mt-12 text-center">
            <Link href="/blog">
              <Button variant="outline" className="gap-2">
                Все публикации <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <Archive className="h-12 w-12 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Готовы открыть для себя Китай?
          </h2>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10">
            Заполните анкету, и я подберу для вас идеальный маршрут с учетом
            ваших интересов
          </p>
          <Link href="/application">
            <Button size="lg" variant="secondary" className="min-w-[200px]">
              Подобрать тур
            </Button>
          </Link>
          <p className="text-primary-foreground/60 mt-4 text-sm">
            Бесплатно и без обязательств
          </p>
        </div>
      </section>
    </>
  )
}
