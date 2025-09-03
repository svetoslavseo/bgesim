import React, { useState, useEffect } from 'react';
import { Country, Region } from '../types';
import { COUNTRIES, REGIONS } from '../constants';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import i18n from '../i18n';
import { dataService } from '../utils/dataService';
// Remove react-world-flags import to fix loading issue
// import WorldFlag from 'react-world-flags';

// Remove static import to reduce bundle size
// import plansData from '../plans.json';

interface AllDestinationsProps {
  navigateTo: (route: string) => void;
}

// Utility function to get the lowest price for a country
const getLowestPriceForCountry = (countryCode: string, plansData: any): { price: number; currency: string } | null => {
  if (!plansData || !plansData.items) {
    console.log(`getLowestPriceForCountry: No plans data for ${countryCode}`);
    return null;
  }
  
  console.log(`getLowestPriceForCountry: Looking for ${countryCode}, total plans: ${plansData.items.length}`);
  
  // Find plans that cover this country
  const countryPlans = plansData.items.filter((plan: any) => {
    const coveredCountries = plan.covered_countries || [];
    return coveredCountries.includes(countryCode);
  });
  
  console.log(`getLowestPriceForCountry: Found ${countryPlans.length} plans for ${countryCode}`);
  
  if (countryPlans.length === 0) {
    return null;
  }
  
  // Find the plan with the lowest price
  const lowestPricePlan = countryPlans.reduce((min: any, plan: any) => 
    plan.price.amount_with_tax < min.price.amount_with_tax ? plan : min
  );
  
  const result = {
    price: lowestPricePlan.price.amount_with_tax / 100, // Convert cents to dollars
    currency: lowestPricePlan.price.currency
  };
  
  console.log(`getLowestPriceForCountry: Lowest price for ${countryCode}: $${result.price} ${result.currency}`);
  
  return result;
};

const CountryCard: React.FC<{country: Country, navigateTo: (route: string) => void, plansData: any}> = ({ country, navigateTo, plansData }) => {
  const { t } = useTranslation('countries');
  const countryCode = country.countryCode || country.id.toUpperCase();
  const lowestPrice = getLowestPriceForCountry(countryCode, plansData);
  
  console.log(`CountryCard: ${country.name} (${countryCode}) - plansData:`, !!plansData, 'lowestPrice:', lowestPrice);
  
  // Helper function to get translated country name with fallback
  const getCountryName = (countryId: string) => {
    try {
      const translatedName = t(`countries.${countryId}`);
      // If translation is not found, fall back to the original name
      return translatedName !== `countries.${countryId}` ? translatedName : country.name;
    } catch (error) {
      console.error('Translation error:', error);
      return country.name;
    }
  };
  
  return (
    <a 
        href={`/${country.regionId}/${country.slug}`}
        className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 cursor-pointer hover:shadow-lg hover:border-blue-500 transition-all duration-300 flex items-center block"
    >
        <img src={`https://flagcdn.com/w80/${countryCode.toLowerCase()}.png`} alt={`${getCountryName(country.id)} flag`} className="w-10 h-auto rounded-md" />
        <div className="ml-4">
            <h3 className="font-semibold text-gray-900">{getCountryName(country.id)}</h3>
            <p className="text-sm text-gray-500">
              {t('data_plans_from', { ns: 'countries', price: lowestPrice ? `$${lowestPrice.price.toFixed(2)}` : t('not_available', { ns: 'countries' }) })}
            </p>
        </div>
        <svg className="w-5 h-5 text-gray-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
    </a>
  );
};

