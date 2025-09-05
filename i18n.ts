import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Only use browser-specific plugins on client-side
if (typeof window !== 'undefined') {
  i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next);
} else {
  // For SSR, only use initReactI18next
  i18n
    .use(initReactI18next);
}

i18n.init({
  fallbackLng: 'bg',
  debug: false,
  interpolation: {
    escapeValue: false,
  },
  // Only configure backend and detection on client-side
  ...(typeof window !== 'undefined' && {
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    detection: {
      order: ['path', 'localStorage', 'navigator'],
      lookupFromPathIndex: 0,
      lookupFromSubdomainIndex: 0,
      caches: ['localStorage'],
    },
  }),
  supportedLngs: ['bg', 'en'],
  ns: ['common', 'navigation', 'home', 'countries', 'faq', 'footer', 'about', 'legal', 'compatibility', 'calculator', 'what_is_esim', 'testimonials', 'checkout', 'cta', 'comparison', 'author', 'content', 'plans', 'esim_info', 'how_it_works', 'author_page', 'regions', 'articles'],
  defaultNS: 'common',
});

export default i18n; 