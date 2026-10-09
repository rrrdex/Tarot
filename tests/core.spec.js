import { test, expect, seedStorage, history, openTab } from './fixtures.js';

const THREE_URL = '/?seed=123456789&spread=three&deck=full';
const card = (nameKey, position, orientation = 'upright') => ({ nameKey, position, orientation });
function record(id, extra = {}) {
  return {
    id, timestamp: id, seed: id.toString(16).padStart(32, '0'), deckType: 'full', spreadType: 'three',
    spreadName: 'spread.three.name', question: `問題 ${id}`,
    drawnCards: [card('fool', 'spread.three.pos.0'), card('magician', 'spread.three.pos.1'), card('empress', 'spread.three.pos.2')],
    bottomCard: card('sun', 'spread.bottom', 'reversed'),
    favorite: false, tags: [], note: '', ...extra
  };
}
// 問題放在網址 # 後面（不會送到伺服器），其餘參數在 ? 後面
const param = (page, name) => {
  const url = new URL(page.url());
  if (name !== 'q') return url.searchParams.get(name);
  return url.hash.startsWith('#q=') ? new URLSearchParams(url.hash.slice(1)).get('q') : null;
};
const toast = (page) => page.locator('#toastContainer .toast-message');

test.describe('占卜流程與網址', () => {
  test('從記錄查看結果時，網址換成那一筆的 seed 與問題，焦點移到結果標題', async ({ page }) => {
    await seedStorage(page, { readingHistory: JSON.stringify([record(1700000000001), record(1700000000002, { seed: undefined })]) });
    await page.goto('/');
    await openTab(page, 'history');
    await page.locator('#historyList [data-action="viewReading"][data-id="1700000000001"]').click();
    await expect(page.locator('#tabReading')).toBeVisible();
    expect(param(page, 'seed')).toBe((1700000000001).toString(16).padStart(32, '0'));
    expect(param(page, 'q')).toBe('問題 1700000000001');
    await expect(page.locator('#results .results-title')).toBeFocused();
    // 沒有 seed 的舊紀錄：網址上的占卜參數清掉
    await openTab(page, 'history');
    await page.locator('#historyList [data-action="viewReading"][data-id="1700000000002"]').click();
    expect(param(page, 'seed')).toBeNull();
    expect(param(page, 'q')).toBeNull();
  });

  test('離開占卜分頁時網址不帶 seed，重新整理停在原分頁；回到占卜分頁再帶回來', async ({ page }) => {
    await page.goto(THREE_URL);
    await expect(page.locator('#results .card')).toHaveCount(4);
    await openTab(page, 'settings');
    expect(param(page, 'seed')).toBeNull();
    await page.reload();
    await expect(page.locator('#tabSettings')).toBeVisible();
    await page.goto(THREE_URL);
    await openTab(page, 'history');
    await openTab(page, 'reading');
    expect(param(page, 'seed')).toBe('123456789');
  });

  test('問題只放在網址 # 後面；舊版 ?q= 連結照樣讀得到，並改放到 # 後面', async ({ page }) => {
    await page.goto(`${THREE_URL}#q=${encodeURIComponent('我該換工作嗎')}`);
    await expect(page.locator('#question')).toHaveValue('我該換工作嗎');
    expect(new URL(page.url()).search).not.toContain('q=');
    await page.goto(`${THREE_URL}&q=${encodeURIComponent('舊連結的問題')}`);
    await expect(page.locator('#question')).toHaveValue('舊連結的問題');
    await expect(page.locator('#results .card')).toHaveCount(4);
    expect(new URL(page.url()).searchParams.has('q')).toBe(false);
    expect(param(page, 'q')).toBe('舊連結的問題');
    // canonical 不帶問題
    expect(await page.locator('link[rel="canonical"]').getAttribute('href')).not.toContain('q=');
  });

  test('分享連結的參數有誤：清掉網址並提示一次', async ({ page }) => {
    await page.goto('/?seed=not-a-seed&spread=three');
    await expect(toast(page)).toHaveText('分享連結的參數有誤，已略過無法使用的部分');
    expect(param(page, 'seed')).toBeNull();
    await page.goto('/?seed=123456789&spread=three&deck=full&picks=5-5-5');
    await expect(page.locator('#results .card')).toHaveCount(4);
    await expect(toast(page)).toHaveCount(1);
    expect(param(page, 'picks')).toBeNull();
  });

  test('選牌中切換牌面樣式不會毀掉選牌；取消後也不會帶回舊結果', async ({ page }) => {
    await page.goto(THREE_URL);
    await expect(page.locator('#results .card')).toHaveCount(4);
    await page.locator('#readButton').click();
    await page.locator('.pick-card').first().click();
    await openTab(page, 'settings');
    await page.locator('input[name="visualStyle"][value="line"]').check({ force: true });
    await expect(toast(page).filter({ hasText: '已切換至線稿模式' })).toHaveCount(1);
    await openTab(page, 'reading');
    await expect(page.locator('.pick-card.selected')).toHaveCount(1);
    await page.locator('#pickCancel').click();
    await expect(page.locator('#readButton')).toBeFocused();
    await openTab(page, 'settings');
    await page.locator('input[name="visualStyle"][value="text"]').check({ force: true });
    await openTab(page, 'reading');
    await expect(page.locator('#results .card')).toHaveCount(0);
  });

  test('選完最後一張後馬上重新洗牌：舊的那次不會蓋掉畫面，也不會被存下', async ({ page }) => {
    await page.goto('/');
    await page.locator('#readButton').click();
    // 預設是單張牌陣：選一張就排定 450ms 後完成；在那之前重新洗牌
    await page.locator('.pick-card').first().dispatchEvent('click');
    await page.locator('#pickReshuffle').dispatchEvent('click');
    await page.waitForTimeout(700);
    await expect(page.locator('#pickGrid')).toBeVisible();
    expect(await history(page)).toHaveLength(0);
  });

  test('選牌方格：選過後 Tab 位置交給下一張、進度是 status、已選的牌念出順序', async ({ page }) => {
    await seedStorage(page, { tab: 'reading' });
    await page.goto('/');
    await page.locator('#spreadType').evaluate(el => { el.value = 'three'; el.dispatchEvent(new Event('change')); });
    await page.locator('#readButton').click();
    await expect(page.locator('#pickProgress')).toHaveAttribute('role', 'status');
    const first = page.locator('.pick-card').first();
    await first.focus();
    await page.keyboard.press('Enter');
    // 數字與「張」之間是不斷行空格
    await expect(first).toHaveAttribute('aria-label', /^第\s1\s張牌背，已選為第\s1\s張$/);
    await expect(page.locator('.pick-card').nth(1)).toBeFocused();
    await expect(page.locator('.pick-card[tabindex="0"]')).toHaveCount(1);
    await expect(page.locator('.pick-card').nth(1)).toHaveAttribute('tabindex', '0');
  });

  test('非互動抽牌：按鈕以 aria-disabled 標示忙碌、保留可念的文字，焦點不掉', async ({ page }) => {
    await seedStorage(page, { interactiveDraw: 'false' });
    await page.goto('/');
    await page.locator('#readButton').click();
    await expect(page.locator('#readButton')).toHaveAttribute('aria-disabled', 'true');
    await expect(page.locator('#readButton .visually-hidden')).toHaveText('占卜中…');
    await expect(page.locator('#readButton')).toBeFocused();
    // 忙碌中再按一次不會多抽一次
    await page.locator('#readButton').evaluate(el => el.click());
    await expect(page.locator('#results .results-title')).toBeFocused();
    await expect(page.locator('#readButton')).not.toHaveAttribute('aria-disabled', 'true');
    expect(await history(page)).toHaveLength(1);
  });

  test('分享圖連按兩次只下載一次', async ({ page }) => {
    await page.goto(THREE_URL);
    let downloads = 0;
    page.on('download', () => { downloads++; });
    const btn = page.locator('[data-action="generateShareImage"]');
    await btn.dblclick();
    await expect(toast(page).filter({ hasText: '分享圖已下載' })).toHaveCount(1);
    await page.waitForTimeout(300);
    expect(downloads).toBe(1);
  });

  test('列印只印結果', async ({ page }) => {
    await seedStorage(page, { birthday: '1990-05-20' });
    await page.goto(THREE_URL);
    await expect(page.locator('#results .card')).toHaveCount(4);
    await page.emulateMedia({ media: 'print' });
    for (const sel of ['#dailyCard', '#profileCards', '#tabReading > .panel', '#spreadInfo']) {
      await expect(page.locator(sel)).toBeHidden();
    }
    // 結果改印逐張解讀：牌面版型不印，每個牌位（含底牌）連同牌義都印出來
    await expect(page.locator('#results .card').first()).toBeHidden();
    await expect(page.locator('#results .rd-item')).toHaveCount(4);
    await expect(page.locator('#results .rd-text-body').first()).toBeVisible();
  });

  test('超過 100 筆時先刪最舊的一般紀錄，收藏與有筆記的保留', async ({ page }) => {
    const old = Array.from({ length: 100 }, (_, i) => record(1600000000000 + i, i < 2 ? { favorite: true } : i < 4 ? { note: '留著' } : {}));
    await seedStorage(page, { readingHistory: JSON.stringify(old), interactiveDraw: 'false' });
    await page.goto('/');
    await page.locator('#readButton').click();
    await expect(toast(page).filter({ hasText: '已移除最舊的 1 筆' })).toHaveCount(1);
    const ids = (await history(page)).map(r => r.id);
    expect(ids).toHaveLength(100);
    for (const keep of [1600000000000, 1600000000001, 1600000000002, 1600000000003]) expect(ids).toContain(keep);
    expect(ids).not.toContain(1600000000004);
  });
});

