import { t } from './i18n.js';
import { showToast } from './utils.js';

// localStorage 的安全包裝：網站資料被封鎖時連讀取 localStorage 這個屬性都會丟錯，空間滿了寫入也會丟錯。
// 讀取失敗一律回傳預設值；寫入失敗回傳 false 並提示一次，畫面照常運作
function store() {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}
export function get(key, fallback = null) {
  try {
    const v = store()?.getItem(key);
    return v === null || v === undefined ? fallback : v;
  } catch {
    return fallback;
  }
}
// 同一波失敗只提示一次（例如占卜時連續寫入好幾個值）
let lastWarned = 0;
function warnWriteFailed() {
  const now = Date.now();
  if (now - lastWarned < 10000) return;
  lastWarned = now;
  showToast(t('toast.storageFull'), 'error');
}
export function set(key, value) {
  try {
    const s = store();
    if (!s) throw new Error('storage unavailable');
    s.setItem(key, String(value));
    return true;
  } catch {
    warnWriteFailed();
    return false;
  }
}
export function remove(key) {
  try {
    store()?.removeItem(key);
  } catch {}
}
export function clear() {
  try {
    store()?.clear();
  } catch {}
}
