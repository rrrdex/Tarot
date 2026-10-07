// 由原始 JPG 產生牌面圖片：全尺寸 AVIF/WebP，以及 160、320、400 寬的縮圖
// 用法：node scripts/images.mjs [原始 JPG 資料夾，預設 img/cards]
import sharp from 'sharp';
import { mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { setTimeout as sleep } from 'node:timers/promises';

const SRC = process.argv[2] || 'img/cards';
const OUT = 'img/cards';
const THUMB_WIDTHS = [160, 320, 400];
// 品質以放大比對原圖決定：全尺寸 AVIF q50 與原圖幾乎無差，q40 開始損失線條細紋
const FULL = { avif: { quality: 50, effort: 6 }, webp: { quality: 75, effort: 6 } };
const THUMB = { avif: { quality: 55, effort: 6 }, webp: { quality: 75, effort: 6 } };

// Windows 上剛寫入的檔案可能被防毒或索引服務短暫鎖住，稍等再試
async function write(file, data) {
  for (let attempt = 1; ; attempt++) {
    try {
      writeFileSync(file, data);
      return data.length;
    } catch (err) {
      if (attempt >= 5 || !['EBUSY', 'EPERM', 'EACCES'].includes(err.code)) throw err;
      await sleep(300 * attempt);
    }
  }
}

for (const w of THUMB_WIDTHS) mkdirSync(join(OUT, String(w)), { recursive: true });

const cards = readdirSync(SRC).filter(f => f.endsWith('.jpg')).map(f => f.slice(0, -4));
const total = { before: 0, after: 0 };
for (const name of cards) {
  const input = join(SRC, `${name}.jpg`);
  for (const [fmt, opts] of Object.entries(FULL)) {
    const file = join(OUT, `${name}.${fmt}`);
    try { total.before += statSync(file).size; } catch {}
    total.after += await write(file, await sharp(input)[fmt](opts).toBuffer());
  }
  for (const w of THUMB_WIDTHS) {
    for (const [fmt, opts] of Object.entries(THUMB)) {
      await write(join(OUT, String(w), `${name}.${fmt}`), await sharp(input).resize(w)[fmt](opts).toBuffer());
    }
  }
}
const mb = n => (n / 2 ** 20).toFixed(1);
console.log(`${cards.length} cards; full-size avif+webp ${mb(total.before)} MB -> ${mb(total.after)} MB`);
