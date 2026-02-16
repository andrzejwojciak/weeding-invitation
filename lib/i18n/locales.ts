export type Language = "en" | "pl" | "uk";

export interface TranslationKeys {
  // Envelope
  envelope: {
    dear: string;
    subtitle: string;
    clickToOpen: string;
  };
  // Dates
  dates: {
    weddingDate: string;
    rsvpDeadline: string;
  };
  // Boarding Pass
  boardingPass: {
    header: string;
    flightNumber: string;
    passengerName: string;
    departure: string;
    ceremony: string;
    arrival: string;
    reception: string;
    followingCeremony: string;
    importantInfo: string;
    rsvp: string;
    rsvpDescription: string;
    contact: string;
    contactDescription: string;
    giftRegistry: string;
    giftDescription: string;
    monetaryGift: string;
    wineSpirits: string;
    dresscode: string;
    dresscodeDescription: string;
    boarding: string;
    boardingTime: string;
    seat: string;
    gate: string;
  };
  // Admin Panel
  admin: {
    title: string;
    secretKey: string;
    accessButton: string;
    invalidCredentials: string;
    createInvitation: string;
    guestName: string;
    guestNamePlaceholder: string;
    language: string;
    selectLanguage: string;
    refresh: string;
    status: string;
    created: string;
    actions: string;
    opened: string;
    notOpened: string;
    copyLink: string;
    copied: string;
    deleteConfirm: string;
    noInvitations: string;
  };
}

