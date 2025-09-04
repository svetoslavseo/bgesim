import React from 'react';
import { useTranslation } from 'react-i18next';
import { COUNTRIES } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

interface DestinationSelectorProps {
  navigateTo: (route: string) => void;
}

const DestinationSelector: React.FC<DestinationSelectorProps> = ({ navigateTo }) => {
  const { t } = useTranslation(['home', 'countries']);
  const { isChinese } = useLanguage();
  
  // Quick destination buttons - popular countries
  const quickDestinations = COUNTRIES.filter(c => ['FR', 'IT', 'ES', 'GB', 'US', 'JP', 'DE', 'AU'].includes(c.id.toUpperCase())).slice(0, 8);

  const coveredCountrySet = new Set();
  // Comment out the plansData usage to reduce bundle size
  // plansData.items.forEach(plan => {
  //   plan.covered_countries.forEach(code => coveredCountrySet.add(code));
  // });
  const numDestinations = coveredCountrySet.size;

  // Helper function to get translated country name with fallback
  const getCountryName = (countryId: string) => {
    try {
      const translatedName = t(`countries.${countryId}`, { ns: 'countries' });
      // If translation is not found, fall back to the original name
      return translatedName !== `countries.${countryId}` ? translatedName : countryId;
    } catch (error) {
      console.error('Translation error:', error);
      return countryId;
    }
  };

  // Helper function to get translated region name
  const getRegionName = (regionId: string) => {
    try {
      const translatedName = t(`regions.${regionId}`, { ns: 'countries' });
      return translatedName !== `regions.${regionId}` ? translatedName : regionId;
    } catch (error) {
      console.error('Translation error:', error);
      return regionId;
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
            {/* Left Side - Main Content */}
            <div className="lg:col-span-3 space-y-8">
              <div className="text-center lg:text-left">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                  {t('ready_for_another_destination')}
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  {t('explore_destinations_worldwide') || 'Explore 200+ destinations worldwide with instant eSIM activation'}
                </p>
              </div>
              
              {/* Popular Countries Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickDestinations.map((dest) => {
                  // Get the country code for the flag
                  const countryCode = dest.countryCode || dest.id.toUpperCase();
                  
                  return (
                    <a
                      key={dest.id}
                      href={`/${dest.regionId}/${dest.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        navigateTo(`/${dest.regionId}/${dest.slug}`);
                      }}
                      className="group bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg border border-gray-100 hover:border-blue-200 transition-all duration-300 text-center transform hover:-translate-y-1"
                    >
                      <div className="w-16 h-12 mx-auto mb-3 rounded-xl overflow-hidden shadow-md group-hover:scale-110 transition-transform duration-300">
                        <img 
                          src={`/esim-data/flags/${countryCode.toLowerCase()}.svg`} 
                          alt={`${getCountryName(dest.id)} flag`} 
                          className="w-full h-full object-cover"
                          loading="lazy"
                          onError={(e) => {
                            // Fallback to gradient background with initials if flag fails to load
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const fallback = target.nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                        {/* Fallback gradient background */}
                        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg" style={{display: 'none'}}>
                          {getCountryName(dest.id).substring(0, 2).toUpperCase()}
                        </div>
                      </div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {getCountryName(dest.id)}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {getRegionName(dest.regionId)}
                      </p>
                    </a>
                  );
                })}
              </div>
              
              {/* View All Destinations Link */}
              <div className="text-center lg:text-left">
                <a 
                  href={isChinese ? "/zh/all-destinations" : "/all-destinations"}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo("/all-destinations");
                  }}
                  className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-full hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <span>{t('explore_all_destinations') || 'Explore All Destinations'}</span>
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right Side - Enhanced Image Card */}
            <div className="lg:col-span-2 mt-8 lg:mt-0">
              <div className="relative">
                {/* Background decoration */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-30 animate-pulse" style={{animationDelay: '1s'}}></div>
                
                <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-500 border border-gray-100">
                  <div className="relative">
                    <img 
                      src="/where-now-nomad.png" 
                      alt="Digital nomad working remotely with mobile internet"
                      className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                      loading="lazy"
                      width="500"
                      height="400"
                    />
                    {/* Enhanced gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                    
                    {/* Floating connectivity indicator */}
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 shadow-lg">
                      <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                      <span>{t('connected') || 'Connected'}</span>
                    </div>
                    
                    {/* Enhanced text overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-2xl font-bold mb-3 drop-shadow-lg leading-tight">
                        {t('stay_connected_anywhere') || 'Stay Connected Anywhere'}
                      </h3>
                      <p className="text-sm opacity-90 drop-shadow leading-relaxed mb-4">
                        {t('mobile_internet_worldwide') || 'Mobile internet for your next adventure'}
                      </p>
                      
                      {/* Feature highlights */}
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                          {t('instant_activation') || 'Instant Activation'}
                        </span>
                        <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                          {t('global_coverage') || '200+ Countries'}
                        </span>
                        <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                          {t('no_roaming_fees') || 'No Roaming Fees'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default DestinationSelector; 