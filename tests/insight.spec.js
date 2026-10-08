import { test, expect, seedStorage, openTab } from './fixtures.js';

// 綜合觀察、模式洞察與統計：檢定要依實際牌組算，底牌不算抽牌
const MAJOR_KEYS = ['fool', 'magician', 'high_priestess', 'empress', 'emperor', 'hierophant', 'lovers', 'chariot',
  'strength', 'hermit', 'wheel_of_fortune', 'justice', 'hanged_man', 'death', 'temperance', 'devil', 'tower',
  'star', 'moon', 'sun', 'judgement', 'world'];

function record(i, keys, bottomKey, extra = {}) {
  return {
    id: 1000 + i,
    timestamp: Date.now() - i * 86400000 * 7,
    spreadType: keys.length === 1 ? 'single' : 'three',
    spreadName: keys.length === 1 ? 'spread.single.name' : 'spread.three.name',
    deckType: 'full',
    drawnCards: keys.map((k, j) => ({
      nameKey: k, orientation: 'reversed',
      position: keys.length === 1 ? 'spread.single.pos.0' : `spread.three.pos.${j}`
    })),
    bottomCard: { nameKey: bottomKey, orientation: 'upright', position: 'spread.bottom' },
    tags: [],
    ...extra
  };
}

test('只用大阿卡納的牌組，不會回報「大阿卡納密集」', async ({ page }) => {
  await page.goto('/?seed=123456789&spread=celtic&deck=major');
  await expect(page.locator('#results .card')).toHaveCount(11);
  const panel = page.locator('#results .insight-panel');
  await expect(panel).toBeVisible();
  await expect(panel.locator('.insight-tag')).not.toContainText(['大阿卡納密集']);
  const text = await panel.innerText();
  expect(text).not.toContain('<0.1%');
  expect(text).not.toContain('78 張');
  expect(text).not.toMatch(/[{}]/);
});

test('統計的總抽牌數不含底牌', async ({ page }) => {
  const list = Array.from({ length: 6 }, (_, i) => record(i, [MAJOR_KEYS[i]], MAJOR_KEYS[i + 10]));
  await seedStorage(page, { readingHistory: JSON.stringify(list), tab: 'statistics' });
  await page.goto('/');
  await openTab(page, 'statistics');
  const card = page.locator('.stat-card', { has: page.locator('.stat-title', { hasText: '總抽牌數' }) });
  await expect(card.locator('.stat-value')).toHaveText('6');
});

test('模式洞察依各次的牌組計算，不把底牌算進去', async ({ page }) => {
  const list = Array.from({ length: 6 }, (_, i) => record(i, MAJOR_KEYS.slice(i * 3, i * 3 + 3), MAJOR_KEYS[21], { deckType: 'major' }));
  await seedStorage(page, { readingHistory: JSON.stringify(list), tab: 'statistics' });
  await page.goto('/');
  await openTab(page, 'statistics');
  const panel = page.locator('#patternInsights');
  await expect(panel).toContainText('逆位偏多');
  await expect(panel).not.toContainText('大牌偏多');
  const text = await panel.innerText();
  expect(text).toMatch(/長期\s18\s張牌裡有\s18\s張逆位/);
  expect(text).toContain('機率低於 0.1%');
  expect(text).not.toContain('<0.1%');
});

test('統計圓餅圖在視窗尺寸改變後依新尺寸重畫', async ({ page }) => {
  const list = Array.from({ length: 6 }, (_, i) => record(i, [MAJOR_KEYS[i]], MAJOR_KEYS[i + 10]));
  await seedStorage(page, { readingHistory: JSON.stringify(list), tab: 'statistics' });
  await page.setViewportSize({ width: 1000, height: 900 });
  await page.goto('/');
  await openTab(page, 'statistics');
  const canvas = page.locator('#suitPieChart');
  const matches = () => canvas.evaluate(c => {
    const r = c.getBoundingClientRect();
    return r.width > 0 && c.width === Math.round(r.width * devicePixelRatio);
  });
  await expect.poll(matches).toBe(true);
  const before = await canvas.evaluate(c => c.width);
  await page.setViewportSize({ width: 600, height: 900 });
  await expect.poll(() => canvas.evaluate(c => c.width)).not.toBe(before);
  await expect.poll(matches).toBe(true);
});
