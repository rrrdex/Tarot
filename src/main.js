import { applyLangToDocument, applyStaticStrings, buildLangSwitch, t } from './i18n.js';
import {
  dismissPendingConfirm,
  escapeHTML,
  isValidSeed,
  offerReload,
  questionFromURL,
  showToast,
  syncCanonical,
  updateURL
} from './utils.js';
import { spreads } from './data.js';
import { currentTab, isTabName, setCurrentTab } from './state.js';
import {
  readBtn,
  shareBtn,
  showShortcutsCheckbox,
  showSpreadInfoCheckbox,
  spreadInfoEl,
  spreadTypeEl
} from './dom.js';
import {
  closeCardModal,
  closeCardViewer,
  initVisualStyle,
  openCardViewer,
  openCardModal,
  refreshDailyCardIfStale,
  renderDailyCard
} from './render.js';
import {
  clearReadingURL,
  copyResults,
  generateShareImage,
  isDeckType,
  isReadBusy,
  performReading,
  printReading,
  shownReading,
  syncReadingURL,
  validPicks
} from './reading.js';
import {
  closeNoteModal,
  closeTagModal,
  deleteReading,
  openNoteModal,
  openTagModal,
  renderHistory,
  saveNote,
  saveTag,
  toggleFavorite,
  toggleTagSelection,
  viewReading
} from './history.js';
import { renderStatistics } from './stats.js';
import { renderPatternInsights } from './patterns.js';
import { renderCardDatabase, showLibraryItem, showSymbol } from './database.js';
import { closeCompareModal, openCompare } from './compare.js';
import { renderLearn, syncLearnSeg } from './learn.js';
import { renderProfile } from './profile.js';
import { initTheme, toggleTheme, updateDataStats } from './settings.js';
import { loadChangelog, prefetchWhenIdle } from './lazy.js';
import { initTemplate, navigateTab, syncNav } from './template.js';
import { initSheetGestures } from './sheet.js';
import { syncSpreadTiles } from './hero.js';
import * as storage from './storage.js';

