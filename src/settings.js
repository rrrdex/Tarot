import { t } from './i18n.js';
import { downloadBlob, openConfirm, showToast } from './utils.js';
import {
  HISTORY_MAX,
  currentTab,
  normalizeHistory,
  readingHistory,
  saveHistory,
  setReadingHistory,
  trimHistory
} from './state.js';
import {
  iconMoon,
  iconSun,
  showShortcutsCheckbox,
  showSpreadInfoCheckbox,
  themeToggle
} from './dom.js';
import { setVisualStyle, visualStyle } from './render.js';
import { renderStatistics } from './stats.js';
import {
  LEARN_PROGRESS_KEY,
  LEARN_SCOPES,
  LEARN_STREAK_KEY,
  learnProgress,
  learnStreak,
  loadLearnProgress,
  loadLearnStreak,
  reloadLearnPrefs,
  setLearnProgress,
  setLearnStreak
} from './learn.js';
import {
  profileBirthdayInput,
  profileForgetMemory,
  profileGetShichen,
  profileParseBirthday,
  profileParseShichen,
  profileShichenInput,
  renderProfile
} from './profile.js';
import { setShortcutsEnabled, switchTab, updateSpreadInfo } from './main.js';
import { TEMPLATES, applyTemplate, isNewTemplate } from './template.js';
import { syncHapticsCheckbox } from './haptics.js';
import * as storage from './storage.js';

