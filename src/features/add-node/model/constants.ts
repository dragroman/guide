export const POPULAR_CATEGORIES = [
  { id: "6a8631d4-c78a-4afc-b6c6-88cad3a74976", name: "Ресторан" },
  { id: "54d9907a-95cb-4f5f-a6ba-f5493a117540", name: "Отель" },
  { id: "336ffaca-af66-4963-bf2e-e3418b47a8b4", name: "Достопримечательность" },
]

export const POPULAR_CITIES = [
  { id: "a1ebf855-942e-46fe-92e8-29e5c45a22cb", name: "Пекин" },
  { id: "bc25db21-f7e8-4067-958a-6c19309bec4a", name: "Шанхай" },
  { id: "a00ca23f-05ba-4a9d-80a5-500ae07fa82f", name: "Гуанчжоу" },
  { id: "6018a03f-e05e-48f3-b007-ece4fad4fed6", name: "Циндао" },
  { id: "e45d43cf-84b0-40d1-b193-f1b4135ceb50", name: "Харбин" },
]

export const CATEGORY_IDS = {
  RESTAURANT: ["6a8631d4-c78a-4afc-b6c6-88cad3a74976"] as string[], // UUID ресторанов
  HOTEL: ["4"] as string[], // UUID отелей
  ATTRACTION: ["5"] as string[], // UUID достопримечательностей
} as const

export const CUISINE_OPTIONS = [
  { value: "japanese", label: "Японская кухня" },
  { value: "european", label: "Европейская кухня" },
  { value: "russian", label: "Русская кухня" },
  { value: "korean", label: "Корейская кухня" },
  { value: "chinese", label: "Китайская кухня" },
]

export const ATTRACTION_OPTIONS = [
  { value: "museum", label: "Музей" },
  { value: "park", label: "Парк" },
  { value: "sightseeing", label: "Обзорная" },
  { value: "attraction", label: "Аттракцион" },
]

export const HOTEL_STARS_OPTIONS = [
  { value: "1", label: "1 звезда" },
  { value: "2", label: "2 звезды" },
  { value: "3", label: "3 звезды" },
  { value: "4", label: "4 звезды" },
  { value: "5", label: "5 звезд" },
]
