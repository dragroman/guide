import { ApplicationSchemaType } from "./applicationSchema";

// Значения формы по умолчанию
export const defaultFormValues: ApplicationSchemaType = {
  name: "",
  peopleCount: 1,
  ageGroups: {
    adults: 1,
  },
  city: "",
  cityInternalId: 0,
  cities: [],
  citiesInternalIds: [],
  expertEmail: "",

  contact: {
    phone: "",
    email: "",
    wechat: "",
    telegram: "",
    whatsapp: "",
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
    needBreakfast: false,
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
      noSpicy: false,
      noFatty: false,
      vegetarian: false,
      halal: false,
      other: false,
      otherDescription: "",
    },
  },

  shopping: {
    budget: {
      economy: false,
      medium: false,
      luxury: false,
    },
    shoppingPlaces: {
      malls: false,
      boutiques: false,
      markets: false,
      online: false,
      outlets: false,
      other: false,
      otherDescription: "",
    },
    specialWishes: "",
    shoppingTime: {
      fewHours: false,
      halfDay: false,
      fullDay: false,
    },
    deliveryServices: {
      needed: false,
    },
  },
  budget: 0,
  needVisa: false,
  needInsurance: false,
  needGuide: false,
}
