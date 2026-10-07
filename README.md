# Tarot

Honestly, I got pretty tired of online tarot websites.

Every site seemed to be drowning in ads, packed with endless fluff text, or would randomly disappear after a few months. I just wanted somewhere clean and simple to pull cards.

So I made this. A straightforward, no-BS page where you can get your reading without all the noise.

The whole thing is in Traditional Chinese (繁體中文). I'm learning the language right now, and building this was a fun way to actually use what I've been studying.

No ads, no sign-ups, no lengthy backstories. **Just Tarot.**

## Development

Source lives in `src/` as ES modules. esbuild bundles it into one `app-[hash].js`; the large data files (`lore`, `contexts`, `changelog`) are split into chunks that load on demand and are precached by the service worker.

```bash
npm install
npm run dev       # http://127.0.0.1:8000, rebuilds on save
npm run build     # production output in dist/
npm run preview   # serve dist/ with the _headers rules applied
npm run lint
npm test          # Playwright, runs against dist/ (build first)
```

- The app version comes from the first entry of `src/changelog.js`.
- Card images: `node scripts/images.mjs <folder of original JPGs>` regenerates the AVIF/WebP files and the 160/320/400px thumbnails. The originals are in `img/cards_original.rar`.
- App icons: `node scripts/icons.mjs` regenerates the PNG icons in `icons/` from `icon.svg`.
- `_headers` (cache policy, CSP) is applied by Cloudflare Pages; GitHub Pages ignores it.
- GitHub Actions runs lint, build and tests before every deploy.
