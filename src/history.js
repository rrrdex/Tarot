import { t } from './i18n.js';
import { escapeHTML, formatDate, openConfirm, showToast } from './utils.js';
import { commonTags } from './data.js';
import {
  historyFilters,
  readingHistory,
  saveHistory,
  setLastReadingData,
  setReadingHistory
} from './state.js';
import { cancelPendingReading, focusResults, renderResults } from './reading.js';
import { switchTab } from './main.js';
import { icons } from './icons.js';

const NOTE_EXCERPT_LEN = 40;
let currentEditingId = null;
function noteExcerpt(note) {
  const flat = note.replace(/\s+/g, ' ').trim();
  return flat.length > NOTE_EXCERPT_LEN ? flat.slice(0, NOTE_EXCERPT_LEN) + '…' : flat;
}
export function renderHistory() {
  const list = document.getElementById('historyList');
  const controls = document.querySelector('#tabHistory .history-controls');
  // 完全沒有紀錄時不顯示篩選列，改放一個回占卜分頁的按鈕
  if (!readingHistory.length) {
    if (controls) controls.classList.add('hidden');
    list.innerHTML = `<div class="history-empty">
<p>${escapeHTML(t('history.none'))}</p>
<button type="button" class="btn btn-secondary btn-sm" data-action="goToReading">${escapeHTML(t('history.none.cta'))}</button>
</div>`;
    return;
  }
  if (controls) controls.classList.remove('hidden');
  const spreadSelect = document.getElementById('filterSpread');
  const spreadNames = [...new Set(readingHistory.map(r => r.spreadName))];
  spreadSelect.innerHTML = `<option value="">${escapeHTML(t('history.filter.allSpreads'))}</option>` +
  spreadNames.map(s => `<option value="${escapeHTML(s)}">${escapeHTML(t(s))}</option>`).join('');
  spreadSelect.value = historyFilters.spread;
  if (spreadSelect.selectedIndex === -1) {
    historyFilters.spread = '';
    spreadSelect.value = '';
  }
  const tagSelect = document.getElementById('filterTag');
  const tags = [...new Set(readingHistory.flatMap(r => r.tags || []))];
  tagSelect.innerHTML = `<option value="">${escapeHTML(t('history.filter.allTags'))}</option>` +
  tags.map(t => `<option value="${escapeHTML(t)}">${escapeHTML(t)}</option>`).join('');
  tagSelect.value = historyFilters.tag;
  if (tagSelect.selectedIndex === -1) {
    historyFilters.tag = '';
    tagSelect.value = '';
  }
  let filtered = readingHistory.filter(item => {
    if (historyFilters.spread && item.spreadName !== historyFilters.spread) return false;
    if (historyFilters.tag && !item.tags?.includes(historyFilters.tag)) return false;
    if (historyFilters.favorite && !item.favorite) return false;
    return true;
  });
  if (filtered.length === 0) {
    list.innerHTML = `<div class="history-empty">${escapeHTML(t('history.empty'))}</div>`;
    return;
  }
  // 整張卡片可點開：牌陣名稱是真正的按鈕，點擊範圍由 CSS 延伸到整張卡（.history-open::after）
  // 收藏、筆記等按鈕的名稱都一樣，用 aria-describedby 補上是哪一筆（牌陣名稱與時間）
  list.innerHTML = filtered.map(item => {
    const spread = t(item.spreadName);
    const time = formatDate(item.timestamp);
    const nameId = `hist-${item.id}-name`;
    const timeId = `hist-${item.id}-time`;
    const desc = `aria-describedby="${nameId} ${timeId}"`;
    const note = typeof item.note === 'string' ? item.note.trim() : '';
    return `
<article class="history-item${item.favorite ? ' favorite' : ''}" data-id="${item.id}">
<div class="history-header">
<h3 class="history-spread"><button type="button" class="history-open" data-action="viewReading" data-id="${item.id}" aria-label="${escapeHTML(t('history.item.open', { spread, time }))}"><span id="${nameId}">${escapeHTML(spread)}</span></button></h3>
<span class="history-time" id="${timeId}">${escapeHTML(time)}</span>
</div>
${item.question ? `<p class="history-question">${escapeHTML(item.question)}</p>` : ''}
${note ? `<p class="history-note">${icons.note}<span class="visually-hidden">${escapeHTML(t('history.item.note'))}</span><span class="history-note-text">${escapeHTML(noteExcerpt(note))}</span></p>` : ''}
${item.tags?.length ? `<div class="tags">${item.tags.map(t => `<span class="tag">${escapeHTML(t)}</span>`).join('')}</div>` : ''}
<button type="button" class="history-fav" data-action="toggleFavorite" data-id="${item.id}" aria-pressed="${!!item.favorite}" aria-label="${escapeHTML(t('history.item.favorite'))}" ${desc}>${icons.star}</button>
<span class="history-chevron">${icons.chevron}</span>
<div class="history-actions">
<button type="button" class="history-action" data-action="openNoteModal" data-id="${item.id}" ${desc}>${icons.note}<span class="history-action-label">${escapeHTML(t('btn.note'))}</span></button>
<button type="button" class="history-action" data-action="openTagModal" data-id="${item.id}" ${desc}>${icons.tag}<span class="history-action-label">${escapeHTML(t('btn.tag'))}</span></button>
<button type="button" class="history-action danger" data-action="deleteReading" data-id="${item.id}" ${desc}>${icons.trash}<span class="history-action-label">${escapeHTML(t('btn.delete'))}</span></button>
</div>
</article>
`;
  }).join('');
}
// 清單重畫後所有按鈕都換新：依「哪一筆、哪一種按鈕」找回對應的新按鈕。
// 那一筆已不在清單上（刪除、取消收藏後被篩掉）就改到原位置的下一筆，沒有下一筆就上一筆；
// 清單空了就落在空白提示上
function shownHistoryIds() {
  return Array.from(document.querySelectorAll('#historyList .history-item'), el => Number(el.dataset.id));
}
function refocusHistory(id, action, idsBefore = []) {
  const list = document.getElementById('historyList');
  const find = (rid) => list.querySelector(`[data-action="${action}"][data-id="${rid}"]`);
  let el = find(id);
  if (!el) {
    const i = idsBefore.indexOf(id);
    const order = i < 0 ? idsBefore : [...idsBefore.slice(i + 1), ...idsBefore.slice(0, i).reverse()];
    for (const other of order) {
      el = find(other);
      if (el) break;
    }
  }
  if (!el) {
    el = list.querySelector('.history-empty button') || list.querySelector('.history-empty');
    if (el && !el.matches('button')) el.tabIndex = -1;
  }
  el?.focus();
}
document.getElementById('filterSpread').addEventListener('change', (e) => {
  historyFilters.spread = e.target.value;
  renderHistory();
});
document.getElementById('filterTag').addEventListener('change', (e) => {
  historyFilters.tag = e.target.value;
  renderHistory();
});
document.getElementById('filterFavorite').addEventListener('click', () => {
  historyFilters.favorite = !historyFilters.favorite;
  document.getElementById('filterFavorite').setAttribute('aria-pressed', historyFilters.favorite);
  renderHistory();
});
export function viewReading(id) {
  const reading = readingHistory.find(r => r.id === id);
  if (!reading) return;
  // 還在選牌或等待中的那一次作廢，免得稍後蓋掉這筆紀錄
  cancelPendingReading();
  setLastReadingData(reading);
  renderResults(reading);
  // 切到占卜分頁時會依結果區更新網址（seed、牌陣、問題）
  switchTab('reading');
  focusResults();
}
export function toggleFavorite(id) {
  const reading = readingHistory.find(r => r.id === id);
  if (!reading) return;
  const before = shownHistoryIds();
  reading.favorite = !reading.favorite;
  renderHistory();
  refocusHistory(id, 'toggleFavorite', before);
  if (saveHistory()) showToast(t(reading.favorite ? 'toast.favorited' : 'toast.unfavorited'));
}
export async function deleteReading(id) {
  const ok = await openConfirm({
    title: t('confirm.delete.title'),
    message: t('confirm.delete.message'),
    confirmText: t('confirm.delete.ok'),
    danger: true
  });
  if (!ok) return;
  const before = shownHistoryIds();
  setReadingHistory(readingHistory.filter(r => r.id !== id));
  renderHistory();
  refocusHistory(id, 'viewReading', before);
  if (saveHistory()) showToast(t('toast.deleted'));
}
const NOTE_MAX = 2000;
const TAG_MAX = 20;
const noteTextEl = document.getElementById('noteText');
const customTagEl = document.getElementById('customTag');
noteTextEl.maxLength = NOTE_MAX;
customTagEl.maxLength = TAG_MAX;
// 筆記視窗打開時焦點直接進文字框
document.getElementById('noteModal').dataset.autofocus = '#noteText';
export function openNoteModal(id) {
  currentEditingId = id;
  const reading = readingHistory.find(r => r.id === id);
  noteTextEl.value = reading?.note || '';
  document.getElementById('noteModal').classList.add('show');
}
export function closeNoteModal() {
  document.getElementById('noteModal').classList.remove('show');
  currentEditingId = null;
}
// 視窗關閉後焦點回到原本那一筆的按鈕（清單重畫過，由 main.js 依 data-action／data-id 找回）
export function saveNote() {
  const reading = readingHistory.find(r => r.id === currentEditingId);
  if (!reading) return;
  reading.note = noteTextEl.value.slice(0, NOTE_MAX);
  closeNoteModal();
  renderHistory();
  if (saveHistory()) showToast(t('toast.noteSaved'));
}
let tagDraft = null;
// 常用標籤之外，這筆紀錄已有的自訂標籤也列出來才能取消；取消勾選後仍留在清單上，可以再勾回來
let tagChoices = [];
export function openTagModal(id) {
  currentEditingId = id;
  const reading = readingHistory.find(r => r.id === id);
  tagDraft = Array.isArray(reading?.tags) ? reading.tags.slice() : [];
  tagChoices = [...commonTags, ...tagDraft.filter(tag => !commonTags.includes(tag))];
  renderTagChoices();
  document.getElementById('tagModal').classList.add('show');
}
function renderTagChoices(focusTag = null) {
  const box = document.getElementById('commonTags');
  const all = tagChoices;
  const rovingTag = focusTag !== null && all.includes(focusTag) ? focusTag : all[0];
  box.innerHTML = all.map(tag => {
    const on = !!tagDraft?.includes(tag);
    return `<span class="tag${on ? ' active' : ''}" role="button" tabindex="${tag === rovingTag ? 0 : -1}" data-keynav-item
aria-pressed="${on}" data-action="toggleTagSelection" data-tag="${escapeHTML(tag)}">${escapeHTML(tag)}</span>`;
  }).join('');
  if (focusTag !== null) {
    const el = Array.from(box.querySelectorAll('.tag')).find(x => x.dataset.tag === focusTag);
    el?.focus();
  }
}
export function closeTagModal() {
  document.getElementById('tagModal').classList.remove('show');
  customTagEl.value = '';
  currentEditingId = null;
  tagDraft = null;
}
export function toggleTagSelection(tag) {
  if (!tagDraft) return;
  const index = tagDraft.indexOf(tag);
  if (index > -1) {
    tagDraft.splice(index, 1);
  } else {
    tagDraft.push(tag);
  }
  renderTagChoices(tag);
}
export function saveTag() {
  const reading = readingHistory.find(r => r.id === currentEditingId);
  if (!reading || !tagDraft) {
    closeTagModal();
    return;
  }
  const customTag = customTagEl.value.trim().slice(0, TAG_MAX);
  if (customTag && !tagDraft.includes(customTag)) {
    tagDraft.push(customTag);
  }
  reading.tags = tagDraft;
  closeTagModal();
  renderHistory();
  if (saveHistory()) showToast(t('toast.tagUpdated'));
}
customTagEl.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter' || e.isComposing) return;
  e.preventDefault();
  saveTag();
});
document.getElementById('clearHistory').addEventListener('click', async () => {
  const count = readingHistory.length;
  if (!count) {
    showToast(t('toast.historyEmpty'), 'warning');
    return;
  }
  const ok = await openConfirm({
    title: t('confirm.clearHistory.title'),
    message: t('confirm.clearHistory.message', { n: count }),
    confirmText: t('confirm.clearHistory.ok'),
    danger: true
  });
  if (!ok) return;
  setReadingHistory([]);
  renderHistory();
  refocusHistory(null, 'viewReading');
  if (saveHistory()) showToast(t('toast.historyCleared'));
});
