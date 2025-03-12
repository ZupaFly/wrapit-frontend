import { PeopleList } from '../types/People';

export const peoplelist: PeopleList = {
  startQuestion: {
    title: 'Кому ви шукаєте подарунок?',
    attributes: ['man', 'woman', 'kids', 'teenager', 'couple', 'boss', 'parents', 'friend'],
    values: [
      'Чоловік',
      'Жінка',
      'Дитина',
      'Підліток',
      'Пара',
      'Колега/Начальник',
      'Батьки/Родичі',
      'Друзі',
    ]
  },

  finalQuestion: {
    title: 'Який бюджет?',
    attributes: ['500', '1000', '3000', '3000+'],
    values: ['До 500 грн', '500-1000 грн', '1000-3000 грн', '3000+ грн']
  },

  extraQuestionOne: {
    title: 'Що має бути в подарунку обов’язково?',
    attributes: ['personal', 'impersonal', 'characters', 'unpersonalized'],
    values: [
      'Персоналізація (гравіювання, ініціали)',
      'Без персоналізації ',
      'Пов\'язано з улюбленими героями',
      'Без персонажів']
  },

  extraQuestionTwo: {
    title: 'Чи має ваш подарунок носити святковий характер чи бути універсальним?',
    attributes: ['holliday', 'universal'],
    values: [
      'Так, він має бути святковим (для привітання, урочистої події)',
      'Ні, він має бути універсальним (підходить для будь-якої ситуації)']
  },

  man: {
    quest2: {
      title: "Який стиль життя у нього переважає?",
      attributes: ["active", "busines", "creative", "home"],
      values: [
        "Активний (спорт, подорожі)",
        "Діловий (робота, кар'єра)",
        "Креативний (мистецтво, музика, дизайн)",
        "Домашній (відпочинок, сім’я, затишок)"
      ]
    },
    quest3: {
      title: "Що йому цікаво?",
      attributes: ["sport", "cars", "self-development", "alcohol", "gadgets"],
      values: ["Спорт", "Автомобілі", "Саморозвиток", "Алкоголь", "Гаджети"]
    }
  },

  woman: {
    quest2: {
      title: "Як вона проводить вільний час?",
      attributes: ["active", "busines", "creative", "home"],
      values: [
        "Подорожі та активний відпочинок",
        "Робота і професійний розвиток",
        "Творчість та хобі",
        "Час вдома з рідними"
      ]
    },
    quest3: {
      title: "Що їй подобається найбільше?",
      attributes: ["self-development", "boardgames", "creative", "handmade"],
      values: [
        "Книги та саморозвиток",
        "Настільні ігри та спілкування",
        "Косметика та догляд",
        "Хендмейд речі"
      ]
    }
  },

  kids: {
    quest2: {
      title: "Скільки років дитині?",
      attributes: ["3y", "6y", "10y", "14y"],
      values: ["3 роки", "6 років", "10 років", "14 років"]
    },
    quest3: {
      title: "Що її найбільше захоплює?",
      attributes: ["cartoons", "books", "gadgets", "handmade"],
      values: [
        "Мультфільми та іграшки",
        "Розвиткові ігри та книжки",
        "Гаджети та технології",
        "Творчість і рукоділля"
      ]
    }
  },

  teenager: {
    quest2: {
      title: "Чим він/вона цікавиться?",
      attributes: ["sport", "gadgets", "self-development", "aesthetic"],
      values: [
        "Спорт та активний відпочинок",
        "Гаджети та ігри",
        "Книги та саморозвиток",
        "Естетика та мода"
      ]
    },
    quest3: {
      title: "Що має бути у подарунку?",
      attributes: ["practical", "emotional", "unique", "exclusive"],
      values: ["Практичність", "Емоційність", "Унікальність", "Ексклюзивність"]
    }
  },

  couple: {
    quest2: {
      title: "Який стиль життя переважає у цієї пари?",
      attributes: ["active", "busines", "romantic", "tech"],
      values: ["Активний", "Діловий", "Романтичний", "Технологічний"]
    },
    quest3: {
      title: "Який подарунок підійде?",
      attributes: ["practical", "emotional", "romantic", "trendy"],
      values: ["Практичний", "Емоційний", "Романтичний", "Трендовий"]
    }
  },

  boss: {
    quest2: {
      title: "Яка атмосфера у ваших стосунках?",
      attributes: ["busines", "friend", "colleague", "creative"],
      values: ["Формальна", "Дружня", "Партнерська", "Креативна"]
    },
    quest3: {
      title: "Що найкраще підійде у подарунок?",
      attributes: ["practical", "aesthetic", "exclusive", "emotional"],
      values: [
        "Корисна річ для роботи",
        "Стильний аксесуар",
        "Символічний або сувенірний подарунок",
        "Враження або розвага"
      ]
    }
  },

  parents: {
    quest2: {
      title: "Що для них важливо у подарунку?",
      attributes: ["practical", "emotional", "aesthetic", "unique"],
      values: ["Практичність", "Емоції", "Естетика", "Унікальність"]
    },
    quest3: {
      title: "Що їм подобається?",
      attributes: ["home", "books", "boardgames", "gadgets"],
      values: ["Дім та затишок", "Книги та хобі", "Настільні ігри", "Гаджети"]
    }
  },

  friend: {
    quest2: {
      title: "Що вас пов’язує?",
      attributes: ["creative", "emotional", "active", "busines"],
      values: ["Спільне хобі", "Вечірки", "Подорожі", "Бізнес"]
    },
    quest3: {
      title: "Який тип подарунка підійде?",
      attributes: ["emotional", "practical", "exclusive", "boardgames"],
      values: ["Жартівливий", "Практичний", "Ексклюзивний", "Настільна гра"]
    }
  }
};
