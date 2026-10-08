import { t } from './i18n.js';
import {
  escapeHTML,
  formatDate,
  isValidSeed,
  newSeed,
  randomInt,
  readNeonSuitColors,
  seedRng,
  showToast,
  shuffle,
  updateURL
} from './utils.js';
import {
  courtCards,
  fullTarotCards,
  getCardImageUrl,
  majorArcana,
  minorArcana,
  numberedCards,
  orientationNames,
  spreadLayouts,
  spreads,
  suitNames
} from './data.js';
import {
  lastReadingData,
  readingHistory,
  saveHistory,
  setLastReadingData,
  setReadingHistory
} from './state.js';
import { readBtn, readBtnText, resultsEl, spreadTypeEl } from './dom.js';
import { LAYOUT_IMG_SIZES, renderCard, visualStyle } from './render.js';
import { getCardArtImage } from './deck.js';
import { generateInsight } from './insight.js';

function getDeck(deckType) {
  switch (deckType) {
    case 'major': return [...majorArcana];
    case 'minor': return [...minorArcana];
    case 'court': return [...courtCards];
    case 'numbered': return [...numberedCards];
    default: return [...fullTarotCards];
  }
}
let pendingReading = null;
function buildReadingConfig(seedOverride, save) {
  const deckType = document.getElementById('deckType').value;
  const spreadType = spreadTypeEl.value;
  const spreadName = spreadTypeEl.options[spreadTypeEl.selectedIndex].dataset.spreadName;
  const question = document.getElementById('question').value.trim();
  const deck = getDeck(deckType);
  const seed = isValidSeed(seedOverride) ? String(seedOverride) : newSeed();
  const rng = seedRng(seed);
  const shuffled = shuffle(deck, rng);
  const orientations = shuffled.map(() => rng() > 0.5 ? 'upright' : 'reversed');
  const spread = spreads[spreadType];
  return { seed, deckType, spreadType, spreadName, question, shuffled, orientations, positions: spread.positions, save };
}
export function performReading(seedOverride, save = true, picks = null) {
  const cfg = buildReadingConfig(seedOverride, save);
  const num = cfg.positions.length;
  if (cfg.shuffled.length < num + 1) {
    showToast(t('toast.deckTooSmall'), 'error');
    return;
  }
  const firstN = () => Array.from({ length: num }, (_, i) => i);
  if (picks === 'first') {
    completeReading(cfg, firstN());
    return;
  }
  if (Array.isArray(picks)) {
    const max = cfg.shuffled.length - 2;
    const clean = [...new Set(picks.filter(n => Number.isInteger(n) && n >= 0 && n <= max))].slice(0, num);
    completeReading(cfg, clean.length === num ? clean : firstN());
    return;
  }
  const interactive = localStorage.getItem('interactiveDraw') !== 'false';
  if (!interactive) {
    readBtn.disabled = true;
    readBtnText.innerHTML = '<span class="spinner"></span>';
    setTimeout(() => completeReading(cfg, firstN(), true), 500);
    return;
  }
  renderCardSelection(cfg);
}
function renderCardSelection(cfg) {
  pendingReading = { ...cfg, picks: [] };
  const num = cfg.positions.length;
  const pickable = cfg.shuffled.length - 1;
  resultsEl.innerHTML = `
<div class="panel fade-in">
<div class="pick-header">
<h2 class="results-title">${escapeHTML(t('pick.title'))}</h2>
<p class="pick-hint">${escapeHTML(t(cfg.spreadName))} · ${t('pick.hint', { n: num })}</p>
<div class="pick-progress" id="pickProgress">${escapeHTML(t('pick.progress', { n: 0, total: num }))}</div>
</div>
<div class="pick-grid" id="pickGrid" data-keynav="grid">
${Array.from({ length: pickable }, (_, i) => `
<button class="pick-card" data-idx="${i}" tabindex="${i === 0 ? 0 : -1}" data-keynav-item aria-label="${escapeHTML(t('pick.cardBack', { n: i + 1 }))}"></button>
`).join('')}
</div>
<div class="btn-group">
<button class="btn btn-tertiary" id="pickRandom">${escapeHTML(t('pick.random'))}</button>
<button class="btn btn-tertiary" id="pickReshuffle">${escapeHTML(t('pick.reshuffle'))}</button>
<button class="btn btn-tertiary" id="pickCancel">${escapeHTML(t('btn.cancel'))}</button>
</div>
</div>
`;
  const grid = document.getElementById('pickGrid');
  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('.pick-card');
    if (!btn || btn.disabled || !pendingReading) return;
    selectPick(Number(btn.dataset.idx), btn);
  });
  document.getElementById('pickRandom').addEventListener('click', () => {
    if (!pendingReading) return;
    const remaining = [];
    for (let i = 0; i < pickable; i++) {
      if (!pendingReading.picks.includes(i)) remaining.push(i);
    }
    while (pendingReading && pendingReading.picks.length < num && remaining.length) {
      const j = randomInt(remaining.length);
      const idx = remaining.splice(j, 1)[0];
      selectPick(idx, grid.querySelector(`.pick-card[data-idx="${idx}"]`));
    }
  });
  document.getElementById('pickReshuffle').addEventListener('click', () => {
    performReading(undefined, cfg.save);
  });
  document.getElementById('pickCancel').addEventListener('click', () => {
    pendingReading = null;
    resultsEl.innerHTML = '';
  });
  requestAnimationFrame(() => {
    resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}
function selectPick(idx, btn) {
  const cfg = pendingReading;
  if (!cfg || cfg.picks.length >= cfg.positions.length) return;
  cfg.picks.push(idx);
  if (btn) {
    btn.classList.add('selected');
    btn.textContent = cfg.picks.length;
    btn.disabled = true;
  }
  const progress = document.getElementById('pickProgress');
  if (progress) progress.textContent = t('pick.progress', { n: cfg.picks.length, total: cfg.positions.length });
  if (cfg.picks.length === cfg.positions.length) {
    pendingReading = null;
    setTimeout(() => completeReading(cfg, cfg.picks, true), 450);
  }
}
function completeReading(cfg, picks, revealed = false) {
  const { seed, deckType, spreadType, spreadName, question, shuffled, orientations, positions, save } = cfg;
  const drawn = picks.map((deckIdx, i) => ({
    ...shuffled[deckIdx],
    position: positions[i],
    orientation: orientations[deckIdx]
  }));
  const bottomIdx = shuffled.length - 1;
  const bottomCard = {
    ...shuffled[bottomIdx],
    position: 'spread.bottom',
    orientation: orientations[bottomIdx]
  };
  setLastReadingData({
    id: Date.now(),
    seed,
    deckType,
    spreadType,
    spreadName,
    question,
    picks,
    drawnCards: drawn,
    bottomCard,
    timestamp: Date.now(),
    favorite: false,
    tags: [],
    note: ''
  });
  if (save) {
    readingHistory.unshift(lastReadingData);
    if (readingHistory.length > 100) setReadingHistory(readingHistory.slice(0, 100));
    saveHistory();
  }
  renderResults(lastReadingData, revealed);
  const isDefaultPicks = picks.every((p, i) => p === i);
  updateURL({ seed, deck: deckType, spread: spreadType, q: question || null, picks: isDefaultPicks ? null : picks.join('-') });
  readBtn.disabled = false;
  readBtnText.textContent = t('btn.startReading');
  requestAnimationFrame(() => {
    resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}
export function renderResults(data, revealed = false) {
  const { spreadName, spreadType, question, drawnCards, bottomCard, favorite, note } = data;
  const anim = revealed ? 'flip-in' : 'slide-in';
  const layout = (spreadLayouts[spreadType] &&
    spreadLayouts[spreadType].cells.length === drawnCards.length) ? spreadLayouts[spreadType] : null;
  const cardsHTML = layout ? `
<div class="spread-layout" style="--cols: ${layout.cols}" data-keynav="grid">
${drawnCards.map((c, i) => {
      const cell = layout.cells[i];
      const gr = cell.rs ? `${cell.r} / span ${cell.rs}` : cell.r;
      return `<div class="spread-cell${cell.rot ? ' rotated' : ''}" style="--gr: ${gr}; --gc: ${cell.c}; --delay: ${i * 70}ms">${renderCard(c, false, anim, i, LAYOUT_IMG_SIZES)}</div>`;
    }).join('')}
</div>
<div class="bottom-card-row" style="--delay: ${drawnCards.length * 70}ms">
${renderCard(bottomCard, true, anim, 0, LAYOUT_IMG_SIZES)}
</div>
` : `
<div class="cards-grid" data-keynav="grid">
${drawnCards.map((c, i) => renderCard(c, false, anim, i)).join('')}
${renderCard(bottomCard, true, anim, drawnCards.length)}
</div>
`;
  const insights = generateInsight(data) || [];
  const insightHTML = insights.length ? `
<div class="insight-panel">
<h3 class="insight-title">${escapeHTML(t('insight.panel.title'))}</h3>
${insights.map(item => `
<div class="insight-item">
<h4 class="insight-tag">${escapeHTML(item.tag)}</h4>
<p class="insight-text">${escapeHTML(item.text)}</p>
</div>
`).join('')}
</div>
` : '';
  resultsEl.innerHTML = `
<div class="panel fade-in">
<div class="results-header">
<h2 class="results-title">${escapeHTML(t('reading.results.title'))}</h2>
<div class="results-meta">
<span class="badge ${favorite ? 'favorite' : ''}">${escapeHTML(t(spreadName))}</span>
${question ? `<span>${escapeHTML(question)}</span>` : ''}
</div>
</div>
${note ? `<div class="card-notes">${escapeHTML(note)}</div>` : ''}
${cardsHTML}
${insightHTML}
<div class="btn-group">
<button class="btn btn-tertiary btn-sm" data-action="copyResults">${escapeHTML(t('btn.copyResults'))}</button>
<button class="btn btn-tertiary btn-sm" data-action="generateShareImage">${escapeHTML(t('btn.shareImage'))}</button>
<button class="btn btn-tertiary btn-sm" data-action="printReading">${escapeHTML(t('btn.print'))}</button>
</div>
</div>
`;
}
export function copyResults() {
  const { spreadName, question, drawnCards, bottomCard } = lastReadingData;
  const url = location.href;
  const text = [
    `${t(spreadName)}${question ? ` - ${question}` : ''}`,
    '---',
    ...drawnCards.map(c => `${t(c.position)}: ${c.name} (${t(orientationNames[c.orientation] || c.orientation)})`),
    `${t('spread.bottom')}: ${bottomCard.name} (${t(orientationNames[bottomCard.orientation] || bottomCard.orientation)})`,
    '',
    url
  ].join('\n');
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(t('toast.copied'));
    }).catch(() => {
      showToast(t('toast.copyFailed'), 'error');
    });
  }
}
function shareImagePalette() {
  const cs = getComputedStyle(document.documentElement);
  const v = (name) => cs.getPropertyValue(name).trim();
  const suit = readNeonSuitColors(Object.keys(suitNames));
  const lit = Object.keys(suit).length > 0;
  return {
    bg: v('--bg'),
    text: v('--text'),
    sub: v('--text-secondary'),
    divider: v('--divider'),
    accent: v('--accent'),
    up: v('--yesno-yes'),
    rev: v('--yesno-no'),
    glow: lit,
    suit: lit ? suit : null
  };
}
function shareGlyph(ctx, suit, x, y, s, color) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  if (suit === 'Wands') {
    ctx.stroke(new Path2D('M0 -26 L0 26 M0 -12 L-9 -21 M0 -4 L9 -13'));
    ctx.beginPath(); ctx.arc(0, -26, 2.5, 0, Math.PI * 2); ctx.fill();
  } else if (suit === 'Cups') {
    ctx.stroke(new Path2D('M-19 -24 L19 -24 C19 -2 8 6 0 6 C-8 6 -19 -2 -19 -24 M0 6 L0 24 M-14 24 L14 24'));
  } else if (suit === 'Swords') {
    ctx.stroke(new Path2D('M0 -28 L0 12 M-4 -19 L0 -28 L4 -19 M-13 12 L13 12 M0 12 L0 23'));
    ctx.beginPath(); ctx.arc(0, 26.5, 3.5, 0, Math.PI * 2); ctx.stroke();
  } else if (suit === 'Pentacles') {
    ctx.beginPath(); ctx.arc(0, 0, 24, 0, Math.PI * 2); ctx.stroke();
    ctx.stroke(new Path2D('M0 -17.6 L10.3 14.2 L-16.7 -5.4 L16.7 -5.4 L-10.3 14.2 Z'));
  } else {
    ctx.fill(new Path2D('M-23 0 a23 23 0 1 0 46 0 a23 23 0 1 0 -46 0 M-10 0 a16 16 0 1 0 32 0 a16 16 0 1 0 -32 0'), 'evenodd');
  }
  ctx.restore();
}
// 分享圖的牌面：線稿模式畫自製牌組，圖片模式畫偉特牌縮圖；文字模式維持只有花色符號
function loadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}
function shareCardFaces(cards) {
  if (visualStyle === 'line') {
    const cs = getComputedStyle(document.documentElement);
    const colors = Object.fromEntries(['paper', 'tint', 'ink', 'gold'].map(k => [k, cs.getPropertyValue(`--deck-${k}`).trim()]));
    return Promise.all(cards.map(async (card) => {
      const svg = getCardArtImage(card, colors, true);
      if (!svg) return null;
      const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
      const img = await loadImage(url);
      URL.revokeObjectURL(url);
      return img;
    }));
  }
  if (visualStyle === 'api') return Promise.all(cards.map(card => loadImage(getCardImageUrl(card, 'webp', 160))));
  return Promise.resolve(cards.map(() => null));
}
export async function generateShareImage() {
  const { spreadName, question, drawnCards, bottomCard, timestamp, seed } = lastReadingData;
  if (!drawnCards) {
    showToast(t('toast.noReading'), 'warning');
    return;
  }
  const cards = [...drawnCards, bottomCard];
  const faces = await shareCardFaces(cards);
  const withFaces = faces.some(Boolean);
  const width = 800;
  const pad = 64;
  const rowH = withFaces ? 104 : 72;
  // 牌面縮圖的高度與文字欄的左緣
  const faceH = 88;
  const textX = withFaces ? pad + 70 : pad + 44;
  const headerH = question ? 232 : 192;
  const height = headerH + cards.length * rowH + 100;
  const canvas = document.createElement('canvas');
  const scale = 2;
  canvas.width = width * scale;
  canvas.height = height * scale;
  const ctx = canvas.getContext('2d');
  ctx.scale(scale, scale);
  const P = shareImagePalette();
  ctx.fillStyle = P.bg;
  ctx.fillRect(0, 0, width, height);
  const font = '"Noto Sans TC", "PingFang TC", "Microsoft JhengHei", -apple-system, sans-serif';
  const truncate = (text, maxWidth) => {
    if (ctx.measureText(text).width <= maxWidth) return text;
    while (text.length && ctx.measureText(text + '…').width > maxWidth) text = text.slice(0, -1);
    return text + '…';
  };
  if (P.glow) { ctx.shadowColor = P.accent; ctx.shadowBlur = 14; }
  ctx.fillStyle = P.accent;
  ctx.font = `600 32px ${font}`;
  ctx.fillText(t('app.title'), pad, 96);
  ctx.shadowBlur = 0;
  ctx.fillStyle = P.sub;
  ctx.font = `500 19px ${font}`;
  ctx.fillText(`${t(spreadName)} · ${formatDate(timestamp)}`, pad, 132);
  if (question) {
    ctx.fillStyle = P.text;
    ctx.font = `400 19px ${font}`;
    ctx.fillText(truncate(`「${question}」`, width - pad * 2), pad, 172);
  }
  ctx.strokeStyle = P.divider;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(pad, headerH - 24);
  ctx.lineTo(width - pad, headerH - 24);
  ctx.stroke();
  cards.forEach((card, i) => {
    const y = headerH + i * rowH;
    // 有牌面時文字往下移，與縮圖的垂直中線對齊
    const dy = withFaces ? 14 : 0;
    const suitColor = P.suit ? (P.suit[card.suit] || P.accent) : P.text;
    const face = faces[i];
    if (face) {
      const h = faceH;
      const w = Math.round(h * face.naturalWidth / face.naturalHeight);
      const cx = pad + 26;
      const cy = y + 2 + h / 2;
      ctx.save();
      ctx.translate(cx, cy);
      if (card.orientation === 'reversed') ctx.rotate(Math.PI);
      ctx.drawImage(face, -w / 2, -h / 2, w, h);
      ctx.restore();
    } else {
      shareGlyph(ctx, card.suit, pad + 14, y + 28 + dy, 0.42, suitColor);
    }
    ctx.fillStyle = P.sub;
    ctx.font = `600 14px ${font}`;
    ctx.fillText(t(card.position), textX, y + 16 + dy);
    ctx.fillStyle = suitColor;
    ctx.font = `600 24px ${font}`;
    ctx.fillText(truncate(card.name, width - textX - pad - 96), textX, y + 46 + dy);
    ctx.font = `500 17px ${font}`;
    ctx.fillStyle = card.orientation === 'reversed' ? P.rev : P.up;
    const oriLabel = t(orientationNames[card.orientation] || card.orientation);
    ctx.fillText(oriLabel, width - pad - ctx.measureText(oriLabel).width, y + 44 + dy);
  });
  ctx.fillStyle = P.sub;
  ctx.font = `400 14px ${font}`;
  ctx.fillText(t('app.share.imageFooter'), pad, height - 44);
  canvas.toBlob((blob) => {
    if (!blob) {
      showToast(t('toast.shareImageFailed'), 'error');
      return;
    }
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tarot-${seed || Date.now()}.png`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(t('toast.shareImageDone'));
  }, 'image/png');
}
export function printReading() {
  window.print();
}
