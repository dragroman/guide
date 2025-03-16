import { ApplicationSchemaType } from "./schemas/applicationSchema"

export const TOTAL_STEPS = 6

export const STEPS = [
  { title: "Знакомство", description: "Как к вам обращаться" },
  { title: "Поездка", description: "Даты и цели" },
  { title: "Размещение", description: "Где вы хотите остановиться" },
  { title: "Кухня", description: "Что поесть" },
  { title: "Контакты", description: "Как с вами связаться" },
  { title: "Подтверждение", description: "Проверьте введенные данные" },
]

export const defaultFormValues: ApplicationSchemaType = {
  name: "",
  peopleCount: 1,
  ageGroups: {
    adults: 1,
  },
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
  dateRange: undefined,
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
  foodPreferences: {
    cuisine: {
      chinese: false,
      european: false,
      japanese: false,
      russian: false,
      other: false,
      otherDescription: "",
    },
    preferences: {
      tryLocal: false,
      spicyOk: false,
      fattyOk: false,
      other: false,
      otherDescription: "",
    },
  },
}
