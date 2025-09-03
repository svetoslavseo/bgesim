import React from 'react';
import { Helmet } from 'react-helmet-async';
import { BASE_URL } from '../constants';
import i18n from '../i18n';

interface CanonicalTagProps {
    currentRoute: string;
}

/**
 * Adds a self-referencing canonical <link> tag, robots meta tag, and page title to the document head.
 * Works in both SSR and CSR contexts using React Helmet.
 */
const CanonicalTag: React.FC<CanonicalTagProps> = ({ currentRoute }) => {
    // Check if this is an English page
    const isEnglish = currentRoute.startsWith('/en') || i18n.language === 'en';
    
    // Normalize the route to create consistent canonical URLs
    let normalizedRoute = currentRoute;
    
    // Remove /en prefix for canonical URL construction
    if (normalizedRoute.startsWith('/en')) {
        normalizedRoute = normalizedRoute.replace('/en', '');
    }
    
    // Ensure route starts with /
    if (normalizedRoute === '') {
        normalizedRoute = '/';
    } else if (!normalizedRoute.startsWith('/')) {
        normalizedRoute = '/' + normalizedRoute;
    }
    
    // Construct canonical URL with language prefix for English
    const canonicalUrl = isEnglish 
        ? `${BASE_URL.replace(/\/$/, '')}/en${normalizedRoute === '/' ? '' : normalizedRoute}`
        : `${BASE_URL.replace(/\/$/, '')}${normalizedRoute}`;

    return (
        <Helmet>
            <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
            <link rel="canonical" href={canonicalUrl} />
        </Helmet>
    );
};

export default CanonicalTag; 