# Database / card-detail UI for the new data — spec

The data is already merged into the repo. Do not change the data files except through `scratchpad/text/merge.mjs`.

- **`src/contexts.js`** (lazy, `loadContexts`): `cardContexts[k]` now has
  - `study` and `growth`, two new situations;
  - `journal`, an array of 3 questions;
  - `positions` = `{ advice, obstacle, outcome }`, each `{ upright, reversed }`.

  `contextText(card, 'study'|'growth')` already works.
- **`src/card-refs.js`** (NEW, needs a lazy loader in `src/lazy.js`: `loadRefs` / `loadedRefs`, added to `prefetchWhenIdle`):
  - `refsNotes` = `{ names, thothCourts, timing }`: Chinese explanatory notes.
  - `cardRefs[k]` = `{ names: { marseille, thoth, thothNumber?, thothAlt?, italian?[], aliases?[], note? }, timing: null | { from:'MM-DD', to:'MM-DD', basis:'decan'|'sign', sign, planet? }, related: [{ card, kind:'similar'|'contrast'|'sequence'|'pair', note }] }`.
  - `symbolIndex` = `[{ id, title, cards: [{ card, where, lineart?:false, rws?:false }] }]`, 55 symbols and 370 entries.

## 1. Card detail modal (`render.js`, `index.html`)

**情境 tab**
- Add rows 📚 學業 (`study`) and 🌱 成長 (`growth`) after the existing four, in the same row style.
- Below them add a new block 「放在不同牌位」 with three items, 建議 / 阻礙 / 結果. Each shows the text for the current orientation:
  - When opened from a draw (`drawn` with an orientation), show that orientation's text and label it 正位 or 逆位.
  - Otherwise show upright, with a small 正位/逆位 toggle (two-button segmented control, `aria-pressed`) that switches all three.
- Under the existing reflection question add 「書寫提問」, an ordered list of the 3 `journal` questions.

**源流 tab**
- **「相關的牌」**: a list of related cards. Each entry has a kind chip (相似 / 對照 / 延續 / 呼應), the card name as a button that opens that card's modal (`openCardModal(card, 'upright')`, replacing the current one; Back is not needed), and the note.
- **「其他牌系的名稱」**: a small `<dl>`.
  - Rows: 馬賽牌 (marseille), 托特牌 (thoth with thothNumber when present; thothAlt shown as 「另一種對法：…」 on kings and knights), 義大利古名 (italian joined with ／), 中文常見別名 (aliases joined with 、).
  - Then the card note if present, linked to `#lib-strength-justice` when it mentions 力量與正義為什麼對調.
  - Finally a 「說明」 disclosure holding `refsNotes.names`, plus `refsNotes.thothCourts` for court cards.
  - Latin titles get `lang="fr"`, `lang="en"` or `lang="it"`.
- **Date range**: inside the existing systems block (黃金黎明 correspondences), add a row 「對應日期」 such as 「約 3 月 21 日–3 月 30 日（火星在牡羊座的旬）」 or 「約 7 月 23 日–8 月 22 日（獅子座）」.
  - A "to" of '02-29' displays as 「2 月底」.
  - Add a footnote with `refsNotes.timing`.
  - Hide the row when `timing` is null.
- **「畫面上的符號」**: chips for every symbol in `symbolIndex` whose cards include this card, with the `where` text as the chip's title or tooltip and in a visible list.
  - Each chip links to the database symbol view (`#sym-<id>`).
  - Respect deck flags: if the current visual style is line-art and the entry has `lineart:false`, append 「（僅原版牌圖）」; if RWS and `rws:false`, append 「（僅線稿牌組）」.

## 2. Reading results (`reading.js`)
Add a new module `src/position-roles.js` that exports `positionRole(posKey)`, returning 'advice' | 'obstacle' | 'outcome' | null from this hand-curated map:
- **advice:** single.0, path.2, goal.3, prosCons.4, conflict.4, career.5, wealth.4, horseshoe.5, fullmoon.4
- **obstacle:** path.1, goal.1, relationship.3, celtic.1, yesno.1, loveCross.3, career.4, horseshoe.4
- **outcome:** three.2, path.3, twoChoice.3, twoChoice.4, goal.4, celtic.5, celtic.9, yesno.2, loveCross.5, horseshoe.6

(the keys are `spread.<id>.pos.<n>`)

In 逐張解讀, for each item whose position has a role, add a short paragraph labelled 「在這個位置」 with `cardContexts[k].positions[role][orientation]`. It needs `loadContexts`, already used elsewhere, and must degrade gracefully when the chunk is offline. It must be included in copy and print output, and in the share text only if share already includes per-card text.

## 3. Database tab (`database.js`, `index.html`)
- **Segments:** the existing 牌卡 / 知識庫, plus a new 「符號」.
  - **符號 view:** a grid of symbol buttons (title plus card count). Selecting one shows its cards as thumbnails (reuse `cardThumb`) with the `where` text, applying the same deck-flag notes as above. Each card opens its modal.
  - **Hash:** `#sym-<id>` opens the segment with that symbol selected (mirror the existing `#lib-<id>` handling).
- **Search (牌卡 segment):**
  - Extend the full-text index to `study`, `growth`, `positions`, `journal`, related notes, names (all aliases, marseille, thoth and italian, matched case-insensitively and accent-insensitively for Latin, e.g. "etoile" matches L'Étoile) and symbol titles plus `where` texts.
  - Show which field matched in the snippet label, as today.
  - Searching an alias, e.g. 女教皇, 吊人, 星幣 or 五角星, must find the card. Make the alias match rank highly.
- **Filters:** add a 「對應」 filter. Use `<select>` or chips in the existing filter UI style, with grouped options:
  - 元素 (fire, water, air, earth);
  - 行星 (the seven classical planets);
  - 星座 (12 signs).

  A card matches when its Golden Dawn correspondences in `systems.js` include that attribute:
  - majors through `gdMajors`;
  - pips through `gdDecans` sign and planet, plus the suit element;
  - aces and courts through the suit element only.
- **Compare:** add a 「比較」 action in the card modal footer, or in the 牌卡 list. It opens a side-by-side view of two cards (pick the second with a searchable select) showing:
  - keywords (upright and reversed);
  - yes/no tendency;
  - element / Golden Dawn attribution;
  - names in other decks;
  - date range;
  - shared symbols;
  - whether the two cards are listed as related, with the note.

  Mobile layout: two columns down to 360px, with text that wraps. It must be keyboard- and screen-reader-accessible.
- **Deep link:** `#card=<nameKey>` opens that card's modal on load.

## 4. Strings, a11y, tests
- All UI text goes in `src/strings.js` (zh-TW, 你, full-width punctuation, concise).
- Everything must work in all four templates and in light and dark.
- Use semantic markup (`dl`, `ol`, buttons), `lang` attributes on Latin titles, and visible focus.
- **Playwright tests:**
  - the 情境 tab shows 學業/成長 and the three positions, and the toggle works;
  - the 源流 tab shows related cards, and clicking one switches the modal;
  - other names and the date range appear (Two of Wands shows 3 月 21 日);
  - the symbol view opens via `#sym-lion` and lists Strength;
  - an alias search for 女教皇 finds the High Priestess;
  - the 對應 filter set to 牡羊座 includes the Emperor and Two of Wands;
  - compare opens and shows both names;
  - a reading with a 凱爾特十字 shows 「在這個位置」 for 阻礙 and 結果;
  - `#card=tower` opens the modal;
  - axe passes.
