import { uiStrings } from './strings.js';
import { syncCanonical } from './utils.js';
import { rerenderForLang } from './main.js';

const I18N_KEY = 'lang';
const I18N_FALLBACK = 'zh';
const I18N_LANGS = {
  zh: { label: '中文', htmlLang: 'zh-TW' },
  en: { label: 'English', htmlLang: 'en' }
};
function availableLangs() {
  return Object.keys(I18N_LANGS).filter(code => uiStrings[code]);
}
let lang = (() => {
  try {
    const q = new URLSearchParams(location.search).get('lang');
    if (q && Object.prototype.hasOwnProperty.call(uiStrings, q)) return q;
  } catch {   }
  try {
    const v = localStorage.getItem(I18N_KEY);
    return Object.prototype.hasOwnProperty.call(uiStrings, v) ? v : I18N_FALLBACK;
  } catch {
    return I18N_FALLBACK;
  }
})();
export function applyLangToDocument() {
  const meta = I18N_LANGS[lang] || {};
  document.documentElement.lang = meta.htmlLang || lang;
  try {
    const url = new URL(location.href);
    if (lang === I18N_FALLBACK) url.searchParams.delete('lang');
    else url.searchParams.set('lang', lang);
    history.replaceState(null, '', url);
  } catch {   }
  syncCanonical();
}
function setLang(code) {
  if (!uiStrings[code] || code === lang) return;
  lang = code;
  try { localStorage.setItem(I18N_KEY, code); } catch {   }
  applyLangToDocument();
  rerenderForLang();
}
export function buildLangSwitch() {
  const el = document.getElementById('langSwitch');
  if (!el) return;
  const langs = availableLangs();
  if (langs.length < 2) { el.classList.add('hidden'); el.innerHTML = ''; return; }
  const next = langs[(langs.indexOf(lang) + 1) % langs.length];
  el.classList.remove('hidden');
  el.innerHTML = `<button type="button" class="btn btn-tertiary btn-sm lang-switch-btn"
lang="${I18N_LANGS[next].htmlLang}" aria-label="${t('app.langSwitch.label', { lang: I18N_LANGS[next].label })}"
>${I18N_LANGS[next].label}</button>`;
  el.querySelector('button').addEventListener('click', () => setLang(next));
}
export function t(key, vars) {
  const table = uiStrings[lang] || uiStrings[I18N_FALLBACK];
  let s = Object.prototype.hasOwnProperty.call(table, key) ? table[key] : key;
  if (vars) {
    Object.keys(vars).forEach(k => {
      s = s.split('{' + k + '}').join(String(vars[k]));
    });
  }
  return s;
}
export function applyStaticStrings(root = document) {
  root.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
  root.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });
  root.querySelectorAll('[data-i18n-label]').forEach(el => {
    el.setAttribute('aria-label', t(el.dataset.i18nLabel));
  });
  root.querySelectorAll('[data-i18n-title]').forEach(el => {
    el.title = t(el.dataset.i18nTitle);
  });
}
