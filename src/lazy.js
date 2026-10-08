// 大型資料另外打包成獨立檔案，首頁不必先下載；import() 本身會快取，重複呼叫只載入一次
let lore = null;

export const loadLore = () => import('./lore.js').then(m => (lore = m));
export const loadContexts = () => import('./contexts.js');
export const loadChangelog = () => import('./changelog.js');
// 線稿牌組約占程式量的一半，只有線稿模式才需要；Service Worker 仍會預先快取，離線切換也能用
let deck = null;
export const loadDeck = () => import('./deck.js').then(m => (deck = m));

// 已載入才有值，給只能同步取用的地方使用
export const loadedLore = () => lore;
export const loadedDeck = () => deck;

export function prefetchWhenIdle() {
  const idle = window.requestIdleCallback || (cb => setTimeout(cb, 2000));
  idle(() => {
    loadLore();
    loadContexts();
  });
}
