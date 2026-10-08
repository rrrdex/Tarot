import { test, expect, SHARE_URL, seedStorage, openTab } from './fixtures.js';
import { getCardArt } from '../src/deck.js';
import { fullTarotCards } from '../src/data.js';

// 自製線稿牌組：78 張都要畫得出來，而且 SVG 本身沒有壞掉的座標或對不上的 id
test.describe('線稿牌組的 SVG', () => {
  test.skip(({ isMobile }) => isMobile, '純資料檢查，跑一次就好');

  const arts = fullTarotCards.map(card => [card, getCardArt(card)]);

  test('78 張牌都是場景插畫', () => {
    for (const [card, svg] of arts) {
      expect(svg, card.nameKey).toMatch(/^<svg [^>]*class="card-image line-art"[\s\S]*<\/svg>$/);
      expect(svg.includes('class="dk-scene"'), `${card.nameKey} 不是場景插畫`).toBe(true);
    }
  });

  test('沒有 NaN、undefined 之類壞掉的值', () => {
    for (const [card, svg] of arts) {
      expect(svg.match(/NaN|undefined|null|Infinity/g), card.nameKey).toBeNull();
    }
  });

  test('標記結構完整：屬性值裡沒有混進標籤，元素之間沒有散落的文字', () => {
    for (const [card, svg] of arts) {
      expect(svg.match(/="[^"]*</g), `${card.nameKey} 的屬性值裡有標籤`).toBeNull();
      // <text> 以外的地方不該有文字節點
      const stray = svg.replace(/<text[^>]*>[^<]*<\/text>/g, '').match(/>[^<\s][^<]*</g);
      expect(stray, `${card.nameKey} 有散落的文字`).toBeNull();
    }
  });

  test('id 在整副牌裡不重複，每個 url(#…) 都指向同一張牌裡的定義', () => {
    const seen = new Set();
    for (const [card, svg] of arts) {
      const ids = [...svg.matchAll(/ id="([^"]+)"/g)].map(m => m[1]);
      for (const id of ids) {
        expect(seen.has(id), `${card.nameKey} 的 id ${id} 重複`).toBe(false);
        seen.add(id);
      }
      for (const [, ref] of svg.matchAll(/url\(#([^)]+)\)/g)) {
        expect(ids, `${card.nameKey} 參照了不存在的 ${ref}`).toContain(ref);
      }
    }
  });

  test('逆位會加上 reversed class', () => {
    expect(getCardArt(fullTarotCards[0], 'reversed')).toMatch(/^<svg [^>]*class="card-image line-art reversed"/);
  });
});

test.describe('線稿牌組按需載入', () => {
  test('文字模式不會下載線稿牌組', async ({ page }) => {
    const deckRequests = [];
    page.on('request', (req) => {
      if (/\/chunks\/deck-/.test(req.url())) deckRequests.push(req.url());
    });
    await page.goto('/?seed=123456789&spread=three&deck=full');
    await expect(page.locator('#results .card')).toHaveCount(4);
    await openTab(page, 'database');
    expect(deckRequests).toEqual([]);
  });

  test('從設定切到線稿模式後，牌面補上插畫', async ({ page }) => {
    await page.goto('/?seed=123456789&spread=three&deck=full');
    await expect(page.locator('#results .card')).toHaveCount(4);
    await expect(page.locator('#results svg.line-art')).toHaveCount(0);
    await openTab(page, 'settings');
    await page.locator('input[name="visualStyle"][value="line"]').check({ force: true });
    await openTab(page, 'reading');
    await expect(page.locator('#results .card svg.line-art')).toHaveCount(4);
  });
});

test.describe('線稿模式', () => {
  test.beforeEach(async ({ page }) => {
    await seedStorage(page, { visualStyle: 'line' });
  });

  test('占卜結果每張牌都畫出線稿，逆位的牌是轉過來的', async ({ page }) => {
    await page.goto(SHARE_URL);
    const cards = page.locator('#results .card');
    await expect(cards).toHaveCount(11);
    await expect(page.locator('#results .card svg.line-art')).toHaveCount(11);
    const reversed = page.locator('#results .card[data-orientation="reversed"] svg.line-art');
    await expect(reversed.first()).toHaveClass(/reversed/);
  });

  test('資料庫畫出 78 張，所有漸層與裁切參照都解析得到', async ({ page }) => {
    await page.goto('/');
    await openTab(page, 'database');
    const arts = page.locator('#tabDatabase svg.line-art');
    // 牌面捲到附近才填入：一開始只畫畫面附近的幾張，捲到底後 78 張全部到齊
    await expect(arts.first()).toBeVisible();
    expect(await arts.count()).toBeLessThan(78);
    await page.locator('#tabDatabase .card-db-item').last().scrollIntoViewIfNeeded();
    for (const item of await page.locator('#tabDatabase .card-db-item').all()) await item.scrollIntoViewIfNeeded();
    await expect(arts).toHaveCount(78);
    const broken = await page.evaluate(() => {
      const bad = [];
      for (const el of document.querySelectorAll('#tabDatabase svg.line-art [fill^="url(#"], #tabDatabase svg.line-art [clip-path^="url(#"]')) {
        const ref = (el.getAttribute('fill') || el.getAttribute('clip-path')).slice(5, -1);
        if (!document.getElementById(ref)) bad.push(ref);
      }
      return bad;
    });
    expect(broken).toEqual([]);
    const box = await arts.first().boundingBox();
    expect(box.width).toBeGreaterThan(40);
  });

  test('分享圖可以帶著線稿牌面產生', async ({ page }) => {
    await page.goto('/?seed=123456789&spread=three&deck=full');
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.locator('[data-action="generateShareImage"]').click()
    ]);
    expect(download.suggestedFilename()).toBe('tarot-123456789.png');
  });

  test('各分頁與卡片詳情在線稿模式下都正常', async ({ page }) => {
    await page.goto('/?seed=123456789&spread=three&deck=full');
    await page.locator('#results .card').first().click();
    await expect(page.locator('#cardModal')).toHaveClass(/show/);
    await expect(page.locator('#cardModal svg.line-art').first()).toBeVisible();
    await page.keyboard.press('Escape');
    for (const name of ['history', 'statistics', 'database', 'learn', 'settings']) {
      await openTab(page, name);
    }
  });
});
