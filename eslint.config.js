import js from '@eslint/js';
import globals from 'globals';

export default [
  { ignores: ['dist/', 'js/', 'node_modules/', 'test-results/', 'playwright-report/'] },
  js.configs.recommended,
  {
    rules: {
      // localStorage / URL 解析失敗時刻意忽略
      'no-empty': ['error', { allowEmptyCatch: true }]
    }
  },
  {
    files: ['src/**/*.js'],
    languageOptions: { globals: { ...globals.browser, __APP_VERSION__: 'readonly' } }
  },
  {
    files: ['sw.js'],
    languageOptions: { globals: globals.serviceworker }
  },
  {
    files: ['*.{js,mjs}', 'scripts/**/*.mjs', 'tests/**/*.js'],
    languageOptions: { globals: { ...globals.node, ...globals.browser } }
  }
];
