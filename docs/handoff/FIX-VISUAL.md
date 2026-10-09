# Visual fixes: 19 findings from the full-resolution audit

Repo: `C:/Users/alice/Documents/GitHub/Tarot`.

- Audit scripts and crops: `scratchpad/fullres/` (scripts) and `scratchpad/fullres/out/` (crops). `scratchpad` = `C:/Users/alice/AppData/Local/Temp/claude/C--Users-alice-Documents-GitHub-Tarot/9461462d-ad38-4cb2-a17e-e7927776e186/scratchpad`.
- Dev server: http://127.0.0.1:8000, already running; don't stop it.
- Templates are minimal / aurora / editorial / immersive, each light and dark. Set them through localStorage: `template`, `theme`, `tab`.
- The owner is unhappy about sloppy visual quality. Every fix must be verified with deviceScaleFactor 2 component crops viewed at native size, plus measurements. Reuse the audit scripts.

You own every file needed for these fixes: style.css, styles/templates/*, src/history.js, src/template.js, src/pager.js, and so on. Keep each fix minimal and scoped. Match the code style: Chinese comments, compact.

## Findings and the fix to apply

1. **Pager "next" label wraps mid-term and overflows the pill.** Seen in aurora at 320/375 and immersive at 320. `shared.css` `.rd-pager-next { white-space: normal }`.
   - Make the label one line: `.rd-pager-btn-text { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; min-width: 0 }`, and give the button `min-width: 0` and `max-width: 100%`.
   - Reduce aurora's extra side inset on `.rd-pager-nav` at narrow widths so the button has room.
   - The full "下一張：權杖侍者" must stay available to screen readers. Check that `aria-label` or the text node still holds the full text.
2. **Every pill button turns into a 4px-radius rectangle on keyboard focus.** `style.css` global `:focus-visible { border-radius: var(--radius-xs) }`.
   - Remove the `border-radius` from that global rule, so focus never changes an element's shape and the outline follows the element's own radius.
   - Then check which elements relied on it. Inline text links may want a small radius: add `a:focus-visible, .text-link:focus-visible { border-radius: var(--radius-xs) }` only if they have no radius of their own.
3. **The aurora card-modal sticky tab bar (`#cardModalSeg`) is see-through**, so text scrolled under it shows through sharply.
   - When it is sticky inside the modal, give it an opaque background that keeps the glass look: the glass layered over the sheet background, e.g. `background: linear-gradient(var(--tpl-glass), var(--tpl-glass)), var(--sheet-bg)` if `--sheet-bg` is opaque. Check it; otherwise use `--bg`.
   - Do this in light and dark.
   - Check the same thing in editorial and immersive. Editorial already handled it; confirm immersive.
4. **The aurora nav capsule's backdrop blur is lost.** `.tpl-nav` permanently has `view-transition-name: tpl-nav` (`shared.css:73`), and that disables the backdrop-filter on `.tpl-nav::before`.
   - Apply the name only during a transition. In `src/template.js` `navigateTab`, add a class such as `vt-nav` to `<html>` right before `document.startViewTransition`, and remove it when `vt.finished` settles (also on the catch path).
   - In shared.css, key `view-transition-name` on `:root.vt-nav`.
   - Keep the existing View Transitions test passing; update it only if it checked the static name.
   - Verify the blur works again, using the audit's `blur2` method.
5. **The focus ring on editorial pager tabs (`.rd-tabs .rd-tab`) is clipped** by `overflow: auto`. Use an inset ring for that element (`outline-offset: -3px` or similar) so nothing gets clipped. The ring must still be visible and have 3:1 contrast.
6. **Immersive spread tile 「凱爾特十字」 wraps onto two lines** at 320/375, and its glyph sits out of line with the others. `.spread-tile-name { white-space: nowrap }`, with a smaller font or letter-spacing on narrow screens and less tile padding so all five characters fit. All tiles must align: same glyph top, same label top.
7. **History note gets cut off with no ellipsis.** `.history-note` is flex, so the text is an anonymous flex item. In `src/history.js`, wrap the excerpt text in `<span class="history-note-text">`. Give that span `min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1`, and give the icon `flex: none`.
8. **A thick left border on a rounded toast** (editorial 4px with 12px radius; minimal 3px with 16px radius) leaves a tapering crescent. Draw the colour bar a different way: keep a uniform 1px border and use an inset `box-shadow: inset 4px 0 0 <colour>` combined with the existing shadow, or a `::before` bar clipped by `overflow: hidden`. Do it per variant (success, warning, error, info) in base and editorial.
9. **Focus rings that don't follow their shape.**
   - (a) Radios get a square ring: add `input[type="radio"]:focus-visible { border-radius: 50% }`. Check checkboxes and switches too.
   - (b) On the aurora desktop rail, the item focus ring radius must be 30px to match the item (it is currently 26px from the mobile rule). Add a ≥1024px override.
10. **Immersive settings switch description doesn't line up with its label.** Indent `.checkbox-desc` to the label's start and leave enough space below the 28px switch. Measure: the label's x must equal the description's x.
11. **Result-card orientation isn't baseline-aligned with the card name.** `style.css` `.card-content { align-items: flex-start }` → baseline alignment. Verify in all templates. Note that the minimal pixel comparison is no longer a constraint, since this fixes a real defect.
12. **Reading item: keyword chips touch the title row** (0px gap in minimal and aurora), and the 44px 看卡片詳情 hit box overlaps the chips. Add a base gap of about `var(--space-2)`, enough that the hit area no longer overlaps. Keep editorial and immersive as they are, unless they double up.
13. **The spread-picker highlight is wider than its separator lines.** Make them agree: either inset the hover/selected highlight to the same 8px as the separators, or run the separators full width. Pick whichever looks right in each template and keep it consistent.
14. **History actions.**
    - 刪除 wraps onto its own row at 320/375. Make the actions fit on one row: smaller gaps or icon-only on very narrow screens. The labels may only be visually hidden, never `display: none`.
    - Immersive action pills start 8px from the card edge while the content starts at 20px; align them.
    - Aurora at 1280: 刪除 ends 65px from the right edge against about 30px for the header; align them.
15. **The share button drops below a full-width 「開始占卜」** at 320/375. Keep both on one row: the read button grows (`flex: 1; min-width: 0`), the share button stays at its natural width, and the group doesn't wrap. Check immersive, which has its own home layout.
16. **Compare modal: a fully rounded search input sits above a 16px-radius select** (aurora, immersive). Give both the same radius.
17. **Editorial desktop rail: the gap between the indicator and the label varies.** Left-align the rail labels (with a constant padding-left), so the 3px red bar has a constant gap to every label.
18. **Editorial pager tabs overflow at 320 for a three-card spread** (4 tabs). Tighten the tab padding and font at narrow widths so 4 tabs fit at 320. Celtic, with 11 tabs, may scroll.
19. **The English name on database cards is cut off at 375 in the two-column grid.** Allow 2 lines (`-webkit-line-clamp: 2`) instead of truncating to one.

## Verification (mandatory)
- After the fixes, re-run the audit scripts in `scratchpad/fullres/` (or equivalents) for every item.
- Produce before/after crops for each item at the widths and templates where it was found, under `scratchpad/fullres/after/`, with filenames that make the before/after pairing obvious.
- LOOK at every after crop at native size, and measure the numbers given in the finding.
- Check that nothing regressed in other templates. In particular, minimal's look should change only where a finding requires it.
- Run `npx eslint .`, `node build.mjs` (retry on ENOTEMPTY), then the full `npx playwright test`. It must be all green, and the axe tests are part of it.
- Do not commit.
- Report each item with: fix, file, after-crop path, measured result. Then give the test counts.
