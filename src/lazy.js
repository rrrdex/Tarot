// 大型資料另外打包成獨立檔案，首頁不必先下載。
// 成功的載入記住同一個 Promise，重複呼叫只載入一次；失敗的不保留，下次呼叫會重新 import()。
// 呼叫端負責處理失敗（顯示「需要網路」或提供重新整理），這裡不吞掉錯誤
function loader(load, onLoad) {
  let pending = null;
  return () => {
    if (!pending) {
      pending = load().then((m) => {
        onLoad(m);
        return m;
      }, (err) => {
        pending = null;
        throw err;
      });
    }
    return pending;
  };
}
let lore = null;
let deck = null;

export const loadLore = loader(() => import('./lore.js'), (m) => { lore = m; });
export const loadContexts = loader(() => import('./contexts.js'), () => {});
export const loadChangelog = loader(() => import('./changelog.js'), () => {});
// 線稿牌組約占程式量的一半，只有線稿模式才需要；Service Worker 仍會預先快取，離線切換也能用
export const loadDeck = loader(() => import('./deck.js'), (m) => { deck = m; });

// 已載入才有值，給只能同步取用的地方使用
export const loadedLore = () => lore;
export const loadedDeck = () => deck;

// 第一次畫面完成後，趁空檔預先載入卡片詳情會用到的資料；失敗就算了，打開卡片詳情時會再試並顯示狀態
export function prefetchWhenIdle() {
  const run = () => {
    loadLore().catch(() => {});
    loadContexts().catch(() => {});
  };
  if (window.requestIdleCallback) window.requestIdleCallback(run, { timeout: 4000 });
  else setTimeout(run, 2000);
}
