import { applyLangToDocument, applyStaticStrings, buildLangSwitch, t } from './i18n.js';
import {
  dismissPendingConfirm,
  escapeHTML,
  isValidSeed,
  showToast,
  syncCanonical
} from './utils.js';
import { spreads } from './data.js';
import { currentTab, setCurrentTab } from './state.js';
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
  openCardModal,
  renderDailyCard,
  setVisualStyle,
  visualStyle
} from './render.js';
import { copyResults, generateShareImage, performReading, printReading } from './reading.js';
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
import { renderCardDatabase } from './database.js';
import { renderLearn, syncLearnSeg } from './learn.js';
import { renderProfile } from './profile.js';
import { initTheme, toggleTheme, updateDataStats } from './settings.js';
import { loadChangelog, prefetchWhenIdle } from './lazy.js';

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
  r = { cx: b.left + b.width / 2, cy: b.top + b.height / 2 };
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
function keyNavBest(current, key, items) {
  const cur = keyNavRect(current);
  const vertical = key === 'ArrowUp' || key === 'ArrowDown';
  const forward = key === 'ArrowDown' || key === 'ArrowRight';
  let best = null;
  let bestScore = Infinity;
  for (const el of items) {
    if (el === current) continue;
    const r = keyNavRect(el);
    const primary = vertical ? r.cy - cur.cy : r.cx - cur.cx;
    const secondary = Math.abs(vertical ? r.cx - cur.cx : r.cy - cur.cy);
    if (forward ? primary <= 0 : primary >= 0) continue;
    const score = Math.abs(primary) + (secondary < 10 ? 0 : secondary * 0.3);
    if (score < bestScore) { bestScore = score; best = el; }
  }
  return best;
}
function focusKeyNavItem(items, target) {
  items.forEach(el => { el.tabIndex = el === target ? 0 : -1; });
  target.focus({ preventScroll: true });
  const b = target.getBoundingClientRect();
  const m = 24;
  if (b.top < m || b.bottom > window.innerHeight - m || b.left < m || b.right > window.innerWidth - m) {
    target.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }
}
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
    next = keyNavBest(item, e.key, items);
    if (!next && mode !== 'grid') {
      next = (e.key === 'ArrowDown' || e.key === 'ArrowRight') ? items[0] : items[items.length - 1];
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
export function switchTab(tabName) {
  setCurrentTab(tabName);
  document.documentElement.dataset.tab = tabName;
  localStorage.setItem('tab', tabName);
  document.querySelectorAll('.tab').forEach(t => {
    const on = t.dataset.tab === tabName;
    t.classList.toggle('active', on);
    t.setAttribute('aria-selected', on);
    t.tabIndex = on ? 0 : -1;
  });
  document.querySelectorAll('.tab-content').forEach(tc => {
    tc.classList.toggle('hidden', tc.id !== 'tab' + tabName.charAt(0).toUpperCase() + tabName.slice(1));
  });
  document.title = tabName === 'reading' ? t('app.title') : `${t('tab.' + tabName)} · ${t('app.title')}`;
  if (tabName === 'history') renderHistory();
  if (tabName === 'statistics') {
    renderStatistics();
    renderPatternInsights();
  }
  if (tabName === 'database') renderCardDatabase();
  if (tabName === 'learn') renderLearn();
  if (tabName === 'settings') updateDataStats();
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
  document.getElementById('spreadPositionsList').innerHTML = spread.positions.map((pos, idx) =>
    `<div class="spread-position-item">
<span class="spread-position-num">${idx + 1}</span>
<span>${escapeHTML(t(pos))}</span>
</div>`
  ).join('');
}
showSpreadInfoCheckbox.checked = localStorage.getItem('showSpreadInfo') !== 'false';
spreadTypeEl.addEventListener('change', updateSpreadInfo);
showSpreadInfoCheckbox.addEventListener('change', () => {
  localStorage.setItem('showSpreadInfo', showSpreadInfoCheckbox.checked);
  updateSpreadInfo();
});
const spreadTriggerEl = document.getElementById('spreadTypeButton');
const spreadModalEl = document.getElementById('spreadModal');
const spreadPickerEl = document.getElementById('spreadPicker');
const SPREAD_CHECK_ICON = '<svg class="spread-option-check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 011.04-.207z" clip-rule="evenodd"/></svg>';
function syncSpreadTrigger() {
  const opt = spreadTypeEl.options[spreadTypeEl.selectedIndex];
  spreadTriggerEl.textContent = opt ? opt.textContent : '';
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
  interactiveDrawCheckbox.checked = localStorage.getItem('interactiveDraw') !== 'false';
  interactiveDrawCheckbox.addEventListener('change', (e) => {
    localStorage.setItem('interactiveDraw', e.target.checked);
  });
}
const MODAL_BG_REGIONS = '.app-header, .hero, .container, .app-footer';
const MODAL_FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
let modalReturnFocus = null;
function modalFocusables(modal) {
  return Array.from(modal.querySelectorAll(MODAL_FOCUSABLE)).filter(el => el.offsetParent !== null);
}
function trapModalTab(e) {
  if (e.key !== 'Tab') return;
  const modal = document.querySelector('.modal-overlay.show .modal');
  if (!modal) return;
  const items = modalFocusables(modal);
  if (!items.length) return;
  const first = items[0], last = items[items.length - 1];
  if (!modal.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
  else if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
}
function onModalOpen(overlay) {
  const ae = document.activeElement;
  modalReturnFocus = (ae && ae.closest && !ae.closest('.modal-overlay')) ? ae : null;
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', trapModalTab, true);
  const modal = overlay.querySelector('.modal');
  if (!modal) return;
  const wanted = overlay.dataset.autofocus && modal.querySelector(overlay.dataset.autofocus);
  const target = wanted || modalFocusables(modal)[0];
  if (target) {
    target.focus();
    if (document.activeElement !== target) queueMicrotask(() => {
      if (overlay.classList.contains('show') && !modal.contains(document.activeElement)) target.focus();
    });
  }
  document.querySelectorAll(MODAL_BG_REGIONS).forEach(r => { r.inert = true; });
}
function onModalClose() {
  if (document.querySelector('.modal-overlay.show')) return;
  document.body.style.overflow = '';
  document.querySelectorAll(MODAL_BG_REGIONS).forEach(r => { r.inert = false; });
  document.removeEventListener('keydown', trapModalTab, true);
  if (modalReturnFocus && document.contains(modalReturnFocus)) modalReturnFocus.focus();
  modalReturnFocus = null;
}
const modalActions = {
  closeNoteModal, saveNote, closeTagModal, saveTag, dismissPendingConfirm,
  closeSpreadPicker, closeCardModal, closeAboutModal, closePrivacyModal
};
const clickActions = {
  ...modalActions,
  copyResults, generateShareImage, printReading,
  openCardModal: el => openCardModal(el.dataset.card, el.dataset.orientation),
  viewReading: el => viewReading(Number(el.dataset.id)),
  toggleFavorite: el => toggleFavorite(Number(el.dataset.id)),
  openNoteModal: el => openNoteModal(Number(el.dataset.id)),
  openTagModal: el => openTagModal(Number(el.dataset.id)),
  deleteReading: el => deleteReading(Number(el.dataset.id)),
  toggleTagSelection: el => toggleTagSelection(el.dataset.tag)
};
document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-action]');
  if (el) clickActions[el.dataset.action](el);
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
let shortcutsEnabled = localStorage.getItem('showShortcuts') !== 'false';
export function setShortcutsEnabled(v) {
  shortcutsEnabled = v;
}
if (showShortcutsCheckbox) {
  showShortcutsCheckbox.checked = shortcutsEnabled;
  showShortcutsCheckbox.addEventListener('change', (e) => {
    shortcutsEnabled = e.target.checked;
    localStorage.setItem('showShortcuts', shortcutsEnabled);
  });
}
document.addEventListener('keydown', (e) => {
  if (!shortcutsEnabled) return;
  if (document.querySelector('.modal-overlay.show')) return;
  if (e.target.closest && e.target.closest('input, textarea, select, button, a, [role="button"]')) return;
  switch (e.key.toLowerCase()) {
    case ' ':
    e.preventDefault();
    if (currentTab === 'reading' && !readBtn.disabled) performReading();
    break;
    case 't':
    e.preventDefault();
    toggleTheme();
    break;
    case '1': e.preventDefault(); switchTab('reading'); break;
    case '2': e.preventDefault(); switchTab('history'); break;
    case '3': e.preventDefault(); switchTab('statistics'); break;
    case '4': e.preventDefault(); switchTab('database'); break;
    case '5': e.preventDefault(); switchTab('learn'); break;
    case '6': e.preventDefault(); switchTab('settings'); break;
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
    });
  }
});
readBtn.addEventListener('click', () => performReading());
async function openAboutModal() {
  const versionEl = document.getElementById('aboutVersion');
  if (versionEl) versionEl.textContent = `v${__APP_VERSION__}`;
  document.getElementById('aboutModal').classList.add('show');
  const listEl = document.getElementById('changelogList');
  if (listEl) {
    const { changelog } = await loadChangelog();
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
export function rerenderForLang() {
  applyStaticStrings();
  buildLangSwitch();
  syncSpreadTrigger();
  updateSpreadInfo();
  renderDailyCard();
  renderProfile();
  syncLearnSeg();
  switchTab(currentTab);
}
// 所有模組都執行完才開始繪製：模組之間有循環引用，載入階段呼叫別的模組可能碰到尚未初始化的常數
(function init() {
  applyLangToDocument();
  initTheme();
  applyStaticStrings();
  buildLangSwitch();
  syncCanonical();
  const url = new URL(location.href);
  const deck = url.searchParams.get('deck');
  const spread = url.searchParams.get('spread');
  const seed = url.searchParams.get('seed');
  const q = url.searchParams.get('q');
  const deckEl = document.getElementById('deckType');
  if (deck) {
    deckEl.value = deck;
    if (deckEl.selectedIndex === -1) deckEl.value = 'full';
  }
  if (spread) {
    spreadTypeEl.value = spread;
    if (spreadTypeEl.selectedIndex === -1) spreadTypeEl.value = 'single';
  }
  if (q) document.getElementById('question').value = q;
  updateSpreadInfo();
  renderDailyCard();
  renderProfile();
  setVisualStyle(visualStyle);
  switchTab(isValidSeed(seed) ? 'reading' : currentTab);
  if (isValidSeed(seed)) {
    const picksParam = url.searchParams.get('picks');
    const picks = picksParam
    ? picksParam.split('-').map(Number)
    : 'first';
    performReading(seed, false, picks);
  }
  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
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
})();
