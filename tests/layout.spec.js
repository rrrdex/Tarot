import { test, expect, seedStorage, openTab, SHARE_URL } from './fixtures.js';

// 版面、主題與高對比模式：只在桌面專案跑，視窗大小在各測試裡自己設定
test.skip(({ isMobile }) => isMobile, '版面測試自己設定視窗大小');

// 每張牌的中心點都點得到自己（沒有被別張牌蓋住）
async function cardsNotCovered(page) {
  return page.evaluate(async () => {
    document.documentElement.style.scrollBehavior = 'auto';
    const covered = [];
    for (const c of document.querySelectorAll('#results .card')) {
      c.scrollIntoView({ block: 'center', behavior: 'instant' });
      await new Promise(r => requestAnimationFrame(r));
      const r = c.getBoundingClientRect();
      for (const [x, y] of [[0.5, 0.5], [0.5, 0.9], [0.2, 0.8]]) {
        const el = document.elementFromPoint(r.left + r.width * x, r.top + r.height * y);
        if (!el || el.closest('.card') !== c) { covered.push(c.dataset.card); break; }
      }
    }
    return covered;
  });
}

test.describe('牌陣版面（寬螢幕）', () => {
  for (const style of ['text', 'api', 'line']) {
    test(`凱爾特十字的交叉牌不蓋住核心牌，每張牌都點得到（${style}）`, async ({ page }) => {
      await page.setViewportSize({ width: 1024, height: 900 });
      await seedStorage(page, { visualStyle: style });
      await page.goto(SHARE_URL);
      await expect(page.locator('#results .spread-layout .card')).toHaveCount(10);
      // 量格子而不是牌：牌還在播進場動畫
      const [core, cross] = await page.locator('#results .spread-cell').evaluateAll(cells => cells.slice(0, 2).map(c => {
        const r = c.getBoundingClientRect();
        return { top: r.top, bottom: r.bottom, left: r.left, right: r.right };
      }));
      // 交叉牌在核心牌下方、同一欄裡，兩者不重疊
      expect(cross.top).toBeGreaterThanOrEqual(core.bottom);
      expect(cross.left).toBeGreaterThanOrEqual(core.left - 1);
      expect(cross.right).toBeLessThanOrEqual(core.right + 1);
      // 交叉牌的文字是正的（只有牌面轉 90°）
      const crossTransform = await page.locator('#results .spread-cell.rotated').evaluate(el => getComputedStyle(el).transform);
      expect(crossTransform).toBe('none');
      expect(await cardsNotCovered(page)).toEqual([]);
    });
  }

  test('馬蹄牌陣與愛情十字在 1024px 寬時牌名不換行、正逆位不被裁掉', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 900 });
    for (const spread of ['horseshoe', 'loveCross']) {
      await page.goto(`/?seed=424242&spread=${spread}&deck=full`);
      await expect(page.locator('#results .spread-layout .card').first()).toBeVisible();
      const bad = await page.locator('#results .card').evaluateAll(cards => cards.filter(c => {
        const name = c.querySelector('.card-name');
        const ori = c.querySelector('.card-orientation').getBoundingClientRect();
        const box = c.getBoundingClientRect();
        const lh = parseFloat(getComputedStyle(name).lineHeight);
        return name.getBoundingClientRect().height > lh * 1.5 || name.scrollWidth > name.clientWidth + 1 || ori.right > box.right + 1;
      }).map(c => c.dataset.card));
      expect(bad, spread).toEqual([]);
    }
  });

  test('底牌與牌陣裡的牌一樣寬', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(SHARE_URL);
    const widths = await page.locator('#results .card').evaluateAll(cards => cards.map(c => Math.round(c.getBoundingClientRect().width)));
    expect(Math.max(...widths)).toBeLessThanOrEqual(220);
  });
});

