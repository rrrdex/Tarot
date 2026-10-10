import { t } from './i18n.js';
import { escapeHTML, keywordList, mulberry32, showToast, shuffle } from './utils.js';
import {
  fullTarotCards,
  getCardImageUrl,
  orientationNames,
  suitNames,
  tendencyNames
} from './data.js';
import { cardImageSize } from './card-dims.js';
import { waiteAdditional, waiteTerms } from './waite.js';
import { mofaTerms } from './mofa.js';
import { waiteTermZh } from './waite-zh.js';
import { cardClass, cardSystems, waiteCourtLooks } from './systems.js';
import { cardMeaningText, cardMeanings, keywordsFor } from './meanings.js';
import { loadContexts, loadDeck, loadLore, loadMeaningTexts, loadRefs, loadedDeck, loadedMeaningTexts, loadedRefs } from './lazy.js';
import { otherNameRows, relatedKindLabel, symbolDeckNote, symbolsOfCard, timingText } from './refs-ui.js';
import { currentTab, lastReadingData } from './state.js';
import { renderResults, shownReading } from './reading.js';
import { renderCardDatabase } from './database.js';
import { renderLearnStage } from './learn.js';
import { renderProfileCards } from './profile.js';
import { SUBTOPICS } from './topics.js';
import * as storage from './storage.js';

