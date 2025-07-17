import { PeopleList } from '../types/People';
import startQuestionImage from '../image/survey-main/main/mainSurvayPage.png';
import finalQuestionImage from '../image/survey-main/final-question/final-question.png';

import manQuestion2 from '../image/survey-main/man/man-2nd-question.png';
import manQuestion3 from '../image/survey-main/man/man-3rd-question.png';
import manQuestion5 from '../image/survey-main/man/man-5th-question.png';
import manQuestion6 from '../image/survey-main/man/man-6th-question.png';

import womanQuestion2 from '../image/survey-main/woman/woman-2nd-question.png';
import womanQuestion3 from '../image/survey-main/woman/woman-3rd-question.png';
import womanQuestion5 from '../image/survey-main/woman/woman-5th-question.png';
import womanQuestion6 from '../image/survey-main/woman/woman-6th-question.png';

import kidsQuestion2 from '../image/survey-main/child/child-2nd-questioni.png';
import kidsQuestion3 from '../image/survey-main/child/child-3rd-question.png';
import kidsQuestion5 from '../image/survey-main/child/child-5th-question.png';
import kidsQuestion6 from '../image/survey-main/child/child-6th-question.png';

import teenagerQuestion2 from '../image/survey-main/teenager/teenager-2nd-question.png';
import teenagerQuestion3 from '../image/survey-main/teenager/teenager-3rd-question.png';
import teenagerQuestion5 from '../image/survey-main/teenager/teenager-5th-question.png';
import teenagerQuestion6 from '../image/survey-main/teenager/teenager-6th-question.png';

import coupleQuestion2 from '../image/survey-main/couple/couple-2nd-question.png';
import coupleQuestion3 from '../image/survey-main/couple/couple-3rd-question.png';
import coupleQuestion5 from '../image/survey-main/couple/couple-5th-question.png';
import coupleQuestion6 from '../image/survey-main/couple/couple-6th-question.png';

import bossQuestion2 from '../image/survey-main/colleagues/colleagues-2nd-question.png';
import bossQuestion3 from '../image/survey-main/colleagues/colleagues-3rd-question.png';
import bossQuestion5 from '../image/survey-main/colleagues/colleagues-5th-question.png';
import bossQuestion6 from '../image/survey-main/colleagues/colleagues-6th-question.png';

import parentsQuestion2 from '../image/survey-main/parents/parents-2nd-question.png';
import parentsQuestion3 from '../image/survey-main/parents/parents-3rd-question.png';
import parentsQuestion5 from '../image/survey-main/parents/parents-5th-question.png';
import parentsQuestion6 from '../image/survey-main/parents/parents-6th-question.png';

