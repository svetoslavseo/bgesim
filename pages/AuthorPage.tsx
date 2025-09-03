import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
// Remove react-world-flags import to fix loading issue
// import Flag from 'react-world-flags';
import { AUTHOR_INFO, COUNTRIES, REGIONS } from '../constants';
import { generatePersonSchema, generateOrganizationSchema, BASE_URL as SCHEMA_BASE_URL } from '../utils/schemaUtils';
import { Region, Country } from '../types';
import { dataService } from '../utils/dataService';

interface AuthorPageProps {
    navigateTo: (route: string) => void;
}

const AuthorPage: React.FC<AuthorPageProps> = ({ navigateTo }) => {
    const { t, i18n } = useTranslation('author_page');
    const [selectedTab, setSelectedTab] = useState<'country' | 'region'>('country');
    const [plansData, setPlansData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Load data dynamically (client side) to keep bundle small
    useEffect(() => {
        const loadData = async () => {
            try {
                console.log('AuthorPage: Loading plans data...');
                const plansResponse = await dataService.getPlansData({ full: true });
                console.log('AuthorPage: Plans data loaded:', plansResponse?.items?.length || 0, 'plans');
                setPlansData(plansResponse);
            } catch (error) {
                console.error('AuthorPage: Error loading data:', error);
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
    const shouldShowLoading = !isSSR && loading;

    // Provide minimal fallback plans for SSR so markup is not empty
    const effectivePlansData = plansData || { items: [] };

    return (
        <>
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@graph": [
                            generatePersonSchema(
                                t,
                                i18n.language,
                                `${SCHEMA_BASE_URL}/author/vasil-andreev`,
                                "Vasil Andreev",
                                t('author_info.title', 'Founder of Travel eSIM Global'),
                                `${SCHEMA_BASE_URL}/#organization`,
                                [
                                    "https://www.linkedin.com/in/vasil-andreev-b34142219/",
                                    "https://travelesim.dk/v-andreev/",
                                    "https://travelesim.ro/andreev/",
                                    "https://travelesim.bg/v-andreev/"
                                ],
                                "https://travelesim.bg/vasil-andreev-768x1024.jpeg"
                            ),
                            generateOrganizationSchema(t, i18n.language)
                        ]
                    })}
                </script>
            </Helmet>
            <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 py-12">
                {/* Author Information Section */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
                    <div className="flex items-start space-x-6">
                        {/* Profile Picture */}
                        <div className="flex-shrink-0">
                            <img
                                src={AUTHOR_INFO.avatarUrl}
                                alt={t('profile.avatar_alt')}
                                className="w-24 h-24 rounded-full object-cover"
                                loading="lazy"
                            />
                        </div>
                        
                        {/* Author Details */}
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                {t('author_info.name')}
                            </h1>
                            <p className="text-blue-600 text-lg mb-3">
                                {t('author_info.title')}
                            </p>
                            <div className="flex items-center">
                                <a 
                                    href="https://www.linkedin.com/in/vasil-andreev-b34142219/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-6 h-6 bg-gray-800 rounded flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer"
                                >
                                    <span className="text-white text-xs font-bold">in</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* About Me Section */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('about_me.title')}</h2>
                    <p className="text-gray-700 leading-relaxed">
                        {t('author_info.bio')}
                    </p>
                    <div className="mt-4">
                        <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                            {t('author_info.read_more')}
                        </a>
                    </div>
                </div>

                {/* Choose your destination Section */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t('destination.title')}</h2>
                        <p className="mt-3 text-lg text-gray-600">{t('destination.description')}</p>
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
                            {t('tabs.popular_countries')}
                        </button>
                        <button
                            onClick={() => setSelectedTab('region')}
                            className={`px-6 py-2 rounded-full font-medium transition-colors ${
                                selectedTab === 'region'
                                    ? 'bg-gray-900 text-white shadow-md'
                                    : 'bg-white text-gray-700 hover:bg-gray-100'
                            }`}
                        >
                            {t('tabs.regional_plans')}
                        </button>
                    </div>

                    {selectedTab === 'country' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {COUNTRIES.slice(0, 24).map((country) => (
                                <CountryCard key={country.id} country={country} navigateTo={navigateTo} plansData={effectivePlansData} />
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
                        <a href={i18n.language === 'en' ? "/en/regions" : "/regions"} className="bg-gray-900 hover:bg-gray-800 text-white font-bold px-8 py-3 rounded-lg transition-transform hover:scale-105 inline-block">
                            {t('view_all_destinations')}
                        </a>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

// Utility function to get the lowest price for a country
const getLowestPriceForCountry = (countryCode: string, plansData: any): { price: number; currency: string } | null => {
  if (!plansData || !plansData.items) {
    return null;
  }
  
  // Find plans that cover this country
  const countryPlans = plansData.items.filter((plan: any) => {
    const coveredCountries = plan.covered_countries || [];
    return coveredCountries.includes(countryCode);
  });
  
  if (countryPlans.length === 0) {
    return null;
  }
  
  // Find the plan with the lowest price
  const lowestPricePlan = countryPlans.reduce((min: any, plan: any) => 
    plan.price.amount_with_tax < min.price.amount_with_tax ? plan : min
  );
  
  return {
    price: lowestPricePlan.price.amount_with_tax / 100, // Convert cents to dollars
    currency: lowestPricePlan.price.currency
  };
};

const CountryCard: React.FC<{country: Country, navigateTo: (route: string) => void, plansData: any}> = ({ country, plansData }) => {
  const countryCode = country.countryCode || country.id.toUpperCase();
  const lowestPrice = getLowestPriceForCountry(countryCode, plansData);
  
  return (
    <a 
        href={`/${country.regionId}/${country.slug}`}
        className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 cursor-pointer hover:shadow-lg hover:border-blue-500 transition-all duration-300 flex items-center block"
    >
        <img src={`https://flagcdn.com/w80/${countryCode.toLowerCase()}.png`} alt={`${country.name} flag`} className="w-10 h-auto rounded-md" />
        <div className="ml-4">
            <h3 className="font-semibold text-gray-900">{country.name}</h3>
            <p className="text-sm text-gray-500">
              Plans from {lowestPrice ? `$${lowestPrice.price.toFixed(2)}` : '$4.99'}
            </p>
        </div>
        <svg className="w-5 h-5 text-gray-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
    </a>
  );
};

const RegionCard: React.FC<{region: Region, navigateTo: (route: string) => void}> = ({ region, navigateTo }) => {
  const { i18n } = useTranslation();
  
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
        <img src={region.imageUrl} alt={region.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-5">
            <h3 className="text-white text-2xl font-bold">{region.name}</h3>
            <p className="text-white/90 mt-1">{region.description}</p>
        </div>
    </a>
  );
};

export default AuthorPage; 