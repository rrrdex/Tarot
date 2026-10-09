import { test, expect, seedStorage, openTab } from './fixtures.js';

// 新版型（星夜玻璃、現代編輯、沉浸手勢）共用的版面與行為；簡約版型的行為由其他測試檔負責
const NEW_TEMPLATES = ['aurora', 'editorial', 'immersive'];
const THREE_URL = '/?seed=123456789&spread=three&deck=full';
const nav = (page, name) => page.locator(`.tpl-nav-item[data-nav="${name}"]`);
const overflowX = (page) => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
// 數字與中文單位之間是不斷行空格：比對前換回一般空格
const plainText = (loc) => loc.evaluate(el => el.textContent.replace(/\u00a0/g, ' '));
// 觸控滑動：合成 pointer 事件（滑鼠拖曳在翻頁器上是選取文字，不換張）
async function touchSwipe(locator, dx) {
  await locator.evaluate((el, dx) => {
    const r = el.getBoundingClientRect();
    const y = r.top + Math.min(40, r.height / 2);
    const x0 = r.left + r.width / 2;
    const ev = (type, x) => new PointerEvent(type, { pointerId: 9, pointerType: 'touch', isPrimary: true, clientX: x, clientY: y, bubbles: true });
    el.dispatchEvent(ev('pointerdown', x0));
    el.dispatchEvent(ev('pointerup', x0 + dx));
  }, dx);
}
async function mouseDrag(page, locator, dy, steps = 10) {
  const b = await locator.boundingBox();
  const x = b.x + Math.min(40, b.width / 2);
  const y = b.y + Math.min(24, b.height / 2);
  await page.mouse.move(x, y);
  await page.mouse.down();
  for (let i = 1; i <= steps; i++) await page.mouse.move(x, y + (dy * i) / steps);
  await page.mouse.up();
}

