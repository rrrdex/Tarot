// 新版型的視窗在窄螢幕是底部抽屜：按住標題列（把手）往下拖可以關閉。
// 只聽標題列，不搶視窗內容的捲動；拖得夠遠或甩得夠快才關，否則彈回。
// 關閉一律交給呼叫端給的 dismiss（與 Esc、點遮罩相同的路徑），焦點歸還照舊
import { isNewTemplate } from './template.js';

const SHEET_MQ = window.matchMedia('(max-width: 767.98px)');
// 開始拖曳前允許的抖動；超過這個距離且以垂直往下為主才算拖曳
const START_SLOP = 6;
// 放開時：拖過視窗高度的這個比例（最多 DISMISS_MAX px）就關閉，或速度超過 FLING_SPEED px/ms
const DISMISS_RATIO = 0.3;
const DISMISS_MAX = 160;
const FLING_SPEED = 0.6;
const FLING_MIN = 30;

function isSheet(overlay) {
  return isNewTemplate() && SHEET_MQ.matches && overlay.classList.contains('show');
}
function bindSheet(overlay, dismiss) {
  const modal = overlay.querySelector('.modal');
  const header = modal && modal.querySelector('.modal-header');
  if (!header) return;
  let drag = null;
  const setOffset = (px) => {
    if (px === null) modal.style.removeProperty('--sheet-drag');
    else modal.style.setProperty('--sheet-drag', `${px}px`);
  };
  const end = (e, cancelled) => {
    if (!drag || (e && e.pointerId !== drag.id)) return;
    const d = drag;
    drag = null;
    if (!d.active) return;
    modal.classList.remove('is-dragging');
    if (header.hasPointerCapture(d.id)) header.releasePointerCapture(d.id);
    const dy = Math.max(0, d.lastY - d.y);
    const dt = Math.max(1, d.lastT - d.prevT);
    const speed = (d.lastY - d.prevY) / dt;
    const far = dy > Math.min(DISMISS_MAX, modal.offsetHeight * DISMISS_RATIO);
    const fling = speed > FLING_SPEED && dy > FLING_MIN;
    // 拉回原位或滑出畫面都由樣式表的轉場完成（減少動態時瞬間到位）
    setOffset(null);
    if (!cancelled && (far || fling)) dismiss(overlay);
  };
  header.addEventListener('pointerdown', (e) => {
    if (!isSheet(overlay) || !e.isPrimary) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    drag = { id: e.pointerId, x: e.clientX, y: e.clientY, prevY: e.clientY, lastY: e.clientY, prevT: e.timeStamp, lastT: e.timeStamp, active: false };
  });
  header.addEventListener('pointermove', (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    const dx = e.clientX - drag.x;
    const dy = e.clientY - drag.y;
    if (!drag.active) {
      if (dy > START_SLOP && dy > Math.abs(dx)) {
        // 確定是往下拖才捕捉指標：單純點標題列上的按鈕（關閉、牌面縮圖）照常觸發
        drag.active = true;
        header.setPointerCapture(e.pointerId);
        modal.classList.add('is-dragging');
      } else if (Math.abs(dx) > START_SLOP * 2 || dy < -START_SLOP * 2) {
        drag = null;
        return;
      } else return;
    }
    e.preventDefault();
    drag.prevY = drag.lastY;
    drag.prevT = drag.lastT;
    drag.lastY = e.clientY;
    drag.lastT = e.timeStamp;
    setOffset(Math.max(0, dy));
  });
  header.addEventListener('pointerup', (e) => end(e, false));
  header.addEventListener('pointercancel', (e) => end(e, true));
  // 指標捕捉意外被拿走（例如視窗被別的方式關掉）時彈回原位。
  // 拖曳中指標被標題列捕捉，放開時的 click 落在標題列上，不會誤按到關閉鈕
  header.addEventListener('lostpointercapture', (e) => end(e, true));
}
// main.js 的 init 呼叫；dismiss(overlay) 與 Esc、點遮罩關閉視窗是同一個函式
export function initSheetGestures(dismiss) {
  document.querySelectorAll('.modal-overlay:not(.card-viewer)').forEach(overlay => bindSheet(overlay, dismiss));
}