export const translations: Record<Language, TranslationKeys> = {
  en: {
    envelope: {
      dear: "Dear",
      subtitle: "You have received a special invitation",
      clickToOpen: "Click to open",
    },
    dates: {
      weddingDate: "June 13, 2026",
      rsvpDeadline: "May 23, 2026",
    },
    boardingPass: {
      header: "WEDDING BOARDING PASS",
      flightNumber: "WED-2026",
      passengerName: "Passenger Name",
      departure: "Departure",
      ceremony: "Ceremony",
      arrival: "Arrival",
      reception: "Reception",
      followingCeremony: "Following Ceremony",
      importantInfo: "Important Information",
      rsvp: "RSVP",
      rsvpDescription: "Please confirm your attendance by",
      contact: "Contact",
      contactDescription: "For any questions, please contact us",
      giftRegistry: "Gift Registry",
      giftDescription:
        "Your presence is our present, but if you wish to honor us with a gift, we would appreciate a contribution to our future together",
      monetaryGift: "Monetary Gift Appreciated",
      wineSpirits: "Wine & Spirits Welcome",
      dresscode: "Dress Code",
      dresscodeDescription: "Formal / Elegant attire",
      boarding: "Boarding",
      boardingTime: "Gates open 30 min before ceremony",
      seat: "Seat",
      gate: "Gate",
    },
    admin: {
      title: "Wedding Invitations Admin",
      secretKey: "Secret Key",
      accessButton: "Access Admin Panel",
      invalidCredentials: "Invalid credentials",
      createInvitation: "Create Invitation",
      guestName: "Guest Name",
      guestNamePlaceholder: "Enter guest full name",
      language: "Language",
      selectLanguage: "Select language",
      refresh: "Refresh",
      status: "Status",
      created: "Created",
      actions: "Actions",
      opened: "Opened",
      notOpened: "Not Opened",
      copyLink: "Copy Link",
      copied: "Copied!",
      deleteConfirm: "Are you sure you want to delete the invitation for",
      noInvitations: "No invitations yet. Create your first one above.",
    },
  },
  pl: {
    envelope: {
      dear: "Drogi/-a",
      subtitle: "Otrzymałeś/-aś specjalne zaproszenie",
      clickToOpen: "Kliknij, aby otworzyć",
    },
    dates: {
      weddingDate: "13 czerwca 2026",
      rsvpDeadline: "23 maja 2026",
    },
    boardingPass: {
      header: "KARTA POKŁADOWA ŚLUBU",
      flightNumber: "ŚLB-2026",
      passengerName: "Imię i nazwisko pasażera",
      departure: "Wylot",
      ceremony: "Ceremonia",
      arrival: "Przylot",
      reception: "Przyjęcie",
      followingCeremony: "Po ceremonii",
      importantInfo: "Ważne informacje",
      rsvp: "Potwierdzenie obecności",
      rsvpDescription: "Prosimy o potwierdzenie obecności do",
      contact: "Kontakt",
      contactDescription: "W razie pytań, skontaktuj się z nami",
      giftRegistry: "Lista prezentów",
      giftDescription:
        "Wasza obecność to najlepszy prezent, ale jeśli chcecie nas obdarować, będziemy wdzięczni za wkład w naszą wspólną przyszłość",
      monetaryGift: "Prezent pieniężny mile widziany",
      wineSpirits: "Wino i alkohole mile widziane",
      dresscode: "Dress code",
      dresscodeDescription: "Strój elegancki / formalny",
      boarding: "Boarding",
      boardingTime: "Bramki otwarte 30 min przed ceremonią",
      seat: "Miejsce",
      gate: "Bramka",
    },
    admin: {
      title: "Panel Zarządzania Zaproszeniami",
      secretKey: "Klucz dostępu",
      accessButton: "Zaloguj się do panelu",
      invalidCredentials: "Nieprawidłowe dane",
      createInvitation: "Utwórz zaproszenie",
      guestName: "Imię i nazwisko gościa",
      guestNamePlaceholder: "Wprowadź imię i nazwisko",
      language: "Język",
      selectLanguage: "Wybierz język",
      refresh: "Odśwież",
      status: "Status",
      created: "Utworzono",
      actions: "Akcje",
      opened: "Otwarte",
      notOpened: "Nieotwarte",
      copyLink: "Kopiuj link",
      copied: "Skopiowano!",
      deleteConfirm: "Czy na pewno chcesz usunąć zaproszenie dla",
      noInvitations: "Brak zaproszeń. Utwórz pierwsze powyżej.",
    },
  },
  uk: {
    envelope: {
      dear: "Дорогий/-а",
      subtitle: "Ви отримали спеціальне запрошення",
      clickToOpen: "Натисніть, щоб відкрити",
    },
    dates: {
      weddingDate: "13 червня 2026",
      rsvpDeadline: "23 травня 2026",
    },
    boardingPass: {
      header: "ПОСАДКОВИЙ ТАЛОН НА ВЕСІЛЛЯ",
      flightNumber: "ВЕС-2026",
      passengerName: "Ім'я пасажира",
      departure: "Відліт",
      ceremony: "Церемонія",
      arrival: "Приліт",
      reception: "Прийом",
      followingCeremony: "Після церемонії",
      importantInfo: "Важлива інформація",
      rsvp: "Підтвердження присутності",
      rsvpDescription: "Будь ласка, підтвердіть свою присутність до",
      contact: "Контакт",
      contactDescription: "Якщо у вас є питання, зв'яжіться з нами",
      giftRegistry: "Список подарунків",
      giftDescription:
        "Ваша присутність - найкращий подарунок, але якщо ви бажаєте нас обдарувати, ми будемо вдячні за внесок у наше спільне майбутнє",
      monetaryGift: "Грошовий подарунок вітається",
      wineSpirits: "Вино і алкоголь вітаються",
      dresscode: "Дрес-код",
      dresscodeDescription: "Елегантний / офіційний одяг",
      boarding: "Посадка",
      boardingTime: "Вхід відкритий за 30 хв до церемонії",
      seat: "Місце",
      gate: "Ворота",
    },
    admin: {
      title: "Панель управління запрошеннями",
      secretKey: "Секретний ключ",
      accessButton: "Увійти до панелі",
      invalidCredentials: "Неправильні дані",
      createInvitation: "Створити запрошення",
      guestName: "Ім'я гостя",
      guestNamePlaceholder: "Введіть повне ім'я",
      language: "Мова",
      selectLanguage: "Оберіть мову",
      refresh: "Оновити",
      status: "Статус",
      created: "Створено",
      actions: "Дії",
      opened: "Відкрито",
      notOpened: "Не відкрито",
      copyLink: "Копіювати посилання",
      copied: "Скопійовано!",
      deleteConfirm: "Ви впевнені, що хочете видалити запрошення для",
      noInvitations: "Немає запрошень. Створіть перше вище.",
    },
  },
};

export const languages: { code: Language; name: string; flag: string }[] = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "pl", name: "Polski", flag: "🇵🇱" },
  { code: "uk", name: "Українська", flag: "🇺🇦" },
];

export function getTranslation(lang: Language): TranslationKeys {
  return translations[lang] || translations.en;
}
