// 自製線稿牌組的繪圖工具：畫框、形狀、人物與場景零件（大牌與四組小牌共用）
// 顏色與線寬由 style.css 的 svg.line-art 規則決定（dk-* class），線寬以 non-scaling-stroke 按螢幕像素計
export const f = (n) => Math.round(n * 10) / 10;
// 以 (cx, cy) 為圓心，角度 0 朝上、順時針
export function pt(cx, cy, r, deg) {
  const a = (deg - 90) * Math.PI / 180;
  return [f(cx + r * Math.cos(a)), f(cy + r * Math.sin(a))];
}
export const xy = (p) => p.join(' ');
export const cls = (c) => (c ? ` class="${c}"` : '');
export const P = (d, c = '') => `<path${cls(c)} d="${d}"/>`;
export const C = (cx, cy, r, c = '') => `<circle${cls(c)} cx="${cx}" cy="${cy}" r="${r}"/>`;
export const E = (cx, cy, rx, ry, c = '') => `<ellipse${cls(c)} cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"/>`;
export const G = (transform, inner, c = '') => `<g${cls(c)} transform="${transform}">${inner}</g>`;
export const T = (x, y, text, size, c = 'dk-txt', spacing = 0) =>
  `<text${cls(c)} x="${f(x + spacing / 2)}" y="${y}" font-size="${size}"${spacing ? ` letter-spacing="${spacing}"` : ''} text-anchor="middle">${text}</text>`;
// 只含座標對（M/L/C/Q）的路徑左右鏡射
export const mirror = (d) => d.replace(/(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/g, (_, x, y) => `${f(300 - x)} ${y}`);

export function raysD(cx, cy, r0, r1, n, start = 0, span = 360) {
  const step = span === 360 ? 360 / n : span / (n - 1);
  let d = '';
  for (let i = 0; i < n; i++) d += `M${xy(pt(cx, cy, r0, start + step * i))}L${xy(pt(cx, cy, r1, start + step * i))}`;
  return d;
}
export function starD(cx, cy, rOut, rIn, n, start = 0) {
  const pts = [];
  for (let i = 0; i < n * 2; i++) pts.push(xy(pt(cx, cy, i % 2 ? rIn : rOut, start + 180 * i / n)));
  return `M${pts.join('L')}Z`;
}
export function pentagramD(cx, cy, r, start = 0) {
  const p = [0, 2, 4, 1, 3].map(i => xy(pt(cx, cy, r, start + 72 * i)));
  return `M${p.join('L')}Z`;
}
export function sparkleD(cx, cy, r) {
  const k = f(r * 0.18);
  return `M${cx} ${f(cy - r)}Q${f(cx + k)} ${f(cy - k)} ${f(cx + r)} ${cy}Q${f(cx + k)} ${f(cy + k)} ${cx} ${f(cy + r)}` +
    `Q${f(cx - k)} ${f(cy + k)} ${f(cx - r)} ${cy}Q${f(cx - k)} ${f(cy - k)} ${cx} ${f(cy - r)}Z`;
}
// 葉形：由 (x, y) 朝 deg 方向長出
export function leafD(x, y, len, deg, w = 0.34) {
  const mid = pt(x, y, len / 2, deg);
  return `M${x} ${y}Q${xy(pt(mid[0], mid[1], len * w, deg + 90))} ${xy(pt(x, y, len, deg))}` +
    `Q${xy(pt(mid[0], mid[1], len * w, deg - 90))} ${x} ${y}Z`;
}
// 水滴：尖端朝上，圓底在 (x, y)
export function dropD(x, y, r) {
  return `M${x} ${f(y - r * 2.4)}Q${f(x + r * 1.1)} ${f(y - r * 0.7)} ${f(x + r)} ${y}A${r} ${r} 0 0 1 ${f(x - r)} ${y}` +
    `Q${f(x - r * 1.1)} ${f(y - r * 0.7)} ${x} ${f(y - r * 2.4)}Z`;
}
// 圓瓣花（玫瑰、向日葵）
export function rosetteD(cx, cy, r, n, start = 0) {
  const inner = r * 0.62;
  const pts = Array.from({ length: n }, (_, i) => xy(pt(cx, cy, inner, start + 360 * i / n)));
  const pr = f(inner * Math.sin(Math.PI / n) * 1.05);
  let d = `M${pts[0]}`;
  for (let i = 1; i <= n; i++) d += `A${pr} ${pr} 0 1 1 ${pts[i % n]}`;
  return `${d}Z`;
}
// 新月：開口朝 deg 方向
export function crescentD(cx, cy, r, deg = 0) {
  const a = xy(pt(cx, cy, r, deg - 70));
  const b = xy(pt(cx, cy, r, deg + 70));
  const ri = f(r * 0.96);
  return `M${a}A${r} ${r} 0 1 0 ${b}A${ri} ${ri} 0 0 1 ${a}Z`;
}
export function lemniscateD(cx, cy, w, h) {
  const k = w * 0.43;
  return `M${cx - w} ${cy}C${cx - w} ${cy - h} ${f(cx - k)} ${cy - h} ${cx} ${cy}C${f(cx + k)} ${cy + h} ${cx + w} ${cy + h} ${cx + w} ${cy}` +
    `C${cx + w} ${cy - h} ${f(cx + k)} ${cy - h} ${cx} ${cy}C${f(cx - k)} ${cy + h} ${cx - w} ${cy + h} ${cx - w} ${cy}Z`;
}
export function wavesD(x0, x1, y, amp = 3, len = 20) {
  let d = `M${x0} ${y}`;
  for (let x = x0; x + len <= x1 + 0.1; x += len) d += `q${len / 4} ${-amp} ${len / 2} 0t${len / 2} 0`;
  return d;
}
export function spiralD(cx, cy, r, turns, start, dir) {
  const steps = Math.ceil(turns * 36);
  const pts = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    pts.push(xy(pt(cx, cy, r * (1 - 0.72 * t), start + dir * 360 * turns * t)));
  }
  return `M${pts.join('L')}`;
}
export function towerD(x, y, w, h) {
  const m = f(w / 5);
  return `M${x} ${y + h}V${y}h${m}v-5h${m}v5h${m}v-5h${m}v5h${m}V${y + h}Z`;
}
export function archWindowD(x, y, w, h) {
  const r = w / 2;
  return `M${x - r} ${y + h}V${y}A${r} ${r} 0 0 1 ${x + r} ${y}V${y + h}Z`;
}
export const SUIT_ART = {
  'Wands': P(leafD(0, -12, 13, -48) + leafD(0, -2, 12, 48) + leafD(0, 8, 10, -48), 'dk-gf') +
    P('M0 30V-25', 'dk-b') + P('M-2.6 19H2.6M-2.6 -19H2.6', 'dk-t') + C(0, -28.5, 3, 'dk-gf'),
  'Cups': P('M-16 -26H16C16 -8 8 0 0 0C-8 0 -16 -8 -16 -26Z', 'dk-tf') + P('M-16 -26H16M-12 -16H12', 'dk-g') +
    P('M0 0V21') + E(0, 10, 3.5, 2.5, 'dk-gf') + P('M-12 28C-10 23 -4 21 0 21C4 21 10 23 12 28Z', 'dk-tf'),
  'Swords': P('M0 -32L4 -24V12H-4V-24Z', 'dk-tf') + P('M0 -23V9', 'dk-t dk-d') +
    P('M-14 12C-8 16 8 16 14 12', 'dk-g dk-b') + C(-14, 12, 2, 'dk-gf') + C(14, 12, 2, 'dk-gf') +
    P('M0 15V25', 'dk-b') + C(0, 28.5, 3.2, 'dk-gf'),
  'Pentacles': C(0, 0, 26, 'dk-tf') + C(0, 0, 21, 'dk-g dk-t') + P(pentagramD(0, 0, 19), 'dk-g')
};
export const sym = (suit, x, y, s, rot = 0) => G(`translate(${x} ${y}) scale(${s})${rot ? ` rotate(${rot})` : ''}`, SUIT_ART[suit]);