const KEYNAV_ITEM = '[data-keynav-item]';
const KEYNAV_ARROWS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
let keyNavRects = new WeakMap();
['resize', 'scroll'].forEach(ev => {
  window.addEventListener(ev, () => { keyNavRects = new WeakMap(); }, { passive: true });
});
function keyNavRect(el) {
  let r = keyNavRects.get(el);
  if (r) return r;
  const b = el.getBoundingClientRect();
  r = { cx: b.left + b.width / 2, cy: b.top + b.height / 2, left: b.left, right: b.right, top: b.top, bottom: b.bottom };
  keyNavRects.set(el, r);
  return r;
}
function keyNavVisible(el) {
  if (!(el.offsetWidth || el.offsetHeight || el.getClientRects().length)) return false;
  const cs = getComputedStyle(el);
  return cs.visibility !== 'hidden' && cs.display !== 'none';
}
function keyNavItems(group) {
  return Array.from(group.querySelectorAll(KEYNAV_ITEM)).filter(el => !el.disabled && keyNavVisible(el));
}
// 依方向找最近的一個：同一欄（上下鍵）或同一列（左右鍵）裡的優先，其次才看主軸距離加上偏離的懲罰。
// 中心重疊的（凱爾特十字橫壓在第一張上的那張）沒有方向可言，改依 DOM 順序當成往前或往後一步；
// 同分時取 DOM 順序上最接近目前這張的，避免永遠選到前面那張而有牌走不到
const KEYNAV_OFF_LANE = 100000;
function keyNavSameLane(a, b, vertical) {
  const overlap = vertical
    ? Math.min(a.right, b.right) - Math.max(a.left, b.left)
    : Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
  return overlap > 4;
}
function keyNavBest(current, key, items) {
  const cur = keyNavRect(current);
  const curIdx = items.indexOf(current);
  const vertical = key === 'ArrowUp' || key === 'ArrowDown';
  const forward = key === 'ArrowDown' || key === 'ArrowRight';
  let best = null;
  let bestScore = Infinity;
  let bestGap = Infinity;
  items.forEach((el, i) => {
    if (el === current) return;
    const r = keyNavRect(el);
    const dx = r.cx - cur.cx;
    const dy = r.cy - cur.cy;
    const overlap = Math.abs(dx) < 2 && Math.abs(dy) < 2;
    const primary = overlap ? (i > curIdx ? 1 : -1) : (vertical ? dy : dx);
    const secondary = overlap ? 0 : Math.abs(vertical ? dx : dy);
    if (forward ? primary <= 0 : primary >= 0) return;
    const lane = overlap || keyNavSameLane(cur, r, vertical);
    const score = (lane ? 0 : KEYNAV_OFF_LANE) + Math.abs(primary) + (secondary < 10 ? 0 : secondary * 0.3);
    const gap = Math.abs(i - curIdx);
    if (score < bestScore - 1 || (Math.abs(score - bestScore) <= 1 && gap < bestGap)) {
      bestScore = Math.min(score, bestScore);
      bestGap = gap;
      best = el;
    }
  });
  // 這個方向上沒有任何一張：停在原地（重疊的核心牌與交叉牌已在上面處理）
  return best;
}
// 固定在畫面頂端的區塊（頁首、資料庫的搜尋列）蓋住的高度；窄高螢幕上它們不固定，就不算
function stickyStackBottom() {
  let bottom = 0;
  const header = document.querySelector('.app-header');
  if (header && getComputedStyle(header).position === 'sticky') bottom = header.getBoundingClientRect().bottom;
  document.querySelectorAll('.search-field').forEach(el => {
    if (!el.offsetParent || getComputedStyle(el).position !== 'sticky') return;
    const b = el.getBoundingClientRect();
    // 只有已經黏在頁首下方時才會蓋住內容
    if (b.top <= bottom + 2) bottom = Math.max(bottom, b.bottom);
  });
  return bottom;
}
function focusKeyNavItem(items, target) {
  items.forEach(el => { el.tabIndex = el === target ? 0 : -1; });
  target.focus({ preventScroll: true });
  // 視窗裡的項目交給視窗自己的 scroll-padding（會讓開固定的標題列）
  if (target.closest('.modal')) {
    target.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    return;
  }
  const b = target.getBoundingClientRect();
  const m = 24;
  const top = stickyStackBottom() + m;
  if (b.top < top) {
    window.scrollBy(0, b.top - top);
  } else if (b.bottom > window.innerHeight - m || b.left < m || b.right > window.innerWidth - m) {
    target.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }
}
// 資料庫分頁的搜尋列也固定在頂端：瀏覽器自己捲動焦點時（Tab）一併讓開它的高度；切到知識庫分段時搜尋列不在畫面上，高度是 0
export function syncStickyPadding() {
  const search = currentTab === 'database' && document.querySelector('#tabDatabase .search-field');
  const h = search && getComputedStyle(search).position === 'sticky' ? search.offsetHeight : 0;
  document.documentElement.style.setProperty('--sticky-extra', `${h}px`);
}
window.addEventListener('resize', syncStickyPadding, { passive: true });
function onKeyNavKeydown(e) {
  if (e.altKey || e.ctrlKey || e.metaKey || e.defaultPrevented) return;
  const item = e.target.closest && e.target.closest(KEYNAV_ITEM);
  if (!item) return;
  const group = item.closest('[data-keynav]');
  if (!group) return;
  const mode = group.dataset.keynav;
  const items = keyNavItems(group);
  if (items.indexOf(item) < 0) return;
  let next;
  if (e.key === 'Home') next = items[0];
  else if (e.key === 'End') next = items[items.length - 1];
  else if (KEYNAV_ARROWS.includes(e.key)) {
    if (mode === 'list' && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) return;
    if (mode === 'tablist' && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) return;
    if (mode === 'grid') {
      next = keyNavBest(item, e.key, items);
    } else {
      // 清單與分頁列：一維，頭尾相接
      const i = items.indexOf(item);
      const step = (e.key === 'ArrowDown' || e.key === 'ArrowRight') ? 1 : -1;
      next = items[(i + step + items.length) % items.length];
    }
  } else return;
  if (!next || next === item) return;
  e.preventDefault();
  focusKeyNavItem(items, next);
  if (mode === 'tablist') next.click();
}
document.addEventListener('keydown', onKeyNavKeydown);
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => switchTab(tab.dataset.tab));
});
// 先換畫面，最後才記住分頁（寫入失敗也照常切換）
export function switchTab(tabName) {
  if (!isTabName(tabName)) tabName = 'reading';
  setCurrentTab(tabName);
  document.documentElement.dataset.tab = tabName;
  document.querySelectorAll('.tab').forEach(t => {
    const on = t.dataset.tab === tabName;
    t.classList.toggle('active', on);
    t.setAttribute('aria-selected', on);
    t.tabIndex = on ? 0 : -1;
  });
  // 新版型的導覽列與「我的」分段
  syncNav(tabName);
  document.querySelectorAll('.tab-content').forEach(tc => {
    tc.classList.toggle('hidden', tc.id !== 'tab' + tabName.charAt(0).toUpperCase() + tabName.slice(1));
  });
  document.title = tabName === 'reading' ? t('app.title') : `${t('tab.' + tabName)} · ${t('app.title')}`;
  // 網址上的占卜參數只在占卜分頁顯示結果時才帶；離開占卜分頁就拿掉，重新整理才會留在目前的分頁
  if (tabName !== 'reading') clearReadingURL();
  else if (shownReading()) syncReadingURL();
  if (tabName === 'reading') refreshDailyCardIfStale();
  if (tabName === 'history') renderHistory();
  if (tabName === 'statistics') {
    renderStatistics();
    renderPatternInsights();
  }
  if (tabName === 'database') renderCardDatabase();
  if (tabName === 'learn') renderLearn();
  if (tabName === 'settings') updateDataStats();
  syncStickyPadding();
  storage.set('tab', tabName);
}
export function updateSpreadInfo() {
  const spreadType = spreadTypeEl.value;
  const spread = spreads[spreadType];
  const showInfo = showSpreadInfoCheckbox.checked;
  syncSpreadTrigger();
  if (!showInfo) {
    spreadInfoEl.classList.add('hidden');
    return;
  }
  spreadInfoEl.classList.remove('hidden');
  document.getElementById('spreadInfoContent').textContent = t(spread.description);
  // 牌位的讀法（pos.N.desc）有寫才顯示；週、月這類逐日逐週的牌位由牌陣說明統一交代
  document.getElementById('spreadPositionsList').innerHTML = spread.positions.map((pos, idx) => {
    const descKey = `${pos}.desc`;
    const desc = t(descKey);
    return `<div class="spread-position-item">
<span class="spread-position-num">${idx + 1}</span>
<span><span class="spread-position-name">${escapeHTML(t(pos))}</span>${desc !== descKey ? `<span class="spread-position-desc">${escapeHTML(desc)}</span>` : ''}</span>
</div>`;
  }).join('');
}
showSpreadInfoCheckbox.checked = storage.get('showSpreadInfo') !== 'false';
spreadTypeEl.addEventListener('change', updateSpreadInfo);
showSpreadInfoCheckbox.addEventListener('change', () => {
  updateSpreadInfo();
  storage.set('showSpreadInfo', showSpreadInfoCheckbox.checked);
});
const spreadTriggerEl = document.getElementById('spreadTypeButton');
const spreadModalEl = document.getElementById('spreadModal');
const spreadPickerEl = document.getElementById('spreadPicker');
// 牌陣按鈕開的是對話框（裡面才是選項清單）
spreadTriggerEl.setAttribute('aria-haspopup', 'dialog');
const SPREAD_CHECK_ICON = '<svg class="spread-option-check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 011.04-.207z" clip-rule="evenodd"/></svg>';
function syncSpreadTrigger() {
  const opt = spreadTypeEl.options[spreadTypeEl.selectedIndex];
  spreadTriggerEl.textContent = opt ? opt.textContent : '';
  // 沉浸手勢的牌陣方塊與牌堆提示
  syncSpreadTiles();
}
function spreadOptionHTML(opt) {
  const spread = spreads[opt.value];
  const count = spread && Array.isArray(spread.positions) ? spread.positions.length : null;
  const showDesc = !showSpreadInfoCheckbox || showSpreadInfoCheckbox.checked;
  const desc = showDesc && spread && spread.description ? spread.description : '';
  const selected = opt.value === spreadTypeEl.value;
  return `<button type="button" class="spread-option" role="option" aria-selected="${selected}" tabindex="${selected ? 0 : -1}" data-keynav-item data-value="${escapeHTML(opt.value)}">
<span class="spread-option-text">
<span class="spread-option-head">
<span class="spread-option-name">${escapeHTML(opt.textContent)}</span>
${count !== null ? `<span class="spread-option-count">${escapeHTML(t('spread.picker.count', { n: count }))}</span>` : ''}
</span>
${desc ? `<span class="spread-option-desc">${escapeHTML(t(desc))}</span>` : ''}
</span>
${SPREAD_CHECK_ICON}
</button>`;
}
function buildSpreadPicker() {
  let groupIdx = 0;
  spreadPickerEl.innerHTML = Array.from(spreadTypeEl.children).map(node => {
    if (node.tagName === 'OPTGROUP') {
      const titleId = `spreadGroup${groupIdx++}`;
      const rows = Array.from(node.children).map(spreadOptionHTML).join('');
      return `<div class="spread-picker-group" role="group" aria-labelledby="${titleId}">
<div class="spread-picker-group-title" id="${titleId}">${escapeHTML(t(node.label))}</div>
${rows}
</div>`;
    }
    if (node.tagName === 'OPTION') return spreadOptionHTML(node);
    return '';
  }).join('');
}
function openSpreadPicker() {
  buildSpreadPicker();
  spreadModalEl.classList.add('show');
  spreadTriggerEl.setAttribute('aria-expanded', 'true');
}
function closeSpreadPicker() {
  spreadModalEl.classList.remove('show');
  spreadTriggerEl.setAttribute('aria-expanded', 'false');
}
spreadTriggerEl.addEventListener('click', openSpreadPicker);
document.getElementById('spreadModalClose').addEventListener('click', closeSpreadPicker);
document.getElementById('spreadModalCancel').addEventListener('click', closeSpreadPicker);
spreadPickerEl.addEventListener('click', (e) => {
  const row = e.target.closest('.spread-option');
  if (!row) return;
  spreadTypeEl.value = row.dataset.value;
  spreadTypeEl.dispatchEvent(new Event('change'));
  closeSpreadPicker();
});
const interactiveDrawCheckbox = document.getElementById('interactiveDraw');
if (interactiveDrawCheckbox) {
  interactiveDrawCheckbox.checked = storage.get('interactiveDraw') !== 'false';
  interactiveDrawCheckbox.addEventListener('change', (e) => {
    storage.set('interactiveDraw', e.target.checked);
  });
}
const QUESTION_MAX = 200;
document.getElementById('question').maxLength = QUESTION_MAX;
// 首頁標語只是裝飾（頁首已有標題），不另成一個地標區域
document.querySelector('.hero')?.setAttribute('aria-hidden', 'true');
// 只能用 Tab 進入的元素才算：分段按鈕、牌格之類的 tabindex=-1 只能用方向鍵移動，不在 Tab 循環裡
const MODAL_FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
let modalReturnFocus = null;
let modalReturnSelector = null;
function modalFocusables(modal) {
  return Array.from(modal.querySelectorAll(MODAL_FOCUSABLE)).filter(el => el.tabIndex >= 0 && el.offsetParent !== null);
}
function trapModalTab(e) {
  if (e.key !== 'Tab') return;
  // 疊了兩層視窗時（卡片詳情上的牌面放大），只在最上層裡循環
  const shown = document.querySelectorAll('.modal-overlay.show .modal');
  const modal = shown[shown.length - 1];
  if (!modal) return;
  const items = modalFocusables(modal);
  if (!items.length) return;
  const first = items[0], last = items[items.length - 1];
  if (!modal.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
  else if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
}
// 視窗開著時只在 <html> 上標一個屬性（樣式表據此鎖住捲動），不逐一改背景區塊的屬性：
// 線稿模式下背景有大量 SVG，改 inert 或 body 樣式會讓整棵樹重算樣式。背景本來就被遮罩擋住點擊，
// 鍵盤由 trapModalTab 鎖在視窗內，輔助科技則依 aria-modal 只讀視窗內容
function setModalOpen(on) {
  const root = document.documentElement;
  if (root.hasAttribute('data-modal-open') !== on) root.toggleAttribute('data-modal-open', on);
}
function onModalOpen(overlay) {
  const ae = document.activeElement;
  // 從另一個視窗裡再疊開一層時，保留最外層的返回焦點
  if (!(ae && ae.closest && ae.closest('.modal-overlay'))) {
    modalReturnFocus = ae || null;
    // 背景清單可能在視窗開著時重畫（例如存了筆記），記下按鈕的身分，關閉時找回新的那顆
    modalReturnSelector = ae && ae.dataset && ae.dataset.action && ae.dataset.id
      ? `[data-action="${ae.dataset.action}"][data-id="${ae.dataset.id}"]`
      : null;
  }
  setModalOpen(true);
  document.addEventListener('keydown', trapModalTab, true);
  const modal = overlay.querySelector('.modal');
  if (!modal) return;
  const wanted = overlay.dataset.autofocus && modal.querySelector(overlay.dataset.autofocus);
  const target = wanted || modalFocusables(modal)[0];
  if (target) {
    // 視窗淡入的頭幾格還不能取得焦點：每格重試到成功為止（最多約半秒）
    let tries = 30;
    const focusTarget = () => {
      if (!overlay.classList.contains('show') || modal.contains(document.activeElement)) return;
      target.focus();
      if (!modal.contains(document.activeElement) && --tries > 0) requestAnimationFrame(focusTarget);
    };
    focusTarget();
  }
}
function onModalClose() {
  if (document.querySelector('.modal-overlay.show')) return;
  setModalOpen(false);
  // 從 #card= 連結打開的卡片關掉後，拿掉網址上的 #card=，重新整理才不會又打開
  if (/^#card=/.test(location.hash)) history.replaceState(history.state, '', location.pathname + location.search);
  document.removeEventListener('keydown', trapModalTab, true);
  let target = modalReturnFocus && document.contains(modalReturnFocus) ? modalReturnFocus : null;
  if (!target && modalReturnSelector) target = document.querySelector(modalReturnSelector);
  if (target) target.focus();
  modalReturnFocus = null;
  modalReturnSelector = null;
}
const modalActions = {
  closeNoteModal, saveNote, closeTagModal, saveTag, dismissPendingConfirm,
  closeSpreadPicker, closeCardModal, closeCardViewer, closeAboutModal, closePrivacyModal, closeCompareModal
};
const clickActions = {
  ...modalActions,
  copyResults, generateShareImage, printReading, openCardViewer,
  openCardModal: el => openCardModal(el.dataset.card, el.dataset.orientation, { fromReading: !!el.closest('#results'), seg: el.dataset.seg }),
  viewReading: el => viewReading(Number(el.dataset.id)),
  toggleFavorite: el => toggleFavorite(Number(el.dataset.id)),
  openNoteModal: el => openNoteModal(Number(el.dataset.id)),
  openTagModal: el => openTagModal(Number(el.dataset.id)),
  deleteReading: el => deleteReading(Number(el.dataset.id)),
  toggleTagSelection: el => toggleTagSelection(el.dataset.tag),
  goToReading: () => {
    switchTab('reading');
    document.getElementById('question').focus();
  },
  openLibrary: el => openLibrary(el.dataset.lib),
  openSymbol: el => openSymbol(el.dataset.sym),
  openCompare: el => openCompare(el.dataset.card)
};
// 前往資料庫知識庫的某一段（卡片詳情的延伸閱讀、來源說明、網址 #lib-…）：
// 關掉視窗時不把焦點還給原本開視窗的那張牌，焦點改由知識庫交給展開的段落標題
function leaveModalsForDatabase() {
  if (document.querySelector('.modal-overlay.show')) {
    modalReturnFocus = null;
    modalReturnSelector = null;
    closeCardViewer();
    closeCardModal();
    closeCompareModal();
  }
  if (currentTab !== 'database') switchTab('database');
}
function openLibrary(id) {
  if (!id) return;
  leaveModalsForDatabase();
  showLibraryItem(id);
}
// 前往資料庫的符號分段（卡片詳情「畫面上的符號」、網址 #sym-…），做法與知識庫相同
function openSymbol(id) {
  if (!id) return;
  leaveModalsForDatabase();
  showSymbol(id);
}
// 網址的 # 部分：#lib-… 知識庫的一段、#sym-… 一個符號、#card=… 直接打開那張牌的卡片詳情
function openFromHash() {
  const hash = location.hash;
  let m = /^#lib-([\w-]+)$/.exec(hash);
  if (m) return openLibrary(m[1]);
  m = /^#sym-([\w-]+)$/.exec(hash);
  if (m) return openSymbol(m[1]);
  m = /^#card=([\w-]+)$/.exec(hash);
  if (m) openCardModal(m[1], 'upright');
}
window.addEventListener('hashchange', openFromHash);
document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-action]');
  if (el && clickActions[el.dataset.action]) clickActions[el.dataset.action](el);
});
function dismissModal(overlay) {
  if (!overlay || !overlay.classList.contains('show')) return;
  const fn = modalActions[overlay.dataset.close];
  if (fn) fn();
  else overlay.classList.remove('show');
}
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  if (e.isComposing) return;
  const open = document.querySelectorAll('.modal-overlay.show');
  if (!open.length) return;
  e.preventDefault();
  dismissModal(open[open.length - 1]);
});
let shortcutsEnabled = storage.get('showShortcuts') !== 'false';
export function setShortcutsEnabled(v) {
  shortcutsEnabled = v;
}
if (showShortcutsCheckbox) {
  showShortcutsCheckbox.checked = shortcutsEnabled;
  showShortcutsCheckbox.addEventListener('change', (e) => {
    shortcutsEnabled = e.target.checked;
    storage.set('showShortcuts', shortcutsEnabled);
  });
}
// 只有打字的欄位才擋快速鍵；按鈕、單選框有焦點時數字與 T 照常可用
const TEXT_ENTRY = 'input:not([type=radio]):not([type=checkbox]), textarea, select, [contenteditable]:not([contenteditable="false"])';
const TAB_KEYS = { 1: 'reading', 2: 'history', 3: 'statistics', 4: 'database', 5: 'learn', 6: 'settings' };
document.addEventListener('keydown', (e) => {
  if (!shortcutsEnabled || e.defaultPrevented || e.isComposing) return;
  if (e.altKey || e.ctrlKey || e.metaKey) return;
  if (document.querySelector('.modal-overlay.show')) return;
  const target = e.target;
  if (target.closest && target.closest(TEXT_ENTRY)) return;
  if (e.key === ' ') {
    // 空白鍵只在占卜分頁、焦點停在頁面本身時抽牌；剛用「跳到主要內容」的焦點（#main）不算，
    // 其他情況保留瀏覽器原本的捲動
    if (currentTab !== 'reading' || target !== document.body) return;
    e.preventDefault();
    if (!isReadBusy()) performReading();
    return;
  }
  if (e.key === 't') {
    e.preventDefault();
    toggleTheme();
    return;
  }
  if (!e.shiftKey && TAB_KEYS[e.key]) {
    e.preventDefault();
    navigateTab(TAB_KEYS[e.key]);
  }
});
document.addEventListener('keydown', (e) => {
  if ((e.key === 'Enter' || e.key === ' ') && e.target.matches && e.target.matches('.card[role="button"], .card-db-item[role="button"], .tag[role="button"]')) {
    e.preventDefault();
    e.target.click();
  }
});
shareBtn.addEventListener('click', () => {
  const url = location.href;
  if (navigator.share) {
    navigator.share({
      title: t('app.title'),
      text: t('app.share.text'),
      url: url
    }).catch(() => {});
  } else if (navigator.clipboard) {
    navigator.clipboard.writeText(url).then(() => {
      showToast(t('toast.linkCopied'));
    }).catch(() => {
      showToast(t('toast.copyFailed'), 'error');
    });
  } else {
    showToast(t('toast.copyFailed'), 'error');
  }
});
readBtn.addEventListener('click', () => {
  if (isReadBusy()) return;
  performReading();
});
async function openAboutModal() {
  const versionEl = document.getElementById('aboutVersion');
  if (versionEl) versionEl.textContent = `v${__APP_VERSION__}`;
  document.getElementById('aboutModal').classList.add('show');
  const listEl = document.getElementById('changelogList');
  if (!listEl) return;
  let changelog;
  try {
    ({ changelog } = await loadChangelog());
  } catch {
    listEl.innerHTML = `<div class="lore-empty load-failed">${escapeHTML(t('error.chunkOffline'))}</div>`;
    return;
  }
  listEl.innerHTML = changelog.length
  ? changelog.map(entry => {
    const date = entry.date
    ? `<span class="changelog-date">${escapeHTML(entry.date)}</span>`
    : '';
    const changes = (entry.changes || [])
    .map(c => `<li>${escapeHTML(c)}</li>`)
    .join('');
    return `<div class="changelog-entry">
<div class="changelog-head">
<span class="changelog-version">v${escapeHTML(entry.version)}</span>
${date}
</div>
<h3 class="changelog-title">${escapeHTML(entry.title)}</h3>
<ul class="changelog-changes">${changes}</ul>
</div>`;
  }).join('')
  : `<div class="lore-empty">${escapeHTML(t('about.changelog.empty'))}</div>`;
}
function closeAboutModal() {
  document.getElementById('aboutModal').classList.remove('show');
}
function openPrivacyModal() {
  document.getElementById('privacyModal').classList.add('show');
}
function closePrivacyModal() {
  document.getElementById('privacyModal').classList.remove('show');
}
document.getElementById('linkAbout').addEventListener('click', (e) => {
  e.preventDefault();
  openAboutModal();
});
document.getElementById('linkPrivacy').addEventListener('click', (e) => {
  e.preventDefault();
  openPrivacyModal();
});
const footerYear = document.getElementById('footerYear');
if (footerYear) footerYear.textContent = new Date().getFullYear();
const footerVersion = document.getElementById('footerVersion');
if (footerVersion) footerVersion.textContent = `v${__APP_VERSION__}`;
// 頁面開著跨過午夜：回到頁面時換上新一天的每日一牌
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') refreshDailyCardIfStale();
});
export function rerenderForLang() {
  applyStaticStrings();
  initTheme();
  buildLangSwitch();
  syncSpreadTrigger();
  updateSpreadInfo();
  renderDailyCard();
  renderProfile();
  syncLearnSeg();
  switchTab(currentTab);
}
// 分享連結的參數：都合法才照著占卜；有任何一項看不懂就略過那一項、清掉網址上的參數，並提示一次
function readShareParams(url) {
  const p = url.searchParams;
  const seed = p.get('seed');
  const deck = p.get('deck');
  const spread = p.get('spread');
  const q = questionFromURL(url);
  const picksParam = p.get('picks');
  let bad = false;
  const deckType = deck && isDeckType(deck) ? deck : 'full';
  if (deck && deckType !== deck) bad = true;
  const spreadType = spread && spreads[spread] ? spread : 'single';
  if (spread && spreadType !== spread) bad = true;
  let validSeed = null;
  if (seed !== null) {
    if (isValidSeed(seed)) validSeed = seed;
    else bad = true;
  }
  let picks = 'first';
  if (picksParam) {
    const parsed = /^\d+(?:-\d+)*$/.test(picksParam) ? picksParam.split('-').map(Number) : null;
    if (parsed && validPicks(parsed, deckType, spreadType)) picks = parsed;
    else bad = true;
  }
  return { seed: validSeed, deck, deckType, spread, spreadType, question: (q || '').trim().slice(0, QUESTION_MAX), picks, bad };
}
// Service Worker 換成新版本時（不是第一次安裝），提示重新整理才會用到新版
function registerServiceWorker() {
  if (!('serviceWorker' in navigator) || location.protocol === 'file:') return;
  let hadController = !!navigator.serviceWorker.controller;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!hadController) {
      hadController = true;
      return;
    }
    offerReload('toast.updateAvailable', 'success');
  });
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
// 所有模組都執行完才開始繪製：模組之間有循環引用，載入階段呼叫別的模組可能碰到尚未初始化的常數
(function init() {
  applyLangToDocument();
  applyStaticStrings();
  initTheme();
  initTemplate();
  buildLangSwitch();
  syncCanonical();
  const share = readShareParams(new URL(location.href));
  const deckEl = document.getElementById('deckType');
  if (share.deck) deckEl.value = share.deckType;
  if (share.spread) spreadTypeEl.value = share.spreadType;
  if (share.question) document.getElementById('question').value = share.question;
  // 舊版連結的 ?q= 搬到 # 後面，之後的重新整理與分享都不再把問題送到伺服器
  if (new URL(location.href).searchParams.has('q')) updateURL({ q: share.question || null });
  updateSpreadInfo();
  initVisualStyle();
  // 不等線稿牌組：分頁、每日一牌、我的牌與分享的占卜先畫出來，牌組到了再補上插畫
  renderDailyCard();
  renderProfile();
  switchTab(share.seed ? 'reading' : currentTab);
  if (share.seed) {
    performReading(share.seed, false, share.picks, {
      deckType: share.deckType,
      spreadType: share.spreadType,
      question: share.question,
      focus: false
    });
  }
  if (share.bad) {
    if (!share.seed) updateURL({ seed: null, picks: null, deck: null, spread: null, q: null });
    showToast(t('toast.badShareLink'), 'warning');
  }
  registerServiceWorker();
  prefetchWhenIdle();
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) dismissModal(overlay);
    });
  });
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (!mutation.target.classList.contains('modal-overlay')) return;
      if (mutation.target.classList.contains('show')) onModalOpen(mutation.target);
      else onModalClose();
    });
  });
  document.querySelectorAll('.modal-overlay').forEach(el => {
    observer.observe(el, { attributes: true, attributeFilter: ['class'] });
  });
  // 新版型的底部抽屜：往下拖標題列關閉，走與 Esc、點遮罩相同的關閉流程
  initSheetGestures(dismissModal);
  // 網址帶 #card=、#sym-、#lib- 時直接打開；放在視窗的焦點處理接上之後，焦點才會移進視窗
  if (!share.seed) openFromHash();
})();
