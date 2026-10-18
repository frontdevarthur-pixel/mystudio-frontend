import type { Lang } from '@/lib/api/endpoints';

export const translations = {
  uk: {
    // UI Elements
    close: 'Закрити',
    prev: 'Назад',
    next: 'Вперед',
    slide: 'Слайд',
    loading: 'Завантаження...',
    error: 'Сталася помилка',
    
    // Header/Footer
    menuOpen: 'Відкрити меню',
    menuClose: 'Закрити меню',
    discussProject: 'Обговорити проект',
    viewPortfolio: 'Дивитися роботи',
    allRightsReserved: 'Всі права захищені.',
    contacts: 'Контакти',
    social: 'Соцмережі',
    
    // Common sections
    aboutUs: 'Про нас',
    selectedProjects: 'Вибрані проекти',
    readyToStart: 'Готові починати?',
    learnMore: 'Детальніше',
    team: 'Команда',
    teamPhoto: 'Фото команди',
    uploadViaWP: 'Завантажте через WordPress Admin',
    
    // Geography
    clientGeography: 'Географія клієнтів',
    worldwideWork: 'Ми працюємо з клієнтами по всьому світу',
    projectsCount: 'проектів',
    clientsCount: 'клієнтів',
    countries: 'країн',
    
    // Contact Form
    formName: "Ваше ім'я *",
    formEmail: 'Email *',
    formPhone: 'Телефон (необов\'язково)',
    formDescription: 'Опишіть ваш проект *',
    formSubmit: 'Надіслати заявку →',
    formSending: 'Надсилаємо...',
    formSuccessTitle: 'Заявку надіслано!',
    formSuccessText: 'Ми зв\'яжемося з вами найближчим часом.',
    formErrorText: 'Сталася помилка. Спробуйте пізніше або напишіть нам напряму.',
    formNameError: 'Введіть ваше ім\'я',
    formEmailError: 'Введіть коректний email',
    formPhoneError: 'Введіть коректний номер',
    formDescError: 'Опишіть проект (мінімум 10 символів)',
    
    // Stats
    statsCtaText: 'Готові стати частиною цієї статистики?',
    
    // Services
    servicesWhatWeDo: 'Що ми вміємо',
    servicesFullCycle: 'Повний цикл — від ідеї та дизайну до запуску і підтримки',
    
    // Technologies
    techTitle: 'Технології',
    techSubtitle: 'Інструменти, якими ми будуємо продукти',
  },
  en: {
    // UI Elements
    close: 'Close',
    prev: 'Previous',
    next: 'Next',
    slide: 'Slide',
    loading: 'Loading...',
    error: 'Something went wrong',
    
    // Header/Footer
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    discussProject: 'Discuss project',
    viewPortfolio: 'View portfolio',
    allRightsReserved: 'All rights reserved.',
    contacts: 'Contacts',
    social: 'Social',
    
    // Common sections
    aboutUs: 'About us',
    selectedProjects: 'Selected projects',
    readyToStart: 'Ready to start?',
    learnMore: 'Learn more',
    team: 'Team',
    teamPhoto: 'Team photo',
    uploadViaWP: 'Upload via WordPress Admin',
    
    // Geography
    clientGeography: 'Client Geography',
    worldwideWork: 'We work with clients worldwide',
    projectsCount: 'projects',
    clientsCount: 'clients',
    countries: 'countries',
    
    // Contact Form
    formName: 'Your name *',
    formEmail: 'Email *',
    formPhone: 'Phone (optional)',
    formDescription: 'Describe your project *',
    formSubmit: 'Send request →',
    formSending: 'Sending...',
    formSuccessTitle: 'Request sent!',
    formSuccessText: 'We will contact you shortly.',
    formErrorText: 'Something went wrong. Please try again or contact us directly.',
    formNameError: 'Enter your name',
    formEmailError: 'Enter a valid email',
    formPhoneError: 'Enter a valid phone number',
    formDescError: 'Describe your project (minimum 10 characters)',
    
    // Stats
    statsCtaText: 'Ready to be part of this statistics?',
    
    // Services
    servicesWhatWeDo: 'What we do',
    servicesFullCycle: 'Full cycle — from idea and design to launch and support',
    
    // Technologies
    techTitle: 'Technologies',
    techSubtitle: 'Tools we use to build products',
  }
};

export type TranslationKey = keyof typeof translations.uk;

export function t(key: TranslationKey, lang: Lang = 'uk'): string {
  const dict = translations[lang] || translations.uk;
  // @ts-ignore
  return dict[key] || translations.uk[key] || key;
}
