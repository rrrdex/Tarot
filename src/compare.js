// 比較兩張牌：卡片詳情的「比較」打開，第一張是正在看的牌，第二張用可搜尋的下拉選單挑。
// 每一列先寫欄位名（dt），下面兩欄並排兩張牌的值（dd，各自帶著看不見的牌名，讀屏才知道是哪一張）；
// 共同的符號與兩張牌的關係只有一個值，橫跨兩欄
import { t } from './i18n.js';
import { escapeHTML, keywordList } from './utils.js';
import { fullTarotCards, orientationNames, suitNames, tendencyNames } from './data.js';
import { cardMeanings } from './meanings.js';
import { cardSystems } from './systems.js';
import { loadContexts, loadRefs, loadedContexts, loadedRefs } from './lazy.js';
import { cardThumb, closeCardModal } from './render.js';
import { otherNameRows, relatedKindLabel, symbolsOfCard, timingText } from './refs-ui.js';

const cardByKey = new Map(fullTarotCards.map(c => [c.nameKey, c]));
const SUITS = ['Major Arcana', 'Wands', 'Cups', 'Swords', 'Pentacles'];
const ATTR_LABELS = ['systems.label.element', 'systems.label.planet', 'systems.label.sign', 'systems.label.decan'];
const overlay = document.getElementById('compareModal');
const filterEl = document.getElementById('compareFilter');
const selectEl = document.getElementById('compareSelect');
let cardA = null;
let cardB = null;

// 篩選字比對牌名、英文名與中文常見別名；不分大小寫、忽略空白
const fold = (s) => String(s).toLowerCase().replace(/\s+/g, '');
function matches(c, q) {
  if (!q) return true;
  const aliases = loadedRefs()?.cardRefs?.[c.nameKey]?.names?.aliases || [];
  return [c.name, c.englishName, ...aliases].some(x => fold(x).includes(q));
}
function fillOptions() {
  const q = fold(filterEl.value);
  const found = fullTarotCards.filter(c => c !== cardA && matches(c, q));
  // 已選的第二張牌就算不符合篩選字也留在選單裡，選單才不會悄悄換掉它
  const list = cardB && !found.includes(cardB) ? [cardB, ...found] : found;
  selectEl.innerHTML = `<option value="">${escapeHTML(t('compare.pick.none'))}</option>` + SUITS.map(suit => {
    const cards = list.filter(c => c.suit === suit);
    return cards.length ? `<optgroup label="${escapeHTML(t(suitNames[suit]))}">${cards.map(c => `<option value="${escapeHTML(c.nameKey)}">${escapeHTML(c.name)}（${escapeHTML(c.englishName)}）</option>`).join('')}</optgroup>` : '';
  }).join('');
  selectEl.value = cardB ? cardB.nameKey : '';
  const status = document.getElementById('compareFilterCount');
  const text = q ? t('compare.filter.count', { n: found.length }) : '';
  if (status && status.textContent !== text) status.textContent = text;
}
filterEl?.addEventListener('input', fillOptions);
selectEl?.addEventListener('change', () => {
  cardB = cardByKey.get(selectEl.value) || null;
  renderCompare();
});

