import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
// Removed LanguageProvider usage here; providers are applied at the app entry level

// Direct imports for SSR - no lazy loading
import HomePage from './pages/HomePage';
import CountryPage from './pages/CountryPage';
import RegionPage from './pages/RegionPage';
import RegionsPage from './pages/RegionsPage';
import AllDestinations from './pages/AllDestinations';
import AuthorPage from './pages/AuthorPage';
import TermsAndConditions from './pages/TermsAndConditions';
import NotFoundPage from './pages/NotFoundPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundPolicy from './pages/RefundPolicy';
import AboutUs from './pages/AboutUs';
import CheckoutPage from './pages/checkout';
import ESIMCompatibilityPage from './pages/ESIMCompatibilityPage';
import DataUsageCalculator from './pages/DataUsageCalculator';
import WhatIsESIM from './pages/WhatIsESIM';
import ArticlesPage from './pages/articles/ArticlesPage';
import ESIMAdoptionTrends from './pages/articles/ESIMAdoptionTrends';
import WhatsAppInChina from './pages/articles/WhatsAppInChina';
import TestLanguagePage from './pages/TestLanguagePage';
import HelpCenter from './pages/HelpCenter';
import SailyDataPlanManagement from './pages/articles/SailyDataPlanManagement';
import PlansAndPayments from './pages/PlansAndPayments';
import ESIMvsSIMBg from './pages/articles/ESIMvsSIMBg';
import EIDBgArticle from './pages/articles/EIDBgArticle';
import RoamingInSerbia from './pages/articles/RoamingInSerbia';

import Header from './components/Header';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import { COUNTRIES, REGIONS } from './constants';
import CanonicalTag from './components/CanonicalTag';

type Route = string;

