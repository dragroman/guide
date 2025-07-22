export const DAYS = [
  { value: 0, label: "Воскресенье", short: "Вс" },
  { value: 1, label: "Вторник", short: "Вт" },
  { value: 2, label: "Среда", short: "Ср" },
  { value: 3, label: "Четверг", short: "Чт" },
  { value: 4, label: "Пятница", short: "Пт" },
  { value: 5, label: "Суббота", short: "Сб" },
  { value: 6, label: "Понедельник", short: "Пн" },
]

// Предустановки часов работы
export const PRESETS = {
  restaurant: {
    name: "Ресторан",
    hours: [
      { day: 0, starthours: 1100, endhours: 2300 },
      { day: 1, starthours: 1100, endhours: 2300 },
      { day: 2, starthours: 1100, endhours: 2300 },
      { day: 3, starthours: 1100, endhours: 2300 },
      { day: 4, starthours: 1100, endhours: 2400 },
      { day: 5, starthours: 1100, endhours: 2400 },
      { day: 6, starthours: 1200, endhours: 2300 },
    ],
  },
  cafe: {
    name: "Кафе",
    hours: [
      { day: 0, starthours: 800, endhours: 2200 },
      { day: 1, starthours: 800, endhours: 2200 },
      { day: 2, starthours: 800, endhours: 2200 },
      { day: 3, starthours: 800, endhours: 2200 },
      { day: 4, starthours: 800, endhours: 2300 },
      { day: 5, starthours: 900, endhours: 2300 },
      { day: 6, starthours: 900, endhours: 2200 },
    ],
  },
  government: {
    name: "Гос. учреждение",
    hours: [
      { day: 1, starthours: 900, endhours: 1800 },
      { day: 2, starthours: 900, endhours: 1800 },
      { day: 3, starthours: 900, endhours: 1800 },
      { day: 4, starthours: 900, endhours: 1800 },
      { day: 5, starthours: 900, endhours: 1700 },
    ],
  },
  museum: {
    name: "Музей",
    hours: [
      { day: 1, starthours: 1000, endhours: 1800 },
      { day: 2, starthours: 1000, endhours: 1800 },
      { day: 3, starthours: 1000, endhours: 1800 },
      { day: 4, starthours: 1000, endhours: 1800 },
      { day: 5, starthours: 1000, endhours: 1800 },
      { day: 6, starthours: 1000, endhours: 1800 },
    ],
  },
  bank: {
    name: "Банк",
    hours: [
      { day: 0, starthours: 900, endhours: 1800 },
      { day: 1, starthours: 900, endhours: 1800 },
      { day: 2, starthours: 900, endhours: 1800 },
      { day: 3, starthours: 900, endhours: 1800 },
      { day: 4, starthours: 900, endhours: 1700 },
    ],
  },
  shop: {
    name: "Магазин",
    hours: [
      { day: 0, starthours: 1000, endhours: 2200 },
      { day: 1, starthours: 1000, endhours: 2200 },
      { day: 2, starthours: 1000, endhours: 2200 },
      { day: 3, starthours: 1000, endhours: 2200 },
      { day: 4, starthours: 1000, endhours: 2200 },
      { day: 5, starthours: 1000, endhours: 2200 },
      { day: 6, starthours: 1000, endhours: 2100 },
    ],
  },
  clinic: {
    name: "Поликлиника",
    hours: [
      { day: 0, starthours: 800, endhours: 2000 },
      { day: 1, starthours: 800, endhours: 2000 },
      { day: 2, starthours: 800, endhours: 2000 },
      { day: 3, starthours: 800, endhours: 2000 },
      { day: 4, starthours: 800, endhours: 2000 },
      { day: 5, starthours: 900, endhours: 1800 },
    ],
  },
  park: {
    name: "Парк",
    hours: [
      { day: 0, all_day: true },
      { day: 1, all_day: true },
      { day: 2, all_day: true },
      { day: 3, all_day: true },
      { day: 4, all_day: true },
      { day: 5, all_day: true },
      { day: 6, all_day: true },
    ],
  },
}
