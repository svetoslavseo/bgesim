
import React, { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { Country } from '../types';
import { REGIONS, COUNTRIES, BASE_URL } from '../constants';
import { 
  generateOrganizationSchema, 
  generateWebSiteSchema, 
  generateWebPageSchema, 
  generateBreadcrumbSchema, 
  generatePlaceSchema, 
  generateProductSchema, 
  generateAggregateOfferSchema,
  BASE_URL as SCHEMA_BASE_URL
} from '../utils/schemaUtils';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import i18n from '../i18n';
import { dataService } from '../utils/dataService';
import { sailyPlansService } from '../utils/sailyPlansService';
import Breadcrumbs from '../components/Breadcrumbs';
import NotFoundPage from './NotFoundPage';
import HowToGetESIM from '../components/HowToGetESIM';
import PlanSelector from '../components/PlanSelector';
import RegionPlansGrid from '../components/RegionPlansGrid';
import DeviceCompatibilityModal from '../components/DeviceCompatibilityModal';
import StableSkeleton from '../components/StableSkeleton';

// Lazy load heavy components that are below the fold
const DestinationSelector = lazy(() => import('../components/DestinationSelector'));
const ESIMCompatibility = lazy(() => import('../components/ESIMCompatibility'));
const SailyPlansSection = lazy(() => import('../components/SailyPlansSection'));

interface RegionPageProps {
  regionId: string;
  navigateTo?: (route: string) => void;
}

// Component loader for lazy-loaded components
const ComponentLoader: React.FC = () => (
    <div className="animate-pulse p-4">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
);

// Utility function to format currency display
const formatCurrency = (currency: string) => {
  if (currency === 'USD') return '$';
  return currency;
};

const RegionPage: React.FC<RegionPageProps> = ({ regionId, navigateTo = () => {} }) => {
  const { t, i18n } = useTranslation(['common', 'countries', 'home', 'regions']);
  const { t: tCountries } = useTranslation('countries');
  const { t: tRegions } = useTranslation('regions');
  const { t: tCommon } = useTranslation('common');
  const [selectedPlanState, setSelectedPlanState] = useState<any>(null);
  const [upsell, setUpsell] = useState(false);
  const [plansData, setPlansData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showChecker, setShowChecker] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Handle hydration safely
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const region = REGIONS.find(r => r.id === regionId);
  const countriesInRegion = useMemo(() => 
    COUNTRIES.filter(c => c.regionId === regionId),
    [regionId]
  );
  
  // Validate region exists
  if (!region) {
    console.error('Region not found:', regionId);
    return <NotFoundPage navigateTo={navigateTo} />;
  }

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

  // Get translated region name (moved before conditional returns)
  const translatedRegionName = region ? getRegionName(region.id) : regionId;

  // Load data dynamically (client side) to keep bundle small
  useEffect(() => {
    const loadData = async () => {
      try {
        console.log('RegionPage: Loading enhanced plans data...');
        const normalizedPlansData = await sailyPlansService.getNormalizedPlansData();
        
        const sailyPlans = normalizedPlansData?.items?.filter(p => p.source === 'saily') || [];
        const localPlans = normalizedPlansData?.items?.filter(p => p.source === 'local') || [];
        console.log('RegionPage: Enhanced plans loaded:', normalizedPlansData?.items?.length || 0, 'total plans');
        console.log('RegionPage: Breakdown -', sailyPlans.length, 'Saily plans,', localPlans.length, 'local plans');
        
        setPlansData(normalizedPlansData);
      } catch (error) {
        console.error('RegionPage: Error loading enhanced data:', error);
        // Fallback to original data service
        try {
          const fallbackPlansData = await dataService.getPlansData(true);
          console.log('RegionPage: Using fallback plans data:', fallbackPlansData?.items?.length || 0, 'plans');
          setPlansData(fallbackPlansData);
        } catch (fallbackError) {
          console.error('RegionPage: Fallback also failed:', fallbackError);
          setPlansData({ items: [] });
        }
      } finally {
        setLoading(false);
      }
    };
    // Only execute on client; during SSR we'll use fallback below
    if (typeof window !== 'undefined') {
      loadData();
    }
  }, []);

  // Skip loading state during SSR
  const isSSR = typeof window === 'undefined' || !window.document || !window.document.createElement;
  const shouldShowLoading = !isSSR && loading && isHydrated;

  // Provide minimal fallback plans for SSR so markup is not empty
  const fallbackPlansData = {
    items: [
      {
        identifier: 'region_3gb_30days',
        name: '3 GB Plan',
        data_limit: { amount: 3, unit: 'GB', is_unlimited: false },
        duration: { amount: 30, unit: 'day' },
        price: { amount_with_tax: 999, currency: 'USD', identifier: 'region_3gb_30days' },
        covered_countries: [],
      },
      {
        identifier: 'region_5gb_30days',
        name: '5 GB Plan',
        data_limit: { amount: 5, unit: 'GB', is_unlimited: false },
        duration: { amount: 30, unit: 'day' },
        price: { amount_with_tax: 1499, currency: 'USD', identifier: 'region_5gb_30days' },
        covered_countries: [],
      },
      {
        identifier: 'region_10gb_30days',
        name: '10 GB Plan',
        data_limit: { amount: 10, unit: 'GB', is_unlimited: false },
        duration: { amount: 30, unit: 'day' },
        price: { amount_with_tax: 2499, currency: 'USD', identifier: 'region_10gb_30days' },
        covered_countries: [],
      },
    ],
  };

  // Ensure consistent data structure to prevent hydration mismatch
  const effectivePlansData = isSSR || !plansData || !isHydrated ? fallbackPlansData : plansData;

  // Move all region plans calculation logic here before early returns
  const regionCountryCodes = countriesInRegion.map(c => c.id.toUpperCase());
  const regionCodeMap: Record<string, string> = {
    'europe': 'EU',
    'asia': 'ASA',
    'north-america': 'NAM',
    'south-america': 'LAT',
    'africa': 'AFR',
    'oceania': 'ASA', // Asia & Oceania combined in dataset
  };
  const allowedRegionCode = regionCodeMap[regionId];

  // Filter plans for this region with memoization for better performance
  const regionPlansRaw = useMemo(() => {
    return (effectivePlansData?.items || []).filter((plan: any) => {
      const covered: string[] = Array.isArray(plan.covered_countries) ? plan.covered_countries : [];
      const n = covered.length;
      const inRegionCount = covered.filter((code: string) => regionCountryCodes.includes(code)).length;

      // Show only REGIONAL plans for this region: multi-country, not global, and covering at least two countries in this region
      if (n <= 1 || n >= 50) return false;
      if (inRegionCount < 2) return false;

      // Accept explicitly tagged plans for this region as well
      if (allowedRegionCode && plan.region === allowedRegionCode) return true;

      return true;
    });
  }, [effectivePlansData, regionCountryCodes, allowedRegionCode]);

  console.log('RegionPage: Filtering plans for region:', regionId);
  console.log('RegionPage: Total plans in data:', effectivePlansData?.items?.length || 0);
  console.log('RegionPage: Filtered region plans:', regionPlansRaw.length);
  
  // Log plan types for debugging
  const explicitRegionalPlans = regionPlansRaw.filter((p: any) => p.region === allowedRegionCode);
  const countryPlansInRegion = regionPlansRaw.filter((p: any) => p.region !== allowedRegionCode);
  console.log('RegionPage: Explicit regional plans:', explicitRegionalPlans.length, 'Country plans in region:', countryPlansInRegion.length);

  // Smart-deduplicate exact duplicates for region view while preserving coverage types
     const regionDedupMap: { [key: string]: any } = {};
   regionPlansRaw.forEach((p: any) => {
     // Only dedup among REGIONAL plans (n>1 and n<50)
     const n = Array.isArray(p.covered_countries) ? p.covered_countries.length : 0;
     if (n <= 1 || n >= 50) return;
     const coverageTag = p.region || 'multi';
     const key = `regional|${coverageTag}|${p.data_amount}-${p.data_unit}-${p.validity_days}|${p.price?.amount_with_tax}`;
     const existing = regionDedupMap[key];
     if (!existing || (p.price?.amount_with_tax ?? Infinity) < (existing.price?.amount_with_tax ?? Infinity)) {
       regionDedupMap[key] = p;
     }
   });
  const allRegionPlansRaw = Object.values(regionDedupMap);

  // Transform into objects expected by UI components
  const regionPlans = allRegionPlansRaw.length > 0
    ? allRegionPlansRaw.map((plan: any) => {
        // Determine plan type based on coverage and region
        let planType: 'country' | 'regional' | 'global' = 'country';
        
        if (Array.isArray(plan.covered_countries) && plan.covered_countries.length >= 50) {
            planType = 'global';
        } else if (Array.isArray(plan.covered_countries) && plan.covered_countries.length > 1) {
            planType = 'regional';
        } else {
            planType = 'country';
        }
        
        return {
            id: plan.identifier,
            name: plan.name,
            data_amount: plan.data_amount,
            data_unit: plan.data_unit,
            validity_days: plan.validity_days,
            price: {
                amount_with_tax: plan.price.amount_with_tax,
                currency: plan.price.currency,
            },
            covered_countries: plan.covered_countries,
            identifier: plan.identifier,
            data: plan.data,
            validity: plan.validity,
            planType: planType, // Add plan type for labeling
            region: plan.region, // Keep original region info
        };
    })
    : (isSSR ? fallbackPlansData.items.map((plan: any) => {
        // Determine plan type for fallback data
        let planType: 'country' | 'regional' | 'global' = 'country';
        
        if (plan.region === 'GLB' || plan.covered_countries.length >= 50) {
            planType = 'global';
        } else if (plan.region || plan.covered_countries.length > 5) {
            planType = 'regional';
        } else {
            planType = 'country';
        }
        
        return {
            id: plan.identifier,
            name: plan.name,
            data_amount: plan.data_amount,
            data_unit: plan.data_unit,
            validity_days: plan.validity_days,
            price: {
                amount_with_tax: plan.price.amount_with_tax,
                currency: plan.price.currency,
            },
            covered_countries: plan.covered_countries,
            identifier: plan.identifier,
            data: plan.data,
            validity: plan.validity,
            planType: planType,
            region: plan.region,
        };
    }) : []);

  // Best value plan (first by isBestValue flag else cheapest)
  const bestValuePlan = regionPlans.find((p: any) => (p as any).isBestValue);
  const bestValuePlanId = bestValuePlan ? bestValuePlan.id.toString() : undefined;

  // Compute lowest price for hero bullet
  const lowestPricePlan = regionPlans.length > 0 ? regionPlans.reduce((min: any, plan: any) => (plan.price.amount_with_tax < min.price.amount_with_tax ? plan : min), regionPlans[0]) : null;
  const formattedPrice = lowestPricePlan ? `${formatCurrency(lowestPricePlan.price.currency)}${(lowestPricePlan.price.amount_with_tax / 100)}` : null;

  // Create an optimized lookup map for country prices to avoid repeated filtering
  const countryPricesMap = React.useMemo(() => {
    if (!plansData?.items) return new Map();
    
    const pricesMap = new Map<string, { amount: number; currency: string }>();
    
    try {
      plansData.items.forEach((plan: any) => {
        const coveredCountries = plan.covered_countries || [];
        const price = plan.price.amount_with_tax;
        
        coveredCountries.forEach((countryCode: string) => {
          const upperCode = countryCode.toUpperCase();
          const existing = pricesMap.get(upperCode);
          
          if (!existing || price < existing.amount) {
            pricesMap.set(upperCode, {
              amount: price,
              currency: plan.price.currency
            });
          }
        });
      });
      
      // Log some statistics for debugging
      if (process.env.NODE_ENV === 'development') {
        console.log(`Created pricing map for ${pricesMap.size} countries from ${plansData.items.length} plans`);
      }
    } catch (error) {
      console.error('Error creating country prices map:', error);
    }
    
    return pricesMap;
  }, [plansData]);

  // Memoize the structured data to prevent re-render loops (moved before early returns)
  const structuredData = useMemo(() => {
    const regionName = translatedRegionName;
    const pageUrl = `${BASE_URL}${i18n.language === 'en' ? '/en' : ''}/${regionId}`;
    const orgId = `${SCHEMA_BASE_URL}/#organization`;
    const websiteId = `${SCHEMA_BASE_URL}/#website`;
    const regionNodeId = `${pageUrl}/#region`;
    const breadcrumbId = `${pageUrl}/#breadcrumb`;
    const productId = `${pageUrl}/#product`;

    const prices = regionPlans.map((p: any) => p.price.amount_with_tax / 100).filter((n: number) => Number.isFinite(n));
    const lowPrice = prices.length ? Math.min(...prices).toFixed(2) : undefined;
    const highPrice = prices.length ? Math.max(...prices).toFixed(2) : undefined;

    const offers = regionPlans.slice(0, 20).map((p: any) => ({
      "@type": "Offer" as const,
      "@id": `${pageUrl}/#offer-${p.id}`,
      sku: p.id,
      name: p.name,
      price: (p.price.amount_with_tax / 100).toFixed(2),
      priceCurrency: p.price.currency || 'USD',
      availability: 'https://schema.org/InStock',
      eligibleRegion: { "@id": regionNodeId },
      itemOffered: { "@id": productId },
      url: `${pageUrl}#plans`
    }));

    return {
      "@context": "https://schema.org",
      "@graph": [
        generateWebSiteSchema(t, i18n.language),
        generateOrganizationSchema(t, i18n.language),
        generateWebPageSchema(
          t, 
          i18n.language, 
          pageUrl, 
          tRegions('meta.title_template', { region: regionName }) || `${regionName} eSIM - Travel eSIMple`,
          tRegions('meta.description_template', { region: regionName }) || `Get affordable eSIM data plans for ${regionName}. Instant activation, no hidden fees.`,
          regionNodeId,
          breadcrumbId
        ),
        generateBreadcrumbSchema(
          t,
          i18n.language,
          pageUrl,
          [
            { name: t('breadcrumbs.home', { ns: 'common' }), item: `${SCHEMA_BASE_URL}/` },
            { name: `${regionName} eSIM`, item: pageUrl }
          ]
        ),
        generatePlaceSchema(
          t,
          i18n.language,
          pageUrl,
          regionName,
          'Place'
        ),
        generateProductSchema(
          t,
          i18n.language,
          pageUrl,
          `${regionName} eSIM`,
          tRegions('meta.og_description_template', { region: regionName }) || `Get affordable eSIM data plans for ${regionName}. Instant activation, no hidden fees.`,
          offers
        ),
        generateAggregateOfferSchema(
          t,
          i18n.language,
          pageUrl,
          (regionPlans[0]?.price?.currency) || 'USD',
          lowPrice || '0',
          highPrice || '0',
          offers.length,
          offers.map((o: any) => o['@id'])
        )
      ]
    };
  }, [regionId, translatedRegionName, regionPlans, i18n.language, tRegions, t]);

  // Additional helper functions (moved before early returns)
  const benefitBullets = [
    formattedPrice ? tCountries('data_plans_from', { price: formattedPrice }) : tCountries('affordable_flexible_plans'),
    tCountries('stay_connected_networks', { region: translatedRegionName }),
    tCountries('compatible_smartphones'),
  ];

  const breadcrumbItems = [
    {
      label: tCountries('region_travel_esim', { region: translatedRegionName }),
      url: i18n.language === 'zh' ? `/zh/${regionId}` : `/${regionId}`
    }
  ];

  // Render loading state
  if (shouldShowLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  // Render 404 if region not found
  if (!region) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-center">404 - Region Not Found</h1>
        <p className="text-center text-gray-600">The region you are looking for does not exist.</p>
      </div>
    );
  }

  // Function to get the lowest price for a specific country
  const getLowestPriceForCountry = (countryCode: string) => {
    if (!plansData?.items) return null;
    
    // Filter plans that cover this specific country
    const countryPlans = plansData.items.filter((plan: any) => {
      const coveredCountries = plan.covered_countries || [];
      return coveredCountries.some((code: string) => code.toUpperCase() === countryCode.toUpperCase());
    });
    
    if (countryPlans.length === 0) return null;
    
    // Find the plan with the lowest price for this country
    const lowestPricePlan = countryPlans.reduce((min: any, plan: any) => 
      plan.price.amount_with_tax < min.price.amount_with_tax ? plan : min, countryPlans[0]
    );
    
    return {
      amount: lowestPricePlan.price.amount_with_tax,
      currency: lowestPricePlan.price.currency
    };
  };

  // Function to format price for display
  const formatCountryPrice = (country: Country) => {
    // Use countryCode if available, otherwise convert id to uppercase
    const codeToSearch = country.countryCode || country.id.toUpperCase();
    const priceData = getLowestPriceForCountry(codeToSearch);
    if (!priceData) return null;
    
    return `${formatCurrency(priceData.currency)}${(priceData.amount / 100)}`;
  };

  // Optimized function to get the lowest price for a specific country
  const getLowestPriceForCountryOptimized = (country: Country) => {
    if (!countryPricesMap.size) return null;
    
    try {
      // Use countryCode if available, otherwise convert id to uppercase
      const codeToSearch = country.countryCode || country.id.toUpperCase();
      const result = countryPricesMap.get(codeToSearch);
      
      if (process.env.NODE_ENV === 'development' && !result) {
        console.warn(`No pricing found for country: ${country.name} (${codeToSearch})`);
      }
      
      return result;
    } catch (error) {
      console.error(`Error getting price for country ${country.name}:`, error);
      return null;
    }
  };

  // Optimized function to format price for display
  const formatCountryPriceOptimized = (country: Country) => {
    const priceData = getLowestPriceForCountryOptimized(country);
    if (!priceData) return null;
    
    return `${formatCurrency(priceData.currency)}${(priceData.amount / 100)}`;
  };

  const handleBuyClick = () => {
    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', 'buy_esim_click', { region: region.name, plan: selectedPlanState?.id, upsell });
    }

    if (selectedPlanState) {
      const planData = {
        country: region.name,
        flag: '/esim-data/flags/globe.svg',
        data: selectedPlanState.data,
        validity: selectedPlanState.validity,
        price: selectedPlanState.price.amount_with_tax / 100,
        currency: formatCurrency(selectedPlanState.price.currency || 'USD'),
        identifier: selectedPlanState.identifier, // Use the plan UUID from saily_plans.json
        priceIdentifier: (selectedPlanState.price as any)?.identifier,
      } as any;
      const encodedPlan = encodeURIComponent(JSON.stringify(planData));
      navigateTo(`/checkout?plan=${encodedPlan}`);
    }
  };

  return (
    <div key={`region-${regionId}-${isSSR ? 'ssr' : isHydrated ? 'hydrated' : 'client'}`}>
      <Helmet>
        <html lang={i18n.language === 'bg' ? 'bg' : 'en'} />
        <title>{tRegions('meta.title_template', { region: translatedRegionName }) || `${translatedRegionName} eSIM - Travel eSIMple`}</title>
        <meta name="description" content={tRegions('meta.description_template', { region: translatedRegionName }) || `Get affordable eSIM data plans for ${translatedRegionName}. Instant activation, no hidden fees. Stay connected while traveling in ${translatedRegionName}.`} />
        <meta name="keywords" content={tRegions('meta.keywords_template', { region: translatedRegionName }) || `${translatedRegionName} eSIM, ${translatedRegionName} travel eSIM, ${translatedRegionName} mobile data, ${translatedRegionName} international roaming`} />
        <meta property="og:title" content={tRegions('meta.og_title_template', { region: translatedRegionName }) || `${translatedRegionName} eSIM - Instant Activation, No Roaming Fees`} />
        <meta property="og:description" content={tRegions('meta.og_description_template', { region: translatedRegionName }) || `Get affordable eSIM data plans for ${translatedRegionName}. Instant activation, no hidden fees.`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://travelesim.bg${i18n.language === 'en' ? '/en' : ''}/${regionId}`} />
        <meta property="og:image" content="https://travelesim.bg/esim-data/travelesim-logo.png" />
        <meta property="og:locale" content={i18n.language === 'bg' ? 'bg_BG' : 'en_US'} />
        <meta property="og:locale:alternate" content={i18n.language === 'bg' ? 'en_US' : 'bg_BG'} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={tRegions('meta.twitter_title_template', { region: translatedRegionName }) || `${translatedRegionName} eSIM - Instant Activation, No Roaming Fees`} />
        <meta name="twitter:description" content={tRegions('meta.twitter_description_template', { region: translatedRegionName }) || `Get affordable eSIM data plans for ${translatedRegionName}. Instant activation, no hidden fees.`} />
        <link rel="canonical" href={`https://travelesim.bg${i18n.language === 'en' ? '/en' : ''}/${regionId}`} />
        <link rel="alternate" hrefLang="bg" href={`https://travelesim.bg/${regionId}`} />
        <link rel="alternate" hrefLang="en" href={`https://travelesim.bg/en/${regionId}`} />
        <link rel="alternate" hrefLang="x-default" href={`https://travelesim.bg/${regionId}`} />
        {isHydrated && !isSSR && (
          <script type="application/ld+json">
            {JSON.stringify(structuredData)}
          </script>
        )}
      </Helmet>
      <div className="bg-white">
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbItems} navigateTo={navigateTo} />

        {/* Hero Section */}
        <div className="w-full bg-black text-white py-8 md:py-16">
          <div className="w-full max-w-[90vw] mx-auto px-2 sm:px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center justify-center">
              <div className="lg:col-span-1 flex flex-col justify-center text-left px-2 sm:px-4">
                <div className="flex flex-col sm:flex-row items-start mb-6 gap-3 sm:gap-4 w-full">
                  <span
                    className="inline-flex items-center justify-center"
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: '50%',
                      overflow: 'hidden',
                      boxShadow: '0 0 0 4px rgba(100,100,150,0.5), 0 0 0 8px #23225a',
                      boxSizing: 'border-box',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">{region.name.charAt(0)}</span>
                    </div>
                  </span>
                  <h1 className="text-4xl md:text-6xl font-extrabold text-white text-left">{tCountries('esim_for_region', { region: translatedRegionName })}</h1>
                </div>
                                  <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 sm:mb-8 text-left">
                    {tCountries('stay_connected_region', { region: translatedRegionName })}
                  </p>
                <ul className="space-y-2 mb-6 sm:mb-8 text-white text-left">
                  {benefitBullets.map((text, idx) => (
                    <BenefitItem key={idx} text={text} />
                  ))}
                </ul>
              </div>
              <div className="lg:col-span-1 flex flex-col justify-center">
                <div
                  className="w-full rounded-none shadow-none p-0 m-0 border-0 sm:rounded-2xl sm:shadow-lg sm:p-8 flex flex-col justify-center items-center lg:sticky lg:top-24"
                  style={{ boxSizing: 'border-box' }}
                >
                  <PlanSelector
                    plans={regionPlans}
                    selectedPlan={selectedPlanState}
                    onSelectPlan={(plan: any) => setSelectedPlanState(plan)}
                    countryName={translatedRegionName}
                    bestValuePlanId={bestValuePlanId}
                    onUpsellChange={setUpsell}
                    onBuyNow={handleBuyClick}
                    onCheckCompatibility={() => setShowChecker(true)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* All plans grid below hero/selector */}
        <RegionPlansGrid plans={regionPlans} regionName={translatedRegionName} />

        {/* Enhanced Saily Plans Section */}
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
          <Suspense fallback={<div className="animate-pulse p-4"><div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div><div className="h-4 bg-gray-200 rounded w-1/2"></div></div>}>
            <SailyPlansSection 
              regionName={region?.name || translatedRegionName}
              title={`All Available Plans for ${translatedRegionName}`}
              maxPlans={12}
              showSource={true}
              className="mb-8"
            />
          </Suspense>
        </div>

        {/* Countries Grid Section */}
        <div className="bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{tRegions('countries_section.title', { region: translatedRegionName })}</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  {tRegions('countries_section.description')}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {countriesInRegion.map(country => (
                  <CountryCard key={country.id} country={country} navigateTo={navigateTo} price={formatCountryPriceOptimized(country) || undefined} />
                ))}
              </div>

              {/* Stats Section */}
              <div className="mt-16 pt-12 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{countriesInRegion.length}</div>
                    <div className="text-gray-600 font-medium">{tCountries('countries_available')}</div>
                  </div>
                  <div>
                    <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                      {formattedPrice ? tCountries('from_price', { price: formattedPrice }) : tCountries('from_default_price')}
                    </div>
                                          <div className="text-gray-600 font-medium">{tCountries('starting_price')}</div>
                  </div>
                  <div>
                    <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">24/7</div>
                                          <div className="text-gray-600 font-medium">{tCountries('customer_support')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How to Get eSIM Section */}
        <HowToGetESIM regionName={translatedRegionName} />

        {/* ESIM Compatibility */}
        <Suspense fallback={<ComponentLoader />}>
          <ESIMCompatibility onCheckCompatibility={() => setShowChecker(true)} />
        </Suspense>
        <DeviceCompatibilityModal isOpen={showChecker} onClose={() => setShowChecker(false)} />

        {/* Destination Selector */}
        <Suspense fallback={<ComponentLoader />}>
          <DestinationSelector navigateTo={navigateTo} />
        </Suspense>
      </div>
    </div>
  );
};