test.describe('鍵盤', () => {
  test('空白鍵：設定分頁照常捲動；占卜分頁焦點在頁面本身時才抽牌', async ({ page }) => {
    await seedStorage(page, { interactiveDraw: 'false' });
    await page.goto('/');
    await openTab(page, 'settings');
    await page.evaluate(() => document.activeElement.blur());
    await page.keyboard.press('Space');
    await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(0);
    expect(await history(page)).toHaveLength(0);
    await openTab(page, 'reading');
    await page.evaluate(() => { document.activeElement.blur(); scrollTo(0, 0); });
    await page.keyboard.press('Space');
    await expect.poll(async () => (await history(page)).length).toBe(1);
  });

  test('按過按鈕後數字鍵仍可切換分頁；Shift+T、Ctrl+數字不觸發', async ({ page }) => {
    await page.goto('/');
    await page.locator('#shareButton').focus();
    await page.keyboard.press('3');
    await expect(page.locator('#tabStatistics')).toBeVisible();
    const cls = await page.locator('html').getAttribute('class');
    await page.keyboard.press('Shift+T');
    expect(await page.locator('html').getAttribute('class')).toBe(cls);
    await page.locator('.tab[data-tab="statistics"]').focus();
    await page.keyboard.press('Control+2');
    await expect(page.locator('#tabStatistics')).toBeVisible();
  });

  test('29 種牌陣的每一張牌都能只用方向鍵走到', async ({ page }) => {
    test.setTimeout(240000);
    await page.goto('/');
    const spreads = await page.$$eval('#spreadType option', os => os.map(o => o.value));
    expect(spreads).toHaveLength(29);
    for (const s of spreads) {
      await page.goto(`/?seed=123456789&spread=${s}&deck=full`);
      await expect(page.locator('#results .card').first()).toBeVisible();
      await page.addStyleTag({ content: '*{animation:none!important;transition:none!important}html{scroll-behavior:auto!important}' });
      const res = await page.evaluate(async () => {
        const frame = () => new Promise(r => requestAnimationFrame(() => setTimeout(r, 0)));
        const items = [...document.querySelector('#results [data-keynav]').querySelectorAll('[data-keynav-item]')];
        const seen = new Set([0]);
        const queue = [0];
        while (queue.length) {
          const i = queue.shift();
          for (const key of ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']) {
            items[i].focus();
            await frame();
            items[i].dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
            await frame();
            const j = items.indexOf(document.activeElement);
            if (j >= 0 && !seen.has(j)) { seen.add(j); queue.push(j); }
          }
        }
        return { n: items.length, reached: seen.size };
      });
      expect(res.reached, s).toBe(res.n);
    }
  });
});

