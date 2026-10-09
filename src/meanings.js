import { loadedMeaningTexts } from './lazy.js';

// 關鍵詞很小，首頁就載入；正逆位的完整牌義在 meaning-texts.js，打開卡片詳情、學習或逐張解讀時才載入
export const cardMeanings = {
  fool: {
    keywords: ['新開始', '冒險', '純真', '自由'],
    keywordsReversed: ['衝動', '輕率', '裹足不前', '有始無終']
  },
  magician: {
    keywords: ['意志', '技巧', '實現', '資源整合'],
    keywordsReversed: ['光說不練', '資源閒置', '話術', '操弄']
  },
  high_priestess: {
    keywords: ['直覺', '祕密', '靜觀', '內在智慧'],
    keywordsReversed: ['人云亦云', '表面知識', '隱情浮現', '壓抑感受']
  },
  empress: {
    keywords: ['豐盛', '滋養', '創造力', '感官'],
    keywordsReversed: ['付出見底', '窒息關愛', '創作卡住', '依賴']
  },
  emperor: {
    keywords: ['秩序', '權威', '結構', '責任'],
    keywordsReversed: ['專制', '僵化', '散漫', '界線鬆散']
  },
  hierophant: {
    keywords: ['傳統', '信仰', '指導', '體制'],
    keywordsReversed: ['打破常規', '教條化', '形式主義', '盲目叛逆']
  },
  lovers: {
    keywords: ['愛情', '結合', '選擇', '價值觀'],
    keywordsReversed: ['吸引消退', '誘惑', '內心拉扯', '言行不一']
  },
  chariot: {
    keywords: ['意志力', '勝利', '掌控', '前進'],
    keywordsReversed: ['方向失控', '動力潰散', '蠻幹', '對立']
  },
  strength: {
    keywords: ['勇氣', '柔韌', '耐心', '自制'],
    keywordsReversed: ['自我懷疑', '無力感', '情緒失控', '專橫']
  },
  hermit: {
    keywords: ['內省', '獨處', '尋道', '指引'],
    keywordsReversed: ['孤立', '拒絕幫助', '鑽牛角尖', '無暇靜心']
  },
  wheel_of_fortune: {
    keywords: ['轉變', '機運', '週期', '把握時機'],
    keywordsReversed: ['時運不濟', '計畫受阻', '抗拒改變', '循環重演']
  },
  justice: {
    keywords: ['公正', '真相', '因果', '責任'],
    keywordsReversed: ['偏頗', '諉過於人', '攬錯上身', '倉促論斷']
  },
  hanged_man: {
    keywords: ['暫停', '換位思考', '犧牲', '臣服'],
    keywordsReversed: ['拖延', '抗拒轉念', '委屈求全', '怨氣']
  },
  death: {
    keywords: ['結束', '轉化', '告別', '更新'],
    keywordsReversed: ['緊抓不放', '停滯', '轉變緩慢', '痛苦拉長']
  },
  temperance: {
    keywords: ['平衡', '調和', '耐心', '適度'],
    keywordsReversed: ['比例失調', '急於收成', '兩極擺盪', '顧此失彼']
  },
  devil: {
    keywords: ['束縛', '慾望', '成癮', '陰影'],
    keywordsReversed: ['鬆綁', '覺察', '轉入地下', '故態復萌']
  },
  tower: {
    keywords: ['劇變', '崩解', '真相', '覺醒'],
    keywordsReversed: ['裂縫漸大', '粉飾太平', '有驚無險', '內在崩塌']
  },
  star: {
    keywords: ['希望', '療癒', '靈感', '信心'],
    keywordsReversed: ['心灰意冷', '才思枯竭', '迷失初衷', '長期疲憊']
  },
  moon: {
    keywords: ['不安', '幻象', '潛意識', '迷惘'],
    keywordsReversed: ['撥雲見日', '誤會澄清', '內在焦慮', '壓抑恐懼']
  },
  sun: {
    keywords: ['喜悅', '成功', '活力', '清晰'],
    keywordsReversed: ['成果延遲', '過度樂觀', '刻意低調', '精力不濟']
  },
  judgement: {
    keywords: ['召喚', '重生', '總結', '寬恕'],
    keywordsReversed: ['壓抑心聲', '過度自責', '逃避過去', '時機未到']
  },
  world: {
    keywords: ['完成', '圓滿', '整合', '成就'],
    keywordsReversed: ['功虧一簣', '抄捷徑', '懸而未決', '忽略收尾']
  },
  ace_of_wands: {
    keywords: ['靈感', '開創', '熱情', '潛能'],
    keywordsReversed: ['提不起勁', '時機未到', '多頭分散', '方向不明']
  },
  two_of_wands: {
    keywords: ['規劃', '遠見', '抉擇', '企圖心'],
    keywordsReversed: ['一再延後', '貪戀安穩', '盲目出走', '他人期待']
  },
  three_of_wands: {
    keywords: ['展望', '擴張', '遠行', '等待回報'],
    keywordsReversed: ['進展遲緩', '合作受阻', '思慮不周', '不敢出手']
  },
  four_of_wands: {
    keywords: ['慶祝', '歸屬', '里程碑', '安家'],
    keywordsReversed: ['好事遲來', '家庭摩擦', '格格不入', '過渡期']
  },
  five_of_wands: {
    keywords: ['競爭', '摩擦', '切磋', '意見分歧'],
    keywordsReversed: ['暗中較勁', '隱忍不言', '衝突升級', '紛爭平息']
  },
  six_of_wands: {
    keywords: ['勝利', '公開認可', '好消息', '自信'],
    keywordsReversed: ['功勞被搶', '結果延宕', '患得患失', '憂心背叛']
  },
  seven_of_wands: {
    keywords: ['堅守立場', '以寡敵眾', '勇氣', '防衛'],
    keywordsReversed: ['疲於應戰', '邊守邊退', '草木皆兵', '適時讓出']
  },
  eight_of_wands: {
    keywords: ['迅速', '消息', '加速進展', '順勢'],
    keywordsReversed: ['延誤', '操之過急', '誤會', '嫉妒爭吵']
  },
  nine_of_wands: {
    keywords: ['韌性', '戒備', '最後一哩', '帶傷前進'],
    keywordsReversed: ['精疲力竭', '萌生退意', '多疑防人', '拒人於外']
  },
  ten_of_wands: {
    keywords: ['重擔', '責任', '超載', '硬撐'],
    keywordsReversed: ['學會拒絕', '放手分工', '撐到崩潰', '成為瓶頸']
  },
  page_of_wands: {
    keywords: ['躍躍欲試', '探索', '新消息', '熱忱'],
    keywordsReversed: ['半途而廢', '壞消息', '猶豫不決', '說話不算']
  },
  knight_of_wands: {
    keywords: ['冒險', '衝勁', '遠行', '魅力'],
    keywordsReversed: ['魯莽躁進', '行程中斷', '煩躁不安', '來去匆匆']
  },
  queen_of_wands: {
    keywords: ['自信', '魅力', '溫暖', '能幹'],
    keywordsReversed: ['畏縮', '強勢掌控', '嫉妒', '心力耗盡']
  },
  king_of_wands: {
    keywords: ['願景', '領導', '魄力', '擔當'],
    keywordsReversed: ['專斷獨行', '嚴苛刻板', '好高騖遠', '不敢出頭']
  },
  ace_of_cups: {
    keywords: ['心意滿溢', '新感情', '真心', '滋養'],
    keywordsReversed: ['情感阻塞', '心門緊閉', '自我照顧', '情緒不穩']
  },
  two_of_cups: {
    keywords: ['相互吸引', '對等交流', '締結', '和解'],
    keywordsReversed: ['付出失衡', '溝通斷線', '信任裂痕', '承諾延遲']
  },
  three_of_cups: {
    keywords: ['歡聚', '友誼', '分享喜悅', '互相扶持'],
    keywordsReversed: ['狂歡逃避', '八卦是非', '第三者', '疏離孤單']
  },
  four_of_cups: {
    keywords: ['意興闌珊', '內省', '視而不見', '倦怠'],
    keywordsReversed: ['重燃興趣', '走出殼外', '情感麻痺', '退縮加深']
  },
  five_of_cups: {
    keywords: ['失落', '哀傷', '懊悔', '仍有所存'],
    keywordsReversed: ['接受失去', '原諒', '重新連結', '自責']
  },
  six_of_cups: {
    keywords: ['懷舊', '純真', '善意', '舊人重逢'],
    keywordsReversed: ['困在過去', '美化往昔', '舊傷浮現', '展望未來']
  },
  seven_of_cups: {
    keywords: ['幻想', '選項紛雜', '一廂情願', '迷惑'],
    keywordsReversed: ['收斂選項', '化為行動', '逃避現實', '沉迷空想']
  },
  eight_of_cups: {
    keywords: ['轉身離開', '追尋意義', '放下', '幻滅'],
    keywordsReversed: ['戀棧不去', '一走了之', '重新投入', '害怕未知']
  },
  nine_of_cups: {
    keywords: ['心願達成', '滿足', '享受', '自得'],
    keywordsReversed: ['過度享樂', '驕矜炫耀', '內在空虛', '事與願違']
  },
  ten_of_cups: {
    keywords: ['家庭和樂', '情感圓滿', '歸屬', '長久幸福'],
    keywordsReversed: ['貌合神離', '願景分歧', '理想過高', '隱忍積怨']
  },
  page_of_cups: {
    keywords: ['童心', '靈感', '柔軟', '好消息'],
    keywordsReversed: ['幼稚任性', '只想不做', '一廂情願', '甜言蜜語']
  },
  knight_of_cups: {
    keywords: ['邀約', '浪漫', '隨心而行', '真誠'],
    keywordsReversed: ['不切實際', '忽冷忽熱', '空頭承諾', '虛情假意']
  },
  queen_of_cups: {
    keywords: ['同理', '直覺', '奉獻', '傾聽'],
    keywordsReversed: ['界線模糊', '攬下情緒', '多愁善感', '以情操控']
  },
  king_of_cups: {
    keywords: ['沉穩', '情緒成熟', '寬厚', '調解'],
    keywordsReversed: ['壓抑疏離', '突然爆發', '軟性施壓', '兩面手法']
  },
  ace_of_swords: {
    keywords: ['清晰', '真相', '突破', '決斷'],
    keywordsReversed: ['思緒混亂', '判斷受阻', '以理壓人', '空有想法']
  },
  two_of_swords: {
    keywords: ['僵局', '兩難', '迴避', '休戰'],
    keywordsReversed: ['被迫表態', '資訊過載', '兩邊討好', '兩面說詞']
  },
  three_of_swords: {
    keywords: ['心碎', '悲傷', '分離', '真相刺痛'],
    keywordsReversed: ['傷口癒合', '反覆重播', '假裝沒事', '心神渙散']
  },
  four_of_swords: {
    keywords: ['休息', '復原', '退隱', '沉思'],
    keywordsReversed: ['停不下來', '透支倦怠', '久躲不出', '重回戰場']
  },
  five_of_swords: {
    keywords: ['衝突', '勝之不武', '代價', '挫敗'],
    keywordsReversed: ['尋求和解', '放下面子', '暗中記恨', '伺機扳回']
  },
  six_of_swords: {
    keywords: ['過渡', '離開', '渡河', '療癒'],
    keywordsReversed: ['進退受阻', '放不下', '包袱過重', '話未說清']
  },
  seven_of_swords: {
    keywords: ['欺瞞', '策略', '獨行', '僥倖'],
    keywordsReversed: ['真相曝光', '自欺欺人', '怕被揭穿', '良言相勸']
  },
  eight_of_swords: {
    keywords: ['受困', '自我設限', '無力感', '恐懼'],
    keywordsReversed: ['看見出路', '重拾勇氣', '恐慌加深', '完全停擺']
  },
  nine_of_swords: {
    keywords: ['焦慮', '失眠', '惡夢', '自責'],
    keywordsReversed: ['睡眠回穩', '開口求助', '暗自煎熬', '自我定罪']
  },
  ten_of_swords: {
    keywords: ['結束', '觸底', '背叛', '黎明前'],
    keywordsReversed: ['谷底回升', '逐步重建', '苦苦挽回', '短暫喘息']
  },
  page_of_swords: {
    keywords: ['觀察', '機警', '求知', '查證'],
    keywordsReversed: ['說長道短', '窺探隱私', '尖酸批評', '輕率轉傳']
  },
  knight_of_swords: {
    keywords: ['果斷', '衝刺', '雄辯', '敏捷'],
    keywordsReversed: ['口不擇言', '多頭亂衝', '揮霍資源', '後繼無力']
  },
  queen_of_swords: {
    keywords: ['清醒', '獨立', '直言', '界線'],
    keywordsReversed: ['刻薄', '冷漠疏離', '違心附和', '苦澀怨懟']
  },
  king_of_swords: {
    keywords: ['權威', '判斷', '原則', '公正'],
    keywordsReversed: ['冷酷無情', '以權壓人', '優柔寡斷', '假公濟私']
  },
  ace_of_pentacles: {
    keywords: ['實在機會', '新資源', '播種', '穩固起點'],
    keywordsReversed: ['錯失良機', '準備不足', '成本失算', '只顧眼前']
  },
  two_of_pentacles: {
    keywords: ['兩頭兼顧', '彈性調度', '節奏', '應變'],
    keywordsReversed: ['分身乏術', '強顏歡笑', '接連失手', '學會取捨']
  },
  three_of_pentacles: {
    keywords: ['團隊合作', '專業技藝', '被看見', '分工'],
    keywordsReversed: ['各自為政', '草率交差', '搭便車', '獨攬不放']
  },
  four_of_pentacles: {
    keywords: ['守成', '紀律', '安全感', '緊握'],
    keywordsReversed: ['吝嗇', '情感緊縮', '鬆手分享', '揮霍無度']
  },
  five_of_pentacles: {
    keywords: ['匱乏', '困頓', '孤立', '求援'],
    keywordsReversed: ['逐漸好轉', '接受援手', '餘悸猶存', '不敢伸手']
  },
  six_of_pentacles: {
    keywords: ['施與受', '慷慨', '公平分配', '互助'],
    keywordsReversed: ['附帶條件', '單向索取', '施恩自傲', '自尊拒助']
  },
  seven_of_pentacles: {
    keywords: ['耐心等待', '評估', '長期投入', '收成前'],
    keywordsReversed: ['揠苗助長', '輕言放棄', '執迷加碼', '焦躁猜疑']
  },
  eight_of_pentacles: {
    keywords: ['精進', '專注', '手藝', '勤勉'],
    keywordsReversed: ['完美主義', '過勞', '敷衍了事', '急功近利']
  },
  nine_of_pentacles: {
    keywords: ['豐收', '自足', '獨立', '從容'],
    keywordsReversed: ['表面光鮮', '入不敷出', '計畫落空', '無暇享受']
  },
  ten_of_pentacles: {
    keywords: ['家族傳承', '長久財富', '根基', '世代'],
    keywordsReversed: ['家產糾紛', '財務動盪', '孤注一擲', '家族包袱']
  },
  page_of_pentacles: {
    keywords: ['勤學', '務實起步', '新技能', '踏實規劃'],
    keywordsReversed: ['紙上談兵', '虎頭蛇尾', '好高騖遠', '亂花錢']
  },
  knight_of_pentacles: {
    keywords: ['穩健', '負責', '按部就班', '耐力'],
    keywordsReversed: ['一成不變', '拖延懶散', '固執己見', '草率粗心']
  },
  queen_of_pentacles: {
    keywords: ['務實照顧', '滋養', '持家', '安穩'],
    keywordsReversed: ['掏空自己', '過度干涉', '猜疑不安', '內外失衡']
  },
  king_of_pentacles: {
    keywords: ['事業有成', '富足', '穩重', '善於經營'],
    keywordsReversed: ['唯利是圖', '金錢控制', '腐敗', '剛愎自用']
  }
};

// 依這次抽到的正逆位取關鍵詞；逆位牌一律顯示逆位關鍵詞
export function keywordsFor(nameKey, orientation) {
  const m = cardMeanings[nameKey];
  if (!m) return [];
  return orientation === 'reversed' && m.keywordsReversed && m.keywordsReversed.length ? m.keywordsReversed : m.keywords;
}
// 完整牌義還沒載入時回傳空字串；呼叫端先 await loadMeaningTexts() 再畫
export function cardMeaningText(card, orientation) {
  if (!card) return '';
  const texts = loadedMeaningTexts();
  const m = texts && texts.meaningTexts[card.nameKey];
  if (!m) return '';
  return orientation === 'reversed' ? m.reversed : m.upright;
}
