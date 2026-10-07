import { build } from 'esbuild';
import { cpSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { changelog } from './src/changelog.js';

const OUT = 'dist';
const VERSION = changelog[0].version;
const STATIC = [
  'index.html',
  'style.css',
  'sw.js',
  'manifest.json',
  'icon.svg',
  'robots.txt',
  'sitemap.xml',
  'img',
  'Henry’s_Prayer_Journal.html'
];
const VERSIONED = ['index.html', 'sw.js'];

rmSync(OUT, { recursive: true, force: true });

await build({
  entryPoints: ['src/main.js'],
  outfile: `${OUT}/js/app.js`,
  bundle: true,
  format: 'iife',
  minify: true,
  charset: 'utf8',
  sourcemap: true,
  logLevel: 'info'
});

for (const path of STATIC) {
  cpSync(path, `${OUT}/${path}`, { recursive: true });
}

for (const file of VERSIONED) {
  const path = `${OUT}/${file}`;
  writeFileSync(path, readFileSync(path, 'utf8').replaceAll('__VERSION__', VERSION));
}
console.log(`  version ${VERSION}`);