test.describe('視窗與焦點', () => {
  test('卡片詳情的 Tab 循環不經過分段按鈕裡 tabindex=-1 的那幾顆', async ({ page }) => {
    await page.goto(THREE_URL);
    await page.locator('#results .card').first().click();
    await expect(page.locator('#cardModal')).toHaveClass(/show/);
    const visited = [];
    for (let i = 0; i < 8; i++) {
      await page.keyboard.press('Tab');
      visited.push(await page.evaluate(() => document.activeElement.tabIndex));
    }
    expect(visited.every(ti => ti >= 0)).toBe(true);
  });

  test('確認視窗是 alertdialog、念出訊息，焦點先在「取消」；筆記視窗焦點在文字框', async ({ page }) => {
    await seedStorage(page, { readingHistory: JSON.stringify([record(1700000000001)]), tab: 'history' });
    await page.goto('/');
    await page.locator('#historyList [data-action="deleteReading"]').click();
    const dialog = page.locator('#confirmModal .modal');
    await expect(dialog).toHaveAttribute('role', 'alertdialog');
    await expect(dialog).toHaveAttribute('aria-describedby', 'confirmMessage');
    await expect(page.locator('#confirmCancel')).toBeFocused();
    await page.keyboard.press('Escape');
    await page.locator('#historyList [data-action="openNoteModal"]').click();
    await expect(page.locator('#noteText')).toBeFocused();
  });

  test('卡片詳情標出這次抽到的正逆位；小牌副標不重複位階', async ({ page }) => {
    await page.goto(THREE_URL);
    const first = page.locator('#results .card').first();
    const ori = await first.getAttribute('data-orientation');
    await first.click();
    const block = ori === 'reversed' ? '#meaningReversed' : '#meaningUpright';
    await expect(page.locator(`${block} .meaning-title`)).toHaveAttribute('aria-current', 'true');
    await expect(page.locator(`${block} .meaning-drawn`)).toHaveText('（本次抽到）');
    await expect(page.locator('#cardModalSub')).toContainText(`本次抽到${ori === 'reversed' ? '逆位' : '正位'}`);
    await page.keyboard.press('Escape');
    await openTab(page, 'database');
    await page.locator('.card-db-item[data-card="three_of_cups"]').click();
    await expect(page.locator('#cardModalSub')).toHaveText('Three of Cups · 聖杯');
  });
});

