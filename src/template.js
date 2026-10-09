// 版型：簡約（minimal，原本的樣子）與三種新版型。
// index.html 的 inline script 在繪製前就把 <html data-template> 設好；這裡負責之後的切換、
// 新版型共用的導覽列與「我的」分段，以及個人牌在不同版型裡的位置
import { currentTab, lastReadingData } from './state.js';
import { switchTab } from './main.js';
import { refreshTheme } from './settings.js';
import { renderResults, shownReading } from './reading.js';
import * as storage from './storage.js';

export const TEMPLATES = ['minimal', 'aurora', 'editorial', 'immersive'];
const TEMPLATE_KEY = 'template';
// 「我的」涵蓋的分頁
const ME_TABS = ['statistics', 'settings'];

// 直接讀 <html> 上的屬性、不碰模組裡的常數：其他模組在本模組求值前（循環引用）呼叫也安全
export function currentTemplate() {
  const v = document.documentElement.dataset.template;
  return v === 'aurora' || v === 'editorial' || v === 'immersive' ? v : 'minimal';
}
export function isNewTemplate() {
  return currentTemplate() !== 'minimal';
}
function syncTemplateRadios() {
  const tpl = currentTemplate();
  document.querySelectorAll('input[name="templatePref"]').forEach(r => {
    r.checked = r.value === tpl;
  });
}
// 個人牌：簡約版型放在占卜分頁上方，新版型放在「我的」最上面。只搬 DOM 節點，profile.js 照常以 id 找到它
function placeProfileCards() {
  const el = document.getElementById('profileCards');
  const hub = document.getElementById('meHub');
  const reading = document.getElementById('tabReading');
  if (!el || !hub || !reading) return;
  if (isNewTemplate()) {
    if (el.parentElement !== hub) hub.appendChild(el);
  } else if (el.parentElement !== reading) {
    reading.insertBefore(el, reading.querySelector(':scope > .panel'));
  }
}
// 先換畫面，最後才寫入儲存空間（寫入失敗也照常切換）
export function applyTemplate(name, { save = true } = {}) {
  const tpl = TEMPLATES.includes(name) ? name : 'minimal';
  const changed = tpl !== currentTemplate();
  document.documentElement.dataset.template = tpl;
  placeProfileCards();
  syncTemplateRadios();
  syncNav(currentTab);
  if (changed) {
    // 霓虹主題在新版型以深色顯示；網址列顏色、統計圖的配色都跟著新的 token
    refreshTheme();
    // 逐張解讀在新版型是翻頁器，在簡約版型是清單：重畫目前顯示的結果
    if (shownReading()) renderResults(lastReadingData);
  }
  if (!save) return;
  if (tpl === 'minimal') storage.remove(TEMPLATE_KEY);
  else storage.set(TEMPLATE_KEY, tpl);
}
document.querySelectorAll('input[name="templatePref"]').forEach(radio => {
  radio.addEventListener('change', (e) => {
    if (e.target.checked) applyTemplate(e.target.value);
  });
});

// ── 導覽列與「我的」 ──
// 按「我的」時回到上次看的那一個（統計或設定）；switchTab 進入其中一個時會更新
let lastMeTab = 'statistics';
const navItems = Array.from(document.querySelectorAll('.tpl-nav-item'));
const meSegItems = Array.from(document.querySelectorAll('#meSeg .seg-item'));
// switchTab 每次都會呼叫：導覽列的 aria-current 與「我的」分段的選取狀態跟著目前分頁
export function syncNav(tabName) {
  const me = ME_TABS.includes(tabName);
  if (me) lastMeTab = tabName;
  navItems.forEach(item => {
    const on = item.dataset.nav === (me ? 'me' : tabName);
    if (on) item.setAttribute('aria-current', 'page');
    else item.removeAttribute('aria-current');
  });
  meSegItems.forEach(item => {
    const on = item.dataset.me === (me ? tabName : lastMeTab);
    item.classList.toggle('active', on);
    item.setAttribute('aria-selected', on);
    item.tabIndex = on ? 0 : -1;
  });
}
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
// 使用者切換分頁（導覽列、「我的」分段、數字快捷鍵）：新版型在支援的瀏覽器用 View Transitions 淡入淡出；
// 減少動態或簡約版型時直接切換。切換本身仍只由 switchTab 負責
export function navigateTab(tabName) {
  // 新版型的導覽列一直在畫面上，換到別的分頁時回到頂端，不沿用上一頁捲到的位置
  const go = () => {
    const moved = tabName !== currentTab;
    switchTab(tabName);
    if (moved && isNewTemplate()) window.scrollTo(0, 0);
  };
  if (isNewTemplate() && typeof document.startViewTransition === 'function' && !prefersReducedMotion() && tabName !== currentTab) {
    try {
      const vt = document.startViewTransition(go);
      // 轉場被略過或中斷（例如連按兩次、視窗大小改變）不影響切換本身
      vt.ready.catch(() => {});
      vt.finished.catch(() => {});
      return;
    } catch {}
  }
  go();
}
navItems.forEach(item => {
  item.addEventListener('click', () => {
    navigateTab(item.dataset.nav === 'me' ? lastMeTab : item.dataset.nav);
  });
});
meSegItems.forEach(item => {
  item.addEventListener('click', () => navigateTab(item.dataset.me));
});

// main.js 的 init 呼叫：版型已由 inline script 設好，這裡只把畫面與設定同步
export function initTemplate() {
  applyTemplate(currentTemplate(), { save: false });
}
