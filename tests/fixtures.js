import { test as base, expect } from '@playwright/test';

// 每個測試結束時，頁面上不可以有任何未捕捉的錯誤
export const test = base.extend({
  allowedErrors: [[], { option: true }],
  page: async ({ page, allowedErrors }, use) => {
    const errors = [];
    const record = (text) => {
      if (!allowedErrors.some(re => re.test(text))) errors.push(text);
    };
    page.on('pageerror', (err) => record(err.message));
    page.on('console', (msg) => {
      if (msg.type() === 'error') record(msg.text());
    });
    await use(page);
    expect(errors, 'page errors').toEqual([]);
  }
});

export { expect };

export const SHARE_URL = '/?seed=123456789&spread=celtic&deck=full';

export async function seedStorage(page, items) {
  await page.addInitScript((entries) => {
    if (sessionStorage.getItem('__seeded')) return;
    sessionStorage.setItem('__seeded', '1');
    for (const [k, v] of Object.entries(entries)) localStorage.setItem(k, v);
  }, items);
}

export const history = (page) => page.evaluate(() => JSON.parse(localStorage.getItem('readingHistory') || '[]'));

export async function openTab(page, name) {
  await page.locator(`.tab[data-tab="${name}"]`).click();
  await expect(page.locator(`.tab[data-tab="${name}"]`)).toHaveAttribute('aria-selected', 'true');
}
