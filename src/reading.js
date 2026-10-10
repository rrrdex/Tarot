import { t } from './i18n.js';
import {
  downloadBlob,
  escapeHTML,
  formatDate,
  isValidSeed,
  keywordList,
  newSeed,
  randomInt,
  readNeonSuitColors,
  scrollBehavior,
  seedRng,
  showToast,
  shuffle,
  updateURL
} from './utils.js';
import {
  courtCards,
  fullTarotCards,
  getCardImageUrl,
  majorArcana,
  minorArcana,
  numberedCards,
  orientationNames,
  spreadLayouts,
  spreads,
  suitNames,
  tendencyNames
} from './data.js';
import {
  HISTORY_MAX,
  currentTab,
  lastReadingData,
  readingHistory,
  saveHistory,
  setLastReadingData,
  setReadingHistory,
  trimHistory
} from './state.js';
import { readBtn, readBtnText, resultsEl, spreadTypeEl } from './dom.js';
import { LAYOUT_IMG_SIZES, renderCard, visualStyle } from './render.js';
import { loadContexts, loadDeck, loadMeaningTexts, loadedContexts, loadedMeaningTexts } from './lazy.js';
import { positionRole } from './position-roles.js';
import { isTopic } from './topics.js';
import { cardMeaningText, keywordsFor } from './meanings.js';
import { generateInsight } from './insight.js';
import { enhanceReadingPager } from './pager.js';
import { haptic } from './haptics.js';
import * as storage from './storage.js';

