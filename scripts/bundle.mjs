import { changelog } from '../src/changelog.js';

export const VERSION = changelog[0].version;

// build 與 dev 共用；兩邊只差輸出位置、檔名雜湊與壓縮
export const jsOptions = {
  entryPoints: [{ in: 'src/main.js', out: 'app' }],
  bundle: true,
  format: 'esm',
  splitting: true,
  charset: 'utf8',
  sourcemap: true,
  define: { __APP_VERSION__: JSON.stringify(VERSION) },
  logLevel: 'info'
};
