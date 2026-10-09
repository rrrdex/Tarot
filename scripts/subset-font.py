"""自帶的襯線字型：把思源宋體（Noto Serif TC 可變字型）切成幾個小檔。

瀏覽器只會下載畫面上用到的那幾片（@font-face 的 unicode-range），不必一次下載整套字。
分片依 fonts/chars-priority.txt（scripts/font-scan.mjs 掃出來的、實際用襯線字顯示的字）：
  第一片：拉丁字母、數字、標點與首頁的字（打開首頁只要這一片）
  接著：其他標題用得到的字
  最後：只出現在內文、標題不會用到的字（依字頻分組，幾乎不會下載）
只收網站用得到的字（src/*.js 與 index.html 裡出現的所有字元），字重 400–900。

用法（需要 Python 的 fonttools 與 brotli：pip install fonttools brotli）：
  python scripts/subset-font.py "path/to/NotoSerifTC[wght].ttf"
會重新產生 fonts/noto-serif-tc-*.woff2 與 styles/fonts.css。文字或標題新增了字時先重跑 font-scan.mjs 再重跑這支；
缺字只會讓那幾個字退回系統的襯線字。
"""
import glob
import os
import sys
from collections import Counter

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SOURCES = [os.path.join(ROOT, 'index.html')] + sorted(glob.glob(os.path.join(ROOT, 'src', '*.js')))
OUT_DIR = os.path.join(ROOT, 'fonts')
CSS = os.path.join(ROOT, 'styles', 'fonts.css')
PRIORITY = os.path.join(OUT_DIR, 'chars-priority.txt')
FAMILY = 'Noto Serif TC'
# 標題字每片的字數、內文字每片的字數
HEADING_CHUNK = 240
BODY_CHUNK = 320


def is_cjk(cp):
    return 0x3400 <= cp <= 0x9FFF or 0xF900 <= cp <= 0xFAFF or 0x20000 <= cp <= 0x2FFFF


def ranges(cps):
    """把碼位清單壓成 unicode-range 的寫法（連續的合併成區間）"""
    cps = sorted(cps)
    out, start, prev = [], cps[0], cps[0]
    for cp in cps[1:] + [None]:
        if cp is not None and cp == prev + 1:
            prev = cp
            continue
        out.append(f'U+{start:X}' if start == prev else f'U+{start:X}-{prev:X}')
        if cp is not None:
            start = prev = cp
    return ', '.join(out)


def main(src):
    freq = Counter()
    for path in SOURCES:
        with open(path, encoding='utf8') as f:
            freq.update(ch for ch in f.read() if ord(ch) >= 0x20)
    # 先把字重範圍限制在 400–900 存成暫存檔，每一片都從這個檔案切（直接在記憶體裡切可變字型會出錯）
    font = instancer.instantiateVariableFont(TTFont(src), {'wght': (400, 900)})
    limited = os.path.join(OUT_DIR, '.noto-serif-tc-400-900.ttf')
    font.save(limited)
    font = TTFont(limited)
    cmap = font.getBestCmap()
    have = {ord(ch) for ch in freq if ord(ch) in cmap}
    have |= {cp for cp in range(0x20, 0x7F) if cp in cmap}
    with open(PRIORITY, encoding='utf8') as f:
        home_line, heading_line = (f.read().split('\n') + ['', ''])[:2]
    by_freq = lambda cps: sorted(cps, key=lambda cp: (-freq[chr(cp)], cp))
    home = {ord(ch) for ch in home_line} & have
    headings = ({ord(ch) for ch in heading_line} & have) - home
    other = {cp for cp in have if not is_cjk(cp)}
    body = by_freq(cp for cp in have if is_cjk(cp) and cp not in home | headings)
    heads = by_freq(cp for cp in headings if cp not in other)
    slices = [sorted(other | home)]
    slices += [heads[i:i + HEADING_CHUNK] for i in range(0, len(heads), HEADING_CHUNK)]
    slices += [body[i:i + BODY_CHUNK] for i in range(0, len(body), BODY_CHUNK)]

    for old in glob.glob(os.path.join(OUT_DIR, 'noto-serif-tc-*.woff2')):
        os.remove(old)
    rules = []
    for i, cps in enumerate(slices):
        name = f'noto-serif-tc-{i:02d}.woff2'
        opts = subset.Options()
        opts.flavor = 'woff2'
        opts.layout_features = ['*']
        opts.hinting = False
        opts.desubroutinize = True
        sub = subset.Subsetter(opts)
        sub.populate(unicodes=cps)
        part = TTFont(limited)
        sub.subset(part)
        part.flavor = 'woff2'
        part.save(os.path.join(OUT_DIR, name))
        size = os.path.getsize(os.path.join(OUT_DIR, name))
        print(f'{name}: {len(cps)} 字，{size / 1024:.0f} KB')
        rules.append(
            '@font-face {\n'
            f'  font-family: "{FAMILY}";\n'
            f'  src: url("../fonts/{name}") format("woff2");\n'
            '  font-weight: 400 900;\n'
            '  font-style: normal;\n'
            '  font-display: swap;\n'
            f'  unicode-range: {ranges(cps)};\n'
            '}\n'
        )
    os.remove(limited)
    with open(CSS, 'w', encoding='utf8') as f:
        f.write(
            '/* 自帶的襯線字型：思源宋體（Noto Serif TC，SIL Open Font License 1.1，授權見 fonts/OFL.txt）。\n'
            '   由 scripts/subset-font.py 產生，不要手改。依字頻切成小檔：瀏覽器只下載畫面上用到的那幾片，\n'
            '   而且只有用到這個字型的版型才會下載（簡約版型不用）；font-display: swap 讓文字先用系統字顯示。 */\n'
            + '\n'.join(rules)
        )


if __name__ == '__main__':
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(sys.argv[1])
