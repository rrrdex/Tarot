import AxeBuilder from '@axe-core/playwright';
import { test, expect, seedStorage, openTab } from './fixtures.js';

// 關掉動畫：色彩對比在淡入、主題切換的過程中量會失真
const NO_MOTION = '*,*::before,*::after{transition:none!important;animation:none!important}';
// 每個測試都做多次完整掃描，整套平行跑時很吃 CPU：時間放寬為三倍
test.beforeEach(async ({ page }) => {
  test.slow();
  await page.emulateMedia({ reducedMotion: 'reduce' });
});

async function expectNoViolations(page, label) {
  const wcag = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();
  // 標題結構：不可跳級、要有 h1、不可有空標題
  const headings = await new AxeBuilder({ page })
    .withRules(['heading-order', 'page-has-heading-one', 'empty-heading'])
    .analyze();
  const summary = [...wcag.violations, ...headings.violations]
    .map(v => `${v.id}: ${v.nodes.slice(0, 3).map(n => n.target.join(' ')).join(', ')}`);
  expect(summary, label).toEqual([]);
}

// 三種主題 × 三種牌面（文字、偉特牌圖片、自製線稿）
const COMBOS = ['light', 'dark', 'neon'].flatMap(theme => ['text', 'api', 'line'].map(style => [theme, style]));
for (const [theme, style] of COMBOS) {
  test(`無障礙：各分頁與視窗（${theme} 主題、${style} 牌面）`, async ({ page }) => {
    await seedStorage(page, { theme, visualStyle: style, interactiveDraw: 'false', birthday: '1990-05-20' });
    await page.goto('/?seed=123456789&spread=three&deck=full');
    await page.addStyleTag({ content: NO_MOTION });
    // 線稿模式會先等牌組載入才畫牌
    await expect(page.locator('#results .card').first()).toBeVisible();
    await expectNoViolations(page, 'reading');

    await page.locator('#readButton').click();
    for (const tab of ['history', 'statistics', 'database', 'learn', 'settings']) {
      await openTab(page, tab);
      await expectNoViolations(page, tab);
    }

    await openTab(page, 'reading');
    await page.locator('#results .card').first().click();
    await expect(page.locator('#cardModal')).toHaveClass(/show/);
    await expectNoViolations(page, 'cardModal');
    if (style !== 'text') {
      // 牌面放大檢視
      await page.locator('.card-modal-art-btn').click();
      await expect(page.locator('#cardViewer')).toHaveClass(/show/);
      await expect(page.locator('.card-viewer-close')).toBeFocused();
      await expectNoViolations(page, 'cardViewer');
      await page.keyboard.press('Escape');
      await expect(page.locator('#cardViewer')).not.toHaveClass(/show/);
      await expect(page.locator('.card-modal-art-btn')).toBeFocused();
    }
    await page.keyboard.press('Escape');

    await page.locator('#linkAbout').click();
    // 更新紀錄是另外載入的檔案，整套測試同時跑時可能超過預設的 5 秒
    await expect(page.locator('#changelogList')).not.toBeEmpty({ timeout: 20000 });
    await expectNoViolations(page, 'aboutModal');
  });
}

// 新版型 × 淺色／深色（牌面樣式輪流搭配；最後一組是「跟隨系統」且系統為深色）
const TEMPLATE_COMBOS = [
  ['aurora', 'light', 'text'], ['aurora', 'dark', 'api'],
  ['editorial', 'light', 'api'], ['editorial', 'dark', 'line'],
  ['immersive', 'light', 'line'], ['immersive', 'dark', 'text'],
  ['aurora', 'auto', 'text'],
  // 各版型自己的霓虹配色
  ['aurora', 'neon', 'line'], ['editorial', 'neon', 'api'], ['immersive', 'neon', 'text']
];
for (const [template, theme, style] of TEMPLATE_COMBOS) {
  test(`無障礙：${template} 版型（${theme} 主題、${style} 牌面）的各分頁、翻頁器與視窗`, async ({ page }) => {
    if (theme === 'auto') await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' });
    const prefs = { template, visualStyle: style, interactiveDraw: 'false', birthday: '1990-05-20' };
    if (theme !== 'auto') prefs.theme = theme;
    await seedStorage(page, prefs);
    await page.goto('/?seed=123456789&spread=three&deck=full');
    await page.addStyleTag({ content: NO_MOTION });
    await expect(page.locator('#results .card').first()).toBeVisible();
    await expect(page.locator('.rd-pager-nav')).toBeVisible();
    await expectNoViolations(page, 'reading');
    await page.locator('.rd-pager-next').click();
    await expectNoViolations(page, 'pager');

    const nav = (name) => page.locator(`.tpl-nav-item[data-nav="${name}"]`);
    for (const tab of ['history', 'learn', 'database', 'statistics', 'settings']) {
      await nav(tab).click();
      await expect(nav(tab)).toHaveAttribute('aria-current', 'page');
      await expectNoViolations(page, tab);
    }

    await nav('reading').click();
    await page.locator('#results .card').first().click();
    await expect(page.locator('#cardModal')).toHaveClass(/show/);
    await expectNoViolations(page, 'cardModal');
    await page.keyboard.press('Escape');
    await expect(page.locator('#cardModal')).not.toHaveClass(/show/);

    await page.locator('#linkAbout').click();
    // 更新紀錄是另外載入的檔案，整套測試同時跑時可能超過預設的 5 秒
    await expect(page.locator('#changelogList')).not.toBeEmpty({ timeout: 20000 });
    await expectNoViolations(page, 'aboutModal');
  });
}