import friendsQuestion2 from '../image/survey-main/friends/friends-2nd-question.png';
import friendsQuestion3 from '../image/survey-main/friends/friends-3rd-question.png';
import friendsQuestion5 from '../image/survey-main/friends/friends-5th-question.png';
import friendsQuestion6 from '../image/survey-main/friends/friends-6th-question.png';

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
    ],
    image: startQuestionImage,
  },

  finalQuestion: {
    title: 'Який бюджет?',
    attributes: ['500', '1000', '3000', '3000+'],
    values: ['До 500 грн', '500-1000 грн', '1000-3000 грн', '3000+ грн'],
    image: finalQuestionImage,
  },

  extraQuestionOne: {
    title: 'Що має бути в подарунку обов’язково?',
    attributes: ['personal', 'impersonal', 'characters', 'unpersonalized'],
    values: [
      'Персоналізація (гравіювання, ініціали)',
      'Без персоналізації',
      'Пов\'язано з улюбленими героями',
      'Без персонажів'
    ],
      image: {
        man: manQuestion5, 
        woman: womanQuestion5,
        kids: kidsQuestion5,
        teenager: teenagerQuestion5,
        couple: coupleQuestion5,
        boss: bossQuestion5,
        parents: parentsQuestion5,
        friend: friendsQuestion5,
      }
  },

  extraQuestionTwo: {
    title: 'Чи має ваш подарунок носити святковий характер чи бути універсальним?',
    attributes: ['holliday', 'universal'],
    values: [
      'Так, він має бути святковим (для привітання, урочистої події)',
      'Ні, він має бути універсальним (підходить для будь-якої ситуації)'
    ],
    image: {
      man: manQuestion6, 
      woman: womanQuestion6,
      kids: kidsQuestion6,
      teenager: teenagerQuestion6,
      couple: coupleQuestion6,
      boss: bossQuestion6,
      parents: parentsQuestion6,
      friend: friendsQuestion6,
    }
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
      ],
      image: manQuestion2,
    },
    quest3: {
      title: "Що йому цікаво?",
      attributes: ["sport", "cars", "self-development", "alcohol", "gadgets"],
      values: ["Спорт", "Автомобілі", "Саморозвиток", "Алкоголь", "Гаджети"],
      image: manQuestion3,
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
      ],
      image: womanQuestion2,
    },
    quest3: {
      title: "Що їй подобається найбільше?",
      attributes: ["self-development", "boardgames", "creative", "handmade"],
      values: [
        "Книги та саморозвиток",
        "Настільні ігри та спілкування",
        "Косметика та догляд",
        "Хендмейд речі"
      ],
      image: womanQuestion3,
    }
  },

  kids: {
    quest2: {
      title: "Скільки років дитині?",
      attributes: ["3y", "6y", "10y", "14y"],
      values: ["3 роки", "6 років", "10 років", "14 років"],
      image: kidsQuestion2,
    },
    quest3: {
      title: "Що її найбільше захоплює?",
      attributes: ["cartoons", "books", "gadgets", "handmade"],
      values: [
        "Мультфільми та іграшки",
        "Розвиткові ігри та книжки",
        "Гаджети та технології",
        "Творчість і рукоділля",
      ],
      image: kidsQuestion3,
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
      ],
      image: teenagerQuestion2,
    },
    quest3: {
      title: "Що має бути у подарунку?",
      attributes: ["practical", "emotional", "unique", "exclusive"],
      values: ["Практичність", "Емоційність", "Унікальність", "Ексклюзивність"],
      image: teenagerQuestion3,
    }
  },

  couple: {
    quest2: {
      title: "Який стиль життя переважає у цієї пари?",
      attributes: ["active", "busines", "romantic", "tech"],
      values: ["Активний", "Діловий", "Романтичний", "Технологічний"],
      image: coupleQuestion2,
    },
    quest3: {
      title: "Який подарунок підійде?",
      attributes: ["practical", "emotional", "romantic", "trendy"],
      values: ["Практичний", "Емоційний", "Романтичний", "Трендовий"],
      image: coupleQuestion3,
    }
  },

  boss: {
    quest2: {
      title: "Яка атмосфера у ваших стосунках?",
      attributes: ["busines", "friend", "colleague", "creative"],
      values: ["Формальна", "Дружня", "Партнерська", "Креативна"],
      image: bossQuestion2,
    },
    quest3: {
      title: "Що найкраще підійде у подарунок?",
      attributes: ["practical", "aesthetic", "exclusive", "emotional"],
      values: [
        "Корисна річ для роботи",
        "Стильний аксесуар",
        "Символічний або сувенірний подарунок",
        "Враження або розвага"
      ],
      image: bossQuestion3,
    }
  },

  parents: {
    quest2: {
      title: "Що для них важливо у подарунку?",
      attributes: ["practical", "emotional", "aesthetic", "unique"],
      values: ["Практичність", "Емоції", "Естетика", "Унікальність"],
      image: parentsQuestion2,
    },
    quest3: {
      title: "Що їм подобається?",
      attributes: ["home", "books", "boardgames", "gadgets"],
      values: ["Дім та затишок", "Книги та хобі", "Настільні ігри", "Гаджети"],
      image: parentsQuestion3,
    }
  },

  friend: {
    quest2: {
      title: "Що вас пов’язує?",
      attributes: ["creative", "emotional", "active", "busines"],
      values: ["Спільне хобі", "Вечірки", "Подорожі", "Бізнес"],
      image: friendsQuestion2,
    },
    quest3: {
      title: "Який тип подарунка підійде?",
      attributes: ["emotional", "practical", "exclusive", "boardgames"],
      values: ["Жартівливий", "Практичний", "Ексклюзивний", "Настільна гра"],
      image: friendsQuestion3,
    }
  }
};
