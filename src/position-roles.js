// 牌陣裡哪些牌位的讀法接近「建議」「阻礙」「結果」：逐張解讀在這些牌位多附一段這張牌放在這種位置的讀法
// （contexts.js 的 positions）。手工挑選，只收意思確實相符的牌位；其餘牌位回傳 null
const ROLES = {
  advice: ['single.0', 'path.2', 'goal.3', 'prosCons.4', 'conflict.4', 'career.5', 'wealth.4', 'horseshoe.5', 'fullmoon.4', 'newmoon.4', 'dream.3', 'selfDiscovery.4', 'shadow.3', 'hexagram.3', 'reunion.6', 'newLove.4', 'exam.4', 'interview.4'],
  obstacle: ['path.1', 'goal.1', 'relationship.3', 'celtic.1', 'yesno.1', 'loveCross.3', 'career.4', 'horseshoe.3', 'wealth.2', 'feelings.3', 'prosCons.1', 'prosCons.3', 'reunion.3', 'newLove.3', 'exam.1', 'interview.2'],
  // 凱爾特十字第六張是「即將起作用的近期影響」（偉特 1911），不是結局，所以不列入結果
  outcome: ['three.2', 'path.3', 'twoChoice.3', 'twoChoice.4', 'goal.4', 'celtic.9', 'yesno.2', 'loveCross.5', 'horseshoe.6', 'relationship.4', 'feelings.4', 'hexagram.6', 'reunion.5', 'threeChoice.4', 'threeChoice.5', 'threeChoice.6']
};
const ROLE_OF = new Map(Object.entries(ROLES).flatMap(([role, keys]) => keys.map(k => {
  const [spread, n] = k.split('.');
  return [`spread.${spread}.pos.${n}`, role];
})));
// posKey：牌位的字串鍵，例如 'spread.celtic.pos.1'
export function positionRole(posKey) {
  return ROLE_OF.get(posKey) || null;
}
