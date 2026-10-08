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
import { cardMeaningText, cardMeanings } from './meanings.js';
import { loadContexts, loadDeck, loadLore, loadedDeck } from './lazy.js';
import { currentTab, lastReadingData } from './state.js';
import { renderResults, shownReading } from './reading.js';
import { renderCardDatabase } from './database.js';
import { renderLearnStage } from './learn.js';
import { renderProfileCards } from './profile.js';
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
  if (document.getElementById('cardModal')?.classList.contains('show')) renderCardModalArt();
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
  const meaning = cardMeanings[card.nameKey];
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
${meaning ? `<div class="card-keywords">${keywordList(meaning.keywords)}</div>` : ''}
<div class="card-footer">
<span>${escapeHTML(card.suit === 'Major Arcana' ? card.number : t(suitNames[card.suit]))}</span>
<span>${escapeHTML(card.englishName)}</span>
</div>
${(photo || lineArt) ? '</div>' : ''}
</div>
`;
}
// 抽到的是正位或逆位：對應的牌義區塊標題加上看得見的「（本次抽到）」與 aria-current，不只靠框線顏色
function markDrawnBlock(blockId, on) {
  const block = document.getElementById(blockId);
  if (!block) return;
  block.classList.toggle('active', on);
  const title = block.querySelector('.meaning-title');
  if (!title) return;
  title.querySelector('.meaning-drawn')?.remove();
  if (on) {
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
// fromReading：從占卜結果點開時，副標題也寫出這次抽到的正逆位
export function openCardModal(nameKey, orientation, { fromReading = false } = {}) {
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
  document.getElementById('cardModalKeywords').innerHTML = m.keywords.map(k => `<span class="tag">${escapeHTML(k)}</span>`).join('');
  document.getElementById('cardModalUpright').textContent = cardMeaningText(card, 'upright');
  document.getElementById('cardModalReversed').textContent = cardMeaningText(card, 'reversed');
  markDrawnBlock('meaningUpright', orientation === 'upright');
  markDrawnBlock('meaningReversed', orientation === 'reversed');
  markDrawnBlock('imageUpright', orientation === 'upright');
  markDrawnBlock('imageReversed', orientation === 'reversed');
  cardModalKey = nameKey;
  // 資料晚到時，若視窗已換成別張牌就不要覆蓋；下載失敗時不依賴源流資料的部分照畫，其餘顯示「需要網路」
  loadContexts()
    .then(m => { if (cardModalKey === nameKey) renderCardModalContext(m, nameKey); })
    .catch(() => { if (cardModalKey === nameKey) renderCardModalContextFailed(); });
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
  setCardModalSeg('meaning');
  document.getElementById('cardModal').classList.add('show');
}
function renderCardModalLore({ cardLore, getCardLore }, card, nameKey) {
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
  // 對應系統的一列：vars 原樣代入，tvars 的值是字串鍵，先翻譯再代入（例如「{planet}在{sign}」）
  const systemsRowVars = r => {
    if (!r.tvars) return r.vars;
    const vars = { ...(r.vars || {}) };
    Object.keys(r.tvars).forEach(k => { vars[k] = t(r.tvars[k]); });
    return vars;
  };
  const sysBlock = document.getElementById('cardModalSystemsBlock');
  const sysList = document.getElementById('cardModalSystemsList');
  if (sysBlock && sysList) {
    const groups = cardSystems(card) || [];
    sysList.innerHTML = groups.map(g => `
<div class="systems-group">
<div class="systems-source">${escapeHTML(t(g.source))}</div>
${g.rows.map(r => `
<div class="icon-row">
<span class="icon-element">${escapeHTML(t(r.label))}</span>
<p class="icon-meaning">${escapeHTML(t(r.value, systemsRowVars(r)))}</p>
</div>`).join('')}
${g.note ? `<p class="waite-terms-note">${escapeHTML(t(g.note))}</p>` : ''}
</div>
`).join('');
    sysBlock.classList.toggle('hidden', !groups.length);
  }
  const list = document.getElementById('cardModalLoreList');
  if (!list) return;
  // 花色、數字、位階與大阿卡納的共通背景每張牌都一樣，收合成「延伸閱讀」，想看再展開，不必每張牌重讀一次
  const blocks = getCardLore(card) || [];
  list.innerHTML = blocks.length
  ? `