const AllDestinations: React.FC<AllDestinationsProps> = ({ navigateTo }) => {
  const { t } = useTranslation('countries');
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [plansData, setPlansData] = useState<any>(null);

  // Helper function to get translated region name with fallback
  const getRegionName = (regionId: string) => {
    const translatedName = t(`regions.${regionId}`);
    // If translation is not found, fall back to the original name
    return translatedName !== `regions.${regionId}` ? translatedName : REGIONS.find(r => r.id === regionId)?.name || regionId;
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        // Use the COUNTRIES constant instead of fetching from a non-existent endpoint
        setCountries(COUNTRIES);
      } catch (err) {
        setError(t('failed_to_load'));
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  // Load plans data
  useEffect(() => {
    const loadPlansData = async () => {
      try {
        console.log('AllDestinations: Loading plans data...');
        const data = await dataService.getPlansData({ full: true });
        console.log('AllDestinations: Plans data loaded:', data?.items?.length || 0, 'plans');
        setPlansData(data);
      } catch (error) {
        console.error('AllDestinations: Failed to load plans data:', error);
        setPlansData({ items: [] });
      }
    };

    loadPlansData();
  }, []);

  // Helper function to get translated country name with fallback
  const getCountryName = (countryId: string, fallbackName: string) => {
    try {
      const translatedName = t(`countries.${countryId}`);
      // If translation is not found, fall back to the original name
      return translatedName !== `countries.${countryId}` ? translatedName : fallbackName;
    } catch (error) {
      console.error('Translation error:', error);
      return fallbackName;
    }
  };

  // Filter countries based on search query and selected region
  const filteredCountries = countries.filter(country => {
    // Filter by region
    if (selectedRegion !== 'all' && country.regionId !== selectedRegion) {
      return false;
    }
    
    // Filter by search query - check both translated and original names
    if (searchQuery.trim()) {
      const translatedName = getCountryName(country.id, country.name);
      const originalName = country.name;
      const query = searchQuery.toLowerCase();
      
      if (!translatedName.toLowerCase().includes(query) && !originalName.toLowerCase().includes(query)) {
        return false;
      }
    }
    
    return true;
  });

  return (
    <>
      <Helmet>
        <html lang={i18n.language === 'bg' ? 'bg' : 'en'} />
        <title>{t('meta.all_destinations_title', { ns: 'countries' })}</title>
        <meta name="description" content={t('meta.all_destinations_description', { ns: 'countries' })} />
        <meta name="keywords" content={t('meta.all_destinations_keywords', { ns: 'countries' })} />
        <meta property="og:title" content={t('meta.all_destinations_og_title', { ns: 'countries' })} />
        <meta property="og:description" content={t('meta.all_destinations_og_description', { ns: 'countries' })} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://travelesim.bg/all-destinations" />
        <meta property="og:image" content="https://travelesim.bg/esim-data/travelesim-logo.png" />
        <meta property="og:locale" content={i18n.language === 'bg' ? 'bg_BG' : 'en_US'} />
        <meta property="og:locale:alternate" content={i18n.language === 'bg' ? 'en_US' : 'bg_BG'} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('meta.all_destinations_twitter_title', { ns: 'countries' })} />
        <meta name="twitter:description" content={t('meta.all_destinations_twitter_description', { ns: 'countries' })} />
        <link rel="canonical" href={`https://travelesim.bg${i18n.language === 'en' ? '/en' : ''}/all-destinations`} />
        <link rel="alternate" hrefLang="bg" href="https://travelesim.bg/all-destinations" />
        <link rel="alternate" hrefLang="en" href="https://travelesim.bg/en/all-destinations" />
        <link rel="alternate" hrefLang="x-default" href="https://travelesim.bg/all-destinations" />
      </Helmet>

      <div className="bg-white">
        {/* Hero Section */}
        <section className="bg-black py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6">
              {t('all_destinations')}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t('all_destinations_subtitle')}
            </p>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Search Bar */}
              <div className="mb-6">
                <input
                  type="text"
                  placeholder={t('search_country_placeholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

                             {/* Region Filter */}
               <div className="flex flex-wrap gap-2 mb-6">
                 <button
                   onClick={() => setSelectedRegion('all')}
                   className={`px-6 py-2 rounded-full font-medium transition-colors ${
                     selectedRegion === 'all'
                       ? 'bg-black text-white shadow-md'
                       : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                   }`}
                 >
                   {t('all_regions')}
                 </button>
                 {REGIONS.map((region) => (
                   <button
                     key={region.id}
                     onClick={() => setSelectedRegion(region.id)}
                     className={`px-6 py-2 rounded-full font-medium transition-colors ${
                       selectedRegion === region.id
                         ? 'bg-black text-white shadow-md'
                         : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                     }`}
                   >
                     {getRegionName(region.id)}
                   </button>
                 ))}
               </div>

              {/* Results Count */}
              <div className="text-center mb-8">
                <p className="text-gray-600">
                  {t('showing_results', { showing: filteredCountries.length, total: countries.length })}
                </p>
              </div>

              {/* Countries Grid */}
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                  <p className="mt-4 text-gray-600">{t('loading_countries')}</p>
                </div>
              ) : !plansData ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                  <p className="mt-4 text-gray-600">{t('loading_data')}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredCountries.map((country, index) => (
                    <CountryCard key={`${country.id}-${index}`} country={country} navigateTo={navigateTo} plansData={plansData} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-50 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('ready_to_stay_connected')}
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              {t('choose_destination_description')}
            </p>
            <button
              onClick={() => navigateTo('/')}
              className="bg-black text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-800 transition-colors"
            >
              {t('browse_popular_destinations')}
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default AllDestinations; 