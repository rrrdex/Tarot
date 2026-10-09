# Neon variant for one template

Repo: `C:/Users/alice/Documents/GitHub/Tarot`.

Today, picking the 「霓虹占卜館」 theme in a new template just falls back to that template's dark mode. The owner found that lazy and wants each template to have its OWN neon version: the best neon interpretation of that template's design language. Read `scratchpad/TEMPLATE-SPEC.md`, `scratchpad/TEMPLATE-SKIN.md` and your template's CSS file in full first, so you know its look.

(`scratchpad` = `C:/Users/alice/AppData/Local/Temp/claude/C--Users-alice-Documents-GitHub-Tarot/9461462d-ad38-4cb2-a17e-e7927776e186/scratchpad`.)

## Contract (already implemented, do not change)
- When theme = neon in a new template, `<html>` gets BOTH `.dark` and `.tpl-neon`. It never gets `.neon`, which belongs to minimal; minimal's `.neon` rules in style.css do not apply to you.
- Your template's dark tokens therefore apply first, and you layer the neon on top with selectors `:root:root[data-template="<id>"].tpl-neon …`. The doubled `:root` makes them win over the dark rules.
- Put everything in a new section 「霓虹（neon）」 at the END of your template CSS file, inside `@media screen`, so print stays plain.
- `meta[name=theme-color]` reads `--bg`. Your neon `--bg` MUST differ from your dark `--bg`, because a test checks this.
- Minimal's neon is a reference for the idea, not the look: `.neon` in style.css, including `[data-suit]` → `--neon-suit`, which makes line-art cards glow in suit colours. Implement your own suit glow under `.tpl-neon`, applied to the same line-art selectors (`.card-db-art svg`, `.flash-art svg`, `.quiz-art svg`, `.card-modal-art svg`, `.card-viewer-art svg`, `.daily-card-art svg`, `.profile-chip-art svg`, and the line-art card faces in results). Use per-suit colours that fit your palette. The settings description promises 「線稿模式的牌依花色發光」.

## What to design
- **Tokens:**
  - every site and semantic token your template defines for dark: bg, surfaces, text, accent*, nav*, sheet*, scrim, pager*, card-back*;
  - `--chart-1..5`;
  - status colours;
  - your `--tpl-*` raw palette.
- **Neon character:**
  - tasteful glows: text-shadow on display headings and the current nav item, glow on primary buttons, active segments, focus rings and the selected pager position;
  - neon edge lines where your template uses lines or borders;
  - a background with depth, for example a subtle radial glow or vignette.
- **Restraint:** body text must stay crisp and readable, so no glow on paragraphs. Use at most two or three neon hues. Nothing should flicker. Any added motion must respect `prefers-reduced-motion`.
- Keep the template's identity, so a user immediately sees it is the same template "at night with neon".
- Cover every screen and component your skin covers:
  - nav, hero/home, daily card, pick grid, results and pager;
  - card modal (all tabs, related cards, symbols, compare), sheets, toasts;
  - history, learn (flashcards, quiz), database (cards, filters, 符號, 知識庫), statistics (tiles, charts), settings, footer.

## Quality bar (mandatory)
- WCAG AA: text ≥4.5:1 (≥3:1 for 24px and up), UI and focus ≥3:1. Measure every text and background pair you introduce, including text placed over glows.
- Edit ONLY your template's CSS file. Report anything outside it instead of fixing it.
- The dev server is at http://127.0.0.1:8000; do not stop it. Use `localStorage.template=<id>` and `localStorage.theme='neon'`.
- Do NOT run `node build.mjs` or `npx playwright test`; the integrator does that.
- Verification has to be done at full resolution:
  - Capture component crops at deviceScaleFactor 2 with `locator.screenshot()`. Reuse or adapt the audit scripts in `scratchpad/fullres/`.
  - Cover 320, 375, 768 and 1280, with line-art style plus one text-style pass.
  - View every crop at native size. A downscaled contact sheet is not acceptable as evidence.
  - Measure insets and overflow as the audit did.
  - Run axe (`@axe-core/playwright` from node_modules) on every tab and modal.
- Also confirm the template's light and dark modes are unchanged: compare a few crops before and after your edit.

## Report
- the palette, with a contrast table;
- design decisions;
- the screens covered;
- axe results;
- crop paths for the key screens;
- anything found outside your file.