export const ARCH = 'M50 448V178A100 100 0 0 1 250 178V448Z';
export const ARCH_INNER = 'M57 441V178A93 93 0 0 1 243 178V441Z';
export const ELEMENT_GLYPH = {
  'Wands': 'M150 41L159.5 57H140.5Z',
  'Cups': 'M140.5 41H159.5L150 57Z',
  'Swords': 'M150 41L159.5 57H140.5ZM144 51H156',
  'Pentacles': 'M140.5 41H159.5L150 57ZM144 47H156'
};
export function frame(label, title, suit, scene = false) {
  const w = label ? label.length * 11 : 18;
  const fl = `M${150 - w / 2 - 46} 51H${150 - w / 2 - 12}M${150 + w / 2 + 12} 51H${150 + w / 2 + 46}`;
  return [
    `<rect class="dk-t" x="12" y="12" width="276" height="495" rx="5"/>`,
    `<rect class="dk-g dk-t dk-d" x="17" y="17" width="266" height="485" rx="3"/>`,
    P(sparkleD(31, 31, 6) + sparkleD(269, 31, 6) + sparkleD(31, 488, 6) + sparkleD(269, 488, 6), 'dk-gf dk-d'),
    scene ? '' : P(ARCH, 'dk-tf'),
    scene ? '' : P(ARCH_INNER, 'dk-g dk-t dk-d'),
    P(fl, 'dk-g dk-t dk-d'),
    C(150 - w / 2 - 50, 51, 1.6, 'dk-gf dk-d') + C(150 + w / 2 + 50, 51, 1.6, 'dk-gf dk-d'),
    label ? T(150, 57, label, 17, 'dk-txt dk-num', 1.5) : P(ELEMENT_GLYPH[suit]),
    P('M64 466H138M162 466H236', 'dk-t dk-d'),
    P('M150 460L156 466L150 472L144 466Z', 'dk-gf dk-d'),
    title ? T(150, 491, title, 12, 'dk-txt dk-title', 2) : ''
  ].join('');
}