const VISUAL_STYLES = ['text', 'api', 'line'];
export let visualStyle = storage.get('visualStyle', 'text');
if (!VISUAL_STYLES.includes(visualStyle)) visualStyle = 'text';
function syncVisualRadios() {
  document.querySelectorAll('input[name="visualStyle"]').forEach(radio => {
    radio.checked = radio.value === visualStyle;
  });
}
// 先換畫面、最後才寫入儲存空間（寫入失敗也不影響切換）。
// 切到線稿模式時牌組可能還沒下載：先以文字顯示，載入後再補上插畫；回傳的 Promise 在牌組到齊（或不需要）時完成
export function setVisualStyle(style) {
  if (!VISUAL_STYLES.includes(style)) return Promise.resolve();
  visualStyle = style;
  syncVisualRadios();
  refreshCardVisuals();
  storage.set('visualStyle', style);
  return style === 'line' && !loadedDeck() ? loadDeck().then(refreshCardVisuals) : Promise.resolve();
}
// 啟動時不重畫：各區塊照常先畫，線稿牌組到了再補上插畫
export function initVisualStyle() {
  syncVisualRadios();
  if (visualStyle === 'line' && !loadedDeck()) loadDeck().then(refreshCardVisuals).catch(() => {});
}
// 卡片詳情目前顯示的牌與正逆位（縮圖與放大檢視共用）
let cardViewerTarget = null;
// 用函式宣告（會提升）：其他模組在 render.js 求值完成前就可能呼叫到這裡
function deckArt(card, extraClass) {
  return loadedDeck()?.getCardArt(card, extraClass) ?? null;
}
// 牌面樣式變了（切換樣式、線稿牌組載入完成、匯入）時重畫看得到的牌：
// 結果區只在正顯示那一次占卜時重畫，選牌中或取消後都不動；資料庫與學習分頁切過去時本來就會重畫，不在畫面上就不做
function refreshCardVisuals() {
  if (shownReading()) renderResults(lastReadingData);
  renderDailyCard();
  renderProfileCards();
  if (currentTab === 'database') renderCardDatabase();
  if (currentTab === 'learn') renderLearnStage();
  if (document.getElementById('cardModal')?.classList.contains('show')) {
    renderCardModalArt();
    // 符號的「僅原版牌圖／僅線稿牌組」跟著牌面樣式
    if (cardViewerTarget && loadedRefs()) renderCardModalRefs(loadedRefs(), cardViewerTarget.card);
  }
}
const CARD_THUMB_WIDTHS = [160, 320, 400];
const CARD_FULL_WIDTH = 500;
// <picture> 依 type 挑來源，不會因檔案 404 退回下一層：每種寬度的 avif、webp 都必須存在（scripts/images.mjs 產生）
function cardSources(card, sizes) {
  return ['avif', 'webp'].map(ext => {
    const srcset = [
      ...CARD_THUMB_WIDTHS.map(w => `${getCardImageUrl(card, ext, w)} ${w}w`),
      `${getCardImageUrl(card, ext)} ${CARD_FULL_WIDTH}w`
    ].join(', ');
    return `<source srcset="${escapeHTML(srcset)}" sizes="${escapeHTML(sizes)}" type="image/${ext}">`;
  }).join('\n');
}
// <img> 的備用來源：不支援 <picture> 的瀏覽器才會用到，網站只附 avif／webp，不附原始 JPG
function cardPhotoSrc(card) {
  return getCardImageUrl(card, 'webp');
}
// displayWidth：圖片在版面上的最大 CSS 寬度，瀏覽器據此挑合適的縮圖
export function cardThumb(card, extraClass = '', displayWidth = 150) {
  if (!card) return null;
  if (visualStyle === 'text') return null;
  if (visualStyle === 'line') {
    return deckArt(card, extraClass);
  }
  const src = cardPhotoSrc(card);
  if (!src) return null;
  const { w, h } = cardImageSize(card);
  return `<picture>
${cardSources(card, `${displayWidth}px`)}
<img class="card-image${extraClass ? ' ' + extraClass : ''}" src="${escapeHTML(src)}" alt=""
width="${w}" height="${h}" loading="lazy" decoding="async" data-thumb-name="${escapeHTML(card.name)}">
</picture>`;
}
// 提示用專門的名稱鍵，不沿用選項文字（選項上有「（預設）」）。
// 線稿牌組要等下載完成才說切換成功；下載失敗就提示並退回原本的樣式
document.querySelectorAll('input[name="visualStyle"]').forEach(radio => {
  radio.addEventListener('change', (e) => {
    if (!e.target.checked) return;
    const previous = visualStyle;
    const style = e.target.value;
    setVisualStyle(style).then(() => {
      if (visualStyle === style) showToast(t('toast.visualStyle', { name: t(`settings.visual.name.${style}`) }));
    }).catch(() => {
      if (visualStyle !== style) return;
      setVisualStyle(previous);
      showToast(t('toast.deckLoadFailed'), 'error', {
        action: { label: t('btn.reload'), onClick: () => location.reload() }
      });
    });
  });
});
// 離線時沒看過的牌圖抓不到：每張牌改顯示牌名，整頁只提示一次「需要網路」，不在每張牌上重複
let offlineImageNoticeShown = false;
function handleImageError(img, cardName) {
  const container = img.closest('.card-image-container') || img.parentElement;
  const offline = navigator.onLine === false;
  container.innerHTML = `
<div class="card-image-failed">
<div class="card-image-failed-name">${escapeHTML(cardName)}</div>
${offline ? '' : `<div class="card-image-failed-note">${escapeHTML(t('card.imageFailed'))}</div>`}
</div>
`;
  if (offline && !offlineImageNoticeShown) {
    offlineImageNoticeShown = true;
    showToast(t('toast.imagesOffline'), 'warning');
  }
}
// load / error 不會冒泡，只能在捕獲階段統一接
document.addEventListener('load', (e) => {
  const img = e.target;
  if (!(img instanceof HTMLImageElement) || !img.hasAttribute('data-card-photo')) return;
  img.style.opacity = '1';
  img.closest('.card-image-container').querySelector('.card-image-loading').style.display = 'none';
}, true);
document.addEventListener('error', (e) => {
  const img = e.target;
  if (!(img instanceof HTMLImageElement)) return;
  if (img.hasAttribute('data-card-photo')) {
    handleImageError(img, img.dataset.name);
  } else if (img.hasAttribute('data-thumb-name')) {
    // 縮圖（資料庫、學習、卡片詳情、每日一牌）抓不到：換成同尺寸的牌名框
    const box = img.closest('picture') || img;
    box.outerHTML = `<div class="card-thumb-failed">${escapeHTML(img.dataset.thumbName)}</div>`;
    if (navigator.onLine === false && !offlineImageNoticeShown) {
      offlineImageNoticeShown = true;
      showToast(t('toast.imagesOffline'), 'warning');
    }
  }
}, true);
// 牌陣版面裡的牌面寬度（見 style.css 的 .card.visual-api .card-image 與 .spread-layout）：
// 1024 以上排成牌陣、最寬 130px；以下是一或兩欄，牌面最寬 260px，單欄的窄螢幕約為螢幕寬的六成
export const LAYOUT_IMG_SIZES = '(min-width: 1024px) 130px, (min-width: 434px) 260px, 60vw';
export function renderCard(card, isBottom = false, anim = 'slide-in', idx = 0, imgSizes = '260px') {
  // 關鍵詞跟著這次抽到的方向：逆位牌顯示逆位關鍵詞
  const keywords = keywordsFor(card.nameKey, card.orientation);
  const photo = visualStyle === 'api' ? cardPhotoSrc(card) : null;
  const lineArt = visualStyle === 'line'
  ? deckArt(card, card.orientation === 'reversed' ? 'reversed' : '')
  : null;
  const visualClass = (photo || lineArt) ? 'visual-api' : '';
  const size = photo ? cardImageSize(card) : null;
  // 牌的欄位一律轉義：紀錄可能來自匯入的檔案
  return `
<div class="card ${isBottom ? 'bottom' : ''} ${visualClass} ${anim}"
tabindex="${idx === 0 ? 0 : -1}" data-keynav-item role="button" data-suit="${escapeHTML(card.suit)}"
data-action="openCardModal" data-card="${escapeHTML(card.nameKey)}" data-orientation="${escapeHTML(card.orientation)}">
${photo ? `
<div class="card-image-container">
<div class="card-image-loading">${escapeHTML(t('card.loading'))}</div>
<picture>
${cardSources(card, imgSizes)}
<img class="card-image${card.orientation === 'reversed' ? ' reversed' : ''}"
src="${escapeHTML(photo)}"
alt="" data-name="${escapeHTML(card.name)}"
width="${size.w}" height="${size.h}"
style="opacity: 0;" data-card-photo/>
</picture>
</div>
<div class="card-info">
` : ''}
${lineArt ? `
<div class="card-image-container">${lineArt}</div>
<div class="card-info">
` : ''}
<div class="card-position">${escapeHTML(t(card.position))}</div>
<div class="card-content">
<div class="card-name">${escapeHTML(card.name)}</div>
<div class="card-orientation">
<span class="ori-icon ${card.orientation === 'reversed' ? 'reversed' : ''}" aria-hidden="true"></span>
${escapeHTML(t(orientationNames[card.orientation] || card.orientation))}
</div>
</div>
${keywords.length ? `<div class="card-keywords">${keywordList(keywords)}</div>` : ''}
<div class="card-footer">
<span>${escapeHTML(card.suit === 'Major Arcana' ? card.number : t(suitNames[card.suit]))}</span>
<span>${escapeHTML(card.englishName)}</span>
</div>
${(photo || lineArt) ? '</div>' : ''}
</div>
`;
}
// 抽到的是正位或逆位：對應的牌義區塊標題加上看得見的「（本次抽到）」與 aria-current，不只靠框線顏色。
// drawn 為 false（從測驗、生日牌等處指定正逆位打開）時只突顯那一段，不說「本次抽到」
function markDrawnBlock(blockId, on, drawn = true) {
  const block = document.getElementById(blockId);
  if (!block) return;
  block.classList.toggle('active', on);
  const title = block.querySelector('.meaning-title');
  if (!title) return;
  title.querySelector('.meaning-drawn')?.remove();
  if (on && drawn) {
    title.setAttribute('aria-current', 'true');
    title.insertAdjacentHTML('beforeend', `<span class="meaning-drawn">${escapeHTML(t('card.meaning.drawn'))}</span>`);
  } else {
    title.removeAttribute('aria-current');
  }
}
// 程式片段下載失敗（離線、網站已更新）時，在面板裡直接說明，不留一片空白
function chunkFailedHTML() {
  return `<div class="lore-empty load-failed">${escapeHTML(t('error.chunkOffline'))}</div>`;
}
function setIconSegOffline(on) {
  const panel = document.getElementById('cardSegIcon');
  if (!panel) return;
  const note = document.getElementById('cardModalIconOffline');
  if (on && !note) {
    panel.insertAdjacentHTML('afterbegin', `<div id="cardModalIconOffline">${chunkFailedHTML()}</div>`);
  } else if (!on && note) {
    note.remove();
  }
}
let cardModalKey = null;
// 情境分頁目前顯示的方向（fixed：抽到的牌，不能切換）
let ctxView = { fixed: false, ori: 'upright' };
// fromReading：從占卜結果點開時，副標題也寫出這次抽到的正逆位。
// drawn：這個正逆位是真的抽到的（占卜結果、每日一牌）；測驗與生日牌只是指定要看哪一面
export function openCardModal(nameKey, orientation, { fromReading = false, drawn = fromReading, seg = 'meaning' } = {}) {
  const card = fullTarotCards.find(c => c.nameKey === nameKey);
  const m = cardMeanings[nameKey];
  if (!card || !m) return;
  document.getElementById('cardModalTitle').textContent = card.name;
  // 小牌的英文名已含位階（Three of Cups），不再重複編號
  const suit = t(suitNames[card.suit] || card.suit);
  const sub = card.suit === 'Major Arcana'
    ? t('card.sub', { en: card.englishName, suit, number: card.number })
    : t('card.sub.minor', { en: card.englishName, suit });
  const drawnOri = fromReading && orientationNames[orientation] ? t(orientationNames[orientation]) : '';
  document.getElementById('cardModalSub').textContent = drawnOri ? t('card.sub.drawn', { sub, ori: drawnOri }) : sub;
  cardViewerTarget = { card, orientation };
  renderCardModalArt();
  // 正位與逆位各有一組關鍵詞，分別放在對應的牌義段落裡
  const tagList = (list) => (list || []).map(k => `<span class="tag">${escapeHTML(k)}</span>`).join('');
  document.getElementById('cardModalKeywords').innerHTML = tagList(m.keywords);
  document.getElementById('cardModalKeywordsReversed').innerHTML = tagList(m.keywordsReversed);
  markDrawnBlock('meaningUpright', orientation === 'upright', drawn);
  markDrawnBlock('meaningReversed', orientation === 'reversed', drawn);
  markDrawnBlock('imageUpright', orientation === 'upright', drawn);
  markDrawnBlock('imageReversed', orientation === 'reversed', drawn);
  // 抽到逆位時，逆位的段落排在前面，打開就看得到，不必往下捲
  drawnBlockFirst('meaningUpright', 'meaningReversed', orientation === 'reversed');
  drawnBlockFirst('imageUpright', 'imageReversed', orientation === 'reversed');
  cardModalKey = nameKey;
  // 情境分頁：抽到的牌只顯示抽到的那一面；其他情況可切換正逆位，從指定的那一面（沒指定就正位）開始
  ctxView = { fixed: !!(drawn && orientationNames[orientation]), ori: orientation === 'reversed' ? 'reversed' : 'upright' };
  const compareBtn = document.getElementById('cardModalCompare');
  if (compareBtn) {
    compareBtn.dataset.card = nameKey;
    compareBtn.setAttribute('aria-label', t('compare.open.label', { name: card.name }));
  }
  // 完整牌義另外載入：先顯示「載入中」，到了再填；視窗已換成別張牌就不覆蓋
  if (loadedMeaningTexts()) {
    fillCardModalTexts(card);
  } else {
    setCardModalTexts(t('card.loading'));
    loadMeaningTexts()
      .then(() => { if (cardModalKey === nameKey) fillCardModalTexts(card); })
      .catch(() => { if (cardModalKey === nameKey) setCardModalTexts(t('error.chunkOffline'), true); });
  }
  // 資料晚到時，若視窗已換成別張牌就不要覆蓋；下載失敗時不依賴源流資料的部分照畫，其餘顯示「需要網路」
  loadContexts()
    .then(m => { if (cardModalKey === nameKey) renderCardModalContext(m, nameKey); })
    .catch(() => { if (cardModalKey === nameKey) renderCardModalContextFailed(); });
  // 對應系統不靠另外載入的資料，先畫；日期對應等參考資料到了再補上
  renderCardModalSystems(card);
  loadRefs()
    .then(m => {
      if (cardModalKey !== nameKey) return;
      renderCardModalSystems(card);
      renderCardModalRefs(m, card);
    })
    .catch(() => { if (cardModalKey === nameKey) renderCardModalRefs(null, card); });
  loadLore()
    .then(m => {
      if (cardModalKey !== nameKey) return;
      setIconSegOffline(false);
      renderCardModalLore(m, card, nameKey);
    })
    .catch(() => {
      if (cardModalKey !== nameKey) return;
      renderCardModalLore({ cardLore: {}, getCardLore: () => [] }, card, nameKey);
      setIconSegOffline(true);
      const list = document.getElementById('cardModalLoreList');
      if (list) list.innerHTML = chunkFailedHTML();
    });
  // 一般從牌義看起；從源流的「相關的牌」點過去時停在源流，方便接著比對
  setCardModalSeg(seg);
  const overlay = document.getElementById('cardModal');
  const wasOpen = overlay.classList.contains('show');
  // 每次換牌都從頂端看起；在視窗裡點了另一張牌（延伸閱讀的相關牌）時，焦點移到新的牌名上
  overlay.querySelector('.modal').scrollTop = 0;
  overlay.classList.add('show');
  if (wasOpen) {
    const title = document.getElementById('cardModalTitle');
    title.tabIndex = -1;
    title.focus({ preventScroll: true });
  }
}
function setCardModalTexts(text, failed = false) {
  ['cardModalUpright', 'cardModalReversed'].forEach(id => {
    const el = document.getElementById(id);
    el.textContent = text;
    el.classList.toggle('load-failed', failed);
  });
}
function fillCardModalTexts(card) {
  setCardModalTexts('');
  document.getElementById('cardModalUpright').textContent = cardMeaningText(card, 'upright');
  document.getElementById('cardModalReversed').textContent = cardMeaningText(card, 'reversed');
}
function drawnBlockFirst(upId, rvId, reversedFirst) {
  const up = document.getElementById(upId);
  const rv = document.getElementById(rvId);
  if (!up || !rv) return;
  if (reversedFirst) up.before(rv);
  else up.after(rv);
}
// 前往資料庫知識庫某一段的按鈕（main.js 的 openLibrary 動作）
function libraryLinkHTML(id, label, extraClass = 'text-link') {
  return `<button type="button" class="${extraClass}" data-action="openLibrary" data-lib="${escapeHTML(id)}">${label}</button>`;
}
// 對應系統的一列：vars 原樣代入，tvars 的值是字串鍵，先翻譯再代入（例如「{planet}在{sign}」）
function systemsRowVars(r) {
  if (!r.tvars) return r.vars;
  const vars = { ...(r.vars || {}) };
  Object.keys(r.tvars).forEach(k => { vars[k] = t(r.tvars[k]); });
  return vars;
}
// 對應系統：每套系統一個小標題，欄位與值排成兩欄的 <dl>；各欄怎麼讀只在最後連一次到知識庫。
// 不靠另外載入的資料，打開視窗就畫；參考資料到了再重畫一次，黃金黎明那一組多一列「對應日期」與它的註腳
function renderCardModalSystems(card) {
  const sysBlock = document.getElementById('cardModalSystemsBlock');
  const sysList = document.getElementById('cardModalSystemsList');
  if (!sysBlock || !sysList) return;
  const groups = cardSystems(card) || [];
  const refs = loadedRefs();
  const timing = timingText(refs?.cardRefs?.[card.nameKey]?.timing);
  const isStd = (g) => timing && g.source === 'systems.std.source';
  sysList.innerHTML = groups.map(g => `
<div class="systems-group">
<h4 class="systems-source">${escapeHTML(t(g.source))}</h4>
<dl class="systems-rows">
${g.rows.map(r => `<div class="systems-row"><dt>${escapeHTML(t(r.label))}</dt><dd>${escapeHTML(t(r.value, systemsRowVars(r)))}</dd></div>`).join('')}
${isStd(g) ? `<div class="systems-row refs-timing"><dt>${escapeHTML(t('refs.timing.label'))}</dt><dd>${escapeHTML(timing)}</dd></div>` : ''}
</dl>
${g.note ? `<p class="waite-terms-note">${escapeHTML(t(g.note))}</p>` : ''}
${isStd(g) ? `<p class="waite-terms-note refs-timing-note">${escapeHTML(refs.refsNotes?.timing || '')}</p>` : ''}
</div>
`).join('') + (groups.length ? `<p class="lore-link-line">${escapeHTML(t('systems.guide.lead'))}${libraryLinkHTML('systems-guide', escapeHTML(t('systems.guide.link')))}</p>` : '');
  sysBlock.classList.toggle('hidden', !groups.length);
}
// 源流分頁的參考資料：相關的牌、其他牌系的名稱、畫面上的符號。refs 為 null 表示片段載不到：相關的牌那格說明需要網路，其餘收起
function renderCardModalRefs(refs, card) {
  const relBlock = document.getElementById('cardModalRelatedBlock');
  const namesBlock = document.getElementById('cardModalNamesBlock');
  const symBlock = document.getElementById('cardModalSymbolsBlock');
  if (!relBlock || !namesBlock || !symBlock) return;
  if (!refs) {
    relBlock.classList.remove('hidden');
    document.getElementById('cardModalRelated').innerHTML = `<li>${chunkFailedHTML()}</li>`;
    namesBlock.classList.add('hidden');
    symBlock.classList.add('hidden');
    return;
  }
  const data = refs.cardRefs[card.nameKey] || {};
  // 相關的牌：關係（相似、對照、延續、呼應）、牌名（點了換看那張牌）、為什麼相關
  const related = (data.related || []).map(r => ({ ...r, other: fullTarotCards.find(c => c.nameKey === r.card) })).filter(r => r.other);
  document.getElementById('cardModalRelated').innerHTML = related.map(r => `
<li class="refs-rel">
<p class="refs-rel-head"><span class="tag refs-kind" data-kind="${escapeHTML(r.kind)}">${escapeHTML(relatedKindLabel(r.kind))}</span><button type="button" class="text-link refs-rel-card" data-action="openCardModal" data-seg="lore" data-card="${escapeHTML(r.other.nameKey)}" data-orientation="upright">${escapeHTML(r.other.name)}</button></p>
<p class="refs-rel-note">${escapeHTML(r.note || '')}</p>
</li>`).join('');
  relBlock.classList.toggle('hidden', !related.length);
  // 其他牌系的名稱：小型 <dl>，接著這張牌的補充說明（提到力量與正義對調時連到知識庫那一段），最後是收合的「說明」
  const names = data.names;
  const rows = otherNameRows(card, names);
  let note = names && names.note ? escapeHTML(names.note) : '';
  const SWAP = '力量與正義為什麼對調';
  if (note.includes(SWAP)) note = note.replace(SWAP, libraryLinkHTML('strength-justice', SWAP));
  const notes = refs.refsNotes || {};
  const help = [notes.names, cardClass(card) === 'court' ? notes.thothCourts : ''].filter(Boolean);
  document.getElementById('cardModalNames').innerHTML = rows.length ? `
<dl class="systems-rows refs-names">
${rows.map(([label, value]) => `<div class="systems-row"><dt>${escapeHTML(label)}</dt><dd>${value}</dd></div>`).join('')}
</dl>
${note ? `<p class="waite-terms-note">${note}</p>` : ''}
${help.length ? `<details class="refs-help"><summary class="refs-help-title">${escapeHTML(t('refs.names.help'))}</summary>${help.map(p => `<p class="waite-terms-note">${escapeHTML(p)}</p>`).join('')}</details>` : ''}
` : '';
  namesBlock.classList.toggle('hidden', !rows.length);
  // 畫面上的符號：符號名是前往資料庫符號分段的按鈕（提示文字是它在畫面上的位置），旁邊也直接寫出位置
  const symbols = symbolsOfCard(refs.symbolIndex, card.nameKey);
  document.getElementById('cardModalSymbols').innerHTML = symbols.map(({ symbol, entry }) => {
    const where = entry.where + symbolDeckNote(entry, visualStyle);
    return `<li class="refs-sym"><button type="button" class="tag" data-action="openSymbol" data-sym="${escapeHTML(symbol.id)}" title="${escapeHTML(where)}">${escapeHTML(symbol.title)}</button><span class="refs-sym-where">${escapeHTML(where)}</span></li>`;
  }).join('');
  symBlock.classList.toggle('hidden', !symbols.length);
}
function renderCardModalLore({ cardLore, getCardLore, loreLibrary = [] }, card, nameKey) {
  const lore = cardLore[nameKey];
  const fillLoreBlock = (blockId, textId, text) => {
    const block = document.getElementById(blockId);
    const el = document.getElementById(textId);
    if (!block || !el) return;
    if (text) {
      el.textContent = text;
      block.classList.remove('hidden');
    } else {
      el.textContent = '';
      block.classList.add('hidden');
    }
  };
  fillLoreBlock('cardModalSymbolismBlock', 'cardModalSymbolism', lore && lore.symbolism);
  fillLoreBlock('cardModalOriginBlock', 'cardModalOrigin', lore && lore.origin);
  fillLoreBlock('cardModalDepthBlock', 'cardModalDepth', lore && lore.depth);
  const mt = mofaTerms[nameKey];
  const mBlock = document.getElementById('cardModalMofaBlock');
  const mList = document.getElementById('cardModalMofaTerms');
  if (mBlock && mList) {
    const mrow = (labelKey, list) => (list && list.length) ? `
<div class="waite-row">
<span class="waite-ori">${escapeHTML(t(labelKey))}</span>
<span class="waite-words">${keywordList(list)}</span>
</div>` : '';
    const mhtml = mt ? mrow('waite.terms.upright', mt.up) + mrow('waite.terms.reversed', mt.rv) : '';
    mList.innerHTML = mhtml;
    mBlock.classList.toggle('hidden', !mhtml);
  }
  const waitePair = (en) => {
    const zh = waiteTermZh(en, nameKey);
    return zh
    ? `<span class="waite-pair"><span class="waite-zh">${escapeHTML(zh)}</span><span class="waite-en" lang="en">${escapeHTML(en)}</span></span>`
    : `<span class="waite-pair"><span class="waite-en waite-en-only" lang="en">${escapeHTML(en)}</span></span>`;
  };
  const waiteRow = (labelKey, list) => (list && list.length) ? `
<div class="waite-row">
<span class="waite-ori">${escapeHTML(t(labelKey))}</span>
<span class="waite-words">${list.map(waitePair).join('')}</span>
</div>` : '';
  const fillWaiteBlock = (blockId, listId, data) => {
    const block = document.getElementById(blockId);
    const list = document.getElementById(listId);
    if (!block || !list) return;
    const html = data
    ? waiteRow('waite.terms.upright', data.upright) + waiteRow('waite.terms.reversed', data.reversed)
    : '';
    list.innerHTML = html;
    block.classList.toggle('hidden', !html);
  };
  fillWaiteBlock('cardModalWaiteBlock', 'cardModalWaiteTerms',
    waiteTerms[nameKey]);
  fillWaiteBlock('cardModalWaiteAddBlock', 'cardModalWaiteAddTerms',
    waiteAdditional[nameKey]);
  fillLoreBlock(
    'cardModalCourtBlock', 'cardModalCourt',
    (cardClass(card) === 'court' && waiteCourtLooks[card.suit])
    ? t(waiteCourtLooks[card.suit])
    : null
  );
  fillLoreBlock('imageUpright', 'cardModalImageUpright', lore && lore.imageUpright);
  fillLoreBlock('imageReversed', 'cardModalImageReversed', lore && lore.imageReversed);
  const iconBlock = document.getElementById('cardModalIconBlock');
  const iconList = document.getElementById('cardModalIconList');
  if (iconBlock && iconList) {
    const icons = (lore && Array.isArray(lore.iconography)) ? lore.iconography : [];
    iconList.innerHTML = icons.map(i => `
<div class="icon-row">
<span class="icon-element">${escapeHTML(i.element || '')}</span>
<p class="icon-meaning">${escapeHTML(i.meaning || '')}</p>
</div>
`).join('');
    iconBlock.classList.toggle('hidden', !icons.length);
  }
  const list = document.getElementById('cardModalLoreList');
  if (!list) return;
  // 花色、數字、位階與大阿卡納的共通背景每張牌都一樣，只寫在資料庫的知識庫裡；這裡列成連結，
  // 共通符號另外列出畫著同一符號的其他牌，可直接換看那張
  const blocks = getCardLore(card) || [];
  const groupTitle = (id) => (loreLibrary.find(g => g.items.some(i => i.id === id)) || {}).title || '';
  const related = (b) => {
    const others = (b.cards || []).filter(k => k !== nameKey).map(k => fullTarotCards.find(c => c.nameKey === k)).filter(Boolean);
    if (!others.length) return '';
    const labelId = `cardModalRelated-${escapeHTML(b.id)}`;
    return `
<div class="lore-related">
<span class="lore-related-label" id="${labelId}">${escapeHTML(t('card.lore.related'))}</span>
<div class="tags lore-related-cards" role="group" aria-labelledby="${labelId}">
${others.map(c => `<button type="button" class="tag" data-action="openCardModal" data-card="${escapeHTML(c.nameKey)}">${escapeHTML(c.name)}</button>`).join('')}
</div>
</div>`;
  };
  list.innerHTML = blocks.length
  ? `
<div class="lore-entry lore-more">
<h3 class="lore-title">${escapeHTML(t('card.lore.more'))}</h3>
<p class="lore-more-note">${escapeHTML(t('card.lore.more.note'))}</p>
<ul class="lore-links">
${blocks.map(b => {
    const group = groupTitle(b.id);
    const label = `<span class="lore-link-title">${escapeHTML(b.title || '')}</span>${group ? `<span class="visually-hidden">，</span><span class="lore-link-group">${escapeHTML(group)}</span>` : ''}`;
    return `<li class="lore-link-item">${libraryLinkHTML(b.id, label, 'lore-link')}${related(b)}</li>`;
  }).join('')}
</ul>
</div>
`
  : (lore && lore.origin ? '' : `<div class="lore-empty">${escapeHTML(t('card.lore.empty'))}</div>`);
}
const cardModalSegPanels = { meaning: 'cardSegMeaning', icon: 'cardSegIcon', context: 'cardSegContext', lore: 'cardSegLore' };
function setCardModalSeg(name) {
  if (!cardModalSegPanels[name]) return;
  document.querySelectorAll('#cardModalSeg .seg-item').forEach(b => {
    const on = b.dataset.seg === name;
    b.classList.toggle('active', on);
    b.setAttribute('aria-selected', on);
    b.tabIndex = on ? 0 : -1;
  });
  Object.keys(cardModalSegPanels).forEach(key => {
    const panel = document.getElementById(cardModalSegPanels[key]);
    if (panel) panel.classList.toggle('hidden', key !== name);
  });
  scrollCardModalPanelTop(document.getElementById(cardModalSegPanels[name]));
}
// 換分段時，若已往下捲過，捲回新分段的開頭：黏住的分頁籤正下方；分頁籤不黏住（矮螢幕）時捲到分頁籤本身
function scrollCardModalPanelTop(panel) {
  const modal = document.querySelector('#cardModal .modal');
  const seg = document.getElementById('cardModalSeg');
  if (!modal || !seg || !panel) return;
  const segBox = seg.getBoundingClientRect();
  if (getComputedStyle(seg).position === 'sticky') {
    const gap = parseFloat(getComputedStyle(seg).marginBottom) || 0;
    const delta = panel.getBoundingClientRect().top - (segBox.bottom + gap);
    if (delta < 0) modal.scrollTop += delta;
  } else {
    const delta = segBox.top - modal.getBoundingClientRect().top;
    if (delta < 0) modal.scrollTop += delta;
  }
}
function contextReflection(cardContexts, card) {
  const ctx = cardContexts[card.nameKey];
  return (ctx && typeof ctx.reflection === 'string') ? ctx.reflection : '';
}
function renderCardModalContextFailed() {
  const section = document.getElementById('cardModalContextSection');
  if (!section) return;
  section.classList.remove('hidden');
  ctxData = null;
  document.getElementById('cardModalCtxOri').innerHTML = '';
  document.getElementById('cardModalContextList').innerHTML = chunkFailedHTML();
  section.querySelector('.reflection-block')?.classList.add('hidden');
  ['cardModalPositions', 'cardModalPerson', 'cardModalPace', 'cardModalCombos'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = '';
    el.classList.add('hidden');
  });
  renderCardModalJournal(null);
}
// 情境分頁整頁跟著一個「看哪一面」走：是非傾向、六個情境與細分主題、放在不同牌位、代表的人、節奏。
// 抽到的牌固定在抽到的那一面並標出來；其他情況放一組正位／逆位切換鈕（aria-pressed），整頁一起換
const CONTEXT_ROWS = [
  { domain: 'love', icon: '💕' },
  { domain: 'career', icon: '💼' },
  { domain: 'wealth', icon: '💰' },
  { domain: 'wellbeing', icon: '🌿' },
  { domain: 'study', icon: '📚' },
  { domain: 'growth', icon: '🌱' }
];
const POSITION_ROLES = ['advice', 'obstacle', 'outcome'];
let ctxData = null;
function renderCardModalContext(m, nameKey) {
  const section = document.getElementById('cardModalContextSection');
  if (!section) return;
  section.querySelector('.reflection-block')?.classList.remove('hidden');
  const card = fullTarotCards.find(c => c.nameKey === nameKey);
  const ctx = m.cardContexts[nameKey];
  if (!ctx || !card) {
    ctxData = null;
    section.classList.add('hidden');
    return;
  }
  section.classList.remove('hidden');
  ctxData = { m, card, ctx, guide: m.cardGuide?.[nameKey] || {} };
  const { fixed, ori } = ctxView;
  const oriName = (o) => t(orientationNames[o]);
  document.getElementById('cardModalCtxOri').innerHTML = fixed
    ? `<span class="ctx-pos-ori">${escapeHTML(oriName(ori) + t('card.meaning.drawn'))}</span>`
    : `<div class="segmented ctx-pos-toggle" role="group" aria-label="${escapeHTML(t('card.context.ori.label'))}">
${['upright', 'reversed'].map(o => `<button type="button" class="seg-item${o === ori ? ' active' : ''}" data-ctx-ori="${o}" aria-pressed="${o === ori}">${escapeHTML(oriName(o))}</button>`).join('')}
</div>`;
  document.getElementById('cardModalReflection').textContent = contextReflection(m.cardContexts, card);
  renderCardModalJournal(ctx.journal);
  renderCardModalCombos(ctxData.guide.combos);
  fillCardModalContext();
}
// 依目前的方向重畫跟方向有關的部分；展開過的細分主題保持展開
function fillCardModalContext() {
  if (!ctxData) return;
  const { m, card, ctx, guide } = ctxData;
  const ori = ctxView.ori;
  const list = document.getElementById('cardModalContextList');
  const openSubs = new Set(Array.from(list.querySelectorAll('details[open][data-domain]')).map(d => d.dataset.domain));
  const yesno = m.yesnoOf(card.nameKey, ori);
  const tendency = yesno && tendencyNames[yesno.tendency] ? yesno.tendency : 'unclear';
  const rows = yesno ? [`
<div class="context-row">
<span class="context-icon">⚖️</span>
<span class="context-label">${escapeHTML(t('card.context.yesno'))}</span>
<p class="context-text context-text-yesno"><span class="yesno-badge ${tendency}">${escapeHTML(t(tendencyNames[tendency]))}</span><span>${escapeHTML(yesno.note || '')}</span></p>
</div>`] : [];
  CONTEXT_ROWS.forEach(({ domain, icon }) => {
    const text = m.contextText(card, domain, ori);
    if (!text) return;
    const subs = (SUBTOPICS[domain] || []).map(k => [k, m.topicText(card, k, ori)]).filter(([, v]) => v);
    const subHTML = subs.length ? `
<details class="ctx-sub" data-domain="${domain}"${openSubs.has(domain) ? ' open' : ''}>
<summary class="ctx-sub-title">${escapeHTML(t('card.context.more', { list: subs.map(([k]) => t(`topic.${k}`)).join('、') }))}</summary>
<dl class="ctx-sub-list">
${subs.map(([k, v]) => `<div class="ctx-sub-row"><dt>${escapeHTML(t(`topic.${k}`))}</dt><dd>${escapeHTML(v)}</dd></div>`).join('')}
</dl>
</details>` : '';
    const care = domain === 'wellbeing' && guide.care ? careHTML() : '';
    rows.push(`
<div class="context-row">
<span class="context-icon">${icon}</span>
<span class="context-label">${escapeHTML(t(`card.context.${domain}`))}</span>
<p class="context-text">${escapeHTML(text)}</p>${subHTML}${care}
</div>`);
  });
  list.innerHTML = rows.join('');
  renderCardModalPositions(ctx.positions);
  renderCardModalPerson(guide.person);
  renderCardModalPace(guide.pace);
  document.querySelectorAll('#cardModalCtxOri [data-ctx-ori]').forEach(b => {
    const on = b.dataset.ctxOri === ori;
    b.classList.toggle('active', on);
    b.setAttribute('aria-pressed', on);
  });
}
// 身心面向碰到絕望、自傷念頭、被控制或暴力時，統一附上台灣的求助專線（文字在 strings.js，不寫在各張牌裡）
export function careHTML() {
  return `
<aside class="care-note" aria-label="${escapeHTML(t('care.title'))}">
<p class="care-title">${escapeHTML(t('care.title'))}</p>
<p class="care-text">${escapeHTML(t('care.text'))}</p>
<ul class="care-list">
${['1925', '1995', '1980', '113'].map(k => `<li>${escapeHTML(t(`care.${k}`))}</li>`).join('')}
</ul>
<p class="care-text">${escapeHTML(t('care.emergency'))}</p>
</aside>`;
}
// 「放在不同牌位」：建議、阻礙、結果三個位置各一段，跟著情境分頁的方向
function renderCardModalPositions(positions) {
  const box = document.getElementById('cardModalPositions');
  if (!box) return;
  const data = positions && POSITION_ROLES.some(r => positions[r]?.[ctxView.ori]) ? positions : null;
  box.classList.toggle('hidden', !data);
  box.innerHTML = data ? `
<h3 class="context-title" id="cardModalPositionsTitle">${escapeHTML(t('card.positions.title'))}</h3>
<dl class="ctx-pos-list">
${POSITION_ROLES.filter(r => data[r]?.[ctxView.ori]).map(r => `<div class="context-row"><dt class="context-label">${escapeHTML(t(`card.positions.${r}`))}</dt><dd class="context-text">${escapeHTML(data[r][ctxView.ori])}</dd></div>`).join('')}
</dl>` : '';
}
// 代表的人（大阿卡納與宮廷牌）與節奏：一段文字，跟著方向
function renderCtxBlock(id, titleKey, text, noteKey) {
  const box = document.getElementById(id);
  if (!box) return;
  box.classList.toggle('hidden', !text);
  box.innerHTML = text ? `
<h3 class="context-title">${escapeHTML(t(titleKey))}</h3>
<p class="context-text ctx-para">${escapeHTML(text)}</p>
${noteKey ? `<p class="waite-terms-note">${escapeHTML(t(noteKey))}</p>` : ''}` : '';
}
function renderCardModalPerson(person) {
  renderCtxBlock('cardModalPerson', 'card.person.title', person?.[ctxView.ori], 'card.person.note');
}
function renderCardModalPace(pace) {
  renderCtxBlock('cardModalPace', 'card.pace.title', pace?.[ctxView.ori], 'card.pace.note');
}
// 常見組合不分正逆位：牌名是換看那張牌的按鈕，旁邊寫兩張一起出現時意思怎麼變
function renderCardModalCombos(combos) {
  const box = document.getElementById('cardModalCombos');
  if (!box) return;
  const items = (Array.isArray(combos) ? combos : [])
    .map(c => ({ ...c, other: fullTarotCards.find(x => x.nameKey === c.card) }))
    .filter(c => c.other && c.note);
  box.classList.toggle('hidden', !items.length);
  box.innerHTML = items.length ? `
<h3 class="context-title">${escapeHTML(t('card.combos.title'))}</h3>
<ul class="refs-related ctx-combos">
${items.map(c => `<li class="refs-rel"><p class="refs-rel-head"><button type="button" class="text-link refs-rel-card" data-action="openCardModal" data-seg="context" data-card="${escapeHTML(c.other.nameKey)}" data-orientation="upright">${escapeHTML(c.other.name)}</button></p><p class="refs-rel-note">${escapeHTML(c.note)}</p></li>`).join('')}
</ul>` : '';
}
document.getElementById('cardModalCtxOri')?.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-ctx-ori]');
  if (!btn || ctxView.fixed) return;
  ctxView.ori = btn.dataset.ctxOri === 'reversed' ? 'reversed' : 'upright';
  fillCardModalContext();
});
// 反思問題下方的「書寫提問」：三個可以寫進日記的問題
function renderCardModalJournal(list) {
  const block = document.getElementById('cardModalJournalBlock');
  const ol = document.getElementById('cardModalJournal');
  if (!block || !ol) return;
  const items = Array.isArray(list) ? list.filter(q => typeof q === 'string' && q) : [];
  ol.innerHTML = items.map(q => `<li>${escapeHTML(q)}</li>`).join('');
  block.classList.toggle('hidden', !items.length);
}
const cardModalSegEl = document.getElementById('cardModalSeg');
if (cardModalSegEl) {
  cardModalSegEl.addEventListener('click', (e) => {
    const btn = e.target.closest('.seg-item');
    if (!btn || !cardModalSegEl.contains(btn)) return;
    setCardModalSeg(btn.dataset.seg);
  });
}
export function closeCardModal() {
  closeCardViewer();
  document.getElementById('cardModal').classList.remove('show');
}
// 卡片詳情的標題列固定在視窗頂端：量出它的高度，讓分頁籤黏在它下方、鍵盤捲動時也讓開它
const cardModalHeader = document.querySelector('#cardModal .modal-header');
if (cardModalHeader && 'ResizeObserver' in window) {
  new ResizeObserver(() => {
    cardModalHeader.parentElement.style.setProperty('--modal-head-h', `${cardModalHeader.offsetHeight}px`);
  }).observe(cardModalHeader);
}
// 卡片詳情的小縮圖是按鈕：點開放大檢視整張牌面。線稿牌組晚到時也會再呼叫一次補上
function renderCardModalArt() {
  const modalArt = document.getElementById('cardModalArt');
  if (!modalArt || !cardViewerTarget) return;
  const { card, orientation } = cardViewerTarget;
  const thumb = cardThumb(card, orientation === 'reversed' ? 'reversed' : '', 54);
  modalArt.innerHTML = thumb
    ? `<button type="button" class="card-modal-art-btn" data-action="openCardViewer" aria-label="${escapeHTML(t('card.viewArt', { name: card.name }))}">${thumb}</button>`
    : '';
  modalArt.dataset.suit = card.suit;
}
// 牌面放大檢視：疊在卡片詳情之上，依抽到的正逆位顯示
export function openCardViewer() {
  if (!cardViewerTarget) return;
  const { card, orientation } = cardViewerTarget;
  const art = cardThumb(card, orientation === 'reversed' ? 'reversed' : '', 520);
  if (!art) return;
  const viewer = document.getElementById('cardViewer');
  document.getElementById('cardViewerTitle').textContent = t('card.viewer.title', { name: card.name });
  const holder = document.getElementById('cardViewerArt');
  holder.innerHTML = art;
  holder.dataset.suit = card.suit;
  viewer.classList.add('show');
  // 焦點移進放大檢視（關閉鈕）。視窗淡入的頭幾格還不能取得焦點，就每格重試，最多約半秒
  const btn = viewer.querySelector('.card-viewer-close');
  let tries = 30;
  const focusBtn = () => {
    if (!viewer.classList.contains('show') || !btn) return;
    btn.focus();
    if (document.activeElement !== btn && --tries > 0) requestAnimationFrame(focusBtn);
  };
  focusBtn();
}
export function closeCardViewer() {
  const viewer = document.getElementById('cardViewer');
  if (!viewer || !viewer.classList.contains('show')) return;
  viewer.classList.remove('show');
  // 回到卡片詳情裡的縮圖按鈕
  document.querySelector('#cardModalArt .card-modal-art-btn')?.focus();
}
function todaySeed(now = new Date()) {
  return now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
}
// 每日一牌畫的是哪一天；頁面開著跨過午夜後，回到頁面或切換分頁時換成新的一天
let dailyCardDay = null;
export function refreshDailyCardIfStale() {
  if (dailyCardDay !== null && dailyCardDay !== todaySeed()) renderDailyCard();
}
export function renderDailyCard() {
  const el = document.getElementById('dailyCard');
  if (!el) return;
  const now = new Date();
  const daySeed = todaySeed(now);
  dailyCardDay = daySeed;
  const rng = mulberry32(daySeed);
  const card = shuffle(fullTarotCards, rng)[0];
  const orientation = rng() > 0.5 ? 'upright' : 'reversed';
  const keywords = keywordsFor(card.nameKey, orientation);
  const dailyArt = cardThumb(card, orientation === 'reversed' ? 'reversed' : '', 48);
  el.innerHTML = `
${dailyArt ? `<div class="daily-card-art" data-suit="${escapeHTML(card.suit)}">${dailyArt}</div>` : ''}
<div class="daily-card-info">
<div class="daily-card-label">${escapeHTML(t('reading.daily.title', { m: now.getMonth() + 1, d: now.getDate() }))}</div>
<div class="daily-card-name">${escapeHTML(card.name)}<span class="daily-card-ori">${escapeHTML(t(orientationNames[orientation] || orientation))}</span></div>
${keywords.length ? `<div class="daily-card-keywords">${keywordList(keywords)}</div>` : ''}
</div>
<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path fill-rule="evenodd" d="M8.72 4.72a.75.75 0 011.06 0l6.75 6.75a.75.75 0 010 1.06l-6.75 6.75a.75.75 0 11-1.06-1.06L14.94 12 8.72 5.78a.75.75 0 010-1.06z" clip-rule="evenodd"/></svg>
`;
  const open = () => openCardModal(card.nameKey, orientation, { drawn: true });
  el.onclick = open;
  el.onkeydown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      open();
    }
  };
  el.classList.remove('hidden');
}
