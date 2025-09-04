
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { MdCheckCircle, MdPhoneIphone, MdTravelExplore, MdAccessTime } from 'react-icons/md';
import { FaStar } from 'react-icons/fa';
import { COUNTRIES, REGIONS, TESTIMONIALS } from '../constants';
import { Country, Region, PlansData, Testimonial } from '../types';
import SearchWithDropdown from '../components/SearchWithDropdown';
import i18n from '../i18n';
import ESIMCompatibility from '../components/ESIMCompatibility';
import DeviceCompatibilityModal from '../components/DeviceCompatibilityModal';
import { dataService } from '../utils/dataService';
import { generateOrganizationSchema } from '../utils/schemaUtils';
import { getFlagUrl } from '../utils/flagUtils';


interface HomePageProps {
  navigateTo: (route: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ navigateTo }) => {
  const { t } = useTranslation(['home', 'countries']);
  const [selectedTab, setSelectedTab] = useState<'country' | 'region'>('country');
  const [showChecker, setShowChecker] = useState(false);
  const [plansData, setPlansData] = useState<PlansData | null>(null);

  // Load plans data
  useEffect(() => {
    const loadPlansData = async () => {
      try {
        console.log('HomePage: Loading plans data...');
        const data = await dataService.getPlansData(true);
        console.log('HomePage: Plans data loaded:', data?.items?.length || 0, 'plans');
        setPlansData(data);
      } catch (error) {
        console.error('HomePage: Failed to load plans data:', error);
        setPlansData({ items: [] });
      }
    };

    loadPlansData();
  }, []);

  return (
    <>
      <Helmet>
        <html lang={i18n.language === 'bg' ? 'bg' : 'en'} />
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />
        <meta name="keywords" content={t('meta.keywords')} />
        
        {/* Hreflang tags for language alternatives */}
        <link rel="canonical" href={`https://travelesim.bg${i18n.language === 'en' ? '/en' : ''}/`} />
        <link rel="alternate" hrefLang="bg" href="https://travelesim.bg/" />
        <link rel="alternate" hrefLang="en" href="https://travelesim.bg/en/" />
        <link rel="alternate" hrefLang="x-default" href="https://travelesim.bg/" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content={t('meta.og_title')} />
        <meta property="og:description" content={t('meta.og_description')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://travelesim.bg/" />
        <meta property="og:image" content="https://travelesim.bg/esim-data/travelesim-logo.png" />
        <meta property="og:locale" content={i18n.language === 'bg' ? 'bg_BG' : 'en_US'} />
        <meta property="og:locale:alternate" content={i18n.language === 'bg' ? 'en_US' : 'bg_BG'} />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('meta.twitter_title')} />
        <meta name="twitter:description" content={t('meta.twitter_description')} />
        <meta name="twitter:image" content="https://travelesim.bg/esim-data/travelesim-logo.png" />
        
        <script type="application/ld+json">
          {JSON.stringify(generateOrganizationSchema(t, i18n.language))}
        </script>
      </Helmet>
      
      <div className="bg-white">
        {/* Enhanced Hero Section */}
        <section className="relative bg-gradient-to-br from-black via-blue-900 to-yellow-600 py-16 md:py-24 overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 opacity-10">
                <div className="absolute top-20 right-20 w-32 h-32 bg-yellow-400 rounded-full animate-pulse"></div>
                <div className="absolute top-40 right-40 w-24 h-24 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="absolute top-60 right-60 w-16 h-16 bg-yellow-300 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
            </div>
            
            <div className="container mx-auto px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
                        {/* Left Side - Main Content */}
                        <div className="lg:col-span-3 text-center lg:text-left space-y-8">
                            <div>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
                                    {t('hero.title')}
                                </h1>
                                <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                                    {t('hero.subtitle')}
                                </p>
                            </div>
                            
                            {/* Enhanced Search Section */}
                            <div className="max-w-lg mx-auto lg:mx-0">
                                <SearchWithDropdown
                                    placeholder={t('hero.search_placeholder')}
                                    onSelect={navigateTo}
                                    className="w-full"
                                    showSearchIcon={true}
                                />
                            </div>
                            
                            {/* Trust Indicators */}
                            <div className="space-y-4">
                                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                                    <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                                        <span>{t('instant_activation') || 'Instant Activation'}</span>
                                    </div>
                                    <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium">
                                        {t('global_coverage') || '200+ Countries'}
                                    </div>
                                    <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium">
                                        {t('no_roaming_fees') || 'No Roaming Fees'}
                                    </div>
                                </div>
                                
                                {/* Rating Section */}
                                <div className="text-center lg:text-left">
                                    <p className="text-gray-300 text-sm mb-2">{t('saily_trusted')}</p>
                                    <div className="flex justify-center lg:justify-start items-center">
                                        <img 
                                            src="/saily-trustpilot-rating.png" 
                                            alt="Trustpilot Rating" 
                                            className="h-8 filter brightness-110"
                                            loading="eager"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Right Side - Enhanced Image */}
                        <div className="lg:col-span-2 mt-8 lg:mt-0">
                            <div className="relative">
                                {/* Background decoration */}
                                <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full opacity-20 animate-pulse"></div>
                                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-30 animate-pulse" style={{animationDelay: '1.5s'}}></div>
                                
                                <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-500 border border-gray-200">
                                    <div className="relative">
                                        <img 
                                            src="/where-now-nomad.png" 
                                            alt="Digital nomad working remotely with eSIM connectivity"
                                            className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                                            loading="eager"
                                            width="500"
                                            height="400"
                                        />
                                        {/* Enhanced gradient overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                        
                                        {/* Floating connectivity indicator */}
                                        <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-2 rounded-full text-sm font-semibold flex items-center space-x-2 shadow-lg">
                                            <div className="w-3 h-3 bg-white rounded-full animate-ping"></div>
                                            <span>{t('connected') || 'Connected'}</span>
                                        </div>
                                        
                                        {/* Enhanced text overlay */}
                                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                            <h3 className="text-xl md:text-2xl font-bold mb-3 drop-shadow-lg leading-tight">
                                                {t('work_from_anywhere') || 'Work From Anywhere'}
                                            </h3>
                                            <p className="text-sm opacity-90 drop-shadow leading-relaxed mb-4">
                                                {t('reliable_internet_worldwide') || 'Reliable internet connection in 200+ destinations'}
                                            </p>
                                            
                                            {/* CTA in image */}
                                            <div className="flex items-center space-x-2 text-yellow-300">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                </svg>
                                                <span className="text-sm font-medium">{t('get_started_now') || 'Get Started Now'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        {/* What is an eSIM? Section */}
        <section className="py-20">
            <div className="container mx-auto px-4 max-w-4xl text-center">
                <h2 className="text-3xl font-bold text-gray-900">{t('what_is_esim.title')}</h2>
                <p className="mt-4 text-lg text-gray-600">
                    {t('what_is_esim.description')}
                </p>
                <div className="mt-8 grid sm:grid-cols-3 gap-8">
                    <div className="p-6 bg-gray-50 rounded-xl">
                        <MdCheckCircle className="text-4xl text-green-500 mx-auto" />
                        <h3 className="mt-4 font-semibold text-lg">{t('what_is_esim.no_physical_sims.title')}</h3>
                        <p className="mt-1 text-gray-600">{t('what_is_esim.no_physical_sims.description')}</p>
                    </div>
                    <div className="p-6 bg-gray-50 rounded-xl">
                        <MdTravelExplore className="text-4xl text-blue-500 mx-auto" />
                        <h3 className="mt-4 font-semibold text-lg">{t('what_is_esim.keep_your_number.title')}</h3>
                        <p className="mt-1 text-gray-600">{t('what_is_esim.keep_your_number.description')}</p>
                    </div>
                    <div className="p-6 bg-gray-50 rounded-xl">
                         <MdPhoneIphone className="text-4xl text-purple-500 mx-auto" />
                        <h3 className="mt-4 font-semibold text-lg">{t('what_is_esim.instant_connectivity.title')}</h3>
                        <p className="mt-1 text-gray-600">{t('what_is_esim.instant_connectivity.description')}</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Destination Selection Section */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t('destination_selection.title')}</h2>
                <p className="mt-3 text-lg text-gray-600">{t('destination_selection.subtitle')}</p>
            </div>
            
            <div className="flex justify-center space-x-2 mb-8">
              <button
                onClick={() => setSelectedTab('country')}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedTab === 'country'
                    ? 'bg-gray-900 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {t('destination_selection.popular_countries')}
              </button>
              <button
                onClick={() => setSelectedTab('region')}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedTab === 'region'
                    ? 'bg-gray-900 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {t('destination_selection.regional_plans')}
              </button>
            </div>

            {selectedTab === 'country' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {COUNTRIES.slice(0, 24).map((country) => (
                                          <CountryCard key={country.id} country={country} navigateTo={navigateTo} plansData={plansData} />
                ))}
              </div>
            )}

            {selectedTab === 'region' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {REGIONS.map((region) => (
                  <RegionCard key={region.id} region={region} navigateTo={navigateTo} />
                ))}
              </div>
            )}
            <div className="text-center mt-12">
                                             <a href={i18n.language === 'en' ? "/en/regions" : "/regions"} className="bg-black hover:bg-gray-800 text-white font-bold px-8 py-3 rounded-lg transition-transform hover:scale-105 inline-block">
                    {t('destination_selection.view_all_destinations')}
                </a>
            </div>
          </div>
        </section>

        {/* How to get an eSIM for Andorra Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t('how_to_get_esim_section.title')}</h2>
              <p className="mt-3 text-lg text-gray-600">{t('how_to_get_esim_section.subtitle')}</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Step 1: Choose a data plan */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm mr-3">1</div>
                  <h3 className="text-xl font-bold text-gray-900">{t('how_to_get_esim_section.step1.title')}</h3>
                </div>
                <p className="text-gray-600 mb-6">{t('how_to_get_esim_section.step1.description')}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <input type="radio" name="data-plan" className="mr-3" />
                    <span className="text-gray-700">{t('how_to_get_esim_section.step1.option1')}</span>
                  </div>
                  <div className="flex items-center p-3 bg-blue-50 border-2 border-blue-200 rounded-lg">
                    <input type="radio" name="data-plan" checked className="mr-3" />
                    <span className="text-gray-700 font-medium">{t('how_to_get_esim_section.step1.option2')}</span>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <input type="radio" name="data-plan" className="mr-3" />
                    <span className="text-gray-700">{t('how_to_get_esim_section.step1.option3')}</span>
                  </div>
                </div>
              </div>

              {/* Step 2: Set up your eSIM */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm mr-3">2</div>
                  <h3 className="text-xl font-bold text-gray-900">{t('how_to_get_esim_section.step2.title')}</h3>
                </div>
                <p className="text-gray-600 mb-6">{t('how_to_get_esim_section.step2.description')}</p>
                
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-900 font-semibold">{t('how_to_get_esim_section.step2.installed')}</span>
                </div>
              </div>

              {/* Step 3: Enjoy your data */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm mr-3">3</div>
                  <h3 className="text-xl font-bold text-gray-900">{t('how_to_get_esim_section.step3.title')}</h3>
                </div>
                <p className="text-gray-600 mb-6">{t('how_to_get_esim_section.step3.description')}</p>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-red-500 rounded mr-2"></div>
                      <span className="text-gray-700">{t('how_to_get_esim_section.step3.country')}</span>
                    </div>
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">{t('how_to_get_esim_section.step3.active')}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{t('how_to_get_esim_section.step3.remaining_data')}</span>
                    <span className="font-bold text-gray-900">{t('how_to_get_esim_section.step3.data_usage')}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{t('how_to_get_esim_section.step3.expires_in')}</span>
                    <span className="font-bold text-gray-900">{t('how_to_get_esim_section.step3.time_remaining')}</span>
                  </div>
                  
                  <div className="space-y-2 mt-4">
                    <div className="h-1 bg-gray-200 rounded"></div>
                    <div className="h-1 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>



        {/* Why Choose Us Section */}
        <section className="bg-blue-50 py-20">
          <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900">{t('why_choose_us.title')}</h2>
                <p className="mt-3 text-lg text-gray-600">{t('why_choose_us.subtitle')}</p>
              </div>
              <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  <FeatureCard title={t('why_choose_us.avoid_roaming.title')} description={t('why_choose_us.avoid_roaming.description')} />
                  <FeatureCard title={t('why_choose_us.connect_instantly.title')} description={t('why_choose_us.connect_instantly.description')} />
                  <FeatureCard title={t('why_choose_us.safer_browsing.title')} description={t('why_choose_us.safer_browsing.description')} />
              </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">{t('testimonials_section.title')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {TESTIMONIALS.slice(0, 3).map((testimonial, index) => (
                        <TestimonialCard key={index} testimonial={testimonial} />
                    ))}
                </div>
            </div>
        </section>

        {/* eSIM Compatibility Check */}
        <ESIMCompatibility onCheckCompatibility={() => setShowChecker(true)} />
        <DeviceCompatibilityModal isOpen={showChecker} onClose={() => setShowChecker(false)} />
        
        {/* Related Articles Section */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t('related_articles.title')}</h2>
              <p className="mt-3 text-lg text-gray-600">{t('related_articles.subtitle')}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {getLatestArticles().map((article, index) => (
                <ArticleCard key={index} article={article} navigateTo={navigateTo} />
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

const FeatureCard: React.FC<{title: string, description: string}> = ({ title, description}) => (
    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
        <MdCheckCircle className="text-3xl text-green-500 mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);


const RegionCard: React.FC<{region: Region, navigateTo: (route: string) => void}> = ({ region, navigateTo }) => {
  const { t, i18n } = useTranslation(['home', 'countries']);
  
  // Helper function to get translated region name with fallback
  const getRegionName = (regionId: string) => {
    try {
      // Try to get translation from countries namespace first (where regions are stored)
      const translatedName = t(`regions.${regionId}`, { ns: 'countries' });
      console.log(`Translation for ${regionId}:`, translatedName); // Debug log
      
      // If translation is not found (returns the key), fall back to the original name
      if (translatedName && translatedName !== `regions.${regionId}`) {
        return translatedName;
      }
      
      // Also try the regions namespace as fallback
      const regionTranslation = t(regionId, { ns: 'regions' });
      if (regionTranslation && regionTranslation !== regionId) {
        return regionTranslation;
      }
      
      // Final fallback to the constant
      return REGIONS.find(r => r.id === regionId)?.name || regionId;
    } catch (error) {
      console.error('Translation error:', error);
      return REGIONS.find(r => r.id === regionId)?.name || regionId;
    }
  };
  
  // Generate the correct URL based on current language
  const getRegionUrl = (regionId: string) => {
    const isBulgarian = i18n.language === 'bg';
    return isBulgarian ? `/${regionId}` : `/en/${regionId}`;
  };
  
  return (
    <a 
        href={getRegionUrl(region.id)}
        className="relative rounded-2xl overflow-hidden shadow-lg cursor-pointer group h-64 bg-gray-300 block"
    >
        <img src={region.imageUrl} alt={getRegionName(region.id)} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-5">
            <h3 className="text-white text-2xl font-bold">{getRegionName(region.id)}</h3>
            <p className="text-white/90 mt-1">{region.description}</p>
        </div>
    </a>
  );
};

const TestimonialCard: React.FC<{testimonial: Testimonial}> = ({ testimonial }) => (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex flex-col h-full">
        <div className="flex items-center mb-4">
            {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'} />
            ))}
        </div>
        <p className="text-gray-700 italic mb-4 flex-grow">"{testimonial.quote}"</p>
        <div className="flex items-center mt-auto">
            <img src={testimonial.avatarUrl} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4 object-cover" />
            <div>
                <p className="font-bold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.location}</p>
            </div>
        </div>
    </div>
);

// Utility function to get the lowest price for a country
const getLowestPriceForCountry = (countryCode: string, plansData: PlansData | null): { price: number; currency: string } | null => {
  if (!plansData) {
    return null;
  }

  const countryPlans = plansData.items.filter(item => 
    item.covered_countries.includes(countryCode)
  );
  
  if (countryPlans.length === 0) {
    return null;
  }

  const lowestPrice = countryPlans.reduce((min, current) => {
    if (current.price.amount_with_tax < min.price.amount_with_tax) {
      return current;
    }
    return min;
  }, countryPlans[0]);

  return { 
    price: lowestPrice.price.amount_with_tax / 100, 
    currency: lowestPrice.price.currency 
  };
};

const CountryCard: React.FC<{country: Country, navigateTo: (route: string) => void, plansData: PlansData | null}> = ({ country, plansData }) => {
  const { t } = useTranslation(['home', 'countries']);
  const countryCode = country.countryCode || country.id.toUpperCase();
  const lowestPrice = getLowestPriceForCountry(countryCode, plansData);
  
  // Helper function to get translated country name with fallback
  const getCountryName = (countryId: string) => {
    try {
      const translatedName = t(`countries.${countryId}`, { ns: 'countries' });
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
        <img src={getFlagUrl(countryCode)} alt={`${getCountryName(country.id)} flag`} className="w-10 h-auto rounded-md" />
        <div className="ml-4">
            <h3 className="font-semibold text-gray-900">{getCountryName(country.id)}</h3>
            <p className="text-sm text-gray-500">
              {t('data_plans_from', { ns: 'countries', price: lowestPrice ? `$${lowestPrice.price.toFixed(2)}` : 'N/A' })}
            </p>
        </div>
        <svg className="w-5 h-5 text-gray-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
    </a>
  );
};

// Helper function to get the latest 3 articles
const getLatestArticles = () => {
  const { i18n } = useTranslation();
  const isBulgarian = i18n.language === 'bg';
  
  return [
    {
      id: 'whatsapp-in-china',
      title: isBulgarian ? 'Може ли да използвате WhatsApp в Китай през 2025 г.? Пълно ръководство' : 'Can You Use WhatsApp in China in 2025? The Complete Guide',
      description: isBulgarian ? 'Пълно ръководство за използването на WhatsApp в Китай през 2025 г. Научете защо е блокиран, как да получите достъп с eSIM, VPN или роуминг и открийте алтернативи като WeChat.' : 'Complete guide to using WhatsApp in China in 2025. Learn why it\'s blocked, how to access it with eSIM, VPN, or roaming, and discover alternatives like WeChat.',
      image: '/whatsapp-in-china.png',
      readingTime: isBulgarian ? '8 минути' : '8 min read',
      date: '2025-01-20',
      category: isBulgarian ? 'Пътни ръководства' : 'Travel Guide',
      slug: 'whatsapp-in-china'
    },
    {
      id: 'esim-adoption-trends',
      title: isBulgarian ? 'Глобални тенденции при приемането на eSIM 2024: Пазарен размер, двигатели на растежа и бъдещето с iSIM' : '2024 Global eSIM Adoption Trends: Market Size, Growth Drivers & iSIM Future',
      description: isBulgarian ? '2024 г. е определяща за мобилната свързаност. Технологията eSIM премина от ниша за ранни приематели към основна глобална сила.' : '2024 is a defining year for mobile connectivity. eSIM technology has evolved from a niche market for early adopters to a mainstream global force.',
      image: '/blog/esim-adoption.png',
      readingTime: isBulgarian ? '10 минути' : '10 min read',
      date: '2024-01-15',
      category: isBulgarian ? 'eSIM технология' : 'eSIM Technology',
      slug: 'esim-adoption-trends'
    },
  ];
};

// Article Card Component
const ArticleCard: React.FC<{article: any, navigateTo: (route: string) => void}> = ({ article, navigateTo }) => {
  const { t } = useTranslation(['home']);
  
  return (
    <article className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative overflow-hidden">
        <img 
          src={article.image} 
          alt={article.title} 
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
            {article.category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <MdAccessTime className="w-4 h-4 mr-1" />
          <span>{article.readingTime}</span>
          <span className="mx-2">•</span>
          <span>{new Date(article.date).toLocaleDateString()}</span>
        </div>
        
        <a 
          href={`/articles/${article.slug}`}
          className="block mb-3 group-hover:text-blue-600 transition-colors duration-200"
        >
          <h3 className="text-xl font-bold text-gray-900 overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
            {article.title}
          </h3>
        </a>
        
        <p className="text-gray-600 text-sm mb-4 overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
          {article.description}
        </p>
        
        <a 
          href={`/articles/${article.slug}`}
          className="inline-flex items-center bg-black text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-800 transition-colors duration-200"
        >
          <span>{t('related_articles.read_more')}</span>
          <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </article>
  );
};

export default HomePage;
