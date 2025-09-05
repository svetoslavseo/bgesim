
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';

// Critical pages loaded immediately for SEO and performance
import HomePage from './pages/HomePage';
import CountryPage from './pages/CountryPage';
import RegionPage from './pages/RegionPage';

// Direct imports for SSR - these will be used server-side
import RegionsPageDirect from './pages/RegionsPage';
import AllDestinationsDirect from './pages/AllDestinations';
import AuthorPageDirect from './pages/AuthorPage';
import TermsAndConditionsDirect from './pages/TermsAndConditions';
import NotFoundPageDirect from './pages/NotFoundPage';
import PrivacyPolicyDirect from './pages/PrivacyPolicy';
import RefundPolicyDirect from './pages/RefundPolicy';
import AboutUsDirect from './pages/AboutUs';
import CheckoutPageDirect from './pages/checkout';
import ESIMCompatibilityPageDirect from './pages/ESIMCompatibilityPage';
import DataUsageCalculatorDirect from './pages/DataUsageCalculator';
import WhatIsESIMDirect from './pages/WhatIsESIM';
import ArticlesPageDirect from './pages/articles/ArticlesPage';
import ESIMAdoptionTrendsDirect from './pages/articles/ESIMAdoptionTrends';
import WhatsAppInChinaDirect from './pages/articles/WhatsAppInChina';
import TestLanguagePageDirect from './pages/TestLanguagePage';
import HelpCenterDirect from './pages/HelpCenter';
import SailyDataPlanManagementDirect from './pages/articles/SailyDataPlanManagement';
import PlansAndPaymentsDirect from './pages/PlansAndPayments';
import ESIMvsSIMBgDirect from './pages/articles/ESIMvsSIMBg';
import EIDBgArticleDirect from './pages/articles/EIDBgArticle';
import RoamingInSerbiaDirect from './pages/articles/RoamingInSerbia';

// For SSR, we need to avoid lazy loading completely
// We'll use a different approach - check if we're in SSR environment
const isSSR = typeof window === 'undefined';

// Conditional loading - direct imports for SSR, lazy loading for client
const RegionsPage = isSSR ? RegionsPageDirect : lazy(() => import('./pages/RegionsPage'));
const AllDestinations = isSSR ? AllDestinationsDirect : lazy(() => import('./pages/AllDestinations'));
const AuthorPage = isSSR ? AuthorPageDirect : lazy(() => import('./pages/AuthorPage'));
const TermsAndConditions = isSSR ? TermsAndConditionsDirect : lazy(() => import('./pages/TermsAndConditions'));
const NotFoundPage = isSSR ? NotFoundPageDirect : lazy(() => import('./pages/NotFoundPage'));
const PrivacyPolicy = isSSR ? PrivacyPolicyDirect : lazy(() => import('./pages/PrivacyPolicy'));
const RefundPolicy = isSSR ? RefundPolicyDirect : lazy(() => import('./pages/RefundPolicy'));
const AboutUs = isSSR ? AboutUsDirect : lazy(() => import('./pages/AboutUs'));
const CheckoutPage = isSSR ? CheckoutPageDirect : lazy(() => import('./pages/checkout'));
const ESIMCompatibilityPage = isSSR ? ESIMCompatibilityPageDirect : lazy(() => import('./pages/ESIMCompatibilityPage'));
const DataUsageCalculator = isSSR ? DataUsageCalculatorDirect : lazy(() => import('./pages/DataUsageCalculator'));
const WhatIsESIM = isSSR ? WhatIsESIMDirect : lazy(() => import('./pages/WhatIsESIM'));
const ArticlesPage = isSSR ? ArticlesPageDirect : lazy(() => import('./pages/articles/ArticlesPage'));
const ESIMAdoptionTrends = isSSR ? ESIMAdoptionTrendsDirect : lazy(() => import('./pages/articles/ESIMAdoptionTrends'));
const WhatsAppInChina = isSSR ? WhatsAppInChinaDirect : lazy(() => import('./pages/articles/WhatsAppInChina'));
const TestLanguagePage = isSSR ? TestLanguagePageDirect : lazy(() => import('./pages/TestLanguagePage'));
const HelpCenter = isSSR ? HelpCenterDirect : lazy(() => import('./pages/HelpCenter'));
const SailyDataPlanManagement = isSSR ? SailyDataPlanManagementDirect : lazy(() => import('./pages/articles/SailyDataPlanManagement'));
const PlansAndPayments = isSSR ? PlansAndPaymentsDirect : lazy(() => import('./pages/PlansAndPayments'));
const ESIMvsSIMBg = isSSR ? ESIMvsSIMBgDirect : lazy(() => import('./pages/articles/ESIMvsSIMBg'));
const EIDBgArticle = isSSR ? EIDBgArticleDirect : lazy(() => import('./pages/articles/EIDBgArticle'));
const RoamingInSerbia = isSSR ? RoamingInSerbiaDirect : lazy(() => import('./pages/articles/RoamingInSerbia'));


