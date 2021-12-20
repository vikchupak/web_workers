const staticCacheName = "static-cache-v326";
const dynamicCacheName = "dynamic-cache-v326";

const assetUrls = [
  "/",
  "/index.html",
  "/manifest.json",
  "/register_worker.js",
  "/main.js",
  "/css/styles.css",
  "/404.html",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(staticCacheName)
      .then((cache) => {
        cache.addAll(assetUrls);
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", async (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== staticCacheName)
          .filter((cacheName) => cacheName !== dynamicCacheName)
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  console.log("Service Worker: Fetch");
  event.respondWith(cacheFirst(event.request));
});

async function cacheFirst(request) {
  try {
    const cached = await caches.match(request);
    if (cached) return cached;

    const response = await fetch(request);
    const cache = await caches.open(dynamicCacheName);
    cache.put(request, response.clone());

    return response;
  } catch (error) {
    if (request.url.indexOf(".html") > -1) {
      return await caches.match("/404.html");
    }
  }
}
