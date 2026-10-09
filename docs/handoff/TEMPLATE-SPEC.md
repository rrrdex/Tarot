# Template system spec — 塔羅 PWA (C:/Users/alice/Documents/GitHub/Tarot)

The owner approved building ALL THREE new templates (from the design canvas https://claude.ai/artifact/TQHLhpSaehQSffH8R58i1v — mockup sources in `scratchpad/design-canvas/project/*.dc.html`, read them for exact colours/radii/structure) as user-selectable layouts alongside the existing minimal one. Each new template has a light and a dark mode. Quality bar: production, accessible (WCAG 2.1 AA, the site passes axe today), every screen and modal correct in every template × mode × phone/tablet/desktop, offline-capable, no external requests, all existing features intact, Playwright suite green.

## Templates
| id | name (UI) | look |
|---|---|---|
| `minimal` | 簡約 | today's site, unchanged (default) |
| `aurora` | 星夜玻璃 | A: night blue / pale lavender, frosted-glass panels, soft gold, serif headings, floating pill nav |
| `editorial` | 現代編輯 | B: cool grey-white / charcoal, ink rules, one vermilion accent, big serif display, bento tiles, ruled bottom nav |
| `immersive` | 沉浸手勢 | C: sage / deep green-black, mint & coral, deck-as-hero home, story-style reading, floating icon dock |

Palettes (light / dark) — from the mockups' `renderVals()`; map them onto the site's existing CSS tokens (`--bg`, `--surface`, `--text`, `--text-secondary`, `--accent`, `--accent-contrast`, `--divider`, …, see style.css :root) plus template-specific extra tokens as needed. Keep text contrast ≥ 4.5:1 (3:1 for ≥24px) — verify, darken where needed.

Fonts: NO external fonts (CSP blocks them and the site promises no external loading). Use stacks: serif `"Noto Serif TC","Source Han Serif TC","Songti TC","PMingLiU",serif`; sans `system-ui,"PingFang TC","Noto Sans TC","Microsoft JhengHei",sans-serif`.

## Selection & persistence
- New setting 「版型」 in 設定 (radio group, above 主題), storage key `template` (values above; absent = minimal). Include in settings export/import prefs (`EXPORT_PREFS` in settings.js and the import validator).
- Applied as `data-template` on `<html>` by the EARLY inline script in index.html (same place theme/tab are applied) so there is no flash. build.mjs computes CSP hashes of inline scripts automatically.
- Theme pref stays global (自動/淺色/深色/霓虹). In new templates, 霓虹 behaves as dark; the 霓虹 radio stays visible but its description notes it only differs in 簡約 (or hide it when a new template is active — your call, explain).
- `meta[name=theme-color]` follows the active template's `--bg` (settings.js `updateThemeColor` already reads `--bg`).

## Shared new-layout behaviour (all three new templates; minimal unchanged)
1. **Navigation**: hide the top `.tabs` row; show a nav with 5 items 占卜(reading)、記錄(history)、學習(learn)、資料庫(database)、我的(me). Bottom (thumb zone, safe-area aware) below 1024px; vertical side rail at ≥1024px. 我的 is active when the tab is statistics or settings. Keyboard shortcuts 1–6 keep working. Proper semantics (nav landmark, aria-current), ≥44px targets. Keep a single source of truth for tab switching (`switchTab` in main.js).
2. **我的 hub**: when on statistics/settings in a new template, show a segmented control 統計｜設定 at the top of those panels; the 個人牌 (profile) block lives at the top of 我的 in new templates (move the DOM node on template switch, move it back for minimal; profile rendering code must keep working).
3. **Modals as sheets**: in new templates all `.modal-overlay` dialogs (card detail, spread picker, note, tag, confirm, about, privacy; NOT the full-screen card viewer) render as bottom sheets below 768px (rounded top, drag handle, max-height ~92dvh, internal scroll) and as a right-side panel at ≥1024px (768–1023: centered or sheet — your call). Swipe-down on the handle/header dismisses (pointer events; threshold + velocity; respects reduced motion; never steals scroll inside content). Existing focus management, Esc, aria-modal must keep working.
4. **逐張解讀 pager**: in new templates the per-position list in reading results (`reading.js` rd-items) becomes a one-at-a-time pager: prev/next buttons, swipe left/right, position indicator — aurora: dots + "2 / 3"; editorial: a position tab strip (role=tablist); immersive: story progress bars on top + large single card. Keyboard: arrows on the pager. Screen readers: announce position changes (live region or tab semantics). Print and copy still output all items. Minimal keeps the list.
5. **Immersive home**: the reading tab's form area shows a deck "hero" (stacked card backs) with "向上滑動抽牌" — an upward swipe on the deck triggers the same action as the read button; the button remains (gestures are never the only way). Spread choice shows small layout tiles for 3 common spreads + "更多" opening the existing spread picker.
6. **Motion**: View Transitions API for tab switches where supported (progressive; disabled under prefers-reduced-motion). Optional haptics: `navigator.vibrate(10)` on draw/flip where supported, controlled by a new setting 「觸覺回饋」 (default on; hidden if unsupported).
7. Everything else (history, statistics, database + library, learn, settings, daily card, profile, insights, share image, print) must be fully styled in each template — not just the screens in the mockups. Print output stays plain (template styles must not leak into print).

## Code organisation
- CSS: keep style.css as the base. Add `styles/templates/shared.css` (nav, hub, sheet, pager, hero — layout/behaviour for all new templates, keyed on `:root[data-template]:not([data-template="minimal"])`) and one file per template: `styles/templates/aurora.css`, `editorial.css`, `immersive.css` (tokens for light + dark + skin rules, each keyed on `:root[data-template="<id>"]`). Load order must be base → shared → template. Make that work in BOTH dev (`scripts/dev.mjs` serves files as-is; index.html links the CSS) and production (`build.mjs` builds CSS with esbuild — add `bundle: true` and an entry that @imports the files in order, update the `href` rewrite). Dark mode selectors must cover: explicit `.dark`/`.neon` class, and auto (prefers-color-scheme: dark without `.light`) — mirror how style.css does it.
- JS: new module(s) for template switching, nav, sheet gestures, pager, hero (e.g. `src/template.js`, `src/sheet.js`, `src/pager.js`); wire into main.js/settings.js/reading.js minimally. Vanilla, no dependencies. Match code style (Chinese comments, compact).
- Strings: all new UI text in `src/strings.js` (zh-TW, 你, full-width punctuation, concise).
- Tests: extend Playwright — template switching persists and applies before paint; nav works and shows 我的 state; sheet open/close incl. Esc and focus return; pager prev/next/keyboard; immersive swipe-up draws (simulate pointer); axe a11y across templates × light/dark (extend tests/a11y.spec.js); no horizontal overflow at 320/375/768/1280.
