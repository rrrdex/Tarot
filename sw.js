const CACHE = 'tarot-v4.15.2';
const IMG_CACHE = 'tarot-img-v1';
const KEEP = [CACHE, IMG_CACHE];
const ASSETS = [
'./', './index.html', './manifest.json', './icon.svg',
'./style.css?v=4.15.2',
'./js/app.js?v=4.15.2'
];
self.addEventListener('install', (e) => {
e.waitUntil(
caches.open(CACHE)
.then((c) => c.addAll(ASSETS))
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
self.addEventListener('fetch', (e) => {
const req = e.request;
if (req.method !== 'GET') return;
const url = new URL(req.url);
if (url.origin !== location.origin) return;
if (url.pathname.includes('/img/cards/')) {
e.respondWith(
caches.open(IMG_CACHE)
.then((c) => c.match(req))
.then((hit) => hit || fetch(req).then((res) => {
if (res.ok) putSafe(IMG_CACHE, req, res.clone());
return res;
}))
);
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
