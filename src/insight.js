import { t } from './i18n.js';
import { uiStrings } from './strings.js';
import { fullTarotCards, orientationNames, suitNames } from './data.js';
import { foliRecurrence, waiteAdditional, waiteRecurrence, waiteTerms } from './waite.js';
import { mofaTerms } from './mofa.js';
import { waiteTermZh } from './waite-zh.js';
import {
  CARD_CLASS_COUNT,
  SYSTEMS_ELEMENT_KEY,
  cardClass,
  cardElement,
  suitSystem,
  thierensMajors,
  zodiacQuality
} from './systems.js';
import { cardMeanings } from './meanings.js';

const INSIGHT_RANK_KEY = {
  'Ace': 'ace', 'Two': 'two', 'Three': 'three', 'Four': 'four', 'Five': 'five',
  'Six': 'six', 'Seven': 'seven', 'Eight': 'eight', 'Nine': 'nine', 'Ten': 'ten',
  'Page': 'page', 'Knight': 'knight', 'Queen': 'queen', 'King': 'king'
};
function insightRecurrence(cards) {
  const out = [];
  ['natural', 'reversed'].forEach(ori => {
    const table = waiteRecurrence[ori];
    if (!table) return;
    const byRank = {};
    cards.forEach(c => {
      const isRev = c.orientation === 'reversed';
      if ((ori === 'reversed') !== isRev) return;
      const rank = INSIGHT_RANK_KEY[c.number];
      if (rank) (byRank[rank] = byRank[rank] || []).push(c);
    });
    Object.keys(byRank).forEach(rank => {
      const n = Math.min(byRank[rank].length, 4);
      if (n < 2 || !table[rank] || !table[rank][n]) return;
      out.push({ ori, rank, n, cards: byRank[rank].slice(0, n) });
    });
  });
  out.sort((a, b) => b.n - a.n);
  return out;
}
const INSIGHT_DECK = 78;
const INSIGHT_MAJORS = 22;
const INSIGHT_PER_SUIT = 14;
const INSIGHT_ALPHA = 0.05;
export function insightChoose(n, k) {
  if (k < 0 || k > n) return 0;
  k = Math.min(k, n - k);
  let r = 1;
  for (let i = 0; i < k; i++) r = r * (n - i) / (i + 1);
  return r;
}
function insightHyperTail(N, K, n, k) {
  const denom = insightChoose(N, n);
  if (!denom) return 1;
  let p = 0;
  for (let i = k; i <= Math.min(n, K); i++) {
    p += insightChoose(K, i) * insightChoose(N - K, n - i) / denom;
  }
  return Math.min(1, p);
}
function insightBinomTail(n, k) {
  let p = 0;
  for (let i = k; i <= n; i++) p += insightChoose(n, i);
  return Math.min(1, p / Math.pow(2, n));
}
export function insightPct(p) {
  if (p < 0.001) return '<0.1%';
  return (p * 100).toFixed(p < 0.1 ? 1 : 0) + '%';
}
function insightFoliTerm(ori, rank, n) {
  const byCount = foliRecurrence[rank];
  const cell = byCount && byCount[n];
  const terms = cell && cell[ori];
  if (!terms || !terms.length) return null;
  return t('foli.recur.' + ori + '.' + rank + '.' + n);
}
function insightMention(card) {
  const ori = t(orientationNames[card.orientation] || card.orientation);
  if (card.position === 'spread.bottom') return t('insight.card.bottom', { name: card.name, ori });
  let pos = null;
  if (card.position) {
    if (card.position.indexOf('.') < 0) pos = card.position;
    else if (t(card.position) !== card.position) pos = t(card.position);
  }
  return pos
  ? t('insight.card.pos', { name: card.name, ori, pos })
  : t('insight.echo.card', { name: card.name, ori });
}
const INSIGHT_ROLE_BY_NAME = {
  '過去': 'past', '現在': 'present', '未來': 'future',
  '目標': 'aim', '結果': 'outcome',
  '阻礙': 'obstacle', '挑戰': 'obstacle', '希望與恐懼': 'hope'
};
function insightRoles(cards) {
  const byRole = {};
  cards.forEach(c => {
    if (!c.position || c.position.indexOf('.') < 0) return;
    const zh = uiStrings.zh[c.position];
    const role = zh && INSIGHT_ROLE_BY_NAME[zh];
    if (role && !byRole[role]) byRole[role] = c;
  });
  return byRole;
}
const INSIGHT_ECHO_MIN = 2;
const INSIGHT_ECHO_MAX = 3;
function insightEchoZh(term) {
  return waiteTermZh(term);
}
function insightEchoShowEn(term) {
  const zh = insightEchoZh(term);
  return zh ? t('insight.echo.pair', { zh, en: term }) : term;
}
const INSIGHT_ECHO_SOURCES = [
  { key: 'ours', oriented: false, short: (term) => term, show: (term) => term },
  { key: 'mofa', oriented: true, short: (term) => term, show: (term) => term },
  { key: 'waite', oriented: true, short: (term) => insightEchoZh(term) || term, show: insightEchoShowEn },
  { key: 'add', oriented: true, short: (term) => insightEchoZh(term) || term, show: insightEchoShowEn }
];
function insightEchoTerms(srcKey, card, ori) {
  const rv = ori === 'reversed';
  if (srcKey === 'ours') {
    const m = cardMeanings[card.nameKey];
    return (m && Array.isArray(m.keywords)) ? m.keywords : [];
  }
  if (srcKey === 'mofa') {
    const m = mofaTerms[card.nameKey];
    return (m && m[rv ? 'rv' : 'up']) || [];
  }
  if (srcKey === 'waite') {
    const m = waiteTerms[card.nameKey];
    return (m && m[rv ? 'reversed' : 'upright']) || [];
  }
  const m = waiteAdditional[card.nameKey];
  return (m && m[rv ? 'reversed' : 'upright']) || [];
}
const insightEchoDeckFreq = {};
function insightEchoFreq(src) {
  if (insightEchoDeckFreq[src.key]) return insightEchoDeckFreq[src.key];
  const freq = new Map();
  fullTarotCards.forEach(card => {
    const set = new Set();
    insightEchoTerms(src.key, card, 'upright').forEach(x => set.add(x));
    if (src.oriented) insightEchoTerms(src.key, card, 'reversed').forEach(x => set.add(x));
    set.forEach(x => freq.set(x, (freq.get(x) || 0) + 1));
  });
  insightEchoDeckFreq[src.key] = freq;
  return freq;
}
function insightEchoP(K, n, k, oriented) {
  if (!oriented) return insightHyperTail(INSIGHT_DECK, K, n, k);
  const denom = insightChoose(INSIGHT_DECK, n);
  if (!denom) return 1;
  let p = 0;
  for (let d = k; d <= Math.min(n, K); d++) {
    const hyper = insightChoose(K, d) * insightChoose(INSIGHT_DECK - K, n - d) / denom;
    p += hyper * insightBinomTail(d, k);
  }
  return Math.min(1, p);
}
function insightEcho(dealt) {
  const n = dealt.length;
  if (n < INSIGHT_ECHO_MIN) return [];
  const groups = [];
  INSIGHT_ECHO_SOURCES.forEach(src => {
    const hit = new Map();
    dealt.forEach(card => {
      new Set(insightEchoTerms(src.key, card, card.orientation)).forEach(term => {
        if (!hit.has(term)) hit.set(term, []);
        hit.get(term).push(card);
      });
    });
    const freq = insightEchoFreq(src);
    const byCards = new Map();
    hit.forEach((hitCards, term) => {
      if (hitCards.length < INSIGHT_ECHO_MIN) return;
      const K = Math.max(freq.get(term) || 0, hitCards.length);
      const id = hitCards.map(c => c.nameKey).sort().join(',');
      const g = byCards.get(id);
      const p = insightEchoP(K, n, hitCards.length, src.oriented);
      if (!g) {
        byCards.set(id, { src, terms: [term], best: term, cards: hitCards, k: hitCards.length, K, p });
      } else {
        g.terms.push(term);
        if (p < g.p) { g.p = p; g.K = K; g.best = term; }
      }
    });
    byCards.forEach(g => groups.push(g));
  });
  const compOf = new Map();
  const components = [];
  groups.forEach(g => {
    let target = null;
    g.cards.forEach(c => { if (!target) target = compOf.get(c.nameKey) || null; });
    if (!target) {
      target = { groups: [], cardSet: new Map(), dead: false };
      components.push(target);
    }
    g.cards.forEach(c => {
      const other = compOf.get(c.nameKey);
      if (other && other !== target) {
        other.groups.forEach(og => target.groups.push(og));
        other.cardSet.forEach((card, key) => { target.cardSet.set(key, card); compOf.set(key, target); });
        other.dead = true;
      }
    });
    target.groups.push(g);
    g.cards.forEach(c => { target.cardSet.set(c.nameKey, c); compOf.set(c.nameKey, target); });
  });
  const live = components.filter(c => !c.dead);
  live.forEach(c => {
    const byId = new Map();
    c.groups.forEach(g => {
      const id = g.cards.map(x => x.nameKey).sort().join(',');
      const e = byId.get(id);
      if (!e) byId.set(id, { cards: g.cards, parts: [g], p: g.p });
      else { e.parts.push(g); if (g.p < e.p) e.p = g.p; }
    });
    c.edges = Array.from(byId.values());
    c.edges.forEach(e => e.parts.sort((a, b) => a.p - b.p));
    c.edges.sort((a, b) => a.p - b.p);
    c.minP = c.edges[0].p;
  });
  live.sort((a, b) => (b.cardSet.size - a.cardSet.size) || (a.minP - b.minP));
  return live.slice(0, INSIGHT_ECHO_MAX);
}
function insightTopCount(list, keyOf) {
  const counts = new Map();
  list.forEach(item => {
    const k = keyOf(item);
    counts.set(k, (counts.get(k) || 0) + 1);
  });
  let topKey = null;
  let topCount = 0;
  counts.forEach((count, key) => {
    if (count > topCount) {
      topKey = key;
      topCount = count;
    }
  });
  return { key: topKey, count: topCount };
}
export function generateInsight(reading) {
  const out = [];
  if (!reading || typeof reading !== 'object') return out;
  const cards = Array.isArray(reading.drawnCards) ? reading.drawnCards.filter(Boolean) : [];
  const n = cards.length;
  const b = reading.bottomCard;
  let found = 0;
  let reportedSuit = null;
  if (n >= 3) {
    const cls = { major: 0, court: 0, pip: 0 };
    cards.forEach(c => { const k0 = cardClass(c); if (k0) cls[k0]++; });
    const rev = cards.filter(c => c.orientation === 'reversed').length;
    if (cls.court + cls.pip > 0) {
      const order = ['Fire', 'Water', 'Air', 'Earth'];
      const elCount = { Fire: 0, Water: 0, Air: 0, Earth: 0 };
      cards.forEach(c => { const el = cardElement(c); if (el) elCount[el]++; });
      out.push({
        tag: t('insight.profile.tag'),
        text: t('insight.profile.text', {
          n, maj: cls.major, court: cls.court, pip: cls.pip, rev,
          els: order.map(e => t('insight.profile.el', { el: t(SYSTEMS_ELEMENT_KEY[e]), k: elCount[e] })).join('・')
        })
      });
    } else {
      out.push({ tag: t('insight.profile.tag'), text: t('insight.profile.text.noMinors', { n, rev }) });
    }
  }
  if (n) {
    const k = cards.filter(c => c.suit === 'Major Arcana').length;
    if (k >= 2) {
      const p = insightHyperTail(INSIGHT_DECK, INSIGHT_MAJORS, n, k);
      if (p < INSIGHT_ALPHA) {
        found++;
        out.push({
          tag: t('insight.major.tag', { p: insightPct(p) }),
          text: t('insight.major.text', {
            n, k, p: insightPct(p),
            exp: (n * INSIGHT_MAJORS / INSIGHT_DECK).toFixed(1),
            cards: cards.filter(c => c.suit === 'Major Arcana').map(insightMention).join('、')
          })
        });
      }
    }
    const minors = cards.filter(c => c.suit !== 'Major Arcana');
    const domSuit = insightTopCount(minors, c => c.suit);
    const domSys = suitSystem[domSuit.key];
    if (domSuit.key && domSuit.count >= 2 && domSys) {
      const raw = insightHyperTail(INSIGHT_DECK, INSIGHT_PER_SUIT, n, domSuit.count);
      const p = Math.min(1, raw * 4);
      if (p < INSIGHT_ALPHA) {
        found++;
        reportedSuit = domSuit.key;
        const suitLabel = t(suitNames[domSuit.key] || domSuit.key);
        out.push({
          tag: t('insight.suit.tag', { suit: suitLabel, p: insightPct(p) }),
          text: t('insight.suit.text', {
            suit: suitLabel, k: domSuit.count, n, p: insightPct(p),
            element: t(SYSTEMS_ELEMENT_KEY[domSys.element]),
            faculty: t(domSys.faculty),
            cards: minors.filter(c => c.suit === domSuit.key).map(insightMention).join('、')
          })
        });
      }
    }
    if (n >= 2) {
      const rev = cards.filter(c => c.orientation === 'reversed').length;
      const pRev = insightBinomTail(n, rev);
      const pUp = insightBinomTail(n, n - rev);
      if (rev > n - rev && pRev < INSIGHT_ALPHA) {
        found++;
        out.push({
          tag: t('insight.reversed.tag', { p: insightPct(pRev) }),
          text: t('insight.reversed.text', { k: rev, n, p: insightPct(pRev) })
        });
      } else if (rev < n - rev && pUp < INSIGHT_ALPHA) {
        found++;
        out.push({
          tag: t('insight.upright.tag', { p: insightPct(pUp) }),
          text: t('insight.upright.text', { k: n - rev, n, p: insightPct(pUp) })
        });
      }
    }
    const recs = insightRecurrence(cards);
    recs.forEach(r => {
      found++;
      const rank = t('rank.' + r.rank);
      const ori = t(r.ori === 'reversed' ? 'orientation.reversed' : 'orientation.upright');
      const term = t('waite.recur.' + r.ori + '.' + r.rank + '.' + r.n);
      const foli = insightFoliTerm(r.ori, r.rank, r.n);
      const mentions = r.cards.map(insightMention).join('、');
      out.push({
        tag: t('insight.recur.tag', { n: r.n, rank, ori }),
        text: foli
        ? t('insight.recur.text.both', { n: r.n, rank, ori, term, foli, cards: mentions })
        : t('insight.recur.text', { n: r.n, rank, ori, term, cards: mentions })
      });
    });
    ['court', 'pip'].forEach(cls => {
      const clsCards = cards.filter(c => cardClass(c) === cls);
      const k2 = clsCards.length;
      if (k2 < 2) return;
      const p = insightHyperTail(INSIGHT_DECK, CARD_CLASS_COUNT[cls], n, k2);
      if (p < INSIGHT_ALPHA) {
        found++;
        out.push({
          tag: t('insight.class.' + cls + '.tag', { p: insightPct(p) }),
          text: t('insight.class.' + cls + '.text', {
            n, k: k2, p: insightPct(p),
            exp: (n * CARD_CLASS_COUNT[cls] / INSIGHT_DECK).toFixed(1),
            cards: cls === 'court' ? clsCards.map(insightMention).join('、') : ''
          })
        });
      }
    });
    const signs = cards
    .map(c => thierensMajors[c.nameKey])
    .filter(s => s && zodiacQuality[s]);
    if (signs.length >= 3) {
      const q = insightTopCount(signs, s => zodiacQuality[s]);
      if (q.key && q.count === signs.length) {
        const p = Math.min(1, Math.pow(1 / 3, signs.length) * 3);
        if (p < INSIGHT_ALPHA) {
          found++;
          out.push({
            tag: t('insight.quality.tag', { quality: t('quality.' + q.key), p: insightPct(p) }),
            text: t('insight.quality.text', { k: signs.length, quality: t('quality.' + q.key), p: insightPct(p) })
          });
        }
      }
    }
    insightEcho((b && b.nameKey) ? cards.concat([b]) : cards).forEach(compo => {
      found++;
      const partText = (g) => t('insight.echo.part', {
        terms: g.terms.map(x => g.src.show(x)).join('、'),
        src: t('insight.echo.src.' + g.src.key)
      });
      if (compo.edges.length === 1) {
        const e = compo.edges[0];
        const first = e.parts[0];
        const cardsTxt = e.cards.map(insightMention).join('、');
        if (e.parts.length === 1) {
          out.push({
            tag: t('insight.echo.tag', { term: first.src.short(first.best) }),
            text: t(first.terms.length > 1 ? 'insight.echo.text.multi' : 'insight.echo.text', {
              K: first.K,
              term: first.terms.map(x => first.src.show(x)).join('、'),
              best: first.src.show(first.best),
              src: t('insight.echo.src.' + first.src.key),
              cards: cardsTxt
            })
          });
        } else {
          out.push({
            tag: t('insight.echo.tag', { term: first.src.short(first.best) }),
            text: t('insight.echo.text.multiSrc', {
              cards: cardsTxt, m: e.parts.length,
              parts: e.parts.map(partText).join('、')
            })
          });
        }
        return;
      }
      const deg = new Map();
      compo.edges.forEach(e => e.cards.forEach(c => deg.set(c.nameKey, (deg.get(c.nameKey) || 0) + 1)));
      let hubKey = null, hubDeg = 0;
      deg.forEach((d, key) => { if (d > hubDeg) { hubDeg = d; hubKey = key; } });
      const hub = compo.cardSet.get(hubKey);
      const links = [], extras = [];
      compo.edges.forEach(e => {
        const parts = e.parts.map(partText).join('、');
        if (e.cards.some(c => c.nameKey === hubKey)) {
          links.push(t('insight.echo.net.link', {
            others: e.cards.filter(c => c.nameKey !== hubKey).map(insightMention).join('、'), parts
          }));
        } else {
          extras.push(t('insight.echo.net.extra', { cards: e.cards.map(insightMention).join('、'), parts }));
        }
      });
      out.push({
        tag: t('insight.echo.net.tag', { hub: hub.name }),
        text: t('insight.echo.net.text', { hub: insightMention(hub), links: links.concat(extras).join('；') })
      });
    });
    const roles = insightRoles(cards);
    const recurRanks = {};
    recs.forEach(r => { recurRanks[r.rank] = true; });
    let axisCount = 0;
    [['past', 'future'], ['aim', 'outcome'], ['obstacle', 'outcome'], ['hope', 'outcome']].forEach(pair => {
      if (axisCount >= 2) return;
      const a = roles[pair[0]], z = roles[pair[1]];
      if (!a || !z || a === z || a.number !== z.number) return;
      const rankKey = INSIGHT_RANK_KEY[a.number];
      if (!rankKey || recurRanks[rankKey]) return;
      axisCount++;
      found++;
      const p1 = t(a.position), p2 = t(z.position);
      out.push({
        tag: t('insight.axis.tag', { p1, p2 }),
        text: t('insight.axis.rank.text', {
          p1, p2, rank: t('rank.' + rankKey),
          c1: insightMention(a), c2: insightMention(z)
        })
      });
    });
    if (roles.past && roles.present && roles.future) {
      const three = [roles.past, roles.present, roles.future];
      const s0 = three[0].suit;
      if (s0 !== 'Major Arcana' && s0 !== reportedSuit && three.every(c => c.suit === s0)) {
        found++;
        out.push({
          tag: t('insight.axis.suit.tag'),
          text: t('insight.axis.suit.text', {
            cards: three.map(insightMention).join('、'),
            suit: t(suitNames[s0] || s0)
          })
        });
      }
    }
    if (!found && n >= 3) {
      out.push({
        tag: t('insight.balanced.tag'),
        text: t('insight.balanced.text')
      });
    }
  }
  if (b && b.name) {
    const meaning = cardMeanings[b.nameKey] || null;
    const keywords = (meaning && Array.isArray(meaning.keywords)) ? meaning.keywords : [];
    const kw = keywords.slice(0, 2).join('、');
    const ori = t(orientationNames[b.orientation] || b.orientation);
    out.push({
      tag: t('insight.bottom.tag'),
      text: t(kw ? 'insight.bottom.text' : 'insight.bottom.text.noKeywords', { name: b.name, ori, kw })
    });
  }
  return out;
}
