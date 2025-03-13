import { ApplicationSchemaType } from "./types"

export const TOTAL_STEPS = 5

export const STEPS = [
  { title: "Личная информация", description: "Как к вам обращаться" },
  { title: "Контактные данные", description: "Как с вами связаться" },
  { title: "Дата и цель поездки", description: "Даты и цели" },
  { title: "Размещение", description: "Где вы хотите остановиться" },
  { title: "Подтверждение", description: "Проверьте введенные данные" },
]

export const defaultFormValues: ApplicationSchemaType = {
  name: "",
  phone: "",
  email: "",
  tripPurpose: {
    excursion: false,
    business: false,
    shopping: false,
    food: false,
    fun: false,
    other: false,
    otherDescription: "",
  },
  dateRange: {
    from: undefined,
    to: undefined,
  },
  daysCount: null,
  accommodation: {
    hotel3: false,
    hotel4: false,
    hotel5: false,
    apartment: false,
    hostel: false,
    other: false,
    otherDescription: "",
  },
  accommodationPreferences: {
    centralLocation: false,
    nearShoppingCenters: false,
    poolAndSpa: false,
    other: false,
    otherDescription: "",
  },
}
