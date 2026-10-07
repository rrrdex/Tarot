import { test, expect, SHARE_URL, seedStorage, history, openTab } from './fixtures.js';

const CELTIC_SEED_CARDS = [
  ['star', 'upright'], ['page_of_wands', 'upright'], ['fool', 'upright'], ['nine_of_wands', 'reversed'],
  ['sun', 'reversed'], ['knight_of_swords', 'upright'], ['seven_of_pentacles', 'reversed'],
  ['temperance', 'reversed'], ['ace_of_swords', 'reversed'], ['king_of_wands', 'reversed'], ['judgement', 'reversed']
];

test('分享連結以同一個 seed 重現同一組牌', async ({ page }) => {
  await page.goto(SHARE_URL);
  const cards = page.locator('#results .card');
  await expect(cards).toHaveCount(CELTIC_SEED_CARDS.length);
  const drawn = await cards.evaluateAll(els => els.map(e => [e.dataset.card, e.dataset.orientation]));
  expect(drawn).toEqual(CELTIC_SEED_CARDS);
});

test('追蹤參數不影響載入，canonical 會移除它們', async ({ page }) => {
  await page.goto('/?utm_source=x&fbclid=y&lang=zh');
  await expect(page.locator('#spreadType option')).toHaveCount(29);
  const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
  expect(canonical).not.toContain('utm_source');
  expect(canonical).not.toContain('fbclid');
});

test('每個分頁都能切換並顯示內容', async ({ page }) => {
  await page.goto('/');
  for (const name of ['reading', 'history', 'statistics', 'database', 'learn', 'settings']) {
    await openTab(page, name);
    const panel = page.locator(`#tab${name[0].toUpperCase()}${name.slice(1)}`);
    await expect(panel).toBeVisible();
    await expect(panel).not.toBeEmpty();
  }
});

test('卡片詳情：開啟、各分段內容、關閉按鈕與 Esc', async ({ page }) => {
  // 凱爾特十字的第二張牌橫壓在第一張上，這裡用三張牌陣
  await page.goto('/?seed=123456789&spread=three&deck=full');
  const modal = page.locator('#cardModal');
  await page.locator('#results .card').first().click();
  await expect(modal).toHaveClass(/show/);
  await expect(page.locator('#cardModalTitle')).toHaveText('星星');
  await expect(page.locator('#cardModalUpright')).not.toBeEmpty();

  await page.locator('#cardModalSeg [data-seg="context"]').click();
  await expect(page.locator('#cardModalContextList')).not.toBeEmpty();
  await page.locator('#cardModalSeg [data-seg="lore"]').click();
  await expect(page.locator('#cardModalLoreList')).not.toBeEmpty();

  await modal.locator('.modal-close').click();
  await expect(modal).not.toHaveClass(/show/);

  await page.locator('#results .card').nth(1).click();
  await expect(modal).toHaveClass(/show/);
  await page.keyboard.press('Escape');
  await expect(modal).not.toHaveClass(/show/);
});

test('占卜紀錄：儲存、收藏、筆記、標籤、查看、刪除', async ({ page }) => {
  await seedStorage(page, { interactiveDraw: 'false' });
  await page.goto('/');
  await page.locator('#readButton').click();
  await expect(page.locator('#results .card').first()).toBeVisible();
  expect(await history(page)).toHaveLength(1);

  await openTab(page, 'history');
  const item = (action) => page.locator(`#historyList [data-action="${action}"]`).first();

  await item('toggleFavorite').click();
  await expect.poll(async () => (await history(page))[0].favorite).toBe(true);
  await expect(item('toggleFavorite')).toHaveAttribute('aria-pressed', 'true');
  await expect(item('toggleFavorite')).toBeFocused();

  await page.locator('#filterFavorite').click();
  await expect(page.locator('#filterFavorite')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('#historyList .history-item')).toHaveCount(1);
  await page.locator('#filterFavorite').click();
  await expect(page.locator('#filterFavorite')).toHaveAttribute('aria-pressed', 'false');

  await item('openNoteModal').click();
  await expect(page.locator('#noteModal')).toHaveClass(/show/);
  await page.locator('#noteText').fill('測試筆記');
  await page.locator('#noteModal [data-action="saveNote"]').click();
  await expect(page.locator('#noteModal')).not.toHaveClass(/show/);
  expect((await history(page))[0].note).toBe('測試筆記');

  await item('openTagModal').click();
  const firstTag = page.locator('#commonTags .tag').first();
  const tagName = await firstTag.textContent();
  await firstTag.click();
  await expect(firstTag).toHaveAttribute('aria-pressed', 'true');
  await page.locator('#tagModal [data-action="saveTag"]').click();
  expect((await history(page))[0].tags).toEqual([tagName]);

  // 點卡片上的任何位置都會打開結果（點擊層由牌陣名稱按鈕延伸到整張卡）
  await page.locator('#historyList .history-item').first().click({ position: { x: 24, y: 48 } });
  await expect(page.locator('#tabReading')).toBeVisible();

  await openTab(page, 'history');
  await item('deleteReading').click();
  await expect(page.locator('#confirmModal')).toHaveClass(/show/);
  await page.locator('#confirmOk').click();
  await expect.poll(async () => (await history(page)).length).toBe(0);
});