test.describe('記錄', () => {
  test('自訂標籤可以取消，Enter 直接儲存；切換標籤後焦點留在同一個標籤上', async ({ page }) => {
    await seedStorage(page, { readingHistory: JSON.stringify([record(1700000000001, { tags: ['自訂一'] })]), tab: 'history' });
    await page.goto('/');
    await page.locator('#historyList [data-action="openTagModal"]').click();
    const custom = page.locator('#commonTags .tag', { hasText: '自訂一' });
    await expect(custom).toHaveAttribute('aria-pressed', 'true');
    await custom.click();
    await expect(page.locator('#commonTags .tag', { hasText: '自訂一' })).toBeFocused();
    await page.locator('#customTag').fill('新標籤');
    await page.locator('#customTag').press('Enter');
    await expect(page.locator('#tagModal')).not.toHaveClass(/show/);
    expect((await history(page))[0].tags).toEqual(['新標籤']);
    await expect(page.locator('#historyList [data-action="openTagModal"]')).toBeFocused();
  });

  test('刪除後焦點移到下一筆；取消收藏而被篩掉時移到下一筆的星號', async ({ page }) => {
    const list = [record(3, { favorite: true }), record(2, { favorite: true }), record(1, { favorite: true })];
    await seedStorage(page, { readingHistory: JSON.stringify(list), tab: 'history' });
    await page.goto('/');
    await page.locator('#historyList [data-action="deleteReading"][data-id="3"]').click();
    await page.locator('#confirmOk').click();
    await expect(page.locator('#historyList [data-action="viewReading"][data-id="2"]')).toBeFocused();
    await page.locator('#filterFavorite').click();
    await page.locator('#historyList [data-action="toggleFavorite"][data-id="2"]').click();
    await expect(page.locator('#historyList [data-action="toggleFavorite"][data-id="1"]')).toBeFocused();
  });

  test('列表顯示筆記摘要、按鈕有說明是哪一筆；結果頁的筆記保留換行', async ({ page }) => {
    await seedStorage(page, { readingHistory: JSON.stringify([record(1700000000001, { note: '第一行\n第二行' })]), tab: 'history' });
    await page.goto('/');
    await expect(page.locator('.history-note')).toContainText('第一行 第二行');
    const del = page.locator('#historyList [data-action="deleteReading"]');
    await expect(del).toHaveAccessibleDescription(/三張牌|聖三角|\d{4}\/\d{2}\/\d{2}/);
    await page.locator('#historyList [data-action="viewReading"]').click();
    await expect(page.locator('.card-notes')).toHaveCSS('white-space', 'pre-wrap');
  });

  test('沒有任何記錄時隱藏篩選列，提供回占卜分頁的按鈕', async ({ page }) => {
    await seedStorage(page, { tab: 'history' });
    await page.goto('/');
    await expect(page.locator('#historyList')).toContainText('還沒有占卜記錄');
    await expect(page.locator('#tabHistory .history-controls')).toBeHidden();
    await page.locator('#historyList [data-action="goToReading"]').click();
    await expect(page.locator('#question')).toBeFocused();
  });
});

