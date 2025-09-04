import React, { useState, useEffect } from 'react';
import PaymentMethods from '../components/PaymentMethods';
import { useTranslation } from 'react-i18next';
import { useChineseContext, formatChineseCurrency } from '../utils/chineseUtils';
import { FiArrowRight } from 'react-icons/fi';

interface Plan {
  country: string;
  flag: string;
  data: string;
  validity: string;
  price: number;
  currency: string;
  identifier?: string;
  priceIdentifier?: string;
}

const CheckoutPage = () => {
  const { t, i18n } = useTranslation(['checkout', 'countries']);
  const { isChinese } = useChineseContext();
  
  // Helper function for countries namespace (same pattern as CountryPage)
  const c = (key: string, options: any = {}) => t(key, { ns: 'countries', ...options }) as string;
  
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

  const [plan, setPlan] = useState<Plan>({
    country: 'Austria',
    flag: '/esim-data/flags/at.svg',
    data: '1GB',
    validity: '7 days',
    price: 3.99,
    currency: '$',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [flagError, setFlagError] = useState(false);

  // Helper function to get translated country/region name
  const getTranslatedName = (name: string) => {
    console.log('getTranslatedName called with:', name);
    console.log('Current language:', i18n.language);
    console.log('i18n ready:', i18n.isInitialized);
    
    // Check if i18n is ready
    if (!i18n.isInitialized) {
      console.log('i18n not ready, returning original name');
      return name;
    }
    
    // First, try to map English region names to translation keys
    const regionNameToId: Record<string, string> = {
      'North America': 'north-america',
      'South America': 'south-america',
      'Europe': 'europe',
      'Asia': 'asia',
      'Africa': 'africa',
      'Oceania': 'oceania'
    };
    
    // Check if it's a region name first
    if (regionNameToId[name]) {
      try {
        const regionId = regionNameToId[name];
        const translated = t(`regions.${regionId}`, { ns: 'countries' });
        console.log('Region translation attempt:', { name, regionId, result: translated });
        
        // If translation is found and not the same as the key, return it
        if (translated && translated !== `regions.${regionId}`) {
          return translated;
        }
      } catch (error) {
        console.error('Region translation error:', error);
      }
      
      // Fallback to original name if translation fails
      return name;
    }
    
    // For countries, try to use the translation system
    try {
      const translated = c(name.toLowerCase().replace(/\s+/g, '-'));
      console.log('Country translation attempt:', { name, key: name.toLowerCase().replace(/\s+/g, '-'), result: translated });
      
      // If translation failed (returned the key), use original name
      if (translated === name.toLowerCase().replace(/\s+/g, '-')) {
        console.log('Country translation failed, using original name');
        return name;
      }
      
      return translated;
    } catch (error) {
      console.error('Translation error:', error);
      return name;
    }
  };

  useEffect(() => {
    const init = async () => {
      // Get plan data from URL parameters
      const urlParams = new URLSearchParams(window.location.search);
      const planData = urlParams.get('plan');
      
      if (planData) {
        try {
          const decodedPlan = JSON.parse(decodeURIComponent(planData));
          
          // Validate the plan data
          if (decodedPlan && typeof decodedPlan === 'object') {
            // Ensure price is a number
            if (typeof decodedPlan.price === 'object' && decodedPlan.price.amount_with_tax) {
              decodedPlan.price = decodedPlan.price.amount_with_tax / 100;
            }
            
            console.log('DEBUG: decodedPlan in checkout:', decodedPlan);
            console.log('DEBUG: decodedPlan.identifier:', decodedPlan.identifier);
            console.log('DEBUG: decodedPlan.priceIdentifier:', decodedPlan.priceIdentifier);
            
            // Backfill priceIdentifier from saily_plans.json if missing
            if (!decodedPlan.priceIdentifier && decodedPlan.identifier) {
              try {
                const resp = await fetch('/saily_plans.json');
                if (resp.ok) {
                  const data = await resp.json();
                  const items = Array.isArray(data?.items) ? data.items : [];
                  const matched = items.find((it: any) => it?.identifier === decodedPlan.identifier);
                  const priceId = matched?.price?.identifier;
                  if (priceId) {
                    console.log('DEBUG: Backfilled priceIdentifier from saily_plans.json:', priceId);
                    decodedPlan.priceIdentifier = priceId;
                  } else {
                    console.warn('WARN: Could not backfill priceIdentifier for identifier:', decodedPlan.identifier);
                  }
                } else {
                  console.warn('WARN: Failed to fetch saily_plans.json for backfill');
                }
              } catch (fetchErr) {
                console.error('Error backfilling priceIdentifier:', fetchErr);
              }
            }
            
            setPlan(decodedPlan);
          } else {
            setError(t('errors.invalid_plan_data'));
          }
        } catch (error) {
          console.error('Error parsing plan data:', error);
          setError(t('errors.unable_to_load_plan'));
        }
      } else {
        setError(t('errors.no_plan_provided'));
      }
      
      setIsLoading(false);
    };
    void init();
  }, []);

  const handleProceedToPayment = () => {
    const planIdForCheckout = plan.priceIdentifier;
    if (!planIdForCheckout) {
      setError(t('errors.no_plan_identifier'));
      return;
    }

    try {
      console.log('DEBUG: plan in handleProceedToPayment:', plan);
      console.log('DEBUG: plan.identifier (unused for checkout):', plan.identifier);
      console.log('DEBUG: plan.priceIdentifier (used):', plan.priceIdentifier);
      console.log('DEBUG: planIdForCheckout:', planIdForCheckout);
      
      const sailyCheckoutUrl = isChinese 
        ? `https://saily.com/zh/checkout/?planId=${planIdForCheckout}&aff_transaction_id={transaction_id}&aff_offer_id={offer_id}&aff_id={aff_id}`
        : `https://saily.com/checkout/?planId=${planIdForCheckout}&aff_transaction_id={transaction_id}&aff_offer_id={offer_id}&aff_id={aff_id}`;
      const finalUrl = `https://go.saily.site/aff_c?offer_id=101&aff_id=8080&url=${encodeURIComponent(sailyCheckoutUrl)}`;
      console.log('DEBUG: sailyCheckoutUrl:', sailyCheckoutUrl);
      console.log('DEBUG: finalUrl:', finalUrl);
      window.location.href = finalUrl;
    } catch (error) {
      console.error('Error redirecting to payment:', error);
      setError(t('errors.unable_to_proceed_payment'));
    }
  };

  // Format price based on language
  const formatPrice = (price: number, currency: string) => {
    if (isChinese) {
      return formatChineseCurrency(price, currency);
    }
    return `${currency}${price.toFixed(2)}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-8 px-2">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6 sm:p-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">{t('loading.message')}</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-8 px-2">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6 sm:p-10">
          <a href={isChinese ? "/zh" : "/"} className="text-gray-500 text-sm mb-4 inline-block">&larr; {t('navigation.back')}</a>
          <div className="text-center">
            <div className="text-red-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{t('error.title')}</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <a href={isChinese ? "/zh" : "/"} className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              {t('error.return_home')}
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 pb-28 px-2">
      <div className="w-full max-w-xl mx-auto">
        <a href={isChinese ? "/zh" : "/"} className="text-gray-500 text-sm mb-4 inline-block">&larr; {t('navigation.back')}</a>
        
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-10">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">{t('summary.title')}</h1>
          
          {/* Plan Summary */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-3 mb-3">
              {!flagError ? (
                <img 
                  src={plan.flag} 
                  alt={`${getTranslatedName(plan.country)} flag`}
                  className="w-8 h-8 rounded"
                  onError={() => setFlagError(true)}
                />
              ) : (
                <div className="w-8 h-8 bg-gray-300 rounded flex items-center justify-center">
                  <span className="text-gray-600 text-xs">🏳️</span>
                </div>
              )}
              <h2 className="text-lg font-semibold text-gray-900">
                {t('summary.esim_for', { country: getTranslatedName(plan.country) })}
              </h2>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">{t('summary.data')}:</span>
                <span className="ml-2 font-medium">{plan.data}</span>
              </div>
              <div>
                <span className="text-gray-600">{t('summary.validity')}:</span>
                <span className="ml-2 font-medium">{translateValidity(plan.validity)}</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">{t('summary.total')}:</span>
                <span className="text-2xl font-bold text-blue-600">
                  {formatPrice(plan.price, plan.currency)}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('payment.methods.title')}</h3>
            <PaymentMethods />
          </div>

          {/* Security Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-sm text-blue-800">{t('security.ssl_encrypted')}</span>
            </div>
          </div>

          {/* Proceed Button (hidden; replaced by sticky footer) */}
          <button
            onClick={handleProceedToPayment}
            className="hidden"
          >
            {t('payment.continue')}
          </button>
        </div>
      </div>

      {/* Sticky checkout bar for better CRO */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="max-w-xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600">{t('summary.total')}:</span>
            <span className="font-bold text-gray-900">{formatPrice(plan.price, plan.currency)}</span>
          </div>
          <button
            onClick={handleProceedToPayment}
            className="group relative w-full bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 text-black py-4 px-6 pr-12 rounded-xl font-bold hover:from-yellow-300 hover:via-yellow-200 hover:to-yellow-300 transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-3 focus:ring-yellow-500 focus:ring-offset-2 text-center shadow-lg hover:shadow-xl border-2 border-yellow-500/30"
          >
            <span className="pointer-events-none text-lg font-extrabold">{t('payment.continue')}</span>
            <FiArrowRight className="absolute right-5 top-1/2 -translate-y-1/2 transform transition-all duration-200 group-hover:translate-x-1 group-hover:scale-110 text-black" size={22} />
          </button>

        </div>
      </div>
    </div>
  );
};

export default CheckoutPage; 