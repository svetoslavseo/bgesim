import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = i18n.language;
  const isEnglish = currentLanguage === 'en';

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    
    // Update URL to include language prefix
    const currentPath = window.location.pathname;
    let newPath = currentPath;
    
    if (lng === 'en') {
      // Add /en prefix if not already present
      if (!currentPath.startsWith('/en')) {
        newPath = `/en${currentPath}`;
      }
    } else {
      // Remove /en prefix for Bulgarian
      if (currentPath.startsWith('/en')) {
        newPath = currentPath.replace('/en', '');
      }
    }
    
    // Update browser URL
    window.history.pushState({}, '', newPath);
    setIsOpen(false);
  };

  const getLanguageName = (code: string) => {
    return code === 'en' ? 'English' : 'Български';
  };

  const getLanguageFlag = (code: string) => {
    return code === 'en' ? '🇺🇸' : '🇧🇬';
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <span>{getLanguageFlag(currentLanguage)}</span>
        <span>{getLanguageName(currentLanguage)}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-50">
          <div className="py-1">
            <button
              onClick={() => changeLanguage('bg')}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center space-x-2 ${
                currentLanguage === 'bg' ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
              }`}
            >
              <span>🇧🇬</span>
              <span>Български</span>
            </button>
            <button
              onClick={() => changeLanguage('en')}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center space-x-2 ${
                currentLanguage === 'en' ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
              }`}
            >
              <span>🇺🇸</span>
              <span>English</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher; 