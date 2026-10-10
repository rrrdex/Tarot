import { fullTarotCards, spreads } from './data.js';
import * as storage from './storage.js';
import { isTopic } from './topics.js';

export let lastReadingData = {};
export const HISTORY_MAX = 100;
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
// 匯入檔與本機紀錄都不可信：牌一律依 nameKey（舊紀錄退而用牌名）從牌庫重建，只保留牌位與正逆位，
// 牌名、編號、花色等會進到 HTML 的欄位不沿用紀錄裡的值。認不出的牌回傳 null，整筆紀錄捨棄
const CARD_BY_KEY = new Map(fullTarotCards.map(c => [c.nameKey, c]));
const CARD_BY_NAME = new Map(fullTarotCards.flatMap(c => [[c.name, c], [c.englishName, c]]));
function rebuildCard(c) {
  if (!c || typeof c !== 'object') return null;
  const base = (typeof c.nameKey === 'string' && CARD_BY_KEY.get(c.nameKey)) ||
    (typeof c.name === 'string' && CARD_BY_NAME.get(c.name)) ||
    (typeof c.englishName === 'string' && CARD_BY_NAME.get(c.englishName));
  if (!base) return null;
  return {
    ...base,
    position: typeof c.position === 'string' ? c.position : '',
    orientation: normalizeOrientation(c.orientation)
  };
}
const SEED_RE = /^[0-9a-f]{1,32}$/i;
function cleanTags(tags) {
  if (!Array.isArray(tags)) return [];
  return [...new Set(tags.filter(x => typeof x === 'string').map(x => x.trim()).filter(Boolean))];
}
export function normalizeReading(r, i) {
  if (!r || typeof r !== 'object' || !r.bottomCard || typeof r.bottomCard !== 'object') return null;
  if (!Array.isArray(r.drawnCards) || !r.drawnCards.length) return null;
  const drawnCards = r.drawnCards.map(rebuildCard);
  if (drawnCards.some(c => !c)) return null;
  const bottom = rebuildCard(r.bottomCard);
  if (!bottom) return null;
  const id = Number(r.id);
  const seed = typeof r.seed === 'string' || typeof r.seed === 'number' ? String(r.seed) : '';
  const picks = Array.isArray(r.picks) && r.picks.every(n => Number.isInteger(n) && n >= 0) ? r.picks.slice() : null;
  const out = {
    ...r,
    drawnCards: migrateLegacyPositions(r, drawnCards),
    bottomCard: {
      ...bottom,
      position: bottom.position === '底牌' || !bottom.position ? 'spread.bottom' : bottom.position
    },
    id: Number.isFinite(id) ? id : Date.now() + i,
    timestamp: Number(r.timestamp) || Date.now(),
    spreadName: normalizeSpreadName(r.spreadName),
    spreadType: typeof r.spreadType === 'string' ? r.spreadType : '',
    deckType: typeof r.deckType === 'string' ? r.deckType : 'full',
    question: typeof r.question === 'string' ? r.question : '',
    topic: isTopic(r.topic) ? r.topic : '',
    favorite: !!r.favorite,
    tags: cleanTags(r.tags),
    note: typeof r.note === 'string' ? r.note : ''
  };
  if (SEED_RE.test(seed)) out.seed = seed;
  else delete out.seed;
  if (picks) out.picks = picks;
  else delete out.picks;
  return out;
}
// 重複的 id 會讓收藏、筆記、刪除找錯紀錄：保留第一筆，之後重複的往後找一個沒用過的值
export function dedupeIds(list) {
  const seen = new Set();
  return list.map(r => {
    let id = r.id;
    if (!seen.has(id)) {
      seen.add(id);
      return r;
    }
    while (seen.has(id)) id += 1;
    seen.add(id);
    return { ...r, id };
  });
}
export function normalizeHistory(list) {
  return Array.isArray(list) ? dedupeIds(list.map(normalizeReading).filter(Boolean)) : [];
}
// 超過上限時先刪最舊的「沒收藏、沒筆記」紀錄，不夠才刪其他最舊的；keepId（剛抽的那一次）不列入第一輪。
// 回傳保留下來的清單（順序不變）與刪掉的筆數
export function trimHistory(list, max = HISTORY_MAX, keepId = null) {
  const extra = list.length - max;
  if (extra <= 0) return { list, trimmed: 0 };
  const precious = r => r.favorite || (typeof r.note === 'string' && r.note.trim());
  const oldestFirst = list.slice().sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
  const drop = new Set();
  for (const r of oldestFirst) {
    if (drop.size >= extra) break;
    if (!precious(r) && r.id !== keepId) drop.add(r);
  }
  for (const r of oldestFirst) {
    if (drop.size >= extra) break;
    if (r.id !== keepId) drop.add(r);
  }
  return { list: list.filter(r => !drop.has(r)), trimmed: drop.size };
}
function loadHistory() {
  try {
    return normalizeHistory(JSON.parse(storage.get('readingHistory', '[]')));
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
// 寫入失敗（空間已滿、網站資料被封鎖）時回傳 false；畫面上的紀錄照常保留到這次關閉頁面
export function saveHistory() {
  let json;
  try {
    json = JSON.stringify(readingHistory);
  } catch {
    return false;
  }
  return storage.set('readingHistory', json);
}
export let readingHistory = loadHistory();
const TAB_NAMES = ['reading', 'history', 'statistics', 'database', 'learn', 'settings'];
export let currentTab = storage.get('tab', 'reading');
if (!TAB_NAMES.includes(currentTab)) currentTab = 'reading';
export function isTabName(v) {
  return TAB_NAMES.includes(v);
}
export function setCurrentTab(v) {
  currentTab = v;
}
export let historyFilters = {
  spread: '',
  tag: '',
  favorite: false
};
