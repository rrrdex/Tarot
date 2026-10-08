import { deckCardsOf } from './data.js';

export const suitSystem = {
  'Wands':     { element: 'Fire',  french: 'Clubs',    faculty: 'suit.faculty.wands' },
  'Cups':      { element: 'Water', french: 'Hearts',   faculty: 'suit.faculty.cups' },
  'Swords':    { element: 'Air',   french: 'Spades',   faculty: 'suit.faculty.swords' },
  'Pentacles': { element: 'Earth', french: 'Diamonds', faculty: 'suit.faculty.pentacles' }
};
// 黃金黎明（Book T、Liber 777）的大阿卡納對應：希伯來字母、生命之樹的路徑（11–32）、元素／行星／星座。
// 字母跟著牌走，不跟編號：力量（本站 VIII）＝ Teth／獅子座，正義（本站 XI）＝ Lamed／天秤座。
// alt：Shin 與 Tau 在《777》裡另有第二重對應（靈、土元素），用專屬字串顯示
export const gdMajors = {
  fool:             { letter: 'א', name: 'Aleph',  zh: '阿列夫', path: 11, kind: 'element', attr: 'Air' },
  magician:         { letter: 'ב', name: 'Beth',   zh: '貝特',   path: 12, kind: 'planet',  attr: 'Mercury' },
  high_priestess:   { letter: 'ג', name: 'Gimel',  zh: '吉梅爾', path: 13, kind: 'planet',  attr: 'Moon' },
  empress:          { letter: 'ד', name: 'Daleth', zh: '達列特', path: 14, kind: 'planet',  attr: 'Venus' },
  emperor:          { letter: 'ה', name: 'Heh',    zh: '黑',     path: 15, kind: 'sign',    attr: 'Aries' },
  hierophant:       { letter: 'ו', name: 'Vau',    zh: '瓦夫',   path: 16, kind: 'sign',    attr: 'Taurus' },
  lovers:           { letter: 'ז', name: 'Zain',   zh: '扎因',   path: 17, kind: 'sign',    attr: 'Gemini' },
  chariot:          { letter: 'ח', name: 'Cheth',  zh: '赫特',   path: 18, kind: 'sign',    attr: 'Cancer' },
  strength:         { letter: 'ט', name: 'Teth',   zh: '泰特',   path: 19, kind: 'sign',    attr: 'Leo' },
  hermit:           { letter: 'י', name: 'Yod',    zh: '約德',   path: 20, kind: 'sign',    attr: 'Virgo' },
  wheel_of_fortune: { letter: 'כ', name: 'Kaph',   zh: '卡夫',   path: 21, kind: 'planet',  attr: 'Jupiter' },
  justice:          { letter: 'ל', name: 'Lamed',  zh: '拉梅德', path: 22, kind: 'sign',    attr: 'Libra' },
  hanged_man:       { letter: 'מ', name: 'Mem',    zh: '梅姆',   path: 23, kind: 'element', attr: 'Water' },
  death:            { letter: 'נ', name: 'Nun',    zh: '努恩',   path: 24, kind: 'sign',    attr: 'Scorpio' },
  temperance:       { letter: 'ס', name: 'Samekh', zh: '薩梅赫', path: 25, kind: 'sign',    attr: 'Sagittarius' },
  devil:            { letter: 'ע', name: 'Ayin',   zh: '阿因',   path: 26, kind: 'sign',    attr: 'Capricorn' },
  tower:            { letter: 'פ', name: 'Peh',    zh: '佩',     path: 27, kind: 'planet',  attr: 'Mars' },
  star:             { letter: 'צ', name: 'Tzaddi', zh: '查迪',   path: 28, kind: 'sign',    attr: 'Aquarius' },
  moon:             { letter: 'ק', name: 'Qoph',   zh: '柯夫',   path: 29, kind: 'sign',    attr: 'Pisces' },
  sun:              { letter: 'ר', name: 'Resh',   zh: '雷許',   path: 30, kind: 'planet',  attr: 'Sun' },
  judgement:        { letter: 'ש', name: 'Shin',   zh: '辛',     path: 31, kind: 'element', attr: 'Fire',   alt: 'systems.attr.fireSpirit' },
  world:            { letter: 'ת', name: 'Tau',    zh: '塔夫',   path: 32, kind: 'planet',  attr: 'Saturn', alt: 'systems.attr.saturnEarth' }
};
// 黃金黎明 Book T 的旬位：二到十號牌各配黃道上一個十度的「旬」，以「行星在星座」表示。
// 每個花色管三個同元素的星座，依開創→固定→變動排；二～四、五～七、八～十各佔一個星座。
const gdDecans = {
  Wands: {
    Two: ['Mars', 'Aries'], Three: ['Sun', 'Aries'], Four: ['Venus', 'Aries'],
    Five: ['Saturn', 'Leo'], Six: ['Jupiter', 'Leo'], Seven: ['Mars', 'Leo'],
    Eight: ['Mercury', 'Sagittarius'], Nine: ['Moon', 'Sagittarius'], Ten: ['Saturn', 'Sagittarius']
  },
  Cups: {
    Two: ['Venus', 'Cancer'], Three: ['Mercury', 'Cancer'], Four: ['Moon', 'Cancer'],
    Five: ['Mars', 'Scorpio'], Six: ['Sun', 'Scorpio'], Seven: ['Venus', 'Scorpio'],
    Eight: ['Saturn', 'Pisces'], Nine: ['Jupiter', 'Pisces'], Ten: ['Mars', 'Pisces']
  },
  Swords: {
    Two: ['Moon', 'Libra'], Three: ['Saturn', 'Libra'], Four: ['Jupiter', 'Libra'],
    Five: ['Venus', 'Aquarius'], Six: ['Mercury', 'Aquarius'], Seven: ['Moon', 'Aquarius'],
    Eight: ['Jupiter', 'Gemini'], Nine: ['Mars', 'Gemini'], Ten: ['Sun', 'Gemini']
  },
  Pentacles: {
    Two: ['Jupiter', 'Capricorn'], Three: ['Mars', 'Capricorn'], Four: ['Sun', 'Capricorn'],
    Five: ['Mercury', 'Taurus'], Six: ['Moon', 'Taurus'], Seven: ['Saturn', 'Taurus'],
    Eight: ['Sun', 'Virgo'], Nine: ['Venus', 'Virgo'], Ten: ['Mercury', 'Virgo']
  }
};
// 一到十號牌所屬的生命之樹質點（1 王冠 … 10 王國）；字串 systems.sephira.N 含《777》給該質點的天界對應
const PIP_SEPHIRA = {
  Ace: 1, Two: 2, Three: 3, Four: 4, Five: 5, Six: 6, Seven: 7, Eight: 8, Nine: 9, Ten: 10
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
    // 宮廷牌只列花色層級的對應：黃金黎明的位階元素與旬位，對上偉特的位階各家說法不一，本站不採用
    const sephira = PIP_SEPHIRA[card.number];
    if (sephira) {
      rows.push({ label: 'systems.label.gdTitle', value: 'systems.gdTitle.' + card.nameKey });
      const decan = gdDecans[card.suit] && gdDecans[card.suit][card.number];
      if (decan) {
        rows.push({
          label: 'systems.label.decan',
          value: 'systems.decan',
          tvars: { planet: systemsPlanetKey(decan[0]), sign: systemsSignKey(decan[1]) }
        });
      }
      rows.push({ label: 'systems.label.tree', value: 'systems.sephira.' + sephira });
    }
    out.push({ source: 'systems.std.source', note: sephira ? 'systems.std.note' : 'systems.std.note.court', rows });
  } else if (card.suit === 'Major Arcana') {
    const gd = gdMajors[card.nameKey];
    const rows = [];
    if (gd) {
      rows.push({
        label: 'systems.label.letter',
        value: 'systems.letter',
        vars: { letter: gd.letter, name: gd.name, zh: gd.zh }
      });
      const attrKey = gd.alt || (gd.kind === 'sign' ? systemsSignKey(gd.attr)
        : gd.kind === 'planet' ? systemsPlanetKey(gd.attr) : SYSTEMS_ELEMENT_KEY[gd.attr]);
      rows.push({ label: 'systems.label.' + gd.kind, value: attrKey });
      rows.push({ label: 'systems.label.tree', value: 'systems.path', vars: { n: gd.path } });
    }
    out.push({ source: 'systems.std.source', note: 'systems.std.note.major', rows });
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
