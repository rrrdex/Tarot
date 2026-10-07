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
import { renderResults } from './reading.js';
import { switchTab } from './main.js';

let currentEditingId = null;
export function renderHistory() {
  const list = document.getElementById('historyList');
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
  list.innerHTML = filtered.map(item => `
<div class="history-item ${item.favorite ? 'favorite' : ''}" data-id="${item.id}">
<div class="history-header">
<span class="history-spread">${escapeHTML(t(item.spreadName))}</span>
<span class="history-time">${formatDate(item.timestamp)}</span>
</div>
${item.question ? `<div class="history-question">${escapeHTML(item.question)}</div>` : ''}
${item.tags?.length ? `<div class="tags">${item.tags.map(t => `<span class="tag">${escapeHTML(t)}</span>`).join('')}</div>` : ''}
<div class="history-actions">
<button class="btn btn-tertiary btn-sm" data-action="viewReading" data-id="${item.id}">${escapeHTML(t('btn.view'))}</button>
<button class="btn btn-tertiary btn-sm" data-action="toggleFavorite" data-id="${item.id}">${escapeHTML(t(item.favorite ? 'history.item.unfavorite' : 'history.item.favorite'))}</button>
<button class="btn btn-tertiary btn-sm" data-action="openNoteModal" data-id="${item.id}">${escapeHTML(t('btn.note'))}</button>
<button class="btn btn-tertiary btn-sm" data-action="openTagModal" data-id="${item.id}">${escapeHTML(t('btn.tag'))}</button>
<button class="btn btn-tertiary btn-sm" data-action="deleteReading" data-id="${item.id}">${escapeHTML(t('btn.delete'))}</button>
</div>
</div>
`).join('');
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
  document.getElementById('filterFavorite').style.background = historyFilters.favorite ? 'var(--accent)' : '';
  document.getElementById('filterFavorite').style.color = historyFilters.favorite ? 'var(--accent-contrast)' : '';
  renderHistory();
});
export function viewReading(id) {
  const reading = readingHistory.find(r => r.id === id);
  if (reading) {
    setLastReadingData(reading);
    renderResults(reading);
    switchTab('reading');
  }
}
export function toggleFavorite(id) {
  const reading = readingHistory.find(r => r.id === id);
  if (reading) {
    reading.favorite = !reading.favorite;
    saveHistory();
    renderHistory();
    showToast(t(reading.favorite ? 'toast.favorited' : 'toast.unfavorited'));
  }
}
export async function deleteReading(id) {
  const ok = await openConfirm({
    title: t('confirm.delete.title'),
    message: t('confirm.delete.message'),
    confirmText: t('confirm.delete.ok'),
    danger: true
  });
  if (!ok) return;
  setReadingHistory(readingHistory.filter(r => r.id !== id));
  saveHistory();
  renderHistory();
  showToast(t('toast.deleted'));
}
export function openNoteModal(id) {
  currentEditingId = id;
  const reading = readingHistory.find(r => r.id === id);
  document.getElementById('noteText').value = reading?.note || '';
  document.getElementById('noteModal').classList.add('show');
}
export function closeNoteModal() {
  document.getElementById('noteModal').classList.remove('show');
  currentEditingId = null;
}
export function saveNote() {
  const reading = readingHistory.find(r => r.id === currentEditingId);
  if (reading) {
    reading.note = document.getElementById('noteText').value;
    saveHistory();
    closeNoteModal();
    renderHistory();
    showToast(t('toast.noteSaved'));
  }
}
let tagDraft = null;
export function openTagModal(id) {
  currentEditingId = id;
  const reading = readingHistory.find(r => r.id === id);
  tagDraft = Array.isArray(reading?.tags) ? reading.tags.slice() : [];
  renderCommonTags();
  document.getElementById('tagModal').classList.add('show');
}
function renderCommonTags() {
  document.getElementById('commonTags').innerHTML = commonTags.map((tag, i) => {
    const active = tagDraft?.includes(tag) ? 'active' : '';
    return `<span class="tag ${active}" role="button" tabindex="${i === 0 ? 0 : -1}" data-keynav-item
aria-pressed="${!!tagDraft?.includes(tag)}" data-action="toggleTagSelection" data-tag="${tag}">${tag}</span>`;
  }).join('');
}
export function closeTagModal() {
  document.getElementById('tagModal').classList.remove('show');
  document.getElementById('customTag').value = '';
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
  renderCommonTags();
}
export function saveTag() {
  const reading = readingHistory.find(r => r.id === currentEditingId);
  if (!reading || !tagDraft) {
    closeTagModal();
    return;
  }
  const customTag = document.getElementById('customTag').value.trim();
  if (customTag && !tagDraft.includes(customTag)) {
    tagDraft.push(customTag);
  }
  reading.tags = tagDraft;
  saveHistory();
  closeTagModal();
  renderHistory();
  showToast(t('toast.tagUpdated'));
}
document.getElementById('clearHistory').addEventListener('click', async () => {
  const count = readingHistory.length;
  const ok = await openConfirm({
    title: t('confirm.clearHistory.title'),
    message: t('confirm.clearHistory.message', { n: count }),
    confirmText: t('confirm.clearHistory.ok'),
    danger: true
  });
  if (!ok) return;
  setReadingHistory([]);
  saveHistory();
  renderHistory();
  showToast(t('toast.historyCleared'));
});