<div class="lore-entry lore-more">
<h3 class="lore-title">${escapeHTML(t('card.lore.more'))}</h3>
<p class="lore-more-note">${escapeHTML(t('card.lore.more.note'))}</p>
${blocks.map(b => `
<details class="lore-more-item">
<summary class="lore-more-title">${escapeHTML(b.title || '')}</summary>
<p class="lore-text">${escapeHTML(b.text || '')}</p>
</details>`).join('')}
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
}
function contextReflection(cardContexts, card) {
  const ctx = cardContexts[card.nameKey];
  return (ctx && typeof ctx.reflection === 'string') ? ctx.reflection : '';
}
function renderCardModalContextFailed() {
  const section = document.getElementById('cardModalContextSection');
  if (!section) return;
  section.classList.remove('hidden');
  document.getElementById('cardModalContextList').innerHTML = chunkFailedHTML();
  section.querySelector('.reflection-block')?.classList.add('hidden');
}
function renderCardModalContext({ cardContexts, contextText }, nameKey) {
  const section = document.getElementById('cardModalContextSection');
  if (!section) return;
  section.querySelector('.reflection-block')?.classList.remove('hidden');
  const card = fullTarotCards.find(c => c.nameKey === nameKey);
  const ctx = cardContexts[nameKey];
  if (!ctx || !card) {
    section.classList.add('hidden');
    return;
  }
  section.classList.remove('hidden');
  const yesno = ctx.yesno || {};
  const tendency = yesno.tendency || '';
  const cls = tendencyNames[tendency] ? tendency : 'unclear';
  const rows = [
    { icon: '💕', label: t('card.context.love'), text: contextText(card, 'love') },
    { icon: '💼', label: t('card.context.career'), text: contextText(card, 'career') },
    { icon: '💰', label: t('card.context.wealth'), text: contextText(card, 'wealth') },
    { icon: '🌿', label: t('card.context.wellbeing'), text: contextText(card, 'wellbeing') },
    {
      icon: '⚖️',
      label: t('card.context.yesno'),
      html: `<span class="yesno-badge ${cls}">${escapeHTML(t(tendencyNames[tendency] || tendency))}</span><span>${escapeHTML(yesno.note || '')}</span>`
    }
  ];
  document.getElementById('cardModalContextList').innerHTML = rows.map(r => `
<div class="context-row">
<span class="context-icon">${r.icon}</span>
<span class="context-label">${escapeHTML(r.label)}</span>
<p class="context-text${r.html ? ' context-text-yesno' : ''}">${r.html || escapeHTML(r.text || '')}</p>
</div>
`).join('');
  document.getElementById('cardModalReflection').textContent = contextReflection(cardContexts, card);
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
  const m = cardMeanings[card.nameKey];
  const dailyArt = cardThumb(card, orientation === 'reversed' ? 'reversed' : '', 48);
  el.innerHTML = `
${dailyArt ? `<div class="daily-card-art" data-suit="${escapeHTML(card.suit)}">${dailyArt}</div>` : ''}
<div class="daily-card-info">
<div class="daily-card-label">${escapeHTML(t('reading.daily.title', { m: now.getMonth() + 1, d: now.getDate() }))}</div>
<div class="daily-card-name">${escapeHTML(card.name)}<span class="daily-card-ori">${escapeHTML(t(orientationNames[orientation] || orientation))}</span></div>
${m ? `<div class="daily-card-keywords">${keywordList(m.keywords)}</div>` : ''}
</div>
<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path fill-rule="evenodd" d="M8.72 4.72a.75.75 0 011.06 0l6.75 6.75a.75.75 0 010 1.06l-6.75 6.75a.75.75 0 11-1.06-1.06L14.94 12 8.72 5.78a.75.75 0 010-1.06z" clip-rule="evenodd"/></svg>
`;
  const open = () => openCardModal(card.nameKey, orientation);
  el.onclick = open;
  el.onkeydown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      open();
    }
  };
  el.classList.remove('hidden');
}