test.describe('選擇版型', () => {
  test('在設定切換版型會立即套用並記住；切回簡約恢復原本的分頁列', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('data-template', 'minimal');
    await expect(page.locator('.tpl-nav')).toBeHidden();
    await openTab(page, 'settings');
    await page.locator('input[name="templatePref"][value="aurora"]').check();
    await expect(page.locator('html')).toHaveAttribute('data-template', 'aurora');
    // 星夜玻璃是預設：選它就是回到預設，不另外記
    expect(await page.evaluate(() => localStorage.getItem('template'))).toBeNull();
    await expect(page.locator('.tabs')).toBeHidden();
    await expect(page.locator('.tpl-nav')).toBeVisible();
    // 仍在設定：導覽列的「設定」是目前項目
    await expect(nav(page, 'settings')).toHaveAttribute('aria-current', 'page');
    await page.locator('input[name="templatePref"][value="minimal"]').check();
    await expect(page.locator('html')).toHaveAttribute('data-template', 'minimal');
    expect(await page.evaluate(() => localStorage.getItem('template'))).toBe('minimal');
    await expect(page.locator('.tabs')).toBeVisible();
    await expect(page.locator('.tpl-nav')).toBeHidden();
    await expect(page.locator('#meHub')).toBeHidden();
  });

  test.describe('不等 JS', () => {
    // 擋掉主程式：證明版型與它的配色是 inline script 加樣式表在繪製前套用的
    test.use({ allowedErrors: [/Failed to load resource|ERR_FAILED/] });
    test('重新整理後，版型在主程式執行前就已套用', async ({ page }) => {
      await seedStorage(page, { template: 'editorial', theme: 'dark' });
      await page.route(/\/js\/app[^/]*\.js$/, route => route.abort());
      await page.goto('/');
      await expect(page.locator('html')).toHaveAttribute('data-template', 'editorial');
      await expect(page.locator('.tabs')).toBeHidden();
      await expect(page.locator('.tpl-nav')).toBeVisible();
      expect(await page.evaluate(() => getComputedStyle(document.body).backgroundColor)).toBe('rgb(18, 19, 22)');
    });
  });

  test('跟隨系統：系統深色時用版型的深色配色，選淺色時用淺色配色', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await seedStorage(page, { template: 'immersive' });
    await page.goto('/');
    const bg = () => page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    expect(await bg()).toBe('rgb(13, 22, 19)');
    expect(await page.locator('meta[name="theme-color"]').getAttribute('content')).toBe('#0D1613');
    await page.keyboard.press('t');
    await expect(page.locator('html')).toHaveClass(/\blight\b/);
    // body 的底色有轉場，等它走完
    await expect.poll(bg).toBe('rgb(228, 236, 232)');
    expect(await page.locator('meta[name="theme-color"]').getAttribute('content')).toBe('#E4ECE8');
  });

  test.describe('沒選過版型', () => {
    test.use({ defaultTemplate: null });
    test('預設是星夜玻璃', async ({ page }) => {
      await page.goto('/');
      await expect(page.locator('html')).toHaveAttribute('data-template', 'aurora');
      await expect(page.locator('.tpl-nav')).toBeVisible();
      await nav(page, 'settings').click();
      await expect(page.locator('input[name="templatePref"][value="aurora"]')).toBeChecked();
    });
  });

  for (const tpl of NEW_TEMPLATES) {
    test(`${tpl}：霓虹主題是這個版型自己的霓虹配色，不是深色；回到簡約是簡約的霓虹`, async ({ page }) => {
      await seedStorage(page, { template: tpl, theme: 'dark' });
      await page.goto('/');
      const themeColor = () => page.locator('meta[name="theme-color"]').getAttribute('content');
      const darkBg = await themeColor();
      await nav(page, 'settings').click();
      await page.locator('input[name="themePref"][value="neon"]').check();
      await expect(page.locator('html')).toHaveClass(/\btpl-neon\b/);
      await expect(page.locator('html')).not.toHaveClass(/(^|\s)neon(\s|$)/);
      await expect(page.locator('#desc-settings-theme-neon-desc')).toHaveText('夜色配上霓虹光，配色依版型調整；線稿模式的牌依花色發光');
      // 網址列顏色換成霓虹配色的底色
      await expect.poll(themeColor).not.toBe(darkBg);
      // 重新整理後在繪製前就套用
      await page.reload();
      await expect(page.locator('html')).toHaveClass(/\btpl-neon\b/);
      await page.locator('input[name="templatePref"][value="minimal"]').check();
      await expect(page.locator('html')).toHaveClass(/(^|\s)neon(\s|$)/);
      await expect(page.locator('html')).not.toHaveClass(/\btpl-neon\b/);
      await expect(page.locator('html')).not.toHaveClass(/\bdark\b/);
      expect(await themeColor()).toBe('#05080f');
    });
  }

  test('匯出與匯入包含版型與觸覺回饋', async ({ page }) => {
    await seedStorage(page, { template: 'immersive', haptics: 'false' });
    await page.goto('/');
    await nav(page, 'settings').click();
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.locator('#exportData').click()
    ]);
    const data = JSON.parse(await (await download.createReadStream()).toArray().then(b => Buffer.concat(b).toString('utf8')));
    expect(data.prefs.template).toBe('immersive');
    expect(data.prefs.haptics).toBe('false');
    const [chooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      page.locator('#importData').click()
    ]);
    await chooser.setFiles({
      name: 'backup.json',
      mimeType: 'application/json',
      buffer: Buffer.from(JSON.stringify({ history: [], prefs: { template: 'editorial', haptics: 'true' } }))
    });
    await page.locator('#confirmOk').click();
    await expect(page.locator('html')).toHaveAttribute('data-template', 'editorial');
    await expect(page.locator('input[name="templatePref"][value="editorial"]')).toBeChecked();
    expect(await page.evaluate(() => [localStorage.getItem('template'), localStorage.getItem('haptics')])).toEqual(['editorial', 'true']);
  });
});