test('舊格式紀錄會被轉換並正常顯示', async ({ page }) => {
  const legacy = [{
    id: 1, timestamp: 1700000000000, spreadType: 'three', spreadName: '聖三角',
    drawnCards: [
      { nameKey: 'fool', name: 'The Fool', orientation: '正位', position: '過去' },
      { nameKey: 'magician', name: 'The Magician', orientation: '逆位', position: '現在' },
      { nameKey: 'empress', name: 'The Empress', orientation: '正位', position: '未來' }
    ],
    bottomCard: { nameKey: 'sun', name: 'The Sun', orientation: '逆位', position: '底牌' },
    tags: ['愛情'], note: 'old'
  }];
  await seedStorage(page, { readingHistory: JSON.stringify(legacy), tab: 'history' });
  await page.goto('/');
  await expect(page.locator('#tabHistory')).toBeVisible();
  await expect(page.locator('#historyList')).toContainText('聖三角');
  await expect(page.locator('#historyList')).not.toContainText('spread.');
  await openTab(page, 'statistics');
  await expect(page.locator('#statisticsContent')).not.toBeEmpty();
});

test('牌卡資料庫與學習方格可以開啟卡片詳情', async ({ page }) => {
  await page.goto('/');
  await openTab(page, 'database');
  await page.locator('.card-db-item').first().click();
  await expect(page.locator('#cardModal')).toHaveClass(/show/);
  await expect(page.locator('#cardModalTitle')).toHaveText('愚者');
  await page.keyboard.press('Escape');

  await openTab(page, 'learn');
  await page.locator('.mastery-cell').first().click();
  await expect(page.locator('#cardModal')).toHaveClass(/show/);
});

test('關於視窗顯示版本與更新紀錄', async ({ page }) => {
  await page.goto('/');
  await page.locator('#linkAbout').click();
  await expect(page.locator('#aboutModal')).toHaveClass(/show/);
  await expect(page.locator('#aboutVersion')).toContainText(/\d+\.\d+\.\d+/);
  await expect(page.locator('#changelogList')).not.toBeEmpty();
});

test('匯出資料包含版本與紀錄', async ({ page }) => {
  await seedStorage(page, { interactiveDraw: 'false' });
  await page.goto('/');
  await page.locator('#readButton').click();
  await expect(page.locator('#results .card').first()).toBeVisible();
  await openTab(page, 'settings');
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.locator('#exportData').click()
  ]);
  const data = JSON.parse(await (await download.createReadStream()).toArray().then(b => Buffer.concat(b).toString('utf8')));
  expect(data.version).toMatch(/^\d+\.\d+\.\d+$/);
  expect(data.history).toHaveLength(1);
});

