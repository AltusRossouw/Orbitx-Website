// Service Worker for OrbitX Website
// Version 1.0.0

const CACHE_NAME = 'orbitx-v1.0.0'
const STATIC_CACHE = 'orbitx-static-v1.0.0'
const DYNAMIC_CACHE = 'orbitx-dynamic-v1.0.0'

// Critical resources to cache immediately
const CRITICAL_RESOURCES = [
  '/',
  '/images/orbitx-logo.svg',
  '/images/orbitx-social.png',
  '/_next/static/css/',
  '/_next/static/js/',
]

// Resources to cache on demand
const CACHE_PATTERNS = [
  /^\/images\//,
  /^\/_next\/static\//,
  /^\/products\//,
  /^\/about/,
  /^\/contact/,
  /^\/guarantee/,
  /^\/installations/,
]

// Install event - cache critical resources
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...')
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Service Worker: Caching critical resources')
        return cache.addAll(CRITICAL_RESOURCES)
      })
      .then(() => {
        console.log('Service Worker: Installation complete')
        return self.skipWaiting()
      })
      .catch((error) => {
        console.error('Service Worker: Installation failed', error)
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...')
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Service Worker: Deleting old cache', cacheName)
              return caches.delete(cacheName)
            }
          })
        )
      })
      .then(() => {
        console.log('Service Worker: Activation complete')
        return self.clients.claim()
      })
  )
})

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return
  }
  
  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return
  }
  
  // Handle different types of requests
  if (isStaticResource(request)) {
    event.respondWith(handleStaticResource(request))
  } else if (isPageRequest(request)) {
    event.respondWith(handlePageRequest(request))
  } else {
    event.respondWith(handleDynamicResource(request))
  }
})

// Check if request is for static resources
function isStaticResource(request) {
  const url = new URL(request.url)
  return url.pathname.startsWith('/_next/static/') ||
         url.pathname.startsWith('/images/') ||
         url.pathname.endsWith('.css') ||
         url.pathname.endsWith('.js') ||
         url.pathname.endsWith('.svg') ||
         url.pathname.endsWith('.png') ||
         url.pathname.endsWith('.jpg') ||
         url.pathname.endsWith('.jpeg') ||
         url.pathname.endsWith('.webp') ||
         url.pathname.endsWith('.avif')
}

// Check if request is for a page
function isPageRequest(request) {
  const url = new URL(request.url)
  return url.pathname === '/' ||
         url.pathname.startsWith('/products/') ||
         url.pathname.startsWith('/about') ||
         url.pathname.startsWith('/contact') ||
         url.pathname.startsWith('/guarantee') ||
         url.pathname.startsWith('/installations')
}

// Handle static resources (cache first)
async function handleStaticResource(request) {
  try {
    const cache = await caches.open(STATIC_CACHE)
    const cachedResponse = await cache.match(request)
    
    if (cachedResponse) {
      return cachedResponse
    }
    
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    console.error('Service Worker: Static resource fetch failed', error)
    return new Response('Resource not available', { status: 404 })
  }
}

// Handle page requests (network first, fallback to cache)
async function handlePageRequest(request) {
  try {
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE)
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    console.log('Service Worker: Network failed, trying cache')
    
    const cache = await caches.open(DYNAMIC_CACHE)
    const cachedResponse = await cache.match(request)
    
    if (cachedResponse) {
      return cachedResponse
    }
    
    // Fallback to offline page
    return caches.match('/offline.html') || new Response('Page not available offline', { status: 404 })
  }
}

// Handle dynamic resources (stale while revalidate)
async function handleDynamicResource(request) {
  const cache = await caches.open(DYNAMIC_CACHE)
  const cachedResponse = await cache.match(request)
  
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone())
    }
    return networkResponse
  }).catch(() => cachedResponse)
  
  return cachedResponse || fetchPromise
}

// Background sync for analytics
self.addEventListener('sync', (event) => {
  if (event.tag === 'analytics-sync') {
    event.waitUntil(syncAnalytics())
  }
})

async function syncAnalytics() {
  try {
    // Sync any pending analytics data
    console.log('Service Worker: Syncing analytics data')
  } catch (error) {
    console.error('Service Worker: Analytics sync failed', error)
  }
}

// Push notifications (if needed in future)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json()
    const options = {
      body: data.body,
      icon: '/images/orbitx-logo.svg',
      badge: '/images/orbitx-logo.svg',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    }
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    )
  }
})

// Message handling
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})
