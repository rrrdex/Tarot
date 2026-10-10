// 占卜表單的「主題」：選了以後，逐張解讀直接列出每張牌在這個主題、抽到這一面的讀法。
// 六個大類（love…growth）對應卡片詳情的六個情境；細分主題的文字在 card-guide.js 的 topics
export const DOMAINS = ['love', 'career', 'wealth', 'wellbeing', 'study', 'growth'];
export const TOPIC_GROUPS = [
  { label: 'topic.group.love', keys: ['love', 'loveNew', 'loveCouple', 'loveFeelings', 'loveReunion'] },
  { label: 'topic.group.career', keys: ['career', 'careerSeek', 'careerChange'] },
  { label: 'topic.group.wealth', keys: ['wealth', 'wealthInvest'] },
  { label: 'topic.group.other', keys: ['wellbeing', 'study', 'growth'] }
];
export const SUBTOPICS = { love: ['loveNew', 'loveCouple', 'loveFeelings', 'loveReunion'], career: ['careerSeek', 'careerChange'], wealth: ['wealthInvest'] };
const ALL = new Set(TOPIC_GROUPS.flatMap(g => g.keys));
export function isTopic(v) {
  return typeof v === 'string' && ALL.has(v);
}
