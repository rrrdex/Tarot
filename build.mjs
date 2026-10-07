import { build } from 'esbuild';
import { createHash } from 'node:crypto';
import { cpSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { VERSION, jsOptions } from './scripts/bundle.mjs';
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
  'img',
  'Henry’s_Prayer_Journal.html'
];

rmSync(OUT, { recursive: true, force: true });

const js = await build({
  ...jsOptions,
  outdir: `${OUT}/js`,
  entryNames: '[name]-[hash]',
  chunkNames: 'chunks/[name]-[hash]',
  minify: true,
  metafile: true
});
const css = await build({
  entryPoints: ['style.css'],
  outdir: OUT,
  entryNames: '[name]-[hash]',
  minify: true,
  metafile: true,
  logLevel: 'info'
});

const outputs = Object.entries({ ...js.metafile.outputs, ...css.metafile.outputs })
  .filter(([path]) => !path.endsWith('.map'));
const urlOf = (path) => path.replace(`${OUT}/`, '');
const entryUrl = (src) => urlOf(outputs.find(([, o]) => o.entryPoint === src)[0]);
const appJs = entryUrl('src/main.js');
const styleCss = entryUrl('style.css');

for (const path of STATIC) {
  cpSync(path, `${OUT}/${path}`, { recursive: true });
}

function rewrite(file, replacements) {
  let text = readFileSync(file, 'utf8');
  for (const [from, to] of replacements) {
    if (!text.includes(from)) throw new Error(`${file}: 找不到 ${from}`);
    text = text.replace(from, to);
  }
  writeFileSync(`${OUT}/${file}`, text);
}

rewrite('index.html', [
  ['href="style.css"', `href="${styleCss}"`],
  ['src="js/app.js"', `src="${appJs}"`]
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

// CSP 只放行 index.html 裡實際存在的 inline script（JSON-LD 不會被執行，不受 script-src 限制）
const inlineHashes = [...readFileSync(`${OUT}/index.html`, 'utf8').matchAll(/<script>([\s\S]*?)<\/script>/g)]
  .map(([, code]) => `'sha256-${createHash('sha256').update(code).digest('base64')}'`);
const CSP = [
  "default-src 'self'",
  `script-src 'self' ${inlineHashes.join(' ')}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "connect-src 'self'",
  "manifest-src 'self'",
  "worker-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'none'",
  "frame-ancestors 'none'"
].join('; ');
writeFileSync(`${OUT}/_headers`, readFileSync('_headers', 'utf8').replaceAll('__CSP__', CSP));

const assets = ['./', './index.html', './manifest.json', './icon.svg', ...outputs.map(([path]) => `./${urlOf(path)}`)];
// 任何預先快取的檔案內容一變，建置 ID 就變，Service Worker 才會更新離線副本
const contentHash = createHash('sha256');
for (const asset of assets) {
  contentHash.update(asset);
  if (!asset.endsWith('/')) contentHash.update(readFileSync(`${OUT}/${asset.slice(2)}`));
}
const buildId = `${VERSION}-${contentHash.digest('hex').slice(0, 8)}`;
rewrite('sw.js', [
  [/^const BUILD = .*;$/m.exec(readFileSync('sw.js', 'utf8'))[0], `const BUILD = ${JSON.stringify({ id: buildId, assets })};`]
]);

console.log(`\n  version ${VERSION}, build ${buildId}, ${assets.length} precached files`);
