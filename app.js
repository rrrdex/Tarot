// ==================== UTILITIES ====================
function escapeHTML(str) {
  return String(str).replace(/[&<>"']/g, s => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[s]));
}

function mulberry32(a) {
  return function () {
    let t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function shuffle(arr, rng = Math.random) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getSeed() {
  const url = new URL(location.href);
  const s = url.searchParams.get('seed');
  return s ? Number(s) : Math.floor(Math.random() * 1e9);
}

function updateURL(params) {
  const url = new URL(location.href);
  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null || v === '') url.searchParams.delete(k);
    else url.searchParams.set(k, String(v));
  });
  history.replaceState(null, '', url.toString());
}

function formatDate(timestamp) {
  const d = new Date(timestamp);
  return `${d.getFullYear()}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getDate().toString().padStart(2, '0')} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  const icon = type === 'success' ? 
    '<svg class="toast-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd"/></svg>' :
    type === 'error' ?
    '<svg class="toast-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clip-rule="evenodd"/></svg>' :
    '<svg class="toast-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd"/></svg>';
  
  toast.innerHTML = `
    ${icon}
    <span class="toast-message">${escapeHTML(message)}</span>
  `;
  
  container.appendChild(toast);
  
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });
  
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}

// ==================== CARD VISUAL DATA ====================
const cardEmojis = {
  // Major Arcana
  '愚者': '🌟', '魔術師': '🎩', '女祭司': '🌙', '皇后': '👑', '皇帝': '⚜️',
  '教皇': '📿', '戀人': '💕', '戰車': '🏇', '力量': '🦁', '隱士': '🕯️',
  '命運之輪': '🎡', '正義': '⚖️', '倒吊人': '🔄', '死神': '💀', '節制': '🍷',
  '惡魔': '😈', '高塔': '🗼', '星星': '⭐', '月亮': '🌜', '太陽': '☀️',
  '審判': '📯', '世界': '🌍',
  // Wands
  '權杖一': '🔥', '權杖二': '⚡', '權杖三': '🕯️', '權杖四': '🏆',
  '權杖五': '⚔️', '權杖六': '🎖️', '權杖七': '🛡️', '權杖八': '🏹',
  '權杖九': '🔱', '權杖十': '⚜️', '權杖侍者': '🎯', '權杖騎士': '🐎',
  '權杖皇后': '👸', '權杖國王': '🤴',
  // Cups
  '聖杯一': '💧', '聖杯二': '🌊', '聖杯三': '🍷', '聖杯四': '💙',
  '聖杯五': '💔', '聖杯六': '🌸', '聖杯七': '🌈', '聖杯八': '🌙',
  '聖杯九': '✨', '聖杯十': '💖', '聖杯侍者': '🧜', '聖杯騎士': '🦄',
  '聖杯皇后': '👑', '聖杯國王': '🔱',
  // Swords
  '寶劍一': '⚔️', '寶劍二': '🗡️', '寶劍三': '💔', '寶劍四': '😴',
  '寶劍五': '⚡', '寶劍六': '⛵', '寶劍七': '🎭', '寶劍八': '🔗',
  '寶劍九': '😰', '寶劍十': '💀', '寶劍侍者': '🗡️', '寶劍騎士': '🏇',
  '寶劍皇后': '👸', '寶劍國王': '🤴',
  // Pentacles
  '錢幣一': '💰', '錢幣二': '⚖️', '錢幣三': '🔨', '錢幣四': '🏰',
  '錢幣五': '🍂', '錢幣六': '⚖️', '錢幣七': '🌱', '錢幣八': '🛠️',
  '錢幣九': '🌳', '錢幣十': '🏡', '錢幣侍者': '📚', '錢幣騎士': '🐢',
  '錢幣皇后': '👑', '錢幣國王': '👑'
};

const suitGradients = {
  'Major Arcana': { start: '#9b59b6', end: '#e67e22' },
  'Wands': { start: '#e74c3c', end: '#f39c12' },
  'Cups': { start: '#3498db', end: '#16a085' },
  'Swords': { start: '#7f8c8d', end: '#3498db' },
  'Pentacles': { start: '#f39c12', end: '#27ae60' }
};

// API URL 映射表
const tarotApiMapping = {
  // Major Arcana
  'fool': 'ar00',
  'magician': 'ar01',
  'high_priestess': 'ar02',
  'empress': 'ar03',
  'emperor': 'ar04',
  'hierophant': 'ar05',
  'lovers': 'ar06',
  'chariot': 'ar07',
  'strength': 'ar08',
  'hermit': 'ar09',
  'wheel_of_fortune': 'ar10',
  'justice': 'ar11',
  'hanged_man': 'ar12',
  'death': 'ar13',
  'temperance': 'ar14',
  'devil': 'ar15',
  'tower': 'ar16',
  'star': 'ar17',
  'moon': 'ar18',
  'sun': 'ar19',
  'judgement': 'ar20',
  'world': 'ar21',
  
  // Wands
  'ace_of_wands': 'waac',
  'two_of_wands': 'wa02',
  'three_of_wands': 'wa03',
  'four_of_wands': 'wa04',
  'five_of_wands': 'wa05',
  'six_of_wands': 'wa06',
  'seven_of_wands': 'wa07',
  'eight_of_wands': 'wa08',
  'nine_of_wands': 'wa09',
  'ten_of_wands': 'wa10',
  'page_of_wands': 'wapa',
  'knight_of_wands': 'wakn',
  'queen_of_wands': 'waqu',
  'king_of_wands': 'waki',
  
  // Cups
  'ace_of_cups': 'cuac',
  'two_of_cups': 'cu02',
  'three_of_cups': 'cu03',
  'four_of_cups': 'cu04',
  'five_of_cups': 'cu05',
  'six_of_cups': 'cu06',
  'seven_of_cups': 'cu07',
  'eight_of_cups': 'cu08',
  'nine_of_cups': 'cu09',
  'ten_of_cups': 'cu10',
  'page_of_cups': 'cupa',
  'knight_of_cups': 'cukn',
  'queen_of_cups': 'cuqu',
  'king_of_cups': 'cuki',
  
  // Swords
  'ace_of_swords': 'swac',
  'two_of_swords': 'sw02',
  'three_of_swords': 'sw03',
  'four_of_swords': 'sw04',
  'five_of_swords': 'sw05',
  'six_of_swords': 'sw06',
  'seven_of_swords': 'sw07',
  'eight_of_swords': 'sw08',
  'nine_of_swords': 'sw09',
  'ten_of_swords': 'sw10',
  'page_of_swords': 'swpa',
  'knight_of_swords': 'swkn',
  'queen_of_swords': 'swqu',
  'king_of_swords': 'swki',
  
  // Pentacles
  'ace_of_pentacles': 'peac',
  'two_of_pentacles': 'pe02',
  'three_of_pentacles': 'pe03',
  'four_of_pentacles': 'pe04',
  'five_of_pentacles': 'pe05',
  'six_of_pentacles': 'pe06',
  'seven_of_pentacles': 'pe07',
  'eight_of_pentacles': 'pe08',
  'nine_of_pentacles': 'pe09',
  'ten_of_pentacles': 'pe10',
  'page_of_pentacles': 'pepa',
  'knight_of_pentacles': 'pekn',
  'queen_of_pentacles': 'pequ',
  'king_of_pentacles': 'peki'
};

// 獲取牌卡圖片 URL
function getCardImageUrl(card) {
  const apiCode = tarotApiMapping[card.nameKey];
  if (!apiCode) {
    return null;
  }
  
  return `https://www.sacred-texts.com/tarot/pkt/img/${apiCode}.jpg`;
}

// 圖片載入錯誤處理
function handleImageError(img, cardName, emoji) {
  const container = img.parentElement;
  container.innerHTML = `
    <div style="
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: var(--bg-secondary);
      gap: var(--space-4);
      padding: var(--space-6);
    ">
      <div style="font-size: 72px;">${emoji}</div>
      <div style="font-size: var(--text-sm); color: var(--text-secondary); text-align: center;">
        ${cardName}
      </div>
      <div style="font-size: var(--text-xs); color: var(--text-tertiary);">
        圖片暫時無法載入
      </div>
    </div>
  `;
}

// ==================== DATA ====================
const fullTarotCards = [
  { name: "愚者", suit: "Major Arcana", number: "0", englishName: "The Fool", nameKey: "fool" }, 
  { name: "魔術師", suit: "Major Arcana", number: "I", englishName: "The Magician", nameKey: "magician" }, 
  { name: "女祭司", suit: "Major Arcana", number: "II", englishName: "The High Priestess", nameKey: "high_priestess" }, 
  { name: "皇后", suit: "Major Arcana", number: "III", englishName: "The Empress", nameKey: "empress" }, 
  { name: "皇帝", suit: "Major Arcana", number: "IV", englishName: "The Emperor", nameKey: "emperor" }, 
  { name: "教皇", suit: "Major Arcana", number: "V", englishName: "The Hierophant", nameKey: "hierophant" }, 
  { name: "戀人", suit: "Major Arcana", number: "VI", englishName: "The Lovers", nameKey: "lovers" }, 
  { name: "戰車", suit: "Major Arcana", number: "VII", englishName: "The Chariot", nameKey: "chariot" }, 
  { name: "力量", suit: "Major Arcana", number: "VIII", englishName: "Strength", nameKey: "strength" }, 
  { name: "隱士", suit: "Major Arcana", number: "IX", englishName: "The Hermit", nameKey: "hermit" }, 
  { name: "命運之輪", suit: "Major Arcana", number: "X", englishName: "Wheel of Fortune", nameKey: "wheel_of_fortune" }, 
  { name: "正義", suit: "Major Arcana", number: "XI", englishName: "Justice", nameKey: "justice" }, 
  { name: "倒吊人", suit: "Major Arcana", number: "XII", englishName: "The Hanged Man", nameKey: "hanged_man" }, 
  { name: "死神", suit: "Major Arcana", number: "XIII", englishName: "Death", nameKey: "death" }, 
  { name: "節制", suit: "Major Arcana", number: "XIV", englishName: "Temperance", nameKey: "temperance" }, 
  { name: "惡魔", suit: "Major Arcana", number: "XV", englishName: "The Devil", nameKey: "devil" }, 
  { name: "高塔", suit: "Major Arcana", number: "XVI", englishName: "The Tower", nameKey: "tower" }, 
  { name: "星星", suit: "Major Arcana", number: "XVII", englishName: "The Star", nameKey: "star" }, 
  { name: "月亮", suit: "Major Arcana", number: "XVIII", englishName: "The Moon", nameKey: "moon" }, 
  { name: "太陽", suit: "Major Arcana", number: "XIX", englishName: "The Sun", nameKey: "sun" }, 
  { name: "審判", suit: "Major Arcana", number: "XX", englishName: "Judgement", nameKey: "judgement" }, 
  { name: "世界", suit: "Major Arcana", number: "XXI", englishName: "The World", nameKey: "world" },
  { name: "權杖一", suit: "Wands", number: "Ace", englishName: "Ace of Wands", nameKey: "ace_of_wands" }, 
  { name: "權杖二", suit: "Wands", number: "Two", englishName: "Two of Wands", nameKey: "two_of_wands" }, 
  { name: "權杖三", suit: "Wands", number: "Three", englishName: "Three of Wands", nameKey: "three_of_wands" }, 
  { name: "權杖四", suit: "Wands", number: "Four", englishName: "Four of Wands", nameKey: "four_of_wands" }, 
  { name: "權杖五", suit: "Wands", number: "Five", englishName: "Five of Wands", nameKey: "five_of_wands" }, 
  { name: "權杖六", suit: "Wands", number: "Six", englishName: "Six of Wands", nameKey: "six_of_wands" }, 
  { name: "權杖七", suit: "Wands", number: "Seven", englishName: "Seven of Wands", nameKey: "seven_of_wands" }, 
  { name: "權杖八", suit: "Wands", number: "Eight", englishName: "Eight of Wands", nameKey: "eight_of_wands" }, 
  { name: "權杖九", suit: "Wands", number: "Nine", englishName: "Nine of Wands", nameKey: "nine_of_wands" }, 
  { name: "權杖十", suit: "Wands", number: "Ten", englishName: "Ten of Wands", nameKey: "ten_of_wands" }, 
  { name: "權杖侍者", suit: "Wands", number: "Page", englishName: "Page of Wands", nameKey: "page_of_wands" }, 
  { name: "權杖騎士", suit: "Wands", number: "Knight", englishName: "Knight of Wands", nameKey: "knight_of_wands" }, 
  { name: "權杖皇后", suit: "Wands", number: "Queen", englishName: "Queen of Wands", nameKey: "queen_of_wands" }, 
  { name: "權杖國王", suit: "Wands", number: "King", englishName: "King of Wands", nameKey: "king_of_wands" },
  { name: "聖杯一", suit: "Cups", number: "Ace", englishName: "Ace of Cups", nameKey: "ace_of_cups" }, 
  { name: "聖杯二", suit: "Cups", number: "Two", englishName: "Two of Cups", nameKey: "two_of_cups" }, 
  { name: "聖杯三", suit: "Cups", number: "Three", englishName: "Three of Cups", nameKey: "three_of_cups" }, 
  { name: "聖杯四", suit: "Cups", number: "Four", englishName: "Four of Cups", nameKey: "four_of_cups" }, 
  { name: "聖杯五", suit: "Cups", number: "Five", englishName: "Five of Cups", nameKey: "five_of_cups" }, 
  { name: "聖杯六", suit: "Cups", number: "Six", englishName: "Six of Cups", nameKey: "six_of_cups" }, 
  { name: "聖杯七", suit: "Cups", number: "Seven", englishName: "Seven of Cups", nameKey: "seven_of_cups" }, 
  { name: "聖杯八", suit: "Cups", number: "Eight", englishName: "Eight of Cups", nameKey: "eight_of_cups" }, 
  { name: "聖杯九", suit: "Cups", number: "Nine", englishName: "Nine of Cups", nameKey: "nine_of_cups" }, 
  { name: "聖杯十", suit: "Cups", number: "Ten", englishName: "Ten of Cups", nameKey: "ten_of_cups" }, 
  { name: "聖杯侍者", suit: "Cups", number: "Page", englishName: "Page of Cups", nameKey: "page_of_cups" }, 
  { name: "聖杯騎士", suit: "Cups", number: "Knight", englishName: "Knight of Cups", nameKey: "knight_of_cups" }, 
  { name: "聖杯皇后", suit: "Cups", number: "Queen", englishName: "Queen of Cups", nameKey: "queen_of_cups" }, 
  { name: "聖杯國王", suit: "Cups", number: "King", englishName: "King of Cups", nameKey: "king_of_cups" },
  { name: "寶劍一", suit: "Swords", number: "Ace", englishName: "Ace of Swords", nameKey: "ace_of_swords" }, 
  { name: "寶劍二", suit: "Swords", number: "Two", englishName: "Two of Swords", nameKey: "two_of_swords" }, 
  { name: "寶劍三", suit: "Swords", number: "Three", englishName: "Three of Swords", nameKey: "three_of_swords" }, 
  { name: "寶劍四", suit: "Swords", number: "Four", englishName: "Four of Swords", nameKey: "four_of_swords" }, 
  { name: "寶劍五", suit: "Swords", number: "Five", englishName: "Five of Swords", nameKey: "five_of_swords" }, 
  { name: "寶劍六", suit: "Swords", number: "Six", englishName: "Six of Swords", nameKey: "six_of_swords" }, 
  { name: "寶劍七", suit: "Swords", number: "Seven", englishName: "Seven of Swords", nameKey: "seven_of_swords" }, 
  { name: "寶劍八", suit: "Swords", number: "Eight", englishName: "Eight of Swords", nameKey: "eight_of_swords" }, 
  { name: "寶劍九", suit: "Swords", number: "Nine", englishName: "Nine of Swords", nameKey: "nine_of_swords" }, 
  { name: "寶劍十", suit: "Swords", number: "Ten", englishName: "Ten of Swords", nameKey: "ten_of_swords" }, 
  { name: "寶劍侍者", suit: "Swords", number: "Page", englishName: "Page of Swords", nameKey: "page_of_swords" }, 
  { name: "寶劍騎士", suit: "Swords", number: "Knight", englishName: "Knight of Swords", nameKey: "knight_of_swords" }, 
  { name: "寶劍皇后", suit: "Swords", number: "Queen", englishName: "Queen of Swords", nameKey: "queen_of_swords" }, 
  { name: "寶劍國王", suit: "Swords", number: "King", englishName: "King of Swords", nameKey: "king_of_swords" },
  { name: "錢幣一", suit: "Pentacles", number: "Ace", englishName: "Ace of Pentacles", nameKey: "ace_of_pentacles" }, 
  { name: "錢幣二", suit: "Pentacles", number: "Two", englishName: "Two of Pentacles", nameKey: "two_of_pentacles" }, 
  { name: "錢幣三", suit: "Pentacles", number: "Three", englishName: "Three of Pentacles", nameKey: "three_of_pentacles" }, 
  { name: "錢幣四", suit: "Pentacles", number: "Four", englishName: "Four of Pentacles", nameKey: "four_of_pentacles" }, 
  { name: "錢幣五", suit: "Pentacles", number: "Five", englishName: "Five of Pentacles", nameKey: "five_of_pentacles" }, 
  { name: "錢幣六", suit: "Pentacles", number: "Six", englishName: "Six of Pentacles", nameKey: "six_of_pentacles" }, 
  { name: "錢幣七", suit: "Pentacles", number: "Seven", englishName: "Seven of Pentacles", nameKey: "seven_of_pentacles" }, 
  { name: "錢幣八", suit: "Pentacles", number: "Eight", englishName: "Eight of Pentacles", nameKey: "eight_of_pentacles" }, 
  { name: "錢幣九", suit: "Pentacles", number: "Nine", englishName: "Nine of Pentacles", nameKey: "nine_of_pentacles" }, 
  { name: "錢幣十", suit: "Pentacles", number: "Ten", englishName: "Ten of Pentacles", nameKey: "ten_of_pentacles" }, 
  { name: "錢幣侍者", suit: "Pentacles", number: "Page", englishName: "Page of Pentacles", nameKey: "page_of_pentacles" }, 
  { name: "錢幣騎士", suit: "Pentacles", number: "Knight", englishName: "Knight of Pentacles", nameKey: "knight_of_pentacles" }, 
  { name: "錢幣皇后", suit: "Pentacles", number: "Queen", englishName: "Queen of Pentacles", nameKey: "queen_of_pentacles" }, 
  { name: "錢幣國王", suit: "Pentacles", number: "King", englishName: "King of Pentacles", nameKey: "king_of_pentacles" }
];

const majorArcana = fullTarotCards.slice(0, 22);
const minorArcana = fullTarotCards.slice(22);
const courtCards = fullTarotCards.filter(c => ['Page', 'Knight', 'Queen', 'King'].includes(c.number));
const numberedCards = fullTarotCards.filter(c => !['Page', 'Knight', 'Queen', 'King'].includes(c.number) && c.suit !== 'Major Arcana');

const spreads = {
  single: { positions: ['核心指引'], description: '最簡單直接的牌陣，適合日常指引或快速問答。' },
  three: { positions: ['過去', '現在', '未來'], description: '經典三張牌時間線，呈現事件發展脈絡。' },
  mbs: { positions: ['心態', '身體', '靈性'], description: '身心靈整體檢視，觀察平衡狀態。' },
  path: { positions: ['問題', '挑戰', '方向', '結果'], description: '四步驟路徑牌陣，釐清完整流程。' },
  twoChoice: { positions: ['現況', '選項A過程', '選項B過程', '選項A結果', '選項B結果'], description: '比較兩個選擇的過程與結果。' },
  prosCons: { positions: ['選項A優點', '選項A缺點', '選項B優點', '選項B缺點', '核心提示'], description: '優劣分析，客觀呈現正反面。' },
  goal: { positions: ['核心', '阻礙', '資源', '步驟', '結果'], description: '目標達成的五個關鍵面向。' },
  relationship: { positions: ['你的觀點', '對方觀點', '現況', '挑戰', '潛力'], description: '關係探索，呈現雙方視角。' },
  weekly: { positions: ['主題', '週一', '週二', '週三', '週四', '週五', '週六', '週日'], description: '週運勢，含整週基調與每日提示。' },
  monthly: { positions: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'], description: '全年十二個月的能量主題。' },
  quarterly: { positions: ['春季', '夏季', '秋季', '冬季'], description: '以四季觀察全年能量流動。' },
  yearly: { positions: ['總主題', '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'], description: '年度主題加各月重點。' },
  chakra: { positions: ['海底輪', '臍輪', '太陽神經叢', '心輪', '喉輪', '眉心輪', '頂輪'], description: '七脈輪能量檢視。' },
  elements: { positions: ['火', '水', '風', '土', '靈'], description: '五元素平衡狀態。' },
  celtic: { positions: ['核心', '阻礙', '根基', '過去', '目標', '未來', '態度', '環境', '希望', '結果'], description: '經典凱爾特十字，深入探索。' }
};

const commonTags = ['工作', '感情', '健康', '財運', '學業', '人際', '靈性', '決策'];

// ==================== STATE ====================
let lastReadingData = {};
let readingHistory = JSON.parse(localStorage.getItem('readingHistory') || '[]');
let currentTab = 'reading';
let currentEditingId = null;
let visualStyle = localStorage.getItem('visualStyle') || 'text';

// ==================== VISUAL STYLE ====================
function setVisualStyle(style) {
  visualStyle = style;
  localStorage.setItem('visualStyle', style);
  document.querySelectorAll('input[name="visualStyle"]').forEach(radio => {
    radio.checked = radio.value === style;
  });
  if (lastReadingData.drawnCards) {
    renderResults(lastReadingData);
  }
}

document.querySelectorAll('input[name="visualStyle"]').forEach(radio => {
  radio.addEventListener('change', (e) => {
    if (e.target.checked) {
      setVisualStyle(e.target.value);
      showToast(`已切換至${e.target.nextElementSibling.textContent}`);
    }
  });
});

// ==================== CARD RENDERING ====================
function renderCard(card, isBottom = false) {
  const gradient = suitGradients[card.suit];
  const emoji = cardEmojis[card.name] || '🎴';
  
  let cardHTML = '';
  let visualClass = '';
  
  if (visualStyle === 'text') {
    visualClass = '';
  } else if (visualStyle === 'css') {
    visualClass = 'visual-css';
  } else if (visualStyle === 'emoji') {
    visualClass = 'visual-emoji';
  } else if (visualStyle === 'api') {
    visualClass = 'visual-api';
  }
  
  cardHTML = `
    <div class="card ${isBottom ? 'bottom' : ''} ${visualClass} slide-in" 
         style="${visualStyle === 'css' ? `--card-gradient-start: ${gradient.start}; --card-gradient-end: ${gradient.end};` : ''}"
         tabindex="0">
      ${visualStyle === 'api' ? `
        <div class="card-image-container">
          ${getCardImageUrl(card) ? `
            <div class="card-image-loading">載入中...</div>
            <img class="card-image" 
                 src="${getCardImageUrl(card)}" 
                 alt="${escapeHTML(card.name)}"
                 loading="lazy"
                 style="display: none;"
                 onload="this.style.display='block'; this.previousElementSibling.style.display='none';"
                 onerror="handleImageError(this, '${escapeHTML(card.name)}', '${emoji}')"/>
          ` : `
            <div style="
              width: 100%;
              height: 100%;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              background: linear-gradient(135deg, ${gradient.start}, ${gradient.end});
              gap: var(--space-4);
              padding: var(--space-6);
            ">
              <div style="font-size: 72px; filter: drop-shadow(0 2px 8px rgba(0,0,0,0.3));">${emoji}</div>
              <div style="font-size: var(--text-base); color: white; font-weight: 600; text-shadow: 0 1px 3px rgba(0,0,0,0.3);">
                ${escapeHTML(card.name)}
              </div>
            </div>
          `}
        </div>
        <div class="card-info">
      ` : ''}
      
      <div class="card-position">${escapeHTML(card.position)}</div>
      
      ${visualStyle === 'css' ? `
        <div class="card-visual-number">${escapeHTML(card.number)}</div>
        <div class="card-visual-emoji">${emoji}</div>
      ` : ''}
      
      ${visualStyle === 'emoji' ? `
        <div class="card-emoji-large">${emoji}</div>
      ` : ''}
      
      <div class="card-content">
        <div class="card-name">${escapeHTML(card.name)}</div>
        <div class="card-orientation">
          <span class="ori-icon ${card.orientation === '逆位' ? 'reversed' : ''}"></span>
          ${escapeHTML(card.orientation)}
        </div>
      </div>
      <div class="card-footer">
        <span>${escapeHTML(card.number)}</span>
        <span>${escapeHTML(card.englishName)}</span>
      </div>
      
      ${visualStyle === 'api' ? '</div>' : ''}
    </div>
  `;
  
  return cardHTML;
}

// ==================== ELEMENTS ====================
const resultsEl = document.getElementById('results');
const readBtn = document.getElementById('readButton');
const readBtnText = document.getElementById('readButtonText');
const shareBtn = document.getElementById('shareButton');
const themeToggle = document.getElementById('themeToggle');
const iconSun = document.getElementById('iconSun');
const iconMoon = document.getElementById('iconMoon');
const spreadTypeEl = document.getElementById('spreadType');
const spreadInfoEl = document.getElementById('spreadInfo');
const showSpreadInfoCheckbox = document.getElementById('showSpreadInfo');
const showShortcutsCheckbox = document.getElementById('showShortcuts');

// ==================== THEME ====================
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  document.documentElement.classList.add('light');
  iconSun.style.display = 'none';
  iconMoon.style.display = 'block';
}
if (savedTheme === 'dark') {
  document.documentElement.classList.add('dark');
  iconSun.style.display = 'block';
  iconMoon.style.display = 'none';
}

themeToggle.addEventListener('click', toggleTheme);

function toggleTheme() {
  const root = document.documentElement;
  const isDark = root.classList.contains('dark');
  const isLight = root.classList.contains('light');
  if (isDark) {
    root.classList.remove('dark');
    root.classList.add('light');
    localStorage.setItem('theme', 'light');
    iconSun.style.display = 'none';
    iconMoon.style.display = 'block';
  } else if (isLight) {
    root.classList.remove('light');
    root.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    iconSun.style.display = 'block';
    iconMoon.style.display = 'none';
  } else {
    root.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    iconSun.style.display = 'block';
    iconMoon.style.display = 'none';
  }
}

// ==================== KEYBOARD SHORTCUTS ====================
let shortcutsEnabled = localStorage.getItem('showShortcuts') !== 'false';
if (showShortcutsCheckbox) {
  showShortcutsCheckbox.checked = shortcutsEnabled;
  showShortcutsCheckbox.addEventListener('change', (e) => {
    shortcutsEnabled = e.target.checked;
    localStorage.setItem('showShortcuts', shortcutsEnabled);
  });
}

document.addEventListener('keydown', (e) => {
  if (!shortcutsEnabled) return;
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;

  switch(e.key.toLowerCase()) {
    case ' ':
      e.preventDefault();
      if (currentTab === 'reading' && !readBtn.disabled) performReading();
      break;
    case 't':
      e.preventDefault();
      toggleTheme();
      break;
    case '1': e.preventDefault(); switchTab('reading'); break;
    case '2': e.preventDefault(); switchTab('history'); break;
    case '3': e.preventDefault(); switchTab('statistics'); break;
    case '4': e.preventDefault(); switchTab('database'); break;
    case '5': e.preventDefault(); switchTab('settings'); break;
  }
});

// ==================== TABS ====================
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => switchTab(tab.dataset.tab));
});

