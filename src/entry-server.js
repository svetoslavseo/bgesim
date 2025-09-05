import React from 'react';
import ReactDOMServer from 'react-dom/server';
import * as HelmetAsync from 'react-helmet-async';
const { HelmetProvider } = HelmetAsync;
import App from '../App.tsx';
import { LanguageProvider } from '../contexts/LanguageContext.tsx';
import { dataService } from '../utils/dataService.ts';
import i18n from '../i18n.ts';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Pre-load all translations for SSR
const loadTranslationsSync = (lang) => {
  const namespaces = ['common', 'navigation', 'home', 'countries', 'faq', 'footer', 'about', 'legal', 'compatibility', 'calculator', 'what_is_esim', 'testimonials', 'checkout', 'cta', 'comparison', 'author', 'content', 'plans', 'esim_info', 'how_it_works', 'author_page', 'regions', 'articles'];
  const translations = {};
  
  for (const ns of namespaces) {
    try {
      // Try multiple robust paths for locales (dev + prod)
      const possiblePaths = [
        // Project-root based
        path.resolve(process.cwd(), `public/locales/${lang}/${ns}.json`),
        path.resolve(process.cwd(), `dist/client/locales/${lang}/${ns}.json`),
        // Relative to this file (src/)
        path.resolve(__dirname, `../public/locales/${lang}/${ns}.json`),
        path.resolve(__dirname, `../dist/client/locales/${lang}/${ns}.json`)
      ];
      
      let filePath = null;
      for (const testPath of possiblePaths) {
        if (fs.existsSync(testPath)) {
          filePath = testPath;
          break;
        }
      }
      
      if (filePath) {
        const data = fs.readFileSync(filePath, 'utf-8');
        translations[ns] = JSON.parse(data);
        console.log(`✅ Loaded translation: ${lang}/${ns}.json from ${filePath}`);
      } else {
        console.warn(`⚠️ Translation file not found for ${lang}/${ns}.json in any of the expected paths`);
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
  console.log(`🔄 Starting SSR render for URL: ${url}`);
  
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
    // Initialize language based on URL for SSR
    const getLanguageFromPath = (pathname) => {
      return pathname.startsWith('/en') ? 'en' : 'bg';
    };
    
    const detectedLanguage = getLanguageFromPath(url);
    console.log(`🌐 Detected language for SSR: ${detectedLanguage}`);
    
    // Load translations synchronously from filesystem
    try {
      console.log('📚 Loading translations for SSR...');
      const translations = loadTranslationsSync(detectedLanguage);
      
      // Reset i18n instance to ensure clean state
      i18n.off('initialized');
      i18n.off('loaded');
      
      // Initialize i18n with minimal configuration for SSR
      await i18n.init({
        lng: detectedLanguage,
        fallbackLng: 'bg',
        debug: false,
        interpolation: {
          escapeValue: false,
        },
        resources: {
          [detectedLanguage]: translations
        },
        ns: Object.keys(translations),
        defaultNS: 'common',
        initImmediate: false,
        react: { useSuspense: false },
        // Disable backend for SSR to use loaded resources
        backend: undefined,
        detection: undefined
      });
      
      // Ensure i18n is ready before proceeding
      await i18n.loadLanguages(detectedLanguage);
      
      // Force change language to ensure it's set
      await i18n.changeLanguage(detectedLanguage);
      
      console.log(`✅ Language set to: ${detectedLanguage}`);
      console.log('✅ All translations loaded successfully');
      console.log(`✅ Available namespaces: ${Object.keys(translations).join(', ')}`);
      
    } catch (error) {
      console.error('❌ Failed to load translations for SSR:', error);
      // Continue with empty translations rather than failing
    }
    
    // Preload data for SSR
    try {
      console.log('📊 Preloading data for SSR...');
      await dataService.getPlansData();
      console.log('✅ Data preloaded successfully');
    } catch (error) {
      console.error('❌ Failed to preload data for SSR:', error);
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
      React.createElement(
        LanguageProvider,
        null,
        React.createElement(App)
      )
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