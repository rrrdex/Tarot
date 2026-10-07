import { spreads } from './data.js';

export let lastReadingData = {};
const ORIENTATION_LEGACY = { '正位': 'upright', '逆位': 'reversed' };
function normalizeOrientation(v) {
  if (v === 'upright' || v === 'reversed') return v;
  return ORIENTATION_LEGACY[v] || 'upright';
}
const SPREAD_NAME_LEGACY = {
  '單張牌指引': 'spread.single.name', '是非指引': 'spread.yesno.name', '聖三角': 'spread.three.name',
  '身心靈牌陣': 'spread.mbs.name', '抉擇之路': 'spread.path.name', '週運勢': 'spread.weekly.name',
  '月運勢': 'spread.monthly.name', '季度展望': 'spread.quarterly.name', '年度主題': 'spread.yearly.name',
  '新月啟程': 'spread.newmoon.name', '滿月釋放': 'spread.fullmoon.name', '關係牌陣': 'spread.relationship.name',
  '對方心意': 'spread.feelings.name', '愛情十字': 'spread.loveCross.name', '衝突化解': 'spread.conflict.name',
  '二擇一': 'spread.twoChoice.name', '優劣分析': 'spread.prosCons.name', '目標達成牌陣': 'spread.goal.name',
  '職涯發展': 'spread.career.name', '財富流動': 'spread.wealth.name', '脈輪牌陣': 'spread.chakra.name',
  '四元素牌陣': 'spread.elements.name', '自我探索': 'spread.selfDiscovery.name', '陰影功課': 'spread.shadow.name',
  '夢境解析': 'spread.dream.name', '凱爾特十字': 'spread.celtic.name', '馬蹄鐵牌陣': 'spread.horseshoe.name',
  '生命之樹': 'spread.treeOfLife.name', '占星十二宮': 'spread.astroHouses.name',
  '未知牌陣': 'spread.unknown'
};
function normalizeSpreadName(v) {
  if (typeof v !== 'string' || !v) return 'spread.unknown';
  return SPREAD_NAME_LEGACY[v] || v;
}
function migrateLegacyPositions(reading, drawnCards) {
  const spread = spreads[reading.spreadType];
  if (!spread || !Array.isArray(spread.positions)) return drawnCards;
  if (spread.positions.length !== drawnCards.length) return drawnCards;
  return drawnCards.map((c, i) => (
    typeof c.position === 'string' && !c.position.startsWith('spread.')
    ? { ...c, position: spread.positions[i] }
    : c
  ));
}
export function normalizeReading(r, i) {
  if (!r || typeof r !== 'object' || !r.bottomCard || typeof r.bottomCard !== 'object') return null;
  const drawnCards = Array.isArray(r.drawnCards)
  ? r.drawnCards.filter(c => c && typeof c === 'object')
  .map(c => ({ ...c, orientation: normalizeOrientation(c.orientation) }))
  : [];
  if (!drawnCards.length) return null;
  const id = Number(r.id);
  const bottomPos = r.bottomCard.position;
  return {
    ...r,
    drawnCards: migrateLegacyPositions(r, drawnCards),
    bottomCard: {
      ...r.bottomCard,
      orientation: normalizeOrientation(r.bottomCard.orientation),
      position: bottomPos === '底牌' ? 'spread.bottom' : (bottomPos || 'spread.bottom')
    },
    id: Number.isFinite(id) ? id : Date.now() + i,
    timestamp: Number(r.timestamp) || Date.now(),
    spreadName: normalizeSpreadName(r.spreadName),
    favorite: !!r.favorite,
    tags: Array.isArray(r.tags) ? r.tags.map(String) : [],
    note: typeof r.note === 'string' ? r.note : ''
  };
}
function loadHistory() {
  try {
    const parsed = JSON.parse(localStorage.getItem('readingHistory') || '[]');
    return Array.isArray(parsed) ? parsed.map(normalizeReading).filter(Boolean) : [];
  } catch {
    return [];
  }
}
export function setLastReadingData(v) {
  lastReadingData = v;
}
export function setReadingHistory(v) {
  readingHistory = v;
}
export function saveHistory() {
  localStorage.setItem('readingHistory', JSON.stringify(readingHistory));
}
export let readingHistory = loadHistory();
const TAB_NAMES = ['reading', 'history', 'statistics', 'database', 'learn', 'settings'];
export let currentTab = localStorage.getItem('tab') || 'reading';
if (!TAB_NAMES.includes(currentTab)) currentTab = 'reading';
export function setCurrentTab(v) {
  currentTab = v;
}
export let historyFilters = {
  spread: '',
  tag: '',
  favorite: false
};
