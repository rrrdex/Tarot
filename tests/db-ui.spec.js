import AxeBuilder from '@axe-core/playwright';
import { test, expect, SHARE_URL, seedStorage, openTab } from './fixtures.js';

// 卡片詳情的情境與源流新增內容、資料庫的符號分段／別名搜尋／對應篩選、比較兩張牌、逐張解讀的「在這個位置」

const modal = (page) => page.locator('#cardModal');
// 情境、源流、參考資料是另外載入的片段；整套平行跑時載入可能比預設的 5 秒慢，第一個等它們的斷言放寬時間
const CHUNK = { timeout: 20000 };
async function openCard(page, key) {
  await page.goto(`/#card=${key}`);
  await expect(modal(page)).toHaveClass(/show/);
}

test('網址 #card=tower 直接打開高塔的卡片詳情', async ({ page }) => {
  await openCard(page, 'tower');
  await expect(page.locator('#cardModalTitle')).toHaveText('高塔');
});

test('從 #card= 打開時焦點移進視窗；關掉後網址拿掉 #card=', async ({ page }) => {
  await openCard(page, 'tower');
  await expect.poll(() => page.evaluate(() => !!document.activeElement?.closest('#cardModal'))).toBe(true);
  await page.keyboard.press('Escape');
  await expect(modal(page)).not.toHaveClass(/show/);
  expect(await page.evaluate(() => location.hash)).toBe('');
});

test('情境分頁：是非與六個情境、細分主題、三種牌位、節奏與組合；正逆位切換鈕換掉整頁的文字', async ({ page }) => {
  await openCard(page, 'two_of_wands');
  await page.locator('#cardModalSeg [data-seg="context"]').click();
  const list = page.locator('#cardModalContextList');
  await expect(list.locator('.context-label')).toHaveText(['是非', '感情', '事業', '財務', '身心', '學業', '成長'], CHUNK);
  // 感情、事業、財務底下各有收合的細分主題
  await expect(list.locator('details.ctx-sub')).toHaveCount(3);
  await expect(list.locator('details.ctx-sub[data-domain="love"] dt')).toHaveText(['曖昧與新對象', '交往中或婚姻', '對方的想法', '復合']);
  const pos = page.locator('#cardModalPositions');
  await expect(pos.locator('h3')).toHaveText('放在不同牌位');
  await expect(pos.locator('dt')).toHaveText(['建議', '阻礙', '結果']);
  // 數字牌沒有「代表的人」；節奏與常見組合都有
  await expect(page.locator('#cardModalPerson')).toBeHidden();
  await expect(page.locator('#cardModalPace')).toBeVisible();
  await expect(page.locator('#cardModalCombos .refs-rel')).not.toHaveCount(0);
  const up = page.locator('#cardModalCtxOri [data-ctx-ori="upright"]');
  const rv = page.locator('#cardModalCtxOri [data-ctx-ori="reversed"]');
  await expect(up).toHaveAttribute('aria-pressed', 'true');
  const advice = pos.locator('dd').first();
  const love = list.locator('.context-row').nth(1).locator('.context-text');
  const [adviceUp, loveUp] = [await advice.textContent(), await love.textContent()];
  expect(adviceUp.length).toBeGreaterThan(10);
  await rv.click();
  await expect(rv).toHaveAttribute('aria-pressed', 'true');
  await expect(up).toHaveAttribute('aria-pressed', 'false');
  await expect(advice).not.toHaveText(adviceUp);
  await expect(love).not.toHaveText(loveUp);
  await up.click();
  await expect(advice).toHaveText(adviceUp);
  await expect(love).toHaveText(loveUp);
  await expect(page.locator('#cardModalJournal li')).toHaveCount(3);
});

