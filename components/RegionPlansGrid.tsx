import React, { useState } from 'react';
import { Plan } from '../types';
import { FaBolt, FaWifi, FaRocket, FaGlobe } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

interface RegionPlansGridProps {
  plans: Plan[];
  regionName?: string;
}

// Utility function to format currency display
const formatCurrency = (currency: string) => {
    if (currency === 'USD') return '$';
    return currency;
};

const PLANS_PER_PAGE = 8;

const RegionPlansGrid: React.FC<RegionPlansGridProps> = ({ plans, regionName }) => {
  const [showAll, setShowAll] = useState(false);
  const { t, i18n } = useTranslation('plans');
  const visiblePlans = showAll ? plans : plans.slice(0, PLANS_PER_PAGE);

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

  return (
    <section className="my-16">
      <div className="px-6 md:px-16 py-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-2">{t('title', { country: regionName || 'this region' })}</h2>
        <p className="text-center text-gray-600 mb-8">{t('description')}</p>
        <div className="flex justify-center gap-6 mb-8">
          <span className="flex items-center gap-1 text-blue-600 text-sm font-medium"><FaBolt className="inline" />{t('features.instant_activation')}</span>
          <span className="flex items-center gap-1 text-blue-600 text-sm font-medium"><FaWifi className="inline" />{t('features.wifi_hotspot')}</span>
          <span className="flex items-center gap-1 text-blue-600 text-sm font-medium"><FaRocket className="inline" />{t('features.fast_internet')}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {visiblePlans.map(plan => (
            <div key={plan.id} className="bg-blue-50 rounded-2xl p-8 flex flex-col items-center shadow-sm transition hover:shadow-md">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <FaGlobe className="text-blue-400 text-3xl" />
              </div>
              <div className="text-3xl font-extrabold text-blue-900 mb-1">{plan.data}</div>
              <div className="text-gray-500 font-medium mb-4">{t('for_duration', { duration: translateValidity(plan.validity) })}</div>
              <a
                href="#"
                className="text-blue-600 font-semibold hover:underline mt-auto text-base"
                onClick={e => {
                  e.preventDefault();
                  const planData = {
                    country: regionName || 'this region',
                    flag: '/esim-data/flags/globe.svg',
                    data: plan.data,
                    validity: plan.validity,
                    price: plan.price.amount_with_tax / 100,
                    currency: formatCurrency(plan.price.currency),
                    identifier: plan.identifier, // Use the plan UUID from saily_plans.json
                    priceIdentifier: (plan.price as any)?.identifier
                  } as any;
                  const encodedPlan = encodeURIComponent(JSON.stringify(planData));
                  window.location.href = `/checkout?plan=${encodedPlan}`;
                }}
              >
                {t('buy_for_price', { 
                  currency: formatCurrency(plan.price.currency),
                  price: (plan.price.amount_with_tax / 100).toFixed(2)
                })} &rarr;
              </a>
            </div>
          ))}
        </div>
        {plans.length > PLANS_PER_PAGE && (
          <div className="flex justify-center mt-10">
            <a
              href="#"
              className="px-8 py-3 rounded-xl bg-white text-blue-700 font-semibold border border-blue-200 hover:bg-blue-50 transition text-lg shadow inline-block"
              onClick={(e) => {
                e.preventDefault();
                setShowAll(v => !v);
              }}
            >
              {showAll ? t('show_less') : t('show_more_plans', { count: plans.length - PLANS_PER_PAGE })}
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default RegionPlansGrid;