const DECKS = {
  full: fullTarotCards,
  major: majorArcana,
  minor: minorArcana,
  court: courtCards,
  numbered: numberedCards
};
export function isDeckType(v) {
  return Object.prototype.hasOwnProperty.call(DECKS, v);
}
function getDeck(deckType) {
  return [...(DECKS[deckType] || fullTarotCards)];
}
// 分享連結的 picks 是否能用在這個牌組與牌陣：張數對、不重複、都在可選的範圍內（最後一張是底牌）
export function validPicks(picks, deckType, spreadType) {
  const spread = spreads[spreadType];
  if (!spread || !Array.isArray(picks) || picks.length !== spread.positions.length) return false;
  const max = getDeck(deckType).length - 2;
  return picks.every(n => Number.isInteger(n) && n >= 0 && n <= max) && new Set(picks).size === picks.length;
}
function spreadNameOf(spreadType) {
  const opt = Array.from(spreadTypeEl.options).find(o => o.value === spreadType);
  return (opt && opt.dataset.spreadName) || `spread.${spreadType}.name`;
}
// 牌組、牌陣與問題由呼叫端明確指定（分享連結），沒指定才讀表單
function buildReadingConfig(seedOverride, save, opts = {}) {
  const deckType = isDeckType(opts.deckType) ? opts.deckType : document.getElementById('deckType').value;
  const spreadType = spreads[opts.spreadType] ? opts.spreadType : spreadTypeEl.value;
  const question = typeof opts.question === 'string' ? opts.question : document.getElementById('question').value.trim();
  const topicIn = typeof opts.topic === 'string' ? opts.topic : document.getElementById('topic').value;
  const topic = isTopic(topicIn) ? topicIn : '';
  const deck = getDeck(deckType);
  const seed = isValidSeed(seedOverride) ? String(seedOverride) : newSeed();
  const rng = seedRng(seed);
  const shuffled = shuffle(deck, rng);
  const orientations = shuffled.map(() => rng() > 0.5 ? 'upright' : 'reversed');
  const spread = spreads[spreadType];
  return {
    seed, deckType, spreadType, spreadName: spreadNameOf(spreadType), question, topic,
    shuffled, orientations, positions: spread.positions, save,
    // 開啟分享連結時不搶焦點（只捲動），免得頁面一載入就畫出焦點框
    focus: opts.focus !== false
  };
}
// 每次開始、取消或改看別的紀錄都換一個號碼；延遲執行的完成步驟發現號碼變了就作廢，
// 避免舊的那一次在稍後蓋掉（並存下）新的結果
let readingToken = 0;
let pendingReading = null;
let readBusy = false;
export function isReadBusy() {
  return readBusy;
}
// 不用 disabled：按鈕停用時焦點會被丟掉，螢幕閱讀器也讀不到轉圈中的狀態
function setReadBusy(on) {
  readBusy = on;
  if (on) {
    readBtn.setAttribute('aria-disabled', 'true');
    readBtnText.innerHTML = `<span class="spinner" aria-hidden="true"></span><span class="visually-hidden">${escapeHTML(t('reading.busy'))}</span>`;
  } else if (readBtn.hasAttribute('aria-disabled')) {
    readBtn.removeAttribute('aria-disabled');
    readBtnText.textContent = t('btn.startReading');
  }
}
export function cancelPendingReading() {
  readingToken++;
  pendingReading = null;
  setReadBusy(false);
}
export function performReading(seedOverride, save = true, picks = null, opts = {}) {
  cancelPendingReading();
  const cfg = buildReadingConfig(seedOverride, save, opts);
  const num = cfg.positions.length;
  if (cfg.shuffled.length < num + 1) {
    showToast(t('toast.deckTooSmall'), 'error');
    return;
  }
  const token = readingToken;
  const firstN = () => Array.from({ length: num }, (_, i) => i);
  if (picks === 'first') {
    completeReading(cfg, firstN(), false, token);
    return;
  }
  if (Array.isArray(picks)) {
    completeReading(cfg, validPicks(picks, cfg.deckType, cfg.spreadType) ? picks : firstN(), false, token);
    return;
  }
  const interactive = storage.get('interactiveDraw') !== 'false';
  if (!interactive) {
    setReadBusy(true);
    setTimeout(() => {
      // 直接翻出結果（不親手選牌）：翻開時給一下觸覺回饋
      if (token === readingToken) haptic();
      completeReading(cfg, firstN(), true, token);
    }, 500);
    return;
  }
  renderCardSelection(cfg, token);
}
function renderCardSelection(cfg, token) {
  pendingReading = { ...cfg, picks: [], token };
  const num = cfg.positions.length;
  const pickable = cfg.shuffled.length - 1;
  resultsEl.innerHTML = `
<div class="panel fade-in">
<div class="pick-header">
<h2 class="results-title" tabindex="-1">${escapeHTML(t('pick.title'))}</h2>
<p class="pick-hint">${escapeHTML(t(cfg.spreadName))} · ${t('pick.hint', { n: num })}</p>
<div class="pick-progress" id="pickProgress" role="status">${escapeHTML(t('pick.progress', { n: 0, total: num }))}</div>
</div>
<div class="pick-grid" id="pickGrid" data-keynav="grid">
${Array.from({ length: pickable }, (_, i) => `
<button class="pick-card" data-idx="${i}" tabindex="${i === 0 ? 0 : -1}" data-keynav-item aria-label="${escapeHTML(t('pick.cardBack', { n: i + 1 }))}"></button>
`).join('')}
</div>
<div class="btn-group">
<button class="btn btn-tertiary" id="pickRandom">${escapeHTML(t('pick.random'))}</button>
<button class="btn btn-tertiary" id="pickReshuffle">${escapeHTML(t('pick.reshuffle'))}</button>
<button class="btn btn-tertiary" id="pickCancel">${escapeHTML(t('btn.cancel'))}</button>
</div>
</div>
`;
  // 結果區換成選牌畫面，網址上不再是上一次的結果
  syncReadingURL();
  const grid = document.getElementById('pickGrid');
  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('.pick-card');
    if (!btn || btn.disabled || !pendingReading) return;
    selectPick(Number(btn.dataset.idx), btn);
  });
  document.getElementById('pickRandom').addEventListener('click', () => {
    if (!pendingReading) return;
    const remaining = [];
    for (let i = 0; i < pickable; i++) {
      if (!pendingReading.picks.includes(i)) remaining.push(i);
    }
    while (pendingReading && pendingReading.picks.length < num && remaining.length) {
      const j = randomInt(remaining.length);
      const idx = remaining.splice(j, 1)[0];
      selectPick(idx, grid.querySelector(`.pick-card[data-idx="${idx}"]`));
    }
  });
  document.getElementById('pickReshuffle').addEventListener('click', () => {
    performReading(undefined, cfg.save, null, { deckType: cfg.deckType, spreadType: cfg.spreadType, question: cfg.question, topic: cfg.topic });
  });
  document.getElementById('pickCancel').addEventListener('click', () => {
    cancelPendingReading();
    resultsEl.innerHTML = '';
    syncReadingURL();
    readBtn.focus();
  });
  focusResults();
}
// 選過的牌會停用：把唯一可用 Tab 進入的位置（tabindex=0）交給下一張還能選的牌
function passRovingFocus(btn, hadFocus) {
  if (btn.tabIndex !== 0) return;
  const cards = Array.from(btn.parentElement.querySelectorAll('.pick-card'));
  const start = cards.indexOf(btn);
  for (let k = 1; k < cards.length; k++) {
    const next = cards[(start + k) % cards.length];
    if (next.disabled) continue;
    btn.tabIndex = -1;
    next.tabIndex = 0;
    if (hadFocus) next.focus();
    return;
  }
}
function selectPick(idx, btn) {
  const cfg = pendingReading;
  if (!cfg || cfg.picks.length >= cfg.positions.length) return;
  cfg.picks.push(idx);
  haptic();
  const order = cfg.picks.length;
  if (btn) {
    const hadFocus = document.activeElement === btn;
    btn.classList.add('selected');
    btn.textContent = order;
    btn.disabled = true;
    btn.setAttribute('aria-label', t('pick.cardPicked', { n: idx + 1, order }));
    passRovingFocus(btn, hadFocus);
  }
  const progress = document.getElementById('pickProgress');
  if (progress) progress.textContent = t('pick.progress', { n: order, total: cfg.positions.length });
  if (order === cfg.positions.length) {
    pendingReading = null;
    setTimeout(() => completeReading(cfg, cfg.picks, true, cfg.token), 450);
  }
}
function completeReading(cfg, picks, revealed, token) {
  if (token !== readingToken) return;
  const { seed, deckType, spreadType, spreadName, question, topic, shuffled, orientations, positions, save } = cfg;
  const drawn = picks.map((deckIdx, i) => ({
    ...shuffled[deckIdx],
    position: positions[i],
    orientation: orientations[deckIdx]
  }));
  const bottomIdx = shuffled.length - 1;
  const bottomCard = {
    ...shuffled[bottomIdx],
    position: 'spread.bottom',
    orientation: orientations[bottomIdx]
  };
  const reading = {
    id: Date.now(),
    seed,
    deckType,
    spreadType,
    spreadName,
    question,
    topic,
    picks,
    drawnCards: drawn,
    bottomCard,
    timestamp: Date.now(),
    favorite: false,
    tags: [],
    note: ''
  };
  setLastReadingData(reading);
  let trimmed = 0;
  if (save) {
    const result = trimHistory([reading, ...readingHistory], HISTORY_MAX, reading.id);
    setReadingHistory(result.list);
    trimmed = result.trimmed;
  }
  // 先更新畫面，最後才寫入儲存空間：寫入失敗時結果照樣顯示
  renderResults(reading, revealed);
  setReadBusy(false);
  syncReadingURL();
  focusResults(cfg.focus);
  if (save) {
    saveHistory();
    if (trimmed) showToast(t('toast.historyTrimmed', { n: trimmed, max: HISTORY_MAX }), 'warning');
  }
}
// 焦點移到結果標題（螢幕閱讀器從這裡開始念），畫面捲到結果區
export function focusResults(moveFocus = true) {
  const title = resultsEl.querySelector('.results-title');
  if (title && moveFocus) title.focus({ preventScroll: true });
  requestAnimationFrame(() => {
    resultsEl.scrollIntoView({ behavior: scrollBehavior(), block: 'start' });
  });
}
// 結果區目前顯示的那一次占卜（選牌中、取消後都沒有）
export function shownReading() {
  const panel = resultsEl.querySelector('[data-reading-id]');
  if (!panel || !lastReadingData || lastReadingData.id === undefined) return null;
  return String(lastReadingData.id) === panel.dataset.readingId ? lastReadingData : null;
}
const NO_READING_PARAMS = { seed: null, deck: null, spread: null, topic: null, q: null, picks: null };
function readingURLParams(r) {
  if (!r || !isValidSeed(r.seed)) return NO_READING_PARAMS;
  const picks = Array.isArray(r.picks) && !r.picks.every((p, i) => p === i) ? r.picks.join('-') : null;
  return { seed: r.seed, deck: r.deckType || null, spread: r.spreadType || null, topic: isTopic(r.topic) ? r.topic : null, q: r.question || null, picks };
}
// 網址只帶「占卜分頁上正在顯示的結果」：複製、分享、重新整理都以它為準；在其他分頁時不帶，重新整理才不會跳回占卜分頁
export function syncReadingURL() {
  updateURL(readingURLParams(currentTab === 'reading' ? shownReading() : null));
}
export function clearReadingURL() {
  updateURL(NO_READING_PARAMS);
}
// 逐張解讀要多附哪些段落：選了主題就附主題的讀法；是非指引牌陣附每張牌這一面的是非傾向
function readingView(r) {
  return { topic: isTopic(r && r.topic) ? r.topic : '', yesno: !!r && r.spreadType === 'yesno' };
}
export function renderResults(data, revealed = false) {
  const { spreadName, spreadType, question, drawnCards, bottomCard, favorite, note } = data;
  const view = readingView(data);
  const anim = revealed ? 'flip-in' : 'slide-in';
  const layout = (spreadLayouts[spreadType] &&
    spreadLayouts[spreadType].cells.length === drawnCards.length) ? spreadLayouts[spreadType] : null;
  const cardsHTML = layout ? `
<div class="spread-layout" style="--cols: ${layout.cols}" data-cols="${layout.cols}" data-keynav="grid">
${drawnCards.map((c, i) => {
      const cell = layout.cells[i];
      const gr = cell.rs ? `${cell.r} / span ${cell.rs}` : cell.r;
      return `<div class="spread-cell${cell.rot ? ' rotated' : ''}" style="--gr: ${gr}; --gc: ${cell.c}; --delay: ${i * 70}ms">${renderCard(c, false, anim, i, LAYOUT_IMG_SIZES)}</div>`;
    }).join('')}
</div>
<div class="bottom-card-row" style="--delay: ${drawnCards.length * 70}ms">
${renderCard(bottomCard, true, anim, 0, '220px')}
</div>
` : `
<div class="cards-grid" data-keynav="grid">
${drawnCards.map((c, i) => renderCard(c, false, anim, i)).join('')}
${renderCard(bottomCard, true, anim, drawnCards.length)}
</div>
`;
  const insights = generateInsight(data) || [];
  const insightHTML = insights.length ? `
<div class="insight-panel">
<h3 class="insight-title">${escapeHTML(t('insight.panel.title'))}</h3>
${insights.some(item => item.stat) ? `<div class="insight-sub">${escapeHTML(t('insight.panel.note'))}</div>` : ''}
${insights.map(item => `
<div class="insight-item">
<h4 class="insight-tag">${escapeHTML(item.tag)}</h4>
<p class="insight-text">${escapeHTML(item.text)}</p>
</div>
`).join('')}
</div>
` : '';
  resultsEl.innerHTML = `
<div class="panel fade-in" data-reading-id="${escapeHTML(String(data.id))}">
<div class="results-header">
<h2 class="results-title" tabindex="-1">${escapeHTML(t('reading.results.title'))}</h2>
<div class="results-meta">
<span class="badge ${favorite ? 'favorite' : ''}">${escapeHTML(t(spreadName))}</span>
${question ? `<span>${escapeHTML(question)}</span>` : ''}
${view.topic ? `<span class="results-topic">${escapeHTML(t('reading.meta.topic', { topic: t(`topic.${view.topic}`) }))}</span>` : ''}
</div>
</div>
${note ? `<div class="card-notes">${escapeHTML(note)}</div>` : ''}
${cardsHTML}
${readingDetailHTML(drawnCards, bottomCard, view)}
${insightHTML}
<div class="btn-group">
<button class="btn btn-tertiary btn-sm" data-action="copyResults">${escapeHTML(t('btn.copyResults'))}</button>
<button class="btn btn-tertiary btn-sm" data-action="generateShareImage">${escapeHTML(t('btn.shareImage'))}</button>
<button class="btn btn-tertiary btn-sm" data-action="printReading">${escapeHTML(t('btn.print'))}</button>
</div>
</div>
`;
  bindReadingDetail();
  // 新版型：逐張解讀改成一次一張的翻頁器（簡約版型維持清單）
  enhanceReadingPager(resultsEl.querySelector('.reading-detail'), [...drawnCards, bottomCard].filter(Boolean));
}
function oriLabel(c) {
  return t(orientationNames[c.orientation] || c.orientation);
}
// 逐張解讀：一個牌位一段，依序是牌位與它的讀法、抽到的牌與方向、這個方向的關鍵詞、這個方向的牌義。
// 牌多（凱爾特十字、十二宮）時牌義先收合，掃過牌位與關鍵詞就能看出全貌，想細讀再點開
const DETAIL_OPEN_MAX = 4;
function positionDesc(pos) {
  const key = `${pos}.desc`;
  const desc = t(key);
  return desc !== key ? desc : '';
}
// 牌位屬於建議、阻礙或結果時，這張牌放在這種位置的讀法（contexts.js 的 positions）。
// 情境資料另外打包：還沒載入就回傳 null，由 fillRoleTexts 補上；沒有讀法時回傳空字串
function roleText(c) {
  const role = positionRole(c.position);
  if (!role) return '';
  const ctx = loadedContexts();
  if (!ctx) return null;
  const text = ctx.cardContexts?.[c.nameKey]?.positions?.[role]?.[c.orientation];
  return typeof text === 'string' ? text : '';
}
function roleHTML(c) {
  const text = roleText(c);
  if (text === '') return '';
  // 還在載入時先藏起來（這段只是補充，不放「載入中」），載到後填字並顯示；載不到就整段拿掉
  return `<p class="rd-role"${text === null ? ` hidden data-rd-role="${escapeHTML(c.nameKey)}" data-orientation="${escapeHTML(c.orientation)}" data-position="${escapeHTML(c.position)}"` : ''}><span class="rd-role-label">${escapeHTML(t('reading.detail.role'))}</span><span class="rd-role-text">${escapeHTML(text || '')}</span></p>`;
}
// 選了主題時，這張牌在這個主題、抽到這一面的讀法；是非指引牌陣另外附上這一面的是非傾向。
// 和牌位讀法一樣：情境資料還沒載入就先藏起來，載到後由 fillGuideTexts 補上
function guideParts(c, view) {
  const ctx = loadedContexts();
  if (!ctx) return null;
  const parts = [];
  if (view.yesno) {
    const y = ctx.yesnoOf(c.nameKey, c.orientation);
    if (y) parts.push({ kind: 'yesno', tendency: tendencyNames[y.tendency] ? y.tendency : 'unclear', text: y.note || '' });
  }
  if (view.topic) {
    const text = ctx.topicText(c, view.topic, c.orientation);
    if (text) parts.push({ kind: 'topic', text });
  }
  return parts;
}
function guidePartHTML(p, topic) {
  if (p.kind === 'yesno') {
    return `<p class="rd-role rd-yesno"><span class="rd-role-label">${escapeHTML(t('reading.detail.yesno'))}</span><span class="rd-role-text"><span class="yesno-badge ${p.tendency}">${escapeHTML(t(tendencyNames[p.tendency]))}</span> ${escapeHTML(p.text)}</span></p>`;
  }
  return `<p class="rd-role rd-topic"><span class="rd-role-label">${escapeHTML(t(`topic.${topic}`))}</span><span class="rd-role-text">${escapeHTML(p.text)}</span></p>`;
}
function guideHTML(c, view) {
  if (!view.topic && !view.yesno) return '';
  const parts = guideParts(c, view);
  if (parts) return parts.map(p => guidePartHTML(p, view.topic)).join('');
  return `<div class="rd-guide" hidden data-rd-guide="${escapeHTML(c.nameKey)}" data-orientation="${escapeHTML(c.orientation)}"></div>`;
}
function detailItemHTML(c, num, open, view = {}) {
  const ori = oriLabel(c);
  const keywords = keywordsFor(c.nameKey, c.orientation);
  const desc = num ? positionDesc(c.position) : t('spread.bottom.desc');
  // 完整牌義另外打包；還沒載入就先寫「載入中」，載入後由 fillDetailTexts 補上
  const texts = loadedMeaningTexts();
  const text = texts ? cardMeaningText(c, c.orientation) : '';
  const pending = !texts;
  return `
<article class="rd-item${num ? '' : ' rd-bottom'}">
<div class="rd-pos">
${num ? `<span class="rd-num" aria-hidden="true">${num}</span>` : ''}
<div class="rd-pos-text">
<h4 class="rd-pos-name">${escapeHTML(t(c.position))}</h4>
${desc ? `<p class="rd-pos-desc">${escapeHTML(desc)}</p>` : ''}
</div>
</div>
<div class="rd-body">
<div class="rd-card">
<p class="rd-card-name">${escapeHTML(c.name)}<span class="rd-ori"><span class="ori-icon ${c.orientation === 'reversed' ? 'reversed' : ''}" aria-hidden="true"></span>${escapeHTML(ori)}</span></p>
<button type="button" class="rd-more" data-action="openCardModal" data-card="${escapeHTML(c.nameKey)}" data-orientation="${escapeHTML(c.orientation)}" aria-label="${escapeHTML(t('reading.detail.more.label', { name: c.name, ori }))}">${escapeHTML(t('reading.detail.more'))}</button>
</div>
${keywords.length ? `<p class="rd-kw">${keywordList(keywords)}</p>` : ''}
${roleHTML(c)}
${guideHTML(c, view)}
${(text || pending) ? `
<details class="rd-text"${open ? ' open' : ''}>
<summary class="rd-text-title">${escapeHTML(t('reading.detail.text', { ori }))}</summary>
<p class="rd-text-body"${pending ? ` data-rd-text="${escapeHTML(c.nameKey)}" data-orientation="${escapeHTML(c.orientation)}"` : ''}>${escapeHTML(pending ? t('card.loading') : text)}</p>
</details>
` : ''}
</div>
</article>
`;
}
function readingDetailHTML(drawnCards, bottomCard, view = {}) {
  const total = drawnCards.length + (bottomCard ? 1 : 0);
  const open = total <= DETAIL_OPEN_MAX;
  return `
<section class="reading-detail" aria-labelledby="readingDetailTitle"${view.topic ? ` data-topic="${escapeHTML(view.topic)}"` : ''}${view.yesno ? ' data-yesno="true"' : ''}>
<div class="rd-header">
<h3 class="insight-title rd-title" id="readingDetailTitle">${escapeHTML(t('reading.detail.title'))}</h3>
${open ? '' : `<button type="button" class="rd-toggle-all" aria-controls="readingDetailList">${escapeHTML(t('reading.detail.expandAll'))}</button>`}
</div>
<div id="readingDetailList">
<ol class="rd-list">
${drawnCards.map((c, i) => `<li>${detailItemHTML(c, i + 1, open, view)}</li>`).join('')}
</ol>
${bottomCard ? detailItemHTML(bottomCard, 0, open, view) : ''}
</div>
</section>
`;
}
// 牌義載入後補進目前畫面上還在等的段落；每段自己帶著牌與方向，重畫過的結果不會被舊的資料蓋掉
function fillDetailTexts() {
  if (!resultsEl.querySelector('[data-rd-text]')) return;
  const fill = (ok) => {
    resultsEl.querySelectorAll('[data-rd-text]').forEach(p => {
      const text = ok ? cardMeaningText({ nameKey: p.dataset.rdText }, p.dataset.orientation) : '';
      p.removeAttribute('data-rd-text');
      if (ok && !text) {
        p.closest('details').remove();
        return;
      }
      p.textContent = ok ? text : t('error.chunkOffline');
      p.classList.toggle('load-failed', !ok);
    });
  };
  loadMeaningTexts().then(() => fill(true), () => fill(false));
}
function fillRoleTexts() {
  if (!resultsEl.querySelector('[data-rd-role]')) return;
  const fill = (ok) => {
    resultsEl.querySelectorAll('[data-rd-role]').forEach(p => {
      const text = ok ? roleText({ nameKey: p.dataset.rdRole, orientation: p.dataset.orientation, position: p.dataset.position }) : '';
      if (!text) {
        p.remove();
        return;
      }
      p.removeAttribute('data-rd-role');
      p.querySelector('.rd-role-text').textContent = text;
      p.hidden = false;
    });
  };
  loadContexts().then(() => fill(true), () => fill(false));
}
function fillGuideTexts() {
  if (!resultsEl.querySelector('[data-rd-guide]')) return;
  const view = resultsEl.querySelector('.reading-detail')?.dataset || {};
  const fill = (ok) => {
    resultsEl.querySelectorAll('[data-rd-guide]').forEach(el => {
      const parts = ok ? guideParts({ nameKey: el.dataset.rdGuide, orientation: el.dataset.orientation }, { topic: view.topic, yesno: view.yesno === 'true' }) : null;
      if (!parts || !parts.length) {
        el.remove();
        return;
      }
      el.outerHTML = parts.map(p => guidePartHTML(p, view.topic)).join('');
    });
  };
  loadContexts().then(() => fill(true), () => fill(false));
}
function syncToggleAll(btn, list) {
  const allOpen = Array.from(list.querySelectorAll('details')).every(d => d.open);
  btn.textContent = t(allOpen ? 'reading.detail.collapseAll' : 'reading.detail.expandAll');
}
function bindReadingDetail() {
  fillDetailTexts();
  fillRoleTexts();
  fillGuideTexts();
  const btn = resultsEl.querySelector('.rd-toggle-all');
  const list = document.getElementById('readingDetailList');
  if (!btn || !list) return;
  btn.addEventListener('click', () => {
    const details = Array.from(list.querySelectorAll('details'));
    const open = !details.every(d => d.open);
    details.forEach(d => { d.open = open; });
    syncToggleAll(btn, list);
  });
  // toggle 事件不會冒泡，用捕捉階段收到每一段的開合
  list.addEventListener('toggle', () => syncToggleAll(btn, list), true);
}
// 列印時展開所有牌義，印完恢復原本的開合
let printOpened = [];
window.addEventListener('beforeprint', () => {
  printOpened = Array.from(resultsEl.querySelectorAll('.reading-detail details:not([open])'));
  printOpened.forEach(d => { d.open = true; });
});
window.addEventListener('afterprint', () => {
  printOpened.forEach(d => { d.open = false; });
  printOpened = [];
});
function cardLine(c, view) {
  const lines = [`${t(c.position)}：${c.name}（${oriLabel(c)}）`];
  const keywords = keywordsFor(c.nameKey, c.orientation);
  if (keywords.length) lines.push(t('reading.copy.keywords', { kw: keywords.join('、') }));
  // 牌位屬於建議、阻礙或結果時附上這張牌在這種位置的讀法；情境資料還沒載入（或離線）時只少這一行
  const role = roleText(c);
  if (role) lines.push(t('reading.copy.role', { text: role }));
  (guideParts(c, view) || []).forEach(p => {
    lines.push(p.kind === 'yesno'
      ? t('reading.copy.yesno', { tendency: t(tendencyNames[p.tendency]), note: p.text })
      : t('reading.copy.topic', { topic: t(`topic.${view.topic}`), text: p.text }));
  });
  return lines.join('\n');
}
export function copyResults() {
  const { spreadName, question, drawnCards, bottomCard } = lastReadingData;
  if (!drawnCards) return;
  const text = [
    `${t(spreadName)}${question ? `—${question}` : ''}`,
    '---',
    [...drawnCards, bottomCard].filter(Boolean).map(c => cardLine(c, readingView(lastReadingData))).join('\n\n'),
    '',
    location.href
  ].join('\n');
  if (!navigator.clipboard) {
    showToast(t('toast.copyFailed'), 'error');
    return;
  }
  navigator.clipboard.writeText(text).then(() => {
    showToast(t('toast.copied'));
  }).catch(() => {
    showToast(t('toast.copyFailed'), 'error');
  });
}
function shareImagePalette() {
  const cs = getComputedStyle(document.documentElement);
  const v = (name) => cs.getPropertyValue(name).trim();
  const suit = readNeonSuitColors(Object.keys(suitNames));
  const lit = Object.keys(suit).length > 0;
  return {
    bg: v('--bg'),
    text: v('--text'),
    sub: v('--text-secondary'),
    divider: v('--divider'),
    accent: v('--accent'),
    up: v('--yesno-yes'),
    rev: v('--yesno-no'),
    glow: lit,
    suit: lit ? suit : null
  };
}
// 線稿牌面的顏色：霓虹主題把牌框色設在 svg.line-art 上（而且依花色變），不在 :root，
// 所以拿一張隱藏的牌實際量，墨線色取 color（霓虹主題用花色色）
function lineArtColors(suit) {
  const host = document.createElement('div');
  host.className = 'card visual-api';
  host.dataset.suit = suit;
  host.style.display = 'none';
  host.innerHTML = '<svg class="card-image line-art"></svg>';
  document.body.appendChild(host);
  const cs = getComputedStyle(host.firstElementChild);
  const v = (name) => cs.getPropertyValue(name).trim();
  const colors = { paper: v('--deck-paper'), tint: v('--deck-tint'), gold: v('--deck-gold'), ink: cs.color };
  host.remove();
  return colors;
}
function shareGlyph(ctx, suit, x, y, s, color) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  if (suit === 'Wands') {
    ctx.stroke(new Path2D('M0 -26 L0 26 M0 -12 L-9 -21 M0 -4 L9 -13'));
    ctx.beginPath(); ctx.arc(0, -26, 2.5, 0, Math.PI * 2); ctx.fill();
  } else if (suit === 'Cups') {
    ctx.stroke(new Path2D('M-19 -24 L19 -24 C19 -2 8 6 0 6 C-8 6 -19 -2 -19 -24 M0 6 L0 24 M-14 24 L14 24'));
  } else if (suit === 'Swords') {
    ctx.stroke(new Path2D('M0 -28 L0 12 M-4 -19 L0 -28 L4 -19 M-13 12 L13 12 M0 12 L0 23'));
    ctx.beginPath(); ctx.arc(0, 26.5, 3.5, 0, Math.PI * 2); ctx.stroke();
  } else if (suit === 'Pentacles') {
    ctx.beginPath(); ctx.arc(0, 0, 24, 0, Math.PI * 2); ctx.stroke();
    ctx.stroke(new Path2D('M0 -17.6 L10.3 14.2 L-16.7 -5.4 L16.7 -5.4 L-10.3 14.2 Z'));
  } else {
    ctx.fill(new Path2D('M-23 0 a23 23 0 1 0 46 0 a23 23 0 1 0 -46 0 M-10 0 a16 16 0 1 0 32 0 a16 16 0 1 0 -32 0'), 'evenodd');
  }
  ctx.restore();
}
// 分享圖的牌面：線稿模式畫自製牌組，圖片模式畫偉特牌縮圖；文字模式維持只有花色符號
function loadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}
async function shareCardFaces(cards) {
  if (visualStyle === 'line') {
    const { getCardArtImage } = await loadDeck().catch(() => ({}));
    if (!getCardArtImage) return cards.map(() => null);
    const bySuit = new Map();
    return Promise.all(cards.map(async (card) => {
      if (!bySuit.has(card.suit)) bySuit.set(card.suit, lineArtColors(card.suit));
      const svg = getCardArtImage(card, bySuit.get(card.suit), true);
      if (!svg) return null;
      const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
      const img = await loadImage(url);
      URL.revokeObjectURL(url);
      return img;
    }));
  }
  if (visualStyle === 'api') return Promise.all(cards.map(card => loadImage(getCardImageUrl(card, 'webp', 160))));
  return Promise.resolve(cards.map(() => null));
}
// 產生中再按一次不會重複下載
let shareImageBusy = false;
export async function generateShareImage() {
  if (shareImageBusy) return;
  const data = lastReadingData;
  if (!data.drawnCards) {
    showToast(t('toast.noReading'), 'warning');
    return;
  }
  shareImageBusy = true;
  try {
    const blob = await drawShareImage(data);
    if (!blob) {
      showToast(t('toast.shareImageFailed'), 'error');
      return;
    }
    downloadBlob(blob, `tarot-${data.seed || Date.now()}.png`);
    showToast(t('toast.shareImageDone'));
  } catch {
    showToast(t('toast.shareImageFailed'), 'error');
  } finally {
    shareImageBusy = false;
  }
}
async function drawShareImage({ spreadName, question, drawnCards, bottomCard, timestamp }) {
  const cards = [...drawnCards, bottomCard];
  const faces = await shareCardFaces(cards);
  const withFaces = faces.some(Boolean);
  const width = 800;
  const pad = 64;
  // 每列：牌位、牌名與正逆位、這次抽到的方向的關鍵詞
  const rowH = withFaces ? 108 : 96;
  // 牌面縮圖的高度與文字欄的左緣
  const faceH = 88;
  const textX = withFaces ? pad + 70 : pad + 44;
  const headerH = question ? 232 : 192;
  const height = headerH + cards.length * rowH + 100;
  const canvas = document.createElement('canvas');
  const scale = 2;
  canvas.width = width * scale;
  canvas.height = height * scale;
  const ctx = canvas.getContext('2d');
  ctx.scale(scale, scale);
  const P = shareImagePalette();
  ctx.fillStyle = P.bg;
  ctx.fillRect(0, 0, width, height);
  const font = '"Noto Sans TC", "PingFang TC", "Microsoft JhengHei", -apple-system, sans-serif';
  const truncate = (text, maxWidth) => {
    if (ctx.measureText(text).width <= maxWidth) return text;
    while (text.length && ctx.measureText(text + '…').width > maxWidth) text = text.slice(0, -1);
    return text + '…';
  };
  if (P.glow) { ctx.shadowColor = P.accent; ctx.shadowBlur = 14; }
  ctx.fillStyle = P.accent;
  ctx.font = `600 32px ${font}`;
  ctx.fillText(t('app.title'), pad, 96);
  ctx.shadowBlur = 0;
  ctx.fillStyle = P.sub;
  ctx.font = `500 19px ${font}`;
  ctx.fillText(`${t(spreadName)} · ${formatDate(timestamp)}`, pad, 132);
  if (question) {
    ctx.fillStyle = P.text;
    ctx.font = `400 19px ${font}`;
    ctx.fillText(truncate(`「${question}」`, width - pad * 2), pad, 172);
  }
  ctx.strokeStyle = P.divider;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(pad, headerH - 24);
  ctx.lineTo(width - pad, headerH - 24);
  ctx.stroke();
  cards.forEach((card, i) => {
    const y = headerH + i * rowH;
    // 有牌面時文字往下移，與縮圖的垂直中線對齊
    const dy = withFaces ? 14 : 0;
    const suitColor = P.suit ? (P.suit[card.suit] || P.accent) : P.text;
    const face = faces[i];
    if (face) {
      const h = faceH;
      const w = Math.round(h * face.naturalWidth / face.naturalHeight);
      const cx = pad + 26;
      const cy = y + 2 + h / 2;
      ctx.save();
      ctx.translate(cx, cy);
      if (card.orientation === 'reversed') ctx.rotate(Math.PI);
      ctx.drawImage(face, -w / 2, -h / 2, w, h);
      ctx.restore();
    } else {
      shareGlyph(ctx, card.suit, pad + 14, y + 28 + dy, 0.42, suitColor);
    }
    ctx.fillStyle = P.sub;
    ctx.font = `600 14px ${font}`;
    ctx.fillText(t(card.position), textX, y + 16 + dy);
    ctx.fillStyle = suitColor;
    ctx.font = `600 24px ${font}`;
    ctx.fillText(truncate(card.name, width - textX - pad - 96), textX, y + 46 + dy);
    ctx.font = `500 17px ${font}`;
    ctx.fillStyle = card.orientation === 'reversed' ? P.rev : P.up;
    const oriLabel = t(orientationNames[card.orientation] || card.orientation);
    ctx.fillText(oriLabel, width - pad - ctx.measureText(oriLabel).width, y + 44 + dy);
    const keywords = keywordsFor(card.nameKey, card.orientation);
    if (keywords.length) {
      ctx.fillStyle = P.sub;
      ctx.font = `400 15px ${font}`;
      ctx.fillText(truncate(keywords.join('・'), width - textX - pad), textX, y + 72 + dy);
    }
  });
  ctx.fillStyle = P.sub;
  ctx.font = `400 14px ${font}`;
  ctx.fillText(t('app.share.imageFooter'), pad, height - 44);
  return new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
}
export function printReading() {
  window.print();
}