function headHTML(c) {
  const art = cardThumb(c, '', 96);
  return `
<div class="cmp-card">
${art ? `<div class="card-db-art cmp-art" data-suit="${escapeHTML(c.suit)}">${art}</div>` : ''}
<h3 class="cmp-name">${escapeHTML(c.name)}</h3>
<p class="cmp-en" lang="en">${escapeHTML(c.englishName)}</p>
</div>`;
}
function keywordsHTML(c) {
  const m = cardMeanings[c.nameKey] || {};
  return [['upright', m.keywords], ['reversed', m.keywordsReversed]].map(([ori, list]) => (list && list.length)
    ? `<p class="cmp-line"><span class="cmp-sub">${escapeHTML(t(orientationNames[ori]))}</span>${keywordList(list)}</p>` : '').join('');
}
// 是非傾向和關鍵詞一樣正逆位各列一行
function yesnoHTML(c) {
  const ctx = loadedContexts();
  const lines = ctx ? ['upright', 'reversed'].map(ori => [ori, ctx.yesnoOf(c.nameKey, ori)]).filter(([, y]) => y) : [];
  if (!lines.length) return escapeHTML(t('compare.none'));
  return lines.map(([ori, y]) => {
    const tendency = tendencyNames[y.tendency] ? y.tendency : 'unclear';
    return `<p class="cmp-line"><span class="cmp-sub">${escapeHTML(t(orientationNames[ori]))}</span><span class="yesno-badge ${tendency}">${escapeHTML(t(tendencyNames[tendency]))}</span> <span class="cmp-note">${escapeHTML(y.note || '')}</span></p>`;
  }).join('');
}
// 元素與黃金黎明的對應：花色元素、大牌的行星／星座／元素、數字牌的旬位
function attrHTML(c) {
  const rows = (cardSystems(c)[0]?.rows || []).filter(r => ATTR_LABELS.includes(r.label));
  if (!rows.length) return escapeHTML(t('compare.none'));
  return rows.map(r => {
    const vars = r.tvars ? Object.fromEntries(Object.entries(r.tvars).map(([k, v]) => [k, t(v)])) : r.vars;
    return `<p class="cmp-line"><span class="cmp-sub">${escapeHTML(t(r.label))}</span>${escapeHTML(t(r.value, vars))}</p>`;
  }).join('');
}
function namesHTML(c) {
  const rows = otherNameRows(c, loadedRefs()?.cardRefs?.[c.nameKey]?.names);
  return rows.length ? rows.map(([label, value]) => `<p class="cmp-line"><span class="cmp-sub">${escapeHTML(label)}</span>${value}</p>`).join('') : escapeHTML(t('compare.none'));
}
function timingHTML(c) {
  return escapeHTML(timingText(loadedRefs()?.cardRefs?.[c.nameKey]?.timing) || t('compare.none'));
}
function sharedSymbolsHTML(a, b) {
  const index = loadedRefs()?.symbolIndex;
  const ofB = new Set(symbolsOfCard(index, b.nameKey).map(x => x.symbol.id));
  const shared = symbolsOfCard(index, a.nameKey).filter(x => ofB.has(x.symbol.id));
  return shared.length
    ? `<span class="tags cmp-tags">${shared.map(x => `<span class="tag">${escapeHTML(x.symbol.title)}</span>`).join('')}</span>`
    : escapeHTML(t('compare.symbols.none'));
}
// 兩張牌是否被列為相關的牌：兩個方向各查一次（A 的清單裡有 B、B 的清單裡有 A），各附上說明
function relatedHTML(a, b) {
  const refs = loadedRefs()?.cardRefs;
  const notes = [[a, b], [b, a]].map(([from, to]) => ({ from, r: (refs?.[from.nameKey]?.related || []).find(r => r.card === to.nameKey) })).filter(x => x.r);
  if (!notes.length) return escapeHTML(t('compare.related.none'));
  return notes.map(({ from, r }) => `<p class="cmp-line cmp-rel"><span class="tag refs-kind" data-kind="${escapeHTML(r.kind)}">${escapeHTML(relatedKindLabel(r.kind))}</span><span class="cmp-sub">${escapeHTML(t('compare.related.dir', { from: from.name }))}</span>${escapeHTML(r.note || '')}</p>`).join('');
}
function renderCompare() {
  const body = document.getElementById('compareBody');
  if (!body || !cardA) return;
  if (!cardB) {
    body.innerHTML = `<div class="cmp-head">${headHTML(cardA)}</div><p class="cmp-empty">${escapeHTML(t('compare.empty'))}</p>`;
    return;
  }
  const pair = (fn) => [cardA, cardB].map(c => `<dd><span class="visually-hidden">${escapeHTML(c.name)}：</span>${fn(c)}</dd>`).join('');
  const row = (label, cells, wide = false) => `<div class="cmp-row${wide ? ' cmp-row-wide' : ''}"><dt>${escapeHTML(t(label))}</dt>${cells}</div>`;
  const refsOk = !!loadedRefs();
  body.innerHTML = `
<div class="cmp-head">${headHTML(cardA)}${headHTML(cardB)}</div>
<dl class="cmp-rows">
${row('compare.row.keywords', pair(keywordsHTML))}
${row('compare.row.yesno', pair(yesnoHTML))}
${row('compare.row.attr', pair(attrHTML))}
${refsOk ? row('compare.row.names', pair(namesHTML)) : ''}
${refsOk ? row('compare.row.timing', pair(timingHTML)) : ''}
${refsOk ? row('compare.row.symbols', `<dd>${sharedSymbolsHTML(cardA, cardB)}</dd>`, true) : ''}
${refsOk ? row('compare.row.related', `<dd>${relatedHTML(cardA, cardB)}</dd>`, true) : ''}
</dl>
${refsOk && loadedContexts() ? '' : `<p class="cmp-empty load-failed">${escapeHTML(t('compare.loadFailed'))}</p>`}`;
}
// 從卡片詳情打開：先關掉卡片詳情（兩層抽屜疊在一起不好操作），關閉比較後焦點回到最初打開卡片詳情的地方
export function openCompare(nameKey) {
  const card = cardByKey.get(nameKey);
  if (!card || !overlay) return;
  cardA = card;
  if (cardB === cardA) cardB = null;
  filterEl.value = '';
  fillOptions();
  renderCompare();
  closeCardModal();
  overlay.querySelector('.modal').scrollTop = 0;
  overlay.classList.add('show');
  // 是非傾向與參考資料另外載入；到了（或確定載不到）再重畫一次
  if (!loadedContexts() || !loadedRefs()) {
    Promise.allSettled([loadContexts(), loadRefs()]).then(() => {
      if (overlay.classList.contains('show') && cardA === card) {
        fillOptions();
        renderCompare();
      }
    });
  }
}
export function closeCompareModal() {
  overlay?.classList.remove('show');
}