function switchTab(tabName) {
  currentTab = tabName;
  document.querySelectorAll('.tab').forEach(t => {
    t.classList.toggle('active', t.dataset.tab === tabName);
    t.setAttribute('aria-selected', t.dataset.tab === tabName);
  });
  document.querySelectorAll('.tab-content').forEach(tc => {
    tc.classList.toggle('hidden', tc.id !== 'tab' + tabName.charAt(0).toUpperCase() + tabName.slice(1));
  });

  if (tabName === 'history') renderHistory();
  if (tabName === 'statistics') renderStatistics();
  if (tabName === 'database') renderCardDatabase();
}

// ==================== SPREAD INFO ====================
function updateSpreadInfo() {
  const spreadType = spreadTypeEl.value;
  const spread = spreads[spreadType];
  const showInfo = showSpreadInfoCheckbox.checked;

  if (!showInfo) {
    spreadInfoEl.classList.add('hidden');
    return;
  }

  spreadInfoEl.classList.remove('hidden');
  document.getElementById('spreadInfoContent').textContent = spread.description;
  document.getElementById('spreadPositionsList').innerHTML = spread.positions.map((pos, idx) => 
    `<div class="spread-position-item">
      <span class="spread-position-num">${idx + 1}</span>
      <span>${escapeHTML(pos)}</span>
    </div>`
  ).join('');
}

