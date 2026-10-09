# Phase 2: template skins (one agent per template)

Repo: `C:/Users/alice/Documents/GitHub/Tarot`. First read `scratchpad/TEMPLATE-SPEC.md`. Phase 1 is DONE: infrastructure, shared layout, nav, sheets, pager, hero and palettes are in place. Your job is to make ONE template look finished and beautiful on EVERY screen. Each template is a distinct design, not a recolour. The owner said earlier that C looked like a copy of B, so keep the three visually distinct.

Each agent edits ONLY its own `styles/templates/<id>.css`, in the 「外觀（skin）」 section at the end, and may adjust tokens in that same file. Do NOT edit:
- `style.css`, `shared.css`, the other templates, any JS, `index.html` or tests;
- `database.js`, `render.js`, `reading.js` and `strings.js`. Another agent is editing those files at the same time to add database features.

If you find a bug in shared.css or JS, report it instead of fixing it.

## Design sources
- Mockups: `scratchpad/design-canvas/project/*.dc.html`.
  - aurora = A-Home / A-Reading (`Main.dc.html` is A-Home)
  - editorial = B-Home / B-Reading
  - immersive = C-Home / C-Reading
- Read the inline styles and the `renderVals` palettes for exact radii, spacing, type scale and treatments. The mockups show only two screens. Extrapolate the same design language to everything else.

## Hooks Phase 1 provides
- **Page state:**
  - `html[data-template="<id>"]` and `html[data-tab=reading|history|learn|database|statistics|settings]`.
  - `.light` / `.dark`. Neon becomes `.dark` in new templates.
  - Auto dark is `@media (prefers-color-scheme: dark)` with `:root[data-template=X]:not(.light)`.
- **Nav:** `.tpl-nav#tplNav` > `button.tpl-nav-item[data-nav=…]` > `svg.tpl-nav-icon` + `span.tpl-nav-label`.
  - The current item has `[aria-current="page"]`.
  - In an icon-only dock, hide labels VISUALLY only, never with `display:none`.
  - Set `--tpl-nav-gap` above 0 for a floating pill or dock, and add your own insets and radius.
  - `--tpl-nav-h` is 64px and `--tpl-rail-w` is 88px. At ≥1024px the nav becomes a left rail.
- **我的 hub:** `#meHub.me-hub` > `#meSeg.segmented.me-seg`, then `#profileCards`.
- **Sheets:**
  - Modals are bottom sheets below 768px, centred from 768 to 1023px, and a right panel at ≥1024px.
  - The handle is `.modal-header::before`. The tokens are `--sheet-radius`, `--sheet-bg` and `--sheet-handle`.
  - While dragging, `.is-dragging` and `--sheet-drag` are set.
- **Pager:** `.reading-detail.rd-paged[data-variant=dots|tabs|story]`.
  - Indicators sit in `.rd-pager-ind`:
    - `.rd-pager-count`;
    - dots: `.rd-dots > span.on`;
    - tabs: `.rd-tabs > .rd-tab[aria-selected]`, containing `.rd-tab-pos` and `.rd-tab-name`;
    - story: `.rd-story > span.on`.
  - Slides are `.rd-slide`, with `.rd-slide-off` for hidden ones and `.rd-slide-on` for the entering one.
  - The story card is `.rd-story-card` or `.rd-story-blank`.
  - Buttons are `.rd-pager-nav` > `.rd-pager-prev` and `.rd-pager-next`.
- **Hero:** `#deckHero.deck-hero` (with `.is-dragging` / `.is-drawn`) > `.deck-hero-stack` > `.deck-hero-card` + `.deck-hero-top`.
  - Hint: `.deck-hero-hint` and `.deck-hero-chevron`.
  - Spread tiles: `#spreadTiles` > `.spread-tile[aria-pressed]`, plus `#spreadTileMore`. This is immersive only.
- **Tokens:**
  - Site tokens: `--bg`, `--bg-secondary`, `--bg-tertiary`, `--surface`, `--surface-elevated`, `--text*`, `--divider`, `--control-border` and `--accent*`.
  - Semantic tokens: `--accent-text`, `--accent-soft`, `--text-body`, `--nav-*`, `--sheet-*`, `--scrim`, `--pager-*`, `--card-back*` and `--card-lift`.
  - Fonts: `--font-serif` and `--font-sans-tpl`.
  - Raw palette `--tpl-*` per template; see the top of your file.
    - aurora: `--tpl-gold` / `--tpl-on-gold` is the gold button, because light `--accent` is a dark text-gold for contrast.
    - immersive: `--tpl-coral` is text-safe and `--tpl-coral-deco` is decoration only.
- **Print:** keep skin rules inside `@media screen` so print stays plain.
- **Dark-specific rules:** prefer tokens. When you need one, write it for both `:is(.dark,.neon)` and the auto media query.

## Screens to cover, each in light + dark at 375, 768 and 1280px
1. **占卜 (reading)**
   - form: question, spread picker, read button; for immersive, the hero and tiles;
   - daily card;
   - drawing / interactive pick;
   - results: the overview, the per-card pager, insights, notes/tags, and the share, copy and print buttons.
2. **記錄 (history)**: list, filters, search, an expanded entry, and the empty state.
3. **學習 (learn)**: lessons, flashcards and quiz.
4. **資料庫 (database)**
   - 牌卡: grid, filters, search results with snippets;
   - 知識庫: groups and items with sections.
   - Note that a 符號 segment and a compare view are being added by another agent. They will use the same base classes (`.segmented`, cards, chips), so style the base classes well and new pieces inherit.
5. **我的**
   - 統計: charts, stat tiles, insights;
   - 設定: radio groups, toggles, export/import, about.
   - The 個人牌 profile block.
6. **Every modal as a sheet or panel:** card detail with its four tabs (牌義/圖像/情境/源流), spread picker, note, tag, confirm, about, privacy, changelog. The full-screen card viewer is NOT a sheet, but must still look right.
7. **Shared surfaces:** toasts, empty states, error and offline states, focus rings, and the scrollbar where applicable.

## Verify (screenshots are mandatory)
- The dev server is ALREADY running at `http://127.0.0.1:8000`. Do NOT start or stop servers. Do NOT run `node build.mjs` or `npx playwright test`, because other agents share the repo and the integrator runs the full suite at the end.
- Write your own scratch Playwright scripts under `scratchpad/skin-<id>/`, importing from `C:/Users/alice/Documents/GitHub/Tarot/node_modules/playwright/index.mjs`.
  - Set the template with `localStorage.setItem('template','<id>')` and the theme with `localStorage.setItem('theme','light'|'dark')`; check `settings.js` for the exact keys. Then reload.
  - Drive each screen, open each modal, and screenshot.
  - LOOK at every screenshot, then iterate until each screen looks deliberate and polished.
- Run axe through `@axe-core/playwright` from node_modules, if installed (check), on each screen in light and dark. Contrast must be at least 4.5:1 for text and 3:1 for UI.
- Check for no horizontal overflow at 320, 375, 768 and 1280px.
- Use `prefers-reduced-motion` for any motion you add.
- Check that minimal is untouched: every rule must be keyed on your template.

Report the screens covered, the design decisions made, the contrast and axe results, any bugs found outside your file, and the paths to final screenshots: one contact sheet per mode and width.