test.describe('導覽列', () => {
  for (const tpl of NEW_TEMPLATES) {
    test(`${tpl}：六個項目各自切換分頁，個人牌在統計最上面，數字快捷鍵照常可用`, async ({ page }) => {
      await seedStorage(page, { template: tpl, birthday: '1990-05-20' });
      await page.goto('/');
      await expect(page.locator('.tabs')).toBeHidden();
      await expect(page.getByRole('navigation', { name: '主要分頁' })).toBeVisible();
      await expect(page.locator('.tpl-nav-item')).toHaveCount(6);
      await expect(page.locator('.tpl-nav-label')).toHaveText(['占卜', '記錄', '學習', '資料庫', '統計', '設定']);
      await expect(nav(page, 'reading')).toHaveAttribute('aria-current', 'page');
      // 個人牌在統計分頁最上面，不在占卜分頁
      await expect(page.locator('#tabReading #profileCards')).toHaveCount(0);
      await expect(page.locator('#meHub')).toBeHidden();
      for (const [name, panel] of [['history', '#tabHistory'], ['learn', '#tabLearn'], ['database', '#tabDatabase'], ['statistics', '#tabStatistics'], ['settings', '#tabSettings']]) {
        await nav(page, name).click();
        await expect(page.locator(panel)).toBeVisible();
        await expect(nav(page, name)).toHaveAttribute('aria-current', 'page');
        await expect(page.locator('.tpl-nav-item[aria-current]')).toHaveCount(1);
        await expect(page.locator('#meHub')).toBeVisible({ visible: name === 'statistics' });
      }
      await nav(page, 'statistics').click();
      await expect(page.locator('#meHub #profileCards .profile-chip')).toHaveCount(5);
      await nav(page, 'database').click();
      await page.locator('#tabDatabase .results-title').click();
      await page.keyboard.press('3');
      await expect(page.locator('#tabStatistics')).toBeVisible();
      await expect(nav(page, 'statistics')).toHaveAttribute('aria-current', 'page');
      await page.keyboard.press('1');
      await expect(page.locator('#tabReading')).toBeVisible();
      await expect(nav(page, 'reading')).toHaveAttribute('aria-current', 'page');
    });
  }

  test('提示訊息排在頂端標題列下方，不蓋住主題切換鈕', async ({ page }) => {
    await seedStorage(page, { template: 'immersive' });
    await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto(THREE_URL);
    await page.locator('[data-action="copyResults"]').click();
    const toast = page.locator('.toast').first();
    await expect(toast).toBeVisible();
    // 提示訊息會滑入，等動畫停下再量位置
    const h = await page.locator('.app-header').boundingBox();
    await expect.poll(async () => (await toast.boundingBox()).y).toBeGreaterThanOrEqual(h.y + h.height);
  });

  test('換分頁回到頂端，不沿用上一頁捲到的位置', async ({ page }) => {
    await seedStorage(page, { template: 'editorial' });
    await page.goto('/');
    await nav(page, 'database').click();
    await expect(page.locator('#tabDatabase')).toBeVisible();
    await page.evaluate(() => window.scrollTo(0, 2000));
    expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(500);
    await nav(page, 'history').click();
    await expect(page.locator('#tabHistory')).toBeVisible();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  });

  test('窄螢幕在底部，1024px 以上是左側直欄；每個項目至少 44px', async ({ page }) => {
    await seedStorage(page, { template: 'aurora' });
    await page.setViewportSize({ width: 375, height: 760 });
    await page.goto('/');
    const bottom = await page.locator('.tpl-nav').boundingBox();
    expect(Math.round(bottom.y + bottom.height)).toBe(760);
    expect(Math.round(bottom.width)).toBe(375);
    await page.setViewportSize({ width: 1280, height: 800 });
    const rail = await page.locator('.tpl-nav').boundingBox();
    expect(rail.x).toBe(0);
    expect(Math.round(rail.height)).toBe(800);
    expect(rail.width).toBeLessThan(120);
    for (const width of [375, 1280]) {
      await page.setViewportSize({ width, height: 800 });
      const small = await page.locator('.tpl-nav-item').evaluateAll(els => els.filter(e => {
        const r = e.getBoundingClientRect();
        return r.width < 44 || r.height < 44;
      }).length);
      expect(small, `${width}px`).toBe(0);
    }
  });

  test('切換分頁：新版型用 View Transitions，減少動態與簡約版型時不用', async ({ page }) => {
    await page.addInitScript(() => {
      window.__vt = 0;
      document.startViewTransition = (cb) => { window.__vt++; cb(); return { finished: Promise.resolve(), ready: Promise.resolve(), updateCallbackDone: Promise.resolve() }; };
    });
    await seedStorage(page, { template: 'editorial' });
    await page.goto('/');
    await nav(page, 'history').click();
    await expect(page.locator('#tabHistory')).toBeVisible();
    expect(await page.evaluate(() => window.__vt)).toBe(1);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await nav(page, 'learn').click();
    await expect(page.locator('#tabLearn')).toBeVisible();
    expect(await page.evaluate(() => window.__vt)).toBe(1);
  });
});