spreadTypeEl.addEventListener('change', updateSpreadInfo);
showSpreadInfoCheckbox.addEventListener('change', updateSpreadInfo);

// ==================== DECK SELECTION ====================
function getDeck(deckType) {
  switch (deckType) {
    case 'major': return [...majorArcana];
    case 'minor': return [...minorArcana];
    case 'court': return [...courtCards];
    case 'numbered': return [...numberedCards];
    default: return [...fullTarotCards];
  }
}

// ==================== CORE READING ====================
function performReading(seedOverride) {
  const deckType = document.getElementById('deckType').value;
  const spreadType = spreadTypeEl.value;
  const spreadName = spreadTypeEl.options[spreadTypeEl.selectedIndex].dataset.spreadName;
  const question = document.getElementById('question').value.trim();

  const deck = getDeck(deckType);
  const seed = typeof seedOverride === 'number' ? seedOverride : getSeed();
  const rng = mulberry32(seed);
  const shuffled = shuffle(deck, rng);
  const spread = spreads[spreadType];
  const num = spread.positions.length;

  if (shuffled.length < num + 1) {
    showToast('牌組數量不足', 'error');
    return;
  }

  readBtn.disabled = true;
  readBtnText.innerHTML = '<span class="spinner"></span>';

  setTimeout(() => {
    const drawn = [];
    for (let i = 0; i < num; i++) {
      drawn.push({
        ...shuffled[i],
        position: spread.positions[i],
        orientation: rng() > 0.5 ? '正位' : '逆位'
      });
    }
    const bottomCard = {
      ...shuffled[shuffled.length - 1],
      position: '底牌',
      orientation: rng() > 0.5 ? '正位' : '逆位'
    };

    lastReadingData = { 
      id: Date.now(),
      seed, 
      deckType, 
      spreadType, 
      spreadName, 
      question, 
      drawnCards: drawn, 
      bottomCard, 
      timestamp: Date.now(),
      favorite: false,
      tags: [],
      note: ''
    };

    readingHistory.unshift(lastReadingData);
    if (readingHistory.length > 100) readingHistory = readingHistory.slice(0, 100);
    localStorage.setItem('readingHistory', JSON.stringify(readingHistory));

    renderResults(lastReadingData);
    updateURL({ seed, deck: deckType, spread: spreadType, q: question || null });
    
    readBtn.disabled = false;
    readBtnText.textContent = '開始占卜';

    requestAnimationFrame(() => {
      resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, 500);
}

function renderResults(data) {
  const { spreadName, question, drawnCards, bottomCard, seed, favorite, note } = data;

  resultsEl.innerHTML = `
    <div class="panel fade-in">
      <div class="results-header">
        <h3 class="results-title">你的占卜</h3>
        <div class="results-meta">
          <span class="badge ${favorite ? 'favorite' : ''}">${escapeHTML(spreadName)}</span>
          ${question ? `<span>${escapeHTML(question)}</span>` : ''}
        </div>
      </div>

      ${note ? `<div class="card-notes">${escapeHTML(note)}</div>` : ''}

      <div class="cards-grid">
        ${drawnCards.map(c => renderCard(c, false)).join('')}
        ${renderCard(bottomCard, true)}
      </div>

      <div class="btn-group">
        <button class="btn btn-tertiary" onclick="copyResults()">複製結果</button>
        <button class="btn btn-tertiary" onclick="generateShareImage()">生成分享圖</button>
        <button class="btn btn-tertiary" onclick="printReading()">列印</button>
      </div>
    </div>
  `;
}

function copyResults() {
  const { spreadName, question, drawnCards, bottomCard } = lastReadingData;
  const url = location.href;
  const text = [
    `${spreadName}${question ? ` - ${question}` : ''}`,
    '---',
    ...drawnCards.map(c => `${c.position}: ${c.name} (${c.orientation})`),
    `底牌: ${bottomCard.name} (${bottomCard.orientation})`,
    '',
    url
  ].join('\n');

  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      showToast('已複製到剪貼簿');
    }).catch(() => {
      showToast('複製失敗', 'error');
    });
  }
}

