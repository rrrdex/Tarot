# Tarot

Honestly, I got pretty tired of online tarot websites.

Every site seemed to be drowning in ads, packed with endless fluff text, or would randomly disappear after a few months. I just wanted somewhere clean and simple to pull cards.

So I made this. A straightforward, no-BS page where you can get your reading without all the noise.

The whole thing is in Traditional Chinese (繁體中文). I'm learning the language right now, and building this was a fun way to actually use what I've been studying.

No ads, no sign-ups, no lengthy backstories. **Just Tarot.**

## Development

Source lives in `src/` as ES modules; esbuild bundles it into a single `js/app.js`.

```bash
npm install
npm run dev     # http://127.0.0.1:8000, rebuilds on save
npm run build   # production output in dist/
```

The version shown in cache-busting URLs and the service worker cache name comes from the first entry of `src/changelog.js`.
