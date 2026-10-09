import { build } from 'esbuild';
import { createHash } from 'node:crypto';
import { cpSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { VERSION, jsOptions } from './scripts/bundle.mjs';
import { changelog } from './src/changelog.js';
import { uiStrings } from './src/strings.js';
import { keepNumberWithUnit } from './src/text.js';

const I18N_DEFAULT = 'zh';

const OUT = 'dist';
const STATIC = [
  'manifest.json',
  'icon.svg',
  'icons',
  'robots.txt',
  'sitemap.xml',
  '_headers',
  'img/og.png',
  'fonts/OFL.txt',
  'Henry’s_Prayer_Journal.html'
];
// 牌圖只附網頁實際會用到的 avif／webp；原始 JPG 與 img/cards_original.rar 留在原始碼庫，不上線
const CARD_IMAGES = /\.(avif|webp)$/;
// 正式網址：index.html、robots.txt、sitemap.xml 都直接寫這個。要部署到別的網址時用 SITE_URL 換掉
const CANONICAL_URL = 'https://thefinalstar.com/';
const SITE_URL = process.env.SITE_URL ? process.env.SITE_URL.replace(/\/+$/, '') + '/' : null;

rmSync(OUT, { recursive: true, force: true });

const js = await build({
  ...jsOptions,
  outdir: `${OUT}/js`,
  entryNames: '[name]-[hash]',
  chunkNames: 'chunks/[name]-[hash]',
  // 正式版不附 source map（開發伺服器仍有）
  sourcemap: false,
  minify: true,
  metafile: true
});
// 樣式表入口依序 @import 基礎、新版型共用與各版型的樣式，打包成一個 style-[hash].css
const CSS_ENTRY = 'styles/index.css';
const css = await build({
  entryPoints: [{ in: CSS_ENTRY, out: 'style' }],
  bundle: true,
  outdir: OUT,
  entryNames: '[name]-[hash]',
  // 自帶的字型（styles/templates/shared.css 的 @font-face）：複製到 dist/fonts 並在檔名加上內容雜湊
  loader: { '.woff2': 'file' },
  assetNames: 'fonts/[name]-[hash]',
  minify: true,
  metafile: true,
  logLevel: 'info'
});

const outputs = Object.entries({ ...js.metafile.outputs, ...css.metafile.outputs })
  .filter(([path]) => !path.endsWith('.map'));
const urlOf = (path) => path.replace(`${OUT}/`, '');
const entryUrl = (src) => urlOf(outputs.find(([, o]) => o.entryPoint === src)[0]);
const appJs = entryUrl('src/main.js');
const styleCss = entryUrl(CSS_ENTRY);
// 線稿牌組是動態載入的片段；index.html 的 inline script 在線稿模式下會先預載它
const deckJs = entryUrl('src/deck.js');

for (const path of STATIC) {
  cpSync(path, `${OUT}/${path}`, { recursive: true });
}
cpSync('img/cards', `${OUT}/img/cards`, {
  recursive: true,
  filter: (src) => statSync(src).isDirectory() || CARD_IMAGES.test(src)
});

function rewrite(file, replacements) {
  let text = readFileSync(file, 'utf8');
  for (const [from, to] of replacements) {
    if (!text.includes(from)) throw new Error(`${file}: 找不到 ${from}`);
    text = text.replace(from, to);
  }
  writeFileSync(`${OUT}/${file}`, text);
}

rewrite('index.html', [
  [`href="${CSS_ENTRY}"`, `href="${styleCss}"`],
  ['src="js/app.js"', `src="${appJs}"`],
  ["var deck = '';", `var deck = ${JSON.stringify(deckJs)};`]
]);
prerenderStrings(`${OUT}/index.html`);

// 把預設語言的介面文字直接寫進 HTML：不必等 JS 才出現文字，也避免填字時整個版面往下跳
function prerenderStrings(file) {
  const table = uiStrings[I18N_DEFAULT];
  const text = (key) => {
    if (!(key in table)) throw new Error(`index.html 用到不存在的字串 ${key}`);
    return keepNumberWithUnit(table[key]).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  };
  let html = readFileSync(file, 'utf8')
    .replace(/(<(\w+)\b[^>]*\sdata-i18n="([^"]+)"[^>]*>)(<\/\2>)/g, (_, open, tag, key, close) => open + text(key) + close);
  for (const [attr, target] of [['placeholder', 'placeholder'], ['label', 'aria-label'], ['title', 'title']]) {
    html = html.replace(new RegExp(` data-i18n-${attr}="([^"]+)"`, 'g'), (m, key) => `${m} ${target}="${text(key)}"`);
  }
  writeFileSync(file, html);
}

// canonical、og:image、JSON-LD、robots.txt、sitemap.xml 裡的網址：有指定 SITE_URL 才換掉正式網址
for (const file of ['index.html', 'robots.txt', 'sitemap.xml']) {
  const path = `${OUT}/${file}`;
  const text = readFileSync(path, 'utf8');
  if (!text.includes(CANONICAL_URL)) throw new Error(`${file}: 找不到 ${CANONICAL_URL}`);
  if (SITE_URL && SITE_URL !== CANONICAL_URL) writeFileSync(path, text.replaceAll(CANONICAL_URL, SITE_URL));
}
// sitemap 的最後更新日期：最新一版更新紀錄的日期（同一版建置出來都一樣）
{
  const path = `${OUT}/sitemap.xml`;
  const text = readFileSync(path, 'utf8');
  if (!text.includes('</loc>')) throw new Error('sitemap.xml: 找不到 </loc>');
  writeFileSync(path, text.replace('</loc>', `</loc><lastmod>${changelog[0].date}</lastmod>`));
}

// CSP 只放行 index.html 裡實際存在的 inline script（JSON-LD 不會被執行，不受 script-src 限制）
// 瀏覽器解析 HTML 時會把 CRLF 正規化成 LF 再計算雜湊；Windows 簽出的檔案是 CRLF，所以先換掉
const inlineHashes = [...readFileSync(`${OUT}/index.html`, 'utf8').matchAll(/<script>([\s\S]*?)<\/script>/g)]
  .map(([, code]) => `'sha256-${createHash('sha256').update(code.replace(/\r\n?/g, '\n')).digest('base64')}'`);
const CSP_DIRECTIVES = [
  "default-src 'self'",
  `script-src 'self' ${inlineHashes.join(' ')}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "connect-src 'self'",
  "manifest-src 'self'",
  "worker-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'none'"
];
// _headers 給支援它的主機（Cloudflare Pages）；GitHub Pages 不看 _headers，所以 HTML 裡也放一份 <meta>。
// frame-ancestors 只能由回應標頭設定，<meta> 版本不含
const CSP_HEADER = [...CSP_DIRECTIVES, "frame-ancestors 'none'"].join('; ');
const CSP_META = CSP_DIRECTIVES.join('; ');
{
  const path = `${OUT}/index.html`;
  const html = readFileSync(path, 'utf8');
  const charset = /<meta charset="UTF-8"\s*\/?>/i;
  if (!charset.test(html)) throw new Error('index.html: 找不到 <meta charset>');
  writeFileSync(path, html.replace(charset, (m) => `${m} <meta http-equiv="Content-Security-Policy" content="${CSP_META}"/>`));
}
// 只換標頭那幾行，不動檔案開頭說明裡提到的 __CSP__
writeFileSync(`${OUT}/_headers`, readFileSync('_headers', 'utf8')
  .replace(/^([ \t]+Content-Security-Policy:[ \t]*)__CSP__[ \t]*$/gm, (_, head) => head + CSP_HEADER));

// 圖示也預先快取，離線安裝與主畫面圖示才完整
const manifest = JSON.parse(readFileSync('manifest.json', 'utf8'));
const iconAssets = [...new Set([...manifest.icons.map(i => i.src), 'icons/apple-touch-icon.png'])]
  .filter(src => src !== 'icon.svg')
  .map(src => `./${src}`);
// 字型不預先快取：只有新版型用得到，第一次用到時才下載，之後由 Service Worker 快取
const assets = ['./', './index.html', './manifest.json', './icon.svg', ...iconAssets,
  ...outputs.filter(([path]) => !path.endsWith('.woff2')).map(([path]) => `./${urlOf(path)}`)];
// 任何預先快取的檔案內容一變，建置 ID 就變，Service Worker 才會更新離線副本
const contentHash = createHash('sha256');
for (const asset of assets) {
  contentHash.update(asset);
  if (!asset.endsWith('/')) contentHash.update(readFileSync(`${OUT}/${asset.slice(2)}`));
}
const buildId = `${VERSION}-${contentHash.digest('hex').slice(0, 8)}`;
// 牌圖快取的名字跟著牌圖內容變：牌圖沒變就沿用，換了圖才整批重新下載
function hashDir(dir, hash) {
  for (const name of readdirSync(dir).sort()) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) hashDir(path, hash);
    else {
      hash.update(path.replaceAll('\\', '/'));
      hash.update(readFileSync(path));
    }
  }
  return hash;
}
const imgCache = `tarot-img-${hashDir(`${OUT}/img/cards`, createHash('sha256')).digest('hex').slice(0, 8)}`;
const swSource = readFileSync('sw.js', 'utf8');
rewrite('sw.js', [
  [/^const BUILD = .*;$/m.exec(swSource)[0], `const BUILD = ${JSON.stringify({ id: buildId, assets })};`],
  [/^const IMG_CACHE = .*;$/m.exec(swSource)[0], `const IMG_CACHE = ${JSON.stringify(imgCache)};`]
]);

console.log(`\n  version ${VERSION}, build ${buildId}, ${assets.length} precached files, site ${SITE_URL || CANONICAL_URL}`);
