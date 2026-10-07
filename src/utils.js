import { t } from './i18n.js';

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
const CANONICAL_STRIP = /^(utm_|fbclid$|gclid$|msclkid$|igshid$|ref$|ref_src$)/;
export function syncCanonical() {
  const url = new URL(location.href);
  [...url.searchParams.keys()].forEach(k => {
    if (CANONICAL_STRIP.test(k)) url.searchParams.delete(k);
  });
  url.hash = '';
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    document.head.appendChild(el);
  }
  el.href = url.toString();
}
export function updateURL(params) {
  const url = new URL(location.href);
  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null || v === '') url.searchParams.delete(k);
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
export function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  if (type === 'error') toast.setAttribute('role', 'alert');
  const icon = type === 'success' ?
  '<svg class="toast-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd"/></svg>' :
  type === 'error' ?
  '<svg class="toast-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clip-rule="evenodd"/></svg>' :
  '<svg class="toast-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd"/></svg>';
  toast.innerHTML = `
${icon}
<span class="toast-message">${escapeHTML(message)}</span>
`;
  container.appendChild(toast);
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 500);
    }, 3000);
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