function generateShareImage() {
  showToast('分享圖生成功能開發中', 'warning');
}

function printReading() {
  window.print();
}

// ==================== HISTORY ====================
let historyFilters = {
  spread: '',
  tag: '',
  favorite: false
};

function renderHistory() {
  const list = document.getElementById('historyList');
  
  const spreads = [...new Set(readingHistory.map(r => r.spreadName))];
  document.getElementById('filterSpread').innerHTML = '<option value="">所有牌陣</option>' + 
    spreads.map(s => `<option value="${escapeHTML(s)}">${escapeHTML(s)}</option>`).join('');
  
  const tags = [...new Set(readingHistory.flatMap(r => r.tags || []))];
  document.getElementById('filterTag').innerHTML = '<option value="">所有標籤</option>' + 
    tags.map(t => `<option value="${escapeHTML(t)}">${escapeHTML(t)}</option>`).join('');

  let filtered = readingHistory.filter(item => {
    if (historyFilters.spread && item.spreadName !== historyFilters.spread) return false;
    if (historyFilters.tag && !item.tags?.includes(historyFilters.tag)) return false;
    if (historyFilters.favorite && !item.favorite) return false;
    return true;
  });

  if (filtered.length === 0) {
    list.innerHTML = '<div class="history-empty">尚無符合條件的記錄</div>';
    return;
  }

  list.innerHTML = filtered.map(item => `
    <div class="history-item ${item.favorite ? 'favorite' : ''}" data-id="${item.id}">
      <div class="history-header">
        <span class="history-spread">${escapeHTML(item.spreadName)}</span>
        <span class="history-time">${formatDate(item.timestamp)}</span>
      </div>
      ${item.question ? `<div class="history-question">${escapeHTML(item.question)}</div>` : ''}
      ${item.tags?.length ? `<div class="tags">${item.tags.map(t => `<span class="tag">${escapeHTML(t)}</span>`).join('')}</div>` : ''}
      <div class="history-actions">
        <button class="btn btn-tertiary btn-sm" onclick="viewReading(${item.id})">查看</button>
        <button class="btn btn-tertiary btn-sm" onclick="toggleFavorite(${item.id})">${item.favorite ? '取消收藏' : '⭐ 收藏'}</button>
        <button class="btn btn-tertiary btn-sm" onclick="openNoteModal(${item.id})">筆記</button>
        <button class="btn btn-tertiary btn-sm" onclick="openTagModal(${item.id})">標籤</button>
        <button class="btn btn-tertiary btn-sm" onclick="deleteReading(${item.id})">刪除</button>
      </div>
    </div>
  `).join('');
}

