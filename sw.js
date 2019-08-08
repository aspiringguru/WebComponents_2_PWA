const cacheName = 'news-v1';
const staticAssets = [
  './',
  './index.html',
  './styles.css',
  './index.js',
  './newsApi.js',
  './manifest.webmanifest',
  './config.js',
  './news-article.js'
];


self.addEventListener('install', async e => {
  const cache = await caches.open(cacheName);
  await cache.addAll(staticAssets);
  return self.skipWaiting();
});

self.addEventListener('activate', e => {
  self.clients.claim();
});

self.addEventListener('fetch', async e => {
  console.log("self.addEventListener('fetch'..")
  const req = e.request;
  const url = new URL(req.url);

  if (url.origin === location.origin) {
    console.log("url.origin === location.origin, cacheFirst");
    e.respondWith(cacheFirst(req));
  } else {
    console.log("url.origin !=== location.origin, networkAndCache");
    e.respondWith(networkAndCache(req));
  }
});


async function cacheFirst(req) {
  console.log("function cacheFirst");
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  return cached || fetch(req);
}

async function networkAndCache(req) {
  console.log("function networkAndCache")
  const cache = await caches.open(cacheName);
  try {
    const fresh = await fetch(req);
    await cache.put(req, fresh.clone());
    
    return fresh;
  } catch (e) {
    const cached = await cache.match(req);
    return cached;
  }
}
