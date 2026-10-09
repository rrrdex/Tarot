// card-refs.js 資料的共用格式化：卡片詳情、資料庫的符號分段與搜尋、比較視窗都用這裡的寫法，三處說法一致
import { t } from './i18n.js';
import { escapeHTML } from './utils.js';
import { cardClass, cardSystems, gdMajors } from './systems.js';

export const RELATED_KINDS = ['similar', 'contrast', 'sequence', 'pair'];
export function relatedKindLabel(kind) {
  return RELATED_KINDS.includes(kind) ? t(`refs.kind.${kind}`) : '';
}
// 'MM-DD' → 「3 月 21 日」；2 月 29 日寫成「2 月底」（平年沒有 29 日，旬的終點其實就是二月最後一天）
function dateText(md) {
  const [m, d] = String(md).split('-').map(Number);
  if (!m || !d) return '';
  return m === 2 && d === 29 ? t('refs.timing.febEnd') : t('refs.timing.date', { m, d });
}
// 「約 3 月 21 日–3 月 30 日（火星在牡羊座的旬）」；沒有日期對應（宮廷牌、一號牌、行星或元素的大牌）回傳空字串
export function timingText(timing) {
  if (!timing || !timing.from || !timing.to || !timing.sign) return '';
  const sign = t(`sign.${timing.sign.toLowerCase()}`);
  const what = timing.basis === 'decan' && timing.planet
    ? t('refs.timing.decan', { planet: t(`planet.${timing.planet.toLowerCase()}`), sign })
    : sign;
  return t('refs.timing.range', { from: dateText(timing.from), to: dateText(timing.to), what });
}
// 符號索引的牌組旗標：lineart／rws 寫成 false，表示那一副牌沒畫
const flagOff = (v) => v !== undefined && v !== true;
// 依目前的牌面樣式補一句說明：線稿模式看不到的標「僅原版牌圖」，偉特牌圖看不到的標「僅線稿牌組」；
// 文字模式不顯示任何一副牌，兩種說明都標
export function symbolDeckNote(entry, style) {
  const notes = [];
  if (flagOff(entry.lineart) && style !== 'api') notes.push(t('refs.symbols.rwsOnly'));
  if (flagOff(entry.rws) && style !== 'line') notes.push(t('refs.symbols.lineOnly'));
  return notes.join('');
}
// 畫著這張牌的符號：[{ symbol, entry }]，依符號索引的順序
export function symbolsOfCard(symbolIndex, nameKey) {
  const out = [];
  (symbolIndex || []).forEach(symbol => {
    const entry = symbol.cards.find(e => e.card === nameKey);
    if (entry) out.push({ symbol, entry });
  });
  return out;
}
// 拉丁字母的牌名標上語言，讀屏才會用對的發音念
export const latin = (text, lang) => `<span lang="${lang}">${escapeHTML(text)}</span>`;
function thothText(names) {
  if (!names.thoth) return '';
  const name = latin(names.thoth, 'en');
  return names.thothNumber ? t('refs.names.thothNumbered', { name, n: escapeHTML(names.thothNumber) }) : name;
}
// 其他牌系的名稱：<dl> 的每一列（欄位名、HTML 值）；沒有資料的欄位略過
export function otherNameRows(card, names) {
  if (!names) return [];
  const rows = [];
  if (names.marseille) rows.push([t('refs.names.marseille'), latin(names.marseille, 'fr')]);
  if (names.thoth) {
    const alt = names.thothAlt && ['King', 'Knight'].includes(card.number)
      ? `<span class="refs-names-alt">${t('refs.names.thothAlt', { name: latin(names.thothAlt, 'en') })}</span>`
      : '';
    rows.push([t('refs.names.thoth'), thothText(names) + alt]);
  }
  if (names.italian && names.italian.length) rows.push([t('refs.names.italian'), names.italian.map(n => latin(n, 'it')).join('／')]);
  if (names.aliases && names.aliases.length) rows.push([t('refs.names.aliases'), escapeHTML(names.aliases.join('、'))]);
  return rows;
}
// 黃金黎明的對應（資料庫的「對應」篩選與比較視窗）：大牌看 gdMajors；二～十號牌看旬位的行星與星座，加上花色元素；
// 一號牌與宮廷牌只有花色元素。回傳 'element.fire'、'planet.mars'、'sign.aries' 這類字串鍵
const ELEMENT_OF_SUIT = { Wands: 'element.fire', Cups: 'element.water', Swords: 'element.air', Pentacles: 'element.earth' };
const corrCache = new Map();
export function cardCorrespondences(card) {
  if (!card) return new Set();
  if (corrCache.has(card.nameKey)) return corrCache.get(card.nameKey);
  const keys = new Set();
  if (card.suit === 'Major Arcana') {
    const gd = gdMajors[card.nameKey];
    if (gd) keys.add(`${gd.kind}.${gd.attr.toLowerCase()}`);
  } else {
    if (ELEMENT_OF_SUIT[card.suit]) keys.add(ELEMENT_OF_SUIT[card.suit]);
    if (cardClass(card) === 'pip') {
      const decan = (cardSystems(card)[0]?.rows || []).find(r => r.label === 'systems.label.decan');
      if (decan) Object.values(decan.tvars).forEach(k => keys.add(k));
    }
  }
  corrCache.set(card.nameKey, keys);
  return keys;
}
// 篩選選單的三組選項（字串鍵）
export const CORR_GROUPS = [
  { label: 'systems.label.element', keys: ['fire', 'water', 'air', 'earth'].map(k => `element.${k}`) },
  { label: 'systems.label.planet', keys: ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn'].map(k => `planet.${k}`) },
  { label: 'systems.label.sign', keys: ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'].map(k => `sign.${k}`) }
];
