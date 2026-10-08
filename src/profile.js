import { t } from './i18n.js';
import { escapeHTML, showToast } from './utils.js';
import { fullTarotCards, orientationNames } from './data.js';
import { cardThumb } from './render.js';
import * as storage from './storage.js';

const PROFILE_BIRTHDAY_KEY = 'birthday';
const PROFILE_SHICHEN_KEY = 'birthShichen';
const PROFILE_SHICHEN_UNKNOWN = 12;
const PROFILE_POSITIONS = ['origin', 'inheritance', 'self', 'legacy', 'return'];
const profilePositionNames = {
  origin: 'profile.pos.origin', inheritance: 'profile.pos.inheritance', self: 'profile.pos.self',
  legacy: 'profile.pos.legacy', return: 'profile.pos.return'
};
const PROFILE_POS = 5;
const PROFILE_COMMIT_DELAY = 800;
const PROFILE_M = 78n * 77n * 76n * 75n * 74n * 32n;
const PROFILE_K = 982451653n;
function profileDayIndex(y, m, d) {
  const dt = new Date(Date.UTC(2000, m - 1, d));
  dt.setUTCFullYear(y);
  return Math.floor(dt.getTime() / 86400000);
}
function profileInput(y, m, d, shichen) {
  return BigInt(profileDayIndex(y, m, d)) * 13n + BigInt(shichen);
}
function profileDeal(n) {
  let x = ((n % PROFILE_M) + PROFILE_M) % PROFILE_M;
  x = (x * PROFILE_K) % PROFILE_M;
  const pool = Array.from({ length: 78 }, (_, i) => i);
  const out = [];
  for (let i = 0; i < PROFILE_POS; i++) {
    const left = BigInt(pool.length);
    const j = Number(x % left); x /= left;
    const card = pool.splice(j, 1)[0];
    const reversed = Number(x % 2n); x /= 2n;
    out.push({ index: card, orientation: reversed ? 'reversed' : 'upright' });
  }
  return out;
}
export function profileParseBirthday(str) {
  if (typeof str !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(str)) return null;
  const y = Number(str.slice(0, 4));
  const m = Number(str.slice(5, 7));
  const d = Number(str.slice(8, 10));
  if (y < 1) return null;
  if (m < 1 || m > 12) return null;
  if (d < 1 || d > 31) return null;
  const dt = new Date(2000, m - 1, d);
  dt.setFullYear(y);
  if (dt.getFullYear() !== y || dt.getMonth() !== m - 1 || dt.getDate() !== d) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (dt > today) return null;
  return { y, m, d };
}
export function profileParseShichen(str) {
  if (typeof str !== 'string' || !/^(?:[0-9]|1[0-2])$/.test(str)) return null;
  return Number(str);
}
function profileComputeCards(str, shichen) {
  const parsed = profileParseBirthday(str);
  if (!parsed) return null;
  const sc = Number.isInteger(shichen) && shichen >= 0 && shichen <= PROFILE_SHICHEN_UNKNOWN
  ? shichen
  : PROFILE_SHICHEN_UNKNOWN;
  return profileDeal(profileInput(parsed.y, parsed.m, parsed.d, sc))
  .map((dealt, i) => ({
    position: PROFILE_POSITIONS[i],
    card: fullTarotCards[dealt.index],
    orientation: dealt.orientation
  }))
  .filter(entry => entry.card);
}
// 儲存失敗（空間已滿、網站資料被封鎖）時仍以這次輸入的值顯示，到關閉頁面為止
const profileMemory = {};
function profileRead(key) {
  return Object.prototype.hasOwnProperty.call(profileMemory, key) ? profileMemory[key] : storage.get(key);
}
function profileGetBirthday() {
  const v = profileRead(PROFILE_BIRTHDAY_KEY);
  return profileParseBirthday(v) ? v : '';
}
function profileSetBirthday(value) {
  profileMemory[PROFILE_BIRTHDAY_KEY] = value || null;
  if (value) storage.set(PROFILE_BIRTHDAY_KEY, value);
  else storage.remove(PROFILE_BIRTHDAY_KEY);
}
export function profileGetShichen() {
  const v = profileParseShichen(profileRead(PROFILE_SHICHEN_KEY));
  return v === null ? PROFILE_SHICHEN_UNKNOWN : v;
}
function profileSetShichen(value) {
  profileMemory[PROFILE_SHICHEN_KEY] = String(value);
  storage.set(PROFILE_SHICHEN_KEY, String(value));
}
// 匯入設定後改從儲存空間重新讀取
export function profileForgetMemory() {
  delete profileMemory[PROFILE_BIRTHDAY_KEY];
  delete profileMemory[PROFILE_SHICHEN_KEY];
}
function profileCurrentCards() {
  return profileComputeCards(profileGetBirthday(), profileGetShichen());
}
function renderProfilePreview() {
  const el = document.getElementById('profilePreview');
  if (!el) return;
  const entries = profileCurrentCards();
  if (!entries || !entries.length) {
    el.classList.add('empty');
    el.textContent = t('profile.empty');
    return;
  }
  el.classList.remove('empty');
  el.textContent = entries
  .map(e => t('profile.preview.item', {
    pos: t(profilePositionNames[e.position]),
    name: e.card.name,
    ori: orientationNames[e.orientation] ? t(orientationNames[e.orientation]) : ''
  }))
  .join(' · ');
}
export function renderProfileCards() {
  const el = document.getElementById('profileCards');
  if (!el) return;
  const entries = profileCurrentCards();
  if (!entries || !entries.length) {
    el.classList.add('hidden');
    el.innerHTML = '';
    return;
  }
  el.innerHTML = entries.map(({ position, card, orientation }, i) => {
    const art = cardThumb(card, orientation === 'reversed' ? 'reversed' : '', 28);
    const ori = t(orientationNames[orientation] || orientation);
    return `
<button class="profile-chip" data-suit="${escapeHTML(card.suit)}" tabindex="${i === 0 ? 0 : -1}" data-keynav-item data-action="openCardModal" data-card="${card.nameKey}" data-orientation="${orientation}">
${art ? `<span class="profile-chip-art">${art}</span>` : ''}
<span class="profile-chip-text">
<span class="profile-chip-label">${escapeHTML(t(profilePositionNames[position] || position))}</span>
<span class="profile-chip-name">${escapeHTML(card.name)}<span class="profile-chip-ori">${escapeHTML(ori)}</span></span>
</span>
</button>
`;
  }).join('');
  el.classList.remove('hidden');
}
export function renderProfile() {
  renderProfilePreview();
  renderProfileCards();
}
export const profileBirthdayInput = document.getElementById('birthdayInput');
export const profileShichenInput = document.getElementById('shichenInput');
const profileClearBirthdayBtn = document.getElementById('clearBirthday');
if (profileBirthdayInput) {
  const today = new Date();
  const pad = (v) => String(v).padStart(2, '0');
  profileBirthdayInput.max = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;
  profileBirthdayInput.value = profileGetBirthday();
  // 用鍵盤輸入日期時，每打完一段只要湊成合法日期就會觸發 change（例如年份打到一半的 0002 年）：
  // 停手一會兒或離開欄位才真正儲存，避免一連串的中間值與提示
  let commitTimer = null;
  const commitBirthday = () => {
    clearTimeout(commitTimer);
    commitTimer = null;
    const value = profileBirthdayInput.value;
    if (value === profileGetBirthday()) return;
    if (!value) {
      profileSetBirthday('');
      renderProfile();
      return;
    }
    if (!profileParseBirthday(value)) {
      // 不合法（例如未來的日期）就退回已儲存的值，欄位上不留被拒絕的日期
      profileBirthdayInput.value = profileGetBirthday();
      const d = new Date();
      const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      const future = /^\d{4}-\d{2}-\d{2}$/.test(value) && value > today;
      showToast(t(future ? 'toast.birthdayFuture' : 'toast.birthdayInvalid'), 'error');
      return;
    }
    profileSetBirthday(value);
    renderProfile();
    showToast(t('toast.profileUpdated'));
  };
  profileBirthdayInput.addEventListener('change', () => {
    clearTimeout(commitTimer);
    commitTimer = setTimeout(commitBirthday, PROFILE_COMMIT_DELAY);
  });
  profileBirthdayInput.addEventListener('blur', () => {
    if (commitTimer) commitBirthday();
  });
}
if (profileShichenInput) {
  profileShichenInput.value = String(profileGetShichen());
  profileShichenInput.addEventListener('change', () => {
    const v = profileParseShichen(profileShichenInput.value);
    profileSetShichen(v === null ? PROFILE_SHICHEN_UNKNOWN : v);
    renderProfile();
    if (profileGetBirthday()) showToast(t('toast.profileUpdated'));
  });
}
if (profileClearBirthdayBtn) {
  profileClearBirthdayBtn.addEventListener('click', () => {
    profileSetBirthday('');
    if (profileBirthdayInput) profileBirthdayInput.value = '';
    renderProfile();
    showToast(t('toast.birthdayCleared'));
  });
}
