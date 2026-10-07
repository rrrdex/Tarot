// 本機預覽 dist/，並套用 _headers 規則與壓縮，盡量貼近正式環境，讓測試也能驗證 CSP 與快取標頭
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import { brotliCompressSync, gzipSync } from 'node:zlib';

const ROOT = 'dist';
const COMPRESSIBLE = new Set(['.html', '.js', '.css', '.json', '.map', '.svg', '.txt', '.xml']);
const PORT = Number(process.env.PORT) || 4173;
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8'
};

function parseHeaders(text) {
  const rules = [];
  for (const line of text.split(/\r?\n/)) {
    if (!line.trim() || line.trimStart().startsWith('#')) continue;
    if (!/^\s/.test(line)) {
      const pattern = line.trim().replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*');
      rules.push({ re: new RegExp(`^${pattern}$`), headers: [] });
    } else {
      const i = line.indexOf(':');
      rules.at(-1).headers.push([line.slice(0, i).trim(), line.slice(i + 1).trim()]);
    }
  }
  return rules;
}

const headersFile = join(ROOT, '_headers');
const rules = existsSync(headersFile) ? parseHeaders(readFileSync(headersFile, 'utf8')) : [];

createServer(async (req, res) => {
  const urlPath = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let path = normalize(urlPath);
  if (path.endsWith('/') || path.endsWith('\\')) path += 'index.html';
  const file = join(ROOT, path);
  try {
    if (!(await stat(file)).isFile()) throw new Error('not a file');
    for (const { re, headers } of rules) {
      if (re.test(urlPath)) headers.forEach(([k, v]) => res.setHeader(k, v));
    }
    res.setHeader('Content-Type', TYPES[extname(file)] || 'application/octet-stream');
    let body = await readFile(file);
    const accept = req.headers['accept-encoding'] || '';
    if (COMPRESSIBLE.has(extname(file))) {
      res.setHeader('Vary', 'Accept-Encoding');
      if (accept.includes('br')) {
        body = brotliCompressSync(body);
        res.setHeader('Content-Encoding', 'br');
      } else if (accept.includes('gzip')) {
        body = gzipSync(body);
        res.setHeader('Content-Encoding', 'gzip');
      }
    }
    res.writeHead(200);
    res.end(body);
  } catch {
    res.writeHead(404).end('Not found');
  }
}).listen(PORT, '127.0.0.1', () => console.log(`serving ${ROOT}/ at http://127.0.0.1:${PORT}`));
