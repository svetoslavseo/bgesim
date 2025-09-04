import React, { useState } from 'react';
import { Plan } from '../types';
import { FaBolt, FaWifi, FaRocket, FaGlobe } from 'react-icons/fa';
import { MdInfo } from 'react-icons/md';
import { COUNTRIES } from '../constants';
import { useTranslation } from 'react-i18next';

interface CountryPlansGridProps {
  plans: Plan[];
  countryName?: string;
}

// Utility function to format currency display
const formatCurrency = (currency: string) => {
    if (currency === 'USD') return '$';
    return currency;
};

const PLANS_PER_PAGE = 8;

const CountryPlansGrid: React.FC<CountryPlansGridProps> = ({ plans, countryName }) => {
  const { t, i18n } = useTranslation('plans');
  const [showAll, setShowAll] = useState(false);
  const [hoveredTooltip, setHoveredTooltip] = useState<string | null>(null);
  const visiblePlans = showAll ? plans : plans.slice(0, PLANS_PER_PAGE);
  
  // Helper to translate validity text to Bulgarian when language is Bulgarian
  const translateValidity = (validityStr: string | undefined) => {
    if (!validityStr) return '';
    
    if (i18n.language === 'bg') {
      if (validityStr.includes('7 days')) return '7 дни';
      if (validityStr.includes('15 days')) return '15 дни';
      if (validityStr.includes('30 days')) return '30 дни';
      if (validityStr.includes('1 day')) return '1 ден';
      if (validityStr.includes('days')) return validityStr.replace('days', 'дни');
      if (validityStr.includes('day')) return validityStr.replace('day', 'ден');
    }
    return validityStr;
  };

  // Derive an effective plan type when not explicitly provided
  const getEffectivePlanType = (plan: any): 'global' | 'regional' | 'country' => {
    if (Array.isArray(plan?.covered_countries)) {
      const n = plan.covered_countries.length;
      if (n > 50) return 'global';
      if (n > 1) return 'regional';
      if (n === 1) return 'country';
    }
    if (typeof plan?.planType === 'string') return plan.planType;
    if (typeof plan?.region === 'string' && plan.region.toLowerCase() === 'global') return 'global';
    return 'country';
  };

  // Helper to get plan type tooltip text
  const getPlanTypeTooltip = (planType: string) => {
    switch (planType) {
      case 'global':
        return 'Global plans work in 50+ countries worldwide';
      case 'regional':
        return 'Regional plans work in multiple countries within a specific region';
      case 'country':
        return 'Country plans work specifically in this destination';
      default:
        return 'Plan coverage information';
    }
  };
  return (
    <section className="my-16">
      <div className="px-6 md:px-16 py-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-2">{t('title', { country: countryName || 'this country' })}</h2>
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
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="text-gray-500 font-medium">{t('for_duration', { duration: translateValidity(plan.validity) })}</div>
                {/* Plan Type Label */}
                {(() => {
                  const effectiveType = getEffectivePlanType(plan);
                  return (
                    <div className="relative">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                        effectiveType === 'global' 
                          ? 'bg-purple-100 text-purple-700'
                          : effectiveType === 'regional'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {effectiveType === 'global' ? t('global') : 
                         effectiveType === 'regional' ? t('regional') : 
                         t('country')}
                        <MdInfo 
                          className="w-3 h-3 cursor-help"
                          onMouseEnter={() => setHoveredTooltip(`${effectiveType}-${plan.id}`)}
                          onMouseLeave={() => setHoveredTooltip(null)}
                        />
                      </span>
                      {/* Tooltip */}
                      {hoveredTooltip === `${effectiveType}-${plan.id}` && (
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg whitespace-nowrap z-10">
                          {getPlanTypeTooltip(effectiveType)}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
              <a
                href="#"
                className="text-blue-600 font-semibold hover:underline mt-auto text-base mb-2"
                onClick={e => {
                  e.preventDefault();
                  // Find the country object to get the code
                  const countryObj = COUNTRIES.find(c => c.name === countryName);
                  const countryCode = (countryObj?.countryCode || countryObj?.id || 'globe').toLowerCase();
                  const planData = {
                    country: countryName || 'this country',
                    flag: `/esim-data/flags/${countryCode.toLowerCase()}.svg`,
                    data: plan.data,
                    validity: plan.validity,
                    price: plan.price.amount_with_tax / 100,
                    currency: formatCurrency(plan.price.currency),
                    identifier: plan.identifier, // Use the plan UUID from saily_plans.json
                    priceIdentifier: (plan.price as any)?.identifier
                  };
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

export default CountryPlansGrid; 