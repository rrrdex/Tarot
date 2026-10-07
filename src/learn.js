import { t } from './i18n.js';
import { cryptoRandom, escapeHTML, keywordList, openConfirm, showToast, shuffle } from './utils.js';
import { fullTarotCards, suitNames } from './data.js';
import { cardMeaningText, cardMeanings } from './meanings.js';
import { loadLore, loadedLore } from './lazy.js';
import { cardThumb, visualStyle } from './render.js';

export const LEARN_PROGRESS_KEY = 'learnProgress';
export const LEARN_STREAK_KEY = 'learnStreak';
const LEARN_MODE_KEY = 'learnMode';
const LEARN_SCOPE_KEY = 'learnScope';
const LEARN_MASTERED_AT = 4;
const LEARN_MAX_LEVEL = 5;
const LEARN_QUIZ_TOTAL = 10;
const LEARN_QUIZ_OPTIONS = 4;
export const LEARN_SCOPES = ['all', 'Major Arcana', 'Wands', 'Cups', 'Swords', 'Pentacles'];
function learnClampLevel(v) {
  const n = Number(v);
  if (!Number.isFinite(n)) return 0;
  return Math.min(LEARN_MAX_LEVEL, Math.max(0, Math.round(n)));
}
function learnClampCount(v) {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : 0;
}
export function loadLearnProgress() {
  try {
    const parsed = JSON.parse(localStorage.getItem(LEARN_PROGRESS_KEY) || '{}');
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};
    const out = {};
    Object.keys(parsed).forEach(k => {
      const e = parsed[k];
      if (!e || typeof e !== 'object' || Array.isArray(e)) return;
      out[k] = {
        level: learnClampLevel(e.level),
        seen: learnClampCount(e.seen),
        correct: learnClampCount(e.correct),
        wrong: learnClampCount(e.wrong)
      };
    });
    return out;
  } catch {
    return {};
  }
}
export function loadLearnStreak() {
  try {
    const parsed = JSON.parse(localStorage.getItem(LEARN_STREAK_KEY) || 'null');
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return { last: '', days: 0, best: 0 };
    const days = learnClampCount(parsed.days);
    return {
      last: typeof parsed.last === 'string' ? parsed.last : '',
      days,
      best: Math.max(learnClampCount(parsed.best), days)
    };
  } catch {
    return { last: '', days: 0, best: 0 };
  }
}
function saveLearnProgress() {
  try {
    localStorage.setItem(LEARN_PROGRESS_KEY, JSON.stringify(learnProgress));
  } catch {}
}
function saveLearnStreak() {
  try {
    localStorage.setItem(LEARN_STREAK_KEY, JSON.stringify(learnStreak));
  } catch {}
}
export let learnProgress = loadLearnProgress();
export let learnStreak = loadLearnStreak();
let learnMode = localStorage.getItem(LEARN_MODE_KEY) || 'flash';
if (learnMode !== 'flash' && learnMode !== 'quiz') learnMode = 'flash';
let learnScope = localStorage.getItem(LEARN_SCOPE_KEY) || 'all';
if (!LEARN_SCOPES.includes(learnScope)) learnScope = 'all';
export function setLearnProgress(v) {
  learnProgress = v;
}
export function setLearnStreak(v) {
  learnStreak = v;
}
export function reloadLearnPrefs() {
  learnMode = localStorage.getItem(LEARN_MODE_KEY) || 'flash';
  learnScope = localStorage.getItem(LEARN_SCOPE_KEY) || 'all';
}
let learnCurrentCard = null;
let learnFlipped = false;
let learnSeenCount = 0;
let learnQuiz = null;
function learnDateKey(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
function learnYesterdayKey() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return learnDateKey(d);
}
function touchLearnStreak() {
  const today = learnDateKey();
  if (learnStreak.last === today) {
    if (learnStreak.days < 1) learnStreak.days = 1;
  } else {
    learnStreak.days = learnStreak.last === learnYesterdayKey() ? learnStreak.days + 1 : 1;
    learnStreak.last = today;
  }
  learnStreak.best = Math.max(learnStreak.best, learnStreak.days);
  saveLearnStreak();
}
function learnLevelOf(nameKey) {
  const e = learnProgress[nameKey];
  return e ? e.level : 0;
}
function learnEntryOf(nameKey) {
  if (!learnProgress[nameKey]) learnProgress[nameKey] = { level: 0, seen: 0, correct: 0, wrong: 0 };
  return learnProgress[nameKey];
}
function learnRecord(nameKey, ok) {
  const e = learnEntryOf(nameKey);
  e.seen += 1;
  if (ok) {
    e.correct += 1;
    e.level = Math.min(LEARN_MAX_LEVEL, e.level + 1);
  } else {
    e.wrong += 1;
    e.level = Math.max(0, e.level - 1);
  }
  saveLearnProgress();
  touchLearnStreak();
}
function getLearnPool() {
  const base = learnScope === 'all' ? fullTarotCards : fullTarotCards.filter(c => c.suit === learnScope);
  return base.filter(c => cardMeanings[c.nameKey]);
}
function pickLearnCard(pool, excludeNameKey) {
  if (!pool || !pool.length) return null;
  let candidates = pool;
  if (pool.length > 1 && excludeNameKey) {
    const filtered = pool.filter(c => c.nameKey !== excludeNameKey);
    if (filtered.length) candidates = filtered;
  }
  const weights = candidates.map(c => (LEARN_MAX_LEVEL + 1) - learnLevelOf(c.nameKey));
  const total = weights.reduce((a, b) => a + b, 0);
  let r = cryptoRandom() * total;
  for (let i = 0; i < candidates.length; i++) {
    r -= weights[i];
    if (r < 0) return candidates[i];
  }
  return candidates[candidates.length - 1];
}
function learnStreakAlive() {
  return learnStreak.days >= 1 &&
  (learnStreak.last === learnDateKey() || learnStreak.last === learnYesterdayKey());
}
function renderLearnStreak() {
  const el = document.getElementById('learnStreak');
  if (!el) return;
  const best = learnStreak.best >= 1 ? t('learn.streak.best', { n: learnStreak.best }) : t('learn.streak.none');
  if (learnStreakAlive()) {
    const doneToday = learnStreak.last === learnDateKey();
    el.textContent = t('learn.streak.days', { n: learnStreak.days });
    el.title = doneToday ? best : t('learn.streak.continue', { best });
  } else {
    el.textContent = t('learn.streak.idle');
    el.title = best;
  }
}
function renderLearnMastery() {
  const countEl = document.getElementById('learnMasteryCount');
  if (countEl) {
    const mastered = fullTarotCards.filter(c => learnLevelOf(c.nameKey) >= LEARN_MASTERED_AT).length;
    countEl.textContent = t('learn.mastery.count', { n: mastered, total: fullTarotCards.length });
  }
  const grid = document.getElementById('learnMasteryGrid');
  if (!grid) return;
  grid.innerHTML = fullTarotCards.map((c, i) => {
    const lv = learnLevelOf(c.nameKey);
    const label = t('learn.mastery.cell', { name: c.name, lv, max: LEARN_MAX_LEVEL });
    return `<button class="mastery-cell" data-level="${lv}" tabindex="${i === 0 ? 0 : -1}" data-keynav-item aria-label="${escapeHTML(label)}" data-action="openCardModal" data-card="${c.nameKey}"></button>`;
  }).join('');
}
function renderLearnFlash() {
  const stage = document.getElementById('learnStage');
  if (!stage) return;
  const pool = getLearnPool();
  if (!pool.length) {
    stage.innerHTML = `<div class="learn-empty">${escapeHTML(t('learn.empty.noMeaning'))}</div>`;
    return;
  }
  if (!learnCurrentCard || !pool.some(c => c.nameKey === learnCurrentCard.nameKey)) {
    learnCurrentCard = pickLearnCard(pool, null);
    learnFlipped = false;
  }
  const card = learnCurrentCard;
  const m = cardMeanings[card.nameKey];
  const flashArt = cardThumb(card);
  const sub = t('card.sub', {
    en: card.englishName,
    suit: t(suitNames[card.suit] || card.suit),
    number: card.number
  });
  const face = learnFlipped ? `
<div class="flash-back">
<div class="flash-name">${escapeHTML(card.name)}</div>
<div class="flash-sub">${escapeHTML(sub)}</div>
<div class="tags">${m.keywords.map(k => `<span class="tag">${escapeHTML(k)}</span>`).join('')}</div>
<div class="meaning-block">
<div class="meaning-title">${escapeHTML(t('orientation.upright'))}</div>
<p class="meaning-text">${escapeHTML(cardMeaningText(card, 'upright'))}</p>
</div>
<div class="meaning-block">
<div class="meaning-title">${escapeHTML(t('orientation.reversed'))}</div>
<p class="meaning-text">${escapeHTML(cardMeaningText(card, 'reversed'))}</p>
</div>
</div>
` : `
<div class="flash-front">
${flashArt ? `<div class="flash-art" data-suit="${card.suit}">${flashArt}</div>` : ''}
<div class="flash-name">${escapeHTML(card.name)}</div>
<div class="flash-sub">${escapeHTML(sub)}</div>
<div class="flash-hint">${escapeHTML(t('learn.flash.hint'))}</div>
</div>
`;
// .flashcard 不可加 aria-label：會蓋掉卡面內文（牌名、英文名、花色），讀屏只剩標籤；
// 「點一下看牌義」已是 .flash-hint 的內文，會一起唸到
  stage.innerHTML = `
<div class="flashcard${learnFlipped ? ' flipped' : ''}" id="flashcard"${learnFlipped ? '' : ' role="button" tabindex="0"'}>
${face}
</div>
${learnFlipped ? `
<div class="flash-actions">
<button class="btn btn-tertiary" id="flashHard">${escapeHTML(t('learn.flash.hard'))}</button>
<button class="btn btn-primary" id="flashEasy">${escapeHTML(t('learn.flash.easy'))}</button>
</div>
` : ''}
<div class="flash-progress">${escapeHTML(t('learn.flash.progress', { n: learnSeenCount }))}</div>
`;
  const cardEl = document.getElementById('flashcard');
  if (cardEl && !learnFlipped) {
    cardEl.addEventListener('click', learnFlip);
    cardEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        learnFlip();
      }
    });
  }
  const hardBtn = document.getElementById('flashHard');
  if (hardBtn) hardBtn.addEventListener('click', () => learnRate(false));
  const easyBtn = document.getElementById('flashEasy');
  if (easyBtn) easyBtn.addEventListener('click', () => learnRate(true));
}
function learnFlip() {
  if (learnFlipped) return;
  learnFlipped = true;
  renderLearnFlash();
}
function learnRate(ok) {
  if (!learnCurrentCard) return;
  learnRecord(learnCurrentCard.nameKey, ok);
  learnSeenCount += 1;
  learnCurrentCard = pickLearnCard(getLearnPool(), learnCurrentCard.nameKey);
  learnFlipped = false;
  renderLearnFlash();
  renderLearnMastery();
  renderLearnStreak();
}
function learnCandidates(target, pool) {
  const inPool = pool.filter(c => c.nameKey !== target.nameKey);
  const extra = fullTarotCards.filter(c =>
    cardMeanings[c.nameKey] &&
    c.nameKey !== target.nameKey &&
    !inPool.some(p => p.nameKey === c.nameKey)
  );
  return shuffle(inPool).concat(shuffle(extra));
}
function buildLearnQuestion(target, pool, type) {
  const m = cardMeanings[target.nameKey];
  if (!m) return null;
  const candidates = learnCandidates(target, pool);
  const options = [];
  let art = null;
  if (type === 'C') {
    art = cardThumb(target, '', 132);
    if (!art) type = 'A';
  }
  if (type === 'A') {
    options.push({ text: target.name, correct: true });
    for (const c of candidates) {
      if (options.length >= LEARN_QUIZ_OPTIONS) break;
      if (options.some(o => o.text === c.name)) continue;
      options.push({ text: c.name, correct: false });
    }
    return {
      type: 'A',
      nameKey: target.nameKey,
      prompt: t('learn.quiz.promptKeywords'),
      subject: m.keywords.join('・'),
      options: shuffle(options),
      answered: false,
      chosen: -1,
      correct: false
    };
  }
  options.push({ text: m.keywords.join('・'), correct: true });
  for (const c of candidates) {
    if (options.length >= LEARN_QUIZ_OPTIONS) break;
    const cm = cardMeanings[c.nameKey];
    if (!cm) continue;
    const text = cm.keywords.join('・');
    if (options.some(o => o.text === text)) continue;
    options.push({ text, correct: false });
  }
  if (type === 'C') {
    const lore = loadedLore()?.cardLore[target.nameKey];
    const desc = [
      lore && lore.symbolism ? lore.symbolism : '',
      visualStyle === 'api' ? target.englishName : ''
    ].filter(Boolean).join('　');
    return {
      type: 'C',
      nameKey: target.nameKey,
      prompt: t('learn.quiz.promptArt'),
      subject: '',
      art: `<div class="quiz-art" data-suit="${target.suit}"${desc ? ` role="img" aria-label="${escapeHTML(desc)}"` : ''}>${art}</div>`,
      options: shuffle(options),
      answered: false,
      chosen: -1,
      correct: false
    };
  }
  return {
    type: 'B',
    nameKey: target.nameKey,
    prompt: t('learn.quiz.promptCard', { name: target.name }),
    subject: '',
    options: shuffle(options),
    answered: false,
    chosen: -1,
    correct: false
  };
}
function buildLearnQuiz() {
  const pool = getLearnPool();
  if (pool.length < LEARN_QUIZ_OPTIONS) return null;
  const targets = [];
  while (targets.length < LEARN_QUIZ_TOTAL) {
    const remaining = pool.filter(c => !targets.some(t => t.nameKey === c.nameKey));
    if (!remaining.length) break;
    const pick = pickLearnCard(remaining, null);
    if (!pick) break;
    targets.push(pick);
  }
  if (!targets.length) return null;
  const nB = Math.floor(targets.length / 3);
  const nC = Math.floor(targets.length / 3);
  const typePool = [];
  for (let i = 0; i < targets.length; i++) {
    typePool.push(i < nC ? 'C' : (i < nC + nB ? 'B' : 'A'));
  }
  const types = shuffle(typePool);
  const questions = targets
  .map((t, i) => buildLearnQuestion(t, pool, types[i]))
  .filter(Boolean);
  if (!questions.length) return null;
  return { questions, index: 0, correctCount: 0, wrongKeys: [], finished: false };
}
function renderLearnQuiz() {
  const stage = document.getElementById('learnStage');
  if (!stage) return;
  if (getLearnPool().length < LEARN_QUIZ_OPTIONS) {
    stage.innerHTML = `<div class="learn-empty">${escapeHTML(t('learn.empty.tooFew'))}</div>`;
    return;
  }
  if (!learnQuiz) learnQuiz = buildLearnQuiz();
  if (!learnQuiz) {
    stage.innerHTML = `<div class="learn-empty">${escapeHTML(t('learn.empty.tooFew'))}</div>`;
    return;
  }
  if (learnQuiz.finished) {
    renderLearnQuizResult();
    return;
  }
  const total = learnQuiz.questions.length;
  const q = learnQuiz.questions[learnQuiz.index];
  const isLast = learnQuiz.index >= total - 1;
  stage.innerHTML = `
<div class="quiz-progress">${escapeHTML(t('learn.quiz.progress', { n: learnQuiz.index + 1, total }))}</div>
<div class="quiz-card">
<div class="quiz-prompt">${escapeHTML(q.prompt)}</div>
${q.subject ? `<div class="quiz-subject">${keywordList(q.subject.split('・'))}</div>` : ''}
${q.art || ''}
<div class="quiz-options" data-keynav="grid">
${q.options.map((o, i) => {
      let cls = 'quiz-option';
      if (q.answered) {
        if (o.correct) cls += ' correct';
        else if (i === q.chosen) cls += ' wrong';
      }
      return `<button class="${cls}" data-i="${i}" tabindex="${i === 0 ? 0 : -1}" data-keynav-item${q.answered ? ' disabled' : ''}>${keywordList(o.text.split('・'))}</button>`;
    }).join('')}
</div>
</div>
${q.answered ? `
<div class="quiz-actions">
<button class="btn btn-primary btn-sm" id="quizNext">${escapeHTML(t(isLast ? 'learn.quiz.toResult' : 'learn.quiz.next'))}</button>
</div>
` : ''}
`;
  const optionsWrap = stage.querySelector('.quiz-options');
  if (optionsWrap && !q.answered) {
    optionsWrap.addEventListener('click', (e) => {
      const btn = e.target.closest('.quiz-option');
      if (!btn || !optionsWrap.contains(btn)) return;
      learnAnswer(Number(btn.dataset.i));
    });
  }
  const nextBtn = document.getElementById('quizNext');
  if (nextBtn) nextBtn.addEventListener('click', learnQuizNext);
}
function learnAnswer(i) {
  if (!learnQuiz) return;
  const q = learnQuiz.questions[learnQuiz.index];
  if (!q || q.answered || !q.options[i]) return;
  q.answered = true;
  q.chosen = i;
  q.correct = !!q.options[i].correct;
  if (q.correct) learnQuiz.correctCount += 1;
  else if (!learnQuiz.wrongKeys.includes(q.nameKey)) learnQuiz.wrongKeys.push(q.nameKey);
  learnRecord(q.nameKey, q.correct);
  renderLearnQuiz();
  renderLearnStreak();
}
function learnQuizNext() {
  if (!learnQuiz) return;
  if (learnQuiz.index >= learnQuiz.questions.length - 1) {
    learnQuiz.finished = true;
    renderLearnQuiz();
    renderLearnMastery();
  } else {
    learnQuiz.index += 1;
    renderLearnQuiz();
  }
}
function renderLearnQuizResult() {
  const stage = document.getElementById('learnStage');
  if (!stage || !learnQuiz) return;
  const total = learnQuiz.questions.length;
  const correct = learnQuiz.correctCount;
  const pct = total ? Math.round((correct / total) * 100) : 0;
  const wrongItems = learnQuiz.wrongKeys
  .map(k => fullTarotCards.find(c => c.nameKey === k))
  .filter(Boolean);
  stage.innerHTML = `
<div class="quiz-result">
<div class="quiz-result-score">${escapeHTML(t('learn.quiz.score', { n: correct, total }))}</div>
<div class="quiz-result-rate">${escapeHTML(t('learn.quiz.rate', { pct }))}</div>
${wrongItems.length ? `
<div class="quiz-result-wrong">
<div class="quiz-result-wrong-title">${escapeHTML(t('learn.quiz.reviewTitle'))}</div>
<div class="tags" data-keynav="grid">
${wrongItems.map((c, i) => `<span class="tag" role="button" tabindex="${i === 0 ? 0 : -1}" data-keynav-item data-action="openCardModal" data-card="${c.nameKey}" data-orientation="upright">${escapeHTML(c.name)}</span>`).join('')}
</div>
</div>
` : `<div class="quiz-result-perfect">${escapeHTML(t('learn.quiz.perfect'))}</div>`}
<div class="btn-group quiz-result-actions">
<button class="btn btn-primary btn-sm" id="quizAgain">${escapeHTML(t('learn.quiz.again'))}</button>
<button class="btn btn-tertiary btn-sm" id="quizToFlash">${escapeHTML(t('learn.quiz.toFlash'))}</button>
</div>
</div>
`;
  const againBtn = document.getElementById('quizAgain');
  if (againBtn) {
    againBtn.addEventListener('click', () => {
      learnQuiz = null;
      renderLearnQuiz();
    });
  }
  const toFlashBtn = document.getElementById('quizToFlash');
  if (toFlashBtn) toFlashBtn.addEventListener('click', () => setLearnMode('flash'));
}
export function syncLearnSeg() {
  document.querySelectorAll('#learnModeSeg .seg-item').forEach(b => {
    const on = b.dataset.mode === learnMode;
    b.classList.toggle('active', on);
    b.setAttribute('aria-selected', on);
    b.tabIndex = on ? 0 : -1;
  });
}
export function renderLearnStage() {
  // 看圖題的讀屏說明要用到牌面象徵，先確保資料到位
  if (!loadedLore()) {
    loadLore().then(renderLearnStage);
    return;
  }
  if (learnMode === 'quiz') renderLearnQuiz();
  else renderLearnFlash();
}
function setLearnMode(mode) {
  if (mode !== 'flash' && mode !== 'quiz') return;
  learnMode = mode;
  try { localStorage.setItem(LEARN_MODE_KEY, mode); } catch {}
  syncLearnSeg();
  renderLearnStage();
}
export function renderLearn() {
  syncLearnSeg();
  renderLearnStreak();
  renderLearnStage();
  renderLearnMastery();
}
const learnModeSegEl = document.getElementById('learnModeSeg');
if (learnModeSegEl) {
  learnModeSegEl.addEventListener('click', (e) => {
    const btn = e.target.closest('.seg-item');
    if (!btn || !learnModeSegEl.contains(btn)) return;
    if (btn.dataset.mode === learnMode) return;
    setLearnMode(btn.dataset.mode);
  });
}
const learnScopeEl = document.getElementById('learnScope');
if (learnScopeEl) {
  learnScopeEl.value = learnScope;
  learnScopeEl.addEventListener('change', () => {
    learnScope = LEARN_SCOPES.includes(learnScopeEl.value) ? learnScopeEl.value : 'all';
    try { localStorage.setItem(LEARN_SCOPE_KEY, learnScope); } catch {}
    learnCurrentCard = null;
    learnFlipped = false;
    learnSeenCount = 0;
    learnQuiz = null;
    renderLearnStage();
    renderLearnMastery();
  });
}
const learnResetBtn = document.getElementById('learnReset');
if (learnResetBtn) {
  learnResetBtn.addEventListener('click', async () => {
    const ok = await openConfirm({
      title: t('confirm.learnReset.title'),
      message: t('confirm.learnReset.message'),
      confirmText: t('confirm.learnReset.ok'),
      danger: true
    });
    if (!ok) return;
    try {
      localStorage.removeItem(LEARN_PROGRESS_KEY);
      localStorage.removeItem(LEARN_STREAK_KEY);
    } catch {}
    learnProgress = {};
    learnStreak = { last: '', days: 0, best: 0 };
    learnCurrentCard = null;
    learnFlipped = false;
    learnSeenCount = 0;
    learnQuiz = null;
    renderLearn();
    showToast(t('toast.learnReset'));
  });
}
