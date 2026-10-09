// 牌的參考資料：其他牌系的名稱、日期對應、相關的牌、符號索引。資料庫分頁與卡片詳情的源流分頁才載入
// 日期是黃金黎明旬位與星座的近似日期（回歸黃道），不是預測工具；宮廷牌、一號牌與對應行星或元素的大牌沒有日期
export const refsNotes = { names: '同一張牌在其他牌系的名字。馬賽牌依 Nicolas Conver（1760）一脈的牌名，改用現代法文拼法；托特牌依 Crowley 的托特牌與他 1944 年出版的《托特之書》（The Book of Thoth）；義大利名只列查得到史料的大牌舊名。', thothCourts: '托特牌的宮廷牌是騎士、王后、王子、公主，和偉特牌怎麼對應一直有爭議。這裡採最常見的對法：國王對騎士、皇后對王后、騎士對王子、侍者對公主；另一種對法看誰騎馬，把偉特的騎士對到托特的騎士、國王對到王子。', timing: '日期是黃金黎明會（Golden Dawn）的傳統對應，以回歸黃道計算，只是近似值：太陽進入每一旬（十度區間）與每個星座的日子逐年會差一天左右，各家出版的表格也常差一兩天。這是象徵上的對應約定，不是預測工具，不能用來推算事情發生的時間。' };
export const cardRefs = {
  fool: {
    names: { marseille: 'Le Mat', thoth: 'The Fool', thothNumber: '0', italian: ['Il Matto'], aliases: ['愚人'] },
    timing: null,
    related: [
      { card: 'magician', kind: 'sequence', note: '零號之後是一號：愚者帶著還沒打開的行囊出發，魔術師把工具攤上桌面。前者是動念，後者是動手。' },
      { card: 'world', kind: 'sequence', note: '從零號走到二十一號：愚者往崖外邁步，前方沒有邊界；世界在桂冠圍成的圈裡起舞，自由有了形狀。' },
      { card: 'hermit', kind: 'pair', note: '兩人都帶著杖、站在高處：年輕人仰頭走向崖邊，老人在雪峰上低頭提燈。一個剛上路，一個已經走過。' },
      { card: 'four_of_pentacles', kind: 'contrast', note: '愚者輕輕拈著花、只帶一個小行囊；錢幣四把四枚錢幣全貼在身上，動彈不得。一個缺防備，一個缺放手。' }
    ]
  },
  magician: {
    names: { marseille: 'Le Bateleur', thoth: 'The Magus', thothNumber: 'I', italian: ['Il Bagatto'], aliases: ['魔法師'] },
    timing: null,
    related: [
      { card: 'fool', kind: 'sequence', note: '前一張愚者只有出發的念頭，還沒有工具；魔術師多了方法與意圖，讓念頭能落到地上。' },
      { card: 'high_priestess', kind: 'contrast', note: '兩張並見，常是說服與察覺的較量：對方說得再漂亮，你心裡若有說不出的不對勁，先信那份不對勁，再去查證。' },
      { card: 'strength', kind: 'pair', note: '同頂無限符號。並見時常是一件事要兩種本事：魔術師負責開場、做出成果，力量負責在不順時穩住脾氣。' },
      { card: 'eight_of_wands', kind: 'pair', note: '權杖八是射手座裡由水星主管的旬，魔術師對應水星。並見時，常是提案或訊息一送出就有快速回應。' }
    ]
  },
  high_priestess: {
    names: { marseille: 'La Papesse', thoth: 'The Priestess', thothNumber: 'II', italian: ['La Papessa'], aliases: ['女教皇'] },
    timing: null,
    related: [
      { card: 'magician', kind: 'contrast', note: '他站著動手，她坐著不動。若你已經觀察得夠久、遲遲沒出手，魔術師就是下一步該接上的那張牌。' },
      { card: 'hierophant', kind: 'contrast', note: '想自學還是拜師，常落在這兩張之間：女祭司適合自己讀、自己悟的題目，教皇適合有標準答案、要人帶的領域。' },
      { card: 'empress', kind: 'sequence', note: '女祭司之後是皇后：靜靜醞釀的東西接著要長大成形。兩張並見時，常指一個想法正從孕育走向實現。' },
      { card: 'two_of_swords', kind: 'pair', note: '寶劍二在黃金黎明裡是月亮在天秤座，女祭司則對應月亮。同樣端坐不動，她睜眼等待，寶劍二蒙眼不看。' }
    ]
  },
  empress: {
    names: { marseille: 'L\'Impératrice', thoth: 'The Empress', thothNumber: 'III', italian: ['L\'Imperatrice'], aliases: ['女皇'] },
    timing: null,
    related: [
      { card: 'emperor', kind: 'contrast', note: '皇后讓事物生長，皇帝替它們立下秩序。前者問條件夠不夠好，後者問規則清不清楚，兩者缺一不可。' },
      { card: 'high_priestess', kind: 'sequence', note: '皇后的成果遲遲沒長出來時，可以回頭看女祭司：事情也許還在帷幕後醞釀，現在去催，只會打斷它生長。' },
      { card: 'queen_of_pentacles', kind: 'similar', note: '皇后的課題是讓自己也被照顧，錢幣皇后卻最不習慣被照顧。並見時，問問你的照顧有沒有留一份給自己。' },
      { card: 'nine_of_pentacles', kind: 'pair', note: '金星連起這兩張：皇后對應金星，錢幣九在黃金黎明裡是金星在處女座。皇后的園子與人共享，錢幣九留給自己。' }
    ]
  },
  emperor: {
    names: { marseille: 'L\'Empereur', thoth: 'The Emperor', thothNumber: 'IV', italian: ['L\'Imperatore'] },
    timing: { from: '03-21', to: '04-19', basis: 'sign', sign: 'Aries' },
    related: [
      { card: 'empress', kind: 'contrast', note: '帶人或教養孩子時，兩張常一起出現：皇后給的是被接住的安全感，皇帝給的是知道界線在哪裡的安全感。' },
      { card: 'hierophant', kind: 'sequence', note: '皇帝管世俗的秩序與權力，下一張教皇管價值與傳承：從怎麼治理，走到為什麼這樣做。' },
      { card: 'two_of_wands', kind: 'pair', note: '權杖二是牡羊座的第一旬，皇帝是牡羊座本身。並見時常是守成與擴張在拉扯：根基穩了，再往牆外走。' },
      { card: 'four_of_pentacles', kind: 'similar', note: '皇帝逆位的僵化，畫出來很像錢幣四：坐著不動，什麼都不放手。並見時，該鬆開的多半是控制，不是規則本身。' }
    ]
  },
  hierophant: {
    names: { marseille: 'Le Pape', thoth: 'The Hierophant', thothNumber: 'V', italian: ['Il Papa'], aliases: ['教宗'] },
    timing: { from: '04-20', to: '05-20', basis: 'sign', sign: 'Taurus' },
    related: [
      { card: 'high_priestess', kind: 'contrast', note: '同一件事抽到兩張，常是你的直覺和老師、規範給的答案不一樣；先把兩邊各寫下來，再看差在哪裡。' },
      { card: 'devil', kind: 'pair', note: '兩張都是一人在上、兩人在下。並見時要分辨：你跟隨的權威是讓你學成後能自己走，還是要你一直依附。' },
      { card: 'three_of_pentacles', kind: 'similar', note: '畫面上都有穿長袍的修道者。錢幣三重在分工合作、把東西做出來，教皇重在傳承價值與規範。' },
      { card: 'five_of_pentacles', kind: 'pair', note: '錢幣五是金牛座的旬，教皇對應金牛座。教皇是接住人的群體，錢幣五的人卻從亮窗下走過；並見時，去敲門吧。' },
      { card: 'lovers', kind: 'sequence', note: '教皇給婚禮的形式，戀人給誓言的內容。只有儀式、沒有真心的選擇，承諾容易成為空殼；兩者都在，才接得上。' }
    ]
  },
  lovers: {
    names: { marseille: 'L\'Amoureux', thoth: 'The Lovers', thothNumber: 'VI', italian: ['Gli Amanti', 'L\'Amore'], aliases: ['情人'] },
    timing: { from: '05-21', to: '06-21', basis: 'sign', sign: 'Gemini' },
    related: [
      { card: 'devil', kind: 'pair', note: '兩張構圖相似，感情裡都可能是強烈的吸引。分辨的方法是問：這段關係讓你更能自己選擇，還是越來越離不開？' },
      { card: 'two_of_cups', kind: 'similar', note: '想知道兩人是否互相有意，聖杯二答得比較直接；問的若是該不該為這段關係改變方向、放下什麼，就落在戀人。' },
      { card: 'hierophant', kind: 'sequence', note: '上一張教皇給的是群體的規範，戀人要你自己選。兩張並見時，常是傳統期待與個人心意在拉扯。' },
      { card: 'seven_of_cups', kind: 'contrast', note: '聖杯七的選項浮在雲上、看不清真假；戀人的兩人站在地面上，選擇要先看清自己重視什麼才做得出。' }
    ]
  },
  chariot: {
    names: { marseille: 'Le Chariot', thoth: 'The Chariot', thothNumber: 'VII', italian: ['Il Carro'] },
    timing: { from: '06-22', to: '07-22', basis: 'sign', sign: 'Cancer' },
    related: [
      { card: 'lovers', kind: 'sequence', note: '戀人做出選擇，戰車接著把它變成行動。若戀人的問題還沒想清楚，戰車的衝刺容易開錯方向。' },
      { card: 'strength', kind: 'contrast', note: '同樣面對難馴的力量，戰車適合有期限、分勝負的局面，力量適合沒有終點、得天天相處的脾氣與關係。' },
      { card: 'six_of_wands', kind: 'similar', note: '戰車還在打這一仗，權杖六已經在遊行。並見時，常是衝刺之後迎來肯定；掌聲響起時，方向仍要自己握。' },
      { card: 'two_of_swords', kind: 'contrast', note: '都握著兩股對立的力量：寶劍二交叉雙劍，靠不動維持平衡；戰車帶著一黑一白兩獸，靠方向往前。' }
    ]
  },
  strength: {
    names: { marseille: 'La Force', thoth: 'Lust', thothNumber: 'XI', italian: ['La Forza'], note: '托特牌稱這張牌為 Lust，編號是 XI；偉特牌的力量是 VIII。題材相同，編號對調的由來見「力量與正義為什麼對調」。' },
    timing: { from: '07-23', to: '08-22', basis: 'sign', sign: 'Leo' },
    related: [
      { card: 'chariot', kind: 'contrast', note: '衝刺久了脾氣變差，往往就是該從戰車換到力量的時候：目標可以繼續追，對自己和身邊的人卻要放軟。' },
      { card: 'magician', kind: 'pair', note: '同頂無限符號，力量的女子卻沒有桌子與工具，只用雙手。方法都試過仍無效時，該換的也許是耐心，不是技巧。' },
      { card: 'queen_of_wands', kind: 'pair', note: '獅子也出現在權杖皇后的王座上。她的力量外放、帶著魅力與主導權；力量牌的女子則安靜，靠的是耐心。' },
      { card: 'nine_of_wands', kind: 'similar', note: '都在講撐住。權杖九帶著傷、戒備著下一擊；力量牌的忍耐是放鬆而溫和的，不靠築起防線。' }
    ]
  },
  hermit: {
    names: { marseille: 'L\'Hermite', thoth: 'The Hermit', thothNumber: 'IX', italian: ['L\'Eremita', 'Il Vecchio', 'Il Gobbo'], aliases: ['隱者'] },
    timing: { from: '08-23', to: '09-22', basis: 'sign', sign: 'Virgo' },
    related: [
      { card: 'hierophant', kind: 'contrast', note: '一門學問常要兩種老師：教皇教你公認的方法，隱士讓你在獨處裡想通它的意義。只有一種，易流於死背或空想。' },
      { card: 'eight_of_pentacles', kind: 'pair', note: '錢幣八是處女座的第一旬，隱士是處女座本身。並見時常是一段閉門用功：手上練技術，心裡想清楚為何而練。' },
      { card: 'eight_of_cups', kind: 'similar', note: '聖杯八問的是該不該離開，隱士問的是離開之後要找什麼。若你已經走了卻仍茫然，接著該讀的就是隱士。' },
      { card: 'four_of_swords', kind: 'similar', note: '累到想不動時，先照寶劍四睡飽；休息夠了仍不知方向，才輪到隱士的獨處。順序反了，想再久也只是耗神。' }
    ]
  },
  wheel_of_fortune: {
    names: { marseille: 'La Roue de Fortune', thoth: 'Fortune', thothNumber: 'X', italian: ['La Ruota'], aliases: ['幸運之輪'] },
    timing: null,
    related: [
      { card: 'world', kind: 'pair', note: '四角是同樣的四活物：命運之輪的牠們面前攤著書，世界的牠們沒有書。並見時，常指一段起伏的週期正要收尾。' },
      { card: 'justice', kind: 'sequence', note: '命運之輪之後是正義：從不由人控制的機運，走到自己選擇帶來的後果。分得清兩者，才不會錯怪自己或運氣。' },
      { card: 'two_of_pentacles', kind: 'pair', note: '木星是兩張的交集：命運之輪對應木星，黃金黎明把錢幣二配為木星在摩羯座。錢幣二把大週期縮成手上的拋接。' },
      { card: 'tower', kind: 'similar', note: '都是不由你決定的外在變化。命運之輪是會再轉的週期，高塔則是一次打掉不穩的結構，重點在拆，不在輪轉。' }
    ]
  },
  justice: {
    names: { marseille: 'La Justice', thoth: 'Adjustment', thothNumber: 'VIII', italian: ['La Giustizia'], note: '托特牌稱這張牌為 Adjustment，編號是 VIII；偉特牌的正義是 XI。題材相同，編號對調的由來見「力量與正義為什麼對調」。' },
    timing: { from: '09-23', to: '10-23', basis: 'sign', sign: 'Libra' },
    related: [
      { card: 'two_of_swords', kind: 'contrast', note: '寶劍二是天秤座的旬，正義對應天秤座。寶劍二蒙眼不看，正義睜眼直視：一個迴避判斷，一個要求判斷。' },
      { card: 'six_of_pentacles', kind: 'similar', note: '兩張都有天平，同現時常涉及賠償、分紅這類分配：依約該給的歸正義，出於善意多給的歸錢幣六，最好分開談。' },
      { card: 'temperance', kind: 'similar', note: '兩張都談平衡。正義是秤完就下決定，一次劃清界線；節制是持續微調比例，靠時間慢慢調出來。' },
      { card: 'judgement', kind: 'similar', note: '遇到申訴、複查這類重新提起的舊案，正義看證據與規定站不站得住，審判看你是否準備好放下舊帳、重新開始。' },
      { card: 'hanged_man', kind: 'sequence', note: '正義之後是倒吊人：帳算清楚了，接下來有時得接受結果、暫停一段時間，換個角度再看同一件事。' }
    ]
  },
  hanged_man: {
    names: { marseille: 'Le Pendu', thoth: 'The Hanged Man', thothNumber: 'XII', italian: ['L\'Appeso', 'Il Traditore'], aliases: ['吊人'] },
    timing: null,
    related: [
      { card: 'eight_of_swords', kind: 'contrast', note: '寶劍八蒙眼受縛，覺得無路可走；倒吊人只綁一隻腳，神情平靜。同樣被綁，差別在接不接受、看不看得見。' },
      { card: 'four_of_swords', kind: 'similar', note: '同樣是暫停。寶劍四是退下來休養，讓身心恢復；倒吊人是在停頓中換角度看事情，重點在想法的轉變。' },
      { card: 'chariot', kind: 'contrast', note: '戰車靠意志握住方向往前推；倒吊人放下控制、停下來等。該推還是該停，常是這兩張牌之間的選擇。' },
      { card: 'death', kind: 'sequence', note: '倒吊人之後是死神：懸著的那段時間過去，該結束的東西多半會正式結束，新的階段才跟著開始。' },
      { card: 'four_of_cups', kind: 'similar', note: '聖杯四同樣停著不動，卻是提不起勁，連遞到眼前的杯都不看；倒吊人的停頓是自己選的，而且正在換角度看。' }
    ]
  },
  death: {
    names: { marseille: 'XIII', thoth: 'Death', thothNumber: 'XIII', italian: ['La Morte'], aliases: ['死亡'], note: '馬賽牌的十三號通常不寫牌名，只印數字，習慣上稱為死亡（La Mort）或無名牌（L\'Arcane sans nom）。' },
    timing: { from: '10-24', to: '11-22', basis: 'sign', sign: 'Scorpio' },
    related: [
      { card: 'tower', kind: 'similar', note: '兩張都是結束，差在倒下的東西：高塔打掉的多半建在錯誤前提上；死神結束的，常是曾經合適、已走完的階段。' },
      { card: 'five_of_cups', kind: 'pair', note: '聖杯五屬天蠍座的旬，死神對應天蠍座。聖杯五停在失去之後一遍遍回想，常是死神那段哀悼卡住時的樣子。' },
      { card: 'eight_of_cups', kind: 'contrast', note: '聖杯八是自己決定轉身離開；死神的結束往往由不得你選。前者問你要不要走，後者問你怎麼面對已發生的事。' },
      { card: 'temperance', kind: 'sequence', note: '死神之後是節制。兩張同現，常提醒你結束後別立刻衝向另一個極端，例如一分手就投入新戀情，要慢慢調比例。' }
    ]
  },
  temperance: {
    names: { marseille: 'Tempérance', thoth: 'Art', thothNumber: 'XIV', italian: ['La Temperanza'] },
    timing: { from: '11-23', to: '12-21', basis: 'sign', sign: 'Sagittarius' },
    related: [
      { card: 'star', kind: 'pair', note: '星星也兩手倒水、一腳入水。節制在兩杯之間調配，星星則把水倒回池中與土地，從調和走向滋養。' },
      { card: 'devil', kind: 'sequence', note: '節制之後就是惡魔：一邊是有分寸的調配，一邊是失控的慾望與依附。兩張並讀，常指同一件事的適度與過度。' },
      { card: 'two_of_pentacles', kind: 'similar', note: '錢幣二也在兩邊之間求平衡，但它是在變動中快速換手；節制則是慢慢調比例，求的是長期的穩定。' },
      { card: 'ten_of_wands', kind: 'contrast', note: '權杖十屬射手座的旬，節制對應射手座。權杖十的重擔正是節制要避免的過量；兩張同現，常提醒你減量與分工。' }
    ]
  },
  devil: {
    names: { marseille: 'Le Diable', thoth: 'The Devil', thothNumber: 'XV', italian: ['Il Diavolo'], aliases: ['魔鬼'] },
    timing: { from: '12-22', to: '01-20', basis: 'sign', sign: 'Capricorn' },
    related: [
      { card: 'lovers', kind: 'pair', note: '兩張同現時，問的是一段關係出於選擇還是依附：戀人在天使之下清醒地選，惡魔被慾望綁住，還以為沒得選。' },
      { card: 'four_of_pentacles', kind: 'pair', note: '錢幣四屬摩羯座的旬，惡魔對應摩羯座。錢幣四緊抱錢與安全感；惡魔綁住的範圍更廣，還有慾望、關係與成癮。' },
      { card: 'eight_of_swords', kind: 'similar', note: '兩張的束縛都比看起來鬆：寶劍八的腳沒綁，惡魔的鏈圈取得下來。前者困在恐懼，後者困在慾望與報酬。' },
      { card: 'tower', kind: 'sequence', note: '惡魔之後是高塔：不肯自己取下的鎖鏈，有時會由一場劇變替你打斷，代價也比自己鬆手大得多。' }
    ]
  },
  tower: {
    names: { marseille: 'La Maison Dieu', thoth: 'The Tower', thothNumber: 'XVI', italian: ['La Torre', 'La Saetta'], aliases: ['塔'] },
    timing: null,
    related: [
      { card: 'devil', kind: 'sequence', note: '高塔接在惡魔之後：束縛若一直沒有自己解開，被困住的結構終究可能從外面被打破。' },
      { card: 'star', kind: 'sequence', note: '高塔之後是星星。兩張同現時順序很重要：先處理崩塌的善後、確保安全，星星的修復才接得上，別急著談希望。' },
      { card: 'death', kind: 'similar', note: '兩張同現時，常是一次突發事件引出更長的收尾：高塔是那一下崩塌，死神是之後該退場的身分與安排。' },
      { card: 'three_of_swords', kind: 'similar', note: '寶劍三同樣是突然刺來的真相，但痛集中在心裡；高塔倒下的是整個結構，連生活的框架都得重整。' },
      { card: 'emperor', kind: 'contrast', note: '皇帝建立秩序與結構；高塔打掉的正是僵化或建在錯誤前提上的結構。兩張並讀，問的是你的規則還撐不撐得住。' }
    ]
  },
  star: {
    names: { marseille: 'L\'Étoile', thoth: 'The Star', thothNumber: 'XVII', italian: ['La Stella'], aliases: ['星辰'] },
    timing: { from: '01-21', to: '02-18', basis: 'sign', sign: 'Aquarius' },
    related: [
      { card: 'tower', kind: 'sequence', note: '星星接在高塔之後，是劇變之後的修復期；兩張一起出現，常指先有一番震盪，之後才慢慢找回方向。' },
      { card: 'six_of_swords', kind: 'pair', note: '寶劍六是水瓶座的旬，星星對應水瓶座。寶劍六是離開風浪、駛向平靜；星星是抵達之後的休養與重新期待。' },
      { card: 'temperance', kind: 'pair', note: '節制的天使同樣兩手持器倒水、一腳踩在水裡。節制講調配的分寸，星星講把水倒出去的信任與滋養。' },
      { card: 'five_of_cups', kind: 'contrast', note: '聖杯五的杯是打翻的，損失灑了一地；星星的水是自己主動倒出去的。一個困在失去，一個在付出中恢復。' },
      { card: 'moon', kind: 'sequence', note: '星星之後是月亮：星光指出方向，月光卻讓輪廓模糊。希望之後接著出現月亮，提醒你別把期待當成事實。' }
    ]
  },
  moon: {
    names: { marseille: 'La Lune', thoth: 'The Moon', thothNumber: 'XVIII', italian: ['La Luna'] },
    timing: { from: '02-19', to: '03-20', basis: 'sign', sign: 'Pisces' },
    related: [
      { card: 'high_priestess', kind: 'similar', note: '女祭司也守著看不見的部分，但她是安靜、篤定的直覺；月亮則是看不清時湧上的不安與想像，需要分辨真假。' },
      { card: 'seven_of_cups', kind: 'similar', note: '聖杯七的幻象多是自己想像出的美好選項；月亮的幻象多來自恐懼與資訊不明。前者要收斂，後者要查證。' },
      { card: 'eight_of_cups', kind: 'pair', note: '聖杯八屬雙魚座的旬，月亮對應雙魚座。聖杯八同樣是月下的夜景；看不清的時候，聖杯八選擇了轉身離開。' },
      { card: 'sun', kind: 'sequence', note: '月亮逆位也有撥雲見日之意，但那是霧正在散，仍得邊走邊查證；到了太陽，事情已攤在日光下，可放心行動。' }
    ]
  },
  sun: {
    names: { marseille: 'Le Soleil', thoth: 'The Sun', thothNumber: 'XIX', italian: ['Il Sole'] },
    timing: null,
    related: [
      { card: 'moon', kind: 'sequence', note: '兩張同現時看順序：月亮在前，太陽是看清之後的鬆一口氣；太陽在前，則提醒順利之中仍有還沒查證的部分。' },
      { card: 'death', kind: 'pair', note: '兩張都畫著騎白馬、舉旗的人物：死神舉黑旗緩步而來，太陽的孩子高舉紅旗。一個是結束，一個是生命的盛放。' },
      { card: 'fool', kind: 'contrast', note: '都很輕鬆，用法不同：還在起點、要踏出沒準備周全的第一步，偏向愚者；成果已在眼前、適合公開，偏向太陽。' },
      { card: 'six_of_cups', kind: 'pair', note: '聖杯六也有孩子與花，喜悅來自回憶與過去的善意；太陽的喜悅則在當下，正在發生，也更公開。' }
    ]
  },
  judgement: {
    names: { marseille: 'Le Jugement', thoth: 'The Aeon', thothNumber: 'XX', italian: ['Il Giudizio', 'L\'Angelo'] },
    timing: null,
    related: [
      { card: 'justice', kind: 'similar', note: '兩張同現時，先用正義認清該負的責任、補上該補的，審判的重新開始才不會只是把舊帳藏起來。' },
      { card: 'death', kind: 'pair', note: '死神畫的是倒下，審判畫的是從棺中站起。死神結束一個階段，審判則把人喚回，讓他以新的樣子起身。' },
      { card: 'six_of_cups', kind: 'similar', note: '兩張都讓過去重新浮現。聖杯六是溫暖地回顧，容易停在懷舊；審判則要你對過去做出結論，然後往前走。' },
      { card: 'world', kind: 'sequence', note: '審判之後是世界：回應了召喚、重新站起來之後，下一步是把這一圈走完，整合成完整的成果。' }
    ]
  },
  world: {
    names: { marseille: 'Le Monde', thoth: 'The Universe', thothNumber: 'XXI', italian: ['Il Mondo'] },
    timing: null,
    related: [
      { card: 'fool', kind: 'sequence', note: '若把大牌讀成循環，世界之後又回到愚者：一圈完成，新的旅程從零開始，常指結束與新開始緊接著發生。' },
      { card: 'judgement', kind: 'sequence', note: '兩張都有總結之意：審判的總結是回顧過去、決定要不要重新出發；世界的總結是事情已完成，可以收下成果。' },
      { card: 'wheel_of_fortune', kind: 'pair', note: '命運之輪與世界的四角都有天使、老鷹、公牛與獅子。命運之輪是轉動中的週期，世界則是一圈走完之後的完整。' },
      { card: 'ten_of_cups', kind: 'similar', note: '聖杯十也是圓滿，重在家庭與情感、人與人之間；世界的完成範圍更大，是一整個階段的整合與成就。' },
      { card: 'three_of_wands', kind: 'similar', note: '權杖三在崖上目送船出海，計畫才剛往外走；世界的遠行則是一圈完成後打開的舞台。前者還在等，後者已收成。' }
    ]
  },
  ace_of_wands: {
    names: { marseille: 'As de Bâton', thoth: 'Root of the Powers of Fire', aliases: ['權杖王牌'] },
    timing: null,
    related: [
      { card: 'magician', kind: 'pair', note: '魔術師手上高舉的也是一根杖。權杖一是想做的那把火，魔術師是組合資源的本事；兩張同現，火與工具都在。' },
      { card: 'two_of_wands', kind: 'sequence', note: '火點著之後是權杖二：接著要決定往哪裡燒、範圍多大。前一步靠衝動，這一步開始需要盤算。' },
      { card: 'four_of_cups', kind: 'contrast', note: '兩張都有一隻手從雲中遞東西出來。權杖一的杖被緊緊握住，聖杯四的杯卻沒人理會；一個熱，一個倦。' },
      { card: 'ace_of_pentacles', kind: 'similar', note: '權杖一的手握成拳，錢幣一的手攤開托著。兩張同現，常是想做的事剛好遇上實在的機會。' }
    ]
  },
  two_of_wands: {
    names: { marseille: 'Deux de Bâton', thoth: 'Dominion' },
    timing: { from: '03-21', to: '03-30', basis: 'decan', sign: 'Aries', planet: 'Mars' },
    related: [
      { card: 'three_of_wands', kind: 'sequence', note: '走下城牆、把船送出去，就到了權杖三。二還在挑方向，三已經在等回音；兩張接連出現，常表示構想正在落地。' },
      { card: 'emperor', kind: 'pair', note: '權杖二屬火星在牡羊座的旬，牡羊座正是皇帝的星座；兩人都托著一顆球，一個守疆界，一個望向疆界外。' },
      { card: 'two_of_swords', kind: 'similar', note: '都停在選擇之前。寶劍二蒙著眼不看選項，權杖二看得很遠卻不動身；前者要先睜眼，後者要先下牆。' },
      { card: 'four_of_pentacles', kind: 'contrast', note: '錢幣四把擁有的全貼在身上，權杖二卻站在自家牆頭望向遠方。一個怕失去手上的，一個嫌手上的不夠。' }
    ]
  },
  three_of_wands: {
    names: { marseille: 'Trois de Bâton', thoth: 'Virtue' },
    timing: { from: '03-31', to: '04-09', basis: 'decan', sign: 'Aries', planet: 'Sun' },
    related: [
      { card: 'four_of_wands', kind: 'sequence', note: '船回航之後是權杖四：遠行告一段落，成果帶回家門前慶祝。權杖三望向遠方，權杖四回到門內。' },
      { card: 'seven_of_pentacles', kind: 'similar', note: '都在等投入的回報。錢幣七望著自己種的東西，盤算值不值得繼續；權杖三望向海面，盤算下一步能走多遠。' },
      { card: 'eight_of_wands', kind: 'sequence', note: '權杖三在等的消息，到了權杖八常一起飛來。兩張接連出現，多半表示等待快結束了，該準備接住。' },
      { card: 'six_of_swords', kind: 'contrast', note: '都和水路有關，方向卻不同：寶劍六是離開傷人的處境，往平靜處撐過去；權杖三是主動把船送出去，向外擴張。' }
    ]
  },
  four_of_wands: {
    names: { marseille: 'Quatre de Bâton', thoth: 'Completion' },
    timing: { from: '04-10', to: '04-19', basis: 'decan', sign: 'Aries', planet: 'Venus' },
    related: [
      { card: 'three_of_cups', kind: 'similar', note: '同樣是慶祝。聖杯三慶祝的是朋友之間的情誼，權杖四多了一道花門與一座城堡，慶祝的是階段完成、落地生根。' },
      { card: 'ten_of_cups', kind: 'similar', note: '都和家有關。權杖四是跨進門的那一刻，帶著里程碑的意味；聖杯十是門內的日子過久了，感情依然完滿。' },
      { card: 'five_of_wands', kind: 'sequence', note: '慶祝之後是權杖五：人聚在一起久了，意見就開始碰撞。安頓下來的團體，接著要學怎麼一起做事。' },
      { card: 'empress', kind: 'pair', note: '權杖四在黃金黎明配的是金星在牡羊座，金星即皇后的行星。兩張都談享受豐收：皇后重滋養，權杖四重同慶。' }
    ]
  },
  five_of_wands: {
    names: { marseille: 'Cinq de Bâton', thoth: 'Strife' },
    timing: { from: '07-23', to: '08-02', basis: 'decan', sign: 'Leo', planet: 'Saturn' },
    related: [
      { card: 'five_of_swords', kind: 'similar', note: '權杖五人人還握著杖，寶劍五的劍大半落到一人手裡。兩張同現時，留意有沒有人開始想讓對方難堪。' },
      { card: 'three_of_pentacles', kind: 'contrast', note: '錢幣三的三個人分工清楚，圍著同一道門討論；權杖五人人都想主導。差的常常不是能力，而是分工。' },
      { card: 'six_of_wands', kind: 'sequence', note: '混戰之後，權杖六有人騎上白馬凱旋。五是誰也壓不住誰，六是有人勝出；接連出現時，勝負多半快揭曉。' },
      { card: 'strength', kind: 'pair', note: '權杖五在黃金黎明配的是土星在獅子座，獅子座對應力量牌。力量靠耐心安撫獅子，正是權杖五缺的那種力氣。' }
    ]
  },
  six_of_wands: {
    names: { marseille: 'Six de Bâton', thoth: 'Victory' },
    timing: { from: '08-03', to: '08-12', basis: 'decan', sign: 'Leo', planet: 'Jupiter' },
    related: [
      { card: 'seven_of_wands', kind: 'sequence', note: '被抬上馬背之後，接著就是權杖七：位置被看見，挑戰也跟著上門。六在享受掌聲，七要守住它。' },
      { card: 'sun', kind: 'similar', note: '都是被看見的牌，也都有人騎在白馬上。太陽的孩子不需要觀眾就快樂，權杖六的勝利則要有人歡呼才算完成。' },
      { card: 'five_of_swords', kind: 'contrast', note: '兩張都有贏家。權杖六的人被同伴簇擁，寶劍五的人看著對手難堪離開；贏得光不光彩，看身邊還剩下誰。' },
      { card: 'wheel_of_fortune', kind: 'pair', note: '黃金黎明把權杖六配給木星在獅子座，木星是命運之輪的行星。被抬到高處時，記得勝利裡也有時勢的成分。' }
    ]
  },
  seven_of_wands: {
    names: { marseille: 'Sept de Bâton', thoth: 'Valour' },
    timing: { from: '08-13', to: '08-22', basis: 'decan', sign: 'Leo', planet: 'Mars' },
    related: [
      { card: 'six_of_wands', kind: 'sequence', note: '權杖六的騎者被持杖的同伴圍著，到了權杖七，只剩他一人在高處擋架；看看當初的同伴還在不在。' },
      { card: 'strength', kind: 'contrast', note: '黃金黎明把權杖七配給火星在獅子座，獅子座對應力量牌。七用擋架守住位置，力量用耐心化解敵意。' },
      { card: 'five_of_wands', kind: 'similar', note: '都是以杖相爭。權杖五是同輩混戰，誰也不比誰高；權杖七是一個人站在高處，對著坡下好幾根杖。' }
    ]
  },
  eight_of_wands: {
    names: { marseille: 'Huit de Bâton', thoth: 'Swiftness' },
    timing: { from: '11-23', to: '12-01', basis: 'decan', sign: 'Sagittarius', planet: 'Mercury' },
    related: [
      { card: 'page_of_wands', kind: 'similar', note: '都和消息有關。權杖侍者是一則帶著熱情的訊息，常由一個人帶來；權杖八是好幾件事一起落地，進度整體加速。' },
      { card: 'hanged_man', kind: 'contrast', note: '倒吊人倒懸著換個視角，權杖八是局勢一口氣動起來；卡了很久的事接著出現權杖八，停頓可能快結束了。' },
      { card: 'magician', kind: 'pair', note: '權杖八的旬位是水星在射手座，水星屬魔術師。兩張都重傳遞：魔術師主動發出，權杖八是訊息自己飛來。' }
    ]
  },
  nine_of_wands: {
    names: { marseille: 'Neuf de Bâton', thoth: 'Strength' },
    timing: { from: '12-02', to: '12-11', basis: 'decan', sign: 'Sagittarius', planet: 'Moon' },
    related: [
      { card: 'ten_of_wands', kind: 'sequence', note: '權杖九還握著一根杖守著柵欄；到了權杖十，所有的杖都抱在身上，連路都看不見。從九到十，防守變成了重擔。' },
      { card: 'four_of_swords', kind: 'contrast', note: '同樣打完仗。寶劍四的人閉眼躺下，劍掛在牆上；權杖九的人還站著，握杖不放。一個交了班，一個還在站崗。' },
      { card: 'moon', kind: 'similar', note: '月亮讓人把影子看成威脅，權杖九的人也頻頻側目，防著看不見的敵人。月亮是看不清，權杖九是傷過而不敢鬆。' }
    ]
  },
  ten_of_wands: {
    names: { marseille: 'Dix de Bâton', thoth: 'Oppression' },
    timing: { from: '12-12', to: '12-21', basis: 'decan', sign: 'Sagittarius', planet: 'Saturn' },
    related: [
      { card: 'nine_of_wands', kind: 'sequence', note: '權杖九防的是外來的攻擊，權杖十扛的是自己接下的責任；前者要分辨威脅真假，後者要決定先放下哪幾根。' },
      { card: 'devil', kind: 'similar', note: '惡魔的鏈圈大得能從頭上取下，權杖十的杖也是自己一根根抱起的；要放下，先看清自己為什麼抱著。' },
      { card: 'world', kind: 'contrast', note: '世界的舞者兩手各握一根短杖，輕得能跳舞；權杖十的人抱著十根，彎腰前行。同樣近終點，差在拿了多少。' },
      { card: 'ace_of_wands', kind: 'sequence', note: '放下這一捆，下一輪從權杖一重新開始：只剩一根杖，握得緊，也拿得動。' }
    ]
  },
  page_of_wands: {
    names: { marseille: 'Valet de Bâton', thoth: 'Princess of Wands', aliases: ['權杖侍從', '權杖隨從'] },
    timing: null,
    related: [
      { card: 'ace_of_wands', kind: 'similar', note: '權杖一是那股剛點著的火，權杖侍者是被這股火點著的人。前者問能量從哪裡來，後者問誰帶著它走第一段路。' },
      { card: 'knight_of_wands', kind: 'sequence', note: '侍者還站著端詳手上的杖，騎士已經上馬出發。從侍者到騎士，熱情從好奇變成行動，風險也跟著變大。' },
      { card: 'page_of_pentacles', kind: 'contrast', note: '兩位侍者都看著自己花色的東西。錢幣侍者把錢幣舉到眼前細看，權杖侍者仰望杖頂新芽；一求扎實，一求新鮮。' },
      { card: 'fool', kind: 'similar', note: '都是帶著熱情的新手。愚者不太在乎要去哪裡，權杖侍者已經挑好一根杖、想把它弄懂；一個啟程，一個學藝。' }
    ]
  },
  knight_of_wands: {
    names: { marseille: 'Cavalier de Bâton', thoth: 'Prince of Wands', thothAlt: 'Knight of Wands' },
    timing: null,
    related: [
      { card: 'knight_of_pentacles', kind: 'contrast', note: '權杖騎士的馬前蹄高揚，錢幣騎士的黑馬立定不動。一個怕錯過，一個怕做錯；兩張同現，要你在快與穩間取捨。' },
      { card: 'chariot', kind: 'contrast', note: '戰車同樣向前，駕車者卻先讓兩隻獸聽令，才走得穩；權杖騎士是被衝勁帶著跑，方向還沒定。' },
      { card: 'queen_of_wands', kind: 'sequence', note: '騎士把火往外送，皇后把火留在身邊經營。從騎士到皇后，熱情從出發變成扎根，學會在一個地方發光。' },
      { card: 'eight_of_wands', kind: 'similar', note: '兩張都常與遠行、搬遷有關。一起出現時，想走的念頭和外在時機多半同時到位，證件與預算要先核對。' }
    ]
  },
  queen_of_wands: {
    names: { marseille: 'Reine de Bâton', thoth: 'Queen of Wands', aliases: ['權杖王后', '權杖女王'] },
    timing: null,
    related: [
      { card: 'strength', kind: 'pair', note: '兩張都有女性與獅子。力量牌的女子輕撫獅頭，權杖皇后坐在刻著獅子的王座上；一個馴服野性，一個坐鎮其上。' },
      { card: 'sun', kind: 'pair', note: '向日葵同時開在兩張牌上。太陽牌的花從牆後探出，權杖皇后則握一朵在手；同樣開朗，皇后多了掌握與經營。' },
      { card: 'queen_of_cups', kind: 'contrast', note: '聖杯皇后垂眼看著杯，感受往內收；權杖皇后正面而坐，熱度往外放。一個先懂人，一個先帶人動。' },
      { card: 'king_of_wands', kind: 'pair', note: '兩人的王座上都有獅子。皇后的火用來凝聚人，國王的火用來定方向；兩張同時出現，常表示人心與方向都齊了。' }
    ]
  },
  king_of_wands: {
    names: { marseille: 'Roi de Bâton', thoth: 'Knight of Wands', thothAlt: 'Prince of Wands' },
    timing: null,
    related: [
      { card: 'knight_of_wands', kind: 'sequence', note: '騎士的衝勁沉澱下來就是國王：同一團火，從四處奔走變成坐下來定方向，只是偶爾仍留著騎士的急性子。' },
      { card: 'king_of_swords', kind: 'contrast', note: '寶劍國王依規則與證據裁決，權杖國王憑願景與直覺拍板。前者讓人服氣，後者讓人想跟；大事兩種都該問。' },
      { card: 'queen_of_wands', kind: 'pair', note: '皇后正面坐鎮，腳邊黑貓守著；國王側身，像隨時要起身。問一個人時，看他靠人緣凝聚，還是靠方向帶動。' }
    ]
  },
  ace_of_cups: {
    names: { marseille: 'As de Coupe', thoth: 'Root of the Powers of Water', aliases: ['聖杯王牌'] },
    timing: null,
    related: [
      { card: 'page_of_cups', kind: 'similar', note: '兩張一起出現，湧出的心意多半已有了具體的對象或題材；接下來看侍者手上那個小開端，有沒有被好好照顧。' },
      { card: 'two_of_cups', kind: 'sequence', note: '一份湧出的心意，遇上另一個人的回應，就走到了聖杯二；接著讀，看這份感情有沒有被接住。' },
      { card: 'five_of_cups', kind: 'contrast', note: '聖杯一的水是滿到自己溢出來，聖杯五的杯卻是被打翻的；同樣是水流出去，一個是給予，一個是失去。' },
      { card: 'star', kind: 'similar', note: '星星的女子也在倒水，那是受過傷之後重新給出；聖杯一的心意則是全新的，還沒有被考驗過。' }
    ]
  },
  two_of_cups: {
    names: { marseille: 'Deux de Coupe', thoth: 'Love' },
    timing: { from: '06-22', to: '07-01', basis: 'decan', sign: 'Cancer', planet: 'Venus' },
    related: [
      { card: 'lovers', kind: 'similar', note: '兩張一起出現，關係多半已走過心動，來到要一起做決定的時候，例如同居或見家人；先談清楚彼此最看重什麼。' },
      { card: 'two_of_swords', kind: 'contrast', note: '寶劍二的人蒙著眼、雙劍交叉在胸前，把人擋在外面；聖杯二的兩人則面對面，把杯遞向彼此。' },
      { card: 'ace_of_cups', kind: 'sequence', note: '聖杯一是一個人的心意湧出來，到了聖杯二才遇上回應；可以回頭看那份心意是怎麼開始的。' },
      { card: 'three_of_cups', kind: 'sequence', note: '兩個人的連結往外擴，成了三個人的圈子；接著讀聖杯三，看這段關係能不能融入彼此的朋友與生活。' }
    ]
  },
  three_of_cups: {
    names: { marseille: 'Trois de Coupe', thoth: 'Abundance' },
    timing: { from: '07-02', to: '07-12', basis: 'decan', sign: 'Cancer', planet: 'Mercury' },
    related: [
      { card: 'four_of_wands', kind: 'similar', note: '權杖四也是慶祝，重點在一個階段完成、被人承認；聖杯三慶祝的是情誼本身，不一定要有什麼成就。' },
      { card: 'three_of_swords', kind: 'contrast', note: '同樣是三：寶劍三是被三把劍刺穿的心，聖杯三是三只舉高的杯；一個是關係裡的傷，一個是關係裡的慶祝。' },
      { card: 'nine_of_cups', kind: 'contrast', note: '聖杯九的人獨自坐在一排杯子前享受，聖杯三的杯舉在三人之間；前者的滿足屬於自己，後者的喜悅要有人分享。' },
      { card: 'four_of_cups', kind: 'sequence', note: '熱鬧之後常是膩：聖杯四的人獨自坐在樹下，對遞來的杯提不起興趣，可讀成慶祝過後的倦怠。' }
    ]
  },
  four_of_cups: {
    names: { marseille: 'Quatre de Coupe', thoth: 'Luxury' },
    timing: { from: '07-13', to: '07-22', basis: 'decan', sign: 'Cancer', planet: 'Moon' },
    related: [
      { card: 'four_of_swords', kind: 'similar', note: '看休息有沒有用：寶劍四的累，睡飽幾天就回得來；聖杯四的悶常是睡再久也不見好，得找出讓心收起來的原因。' },
      { card: 'seven_of_cups', kind: 'contrast', note: '兩張都有從雲裡來的杯：聖杯七的杯太多，樣樣都想要；聖杯四只有一只遞來的杯，他卻一只都不想要。' },
      { card: 'eight_of_cups', kind: 'sequence', note: '若聖杯四之後接著出現聖杯八，先確認你想走是因為看清了這裡不夠，而不只是悶久了想換個地方。' },
      { card: 'hermit', kind: 'similar', note: '隱士也退出人群，但他提著燈在找答案；聖杯四的退出沒有方向，只是不想再被打擾。' }
    ]
  },
  five_of_cups: {
    names: { marseille: 'Cinq de Coupe', thoth: 'Disappointment' },
    timing: { from: '10-24', to: '11-02', basis: 'decan', sign: 'Scorpio', planet: 'Mars' },
    related: [
      { card: 'three_of_swords', kind: 'similar', note: '寶劍三是心被刺穿的那一刻；聖杯五在那之後，人站在原地一遍遍回想。前者先哀悼，後者要學著轉身。' },
      { card: 'death', kind: 'pair', note: '聖杯五的旬位是火星在天蠍座，死神則對應天蠍座；死神談結束這件事，聖杯五談結束之後的悲傷。' },
      { card: 'six_of_cups', kind: 'sequence', note: '轉過身之後，回憶不再只有遺憾；接著讀聖杯六，看看過去還留下哪些溫暖可以帶走。' },
      { card: 'ace_of_cups', kind: 'contrast', note: '聖杯一的水滿到自己溢出來，聖杯五的杯卻倒在地上；一個是心意流出去，一個是失去的東西流走。' }
    ]
  },
  six_of_cups: {
    names: { marseille: 'Six de Coupe', thoth: 'Pleasure' },
    timing: { from: '11-03', to: '11-12', basis: 'decan', sign: 'Scorpio', planet: 'Sun' },
    related: [
      { card: 'sun', kind: 'pair', note: '黃金黎明把聖杯六配給天蠍座的太陽，太陽牌也畫著孩子；兩張都是單純的快樂，一個在當下，一個在回憶裡。' },
      { card: 'page_of_cups', kind: 'similar', note: '侍者的童心是此刻正冒出來的新感受，聖杯六的童心來自過去；一個向前好奇，一個向後回味。' },
      { card: 'seven_of_cups', kind: 'sequence', note: '聖杯六看向過去，聖杯七看向想像中的未來；兩張接連出現時，留意自己是不是兩頭都不在當下。' },
      { card: 'eight_of_cups', kind: 'contrast', note: '聖杯六回到熟悉的庭院，聖杯八則背對整齊的杯子走進夜裡；一個是回去，一個是離開。' }
    ]
  },
  seven_of_cups: {
    names: { marseille: 'Sept de Coupe', thoth: 'Debauch' },
    timing: { from: '11-13', to: '11-22', basis: 'decan', sign: 'Scorpio', planet: 'Venus' },
    related: [
      { card: 'moon', kind: 'similar', note: '月亮也讓人看不清真假，但那片迷霧來自恐懼與不安；聖杯七的迷惑則來自太多誘人的想像。' },
      { card: 'ace_of_swords', kind: 'contrast', note: '聖杯七的杯子全飄在雲裡，樣樣都像答案；寶劍一則是一把劍從雲中直直伸出，把事情切開看清。' },
      { card: 'eight_of_cups', kind: 'sequence', note: '看清哪些只是幻想之後，聖杯八的人起身離開；接著讀，是放下不實際的選項，去找真正想要的。' },
      { card: 'four_of_cups', kind: 'contrast', note: '聖杯四對遞來的一只杯提不起勁，聖杯七卻對雲上的七只杯樣樣想要；一個缺胃口，一個缺取捨。' }
    ]
  },
  eight_of_cups: {
    names: { marseille: 'Huit de Coupe', thoth: 'Indolence' },
    timing: { from: '02-19', to: '02-29', basis: 'decan', sign: 'Pisces', planet: 'Saturn' },
    related: [
      { card: 'hermit', kind: 'similar', note: '兩人都拄著杖獨自上路：隱士已經站上山頂、提燈照路，聖杯八的人才剛轉身，還在往山裡走。' },
      { card: 'moon', kind: 'pair', note: '聖杯八的旬位是土星在雙魚座，月亮牌對應雙魚座；並見時，問問自己是看清了才走，還是被不安推著走。' },
      { card: 'nine_of_cups', kind: 'contrast', note: '聖杯九的人坐在杯前面對我們，聖杯八的人背對杯子走開；同樣擁有，一個知足，一個覺得不夠。' },
      { card: 'seven_of_cups', kind: 'sequence', note: '聖杯七還在雲上的杯子之間挑選；到了聖杯八，人已經知道哪些不是自己要的，起身走開。' }
    ]
  },
  nine_of_cups: {
    names: { marseille: 'Neuf de Coupe', thoth: 'Happiness' },
    timing: { from: '03-01', to: '03-10', basis: 'decan', sign: 'Pisces', planet: 'Jupiter' },
    related: [
      { card: 'four_of_cups', kind: 'pair', note: '同樣雙臂抱胸坐著：聖杯九心滿意足，聖杯四什麼都提不起勁。差別不在擁有多少，而在心裡要不要。' },
      { card: 'ten_of_cups', kind: 'sequence', note: '從九到十，滿足從一個人擴大到一家人；接著讀聖杯十，看這份好能不能分出去。' },
      { card: 'temperance', kind: 'contrast', note: '聖杯九逆位的問題常是過量；節制的天使在兩只杯之間調配分量，正好提醒享受要有比例。' },
      { card: 'wheel_of_fortune', kind: 'pair', note: '黃金黎明把聖杯九配給雙魚座的木星，命運之輪屬木星；好運來時盡情享受，也記得輪子還會再轉。' }
    ]
  },
  ten_of_cups: {
    names: { marseille: 'Dix de Coupe', thoth: 'Satiety' },
    timing: { from: '03-11', to: '03-20', basis: 'decan', sign: 'Pisces', planet: 'Mars' },
    related: [
      { card: 'nine_of_cups', kind: 'sequence', note: '聖杯九的滿足屬於一個人，到了聖杯十才和一家人一起擁有；兩張接連出現，好事多半會分享出去。' },
      { card: 'three_of_cups', kind: 'similar', note: '兩張都是一群人的幸福：聖杯三是朋友圍成的圈，聖杯十是要一起過日子的家人，承諾更深，磨合也更多。' },
      { card: 'ten_of_wands', kind: 'contrast', note: '權杖十的人獨自抱著十根杖，看不見前方；聖杯十的杯掛在天上的彩虹裡，兩個大人一起抬頭看，誰也不必背著。' },
      { card: 'four_of_wands', kind: 'similar', note: '權杖四的人在花環下高舉花束，聖杯十的那對男女朝彩虹舉起手臂；前者慶祝一個階段，後者是日常本身。' }
    ]
  },
  page_of_cups: {
    names: { marseille: 'Valet de Coupe', thoth: 'Princess of Cups', aliases: ['聖杯侍從', '聖杯隨從'] },
    timing: null,
    related: [
      { card: 'ace_of_cups', kind: 'similar', note: '逆位時卡住的地方不同：聖杯一是心門關著，感受流不出去；侍者是感受有了，卻因任性或怕被笑而停在想像。' },
      { card: 'knight_of_cups', kind: 'sequence', note: '兩張同時出現，常是兩人走在不同階段：一方還在試探，另一方已捧著杯靠近；先看清你是哪一位，再決定步調。' },
      { card: 'page_of_swords', kind: 'contrast', note: '寶劍侍者舉劍戒備，凡事先查清楚；聖杯侍者則好奇地看著杯裡的魚。一個靠懷疑學習，一個靠感受學習。' },
      { card: 'fool', kind: 'similar', note: '愚者和聖杯侍者都帶著天真：愚者的天真是敢出發，侍者的天真是敢感受；前者往外走，後者往內看。' }
    ]
  },
  knight_of_cups: {
    names: { marseille: 'Cavalier de Coupe', thoth: 'Prince of Cups', thothAlt: 'Knight of Cups' },
    timing: null,
    related: [
      { card: 'page_of_cups', kind: 'sequence', note: '逆位時兩張都說得比做得多：侍者多半真誠卻不成熟；騎士則可能刻意用好話換取信任，更要看行動。' },
      { card: 'seven_of_cups', kind: 'similar', note: '逆位的騎士常愛上想像中的對象，這正是聖杯七的課題；兩張一起出現，先確認那只杯裡裝的是真的。' },
      { card: 'knight_of_swords', kind: 'contrast', note: '寶劍騎士用論點說服人，話直、出手快；聖杯騎士用心意打動人，步調慢。前者容易傷人，後者容易讓人空等。' },
      { card: 'queen_of_cups', kind: 'sequence', note: '騎士把杯捧向別人，皇后則把杯捧在自己面前細看；從騎士讀到皇后，是從表達心意走到能承接感受。' }
    ]
  },
  queen_of_cups: {
    names: { marseille: 'Reine de Coupe', thoth: 'Queen of Cups', aliases: ['聖杯王后', '聖杯女王'] },
    timing: null,
    related: [
      { card: 'king_of_cups', kind: 'pair', note: '皇后坐在海邊，國王的王座浮在海中央；兩張同時出現，常是一個要靠情感與耐心、而不是靠講理來處理的局面。' },
      { card: 'queen_of_swords', kind: 'contrast', note: '兩位皇后都有界線：寶劍皇后用清楚的話說「不」，聖杯皇后用同理接住人；要聽真話找前者，要被懂找後者。' },
      { card: 'empress', kind: 'similar', note: '皇后牌透過身體、生活與作品來滋養，聖杯皇后滋養的是心情；一個讓東西長大，一個讓人覺得被懂。' },
      { card: 'moon', kind: 'similar', note: '逆位的聖杯皇后被情緒淹沒、分不清是誰的感受，月亮則是看不清真假；兩張一起出現，先把感受和事實分開。' }
    ]
  },
  king_of_cups: {
    names: { marseille: 'Roi de Coupe', thoth: 'Knight of Cups', thothAlt: 'Prince of Cups' },
    timing: null,
    related: [
      { card: 'king_of_swords', kind: 'contrast', note: '寶劍國王依規則裁決，求公正；聖杯國王依人情調解，求各方都能接受。前者判對錯，後者化解僵局。' },
      { card: 'queen_of_cups', kind: 'pair', note: '皇后的杯加了蓋、捧在面前細看，國王一手持杯、一手持權杖；兩張同時出現，常是要雙方一起穩住情緒的關係。' },
      { card: 'temperance', kind: 'similar', note: '節制在兩只杯之間調配比例，聖杯國王在感受與職責之間取得平衡；節制談的是慢慢磨合，國王談的是當下穩住。' },
      { card: 'knight_of_cups', kind: 'sequence', note: '騎士被心意推著上路，國王則是情感成熟後坐穩的人；從騎士讀到國王，是從跟著感覺走，到能感受也能決斷。' }
    ]
  },
  ace_of_swords: {
    names: { marseille: 'As d\'Épée', thoth: 'Root of the Powers of Air', aliases: ['寶劍王牌'] },
    timing: null,
    related: [
      { card: 'sun', kind: 'similar', note: '太陽的清楚是一切攤在光下、人也跟著輕鬆；寶劍一是一刀切開，看清了卻不一定舒服。' },
      { card: 'moon', kind: 'contrast', note: '月亮光線不足，宜慢、宜分辨；寶劍一的霧已被切開，宜下決定。兩張先後出現，常是從看不清走到想通。' },
      { card: 'ace_of_cups', kind: 'pair', note: '同樣是雲中伸出的手：聖杯一托著杯，讓感情流出去；寶劍一握緊劍柄，要把事情切開。' },
      { card: 'two_of_swords', kind: 'sequence', note: '一把劍剛把事情切清楚，到了二就多出另一把：有了兩種說法，選擇與迴避也跟著出現。' }
    ]
  },
  two_of_swords: {
    names: { marseille: 'Deux d\'Épée', thoth: 'Peace' },
    timing: { from: '09-23', to: '10-02', basis: 'decan', sign: 'Libra', planet: 'Moon' },
    related: [
      { card: 'justice', kind: 'contrast', note: '寶劍二屬黃金黎明天秤座的第一旬，正義對應天秤座本身；同是端坐求平衡，正義秤完就判，寶劍二撐著不判。' },
      { card: 'high_priestess', kind: 'pair', note: '兩位女子都靜坐、不急著開口，身邊也都有月亮。女祭司的沉默是在聽，寶劍二的沉默是在擋。' },
      { card: 'two_of_cups', kind: 'contrast', note: '同樣是兩方相對：聖杯二的兩人面對面交換杯子，寶劍二蒙著眼把劍交叉在胸前。一個打開，一個關上。' },
      { card: 'three_of_swords', kind: 'sequence', note: '被擋在背後的事實一旦說破，就走到寶劍三：靠迴避換來的平靜，常以一次更痛的揭露收場。' }
    ]
  },
  three_of_swords: {
    names: { marseille: 'Trois d\'Épée', thoth: 'Sorrow' },
    timing: { from: '10-03', to: '10-13', basis: 'decan', sign: 'Libra', planet: 'Saturn' },
    related: [
      { card: 'five_of_cups', kind: 'similar', note: '都是悲傷，時間點不同：寶劍三是被刺中的當下，聖杯五是事後低頭看著倒掉的杯，開始懊悔與回想。' },
      { card: 'three_of_cups', kind: 'contrast', note: '同是三：聖杯三是三人圍成一圈舉杯，寶劍三是三把劍交會在心上；一個是分享的喜悅，一個是說破的傷。' },
      { card: 'two_of_swords', kind: 'sequence', note: '前一張蒙著眼不看，到了寶劍三，避不開的事實直接刺進心裡；迴避的代價常在這裡一次結清。' },
      { card: 'four_of_swords', kind: 'sequence', note: '心被刺穿之後，寶劍四讓人躺下來休養：悲傷先被感受過，接著需要一段不被打擾的復原。' }
    ]
  },
  four_of_swords: {
    names: { marseille: 'Quatre d\'Épée', thoth: 'Truce' },
    timing: { from: '10-14', to: '10-23', basis: 'decan', sign: 'Libra', planet: 'Jupiter' },
    related: [
      { card: 'hermit', kind: 'similar', note: '兩張都退出人群。隱士站在山頂提著燈，為的是找方向；寶劍四閉眼躺下，為的是復原，暫時連答案也不找。' },
      { card: 'hanged_man', kind: 'similar', note: '都是主動的暫停。倒吊人藉停頓換個位置看事情，寶劍四停下來只為恢復力氣；前者要你轉念，後者要你先睡飽。' },
      { card: 'three_of_swords', kind: 'sequence', note: '寶劍三是受傷的那一刻，寶劍四是傷後的安歇：前一張讓痛被感受，這一張讓身心有時間修補。' },
      { card: 'knight_of_swords', kind: 'contrast', note: '同花色的兩種速度：騎士全速衝鋒、片刻不停，寶劍四的人平躺不動。衝得太久的人，常該接著讀這一張。' }
    ]
  },
  five_of_swords: {
    names: { marseille: 'Cinq d\'Épée', thoth: 'Defeat' },
    timing: { from: '01-21', to: '01-29', basis: 'decan', sign: 'Aquarius', planet: 'Venus' },
    related: [
      { card: 'five_of_wands', kind: 'similar', note: '同是五的衝突：權杖五可以訂好規則、好好比一場；寶劍五要先問這場值不值得贏，有時退出就是止損。' },
      { card: 'six_of_wands', kind: 'contrast', note: '都是贏家：權杖六的勝利有人簇擁遊行，寶劍五的勝利沒人留下慶祝。差別在贏的方式讓旁人站到哪一邊。' },
      { card: 'strength', kind: 'contrast', note: '力量牌的女子不拿武器，只用雙手讓獅子安靜；寶劍五把大半的劍收進手裡。一個靠和好服人，一個靠壓制取勝。' },
      { card: 'six_of_swords', kind: 'sequence', note: '畫面裡輸的兩人正走向水邊；到了寶劍六，就有人坐上船渡河。離開一場不公平的仗，是接下來的方向。' }
    ]
  },
  six_of_swords: {
    names: { marseille: 'Six d\'Épée', thoth: 'Science' },
    timing: { from: '01-30', to: '02-08', basis: 'decan', sign: 'Aquarius', planet: 'Mercury' },
    related: [
      { card: 'eight_of_cups', kind: 'similar', note: '聖杯八的杯全留在原地，寶劍六的劍卻跟著上船。一個放下完好的東西，一個帶傷離開；問自己這次要留下什麼。' },
      { card: 'star', kind: 'pair', note: '依黃金黎明，寶劍六的旬位落在水瓶座，正是星星的星座；一張還在渡河途中，一張已在水邊開始療癒。' },
      { card: 'chariot', kind: 'contrast', note: '戰車的人自己握著方向往前推進；寶劍六的乘客坐著，由船夫撐著走。一個靠意志，一個先接受被載。' },
      { card: 'five_of_swords', kind: 'sequence', note: '寶劍五裡輸的人走向水邊，寶劍六就是渡過去：離開一場不值得的仗，往比較平靜的地方去。' }
    ]
  },
  seven_of_swords: {
    names: { marseille: 'Sept d\'Épée', thoth: 'Futility' },
    timing: { from: '02-09', to: '02-18', basis: 'decan', sign: 'Aquarius', planet: 'Moon' },
    related: [
      { card: 'magician', kind: 'similar', note: '都靠腦筋與手法：魔術師把資源全攤在桌上明著做，寶劍七把劍抱在懷裡悄悄帶走。差在攤不攤開。' },
      { card: 'moon', kind: 'similar', note: '都有看不清的事。月亮是光線不足，未必有人在藏；寶劍七是有人刻意不讓你看見。分清楚才知道該等還是該問。' },
      { card: 'justice', kind: 'contrast', note: '正義要把事實攤開、照實衡量並承擔後果；寶劍七想的是不被看見、全身而退。兩張同現，隱瞞多半難以持久。' },
      { card: 'page_of_swords', kind: 'similar', note: '黃金黎明說寶劍七愛刺探，偉特也給寶劍侍者刺探與祕密任務的牌義；一個已經動手拿，一個還在打聽。' }
    ]
  },
  eight_of_swords: {
    names: { marseille: 'Huit d\'Épée', thoth: 'Interference' },
    timing: { from: '05-21', to: '05-31', basis: 'decan', sign: 'Gemini', planet: 'Jupiter' },
    related: [
      { card: 'devil', kind: 'similar', note: '惡魔的鎖鏈鬆得能取下，寶劍八的腳沒有被綁：兩張都說束縛比感覺的鬆。惡魔是捨不得那份報酬，寶劍八是怕。' },
      { card: 'two_of_swords', kind: 'similar', note: '兩張同現時，常是先選擇不看，拖久了就覺得自己動不了；回頭面對當初不願看的那件事，往往是鬆綁的第一步。' },
      { card: 'hanged_man', kind: 'contrast', note: '倒吊人也被綁著，卻神情平靜、頭有光環，把停頓變成領悟；寶劍八蒙著眼，困境只帶來恐懼。' },
      { card: 'nine_of_swords', kind: 'sequence', note: '白天在寶劍八覺得無路可走，夜裡就成了寶劍九的失眠。困在原地太久，念頭就開始在腦中繞圈。' }
    ]
  },
  nine_of_swords: {
    names: { marseille: 'Neuf d\'Épée', thoth: 'Cruelty' },
    timing: { from: '06-01', to: '06-10', basis: 'decan', sign: 'Gemini', planet: 'Mars' },
    related: [
      { card: 'moon', kind: 'similar', note: '兩張都在夜裡，恐懼都被想像放大。月亮的不安來自外面看不清；寶劍九的折磨多半在自己心裡，常帶著自責。' },
      { card: 'four_of_swords', kind: 'pair', note: '同是躺臥之處：寶劍四平躺安歇，劍靜靜掛著；寶劍九從床上坐起摀臉，劍佔滿黑暗。一個睡得著，一個睡不著。' },
      { card: 'nine_of_cups', kind: 'contrast', note: '同是九，花色最濃的時刻：聖杯九抱胸笑著守著到齊的杯，寶劍九在黑暗裡摀著臉；一個滿足，一個煎熬。' },
      { card: 'eight_of_swords', kind: 'sequence', note: '寶劍八被困在泥地裡，到了九，困住人的念頭追進了臥房。兩張相連時，先處理那個「我出不去」的念頭。' }
    ]
  },
  ten_of_swords: {
    names: { marseille: 'Dix d\'Épée', thoth: 'Ruin' },
    timing: { from: '06-11', to: '06-21', basis: 'decan', sign: 'Gemini', planet: 'Sun' },
    related: [
      { card: 'ten_of_wands', kind: 'similar', note: '權杖十的重擔是自己攬上身的，寶劍十的劍從背後刺來。同現時先分清：哪些苦能放下，哪些只能承認它結束了。' },
      { card: 'judgement', kind: 'contrast', note: '寶劍十的人俯臥在地，審判裡的人從石棺中站起、舉手回應號角。一個是倒下的最低點，一個是聽見召喚後起身。' },
      { card: 'sun', kind: 'pair', note: '黃金黎明把寶劍十配給太陽在雙子座；寶劍十只在地平線透出一道金光，太陽牌已是滿天日光。' },
      { card: 'ace_of_swords', kind: 'sequence', note: '十是一輪走完，接著回到寶劍一：一段被切斷的結束之後，常會接著出現一個新的、更清楚的想法。' }
    ]
  },
  page_of_swords: {
    names: { marseille: 'Valet d\'Épée', thoth: 'Princess of Swords', aliases: ['寶劍侍從', '寶劍隨從'] },
    timing: null,
    related: [
      { card: 'page_of_pentacles', kind: 'similar', note: '兩位侍者都在學。錢幣侍者站在草地上盯著一枚錢幣慢慢弄懂；寶劍侍者頂著風四處留意，學得快，也容易分心。' },
      { card: 'high_priestess', kind: 'contrast', note: '女祭司守著祕密，不急著說；寶劍侍者想把祕密查出來、問個明白。一個靜待答案浮現，一個主動追問。' },
      { card: 'seven_of_swords', kind: 'similar', note: '偉特的寶劍侍者有刺探與祕密任務，黃金黎明的寶劍七也愛刺探；侍者還在打聽，七已經動手拿走。' },
      { card: 'knight_of_swords', kind: 'sequence', note: '侍者舉劍觀察風向，騎士已提劍衝出去；侍者查清楚才開口，騎士常是邊衝邊說。' }
    ]
  },
  knight_of_swords: {
    names: { marseille: 'Cavalier d\'Épée', thoth: 'Prince of Swords', thothAlt: 'Knight of Swords' },
    timing: null,
    related: [
      { card: 'chariot', kind: 'similar', note: '兩張都是全力前進。戰車其實停得很穩，駕車者靠意志統合兩股力量；寶劍騎士一路狂奔，沒留煞車的餘地。' },
      { card: 'eight_of_wands', kind: 'similar', note: '都很快，來源不同：權杖八是局勢自己在飛，跟上即可；寶劍騎士是一個人憑衝勁往前推，得先問方向。' },
      { card: 'knight_of_pentacles', kind: 'contrast', note: '錢幣騎士的馬四蹄著地、站著不動，寶劍騎士的馬伸展到最長；一個先確認再走，一個想到就衝。' },
      { card: 'page_of_swords', kind: 'sequence', note: '侍者還在山丘上觀察風向，騎士已把查到的結論帶上馬背衝出去。從侍者到騎士，是從蒐集走到行動。' }
    ]
  },
  queen_of_swords: {
    names: { marseille: 'Reine d\'Épée', thoth: 'Queen of Swords', aliases: ['寶劍王后', '寶劍女王'] },
    timing: null,
    related: [
      { card: 'justice', kind: 'similar', note: '兩人都端坐、右手直舉著劍；正義另一手提著天平秤後果，皇后另一手掌心朝上，判斷之外仍伸出手。' },
      { card: 'queen_of_cups', kind: 'contrast', note: '聖杯皇后垂眼看著加蓋的杯，先讀懂人的心情；寶劍皇后直舉著劍望向前方，先說出實話。' },
      { card: 'king_of_swords', kind: 'pair', note: '王座都刻著蝴蝶。兩張同現，常是一件事得先有人說清實話，再由人照規則拍板；少了前一步，裁決容易失準。' },
      { card: 'three_of_swords', kind: 'similar', note: '偉特說寶劍皇后與悲傷相熟。寶劍三的心碎若被好好消化，就可能長成她那份不再輕易受騙的清醒。' }
    ]
  },
  king_of_swords: {
    names: { marseille: 'Roi d\'Épée', thoth: 'Knight of Swords', thothAlt: 'Prince of Swords' },
    timing: null,
    related: [
      { card: 'emperor', kind: 'similar', note: '兩張都是權威。皇帝靠結構與秩序撐住局面，寶劍國王靠論證與判斷；前者問規矩在不在，後者問道理通不通。' },
      { card: 'king_of_cups', kind: 'contrast', note: '聖杯國王在浪中穩住情緒、先照顧人；寶劍國王在晴空下依原則裁決、先釐清理。' },
      { card: 'queen_of_swords', kind: 'pair', note: '王座同刻蝴蝶，手勢不同：皇后另一手向前伸出，國王的手安放膝上。一個仍向人伸手，一個先按住、聽完再判。' },
      { card: 'knight_of_swords', kind: 'sequence', note: '騎士憑「我是對的」的確信衝鋒，國王坐下來先看證據再判。騎士的鋒利若學會等待，就長成國王的權威。' }
    ]
  },
  ace_of_pentacles: {
    names: { marseille: 'As de Deniers', thoth: 'Root of the Powers of Earth', aliases: ['錢幣王牌', '星幣一', '星幣王牌', '金幣一', '金幣王牌', '五角星一', '五角星王牌'] },
    timing: null,
    related: [
      { card: 'page_of_pentacles', kind: 'similar', note: '都是起步。錢幣一是遞到手上的機會或資源，錢幣侍者則是接手之後，那份願意從頭學起的態度。' },
      { card: 'wheel_of_fortune', kind: 'similar', note: '都帶來外來的機會，但命運之輪說的是時勢在轉、來去不由人；錢幣一的機會落在掌心，照顧得好就留得住。' },
      { card: 'five_of_pentacles', kind: 'contrast', note: '錢幣一的手把錢幣直接遞到面前；錢幣五的錢幣嵌在窗上，兩人卻從窗下走過。一個是給予，一個是錯過。' },
      { card: 'ten_of_pentacles', kind: 'sequence', note: '錢幣一是這個花色的第一顆種子，錢幣十是它長成的家業；兩張一起出現，可讀成從起步到傳承的整段路。' }
    ]
  },
  two_of_pentacles: {
    names: { marseille: 'Deux de Deniers', thoth: 'Change', aliases: ['星幣二', '金幣二', '五角星二'] },
    timing: { from: '12-22', to: '12-31', basis: 'decan', sign: 'Capricorn', planet: 'Jupiter' },
    related: [
      { card: 'magician', kind: 'pair', note: '錢幣二的綠帶繞成橫躺的八字，魔術師頭上也浮著同一個符號；一個在變動裡周轉，一個把資源集中起來動手。' },
      { card: 'two_of_swords', kind: 'contrast', note: '兩張二號牌的背後都是海。寶劍二靠蒙眼不動撐住平衡，錢幣二靠一直動來維持；一個停住，一個不停。' },
      { card: 'temperance', kind: 'similar', note: '都在兩者之間求平衡。節制把兩邊調成新的比例，錢幣二則輪流照顧兩邊，不求融合，只求一樣都不掉。' },
      { card: 'three_of_pentacles', kind: 'sequence', note: '一個人拋接兩件事之後，錢幣三把工作帶進團隊；忙不過來時，下一步往往是找人分工。' }
    ]
  },
  three_of_pentacles: {
    names: { marseille: 'Trois de Deniers', thoth: 'Works', aliases: ['星幣三', '金幣三', '五角星三'] },
    timing: { from: '01-01', to: '01-10', basis: 'decan', sign: 'Capricorn', planet: 'Mars' },
    related: [
      { card: 'eight_of_pentacles', kind: 'similar', note: '兩張都在做手藝。錢幣八埋頭獨自精進，錢幣三把手藝放進合作裡，要能向人說明，也要接受修改。' },
      { card: 'three_of_cups', kind: 'similar', note: '同樣是三個人圍著同一件事：聖杯三一起慶祝，錢幣三一起做工；一個分享成果，一個還在成果出來之前。' },
      { card: 'five_of_wands', kind: 'contrast', note: '權杖五也是一群人同時出力，卻各推各的、互相抵銷；錢幣三分工清楚，力氣才加在同一道門上。' },
      { card: 'four_of_pentacles', kind: 'sequence', note: '成果蓋好之後，錢幣四開始守住它；從一起建造走到獨自緊握，是這個花色接下來的轉折。' }
    ]
  },
  four_of_pentacles: {
    names: { marseille: 'Quatre de Deniers', thoth: 'Power', aliases: ['星幣四', '金幣四', '五角星四'] },
    timing: { from: '01-11', to: '01-20', basis: 'decan', sign: 'Capricorn', planet: 'Sun' },
    related: [
      { card: 'devil', kind: 'pair', note: '黃金黎明把錢幣四配給太陽在摩羯座，摩羯座在大牌屬惡魔；兩張都在問，你擁有的東西是否也擁有了你。' },
      { card: 'emperor', kind: 'similar', note: '兩人都戴冠、正面坐在石座上。皇帝用秩序治理一片領土，錢幣四則把權力收回自己身上，只守不治。' },
      { card: 'six_of_pentacles', kind: 'contrast', note: '錢幣四把每一枚錢幣都貼在身上，錢幣六讓錢幣從手中落下；同樣有錢，一個守，一個分。' },
      { card: 'five_of_pentacles', kind: 'sequence', note: '四的穩定一旦被打破，就走到錢幣五；兩張相連，常在提醒安全感不能只靠緊抓。' }
    ]
  },
  five_of_pentacles: {
    names: { marseille: 'Cinq de Deniers', thoth: 'Worry', aliases: ['星幣五', '金幣五', '五角星五'] },
    timing: { from: '04-20', to: '04-30', basis: 'decan', sign: 'Taurus', planet: 'Mercury' },
    related: [
      { card: 'six_of_pentacles', kind: 'sequence', note: '常有人把兩張連著讀：雪地裡走過窗下的人，到了錢幣六伸出手、得到給予；開口之後，才有施與受的流動。' },
      { card: 'five_of_cups', kind: 'similar', note: '都是五號牌的失去。聖杯五失去的是情感與期待，錢幣五缺的是錢、健康與棲身處；前者要哀悼，後者先求溫飽。' },
      { card: 'hermit', kind: 'contrast', note: '兩張都在雪地裡：隱士提著自己的燈，是選擇的獨處；錢幣五的光在窗裡，不屬於他們，是被迫的孤立。' },
      { card: 'four_of_pentacles', kind: 'sequence', note: '前一張錢幣四守著擁有的一切，錢幣五則是那份穩定被打破之後；害怕失去的事，在這裡成真了。' }
    ]
  },
  six_of_pentacles: {
    names: { marseille: 'Six de Deniers', thoth: 'Success', aliases: ['星幣六', '金幣六', '五角星六'] },
    timing: { from: '05-01', to: '05-10', basis: 'decan', sign: 'Taurus', planet: 'Moon' },
    related: [
      { card: 'hierophant', kind: 'pair', note: '黃金黎明的錢幣六是月亮在金牛座，金牛座屬教皇；兩張都有兩人跪著領受，一個領的是祝福，一個領的是錢。' },
      { card: 'four_of_pentacles', kind: 'contrast', note: '同樣手上有錢，錢幣四抱緊不放，錢幣六秤過之後分出去；兩張對看，問的是你的資源往哪裡流。' },
      { card: 'five_of_pentacles', kind: 'sequence', note: '錢幣五是窗外缺乏的人，錢幣六是終於有人伸出手；兩張連著出現，常指求援之後得到回應。' },
      { card: 'queen_of_pentacles', kind: 'similar', note: '都在用資源照顧人。錢幣皇后天天打理自己的家與身邊的人；錢幣六面對的是跪著求助的外人，給多少要先秤過。' }
    ]
  },
  seven_of_pentacles: {
    names: { marseille: 'Sept de Deniers', thoth: 'Failure', aliases: ['星幣七', '金幣七', '五角星七'] },
    timing: { from: '05-11', to: '05-20', basis: 'decan', sign: 'Taurus', planet: 'Saturn' },
    related: [
      { card: 'hanged_man', kind: 'similar', note: '都在等。倒吊人的等是放下控制、換個角度看；錢幣七的等帶著盤點，要算清楚投入與回報。' },
      { card: 'eight_of_wands', kind: 'contrast', note: '權杖八的事情自己飛快抵達，錢幣七的作物只能照季節慢慢長；一個要你跟上速度，一個要你耐住時間。' },
      { card: 'eight_of_pentacles', kind: 'sequence', note: '評估之後回到工作台：錢幣八接在錢幣七之後，把盤點出的不足，變成一枚一枚的練習。' },
      { card: 'nine_of_pentacles', kind: 'contrast', note: '錢幣七的錢幣還掛在枝上沒熟，錢幣九已是能從容漫步的園子；兩張同現，常在提醒撐過評估期，才輪得到享用。' }
    ]
  },
  eight_of_pentacles: {
    names: { marseille: 'Huit de Deniers', thoth: 'Prudence', aliases: ['星幣八', '金幣八', '五角星八'] },
    timing: { from: '08-23', to: '09-02', basis: 'decan', sign: 'Virgo', planet: 'Sun' },
    related: [
      { card: 'hermit', kind: 'pair', note: '黃金黎明把錢幣八配給太陽在處女座，處女座屬隱士；兩張都是獨自專注，一個向內求道，一個在手上求精。' },
      { card: 'magician', kind: 'similar', note: '都和本事有關。魔術師的工具齊備，重點在把它們用出來；錢幣八手上只有槌和鑿，重點在一遍遍練熟。' },
      { card: 'eight_of_cups', kind: 'contrast', note: '錢幣八的人坐下來刻下一枚，聖杯八的人背對八只杯離開；兩張同現，問的是這份工該再練，還是該走了。' },
      { card: 'three_of_pentacles', kind: 'similar', note: '練熟之後，下一步常是讓別人看見：錢幣三的工匠站上矮凳，和委託人、設計者一起完成作品。' }
    ]
  },
  nine_of_pentacles: {
    names: { marseille: 'Neuf de Deniers', thoth: 'Gain', aliases: ['星幣九', '金幣九', '五角星九'] },
    timing: { from: '09-03', to: '09-12', basis: 'decan', sign: 'Virgo', planet: 'Venus' },
    related: [
      { card: 'empress', kind: 'pair', note: '黃金黎明把錢幣九配給金星在處女座，金星屬皇后；兩位女子都身處豐饒的自然，一個滋養萬物，一個享用收成。' },
      { card: 'hermit', kind: 'similar', note: '都是一個人。隱士獨處是為了向內找答案，錢幣九則在享受已經建立的生活；一個還在路上，一個已經到家。' },
      { card: 'king_of_pentacles', kind: 'pair', note: '兩張都長滿葡萄。錢幣九的園子只養她自己，錢幣國王的產業還得養活一群人：同樣富足，肩上的責任差很多。' },
      { card: 'eight_of_pentacles', kind: 'sequence', note: '錢幣八埋頭打造，錢幣九享受成果；從勞動到收穫，中間隔著一段看不見的累積。' }
    ]
  },
  ten_of_pentacles: {
    names: { marseille: 'Dix de Deniers', thoth: 'Wealth', aliases: ['星幣十', '金幣十', '五角星十'] },
    timing: { from: '09-13', to: '09-22', basis: 'decan', sign: 'Virgo', planet: 'Mercury' },
    related: [
      { card: 'four_of_pentacles', kind: 'contrast', note: '錢幣四的錢幣全貼在一人身上，錢幣十的錢幣散在整個畫面、人人身在其中；一邊是個人守成，一邊是共同家業。' },
      { card: 'hierophant', kind: 'similar', note: '都談傳承。教皇透過制度與教導把規矩傳下去，錢幣十則透過家族、財產與姓氏；一個靠師承，一個靠血緣。' },
      { card: 'ace_of_pentacles', kind: 'sequence', note: '錢幣十是錢幣一那顆種子長滿的樣子；滿了之後，新的一輪又會從另一個一號牌開始。' },
      { card: 'five_of_pentacles', kind: 'contrast', note: '錢幣十的一家人站在拱門下，錢幣五的人在窗外的雪地；同樣有建築與錢幣，一邊是歸屬，一邊被排除在外。' }
    ]
  },
  page_of_pentacles: {
    names: { marseille: 'Valet de Deniers', thoth: 'Princess of Disks', aliases: ['錢幣侍從', '錢幣隨從', '星幣侍者', '星幣侍從', '星幣隨從', '金幣侍者', '金幣侍從', '金幣隨從', '五角星侍者', '五角星侍從', '五角星隨從'] },
    timing: null,
    related: [
      { card: 'ace_of_pentacles', kind: 'similar', note: '都在起點。錢幣一是機會遞到眼前，錢幣侍者是捧著它細看、準備學會怎麼用；一個是資源，一個是態度。' },
      { card: 'knight_of_pentacles', kind: 'sequence', note: '侍者學會了，下一步是錢幣騎士：把學來的東西天天照著做，從弄懂走到做到。' },
      { card: 'fool', kind: 'contrast', note: '愚者仰頭看天、邁步出發；錢幣侍者站定，目光緊盯手上的錢幣。兩種開始，一個靠勇氣，一個靠觀察。' },
      { card: 'page_of_swords', kind: 'similar', note: '兩位侍者都在學。寶劍侍者靠提問、查證與辯論學，錢幣侍者靠動手與反覆觀察學；一個用腦，一個用手。' }
    ]
  },
  knight_of_pentacles: {
    names: { marseille: 'Cavalier de Deniers', thoth: 'Prince of Disks', thothAlt: 'Knight of Disks', aliases: ['星幣騎士', '金幣騎士', '五角星騎士'] },
    timing: null,
    related: [
      { card: 'knight_of_swords', kind: 'contrast', note: '寶劍騎士全速衝刺，錢幣騎士的馬站著不動；一個靠速度與判斷推進，一個靠耐力與紀律。' },
      { card: 'page_of_pentacles', kind: 'sequence', note: '錢幣侍者還在端詳錢幣、弄懂它是什麼，騎士已經帶著它上路，日復一日地照計畫做。' },
      { card: 'four_of_pentacles', kind: 'similar', note: '都偏向保守與穩定，但錢幣四守住已有的東西不動，錢幣騎士則持續耕作；一個停在原地，一個慢慢前進。' },
      { card: 'seven_of_pentacles', kind: 'similar', note: '兩張都站在翻好的田邊。錢幣七停下來評估收成，錢幣騎士還在照計畫往前；一個問值不值得，一個先把事做完。' }
    ]
  },
  queen_of_pentacles: {
    names: { marseille: 'Reine de Deniers', thoth: 'Queen of Disks', aliases: ['錢幣王后', '錢幣女王', '星幣皇后', '星幣王后', '星幣女王', '金幣皇后', '金幣王后', '金幣女王', '五角星皇后', '五角星王后', '五角星女王'] },
    timing: null,
    related: [
      { card: 'empress', kind: 'similar', note: '都是滋養的形象。皇后談豐饒與創造，偏向自然的生長；錢幣皇后談打理與持家，把豐饒落到預算、三餐與住處。' },
      { card: 'king_of_pentacles', kind: 'pair', note: '同花色的后與王同現，常讀成一個家或事業的內外分工：她管日常收支與身邊的人，他管對外經營與大筆決定。' },
      { card: 'queen_of_swords', kind: 'contrast', note: '寶劍皇后用說清楚的話照顧人，錢幣皇后用做出來的事照顧人；一個給真話，一個給熱飯。' },
      { card: 'ten_of_pentacles', kind: 'similar', note: '都和家有關。錢幣十是一個家幾代人累積的結構，錢幣皇后則是每天讓這個家運作起來的那個人。' }
    ]
  },
  king_of_pentacles: {
    names: { marseille: 'Roi de Deniers', thoth: 'Knight of Disks', thothAlt: 'Prince of Disks', aliases: ['星幣國王', '金幣國王', '五角星國王'] },
    timing: null,
    related: [
      { card: 'emperor', kind: 'pair', note: '兩位君王的王座都刻著動物頭：皇帝是公羊，錢幣國王是公牛。一個以秩序治理，一個以經營讓資源生長。' },
      { card: 'king_of_wands', kind: 'contrast', note: '權杖國王靠願景點火、帶人往前衝，錢幣國王靠經營讓事情長久運作；一個開創，一個守成並擴大。' },
      { card: 'ten_of_pentacles', kind: 'similar', note: '都是建立起來的財富。錢幣國王是正在掌管它的人，錢幣十是它傳下去、比任何一個人都長久的樣子。' },
      { card: 'knight_of_pentacles', kind: 'similar', note: '都是穩紮穩打的人。錢幣騎士照計畫把事做完，錢幣國王決定資源往哪裡投；缺人執行找騎士，缺人拍板找國王。' }
    ]
  }
};
// 符號索引：每個符號列出畫面上看得到它的牌與位置；lineart: false 表示線稿牌組沒畫，rws: false 表示只有線稿牌組有
export const symbolIndex = [
  { id: 'lion', title: '獅子', cards: [
    { card: 'strength', where: '女子俯身輕扶的獅子，尾巴垂下' },
    { card: 'wheel_of_fortune', where: '右下角雲上帶翼的獅子，身前攤著書' },
    { card: 'world', where: '右下角雲中的獅子頭' },
    { card: 'queen_of_wands', where: '王座椅背上的獅子，與兩側扶手上的獅頭' },
    { card: 'king_of_wands', where: '王座椅背上的獅子圖案' },
    { card: 'two_of_cups', where: '雙蛇杖頂端長著翅膀的獅頭' }
  ] },
  { id: 'dog', title: '狗', cards: [
    { card: 'fool', where: '腳邊跳起、仰頭吠叫的白狗' },
    { card: 'moon', where: '左側朝月仰頭嚎叫的狗' },
    { card: 'ten_of_pentacles', where: '老人身旁兩隻白色獵犬，他伸手撫著其中一隻' }
  ] },
  { id: 'wolf', title: '狼', cards: [
    { card: 'moon', where: '右側朝月仰頭嚎叫的狼' }
  ] },
  { id: 'horse', title: '馬', cards: [
    { card: 'death', where: '黑甲骷髏騎著、緩步前行的白馬' },
    { card: 'sun', where: '孩子跨騎的白馬，沒有套韁繩' },
    { card: 'six_of_wands', where: '勝利者騎乘、披著綠色布飾的白馬' },
    { card: 'knight_of_wands', where: '騎士胯下揚起前蹄的橘色馬' },
    { card: 'knight_of_cups', where: '騎士胯下緩步前行的白馬' },
    { card: 'knight_of_swords', where: '騎士胯下全速狂奔、四腿伸展的白馬' },
    { card: 'knight_of_pentacles', where: '騎士胯下四蹄著地、靜立不動的黑馬' }
  ] },
  { id: 'serpent', title: '蛇', cards: [
    { card: 'magician', where: '繞在腰間當腰帶的蛇' },
    { card: 'lovers', where: '纏繞在女子身後果樹上的蛇' },
    { card: 'wheel_of_fortune', where: '沿輪子左側往下行的黃蛇' },
    { card: 'two_of_cups', where: '纏繞在雙蛇杖上的兩條蛇' },
    { card: 'seven_of_cups', where: '上排一只杯中探出身子的蛇' }
  ] },
  { id: 'bird', title: '鳥', cards: [
    { card: 'star', where: '遠處樹梢上停著的紅色長喙鳥（朱鷺）' },
    { card: 'ace_of_cups', where: '銜著聖餅、頭朝下飛向聖杯的白鴿' },
    { card: 'page_of_swords', where: '左上方天空中飛過的一群小鳥' },
    { card: 'knight_of_swords', where: '馬胸前的掛帶上綴著紅色的小鳥紋飾', lineart: false },
    { card: 'queen_of_swords', where: '王冠上方天空中獨自飛過的一隻鳥' },
    { card: 'king_of_swords', where: '右上方天空中遠遠飛過的兩隻小鳥', lineart: false },
    { card: 'nine_of_pentacles', where: '停在她手套上、戴著紅色頭罩的獵鷹' }
  ] },
  { id: 'eagle', title: '鷹', cards: [
    { card: 'wheel_of_fortune', where: '右上角雲上帶翼的老鷹，身前攤著書' },
    { card: 'world', where: '右上角雲中的老鷹頭' }
  ] },
  { id: 'fish', title: '魚', cards: [
    { card: 'page_of_cups', where: '從侍者手中杯口探出頭來的魚' },
    { card: 'knight_of_cups', where: '騎士外袍上印著的魚紋' },
    { card: 'king_of_cups', where: '躍出海面的魚，與國王胸前的魚形墜飾' }
  ] },
  { id: 'crayfish', title: '螯蝦', cards: [
    { card: 'moon', where: '正從前景水池爬上岸的螯蝦' }
  ] },
  { id: 'butterfly', title: '蝴蝶', cards: [
    { card: 'knight_of_swords', where: '馬胸前掛帶上一排黃色的蝴蝶紋飾', lineart: false },
    { card: 'queen_of_swords', where: '王座上雕著的蝴蝶，原版王冠也由蝴蝶組成' },
    { card: 'king_of_swords', where: '王座椅背頂端雕著的蝴蝶' }
  ] },
  { id: 'bull', title: '公牛', cards: [
    { card: 'wheel_of_fortune', where: '左下角雲上帶翼的公牛，身前攤著書' },
    { card: 'world', where: '左下角雲中的公牛頭' },
    { card: 'king_of_pentacles', where: '王座椅背兩角與扶手上雕著的公牛頭' }
  ] },
  { id: 'ram', title: '公羊', cards: [
    { card: 'emperor', where: '石造王座椅背與扶手上的四個公羊頭' }
  ] },
  { id: 'salamander', title: '火蜥蜴', cards: [
    { card: 'page_of_wands', where: '侍者衣袍上印滿的蠑螈紋樣' },
    { card: 'knight_of_wands', where: '騎士黃色短袍上的蠑螈紋樣' },
    { card: 'king_of_wands', where: '王座椅背上的蠑螈圖案，與地上一隻活蠑螈' }
  ] },
  { id: 'sphinx', title: '人面獅身', cards: [
    { card: 'chariot', where: '車前伏著的一黑一白兩隻人面獅身獸' },
    { card: 'wheel_of_fortune', where: '輪頂持劍端坐的藍色人面獅身' }
  ] },
  { id: 'angel', title: '天使', cards: [
    { card: 'lovers', where: '雲端張開雙臂的紅翼紫袍天使' },
    { card: 'wheel_of_fortune', where: '左上角雲上帶翼的人形，身前攤著書' },
    { card: 'temperance', where: '在兩杯之間倒水的紅翼天使' },
    { card: 'judgement', where: '從雲端探身吹響長號的紅翼天使' },
    { card: 'world', where: '左上角雲中的人頭（天使）' },
    { card: 'queen_of_cups', where: '王座上的小天使雕飾；原版聖杯兩側另有帶翼人像' },
    { card: 'queen_of_swords', where: '王座上雕著的有翅膀小天使頭像' },
    { card: 'queen_of_pentacles', where: '石造王座上雕著的小天使頭像' }
  ] },
  { id: 'child', title: '孩童', cards: [
    { card: 'death', where: '馬前跪著仰望騎士的孩童' },
    { card: 'sun', where: '騎在白馬上張開手臂的裸身孩子' },
    { card: 'judgement', where: '從中間石棺站起、舉起雙手的孩子' },
    { card: 'six_of_cups', where: '庭院裡遞出花杯與接杯的兩個孩子' },
    { card: 'ten_of_cups', where: '大人身旁牽著手跳舞的兩個孩子' },
    { card: 'six_of_swords', where: '船上依偎在披斗篷婦人身旁的孩子' },
    { card: 'ten_of_pentacles', where: '拱門下站在母親身旁的小孩' }
  ] },
  { id: 'sun', title: '太陽', cards: [
    { card: 'fool', where: '右上角高懸的白色太陽' },
    { card: 'lovers', where: '天使身後巨大的金色太陽' },
    { card: 'death', where: '遠方兩座塔之間貼著地平線的太陽' },
    { card: 'temperance', where: '小徑盡頭遠山上升起的一圈光芒' },
    { card: 'sun', where: '佔滿畫面上半部、有人臉的太陽' }
  ] },
  { id: 'moon', title: '月亮', cards: [
    { card: 'high_priestess', where: '冠冕上的新月與腳邊的一彎新月' },
    { card: 'chariot', where: '駕車者兩肩的新月形肩甲' },
    { card: 'moon', where: '高掛的圓月，疊著帶人臉側影的新月' },
    { card: 'eight_of_cups', where: '夜空中帶著人臉、疊著月牙的滿月' },
    { card: 'two_of_swords', where: '夜空高處掛著的一彎月牙' },
    { card: 'queen_of_swords', where: '王座底座上的月牙形雕紋', lineart: false },
    { card: 'king_of_swords', where: '王座椅背上雕著的幾彎月牙' }
  ] },
  { id: 'star', title: '星星', cards: [
    { card: 'empress', where: '頭上十二顆星串成的冠冕' },
    { card: 'chariot', where: '綴滿星辰的車篷與冠頂的一顆星' },
    { card: 'hermit', where: '提燈中發光的六芒星' },
    { card: 'devil', where: '兩角之間倒懸的五芒星' },
    { card: 'star', where: '天上一顆大星，周圍環繞七顆小星' },
    { card: 'eight_of_cups', where: '夜空中零星散布的小星點', rws: false },
    { card: 'two_of_swords', where: '夜空中零星散布的幾顆小星星', rws: false }
  ] },
  { id: 'cloud', title: '雲', cards: [
    { card: 'lovers', where: '托著天使的一團白雲' },
    { card: 'wheel_of_fortune', where: '四個角落活物身下的雲團' },
    { card: 'tower', where: '黑色天空中翻湧的雲' },
    { card: 'judgement', where: '天使探身而出的雲端' },
    { card: 'world', where: '四個角落托著活物的雲團' },
    { card: 'ace_of_wands', where: '握杖之手從中伸出的那團雲' },
    { card: 'ace_of_cups', where: '托杯之手從中伸出的雲' },
    { card: 'three_of_cups', where: '三人頭頂天空中的白雲', rws: false },
    { card: 'four_of_cups', where: '遞來第四只杯的手所伸出的雲' },
    { card: 'five_of_cups', where: '灰暗天空中的幾朵雲', rws: false },
    { card: 'six_of_cups', where: '庭院上方天空中的白雲', rws: false },
    { card: 'seven_of_cups', where: '托著七只杯子的雲團' },
    { card: 'ten_of_cups', where: '彩虹上方帶著雨絲的雲', rws: false },
    { card: 'page_of_cups', where: '海面上方天空中的白雲', rws: false },
    { card: 'knight_of_cups', where: '丘陵上方天空中的白雲', rws: false },
    { card: 'queen_of_cups', where: '王座後方天空中的白雲', rws: false },
    { card: 'king_of_cups', where: '海上天空飄著的白雲', rws: false },
    { card: 'ace_of_swords', where: '左側翻捲的灰雲，一隻手從中伸出' },
    { card: 'three_of_swords', where: '畫面上方低垂、濃厚的雲層' },
    { card: 'five_of_swords', where: '天上被撕成一道道鋸齒狀的雲' },
    { card: 'six_of_swords', where: '對岸上空飄著的幾朵白雲', rws: false },
    { card: 'seven_of_swords', where: '金黃天空中飄著的幾朵淡雲', rws: false },
    { card: 'page_of_swords', where: '他身後天空中翻湧飄動的雲' },
    { card: 'knight_of_swords', where: '被強風拉成一道道長條的雲' },
    { card: 'queen_of_swords', where: '王座後方低低浮在地平線上的雲朵' },
    { card: 'king_of_swords', where: '王座兩側背景裡的幾朵白雲' },
    { card: 'ace_of_pentacles', where: '左側的雲，托著錢幣的手從中伸出' }
  ] },
  { id: 'rainbow', title: '彩虹', cards: [
    { card: 'ten_of_cups', where: '橫跨天空、掛著十只杯的彩虹' }
  ] },
  { id: 'lightning', title: '閃電', cards: [
    { card: 'tower', where: '從天劈進塔頂、打飛王冠的閃電' }
  ] },
  { id: 'mountain', title: '山與丘陵', cards: [
    { card: 'fool', where: '崖外遠方覆雪的群山' },
    { card: 'emperor', where: '王座後方光禿的山脈' },
    { card: 'lovers', where: '兩人之間遠處的一座山' },
    { card: 'strength', where: '遠處的一座藍色山峰' },
    { card: 'hermit', where: '他提燈獨立的覆雪峰頂' },
    { card: 'temperance', where: '小徑盡頭、山頂發光的遠山' },
    { card: 'tower', where: '高塔所立的孤立岩峰' },
    { card: 'star', where: '遠方地平線上的山' },
    { card: 'moon', where: '小路盡頭遠方起伏的山巒' },
    { card: 'judgement', where: '石棺後方遠處連綿的雪山' },
    { card: 'ace_of_wands', where: '地平線上遠方的一列山脈', lineart: false },
    { card: 'two_of_wands', where: '海灣對岸遠處的山峰' },
    { card: 'three_of_wands', where: '海灣盡頭遠方的一列山影' },
    { card: 'queen_of_wands', where: '王座後方遠處的黃色山峰', lineart: false },
    { card: 'eight_of_cups', where: '他正要走進的荒涼山嶺' },
    { card: 'knight_of_cups', where: '遠方的山，與河邊的岩崖', lineart: false },
    { card: 'ace_of_swords', where: '畫面最底層一排嶙峋的山峰' },
    { card: 'two_of_swords', where: '海平線遠處低矮的山丘與陸地', lineart: false },
    { card: 'five_of_swords', where: '水面對岸幾座低矮的山丘' },
    { card: 'six_of_swords', where: '對岸樹林後方的一座灰藍色山峰', rws: false },
    { card: 'eight_of_swords', where: '她身後立著城堡的岩崖與山丘' },
    { card: 'ten_of_swords', where: '平靜水面後方一排低矮的遠山' },
    { card: 'page_of_swords', where: '山丘後方遠處起伏的藍色山脈' },
    { card: 'ace_of_pentacles', where: '拱門外、小路盡頭的遠山' },
    { card: 'seven_of_pentacles', where: '農人身後遠處低矮的山丘' },
    { card: 'eight_of_pentacles', where: '遠方城鎮所在的綠色山丘', rws: false },
    { card: 'nine_of_pentacles', where: '葡萄園後方遠處低矮的山丘' },
    { card: 'ten_of_pentacles', where: '城門兩側遠處起伏的綠色山丘', rws: false },
    { card: 'page_of_pentacles', where: '右後方遠處一座淡藍色的山', lineart: false },
    { card: 'knight_of_pentacles', where: '田地後方遠處低矮的綠色山丘' },
    { card: 'queen_of_pentacles', where: '王座左後方遠處的藍色山峰', lineart: false }
  ] },
  { id: 'water', title: '水', cards: [
    { card: 'high_priestess', where: '柱子與帷幕之間的縫隙裡透出的淡藍水面', lineart: false },
    { card: 'empress', where: '右方林間流下的瀑布' },
    { card: 'emperor', where: '山腳下一道細細的水流' },
    { card: 'chariot', where: '身後城牆前流過的一條河' },
    { card: 'death', where: '騎士身後遠方流過的河流' },
    { card: 'temperance', where: '一腳踩進的水池，與兩杯之間倒流的水' },
    { card: 'star', where: '她一腳踩進的水池，與兩壺倒出的水' },
    { card: 'moon', where: '螯蝦正爬出的前景水池' },
    { card: 'judgement', where: '石棺漂浮其上的水面' },
    { card: 'ace_of_wands', where: '綠地上蜿蜒流過的河' },
    { card: 'two_of_wands', where: '城牆外的海面與海灣' },
    { card: 'three_of_wands', where: '崖下一片金黃色的海灣' },
    { card: 'eight_of_wands', where: '原野上流過的一條小河' },
    { card: 'ace_of_cups', where: '杯口溢出的五道水流與下方的睡蓮池' },
    { card: 'five_of_cups', where: '他前方流過、架著石橋的河' },
    { card: 'eight_of_cups', where: '山腳下一旁的一片水' },
    { card: 'ten_of_cups', where: '遠處房子附近流過的河' },
    { card: 'page_of_cups', where: '侍者身後起伏的海浪' },
    { card: 'knight_of_cups', where: '馬前方橫過的一條小河' },
    { card: 'queen_of_cups', where: '王座一旁拍上沙地的海水' },
    { card: 'king_of_cups', where: '王座四周翻湧的海浪' },
    { card: 'two_of_swords', where: '她身後散布著礁石的海面' },
    { card: 'five_of_swords', where: '兩人走向的水邊與遠處水面' },
    { card: 'six_of_swords', where: '小船渡過的河水，船後起伏、前方平靜' },
    { card: 'eight_of_swords', where: '她腳邊泥地上散布的水窪' },
    { card: 'ten_of_swords', where: '遠山前一片平靜無波的水面' },
    { card: 'two_of_pentacles', where: '他身後掀起高浪的海' },
    { card: 'queen_of_pentacles', where: '王座左後方蜿蜒流過的小河', lineart: false }
  ] },
  { id: 'boat', title: '船', cards: [
    { card: 'death', where: '遠方河面上的一艘小帆船', lineart: false },
    { card: 'three_of_wands', where: '海灣上航行的幾艘帆船' },
    { card: 'king_of_cups', where: '王座一側乘浪航行的帆船' },
    { card: 'six_of_swords', where: '船夫撐篙渡河、載著六把劍的小船' },
    { card: 'two_of_pentacles', where: '身後浪頭上一高一低的兩艘帆船' }
  ] },
  { id: 'castle', title: '城堡與城鎮', cards: [
    { card: 'chariot', where: '身後城牆內的塔樓與紅頂房舍' },
    { card: 'death', where: '遠方地平線上的兩座塔' },
    { card: 'tower', where: '孤岩上被閃電擊中的高塔' },
    { card: 'moon', where: '小路兩側各立的一座塔' },
    { card: 'ace_of_wands', where: '遠處小丘上的城堡' },
    { card: 'two_of_wands', where: '他所站的城牆，與海灣對岸的屋舍' },
    { card: 'four_of_wands', where: '慶祝人群後方的城堡' },
    { card: 'eight_of_wands', where: '遠方小丘頂上的一座小建築', lineart: false },
    { card: 'ten_of_wands', where: '他正走向的遠方小村莊' },
    { card: 'two_of_cups', where: '兩人身後山丘上的紅屋頂房子' },
    { card: 'five_of_cups', where: '河對岸帶著塔樓的建築' },
    { card: 'six_of_cups', where: '圍住庭院的老房子與石牆' },
    { card: 'seven_of_cups', where: '下排一只杯中的城堡塔樓' },
    { card: 'ten_of_cups', where: '遠處河邊樹叢間的房子' },
    { card: 'eight_of_swords', where: '她身後山丘頂上的一座城堡' },
    { card: 'four_of_pentacles', where: '他身後有塔樓與紅屋頂的城鎮' },
    { card: 'six_of_pentacles', where: '右側邊緣遠處的城堡塔樓', lineart: false },
    { card: 'eight_of_pentacles', where: '工匠身後遠方紅屋頂的城鎮' },
    { card: 'nine_of_pentacles', where: '葡萄園後方紅色屋頂的房子' },
    { card: 'ten_of_pentacles', where: '一家人所站拱門所屬的城堡與塔樓' },
    { card: 'king_of_pentacles', where: '王座右後方有塔樓的城堡' }
  ] },
  { id: 'pillars', title: '柱子', cards: [
    { card: 'high_priestess', where: '身旁刻著 B 與 J 的黑白雙柱' },
    { card: 'hierophant', where: '身後兩側的灰色石柱' },
    { card: 'chariot', where: '撐起星辰車篷的柱子' },
    { card: 'justice', where: '她身旁兩根灰色石柱' },
    { card: 'three_of_pentacles', where: '兩道尖拱交會處中央的石柱', lineart: false }
  ] },
  { id: 'veil', title: '帷幕', cards: [
    { card: 'high_priestess', where: '身後繡滿石榴的帷幕' },
    { card: 'justice', where: '兩柱之間垂掛的帷幕' },
    { card: 'seven_of_cups', where: '上排中間杯上蒙著布的發光形體' },
    { card: 'nine_of_cups', where: '弧形長檯上垂下的藍色布幔' }
  ] },
  { id: 'throne', title: '王座', cards: [
    { card: 'high_priestess', where: '她端坐的石座，大半被袍子遮住' },
    { card: 'empress', where: '鋪著紅色軟墊的寶座' },
    { card: 'emperor', where: '雕著公羊頭的方正石造王座' },
    { card: 'hierophant', where: '他端坐的高背寶座' },
    { card: 'justice', where: '她端坐在兩柱之間的石座' },
    { card: 'devil', where: '形體蹲踞其上的方形石座' },
    { card: 'queen_of_wands', where: '她端坐、刻有獅子與向日葵的王座' },
    { card: 'king_of_wands', where: '他坐著、刻有獅子與蠑螈的王座' },
    { card: 'queen_of_cups', where: '海邊刻有貝殼與小天使的石造王座' },
    { card: 'king_of_cups', where: '浮在海浪之中的石造王座' },
    { card: 'queen_of_swords', where: '她端坐的石造王座，雕有蝴蝶與小天使' },
    { card: 'king_of_swords', where: '他正面端坐的高背石造王座' },
    { card: 'four_of_pentacles', where: '他抱著錢幣端坐的方形石座' },
    { card: 'queen_of_pentacles', where: '雕著小天使、果實與山羊頭的石座' },
    { card: 'king_of_pentacles', where: '雕著數個公牛頭的王座' }
  ] },
  { id: 'crown', title: '王冠', cards: [
    { card: 'high_priestess', where: '新月托著圓球的冠冕' },
    { card: 'empress', where: '十二顆星串成的星冠' },
    { card: 'emperor', where: '頭上鑲著寶石的金色王冠' },
    { card: 'hierophant', where: '頭上戴著層層疊起的三重冠' },
    { card: 'chariot', where: '駕車者頭上嵌星的冠' },
    { card: 'justice', where: '頭上戴著的方正金冠，正中鑲一顆方石' },
    { card: 'death', where: '倒地國王滾落一旁的王冠' },
    { card: 'tower', where: '被閃電打飛的塔頂王冠與墜落者頭上的冠' },
    { card: 'queen_of_wands', where: '女王頭上戴著的金冠' },
    { card: 'king_of_wands', where: '國王頭上火焰狀的金冠' },
    { card: 'queen_of_cups', where: '女王頭上華麗的金冠' },
    { card: 'king_of_cups', where: '國王頭上戴著的王冠' },
    { card: 'ace_of_swords', where: '劍尖往上穿過的一頂金色王冠' },
    { card: 'queen_of_swords', where: '她頭上的王冠，原版由蝴蝶組成' },
    { card: 'king_of_swords', where: '他頭上戴著的金色王冠' },
    { card: 'four_of_pentacles', where: '頭上的王冠，冠頂還頂著一枚錢幣' },
    { card: 'queen_of_pentacles', where: '她頭上戴著的金色王冠' },
    { card: 'king_of_pentacles', where: '他頭上戴著的王冠，原版綴有紅花' }
  ] },
  { id: 'laurel', title: '桂冠與花環', cards: [
    { card: 'fool', where: '頭上的一圈綠葉，插著紅羽毛' },
    { card: 'empress', where: '星冠底下繞著的一圈綠葉花環', lineart: false },
    { card: 'chariot', where: '冠下的一圈綠葉桂冠' },
    { card: 'strength', where: '髮上的花冠與纏在身上的花鏈' },
    { card: 'death', where: '少女與孩童頭上的花環', lineart: false },
    { card: 'sun', where: '孩子頭上戴的花環' },
    { card: 'world', where: '圍住舞者的杏仁形綠色桂冠' },
    { card: 'four_of_wands', where: '杖頂之間垂掛、繫著紅緞帶的花環' },
    { card: 'six_of_wands', where: '騎者頭上與杖頂各一頂桂冠' },
    { card: 'two_of_cups', where: '人物頭上戴著的月桂冠或花冠' },
    { card: 'three_of_cups', where: '其中一名女子頭上花葉編成的冠' },
    { card: 'seven_of_cups', where: '下排一只杯中的一圈綠色桂冠' },
    { card: 'nine_of_pentacles', where: '她髮上戴著的一圈紅色小花環', rws: false }
  ] },
  { id: 'staff', title: '手杖', cards: [
    { card: 'fool', where: '扛在肩上、挑著行囊的細杖' },
    { card: 'magician', where: '右手高舉指天的白色短杖' },
    { card: 'chariot', where: '駕車者右手握著的短杖' },
    { card: 'hermit', where: '左手握著、抵住雪地的長杖' },
    { card: 'world', where: '舞者兩手各握的一根短杖' },
    { card: 'eight_of_cups', where: '他拄著走向山中的長手杖' },
    { card: 'five_of_pentacles', where: '前面那人拄著的木拐杖' },
    { card: 'ten_of_pentacles', where: '拱門下男子身旁一根直立的長杖', lineart: false }
  ] },
  { id: 'keys', title: '鑰匙', cards: [
    { card: 'hierophant', where: '腳前交叉平放的兩把鑰匙' }
  ] },
  { id: 'scales', title: '天秤', cards: [
    { card: 'justice', where: '左手提著的一副天平' },
    { card: 'six_of_pentacles', where: '商人一手提著、兩邊持平的天平' }
  ] },
  { id: 'blindfold', title: '眼罩', cards: [
    { card: 'two_of_swords', where: '坐在石凳上的女子雙眼蒙著白布' },
    { card: 'eight_of_swords', where: '被綁的女子雙眼蒙著布條' }
  ] },
  { id: 'chains', title: '鎖鏈與綁縛', cards: [
    { card: 'hanged_man', where: '把一隻腳綁在木架上的繩子' },
    { card: 'devil', where: '從石座鐵環套到兩人頸上的鎖鏈' },
    { card: 'eight_of_swords', where: '層層纏住她手臂與上身的布條' }
  ] },
  { id: 'lantern', title: '燈籠與火炬', cards: [
    { card: 'hermit', where: '高舉的提燈，燈中亮著一顆星' },
    { card: 'devil', where: '左手倒持、火頭朝下的火炬' }
  ] },
  { id: 'trumpet', title: '號角', cards: [
    { card: 'judgement', where: '天使吹響、懸著十字旗的長號' }
  ] },
  { id: 'coffin', title: '棺木', cards: [
    { card: 'judgement', where: '人們從中站起的敞開石棺' },
    { card: 'four_of_swords', where: '他平躺其上的石棺，像墓上臥像' }
  ] },
  { id: 'skull', title: '骷髏', cards: [
    { card: 'death', where: '騎在白馬上、身穿黑甲的骷髏' },
    { card: 'seven_of_cups', where: '盛著桂冠那只杯，杯身上的骷髏頭', lineart: false }
  ] },
  { id: 'whiteRose', title: '白玫瑰', cards: [
    { card: 'fool', where: '高舉的手中輕拈的一朵白玫瑰' },
    { card: 'death', where: '黑旗正中的白色五瓣玫瑰' }
  ] },
  { id: 'redRose', title: '紅玫瑰', cards: [
    { card: 'magician', where: '四周攀爬與腳下花圃裡的紅玫瑰' },
    { card: 'hierophant', where: '一名跪地僧侶袍上綴著的紅玫瑰' },
    { card: 'strength', where: '花冠與身上花鏈裡的紅玫瑰' },
    { card: 'two_of_wands', where: '牆面紋樣中與百合交叉的紅玫瑰' },
    { card: 'four_of_wands', where: '杖頂花環上點綴的紅玫瑰' },
    { card: 'nine_of_swords', where: '方格被子上一格格的紅玫瑰圖案' },
    { card: 'queen_of_pentacles', where: '頭頂圍成拱形、開滿紅玫瑰的花藤' }
  ] },
  { id: 'lily', title: '百合', cards: [
    { card: 'magician', where: '腳下花圃裡的白百合' },
    { card: 'hierophant', where: '另一名跪地僧侶袍上綴著的百合' },
    { card: 'two_of_wands', where: '牆面紋樣中與玫瑰交叉的白百合' },
    { card: 'ace_of_pentacles', where: '花園小路兩旁盛開的白色百合' }
  ] },
  { id: 'sunflower', title: '向日葵', cards: [
    { card: 'sun', where: '石牆後探出的四朵向日葵' },
    { card: 'queen_of_wands', where: '女王手中拿著與王座上刻著的向日葵' }
  ] },
  { id: 'pomegranate', title: '石榴', cards: [
    { card: 'high_priestess', where: '身後帷幕上繡滿的石榴' },
    { card: 'empress', where: '白色長袍上印滿的石榴紋樣' }
  ] },
  { id: 'grapes', title: '葡萄', cards: [
    { card: 'devil', where: '女人尾巴末端的一串葡萄' },
    { card: 'three_of_cups', where: '三人腳邊散落的成串葡萄' },
    { card: 'nine_of_pentacles', where: '她兩側藤間垂掛的成串葡萄' },
    { card: 'ten_of_pentacles', where: '老人長袍與左下角的成串葡萄', lineart: false },
    { card: 'king_of_pentacles', where: '長袍上的葡萄紋與腳下成片的葡萄' }
  ] },
  { id: 'wheat', title: '麥穗', cards: [
    { card: 'empress', where: '前景一片成熟的麥田' }
  ] },
  { id: 'tree', title: '樹', cards: [
    { card: 'empress', where: '身後高聳的柏樹林' },
    { card: 'lovers', where: '兩人身後各一棵：火焰樹與纏蛇的果樹' },
    { card: 'chariot', where: '身後城牆旁的幾棵綠樹' },
    { card: 'strength', where: '遠山腳下的一叢綠樹', lineart: false },
    { card: 'hanged_man', where: '長著綠葉、當作木架的 T 形活樹' },
    { card: 'death', where: '遠方河岸上的幾棵小樹', lineart: false },
    { card: 'star', where: '遠處停著長喙鳥的一棵樹' },
    { card: 'judgement', where: '遠方兩側岸上的小樹', lineart: false },
    { card: 'ace_of_wands', where: '綠地上零星的幾棵樹' },
    { card: 'two_of_wands', where: '海灣對岸綠地上的樹林', lineart: false },
    { card: 'eight_of_wands', where: '遠方丘陵上的小樹叢', lineart: false },
    { card: 'ten_of_wands', where: '村莊與田野周圍的幾棵樹' },
    { card: 'two_of_cups', where: '兩人身後房子旁的幾棵樹' },
    { card: 'four_of_cups', where: '他倚坐其下的大樹' },
    { card: 'five_of_cups', where: '河對岸建築旁的樹叢', lineart: false },
    { card: 'six_of_cups', where: '石牆後方的一棵樹', rws: false },
    { card: 'ten_of_cups', where: '遠處房子與河岸周圍的樹' },
    { card: 'knight_of_cups', where: '遠方河岸與岩崖上的小樹', lineart: false },
    { card: 'six_of_swords', where: '對岸岸邊的一片樹林' },
    { card: 'page_of_swords', where: '左下角被風吹彎的幾棵樹', lineart: false },
    { card: 'knight_of_swords', where: '地平線上被強風吹彎的樹' },
    { card: 'queen_of_swords', where: '王座左下方的幾棵深色樹', lineart: false },
    { card: 'king_of_swords', where: '王座兩側背景裡的樹' },
    { card: 'four_of_pentacles', where: '身後城鎮房舍間的幾棵小樹', lineart: false },
    { card: 'six_of_pentacles', where: '中景一排低矮的綠樹叢', lineart: false },
    { card: 'seven_of_pentacles', where: '左側遠方山丘上的一棵小樹', rws: false },
    { card: 'nine_of_pentacles', where: '葡萄園後方左右各一棵樹', lineart: false },
    { card: 'ten_of_pentacles', where: '城牆後方右側的一片樹叢', lineart: false },
    { card: 'page_of_pentacles', where: '身後遠處一叢叢的樹木' },
    { card: 'knight_of_pentacles', where: '田地遠處的幾棵小樹' },
    { card: 'queen_of_pentacles', where: '王座左後方與兩側的樹木', lineart: false }
  ] },
  { id: 'flowers', title: '花園與花叢', cards: [
    { card: 'strength', where: '草地上點綴的紅白小花', rws: false },
    { card: 'temperance', where: '岸邊盛開的黃色鳶尾' },
    { card: 'star', where: '她身旁草地上的一叢叢小花', lineart: false },
    { card: 'four_of_wands', where: '兩名女子高舉過頭的花束' },
    { card: 'ace_of_cups', where: '水池中開著的睡蓮' },
    { card: 'two_of_cups', where: '兩人腳邊草地上的小白花與黃花', rws: false },
    { card: 'six_of_cups', where: '每只杯中種著的白色星形花' },
    { card: 'page_of_cups', where: '侍者衣服上滿布的花朵圖案' },
    { card: 'ace_of_pentacles', where: '花園拱門與花叢上開著的小花' },
    { card: 'page_of_pentacles', where: '腳下草地上點點開著的小花' },
    { card: 'queen_of_pentacles', where: '她四周草地上盛開的紅花' },
    { card: 'king_of_pentacles', where: '王座腳下葡萄間開著的小花' }
  ] },
  { id: 'lemniscate', title: '無限符號', cards: [
    { card: 'magician', where: '頭頂橫躺的無限符號' },
    { card: 'strength', where: '女子頭頂懸著的無限符號' },
    { card: 'world', where: '桂冠上下兩個繫成橫八字的紅結' },
    { card: 'two_of_pentacles', where: '繞著兩枚錢幣、打成橫躺八字的綠帶' }
  ] },
  { id: 'cross', title: '十字', cards: [
    { card: 'high_priestess', where: '藍袍胸前的一個白色十字' },
    { card: 'emperor', where: '權杖頂端的生命符（帶環十字）' },
    { card: 'hierophant', where: '三重十字權杖與前襟上的小十字' },
    { card: 'chariot', where: '胸甲方框與車前盾上的十字', rws: false },
    { card: 'hanged_man', where: '倒吊他的 T 字形木架（tau 十字）' },
    { card: 'death', where: '主教身上的小十字記號' },
    { card: 'judgement', where: '長號上旗幟的紅十字' },
    { card: 'ace_of_cups', where: '白鴿銜著的聖餅上的十字' },
    { card: 'six_of_cups', where: '石座盾牌上刻的斜十字', lineart: false },
    { card: 'queen_of_cups', where: '加蓋聖杯頂端的小十字', lineart: false },
    { card: 'three_of_pentacles', where: '三枚錢幣之間的圓形十字花飾', lineart: false },
    { card: 'king_of_pentacles', where: '權杖頂端寶球上的小十字', rws: false }
  ] },
  { id: 'globe', title: '寶球', cards: [
    { card: 'empress', where: '她手中權杖頂端的圓球' },
    { card: 'emperor', where: '左手托著的一顆金色寶球' },
    { card: 'two_of_wands', where: '他掌心托著的一顆小地球儀' },
    { card: 'king_of_pentacles', where: '他手中權杖頂端的金色寶球' }
  ] },
  { id: 'shield', title: '盾牌', cards: [
    { card: 'empress', where: '身旁地上刻著金星符號的心形盾' },
    { card: 'chariot', where: '車身正面的一面盾徽' },
    { card: 'six_of_cups', where: '石座正面刻著斜十字的盾牌', lineart: false },
    { card: 'ten_of_pentacles', where: '拱門左上方刻著城塔的家族盾徽', lineart: false }
  ] },
  { id: 'wheel', title: '輪', cards: [
    { card: 'chariot', where: '戰車底下露出的兩個車輪', rws: false },
    { card: 'wheel_of_fortune', where: '懸在畫面中央、刻著字母的大輪' }
  ] },
  { id: 'hand', title: '雲中之手', cards: [
    { card: 'ace_of_wands', where: '從雲中伸出、緊握木杖的手' },
    { card: 'ace_of_cups', where: '從雲中伸出、托著聖杯的手' },
    { card: 'four_of_cups', where: '從雲中伸出、遞來第四只杯的手' },
    { card: 'ace_of_swords', where: '從左側雲中伸出、緊握劍柄的手' },
    { card: 'ace_of_pentacles', where: '從左側雲中伸出、掌心托著錢幣的手' }
  ] }
];
