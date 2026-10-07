// 由 icon.svg 產生 PWA 與 iOS 主畫面圖示
// 用法：node scripts/icons.mjs
import sharp from 'sharp';
import { mkdirSync, readFileSync } from 'node:fs';

const OUT = 'icons';
const svg = readFileSync('icon.svg', 'utf8');
// maskable 與 apple-touch-icon 由系統自己裁圓角，背景必須滿版；月亮圖案落在中央 40% 安全區內
const fullBleed = svg.replace(/\s+rx="\d+"/, '');
if (fullBleed === svg) throw new Error('icon.svg 找不到圓角設定 rx');

mkdirSync(OUT, { recursive: true });
const render = (source, size, file) =>
  sharp(Buffer.from(source), { density: 72 * size / 512 }).resize(size, size).png().toFile(`${OUT}/${file}`);

await render(svg, 192, 'icon-192.png');
await render(svg, 512, 'icon-512.png');
await render(fullBleed, 512, 'maskable-512.png');
await render(fullBleed, 180, 'apple-touch-icon.png');
console.log('icons written to', OUT);
