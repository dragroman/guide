type Rating = 1 | 2 | 3 | 4 | 5

type RestaurantCategory =
  | "ресторан"
  | "кафе"
  | "чайная"
  | "кофейня"
  | "фуршет"
  | "самовар"
  | "шашлычная"
type Cuisine =
  | "китайская"
  | "японская"
  | "русская"
  | "европейская"
  | "корейская"

type PopularDish = {
  photo: string
  name: string
  ingredients: string
  spiciness: boolean
  price: number
}

type Restaurant = {
  name: string
  photos: string[]
  category: RestaurantCategory
  cuisine: Cuisine[]
  rating: Rating
  priceRange: number
  workingHours: string
  description: string
  popularDishes: PopularDish[]
  addressChinese: string
  phone: string
  mapLink: string
}

type Attraction = {
  photo: string
  nameRussian: string
  nameChinese: string
  addressChinese: string
  workingHours: string
  ticketPrice: string
  mapLink: string
  transport: string
}

type SpaCategory = "спа" | "массаж" | "косметология" | "медицина"

type Spa = {
  photo: string
  nameRussian: string
  nameChinese: string
  serviceType: SpaCategory
  description: string
  rating: Rating
  addressChinese: string
  workingHours: string
  priceFrom: number
  mapLink: string
  transport: string
}

type Entertainment = {
  photo: string
  nameRussian: string
  nameChinese: string
  addressChinese: string
  rating: Rating
  workingHours: string
  ticketPrice: string
  mapLink: string
  transport: string
}

type ShoppingCategory =
  | "торговый центр"
  | "рынок"
  | "брендовый бутик"
  | "аутлеты"
type ShoppingItemCategory = "одежда" | "электроника" | "сувениры"
type Brands = "adidas" | "nike" | "puma" | "new balance"

type Shopping = {
  photo: string
  nameRussian: string
  nameChinese: string
  category: ShoppingCategory
  itemCategories: ShoppingItemCategory[]
  workingHours: string
  description: string
  popularBrands: Brands[]
  addressChinese: string
  mapLink: string
  transport: string
}

type Bathhouse = {
  photo: string
  nameRussian: string
  nameChinese: string
  rating: Rating
  addressChinese: string
  workingHours: string
  ticketPrice: string
  mapLink: string
  transport: string
}
