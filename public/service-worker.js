const cacheName = 'v1685727652';

const cacheClone = async (event) => {
  const requestUrl = new URL(event.request.url);

  // Skip caching API requests
  if (requestUrl.pathname.startsWith('/api')) {
    return fetch(event.request);
  }

  const response = await fetch(event.request);

  if (!response || response.status !== 200 || response.type !== 'basic') {
    return response;
  }

  const responseClone = response.clone();

  const cache = await caches.open(cacheName);
  await cache.put(event.request, responseClone);

  return response;
};

const fetchEvent = () => {
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      cacheClone(event)
        .catch(() => caches.match(event.request))
        .then((response) => response)
    );
  });
};

fetchEvent();

// Import OneSignalSDKWorker.js
importScripts('/push/onesignal/OneSignalSDKWorker.js');