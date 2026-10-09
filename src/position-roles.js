// 牌陣裡哪些牌位的讀法接近「建議」「阻礙」「結果」：逐張解讀在這些牌位多附一段這張牌放在這種位置的讀法
// （contexts.js 的 positions）。手工挑選，只收意思確實相符的牌位；其餘牌位回傳 null
const ROLES = {
  advice: ['single.0', 'path.2', 'goal.3', 'prosCons.4', 'conflict.4', 'career.5', 'wealth.4', 'horseshoe.5', 'fullmoon.4'],
  obstacle: ['path.1', 'goal.1', 'relationship.3', 'celtic.1', 'yesno.1', 'loveCross.3', 'career.4', 'horseshoe.3'],
  outcome: ['three.2', 'path.3', 'twoChoice.3', 'twoChoice.4', 'goal.4', 'celtic.5', 'celtic.9', 'yesno.2', 'loveCross.5', 'horseshoe.6']
};
const ROLE_OF = new Map(Object.entries(ROLES).flatMap(([role, keys]) => keys.map(k => {
  const [spread, n] = k.split('.');
  return [`spread.${spread}.pos.${n}`, role];
})));
// posKey：牌位的字串鍵，例如 'spread.celtic.pos.1'
export function positionRole(posKey) {
  return ROLE_OF.get(posKey) || null;
}
