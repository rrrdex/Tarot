// build.mjs 會把這一行換成實際的建置 ID 與完整的預先快取清單
const BUILD = { id: 'dev', assets: ['./', './index.html', './manifest.json', './icon.svg'] };
// build.mjs 會依 img/cards 的內容雜湊換掉這個名字：牌圖一變，舊的圖片快取就整個淘汰
const IMG_CACHE = 'tarot-img-dev';
const CACHE = `tarot-${BUILD.id}`;
// 保留最近兩版的程式快取：新版接手後，還開著的舊頁面仍要能載入它自己那一版的程式片段
const KEEP_BUILDS = 2;
// 導覽請求等網路超過這個時間就先用離線副本
const NAV_TIMEOUT = 3000;
// esbuild 產生的檔名帶內容雜湊（例如 app-5QWJ2K7A.js、字型 noto-serif-tc-subset-XXXXXXXX.woff2），內容不會變，可以直接用快取
const HASHED = /-[A-Z0-9]{8}\.(js|css|woff2)$/;
const isBuildCache = (k) => k.startsWith('tarot-') && !k.startsWith('tarot-img-');

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
      .then((keys) => {
        // caches.keys() 依建立順序排列：留下最後幾個建置快取（一定包含這一版）與目前的圖片快取
        const builds = keys.filter(isBuildCache).filter((k) => k !== CACHE);
        const keep = new Set([CACHE, IMG_CACHE, ...builds.slice(-(KEEP_BUILDS - 1))]);
        return Promise.all(keys.filter((k) => !keep.has(k)).map((k) => caches.delete(k)));
      })
      .then(() => self.clients.claim())
  );
});

function putSafe(cacheName, key, res) {
  return caches.open(cacheName).then((c) => c.put(key, res)).catch(() => {});
}

function cacheFirst(cacheName, req, lookup) {
  return lookup(req).then((hit) => hit || fetch(req).then((res) => {
    if (res.ok) putSafe(cacheName, req, res.clone());
    return res;
  }));
}

// 只有 App 本身的網址（範圍根目錄或 index.html，不論查詢字串）才算 App 外殼；
// 同網域的其他頁面（例如另一份 HTML）不可存成離線的 index.html
function isAppShell(url) {
  const path = url.origin + url.pathname;
  const scope = self.registration.scope;
  return path === scope || path === `${scope}index.html`;
}

function navigate(e, req, url) {
  const app = isAppShell(url);
  const network = fetch(new Request(req.url, { cache: 'no-store' })).then((res) => {
    if (res.ok && app) putSafe(CACHE, './index.html', res.clone());
    return res;
  });
  e.waitUntil(network.then(() => {}, () => {}));
  const offline = () => caches.match(app ? './index.html' : req, { ignoreSearch: true });
  const timeout = new Promise((resolve) => setTimeout(() => resolve('timeout'), NAV_TIMEOUT));
  return Promise.race([network.catch(() => null), timeout]).then((res) => {
    if (res && res !== 'timeout') return res;
    return offline().then((cached) => {
      if (cached) return cached;
      // 逾時但沒有離線副本：繼續等網路
      return res === 'timeout' ? network : Response.error();
    });
  });
}

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  if (url.pathname.includes('/img/cards/')) {
    e.respondWith(cacheFirst(IMG_CACHE, req, (r) => caches.open(IMG_CACHE).then((c) => c.match(r))));
    return;
  }
  if (HASHED.test(url.pathname)) {
    // 在所有快取裡找：新版接手後，舊頁面要的舊版片段還留在上一版的快取裡
    e.respondWith(cacheFirst(CACHE, req, (r) => caches.match(r)));
    return;
  }
  if (req.mode === 'navigate') {
    e.respondWith(navigate(e, req, url));
    return;
  }
  e.respondWith(
    fetch(req)
      .then((res) => {
        if (res.ok) putSafe(CACHE, req, res.clone());
        return res;
      })
      .catch(() => caches.match(req).then((r) => r || Response.error()))
  );
});