test('宮廷牌與大牌有「當它代表一個人」；身心碰到嚴重困擾的牌附上求助專線', async ({ page }) => {
  await openCard(page, 'ten_of_swords');
  await page.locator('#cardModalSeg [data-seg="context"]').click();
  await expect(page.locator('#cardModalContextList .care-note')).toContainText('1925', CHUNK);
  await page.goto('/#card=queen_of_cups');
  await page.locator('#cardModalSeg [data-seg="context"]').click();
  await expect(page.locator('#cardModalPerson h3')).toHaveText('當它代表一個人', CHUNK);
  // 換到組合裡的另一張牌，仍停在情境分頁
  await page.locator('#cardModalCombos .refs-rel-card').first().click();
  await expect(page.locator('#cardSegContext')).toBeVisible();
});

test('從占卜結果打開：情境分頁固定在抽到的方向，沒有切換鈕', async ({ page }) => {
  await page.goto(SHARE_URL);
  // 第二張是正位的權杖侍者
  await page.locator('#results .card').nth(1).click();
  await expect(modal(page)).toHaveClass(/show/);
  await page.locator('#cardModalSeg [data-seg="context"]').click();
  await expect(page.locator('#cardModalCtxOri .ctx-pos-ori')).toHaveText('正位（本次抽到）', CHUNK);
  await expect(page.locator('[data-ctx-ori]')).toHaveCount(0);
  await expect(page.locator('#cardModalPerson')).toBeVisible();
});

test('主題與是非指引：逐張解讀列出這一面的主題讀法與是非傾向，網址帶著主題', async ({ page }) => {
  await page.goto('/?seed=123456789&spread=yesno&deck=full&topic=loveFeelings');
  const first = page.locator('#results .rd-item').first();
  await expect(first.locator('.rd-topic .rd-role-label')).toHaveText('對方的想法', CHUNK);
  await expect(first.locator('.rd-yesno .yesno-badge')).toBeVisible();
  await expect(page.locator('#results .results-topic')).toHaveText('主題：對方的想法');
  await expect(page.locator('#topic')).toHaveValue('loveFeelings');
  expect(new URL(page.url()).searchParams.get('topic')).toBe('loveFeelings');
});

test('源流分頁：相關的牌可換看那張牌；其他牌系的名稱與對應日期', async ({ page }) => {
  await openCard(page, 'two_of_wands');
  await page.locator('#cardModalSeg [data-seg="lore"]').click();
  const related = page.locator('#cardModalRelated .refs-rel');
  await expect(related.first()).toBeVisible(CHUNK);
  await expect(related.first().locator('.refs-kind')).toHaveText('延續');
  const names = page.locator('#cardModalNames');
  await expect(names.locator('[lang="fr"]')).toHaveText('Deux de Bâton');
  await expect(names).toContainText('Dominion');
  await expect(page.locator('#cardModalSystemsList .refs-timing dd')).toHaveText('約 3 月 21 日–3 月 30 日（火星在牡羊座的旬）');
  await expect(page.locator('#cardModalSystemsList .refs-timing-note')).toBeVisible();
  // 畫面上的符號：點了前往資料庫的符號分段
  await expect(page.locator('#cardModalSymbols .refs-sym').first()).toBeVisible(CHUNK);
  // 點相關的牌（皇帝）換成那張牌的卡片詳情
  await page.locator('#cardModalRelated .refs-rel-card', { hasText: '皇帝' }).click();
  await expect(page.locator('#cardModalTitle')).toHaveText('皇帝');
  await expect(page.locator('#cardModalTitle')).toBeFocused();
  // 從相關的牌點過去，停在源流分頁
  await expect(page.locator('#cardModalSeg .seg-item[data-seg="lore"]')).toHaveClass(/active/);
});