document.getElementById('filterSpread').addEventListener('change', (e) => {
  historyFilters.spread = e.target.value;
  renderHistory();
});

document.getElementById('filterTag').addEventListener('change', (e) => {
  historyFilters.tag = e.target.value;
  renderHistory();
});

document.getElementById('filterFavorite').addEventListener('click', () => {
  historyFilters.favorite = !historyFilters.favorite;
  document.getElementById('filterFavorite').style.background = historyFilters.favorite ? 'var(--accent)' : '';
  document.getElementById('filterFavorite').style.color = historyFilters.favorite ? 'white' : '';
  renderHistory();
});

function viewReading(id) {
  const reading = readingHistory.find(r => r.id === id);
  if (reading) {
    lastReadingData = reading;
    renderResults(reading);
    switchTab('reading');
  }
}

function toggleFavorite(id) {
  const reading = readingHistory.find(r => r.id === id);
  if (reading) {
    reading.favorite = !reading.favorite;
    localStorage.setItem('readingHistory', JSON.stringify(readingHistory));
    renderHistory();
    showToast(reading.favorite ? '已加入收藏' : '已取消收藏');
  }
}

function deleteReading(id) {
  if (confirm('確定要刪除此占卜記錄嗎？')) {
    readingHistory = readingHistory.filter(r => r.id !== id);
    localStorage.setItem('readingHistory', JSON.stringify(readingHistory));
    renderHistory();
    showToast('已刪除記錄');
  }
}

