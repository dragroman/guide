"use client"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Clock, MapPin, ShoppingBag, Building, Store } from "lucide-react"
import { useState } from "react"
import { ShoppingDetail } from "./ShoppingDetail"
import { Button } from "@/components/ui/button"

export const shoppingData = {
  places: [
    {
      id: 1,
      name: "Euro Plaza 金安国际购物广场",
      category: "Одежда, обувь",
      address: "道里区-中央大街69号",
      hours: "09:30-21:00",
      description: "Торговый центр масмаркет. Есть Zara",
      directions:
        "Пешком из гостиницы по центральной пешеходной улице сторону набережной",
      baiduUrl: "https://j.map.baidu.com/fd/JZhk",
      omapsUrl: "https://omaps.app/08UYCwTTAS/",
    },
    {
      id: 2,
      name: "枫叶小镇奥特莱斯",
      category: "Аутлет",
      address: "松北区中源大道16999号",
      hours: "09:30-20:30",
      description:
        "Архитектура Maple Town напоминает сказочные замки 🏰, а цены на брендовые товары иногда опускаются до двух- или трехзначных чисел 😍. Отличное соотношение цены и качества 👌.",
      directions: "На такси 40-50 юаней",
      baiduUrl: "https://j.map.baidu.com/4c/rZhk",
      omapsUrl: "https://omaps.app/w8UNc2NJKP/",
    },
    {
      id: 3,
      name: "杉杉奥特莱斯广场",
      category: "Аутлет",
      address: "呼兰区利民大道555号",
      hours: "10:00-21:00",
      description: "Есть много спортивных брендов на скидке",
      directions: "На такси 60-80 юаней",
      baiduUrl: "https://j.map.baidu.com/74/HThk",
      omapsUrl: "https://omaps.app/o8UNf_JFF6/",
    },
    {
      id: 4,
      name: "松雷商业（南岗店）",
      category: "Одежда, обувь, косметика",
      address: "南岗区东大直街329号",
      hours: "09:00-21:30",
      description: "Большой выбор известных марок косметики",
      directions:
        "На метро 2 ветка зеленая 尚志大街站 shangzhistreet до остановки 博物馆站Museum of Heilongjiang Province выход 1 здание Songlei",
      baiduUrl: "https://j.map.baidu.com/e1/tyhk",
      omapsUrl: "",
    },
    {
      id: 5,
      name: "卓展购物中心（安红街)",
      category: "Одежда, обувь, косметика",
      address: "道里区安隆街106号",
      hours: "10:00-21:30",
      description:
        "Здесь представлен самый полный ассортимент люксовых брендов",
      directions:
        "На автобусе №206 остановка 哈一百站 проехать 5 остановок, выйти на остановке 安和街站 пешком еще пройти 583м",
      baiduUrl: "https://j.map.baidu.com/44/kRhk",
      omapsUrl: "https://omaps.app/08UYCHuLDU/",
    },
    {
      id: 6,
      name: "远大购物中心（南岗店",
      category: "Одежда, обувь, косметика",
      address: "南岗区荣市街18号",
      hours: "09:30-21:00",
      description: "Находится рядом с тц Сунлей",
      directions:
        "На метро 2 ветка зеленая 尚志大街站 shangzhistreet до остановки 博物馆站Museum of Heilongjiang Province выход 4",
      baiduUrl: "https://j.map.baidu.com/e1/tyhk",
      omapsUrl: "",
    },
    {
      id: 7,
      name: "西城红场",
      category: "Одежда, обувь, косметика",
      address: "哈西大街299号",
      hours: "09:30-21:00",
      description:
        "Здесь вы найдете множество модных брендов локальных и ресторанов. Также можно посетить выставки которые проводятся в атриуме",
      directions:
        "На автобусе №64 остановка 哈一百站 проехать 20 остановок, выйти на остановке 北兴街站 пешком еще пройти 221м",
      baiduUrl: "https://j.map.baidu.com/f4/Hthk",
      omapsUrl: "https://omaps.app/w8USqupMR5/",
    },
    {
      id: 8,
      name: "哈西万达广场",
      category: "Одежда, обувь",
      address: "南岗区-中兴大道168号",
      hours: "09:30-21:00",
      description: "Торговый центр где есть второй магазин Zara",
      directions:
        "На автобусе №83 остановка 哈一百站 проехать 27 остановок, выйти на остановке 哈西万达广场站",
      baiduUrl: "https://j.map.baidu.com/71/-dKk",
      omapsUrl: "https://omaps.app/08USqrR56y/",
    },
    {
      id: 9,
      name: "红博中央公园",
      category: "Одежда, обувь",
      address: "南岗区-红旗大街339号",
      hours: "09:30-21:00",
      description: "Большой торговый центр. Минус: нет zara, h&m",
      directions:
        "На автобусе №5 中央大街（经纬街）站 проехать 14 остановок выйти на 淮河路站 и пройти 399 метров пешком",
      baiduUrl: "https://j.map.baidu.com/fb/Slhk",
      omapsUrl: "https://omaps.app/w8UYDHUEHV/",
    },
    {
      id: 10,
      name: "曼哈顿潮力场",
      category: "Сувениры, товары для дома",
      address: "道里区-透笼街58号",
      hours: "08:45-21:30",
      description: "Рынок",
      directions: "Пешком 825 метров рядом с Софийской площадью",
      baiduUrl: "https://j.map.baidu.com/e7/3ahk",
      omapsUrl: "https://omaps.app/48UYCbmm96/",
    },
  ],
  filters: {
    categories: [
      "Аутлет",
      "Одежда, обувь",
      "Одежда, обувь, косметика",
      "Сувениры, товары для дома",
    ],
    transportModes: ["Пешком", "Метро", "Автобус", "Такси"],
  },
}

