import { t } from './i18n.js';
import { escapeHTML } from './utils.js';
import { suitNames } from './data.js';
import { deckComposition, suitSystem } from './systems.js';
import { cardMeanings } from './meanings.js';
import { readingHistory } from './state.js';
import { insightChoose, insightProb, insightSuitHint } from './insight.js';

const patternMinorSuits = ['Wands', 'Cups', 'Swords', 'Pentacles'];
// 機率分布以陣列表示：dist[j] = 計數恰為 j 的機率。每次占卜各自的牌組不同，
// 所以逐筆把該次的分布捲積進來，得到的是精確分布，不是二項近似
function patternHyperPmf(N, K, n) {
  const out = new Array(n + 1).fill(0);
  const denom = insightChoose(N, n);
  if (!denom) {
    out[0] = 1;
    return out;
  }
  for (let i = 0; i <= n; i++) out[i] = insightChoose(K, i) * insightChoose(N - K, n - i) / denom;
  return out;
}
function patternBinomPmf(n, q) {
  let dist = [1];
  for (let i = 0; i < n; i++) dist = patternConvolve(dist, [1 - q, q]);
  return dist;
}
function patternConvolve(dist, pmf) {
  const out = new Array(dist.length + pmf.length - 1).fill(0);
  for (let i = 0; i < dist.length; i++) {
    if (!dist[i]) continue;
    for (let j = 0; j < pmf.length; j++) out[i + j] += dist[i] * pmf[j];
  }
  return out;
}
function patternUpperTail(dist, k) {
  if (k <= 0) return 1;
  let s = 0;
  for (let i = k; i < dist.length; i++) s += dist[i];
  return Math.min(1, s);
}
function patternLowerTail(dist, k) {
  let s = 0;
  for (let i = 0; i <= Math.min(k, dist.length - 1); i++) s += dist[i];
  return Math.min(1, s);
}
function patternMean(dist) {
  return dist.reduce((acc, v, i) => acc + v * i, 0);
}
const PATTERN_ALPHA = 0.05;
function patternSuitLabel(suit) {
  return t(suitNames[suit] || suit);
}
// 只算牌陣裡實際抽出的牌；底牌不算抽牌，與統計分頁一致
function patternCardsOf(reading) {
  const out = [];
  if (!reading || typeof reading !== 'object') return out;
  if (Array.isArray(reading.drawnCards)) {
    reading.drawnCards.forEach(c => {
      if (c && typeof c === 'object') out.push(c);
    });
  }
  return out;
}
// 每筆占卜用的牌組；牌與記錄的牌組對不上（舊資料、匯入）就當完整 78 張
function patternDeckOf(reading, cards) {
  const deck = deckComposition(reading && reading.deckType);
  if (cards.length > deck.N || cards.some(c => !deck.keys.has(c.nameKey))) return deckComposition('full');
  return deck;
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
// 某類別在一組占卜裡的總數分布：Kof(deck) 給出該類別在牌組裡的張數
function patternClassDist(entries, Kof) {
  let dist = [1];
  entries.forEach(e => {
    if (e.cards.length) dist = patternConvolve(dist, patternHyperPmf(e.deck.N, Kof(e.deck), e.cards.length));
  });
  return dist;
}
export function generatePatterns(history) {
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
  const entries = history.map(r => {
    const cards = patternCardsOf(r);
    return { reading: r, cards, deck: patternDeckOf(r, cards) };
  });
  const allCards = [];
  entries.forEach(e => e.cards.forEach(c => allCards.push(c)));
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
  // 已經說明過領域的花色，後面的標籤項目不再重複同一句
  const explained = new Set();
  if (top.suit && total) {
    // 每種牌組裡四個花色張數相同，所以「最多的花色」也就是機率最小的那個；×4 校正挑最多
    const dist = patternClassDist(entries, d => d.suits[top.suit]);
    const p = Math.min(1, patternUpperTail(dist, top.count) * 4);
    const sys = suitSystem[top.suit];
    if (p < PATTERN_ALPHA && sys) {
      out.push({
        tag: t('pattern.dominant.tag', { suit: patternSuitLabel(top.suit) }),
        text: t('pattern.dominant.text', {
          suit: patternSuitLabel(top.suit),
          k: top.count, total,
          exp: patternMean(dist).toFixed(1),
          pct: Math.round((top.count / total) * 100),
          prob: insightProb(p, true)
        }) + insightSuitHint(top.suit)
      });
      explained.add(top.suit);
    }
  }
  const tagStats = new Map();
  entries.forEach(e => {
    const r = e.reading;
    if (!r || !Array.isArray(r.tags)) return;
    const seen = new Set();
    r.tags.forEach(tag => {
      if (typeof tag !== 'string' || !tag || seen.has(tag)) return;
      seen.add(tag);
      let stat = tagStats.get(tag);
      if (!stat) {
        stat = { entries: [], cards: 0, suits: {} };
        tagStats.set(tag, stat);
      }
      stat.entries.push(e);
      e.cards.forEach(c => {
        stat.cards++;
        if (patternMinorSuits.includes(c.suit)) stat.suits[c.suit] = (stat.suits[c.suit] || 0) + 1;
      });
    });
  });
  const tagFindings = [];
  let tagsTested = 0;
  tagStats.forEach(stat => { if (stat.entries.length >= 3 && stat.cards) tagsTested++; });
  tagStats.forEach((stat, name) => {
    if (stat.entries.length < 3 || !stat.cards) return;
    const best = patternTopMinorSuit(stat.suits);
    if (!best.suit) return;
    const dist = patternClassDist(stat.entries, d => d.suits[best.suit]);
    const p = Math.min(1, patternUpperTail(dist, best.count) * 4 * Math.max(1, tagsTested));
    if (p >= PATTERN_ALPHA) return;
    tagFindings.push({ name, suit: best.suit, readings: stat.entries.length, cards: stat.cards, count: best.count, p });
  });
  tagFindings.sort((a, b) => a.p - b.p);
  tagFindings.slice(0, 2).forEach(f => {
    out.push({
      tag: t('pattern.tag.tag', { name: f.name }),
      text: t('pattern.tag.text', {
        name: f.name,
        n: f.readings,
        m: f.cards,
        k: f.count,
        suit: patternSuitLabel(f.suit),
        pct: Math.round((f.count / f.cards) * 100),
        prob: insightProb(f.p, true)
      }) + (explained.has(f.suit) ? '' : insightSuitHint(f.suit))
    });
    explained.add(f.suit);
  });
  if (total) {
    // 正逆位各半、彼此獨立：精確的二項分布
    const dist = patternBinomPmf(total, 0.5);
    const pHigh = patternUpperTail(dist, revCount);
    const pLow = patternLowerTail(dist, revCount);
    const pct = Math.round((revCount / total) * 100);
    if (revCount * 2 > total && pHigh < PATTERN_ALPHA) {
      out.push({
        tag: t('pattern.reversed.high.tag'),
        text: t('pattern.reversed.high.text', { k: revCount, total, pct, prob: insightProb(pHigh) }) + t('insight.hint.reversed')
      });
    } else if (revCount * 2 < total && pLow < PATTERN_ALPHA) {
      out.push({
        tag: t('pattern.reversed.low.tag'),
        text: t('pattern.reversed.low.text', { k: revCount, total, pct, prob: insightProb(pLow) }) + t('insight.hint.upright')
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
  // 任何一張牌在某次占卜裡至多出現一次，機率是 抽牌數／牌組張數（不在牌組裡就是 0）；
  // 挑機率最小的那張，再乘上「用過的牌組裡一共有幾種牌」做多重比較校正
  const possible = new Set();
  entries.forEach(e => { if (e.cards.length) e.deck.keys.forEach(k => possible.add(k)); });
  let topCard = null;
  let topCardKey = null;
  let topRaw = 1;
  cardCounts.forEach((e, key) => {
    if (e.count < 3) return;
    let dist = [1];
    entries.forEach(en => {
      if (!en.cards.length || !en.deck.keys.has(key)) return;
      const q = en.cards.length / en.deck.N;
      dist = patternConvolve(dist, [1 - q, q]);
    });
    const raw = patternUpperTail(dist, e.count);
    if (!topCard || raw < topRaw || (raw === topRaw && e.count > topCard.count)) {
      topCard = e;
      topCardKey = key;
      topRaw = raw;
    }
  });
  if (topCard && total) {
    const p = Math.min(1, possible.size * topRaw);
    if (p < PATTERN_ALPHA) {
      const meaning = cardMeanings[topCardKey] || null;
      const keywords = (meaning && Array.isArray(meaning.keywords)) ? meaning.keywords : [];
      const kw = keywords.slice(0, 2).join('、');
      out.push({
        tag: t('pattern.regular.tag'),
        text: t(kw ? 'pattern.regular.text' : 'pattern.regular.text.noKeywords',
          { name: topCard.name, n: topCard.count, total, size: possible.size, prob: insightProb(p, true), kw })
      });
    }
  }
  if (total) {
    // 只用大阿卡納或完全不含大阿卡納的牌組，分布退化成定值，兩邊的機率都是 1，不會誤報
    const dist = patternClassDist(entries, d => d.major);
    const mean = patternMean(dist);
    const pHigh = patternUpperTail(dist, majorCount);
    const pLow = patternLowerTail(dist, majorCount);
    const pct = Math.round((majorCount / total) * 100);
    const exp = mean.toFixed(1);
    if (majorCount > mean && pHigh < PATTERN_ALPHA) {
      out.push({
        tag: t('pattern.major.high.tag'),
        text: t('pattern.major.high.text', { k: majorCount, total, exp, pct, prob: insightProb(pHigh) }) + t('insight.hint.major')
      });
    } else if (majorCount < mean && pLow < PATTERN_ALPHA) {
      out.push({
        tag: t('pattern.major.low.tag'),
        text: t('pattern.major.low.text', { k: majorCount, total, exp, pct, prob: insightProb(pLow) })
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
  // 滿 5 次才開始檢定，說明也從那時才有意義
  const note = history.length >= 5 ? `<div class="insight-sub">${escapeHTML(t('pattern.panel.note'))}</div>` : '';
  el.innerHTML = `
<div class="insight-panel">
<h3 class="insight-title">${escapeHTML(t('pattern.panel.title'))}</h3>
${sub}
${note}
${items.map(it => `
<div class="insight-item">
<h4 class="insight-tag">${escapeHTML(it.tag)}</h4>
<p class="insight-text">${escapeHTML(it.text)}</p>
</div>
`).join('')}
</div>
`;
}
