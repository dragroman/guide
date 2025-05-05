import {
  baseInfoData,
  mapPointsData,
  restaurantData,
  excursionData,
  shoppingData,
} from "@/data/tour/yakutsk"
import TourPage from "@/components/tour/TourPage"

export const metadata = {
  title: "Харбин для детей: наука, природа и приключения",
  description:
    "Увлекательное путешествие, где каждый день наполнен новыми открытиями для детей и родителей",
}

export default function YakutskTour() {
  return (
    <TourPage
      baseInfoData={baseInfoData}
      mapPointsData={mapPointsData}
      restaurantData={restaurantData}
      excursionData={excursionData}
      shoppingData={shoppingData}
    />
  )
}
