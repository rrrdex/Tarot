import { t } from './i18n.js';
import { debounce, escapeHTML } from './utils.js';
import { fullTarotCards, suitNames } from './data.js';
import { cardMeanings } from './meanings.js';
import { loadLore, loadedDeck } from './lazy.js';
import { cardThumb, visualStyle } from './render.js';

const debouncedSearch = debounce((filter) => {
  renderCardDatabaseFiltered(filter);
}, 300);
document.getElementById('cardSearch').addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
});
// 方格的內容只取決於這幾樣：牌面風格、線稿牌組是否已載入、語言、搜尋字；都沒變就不重建
let renderedKey = null;
function databaseKey(filter) {
  return [visualStyle, loadedDeck() ? 1 : 0, document.documentElement.lang, normalizeQuery(filter)].join('|');
}
// 切到分頁、換牌面風格、線稿牌組載入完成時都會呼叫；分頁沒開時先不畫，等打開再說
export function renderCardDatabase() {
  const panel = document.getElementById('tabDatabase');
  if (panel && panel.classList.contains('hidden')) return;
  renderDeckHistory();
  const filter = document.getElementById('cardSearch').value;
  if (databaseKey(filter) !== renderedKey) renderCardDatabaseFiltered(filter);
}
// 牌組源流只需畫一次；源流資料載不到（離線、新版上線後舊檔已移除）時，留一行說明而不是整塊空白
let deckHistoryState = 'idle';
async function renderDeckHistory() {
  const block = document.getElementById('deckHistoryBlock');
  if (!block || deckHistoryState === 'loading' || deckHistoryState === 'done') return;
  deckHistoryState = 'loading';
  let groups;
  try {
    ({ loreLibrary: groups } = await loadLore());
  } catch {
    deckHistoryState = 'failed';
    block.classList.remove('hidden');
    block.innerHTML = `<p class="deck-history-text deck-history-offline">${escapeHTML(t('db.deckHistory.offline'))}</p>`;
    return;
  }
  deckHistoryState = 'done';
  if (!groups.length) {
    block.classList.add('hidden');
    block.innerHTML = '';
    return;
  }
  block.classList.remove('hidden');
  // 共用知識分成幾組，每段預設收合：資料庫分頁打開時先看到標題，想讀哪段再展開
  block.innerHTML = groups.map(g => `
<section class="deck-history-group">
<h3 class="deck-history-heading">${escapeHTML(g.title)}</h3>
${g.items.map(h => `
<details class="deck-history-item">
<summary class="deck-history-title">${escapeHTML(h.title || '')}</summary>
<p class="deck-history-text">${escapeHTML(h.text || '')}</p>
</details>`).join('')}
</section>
`).join('');
}
// 搜尋時不分大小寫、忽略空白：「權杖 一」「MAJOR」都找得到
function normalizeQuery(s) {
  return String(s).toLowerCase().replace(/\s+/g, '');
}
// 每張牌可被搜尋的文字：牌名、英文名、花色（中英）、關鍵詞；編號另外比對整串
function searchFields(c) {
  const m = cardMeanings[c.nameKey];
  return [c.name, c.englishName, t(suitNames[c.suit]), c.suit, ...(m ? m.keywords : [])].map(normalizeQuery);
}
function cardMatches(c, q) {
  // 編號要整串相符：「0」只找愚者，「II」不會連 III、XII 一起找出來
  if (normalizeQuery(c.number) === q) return true;
  return searchFields(c).some(f => f.includes(q));
}
function renderCardDatabaseFiltered(filter = '') {
  const grid = document.getElementById('cardDatabaseGrid');
  const q = normalizeQuery(filter);
  renderedKey = databaseKey(filter);
  const filtered = q ? fullTarotCards.filter(c => cardMatches(c, q)) : fullTarotCards;
  // 有輸入才報筆數；內容沒變時不重寫，免得切回分頁就被讀屏重唸一次
  const countEl = document.getElementById('cardSearchCount');
  if (countEl) {
    const text = q ? t('db.search.count', { n: filtered.length }) : '';
    if (countEl.textContent !== text) countEl.textContent = text;
  }
  if (!filtered.length) {
    grid.innerHTML = `<div class="history-empty">${escapeHTML(t('db.empty'))}</div>`;
    return;
  }
  // 線稿牌組每張上百個元素：先放空位，捲到附近才填入牌面
  const deferArt = visualStyle === 'line';
  grid.innerHTML = filtered.map((c, i) => {
    const m = cardMeanings[c.nameKey];
    const art = deferArt ? null : cardThumb(c, '', 140);
    return `
<div class="card-db-item" role="button" tabindex="${i === 0 ? 0 : -1}" data-keynav-item data-suit="${c.suit}" data-action="openCardModal" data-card="${c.nameKey}">
${deferArt ? `<div class="card-db-art" data-art="${c.nameKey}"></div>` : art ? `<div class="card-db-art">${art}</div>` : ''}
<div class="card-db-number">${escapeHTML(c.suit === 'Major Arcana' ? c.number : t(suitNames[c.suit]))}</div>
<div class="card-db-name">${escapeHTML(c.name)}</div>
<div class="card-db-english" lang="en">${escapeHTML(c.englishName)}</div>
${m ? `<div class="card-db-keywords">${m.keywords.map(escapeHTML).join('・')}</div>` : ''}
</div>
`;
  }).join('');
  if (deferArt) observeArt(grid);
}
const cardByKey = new Map(fullTarotCards.map(c => [c.nameKey, c]));
let artObserver = null;
function observeArt(grid) {
  artObserver?.disconnect();
  artObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const el = entry.target;
      el.innerHTML = cardThumb(cardByKey.get(el.dataset.art), '', 140) || '';
      el.removeAttribute('data-art');
      artObserver.unobserve(el);
    }
  }, { rootMargin: '600px 0px' });
  grid.querySelectorAll('.card-db-art[data-art]').forEach(el => artObserver.observe(el));
}
