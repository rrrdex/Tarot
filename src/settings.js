import { t } from './i18n.js';
import { openConfirm, showToast } from './utils.js';
import {
  currentTab,
  normalizeReading,
  readingHistory,
  saveHistory,
  setReadingHistory
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
  profileGetShichen,
  profileParseBirthday,
  profileParseShichen,
  profileShichenInput,
  renderProfile
} from './profile.js';
import { setShortcutsEnabled, updateSpreadInfo } from './main.js';

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
function syncThemeRadios() {
  const pref = localStorage.getItem('theme') || 'auto';
  document.querySelectorAll('input[name="themePref"]').forEach(r => {
    r.checked = r.value === pref;
  });
}
function applyThemePref(pref) {
  const root = document.documentElement;
  root.classList.remove('light', 'dark', 'neon');
  if (pref === 'light' || pref === 'dark' || pref === 'neon') {
    root.classList.add(pref);
    localStorage.setItem('theme', pref);
  } else {
    localStorage.removeItem('theme');
  }
  updateThemeIcons();
  updateThemeColor();
  syncThemeRadios();
  if (currentTab === 'statistics') renderStatistics();
}
export function toggleTheme() {
  applyThemePref(isDarkActive() ? 'light' : 'dark');
}
const savedTheme = localStorage.getItem('theme');
if (['light', 'dark', 'neon'].includes(savedTheme)) {
  document.documentElement.classList.add(savedTheme);
}
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
});
export function updateDataStats() {
  const el = document.getElementById('dataStats');
  if (!el) return;
  const raw = localStorage.getItem('readingHistory') || '[]';
  const kb = (new Blob([raw]).size / 1024).toFixed(1);
  el.textContent = t('settings.data.stats', { n: readingHistory.length, max: 100, kb });
}
document.getElementById('clearAllData').addEventListener('click', async () => {
  const ok = await openConfirm({
    title: t('confirm.clearAll.title'),
    message: t('confirm.clearAll.message'),
    confirmText: t('confirm.clearAll.ok'),
    danger: true
  });
  if (!ok) return;
  localStorage.clear();
  location.reload();
});
function buildExportData() {
  const prefs = {};
  ['theme', 'interactiveDraw', 'showSpreadInfo', 'showShortcuts', 'learnMode', 'learnScope', 'birthday', 'birthShichen'].forEach(k => {
    const v = localStorage.getItem(k);
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
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `tarot-backup-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast(t('toast.exported'));
});
const IMPORT_PREF_RULES = {
  theme: v => ['light', 'dark', 'neon'].includes(v),
  interactiveDraw: v => v === 'true' || v === 'false',
  showSpreadInfo: v => v === 'true' || v === 'false',
  showShortcuts: v => v === 'true' || v === 'false',
  learnMode: v => ['flash', 'quiz'].includes(v),
  learnScope: v => LEARN_SCOPES.includes(v),
  birthday: v => !!profileParseBirthday(v),
  birthShichen: v => profileParseShichen(v) !== null
};
function applyImportedExtras(data) {
  let applied = 0;
  if (data.prefs && typeof data.prefs === 'object') {
    Object.entries(IMPORT_PREF_RULES).forEach(([key, ok]) => {
      const v = data.prefs[key];
      if (typeof v === 'string' && ok(v)) { localStorage.setItem(key, v); applied++; }
    });
  }
  if (data.learn && typeof data.learn === 'object') {
    if (data.learn.progress && typeof data.learn.progress === 'object' && !Array.isArray(data.learn.progress)) {
      localStorage.setItem(LEARN_PROGRESS_KEY, JSON.stringify(data.learn.progress));
      setLearnProgress(loadLearnProgress());
      applied++;
    }
    if (data.learn.streak && typeof data.learn.streak === 'object') {
      localStorage.setItem(LEARN_STREAK_KEY, JSON.stringify(data.learn.streak));
      setLearnStreak(loadLearnStreak());
      applied++;
    }
  }
  if (!applied) return 0;
  applyThemePref(localStorage.getItem('theme') || 'auto');
  reloadLearnPrefs();
  setShortcutsEnabled(localStorage.getItem('showShortcuts') !== 'false');
  const idc = document.getElementById('interactiveDraw');
  if (idc) idc.checked = localStorage.getItem('interactiveDraw') !== 'false';
  if (showSpreadInfoCheckbox) {
    showSpreadInfoCheckbox.checked = localStorage.getItem('showSpreadInfo') !== 'false';
    updateSpreadInfo();
  }
  if (showShortcutsCheckbox) {
    showShortcutsCheckbox.checked = localStorage.getItem('showShortcuts') !== 'false';
  }
  if (profileBirthdayInput) {
    profileBirthdayInput.value = localStorage.getItem('birthday') || '';
  }
  if (profileShichenInput) {
    profileShichenInput.value = String(profileGetShichen());
  }
  renderProfile();
  return applied;
}
document.getElementById('importData').addEventListener('click', () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.history && Array.isArray(data.history)) {
          const incoming = data.history.map(normalizeReading).filter(Boolean).slice(0, 100);
          const ok = await openConfirm({
            title: t('confirm.import.title'),
            message: t('confirm.import.message', { n: incoming.length, current: readingHistory.length }),
            confirmText: t('confirm.import.ok'),
            danger: true
          });
          if (!ok) return;
          setReadingHistory(incoming);
          saveHistory();
          if (['text', 'api', 'line'].includes(data.visualStyle)) {
            setVisualStyle(data.visualStyle);
          }
          const extras = applyImportedExtras(data);
          updateDataStats();
          showToast(extras
            ? t('toast.imported.withPrefs', { n: incoming.length, prefs: extras })
            : t('toast.imported', { n: incoming.length }));
        } else {
          showToast(t('toast.importBadFormat'), 'error');
        }
      } catch {
        showToast(t('toast.importParseFailed'), 'error');
      }
    };
    reader.readAsText(file);
  };
  input.click();
});
