"use client"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
  CardHeader,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { CircleDollarSign, Clock, MapPin, Star } from "lucide-react"
import { useState } from "react"
import { RestaurantDetail } from "./RestaurantDetail"
import { Button } from "@/components/ui/button"

export const restaurantData = {
  restaurants: [
    {
      id: 1,
      name: "Косой переулок, 37 в стиле Гарри Поттера 37号斜角巷",
      category: "Кафе",
      address: "道里区-霞曼街37号中央尚座公寓隔壁",
      cuisine: "",
      hours: "10:00-02:00",
      rating: "4.7",
      avgPrice: "65",
      description:
        "Интерьер - стилизация под Хогвартс и волшебный мир: книги заклинаний, мантия Слизерина/Гриффиндора для фото",
      popularDishes:
        "Кофе с золотым снитчем, сливочное пиво(безалкогольный аналог), десерты в виде шоколадных лягушек, торты распределяющая шляпа",
      directions: "Пешком 549 метров",
      travelTime: "8 минут",
      baiduUrl: "https://j.map.baidu.com/cd/u8hk",
      omapsUrl: "https://omaps.app/48UYCavda5/",
      tips: "",
    },
    {
      id: 2,
      name: "Японский Шведский стол Барбекю (Хуиджи Буффет)",
      category: "Шведский стол",
      address:
        "道里区-中央大街66号松雷国际商厦(道里店)底商L1 на лифте подняться до 3 этажа",
      cuisine: "Разнообразная",
      hours: "С 9:00-16:00 и 16:00-21:00",
      rating: "",
      avgPrice: "64 юаня с человека",
      description:
        "Мясо, морепродукты, вино, фрукты. Можно приготовить самому, готовые блюда тоже есть",
      popularDishes: "",
      directions: "Пешком 322 метра по главной пешеходной улице",
      travelTime: "4 минуты",
      baiduUrl: "https://j.map.baidu.com/9e/MPhk",
      omapsUrl: "https://omaps.app/_8UYCa5MHd/",
      tips: "微辣/ 不要辣的- не острое. Как сказать на китайском, что у меня сильная аллергия на молочные продукты и яйцо? 我对乳制品和鸡蛋严重过敏。",
    },
    {
      id: 3,
      name: "红场全鸭季HENNA(西城红场店)",
      category: "Ресторан",
      address: "南岗区北兴街26号",
      cuisine: "Китайская",
      hours: "11:30-20:30",
      rating: "4.5",
      avgPrice: "164",
      description:
        "Это известный ресторан утки по-пекински, знаменитый своими традиционными пекинскими вкусами, с более чем 70-летней историей. Харбинский Quan Ya Ji был основан 1949 году и сохранил ранние технологии приготовления утки по-пекински.",
      popularDishes:
        "1.Утка по-пекински 烤鸭 188 юаней 2. Пирожное Черный лебедь 黑天鹅酥 9.8 юаней 3.Тофу с морским ежом 海胆豆腐 68юаней 4. Грибные рулетки с трюфелями 5. Креветки в хрустящей корочке 招牌酥皮虾88 юаней",
      directions: "На такси. Цена 18-20юаней",
      travelTime: "27 минут",
      baiduUrl: "https://j.map.baidu.com/c2/EHgk",
      omapsUrl: "https://omaps.app/48USquq_xj/",
      tips: "微辣/ 不要辣的- не острое. Аллергия по-китайски: 我对乳制品和鸡蛋严重过敏。",
    },
    {
      id: 4,
      name: "Лао Чу Дзя. Старый Повар. 老厨家 (中央大街店)",
      category: "Ресторан",
      address: "道里区-西七道街55-1号巴拉斯美食城三楼",
      cuisine: "Китайская",
      hours: "10:30-21:00",
      rating: "4.5",
      avgPrice: "70 юаней",
      description:
        "Легендарный ресторан северо-восточной кухни на Центральной улице. Этот ресторан — must-visit для гурманов, желающих попробовать аутентичные блюда Северо-Восточного Китая. Он славится исторической атмосферой и фирменными блюдами, которые готовят по традиционным рецептам.",
      popularDishes:
        "锅包肉 (Guō bāo ròu) – «Харбинская сладко-кислая свинина» Хрустящие кусочки свинины в карамелизованном соусе. 地三鲜 (Dì sān xiān) – «Три деликатеса с земли». 哈尔滨红肠 (Hā'ěrbīn hóng cháng) – Харбинская красная колбаса",
      directions: "Пешком 757 метров по главной пешеходной улице",
      travelTime: "11 минут",
      baiduUrl: "https://j.map.baidu.com/8e/r1hk",
      omapsUrl: "https://omaps.app/_8UYCPqkjz/",
      tips: "微辣/ 不要辣的- не острое. Как сказать на китайском, что у меня аллергия: 我对乳制品和鸡蛋严重过敏。",
    },
    {
      id: 5,
      name: "同合居民间菜馆 (Тунхэцзюй)",
      category: "Ресторан",
      address: "道里区-霞曼街松雷国际商厦2F",
      cuisine: "Китайская",
      hours: "09:30-21:00",
      rating: "4.6",
      avgPrice: "59 юаней",
      description:
        "Это традиционный ресторан северо-восточной кухни. Северо-восточная кухня популярна в Китае благодаря своим насыщенным вкусам и домашнему уюту. Если вы хотите попробовать что-то сытное и традиционное, то это отличный выбор!",
      popularDishes:
        "东北锅包肉— Жареные кусочки свинины в кисло-сладком соусе 45 юаней, 同合居招牌干炸丸子 фирменные жареные фрикадельки Тунхэцзюй 46 юаней, 原汁牛肉 тушеная говядина в собственном соку 59 юаней",
      directions: "Пешком 457 метров по главной пешеходной улице",
      travelTime: "7 минут",
      baiduUrl: "https://j.map.baidu.com/03/fWhk",
      omapsUrl: "",
      tips: "微辣/ 不要辣的- не острое. Аллергия: 我对乳制品和鸡蛋严重过敏。",
    },
    {
      id: 6,
      name: "Chez Lily 舍莉莉西餐厅",
      category: "Ресторан",
      address: "南岗区学府路凯德广场5楼花园旁",
      cuisine: "Европейская кухня",
      hours: "10:30-20:30",
      rating: "4.7",
      avgPrice: "107",
      description: "Европейский семейный ресторан",
      popularDishes:
        "茜茜公主慢烤- нежное жаркое из баранины от принцессы Сиси 68 юаней, 扒澳洲西冷牛排 стейк из австралийской говядины(стриплойн) 128 юаней, 芒果蟹肉 салат из краба и манго 38 юаней",
      directions:
        "На автобусе 106 с остановки 中央大街站 проехать 10 остановок и выйти на остановке 哈师大附中站 и пройти 270 метров до ТЦ",
      travelTime: "41 минута",
      baiduUrl: "https://j.map.baidu.com/d3/XSgk",
      omapsUrl: "",
      tips: "微辣/ 不要辣的- не острое. Аллергия: 我对乳制品和鸡蛋严重过敏。",
    },
    {
      id: 7,
      name: "Самовар半溪隐山",
      category: "Ресторан",
      address: "道里区融江路3030-6号翠湖新天地11栋商墅",
      cuisine: "Китайская",
      hours: "11:30-21:30",
      rating: "4.8",
      avgPrice: "266",
      description: "Китайский самовар премиум класса",
      popularDishes:
        "3D雪花羔羊 Мраморная молодая баранина с 3D нарезкой от 430 юаней, 石斑鲍鱼海鲜拼 Морское ассорти с окунем и морским ушком 298 юаней, 茅台熟醉蟹 Деликатесные крабы ферментированные в выдержанном Маотае 68 юаней",
      directions: "На такси 18-20 юаней",
      travelTime: "22 минуты",
      baiduUrl: "https://j.map.baidu.com/47/oVhk",
      omapsUrl: "",
      tips: "微辣/ 不要辣的- не острое. Аллергия: 我对乳制品和鸡蛋严重过敏。",
    },
  ],
  filters: {
    categories: ["Кафе", "Шведский стол", "Ресторан"],
    cuisines: ["Разнообразная", "Китайская", "Европейская кухня"],
    priceRanges: [
      { label: "До 100 юаней", range: [0, 100] },
      { label: "100-200 юаней", range: [100, 200] },
      { label: "Более 200 юаней", range: [200, Infinity] },
    ],
  },
}

