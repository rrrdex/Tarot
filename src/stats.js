import { t } from './i18n.js';
import { escapeHTML, readNeonSuitColors } from './utils.js';
import { fullTarotCards, suitNames } from './data.js';
import { readingHistory } from './state.js';

const statsCardNameByKey = {};
const statsCardKeyByName = {};
fullTarotCards.forEach(c => {
  statsCardNameByKey[c.nameKey] = c.name;
  statsCardKeyByName[c.name] = c.nameKey;
});
export function renderStatistics() {
  const content = document.getElementById('statisticsContent');
  if (readingHistory.length === 0) {
    content.innerHTML = `<div class="history-empty">${escapeHTML(t('stats.empty'))}</div>`;
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
      if (c.orientation === 'upright') upright++; else reversed++;
      const cardKey = c.nameKey || statsCardKeyByName[c.name] || c.name;
      cardCount[cardKey] = (cardCount[cardKey] || 0) + 1;
      suitCount[c.suit] = (suitCount[c.suit] || 0) + 1;
    });
  });
  const topCards = Object.entries(cardCount).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const topSpreads = Object.entries(spreadCount).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const now = new Date();
  const monthCounts = [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    monthCounts.push({ key: `${d.getFullYear()}/${(d.getMonth() + 1).toString().padStart(2, '0')}`, count: 0 });
  }
  readingHistory.forEach(r => {
    const d = new Date(r.timestamp);
    const key = `${d.getFullYear()}/${(d.getMonth() + 1).toString().padStart(2, '0')}`;
    const slot = monthCounts.find(mc => mc.key === key);
    if (slot) slot.count++;
  });
  const maxMonthly = Math.max(...monthCounts.map(mc => mc.count), 1);
  // 無障礙：趨勢圖整張當成圖片，各月數字寫進 aria-label，長條本身純裝飾；
  // 圓餅圖的 canvas 對讀屏是空盒子，同樣資料已由 .pie-legend 以文字列出，所以藏掉
  content.innerHTML = `
<div class="stat-card">
<div class="stat-title">${escapeHTML(t('stats.readings.title'))}</div>
<div class="stat-value">${readingHistory.length}</div>
<div class="stat-label">${escapeHTML(t('stats.readings.unit'))}</div>
</div>
<div class="stat-card">
<div class="stat-title">${escapeHTML(t('stats.cards.title'))}</div>
<div class="stat-value">${totalCards}</div>
<div class="stat-label">${escapeHTML(t('stats.cards.unit'))}</div>
</div>
<div class="stat-card">
<div class="stat-title">${escapeHTML(t('stats.uprightPct.title'))}</div>
<div class="stat-value">${((upright / totalCards) * 100).toFixed(0)}%</div>
<div class="stat-label">${escapeHTML(t('stats.orientation.unit', { n: upright }))}</div>
</div>
<div class="stat-card">
<div class="stat-title">${escapeHTML(t('stats.reversedPct.title'))}</div>
<div class="stat-value">${((reversed / totalCards) * 100).toFixed(0)}%</div>
<div class="stat-label">${escapeHTML(t('stats.orientation.unit', { n: reversed }))}</div>
</div>
<div class="stat-card">
<div class="stat-title">${escapeHTML(t('stats.favorites.title'))}</div>
<div class="stat-value">${favoriteCount}</div>
<div class="stat-label">${escapeHTML(t('stats.favorites.unit'))}</div>
</div>
<div class="stat-card">
<div class="stat-title">${escapeHTML(t('stats.avg.title'))}</div>
<div class="stat-value">${(totalCards / readingHistory.length).toFixed(1)}</div>
<div class="stat-label">${escapeHTML(t('stats.avg.unit'))}</div>
</div>
<div class="stat-card wide">
<div class="stat-title">${escapeHTML(t('stats.trend.title'))}</div>
<div class="trend-chart" role="img" aria-label="${escapeHTML(t('stats.trend.title') + '：' + monthCounts.map(mc => t('stats.trend.bar', { month: mc.key, n: mc.count })).join('、'))}">
${monthCounts.map(mc => `<div class="trend-bar" aria-hidden="true" style="height: ${Math.max((mc.count / maxMonthly) * 100, 2)}%"></div>`).join('')}
</div>
<div class="trend-labels">
<span>${monthCounts[0].key}</span>
<span>${monthCounts[monthCounts.length - 1].key}</span>
</div>
</div>
<div class="stat-card wide">
<div class="stat-title">${escapeHTML(t('stats.suits.title'))}</div>
<div class="pie-chart">
<canvas id="suitPieChart" class="pie-canvas" aria-hidden="true"></canvas>
<div class="pie-legend" id="suitLegend"></div>
</div>
</div>
<div class="stat-card wide">
<div class="stat-title">${escapeHTML(t('stats.topSpreads.title'))}</div>
<div class="stat-list">
${topSpreads.map(([name, count]) => `
<div class="stat-item">
<span class="stat-item-name">${escapeHTML(t(name))}</span>
<span class="stat-item-count">${escapeHTML(t('stats.item.count', { n: count, pct: ((count / readingHistory.length) * 100).toFixed(0) }))}</span>
</div>
`).join('')}
</div>
</div>
<div class="stat-card wide">
<div class="stat-title">${escapeHTML(t('stats.topCards.title'))}</div>
<div class="stat-list">
${topCards.map(([key, count]) => `
<div class="stat-item">
<span class="stat-item-name">${escapeHTML(statsCardNameByKey[key] || key)}</span>
<span class="stat-item-count">${escapeHTML(t('stats.item.count', { n: count, pct: ((count / totalCards) * 100).toFixed(1) }))}</span>
</div>
`).join('')}
</div>
</div>
`;
  drawPieChart('suitPieChart', suitCount, 'suitLegend');
}
function drawPieChart(canvasId, data, legendId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  if (!rect.width || !rect.height) return;
  const width = rect.width, height = rect.height;
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(centerX, centerY) - 20;
  const colors = ['#007aff', '#34c759', '#ff9500', '#ff3b30', '#af52de', '#5ac8fa'];
  const total = Object.values(data).reduce((a, b) => a + b, 0);
  let currentAngle = -Math.PI / 2;
  const entries = Object.entries(data);
  const neonColors = readNeonSuitColors(entries.map(([key]) => key));
  const colorFor = (key, index) => neonColors[key] || colors[index % colors.length];
  entries.forEach(([key, value], index) => {
    const sliceAngle = (value / total) * 2 * Math.PI;
    ctx.beginPath();
    ctx.fillStyle = colorFor(key, index);
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
<div class="pie-legend-color" style="background: ${colorFor(key, index)}"></div>
<span>${escapeHTML(t('stats.legend.item', { suit: t(suitNames[key] || key), n: value, pct: ((value / total) * 100).toFixed(0) }))}</span>
</div>
`).join('');
  }
}
