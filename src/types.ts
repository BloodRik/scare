export type Language = 'nl' | 'en' | 'ru';

export interface TranslationDict {
  nav: {
    home: string;
    services: string;
    about: string;
    reviews: string;
    contact: string;
    emergency: string;
    blog: string;
    address: string;
  };
  hero: {
    title: string;
    subtitle: string;
    callNow: string;
    whatsapp: string;
    telegram: string;
    badge: string;
    locationBtn: string;
  };
  services: {
    title: string;
    subtitle: string;
    mobileTire: { title: string; desc: string };
    balancing: { title: string; desc: string };
    tireReplacement: { title: string; desc: string };
    punctureRepair: { title: string; desc: string };
    roadside: { title: string; desc: string };
    seasonal: { title: string; desc: string };
  };
  whyUs: {
    title: string;
    subtitle: string;
    items: {
      alwaysOpen: { title: string; desc: string };
      coverage: { title: string; desc: string };
      speed: { title: string; desc: string };
      equipment: { title: string; desc: string };
      prices: { title: string; desc: string };
      experience: { title: string; desc: string };
      allCars: { title: string; desc: string };
    };
  };
  howItWorks: {
    title: string;
    subtitle: string;
    steps: {
      step1: { title: string; desc: string };
      step2: { title: string; desc: string };
      step3: { title: string; desc: string };
      step4: { title: string; desc: string };
    };
  };
  location: {
    title: string;
    subtitle: string;
    btnDetect: string;
    btnDetecting: string;
    manualInfo: string;
    latitude: string;
    longitude: string;
    address: string;
    addressPlaceholder: string;
    comment: string;
    commentPlaceholder: string;
    photoTitle: string;
    photoDrag: string;
    photoLimit: string;
    btnSend: string;
    btnSending: string;
    chooseChannel: string;
    whatsappMsg: string;
    telegramMsg: string;
    emailSubject: string;
    emailBody: string;
    copied: string;
    copyLink: string;
  };
  coverage: {
    title: string;
    subtitle: string;
    badge: string;
    desc: string;
  };
  gallery: {
    title: string;
    subtitle: string;
  };
  reviews: {
    title: string;
    subtitle: string;
    city: string;
  };
  socials: {
    title: string;
    subtitle: string;
  };
  faq: {
    title: string;
    subtitle: string;
    q1: string;
    a1: string;
    q2: string;
    a2: string;
    q3: string;
    a3: string;
    q4: string;
    a4: string;
    q5: string;
    a5: string;
  };
  contactBlock: {
    title: string;
    subtitle: string;
    phone: string;
    hours: string;
    hoursVal: string;
    region: string;
    regionVal: string;
    callBtn: string;
  };
  footer: {
    desc: string;
    rights: string;
  };
}

