/* i18n.js */
const I18N_KEY = 'lang';
const I18N_FALLBACK = 'zh';
const uiStrings = {
zh: {
'app.title': '塔羅占卜',
'app.name': '塔羅',
'app.themeToggle.toDark': '切換至深色主題',
'app.themeToggle.toLight': '切換至淺色主題',
'app.themeToggle.title': '切換主題 (T)',
'app.langSwitch.label': '切換語言：{lang}',
'app.skipToMain': '跳到主要內容',
'app.hero.title': '探索內心的指引',
'app.hero.subtitle': '簡潔直覺的占卜體驗，專注於當下的洞察',
'app.share.text': '查看我的占卜結果',
'app.share.imageFooter': '僅供參考 · 塔羅占卜工具',
'footer.about.title': '關於',
'footer.about.desc': '純粹的占卜工具，專注於呈現牌卡結果。所有資料僅存於您的裝置，完全私密。',
'footer.info.title': '資訊',
'footer.link.about': '關於本站',
'footer.link.privacy': '隱私政策',
'footer.copyright': '塔羅占卜工具 · 僅供參考使用',
'tab.reading': '占卜',
'tab.history': '記錄',
'tab.statistics': '統計',
'tab.database': '資料庫',
'tab.learn': '學習',
'tab.settings': '設定',
'reading.daily.label': '每日一牌',
'reading.daily.title': '每日一牌 · {m}月{d}日',
'reading.question.label': '你的問題',
'reading.question.placeholder': '例如：目前最需要專注的方向？',
'reading.deck.label': '牌組',
'reading.spread.label': '牌陣',
'reading.spreadInfo.title': '關於此牌陣',
'reading.spreadInfo.positions': '牌位說明',
'reading.results.title': '你的占卜',
'pick.title': '憑直覺選牌',
'pick.hint': '靜心想著你的問題，選出 <strong>{n}</strong> 張牌',
'pick.progress': '已選 {n} / {total}',
'pick.cardBack': '第 {n} 張牌背',
'pick.random': '隨機快選',
'pick.reshuffle': '重新洗牌',
'deck.full': '完整牌組 (78張)',
'deck.major': '大阿卡納 (22張)',
'deck.minor': '小阿卡納 (56張)',
'deck.court': '宮廷牌 (16張)',
'deck.numbered': '數字牌 (40張)',
'spread.group.basic': '基礎指引',
'spread.group.time': '時間運勢',
'spread.group.love': '感情人際',
'spread.group.career': '抉擇事業',
'spread.group.self': '自我探索',
'spread.group.advanced': '進階經典',
'spread.bottom': '底牌',
'spread.unknown': '未知牌陣',
'spread.picker.title': '選擇牌陣',
'spread.picker.count': '{n} 張',
'spread.single.name': '單張牌指引',
'spread.single.label': '單張牌',
'spread.single.desc': '最簡單直接的牌陣，適合日常指引或快速問答。',
'spread.single.pos.0': '核心指引',
'spread.yesno.name': '是非指引',
'spread.yesno.label': '是非指引',
'spread.yesno.desc': '針對是非題的快速牌陣，綜合三張牌的能量與正逆位判斷答案的傾向。',
'spread.yesno.pos.0': '支持的力量',
'spread.yesno.pos.1': '阻礙的力量',
'spread.yesno.pos.2': '結果傾向',
'spread.three.name': '聖三角',
'spread.three.label': '聖三角',
'spread.three.desc': '經典三張牌時間線，呈現事件發展脈絡。',
'spread.three.pos.0': '過去',
'spread.three.pos.1': '現在',
'spread.three.pos.2': '未來',
'spread.mbs.name': '身心靈牌陣',
'spread.mbs.label': '身心靈',
'spread.mbs.desc': '身心靈整體檢視，觀察平衡狀態。',
'spread.mbs.pos.0': '心態',
'spread.mbs.pos.1': '身體',
'spread.mbs.pos.2': '靈性',
'spread.path.name': '抉擇之路',
'spread.path.label': '抉擇之路',
'spread.path.desc': '四步驟路徑牌陣，釐清完整流程。',
'spread.path.pos.0': '問題',
'spread.path.pos.1': '挑戰',
'spread.path.pos.2': '方向',
'spread.path.pos.3': '結果',
'spread.weekly.name': '週運勢',
'spread.weekly.label': '週運勢',
'spread.weekly.desc': '週運勢，含整週基調與每日提示。',
'spread.weekly.pos.0': '主題',
'spread.weekly.pos.1': '週一',
'spread.weekly.pos.2': '週二',
'spread.weekly.pos.3': '週三',
'spread.weekly.pos.4': '週四',
'spread.weekly.pos.5': '週五',
'spread.weekly.pos.6': '週六',
'spread.weekly.pos.7': '週日',
'spread.monthly.name': '月運勢',
'spread.monthly.label': '月運勢',
'spread.monthly.desc': '月運勢，含整月基調與每週能量提示。',
'spread.monthly.pos.0': '本月主題',
'spread.monthly.pos.1': '第一週',
'spread.monthly.pos.2': '第二週',
'spread.monthly.pos.3': '第三週',
'spread.monthly.pos.4': '第四週',
'spread.quarterly.name': '季度展望',
'spread.quarterly.label': '季度展望',
'spread.quarterly.desc': '以四季觀察全年能量流動。',
'spread.quarterly.pos.0': '春季',
'spread.quarterly.pos.1': '夏季',
'spread.quarterly.pos.2': '秋季',
'spread.quarterly.pos.3': '冬季',
'spread.yearly.name': '年度主題',
'spread.yearly.label': '年度主題',
'spread.yearly.desc': '年度主題加各月重點。',
'spread.yearly.pos.0': '總主題',
'spread.yearly.pos.1': '一月',
'spread.yearly.pos.2': '二月',
'spread.yearly.pos.3': '三月',
'spread.yearly.pos.4': '四月',
'spread.yearly.pos.5': '五月',
'spread.yearly.pos.6': '六月',
'spread.yearly.pos.7': '七月',
'spread.yearly.pos.8': '八月',
'spread.yearly.pos.9': '九月',
'spread.yearly.pos.10': '十月',
'spread.yearly.pos.11': '十一月',
'spread.yearly.pos.12': '十二月',
'spread.newmoon.name': '新月啟程',
'spread.newmoon.label': '新月啟程',
'spread.newmoon.desc': '新月是設定意圖的時刻，此牌陣協助釐清新週期的目標與實現路徑。',
'spread.newmoon.pos.0': '新月意圖',
'spread.newmoon.pos.1': '內在資源',
'spread.newmoon.pos.2': '外在助力',
'spread.newmoon.pos.3': '需要放下',
'spread.newmoon.pos.4': '顯化方向',
'spread.fullmoon.name': '滿月釋放',
'spread.fullmoon.label': '滿月釋放',
'spread.fullmoon.desc': '滿月是回顧與釋放的時刻，檢視這個週期的完成、收穫與該放下的事物。',
'spread.fullmoon.pos.0': '已然圓滿',
'spread.fullmoon.pos.1': '未竟之事',
'spread.fullmoon.pos.2': '需要釋放',
'spread.fullmoon.pos.3': '收穫果實',
'spread.fullmoon.pos.4': '下一步',
'spread.relationship.name': '關係牌陣',
'spread.relationship.label': '關係牌陣',
'spread.relationship.desc': '關係探索，呈現雙方視角。',
'spread.relationship.pos.0': '你的觀點',
'spread.relationship.pos.1': '對方觀點',
'spread.relationship.pos.2': '現況',
'spread.relationship.pos.3': '挑戰',
'spread.relationship.pos.4': '潛力',
'spread.feelings.name': '對方心意',
'spread.feelings.label': '對方心意',
'spread.feelings.desc': '探索對方對你的心意，從表面到內心逐層解讀。',
'spread.feelings.pos.0': '表面態度',
'spread.feelings.pos.1': '內心真實感受',
'spread.feelings.pos.2': '對關係的期待',
'spread.feelings.pos.3': '猶豫與顧慮',
'spread.feelings.pos.4': '可能的行動',
'spread.loveCross.name': '愛情十字',
'spread.loveCross.label': '愛情十字',
'spread.loveCross.desc': '愛情十字牌陣，全面檢視一段感情的內外動態與走向。',
'spread.loveCross.pos.0': '你的狀態',
'spread.loveCross.pos.1': '對方的狀態',
'spread.loveCross.pos.2': '關係現況',
'spread.loveCross.pos.3': '關係的阻礙',
'spread.loveCross.pos.4': '關係的助力',
'spread.loveCross.pos.5': '發展方向',
'spread.conflict.name': '衝突化解',
'spread.conflict.label': '衝突化解',
'spread.conflict.desc': '梳理人際衝突的成因與雙方視角，尋找和解的可能。',
'spread.conflict.pos.0': '衝突的根源',
'spread.conflict.pos.1': '你的立場',
'spread.conflict.pos.2': '對方的立場',
'spread.conflict.pos.3': '彼此的共同點',
'spread.conflict.pos.4': '化解之道',
'spread.twoChoice.name': '二擇一',
'spread.twoChoice.label': '二擇一',
'spread.twoChoice.desc': '比較兩個選擇的過程與結果。',
'spread.twoChoice.pos.0': '現況',
'spread.twoChoice.pos.1': '選項A過程',
'spread.twoChoice.pos.2': '選項B過程',
'spread.twoChoice.pos.3': '選項A結果',
'spread.twoChoice.pos.4': '選項B結果',
'spread.prosCons.name': '優劣分析',
'spread.prosCons.label': '優劣分析',
'spread.prosCons.desc': '優劣分析，客觀呈現正反面。',
'spread.prosCons.pos.0': '選項A優點',
'spread.prosCons.pos.1': '選項A缺點',
'spread.prosCons.pos.2': '選項B優點',
'spread.prosCons.pos.3': '選項B缺點',
'spread.prosCons.pos.4': '核心提示',
'spread.goal.name': '目標達成牌陣',
'spread.goal.label': '目標達成',
'spread.goal.desc': '目標達成的五個關鍵面向。',
'spread.goal.pos.0': '核心',
'spread.goal.pos.1': '阻礙',
'spread.goal.pos.2': '資源',
'spread.goal.pos.3': '步驟',
'spread.goal.pos.4': '結果',
'spread.career.name': '職涯發展',
'spread.career.label': '職涯發展',
'spread.career.desc': '職涯全面分析，以塔羅視角檢視優劣勢、機會與挑戰。',
'spread.career.pos.0': '職涯現況',
'spread.career.pos.1': '你的優勢',
'spread.career.pos.2': '你的盲點',
'spread.career.pos.3': '外在機會',
'spread.career.pos.4': '潛在挑戰',
'spread.career.pos.5': '發展建議',
'spread.wealth.name': '財富流動',
'spread.wealth.label': '財富流動',
'spread.wealth.desc': '檢視金錢能量的流動，找出開源與節流的方向。',
'spread.wealth.pos.0': '財務現況',
'spread.wealth.pos.1': '財富的來源',
'spread.wealth.pos.2': '金錢的流失',
'spread.wealth.pos.3': '財務機會',
'spread.wealth.pos.4': '理財建議',
'spread.chakra.name': '脈輪牌陣',
'spread.chakra.label': '脈輪牌陣',
'spread.chakra.desc': '七脈輪能量檢視。',
'spread.chakra.pos.0': '海底輪',
'spread.chakra.pos.1': '臍輪',
'spread.chakra.pos.2': '太陽神經叢',
'spread.chakra.pos.3': '心輪',
'spread.chakra.pos.4': '喉輪',
'spread.chakra.pos.5': '眉心輪',
'spread.chakra.pos.6': '頂輪',
'spread.elements.name': '四元素牌陣',
'spread.elements.label': '四元素',
'spread.elements.desc': '五元素平衡狀態。',
'spread.elements.pos.0': '火',
'spread.elements.pos.1': '水',
'spread.elements.pos.2': '風',
'spread.elements.pos.3': '土',
'spread.elements.pos.4': '靈',
'spread.selfDiscovery.name': '自我探索',
'spread.selfDiscovery.label': '自我探索',
'spread.selfDiscovery.desc': '向內探索表意識與潛意識的落差，認回被忽略的部分。',
'spread.selfDiscovery.pos.0': '表意識的你',
'spread.selfDiscovery.pos.1': '潛意識的你',
'spread.selfDiscovery.pos.2': '內在的需要',
'spread.selfDiscovery.pos.3': '被忽略的自己',
'spread.selfDiscovery.pos.4': '整合之道',
'spread.shadow.name': '陰影功課',
'spread.shadow.label': '陰影功課',
'spread.shadow.desc': '榮格式陰影功課，正視並轉化不願面對的內在面向。',
'spread.shadow.pos.0': '陰影的面貌',
'spread.shadow.pos.1': '陰影的成因',
'spread.shadow.pos.2': '它如何影響你',
'spread.shadow.pos.3': '接納的鑰匙',
'spread.shadow.pos.4': '轉化的力量',
'spread.dream.name': '夢境解析',
'spread.dream.label': '夢境解析',
'spread.dream.desc': '解讀夢境背後的潛意識訊息，以及它對現實生活的提醒。',
'spread.dream.pos.0': '夢境主題',
'spread.dream.pos.1': '潛意識訊息',
'spread.dream.pos.2': '與現實的關聯',
'spread.dream.pos.3': '夢的指引',
'spread.celtic.name': '凱爾特十字',
'spread.celtic.label': '凱爾特十字',
'spread.celtic.desc': '經典凱爾特十字，深入探索。',
'spread.celtic.pos.0': '核心',
'spread.celtic.pos.1': '阻礙',
'spread.celtic.pos.2': '根基',
'spread.celtic.pos.3': '過去',
'spread.celtic.pos.4': '目標',
'spread.celtic.pos.5': '未來',
'spread.celtic.pos.6': '態度',
'spread.celtic.pos.7': '環境',
'spread.celtic.pos.8': '希望與恐懼',
'spread.celtic.pos.9': '結果',
'spread.horseshoe.name': '馬蹄鐵牌陣',
'spread.horseshoe.label': '馬蹄鐵',
'spread.horseshoe.desc': '經典馬蹄鐵牌陣，七張牌完整鋪陳事件的來龍去脈與對策。',
'spread.horseshoe.pos.0': '過去',
'spread.horseshoe.pos.1': '現在',
'spread.horseshoe.pos.2': '隱藏的影響',
'spread.horseshoe.pos.3': '眼前的障礙',
'spread.horseshoe.pos.4': '周遭環境',
'spread.horseshoe.pos.5': '建議',
'spread.horseshoe.pos.6': '結果',
'spread.treeOfLife.name': '生命之樹',
'spread.treeOfLife.label': '生命之樹',
'spread.treeOfLife.desc': '卡巴拉生命之樹牌陣，以十個質點檢視生命的完整光譜。',
'spread.treeOfLife.pos.0': '王冠・靈性核心',
'spread.treeOfLife.pos.1': '智慧',
'spread.treeOfLife.pos.2': '理解',
'spread.treeOfLife.pos.3': '仁慈',
'spread.treeOfLife.pos.4': '力量',
'spread.treeOfLife.pos.5': '和諧',
'spread.treeOfLife.pos.6': '勝利・情感',
'spread.treeOfLife.pos.7': '宏光・心智',
'spread.treeOfLife.pos.8': '根基',
'spread.treeOfLife.pos.9': '王國・顯化',
'spread.astroHouses.name': '占星十二宮',
'spread.astroHouses.label': '占星十二宮',
'spread.astroHouses.desc': '占星十二宮牌陣，鳥瞰生活十二個領域的能量狀態。',
'spread.astroHouses.pos.0': '第一宮・自我',
'spread.astroHouses.pos.1': '第二宮・財務',
'spread.astroHouses.pos.2': '第三宮・溝通',
'spread.astroHouses.pos.3': '第四宮・家庭',
'spread.astroHouses.pos.4': '第五宮・創造',
'spread.astroHouses.pos.5': '第六宮・健康',
'spread.astroHouses.pos.6': '第七宮・伴侶',
'spread.astroHouses.pos.7': '第八宮・轉化',
'spread.astroHouses.pos.8': '第九宮・信念',
'spread.astroHouses.pos.9': '第十宮・事業',
'spread.astroHouses.pos.10': '第十一宮・人際',
'spread.astroHouses.pos.11': '第十二宮・潛意識',
'suit.major': '大阿卡納',
'suit.wands': '權杖',
'suit.cups': '聖杯',
'suit.swords': '寶劍',
'suit.pentacles': '錢幣',
'orientation.upright': '正位',
'orientation.reversed': '逆位',
'tendency.yes': '傾向是',
'tendency.no': '傾向否',
'tendency.unclear': '不明朗',
'history.title': '占卜記錄',
'history.filter.allSpreads': '所有牌陣',
'history.filter.allTags': '所有標籤',
'history.filter.favorite': '⭐ 收藏',
'history.clear': '清除記錄',
'history.empty': '尚無符合條件的記錄',
'history.item.favorite': '⭐ 收藏',
'history.item.unfavorite': '取消收藏',
'stats.title': '統計分析',
'stats.empty': '尚無統計資料',
'stats.readings.title': '占卜次數',
'stats.readings.unit': '次',
'stats.cards.title': '總抽牌數',
'stats.cards.unit': '張',
'stats.uprightPct.title': '正位比例',
'stats.reversedPct.title': '逆位比例',
'stats.orientation.unit': '{n} 張',
'stats.favorites.title': '收藏數量',
'stats.favorites.unit': '個收藏',
'stats.avg.title': '平均每次',
'stats.avg.unit': '張牌',
'stats.trend.title': '近 12 個月占卜趨勢',
'stats.trend.bar': '{month}：{n} 次',
'stats.suits.title': '花色分布',
'stats.topSpreads.title': '常用牌陣',
'stats.topCards.title': '常見牌卡',
'stats.item.count': '{n} 次 ({pct}%)',
'stats.legend.item': '{suit}: {n} ({pct}%)',
'db.title': '牌卡資料庫',
'db.search.placeholder': '搜尋牌名或英文名...',
'db.search.label': '搜尋牌卡',
'history.filter.spreadLabel': '依牌陣篩選',
'history.filter.tagLabel': '依標籤篩選',
'note.label': '筆記內容',
'db.empty': '尚無符合條件的牌卡',
'learn.title': '學習',
'learn.mode.flash': '閃卡',
'learn.mode.quiz': '測驗',
'learn.scope.label': '學習範圍',
'learn.scope.all': '全部 78 張',
'learn.mastery.title': '熟練度',
'learn.mastery.count': '已掌握 {n} / {total}',
'learn.mastery.cell': '{name} · 熟練度 {lv}/{max}',
'learn.reset': '重設學習進度',
'learn.empty.noMeaning': '此範圍沒有可用的牌義，請換一個範圍。',
'learn.empty.tooFew': '此範圍牌數不足以出題，請換一個範圍。',
'learn.streak.days': '🔥 連續 {n} 天',
'learn.streak.idle': '今天還沒開始',
'learn.streak.best': '最佳紀錄 {n} 天',
'learn.streak.none': '完成一次閃卡或測驗即開始計算',
'learn.streak.continue': '{best} · 今天再學一次就能延續',
'learn.flash.hint': '點一下看牌義',
'learn.flash.hard': '還不熟',
'learn.flash.easy': '記得了',
'learn.flash.progress': '本輪已看 {n} 張',
'learn.quiz.progress': '第 {n} / {total} 題',
'learn.quiz.promptArt': '這張牌的牌義是？',
'learn.quiz.promptKeywords': '這些關鍵字屬於哪張牌？',
'learn.quiz.promptCard': '「{name}」的關鍵字是？',
'learn.quiz.next': '下一題',
'learn.quiz.toResult': '看結果',
'learn.quiz.score': '答對 {n} / {total}',
'learn.quiz.rate': '正確率 {pct}%',
'learn.quiz.reviewTitle': '再複習這幾張',
'learn.quiz.perfect': '全部答對，這個範圍你已經很熟了。',
'learn.quiz.again': '再來一輪',
'learn.quiz.toFlash': '回到閃卡',
'settings.title': '設定',
'settings.theme.title': '外觀主題',
'settings.theme.auto': '跟隨系統',
'settings.theme.light': '淺色模式',
'settings.theme.dark': '深色模式',
'settings.theme.neon': '霓虹占卜館',
'settings.theme.neon.desc': '深夜藍黑與霓虹光，墨線牌依花色發光',
'settings.visual.title': '視覺樣式',
'settings.visual.text': '純文字模式（預設）',
'settings.visual.text.desc': '簡潔的文字呈現，快速載入',
'settings.visual.api': '牌圖模式',
'settings.visual.api.desc': '經典偉特塔羅牌圖（1909 公版，已內建於本機，無需網路）',
'settings.visual.line': '線稿模式',
'settings.visual.line.desc': '自製單色墨線牌組（78 張完備），隨深淺主題自動反轉',
'settings.pref.title': '顯示偏好',
'settings.pref.interactiveDraw': '互動選牌',
'settings.pref.interactiveDraw.desc': '占卜時親手從牌堆中選牌；關閉則直接翻出結果',
'settings.pref.spreadInfo': '顯示牌陣說明',
'settings.pref.spreadInfo.desc': '在牌陣選單與占卜頁顯示牌陣的詳細說明',
'settings.pref.shortcuts': '啟用鍵盤快捷鍵',
'settings.pref.shortcuts.desc': '空白鍵＝開始占卜　T＝切換主題　1–6＝切換分頁',
'settings.data.title': '資料管理',
'settings.data.stats': '目前共 {n} 筆占卜記錄（上限 {max} 筆），約佔 {kb} KB 儲存空間。',
'settings.data.export': '匯出資料',
'settings.data.import': '匯入資料',
'settings.data.clearAll': '清除所有資料',
'shichen.unknown': '不詳',
'shichen.0': '子　23:00–01:00',
'shichen.1': '丑　01:00–03:00',
'shichen.2': '寅　03:00–05:00',
'shichen.3': '卯　05:00–07:00',
'shichen.4': '辰　07:00–09:00',
'shichen.5': '巳　09:00–11:00',
'shichen.6': '午　11:00–13:00',
'shichen.7': '未　13:00–15:00',
'shichen.8': '申　15:00–17:00',
'shichen.9': '酉　17:00–19:00',
'shichen.10': '戌　19:00–21:00',
'shichen.11': '亥　21:00–23:00',
'profile.title': '個人化',
'profile.birthday.label': '你的生日',
'profile.shichen.label': '出生時辰',
'profile.desc': '用來發出你的五張個人牌。僅存在這台裝置，不會上傳。',
'profile.clear': '清除生日',
'profile.empty': '尚未設定生日',
'profile.preview.item': '{pos}：{name}{ori}',
'profile.pos.origin': '源',
'profile.pos.inheritance': '承',
'profile.pos.self': '身',
'profile.pos.legacy': '續',
'profile.pos.return': '歸',
'profile.note.deal.title': '這五張牌怎麼來的',
'profile.note.deal.text': '你的生日與時辰決定五張牌：從七十八張裡不放回地發五張，每張各自有正位或逆位。不做數字加總、不做縮減，所以每一天、每一個時辰各自成一組，彼此不重複。五張牌依序落在源、承、身、續、歸：從哪來、帶著什麼、你、傳下什麼、往哪去。',
'profile.note.frame.title': '源承身續歸是本 app 自訂的',
'profile.note.frame.text': '這五個位置的名字不出自任何傳統，是我們自己取的讀牌框架。五個位置在結構上完全平等，沒有哪一個比較深——名字只是讀牌的框。',
'profile.note.shichen.title': '時辰只借了一個鐘',
'profile.note.shichen.text': '時辰取自八字（四柱）的時間單位，八字是唐宋以來的系統。我們只借了「一個時辰兩小時、十二時辰」這個鐘，沒有借四柱的柱義：年柱看祖上、月柱看父母那一套，這裡完全沒有用到。另外不做早子／晚子換日——你選哪個時辰就是哪個時辰，日期用你填的那天。這是刻意的簡化。',
'profile.note.legacy.title': '與一九八七年那套生日牌不同',
'profile.note.legacy.text': 'Arrien／Greer 發表的生日牌只用二十二張大牌，把月、日、年加總後反覆縮減；本系統用全部七十八張、含正逆位、不做縮減。那套把 46,217 個生日壓成 21 種結果，丟掉約 72% 的資訊；本系統一天一組，不重複。',
'profile.note.closing': '牌的力量來自你怎麼詮釋它，不是來自偽造的古老權威。',
'card.loading': '載入中...',
'card.imageFailed': '圖片暫時無法載入',
'card.sub': '{en} · {suit} · {number}',
'card.seg.meaning': '牌義',
'card.seg.icon': '圖義',
'card.seg.context': '情境',
'card.seg.lore': '源流',
'card.depth.title': '深度解說',
'card.symbolism.title': '牌面描述',
'card.icon.title': '元素解碼',
'card.image.upright': '正位圖面',
'card.image.reversed': '逆位圖面',
'card.context.title': '情境牌義',
'card.context.love': '感情',
'card.context.career': '事業',
'card.context.wealth': '財務',
'card.context.wellbeing': '身心',
'card.context.yesno': '是非',
'card.reflection.label': '✍️ 反思',
'card.lore.empty': '這張牌的源流資料尚未收錄。',
'about.title': '關於塔羅',
'about.intro': '純粹的占卜工具，專注於呈現牌卡結果。所有資料僅存於這台裝置，不上傳、不追蹤。牌圖為 1909 年公版偉特牌，已內建於本機。',
'about.changelog.empty': '尚無更新紀錄。',
'privacy.title': '隱私政策',
'privacy.noCollect': '不收集任何資料',
'privacy.noTracking': '不使用追蹤工具',
'privacy.localOnly': '完全本地運作（牌圖亦內建，不連外）',
'insight.panel.title': '綜合觀察',
'insight.major.tag': '大阿卡納密集 · {p}',
'insight.major.text': '{n} 張牌裡有 {k} 張大阿卡納（期望值 {exp} 張）——{cards}。隨機抽牌出現這種或更極端的分布，機率是 {p}。',
'insight.suit.tag': '{suit}主導 · {p}',
'insight.suit.text': '{n} 張牌裡有 {k} 張{suit}——{cards}。隨機抽牌出現這種或更極端的集中，機率是 {p}（已計入「四個花色挑最多」這件事本身會提高誤報）。{suit}在標準系統下屬{element}，面向是{faculty}。',
'insight.reversed.tag': '逆位偏多 · {p}',
'insight.reversed.text': '{n} 張裡有 {k} 張逆位。每張牌正逆位各半，隨機抽牌出現這種或更極端的偏向，機率是 {p}。',
'insight.upright.tag': '正位偏多 · {p}',
'insight.upright.text': '{n} 張裡有 {k} 張正位。每張牌正逆位各半，隨機抽牌出現這種或更極端的偏向，機率是 {p}。',
'insight.recur.tag': '{n} 張{rank}{ori}',
'insight.recur.text': '這次抽到 {n} 張{ori}的{rank}——{cards}。Waite 在《圖像塔羅之鑰》（1911）第五節列了這種情況的意義：{term}。',
'insight.recur.text.both': '這次抽到 {n} 張{ori}的{rank}——{cards}。這條規則有兩個獨立來源，相隔四年、各自寫成：Waite《圖像塔羅之鑰》（1911）第五節說{term}；Foli《Fortune-Telling by Cards》（1915）第四章說{foli}。兩份並列不合併——他們同不同意，你自己看。',
'rank.ace': '一',
'rank.two': '二',
'rank.three': '三',
'rank.four': '四',
'rank.five': '五',
'rank.six': '六',
'rank.seven': '七',
'rank.eight': '八',
'rank.nine': '九',
'rank.ten': '十',
'rank.page': '侍者',
'rank.knight': '騎士',
'rank.queen': '皇后',
'rank.king': '國王',
'waite.recur.natural.king.4': '大榮譽',
'waite.recur.natural.king.3': '商議',
'waite.recur.natural.king.2': '小忠告',
'waite.recur.natural.queen.4': '大爭論',
'waite.recur.natural.queen.3': '受女性欺瞞',
'waite.recur.natural.queen.2': '真誠的朋友',
'waite.recur.natural.knight.4': '嚴肅的事',
'waite.recur.natural.knight.3': '熱烈的辯論',
'waite.recur.natural.knight.2': '親密',
'waite.recur.natural.page.4': '危險的疾病',
'waite.recur.natural.page.3': '爭執',
'waite.recur.natural.page.2': '不安',
'waite.recur.natural.ten.4': '譴責',
'waite.recur.natural.ten.3': '新的處境',
'waite.recur.natural.ten.2': '改變',
'waite.recur.natural.nine.4': '一位好朋友',
'waite.recur.natural.nine.3': '成功',
'waite.recur.natural.nine.2': '收受',
'waite.recur.natural.eight.4': '逆轉',
'waite.recur.natural.eight.3': '婚姻',
'waite.recur.natural.eight.2': '新的知識',
'waite.recur.natural.seven.4': '密謀',
'waite.recur.natural.seven.3': '體弱',
'waite.recur.natural.seven.2': '消息',
'waite.recur.natural.six.4': '豐盛',
'waite.recur.natural.six.3': '成功',
'waite.recur.natural.six.2': '易怒',
'waite.recur.natural.five.4': '規律',
'waite.recur.natural.five.3': '決心',
'waite.recur.natural.five.2': '守夜',
'waite.recur.natural.four.4': '近在眼前的旅程',
'waite.recur.natural.four.3': '一個值得反覆思索的主題',
'waite.recur.natural.four.2': '失眠',
'waite.recur.natural.three.4': '進展',
'waite.recur.natural.three.3': '合一',
'waite.recur.natural.three.2': '平靜',
'waite.recur.natural.two.4': '爭端',
'waite.recur.natural.two.3': '安全',
'waite.recur.natural.two.2': '和諧一致',
'waite.recur.natural.ace.4': '有利的機緣',
'waite.recur.natural.ace.3': '小小的成功',
'waite.recur.natural.ace.2': '欺瞞',
'waite.recur.reversed.king.4': '迅捷',
'waite.recur.reversed.king.3': '商務往來',
'waite.recur.reversed.king.2': '計畫',
'waite.recur.reversed.queen.4': '壞的同伴',
'waite.recur.reversed.queen.3': '暴食',
'waite.recur.reversed.queen.2': '工作',
'waite.recur.reversed.knight.4': '結盟',
'waite.recur.reversed.knight.3': '一場決鬥，或當面的衝突',
'waite.recur.reversed.knight.2': '易受影響',
'waite.recur.reversed.page.4': '匱乏',
'waite.recur.reversed.page.3': '怠惰',
'waite.recur.reversed.page.2': '交際',
'waite.recur.reversed.ten.4': '事件、發生',
'waite.recur.reversed.ten.3': '失望',
'waite.recur.reversed.ten.2': '期待得到印證',
'waite.recur.reversed.nine.4': '放高利貸',
'waite.recur.reversed.nine.3': '輕率',
'waite.recur.reversed.nine.2': '小額獲利',
'waite.recur.reversed.eight.4': '錯誤',
'waite.recur.reversed.eight.3': '一場景象',
'waite.recur.reversed.eight.2': '不幸',
'waite.recur.reversed.seven.4': '爭吵者',
'waite.recur.reversed.seven.3': '喜悅',
'waite.recur.reversed.seven.2': '名聲不佳的女子',
'waite.recur.reversed.six.4': '掛慮',
'waite.recur.reversed.six.3': '滿足',
'waite.recur.reversed.six.2': '衰敗',
'waite.recur.reversed.five.4': '秩序',
'waite.recur.reversed.five.3': '猶豫',
'waite.recur.reversed.five.2': '逆轉',
'waite.recur.reversed.four.4': '外出走動',
'waite.recur.reversed.four.3': '不安',
'waite.recur.reversed.four.2': '爭執',
'waite.recur.reversed.three.4': '大成功',
'waite.recur.reversed.three.3': '寧靜',
'waite.recur.reversed.three.2': '安全無虞',
'waite.recur.reversed.two.4': '和解',
'waite.recur.reversed.two.3': '憂懼',
'waite.recur.reversed.two.2': '不信任',
'waite.recur.reversed.ace.4': '不名譽',
'waite.recur.reversed.ace.3': '放蕩',
'waite.recur.reversed.ace.2': '敵人',
'foli.recur.natural.ace.4': '破財、與朋友離散、感情上的麻煩、牢獄之災',
'foli.recur.natural.ace.3': '一時的麻煩，由好消息化解',
'foli.recur.natural.king.4': '榮銜、擢升、好職位',
'foli.recur.natural.king.2': '生意上的合作',
'foli.recur.natural.queen.3': '友善的造訪',
'foli.recur.reversed.queen.3': '醜聞、流言',
'foli.recur.natural.queen.2': '交換瑣碎的私語、祕密被洩露、朋友間的會面',
'foli.recur.natural.ten.4': '好運、財富',
'foli.recur.natural.ten.2': '意外的好運',
'foli.recur.natural.nine.4': '意外之事成真',
'foli.recur.natural.nine.3': '健康、財富、幸福',
'foli.recur.natural.nine.2': '興旺與滿足、遺囑文件',
'foli.recur.reversed.nine.2': '小煩惱',
'foli.recur.reversed.eight.4': '不受擾動的安定',
'foli.recur.natural.eight.3': '新的家庭關係、正當的意圖',
'foli.recur.reversed.eight.3': '調情、放蕩與愚行',
'foli.recur.natural.eight.2': '輕浮的享樂、一時的戀慕、意料之外的發展',
'foli.recur.natural.seven.4': '算計與圈套、爭執與對立',
'foli.recur.natural.seven.3': '健康不佳、悔恨',
'foli.recur.natural.seven.2': '兩情相悅、一件意外的事',
'foli.recur.reversed.seven.2': '不忠、欺瞞或悔恨',
'insight.class.court.tag': '宮廷牌密集 · {p}',
'insight.class.court.text': '{n} 張牌裡有 {k} 張宮廷牌（期望值 {exp} 張）——{cards}。牌組 78 張裡只有 16 張宮廷牌，隨機抽牌出現這種或更極端的密集，機率是 {p}。宮廷牌在 Waite 的用法裡對應人物——《圖像塔羅之鑰》(1911) 第七節挑指示者，用的就是宮廷牌。',
'insight.class.pip.tag': '數字牌密集 · {p}',
'insight.class.pip.text': '{n} 張牌裡有 {k} 張數字牌（期望值 {exp} 張）。隨機抽牌出現這種或更極端的密集，機率是 {p}。',
'insight.quality.tag': '{quality}星座 · {p}',
'insight.quality.text': '你抽到的 {k} 張大阿卡納，在 Thierens（《General Book of the Tarot》1930）的星座對應下全部落在{quality}。隨機出現的機率是 {p}。注意這是 Thierens 自己的一套對應，與金色黎明系不同——本站牌義用的是 Waite，這條只是另一個角度。',
'quality.cardinal': '啟動',
'quality.fixed': '固定',
'quality.mutable': '變動',
'mofa.terms.title': '關鍵詞（正／逆位）',
'waite.terms.title': 'Waite 1911 原文語詞',
'waite.terms.upright': '正位',
'waite.terms.reversed': '逆位',
'waite.terms.note': '出自 A.E. Waite《The Pictorial Key to the Tarot》(1911)，這副牌的原始作者。保留英文原字：翻譯過就成了轉述，而這裡要的是他實際寫下的詞。他的讀法與上方的現代牌義常有出入——那個出入本身就值得看。',
'waite.additional.title': 'Waite 1911 追加語意',
'waite.additional.note': '同一本書第四節，Waite 另外給 56 張小牌的第二組語詞（22 張大牌他沒寫）。他自己在那節結尾註明了兩件事：這組語意與牌面圖案關聯不大，而且「與前面給的往往彼此不一致」。所以這裡不與上一塊合併——那個不一致是他本人留下的，不是我們沒整理。',
'court.looks.title': '這張牌常指向的人',
'court.looks.wands': '髮色金黃或赤褐、膚色白皙、藍眼',
'court.looks.cups': '髮色淺褐或暗金、灰眼或藍眼',
'court.looks.swords': '髮色深褐、榛色或灰眼、膚色偏暗',
'court.looks.pentacles': '髮色深褐或黑、深色眼睛、膚色偏黃或黝黑',
'court.looks.note': 'Waite《圖像塔羅之鑰》(1911) 挑選指示者的規則。他自己註明這不該死板套用——已知的性情可以推翻外貌。',
'suit.faculty.wands': '意志、創造、行動',
'suit.faculty.cups': '情感、關係、內在',
'suit.faculty.swords': '理性、邏輯、判斷',
'suit.faculty.pentacles': '物質、身體、累積',
'meaning.minor.upright': '{stage}。落在{suit}的領域——{faculty}。這張牌讀作：{kw}。{read}。',
'meaning.minor.reversed': '逆位時，同一組主題轉了向——{kw}。{read}。',
'card.meaning.minorNote': '小牌牌義由三個零件組成：位階的讀法（黃金黎明以降的數字系統，措辭是本站的）×花色的領域（見源流分頁的對應系統）×這張牌自己的關鍵詞。做法比照小牌源流：小牌沒有 56 段各自獨立的真相。',
'card.context.minorNote': '小牌的情境解讀由兩個零件組成：這個位階在該情境下的讀法×這個花色管的領域（本站系統，做法比照源流分頁）。反思問句隨位階走；「是否傾向」是逐張校準的資料。',
'systems.title': '對應系統',
'systems.std.source': '標準系統（本站預設）',
'systems.std.note': '出自金色黎明一系的對照表——這副牌是 Pamela Colman Smith 為 Waite 畫的，而 Waite 屬於這一系，所以本站的牌義以這套為準。大阿卡納沒有列：那部分沒有一份夠完整的公有領域來源，寧可留白也不用星座去回推。',
'systems.thierens.source': 'Thierens 1930',
'systems.thierens.note': '出自 A.E. Thierens《General Book of the Tarot》(1930)，他自己的一套，與上面那組全面不同（他的力量與正義也對調）。列在這裡是多一個角度，不是取代——兩套並排不合併。',
'systems.thierens.note.clash': '🔴 這張牌的元素兩套說法不一樣，上下對照就看得到。Thierens 的花色元素只有聖杯與通說相同，權杖、寶劍、錢幣三個都相反（他的權杖是風、寶劍是土、錢幣是火）。這不是誰抄錯——他 1930 年就是自成一家。本站不替他們調解，也不取平均：火和風平均不出東西。',
'systems.label.element': '元素',
'systems.label.faculty': '面向',
'systems.label.french': '撲克花色',
'systems.label.planet': '星象',
'systems.label.sign': '星座',
'systems.label.house': '宮位',
'systems.label.quality': '性質',
'systems.label.triplicity': '三分性',
'systems.house': '第 {n} 宮',
'element.fire': '火',
'element.water': '水',
'element.air': '風',
'element.earth': '土',
'french.clubs': '梅花',
'french.hearts': '紅心',
'french.spades': '黑桃',
'french.diamonds': '方塊',
'planet.saturn': '土星',
'planet.jupiter': '木星',
'planet.mars': '火星',
'planet.sun': '太陽',
'planet.venus': '金星',
'planet.mercury': '水星',
'planet.moon': '月亮',
'planet.earth': '地球',
'planet.uranus': '天王星',
'planet.neptune': '海王星',
'sign.aries': '牡羊座',
'sign.taurus': '金牛座',
'sign.gemini': '雙子座',
'sign.cancer': '巨蟹座',
'sign.leo': '獅子座',
'sign.virgo': '處女座',
'sign.libra': '天秤座',
'sign.scorpio': '天蠍座',
'sign.sagittarius': '射手座',
'sign.capricorn': '摩羯座',
'sign.aquarius': '水瓶座',
'sign.pisces': '雙魚座',
'insight.echo.tag': '共振 · {term}',
'insight.echo.text': '{cards}的語詞都指向{term}。整副 78 張裡只有 {K} 張帶這個語詞。（{src}）',
'insight.echo.text.multi': '{cards}的語詞指向同一件事——{term}。其中最少見的是{best}，整副 78 張裡只有 {K} 張帶著。（{src}）',
'insight.echo.text.multiSrc': '{cards}在 {m} 個來源裡各自共振：{parts}。',
'insight.echo.part': '「{terms}」（{src}）',
'insight.echo.net.tag': '共振網 · {hub}',
'insight.echo.net.text': '{hub}同時落在好幾組共振裡：{links}。',
'insight.echo.net.link': '與{others}共享{parts}',
'insight.echo.net.extra': '{cards}另外共享{parts}',
'insight.card.pos': '{name}（{ori}・{pos}）',
'insight.card.bottom': '底牌{name}（{ori}）',
'insight.profile.tag': '牌面剖面',
'insight.profile.text': '{n} 張牌：大阿卡納 {maj}、宮廷 {court}、數字牌 {pip}，逆位 {rev} 張；小牌元素——{els}。',
'insight.profile.text.noMinors': '{n} 張牌全是大阿卡納，逆位 {rev} 張。',
'insight.profile.el': '{el} {k}',
'insight.axis.tag': '{p1}×{p2}',
'insight.axis.rank.text': '{p1}與{p2}被同一個階級佔住：{c1}與{c2}都是{rank}。',
'insight.axis.suit.tag': '時間線同花色',
'insight.axis.suit.text': '過去、現在、未來三個位置同花色——{cards}，全是{suit}。',
'insight.echo.card': '{name}（{ori}）',
'insight.echo.pair': '{zh}（{en}）',
'insight.echo.src.ours': '本站關鍵詞，不分正逆位',
'insight.echo.src.mofa': 'mofatarot 正逆位關鍵詞',
'insight.echo.src.waite': 'Waite 1911 第二節語詞',
'insight.echo.src.add': 'Waite 1911 第四節追加語意',
'insight.balanced.tag': '無顯著偏向',
'insight.balanced.text': '花色、大阿卡納、正逆位、同階級重複、語詞共振與軸線對位都檢查過了，這次的牌面沒有值得特別指出的集中或重複。牌數越少越容易如此——三張牌本來就很難撞出結構。',
'insight.bottom.tag': '底牌基調',
'insight.bottom.text': '底牌是{name}（{ori}）——整副牌洗好後墊在最底、不參與牌陣的那張。本站把它當作這次占卜的背景基調，它的關鍵詞：{kw}。',
'insight.bottom.text.noKeywords': '底牌是{name}（{ori}）——整副牌洗好後墊在最底、不參與牌陣的那張。本站把它當作這次占卜的背景基調。',
'pattern.panel.title': '模式洞察',
'pattern.panel.sub': '來自你的 {n} 次占卜',
'pattern.none.tag': '尚未開始',
'pattern.none.text': '完成第一次占卜後，這裡會開始累積你的模式。',
'pattern.building.tag': '尚在累積',
'pattern.building.text': '再累積 {n} 次占卜，這裡就會開始浮現你的模式——你偏好的花色、標籤背後的傾向、反覆出現的牌。',
'pattern.dominant.tag': '{suit}長期主導',
'pattern.dominant.text': '你的 {total} 張牌裡有 {k} 張{suit}（{pct}%，期望值 {exp} 張）。純隨機出現這種集中的機率不超過 {p}（已計入「四個花色挑最多」）。{suit}在標準系統下屬{element}，面向是{faculty}。',
'pattern.tag.tag': '標籤「{name}」',
'pattern.tag.text': '你標記為「{name}」的 {n} 次占卜共 {m} 張牌，其中 {suit}佔 {k} 張（{pct}%）。純隨機出現這種集中的機率不超過 {p}（已計入花色與標籤的多重比較）。{suit}的面向是{faculty}。',
'pattern.reversed.high.tag': '逆位偏多',
'pattern.reversed.high.text': '長期 {total} 張牌裡有 {k} 張逆位（{pct}%）。每張牌正逆各半，隨機出現這種或更極端偏向的機率是 {p}。',
'pattern.reversed.low.tag': '逆位偏少',
'pattern.reversed.low.text': '長期 {total} 張牌裡只有 {k} 張逆位（{pct}%）。每張牌正逆各半，隨機出現這種或更極端偏向的機率是 {p}。',
'pattern.regular.tag': '常客牌',
'pattern.regular.text': '{name}在你的 {total} 張牌裡出現了 {n} 次。78 張牌隨機發，「任何一張」出現到這個次數的機率不超過 {p}。它的關鍵詞：{kw}。',
'pattern.regular.text.noKeywords': '{name}在你的 {total} 張牌裡出現了 {n} 次。78 張牌隨機發，「任何一張」出現到這個次數的機率不超過 {p}。',
'pattern.major.high.tag': '大牌偏多',
'pattern.major.high.text': '你的 {total} 張牌裡有 {k} 張大阿卡納（{pct}%，期望值 {exp} 張）。純隨機出現這種集中的機率不超過 {p}。',
'pattern.major.low.tag': '大牌偏少',
'pattern.major.low.text': '你的 {total} 張牌裡只有 {k} 張大阿卡納（{pct}%，期望值 {exp} 張）。純隨機出現這種稀疏的機率不超過 {p}。',
'pattern.pace.tag': '節奏變快',
'pattern.pace.text': '最近 30 天你占卜了 {n} 次，前一個 30 天是 {prev} 次。',
'pattern.flat.tag': '無顯著偏向',
'pattern.flat.text': '花色、大牌比例、正逆位、常客牌與標籤交叉都檢查過了，你的長期分布都在隨機範圍內，沒有統計上值得特別指出的集中。',
'btn.startReading': '開始占卜',
'btn.share': '分享',
'btn.copyResults': '複製結果',
'btn.shareImage': '生成分享圖',
'btn.print': '列印',
'btn.view': '查看',
'btn.note': '筆記',
'btn.tag': '標籤',
'btn.delete': '刪除',
'btn.cancel': '取消',
'btn.save': '儲存',
'btn.add': '新增',
'btn.confirm': '確定',
'btn.close': '關閉',
'note.title': '新增筆記',
'note.placeholder': '寫下你的感受與想法...',
'tag.title': '新增標籤',
'tag.common': '常用標籤',
'tag.custom': '自訂標籤',
'tag.placeholder': '輸入標籤名稱...',
'confirm.clearAll.title': '清除所有資料',
'confirm.clearAll.message': '將刪除全部占卜記錄與偏好設定，且無法復原。建議先匯出備份。',
'confirm.clearAll.ok': '全部清除',
'confirm.import.title': '匯入記錄',
'confirm.import.message': '將匯入 {n} 筆記錄，並覆蓋現有的 {current} 筆記錄，確定繼續嗎？',
'confirm.import.ok': '匯入',
'confirm.delete.title': '刪除記錄',
'confirm.delete.message': '確定要刪除此占卜記錄嗎？',
'confirm.delete.ok': '刪除',
'confirm.clearHistory.title': '清除所有記錄',
'confirm.clearHistory.message': '將刪除全部 {n} 筆占卜記錄，包含筆記與標籤。此動作無法復原。',
'confirm.clearHistory.ok': '全部刪除',
'confirm.learnReset.title': '重設學習進度',
'confirm.learnReset.message': '熟練度與連續天數都會歸零，且無法復原。',
'confirm.learnReset.ok': '重設',
'toast.deckTooSmall': '牌組數量不足',
'toast.copied': '已複製到剪貼簿',
'toast.copyFailed': '複製失敗',
'toast.linkCopied': '連結已複製',
'toast.noReading': '請先進行占卜',
'toast.shareImageDone': '分享圖已下載',
'toast.shareImageFailed': '分享圖生成失敗',
'toast.visualStyle': '已切換至{name}',
'toast.favorited': '已加入收藏',
'toast.unfavorited': '已取消收藏',
'toast.deleted': '已刪除記錄',
'toast.historyCleared': '已清除所有記錄',
'toast.noteSaved': '筆記已儲存',
'toast.tagUpdated': '標籤已更新',
'toast.exported': '資料已匯出',
'toast.imported': '已匯入 {n} 筆記錄',
'toast.imported.withPrefs': '已匯入 {n} 筆記錄與 {prefs} 項偏好',
'toast.importBadFormat': '檔案格式錯誤',
'toast.importParseFailed': '檔案解析失敗',
'toast.learnReset': '學習進度已重設',
'toast.birthdayInvalid': '生日格式不正確',
'toast.birthdayCleared': '已清除生日',
'toast.profileUpdated': '已更新你的個人牌'
}
};
const I18N_LANGS = {
zh: { label: '中文', htmlLang: 'zh-TW' },
en: { label: 'English', htmlLang: 'en' }
};
function availableLangs() {
return Object.keys(I18N_LANGS).filter(code => uiStrings[code]);
}
let lang = (() => {
try {
const q = new URLSearchParams(location.search).get('lang');
if (q && Object.prototype.hasOwnProperty.call(uiStrings, q)) return q;
} catch {   }
try {
const v = localStorage.getItem(I18N_KEY);
return Object.prototype.hasOwnProperty.call(uiStrings, v) ? v : I18N_FALLBACK;
} catch {
return I18N_FALLBACK;
}
})();
function applyLangToDocument() {
const meta = I18N_LANGS[lang] || {};
document.documentElement.lang = meta.htmlLang || lang;
try {
const url = new URL(location.href);
if (lang === I18N_FALLBACK) url.searchParams.delete('lang');
else url.searchParams.set('lang', lang);
history.replaceState(null, '', url);
} catch {   }
if (typeof syncCanonical === 'function') syncCanonical();
}
function setLang(code) {
if (!uiStrings[code] || code === lang) return;
lang = code;
try { localStorage.setItem(I18N_KEY, code); } catch {   }
applyLangToDocument();
if (typeof rerenderForLang === 'function') rerenderForLang();
}
function buildLangSwitch() {
const el = document.getElementById('langSwitch');
if (!el) return;
const langs = availableLangs();
if (langs.length < 2) { el.classList.add('hidden'); el.innerHTML = ''; return; }
const next = langs[(langs.indexOf(lang) + 1) % langs.length];
el.classList.remove('hidden');
el.innerHTML = `<button type="button" class="btn btn-tertiary btn-sm lang-switch-btn"
lang="${I18N_LANGS[next].htmlLang}" aria-label="${t('app.langSwitch.label', { lang: I18N_LANGS[next].label })}"
>${I18N_LANGS[next].label}</button>`;
el.querySelector('button').addEventListener('click', () => setLang(next));
}
function t(key, vars) {
const table = uiStrings[lang] || uiStrings[I18N_FALLBACK];
let s = Object.prototype.hasOwnProperty.call(table, key) ? table[key] : key;
if (vars) {
Object.keys(vars).forEach(k => {
s = s.split('{' + k + '}').join(String(vars[k]));
});
}
return s;
}
function applyStaticStrings(root = document) {
root.querySelectorAll('[data-i18n]').forEach(el => {
el.textContent = t(el.dataset.i18n);
});
root.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
el.placeholder = t(el.dataset.i18nPlaceholder);
});
root.querySelectorAll('[data-i18n-label]').forEach(el => {
el.setAttribute('aria-label', t(el.dataset.i18nLabel));
});
root.querySelectorAll('[data-i18n-title]').forEach(el => {
el.title = t(el.dataset.i18nTitle);
});
}
applyLangToDocument();

;
/* changelog.js */
const changelog = [
{
version: '4.15.2',
date: '2026-07-16',
title: '重新整理會留在原本的分頁',
changes: [
'重新整理不再跳回占卜頁——你在哪個分頁就留在哪個分頁。學習頁的閃卡／測驗子模式本來就會記住，主分頁現在跟上',
'例外是分享或重播的連結：網址帶著種子時一律回到占卜頁，那條連結的用意就是要你看那場占卜，不該落在自己的統計頁而讓結果躲在背後',
'「清除所有資料」之後仍會回到占卜頁，那是全新開始；分頁位置不會寫進備份檔——那是當下的位置，不是偏好設定'
]
},
{
version: '4.15.1',
date: '2026-07-14',
title: '資料庫的搜尋框終於有樣子了',
changes: [
'搜尋框過去完全沒有套到本站的欄位樣式，一直是瀏覽器的原生外觀：寬度沒有撐滿、沒有框線與圓角、觸控高度不足、聚焦時也不會亮起來。原因是它的型別從來沒有被列進樣式表的欄位清單裡',
'補上放大鏡圖示，位置與下拉選單的箭頭對稱（一左一右、同樣的內縮），兩種欄位並排時會對齊。圖示的顏色跟著主題走，深色、霓虹、高對比模式都不必另外調',
'霓虹像素風下它也會跟著變成直角粗框，不再是那個模式裡唯一的圓角欄位'
]
},
{
version: '4.15.0',
date: '2026-07-12',
title: '小牌的情境解讀加厚一層',
changes: [
'每個情境列現在由兩個零件組成：這個位階在該情境下的讀法（新增 56 條：14 位階 × 4 情境）＋這個花色管的領域（原有 16 條）。牌的專屬讀法在前、共用的框在後',
'上一版只有花色那一層，同花色 14 張牌的情境完全相同，在資料庫連著翻就像隨便帶過——現在（位階×花色）每格唯一，每張小牌的每個情境列都是獨一無二的組合，長度也比過去手寫的版本更完整',
'仍然是組合，不是把 224 格逐張硬編請回來：位階原子花色中立、花色原子位階中立，56＋16 個零件生成 224 格，改一條全系列一起更新'
]
},
{
version: '4.14.0',
date: '2026-07-08',
title: '內容層量化收尾：情境、深度解說、模式洞察',
changes: [
'小牌的情境解讀（感情／事業／財務／身心）改為組合：花色在該情境下的讀法（16 條原子，同花色共用，比照源流分頁共用花色解說的做法）；反思問句隨位階走（14 題）。過去 56 張 × 4 情境＋56 題反思共 280 格逐張硬編的散文整批退役',
'「是否傾向」逐張保留：那是校準過的資料（是 38／不明 26／否 14），連同它的說明一起，一個字沒動；22 張大阿卡納的情境與反思也逐張保留',
'小牌的「深度解說」退役：它是逐張硬編的詮釋散文，與組合牌義重複。牌面描述、元素解碼、正逆位圖面全部保留——那些是對 1909 年牌面的逐張觀察，不是推導',
'模式洞察改成算出來的：花色主導、大牌比例、常客牌改用二項上界（跨占卜彙整不是單純抽樣，所以機率一律寫「不超過」）；逆位是精確機率；「常客牌出現 3 次」不再自動當成發現——牌抽得多時那是必然，現在會算「任何一張牌出現到這個次數」的機率',
'模式洞察的心理側寫全部刪除（「你傾向問該怎麼做而不是該怎麼想」「會來占卜往往正是因為事情還沒鬆動」）——那些是無出處的斷言，不是資料',
'標籤×花色的交叉保留並校準：現在會計入「檢定了幾個標籤」的多重比較，不再讓「總有一個標籤最歪」冒充發現'
]
},
{
version: '4.13.0',
date: '2026-07-02',
title: '小牌牌義改成組合的，不再是 112 段硬編的散文',
changes: [
'56 張小牌的本站牌義現在由三個零件組成：位階的讀法（14 條，從牌史頁已有的數字與宮廷解說濃縮）×花色的領域（出處同對應系統）×這張牌自己的關鍵詞。改一條位階讀法，四個花色一起更新',
'這與牌史頁「小牌源流」是同一個立場：小牌沒有 56 段各自獨立的真相，逐張硬編等於把自由發揮當成事實。過去那 112 段散文（17,686 字）是本站逐張編的，現在整批退役',
'22 張大阿卡納維持逐張書寫：每張大牌本來就是獨立的條目，沒有結構可以推導——硬套公式是反方向的造假',
'牌義視窗的小牌會標明這個組成方式與各零件的出處；閃卡背面同步改用組合牌義',
'測驗、資料庫、每日一牌不受影響：它們用的是關鍵詞，關鍵詞一個字都沒動'
]
},
{
version: '4.12.1',
date: '2026-06-25',
title: '同一組牌的共振合併成一條線',
changes: [
'同一組牌在多個來源各自共振時（例：聖杯六與星星——本站的「療癒」、mofatarot 的「治愈」），現在合併成一段、來源各自標在詞後面。兩個來源獨立對上是更強的訊號，不該印成兩條重複的線',
'合併的只是線，不是語意：引擎沒有、也不會去判斷「療癒」與「治愈」像不像——所以文字說「各自共振」，不說「同一件事」'
]
},
{
version: '4.12.0',
date: '2026-06-24',
title: '綜合觀察重寫：知道位置、會連線、有開場',
changes: [
'綜合觀察現在知道每張牌落在哪個牌位。過去它把牌陣當一袋牌——凱爾特十字的寶劍三在「阻礙」還是「結果」，引擎完全不知道；現在每次點名都帶位置',
'新增「牌面剖面」開場：幾張大牌、宮廷與數字牌、四元素各幾張（缺席的元素會顯示 0）、幾張逆位。這是讀牌的人第一眼數的骨架，純計數、不設門檻、不帶詮釋',
'共振改成網：同一張牌出現在多組共振裡時，合併成一段並指出樞紐牌，不再一對一對分開唸、讓讀者自己拼。底牌也加入共振比對——它同樣是隨機發出的一張',
'新增軸線對位：過去×未來、目標×結果這類位置撞出同一個階級、或時間線三張同花色時會指出。用的是本站牌陣自己的結構，不是外部語意',
'同階級重複、花色主導、大阿卡納密集現在都點名是哪幾張牌、在哪些位置',
'刪掉三句沒有出處的評註（「大阿卡納講長期軌跡」「逆位能量內收」「正位能量順暢」）——那是本站自己的話，不是資料；「宮廷牌對應人物」補上出處（Waite 1911 第七節）',
'底牌基調改寫成描述裝置本身：它是洗好後墊在最底的那張，本站把它當背景基調——不再替它下結論'
]
},
{
version: '4.11.0',
date: '2026-06-21',
title: '綜合觀察現在會看你抽到哪幾張牌',
changes: [
'新增「語詞共振」：找出這次占卜裡有哪幾張牌的語詞指向同一件事，並告訴你整副 78 張裡有幾張帶著那個語詞。這是人讀牌時第一個會做的動作——看哪些牌在重複同一個主題——現在它是算出來的',
'過去每一條觀察都只數花色、階級與正逆位，從來不看抽到的是哪幾張牌；再加上每條都鎖在「隨機很難出現」的門檻後面，十張牌的凱爾特十字常常只吐得出一句「沒發現偏向」。嚴謹到什麼都不說，等於把功能做沒了',
'四個來源各自比對、各自標明出處，不跨來源合併：跨來源得靠本站的中譯把英文牽到中文才對得上，那樣共振會變成翻譯的產物而不是資料的',
'凱爾特十字的右欄改回發牌順序（由上而下）。過去第七張在最下、第十張在最上，那是照 Waite 描述「一張疊在一張上面」的手部動作——但位置的意義不依賴誰上誰下，而 29 個牌陣裡只有它要反著讀'
]
},
{
version: '4.10.0',
date: '2026-06-17',
title: '綜合觀察不再替你解牌',
changes: [
'花色主導的觀察拿掉了四段本站自寫的解讀（「你的動力是足夠的，要留意的是別把火力全開當成唯一解法」這類）。那是解牌，而且是本站編的，沒有出處',
'改成報這個花色在標準系統下的元素與面向——查表查出來的屬性，與牌義視窗印的是同一份，可以對照',
'這條觀察現在從頭到尾都是算的或查的：抽到幾張、多罕見、這個花色屬什麼。怎麼讀是你的事'
]
},
{
version: '4.9.0',
date: '2026-06-11',
title: '對應系統現在看得到了',
changes: [
'牌義視窗的「源流」新增對應系統：小牌有元素、面向、撲克花色，三到十還有行星；大阿卡納有 Thierens 的星象、性質與三分性。這些表 4.2.0 就收錄了，卻一直沒有任何畫面讀它們',
'兩套系統並排、各自標明是誰說的，刻意不合併：Thierens 的花色元素只有聖杯與通說相同，權杖、寶劍、錢幣三個都相反（他的權杖是風、寶劍是土、錢幣是火）。碰到不一致的牌會直接說出來——他 1930 年就是自成一家，不是誰抄錯',
'大阿卡納在標準系統下留白，那不是缺漏：那部分沒有一份夠完整的公有領域來源，與其用星座回推，不如承認沒有',
'錢幣一與錢幣二沒有行星，也不是缺漏：原始對照表的條列就是從三開始'
]
},
{
version: '4.8.0',
date: '2026-06-07',
title: '上一版說收錄了的那兩份資料，這一版才真的看得到',
changes: [
'Waite《圖像塔羅之鑰》第四節「小牌追加語意」現在真的出現在牌義視窗：56 張小牌裡有 48 張有語詞，共 95 條，全部附上中譯並保留原字。4.3.0 說收錄了，但它只進到資料層，畫面上一個字都沒有',
'綜合觀察的「同階級重複」現在會一起引用 Foli《Fortune-Telling by Cards》(1915) 的 21 條規則。同樣是 4.3.0 就收了、卻從來沒接上引擎，永遠不會觸發',
'兩人常常不同意，並列就看得見：四張十 Waite 說「譴責」、Foli 說「好運」；四張一 Waite 說「吉兆」、Foli 說「破財」。不合併也不平均——平均會做出一份沒有人說過的資料。引擎只說「這條有幾個獨立來源」，同不同意留給你看',
'Waite 自己在第四節結尾就寫明這組語意「與前面給的往往彼此不一致」，所以兩節分開列，不是我們沒整理',
'修掉解析時吃過頭的兩處：Foli 的兩張七逆位混進了 25 條書頁碎屑（連書名與出版年都被當成語詞收進去），錢幣一的追加語意混進了 Waite 的結語散文。都是本站解析的錯，不是原書的問題'
]
},
{
version: '4.7.0',
date: '2026-06-03',
title: 'Waite 的語詞補上中譯',
changes: [
'Waite 1911 的 788 條占卜語詞全部附上繁體中文譯詞，共 633 個不重複語詞',
'同時清掉 21 條原本混在語詞裡的排版殘渣（原書的插入語與頁尾碎屑），那些不是 Waite 的語詞',
'中英並列：譯詞在前、原字在後。這批是 1911 年的英文，有已廢的古語、法文借詞，也有與現代同形但意思不同的字（science 在他筆下是「學問」不是「科學」），原字擺著才查得了譯得對不對',
'照譯不美化：他的愚者是「愚行、狂躁、譫妄」，不是「新開始」'
]
},
{
version: '4.6.0',
date: '2026-05-29',
title: '牌義視窗新增正逆位關鍵詞',
changes: [
'78 張牌全部附上正逆位關鍵詞，共 1,010 條（正位 541、逆位 469）',
'與本站原有的牌義、Waite 1911 的原文語詞三者並列，各自標明來源，不合併也不互相取代'
]
},
{
version: '4.5.0',
date: '2026-05-21',
title: '牌義視窗附上 Waite 1911 的原文語詞',
changes: [
'78 張牌全部附上 A.E. Waite《The Pictorial Key to the Tarot》(1911) 的正逆位原文語詞，共 809 條',
'保留英文原字不翻譯：這是一手史料，翻譯過就成了轉述',
'本站原有的中文牌義維持不變，兩者並列而非取代——Waite 的讀法與現代讀法常有出入（他的愚者是 folly、mania，不是新開始），那個出入本身就值得看',
'太陽、聖杯二、錢幣七沒有逆位語詞，那是 Waite 本人就沒寫，不是缺漏'
]
},
{
version: '4.4.0',
date: '2026-05-15',
title: '宮廷牌新增外貌對應',
changes: [
'16 張宮廷牌的牌義視窗新增「這張牌常指向的人」：髮色、眼睛與膚色的對應，出自 Waite《圖像塔羅之鑰》(1911) 挑選指示者的規則',
'Waite 自己註明這不該死板套用——已知的性情可以推翻外貌，說明文字一併保留了這個但書'
]
},
{
version: '4.3.1',
date: '2026-05-08',
title: '凱爾特十字的第九個牌位補回一半',
changes: [
'「希望」改為「希望與恐懼」：Waite 在《圖像塔羅之鑰》(1911) 原本寫的就是「希望或恐懼」，這張牌本來就雙向，舊標籤等於把它砍掉一半'
]
},
{
version: '4.3.0',
date: '2026-05-07',
title: '收錄第二個獨立來源',
changes: [
'補上 Waite《圖像塔羅之鑰》第四節「小牌追加語意」：56 張牌、104 條語詞，與第二節的語詞分開收錄',
'收錄 Foli《Fortune-Telling by Cards》(1915) 第四章的組合規則 21 條，與 Waite 第五節同一種規則但成書相隔四年、各自寫成',
'兩人多半不同意：16 條可比對的規則裡真正一致的只有 3 條，直接對立的有 4 條（四張十：Waite 說譴責、Foli 說好運）。兩張表分開保存並標明出處，不合併、不平均'
]
},
{
version: '4.2.0',
date: '2026-05-02',
title: '綜合觀察多了兩個維度',
changes: [
'新增「宮廷牌／數字牌密集」：牌組 78 張裡只有 16 張宮廷牌，異常密集時會指出——宮廷牌指向人，數字牌指向事',
'新增大阿卡納的星座性質觀察（啟動／固定／變動），採用 Thierens《General Book of the Tarot》(1930) 的對應，文字會指名是他的系統',
'收錄花色的元素、行星與撲克牌對照表，各系統獨立標明出處，刻意不合併：不同流派對同一張牌的歸屬本來就不一致，合併只會做出一份自相矛盾的資料'
]
},
{
version: '4.1.0',
date: '2026-04-25',
title: '綜合觀察改成算出來的，不再是拍腦袋的門檻',
changes: [
'花色與大阿卡納的集中度改用超幾何分布、正逆位偏向改用二項分布計算，只有在「隨機抽牌很難出現」時才會提出，並附上實際機率與期望值',
'過去的門檻是本站自訂的固定比例，不考慮抽幾張——「逆位偏多」在三張牌的占卜有一半機率出現，等於在敘述擲硬幣；「大阿卡納」在單張占卜的觸發率就是大牌在牌組裡的佔比，毫無資訊',
'三張牌的占卜現在不會再宣告正逆位偏向：三次五五波最極端也只有 12.5%，本來就構不成顯著',
'「均衡分布」改名「無顯著偏向」：它只是說引擎檢查過而沒發現偏向，不是宣稱牌面均衡'
]
},
{
version: '4.0.0',
date: '2026-04-22',
title: '綜合觀察開始引用一手文獻',
changes: [
'收錄 A.E. Waite《圖像塔羅之鑰》（1911，公有領域）：78 張牌的正逆位占卜語詞共 809 條，以及他列的 84 條「同階級重複」規則',
'「同數字重複」的觀察改用 Waite 原本的規則：現在會分辨正位與逆位，也會看宮廷牌，每一條都指得出出處',
'原本這條規則的門檻與說法是本站自訂的，沒有依據'
]
},
{
version: '3.12.3',
date: '2026-04-10',
title: '「顯示牌陣說明」真的關得掉了',
changes: [
'關閉「顯示牌陣說明」後，牌陣選單裡 29 個牌陣的說明也會一起收起來——過去只收起占卜頁那一塊面板，選單照舊全部印出來，關了等於沒關',
'牌陣選單仍會顯示張數：那是選牌陣要用的事實，不是說明'
]
},
{
version: '3.12.2',
date: '2026-04-08',
title: '純文字模式真的是純文字了',
changes: [
'牌義視窗的牌面過去不跟隨視覺樣式，選了純文字點進去照樣有牌——上一版漏改的就是這裡',
'純文字模式不再用 emoji 頂替牌面：首頁的牌名、學習卡都只剩文字',
'牌圖載入失敗時改用文字說明，不再顯示一個大 emoji'
]
},
{
version: '3.12.1',
date: '2026-04-07',
title: '視覺樣式終於管到整個 app',
changes: [
'切換視覺樣式（牌圖／線稿／純文字）現在會同時套用到牌庫、每日一牌、個人檔案、學習卡與測驗——過去只有占卜結果會跟著變，其他地方永遠停在線稿',
'牌圖不再被裁切：78 張掃描件的高度本來就不一致，過去被硬套成同一個比例，每張牌被裁掉的量都不一樣',
'牌圖兩側的大片灰色底塊移除，牌面放大',
'測驗的看圖題改問牌義（原本問牌名，但牌面本身就印著牌名）'
]
},
{
version: '3.12.0',
date: '2026-04-05',
title: '搜尋與分享預覽',
changes: [
'分享連結貼到社群平台時原本是一片空白，現在會顯示標題、說明與預覽圖',
'加入網頁描述與結構化資料，供搜尋引擎辨識',
'分享出去的連結被平台加上追蹤參數後，仍會被視為同一個網址，不會被當成重複內容；占卜的種子參數完整保留'
]
},
{
version: '3.11.0',
date: '2026-03-30',
title: '牌圖體積減半',
changes: [
'七十八張牌圖另外提供兩種新式格式，瀏覽器會自動挑它認得的、檔案最小的那一個：現代瀏覽器下載量從十五點五 MB 降到七點七 MB，舊瀏覽器仍然拿得到原本的圖',
'原始圖檔一個位元組都沒有更動，畫質沒有二次壓縮'
]
},
{
version: '3.10.0',
date: '2026-03-26',
title: '欄位框線與高對比模式',
changes: [
'輸入欄位原本沒有框線，只靠一層極淡的灰底標示自己，與周圍的對比僅一點零九比一，幾乎看不出欄位在哪；四種主題現在都有符合標準的框線',
'支援 Windows 高對比模式：熟練度矩陣與圓餅圖例的顏色會被保留（那是它們唯一的資訊），面板與牌卡會補上實線邊界，焦點框改用系統高亮色'
]
},
{
version: '3.9.2',
date: '2026-03-19',
title: '無障礙檢查表逐項對過',
changes: [
'統計的趨勢圖資料原本只藏在滑鼠停留的提示框裡，讀屏軟體完全拿不到，現在整張圖有完整的文字說明；花色圓餅圖旁的圖例本來就是文字，圖本身不再重複被讀',
'主題與牌面樣式的選項改為正式的單選群組，讀屏軟體會先唸出這組在問什麼，而不是只唸「自動，單選按鈕」',
'切換分頁時瀏覽器分頁標題會跟著改，六個頁面不再共用同一個名字',
'生日欄位可由瀏覽器自動填入',
'移除九十個滑鼠停留才看得到的提示框：觸控與鍵盤使用者本來就看不到，且內容與已有的名稱重複'
]
},
{
version: '3.9.1',
date: '2026-03-18',
title: '讀屏軟體唸得出牌名了',
changes: [
'每日一牌先前只會被唸成「每日一牌」，抽到哪張牌完全聽不到；閃卡正面的牌名同樣被蓋掉，只唸得出「點一下看牌義」',
'測驗的「看線稿認牌」對讀屏使用者原本是零資訊、只能亂猜，現在會讀出牌面畫了什麼，與看得見的人拿到相同的線索',
'分頁的鍵盤焦點框上緣被容器裁掉，看不出焦點停在哪，現已改為畫在按鈕內側'
]
},
{
version: '3.9.0',
date: '2026-03-17',
title: '頁面結構與讀屏軟體',
changes: [
'新增「跳到主要內容」連結：用鍵盤操作時不必每次都走過整個頁首才碰得到內容',
'主要內容區現在是正式的地標，讀屏軟體可以直接跳過去；資料庫的搜尋區同樣標示為搜尋地標',
'操作結果（已收藏、已刪除、已複製連結）現在會被讀屏軟體唸出來，先前完全無聲；錯誤訊息會立即插播',
'六個欄位原本只有提示文字沒有名稱，讀屏軟體唸不出那是什麼欄位：資料庫搜尋、自訂標籤、筆記內容、兩個記錄篩選',
'主題切換鈕會說出按下去的結果（切換至深色／淺色），不再只是「切換主題」'
]
},
{
version: '3.8.0',
date: '2026-03-10',
title: '鍵盤導覽、霓虹收尾與語言骨架',
changes: [
'牌卡資料庫、熟練度矩陣、選牌區、占卜結果、測驗選項、個人牌與標籤全部改用方向鍵移動，整組只佔一個 Tab 位置：以前要按七十八次 Tab 才跨得過牌庫',
'方向鍵依畫面上的實際位置移動，而不是元素的先後順序：牌陣布局把牌擺在交叉、橫排等位置上，按方向鍵會走到眼睛看到的那一張',
'用方向鍵移動時畫面不再大幅跳動，只在目標超出視窗時補捲最小的距離',
'閃卡／測驗與牌義視窗的四個分頁可用左右方向鍵切換，先前只有主分頁可以',
'標籤視窗的常用標籤原本只有滑鼠點得到，現在可用鍵盤選取',
'霓虹主題的像素外殼補完：統計、學習、牌義區塊裡殘留的十幾處圓角全部收成直角，牌面一如既往不受影響',
'加入語言切換的骨架：語言會寫進網址（?lang=），網頁的語言標記與讀屏軟體的發音也會跟著走。目前只有中文一種語言，切換鈕要等第二份語言表加入後才會出現'
]
},
{
version: '3.7.0',
date: '2026-03-06',
title: '鍵盤與讀屏軟體支援',
changes: [
'七個對話框在關閉時仍留在頁面上，用鍵盤操作會走進看不見的輸入框，讀屏軟體也會把「關於」與「隱私」的內容當成頁面的一部分唸出來，現已修正',
'對話框開啟時焦點會移進去、關閉時回到原本的位置，按 Tab 不會再跑到背後的頁面；背後的內容對讀屏軟體暫時隱藏',
'對話框現在會被讀屏軟體識別為對話框並唸出標題；五個關閉鈕原本沒有名稱，只會被唸成「按鈕」',
'六個分頁可用左右方向鍵與 Home／End 切換，並與各自的內容區正確關聯'
]
},
{
version: '3.6.2',
date: '2026-03-02',
title: '樣式與版面校正',
changes: [
'淺色主題下三處讀不清楚的文字已加深：測驗作答後的正解與錯選項、收藏占卜標頭的牌陣名、是非牌陣的「傾向是」',
'深色主題列印時，牌陣的位置編號、統計數字與趨勢圖會印成白紙白字，現已修正',
'霓虹主題列印時，牌的線稿會以花色的螢光色印出而幾乎看不見，現已改回墨色；面板也不再帶出螢幕上的粗框與投影',
'手機上點統計圖的長條，手指移開後會一直卡在放大狀態，看起來像一根不存在的高峰',
'選了深色或霓虹主題時，開啟畫面不再先閃過一次淺色',
'瀏覽器分頁的圖示改用與應用程式相同的月牙圖；手機狀態列的顏色與頁面背景對齊'
]
},
{
version: '3.6.1',
date: '2026-03-01',
title: '離線與更新修正',
changes: [
'七十八張牌圖改為長期保存：以前每更新一次版本，已經下載過的牌圖就會整批作廢重抓，現在它們會一直留著，牌面也開得更快',
'更新版本後不會再短暫載到舊版程式',
'連線不穩時抓到的錯誤頁面，不會再被存進離線備援',
'離線時抓不到的圖片會誠實地顯示失敗，不再回傳一份網頁內容'
]
},
{
version: '3.6.0',
date: '2026-02-27',
title: '介面文字抽離',
changes: [
'介面上的所有文字集中到單一字串表，共五百九十四則：日後要出其他語言的版本，只需要再加一張表',
'牌陣名稱與牌位改以代號儲存，既有的占卜記錄會自動轉換，顯示與統計不受影響',
'牌義、情境、源流不在字串表內：那三份資料本來就以牌為鍵，換語言是換整份資料'
]
},
{
version: '3.5.1',
date: '2026-02-21',
title: '淺色主題文字對比',
changes: [
'淺色主題的次要與第三層文字全部加深至符合無障礙對比標準：關鍵字、牌位標籤、情境說明、源流、時間戳等安靜文字先前在淺色底上僅約二比一，難以閱讀',
'一併修正滑鼠移過時才會出現的底色上，次要文字同樣未達標的問題',
'深色與霓虹主題的文字階層維持原樣'
]
},
{
version: '3.5.0',
date: '2026-02-19',
title: '霓虹主題像素框架',
changes: [
'霓虹主題的框架改為像素風：直角、粗框、硬投影，主按鈕帶階梯狀缺角',
'牌面完全不受影響，線稿仍是牌的樣貌；墨色三態維持原本的圓角與髮絲線',
'修正統計分頁的模式洞察內文與下方統計磚完全貼死、中間沒有留白'
]
},
{
version: '3.4.1',
date: '2026-02-13',
title: '啟動當機修正與對比',
changes: [
'修正特定網址參數會讓程式在啟動時當掉：牌陣代號的驗證會被物件原型上的名稱騙過，例如網址帶入 toString 或 constructor',
'淺色主題的次要文字加深，在所有實際出現的背景上都達到無障礙對比標準',
'隱私政策改用自訂視窗，程式中已無任何瀏覽器原生對話框',
'分享圖的配色改為當場從樣式表讀取，不再自行保存一份色碼：主題配色調整後分享圖會自動跟上'
]
},
{
version: '3.4.0',
date: '2026-02-12',
title: '生日牌重做',
changes: [
'生日牌改用全新演算法，所有人的牌都會與先前不同：舊演算法把四萬六千個生日壓成二十一種結果，全球約一億九千萬人共用同一張本命牌，且月與日對調就會算出相同結果',
'新演算法用上全部七十八張牌與正逆位，不做任何數字縮減：同一天同一個時辰只對應一組牌，容量足以讓人類存在至今的每一天都不重複',
'可選填時辰，時間單位取自八字（十二時辰，每個時辰兩小時）；不知道時辰可留在不詳，仍會得到專屬的牌組',
'牌組改為五張，位置為源、承、身、續、歸——從哪裡來、帶著什麼、你自己、傳下什麼、往哪裡去',
'生日不再限制一九○○年之後',
'移除年度牌：單獨一張牌只有七十八種結果，同一年的人必然大量重複'
]
},
{
version: '3.3.0',
date: '2026-02-07',
title: '資料庫瀏覽體驗',
changes: [
'資料庫改為隨視窗寬度連續調整欄數，縮圖不再被欄寬拉大：手機從六十幾個螢幕的滑動量降到約十個',
'拆掉資料庫的內層捲動框，改為整頁單一捲動，搜尋框固定在頁首下方',
'修正頁首與其他固定元素從未真正固定的問題，起因是頁面的橫向溢出設定讓固定定位整個失效',
'占卜結果捲動定位時不再被頁首遮住'
]
},
{
version: '3.2.1',
date: '2026-01-31',
title: '視窗操作修正',
changes: [
'視窗開啟時鍵盤快捷鍵不再作用：原本按空白鍵會在視窗背後開始占卜、按數字會切換分頁',
'所有視窗都能用 Esc 關閉，過去只有牌陣選擇器與確認視窗支援',
'點擊背景關閉視窗時會完整收尾，標籤視窗不再殘留上次輸入的文字',
'資料庫搜尋不到牌時會顯示提示，不再是一片空白'
]
},
{
version: '3.2.0',
date: '2026-01-30',
title: '牌陣選擇器',
changes: [
'牌陣改用自訂選擇器，取代由系統繪製、無法配合主題的原生下拉清單',
'選單每一列直接顯示張數與說明，不必選完才知道那是什麼牌陣',
'選單支援鍵盤上下鍵與 Esc，手機上的觸控目標大幅放大',
'修正欄位獲得焦點時下拉箭頭消失的問題'
]
},
{
version: '3.1.2',
date: '2026-01-27',
title: '記錄與統計修正',
changes: [
'標籤視窗改為草稿編輯：按取消不再把改動留在記憶體裡，事後被其他操作一併存檔',
'刪除、清除與重設等破壞性操作改用自訂確認視窗，取代瀏覽器原生對話框',
'破壞性按鈕改為透明底紅字外框，紅色色階調整至符合 AA 對比',
'統計的花色與牌卡改用語言中性代號聚合，霓虹配色改以樣式表為唯一來源',
'圓餅圖依螢幕像素密度繪製，高解析度螢幕不再模糊',
'在統計分頁切換主題時圓餅圖會即時重繪'
]
},
{
version: '3.1.1',
date: '2026-01-25',
title: '綜合觀察修正',
changes: [
'單張牌牌陣不再宣稱牌面分布均衡：一張牌沒有分布可言',
'單張大牌的措辭改為你抽到的是大阿卡納'
]
},
{
version: '3.1.0',
date: '2026-01-23',
title: '完整牌義與圖義',
changes: [
'78 張牌義擴寫為完整解讀，正位與逆位各自成篇',
'新增圖義分頁：用 1909 偉特牌逐一解碼牌面符號',
'方向與是非傾向改用語言中性代號，為日後翻譯鋪路',
'更新紀錄移出程式碼註解，成為獨立頁面'
]
},
{
version: '3.0.0',
date: '2026-01-19',
title: '完整解說與誠實牌史',
changes: [
'78 張牌新增牌面解讀、深度解說與源流',
'牌義視窗改為分頁呈現',
'資料庫新增牌組簡史，說明塔羅本是十五世紀的紙牌遊戲，埃及起源等說法皆為後世附會'
]
},
{
version: '2.8.0',
date: '2026-01-07',
title: '牌面打磨與看牌識名',
changes: [
'七張大牌重繪：審判號角、戰車拱篷、節制水流、死神落冠、愚者小狗、星星水壺、皇后麥穗',
'測驗新增第三種題型：看線稿認牌'
]
},
{
version: '2.7.0',
date: '2026-01-04',
title: '王牌加冕',
changes: [
'四張王牌放大並加上光芒',
'世界牌移除會被誤讀為刪除線的緞帶結'
]
},
{
version: '2.6.0',
date: '2025-12-29',
title: '八張大牌重繪',
changes: [
'力量長出貓耳與鬍鬚、隱士的燈籠掛回杖上、倒吊人恢復人形',
'皇帝加冕、教皇成龕、女祭司改持書、高塔改火舌、惡魔接上鎖鏈'
]
},
{
version: '2.5.1',
date: '2025-12-25',
title: '牌牆去疊框',
changes: [
'資料庫改為畫廊式無框磚',
'修正月亮與女祭司的月牙因不可能弧而隱形'
]
},
{
version: '2.5.0',
date: '2025-12-23',
title: '完整備份與主題化分享圖',
changes: [
'匯出涵蓋學習進度、連續天數、生日與所有偏好',
'分享圖跟著當下主題出圖，花色字形改用牌組的筆畫',
'頁尾清理，版權年份自動更新'
]
},
{
version: '2.4.0',
date: '2025-12-20',
title: '線稿縮圖取代表情符號',
changes: [
'資料庫、閃卡、牌義視窗、每日一牌改用牌面線稿'
]
},
{
version: '2.3.1',
date: '2025-12-15',
title: '霓虹體檢',
changes: [
'第三層文字提高對比',
'花色圓餅圖與選牌牌背改用霓虹配光'
]
},
{
version: '2.3.0',
date: '2025-12-14',
title: '霓虹占卜館',
changes: [
'新增第四種主題：深夜藍黑與霓虹光',
'墨線牌依花色發光'
]
},
{
version: '2.2.0',
date: '2025-12-07',
title: '介面去色塊',
changes: [
'面板改用留白與髮絲線，取代灰色色塊'
]
},
{
version: '2.1.0',
date: '2025-12-02',
title: '墨線牌組完備',
changes: [
'二十二張大阿卡納手繪完成，七十八張齊全'
]
},
{
version: '2.0.0',
date: '2025-11-26',
title: '自製墨線牌組',
changes: [
'新增線稿模式，墨線隨深淺主題自動反轉',
'小牌與宮廷牌由花色符號與排列表生成'
]
},
{
version: '1.5.0',
date: '2025-11-11',
title: '牌圖在地化',
changes: [
'七十八張公版偉特牌圖下載到本機，不再連外'
]
},
{
version: '1.4.1',
date: '2025-11-06',
title: '快取修正',
changes: [
'程式網址加上版本參數，升版不再讀到舊快取'
]
},
{
version: '1.4.0',
date: '2025-11-05',
title: '128 位元種子',
changes: [
'洗牌空間大幅擴大，既有分享連結完全相容'
]
},
{
version: '1.3.0',
date: '2025-10-29',
title: '密碼學級真隨機',
changes: [
'亂數改用作業系統熵池，不再使用可預測的偽亂數',
'是非傾向重新校準'
]
},
{
version: '1.2.0',
date: '2025-10-23',
title: '學習系統與模式洞察',
changes: [
'新增學習分頁：閃卡、測驗、連續天數、熟練度',
'統計新增模式洞察',
'新增生日牌與年度牌'
]
},
{
version: '1.1.0',
date: '2025-10-18',
title: '綜合觀察與情境牌義',
changes: [
'抽牌後新增綜合觀察',
'七十八張牌新增五種情境牌義與反思'
]
},
{
version: '1.0.0',
date: '2025-10-15',
title: '第一版',
changes: [
'互動選牌、牌陣布局與翻牌動效',
'牌陣擴充至二十九種、每日一牌、離線支援、統計趨勢圖',
'程式模組化重構'
]
}
];

;
/* utils.js */
function escapeHTML(str) {
return String(str).replace(/[&<>"']/g, s => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[s]));
}
function mulberry32(a) {
return function () {
let t = a += 0x6D2B79F5;
t = Math.imul(t ^ t >>> 15, t | 1);
t ^= t + Math.imul(t ^ t >>> 7, t | 61);
return ((t ^ t >>> 14) >>> 0) / 4294967296;
};
}
function sfc32(a, b, c, d) {
return function () {
a |= 0; b |= 0; c |= 0; d |= 0;
let t = (a + b | 0) + d | 0;
d = d + 1 | 0;
a = b ^ b >>> 9;
b = c + (c << 3) | 0;
c = (c << 21 | c >>> 11);
c = c + t | 0;
return (t >>> 0) / 4294967296;
};
}
function cryptoUint32() {
const a = new Uint32Array(1);
crypto.getRandomValues(a);
return a[0];
}
function cryptoRandom() {
return cryptoUint32() / 4294967296;
}
function randomInt(n) {
if (!Number.isInteger(n) || n <= 0) return 0;
const limit = 4294967296 - (4294967296 % n);
let v;
do { v = cryptoUint32(); } while (v >= limit);
return v % n;
}
function shuffle(arr, rng = cryptoRandom) {
const a = arr.slice();
for (let i = a.length - 1; i > 0; i--) {
const j = Math.floor(rng() * (i + 1));
[a[i], a[j]] = [a[j], a[i]];
}
return a;
}
function isLegacySeed(seed) {
const s = String(seed);
return /^\d{1,10}$/.test(s) && Number(s) <= 4294967295;
}
function isSeed128(seed) {
return /^[0-9a-f]{32}$/i.test(String(seed));
}
function isValidSeed(seed) {
if (seed === undefined || seed === null || seed === '') return false;
return isSeed128(seed) || isLegacySeed(seed);
}
function seedRng(seed) {
const s = String(seed);
if (isSeed128(s)) {
const rng = sfc32(
parseInt(s.slice(0, 8), 16),
parseInt(s.slice(8, 16), 16),
parseInt(s.slice(16, 24), 16),
parseInt(s.slice(24, 32), 16)
);
for (let i = 0; i < 12; i++) rng();
return rng;
}
return mulberry32(Number(s));
}
function newSeed() {
const a = new Uint32Array(4);
crypto.getRandomValues(a);
return Array.from(a, n => n.toString(16).padStart(8, '0')).join('');
}
const CANONICAL_STRIP = /^(utm_|fbclid$|gclid$|msclkid$|igshid$|ref$|ref_src$)/;
function syncCanonical() {
const url = new URL(location.href);
[...url.searchParams.keys()].forEach(k => {
if (CANONICAL_STRIP.test(k)) url.searchParams.delete(k);
});
url.hash = '';
let el = document.querySelector('link[rel="canonical"]');
if (!el) {
el = document.createElement('link');
el.rel = 'canonical';
document.head.appendChild(el);
}
el.href = url.toString();
}
function updateURL(params) {
const url = new URL(location.href);
Object.entries(params).forEach(([k, v]) => {
if (v === undefined || v === null || v === '') url.searchParams.delete(k);
else url.searchParams.set(k, String(v));
});
history.replaceState(null, '', url.toString());
syncCanonical();
}
function formatDate(timestamp) {
const d = new Date(timestamp);
return `${d.getFullYear()}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getDate().toString().padStart(2, '0')} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
}
function debounce(func, wait) {
let timeout;
return function executedFunction(...args) {
const later = () => {
clearTimeout(timeout);
func(...args);
};
clearTimeout(timeout);
timeout = setTimeout(later, wait);
};
}
function showToast(message, type = 'success') {
const container = document.getElementById('toastContainer');
const toast = document.createElement('div');
toast.className = `toast ${type}`;
if (type === 'error') toast.setAttribute('role', 'alert');
const icon = type === 'success' ?
'<svg class="toast-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd"/></svg>' :
type === 'error' ?
'<svg class="toast-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clip-rule="evenodd"/></svg>' :
'<svg class="toast-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd"/></svg>';
toast.innerHTML = `
${icon}
<span class="toast-message">${escapeHTML(message)}</span>
`;
container.appendChild(toast);
requestAnimationFrame(() => {
toast.classList.add('show');
});
setTimeout(() => {
toast.classList.remove('show');
setTimeout(() => toast.remove(), 500);
}, 3000);
}
function readNeonSuitColors(suits) {
const probe = document.createElement('div');
probe.style.display = 'none';
document.body.appendChild(probe);
const found = {};
suits.forEach(suit => {
probe.setAttribute('data-suit', suit);
const color = getComputedStyle(probe).getPropertyValue('--neon-suit').trim();
if (color) found[suit] = color;
});
probe.remove();
return found;
}
let confirmPendingCancel = null;
function dismissPendingConfirm() {
if (confirmPendingCancel) confirmPendingCancel();
}
function openConfirm({ title, message, confirmText = t('btn.confirm'), danger = false } = {}) {
if (confirmPendingCancel) confirmPendingCancel();
return new Promise(resolve => {
const overlay = document.getElementById('confirmModal');
const okBtn = document.getElementById('confirmOk');
const cancelBtn = document.getElementById('confirmCancel');
const closeBtn = document.getElementById('confirmClose');
document.getElementById('confirmTitle').textContent = title || '';
document.getElementById('confirmMessage').textContent = message || '';
okBtn.textContent = confirmText;
okBtn.className = `btn ${danger ? 'btn-danger' : 'btn-primary'} btn-sm`;
const done = (result) => {
if (confirmPendingCancel === cancel) confirmPendingCancel = null;
okBtn.removeEventListener('click', onOk);
cancelBtn.removeEventListener('click', onCancel);
closeBtn.removeEventListener('click', onCancel);
overlay.classList.remove('show');
resolve(result);
};
const onOk = () => done(true);
const onCancel = () => done(false);
const cancel = onCancel;
okBtn.addEventListener('click', onOk);
cancelBtn.addEventListener('click', onCancel);
closeBtn.addEventListener('click', onCancel);
confirmPendingCancel = cancel;
overlay.classList.add('show');
});
}

;
/* data.js */
const suitNames = {
'Major Arcana': 'suit.major',
'Wands': 'suit.wands',
'Cups': 'suit.cups',
'Swords': 'suit.swords',
'Pentacles': 'suit.pentacles'
};
const orientationNames = { upright: 'orientation.upright', reversed: 'orientation.reversed' };
const tendencyNames = { yes: 'tendency.yes', no: 'tendency.no', unclear: 'tendency.unclear' };
function getCardImageUrl(card, ext = 'jpg') {
return card && card.nameKey ? `img/cards/${card.nameKey}.${ext}` : null;
}
const fullTarotCards = [
{ name: "愚者", suit: "Major Arcana", number: "0", englishName: "The Fool", nameKey: "fool" },
{ name: "魔術師", suit: "Major Arcana", number: "I", englishName: "The Magician", nameKey: "magician" },
{ name: "女祭司", suit: "Major Arcana", number: "II", englishName: "The High Priestess", nameKey: "high_priestess" },
{ name: "皇后", suit: "Major Arcana", number: "III", englishName: "The Empress", nameKey: "empress" },
{ name: "皇帝", suit: "Major Arcana", number: "IV", englishName: "The Emperor", nameKey: "emperor" },
{ name: "教皇", suit: "Major Arcana", number: "V", englishName: "The Hierophant", nameKey: "hierophant" },
{ name: "戀人", suit: "Major Arcana", number: "VI", englishName: "The Lovers", nameKey: "lovers" },
{ name: "戰車", suit: "Major Arcana", number: "VII", englishName: "The Chariot", nameKey: "chariot" },
{ name: "力量", suit: "Major Arcana", number: "VIII", englishName: "Strength", nameKey: "strength" },
{ name: "隱士", suit: "Major Arcana", number: "IX", englishName: "The Hermit", nameKey: "hermit" },
{ name: "命運之輪", suit: "Major Arcana", number: "X", englishName: "Wheel of Fortune", nameKey: "wheel_of_fortune" },
{ name: "正義", suit: "Major Arcana", number: "XI", englishName: "Justice", nameKey: "justice" },
{ name: "倒吊人", suit: "Major Arcana", number: "XII", englishName: "The Hanged Man", nameKey: "hanged_man" },
{ name: "死神", suit: "Major Arcana", number: "XIII", englishName: "Death", nameKey: "death" },
{ name: "節制", suit: "Major Arcana", number: "XIV", englishName: "Temperance", nameKey: "temperance" },
{ name: "惡魔", suit: "Major Arcana", number: "XV", englishName: "The Devil", nameKey: "devil" },
{ name: "高塔", suit: "Major Arcana", number: "XVI", englishName: "The Tower", nameKey: "tower" },
{ name: "星星", suit: "Major Arcana", number: "XVII", englishName: "The Star", nameKey: "star" },
{ name: "月亮", suit: "Major Arcana", number: "XVIII", englishName: "The Moon", nameKey: "moon" },
{ name: "太陽", suit: "Major Arcana", number: "XIX", englishName: "The Sun", nameKey: "sun" },
{ name: "審判", suit: "Major Arcana", number: "XX", englishName: "Judgement", nameKey: "judgement" },
{ name: "世界", suit: "Major Arcana", number: "XXI", englishName: "The World", nameKey: "world" },
{ name: "權杖一", suit: "Wands", number: "Ace", englishName: "Ace of Wands", nameKey: "ace_of_wands" },
{ name: "權杖二", suit: "Wands", number: "Two", englishName: "Two of Wands", nameKey: "two_of_wands" },
{ name: "權杖三", suit: "Wands", number: "Three", englishName: "Three of Wands", nameKey: "three_of_wands" },
{ name: "權杖四", suit: "Wands", number: "Four", englishName: "Four of Wands", nameKey: "four_of_wands" },
{ name: "權杖五", suit: "Wands", number: "Five", englishName: "Five of Wands", nameKey: "five_of_wands" },
{ name: "權杖六", suit: "Wands", number: "Six", englishName: "Six of Wands", nameKey: "six_of_wands" },
{ name: "權杖七", suit: "Wands", number: "Seven", englishName: "Seven of Wands", nameKey: "seven_of_wands" },
{ name: "權杖八", suit: "Wands", number: "Eight", englishName: "Eight of Wands", nameKey: "eight_of_wands" },
{ name: "權杖九", suit: "Wands", number: "Nine", englishName: "Nine of Wands", nameKey: "nine_of_wands" },
{ name: "權杖十", suit: "Wands", number: "Ten", englishName: "Ten of Wands", nameKey: "ten_of_wands" },
{ name: "權杖侍者", suit: "Wands", number: "Page", englishName: "Page of Wands", nameKey: "page_of_wands" },
{ name: "權杖騎士", suit: "Wands", number: "Knight", englishName: "Knight of Wands", nameKey: "knight_of_wands" },
{ name: "權杖皇后", suit: "Wands", number: "Queen", englishName: "Queen of Wands", nameKey: "queen_of_wands" },
{ name: "權杖國王", suit: "Wands", number: "King", englishName: "King of Wands", nameKey: "king_of_wands" },
{ name: "聖杯一", suit: "Cups", number: "Ace", englishName: "Ace of Cups", nameKey: "ace_of_cups" },
{ name: "聖杯二", suit: "Cups", number: "Two", englishName: "Two of Cups", nameKey: "two_of_cups" },
{ name: "聖杯三", suit: "Cups", number: "Three", englishName: "Three of Cups", nameKey: "three_of_cups" },
{ name: "聖杯四", suit: "Cups", number: "Four", englishName: "Four of Cups", nameKey: "four_of_cups" },
{ name: "聖杯五", suit: "Cups", number: "Five", englishName: "Five of Cups", nameKey: "five_of_cups" },
{ name: "聖杯六", suit: "Cups", number: "Six", englishName: "Six of Cups", nameKey: "six_of_cups" },
{ name: "聖杯七", suit: "Cups", number: "Seven", englishName: "Seven of Cups", nameKey: "seven_of_cups" },
{ name: "聖杯八", suit: "Cups", number: "Eight", englishName: "Eight of Cups", nameKey: "eight_of_cups" },
{ name: "聖杯九", suit: "Cups", number: "Nine", englishName: "Nine of Cups", nameKey: "nine_of_cups" },
{ name: "聖杯十", suit: "Cups", number: "Ten", englishName: "Ten of Cups", nameKey: "ten_of_cups" },
{ name: "聖杯侍者", suit: "Cups", number: "Page", englishName: "Page of Cups", nameKey: "page_of_cups" },
{ name: "聖杯騎士", suit: "Cups", number: "Knight", englishName: "Knight of Cups", nameKey: "knight_of_cups" },
{ name: "聖杯皇后", suit: "Cups", number: "Queen", englishName: "Queen of Cups", nameKey: "queen_of_cups" },
{ name: "聖杯國王", suit: "Cups", number: "King", englishName: "King of Cups", nameKey: "king_of_cups" },
{ name: "寶劍一", suit: "Swords", number: "Ace", englishName: "Ace of Swords", nameKey: "ace_of_swords" },
{ name: "寶劍二", suit: "Swords", number: "Two", englishName: "Two of Swords", nameKey: "two_of_swords" },
{ name: "寶劍三", suit: "Swords", number: "Three", englishName: "Three of Swords", nameKey: "three_of_swords" },
{ name: "寶劍四", suit: "Swords", number: "Four", englishName: "Four of Swords", nameKey: "four_of_swords" },
{ name: "寶劍五", suit: "Swords", number: "Five", englishName: "Five of Swords", nameKey: "five_of_swords" },
{ name: "寶劍六", suit: "Swords", number: "Six", englishName: "Six of Swords", nameKey: "six_of_swords" },
{ name: "寶劍七", suit: "Swords", number: "Seven", englishName: "Seven of Swords", nameKey: "seven_of_swords" },
{ name: "寶劍八", suit: "Swords", number: "Eight", englishName: "Eight of Swords", nameKey: "eight_of_swords" },
{ name: "寶劍九", suit: "Swords", number: "Nine", englishName: "Nine of Swords", nameKey: "nine_of_swords" },
{ name: "寶劍十", suit: "Swords", number: "Ten", englishName: "Ten of Swords", nameKey: "ten_of_swords" },
{ name: "寶劍侍者", suit: "Swords", number: "Page", englishName: "Page of Swords", nameKey: "page_of_swords" },
{ name: "寶劍騎士", suit: "Swords", number: "Knight", englishName: "Knight of Swords", nameKey: "knight_of_swords" },
{ name: "寶劍皇后", suit: "Swords", number: "Queen", englishName: "Queen of Swords", nameKey: "queen_of_swords" },
{ name: "寶劍國王", suit: "Swords", number: "King", englishName: "King of Swords", nameKey: "king_of_swords" },
{ name: "錢幣一", suit: "Pentacles", number: "Ace", englishName: "Ace of Pentacles", nameKey: "ace_of_pentacles" },
{ name: "錢幣二", suit: "Pentacles", number: "Two", englishName: "Two of Pentacles", nameKey: "two_of_pentacles" },
{ name: "錢幣三", suit: "Pentacles", number: "Three", englishName: "Three of Pentacles", nameKey: "three_of_pentacles" },
{ name: "錢幣四", suit: "Pentacles", number: "Four", englishName: "Four of Pentacles", nameKey: "four_of_pentacles" },
{ name: "錢幣五", suit: "Pentacles", number: "Five", englishName: "Five of Pentacles", nameKey: "five_of_pentacles" },
{ name: "錢幣六", suit: "Pentacles", number: "Six", englishName: "Six of Pentacles", nameKey: "six_of_pentacles" },
{ name: "錢幣七", suit: "Pentacles", number: "Seven", englishName: "Seven of Pentacles", nameKey: "seven_of_pentacles" },
{ name: "錢幣八", suit: "Pentacles", number: "Eight", englishName: "Eight of Pentacles", nameKey: "eight_of_pentacles" },
{ name: "錢幣九", suit: "Pentacles", number: "Nine", englishName: "Nine of Pentacles", nameKey: "nine_of_pentacles" },
{ name: "錢幣十", suit: "Pentacles", number: "Ten", englishName: "Ten of Pentacles", nameKey: "ten_of_pentacles" },
{ name: "錢幣侍者", suit: "Pentacles", number: "Page", englishName: "Page of Pentacles", nameKey: "page_of_pentacles" },
{ name: "錢幣騎士", suit: "Pentacles", number: "Knight", englishName: "Knight of Pentacles", nameKey: "knight_of_pentacles" },
{ name: "錢幣皇后", suit: "Pentacles", number: "Queen", englishName: "Queen of Pentacles", nameKey: "queen_of_pentacles" },
{ name: "錢幣國王", suit: "Pentacles", number: "King", englishName: "King of Pentacles", nameKey: "king_of_pentacles" }
];
const majorArcana = fullTarotCards.slice(0, 22);
const minorArcana = fullTarotCards.slice(22);
const courtCards = fullTarotCards.filter(c => ['Page', 'Knight', 'Queen', 'King'].includes(c.number));
const numberedCards = fullTarotCards.filter(c => !['Page', 'Knight', 'Queen', 'King'].includes(c.number) && c.suit !== 'Major Arcana');
const spreads = {
single: { positions: ['spread.single.pos.0'], description: 'spread.single.desc' },
three: { positions: ['spread.three.pos.0', 'spread.three.pos.1', 'spread.three.pos.2'], description: 'spread.three.desc' },
mbs: { positions: ['spread.mbs.pos.0', 'spread.mbs.pos.1', 'spread.mbs.pos.2'], description: 'spread.mbs.desc' },
path: { positions: ['spread.path.pos.0', 'spread.path.pos.1', 'spread.path.pos.2', 'spread.path.pos.3'], description: 'spread.path.desc' },
twoChoice: { positions: ['spread.twoChoice.pos.0', 'spread.twoChoice.pos.1', 'spread.twoChoice.pos.2', 'spread.twoChoice.pos.3', 'spread.twoChoice.pos.4'], description: 'spread.twoChoice.desc' },
prosCons: { positions: ['spread.prosCons.pos.0', 'spread.prosCons.pos.1', 'spread.prosCons.pos.2', 'spread.prosCons.pos.3', 'spread.prosCons.pos.4'], description: 'spread.prosCons.desc' },
goal: { positions: ['spread.goal.pos.0', 'spread.goal.pos.1', 'spread.goal.pos.2', 'spread.goal.pos.3', 'spread.goal.pos.4'], description: 'spread.goal.desc' },
relationship: { positions: ['spread.relationship.pos.0', 'spread.relationship.pos.1', 'spread.relationship.pos.2', 'spread.relationship.pos.3', 'spread.relationship.pos.4'], description: 'spread.relationship.desc' },
weekly: { positions: ['spread.weekly.pos.0', 'spread.weekly.pos.1', 'spread.weekly.pos.2', 'spread.weekly.pos.3', 'spread.weekly.pos.4', 'spread.weekly.pos.5', 'spread.weekly.pos.6', 'spread.weekly.pos.7'], description: 'spread.weekly.desc' },
monthly: { positions: ['spread.monthly.pos.0', 'spread.monthly.pos.1', 'spread.monthly.pos.2', 'spread.monthly.pos.3', 'spread.monthly.pos.4'], description: 'spread.monthly.desc' },
quarterly: { positions: ['spread.quarterly.pos.0', 'spread.quarterly.pos.1', 'spread.quarterly.pos.2', 'spread.quarterly.pos.3'], description: 'spread.quarterly.desc' },
yearly: { positions: ['spread.yearly.pos.0', 'spread.yearly.pos.1', 'spread.yearly.pos.2', 'spread.yearly.pos.3', 'spread.yearly.pos.4', 'spread.yearly.pos.5', 'spread.yearly.pos.6', 'spread.yearly.pos.7', 'spread.yearly.pos.8', 'spread.yearly.pos.9', 'spread.yearly.pos.10', 'spread.yearly.pos.11', 'spread.yearly.pos.12'], description: 'spread.yearly.desc' },
chakra: { positions: ['spread.chakra.pos.0', 'spread.chakra.pos.1', 'spread.chakra.pos.2', 'spread.chakra.pos.3', 'spread.chakra.pos.4', 'spread.chakra.pos.5', 'spread.chakra.pos.6'], description: 'spread.chakra.desc' },
elements: { positions: ['spread.elements.pos.0', 'spread.elements.pos.1', 'spread.elements.pos.2', 'spread.elements.pos.3', 'spread.elements.pos.4'], description: 'spread.elements.desc' },
celtic: { positions: ['spread.celtic.pos.0', 'spread.celtic.pos.1', 'spread.celtic.pos.2', 'spread.celtic.pos.3', 'spread.celtic.pos.4', 'spread.celtic.pos.5', 'spread.celtic.pos.6', 'spread.celtic.pos.7', 'spread.celtic.pos.8', 'spread.celtic.pos.9'], description: 'spread.celtic.desc' },
yesno: { positions: ['spread.yesno.pos.0', 'spread.yesno.pos.1', 'spread.yesno.pos.2'], description: 'spread.yesno.desc' },
newmoon: { positions: ['spread.newmoon.pos.0', 'spread.newmoon.pos.1', 'spread.newmoon.pos.2', 'spread.newmoon.pos.3', 'spread.newmoon.pos.4'], description: 'spread.newmoon.desc' },
fullmoon: { positions: ['spread.fullmoon.pos.0', 'spread.fullmoon.pos.1', 'spread.fullmoon.pos.2', 'spread.fullmoon.pos.3', 'spread.fullmoon.pos.4'], description: 'spread.fullmoon.desc' },
feelings: { positions: ['spread.feelings.pos.0', 'spread.feelings.pos.1', 'spread.feelings.pos.2', 'spread.feelings.pos.3', 'spread.feelings.pos.4'], description: 'spread.feelings.desc' },
loveCross: { positions: ['spread.loveCross.pos.0', 'spread.loveCross.pos.1', 'spread.loveCross.pos.2', 'spread.loveCross.pos.3', 'spread.loveCross.pos.4', 'spread.loveCross.pos.5'], description: 'spread.loveCross.desc' },
conflict: { positions: ['spread.conflict.pos.0', 'spread.conflict.pos.1', 'spread.conflict.pos.2', 'spread.conflict.pos.3', 'spread.conflict.pos.4'], description: 'spread.conflict.desc' },
career: { positions: ['spread.career.pos.0', 'spread.career.pos.1', 'spread.career.pos.2', 'spread.career.pos.3', 'spread.career.pos.4', 'spread.career.pos.5'], description: 'spread.career.desc' },
wealth: { positions: ['spread.wealth.pos.0', 'spread.wealth.pos.1', 'spread.wealth.pos.2', 'spread.wealth.pos.3', 'spread.wealth.pos.4'], description: 'spread.wealth.desc' },
selfDiscovery: { positions: ['spread.selfDiscovery.pos.0', 'spread.selfDiscovery.pos.1', 'spread.selfDiscovery.pos.2', 'spread.selfDiscovery.pos.3', 'spread.selfDiscovery.pos.4'], description: 'spread.selfDiscovery.desc' },
shadow: { positions: ['spread.shadow.pos.0', 'spread.shadow.pos.1', 'spread.shadow.pos.2', 'spread.shadow.pos.3', 'spread.shadow.pos.4'], description: 'spread.shadow.desc' },
dream: { positions: ['spread.dream.pos.0', 'spread.dream.pos.1', 'spread.dream.pos.2', 'spread.dream.pos.3'], description: 'spread.dream.desc' },
horseshoe: { positions: ['spread.horseshoe.pos.0', 'spread.horseshoe.pos.1', 'spread.horseshoe.pos.2', 'spread.horseshoe.pos.3', 'spread.horseshoe.pos.4', 'spread.horseshoe.pos.5', 'spread.horseshoe.pos.6'], description: 'spread.horseshoe.desc' },
treeOfLife: { positions: ['spread.treeOfLife.pos.0', 'spread.treeOfLife.pos.1', 'spread.treeOfLife.pos.2', 'spread.treeOfLife.pos.3', 'spread.treeOfLife.pos.4', 'spread.treeOfLife.pos.5', 'spread.treeOfLife.pos.6', 'spread.treeOfLife.pos.7', 'spread.treeOfLife.pos.8', 'spread.treeOfLife.pos.9'], description: 'spread.treeOfLife.desc' },
astroHouses: { positions: ['spread.astroHouses.pos.0', 'spread.astroHouses.pos.1', 'spread.astroHouses.pos.2', 'spread.astroHouses.pos.3', 'spread.astroHouses.pos.4', 'spread.astroHouses.pos.5', 'spread.astroHouses.pos.6', 'spread.astroHouses.pos.7', 'spread.astroHouses.pos.8', 'spread.astroHouses.pos.9', 'spread.astroHouses.pos.10', 'spread.astroHouses.pos.11'], description: 'spread.astroHouses.desc' }
};
const commonTags = ['工作', '感情', '健康', '財運', '學業', '人際', '靈性', '決策'];
const spreadLayouts = {
celtic: { cols: 4, cells: [
{ r: 2, c: 2 },
{ r: 2, c: 2, rot: 90 },
{ r: 3, c: 2 },
{ r: 2, c: 1 },
{ r: 1, c: 2 },
{ r: 2, c: 3 },
{ r: 1, c: 4 },
{ r: 2, c: 4 },
{ r: 3, c: 4 },
{ r: 4, c: 4 }
] },
horseshoe: { cols: 7, cells: [
{ r: 3, c: 1 },
{ r: 2, c: 2 },
{ r: 1, c: 3 },
{ r: 1, c: 4 },
{ r: 1, c: 5 },
{ r: 2, c: 6 },
{ r: 3, c: 7 }
] },
twoChoice: { cols: 3, cells: [
{ r: 3, c: 2 },
{ r: 2, c: 1 },
{ r: 2, c: 3 },
{ r: 1, c: 1 },
{ r: 1, c: 3 }
] },
prosCons: { cols: 3, cells: [
{ r: 1, c: 1 },
{ r: 2, c: 1 },
{ r: 1, c: 3 },
{ r: 2, c: 3 },
{ r: 1, c: 2, rs: 2 }
] },
loveCross: { cols: 4, cells: [
{ r: 2, c: 1 },
{ r: 2, c: 3 },
{ r: 2, c: 2 },
{ r: 3, c: 2 },
{ r: 1, c: 2 },
{ r: 2, c: 4 }
] }
};

;
/* card-dims.js */
const cardImageDims = {
ace_of_cups: [500, 863],
ace_of_pentacles: [500, 866],
ace_of_swords: [500, 866],
ace_of_wands: [500, 868],
chariot: [500, 864],
death: [500, 864],
devil: [500, 881],
eight_of_cups: [500, 861],
eight_of_pentacles: [500, 859],
eight_of_swords: [500, 861],
eight_of_wands: [500, 861],
emperor: [500, 859],
empress: [500, 855],
five_of_cups: [500, 856],
five_of_pentacles: [500, 863],
five_of_swords: [500, 866],
five_of_wands: [500, 866],
fool: [500, 839],
four_of_cups: [500, 859],
four_of_pentacles: [500, 865],
four_of_swords: [500, 859],
four_of_wands: [500, 866],
hanged_man: [500, 879],
hermit: [500, 855],
hierophant: [500, 861],
high_priestess: [500, 859],
judgement: [500, 861],
justice: [500, 861],
king_of_cups: [500, 856],
king_of_pentacles: [500, 867],
king_of_swords: [500, 859],
king_of_wands: [500, 870],
knight_of_cups: [500, 866],
knight_of_pentacles: [500, 864],
knight_of_swords: [500, 863],
knight_of_wands: [500, 861],
lovers: [500, 856],
magician: [500, 866],
moon: [500, 864],
nine_of_cups: [500, 861],
nine_of_pentacles: [500, 866],
nine_of_swords: [500, 861],
nine_of_wands: [500, 861],
page_of_cups: [500, 861],
page_of_pentacles: [500, 863],
page_of_swords: [500, 866],
page_of_wands: [500, 866],
queen_of_cups: [500, 861],
queen_of_pentacles: [500, 866],
queen_of_swords: [500, 870],
queen_of_wands: [500, 859],
seven_of_cups: [500, 866],
seven_of_pentacles: [500, 861],
seven_of_swords: [500, 861],
seven_of_wands: [500, 866],
six_of_cups: [500, 861],
six_of_pentacles: [500, 866],
six_of_swords: [500, 864],
six_of_wands: [500, 859],
star: [500, 861],
strength: [500, 861],
sun: [500, 861],
temperance: [500, 868],
ten_of_cups: [500, 866],
ten_of_pentacles: [500, 861],
ten_of_swords: [500, 867],
ten_of_wands: [500, 872],
three_of_cups: [500, 859],
three_of_pentacles: [500, 859],
three_of_swords: [500, 870],
three_of_wands: [500, 870],
tower: [500, 866],
two_of_cups: [500, 866],
two_of_pentacles: [500, 863],
two_of_swords: [500, 856],
two_of_wands: [500, 861],
wheel_of_fortune: [500, 870],
world: [500, 863],
};
function cardImageSize(card) {
const d = card && card.nameKey && cardImageDims[card.nameKey];
return d ? { w: d[0], h: d[1] } : { w: 500, h: 861 };
}

;
/* waite.js */
const waiteTerms = {
ace_of_cups: { upright: ['joy', 'content', 'abode', 'nourishment', 'abundance', 'fertility', 'holy table', 'felicity hereof'], reversed: ['mutation', 'instability', 'revolution'] },
ace_of_pentacles: { upright: ['perfect contentment', 'felicity', 'ecstasy', 'speedy intelligence', 'gold'], reversed: ['bad intelligence', 'great riches', 'comfortable material conditions'] },
ace_of_swords: { upright: ['triumph', 'conquest', 'triumph of force'], reversed: ['conception', 'childbirth', 'augmentation', 'multiplicity'] },
ace_of_wands: { upright: ['creation', 'invention', 'enterprise', 'principle', 'beginning', 'source', 'birth', 'family', 'origin', 'money', 'fortune', 'inheritance'], reversed: ['fall', 'decadence', 'ruin', 'perdition'] },
chariot: { upright: ['succour', 'providence also war', 'triumph', 'presumption', 'vengeance', 'trouble'], reversed: ['riot', 'quarrel', 'dispute', 'litigation', 'defeat'] },
death: { upright: ['end', 'mortality', 'destruction', 'corruption', 'many contrarieties', 'failure of marriage projects'], reversed: ['inertia', 'sleep', 'lethargy', 'petrifaction', 'somnambulism', 'hope destroyed'] },
devil: { upright: ['ravage', 'violence', 'vehemence', 'extraordinary efforts', 'force', 'fatality'], reversed: ['evil fatality', 'weakness', 'pettiness', 'blindness'] },
eight_of_cups: { upright: ['giving joy', 'mildness', 'timidity', 'honour', 'modesty'], reversed: ['great joy', 'happiness', 'feasting'] },
eight_of_pentacles: { upright: ['work', 'employment', 'commission', 'craftsmanship'], reversed: ['voided ambition', 'vanity', 'cupidity', 'exaction', 'usury'] },
eight_of_swords: { upright: ['bad news', 'violent chagrin', 'crisis', 'censure', 'power in trammels', 'conflict', 'calumny', 'sickness'], reversed: ['disquiet', 'difficulty', 'opposition', 'accident', 'treachery', 'what is unforeseen', 'fatality'] },
eight_of_wands: { upright: ['activity in undertakings', 'swiftness', 'great haste', 'great hope', 'the arrows of love'], reversed: ['arrows of jealousy', 'internal dispute', 'stingings of conscience', 'quarrels'] },
emperor: { upright: ['stability', 'power', 'protection', 'realization', 'a great person', 'aid', 'reason', 'conviction', 'authority and will'], reversed: ['benevolence', 'compassion', 'credit', 'confusion to enemies', 'obstruction', 'immaturity'] },
empress: { upright: ['fruitfulness', 'action', 'initiative', 'length of days', 'the unknown', 'clandestine', 'difficulty', 'doubt', 'ignorance'], reversed: ['light', 'truth', 'public rejoicings', 'vacillation'] },
five_of_cups: { upright: ['patrimony', 'transmission'], reversed: ['news', 'alliances', 'affinity', 'consanguinity', 'ancestry', 'return', 'false projects'] },
five_of_pentacles: { upright: ['destitution', 'husband', 'friend', 'mistress', 'concordance', 'affinities'], reversed: ['disorder', 'chaos', 'ruin', 'discord', 'profligacy'] },
five_of_swords: { upright: ['degradation', 'destruction', 'revocation', 'infamy', 'dishonour', 'loss'], reversed: ['burial and obsequies'] },
five_of_wands: { upright: ['imitation', 'sham fight', 'gain', 'opulence'], reversed: ['litigation', 'disputes', 'trickery', 'contradiction'] },
fool: { upright: ['folly', 'mania', 'extravagance', 'intoxication', 'delirium', 'frenzy', 'bewrayment'], reversed: ['negligence', 'absence', 'distribution', 'carelessness', 'apathy', 'nullity', 'vanity'] },
four_of_cups: { upright: ['weariness', 'disgust', 'aversion', 'imaginary vexations'], reversed: ['novelty', 'presage', 'new instruction', 'new relations'] },
four_of_pentacles: { upright: ['the surety of possessions', 'gift', 'legacy', 'inheritance'], reversed: ['suspense', 'delay', 'opposition'] },
four_of_swords: { upright: ['vigilance', 'retreat', 'solitude', 'hermit\'s repose', 'exile', 'tomb and coffin'], reversed: ['wise administration', 'circumspection', 'economy', 'avarice', 'precaution', 'testament'] },
four_of_wands: { upright: ['country life', 'haven of refuge', 'repose', 'concord', 'harmony', 'prosperity', 'peace'], reversed: ['increase', 'felicity', 'beauty', 'embellishment'] },
hanged_man: { upright: ['wisdom', 'circumspection', 'discernment', 'trials', 'sacrifice', 'intuition', 'divination', 'prophecy'], reversed: ['selfishness', 'the crowd', 'body politic'] },
hermit: { upright: ['prudence', 'circumspection', 'dissimulation', 'roguery', 'corruption'], reversed: ['concealment', 'disguise', 'policy', 'fear', 'unreasoned caution'] },
hierophant: { upright: ['marriage', 'alliance', 'captivity', 'servitude', 'mercy and goodness', 'inspiration'], reversed: ['society', 'good understanding', 'concord', 'overkindness', 'weakness'] },
high_priestess: { upright: ['secrets', 'mystery', 'the querent herself', 'silence', 'tenacity', 'wisdom', 'science'], reversed: ['passion', 'moral or physical ardour', 'conceit', 'surface knowledge'] },
judgement: { upright: ['change of position', 'renewal', 'outcome'], reversed: ['weakness', 'pusillanimity', 'simplicity', 'deliberation', 'decision', 'sentence'] },
justice: { upright: ['equity', 'rightness', 'probity', 'executive'], reversed: ['legal complications', 'bigotry', 'bias', 'excessive severity'] },
king_of_cups: { upright: ['fair man', 'man of business', 'law', 'divinity', 'responsible', 'equity', 'art and science', 'law and art', 'creative intelligence'], reversed: ['dishonest', 'double-dealing man', 'roguery', 'exaction', 'injustice', 'vice', 'scandal', 'pillage', 'considerable loss'] },
king_of_pentacles: { upright: ['valour', 'realizing intelligence', 'success in these paths'], reversed: ['vice', 'weakness', 'ugliness', 'perversity', 'corruption', 'peril'] },
king_of_swords: { upright: ['command', 'authority', 'militant intelligence', 'law', 'offices of the crown'], reversed: ['cruelty', 'perversity', 'barbarity', 'perfidy', 'evil intention'] },
king_of_wands: { upright: ['dark man', 'friendly', 'countryman', 'generally married', 'honest and conscientious'], reversed: ['good', 'austere'] },
knight_of_cups: { upright: ['arrival', 'approach', 'advances', 'proposition', 'demeanour', 'invitation', 'incitement'], reversed: ['trickery', 'artifice', 'subtlety', 'swindling', 'duplicity', 'fraud'] },
knight_of_pentacles: { upright: ['utility', 'serviceableness', 'interest', 'responsibility'], reversed: ['inertia', 'idleness', 'stagnation', 'placidity', 'discouragement', 'carelessness'] },
knight_of_swords: { upright: ['skill', 'bravery', 'capacity', 'defence', 'address', 'enmity', 'wrath', 'war', 'destruction', 'opposition', 'resistance', 'ruin'], reversed: ['imprudence', 'incapacity', 'extravagance'] },
knight_of_wands: { upright: ['departure', 'absence', 'flight', 'emigration', 'a dark young man', 'friendly', 'change of residence'], reversed: ['rupture', 'division', 'interruption', 'discord'] },
lovers: { upright: ['attraction', 'love', 'beauty', 'trials overcome'], reversed: ['failure', 'foolish designs'] },
magician: { upright: ['skill', 'diplomacy', 'address', 'subtlety', 'sickness', 'pain', 'loss', 'disaster', 'snares of enemies', 'self-confidence', 'will', 'the querent'], reversed: ['physician', 'magus', 'mental disease', 'disgrace', 'disquiet'] },
moon: { upright: ['hidden enemies', 'danger', 'calumny', 'darkness', 'terror', 'deception', 'occult forces', 'error'], reversed: ['instability', 'inconstancy', 'silence'] },
nine_of_cups: { upright: ['concord', 'contentment', 'physical bien-etre', 'victory', 'success', 'advantage'], reversed: ['truth', 'loyalty', 'liberty', 'imperfections'] },
nine_of_pentacles: { upright: ['prudence', 'safety', 'success', 'accomplishment', 'certitude', 'discernment'], reversed: ['roguery', 'deception', 'voided project', 'bad faith'] },
nine_of_swords: { upright: ['death', 'failure', 'miscarriage', 'delay', 'deception', 'disappointment', 'despair'], reversed: ['imprisonment', 'suspicion', 'doubt', 'reasonable fear', 'shame'] },
nine_of_wands: { upright: ['delay', 'suspension', 'adjournment'], reversed: ['obstacles', 'adversity', 'calamity'] },
page_of_cups: { upright: ['fair young man', 'a studious youth', 'news', 'message', 'application', 'reflection', 'meditation'], reversed: ['taste', 'inclination', 'attachment', 'seduction', 'deception', 'artifice'] },
page_of_pentacles: { upright: ['application', 'study', 'scholarship', 'rule', 'management'], reversed: ['prodigality', 'dissipation', 'liberality', 'luxury', 'unfavourable news'] },
page_of_swords: { upright: ['authority', 'overseeing', 'secret service', 'vigilance', 'spying', 'examination'], reversed: ['what is unforeseen', 'unprepared state'] },
page_of_wands: { upright: ['dark young man', 'faithful', 'a lover', 'an envoy', 'a postman', 'a dangerous rival'], reversed: ['anecdotes', 'announcements', 'evil news'] },
queen_of_cups: { upright: ['good', 'fair woman', 'honest', 'devoted woman', 'loving intelligence', 'success', 'happiness', 'pleasure', 'wisdom', 'virtue'], reversed: ['good woman', 'perverse woman', 'vice', 'dishonour', 'depravity'] },
queen_of_pentacles: { upright: ['opulence', 'generosity', 'magnificence', 'security', 'liberty'], reversed: ['evil', 'suspicion', 'suspense', 'fear', 'mistrust'] },
queen_of_swords: { upright: ['widowhood', 'female sadness and embarrassment', 'absence', 'sterility', 'mourning', 'privation', 'separation'], reversed: ['malice', 'bigotry', 'artifice', 'prudery', 'bale', 'deceit'] },
queen_of_wands: { upright: ['a dark woman', 'countrywoman', 'friendly', 'chaste', 'loving', 'honourable', 'love of money'], reversed: ['good', 'economical', 'obliging', 'serviceable', 'opposition', 'jealousy', 'even deceit and infidelity'] },
seven_of_cups: { upright: ['fairy favours', 'images of reflection', 'sentiment', 'imagination'], reversed: ['desire', 'will', 'determination', 'project'] },
seven_of_pentacles: { upright: ['business', 'barter', 'quarrels', 'ingenuity', 'purgation'], reversed: [] },
seven_of_swords: { upright: ['design', 'attempt', 'wish', 'hope', 'confidence', 'quarrelling', 'annoyance'], reversed: ['good advice', 'counsel', 'instruction', 'slander', 'babbling'] },
seven_of_wands: { upright: ['the vantage position', 'wordy strife', 'negotiations', 'war of trade', 'barter', 'competition'], reversed: ['perplexity', 'embarrassments', 'anxiety'] },
six_of_cups: { upright: ['looking back', 'happiness', 'enjoyment', 'things that have vanished', 'giving new relations', 'new knowledge', 'new environment'], reversed: ['the future', 'renewal'] },
six_of_pentacles: { upright: ['presents', 'gifts', 'present prosperity'], reversed: ['desire', 'cupidity', 'envy', 'jealousy', 'illusion'] },
six_of_swords: { upright: ['journey by water', 'route', 'envoy', 'commissionary', 'expedient'], reversed: ['declaration', 'confession', 'publicity'] },
six_of_wands: { upright: ['the crown of hope'], reversed: ['apprehension', 'fear', 'treachery', 'disloyalty', 'indefinite delay'] },
star: { upright: ['loss', 'theft', 'privation', 'abandonment'], reversed: ['arrogance', 'haughtiness', 'impotence'] },
strength: { upright: ['power', 'energy', 'action', 'courage', 'magnanimity', 'complete success and honours'], reversed: ['despotism', 'abuse if power', 'weakness', 'discord'] },
sun: { upright: ['material happiness', 'fortunate marriage', 'contentment'], reversed: [] },
temperance: { upright: ['economy', 'moderation', 'frugality', 'management', 'accommodation'], reversed: ['things connected with churches', 'religions', 'sects', 'the priesthood', 'disunion', 'unfortunate combinations', 'competing interests'] },
ten_of_cups: { upright: ['contentment', 'the town'], reversed: ['indignation', 'violence'] },
ten_of_pentacles: { upright: ['gain', 'riches', 'family matters', 'archives', 'extraction'], reversed: ['chance', 'fatality', 'loss', 'robbery', 'games of hazard', 'dowry', 'pension'] },
ten_of_swords: { upright: ['pain', 'affliction', 'tears', 'sadness', 'desolation'], reversed: ['advantage', 'profit', 'success', 'favour', 'power and authority'] },
ten_of_wands: { upright: ['gain', 'any kind of success', 'disguise', 'perfidy'], reversed: ['contrarieties', 'difficulties', 'intrigues'] },
three_of_cups: { upright: ['perfection and merriment', 'happy issue', 'victory', 'fulfilment', 'solace', 'healing'], reversed: ['expedition', 'dispatch', 'achievement', 'end'] },
three_of_pentacles: { upright: ['metier', 'trade', 'skilled labour', 'aristocracy', 'renown', 'glory'], reversed: ['mediocrity', 'puerility', 'pettiness', 'weakness'] },
three_of_swords: { upright: ['removal', 'absence', 'delay', 'division', 'rupture', 'dispersion'], reversed: ['mental alienation', 'error', 'loss', 'distraction', 'disorder', 'confusion'] },
three_of_wands: { upright: ['enterprise', 'effort', 'trade', 'commerce', 'discovery', 'bearing his merchandise'], reversed: ['the end of troubles', 'toil and disappointment'] },
tower: { upright: ['misery', 'distress', 'indigence', 'adversity', 'calamity', 'disgrace', 'deception', 'ruin'], reversed: ['imprisonment', 'tyranny'] },
two_of_cups: { upright: ['love', 'passion', 'friendship', 'affinity', 'union', 'concord', 'sympathy'], reversed: [] },
two_of_pentacles: { upright: ['recreation and its connexions', 'agitation', 'trouble', 'embroilment'], reversed: ['enforced gaiety', 'simulated enjoyment', 'handwriting', 'composition', 'letters of exchange'] },
two_of_swords: { upright: ['courage', 'friendship', 'affection', 'intimacy'], reversed: ['imposture', 'falsehood', 'duplicity', 'disloyalty'] },
two_of_wands: { upright: ['riches', 'fortune', 'magnificence', 'physical suffering', 'disease', 'chagrin', 'sadness', 'mortification', 'the mortification'], reversed: ['surprise', 'wonder', 'enchantment', 'emotion', 'trouble', 'fear'] },
wheel_of_fortune: { upright: ['destiny', 'fortune', 'success', 'elevation', 'luck', 'felicity'], reversed: ['increase', 'abundance', 'superfluity'] },
world: { upright: ['assured success', 'recompense', 'voyage', 'route', 'emigration', 'flight', 'change of place'], reversed: ['inertia', 'fixity', 'stagnation', 'permanence', 'ill'] },
};
const waiteAdditional = {
ace_of_cups: { upright: ['inflexible will', 'unalterable law'], reversed: ['unexpected change of position'] },
ace_of_pentacles: { upright: [], reversed: [] },
ace_of_swords: { upright: [], reversed: ['marriage broken off'] },
ace_of_wands: { upright: ['calamities of all kinds'], reversed: ['a sign of birth'] },
eight_of_cups: { upright: [], reversed: ['perfect satisfaction'] },
eight_of_pentacles: { upright: ['a dark girl'], reversed: [] },
eight_of_swords: { upright: [], reversed: ['departure of a relative'] },
eight_of_wands: { upright: [], reversed: [] },
five_of_cups: { upright: ['generally favourable', 'a happy marriage', 'patrimony', 'legacies', 'gifts', 'success in enterprise'], reversed: [] },
five_of_pentacles: { upright: [], reversed: ['troubles in love'] },
five_of_swords: { upright: [], reversed: [] },
five_of_wands: { upright: ['success in financial speculation'], reversed: [] },
four_of_cups: { upright: ['contrarieties'], reversed: ['presentiment'] },
four_of_pentacles: { upright: [], reversed: ['observation', 'hindrances'] },
four_of_swords: { upright: ['a bad card'], reversed: [] },
four_of_wands: { upright: ['unexpected good fortune'], reversed: [] },
king_of_cups: { upright: [], reversed: ['loss'] },
king_of_pentacles: { upright: ['a rather dark man', 'a merchant', 'master', 'professor'], reversed: [] },
king_of_swords: { upright: ['a lawyer', 'senator', 'doctor'], reversed: ['a bad man'] },
king_of_wands: { upright: [], reversed: [] },
knight_of_cups: { upright: [], reversed: ['irregularity'] },
knight_of_pentacles: { upright: ['an useful man', 'useful discoveries'], reversed: [] },
knight_of_swords: { upright: ['a soldier', 'man of arms', 'satellite', 'stipendiary'], reversed: ['struggle with a rival'] },
knight_of_wands: { upright: ['a bad card', 'alienation'], reversed: ['marriage'] },
nine_of_cups: { upright: [], reversed: ['good business'] },
nine_of_pentacles: { upright: [], reversed: ['vain hopes'] },
nine_of_swords: { upright: ['an ecclesiastic', 'a priest'], reversed: [] },
nine_of_wands: { upright: ['a bad card'], reversed: [] },
page_of_cups: { upright: ['good augury'], reversed: ['obstacles of all kinds'] },
page_of_pentacles: { upright: ['a dark youth', 'a child'], reversed: [] },
page_of_swords: { upright: [], reversed: ['astonishing news'] },
page_of_wands: { upright: [], reversed: ['bad news'] },
queen_of_cups: { upright: [], reversed: [] },
queen_of_pentacles: { upright: ['dark woman'], reversed: ['an illness'] },
queen_of_swords: { upright: ['a widow'], reversed: ['a bad woman'] },
queen_of_wands: { upright: ['a good harvest'], reversed: ['goodwill towards the querent'] },
seven_of_cups: { upright: ['fair child', 'idea', 'design', 'resolve', 'movement'], reversed: ['success'] },
seven_of_pentacles: { upright: [], reversed: ['impatience', 'apprehension', 'suspicion'] },
seven_of_swords: { upright: ['dark girl', 'a good card'], reversed: ['good advice', 'probably neglected'] },
seven_of_wands: { upright: ['a dark child'], reversed: [] },
six_of_cups: { upright: ['pleasant memories'], reversed: [] },
six_of_pentacles: { upright: [], reversed: [] },
six_of_swords: { upright: [], reversed: ['unfavourable issue of lawsuit'] },
six_of_wands: { upright: [], reversed: ['fulfilment of deferred hope'] },
ten_of_cups: { upright: [], reversed: ['sorrow', 'a serious quarrel'] },
ten_of_pentacles: { upright: ['represents house or dwelling'], reversed: [] },
ten_of_swords: { upright: ['imprisonment'], reversed: [] },
ten_of_wands: { upright: ['difficulties and contradictions'], reversed: [] },
three_of_cups: { upright: [], reversed: ['consolation', 'cure', 'end of the business'] },
three_of_pentacles: { upright: [], reversed: [] },
three_of_swords: { upright: [], reversed: ['a nun'] },
three_of_wands: { upright: ['a very good card', 'collaboration will favour enterprise'], reversed: [] },
two_of_cups: { upright: ['wealth and honour'], reversed: ['passion'] },
two_of_pentacles: { upright: [], reversed: ['bad omen', 'ignorance', 'injustice'] },
two_of_swords: { upright: ['gifts for a lady'], reversed: ['dealings with rogues'] },
two_of_wands: { upright: [], reversed: [] },
};
const foliRecurrence = {
ace: {
4: { natural: ['financial loss', 'separation from friends', 'love troubles', 'imprisonment'], reversed: [] },
3: { natural: ['passing troubles', 'relieved by good news'], reversed: [] },
2: { natural: [], reversed: [] },
},
eight: {
4: { natural: [], reversed: ['undisturbed stability'] },
3: { natural: ['new family ties', 'honourable intentions'], reversed: ['flirtation', 'dissipation and foolishness'] },
2: { natural: ['frivolous pleasures', 'passing love fancies', 'an unlooked-for development'], reversed: [] },
},
king: {
4: { natural: ['honours', 'preferment', 'good appointments'], reversed: [] },
3: { natural: [], reversed: [] },
2: { natural: ['co-operation in business'], reversed: [] },
},
nine: {
4: { natural: ['accomplishment of unexpected events'], reversed: [] },
3: { natural: ['health', 'wealth', 'happiness'], reversed: [] },
2: { natural: ['prosperity and contentment', 'testamentary documents'], reversed: ['small worries'] },
},
queen: {
4: { natural: [], reversed: [] },
3: { natural: ['friendly visits'], reversed: ['scandal', 'gossip'] },
2: { natural: ['petty confidences interchanged', 'secrets betrayed', 'a meeting between friends'], reversed: [] },
},
seven: {
4: { natural: ['schemes and snares', 'contention and opposition'], reversed: [] },
3: { natural: ['ill-health', 'remorse'], reversed: [] },
2: { natural: ['mutual love', 'an unexpected event'], reversed: ['faithlessness', 'deceit or regret'] },
},
ten: {
4: { natural: ['good fortune', 'wealth'], reversed: [] },
3: { natural: [], reversed: [] },
2: { natural: ['unexpected luck'], reversed: [] },
},
};
const waiteRecurrence = {
natural: {
king: { 4: 'great honour', 3: 'consultation', 2: 'minor counsel' },
queen: { 4: 'great debate', 3: 'deception by women', 2: 'sincere friends' },
knight: { 4: 'serious matters', 3: 'lively debate', 2: 'intimacy' },
page: { 4: 'dangerous illness', 3: 'dispute', 2: 'disquiet' },
ten: { 4: 'condemnation', 3: 'new condition', 2: 'change' },
nine: { 4: 'a good friend', 3: 'success', 2: 'receipt' },
eight: { 4: 'reverse', 3: 'marriage', 2: 'new knowledge' },
seven: { 4: 'intrigue', 3: 'infirmity', 2: 'news' },
six: { 4: 'abundance', 3: 'success', 2: 'irritability' },
five: { 4: 'regularity', 3: 'determination', 2: 'vigils' },
four: { 4: 'journey near at hand', 3: 'a subject of reflection', 2: 'insomnia' },
three: { 4: 'progress', 3: 'unity', 2: 'calm' },
two: { 4: 'contention', 3: 'security', 2: 'accord' },
ace: { 4: 'favourable chance', 3: 'small success', 2: 'trickery' },
},
reversed: {
king: { 4: 'celerity', 3: 'commerce', 2: 'projects' },
queen: { 4: 'bad company', 3: 'gluttony', 2: 'work' },
knight: { 4: 'alliance', 3: 'a duel, or personal encounter', 2: 'susceptibility' },
page: { 4: 'privation', 3: 'idleness', 2: 'society' },
ten: { 4: 'event, happening', 3: 'disappointment', 2: 'expectation justified' },
nine: { 4: 'usury', 3: 'imprudence', 2: 'a small profit' },
eight: { 4: 'error', 3: 'a spectacle', 2: 'misfortune' },
seven: { 4: 'quarrellers', 3: 'joy', 2: 'women of no repute' },
six: { 4: 'care', 3: 'satisfaction', 2: 'downfall' },
five: { 4: 'order', 3: 'hesitation', 2: 'reverse' },
four: { 4: 'walks abroad', 3: 'disquiet', 2: 'dispute' },
three: { 4: 'great success', 3: 'serenity', 2: 'safety' },
two: { 4: 'reconciliation', 3: 'apprehension', 2: 'mistrust' },
ace: { 4: 'dishonour', 3: 'debauchery', 2: 'enemies' },
},
};

;
/* mofa.js */
const mofaTerms = {
fool: { up: ['開端', '自由', '純真', '獨創性', '冒險', '理想主義', '自發性'], rv: ['魯莽', '粗心', '分心', '幼稚', '愚蠢', '容易上當', '陳舊', '遲鈍'] },
magician: { up: ['意志力', '慾望', '足智多謀', '技能', '能力', '專注', '表現'], rv: ['操縱', '狡猾', '詭計', '浪費天賦', '錯覺', '欺騙'] },
high_priestess: { up: ['無意識', '直覺', '神秘', '靈性', '更高的力量', '內在的聲音'], rv: ['被壓抑的直覺', '隱藏的動機', '膚淺', '困惑', '認知失調'] },
empress: { up: ['神聖的女性', '性感', '生育力', '培育', '創造力', '美麗', '豐富', '自然'], rv: ['不安全', '專橫', '疏忽', '窒息', '缺乏成長', '缺乏進步'] },
emperor: { up: ['穩定性', '結構', '保護', '權威', '控制', '實用性', '重點', '紀律'], rv: ['暴君', '霸道', '死板', '固執', '缺乏紀律', '魯莽'] },
hierophant: { up: ['傳統', '社會群體', '約定俗成', '從眾', '教育', '知識', '信仰'], rv: ['叛逆', '非常規', '不循規蹈矩', '新方法', '無知'] },
lovers: { up: ['愛', '工會', '夥伴關係', '關係', '選擇', '浪漫', '平衡', '團結'], rv: ['不和諧', '不平衡', '衝突', '超脫', '錯誤的選擇', '優柔寡斷'] },
chariot: { up: ['成功', '雄心', '決心', '意志力', '控制力', '自律', '專注'], rv: ['有力', '沒有方向', '沒有控制', '無力', '侵略', '障礙'] },
strength: { up: ['勇氣', '勇敢', '自信', '同情', '內在力量'], rv: ['自我懷疑', '軟弱', '低信心', '不足', '怯懦', '強硬'] },
hermit: { up: ['自我反省', '內省', '沉思', '退縮', '孤獨', '尋找自我'], rv: ['孤獨', '孤立', '隱居', '反社會', '拒絕', '回歸社會'] },
wheel_of_fortune: { up: ['變化', '週期', '命運', '決定性時刻', '運氣', '財富', '突發事件'], rv: ['運氣不好', '缺乏控制', '執著於控制', '不受歡迎的變化', '延誤'] },
justice: { up: ['正義', '業力', '後果', '責任', '法律', '真相', '誠實', '正直', '因果'], rv: ['不公正', '報復', '不誠實', '腐敗', '不公平', '逃避責任'] },
hanged_man: { up: ['犧牲', '等待', '不確定', '缺乏方向', '視角', '沉思'], rv: ['拖延', '漠不關心', '停滯不前', '避免犧牲', '冷漠'] },
death: { up: ['轉變', '結局', '改變', '過渡', '放手', '釋放'], rv: ['害怕改變', '重複消極的模式', '抵制改變', '停滯不前', '腐朽'] },
temperance: { up: ['平衡', '和平', '耐心', '適度', '平靜', '安寧', '和諧', '寧靜'], rv: ['不平衡', '過度', '極端', '不和諧', '魯莽', '倉促'] },
devil: { up: ['壓迫', '成癮', '痴迷', '依賴', '過度', '無力', '局限'], rv: ['獨立', '自由', '啟示', '釋放', '收回權力', '收回控制'] },
tower: { up: ['災難', '破壞', '劇變', '創傷', '突變', '混亂'], rv: ['避免災難', '延遲不可避免的', '抵制變化'] },
star: { up: ['希望', '靈感', '積極性', '信念', '更新', '治愈', '復興'], rv: ['絕望', '消極', '缺乏信心', '沮喪'] },
moon: { up: ['錯覺', '直覺', '不確定性', '困惑', '複雜性', '秘密', '無意識'], rv: ['恐懼', '欺騙', '焦慮', '誤解', '曲解', '清晰', '理解'] },
sun: { up: ['幸福', '成功', '樂觀', '活力', '喜悅', '自信', '真理'], rv: ['幸福受阻', '過度熱情', '悲觀', '不切實際的期望', '自負'] },
judgement: { up: ['自我評價', '覺醒', '更新', '目的', '反思', '清算'], rv: ['自我懷疑', '缺乏自我意識', '未能吸取教訓', '自我厭惡'] },
world: { up: ['完成', '成就', '成就感', '歸屬感', '整體性', '和諧'], rv: ['缺乏封閉感', '缺乏成就感', '感覺不完整', '空虛'] },
ace_of_wands: { up: ['靈感', '創意火花', '新倡議', '新激情', '熱情', '活力'], rv: ['延遲', '阻礙', '缺乏激情', '缺乏活力', '猶豫', '創意阻礙'] },
two_of_wands: { up: ['計劃', '第一步', '做出決定', '留下舒適感', '承擔風險'], rv: ['糟糕的計劃', '過度分析', '不採取行動', '謹慎行事', '規避風險'] },
three_of_wands: { up: ['動力', '信心', '擴張', '增長', '遠見', '展望'], rv: ['限制', '局限', '缺乏進展', '障礙', '延誤', '挫折'] },
four_of_wands: { up: ['社區', '家庭', '慶典', '聚會', '穩定', '歸屬感'], rv: ['缺乏支持', '不穩定', '感覺不受歡迎', '短暫', '缺乏根源', '家庭衝突'] },
five_of_wands: { up: ['衝突', '競爭', '爭論', '侵略', '緊張', '對手', '自我衝突'], rv: ['衝突結束', '合作', '協議', '休戰', '和諧', '和平', '避免衝突'] },
six_of_wands: { up: ['成功', '勝利', '獎勵', '認可', '讚美', '讚譽', '驕傲'], rv: ['失敗', '缺乏認可', '沒有獎勵', '缺乏成就'] },
seven_of_wands: { up: ['保護自己', '為自己挺身而出', '保護領土'], rv: ['放棄', '認輸', '讓步', '缺乏自信', '投降'] },
eight_of_wands: { up: ['運動', '速度', '進步', '快速決定', '突然變化', '興奮'], rv: ['等待', '緩慢', '混亂', '延誤', '失去動力', '倉促', '毫無準備'] },
nine_of_wands: { up: ['最後立場', '堅持', '毅力', '韌性', '接近成功', '疲勞'], rv: ['頑固', '僵硬', '防禦', '拒絕妥協', '放棄'] },
ten_of_wands: { up: ['負擔', '責任', '義務', '壓力', '精疲力竭', '鬥爭'], rv: ['不下放', '肩負太多責任', '崩潰'] },
page_of_wands: { up: ['冒險', '興奮', '新鮮的想法', '開朗', '精力充沛', '無所畏懼', '外向'], rv: ['倉促', '不耐煩', '缺乏想法', '發脾氣', '懶惰', '無聊', '不可靠', '心煩意亂'] },
knight_of_wands: { up: ['勇敢', '精力充沛', '迷人', '英雄', '叛逆', '脾氣暴躁', '自由精神'], rv: ['傲慢', '魯莽', '不耐煩', '缺乏自製力', '被動', '易變', '專橫'] },
queen_of_wands: { up: ['自信', '熱情', '堅定', '社交', '有魅力', '活潑', '樂觀'], rv: ['苛求', '報復心強', '自信心不足', '嫉妒', '自私', '喜怒無常', '欺負人'] },
king_of_wands: { up: ['領導力', '遠見', '大局', '掌控', '大膽的決定', '大膽', '樂觀'], rv: ['強勢', '霸道', '暴君', '惡毒', '無能為力', '無效', '軟弱的領導者'] },
ace_of_cups: { up: ['愛', '新感覺', '情感覺醒', '創造力', '靈性', '直覺'], rv: ['冷漠', '空虛', '情緒失落', '創造力受阻', '感覺不被愛', '陰鬱'] },
two_of_cups: { up: ['團結', '夥伴關係', '吸引力', '聯繫', '緊密聯繫', '聯合力量', '相互尊重'], rv: ['分離', '拒絕', '分裂', '不平衡', '緊張', '溝通不良', '退縮'] },
three_of_cups: { up: ['友誼', '社區', '聚會', '慶祝活動', '團體活動', '社交活動'], rv: ['八卦', '醜聞', '過度', '孤立', '孤獨', '不平衡的社會生活'] },
four_of_cups: { up: ['冷漠', '沉思', '感覺與世隔絕', '憂鬱', '無聊', '不滿'], rv: ['清晰', '意識', '接受', '選擇幸福', '抑鬱', '消極'] },
five_of_cups: { up: ['失落', '悲傷', '失望', '哀悼', '不滿'], rv: ['接受', '繼續前進', '尋找平靜', '滿足', '看到積極的一面'] },
six_of_cups: { up: ['懷舊', '回憶', '熟悉', '治愈', '安慰', '多愁善感', '愉悅'], rv: ['困在過去', '前進', '離家', '獨立'] },
seven_of_cups: { up: ['選擇', '尋找目標', '幻想', '白日夢', '一廂情願', '優柔寡斷'], rv: ['缺乏目標', '混亂', '轉移', '分心', '清晰', '做出選擇'] },
eight_of_cups: { up: ['放棄', '走開', '放手', '尋找真相', '留下'], rv: ['停滯', '單調', '接受較少', '迴避', '害怕改變', '處於糟糕的境地'] },
nine_of_cups: { up: ['願望成真', '滿足', '成功', '成就', '認可', '快樂'], rv: ['不快樂', '缺乏滿足感', '失望', '成績不佳', '傲慢', '勢利'] },
ten_of_cups: { up: ['幸福', '回家', '滿足', '情緒穩定', '安全', '家庭和諧'], rv: ['不愉快的家', '分離', '家庭衝突', '不和諧', '孤立'] },
page_of_cups: { up: ['理想主義', '敏感', '夢想家', '天真', '內心的孩子', '雲中的頭腦'], rv: ['情緒脆弱', '不成熟', '忽視內在小孩', '逃避現實', '不安全感'] },
knight_of_cups: { up: ['理想主義者', '迷人的', '藝術的', '優雅的', '委婉的', '外交的', '調解人', '談判者'], rv: ['失望', '發脾氣', '喜怒無常', '混亂', '避免衝突', '虛榮'] },
queen_of_cups: { up: ['同情', '溫暖', '善良', '直覺', '治療師', '輔導員', '支持'], rv: ['不安全', '給予太多', '過於敏感', '有需要', '脆弱', '依賴', '殉難'] },
king_of_cups: { up: ['明智的', '外交的', '頭腦和心靈之間的平衡', '忠誠的', '顧問'], rv: ['不知所措', '焦慮', '冷漠', '壓抑', '孤僻', '控制欲強', '自私'] },
ace_of_swords: { up: ['清晰', '突破', '新想法', '專注', '遠見', '力量', '真理'], rv: ['混亂', '溝通不暢', '敵意', '爭論', '破壞', '殘暴'] },
two_of_swords: { up: ['僵局', '艱難抉擇', '左右為難', '否認', '隱藏信息'], rv: ['優柔寡斷', '猶豫', '焦慮', '沒有正確的選擇', '真相大白'] },
three_of_swords: { up: ['心碎', '分離', '悲傷', '不安', '失落', '創傷', '眼淚'], rv: ['治愈', '寬恕', '恢復', '和解', '壓抑情緒'] },
four_of_swords: { up: ['休息', '放鬆', '和平', '庇護', '療養', '自我保護', '恢復活力'], rv: ['恢復', '覺醒', '重新進入世界', '擺脫孤立', '煩躁', '倦怠'] },
five_of_swords: { up: ['爭論', '糾紛', '侵略', '欺凌', '恐嚇', '衝突', '敵意', '壓力'], rv: ['和解', '解決', '妥協', '報復', '後悔', '悔恨', '減少損失'] },
six_of_swords: { up: ['繼續前進', '離開', '留下', '距離', '接受教訓'], rv: ['困在過去', '重蹈覆轍', '逃避問題', '陷入困境'] },
seven_of_swords: { up: ['謊言', '詭計', '策略', '足智多謀', '偷偷摸摸', '狡猾'], rv: ['懺悔', '良心', '悔恨', '惡意', '真相大白'] },
eight_of_swords: { up: ['被困', '受限', '受害', '癱瘓', '無助', '無能為力', '監禁'], rv: ['自由', '釋放', '控制', '倖存者', '面對恐懼', '賦權', '投降'] },
nine_of_swords: { up: ['恐懼', '焦慮', '消極', '崩潰', '絕望', '噩夢', '孤立'], rv: ['康復', '學習應對', '面對生活', '尋求幫助', '羞恥', '內疚', '心理健康問題'] },
ten_of_swords: { up: ['毀滅', '失敗', '痛苦', '崩潰', '疲憊', '死胡同', '受害', '背叛'], rv: ['生存', '改善', '治愈', '經驗教訓', '絕望', '復發'] },
page_of_swords: { up: ['好奇', '詼諧', '健談', '善於交際', '有靈感', '警惕', '警覺', '思維敏捷'], rv: ['散漫', '憤世嫉俗', '諷刺', '八卦', '侮辱', '粗魯', '缺乏計劃'] },
knight_of_swords: { up: ['自信', '直接', '不耐煩', '聰明', '大膽', '專注', '完美主義者', '雄心勃勃'], rv: ['粗魯', '不圓滑', '強硬', '欺凌', '好鬥', '惡毒', '無情', '傲慢'] },
queen_of_swords: { up: ['誠實', '獨立', '有原則', '公平', '建設性批評', '客觀', '有洞察力'], rv: ['悲觀的', '惡意的', '操縱性的', '苛刻的', '苦澀的', '殘忍的', '欺騙的', '無情的'] },
king_of_swords: { up: ['理性', '權威', '紀律', '誠信', '道德', '嚴肅', '高標準'], rv: ['非理性的', '獨裁者', '壓迫性的', '不人道的', '控制性的', '冷酷的', '無情的', '不誠實的'] },
ace_of_pentacles: { up: ['新機會', '資源', '豐富', '繁榮', '安全', '穩定', '表現'], rv: ['錯失機會', '稀缺', '不足', '不穩定', '吝嗇', '錯誤的投資'] },
two_of_pentacles: { up: ['平衡資源', '適應', '足智多謀', '靈活性', '拉伸資源'], rv: ['不平衡', '無組織', '不堪重負', '凌亂', '混亂', '過度擴張'] },
three_of_pentacles: { up: ['團隊合作', '共同目標', '協作', '學徒', '努力', '集中精力'], rv: ['缺乏凝聚力', '缺乏團隊合作', '冷漠', '動力不足', '衝突', '自我', '競爭'] },
four_of_pentacles: { up: ['佔有欲', '不安全感', '囤積', '吝嗇', '穩定', '安全', '儲蓄', '唯物主義', '財富', '節儉', '界限', '守衛'], rv: ['慷慨', '給予', '消費', '開放', '財務不安全', '魯莽消費'] },
five_of_pentacles: { up: ['困難', '損失', '孤立', '感覺被遺棄', '逆境', '鬥爭', '失業', '疏遠', '恥辱'], rv: ['積極的改變', '從損失中恢復', '克服逆境', '寬恕', '感到受歡迎'] },
six_of_pentacles: { up: ['慷慨', '慈善', '社區', '物質幫助', '支持', '分享', '給予和接受', '感恩'], rv: ['權力動態', '濫用慷慨', '附帶禮物', '不平等', '敲詐勒索'] },
seven_of_pentacles: { up: ['收穫', '獎勵', '結果', '成長', '進步', '毅力', '耐心', '計劃'], rv: ['未完成的工作', '拖延', '低努力', '浪費', '缺乏成長', '挫折', '急躁', '缺乏獎勵'] },
eight_of_pentacles: { up: ['技能', '才能', '工藝', '質量', '高標準', '專業知識', '掌握', '承諾', '奉獻', '成就'], rv: ['缺乏素質', '倉促工作', '名聲不好', '缺乏動力', '平庸', '懶惰', '低技能', '死胡同'] },
nine_of_pentacles: { up: ['有回報的努力', '成功', '成就', '獨立', '休閒', '物質保障', '自給自足'], rv: ['被守衛', '物質不穩定', '不計後果', '膚淺'] },
ten_of_pentacles: { up: ['遺產', '根源', '家庭', '祖先', '繼承', '意外之財', '基金會', '特權', '富裕', '穩定', '傳統'], rv: ['家庭糾紛', '破產', '債務', '轉瞬即逝的成功', '金錢衝突', '不穩定', '打破傳統'] },
page_of_pentacles: { up: ['雄心勃勃', '勤奮', '目標導向', '計劃者', '始終如一', '好學', '腳踏實地', '忠誠', '可靠'], rv: ['愚蠢的', '不成熟的', '不負責任的', '懶惰的', '成績不佳的', '拖延的', '錯失的機會', '糟糕的前景'] },
knight_of_pentacles: { up: ['實用', '可靠', '高效', '堅忍', '緩慢而穩定', '勤奮', '忠誠', '耐心', '保守'], rv: ['工作狂', '懶惰', '沉悶', '無聊', '沒有主動性', '廉價', '不負責任', '賭徒', '冒險投資'] },
queen_of_pentacles: { up: ['慷慨', '關懷', '培育', '居家', '良好的商業意識', '實用', '舒適', '熱情', '明智', '豪華'], rv: ['自私', '蓬頭垢面', '嫉妒', '缺乏安全感', '貪婪', '物質主義', '淘金者', '不寬容'] },
king_of_pentacles: { up: ['豐富', '繁榮', '安全', '雄心勃勃', '善良', '保護性', '商人', '提供者', '感性', '可靠'], rv: ['貪婪', '物質主義', '浪費', '沙文主義', '糟糕的財務決策', '賭徒', '剝削性', '佔有欲'] },
};

;
/* waite-zh.js */
const waiteZh = {
'a bad card': '不吉的牌',
'a bad man': '壞男人',
'a bad woman': '壞女人',
'a child': '孩子',
'a dangerous rival': '危險的對手',
'a dark child': '深色頭髮的孩子',
'a dark girl': '深色頭髮的女孩',
'a dark woman': '深色頭髮的女子',
'a dark young man': '深色頭髮的青年',
'a dark youth': '深色頭髮的少年',
'a good card': '吉利的牌',
'a good harvest': '豐收',
'a great person': '顯貴人物',
'a happy marriage': '美滿的婚姻',
'a lawyer': '律師',
'a lover': '愛人',
'a merchant': '商人',
'a nun': '修女',
'a postman': '郵差',
'a priest': '神父',
'a rather dark man': '髮色偏深的男子',
'a serious quarrel': '嚴重的爭吵',
'a sign of birth': '生育的徵兆',
'a soldier': '軍人',
'a studious youth': '好學的青年',
'a very good card': '極吉的牌',
'a widow': '寡婦',
'abandonment': '遺棄',
'abode': '居所',
'absence': '缺席',
'abundance': '豐盛',
'abuse if power': '濫用權力',
'accident': '意外',
'accommodation': '通融',
'accomplishment': '達成',
'achievement': '成就',
'action': '行動',
'activity in undertakings': '事業上的活躍',
'address': '機敏手腕',
'adjournment': '延期',
'advances': '示好接近',
'advantage': '優勢',
'adversity': '逆境',
'affection': '情愛',
'affinities': '情投意合',
'affinity': '契合',
'affliction': '苦難',
'agitation': '騷動',
'aid': '援助',
'alienation': '疏離',
'alliance': '結盟',
'alliances': '諸般結盟',
'an ecclesiastic': '教士',
'an envoy': '使者',
'an illness': '疾病',
'an useful man': '有用的人',
'ancestry': '血統家世',
'anecdotes': '軼聞',
'announcements': '通告',
'annoyance': '煩擾',
'anxiety': '焦慮',
'any kind of success': '任何形式的成功',
'apathy': '冷漠',
'application': '勤勉',
'apprehension': '憂懼',
'approach': '逼近',
'archives': '檔案文書',
'aristocracy': '貴族',
'arrival': '到來',
'arrogance': '傲慢',
'arrows of jealousy': '妒忌之箭',
'art and science': '技藝與學問',
'artifice': '巧計',
'assured success': '篤定的成功',
'astonishing news': '驚人的消息',
'attachment': '依戀',
'attempt': '嘗試',
'attraction': '吸引',
'augmentation': '增長',
'austere': '嚴峻',
'authority': '權威',
'authority and will': '權威與意志',
'avarice': '貪婪',
'aversion': '厭惡',
'babbling': '饒舌',
'bad faith': '背信',
'bad intelligence': '壞消息',
'bad news': '噩耗',
'bad omen': '凶兆',
'bale': '禍害',
'barbarity': '野蠻殘暴',
'barter': '以物易物',
'bearing his merchandise': '負貨而行',
'beauty': '美貌',
'beginning': '開端',
'benevolence': '仁慈',
'bewrayment': '洩露',
'bias': '偏頗',
'bigotry': '偏執',
'birth': '誕生',
'blindness': '盲目',
'body politic': '政體',
'bravery': '勇敢',
'burial and obsequies': '埋葬與喪儀',
'business': '事業',
'calamities of all kinds': '各種災禍',
'calamity': '災厄',
'calumny': '誹謗',
'capacity': '才幹',
'captivity': '囚禁',
'carelessness': '疏忽',
'censure': '譴責',
'certitude': '確信',
'chagrin': '懊惱',
'chance': '機運',
'change of place': '處所變動',
'change of position': '地位變動',
'change of residence': '遷居',
'chaos': '混亂',
'chaste': '貞潔',
'childbirth': '分娩',
'circumspection': '審慎',
'clandestine': '隱密',
'collaboration will favour enterprise': '合作有利於事業',
'comfortable material conditions': '優渥物質條件',
'command': '統率',
'commerce': '商貿',
'commission': '委任',
'commissionary': '受任者',
'compassion': '憐憫',
'competing interests': '利益競逐',
'competition': '競爭',
'complete success and honours': '圓滿成功與榮譽',
'composition': '和解',
'concealment': '隱瞞',
'conceit': '自負',
'conception': '受孕',
'concord': '和睦',
'concordance': '相合一致',
'confession': '坦承',
'confidence': '信心',
'conflict': '衝突',
'confusion': '混亂',
'confusion to enemies': '敵人潰亂',
'conquest': '征服',
'consanguinity': '血親',
'considerable loss': '重大損失',
'consolation': '慰藉',
'content': '心滿意足',
'contentment': '知足',
'contradiction': '矛盾',
'contrarieties': '諸多拂逆',
'conviction': '堅定信念',
'corruption': '腐敗',
'counsel': '忠告',
'country life': '鄉間生活',
'countryman': '鄉間男子',
'countrywoman': '鄉間女子',
'courage': '勇氣',
'craftsmanship': '工藝技藝',
'creation': '創造',
'creative intelligence': '創造性智性',
'credit': '信用',
'crisis': '危機',
'cruelty': '殘酷',
'cupidity': '貪婪',
'cure': '痊癒',
'danger': '危險',
'dark girl': '深色頭髮的女孩',
'dark man': '深髮男子',
'dark woman': '深色頭髮的女子',
'dark young man': '深髮青年',
'darkness': '黑暗',
'dealings with rogues': '與無賴往來',
'death': '死亡',
'decadence': '頹敗',
'deceit': '欺瞞',
'deception': '蒙騙',
'decision': '決斷',
'declaration': '表明宣告',
'defeat': '挫敗',
'defence': '防禦',
'degradation': '淪落',
'delay': '延遲',
'deliberation': '審慎斟酌',
'delirium': '譫妄',
'demeanour': '舉止儀態',
'departure': '離去',
'departure of a relative': '親人離去',
'depravity': '敗德',
'design': '圖謀',
'desire': '慾望',
'desolation': '淒涼荒蕪',
'despair': '絕望',
'despotism': '專制',
'destiny': '命運',
'destitution': '赤貧',
'destruction': '毀滅',
'determination': '決心',
'devoted woman': '忠貞的女子',
'difficulties': '重重困難',
'difficulties and contradictions': '困難與矛盾',
'difficulty': '困難',
'diplomacy': '外交手腕',
'disappointment': '失望',
'disaster': '災難',
'discernment': '洞察力',
'discord': '不和',
'discouragement': '氣餒',
'discovery': '發現',
'disease': '疾病',
'disgrace': '蒙羞',
'disguise': '偽裝',
'disgust': '厭惡',
'dishonest': '不誠實',
'dishonour': '名譽掃地',
'disloyalty': '背信',
'disorder': '失序',
'dispatch': '速辦',
'dispersion': '離散',
'dispute': '爭執',
'disputes': '諸多爭執',
'disquiet': '不安',
'dissimulation': '佯裝',
'dissipation': '放蕩',
'distraction': '心神渙散',
'distress': '困厄',
'distribution': '分配',
'disunion': '決裂',
'divination': '占卜',
'divinity': '神性',
'division': '分裂',
'doctor': '醫生',
'double-dealing man': '兩面派的男人',
'doubt': '疑慮',
'dowry': '嫁妝',
'duplicity': '表裡不一',
'economical': '節儉',
'economy': '節約',
'ecstasy': '狂喜',
'effort': '努力',
'elevation': '高升',
'embarrassments': '窘境',
'embellishment': '潤飾',
'embroilment': '糾紛',
'emigration': '移居',
'emotion': '情緒',
'employment': '職務',
'enchantment': '魅惑',
'end': '終結',
'end of the business': '事情了結',
'energy': '精力',
'enforced gaiety': '強顏歡笑',
'enjoyment': '享樂',
'enmity': '敵意',
'enterprise': '事業',
'envoy': '使者',
'envy': '嫉妒',
'equity': '公允',
'error': '謬誤',
'even deceit and infidelity': '甚至是欺瞞與不忠',
'evil': '邪惡',
'evil fatality': '凶惡的宿命',
'evil intention': '惡意',
'evil news': '噩耗',
'exaction': '苛索',
'examination': '審查',
'excessive severity': '過度嚴苛',
'executive': '執行的權柄',
'exile': '流放',
'expedient': '權宜之計',
'expedition': '迅捷',
'extraction': '出身',
'extraordinary efforts': '非凡的努力',
'extravagance': '揮霍',
'failure': '失敗',
'failure of marriage projects': '婚事告吹',
'fair child': '淺髮色的孩子',
'fair man': '金髮男子',
'fair woman': '金髮女子',
'fair young man': '金髮青年',
'fairy favours': '精靈的眷顧',
'faithful': '忠實',
'fall': '墜落',
'false projects': '虛妄的圖謀',
'falsehood': '謊言',
'family': '家族',
'family matters': '家務事',
'fatality': '劫數',
'favour': '恩寵',
'fear': '恐懼',
'feasting': '宴飲',
'felicity': '幸福',
'felicity hereof': '由此而來的幸福',
'female sadness and embarrassment': '女子的憂傷與窘迫',
'fertility': '豐饒',
'fixity': '固著',
'flight': '逃遁',
'folly': '愚行',
'foolish designs': '愚蠢的圖謀',
'force': '力量',
'fortunate marriage': '良緣',
'fortune': '幸運',
'fraud': '詐欺',
'frenzy': '狂亂',
'friend': '朋友',
'friendly': '友善',
'friendship': '友誼',
'frugality': '節儉',
'fruitfulness': '多產',
'fulfilment': '圓滿',
'fulfilment of deferred hope': '延宕的希望終獲實現',
'gain': '獲利',
'games of hazard': '賭局',
'generally favourable': '大體有利',
'generally married': '多半已婚',
'generosity': '慷慨',
'gift': '贈禮',
'gifts': '諸多餽贈',
'gifts for a lady': '給女士的禮物',
'giving joy': '帶來喜樂',
'giving new relations': '締結新關係',
'glory': '榮耀',
'gold': '黃金',
'good': '善',
'good advice': '良言忠告',
'good augury': '吉兆',
'good business': '好生意',
'good understanding': '融洽相知',
'good woman': '良善女子',
'goodwill towards the querent': '對問卜者的善意',
'great haste': '極度倉促',
'great hope': '厚望',
'great joy': '大喜',
'great riches': '钜富',
'handwriting': '手書',
'happiness': '幸福',
'happy issue': '美好結局',
'harmony': '和諧',
'haughtiness': '倨傲',
'haven of refuge': '避風港',
'healing': '療癒',
'hermit\'s repose': '隱者之憩',
'hidden enemies': '暗敵',
'hindrances': '阻礙',
'holy table': '聖桌',
'honest': '誠實',
'honest and conscientious': '誠實盡責',
'honour': '榮譽',
'honourable': '可敬',
'hope': '希望',
'hope destroyed': '希望破滅',
'husband': '丈夫',
'idea': '想法',
'idleness': '怠惰',
'ignorance': '無知',
'ill': '禍害',
'illusion': '幻象',
'images of reflection': '映照之象',
'imaginary vexations': '臆想煩擾',
'imagination': '想像',
'imitation': '仿效',
'immaturity': '未熟',
'impatience': '不耐',
'imperfections': '缺陷',
'imposture': '冒名頂替',
'impotence': '無能為力',
'imprisonment': '囚禁',
'imprudence': '輕率',
'incapacity': '無能',
'incitement': '煽動',
'inclination': '傾心',
'inconstancy': '善變',
'increase': '增益',
'indefinite delay': '無限期延宕',
'indigence': '赤貧',
'indignation': '義憤',
'inertia': '惰性',
'infamy': '惡名',
'inflexible will': '不可動搖的意志',
'ingenuity': '巧思',
'inheritance': '繼承',
'initiative': '主動',
'injustice': '不義',
'inspiration': '靈感',
'instability': '不穩',
'instruction': '教誨',
'interest': '利益',
'internal dispute': '內部爭執',
'interruption': '中斷',
'intimacy': '親密',
'intoxication': '沉醉',
'intrigues': '陰謀',
'intuition': '直覺',
'invention': '發明',
'invitation': '邀約',
'irregularity': '失序',
'jealousy': '嫉妒',
'journey by water': '水路之旅',
'joy': '喜悅',
'law': '法律',
'law and art': '法律與技藝',
'legacies': '遺產',
'legacy': '遺贈',
'legal complications': '法律糾紛',
'length of days': '長壽',
'lethargy': '昏沉',
'letters of exchange': '匯票',
'liberality': '慷慨',
'liberty': '自由',
'light': '光',
'litigation': '訴訟',
'looking back': '回顧',
'loss': '損失',
'love': '愛',
'love of money': '貪財',
'loving': '深情',
'loving intelligence': '慈愛的智性',
'loyalty': '忠誠',
'luck': '運氣',
'luxury': '奢華',
'magnanimity': '寬宏',
'magnificence': '華美',
'magus': '魔法師',
'malice': '惡意',
'man of arms': '武人',
'man of business': '生意人',
'management': '經營',
'mania': '狂躁',
'many contrarieties': '諸多阻逆',
'marriage': '婚姻',
'marriage broken off': '婚約破裂',
'master': '雇主',
'material happiness': '物質的幸福',
'mediocrity': '平庸',
'meditation': '冥想',
'mental alienation': '精神錯亂',
'mental disease': '精神疾病',
'mercy and goodness': '慈悲與良善',
'message': '訊息',
'metier': '本行',
'mildness': '溫和',
'militant intelligence': '尚武的智性',
'miscarriage': '挫敗',
'misery': '悲慘',
'mistress': '情婦',
'mistrust': '不信任',
'moderation': '節制',
'modesty': '謙遜',
'money': '金錢',
'moral or physical ardour': '精神或肉體的熱切',
'mortality': '必死',
'mortification': '屈辱',
'mourning': '哀悼',
'movement': '行動',
'multiplicity': '繁多',
'mutation': '變異',
'mystery': '奧祕',
'negligence': '疏忽',
'negotiations': '談判',
'new environment': '新環境',
'new instruction': '新的教導',
'new knowledge': '新知',
'new relations': '新的人際關係',
'news': '消息',
'nourishment': '滋養',
'novelty': '新奇',
'nullity': '虛無',
'obliging': '殷勤',
'observation': '觀察',
'obstacles': '障礙',
'obstacles of all kinds': '各種阻礙',
'obstruction': '阻撓',
'occult forces': '神祕力量',
'offices of the crown': '王室職位',
'opposition': '對立',
'opulence': '豐裕',
'origin': '起源',
'outcome': '結果',
'overkindness': '過度仁慈',
'overseeing': '監督',
'pain': '痛苦',
'passion': '激情',
'patrimony': '祖產',
'peace': '和平',
'pension': '年金',
'perdition': '沉淪',
'perfect contentment': '圓滿的知足',
'perfect satisfaction': '圓滿的滿足',
'perfection and merriment': '圓滿與歡愉',
'perfidy': '背信',
'peril': '危難',
'permanence': '恆常',
'perplexity': '困惑',
'perverse woman': '乖戾的女人',
'perversity': '乖戾',
'petrifaction': '僵化',
'pettiness': '小器',
'physical bien-etre': '身體安適',
'physical suffering': '肉體的痛苦',
'physician': '醫者',
'pillage': '劫掠',
'placidity': '恬靜',
'pleasant memories': '愉快的回憶',
'pleasure': '愉悅',
'policy': '權謀',
'power': '力量',
'power and authority': '權力與威權',
'power in trammels': '受縛的力量',
'precaution': '防範',
'presage': '預兆',
'present prosperity': '當前的興旺',
'presentiment': '預感',
'presents': '禮物',
'presumption': '僭妄',
'principle': '原則',
'privation': '匱乏',
'probably neglected': '多半被忽略',
'probity': '廉正',
'prodigality': '揮霍',
'professor': '教授',
'profit': '獲利',
'profligacy': '放蕩',
'project': '計畫',
'prophecy': '預言',
'proposition': '提議',
'prosperity': '興旺',
'protection': '庇護',
'providence also war': '天佑，亦主戰爭',
'prudence': '審慎',
'prudery': '假正經',
'public rejoicings': '公眾的歡慶',
'publicity': '張揚',
'puerility': '幼稚',
'purgation': '滌淨',
'pusillanimity': '怯懦',
'quarrel': '爭吵',
'quarrelling': '口角不斷',
'quarrels': '諸般爭執',
'ravage': '蹂躪',
'realization': '實現',
'realizing intelligence': '實現的智慧',
'reason': '理性',
'reasonable fear': '合理的恐懼',
'recompense': '報償',
'recreation and its connexions': '消遣及其牽連',
'reflection': '沉思',
'religions': '諸宗教',
'removal': '遷移',
'renewal': '更新',
'renown': '聲望',
'repose': '安歇',
'represents house or dwelling': '代表房屋或住所',
'resistance': '抵抗',
'resolve': '決心',
'responsibility': '責任',
'responsible': '負責任的',
'retreat': '退隱',
'return': '歸返',
'revocation': '撤銷',
'revolution': '劇變',
'riches': '財富',
'rightness': '正當',
'riot': '暴亂',
'robbery': '劫掠',
'roguery': '奸詐行徑',
'route': '路途',
'ruin': '毀滅',
'rule': '統治',
'rupture': '決裂',
'sacrifice': '犧牲',
'sadness': '悲傷',
'safety': '安全',
'satellite': '隨從',
'scandal': '醜聞',
'scholarship': '學識',
'science': '學問',
'secret service': '密勤',
'secrets': '秘密',
'sects': '教派',
'security': '保障',
'seduction': '誘騙',
'self-confidence': '自信',
'selfishness': '自私',
'senator': '議員',
'sentence': '判決',
'sentiment': '情感',
'separation': '分離',
'serviceable': '有用',
'serviceableness': '助益',
'servitude': '奴役',
'sham fight': '佯戰',
'shame': '羞恥',
'sickness': '疾病',
'silence': '沉默',
'simplicity': '純樸',
'simulated enjoyment': '偽裝的歡愉',
'skill': '技藝',
'skilled labour': '技術勞動',
'slander': '誹謗',
'sleep': '睡眠',
'snares of enemies': '敵人的羅網',
'society': '社交',
'solace': '慰藉',
'solitude': '孤獨',
'somnambulism': '夢遊',
'sorrow': '悲傷',
'source': '源頭',
'speedy intelligence': '迅捷的消息',
'spying': '窺探',
'stability': '穩固',
'stagnation': '停滯',
'sterility': '不孕',
'stingings of conscience': '良心的刺痛',
'stipendiary': '領餉的人',
'struggle with a rival': '與對手的爭鬥',
'study': '鑽研',
'subtlety': '狡黠',
'success': '成功',
'success in enterprise': '事業成功',
'success in financial speculation': '投機獲利',
'success in these paths': '此道之成功',
'succour': '救援',
'superfluity': '過剩',
'surface knowledge': '皮相之知',
'surprise': '意外',
'suspense': '懸而未決',
'suspension': '中止',
'suspicion': '猜疑',
'swiftness': '迅捷',
'swindling': '詐財',
'sympathy': '投契',
'taste': '品味',
'tears': '淚水',
'tenacity': '堅忍',
'terror': '恐怖',
'testament': '遺囑',
'the arrows of love': '愛之箭',
'the crowd': '群眾',
'the crown of hope': '希望之冠',
'the end of troubles': '苦難的終結',
'the future': '未來',
'the mortification': '羞辱',
'the priesthood': '神職',
'the querent': '問卜者',
'the querent herself': '問卜者本人（女性）',
'the surety of possessions': '財產的保障',
'the town': '城鎮',
'the unknown': '未知',
'the vantage position': '有利之位',
'theft': '竊盜',
'things connected with churches': '與教會相關之事',
'things that have vanished': '已消逝之物',
'timidity': '膽怯',
'toil and disappointment': '勞苦與失望',
'tomb and coffin': '墳墓與棺木',
'trade': '貿易',
'transmission': '傳遞',
'treachery': '背叛',
'trials': '試煉',
'trials overcome': '試煉已克',
'trickery': '詭計',
'triumph': '凱旋',
'triumph of force': '武力的勝利',
'trouble': '煩憂',
'troubles in love': '感情上的麻煩',
'truth': '真理',
'tyranny': '暴政',
'ugliness': '醜陋',
'unalterable law': '不可更改的法則',
'unexpected change of position': '地位的意外變動',
'unexpected good fortune': '意外的好運',
'unfavourable issue of lawsuit': '訴訟結果不利',
'unfavourable news': '不利的消息',
'unfortunate combinations': '不幸的組合',
'union': '結合',
'unprepared state': '未備之態',
'unreasoned caution': '無端戒慎',
'useful discoveries': '有用的發現',
'usury': '高利貸',
'utility': '效用',
'vacillation': '猶疑不定',
'vain hopes': '徒然的希望',
'valour': '英勇',
'vanity': '虛榮',
'vehemence': '激烈',
'vengeance': '復仇',
'vice': '惡習',
'victory': '勝利',
'vigilance': '警覺',
'violence': '暴力',
'violent chagrin': '劇烈懊惱',
'virtue': '美德',
'voided ambition': '落空的野心',
'voided project': '落空的計畫',
'voyage': '航程',
'war': '戰爭',
'war of trade': '商戰',
'weakness': '軟弱',
'wealth and honour': '財富與榮譽',
'weariness': '倦怠',
'what is unforeseen': '未預見之事',
'widowhood': '孀居',
'will': '意志',
'wisdom': '智慧',
'wise administration': '善治',
'wish': '心願',
'wonder': '驚奇',
'wordy strife': '口舌之爭',
'work': '工作',
'wrath': '震怒',
};
function waiteTermZh(en) {
const zh = waiteZh[en];
return zh ? zh : null;
}

;
/* systems.js */
const suitSystem = {
'Wands':     { element: 'Fire',  french: 'Clubs',    faculty: 'suit.faculty.wands' },
'Cups':      { element: 'Water', french: 'Hearts',   faculty: 'suit.faculty.cups' },
'Swords':    { element: 'Air',   french: 'Spades',   faculty: 'suit.faculty.swords' },
'Pentacles': { element: 'Earth', french: 'Diamonds', faculty: 'suit.faculty.pentacles' }
};
const numberPlanets = {
'Three': 'Saturn', 'Four': 'Jupiter', 'Five': 'Mars', 'Six': 'Sun',
'Seven': 'Venus', 'Eight': 'Mercury', 'Nine': 'Moon', 'Ten': 'Earth'
};
const thierensMajors = {
magician: 'Aries', high_priestess: 'Taurus', empress: 'Gemini', emperor: 'Cancer',
hierophant: 'Leo', lovers: 'Virgo', chariot: 'Libra', justice: 'Scorpio',
hermit: 'Sagittarius', wheel_of_fortune: 'Capricorn', strength: 'Aquarius',
hanged_man: 'Pisces', death: 'Saturn', temperance: 'Mercury', devil: 'Mars',
tower: 'Uranus', star: 'Venus', moon: null, sun: null,
judgement: 'Jupiter', world: 'Neptune', fool: 'Earth'
};
const thierensSuits = {
'Wands':     { element: 'Air',   startHouse: 1 },
'Cups':      { element: 'Water', startHouse: 9 },
'Swords':    { element: 'Earth', startHouse: 1 },
'Pentacles': { element: 'Fire',  startHouse: 5 }
};
const HOUSE_SIGN = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
const PIP_ORDER = ['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];
function thierensMinor(card) {
if (!card) return null;
const s = thierensSuits[card.suit];
if (!s) return null;
const i = PIP_ORDER.indexOf(card.number);
if (i < 0) return null;
const house = ((s.startHouse - 1 + i) % 12) + 1;
return { element: s.element, house, sign: HOUSE_SIGN[house - 1] };
}
const waiteCourtLooks = {
'Wands':     'court.looks.wands',
'Cups':      'court.looks.cups',
'Swords':    'court.looks.swords',
'Pentacles': 'court.looks.pentacles'
};
const zodiacQuality = {
Aries: 'cardinal', Taurus: 'fixed', Gemini: 'mutable', Cancer: 'cardinal',
Leo: 'fixed', Virgo: 'mutable', Libra: 'cardinal', Scorpio: 'fixed',
Sagittarius: 'mutable', Capricorn: 'cardinal', Aquarius: 'fixed', Pisces: 'mutable'
};
const zodiacTriplicity = {
Aries: 'Fire', Leo: 'Fire', Sagittarius: 'Fire',
Taurus: 'Earth', Virgo: 'Earth', Capricorn: 'Earth',
Gemini: 'Air', Libra: 'Air', Aquarius: 'Air',
Cancer: 'Water', Scorpio: 'Water', Pisces: 'Water'
};
const CARD_CLASS_COUNT = { major: 22, court: 16, pip: 40 };
const COURT_RANKS = ['Page', 'Knight', 'Queen', 'King'];
function cardClass(card) {
if (!card) return null;
if (card.suit === 'Major Arcana') return 'major';
return COURT_RANKS.includes(card.number) ? 'court' : 'pip';
}
function cardElement(card) {
if (!card || !suitSystem[card.suit]) return null;
return suitSystem[card.suit].element;
}
const SYSTEMS_ELEMENT_KEY = { Fire: 'element.fire', Water: 'element.water', Air: 'element.air', Earth: 'element.earth' };
const SYSTEMS_FRENCH_KEY = { Clubs: 'french.clubs', Hearts: 'french.hearts', Spades: 'french.spades', Diamonds: 'french.diamonds' };
function systemsSignKey(sign) {
return 'sign.' + sign.toLowerCase();
}
function systemsPlanetKey(planet) {
return 'planet.' + planet.toLowerCase();
}
function systemsSignRows(sign, rows) {
if (!sign || !zodiacQuality[sign]) return;
rows.push({ label: 'systems.label.quality', value: 'quality.' + zodiacQuality[sign] });
if (zodiacTriplicity[sign]) {
rows.push({ label: 'systems.label.triplicity', value: SYSTEMS_ELEMENT_KEY[zodiacTriplicity[sign]] });
}
}
function cardSystems(card) {
const out = [];
if (!card) return out;
const std = suitSystem[card.suit];
if (std) {
const rows = [
{ label: 'systems.label.element', value: SYSTEMS_ELEMENT_KEY[std.element] },
{ label: 'systems.label.faculty', value: std.faculty },
{ label: 'systems.label.french', value: SYSTEMS_FRENCH_KEY[std.french] }
];
const planet = numberPlanets[card.number];
if (planet) rows.push({ label: 'systems.label.planet', value: systemsPlanetKey(planet) });
out.push({ source: 'systems.std.source', note: 'systems.std.note', rows });
}
const tRows = [];
let tSign = null;
if (card.suit === 'Major Arcana') {
const v = thierensMajors[card.nameKey];
if (v) {
const isSign = !!zodiacQuality[v];
tRows.push({
label: isSign ? 'systems.label.sign' : 'systems.label.planet',
value: isSign ? systemsSignKey(v) : systemsPlanetKey(v)
});
if (isSign) tSign = v;
}
} else {
const m = thierensMinor(card);
if (m) {
tRows.push({ label: 'systems.label.element', value: SYSTEMS_ELEMENT_KEY[m.element] });
tRows.push({ label: 'systems.label.house', value: 'systems.house', vars: { n: m.house } });
tRows.push({ label: 'systems.label.sign', value: systemsSignKey(m.sign) });
tSign = m.sign;
}
}
systemsSignRows(tSign, tRows);
if (tRows.length) {
const stdEl = cardElement(card);
const tEl = card.suit !== 'Major Arcana' && thierensMinor(card) ? thierensMinor(card).element : null;
const clash = !!(stdEl && tEl && stdEl !== tEl);
out.push({
source: 'systems.thierens.source',
note: clash ? 'systems.thierens.note.clash' : 'systems.thierens.note',
rows: tRows
});
}
return out;
}

;
/* meanings.js */
const cardMeanings = {
fool: { keywords: ['新開始', '冒險', '純真', '可能性'], upright: '帶著純粹的信任踏上未知旅程，新的開始正在向你招手，充滿無限可能。此刻你不需要完整的地圖，也不必等到萬事俱備，勇敢跨出第一步就夠了。允許自己是新手，把好奇心放在恐懼前面，讓經驗在路上長出來。挑一件你想試卻遲遲沒動的事，縮小成今天做得完的規模。', reversed: '這裡的能量卡在兩個極端：魯莽行事，或裹足不前。提醒你在冒險前先看清腳下，別讓天真變成輕率；但如果你已經站在原地很久，問題就不是勇氣不足，而是把風險想得太完整。試著把大跳躍拆成小步驟，先確認自己輸得起的範圍，再讓好奇心帶路。' },
magician: { keywords: ['意志', '創造', '行動', '資源整合'], upright: '你已擁有實現目標所需的一切工具，缺的不是條件，而是把它們串起來的那個決定。這是集中意志、化想法為行動的最佳時機：清點手上的技能、人脈與時間，選定一個目標，然後把念頭變成別人接得到的具體動作。主動開口、主動安排，事情會因為你動手而開始移動。', reversed: '才能還沒被善用，能量卡在空轉：想得很多、講得很好，卻遲遲沒有真的動手。也可能出現操弄或虛張聲勢的成分，包裝跑在實質前面。請檢視你的動機與方法：你想完成一件事，還是想讓人以為你完成了？把注意力拉回可以驗收的產出，力量就會回來。' },
high_priestess: { keywords: ['直覺', '潛意識', '靜觀', '內在智慧'], upright: '答案其實在你心裡，只是被太多雜音蓋住了。靜下來聆聽直覺，尚未揭露的訊息正在醞釀，此刻適合觀察與蒐集，而不是急著表態或拍板。把日程留白一點，允許自己暫時不知道；第一個冒出來的念頭值得記下來，之後多半會被驗證。等心裡真的踏實了，再開口也不遲。', reversed: '你可能正在忽視內在的聲音，或過度依賴表象與別人的意見，讓外界的音量蓋過了自己的判斷。也可能有祕密即將浮上檯面，某些一直被繞過的事開始鬆動。這不是壞消息：能被看見的，才有機會被處理。找一個安靜的時段，把心裡那個早就知道的答案誠實寫下來。' },
empress: { keywords: ['豐盛', '滋養', '創造力', '感官'], upright: '豐饒與滋養的能量正環繞著你，適合創作、經營關係，好好享受生活的美好。這個階段的重點不是效率，是條件：把土壤顧好，該長的自然會長。用陪伴、料理與具體的照顧表達心意，比講道理更有效；也請把自己放進被照顧的名單裡，好好吃飯睡覺並不是奢侈，而是續航的基礎。', reversed: '滋養的方向失衡了：可能是過度付出到自己見底，也可能是依賴他人照顧而不敢自己長。創造力因此受阻，靈感明明還在，卻擠不出來。解法不是更努力，而是先好好滋養自己，把休息、飲食與獨處排進行事曆，讓能量回填。你的付出很珍貴，但它需要一個不空的源頭。' },
emperor: { keywords: ['秩序', '權威', '結構', '責任'], upright: '以紀律和規劃建立穩固的基礎，掌握主導權，承擔起領導的責任。這個階段適合把混亂的事拆成流程，訂出界線、時程與可以被檢核的標準。秩序聽起來很無趣，但它讓事情不必每次重來，也讓身邊的人睡得著覺。先問自己想守住什麼，再據此設計規則；你的可靠會被看見。', reversed: '控制過度了，或權威的天平歪向一邊：不是你把人管得太緊，就是有人用規矩壓著你。僵化的規則可能正壓抑著成長，那套秩序如今只剩下維持它自己。值得問的是，這條規定現在還在保護誰？把已經失效的部分鬆開，保留真正撐住事情的骨架，結構才會重新為你工作。' },
hierophant: { keywords: ['傳統', '信仰', '指導', '體制'], upright: '向前人的智慧與體制學習，尋求導師的指引，遵循經過驗證的道路。別人踩過的坑已經被整理成規則，你不必每一個都自己再踩一次。此刻循著既有的方法、資格或制度走，會比自創路線省力也安全。找一位真正做過的人請教，把問題問得具體一點。', reversed: '你開始質疑傳統，想走自己的路，這股鬆動本身是健康的：規矩若只靠慣性存在，本來就該被重新檢查。但小心別為了反對而反對，把叛逆當成立場會讓你錯過真正有用的部分。先分清楚哪些規則你是認同的、哪些只是不想惹麻煩才遵守的，再決定要留下什麼、丟掉什麼。' },
lovers: { keywords: ['愛', '結合', '選擇', '價值觀'], upright: '心靈契合的深刻連結正在發生，或是一個關乎價值觀的重要選擇擺在眼前。這張牌請你跟隨真心，而真心不是一時的心動，是你願意長期為它付出的那件事。如果是關係，坦誠比技巧重要；如果是抉擇，先把你在乎的東西排出順序，答案通常就在第一名那裡。選了，就好好承擔它。', reversed: '關係出現失衡，或內心有兩股力量在拉扯，怎麼選都覺得有所虧欠。這通常不是誰對誰錯，而是你說重視的，跟你實際會挑的，不是同一樣。選擇前先誠實面對自己的價值排序：把選項寫下來，問問哪一個是你真的要，哪一個只是別人期待你要。看清楚了，猶豫會自己變小。' },
chariot: { keywords: ['意志力', '勝利', '掌控', '前進'], upright: '以堅定的意志駕馭矛盾的力量，全速前進，勝利在望。你不需要先消滅內心的分歧，只需要清楚知道自己要去哪裡；方向一旦確定，那些互相拉扯的部分就會被帶著走。此刻適合設定明確的目標與期限，把資源集中在一條路線上，別分心經營備案。動能正強，趁勢推進。', reversed: '方向失控了，或動力整個潰散，車還在動卻不知道要去哪。多數時候問題不在你不夠努力，而在目的地先模糊掉了，於是每一分力氣都互相抵銷。先重新掌穩韁繩再出發：停下來把目標寫成一句話，砍掉不服務它的事情。與其更用力踩油門，不如先確認自己面向哪一邊。' },
strength: { keywords: ['勇氣', '柔韌', '耐心', '內在力量'], upright: '真正的力量是溫柔的堅持，以耐心與慈悲馴服內在的野性。你不必壓制自己的憤怒、慾望或恐懼，只要不讓它們替你開車。這張牌出現時，硬碰硬多半不划算，反而是持續、和緩、不放棄的那種施力最有效。對別人如此，對自己更是；你撐得住，只是需要用對力氣，而不是更用力。', reversed: '力量往內收了，變成自我懷疑，或者反過來讓情緒衝出了閘門。兩種樣子其實同源：你對自己說話的方式太兇了。請重新連結內心的勇氣，方法不是逼自己堅強，而是先把責備放下，承認現在確實有點難。找回一件你做得到的小事，做完它。溫柔對待自己，力氣會慢慢長回來。' },
hermit: { keywords: ['內省', '獨處', '尋道', '智慧'], upright: '暫別喧囂向內探尋，你尋找的光其實就提在自己手中。這是主動的獨處：把外面的聲音關掉一陣子，不是為了躲，是為了聽清楚自己在想什麼。此刻適合減少社交、放慢節奏、把問題寫下來慢慢想。答案不會一次全給你，燈只照亮下一步，那也夠了。想清楚了，記得把它帶回生活裡用。', reversed: '獨處的時間拉得太長了，變成過度孤立或逃避人群。內省不該變成封閉：當思考只剩下自己一個聲音，它會開始繞圈，而你會把繞圈誤認成深度。也可能是相反的狀況，你太久沒給自己安靜的空檔。分辨的方法很簡單：問這段獨處讓你更清楚，還是更害怕見人？答案會告訴你下一步。' },
wheel_of_fortune: { keywords: ['轉變', '機運', '週期', '命運'], upright: '命運之輪正在轉動，順勢而為，把握突如其來的機遇。事情開始有它自己的動能，有些變化不是你安排的，但可以是你利用的。這張牌的建議很實際：正在往上時放大動作、多接一點，別客氣；此刻的順利不必歸功於運氣，你的準備才是接得住它的原因。同時記得，輪子還會再轉。', reversed: '感覺時運不濟，或你在跟一個已經啟動的變化拔河。請記住低谷也是週期的一部分，現在輪到低點，不代表你這個人變差了。逆勢時的正確動作不是加倍用力，是保存體力：縮小戰線、減少不必要的支出與承諾，把該修的東西修好。等輪子轉回來的時候，你會希望自己是有力氣的。' },
justice: { keywords: ['公正', '真相', '因果', '平衡'], upright: '因果自有衡量，誠實面對真相，做出公正的決定。這張牌要你把眼睛睜開，別擺出無所謂的姿態：把事實攤開，包含那些對你不利的部分，然後承擔你該承擔的那一份。衡量之後要有行動，光是想通了不算數。適合處理合約、協商與需要講理的場合；只要你站得住腳，就把話說清楚。', reversed: '天平歪了：可能是有人偏頗，也可能是有人把該扛的那部分推開了，而那個人有時候是你。請正視自己在局面中的角色，先算清楚哪些是你造成的、哪些不是，別把兩者混在一起懲罰自己。也提醒你別急著當審判者；在資訊還沒攤開之前下的判決，多半得再改一次。' },
hanged_man: { keywords: ['換位思考', '暫停', '犧牲', '放下'], upright: '主動的暫停與換位思考，一時的犧牲換來全新的視野。硬想是想不通的，有些結只有從別的方向才解得開；此刻停下來不是浪費時間，而是必要的工序。試著把手上的堅持鬆開一點，讓別人的說法整個進來一次。你放棄的多半只是控制感，換到的是你原本的位置看不到的畫面。', reversed: '暫停失去了產出，變成無謂的拖延與停滯：你還吊在那裡，卻沒有在看新的東西。放不下反而被困住，而困住你的通常是那個不想承認已經改變的想法。也可能是相反的，你根本沒讓自己停過。分辨很簡單：這段停頓有沒有讓你長出新的看法？沒有的話，就該落地行動了。' },
death: { keywords: ['結束', '轉化', '放下', '重生'], upright: '一個階段確實結束了，這不是懲罰，是事實；放手讓轉化發生，新生自然會到來。改變本身不跟你談判，你能決定的是怎麼接：與其耗力氣把它拉回原狀，不如把力氣花在整理與告別。允許自己難過，也允許自己往前。給結束一個像樣的儀式，你會發現騰出來的空間比失去的更大。', reversed: '你正在抗拒一個已經發生的結束，抓著過去不放，只會把痛苦延長成一種習慣。這不是你軟弱，是因為那樣東西真的重要過。但轉化被卡住的時候，人會停在一個既不好也不壞的地方很久。試著先承認它結束了，只是承認，不必馬上放下。鬆手是有階段的，你可以慢慢來。' },
temperance: { keywords: ['平衡', '調和', '耐心', '中道'], upright: '在兩極之間找到流動的平衡，耐心調和，欲速則不達。這裡的平衡不是靜止不動，而是持續的微調：你不必選邊，你在配比例。這張牌適合需要時間發酵的事，關係、身體、學習都一樣，該花的時間省不掉。此刻的做法是把節奏放慢一點，兩邊各留一些，然後每隔一陣子回頭校正一次。', reversed: '生活失衡了，有一項悄悄吃掉了大部分的你：工作、情緒、某個人、某個習慣。過猶不及，重新調配你的能量比例，通常不必砍掉什麼，只要把配方調回來。也可能是耐心用完了，你想跳過發酵直接收成。找出那個吃掉最多你的項目，這週先讓它少一點，把空出來的份還給其他部分。' },
devil: { keywords: ['束縛', '慾望', '成癮', '陰影'], upright: '檢視捆綁你的慾望或關係，那條鎖鏈其實鬆得可以自己掙脫。這張牌不責備你，只是把處境攤開來：某個模式讓你反覆回去，可能是成癮、消耗你的關係，或待不下卻不敢走的工作。你以為別無選擇，但選項一直在。把它說出口，講給一個信得過的人聽，被看見的束縛就少了一半力氣。', reversed: '這是覺醒與掙脫的時刻，你正在拿回自己的力量。某個你一直說沒辦法的處境，突然顯得不再那麼理所當然；看見，通常就是鬆綁的第一步。接下來的功課是把覺察變成動作：設一條具體的界線，或退出一個消耗你的循環。不必一次做到完美，走出去半步，鎖鏈就再也扣不回原位。' },
tower: { keywords: ['劇變', '崩解', '覺醒', '真相'], upright: '建立在錯誤基礎上的東西終將崩塌，劇變雖痛，卻是必要的清理。碎掉的多半是一個你用來解釋自己的版本，你本人還在。此刻最不划算的是急著把瓦片撿回原位；先確認自己安全，讓塵埃落定，再看看哪些東西其實不必重建。它收掉的，多半是你早就在勉強維持的部分。', reversed: '你可能正勉強撐住搖搖欲墜的現狀：裂縫已經感覺到了，卻還在替它找解釋。延遲的崩解通常比當下的崩解更貴，因為維持假象的力氣是每天在扣的。也可能是虛驚一場，該來的其實沒有來。無論哪一種，此刻適合主動檢查地基：自己拆掉的，總比等它砸下來溫柔得多。' },
star: { keywords: ['希望', '療癒', '靈感', '信心'], upright: '風暴過後的寧靜與希望，傷口正在癒合，請相信未來。這裡不保證速度，只保證你沒有走偏：此刻不需要用力，只需要別鬆手。心情要顧，日子也要顧，兩邊得一起養，只補一邊都會空。做點沒有目的、卻真的滋養你的事，信心會一點一點長回來。', reversed: '信心動搖了，靈感也像枯竭一樣擠不出來。但希望仍在，只是暫時被雲遮住：你看不見它，不代表它移動過。這種時候最需要的不是激勵，是把標準降低一點，允許自己只做到六十分。找一件小到不可能失敗的事做完，再找一個能讓你安心說話的人。雲會散，你只要在原地等到那時候。' },
moon: { keywords: ['不安', '幻象', '潛意識', '迷惘'], upright: '前路朦朧、真假難辨，恐懼多半來自想像，穩住步伐就好。前面不是沒有路，只是照明不足，影子容易被讀成威脅。此刻該慢，但不必停：把腳步放小，一次只確認一件事，別在能見度低的時候做大決定。也留意那些說不上來的不安，它可能在提醒你某個還沒被說破的細節。', reversed: '迷霧漸散、真相浮現，不安的情緒開始退潮。那些嚇人的輪廓，多半是自己在暗處補上去的；真的存在的，規模也比想像小得多。這是很好的位置：看清楚之後，恐懼就變回可以處理的問題。趁著視線清楚，把之前不敢問的事問清楚、不敢確認的細節確認掉。' },
sun: { keywords: ['喜悅', '成功', '活力', '清晰'], upright: '陽光普照的成功與喜悅，一切清晰明朗，盡情發光就好。這是少數不需要附加條件的位置：事情會順，話說得出口，你不必費力解釋自己。喜悅也不需要被賺到，此刻的快樂不欠任何人。限制當然還在，只是這一刻它們不重要。適合把成果曬出來、把好消息分享出去。', reversed: '快樂被烏雲暫時遮蔽，或者相反，樂觀過了頭，把順利當成不用做事的許可。但本質依然是好牌：光沒有消失，只是你此刻感覺不到它的溫度。也可能你正把自己縮小，怕太亮會刺到別人。試著誠實一點問：你是真的不快樂，還是覺得自己不該快樂？願意發光，本來就不需要別人批准。' },
judgement: { keywords: ['覺醒', '召喚', '重生', '總結'], upright: '內在的召喚響起了，有件事你心裡清楚，該去處理了。回顧過去、原諒自己，然後迎接重生。這張牌要你把帳算完，但這是為了往前走，不是回頭懊悔：把帳算清楚，是為了輕裝上路。適合做總結、道歉、把懸而未決的事收尾。原諒自己是最難也最必要的一步。', reversed: '你可能正忽視內心的呼喚，或者聽見了，卻立刻拿自我要求把它壓掉。反覆檢討不等於負責，多半只是把自己釘在原地。該放過自己了：你當時的判斷是用當時的資訊做的，那已經是能做到的了。也可能是召喚還沒清晰，那就別急著宣布結論。先停止內在的審判，聲音自然會浮出來。' },
world: { keywords: ['完成', '圓滿', '整合', '成就'], upright: '一個週期圓滿完成，慶祝你的成就，世界正為你敞開。你走完了一整圈，該收的收了、該學的學了，此刻值得停下來承認自己做到了。圓滿不等於停止：這一圈學到的東西會被你帶進下一圈，所以慶祝完，也可以開始想下一個題目。別跳過慶祝那一段。', reversed: '只差最後一哩路的未完成：差的那一塊往往小得可笑，小到每次都被排到明天。找出它，好好收尾，這件事帶來的釋放會比你以為的大。也可能是你完成了，卻沒有承認它，於是那個圈始終沒有真的關起來。給自己一個明確的結束點：做完最後那一步，或正式宣布這一段到此為止。' },
ace_of_wands: { keywords: ['靈感', '開端', '熱情', '潛能'] },
two_of_wands: { keywords: ['規劃', '遠見', '抉擇', '視野'] },
three_of_wands: { keywords: ['展望', '進展', '等待收穫', '擴張'] },
four_of_wands: { keywords: ['慶祝', '穩定', '歸屬', '里程碑'] },
five_of_wands: { keywords: ['競爭', '衝突', '磨合', '切磋'] },
six_of_wands: { keywords: ['勝利', '認可', '榮耀', '自信'] },
seven_of_wands: { keywords: ['堅守', '防禦', '挑戰', '立場'] },
eight_of_wands: { keywords: ['迅速', '進展', '消息', '行動'] },
nine_of_wands: { keywords: ['韌性', '戒備', '最後一哩', '疲憊'] },
ten_of_wands: { keywords: ['重擔', '責任', '超載', '堅持'] },
page_of_wands: { keywords: ['探索', '熱忱', '好奇', '新訊'] },
knight_of_wands: { keywords: ['冒險', '衝勁', '魅力', '行動派'] },
queen_of_wands: { keywords: ['自信', '魅力', '獨立', '溫暖'] },
king_of_wands: { keywords: ['願景', '領導', '魄力', '開創'] },
ace_of_cups: { keywords: ['新感情', '情感豐沛', '直覺', '慈悲'] },
two_of_cups: { keywords: ['連結', '互惠', '夥伴', '相知'] },
three_of_cups: { keywords: ['友誼', '慶祝', '社群', '支持'] },
four_of_cups: { keywords: ['冷漠', '沉思', '錯過', '不滿足'] },
five_of_cups: { keywords: ['失落', '悲傷', '遺憾', '殘存希望'] },
six_of_cups: { keywords: ['回憶', '純真', '舊識', '療癒'] },
seven_of_cups: { keywords: ['幻想', '選擇過多', '迷惑', '白日夢'] },
eight_of_cups: { keywords: ['離開', '追尋', '放下', '更高追求'] },
nine_of_cups: { keywords: ['滿足', '願望成真', '享受', '自豪'] },
ten_of_cups: { keywords: ['圓滿', '家庭', '和諧', '幸福'] },
page_of_cups: { keywords: ['敏感', '創意', '訊息', '童心'] },
knight_of_cups: { keywords: ['浪漫', '追求', '邀請', '理想主義'] },
queen_of_cups: { keywords: ['同理', '直覺', '包容', '情感智慧'] },
king_of_cups: { keywords: ['情緒成熟', '寬容', '平衡', '智慧'] },
ace_of_swords: { keywords: ['清晰', '真相', '突破', '新想法'] },
two_of_swords: { keywords: ['僵局', '抉擇', '逃避', '平衡'] },
three_of_swords: { keywords: ['心碎', '痛苦', '真相傷人', '悲傷'] },
four_of_swords: { keywords: ['休息', '復原', '沉澱', '暫停'] },
five_of_swords: { keywords: ['衝突', '勝之不武', '代價', '挫敗'] },
six_of_swords: { keywords: ['過渡', '離開', '平靜水域', '療傷'] },
seven_of_swords: { keywords: ['策略', '欺瞞', '獨行', '迂迴'] },
eight_of_swords: { keywords: ['受困', '自我設限', '無力感', '恐懼'] },
nine_of_swords: { keywords: ['焦慮', '失眠', '惡夢', '憂懼'] },
ten_of_swords: { keywords: ['結束', '觸底', '背叛', '黎明前'] },
page_of_swords: { keywords: ['好奇', '機警', '求知', '觀察'] },
knight_of_swords: { keywords: ['果斷', '直衝', '雄辯', '急躁'] },
queen_of_swords: { keywords: ['理性', '獨立', '直言', '界線'] },
king_of_swords: { keywords: ['權威', '邏輯', '公正', '真理'] },
ace_of_pentacles: { keywords: ['新機會', '種子', '務實開端', '資源'] },
two_of_pentacles: { keywords: ['平衡', '多工', '彈性', '調度'] },
three_of_pentacles: { keywords: ['團隊', '工藝', '合作', '被肯定'] },
four_of_pentacles: { keywords: ['守成', '控制', '安全感', '緊握'] },
five_of_pentacles: { keywords: ['匱乏', '困頓', '被排除', '扶持'] },
six_of_pentacles: { keywords: ['給予', '接受', '慷慨', '流動'] },
seven_of_pentacles: { keywords: ['耐心', '評估', '等待收成', '投資'] },
eight_of_pentacles: { keywords: ['精進', '專注', '工匠精神', '勤勉'] },
nine_of_pentacles: { keywords: ['豐裕', '自足', '優雅', '獨立'] },
ten_of_pentacles: { keywords: ['傳承', '家族', '長久財富', '根基'] },
page_of_pentacles: { keywords: ['學習', '踏實', '新技能', '播種'] },
knight_of_pentacles: { keywords: ['穩健', '可靠', '按部就班', '堅持'] },
queen_of_pentacles: { keywords: ['務實', '滋養', '安穩', '照顧'] },
king_of_pentacles: { keywords: ['富足', '事業有成', '穩重', '可靠'] }
};
const minorRankMeanings = {
'Ace': {
stage: '一是這個花色最純粹的樣子，還沒有被任何情境稀釋',
upright: '機會已經遞到面前，但你得自己伸手接',
reversed: '接的動作卡住了：時機未到，或你的手還被別的事佔著。先把它收好，別逼它現在就成形',
reflection: '這個剛冒出來的開端，你打算給它一個多小的第一步？'
},
'Two': {
stage: '二是關係的開始：有了第二個，才有對照、選擇與張力',
upright: '兩者之間怎麼辦，就是眼前的題目——攤開來比，別讓慣性替你決定',
reversed: '兩邊僵住了：不是拖著不選，就是表面平衡、底下失衡',
reflection: '攤在眼前的兩邊，你真正捨不得的是哪一個？'
},
'Three': {
stage: '三是二的產出：兩件事碰在一起，長出第三樣東西',
upright: '初步的成果正在成形——它還不是收成，是方向對了的訊號',
reversed: '產出卡在半路：比預期慢，或長得不如想像——先修時間表，再懷疑方向',
reflection: '第一批結果已經出來了——它在告訴你方向對了，還是該修？'
},
'Four': {
stage: '四是穩定：四個角撐起一個結構，事情站得住了',
upright: '值得停下來確認這份安穩——被好好標記的階段，之後會變成底氣',
reversed: '結構開始變成框：抱得太緊，穩定就成了不敢動',
reflection: '這份穩定此刻是在撐住你，還是在框住你？'
},
'Five': {
stage: '五打破四的穩定，所以它不太舒服——但衝突代表事情還在動',
upright: '這段亂是活的：把立場攤開來講，別為了和氣藏起來',
reversed: '衝突轉入地下：檯面上安靜，底下在內耗',
reflection: '眼前這場亂，你想贏的是什麼？那真的是你要的嗎？'
},
'Six': {
stage: '六是亂過一輪之後的緩和：事情重新找到流動的方式',
upright: '給與受都順了——不是完美，是可以呼吸了',
reversed: '流動歪向一邊：給的一直給、收的一直收，久了兩邊都不舒服',
reflection: '這一輪的緩和裡，你是給的那邊，還是收的那邊？'
},
'Seven': {
stage: '七是評估的位置：走到這裡，該問值不值得了',
upright: '停下來盤點是工序，不是懈怠——這個數字最需要自己動腦',
reversed: '評估拖成了迴避：盤點完就該有結論，別讓「再想想」變成常駐',
reflection: '走到這裡，這件事還值得再投入嗎？你憑什麼判斷？'
},
'Eight': {
stage: '八是上了軌道：事情動起來，速度不再完全由你決定',
upright: '順著推進，把專注收在同一條線上',
reversed: '節奏出了問題：不是卡住不動，就是快得失了準頭',
reflection: '事情已經自己在動了——你要順著推，還是該先對準方向？'
},
'Nine': {
stage: '九是幾乎到了，也是最累的一段',
upright: '耐受度比你估的高，而且真的快到了——切成小段慢慢走',
reversed: '撐的姿勢僵住了：先處理累積的疲憊，休息不是放棄陣地',
reflection: '就剩最後一段了，你的累是該休息，還是該衝線？'
},
'Ten': {
stage: '十是滿了：這一輪走到頭，滿的另一面就是收尾',
upright: '承認這一輪結束——該收的收、該交的交，新的一會接在後面',
reversed: '過量還抓著不放：放下幾件，不會讓前面的努力作廢',
reflection: '這一輪其實已經滿了——你還抓著的那部分，是責任還是習慣？'
},
'Page': {
stage: '侍者是還在學的人：好奇、敢問、不怕承認自己是新手',
upright: '用初學者的姿勢進場就夠了，也留意新來的訊息',
reversed: '熱忱還沒落地：把目標砍到一天做得完的大小，做完再說',
reflection: '在這件事上，你敢不敢承認自己還是新手？'
},
'Knight': {
stage: '騎士是行動中的人：同一個位階，四種把事情做完的速度',
upright: '此刻適合出手，讓推進的動作帶著事情走',
reversed: '配速亂了：衝過頭或遲遲不出發——先把終點寫下來，再決定跑多快',
reflection: '這股衝勁的終點寫下來了嗎？還是只有起點？'
},
'Queen': {
stage: '皇后是把花色內化了的人：力量來自理解，不是佔有',
upright: '用接住的方式影響人——不必推動，穩住就有引力',
reversed: '內化過了頭，變成困在裡面：先照顧自己的那口井',
reflection: '你影響這件事的方式，是接住，還是推動？哪個此刻更對？'
},
'King': {
stage: '國王是把花色用到外面去的人：對外負責、做決定、承擔後果',
upright: '把方向定清楚，資源與人會跟著對齊',
reversed: '施行忘了傾聽：找一個敢反對你的人，把話聽完',
reflection: '這個決定你打算怎麼負責？誰敢對你說不？'
}
};
function cardMeaningText(card, orientation) {
if (!card) return '';
const m = cardMeanings[card.nameKey];
if (!m) return '';
if (typeof m.upright === 'string') {
return orientation === 'reversed' ? m.reversed : m.upright;
}
const rank = minorRankMeanings[card.number];
if (!rank) return '';
const kw = m.keywords.join('、');
if (orientation === 'reversed') {
return t('meaning.minor.reversed', { kw, read: rank.reversed });
}
const sys = (typeof suitSystem !== 'undefined') ? suitSystem[card.suit] : null;
return t('meaning.minor.upright', {
stage: rank.stage,
suit: t((typeof suitNames !== 'undefined' && suitNames[card.suit]) || card.suit),
faculty: sys ? t(sys.faculty) : '',
kw,
read: rank.upright
});
}

;
/* contexts.js */
const cardContexts = {
fool: {
love: '對感情保持開放，別急著定義關係。願意冒一點險的心意，往往比周全計畫更動人。',
career: '適合起步或轉換跑道，經驗不足不必羞愧，先跨出第一步，路會在走的過程中長出來。',
wealth: '手上資源有限也無妨，小額嘗試比空想安全。設一個你輸得起的上限，剩下的交給經驗累積。',
wellbeing: '身心正想換個環境透氣，安排一趟小旅行或新的日常路線，久違的新鮮感會替你補回能量。',
yesno: { tendency: 'yes', note: '前提是你願意接受未知，別要求一切先看清楚再動。' },
reflection: '如果不必向任何人交代結果，也沒有人會笑你，你最想先試哪一件事？'
},
magician: {
love: '你比想像中更有能力經營這段關係，主動開口、主動安排，把心意化成對方接得到的具體行動。',
career: '手上的技能與人脈已經夠用了，缺的只是把它們串起來的那個決定，現在就是動手的時機。',
wealth: '與其等待更好的條件，不如清點現有資源，重新配置一次，你會發現能運用的比帳面上多。',
wellbeing: '專注力正好，適合為自己設計一套可執行的作息，從一個小習慣開始，讓身體感覺被自己掌握。',
yesno: { tendency: 'yes', note: '成事的關鍵在你自己動手，被動等待的話答案會反轉。' },
reflection: '你一直說還沒準備好的那件事，真正缺的是條件，還是那句允許自己開始的話？'
},
high_priestess: {
love: '感情的線索藏在沒說出口的細節裡，先別急著追問或表態，安靜觀察一陣子會更清楚。',
career: '資訊還沒全部攤開，此刻適合蒐集與傾聽而非拍板。你的第一直覺值得記下來，之後會被驗證。',
wealth: '不必倉促決定金錢的去向，先把疑問寫下來、把細節看仔細，等心裡真的踏實了再簽名。',
wellbeing: '身體正在用細微的方式跟你說話，把日程留白一點，安靜獨處或睡飽一晚，感受會清晰起來。',
yesno: { tendency: 'unclear', note: '關鍵資訊尚未浮現，此刻的答案還在醞釀中。' },
reflection: '如果沒有人給你意見，你心裡那個最早冒出來的答案是什麼？'
},
empress: {
love: '關係正處在能好好滋養彼此的時候，用陪伴、料理與擁抱表達心意，比講道理更有效。',
career: '創作型與需要美感的工作特別順手，別急著追求效率，讓作品慢慢長熟反而更有份量。',
wealth: '收入有機會穩定成長，適度享受不必愧疚，但請把錢花在真正滋養你的事物，而非填補空虛。',
wellbeing: '好好吃飯、好好睡覺、讓身體被善待，這段時間的自我照顧不是奢侈，而是續航的基礎。',
yesno: { tendency: 'yes', note: '順著滋養與成長的方向走，答案多半是肯定的。' },
reflection: '你上一次真心對自己好、而不是為了獎勵表現，是什麼時候？'
},
emperor: {
love: '這段關係需要清楚的承諾與界線，把責任講明白不會扼殺浪漫，反而讓對方有安全感。',
career: '適合建立制度、扛起主導權的階段，把混亂的事拆成流程，你的可靠會被上位者看見。',
wealth: '財務適合走規劃路線，訂預算、設底線、分帳戶，紀律帶來的安全感比一次暴利更長久。',
wellbeing: '規律作息是你目前最好的支撐，固定時間起床、運動、進食，讓身體在秩序裡找回穩定感。',
yesno: { tendency: 'yes', note: '前提是你願意負起責任，並把規則與時程訂清楚。' },
reflection: '你想守護的秩序，是真的保護了誰，還是只讓你比較不焦慮？'
},
hierophant: {
love: '關係走向被祝福與被看見的階段，見家長、談長期規劃都合適，穩定的形式能讓感情落地。',
career: '在體制內累積比單打獨鬥有利，找一位走過這條路的前輩請教，別重複發明別人已解的題。',
wealth: '穩健保守的做法此時最合宜，遵循被驗證過的規則，儲蓄、保險與長期配置勝過投機。',
wellbeing: '回到經典而樸實的照顧方式，規律運動、正常吃飯、按時休息，不必追逐新奇的養生法。',
yesno: { tendency: 'yes', note: '照既有的規矩與程序走，成事的機會較高。' },
reflection: '你正在遵守的規則，是你真心認同的，還是只因為大家都這麼做？'
},
lovers: {
love: '真誠而深刻的連結正在成形，但它需要你誠實表態。說出你真正在乎的，關係才站得住。',
career: '面前有個關乎價值觀的選擇，別只比較薪水與頭銜，問問哪一條路讓你比較像自己。',
wealth: '花錢的方式反映你重視什麼，攤開最近的帳單看看，那些數字和你的價值觀是否一致。',
wellbeing: '身心的和諧來自選擇的一致，當你不再違背自己做決定，那股長期的緊繃會自然鬆開。',
yesno: { tendency: 'yes', note: '只要你選的是真心想要的，而非別人期待的。' },
reflection: '如果沒有任何人會因此失望，你會怎麼選？那個答案透露了什麼？'
},
chariot: {
love: '感情需要你主動出擊並拿定主意，方向明確才追得到；曖昧漂流只會消磨彼此的耐心。',
career: '目標清楚時你的執行力驚人，把資源集中到單一戰場，別分心，接下來幾週能拉開差距。',
wealth: '適合主動出手爭取加薪或接案，收入靠推進而來；但方向盤要握在自己手上，別隨風亂衝。',
wellbeing: '衝勁充沛，適合把運動排進行程，但記得踩煞車。持續前進的人也需要固定的休息站。',
yesno: { tendency: 'yes', note: '前提是你確定方向並持續施力，中途鬆手就未必。' },
reflection: '你正在全速前進的方向，是你選的，還是慣性推著你走的？'
},
strength: {
love: '用溫柔而堅定的方式面對摩擦，不吼不逼也不退讓，你的耐心會慢慢化開對方的防備。',
career: '面對難搞的人事，硬碰硬不如穩住氣。持續而溫和地堅持你的專業，時間會站在你這邊。',
wealth: '財務上考驗的是自制而非運氣，忍住衝動消費、按計畫慢慢累積，柔韌的紀律最有力量。',
wellbeing: '別用意志硬撐身體，改用溫柔的方式對待它。緩和而持續的運動與作息，比激烈短衝有效。',
yesno: { tendency: 'yes', note: '需要時間與耐心，急著要結果反而容易翻盤。' },
reflection: '你心裡那頭想咆哮的野獸，如果不用兇它、只是聽它說，它想守護的是什麼？'
},
hermit: {
love: '此刻你需要一點空間整理自己，那不是冷淡。誠實說明你的節奏，成熟的人會理解。',
career: '適合退一步做深度思考而非社交衝刺，把時間投在鑽研專業上，安靜的累積之後會發亮。',
wealth: '先別急著跟風進場，把自己的財務現況攤開看清楚。搞懂了再出手，比追熱度安全得多。',
wellbeing: '安排一段不被打擾的獨處時間，關掉通知、散散步，安靜本身就是身心最好的補給。',
yesno: { tendency: 'unclear', note: '答案得靠你自己沉澱後才會浮現，別急著問別人。' },
reflection: '如果把外界所有的聲音都靜音，你會聽見自己心裡在說什麼？'
},
wheel_of_fortune: {
love: '關係正在轉彎，久候的變化可能突然發生。與其猜測，不如在機會出現時大方接住它。',
career: '職涯的風向正在改變，保持彈性與敏銳。這波轉動不必你發動，但你要準備好隨時上車。',
wealth: '收支可能出現意料外的起伏，留一筆彈性資金應變。景氣有週期，別在高點與低點做極端決定。',
wellbeing: '身心狀態本來就有起伏週期，狀態差的日子不代表退步，順著節奏調整強度就好。',
yesno: { tendency: 'unclear', note: '變數多且不完全由你決定，時機會左右結果。' },
reflection: '如果眼前的低潮只是週期的一段，你願意怎麼陪自己走過？'
},
justice: {
love: '關係需要一次誠實的清算，把付出與感受攤在桌上談。公平不是計較，而是彼此都被看見。',
career: '合約、考核與責任歸屬會被認真檢視，把事情做得經得起檢查，該爭取的權益也別客氣。',
wealth: '帳目要清楚，稅務與合約細節別跳過。你過去的財務習慣正在結算，誠實面對就能修正。',
wellbeing: '身心會誠實反映你怎麼對待它，作息與負荷失衡的地方，此刻正是把天平調回來的時機。',
yesno: { tendency: 'unclear', note: '取決於是非曲直——你站得住理，它才會站在你這邊。' },
reflection: '在這件事裡，如果誠實一點，你最不想承認的那一部分責任是什麼？'
},
hanged_man: {
love: '此刻推不動就別硬推，試著從對方的角度看同一件事，你可能會發現爭執的點根本不在那。',
career: '進度卡住不是失敗，是提醒你換個角度。暫停一下重新定義問題，往往比更用力還有效。',
wealth: '此時不宜勉強出手，讓資金安靜待著也是一種決定。停看聽的成本，遠低於衝動的代價。',
wellbeing: '身心在要求你慢下來，接受這段效率不高的日子。允許自己停一停，視野會自己打開。',
yesno: { tendency: 'unclear', note: '時機尚未成熟，答案要等你換個角度才看得清。' },
reflection: '如果把這件事整個倒過來看，原本以為的問題，會不會其實是答案？'
},
death: {
love: '某種相處模式確實走到盡頭了，這未必是分開，而是舊版本的關係該退場，讓新的長出來。',
career: '一個階段正在收尾，與其死守不合身的位置，不如整理好經驗，把結束當成轉場的入口。',
wealth: '適合斷捨離財務上的沉沒成本，該停損的停損、該取消的訂閱取消，清空才有空間重來。',
wellbeing: '舊的生活習慣可能已經不適合現在的你，慢慢換掉它，轉變期的疲憊是正常的過渡。',
yesno: { tendency: 'no', note: '舊形式難以延續，但結束之後會有新的可能。' },
reflection: '你現在緊抓不放的，是它本身，還是放手之後的空白讓你害怕？'
},
temperance: {
love: '關係適合慢火細燉，兩人的差異可以調和，不必誰完全遷就誰，找到雙方都舒服的比例。',
career: '別在極端之間擺盪，穩定的節奏勝過爆衝後的耗竭。逐步調整，把過與不及都修掉一點。',
wealth: '收支需要重新調配比例，該存的存、該花的花，走中道的財務計畫最禁得起時間考驗。',
wellbeing: '身心正需要一個折衷的節奏，不極端節制也不放縱，讓飲食、睡眠與活動慢慢回到中間。',
yesno: { tendency: 'unclear', note: '時間會給你答案，但不是現在——急著要結論反而會壞事。' },
reflection: '在這件事上，你最容易失衡的那一端是哪裡？往回收一點會怎樣？'
},
devil: {
love: '關係裡可能有讓你上癮又消耗的循環，先看清那條鎖鏈是什麼，看見了就有鬆開的餘地。',
career: '為了報酬或安穩而忍受的處境，正在悄悄收取代價。你留下來是選擇，不是沒有出口。',
wealth: '檢視那些讓你難以停手的消費或槓桿，慾望本身無罪，失去控制感才是真正的束縛。',
wellbeing: '重複的壞習慣正在偷走你的能量，不必自責，先誠實記錄它出現的時機，改變從看見開始。',
yesno: { tendency: 'no', note: '短期或許誘人，但代價與依附值得你先想清楚。' },
reflection: '如果那條鎖鏈其實鬆得可以自己脫下，此刻真正把你留住的是什麼？'
},
tower: {
love: '若關係建立在誤解或勉強之上，真相浮現會很痛，但被打破的假象並不值得你花力氣維持。',
career: '架在錯誤前提上的職位或計畫可能鬆動，與其硬撐，不如趁機看清什麼才是你真正想守的。',
wealth: '突發支出或帳面震盪可能出現，此刻該做的是保留現金與冷靜，別在慌亂中做長期決定。',
wellbeing: '長期硬撐的節奏可能撐不住了，把行程砍到最低，先讓身心落地，重建比逞強重要。',
yesno: { tendency: 'no', note: '現有的形式難以維持，但破局後反而看得更清楚。' },
reflection: '如果現在支撐你的東西垮了，剩下的哪一塊是你真的想留住的？'
},
star: {
love: '風波之後的溫柔時刻，坦露脆弱反而讓關係更靠近。慢慢來，信任會一點一點長回來。',
career: '靈感回來了，適合投入你真心相信的方向。不必急著證明什麼，穩穩地做，光會自己顯現。',
wealth: '財務壓力正在緩解，適合重新規劃長期目標。把資源投向讓你有盼頭的事，別只想著補洞。',
wellbeing: '身心正在慢慢回穩，多接觸自然光與安靜的環境。給自己時間，復原不需要有效率。',
yesno: { tendency: 'yes', note: '方向是好的，只是需要一點時間慢慢顯現成果。' },
reflection: '如果你相信最壞的已經過去，接下來你最想先修補哪一塊？'
},
moon: {
love: '訊息不明時容易腦補最壞的版本，先把想像和事實分開。與其猜，不如直接問一句。',
career: '狀況還沒攤開，此刻不適合下重注。把已知與猜測分兩欄寫清楚，霧散了再決定方向。',
wealth: '資訊不透明的投資或合作先緩一緩，看不懂的東西就別放錢進去，等清楚了機會還在。',
wellbeing: '情緒容易在夜裡放大，睡眠與作息值得優先照顧。半夜的想法不必當真，天亮再看一次。',
yesno: { tendency: 'unclear', note: '眼前有太多未確認的訊息，現在下判斷容易誤判。' },
reflection: '你最擔心的那件事，有幾分是事實，有幾分是想像出來的？'
},
sun: {
love: '關係明朗而溫暖，適合大方表達與公開露面。單身者容易在輕鬆的場合遇見對的人。',
career: '努力被看見的時刻，展現成果不必謙虛。方向清晰、阻力變小，適合放手把事情做大。',
wealth: '收入與機會都在轉好，適合把成果具體化。順風時記得留一部分下來，讓好運走得更久。',
wellbeing: '活力回升，適合戶外活動與曬曬太陽。心情輕盈的日子，把它花在讓你真心快樂的事上。',
yesno: { tendency: 'yes', note: '條件明朗、阻力不大，是相當肯定的時機。' },
reflection: '如果不必擔心別人怎麼看，你最想大聲說出的快樂是什麼？'
},
judgement: {
love: '舊的關係議題浮上檯面等你回應，原諒自己當時的選擇，才有力氣決定要不要重新開始。',
career: '過去的累積正在結算，也可能有舊機會回頭找你。誠實檢視成敗，然後回應內心的召喚。',
wealth: '適合做一次徹底的財務總檢討，看清哪些決定值得延續、哪些該終止，總結後再重新出發。',
wellbeing: '別再用舊標準批判現在的自己，放下自責本身就是療癒。給身心一個重新開始的機會。',
yesno: { tendency: 'yes', note: '若你願意誠實面對過去並做出回應，答案是肯定的。' },
reflection: '如果過去的你聽得見，你最想對當時的自己說哪一句話？'
},
world: {
love: '關係走到一個完整的段落，值得好好慶祝與感謝。無論繼續或告別，你都學到了該學的。',
career: '一個週期圓滿收束，成果經得起檢驗。大方接受肯定，也開始想像下一個舞台的樣子。',
wealth: '長期投入開始兌現，適合把成果整理入袋。慶祝之餘也替下一階段留一筆啟動資金。',
wellbeing: '身心處在整合後的舒展狀態，好好享受這份完整感。允許自己休息，這是你應得的。',
yesno: { tendency: 'yes', note: '條件已經齊備，這是水到渠成的圓滿時機。' },
reflection: '走到這裡，你最想感謝的是誰？包括那個沒有放棄的自己嗎？'
},
ace_of_wands: {
yesno: { tendency: 'yes', note: '能量正旺，趁著這股勢頭行動就會有進展。' },
},
two_of_wands: {
yesno: { tendency: 'unclear', note: '計畫可行，但你還停在規劃階段，成不成懸在你踏不踏出去。' },
},
three_of_wands: {
yesno: { tendency: 'yes', note: '方向對了，只是收穫還需要一點時間才會到。' },
},
four_of_wands: {
yesno: { tendency: 'yes', note: '基礎穩固，只要按部就班就能順利落地。' },
},
five_of_wands: {
yesno: { tendency: 'unclear', note: '競爭者眾、變數還多，得看你願意投入多少心力。' },
},
six_of_wands: {
yesno: { tendency: 'yes', note: '你的準備與實力足夠，這是被看見的時機。' },
},
seven_of_wands: {
yesno: { tendency: 'unclear', note: '守得住就成、守不住就不成——答案在你的續航力。' },
},
eight_of_wands: {
yesno: { tendency: 'yes', note: '事情會很快有進展，順勢推進就對了。' },
},
nine_of_wands: {
yesno: { tendency: 'unclear', note: '終點不遠，但你剩下的力氣夠不夠，才是真正的變數。' },
},
ten_of_wands: {
yesno: { tendency: 'no', note: '就算勉強撐到，代價也重得不值得，這不是該硬扛的事。' },
},
page_of_wands: {
yesno: { tendency: 'unclear', note: '起步的火有了，但能不能燒到最後，現在還看不出來。' },
},
knight_of_wands: {
yesno: { tendency: 'unclear', note: '衝勁足以推動，但持久度與方向都還有變數。' },
},
queen_of_wands: {
yesno: { tendency: 'yes', note: '只要你相信自己並主動展現，結果會站在你這邊。' },
},
king_of_wands: {
yesno: { tendency: 'yes', note: '只要你主導並承擔，方向明確就能成事。' },
},
ace_of_cups: {
yesno: { tendency: 'yes', note: '順著真心走，情感面的答案是肯定的。' },
},
two_of_cups: {
yesno: { tendency: 'yes', note: '若對方也願意投入，這是雙向成立的好時機。' },
},
three_of_cups: {
yesno: { tendency: 'yes', note: '有人支持你，借助群體的力量會更順利。' },
},
four_of_cups: {
yesno: { tendency: 'no', note: '你的心還沒真的投入，此刻不容易有好結果。' },
},
five_of_cups: {
yesno: { tendency: 'no', note: '此刻的失落遮住了視線，現在不是好時機。' },
},
six_of_cups: {
yesno: { tendency: 'unclear', note: '舊情與回憶帶來暖意，但能否走向未來還不確定。' },
},
seven_of_cups: {
yesno: { tendency: 'unclear', note: '選項多但真假難辨，得先弄清楚你要的是什麼。' },
},
eight_of_cups: {
yesno: { tendency: 'no', note: '現有的形式難以滿足你，答案指向轉身尋找。' },
},
nine_of_cups: {
yesno: { tendency: 'yes', note: '心之所願有機會成真，這是滿足感很高的時機。' },
},
ten_of_cups: {
yesno: { tendency: 'yes', note: '在情感與長期幸福的層面上，這是肯定的方向。' },
},
page_of_cups: {
yesno: { tendency: 'unclear', note: '心意才剛萌芽，現在下定論太早，給它一點時間再看。' },
},
knight_of_cups: {
yesno: { tendency: 'unclear', note: '心意與邀請是真的，但能不能落實還要再觀察。' },
},
queen_of_cups: {
yesno: { tendency: 'yes', note: '相信你的直覺，情感層面的判斷此刻很可靠。' },
},
king_of_cups: {
yesno: { tendency: 'yes', note: '以成熟與包容的方式處理，結果會往好的方向走。' },
},
ace_of_swords: {
yesno: { tendency: 'yes', note: '真相與方向都清楚了，可以放心下判斷。' },
},
two_of_swords: {
yesno: { tendency: 'unclear', note: '你還沒真的做出選擇，答案要等你摘下眼罩。' },
},
three_of_swords: {
yesno: { tendency: 'no', note: '眼前的傷痛還在，此刻不適合期待順利。' },
},
four_of_swords: {
yesno: { tendency: 'unclear', note: '現在不是行動的時機，休息過後再問一次。' },
},
five_of_swords: {
yesno: { tendency: 'no', note: '就算表面成功，代價可能超過你願意付的。' },
},
six_of_swords: {
yesno: { tendency: 'unclear', note: '方向是對的，但你還在半路上，此刻問結果為時過早。' },
},
seven_of_swords: {
yesno: { tendency: 'no', note: '檯面下有你沒看見的東西，以現在的資訊往前走並不安全。' },
},
eight_of_swords: {
yesno: { tendency: 'no', note: '眼前限制不少，除非你先鬆開自己設下的框。' },
},
nine_of_swords: {
yesno: { tendency: 'no', note: '此刻的判斷被焦慮放大了，先別急著定論。' },
},
ten_of_swords: {
yesno: { tendency: 'no', note: '這個階段確實結束了，但收場之後就是新開始。' },
},
page_of_swords: {
yesno: { tendency: 'unclear', note: '你還在蒐集資訊的階段，答案得等你問清楚。' },
},
knight_of_swords: {
yesno: { tendency: 'unclear', note: '很快會有結果，但快不等於成，代價還沒算進去。' },
},
queen_of_swords: {
yesno: { tendency: 'yes', note: '就事論事地看，條件是站得住腳的。' },
},
king_of_swords: {
yesno: { tendency: 'yes', note: '依邏輯與既有原則判斷，答案是成立的。' },
},
ace_of_pentacles: {
yesno: { tendency: 'yes', note: '基礎條件實在，只要願意動手栽培就能長成。' },
},
two_of_pentacles: {
yesno: { tendency: 'unclear', note: '你能撐住，但要看資源與時間夠不夠分配。' },
},
three_of_pentacles: {
yesno: { tendency: 'yes', note: '只要與人合作、把品質做足，結果會成立。' },
},
four_of_pentacles: {
yesno: { tendency: 'unclear', note: '守得住現況，但想要有進展就得先鬆手。' },
},
five_of_pentacles: {
yesno: { tendency: 'no', note: '目前資源與支持都不夠，時機並不站在你這邊。' },
},
six_of_pentacles: {
yesno: { tendency: 'yes', note: '會有人伸出援手，但雙方的條件要對等清楚。' },
},
seven_of_pentacles: {
yesno: { tendency: 'unclear', note: '值不值得，要看你評估後願不願意繼續投入。' },
},
eight_of_pentacles: {
yesno: { tendency: 'unclear', note: '成果取決於你還願意練多久，此刻要一個定論太早。' },
},
nine_of_pentacles: {
yesno: { tendency: 'yes', note: '你已有足夠的條件與底氣，可以放心去做。' },
},
ten_of_pentacles: {
yesno: { tendency: 'yes', note: '從長遠與根基的角度看，這是穩當的方向。' },
},
page_of_pentacles: {
yesno: { tendency: 'yes', note: '起步順利，但要有從基礎慢慢學起的準備。' },
},
knight_of_pentacles: {
yesno: { tendency: 'yes', note: '會成，只是進度慢，需要你按部就班地走完。' },
},
queen_of_pentacles: {
yesno: { tendency: 'yes', note: '以務實與照顧的方式進行，事情會穩穩成立。' },
},
king_of_pentacles: {
yesno: { tendency: 'yes', note: '資源與經驗都到位，穩紮穩打就能成事。' },
}
};
const contextSuitDomains = {
'Wands': {
love: '權杖在感情裡問的是熱度與主導：火花夠不夠、誰在推進、方向由誰定。有火就直說，行動比暗示誠實。',
career: '權杖在事業裡管的是動能：開創、推進、把想法變成動作。這個花色出現時，事情缺的多半不是計畫，是有人先動手。',
wealth: '權杖看錢的方式是進取：機會、擴張、先搶位置。它的風險也在這裡——衝得快的時候，記得留一條輸得起的底線。',
wellbeing: '權杖的身心課題是火的管理：能量怎麼點燃、怎麼用、怎麼不燒到自己。悶著最傷，把力氣導去會動的地方。'
},
'Cups': {
love: '聖杯本來就是感情的花色：流動、共鳴、願不願意把心遞出去。這裡的課題通常不在技巧，在誠實。',
career: '聖杯在事業裡看的是關係與感受：合作的氣氛、工作的意義感。數字以外的那些東西，此刻比績效更能決定去留。',
wealth: '聖杯看錢帶著感情：錢和安全感、人情、心情綁在一起。分清楚「需要」和「想被安慰」，帳就好算了。',
wellbeing: '聖杯的身心課題在情緒：感受要有出口，悶住的水會變質。找人說、寫下來、好好哭一場，都算保養。'
},
'Swords': {
love: '寶劍在感情裡是話語與判斷：說出口的、沒說出口的、腦內反覆分析的。想清楚很好，但關係最終靠講開，不靠推理。',
career: '寶劍在事業裡管思考與溝通：決策、談判、把話說清楚。這個花色出現時，先把事實與詮釋分開，再開口。',
wealth: '寶劍看錢靠腦：分析、算計、白紙黑字。合約與數字值得再讀一次——它的陷阱多半藏在沒問清楚的地方。',
wellbeing: '寶劍的身心課題在腦：想太多是這個花色的職業病。念頭寫下來就不用一直背著，睡眠比再想一輪有用。'
},
'Pentacles': {
love: '錢幣在感情裡看的是實質：時間給不給、日子過不過得起來、承諾落不落地。浪漫在這個花色是動詞，不是形容詞。',
career: '錢幣在事業裡管累積：手藝、信用、一步一步蓋起來的東西。慢不是問題，方向對、持續做，複利會接手。',
wealth: '錢幣本來就是物質的花色：收支、資產、身體力行的經營。它的建議通常很不浪漫——記帳、分配、按計畫來。',
wellbeing: '錢幣的身心課題在身體：睡眠、飲食、規律。這個花色不談玄的，把基本盤顧好，多數毛病會自己小一半。'
}
};
const contextRankDomains = {
'Ace': {
love: '一段新的可能剛冒出頭——別急著定義它，先給它一次真實的相處。',
career: '新機會或新題目剛遞到面前，價值還沒定型，先伸手接再談規模。',
wealth: '一個新的財務起點：小額開始就好，重點是真的開始。',
wellbeing: '適合建立一個新習慣——夠小、今天就能做完的那種。'
},
'Two': {
love: '兩個人（或兩種心意）在對望，下一步取決於怎麼安放這份張力。',
career: '兩條路線攤在桌上，先把比較的標準寫清楚，再選。',
wealth: '資源在兩個去向之間權衡——配比可以調，不必全押一邊。',
wellbeing: '生活的兩塊正在互相拉扯，先承認兩邊都真實，再排順位。'
},
'Three': {
love: '關係長出了第一批具體的東西——默契、計畫或傷口，都值得認真看。',
career: '初步成果出來了，拿它去驗證方向，而不是急著擴大。',
wealth: '前期投入開始有回音，數字還小，但趨勢比金額重要。',
wellbeing: '身體對你最近的做法給出了第一批反應，聽它的。'
},
'Four': {
love: '關係進入可以喘息的穩定段——記得穩定是地基，不是終點。',
career: '局面站穩了，適合盤點與鞏固；也問一句：這個穩有沒有開始擋路。',
wealth: '守成的位置：確認底線、留好備用金，再考慮下一步。',
wellbeing: '規律正在保護你——但別讓「不敢變」冒充「很穩定」。'
},
'Five': {
love: '摩擦浮上檯面——它是關係還活著的證據，攤開談比冷處理好。',
career: '競爭或衝突正熱，把力氣花在值得的戰場，其餘明確放掉。',
wealth: '財務出現缺口或角力，先止血、再談公平，別靠硬撐。',
wellbeing: '這段亂最耗的是心神，給情緒一個出口，別讓它轉成內耗。'
},
'Six': {
love: '關係回到可以呼吸的節奏——給與受的方向對了，就值得維持。',
career: '付出開始被看見，接受認可，也把功勞分給該分的人。',
wealth: '資源重新流動——該收的收、該給的給，帳目清楚感情才長久。',
wellbeing: '復原期：狀態在回升，按原速前進就好，不必加碼。'
},
'Seven': {
love: '這段關係走到該誠實盤點的位置——留下來要有理由，不是慣性。',
career: '停下來評估投入與產出，值得就續押，不值得就趁早轉向。',
wealth: '檢視投入與報酬的比例——帳面之外，把時間成本也算進去。',
wellbeing: '檢查你的保養方式是真的有效，還是只是心安。'
},
'Eight': {
love: '事情動得很快——訊息、進展、決定接連而來，跟上，但別忘了確認方向。',
career: '執行期：專注、熟練、產出，把注意力收在同一條線上。',
wealth: '金流或機會正在加速，動作要快，但每一筆仍要看清楚再簽。',
wellbeing: '節奏偏快，安排固定的喘息點，否則速度會先吃掉睡眠。'
},
'Nine': {
love: '關係裡你撐了很久——先分清楚是值得的堅持，還是單方面的消耗。',
career: '最後一段路：切小步伐走完它，成果比你以為的近。',
wealth: '累積接近目標，別在終點前鬆手，也別為了衝線亂加槓桿。',
wellbeing: '疲勞已經累積到頂，休息不是中斷，是完賽的一部分。'
},
'Ten': {
love: '一個週期走到頭——圓滿要慶祝，沉重要卸下，兩種都該好好收尾。',
career: '這一輪到頂了：交接、總結、放下不屬於你的擔子。',
wealth: '財務的一個階段完成，結算清楚，再決定下一輪怎麼配置。',
wellbeing: '超載的訊號已經很明確，先減量——身體的帳不能一直賒。'
},
'Page': {
love: '關係帶著新手的青澀——多問、多試、允許笨拙，也留意新的訊息。',
career: '用學徒心態進場：發問不丟臉，先求懂再求快。',
wealth: '理財從基本功練起，小額練手，把學費控制在輸得起的範圍。',
wellbeing: '對身體保持好奇：新的運動或作息，先試小劑量。'
},
'Knight': {
love: '關係正被推進——熱度可貴，方向更要緊，先確認彼此要去哪。',
career: '出手的時機到了：帶著計畫衝，把終點寫下來再加速。',
wealth: '行動派的理財：進出要快，更要有紀律，設好停損再上。',
wellbeing: '動起來對你有效，但配速要穩，忽衝忽停最傷。'
},
'Queen': {
love: '用接住的方式愛人——先聽懂，再回應，穩住就有引力。',
career: '你的影響力來自理解人與局，不必搶快，把人接住事就順。',
wealth: '錢的事用照顧的邏輯打理：先顧基本盤，再談增長。',
wellbeing: '把照顧別人的細心分一份給自己，那口井要先有水。'
},
'King': {
love: '關係需要有人扛起承諾與方向——負責不是控制，記得聽。',
career: '掌理的位置：定方向、擔後果，並留一個敢反對你的人在旁邊。',
wealth: '用經營者的眼光看錢：配置、授權、長期紀律。',
wellbeing: '別把身體當下屬使喚——它是你唯一不能開除的夥伴。'
}
};
function contextText(card, domain) {
if (!card) return '';
const ctx = cardContexts[card.nameKey];
if (ctx && typeof ctx[domain] === 'string') return ctx[domain];
const rank = contextRankDomains[card.number];
const suit = contextSuitDomains[card.suit];
return (((rank && rank[domain]) || '') + ((suit && suit[domain]) || '')) || '';
}
function contextReflection(card) {
if (!card) return '';
const ctx = cardContexts[card.nameKey];
if (ctx && typeof ctx.reflection === 'string') return ctx.reflection;
const rank = (typeof minorRankMeanings !== 'undefined') ? minorRankMeanings[card.number] : null;
return (rank && rank.reflection) || '';
}

;
/* lore.js */
const cardLore = {
fool: {
symbolism: '年輕人立在懸崖邊緣，臉朝天空，腳步仍要往前。左手拈一朵白玫瑰，是尚未被算計汙染的渴望；肩上細杖挑著小行囊，那是他全部的家當。腳邊白狗又跳又吠，像本能的提醒。身後白日高懸。',
iconography: [
{ element: '崖邊未落下的腳步', meaning: '構圖把人與深淵並置，卻停在腳還沒離地的瞬間；這張牌畫的是出發本身，不是墜落的結果。' },
{ element: '左手的白玫瑰', meaning: '白色在偉特牌的用色裡對應未受汙染的狀態；他是拈著花而不是握緊，這份渴望還沒被目的改寫。' },
{ element: '腳邊的白狗', meaning: '狗畫在腳邊而非身後，位置最靠近懸崖；牠的吠叫是畫面裡唯一的警告，本能比理智先察覺危險。' },
{ element: '肩上的細杖行囊', meaning: '全部家當只有挑在杖上的一個小包，啟程的門檻低於一般想像；行囊掛在身後，過去沒清算就帶著走。' }
],
imageUpright: '視線與白日都在畫面上方，腳步停在崖邊往前的那一刻。重心壓在前腳，行囊掛在身後，整個構圖往斜上方帶，深淵被放在最低處。',
imageReversed: '轉過來後太陽沉到腳下，懸崖翻到頭頂，他倒懸著把腳伸向天空。往前的動勢變成往上踢，出發的那一步失去了可以踩的地面。',
depth: '愚者的零不是空無，是還沒被填上的空白。他不是不知道懸崖存在，而是決定不讓恐懼替他做決定。這張牌談的是啟程本身的價值：你不必先變成夠格的人才能出發，資格是走出來的。逆位提醒的不是別冒險，而是別把不看路當成勇敢；白狗的吠叫值得聽，那是你自己的直覺在說話。',
origin: '愚者在早期義大利牌裡不編號，也不算在王牌序列內。它的功能接近一張免役牌：不吃墩，卻讓持有者免於跟花色。它站在體制之外，卻因此擁有別的牌沒有的自由。今天熟悉的零號起點與靈性旅程說法，是後世詮釋替它補上的位置，不是它原本的身分。'
},
magician: {
symbolism: '男子立於桌前，右手高舉短杖指向天空，左手食指朝下指地。桌上並排著權杖、聖杯、寶劍與錢幣，四種花色齊聚。頭頂浮著橫躺的無限符號，腰間繫著咬住自己尾巴的蛇。身邊開滿紅玫瑰與白百合。',
iconography: [
{ element: '桌上的四種花色', meaning: '權杖、聖杯、寶劍與錢幣同時擺在桌上，代表資源已經齊備；它們是被找到的，不是被變出來的。' },
{ element: '上指天下指地的手', meaning: '一手向上一手向下，把畫面串成一條垂直的通道；這個手勢說的是想法要往下落成具體的事才算數。' },
{ element: '頭頂的無限符號', meaning: '橫躺的八字沒有起點與終點，畫在頭上而不在手上；意念的來源不會枯竭，與桌上有限的道具成對比。' },
{ element: '腰間的銜尾蛇', meaning: '蛇咬住自己的尾巴，是一個自我循環的圖形；它繫在腰上，代表這股能量由他自己供給，不必外求。' },
{ element: '紅玫瑰與白百合', meaning: '兩種花成列開在畫面下方，紅與白的對照是偉特牌反覆使用的配色語言，一邊是慾望，一邊是純粹。' }
],
imageUpright: '構圖是一條垂直的通道：無限符號在最上，舉杖的手指向天，另一手指向地，桌上四樣道具落在腰際。視線順著手勢從天往下走到桌面。',
imageReversed: '轉過來後指地的手變成指天，舉杖的手朝下，那條由上而下的通道整個倒轉。桌子懸在頭頂，四樣道具改從上方壓下來，念頭沒有地方落。',
depth: '桌上的四樣東西都不是他變出來的，而是本來就擺在那裡。這張牌的重點不是天賦異稟，是你已經握有的資源終於被你認出來。上指下指的姿勢說的是把想法落實成具體的事，念頭若不動手，就只是念頭。逆位不是說你沒有本事，而是問你把本事用在哪裡：是完成一件事，還是說服別人相信你完成了。',
origin: '馬賽牌裡它叫 Le Bateleur，畫的是市集上的雜耍藝人與街頭騙術師，桌上擺的是他吃飯的道具。那是靠手速與話術謀生的江湖人，不是掌握奧祕的法師。魔法師這層意思是十九世紀之後才被加上去的；偉特牌那些指天指地與無限符號，也屬於那個晚近的詮釋。'
},
high_priestess: {
symbolism: '她端坐在黑白兩根柱子之間，柱身分別刻著 B 與 J。頭上是帶角的冠冕、中央嵌著一顆球，腳邊躺著一彎新月，胸前掛著十字。膝上半掩著寫有 TORA 的卷軸，身後垂著繡有石榴的帷幕，遮住柱間的景色。',
iconography: [
{ element: '黑白雙柱 B 與 J', meaning: '兩柱是所羅門聖殿門前的波阿斯與雅斤，一黑一白分立兩側；她坐在中間，入口必須穿過對立。' },
{ element: '石榴帷幕', meaning: '帷幕擋住兩柱之間的景色，繡的是多籽的石榴；帷幕在，代表答案存在而且飽滿，只是還沒開放。' },
{ element: 'TORA 卷軸', meaning: '卷軸上的 TORA 指律法書，她只讓它露出一半；知識確實在場，但可讀的部分此刻就是這麼多。' },
{ element: '帶角冠冕與腳邊新月', meaning: '頭上的冠帶角嵌球，新月則落在她腳邊；月光是反射來的光，她的權威因此是承接的，不是自發的。' }
],
imageUpright: '兩根柱子把畫面框成一道門，她端坐正中，冠在最上、新月在腳邊，帷幕填滿柱間。視線被卷軸與雙膝擋在前排，進不到帷幕後面。',
imageReversed: '轉過來後新月升到她頭頂，冠冕落到最下方，兩根柱子上下對調而門仍然是門。這張牌的對稱讓旋轉沒有翻掉什麼，變的是月亮終於在天上。',
depth: '她不說話，也不阻止你走近。這張牌的力量在那幅帷幕：有些答案不是被藏起來，而是還沒到能被看懂的時候。卷軸只露出一半，因為此刻你能理解的就是一半。它不要你放棄思考，而是提醒你在資訊不全時，別急著把猜測講成結論。逆位多半是你早就知道了，只是還沒承認。',
origin: '最早的 Visconti-Sforza 牌把她畫成修女模樣的女教皇。一說她影射維斯孔蒂家族的 Manfreda 修女，曾被異端教派推舉為女教皇；這只是假說。這個題材後來因避諱被改動，偉特把她定名為女祭司。她膝上的卷軸與卡巴拉聯想，則出自黃金黎明一系的設計。'
},
empress: {
symbolism: '一名女子倚在鋪著軟墊的座椅上，身後是成熟的麥田，一道小瀑布從林間流下。她的長袍印滿石榴紋樣，頭戴綴著十二顆星的冠冕，身旁立著一面心形的盾，上面刻著金星的符號。',
iconography: [
{ element: '身後成熟的麥田', meaning: '麥子已經熟了，卻畫在她身後而不在手上；豐收是環境長出來的結果，她提供條件，不動手催促。' },
{ element: '十二顆星的冠冕', meaning: '十二星的冠在基督教圖像裡有現成的先例，形式相同；戴上它，這份豐饒就帶著天上的位階。' },
{ element: '石榴紋樣的長袍', meaning: '同一種多籽的石榴也繡在女祭司的帷幕上；一個藏在帷幕後面，一個穿在身上，差別在於是否已經開展。' },
{ element: '心形盾上的金星符號', meaning: '盾牌畫成心形，上面是金星的符號；這個對應出自十九世紀末黃金黎明一系的星象配置，由偉特畫上。' },
{ element: '林間流下的瀑布', meaning: '水從林間流下穿過畫面，是這張牌上唯一在動的東西；它說明滋養不是靜止的儲存，而是持續供應。' }
],
imageUpright: '她斜倚著往後靠，重量壓進軟墊，星冠在最高處，麥田與瀑布在身後往下流。整個畫面往下沉、往後倚，沒有一樣東西在趕時間。',
imageReversed: '轉過來後瀑布變成往上噴，麥子朝下垂掛，星冠沉到底部而她倒懸在軟墊之下。那個往下沉的倚靠沒有了支撐，滋養的水流改往反方向走。',
depth: '皇后不靠意志推動任何事，她只是提供條件，然後等。這張牌講的是滋養的邏輯：麥子要長熟需要時間，催不得，但也不是什麼都不必做。它適用於創作、關係與身體，也適用於你對自己的態度。逆位常見的不是缺乏愛，而是把愛全給了別人，忘了自己也在需要被照顧的名單上。',
origin: '皇后沒有專屬的身世故事。大牌是十五世紀上半葉義大利北部的紙牌玩家新增的一組王牌，題材取自當時的凱旋遊行與道德寓意畫傳統，一位象徵世俗尊榮的女性統治者本來就在那套圖像庫裡。她身上的金星與豐饒符號，屬於後世附加的詮釋層。'
},
emperor: {
symbolism: '他坐在石造王座上，扶手與椅背雕著公羊頭。身穿鎧甲，外罩紅袍，右手握著頂端如生命符的權杖，左手托著一顆金球。長鬚灰白，身後是光禿的紅色山脈，山腳下有一道細細的水流。',
iconography: [
{ element: '石造的王座', meaning: '王座是石頭鑿的，沒有軟墊，與皇后那張鋪著軟墊的座椅正好相對；舒適被換成了不會倒。' },
{ element: '扶手上的公羊頭', meaning: '王座各處雕著公羊頭，這是偉特依黃金黎明的星象對應加上的裝飾，不是這張牌中世紀原有的內容。' },
{ element: '生命符權杖', meaning: '杖頂是安卡的形狀，這是一九零九年繪製時加上的細節，呼應當時流行的埃及風，不是牌的來歷。' },
{ element: '身後光禿的紅山', meaning: '山上寸草不生，與皇后身後的麥田正好相反；秩序被畫在不長東西的地方，它維持得住，卻不生產。' },
{ element: '山腳下的細水流', meaning: '整片紅色岩山裡只有一道細水，是畫面上唯一柔軟的東西；它很小，但繪者沒有把它省掉。' }
],
imageUpright: '他正坐在畫面中軸上，紅山在背後撐起整個上半部，王座的石塊把重量壓到最底。權杖與金球分踞左右，一切都對稱、都不動。',
imageReversed: '轉過來後王座的底座翻到最上方，山峰朝下倒插，山腳那道細水改往上流。他被自己坐的石頭壓在下面，穩固的重量落到了頭頂。',
depth: '皇帝的王座是石頭做的，不舒服，但不會倒。這張牌談的是結構本身的價值：規則、界線與時程並不浪漫，卻是讓事情持續運作的東西。石山寸草不生，也提醒秩序有它的代價。逆位不是要你拆掉所有規矩，而是問這套秩序現在還在保護誰，是不是只剩下維持它本身。',
origin: '皇帝沒有專屬的身世故事。他和皇后一樣，來自大牌創制時取用的凱旋遊行與道德寓意畫傳統，代表世俗權力的那一級。牌面上那些公羊頭與生命符細節，是偉特與黃金黎明依星象對應加上去的裝飾，並非中世紀原有的內容。'
},
hierophant: {
symbolism: '他端坐在兩根石柱之間，戴著三重冠，右手舉起做出祝福的手勢，左手扶著一根三重十字的權杖。腳前放著兩把交叉的鑰匙，兩名剃髮的僧侶跪在階下，背向觀者，仰頭聽他說話。',
iconography: [
{ element: '頭上的三重冠', meaning: '三層的冠直接取自天主教教宗的冠冕形式；這張牌在馬賽牌裡就叫教皇，圖像從頭到尾都在教會之內。' },
{ element: '腳前交叉的鑰匙', meaning: '兩把交叉的鑰匙是聖彼得的記號，也是梵蒂岡沿用的徽記；開門的權柄屬於這個職位，不屬於個人。' },
{ element: '三重十字的權杖', meaning: '權杖上三道橫槓是教宗十字的形式，橫槓層層堆疊；權威被畫成有階級的結構，不是一個人的意見。' },
{ element: '舉起的祝福手勢', meaning: '右手舉起的祝福手勢是基督教圖像裡的固定形式；他不是在說話，是在授予，動作本身就是制度。' },
{ element: '階下跪著的兩人', meaning: '兩名僧侶背向觀者、仰頭聽講，構圖把觀者放在他們身後；要接下這套傳承，得先站到階下。' }
],
imageUpright: '畫面是層層往上疊的：鑰匙在地、僧侶跪在階下、他坐在中央、三重冠頂在最高處。視線從腳前的鑰匙一路往上爬到冠。',
imageReversed: '轉過來後三重冠沉到最底，鑰匙浮到天上，兩個僧侶變成倒吊在他上方。那條由下往上的階梯被翻轉，跪著的人反而在高處。',
depth: '重點不在他說了什麼，而在階下那兩個人為什麼願意跪著聽。這張牌講的是傳承：有人已經走過這條路，把經驗整理成可以交付的形式，你不必樣樣自己重新發明。它的價值在效率與安全，代價是你得先接受一套不是你訂的規則。逆位問的是你遵守的規矩，究竟是認同，還是只是不想惹麻煩。',
origin: '馬賽牌裡這張直接叫教皇，與女教皇成對。偉特依黃金黎明的路線改稱 Hierophant，那是古希臘厄琉息斯祕儀主祭的稱號，用意是把一個基督教的具體職位換成較普遍的字。這個改名發生在一九零九年的牌上，不是中世紀的傳統。'
},
lovers: {
symbolism: '一男一女赤身站在兩棵樹前，女子身後的樹上纏著蛇並結著果實，男子身後的樹燃著火焰。他們上方浮著一位張開雙臂的天使，天使頭頂是巨大的太陽，兩人之間的遠處立著一座山。',
iconography: [
{ element: '女子身後的蛇與果樹', meaning: '蛇纏在結著果實的樹上，是伊甸園的知善惡樹；把它畫在她身後，選擇一開始就與知識綁在一起。' },
{ element: '男子身後燃火的樹', meaning: '他身後的樹上長的是火焰，與她那棵結果實的樹成對照；一邊是慾望的果，一邊是燒起來的力氣。' },
{ element: '上方張臂的天使', meaning: '天使被畫在最上方的正中央，兩人都不看對方：男子看女子、女子仰望天使，視線接成一條線。' },
{ element: '天使頭頂的太陽', meaning: '太陽罩在天使之上，把整個場面照成無處可躲的亮；這張牌沒有陰影，選擇是在看清楚時做的。' },
{ element: '兩人之間的遠山', meaning: '山立在畫面正中、兩人中間的遠處，是構圖的中軸；它離得很遠，這個選擇要走的路還沒開始。' }
],
imageUpright: '天使與太陽罩在最上方，兩人站在下方的地面上，視線接力往上：男看女、女仰望天使。山立在正中央的遠處，把畫面釘成對稱。',
imageReversed: '轉過來後天使與太陽沉到腳下，兩人倒懸在上方，那條由下往上的視線變成往下墜。抬頭仰望的動作被翻成低頭俯視，光源離開了天空。',
depth: '這張牌很少真的在講愛情，它在講選擇。兩個人都沒有看著對方，女子抬頭望向天使，男子望著她，視線接力成一條線。它的意思是：你的選擇會透露你真正重視什麼，而那個排序騙不了人。逆位通常不是誰對誰錯，是你嘴上說的價值與實際選的東西對不上，先誠實排一次序再說。',
origin: '戀人沒有專屬的身世故事。大牌題材出自十五世紀義大利北部的凱旋遊行與道德寓意畫傳統，愛情與抉擇的寓意畫在當時很常見。偉特牌把它畫成伊甸園場景，是這副牌自己的設計選擇，早期義大利牌的構圖與此並不相同。'
},
chariot: {
symbolism: '一名戴冠的人立在戰車上，車前伏著一黑一白兩隻人面獅身獸，朝著不同方向。他手上沒有韁繩，只握著一根短杖。車篷上綴滿星辰，肩甲是新月的臉，身後是城牆與河流。',
iconography: [
{ element: '車前一黑一白的獸', meaning: '兩隻獸同形異色、朝著不同方向，是偉特牌反覆使用的對立配色；車能走不靠牠們同意。' },
{ element: '手上沒有韁繩', meaning: '畫面上找不到韁繩，這是這張牌最關鍵的空缺；連接人與獸的東西被省掉，前進只能來自意志。' },
{ element: '綴滿星辰的車篷', meaning: '車頂被畫成一片星空，把天罩在他頭上；行進的人不是自己在跑，他帶著一整套秩序一起移動。' },
{ element: '肩上的新月臉甲', meaning: '兩片肩甲各是一張新月形的臉，左右各一，又是一組對稱的對立；連鎧甲都在重複這張牌的主題。' },
{ element: '身後的城牆與河流', meaning: '城牆與河都在他身後，是已經離開的東西；出發被畫成完成式，這張牌處理的是路上，不是要不要走。' }
],
imageUpright: '車篷的星空罩在頭頂，戴冠的人立在正中央，兩隻獸伏在最前排的地面上。城牆與河退在身後，整個構圖往觀者的方向推出來。',
imageReversed: '轉過來後星空的車篷墊到最底，兩隻獸浮上頭頂，駕車的人倒懸在中間。城牆與河跟著上下顛倒，這台車前進的方向連同天地一起被反轉。',
depth: '沒有韁繩是這張牌最關鍵的細節。兩頭獸想去的方向不一樣，能讓車前進的不是拉扯，是駕車者自己的定向。它談的是意志力的實際運作：你不需要消滅內心的矛盾，只需要清楚知道要去哪裡。逆位是方向先散了，車才失控；重新問一次目的地，比更用力有用。',
origin: '戰車沒有專屬的身世故事。它出自大牌創制時取用的凱旋遊行傳統，trionfi 這個字本身就是凱旋的意思，凱旋隊伍裡的戰車是最直接的圖像來源。英文的 trump 也是從 trionfi 來的，這副牌最初就是一種吃墩的紙牌遊戲。'
},
strength: {
symbolism: '一名白衣女子俯身，雙手扶著一頭獅子的頭與下顎，動作輕得像在安撫。獅子低著頭，尾巴垂下。她頭頂浮著橫躺的無限符號，腰間與髮上繞著花環，身後是一片開闊的淡黃色原野。',
iconography: [
{ element: '扶在獅口上的雙手', meaning: '手是搭著的，不是壓著的；畫面沒有畫出任何使力的痕跡，這個細節就是整張牌的論點所在。' },
{ element: '低頭垂尾的獅子', meaning: '獅子的頭低著、尾巴垂下，是順服的姿態而不是被制伏的姿態；牠沒有傷口，也沒有被綁住。' },
{ element: '頭頂的無限符號', meaning: '同一個橫躺的八字也畫在魔術師頭上，把兩張牌連起來；那裡是意念不絕，這裡是耐性不絕。' },
{ element: '腰上與髮上的花環', meaning: '束在她身上的是花編的環，全張牌唯一像繩索的東西是花；材質本身就在說明這股力量的性質。' }
],
imageUpright: '無限符號在最高處，她俯身往下，重心壓向獅子的頭，動勢是溫和地往下彎。獅子低頭垂尾，整個畫面的線條都朝下收攏。',
imageReversed: '轉過來後獅子浮到上方，她從俯身變成仰著往上撐，無限符號沉到最底。那個往下安撫的動作被翻成往上頂，手仍搭在獅口，力道卻換了方向。',
depth: '她的手沒有用力，這是整張牌的論點。獅子沒有被打敗，牠是被安撫的。這張牌談的力量不是壓制，是願意花時間與自己的野性相處：憤怒、慾望、恐懼都不必被消滅，只需要不被牠們駕駛。逆位常見的是對內的嚴厲，你對自己說話的方式，往往比那頭獅子兇多了。',
origin: '力量與正義的編號是被偉特對調過的。馬賽牌裡正義是第八張、力量是第十一張；偉特依黃金黎明的星象對應把兩者互換，於是偉特牌的力量成了第八。它與正義、節制同屬中世紀四樞德裡的堅毅，這組主題在大牌創制時就已經是常見的寓意畫題材。'
},
hermit: {
symbolism: '一名披灰袍的老人站在雪峰之上，低著頭。右手高舉一盞提燈，燈裡是一顆六芒星形狀的光；左手拄著一根長杖。他身邊沒有別人，燈光只照亮腳下很小的一塊範圍。',
iconography: [
{ element: '高舉的提燈', meaning: '燈是他自己提的，也是畫面唯一的光源；沒有別人替他照路，這個安排決定了整張牌的語氣。' },
{ element: '燈裡的六芒星', meaning: '燈中央的光被畫成六芒星，這是十九世紀末黃金黎明一系的象徵語彙，不是中世紀原本的畫法。' },
{ element: '只照亮腳下的光', meaning: '光圈很小，只夠看見下一步；燈舉得再高，照的範圍也沒有變大，內省給的是方向，不是全景。' },
{ element: '手上的長杖', meaning: '杖同時是支撐與探路的工具，是老人在雪地行走的實際配備；獨處因此看起來像旅程，不像退隱。' }
],
imageUpright: '燈舉在畫面最高處，他低著頭，視線往下落到腳邊那一小圈光。雪峰在腳下，長杖往下抵著地，整張牌只有燈是往上的。',
imageReversed: '轉過來後提燈落到最低處，雪峰翻到頭頂，他倒懸著把燈提向地面。原本只照腳下的那圈光現在照的是天空，而他的視線改為朝上。',
depth: '燈是他自己提的，光也只夠照亮下一步，這兩件事一起看才完整。隱者不是在等誰來指路，也不是永遠留在山上；他往內走，是為了把答案帶回來。這張牌談的是主動的獨處，與被動的封閉不同。逆位多半是山上住太久了，內省變成了不必面對別人的藉口。',
origin: '隱者沒有專屬的身世故事。它來自大牌創制時取用的道德寓意畫傳統，苦行者與時間老人的形象在當時的凱旋題材裡都有位置。提燈裡那顆六芒星是偉特牌的設計細節，屬於十九世紀末黃金黎明一系的象徵語彙，不是中世紀原本的畫法。'
},
wheel_of_fortune: {
symbolism: '一個巨大的輪子懸在半空，輪面刻著字母與符號。一條蛇沿著輪的左側往下，一個胡狼頭的形體從右側往上，輪頂坐著一隻持劍的人面獸身像。四個角落各有一位帶翅膀的形象在讀書，輪子沒有立足點。',
iconography: [
{ element: '沒有支點的輪子', meaning: '輪子懸在半空，沒有軸、沒有人在推，四周也沒有地面；轉動因此不屬於任何人，這是構圖的重點。' },
{ element: '輪面上的字母', meaning: '輪上排著可以讀成 TARO 或 ROTA 的字母，中間夾著希伯來文；這層文字屬於黃金黎明一系的設計。' },
{ element: '左右升降的兩個形體', meaning: '蛇沿左側下行，胡狼頭的形體沿右側上行，方向相反而速度相同；升與降在同一個輪上是同一件事。' },
{ element: '輪頂持劍的人面獸身', meaning: '牠坐在輪的最高點，卻是靜止的坐姿；同一格裡有人在爬升、有人在下墜，只有頂端的那個在觀察。' },
{ element: '四角讀書的形象', meaning: '四個帶翅膀的形象分據四角，與世界牌四角是同一組；亂轉的輪子被四個不動的東西框住。' }
],
imageUpright: '輪子懸在正中央，人面獸身坐在最高點，蛇沿左側下行、胡狼頭沿右側上行，四角各有一個形象把畫面框住。升與降同時進行。',
imageReversed: '轉過來後蛇的下行變成上行，胡狼頭改往下走，持劍的形體從輪頂沉到輪底。四角的四個形象只是換了角落，輪子照樣圓著，什麼也沒少。',
depth: '輪子沒有支點，也沒有人在轉它，這正是重點。命運之輪講的不是好運降臨，是週期本身：上去的會下來，下來的會再上去，而你此刻在哪一段並不代表你的價值。它給的建議很實際：順勢時放大動作，逆勢時保存體力。逆位不是厄運，是你正在抗拒一個已經開始的轉動。',
origin: '這張牌的圖像有明確的中世紀來源：命運女神之輪（Rota Fortunae）是當時極常見的意象，可以上溯到波愛修斯的《哲學的慰藉》。輪子把人捧上去又摔下來，用來說明世俗榮華的不可靠。這是少數幾張能直接指出圖像出處的大牌；輪上的字母與符號則是偉特牌後加的。'
},
justice: {
symbolism: '一個戴冠的人物端坐在兩根柱子之間，右手垂直舉著一把雙刃劍，左手托著一副天平。他沒有蒙眼，雙眼直視前方。身後掛著一幅紫色帷幕，袍下露出一隻鞋尖。',
iconography: [
{ element: '沒有蒙眼的雙眼', meaning: '眼睛直視前方，與現代法院那尊蒙眼的雕像正好相反；這張牌要求看清楚，而不是假裝沒有立場。' },
{ element: '垂直舉起的雙刃劍', meaning: '劍舉得筆直、不偏不倚，而且兩面都開刃；判斷會切向任何一邊，包括握劍的人自己在內。' },
{ element: '左手托著的天平', meaning: '天平在左手、劍在右手，兩件事同時進行；先秤再切，量完了要有動作，光衡量在這張牌裡不算數。' },
{ element: '袍下露出的鞋尖', meaning: '長袍下露出一隻鞋尖，是畫面裡唯一的動態暗示；她坐著，但隨時可以站起來，判斷不會停在紙上。' }
],
imageUpright: '劍垂直立在他的一側，天平懸在另一側，兩者以他為軸左右平衡。他正坐、直視前方，帷幕填滿背景，整張牌沒有一處在動。',
imageReversed: '轉過來後劍尖朝下，天平從托在手上變成吊在手下。他的冠沉到最底，那隻露出的鞋尖翹到上方，原本隨時可以站起來的動勢失去了地面。',
depth: '沒有蒙眼是這張牌與現代法院雕像最大的不同：它要求你看清楚，而不是假裝中立。劍與天平一起出現，意思是判斷之後要有行動，光衡量不算數。它談的是因果的直白：你做過的事會回來找你，那不是懲罰，是結算。逆位通常是有人在迴避自己那一份責任，包括你。',
origin: '正義與力量的編號被偉特對調過：馬賽牌裡正義是第八張，偉特牌把它排成第十一，依據的是黃金黎明的星象對應，屬於十九世紀末的安排。正義與節制、力量同屬中世紀四樞德，但四樞德裡的智德（Prudence）在塔羅中始終找不到對應的牌，這是牌史上著名的未解之謎。'
},
hanged_man: {
symbolism: '一個人被繩子綁著單腳，倒吊在一個 T 字形的木架上。另一條腿在膝蓋處彎成四字形，雙手背在身後。他臉上沒有痛苦的表情，頭部四周散發著光。木架上還長著葉子。',
iconography: [
{ element: '只綁一隻腳的繩', meaning: '繩子只綁一隻腳，另一隻腿是自由的；畫面上沒有任何東西阻止他掙脫，停留因此是他的選擇。' },
{ element: '倒吊的姿勢', meaning: '這個姿勢取自義大利的恥辱畫，當時把叛徒與賴帳的人畫成倒吊示眾；它原本的意思是公開羞辱。' },
{ element: '頭部四周的光', meaning: '頭上散著光，這是基督教圖像裡標示聖者的形式；加在受刑的姿勢上，懲罰的畫面被翻成領悟。' },
{ element: '彎成四字形的腿', meaning: '另一條腿在膝上交疊成四字，是刻意的幾何而不是掙扎；一個被吊著的人擺出造型，說明他很安定。' },
{ element: '長著葉子的木架', meaning: '木架還活著、還在長葉，這不只是刑具；承載他的東西本身也在生長，停頓因此有產出。' }
],
imageUpright: '他頭下腳上懸在木架下，重心全吊在一隻腳的繩子上，頭部的光落在畫面最低處。整張牌的重量往下墜，人卻是靜止的。',
imageReversed: '轉過來後他反而站直了，木架落到腳下，那條繩子從吊著他變成把他拴在地上。頭部的光升回頭頂該在的位置，自願倒懸換來的顛倒視角就此消失。',
depth: '繩子只綁住一隻腳，另一隻腳是自由的，他隨時可以掙脫卻選擇不動，這才是這張牌的重量。它談的是主動的暫停：有些事情不是想得更用力就會通，而是要換一個角度才看得見。頭上的光說的是這段停頓有它的產出。逆位則是繩子還在，光沒有了，那就只是拖延而已。',
origin: '這張牌的構圖有清楚的來源：義大利當時有一種叫 pittura infamante 的恥辱畫，把叛徒與賴帳的人畫成倒吊示眾，用圖像執行公開羞辱。吊人的姿勢直接取自這個傳統。也就是說，它原本的意思接近懲罰與汙名，後來才被轉讀成犧牲與換位思考。'
},
death: {
symbolism: '一具穿著黑甲的骷髏騎在白馬上，手持一面黑旗，旗上是白色的五瓣玫瑰。馬前有人倒地、有主教張手相迎、有女子別過頭、有孩童跪著仰望。遠處兩座塔之間，一輪太陽貼著地平線。',
iconography: [
{ element: '黑旗上的白玫瑰', meaning: '黑底上開著一朵白色的五瓣玫瑰，是整張牌唯一的亮色；旗子由死亡舉著，卻不是死亡的顏色。' },
{ element: '馬前四個人的反應', meaning: '主教張手相迎、女子別過頭、孩童跪著仰望、還有人已經倒地；同一件事，差別只在怎麼接。' },
{ element: '騎在白馬上的骷髏', meaning: '骷髏穿黑甲，坐騎卻是白的，而且是走著的；牠不追也不砍，構圖把它畫成行程而不是襲擊。' },
{ element: '地平線上的太陽', meaning: '太陽貼在遠處兩塔之間的地平線上，畫面沒有指明那是日出還是日落；結束與開始在同一個位置。' }
],
imageUpright: '旗子舉在最高處，骷髏騎馬由畫面一側往另一側走，馬前四個人各自反應。太陽壓在地平線上，整個行進是水平的，不往上也不往下。',
imageReversed: '轉過來後黑旗沉到馬腹下方，太陽升到畫面上緣，倒地的人與跪著的孩童全都翻到天上。馬仍在走，只是這趟行程現在踩的是原本的天空。',
depth: '牌面上四個人的反應各不相同，這是整張牌的提示：改變本身不談判，能選的只有你怎麼接。它不是在說壞事要發生，是說一個階段已經結束了，而你可能還沒把它放下。旗上的白玫瑰意思是結束不等於毀滅。逆位最常見的樣子，就是明知結束了還抓著不放，痛苦於是被延長成一種習慣。',
origin: '馬賽牌的第十三張常常不寫牌名，是一張無名之牌，有人認為這反映了對死亡直呼其名的忌諱。這個圖像本身來自中世紀極常見的死亡凱旋與骷髏題材，屬於大牌取材的道德寓意畫傳統。牌面上騎白馬與地平線上的太陽，則是偉特牌自己的處理。'
},
temperance: {
symbolism: '一位有翅膀的人物站在水邊，一腳踩在水裡、一腳踏在岸上。他把液體從一只杯子倒進另一只杯子，水流卻是斜的。胸前有個三角形的標記，身後有一條小徑通向遠山，山後有光。',
iconography: [
{ element: '斜著的水流', meaning: '兩杯之間的水不是垂直落下的，而是斜的；一道違反物理的水流被放在正中央，說明這裡調的是比例。' },
{ element: '一腳水一腳岸', meaning: '一隻腳踩在水裡、一隻踏在岸上，畫面拒絕讓他選邊；平衡被畫成同時待在兩邊，不是站在中線。' },
{ element: '胸前的三角形', meaning: '胸口那個三角形記號屬於黃金黎明一系加上的象徵語彙，是十九世紀末的設計，不是中世紀的內容。' },
{ element: '通向遠山的小徑', meaning: '身後有一條小徑通向遠山，山後有光；耐心被畫成一條要走的路，而不是站在原地等它自己好。' }
],
imageUpright: '水從高的那只杯斜斜往下注入低杯，是畫面唯一的動線。翅膀展在上方，雙腳一水一岸釘住底部，小徑從腳邊往後延伸到遠山。',
imageReversed: '轉過來後兩杯的高低對調，那道斜著的水流改往上走，翅膀沉到腳下。水池翻到頭頂，他一腳踩的水現在懸在天上，比例的調配失去了重力。',
depth: '斜著的水流是這張牌最誠實的地方：真實的平衡從來不是靜止，是持續的微調。一腳在水裡一腳在岸上也是同一個意思，你不必選邊，你在調配比例。它談的是耐心，而耐心不是被動等待，是願意讓過程花掉它該花的時間。逆位就是比例失控，某一樣東西佔掉了太多。',
origin: '節制與正義、力量同屬中世紀的四樞德，這三張都能對上當時的道德寓意畫傳統。值得一提的是四樞德的第四項智德（Prudence）在塔羅裡始終沒有對應的牌，缺這一張的原因至今沒有定論，是塔羅研究裡著名的謎題。節制本身則沒有更多專屬的身世。'
},
devil: {
symbolism: '一個長角、有蝙蝠翅膀的形體蹲踞在方座上，右手舉起，左手持著火炬向下。座前站著一男一女，頭上長角，尾巴分別是火與果實，脖子上套著鎖鏈。鎖鏈鬆垮地垂著，圈子明顯大過他們的頭。',
iconography: [
{ element: '鬆垮的鎖鏈', meaning: '頸上的鏈圈明顯大過他們的頭，畫面直接告訴你可以脫身；這是整張牌唯一真正的論點。' },
{ element: '向下的火炬', meaning: '火炬朝下拿著，可是火會往上燒，這個握法讓光只能燒到自己；照明的工具被畫成傷人的東西。' },
{ element: '頭上長角的兩人', meaning: '兩人也長出了角，尾巴一個是火、一個是果實；他們正在變成上面那個形體的樣子，這是過程。' },
{ element: '蹲在方座上的形體', meaning: '牠蹲著、不站也不坐，右手舉起卻沒有給出祝福；教皇那個手勢的形狀被複製了，內容被抽掉。' }
],
imageUpright: '牠蹲在方座上佔住整個上半部，兩人站在座下的暗處，鎖鏈從牠腳邊垂到他們頸上。壓迫感來自這個由上往下罩的層級。',
imageReversed: '轉過來後那兩人升到最上方，惡魔沉到他們下面，鎖鏈從往下垂變成往上牽。那支朝下的火炬現在朝天，火終於燒得到該燒的方向。',
depth: '鎖鏈是鬆的，這是這張牌唯一真正想說的話。他們沒有被綁住，是沒有低頭看。這張牌談的是那些你以為別無選擇的處境：成癮、關係、工作、某種你反覆回去的模式。它不指責，只是把鏈子的尺寸畫給你看。逆位是好牌，代表你已經看見了，而看見通常就是掙脫的第一步。',
origin: '惡魔沒有專屬的身世故事。它出自大牌創制時取用的道德寓意畫傳統，魔鬼在中世紀圖像裡本來就是現成而常見的題材。偉特牌上那些對稱的角、倒五芒星與火炬細節，屬於十九世紀末黃金黎明一系的象徵語彙，不是這張牌本來的內容。'
},
tower: {
symbolism: '一道閃電擊中塔頂，把王冠打飛出去，塔身竄出火焰。兩個人頭下腳上地從塔上墜落，一個戴冠、一個沒有。天空全黑，四周有火點散落。塔立在一座陡峭的岩石上，底下看不見地基。',
iconography: [
{ element: '被打飛的王冠', meaning: '閃電打掉的是塔頂的冠，不是塔身；崩塌從最頂端、最象徵性的那一件東西開始，牆本身還立著。' },
{ element: '頭下腳上的兩人', meaning: '兩個人一個戴冠、一個沒有，落下的姿勢卻一模一樣；災難不看位階，這是構圖說的話。' },
{ element: '看不見地基的岩石', meaning: '塔立在陡峭的岩頂上，畫面刻意不畫出它與地面的接合處；你看不到它站在什麼上面。' },
{ element: '全黑的天空', meaning: '背景是整副牌裡最暗的一張，火點散在黑裡；光全部來自破壞本身，這一刻沒有別的光源。' }
],
imageUpright: '閃電從畫面上緣斜劈進塔頂，王冠被打得飛開，兩個人頭下腳上往下墜。動勢全部朝下，塔立在岩頂，底部沒有畫出地面。',
imageReversed: '轉過來後塔尖朝下，閃電從底部往上劈，墜落的兩人變成頭朝上往天飛。連王冠都像被拋回塔頂，崩塌的方向整個反轉，像災難倒帶。',
depth: '被打飛的是王冠，不是塔身，這個細節值得留意：崩塌的往往是你頂在頭上的那個說法，而不是你這個人。這張牌承認痛，但也指出建在錯誤基礎上的東西遲早要拆，早拆比晚拆便宜。落下的人沒有被畫成死亡。逆位常是硬撐：你已經感覺到裂縫了，還在替它找解釋。',
origin: '馬賽牌裡這張叫 La Maison Dieu（神之家），也有版本直接叫閃電。它指的是什麼並無定論：一說是被雷擊的教堂，一說是巴別塔。無論哪一種，圖像來源都在中世紀的宗教與道德寓意畫傳統裡，而不是什麼失落文明的記憶。'
},
star: {
symbolism: '一名裸身女子單膝跪在水邊，一腳踩在水裡、一膝抵著地。她兩手各持一只水壺，一壺倒回池中，一壺澆在土地上。天上有一顆大星與七顆小星，遠處的樹上停著一隻鳥。',
iconography: [
{ element: '一壺倒回池中', meaning: '兩壺水的去向不同，一壺回到水裡、一壺澆在土上；療癒被畫成兩件事同時做，內在與現實各一份。' },
{ element: '一腳水一膝地', meaning: '一隻腳踩在水裡、一膝抵著地，與節制那個一腳水一腳岸的姿勢同形；兩張牌都在說不必選邊。' },
{ element: '一大星與七小星', meaning: '一顆大星居中，七顆小星圍著，構圖把主星釘在正上方；它不移動，也不靠近，只是持續在那裡。' },
{ element: '沒有遮掩的裸身', meaning: '她什麼也沒穿，畫面卻沒有任何威脅；不設防在這裡是安全的證據，這種狀態只在風暴過後出現。' }
],
imageUpright: '大星釘在畫面正上方，七顆小星圍著它，她跪在最低處把兩壺水往下倒。水的去向是往下的，一注回池、一注入土，動線由天到地。',
imageReversed: '轉過來後星星沉到畫面下方，水池翻到頭頂，兩道水流變成從池子與土地往壺裡回灌。傾注被改成回收，那顆不動的主星離開了天空。',
depth: '她什麼也沒穿，也不需要遮掩，這是風暴過後才有的狀態。兩壺水一壺回水裡、一壺澆在地上，說的是療癒要同時餵養內在與現實生活，只顧一邊都不會好。星星不承諾快，它承諾方向還在。逆位不是希望消失了，是雲擋住了；牌面上那顆星從頭到尾沒有移動過。',
origin: '星星、月亮、太陽在大牌裡是一組天體序列，這種組合在中世紀寓意畫裡很常見，這張牌也沒有專屬的個別身世。至於把大牌與星象、卡巴拉逐一對應的做法晚得多：一八五零年代 Éliphas Lévi 首度把二十二張大牌配上希伯來文字母，那是十九世紀的附會，不是傳統。'
},
moon: {
symbolism: '一輪帶著人臉側影的月亮掛在天上，灑下光點。地上一隻狗與一隻狼朝月仰頭嚎叫，兩座塔分立左右，一隻螯蝦正從水池裡爬上岸。一條小路從水邊出發，穿過兩塔之間，通向遠方的丘陵。',
iconography: [
{ element: '一直畫著的小路', meaning: '路從水邊出發，穿過兩塔通到遠方；畫面明明給了路，只是光不夠亮，這是月亮與絕望的差別。' },
{ element: '一狗一狼', meaning: '兩隻仰頭嚎叫的動物是同一個物種的兩端，一隻馴化、一隻沒有；牠們並排，代表兩者都在。' },
{ element: '爬上岸的螯蝦', meaning: '螯蝦正從水裡爬上陸地，位置在畫面最下方；某個還沒成形的東西正在浮出來，牠爬到一半。' },
{ element: '帶著人臉的月亮', meaning: '月亮既是側面的臉又是圓的輪廓，兩個形狀疊在一起；連光源本身都在同時呈現兩種樣子。' },
{ element: '分立左右的兩塔', meaning: '兩座塔一左一右，路正好從中間穿過；門是有的，也一定要走過去，但塔上什麼也沒有寫。' }
],
imageUpright: '月亮掛在正上方往下灑光點，狗與狼仰頭朝它叫，螯蝦從最低處的水池往上爬。小路由近而遠往上退，整張牌的視線都朝月亮走。',
imageReversed: '轉過來後月亮沉到最底，光點改往上灑，狗與狼變成低頭朝下嚎叫。螯蝦爬出水面的方向翻成往下鑽回去，水池與那條小路一起吊在了上方。',
depth: '路是畫出來的，而且一路通到遠方，這件事常被忽略。月亮不是說前方沒有路，是說光不夠亮，你會把樹影看成人影。狗與狼是同一種動物的兩張臉，馴化的與野的都在你身上。它建議的是慢，不是停。逆位是潮水退去，你會發現多數怪物其實是自己想像出來的。',
origin: '月亮屬於大牌裡星星、月亮、太陽這組天體序列，這種組合是中世紀寓意畫的常見安排，沒有更多專屬的個別身世。牌面上的螯蝦、雙塔與那條小路是偉特與 Pamela Colman Smith 的構圖選擇，屬於一九零九年這副牌自己的語言。'
},
sun: {
symbolism: '一個赤裸的孩子騎在一匹白馬上，張開雙臂，頭上戴著花環，手裡拿著一面紅色的大旗。他們身後是一道磚牆，牆內開著四朵向日葵。天上的太陽有人臉，光線直直地灑滿整個畫面。',
iconography: [
{ element: '沒有抓韁繩的孩子', meaning: '孩子張著雙臂騎在馬上，兩手都沒有拉韁；他不控制，也沒有掉下來，這是這張牌對安全感的定義。' },
{ element: '身後的磚牆', meaning: '牆完整地立在他身後，沒有被拆掉；限制還在，只是被留在後面，喜悅不必等障礙清空才開始。' },
{ element: '牆內的向日葵', meaning: '四朵向日葵長在牆內，全朝著太陽的方向；跟著光走在這裡是植物的本能，不是需要努力的決定。' },
{ element: '手裡的紅色大旗', meaning: '旗子很大、是紅的，卻由一個小孩舉著；畫面把最張揚的顏色交給最沒有防備的人，這就是語氣。' },
{ element: '有人臉的太陽', meaning: '太陽被畫成一張正臉，直視觀者；光線是筆直的，不彎也不散，這張牌不留任何需要解讀的陰影。' }
],
imageUpright: '太陽佔住整個上緣，光線筆直往下灑，向日葵朝著它抬頭。孩子騎馬橫過畫面前排，紅旗往上舉，磚牆是唯一的水平線。',
imageReversed: '轉過來後太陽落到畫面底部，光線改往上射，孩子與白馬倒懸在磚牆下方。向日葵仍朝著太陽，只是這對關係整組翻了過來，光從腳下照上來。',
depth: '孩子沒有抓韁繩，也沒有要趕去哪裡，這是這張牌的重點：喜悅不需要理由，也不需要被賺到。牆在他身後，意思是那些限制還在，只是此刻不重要了。它談的是清晰，一種不必費力解釋的狀態。逆位不會把它變成壞牌，只是提醒你別把樂觀當成不用做事的許可。',
origin: '太陽是大牌天體序列裡的一張，與星星、月亮成組，這在中世紀寓意畫裡是常見的搭配，它沒有專屬的個別身世故事。牌面上那個騎馬的孩子、向日葵與磚牆，是 Pamela Colman Smith 為一九零九年這副牌畫的構圖，早期義大利牌的太陽長得並不一樣。'
},
judgement: {
symbolism: '一位天使從雲間探身，吹響一把長號，號上懸著旗幟。下方的人們從打開的石棺裡站起來，張開雙臂仰頭望向天使，有男有女有孩子。遠處是連綿的雪山，海水在棺木之間。',
iconography: [
{ element: '天使吹響的長號', meaning: '天使吹號、死者復活，是基督教最後審判圖像的固定構圖，當時人人都看過；大牌整組搬了過來。' },
{ element: '自己站起來的人們', meaning: '棺蓋是開的，人是自己站起來的，天使只負責吹號；沒有人被拉起來，這個分工是這張牌的重點。' },
{ element: '男女與孩子三人', meaning: '前景站起來的是男、女與孩子，並排、動作相同；這場召喚不是個人的事，整段人生都被算進去。' },
{ element: '棺木之間的海水', meaning: '石棺漂在水面上，遠方是連綿的雪山；場景不在任何具體的地方，這個召喚沒有地址，只有時刻。' }
],
imageUpright: '天使與長號佔住上半部，號聲往下傳，棺裡的人從最低處站起來、張臂往上仰望。整個畫面是一條由下往上迎接的垂直動線。',
imageReversed: '轉過來後天使沉到畫面底部，石棺與雪山浮到頭頂，站起來的人變成倒懸著往下伸手。那條由下往上的迎接動線被翻轉，號聲改由地面傳來。',
depth: '他們是自己站起來的，天使只負責吹號。這張牌談的是那種你聽得見、別人聽不見的召喚：某件事你知道自己該去面對了。它要求回顧與結算，但方向是往前的，不是往回悔恨。原諒自己是其中最難也最必要的一步。逆位多半不是沒聽見，是聽見了卻用自我批判把它蓋掉。',
origin: '這張牌的圖像來源很直接：中世紀基督教的最後審判是當時最普及的宗教題材之一，天使吹號與死者復活的構圖幾乎人人看過，大牌創制時把它納進來並不需要任何祕傳背景。把它讀成內在覺醒與自我召喚，是後世詮釋替它加上的意義層。'
},
world: {
symbolism: '一名人物懸在一圈綠色的桂冠中間，身上只披著一條布，兩手各握一根短杖。桂冠是杏仁形的，上下各繫著一條紅帶。畫面四角各有一個形象：天使、老鷹、公牛與獅子。',
iconography: [
{ element: '杏仁形的桂冠', meaning: '這個杏仁形的光輪在中世紀基督教藝術裡專門用來框住聖者，是現成的形式，偉特把它借來收尾。' },
{ element: '四角的四個形象', meaning: '天使、老鷹、公牛與獅子分據四角，同一組形象也在命運之輪的四角；一張在轉，一張完成了。' },
{ element: '手上的兩根短杖', meaning: '兩手各握一根短杖，左右對稱、大小相同；魔術師只有一根且指向天，這裡是兩根，不再需要方向。' },
{ element: '懸空而不落地的人', meaning: '中央的人物沒有踩在任何東西上，還在動；圓滿被畫成一個環而不是終點線，走完的人仍在移動。' }
],
imageUpright: '桂冠是個上下對稱的杏仁形，紅帶各繫在頂端與底部，四角的四個形象把畫面框成一個穩定的方。中央的人物懸空，還在動。',
imageReversed: '轉過來後桂冠幾乎沒有變，兩條紅帶只是上下互換，四角的形象換了角落。這張牌的對稱吃掉了旋轉，真正翻過來的只有中央那個懸空的人物。',
depth: '這張牌是完成，但它畫的是一個環，不是一條終點線。四角的形象把畫面框成一個穩定的整體，中間的人卻是懸空的、還在動。它說的是圓滿不等於停止：你走完了一圈，慶祝它，然後帶著這一圈學到的東西進下一圈。逆位是最後一哩，缺角通常很小，小到你一直說之後再處理。',
origin: '世界常被畫成一個人物置於杏仁形光輪（mandorla）之中，這個形式在中世紀基督教藝術裡專門用來框住基督或聖母，是現成的視覺語言，四角的四個形象同樣出自那套圖像傳統。這張牌沒有更多專屬的個別身世，它的來歷就是大牌整體的來歷。'
},
ace_of_wands: {
symbolism: '一隻手從雲中伸出，握著一根還在冒新芽的粗木杖，幾片葉子正從杖上飄落。下方是一片綠地，遠處有河流、樹木，以及立在小丘上的一座城堡。整個畫面只有這隻手在動。',
iconography: [
{ element: '雲中伸出的手', meaning: '四張王牌都用同一個構圖：一隻手從雲裡把花色的本體遞出來。它遞著，但沒有塞給你。' },
{ element: '杖上冒出的新芽', meaning: '杖是活的，還在發芽；權杖在偉特牌裡不是打人的棍子，是會長東西的枝條，靈感被畫成植物。' },
{ element: '正在飄落的葉子', meaning: '幾片葉子已經離開杖了，畫面同時畫著發芽與掉落；這個起點自帶保存期限，時間被壓在同一格。' },
{ element: '遠處小丘上的城堡', meaning: '城堡在很遠的小丘上，畫得很小；成果被放在畫面深處，這隻手給的是開始，不是抵達。' }
],
imageUpright: '雲與手佔住上方，杖從那裡往下伸進畫面，新芽朝上、落葉往下掉。底下是綠地與遠方的城堡，整張牌只有這隻手所在的高度有東西在動。',
imageReversed: '轉過來後雲中的手改從畫面下方伸出，杖朝上舉，飄落的葉子變成往上飛。禮物從天而降變成從地裡長出來，城堡則掛在頭頂的位置。',
},
two_of_wands: {
symbolism: '一個人站在城堡的高牆上，右手托著一顆小小的地球儀，左手扶著一根固定在牆上的木杖。另一根杖立在他身旁。他背對觀者望向遠方的海岸線，牆上刻著一朵百合與一朵玫瑰交疊的紋樣。',
iconography: [
{ element: '手上的小地球儀', meaning: '世界被縮成一顆握得住的球，拿在手裡端詳；此刻整個世界還是一件觀察對象，不是走過的路。' },
{ element: '固定在牆上的杖', meaning: '兩根杖，一根被扣死在牆上、一根他還握著；已經有的東西與可以帶走的東西被畫成兩個物件。' },
{ element: '背對觀者的站姿', meaning: '他背對著我們望向海岸線，臉是看不見的；畫面不讓你讀他的表情，因為他還停在沒決定的那一刻。' },
{ element: '牆上的百合與玫瑰', meaning: '牆面刻著百合與玫瑰交疊，同一組紅白對照也開在魔術師桌前；純粹與慾望被刻在他站的牆上。' }
],
imageUpright: '他站在牆頂，背對觀者往遠方的海岸線看，兩根杖直立在左右。地球儀托在手上，重量落在牆與腳之間，整個畫面往外、往遠處推。',
imageReversed: '轉過來後城牆翻到頭頂，他倒懸在牆下，兩根杖從立著變成朝下垂。托在掌心的地球儀改成吊在手掌下方，海岸線也跟著沉到畫面底部。',
},
three_of_wands: {
symbolism: '一個人背對觀者站在高處，三根木杖立在身邊，他右手扶著其中一根。腳下是遼闊的黃色海灣，幾艘船正在水面上航行。他披著紅色斗篷，望向遠方，沒有動作。',
iconography: [
{ element: '水面上的幾艘船', meaning: '船已經出去了，正在水上航行；決定在這張牌之前就做完，畫面上唯一在動的東西不在他手上。' },
{ element: '扶著其中一根杖', meaning: '三根杖立在身邊，他只扶著一根；手上有支撐，卻沒有使力，這是等待的姿勢，不是工作的姿勢。' },
{ element: '站在高處的位置', meaning: '他站得比海灣高，視野因此夠遠；這個位置換來的是看得見，不是做得到，兩者在此被分開。' },
{ element: '紅色的斗篷', meaning: '斗篷是紅的，在一片黃色的海灣裡很顯眼；人沒有動，顏色卻很響，熱度還在，只是暫時無處可用。' }
],
imageUpright: '他站在畫面上緣的高處，三根杖直立在身邊，視線越過腳下的海灣往遠方去。船在最低處的水面上航行，構圖由近的人往遠的水延伸。',
imageReversed: '轉過來後海灣與船隻升到頭頂，三根杖倒垂下來，他倒懸在畫面底部。原本從高處往下望的視線變成從低處往上看，船改在天空裡航行。',
},
four_of_wands: {
symbolism: '四根木杖立成一個門的形狀，杖頂連著一串花環。兩個人在門後高舉花束歡呼，其他人聚在一起。更遠處是一座城堡的輪廓。畫面明亮，前景開闊，沒有任何遮蔽。',
iconography: [
{ element: '立成門形的四杖', meaning: '四根杖搭成的是門，不是牆；它有柱子也有橫楣，可以走過去，慶祝因此發生在路上，不是終點。' },
{ element: '杖頂的花環', meaning: '門楣上掛的是花編的環，材質是會凋謝的東西；這份穩定被畫成一個季節，牌面沒有承諾它永久。' },
{ element: '門後高舉的花束', meaning: '兩個人在門後高舉花束，其他人聚在一起；畫面沒有中心人物，這場慶祝不屬於任何一個人。' },
{ element: '遠處城堡的輪廓', meaning: '城堡只剩一個輪廓，退在很遠的地方；權力與規模被推到背景，前景留給沒有遮蔽的空地與人。' }
],
imageUpright: '四根杖立在地上撐起一道門，花環掛在門楣的高度往下垂。門後的人把花束往上舉，畫面明亮開闊，重量穩穩落在四根杖的底端。',
imageReversed: '轉過來後四根杖從立在地上變成從上緣倒吊，門楣沉到最底，花環改成往上翹。舉花束的人倒懸著，慶祝的手勢變成朝著地面伸。',
},
five_of_wands: {
symbolism: '五個年輕人各持一根木杖，在空地上舉杖相向。他們的動作沒有章法，杖與杖交錯著，衣著顏色各不相同。沒有人倒下，也看不出誰佔上風。地面平坦，天空是淡色的。',
iconography: [
{ element: '交錯的五根杖', meaning: '五根杖交錯成一團，沒有指向同一個方向；畫面是亂的，但沒有一根杖真的打在人身上。' },
{ element: '沒有人倒下', meaning: '五個人都還站著，也看不出誰佔上風；這不是戰場的畫法，比較接近練習賽，沒有勝負只有消耗。' },
{ element: '各不相同的衣色', meaning: '每個人穿的顏色都不一樣，這是畫面唯一區分他們的方式；衝突的來源是差異本身，不是惡意。' },
{ element: '平坦的地面', meaning: '地是平的，天空是淡的，沒有任何地形給誰優勢；環境不偏袒任何一方，這場混戰全靠人自己撐。' }
],
imageUpright: '五根杖朝各個方向交錯，沒有一根指同一邊，動勢因此互相抵消。人全站在同一條平坦的地面上，構圖是散的，重量平均分在畫面中央。',
imageReversed: '這張牌轉過來沒有方向性的翻轉：杖本來就交錯得沒有章法，倒過來仍舊是一團亂。變的只有人全部倒懸、地面翻到頭頂，亂法本身沒有改變。',
},
six_of_wands: {
symbolism: '一個人騎在白馬上，頭戴桂冠，手中的木杖頂端也繫著一圈桂冠。馬身披著布飾。四周圍著步行的人群，每個人手裡都舉著一根杖，仰頭看著馬上的人。',
iconography: [
{ element: '兩頂桂冠', meaning: '桂冠有兩頂，一頂戴在頭上、一頂繫在杖上；自己的成就與別人給的認可被畫成兩件分開的東西。' },
{ element: '騎在馬上的高度', meaning: '只有他在馬上，其他人都用走的；這個高度是畫面給的，不是他自己長出來的，隨時可以收回去。' },
{ element: '人群手上的杖', meaning: '圍著他的每個人手裡也都有一根杖，跟他的一樣；隊伍裡的人不是觀眾，這場勝利是一起打的。' },
{ element: '馬身上的布飾', meaning: '連馬都披上了裝飾，整個畫面是安排過的；這是遊行不是戰鬥，被看見本身就是這張牌的內容。' }
],
imageUpright: '馬上的人被抬到畫面最高處，杖與桂冠又往上舉出一截，四周的人仰著頭往上看。所有視線都朝同一個點集中，隊伍水平往前走。',
imageReversed: '轉過來後馬上的人沉到畫面底部，舉在杖頂的桂冠垂到最低，人群的仰望變成低頭俯看。被抬高的那個高度整個翻掉，遊行的隊伍倒懸著前進。',
},
seven_of_wands: {
symbolism: '一個人站在高處，雙手橫握一根木杖向下抵擋。下方伸上來六根杖，看不見持杖的人。他表情緊繃，站姿不太穩，仔細看，兩隻腳穿的鞋並不一樣。',
iconography: [
{ element: '不成雙的鞋子', meaning: '他兩隻腳穿的鞋不一樣，是牌面上最小也最誠實的細節；守久了的人是狼狽的，畫面沒有修飾。' },
{ element: '看不見的六根杖', meaning: '下方伸上來六根杖，持杖的人一個也沒有畫出來；威脅沒有臉，你不知道自己在跟誰打。' },
{ element: '站在高處的位置', meaning: '他站得比對手高，這既是優勢也是他被攻擊的原因；有東西可以守，才會有人來搶。' },
{ element: '橫握向下的杖', meaning: '杖是橫著往下抵的，不是刺出去的；這個握法只能擋，不能贏，畫面把守勢畫得很具體。' }
],
imageUpright: '他站在畫面上緣，六根杖從下緣往上戳，他橫握的那根往下抵住。壓力由下往上頂，他的重量往下壓，兩股力氣在畫面中間相接。',
imageReversed: '轉過來後六根杖改從上方垂下來壓他，他倒懸在畫面底部，那根橫杖變成往上頂。守方與攻方的高度互換，他從居高臨下變成被壓在最底。',
},
eight_of_wands: {
symbolism: '八根木杖在空中並排飛行，微微斜向下，看得出正接近地面。杖上還帶著葉子。畫面裡沒有人，下方是一片綠地、一條河流與遠處的小丘。天空清朗，沒有雲。',
iconography: [
{ element: '畫面上沒有人', meaning: '這是小牌裡少數沒有人物的一張；沒有人可以出手，也沒有人可以擋，事情已經自己在飛了。' },
{ element: '斜向下的八根杖', meaning: '八根杖並排斜向下，正在接近地面；畫面標出的是落點，不是起飛，這一波很快就會著地。' },
{ element: '杖上還帶著葉子', meaning: '飛在空中的杖還長著葉，跟王牌那根一樣是活的；速度沒有把生機甩掉，這張牌快，但不粗暴。' },
{ element: '清朗無雲的天空', meaning: '天上一朵雲也沒有，飛行路徑完全沒有阻礙；環境是最順的狀態，慢下來這件事只能靠自己。' }
],
imageUpright: '八根杖並排斜著往下飛，杖尖指向低處的綠地，落點就在畫面下緣。天空空著，沒有人，整張牌只有這一組平行線在動。',
imageReversed: '轉過來後八根杖從往下降變成斜斜往上飛，綠地與河流翻到頭頂。原本標好的落點消失了，這一波不再是要著地，而是離地，去處變了。',
},
nine_of_wands: {
symbolism: '一個人頭上纏著繃帶，雙手抱著一根木杖站著，身後立著八根杖排成一排。他側著頭往旁邊看，眉頭皺著，像在防備什麼。身後是一道低矮的丘陵。',
iconography: [
{ element: '頭上的繃帶', meaning: '繃帶是傷過的證據，畫面直接把來歷放在最顯眼的位置；這張牌的疲憊有出處，不是憑空的低潮。' },
{ element: '身後排成排的八杖', meaning: '八根杖立在身後排成一排，像一道籬笆；他已經打完八場，前面每一張牌在這裡都變成了背景。' },
{ element: '抱在懷裡的第九根', meaning: '最後一根杖被他抱著，不是拄著也不是舉著；那是他還握得住的部分，其餘的都變成了牆。' },
{ element: '側頭警戒的眼神', meaning: '他往旁邊看，畫面上那個方向什麼也沒有；戒備已經變成習慣，不需要有敵人才會啟動。' }
],
imageUpright: '他站在畫面前排，八根杖在身後立成一道籬笆，全部朝上。他抱著第九根杖，重量直直落在腳下，唯一的動作是側過去的那道視線。',
imageReversed: '轉過來後身後那八根杖從立著變成從上方倒懸，籬笆吊在頭頂，他也跟著倒過來。丘陵翻到天上，那道側頭的警戒視線方向反了，杖仍舊抱著。',
},
ten_of_wands: {
symbolism: '一個人彎著腰，雙手抱著十根木杖，杖頭高過他的視線，擋住了臉。他正朝前方走，遠處已經可以看見一座村莊。地面是耕作過的田。他沒有停下來。',
iconography: [
{ element: '擋住臉的杖頭', meaning: '十根杖抱在胸前，杖頭高過視線，把他自己的臉也遮掉了；畫面連他的表情都不給你看。' },
{ element: '看不見的村莊', meaning: '村莊就在前方不遠，他卻正好被杖擋著看不到；目標與負擔在同一條視線上，這是最痛的安排。' },
{ element: '抱著而不是扛著', meaning: '杖是抱在胸前的，不是扛在肩上；這是最費力的拿法，也說明這捆東西是一路撿起來的。' },
{ element: '耕作過的田', meaning: '腳下的地已經翻過，代表這些杖是自己的收成；責任不是別人塞的，這一點畫面說得很清楚。' }
],
imageUpright: '十根杖抱在胸前，杖頭往上翹過他的視線，把臉與前方的村莊一起擋掉。他彎著腰，重量全壓在上半身，動勢是水平地往前拖。',
imageReversed: '轉過來後他與那捆杖一起倒懸，杖頭朝下，耕過的田翻到頭頂。遮擋沒有變，杖還是擋在他和村莊之間；旋轉沒有替他讓出視線。',
},
page_of_wands: {
symbolism: '一名年輕人站在沙地上，雙手扶著一根比他還高的木杖，抬眼望著杖頂。他穿著印滿蠑螈紋樣的長袍，頭上插著一根紅羽毛。身後是三座金字塔形的丘陵，天空是淡黃色的。',
iconography: [
{ element: '低頭端詳的杖頂', meaning: '他在看杖，不是揮杖；四位侍者的手勢全是端詳自己那個花色的東西，熱情還停在觀察的階段。' },
{ element: '比人還高的木杖', meaning: '杖比他本人還高，兩手才扶得住；工具大於使用者，這是新手與這股力量之間的實際比例。' },
{ element: '袍上的蠑螈紋樣', meaning: '長袍印滿蠑螈，同樣的紋樣也出現在權杖騎士與國王身上；這是繪者標示這個花色的家族記號。' },
{ element: '背後的金字塔丘陵', meaning: '那幾座金字塔形的丘陵是一九零九年繪者的裝飾筆觸，呼應當時流行的埃及風，不是淵源的證據。' }
],
imageUpright: '杖比他本人還高，兩手扶著立在沙地上，他的視線落在杖頂。人與杖都是垂直的，背後三座丘陵也往上收成尖，整張牌都在站直。',
imageReversed: '轉過來後人與杖一起倒懸，杖從立在沙上變成從上方垂下來，他兩手改為往上扶。背後那三座尖丘也倒過來，變成從天上垂下的三個尖角。',
},
knight_of_wands: {
symbolism: '一名騎士騎在揚起前蹄的橘色馬上，右手斜舉著木杖。他的頭盔上飄著紅色羽飾，鎧甲外罩著印有蠑螈紋樣的短袍。背景是荒涼的沙地，遠處立著三座金字塔形的丘陵。',
iconography: [
{ element: '揚起前蹄的橘馬', meaning: '馬的前蹄離地，人還坐得住；四張騎士裡只有這匹在起跳，速度是馬決定的，不是他決定的。' },
{ element: '斜舉的木杖', meaning: '杖是斜舉的，沒有指向任何目標；動能很足，方向卻沒有畫出來，這個空缺就是這張牌的風險。' },
{ element: '頭盔上的紅羽飾', meaning: '頭盔上飄著紅羽，短袍印著蠑螈；他身上最搶眼的東西都是裝飾，這份存在感有一部分是演出來的。' },
{ element: '荒涼的沙地', meaning: '他要衝過去的地方是一片荒地，什麼也沒有；畫面沒有畫出目的地，衝勁與去處在此被分開處理。' }
],
imageUpright: '馬的前蹄離地往上抬，人跟著往後仰，杖斜舉在最高處。整個重量壓在馬的後腿與地面接觸的那一點上，動勢是往上、往前竄的。',
imageReversed: '轉過來後馬變成頭下腳上，那對揚起的前蹄改為朝下踢，沙地翻到頭頂。斜舉的杖垂向地面，往上竄的那股衝勁被翻成往下栽的方向。',
},
queen_of_wands: {
symbolism: '她坐在石造王座上，扶手與椅背刻著獅子。右手握著一根冒著葉子的木杖，左手拿著一朵向日葵。腳邊蹲著一隻黑貓，正面對著觀者。王座後方畫著兩隻獅子與向日葵。',
iconography: [
{ element: '一手杖一手花', meaning: '右手是會發芽的杖，左手是向日葵；力量與美被同時握著，這個組合就是她處理事情的方式。' },
{ element: '腳邊的黑貓', meaning: '整副牌只有她腳邊有一隻黑貓，而且是正面盯著觀者的；牌上其他人都在看畫內，這隻貓在看你。' },
{ element: '椅背上的獅子', meaning: '王座前後刻滿獅子，她坐在群獅中間卻不必碰牠們；力量牌要用手安撫的東西，這裡已成家具。' },
{ element: '手上的向日葵', meaning: '向日葵是朝著太陽轉的花，也開在太陽牌的牆內；她握著的是那個追光的動作本身，不是光。' }
],
imageUpright: '她正坐在畫面中軸，一手的杖直立著、一手拿著向日葵，兩邊一高一低。黑貓蹲在最底，正面盯著觀者，是唯一把視線送出畫外的東西。',
imageReversed: '轉過來後王座的底座翻到最上，黑貓浮到頭頂，她倒懸在中間，直立的杖改為朝下。那隻貓還是正面盯著你，只是連牠也是倒著的。',
},
king_of_wands: {
symbolism: '他坐在王座上，椅背刻著獅子與蠑螈的紋樣。右手握著一根長木杖，杖底抵在地上。身穿橘紅色長袍，頭戴火焰狀的冠。王座旁的地上有一隻小蠑螈。他側身坐著，像隨時要站起來。',
iconography: [
{ element: '側著身的坐姿', meaning: '四張國王裡只有他坐得不正，身體轉向一側；他不是來坐鎮的，構圖把他畫成隨時要站起來。' },
{ element: '抵在地上的杖底', meaning: '杖沒有舉起來，杖底穩穩抵著地；願景在他手上，重量卻落在地面，這張牌談的是能落地的野心。' },
{ element: '地上的小蠑螈', meaning: '王座旁有一隻活的小蠑螈，椅背上也刻著同樣的紋樣；刻死的圖案與活的動物在同一格裡出現。' },
{ element: '火焰狀的冠', meaning: '冠被畫成一圈火焰的形狀，長袍是橘紅的；整個人的配色與這個花色一致，權威是燒出來的。' }
],
imageUpright: '杖底抵在地上，杖身斜斜往上頂，重量從他的手一路傳到最低處。他側著身坐，火焰冠在最高點，小蠑螈趴在畫面底部的地上。',
imageReversed: '轉過來後杖底從抵著地變成頂著天，那股往下傳的重量沒有了落點。火焰冠沉到最底，小蠑螈爬到頭頂上方，隨時要站起來的姿勢變成要墜下去。',
},
ace_of_cups: {
symbolism: '一隻手從雲裡托出一只杯子，杯口湧出五道水流，往下注入一池睡蓮。一隻白鴿叼著聖餅往杯裡飛。杯上有一個倒寫的字母。水面平靜，睡蓮開著。',
iconography: [
{ element: '湧出的五道水流', meaning: '杯裡的水滿到溢出來，分成五道往下注；這隻手遞出的東西已經裝不下了，重點在滿出來之後。' },
{ element: '叼著聖餅的白鴿', meaning: '鴿子叼著聖餅飛進杯裡，兩者都是基督教聖餐的圖像；這個花色的開端被放在明確的宗教語彙裡。' },
{ element: '杯上倒寫的字母', meaning: '杯身上有一個上下顛倒的字母，方向是錯的；畫面把一個小小的不對勁留在正中央，沒有解釋。' },
{ element: '水面上的睡蓮', meaning: '溢出的水注入一池睡蓮，花是開著的，水面卻是平的；接住這股水的地方很安靜，不必吵。' }
],
imageUpright: '手托著杯浮在畫面中央，五道水從杯口往下注，落進最低處的睡蓮池。白鴿由上往下飛進杯裡，所有動線都是同一個方向：往下。',
imageReversed: '轉過來後杯口朝下，五道水流變成從睡蓮池往上湧回杯裡，白鴿改從下方往上飛。溢出被倒帶成回收，而杯身那個倒寫的字母現在是正的。',
},
two_of_cups: {
symbolism: '一男一女面對面站著，各持一只杯子，正要交換或碰杯。兩人之間浮著一根有雙蛇纏繞的杖，杖頂是一個長翅膀的獅頭。他們身後是一片綠地，遠處有房舍與小丘。',
iconography: [
{ element: '雙蛇纏繞的杖', meaning: '兩人之間浮著一根杖，兩條蛇對稱地纏在同一根軸上；連結被畫成兩者繞著同一個中心，不是纏住。' },
{ element: '杖頂的獅頭', meaning: '杖頂是一個長著翅膀的獅頭，浮在兩人正中央；畫面把最有力的形象放在中線上，不給任何一方。' },
{ element: '高度相同的兩人', meaning: '兩人面對面站著，身高一樣，杯子在正中間交換；平等是用構圖說出來的，不必寫成文字。' },
{ element: '遠處的房舍與小丘', meaning: '背景是一棟房子與起伏的小丘，是日常的風景；這份連結被放在可以生活的地方，不是幻境。' }
],
imageUpright: '兩人左右對稱地站著，杯在正中間相接，獅頭杖從他們之間往上長，杖頂是全牌最高的東西。畫面沿中線平衡，重量落在兩人的腳下。',
imageReversed: '轉過來後那根杖從往上長變成從上緣垂下，翅膀獅頭沉到畫面底部，兩人倒懸著碰杯。左右對稱吃掉了大半旋轉，真正翻掉的是那根杖的方向。',
},
three_of_cups: {
symbolism: '三名女子圍成一圈，各自高舉一只杯子往中間相碰。她們穿著不同顏色的長袍，其中一人頭戴花冠。腳邊的地上有南瓜與葡萄等收成。她們的姿態像在跳舞。',
iconography: [
{ element: '舉在頭上的三杯', meaning: '三只杯子在圈子正中央相碰，位置比所有人的頭都高；分享的動作被畫成整個構圖的最高點。' },
{ element: '腳邊的收成', meaning: '地上散著南瓜與葡萄，全是採下來的東西；有東西可以分，才有這場慶祝，前提被放在腳邊。' },
{ element: '圍成一圈的三人', meaning: '三個人圍成圈，沒有誰站在中間；圈子沒有主客之分，也因此每個人都要在場它才成立。' },
{ element: '各不相同的袍色', meaning: '三件長袍顏色都不一樣，其中一人戴著花冠；她們是不同的人，畫面沒有把她們畫成同一個樣子。' }
],
imageUpright: '三只杯在最高處相碰，三個人的手臂全部往上舉，收成散在最低的地上。畫面由下往上開，重量在腳邊，動勢與視線都朝那個交會點去。',
imageReversed: '轉過來後三只相碰的杯沉到畫面最底，杯口朝下，腳邊那些南瓜與葡萄浮到了天上。舉杯的手臂從往上撐變成往下垂，圈子還在，高點沒了。',
},
four_of_cups: {
symbolism: '一個年輕人抱著手臂坐在樹下，雙腿盤起，低頭看著地上排成一列的三只杯子。一隻手從旁邊的雲裡伸出，遞上第四只杯子。他沒有看那隻手。背景是綠色的丘陵。',
iconography: [
{ element: '雲裡遞來的第四杯', meaning: '一隻手從雲裡伸出遞著杯子，與四張王牌是同一個手勢；機會送到面前，他沒有轉頭。' },
{ element: '抱著手臂的姿勢', meaning: '雙手抱在胸前、雙腿盤起，整個人是關起來的；這不是難過的姿勢，是不想被打擾的姿勢。' },
{ element: '地上排成列的三杯', meaning: '已經有的三只杯子整齊排在地上，一只也沒倒；他什麼都沒失去，這正是無感最難解釋的地方。' },
{ element: '樹下的位置', meaning: '他坐在樹下，背靠著樹幹，四周是綠色的丘陵；環境是舒服的，畫面沒有給他任何抱怨的理由。' }
],
imageUpright: '樹罩在他頭上，雲中的手從側邊伸進來遞杯，三只杯排在最低的地面。他的視線往下落，遞來的那只杯懸在他視線之外的高度。',
imageReversed: '轉過來後樹翻到腳下，地上那三只杯浮到頭頂、杯口朝下，他倒懸著。雲中那隻手仍然伸著，仍然在他視線之外；旋轉沒有把杯子送近一點。',
},
five_of_cups: {
symbolism: '一個披著黑斗篷的人低頭站著，面前有三只杯子倒了，內容物流了出來。他身後還立著兩只沒有倒的杯子，他沒有回頭。遠處有一座橋通向一棟房子，中間隔著一條河。',
iconography: [
{ element: '倒下的三只杯', meaning: '三只杯倒在他面前，內容物流了出來；畫面把損失放在視線正前方，最容易看見的那個位置。' },
{ element: '身後直立的兩杯', meaning: '兩只杯子好好地站在他身後，一滴也沒灑；它們一直都在，只是不在他的視線裡，這是懸念。' },
{ element: '遮住臉的黑斗篷', meaning: '斗篷是黑的，把他整個人罩住，臉也看不見；這是哀悼的形式，畫面允許他穿著它站一會兒。' },
{ element: '通向房子的橋', meaning: '遠處有一座橋，過河就能到房子；路是通的，也是完好的，牌面沒有催他走，只是把它畫在那裡。' }
],
imageUpright: '三只傾倒的杯在他腳前，流出來的東西往下淌；兩只立著的杯在身後，同一條地面上。他低著頭，視線壓在最低處，橋退在遠方。',
imageReversed: '轉過來後那三只杯的杯口朝上，灑出去的東西改往上流；身後兩只立著的杯變成倒掛。他倒懸著，仍然背對那兩只杯，位置關係一點也沒鬆動。',
},
six_of_cups: {
symbolism: '一個孩子彎腰把一只裝著白花的杯子遞給另一個更小的孩子，兩人都在庭院裡。地上還立著幾只同樣插著花的杯子。背景是一棟老房子與一道矮牆，遠處有個大人正要走開。',
iconography: [
{ element: '種在杯裡的白花', meaning: '杯子裡插的是活的白花，不是水；回憶被畫成需要照顧的東西，它會謝，也可以繼續種下去。' },
{ element: '遞出去的那一杯', meaning: '大孩子彎下腰把杯遞給小的，動作是低下去的；給予在這張牌裡不帶條件，也不要求對方長大。' },
{ element: '正要走開的大人', meaning: '畫面邊上有個大人正要離開，背影已經出框；成人的世界被畫在庭院外，不參與，也不阻止。' },
{ element: '老房子與矮牆', meaning: '場景是一座圍著矮牆的老房子庭院；牆很矮，擋不住什麼，這份安全感靠的是地方，不是防衛。' }
],
imageUpright: '大孩子彎下腰，動作往下低；杯在兩人之間，花往上開。其餘的杯排在最低的地面，矮牆與老房子橫在後面，畫面很安靜。',
imageReversed: '轉過來後杯裡的白花從往上開變成往下垂，地上那幾只杯吊在天上、杯口朝下。彎腰遞出的動作變成往上舉，兩個孩子倒懸在庭院的上方。',
},
seven_of_cups: {
symbolism: '一個人背對觀者站著，面前的雲上浮著七只杯子，杯裡分別冒出人頭、蒙著布的發光形體、蛇、城堡、珠寶、桂冠與一條龍。他只是張著手，還沒有伸向任何一只。',
iconography: [
{ element: '全部浮在雲上的杯', meaning: '七只杯子沒有一只放在地上，全浮在雲裡；選項的共同點不是內容，是沒有一個踩在實地上。' },
{ element: '蒙著布的發光形體', meaning: '其中一只杯裡是罩著布、正在發光的形體，是唯一被遮住的；最誘人的那項連長什麼樣都沒讓你看。' },
{ element: '同一列的珠寶與蛇', meaning: '桂冠、珠寶、城堡與蛇、龍被放在同一排杯子裡，沒有分好壞；畫面拒絕替你標價。' },
{ element: '還沒伸出的手', meaning: '他張著手，卻沒有碰任何一只杯；動作停在想像的階段，這張牌畫的是還沒開始的那個瞬間。' }
],
imageUpright: '七只杯全浮在他上方的雲裡，排成兩層，他站在最低處背對觀者往上看。視線由下往上抬進雲堆，畫面裡沒有一只杯踩在地上。',
imageReversed: '轉過來後七只杯連同那團雲全部沉到畫面底部，杯口朝下，裡面的東西改成往下倒。他倒懸在頂端，那道往上仰望的視線因此變成朝下俯視。',
},
eight_of_cups: {
symbolism: '一個人拄著杖背對觀者往前走，正要離開。他身後留下八只杯子，排成兩層，最上層缺了一個位置。天上是一輪帶著人臉的月亮。他要走的方向是荒涼的山與水。',
iconography: [
{ element: '最上層缺的位置', meaning: '八只杯排成兩層，上層空了一格；缺的那一格就是他離開的理由，畫面把它畫成一個看得見的洞。' },
{ element: '沒有打翻的八杯', meaning: '杯子全好好地立著，沒有一只倒下；他不是逃離廢墟，是從還可以的東西旁邊走開，這才是難處。' },
{ element: '拄著杖的背影', meaning: '他背對觀者、拄著杖往前走，臉一樣看不見；畫面不解釋他的表情，只讓你看見他確實在動。' },
{ element: '天上的人臉月亮', meaning: '天上掛著一輪帶人臉的月亮，與月亮牌是同一顆；他走的是夜路，光不夠亮，但他還是出發了。' }
],
imageUpright: '八只杯疊成兩層立在畫面下緣，上層缺的那一格就在正中間。他背對觀者往畫面深處走，月亮掛在最高處，動線是由近往遠、由低往高。',
imageReversed: '轉過來後八只杯浮到頭頂、全部杯口朝下，月亮沉到最低處，他倒懸著往上走。缺的那一格還在原位，離開的路現在通向畫面底部的月光。',
},
nine_of_cups: {
symbolism: '一個人坐在矮凳上，雙手抱胸，臉上帶著笑。他身後有一道弧形的檯子，鋪著藍布，上面整齊排著九只杯子。他頭上戴著紅帽子。畫面裡沒有別人。',
iconography: [
{ element: '身後弧形的檯子', meaning: '九只杯整齊排在一道弧形的檯子上，鋪著藍布；成果被陳列起來，像在展示，不是在使用。' },
{ element: '雙手抱胸的坐姿', meaning: '他抱著胸坐在杯子前面，笑著，也擋著；同一個動作既是滿足，也是把東西圈在自己身後。' },
{ element: '畫面裡沒有別人', meaning: '整張牌只有他一個人，杯子卻有九只；享受被畫成一個人的事，這個安排本身留了一點餘味。' },
{ element: '頭上的紅帽子', meaning: '他戴著一頂紅帽，坐在矮凳上，位置比檯子低；場面很鋪張，人卻坐得很家常，滿足是踏實的。' }
],
imageUpright: '九只杯排在他身後那道弧形檯子上，位置高過他的頭，像一排展示。他坐在前排的最低處，抱著胸，畫面前重後輕，重量全在他身上。',
imageReversed: '轉過來後九只杯全部沉到畫面底部、杯口朝下，弧形檯子倒吊著，藍布往上翻。他倒懸在最上方，抱著胸，那排展示品現在像是隨時要掉出來。',
},
ten_of_cups: {
symbolism: '一對男女摟著彼此，各自舉起一隻手臂望向天空。天上有一道彩虹，十只杯子沿著彩虹排開。旁邊有兩個孩子牽著手在跳。遠處是一棟房子、樹與一條河。',
iconography: [
{ element: '沿著彩虹排開的杯', meaning: '十只杯不在桌上，掛在天上的彩虹裡；這份圓滿不是可以拿在手上的東西，它是天氣，不是財產。' },
{ element: '雨後才有的彩虹', meaning: '彩虹只在雨後出現，畫面把這個條件寫進了背景；這份和諧不是天生的，是一路走過來的。' },
{ element: '望向同一個方向', meaning: '兩人摟著彼此，卻都不看對方，各自舉手望向同一片天；圓滿在這裡是共享的視線，不是凝視。' },
{ element: '牽手跳舞的孩子', meaning: '旁邊兩個孩子牽著手在跳，沒有人在管他們；一組人在慶祝，一組人在玩，兩件事同時成立。' }
],
imageUpright: '彩虹橫跨整個上緣，十只杯掛在弧線上，兩個大人舉起手臂往上指、往上看。孩子在下方跳著，房子與河在中景，畫面由地往天開。',
imageReversed: '轉過來後彩虹沉到畫面底部，十只杯全部倒懸在弧線下方，那道拱橋變成一個碗。舉起的手臂改為朝下伸，一家人倒吊在自己那片天空的上面。',
},
page_of_cups: {
symbolism: '一名年輕人穿著印滿花朵的長袍站著，手裡端著一只杯子，杯裡探出一條魚，正抬頭看著他。他也低頭看著魚，表情有點意外。頭上戴著飄著長巾的帽子。身後是起伏的海面。',
iconography: [
{ element: '杯裡探出的魚', meaning: '魚從杯子裡冒出來，抬頭看著他；杯子裡本來不該有魚，畫面把靈感畫成一件不合理但無害的事。' },
{ element: '有點意外的表情', meaning: '他既沒有嚇到，也沒有把魚倒掉，只是有點意外；這個反應就是這張牌的態度，對怪東西保持好奇。' },
{ element: '印滿花朵的長袍', meaning: '長袍上開滿花，帽子上飄著長巾，整身都是柔軟的東西；這位侍者身上沒有一件是裝備。' },
{ element: '身後的海面', meaning: '背景是起伏的海，浪已經有點高了；他站在岸上端著一只杯，能接住的量與身後那片水不成比例。' }
],
imageUpright: '杯端在胸前，魚從杯口往上探，他低頭往下看，兩道視線在杯的高度相遇。他直立在畫面中央，身後的海橫在低處，浪只在背景起伏。',
imageReversed: '轉過來後杯口朝下，那條魚變成從杯裡往下垂，海翻到頭頂上方。他倒懸著，一人一魚對望的角度沒有改變，變的是魚隨時可能滑出那只杯。',
},
knight_of_cups: {
symbolism: '一名騎士騎著白馬緩緩前行，雙手捧著一只杯子往前遞。他的頭盔與腳跟都裝著翅膀。鎧甲外罩的長袍印著魚的紋樣。前方有一條小河，遠處是一片荒地與丘陵。',
iconography: [
{ element: '走著而不是跑的馬', meaning: '四張騎士裡他的馬走得最慢，四蹄都在地上；他不是去追什麼，是要把手上的東西送到。' },
{ element: '往前遞出的杯', meaning: '杯子被雙手捧著往前遞，不是自己喝；整個動作是一個邀請，接不接在畫面外的人手上。' },
{ element: '頭盔與腳跟的翅膀', meaning: '頭盔與腳跟都裝著小翅膀，是使者形象的常見配件；他被畫成帶訊息的人，不是打仗的人。' },
{ element: '前方的小河', meaning: '他要過的是一條小河，不是海；這位騎士的浪漫規模不大，但方向明確，畫面沒把它畫成壯舉。' }
],
imageUpright: '馬四蹄著地水平前行，杯往前平平地遞出，動勢是橫的，沒有一處往上或往下衝。小河橫在他前方的低處，整張牌的速度都被壓住了。',
imageReversed: '轉過來後人與馬倒懸，杯口朝下，那個往前遞的邀請變成從上方朝下伸。馬蹄離開了地面，河改在頭頂流；他仍在前進，只是不再有路面承著。',
},
queen_of_cups: {
symbolism: '她坐在水邊的石造王座上，雙手捧著一只有把手、蓋著蓋子的華麗聖杯，專注地看著它。王座上刻著貝殼與小天使的紋樣。她的腳邊是彩色的石子，海水就在旁邊。',
iconography: [
{ element: '蓋著蓋子的杯', meaning: '整副牌只有她的杯子有蓋，其他杯口都是開的；情感被關起來不是壓抑，是她知道裡面裝著什麼。' },
{ element: '專注凝視的視線', meaning: '她低頭盯著自己手上的杯，沒有看別人；理解自己的感覺，在這張牌裡是一件需要專注力的事。' },
{ element: '刻著貝殼的王座', meaning: '王座上刻著貝殼與小天使，形狀全是海的東西；她的位置是水做的，坐得住是因為她熟悉這片水。' },
{ element: '腳邊的彩色石子', meaning: '腳邊是被水磨過的彩色石子，海就在旁邊；她坐在水陸交界處，不下水，也沒有遠離。' }
],
imageUpright: '杯捧在她胸前偏高的位置，她低頭往下看它，視線與整個上半身都朝那只杯收攏。王座壓在畫面底部，海橫在旁邊，沒有一處在動。',
imageReversed: '轉過來後她倒懸著，杯口朝下，蓋子成了整只杯的最低點。王座的底座翻到最上方，腳邊那些彩色石子浮到頭頂；蓋著的杯裡什麼也沒有灑出來。',
},
king_of_cups: {
symbolism: '他坐在一個浮在海上的石座上，四周是起伏的浪。右手持一只杯子，左手握著權杖。頸上掛著魚形的墜飾。一邊的海裡有魚躍出，另一邊有船在浪中行駛。他的座位沒有濕。',
iconography: [
{ element: '浮在海上的石座', meaning: '石座浮在水面上，四周全是浪；穩定在這張牌裡是持續維持出來的狀態，不是踩在地上的結果。' },
{ element: '沒有濕的座位', meaning: '浪那麼大，他的座位卻是乾的；畫面用一個不合物理的細節說明，他在情緒裡，但沒有被淹到。' },
{ element: '一手杯一手權杖', meaning: '右手是杯、左手是權杖，感受與職權各一隻手；他不必為了做決定而關掉感覺，兩者可以並存。' },
{ element: '躍出水面的魚', meaning: '一邊的海裡有魚躍出，另一邊有船在浪裡走；同一片水同時養著活物與載著人，這是他管的東西。' }
],
imageUpright: '石座浮在浪的中間，他正坐其上，杯與權杖分踞左右。躍起的魚在一側、行駛的船在另一側，浪一直在動，只有他這一塊是靜的。',
imageReversed: '轉過來後整片海翻到他頭頂上方，石座吊在浪的下面，他倒懸著把杯口朝下。躍出水面的魚變成往下鑽，那艘船改在天上行駛，水淹過了整個上緣。',
},
ace_of_swords: {
symbolism: '一隻手從雲裡伸出，直握著一把向上的劍。劍尖穿過一頂金冠，冠上垂著橄欖枝與棕櫚葉。周圍飄著幾個小點。下方是一排嶙峋的山峰，天空是灰色的。',
iconography: [
{ element: '穿過金冠的劍尖', meaning: '劍是直的，尖端穿過一頂王冠；想清楚這件事被畫成一個貫穿的動作，冠沒有掉，但已被穿透。' },
{ element: '冠上的橄欖與棕櫚', meaning: '冠上垂著橄欖枝與棕櫚葉，兩者分別是和平與勝利的常見記號；同一頂冠上掛著兩種結局。' },
{ element: '直握向上的劍', meaning: '這隻手把劍握得筆直，沒有一點傾斜；四張王牌裡只有這一件東西有刃，遞出來時也可能割手。' },
{ element: '嶙峋的山峰', meaning: '劍的下方是一排尖銳的山，天空是灰的；清晰被放在最不舒服的地景上，看清楚不等於變得好過。' }
],
imageUpright: '劍直立在畫面正中，劍尖往上穿過金冠，冠上的橄欖枝與棕櫚葉往下垂。雲中的手握著劍柄，嶙峋的山峰壓在最底，動勢是往上刺。',
imageReversed: '轉過來後劍尖朝下，金冠掉到畫面底部，冠上的橄欖枝與棕櫚葉改為往上翹。往上刺的動勢變成往下插，山峰翻到頭頂，那隻手從地下遞劍。',
},
two_of_swords: {
symbolism: '一名女子矇著眼坐在石凳上，雙手交叉握著兩把劍，劍尖朝上。她身後是一片海，水面上散著幾塊礁石。天上掛著一彎新月。她的姿勢很穩，也很緊。',
iconography: [
{ element: '自己戴上的眼罩', meaning: '眼罩綁在她臉上，畫面沒有畫出任何人替她戴；她不是看不見，是選擇不看，這是整張牌的核心。' },
{ element: '交叉握著的兩劍', meaning: '兩把劍在胸前交叉，重量對稱，一邊也不偏；這個平衡不是和平，是兩股力氣互相抵住的結果。' },
{ element: '身後散著礁石的海', meaning: '她背後是一片散著礁石的海，全在視線之外；沒被看見的東西並沒有消失，它們就在身後。' },
{ element: '天上的一彎新月', meaning: '天上掛著新月，是光最少的時候；資訊不足被畫進了光線裡，這個僵局有一部分是時機造成的。' }
],
imageUpright: '兩把劍在胸前交叉往上舉，形成一個左右對稱的尖角，她正坐在中間。新月掛在高處，海橫在她背後的低處，整張牌釘得死死的。',
imageReversed: '轉過來後那兩把劍的尖端朝下，交叉的形狀倒扣成一個漏斗，新月沉到最底。她倒懸在石凳下方，左右對稱讓旋轉改不了什麼，僵局對得很整齊。',
},
three_of_swords: {
symbolism: '三把劍從正面刺穿一顆紅色的心。背景是灰色的天空，正在下雨，雲層很低。畫面裡沒有人，也沒有地面。整張牌只有這顆心、三把劍與雨。',
iconography: [
{ element: '正面刺穿的三劍', meaning: '三把劍從正面刺進心臟，角度對稱、位置整齊；連傷害都畫得很有秩序，這裡沒有混亂，只有清楚。' },
{ element: '沒有人的畫面', meaning: '整張牌沒有人物，也沒有地面；痛的時候世界確實只剩下痛，構圖把周圍的東西全部拿掉了。' },
{ element: '低雲與雨', meaning: '背景是低到壓下來的雲和一場雨；雨是會停的天氣，這是畫面唯一給出來的餘地。' },
{ element: '從外面刺入的劍', meaning: '劍是從外面刺進去的，不是從心裡長出來的；傷人的話有來源，那些話不是這顆心本來的樣子。' }
],
imageUpright: '一顆心懸在畫面正中，三把劍從正面對稱地刺進去，雨從上往下落。沒有人、沒有地面，構圖只剩這三樣，重量沒有可以壓的地方。',
imageReversed: '轉過來後雨變成往上飄，三把劍的角度上下對調，心臟本身幾乎看不出差別。這張牌沒有地面也沒有人，旋轉找不到東西可以翻，痛的形狀原封不動。',
},
four_of_swords: {
symbolism: '一個人平躺在石棺蓋上，雙手合十，像在休息。他身下橫著一把劍，牆上掛著另外三把，劍尖朝下。牆上有一扇彩繪玻璃窗。整個空間很安靜。',
iconography: [
{ element: '牆上的三把劍', meaning: '三把劍掛在牆上、劍尖朝下，離他很遠；他沒有丟掉劍，只是把它們收起來，這是休息不是投降。' },
{ element: '身下的第四把劍', meaning: '只有一把劍留在他身下，貼著身體；連躺著的時候他也帶著一把，這份休息是有戒備的。' },
{ element: '雙手合十的姿勢', meaning: '他平躺著、雙手合十，是墓像的姿勢，也是祈禱的姿勢；畫面故意讓休息與死亡長得很像。' },
{ element: '牆上的彩繪玻璃窗', meaning: '牆上有一扇彩繪玻璃窗，場景是教堂；他選的休息地點是有人看顧的地方，不是荒野。' }
],
imageUpright: '他水平躺在畫面下半部，三把劍掛在上方的牆上、劍尖朝下，指著他。窗在最高處，整張牌是一條橫線加三條垂直線，沒有一處在動。',
imageReversed: '轉過來後牆上那三把劍的劍尖朝上，從懸在他頭頂變成從下方頂著他。他翻到畫面上方仍舊平躺，身下那把劍改為懸在他上面，休息的姿勢沒有變。',
},
five_of_swords: {
symbolism: '一個人抱著三把劍站在前景，臉上帶著笑，回頭看著另外兩個人。那兩人低著頭走開，地上還躺著兩把劍。天空有撕裂狀的雲，遠處是水面。',
iconography: [
{ element: '抱在懷裡的三把劍', meaning: '他抱著三把劍，地上還躺著兩把；他拿到了大部分，但拿不完，這場勝利連清點都做不乾淨。' },
{ element: '低頭走開的兩人', meaning: '兩個人低著頭走開，沒有回頭；畫面把他們放在背景，卻讓他們佔了一半的空間，代價比戰利品重。' },
{ element: '撕裂狀的雲', meaning: '天上的雲被畫成一道道撕開的形狀；架打完了，天氣還沒好，這場勝利沒有讓任何事情平息。' },
{ element: '他臉上的笑', meaning: '只有他在笑，畫面裡沒有第二個人恭喜他；這個笑因此顯得孤單，也是這張牌最不舒服的地方。' }
],
imageUpright: '他佔住前景，抱著劍、回頭往畫面深處看；兩個離開的人被推到中景的低處。地上那兩把劍躺在最底，天上的雲被撕成一道道橫線。',
imageReversed: '轉過來後地上那兩把劍浮到天上，撕裂的雲沉到腳邊，三個人全部倒懸。他仍舊站在前景、仍舊在笑，走開的兩人也還在走；旋轉沒有改掉這場戲。',
},
six_of_swords: {
symbolism: '一艘小船上載著一名披斗篷的人與一個孩子，船頭插著六把劍。一名船夫站在船尾撐篙。船的一側水面有波紋，另一側平靜。他們正離開岸邊，往對岸去。',
iconography: [
{ element: '插在船頭的六劍', meaning: '六把劍插在船板上，跟著一起走；離開不代表把傷留在原地，畫面很誠實，它們就在同一條船上。' },
{ element: '一邊波紋一邊平靜', meaning: '船的一側水面有波紋、另一側是平的；同一艘船同時在兩種水裡，前方確實會比後方好走。' },
{ element: '船尾撐篙的船夫', meaning: '船是別人撐的，坐船的人不出力；這段路需要有人幫忙，這件事被畫得理所當然，沒有羞恥。' },
{ element: '披斗篷的大人與孩子', meaning: '船上是一個大人與一個孩子，都低著頭，臉看不見；畫面沒有替他們決定該有什麼心情。' }
],
imageUpright: '六把劍直立在船頭，船水平地往畫面一側移動，船夫的篙往下插進水裡。整張牌只有這條橫向的動線，重量壓在吃水的船底。',
imageReversed: '轉過來後六把劍從立在船頭變成朝下垂，船底朝天，整條船倒扣在水面上方。撐篙的動作改為往上推，水翻到頭頂，這段渡河失去了可以浮的東西。',
},
seven_of_swords: {
symbolism: '一個人抱著五把劍，踮著腳從營帳前溜走，回頭張望。另外兩把劍還插在地上。他臉上帶著笑。遠處的帳篷邊有人群，看起來沒有注意到他。',
iconography: [
{ element: '只拿得動的五把', meaning: '他抱著五把劍，還有兩把插在地上帶不走；迂迴的方法一次拿不完，這是策略本身的成本。' },
{ element: '踮著腳的走法', meaning: '他踮著腳走，動作放得很輕；這個姿勢很費力，也走不快，畫面把偷偷來的代價畫在腳上。' },
{ element: '回頭張望的動作', meaning: '他一邊走一邊回頭看；不管拿到什麼，這個動作都得一直做下去，這才是這張牌真正的重量。' },
{ element: '遠處沒發現的人群', meaning: '帳篷邊的人群還在，沒有人注意到他；畫面沒有畫出他被抓，也沒有畫出他逃掉，事情停在中間。' }
],
imageUpright: '他抱著劍往畫面一側走，臉卻轉回另一側，身體與視線拉成相反的兩個方向。剩下兩把劍插在腳邊的地上，遠處的人群橫排在後面。',
imageReversed: '轉過來後插在地上的兩把劍變成從天上垂下來，帳篷翻到頭頂，他倒懸著。踮腳的動作沒有了地面可以踮，那個一邊走一邊回頭的拉扯卻原封不動。',
},
eight_of_swords: {
symbolism: '一名女子被布條綁著、蒙著眼站在泥地上，八把劍插在她周圍。劍圍成的形狀並不封閉，前方是開的。她的腳沒有被綁。遠處的高地上立著一座城堡。',
iconography: [
{ element: '沒有封閉的劍陣', meaning: '八把劍插在她周圍，卻沒有圍成一圈，前方是開的；出口一直在畫面上，只是她蒙著眼。' },
{ element: '沒有被綁的腳', meaning: '布條綁的是上半身，兩隻腳是自由的；她可以走，畫面把這件事畫得很清楚，也沒有人在看守。' },
{ element: '腳下的泥地', meaning: '她站在泥裡，地是軟的、難走的；困住的感覺是真的，畫面沒有把她的處境說成一場錯覺。' },
{ element: '遠處高地的城堡', meaning: '城堡在遠方的高地上，離她很遠；有人在那裡，但沒有人下來，這件事她只能自己開始。' }
],
imageUpright: '八把劍直立在她左右，像一排柵欄，前方那一側是開的。她站在畫面正中的泥地上，重量壓在腳底，城堡退到最高處的遠方。',
imageReversed: '轉過來後八把劍從插在泥裡變成從上方倒吊，她也倒懸著，泥地翻到頭頂。劍陣缺口的位置一點也沒挪動，出口還在那裡，只是換到了另一邊。',
},
nine_of_swords: {
symbolism: '一個人在床上坐起來，雙手摀著臉。身後的牆上橫掛著九把劍，一把疊著一把。床沿刻著兩人相鬥的圖案，被子上有玫瑰與星象的方格花紋。四周是全黑的。',
iconography: [
{ element: '牆上橫掛的九劍', meaning: '九把劍全掛在牆上，一把也沒有碰到她；威脅在畫面裡是背景，不是傷口，這件事值得先說出來。' },
{ element: '摀著臉的雙手', meaning: '她坐起來，用雙手摀住臉，不看任何東西；深夜的焦慮是自己放大的，畫面裡沒有加害者。' },
{ element: '床沿的相鬥圖案', meaning: '床邊刻著兩個人相鬥的圖案，就在她躺的地方；連家具都在重複衝突，這房間沒有一處是空白的。' },
{ element: '被子上的方格花紋', meaning: '被子印著玫瑰與方格花紋，是溫暖的東西；她蓋著的東西沒有變壞，變的只是這個時間點。' }
],
imageUpright: '九把劍水平橫掛在她身後的牆上，一把疊一把往上排，佔滿整個上半部。她坐在下方，雙手摀臉往前傾，四周全黑，沒有別的東西。',
imageReversed: '轉過來後那九把劍整排沉到畫面底部，她連床一起翻到上方倒懸著。劍還是橫的，還是沒有碰到她；旋轉唯一改掉的，是那排劍不再壓在她頭上。',
},
ten_of_swords: {
symbolism: '一個人俯臥在地，背上插著十把劍，身上蓋著紅布。他的右手手指擺成某種手勢。天空是黑的，但遠處的地平線上透出一線金黃。前方是一片平靜的水。',
iconography: [
{ element: '背上的十把劍', meaning: '十把劍插在一個人背上，這個數量誇張到有點荒謬；最壞的已經發生完，不會再有第十一把。' },
{ element: '地平線上的金光', meaning: '遠處地平線透出一線金黃，天空還是黑的；那道光是牌面上真的畫著的東西，不是安慰的說法。' },
{ element: '右手的手勢', meaning: '他的右手手指擺成一個特定的手勢，畫面沒有解釋它；一個還在動的細節被留在結束的身體上。' },
{ element: '前方平靜的水', meaning: '身體前方是一片完全平靜的水，一點波紋也沒有；最激烈的畫面配上最靜的水，觸底確實安靜。' }
],
imageUpright: '身體水平躺在畫面下緣，十把劍垂直插進背裡，全部由上往下。黑色的天壓在上半部，地平線那道金光被夾在最遠、最低的位置。',
imageReversed: '轉過來後十把劍變成從下方往上插，身體浮到畫面上緣，黑色的天沉到腳下。地平線那道金光升到了上方，插滿劍的背朝天，人像是躺在光上面。',
},
page_of_swords: {
symbolism: '一名年輕人站在高地上，雙手握著劍舉在身前，身體轉向一側，像在張望。他的頭髮被風吹起，天上是翻捲的雲，遠處有一群鳥。腳下的草地也被風壓著。',
iconography: [
{ element: '舉在身前的劍', meaning: '劍被雙手舉在身前，沒有指向任何人；這是準備的姿勢，不是攻擊，他還在弄清楚狀況。' },
{ element: '被風吹起的頭髮', meaning: '頭髮、草地與雲全被同一陣風壓向同一邊；環境是動的，他站得住，機警在這裡是站姿問題。' },
{ element: '轉向一側的身體', meaning: '他的身體轉向側面，像在張望；侍者共同的動作是端詳自己的花色，寶劍的端詳方式就是四處看。' },
{ element: '遠處的一群鳥', meaning: '遠方天上有一群鳥，是畫面裡唯一自由移動的東西；訊息會飛，這個花色的東西不待在原地。' }
],
imageUpright: '劍舉在身前往上指，是畫面裡最直的一條線。頭髮、雲與草全被同一陣風壓向同一側，他站在高地上，重量往下扎進腳底。',
imageReversed: '轉過來後劍尖朝下，高地翻到頭頂，他倒懸著。頭髮與草還是被風壓向同一側，只是那陣風現在看起來是從地上往天上刮，鳥群改在腳下飛。',
},
knight_of_swords: {
symbolism: '一名騎士伏低身體，高舉著劍策馬狂奔，馬的四蹄幾乎離地。他的斗篷與馬鬃被風吹得往後飛。天上的雲被風扯成一道道，樹木全朝同一個方向彎。',
iconography: [
{ element: '幾乎離地的四蹄', meaning: '馬的四蹄幾乎全部離地，這在四張騎士裡是最快的；速度被畫到極限，構圖沒有留下煞車的空間。' },
{ element: '高舉向前的劍', meaning: '劍高舉著、指向前方，身體伏得很低；他把自己整個變成那把劍的方向，這是果斷，也是不看路。' },
{ element: '被風扯開的雲', meaning: '天上的雲被扯成一道道，樹全朝同一邊彎；整個環境都被他帶起的方向拉走，沒有一樣是靜的。' },
{ element: '伏低的身體', meaning: '他把身體壓到最低，貼著馬背；這個姿勢能減少阻力，也讓他的視野只剩正前方那一點。' }
],
imageUpright: '劍高舉在最前最上，身體壓到最低，馬幾乎離地：整張牌被拉成一條斜著往前衝的線。雲與樹全被扯向同一邊，沒有一樣是靜止的。',
imageReversed: '轉過來後人馬頭下腳上，高舉的劍改為朝下刺，那條往前衝的斜線變成往下栽。樹從天上倒垂，被風扯開的雲沉到最底；速度沒減，方向翻了。',
},
queen_of_swords: {
symbolism: '她坐在石造王座上，右手直舉著劍，左手往前微抬，掌心朝上。椅背刻著蝴蝶與小天使。她的斗篷上有雲的紋樣，頭頂上方有一隻鳥飛過。天空有幾朵雲。',
iconography: [
{ element: '直舉的劍', meaning: '劍舉得筆直，與正義牌那把是同一個角度；她的判斷不繞路，這個手勢在牌裡就是要求說清楚。' },
{ element: '攤開的左手', meaning: '右手舉劍，左手卻往前微抬、掌心朝上；一邊立界線、一邊留著門，這個組合就是她本人。' },
{ element: '椅背上的蝴蝶', meaning: '王座刻著蝴蝶，同樣的紋樣也刻在寶劍國王的椅背上；那是會蛻變的生物，這個花色反覆用它。' },
{ element: '斗篷上的雲紋', meaning: '她的斗篷印著雲的紋樣，頭上的天空也有雲；清明不是因為天晴，是因為她認得雲長什麼樣。' }
],
imageUpright: '劍垂直立在她的一側，是畫面最高也最直的東西；另一手往前攤開，掌心朝上。她正坐著，鳥從頭頂上方飛過，雲橫在背景。',
imageReversed: '轉過來後劍尖朝下，那隻攤開的手掌心朝地，接住東西的姿勢變成往下傾。王座的底座翻到最上，鳥改從她腳下飛過，雲仍舊橫著，位置對調。',
},
king_of_swords: {
symbolism: '他坐在石造王座上正面朝前，右手握劍微微斜舉，左手放在膝上。椅背刻著蝴蝶與新月。身穿藍袍，外罩紅斗篷。他身後的天空有幾朵雲，遠處是樹。',
iconography: [
{ element: '正面朝前的坐姿', meaning: '四張國王裡只有他完全正對觀者；沒有側身、沒有轉頭，這個姿勢說的是他不迴避任何人的目光。' },
{ element: '微微斜舉的劍', meaning: '劍是舉著的，但只斜舉一點；他隨時可以裁決，卻沒有揮出去，權力在克制的狀態下最有威嚴。' },
{ element: '放在膝上的左手', meaning: '右手握劍，左手安靜地放在膝上；一隻手在工作，一隻手在等，他不急著用完全部的力氣。' },
{ element: '椅背的蝴蝶與新月', meaning: '椅背刻著蝴蝶與新月，兩個都是會變的形狀；最講原則的這張牌，家具上刻的全是變動的東西。' }
],
imageUpright: '他完全正對觀者，坐得端正，劍只斜舉一點，斜線的幅度很小。左手安靜地放在膝上，畫面左右對稱，重量穩穩壓在王座的底部。',
imageReversed: '轉過來後劍尖朝下，放在膝上的左手變成吊在膝下，王座的底座頂到最上方。他仍舊正對著你，這張牌的左右對稱讓旋轉只翻掉了上下，別的沒動。',
},
ace_of_pentacles: {
symbolism: '一隻手從雲裡托出一枚刻著五芒星的金幣。下方是一座圍著矮牆的花園，白色的百合開著，一條小路穿過拱門通向遠方的山。拱門上爬滿了藤蔓。',
iconography: [
{ element: '幣上的五芒星', meaning: '硬幣上那顆五芒星是黃金黎明與偉特在十九世紀末之後加的；中世紀的牌上只有錢幣，沒有它。' },
{ element: '托著錢幣的手', meaning: '手把錢幣托在掌心，沒有塞給你；四張王牌都是這個姿勢，機會遞到面前，接不接是你的事。' },
{ element: '通過拱門的小路', meaning: '花園裡有一條小路穿過拱門通向遠山；種子要走完一段路才會變成收成，畫面把那段路畫出來了。' },
{ element: '圍著矮牆的花園', meaning: '這是一座有牆的花園，百合開著，藤蔓爬滿拱門；起點被畫成一個照顧過的地方，不是荒地。' }
],
imageUpright: '手托著錢幣浮在上方，掌心朝上，幣就穩穩擺在那裡。下方是花園、拱門與那條通向遠山的小路，視線從幣往下落進地面的風景。',
imageReversed: '轉過來後那隻手改從畫面下方伸出，掌心朝下，錢幣失去了托住它的手掌。花園與拱門翻到頭頂，通向遠山的路現在從天上垂下來。',
},
two_of_pentacles: {
symbolism: '一個人踮著腳，雙手各托一枚錢幣，兩枚之間繞著一條橫躺的無限符號帶子。他戴著一頂高帽子。身後的海面上有兩艘船，正在起伏很大的浪裡航行。',
iconography: [
{ element: '繞成無限符號的帶', meaning: '一條帶子把兩枚錢幣繞成橫躺的八字；那個形狀不是同時握住兩邊，是輪流經過，是節奏。' },
{ element: '踮起來的腳尖', meaning: '他踮著腳，整個人的重量壓在一點上；多工是撐得住的，但畫面很誠實地告訴你這件事很費力。' },
{ element: '浪裡的兩艘船', meaning: '身後的海很不平，兩艘船在大浪裡起伏；外在條件本來就在晃，他要接的東西也跟著在晃。' },
{ element: '頭上的高帽子', meaning: '他戴著一頂很高的帽子，形狀有點滑稽；畫面把這種疲於奔命畫得輕巧，但沒有把它畫成悲劇。' }
],
imageUpright: '兩枚錢幣一高一低，帶子繞成橫躺的八字把它們連起來，他踮著腳撐在最底。身後的海在起伏，船在浪裡上下，整張牌都在晃。',
imageReversed: '轉過來後那個八字幾乎沒有變，橫躺的形狀轉一圈還是橫躺的，兩枚錢幣只是高低對調。真正翻掉的是他：踮起的腳尖朝天，海浪蓋在頭上。',
},
three_of_pentacles: {
symbolism: '一名工匠站在矮凳上，手裡拿著工具，正在一座教堂的拱門上施工。拱門上嵌著三枚錢幣。兩個人站在他旁邊，一人拿著圖紙，另一人穿著僧袍，正在跟他討論。',
iconography: [
{ element: '站在矮凳上的工匠', meaning: '只有工匠站在凳子上，位置比另外兩人高；但他手上只有工具，全貌在拿圖紙的人那裡。' },
{ element: '拿著圖紙的人', meaning: '一個人手裡攤著圖紙，正在跟工匠說話；設計與施工被畫成兩個人，少一個這座拱門就蓋不起來。' },
{ element: '嵌在拱門上的三幣', meaning: '三枚錢幣已經嵌進拱門的石頭裡，成為建築的一部分；成果不在誰的口袋裡，在牆上。' },
{ element: '教堂的施工現場', meaning: '場景是一座還在蓋的教堂，這種建築要蓋很多年；畫面選了一個沒有人能獨力完成的工程。' }
],
imageUpright: '拱門與三枚錢幣佔住上半部，工匠站在凳上往上構，另外兩人站在地面仰頭。視線由下往上集中到那道還沒完工的拱門。',
imageReversed: '轉過來後拱門與那三枚錢幣沉到畫面底部，工匠倒懸著往下施工，矮凳吊在他上方。往上仰望的視線變成往下俯視，拱門倒扣成一道橋的形狀。',
},
four_of_pentacles: {
symbolism: '一個人坐著，頭上頂著一枚錢幣，雙手緊抱著胸前的一枚，雙腳各踩著一枚。他戴著王冠，身後是一座城市的輪廓。他的姿勢很緊，四枚錢幣都沒有離身。',
iconography: [
{ element: '頭上頂著的一枚', meaning: '一枚錢幣頂在頭上，靠平衡撐著；連思考的位置都被錢佔住了，這個姿勢一動它就會掉下來。' },
{ element: '雙腳踩住的兩枚', meaning: '兩枚錢幣被他踩在腳下，人因此站不起來也走不動；抱得太緊的代價被畫成行動能力。' },
{ element: '抱在胸前的一枚', meaning: '雙手緊緊環抱胸前那一枚，手臂沒辦法做別的事；畫面沒有罵他，只是把佔用畫了出來。' },
{ element: '身後的城市輪廓', meaning: '城市在他身後，那是人與人交易的地方；他背對著它坐，四枚錢幣一枚也沒有流動。' }
],
imageUpright: '四枚錢幣沿著他的身體排成一條垂直線：頭頂一枚、胸前一枚、雙腳各一枚。他正坐著，重量從頭壓到腳，城市橫在身後。',
imageReversed: '轉過來後頭頂那枚錢幣落到最底，腳下那兩枚浮到最上，靠平衡頂著的那一枚沒有東西托了。他倒懸著，抱在胸前的那一枚仍舊夾得死緊。',
},
five_of_pentacles: {
symbolism: '兩個人在雪中經過，一人拄著拐杖，一人光著腳裹著披巾。他們身旁的牆上是一扇亮著的彩繪玻璃窗，窗上有五枚錢幣。兩人都低著頭，沒有看那扇窗。',
iconography: [
{ element: '亮著的彩繪玻璃窗', meaning: '窗是亮的，就在他們身旁；畫面把幫助放在伸手可及的地方，這是整張牌最痛的一個安排。' },
{ element: '沒有抬頭的兩人', meaning: '兩個人都低著頭走過去，一次也沒有看那扇窗；太冷的時候人不抬頭，匱乏會先收走視野。' },
{ element: '光腳與拐杖', meaning: '一人拄著拐杖、一人光著腳踩在雪上；困頓被畫得很具體，它不是心情，是身體上的事。' },
{ element: '窗上的五枚錢幣', meaning: '五枚錢幣就在那扇窗上，屬於這張牌的花色；他們要的東西與他們錯過的東西是同一個。' }
],
imageUpright: '窗亮在他們頭頂上方，五枚錢幣排在窗上；兩個人在窗下的雪地水平走過，都低著頭。光在高處，人在低處，兩條線沒有交會。',
imageReversed: '轉過來後那扇亮著的窗沉到他們腳下，雪地翻到頭頂，兩人倒懸著走。低頭的方向變成朝天，窗與人的相對位置卻沒變，他們還是沒看那扇窗。',
},
six_of_pentacles: {
symbolism: '一個穿著體面的人站著，右手拿著天平，左手把錢幣遞給跪在腳邊的兩個人之一。兩人都伸著手。他的姿勢很穩，天平是水平的。畫面裡的錢幣共六枚，背景是一片淺色空地。',
iconography: [
{ element: '右手上的天平', meaning: '給錢的人另一隻手拿著天平；他同時在給予與衡量，慷慨與權力被畫在同一個人身上。' },
{ element: '跪著伸手的兩人', meaning: '兩個人都跪著、都伸著手，但錢只給了其中一個；畫面沒有說明理由，選擇權在站著的人那裡。' },
{ element: '站與跪的高度差', meaning: '一個站著、兩個跪著，高度差是構圖的重點；施與受的位置很明確，也因此隨時可能對調。' },
{ element: '水平的天平', meaning: '天平是平的，沒有偏向任何一邊；他的公正是真的，但拿著秤的那個人本身不在秤上。' }
],
imageUpright: '站著的人佔住上半部，天平舉在高處；兩個跪著的人在下方伸手往上接。錢幣從高處往低處落，畫面被切成上下兩層，高度差就是內容。',
imageReversed: '轉過來後跪著的兩人升到畫面上方，站著的那個沉到底部，天平倒吊著仍舊是平的。給予的方向從往下遞變成往上遞，施與受的高度整個對調。',
},
seven_of_pentacles: {
symbolism: '一個人拄著鋤頭站著，低頭看著身旁一叢長滿葉子的植物，上面掛著六枚錢幣，地上還有一枚。他的姿勢是停下來的。腳下是翻過的土，背景是淡色的天空。',
iconography: [
{ element: '拄著的鋤頭', meaning: '鋤頭沒有在用，被他拄著當支撐；工作暫停了，但工具還在手上，這是評估，不是放棄。' },
{ element: '藤上的六枚錢幣', meaning: '六枚錢幣掛在葉子上，還長在植物身上，一枚都還沒收；成果看得見，但此刻還不能拿。' },
{ element: '地上的那一枚', meaning: '有一枚錢幣掉在地上，脫離了那叢植物；已經有一點收穫，數量卻少到不足以回答他的問題。' },
{ element: '停下來的姿勢', meaning: '他站著不動，低頭看著作物；這張牌畫的就是那個停頓，懷疑本身也是農事的一部分。' }
],
imageUpright: '他站著往下看，鋤頭往下抵著土；六枚錢幣掛在藤葉上，位置比他的視線低。第七枚躺在最底的地上，整張牌的重量與視線都往下走。',
imageReversed: '轉過來後那叢植物從土裡長的變成從上方垂下來，六枚錢幣改成往上吊，掉在地上的那枚浮到了天上。鋤頭失去抵著的土，往下看變成往上望。',
},
eight_of_pentacles: {
symbolism: '一個人坐在矮凳上，手裡拿著槌子與鑿子，正在敲打一枚錢幣。他身旁的木柱上已經掛好完成的成品，腳邊還放著一枚，連同手上這枚合計八枚。他低著頭，全神貫注。遠處有一座城鎮。',
iconography: [
{ element: '手上的槌與鑿', meaning: '他手上是槌子與鑿子，正在敲一枚錢幣；這個花色的東西在別的牌裡是拿著的，這裡是做出來的。' },
{ element: '木架上掛好的成品', meaning: '完成的錢幣被掛在身旁的木架上，排得整整齊齊；進度是看得見的，這是重複勞動的獎賞。' },
{ element: '低著頭的專注', meaning: '他低著頭，眼睛只在手上那一枚；畫面把世界關掉了，精進的樣子就是暫時不去看別的東西。' },
{ element: '遠處的城鎮', meaning: '城鎮在遠方，他背對著它，也沒有在看；名聲與市場都還在，只是此刻不在他的工作台上。' }
],
imageUpright: '木柱立在他身旁，完成的錢幣一枚枚往上掛，成一條垂直的進度條。他低頭往下敲，視線壓在手上那枚，城鎮縮在遠處的高點。',
imageReversed: '轉過來後木柱從立著變成從上方倒吊，掛好的成品排列方向翻轉，變成由上往下數。他倒懸著敲，槌子改為往上打，腳邊那枚錢幣浮到了頭頂。',
},
nine_of_pentacles: {
symbolism: '一名女子站在葡萄園裡，穿著繡花的長袍，一手輕撫著葡萄藤，另一隻戴著手套的手上停著一隻蒙著頭罩的鳥。九枚錢幣結在藤上。身後是一棟房子與一道矮牆。',
iconography: [
{ element: '手上蒙頭罩的鳥', meaning: '鳥停在她自己戴著手套的手上，頭上罩著罩子；這份從容是管理出來的，連牠也被安排過。' },
{ element: '結在藤上的九幣', meaning: '九枚錢幣長在葡萄藤上，像果實一樣；財富被畫成種出來的東西，不是被誰交到手上的。' },
{ element: '繡花的長袍', meaning: '她穿著繡滿花的長袍站在自己的園子裡；這身衣服不是工作服，園子已經到了可以慢慢走的階段。' },
{ element: '身後的房子與矮牆', meaning: '園子有牆，房子在裡面；這是一個範圍明確的地方，獨處與孤單的差別就在這道牆是自己蓋的。' }
],
imageUpright: '葡萄藤從左右往中間圍，九枚錢幣結在藤上，高度大多在她的肩以上。鳥停在她抬起的手上，是畫面的高點；她站著，重量往下沉進園子。',
imageReversed: '轉過來後葡萄藤從上方垂下來，九枚錢幣改成往下吊，園子的地面翻到頭頂。那隻鳥仍舊站在她的手套上，只是連牠與她一起倒懸著。',
},
ten_of_pentacles: {
symbolism: '一位老人穿著繡滿花紋的長袍坐在前景，兩隻狗在他身邊。一對男女與一個孩子站在拱門下。十枚錢幣散佈在整個畫面上。背景是一座宅邸的門廊與旗幟。',
iconography: [
{ element: '坐在畫面邊上的老人', meaning: '老人坐在前景的角落，沒有人在看他；傳承的意思就是東西留下來，而人會被自然地走過。' },
{ element: '散佈整幅畫的十幣', meaning: '十枚錢幣不集中在任何人手上，散在整個畫面上；財富在這張牌裡是一個場域，不是一筆數目。' },
{ element: '拱門下的一家人', meaning: '一對男女與一個孩子站在拱門下講話；他們在門裡而不是門外，這個位置就是他們繼承到的東西。' },
{ element: '老人身邊的兩隻狗', meaning: '兩隻狗待在老人身邊，整個畫面只有牠們主動靠近他；被記得這件事，繪者給得很節制。' }
],
imageUpright: '十枚錢幣散在整張牌上，沒有集中在任何高度；老人坐在前景的角落，一家人站在中景的拱門下。畫面是平鋪的，沒有一個焦點。',
imageReversed: '這張牌轉過來沒什麼可翻的：十枚錢幣本來就散在各處，倒過來還是散在各處。變的只有拱門倒扣、旗幟朝下垂，以及所有人與狗全部倒懸。',
},
page_of_pentacles: {
symbolism: '一名年輕人站在草地上，雙手捧著一枚錢幣舉在面前，專注地看著它。他身邊是開著花的草地，遠處有翻過的田與一排樹。天空是淡黃色的。他的腳步是停著的。',
iconography: [
{ element: '捧在面前的錢幣', meaning: '他把錢幣舉到眼前雙手捧著，看得很近；四位侍者裡他離自己的花色最近，學習從盯著看開始。' },
{ element: '停住的腳步', meaning: '他站著沒有在走，畫面沒有給他任何動作；這位侍者的價值在待得住，不在跑得快。' },
{ element: '遠處翻過的田', meaning: '遠方的田已經翻過，等著播種；成果的條件都在，只是還沒開始，這張牌畫的是準備期。' },
{ element: '開著花的草地', meaning: '他腳下的草地開著花，環境是溫和的；學習的階段被畫得沒有壓力，這裡還不需要交出什麼。' }
],
imageUpright: '錢幣被雙手舉到眼前，是畫面的視覺中心，也是唯一被抬高的東西。他站著不動，重量平均落在兩腳，遠處的田橫在他身後的高度。',
imageReversed: '轉過來後他整個倒懸，草地翻到頭頂，捧著的錢幣變成從掌心下方吊著。手托的姿勢沒有了托的作用，那枚幣隨時可以掉出去，凝視卻沒有改變。',
},
knight_of_pentacles: {
symbolism: '一名騎士坐在一匹站著不動的黑馬上，右手捧著一枚錢幣，低頭看著它。他的頭盔與馬頭上都插著綠葉。腳下是一片翻過的田。這是整副牌裡唯一停著不動的騎士。',
iconography: [
{ element: '完全靜止的黑馬', meaning: '四張騎士裡只有這匹馬四蹄著地、完全不動；靜止是這位騎士的能力，不是他的缺點。' },
{ element: '捧在手上的錢幣', meaning: '他低頭看著手上那枚錢幣，像侍者一樣端詳；他在行動的位階上，卻保留了學習的姿勢。' },
{ element: '頭盔上的綠葉', meaning: '頭盔與馬頭上都插著綠葉，這是他身上唯一的裝飾；連炫耀他都選了會長的東西。' },
{ element: '腳下翻過的田', meaning: '他停在一片已經翻過的田上；工作做完了，馬才停下來，這個順序就是這張牌的內容。' }
],
imageUpright: '馬四蹄全部踩在地上，人正坐著，錢幣捧在手心。畫面沒有任何斜線，也沒有任何東西離地；重量從馬蹄直直落進翻過的田裡。',
imageReversed: '轉過來後馬變成四蹄朝天，田翻到頭頂，那份踩得最穩的靜止一下子沒有了地面。捧在掌心的錢幣改由手掌下方吊著，頭盔上的綠葉朝下垂。',
},
queen_of_pentacles: {
symbolism: '她坐在雕著山羊、水果與小天使的王座上，雙手捧著一枚錢幣，低頭看著它。四周開滿玫瑰，頭頂上方垂著花藤。腳邊的草地上有一隻兔子。背景是一片開闊的田野。',
iconography: [
{ element: '低頭看著的錢幣', meaning: '她低頭看的是手上的錢幣，不是遠方；把眼前的生活照顧好，在這張牌裡就是全部的抱負。' },
{ element: '腳邊的兔子', meaning: '草地上有一隻兔子，那是繁殖得很快的動物；畫面用一隻小動物把豐饒放在她腳邊，不必說出口。' },
{ element: '王座上的山羊頭', meaning: '王座刻著山羊、水果與小天使；山羊的雕刻是十九世紀末星象對應留下的記號，屬於偉特這一系。' },
{ element: '頭頂垂下的花藤', meaning: '頭上垂著花藤，四周開滿玫瑰，她整個人被植物包住；這份滋養不是她發出來的，是她住在裡面。' }
],
imageUpright: '花藤從上方垂下來罩住她，玫瑰從兩側往中間圍，錢幣捧在膝前的低處。她低頭往下看，兔子蹲在最底，整張牌都往內、往下收。',
imageReversed: '轉過來後頭頂那串花藤變成從地上往上長，兔子浮到天上，她倒懸在中間。捧在手裡的錢幣改為吊在掌下，低頭凝視的方向翻成了往上仰。',
},
king_of_pentacles: {
symbolism: '他坐在雕著公牛頭的王座上，右手握著權杖，左手托著一枚錢幣。長袍上印滿葡萄藤的紋樣，腳邊四周長著葡萄與花。身後是他的城堡。他的姿態很放鬆。',
iconography: [
{ element: '印滿葡萄藤的長袍', meaning: '長袍上爬滿葡萄藤的紋樣，腳邊也長著真的葡萄；穿的與長的是同一種東西，財富是養出來的。' },
{ element: '王座上的公牛頭', meaning: '王座刻著公牛頭，這個對應出自十九世紀末黃金黎明一系的星象配置，不是中世紀原有的內容。' },
{ element: '放鬆的姿態', meaning: '他坐得很鬆，沒有挺直，也沒有握緊任何東西；不必再證明什麼，這是這張牌畫出來的富足。' },
{ element: '身後的城堡', meaning: '城堡在他身後，是蓋好的、完整的；成果不在他手上舉著，而是在背後撐著他。' }
],
imageUpright: '葡萄從腳邊往上長，幾乎把王座的下半部埋住；他坐得很鬆，權杖斜著往上，錢幣托在另一手。城堡撐在身後，重量落在最底那叢葡萄上。',
imageReversed: '轉過來後腳邊那叢葡萄變成從上方垂下來，他倒懸在中間，城堡跟著上下顛倒。權杖斜著朝下，托在掌心的錢幣改由手下吊著，養出來的東西全懸空了。',
}
};
const suitLore = {
'Major Arcana': {
title: '大阿卡納',
origin: '二十二張大牌是義大利人的新增。塔羅在十五世紀上半葉出現於義大利北部的米蘭、費拉拉、波隆那一帶，是一種叫 trionfi 或 tarocchi 的吃墩紙牌遊戲，玩家在四個花色之外加進一組能吃掉任何花色的王牌。王牌題材取自當時的凱旋遊行與道德寓意畫傳統：死亡、命運之輪、四樞德、最後審判，都是那個年代天天看得到的圖像。現存最早的成套牌是十五世紀中葉的 Visconti-Sforza。大牌本是紙牌遊戲的王牌，不是任何祕傳體系的殘篇。'
},
'Wands': {
title: '權杖',
origin: '權杖這個花色其實是一根馬球桿。紙牌大約在一三七零年代從馬穆魯克埃及傳入歐洲，馬穆魯克牌有四個花色：杯、錢幣、劍，以及馬球桿。歐洲人不打馬球，也看不懂那是什麼，於是把馬球桿改畫成棍棒或權杖。這是塔羅與埃及之間唯一真實的關聯，而且只關於五十六張小牌，跟二十二張大牌無關。至於權杖等於火這套元素對應，出自一八八八年成立的黃金黎明協會，是十九世紀末的系統化工程，不是中世紀就有的東西。偉特牌裡權杖上冒出的新芽，也屬於這條晚近的脈絡。'
},
'Cups': {
title: '聖杯',
origin: '杯子是四個花色裡最沒有變過的一個。紙牌約在一三七零年代從馬穆魯克埃及傳進歐洲，馬穆魯克牌的四個花色是杯、錢幣、劍與馬球桿；歐洲人把不熟悉的馬球桿改成了權杖，杯與錢幣則幾乎原樣留下來。這是塔羅與埃及唯一真實的關聯，而且只牽涉五十六張小牌。聖杯等於水、對應情感的這套說法，來自一八八八年成立的黃金黎明協會，屬於十九世紀末的整理，不是牌本來就帶著的意思。在那之前，這些杯子只是打牌時的一個花色而已。'
},
'Swords': {
title: '寶劍',
origin: '劍在馬穆魯克牌裡就已經是劍。紙牌約在一三七零年代從馬穆魯克埃及傳入歐洲，四個花色是杯、錢幣、劍與馬球桿，其中只有馬球桿因為歐洲人不打馬球而被改成權杖。所以寶劍是這副牌最老的元素之一，只是它當時什麼也不象徵，就是一個花色。寶劍等於風、對應思維與言語的說法，是一八八八年成立的黃金黎明協會系統化的結果，屬於十九世紀末的產物。偉特牌把寶劍畫成整副牌裡最痛的一組場景，則是 Pamela Colman Smith 的詮釋。'
},
'Pentacles': {
title: '錢幣',
origin: '這個花色本來就叫錢幣，畫的是硬幣。馬賽牌裡它叫 deniers，也就是錢的意思；紙牌約在一三七零年代從馬穆魯克埃及傳入歐洲時，杯、錢幣、劍、馬球桿這四個花色裡，錢幣幾乎原樣被留了下來。把它改稱五芒星（Pentacle）並在硬幣上畫一顆五芒星，是黃金黎明與偉特在十九世紀末之後做的改動，中世紀的牌上並沒有這個符號。錢幣等於土、對應物質與現實的說法同樣出自黃金黎明。所以你手上這個花色，名字比圖案老得多。'
}
};
const numberLore = {
'Ace': '一是花色的純粹形態，還沒有被任何情境稀釋。偉特牌把每張一號牌都畫成從雲中伸出的一隻手，握著這個花色的本體遞出來：機會在那裡，但你得自己接。要提醒的是，小牌的數字意涵是黃金黎明以降才建立的系統，早期的牌上，一就只是一張一。',
'Two': '二是關係的開始：有了第二個東西，才有了對照、選擇與張力。權杖二在遠眺、聖杯二在對飲、寶劍二在僵持、錢幣二在拋接，四張都在處理同一件事，兩者之間怎麼辦。這套數字含義是十九世紀末黃金黎明以降的整理，不是中世紀的傳統。',
'Three': '三是二的產出：兩件事碰在一起之後，長出了第三樣東西。所以三號牌多半關於初步的成果與擴張，船出港了、朋友聚齊了、工匠上工了，也包括寶劍三那種被說破之後的痛。這層數字邏輯來自黃金黎明一系的整理，是十九世紀末的產物。',
'Four': '四是穩定，也是停下來。四個角撐起一個結構，事情因此站得住；但站得太久，結構就變成了框。所以四號牌一邊給你慶祝、休息與安全感，一邊問你是不是抱得太緊了。這套數字含義出自黃金黎明以降的系統，早期牌上的小牌只是計數用的。',
'Five': '五打破了四的穩定，所以五號牌全都不太舒服：競爭、失落、匱乏、勝之不武。但它們也全都是活的，衝突代表事情還在動，才有改變的餘地。五不是懲罰，是結構被戳破後的那段亂。這層數字邏輯屬於黃金黎明以降的建構，不是牌本來的內容。',
'Six': '六是五之後的緩和：亂過一輪，事情重新找到了流動的方式。所以六號牌談的多半是給予與接受、認可與過渡，一種帶著和解意味的前進。它不是完美，是可以呼吸了。要記得，小牌的數字含義是十九世紀末黃金黎明以降才建立的系統。',
'Seven': '七是評估的位置：走到這裡，該問值不值得了。所以七號牌常常在停頓，耐心等收成、盤點幻想、守住陣地、盤算迂迴。它是最需要你自己動腦的一個數字。這套數字對應來自黃金黎明一系的整理，屬於十九世紀末的產物，並非中世紀傳統。',
'Eight': '八是動起來：不管是杖在天上飛、鑿子在敲、人在離開，還是繩子綁著卻其實可以走，八號牌都在說事情已經上了軌道，速度不再由你決定。它談專注與推進。順帶一提，這層數字含義是黃金黎明以降建立的系統，早期的小牌只是花色加數字。',
'Nine': '九是幾乎到了，也是最累的時候。所以九號牌常常帶著一種撐著的姿態：帶傷戒備、深夜焦慮、獨自享受、心願成真。它們都在終點前一步，滋味卻各不相同。這套數字邏輯出自十九世紀末黃金黎明一系的整理，不是牌本來就有的意思。',
'Ten': '十是滿了，滿到溢出來，所以十號牌總是有點過量：太多責任、太多劍、太圓滿、太多要傳下去的東西。滿的另一面是這一輪結束了，下一張一號牌就在後面等著。要記得，小牌的數字含義是黃金黎明以降的產物，不是中世紀的東西。'
};
const courtLore = {
'Page': '侍者是還在學的人。他們共同的姿勢是端詳手上那個花色的東西：看著杖、看著杯裡的魚、握著劍張望、捧著錢幣出神。他們代表新的開始、好奇心，以及不怕承認自己是新手的能力。宮廷牌也常常就是指某個具體的人，或你此刻扮演的角色。',
'Knight': '騎士是行動中的人，四位的速度完全不同：權杖騎士的馬揚起前蹄，寶劍騎士全速狂奔，聖杯騎士緩緩前行，錢幣騎士的馬乾脆站著不動。這種對比就是宮廷牌的用意，同一個位階，四種把事情做完的方式。它可以指一個人，也可以指你的做事風格。',
'Queen': '皇后是把那個花色內化了的人。四位都坐著，都在看手上的東西：權杖皇后握著杖與向日葵，聖杯皇后凝視蓋著蓋子的杯，寶劍皇后舉著劍卻攤開另一手，錢幣皇后低頭看著錢幣。她們的力量來自理解，不是佔有；影響人的方式是接住，不是推動。',
'King': '國王是把那個花色用到外面去的人。他們都坐在王座上，也都握著權杖或劍：對外負責、做決定、承擔後果。皇后向內理解，國王向外施行，這是偉特牌裡兩者最清楚的分工。逆位的國王通常不是失去了能力，是忘了權力需要良知與傾聽同行。'
};
const deckHistory = [
{
title: '它本來是一種紙牌遊戲',
text: '塔羅在十五世紀上半葉出現於義大利北部，是一種叫 trionfi 或 tarocchi 的吃墩紙牌遊戲：在四個花色外加進一組能吃掉任何花色的王牌。英文的 trump 就是從 trionfi 來的。最早的成套牌是十五世紀中葉的 Visconti-Sforza，一四九一年的 Sola Busca 是最早的完整七十八張牌。'
},
{
title: '四個花色來自馬穆魯克埃及',
text: '紙牌約在一三七零年代從馬穆魯克埃及傳入歐洲。馬穆魯克牌有四個花色：杯、錢幣、劍，以及馬球桿。歐洲人不打馬球，就把馬球桿改畫成棍棒與權杖，其餘三個大致留下。這是塔羅與埃及之間唯一真實的關聯，而且只關於五十六張小牌；二十二張大牌是義大利人另外加的，題材取自當時的凱旋遊行與道德寓意畫傳統。順帶一提：權杖宮廷牌背景那幾座金字塔是一九零九年繪者的裝飾筆觸，剛好呼應了當時流行的埃及風，不是埃及淵源的證據。'
},
{
title: '占卜是 350 年後才有的事',
text: '占卜遲至十八世紀末才出現，比牌本身晚了約三百五十年。一七八一年，Antoine Court de Gébelin 宣稱塔羅是古埃及托特之書的殘篇，這說法毫無證據，是他自己的發明，卻成了埃及起源說的源頭。之後 Etteilla 把占卜系統化，一八八八年成立的黃金黎明協會再把星象、元素與卡巴拉整套定案。'
},
{
title: '我們手上這副牌',
text: '偉特牌一九零九年十二月由倫敦 Rider 公司出版，A. E. Waite 構思、Pamela Colman Smith 繪製，兩人都是黃金黎明成員。PCS 把五十六張小牌全部畫成有情節的場景，這是它成為現代標準的主因。她只拿一筆固定酬勞，之後數十年幾乎沒有署名。此版已進入公共領域，本 app 用的就是它。'
}
];
function getCardLore(card) {
if (!card || !card.suit) return [];
const out = [];
const l = cardLore[card.nameKey];
if (l && l.origin) out.push({ title: '這張牌的源流', text: l.origin });
const s = suitLore[card.suit];
if (s) out.push({ title: s.title + '的由來', text: s.origin });
if (card.suit !== 'Major Arcana') {
const n = courtLore[card.number] || numberLore[card.number];
if (n) out.push({ title: '這個位階的意涵', text: n });
}
return out;
}

;
/* deck.js */
const deckSuitSymbols = {
'Wands': '<path d="M0 -26 L0 26 M0 -12 L-9 -21 M0 -4 L9 -13"/><circle cx="0" cy="-26" r="2.5" fill="currentColor" stroke="none"/>',
'Cups': '<path d="M-19 -24 L19 -24 C19 -2 8 6 0 6 C-8 6 -19 -2 -19 -24 M0 6 L0 24 M-14 24 L14 24"/>',
'Swords': '<path d="M0 -28 L0 12 M-4 -19 L0 -28 L4 -19 M-13 12 L13 12 M0 12 L0 23"/><circle cx="0" cy="26.5" r="3.5"/>',
'Pentacles': '<circle cx="0" cy="0" r="24"/><path d="M0 -17.6 L10.3 14.2 L-16.7 -5.4 L16.7 -5.4 L-10.3 14.2 Z"/>'
};
const deckRankIndex = { 'Ace': 1, 'Two': 2, 'Three': 3, 'Four': 4, 'Five': 5, 'Six': 6, 'Seven': 7, 'Eight': 8, 'Nine': 9, 'Ten': 10, 'Page': 11, 'Knight': 12, 'Queen': 13, 'King': 14 };
const deckPipGrid = {
1: { s: 3.0, pts: [[150, 260]] },
2: { s: 1.5, pts: [[150, 158], [150, 362]] },
3: { s: 1.3, pts: [[150, 120], [150, 260], [150, 400]] },
4: { s: 1.25, pts: [[105, 158], [195, 158], [105, 362], [195, 362]] },
5: { s: 1.12, pts: [[105, 150], [195, 150], [150, 260], [105, 370], [195, 370]] },
6: { s: 1.1, pts: [[105, 130], [195, 130], [105, 260], [195, 260], [105, 390], [195, 390]] },
7: { s: 1.0, pts: [[105, 130], [195, 130], [82, 260], [150, 260], [218, 260], [105, 390], [195, 390]] },
8: { s: 1.0, pts: [[105, 105], [195, 105], [105, 208], [195, 208], [105, 311], [195, 311], [105, 414], [195, 414]] },
9: { s: 0.92, pts: [[82, 130], [150, 130], [218, 130], [82, 260], [150, 260], [218, 260], [82, 390], [150, 390], [218, 390]] },
10: { s: 0.85, pts: [[105, 90], [195, 90], [105, 203], [195, 203], [105, 317], [195, 317], [105, 430], [195, 430], [150, 146], [150, 373]] }
};
const deckCourtCrowns = {
'Page': '<path d="M128 146 L172 146 M166 146 C172 128 182 126 186 132"/>',
'Knight': '<path d="M128 158 L172 158 M150 140 C168 112 188 118 190 136"/>',
'Queen': '<path d="M126 140 L174 140 M126 140 Q134 112 142 138 Q150 110 158 138 Q166 112 174 140"/>',
'King': '<path d="M124 140 L176 140 M124 140 L132 112 L142 136 L150 104 L158 136 L168 112 L176 140"/>'
};
function deckSymbolAt(suit, x, y, s) {
return `<g transform="translate(${x} ${y}) scale(${s})" stroke-width="${(5 / s).toFixed(2)}">${deckSuitSymbols[suit]}</g>`;
}
function deckPipArt(suit, rank) {
const grid = deckPipGrid[rank];
if (!grid) return null;
const pips = grid.pts.map(([x, y]) => deckSymbolAt(suit, x, y, grid.s)).join('');
const rays = rank === 1
? '<path d="M221 189 L239 171 M79 189 L61 171 M79 331 L61 349 M221 331 L239 349"/>'
: '';
return pips + rays;
}
function deckCourtArt(suit, rankName) {
const crown = deckCourtCrowns[rankName];
if (!crown) return null;
const robe = rankName === 'King'
? '<path d="M106 204 L194 204 L216 336 L84 336 Z"/>'
: '<path d="M112 204 L188 204 L208 336 L92 336 Z"/>';
return `<g transform="translate(0 36)">${crown}<circle cx="150" cy="164" r="24"/>${robe}${deckSymbolAt(suit, 150, 268, 0.85)}</g>`;
}
const deckMajorArt = {
fool: '<circle cx="222" cy="96" r="18"/><path d="M248 96 L256 96 M240.4 77.6 L246 72 M222 70 L222 62 M203.6 77.6 L198 72 M196 96 L188 96 M203.6 114.4 L198 120 M222 122 L222 130 M240.4 114.4 L246 120"/><circle cx="150" cy="208" r="16"/><path d="M150 224 L146 286 M148 240 L120 262 M150 238 L190 206"/><circle cx="197" cy="199" r="11"/><path d="M186 209 L192 203"/><path d="M146 286 L166 340 L170 396 M146 286 L128 342 L120 398 M40 400 L200 400 L200 490 M212 486 L250 486 M200 428 L186 442 M200 454 L188 466"/><circle cx="94" cy="386" r="7"/><path d="M88 391 C79 384 68 388 59 399 M59 399 L49 390 M84 395 L86 404"/>',
star: '<path d="M150 70 L150 230 M70 150 L230 150 M107 107 L193 193 M193 107 L107 193"/><circle cx="150" cy="150" r="11"/><path d="M62 76 L62 92 M54 84 L70 84 M238 76 L238 92 M230 84 L246 84 M56 208 L56 220 M50 214 L62 214 M244 208 L244 220 M238 214 L250 214"/><g transform="translate(129 347) rotate(-35)"><path d="M-16 -20 L16 -20 C16 -4 8 4 0 4 C-8 4 -16 -4 -16 -20 Z"/></g><path d="M104 340 C94 366 100 388 94 412 M64 436 Q94 424 124 436 T184 436 T236 436 M96 460 Q116 452 136 460"/>',
moon: '<path fill="currentColor" stroke="none" fill-rule="evenodd" d="M102 132 a48 48 0 1 0 96 0 a48 48 0 1 0 -96 0 M128 132 a34 34 0 1 0 68 0 a34 34 0 1 0 -68 0"/><path d="M118 212 L118 224 M150 216 L150 228 M182 212 L182 224 M44 296 L94 296 M52 296 L52 402 M86 296 L86 402 M206 296 L256 296 M214 296 L214 402 M248 296 L248 402 M60 448 Q90 436 120 448 T180 448 T240 448"/>',
sun: '<circle cx="150" cy="210" r="62"/><path d="M224 210 L254 210 M214.1 173 L227.9 165 M187 145.9 L202 119.9 M150 136 L150 120 M113 145.9 L98 119.9 M85.9 173 L72.1 165 M76 210 L46 210 M85.9 247 L72.1 255 M113 274.1 L98 300.1 M150 284 L150 300 M187 274.1 L202 300.1 M214.1 247 L227.9 255 M50 420 Q80 408 110 420 T170 420 T230 420 M70 450 Q100 440 130 450 T190 450"/>',
tower: '<path d="M105 180 L105 420 M195 180 L195 420 M90 420 L210 420 M105 250 L195 250 M105 320 L195 320 M135 420 L135 382 A15 15 0 0 1 165 382 L165 420"/><path d="M116 174 C112 158 122 152 118 138 M150 172 C146 156 156 150 152 136 M184 174 C180 158 190 152 186 138"/><path d="M238 52 L192 118 L216 124 L166 196 M92 224 L76 250 M212 234 L228 260"/>',
death: '<path d="M110 110 L186 430 M110 110 C168 72 232 86 258 136 M110 110 C166 88 220 98 244 128 M258 136 L244 128 M132 208 L154 194 M156 302 L178 288"/><g transform="translate(86 450) rotate(-12) scale(1.6)" stroke-width="3.13"><path d="M-20 0 L-13 -14 L-6 0 L0 -16 L6 0 L13 -14 L20 0 Z"/></g><path d="M56 454 L244 454 M188 454 A28 28 0 0 1 244 454 M216 416 L216 406 M196 424 L189 415 M236 424 L243 415"/>',
magician: `<path d="M108 80 C108 58 142 58 150 80 C158 102 192 102 192 80 C192 58 158 58 150 80 C142 102 108 102 108 80 Z"/><circle cx="150" cy="126" r="4" fill="currentColor" stroke="none"/><path d="M150 130 L150 230"/><circle cx="150" cy="234" r="4" fill="currentColor" stroke="none"/><path d="M60 320 L240 320 M75 320 L75 400 M225 320 L225 400"/>${deckSymbolAt('Wands', 81, 294, 0.55)}${deckSymbolAt('Cups', 127, 294, 0.55)}${deckSymbolAt('Swords', 173, 294, 0.55)}${deckSymbolAt('Pentacles', 219, 294, 0.55)}`,
high_priestess: '<path d="M62 100 L108 100 M70 100 L70 420 M100 100 L100 420 M62 420 L108 420 M192 100 L238 100 M200 100 L200 420 M230 100 L230 420 M192 420 L238 420"/><path fill="currentColor" stroke="none" fill-rule="evenodd" d="M122 140 a28 28 0 1 0 56 0 a28 28 0 1 0 -56 0 M138 140 a19 19 0 1 0 38 0 a19 19 0 1 0 -38 0"/><path d="M118 290 L182 290 L182 324 L118 324 Z M150 290 L150 324"/>',
empress: '<circle cx="150" cy="190" r="46"/><path d="M150 236 L150 300 M120 268 L180 268"/><path d="M75 340 L75 470 M75 344 C74 336 79 332 85 335 M75 360 L68 349 M75 360 L82 349 M75 374 L68 363 M75 374 L82 363 M75 388 L68 377 M75 388 L82 377 M75 402 L68 391 M75 402 L82 391"/><path d="M225 340 L225 470 M225 344 C226 336 221 332 215 335 M225 360 L232 349 M225 360 L218 349 M225 374 L232 363 M225 374 L218 363 M225 388 L232 377 M225 388 L218 377 M225 402 L232 391 M225 402 L218 391"/><path d="M55 470 L245 470"/>',
emperor: '<path d="M96 190 L110 130 L130 172 L150 118 L170 172 L190 130 L204 190 L96 190"/><path d="M100 240 L200 240 M100 240 L100 320 M200 240 L200 320 M85 320 L215 320 M100 320 L100 382 M200 320 L200 382 M80 382 L220 382"/><circle cx="150" cy="286" r="11"/><path d="M150 275 L150 263 M143 269 L157 269"/>',
hierophant: '<path d="M70 200 A80 80 0 0 1 230 200 M70 200 L70 260 M230 200 L230 260"/><path d="M150 160 L150 400 M118 220 L182 220 M110 268 L190 268 M102 316 L198 316"/><path d="M110 420 L190 420 M95 448 L205 448"/>',
lovers: '<circle cx="150" cy="100" r="20"/><path d="M178 100 L188 100 M169.8 80.2 L176.9 73.1 M150 72 L150 62 M130.2 80.2 L123.1 73.1 M122 100 L112 100 M130.2 119.8 L123.1 126.9 M150 128 L150 138 M169.8 119.8 L176.9 126.9"/><circle cx="105" cy="240" r="18"/><circle cx="195" cy="240" r="18"/><path d="M105 258 L105 350 M195 258 L195 350 M105 290 L146 312 M195 290 L154 312 M105 350 L88 420 M105 350 L120 420 M195 350 L180 420 M195 350 L212 420"/><path d="M150 322 C144 310 128 312 128 326 C128 340 150 352 150 352 C150 352 172 340 172 326 C172 312 156 310 150 322 Z" fill="currentColor" stroke="none"/>',
chariot: '<path d="M90 220 L210 220 L210 330 L90 330 Z M90 220 L90 140 M210 220 L210 140 M80 140 A150 150 0 0 1 220 140"/><path d="M150 255 L163 275 L150 295 L137 275 Z M118 163 L123 170 L118 177 L113 170 Z M150 152 L155 160 L150 168 L145 160 Z M182 163 L187 170 L182 177 L177 170 Z"/><circle cx="105" cy="375" r="32"/><path d="M105 343 L105 407 M73 375 L137 375"/><circle cx="195" cy="375" r="32"/><path d="M195 343 L195 407 M163 375 L227 375"/><path d="M60 430 L240 430"/>',
strength: '<path d="M108 110 C108 88 142 88 150 110 C158 132 192 132 192 110 C192 88 158 88 150 110 C142 132 108 132 108 110 Z"/><circle cx="150" cy="300" r="70"/><path d="M220 300 L232 300 M210.6 265 L221 259 M185 239.4 L191 229 M150 230 L150 218 M115 239.4 L109 229 M89.4 265 L79 259 M80 300 L68 300 M89.4 335 L79 341 M115 360.6 L109 371 M150 370 L150 382 M185 360.6 L191 371 M210.6 335 L221 341"/><circle cx="150" cy="300" r="42"/><path d="M124 270 L114 246 L142 259 M176 270 L186 246 L158 259"/><circle cx="135" cy="290" r="3.5" fill="currentColor" stroke="none"/><circle cx="165" cy="290" r="3.5" fill="currentColor" stroke="none"/><path d="M144 301 L156 301 L150 309 Z M150 309 L150 316 M150 316 Q143 323 137 318 M150 316 Q157 323 163 318 M128 305 L106 300 M128 312 L107 315 M172 305 L194 300 M172 312 L193 315"/>',
hermit: '<path d="M200 104 L200 400 M200 104 C200 90 214 90 216 102 L216 122"/><path d="M204 126 L228 126 L224 168 L208 168 Z M216 136 L216 158 M206 147 L226 147"/><path d="M35 462 L115 352 L165 428 M135 462 L205 372 L262 442"/>',
wheel_of_fortune: '<circle cx="150" cy="240" r="95"/><circle cx="150" cy="240" r="58"/><circle cx="150" cy="240" r="14"/><path d="M150 226 L150 182 M150 254 L150 298 M164 240 L208 240 M136 240 L92 240 M159.9 230.1 L191 199 M140.1 230.1 L109 199 M159.9 249.9 L191 281 M140.1 249.9 L109 281"/><path d="M150 145 L150 131 M245 240 L259 240 M150 335 L150 349 M55 240 L41 240"/>',
justice: '<path d="M150 80 L150 300 M144 96 L150 80 L156 96 M122 300 L178 300 M150 300 L150 330"/><circle cx="150" cy="336" r="6"/><path d="M60 180 L240 180 M60 180 L44 240 M60 180 L76 240 M44 240 A16 16 0 0 0 76 240 M240 180 L224 240 M240 180 L256 240 M224 240 A16 16 0 0 0 256 240"/><path d="M80 430 L220 430"/>',
hanged_man: '<path d="M70 90 L230 90 M150 90 L150 118"/><path d="M150 118 L150 212 M150 212 L188 196 L164 152 M150 212 L150 300 M150 288 L116 322 M150 288 L184 322"/><circle cx="150" cy="334" r="17"/><path d="M138 362 L132 373 M150 367 L150 378 M162 362 L168 373"/>',
temperance: `<g transform="translate(100 160) rotate(35) scale(1.1)" stroke-width="4.55">${deckSuitSymbols['Cups']}</g><g transform="translate(200 310) scale(1.1)" stroke-width="4.55">${deckSuitSymbols['Cups']}</g><path d="M132 150 C160 191 168 243 196 284"/><circle cx="222" cy="100" r="20"/><path d="M222 88 L209 111 L235 111 Z"/><path d="M50 420 L250 420 M60 450 Q90 440 120 450 T180 450 T240 450"/>`,
devil: `<g transform="translate(150 170) rotate(180) scale(2.1)" stroke-width="2.38">${deckSuitSymbols['Pentacles']}</g><path d="M108 130 C100 112 104 100 116 94 M192 130 C200 112 196 100 184 94"/><circle cx="150" cy="240" r="12"/><circle cx="150" cy="266" r="12"/><path d="M141 274 L100 384 M159 274 L204 384"/><circle cx="95" cy="400" r="18"/><circle cx="205" cy="400" r="18"/><path d="M95 418 L95 440 M205 418 L205 440 M60 440 L240 440"/>`,
judgement: '<path d="M48 118 A22 22 0 0 1 92 106 A26 26 0 0 1 144 110 A18 18 0 0 1 168 124"/><path d="M118 124 L196 178 L240 187 M116 132 L194 186 L216 223 M240 187 A26 26 0 0 1 216 223"/><circle cx="112" cy="120" r="5"/><path d="M240 222 L258 236 M232 244 L246 262 M220 258 L230 278"/><circle cx="150" cy="360" r="15"/><path d="M150 375 L150 420 M150 385 L124 356 M150 385 L176 356 M105 445 L195 445 M105 445 L105 472 M195 445 L195 472"/>',
world: `<ellipse cx="150" cy="250" rx="85" ry="140"/><ellipse cx="150" cy="250" rx="70" ry="124"/><circle cx="150" cy="190" r="13"/><path d="M150 203 L150 280 M150 215 L122 192 M150 215 L178 192 M150 280 L130 330 M150 280 L172 326"/>${deckSymbolAt('Wands', 55, 70, 0.6)}${deckSymbolAt('Cups', 245, 70, 0.6)}${deckSymbolAt('Swords', 55, 430, 0.6)}${deckSymbolAt('Pentacles', 245, 430, 0.6)}`
};
function getCardArt(card, extraClass = '') {
if (!card || !card.suit) return null;
let inner = null;
if (card.suit === 'Major Arcana') {
inner = deckMajorArt[card.nameKey] || null;
} else if (deckSuitSymbols[card.suit] && deckRankIndex[card.number]) {
const rank = deckRankIndex[card.number];
inner = rank <= 10 ? deckPipArt(card.suit, rank) : deckCourtArt(card.suit, card.number);
}
if (!inner) return null;
return `<svg class="card-image line-art${extraClass ? ' ' + extraClass : ''}" viewBox="0 0 300 519" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;
}

;
/* state.js */
let lastReadingData = {};
const ORIENTATION_LEGACY = { '正位': 'upright', '逆位': 'reversed' };
function normalizeOrientation(v) {
if (v === 'upright' || v === 'reversed') return v;
return ORIENTATION_LEGACY[v] || 'upright';
}
const SPREAD_NAME_LEGACY = {
'單張牌指引': 'spread.single.name', '是非指引': 'spread.yesno.name', '聖三角': 'spread.three.name',
'身心靈牌陣': 'spread.mbs.name', '抉擇之路': 'spread.path.name', '週運勢': 'spread.weekly.name',
'月運勢': 'spread.monthly.name', '季度展望': 'spread.quarterly.name', '年度主題': 'spread.yearly.name',
'新月啟程': 'spread.newmoon.name', '滿月釋放': 'spread.fullmoon.name', '關係牌陣': 'spread.relationship.name',
'對方心意': 'spread.feelings.name', '愛情十字': 'spread.loveCross.name', '衝突化解': 'spread.conflict.name',
'二擇一': 'spread.twoChoice.name', '優劣分析': 'spread.prosCons.name', '目標達成牌陣': 'spread.goal.name',
'職涯發展': 'spread.career.name', '財富流動': 'spread.wealth.name', '脈輪牌陣': 'spread.chakra.name',
'四元素牌陣': 'spread.elements.name', '自我探索': 'spread.selfDiscovery.name', '陰影功課': 'spread.shadow.name',
'夢境解析': 'spread.dream.name', '凱爾特十字': 'spread.celtic.name', '馬蹄鐵牌陣': 'spread.horseshoe.name',
'生命之樹': 'spread.treeOfLife.name', '占星十二宮': 'spread.astroHouses.name',
'未知牌陣': 'spread.unknown'
};
function normalizeSpreadName(v) {
if (typeof v !== 'string' || !v) return 'spread.unknown';
return SPREAD_NAME_LEGACY[v] || v;
}
function migrateLegacyPositions(reading, drawnCards) {
const spread = (typeof spreads !== 'undefined') ? spreads[reading.spreadType] : null;
if (!spread || !Array.isArray(spread.positions)) return drawnCards;
if (spread.positions.length !== drawnCards.length) return drawnCards;
return drawnCards.map((c, i) => (
typeof c.position === 'string' && !c.position.startsWith('spread.')
? { ...c, position: spread.positions[i] }
: c
));
}
function normalizeReading(r, i) {
if (!r || typeof r !== 'object' || !r.bottomCard || typeof r.bottomCard !== 'object') return null;
const drawnCards = Array.isArray(r.drawnCards)
? r.drawnCards.filter(c => c && typeof c === 'object')
.map(c => ({ ...c, orientation: normalizeOrientation(c.orientation) }))
: [];
if (!drawnCards.length) return null;
const id = Number(r.id);
const bottomPos = r.bottomCard.position;
return {
...r,
drawnCards: migrateLegacyPositions(r, drawnCards),
bottomCard: {
...r.bottomCard,
orientation: normalizeOrientation(r.bottomCard.orientation),
position: bottomPos === '底牌' ? 'spread.bottom' : (bottomPos || 'spread.bottom')
},
id: Number.isFinite(id) ? id : Date.now() + i,
timestamp: Number(r.timestamp) || Date.now(),
spreadName: normalizeSpreadName(r.spreadName),
favorite: !!r.favorite,
tags: Array.isArray(r.tags) ? r.tags.map(String) : [],
note: typeof r.note === 'string' ? r.note : ''
};
}
function loadHistory() {
try {
const parsed = JSON.parse(localStorage.getItem('readingHistory') || '[]');
return Array.isArray(parsed) ? parsed.map(normalizeReading).filter(Boolean) : [];
} catch {
return [];
}
}
function saveHistory() {
localStorage.setItem('readingHistory', JSON.stringify(readingHistory));
}
let readingHistory = loadHistory();
const TAB_NAMES = ['reading', 'history', 'statistics', 'database', 'learn', 'settings'];
let currentTab = localStorage.getItem('tab') || 'reading';
if (!TAB_NAMES.includes(currentTab)) currentTab = 'reading';
let currentEditingId = null;
let visualStyle = localStorage.getItem('visualStyle') || 'text';
if (!['text', 'api', 'line'].includes(visualStyle)) visualStyle = 'text';
let historyFilters = {
spread: '',
tag: '',
favorite: false
};

;
/* dom.js */
const resultsEl = document.getElementById('results');
const readBtn = document.getElementById('readButton');
const readBtnText = document.getElementById('readButtonText');
const shareBtn = document.getElementById('shareButton');
const themeToggle = document.getElementById('themeToggle');
const iconSun = document.getElementById('iconSun');
const iconMoon = document.getElementById('iconMoon');
const spreadTypeEl = document.getElementById('spreadType');
const spreadInfoEl = document.getElementById('spreadInfo');
const showSpreadInfoCheckbox = document.getElementById('showSpreadInfo');
const showShortcutsCheckbox = document.getElementById('showShortcuts');

;
/* render.js */
function setVisualStyle(style) {
visualStyle = style;
localStorage.setItem('visualStyle', style);
document.querySelectorAll('input[name="visualStyle"]').forEach(radio => {
radio.checked = radio.value === style;
});
refreshCardVisuals();
}
function refreshCardVisuals() {
if (lastReadingData.drawnCards) renderResults(lastReadingData);
if (typeof renderDailyCard === 'function') renderDailyCard();
if (typeof renderProfileCards === 'function') renderProfileCards();
if (typeof renderCardDatabase === 'function') renderCardDatabase();
if (typeof renderLearnStage === 'function') renderLearnStage();
}
function cardThumb(card, extraClass = '') {
if (!card) return null;
if (visualStyle === 'text') return null;
if (visualStyle === 'line') {
return typeof getCardArt === 'function' ? getCardArt(card, extraClass) : null;
}
const jpg = getCardImageUrl(card);
if (!jpg) return null;
const { w, h } = cardImageSize(card);
return `<picture>
<source srcset="${getCardImageUrl(card, 'avif')}" type="image/avif">
<source srcset="${getCardImageUrl(card, 'webp')}" type="image/webp">
<img class="card-image${extraClass ? ' ' + extraClass : ''}" src="${jpg}" alt=""
width="${w}" height="${h}" loading="lazy" decoding="async">
</picture>`;
}
document.querySelectorAll('input[name="visualStyle"]').forEach(radio => {
radio.addEventListener('change', (e) => {
if (e.target.checked) {
setVisualStyle(e.target.value);
showToast(t('toast.visualStyle', { name: e.target.nextElementSibling.textContent }));
}
});
});
function handleImageError(img, cardName) {
const container = img.closest('.card-image-container') || img.parentElement;
container.innerHTML = `
<div class="card-image-failed">
<div class="card-image-failed-name">${escapeHTML(cardName)}</div>
<div class="card-image-failed-note">${escapeHTML(t('card.imageFailed'))}</div>
</div>
`;
}
function renderCard(card, isBottom = false, anim = 'slide-in', idx = 0) {
const meaning = cardMeanings[card.nameKey];
const photo = visualStyle === 'api' ? getCardImageUrl(card) : null;
const lineArt = visualStyle === 'line' && typeof getCardArt === 'function'
? getCardArt(card, card.orientation === 'reversed' ? 'reversed' : '')
: null;
const visualClass = (photo || lineArt) ? 'visual-api' : '';
const size = photo ? cardImageSize(card) : null;
return `
<div class="card ${isBottom ? 'bottom' : ''} ${visualClass} ${anim}"
tabindex="${idx === 0 ? 0 : -1}" data-keynav-item role="button" data-suit="${card.suit}"
onclick="openCardModal('${card.nameKey}', '${card.orientation}')">
${photo ? `
<div class="card-image-container">
<div class="card-image-loading">${escapeHTML(t('card.loading'))}</div>
<!-- 🔴 <picture> 是按 type 挑來源，不是按「檔案在不在」挑：.avif 若 404，瀏覽器
不會退回下一層，直接破圖。三種格式必須並存（convert-images.py 產生）。
順序＝優先序，瀏覽器由上往下挑第一個認得的。實測 15.5MB → 7.7MB -->
<picture>
<source srcset="${getCardImageUrl(card, 'avif')}" type="image/avif">
<source srcset="${getCardImageUrl(card, 'webp')}" type="image/webp">
<img class="card-image${card.orientation === 'reversed' ? ' reversed' : ''}"
src="${photo}"
alt="${escapeHTML(card.name)}"
width="${size.w}" height="${size.h}"
style="opacity: 0;"
onload="this.style.opacity='1'; this.closest('.card-image-container').querySelector('.card-image-loading').style.display='none';"
onerror="handleImageError(this, '${escapeHTML(card.name)}')"/>
</picture>
</div>
<div class="card-info">
` : ''}
${lineArt ? `
<div class="card-image-container">${lineArt}</div>
<div class="card-info">
` : ''}
<div class="card-position">${escapeHTML(t(card.position))}</div>
<div class="card-content">
<div class="card-name">${escapeHTML(card.name)}</div>
<div class="card-orientation">
<span class="ori-icon ${card.orientation === 'reversed' ? 'reversed' : ''}"></span>
${escapeHTML(t(orientationNames[card.orientation] || card.orientation))}
</div>
</div>
${meaning ? `<div class="card-keywords">${meaning.keywords.map(escapeHTML).join(' · ')}</div>` : ''}
<div class="card-footer">
<span>${escapeHTML(card.number)}</span>
<span>${escapeHTML(card.englishName)}</span>
</div>
${(photo || lineArt) ? '</div>' : ''}
</div>
`;
}
function openCardModal(nameKey, orientation) {
const card = fullTarotCards.find(c => c.nameKey === nameKey);
const m = cardMeanings[nameKey];
if (!card || !m) return;
document.getElementById('cardModalTitle').textContent = card.name;
document.getElementById('cardModalSub').textContent = t('card.sub', {
en: card.englishName,
suit: t(suitNames[card.suit] || card.suit),
number: card.number
});
const modalArt = document.getElementById('cardModalArt');
if (modalArt) {
modalArt.innerHTML = cardThumb(card) || '';
modalArt.dataset.suit = card.suit;
}
document.getElementById('cardModalKeywords').innerHTML = m.keywords.map(k => `<span class="tag">${escapeHTML(k)}</span>`).join('');
document.getElementById('cardModalUpright').textContent = cardMeaningText(card, 'upright');
document.getElementById('cardModalReversed').textContent = cardMeaningText(card, 'reversed');
const meaningNote = document.getElementById('cardModalMeaningNote');
if (meaningNote) meaningNote.classList.toggle('hidden', cardClass(card) === 'major');
document.getElementById('meaningUpright').classList.toggle('active', orientation === 'upright');
document.getElementById('meaningReversed').classList.toggle('active', orientation === 'reversed');
document.getElementById('imageUpright').classList.toggle('active', orientation === 'upright');
document.getElementById('imageReversed').classList.toggle('active', orientation === 'reversed');
renderCardModalContext(nameKey);
renderCardModalLore(card, nameKey);
setCardModalSeg('meaning');
document.getElementById('cardModal').classList.add('show');
}
function renderCardModalLore(card, nameKey) {
const lore = (typeof cardLore !== 'undefined') ? cardLore[nameKey] : null;
const fillLoreBlock = (blockId, textId, text) => {
const block = document.getElementById(blockId);
const el = document.getElementById(textId);
if (!block || !el) return;
if (text) {
el.textContent = text;
block.classList.remove('hidden');
} else {
el.textContent = '';
block.classList.add('hidden');
}
};
fillLoreBlock('cardModalSymbolismBlock', 'cardModalSymbolism', lore && lore.symbolism);
fillLoreBlock('cardModalDepthBlock', 'cardModalDepth', lore && lore.depth);
const mt = (typeof mofaTerms !== 'undefined') ? mofaTerms[nameKey] : null;
const mBlock = document.getElementById('cardModalMofaBlock');
const mList = document.getElementById('cardModalMofaTerms');
if (mBlock && mList) {
const mrow = (labelKey, list) => (list && list.length) ? `
<div class="waite-row">
<span class="waite-ori">${escapeHTML(t(labelKey))}</span>
<span class="waite-words">${list.map(escapeHTML).join('・')}</span>
</div>` : '';
const mhtml = mt ? mrow('waite.terms.upright', mt.up) + mrow('waite.terms.reversed', mt.rv) : '';
mList.innerHTML = mhtml;
mBlock.classList.toggle('hidden', !mhtml);
}
const waitePair = (en) => {
const zh = (typeof waiteTermZh === 'function') ? waiteTermZh(en) : null;
return zh
? `<span class="waite-pair">${escapeHTML(zh)}<span class="waite-en">${escapeHTML(en)}</span></span>`
: `<span class="waite-pair"><span class="waite-en waite-en-only">${escapeHTML(en)}</span></span>`;
};
const waiteRow = (labelKey, list) => (list && list.length) ? `
<div class="waite-row">
<span class="waite-ori">${escapeHTML(t(labelKey))}</span>
<span class="waite-words">${list.map(waitePair).join('')}</span>
</div>` : '';
const fillWaiteBlock = (blockId, listId, data) => {
const block = document.getElementById(blockId);
const list = document.getElementById(listId);
if (!block || !list) return;
const html = data
? waiteRow('waite.terms.upright', data.upright) + waiteRow('waite.terms.reversed', data.reversed)
: '';
list.innerHTML = html;
block.classList.toggle('hidden', !html);
};
fillWaiteBlock('cardModalWaiteBlock', 'cardModalWaiteTerms',
(typeof waiteTerms !== 'undefined') ? waiteTerms[nameKey] : null);
fillWaiteBlock('cardModalWaiteAddBlock', 'cardModalWaiteAddTerms',
(typeof waiteAdditional !== 'undefined') ? waiteAdditional[nameKey] : null);
fillLoreBlock(
'cardModalCourtBlock', 'cardModalCourt',
(typeof cardClass === 'function' && cardClass(card) === 'court' &&
typeof waiteCourtLooks !== 'undefined' && waiteCourtLooks[card.suit])
? t(waiteCourtLooks[card.suit]) + '　—　' + t('court.looks.note')
: null
);
fillLoreBlock('imageUpright', 'cardModalImageUpright', lore && lore.imageUpright);
fillLoreBlock('imageReversed', 'cardModalImageReversed', lore && lore.imageReversed);
const iconBlock = document.getElementById('cardModalIconBlock');
const iconList = document.getElementById('cardModalIconList');
if (iconBlock && iconList) {
const icons = (lore && Array.isArray(lore.iconography)) ? lore.iconography : [];
iconList.innerHTML = icons.map(i => `
<div class="icon-row">
<span class="icon-element">${escapeHTML(i.element || '')}</span>
<p class="icon-meaning">${escapeHTML(i.meaning || '')}</p>
</div>
`).join('');
iconBlock.classList.toggle('hidden', !icons.length);
}
const sysBlock = document.getElementById('cardModalSystemsBlock');
const sysList = document.getElementById('cardModalSystemsList');
if (sysBlock && sysList) {
const groups = (typeof cardSystems === 'function') ? (cardSystems(card) || []) : [];
sysList.innerHTML = groups.map(g => `
<div class="systems-group">
<div class="systems-source">${escapeHTML(t(g.source))}</div>
${g.rows.map(r => `
<div class="icon-row">
<span class="icon-element">${escapeHTML(t(r.label))}</span>
<p class="icon-meaning">${escapeHTML(t(r.value, r.vars))}</p>
</div>`).join('')}
${g.note ? `<p class="waite-terms-note">${escapeHTML(t(g.note))}</p>` : ''}
</div>
`).join('');
sysBlock.classList.toggle('hidden', !groups.length);
}
const list = document.getElementById('cardModalLoreList');
if (!list) return;
const blocks = (typeof getCardLore === 'function') ? (getCardLore(card) || []) : [];
list.innerHTML = blocks.length
? blocks.map(b => `
<div class="lore-entry">
<div class="lore-title">${escapeHTML(b.title || '')}</div>
<p class="lore-text">${escapeHTML(b.text || '')}</p>
</div>
`).join('')
: `<div class="lore-empty">${escapeHTML(t('card.lore.empty'))}</div>`;
}
const cardModalSegPanels = { meaning: 'cardSegMeaning', icon: 'cardSegIcon', context: 'cardSegContext', lore: 'cardSegLore' };
function setCardModalSeg(name) {
if (!cardModalSegPanels[name]) return;
document.querySelectorAll('#cardModalSeg .seg-item').forEach(b => {
const on = b.dataset.seg === name;
b.classList.toggle('active', on);
b.setAttribute('aria-selected', on);
b.tabIndex = on ? 0 : -1;
});
Object.keys(cardModalSegPanels).forEach(key => {
const panel = document.getElementById(cardModalSegPanels[key]);
if (panel) panel.classList.toggle('hidden', key !== name);
});
}
function renderCardModalContext(nameKey) {
const section = document.getElementById('cardModalContextSection');
if (!section) return;
const card = (typeof fullTarotCards !== 'undefined') ? fullTarotCards.find(c => c.nameKey === nameKey) : null;
const ctx = (typeof cardContexts !== 'undefined') ? cardContexts[nameKey] : null;
if (!ctx || !card || typeof contextText !== 'function') {
section.classList.add('hidden');
return;
}
section.classList.remove('hidden');
const yesno = ctx.yesno || {};
const tendency = yesno.tendency || '';
const cls = tendencyNames[tendency] ? tendency : 'unclear';
const rows = [
{ icon: '💕', label: t('card.context.love'), text: contextText(card, 'love') },
{ icon: '💼', label: t('card.context.career'), text: contextText(card, 'career') },
{ icon: '💰', label: t('card.context.wealth'), text: contextText(card, 'wealth') },
{ icon: '🌿', label: t('card.context.wellbeing'), text: contextText(card, 'wellbeing') },
{
icon: '⚖️',
label: t('card.context.yesno'),
html: `<span class="yesno-badge ${cls}">${escapeHTML(t(tendencyNames[tendency] || tendency))}</span>${escapeHTML(yesno.note || '')}`
}
];
document.getElementById('cardModalContextList').innerHTML = rows.map(r => `
<div class="context-row">
<span class="context-icon">${r.icon}</span>
<span class="context-label">${escapeHTML(r.label)}</span>
<p class="context-text">${r.html || escapeHTML(r.text || '')}</p>
</div>
`).join('');
document.getElementById('cardModalReflection').textContent = contextReflection(card);
const ctxNote = document.getElementById('cardModalContextNote');
if (ctxNote) ctxNote.classList.toggle('hidden', cardClass(card) === 'major');
}
const cardModalSegEl = document.getElementById('cardModalSeg');
if (cardModalSegEl) {
cardModalSegEl.addEventListener('click', (e) => {
const btn = e.target.closest('.seg-item');
if (!btn || !cardModalSegEl.contains(btn)) return;
setCardModalSeg(btn.dataset.seg);
});
}
function closeCardModal() {
document.getElementById('cardModal').classList.remove('show');
}
function renderDailyCard() {
const el = document.getElementById('dailyCard');
if (!el) return;
const now = new Date();
const daySeed = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
const rng = mulberry32(daySeed);
const card = shuffle(fullTarotCards, rng)[0];
const orientation = rng() > 0.5 ? 'upright' : 'reversed';
const m = cardMeanings[card.nameKey];
const dailyArt = cardThumb(card);
el.innerHTML = `
${dailyArt ? `<div class="daily-card-art" data-suit="${card.suit}">${dailyArt}</div>` : ''}
<div class="daily-card-info">
<div class="daily-card-label">${escapeHTML(t('reading.daily.title', { m: now.getMonth() + 1, d: now.getDate() }))}</div>
<div class="daily-card-name">${escapeHTML(card.name)}<span class="daily-card-ori">${escapeHTML(t(orientationNames[orientation] || orientation))}</span></div>
${m ? `<div class="daily-card-keywords">${m.keywords.map(escapeHTML).join('・')}</div>` : ''}
</div>
<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M8.72 4.72a.75.75 0 011.06 0l6.75 6.75a.75.75 0 010 1.06l-6.75 6.75a.75.75 0 11-1.06-1.06L14.94 12 8.72 5.78a.75.75 0 010-1.06z" clip-rule="evenodd"/></svg>
`;
const open = () => openCardModal(card.nameKey, orientation);
el.onclick = open;
el.onkeydown = (e) => {
if (e.key === 'Enter' || e.key === ' ') {
e.preventDefault();
open();
}
};
el.classList.remove('hidden');
}

;
/* insight.js */
const INSIGHT_RANK_KEY = {
'Ace': 'ace', 'Two': 'two', 'Three': 'three', 'Four': 'four', 'Five': 'five',
'Six': 'six', 'Seven': 'seven', 'Eight': 'eight', 'Nine': 'nine', 'Ten': 'ten',
'Page': 'page', 'Knight': 'knight', 'Queen': 'queen', 'King': 'king'
};
function insightRecurrence(cards) {
const out = [];
if (typeof waiteRecurrence === 'undefined') return out;
['natural', 'reversed'].forEach(ori => {
const table = waiteRecurrence[ori];
if (!table) return;
const byRank = {};
cards.forEach(c => {
const isRev = c.orientation === 'reversed';
if ((ori === 'reversed') !== isRev) return;
const rank = INSIGHT_RANK_KEY[c.number];
if (rank) (byRank[rank] = byRank[rank] || []).push(c);
});
Object.keys(byRank).forEach(rank => {
const n = Math.min(byRank[rank].length, 4);
if (n < 2 || !table[rank] || !table[rank][n]) return;
out.push({ ori, rank, n, cards: byRank[rank].slice(0, n) });
});
});
out.sort((a, b) => b.n - a.n);
return out;
}
const INSIGHT_DECK = 78;
const INSIGHT_MAJORS = 22;
const INSIGHT_PER_SUIT = 14;
const INSIGHT_ALPHA = 0.05;
function insightChoose(n, k) {
if (k < 0 || k > n) return 0;
k = Math.min(k, n - k);
let r = 1;
for (let i = 0; i < k; i++) r = r * (n - i) / (i + 1);
return r;
}
function insightHyperTail(N, K, n, k) {
const denom = insightChoose(N, n);
if (!denom) return 1;
let p = 0;
for (let i = k; i <= Math.min(n, K); i++) {
p += insightChoose(K, i) * insightChoose(N - K, n - i) / denom;
}
return Math.min(1, p);
}
function insightBinomTail(n, k) {
let p = 0;
for (let i = k; i <= n; i++) p += insightChoose(n, i);
return Math.min(1, p / Math.pow(2, n));
}
function insightPct(p) {
if (p < 0.001) return '<0.1%';
return (p * 100).toFixed(p < 0.1 ? 1 : 0) + '%';
}
function insightFoliTerm(ori, rank, n) {
if (typeof foliRecurrence === 'undefined') return null;
const byCount = foliRecurrence[rank];
const cell = byCount && byCount[n];
const terms = cell && cell[ori];
if (!terms || !terms.length) return null;
return t('foli.recur.' + ori + '.' + rank + '.' + n);
}
function insightMention(card) {
const ori = t((typeof orientationNames !== 'undefined' && orientationNames[card.orientation]) || card.orientation);
if (card.position === 'spread.bottom') return t('insight.card.bottom', { name: card.name, ori });
let pos = null;
if (card.position) {
if (card.position.indexOf('.') < 0) pos = card.position;
else if (t(card.position) !== card.position) pos = t(card.position);
}
return pos
? t('insight.card.pos', { name: card.name, ori, pos })
: t('insight.echo.card', { name: card.name, ori });
}
const INSIGHT_ROLE_BY_NAME = {
'過去': 'past', '現在': 'present', '未來': 'future',
'目標': 'aim', '結果': 'outcome',
'阻礙': 'obstacle', '挑戰': 'obstacle', '希望與恐懼': 'hope'
};
function insightRoles(cards) {
const byRole = {};
cards.forEach(c => {
if (!c.position || c.position.indexOf('.') < 0) return;
const zh = (typeof uiStrings !== 'undefined' && uiStrings.zh) ? uiStrings.zh[c.position] : null;
const role = zh && INSIGHT_ROLE_BY_NAME[zh];
if (role && !byRole[role]) byRole[role] = c;
});
return byRole;
}
const INSIGHT_ECHO_MIN = 2;
const INSIGHT_ECHO_MAX = 3;
function insightEchoZh(term) {
return (typeof waiteTermZh === 'function') ? waiteTermZh(term) : null;
}
function insightEchoShowEn(term) {
const zh = insightEchoZh(term);
return zh ? t('insight.echo.pair', { zh, en: term }) : term;
}
const INSIGHT_ECHO_SOURCES = [
{ key: 'ours', oriented: false, short: (term) => term, show: (term) => term },
{ key: 'mofa', oriented: true, short: (term) => term, show: (term) => term },
{ key: 'waite', oriented: true, short: (term) => insightEchoZh(term) || term, show: insightEchoShowEn },
{ key: 'add', oriented: true, short: (term) => insightEchoZh(term) || term, show: insightEchoShowEn }
];
function insightEchoTerms(srcKey, card, ori) {
const rv = ori === 'reversed';
if (srcKey === 'ours') {
const m = (typeof cardMeanings !== 'undefined') ? cardMeanings[card.nameKey] : null;
return (m && Array.isArray(m.keywords)) ? m.keywords : [];
}
if (srcKey === 'mofa') {
const m = (typeof mofaTerms !== 'undefined') ? mofaTerms[card.nameKey] : null;
return (m && m[rv ? 'rv' : 'up']) || [];
}
if (srcKey === 'waite') {
const m = (typeof waiteTerms !== 'undefined') ? waiteTerms[card.nameKey] : null;
return (m && m[rv ? 'reversed' : 'upright']) || [];
}
const m = (typeof waiteAdditional !== 'undefined') ? waiteAdditional[card.nameKey] : null;
return (m && m[rv ? 'reversed' : 'upright']) || [];
}
const insightEchoDeckFreq = {};
function insightEchoFreq(src) {
if (insightEchoDeckFreq[src.key]) return insightEchoDeckFreq[src.key];
const freq = new Map();
if (typeof fullTarotCards !== 'undefined') {
fullTarotCards.forEach(card => {
const set = new Set();
insightEchoTerms(src.key, card, 'upright').forEach(x => set.add(x));
if (src.oriented) insightEchoTerms(src.key, card, 'reversed').forEach(x => set.add(x));
set.forEach(x => freq.set(x, (freq.get(x) || 0) + 1));
});
}
insightEchoDeckFreq[src.key] = freq;
return freq;
}
function insightEchoP(K, n, k, oriented) {
if (!oriented) return insightHyperTail(INSIGHT_DECK, K, n, k);
const denom = insightChoose(INSIGHT_DECK, n);
if (!denom) return 1;
let p = 0;
for (let d = k; d <= Math.min(n, K); d++) {
const hyper = insightChoose(K, d) * insightChoose(INSIGHT_DECK - K, n - d) / denom;
p += hyper * insightBinomTail(d, k);
}
return Math.min(1, p);
}
function insightEcho(dealt) {
const n = dealt.length;
if (n < INSIGHT_ECHO_MIN) return [];
const groups = [];
INSIGHT_ECHO_SOURCES.forEach(src => {
const hit = new Map();
dealt.forEach(card => {
new Set(insightEchoTerms(src.key, card, card.orientation)).forEach(term => {
if (!hit.has(term)) hit.set(term, []);
hit.get(term).push(card);
});
});
const freq = insightEchoFreq(src);
const byCards = new Map();
hit.forEach((hitCards, term) => {
if (hitCards.length < INSIGHT_ECHO_MIN) return;
const K = Math.max(freq.get(term) || 0, hitCards.length);
const id = hitCards.map(c => c.nameKey).sort().join(',');
const g = byCards.get(id);
const p = insightEchoP(K, n, hitCards.length, src.oriented);
if (!g) {
byCards.set(id, { src, terms: [term], best: term, cards: hitCards, k: hitCards.length, K, p });
} else {
g.terms.push(term);
if (p < g.p) { g.p = p; g.K = K; g.best = term; }
}
});
byCards.forEach(g => groups.push(g));
});
const compOf = new Map();
const components = [];
groups.forEach(g => {
let target = null;
g.cards.forEach(c => { if (!target) target = compOf.get(c.nameKey) || null; });
if (!target) {
target = { groups: [], cardSet: new Map(), dead: false };
components.push(target);
}
g.cards.forEach(c => {
const other = compOf.get(c.nameKey);
if (other && other !== target) {
other.groups.forEach(og => target.groups.push(og));
other.cardSet.forEach((card, key) => { target.cardSet.set(key, card); compOf.set(key, target); });
other.dead = true;
}
});
target.groups.push(g);
g.cards.forEach(c => { target.cardSet.set(c.nameKey, c); compOf.set(c.nameKey, target); });
});
const live = components.filter(c => !c.dead);
live.forEach(c => {
const byId = new Map();
c.groups.forEach(g => {
const id = g.cards.map(x => x.nameKey).sort().join(',');
const e = byId.get(id);
if (!e) byId.set(id, { cards: g.cards, parts: [g], p: g.p });
else { e.parts.push(g); if (g.p < e.p) e.p = g.p; }
});
c.edges = Array.from(byId.values());
c.edges.forEach(e => e.parts.sort((a, b) => a.p - b.p));
c.edges.sort((a, b) => a.p - b.p);
c.minP = c.edges[0].p;
});
live.sort((a, b) => (b.cardSet.size - a.cardSet.size) || (a.minP - b.minP));
return live.slice(0, INSIGHT_ECHO_MAX);
}
function insightTopCount(list, keyOf) {
const counts = new Map();
list.forEach(item => {
const k = keyOf(item);
counts.set(k, (counts.get(k) || 0) + 1);
});
let topKey = null;
let topCount = 0;
counts.forEach((count, key) => {
if (count > topCount) {
topKey = key;
topCount = count;
}
});
return { key: topKey, count: topCount };
}
function generateInsight(reading) {
const out = [];
if (!reading || typeof reading !== 'object') return out;
const cards = Array.isArray(reading.drawnCards) ? reading.drawnCards.filter(Boolean) : [];
const n = cards.length;
const b = reading.bottomCard;
let found = 0;
let reportedSuit = null;
if (n >= 3 && typeof cardClass === 'function') {
const cls = { major: 0, court: 0, pip: 0 };
cards.forEach(c => { const k0 = cardClass(c); if (k0) cls[k0]++; });
const rev = cards.filter(c => c.orientation === 'reversed').length;
if (cls.court + cls.pip > 0 && typeof cardElement === 'function') {
const order = ['Fire', 'Water', 'Air', 'Earth'];
const elCount = { Fire: 0, Water: 0, Air: 0, Earth: 0 };
cards.forEach(c => { const el = cardElement(c); if (el) elCount[el]++; });
out.push({
tag: t('insight.profile.tag'),
text: t('insight.profile.text', {
n, maj: cls.major, court: cls.court, pip: cls.pip, rev,
els: order.map(e => t('insight.profile.el', { el: t(SYSTEMS_ELEMENT_KEY[e]), k: elCount[e] })).join('・')
})
});
} else {
out.push({ tag: t('insight.profile.tag'), text: t('insight.profile.text.noMinors', { n, rev }) });
}
}
if (n) {
const k = cards.filter(c => c.suit === 'Major Arcana').length;
if (k >= 2) {
const p = insightHyperTail(INSIGHT_DECK, INSIGHT_MAJORS, n, k);
if (p < INSIGHT_ALPHA) {
found++;
out.push({
tag: t('insight.major.tag', { p: insightPct(p) }),
text: t('insight.major.text', {
n, k, p: insightPct(p),
exp: (n * INSIGHT_MAJORS / INSIGHT_DECK).toFixed(1),
cards: cards.filter(c => c.suit === 'Major Arcana').map(insightMention).join('、')
})
});
}
}
const minors = cards.filter(c => c.suit !== 'Major Arcana');
const domSuit = insightTopCount(minors, c => c.suit);
const domSys = (typeof suitSystem !== 'undefined') ? suitSystem[domSuit.key] : null;
if (domSuit.key && domSuit.count >= 2 && domSys) {
const raw = insightHyperTail(INSIGHT_DECK, INSIGHT_PER_SUIT, n, domSuit.count);
const p = Math.min(1, raw * 4);
if (p < INSIGHT_ALPHA) {
found++;
reportedSuit = domSuit.key;
const suitLabel = t((typeof suitNames !== 'undefined' && suitNames[domSuit.key]) || domSuit.key);
out.push({
tag: t('insight.suit.tag', { suit: suitLabel, p: insightPct(p) }),
text: t('insight.suit.text', {
suit: suitLabel, k: domSuit.count, n, p: insightPct(p),
element: t(SYSTEMS_ELEMENT_KEY[domSys.element]),
faculty: t(domSys.faculty),
cards: minors.filter(c => c.suit === domSuit.key).map(insightMention).join('、')
})
});
}
}
if (n >= 2) {
const rev = cards.filter(c => c.orientation === 'reversed').length;
const pRev = insightBinomTail(n, rev);
const pUp = insightBinomTail(n, n - rev);
if (rev > n - rev && pRev < INSIGHT_ALPHA) {
found++;
out.push({
tag: t('insight.reversed.tag', { p: insightPct(pRev) }),
text: t('insight.reversed.text', { k: rev, n, p: insightPct(pRev) })
});
} else if (rev < n - rev && pUp < INSIGHT_ALPHA) {
found++;
out.push({
tag: t('insight.upright.tag', { p: insightPct(pUp) }),
text: t('insight.upright.text', { k: n - rev, n, p: insightPct(pUp) })
});
}
}
const recs = insightRecurrence(cards);
recs.forEach(r => {
found++;
const rank = t('rank.' + r.rank);
const ori = t(r.ori === 'reversed' ? 'orientation.reversed' : 'orientation.upright');
const term = t('waite.recur.' + r.ori + '.' + r.rank + '.' + r.n);
const foli = insightFoliTerm(r.ori, r.rank, r.n);
const mentions = r.cards.map(insightMention).join('、');
out.push({
tag: t('insight.recur.tag', { n: r.n, rank, ori }),
text: foli
? t('insight.recur.text.both', { n: r.n, rank, ori, term, foli, cards: mentions })
: t('insight.recur.text', { n: r.n, rank, ori, term, cards: mentions })
});
});
['court', 'pip'].forEach(cls => {
const clsCards = cards.filter(c => cardClass(c) === cls);
const k2 = clsCards.length;
if (k2 < 2) return;
const p = insightHyperTail(INSIGHT_DECK, CARD_CLASS_COUNT[cls], n, k2);
if (p < INSIGHT_ALPHA) {
found++;
out.push({
tag: t('insight.class.' + cls + '.tag', { p: insightPct(p) }),
text: t('insight.class.' + cls + '.text', {
n, k: k2, p: insightPct(p),
exp: (n * CARD_CLASS_COUNT[cls] / INSIGHT_DECK).toFixed(1),
cards: cls === 'court' ? clsCards.map(insightMention).join('、') : ''
})
});
}
});
if (typeof thierensMajors !== 'undefined') {
const signs = cards
.map(c => thierensMajors[c.nameKey])
.filter(s => s && zodiacQuality[s]);
if (signs.length >= 3) {
const q = insightTopCount(signs, s => zodiacQuality[s]);
if (q.key && q.count === signs.length) {
const p = Math.min(1, Math.pow(1 / 3, signs.length) * 3);
if (p < INSIGHT_ALPHA) {
found++;
out.push({
tag: t('insight.quality.tag', { quality: t('quality.' + q.key), p: insightPct(p) }),
text: t('insight.quality.text', { k: signs.length, quality: t('quality.' + q.key), p: insightPct(p) })
});
}
}
}
}
insightEcho((b && b.nameKey) ? cards.concat([b]) : cards).forEach(compo => {
found++;
const partText = (g) => t('insight.echo.part', {
terms: g.terms.map(x => g.src.show(x)).join('、'),
src: t('insight.echo.src.' + g.src.key)
});
if (compo.edges.length === 1) {
const e = compo.edges[0];
const first = e.parts[0];
const cardsTxt = e.cards.map(insightMention).join('、');
if (e.parts.length === 1) {
out.push({
tag: t('insight.echo.tag', { term: first.src.short(first.best) }),
text: t(first.terms.length > 1 ? 'insight.echo.text.multi' : 'insight.echo.text', {
K: first.K,
term: first.terms.map(x => first.src.show(x)).join('、'),
best: first.src.show(first.best),
src: t('insight.echo.src.' + first.src.key),
cards: cardsTxt
})
});
} else {
out.push({
tag: t('insight.echo.tag', { term: first.src.short(first.best) }),
text: t('insight.echo.text.multiSrc', {
cards: cardsTxt, m: e.parts.length,
parts: e.parts.map(partText).join('、')
})
});
}
return;
}
const deg = new Map();
compo.edges.forEach(e => e.cards.forEach(c => deg.set(c.nameKey, (deg.get(c.nameKey) || 0) + 1)));
let hubKey = null, hubDeg = 0;
deg.forEach((d, key) => { if (d > hubDeg) { hubDeg = d; hubKey = key; } });
const hub = compo.cardSet.get(hubKey);
const links = [], extras = [];
compo.edges.forEach(e => {
const parts = e.parts.map(partText).join('、');
if (e.cards.some(c => c.nameKey === hubKey)) {
links.push(t('insight.echo.net.link', {
others: e.cards.filter(c => c.nameKey !== hubKey).map(insightMention).join('、'), parts
}));
} else {
extras.push(t('insight.echo.net.extra', { cards: e.cards.map(insightMention).join('、'), parts }));
}
});
out.push({
tag: t('insight.echo.net.tag', { hub: hub.name }),
text: t('insight.echo.net.text', { hub: insightMention(hub), links: links.concat(extras).join('；') })
});
});
const roles = insightRoles(cards);
const recurRanks = {};
recs.forEach(r => { recurRanks[r.rank] = true; });
let axisCount = 0;
[['past', 'future'], ['aim', 'outcome'], ['obstacle', 'outcome'], ['hope', 'outcome']].forEach(pair => {
if (axisCount >= 2) return;
const a = roles[pair[0]], z = roles[pair[1]];
if (!a || !z || a === z || a.number !== z.number) return;
const rankKey = INSIGHT_RANK_KEY[a.number];
if (!rankKey || recurRanks[rankKey]) return;
axisCount++;
found++;
const p1 = t(a.position), p2 = t(z.position);
out.push({
tag: t('insight.axis.tag', { p1, p2 }),
text: t('insight.axis.rank.text', {
p1, p2, rank: t('rank.' + rankKey),
c1: insightMention(a), c2: insightMention(z)
})
});
});
if (roles.past && roles.present && roles.future) {
const three = [roles.past, roles.present, roles.future];
const s0 = three[0].suit;
if (s0 !== 'Major Arcana' && s0 !== reportedSuit && three.every(c => c.suit === s0)) {
found++;
out.push({
tag: t('insight.axis.suit.tag'),
text: t('insight.axis.suit.text', {
cards: three.map(insightMention).join('、'),
suit: t((typeof suitNames !== 'undefined' && suitNames[s0]) || s0)
})
});
}
}
if (!found && n >= 3) {
out.push({
tag: t('insight.balanced.tag'),
text: t('insight.balanced.text')
});
}
}
if (b && b.name) {
const meaning = (typeof cardMeanings !== 'undefined' && cardMeanings[b.nameKey]) || null;
const keywords = (meaning && Array.isArray(meaning.keywords)) ? meaning.keywords : [];
const kw = keywords.slice(0, 2).join('、');
const ori = t((typeof orientationNames !== 'undefined' && orientationNames[b.orientation]) || b.orientation);
out.push({
tag: t('insight.bottom.tag'),
text: t(kw ? 'insight.bottom.text' : 'insight.bottom.text.noKeywords', { name: b.name, ori, kw })
});
}
return out;
}

;
/* reading.js */
function getDeck(deckType) {
switch (deckType) {
case 'major': return [...majorArcana];
case 'minor': return [...minorArcana];
case 'court': return [...courtCards];
case 'numbered': return [...numberedCards];
default: return [...fullTarotCards];
}
}
let pendingReading = null;
function buildReadingConfig(seedOverride, save) {
const deckType = document.getElementById('deckType').value;
const spreadType = spreadTypeEl.value;
const spreadName = spreadTypeEl.options[spreadTypeEl.selectedIndex].dataset.spreadName;
const question = document.getElementById('question').value.trim();
const deck = getDeck(deckType);
const seed = isValidSeed(seedOverride) ? String(seedOverride) : newSeed();
const rng = seedRng(seed);
const shuffled = shuffle(deck, rng);
const orientations = shuffled.map(() => rng() > 0.5 ? 'upright' : 'reversed');
const spread = spreads[spreadType];
return { seed, deckType, spreadType, spreadName, question, shuffled, orientations, positions: spread.positions, save };
}
function performReading(seedOverride, save = true, picks = null) {
const cfg = buildReadingConfig(seedOverride, save);
const num = cfg.positions.length;
if (cfg.shuffled.length < num + 1) {
showToast(t('toast.deckTooSmall'), 'error');
return;
}
const firstN = () => Array.from({ length: num }, (_, i) => i);
if (picks === 'first') {
completeReading(cfg, firstN());
return;
}
if (Array.isArray(picks)) {
const max = cfg.shuffled.length - 2;
const clean = [...new Set(picks.filter(n => Number.isInteger(n) && n >= 0 && n <= max))].slice(0, num);
completeReading(cfg, clean.length === num ? clean : firstN());
return;
}
const interactive = localStorage.getItem('interactiveDraw') !== 'false';
if (!interactive) {
readBtn.disabled = true;
readBtnText.innerHTML = '<span class="spinner"></span>';
setTimeout(() => completeReading(cfg, firstN(), true), 500);
return;
}
renderCardSelection(cfg);
}
function renderCardSelection(cfg) {
pendingReading = { ...cfg, picks: [] };
const num = cfg.positions.length;
const pickable = cfg.shuffled.length - 1;
resultsEl.innerHTML = `
<div class="panel fade-in">
<div class="pick-header">
<h3 class="results-title">${escapeHTML(t('pick.title'))}</h3>
<p class="pick-hint">${escapeHTML(t(cfg.spreadName))} · ${t('pick.hint', { n: num })}</p>
<div class="pick-progress" id="pickProgress">${escapeHTML(t('pick.progress', { n: 0, total: num }))}</div>
</div>
<div class="pick-grid" id="pickGrid" data-keynav="grid">
${Array.from({ length: pickable }, (_, i) => `
<button class="pick-card" data-idx="${i}" tabindex="${i === 0 ? 0 : -1}" data-keynav-item aria-label="${escapeHTML(t('pick.cardBack', { n: i + 1 }))}"></button>
`).join('')}
</div>
<div class="btn-group">
<button class="btn btn-tertiary" id="pickRandom">${escapeHTML(t('pick.random'))}</button>
<button class="btn btn-tertiary" id="pickReshuffle">${escapeHTML(t('pick.reshuffle'))}</button>
<button class="btn btn-tertiary" id="pickCancel">${escapeHTML(t('btn.cancel'))}</button>
</div>
</div>
`;
const grid = document.getElementById('pickGrid');
grid.addEventListener('click', (e) => {
const btn = e.target.closest('.pick-card');
if (!btn || btn.disabled || !pendingReading) return;
selectPick(Number(btn.dataset.idx), btn);
});
document.getElementById('pickRandom').addEventListener('click', () => {
if (!pendingReading) return;
const remaining = [];
for (let i = 0; i < pickable; i++) {
if (!pendingReading.picks.includes(i)) remaining.push(i);
}
while (pendingReading && pendingReading.picks.length < num && remaining.length) {
const j = randomInt(remaining.length);
const idx = remaining.splice(j, 1)[0];
selectPick(idx, grid.querySelector(`.pick-card[data-idx="${idx}"]`));
}
});
document.getElementById('pickReshuffle').addEventListener('click', () => {
performReading(undefined, cfg.save);
});
document.getElementById('pickCancel').addEventListener('click', () => {
pendingReading = null;
resultsEl.innerHTML = '';
});
requestAnimationFrame(() => {
resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
});
}
function selectPick(idx, btn) {
const cfg = pendingReading;
if (!cfg || cfg.picks.length >= cfg.positions.length) return;
cfg.picks.push(idx);
if (btn) {
btn.classList.add('selected');
btn.textContent = cfg.picks.length;
btn.disabled = true;
}
const progress = document.getElementById('pickProgress');
if (progress) progress.textContent = t('pick.progress', { n: cfg.picks.length, total: cfg.positions.length });
if (cfg.picks.length === cfg.positions.length) {
pendingReading = null;
setTimeout(() => completeReading(cfg, cfg.picks, true), 450);
}
}
function completeReading(cfg, picks, revealed = false) {
const { seed, deckType, spreadType, spreadName, question, shuffled, orientations, positions, save } = cfg;
const drawn = picks.map((deckIdx, i) => ({
...shuffled[deckIdx],
position: positions[i],
orientation: orientations[deckIdx]
}));
const bottomIdx = shuffled.length - 1;
const bottomCard = {
...shuffled[bottomIdx],
position: 'spread.bottom',
orientation: orientations[bottomIdx]
};
lastReadingData = {
id: Date.now(),
seed,
deckType,
spreadType,
spreadName,
question,
picks,
drawnCards: drawn,
bottomCard,
timestamp: Date.now(),
favorite: false,
tags: [],
note: ''
};
if (save) {
readingHistory.unshift(lastReadingData);
if (readingHistory.length > 100) readingHistory = readingHistory.slice(0, 100);
saveHistory();
}
renderResults(lastReadingData, revealed);
const isDefaultPicks = picks.every((p, i) => p === i);
updateURL({ seed, deck: deckType, spread: spreadType, q: question || null, picks: isDefaultPicks ? null : picks.join('-') });
readBtn.disabled = false;
readBtnText.textContent = t('btn.startReading');
requestAnimationFrame(() => {
resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
});
}
function renderResults(data, revealed = false) {
const { spreadName, spreadType, question, drawnCards, bottomCard, favorite, note } = data;
const anim = revealed ? 'flip-in' : 'slide-in';
const layout = (typeof spreadLayouts !== 'undefined' && spreadLayouts[spreadType] &&
spreadLayouts[spreadType].cells.length === drawnCards.length) ? spreadLayouts[spreadType] : null;
const cardsHTML = layout ? `
<div class="spread-layout" style="--cols: ${layout.cols}" data-keynav="grid">
${drawnCards.map((c, i) => {
const cell = layout.cells[i];
const gr = cell.rs ? `${cell.r} / span ${cell.rs}` : cell.r;
return `<div class="spread-cell${cell.rot ? ' rotated' : ''}" style="--gr: ${gr}; --gc: ${cell.c}; --delay: ${i * 70}ms">${renderCard(c, false, anim, i)}</div>`;
}).join('')}
</div>
<div class="bottom-card-row" style="--delay: ${drawnCards.length * 70}ms">
${renderCard(bottomCard, true, anim)}
</div>
` : `
<div class="cards-grid" data-keynav="grid">
${drawnCards.map((c, i) => renderCard(c, false, anim, i)).join('')}
${renderCard(bottomCard, true, anim, drawnCards.length)}
</div>
`;
const insights = (typeof generateInsight === 'function') ? (generateInsight(data) || []) : [];
const insightHTML = insights.length ? `
<div class="insight-panel">
<div class="insight-title">${escapeHTML(t('insight.panel.title'))}</div>
${insights.map(item => `
<div class="insight-item">
<div class="insight-tag">${escapeHTML(item.tag)}</div>
<p class="insight-text">${escapeHTML(item.text)}</p>
</div>
`).join('')}
</div>
` : '';
resultsEl.innerHTML = `
<div class="panel fade-in">
<div class="results-header">
<h3 class="results-title">${escapeHTML(t('reading.results.title'))}</h3>
<div class="results-meta">
<span class="badge ${favorite ? 'favorite' : ''}">${escapeHTML(t(spreadName))}</span>
${question ? `<span>${escapeHTML(question)}</span>` : ''}
</div>
</div>
${note ? `<div class="card-notes">${escapeHTML(note)}</div>` : ''}
${cardsHTML}
${insightHTML}
<div class="btn-group">
<button class="btn btn-tertiary" onclick="copyResults()">${escapeHTML(t('btn.copyResults'))}</button>
<button class="btn btn-tertiary" onclick="generateShareImage()">${escapeHTML(t('btn.shareImage'))}</button>
<button class="btn btn-tertiary" onclick="printReading()">${escapeHTML(t('btn.print'))}</button>
</div>
</div>
`;
}
function copyResults() {
const { spreadName, question, drawnCards, bottomCard } = lastReadingData;
const url = location.href;
const text = [
`${t(spreadName)}${question ? ` - ${question}` : ''}`,
'---',
...drawnCards.map(c => `${t(c.position)}: ${c.name} (${t(orientationNames[c.orientation] || c.orientation)})`),
`${t('spread.bottom')}: ${bottomCard.name} (${t(orientationNames[bottomCard.orientation] || bottomCard.orientation)})`,
'',
url
].join('\n');
if (navigator.clipboard) {
navigator.clipboard.writeText(text).then(() => {
showToast(t('toast.copied'));
}).catch(() => {
showToast(t('toast.copyFailed'), 'error');
});
}
}
function shareImagePalette() {
const cs = getComputedStyle(document.documentElement);
const v = (name) => cs.getPropertyValue(name).trim();
const suit = readNeonSuitColors(Object.keys(suitNames));
const lit = Object.keys(suit).length > 0;
return {
bg: v('--bg'),
text: v('--text'),
sub: v('--text-secondary'),
divider: v('--divider'),
accent: v('--accent'),
up: v('--yesno-yes'),
rev: v('--yesno-no'),
glow: lit,
suit: lit ? suit : null
};
}
function shareGlyph(ctx, suit, x, y, s, color) {
ctx.save();
ctx.translate(x, y);
ctx.scale(s, s);
ctx.strokeStyle = color;
ctx.fillStyle = color;
ctx.lineWidth = 5;
ctx.lineCap = 'round';
ctx.lineJoin = 'round';
if (suit === 'Wands') {
ctx.stroke(new Path2D('M0 -26 L0 26 M0 -12 L-9 -21 M0 -4 L9 -13'));
ctx.beginPath(); ctx.arc(0, -26, 2.5, 0, Math.PI * 2); ctx.fill();
} else if (suit === 'Cups') {
ctx.stroke(new Path2D('M-19 -24 L19 -24 C19 -2 8 6 0 6 C-8 6 -19 -2 -19 -24 M0 6 L0 24 M-14 24 L14 24'));
} else if (suit === 'Swords') {
ctx.stroke(new Path2D('M0 -28 L0 12 M-4 -19 L0 -28 L4 -19 M-13 12 L13 12 M0 12 L0 23'));
ctx.beginPath(); ctx.arc(0, 26.5, 3.5, 0, Math.PI * 2); ctx.stroke();
} else if (suit === 'Pentacles') {
ctx.beginPath(); ctx.arc(0, 0, 24, 0, Math.PI * 2); ctx.stroke();
ctx.stroke(new Path2D('M0 -17.6 L10.3 14.2 L-16.7 -5.4 L16.7 -5.4 L-10.3 14.2 Z'));
} else {
ctx.fill(new Path2D('M-23 0 a23 23 0 1 0 46 0 a23 23 0 1 0 -46 0 M-10 0 a16 16 0 1 0 32 0 a16 16 0 1 0 -32 0'), 'evenodd');
}
ctx.restore();
}
function generateShareImage() {
const { spreadName, question, drawnCards, bottomCard, timestamp, seed } = lastReadingData;
if (!drawnCards) {
showToast(t('toast.noReading'), 'warning');
return;
}
const cards = [...drawnCards, bottomCard];
const width = 800;
const pad = 64;
const rowH = 72;
const headerH = question ? 232 : 192;
const height = headerH + cards.length * rowH + 100;
const canvas = document.createElement('canvas');
const scale = 2;
canvas.width = width * scale;
canvas.height = height * scale;
const ctx = canvas.getContext('2d');
ctx.scale(scale, scale);
const P = shareImagePalette();
ctx.fillStyle = P.bg;
ctx.fillRect(0, 0, width, height);
const font = '"Noto Sans TC", "PingFang TC", "Microsoft JhengHei", -apple-system, sans-serif';
const truncate = (text, maxWidth) => {
if (ctx.measureText(text).width <= maxWidth) return text;
while (text.length && ctx.measureText(text + '…').width > maxWidth) text = text.slice(0, -1);
return text + '…';
};
if (P.glow) { ctx.shadowColor = P.accent; ctx.shadowBlur = 14; }
ctx.fillStyle = P.accent;
ctx.font = `600 32px ${font}`;
ctx.fillText(t('app.title'), pad, 96);
ctx.shadowBlur = 0;
ctx.fillStyle = P.sub;
ctx.font = `500 19px ${font}`;
ctx.fillText(`${t(spreadName)} · ${formatDate(timestamp)}`, pad, 132);
if (question) {
ctx.fillStyle = P.text;
ctx.font = `400 19px ${font}`;
ctx.fillText(truncate(`「${question}」`, width - pad * 2), pad, 172);
}
ctx.strokeStyle = P.divider;
ctx.lineWidth = 1;
ctx.beginPath();
ctx.moveTo(pad, headerH - 24);
ctx.lineTo(width - pad, headerH - 24);
ctx.stroke();
cards.forEach((card, i) => {
const y = headerH + i * rowH;
const suitColor = P.suit ? (P.suit[card.suit] || P.accent) : P.text;
shareGlyph(ctx, card.suit, pad + 14, y + 28, 0.42, suitColor);
ctx.fillStyle = P.sub;
ctx.font = `600 14px ${font}`;
ctx.fillText(t(card.position), pad + 44, y + 16);
ctx.fillStyle = suitColor;
ctx.font = `600 24px ${font}`;
ctx.fillText(truncate(card.name, width - pad * 2 - 140), pad + 44, y + 46);
ctx.font = `500 17px ${font}`;
ctx.fillStyle = card.orientation === 'reversed' ? P.rev : P.up;
const oriLabel = t(orientationNames[card.orientation] || card.orientation);
ctx.fillText(oriLabel, width - pad - ctx.measureText(oriLabel).width, y + 44);
});
ctx.fillStyle = P.sub;
ctx.font = `400 14px ${font}`;
ctx.fillText(t('app.share.imageFooter'), pad, height - 44);
canvas.toBlob((blob) => {
if (!blob) {
showToast(t('toast.shareImageFailed'), 'error');
return;
}
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = `tarot-${seed || Date.now()}.png`;
a.click();
URL.revokeObjectURL(url);
showToast(t('toast.shareImageDone'));
}, 'image/png');
}
function printReading() {
window.print();
}

;
/* history.js */
function renderHistory() {
const list = document.getElementById('historyList');
const spreadSelect = document.getElementById('filterSpread');
const spreadNames = [...new Set(readingHistory.map(r => r.spreadName))];
spreadSelect.innerHTML = `<option value="">${escapeHTML(t('history.filter.allSpreads'))}</option>` +
spreadNames.map(s => `<option value="${escapeHTML(s)}">${escapeHTML(t(s))}</option>`).join('');
spreadSelect.value = historyFilters.spread;
if (spreadSelect.selectedIndex === -1) {
historyFilters.spread = '';
spreadSelect.value = '';
}
const tagSelect = document.getElementById('filterTag');
const tags = [...new Set(readingHistory.flatMap(r => r.tags || []))];
tagSelect.innerHTML = `<option value="">${escapeHTML(t('history.filter.allTags'))}</option>` +
tags.map(t => `<option value="${escapeHTML(t)}">${escapeHTML(t)}</option>`).join('');
tagSelect.value = historyFilters.tag;
if (tagSelect.selectedIndex === -1) {
historyFilters.tag = '';
tagSelect.value = '';
}
let filtered = readingHistory.filter(item => {
if (historyFilters.spread && item.spreadName !== historyFilters.spread) return false;
if (historyFilters.tag && !item.tags?.includes(historyFilters.tag)) return false;
if (historyFilters.favorite && !item.favorite) return false;
return true;
});
if (filtered.length === 0) {
list.innerHTML = `<div class="history-empty">${escapeHTML(t('history.empty'))}</div>`;
return;
}
list.innerHTML = filtered.map(item => `
<div class="history-item ${item.favorite ? 'favorite' : ''}" data-id="${item.id}">
<div class="history-header">
<span class="history-spread">${escapeHTML(t(item.spreadName))}</span>
<span class="history-time">${formatDate(item.timestamp)}</span>
</div>
${item.question ? `<div class="history-question">${escapeHTML(item.question)}</div>` : ''}
${item.tags?.length ? `<div class="tags">${item.tags.map(t => `<span class="tag">${escapeHTML(t)}</span>`).join('')}</div>` : ''}
<div class="history-actions">
<button class="btn btn-tertiary btn-sm" onclick="viewReading(${item.id})">${escapeHTML(t('btn.view'))}</button>
<button class="btn btn-tertiary btn-sm" onclick="toggleFavorite(${item.id})">${escapeHTML(t(item.favorite ? 'history.item.unfavorite' : 'history.item.favorite'))}</button>
<button class="btn btn-tertiary btn-sm" onclick="openNoteModal(${item.id})">${escapeHTML(t('btn.note'))}</button>
<button class="btn btn-tertiary btn-sm" onclick="openTagModal(${item.id})">${escapeHTML(t('btn.tag'))}</button>
<button class="btn btn-tertiary btn-sm" onclick="deleteReading(${item.id})">${escapeHTML(t('btn.delete'))}</button>
</div>
</div>
`).join('');
}
document.getElementById('filterSpread').addEventListener('change', (e) => {
historyFilters.spread = e.target.value;
renderHistory();
});
document.getElementById('filterTag').addEventListener('change', (e) => {
historyFilters.tag = e.target.value;
renderHistory();
});
document.getElementById('filterFavorite').addEventListener('click', () => {
historyFilters.favorite = !historyFilters.favorite;
document.getElementById('filterFavorite').style.background = historyFilters.favorite ? 'var(--accent)' : '';
document.getElementById('filterFavorite').style.color = historyFilters.favorite ? 'var(--accent-contrast)' : '';
renderHistory();
});
function viewReading(id) {
const reading = readingHistory.find(r => r.id === id);
if (reading) {
lastReadingData = reading;
renderResults(reading);
switchTab('reading');
}
}
function toggleFavorite(id) {
const reading = readingHistory.find(r => r.id === id);
if (reading) {
reading.favorite = !reading.favorite;
saveHistory();
renderHistory();
showToast(t(reading.favorite ? 'toast.favorited' : 'toast.unfavorited'));
}
}
async function deleteReading(id) {
const ok = await openConfirm({
title: t('confirm.delete.title'),
message: t('confirm.delete.message'),
confirmText: t('confirm.delete.ok'),
danger: true
});
if (!ok) return;
readingHistory = readingHistory.filter(r => r.id !== id);
saveHistory();
renderHistory();
showToast(t('toast.deleted'));
}
function openNoteModal(id) {
currentEditingId = id;
const reading = readingHistory.find(r => r.id === id);
document.getElementById('noteText').value = reading?.note || '';
document.getElementById('noteModal').classList.add('show');
}
function closeNoteModal() {
document.getElementById('noteModal').classList.remove('show');
currentEditingId = null;
}
function saveNote() {
const reading = readingHistory.find(r => r.id === currentEditingId);
if (reading) {
reading.note = document.getElementById('noteText').value;
saveHistory();
closeNoteModal();
renderHistory();
showToast(t('toast.noteSaved'));
}
}
let tagDraft = null;
function openTagModal(id) {
currentEditingId = id;
const reading = readingHistory.find(r => r.id === id);
tagDraft = Array.isArray(reading?.tags) ? reading.tags.slice() : [];
renderCommonTags();
document.getElementById('tagModal').classList.add('show');
}
function renderCommonTags() {
document.getElementById('commonTags').innerHTML = commonTags.map((tag, i) => {
const active = tagDraft?.includes(tag) ? 'active' : '';
return `<span class="tag ${active}" role="button" tabindex="${i === 0 ? 0 : -1}" data-keynav-item
aria-pressed="${!!tagDraft?.includes(tag)}" onclick="toggleTagSelection('${tag}')">${tag}</span>`;
}).join('');
}
function closeTagModal() {
document.getElementById('tagModal').classList.remove('show');
document.getElementById('customTag').value = '';
currentEditingId = null;
tagDraft = null;
}
function toggleTagSelection(tag) {
if (!tagDraft) return;
const index = tagDraft.indexOf(tag);
if (index > -1) {
tagDraft.splice(index, 1);
} else {
tagDraft.push(tag);
}
renderCommonTags();
}
function saveTag() {
const reading = readingHistory.find(r => r.id === currentEditingId);
if (!reading || !tagDraft) {
closeTagModal();
return;
}
const customTag = document.getElementById('customTag').value.trim();
if (customTag && !tagDraft.includes(customTag)) {
tagDraft.push(customTag);
}
reading.tags = tagDraft;
saveHistory();
closeTagModal();
renderHistory();
showToast(t('toast.tagUpdated'));
}
document.getElementById('clearHistory').addEventListener('click', async () => {
const count = readingHistory.length;
const ok = await openConfirm({
title: t('confirm.clearHistory.title'),
message: t('confirm.clearHistory.message', { n: count }),
confirmText: t('confirm.clearHistory.ok'),
danger: true
});
if (!ok) return;
readingHistory = [];
saveHistory();
renderHistory();
showToast(t('toast.historyCleared'));
});

;
/* stats.js */
const statsCardNameByKey = {};
const statsCardKeyByName = {};
fullTarotCards.forEach(c => {
statsCardNameByKey[c.nameKey] = c.name;
statsCardKeyByName[c.name] = c.nameKey;
});
function renderStatistics() {
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
<!-- 圖表要有文字替代：資料原本只存在每根長條的 title 裡，讀屏軟體完全拿不到。
整張圖當成一張圖片、把十二個月的數字寫進圖說；長條本身純裝飾 -->
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
<!-- canvas 對讀屏是空盒子；同樣的資料旁邊的 .pie-legend 已經以文字列出，藏掉避免重複 -->
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

;
/* patterns.js */
const patternMinorSuits = ['Wands', 'Cups', 'Swords', 'Pentacles'];
function patternBinomTail(n, k, p) {
if (k <= 0) return 1;
if (k > n) return 0;
if (n > 400) {
const mean = n * p;
if (k <= mean) return 1;
return Math.min(1, Math.exp(-2 * (k - mean) * (k - mean) / n));
}
let s = 0;
for (let i = k; i <= n; i++) {
s += insightChoose(n, i) * Math.pow(p, i) * Math.pow(1 - p, n - i);
}
return Math.min(1, s);
}
function patternBinomLowTail(n, k, p) {
return patternBinomTail(n, n - k, 1 - p);
}
const PATTERN_ALPHA = 0.05;
function patternSuitLabel(suit) {
return t((typeof suitNames !== 'undefined' && suitNames[suit]) || suit);
}
function patternCardsOf(reading) {
const out = [];
if (!reading || typeof reading !== 'object') return out;
if (Array.isArray(reading.drawnCards)) {
reading.drawnCards.forEach(c => {
if (c && typeof c === 'object') out.push(c);
});
}
if (reading.bottomCard && typeof reading.bottomCard === 'object') out.push(reading.bottomCard);
return out;
}
function patternTopMinorSuit(counts) {
let suit = null;
let count = 0;
patternMinorSuits.forEach(s => {
const c = counts[s] || 0;
if (c > count) {
suit = s;
count = c;
}
});
return { suit, count };
}
function generatePatterns(history) {
if (!Array.isArray(history)) return [];
const n = history.length;
if (n < 5) {
if (n === 0) {
return [{ tag: t('pattern.none.tag'), text: t('pattern.none.text') }];
}
return [{
tag: t('pattern.building.tag'),
text: t('pattern.building.text', { n: 5 - n })
}];
}
const allCards = [];
history.forEach(r => patternCardsOf(r).forEach(c => allCards.push(c)));
const total = allCards.length;
const out = [];
const suitCounts = {};
let majorCount = 0;
let revCount = 0;
allCards.forEach(c => {
if (c.suit === 'Major Arcana') majorCount++;
else if (patternMinorSuits.includes(c.suit)) suitCounts[c.suit] = (suitCounts[c.suit] || 0) + 1;
if (c.orientation === 'reversed') revCount++;
});
const top = patternTopMinorSuit(suitCounts);
if (top.suit && total) {
const p = Math.min(1, patternBinomTail(total, top.count, 14 / 78) * 4);
const sys = (typeof suitSystem !== 'undefined') ? suitSystem[top.suit] : null;
if (p < PATTERN_ALPHA && sys) {
out.push({
tag: t('pattern.dominant.tag', { suit: patternSuitLabel(top.suit) }),
text: t('pattern.dominant.text', {
suit: patternSuitLabel(top.suit),
k: top.count, total,
exp: (total * 14 / 78).toFixed(1),
pct: Math.round((top.count / total) * 100),
p: insightPct(p),
element: t(SYSTEMS_ELEMENT_KEY[sys.element]),
faculty: t(sys.faculty)
})
});
}
}
const tagStats = new Map();
history.forEach(r => {
if (!r || !Array.isArray(r.tags)) return;
const cards = patternCardsOf(r);
const seen = new Set();
r.tags.forEach(t => {
const name = String(t);
if (!name || seen.has(name)) return;
seen.add(name);
let stat = tagStats.get(name);
if (!stat) {
stat = { readings: 0, cards: 0, suits: {} };
tagStats.set(name, stat);
}
stat.readings++;
cards.forEach(c => {
stat.cards++;
if (patternMinorSuits.includes(c.suit)) stat.suits[c.suit] = (stat.suits[c.suit] || 0) + 1;
});
});
});
const tagFindings = [];
let tagsTested = 0;
tagStats.forEach(stat => { if (stat.readings >= 3 && stat.cards) tagsTested++; });
tagStats.forEach((stat, name) => {
if (stat.readings < 3 || !stat.cards) return;
const best = patternTopMinorSuit(stat.suits);
if (!best.suit) return;
const p = Math.min(1, patternBinomTail(stat.cards, best.count, 14 / 78) * 4 * Math.max(1, tagsTested));
if (p >= PATTERN_ALPHA) return;
tagFindings.push({ name, suit: best.suit, readings: stat.readings, cards: stat.cards, count: best.count, p });
});
tagFindings.sort((a, b) => a.p - b.p);
tagFindings.slice(0, 2).forEach(f => {
const sys = (typeof suitSystem !== 'undefined') ? suitSystem[f.suit] : null;
out.push({
tag: t('pattern.tag.tag', { name: f.name }),
text: t('pattern.tag.text', {
name: f.name,
n: f.readings,
m: f.cards,
k: f.count,
suit: patternSuitLabel(f.suit),
pct: Math.round((f.count / f.cards) * 100),
p: insightPct(f.p),
faculty: sys ? t(sys.faculty) : ''
})
});
});
if (total) {
const pHigh = patternBinomTail(total, revCount, 0.5);
const pLow = patternBinomLowTail(total, revCount, 0.5);
const pct = Math.round((revCount / total) * 100);
if (revCount * 2 > total && pHigh < PATTERN_ALPHA) {
out.push({
tag: t('pattern.reversed.high.tag'),
text: t('pattern.reversed.high.text', { k: revCount, total, pct, p: insightPct(pHigh) })
});
} else if (revCount * 2 < total && pLow < PATTERN_ALPHA) {
out.push({
tag: t('pattern.reversed.low.tag'),
text: t('pattern.reversed.low.text', { k: revCount, total, pct, p: insightPct(pLow) })
});
}
}
const cardCounts = new Map();
allCards.forEach(c => {
if (!c.nameKey) return;
let e = cardCounts.get(c.nameKey);
if (!e) {
e = { name: typeof c.name === 'string' ? c.name : c.nameKey, count: 0 };
cardCounts.set(c.nameKey, e);
}
e.count++;
});
let topCard = null;
let topCardKey = null;
cardCounts.forEach((e, key) => {
if (!topCard || e.count > topCard.count) {
topCard = e;
topCardKey = key;
}
});
if (topCard && total) {
const p = Math.min(1, 78 * patternBinomTail(total, topCard.count, 1 / 78));
if (topCard.count >= 3 && p < PATTERN_ALPHA) {
const meaning = (typeof cardMeanings !== 'undefined' && cardMeanings[topCardKey]) || null;
const keywords = (meaning && Array.isArray(meaning.keywords)) ? meaning.keywords : [];
const kw = keywords.slice(0, 2).join('、');
out.push({
tag: t('pattern.regular.tag'),
text: t(kw ? 'pattern.regular.text' : 'pattern.regular.text.noKeywords',
{ name: topCard.name, n: topCard.count, total, p: insightPct(p), kw })
});
}
}
if (total) {
const pHigh = patternBinomTail(total, majorCount, 22 / 78);
const pLow = patternBinomLowTail(total, majorCount, 22 / 78);
const pct = Math.round((majorCount / total) * 100);
const exp = (total * 22 / 78).toFixed(1);
if (majorCount > total * 22 / 78 && pHigh < PATTERN_ALPHA) {
out.push({
tag: t('pattern.major.high.tag'),
text: t('pattern.major.high.text', { k: majorCount, total, exp, pct, p: insightPct(pHigh) })
});
} else if (majorCount < total * 22 / 78 && pLow < PATTERN_ALPHA) {
out.push({
tag: t('pattern.major.low.tag'),
text: t('pattern.major.low.text', { k: majorCount, total, exp, pct, p: insightPct(pLow) })
});
}
}
const PATTERN_DAY_MS = 86400000;
const now = Date.now();
let last30 = 0;
let prev30 = 0;
history.forEach(r => {
const ts = Number(r && r.timestamp);
if (!Number.isFinite(ts)) return;
const age = now - ts;
if (age < 0) return;
if (age <= 30 * PATTERN_DAY_MS) last30++;
else if (age <= 60 * PATTERN_DAY_MS) prev30++;
});
if (prev30 >= 1 && last30 >= prev30 * 1.5) {
out.push({
tag: t('pattern.pace.tag'),
text: t('pattern.pace.text', { n: last30, prev: prev30 })
});
}
if (!out.length) {
return [{
tag: t('pattern.flat.tag'),
text: t('pattern.flat.text')
}];
}
return out.slice(0, 5);
}
function renderPatternInsights() {
const el = document.getElementById('patternInsights');
if (!el) return;
const history = (typeof readingHistory !== 'undefined' && Array.isArray(readingHistory)) ? readingHistory : [];
const items = generatePatterns(history);
if (!items.length) {
el.innerHTML = '';
return;
}
const sub = history.length ? `<div class="insight-sub">${escapeHTML(t('pattern.panel.sub', { n: history.length }))}</div>` : '';
el.innerHTML = `
<div class="insight-panel">
<div class="insight-title">${escapeHTML(t('pattern.panel.title'))}</div>
${sub}
${items.map(it => `
<div class="insight-item">
<div class="insight-tag">${escapeHTML(it.tag)}</div>
<p class="insight-text">${escapeHTML(it.text)}</p>
</div>
`).join('')}
</div>
`;
}

;
/* database.js */
const debouncedSearch = debounce((filter) => {
renderCardDatabaseFiltered(filter);
}, 300);
document.getElementById('cardSearch').addEventListener('input', (e) => {
debouncedSearch(e.target.value);
});
function renderCardDatabase() {
renderDeckHistory();
renderCardDatabaseFiltered(document.getElementById('cardSearch').value);
}
function renderDeckHistory() {
const block = document.getElementById('deckHistoryBlock');
if (!block) return;
const items = (typeof deckHistory !== 'undefined' && Array.isArray(deckHistory)) ? deckHistory : [];
if (!items.length) {
block.classList.add('hidden');
block.innerHTML = '';
return;
}
block.classList.remove('hidden');
block.innerHTML = items.map(h => `
<div class="deck-history-item">
<div class="deck-history-title">${escapeHTML(h.title || '')}</div>
<p class="deck-history-text">${escapeHTML(h.text || '')}</p>
</div>
`).join('');
}
function renderCardDatabaseFiltered(filter = '') {
const grid = document.getElementById('cardDatabaseGrid');
const q = filter.trim();
const filtered = fullTarotCards.filter(c => {
if (!q) return true;
const m = cardMeanings[c.nameKey];
return c.name.includes(q) ||
c.englishName.toLowerCase().includes(q.toLowerCase()) ||
(m && m.keywords.some(k => k.includes(q)));
});
if (!filtered.length) {
grid.innerHTML = `<div class="history-empty">${escapeHTML(t('db.empty'))}</div>`;
return;
}
grid.innerHTML = filtered.map((c, i) => {
const m = cardMeanings[c.nameKey];
const art = cardThumb(c);
return `
<div class="card-db-item" role="button" tabindex="${i === 0 ? 0 : -1}" data-keynav-item data-suit="${c.suit}" onclick="openCardModal('${c.nameKey}')">
${art ? `<div class="card-db-art">${art}</div>` : ''}
<div class="card-db-number">${escapeHTML(c.number)}</div>
<div class="card-db-name">${escapeHTML(c.name)}</div>
<div class="card-db-english">${escapeHTML(c.englishName)}</div>
${m ? `<div class="card-db-keywords">${m.keywords.map(escapeHTML).join('・')}</div>` : ''}
<span class="card-db-suit">${escapeHTML(t(suitNames[c.suit] || c.suit))}</span>
</div>
`;
}).join('');
}

;
/* learn.js */
const LEARN_PROGRESS_KEY = 'learnProgress';
const LEARN_STREAK_KEY = 'learnStreak';
const LEARN_MODE_KEY = 'learnMode';
const LEARN_SCOPE_KEY = 'learnScope';
const LEARN_MASTERED_AT = 4;
const LEARN_MAX_LEVEL = 5;
const LEARN_QUIZ_TOTAL = 10;
const LEARN_QUIZ_OPTIONS = 4;
const LEARN_SCOPES = ['all', 'Major Arcana', 'Wands', 'Cups', 'Swords', 'Pentacles'];
function learnClampLevel(v) {
const n = Number(v);
if (!Number.isFinite(n)) return 0;
return Math.min(LEARN_MAX_LEVEL, Math.max(0, Math.round(n)));
}
function learnClampCount(v) {
const n = Number(v);
return Number.isFinite(n) && n > 0 ? Math.floor(n) : 0;
}
function loadLearnProgress() {
try {
const parsed = JSON.parse(localStorage.getItem(LEARN_PROGRESS_KEY) || '{}');
if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};
const out = {};
Object.keys(parsed).forEach(k => {
const e = parsed[k];
if (!e || typeof e !== 'object' || Array.isArray(e)) return;
out[k] = {
level: learnClampLevel(e.level),
seen: learnClampCount(e.seen),
correct: learnClampCount(e.correct),
wrong: learnClampCount(e.wrong)
};
});
return out;
} catch {
return {};
}
}
function loadLearnStreak() {
try {
const parsed = JSON.parse(localStorage.getItem(LEARN_STREAK_KEY) || 'null');
if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return { last: '', days: 0, best: 0 };
const days = learnClampCount(parsed.days);
return {
last: typeof parsed.last === 'string' ? parsed.last : '',
days,
best: Math.max(learnClampCount(parsed.best), days)
};
} catch {
return { last: '', days: 0, best: 0 };
}
}
function saveLearnProgress() {
try {
localStorage.setItem(LEARN_PROGRESS_KEY, JSON.stringify(learnProgress));
} catch {}
}
function saveLearnStreak() {
try {
localStorage.setItem(LEARN_STREAK_KEY, JSON.stringify(learnStreak));
} catch {}
}
let learnProgress = loadLearnProgress();
let learnStreak = loadLearnStreak();
let learnMode = localStorage.getItem(LEARN_MODE_KEY) || 'flash';
if (learnMode !== 'flash' && learnMode !== 'quiz') learnMode = 'flash';
let learnScope = localStorage.getItem(LEARN_SCOPE_KEY) || 'all';
if (!LEARN_SCOPES.includes(learnScope)) learnScope = 'all';
let learnCurrentCard = null;
let learnFlipped = false;
let learnSeenCount = 0;
let learnQuiz = null;
function learnDateKey(d = new Date()) {
return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
function learnYesterdayKey() {
const d = new Date();
d.setDate(d.getDate() - 1);
return learnDateKey(d);
}
function touchLearnStreak() {
const today = learnDateKey();
if (learnStreak.last === today) {
if (learnStreak.days < 1) learnStreak.days = 1;
} else {
learnStreak.days = learnStreak.last === learnYesterdayKey() ? learnStreak.days + 1 : 1;
learnStreak.last = today;
}
learnStreak.best = Math.max(learnStreak.best, learnStreak.days);
saveLearnStreak();
}
function learnLevelOf(nameKey) {
const e = learnProgress[nameKey];
return e ? e.level : 0;
}
function learnEntryOf(nameKey) {
if (!learnProgress[nameKey]) learnProgress[nameKey] = { level: 0, seen: 0, correct: 0, wrong: 0 };
return learnProgress[nameKey];
}
function learnRecord(nameKey, ok) {
const e = learnEntryOf(nameKey);
e.seen += 1;
if (ok) {
e.correct += 1;
e.level = Math.min(LEARN_MAX_LEVEL, e.level + 1);
} else {
e.wrong += 1;
e.level = Math.max(0, e.level - 1);
}
saveLearnProgress();
touchLearnStreak();
}
function getLearnPool() {
const base = learnScope === 'all' ? fullTarotCards : fullTarotCards.filter(c => c.suit === learnScope);
return base.filter(c => cardMeanings[c.nameKey]);
}
function pickLearnCard(pool, excludeNameKey) {
if (!pool || !pool.length) return null;
let candidates = pool;
if (pool.length > 1 && excludeNameKey) {
const filtered = pool.filter(c => c.nameKey !== excludeNameKey);
if (filtered.length) candidates = filtered;
}
const weights = candidates.map(c => (LEARN_MAX_LEVEL + 1) - learnLevelOf(c.nameKey));
const total = weights.reduce((a, b) => a + b, 0);
let r = cryptoRandom() * total;
for (let i = 0; i < candidates.length; i++) {
r -= weights[i];
if (r < 0) return candidates[i];
}
return candidates[candidates.length - 1];
}
function learnStreakAlive() {
return learnStreak.days >= 1 &&
(learnStreak.last === learnDateKey() || learnStreak.last === learnYesterdayKey());
}
function renderLearnStreak() {
const el = document.getElementById('learnStreak');
if (!el) return;
const best = learnStreak.best >= 1 ? t('learn.streak.best', { n: learnStreak.best }) : t('learn.streak.none');
if (learnStreakAlive()) {
const doneToday = learnStreak.last === learnDateKey();
el.textContent = t('learn.streak.days', { n: learnStreak.days });
el.title = doneToday ? best : t('learn.streak.continue', { best });
} else {
el.textContent = t('learn.streak.idle');
el.title = best;
}
}
function renderLearnMastery() {
const countEl = document.getElementById('learnMasteryCount');
if (countEl) {
const mastered = fullTarotCards.filter(c => learnLevelOf(c.nameKey) >= LEARN_MASTERED_AT).length;
countEl.textContent = t('learn.mastery.count', { n: mastered, total: fullTarotCards.length });
}
const grid = document.getElementById('learnMasteryGrid');
if (!grid) return;
grid.innerHTML = fullTarotCards.map((c, i) => {
const lv = learnLevelOf(c.nameKey);
const label = t('learn.mastery.cell', { name: c.name, lv, max: LEARN_MAX_LEVEL });
return `<button class="mastery-cell" data-level="${lv}" tabindex="${i === 0 ? 0 : -1}" data-keynav-item aria-label="${escapeHTML(label)}" onclick="openCardModal('${c.nameKey}')"></button>`;
}).join('');
}
function renderLearnFlash() {
const stage = document.getElementById('learnStage');
if (!stage) return;
const pool = getLearnPool();
if (!pool.length) {
stage.innerHTML = `<div class="learn-empty">${escapeHTML(t('learn.empty.noMeaning'))}</div>`;
return;
}
if (!learnCurrentCard || !pool.some(c => c.nameKey === learnCurrentCard.nameKey)) {
learnCurrentCard = pickLearnCard(pool, null);
learnFlipped = false;
}
const card = learnCurrentCard;
const m = cardMeanings[card.nameKey];
const flashArt = cardThumb(card);
const sub = t('card.sub', {
en: card.englishName,
suit: t(suitNames[card.suit] || card.suit),
number: card.number
});
const face = learnFlipped ? `
<div class="flash-back">
<div class="flash-name">${escapeHTML(card.name)}</div>
<div class="flash-sub">${escapeHTML(sub)}</div>
<div class="tags">${m.keywords.map(k => `<span class="tag">${escapeHTML(k)}</span>`).join('')}</div>
<div class="meaning-block">
<div class="meaning-title">${escapeHTML(t('orientation.upright'))}</div>
<p class="meaning-text">${escapeHTML(cardMeaningText(card, 'upright'))}</p>
</div>
<div class="meaning-block">
<div class="meaning-title">${escapeHTML(t('orientation.reversed'))}</div>
<p class="meaning-text">${escapeHTML(cardMeaningText(card, 'reversed'))}</p>
</div>
</div>
` : `
<div class="flash-front">
${flashArt ? `<div class="flash-art" data-suit="${card.suit}">${flashArt}</div>` : ''}
<div class="flash-name">${escapeHTML(card.name)}</div>
<div class="flash-sub">${escapeHTML(sub)}</div>
<div class="flash-hint">${escapeHTML(t('learn.flash.hint'))}</div>
</div>
`;
stage.innerHTML = `
<!-- 🔴 這裡不可以給 aria-label：卡面上的牌名、英文名、花色都在內文裡，掛上 label 會把它們
全部吞掉，讀屏軟體只剩「點一下看牌義」，正面是哪張牌整個消失。
「點一下看牌義」本來就是 .flash-hint 的內文，會被一起唸到，不必再標一次 -->
<div class="flashcard${learnFlipped ? ' flipped' : ''}" id="flashcard"${learnFlipped ? '' : ' role="button" tabindex="0"'}>
${face}
</div>
${learnFlipped ? `
<div class="flash-actions">
<button class="btn btn-tertiary" id="flashHard">${escapeHTML(t('learn.flash.hard'))}</button>
<button class="btn btn-primary" id="flashEasy">${escapeHTML(t('learn.flash.easy'))}</button>
</div>
` : ''}
<div class="flash-progress">${escapeHTML(t('learn.flash.progress', { n: learnSeenCount }))}</div>
`;
const cardEl = document.getElementById('flashcard');
if (cardEl && !learnFlipped) {
cardEl.addEventListener('click', learnFlip);
cardEl.addEventListener('keydown', (e) => {
if (e.key === 'Enter' || e.key === ' ') {
e.preventDefault();
learnFlip();
}
});
}
const hardBtn = document.getElementById('flashHard');
if (hardBtn) hardBtn.addEventListener('click', () => learnRate(false));
const easyBtn = document.getElementById('flashEasy');
if (easyBtn) easyBtn.addEventListener('click', () => learnRate(true));
}
function learnFlip() {
if (learnFlipped) return;
learnFlipped = true;
renderLearnFlash();
}
function learnRate(ok) {
if (!learnCurrentCard) return;
learnRecord(learnCurrentCard.nameKey, ok);
learnSeenCount += 1;
learnCurrentCard = pickLearnCard(getLearnPool(), learnCurrentCard.nameKey);
learnFlipped = false;
renderLearnFlash();
renderLearnMastery();
renderLearnStreak();
}
function learnCandidates(target, pool) {
const inPool = pool.filter(c => c.nameKey !== target.nameKey);
const extra = fullTarotCards.filter(c =>
cardMeanings[c.nameKey] &&
c.nameKey !== target.nameKey &&
!inPool.some(p => p.nameKey === c.nameKey)
);
return shuffle(inPool).concat(shuffle(extra));
}
function buildLearnQuestion(target, pool, type) {
const m = cardMeanings[target.nameKey];
if (!m) return null;
const candidates = learnCandidates(target, pool);
const options = [];
let art = null;
if (type === 'C') {
art = typeof cardThumb === 'function' ? cardThumb(target) : null;
if (!art) type = 'A';
}
if (type === 'A') {
options.push({ text: target.name, correct: true });
for (const c of candidates) {
if (options.length >= LEARN_QUIZ_OPTIONS) break;
if (options.some(o => o.text === c.name)) continue;
options.push({ text: c.name, correct: false });
}
return {
type: 'A',
nameKey: target.nameKey,
prompt: t('learn.quiz.promptKeywords'),
subject: m.keywords.join('・'),
options: shuffle(options),
answered: false,
chosen: -1,
correct: false
};
}
options.push({ text: m.keywords.join('・'), correct: true });
for (const c of candidates) {
if (options.length >= LEARN_QUIZ_OPTIONS) break;
const cm = cardMeanings[c.nameKey];
if (!cm) continue;
const text = cm.keywords.join('・');
if (options.some(o => o.text === text)) continue;
options.push({ text, correct: false });
}
if (type === 'C') {
const lore = typeof cardLore !== 'undefined' ? cardLore[target.nameKey] : null;
const desc = [
lore && lore.symbolism ? lore.symbolism : '',
visualStyle === 'api' ? target.englishName : ''
].filter(Boolean).join('　');
return {
type: 'C',
nameKey: target.nameKey,
prompt: t('learn.quiz.promptArt'),
subject: '',
art: `<div class="quiz-art" data-suit="${target.suit}"${desc ? ` role="img" aria-label="${escapeHTML(desc)}"` : ''}>${art}</div>`,
options: shuffle(options),
answered: false,
chosen: -1,
correct: false
};
}
return {
type: 'B',
nameKey: target.nameKey,
prompt: t('learn.quiz.promptCard', { name: target.name }),
subject: '',
options: shuffle(options),
answered: false,
chosen: -1,
correct: false
};
}
function buildLearnQuiz() {
const pool = getLearnPool();
if (pool.length < LEARN_QUIZ_OPTIONS) return null;
const targets = [];
while (targets.length < LEARN_QUIZ_TOTAL) {
const remaining = pool.filter(c => !targets.some(t => t.nameKey === c.nameKey));
if (!remaining.length) break;
const pick = pickLearnCard(remaining, null);
if (!pick) break;
targets.push(pick);
}
if (!targets.length) return null;
const nB = Math.floor(targets.length / 3);
const nC = Math.floor(targets.length / 3);
const typePool = [];
for (let i = 0; i < targets.length; i++) {
typePool.push(i < nC ? 'C' : (i < nC + nB ? 'B' : 'A'));
}
const types = shuffle(typePool);
const questions = targets
.map((t, i) => buildLearnQuestion(t, pool, types[i]))
.filter(Boolean);
if (!questions.length) return null;
return { questions, index: 0, correctCount: 0, wrongKeys: [], finished: false };
}
function renderLearnQuiz() {
const stage = document.getElementById('learnStage');
if (!stage) return;
if (getLearnPool().length < LEARN_QUIZ_OPTIONS) {
stage.innerHTML = `<div class="learn-empty">${escapeHTML(t('learn.empty.tooFew'))}</div>`;
return;
}
if (!learnQuiz) learnQuiz = buildLearnQuiz();
if (!learnQuiz) {
stage.innerHTML = `<div class="learn-empty">${escapeHTML(t('learn.empty.tooFew'))}</div>`;
return;
}
if (learnQuiz.finished) {
renderLearnQuizResult();
return;
}
const total = learnQuiz.questions.length;
const q = learnQuiz.questions[learnQuiz.index];
const isLast = learnQuiz.index >= total - 1;
stage.innerHTML = `
<div class="quiz-progress">${escapeHTML(t('learn.quiz.progress', { n: learnQuiz.index + 1, total }))}</div>
<div class="quiz-card">
<div class="quiz-prompt">${escapeHTML(q.prompt)}</div>
${q.subject ? `<div class="quiz-subject">${escapeHTML(q.subject)}</div>` : ''}
${q.art || ''}
<div class="quiz-options" data-keynav="grid">
${q.options.map((o, i) => {
let cls = 'quiz-option';
if (q.answered) {
if (o.correct) cls += ' correct';
else if (i === q.chosen) cls += ' wrong';
}
return `<button class="${cls}" data-i="${i}" tabindex="${i === 0 ? 0 : -1}" data-keynav-item${q.answered ? ' disabled' : ''}>${escapeHTML(o.text)}</button>`;
}).join('')}
</div>
</div>
${q.answered ? `
<div class="quiz-actions">
<button class="btn btn-primary btn-sm" id="quizNext">${escapeHTML(t(isLast ? 'learn.quiz.toResult' : 'learn.quiz.next'))}</button>
</div>
` : ''}
`;
const optionsWrap = stage.querySelector('.quiz-options');
if (optionsWrap && !q.answered) {
optionsWrap.addEventListener('click', (e) => {
const btn = e.target.closest('.quiz-option');
if (!btn || !optionsWrap.contains(btn)) return;
learnAnswer(Number(btn.dataset.i));
});
}
const nextBtn = document.getElementById('quizNext');
if (nextBtn) nextBtn.addEventListener('click', learnQuizNext);
}
function learnAnswer(i) {
if (!learnQuiz) return;
const q = learnQuiz.questions[learnQuiz.index];
if (!q || q.answered || !q.options[i]) return;
q.answered = true;
q.chosen = i;
q.correct = !!q.options[i].correct;
if (q.correct) learnQuiz.correctCount += 1;
else if (!learnQuiz.wrongKeys.includes(q.nameKey)) learnQuiz.wrongKeys.push(q.nameKey);
learnRecord(q.nameKey, q.correct);
renderLearnQuiz();
renderLearnStreak();
}
function learnQuizNext() {
if (!learnQuiz) return;
if (learnQuiz.index >= learnQuiz.questions.length - 1) {
learnQuiz.finished = true;
renderLearnQuiz();
renderLearnMastery();
} else {
learnQuiz.index += 1;
renderLearnQuiz();
}
}
function renderLearnQuizResult() {
const stage = document.getElementById('learnStage');
if (!stage || !learnQuiz) return;
const total = learnQuiz.questions.length;
const correct = learnQuiz.correctCount;
const pct = total ? Math.round((correct / total) * 100) : 0;
const wrongItems = learnQuiz.wrongKeys
.map(k => fullTarotCards.find(c => c.nameKey === k))
.filter(Boolean);
stage.innerHTML = `
<div class="quiz-result">
<div class="quiz-result-score">${escapeHTML(t('learn.quiz.score', { n: correct, total }))}</div>
<div class="quiz-result-rate">${escapeHTML(t('learn.quiz.rate', { pct }))}</div>
${wrongItems.length ? `
<div class="quiz-result-wrong">
<div class="quiz-result-wrong-title">${escapeHTML(t('learn.quiz.reviewTitle'))}</div>
<div class="tags" data-keynav="grid">
${wrongItems.map((c, i) => `<span class="tag" role="button" tabindex="${i === 0 ? 0 : -1}" data-keynav-item onclick="openCardModal('${c.nameKey}', 'upright')">${escapeHTML(c.name)}</span>`).join('')}
</div>
</div>
` : `<div class="quiz-result-perfect">${escapeHTML(t('learn.quiz.perfect'))}</div>`}
<div class="btn-group quiz-result-actions">
<button class="btn btn-primary btn-sm" id="quizAgain">${escapeHTML(t('learn.quiz.again'))}</button>
<button class="btn btn-tertiary btn-sm" id="quizToFlash">${escapeHTML(t('learn.quiz.toFlash'))}</button>
</div>
</div>
`;
const againBtn = document.getElementById('quizAgain');
if (againBtn) {
againBtn.addEventListener('click', () => {
learnQuiz = null;
renderLearnQuiz();
});
}
const toFlashBtn = document.getElementById('quizToFlash');
if (toFlashBtn) toFlashBtn.addEventListener('click', () => setLearnMode('flash'));
}
function syncLearnSeg() {
document.querySelectorAll('#learnModeSeg .seg-item').forEach(b => {
const on = b.dataset.mode === learnMode;
b.classList.toggle('active', on);
b.setAttribute('aria-selected', on);
b.tabIndex = on ? 0 : -1;
});
}
function renderLearnStage() {
if (learnMode === 'quiz') renderLearnQuiz();
else renderLearnFlash();
}
function setLearnMode(mode) {
if (mode !== 'flash' && mode !== 'quiz') return;
learnMode = mode;
try { localStorage.setItem(LEARN_MODE_KEY, mode); } catch {}
syncLearnSeg();
renderLearnStage();
}
function renderLearn() {
syncLearnSeg();
renderLearnStreak();
renderLearnStage();
renderLearnMastery();
}
const learnModeSegEl = document.getElementById('learnModeSeg');
if (learnModeSegEl) {
learnModeSegEl.addEventListener('click', (e) => {
const btn = e.target.closest('.seg-item');
if (!btn || !learnModeSegEl.contains(btn)) return;
if (btn.dataset.mode === learnMode) return;
setLearnMode(btn.dataset.mode);
});
}
const learnScopeEl = document.getElementById('learnScope');
if (learnScopeEl) {
learnScopeEl.value = learnScope;
learnScopeEl.addEventListener('change', () => {
learnScope = LEARN_SCOPES.includes(learnScopeEl.value) ? learnScopeEl.value : 'all';
try { localStorage.setItem(LEARN_SCOPE_KEY, learnScope); } catch {}
learnCurrentCard = null;
learnFlipped = false;
learnSeenCount = 0;
learnQuiz = null;
renderLearnStage();
renderLearnMastery();
});
}
const learnResetBtn = document.getElementById('learnReset');
if (learnResetBtn) {
learnResetBtn.addEventListener('click', async () => {
const ok = await openConfirm({
title: t('confirm.learnReset.title'),
message: t('confirm.learnReset.message'),
confirmText: t('confirm.learnReset.ok'),
danger: true
});
if (!ok) return;
try {
localStorage.removeItem(LEARN_PROGRESS_KEY);
localStorage.removeItem(LEARN_STREAK_KEY);
} catch {}
learnProgress = {};
learnStreak = { last: '', days: 0, best: 0 };
learnCurrentCard = null;
learnFlipped = false;
learnSeenCount = 0;
learnQuiz = null;
renderLearn();
showToast(t('toast.learnReset'));
});
}

;
/* profile.js */
const PROFILE_BIRTHDAY_KEY = 'birthday';
const PROFILE_SHICHEN_KEY = 'birthShichen';
const PROFILE_SHICHEN_UNKNOWN = 12;
const PROFILE_POSITIONS = ['origin', 'inheritance', 'self', 'legacy', 'return'];
const profilePositionNames = {
origin: 'profile.pos.origin', inheritance: 'profile.pos.inheritance', self: 'profile.pos.self',
legacy: 'profile.pos.legacy', return: 'profile.pos.return'
};
const profilePositionNamesEn = {
origin: 'Origin', inheritance: 'Inheritance', self: 'Self', legacy: 'Legacy', return: 'Return'
};
const PROFILE_POS = 5;
const PROFILE_M = 78n * 77n * 76n * 75n * 74n * 32n;
const PROFILE_K = 982451653n;
function profileDayIndex(y, m, d) {
const dt = new Date(Date.UTC(2000, m - 1, d));
dt.setUTCFullYear(y);
return Math.floor(dt.getTime() / 86400000);
}
function profileInput(y, m, d, shichen) {
return BigInt(profileDayIndex(y, m, d)) * 13n + BigInt(shichen);
}
function profileDeal(n) {
let x = ((n % PROFILE_M) + PROFILE_M) % PROFILE_M;
x = (x * PROFILE_K) % PROFILE_M;
const pool = Array.from({ length: 78 }, (_, i) => i);
const out = [];
for (let i = 0; i < PROFILE_POS; i++) {
const left = BigInt(pool.length);
const j = Number(x % left); x /= left;
const card = pool.splice(j, 1)[0];
const reversed = Number(x % 2n); x /= 2n;
out.push({ index: card, orientation: reversed ? 'reversed' : 'upright' });
}
return out;
}
function profileParseBirthday(str) {
if (typeof str !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(str)) return null;
const y = Number(str.slice(0, 4));
const m = Number(str.slice(5, 7));
const d = Number(str.slice(8, 10));
if (y < 1) return null;
if (m < 1 || m > 12) return null;
if (d < 1 || d > 31) return null;
const dt = new Date(2000, m - 1, d);
dt.setFullYear(y);
if (dt.getFullYear() !== y || dt.getMonth() !== m - 1 || dt.getDate() !== d) return null;
const today = new Date();
today.setHours(0, 0, 0, 0);
if (dt > today) return null;
return { y, m, d };
}
function profileParseShichen(str) {
if (typeof str !== 'string' || !/^(?:[0-9]|1[0-2])$/.test(str)) return null;
return Number(str);
}
function profileComputeCards(str, shichen) {
const parsed = profileParseBirthday(str);
if (!parsed) return null;
const sc = Number.isInteger(shichen) && shichen >= 0 && shichen <= PROFILE_SHICHEN_UNKNOWN
? shichen
: PROFILE_SHICHEN_UNKNOWN;
return profileDeal(profileInput(parsed.y, parsed.m, parsed.d, sc))
.map((dealt, i) => ({
position: PROFILE_POSITIONS[i],
card: fullTarotCards[dealt.index],
orientation: dealt.orientation
}))
.filter(entry => entry.card);
}
function profileGetBirthday() {
try {
const v = localStorage.getItem(PROFILE_BIRTHDAY_KEY);
return profileParseBirthday(v) ? v : '';
} catch {
return '';
}
}
function profileSetBirthday(value) {
try {
if (value) localStorage.setItem(PROFILE_BIRTHDAY_KEY, value);
else localStorage.removeItem(PROFILE_BIRTHDAY_KEY);
} catch {}
}
function profileGetShichen() {
try {
const v = profileParseShichen(localStorage.getItem(PROFILE_SHICHEN_KEY));
return v === null ? PROFILE_SHICHEN_UNKNOWN : v;
} catch {
return PROFILE_SHICHEN_UNKNOWN;
}
}
function profileSetShichen(value) {
try {
localStorage.setItem(PROFILE_SHICHEN_KEY, String(value));
} catch {}
}
function profileCurrentCards() {
return profileComputeCards(profileGetBirthday(), profileGetShichen());
}
function renderProfilePreview() {
const el = document.getElementById('profilePreview');
if (!el) return;
const entries = profileCurrentCards();
if (!entries || !entries.length) {
el.classList.add('empty');
el.textContent = t('profile.empty');
return;
}
el.classList.remove('empty');
el.textContent = entries
.map(e => t('profile.preview.item', {
pos: t(profilePositionNames[e.position]),
name: e.card.name,
ori: orientationNames[e.orientation] ? t(orientationNames[e.orientation]) : ''
}))
.join(' · ');
}
function renderProfileCards() {
const el = document.getElementById('profileCards');
if (!el) return;
const entries = profileCurrentCards();
if (!entries || !entries.length) {
el.classList.add('hidden');
el.innerHTML = '';
return;
}
el.innerHTML = entries.map(({ position, card, orientation }, i) => {
const art = cardThumb(card, orientation === 'reversed' ? 'reversed' : '');
const ori = t(orientationNames[orientation] || orientation);
return `
<button class="profile-chip" data-suit="${escapeHTML(card.suit)}" tabindex="${i === 0 ? 0 : -1}" data-keynav-item onclick="openCardModal('${card.nameKey}', '${orientation}')">
${art ? `<span class="profile-chip-art">${art}</span>` : ''}
<span class="profile-chip-text">
<span class="profile-chip-label">${escapeHTML(t(profilePositionNames[position] || position))}</span>
<span class="profile-chip-name">${escapeHTML(card.name)}<span class="profile-chip-ori">${escapeHTML(ori)}</span></span>
</span>
</button>
`;
}).join('');
el.classList.remove('hidden');
}
function renderProfile() {
renderProfilePreview();
renderProfileCards();
}
const profileBirthdayInput = document.getElementById('birthdayInput');
const profileShichenInput = document.getElementById('shichenInput');
const profileClearBirthdayBtn = document.getElementById('clearBirthday');
if (profileBirthdayInput) {
const today = new Date();
const pad = (v) => String(v).padStart(2, '0');
profileBirthdayInput.max = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;
profileBirthdayInput.value = profileGetBirthday();
profileBirthdayInput.addEventListener('change', () => {
const value = profileBirthdayInput.value;
if (!value) {
profileSetBirthday('');
renderProfile();
return;
}
if (!profileParseBirthday(value)) {
showToast(t('toast.birthdayInvalid'), 'error');
return;
}
profileSetBirthday(value);
renderProfile();
showToast(t('toast.profileUpdated'));
});
}
if (profileShichenInput) {
profileShichenInput.value = String(profileGetShichen());
profileShichenInput.addEventListener('change', () => {
const v = profileParseShichen(profileShichenInput.value);
profileSetShichen(v === null ? PROFILE_SHICHEN_UNKNOWN : v);
renderProfile();
if (profileGetBirthday()) showToast(t('toast.profileUpdated'));
});
}
if (profileClearBirthdayBtn) {
profileClearBirthdayBtn.addEventListener('click', () => {
profileSetBirthday('');
if (profileBirthdayInput) profileBirthdayInput.value = '';
renderProfile();
showToast(t('toast.birthdayCleared'));
});
}
renderProfile();

;
/* settings.js */
function isDarkActive() {
const root = document.documentElement;
return root.classList.contains('dark') || root.classList.contains('neon') ||
(!root.classList.contains('light') && window.matchMedia('(prefers-color-scheme: dark)').matches);
}
function updateThemeColor() {
const bg = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim();
document.querySelector('meta[name="theme-color"]').setAttribute('content', bg);
}
function updateThemeIcons() {
const dark = isDarkActive();
iconSun.style.display = dark ? 'block' : 'none';
iconMoon.style.display = dark ? 'none' : 'block';
themeToggle.setAttribute('aria-label', t(dark ? 'app.themeToggle.toLight' : 'app.themeToggle.toDark'));
}
function syncThemeRadios() {
const pref = localStorage.getItem('theme') || 'auto';
document.querySelectorAll('input[name="themePref"]').forEach(r => {
r.checked = r.value === pref;
});
}
function applyThemePref(pref) {
const root = document.documentElement;
root.classList.remove('light', 'dark', 'neon');
if (pref === 'light' || pref === 'dark' || pref === 'neon') {
root.classList.add(pref);
localStorage.setItem('theme', pref);
} else {
localStorage.removeItem('theme');
}
updateThemeIcons();
updateThemeColor();
syncThemeRadios();
if (currentTab === 'statistics') renderStatistics();
}
function toggleTheme() {
applyThemePref(isDarkActive() ? 'light' : 'dark');
}
const savedTheme = localStorage.getItem('theme');
if (['light', 'dark', 'neon'].includes(savedTheme)) {
document.documentElement.classList.add(savedTheme);
}
updateThemeIcons();
updateThemeColor();
syncThemeRadios();
themeToggle.addEventListener('click', toggleTheme);
document.querySelectorAll('input[name="themePref"]').forEach(radio => {
radio.addEventListener('change', (e) => {
if (e.target.checked) applyThemePref(e.target.value);
});
});
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
updateThemeIcons();
updateThemeColor();
});
function updateDataStats() {
const el = document.getElementById('dataStats');
if (!el) return;
const raw = localStorage.getItem('readingHistory') || '[]';
const kb = (new Blob([raw]).size / 1024).toFixed(1);
el.textContent = t('settings.data.stats', { n: readingHistory.length, max: 100, kb });
}
document.getElementById('clearAllData').addEventListener('click', async () => {
const ok = await openConfirm({
title: t('confirm.clearAll.title'),
message: t('confirm.clearAll.message'),
confirmText: t('confirm.clearAll.ok'),
danger: true
});
if (!ok) return;
localStorage.clear();
location.reload();
});
function buildExportData() {
const prefs = {};
['theme', 'interactiveDraw', 'showSpreadInfo', 'showShortcuts', 'learnMode', 'learnScope', 'birthday', 'birthShichen'].forEach(k => {
const v = localStorage.getItem(k);
if (v !== null) prefs[k] = v;
});
return {
version: (typeof changelog !== 'undefined' && Array.isArray(changelog) && changelog[0])
? changelog[0].version
: null,
exportDate: new Date().toISOString(),
history: readingHistory,
visualStyle: visualStyle,
prefs,
learn: {
progress: typeof learnProgress !== 'undefined' ? learnProgress : {},
streak: typeof learnStreak !== 'undefined' ? learnStreak : null
}
};
}
document.getElementById('exportData').addEventListener('click', () => {
const data = buildExportData();
const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = `tarot-backup-${Date.now()}.json`;
a.click();
URL.revokeObjectURL(url);
showToast(t('toast.exported'));
});
const IMPORT_PREF_RULES = {
theme: v => ['light', 'dark', 'neon'].includes(v),
interactiveDraw: v => v === 'true' || v === 'false',
showSpreadInfo: v => v === 'true' || v === 'false',
showShortcuts: v => v === 'true' || v === 'false',
learnMode: v => ['flash', 'quiz'].includes(v),
learnScope: v => typeof LEARN_SCOPES !== 'undefined' && LEARN_SCOPES.includes(v),
birthday: v => typeof profileParseBirthday === 'function' && !!profileParseBirthday(v),
birthShichen: v => typeof profileParseShichen === 'function' && profileParseShichen(v) !== null
};
function applyImportedExtras(data) {
let applied = 0;
if (data.prefs && typeof data.prefs === 'object') {
Object.entries(IMPORT_PREF_RULES).forEach(([key, ok]) => {
const v = data.prefs[key];
if (typeof v === 'string' && ok(v)) { localStorage.setItem(key, v); applied++; }
});
}
if (data.learn && typeof data.learn === 'object' && typeof loadLearnProgress === 'function') {
if (data.learn.progress && typeof data.learn.progress === 'object' && !Array.isArray(data.learn.progress)) {
localStorage.setItem(LEARN_PROGRESS_KEY, JSON.stringify(data.learn.progress));
learnProgress = loadLearnProgress();
applied++;
}
if (data.learn.streak && typeof data.learn.streak === 'object') {
localStorage.setItem(LEARN_STREAK_KEY, JSON.stringify(data.learn.streak));
learnStreak = loadLearnStreak();
applied++;
}
}
if (!applied) return 0;
applyThemePref(localStorage.getItem('theme') || 'auto');
if (typeof learnMode !== 'undefined') learnMode = localStorage.getItem(LEARN_MODE_KEY) || 'flash';
if (typeof learnScope !== 'undefined') learnScope = localStorage.getItem(LEARN_SCOPE_KEY) || 'all';
if (typeof shortcutsEnabled !== 'undefined') shortcutsEnabled = localStorage.getItem('showShortcuts') !== 'false';
const idc = document.getElementById('interactiveDraw');
if (idc) idc.checked = localStorage.getItem('interactiveDraw') !== 'false';
if (typeof showSpreadInfoCheckbox !== 'undefined' && showSpreadInfoCheckbox) {
showSpreadInfoCheckbox.checked = localStorage.getItem('showSpreadInfo') !== 'false';
if (typeof updateSpreadInfo === 'function') updateSpreadInfo();
}
if (typeof showShortcutsCheckbox !== 'undefined' && showShortcutsCheckbox) {
showShortcutsCheckbox.checked = localStorage.getItem('showShortcuts') !== 'false';
}
if (typeof profileBirthdayInput !== 'undefined' && profileBirthdayInput) {
profileBirthdayInput.value = localStorage.getItem('birthday') || '';
}
if (typeof profileShichenInput !== 'undefined' && profileShichenInput && typeof profileGetShichen === 'function') {
profileShichenInput.value = String(profileGetShichen());
}
if (typeof renderProfile === 'function') renderProfile();
return applied;
}
document.getElementById('importData').addEventListener('click', () => {
const input = document.createElement('input');
input.type = 'file';
input.accept = '.json';
input.onchange = (e) => {
const file = e.target.files[0];
if (!file) return;
const reader = new FileReader();
reader.onload = async (e) => {
try {
const data = JSON.parse(e.target.result);
if (data.history && Array.isArray(data.history)) {
const incoming = data.history.map(normalizeReading).filter(Boolean).slice(0, 100);
const ok = await openConfirm({
title: t('confirm.import.title'),
message: t('confirm.import.message', { n: incoming.length, current: readingHistory.length }),
confirmText: t('confirm.import.ok'),
danger: true
});
if (!ok) return;
readingHistory = incoming;
saveHistory();
if (['text', 'api', 'line'].includes(data.visualStyle)) {
setVisualStyle(data.visualStyle);
}
const extras = applyImportedExtras(data);
updateDataStats();
showToast(extras
? t('toast.imported.withPrefs', { n: incoming.length, prefs: extras })
: t('toast.imported', { n: incoming.length }));
} else {
showToast(t('toast.importBadFormat'), 'error');
}
} catch {
showToast(t('toast.importParseFailed'), 'error');
}
};
reader.readAsText(file);
};
input.click();
});

;
/* main.js */
const KEYNAV_ITEM = '[data-keynav-item]';
const KEYNAV_ARROWS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
let keyNavRects = new WeakMap();
['resize', 'scroll'].forEach(ev => {
window.addEventListener(ev, () => { keyNavRects = new WeakMap(); }, { passive: true });
});
function keyNavRect(el) {
let r = keyNavRects.get(el);
if (r) return r;
const b = el.getBoundingClientRect();
r = { cx: b.left + b.width / 2, cy: b.top + b.height / 2 };
keyNavRects.set(el, r);
return r;
}
function keyNavVisible(el) {
if (!(el.offsetWidth || el.offsetHeight || el.getClientRects().length)) return false;
const cs = getComputedStyle(el);
return cs.visibility !== 'hidden' && cs.display !== 'none';
}
function keyNavItems(group) {
return Array.from(group.querySelectorAll(KEYNAV_ITEM)).filter(el => !el.disabled && keyNavVisible(el));
}
function keyNavBest(current, key, items) {
const cur = keyNavRect(current);
const vertical = key === 'ArrowUp' || key === 'ArrowDown';
const forward = key === 'ArrowDown' || key === 'ArrowRight';
let best = null;
let bestScore = Infinity;
for (const el of items) {
if (el === current) continue;
const r = keyNavRect(el);
const primary = vertical ? r.cy - cur.cy : r.cx - cur.cx;
const secondary = Math.abs(vertical ? r.cx - cur.cx : r.cy - cur.cy);
if (forward ? primary <= 0 : primary >= 0) continue;
const score = Math.abs(primary) + (secondary < 10 ? 0 : secondary * 0.3);
if (score < bestScore) { bestScore = score; best = el; }
}
return best;
}
function focusKeyNavItem(items, target) {
items.forEach(el => { el.tabIndex = el === target ? 0 : -1; });
target.focus({ preventScroll: true });
const b = target.getBoundingClientRect();
const m = 24;
if (b.top < m || b.bottom > window.innerHeight - m || b.left < m || b.right > window.innerWidth - m) {
target.scrollIntoView({ block: 'nearest', inline: 'nearest' });
}
}
function onKeyNavKeydown(e) {
if (e.altKey || e.ctrlKey || e.metaKey || e.defaultPrevented) return;
const item = e.target.closest && e.target.closest(KEYNAV_ITEM);
if (!item) return;
const group = item.closest('[data-keynav]');
if (!group) return;
const mode = group.dataset.keynav;
const items = keyNavItems(group);
if (items.indexOf(item) < 0) return;
let next = null;
if (e.key === 'Home') next = items[0];
else if (e.key === 'End') next = items[items.length - 1];
else if (KEYNAV_ARROWS.includes(e.key)) {
if (mode === 'list' && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) return;
if (mode === 'tablist' && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) return;
next = keyNavBest(item, e.key, items);
if (!next && mode !== 'grid') {
next = (e.key === 'ArrowDown' || e.key === 'ArrowRight') ? items[0] : items[items.length - 1];
}
} else return;
if (!next || next === item) return;
e.preventDefault();
focusKeyNavItem(items, next);
if (mode === 'tablist') next.click();
}
document.addEventListener('keydown', onKeyNavKeydown);
document.querySelectorAll('.tab').forEach(tab => {
tab.addEventListener('click', () => switchTab(tab.dataset.tab));
});
function switchTab(tabName) {
currentTab = tabName;
localStorage.setItem('tab', tabName);
document.querySelectorAll('.tab').forEach(t => {
const on = t.dataset.tab === tabName;
t.classList.toggle('active', on);
t.setAttribute('aria-selected', on);
t.tabIndex = on ? 0 : -1;
});
document.querySelectorAll('.tab-content').forEach(tc => {
tc.classList.toggle('hidden', tc.id !== 'tab' + tabName.charAt(0).toUpperCase() + tabName.slice(1));
});
document.title = tabName === 'reading' ? t('app.title') : `${t('tab.' + tabName)} · ${t('app.title')}`;
if (tabName === 'history') renderHistory();
if (tabName === 'statistics') {
renderStatistics();
if (typeof renderPatternInsights === 'function') renderPatternInsights();
}
if (tabName === 'database') renderCardDatabase();
if (tabName === 'learn') renderLearn();
if (tabName === 'settings') updateDataStats();
}
function updateSpreadInfo() {
const spreadType = spreadTypeEl.value;
const spread = spreads[spreadType];
const showInfo = showSpreadInfoCheckbox.checked;
syncSpreadTrigger();
if (!showInfo) {
spreadInfoEl.classList.add('hidden');
return;
}
spreadInfoEl.classList.remove('hidden');
document.getElementById('spreadInfoContent').textContent = t(spread.description);
document.getElementById('spreadPositionsList').innerHTML = spread.positions.map((pos, idx) =>
`<div class="spread-position-item">
<span class="spread-position-num">${idx + 1}</span>
<span>${escapeHTML(t(pos))}</span>
</div>`
).join('');
}
showSpreadInfoCheckbox.checked = localStorage.getItem('showSpreadInfo') !== 'false';
spreadTypeEl.addEventListener('change', updateSpreadInfo);
showSpreadInfoCheckbox.addEventListener('change', () => {
localStorage.setItem('showSpreadInfo', showSpreadInfoCheckbox.checked);
updateSpreadInfo();
});
const spreadTriggerEl = document.getElementById('spreadTypeButton');
const spreadModalEl = document.getElementById('spreadModal');
const spreadPickerEl = document.getElementById('spreadPicker');
const SPREAD_CHECK_ICON = '<svg class="spread-option-check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 011.04-.207z" clip-rule="evenodd"/></svg>';
function syncSpreadTrigger() {
const opt = spreadTypeEl.options[spreadTypeEl.selectedIndex];
spreadTriggerEl.textContent = opt ? opt.textContent : '';
}
function spreadOptionHTML(opt) {
const spread = typeof spreads !== 'undefined' ? spreads[opt.value] : null;
const count = spread && Array.isArray(spread.positions) ? spread.positions.length : null;
const showDesc = !showSpreadInfoCheckbox || showSpreadInfoCheckbox.checked;
const desc = showDesc && spread && spread.description ? spread.description : '';
const selected = opt.value === spreadTypeEl.value;
return `<button type="button" class="spread-option" role="option" aria-selected="${selected}" tabindex="${selected ? 0 : -1}" data-keynav-item data-value="${escapeHTML(opt.value)}">
<span class="spread-option-text">
<span class="spread-option-head">
<span class="spread-option-name">${escapeHTML(opt.textContent)}</span>
${count !== null ? `<span class="spread-option-count">${escapeHTML(t('spread.picker.count', { n: count }))}</span>` : ''}
</span>
${desc ? `<span class="spread-option-desc">${escapeHTML(t(desc))}</span>` : ''}
</span>
${SPREAD_CHECK_ICON}
</button>`;
}
function buildSpreadPicker() {
let groupIdx = 0;
spreadPickerEl.innerHTML = Array.from(spreadTypeEl.children).map(node => {
if (node.tagName === 'OPTGROUP') {
const titleId = `spreadGroup${groupIdx++}`;
const rows = Array.from(node.children).map(spreadOptionHTML).join('');
return `<div class="spread-picker-group" role="group" aria-labelledby="${titleId}">
<div class="spread-picker-group-title" id="${titleId}">${escapeHTML(t(node.label))}</div>
${rows}
</div>`;
}
if (node.tagName === 'OPTION') return spreadOptionHTML(node);
return '';
}).join('');
}
function openSpreadPicker() {
buildSpreadPicker();
spreadModalEl.classList.add('show');
spreadTriggerEl.setAttribute('aria-expanded', 'true');
}
function closeSpreadPicker() {
spreadModalEl.classList.remove('show');
spreadTriggerEl.setAttribute('aria-expanded', 'false');
}
spreadTriggerEl.addEventListener('click', openSpreadPicker);
document.getElementById('spreadModalClose').addEventListener('click', closeSpreadPicker);
document.getElementById('spreadModalCancel').addEventListener('click', closeSpreadPicker);
spreadPickerEl.addEventListener('click', (e) => {
const row = e.target.closest('.spread-option');
if (!row) return;
spreadTypeEl.value = row.dataset.value;
spreadTypeEl.dispatchEvent(new Event('change'));
closeSpreadPicker();
});
const interactiveDrawCheckbox = document.getElementById('interactiveDraw');
if (interactiveDrawCheckbox) {
interactiveDrawCheckbox.checked = localStorage.getItem('interactiveDraw') !== 'false';
interactiveDrawCheckbox.addEventListener('change', (e) => {
localStorage.setItem('interactiveDraw', e.target.checked);
});
}
const MODAL_BG_REGIONS = '.app-header, .hero, .container, .app-footer';
const MODAL_FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
let modalReturnFocus = null;
function modalFocusables(modal) {
return Array.from(modal.querySelectorAll(MODAL_FOCUSABLE)).filter(el => el.offsetParent !== null);
}
function trapModalTab(e) {
if (e.key !== 'Tab') return;
const modal = document.querySelector('.modal-overlay.show .modal');
if (!modal) return;
const items = modalFocusables(modal);
if (!items.length) return;
const first = items[0], last = items[items.length - 1];
if (!modal.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
else if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
}
function onModalOpen(overlay) {
const ae = document.activeElement;
modalReturnFocus = (ae && ae.closest && !ae.closest('.modal-overlay')) ? ae : null;
document.body.style.overflow = 'hidden';
document.addEventListener('keydown', trapModalTab, true);
const modal = overlay.querySelector('.modal');
if (!modal) return;
const wanted = overlay.dataset.autofocus && modal.querySelector(overlay.dataset.autofocus);
const target = wanted || modalFocusables(modal)[0];
if (target) {
target.focus();
if (document.activeElement !== target) queueMicrotask(() => {
if (overlay.classList.contains('show') && !modal.contains(document.activeElement)) target.focus();
});
}
document.querySelectorAll(MODAL_BG_REGIONS).forEach(r => { r.inert = true; });
}
function onModalClose() {
if (document.querySelector('.modal-overlay.show')) return;
document.body.style.overflow = '';
document.querySelectorAll(MODAL_BG_REGIONS).forEach(r => { r.inert = false; });
document.removeEventListener('keydown', trapModalTab, true);
if (modalReturnFocus && document.contains(modalReturnFocus)) modalReturnFocus.focus();
modalReturnFocus = null;
}
function dismissModal(overlay) {
if (!overlay || !overlay.classList.contains('show')) return;
const fn = overlay.dataset.close;
if (fn && typeof window[fn] === 'function') window[fn]();
else overlay.classList.remove('show');
}
document.addEventListener('keydown', (e) => {
if (e.key !== 'Escape') return;
if (e.isComposing) return;
const open = document.querySelectorAll('.modal-overlay.show');
if (!open.length) return;
e.preventDefault();
dismissModal(open[open.length - 1]);
});
let shortcutsEnabled = localStorage.getItem('showShortcuts') !== 'false';
if (showShortcutsCheckbox) {
showShortcutsCheckbox.checked = shortcutsEnabled;
showShortcutsCheckbox.addEventListener('change', (e) => {
shortcutsEnabled = e.target.checked;
localStorage.setItem('showShortcuts', shortcutsEnabled);
});
}
document.addEventListener('keydown', (e) => {
if (!shortcutsEnabled) return;
if (document.querySelector('.modal-overlay.show')) return;
if (e.target.closest && e.target.closest('input, textarea, select, button, a, [role="button"]')) return;
switch (e.key.toLowerCase()) {
case ' ':
e.preventDefault();
if (currentTab === 'reading' && !readBtn.disabled) performReading();
break;
case 't':
e.preventDefault();
toggleTheme();
break;
case '1': e.preventDefault(); switchTab('reading'); break;
case '2': e.preventDefault(); switchTab('history'); break;
case '3': e.preventDefault(); switchTab('statistics'); break;
case '4': e.preventDefault(); switchTab('database'); break;
case '5': e.preventDefault(); switchTab('learn'); break;
case '6': e.preventDefault(); switchTab('settings'); break;
}
});
document.addEventListener('keydown', (e) => {
if ((e.key === 'Enter' || e.key === ' ') && e.target.matches && e.target.matches('.card[role="button"], .card-db-item[role="button"], .tag[role="button"]')) {
e.preventDefault();
e.target.click();
}
});
shareBtn.addEventListener('click', () => {
const url = location.href;
if (navigator.share) {
navigator.share({
title: t('app.title'),
text: t('app.share.text'),
url: url
}).catch(() => {});
} else if (navigator.clipboard) {
navigator.clipboard.writeText(url).then(() => {
showToast(t('toast.linkCopied'));
});
}
});
readBtn.addEventListener('click', () => performReading());
function hasChangelog() {
return typeof changelog !== 'undefined' && Array.isArray(changelog) && changelog.length > 0;
}
function openAboutModal() {
const versionEl = document.getElementById('aboutVersion');
if (versionEl) versionEl.textContent = hasChangelog() ? `v${changelog[0].version}` : '';
const listEl = document.getElementById('changelogList');
if (listEl) {
listEl.innerHTML = hasChangelog()
? changelog.map(entry => {
const date = entry.date
? `<span class="changelog-date">${escapeHTML(entry.date)}</span>`
: '';
const changes = (entry.changes || [])
.map(c => `<li>${escapeHTML(c)}</li>`)
.join('');
return `<div class="changelog-entry">
<div class="changelog-head">
<span class="changelog-version">v${escapeHTML(entry.version)}</span>
${date}
</div>
<div class="changelog-title">${escapeHTML(entry.title)}</div>
<ul class="changelog-changes">${changes}</ul>
</div>`;
}).join('')
: `<div class="lore-empty">${escapeHTML(t('about.changelog.empty'))}</div>`;
}
document.getElementById('aboutModal').classList.add('show');
}
function closeAboutModal() {
document.getElementById('aboutModal').classList.remove('show');
}
function openPrivacyModal() {
document.getElementById('privacyModal').classList.add('show');
}
function closePrivacyModal() {
document.getElementById('privacyModal').classList.remove('show');
}
document.getElementById('linkAbout').addEventListener('click', (e) => {
e.preventDefault();
openAboutModal();
});
document.getElementById('linkPrivacy').addEventListener('click', (e) => {
e.preventDefault();
openPrivacyModal();
});
const footerYear = document.getElementById('footerYear');
if (footerYear) footerYear.textContent = new Date().getFullYear();
const footerVersion = document.getElementById('footerVersion');
if (footerVersion && hasChangelog()) footerVersion.textContent = `v${changelog[0].version}`;
function rerenderForLang() {
applyStaticStrings();
buildLangSwitch();
syncSpreadTrigger();
updateSpreadInfo();
renderDailyCard();
if (typeof renderProfile === 'function') renderProfile();
if (typeof syncLearnSeg === 'function') syncLearnSeg();
switchTab(currentTab);
}
(function init() {
applyStaticStrings();
buildLangSwitch();
syncCanonical();
const url = new URL(location.href);
const deck = url.searchParams.get('deck');
const spread = url.searchParams.get('spread');
const seed = url.searchParams.get('seed');
const q = url.searchParams.get('q');
const deckEl = document.getElementById('deckType');
if (deck) {
deckEl.value = deck;
if (deckEl.selectedIndex === -1) deckEl.value = 'full';
}
if (spread) {
spreadTypeEl.value = spread;
if (spreadTypeEl.selectedIndex === -1) spreadTypeEl.value = 'single';
}
if (q) document.getElementById('question').value = q;
updateSpreadInfo();
renderDailyCard();
setVisualStyle(visualStyle);
switchTab(isValidSeed(seed) ? 'reading' : currentTab);
if (isValidSeed(seed)) {
const picksParam = url.searchParams.get('picks');
const picks = picksParam
? picksParam.split('-').map(Number)
: 'first';
performReading(seed, false, picks);
}
if ('serviceWorker' in navigator && location.protocol !== 'file:') {
navigator.serviceWorker.register('sw.js').catch(() => {});
}
document.querySelectorAll('.modal-overlay').forEach(overlay => {
overlay.addEventListener('click', (e) => {
if (e.target === overlay) dismissModal(overlay);
});
});
const observer = new MutationObserver((mutations) => {
mutations.forEach((mutation) => {
if (!mutation.target.classList.contains('modal-overlay')) return;
if (mutation.target.classList.contains('show')) onModalOpen(mutation.target);
else onModalClose();
});
});
document.querySelectorAll('.modal-overlay').forEach(el => {
observer.observe(el, { attributes: true, attributeFilter: ['class'] });
});
})();