// 大牌場景：固定配色的插畫，裁切在拱窗內（不隨深淺主題變色）
export const K = {
  ink: '#2b2833', cream: '#f6efe0', white: '#fbf8f1', skin: '#efd9bf', skinShade: '#dcbd9c', lip: '#b8695c', blush: '#e9a898',
  gold: '#c49a4f', goldDeep: '#9c7638', goldLight: '#ecd08a',
  red: '#a9433a', redDeep: '#7e2f2a', blue: '#3f5f8f', blueDeep: '#2c4469', blueSoft: '#7f9cc0',
  green: '#6f8250', greenDeep: '#4e5f37', yellow: '#ecd27e', ochre: '#e6c063', purple: '#7a5a8f', purpleDeep: '#5c4270',
  stone: '#a29d93', stoneDeep: '#7d7870', stoneLight: '#bdb7ad', brown: '#8a6a4b', brownDeep: '#5f4733',
  hairDark: '#3f2e25', hairBrown: '#7a5232', hairBlond: '#d6a75a', hairRed: '#b5562f', hairWhite: '#ece7de',
  storm: '#2f3448', cloud: '#444a62', snow: '#eef1f0', snowShade: '#b7c6d0', flame: '#e0783a', flameLight: '#f2b24a'
};
export const F = (d, fill) => `<path d="${d}" fill="${fill}" stroke="none"/>`;
export const FC = (cx, cy, r, fill) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="none"/>`;
export const FE = (cx, cy, rx, ry, fill, rot = 0) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"${rot ? ` transform="rotate(${rot} ${cx} ${cy})"` : ''} fill="${fill}" stroke="none"/>`;
export const FS = (d, fill, stroke = K.ink) => `<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="0.8"/>`;
// 肢體與粗線：線寬隨牌面縮放
export const L = (d, color, w) => `<path class="dk-lim" d="${d}" stroke="${color}" stroke-width="${w}" fill="none"/>`;
// 固定顏色的細線（螢幕像素寬）
export const Ln = (d, color, w = 0.8) => `<path d="${d}" stroke="${color}" stroke-width="${w}" fill="none"/>`;
// 陰影與受光面
export const SH = (d, o = 0.16) => `<path d="${d}" fill="#1d1622" fill-opacity="${o}" stroke="none"/>`;
export const HL = (d, o = 0.25) => `<path d="${d}" fill="#ffffff" fill-opacity="${o}" stroke="none"/>`;
export const SKY = 'M40 60H260V460H40Z';

