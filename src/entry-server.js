import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import App from '../App';
import { dataService } from '../utils/dataService';
import i18n from '../i18n';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Pre-load all translations for SSR
const loadTranslationsSync = (lang) => {
  const namespaces = ['common', 'navigation', 'home', 'countries', 'faq', 'footer', 'about', 'legal', 'compatibility', 'calculator', 'what_is_esim', 'testimonials', 'checkout', 'cta', 'comparison', 'author', 'content', 'plans', 'esim_info', 'how_it_works', 'author_page', 'regions'];
  const translations = {};
  
  for (const ns of namespaces) {
    try {
      // Correctly locate the locales folder within the build output directory
      const filePath = path.resolve(__dirname, `../client/locales/${lang}/${ns}.json`);
      
      if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf-8');
        translations[ns] = JSON.parse(data);
      } else {
        console.warn(`⚠️ Translation file not found at production path: ${filePath}`);
        translations[ns] = {}; // Provide an empty fallback
      }
    } catch (error) {
      console.error(`❌ Failed to load or parse ${lang}/${ns}.json:`, error);
      translations[ns] = {}; // Fallback in case of error
    }
  }
  
  return translations;
};

export async function render(url) {
  // Build fresh mocks for DOM globals on every SSR request
  globalThis.window = {
    location: { 
      pathname: url, 
      search: '', 
      hash: '',
      href: `http://localhost:3000${url}`,
      hostname: 'localhost',
      port: '3000',
      protocol: 'http:'
    },
    history: {
      pushState: () => {},
      replaceState: () => {},
      back: () => {},
      forward: () => {},
      go: () => {}
    },
    addEventListener: () => {},
    removeEventListener: () => {},
    scrollTo: () => {},
    innerWidth: 1024,
    innerHeight: 768,
    matchMedia: () => ({ matches: false, addListener: () => {}, removeListener: () => {} })
  };

  if (typeof document === 'undefined') {
    globalThis.document = {
      createElement: () => ({
        style: {},
        setAttribute: () => {},
        addEventListener: () => {}
      }),
      getElementById: () => null,
      querySelector: () => null,
      querySelectorAll: () => [],
      addEventListener: () => {},
      removeEventListener: () => {},
      body: {
        appendChild: () => {},
        removeChild: () => {},
        style: {}
      },
      documentElement: {
        style: {}
      }
    };
  }

  if (typeof localStorage === 'undefined') {
    globalThis.localStorage = {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
      clear: () => {},
      key: () => null,
      length: 0
    };
  }

  if (typeof sessionStorage === 'undefined') {
    globalThis.sessionStorage = {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
      clear: () => {},
      key: () => null,
      length: 0
    };
  }

  // Add timeout to prevent hanging requests
  const renderWithTimeout = async () => {
    console.log(`🔄 Starting SSR render for URL: ${url}`);
    
    // Initialize language based on URL for SSR
    const getLanguageFromPath = (pathname) => {
      return pathname.startsWith('/zh') ? 'zh' : 'en';
    };
    
    const detectedLanguage = getLanguageFromPath(url);
    console.log(`🌐 Detected language for SSR: ${detectedLanguage}`);
    
    // Load translations synchronously from filesystem
    try {
      console.log('📚 Loading translations for SSR...');
      const translations = loadTranslationsSync(detectedLanguage);
      
      // Reinitialize i18n with the loaded translations to ensure they're available
      await i18n.init({
        lng: detectedLanguage,
        fallbackLng: 'en',
        debug: false,
        interpolation: {
          escapeValue: false,
        },
        resources: {
          [detectedLanguage]: translations
        },
        ns: Object.keys(translations),
        defaultNS: 'common'
      });
      
      console.log(`✅ Language set to: ${detectedLanguage}`);
      console.log('✅ All translations loaded successfully');
      
      // Verify that translations are working
      const testTranslation = i18n.t('esim_for_country', { ns: 'countries', country: 'Test' });
      console.log(`🧪 Test translation: ${testTranslation}`);
      
      // Test region translation specifically
      const regionTest = i18n.t('regions.europe', { ns: 'countries' });
      console.log(`🧪 Region test translation: ${regionTest}`);
      
      // Test meta translation
      const metaTest = i18n.t('meta.title_fallback', { ns: 'countries', country: 'Spain' });
      console.log(`🧪 Meta test translation: ${metaTest}`);
      
    } catch (error) {
      console.error('❌ Failed to load translations for SSR:', error);
    }
    
    // Preload data for SSR
    if (typeof window === 'undefined') {
      try {
        console.log('📊 Preloading data for SSR...');
        await dataService.getPlansData();
        console.log('✅ Data preloaded successfully');
      } catch (error) {
        console.error('❌ Failed to preload data for SSR:', error);
      }
    }

    const helmetContext = {};
    
    // Ensure the window mock is properly set before rendering
    if (globalThis.window) {
      globalThis.window.location.pathname = url;
    }
    
    console.log('🎨 Rendering React app...');
    const appElement = React.createElement(
      HelmetProvider, 
      { context: helmetContext }, 
      React.createElement(App)
    );
    
    const appHtml = ReactDOMServer.renderToString(appElement);
    console.log(`✅ SSR render completed. HTML length: ${appHtml.length}`);
    
    return { 
      appHtml, 
      helmet: helmetContext.helmet 
    };
  };

  try {
    // Set a 30-second timeout for SSR rendering
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('SSR render timeout after 30 seconds')), 30000);
    });

    const result = await Promise.race([renderWithTimeout(), timeoutPromise]);
    return result;
  } catch (error) {
    console.error('❌ Error rendering app:', error);
    console.error('Stack trace:', error.stack);
    return { 
      // Render a minimal visible shell so the browser still paints and the client can hydrate
      appHtml: '<div id="ssr-fallback" style="min-height:60vh;display:flex;align-items:center;justify-content:center;color:#555;font-family:Inter,system-ui,sans-serif">Loading…</div>', 
      helmet: null 
    };
  }
} 