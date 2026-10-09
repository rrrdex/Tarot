import { t } from './i18n.js';
import { debounce, escapeHTML, scrollBehavior } from './utils.js';
import { fullTarotCards, suitNames } from './data.js';
import { cardMeanings } from './meanings.js';
import { loadLore, loadMeaningTexts, loadedDeck, loadedLore, loadedMeaningTexts } from './lazy.js';
import { cardThumb, visualStyle } from './render.js';
import { cardClass, cardSystems } from './systems.js';
import { waiteAdditional, waiteTerms } from './waite.js';
import { waiteTermZh } from './waite-zh.js';
import { mofaTerms } from './mofa.js';
import { syncStickyPadding } from './main.js';

const searchInput = document.getElementById('cardSearch');
const debouncedSearch = debounce(() => {
  renderCardDatabaseFiltered();
}, 300);
searchInput.addEventListener('input', () => {
  ensureTextIndex();
  debouncedSearch();
});
// 篩選：類別（大阿卡納／數字牌／宮廷牌）與花色各選一個；大阿卡納沒有花色，兩者互斥時改掉另一邊，不讓結果變成空的
const dbFilter = { kind: 'all', suit: 'all' };
const filtersEl = document.getElementById('dbFilters');
function syncFilterChips() {
  filtersEl?.querySelectorAll('[data-filter]').forEach(btn => {
    const on = dbFilter[btn.dataset.filter] === btn.dataset.value;
    btn.classList.toggle('active', on);
    btn.setAttribute('aria-pressed', on);
  });
}
filtersEl?.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-filter]');
  if (!btn) return;
  const { filter, value } = btn.dataset;
  dbFilter[filter] = value;
  if (filter === 'kind' && value === 'major') dbFilter.suit = 'all';
  if (filter === 'suit' && value !== 'all' && dbFilter.kind === 'major') dbFilter.kind = 'all';
  syncFilterChips();
  renderCardDatabaseFiltered();
});
function passesFilter(c) {
  if (dbFilter.kind !== 'all' && cardClass(c) !== dbFilter.kind) return false;
  return dbFilter.suit === 'all' || c.suit === dbFilter.suit;
}
// 牌卡｜知識庫 兩個分段；只記在這次瀏覽裡
let dbSeg = 'cards';
const DB_SEG_PANELS = { cards: 'dbPanelCards', library: 'dbPanelLibrary' };
export function setDbSeg(name) {
  if (!DB_SEG_PANELS[name]) return;
  dbSeg = name;
  document.querySelectorAll('#dbSeg .seg-item').forEach(b => {
    const on = b.dataset.seg === name;
    b.classList.toggle('active', on);
    b.setAttribute('aria-selected', on);
    b.tabIndex = on ? 0 : -1;
  });
  Object.entries(DB_SEG_PANELS).forEach(([key, id]) => {
    document.getElementById(id)?.classList.toggle('hidden', key !== name);
  });
  // 搜尋列只在牌卡分段裡黏在頂端
  syncStickyPadding();
}
document.getElementById('dbSeg')?.addEventListener('click', (e) => {
  const btn = e.target.closest('.seg-item');
  if (btn) setDbSeg(btn.dataset.seg);
});
// 方格的內容只取決於這幾樣：牌面風格、線稿牌組是否已載入、語言、搜尋字、篩選、全文索引的版本；都沒變就不重建
let renderedKey = null;
function databaseKey(q) {
  return [visualStyle, loadedDeck() ? 1 : 0, document.documentElement.lang, q, dbFilter.kind, dbFilter.suit, indexVersion].join('|');
}
// 切到分頁、換牌面風格、線稿牌組載入完成時都會呼叫；分頁沒開時先不畫，等打開再說
export function renderCardDatabase() {
  const panel = document.getElementById('tabDatabase');
  if (panel && panel.classList.contains('hidden')) return;
  setDbSeg(dbSeg);
  renderLibrary();
  const q = normalizeQuery(searchInput.value);
  // 瀏覽器可能在重新整理後還原搜尋字（不觸發 input）：一樣去載內文
  if (q) ensureTextIndex();
  if (databaseKey(q) !== renderedKey) renderCardDatabaseFiltered();
}
// 知識庫只需畫一次；資料載不到（離線、新版上線後舊檔已移除）時，留一行說明而不是整塊空白，下次打開分頁再試
let libraryPromise = null;
function renderLibrary() {
  const block = document.getElementById('deckHistoryBlock');
  if (!block) return Promise.resolve(false);
  if (!libraryPromise) {
    libraryPromise = loadLore().then(({ loreLibrary: groups }) => {
      block.classList.toggle('hidden', !groups.length);
      block.innerHTML = groups.map(libraryGroupHTML).join('');
      return true;
    }, () => {
      libraryPromise = null;
      block.classList.remove('hidden');
      block.innerHTML = `<p class="deck-history-text deck-history-offline">${escapeHTML(t('db.deckHistory.offline'))}</p>`;
      return false;
    });
  }
  return libraryPromise;
}
const cardByKey = new Map(fullTarotCards.map(c => [c.nameKey, c]));
// 每段預設收合；id 讓卡片詳情的「延伸閱讀」能連過來。分節的段落每節一個小標題
function libraryGroupHTML(g) {
  return `
<section class="deck-history-group" aria-labelledby="lib-group-${escapeHTML(g.id)}">
<h3 class="deck-history-heading" id="lib-group-${escapeHTML(g.id)}">${escapeHTML(g.title)}</h3>
${g.items.map(libraryItemHTML).join('')}
</section>`;
}
function libraryItemHTML(item) {
  const body = Array.isArray(item.sections)
    ? item.sections.map(s => `
<h4 class="deck-history-subtitle">${escapeHTML(s.title || '')}</h4>
<p class="deck-history-text">${escapeHTML(s.text || '')}</p>`).join('')
    : `<p class="deck-history-text">${escapeHTML(item.text || '')}</p>`;
  const cards = (item.cards || []).map(k => cardByKey.get(k)).filter(Boolean);
  const chips = cards.length ? `
<p class="lib-cards-label" id="lib-${escapeHTML(item.id)}-cards">${escapeHTML(t('db.library.cards'))}</p>
<div class="tags lib-card-chips" role="group" aria-labelledby="lib-${escapeHTML(item.id)}-cards">
${cards.map(c => `<button type="button" class="tag" data-action="openCardModal" data-card="${escapeHTML(c.nameKey)}">${escapeHTML(c.name)}</button>`).join('')}
</div>` : '';
  return `
<details class="deck-history-item" id="lib-${escapeHTML(item.id)}">
<summary class="deck-history-title">${escapeHTML(item.title || '')}</summary>
<div class="deck-history-body">${body}${chips}</div>
</details>`;
}
// 從卡片詳情或網址 #lib-… 前往知識庫的某一段：切到知識庫分段、展開、捲到那裡，焦點放在段落標題上
export async function showLibraryItem(id) {
  setDbSeg('library');
  await renderLibrary();
  const item = id && document.getElementById(`lib-${id}`);
  const summary = item && item.querySelector('summary');
  if (!summary) {
    document.getElementById('dbSegTabLibrary')?.focus();
    return false;
  }
  item.open = true;
  summary.focus({ preventScroll: true });
  item.scrollIntoView({ block: 'start', behavior: scrollBehavior() });
  return true;
}
// 搜尋時不分大小寫、忽略空白：「權杖 一」「MAJOR」都找得到
function normalizeQuery(s) {
  return String(s).toLowerCase().replace(/\s+/g, '');
}
// 同義詞：王牌就是一號牌（只比對牌名）；英文的元素、星座、行星名換成中文再找
const NAME_SYNONYMS = [['王牌', '一']];
const TERM_PREFIXES = ['element.', 'sign.', 'planet.'];
let termSynonyms = null;
function termVariants(q) {
  if (!termSynonyms) {
    termSynonyms = new Map();
    const keys = ['fire', 'water', 'air', 'earth'].map(k => `element.${k}`)
      .concat(['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'].map(k => `sign.${k}`))
      .concat(['saturn', 'jupiter', 'mars', 'sun', 'venus', 'mercury', 'moon', 'uranus', 'neptune'].map(k => `planet.${k}`));
    keys.forEach(key => {
      const en = key.slice(TERM_PREFIXES.find(p => key.startsWith(p)).length);
      const zh = normalizeQuery(t(key));
      if (zh === key) return;
      if (!termSynonyms.has(en)) termSynonyms.set(en, []);
      termSynonyms.get(en).push(zh);
    });
  }
  return termSynonyms.get(q) || [];
}
// 每張牌可被搜尋的欄位，分四級：0 牌名、英文名、花色；1 關鍵詞；2 對應系統與偉特、mofatarot 語詞；3 牌義與源流內文。
// 內文（meaning-texts、lore）是另外載入的片段，第一次輸入時才去載，載到後重建索引並重搜一次
let indexVersion = 0;
let textIndex = null;
let textIndexPending = false;
function ensureTextIndex() {
  if (textIndexPending || (loadedMeaningTexts() && loadedLore())) return;
  textIndexPending = true;
  Promise.allSettled([loadMeaningTexts(), loadLore()]).then(() => {
    textIndexPending = false;
    textIndex = null;
    indexVersion++;
    const panel = document.getElementById('tabDatabase');
    if (normalizeQuery(searchInput.value) && panel && !panel.classList.contains('hidden')) renderCardDatabaseFiltered();
  });
}
function waiteText(list, nameKey) {
  return (list || []).map(en => {
    const zh = waiteTermZh(en, nameKey);
    return zh ? `${zh}（${en}）` : en;
  }).join('、');
}
function systemsRowVars(r) {
  if (!r.tvars) return r.vars;
  const vars = { ...(r.vars || {}) };
  Object.keys(r.tvars).forEach(k => { vars[k] = t(r.tvars[k]); });
  return vars;
}
function cardSearchEntries(c) {
  const m = cardMeanings[c.nameKey];
  const texts = loadedMeaningTexts()?.meaningTexts?.[c.nameKey];
  const lore = loadedLore()?.cardLore?.[c.nameKey];
  const w = waiteTerms[c.nameKey];
  const wa = waiteAdditional[c.nameKey];
  const mofa = mofaTerms[c.nameKey];
  const entries = [
    ...[c.name, c.englishName, t(suitNames[c.suit]), c.suit].map(text => ({ tier: 0, text })),
    { tier: 1, label: 'db.hit.keyword', text: (m?.keywords || []).join('、') },
    { tier: 1, label: 'db.hit.keywordReversed', text: (m?.keywordsReversed || []).join('、') },
    ...cardSystems(c).flatMap(g => g.rows.map(r => ({ tier: 2, label: r.label, text: t(r.value, systemsRowVars(r)) }))),
    { tier: 2, label: 'db.hit.waite', text: w ? waiteText([...(w.upright || []), ...(w.reversed || [])], c.nameKey) : '' },
    { tier: 2, label: 'db.hit.waiteAdd', text: wa ? waiteText([...(wa.upright || []), ...(wa.reversed || [])], c.nameKey) : '' },
    { tier: 2, label: 'db.hit.mofa', text: mofa ? [...(mofa.up || []), ...(mofa.rv || [])].join('、') : '' },
    { tier: 3, label: 'db.hit.upright', text: texts?.upright || '' },
    { tier: 3, label: 'db.hit.reversed', text: texts?.reversed || '' },
    { tier: 3, label: 'db.hit.symbolism', text: lore?.symbolism || '' },
    { tier: 3, label: 'db.hit.origin', text: lore?.origin || '' }
  ];
  return entries.filter(e => e.text).map(e => ({ ...e, norm: normalizeQuery(e.text) }));
}
function getTextIndex() {
  if (!textIndex) textIndex = new Map(fullTarotCards.map(c => [c.nameKey, cardSearchEntries(c)]));
  return textIndex;
}
// 查詢字本身就是花色或類別名（「大阿卡納」「聖杯」「major」）時只比對牌名欄，不把內文順帶提到的牌也列出來；
// 編號、羅馬數字這類很短的英數字也只比對牌名欄，免得「0」「II」配到內文裡的數字或單字
const CATEGORY_NAMES = Object.keys(suitNames).flatMap(s => [normalizeQuery(s), normalizeQuery(t(suitNames[s]))]);
function deepSearchAllowed(q) {
  if (CATEGORY_NAMES.some(name => name.includes(q))) return false;
  return /[^ -~]/.test(q) || q.length >= 3;
}
function searchCards(q) {
  const index = getTextIndex();
  const nameQ = NAME_SYNONYMS.reduce((s, [from, to]) => s.split(from).join(to), q);
  const nameVariants = [...new Set([q, nameQ, ...termVariants(q)])];
  const variants = [q, ...termVariants(q)];
  const deep = deepSearchAllowed(q);
  const hits = [];
  fullTarotCards.forEach((c, order) => {
    if (!passesFilter(c)) return;
    // 編號要整串相符：「0」只找愚者，「II」不會連 III、XII 一起找出來
    if (normalizeQuery(c.number) === q) {
      hits.push({ card: c, tier: 0, order });
      return;
    }
    for (const e of index.get(c.nameKey) || []) {
      if (e.tier >= 2 && !deep) break;
      const vs = e.tier === 0 ? nameVariants : variants;
      const v = vs.find(x => e.norm.includes(x));
      if (v) {
        hits.push({ card: c, tier: e.tier, order, entry: e, variant: v });
        return;
      }
    }
  });
  return hits.sort((a, b) => a.tier - b.tier || a.order - b.order);
}
// 命中處前後各留一小段；比對時忽略空白，所以在原文裡用「字與字之間可有空白」的樣式找回位置
function snippetHTML(text, variant) {
  const pattern = new RegExp(Array.from(variant).map(ch => ch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('\\s*'), 'i');
  const m = pattern.exec(text);
  if (!m) return escapeHTML(text.length > 60 ? text.slice(0, 60) + '…' : text);
  const BEFORE = 14;
  const AFTER = 40;
  const start = Math.max(0, m.index - BEFORE);
  const end = Math.min(text.length, m.index + m[0].length + AFTER);
  return `${start > 0 ? '…' : ''}${escapeHTML(text.slice(start, m.index))}<mark>${escapeHTML(m[0])}</mark>${escapeHTML(text.slice(m.index + m[0].length, end))}${end < text.length ? '…' : ''}`;
}
function hitHTML(hit) {
  const e = hit.entry;
  // 牌名命中、或命中的就是方格上已顯示的正位關鍵詞，不另外說明
  if (!e || e.tier === 0 || e.label === 'db.hit.keyword') return '';
  return `<div class="card-db-hit"><span class="card-db-hit-label">${escapeHTML(t(e.label))}：</span>${snippetHTML(e.text, hit.variant)}</div>`;
}
function renderCardDatabaseFiltered() {
  const grid = document.getElementById('cardDatabaseGrid');
  const q = normalizeQuery(searchInput.value);
  renderedKey = databaseKey(q);
  const hits = q ? searchCards(q) : fullTarotCards.filter(passesFilter).map(card => ({ card }));
  // 有輸入或篩選才報筆數；內容沒變時不重寫，免得切回分頁就被讀屏重唸一次
  const countEl = document.getElementById('cardSearchCount');
  if (countEl) {
    const filtered = dbFilter.kind !== 'all' || dbFilter.suit !== 'all';
    const text = q || filtered ? t('db.search.count', { n: hits.length }) : '';
    if (countEl.textContent !== text) countEl.textContent = text;
  }
  if (!hits.length) {
    grid.innerHTML = `<div class="history-empty">${escapeHTML(t('db.empty'))}</div>`;
    return;
  }
  // 線稿牌組每張上百個元素：先放空位，捲到附近才填入牌面
  const deferArt = visualStyle === 'line';
  grid.innerHTML = hits.map((hit, i) => {
    const c = hit.card;
    const m = cardMeanings[c.nameKey];
    const art = deferArt ? null : cardThumb(c, '', 140);
    return `
<div class="card-db-item" role="button" tabindex="${i === 0 ? 0 : -1}" data-keynav-item data-suit="${c.suit}" data-action="openCardModal" data-card="${c.nameKey}">
${deferArt ? `<div class="card-db-art" data-art="${c.nameKey}"></div>` : art ? `<div class="card-db-art">${art}</div>` : ''}
<div class="card-db-number">${escapeHTML(c.suit === 'Major Arcana' ? c.number : t(suitNames[c.suit]))}</div>
<div class="card-db-name">${escapeHTML(c.name)}</div>
<div class="card-db-english" lang="en">${escapeHTML(c.englishName)}</div>
${m ? `<div class="card-db-keywords">${m.keywords.map(escapeHTML).join('・')}</div>` : ''}
${hitHTML(hit)}
</div>
`;
  }).join('');
  if (deferArt) observeArt(grid);
}
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
