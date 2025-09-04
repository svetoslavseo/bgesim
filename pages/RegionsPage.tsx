import React, { useState, useEffect } from 'react';
import { REGIONS, COUNTRIES } from '../constants';
import { Region } from '../types';
import Breadcrumbs from '../components/Breadcrumbs';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import i18n from '../i18n';
// Remove react-world-flags import to fix loading issue
// import WorldFlag from 'react-world-flags';
import { FaGlobe, FaUsers, FaMapMarkedAlt, FaStar, FaCheck } from 'react-icons/fa';
import { sailyPlansService } from '../utils/sailyPlansService';

interface RegionWithStats extends Region {
  countryCount: number;
  averagePrice: number;
  coverage: string;
}

interface RegionCardProps {
  region: RegionWithStats;
  navigateTo: (route: string) => void;
}

const RegionCard: React.FC<RegionCardProps> = ({ region, navigateTo }) => {
  const { t: tCountries } = useTranslation('countries');
  const { t: tRegions } = useTranslation('regions');
  
  // Helper function to get translated region name with fallback
  const getRegionName = (regionId: string) => {
    try {
      const translatedName = tCountries(`regions.${regionId}`);
      // If translation is not found, fall back to the original name
      return translatedName !== `regions.${regionId}` ? translatedName : REGIONS.find(r => r.id === regionId)?.name || regionId;
    } catch (error) {
      console.error('Translation error:', error);
      return REGIONS.find(r => r.id === regionId)?.name || regionId;
    }
  };
  
  return (
    <a 
      href={`/${region.id}`}
      className="group bg-white rounded-2xl shadow-lg border border-gray-100 cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 block"
    >
      {/* Region Image */}
      <div className="relative h-48 rounded-t-2xl overflow-hidden">
        <img 
          src={region.imageUrl} 
          alt={getRegionName(region.id)} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {/* Region Badge */}
        <div className="absolute top-4 left-4">
          <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-800">
            {region.countryCount} {tRegions('stats.countries')}
          </div>
        </div>
      </div>

      {/* Region Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {getRegionName(region.id)}
        </h3>
        <p className="text-gray-600 mb-4 leading-relaxed">
          {region.description}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-bold text-blue-600">{region.countryCount}</div>
            <div className="text-xs text-gray-600">{tRegions('stats.countries')}</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-bold text-green-600">${region.averagePrice}</div>
            <div className="text-xs text-gray-600">{tRegions('plan_card.starting_price')}</div>
          </div>
        </div>

        {/* Coverage Badge */}
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <FaStar className="w-3 h-3 mr-1" />
            {region.coverage} {tRegions('coverage.label')}
          </span>
          <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </a>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
    <div className="text-4xl text-blue-600 mb-4 flex justify-center">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

interface StepCardProps {
  number: string;
  title: string;
  description: string;
}

const StepCard: React.FC<StepCardProps> = ({ number, title, description }) => (
  <div className="text-center p-6">
    <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">{number}</div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

interface GlobalPlanCardProps {
  plan: any;
  popular?: boolean;
  navigateTo: (route: string) => void;
}

const GlobalPlanCard: React.FC<GlobalPlanCardProps> = ({ 
  plan,
  popular = false, 
  navigateTo 
}) => {
  const { t } = useTranslation('regions');
  
  // Extract plan details from API data
  const name = plan.name || t('plan_card.global_plan');
  const dataAmount = plan.data_limit?.amount || 0;
  const dataUnit = plan.data_limit?.unit || 'GB';
  const data = `${dataAmount} ${dataUnit}`;
  const durationAmount = plan.duration?.amount || 0;
  const durationUnit = plan.duration?.unit || 'day';
  const duration = `${durationAmount} ${durationUnit}${durationAmount !== 1 ? 's' : ''}`;
  const priceInCents = plan.price?.amount_with_tax || 0;
  const price = (priceInCents / 100).toFixed(2);
  const originalPrice = (priceInCents * 1.4 / 100).toFixed(2); // Show 40% savings
  
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative">
      {popular && (
        <div className="absolute -top-2 -right-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full text-yellow-900">
          <FaStar className="inline w-3 h-3 mr-1" />
          {t('plan_card.popular')}
        </div>
      )}
      
      <div className="text-center mb-4">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <FaGlobe className="text-blue-600 text-2xl" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">{name}</h3>
        <p className="text-sm text-gray-600">{duration}</p>
      </div>
      
      <div className="text-center mb-6">
        <div className="text-3xl font-bold text-blue-600 mb-1">${price}</div>
        <div className="text-sm text-gray-500 line-through">${originalPrice}</div>
        <div className="text-xs text-gray-400">{data} {t('plan_card.data')}</div>
      </div>
      
      <div className="space-y-2 mb-6">
        <div className="flex items-center text-sm text-gray-600">
          <FaCheck className="text-green-500 w-4 h-4 mr-2" />
          {t('plan_card.global_coverage')}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <FaCheck className="text-green-500 w-4 h-4 mr-2" />
          {t('plan_card.instant_activation')}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <FaCheck className="text-green-500 w-4 h-4 mr-2" />
          {t('plan_card.no_roaming_fees')}
        </div>
      </div>
      
      <button 
        onClick={() => {
          // Create plan data for checkout
          const planData = {
            country: t('plan_card.global_country'),
            flag: `/esim-data/flags/globe.svg`,
            data: data,
            validity: duration,
            price: parseFloat(price),
            currency: 'USD',
            identifier: plan.identifier, // Use the plan UUID from saily_plans.json
            priceIdentifier: plan.price?.identifier
          };
          const encodedPlan = encodeURIComponent(JSON.stringify(planData));
          window.location.href = `/checkout?plan=${encodedPlan}`;
        }}
        className="w-full bg-black text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200"
      >
        {t('plan_card.select_plan')}
      </button>
    </div>
  );
};

interface RegionsPageProps {
  navigateTo?: (route: string) => void;
}

const RegionsPage: React.FC<RegionsPageProps> = ({ navigateTo = () => {} }) => {
  const { t } = useTranslation('regions');
  const [plansData, setPlansData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Load enhanced plans data from Saily service
  useEffect(() => {
    const loadPlansData = async () => {
      try {
        console.log('RegionsPage: Loading enhanced plans data...');
        const data = await sailyPlansService.getNormalizedPlansData();
        console.log('RegionsPage: Enhanced plans data loaded:', data?.items?.length || 0, 'plans');
        
        const sailyPlans = data?.items?.filter(p => p.source === 'saily') || [];
        const localPlans = data?.items?.filter(p => p.source === 'local') || [];
        console.log('RegionsPage: Breakdown -', sailyPlans.length, 'Saily plans,', localPlans.length, 'local plans');
        
        setPlansData(data);
      } catch (error) {
        console.error('RegionsPage: Failed to load enhanced plans data:', error);
        setPlansData({ items: [] });
      } finally {
        setLoading(false);
      }
    };

    loadPlansData();
  }, []);

  // Extract real global plans from API data
  const getGlobalPlans = () => {
    if (!plansData?.items) return [];
    
    // Find plans with 'GLB' region (Global) or plans covering many countries (50+)
    const globalPlans = plansData.items.filter((plan: any) => {
      return plan.region === 'GLB' || 
             (plan.covered_countries && plan.covered_countries.length >= 50);
    });

    // Sort by duration and then by data amount
    return globalPlans.sort((a: any, b: any) => {
      const aDuration = a.validity_days || 0;
      const bDuration = b.validity_days || 0;
      if (aDuration !== bDuration) return aDuration - bDuration;
      
      const aData = a.data_amount || 0;
      const bData = b.data_amount || 0;
      return aData - bData;
    }).slice(0, 5); // Show top 5 global plans
  };

  const { t: tCountries } = useTranslation('countries');
  const { t: tCommon } = useTranslation('common');
  
  // Helper function to get translated region name with fallback
  const getRegionName = (regionId: string) => {
    try {
      const translatedName = tCountries(`regions.${regionId}`);
      // If translation is not found, fall back to the original name
      return translatedName !== `regions.${regionId}` ? translatedName : REGIONS.find(r => r.id === regionId)?.name || regionId;
    } catch (error) {
      console.error('Translation error:', error);
      return REGIONS.find(r => r.id === regionId)?.name || regionId;
    }
  };
  
  // Calculate statistics for each region
  const regionStats = REGIONS.map(region => {
    const countriesInRegion = COUNTRIES.filter(c => c.regionId === region.id);
    
    // Calculate average price from real plans data
    let averagePrice = 3.99; // fallback
    if (plansData?.items) {
      const regionPlans = plansData.items.filter((plan: any) => {
        return plan.region === region.id.toUpperCase() || 
               (plan.covered_countries && 
                plan.covered_countries.some((code: string) => 
                  countriesInRegion.some((country: any) => country.countryCode === code)
                ));
      });
      
      if (regionPlans.length > 0) {
        const totalPrice = regionPlans.reduce((sum: number, plan: any) => 
          sum + (plan.price?.amount_with_tax || 0), 0);
        averagePrice = (totalPrice / regionPlans.length) / 100; // Convert cents to dollars
      }
    }
    
    return {
      ...region,
      countryCount: countriesInRegion.length,
      averagePrice: Math.round(averagePrice * 100) / 100, // Round to 2 decimal places
      coverage: t('coverage.high') // This could be calculated based on plan availability
    };
  });

  // Overall statistics
  const totalCountries = COUNTRIES.length;
  const totalRegions = REGIONS.length;
  const averageCountriesPerRegion = Math.round(totalCountries / totalRegions);

  const breadcrumbItems: Array<{ label: string; url?: string }> = [
  ];

  return (
    <div key="regions-page">
      <Helmet>
        <html lang={i18n.language === 'bg' ? 'bg' : 'en'} />
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />
        <meta name="keywords" content={t('meta.keywords')} />
        <meta property="og:title" content={t('meta.og_title')} />
        <meta property="og:description" content={t('meta.og_description')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://travelesim.bg/bg/regions" />
        <meta property="og:image" content="https://travelesim.bg/esim-data/travelesim-logo.png" />
        <meta property="og:locale" content="bg_BG" />
        <meta property="og:locale:alternate" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('meta.twitter_title')} />
        <meta name="twitter:description" content={t('meta.twitter_description')} />
        <link rel="canonical" href={`https://travelesim.bg${i18n.language === 'en' ? '/en' : ''}/regions`} />
        <link rel="alternate" hrefLang="bg" href="https://travelesim.bg/regions" />
        <link rel="alternate" hrefLang="en" href="https://travelesim.bg/en/regions" />
        <link rel="alternate" hrefLang="x-default" href="https://travelesim.bg/regions" />
      </Helmet>
      <div className="bg-white">
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbItems} navigateTo={navigateTo} />

        {/* Hero Section */}
        <div className="bg-black text-white py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {t('hero.title')}
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
                {t('hero.description', { regions: totalRegions, countries: totalCountries })}
              </p>
              
              {/* Global Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold mb-2">{totalRegions}</div>
                  <div className="text-gray-400">{t('stats.regions')}</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold mb-2">{totalCountries}</div>
                  <div className="text-gray-400">{t('stats.countries')}</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold mb-2">{averageCountriesPerRegion}</div>
                  <div className="text-gray-400">{t('stats.avg_countries_per_region')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Plans Section */}
        <div className="bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {t('global_plans.title')}
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  {t('global_plans.description')}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {loading ? (
                  <div className="col-span-full text-center py-8">
                    <div className="text-lg text-gray-600">{t('loading.global_plans')}</div>
                  </div>
                ) : (
                  getGlobalPlans().map((plan: any, index: number) => (
                    <GlobalPlanCard 
                      key={plan.identifier || index}
                      plan={plan}
                      popular={index === 1} // Mark the second plan as popular
                      navigateTo={navigateTo}
                    />
                  ))
                )}
                {!loading && getGlobalPlans().length === 0 && (
                  <div className="col-span-full text-center py-8">
                    <div className="text-lg text-gray-600">{t('errors.no_global_plans')}</div>
                  </div>
                )}
              </div>

              <div className="text-center mt-12">
                <button 
                  onClick={() => navigateTo('/all-destinations')}
                  className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
                >
                  {t('global_plans.view_all')}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Regions Grid */}
        <div className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {t('explore.title')}
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  {t('explore.description')}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regionStats.map((region) => (
                  <RegionCard key={region.id} region={region as any} navigateTo={navigateTo} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {t('features.title')}
                </h2>
                <p className="text-xl text-gray-600">
                  {t('features.description')}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <FeatureCard 
                  icon={<FaGlobe />}
                  title={t('features.global_coverage.title')}
                  description={t('features.global_coverage.description')}
                />
                <FeatureCard 
                  icon={<FaUsers />}
                  title={t('features.trusted.title')}
                  description={t('features.trusted.description')}
                />
                <FeatureCard 
                  icon={<FaMapMarkedAlt />}
                  title={t('features.expertise.title')}
                  description={t('features.expertise.description')}
                />
                <FeatureCard 
                  icon={<FaStar />}
                  title={t('features.value.title')}
                  description={t('features.value.description')}
                />
              </div>
            </div>
          </div>
        </div>

        {/* How to Choose Section */}
        <div className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {t('how_to_choose.title')}
                </h2>
                <p className="text-xl text-gray-600">
                  {t('how_to_choose.description')}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <StepCard 
                  number="1"
                  title={t('steps.select_region.title')}
                  description={t('steps.select_region.description')}
                />
                <StepCard 
                  number="2"
                  title={t('steps.browse_countries.title')}
                  description={t('steps.browse_countries.description')}
                />
                <StepCard 
                  number="3"
                  title={t('steps.choose_plan.title')}
                  description={t('steps.choose_plan.description')}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegionsPage; 