export default function TourShopping() {
  const [selectedShopping, setSelectedShopping] = useState(null)
  const [detailOpen, setDetailOpen] = useState(false)

  const handleOpenDetail = (shopping: any) => {
    setSelectedShopping(shopping)
    setDetailOpen(true)
  }

  const handleCloseDetail = () => {
    setDetailOpen(false)
  }

  // Функция для определения иконки категории
  const getCategoryIcon = (category: string) => {
    if (category.includes("Аутлет")) return <Store className="h-5 w-5" />
    if (category.includes("Сувениры"))
      return <ShoppingBag className="h-5 w-5" />
    return <Building className="h-5 w-5" />
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Шоппинг</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
        {shoppingData.places.map((shopping) => (
          <ShoppingCard
            key={shopping.id}
            shopping={shopping}
            onClick={() => handleOpenDetail(shopping)}
            icon={getCategoryIcon(shopping.category)}
          />
        ))}

        {/* Модальное окно с детальной информацией */}
        {selectedShopping && (
          <ShoppingDetail
            shopping={selectedShopping}
            onClose={handleCloseDetail}
            open={detailOpen}
          />
        )}
      </div>
    </div>
  )
}

export const ShoppingCard = ({ shopping, onClick, icon }: any) => {
  // Проверяем, если место можно дойти пешком
  const isWalkable = shopping.directions.toLowerCase().includes("пешком")

  return (
    <Card
      className={cn(
        "overflow-hidden transition-shadow cursor-pointer hover:shadow-md",
        "h-full flex flex-col border-gray-100"
      )}
      onClick={onClick}
    >
      <CardHeader className="p-4 border-b border-gray-100">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold line-clamp-2">
            {shopping.name}
          </h3>
          {icon}
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          <Badge
            variant={isWalkable ? "default" : "secondary"}
            className={isWalkable ? "bg-green-100 text-green-800" : ""}
          >
            {shopping.category}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-4 flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {shopping.description}
        </p>

        <div className="flex flex-col gap-2 text-sm">
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-muted-foreground mr-2" />
            <span>{shopping.hours}</span>
          </div>

          <div className="flex items-start">
            <MapPin className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
            <span className="line-clamp-1">{shopping.address}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-4 py-3 bg-gray-50 border-t border-gray-100 mt-auto">
        <div className="flex w-full justify-between">
          <div className="text-sm font-medium text-gray-700 line-clamp-1">
            {shopping.directions}
          </div>
          <Button>Подробнее</Button>
        </div>
      </CardFooter>
    </Card>
  )
}