test('源流分頁：宮廷牌列出托特的另一種對法；力量的補充說明連到知識庫', async ({ page }) => {
  await openCard(page, 'king_of_wands');
  await page.locator('#cardModalSeg [data-seg="lore"]').click();
  const names = page.locator('#cardModalNames');
  await expect(names).toContainText('另一種對法：Prince of Wands', CHUNK);
  await names.locator('.refs-help summary').click();
  await expect(names.locator('.refs-help')).toContainText('托特牌的宮廷牌');
  // 沒有日期對應的牌不顯示那一列
  await expect(page.locator('#cardModalSystemsList .refs-timing')).toHaveCount(0);

  await page.goto('/#card=strength');
  await expect(modal(page)).toHaveClass(/show/);
  await page.locator('#cardModalSeg [data-seg="lore"]').click();
  await page.locator('#cardModalNames [data-lib="strength-justice"]').click(CHUNK);
  await expect(modal(page)).not.toHaveClass(/show/);
  await expect(page.locator('#lib-strength-justice')).toHaveAttribute('open', '');
});

test('網址 #sym-lion 打開資料庫的符號分段並列出力量；卡片詳情的符號連過去', async ({ page }) => {
  await page.goto('/#sym-lion');
  await expect(page.locator('#tabDatabase')).toBeVisible();
  await expect(page.locator('#dbSegTabSymbols')).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('#symGrid .sym-btn[data-sym="lion"]')).toHaveAttribute('aria-pressed', 'true');
  const detail = page.locator('#symDetail');
  await expect(detail.locator('.sym-card', { hasText: '力量' })).toContainText('女子俯身輕扶的獅子', CHUNK);
  await detail.locator('.sym-card', { hasText: '力量' }).click();
  await expect(modal(page)).toHaveClass(/show/);
  await expect(page.locator('#cardModalTitle')).toHaveText('力量');
  // 從卡片詳情的「畫面上的符號」前往另一個符號
  await page.locator('#cardModalSeg [data-seg="lore"]').click();
  await page.locator('#cardModalSymbols [data-sym="lemniscate"]').click(CHUNK);
  await expect(modal(page)).not.toHaveClass(/show/);
  await expect(page.locator('#symGrid .sym-btn[data-sym="lemniscate"]')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('#symDetailTitle')).toBeFocused();
});

test('別名搜尋：女教皇找到女祭司並標出命中的別名；拉丁字母不分重音', async ({ page }) => {
  await page.goto('/');
  await openTab(page, 'database');
  const search = page.locator('#cardSearch');
  await search.fill('女教皇');
  const first = page.locator('#cardDatabaseGrid .card-db-item').first();
  await expect(first.locator('.card-db-name')).toHaveText('女祭司');
  await expect(first.locator('.card-db-hit')).toContainText('別名：女教皇', CHUNK);
  await search.fill('吊人');
  await expect(page.locator('#cardDatabaseGrid .card-db-item').first().locator('.card-db-name')).toHaveText('倒吊人');
  await search.fill('etoile');
  await expect(page.locator('#cardDatabaseGrid .card-db-item').first().locator('.card-db-name')).toHaveText('星星');
  // 「五角星」是錢幣牌組的別稱：錢幣牌靠別名排在最前面
  await search.fill('五角星');
  await expect(page.locator('#cardDatabaseGrid .card-db-item').first().locator('.card-db-hit')).toContainText('別名：五角星');
});

test('「對應」篩選設為牡羊座時列出皇帝與權杖二', async ({ page }) => {
  await page.goto('/');
  await openTab(page, 'database');
  await page.locator('#dbFilterCorr').selectOption('sign.aries');
  const names = page.locator('#cardDatabaseGrid .card-db-name');
  await expect(names).toHaveText(['皇帝', '權杖二', '權杖三', '權杖四']);
  await page.locator('#dbFilterCorr').selectOption('planet.mars');
  await expect(names).toContainText(['高塔', '權杖二', '權杖七']);
  await page.locator('#dbFilterCorr').selectOption('all');
  await expect(names).toHaveCount(78);
});

