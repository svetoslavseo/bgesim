
import React from 'react';
import './index.css';
import ReactDOM from 'react-dom/client';
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

ReactDOM.createRoot(rootElement).render(
  process.env.NODE_ENV === 'development' ? (
    <React.StrictMode>{app}</React.StrictMode>
  ) : app
);

// Register service worker for performance optimization
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    // Check if the service worker file exists before registering
    fetch('/sw.js', { method: 'HEAD' })
      .then(() => {
        return navigator.serviceWorker.register('/sw.js');
      })
      .then((registration) => {
        console.log('Service Worker registered successfully:', registration);
      })
      .catch((registrationError) => {
        console.warn('Service Worker registration failed:', registrationError);
      });
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