test.describe('匯入與資料', () => {
  async function importFile(page, data) {
    await openTab(page, 'settings');
    const [chooser] = await Promise.all([page.waitForEvent('filechooser'), page.locator('#importData').click()]);
    await chooser.setFiles({ name: 'backup.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify(data)) });
  }

  test('匯入的紀錄依牌庫重建：認不出的牌整筆捨棄，牌名欄位的標記不會進到頁面；重複 id 會分開', async ({ page }) => {
    const evil = '<img src=x onerror="window.__pwned=1">';
    const good = record(5, { drawnCards: [{ nameKey: 'fool', name: evil, englishName: evil, number: evil, suit: evil, position: 'spread.three.pos.0' }, card('magician', 'spread.three.pos.1'), card('empress', 'spread.three.pos.2')], tags: ['ok', { x: 1 }, 3] });
    const unknown = record(6, { drawnCards: [card('nope" onmouseover="x', 'spread.three.pos.0'), card('magician', 'p'), card('empress', 'p')] });
    await page.goto('/');
    await importFile(page, { history: [good, unknown, record(5)] });
    await expect(page.locator('#confirmMessage')).toHaveText('將匯入 2 筆記錄。');
    await page.locator('#confirmOk').click();
    await expect.poll(async () => (await history(page)).length).toBe(2);
    const saved = await history(page);
    expect(new Set(saved.map(r => r.id)).size).toBe(2);
    expect(saved[0].drawnCards[0].name).toBe('愚者');
    expect(saved[0].tags).toEqual(['ok']);
    await openTab(page, 'history');
    await page.locator('#historyList [data-action="viewReading"]').first().click();
    await expect(page.locator('#results .card').first()).toBeVisible();
    expect(await page.evaluate(() => window.__pwned)).toBeUndefined();
  });

  test('沒有可用紀錄的檔案不會清空現有的記錄', async ({ page }) => {
    await seedStorage(page, { readingHistory: JSON.stringify([record(1700000000001)]) });
    await page.goto('/');
    await importFile(page, { history: [{ junk: true }] });
    await expect(toast(page)).toHaveText('檔案裡沒有可用的占卜記錄，已取消匯入');
    expect(await history(page)).toHaveLength(1);
  });

  test('使用者文字裡的 {佔位符} 不會被代換', async ({ page }) => {
    await seedStorage(page, { readingHistory: JSON.stringify([record(1700000000001, { spreadName: '{time}' })]), tab: 'history' });
    await page.goto('/');
    await expect(page.locator('#historyList .history-open')).toHaveAttribute('aria-label', /^查看結果：\{time\}，/);
  });

  test('清除所有資料後網址不再帶著舊的占卜', async ({ page }) => {
    await page.goto(THREE_URL);
    await openTab(page, 'settings');
    await page.locator('#clearAllData').click();
    await page.locator('#confirmOk').click();
    await page.waitForURL(url => !url.search.includes('seed'));
    await expect(page.locator('#results .card')).toHaveCount(0);
  });

  test('未來的生日被拒絕後，欄位回到原本儲存的值', async ({ page }) => {
    await seedStorage(page, { birthday: '1990-05-20', tab: 'settings' });
    await page.goto('/');
    const input = page.locator('#birthdayInput');
    await input.fill('2999-01-01');
    await input.blur();
    await expect(toast(page)).toHaveText('生日不能是未來的日期');
    await expect(input).toHaveValue('1990-05-20');
  });
});

test.describe('儲存空間與載入失敗', () => {
  test('網站資料被封鎖時照常運作', async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(window, 'localStorage', { get() { throw new DOMException('The operation is insecure.', 'SecurityError'); } });
    });
    await page.goto('/');
    await expect(page.locator('#dailyCard')).toBeVisible();
    await page.locator('#readButton').click();
    await page.locator('#pickRandom').click();
    await expect(page.locator('#results .card').first()).toBeVisible();
    await expect(toast(page).filter({ hasText: '無法寫入瀏覽器的儲存空間' })).toHaveCount(1);
    // 讀不到設定時是預設版型（星夜玻璃）：用底部導覽列換分頁
    await page.locator('.tpl-nav-item[data-nav="history"]').click();
    await expect(page.locator('.tpl-nav-item[data-nav="history"]')).toHaveAttribute('aria-current', 'page');
    await expect(page.locator('#tabHistory')).toBeVisible();
  });

  test('寫入超過容量時結果照樣顯示、按鈕不卡在轉圈，只提示一次', async ({ page }) => {
    await seedStorage(page, { interactiveDraw: 'false' });
    await page.addInitScript(() => {
      Storage.prototype.setItem = function () { throw new DOMException('Quota exceeded', 'QuotaExceededError'); };
    });
    await page.goto('/');
    await page.locator('#readButton').click();
    await expect(page.locator('#results .card').first()).toBeVisible();
    await expect(page.locator('#readButton')).not.toHaveAttribute('aria-disabled', 'true');
    await openTab(page, 'history');
    await expect(toast(page).filter({ hasText: '無法寫入瀏覽器的儲存空間' })).toHaveCount(1);
  });

});

