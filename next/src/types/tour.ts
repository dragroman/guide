export type TourFeature = {
  title: string
  content: string
}

export type Accommodation = {
  label: string
  name: string
  urlMap: string
}

export type Remark = {
  title: string
  description: string
}

export type Highlight = {
  icon: React.ComponentType<any>
  title: string
  description: string
}

interface TourHeaderProps {
  title: string
  subtitle: string
  dates: string
  duration: string
  imagePath: string
  badges: string[]
}

export type BaseInfo = {
  features: TourFeature[]
  ageGroups: string
  accommodation: Accommodation
  header: TourHeaderProps
  remarks: Remark
  highlights: Highlight[]
  personal: {
    title: string
    text: string
  }
  options: {
    icon: React.ComponentType<any>
    label: string
    price: string
  }[]
  application: TourApplication
  cta: {
    title: string
    description: string
    primaryButtonText: string
    secondaryButtonText: string
  }
}

export type TourApplication = {
  name: string
  group: string
  dates: string
  budget: string
  tags: string[]
  pdf: string
}

export type Tag = {
  label: string
  color: string
}

export type Restaurant = {
  id: number
  name: string
  category: string
  address: string
  cuisine: string
  hours: string
  rating: string
  avgPrice: string
  description: string
  popularDishes: string
  directions: string
  travelTime: string
  baiduUrl: string
  omapsUrl: string
  tips: string
}

export type RestaurantData = Restaurant[]

export type Excursion = {
  id: number
  name: string
  address: string
  hours: string
  price: string
  description: string
  duration: string
  directions: string
  travelTime: string
  baiduUrl: string
  omapsUrl: string
  tips: string
}

export type ExcursionData = Excursion[]

export type ShoppingPlace = {
  id: number
  name: string
  category: string
  address: string
  hours: string
  description: string
  directions: string
  baiduUrl: string
  omapsUrl: string
}

export type ShoppingData = ShoppingPlace[]