const App: React.FC = () => {
    const { i18n } = useTranslation();
    
    // Language detection from URL - Updated for Bulgarian/English
    const getLanguageFromPath = (pathname: string): string => {
        if (pathname.startsWith('/en')) return 'en';
        return 'bg'; // Default to Bulgarian for root paths
    };

    // Function to get region for a country
    const getRegionForCountry = (countrySlug: string): string | null => {
        const country = COUNTRIES.find(c => c.slug === countrySlug);
        return country ? country.regionId : null;
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
        i18n.changeLanguage(initialLanguage);
    }

    const [route, setRoute] = useState<Route>(getInitialRoute());

    // Initialize route from URL on component mount (client-side only)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const path = window.location.pathname;
            const lang = getLanguageFromPath(path);
            const internalRoute = getInternalRouteFromUrl(path);
            setRoute(internalRoute);
            
            // Set language in i18n
            if (lang !== i18n.language) {
                i18n.changeLanguage(lang);
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
                i18n.changeLanguage(lang);
            }
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    const renderPage = () => {
        const path = route.replace(/^\/+/, '');
        const segments = path.split('/');

        if (route === '/checkout' || route.startsWith('/checkout?')) {
            return <CheckoutPage />;
        }

        // Handle English checkout route: /en/checkout
        if (route === '/en/checkout' || route.startsWith('/en/checkout?')) {
            return <CheckoutPage />;
        }

        if (route === '/regions') {
            return (
                <ErrorBoundary>
                    <RegionsPage navigateTo={navigateTo} />
                </ErrorBoundary>
            );
        }

        // Handle English regions route: /en/regions
        if (route === '/en/regions') {
            return (
                <ErrorBoundary>
                    <RegionsPage navigateTo={navigateTo} />
                </ErrorBoundary>
            );
        }

        if (route === '/all-destinations') {
            return <AllDestinations navigateTo={navigateTo} />;
        }

        // Handle English all-destinations route: /en/all-destinations
        if (route === '/en/all-destinations') {
            return <AllDestinations navigateTo={navigateTo} />;
        }

        if (route === '/terms-and-conditions') {
            return <TermsAndConditions navigateTo={navigateTo} />;
        }

        // Handle English terms-and-conditions route: /en/terms-and-conditions
        if (route === '/en/terms-and-conditions') {
            return <TermsAndConditions navigateTo={navigateTo} />;
        }

        if (route === '/privacy-policy') {
            return <PrivacyPolicy navigateTo={navigateTo} />;
        }

        // Handle English privacy-policy route: /en/privacy-policy
        if (route === '/en/privacy-policy') {
            return <PrivacyPolicy navigateTo={navigateTo} />;
        }

        if (route === '/refund-policy') {
            return <RefundPolicy navigateTo={navigateTo} />;
        }

        // Handle English refund-policy route: /en/refund-policy
        if (route === '/en/refund-policy') {
            return <RefundPolicy navigateTo={navigateTo} />;
        }

        if (route === '/about-us') {
            return <AboutUs navigateTo={navigateTo} />;
        }

        // Handle English about-us route: /en/about-us
        if (route === '/en/about-us') {
            return <AboutUs navigateTo={navigateTo} />;
        }

        if (route === '/esim-compatibility') {
            return <ESIMCompatibilityPage navigateTo={navigateTo} />;
        }

        // Handle English esim-compatibility route: /en/esim-compatibility
        if (route === '/en/esim-compatibility') {
            return <ESIMCompatibilityPage navigateTo={navigateTo} />;
        }

        if (route === '/data-usage-calculator') {
            return <DataUsageCalculator navigateTo={navigateTo} />;
        }

        // Handle English data-usage-calculator route: /en/data-usage-calculator
        if (route === '/en/data-usage-calculator') {
            return <DataUsageCalculator navigateTo={navigateTo} />;
        }

        if (route === '/what-is-esim') {
            return <WhatIsESIM />;
        }

        // Handle English what-is-esim route: /en/what-is-esim
        if (route === '/en/what-is-esim') {
            return <WhatIsESIM />;
        }

        if (route === '/help-center') {
            return <HelpCenter navigateTo={navigateTo} />;
        }
        if (route === '/help-center/plans-and-payments') {
            return <PlansAndPayments navigateTo={navigateTo} />;
        }

        // Handle English routes: /en/{page}
        if (segments.length === 2 && segments[0] === 'en') {
            const pageSlug = segments[1];
            if (pageSlug === 'help-center') {
                return <HelpCenter navigateTo={navigateTo} />;
            }
        }

        // Handle English help center routes: /en/help-center/{page}
        if (segments.length === 3 && segments[0] === 'en' && segments[1] === 'help-center') {
            const helpCenterPage = segments[2];
            if (helpCenterPage === 'plans-and-payments') {
                return <PlansAndPayments navigateTo={navigateTo} />;
            }
        }
        // Handle English help center article routes: /help-center/articles/{slug}
        if (segments.length === 3 && segments[0] === 'help-center' && segments[1] === 'articles') {
            const articleSlug = segments[2];
            if (articleSlug === 'saily-data-plan-management') {
                return <SailyDataPlanManagement navigateTo={navigateTo} />;
            }
        }

        // Handle English help center article routes: /en/help-center/articles/{slug}
        if (segments.length === 4 && segments[0] === 'en' && segments[1] === 'help-center' && segments[2] === 'articles') {
            const articleSlug = segments[3];
            if (articleSlug === 'saily-data-plan-management') {
                return <SailyDataPlanManagement navigateTo={navigateTo} />;
            }
        }

        if (route === '/test-language') {
            return <TestLanguagePage />;
        }

        // Handle English routes: /en/{page}
        if (segments.length === 2 && segments[0] === 'en') {
            const pageSlug = segments[1];
            if (pageSlug === 'test-language') {
                return <TestLanguagePage />;
            }
        }

        // Check if it's an author route
        if (route === '/author/vasil-andreev') {
            return <AuthorPage navigateTo={navigateTo} />;
        }

        // Handle English author route: /en/author/{slug}
        if (segments.length === 3 && segments[0] === 'en' && segments[1] === 'author') {
            const authorSlug = segments[2];
            if (authorSlug === 'vasil-andreev') {
                return <AuthorPage navigateTo={navigateTo} />;
            }
        }

        // Handle articles routes
        if (route === '/articles') {
            return <ArticlesPage navigateTo={navigateTo} />;
        }

        // Handle English articles route: /en/articles
        if (route === '/en/articles') {
            return <ArticlesPage navigateTo={navigateTo} />;
        }
        
        // Explicitly handle /articles/ with trailing slash to return 404
        if (route === '/articles/') {
            return <NotFoundPage navigateTo={navigateTo} />;
        }

        // Handle individual article routes: /articles/{slug}
        if (segments.length === 2 && segments[0] === 'articles') {
            const articleSlug = segments[1];
            if (articleSlug === 'what-is-esim') {
                return <WhatIsESIM />;
            }
            if (articleSlug === 'esim-adoption-trends') {
                return <ESIMAdoptionTrends />;
            }
            if (articleSlug === 'whatsapp-in-china') {
                return <WhatsAppInChina />;
            }
            if (articleSlug === 'kakvo-e-eid-nomer-kak-da-go-odkrijete') {
                return <EIDBgArticle />;
            }
            if (articleSlug === 'esim-ili-sim-karta-koja-e-po-podhodascha') {
                return <ESIMvsSIMBg />;
            }
            if (articleSlug === 'roaming-v-sarbia-pualno-rakovodstvo') {
                return <RoamingInSerbia />;
            }
            return <NotFoundPage navigateTo={navigateTo} />;
        }

        // Handle English individual article routes: /en/articles/{slug}
        if (segments.length === 3 && segments[0] === 'en' && segments[1] === 'articles') {
            const articleSlug = segments[2];
            if (articleSlug === 'what-is-esim') {
                return <WhatIsESIM />;
            }
            if (articleSlug === 'esim-adoption-trends') {
                return <ESIMAdoptionTrends />;
            }
            if (articleSlug === 'whatsapp-in-china') {
                return <WhatsAppInChina />;
            }
            if (articleSlug === 'kakvo-e-eid-nomer-kak-da-go-odkrijete') {
                return <EIDBgArticle />;
            }
            if (articleSlug === 'esim-ili-sim-karta-koja-e-po-podhodascha') {
                return <ESIMvsSIMBg />;
            }
            if (articleSlug === 'roaming-v-sarbia-pualno-rakovodstvo') {
                return <RoamingInSerbia />;
            }
            return <NotFoundPage navigateTo={navigateTo} />;
        }

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
        return <NotFoundPage navigateTo={navigateTo} />;
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
