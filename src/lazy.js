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
let meaningTexts = null;
let contexts = null;
let refs = null;

// 正逆位的完整牌義（關鍵詞在 meanings.js，首頁就有）
export const loadMeaningTexts = loader(() => import('./meaning-texts.js'), (m) => { meaningTexts = m; });
export const loadLore = loader(() => import('./lore.js'), (m) => { lore = m; });
export const loadContexts = loader(() => import('./contexts.js'), (m) => { contexts = m; });
// 其他牌系的名稱、日期對應、相關的牌與符號索引（卡片詳情的源流分頁、資料庫的符號分段與比較）
export const loadRefs = loader(() => import('./card-refs.js'), (m) => { refs = m; });
export const loadChangelog = loader(() => import('./changelog.js'), () => {});
// 線稿牌組約占程式量的一半，只有線稿模式才需要；Service Worker 仍會預先快取，離線切換也能用
export const loadDeck = loader(() => import('./deck.js'), (m) => { deck = m; });

// 已載入才有值，給只能同步取用的地方使用
export const loadedLore = () => lore;
export const loadedDeck = () => deck;
export const loadedMeaningTexts = () => meaningTexts;
export const loadedContexts = () => contexts;
export const loadedRefs = () => refs;

// 第一次畫面完成後，趁空檔預先載入卡片詳情會用到的資料；失敗就算了，打開卡片詳情時會再試並顯示狀態
export function prefetchWhenIdle() {
  const run = () => {
    loadMeaningTexts().catch(() => {});
    loadLore().catch(() => {});
    loadContexts().catch(() => {});
    loadRefs().catch(() => {});
  };
  if (window.requestIdleCallback) window.requestIdleCallback(run, { timeout: 4000 });
  else setTimeout(run, 2000);
}
