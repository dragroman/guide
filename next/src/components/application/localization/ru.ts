// Тексты для компонентов формы
export const texts = {
  // Общие строки
  common: {
    next: "Далее",
    prev: "Назад",
    submit: "Отправить",
    sending: "Отправка...",
    skip: "Пропустить этот шаг",
    optional: "(можно пропустить)",
    selectMultiple: "(можно выбрать несколько)",
    selectOne: "(выберите один вариант)",
    applyButton: "Применить",
    cancelButton: "Отмена",
    clearButton: "Очистить",
  },

  // Сообщения об ошибках
  errors: {
    required: "Обязательное поле",
    nameRequired: "Имя обязательно для заполнения",
    nameMinLength: "Имя должно содержать не менее 2 символов",
    nameMaxLength: "Имя не должно превышать 100 символов",
    phoneFormat:
      "Телефон должен быть в международном формате, например +79123456789",
    emailFormat: "Email должен быть корректным",
    contactRequired: "Укажите хотя бы один способ связи",
    dateRequired: "Пожалуйста, выберите даты поездки",
    dateFromRequired: "Дата начала поездки обязательна",
    dateToRequired: "Дата окончания поездки обязательна",
    dateRange: "Дата окончания поездки не может быть раньше даты начала",
    purposeRequired: "Выберите хотя бы одну цель поездки",
    otherDescription: "Укажите описание для пункта 'Другое'",
    accommodationRequired: "Выберите хотя бы один тип размещения",
    transferRequired: "Выберите один вариант трансфера",
    cuisineRequired: "Выберите хотя бы один тип кухни",
    shoppingPlacesRequired: "Выберите хотя бы одно место для шоппинга",
    shoppingTimeRequired: "Выберите одну продолжительность шоппинга",
    formError: "Произошла ошибка при отправке формы",
  },

  // Шаг: Личная информация
  baseInfo: {
    title: "Начнем!",
    nameLabel: "Давайте знакомится",
    namePlaceholder: "Ваше имя",
    travelers: "Выберите путешественников",
    ageGroups: "Возрастные группы",
    ageGroupsDescription:
      "Укажите сколько людей и какого возраста поедут в тур",
    city: "Куда едем?",
    cityPlaceholder: "Выберите город",
  },

  // Шаг: Информация о поездке
  tripPurpose: {
    title: "Когда и зачем?",
    dateRangeLabel: "Предполагаемые даты поездки *",
    purposeQuestion: "Что приносит вам удовольствие в путешествии?",
    duration: "Продолжительность",
    selectDates: "Выберите даты",
    datePlaceholder: "Выберите даты",
    otherPurposeLabel: "Опишите вашу цель",
    otherPurposePlaceholder: "Расскажите подробнее о вашей цели поездки",

    // Цели поездки
    options: {
      excursion: {
        label: "История и культура",
        description: "музеи, архитектура, знаковые места",
      },
      business: {
        label: "Деловая поездка",
        description: "Конференции, встречи, работа",
      },
      shopping: {
        label: "Шоппинг и сувениры",
        description: "Торговые центры, рынки, местные товары",
      },
      food: {
        label: "Гастрономия",
        description: "Местная кухня, рестораны, уличная еда, дегустации",
      },
      fun: {
        label: "Развлечения и события",
        description: "Парки, мероприятия, вечеринки",
      },
      health: {
        label: "Оздоровление и релакс",
        description: "Массажи, спа-центры, стоматология, косметология",
      },
      other: {
        label: "Другое",
        description: "Что-то другое? Расскажи нам!",
      },
    },
  },

  // Шаг: Проживание
  accommodation: {
    title: "Проживание",
    question: "Твой комфорт важен! Где хотел бы остановиться?",
    preferenceQuestion: "Может быть есть дополнительные пожелания?",
    otherLabel: "Укажите предпочтения",
    otherPlaceholder: "Опишите предпочитаемый тип размещения",
    preferenceOtherLabel: "Укажите ваши пожелания",
    preferenceOtherPlaceholder: "Опишите ваши пожелания к размещению",

    // Типы размещения
    options: {
      hotel3: {
        label: "Отель 3★",
        description: "Комфортабельные номера с базовыми удобствами",
      },
      hotel4: {
        label: "Отель 4★",
        description: "Улучшенные номера с дополнительными услугами",
      },
      hotel5: {
        label: "Отель 5★",
        description: "Люксовые номера с полным спектром услуг",
      },
      apartment: {
        label: "Апартаменты",
        description: "Самостоятельное проживание с кухней и гостиной",
      },
      hostel: {
        label: "Хостел",
        description: "Бюджетное размещение в общих номерах",
      },
      other: {
        label: "Другое",
        description: "Уточните ваши особые пожелания",
      },
    },

    // Пожелания к размещению
    preferences: {
      centralLocation: {
        label: "Близость к центру",
        description: "Удобное расположение в центральной части города",
      },
      nearShoppingCenters: {
        label: "Рядом с магазинами",
        description: "Близкое расположение к торговым центрам и рынкам",
      },
      poolAndSpa: {
        label: "Бассейн и спа",
        description: "Наличие бассейна, спа-зоны и фитнес-центра",
      },
      other: {
        label: "Другое",
        description: "Другие особые пожелания к размещению",
      },
    },
  },

  // Шаг: Трансфер и транспорт
  transport: {
    title: "Трансфер",
    transferQuestion: "Нужна ли встреча в аэропорту?",
    transportQuestion: "Выбираем удобный способ передвижения",
    otherTransferLabel: "Укажите ваши пожелания к трансферу",
    otherTransferPlaceholder: "Опишите ваши пожелания к трансферу из аэропорта",
    otherTransportLabel: "Укажите ваши пожелания к транспорту",
    otherTransportPlaceholder:
      "Опишите ваши пожелания к транспорту во время тура",

    // Опции трансфера
    transfer: {
      airport: {
        label: "Трансфер из аэропорта",
        description: "Встреча в аэропорту и доставка до отеля",
      },
      individual: {
        label: "Индивидуальный",
        description: "Персональный автомобиль с водителем",
      },
      none: {
        label: "Не нужен",
        description: "Самостоятельное прибытие в отель",
      },
      other: {
        label: "Другое",
        description: "Уточните ваши особые пожелания",
      },
    },

    // Опции транспорта
    preferences: {
      privateDriver: {
        label: "Индивидуальный водитель",
        description: "Аренда автомобиля с водителем для удобства перемещений",
      },
      publicTransport: {
        label: "Общественный транспорт",
        description:
          "Передвижение на автобусах, метро и другом общественном транспорте",
      },
      taxi: {
        label: "Такси",
        description: "Использование услуг такси по необходимости",
      },
      other: {
        label: "Другое",
        description: "Уточните ваши особые пожелания к транспорту",
      },
    },
  },

  // Шаг: Питание
  food: {
    title: "Питание",
    optionalLabel: "(можно пропустить)",
    cuisineQuestion: "Какая кухня сделает твою поездку вкуснее?",
    preferencesQuestion:
      "Давай уточним: может, есть аллергия или любимые блюда?",
    otherCuisineLabel: "Укажите ваши предпочтения по кухне",
    otherCuisinePlaceholder: "Опишите ваши предпочтения по кухне",
    otherPreferenceLabel: "Укажите особые требования к питанию",
    otherPreferencePlaceholder:
      "Опишите ваши диеты, аллергии или другие требования к питанию",

    // Опции кухни
    cuisine: {
      chinese: {
        label: "Китайская кухня",
        description: "Традиционные блюда разных регионов Китая",
      },
      european: {
        label: "Европейская кухня",
        description: "Блюда из Италии, Франции и других стран Европы",
      },
      japanese: {
        label: "Японская кухня",
        description: "Суши, роллы и другие традиционные блюда Японии",
      },
      russian: {
        label: "Русская кухня",
        description: "Традиционные русские блюда и закуски",
      },
      other: {
        label: "Другое",
        description: "Другие национальные кухни и предпочтения",
      },
    },

    // Предпочтения по еде
    preferences: {
      noSpicy: {
        label: "Не острое",
        description: "Предпочитаю не острую пищу",
      },
      noFatty: {
        label: "Не жирное",
        description: "Предпочитаю не жирную пищу",
      },
      vegetarian: {
        label: "Вегетарианская",
        description: "Не ем пищу животного происхождения",
      },
      halal: {
        label: "Халяль",
        description: "Предпочитаю халяльную пищу",
      },
      other: {
        label: "Особые требования",
        description: "Диеты, аллергии или другие предпочтения",
      },
    },
  },

  // Шаг: Покупки
  shopping: {
    title: "Покупки",
    optionalLabel: "(можно пропустить)",
    budgetQuestion: "Какой у тебя примерный бюджет на шоппинг?",
    placesQuestion: "Где тебе больше нравится делать покупки?",
    timeQuestion: "Сколько времени ты готов выделить на шоппинг?",
    wishesQuestion:
      "Есть ли что-то, что ты точно хочешь купить в этой поездке?",
    wishesPlaceholder:
      "Например, местные продукты, украшения или что-то уникальное",
    additionalServices: "Дополнительные услуги",
    deliveryService: "Нужна помощь с доставкой покупок из интернет магазинов",
    otherPlacesLabel: "Укажите свой вариант",
    otherPlacesPlaceholder: "Опишите где вам нравится делать покупки",

    // Бюджет на шоппинг
    budget: {
      economy: {
        label: "Эконом",
        description: "Ищу выгодные предложения",
      },
      medium: {
        label: "Средний",
        description: "Готов потратить, но в разумных пределах",
      },
      luxury: {
        label: "Люкс",
        description: "Хочу купить что-то особенное",
      },
    },

    // Места для шоппинга
    places: {
      malls: {
        label: "Торговые центры",
        description: "Большие торговые центры с разнообразием магазинов",
      },
      boutiques: {
        label: "Брендовые бутики",
        description: "Специализированные магазины с брендовыми товарами",
      },
      markets: {
        label: "Местные рынки и лавки",
        description: "Традиционные рынки с аутентичными товарами",
      },
      outlets: {
        label: "Аутлеты",
        description: "Магазины со скидками на известные бренды",
      },
      online: {
        label: "Онлайн магазины",
        description: "Покупки в онлайн магазинах",
      },
      other: {
        label: "Другое",
        description: "Укажите свой вариант",
      },
    },

    // Время на шоппинг
    time: {
      fewHours: {
        label: "Пару часов",
        description: "Быстрый шоппинг",
      },
      halfDay: {
        label: "Полдня",
        description: "Хочу осмотреться и купить что-то интересное",
      },
      fullDay: {
        label: "Целый день",
        description: "Шоппинг — это важно!",
      },
    },
  },

  // Шаг: Бюджет
  budget: {
    title: "Подберём идеальный тур!",
    description:
      "Укажите, сколько вы примерно готовы тратить в день (включая проживание) — это не финальная стоимость тура, а ориентир, чтобы мы могли подобрать предложения, подходящие именно вам.",
    visaQuestion: "Мне нужна виза",
    insuranceQuestion: "Мне нужна страховка",
    label: "",
    perPerson: "на человека в день",
    perDay: "всего в день",
    totalAmount: "Примерная сумма всей поездки",
    participants: "Количество участников",
    duration: "Продолжительность",
    servicesIncluded: "Что будет включено в стоимость индивидуального тура?",

    // Сообщения для заголовков бюджета
    messages: [
      {
        emotion: "joy",
        title: "Чем точнее бюджет – тем лучше путешествие!",
        text: "Давайте сделаем ваш отдых незабываемым, подобрав оптимальные варианты!",
      },
      {
        emotion: "friendliness",
        title: "Подберём идеальный тур!",
        text: "Чтобы подобрать для вас идеальный тур, нам нужно знать ваш бюджет. Так мы сможем предложить наилучшие варианты, подходящие именно вам!",
      },
      {
        emotion: "wanderLust",
        title: "Откройте мир с нами!",
        text: "Мир огромен, и вариантов много! Сориентируйте нас по бюджету, и мы найдём для вас идеальный маршрут!",
      },
    ],

    // Включённые услуги
    services: [
      { key: "accommodation", title: "Проживание", included: true },
      { key: "transport", title: "Транспорт внутри страны", included: true },
      { key: "impressions", title: "Незабываемые впечатления", included: true },
      {
        key: "guidebook",
        title: "Дорожный путеводитель с рекомендациями",
        included: true,
      },
      { key: "support", title: "Круглосуточная поддержка", included: true },
      {
        key: "planning",
        title: "Индивидуальное планирование путешествия",
        included: true,
      },
      {
        key: "assistance",
        title: "Помощь при въезде и выезде",
        included: true,
      },
      {
        key: "flights",
        title: "Международные перелеты не включены",
        included: false,
      },
    ],
  },

  // Шаг: Контактная информация
  contact: {
    title: "Куда отправить предложение?",
    description:
      "Оставь телефон и почту, чтобы мы могли отправить предложение:",
    phoneLabel: "Телефон",
    phoneDescription: "Введите номер телефона в международном формате",
    emailLabel: "Электронная почта",
    emailPlaceholder: "Электронная почта",
    wechatLabel: "WeChat",
    wechatPlaceholder: "WeChat ID или номер телефона",
    whatsappLabel: "Whatsapp",
    whatsappPlaceholder: "+7999999999",
    telegramLabel: "Telegram",
    telegramPlaceholder: "@haohub",
  },

  // Шаг: Подтверждение
  confirmation: {
    title: "Подтверждение",
    soloTravelerPrefix: "Вот что у нас получилось для лучшего путешественника",
    groupTravelerPrefix: "Вот что у нас получилось для командира группы",
    groupSize: "В группе",
    ageGroups: "Возрастные группы",
    phone: "Телефон",
    email: "Email",
    wechat: "WeChat",
    telegram: "Telegram",
    whatsapp: "Whatsapp",
    tripPurpose: "Цель поездки",
    accommodationType: "Тип размещения",
    accommodationPreferences: "Пожелания к размещению",
    dates: "Даты",
    duration: "Продолжительность",
    cuisinePreferences: "Предпочтения по кухне",
    foodInfo: "Дополнительная информация о питании",
    transfer: "Трансфер",
    transportInfo: "Дополнительная информация о транспорте",
    shoppingBudget: "Бюджет для покупок",
    shoppingPlaces: "Места для покупок",
    shoppingTime: "Время на покупки",
    specialWishes: "Особые желания",
    budget: "Примерный бюджет на человека в день",
    visa: "Оформление визы",
    insurance: "Нужна страховка",
    reminderTitle: "Помни!",
    reminderText:
      "Ты в любой момент можешь вернуться и исправить любые данные, воспользовавшись навигацией вверху экрана",
  },

  // Форма в целом
  form: {
    draftTitle: "Черновик формы",
    draftDescription: "У вас есть несохраненный черновик формы.",
    restoreDraft: "Восстановить",
    ignoreDraft: "Игнорировать",
    successTitle: "Заявка успешно отправлена!",
    successSubtitle: "Мы свяжемся с вами в ближайшее время",
    successDescription:
      "Спасибо за вашу заявку. Наш менеджер свяжется с вами в ближайшее время для уточнения деталей.",
    submitAnother: "Отправить еще одну заявку",
    contactDeveloper: "Написать разработчику формы",
  },

  // Возрастные группы
  ageGroups: {
    infants: "Дети до 2 лет",
    toddlers: "Дети 3-6 лет",
    children: "Дети 7-12 лет",
    teens: "Подростки 13-17 лет",
    adults: "Взрослые 18-69 лет",
    seniors: "Пожилые 70+ лет",
  },
}

// Вспомогательные функции для работы с текстами

/**
 * Функция для получения склонения слова "день" по числу
 */
export function getDaysText(days: number): string {
  if (days % 10 === 1 && days % 100 !== 11) {
    return "день"
  } else if (
    [2, 3, 4].includes(days % 10) &&
    ![12, 13, 14].includes(days % 100)
  ) {
    return "дня"
  } else {
    return "дней"
  }
}

/**
 * Функция для получения склонения слова "человек" по числу
 */
export function getPeopleText(number: number): string {
  const cases = [2, 0, 1, 1, 1, 2]
  if (number % 100 > 4 && number % 100 < 20) {
    return "человек"
  } else {
    const index = Math.min(number % 10, 5)
    return ["человек", "человека", "человек"][cases[index]]
  }
}

export default texts