interface CountryCardProps {
  country: Country;
  navigateTo: (route: string) => void;
  price?: string;
}

const CountryCard: React.FC<CountryCardProps> = ({ country, price }) => {
  const { t } = useTranslation('countries');
  
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
  
  // Check if country has plans available
  const hasPlans = price !== null && price !== undefined;
  
  return (
  <a
    href={`/${country.regionId}/${country.slug}`}
    className={`group bg-white p-6 rounded-xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-lg hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-1 block ${!hasPlans ? 'opacity-60' : ''}`}
  >
    <div className="flex items-center space-x-4">
      <div className="flex-shrink-0">
        <div className="w-12 h-12 rounded-lg overflow-hidden shadow-sm border border-gray-200 group-hover:shadow-md transition-shadow duration-300">
          <img 
            src={`/esim-data/flags/${country.id.toLowerCase()}.svg`} 
            alt={`${getCountryName(country.id)} flag`} 
            className="w-full h-full object-cover"
            loading="lazy"
            width="48"
            height="48"
          />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 truncate">
          {getCountryName(country.id)}
        </h3>
        <p className="text-sm text-gray-600 font-medium">
          {hasPlans ? price : t('no_plans_available')}
        </p>
        <div className="flex items-center mt-2">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            hasPlans 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-600'
          }`}>
            {hasPlans ? t('available') : t('unavailable')}
          </span>
        </div>
      </div>
      <div className="flex-shrink-0">
        <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  </a>
  );
};

interface BenefitItemProps {
  text: string;
}

const BenefitItem: React.FC<BenefitItemProps> = ({ text }) => (
  <li className="flex items-center text-lg text-white">
    <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
    </svg>
    {text}
  </li>
);

export default RegionPage;
