import { ApplicationSchemaType } from "./schemas/applicationSchema"

export const TOTAL_STEPS = 7

export const STEPS = [
  { title: "Знакомство", description: "Как к вам обращаться" },
  { title: "Поездка", description: "Даты и цели" },
  { title: "Размещение", description: "Где вы хотите остановиться" },
  { title: "Транспорт", description: "Как передвигаться" },
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

  contact: {
    phone: "",
    email: "",
  },

  trip: {
    dateRange: undefined,
    daysCount: null,
    purpose: {
      options: {
        excursion: false,
        business: false,
        shopping: false,
        food: false,
        fun: false,
        health: false,
        other: false,
      },
      otherDescription: "",
    },
  },

  accommodation: {
    options: {
      hotel3: false,
      hotel4: false,
      hotel5: false,
      apartment: false,
      hostel: false,
      other: false,
      otherDescription: "",
    },
    preferences: {
      centralLocation: false,
      nearShoppingCenters: false,
      poolAndSpa: false,
      other: false,
      otherDescription: "",
    },
  },

  transport: {
    transfer: {
      airport: false,
      individual: false,
      shuttle: false,
      none: false,
      other: false,
      otherDescription: "",
    },
    preferences: {
      privateDriver: false,
      publicTransport: false,
      taxi: false,
      other: false,
      otherDescription: "",
    },
  },

  food: {
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
