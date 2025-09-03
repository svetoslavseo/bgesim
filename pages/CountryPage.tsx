
import React, { useState, useEffect, lazy, Suspense, useMemo } from 'react';
import { Plan } from '../types';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import StableSkeleton from '../components/StableSkeleton';
import LoadingSpinner from '../components/LoadingSpinner';
import { dataService } from '../utils/dataService';
// Remove static import to reduce bundle size
// import plansData from '../src/data/plans.json';
import PlanSelector from '../components/PlanSelector';
import HowItWorks from '../components/HowItWorks';
import CountryComparisonTable from '../components/CountryComparisonTable';
import Breadcrumbs from '../components/Breadcrumbs';
import HowToGetESIM from '../components/HowToGetESIM';
import { COUNTRIES, AUTHOR_INFO, getTranslatedCountryFAQs, REGIONS, BASE_URL } from '../constants';
import { 
  generateOrganizationSchema, 
  generateWebSiteSchema, 
  generateWebPageSchema, 
  generateBreadcrumbSchema, 
  generatePlaceSchema, 
  generateProductSchema, 
  generateAggregateOfferSchema,
  generateFAQSchema,
  BASE_URL as SCHEMA_BASE_URL
} from '../utils/schemaUtils';
import { FaBolt, FaGlobe, FaMoneyBillWave, FaRegComments } from 'react-icons/fa';
import DeviceCompatibilityModal from '../components/DeviceCompatibilityModal';
import { Country } from '../types';
import i18n from '../i18n';

// Lazy load heavy components that are below the fold
const Faq = lazy(() => import('../components/Faq'));
const AuthorProfile = lazy(() => import('../components/AuthorProfile'));
const DestinationSelector = lazy(() => import('../components/DestinationSelector'));
const ESIMCompatibility = lazy(() => import('../components/ESIMCompatibility'));
const CountryESIMInfo = lazy(() => import('../components/CountryESIMInfo'));
const PaymentMethods = lazy(() => import('../components/PaymentMethods'));
const TestimonialsCarousel = lazy(() => import('../components/TestimonialsCarousel'));
const CountryContentSection = lazy(() => import('../components/CountryContentSection'));
const StickyCTA = lazy(() => import('../components/StickyCTA'));
const CountryPlansGrid = lazy(() => import('../components/CountryPlansGrid'));

interface CountryPageProps {
  countryId: string;
  navigateTo?: (route: string) => void;
}

// Utility function to format currency display
const formatCurrency = (currency: string) => {
    if (currency === 'USD') return '$';
    return currency;
};

// Component loader for lazy-loaded components
const ComponentLoader: React.FC = () => (
    <div className="animate-pulse p-4">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
);