test.describe('程式片段載入失敗', () => {
  test.use({ allowedErrors: [/Failed to load resource/] });

  test('程式片段載不到時，卡片詳情與更新紀錄顯示「需要網路」；線稿牌組載不到就退回原樣式', async ({ page }) => {
    await page.route(/\/chunks\/(lore|contexts|changelog|deck)-/, route => route.abort());
    await page.goto(THREE_URL);
    await page.locator('#results .card').first().click();
    await page.locator('#cardModalSeg [data-seg="lore"]').click();
    await expect(page.locator('#cardModalLoreList')).toHaveText('需要網路，請重新整理');
    await page.locator('#cardModalSeg [data-seg="context"]').click();
    await expect(page.locator('#cardModalContextList')).toHaveText('需要網路，請重新整理');
    await page.keyboard.press('Escape');
    await page.locator('#linkAbout').click();
    await expect(page.locator('#changelogList')).toHaveText('需要網路，請重新整理');
    await page.keyboard.press('Escape');
    await openTab(page, 'settings');
    // 載入失敗會馬上把選項改回去，所以用 click 而不是 check（check 會驗證最後是勾選的）
    await page.locator('input[name="visualStyle"][value="line"]').click({ force: true });
    await expect(toast(page).filter({ hasText: '線稿牌組載入失敗' })).toHaveCount(1);
    await expect(page.locator('input[name="visualStyle"][value="text"]')).toBeChecked();
    await expect(toast(page).filter({ hasText: '已切換至' })).toHaveCount(0);
  });

  test('線稿模式開分享連結：不等牌組就先畫出結果，牌組到了再補上插畫', async ({ page }) => {
    await seedStorage(page, { visualStyle: 'line' });
    let release;
    const gate = new Promise(r => { release = r; });
    await page.route(/\/chunks\/deck-/, async route => { await gate; await route.continue(); });
    await page.goto(THREE_URL);
    await expect(page.locator('#results .card')).toHaveCount(4);
    await expect(page.locator('#results svg.line-art')).toHaveCount(0);
    release();
    await expect(page.locator('#results svg.line-art')).toHaveCount(4);
  });

  test('記住的分頁在 JS 執行前就顯示，不先閃一下占卜分頁', async ({ page }) => {
    await seedStorage(page, { tab: 'settings' });
    await page.route(/\/js\/app-/, route => route.abort());
    await page.goto('/');
    await expect(page.locator('#tabSettings')).toBeVisible();
    await expect(page.locator('#tabReading')).toBeHidden();
  });
});

test.describe('建置輸出', () => {
  test.skip(({ isMobile }) => isMobile, '只檢查檔案，跑一次就好');
  test('不附 source map 與原始牌圖，HTML 帶 CSP meta', async ({ page, request }) => {
    const res = await page.goto('/');
    const html = await res.text();
    expect(html).toMatch(/<meta http-equiv="Content-Security-Policy" content="[^"]*script-src 'self' 'sha256-/);
    expect(html).not.toContain('frame-ancestors');
    const app = html.match(/src="(js\/app-[^"]+\.js)"/)[1];
    expect((await request.get('/' + app + '.map')).status()).toBe(404);
    expect((await request.get('/img/cards_original.rar')).status()).toBe(404);
    expect((await request.get('/img/cards/fool.jpg')).status()).toBe(404);
    expect((await request.get('/img/cards/fool.webp')).status()).toBe(200);
  });
});
