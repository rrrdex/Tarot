// 找出網站用襯線字（思源宋體）顯示的字，給 scripts/subset-font.py 決定字型怎麼分片：
// 首頁一打開就會出現的字放第一片，其他標題用得到的字放接下來幾片，只出現在內文的字放最後（幾乎不會下載）。
// 用法：npm run build && npm run preview（另開一個終端機），再執行 node scripts/font-scan.mjs
// 會寫出 fonts/chars-priority.txt：第一行是首頁的字，第二行是其他標題的字。
import { chromium } from '@playwright/test';
import { writeFileSync } from 'node:fs';
import { fullTarotCards } from '../src/data.js';
import { uiStrings } from '../src/strings.js';

const BASE = process.env.BASE_URL || 'http://127.0.0.1:4173';
const home = new Set();
const other = new Set();
const add = (set, text) => { for (const ch of text) if (ch.codePointAt(0) > 0x7f) set.add(ch); };

// 畫面上所有用襯線字顯示的文字（含 ::before／::after 的文字內容）
const serifText = (page) => page.evaluate(() => {
  const out = [];
  for (const el of document.querySelectorAll('body *')) {
    if (!el.checkVisibility()) continue;
    if (!/^"?Noto Serif TC/.test(getComputedStyle(el).fontFamily)) continue;
    for (const n of el.childNodes) if (n.nodeType === 3) out.push(n.textContent);
    for (const ps of ['::before', '::after']) {
      const c = getComputedStyle(el, ps).content;
      if (c && c.startsWith('"')) out.push(c);
    }
  }
  return out.join('');
});

const browser = await chromium.launch();
for (const template of ['aurora', 'editorial', 'immersive']) {
  for (const width of [375, 1280]) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 }, serviceWorkers: 'block' });
    await ctx.addInitScript((tpl) => {
      if (sessionStorage.getItem('__scan')) return;
      sessionStorage.setItem('__scan', '1');
      localStorage.setItem('template', tpl);
      localStorage.setItem('interactiveDraw', 'false');
      localStorage.setItem('birthday', '1990-05-20');
    }, template);
    const page = await ctx.newPage();
    const nav = (name) => page.locator(`.tpl-nav-item[data-nav="${name}"]`).click();
    await page.goto(BASE + '/');
    await page.waitForTimeout(600);
    add(home, await serifText(page));
    await page.locator('#readButton').click();
    await page.locator('#results .card').first().waitFor();
    add(other, await serifText(page));
    for (const tab of ['history', 'learn', 'database', 'statistics', 'settings']) {
      await nav(tab);
      await page.waitForTimeout(250);
      add(other, await serifText(page));
    }
    await nav('learn');
    await page.locator('#learnModeTabQuiz').click();
    add(other, await serifText(page));
    await nav('database');
    await page.locator('#dbSegTabLibrary').click();
    add(other, await serifText(page));
    await page.locator('#dbSegTabSymbols').click();
    const symbols = await page.locator('.sym-btn').count();
    for (let i = 0; i < symbols; i++) {
      await page.locator('.sym-btn').nth(i).click();
      add(other, await serifText(page));
    }
    await nav('reading');
    await page.locator('#results .card').first().click();
    for (const seg of ['Meaning', 'Icon', 'Context', 'Lore']) {
      await page.locator(`#cardSegTab${seg}`).click();
      add(other, await serifText(page));
    }
    await page.keyboard.press('Escape');
    await page.locator('#linkAbout').click();
    await page.locator('#changelogList > *').first().waitFor();
    add(other, await serifText(page));
    await ctx.close();
  }
}
await browser.close();

// 掃描只看得到抽到的那幾張：所有牌名、牌陣名都可能出現在標題
for (const card of fullTarotCards) add(other, card.name);
for (const [key, value] of Object.entries(uiStrings.zh)) if (/^spread\.\w+\.label$/.test(key)) add(other, value);
for (const ch of home) other.delete(ch);
const sorted = (set) => [...set].sort().join('');
writeFileSync('fonts/chars-priority.txt', `${sorted(home)}\n${sorted(other)}\n`);
console.log(`首頁 ${home.size} 字，其他標題 ${other.size} 字 → fonts/chars-priority.txt`);