export const translations: Record<Language, TranslationDict> = {
  nl: {
    nav: {
      home: 'Home',
      services: 'Diensten',
      about: 'Waarom wij',
      reviews: 'Beoordelingen',
      contact: 'Contact',
      emergency: 'Spoed 24/7',
      blog: 'Blog',
      address: 'Adres',
    },
    hero: {
      title: 'Mobile Banden Service',
      subtitle: '24/7 Mobiele Banden service in België',
      callNow: 'Bel nu',
      whatsapp: 'WhatsApp',
      telegram: 'Telegram',
      badge: 'Wij komen naar u toe!',
      locationBtn: 'Locatie',
    },
    services: {
      title: 'Onze Diensten',
      subtitle: 'Professionele bandenservice op locatie, waar u ook bent in Vlaanderen en België.',
      mobileTire: {
        title: 'Mobiele Bandenservice',
        desc: 'Bandenservice direct op locatie. Bij u thuis, op het werk of langs de weg, 24 uur per dag.',
      },
      balancing: {
        title: 'Wielen Uitbalanceren',
        desc: 'Nauwkeurige computerbalancering op locatie met hightech mobiele apparatuur voor een trillingsvrije rit.',
      },
      tireReplacement: {
        title: 'Banden Vervangen',
        desc: 'Snelle montage van nieuwe of gebruikte banden op de door u gewenste locatie en tijdstip.',
      },
      punctureRepair: {
        title: 'Lekke Band Reparatie',
        desc: 'Professionele reparatie van nagelgaten en lekken ter plaatse, zodat u snel weer veilig op weg kunt.',
      },
      roadside: {
        title: 'Pechhulp Onderweg',
        desc: 'Noodhulp bij klapbanden of lekke banden op de snelweg of secundaire wegen in heel België.',
      },
      seasonal: {
        title: 'Seizoensgebonden Wissel',
        desc: 'Wissel uw zomer- of winterbanden eenvoudig voor uw deur zonder wachttijden bij de garage.',
      },
    },
    whyUs: {
      title: 'Waarom Kiezen Voor Ons',
      subtitle: 'Wij leveren een premium mobiele service van dealerniveau voor alle merken.',
      items: {
        alwaysOpen: {
          title: '24/7 Beschikbaar',
          desc: 'Dag en nacht, in het weekend en op feestdagen. Wij staan altijd klaar om u te helpen.',
        },
        coverage: {
          title: 'Heel België',
          desc: 'Actief in heel Vlaanderen en de rest van België met snelle responstijden.',
        },
        speed: {
          title: 'Snel ter plaatse',
          desc: 'Onze servicewagens zijn binnen 30 tot 60 minuten bij u op locatie.',
        },
        equipment: {
          title: 'Professioneel Materiaal',
          desc: 'State-of-the-art montage- en balanceermachines ingebouwd in onze mobiele werkplaatsen.',
        },
        prices: {
          title: 'Eerlijke Prijzen',
          desc: 'Transparante tarieven vooraf, zonder verborgen kosten of verrassingen achteraf.',
        },
        experience: {
          title: 'Jarenlange Ervaring',
          desc: 'Gecertificeerde bandenspecialisten met diepgaande kennis van alle typen voertuigen.',
        },
        allCars: {
          title: 'Alle Automerken',
          desc: 'Van premium sedans tot elektrische voertuigen (EVs) met speciale krikpunten en zorg.',
        },
      },
    },
    howItWorks: {
      title: 'Hoe Het Werkt',
      subtitle: 'In vier eenvoudige stappen bent u weer veilig onderweg.',
      steps: {
        step1: {
          title: 'Neem contact op',
          desc: 'Bel ons rechtstreeks of stuur een bericht via WhatsApp of Telegram.',
        },
        step2: {
          title: 'Deel uw locatie',
          desc: 'Deel uw GPS-coördinaten via onze interactieve kaart hieronder.',
        },
        step3: {
          title: 'Monteur komt eraan',
          desc: 'Onze volledig uitgeruste servicewagen vertrekt direct naar uw locatie.',
        },
        step4: {
          title: 'Vervolg uw reis',
          desc: 'De klus wordt snel geklaard en u kunt direct weer veilig op weg.',
        },
      },
    },
    location: {
      title: 'Deel Uw Geolocatie',
      subtitle: 'Bepaal uw exacte positie zodat onze monteur u direct kan vinden.',
      btnDetect: 'Bepaal mijn locatie',
      btnDetecting: 'Locatie bepalen...',
      manualInfo: 'U kunt de marker op de kaart slepen om de locatie handmatig aan te passen.',
      latitude: 'Breedtegraad',
      longitude: 'Lengtegraad',
      address: 'Adres',
      addressPlaceholder: 'Adres wordt geladen of handmatig invoeren...',
      comment: 'Opmerking voor de monteur (bijv. bandenmaat, automerk)',
      commentPlaceholder: 'Voer hier extra details in over uw auto, bandenmaat of schade...',
      photoTitle: 'Voeg foto\'s toe van de schade (max. 5)',
      photoDrag: 'Sleep foto\'s hierheen of klik om te uploaden',
      photoLimit: 'Maximale grootte per foto is 5MB. Maximaal 5 foto\'s.',
      btnSend: 'Verzend coördinaten naar monteur',
      btnSending: 'Bericht voorbereiden...',
      chooseChannel: 'Kies hoe u de locatie wilt verzenden',
      whatsappMsg: 'Hallo Mobile Banden Service, ik heb hulp nodig met mijn banden. Mijn locatie details:',
      telegramMsg: 'Hallo Mobile Banden Service, ik heb hulp nodig met mijn banden. Mijn locatie details:',
      emailSubject: 'Hulpbehoefte Bandenservice op Locatie',
      emailBody: 'Hallo Mobile Banden Service, hierbij mijn geolocatie details voor spoedhulp:',
      copied: 'Gekopieerd naar klembord!',
      copyLink: 'Kopieer details',
    },
    coverage: {
      title: 'Dekkingsgebied',
      subtitle: 'Wij zijn strategisch gestationeerd om heel België te kunnen bedienen.',
      badge: '24/7 Actief',
      desc: 'Onze mobiele servicebussen rijden door heel Vlaanderen en de rest van België. Of u nu thuis staat in Antwerpen, op het werk in Brussel, of gestrand bent langs de snelweg in Gent of Luik, wij komen naar u toe!',
    },
    gallery: {
      title: 'Onze Werkzaamheden',
      subtitle: '',
    },
    reviews: {
      title: 'Wat Klanten Over Ons Zeggen',
      subtitle: 'Klanttevredenheid en professionaliteit staan bij ons op nummer één.',
      city: 'België',
    },
    socials: {
      title: 'Volg Onze Werkzaamheden',
      subtitle: 'Bekijk ons dagelijks werk, handige tips en updates op onze sociale netwerken.',
    },
    faq: {
      title: 'Veelgestelde Vragen',
      subtitle: 'Heeft u vragen over onze diensten? Vind hier snel antwoord.',
      q1: 'Werken jullie ook \'s nachts?',
      a1: 'Ja, absoluut! Wij zijn een 24/7 mobiele bandenservice. Dat betekent dat we 365 dagen per jaar, dag en nacht, voor u klaarstaan.',
      q2: 'Hoeveel kost de verplaatsing of uitrit?',
      a2: 'De voorrijkosten zijn afhankelijk van uw locatie en het tijdstip. Voordat wij vertrekken, geven wij u altijd een duidelijke en transparante prijsindicatie, zodat u nooit voor verrassingen komt te staan.',
      q3: 'Werken jullie in het weekend en op feestdagen?',
      a3: 'Ja. Onze pechverhelpingsdienst is volledig operationeel in het weekend, op feestdagen en tijdens vakantieperiodes.',
      q4: 'Welke betaalmethoden accepteren jullie?',
      a4: 'U kunt bij ons eenvoudig en veilig betalen via Bancontact/Payconiq, bankkaart, contant geld of directe bankoverschrijving ter plaatse.',
      q5: 'Kunnen jullie de banden bij mij thuis of op het werk vervangen?',
      a5: 'Zeker! Wij komen overal waar onze mobiele werkplaats veilig kan parkeren: op uw oprit, op de parking van uw bedrijf, of langs de weg.',
    },
    contactBlock: {
      title: 'Neem Direct Contact Op',
      subtitle: 'Heeft u direct hulp nodig of wilt u een afspraak maken? Wij staan voor u klaar.',
      phone: 'Telefoon',
      hours: 'Openingstijden',
      hoursVal: '24 uur per dag, 7 dagen per week',
      region: 'Regio',
      regionVal: 'België / Vlaanderen',
      callBtn: 'Bel nu +32 479 40 99 29',
    },
    footer: {
      desc: 'Premium 24/7 Mobiele Bandenservice in heel België. Wij komen naar u toe voor bandenwissel, balanceren en reparatie.',
      rights: '© 2026 Mobile Banden Service. Alle rechten voorbehouden.',
    },
  },
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      about: 'Why Us',
      reviews: 'Reviews',
      contact: 'Contact',
      emergency: 'Emergency 24/7',
      blog: 'Blog',
      address: 'Address',
    },
    hero: {
      title: 'Mobile Banden Service',
      subtitle: '24/7 Mobile Tire Service in Belgium',
      callNow: 'Call Now',
      whatsapp: 'WhatsApp',
      telegram: 'Telegram',
      badge: 'We come to you!',
      locationBtn: 'Location',
    },
    services: {
      title: 'Our Services',
      subtitle: 'Professional on-site tire services, wherever you are in Flanders and across Belgium.',
      mobileTire: {
        title: 'Mobile Tire Fitting',
        desc: 'Professional tire service directly at your location. At home, office, or roadside, 24 hours a day.',
      },
      balancing: {
        title: 'Wheel Balancing',
        desc: 'Precise computer balancing on-site with high-tech mobile machinery for a perfectly smooth ride.',
      },
      tireReplacement: {
        title: 'Tire Replacement',
        desc: 'Fast mounting of new or seasonal tires at your chosen location, saving you a trip to the workshop.',
      },
      punctureRepair: {
        title: 'Puncture Repair',
        desc: 'Professional repairs of nail holes and tread punctures on-site to get you safely moving again.',
      },
      roadside: {
        title: 'Roadside Assistance',
        desc: 'Emergency help for blowouts or flat tires on highways or local roads anywhere in Belgium.',
      },
      seasonal: {
        title: 'Seasonal Tire Change',
        desc: 'Switch your summer or winter tires easily in your driveway with zero workshop waiting times.',
      },
    },
    whyUs: {
      title: 'Why Choose Us',
      subtitle: 'We provide dealer-level premium mobile services for all vehicles.',
      items: {
        alwaysOpen: {
          title: '24/7 Availability',
          desc: 'Day and night, weekends and holidays. We are always ready to assist you.',
        },
        coverage: {
          title: 'All Belgium',
          desc: 'Active in Flanders and across Belgium with rapid response times.',
        },
        speed: {
          title: '30-60 Mins Arrival',
          desc: 'Our fully equipped service vans arrive at your location within 30 to 60 minutes.',
        },
        equipment: {
          title: 'Professional Equipment',
          desc: 'State-of-the-art mounting and balancing machinery built into our mobile service trucks.',
        },
        prices: {
          title: 'Fair Prices',
          desc: 'Transparent upfront quotes with no hidden fees or unexpected charges.',
        },
        experience: {
          title: 'Great Experience',
          desc: 'Certified tire technicians with extensive experience with premium and sports cars.',
        },
        allCars: {
          title: 'All Car Brands',
          desc: 'From high-end luxury sedans to electric vehicles (EVs) with specialized lifting gear.',
        },
      },
    },
    howItWorks: {
      title: 'How It Works',
      subtitle: 'Get back on the road safely in four simple steps.',
      steps: {
        step1: {
          title: 'Contact Us',
          desc: 'Call us directly or send a quick message via WhatsApp or Telegram.',
        },
        step2: {
          title: 'Send Location',
          desc: 'Share your exact GPS coordinates using our interactive map below.',
        },
        step3: {
          title: 'Technician Arrives',
          desc: 'Our fully loaded mobile workshop departs immediately to your location.',
        },
        step4: {
          title: 'Continue Journey',
          desc: 'We complete the job efficiently, and you are ready to drive off safely.',
        },
      },
    },
    location: {
      title: 'Share Your Location',
      subtitle: 'Identify your precise location so our technician can reach you as fast as possible.',
      btnDetect: 'Detect My Location',
      btnDetecting: 'Detecting Location...',
      manualInfo: 'You can also drag the marker on the map to adjust your location manually.',
      latitude: 'Latitude',
      longitude: 'Longitude',
      address: 'Address',
      addressPlaceholder: 'Address loading or enter manually...',
      comment: 'Comment for the technician (e.g. tire size, car model)',
      commentPlaceholder: 'Enter any extra details about your vehicle, tire size, or situation...',
      photoTitle: 'Attach photos of the damage (max. 5)',
      photoDrag: 'Drag & drop photos here or click to browse',
      photoLimit: 'Max photo size 5MB. Up to 5 photos.',
      btnSend: 'Send Coordinates to Technician',
      btnSending: 'Preparing Message...',
      chooseChannel: 'Choose how you want to send your location',
      whatsappMsg: 'Hello Mobile Banden Service, I need assistance with my tires. Here are my location details:',
      telegramMsg: 'Hello Mobile Banden Service, I need assistance with my tires. Here are my location details:',
      emailSubject: 'Mobile Tire Service Assistance Request',
      emailBody: 'Hello Mobile Banden Service, here are my geolocation details for emergency tire assistance:',
      copied: 'Copied to clipboard!',
      copyLink: 'Copy Details',
    },
    coverage: {
      title: 'Our Coverage Area',
      subtitle: 'We are strategically positioned to cover the entire territory of Belgium.',
      badge: 'Active 24/7',
      desc: 'Our mobile tire workshop vans patrol Flanders and the rest of Belgium. Whether you are at home in Antwerp, at work in Brussels, or stranded on the highway near Ghent or Liege, we will come to you!',
    },
    gallery: {
      title: 'Our Work in Action',
      subtitle: '',
    },
    reviews: {
      title: 'What Our Clients Say',
      subtitle: 'Customer satisfaction and premium quality service are our top priorities.',
      city: 'Belgium',
    },
    socials: {
      title: 'Follow Our Work',
      subtitle: 'Check out our daily operations, handy tire tips, and announcements on social media.',
    },
    faq: {
      title: 'Frequently Asked Questions',
      subtitle: 'Have questions about our service? Find quick answers below.',
      q1: 'Do you work at night?',
      a1: 'Yes, absolutely! We are a 24/7 mobile tire service. This means we are available 365 days a year, day and night, to assist you.',
      q2: 'How much does the callout service cost?',
      a2: 'Callout fees depend on your distance and the time of day. We always provide a clear, transparent quote before sending our van out.',
      q3: 'Do you work on weekends and holidays?',
      a3: 'Yes. Our emergency assistance service is fully operational on Saturdays, Sundays, bank holidays, and vacation periods.',
      q4: 'What payment methods do you accept?',
      a4: 'We accept a variety of payment options on the spot, including Bancontact/Payconiq, debit/credit cards, cash, or instant bank transfer.',
      q5: 'Can you change my tires at my home or workplace?',
      a5: 'Yes, indeed! We can service your vehicle anywhere our mobile unit can safely park: in your driveway, office parking lot, or by the side of the road.',
    },
    contactBlock: {
      title: 'Get in Touch Directly',
      subtitle: 'Need urgent help or want to schedule an appointment? We are ready to assist.',
      phone: 'Phone',
      hours: 'Working Hours',
      hoursVal: '24 hours a day, 7 days a week',
      region: 'Region',
      regionVal: 'Belgium / Flanders',
      callBtn: 'Call Now +32 479 40 99 29',
    },
    footer: {
      desc: 'Premium 24/7 Mobile Tire Service across Belgium. We come to your location for tire fitting, computer balancing, and emergency puncture repairs.',
      rights: '© 2026 Mobile Banden Service. All rights reserved.',
    },
  },
  ru: {
    nav: {
      home: 'Главная',
      services: 'Услуги',
      about: 'О нас',
      reviews: 'Отзывы',
      contact: 'Контакты',
      emergency: 'Вызов 24/7',
      blog: 'Блог',
      address: 'Адрес',
    },
    hero: {
      title: 'Mobile Banden Service',
      subtitle: 'Мобильный шиномонтаж в Бельгии 24/7',
      callNow: 'Позвонить',
      whatsapp: 'WhatsApp',
      telegram: 'Telegram',
      badge: 'Мы приедем к вам!',
      locationBtn: 'Локация',
    },
    services: {
      title: 'Наши Услуги',
      subtitle: 'Профессиональный выездной шиномонтаж в любой точке Фландрии и по всей Бельгии.',
      mobileTire: {
        title: 'Выездной шиномонтаж',
        desc: 'Шиномонтаж прямо на месте: у вашего дома, офиса или на обочине дороги. Доступен круглосуточно.',
      },
      balancing: {
        title: 'Балансировка колес',
        desc: 'Высокоточная компьютерная балансировка на месте с использованием современного мобильного оборудования.',
      },
      tireReplacement: {
        title: 'Замена шин',
        desc: 'Быстрая установка новых или сезонных шин прямо на месте, экономящая ваше время на поездку в сервис.',
      },
      punctureRepair: {
        title: 'Ремонт проколов',
        desc: 'Профессиональное устранение проколов, порезов и повреждений на месте для безопасного продолжения пути.',
      },
      roadside: {
        title: 'Помощь на дороге',
        desc: 'Экстренная помощь при разрыве или сильном повреждении колеса на автомагистралях и дорогах Бельгии.',
      },
      seasonal: {
        title: 'Сезонная переобувка',
        desc: 'Удобная сезонная смена зимней или летней резины прямо у вашего дома без очередей в мастерских.',
      },
    },
    whyUs: {
      title: 'Почему Выбирают Нас',
      subtitle: 'Мы предлагаем премиальный мобильный сервис дилерского уровня для любых авто.',
      items: {
        alwaysOpen: {
          title: 'Работаем 24/7',
          desc: 'Днем и ночью, в выходные и праздничные дни. Мы всегда готовы прийти к вам на помощь.',
        },
        coverage: {
          title: 'Бельгия',
          desc: 'Обслуживаем территорию всей Фландрии и Бельгии с максимально быстрым выездом.',
        },
        speed: {
          title: 'Выезд за 30-60 мин',
          desc: 'Наши оборудованные фургоны прибывают по вашему адресу в течение получаса или часа.',
        },
        equipment: {
          title: 'Проф. Оборудование',
          desc: 'Высокотехнологичные шиномонтажные и балансировочные станки встроены в наши мастерские.',
        },
        prices: {
          title: 'Честные цены',
          desc: 'Прозрачный расчет стоимости до выезда мастера без скрытых платежей и наценок.',
        },
        experience: {
          title: 'Большой Опыт',
          desc: 'Сертифицированные мастера с многолетним стажем работы с премиальными и спортивными автомобилями.',
        },
        allCars: {
          title: 'Любые марки машин',
          desc: 'Работаем со всеми легковыми авто и электромобилями (EV), используя специальные домкраты и упоры.',
        },
      },
    },
    howItWorks: {
      title: 'Как Это Работает',
      subtitle: 'Всего четыре простых шага, и вы снова в пути.',
      steps: {
        step1: {
          title: 'Свяжитесь с нами',
          desc: 'Позвоните напрямую или напишите оперативное сообщение в WhatsApp / Telegram.',
        },
        step2: {
          title: 'Отправьте локацию',
          desc: 'Передайте точные GPS-координаты с помощью нашей интерактивной карты ниже.',
        },
        step3: {
          title: 'Мастер выезжает',
          desc: 'Наш мобильный шиномонтажный комплекс немедленно отправляется по вашим координатам.',
        },
        step4: {
          title: 'Продолжайте путь',
          desc: 'Мастер быстро решает проблему с колесом, и вы можете безопасно ехать дальше.',
        },
      },
    },
    location: {
      title: 'Передайте Вашу Геолокацию',
      subtitle: 'Определите свое точное местоположение, чтобы мастер нашел вас максимально быстро.',
      btnDetect: 'Определить мое местоположение',
      btnDetecting: 'Определение...',
      manualInfo: 'Вы также можете перетаскивать маркер по карте для ручной корректировки адреса.',
      latitude: 'Широта',
      longitude: 'Долгота',
      address: 'Адрес',
      addressPlaceholder: 'Адрес загружается или введите его вручную...',
      comment: 'Комментарий мастеру (размер шин, модель авто, нюансы)',
      commentPlaceholder: 'Введите параметры шин, марку автомобиля или подробности повреждения...',
      photoTitle: 'Прикрепите фото повреждений (до 5 шт)',
      photoDrag: 'Перетащите фотографии сюда или кликните для выбора',
      photoLimit: 'Максимальный размер фото 5МБ. До 5 снимков.',
      btnSend: 'Отправить координаты мастеру',
      btnSending: 'Подготовка сообщения...',
      chooseChannel: 'Выберите способ отправки координат',
      whatsappMsg: 'Здравствуйте Mobile Banden Service, мне нужна помощь с шинами. Мои координаты и данные:',
      telegramMsg: 'Здравствуйте Mobile Banden Service, мне нужна помощь с шинами. Мои координаты и данные:',
      emailSubject: 'Заявка на Мобильный Шиномонтаж',
      emailBody: 'Здравствуйте Mobile Banden Service, направляю координаты для оказания экстренной помощи:',
      copied: 'Скопировано в буфер обмена!',
      copyLink: 'Скопировать данные',
    },
    coverage: {
      title: 'Зона Обслуживания',
      subtitle: 'Мы стратегически распределили экипажи для покрытия всей территории Бельгии.',
      badge: 'Работаем 24/7',
      desc: 'Наши мобильные шиномонтажные мастерские дежурят во всех регионах Фландрии и Бельгии. Будь вы дома в Антверпене, на работе в Брюсселе или застряли на трассе около Гента или Льежа — мы приедем к вам!',
    },
    gallery: {
      title: 'Наша Работа в Кадрах',
      subtitle: '',
    },
    reviews: {
      title: 'Что Говорят Наши Клиенты',
      subtitle: 'Доверие клиентов и высокое качество — главные приоритеты нашей команды.',
      city: 'Бельгия',
    },
    socials: {
      title: 'Следите За Нашей Работой',
      subtitle: 'Смотрите обзоры выездов, полезные лайфхаки и новости в наших социальных сетях.',
    },
    faq: {
      title: 'Часто Задаваемые Вопросы',
      subtitle: 'Не нашли нужную информацию? Посмотрите быстрые ответы ниже.',
      q1: 'Работаете ли вы ночью?',
      a1: 'Да, конечно! Наша служба работает в режиме 24/7. Мы готовы выехать на помощь в любое время суток, 365 дней в году.',
      q2: 'Сколько стоит вызов мастера?',
      a2: 'Стоимость выезда зависит от вашего местоположения и времени суток. Перед отправкой машины мы обязательно согласуем прозрачную и понятную стоимость работ.',
      q3: 'Работаете ли вы в выходные и праздники?',
      a3: 'Да. Служба аварийного выезда дежурит по субботам, воскресеньям, во время праздников и сезонов отпусков.',
      q4: 'Какие способы оплаты вы принимаете?',
      a4: 'Вы можете оплатить услуги прямо на месте любым удобным способом: картой через терминал, через приложение Bancontact/Payconiq, наличными или мгновенным банковским переводом.',
      q5: 'Можно ли заменить шины у меня дома или около офиса?',
      a5: 'Конечно! Мы проводим работы в любом месте, где может безопасно припарковаться наш фургон: во дворе частного дома, на парковке компании или на обочине.',
    },
    contactBlock: {
      title: 'Связаться Напрямую',
      subtitle: 'Нужна срочная помощь или хотите записаться на плановую замену? Мы на связи.',
      phone: 'Телефон',
      hours: 'Режим работы',
      hoursVal: 'Круглосуточно, 24/7 без выходных',
      region: 'Регион покрытия',
      regionVal: 'Вся Бельгия / Фландрия',
      callBtn: 'Позвонить +32 479 40 99 29',
    },
    footer: {
      desc: 'Премиальный круглосуточный мобильный шиномонтаж в Бельгии. Быстро приедем к вам для ремонта, балансировки или замены колес.',
      rights: '© 2026 Mobile Banden Service. Все права защищены.',
    },
  },
};
