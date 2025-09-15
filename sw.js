const CACHE_NAME = "aoi-blog-v2";
const urlsToCache = [
  "/",
  "/?m=1",
  "/p/about.html",
  "/p/contact.html",
  "/p/categories.html",
  "/p/offline.html"
];

// Install: cache halaman penting + offline
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Fetch: coba dari cache, kalau gagal → offline.html
self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request).then(response => {
        return response || caches.match("/p/offline.html");
      });
    })
  );
});

// Activate: hapus cache lama
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
