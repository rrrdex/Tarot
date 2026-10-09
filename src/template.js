// 版型：星夜玻璃（aurora，預設）、現代編輯、沉浸手勢，以及原本的簡約（minimal）。
// index.html 的 inline script 在繪製前就把 <html data-template> 設好；這裡負責之後的切換、
// 新版型共用的導覽列，以及個人牌在不同版型裡的位置
import { currentTab, lastReadingData } from './state.js';
import { switchTab } from './main.js';
import { refreshTheme } from './settings.js';
import { renderResults, shownReading } from './reading.js';
import * as storage from './storage.js';

export const TEMPLATES = ['minimal', 'aurora', 'editorial', 'immersive'];
const TEMPLATE_KEY = 'template';
// 沒選過版型時用星夜玻璃；index.html 的 inline script 用同一個預設
export const DEFAULT_TEMPLATE = 'aurora';
// 直接讀 <html> 上的屬性、不碰模組裡的常數：其他模組在本模組求值前（循環引用）呼叫也安全
export function currentTemplate() {
  const v = document.documentElement.dataset.template;
  return v === 'minimal' || v === 'editorial' || v === 'immersive' ? v : 'aurora';
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
// 個人牌：簡約版型放在占卜分頁上方，新版型放在統計分頁最上面。只搬 DOM 節點，profile.js 照常以 id 找到它
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
  const tpl = TEMPLATES.includes(name) ? name : DEFAULT_TEMPLATE;
  const changed = tpl !== currentTemplate();
  document.documentElement.dataset.template = tpl;
  placeProfileCards();
  syncTemplateRadios();
  syncNav(currentTab);
  if (changed) {
    // 霓虹主題在新版型是該版型自己的霓虹配色；網址列顏色、統計圖的配色都跟著新的 token
    refreshTheme();
    // 逐張解讀在新版型是翻頁器，在簡約版型是清單：重畫目前顯示的結果
    if (shownReading()) renderResults(lastReadingData);
  }
  if (!save) return;
  if (tpl === DEFAULT_TEMPLATE) storage.remove(TEMPLATE_KEY);
  else storage.set(TEMPLATE_KEY, tpl);
}
document.querySelectorAll('input[name="templatePref"]').forEach(radio => {
  radio.addEventListener('change', (e) => {
    if (e.target.checked) applyTemplate(e.target.value);
  });
});

// ── 導覽列 ──
const navItems = Array.from(document.querySelectorAll('.tpl-nav-item'));
// switchTab 每次都會呼叫：導覽列的 aria-current 跟著目前分頁
export function syncNav(tabName) {
  navItems.forEach(item => {
    if (item.dataset.nav === tabName) item.setAttribute('aria-current', 'page');
    else item.removeAttribute('aria-current');
  });
}
const root = document.documentElement;
let vtActive = 0;
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
// 使用者切換分頁（導覽列、數字快捷鍵）：新版型在支援的瀏覽器用 View Transitions 淡入淡出；
// 減少動態或簡約版型時直接切換。切換本身仍只由 switchTab 負責
export function navigateTab(tabName) {
  // 新版型的導覽列一直在畫面上，換到別的分頁時回到頂端，不沿用上一頁捲到的位置
  const go = () => {
    const moved = tabName !== currentTab;
    switchTab(tabName);
    if (moved && isNewTemplate()) window.scrollTo(0, 0);
  };
  if (isNewTemplate() && typeof document.startViewTransition === 'function' && !prefersReducedMotion() && tabName !== currentTab) {
    // 導覽列只在轉場期間帶 view-transition-name（平常帶著會讓膠囊的毛玻璃失效），連按時等最後一次結束才拿掉
    vtActive++;
    root.classList.add('vt-nav');
    const done = () => {
      vtActive = Math.max(0, vtActive - 1);
      if (!vtActive) root.classList.remove('vt-nav');
    };
    try {
      const vt = document.startViewTransition(go);
      // 轉場被略過或中斷（例如連按兩次、視窗大小改變）不影響切換本身
      vt.ready.catch(() => {});
      vt.finished.catch(() => {}).then(done);
      return;
    } catch {
      done();
    }
  }
  go();
}
navItems.forEach(item => {
  item.addEventListener('click', () => navigateTab(item.dataset.nav));
});

// main.js 的 init 呼叫：版型已由 inline script 設好，這裡只把畫面與設定同步
export function initTemplate() {
  applyTemplate(currentTemplate(), { save: false });
}
