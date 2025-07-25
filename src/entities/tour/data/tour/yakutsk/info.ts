import {
  Leaf,
  Rocket,
  ShoppingBag,
  UtensilsCrossed,
  UserCircle2Icon,
} from "lucide-react"

export const baseInfoData = {
  features: [
    {
      title: "Питание",
      content:
        "Китайская, Японская, Попробовать местную кухню. Русская еда, Макдональдс",
    },
    {
      title: "Транспорт",
      content:
        "Комбинация общественного транспорта и такси по запросу клиента, требуется трансфер",
    },
    {
      title: "Шоппинг",
      content: "Торговые центры аутлеты, электроника, Uniqlo, Zara",
    },
  ],
  ageGroups: "Взрослые 5 человек",
  accommodation: {
    label: "Отель 4* в центре",
    name: "金爵精品酒店(哈尔滨西站万达广场店)",
    urlMap: "https://j.map.baidu.com/56/wgh",
  },
  remarks: {
    title: "",
    description: "",
  },
  highlights: [
    {
      icon: Rocket,
      title: "Культурные экскурсии",
      description:
        "Посещение главных достопримечательностей и музеев Харбина с русскоговорящим гидом",
    },
    {
      icon: UtensilsCrossed,
      title: "Гастрономические открытия",
      description: "Рестораны традиционной китайской кухней и другие рестораны",
    },
    {
      icon: ShoppingBag,
      title: "Шоппинг в лучших местах",
      description:
        "Посещение торговых центров и аутлетов с качественными спортивными товарами",
    },
    {
      icon: Leaf,
      title: "Комфортные перемещения",
      description:
        "Оптимальное сочетание общественного транспорта и такси для экономии времени",
    },
  ],
  personal: {
    title: "Описание тура",
    text: "Персональный тур в Харбин для группы из Якутска: культурные экскурсии, гастрономические открытия, шоппинг, комфортное размещение в центре, индивидуальный подход и трансфер. Всё для ярких впечатлений и удобства путешествия.",
  },
  options: [
    {
      icon: UserCircle2Icon,
      label: "Личный шоппинг-гид",
      price: "+1000¥ за день",
    },
  ],
  header: {
    title: "Харбин: гастрономия, шоппинг и культура",
    subtitle: "Персонализированное путешествие для группы из Якутска в Харбин",
    dates: "05 мая – 13 мая 2025",
    duration: "7 дней",
    imagePath: "/harbin-family.jpg",
    badges: ["Шоппинг", "Гастрономические открытия", "Культурные экскурсии"],
  },

  application: {
    name: "Туйаара",
    group: "5 взрослых",
    dates: "05.05 - 13.05.2025",
    budget: "7000 - 14000 ₽/чел",
    tags: ["Экскурсии", "Шоппинг", "Гастрономия"],
    pdf: "",
  },
  cta: {
    title: "Связь с экспертом",
    description:
      "Мы внимательно изучили вашу заявку и подготовили персонализированный маршрут с учетом всех пожеланий, включая особые диетические требования вашего ребенка. Готовы обсудить детали и внести корректировки.",
    primaryButtonText: "Позвонить",
    secondaryButtonText: "Whatsapp",
  },
}