const CountryPage: React.FC<CountryPageProps> = ({ countryId, navigateTo = () => {} }) => {
    const { t, i18n } = useTranslation(['countries', 'home', 'common', 'faq', 'esim_info']);
    // helper for countries namespace
    const c = (key: string, options: any = {}) => t(key, { ns: 'countries', ...options }) as string;
    
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
    
    const [showStickyCTA, setShowStickyCTA] = useState(false);
    const [upsell, setUpsell] = useState(false);
    const [showChecker, setShowChecker] = useState(false);
    const [plansData, setPlansData] = useState<any>(null);
    const [globalSpeedTestData, setGlobalSpeedTestData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [selectedPlan, setSelectedPlan] = useState<any>(null);

    // Define country and countryISO early, before any hooks that use them
    const country = COUNTRIES.find(c => c.id === countryId);
    const countryISO = country?.countryCode || country?.id.toUpperCase() || 'US';

    // Scroll effect for sticky CTA
    useEffect(() => {
        const handleScroll = () => {
            setShowStickyCTA(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Load data dynamically to reduce bundle size with optimized service
    useEffect(() => {
        const loadData = async () => {
            try {
                // Load language-specific speedtest data
                let fileName = 'global-speed-test.json';
                if (i18n.language === 'zh') {
                  fileName = 'global-speed-test-zh.json';
                } else if (i18n.language === 'bg') {
                  fileName = 'global-speed-test-bg.json';
                }
                const [plansData, speedTestDataResponse] = await Promise.all([
                    // Force full dataset for country pages so plan filtering is reliable
                    dataService.getPlansData({ full: true }),
                    fetch(`/data/${fileName}`)
                ]);
                
                let speedTestData = null;
                if (speedTestDataResponse.ok) {
                    speedTestData = await speedTestDataResponse.json();
                } else {
                    // Fallback to English version if Chinese version fails
                    const fallbackResponse = await fetch('/data/global-speed-test.json');
                    if (fallbackResponse.ok) {
                        speedTestData = await fallbackResponse.json();
                    }
                }
                
                console.log('CountryPage: Plans loaded:', plansData?.items?.length || 0, 'plans');
                console.log('CountryPage: Speed data loaded:', !!speedTestData);
                
                // We already requested full data, so just use it
                setPlansData(plansData);
                setGlobalSpeedTestData(speedTestData);
            } catch (error) {
                console.error('Error loading data:', error);
                // Set empty fallbacks to prevent layout shifts but ensure loading stops
                setPlansData({ items: [] });
                setGlobalSpeedTestData(null);
            } finally {
                console.log('CountryPage: Setting loading to false');
                setLoading(false);
            }
        };
        
        loadData();
        
        return () => undefined;
    }, [i18n.language]);

    // Skip loading state during SSR
    const isSSR = typeof window === 'undefined' || !window.document || !window.document.createElement;
    const shouldShowLoading = !isSSR && loading;

    // Create data for rendering - prepare these early
    const effectivePlansData = plansData || { items: [] };

    // Memoize expensive plan filtering operations - ALL hooks MUST be before conditional returns
    const countryPlansRaw = useMemo(() => {
        if (!effectivePlansData?.items || !countryISO) {
            return [];
        }
        return effectivePlansData.items.filter((plan: any) => {
            // Include plans that cover this country
            if (!plan.covered_countries.includes(countryISO)) {
                return false;
            }
            
            // Include all plans that cover this country:
            // 1. Country-specific plans (no region property or small coverage)
            // 2. Regional plans that include this country (for comprehensive coverage)
            // This ensures users see all available options for their destination
            
            return true;
        });
    }, [effectivePlansData, countryISO]);

    // Show stable skeleton instead of loading spinner to prevent CLS
    if (shouldShowLoading) {
        return (
            <div className="min-h-screen">
                <StableSkeleton type="hero" />
                <div className="container mx-auto px-4 py-8">
                    <StableSkeleton type="grid" count={6} />
                </div>
            </div>
        );
    }

    // Remove SSR plan fallbacks: we only show plans from plans.json

    // Create intelligent fallback speedtest data
    const createFallbackSpeedTestData = (countryName: string) => {
      // Try to find the country in the actual speedtest data
      const actualSpeedTestData = {
        "country_rankings": [
          {
            "rank": 77,
            "country": "Mexico",
            "speed_mbps": 47.41,
            "explanation": "Ranked #77, Mexico has moved up 3 positions with a median mobile download speed of 47.41 Mbps."
          },
          {
            "rank": 103,
            "country": "Bolivia", 
            "speed_mbps": 13.45,
            "explanation": "Ranked #103, Bolivia has moved up 1 position with a median mobile download speed of 13.45 Mbps."
          },
          {
            "rank": 101,
            "country": "Andorra",
            "speed_mbps": 95.5,
            "explanation": "Ranked #101, Andorra has a median mobile download speed of 95.5 Mbps."
          },
          {
            "rank": 1,
            "country": "United Arab Emirates",
            "speed_mbps": 539.84,
            "explanation": "Ranked #1, United Arab Emirates has a median mobile download speed of 539.84 Mbps."
          },
          {
            "rank": 2,
            "country": "Qatar",
            "speed_mbps": 529.34,
            "explanation": "Ranked #2, Qatar has a median mobile download speed of 529.34 Mbps."
          },
          {
            "rank": 6,
            "country": "Brazil",
            "speed_mbps": 222.02,
            "explanation": "Ranked #6, Brazil has a median mobile download speed of 222.02 Mbps."
          },
          {
            "rank": 7,
            "country": "China",
            "speed_mbps": 209.31,
            "explanation": "Ranked #7, China has moved up 1 position with a median mobile download speed of 209.31 Mbps."
          },
          {
            "rank": 8,
            "country": "South Korea",
            "speed_mbps": 208.07,
            "explanation": "Ranked #8, South Korea has moved down 1 position with a median mobile download speed of 208.07 Mbps."
          },
          {
            "rank": 15,
            "country": "Singapore",
            "speed_mbps": 163.29,
            "explanation": "Ranked #15, Singapore has moved up 1 position with a median mobile download speed of 163.29 Mbps."
          },
          {
            "rank": 16,
            "country": "Malaysia",
            "speed_mbps": 163.00,
            "explanation": "Ranked #16, Malaysia has moved down 1 position with a median mobile download speed of 163.00 Mbps."
          },
          {
            "rank": 17,
            "country": "Norway",
            "speed_mbps": 160.59,
            "explanation": "Ranked #17, Norway has a median mobile download speed of 160.59 Mbps."
          },
          {
            "rank": 18,
            "country": "Georgia",
            "speed_mbps": 148.89,
            "explanation": "Ranked #18, Georgia has a median mobile download speed of 148.89 Mbps."
          },
          {
            "rank": 19,
            "country": "Estonia",
            "speed_mbps": 147.46,
            "explanation": "Ranked #19, Estonia has moved up 3 positions with a median mobile download speed of 147.46 Mbps."
          }
        ]
      };
      
      // Try to find the country in the actual data
      const countryEntry = actualSpeedTestData.country_rankings.find(
        (entry: any) => entry.country.toLowerCase() === countryName.toLowerCase()
      );
      
      if (countryEntry) {
        return {
          country_rankings: [countryEntry]
        };
      }
      
      // Fallback to generic data
      return {
        country_rankings: [
          {
            rank: 101,
            country: countryName,
            speed_mbps: 95.5,
            explanation: `Ranked #101, ${countryName} has a median mobile download speed of 95.5 Mbps.`
          }
        ]
      };
    };

    const fallbackSpeedTestData = createFallbackSpeedTestData(country?.name || 'Unknown');
    const effectiveSpeedTestData = isSSR ? fallbackSpeedTestData : globalSpeedTestData;

    if (!country) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold text-center">{t('common.error')} - {t('countries.country_not_found')}</h1>
                <p className="text-center text-gray-600">{t('countries.country_not_exist')}</p>
            </div>
        );
    }

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
    
    console.log('CountryPage: Filtering plans for country:', countryISO);
    console.log('CountryPage: Total plans in data:', effectivePlansData?.items?.length || 0);
    console.log('CountryPage: Filtered country plans:', countryPlansRaw.length);
    
    // Log plan types for debugging
    const regionalPlans = countryPlansRaw.filter((p: any) => p.region);
    const countrySpecificPlans = countryPlansRaw.filter((p: any) => !p.region);
    console.log('CountryPage: Regional plans:', regionalPlans.length, 'Country-specific:', countrySpecificPlans.length);
    
    // If we somehow have no plans for this country, try a final client-side full fetch once
    if (!isSSR && !loading && countryPlansRaw.length === 0 && plansData?.items) {
        // Attempt to expand with region-wide or Caribbean plans; many NA islands are covered by regional SKUs
        const regionalCodes = ['NA', 'CA', 'US', 'MX'];
        const caribbeanGroup = ['AI','AG','AW','BS','BB','BM','CW','VG','DM','GD','HT','JM','MS','PA','PR','BL','GF','GP','MF','MQ','KN','LC','TT','TC','BQ','KY','SX','VC'];
        const hasRegional = (plansData.items as any[]).some((p: any) => p.covered_countries.some((c: string) => regionalCodes.includes(c) || caribbeanGroup.includes(c)));
        if (hasRegional) {
            console.log('CountryPage: No direct plans; regional/caribbean plans exist for this market.');
        }
    }

    // Deduplicate plans: for each combination of data_limit and duration, keep the cheapest price version
    const dedupedPlansMap: { [key: string]: any } = {};
    countryPlansRaw.forEach((plan: any) => {
        const key = `${plan.data_limit.amount}-${plan.data_limit.unit}-${plan.duration.amount}-${plan.duration.unit}`;
        if (!dedupedPlansMap[key] || plan.price.amount_with_tax < dedupedPlansMap[key].price.amount_with_tax) {
            dedupedPlansMap[key] = plan;
        }
    });
    const dedupedCountryPlansRaw = Object.values(dedupedPlansMap);
    
    console.log('CountryPage: Deduplicated plans:', dedupedCountryPlansRaw.length);

    const countryPlans: Plan[] = dedupedCountryPlansRaw.map((plan: any) => {
        // Determine plan type based on coverage and region
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
            data_amount: plan.data_limit.amount,
            data_unit: plan.data_limit.unit,
            validity_days: plan.duration.amount,
            price: {
                amount_with_tax: plan.price.amount_with_tax,
                currency: plan.price.currency
            },
            covered_countries: plan.covered_countries,
            identifier: plan.price.identifier,
            data: plan.data_limit.is_unlimited ? 'Unlimited' : `${plan.data_limit.amount} ${plan.data_limit.unit}`,
            validity: `${plan.duration.amount} ${plan.duration.unit}${plan.duration.amount > 1 ? 's' : ''}`,
            planType: planType, // Add plan type for labeling
            region: plan.region, // Keep original region info
        };
    });
    
    // Don't automatically select a plan - let user choose
    
    const bestValuePlanId = countryPlans[0]?.id ? String(countryPlans[0].id) : undefined;

    // Compute the lowest price for the country
    const lowestPricePlan = countryPlans.length > 0 
      ? countryPlans.reduce((min, plan) => (plan.price.amount_with_tax < min.price.amount_with_tax ? plan : min), countryPlans[0])
      : null;
    const formattedPrice = lowestPricePlan && isFinite(lowestPricePlan.price.amount_with_tax) ? `${formatCurrency(lowestPricePlan.price.currency)}${lowestPricePlan.price.amount_with_tax / 100}` : null;

    // Generate dynamic bullet points
    // Retrieve Speedtest explanation text (if available)
    const speedtestEntry = effectiveSpeedTestData?.country_rankings?.find((r: any) =>
      r.country.toLowerCase() === country.name.toLowerCase());
    const speedtestExplanation: string | null = speedtestEntry?.explanation ?? null;

    const bulletPoints: string[] = [
      c('fast_reliable'),
      c('stay_connected_networks', { region: getCountryName(country.id, country.name) }),
      c('compatible_smartphones'),
      formattedPrice
        ? c('data_plans_from', { price: formattedPrice })
        : c('affordable_flexible_plans')
    ];

    // Get region name for breadcrumbs
    const getRegionName = (regionId: string) => {
      const regionNames: Record<string, string> = {
        'europe': c('regions.europe'),
        'asia': c('regions.asia'),
        'north-america': c('regions.north-america'),
        'south-america': c('regions.south-america'),
        'africa': c('regions.africa'),
        'oceania': c('regions.oceania')
      };
      return regionNames[regionId] || c('region');
    };

    const breadcrumbItems = [
      {
        label: c('region_travel_esim', { region: getRegionName(country.regionId) }),
        url: i18n.language === 'zh' ? `/zh/${country.regionId}` : `/${country.regionId}`
      },
      {
        label: getCountryName(country.id, country.name)
      }
    ];

    const handleBuyClick = () => {
      // Event tracking placeholder
      if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
        (window as any).gtag('event', 'buy_esim_click', { country: getCountryName(country.id, country.name), plan: selectedPlan?.id, upsell });
      }
      
      if (selectedPlan) {
        // Prepare plan data for checkout
        const planData = {
          country: getCountryName(country.id, country.name),
          flag: `https://flagcdn.com/${countryISO.toLowerCase()}.svg`,
          data: selectedPlan.data,
          validity: selectedPlan.validity,
          price: selectedPlan.price.amount_with_tax / 100,
          currency: formatCurrency(selectedPlan.currency || selectedPlan.price.currency || 'USD'),
          identifier: selectedPlan.identifier
        };
        
        // Navigate to checkout with plan data
        const encodedPlan = encodeURIComponent(JSON.stringify(planData));
        navigateTo(`/checkout?plan=${encodedPlan}`);
      }
    };

    return (
        <>
          <Helmet>
            <html lang={i18n.language === 'bg' ? 'bg' : 'en'} />
            <title>{c('meta.title_template', { country: getCountryName(country.id, country.name), price: lowestPricePlan ? `$${(lowestPricePlan.price.amount_with_tax / 100).toFixed(2)}` : '' }) || c('meta.title_fallback', { country: getCountryName(country.id, country.name) })}</title>
            <meta name="description" content={c('meta.description_template', { country: getCountryName(country.id, country.name) })} />
            <meta name="keywords" content={c('meta.keywords_template', { country: getCountryName(country.id, country.name) })} />
            <meta property="og:title" content={c('meta.og_title_template', { country: getCountryName(country.id, country.name) })} />
            <meta property="og:description" content={c('meta.og_description_template', { country: getCountryName(country.id, country.name) })} />
            <meta property="og:type" content="website" />
                    <meta property="og:url" content={`https://travelesim.bg/${country.regionId}/${country.slug}`} />
        <meta property="og:image" content="https://travelesim.bg/esim-data/travelesim-logo.png" />
                    <meta property="og:locale" content={i18n.language === 'bg' ? 'bg_BG' : 'en_US'} />
        <meta property="og:locale:alternate" content={i18n.language === 'bg' ? 'en_US' : 'bg_BG'} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={c('meta.twitter_title_template', { country: getCountryName(country.id, country.name) })} />
            <meta name="twitter:description" content={c('meta.twitter_description_template', { country: getCountryName(country.id, country.name) })} />
                    <link rel="canonical" href={`https://travelesim.bg${i18n.language === 'en' ? '/en' : ''}/${country.regionId}/${country.slug}`} />
        <link rel="alternate" hrefLang="bg" href={`https://travelesim.bg/${country.regionId}/${country.slug}`} />
        <link rel="alternate" hrefLang="en" href={`https://travelesim.bg/en/${country.regionId}/${country.slug}`} />
        <link rel="alternate" hrefLang="x-default" href={`https://travelesim.bg/${country.regionId}/${country.slug}`} />
          </Helmet>
          <script type="application/ld+json">
            {JSON.stringify((() => {
              const countryName = getCountryName(country.id, country.name);
              const pageUrl = `${BASE_URL}${i18n.language === 'en' ? '/en' : ''}/${country.regionId}/${country.slug}`;
              const orgId = `${SCHEMA_BASE_URL}/#organization`;
              const websiteId = `${SCHEMA_BASE_URL}/#website`;
              const countryNodeId = `${pageUrl}/#country`;
              const breadcrumbId = `${pageUrl}/#breadcrumb`;
              const productId = `${pageUrl}/#product`;
              const aggregateOfferId = `${pageUrl}/#aggregate-offer`;
              const faqId = `${pageUrl}/#faq`;
              const wikipediaUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(countryName.replace(/\s+/g, '_'))}`;

              const prices = countryPlans.map(p => p.price.amount_with_tax / 100).filter(n => Number.isFinite(n));
              const lowPrice = prices.length ? Math.min(...prices).toFixed(2) : undefined;
              const highPrice = prices.length ? Math.max(...prices).toFixed(2) : undefined;

              const offers = countryPlans.map(p => ({
                "@type": "Offer" as const,
                "@id": `${pageUrl}/#offer-${p.id}`,
                sku: p.id,
                name: p.name,
                price: (p.price.amount_with_tax / 100).toFixed(2),
                priceCurrency: p.price.currency || 'USD',
                availability: 'https://schema.org/InStock',
                eligibleRegion: { "@id": countryNodeId },
                itemOffered: { "@id": productId },
                url: `${pageUrl}#plans`
              }));

                              const faqItems = getTranslatedCountryFAQs(countryName, country.id, t, plansData).slice(0, 8);

              return {
                "@context": "https://schema.org",
                "@graph": [
                  generateWebSiteSchema(t, i18n.language),
                  generateOrganizationSchema(t, i18n.language),
                  generateWebPageSchema(
                    t, 
                    i18n.language, 
                    pageUrl, 
                    c('meta.title_template', { country: countryName, price: lowPrice ? `$${lowPrice}` : '' }) || c('meta.title_fallback', { country: countryName }),
                    c('meta.description_template', { country: countryName }),
                    countryNodeId,
                    breadcrumbId
                  ),
                  generateBreadcrumbSchema(
                    t,
                    i18n.language,
                    pageUrl,
                    [
                      { name: t('breadcrumbs.home', { ns: 'common' }), item: `${SCHEMA_BASE_URL}/` },
                      { name: c('region_travel_esim', { region: getRegionName(country.regionId) }), item: `${SCHEMA_BASE_URL}/${country.regionId}` },
                      { name: `${countryName} eSIM`, item: pageUrl }
                    ]
                  ),
                  generatePlaceSchema(
                    t,
                    i18n.language,
                    pageUrl,
                    countryName,
                    'Country',
                    countryISO,
                    [wikipediaUrl]
                  ),
                  generateProductSchema(
                    t,
                    i18n.language,
                    pageUrl,
                    `${countryName} eSIM`,
                    c('meta.description_template', { country: countryName }),
                    offers
                  ),
                  generateAggregateOfferSchema(
                    t,
                    i18n.language,
                    pageUrl,
                    (countryPlans[0]?.price?.currency) || 'USD',
                    lowPrice || '0',
                    highPrice || '0',
                    offers.length,
                    offers.map(o => o['@id'])
                  ),
                  generateFAQSchema(
                    t,
                    i18n.language,
                    pageUrl,
                    faqItems
                  )
                ]
              };
            })())}
          </script>
          <div className="bg-white">
            {/* Breadcrumbs */}
            <Breadcrumbs items={breadcrumbItems} navigateTo={navigateTo} />

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
                        <img
                          src={`https://flagcdn.com/w80/${countryISO.toLowerCase()}.png`}
                          alt={`${getCountryName(country.id, country.name)} flag`}
                          loading="eager"
                          width="56"
                          height="56"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '50%',
                            display: 'block',
                          }}
                        />
                      </span>
                      <h1 className="text-4xl md:text-6xl font-extrabold text-white text-left">
                        {c('esim_for_country', { country: getCountryName(country.id, country.name) })}
                      </h1>
                    </div>
                    {/* Tagline */}
                    <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-2 sm:mb-4 text-left">{c('country_tagline', { country: getCountryName(country.id, country.name) })}</p>
                    {/* Speedtest Global Index explanation */}
                    {speedtestExplanation && (
                        <figure className="mb-6 sm:mb-8">
                            <blockquote className="bg-gray-800 rounded-lg p-4 border-l-4 border-blue-500">
                                <p className="italic text-gray-200 text-base">
                                    "{speedtestExplanation}"
                                </p>
                            </blockquote>
                            <figcaption className="mt-2 text-right text-sm text-gray-400">
                                - {t('network_performance.speedtest_global_index', { ns: 'esim_info' })}
                            </figcaption>
                        </figure>
                    )}
                    <ul className="space-y-2 mb-6 sm:mb-8 text-white text-left">
                      {bulletPoints.map((text, idx) => (
                        <BenefitItem key={idx} text={text} />
                      ))}
                    </ul>

                  </div>
                  <div
                    className="w-full rounded-none shadow-none p-0 m-0 border-0 sm:rounded-2xl sm:shadow-lg sm:p-8 flex flex-col justify-center items-center lg:sticky lg:top-24"
                    style={{ boxSizing: 'border-box' }}
                  >
                    <PlanSelector
                        plans={countryPlans}
                        selectedPlan={selectedPlan}
                        onSelectPlan={(plan: any) => setSelectedPlan(plan as Plan)}
                        countryName={getCountryName(country.id, country.name)}
                        bestValuePlanId={bestValuePlanId}
                        onUpsellChange={setUpsell}
                        onBuyNow={handleBuyClick}
                        onCheckCompatibility={() => setShowChecker(true)}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* All plans grid below hero/selector */}
            <Suspense fallback={<ComponentLoader />}>
                <CountryPlansGrid plans={countryPlans.filter(plan => plan.data_unit !== 'Unlimited')} countryName={getCountryName(country.id, country.name)} />
            </Suspense>

            <div className="max-w-5xl mx-auto mt-20 md:mt-32 space-y-20 md:space-y-28">
                <CountryComparisonTable countryName={getCountryName(country.id, country.name)} />
                <HowToGetESIM countryName={getCountryName(country.id, country.name)} />
                {/* Why Choose Our eSIMs Section */}
                <section className="bg-gray-50 py-20">
                  <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">{t('why_choose_our_esims.title')}</h2>
                    <p className="text-center text-lg text-gray-600 mb-12">
                      {(() => {
                        // Calculate lowest price from available plans
                        const lowestPricePlan = countryPlansRaw.length > 0 
                          ? countryPlansRaw.reduce((lowest: any, current: any) => 
                              current.price < lowest.price ? current : lowest
                            )
                          : null;
                        
                        const lowestPrice = lowestPricePlan ? `${formatCurrency(lowestPricePlan.price.currency)}${(lowestPricePlan.price.amount_with_tax / 100)}` : '';
                        const countryName = getCountryName(country.id, country.name);
                        
                        // Replace placeholders in the translation
                        let description = t('why_choose_our_esims.description');
                        description = description.replace('{country}', countryName);
                        description = description.replace('{lewest-price}', lowestPrice);
                        
                        return description;
                      })()}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center max-w-6xl mx-auto">
                      <div className="flex flex-col items-center p-4">
                        <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                          <FaBolt className="text-3xl text-blue-500" />
                        </div>
                        <h3 className="text-lg font-bold mb-2">{t('why_choose_our_esims.instant_connectivity.title')}</h3>
                        <p className="text-gray-600">{t('why_choose_our_esims.instant_connectivity.description')}</p>
                      </div>
                      <div className="flex flex-col items-center p-4">
                        <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                          <FaGlobe className="text-3xl text-blue-500" />
                        </div>
                        <h3 className="text-lg font-bold mb-2">{t('why_choose_our_esims.global_coverage.title')}</h3>
                        <p className="text-gray-600">{t('why_choose_our_esims.global_coverage.description')}</p>
                      </div>
                      <div className="flex flex-col items-center p-4">
                        <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                          <FaMoneyBillWave className="text-3xl text-blue-500" />
                        </div>
                        <h3 className="text-lg font-bold mb-2">{t('why_choose_our_esims.affordable_transparent.title')}</h3>
                        <p className="text-gray-600">{t('why_choose_our_esims.affordable_transparent.description')}</p>
                      </div>
                      <div className="flex flex-col items-center p-4">
                        <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                          <FaRegComments className="text-3xl text-blue-500" />
                        </div>
                        <h3 className="text-lg font-bold mb-2">{t('why_choose_our_esims.chat_support.title')}</h3>
                        <p className="text-gray-600">{t('why_choose_our_esims.chat_support.description')}</p>
                      </div>
                    </div>
                  </div>
                </section>
                <Suspense fallback={<ComponentLoader />}>
                    <ESIMCompatibility onCheckCompatibility={() => setShowChecker(true)} />
                </Suspense>
                <DeviceCompatibilityModal isOpen={showChecker} onClose={() => setShowChecker(false)} />
                
                {/* Customer Satisfaction Section */}
                {/* Testimonials Carousel */}
                <Suspense fallback={<ComponentLoader />}>
                    <TestimonialsCarousel />
                </Suspense>
                {/* Country-specific SEO Content */}
                {/* <AuthorProfile author={AUTHOR_INFO} /> */}
            </div>

            {/* Country eSIM Info */}
            <Suspense fallback={<ComponentLoader />}>
                <CountryESIMInfo country={country} />
            </Suspense>

            {/* Sticky CTA */}
            {showStickyCTA && (
                <Suspense fallback={null}>
                    <StickyCTA onClick={handleBuyClick} />
                </Suspense>
            )}
            {/* Live Chat Widget */}
  
            {/* Footer with legal links */}
            {/* <Footer navigateTo={navigateTo} /> */}
            {/* FAQ Section moved to bottom */}
            <div className="px-4 py-12 md:px-8">
                <h2 className="text-3xl md:text-[36px] font-bold text-center text-gray-900 mb-10">{c('frequently_asked_questions')}</h2>
                <Suspense fallback={<ComponentLoader />}>
                    <Faq faqs={getTranslatedCountryFAQs(getCountryName(country.id, country.name), countryId, t, plansData)} />
                </Suspense>
                <div className="mt-12">
                    <Suspense fallback={<ComponentLoader />}>
                        <AuthorProfile author={AUTHOR_INFO} navigateTo={navigateTo} />
                    </Suspense>
                </div>
            </div>
            <Suspense fallback={<ComponentLoader />}>
                <DestinationSelector navigateTo={navigateTo} />
            </Suspense>
          </div>
        </>
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

export default CountryPage;
