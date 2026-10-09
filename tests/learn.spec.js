import { test, expect, seedStorage, openTab } from './fixtures.js';

// 學習分頁與資料庫：焦點、對錯標示、搜尋、分段語意、匯入後同步、延遲載入失敗

async function openQuiz(page) {
  await openTab(page, 'learn');
  await page.locator('#learnModeSeg [data-mode="quiz"]').click();
  await expect(page.locator('#learnStage .quiz-option').first()).toBeVisible();
}

test.describe('學習：閃卡', () => {
  test('翻牌、評分後焦點都落在下一步', async ({ page }) => {
    await page.goto('/');
    await openTab(page, 'learn');
    const card = page.locator('#flashcard');
    await card.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('#flashEasy')).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('#flashcard')).toBeFocused();
    await expect(page.locator('#flashcard')).toHaveAttribute('role', 'button');
  });

  test('小牌副標不重複英文階級，英文名標上 lang="en"', async ({ page }) => {
    await seedStorage(page, { learnScope: 'Cups' });
    await page.goto('/');
    await openTab(page, 'learn');
    const sub = page.locator('#flashcard .flash-sub');
    await expect(sub.locator('span[lang="en"]')).toHaveText(/ of Cups$/);
    await expect(sub).toHaveText(/^\w+ of Cups · 聖杯$/);
  });

  test('連續天數旁直接顯示最佳紀錄', async ({ page }) => {
    await seedStorage(page, { learnStreak: JSON.stringify({ last: '2020-01-01', days: 2, best: 5 }) });
    await page.goto('/');
    await openTab(page, 'learn');
    await expect(page.locator('#learnStreak')).toContainText('最佳紀錄 5 天');
    await expect(page.locator('#learnStreak')).not.toHaveAttribute('title', /.+/);
  });

  test('熟練度圖例列出 0 到 5 級', async ({ page }) => {
    await page.goto('/');
    await openTab(page, 'learn');
    await expect(page.locator('.mastery-legend .mastery-swatch')).toHaveCount(6);
    await expect(page.locator('.mastery-legend')).toContainText('生疏');
    await expect(page.locator('.mastery-legend')).toContainText('熟練');
  });
});

test.describe('學習：測驗', () => {
  test('作答後標出對錯、狀態列說明結果、焦點移到下一題', async ({ page }) => {
    await page.goto('/');
    await openQuiz(page);
    let sawWrong = false;
    for (let i = 0; i < 10 && !sawWrong; i++) {
      await page.locator('#learnStage .quiz-option').first().click();
      await expect(page.locator('#quizNext')).toBeFocused();
      const correct = page.locator('.quiz-option.correct');
      await expect(correct).toHaveCount(1);
      await expect(correct.locator('.quiz-mark')).toContainText('正確答案');
      const status = page.locator('#learnStatus');
      const wrong = page.locator('.quiz-option.wrong');
      if (await wrong.count()) {
        sawWrong = true;
        await expect(wrong.locator('.quiz-mark')).toContainText('你的答案');
        await expect(status).toHaveText(/^答錯，正確答案是：.+/);
      } else {
        await expect(status).toHaveText('答對了');
      }
      await expect(page.locator('.quiz-feedback')).toHaveText(await status.textContent());
      await page.keyboard.press('Enter');
      if (await page.locator('.quiz-result').count()) {
        await expect(page.locator('.quiz-result-score')).toBeFocused();
        break;
      }
      await expect(page.locator('#learnStage .quiz-option').first()).toBeFocused();
      await expect(status).toHaveText('');
    }
    expect(sawWrong).toBe(true);
  });

  test('作答後顯示解說：牌名、正逆位、關鍵詞、牌義開頭，選錯時說明選到哪張牌', async ({ page }) => {
    await page.goto('/');
    await openQuiz(page);
    for (let i = 0; i < 10; i++) {
      await page.locator('#learnStage .quiz-option').first().click();
      const explain = page.locator('.quiz-explain');
      await expect(explain.locator('.quiz-explain-ori')).toHaveText(/^(正位|逆位)$/);
      await expect(explain.locator('.tag')).not.toHaveCount(0);
      await expect(explain.locator('.learn-meaning-slot .meaning-text')).toHaveText(/[。！？」』）]$/);
      await expect(page.locator('.quiz-actions [data-action="openCardModal"]')).toHaveText('看卡片詳情');
      if (await page.locator('.quiz-option.wrong').count()) {
        await expect(explain.locator('.quiz-explain-pick')).toHaveText(/^你選的/);
        await page.locator('.quiz-actions [data-action="openCardModal"]').click();
        await expect(page.locator('#cardModal')).toHaveClass(/show/);
        return;
      }
      await expect(explain.locator('.quiz-explain-pick')).toHaveCount(0);
      await page.locator('#quizNext').click();
    }
  });

  test('高對比模式下，正確與選錯的框線樣式不同', async ({ page }) => {
    await page.emulateMedia({ forcedColors: 'active' });
    await page.goto('/');
    await openQuiz(page);
    for (let i = 0; i < 10; i++) {
      await page.locator('#learnStage .quiz-option').first().click();
      if (await page.locator('.quiz-option.wrong').count()) break;
      await page.locator('#quizNext').click();
    }
    const style = (sel) => page.locator(sel).evaluate(el => getComputedStyle(el).borderTopStyle);
    expect(await style('.quiz-option.correct')).toBe('double');
    expect(await style('.quiz-option.wrong')).toBe('dashed');
  });

  test('看圖題的牌面在顯示時才畫，換成文字模式就改問關鍵字', async ({ page }) => {
    await seedStorage(page, { visualStyle: 'api' });
    await page.goto('/');
    await openQuiz(page);
    let found = false;
    for (let i = 0; i < 10; i++) {
      if (await page.locator('#learnStage .quiz-art').count()) { found = true; break; }
      await page.locator('#learnStage .quiz-option').first().click();
      await page.locator('#quizNext').click();
      if (await page.locator('.quiz-result').count()) break;
    }
    expect(found).toBe(true);
    await openTab(page, 'settings');
    await page.locator('input[name="visualStyle"][value="text"]').check();
    await openTab(page, 'learn');
    await expect(page.locator('#learnStage .quiz-art')).toHaveCount(0);
    await expect(page.locator('#learnStage .quiz-prompt')).toHaveText(/^「.+」正位的關鍵詞是？$/);
  });
});