function openNoteModal(id) {
  currentEditingId = id;
  const reading = readingHistory.find(r => r.id === id);
  document.getElementById('noteText').value = reading?.note || '';
  document.getElementById('noteModal').classList.add('show');
}

function closeNoteModal() {
  document.getElementById('noteModal').classList.remove('show');
  currentEditingId = null;
}

function saveNote() {
  const reading = readingHistory.find(r => r.id === currentEditingId);
  if (reading) {
    reading.note = document.getElementById('noteText').value;
    localStorage.setItem('readingHistory', JSON.stringify(readingHistory));
    closeNoteModal();
    renderHistory();
    showToast('筆記已儲存');
  }
}

function openTagModal(id) {
  currentEditingId = id;
  const reading = readingHistory.find(r => r.id === id);
  
  document.getElementById('commonTags').innerHTML = commonTags.map(tag => {
    const active = reading?.tags?.includes(tag) ? 'active' : '';
    return `<span class="tag ${active}" onclick="toggleTagSelection('${tag}')">${tag}</span>`;
  }).join('');
  
  document.getElementById('tagModal').classList.add('show');
}

function closeTagModal() {
  document.getElementById('tagModal').classList.remove('show');
  document.getElementById('customTag').value = '';
  currentEditingId = null;
}

function toggleTagSelection(tag) {
  const reading = readingHistory.find(r => r.id === currentEditingId);
  if (!reading) return;
  
  if (!reading.tags) reading.tags = [];
  
  const index = reading.tags.indexOf(tag);
  if (index > -1) {
    reading.tags.splice(index, 1);
  } else {
    reading.tags.push(tag);
  }
  
  openTagModal(currentEditingId);
}

