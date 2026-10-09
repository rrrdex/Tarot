import { test as base, expect } from '@playwright/test';

// 每個測試結束時，頁面上不可以有任何未捕捉的錯誤
export const test = base.extend({
  allowedErrors: [[], { option: true }],
  // 預設版型是星夜玻璃；描述簡約版型行為的測試照舊在簡約跑。測試自己 seedStorage 的 template 會蓋過這個值；
  // 要測「沒選過版型」的情況用 test.use({ defaultTemplate: null })
  defaultTemplate: ['minimal', { option: true }],
  page: async ({ page, allowedErrors, defaultTemplate }, use) => {
    if (defaultTemplate) {
      await page.addInitScript((tpl) => {
        try {
          if (sessionStorage.getItem('__tplDefault')) return;
          sessionStorage.setItem('__tplDefault', '1');
          if (localStorage.getItem('template') === null) localStorage.setItem('template', tpl);
        } catch {}
      }, defaultTemplate);
    }
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
