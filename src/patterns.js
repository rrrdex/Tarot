import { t } from './i18n.js';
import { escapeHTML } from './utils.js';
import { suitNames } from './data.js';
import { SYSTEMS_ELEMENT_KEY, suitSystem } from './systems.js';
import { cardMeanings } from './meanings.js';
import { readingHistory } from './state.js';
import { insightChoose, insightPct } from './insight.js';

const patternMinorSuits = ['Wands', 'Cups', 'Swords', 'Pentacles'];
function patternBinomTail(n, k, p) {
  if (k <= 0) return 1;
  if (k > n) return 0;
  if (n > 400) {
    const mean = n * p;
    if (k <= mean) return 1;
    return Math.min(1, Math.exp(-2 * (k - mean) * (k - mean) / n));
  }
  let s = 0;
  for (let i = k; i <= n; i++) {
    s += insightChoose(n, i) * Math.pow(p, i) * Math.pow(1 - p, n - i);
  }
  return Math.min(1, s);
}
function patternBinomLowTail(n, k, p) {
  return patternBinomTail(n, n - k, 1 - p);
}
const PATTERN_ALPHA = 0.05;
function patternSuitLabel(suit) {
  return t(suitNames[suit] || suit);
}
function patternCardsOf(reading) {
  const out = [];
  if (!reading || typeof reading !== 'object') return out;
  if (Array.isArray(reading.drawnCards)) {
    reading.drawnCards.forEach(c => {
      if (c && typeof c === 'object') out.push(c);
    });
  }
  if (reading.bottomCard && typeof reading.bottomCard === 'object') out.push(reading.bottomCard);
  return out;
}
function patternTopMinorSuit(counts) {
  let suit = null;
  let count = 0;
  patternMinorSuits.forEach(s => {
    const c = counts[s] || 0;
    if (c > count) {
      suit = s;
      count = c;
    }
  });
  return { suit, count };
}
function generatePatterns(history) {
  if (!Array.isArray(history)) return [];
  const n = history.length;
  if (n < 5) {
    if (n === 0) {
      return [{ tag: t('pattern.none.tag'), text: t('pattern.none.text') }];
    }
    return [{
      tag: t('pattern.building.tag'),
      text: t('pattern.building.text', { n: 5 - n })
    }];
  }
  const allCards = [];
  history.forEach(r => patternCardsOf(r).forEach(c => allCards.push(c)));
  const total = allCards.length;
  const out = [];
  const suitCounts = {};
  let majorCount = 0;
  let revCount = 0;
  allCards.forEach(c => {
    if (c.suit === 'Major Arcana') majorCount++;
    else if (patternMinorSuits.includes(c.suit)) suitCounts[c.suit] = (suitCounts[c.suit] || 0) + 1;
    if (c.orientation === 'reversed') revCount++;
  });
  const top = patternTopMinorSuit(suitCounts);
  if (top.suit && total) {
    const p = Math.min(1, patternBinomTail(total, top.count, 14 / 78) * 4);
    const sys = suitSystem[top.suit];
    if (p < PATTERN_ALPHA && sys) {
      out.push({
        tag: t('pattern.dominant.tag', { suit: patternSuitLabel(top.suit) }),
        text: t('pattern.dominant.text', {
          suit: patternSuitLabel(top.suit),
          k: top.count, total,
          exp: (total * 14 / 78).toFixed(1),
          pct: Math.round((top.count / total) * 100),
          p: insightPct(p),
          element: t(SYSTEMS_ELEMENT_KEY[sys.element]),
          faculty: t(sys.faculty)
        })
      });
    }
  }
  const tagStats = new Map();
  history.forEach(r => {
    if (!r || !Array.isArray(r.tags)) return;
    const cards = patternCardsOf(r);
    const seen = new Set();
    r.tags.forEach(t => {
      const name = String(t);
      if (!name || seen.has(name)) return;
      seen.add(name);
      let stat = tagStats.get(name);
      if (!stat) {
        stat = { readings: 0, cards: 0, suits: {} };
        tagStats.set(name, stat);
      }
      stat.readings++;
      cards.forEach(c => {
        stat.cards++;
        if (patternMinorSuits.includes(c.suit)) stat.suits[c.suit] = (stat.suits[c.suit] || 0) + 1;
      });
    });
  });
  const tagFindings = [];
  let tagsTested = 0;
  tagStats.forEach(stat => { if (stat.readings >= 3 && stat.cards) tagsTested++; });
  tagStats.forEach((stat, name) => {
    if (stat.readings < 3 || !stat.cards) return;
    const best = patternTopMinorSuit(stat.suits);
    if (!best.suit) return;
    const p = Math.min(1, patternBinomTail(stat.cards, best.count, 14 / 78) * 4 * Math.max(1, tagsTested));
    if (p >= PATTERN_ALPHA) return;
    tagFindings.push({ name, suit: best.suit, readings: stat.readings, cards: stat.cards, count: best.count, p });
  });
  tagFindings.sort((a, b) => a.p - b.p);
  tagFindings.slice(0, 2).forEach(f => {
    const sys = suitSystem[f.suit];
    out.push({
      tag: t('pattern.tag.tag', { name: f.name }),
      text: t('pattern.tag.text', {
        name: f.name,
        n: f.readings,
        m: f.cards,
        k: f.count,
        suit: patternSuitLabel(f.suit),
        pct: Math.round((f.count / f.cards) * 100),
        p: insightPct(f.p),
        faculty: sys ? t(sys.faculty) : ''
      })
    });
  });
  if (total) {
    const pHigh = patternBinomTail(total, revCount, 0.5);
    const pLow = patternBinomLowTail(total, revCount, 0.5);
    const pct = Math.round((revCount / total) * 100);
    if (revCount * 2 > total && pHigh < PATTERN_ALPHA) {
      out.push({
        tag: t('pattern.reversed.high.tag'),
        text: t('pattern.reversed.high.text', { k: revCount, total, pct, p: insightPct(pHigh) })
      });
    } else if (revCount * 2 < total && pLow < PATTERN_ALPHA) {
      out.push({
        tag: t('pattern.reversed.low.tag'),
        text: t('pattern.reversed.low.text', { k: revCount, total, pct, p: insightPct(pLow) })
      });
    }
  }
  const cardCounts = new Map();
  allCards.forEach(c => {
    if (!c.nameKey) return;
    let e = cardCounts.get(c.nameKey);
    if (!e) {
      e = { name: typeof c.name === 'string' ? c.name : c.nameKey, count: 0 };
      cardCounts.set(c.nameKey, e);
    }
    e.count++;
  });
  let topCard = null;
  let topCardKey = null;
  cardCounts.forEach((e, key) => {
    if (!topCard || e.count > topCard.count) {
      topCard = e;
      topCardKey = key;
    }
  });
  if (topCard && total) {
    const p = Math.min(1, 78 * patternBinomTail(total, topCard.count, 1 / 78));
    if (topCard.count >= 3 && p < PATTERN_ALPHA) {
      const meaning = cardMeanings[topCardKey] || null;
      const keywords = (meaning && Array.isArray(meaning.keywords)) ? meaning.keywords : [];
      const kw = keywords.slice(0, 2).join('、');
      out.push({
        tag: t('pattern.regular.tag'),
        text: t(kw ? 'pattern.regular.text' : 'pattern.regular.text.noKeywords',
          { name: topCard.name, n: topCard.count, total, p: insightPct(p), kw })
      });
    }
  }
  if (total) {
    const pHigh = patternBinomTail(total, majorCount, 22 / 78);
    const pLow = patternBinomLowTail(total, majorCount, 22 / 78);
    const pct = Math.round((majorCount / total) * 100);
    const exp = (total * 22 / 78).toFixed(1);
    if (majorCount > total * 22 / 78 && pHigh < PATTERN_ALPHA) {
      out.push({
        tag: t('pattern.major.high.tag'),
        text: t('pattern.major.high.text', { k: majorCount, total, exp, pct, p: insightPct(pHigh) })
      });
    } else if (majorCount < total * 22 / 78 && pLow < PATTERN_ALPHA) {
      out.push({
        tag: t('pattern.major.low.tag'),
        text: t('pattern.major.low.text', { k: majorCount, total, exp, pct, p: insightPct(pLow) })
      });
    }
  }
  const PATTERN_DAY_MS = 86400000;
  const now = Date.now();
  let last30 = 0;
  let prev30 = 0;
  history.forEach(r => {
    const ts = Number(r && r.timestamp);
    if (!Number.isFinite(ts)) return;
    const age = now - ts;
    if (age < 0) return;
    if (age <= 30 * PATTERN_DAY_MS) last30++;
    else if (age <= 60 * PATTERN_DAY_MS) prev30++;
  });
  if (prev30 >= 1 && last30 >= prev30 * 1.5) {
    out.push({
      tag: t('pattern.pace.tag'),
      text: t('pattern.pace.text', { n: last30, prev: prev30 })
    });
  }
  if (!out.length) {
    return [{
      tag: t('pattern.flat.tag'),
      text: t('pattern.flat.text')
    }];
  }
  return out.slice(0, 5);
}
export function renderPatternInsights() {
  const el = document.getElementById('patternInsights');
  if (!el) return;
  const history = readingHistory;
  const items = generatePatterns(history);
  if (!items.length) {
    el.innerHTML = '';
    return;
  }
  const sub = history.length ? `<div class="insight-sub">${escapeHTML(t('pattern.panel.sub', { n: history.length }))}</div>` : '';
  el.innerHTML = `
<div class="insight-panel">
<div class="insight-title">${escapeHTML(t('pattern.panel.title'))}</div>
${sub}
${items.map(it => `
<div class="insight-item">
<div class="insight-tag">${escapeHTML(it.tag)}</div>
<p class="insight-text">${escapeHTML(it.text)}</p>
</div>
`).join('')}
</div>
`;
}
