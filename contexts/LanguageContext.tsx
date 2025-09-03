import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageContextType {
  currentLanguage: string;
  changeLanguage: (lang: string) => void;
  isBulgarian: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();
  
  // Initialize language state based on URL (works for both SSR and client)
  const getInitialLanguage = (): string => {
    if (typeof window !== 'undefined') {
      // Client-side: get from window.location
      const path = window.location.pathname;
      if (path.startsWith('/en')) return 'en';
      return 'bg'; // Default to Bulgarian for main site
    } else {
      // SSR: get from global window mock
      const path = globalThis.window?.location?.pathname || '/';
      if (path.startsWith('/en')) return 'en';
      return 'bg'; // Default to Bulgarian for main site
    }
  };
  
  const [currentLanguage, setCurrentLanguage] = useState(getInitialLanguage());

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setCurrentLanguage(lang);
    
    // Update URL to include language prefix (client-side only)
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      let newPath = currentPath;
      
      if (lang === 'en') {
        // Add /en prefix if not already present
        if (!currentPath.startsWith('/en')) {
          newPath = `/en${currentPath}`;
        }
      } else {
        // Remove /en prefix for Bulgarian (main site)
        if (currentPath.startsWith('/en')) {
          newPath = currentPath.replace('/en', '');
        }
      }
      
      // Update browser URL
      window.history.pushState({}, '', newPath);
    }
  };

  // Initialize language from URL on mount (client-side only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      let lang = 'bg'; // Default to Bulgarian
      if (path.startsWith('/en')) lang = 'en';
      setCurrentLanguage(lang);
      
      // Set language in i18n if different
      if (lang !== i18n.language) {
        i18n.changeLanguage(lang);
      }
    }
  }, [i18n]);

  // Update context when i18n language changes
  useEffect(() => {
    setCurrentLanguage(i18n.language);
  }, [i18n.language]);

  return (
    <LanguageContext.Provider value={{ 
      currentLanguage, 
      changeLanguage, 
      isBulgarian: currentLanguage === 'bg'
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}; 