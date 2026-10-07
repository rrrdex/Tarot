import { chromium, devices } from '@playwright/test';
const [OUT, devName, prefix] = process.argv.slice(2);
const b = await chromium.launch();
const dev = devices[devName];
const ctx = await b.newContext({ ...dev, serviceWorkers: 'block', reducedMotion: 'reduce' });
await ctx.addInitScript(() => {
  if (sessionStorage.x) return; sessionStorage.x = 1;
  localStorage.setItem('interactiveDraw', 'false');
  localStorage.setItem('birthday', '1990-05-20');
});
const p = await ctx.newPage();
const errors = [];
p.on('pageerror', e => errors.push(e.message));
await p.goto('http://127.0.0.1:4173/'); await p.waitForTimeout(600);
// 用介面實際產生不同牌陣的紀錄
for (const spread of ['celtic', 'three', 'single', 'yesno', 'relationship', 'three', 'single', 'weekly']) {
  await p.evaluate(s => { const el = document.getElementById('spreadType'); el.value = s; el.dispatchEvent(new Event('change')); }, spread);
  await p.locator('#question').fill(spread === 'single' ? '' : '最近工作上的變動會帶來什麼？');
  await p.locator('#readButton').click(); await p.waitForTimeout(700);
}
// 日期分散到過去幾個月，補上筆記、標籤、收藏；學習進度
await p.evaluate(() => {
  const h = JSON.parse(localStorage.getItem('readingHistory'));
  const day = 86400000;
  h.forEach((r, i) => { r.timestamp = Date.now() - i * 23 * day; r.id = r.timestamp; });
  h[0].note = '抽到這組牌時剛好在考慮換工作，寫下來之後再回頭看。';
  h[0].tags = ['工作', '人際']; h[0].favorite = true;
  h[2].tags = ['感情']; h[3].favorite = true;
  localStorage.setItem('readingHistory', JSON.stringify(h));
  localStorage.setItem('tab', 'reading');
});
await p.reload(); await p.waitForTimeout(800);
await p.locator('#readButton').click(); await p.waitForTimeout(800);
const shot = async (name) => p.screenshot({ path: `${OUT}/${prefix}-${name}.png`, fullPage: true });
await p.evaluate(() => scrollTo(0, 0));
await shot('reading');
for (const tab of ['history', 'statistics', 'database', 'learn', 'settings']) {
  await p.locator(`.tab[data-tab="${tab}"]`).click(); await p.waitForTimeout(700);
  await p.evaluate(() => scrollTo(0, 0));
  await shot(tab);
}
// 視窗
const modalShot = async (name) => { await p.waitForTimeout(400); await p.locator('.modal-overlay.show .modal').screenshot({ path: `${OUT}/${prefix}-modal-${name}.png` }); };
await p.locator('.tab[data-tab="history"]').click(); await p.waitForTimeout(400);
await p.locator('#historyList [data-action="openNoteModal"]').first().click(); await modalShot('note'); await p.keyboard.press('Escape');
await p.locator('#historyList [data-action="openTagModal"]').first().click(); await modalShot('tag'); await p.keyboard.press('Escape');
await p.locator('#historyList [data-action="deleteReading"]').first().click(); await modalShot('confirm'); await p.keyboard.press('Escape');
await p.locator('#linkAbout').click(); await modalShot('about'); await p.keyboard.press('Escape');
await p.locator('#linkPrivacy').click(); await modalShot('privacy'); await p.keyboard.press('Escape');
console.log(prefix, 'errors', errors);
await b.close();