test.describe('視窗抽屜', () => {
  test('窄螢幕：視窗是底部抽屜，Esc 關閉、焦點回到原處；往下拖把手可關閉，拖太短會彈回', async ({ page }) => {
    await seedStorage(page, { template: 'immersive' });
    await page.setViewportSize({ width: 375, height: 760 });
    await page.goto('/');
    const overlay = page.locator('#aboutModal');
    const modal = overlay.locator('.modal');
    await page.locator('#linkAbout').click();
    await expect(overlay).toHaveClass(/show/);
    await expect(modal.locator('.modal-close')).toBeFocused();
    await expect.poll(async () => { const b = await modal.boundingBox(); return Math.round(b.y + b.height); }).toBe(760);
    expect(Math.round((await modal.boundingBox()).width)).toBe(375);
    await expect(modal).toHaveAttribute('aria-modal', 'true');
    await page.keyboard.press('Escape');
    await expect(overlay).not.toHaveClass(/show/);
    await expect(page.locator('#linkAbout')).toBeFocused();

    await page.locator('#linkAbout').click();
    await expect(overlay).toHaveClass(/show/);
    await expect.poll(async () => { const b = await modal.boundingBox(); return Math.round(b.y + b.height); }).toBe(760);
    // 拖一小段就放開：彈回，仍開著
    await mouseDrag(page, modal.locator('.modal-header'), 24, 3);
    await page.waitForTimeout(400);
    await expect(overlay).toHaveClass(/show/);
    // 拖遠：關閉，焦點回到開啟它的連結
    await mouseDrag(page, modal.locator('.modal-header'), 320);
    await expect(overlay).not.toHaveClass(/show/);
    await expect(page.locator('#linkAbout')).toBeFocused();
  });

  test('窄螢幕：在視窗內容上往下拖是捲動，不會關閉視窗', async ({ page }) => {
    await seedStorage(page, { template: 'aurora' });
    await page.setViewportSize({ width: 375, height: 760 });
    await page.goto('/');
    await page.locator('#linkAbout').click();
    await expect(page.locator('#aboutModal')).toHaveClass(/show/);
    await mouseDrag(page, page.locator('#aboutModal .about-intro'), 300);
    await page.waitForTimeout(400);
    await expect(page.locator('#aboutModal')).toHaveClass(/show/);
  });

  test('寬螢幕：視窗是右側面板；牌面放大檢視維持置中', async ({ page }) => {
    await seedStorage(page, { template: 'editorial', visualStyle: 'api' });
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(THREE_URL);
    await page.locator('#results .card').first().click();
    const modal = page.locator('#cardModal .modal');
    await expect(page.locator('#cardModal')).toHaveClass(/show/);
    await expect.poll(async () => { const b = await modal.boundingBox(); return Math.round(b.x + b.width); }).toBe(1280);
    expect(Math.round((await modal.boundingBox()).height)).toBe(800);
    await page.locator('.card-modal-art-btn').click();
    await expect(page.locator('#cardViewer')).toHaveClass(/show/);
    const viewer = await page.locator('#cardViewerArt').boundingBox();
    expect(Math.abs(viewer.x + viewer.width / 2 - 640)).toBeLessThan(4);
    await page.keyboard.press('Escape');
    await expect(page.locator('.card-modal-art-btn')).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(page.locator('#cardModal')).not.toHaveClass(/show/);
  });
});

