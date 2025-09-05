
import React from 'react';
import './index.css';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import { LanguageProvider } from './contexts/LanguageContext';
import './i18n';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Create a new root and render the app
// Remove StrictMode in production for better performance
const app = (
  <HelmetProvider>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </HelmetProvider>
);

if (rootElement.hasChildNodes()) {
  hydrateRoot(
    rootElement,
    process.env.NODE_ENV === 'development' ? (
      <React.StrictMode>{app}</React.StrictMode>
    ) : app
  );
} else {
  createRoot(rootElement).render(
    process.env.NODE_ENV === 'development' ? (
      <React.StrictMode>{app}</React.StrictMode>
    ) : app
  );
}

// TEMPORARILY DISABLED: Service Worker registration to fix dev issues
// Service Worker is causing 503 errors in development by intercepting Vite requests
// TODO: Re-enable with proper dev/production guards once issues are resolved

// Force unregister any existing service workers and clear caches
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    console.log('🧹 Cleaning up Service Workers and caches...');
    
    // Unregister all service workers
    navigator.serviceWorker
      .getRegistrations()
      .then((registrations) => {
        console.log(`Found ${registrations.length} service workers to unregister`);
        return Promise.all(
          registrations.map((registration) => {
            console.log('Unregistering SW:', registration.scope);
            return registration.unregister();
          })
        );
      })
      .then(() => {
        console.log('✅ All service workers unregistered');
      })
      .catch((error) => {
        console.warn('Failed to unregister service workers:', error);
      });

    // Clear all caches
    if (window.caches && caches.keys) {
      caches
        .keys()
        .then((cacheNames) => {
          console.log(`Found ${cacheNames.length} caches to clear`);
          return Promise.all(
            cacheNames.map((cacheName) => {
              console.log('Clearing cache:', cacheName);
              return caches.delete(cacheName);
            })
          );
        })
        .then(() => {
          console.log('✅ All caches cleared');
        })
        .catch((error) => {
          console.warn('Failed to clear caches:', error);
        });
    }
  });
}

// Preload critical data for better performance
import { dataService } from './utils/dataService';
if (typeof window !== 'undefined') {
  // Preload critical data after initial render
  setTimeout(() => {
    dataService.preloadCriticalData().catch(console.error);
  }, 100);
}
