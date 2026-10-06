/* Level 3 · Unit 15-16 几何：网格线段、垂直平行、面积周长 讲解 + 题型 l3drawline / l3areadraw */
(function () {
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '"': '&quot;', '>': '&gt;' }[c]));
  const line = t => `<div class="expand-line">${t}</div>`;
  const wrap = (...parts) => `<div class="l1wrap">${parts.join('')}</div>`;
  const $ = (sel, el) => (el || document).querySelector(sel);
  const CELL = 30, PAD = 18;

  /* ---------- 线段几何 ---------- */
  const dir = s => [s.b[0] - s.a[0], s.b[1] - s.a[1]];
  const dot = (u, v) => u[0] * v[0] + u[1] * v[1], cross = (u, v) => u[0] * v[1] - u[1] * v[0];
  const isPerp = (s, t) => dot(dir(s), dir(t)) === 0;
  const isPara = (s, t) => cross(dir(s), dir(t)) === 0;
  const collinear = (s, t) => isPara(s, t) && cross(dir(s), [t.a[0] - s.a[0], t.a[1] - s.a[1]]) === 0;
  const orient = (p, q, r) => Math.sign((q[0] - p[0]) * (r[1] - p[1]) - (q[1] - p[1]) * (r[0] - p[0]));
  const onSeg = (p, q, r) => Math.min(p[0], r[0]) <= q[0] && q[0] <= Math.max(p[0], r[0]) && Math.min(p[1], r[1]) <= q[1] && q[1] <= Math.max(p[1], r[1]);
  function intersects(s, t) { const o1 = orient(s.a, s.b, t.a), o2 = orient(s.a, s.b, t.b), o3 = orient(t.a, t.b, s.a), o4 = orient(t.a, t.b, s.b); if (o1 !== o2 && o3 !== o4) return true; if (o1 === 0 && onSeg(s.a, t.a, s.b)) return true; if (o2 === 0 && onSeg(s.a, t.b, s.b)) return true; if (o3 === 0 && onSeg(t.a, s.a, t.b)) return true; if (o4 === 0 && onSeg(t.a, s.b, t.b)) return true; return false; }
  /* 网格 + 线段 SVG：n 格；segs [{a,b,name,hl}]；o.labels [{p,t}]；o.live 可点；o.pts 临时点 */
  function grid(n, segs, o = {}) {
    const W = n * CELL + PAD * 2, X = v => PAD + v * CELL;
    let s = '';
    for (let i = 0; i <= n; i++) s += `<line x1="${X(0)}" y1="${X(i)}" x2="${X(n)}" y2="${X(i)}" stroke="#bbb" stroke-width="1"/><line x1="${X(i)}" y1="${X(0)}" x2="${X(i)}" y2="${X(n)}" stroke="#bbb" stroke-width="1"/>`;
    segs.forEach(sg => { const hl = o.hl && o.hl.includes(sg.name); s += `<line x1="${X(sg.a[0])}" y1="${X(sg.a[1])}" x2="${X(sg.b[0])}" y2="${X(sg.b[1])}" stroke="${sg.color || (hl ? '#ff9f43' : sg.user ? '#6c5ce7' : '#2b2b3a')}" stroke-width="${hl ? 4 : 2.5}" stroke-linecap="round"/>`;
      if (sg.name && sg.showName !== false && !sg.user) { [[sg.a, sg.name[0]], [sg.b, sg.name[1]]].forEach(([p, t]) => { if (!o.labels) s += `<text x="${X(p[0]) + 5}" y="${X(p[1]) - 5}" font-size="13" font-weight="700" fill="#2b2b3a">${t}</text>`; }); } });
    (o.labels || []).forEach(l => { s += `<text x="${X(l.p[0]) + (l.dx || 5)}" y="${X(l.p[1]) + (l.dy || -5)}" font-size="13" font-weight="700" fill="#2b2b3a">${esc(l.t)}</text>`; });
    (o.marks || []).forEach(m => { const sq = 8; const [p, u, v] = m; s += `<path d="M${X(p[0]) + u[0] * sq} ${X(p[1]) + u[1] * sq} L${X(p[0]) + (u[0] + v[0]) * sq} ${X(p[1]) + (u[1] + v[1]) * sq} L${X(p[0]) + v[0] * sq} ${X(p[1]) + v[1] * sq}" fill="none" stroke="#d35400" stroke-width="2"/>`; });
    (o.dots || []).forEach(d => { s += `<circle cx="${X(d[0])}" cy="${X(d[1])}" r="5" fill="#d35400"/>`; });
    if (o.pending) s += `<circle cx="${X(o.pending[0])}" cy="${X(o.pending[1])}" r="6" fill="#ff9f43"/>`;
    if (o.live) for (let i = 0; i <= n; i++) for (let j = 0; j <= n; j++) s += `<circle class="gpt" data-x="${i}" data-y="${j}" cx="${X(i)}" cy="${X(j)}" r="9" fill="transparent" style="cursor:pointer"/>`;
    return `<svg class="geogrid" viewBox="0 0 ${W} ${W}" width="${o.w || Math.min(W, 300)}" height="${o.w || Math.min(W, 300)}">${s}</svg>`;
  }
  /* 格子图：cells [{x,y,h?}] h = 'tl'|'tr'|'bl'|'br'（直角在哪个角的半格）；o.cols/rows, o.hl(下标集), o.nums 编号, o.labels, o.live, o.fixed */
  function cells(cols, rows, list, o = {}) {
    const W = cols * CELL + 10, H = rows * CELL + 10, X = v => 5 + v * CELL;
    let s = '';
    for (let i = 0; i <= cols; i++) s += `<line x1="${X(i)}" y1="${X(0)}" x2="${X(i)}" y2="${X(rows)}" stroke="${o.nogrid ? 'transparent' : '#ccc'}" stroke-width="1"/>`;
    for (let j = 0; j <= rows; j++) s += `<line x1="${X(0)}" y1="${X(j)}" x2="${X(cols)}" y2="${X(j)}" stroke="${o.nogrid ? 'transparent' : '#ccc'}" stroke-width="1"/>`;
    const hl = new Set(o.hl || []);
    list.forEach((c, i) => { const x0 = X(c.x), y0 = X(c.y), x1 = x0 + CELL, y1 = y0 + CELL; const fill = c.fixed ? '#9a9a9a' : hl.has(i) ? '#ff9f43' : (c.color || '#bfbfbf');
      const pts = !c.h ? [[x0, y0], [x1, y0], [x1, y1], [x0, y1]] : c.h === 'tl' ? [[x0, y0], [x1, y0], [x0, y1]] : c.h === 'tr' ? [[x0, y0], [x1, y0], [x1, y1]] : c.h === 'br' ? [[x1, y0], [x1, y1], [x0, y1]] : [[x0, y0], [x1, y1], [x0, y1]];
      s += `<polygon points="${pts.map(p => p.join(',')).join(' ')}" fill="${fill}" stroke="#2b2b3a" stroke-width="1.2"/>`;
      if (o.nums) s += `<text x="${x0 + CELL / 2 + (c.h ? (c.h.includes('l') ? -4 : 4) : 0)}" y="${y0 + CELL / 2 + 4 + (c.h ? (c.h.includes('t') ? -4 : 4) : 0)}" text-anchor="middle" font-size="11" font-weight="700" fill="#2b2b3a">${c.h ? '½' : i + 1}</text>`; });
    (o.labels || []).forEach(l => { s += `<text x="${X(l.x) + CELL / 2}" y="${X(l.y) + CELL / 2 + 6}" text-anchor="middle" font-size="16" font-weight="800" fill="#2b2b3a">${l.t}</text>`; });
    if (o.edges) o.edges.forEach(e => { s += `<line x1="${X(e[0])}" y1="${X(e[1])}" x2="${X(e[2])}" y2="${X(e[3])}" stroke="#d35400" stroke-width="3"/>`; });
    if (o.live) for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) s += `<rect class="cellhit" data-x="${i}" data-y="${j}" x="${X(i)}" y="${X(j)}" width="${CELL}" height="${CELL}" fill="transparent" style="cursor:pointer"/>`;
    if (o.unit) s += `<text x="${X(0) + CELL / 2}" y="${X(0) - 2}" text-anchor="middle" font-size="10" fill="#333">${o.unit}</text>`;
    return `<svg class="cellfig" viewBox="0 0 ${W} ${H}" width="${o.w || Math.min(W, 340)}" height="${(o.w || Math.min(W, 340)) * H / W}">${s}</svg>`;
  }
  const area = list => list.reduce((s, c) => s + (c.h ? 0.5 : 1), 0);
  const key = (x, y) => `${x},${y}`;
  function perim(list) { const set = new Set(list.filter(c => !c.h).map(c => key(c.x, c.y))); let p = 0; const edges = []; list.forEach(c => { if (c.h) return; [[0, -1, [c.x, c.y, c.x + 1, c.y]], [1, 0, [c.x + 1, c.y, c.x + 1, c.y + 1]], [0, 1, [c.x, c.y + 1, c.x + 1, c.y + 1]], [-1, 0, [c.x, c.y, c.x, c.y + 1]]].forEach(([dx, dy, e]) => { if (!set.has(key(c.x + dx, c.y + dy))) { p++; edges.push(e); } }); }); return { p, edges }; }
  /* 标边长的多边形 pts(px) labels [{i, t}] 第 i 条边 */
  function polyfig(pts, labels, o = {}) {
    const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]), minx = Math.min(...xs) - 34, miny = Math.min(...ys) - 24, W = Math.max(...xs) - minx + 34, H = Math.max(...ys) - miny + 24;
    const n = pts.length, cx = xs.reduce((a, b) => a + b, 0) / n, cy = ys.reduce((a, b) => a + b, 0) / n;
    let s = `<polygon points="${pts.map(p => p.join(',')).join(' ')}" fill="#f7f5ff" stroke="#2b2b3a" stroke-width="2"/>`;
    labels.forEach(l => { const a = pts[l.i], b = pts[(l.i + 1) % n], mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2; let nx = -(b[1] - a[1]), ny = b[0] - a[0]; const len = Math.hypot(nx, ny) || 1; nx /= len; ny /= len; if ((mx - cx) * nx + (my - cy) * ny < 0) { nx = -nx; ny = -ny; } const hl = o.hl !== undefined && o.hl >= l.i; s += `<text x="${mx + nx * 14}" y="${my + ny * 14 + 4}" text-anchor="middle" font-size="12" font-weight="700" fill="${hl ? '#d35400' : '#2b2b3a'}">${esc(l.t)}</text>`; if (o.hl !== undefined && o.hl === l.i) s += `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="#ff9f43" stroke-width="5" stroke-linecap="round"/>`; });
    return `<svg viewBox="${minx} ${miny} ${W} ${H}" width="${W * (o.scale || 1.3)}" height="${H * (o.scale || 1.3)}">${s}</svg>`;
  }
  const rect = (l, b, unit, o = {}) => { const sc = Math.min(180 / Math.max(l, b), 24); const w = l * sc, h = b * sc; return `<svg viewBox="-30 -24 ${w + 60} ${h + 40}" width="${w + 60}" height="${h + 40}"><rect x="0" y="0" width="${w}" height="${h}" fill="${o.fill || '#f7f5ff'}" stroke="#2b2b3a" stroke-width="2"/><text x="${w / 2}" y="-8" text-anchor="middle" font-size="13" font-weight="700" fill="${o.hl === 'l' ? '#d35400' : '#2b2b3a'}">${l} ${unit}</text><text x="${w + 6}" y="${h / 2 + 5}" font-size="13" font-weight="700" fill="${o.hl === 'b' ? '#d35400' : '#2b2b3a'}">${b} ${unit}</text>${o.diag ? `<line x1="0" y1="${h}" x2="${w}" y2="0" stroke="#2b2b3a" stroke-width="1.5"/>` : ''}</svg>`; };
  window.L3.geo = { grid, cells, area, perim, polyfig, rect, isPerp, isPara, intersects, collinear };

  const S = window.StepKinds;
  const sqMark = (s, t) => { const P = [s.a, s.b].find(p => onSeg(t.a, p, t.b)) || [t.a, t.b].find(p => onSeg(s.a, p, s.b)); if (!P) { /* 交叉点 */ const d1 = dir(s), d2 = dir(t); const den = cross(d1, d2); const tt = cross([t.a[0] - s.a[0], t.a[1] - s.a[1]], d2) / den; return [[s.a[0] + d1[0] * tt, s.a[1] + d1[1] * tt], unit(d1), unit(d2)]; } return [P, unit(dirFrom(s, P)), unit(dirFrom(t, P))]; };
  const unit = v => { const l = Math.hypot(v[0], v[1]) || 1; return [v[0] / l, v[1] / l]; };
  const dirFrom = (s, P) => { const far = (Math.abs(s.a[0] - P[0]) + Math.abs(s.a[1] - P[1])) > (Math.abs(s.b[0] - P[0]) + Math.abs(s.b[1] - P[1])) ? s.a : s.b; return [far[0] - P[0], far[1] - P[1]]; };
  /* l3perpcheck：{n, segs:[s,t], perp:bool} */
  S.l3perpcheck = ({ n, segs, rel }) => { const [s, t] = segs; const ok = rel === 'para' ? isPara(s, t) : isPerp(s, t) && intersects(s, t); return rel === 'para' ? [
    { zh: `两条线<b>平行</b>（parallel）的意思是：一直往两边延长也<b>永远不会相交</b>，而且处处距离一样。看它们在格子上的走向。`, en: 'Parallel lines never meet.', render: x => { x.innerHTML = wrap(`<div class="center">${grid(n, segs)}</div>`); } },
    { zh: `数格子看方向：第一条每${Math.abs(dir(s)[0]) || '0'}格横走${Math.abs(dir(s)[1])}格竖；第二条每${Math.abs(dir(t)[0])}格横走${Math.abs(dir(t)[1])}格竖。${ok ? '<b>方向一样</b>，所以平行 ✓，标上 ▸▸。' : '<b>方向不一样</b>，延长后会相交，不平行 ✗。'}`, en: ok ? 'Same direction: parallel.' : 'Different directions: not parallel.', render: x => { x.innerHTML = wrap(`<div class="center">${grid(n, segs, { hl: segs.map(g => g.name) })}</div>`, line(ok ? '✓ parallel' : '✗ not parallel')); } },
  ] : [
    { zh: `两条线<b>垂直</b>（perpendicular）的意思是：它们相交成<b>直角</b>（正方形的角）。用直角去量它们相交的地方。`, en: 'Perpendicular lines meet at a right angle.', render: x => { x.innerHTML = wrap(`<div class="center">${grid(n, segs)}</div>`); } },
    { zh: ok ? `相交的地方正好是一个方角（直角），所以<b>垂直</b> ✓，标上 ⊥ 的小方块。` : (intersects(s, t) ? `相交的角比直角${dot(dir(s), dir(t)) > 0 ? '小' : '大'}，不是直角，<b>不垂直</b> ✗。` : `两条线没有相交成直角，<b>不垂直</b> ✗。`), en: ok ? 'Right angle: perpendicular.' : 'Not a right angle.', render: x => { x.innerHTML = wrap(`<div class="center">${grid(n, segs, { hl: segs.map(g => g.name), marks: ok ? [sqMark(s, t)] : [] })}</div>`, line(ok ? '✓ perpendicular' : '✗ not perpendicular')); } },
  ]; };
  /* l3pairs：{n, segs, rel, labels} */
  S.l3pairs = ({ n, segs, rel, labels }) => { const pairs = []; segs.forEach((s, i) => segs.slice(i + 1).forEach(t => { if (rel === 'perp' ? isPerp(s, t) && intersects(s, t) : isPara(s, t) && !collinear(s, t)) pairs.push([s, t]); }));
    const steps = [{ zh: rel === 'perp' ? '一条一条看：哪两条线相交成<b>直角</b>？横线和竖线相交一定垂直；两条斜线一条往右上一条往右下（格子数一样）也垂直。' : '一条一条看：哪两条线<b>方向一样</b>？两条横线、两条竖线平行；两条斜线横竖格子数一样也平行。', en: rel === 'perp' ? 'Find lines meeting at right angles.' : 'Find lines going the same way.', render: x => { x.innerHTML = wrap(`<div class="center">${grid(n, segs, { labels })}</div>`); } }];
    pairs.forEach(([s, t], i) => steps.push({ zh: `第 ${i + 1} 对：<b>${s.name} ${rel === 'perp' ? '⊥' : '//'} ${t.name}</b>。`, en: `${s.name} ${rel === 'perp' ? '⊥' : '//'} ${t.name}`, render: x => { x.innerHTML = wrap(`<div class="center">${grid(n, segs, { labels, hl: [s.name, t.name], marks: rel === 'perp' ? [sqMark(s, t)] : [] })}</div>`, line(pairs.slice(0, i + 1).map(p => `${p[0].name} ${rel === 'perp' ? '⊥' : '//'} ${p[1].name}`).join('，'))); } }));
    return steps; };
  /* l3drawexp：{n, base, rel, fixed?} */
  S.l3drawexp = ({ n, base, rel, fixed }) => { const d = dir(base); const pd = rel === 'perp' ? [-d[1], d[0]] : d; const g = (a, b) => b ? gcd(Math.abs(a), Math.abs(b)) : Math.abs(a); const gg = g(pd[0], pd[1]) || 1; const step = [pd[0] / gg, pd[1] / gg];
    const start = fixed || [Math.round((base.a[0] + base.b[0]) / 2), Math.round((base.a[1] + base.b[1]) / 2)]; const p2 = [start[0] + step[0], start[1] + step[1]]; const p1 = [start[0] - step[0], start[1] - step[1]]; const inside = p => p[0] >= 0 && p[0] <= n && p[1] >= 0 && p[1] <= n; const q = inside(p2) ? p2 : p1;
    const ex = { a: start, b: q, user: true };
    return [
      { zh: `${base.name} 是${d[0] === 0 ? '竖线' : d[1] === 0 ? '横线' : `斜线：横走 ${Math.abs(d[0])} 格、竖走 ${Math.abs(d[1])} 格`}。要画${rel === 'perp' ? '<b>垂直</b>' : '<b>平行</b>'}于它的线${fixed ? `，而且要经过点 (${fixed.join(', ')})` : ''}。`, en: `${base.name} is the base line.`, render: x => { x.innerHTML = wrap(`<div class="center">${grid(n, [base], { hl: [base.name], dots: fixed ? [fixed] : [] })}</div>`); } },
      { zh: rel === 'perp' ? (d[0] === 0 ? '竖线的垂线是<b>横线</b>：沿着一行格子线画。' : d[1] === 0 ? '横线的垂线是<b>竖线</b>：沿着一列格子线画。' : `斜线的垂线把横竖格子数<b>交换</b>并改变方向：横走 ${Math.abs(step[0])} 格、竖走 ${Math.abs(step[1])} 格往${step[1] * d[1] <= 0 ? '另一边' : ''}斜。`) : (d[0] === 0 ? '平行线也是<b>竖线</b>，画在另一列。' : d[1] === 0 ? '平行线也是<b>横线</b>，画在另一行。' : `平行线走向一样：横走 ${Math.abs(step[0])} 格、竖走 ${Math.abs(step[1])} 格，从另一个点出发。`), en: 'Follow the grid.', render: x => { x.innerHTML = wrap(`<div class="center">${grid(n, [base, ex], { hl: [base.name], dots: fixed ? [fixed] : [] })}</div>`); } },
      { zh: `从一个格点出发，按这个走法再找一个格点，连起来就是一条${rel === 'perp' ? '垂' : '平行'}线（画法不止一种，只要走法对就行）。`, en: 'Join two grid points.', render: x => { x.innerHTML = wrap(`<div class="center">${grid(n, [base, ex], { hl: [base.name], dots: [start, q] })}</div>`, line(`${rel === 'perp' ? '⊥' : '//'} ${base.name}`)); } },
    ]; };
  const gcd = (a, b) => b ? gcd(b, a % b) : a;
  /* l3cellarea：{cols, rows, list, label?} */
  S.l3cellarea = ({ cols, rows, list }) => { const full = list.filter(c => !c.h).length, half = list.length - full; const a = area(list); return [
    { zh: `面积就是图形盖住了多少个<b>方格</b>（square units）。先数<b>完整</b>的方格：<b>${full}</b> 个。`, en: `${full} whole squares.`, render: x => { x.innerHTML = wrap(`<div class="center">${cells(cols, rows, list, { nums: true, hl: list.map((c, i) => c.h ? -1 : i) })}</div>`, line(`${full} 个整格`)); } },
    half ? { zh: `再数<b>半格</b>（三角形）：<b>${half}</b> 个，2 个半格 = 1 个整格，所以是 ${half} ÷ 2 = ${half / 2} 格。`, en: `${half} half squares = ${half / 2} squares.`, render: x => { x.innerHTML = wrap(`<div class="center">${cells(cols, rows, list, { nums: true, hl: list.map((c, i) => c.h ? i : -1) })}</div>`, line(`${half} 个半格 = ${half / 2} 格`)); } } : { zh: '没有半格。', en: 'No half squares.', render: x => { x.innerHTML = wrap(`<div class="center">${cells(cols, rows, list)}</div>`); } },
    { zh: `面积 = ${full}${half ? ` + ${half / 2}` : ''} = <b>${a}</b> square units。`, en: `Area = ${a} square units.`, render: x => { x.innerHTML = wrap(`<div class="center">${cells(cols, rows, list)}</div>`, line(`Area = ${a} square units`)); } },
  ]; };
  /* l3cellperim：{cols, rows, list, unit} */
  S.l3cellperim = ({ cols, rows, list, unit: u }) => { const { p, edges } = perim(list); return [
    { zh: `周长（perimeter）是图形<b>外面一圈</b>的长度。每个方格的边长是 1 ${u}。沿着边界一段一段数。`, en: 'Perimeter is the distance around the outside.', render: x => { x.innerHTML = wrap(`<div class="center">${cells(cols, rows, list, { unit: `1 ${u}` })}</div>`); } },
    { zh: `把外面的边都描出来，一共 <b>${p}</b> 段，每段 1 ${u}。`, en: `${p} unit edges.`, render: x => { x.innerHTML = wrap(`<div class="center">${cells(cols, rows, list, { edges })}</div>`, line(`${p} 段`)); } },
    { zh: `周长 = ${p} × 1 ${u} = <b>${p} ${u}</b>。`, en: `Perimeter = ${p} ${u}.`, render: x => { x.innerHTML = wrap(`<div class="center">${cells(cols, rows, list, { edges })}</div>`, line(`Perimeter = ${p} ${u}`)); } },
  ]; };
  /* l3polyperim：{pts, labels(文字), sides(数值), unit} */
  S.l3polyperim = ({ pts, labels, sides, unit: u }) => { const steps = [{ zh: `周长 = 把<b>每条边</b>的长度加起来。这个图形有 ${sides.length} 条边。`, en: 'Add up all the sides.', render: x => { x.innerHTML = wrap(`<div class="center">${polyfig(pts, labels)}</div>`); } }]; let run = 0;
    sides.forEach((v, i) => { run += v; const r = run; steps.push({ zh: `第 ${i + 1} 条边 ${v} ${u}${i ? `：${r - v} + ${v} = <b>${r}</b>` : ''}。`, en: `${r}`, render: x => { x.innerHTML = wrap(`<div class="center">${polyfig(pts, labels, { hl: i })}</div>`, line(sides.slice(0, i + 1).join(' + ') + ` = ${r}`)); } }); });
    steps.push({ zh: `周长 = ${sides.join(' + ')} = <b>${run} ${u}</b>。`, en: `Perimeter = ${run} ${u}.`, render: x => { x.innerHTML = wrap(line(`${sides.join(' + ')} = ${run} ${u}`)); } }); return steps; };
  /* l3rect：{l, b, unit} */
  S.l3rect = ({ l, b, unit: u }) => [
    { zh: `长方形：长（length）${l} ${u}，宽（breadth）${b} ${u}。${l === b ? '长和宽一样，是正方形。' : ''}`, en: `Length ${l}, breadth ${b}.`, render: x => { x.innerHTML = wrap(`<div class="center">${rect(l, b, u)}</div>`); } },
    { zh: `面积 = 长 × 宽 = ${l} × ${b} = <b>${l * b} ${u}²</b>。`, en: `Area = ${l} × ${b} = ${l * b} ${u}².`, render: x => { x.innerHTML = wrap(`<div class="center">${rect(l, b, u, { hl: 'l' })}</div>`, line(`Area = ${l} × ${b} = ${l * b} ${u}²`)); } },
    { zh: `周长 = 长 + 宽 + 长 + 宽 = ${l} + ${b} + ${l} + ${b} = <b>${2 * (l + b)} ${u}</b>。`, en: `Perimeter = ${2 * (l + b)} ${u}.`, render: x => { x.innerHTML = wrap(`<div class="center">${rect(l, b, u, { hl: 'b' })}</div>`, line(`Perimeter = ${l} + ${b} + ${l} + ${b} = ${2 * (l + b)} ${u}`)); } },
  ];
  /* l3areaword：{en, zh, kind:'perim'|'area'|'side', l, b, unit, sentence} */
  S.l3areaword = ({ en, zh, kind, l, b, unit: u, sentence }) => { const text = `<div class="wp-text"><div class="wp-en">${esc(en)}</div><div class="wp-zh">${esc(zh)}</div></div>`; const ans = kind === 'perim' ? 2 * (l + b) : kind === 'area' ? l * b : l / 4; return [
    { zh: kind === 'perim' ? `“铁丝围一圈 / 篱笆 / 一圈”问的是<b>周长</b>：长 + 宽 + 长 + 宽。` : kind === 'area' ? `“拖地 / 刷墙 / 一块地”问的是<b>面积</b>：长 × 宽。` : `“跑一圈 ${l} m”是正方形的<b>周长</b>，正方形 4 条边一样长，所以边长 = 周长 ÷ 4。`, en: kind === 'perim' ? 'Perimeter.' : kind === 'area' ? 'Area.' : 'Side = perimeter ÷ 4.', render: x => { x.innerHTML = wrap(text, kind === 'side' ? '' : `<div class="center">${rect(l, b, u)}</div>`); } },
    { zh: kind === 'perim' ? `${l} + ${b} + ${l} + ${b} = <b>${ans} ${u}</b>。` : kind === 'area' ? `${l} × ${b} = <b>${ans} ${u}²</b>。` : `${l} ÷ 4 = <b>${ans} ${u}</b>。`, en: `${ans}`, render: x => { x.innerHTML = wrap(line(kind === 'perim' ? `${l} + ${b} + ${l} + ${b} = ${ans} ${u}` : kind === 'area' ? `${l} × ${b} = ${ans} ${u}²` : `${l} ÷ 4 = ${ans} ${u}`), line(esc(sentence).replace('___', `<b>${ans}</b>`))); } },
  ]; };

  /* ---------- 题型 l3drawline：q = {n, base:{a,b,name}, rel, count, fixed?:[[x,y]], others?:[segs], labels?} ---------- */
  window.QTypes.l3drawline = q => {
    let lines = [], pending = null;
    const fixedPts = q.fixed || [];
    const segsOf = () => [q.base].concat(q.others || []).concat(lines.map(l => ({ a: l[0], b: l[1], user: true })));
    const draw = (box, o) => { const host = $('#gg', box); host.innerHTML = grid(q.n, segsOf(), Object.assign({ live: !box.dataset.locked, labels: q.labels, dots: fixedPts, pending, hl: [q.base.name] }, o || {})); host.querySelectorAll('.gpt').forEach(c => c.onclick = () => { if (box.dataset.locked) return; const p = [+c.dataset.x, +c.dataset.y]; if (fixedPts.length) { const f = fixedPts[lines.length] || fixedPts[fixedPts.length - 1]; if (p[0] === f[0] && p[1] === f[1]) return; if (lines.length < q.count) lines.push([f, p]); } else if (!pending) pending = p; else { if (pending[0] !== p[0] || pending[1] !== p[1]) { if (lines.length < q.count) lines.push([pending, p]); } pending = null; } draw(box); $('#lc', box).textContent = lines.length; }); };
    const okLine = l => { const s = { a: l[0], b: l[1] }; if (q.rel === 'perp') return isPerp(s, q.base); return isPara(s, q.base) && !collinear(s, q.base); };
    const check = v => { try { const L = JSON.parse(v); if (L.length !== q.count) return false; if (!L.every(okLine)) return false; for (let i = 0; i < L.length; i++) for (let j = i + 1; j < L.length; j++) if (collinear({ a: L[i][0], b: L[i][1] }, { a: L[j][0], b: L[j][1] })) return false; if (fixedPts.length) return L.every((l, i) => { const f = fixedPts[i]; return f && l[0][0] === f[0] && l[0][1] === f[1]; }); return true; } catch (e) { return false; } };
    return {
      prompt: { zh: `在格子上画 ${q.count} 条${q.rel === 'perp' ? '垂直' : '平行'}于 ${q.base.name} 的线${fixedPts.length ? `，分别经过${fixedPts.length > 1 ? '两个' : ''}红点` : '，每条线要经过至少两个格点'}`, en: `Draw ${q.count} line${q.count > 1 ? 's' : ''} ${q.rel === 'perp' ? 'perpendicular' : 'parallel'} to ${q.base.name}.` }, stage: '',
      custom: {
        html: () => `<div class="center"><div id="gg"></div><div class="sub">👆 ${fixedPts.length ? '点一个格点，就从红点连一条线' : '点两个格点连成一条线'}　已画：<b id="lc">0</b> / ${q.count}</div><div class="center mt"><button class="btn secondary small" id="undo">撤销一条 ↩</button> <button class="btn ok" id="submit">检查 ✔</button></div></div>`,
        bind: (box, submit) => { delete box.dataset.locked; lines = []; pending = null; draw(box); $('#undo', box).onclick = () => { if (box.dataset.locked) return; lines.pop(); pending = null; draw(box); $('#lc', box).textContent = lines.length; }; $('#submit', box).onclick = () => submit(); },
        value: () => lines.length ? JSON.stringify(lines) : null,
        markWrong: (box, v) => { lines = JSON.parse(v); draw(box); $('#gg', box).classList.add('badf'); },
        showAnswer: box => { const d = dir(q.base), pd = q.rel === 'perp' ? [-d[1], d[0]] : d, g = gcd(Math.abs(pd[0]), Math.abs(pd[1])) || 1, st = [pd[0] / g, pd[1] / g]; const inside = p => p[0] >= 0 && p[0] <= q.n && p[1] >= 0 && p[1] <= q.n; lines = []; const starts = fixedPts.length ? fixedPts : (q.rel === 'perp' ? [0, 1, 2, 3, 4, 5, 6].map(k => [q.base.a[0] + Math.round(d[0] * k / 6), q.base.a[1] + Math.round(d[1] * k / 6)]) : [[q.base.a[0] + 2, q.base.a[1] + 2], [q.base.a[0] - 2, q.base.a[1] - 2], [q.base.a[0] + 1, q.base.a[1] - 3]]); for (const s of starts) { if (lines.length >= q.count) break; const e = [s[0] + st[0], s[1] + st[1]], e2 = [s[0] - st[0], s[1] - st[1]]; const b = inside(e) ? e : e2; const cand = { a: s, b }; if (!inside(s) || !inside(b) || !okLine([s, b]) || lines.some(l => collinear({ a: l[0], b: l[1] }, cand))) continue; lines.push([s, b]); } box.dataset.locked = '1'; draw(box); $('#submit', box).disabled = true; $('#undo', box).disabled = true; },
        lock: box => { box.dataset.locked = '1'; $('#submit', box).disabled = true; $('#undo', box).disabled = true; },
        restore: (box, v, status) => { try { lines = JSON.parse(v || '[]'); } catch (e) { lines = []; } box.dataset.locked = '1'; draw(box); $('#submit', box).disabled = true; if (status === 'bad') $('#gg', box).classList.add('badf'); },
      },
      hint: q.rel === 'perp' ? { zh: '横线的垂线是竖线，竖线的垂线是横线；斜线的垂线把横竖格数交换、方向反过来。', en: 'Perpendicular to a horizontal line is vertical.' } : { zh: '平行线走向一样：横走几格、竖走几格都和原来的线相同。', en: 'Same direction as the base line.' },
      answerText: `${q.count} 条${q.rel === 'perp' ? '垂' : '平行'}线`, check,
      answerDisplay: v => { try { return JSON.parse(v).length + ' 条线'; } catch (e) { return v; } },
      explainKind: 'l3drawexp', n: { n: q.n, base: q.base, rel: q.rel, fixed: fixedPts[0] },
    };
  };

  /* ---------- 题型 l3areadraw：q = {cols, rows, grids:[{init:[cells], target?, req?:{sq,half}}], distinct?} ---------- */
  window.QTypes.l3areadraw = q => {
    let st = [];   // per grid: Map key -> 0/1/2
    const initOf = g => new Set(g.init.map(c => key(c.x, c.y)));
    const listOf = (gi, fixedFlag) => { const g = q.grids[gi], out = g.init.map(c => Object.assign({}, c, { fixed: fixedFlag })); st[gi].forEach((v, k) => { if (!v) return; const [x, y] = k.split(',').map(Number); out.push(v === 1 ? { x, y } : { x, y, h: 'tl' }); }); return out; };
    const draw = box => { q.grids.forEach((g, gi) => { const host = $(`#ad${gi}`, box); host.innerHTML = cells(q.cols, q.rows, listOf(gi, true), { live: !box.dataset.locked, w: 300 }); host.querySelectorAll('.cellhit').forEach(r => r.onclick = () => { if (box.dataset.locked) return; const k = key(+r.dataset.x, +r.dataset.y); if (initOf(g).has(k)) return; st[gi].set(k, ((st[gi].get(k) || 0) + 1) % 3); draw(box); }); $(`#ar${gi}`, box).textContent = area(listOf(gi)); }); };
    const stats = gi => { let sq = 0, half = 0; st[gi].forEach(v => { if (v === 1) sq++; if (v === 2) half++; }); return { sq, half, area: area(listOf(gi)) }; };
    const okGrid = gi => { const g = q.grids[gi], s = stats(gi); if (g.req) return s.sq === g.req.sq && s.half === g.req.half; return s.area === g.target && (s.sq + s.half) > 0; };
    const value = () => st.some(m => [...m.values()].some(v => v)) ? JSON.stringify(st.map(m => [...m.entries()].filter(e => e[1]))) : null;
    const load = v => { st = q.grids.map(() => new Map()); try { JSON.parse(v || '[]').forEach((arr, gi) => arr.forEach(([k, val]) => st[gi].set(k, val))); } catch (e) { /* */ } };
    const check = v => { load(v); if (!q.grids.every((_, gi) => okGrid(gi))) return false; if (q.distinct) { const sets = q.grids.map((_, gi) => listOf(gi).map(c => `${c.x},${c.y},${c.h || ''}`).sort().join('|')); if (new Set(sets).size < sets.length) return false; } return true; };
    return {
      prompt: { zh: q.grids[0].req ? `给图形添上 ${q.grids[0].req.sq} 个整格${q.grids[0].req.half ? `和 ${q.grids[0].req.half} 个半格` : ''}，再写出面积` : q.distinct ? `画出 ${q.grids.length} 个<b>不同</b>的图形，面积都是 ${q.grids[0].target} square units` : `给每个图形添上整格或半格，让面积变成 ${q.grids[0].target} square units`, en: q.grids[0].req ? `Add ${q.grids[0].req.sq} squares${q.grids[0].req.half ? ` and ${q.grids[0].req.half} half-squares` : ''} to the figure.` : q.distinct ? `Draw ${q.grids.length} different figures with the same area of ${q.grids[0].target} square units.` : `Add squares or half-squares to make the area ${q.grids[0].target} square units.` }, stage: '',
      custom: {
        html: () => `<div class="center"><div class="fig-row">${q.grids.map((g, gi) => `<div><div id="ad${gi}"></div><div class="sub">面积 Area：<b id="ar${gi}">0</b></div></div>`).join('')}</div><div class="sub">👆 点格子：点 1 次整格，点 2 次半格，点 3 次清掉（灰色是原来的，不能改）</div><div class="center mt"><button class="btn secondary small" id="clearAll">清空</button> <button class="btn ok" id="submit">检查 ✔</button></div></div>`,
        bind: (box, submit) => { delete box.dataset.locked; load(null); draw(box); $('#clearAll', box).onclick = () => { if (box.dataset.locked) return; load(null); draw(box); }; $('#submit', box).onclick = () => submit(); },
        value, markWrong: (box, v) => { load(v); draw(box); q.grids.forEach((_, gi) => { if (!okGrid(gi)) $(`#ad${gi}`, box).classList.add('badf'); }); },
        showAnswer: box => { load(null); q.grids.forEach((g, gi) => { const init = initOf(g); let need = g.req ? g.req.sq : Math.floor(g.target - area(g.init)), half = g.req ? g.req.half : Math.round((g.target - area(g.init) - need) * 2); if (q.distinct && gi === 1) { /* 第二个图换个形状 */ } const order = []; for (let y = 0; y < q.rows; y++) for (let x = 0; x < q.cols; x++) order.push([x, y]); const near = p => g.init.length ? Math.min(...g.init.map(c => Math.abs(c.x - p[0]) + Math.abs(c.y - p[1]))) : (q.distinct && gi === 1 ? Math.abs(p[1] - 1) + Math.abs(p[0] - gi * 2) : p[0] + p[1]); order.sort((a, b) => near(a) - near(b)); for (const p of order) { const k = key(p[0], p[1]); if (init.has(k)) continue; if (need > 0) { st[gi].set(k, 1); need--; } else if (half > 0) { st[gi].set(k, 2); half--; } if (!need && !half) break; } }); box.dataset.locked = '1'; draw(box); $('#submit', box).disabled = true; $('#clearAll', box).disabled = true; },
        lock: box => { box.dataset.locked = '1'; $('#submit', box).disabled = true; $('#clearAll', box).disabled = true; },
        restore: (box, v, status) => { load(v); box.dataset.locked = '1'; draw(box); $('#submit', box).disabled = true; if (status === 'bad') box.querySelectorAll('[id^=ad]').forEach(el => el.classList.add('badf')); },
      },
      hint: { zh: '整格算 1，半格算 ½。看面积数字够不够。', en: 'A whole square is 1, a half square is ½.' },
      answerText: q.grids.map(g => `面积 ${g.target || (area(g.init) + g.req.sq + g.req.half / 2)}`).join(' / '), check,
      answerDisplay: v => { load(v); return q.grids.map((_, gi) => `面积 ${stats(gi).area}`).join(' / '); },
      explainKind: 'l3cellarea', n: { cols: q.cols, rows: q.rows, list: q.grids[0].init.length ? q.grids[0].init : [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 2, h: 'tl' }] },
    };
  };
})();