test.describe('逐張解讀翻頁器', () => {
  for (const tpl of NEW_TEMPLATES) {
    test(`${tpl}：一次一張，按鈕、方向鍵與滑動換張，並播報位置`, async ({ page }) => {
      await seedStorage(page, { template: tpl });
      await page.goto(THREE_URL);
      const section = page.locator('.reading-detail');
      await expect(section).toHaveClass(/rd-paged/);
      const slides = section.locator('.rd-slide');
      await expect(slides).toHaveCount(4);
      await expect(section.locator('.rd-slide:not(.rd-slide-off)')).toHaveCount(1);
      await expect(slides.nth(0)).toBeVisible();
      const prev = section.locator('.rd-pager-prev');
      const next = section.locator('.rd-pager-next');
      await expect(prev).toHaveAttribute('aria-disabled', 'true');
      await next.click();
      await expect(slides.nth(1)).toBeVisible();
      await expect(slides.nth(0)).toBeHidden();
      expect(await plainText(section.locator('.rd-pager-status'))).toMatch(/^第 2 張，共 4 張：/);
      await page.keyboard.press('ArrowRight');
      await expect(slides.nth(2)).toBeVisible();
      await page.keyboard.press('ArrowLeft');
      await expect(slides.nth(1)).toBeVisible();
      await touchSwipe(section.locator('#readingDetailList'), -150);
      await expect(slides.nth(2)).toBeVisible();
      await touchSwipe(section.locator('#readingDetailList'), 150);
      await expect(slides.nth(1)).toBeVisible();
      await next.click();
      await next.click();
      await expect(slides.nth(3)).toBeVisible();
      await expect(next).toHaveAttribute('aria-disabled', 'true');
      // aria-disabled 的按鈕仍可取得焦點與點擊，只是不再往後
      await next.dispatchEvent('click');
      await expect(slides.nth(3)).toBeVisible();
      if (tpl === 'aurora') {
        expect(await plainText(section.locator('.rd-pager-count'))).toBe('4 / 4');
        await expect(section.locator('.rd-dots > span.on')).toHaveCount(1);
      }
      if (tpl === 'editorial') {
        const tabs = section.getByRole('tab');
        await expect(tabs).toHaveCount(4);
        await expect(tabs.nth(3)).toHaveAttribute('aria-selected', 'true');
        await tabs.nth(0).click();
        await expect(page.getByRole('tabpanel', { name: /過去/ })).toBeVisible();
        await page.keyboard.press('ArrowRight');
        await expect(tabs.nth(1)).toBeFocused();
        await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');
        await expect(slides.nth(1)).toBeVisible();
      }
      if (tpl === 'immersive') {
        await expect(section.locator('.rd-story > span.on')).toHaveCount(4);
        await expect(slides.nth(3).locator('.rd-story-card')).toBeVisible();
      }
    });
  }

  test('簡約版型維持清單；列印與新版型都輸出全部牌位', async ({ page }) => {
    await page.goto(THREE_URL);
    await expect(page.locator('.reading-detail')).not.toHaveClass(/rd-paged/);
    await expect(page.locator('.rd-pager-nav')).toHaveCount(0);
    await expect(page.locator('.reading-detail .rd-item:visible')).toHaveCount(4);
    await page.evaluate(() => localStorage.setItem('template', 'aurora'));
    await page.reload();
    await expect(page.locator('.reading-detail .rd-item:visible')).toHaveCount(1);
    await page.emulateMedia({ media: 'print' });
    await expect(page.locator('.reading-detail .rd-item:visible')).toHaveCount(4);
    await expect(page.locator('.rd-pager-nav')).toBeHidden();
    await expect(page.locator('.tpl-nav')).toBeHidden();
  });
});

