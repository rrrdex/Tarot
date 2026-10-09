// 觸覺回饋：抽牌、翻牌時輕輕震動。只在新版型、裝置支援、設定沒有關掉時才震動；
// 不支援震動的裝置（多數桌機、iOS Safari）設定項目整個隱藏
import { isNewTemplate } from './template.js';
import * as storage from './storage.js';

const HAPTICS_KEY = 'haptics';
export const hapticsSupported = typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function';

export function hapticsEnabled() {
  return storage.get(HAPTICS_KEY) !== 'false';
}
export function haptic(ms = 10) {
  if (!hapticsSupported || !isNewTemplate() || !hapticsEnabled()) return;
  try {
    navigator.vibrate(ms);
  } catch {}
}
const checkbox = document.getElementById('hapticsToggle');
// 匯入設定後也呼叫一次
export function syncHapticsCheckbox() {
  if (checkbox) checkbox.checked = hapticsEnabled();
}
if (checkbox) {
  if (!hapticsSupported) {
    checkbox.closest('.checkbox-item')?.classList.add('hidden');
    document.getElementById('desc-settings-pref-haptics-desc')?.classList.add('hidden');
  }
  syncHapticsCheckbox();
  checkbox.addEventListener('change', (e) => {
    storage.set(HAPTICS_KEY, e.target.checked);
    if (e.target.checked) haptic();
  });
}