test('比較：從卡片詳情打開，選第二張牌後並排列出兩張的重點', async ({ page }) => {
  await openCard(page, 'tower');
  await page.locator('#cardModalCompare').click();
  const cmp = page.locator('#compareModal');
  await expect(cmp).toHaveClass(/show/);
  await expect(modal(page)).not.toHaveClass(/show/);
  await page.locator('#compareFilter').fill('皇');
  await page.locator('#compareSelect').selectOption('emperor');
  await expect(cmp.locator('.cmp-name')).toHaveText(['高塔', '皇帝']);
  await expect(cmp.locator('.cmp-row dt')).toContainText(['關鍵詞', '是非傾向', '元素與對應', '其他牌系的名稱', '對應日期', '共同的符號', '兩張牌的關係'], CHUNK);
  await page.keyboard.press('Escape');
  await expect(cmp).not.toHaveClass(/show/);
});

test('凱爾特十字的逐張解讀：阻礙與結果牌位多一段「在這個位置」，複製結果也帶上', async ({ page }) => {
  await page.goto(SHARE_URL);
  const item = (pos) => page.locator('.rd-item', { has: page.locator('.rd-pos-name', { hasText: new RegExp(`^${pos}$`) }) });
  await expect(item('阻礙').locator('.rd-role')).toContainText('在這個位置', CHUNK);
  await expect(item('阻礙').locator('.rd-role')).toBeVisible();
  await expect(item('結果').locator('.rd-role')).toContainText('在這個位置');
  await expect(item('現況').locator('.rd-role')).toHaveCount(0);
  await page.evaluate(() => {
    Object.defineProperty(navigator, 'clipboard', { value: { writeText: (text) => { window.__copied = text; return Promise.resolve(); } }, configurable: true });
  });
  await page.locator('[data-action="copyResults"]').click();
  const copied = await page.evaluate(() => window.__copied);
  expect(copied).toMatch(/阻礙：權杖侍者（正位）\n關鍵詞：[^\n]+\n在這個位置：/);
});

const NO_MOTION = '*,*::before,*::after{transition:none!important;animation:none!important}';
async function expectNoViolations(page, label) {
  const r = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();
  const h = await new AxeBuilder({ page }).withRules(['heading-order', 'empty-heading']).analyze();
  expect([...r.violations, ...h.violations].map(v => `${v.id}: ${v.nodes.slice(0, 3).map(n => n.target.join(' ')).join(', ')}`), label).toEqual([]);
}
for (const [template, theme, style] of [['minimal', 'light', 'api'], ['minimal', 'dark', 'line'], ['immersive', 'dark', 'text'], ['editorial', 'light', 'api']]) {
  test(`無障礙：新內容（${template} 版型、${theme} 主題、${style} 牌面）`, async ({ page }) => {
    test.slow();
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await seedStorage(page, { template, theme, visualStyle: style });
    await page.goto('/#card=two_of_wands');
    await page.addStyleTag({ content: NO_MOTION });
    await expect(modal(page)).toHaveClass(/show/);
    await page.locator('#cardModalSeg [data-seg="context"]').click();
    await expect(page.locator('#cardModalPositions')).toBeVisible(CHUNK);
    await expectNoViolations(page, 'context');
    await page.locator('#cardModalSeg [data-seg="lore"]').click();
    await expect(page.locator('#cardModalSymbols .refs-sym').first()).toBeVisible(CHUNK);
    await page.locator('#cardModalNames .refs-help summary').click();
    await expectNoViolations(page, 'lore');
    await page.locator('#cardModalCompare').click();
    await page.locator('#compareSelect').selectOption('emperor');
    await expect(page.locator('#compareBody .cmp-rows')).toBeVisible(CHUNK);
    await expectNoViolations(page, 'compare');
    await page.keyboard.press('Escape');
    await page.evaluate(() => { location.hash = 'sym-lion'; });
    await expect(page.locator('#symDetail')).toBeVisible(CHUNK);
    await expectNoViolations(page, 'symbols');
    await page.goto('/?seed=123456789&spread=celtic&deck=full');
    await page.addStyleTag({ content: NO_MOTION });
    await expect(page.locator('.rd-role').first()).toBeAttached();
    await expectNoViolations(page, 'reading');
  });
}
