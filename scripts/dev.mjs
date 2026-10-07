import { context } from 'esbuild';
import { jsOptions } from './bundle.mjs';

const ctx = await context({ ...jsOptions, outdir: 'js', write: false });
await ctx.watch();
const { port } = await ctx.serve({ servedir: '.', host: '127.0.0.1', port: 8000 });
console.log(`dev server: http://127.0.0.1:${port}`);