test('分段標籤都有對應的 tabpanel，主要分頁列有名稱', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#tabsContainer')).toHaveAttribute('aria-label', /.+/);
  for (const seg of ['#learnModeSeg', '#cardModalSeg', '#dbSeg']) {
    await expect(page.locator(seg)).toHaveAttribute('aria-label', /.+/);
    const tabs = page.locator(`${seg} [role="tab"]`);
    for (let i = 0; i < await tabs.count(); i++) {
      const tab = tabs.nth(i);
      const id = await tab.getAttribute('id');
      const controls = await tab.getAttribute('aria-controls');
      expect(id).toBeTruthy();
      await expect(page.locator(`#${controls}`)).toHaveAttribute('role', 'tabpanel');
    }
  }
  for (const id of ['cardSegMeaning', 'cardSegIcon', 'cardSegContext', 'cardSegLore']) {
    const labelledby = await page.locator(`#${id}`).getAttribute('aria-labelledby');
    await expect(page.locator(`#${labelledby}`)).toHaveAttribute('aria-controls', id);
  }
  await openTab(page, 'learn');
  await page.locator('#learnModeSeg [data-mode="quiz"]').click();
  await expect(page.locator('#learnStage')).toHaveAttribute('aria-labelledby', 'learnModeTabQuiz');
});

test('匯入偏好後，學習範圍與模式立即同步', async ({ page }) => {
  await page.goto('/');
  await openTab(page, 'learn');
  await expect(page.locator('#learnScope')).toHaveValue('all');
  await openTab(page, 'settings');
  const [chooser] = await Promise.all([
    page.waitForEvent('filechooser'),
    page.locator('#importData').click()
  ]);
  await chooser.setFiles({
    name: 'backup.json',
    mimeType: 'application/json',
    buffer: Buffer.from(JSON.stringify({ history: [], prefs: { learnScope: 'Cups', learnMode: 'quiz' } }))
  });
  await page.locator('#confirmOk').click();
  await openTab(page, 'learn');
  await expect(page.locator('#learnScope')).toHaveValue('Cups');
  await expect(page.locator('#learnModeSeg [data-mode="quiz"]')).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('#learnStage .quiz-option').first()).toBeVisible();
});

