import { t } from './i18n.js';

// 關鍵詞清單：每個詞包成不換行的單位，換行只會發生在分隔號「・」
export function keywordList(words) {
  return `<span class="kw-list">${words.map(w => `<span class="kw">${escapeHTML(w)}</span>`).join('・')}</span>`;
}
export function escapeHTML(str) {
  return String(str).replace(/[&<>"']/g, s => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[s]));
}
export function mulberry32(a) {
  return function () {
    let t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
function sfc32(a, b, c, d) {
  return function () {
    a |= 0; b |= 0; c |= 0; d |= 0;
    let t = (a + b | 0) + d | 0;
    d = d + 1 | 0;
    a = b ^ b >>> 9;
    b = c + (c << 3) | 0;
    c = (c << 21 | c >>> 11);
    c = c + t | 0;
    return (t >>> 0) / 4294967296;
  };
}
function cryptoUint32() {
  const a = new Uint32Array(1);
  crypto.getRandomValues(a);
  return a[0];
}
export function cryptoRandom() {
  return cryptoUint32() / 4294967296;
}
export function randomInt(n) {
  if (!Number.isInteger(n) || n <= 0) return 0;
  const limit = 4294967296 - (4294967296 % n);
  let v;
  do { v = cryptoUint32(); } while (v >= limit);
  return v % n;
}
export function shuffle(arr, rng = cryptoRandom) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function isLegacySeed(seed) {
  const s = String(seed);
  return /^\d{1,10}$/.test(s) && Number(s) <= 4294967295;
}
function isSeed128(seed) {
  return /^[0-9a-f]{32}$/i.test(String(seed));
}
export function isValidSeed(seed) {
  if (seed === undefined || seed === null || seed === '') return false;
  return isSeed128(seed) || isLegacySeed(seed);
}
export function seedRng(seed) {
  const s = String(seed);
  if (isSeed128(s)) {
    const rng = sfc32(
      parseInt(s.slice(0, 8), 16),
      parseInt(s.slice(8, 16), 16),
      parseInt(s.slice(16, 24), 16),
      parseInt(s.slice(24, 32), 16)
    );
    for (let i = 0; i < 12; i++) rng();
    return rng;
  }
  return mulberry32(Number(s));
}
export function newSeed() {
  const a = new Uint32Array(4);
  crypto.getRandomValues(a);
  return Array.from(a, n => n.toString(16).padStart(8, '0')).join('');
}
// canonical 一律是正式網址的首頁（index.html 裡寫好的那個），只保留非預設的介面語言：
// 分享連結的 seed、牌陣與追蹤參數都不是另一頁內容，不讓搜尋引擎當成重複的頁面；在鏡像網址上開啟也指回正式網址
const CANONICAL_BASE = document.querySelector('link[rel="canonical"]')?.getAttribute('href') || location.origin + location.pathname;
export function syncCanonical() {
  const url = new URL(CANONICAL_BASE, location.href);
  const lang = new URL(location.href).searchParams.get('lang');
  if (lang) url.searchParams.set('lang', lang);
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    document.head.appendChild(el);
  }
  el.href = url.toString();
}
// 占卜問題是私人內容，放在網址 # 後面：瀏覽器不會把 # 之後送到任何伺服器，也不會出現在 Referer 或連結預覽的請求裡。
// 其餘參數（seed、牌陣等）不涉及隱私，照常放在 ? 後面
const QUESTION_HASH = /^#q=/;
export function questionFromURL(url) {
  if (QUESTION_HASH.test(url.hash)) return new URLSearchParams(url.hash.slice(1)).get('q');
  // 舊版分享連結把問題放在 ?q=，照樣讀得到；之後寫回網址時會改放到 # 後面
  return url.searchParams.get('q');
}
export function updateURL(params) {
  const url = new URL(location.href);
  Object.entries(params).forEach(([k, v]) => {
    const empty = v === undefined || v === null || v === '';
    if (k === 'q') {
      url.searchParams.delete('q');
      if (!empty) url.hash = new URLSearchParams({ q: String(v) }).toString();
      else if (QUESTION_HASH.test(url.hash)) url.hash = '';
      return;
    }
    if (empty) url.searchParams.delete(k);
    else url.searchParams.set(k, String(v));
  });
  history.replaceState(null, '', url.toString());
  syncCanonical();
}
export function formatDate(timestamp) {
  const d = new Date(timestamp);
  return `${d.getFullYear()}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getDate().toString().padStart(2, '0')} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
}
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
// 使用者要求減少動態時，程式觸發的捲動也改成瞬間到位
export function scrollBehavior() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
}
// 下載產生的檔案；網址稍後再釋放，有些瀏覽器在 click() 之後才真正開始讀取
export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
// 提示放在 aria-live="polite" 的區域裡，錯誤也不另加 role="alert"，否則螢幕閱讀器會念兩次。
// action：{ label, onClick } 會在提示裡加一個按鈕；有按鈕的提示停留較久，讓人來得及按
export function showToast(message, type = 'success', { action = null } = {}) {
  const container = document.getElementById('toastContainer');
  if (!container) return null;
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  const icon = type === 'success' ?
  '<svg class="toast-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd"/></svg>' :
  type === 'error' ?
  '<svg class="toast-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clip-rule="evenodd"/></svg>' :
  '<svg class="toast-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd"/></svg>';
  toast.innerHTML = `
${icon}
<span class="toast-message">${escapeHTML(message)}</span>
${action ? `<button type="button" class="toast-action">${escapeHTML(action.label)}</button>` : ''}
`;
  const dismiss = () => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 500);
  };
  if (action) {
    toast.querySelector('.toast-action').addEventListener('click', () => {
      dismiss();
      action.onClick();
    });
  }
  container.appendChild(toast);
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });
  setTimeout(dismiss, action ? 12000 : 3000);
  return toast;
}
// 提示有新版本或程式片段載入失敗時，提供重新整理的按鈕；同一則提示不重複出現
const reloadToasts = new Set();
export function offerReload(messageKey, type = 'warning') {
  if (reloadToasts.has(messageKey)) return;
  reloadToasts.add(messageKey);
  showToast(t(messageKey), type, {
    action: { label: t('btn.reload'), onClick: () => location.reload() }
  });
}
export function readNeonSuitColors(suits) {
  const probe = document.createElement('div');
  probe.style.display = 'none';
  document.body.appendChild(probe);
  const found = {};
  suits.forEach(suit => {
    probe.setAttribute('data-suit', suit);
    const color = getComputedStyle(probe).getPropertyValue('--neon-suit').trim();
    if (color) found[suit] = color;
  });
  probe.remove();
  return found;
}
let confirmPendingCancel = null;
export function dismissPendingConfirm() {
  if (confirmPendingCancel) confirmPendingCancel();
}
export function openConfirm({ title, message, confirmText = t('btn.confirm'), danger = false } = {}) {
  if (confirmPendingCancel) confirmPendingCancel();
  return new Promise(resolve => {
    const overlay = document.getElementById('confirmModal');
    const okBtn = document.getElementById('confirmOk');
    const cancelBtn = document.getElementById('confirmCancel');
    const closeBtn = document.getElementById('confirmClose');
    // 確認視窗是 alertdialog：開啟時念出訊息，焦點先落在「取消」，避免一按 Enter 就執行危險動作
    const dialog = overlay.querySelector('.modal');
    dialog.setAttribute('role', 'alertdialog');
    dialog.setAttribute('aria-describedby', 'confirmMessage');
    overlay.dataset.autofocus = '#confirmCancel';
    document.getElementById('confirmTitle').textContent = title || '';
    document.getElementById('confirmMessage').textContent = message || '';
    okBtn.textContent = confirmText;
    okBtn.className = `btn ${danger ? 'btn-danger' : 'btn-primary'} btn-sm`;
    const done = (result) => {
      if (confirmPendingCancel === cancel) confirmPendingCancel = null;
      okBtn.removeEventListener('click', onOk);
      cancelBtn.removeEventListener('click', onCancel);
      closeBtn.removeEventListener('click', onCancel);
      overlay.classList.remove('show');
      resolve(result);
    };
    const onOk = () => done(true);
    const onCancel = () => done(false);
    const cancel = onCancel;
    okBtn.addEventListener('click', onOk);
    cancelBtn.addEventListener('click', onCancel);
    closeBtn.addEventListener('click', onCancel);
    confirmPendingCancel = cancel;
    overlay.classList.add('show');
  });
}
