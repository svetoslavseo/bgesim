
import React, { useState } from 'react';
import { REGIONS, COUNTRIES, MAIN_NAV_COUNTRIES } from '../constants';
import { getFlagUrl } from '../utils/flagUtils';
import { useTranslation } from 'react-i18next';
// Remove the direct import to reduce bundle size
// import Flag from 'react-world-flags';

interface HeaderProps {
  navigateTo: (route: string) => void;
}

const Header: React.FC<HeaderProps> = ({ navigateTo }) => {
  const { t, i18n } = useTranslation(['navigation', 'countries']);
  const isEnglish = i18n.language === 'en';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedRegion, setExpandedRegion] = useState<string | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [hoveredTools, setHoveredTools] = useState(false);
  const [expandedTools, setExpandedTools] = useState(false);

  // Helper function to get translated region name with fallback
  const getRegionName = (regionId: string) => {
    try {
      const translatedName = t(`regions.${regionId}`, { ns: 'countries' });
      console.log(`Translation for ${regionId}:`, translatedName); // Debug log
      // If translation is not found, fall back to the original name
      return translatedName !== `regions.${regionId}` ? translatedName : REGIONS.find(r => r.id === regionId)?.name || regionId;
    } catch (error) {
      console.error('Translation error:', error);
      return REGIONS.find(r => r.id === regionId)?.name || regionId;
    }
  };

  // Helper function to get translated country name with fallback
  const getCountryName = (countryId: string, fallbackName: string) => {
    try {
      const translatedName = t(`countries.${countryId}`, { ns: 'countries' });
      // If translation is not found, fall back to the original name
      return translatedName !== `countries.${countryId}` ? translatedName : fallbackName;
    } catch (error) {
      console.error('Translation error:', error);
      return fallbackName;
    }
  };

  const toggleMobileMenu = () => {
    if (!isMobileMenuOpen) {
      // When opening, scroll to top of menu
      setTimeout(() => {
        const menuContainer = document.querySelector('.mobile-menu-container');
        if (menuContainer) {
          menuContainer.scrollTop = 0;
        }
      }, 100);
    }
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setExpandedRegion(null);
  };

  const toggleRegion = (regionId: string) => {
    setExpandedRegion(expandedRegion === regionId ? null : regionId);
  };

  const handleRegionMouseEnter = (regionId: string) => {
    setHoveredRegion(regionId);
  };

  const handleRegionMouseLeave = () => {
    setHoveredRegion(null);
  };

  const handleToolsMouseEnter = () => {
    setHoveredTools(true);
  };

  const handleToolsMouseLeave = () => {
    setHoveredTools(false);
  };

  const toggleTools = () => {
    setExpandedTools(!expandedTools);
  };

  return (
    <header className="bg-black sticky top-0 z-50 border-b border-gray-200/80">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a href={isEnglish ? "/en" : "/"} className="flex items-center space-x-2">
                <img 
              src="/esim-data/travelesim-logo.png" 
              alt="Travel eSIM Global Logo" 
              className="h-14 w-auto" 
              width="196" 
              height="56"
              loading="eager"
            />
            </a>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {REGIONS.map(region => (
              <div 
                key={region.id} 
                className="relative"
                onMouseEnter={() => handleRegionMouseEnter(region.id)}
                onMouseLeave={handleRegionMouseLeave}
              >
                <a 
                  href={`/${region.id}`} 
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo(`/${region.id}`);
                  }}
                  className="text-white hover:text-brand-accent transition-colors flex items-center space-x-1"
                >
                  <span>{getRegionName(region.id)}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
                {hoveredRegion === region.id && (
                  <div
                    className="absolute left-0 top-full bg-white shadow-lg rounded-lg ring-1 ring-gray-200 py-4 px-6 z-50 min-w-48"
                    onMouseEnter={() => handleRegionMouseEnter(region.id)}
                    onMouseLeave={handleRegionMouseLeave}
                  >
                    <div className="flex flex-col gap-2 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                      {/* Show main navigation countries first */}
                      {MAIN_NAV_COUNTRIES
                        .filter(c => c.regionId === region.id)
                        .sort((a,b) => a.name.localeCompare(b.name))
                        .map(country => (
                          <a 
                            key={country.id}
                            href={`/${country.regionId}/${country.slug}`}
                            onClick={(e) => {
                              e.preventDefault();
                              navigateTo(`/${country.regionId}/${country.slug}`);
                            }}
                            className="flex items-center space-x-2 text-gray-700 hover:text-brand-accent whitespace-nowrap font-medium"
                          >
                                                      <img 
                            src={getFlagUrl(country.id)} 
                            alt={`${getCountryName(country.id, country.name)} flag`} 
                            className="w-5 h-auto rounded-sm"
                            width="20"
                            height="15"
                            loading="lazy"
                          />
                            <span>{getCountryName(country.id, country.name)}</span>
                          </a>
                        ))}
                      
                      {/* Show remaining countries */}
                      {COUNTRIES
                        .filter(c => c.regionId === region.id && !MAIN_NAV_COUNTRIES.some(mc => mc.id === c.id))
                        .sort((a,b) => a.name.localeCompare(b.name))
                        .map(country => (
                          <a 
                            key={country.id}
                            href={`/${country.regionId}/${country.slug}`}
                            onClick={(e) => {
                              e.preventDefault();
                              navigateTo(`/${country.regionId}/${country.slug}`);
                            }}
                            className="flex items-center space-x-2 text-gray-700 hover:text-brand-accent whitespace-nowrap"
                          >
                            <img 
                              src={`/esim-data/flags/${country.id.toLowerCase()}.svg`} 
                              alt={`${getCountryName(country.id, country.name)} flag`} 
                              className="w-5 h-auto rounded-sm"
                              width="20"
                              height="15"
                              loading="lazy"
                            />
                            <span>{getCountryName(country.id, country.name)}</span>
                          </a>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            <a 
              href={isEnglish ? "/en/what-is-esim" : "/what-is-esim"}
              onClick={(e) => {
                e.preventDefault();
                navigateTo("/what-is-esim");
              }} 
              className="text-white hover:text-brand-accent transition-colors"
            >
              {t('what_is_esim')}
            </a>
            <div 
              className="relative"
              onMouseEnter={handleToolsMouseEnter}
              onMouseLeave={handleToolsMouseLeave}
            >
              <button className="text-white hover:text-brand-accent transition-colors flex items-center space-x-1">
                <span>{t('tools')}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {hoveredTools && (
                <div className="absolute left-0 top-full bg-white shadow-lg rounded-lg ring-1 ring-gray-200 py-2 z-50 min-w-48">
                  <a 
                    href={isEnglish ? "/en/esim-compatibility" : "/esim-compatibility"}
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo("/esim-compatibility");
                    }} 
                    className="block px-4 py-2 text-gray-700 hover:text-brand-accent hover:bg-gray-50"
                  >
                    {t('compatibility')}
                  </a>
                  <a 
                    href={isEnglish ? "/en/data-usage-calculator" : "/data-usage-calculator"}
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo("/data-usage-calculator");
                    }} 
                    className="block px-4 py-2 text-gray-700 hover:text-brand-accent hover:bg-gray-50"
                  >
                    {t('data_calculator')}
                  </a>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-white hover:text-brand-accent focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <a 
              href={isEnglish ? "/en/all-destinations" : "/all-destinations"}
              onClick={(e) => {
                e.preventDefault();
                navigateTo("/all-destinations");
              }} 
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-4 py-2 rounded-lg transition-colors text-sm"
            >
              {t('all_destinations')}
            </a>
          </div>
        </div>
      </nav>
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30 animate-in fade-in duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Mobile Menu */}
          <div className="md:hidden bg-black border-t border-gray-800 fixed inset-x-0 top-16 bottom-0 z-40 overflow-hidden animate-in slide-in-from-top-2 duration-300">
            <div className="h-full overflow-y-auto mobile-menu-container">
              <div className="container mx-auto px-4 py-4">
                {/* Close button for better UX */}
                <div className="flex justify-end mb-4">
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-white hover:text-brand-accent p-2 rounded-lg hover:bg-gray-800 transition-colors"
                    aria-label="Close menu"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Main Navigation Countries - Reduced list for better mobile experience */}
                <div className="py-2">
                  <h3 className="text-white font-medium mb-3 flex items-center space-x-2">
                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span>Popular Destinations</span>
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {MAIN_NAV_COUNTRIES.map(country => (
                      <a 
                        key={country.id}
                        href={`/${country.regionId}/${country.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          navigateTo(`/${country.regionId}/${country.slug}`);
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center space-x-2 text-gray-300 hover:text-brand-accent py-3 px-3 rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        <img 
                          src={`/esim-data/flags/${country.id.toLowerCase()}.svg`} 
                          alt={`${getCountryName(country.id, country.name)} flag`} 
                          className="w-5 h-auto rounded-sm"
                        />
                        <span>{getCountryName(country.id, country.name)}</span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Visual separator */}
                <div className="my-4 border-t border-gray-700"></div>

                {/* All Regions - Collapsible for additional countries */}
                <div className="py-2">
                  <p className="text-gray-400 text-sm mb-3">Tap to expand regions</p>
                  {REGIONS.map(region => (
                    <div key={region.id} className="py-2">
                      <button
                        onClick={() => toggleRegion(region.id)}
                        className="flex justify-between items-center w-full text-white hover:text-brand-accent py-3 px-3 rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        <span>{getRegionName(region.id)}</span>
                        <svg
                          className={`h-5 w-5 transform transition-transform ${expandedRegion === region.id ? 'rotate-180' : ''}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {expandedRegion === region.id && (
                        <div className="mt-2 pl-4 flex flex-col gap-2 max-h-32 overflow-y-auto">
                          {COUNTRIES
                            .filter(c => c.regionId === region.id)
                            .sort((a,b) => a.name.localeCompare(b.name))
                            .map(country => (
                              <a 
                                key={country.id}
                                href={`/${country.regionId}/${country.slug}`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  navigateTo(`/${country.regionId}/${country.slug}`);
                                  setIsMobileMenuOpen(false);
                                }}
                                className="flex items-center space-x-2 text-gray-300 hover:text-brand-accent py-2 px-3 rounded-lg hover:bg-gray-800 transition-colors"
                              >
                                <img 
                                  src={`/esim-data/flags/${country.id.toLowerCase()}.svg`} 
                                  alt={`${getCountryName(country.id, country.name)} flag`} 
                                  className="w-5 h-auto rounded-sm"
                                />
                                <span>{getCountryName(country.id, country.name)}</span>
                              </a>
                            ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <a 
                  href={isEnglish ? "/en/what-is-esim" : "/what-is-esim"}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo("/what-is-esim");
                    setIsMobileMenuOpen(false);
                  }} 
                  className="block py-3 px-3 text-white hover:text-brand-accent rounded-lg hover:bg-gray-800 transition-colors"
                >
                  {t('what_is_esim')}
                </a>
                <div className="py-2">
                  <button
                    onClick={toggleTools}
                    className="flex justify-between items-center w-full text-white hover:text-brand-accent py-3 px-3 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <span>{t('tools')}</span>
                    <svg
                      className={`h-5 w-5 transform transition-transform ${expandedTools ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {expandedTools && (
                    <div className="mt-2 pl-4 flex flex-col gap-2">
                      <a 
                        href={isEnglish ? "/en/esim-compatibility" : "/esim-compatibility"}
                        onClick={(e) => {
                          e.preventDefault();
                          navigateTo("/esim-compatibility");
                          setIsMobileMenuOpen(false);
                        }} 
                        className="block py-2 px-3 text-gray-300 hover:text-brand-accent rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        {t('compatibility')}
                      </a>
                      <a 
                        href={isEnglish ? "/en/data-usage-calculator" : "/data-usage-calculator"}
                        onClick={(e) => {
                          e.preventDefault();
                          navigateTo("/data-usage-calculator");
                          setIsMobileMenuOpen(false);
                        }} 
                        className="block py-2 px-3 text-gray-300 hover:text-brand-accent rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        {t('data_calculator')}
                      </a>
                    </div>
                  )}
                </div>
                <a 
                  href={isEnglish ? "/en/all-destinations" : "/all-destinations"}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo("/all-destinations");
                    setIsMobileMenuOpen(false);
                  }} 
                  className="block py-2.5 px-4 text-white hover:text-brand-accent bg-yellow-400 hover:bg-yellow-500 text-black font-medium rounded-lg transition-colors text-center text-sm"
                >
                  {t('all_destinations')}
                </a>
                
                {/* Scroll indicator */}
                <div className="mt-6 text-center">
                  <div className="inline-flex items-center space-x-1 text-gray-400 text-sm">
                    <span>Scroll for more</span>
                    <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
