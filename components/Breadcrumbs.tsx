import React from 'react';
import { useTranslation } from 'react-i18next';

interface BreadcrumbItem {
  label: string;
  url?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  navigateTo: (route: string) => void;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, navigateTo }) => {
  const { t, i18n } = useTranslation('common');
  const isChinese = i18n.language === 'zh';
  
  // Get the appropriate home label based on language
  const getHomeLabel = () => {
    if (isChinese) {
      return t('company_name') || 'Travel eSIMple';
    }
    return t('company_name') || 'Travel eSIMple';
  };

  // Get the appropriate home URL based on language
  const getHomeUrl = () => {
    return isChinese ? '/zh' : '/';
  };
  
  return (
    <nav className="bg-black border-b border-gray-800 py-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 text-sm">
          <a
            href={getHomeUrl()}
            className="text-white hover:text-gray-300 transition-colors flex items-center space-x-1"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>{getHomeLabel()}</span>
          </a>
          
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              
              {item.url ? (
                <a
                  href={item.url}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  {item.label}
                </a>
              ) : (
                <span className="text-white font-medium">{item.label}</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Breadcrumbs; 