function isDarkActive() {
  const root = document.documentElement;
  return root.classList.contains('dark') || root.classList.contains('neon') ||
  (!root.classList.contains('light') && window.matchMedia('(prefers-color-scheme: dark)').matches);
}
function updateThemeColor() {
  const bg = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim();
  document.querySelector('meta[name="theme-color"]').setAttribute('content', bg);
}
function updateThemeIcons() {
  const dark = isDarkActive();
  iconSun.style.display = dark ? 'block' : 'none';
  iconMoon.style.display = dark ? 'none' : 'block';
  themeToggle.setAttribute('aria-label', t(dark ? 'app.themeToggle.toLight' : 'app.themeToggle.toDark'));
}
let themePref = storage.get('theme', 'auto');
if (!['light', 'dark', 'neon'].includes(themePref)) themePref = 'auto';
function syncThemeRadios() {
  document.querySelectorAll('input[name="themePref"]').forEach(r => {
    r.checked = r.value === themePref;
  });
}
// 霓虹主題只在簡約版型有專屬外觀；新版型以深色顯示（與 index.html 的 inline script 相同）
function applyThemeClass() {
  const root = document.documentElement;
  root.classList.remove('light', 'dark', 'neon');
  if (themePref !== 'auto') root.classList.add(themePref === 'neon' && isNewTemplate() ? 'dark' : themePref);
}
// 換版型後重新套用主題：霓虹與深色的對應、網址列顏色、統計圖的配色
export function refreshTheme() {
  applyThemeClass();
  updateThemeIcons();
  updateThemeColor();
  if (currentTab === 'statistics') renderStatistics();
}
// 先換畫面，最後才寫入儲存空間
function applyThemePref(pref) {
  themePref = ['light', 'dark', 'neon'].includes(pref) ? pref : 'auto';
  applyThemeClass();
  updateThemeIcons();
  updateThemeColor();
  syncThemeRadios();
  if (currentTab === 'statistics') renderStatistics();
  if (themePref === 'auto') storage.remove('theme');
  else storage.set('theme', themePref);
}
export function toggleTheme() {
  applyThemePref(isDarkActive() ? 'light' : 'dark');
}
applyThemeClass();
// 要在 applyStaticStrings 之後呼叫：按鈕的 aria-label 依目前主題而定，不能被靜態字串蓋掉
export function initTheme() {
  updateThemeIcons();
  updateThemeColor();
  syncThemeRadios();
}
themeToggle.addEventListener('click', toggleTheme);
document.querySelectorAll('input[name="themePref"]').forEach(radio => {
  radio.addEventListener('change', (e) => {
    if (e.target.checked) applyThemePref(e.target.value);
  });
});
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  updateThemeIcons();
  updateThemeColor();
  // 跟隨系統時，統計圖的配色（--chart-*）也可能跟著深淺色變
  if (currentTab === 'statistics') renderStatistics();
});
export function updateDataStats() {
  const el = document.getElementById('dataStats');
  if (!el) return;
  const raw = storage.get('readingHistory', '[]');
  const kb = (new Blob([raw]).size / 1024).toFixed(1);
  el.textContent = t('settings.data.stats', { n: readingHistory.length, max: HISTORY_MAX, kb });
}
document.getElementById('clearAllData').addEventListener('click', async () => {
  const ok = await openConfirm({
    title: t('confirm.clearAll.title'),
    message: t('confirm.clearAll.message'),
    confirmText: t('confirm.clearAll.ok'),
    danger: true
  });
  if (!ok) return;
  storage.clear();
  // 連網址上的 seed、問題一起清掉，否則重新載入後又會畫出那次占卜
  location.replace(location.pathname);
});
const EXPORT_PREFS = ['theme', 'template', 'haptics', 'interactiveDraw', 'showSpreadInfo', 'showShortcuts', 'learnMode', 'learnScope', 'birthday', 'birthShichen'];
function buildExportData() {
  const prefs = {};
  EXPORT_PREFS.forEach(k => {
    const v = storage.get(k);
    if (v !== null) prefs[k] = v;
  });
  return {
    version: __APP_VERSION__,
    exportDate: new Date().toISOString(),
    history: readingHistory,
    visualStyle: visualStyle,
    prefs,
    learn: {
      progress: learnProgress,
      streak: learnStreak
    }
  };
}
document.getElementById('exportData').addEventListener('click', () => {
  const data = buildExportData();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  downloadBlob(blob, `tarot-backup-${Date.now()}.json`);
  showToast(t('toast.exported'));
});
const IMPORT_PREF_RULES = {
  theme: v => ['light', 'dark', 'neon'].includes(v),
  template: v => TEMPLATES.includes(v),
  haptics: v => v === 'true' || v === 'false',
  interactiveDraw: v => v === 'true' || v === 'false',
  showSpreadInfo: v => v === 'true' || v === 'false',
  showShortcuts: v => v === 'true' || v === 'false',
  learnMode: v => ['flash', 'quiz'].includes(v),
  learnScope: v => LEARN_SCOPES.includes(v),
  birthday: v => !!profileParseBirthday(v),
  birthShichen: v => profileParseShichen(v) !== null
};
function hasImportExtras(data) {
  const prefs = data.prefs && typeof data.prefs === 'object' &&
    Object.entries(IMPORT_PREF_RULES).some(([k, ok]) => typeof data.prefs[k] === 'string' && ok(data.prefs[k]));
  const learn = data.learn && typeof data.learn === 'object' && (data.learn.progress || data.learn.streak);
  return !!(prefs || learn);
}
function applyImportedExtras(data) {
  let applied = 0;
  if (data.prefs && typeof data.prefs === 'object') {
    Object.entries(IMPORT_PREF_RULES).forEach(([key, ok]) => {
      const v = data.prefs[key];
      if (typeof v === 'string' && ok(v)) { storage.set(key, v); applied++; }
    });
  }
  if (data.learn && typeof data.learn === 'object') {
    if (data.learn.progress && typeof data.learn.progress === 'object' && !Array.isArray(data.learn.progress)) {
      storage.set(LEARN_PROGRESS_KEY, JSON.stringify(data.learn.progress));
      setLearnProgress(loadLearnProgress());
      applied++;
    }
    if (data.learn.streak && typeof data.learn.streak === 'object') {
      storage.set(LEARN_STREAK_KEY, JSON.stringify(data.learn.streak));
      setLearnStreak(loadLearnStreak());
      applied++;
    }
  }
  if (!applied) return 0;
  // 先換版型再套主題：霓虹在新版型以深色顯示
  applyTemplate(storage.get('template', 'minimal'), { save: false });
  applyThemePref(storage.get('theme', 'auto'));
  syncHapticsCheckbox();
  reloadLearnPrefs();
  setShortcutsEnabled(storage.get('showShortcuts') !== 'false');
  const idc = document.getElementById('interactiveDraw');
  if (idc) idc.checked = storage.get('interactiveDraw') !== 'false';
  if (showSpreadInfoCheckbox) {
    showSpreadInfoCheckbox.checked = storage.get('showSpreadInfo') !== 'false';
    updateSpreadInfo();
  }
  if (showShortcutsCheckbox) {
    showShortcutsCheckbox.checked = storage.get('showShortcuts') !== 'false';
  }
  profileForgetMemory();
  if (profileBirthdayInput) {
    profileBirthdayInput.value = storage.get('birthday', '');
  }
  if (profileShichenInput) {
    profileShichenInput.value = String(profileGetShichen());
  }
  renderProfile();
  return applied;
}
function importConfirmMessage(n, current, extras) {
  const parts = [current
    ? t('confirm.import.message', { n, current })
    : t('confirm.import.messageEmpty', { n })];
  if (extras) parts.push(t('confirm.import.extras'));
  return parts.join('');
}
async function importData(data) {
  if (!data || typeof data !== 'object' || !Array.isArray(data.history)) {
    showToast(t('toast.importBadFormat'), 'error');
    return;
  }
  const normalized = normalizeHistory(data.history);
  // 檔案裡沒有任何可用的紀錄時，不拿空清單蓋掉現有的紀錄
  if (!normalized.length && readingHistory.length) {
    showToast(t('toast.importEmpty'), 'error');
    return;
  }
  const { list: incoming, trimmed } = trimHistory(normalized);
  const ok = await openConfirm({
    title: t('confirm.import.title'),
    message: importConfirmMessage(incoming.length, readingHistory.length, hasImportExtras(data)),
    confirmText: t('confirm.import.ok'),
    danger: true
  });
  if (!ok) return;
  const previous = readingHistory;
  setReadingHistory(incoming);
  // 寫入失敗（空間不足）就還原，畫面上的紀錄和儲存的保持一致；提示由 storage.js 顯示
  if (!saveHistory()) {
    setReadingHistory(previous);
    return;
  }
  if (['text', 'api', 'line'].includes(data.visualStyle)) {
    setVisualStyle(data.visualStyle).catch(() => {});
  }
  const extras = applyImportedExtras(data);
  updateDataStats();
  switchTab(currentTab);
  showToast(extras
    ? t('toast.imported.withPrefs', { n: incoming.length, prefs: extras })
    : t('toast.imported', { n: incoming.length }));
  if (trimmed) showToast(t('toast.historyTrimmed', { n: trimmed, max: HISTORY_MAX }), 'warning');
}
document.getElementById('importData').addEventListener('click', () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      let data;
      try {
        data = JSON.parse(e.target.result);
      } catch {
        showToast(t('toast.importParseFailed'), 'error');
        return;
      }
      importData(data);
    };
    reader.readAsText(file);
  };
  input.click();
});
