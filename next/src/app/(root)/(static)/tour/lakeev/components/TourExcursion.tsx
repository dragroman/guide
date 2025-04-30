"use client"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { CircleDollarSign, Clock, MapPin, Info, Ticket } from "lucide-react"
import { useState } from "react"
import { ExcursionDetail } from "./ExcursionDetail"
import { Button } from "@/components/ui/button"

export const excursionData = {
  excursions: [
    {
      id: 1,
      name: "Парк Солнечный остров 太阳岛风景区",
      address: "Sun Island Scenic Area, Songbei District (松北区太阳岛风景区)",
      hours: "8:00-17:00",
      price:
        "Взрослый 30 юаней, детский 15 юаней. Электромобиль по парку 20 юаней с человека",
      description:
        "На севере острова расположены зоны с животными и растениями. На южной части есть музеи и галереи. Павильон льда и снега(冰雪艺术馆）расположен на западе парка и занимают площадь 5000 квадратных метров, является самым большим крытым музеем льда и снега в мире. Зал работает круглый год. Русская деревня (俄罗斯风情小镇）находится в южной части острова и примыкает к берегу реки Сунгари. Комплекс состоит из 27 зданий в русском стиле начала ХХ века. Выставочный зал России расположен в северо-восточной части парка. На востоке острова расположен Зал изделий Северного Китая (北方民艺精品馆). Здесь представлены резные изделия из дерева и слоновой кости, поделки из березы, глиняные изделия и многое другое. Также на острове есть остров белок, лебединое озеро, олений парк и цветочный сад",
      duration: "Весь день до закрытия парка",
      directions:
        "От гостиницы до метро 646 метров пешком. На метро: 2 ветка (зеленая)中央大街站 Zhongyangstreet（вход 1) проехать 2 остановки и выйти на остановке 太阳岛站 Sun Island (выход 3) пройти 459 метров до входа парка 1",
      travelTime: "23 минуты",
      baiduUrl: "https://j.map.baidu.com/3b/L3hk",
      omapsUrl: "https://omaps.app/_8UYCncZte/",
      tips: "Парк очень большой и во время праздничных выходных возможны очереди. Обратно можно воспользоваться канатной дорогой 松花江索道 у выхода 3 из парка. Стоимость билета 60 юаней в одну сторону на человека",
    },
    {
      id: 2,
      name: "Харбинский парк аттракционов 哈尔滨融创乐园",
      address: "松北区松祥街道世茂大道99-1号",
      hours: "9:30-17:30 (будни), до 18:00 (выходные)",
      price: "Взрослый: 218 юаней, Детский (1.2-1.5 м): 168 юаней",
      description:
        "Это крупный тематический парк развлечений, расположенный в Харбине, Китай. Он сочетает в себе захватывающие аттракционы, красочные шоу и тематические зоны, вдохновленные культурой и природой Северо-Восточного Китая. Основные зоны и развлечения: Тематические аттракционы– американские горки, водные спуски, карусели и другие экстремальные и семейные развлечения. Культурные шоу – представления с элементами китайской традиции и современными технологиями. Ледовый городок (в зимний период) – ледяные скульптуры, горки и зимние активности. Зона для детей– безопасные и яркие аттракционы для маленьких посетителей. Фуд-корты и магазины– возможность перекусить и купить сувениры. Подходит для семей, пар и компаний друзей. Уникальное сочетание адреналиновых аттракционов и культурных впечатлений. Особенно популярен зимой благодаря ледовым композициям.",
      duration: "Можно потратить и целый день",
      directions:
        "На автобусе: пройти пешком 500 метров до остановки 道理十二道街站 сесть на автобус №42 или №47 проехать 18 остановок выход 万达主题乐园站.",
      travelTime:
        "59 минут на автобусе. Проезд 2юаня/с человека. На такси 30-40 минут, средняя стоимость 25-30 юаней",
      baiduUrl: "https://j.map.baidu.com/88/vvhk",
      omapsUrl: "https://omaps.app/s8UNdG6Ook/",
      tips: "Лучшее время для посещения парка будни. Рядом с парком есть большой торговый центр где можно покушать и пошопиться",
    },
    {
      id: 3,
      name: "Научно-технический музей (黑龙江省科学技术馆)",
      address: "松北区-太阳大道1458号",
      hours: "9:00-16:30 (выходной - понедельник)",
      price: "БЕСПЛАТНО (нужен паспорт)",
      description:
        "Музей науки и технологий провинции Хэйлунцзян – это современный интерактивный музей, расположенный в Харбине. Он посвящен популяризации науки и технологий, предлагая посетителям увлекательные экспонаты, образовательные программы и интерактивные зоны. Основные разделы и экспозиции: Фундаментальная наука – законы физики, химии, механики и оптики в интерактивной форме. Космос и авиация – модели ракет, симуляторы полетов, информация о космических исследованиях. Робототехника и ИИ – демонстрация работы роботов, возможности искусственного интеллекта. Экология и природные ресурсы – выставки о климате, геологии и экологии Северо-Восточного Китая. Детская зона– игровые экспонаты, развивающие логику и творческое мышление. Интерактивные экспонаты – можно трогать, экспериментировать и участвовать в опытах. Подходит для всех возрастов – от детей до взрослых. Образовательные шоу и временные выставки.",
      duration: "30-40 минут",
      directions:
        "На автобусе: пройти пешком 500 метров до остановки 道理十二道街站 сесть на автобус №42 или №47 проехать 7 остановок выход на остановке 太阳岛道口站 пройти 554 метра",
      travelTime: "38 минут",
      baiduUrl: "https://j.map.baidu.com/68/Fchk",
      omapsUrl: "https://omaps.app/48UYCiRZpI/",
      tips: "",
    },
    {
      id: 4,
      name: "Район Китайского Барокко 中华巴洛克历史文化区",
      address: "道外区南头道街64号",
      hours:
        "Территория квартала: открыта круглосуточно (освещение вечером). Музеи и магазины: 9:00–17:00 (некоторые до 20:00). Рестораны и кафе: 10:00–22:00.",
      price:
        "Вход в район: бесплатно. Отдельные музеи: 10–30 юаней (например, музей истории квартала). Экскурсии с гидом: от 100 юаней (групповые).",
      description:
        "Уникальный исторический квартал, где европейское барокко сочетается с китайскими элементами. Построен в начале XX века как деловой центр Харбина, сегодня – это музей под открытым небом с: Архитектурой в стиле «китайского барокко»: фасады с колоннами, лепниной и традиционными китайскими мотивами. Старыми магазинами, чайными и ресторанами с местной кухней. Музеями и мастерскими (например, музей старинной фотографии). Атмосферными двориками и пешеходными улочками. Идеальное место для фото, прогулок и погружения в историю Харбина.",
      duration: "1-2 часа",
      directions: "Можно пройти пешком",
      travelTime: "52 минуты",
      baiduUrl: "https://j.map.baidu.com/d3/BRgk",
      omapsUrl: "https://omaps.app/w8UYC26oHc/",
      tips: "",
    },
    {
      id: 5,
      name: "Фармацевтическая фабрика в Харбине 哈药集团制药六厂 (Harbin Drug Group Pharmaceutical Factory 6)",
      address: "道外区-南直路326号",
      hours: "11:00-16:00",
      price: "БЕСПЛАТНО (нужен паспорт)",
      description:
        "Здание снаружи выглядит будто гуляешь по Питеру или европейскому городку. А внутри — настоящий дворец: лепнина, золото, картины. Можно сделать классные и необычные фотки на память, заглянуть в сувенирные лавочки внутри дворца — там много интересного.",
      duration: "1-2 часа",
      directions:
        "На автобусе №14 经纬街站 проехать 16 остановок до остановки 和平小区站",
      travelTime: "53 минуты",
      baiduUrl: "https://j.map.baidu.com/8b/0mhk",
      omapsUrl: "https://omaps.app/08UYDY6ym4/",
      tips: "",
    },
  ],
  filters: {
    durations: ["30-40 минут", "1-2 часа", "Весь день"],
    priceRanges: [
      { label: "Бесплатно", range: [0, 0] },
      { label: "До 100 юаней", range: [1, 100] },
      { label: "100-200 юаней", range: [100, 200] },
      { label: "Более 200 юаней", range: [200, Infinity] },
    ],
  },
}

