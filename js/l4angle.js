/* Level 4 · Unit 5  角：量角器、量角、画角、转动与八方位 讲解动画 + 题型 */
(function () {
  const line = t => `<div class="expand-line">${t}</div>`;
  const wrap = (...parts) => `<div class="l1wrap">${parts.join('')}</div>`;
  const $ = (sel, el) => (el || document).querySelector(sel);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const rad = d => -d * Math.PI / 180;
  const P = (cx, cy, r, d) => [cx + r * Math.cos(rad(d)), cy + r * Math.sin(rad(d))];
  const INK = '#2b2b3a', OR = '#ff7f2a';

  /* 量角器（原点在 (0,0)，底线沿 +x，半圆在上方）R 半径；o.rays=[{deg,color,label}]（deg 从右边底线逆时针），o.mark 高亮刻度 */
  function protGroup(R, o = {}) {
    let s = `<path d="M${-R - 12} 0 H${R + 12} A${R + 12} ${R + 12} 0 0 0 ${-R - 12} 0 Z" fill="#fff" fill-opacity=".92" stroke="${INK}" stroke-width="1.5"/><circle cx="0" cy="0" r="${R * 0.22}" fill="none" stroke="${INK}" stroke-width="1.2"/><path d="M${-R * 0.22} 0 H${R * 0.22}" stroke="${INK}" stroke-width="1.2"/><line x1="${-R - 12}" y1="0" x2="${R + 12}" y2="0" stroke="${INK}" stroke-width="1.5"/>`;
    for (let d = 0; d <= 180; d++) { const len = d % 10 === 0 ? 14 : d % 5 === 0 ? 9 : 5; const [x1, y1] = P(0, 0, R, d), [x2, y2] = P(0, 0, R - len, d); const hl = o.mark !== undefined && d === o.mark; s += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${hl ? OR : INK}" stroke-width="${hl ? 2.5 : d % 10 === 0 ? 1.2 : 0.7}"/>`; if (d % 10 === 0) { const [lx, ly] = P(0, 0, R - (o.small ? 20 : 24), d); s += `<text x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" font-size="${o.small ? 8.5 : 11}" font-weight="700" fill="${hl ? OR : INK}" text-anchor="middle" dominant-baseline="middle" transform="rotate(${90 - d} ${lx.toFixed(1)} ${ly.toFixed(1)})">${d}</text>`; const [ix, iy] = P(0, 0, R - (o.small ? 36 : 46), d); s += `<text x="${ix.toFixed(1)}" y="${iy.toFixed(1)}" font-size="${o.small ? 7 : 9}" fill="${hl ? OR : '#666'}" text-anchor="middle" dominant-baseline="middle" transform="rotate(${90 - d} ${ix.toFixed(1)} ${iy.toFixed(1)})">${180 - d}</text>`; if (d % 10 === 0 && d > 0 && d < 180) { const [sx, sy] = P(0, 0, R - 52, d), [ex, ey] = P(0, 0, R * 0.24, d); s += `<line x1="${sx.toFixed(1)}" y1="${sy.toFixed(1)}" x2="${ex.toFixed(1)}" y2="${ey.toFixed(1)}" stroke="#aaa" stroke-width=".7"/>`; } } }
    s += `<text x="0" y="${-R + (o.small ? 19 : 22)}" font-size="${o.small ? 14 : 18}" font-weight="800" fill="${INK}" text-anchor="middle">90</text>`;
    return s;
  }
  /* 完整量角器 SVG（独立显示，底线水平）o.rays, o.labels{left,center,right}, o.mark, o.live */
  function protractor(o = {}) {
    const R = 170, W = 420, H = 232, cx = 210, cy = 200;
    let rays = (o.rays || []).map(r => { const [x, y] = P(cx, cy, R + 36, r.deg); return `<line x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="${r.color || OR}" stroke-width="2.5" stroke-linecap="round"/>${r.label ? `<text x="${P(cx, cy, R + 50, r.deg)[0].toFixed(1)}" y="${(P(cx, cy, R + 50, r.deg)[1] + 5).toFixed(1)}" font-size="16" font-weight="700" fill="${INK}" text-anchor="middle">${esc(r.label)}</text>` : ''}`; }).join('');
    const lab = o.labels || {};
    const base = `<line x1="${cx - R - 30}" y1="${cy}" x2="${cx + R + 30}" y2="${cy}" stroke="${INK}" stroke-width="2"/>${lab.left ? `<text x="${cx - R - 20}" y="${cy + 22}" font-size="16" font-weight="700" fill="${INK}" text-anchor="middle">${lab.left}</text>` : ''}${lab.center ? `<text x="${cx}" y="${cy + 24}" font-size="16" font-weight="700" fill="${INK}" text-anchor="middle">${lab.center}</text>` : ''}${lab.right ? `<text x="${cx + R + 20}" y="${cy + 22}" font-size="16" font-weight="700" fill="${INK}" text-anchor="middle">${lab.right}</text>` : ''}`;
    return `<svg class="prot ${o.live ? 'live' : ''}" viewBox="0 0 ${W} ${H}" width="${o.w || 420}" style="max-width:100%;height:auto;overflow:visible"><g transform="translate(${cx} ${cy})">${protGroup(R, { mark: o.mark })}</g>${base}${rays}<circle cx="${cx}" cy="${cy}" r="3" fill="${INK}"/></svg>`;
  }
  /* 角的图：rays=[{deg,label}] 顶点标签 o.vertex, 小写字母 o.letter 放在角里；o.prot 叠加量角器 {base, flip} */
  function angleFig(rays, o = {}) {
    const W = 300, H = 230, cx = o.cx !== undefined ? o.cx : 120, cy = o.cy !== undefined ? o.cy : 150, L = 120;
    let s = '';
    if (o.prot) { const b = o.prot.base, below = o.prot.below; s += `<g transform="translate(${cx} ${cy}) rotate(${below ? 180 - b : -b})" opacity=".95">${protGroup(110, { mark: o.prot.mark, small: true })}</g>`; }
    rays.forEach(r => { const [x, y] = P(cx, cy, L, r.deg); s += `<line x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="${r.color || INK}" stroke-width="2.5" stroke-linecap="round"/>`; if (r.label) { const [lx, ly] = P(cx, cy, L + 14, r.deg); s += `<text x="${lx.toFixed(1)}" y="${(ly + 5).toFixed(1)}" font-size="16" font-weight="700" fill="${INK}" text-anchor="middle">${esc(r.label)}</text>`; } });
    if (rays.length === 2 && !o.noArc) { const a = rays[0].deg, d = ((rays[1].deg - a) % 360 + 360) % 360, ra = 22; const [ax, ay] = P(cx, cy, ra, a), [bx, by] = P(cx, cy, ra, a + d); s += d === 90 ? `<path d="M${P(cx, cy, 14, a)} L${cx + (P(cx, cy, 14, a)[0] - cx) + (P(cx, cy, 14, a + 90)[0] - cx)} ${cy + (P(cx, cy, 14, a)[1] - cy) + (P(cx, cy, 14, a + 90)[1] - cy)} L${P(cx, cy, 14, a + 90)}" fill="none" stroke="${INK}" stroke-width="1.5"/>` : `<path d="M${ax.toFixed(1)} ${ay.toFixed(1)} A${ra} ${ra} 0 ${d > 180 ? 1 : 0} 0 ${bx.toFixed(1)} ${by.toFixed(1)}" fill="none" stroke="${o.arcColor || INK}" stroke-width="1.6"/>`; if (o.letter) { const [mx, my] = P(cx, cy, 36, a + d / 2); s += `<text x="${mx.toFixed(1)}" y="${(my + 5).toFixed(1)}" font-size="15" font-style="italic" fill="${INK}" text-anchor="middle">${o.letter}</text>`; } }
    if (o.vertex) { const away = rays.reduce((acc, r) => acc + r.deg, 0) / rays.length + 180; const [vx, vy] = P(cx, cy, 18, away); s += `<text x="${vx.toFixed(1)}" y="${(vy + 5).toFixed(1)}" font-size="16" font-weight="700" fill="${INK}" text-anchor="middle">${o.vertex}</text>`; }
    return `<svg viewBox="${o.vb || `0 0 ${W} ${H}`}" width="${o.w || W}" style="max-width:100%;height:auto;overflow:visible">${s}</svg>`;
  }
  /* 多边形（带顶点字母和角内小写字母）pts:[{x,y,name}], angles:[{i, letter, from?:i, to?:i}] , extra segs */
  function polyFig(pts, o = {}) {
    const segs = o.segs || pts.map((_, i) => [i, (i + 1) % pts.length]);
    let s = segs.map(([a, b]) => `<line x1="${pts[a].x}" y1="${pts[a].y}" x2="${pts[b].x}" y2="${pts[b].y}" stroke="${INK}" stroke-width="2"/>`).join('');
    const cx = pts.reduce((a, p) => a + p.x, 0) / pts.length, cy = pts.reduce((a, p) => a + p.y, 0) / pts.length;
    pts.forEach(p => { const dx = p.x - cx, dy = p.y - cy, n = Math.hypot(dx, dy) || 1; s += `<text x="${p.x + dx / n * 16}" y="${p.y + dy / n * 16 + 5}" font-size="15" font-weight="700" fill="${INK}" text-anchor="middle">${p.name}</text>`; });
    (o.angles || []).forEach(a => { const v = pts[a.i], p1 = pts[a.from], p2 = pts[a.to]; const d1 = Math.atan2(-(p1.y - v.y), p1.x - v.x) * 180 / Math.PI, d2 = Math.atan2(-(p2.y - v.y), p2.x - v.x) * 180 / Math.PI; let dd = ((d2 - d1) % 360 + 360) % 360; const hl = o.hl === a.letter; const [ax, ay] = P(v.x, v.y, 14, d1), [bx, by] = P(v.x, v.y, 14, d2); s += `<path d="M${ax.toFixed(1)} ${ay.toFixed(1)} A14 14 0 ${dd > 180 ? 1 : 0} 0 ${bx.toFixed(1)} ${by.toFixed(1)}" fill="none" stroke="${hl ? OR : INK}" stroke-width="${hl ? 2.5 : 1.3}"/>`; const [mx, my] = P(v.x, v.y, 26, d1 + dd / 2); s += `<text x="${mx.toFixed(1)}" y="${(my + 4).toFixed(1)}" font-size="13" font-style="italic" fill="${hl ? OR : INK}" text-anchor="middle" font-weight="${hl ? 800 : 400}">${a.letter}</text>`; });
    return `<svg viewBox="${o.vb || '0 0 220 200'}" width="${o.w || 220}" style="max-width:100%;height:auto;overflow:visible">${s}</svg>`;
  }
  /* 八方位罗盘 o.hl 方向名，o.arrow 起止 {from,to,cw} */
  const DIRS = ['north', 'north-east', 'east', 'south-east', 'south', 'south-west', 'west', 'north-west'];
  const DZH = { north: '北', 'north-east': '东北', east: '东', 'south-east': '东南', south: '南', 'south-west': '西南', west: '西', 'north-west': '西北' };
  const ABBR = { north: 'N', 'north-east': 'NE', east: 'E', 'south-east': 'SE', south: 'S', 'south-west': 'SW', west: 'W', 'north-west': 'NW' };
  const dirDeg = d => 90 - DIRS.indexOf(d) * 45;   // 数学角（逆时针，东=0）
  function compass(o = {}) {
    const cx = 120, cy = 120, R = 90;
    let s = '';
    DIRS.forEach((d, i) => { const deg = dirDeg(d), [x, y] = P(cx, cy, R, deg), [lx, ly] = P(cx, cy, R + 20, deg); const main = i % 2 === 0, hl = o.hl === d; s += `<line x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="${hl ? OR : main ? INK : '#888'}" stroke-width="${hl ? 4 : main ? 2.5 : 1.5}" stroke-linecap="round"/><text x="${lx.toFixed(1)}" y="${(ly + 5).toFixed(1)}" font-size="${main ? 15 : 12}" font-weight="700" fill="${hl ? OR : INK}" text-anchor="middle">${o.names && o.names[d] ? esc(o.names[d]) : ABBR[d]}</text>`; });
    if (o.arrow) { const a = dirDeg(o.arrow.from), b = dirDeg(o.arrow.to), cw = o.arrow.cw; let sweep = cw ? ((a - b) % 360 + 360) % 360 : ((b - a) % 360 + 360) % 360; const r = 48, [x1, y1] = P(cx, cy, r, a), [x2, y2] = P(cx, cy, r, b); s += `<path d="M${x1.toFixed(1)} ${y1.toFixed(1)} A${r} ${r} 0 ${sweep > 180 ? 1 : 0} ${cw ? 1 : 0} ${x2.toFixed(1)} ${y2.toFixed(1)}" fill="none" stroke="#6c5ce7" stroke-width="3" marker-end="url(#arr)"/><text x="${cx}" y="${cy + 5}" font-size="14" font-weight="800" fill="#6c5ce7" text-anchor="middle">${sweep}°</text>`; }
    return `<svg viewBox="0 0 240 240" width="${o.w || 240}" style="max-width:100%;height:auto;overflow:visible"><defs><marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="#6c5ce7"/></marker></defs><circle cx="${cx}" cy="${cy}" r="${R}" fill="#fbfaff" stroke="#ddd"/>${s}<circle cx="${cx}" cy="${cy}" r="4" fill="${INK}"/></svg>`;
  }
  const dirOf = (from, to) => { const dx = to.x - from.x, dy = from.y - to.y; const ang = Math.atan2(dy, dx) * 180 / Math.PI; return DIRS[((Math.round((90 - ang) / 45) % 8) + 8) % 8]; };
  const turnTo = (from, deg, cw) => DIRS[(((DIRS.indexOf(from) + (cw ? 1 : -1) * deg / 45) % 8) + 8) % 8];
  /* 网格图 cols×rows，items [{x,y,shape}] o.hl=[names], o.arrow=[a,b] */
  const SHAPES = { rectangle: (x, y) => `<rect x="${x - 26}" y="${y - 18}" width="22" height="12" fill="#fff" stroke="${INK}" stroke-width="1.5"/>`, circle: (x, y) => `<circle cx="${x - 12}" cy="${y - 12}" r="9" fill="#fff" stroke="${INK}" stroke-width="1.5"/>`, square: (x, y) => `<rect x="${x - 22}" y="${y - 22}" width="14" height="14" fill="#fff" stroke="${INK}" stroke-width="1.5"/>`, triangle: (x, y) => `<polygon points="${x - 20},${y - 4} ${x - 11},${y - 20} ${x - 2},${y - 4}" fill="#fff" stroke="${INK}" stroke-width="1.5"/>`, star: (x, y) => `<text x="${x - 12}" y="${y - 6}" font-size="22" text-anchor="middle" fill="${INK}">☆</text>`, cross: (x, y) => `<text x="${x - 12}" y="${y - 4}" font-size="22" text-anchor="middle" fill="${INK}">⊠</text>`, semicircle: (x, y) => `<path d="M${x - 22} ${y - 4} A10 10 0 0 1 ${x - 2} ${y - 4} Z" fill="#fff" stroke="${INK}" stroke-width="1.5"/>` };
  function gridMap(items, o = {}) {
    const cols = o.cols || 7, rows = o.rows || 7, u = 34, x0 = 20, y0 = 20;
    let s = '';
    for (let i = 0; i <= cols; i++) s += `<line x1="${x0 + i * u}" y1="${y0}" x2="${x0 + i * u}" y2="${y0 + rows * u}" stroke="#999" stroke-width="1"/>`;
    for (let j = 0; j <= rows; j++) s += `<line x1="${x0}" y1="${y0 + j * u}" x2="${x0 + cols * u}" y2="${y0 + j * u}" stroke="#999" stroke-width="1"/>`;
    const pos = it => [x0 + it.x * u, y0 + it.y * u];
    items.forEach(it => { const [x, y] = pos(it); const hl = (o.hl || []).includes(it.shape); s += SHAPES[it.shape](x, y) + `<circle cx="${x}" cy="${y}" r="${hl ? 5 : 3.5}" fill="${hl ? OR : INK}"/>`; });
    if (o.arrow) { const a = items.find(i => i.shape === o.arrow[0]), b = items.find(i => i.shape === o.arrow[1]); const [x1, y1] = pos(a), [x2, y2] = pos(b); s += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#6c5ce7" stroke-width="3" marker-end="url(#arr2)"/>`; }
    const nx = x0 + cols * u + 40, ny = y0 + rows * u / 2;
    s += `<line x1="${nx}" y1="${ny + 30}" x2="${nx}" y2="${ny - 30}" stroke="${INK}" stroke-width="2" marker-end="url(#arrN)"/><line x1="${nx - 16}" y1="${ny}" x2="${nx + 16}" y2="${ny}" stroke="${INK}" stroke-width="1.5"/><text x="${nx}" y="${ny - 36}" font-size="14" font-weight="700" text-anchor="middle" fill="${INK}">N</text>`;
    return `<svg viewBox="0 0 ${x0 + cols * u + 80} ${y0 * 2 + rows * u}" width="${o.w || 330}" style="max-width:100%;height:auto"><defs><marker id="arr2" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="#6c5ce7"/></marker><marker id="arrN" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="${INK}"/></marker></defs>${s}</svg>`;
  }
  /* 棋盘 pieces [{x,y,g,name}] */
  function chess(pieces, o = {}) {
    const u = 30, x0 = 20, y0 = 10;
    let s = '';
    for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) s += `<rect x="${x0 + c * u}" y="${y0 + r * u}" width="${u}" height="${u}" fill="${(r + c) % 2 ? '#c9c9c9' : '#fff'}"/>`;
    s += `<rect x="${x0}" y="${y0}" width="${8 * u}" height="${8 * u}" fill="none" stroke="${INK}" stroke-width="1.5"/>`;
    pieces.forEach(p => { const hl = (o.hl || []).includes(p.name); const x = x0 + p.x * u + u / 2, y = y0 + p.y * u + u / 2; if (hl) s += `<circle cx="${x}" cy="${y}" r="14" fill="#fff3d6" stroke="${OR}" stroke-width="2.5"/>`; s += `<text x="${x}" y="${y + 9}" font-size="24" text-anchor="middle">${p.g}</text>${p.num ? `<text x="${x + 9}" y="${y + 11}" font-size="10" font-weight="800" fill="${p.g.charCodeAt(0) >= 0x265a ? '#fff' : INK}" stroke="${p.g.charCodeAt(0) >= 0x265a ? INK : '#fff'}" stroke-width=".4" text-anchor="middle">${p.num}</text>` : ''}`; });
    if (o.arrow) { const a = pieces.find(p => p.name === o.arrow[0]), b = pieces.find(p => p.name === o.arrow[1]); s += `<line x1="${x0 + a.x * u + u / 2}" y1="${y0 + a.y * u + u / 2}" x2="${x0 + b.x * u + u / 2}" y2="${y0 + b.y * u + u / 2}" stroke="#6c5ce7" stroke-width="3" marker-end="url(#arr3)"/>`; }
    const nx = 290, ny = 130;
    s += `<line x1="${nx}" y1="${ny + 30}" x2="${nx}" y2="${ny - 30}" stroke="${INK}" stroke-width="2"/><line x1="${nx - 14}" y1="${ny}" x2="${nx + 14}" y2="${ny}" stroke="${INK}" stroke-width="1.5"/><text x="${nx}" y="${ny - 36}" font-size="14" font-weight="700" text-anchor="middle" fill="${INK}">N</text><polygon points="${nx},${ny - 32} ${nx - 4},${ny - 24} ${nx + 4},${ny - 24}" fill="${INK}"/>`;
    return `<svg viewBox="0 0 320 260" width="${o.w || 320}" style="max-width:100%;height:auto"><defs><marker id="arr3" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="#6c5ce7"/></marker></defs>${s}</svg>`;
  }
  /* 8 个小镇围着 M */
  function towns(o = {}) {
    const names = { north: 'A', 'north-east': 'B', east: 'C', 'south-east': 'D', south: 'E', 'south-west': 'F', west: 'G', 'north-west': 'H' };
    const cx = 120, cy = 120, R = 85; let s = '';
    DIRS.forEach(d => { const [x, y] = P(cx, cy, R, dirDeg(d)); const hl = o.hl === names[d]; s += `<line x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="${hl ? OR : INK}" stroke-width="${hl ? 3.5 : 1.5}"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="12" fill="${hl ? '#fff3d6' : '#fff'}" stroke="${hl ? OR : INK}" stroke-width="${hl ? 2.5 : 1.5}"/><text x="${x.toFixed(1)}" y="${(y + 5).toFixed(1)}" font-size="13" font-weight="700" text-anchor="middle" fill="${INK}">${names[d]}</text>`; });
    if (o.arrow) { const a = dirDeg(o.arrow.from) + 180, b = dirDeg(o.arrow.to), cw = o.arrow.cw; const sweep = cw ? ((a - b) % 360 + 360) % 360 : ((b - a) % 360 + 360) % 360; const r = 40, [x1, y1] = P(cx, cy, r, a), [x2, y2] = P(cx, cy, r, b); s += `<line x1="${cx}" y1="${cy}" x2="${P(cx, cy, 55, a)[0].toFixed(1)}" y2="${P(cx, cy, 55, a)[1].toFixed(1)}" stroke="#6c5ce7" stroke-width="3" stroke-dasharray="5 3"/><path d="M${x1.toFixed(1)} ${y1.toFixed(1)} A${r} ${r} 0 ${sweep > 180 ? 1 : 0} ${cw ? 1 : 0} ${x2.toFixed(1)} ${y2.toFixed(1)}" fill="none" stroke="#6c5ce7" stroke-width="3" marker-end="url(#arr4)"/>`; }
    s += `<circle cx="${cx}" cy="${cy}" r="14" fill="#fff" stroke="${INK}" stroke-width="1.5"/><text x="${cx}" y="${cy + 5}" font-size="13" font-weight="700" text-anchor="middle" fill="${INK}">M</text>`;
    return `<svg viewBox="0 0 240 240" width="${o.w || 240}" style="max-width:100%;height:auto"><defs><marker id="arr4" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="#6c5ce7"/></marker></defs>${s}</svg>`;
  }

  const S = window.StepKinds;
  /* l4angname：{a, v, b} 三个字母 */
  S.l4angname = ({ a, v, b, fig }) => [
    { zh: `角由两条边和一个<b>顶点</b>组成。这个角的顶点是 <b>${v}</b>，两条边分别经过 ${a} 和 ${b}。`, en: `The vertex is ${v}. The arms pass through ${a} and ${b}.`, render: s => { s.innerHTML = wrap(`<div class="center">${fig}</div>`); } },
    { zh: `给角起名：<b>顶点字母放中间</b>，两边的字母放两头，前面写 ∠。所以可以叫 <b>∠${a}${v}${b}</b>，也可以叫 <b>∠${b}${v}${a}</b>。`, en: `The vertex letter goes in the middle: ∠${a}${v}${b} or ∠${b}${v}${a}.`, render: s => { s.innerHTML = wrap(`<div class="center">${fig}</div>`, line(`∠${a}${v}${b} = ∠${b}${v}${a}`)); } },
  ];
  /* l4angletter：{name, letter, fig(hl)} */
  S.l4angletter = ({ name, letter, fig, figHl }) => [
    { zh: `∠${name}：中间的字母 <b>${name[1]}</b> 是顶点，角的两条边从 ${name[1]} 出发，分别指向 ${name[0]} 和 ${name[2]}。`, en: `The middle letter ${name[1]} is the vertex.`, render: s => { s.innerHTML = wrap(`<div class="center">${fig}</div>`); } },
    { zh: `在图上找顶点 ${name[1]}，夹在 ${name[1]}${name[0]} 和 ${name[1]}${name[2]} 两条边之间的那个角，标的小写字母是 <b>${letter}</b>。所以 ∠${name} = ∠${letter}。`, en: `∠${name} = ∠${letter}.`, render: s => { s.innerHTML = wrap(`<div class="center">${figHl}</div>`, line(`∠${name} = ∠${letter}`)); } },
  ];
  /* l4letterang：{letter, v, a, b, fig, figHl} 小写字母 → 三字母名 */
  S.l4letterang = ({ letter, v, a, b, fig, figHl }) => [
    { zh: `先找 ∠${letter} 在哪个顶点：它在顶点 <b>${v}</b> 上，两条边从 ${v} 指向 ${a} 和 ${b}。`, en: `∠${letter} is at vertex ${v}, between ${v}${a} and ${v}${b}.`, render: s => { s.innerHTML = wrap(`<div class="center">${figHl}</div>`); } },
    { zh: `顶点字母 ${v} 写中间：∠${letter} = <b>∠${a}${v}${b}</b>（或 ∠${b}${v}${a}）。`, en: `∠${letter} = ∠${a}${v}${b} or ∠${b}${v}${a}.`, render: s => { s.innerHTML = wrap(`<div class="center">${figHl}</div>`, line(`∠${letter} = ∠${a}${v}${b}`)); } },
  ];
  /* l4readprot：{deg, side:'right'|'left', labels} deg 为答案 */
  S.l4readprot = ({ deg, side, labels }) => {
    const rd = side === 'right' ? deg : 180 - deg; const lab = side === 'right' ? { center: labels[1], right: labels[0] } : { center: labels[1], left: labels[0] };
    return [
      { zh: `量角器有<b>两圈刻度</b>：外圈从右边的 0 数到左边的 180，内圈从左边的 0 数到右边的 180。读角要<b>从底线开始</b>，看底线那条边压在哪个 0 上。`, en: 'Angles are read from the base line. Find which scale starts at 0 on the base arm.', render: s => { s.innerHTML = wrap(`<div class="center">${protractor({ rays: [{ deg: rd, label: labels[2] }], labels: lab })}</div>`); } },
      { zh: `底线上的边指向<b>${side === 'right' ? '右' : '左'}边</b>，${side === 'right' ? '外圈' : '内圈'}的 0 在${side === 'right' ? '右' : '左'}边，所以要读<b>${side === 'right' ? '外圈' : '内圈'}</b>。`, en: `The base arm points ${side}, so read the ${side === 'right' ? 'outer' : 'inner'} scale.`, render: s => { s.innerHTML = wrap(`<div class="center">${protractor({ rays: [{ deg: rd, label: labels[2] }], labels: lab, mark: 0 })}</div>`, line(side === 'right' ? '外圈 outer scale' : '内圈 inner scale')); } },
      { zh: `另一条边 ${labels[1]}${labels[2]} 穿过${side === 'right' ? '外' : '内'}圈的 <b>${deg}</b>，所以 ∠${labels.join('')} = <b>${deg}°</b>。`, en: `∠${labels.join('')} = ${deg}°.`, render: s => { s.innerHTML = wrap(`<div class="center">${protractor({ rays: [{ deg: rd, label: labels[2] }], labels: lab, mark: rd })}</div>`, line(`∠${labels.join('')} = ${deg}°`)); } },
    ];
  };
  /* l4estmeas：{rays, deg, letter?, name?} 估计 + 量 */
  S.l4estmeas = ({ rays, deg, letter, name, vertex }) => {
    const b = rays[0].deg, o2 = rays[1].deg, d = ((o2 - b) % 360 + 360) % 360, below = d > 180;
    const base = Math.abs(Math.sin(rad(b))) <= Math.abs(Math.sin(rad(o2))) ? b : o2; const other = base === b ? o2 : b; const dd = ((other - base) % 360 + 360) % 360, bel = dd > 180;
    const scale = bel ? '内圈' : '外圈';
    const ttl = name ? `∠${name}` : `∠${letter}`;
    const est = deg < 45 ? '比直角的一半还小' : deg < 90 ? '比直角小一点' : deg === 90 ? '正好像直角' : deg < 135 ? '比直角大一点' : '接近平角（180°）';
    return [
      { zh: `先<b>估一估</b>：和直角（90°）比一比。这个角${est}，大约 <b>${Math.round(deg / 10) * 10}°</b>（估的值差不多就行）。`, en: `Estimate: compare with a right angle. About ${Math.round(deg / 10) * 10}°.`, render: s => { s.innerHTML = wrap(`<div class="center">${angleFig(rays, { letter, vertex, w: 260 })}</div>`, line(`估计 ≈ ${Math.round(deg / 10) * 10}°`)); } },
      { zh: `再<b>用量角器量</b>：量角器的中心对准顶点，底线和一条边重合，另一条边压住刻度。`, en: 'Put the centre on the vertex and the base line along one arm.', render: s => { s.innerHTML = wrap(`<div class="center">${angleFig(rays, { letter, vertex, w: 420, prot: { base, below: bel } })}</div>`); } },
      { zh: `底线那条边压着${scale}的 0，所以读<b>${scale}</b>：另一条边指着 <b>${deg}</b>。${ttl} = <b>${deg}°</b>。`, en: `${ttl} = ${deg}°.`, render: s => { s.innerHTML = wrap(`<div class="center">${angleFig(rays, { letter, vertex, w: 420, prot: { base, below: bel, mark: bel ? 180 - deg : deg } })}</div>`, line(`${ttl} = ${deg}°`)); } },
    ];
  };
  /* l4drawprot：{deg} */
  S.l4drawprot = ({ deg }) => [
    { zh: `画 ${deg}° 的角：先画一条<b>底线</b>，把量角器的中心对准顶点，底线和量角器的 0 线重合。`, en: 'Draw the base line. Put the centre on the vertex.', render: s => { s.innerHTML = wrap(`<div class="center">${protractor({ rays: [{ deg: 0 }] })}</div>`); } },
    { zh: `底线的边在右边，用<b>外圈</b>从 0 开始数到 <b>${deg}</b>，在那里点一个点。${deg > 90 ? '（超过 90 是钝角，点在左半边）' : deg < 90 ? '（不到 90 是锐角，点在右半边）' : '（正好 90 是直角，点在正上方）'}`, en: `Find ${deg} on the outer scale and mark a dot.`, render: s => { s.innerHTML = wrap(`<div class="center">${protractor({ rays: [{ deg: 0 }], mark: deg })}</div>`); } },
    { zh: `从顶点向那个点画一条直线，这就是 <b>${deg}°</b> 的角。`, en: `Join the vertex to the dot: ${deg}°.`, render: s => { s.innerHTML = wrap(`<div class="center">${protractor({ rays: [{ deg: 0 }, { deg }], mark: deg })}</div>`, line(`${deg}°`)); } },
  ];
  /* l4turn：{frac} 转动与直角 */
  const TURNS = [['quarter', '1/4 圈（quarter-turn）', 1, 90], ['half', '1/2 圈（half-turn）', 2, 180], ['three-quarter', '3/4 圈（three-quarter-turn）', 3, 270], ['complete', '一整圈（complete turn）', 4, 360]];
  S.l4turn = ({ hl }) => [
    { zh: `转一整圈是 <b>360°</b>，也就是 <b>4 个直角</b>（每个直角 90°）。`, en: 'A complete turn is 360° = 4 right angles.', render: s => { s.innerHTML = wrap(`<div class="center">${compass({ arrow: { from: 'north', to: 'north', cw: true } }).replace('0°', '360°')}</div>`); } },
    { zh: `所以：${TURNS.map(t => `<b>${t[0] === 'complete' ? '一整圈' : t[0] + '-turn'}</b> = ${t[2]} 个直角 = ${t[3]}°`).join('；')}。`, en: 'quarter = 90°, half = 180°, three-quarter = 270°, complete = 360°.', render: s => { s.innerHTML = wrap(`<div class="center"><table class="pv4"><tr><th>转动 turn</th><th>直角 right angles</th><th>度 degrees</th></tr>${TURNS.map(t => `<tr ${hl === t[0] ? 'style="background:#fff3d6"' : ''}><td style="font-size:17px">${t[1]}</td><td>${t[2]}</td><td>${t[3]}°</td></tr>`).join('')}</table></div>`); } },
  ];
  /* l4compass：{name, dir} */
  S.l4compass = ({ name, dir, names }) => [
    { zh: `八方位罗盘：上北（N）下南（S）左西（W）右东（E），中间四个斜的方向是<b>东北、东南、西南、西北</b>（先说南北再说东西：north-east、south-west……）。`, en: 'N, NE, E, SE, S, SW, W, NW.', render: s => { s.innerHTML = wrap(`<div class="center">${compass({})}</div>`); } },
    { zh: `从 X 看，${name} 在<b>${DZH[dir]}</b>方向，英文 <b>${dir}</b>。`, en: `${name} is ${dir} of X.`, render: s => { s.innerHTML = wrap(`<div class="center">${compass({ hl: dir, names })}</div>`, line(`${name}: ${dir}`)); } },
  ];
  /* l4griddir：{items, a, b, dir} a 在 b 的 dir 方向 */
  S.l4griddir = ({ items, a, b, dir }) => [
    { zh: `"The ${a} is ___ of the ${b}"：问 ${a} 在 ${b} 的哪个方向。先找到 ${b}（出发点）和 ${a}。`, en: `Find the ${b} first, then the ${a}.`, render: s => { s.innerHTML = wrap(`<div class="center">${gridMap(items, { hl: [a, b] })}</div>`); } },
    { zh: `从 ${b} 的点指向 ${a} 的点：${dir.includes('-') ? `既往${dir.startsWith('north') ? '上（北）' : '下（南）'}又往${dir.endsWith('east') ? '右（东）' : '左（西）'}，是斜的` : `正${{ north: '上', south: '下', east: '右', west: '左' }[dir]}`}，方向是 <b>${DZH[dir]} ${dir}</b>。`, en: `The ${a} is ${dir} of the ${b}.`, render: s => { s.innerHTML = wrap(`<div class="center">${gridMap(items, { hl: [a, b], arrow: [b, a] })}</div>`, line(`${dir}`)); } },
  ];
  /* l4turnface：{from, to, cw, ans:'deg'|'turn'} */
  S.l4turnface = ({ from, to, cw }) => { const a = DIRS.indexOf(from), b = DIRS.indexOf(to), steps = cw ? ((b - a) % 8 + 8) % 8 : ((a - b) % 8 + 8) % 8, deg = steps * 45; const tn = { 90: 'quarter-turn（1/4 圈）', 180: 'half-turn（1/2 圈）', 270: 'three-quarter-turn（3/4 圈）' }[deg]; return [
    { zh: `George 面向 <b>${DZH[from]}（${from}）</b>，要转到面向 <b>${DZH[to]}（${to}）</b>。${cw ? '顺时针（clockwise）' : '逆时针（anticlockwise）'}就是和钟表指针${cw ? '一样' : '相反'}的方向。`, en: `From ${from} to ${to}, ${cw ? 'clockwise' : 'anticlockwise'}.`, render: s => { s.innerHTML = wrap(`<div class="center">${compass({ hl: from })}</div>`); } },
    { zh: `相邻两个方向之间是 <b>45°</b>。从 ${from} ${cw ? '顺时针' : '逆时针'}数到 ${to}，经过 ${steps} 格：${steps} × 45° = <b>${deg}°</b>${tn ? `，也就是 <b>${tn}</b>` : ''}。`, en: `${steps} × 45° = ${deg}°${tn ? ` (${tn.split('（')[0]})` : ''}.`, render: s => { s.innerHTML = wrap(`<div class="center">${compass({ hl: to, arrow: { from, to, cw } })}</div>`, line(`${steps} × 45° = ${deg}°`)); } },
  ]; };
  /* l4chess：{pieces, a, b, dir} */
  S.l4chess = ({ pieces, a, b, dir }) => [
    { zh: `"${a} is ___ of ${b}"：问 ${a} 在 ${b} 的哪个方向。先在棋盘上找到这两个棋子（N 朝上）。`, en: `Find ${b} and ${a} on the board.`, render: s => { s.innerHTML = wrap(`<div class="center">${chess(pieces, { hl: [a, b] })}</div>`); } },
    { zh: `从 ${b} 指向 ${a}：方向是 <b>${DZH[dir]} ${dir}</b>。`, en: `${a} is ${dir} of ${b}.`, render: s => { s.innerHTML = wrap(`<div class="center">${chess(pieces, { hl: [a, b], arrow: [b, a] })}</div>`, line(dir)); } },
  ];
  /* l4towns：{from, deg, cw, ans} */
  S.l4towns = ({ from, deg, cw, ans, who }) => { const names = { north: 'A', 'north-east': 'B', east: 'C', 'south-east': 'D', south: 'E', 'south-west': 'F', west: 'G', 'north-west': 'H' }; const fromDir = Object.keys(names).find(k => names[k] === from); const facing = DIRS[(DIRS.indexOf(fromDir) + 4) % 8]; const to = turnTo(facing, deg, cw); return [
    { zh: `${who} 从 ${from} 镇走到 M。${from} 在 M 的${DZH[fromDir]}边，所以到 M 时他面向<b>${DZH[facing]}（${facing}）</b>。`, en: `Travelling from ${from} to M, facing ${facing}.`, render: s => { s.innerHTML = wrap(`<div class="center">${towns({ hl: from })}</div>`); } },
    { zh: `${cw ? '顺时针' : '逆时针'}转 ${deg}°：每格 45°，转 ${deg / 45} 格，面向 <b>${DZH[to]}（${to}）</b>，那边是 <b>${ans}</b> 镇。`, en: `Turn ${deg}° ${cw ? 'clockwise' : 'anticlockwise'}: facing ${to}, Town ${ans}.`, render: s => { s.innerHTML = wrap(`<div class="center">${towns({ hl: ans, arrow: { from: fromDir, to, cw } })}</div>`, line(`Town ${ans}`)); } },
  ]; };

  /* ---------- 题型 l4measure：估一估 + 量一量（可叠加量角器）q={rays, deg, letter|name, vertex} ---------- */
  window.QTypes.l4measure = q => {
    const b = q.rays[0].deg, o2 = q.rays[1].deg; const base = Math.abs(Math.sin(rad(b))) <= Math.abs(Math.sin(rad(o2))) ? b : o2; const other = base === b ? o2 : b; const bel = ((other - base) % 360 + 360) % 360 > 180;
    const ttl = q.name ? `∠${q.name}` : `∠${q.letter}`;
    const fig = on => angleFig(q.rays, { letter: q.letter, vertex: q.vertex, w: 440, prot: on ? { base, below: bel } : null });
    const html = () => `<div class="center"><div id="afig">${fig(false)}</div><button type="button" class="btn secondary small" id="protBtn">📐 放上量角器 / 拿开</button></div><div class="fill">Estimated value: ${ttl} = <input class="blank" data-k="est" type="text" inputmode="numeric" autocomplete="off" maxlength="3" style="width:3.2em">°　　Actual measurement: ${ttl} = <input class="blank" data-k="act" type="text" inputmode="numeric" autocomplete="off" maxlength="3" style="width:3.2em">°</div><div class="center sub">先不放量角器估一个数，再放上量角器量准确的数</div><div class="center mt"><button class="btn ok" id="submit">检查 ✔</button></div>`;
    const ins = box => [...box.querySelectorAll('input.blank')];
    const pv = v => { try { return JSON.parse(v || '{}'); } catch (e) { return {}; } };
    const okEst = v => Math.abs(parseInt(v, 10) - q.deg) <= 15, okAct = v => Math.abs(parseInt(v, 10) - q.deg) <= 2;
    return {
      prompt: { zh: `先估计 ${ttl} 大约几度，再用量角器量出来`, en: `Estimate and measure ${ttl}` }, stage: '',
      custom: {
        html,
        bind: (box, submit) => { let on = false; $('#protBtn', box).onclick = () => { on = !on; $('#afig', box).innerHTML = fig(on); }; const all = ins(box); all.forEach((inp, i) => { inp.onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); if (all[i + 1] && !all[i + 1].value) all[i + 1].focus(); else submit(); } }; }); $('#submit', box).onclick = () => submit(); all[0].focus({ preventScroll: true }); },
        value: box => { const [e, a] = ins(box).map(i => i.value.trim()); return e && a ? JSON.stringify({ est: e, act: a }) : null; },
        markWrong: (box, val) => { const v = pv(val); ins(box).forEach(inp => { const good = inp.dataset.k === 'est' ? okEst(v.est) : okAct(v.act); inp.classList.toggle('good', good); inp.classList.toggle('badf', !good); if (good) inp.disabled = true; }); const f = box.querySelector('input.badf'); if (f) f.select(); $('#afig', box).innerHTML = fig(true); },
        showAnswer: box => { ins(box).forEach(inp => { inp.value = inp.dataset.k === 'est' ? Math.round(q.deg / 10) * 10 : q.deg; inp.classList.remove('badf'); inp.classList.add('good'); inp.disabled = true; }); $('#afig', box).innerHTML = angleFig(q.rays, { letter: q.letter, vertex: q.vertex, w: 440, prot: { base, below: bel, mark: bel ? 180 - q.deg : q.deg } }); $('#submit', box).disabled = true; },
        lock: box => { ins(box).forEach(i => i.disabled = true); $('#submit', box).disabled = true; },
        restore: (box, val) => { const v = pv(val); ins(box).forEach(inp => { inp.value = v[inp.dataset.k] || ''; inp.classList.add((inp.dataset.k === 'est' ? okEst(v.est) : okAct(v.act)) ? 'good' : 'badf'); inp.disabled = true; }); $('#afig', box).innerHTML = fig(true); $('#submit', box).disabled = true; },
      },
      hint: { zh: '估：和直角 90° 比一比。量：中心对顶点，底线压一条边，看另一条边压着哪个数，从 0 那圈读。', en: 'Compare with 90° to estimate. Then read the scale that starts at 0 on the base arm.' },
      answerText: `约 ${Math.round(q.deg / 10) * 10}°，实际 ${q.deg}°`,
      check: v => { const o = pv(v); return okEst(o.est) && okAct(o.act); },
      answerDisplay: v => { const o = pv(v); return `估 ${o.est}°，量 ${o.act}°`; },
      explainKind: 'l4estmeas', n: { rays: q.rays, deg: q.deg, letter: q.letter, name: q.name, vertex: q.vertex },
    };
  };
  /* ---------- 题型 l4drawangle：在量角器上画角 q={deg, label?} 点击/拖动或 ←→ 键 ---------- */
  window.QTypes.l4drawangle = q => {
    let cur = null;
    const W = 420, cx = 210, cy = 200;
    const draw = box => { $('#pr', box).innerHTML = protractor({ rays: cur === null ? [{ deg: 0, color: INK }] : [{ deg: 0, color: INK }, { deg: cur }], live: true }); const sb0 = $('#submit', box); if (sb0) sb0.disabled = cur === null; const svg = $('#pr svg', box); const toDeg = ev => { const r = svg.getBoundingClientRect(), x = (ev.clientX - r.left) / r.width * W, y = (ev.clientY - r.top) / r.height * 232; let d = Math.round(Math.atan2(cy - y, x - cx) * 180 / Math.PI); return Math.max(0, Math.min(180, d)); }; let drag = false; svg.onpointerdown = ev => { if (box.dataset.locked) return; drag = true; cur = toDeg(ev); draw(box); }; svg.onpointermove = ev => { if (!drag || box.dataset.locked) return; cur = toDeg(ev); draw(box); }; svg.onpointerup = () => { drag = false; }; };
    const okv = v => v !== null && (Math.abs(v - q.deg) <= 1 || Math.abs(180 - v - q.deg) <= 1);
    return {
      prompt: { zh: `在量角器上画出 ${q.deg}° 的角${q.label ? `（∠${q.label}）` : ''}`, en: `Draw ${q.label ? `∠${q.label} = ` : ''}${q.deg}° on the protractor` }, stage: '',
      custom: {
        html: () => `<div class="center"><div id="pr"></div><div class="sub">👆 点一下（或按住拖）量角器的刻度，画出另一条边；用键盘 ← → 可以一度一度调</div><div class="center mt"><button class="btn ok" id="submit" disabled>检查 ✔</button></div></div>`,
        bind: (box, submit) => { delete box.dataset.locked; cur = null; draw(box); const sb = $('#submit', box); box.tabIndex = -1; box.onkeydown = e => { if (box.dataset.locked) return; if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); cur = Math.max(0, Math.min(180, (cur === null ? 0 : cur) + (e.key === 'ArrowLeft' ? 1 : -1))); draw(box); } if (e.key === 'Enter' && cur !== null) { e.preventDefault(); submit(); } }; box.focus({ preventScroll: true }); sb.onclick = () => submit(); },
        value: () => cur === null ? null : String(cur),
        markWrong: (box, val) => { cur = parseInt(val, 10); draw(box); $('#pr', box).classList.add('badf'); setTimeout(() => $('#pr', box) && $('#pr', box).classList.remove('badf'), 1200); },
        showAnswer: box => { cur = q.deg; box.dataset.locked = '1'; $('#pr', box).innerHTML = protractor({ rays: [{ deg: 0, color: INK }, { deg: q.deg }], mark: q.deg }); $('#submit', box).disabled = true; },
        lock: box => { box.dataset.locked = '1'; $('#submit', box).disabled = true; $('#pr', box).innerHTML = protractor({ rays: [{ deg: 0, color: INK }, { deg: cur }], mark: Math.abs(cur - q.deg) <= 1 ? q.deg : 180 - q.deg }); },
        restore: (box, val, status) => { const v = parseInt(val, 10); cur = isNaN(v) ? q.deg : v; box.dataset.locked = '1'; $('#pr', box).innerHTML = protractor({ rays: [{ deg: 0, color: INK }, { deg: cur }], mark: q.deg }); if (status === 'bad') $('#pr', box).classList.add('badf'); $('#submit', box).disabled = true; },
      },
      hint: { zh: `底线的边在右边，从右边的 0 用外圈数到 ${q.deg}。${q.deg > 90 ? '超过 90 要画到左半边。' : ''}`, en: `Count from 0 on the outer scale to ${q.deg}.` },
      answerText: `${q.deg}°`, check: v => okv(parseInt(v, 10)), answerDisplay: v => `${v}°`,
      explainKind: 'l4drawprot', n: { deg: q.deg },
    };
  };
  window.L4ANG = { protractor, angleFig, polyFig, compass, gridMap, chess, towns, DIRS, DZH, dirOf, turnTo };
})();
