// components/tours/TourPageWithData.tsx
import { TourHeader } from "./TourHeader"
import { TourDetailContainer } from "./TourDetailContainer"
import { TourCta } from "./TourCta"
import TourMapPoints, { MapPoints } from "./tabs/TourMapPoints"
import TourRestaurant from "./tabs/TourRestaurant"
import TourExcursion from "./tabs/TourExcursion"
import TourShopping from "./tabs/TourShopping"
import TourBaseInfo from "./tabs/TourBaseInfo"
import TourAdditional from "./tabs/TourAdditional"
import {
  BaseInfo,
  ExcursionData,
  RestaurantData,
  ShoppingData,
} from "@shared/types/tour"

export const metadata = {
  title: "Харбин для детей: наука, природа и приключения",
  description:
    "Увлекательное путешествие, где каждый день наполнен новыми открытиями для детей и родителей",
}

export default function TourPage({
  baseInfoData,
  mapPointsData,
  restaurantData,
  excursionData,
  shoppingData,
}: {
  baseInfoData: BaseInfo
  mapPointsData: MapPoints
  restaurantData: RestaurantData
  excursionData: ExcursionData
  shoppingData: ShoppingData
}) {
  const tourTabs = [
    {
      id: "info",
      label: "Информация",
      content: <TourBaseInfo baseInfoData={baseInfoData} />,
    },
    {
      id: "restaurant",
      label: "Рестораны",
      content: <TourRestaurant restaurantData={restaurantData} />,
    },
    {
      id: "excursion",
      label: "Экскурсии",
      content: <TourExcursion excursionData={excursionData} />,
    },
    {
      id: "shopping",
      label: "Шоппинг",
      content: <TourShopping shoppingData={shoppingData} />,
    },

    {
      id: "other",
      label: "Другое",
      content: <TourMapPoints mapPointsData={mapPointsData} />,
    },
  ]

  return (
    <>
      <div className="flex flex-col space-y-4">
        <TourHeader
          title={baseInfoData.header.title}
          subtitle={baseInfoData.header.subtitle}
          dates={baseInfoData.header.dates}
          duration={baseInfoData.header.duration}
          imagePath={baseInfoData.header.imagePath}
          badges={baseInfoData.header.badges}
        />
        {/* Основной контент */}
        <TourDetailContainer tabs={tourTabs} defaultTab="info" />

        {/* Дополнительный контент */}
        <TourAdditional application={baseInfoData.application} />
        <TourCta
          title={baseInfoData.cta.title}
          description={baseInfoData.cta.description}
          primaryButtonText={baseInfoData.cta.primaryButtonText}
          secondaryButtonText={baseInfoData.cta.secondaryButtonText}
        />
      </div>
    </>
  )
}
