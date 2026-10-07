import AxeBuilder from '@axe-core/playwright';
import { test, expect, seedStorage, openTab } from './fixtures.js';

// 關掉動畫：色彩對比在淡入、主題切換的過程中量會失真
const NO_MOTION = '*,*::before,*::after{transition:none!important;animation:none!important}';
test.beforeEach(async ({ page }) => {
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

for (const theme of ['light', 'dark', 'neon']) {
  test(`無障礙：各分頁與視窗（${theme} 主題）`, async ({ page }) => {
    await seedStorage(page, { theme, interactiveDraw: 'false', birthday: '1990-05-20' });
    await page.goto('/?seed=123456789&spread=three&deck=full');
    await page.addStyleTag({ content: NO_MOTION });
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
    await page.keyboard.press('Escape');

    await page.locator('#linkAbout').click();
    await expect(page.locator('#changelogList')).not.toBeEmpty();
    await expectNoViolations(page, 'aboutModal');
  });
}
