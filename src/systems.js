import { deckCardsOf } from './data.js';

export const suitSystem = {
  'Wands':     { element: 'Fire',  french: 'Clubs',    faculty: 'suit.faculty.wands' },
  'Cups':      { element: 'Water', french: 'Hearts',   faculty: 'suit.faculty.cups' },
  'Swords':    { element: 'Air',   french: 'Spades',   faculty: 'suit.faculty.swords' },
  'Pentacles': { element: 'Earth', french: 'Diamonds', faculty: 'suit.faculty.pentacles' }
};
const numberPlanets = {
  'Three': 'Saturn', 'Four': 'Jupiter', 'Five': 'Mars', 'Six': 'Sun',
  'Seven': 'Venus', 'Eight': 'Mercury', 'Nine': 'Moon', 'Ten': 'Earth'
};
export const thierensMajors = {
  magician: 'Aries', high_priestess: 'Taurus', empress: 'Gemini', emperor: 'Cancer',
  hierophant: 'Leo', lovers: 'Virgo', chariot: 'Libra', justice: 'Scorpio',
  hermit: 'Sagittarius', wheel_of_fortune: 'Capricorn', strength: 'Aquarius',
  hanged_man: 'Pisces', death: 'Saturn', temperance: 'Mercury', devil: 'Mars',
  tower: 'Uranus', star: 'Venus', moon: null, sun: null,
  judgement: 'Jupiter', world: 'Neptune', fool: 'Earth'
};
const thierensSuits = {
  'Wands':     { element: 'Air',   startHouse: 1 },
  'Cups':      { element: 'Water', startHouse: 9 },
  'Swords':    { element: 'Earth', startHouse: 1 },
  'Pentacles': { element: 'Fire',  startHouse: 5 }
};
const HOUSE_SIGN = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
const PIP_ORDER = ['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];
function thierensMinor(card) {
  if (!card) return null;
  const s = thierensSuits[card.suit];
  if (!s) return null;
  const i = PIP_ORDER.indexOf(card.number);
  if (i < 0) return null;
  const house = ((s.startHouse - 1 + i) % 12) + 1;
  return { element: s.element, house, sign: HOUSE_SIGN[house - 1] };
}
export const waiteCourtLooks = {
  'Wands':     'court.looks.wands',
  'Cups':      'court.looks.cups',
  'Swords':    'court.looks.swords',
  'Pentacles': 'court.looks.pentacles'
};
export const zodiacQuality = {
  Aries: 'cardinal', Taurus: 'fixed', Gemini: 'mutable', Cancer: 'cardinal',
  Leo: 'fixed', Virgo: 'mutable', Libra: 'cardinal', Scorpio: 'fixed',
  Sagittarius: 'mutable', Capricorn: 'cardinal', Aquarius: 'fixed', Pisces: 'mutable'
};
const zodiacTriplicity = {
  Aries: 'Fire', Leo: 'Fire', Sagittarius: 'Fire',
  Taurus: 'Earth', Virgo: 'Earth', Capricorn: 'Earth',
  Gemini: 'Air', Libra: 'Air', Aquarius: 'Air',
  Cancer: 'Water', Scorpio: 'Water', Pisces: 'Water'
};
const COURT_RANKS = ['Page', 'Knight', 'Queen', 'King'];
export function cardClass(card) {
  if (!card) return null;
  if (card.suit === 'Major Arcana') return 'major';
  return COURT_RANKS.includes(card.number) ? 'court' : 'pip';
}
// 統計檢定用的牌組組成：N 為牌組張數，其餘為各類別在這副牌裡的張數（不在牌組裡就是 0）
const deckCompCache = new Map();
export function deckComposition(deckType) {
  const cards = deckCardsOf(deckType);
  if (deckCompCache.has(cards)) return deckCompCache.get(cards);
  const comp = { N: cards.length, major: 0, court: 0, pip: 0, suits: { Wands: 0, Cups: 0, Swords: 0, Pentacles: 0 }, keys: new Set(), cards };
  cards.forEach(c => {
    comp[cardClass(c)]++;
    if (c.suit in comp.suits) comp.suits[c.suit]++;
    comp.keys.add(c.nameKey);
  });
  deckCompCache.set(cards, comp);
  return comp;
}
export function cardElement(card) {
  if (!card || !suitSystem[card.suit]) return null;
  return suitSystem[card.suit].element;
}
export const SYSTEMS_ELEMENT_KEY = { Fire: 'element.fire', Water: 'element.water', Air: 'element.air', Earth: 'element.earth' };
const SYSTEMS_FRENCH_KEY = { Clubs: 'french.clubs', Hearts: 'french.hearts', Spades: 'french.spades', Diamonds: 'french.diamonds' };
function systemsSignKey(sign) {
  return 'sign.' + sign.toLowerCase();
}
function systemsPlanetKey(planet) {
  return 'planet.' + planet.toLowerCase();
}
function systemsSignRows(sign, rows) {
  if (!sign || !zodiacQuality[sign]) return;
  rows.push({ label: 'systems.label.quality', value: 'quality.' + zodiacQuality[sign] });
  if (zodiacTriplicity[sign]) {
    rows.push({ label: 'systems.label.triplicity', value: SYSTEMS_ELEMENT_KEY[zodiacTriplicity[sign]] });
  }
}
export function cardSystems(card) {
  const out = [];
  if (!card) return out;
  const std = suitSystem[card.suit];
  if (std) {
    const rows = [
      { label: 'systems.label.element', value: SYSTEMS_ELEMENT_KEY[std.element] },
      { label: 'systems.label.faculty', value: std.faculty },
      { label: 'systems.label.french', value: SYSTEMS_FRENCH_KEY[std.french] }
    ];
    const planet = numberPlanets[card.number];
    if (planet) rows.push({ label: 'systems.label.planet', value: systemsPlanetKey(planet) });
    out.push({ source: 'systems.std.source', note: 'systems.std.note', rows });
  } else if (card.suit === 'Major Arcana') {
    // 大阿卡納在標準系統下刻意留白，仍列出來源與留白的理由
    out.push({ source: 'systems.std.source', note: 'systems.std.note.major', rows: [] });
  }
  const tRows = [];
  let tSign = null;
  if (card.suit === 'Major Arcana') {
    const v = thierensMajors[card.nameKey];
    if (v) {
      const isSign = !!zodiacQuality[v];
      tRows.push({
        label: isSign ? 'systems.label.sign' : 'systems.label.planet',
        value: isSign ? systemsSignKey(v) : systemsPlanetKey(v)
      });
      if (isSign) tSign = v;
    }
  } else {
    const m = thierensMinor(card);
    if (m) {
      tRows.push({ label: 'systems.label.element', value: SYSTEMS_ELEMENT_KEY[m.element] });
      tRows.push({ label: 'systems.label.house', value: 'systems.house', vars: { n: m.house } });
      tRows.push({ label: 'systems.label.sign', value: systemsSignKey(m.sign) });
      tSign = m.sign;
    }
  }
  systemsSignRows(tSign, tRows);
  if (tRows.length) {
    const stdEl = cardElement(card);
    const tEl = card.suit !== 'Major Arcana' && thierensMinor(card) ? thierensMinor(card).element : null;
    const clash = !!(stdEl && tEl && stdEl !== tEl);
    const note = card.suit === 'Major Arcana'
    ? 'systems.thierens.note.major'
    : (clash ? 'systems.thierens.note.clash' : 'systems.thierens.note');
    out.push({
      source: 'systems.thierens.source',
      note,
      rows: tRows
    });
  }
  return out;
}