test.describe('沉浸手勢首頁', () => {
  test('牌堆往上滑就抽牌，按鈕照樣可用；牌陣方塊與「更多」', async ({ page }) => {
    await seedStorage(page, { template: 'immersive', interactiveDraw: 'false' });
    await page.goto('/');
    await expect(page.locator('#deckHero')).toBeVisible();
    await expect(page.locator('#readButton')).toBeVisible();
    await expect(page.locator('.spread-field')).toBeHidden();
    const tile = (v) => page.locator(`.spread-tile[data-spread="${v}"]`);
    await expect(tile('single')).toHaveAttribute('aria-pressed', 'true');
    await tile('three').click();
    await expect(page.locator('#spreadType')).toHaveValue('three');
    await expect(tile('three')).toHaveAttribute('aria-pressed', 'true');
    await expect(tile('single')).toHaveAttribute('aria-pressed', 'false');
    await expect(page.locator('#deckHeroHint')).toHaveText('向上滑動，抽出聖三角');
    // 「更多」打開原本的牌陣選單，選了別的牌陣後方塊上寫出它的名字
    await page.locator('#spreadTileMore').click();
    await expect(page.locator('#spreadModal')).toHaveClass(/show/);
    await page.locator('.spread-option[data-value="horseshoe"]').click();
    await expect(page.locator('#spreadModal')).not.toHaveClass(/show/);
    await expect(page.locator('#spreadTileCurrent')).toHaveText('馬蹄鐵');
    await expect(page.locator('.spread-tile[aria-pressed="true"]')).toHaveCount(0);
    await tile('three').click();
    // 往上滑一小段不算
    const stack = page.locator('#deckHeroStack');
    await stack.scrollIntoViewIfNeeded();
    await mouseDrag(page, stack, -20, 2);
    await page.waitForTimeout(700);
    expect(await page.evaluate(() => JSON.parse(localStorage.getItem('readingHistory') || '[]').length)).toBe(0);
    await mouseDrag(page, stack, -120);
    await expect(page.locator('#results .card')).toHaveCount(4);
    await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('readingHistory') || '[]').length)).toBe(1);
    await page.locator('#readButton').click();
    await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('readingHistory') || '[]').length)).toBe(2);
  });

  test('觸覺回饋：新版型抽牌時震動，可在設定關閉；簡約版型不震動、不顯示設定', async ({ page }) => {
    await page.addInitScript(() => {
      window.__vib = [];
      navigator.vibrate = (ms) => { window.__vib.push(ms); return true; };
    });
    await seedStorage(page, { template: 'aurora', interactiveDraw: 'false' });
    await page.goto('/');
    await page.locator('#readButton').click();
    await expect(page.locator('#results .card').first()).toBeVisible();
    await expect.poll(() => page.evaluate(() => window.__vib.length)).toBe(1);
    await nav(page, 'settings').click();
    await expect(page.locator('#hapticsToggle')).toBeVisible();
    await page.locator('#hapticsToggle').uncheck();
    await nav(page, 'reading').click();
    await page.locator('#readButton').click();
    await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('readingHistory') || '[]').length)).toBe(2);
    expect(await page.evaluate(() => window.__vib.length)).toBe(1);
    await nav(page, 'settings').click();
    await page.locator('#hapticsToggle').check();
    await page.locator('input[name="templatePref"][value="minimal"]').check();
    await expect(page.locator('#hapticsToggle')).toBeHidden();
    await openTab(page, 'reading');
    const before = await page.evaluate(() => window.__vib.length);
    await page.locator('#readButton').click();
    await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('readingHistory') || '[]').length)).toBe(3);
    expect(await page.evaluate(() => window.__vib.length)).toBe(before);
  });
});

test.describe('新版型的寬度', () => {
  test.skip(({ isMobile }) => isMobile, '自己設定視窗大小');
  for (const tpl of NEW_TEMPLATES) {
    test(`${tpl}：320、375、768、1280px 各分頁都沒有水平捲動`, async ({ page }) => {
      await seedStorage(page, { template: tpl, birthday: '1990-05-20' });
      await page.goto(THREE_URL);
      await expect(page.locator('.rd-pager-nav')).toBeVisible();
      for (const width of [320, 375, 768, 1280]) {
        await page.setViewportSize({ width, height: 800 });
        for (const tab of ['reading', 'history', 'learn', 'database', 'statistics', 'settings']) {
          await nav(page, tab).click();
          expect(await overflowX(page), `${width}px ${tab}`).toBeLessThanOrEqual(0);
        }
        await nav(page, 'reading').click();
      }
    });
  }
});