import Header from './components/Header';
import Footer from './components/Footer';
// ChineseAnalytics removed - no longer needed
import ErrorBoundary from './components/ErrorBoundary';
import { COUNTRIES, REGIONS } from './constants';
import CanonicalTag from './components/CanonicalTag';
import StableSkeleton from './components/StableSkeleton';
// Removed LanguageProvider usage here; providers are applied at the app entry level

type Route = string;
// e.g., '/', '/europe', '/united-kingdom', '/france', etc.


// Loading component for lazy loaded pages
const PageLoader: React.FC = () => (
    <div className="min-h-screen">
        <StableSkeleton type="hero" />
        <div className="container mx-auto px-4 py-8">
            <StableSkeleton type="grid" count={3} />
        </div>
    </div>
);

const App: React.FC = () => {
    const { i18n } = useTranslation();
    
    // Language detection from URL - Updated for Bulgarian/English
    const getLanguageFromPath = (pathname: string): string => {
        if (pathname.startsWith('/en')) return 'en';
        return 'bg'; // Default to Bulgarian for root paths
    };


    // Function to convert internal route to URL with proper language prefix
    const getUrlWithLanguage = (internalRoute: string, language: string): string => {
        if (language === 'en') {
            return `/en${internalRoute}`;
        }
        // Bulgarian (default language) - no prefix needed
        return internalRoute;
    };

    // Function to convert URL to internal route
    const getInternalRouteFromUrl = (url: string): Route => {
        const lang = getLanguageFromPath(url);
        if (lang === 'en') {
            // Remove /en prefix
            let internalRoute = url.replace('/en', '');
            if (internalRoute === '') internalRoute = '/';
            return internalRoute;
        }
        // Bulgarian (default language) - no prefix needed
        return url;
    };

    // Initialize route from URL on component mount or use current pathname for SSR
    const getInitialRoute = (): Route => {
        if (typeof window !== 'undefined') {
            const path = window.location.pathname;
            return getInternalRouteFromUrl(path);
        }
        // For SSR, get the route from the global window mock
        const path = globalThis.window?.location?.pathname || '/';
        return getInternalRouteFromUrl(path);
    };

    // Initialize language for SSR
    const getInitialLanguage = (): string => {
        if (typeof window !== 'undefined') {
            // Check if server provided initial language
            const serverLanguage = (window as any).__INITIAL_LANGUAGE__;
            if (serverLanguage) {
                return serverLanguage;
            }
            // Fallback to path-based detection
            const path = window.location.pathname;
            return getLanguageFromPath(path);
        }
        // For SSR, get the language from the global window mock
        const path = globalThis.window?.location?.pathname || '/';
        return getLanguageFromPath(path);
    };

    // Set language for SSR if not already set (client-side only)
    const initialLanguage = getInitialLanguage();
    if (typeof window !== 'undefined' && i18n.language !== initialLanguage) {
        // Use a timeout to ensure i18n is ready
        setTimeout(() => {
            i18n.changeLanguage(initialLanguage);
        }, 0);
    }

    const [route, setRoute] = useState<Route>(getInitialRoute());

    // Note: Individual pages (CountryPage, RegionPage, HomePage) load their own data
    // App component doesn't need to load plans data globally to avoid duplication

    // Initialize route from URL on component mount (client-side only)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const path = window.location.pathname;
            const lang = getLanguageFromPath(path);
            const internalRoute = getInternalRouteFromUrl(path);
            setRoute(internalRoute);
            
            // Set language in i18n and wait for it to be ready
            if (lang !== i18n.language) {
                i18n.changeLanguage(lang).then(() => {
                    console.log(`Client-side language changed to: ${lang}`);
                });
            }
        }
    }, [i18n]);

    const navigateTo = (newRoute: Route) => {
        setRoute(newRoute);
        // Update browser URL with language prefix (client-side only)
        if (typeof window !== 'undefined') {
            const currentLang = i18n.language;
            const urlWithLang = getUrlWithLanguage(newRoute, currentLang);
            window.history.pushState({}, '', urlWithLang);
            window.scrollTo(0, 0); // Scroll to top on page change
        }
    };

    // Handle browser back/forward buttons (client-side only)
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handlePopState = () => {
            const path = window.location.pathname;
            const lang = getLanguageFromPath(path);
            const internalRoute = getInternalRouteFromUrl(path);
            setRoute(internalRoute);
            
            // Update language if changed
            if (lang !== i18n.language) {
                i18n.changeLanguage(lang).then(() => {
                    console.log(`Client-side language changed to: ${lang} (popstate)`);
                });
            }
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);







    const renderPage = () => {
        const path = route.replace(/^\/+/, '');
        const segments = path.split('/');

        // Wrap lazy-loaded components in Suspense only on client-side
        const withSuspense = (Component: React.ReactElement) => {
            if (!isSSR) {
                return (
                    <Suspense fallback={<PageLoader />}>
                        {Component}
                    </Suspense>
                );
            }
            return Component;
        };

        if (route === '/checkout' || route.startsWith('/checkout?')) {
            return withSuspense(<CheckoutPage />);
        }

        // Handle English checkout route: /en/checkout
        if (route === '/en/checkout' || route.startsWith('/en/checkout?')) {
            return withSuspense(<CheckoutPage />);
        }

        if (route === '/regions') {
            return withSuspense(
                <ErrorBoundary>
                    <RegionsPage navigateTo={navigateTo} />
                </ErrorBoundary>
            );
        }

        // Handle English regions route: /en/regions
        if (route === '/en/regions') {
            return withSuspense(
                <ErrorBoundary>
                    <RegionsPage navigateTo={navigateTo} />
                </ErrorBoundary>
            );
        }

        if (route === '/all-destinations') {
            return withSuspense(<AllDestinations navigateTo={navigateTo} />);
        }

        // Handle English all-destinations route: /en/all-destinations
        if (route === '/en/all-destinations') {
            return withSuspense(<AllDestinations navigateTo={navigateTo} />);
        }

        if (route === '/terms-and-conditions') {
            return withSuspense(<TermsAndConditions navigateTo={navigateTo} />);
        }

        // Handle English terms-and-conditions route: /en/terms-and-conditions
        if (route === '/en/terms-and-conditions') {
            return withSuspense(<TermsAndConditions navigateTo={navigateTo} />);
        }

        if (route === '/privacy-policy') {
            return withSuspense(<PrivacyPolicy navigateTo={navigateTo} />);
        }

        // Handle English privacy-policy route: /en/privacy-policy
        if (route === '/en/privacy-policy') {
            return withSuspense(<PrivacyPolicy navigateTo={navigateTo} />);
        }

        if (route === '/refund-policy') {
            return withSuspense(<RefundPolicy navigateTo={navigateTo} />);
        }

        // Handle English refund-policy route: /en/refund-policy
        if (route === '/en/refund-policy') {
            return withSuspense(<RefundPolicy navigateTo={navigateTo} />);
        }

        if (route === '/about-us') {
            return withSuspense(<AboutUs navigateTo={navigateTo} />);
        }

        // Handle English about-us route: /en/about-us
        if (route === '/en/about-us') {
            return withSuspense(<AboutUs navigateTo={navigateTo} />);
        }

        if (route === '/esim-compatibility') {
            return withSuspense(<ESIMCompatibilityPage navigateTo={navigateTo} />);
        }

        // Handle English esim-compatibility route: /en/esim-compatibility
        if (route === '/en/esim-compatibility') {
            return withSuspense(<ESIMCompatibilityPage navigateTo={navigateTo} />);
        }

        if (route === '/data-usage-calculator') {
            return withSuspense(<DataUsageCalculator navigateTo={navigateTo} />);
        }

        // Handle English data-usage-calculator route: /en/data-usage-calculator
        if (route === '/en/data-usage-calculator') {
            return withSuspense(<DataUsageCalculator navigateTo={navigateTo} />);
        }

        if (route === '/what-is-esim') {
            return withSuspense(<WhatIsESIM />);
        }

        // Handle English what-is-esim route: /en/what-is-esim
        if (route === '/en/what-is-esim') {
            return withSuspense(<WhatIsESIM />);
        }

        if (route === '/help-center') {
            return withSuspense(<HelpCenter navigateTo={navigateTo} />);
        }
        if (route === '/help-center/plans-and-payments') {
            return withSuspense(<PlansAndPayments navigateTo={navigateTo} />);
        }

        // Handle English routes: /en/{page}
        if (segments.length === 2 && segments[0] === 'en') {
            const pageSlug = segments[1];
            if (pageSlug === 'help-center') {
                return withSuspense(<HelpCenter navigateTo={navigateTo} />);
            }
        }

        // Handle English help center routes: /en/help-center/{page}
        if (segments.length === 3 && segments[0] === 'en' && segments[1] === 'help-center') {
            const helpCenterPage = segments[2];
            if (helpCenterPage === 'plans-and-payments') {
                return withSuspense(<PlansAndPayments navigateTo={navigateTo} />);
            }
        }
        // Handle English help center article routes: /help-center/articles/{slug}
        if (segments.length === 3 && segments[0] === 'help-center' && segments[1] === 'articles') {
            const articleSlug = segments[2];
            if (articleSlug === 'saily-data-plan-management') {
                return withSuspense(<SailyDataPlanManagement navigateTo={navigateTo} />);
            }
        }

        // Handle English help center article routes: /en/help-center/articles/{slug}
        if (segments.length === 4 && segments[0] === 'en' && segments[1] === 'help-center' && segments[2] === 'articles') {
            const articleSlug = segments[3];
            if (articleSlug === 'saily-data-plan-management') {
                return withSuspense(<SailyDataPlanManagement navigateTo={navigateTo} />);
            }
        }

        if (route === '/test-language') {
            return withSuspense(<TestLanguagePage />);
        }

        // Handle English routes: /en/{page}
        if (segments.length === 2 && segments[0] === 'en') {
            const pageSlug = segments[1];
            if (pageSlug === 'test-language') {
                return withSuspense(<TestLanguagePage />);
            }
        }



        // Check if it's an author route
        if (route === '/author/vasil-andreev') {
            return withSuspense(<AuthorPage navigateTo={navigateTo} />);
        }

        // Handle English author route: /en/author/{slug}
        if (segments.length === 3 && segments[0] === 'en' && segments[1] === 'author') {
            const authorSlug = segments[2];
            if (authorSlug === 'vasil-andreev') {
                return withSuspense(<AuthorPage navigateTo={navigateTo} />);
            }
        }

        // Handle articles routes
        if (route === '/articles') {
            return withSuspense(<ArticlesPage navigateTo={navigateTo} />);
        }

        // Handle English articles route: /en/articles
        if (route === '/en/articles') {
            return withSuspense(<ArticlesPage navigateTo={navigateTo} />);
        }
        
        // Explicitly handle /articles/ with trailing slash to return 404
        if (route === '/articles/') {
            return withSuspense(<NotFoundPage navigateTo={navigateTo} />);
        }

        // Handle individual article routes: /articles/{slug}
        if (segments.length === 2 && segments[0] === 'articles') {
            const articleSlug = segments[1];
            if (articleSlug === 'what-is-esim') {
                return withSuspense(<WhatIsESIM />);
            }
            if (articleSlug === 'esim-adoption-trends') {
                return withSuspense(<ESIMAdoptionTrends />);
            }
            if (articleSlug === 'whatsapp-in-china') {
                return withSuspense(<WhatsAppInChina />);
            }
            if (articleSlug === 'kakvo-e-eid-nomer-kak-da-go-odkrijete') {
                return withSuspense(<EIDBgArticle />);
            }
            if (articleSlug === 'esim-ili-sim-karta-koja-e-po-podhodascha') {
                return withSuspense(<ESIMvsSIMBg />);
            }
            if (articleSlug === 'roaming-v-sarbia-pualno-rakovodstvo') {
                return withSuspense(<RoamingInSerbia />);
            }
            return withSuspense(<NotFoundPage navigateTo={navigateTo} />);
        }

        // Handle English individual article routes: /en/articles/{slug}
        if (segments.length === 3 && segments[0] === 'en' && segments[1] === 'articles') {
            const articleSlug = segments[2];
            if (articleSlug === 'what-is-esim') {
                return withSuspense(<WhatIsESIM />);
            }
            if (articleSlug === 'esim-adoption-trends') {
                return withSuspense(<ESIMAdoptionTrends />);
            }
            if (articleSlug === 'whatsapp-in-china') {
                return withSuspense(<WhatsAppInChina />);
            }
            if (articleSlug === 'kakvo-e-eid-nomer-kak-da-go-odkrijete') {
                return withSuspense(<EIDBgArticle />);
            }
            if (articleSlug === 'esim-ili-sim-karta-koja-e-po-podhodascha') {
                return withSuspense(<ESIMvsSIMBg />);
            }
            if (articleSlug === 'roaming-v-sarbia-pualno-rakovodstvo') {
                return withSuspense(<RoamingInSerbia />);
            }
            return withSuspense(<NotFoundPage navigateTo={navigateTo} />);
        }

        // Chinese article routes removed - no longer supported

        // Chinese legal page routes removed - no longer supported

        // Chinese help center routes removed - no longer supported

        // Chinese help center article routes removed - no longer supported

        if (segments.length === 0 || segments[0] === '') {
            return <HomePage navigateTo={navigateTo} />;
        }

        const firstSegment = segments[0];
        const secondSegment = segments[1];

        // Handle country routes: /{region}/{country-slug} - Check this FIRST
        if (segments.length === 2) {
            const regionSlug = firstSegment;
            const countrySlug = secondSegment;
            // Find country by slug
            const country = COUNTRIES.find(c => c.slug === countrySlug);
            if (country && country.regionId === regionSlug) {
                return <CountryPage countryId={country.id} navigateTo={navigateTo} />;
            }
        }

        // Handle region routes: /{regionId} - Check this AFTER country routes
        if (segments.length === 1) {
            const regionId = firstSegment;
            if (REGIONS.some((r: {id: string}) => r.id === regionId)) {
                return (
                    <ErrorBoundary>
                        <RegionPage regionId={regionId} navigateTo={navigateTo} />
                    </ErrorBoundary>
                );
            }
        }

        // Handle English country routes: /en/{region}/{country-slug}
        if (segments.length === 3 && segments[0] === 'en') {
            const regionSlug = segments[1];
            const countrySlug = segments[2];
            // Find country by slug
            const country = COUNTRIES.find(c => c.slug === countrySlug);
            if (country && country.regionId === regionSlug) {
                return <CountryPage countryId={country.id} navigateTo={navigateTo} />;
            }
        }

        // Handle English region routes: /en/{regionId}
        if (segments.length === 2 && segments[0] === 'en') {
            const regionId = segments[1];
            if (REGIONS.some((r: {id: string}) => r.id === regionId)) {
                return (
                    <ErrorBoundary>
                        <RegionPage regionId={regionId} navigateTo={navigateTo} />
                    </ErrorBoundary>
                );
            }
        }

        // Not found
        return withSuspense(<NotFoundPage navigateTo={navigateTo} />);
    };

    return (
        <>
            <CanonicalTag currentRoute={route} />
            <div className="min-h-screen flex flex-col font-sans">
                <Header navigateTo={navigateTo} />
                <main className="flex-grow">
                    {renderPage()}
                </main>
                <Footer navigateTo={navigateTo}/>
            </div>
        </>
    );
};

export default App;