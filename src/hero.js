// 沉浸手勢的占卜首頁：疊起來的牌背（牌堆）往上滑就抽牌，與「開始占卜」按鈕做同一件事（按鈕一直都在）；
// 牌陣改用三個常用牌陣的方塊加上「更多」（打開原本的牌陣選單）。其他版型由樣式表隱藏這兩塊
import { t } from './i18n.js';
import { readBtn, spreadTypeEl } from './dom.js';
import { isReadBusy } from './reading.js';

const hero = document.getElementById('deckHero');
const stack = document.getElementById('deckHeroStack');
const hint = document.getElementById('deckHeroHint');
const tiles = Array.from(document.querySelectorAll('.spread-tile[data-spread]'));
const moreTile = document.getElementById('spreadTileMore');
const moreCurrent = document.getElementById('spreadTileCurrent');
// 往上滑超過這個距離，或甩得夠快，才抽牌
const DRAW_DISTANCE = 60;
const FLING_SPEED = 0.5;
const FLING_MIN = 24;

// 牌陣改變（選單、方塊、分享連結、換語言）時由 main.js 的 syncSpreadTrigger 呼叫
export function syncSpreadTiles() {
  const value = spreadTypeEl.value;
  const opt = spreadTypeEl.options[spreadTypeEl.selectedIndex];
  const common = tiles.some(b => b.dataset.spread === value);
  tiles.forEach(b => b.setAttribute('aria-pressed', b.dataset.spread === value));
  // 選的不是這三個常用牌陣時，「更多」方塊上寫出目前的牌陣
  if (moreCurrent) moreCurrent.textContent = common || !opt ? '' : opt.textContent;
  moreTile?.classList.toggle('is-current', !common);
  if (hint && opt) hint.textContent = t('hero.swipe', { spread: t(opt.dataset.spreadName) });
}
tiles.forEach(b => {
  b.addEventListener('click', () => {
    if (spreadTypeEl.value === b.dataset.spread) return;
    spreadTypeEl.value = b.dataset.spread;
    spreadTypeEl.dispatchEvent(new Event('change'));
  });
});
moreTile?.addEventListener('click', () => document.getElementById('spreadTypeButton').click());

// 觸覺回饋由抽牌流程本身給（選牌、翻出結果時），這裡不另外震動
function draw() {
  if (isReadBusy()) return;
  hero.classList.add('is-drawn');
  setTimeout(() => hero.classList.remove('is-drawn'), 600);
  readBtn.click();
}
let drag = null;
function setOffset(px) {
  if (px === null) hero.style.removeProperty('--hero-drag');
  else hero.style.setProperty('--hero-drag', `${px}px`);
}
function endDrag(e, cancelled) {
  if (!drag || e.pointerId !== drag.id) return;
  const d = drag;
  drag = null;
  hero.classList.remove('is-dragging');
  setOffset(null);
  if (cancelled) return;
  const up = d.y - e.clientY;
  // 速度取放開前最後一段移動，甩一下就能抽
  const speed = (d.prevY - e.clientY) / Math.max(1, e.timeStamp - d.prevT);
  if (up > DRAW_DISTANCE || (speed > FLING_SPEED && up > FLING_MIN)) draw();
}
if (hero && stack) {
  stack.addEventListener('pointerdown', (e) => {
    if (!e.isPrimary || (e.pointerType === 'mouse' && e.button !== 0)) return;
    drag = { id: e.pointerId, y: e.clientY, prevY: e.clientY, prevT: e.timeStamp, lastY: e.clientY, lastT: e.timeStamp };
    stack.setPointerCapture(e.pointerId);
    hero.classList.add('is-dragging');
  });
  stack.addEventListener('pointermove', (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    // 最上面那張只跟著手指往上（往下拉不動）
    setOffset(Math.min(0, e.clientY - drag.y));
    drag.prevY = drag.lastY;
    drag.prevT = drag.lastT;
    drag.lastY = e.clientY;
    drag.lastT = e.timeStamp;
  });
  stack.addEventListener('pointerup', (e) => endDrag(e, false));
  stack.addEventListener('pointercancel', (e) => endDrag(e, true));
}
