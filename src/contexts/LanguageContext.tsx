import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define available languages
export type Language = 'en' | 'ru' | 'ua';

// Define context type
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Create context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

// Translation data
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.findServices': 'Find Services',
    'nav.myListings': 'My Listings',
    'nav.myAccount': 'My Account',
    'nav.signIn': 'Sign In',
    'nav.signOut': 'Sign Out',
    'nav.switchAccount': 'Switch Account Type',
    
    // Account types
    'account.business': 'Business',
    'account.advertiser': 'Advertiser',
    
    // Business Dashboard
    'business.dashboard': 'Business Dashboard',
    'business.manageProfile': 'Manage your business profile and activities',
    'business.profile': 'Business Profile',
    'business.search': 'Ad Search',
    'business.agencies': 'Agency Offers',
    'business.training': 'Training',
    'business.reviews': 'Reviews & Ratings',
    'business.messages': 'Messages',
    'business.back': 'Back to Home',
    
    // Agency Dashboard
    'agency.dashboard': 'Advertiser Dashboard',
    'agency.manageProfile': 'Manage your advertising agency profile and activities',
    'agency.profile': 'Agency Profile',
    'agency.offers': 'Managing Offers',
    'agency.requests': 'Requests',
    'agency.training': 'Training',
    'agency.reports': 'Reports',
    'agency.reviews': 'Reviews',
    'agency.back': 'Back to Home',
    
    // Language selection
    'language': 'Language',
    'language.en': 'English',
    'language.ru': 'Russian',
    'language.ua': 'Ukrainian',
    
    // Categories
    'categories.all': 'All Categories',
    'categories.digital': 'Digital Marketing',
    'categories.print': 'Print Media',
    'categories.outdoor': 'Outdoor',
    'categories.social': 'Social Media',
    'categories.tv': 'TV & Radio',
    'categories.events': 'Events',
    'categories.influencer': 'Influencer',
    
    // Vacancies
    'vacancies.popular': 'Popular Vacancies',
    'vacancies.discover': 'Discover the most in-demand job opportunities',
    'vacancies.viewAll': 'View All Vacancies',
    'vacancies.noVacancies': 'No vacancies found for this category.',
    
    // Hero Section
    'hero.heading': 'Where Business Meets Advertising',
    'hero.subheading': 'The most intuitive platform to connect businesses with the perfect advertising opportunities.',
    'hero.button.postAd': 'Post an Ad',
    'hero.button.browse': 'Browse Listings',
    'hero.stats.listings': '10,000+ Active Listings',
    'hero.stats.companies': '5,000+ Companies',
    'hero.stats.support': '24/7 Support',
    
    // Featured Listings
    'listings.featured': 'Featured Listings',
    'listings.discover': 'Discover the best advertising opportunities',
    'listings.viewAll': 'View All Listings',
    'listings.viewDetails': 'View Details',
    'listings.featured.label': 'Featured',
    
    // Features Section
    'features.heading': 'Why Choose BizAdConnect',
    'features.subheading': 'The most intuitive platform designed to make business advertising simple, efficient, and effective.',
    'features.interface.title': 'Intuitive Interface',
    'features.interface.description': 'Our platform is designed with simplicity in mind, making it easy to navigate and use for businesses of all sizes.',
    'features.connections.title': 'Quick Connections',
    'features.connections.description': 'Connect with the right advertising opportunities faster with our intelligent matching system.',
    'features.insights.title': 'Performance Insights',
    'features.insights.description': 'Track the performance of your advertising campaigns with detailed analytics and reporting.',
    'features.learnMore': 'Learn more about our features',
    
    // CTA Section
    'cta.heading': 'Ready to Connect Your Business?',
    'cta.subheading': 'Join thousands of businesses and advertising platforms already using BizAdConnect to grow their reach.',
    'cta.getStarted': 'Get Started Now',
    'cta.demo': 'Schedule a Demo',
    
    // Footer
    'footer.description': 'The most convenient platform for business and advertising interactions.',
    'footer.platform': 'Platform',
    'footer.platform.browse': 'Browse Ads',
    'footer.platform.post': 'Post an Ad',
    'footer.platform.pricing': 'Pricing',
    'footer.platform.stories': 'Success Stories',
    'footer.company': 'Company',
    'footer.company.about': 'About Us',
    'footer.company.careers': 'Careers',
    'footer.company.blog': 'Blog',
    'footer.company.press': 'Press',
    'footer.support': 'Support',
    'footer.support.help': 'Help Center',
    'footer.support.contact': 'Contact Us',
    'footer.support.privacy': 'Privacy Policy',
    'footer.support.terms': 'Terms of Service',
    'footer.copyright': '© {year} BizAdConnect. All rights reserved.',
    'footer.social.twitter': 'Twitter',
    'footer.social.linkedin': 'LinkedIn',
    'footer.social.instagram': 'Instagram',
    'footer.social.facebook': 'Facebook',
    
    // Search
    'search.placeholder': 'Search for ads, companies, or keywords...',
    'search.button': 'Search',
    
    // Vacancies Page
    'vacancies.allVacancies': 'All Vacancies',
    'vacancies.browseDescription': 'Browse through all available job opportunities',
    'vacancies.searchPlaceholder': 'Search by title, company or location',
    'vacancies.noVacanciesFound': 'No vacancies found',
    'vacancies.tryDifferentSearch': 'Try different search terms or browse all categories',
    'vacancies.loading': 'Loading vacancies...',
    
    // Pagination
    'pagination.previous': 'Previous',
    'pagination.next': 'Next',
    
    // Categories
    'categories.filterBy': 'Filter by category',
  },
  ru: {
    // Navbar
    'nav.home': 'Главная',
    'nav.findServices': 'Найти услуги',
    'nav.myListings': 'Мои объявления',
    'nav.myAccount': 'Мой аккаунт',
    'nav.signIn': 'Войти',
    'nav.signOut': 'Выйти',
    'nav.switchAccount': 'Сменить тип аккаунта',
    
    // Account types
    'account.business': 'Бизнес',
    'account.advertiser': 'Рекламодатель',
    
    // Business Dashboard
    'business.dashboard': 'Панель бизнеса',
    'business.manageProfile': 'Управляйте профилем и деятельностью вашего бизнеса',
    'business.profile': 'Профиль компании',
    'business.search': 'Поиск рекламы',
    'business.agencies': 'Предложения агентств',
    'business.training': 'Обучение',
    'business.reviews': 'Отзывы и рейтинги',
    'business.messages': 'Сообщения',
    'business.back': 'Вернуться на главную',
    
    // Agency Dashboard
    'agency.dashboard': 'Панель рекламодателя',
    'agency.manageProfile': 'Управляйте профилем и деятельностью вашего рекламного агентства',
    'agency.profile': 'Профиль агентства',
    'agency.offers': 'Управление предложениями',
    'agency.requests': 'Запросы',
    'agency.training': 'Обучение',
    'agency.reports': 'Отчеты',
    'agency.reviews': 'Отзывы',
    'agency.back': 'Вернуться на главную',
    
    // Language selection
    'language': 'Язык',
    'language.en': 'Английский',
    'language.ru': 'Русский',
    'language.ua': 'Украинский',
    
    // Categories
    'categories.all': 'Все категории',
    'categories.digital': 'Цифровой маркетинг',
    'categories.print': 'Печатные СМИ',
    'categories.outdoor': 'Наружная реклама',
    'categories.social': 'Социальные сети',
    'categories.tv': 'ТВ и Радио',
    'categories.events': 'Мероприятия',
    'categories.influencer': 'Инфлюенсеры',
    
    // Vacancies
    'vacancies.popular': 'Популярные вакансии',
    'vacancies.discover': 'Откройте для себя наиболее востребованные вакансии',
    'vacancies.viewAll': 'Смотреть все вакансии',
    'vacancies.noVacancies': 'В этой категории вакансий не найдено.',
    
    // Hero Section
    'hero.heading': 'Где бизнес встречается с рекламой',
    'hero.subheading': 'Самая интуитивно понятная платформа для связи бизнеса с идеальными рекламными возможностями.',
    'hero.button.postAd': 'Разместить объявление',
    'hero.button.browse': 'Просмотреть объявления',
    'hero.stats.listings': '10,000+ активных объявлений',
    'hero.stats.companies': '5,000+ компаний',
    'hero.stats.support': 'Поддержка 24/7',
    
    // Featured Listings
    'listings.featured': 'Рекомендуемые объявления',
    'listings.discover': 'Откройте для себя лучшие рекламные возможности',
    'listings.viewAll': 'Просмотреть все объявления',
    'listings.viewDetails': 'Подробнее',
    'listings.featured.label': 'Рекомендуемые',
    
    // Features Section
    'features.heading': 'Почему выбирают BizAdConnect',
    'features.subheading': 'Самая интуитивно понятная платформа, разработанная для того, чтобы сделать бизнес-рекламу простой, эффективной и результативной.',
    'features.interface.title': 'Интуитивный интерфейс',
    'features.interface.description': 'Наша платформа разработана с учетом простоты использования, что делает ее легкой в навигации и использовании для бизнеса любого размера.',
    'features.connections.title': 'Быстрые связи',
    'features.connections.description': 'Связывайтесь с нужными рекламными возможностями быстрее благодаря нашей интеллектуальной системе подбора.',
    'features.insights.title': 'Анализ эффективности',
    'features.insights.description': 'Отслеживайте эффективность ваших рекламных кампаний с помощью детальной аналитики и отчетности.',
    'features.learnMore': 'Узнать больше о наших функциях',
    
    // CTA Section
    'cta.heading': 'Готовы связать свой бизнес?',
    'cta.subheading': 'Присоединяйтесь к тысячам предприятий и рекламных платформ, которые уже используют BizAdConnect для расширения своего охвата.',
    'cta.getStarted': 'Начать сейчас',
    'cta.demo': 'Запланировать демонстрацию',
    
    // Footer
    'footer.description': 'Самая удобная платформа для взаимодействия бизнеса и рекламы.',
    'footer.platform': 'Платформа',
    'footer.platform.browse': 'Просмотр объявлений',
    'footer.platform.post': 'Разместить объявление',
    'footer.platform.pricing': 'Цены',
    'footer.platform.stories': 'Истории успеха',
    'footer.company': 'Компания',
    'footer.company.about': 'О нас',
    'footer.company.careers': 'Карьера',
    'footer.company.blog': 'Блог',
    'footer.company.press': 'Пресса',
    'footer.support': 'Поддержка',
    'footer.support.help': 'Центр помощи',
    'footer.support.contact': 'Связаться с нами',
    'footer.support.privacy': 'Политика конфиденциальности',
    'footer.support.terms': 'Условия обслуживания',
    'footer.copyright': '© {year} BizAdConnect. Все права защищены.',
    'footer.social.twitter': 'Twitter',
    'footer.social.linkedin': 'LinkedIn',
    'footer.social.instagram': 'Instagram',
    'footer.social.facebook': 'Facebook',
    
    // Search
    'search.placeholder': 'Поиск объявлений, компаний или ключевых слов...',
    'search.button': 'Поиск',
    
    // Vacancies Page
    'vacancies.allVacancies': 'Все вакансии',
    'vacancies.browseDescription': 'Просмотрите все доступные вакансии',
    'vacancies.searchPlaceholder': 'Поиск по названию, компании или месту',
    'vacancies.noVacanciesFound': 'Вакансии не найдены',
    'vacancies.tryDifferentSearch': 'Попробуйте другие условия поиска или просмотрите все категории',
    'vacancies.loading': 'Загрузка вакансий...',
    
    // Pagination
    'pagination.previous': 'Предыдущая',
    'pagination.next': 'Следующая',
    
    // Categories
    'categories.filterBy': 'Фильтровать по категории',
  },
  ua: {
    // Navbar
    'nav.home': 'Головна',
    'nav.findServices': 'Знайти послуги',
    'nav.myListings': 'Мої оголошення',
    'nav.myAccount': 'Мій аккаунт',
    'nav.signIn': 'Увійти',
    'nav.signOut': 'Вийти',
    'nav.switchAccount': 'Змінити тип облікового запису',
    
    // Account types
    'account.business': 'Бізнес',
    'account.advertiser': 'Рекламодавець',
    
    // Business Dashboard
    'business.dashboard': 'Панель бізнесу',
    'business.manageProfile': 'Керуйте профілем та діяльністю вашого бізнесу',
    'business.profile': 'Профіль компанії',
    'business.search': 'Пошук реклами',
    'business.agencies': 'Пропозиції агентств',
    'business.training': 'Навчання',
    'business.reviews': 'Відгуки та рейтинги',
    'business.messages': 'Повідомлення',
    'business.back': 'Повернутися на головну',
    
    // Agency Dashboard
    'agency.dashboard': 'Панель рекламодавця',
    'agency.manageProfile': 'Керуйте профілем та діяльністю вашого рекламного агентства',
    'agency.profile': 'Профіль агентства',
    'agency.offers': 'Керування пропозиціями',
    'agency.requests': 'Запити',
    'agency.training': 'Навчання',
    'agency.reports': 'Звіти',
    'agency.reviews': 'Відгуки',
    'agency.back': 'Повернутися на головну',
    
    // Language selection
    'language': 'Мова',
    'language.en': 'Англійська',
    'language.ru': 'Російська',
    'language.ua': 'Українська',
    
    // Categories
    'categories.all': 'Всі категорії',
    'categories.digital': 'Цифровий маркетинг',
    'categories.print': 'Друковані ЗМІ',
    'categories.outdoor': 'Зовнішня реклама',
    'categories.social': 'Соціальні мережі',
    'categories.tv': 'ТБ та Радіо',
    'categories.events': 'Заходи',
    'categories.influencer': 'Інфлюенсери',
    
    // Vacancies
    'vacancies.popular': 'Популярні вакансії',
    'vacancies.discover': 'Відкрийте для себе найбільш затребувані вакансії',
    'vacancies.viewAll': 'Переглянути всі вакансії',
    'vacancies.noVacancies': 'У цій категорії вакансій не знайдено.',
    
    // Hero Section
    'hero.heading': 'Де бізнес зустрічається з рекламою',
    'hero.subheading': 'Найбільш інтуїтивно зрозуміла платформа для зв\'язку бізнесу з ідеальними рекламними можливостями.',
    'hero.button.postAd': 'Розмістити оголошення',
    'hero.button.browse': 'Переглянути оголошення',
    'hero.stats.listings': '10,000+ активних оголошень',
    'hero.stats.companies': '5,000+ компаній',
    'hero.stats.support': 'Підтримка 24/7',
    
    // Featured Listings
    'listings.featured': 'Рекомендовані оголошення',
    'listings.discover': 'Відкрийте для себе найкращі рекламні можливості',
    'listings.viewAll': 'Переглянути всі оголошення',
    'listings.viewDetails': 'Детальніше',
    'listings.featured.label': 'Рекомендовані',
    
    // Features Section
    'features.heading': 'Чому обирають BizAdConnect',
    'features.subheading': 'Найбільш інтуїтивно зрозуміла платформа, розроблена для того, щоб зробити бізнес-рекламу простою, ефективною та результативною.',
    'features.interface.title': 'Інтуїтивний інтерфейс',
    'features.interface.description': 'Наша платформа розроблена з урахуванням простоти використання, що робить її легкою в навігації та використанні для бізнесу будь-якого розміру.',
    'features.connections.title': 'Швидкі зв\'язки',
    'features.connections.description': 'Зв\'язуйтесь з потрібними рекламними можливостями швидше завдяки нашій інтелектуальній системі підбору.',
    'features.insights.title': 'Аналіз ефективності',
    'features.insights.description': 'Відстежуйте ефективність ваших рекламних кампаній за допомогою детальної аналітики та звітності.',
    'features.learnMore': 'Дізнатися більше про наші функції',
    
    // CTA Section
    'cta.heading': 'Готові зв\'язати свій бізнес?',
    'cta.subheading': 'Приєднуйтесь до тисяч підприємств та рекламних платформ, які вже використовують BizAdConnect для розширення свого охоплення.',
    'cta.getStarted': 'Почати зараз',
    'cta.demo': 'Запланувати демонстрацію',
    
    // Footer
    'footer.description': 'Найзручніша платформа для взаємодії бізнесу та реклами.',
    'footer.platform': 'Платформа',
    'footer.platform.browse': 'Перегляд оголошень',
    'footer.platform.post': 'Розмістити оголошення',
    'footer.platform.pricing': 'Ціни',
    'footer.platform.stories': 'Історії успіху',
    'footer.company': 'Компанія',
    'footer.company.about': 'Про нас',
    'footer.company.careers': 'Кар\'єра',
    'footer.company.blog': 'Блог',
    'footer.company.press': 'Преса',
    'footer.support': 'Підтримка',
    'footer.support.help': 'Центр допомоги',
    'footer.support.contact': 'Зв\'язатися з нами',
    'footer.support.privacy': 'Політика конфіденційності',
    'footer.support.terms': 'Умови обслуговування',
    'footer.copyright': '© {year} BizAdConnect. Всі права захищені.',
    'footer.social.twitter': 'Twitter',
    'footer.social.linkedin': 'LinkedIn',
    'footer.social.instagram': 'Instagram',
    'footer.social.facebook': 'Facebook',
    
    // Search
    'search.placeholder': 'Пошук оголошень, компаній або ключових слів...',
    'search.button': 'Пошук',
    
    // Vacancies Page
    'vacancies.allVacancies': 'Всі вакансії',
    'vacancies.browseDescription': 'Перегляньте всі доступні вакансії',
    'vacancies.searchPlaceholder': 'Пошук за назвою, компанією або місцем',
    'vacancies.noVacanciesFound': 'Вакансії не знайдено',
    'vacancies.tryDifferentSearch': 'Спробуйте інші умови пошуку або перегляньте всі категорії',
    'vacancies.loading': 'Завантаження вакансій...',
    
    // Pagination
    'pagination.previous': 'Попередня',
    'pagination.next': 'Наступна',
    
    // Categories
    'categories.filterBy': 'Фільтрувати за категорією',
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  // Initialize state from localStorage or default to 'en'
  const [language, setLanguage] = useState<Language>(() => {
    const savedLang = localStorage.getItem('language') as Language;
    return (savedLang && ['en', 'ru', 'ua'].includes(savedLang)) ? savedLang : 'en';
  });

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using language context
export const useLanguage = () => useContext(LanguageContext);