function saveTag() {
  const reading = readingHistory.find(r => r.id === currentEditingId);
  const customTag = document.getElementById('customTag').value.trim();
  
  if (customTag && !reading.tags.includes(customTag)) {
    reading.tags.push(customTag);
  }
  
  localStorage.setItem('readingHistory', JSON.stringify(readingHistory));
  closeTagModal();
  renderHistory();
  showToast('標籤已更新');
}

document.getElementById('clearHistory').addEventListener('click', () => {
  if (confirm('確定要清除所有記錄嗎？')) {
    readingHistory = [];
    localStorage.setItem('readingHistory', '[]');
    renderHistory();
    showToast('已清除所有記錄');
  }
});

// ==================== STATISTICS ====================
function renderStatistics() {
  const content = document.getElementById('statisticsContent');
  if (readingHistory.length === 0) {
    content.innerHTML = '<div class="history-empty">尚無統計資料</div>';
    return;
  }

  let totalCards = 0, upright = 0, reversed = 0;
  const cardCount = {}, suitCount = {}, spreadCount = {};
  let favoriteCount = 0;

  readingHistory.forEach(r => {
    const cards = [...r.drawnCards, r.bottomCard];
    totalCards += cards.length;
    spreadCount[r.spreadName] = (spreadCount[r.spreadName] || 0) + 1;
    if (r.favorite) favoriteCount++;

    cards.forEach(c => {
      if (c.orientation === '正位') upright++; else reversed++;
      cardCount[c.name] = (cardCount[c.name] || 0) + 1;
      suitCount[c.suit] = (suitCount[c.suit] || 0) + 1;
    });
  });

  const topCards = Object.entries(cardCount).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const topSpreads = Object.entries(spreadCount).sort((a, b) => b[1] - a[1]).slice(0, 5);

  content.innerHTML = `
    <div class="stat-card">
      <div class="stat-title">占卜次數</div>
      <div class="stat-value">${readingHistory.length}</div>
      <div class="stat-label">次</div>
    </div>
    <div class="stat-card">
      <div class="stat-title">總抽牌數</div>
      <div class="stat-value">${totalCards}</div>
      <div class="stat-label">張</div>
    </div>
    <div class="stat-card">
      <div class="stat-title">正位比例</div>
      <div class="stat-value">${((upright/totalCards)*100).toFixed(0)}%</div>
      <div class="stat-label">${upright} 張</div>
    </div>
    <div class="stat-card">
      <div class="stat-title">逆位比例</div>
      <div class="stat-value">${((reversed/totalCards)*100).toFixed(0)}%</div>
      <div class="stat-label">${reversed} 張</div>
    </div>
    <div class="stat-card">
      <div class="stat-title">收藏數量</div>
      <div class="stat-value">${favoriteCount}</div>
      <div class="stat-label">個收藏</div>
    </div>
    <div class="stat-card">
      <div class="stat-title">平均每次</div>
      <div class="stat-value">${(totalCards / readingHistory.length).toFixed(1)}</div>
      <div class="stat-label">張牌</div>
    </div>

    <div class="stat-card wide">
      <div class="stat-title">花色分布</div>
      <div class="pie-chart">
        <canvas id="suitPieChart" class="pie-canvas" width="240" height="240"></canvas>
        <div class="pie-legend" id="suitLegend"></div>
      </div>
    </div>

    <div class="stat-card wide">
      <div class="stat-title">常用牌陣</div>
      <div class="stat-list">
        ${topSpreads.map(([name, count]) => `
          <div class="stat-item">
            <span class="stat-item-name">${escapeHTML(name)}</span>
            <span class="stat-item-count">${count} 次 (${((count / readingHistory.length) * 100).toFixed(0)}%)</span>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="stat-card wide">
      <div class="stat-title">常見牌卡</div>
      <div class="stat-list">
        ${topCards.map(([name, count]) => `
          <div class="stat-item">
            <span class="stat-item-name">${escapeHTML(name)}</span>
            <span class="stat-item-count">${count} 次 (${((count / totalCards) * 100).toFixed(1)}%)</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  setTimeout(() => drawPieChart('suitPieChart', suitCount, 'suitLegend'), 100);
}

function drawPieChart(canvasId, data, legendId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = Math.min(centerX, centerY) - 20;

  const colors = ['#007aff', '#34c759', '#ff9500', '#ff3b30', '#af52de', '#5ac8fa'];
  const total = Object.values(data).reduce((a, b) => a + b, 0);
  
  let currentAngle = -Math.PI / 2;
  const entries = Object.entries(data);
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  entries.forEach(([key, value], index) => {
    const sliceAngle = (value / total) * 2 * Math.PI;
    
    ctx.beginPath();
    ctx.fillStyle = colors[index % colors.length];
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
    ctx.closePath();
    ctx.fill();
    
    currentAngle += sliceAngle;
  });

  const legend = document.getElementById(legendId);
  if (legend) {
    legend.innerHTML = entries.map(([key, value], index) => `
      <div class="pie-legend-item">
        <div class="pie-legend-color" style="background: ${colors[index % colors.length]}"></div>
        <span>${key}: ${value} (${((value / total) * 100).toFixed(0)}%)</span>
      </div>
    `).join('');
  }
}

// ==================== CARD DATABASE ====================
const debouncedSearch = debounce((filter) => {
  renderCardDatabaseFiltered(filter);
}, 300);

function renderCardDatabase() {
  document.getElementById('cardSearch').addEventListener('input', (e) => {
    debouncedSearch(e.target.value);
  });
  renderCardDatabaseFiltered('');
}

function renderCardDatabaseFiltered(filter = '') {
  const grid = document.getElementById('cardDatabaseGrid');
  const filtered = fullTarotCards.filter(c =>
    c.name.includes(filter) || c.englishName.toLowerCase().includes(filter.toLowerCase())
  );

  grid.innerHTML = filtered.map(c => `
    <div class="card-db-item">
      <div class="card-db-number">${escapeHTML(c.number)}</div>
      <div class="card-db-name">${escapeHTML(c.name)}</div>
      <div class="card-db-english">${escapeHTML(c.englishName)}</div>
      <span class="card-db-suit">${escapeHTML(c.suit)}</span>
    </div>
  `).join('');
}

// ==================== SETTINGS ====================
document.getElementById('exportData').addEventListener('click', () => {
  const data = { 
    version: '5.2.0', 
    history: readingHistory, 
    exportDate: new Date().toISOString(),
    visualStyle: visualStyle
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `tarot-backup-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('資料已匯出');
});

document.getElementById('importData').addEventListener('click', () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.history && Array.isArray(data.history)) {
          readingHistory = data.history;
          localStorage.setItem('readingHistory', JSON.stringify(readingHistory));
          if (data.visualStyle) {
            setVisualStyle(data.visualStyle);
          }
          showToast('資料匯入成功');
        } else {
          showToast('檔案格式錯誤', 'error');
        }
      } catch {
        showToast('檔案解析失敗', 'error');
      }
    };
    reader.readAsText(file);
  };
  input.click();
});

