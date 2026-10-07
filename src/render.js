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
import { cardMeaningText, cardMeanings, minorRankMeanings } from './meanings.js';
import { loadContexts, loadLore } from './lazy.js';
import { getCardArt } from './deck.js';
import { lastReadingData } from './state.js';
import { renderResults } from './reading.js';
import { renderCardDatabase } from './database.js';
import { renderLearnStage } from './learn.js';
import { renderProfileCards } from './profile.js';

export let visualStyle = localStorage.getItem('visualStyle') || 'text';
if (!['text', 'api', 'line'].includes(visualStyle)) visualStyle = 'text';
export function setVisualStyle(style) {
  visualStyle = style;
  localStorage.setItem('visualStyle', style);
  document.querySelectorAll('input[name="visualStyle"]').forEach(radio => {
    radio.checked = radio.value === style;
  });
  refreshCardVisuals();
}
function refreshCardVisuals() {
  if (lastReadingData.drawnCards) renderResults(lastReadingData);
  renderDailyCard();
  renderProfileCards();
  renderCardDatabase();
  renderLearnStage();
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
    return `<source srcset="${srcset}" sizes="${sizes}" type="image/${ext}">`;
  }).join('\n');
}
// displayWidth：圖片在版面上的最大 CSS 寬度，瀏覽器據此挑合適的縮圖
export function cardThumb(card, extraClass = '', displayWidth = 150) {
  if (!card) return null;
  if (visualStyle === 'text') return null;
  if (visualStyle === 'line') {
    return getCardArt(card, extraClass);
  }
  const jpg = getCardImageUrl(card);
  if (!jpg) return null;
  const { w, h } = cardImageSize(card);
  return `<picture>
${cardSources(card, `${displayWidth}px`)}
<img class="card-image${extraClass ? ' ' + extraClass : ''}" src="${jpg}" alt=""
width="${w}" height="${h}" loading="lazy" decoding="async">
</picture>`;
}
document.querySelectorAll('input[name="visualStyle"]').forEach(radio => {
  radio.addEventListener('change', (e) => {
    if (e.target.checked) {
      setVisualStyle(e.target.value);
      showToast(t('toast.visualStyle', { name: e.target.nextElementSibling.textContent }));
    }
  });
});
function handleImageError(img, cardName) {
  const container = img.closest('.card-image-container') || img.parentElement;
  container.innerHTML = `
<div class="card-image-failed">
<div class="card-image-failed-name">${escapeHTML(cardName)}</div>
<div class="card-image-failed-note">${escapeHTML(t('card.imageFailed'))}</div>
</div>
`;
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
  if (!(img instanceof HTMLImageElement) || !img.hasAttribute('data-card-photo')) return;
  handleImageError(img, img.dataset.name);
}, true);
// 牌陣版面裡的牌面較小（見 style.css 的 .spread-layout .card-image）
export const LAYOUT_IMG_SIZES = '(min-width: 1024px) 130px, 40vw';
export function renderCard(card, isBottom = false, anim = 'slide-in', idx = 0, imgSizes = '260px') {
  const meaning = cardMeanings[card.nameKey];
  const photo = visualStyle === 'api' ? getCardImageUrl(card) : null;
  const lineArt = visualStyle === 'line'
  ? getCardArt(card, card.orientation === 'reversed' ? 'reversed' : '')
  : null;
  const visualClass = (photo || lineArt) ? 'visual-api' : '';
  const size = photo ? cardImageSize(card) : null;
  return `
<div class="card ${isBottom ? 'bottom' : ''} ${visualClass} ${anim}"
tabindex="${idx === 0 ? 0 : -1}" data-keynav-item role="button" data-suit="${card.suit}"
data-action="openCardModal" data-card="${card.nameKey}" data-orientation="${card.orientation}">
${photo ? `
<div class="card-image-container">
<div class="card-image-loading">${escapeHTML(t('card.loading'))}</div>
<picture>
${cardSources(card, imgSizes)}
<img class="card-image${card.orientation === 'reversed' ? ' reversed' : ''}"
src="${photo}"
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
<span class="ori-icon ${card.orientation === 'reversed' ? 'reversed' : ''}"></span>
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
let cardModalKey = null;
export function openCardModal(nameKey, orientation) {
  const card = fullTarotCards.find(c => c.nameKey === nameKey);
  const m = cardMeanings[nameKey];
  if (!card || !m) return;
  document.getElementById('cardModalTitle').textContent = card.name;
  document.getElementById('cardModalSub').textContent = t('card.sub', {
    en: card.englishName,
    suit: t(suitNames[card.suit] || card.suit),
    number: card.number
  });
  const modalArt = document.getElementById('cardModalArt');
  if (modalArt) {
    modalArt.innerHTML = cardThumb(card, '', 54) || '';
    modalArt.dataset.suit = card.suit;
  }
  document.getElementById('cardModalKeywords').innerHTML = m.keywords.map(k => `<span class="tag">${escapeHTML(k)}</span>`).join('');
  document.getElementById('cardModalUpright').textContent = cardMeaningText(card, 'upright');
  document.getElementById('cardModalReversed').textContent = cardMeaningText(card, 'reversed');
  const meaningNote = document.getElementById('cardModalMeaningNote');
  if (meaningNote) meaningNote.classList.toggle('hidden', cardClass(card) === 'major');
  document.getElementById('meaningUpright').classList.toggle('active', orientation === 'upright');
  document.getElementById('meaningReversed').classList.toggle('active', orientation === 'reversed');
  document.getElementById('imageUpright').classList.toggle('active', orientation === 'upright');
  document.getElementById('imageReversed').classList.toggle('active', orientation === 'reversed');
  cardModalKey = nameKey;
// 資料晚到時，若視窗已換成別張牌就不要覆蓋
  loadContexts().then(m => { if (cardModalKey === nameKey) renderCardModalContext(m, nameKey); });
  loadLore().then(m => { if (cardModalKey === nameKey) renderCardModalLore(m, card, nameKey); });
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
    const zh = waiteTermZh(en);
    return zh
    ? `<span class="waite-pair"><span class="waite-zh">${escapeHTML(zh)}</span><span class="waite-en">${escapeHTML(en)}</span></span>`
    : `<span class="waite-pair"><span class="waite-en waite-en-only">${escapeHTML(en)}</span></span>`;
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
<p class="icon-meaning">${escapeHTML(t(r.value, r.vars))}</p>
</div>`).join('')}
${g.note ? `<p class="waite-terms-note">${escapeHTML(t(g.note))}</p>` : ''}
</div>
`).join('');
    sysBlock.classList.toggle('hidden', !groups.length);
  }
  const list = document.getElementById('cardModalLoreList');
  if (!list) return;
  const blocks = getCardLore(card) || [];
  list.innerHTML = blocks.length
  ? blocks.map(b => `
<div class="lore-entry">
<h3 class="lore-title">${escapeHTML(b.title || '')}</h3>
<p class="lore-text">${escapeHTML(b.text || '')}</p>
</div>
`).join('')
  : `<div class="lore-empty">${escapeHTML(t('card.lore.empty'))}</div>`;
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
  if (ctx && typeof ctx.reflection === 'string') return ctx.reflection;
  const rank = minorRankMeanings[card.number];
  return (rank && rank.reflection) || '';
}
function renderCardModalContext({ cardContexts, contextText }, nameKey) {
  const section = document.getElementById('cardModalContextSection');
  if (!section) return;
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
  const ctxNote = document.getElementById('cardModalContextNote');
  if (ctxNote) ctxNote.classList.toggle('hidden', cardClass(card) === 'major');
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
  document.getElementById('cardModal').classList.remove('show');
}
export function renderDailyCard() {
  const el = document.getElementById('dailyCard');
  if (!el) return;
  const now = new Date();
  const daySeed = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
  const rng = mulberry32(daySeed);
  const card = shuffle(fullTarotCards, rng)[0];
  const orientation = rng() > 0.5 ? 'upright' : 'reversed';
  const m = cardMeanings[card.nameKey];
  const dailyArt = cardThumb(card, '', 48);
  el.innerHTML = `
${dailyArt ? `<div class="daily-card-art" data-suit="${card.suit}">${dailyArt}</div>` : ''}
<div class="daily-card-info">
<div class="daily-card-label">${escapeHTML(t('reading.daily.title', { m: now.getMonth() + 1, d: now.getDate() }))}</div>
<div class="daily-card-name">${escapeHTML(card.name)}<span class="daily-card-ori">${escapeHTML(t(orientationNames[orientation] || orientation))}</span></div>
${m ? `<div class="daily-card-keywords">${keywordList(m.keywords)}</div>` : ''}
</div>
<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M8.72 4.72a.75.75 0 011.06 0l6.75 6.75a.75.75 0 010 1.06l-6.75 6.75a.75.75 0 11-1.06-1.06L14.94 12 8.72 5.78a.75.75 0 010-1.06z" clip-rule="evenodd"/></svg>
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