test.describe('資料庫搜尋', () => {
  const cases = [
    ['大阿卡納', 22, '愚者'],
    ['major', 22, '愚者'],
    ['MAJOR', 22, '愚者'],
    ['0', 1, '愚者'],
    ['XIII', 1, '死神'],
    ['II', 1, '女祭司'],
    ['權杖 一', 1, '權杖一'],
    ['ace of cups', 1, '聖杯一']
  ];
  for (const [q, n, first] of cases) {
    test(`搜尋「${q}」`, async ({ page }) => {
      await page.goto('/');
      await openTab(page, 'database');
      await page.locator('#cardSearch').fill(q);
      await expect(page.locator('#cardSearchCount')).toHaveText(`找到 ${n} 張牌`);
      await expect(page.locator('.card-db-item')).toHaveCount(n);
      await expect(page.locator('.card-db-item .card-db-name').first()).toHaveText(first);
    });
  }

  test('沒有輸入時不顯示筆數，結果列是 status，英文名標上 lang', async ({ page }) => {
    await page.goto('/');
    await openTab(page, 'database');
    await expect(page.locator('#cardSearchCount')).toHaveAttribute('role', 'status');
    await expect(page.locator('#cardSearchCount')).toHaveText('');
    await expect(page.locator('#cardSearch')).toHaveAttribute('placeholder', '搜尋牌名、關鍵詞或牌義…');
    await expect(page.locator('.card-db-english').first()).toHaveAttribute('lang', 'en');
  });

  test('切回資料庫分頁不重建方格，換牌面風格才重建', async ({ page }) => {
    await page.goto('/');
    await openTab(page, 'database');
    const first = page.locator('.card-db-item').first();
    await first.evaluate(el => { el.dataset.marker = 'kept'; });
    await openTab(page, 'learn');
    await openTab(page, 'database');
    await expect(first).toHaveAttribute('data-marker', 'kept');
    await openTab(page, 'settings');
    await page.locator('input[name="visualStyle"][value="api"]').check();
    await openTab(page, 'database');
    await expect(first).not.toHaveAttribute('data-marker', 'kept');
    await expect(first.locator('picture')).toHaveCount(1);
  });

  test('全文搜尋：內文、星座與英文元素名都找得到，並列出命中的片段', async ({ page }) => {
    await page.goto('/');
    await openTab(page, 'database');
    await page.locator('#cardSearch').fill('分手');
    await expect(page.locator('.card-db-item .card-db-hit mark').first()).toHaveText('分手');
    await page.locator('#cardSearch').fill('Aries');
    await expect(page.locator('.card-db-item[data-card="emperor"] .card-db-hit')).toContainText('牡羊座');
    await page.locator('#cardSearch').fill('權杖王牌');
    await expect(page.locator('.card-db-item')).toHaveCount(1);
    await expect(page.locator('.card-db-item .card-db-name')).toHaveText('權杖一');
  });

  test('篩選：類別與花色可以組合，大阿卡納與花色互斥', async ({ page }) => {
    await page.goto('/');
    await openTab(page, 'database');
    const chip = (filter, value) => page.locator(`#dbFilters [data-filter="${filter}"][data-value="${value}"]`);
    await chip('suit', 'Cups').click();
    await chip('kind', 'court').click();
    await expect(page.locator('#cardSearchCount')).toHaveText('找到 4 張牌');
    await expect(chip('suit', 'Cups')).toHaveAttribute('aria-pressed', 'true');
    await chip('kind', 'major').click();
    await expect(chip('suit', 'all')).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('.card-db-item')).toHaveCount(22);
  });
});

test('卡片詳情的延伸閱讀前往知識庫：關閉視窗、展開該段並把焦點放在段落標題', async ({ page }) => {
  await page.goto('/');
  await openTab(page, 'database');
  await page.locator('.card-db-item[data-card="three_of_cups"]').click();
  await page.locator('#cardModalSeg [data-seg="lore"]').click();
  const link = page.locator('#cardModalLoreList .lore-link[data-lib="suit-cups"]');
  await link.click();
  await expect(page.locator('#cardModal')).not.toHaveClass(/show/);
  await expect(page.locator('#dbSegTabLibrary')).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('#lib-suit-cups')).toHaveAttribute('open', '');
  await expect(page.locator('#lib-suit-cups > summary')).toBeFocused();
  await expect(page.locator('#lib-suit-cups h4').first()).toBeVisible();
});

test.describe('源流資料載不到時', () => {
  // 陣列裡放兩個以上的 RegExp 時，Playwright 會把第二個當成 fixture 選項，所以外面再包一層
  test.use({ allowedErrors: [[/Failed to fetch dynamically imported module/, /Failed to load resource/], { scope: 'test' }] });

  test('學習分頁照常出題，資料庫顯示需要網路的說明', async ({ page }) => {
    await page.route(/\/chunks\/lore-/, route => route.abort());
    await page.goto('/');
    await openTab(page, 'learn');
    await expect(page.locator('#flashcard')).toBeVisible();
    await page.locator('#learnModeSeg [data-mode="quiz"]').click();
    await expect(page.locator('#learnStage .quiz-option').first()).toBeVisible();
    await openTab(page, 'database');
    await expect(page.locator('#deckHistoryBlock')).toContainText('需要網路');
    await expect(page.locator('.card-db-item')).toHaveCount(78);
  });
});

test('網站資料被封鎖時，學習分頁照常翻牌、評分、換模式與範圍', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', { get() { throw new DOMException('The operation is insecure.', 'SecurityError'); } });
  });
  await page.goto('/');
  await openTab(page, 'learn');
  await page.locator('#flashcard').click();
  await page.locator('#flashEasy').click();
  await expect(page.locator('#learnStage .flash-progress')).toContainText('1');
  await page.locator('#learnModeSeg [data-mode="quiz"]').click();
  await expect(page.locator('#learnStage .quiz-option').first()).toBeVisible();
  await page.locator('#learnScope').selectOption('Cups');
  await page.locator('#learnStage .quiz-option').first().click();
  await expect(page.locator('#quizNext')).toBeFocused();
});
