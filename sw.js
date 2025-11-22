const CACHE_NAME = 'cinephile-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/data.js',
  '/app.js'
];

self.addEventListener('install', (evt)=>{
  evt.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(ASSETS_TO_CACHE)));
  self.skipWaiting();
});

self.addEventListener('activate', (evt)=>{
  evt.waitUntil(clients.claim());
});

self.addEventListener('fetch', (evt)=>{
  const req = evt.request;
  // network-first for data.js, cache-first for other assets
  if (req.url.endsWith('/data.js')){
    evt.respondWith(fetch(req).then(res=>{ const clone = res.clone(); caches.open(CACHE_NAME).then(cache=>cache.put(req, clone)); return res; }).catch(_=>caches.match(req)));
    return;
  }
  evt.respondWith(caches.match(req).then(cached=> cached || fetch(req).then(res=>{ return caches.open(CACHE_NAME).then(cache=>{ cache.put(req, res.clone()); return res; }); } ).catch(()=>caches.match('/index.html'))));
});