export default function TourRestaurant() {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)
  const [detailOpen, setDetailOpen] = useState(false)
  const handleOpenDetail = (restaurant: any) => {
    setSelectedRestaurant(restaurant)
    setDetailOpen(true)
  }
  // Закрыть детальную информацию
  const handleCloseDetail = () => {
    setDetailOpen(false)
  }
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Рестораны</h2>
      <div className="grid grid-cols-1 gap-6 mt-8">
        {restaurantData.restaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            onClick={() => handleOpenDetail(restaurant)}
          />
        ))}

        {/* Модальное окно с детальной информацией */}
        {selectedRestaurant && (
          <RestaurantDetail
            restaurant={selectedRestaurant}
            onClose={handleCloseDetail}
            open={detailOpen}
          />
        )}
      </div>
    </div>
  )
}

export const RestaurantCard = ({ restaurant, onClick }: any) => {
  // Проверка рейтинга (если нет, показываем "Нет оценок")
  const rating = restaurant.rating ? parseFloat(restaurant.rating) : null

  return (
    <Card
      className={cn("overflow-hidden transition-shadow", "border-gray-100")}
      onClick={onClick}
    >
      <CardHeader className="p-4 border-b border-gray-100">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold line-clamp-2">
            {restaurant.name}
          </h3>
          {rating && (
            <div className="flex items-center bg-yellow-50 px-2 py-1 rounded text-sm">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span>{rating}</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          <Badge variant="secondary">{restaurant.category}</Badge>
          {restaurant.cuisine && (
            <Badge variant="outline" className="bg-blue-50">
              {restaurant.cuisine}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {restaurant.description}
        </p>

        <div className="flex flex-col gap-2 text-sm">
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-muted-foreground mr-2" />
            <span>{restaurant.hours}</span>
          </div>

          <div className="flex items-center">
            <CircleDollarSign className="h-4 w-4 text-muted-foreground mr-2" />
            <span>{restaurant.avgPrice}</span>
          </div>

          <div className="flex items-start">
            <MapPin className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
            <span className="line-clamp-1">{restaurant.address}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-4 py-3 bg-gray-50 border-t border-gray-100">
        <div className="flex justify-between w-full">
          <div className="text-sm font-medium text-gray-700">
            <div className="text-primary">{restaurant.directions}</div>
            <div>{restaurant.travelTime}</div>
          </div>
          <Button>Подробнее</Button>
        </div>
      </CardFooter>
    </Card>
  )
}