// 漸層 id 以牌面的 clipPath id 為前綴，同頁多張牌不會互相干擾
let sceneUid = '';
let gradSeq = 0;
export function GF(d, from, to, horizontal = false) {
  const id = `${sceneUid}-g${++gradSeq}`;
  const dir = horizontal ? 'x2="1" y2="0"' : 'x2="0" y2="1"';
  return `<linearGradient id="${id}" x1="0" y1="0" ${dir}><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient>` +
    `<path d="${d}" fill="url(#${id})" stroke="none"/>`;
}
// 光暈：由中心往外淡出到透明
export function glow(cx, cy, rx, ry, color, o) {
  const id = `${sceneUid}-g${++gradSeq}`;
  return `<radialGradient id="${id}"><stop offset="0" stop-color="${color}" stop-opacity="${o}"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></radialGradient>` +
    `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#${id})" stroke="none"/>`;
}
// 二次曲線取樣，供 limb 使用
export function bez(p0, c, p1, n = 10) {
  return Array.from({ length: n + 1 }, (_, i) => {
    const t = i / n;
    const u = 1 - t;
    return [u * u * p0[0] + 2 * u * t * c[0] + t * t * p1[0], u * u * p0[1] + 2 * u * t * c[1] + t * t * p1[1]];
  });
}
// 漸細的肢體：沿折線由寬 w0 變到 w1；caps 決定哪一端畫圓頭（接在身體上的一端不畫，免得露出圓球）
export function limb(pts, w0, w1, fill, caps = 'end') {
  const n = pts.length;
  const a = [];
  const b = [];
  pts.forEach(([x, y], i) => {
    const [px, py] = pts[Math.max(0, i - 1)];
    const [qx, qy] = pts[Math.min(n - 1, i + 1)];
    const len = Math.hypot(qx - px, qy - py) || 1;
    const nx = -(qy - py) / len;
    const ny = (qx - px) / len;
    const w = (w0 + (w1 - w0) * i / (n - 1)) / 2;
    a.push(`${f(x + nx * w)} ${f(y + ny * w)}`);
    b.push(`${f(x - nx * w)} ${f(y - ny * w)}`);
  });
  return F(`M${a.join('L')}L${b.reverse().join('L')}Z`, fill) +
    (caps === 'both' || caps === 'start' ? FC(f(pts[0][0]), f(pts[0][1]), f(w0 / 2), fill) : '') +
    (caps === 'both' || caps === 'end' ? FC(f(pts[n - 1][0]), f(pts[n - 1][1]), f(w1 / 2), fill) : '');
}
export const hand = (x, y, deg = 0, r = 4.2, fill = K.skin) => FE(x, y, f(r * 0.78), r, fill, deg);
// 袖子：外緣一圈較深的色調，與同色長袍分得開；袖口可另上色
export function sleeve(pts, w0, w1, color, edge, cuff) {
  const n = pts.length;
  return limb(pts, w0 + 2, w1 + 2, edge) + limb(pts, w0, w1, color) +
    (cuff ? FC(f(pts[n - 1][0]), f(pts[n - 1][1]), f(w1 / 2 + 0.6), cuff) : '');
}
// 頭部：dir 0 正面、1 朝右、-1 朝左；style: short / long / none
// male / old 不畫腮紅與笑容；rot 讓整顆頭轉動（例如仰望）
export function head(x, y, o = {}) {
  const r = o.r || 11;
  const dir = o.dir || 0;
  const style = o.style || (o.hair ? 'short' : 'none');
  const tilt = o.tilt ?? (o.up ? -0.14 : o.down ? 0.14 : 0);
  const ey = f(y + r * (tilt - 0.02));
  const plain = o.male || o.old;
  const browC = o.old ? '#d8d2c6' : K.hairDark;
  const browW = plain ? 1.1 : 0.7;
  let s = '';
  if (style === 'long') {
    const len = o.len || 2.6;
    s += F(`M${f(x - r * 1.08)} ${f(y - r * 0.1)}C${f(x - r * 1.3)} ${f(y - r * 1.5)} ${f(x + r * 1.3)} ${f(y - r * 1.5)} ${f(x + r * 1.08)} ${f(y - r * 0.1)}` +
      `L${f(x + r * 1.22)} ${f(y + r * len)}Q${x} ${f(y + r * (len - 0.45))} ${f(x - r * 1.22)} ${f(y + r * len)}Z`, o.hair);
  }
  s += FC(x, y, r, K.skin) + SH(`M${f(x + r * 0.35)} ${f(y - r * 0.94)}A${r} ${r} 0 0 1 ${f(x + r * 0.35)} ${f(y + r * 0.94)}A${f(r * 1.1)} ${f(r * 1.1)} 0 0 0 ${f(x + r * 0.35)} ${f(y - r * 0.94)}Z`, 0.07);
  const mouthY = f(y + r * 0.5 + tilt * r);
  if (dir === 0) {
    s += o.closed
      ? Ln(`M${f(x - r * 0.52)} ${ey}q${f(r * 0.16)} ${f(r * 0.13)} ${f(r * 0.32)} 0M${f(x + r * 0.2)} ${ey}q${f(r * 0.16)} ${f(r * 0.13)} ${f(r * 0.32)} 0`, K.ink, 0.9)
      : FC(f(x - r * 0.36), ey, f(r * 0.1), K.ink) + FC(f(x + r * 0.36), ey, f(r * 0.1), K.ink);
    s += Ln(`M${f(x - r * 0.56)} ${f(ey - r * 0.22)}q${f(r * 0.2)} ${f(-r * 0.1)} ${f(r * 0.38)} 0M${f(x + r * 0.18)} ${f(ey - r * 0.22)}q${f(r * 0.2)} ${f(-r * 0.1)} ${f(r * 0.38)} 0`, browC, browW);
    s += Ln(`M${x} ${f(ey + r * 0.12)}l${f(-r * 0.08)} ${f(r * 0.26)}l${f(r * 0.12)} 0`, K.skinShade, 0.9);
    s += o.open
      ? FE(x, f(mouthY + r * 0.05), f(r * 0.14), f(r * 0.12), '#8a4a40')
      : plain
        ? Ln(`M${f(x - r * 0.18)} ${mouthY}h${f(r * 0.36)}`, K.lip, 0.9)
        : Ln(`M${f(x - r * 0.2)} ${mouthY}Q${x} ${f(mouthY + r * 0.1)} ${f(x + r * 0.2)} ${mouthY}`, K.lip, 0.9);
    if (o.old) s += Ln(`M${f(x - r * 0.62)} ${f(ey + r * 0.2)}q${f(r * 0.06)} ${f(r * 0.12)} 0 ${f(r * 0.24)}M${f(x + r * 0.62)} ${f(ey + r * 0.2)}q${f(-r * 0.06)} ${f(r * 0.12)} 0 ${f(r * 0.24)}`, K.skinShade, 0.7);
    if (!plain) {
      s += `<circle cx="${f(x - r * 0.5)}" cy="${f(ey + r * 0.32)}" r="${f(r * 0.16)}" fill="${K.blush}" fill-opacity=".45" stroke="none"/>` +
        `<circle cx="${f(x + r * 0.5)}" cy="${f(ey + r * 0.32)}" r="${f(r * 0.16)}" fill="${K.blush}" fill-opacity=".45" stroke="none"/>`;
    }
  } else {
    s += F(`M${f(x + dir * r * 0.9)} ${f(ey - r * 0.12)}L${f(x + dir * r * 1.22)} ${f(ey + r * 0.3)}L${f(x + dir * r * 0.88)} ${f(ey + r * 0.4)}Z`, K.skin);
    s += o.closed
      ? Ln(`M${f(x + dir * r * 0.28)} ${ey}q${f(dir * r * 0.14)} ${f(r * 0.12)} ${f(dir * r * 0.28)} 0`, K.ink, 0.9)
      : FC(f(x + dir * r * 0.46), ey, f(r * 0.1), K.ink);
    s += Ln(`M${f(x + dir * r * 0.3)} ${f(ey - r * 0.24)}l${f(dir * r * 0.32)} ${f(-r * 0.04)}`, browC, browW);
    s += o.open
      ? F(`M${f(x + dir * r * 0.6)} ${f(mouthY - r * 0.06)}l${f(dir * r * 0.34)} ${f(-r * 0.04)}l${f(-dir * r * 0.06)} ${f(r * 0.2)}Z`, '#8a4a40')
      : Ln(`M${f(x + dir * r * 0.55)} ${mouthY}l${f(dir * r * 0.28)} ${f(-r * 0.04)}`, K.lip, 0.9);
    if (!plain) s += `<circle cx="${f(x + dir * r * 0.4)}" cy="${f(ey + r * 0.34)}" r="${f(r * 0.16)}" fill="${K.blush}" fill-opacity=".45" stroke="none"/>`;
  }
  if (style !== 'none') {
    s += F(dir === 0
      ? `M${f(x - r * 1.05)} ${f(y + r * 0.1)}C${f(x - r * 1.15)} ${f(y - r * 1.35)} ${f(x + r * 1.15)} ${f(y - r * 1.35)} ${f(x + r * 1.05)} ${f(y + r * 0.1)}C${f(x + r * 0.8)} ${f(y - r * 0.55)} ${f(x - r * 0.8)} ${f(y - r * 0.55)} ${f(x - r * 1.05)} ${f(y + r * 0.1)}Z`
      : `M${f(x + dir * r * 0.65)} ${f(y - r * 0.85)}C${f(x - dir * r * 0.4)} ${f(y - r * 1.4)} ${f(x - dir * r * 1.4)} ${f(y - r * 0.6)} ${f(x - dir * r * 1.06)} ${f(y + r * 0.6)}` +
        `C${f(x - dir * r * 0.6)} ${f(y + r * 0.15)} ${f(x - dir * r * 0.05)} ${f(y - r * 0.35)} ${f(x + dir * r * 0.65)} ${f(y - r * 0.85)}Z`, o.hair);
  }
  return o.rot ? `<g transform="rotate(${o.rot} ${x} ${y})">${s}</g>` : s;
}
// 正面坐姿的長袍：肩→腰→大腿往前形成膝蓋→裙襬垂到 hem
// o: { cx, sh (肩高), lap (膝高), hem, shW (半肩寬), kneeW (半膝寬), hemW (半襬寬), color, deep }
export function seatedRobe(o) {
  const { cx, sh, lap, hem, shW, kneeW, hemW, color, deep } = o;
  const waist = sh + (lap - sh) * 0.55;
  const d = `M${cx - shW} ${sh}C${cx - shW - 4} ${f(sh + 20)} ${cx - shW + 4} ${f(waist - 10)} ${cx - shW + 6} ${f(waist)}` +
    `C${cx - kneeW - 2} ${f(lap - 18)} ${cx - kneeW - 6} ${lap - 6} ${cx - kneeW} ${lap + 4}` +
    `C${cx - hemW + 2} ${f(lap + (hem - lap) * 0.5)} ${cx - hemW - 2} ${hem - 8} ${cx - hemW} ${hem}H${cx + hemW}` +
    `C${cx + hemW + 2} ${hem - 8} ${cx + hemW - 2} ${f(lap + (hem - lap) * 0.5)} ${cx + kneeW} ${lap + 4}` +
    `C${cx + kneeW + 6} ${lap - 6} ${cx + kneeW + 2} ${f(lap - 18)} ${cx + shW - 6} ${f(waist)}` +
    `C${cx + shW - 4} ${f(waist - 10)} ${cx + shW + 4} ${f(sh + 20)} ${cx + shW} ${sh}Q${cx} ${sh - 6} ${cx - shW} ${sh}Z`;
  const kx = kneeW * 0.52;
  return GF(d, color, deep) +
    HL(`M${f(cx - kx - 12)} ${lap}C${f(cx - kx - 10)} ${lap - 9} ${f(cx - kx + 10)} ${lap - 9} ${f(cx - kx + 12)} ${lap}C${f(cx - kx + 6)} ${lap - 4} ${f(cx - kx - 6)} ${lap - 4} ${f(cx - kx - 12)} ${lap}Z` +
      `M${f(cx + kx - 12)} ${lap}C${f(cx + kx - 10)} ${lap - 9} ${f(cx + kx + 10)} ${lap - 9} ${f(cx + kx + 12)} ${lap}C${f(cx + kx + 6)} ${lap - 4} ${f(cx + kx - 6)} ${lap - 4} ${f(cx + kx - 12)} ${lap}Z`, 0.22) +
    SH(`M${cx - kneeW} ${lap + 4}Q${cx} ${lap + 16} ${cx + kneeW} ${lap + 4}L${cx + kneeW} ${lap + 12}Q${cx} ${lap + 22} ${cx - kneeW} ${lap + 12}Z`, o.band ?? 0.16) +
    Ln(`M${cx} ${lap + 6}L${cx} ${hem}M${f(cx - kx)} ${lap + 8}L${f(cx - kx - 4)} ${hem}M${f(cx + kx)} ${lap + 8}L${f(cx + kx + 4)} ${hem}`, deep, 0.9);
}
// 袍子的褶線
export const folds = (d, color, w = 0.9) => Ln(d, color, w);
// 羽毛狀的翅膀：由肩點 (x, y) 往 dir 方向展開
export function wing(x, y, dir, span, color, shade) {
  const tip = [x + dir * span, y - span * 0.42];
  let d = `M${x} ${y}C${f(x + dir * span * 0.3)} ${f(y - span * 0.62)} ${f(tip[0] - dir * span * 0.2)} ${f(tip[1] - span * 0.08)} ${f(tip[0])} ${f(tip[1])}`;
  const steps = 5;
  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    const px = f(tip[0] - dir * span * 0.78 * t);
    const py = f(tip[1] + span * 0.62 * t);
    d += `Q${f(px + dir * span * 0.02)} ${f(py + span * 0.16)} ${px} ${py}`;
  }
  d += `L${x} ${f(y + span * 0.12)}Z`;
  let quills = '';
  for (let i = 1; i < steps; i++) {
    const t = i / steps;
    quills += `M${f(x + dir * 2)} ${f(y + 2)}L${f(tip[0] - dir * span * 0.78 * t)} ${f(tip[1] + span * 0.62 * t)}`;
  }
  return F(d, color) + Ln(quills, shade, 0.8);
}
// 側面行走的馬，原點在左上、朝右，約 132×118：有鬃毛、耳朵、關節與蹄
export function horse(fill, shade = '#d9d2c5') {
  const body = 'M16 40C30 30 56 34 74 34C84 34 92 22 98 10L102 3L106 9C116 16 124 26 130 34C132 40 126 44 120 42C114 40 108 36 104 34C104 46 102 56 100 64C96 72 88 74 76 72H40C28 74 18 68 14 56C12 50 13 44 16 40Z';
  const leg = (thigh, knee, foot, c, w0 = 11) => limb(bez(thigh, [(thigh[0] + knee[0]) / 2, (thigh[1] + knee[1]) / 2], knee, 4), w0, 6.4, c, 'none') +
    limb([knee, foot], 6.4, 5.4, c, 'none') + F(`M${foot[0] - 3.4} ${foot[1] - 4}h6.8l1 5h-8.8Z`, '#5f574f');
  return leg([28, 62], [22, 90], [26, 112], shade) + leg([88, 66], [93, 90], [90, 112], shade) +
    limb(bez([16, 42], [2, 56], [8, 90]), 6, 3, '#d8d0c2') +
    F(body, fill) + SH('M40 72H76C88 74 96 72 100 64C92 66 80 66 60 64C50 64 44 66 40 72Z', 0.1) +
    SH('M16 40C19 38 21 37 23.5 36.4C22 48 22 58 30 70C18 64 14 50 16 40Z', 0.08) +
    leg([40, 64], [46, 90], [42, 112], fill, 12) + leg([98, 62], [110, 80], [114, 96], fill) +
    F('M100 6C92 16 84 28 74 34C80 34 86 32 90 28C94 22 98 14 104 10Z', '#cfc6b6') + F('M102 3L100 -4L107 4Z', fill) +
    FC(113, 18, 1.6, K.ink) + FC(127, 34, 1, K.ink) + Ln('M122 41l6 -2', '#a89e8e', 0.8);
}
export function bookD(x, y) {
  return `M${x - 11} ${y}Q${x - 5} ${y - 3} ${x} ${y}Q${x + 5} ${y - 3} ${x + 11} ${y}V${y + 7}Q${x + 5} ${y + 4} ${x} ${y + 7}Q${x - 5} ${y + 4} ${x - 11} ${y + 7}Z`;
}
export function cloudD(x, y, w) {
  return `M${x - w} ${y}A${f(w * 0.36)} ${f(w * 0.36)} 0 0 1 ${f(x - w * 0.3)} ${f(y - w * 0.3)}A${f(w * 0.4)} ${f(w * 0.4)} 0 0 1 ${f(x + w * 0.42)} ${f(y - w * 0.26)}A${f(w * 0.32)} ${f(w * 0.32)} 0 0 1 ${x + w} ${y}Q${x} ${f(y + w * 0.18)} ${x - w} ${y}Z`;
}
export const cloud = (x, y, w) => F(cloudD(x, y, w), K.white);
// 命運之輪與世界四角的天使、鷹、牛、獅（帶翅膀）；books 為命運之輪的讀書形象
export function creatures(books) {
  const w = (x, y, s = 15) => F(leafD(x, y, s, -62, 0.4) + leafD(x, y, s, 62, 0.4), '#efe1b5') + Ln(`M${x} ${y}l${f(-s * 0.7)} ${f(-s * 0.3)}M${x} ${y}l${f(s * 0.7)} ${f(-s * 0.3)}`, '#cdb98a', 0.7);
  return [
    cloud(92, 152, 30), cloud(208, 152, 30), cloud(84, 434, 38), cloud(216, 434, 38),
    // 天使
    w(88, 134), head(88, 130, { r: 7, hair: K.hairBlond }),
    // 鷹：側面白頭、勾嘴、褐色頸羽
    w(208, 138), F('M204 140C204 130 210 122 218 122C224 122 228 126 228 130L222 132C220 136 218 142 216 144Z', '#7a5a3e'),
    F('M208 132C208 124 214 120 220 121C226 122 229 126 228 130L220 131C216 132 212 134 208 132Z', '#f4efe4'),
    F('M227 127C233 127 235 131 232 136C231 133 229 131 226 131Z', '#e2b84a'), FC(222, 126, 1.2, K.ink),
    // 牛
    w(84, 406, 20), F('M75 404C75 394 93 394 93 404C93 414 88 420 84 420C80 420 75 414 75 404Z', '#8a6a4b'), F('M79 414C80 420 88 420 89 414Z', '#b89a7c'),
    L('M76 398C70 394 68 388 72 384M92 398C98 394 100 388 96 384', '#d8ccb0', 3), FC(80, 403, 1.1, K.ink), FC(88, 403, 1.1, K.ink), FC(82, 416, 0.8, '#5a4030'), FC(86, 416, 0.8, '#5a4030'),
    // 獅：扇貝狀鬃毛、淺色臉、口鼻
    w(216, 402, 26), F(rosetteD(216, 406, 15, 11), '#a8652a'), FC(216, 407, 8.5, '#e4aa55'),
    FE(216, 411, 4.4, 3, '#f1cf8c'), FC(213, 404, 1.1, K.ink), FC(219, 404, 1.1, K.ink), F('M214.5 408.5H217.5L216 410.5Z', '#5a3a2a'), Ln('M216 410.5v1.5', '#5a3a2a', 0.7),
    ...(books ? [[88, 144], [212, 144], [84, 424], [216, 424]].map(([x, y]) => F(bookD(x, y), K.white) + Ln(bookD(x, y) + `M${x} ${y}V${y + 7}`, '#8c877e', 0.6)) : [])
  ].join('');
}
// 花：五瓣玫瑰、三瓣百合、帶冠的石榴
export const rose = (x, y, r, color = K.red) => F(rosetteD(x, y, r, 5), color) + F(rosetteD(x, y, r * 0.55, 5, 36), '#c75a4e') + FC(x, y, f(r * 0.22), K.gold);
export const lily = (x, y, s = 1, deg = 0) => G(`rotate(${deg} ${x} ${y})`, F(leafD(x, y, 16 * s, -28, 0.38) + leafD(x, y, 16 * s, 28, 0.38) + leafD(x, y, 18 * s, 0, 0.32), K.white) + Ln(`M${x} ${y}v${f(-8 * s)}`, K.goldDeep, 0.8));
export const pomegranate = (x, y, r = 6) => FC(x, y, r, K.red) + HL(`M${f(x - r * 0.7)} ${f(y - r * 0.3)}a${f(r * 0.7)} ${f(r * 0.7)} 0 0 1 ${f(r * 0.7)} ${f(-r * 0.7)}v${f(r * 0.35)}a${f(r * 0.35)} ${f(r * 0.35)} 0 0 0 ${f(-r * 0.35)} ${f(r * 0.35)}Z`, 0.4) +
  F(`M${f(x - r * 0.5)} ${f(y - r * 0.8)}L${f(x - r * 0.35)} ${f(y - r * 1.5)}L${x} ${f(y - r * 1.1)}L${f(x + r * 0.35)} ${f(y - r * 1.5)}L${f(x + r * 0.5)} ${f(y - r * 0.8)}Z`, K.redDeep);
