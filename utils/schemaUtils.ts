import { useTranslation } from 'react-i18next';

export interface SchemaOrganization {
  "@context": "https://schema.org";
  "@type": "Organization";
  name: string;
  url: string;
  logo: string;
  contactPoint: {
    "@type": "ContactPoint";
    url: string;
    contactType: string;
    availableLanguage: string[];
  };
  sameAs: string[];
}

export interface SchemaWebPage {
  "@context": "https://schema.org";
  "@type": "WebPage";
  "@id": string;
  url: string;
  name: string;
  description: string;
  inLanguage: string;
  isPartOf: { "@id": string };
  about?: { "@id": string };
  primaryImageOfPage: { "@type": "ImageObject"; url: string };
  breadcrumb?: { "@id": string };
}

export interface SchemaBreadcrumbList {
  "@context": "https://schema.org";
  "@type": "BreadcrumbList";
  "@id": string;
  itemListElement: Array<{
    "@type": "ListItem";
    position: number;
    name: string;
    item: string;
  }>;
}

export interface SchemaProduct {
  "@context": "https://schema.org";
  "@type": "Product";
  "@id": string;
  name: string;
  description: string;
  brand: { "@type": "Brand"; name: string };
  category: string;
  offers: Array<{
    "@type": "Offer";
    sku: string;
    name: string;
    price: string;
    priceCurrency: string;
    availability: string;
    eligibleRegion: { "@id": string };
    itemOffered: { "@id": string };
    url: string;
  }>;
}

export interface SchemaFAQPage {
  "@context": "https://schema.org";
  "@type": "FAQPage";
  "@id": string;
  mainEntity: Array<{
    "@type": "Question";
    name: string;
    acceptedAnswer: { "@type": "Answer"; text: string };
  }>;
}

export interface SchemaArticle {
  "@context": "https://schema.org";
  "@type": "Article" | "BlogPosting";
  "@id": string;
  headline: string;
  description: string;
  author: { "@id": string };
  publisher: { "@id": string };
  datePublished: string;
  dateModified: string;
  image: { "@type": "ImageObject"; url: string };
  mainEntityOfPage: { "@id": string };
  inLanguage: string;
}

export interface SchemaPerson {
  "@context": "https://schema.org";
  "@type": "Person";
  "@id": string;
  name: string;
  jobTitle: string;
  worksFor: { "@id": string };
  sameAs: string[];
  image?: { "@type": "ImageObject"; url: string };
}

export interface SchemaPlace {
  "@context": "https://schema.org";
  "@type": "Place" | "Country";
  "@id": string;
  name: string;
  alternateName?: string;
  sameAs?: string[];
  geo?: {
    "@type": "GeoShape";
    box: string;
  };
}

export interface SchemaWebSite {
  "@context": "https://schema.org";
  "@type": "WebSite";
  "@id": string;
  url: string;
  name: string;
  publisher: { "@id": string };
  inLanguage: string;
}

export interface SchemaAggregateOffer {
  "@context": "https://schema.org";
  "@type": "AggregateOffer";
  "@id": string;
  priceCurrency: string;
  lowPrice: string;
  highPrice: string;
  offerCount: number;
  offers: Array<{ [key: string]: string }>;
}

// Base URL for the website
export const BASE_URL = 'https://travelesim.bg';

// Generate organization schema with proper language support
export const generateOrganizationSchema = (t: any, language: string): SchemaOrganization => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: t('organization.name', 'Travel eSIMple'),
  url: BASE_URL,
  logo: `${BASE_URL}/esim-data/travelesim-logo.png`,
  contactPoint: {
    "@type": "ContactPoint",
    url: 'http://support.travelesim.bg/',
    contactType: t('organization.contact_type', 'Customer Support'),
    availableLanguage: language === 'bg' ? ['Bulgarian', 'English'] : ['English', 'Bulgarian']
  },
  sameAs: [
    'https://travelesim.dk/',
    'https://travelesim.bg/',
    'https://travelesim.ro/',
    'https://www.facebook.com/people/Travelesimdk/61573068836051/',
    'https://www.instagram.com/travelesim.dk/'
  ]
});

// Generate website schema with proper language support
export const generateWebSiteSchema = (t: any, language: string): SchemaWebSite => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  url: BASE_URL,
  name: t('organization.name', 'Travel eSIMple'),
  publisher: { "@id": `${BASE_URL}/#organization` },
  inLanguage: language === 'bg' ? 'bg' : 'en'
});

