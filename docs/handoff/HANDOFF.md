# Handoff: work in progress (2026-10-09)

Read this first. The specs in this folder define the work; the paths inside them that point at a local scratchpad don't exist in the cloud, so use the repo paths instead.

## Already done (this commit, version 4.22.0 in `src/changelog.js`)
- **Default template:**
  - 星夜玻璃 (`aurora`) is the default when no template is stored. See the early inline script in `index.html` and `DEFAULT_TEMPLATE` in `src/template.js`.
  - Choosing aurora removes the stored key. Every other template, minimal included, is stored.
  - The settings radios list 星夜玻璃 first and 簡約 last.
- **Neon infrastructure:**
  - Theme `neon` in a new template sets `<html class="dark tpl-neon">`. Only minimal gets `.neon`. See `applyThemeClass` in `src/settings.js` and the early inline script.
  - Each template's neon rules live in a 「霓虹（neon）」 section at the end of its CSS file, with selectors `:root:root[data-template="<id>"].tpl-neon`.
  - The neon `--bg` must differ from the dark `--bg`, because a test checks this.
- **Neon versions done and verified** (axe clean, light/dark unchanged): aurora (`styles/templates/aurora.css`) and editorial (`styles/templates/editorial.css`).
- **Tests:**
  - `tests/fixtures.js` has a `defaultTemplate` option, default `'minimal'`, so the older tests that describe minimal still run on minimal. To test the real default, use `test.use({ defaultTemplate: null })`.
  - `tests/templates.spec.js` covers the aurora default, plus neon for each new template.
  - `tests/a11y.spec.js` has neon combos.

## Not done yet: do these next
1. **Redesign immersive (沉浸手勢) as a cinematic fortune-teller's parlor.** Follow `docs/handoff/IMMERSIVE-PARLOR.md`. The owner called the old sage/green palette ugly. They want 「電影中的占卜屋」:
   - dark: candlelight, oxblood/plum velvet, brass;
   - light: the same parlor by day;
   - neon: a magenta + amber neon window sign.

   Also:
   - change `settings.template.immersive.desc` in `src/strings.js`;
   - add a changelog line for it, under version 4.22.0 or a new version;
   - update the immersive colour assertions in `tests/templates.spec.js`. The test 「跟隨系統…」 currently expects rgb(13,22,19), #0D1613, rgb(228,236,232) and #E4ECE8.

   A previous attempt was stopped half-way and reverted, so `immersive.css` is still the old sage version.
2. **Until (1) is done, the test `immersive：霓虹主題是這個版型自己的霓虹配色…` in `tests/templates.spec.js` fails**, because immersive has no `.tpl-neon` rules yet.
3. **The last full test run was before the default/neon changes.** After (1), run `npx eslint .`, `node build.mjs` (retry on ENOTEMPTY), then the full `npx playwright test`. It must be all green.
4. **Visual verification standard the owner insists on:**
   - Use component crops at deviceScaleFactor 2 with `locator.screenshot()`, viewed at native size. Never judge from downscaled contact sheets; that is how an earlier nav bug was missed.
   - Measure insets, overflow, one-line labels and focus-ring shapes.
   - Run axe in light, dark and neon at 320, 375, 768 and 1280.
5. **Commit and push only when the owner asks.**

## Project rules (also in earlier commit messages)
- Taiwan Traditional Chinese: write 你, never 您; use full-width punctuation.
- No external requests or fonts (CSP and privacy).
- Facts in card texts must be sourced.
- Don't delete `img/cards_original.rar`; just don't ship it.
- The card-text source JSON and its review pipeline (merge.mjs and audit.mjs) lived in a local scratchpad and are not in the repo. The generated `src/meaning-texts.js`, `src/contexts.js`, `src/lore.js` and `src/card-refs.js` are the shipped data; edit them directly if needed.