// 站立的裸身人物（戀人、星星、惡魔腳下的兩人）：脖子、肩、腰臀、手腳；頭由呼叫端另畫
// o: { top: 肩高, foot: 腳底高, female, armL / armR: bez 三點, s: 縮放 }
export function nude(x, o) {
  const s = o.top;
  const k = o.s || 1;
  const w = (o.female ? 11 : 13) * k;
  const waistY = s + 31 * k;
  const hipY = s + 47 * k;
  const foot = o.foot;
  const sw = (n) => f(n * k);
  const torso = o.female
    ? `M${f(x - w)} ${s}C${f(x - w - k)} ${f(s + 14 * k)} ${f(x - 8 * k)} ${f(s + 22 * k)} ${f(x - 7 * k)} ${f(waistY)}C${f(x - 11 * k)} ${f(s + 38 * k)} ${f(x - 12 * k)} ${f(hipY - 2 * k)} ${f(x - 10 * k)} ${f(hipY + 4 * k)}` +
      `H${f(x + 10 * k)}C${f(x + 12 * k)} ${f(hipY - 2 * k)} ${f(x + 11 * k)} ${f(s + 38 * k)} ${f(x + 7 * k)} ${f(waistY)}C${f(x + 8 * k)} ${f(s + 22 * k)} ${f(x + w + k)} ${f(s + 14 * k)} ${f(x + w)} ${s}Q${x} ${f(s - 4 * k)} ${f(x - w)} ${s}Z`
    : `M${f(x - w)} ${s}C${f(x - w)} ${f(s + 14 * k)} ${f(x - 9 * k)} ${f(s + 24 * k)} ${f(x - 8 * k)} ${f(waistY)}C${f(x - 9 * k)} ${f(s + 38 * k)} ${f(x - 9 * k)} ${f(hipY - 2 * k)} ${f(x - 8 * k)} ${f(hipY + 4 * k)}` +
      `H${f(x + 8 * k)}C${f(x + 9 * k)} ${f(hipY - 2 * k)} ${f(x + 9 * k)} ${f(s + 38 * k)} ${f(x + 8 * k)} ${f(waistY)}C${f(x + 9 * k)} ${f(s + 24 * k)} ${f(x + w)} ${f(s + 14 * k)} ${f(x + w)} ${s}Q${x} ${f(s - 4 * k)} ${f(x - w)} ${s}Z`;
  const legL = bez([x - 4.5 * k, hipY], [x - 5.5 * k, (hipY + foot) / 2], [x - 5 * k, foot - 2.5 * k]);
  const legR = bez([x + 4.5 * k, hipY], [x + 5.5 * k, (hipY + foot) / 2], [x + 5 * k, foot - 2.5 * k]);
  const [aL, aR] = [o.armL, o.armR];
  return [
    limb(legL, 10 * k, 5.5 * k, K.skin, 'none'), limb(legR, 10 * k, 5.5 * k, K.skin, 'none'),
    SH(`M${f(x + 1 * k)} ${f(hipY)}L${f(x + 10 * k)} ${f(hipY)}L${f(x + 8 * k)} ${f(foot - 3 * k)}H${f(x + 3 * k)}Z`, 0.07),
    FE(f(x - 7 * k), f(foot - 1.5 * k), sw(4.6), sw(2.2), K.skin), FE(f(x + 7 * k), f(foot - 1.5 * k), sw(4.6), sw(2.2), K.skin),
    F(`M${f(x - 3.6 * k)} ${f(s - 9 * k)}h${sw(7.2)}v${sw(11)}h${sw(-7.2)}Z`, K.skin),
    limb(bez(...aL), 6 * k, 4.2 * k, K.skin, 'none'), limb(bez(...aR), 6 * k, 4.2 * k, K.skin, 'none'),
    F(torso, K.skin), SH(`M${x} ${f(s + 2 * k)}C${f(x + 6 * k)} ${f(s + 20 * k)} ${f(x + 5 * k)} ${f(hipY - 8 * k)} ${f(x + 3 * k)} ${f(hipY + 4 * k)}H${f(x + 8 * k)}C${f(x + 9 * k)} ${f(hipY - 2 * k)} ${f(x + 9 * k)} ${f(s + 24 * k)} ${f(x + w - k)} ${f(s + 2 * k)}Z`, 0.06),
    hand(f(aL[2][0]), f(aL[2][1] + 2 * k), 0, f(3.6 * k)), hand(f(aR[2][0]), f(aR[2][1] + 2 * k), 0, f(3.6 * k))
  ].join('');
}
// 往上燒的火焰（可旋轉），h 為高度
export function flame(x, y, h, deg = 0, outer = K.flame, inner = K.flameLight) {
  const d = (k) => `M${f(x - h * 0.28 * k)} ${y}C${f(x - h * 0.36 * k)} ${f(y - h * 0.42 * k)} ${f(x - h * 0.06 * k)} ${f(y - h * 0.56 * k)} ${x} ${f(y - h * k)}` +
    `C${f(x + h * 0.12 * k)} ${f(y - h * 0.6 * k)} ${f(x + h * 0.36 * k)} ${f(y - h * 0.42 * k)} ${f(x + h * 0.28 * k)} ${y}Q${x} ${f(y + h * 0.14 * k)} ${f(x - h * 0.28 * k)} ${y}Z`;
  const s = F(d(1), outer) + F(d(0.55), inner);
  return deg ? G(`rotate(${deg} ${x} ${y})`, s) : s;
}
// 側面的鞋，dir 1 鞋尖朝右
export const shoe = (x, y, dir, color) => F(`M${f(x - dir * 5)} ${y - 5}H${f(x + dir * 2)}C${f(x + dir * 8)} ${y - 4} ${f(x + dir * 11)} ${y - 1} ${f(x + dir * 11)} ${y + 1}H${f(x - dir * 6)}Z`, color);
// 鎖鏈：沿二次曲線排列的小鏈環
export function chainLinks(p0, c, p1, n, color = '#9a958c') {
  let s = '';
  for (let i = 0; i < n; i++) {
    const t = (i + 0.5) / n;
    const u = 1 - t;
    const x = f(u * u * p0[0] + 2 * u * t * c[0] + t * t * p1[0]);
    const y = f(u * u * p0[1] + 2 * u * t * c[1] + t * t * p1[1]);
    const ang = f(Math.atan2(2 * u * (c[1] - p0[1]) + 2 * t * (p1[1] - c[1]), 2 * u * (c[0] - p0[0]) + 2 * t * (p1[0] - c[0])) * 180 / Math.PI);
    s += i % 2
      ? L(`M${f(x - 2.8 * Math.cos(ang * Math.PI / 180))} ${f(y - 2.8 * Math.sin(ang * Math.PI / 180))}L${f(x + 2.8 * Math.cos(ang * Math.PI / 180))} ${f(y + 2.8 * Math.sin(ang * Math.PI / 180))}`, color, 1.6)
      : `<ellipse cx="${x}" cy="${y}" rx="3.6" ry="2.2" transform="rotate(${ang} ${x} ${y})" fill="none" stroke="${color}" stroke-width="1.3" class="dk-lim"/>`;
  }
  return s;
}

// 每張場景牌開始畫之前呼叫：漸層 id 以這張牌的 clipPath id 為前綴
export function beginScene(id) {
  sceneUid = id;
  gradSeq = 0;
}