export default function TourExcursion() {
  const [selectedExcursion, setSelectedExcursion] = useState(null)
  const [detailOpen, setDetailOpen] = useState(false)

  const handleOpenDetail = (excursion: any) => {
    setSelectedExcursion(excursion)
    setDetailOpen(true)
  }

  // Закрыть детальную информацию
  const handleCloseDetail = () => {
    setDetailOpen(false)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Экскурсии</h2>
      <div className="grid grid-cols-1 gap-6 mt-8">
        {excursionData.excursions.map((excursion) => (
          <ExcursionCard
            key={excursion.id}
            excursion={excursion}
            onClick={() => handleOpenDetail(excursion)}
          />
        ))}

        {/* Модальное окно с детальной информацией */}
        {selectedExcursion && (
          <ExcursionDetail
            excursion={selectedExcursion}
            onClose={handleCloseDetail}
            open={detailOpen}
          />
        )}
      </div>
    </div>
  )
}

export const ExcursionCard = ({ excursion, onClick }: any) => {
  // Проверяем, бесплатно ли посещение
  const isFree = excursion.price.toLowerCase().includes("бесплатно")

  return (
    <Card
      className={cn(
        "overflow-hidden transition-shadow",
        "border-gray-100",
        "cursor-pointer hover:shadow-md"
      )}
      onClick={onClick}
    >
      <CardHeader className="p-4 border-b border-gray-100">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold line-clamp-2">
            {excursion.name}
          </h3>
          <Badge
            variant={isFree && "success"}
            className={isFree ? "bg-green-100 text-green-800" : ""}
          >
            {isFree ? "Бесплатно" : "Платно"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {excursion.description}
        </p>

        <div className="flex flex-col gap-2 text-sm">
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-muted-foreground mr-2" />
            <span>{excursion.hours}</span>
          </div>

          <div className="flex items-center">
            {isFree ? (
              <Ticket className="h-4 w-4 text-green-600 mr-2" />
            ) : (
              <CircleDollarSign className="h-4 w-4 text-muted-foreground mr-2" />
            )}
            <span className="line-clamp-1">{excursion.price}</span>
          </div>

          <div className="flex items-center">
            <Info className="h-4 w-4 text-muted-foreground mr-2" />
            <span>{excursion.duration}</span>
          </div>

          <div className="flex items-start">
            <MapPin className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
            <span className="line-clamp-1">{excursion.address}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-4 py-3 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center w-full text-sm justify-between font-medium text-gray-700">
          <div className="text-primary line-clamp-1">
            {excursion.directions}
            <div>{excursion.travelTime}</div>
          </div>
          <Button>Подробнее</Button>
        </div>
      </CardFooter>
    </Card>
  )
}
