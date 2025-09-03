import React from 'react';
import { COUNTRIES } from '../constants';
import PaymentMethods from './PaymentMethods';
import { useTranslation } from 'react-i18next';

interface HowToGetESIMProps {
  countryName?: string;
  regionName?: string;
}

const HowToGetESIM: React.FC<HowToGetESIMProps> = ({ countryName, regionName }) => {
  const { t, i18n } = useTranslation('home');

  // Helper to translate validity text to Bulgarian when language is Bulgarian
  const translateValidity = (validityStr: string | undefined) => {
    if (!validityStr) return '';
    
    // Check if the current language is Bulgarian
    const currentLang = i18n.language;
    if (currentLang === 'bg') {
      // Translate common validity patterns to Bulgarian
      if (validityStr.includes('7 days')) {
        return '7 дни';
      } else if (validityStr.includes('15 days')) {
        return '15 дни';
      } else if (validityStr.includes('30 days')) {
        return '30 дни';
      } else if (validityStr.includes('1 day')) {
        return '1 ден';
      } else if (validityStr.includes('days')) {
        // Generic pattern: replace "days" with "дни"
        return validityStr.replace('days', 'дни');
      } else if (validityStr.includes('day')) {
        // Generic pattern: replace "day" with "ден"
        return validityStr.replace('day', 'ден');
      }
    }
    
    // Return original text for other languages
    return validityStr;
  };

  const title = countryName 
    ? t('how_to_get_esim_country', { country: countryName })
    : regionName 
    ? t('how_to_get_esim_region', { region: regionName })
    : t('how_to_get_esim');

  // Get country flag and name for localization
  const getCountryInfo = () => {
    if (countryName) {
      // Try to find the country by name or partial name matching
      const country = COUNTRIES.find((c: any) => {
        // Exact match
        if (c.name === countryName) return true;
        
        // Check if the translated name matches (for common translations)
        const commonTranslations: { [key: string]: string } = {
          'Бахрейн': 'Bahrain',
          'Тайланд': 'Thailand',
          'Турция': 'Turkey',
          'Малайзия': 'Malaysia',
          'Обединени арабски емирства': 'United Arab Emirates',
          'Индия': 'India',
          'Нидерландия': 'Netherlands',
          'Южна Корея': 'South Korea',
          'Сингапур': 'Singapore',
          'Канада': 'Canada',
          'Мексико': 'Mexico',
          'Андора': 'Andorra'
        };
        
        if (commonTranslations[countryName] === c.name) return true;
        
        // Partial name matching
        return c.name.toLowerCase().includes(countryName.toLowerCase()) || 
               countryName.toLowerCase().includes(c.name.toLowerCase());
      });
      
      if (country) {
        return { flag: country.flag, name: countryName }; // Use the translated name
      }
    }
    // Default to Thailand if no specific country found
    return { flag: '🇹🇭', name: 'Thailand' };
  };

  const countryInfo = getCountryInfo();

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Title and Subtitle */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {title}
            </h2>
            <p className="text-lg text-gray-600">
              {t('ready_to_get_started')}
            </p>
          </div>

          {/* Three Steps Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1: Choose a data plan */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full text-sm font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {t('step1_title')}
              </h3>
              <p className="text-gray-600 mb-6">
                {t('step1_description')}
              </p>
              
              {/* Plan Selection UI */}
              <div className="space-y-3">
                <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
                    <div>
                      <div className="text-gray-400 text-sm">1 GB</div>
                      <div className="text-gray-400 text-xs">7 days</div>
                    </div>
                  </div>
                </div>
                <div className="border-2 border-blue-600 rounded-lg p-3 bg-white">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">3 GB</div>
                      <div className="text-gray-600 text-sm">{translateValidity('30 days')}</div>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
                    <div>
                      <div className="text-gray-400 text-sm">5 GB</div>
                      <div className="text-gray-400 text-xs">{translateValidity('30 days')}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Set up your eSIM */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full text-sm font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {t('step2_title')}
              </h3>
              <p className="text-gray-600 mb-6">
                {t('step2_description')}
              </p>
              
              {/* eSIM Installation UI */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mb-3">
                  <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="text-sm font-medium text-gray-900">{t('esim_installed')}</div>
              </div>
            </div>

            {/* Step 3: Enjoy your data */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full text-sm font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {t('step3_title', { country: countryInfo.name })}
              </h3>
              <p className="text-gray-600 mb-6">
                {t('step3_description', { country: countryInfo.name })}
              </p>
              
              {/* Active Plan UI */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{countryInfo.flag}</span>
                    <span className="font-bold text-gray-900">{countryInfo.name}</span>
                  </div>
                  <span className="px-3 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
                    {t('active')}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{t('remaining_data')}</span>
                    <span className="font-bold text-gray-900">5 / 5 GB</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{t('expires_in')}</span>
                    <span className="font-bold text-gray-900">{translateValidity('29 days, 7 hours')}</span>
                  </div>
                </div>
                
                {/* Placeholder UI elements */}
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HowToGetESIM; 