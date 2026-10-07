const deckSuitSymbols = {
  'Wands': '<path d="M0 -26 L0 26 M0 -12 L-9 -21 M0 -4 L9 -13"/><circle cx="0" cy="-26" r="2.5" fill="currentColor" stroke="none"/>',
  'Cups': '<path d="M-19 -24 L19 -24 C19 -2 8 6 0 6 C-8 6 -19 -2 -19 -24 M0 6 L0 24 M-14 24 L14 24"/>',
  'Swords': '<path d="M0 -28 L0 12 M-4 -19 L0 -28 L4 -19 M-13 12 L13 12 M0 12 L0 23"/><circle cx="0" cy="26.5" r="3.5"/>',
  'Pentacles': '<circle cx="0" cy="0" r="24"/><path d="M0 -17.6 L10.3 14.2 L-16.7 -5.4 L16.7 -5.4 L-10.3 14.2 Z"/>'
};
const deckRankIndex = { 'Ace': 1, 'Two': 2, 'Three': 3, 'Four': 4, 'Five': 5, 'Six': 6, 'Seven': 7, 'Eight': 8, 'Nine': 9, 'Ten': 10, 'Page': 11, 'Knight': 12, 'Queen': 13, 'King': 14 };
const deckPipGrid = {
  1: { s: 3.0, pts: [[150, 260]] },
  2: { s: 1.5, pts: [[150, 158], [150, 362]] },
  3: { s: 1.3, pts: [[150, 120], [150, 260], [150, 400]] },
  4: { s: 1.25, pts: [[105, 158], [195, 158], [105, 362], [195, 362]] },
  5: { s: 1.12, pts: [[105, 150], [195, 150], [150, 260], [105, 370], [195, 370]] },
  6: { s: 1.1, pts: [[105, 130], [195, 130], [105, 260], [195, 260], [105, 390], [195, 390]] },
  7: { s: 1.0, pts: [[105, 130], [195, 130], [82, 260], [150, 260], [218, 260], [105, 390], [195, 390]] },
  8: { s: 1.0, pts: [[105, 105], [195, 105], [105, 208], [195, 208], [105, 311], [195, 311], [105, 414], [195, 414]] },
  9: { s: 0.92, pts: [[82, 130], [150, 130], [218, 130], [82, 260], [150, 260], [218, 260], [82, 390], [150, 390], [218, 390]] },
  10: { s: 0.85, pts: [[105, 90], [195, 90], [105, 203], [195, 203], [105, 317], [195, 317], [105, 430], [195, 430], [150, 146], [150, 373]] }
};
const deckCourtCrowns = {
  'Page': '<path d="M128 146 L172 146 M166 146 C172 128 182 126 186 132"/>',
  'Knight': '<path d="M128 158 L172 158 M150 140 C168 112 188 118 190 136"/>',
  'Queen': '<path d="M126 140 L174 140 M126 140 Q134 112 142 138 Q150 110 158 138 Q166 112 174 140"/>',
  'King': '<path d="M124 140 L176 140 M124 140 L132 112 L142 136 L150 104 L158 136 L168 112 L176 140"/>'
};
function deckSymbolAt(suit, x, y, s) {
  return `<g transform="translate(${x} ${y}) scale(${s})" stroke-width="${(5 / s).toFixed(2)}">${deckSuitSymbols[suit]}</g>`;
}
function deckPipArt(suit, rank) {
  const grid = deckPipGrid[rank];
  if (!grid) return null;
  const pips = grid.pts.map(([x, y]) => deckSymbolAt(suit, x, y, grid.s)).join('');
  const rays = rank === 1
  ? '<path d="M221 189 L239 171 M79 189 L61 171 M79 331 L61 349 M221 331 L239 349"/>'
  : '';
  return pips + rays;
}
function deckCourtArt(suit, rankName) {
  const crown = deckCourtCrowns[rankName];
  if (!crown) return null;
  const robe = rankName === 'King'
  ? '<path d="M106 204 L194 204 L216 336 L84 336 Z"/>'
  : '<path d="M112 204 L188 204 L208 336 L92 336 Z"/>';
  return `<g transform="translate(0 36)">${crown}<circle cx="150" cy="164" r="24"/>${robe}${deckSymbolAt(suit, 150, 268, 0.85)}</g>`;
}
const deckMajorArt = {
  fool: '<circle cx="222" cy="96" r="18"/><path d="M248 96 L256 96 M240.4 77.6 L246 72 M222 70 L222 62 M203.6 77.6 L198 72 M196 96 L188 96 M203.6 114.4 L198 120 M222 122 L222 130 M240.4 114.4 L246 120"/><circle cx="150" cy="208" r="16"/><path d="M150 224 L146 286 M148 240 L120 262 M150 238 L190 206"/><circle cx="197" cy="199" r="11"/><path d="M186 209 L192 203"/><path d="M146 286 L166 340 L170 396 M146 286 L128 342 L120 398 M40 400 L200 400 L200 490 M212 486 L250 486 M200 428 L186 442 M200 454 L188 466"/><circle cx="94" cy="386" r="7"/><path d="M88 391 C79 384 68 388 59 399 M59 399 L49 390 M84 395 L86 404"/>',
  star: '<path d="M150 70 L150 230 M70 150 L230 150 M107 107 L193 193 M193 107 L107 193"/><circle cx="150" cy="150" r="11"/><path d="M62 76 L62 92 M54 84 L70 84 M238 76 L238 92 M230 84 L246 84 M56 208 L56 220 M50 214 L62 214 M244 208 L244 220 M238 214 L250 214"/><g transform="translate(129 347) rotate(-35)"><path d="M-16 -20 L16 -20 C16 -4 8 4 0 4 C-8 4 -16 -4 -16 -20 Z"/></g><path d="M104 340 C94 366 100 388 94 412 M64 436 Q94 424 124 436 T184 436 T236 436 M96 460 Q116 452 136 460"/>',
  moon: '<path fill="currentColor" stroke="none" fill-rule="evenodd" d="M102 132 a48 48 0 1 0 96 0 a48 48 0 1 0 -96 0 M128 132 a34 34 0 1 0 68 0 a34 34 0 1 0 -68 0"/><path d="M118 212 L118 224 M150 216 L150 228 M182 212 L182 224 M44 296 L94 296 M52 296 L52 402 M86 296 L86 402 M206 296 L256 296 M214 296 L214 402 M248 296 L248 402 M60 448 Q90 436 120 448 T180 448 T240 448"/>',
  sun: '<circle cx="150" cy="210" r="62"/><path d="M224 210 L254 210 M214.1 173 L227.9 165 M187 145.9 L202 119.9 M150 136 L150 120 M113 145.9 L98 119.9 M85.9 173 L72.1 165 M76 210 L46 210 M85.9 247 L72.1 255 M113 274.1 L98 300.1 M150 284 L150 300 M187 274.1 L202 300.1 M214.1 247 L227.9 255 M50 420 Q80 408 110 420 T170 420 T230 420 M70 450 Q100 440 130 450 T190 450"/>',
  tower: '<path d="M105 180 L105 420 M195 180 L195 420 M90 420 L210 420 M105 250 L195 250 M105 320 L195 320 M135 420 L135 382 A15 15 0 0 1 165 382 L165 420"/><path d="M116 174 C112 158 122 152 118 138 M150 172 C146 156 156 150 152 136 M184 174 C180 158 190 152 186 138"/><path d="M238 52 L192 118 L216 124 L166 196 M92 224 L76 250 M212 234 L228 260"/>',
  death: '<path d="M110 110 L186 430 M110 110 C168 72 232 86 258 136 M110 110 C166 88 220 98 244 128 M258 136 L244 128 M132 208 L154 194 M156 302 L178 288"/><g transform="translate(86 450) rotate(-12) scale(1.6)" stroke-width="3.13"><path d="M-20 0 L-13 -14 L-6 0 L0 -16 L6 0 L13 -14 L20 0 Z"/></g><path d="M56 454 L244 454 M188 454 A28 28 0 0 1 244 454 M216 416 L216 406 M196 424 L189 415 M236 424 L243 415"/>',
  magician: `<path d="M108 80 C108 58 142 58 150 80 C158 102 192 102 192 80 C192 58 158 58 150 80 C142 102 108 102 108 80 Z"/><circle cx="150" cy="126" r="4" fill="currentColor" stroke="none"/><path d="M150 130 L150 230"/><circle cx="150" cy="234" r="4" fill="currentColor" stroke="none"/><path d="M60 320 L240 320 M75 320 L75 400 M225 320 L225 400"/>${deckSymbolAt('Wands', 81, 294, 0.55)}${deckSymbolAt('Cups', 127, 294, 0.55)}${deckSymbolAt('Swords', 173, 294, 0.55)}${deckSymbolAt('Pentacles', 219, 294, 0.55)}`,
  high_priestess: '<path d="M62 100 L108 100 M70 100 L70 420 M100 100 L100 420 M62 420 L108 420 M192 100 L238 100 M200 100 L200 420 M230 100 L230 420 M192 420 L238 420"/><path fill="currentColor" stroke="none" fill-rule="evenodd" d="M122 140 a28 28 0 1 0 56 0 a28 28 0 1 0 -56 0 M138 140 a19 19 0 1 0 38 0 a19 19 0 1 0 -38 0"/><path d="M118 290 L182 290 L182 324 L118 324 Z M150 290 L150 324"/>',
  empress: '<circle cx="150" cy="190" r="46"/><path d="M150 236 L150 300 M120 268 L180 268"/><path d="M75 340 L75 470 M75 344 C74 336 79 332 85 335 M75 360 L68 349 M75 360 L82 349 M75 374 L68 363 M75 374 L82 363 M75 388 L68 377 M75 388 L82 377 M75 402 L68 391 M75 402 L82 391"/><path d="M225 340 L225 470 M225 344 C226 336 221 332 215 335 M225 360 L232 349 M225 360 L218 349 M225 374 L232 363 M225 374 L218 363 M225 388 L232 377 M225 388 L218 377 M225 402 L232 391 M225 402 L218 391"/><path d="M55 470 L245 470"/>',
  emperor: '<path d="M96 190 L110 130 L130 172 L150 118 L170 172 L190 130 L204 190 L96 190"/><path d="M100 240 L200 240 M100 240 L100 320 M200 240 L200 320 M85 320 L215 320 M100 320 L100 382 M200 320 L200 382 M80 382 L220 382"/><circle cx="150" cy="286" r="11"/><path d="M150 275 L150 263 M143 269 L157 269"/>',
  hierophant: '<path d="M70 200 A80 80 0 0 1 230 200 M70 200 L70 260 M230 200 L230 260"/><path d="M150 160 L150 400 M118 220 L182 220 M110 268 L190 268 M102 316 L198 316"/><path d="M110 420 L190 420 M95 448 L205 448"/>',
  lovers: '<circle cx="150" cy="100" r="20"/><path d="M178 100 L188 100 M169.8 80.2 L176.9 73.1 M150 72 L150 62 M130.2 80.2 L123.1 73.1 M122 100 L112 100 M130.2 119.8 L123.1 126.9 M150 128 L150 138 M169.8 119.8 L176.9 126.9"/><circle cx="105" cy="240" r="18"/><circle cx="195" cy="240" r="18"/><path d="M105 258 L105 350 M195 258 L195 350 M105 290 L146 312 M195 290 L154 312 M105 350 L88 420 M105 350 L120 420 M195 350 L180 420 M195 350 L212 420"/><path d="M150 322 C144 310 128 312 128 326 C128 340 150 352 150 352 C150 352 172 340 172 326 C172 312 156 310 150 322 Z" fill="currentColor" stroke="none"/>',
  chariot: '<path d="M90 220 L210 220 L210 330 L90 330 Z M90 220 L90 140 M210 220 L210 140 M80 140 A150 150 0 0 1 220 140"/><path d="M150 255 L163 275 L150 295 L137 275 Z M118 163 L123 170 L118 177 L113 170 Z M150 152 L155 160 L150 168 L145 160 Z M182 163 L187 170 L182 177 L177 170 Z"/><circle cx="105" cy="375" r="32"/><path d="M105 343 L105 407 M73 375 L137 375"/><circle cx="195" cy="375" r="32"/><path d="M195 343 L195 407 M163 375 L227 375"/><path d="M60 430 L240 430"/>',
  strength: '<path d="M108 110 C108 88 142 88 150 110 C158 132 192 132 192 110 C192 88 158 88 150 110 C142 132 108 132 108 110 Z"/><circle cx="150" cy="300" r="70"/><path d="M220 300 L232 300 M210.6 265 L221 259 M185 239.4 L191 229 M150 230 L150 218 M115 239.4 L109 229 M89.4 265 L79 259 M80 300 L68 300 M89.4 335 L79 341 M115 360.6 L109 371 M150 370 L150 382 M185 360.6 L191 371 M210.6 335 L221 341"/><circle cx="150" cy="300" r="42"/><path d="M124 270 L114 246 L142 259 M176 270 L186 246 L158 259"/><circle cx="135" cy="290" r="3.5" fill="currentColor" stroke="none"/><circle cx="165" cy="290" r="3.5" fill="currentColor" stroke="none"/><path d="M144 301 L156 301 L150 309 Z M150 309 L150 316 M150 316 Q143 323 137 318 M150 316 Q157 323 163 318 M128 305 L106 300 M128 312 L107 315 M172 305 L194 300 M172 312 L193 315"/>',
  hermit: '<path d="M200 104 L200 400 M200 104 C200 90 214 90 216 102 L216 122"/><path d="M204 126 L228 126 L224 168 L208 168 Z M216 136 L216 158 M206 147 L226 147"/><path d="M35 462 L115 352 L165 428 M135 462 L205 372 L262 442"/>',
  wheel_of_fortune: '<circle cx="150" cy="240" r="95"/><circle cx="150" cy="240" r="58"/><circle cx="150" cy="240" r="14"/><path d="M150 226 L150 182 M150 254 L150 298 M164 240 L208 240 M136 240 L92 240 M159.9 230.1 L191 199 M140.1 230.1 L109 199 M159.9 249.9 L191 281 M140.1 249.9 L109 281"/><path d="M150 145 L150 131 M245 240 L259 240 M150 335 L150 349 M55 240 L41 240"/>',
  justice: '<path d="M150 80 L150 300 M144 96 L150 80 L156 96 M122 300 L178 300 M150 300 L150 330"/><circle cx="150" cy="336" r="6"/><path d="M60 180 L240 180 M60 180 L44 240 M60 180 L76 240 M44 240 A16 16 0 0 0 76 240 M240 180 L224 240 M240 180 L256 240 M224 240 A16 16 0 0 0 256 240"/><path d="M80 430 L220 430"/>',
  hanged_man: '<path d="M70 90 L230 90 M150 90 L150 118"/><path d="M150 118 L150 212 M150 212 L188 196 L164 152 M150 212 L150 300 M150 288 L116 322 M150 288 L184 322"/><circle cx="150" cy="334" r="17"/><path d="M138 362 L132 373 M150 367 L150 378 M162 362 L168 373"/>',
  temperance: `<g transform="translate(100 160) rotate(35) scale(1.1)" stroke-width="4.55">${deckSuitSymbols['Cups']}</g><g transform="translate(200 310) scale(1.1)" stroke-width="4.55">${deckSuitSymbols['Cups']}</g><path d="M132 150 C160 191 168 243 196 284"/><circle cx="222" cy="100" r="20"/><path d="M222 88 L209 111 L235 111 Z"/><path d="M50 420 L250 420 M60 450 Q90 440 120 450 T180 450 T240 450"/>`,
  devil: `<g transform="translate(150 170) rotate(180) scale(2.1)" stroke-width="2.38">${deckSuitSymbols['Pentacles']}</g><path d="M108 130 C100 112 104 100 116 94 M192 130 C200 112 196 100 184 94"/><circle cx="150" cy="240" r="12"/><circle cx="150" cy="266" r="12"/><path d="M141 274 L100 384 M159 274 L204 384"/><circle cx="95" cy="400" r="18"/><circle cx="205" cy="400" r="18"/><path d="M95 418 L95 440 M205 418 L205 440 M60 440 L240 440"/>`,
  judgement: '<path d="M48 118 A22 22 0 0 1 92 106 A26 26 0 0 1 144 110 A18 18 0 0 1 168 124"/><path d="M118 124 L196 178 L240 187 M116 132 L194 186 L216 223 M240 187 A26 26 0 0 1 216 223"/><circle cx="112" cy="120" r="5"/><path d="M240 222 L258 236 M232 244 L246 262 M220 258 L230 278"/><circle cx="150" cy="360" r="15"/><path d="M150 375 L150 420 M150 385 L124 356 M150 385 L176 356 M105 445 L195 445 M105 445 L105 472 M195 445 L195 472"/>',
  world: `<ellipse cx="150" cy="250" rx="85" ry="140"/><ellipse cx="150" cy="250" rx="70" ry="124"/><circle cx="150" cy="190" r="13"/><path d="M150 203 L150 280 M150 215 L122 192 M150 215 L178 192 M150 280 L130 330 M150 280 L172 326"/>${deckSymbolAt('Wands', 55, 70, 0.6)}${deckSymbolAt('Cups', 245, 70, 0.6)}${deckSymbolAt('Swords', 55, 430, 0.6)}${deckSymbolAt('Pentacles', 245, 430, 0.6)}`
};
export function getCardArt(card, extraClass = '') {
  if (!card || !card.suit) return null;
  let inner = null;
  if (card.suit === 'Major Arcana') {
    inner = deckMajorArt[card.nameKey] || null;
  } else if (deckSuitSymbols[card.suit] && deckRankIndex[card.number]) {
    const rank = deckRankIndex[card.number];
    inner = rank <= 10 ? deckPipArt(card.suit, rank) : deckCourtArt(card.suit, card.number);
  }
  if (!inner) return null;
  return `<svg class="card-image line-art${extraClass ? ' ' + extraClass : ''}" viewBox="0 0 300 519" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;
}
