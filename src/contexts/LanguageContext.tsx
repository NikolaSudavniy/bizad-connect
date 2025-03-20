
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