test.describe('圖片模式', () => {
  test.use({ allowedErrors: [/Failed to load resource: .* 404/] });
  test.beforeEach(async ({ page }) => {
    await seedStorage(page, { visualStyle: 'api' });
  });

  test('牌面圖片載入後淡入', async ({ page }) => {
    await page.goto('/?seed=123456789&spread=three&deck=full');
    const imgs = page.locator('#results img[data-card-photo]');
    await expect(imgs).toHaveCount(4);
    for (const img of await imgs.all()) await expect(img).toHaveCSS('opacity', '1');
    await expect(page.locator('#results .card-image-loading:visible')).toHaveCount(0);
  });

  test('小尺寸位置載入縮圖而不是原圖', async ({ page }) => {
    const requested = [];
    page.on('request', req => {
      if (req.url().includes('/img/cards/')) requested.push(new URL(req.url()).pathname);
    });
    await page.goto('/');
    await expect(page.locator('#dailyCard img')).toBeVisible();
    await expect.poll(() => page.locator('#dailyCard img').evaluate(img => img.currentSrc))
      .toMatch(/\/img\/cards\/160\/\w+\.avif$/);
    expect(requested.filter(p => /^\/img\/cards\/\w+\.\w+$/.test(p))).toEqual([]);
  });

  test('圖片載入失敗時顯示牌名', async ({ page }) => {
    await page.route(/\/img\/cards\/(\d+\/)?star\./, route => route.fulfill({ status: 404 }));
    await page.goto(SHARE_URL);
    await expect(page.locator('#results .card-image-failed-name').first()).toHaveText('星星');
  });
});

test('CSP 有送出，且主題初始化的 inline script 沒有被擋', async ({ page }) => {
  await seedStorage(page, { theme: 'dark' });
  const res = await page.goto('/');
  expect(res.headers()['content-security-policy']).toContain("script-src 'self' 'sha256-");
  await expect(page.locator('html')).toHaveClass(/dark/);
});

test.describe('離線', () => {
  test.use({ serviceWorkers: 'allow' });

  test('Service Worker 預先快取後，離線仍可占卜並查看卡片詳情', async ({ page, context }) => {
    await page.goto('/');
    await page.evaluate(() => navigator.serviceWorker.ready);
    await expect.poll(() => page.evaluate(() => !!navigator.serviceWorker.controller)).toBe(true);

    await context.setOffline(true);
    await page.goto('/?seed=123456789&spread=three&deck=full');
    await expect(page.locator('#results .card')).toHaveCount(4);
    await page.locator('#results .card').first().click();
    await page.locator('#cardModalSeg [data-seg="context"]').click();
    await expect(page.locator('#cardModalContextList')).not.toBeEmpty();
    await page.locator('#cardModalSeg [data-seg="lore"]').click();
    await expect(page.locator('#cardModalLoreList')).not.toBeEmpty();
  });
});

test.describe('不執行 JS', () => {
  test.use({ javaScriptEnabled: false });

  test('介面文字已預先寫進 HTML', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.hero-title')).toHaveText('探索內心的指引');
    await expect(page.locator('.tab[data-tab="history"]')).not.toBeEmpty();
    await expect(page.locator('#question')).toHaveAttribute('placeholder', /.+/);
  });
});

test('設定生日後，「我的牌」在文字與圖片模式都能正常顯示', async ({ page }) => {
  await seedStorage(page, { birthday: '1990-05-20', visualStyle: 'api' });
  await page.goto('/');
  await expect(page.locator('#profileCards')).toBeVisible();
  await expect(page.locator('#profileCards .profile-chip')).not.toHaveCount(0);
  await expect(page.locator('#profileCards .profile-chip img').first()).toBeVisible();
  await page.locator('#profileCards .profile-chip').first().click();
  await expect(page.locator('#cardModal')).toHaveClass(/show/);
});

test('manifest 與 apple-touch-icon 的圖示都存在', async ({ page, request }) => {
  await page.goto('/');
  const manifest = await (await request.get('/manifest.json')).json();
  const icons = [...manifest.icons.map(i => i.src), await page.locator('link[rel="apple-touch-icon"]').getAttribute('href')];
  expect(manifest.icons.some(i => i.purpose === 'maskable')).toBe(true);
  for (const src of icons) {
    const res = await request.get('/' + src);
    expect(res.status(), src).toBe(200);
  }
});

test('首頁標語只出現在占卜分頁', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.hero')).toBeVisible();
  await openTab(page, 'settings');
  await expect(page.locator('.hero')).toBeHidden();
  await page.reload();
  await expect(page.locator('.hero')).toBeHidden();
  await openTab(page, 'reading');
  await expect(page.locator('.hero')).toBeVisible();
});
