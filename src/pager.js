// 逐張解讀翻頁器（新版型）：結果裡的牌位清單改成一次看一張。
// 上一張／下一張按鈕、左右滑動、方向鍵都能換張；位置指示依版型不同：
// 星夜玻璃是圓點加「2 / 3」，現代編輯是牌位分頁籤（tablist），沉浸手勢是上方的限時動態進度條加大張牌。
// 只改畫面上的顯示：DOM 裡仍是完整清單，列印（樣式表在 print 時全部顯示）與複製（讀資料）照樣輸出每一張
import { t } from './i18n.js';
import { escapeHTML } from './utils.js';
import { orientationNames } from './data.js';
import { cardThumb } from './render.js';
import { currentTemplate } from './template.js';

const VARIANTS = { aurora: 'dots', editorial: 'tabs', immersive: 'story' };
// 水平滑動至少這麼遠、而且明顯比垂直位移大，才算換張
const SWIPE_MIN = 50;
const SWIPE_RATIO = 1.5;
const CHEVRON = (d) => `<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="${d}"/></svg>`;

function oriLabel(c) {
  return t(orientationNames[c.orientation] || c.orientation);
}
function indicatorHTML(variant, cards) {
  if (variant === 'tabs') {
    return `<div class="rd-tabs" role="tablist" aria-label="${escapeHTML(t('pager.label'))}" data-keynav="tablist">
${cards.map((c, i) => `<button type="button" class="rd-tab" role="tab" id="rdTab${i}" aria-controls="rdPanel${i}" data-keynav-item data-idx="${i}">
<span class="rd-tab-pos">${escapeHTML(t(c.position))}</span><span class="rd-tab-name">${escapeHTML(c.name)}</span>
</button>`).join('')}
</div>`;
  }
  const bars = cards.map(() => '<span></span>').join('');
  if (variant === 'story') return `<div class="rd-story" aria-hidden="true">${bars}</div>`;
  return `<span class="rd-pager-count" aria-hidden="true"></span><div class="rd-dots" aria-hidden="true">${bars}</div>`;
}
// 沉浸手勢：每張牌位上方放一張大牌（牌圖或線稿；文字模式畫一張只有牌名的牌）
function storyCardHTML(c) {
  const art = cardThumb(c, c.orientation === 'reversed' ? 'reversed' : '', 224);
  return `<div class="rd-story-card" data-suit="${escapeHTML(c.suit)}" aria-hidden="true">${art || `<div class="rd-story-blank">${escapeHTML(c.name)}</div>`}</div>`;
}
// renderResults 每次重畫都呼叫；簡約版型什麼都不做（維持清單）
export function enhanceReadingPager(section, cards) {
  const variant = VARIANTS[currentTemplate()];
  const list = section && section.querySelector('#readingDetailList');
  if (!variant || !list) return;
  const slides = [...list.querySelectorAll(':scope > ol > li'), ...list.querySelectorAll(':scope > .rd-item')];
  if (!slides.length || slides.length !== cards.length) return;
  const total = slides.length;
  const panels = slides.map(s => (s.matches('.rd-item') ? s : s.querySelector('.rd-item')));
  section.classList.add('rd-paged');
  section.dataset.variant = variant;
  // 一次只看一張，牌義全部展開（「全部展開」鈕由樣式表隱藏）
  section.querySelectorAll('details').forEach(d => { d.open = true; });
  panels.forEach((p, i) => {
    p.id = `rdPanel${i}`;
    if (variant === 'tabs') {
      p.setAttribute('role', 'tabpanel');
      p.setAttribute('aria-labelledby', `rdTab${i}`);
    } else {
      p.setAttribute('aria-label', t('pager.slide', { n: i + 1, total }));
    }
    if (variant === 'story') p.insertAdjacentHTML('afterbegin', storyCardHTML(cards[i]));
  });
  slides.forEach(s => s.classList.add('rd-slide'));
  const header = section.querySelector('.rd-header');
  header.insertAdjacentHTML('afterend', `<div class="rd-pager-ind">${indicatorHTML(variant, cards)}</div>`);
  list.insertAdjacentHTML('afterend', `
<div class="rd-pager-nav">
<button type="button" class="btn btn-tertiary btn-sm rd-pager-btn rd-pager-prev">${CHEVRON('M15 5l-7 7 7 7')}<span class="rd-pager-btn-text">${escapeHTML(t('pager.prev'))}</span></button>
<button type="button" class="btn btn-primary btn-sm rd-pager-btn rd-pager-next"><span class="rd-pager-btn-text"></span>${CHEVRON('M9 5l7 7-7 7')}</button>
</div>
<p class="rd-pager-hint" aria-hidden="true">${escapeHTML(t('pager.hint'))}</p>
<p class="visually-hidden rd-pager-status" role="status"></p>
`);
  const ind = section.querySelector('.rd-pager-ind');
  const prevBtn = section.querySelector('.rd-pager-prev');
  const nextBtn = section.querySelector('.rd-pager-next');
  const status = section.querySelector('.rd-pager-status');
  const tabs = Array.from(ind.querySelectorAll('.rd-tab'));
  const marks = Array.from(ind.querySelectorAll('.rd-dots > span, .rd-story > span'));
  const count = ind.querySelector('.rd-pager-count');
  let index = -1;
  function show(i, { announce = false, from = 0 } = {}) {
    i = Math.max(0, Math.min(total - 1, i));
    if (i === index) return;
    index = i;
    slides.forEach((s, k) => {
      s.classList.toggle('rd-slide-off', k !== i);
      s.classList.toggle('rd-slide-on', k === i && from !== 0);
    });
    if (from) slides[i].style.setProperty('--rd-from', `${from * 16}px`);
    tabs.forEach((tab, k) => {
      tab.setAttribute('aria-selected', k === i);
      tab.tabIndex = k === i ? 0 : -1;
    });
    // 圓點只標目前這張；進度條把看過的都填滿
    marks.forEach((m, k) => m.classList.toggle('on', variant === 'story' ? k <= i : k === i));
    if (count) count.textContent = t('pager.count', { n: i + 1, total });
    const atStart = i === 0;
    const atEnd = i === total - 1;
    prevBtn.setAttribute('aria-disabled', atStart);
    nextBtn.setAttribute('aria-disabled', atEnd);
    const next = cards[i + 1];
    nextBtn.querySelector('.rd-pager-btn-text').textContent = next ? t('pager.nextTo', { name: next.name }) : t('pager.next');
    const c = cards[i];
    if (announce) status.textContent = t('pager.status', { n: i + 1, total, pos: t(c.position), name: c.name, ori: oriLabel(c) });
    // 換張後若整段已捲到畫面上方外，回到這段的開頭
    if (from && section.getBoundingClientRect().top < 0) section.scrollIntoView({ block: 'start' });
  }
  const go = (step) => show(index + step, { announce: true, from: step });
  prevBtn.addEventListener('click', () => go(-1));
  nextBtn.addEventListener('click', () => go(1));
  // 分頁籤：點選或方向鍵（main.js 的 data-keynav 移動焦點後會觸發 click）。分頁籤本身已有語意，不另外播報
  tabs.forEach((tab, k) => {
    tab.addEventListener('click', () => show(k, { from: Math.sign(k - index) }));
  });
  // 焦點在翻頁器裡（分頁籤以外）時，左右方向鍵換張
  section.addEventListener('keydown', (e) => {
    if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    if (e.target.closest('[role="tablist"], input, textarea, select')) return;
    e.preventDefault();
    go(e.key === 'ArrowRight' ? 1 : -1);
  });
  // 觸控左右滑動（滑鼠拖曳是選取文字，不換張）
  let swipe = null;
  list.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse' || !e.isPrimary) return;
    swipe = { id: e.pointerId, x: e.clientX, y: e.clientY };
  });
  list.addEventListener('pointerup', (e) => {
    if (!swipe || e.pointerId !== swipe.id) return;
    const dx = e.clientX - swipe.x;
    const dy = e.clientY - swipe.y;
    swipe = null;
    if (Math.abs(dx) < SWIPE_MIN || Math.abs(dx) < Math.abs(dy) * SWIPE_RATIO) return;
    // 滑動結束時手指下的按鈕或摘要不算被點到（只擋緊接著的那一下）
    const block = (ev) => { ev.preventDefault(); ev.stopPropagation(); };
    list.addEventListener('click', block, true);
    setTimeout(() => list.removeEventListener('click', block, true), 400);
    go(dx < 0 ? 1 : -1);
  });
  list.addEventListener('pointercancel', () => { swipe = null; });
  show(0);
}