// ==================== SHARE ====================
shareBtn.addEventListener('click', () => {
  const url = location.href;
  if (navigator.share) {
    navigator.share({
      title: '塔羅占卜',
      text: '查看我的占卜結果',
      url: url
    }).catch(() => {});
  } else if (navigator.clipboard) {
    navigator.clipboard.writeText(url).then(() => {
      showToast('連結已複製');
    });
  }
});

// ==================== READ BUTTON ====================
readBtn.addEventListener('click', () => performReading());

// ==================== FOOTER LINKS ====================
document.getElementById('linkAbout').addEventListener('click', (e) => {
  e.preventDefault();
  showToast('v5.2.0 - 代碼分離優化');
});

document.getElementById('linkPrivacy').addEventListener('click', (e) => {
  e.preventDefault();
  alert('隱私政策\n\n✓ 不收集任何資料\n✓ 不使用追蹤工具\n✓ 完全本地運作\n✓ API 模式僅載入圖片');
});

// ==================== INIT ====================
(function init() {
  const url = new URL(location.href);
  const deck = url.searchParams.get('deck');
  const spread = url.searchParams.get('spread');
  const seed = url.searchParams.get('seed');
  const q = url.searchParams.get('q');

  if (deck) document.getElementById('deckType').value = deck;
  if (spread) spreadTypeEl.value = spread;
  if (q) document.getElementById('question').value = decodeURIComponent(q);

  updateSpreadInfo();
  
  // 設定初始視覺樣式
  setVisualStyle(visualStyle);
  
  if (seed) performReading(Number(seed));

  // 模態窗口點擊外部關閉
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('show');
      }
    });
  });

  // 模態窗口開關時控制 body overflow
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.target.classList.contains('modal-overlay')) {
        if (mutation.target.classList.contains('show')) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = '';
        }
      }
    });
  });

  document.querySelectorAll('.modal-overlay').forEach(el => {
    observer.observe(el, { attributes: true, attributeFilter: ['class'] });
  });
})();