// Generate webpage schema with proper language support
export const generateWebPageSchema = (
  t: any, 
  language: string, 
  pageUrl: string, 
  title: string, 
  description: string,
  aboutId?: string,
  breadcrumbId?: string
): SchemaWebPage => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${pageUrl}/#webpage`,
  url: pageUrl,
  name: title,
  description: description,
  inLanguage: language === 'bg' ? 'bg' : 'en',
  isPartOf: { "@id": `${BASE_URL}/#website` },
  ...(aboutId && { about: { "@id": aboutId } }),
  primaryImageOfPage: { "@type": "ImageObject", url: `${BASE_URL}/esim-data/travelesim-logo.png` },
  ...(breadcrumbId && { breadcrumb: { "@id": breadcrumbId } })
});

// Generate breadcrumb schema with proper language support
export const generateBreadcrumbSchema = (
  t: any,
  language: string,
  pageUrl: string,
  items: Array<{ name: string; item: string }>
): SchemaBreadcrumbList => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": `${pageUrl}/#breadcrumb`,
  itemListElement: items.map((item, index) => ({
    "@type": 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.item
  }))
});

// Generate product schema with proper language support
export const generateProductSchema = (
  t: any,
  language: string,
  pageUrl: string,
  productName: string,
  productDescription: string,
  offers: Array<{
    "@type": "Offer";
    sku: string;
    name: string;
    price: string;
    priceCurrency: string;
    availability: string;
    eligibleRegion: { "@id": string };
    itemOffered: { "@id": string };
    url: string;
  }>
): SchemaProduct => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": `${pageUrl}/#product`,
  name: productName,
  description: productDescription,
  brand: { "@type": "Brand", name: t('organization.name', 'Travel eSIMple') },
  category: t('product.category', 'eSIM Data Plan'),
  offers: offers
});

// Generate FAQ schema with proper language support
export const generateFAQSchema = (
  t: any,
  language: string,
  pageUrl: string,
  faqItems: Array<{ question: string; answer: string }>
): SchemaFAQPage => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${pageUrl}/#faq`,
  mainEntity: faqItems.map(q => ({
    "@type": "Question",
    name: q.question,
    acceptedAnswer: { "@type": "Answer", text: q.answer }
  }))
});

// Generate article schema with proper language support
export const generateArticleSchema = (
  t: any,
  language: string,
  pageUrl: string,
  headline: string,
  description: string,
  authorId: string,
  datePublished: string,
  dateModified: string,
  imageUrl: string,
  articleType: 'Article' | 'BlogPosting' = 'Article'
): SchemaArticle => ({
  "@context": "https://schema.org",
  "@type": articleType,
  "@id": `${pageUrl}/#article`,
  headline: headline,
  description: description,
  author: { "@id": authorId },
  publisher: { "@id": `${BASE_URL}/#organization` },
  datePublished: datePublished,
  dateModified: dateModified,
  image: { "@type": "ImageObject", url: imageUrl },
  mainEntityOfPage: { "@id": `${pageUrl}/#webpage` },
  inLanguage: language === 'bg' ? 'bg' : 'en'
});

// Generate person schema with proper language support
export const generatePersonSchema = (
  t: any,
  language: string,
  pageUrl: string,
  name: string,
  jobTitle: string,
  worksForId: string,
  sameAs: string[],
  imageUrl?: string
): SchemaPerson => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${pageUrl}/#person`,
  name: name,
  jobTitle: jobTitle,
  worksFor: { "@id": worksForId },
  sameAs: sameAs,
  ...(imageUrl && { image: { "@type": "ImageObject", url: imageUrl } })
});

// Generate place/country schema with proper language support
export const generatePlaceSchema = (
  t: any,
  language: string,
  pageUrl: string,
  name: string,
  placeType: 'Place' | 'Country' = 'Place',
  alternateName?: string,
  sameAs?: string[],
  geoBox?: string
): SchemaPlace => ({
  "@context": "https://schema.org",
  "@type": placeType,
  "@id": `${pageUrl}/#${placeType.toLowerCase()}`,
  name: name,
  ...(alternateName && { alternateName }),
  ...(sameAs && { sameAs }),
  ...(geoBox && { geo: { "@type": "GeoShape", box: geoBox } })
});

// Generate aggregate offer schema with proper language support
export const generateAggregateOfferSchema = (
  t: any,
  language: string,
  pageUrl: string,
  priceCurrency: string,
  lowPrice: string,
  highPrice: string,
  offerCount: number,
  offerIds: string[]
): SchemaAggregateOffer => ({
  "@context": "https://schema.org",
  "@type": "AggregateOffer",
  "@id": `${pageUrl}/#aggregate-offer`,
  priceCurrency: priceCurrency,
  lowPrice: lowPrice,
  highPrice: highPrice,
  offerCount: offerCount,
  offers: offerIds.map(id => ({ "@id": id }))
});

// Helper function to get language code for schema
export const getSchemaLanguageCode = (language: string): string => {
  return language === 'bg' ? 'bg' : 'en';
};

// Helper function to get ISO language code for schema
export const getSchemaISOLanguageCode = (language: string): string => {
  return language === 'bg' ? 'bg' : 'en';
}; 