# Redesign: immersive (沉浸手勢) as a cinematic fortune-teller's parlor

Repo: `C:/Users/alice/Documents/GitHub/Tarot`. `scratchpad` = `C:/Users/alice/AppData/Local/Temp/claude/C--Users-alice-Documents-GitHub-Tarot/9461462d-ad38-4cb2-a17e-e7927776e186/scratchpad`.

## Why
The owner looked at the immersive template's current colours (sage / mint / green-black / coral) and called them disgusting. Their words: 沉浸式至少應該要有很有現場感的感覺，就像是電影中的占卜屋 ("immersive should at least feel like you are there, like the fortune-teller's parlor in a film"). Throw the sage palette away entirely. Immersive must make you feel you have walked into a fortune-teller's parlor in a film:
- dim, warm candlelight pooling on a velvet-covered table;
- deep oxblood / burgundy / plum velvet;
- brass and antique gold fittings;
- smoky dark corners (vignette);
- the deck lying on the tablecloth as the hero.

Rich, theatrical and atmospheric, but still a clean, usable, accessible app.

## Keep
- the structure and behaviour: deck hero with swipe-up, story-style pager, floating icon dock, rounded tactile cards;
- all hooks;
- every fix from the recent full-resolution audit: focus rings keep each element's shape, one-line labels, insets, the history action layout, spread tiles on one line, the switch-description indent, and so on;
- the 6-item nav.

Only the visual language changes.

## Distinct from the other templates
- aurora = cool night-blue frosted glass with soft gold and serif;
- editorial = flat paper, ink rules, vermilion.

Immersive must not look like either one: warm, heavy materials (velvet, brass, candlelight) and no frosted glass. If you use serif display type for a theatrical playbill feel, make it clearly different from aurora, through weight, colour, ornament and composition.

## Three modes, all required
1. **Dark (the default feel), 「燭光占卜屋」:**
   - Near-black with a warm oxblood/plum undertone, e.g. around #120a0e to #1a0d13.
   - Surfaces are deep velvet burgundy or plum, layered with subtle gradients so they read as fabric, not flat fills.
   - Candle-amber accent (≈ #E8B060 range) for primary actions and highlights; brass gold for lines and rims.
   - Cream / parchment text.
   - Atmosphere:
     - a vignette;
     - a warm candle glow pooling behind the deck hero and the current card;
     - a hint of velvet drapes framing the top of the page, built from CSS gradients;
     - optionally a very subtle film grain via an inline SVG data URI. Keep it tiny and cheap, with no external files.
2. **Light, 「白日的占卜屋」:** the same room by daylight.
   - Warm parchment / aged-linen background.
   - Oxblood and brass accents, deep brown-ink text.
   - A soft warm vignette.
   - Still clearly the parlor, not a generic light theme.
3. **Neon, 「占卜屋的霓虹招牌」:** the parlor at night with its neon sign lit, like a PSYCHIC / TAROT window sign in a film.
   - Magenta-pink neon plus warm amber neon over dark velvet.
   - Glow on display headings, the current nav item, primary buttons and active states.
   - Body text stays crisp.
   - Contract: `<html>` gets `.dark` + `.tpl-neon`, never `.neon`. Selectors use `:root:root[data-template="immersive"].tpl-neon`. Put this in a final 「霓虹（neon）」 section.
   - Neon `--bg` must differ from dark `--bg`, because a test checks this.
   - Line-art cards glow in per-suit colours under `.tpl-neon`. Apply it to `.card-db-art svg`, `.flash-art svg`, `.quiz-art svg`, `.card-modal-art svg`, `.card-viewer-art svg`, `.daily-card-art svg`, `.profile-chip-art svg` and the line-art faces in results. The settings text promises 「線稿模式的牌依花色發光」. Minimal's `.neon` rules in style.css are a reference only.

## Details to design
- **Deck hero:** card backs in deep velvet with a brass frame and a small sun/moon or star emblem drawn in CSS or inline SVG. The deck rests on a tablecloth area, e.g. a fringed or embroidered border suggested with gradients, lit by candlelight.
- **Story pager:** the current card glows like it is under the candle. The peeking cards recede into shadow.
- **Floating dock:** dark velvet with a brass rim. The current item is a candle-amber pill.
- **Sheets and modals:** a velvet panel with a brass hairline edge.
- **Everything else:** daily card, spread tiles, chips/tags, segmented controls, inputs, the history wall, flashcards/quiz, the database (cards, filters, 符號, 知識庫), stats (tiles, `--chart-1..5` in parlor colours: amber, oxblood rose, brass, teal-ink, plum, distinguishable and ≥3:1), settings switches, toasts, footer.
- **Motion:** an optional, very subtle candle flicker on glow layers only, with slow opacity changes (≤8% amplitude, no flashing), disabled under `prefers-reduced-motion`. Text never animates.
- **`meta theme-color`:** it follows `--bg` and must look right in each mode.

## Rules
- Edit `styles/templates/immersive.css`, rewriting its tokens and skin as needed. In `src/strings.js` you may change ONLY `settings.template.immersive.desc` to a concise zh-TW description of the new look (你, full-width punctuation). Change no other file; report anything outside these.
- All rules stay keyed on `[data-template="immersive"]`, so minimal, aurora and editorial must be untouched. Keep everything inside `@media screen` so print stays plain.
- WCAG AA in every mode: text ≥4.5:1 (≥3:1 at 24px and up); UI, borders and focus ≥3:1. Measure every pair, including text over glows or gradients, at their worst point.
- The dev server is at http://127.0.0.1:8000; do not stop it. Use `localStorage.template='immersive'` and `theme` = light, dark or neon.
- Do NOT run `build.mjs` or `playwright test`; the integrator does that. Other agents are editing aurora.css and editorial.css at the same time; don't touch them.

## Verification (mandatory, full resolution)
- Capture component crops at deviceScaleFactor 2 with `locator.screenshot()`, for every screen and modal, in light, dark and neon, at 320, 375, 768 and 1280. Do line-art plus a text-style pass. Reuse `scratchpad/fullres/` scripts.
- View each crop at native size. Downscaled sheets are not evidence.
- Re-measure insets, overflow, one-line labels and focus shapes as in the audit.
- Run axe on every tab and modal in all three modes.
- Also produce a few full-page 1x screenshots per mode (home, results, card modal) so the overall mood can be judged, and look at them critically. Ask yourself whether this feels like a film's fortune-teller parlor or just a recoloured app, and iterate until it is the former.

## Report
- the palette per mode, with a contrast table;
- the atmosphere techniques used;
- screens covered;
- axe results;
- paths to the mood screenshots and key crops;
- issues found outside your file.