test.describe('窄螢幕', () => {
  test('320px：資料庫排兩欄，整頁沒有水平捲動', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 700 });
    await page.goto('/');
    await openTab(page, 'database');
    const cols = await page.locator('#cardDatabaseGrid').evaluate(el => getComputedStyle(el).gridTemplateColumns.split(' ').length);
    expect(cols).toBe(2);
    for (const tab of ['reading', 'history', 'statistics', 'database', 'learn', 'settings']) {
      await openTab(page, tab);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, tab).toBeLessThanOrEqual(0);
    }
  });

  test('320px：確認視窗的兩顆按鈕都在視窗內，記錄按鈕的字不會一字一行', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 700 });
    const id = 1700000000001;
    await seedStorage(page, { readingHistory: JSON.stringify([{
      id, timestamp: id, deckType: 'full', spreadType: 'three', spreadName: 'spread.three.name',
      question: 'AVeryLongUnbrokenEnglishWordWithoutAnySpacesThatShouldWrapSomewhere'.repeat(2),
      drawnCards: [{ nameKey: 'fool', position: 'spread.three.pos.0', orientation: 'upright' }, { nameKey: 'magician', position: 'spread.three.pos.1', orientation: 'upright' }, { nameKey: 'empress', position: 'spread.three.pos.2', orientation: 'upright' }],
      bottomCard: { nameKey: 'sun', position: 'spread.bottom', orientation: 'reversed' },
      favorite: false, tags: ['SuperLongTagWithoutSpacesSuperLongTagWithoutSpaces'], note: ''
    }]) });
    await page.goto('/');
    await openTab(page, 'history');
    const actionHeights = await page.locator('.history-action').evaluateAll(els => els.map(e => Math.round(e.getBoundingClientRect().height)));
    expect(Math.max(...actionHeights)).toBeLessThanOrEqual(48);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(0);
    await page.locator('#clearHistory').click();
    const modal = page.locator('#confirmModal .modal');
    await expect(modal).toBeVisible();
    const outside = await modal.evaluate(m => {
      const r = m.getBoundingClientRect();
      return [...m.querySelectorAll('.modal-actions .btn')].filter(b => { const q = b.getBoundingClientRect(); return q.left < r.left || q.right > r.right; }).length;
    });
    expect(outside).toBe(0);
  });
});

test('捲動視窗內容時，標題列與關閉鈕留在視窗頂端', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 700 });
  await page.goto('/');
  await page.locator('#linkAbout').click();
  const modal = page.locator('#aboutModal .modal');
  await expect(modal).toBeVisible();
  await modal.evaluate(m => { m.scrollTop = 600; });
  const gap = await modal.evaluate(m => m.querySelector('.modal-header').getBoundingClientRect().top - m.getBoundingClientRect().top);
  expect(Math.abs(gap)).toBeLessThanOrEqual(2);
  await expect(page.locator('#aboutModal .modal-close')).toBeInViewport();
});

for (const [theme, scheme] of [['light', 'light'], ['dark', 'dark'], ['neon', 'dark']]) {
  test(`${theme} 主題的原生表單元件用 ${scheme} 配色`, async ({ page }) => {
    await seedStorage(page, { theme });
    await page.goto('/');
    expect(await page.evaluate(() => getComputedStyle(document.documentElement).colorScheme)).toBe(scheme);
  });
}

test('高對比模式：目前的分段按鈕與本次抽到的牌義有系統反白色', async ({ page }) => {
  await page.emulateMedia({ forcedColors: 'active' });
  await page.goto('/?seed=123456789&spread=three&deck=full');
  await page.locator('#results .card').first().click();
  await expect(page.locator('#cardModal')).toHaveClass(/show/);
  const [active, inactive] = await page.locator('#cardModalSeg .seg-item').evaluateAll(els => els.slice(0, 2).map(e => getComputedStyle(e).backgroundColor));
  expect(active).not.toBe(inactive);
  const blockBorders = await page.locator('#cardModal .meaning-block').evaluateAll(els => els.map(e => getComputedStyle(e).borderTopWidth));
  expect(new Set(blockBorders).size).toBe(2);
});
