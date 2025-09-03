// Service Worker for caching and performance optimization
const CACHE_NAME = 'esim-website-v1';
const DATA_CACHE_NAME = 'esim-data-v1';

// Assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/favicon.png',
  '/esim-data/travelesim-logo.png',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Service Worker: Caching static assets');
      return cache.addAll(STATIC_ASSETS);
    }).catch(error => {
      console.error('Service Worker: Failed to cache static assets:', error);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== DATA_CACHE_NAME) {
            console.log('Service Worker: Removing old cache', cacheName);
            return caches.delete(cacheName);
          }
        }).filter(Boolean) // Filter out undefined values
      );
    }).catch(error => {
      console.error('Service Worker: Failed to clean up old caches:', error);
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache when possible
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Handle API/data requests with network-first strategy
  if (url.pathname.includes('/data/') || url.pathname.includes('.json')) {
    event.respondWith(
      caches.open(DATA_CACHE_NAME).then((cache) => {
        return fetch(request)
          .then((response) => {
            // If successful, update cache
            if (response.status === 200) {
              // Clone the response before caching
              const responseToCache = response.clone();
              cache.put(request, responseToCache).catch(error => {
                console.error('Service Worker: Failed to cache response:', error);
              });
            }
            return response;
          })
          .catch(() => {
            // If network fails, try cache
            return cache.match(request).then(cachedResponse => {
              if (cachedResponse) {
                return cachedResponse;
              }
              // Return a proper error response if no cache
              return new Response('Data not available', {
                status: 503,
                statusText: 'Service Unavailable'
              });
            });
          });
      }).catch(error => {
        console.error('Service Worker: Failed to handle data request:', error);
        return new Response('Service Worker Error', {
          status: 500,
          statusText: 'Internal Server Error'
        });
      })
    );
    return;
  }

  // Handle static assets with cache-first strategy
  if (
    url.pathname.includes('/assets/') ||
    url.pathname.includes('/esim-data/') ||
    url.pathname.includes('.png') ||
    url.pathname.includes('.jpg') ||
    url.pathname.includes('.svg')
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(request).then((response) => {
          // Cache successful responses
          if (response.status === 200) {
            return caches.open(CACHE_NAME).then((cache) => {
              const responseToCache = response.clone();
              cache.put(request, responseToCache).catch(error => {
                console.error('Service Worker: Failed to cache static asset:', error);
              });
              return response;
            });
          }
          return response;
        }).catch(error => {
          console.error('Service Worker: Failed to fetch static asset:', error);
          return new Response('Asset not available', {
            status: 503,
            statusText: 'Service Unavailable'
          });
        });
      }).catch(error => {
        console.error('Service Worker: Failed to handle static asset request:', error);
        return new Response('Service Worker Error', {
          status: 500,
          statusText: 'Internal Server Error'
        });
      })
    );
    return;
  }

  // Handle flag images from flagcdn.com with cache
  if (url.hostname === 'flagcdn.com') {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(request).then((response) => {
          if (response.status === 200) {
            return caches.open(CACHE_NAME).then((cache) => {
              const responseToCache = response.clone();
              cache.put(request, responseToCache).catch(error => {
                console.error('Service Worker: Failed to cache flag image:', error);
              });
              return response;
            });
          }
          return response;
        }).catch(error => {
          console.error('Service Worker: Failed to fetch flag image:', error);
          return new Response('Flag image not available', {
            status: 503,
            statusText: 'Service Unavailable'
          });
        });
      }).catch(error => {
        console.error('Service Worker: Failed to handle flag image request:', error);
        return new Response('Service Worker Error', {
          status: 500,
          statusText: 'Internal Server Error'
        });
      })
    );
    return;
  }

  // Default: network-first for HTML pages
  event.respondWith(
    fetch(request).catch(() => {
      return caches.match(request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        // Return a proper error response if no cache
        return new Response('Page not available offline', {
          status: 503,
          statusText: 'Service Unavailable'
        });
      });
    })
  );
});