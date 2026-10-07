// build.mjs 會把這一行換成實際的建置 ID 與完整的預先快取清單
const BUILD = { id: 'dev', assets: ['./', './index.html', './manifest.json', './icon.svg'] };
const CACHE = `tarot-${BUILD.id}`;
const IMG_CACHE = 'tarot-img-v2';
const KEEP = [CACHE, IMG_CACHE];
// esbuild 產生的檔名帶內容雜湊（例如 app-5QWJ2K7A.js），內容不會變，可以直接用快取
const HASHED = /-[A-Z0-9]{8}\.(js|css)$/;

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => c.addAll(BUILD.assets))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => !KEEP.includes(k)).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function putSafe(cacheName, key, res) {
  caches.open(cacheName).then((c) => c.put(key, res)).catch(() => {});
}

function cacheFirst(cacheName, req) {
  return caches.open(cacheName)
    .then((c) => c.match(req))
    .then((hit) => hit || fetch(req).then((res) => {
      if (res.ok) putSafe(cacheName, req, res.clone());
      return res;
    }));
}

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  if (url.pathname.includes('/img/cards/')) {
    e.respondWith(cacheFirst(IMG_CACHE, req));
    return;
  }
  if (HASHED.test(url.pathname)) {
    e.respondWith(cacheFirst(CACHE, req));
    return;
  }
  const isNav = req.mode === 'navigate';
  const netReq = isNav ? new Request(req.url, { cache: 'no-store' }) : req;
  e.respondWith(
    fetch(netReq)
      .then((res) => {
        if (res.ok) putSafe(CACHE, isNav ? './index.html' : req, res.clone());
        return res;
      })
      .catch(() => caches.match(req).then((r) => {
        if (r) return r;
        return isNav ? caches.match('./index.html') : Response.error();
      }))
  );
});
