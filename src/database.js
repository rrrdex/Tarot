import { t } from './i18n.js';
import { debounce, escapeHTML } from './utils.js';
import { fullTarotCards, suitNames } from './data.js';
import { cardMeanings } from './meanings.js';
import { loadLore } from './lazy.js';
import { cardThumb, visualStyle } from './render.js';

const debouncedSearch = debounce((filter) => {
  renderCardDatabaseFiltered(filter);
}, 300);
document.getElementById('cardSearch').addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
});
export function renderCardDatabase() {
  renderDeckHistory();
  renderCardDatabaseFiltered(document.getElementById('cardSearch').value);
}
async function renderDeckHistory() {
  const block = document.getElementById('deckHistoryBlock');
  if (!block) return;
  const { deckHistory: items } = await loadLore();
  if (!items.length) {
    block.classList.add('hidden');
    block.innerHTML = '';
    return;
  }
  block.classList.remove('hidden');
  block.innerHTML = items.map(h => `
<div class="deck-history-item">
<h3 class="deck-history-title">${escapeHTML(h.title || '')}</h3>
<p class="deck-history-text">${escapeHTML(h.text || '')}</p>
</div>
`).join('');
}
function renderCardDatabaseFiltered(filter = '') {
  const grid = document.getElementById('cardDatabaseGrid');
  const q = filter.trim();
  const filtered = fullTarotCards.filter(c => {
    if (!q) return true;
    const m = cardMeanings[c.nameKey];
    return c.name.includes(q) ||
    c.englishName.toLowerCase().includes(q.toLowerCase()) ||
    (m && m.keywords.some(k => k.includes(q)));
  });
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
<div class="card-db-english">${escapeHTML(c.englishName)}</div>
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
