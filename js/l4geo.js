/* Level 4 · Unit 6  正方形和长方形：性质、求边长、求角、画图 讲解动画 + 题型 */
(function () {
  const line = t => `<div class="expand-line">${t}</div>`;
  const wrap = (...parts) => `<div class="l1wrap">${parts.join('')}</div>`;
  const $ = (sel, el) => (el || document).querySelector(sel);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const INK = '#2b2b3a', OR = '#ff7f2a', PU = '#6c5ce7';

  /* 带标注的长方形 {w,h,labels:{top,right,bottom,left}, ticks?:bool, hl?:'top'|...} */
  function rectFig(o) {
    const sc = 7, W = o.w * sc, H = o.h * sc, x0 = 50, y0 = 30;
    const lab = o.labels || {}, col = k => o.hl === k ? OR : INK;
    const T = (x, y, t, k, anchor) => t ? `<text x="${x}" y="${y}" font-size="15" font-weight="700" fill="${col(k)}" text-anchor="${anchor || 'middle'}">${esc(t)}</text>` : '';
    let s = `<rect x="${x0}" y="${y0}" width="${W}" height="${H}" fill="#fff" stroke="${INK}" stroke-width="2"/>`;
    if (o.ticks) { const tk = (x, y, v) => v ? `<line x1="${x}" y1="${y - 6}" x2="${x}" y2="${y + 6}" stroke="${INK}" stroke-width="1.5"/>` : `<line x1="${x - 6}" y1="${y}" x2="${x + 6}" y2="${y}" stroke="${INK}" stroke-width="1.5"/>`; s += tk(x0 + W / 2, y0, true) + tk(x0 + W / 2, y0 + H, true) + tk(x0, y0 + H / 2, false) + tk(x0 + W, y0 + H / 2, false); if (o.ticks === 'opp') s = s.replace(tk(x0, y0 + H / 2, false), '').replace(tk(x0 + W, y0 + H / 2, false), ''); }
    s += T(x0 + W / 2, y0 - 10, lab.top, 'top') + T(x0 + W / 2, y0 + H + 20, lab.bottom, 'bottom') + T(x0 - 10, y0 + H / 2 + 5, lab.left, 'left', 'end') + T(x0 + W + 10, y0 + H / 2 + 5, lab.right, 'right', 'start');
    ['top', 'right', 'bottom', 'left'].forEach(k => { if (o.hl === k) { const d = { top: [x0, y0, x0 + W, y0], bottom: [x0, y0 + H, x0 + W, y0 + H], left: [x0, y0, x0, y0 + H], right: [x0 + W, y0, x0 + W, y0 + H] }[k]; s += `<line x1="${d[0]}" y1="${d[1]}" x2="${d[2]}" y2="${d[3]}" stroke="${OR}" stroke-width="5" stroke-linecap="round" opacity=".7"/>`; } });
    return `<svg viewBox="0 0 ${W + 110} ${H + 60}" width="${W + 110}" style="max-width:100%;height:auto">${s}</svg>`;
  }
  /* 组合图形：pts {name:[x,y]}, segs [[a,b,dashed?]], dims [{from,to,text,side:1|-1}] (cm 单位坐标) */
  function compFig(o) {
    const sc = o.sc || 6, P = o.pts, X = p => 40 + P[p][0] * sc, Y = p => 30 + P[p][1] * sc;
    let s = o.segs.map(([a, b, d]) => `<line x1="${X(a)}" y1="${Y(a)}" x2="${X(b)}" y2="${Y(b)}" stroke="${(o.hl || []).some(h => h[0] === a && h[1] === b || h[0] === b && h[1] === a) ? OR : INK}" stroke-width="${(o.hl || []).some(h => h[0] === a && h[1] === b || h[0] === b && h[1] === a) ? 4 : 2}" ${d ? 'stroke-dasharray="5 4"' : ''}/>`).join('');
    Object.keys(P).forEach(n => { const [x, y] = P[n], off = o.lab && o.lab[n] ? o.lab[n] : [0, -8]; s += `<text x="${40 + x * sc + off[0]}" y="${30 + y * sc + off[1]}" font-size="13" font-weight="700" fill="${INK}" text-anchor="middle">${n}</text>`; });
    (o.dims || []).forEach(d => { const [a, b] = [d.from, d.to]; const x1 = X(a), y1 = Y(a), x2 = X(b), y2 = Y(b); const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy), nx = -dy / L * (d.off || 14), ny = dx / L * (d.off || 14); const hl = d.hl ? OR : '#555'; s += `<line x1="${x1 + nx}" y1="${y1 + ny}" x2="${x2 + nx}" y2="${y2 + ny}" stroke="${hl}" stroke-width="1.2" marker-start="url(#da)" marker-end="url(#da)"/><text x="${(x1 + x2) / 2 + nx * 1.9}" y="${(y1 + y2) / 2 + ny * 1.9 + 4}" font-size="12" font-weight="700" fill="${d.hl ? OR : INK}" text-anchor="middle">${esc(d.text)}</text>`; });
    const xs = Object.values(P).map(p => p[0]), ys = Object.values(P).map(p => p[1]);
    const W = 80 + Math.max(...xs) * sc + 40, H = 60 + Math.max(...ys) * sc + 20;
    return `<svg viewBox="-20 -10 ${W} ${H}" width="${Math.min(W, 420)}" style="max-width:100%;height:auto;overflow:visible"><defs><marker id="da" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto-start-reverse"><path d="M0 0 L6 3 L0 6 Z" fill="#555"/></marker></defs>${s}</svg>`;
  }
  /* 角：矩形左上角出发的扇形 {w,h,rot?,square?,wedges:[{v?,label}], hl?:index, showAll?} */
  function cornerFig(o) {
    const W = o.w, H = o.h, rot = o.rot || 0;
    const cx = 150, cy = 130, x0 = cx - W / 2, y0 = cy - H / 2;
    let g = `<rect x="${x0}" y="${y0}" width="${W}" height="${H}" fill="#fff" stroke="${INK}" stroke-width="1.8"/>`;
    if (o.square) { const tk = (x, y, v) => v ? `<line x1="${x}" y1="${y - 5}" x2="${x}" y2="${y + 5}" stroke="${INK}" stroke-width="1.3"/>` : `<line x1="${x - 5}" y1="${y}" x2="${x + 5}" y2="${y}" stroke="${INK}" stroke-width="1.3"/>`; g += tk(x0 + W / 2, y0, true) + tk(x0 + W / 2, y0 + H, true) + tk(x0, y0 + H / 2, false) + tk(x0 + W, y0 + H / 2, false); }
    let cum = 0; const lines = [], arcs = [];
    o.wedges.forEach((wd, i) => { const a0 = cum, v = wd.v !== undefined ? wd.v : o.zval; cum += v; const a1 = cum; const mid = (a0 + a1) / 2; const r = 16 + i * 7; const p = a => { const t = a * Math.PI / 180; return [x0 + r * Math.cos(t), y0 + r * Math.sin(t)]; }; const [ax, ay] = p(a0), [bx, by] = p(a1); const hl = o.hl === i; arcs.push(`<path d="M${ax.toFixed(1)} ${ay.toFixed(1)} A${r} ${r} 0 0 1 ${bx.toFixed(1)} ${by.toFixed(1)}" fill="none" stroke="${hl ? OR : INK}" stroke-width="${hl ? 2.5 : 1.3}"/>`); const t = mid * Math.PI / 180, lr = r + 16; arcs.push(`<text x="${(x0 + lr * Math.cos(t)).toFixed(1)}" y="${(y0 + lr * Math.sin(t) + 4).toFixed(1)}" font-size="12" font-weight="700" fill="${hl ? OR : INK}" text-anchor="middle" transform="rotate(${-rot} ${(x0 + lr * Math.cos(t)).toFixed(1)} ${(y0 + lr * Math.sin(t)).toFixed(1)})">${wd.label}</text>`); if (i < o.wedges.length - 1) { const tt = a1 * Math.PI / 180, dx = Math.cos(tt), dy = Math.sin(tt); const L = Math.min(dx > 1e-6 ? W / dx : 1e9, dy > 1e-6 ? H / dy : 1e9); lines.push(`<line x1="${x0}" y1="${y0}" x2="${(x0 + dx * L).toFixed(1)}" y2="${(y0 + dy * L).toFixed(1)}" stroke="${INK}" stroke-width="1.5"/>`); } });
    g += lines.join('') + arcs.join('');
    return `<svg viewBox="0 0 300 260" width="300" style="max-width:100%;height:auto"><g transform="rotate(${rot} ${cx} ${cy})">${g}</g></svg>`;
  }
  /* 格点/方格纸 n×n（0..n），segs 已给线段，poly 预览点，live 可点 */
  function gridFig(n, o = {}) {
    const u = o.u || 26, pad = 14, X = v => pad + v * u;
    let s = '';
    if (o.dots) { for (let i = 0; i <= n; i++) for (let j = 0; j <= n; j++) s += `<circle cx="${X(i)}" cy="${X(j)}" r="2.2" fill="#555"/>`; }
    else { for (let i = 0; i <= n; i++) s += `<line x1="${X(i)}" y1="${X(0)}" x2="${X(i)}" y2="${X(n)}" stroke="#bbb" stroke-width="1"/><line x1="${X(0)}" y1="${X(i)}" x2="${X(n)}" y2="${X(i)}" stroke="#bbb" stroke-width="1"/>`; }
    if (o.cm) { for (let i = 0; i <= n; i++) s += `<text x="${X(i)}" y="${X(n) + 12}" font-size="9" fill="#888" text-anchor="middle">${i}</text>`; s += `<text x="${X(n) + 8}" y="${X(n) + 12}" font-size="9" fill="#888">cm</text>`; }
    (o.segs || []).forEach(([a, b]) => { s += `<line x1="${X(a[0])}" y1="${X(a[1])}" x2="${X(b[0])}" y2="${X(b[1])}" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/>`; });
    if (o.poly && o.poly.length) { const pts = o.poly; if (pts.length >= 3) s += `<polygon points="${pts.map(p => `${X(p[0])},${X(p[1])}`).join(' ')}" fill="${o.bad ? '#ffe3e3' : '#efeafd'}" fill-opacity=".6" stroke="${o.bad ? '#e74c3c' : o.answer ? '#1a7f37' : PU}" stroke-width="2.5" stroke-linejoin="round"/>`; pts.forEach(p => { s += `<circle cx="${X(p[0])}" cy="${X(p[1])}" r="5" fill="${PU}"/>`; }); }
    (o.fixed || []).forEach(p => { s += `<circle cx="${X(p[0])}" cy="${X(p[1])}" r="4.5" fill="${INK}"/>`; });
    (o.names || []).forEach(nm => { s += `<text x="${X(nm.p[0]) + (nm.dx || 0)}" y="${X(nm.p[1]) + (nm.dy || -8)}" font-size="13" font-weight="700" fill="${INK}" text-anchor="middle">${nm.t}</text>`; });
    if (o.live) for (let i = 0; i <= n; i++) for (let j = 0; j <= n; j++) s += `<circle class="gpt" data-x="${i}" data-y="${j}" cx="${X(i)}" cy="${X(j)}" r="${u * 0.42}" fill="transparent" style="cursor:pointer"/>`;
    const S = pad * 2 + n * u + (o.cm ? 14 : 0);
    return `<svg class="gridfig" viewBox="0 0 ${S + (o.cm ? 20 : 0)} ${S}" width="${Math.min(S + (o.cm ? 20 : 0), 330)}" style="max-width:100%;height:auto">${s}</svg>`;
  }
  /* 几何判定 */
  const orderPts = pts => { const cx = pts.reduce((a, p) => a + p[0], 0) / pts.length, cy = pts.reduce((a, p) => a + p[1], 0) / pts.length; return pts.slice().sort((a, b) => Math.atan2(a[1] - cy, a[0] - cx) - Math.atan2(b[1] - cy, b[0] - cx)); };
  const same = (a, b) => a[0] === b[0] && a[1] === b[1];
  function classify(pts) {
    if (pts.length !== 4) return null;
    const o = orderPts(pts); const e = o.map((p, i) => { const q = o[(i + 1) % 4]; return [q[0] - p[0], q[1] - p[1]]; });
    for (let i = 0; i < 4; i++) { if (e[i][0] * e[(i + 1) % 4][0] + e[i][1] * e[(i + 1) % 4][1] !== 0) return null; if (!e[i][0] && !e[i][1]) return null; }
    const L = e.map(v => Math.hypot(v[0], v[1]));
    if (Math.abs(L[0] - L[2]) > 1e-9 || Math.abs(L[1] - L[3]) > 1e-9) return null;
    return { ordered: o, sides: [L[0], L[1]], square: Math.abs(L[0] - L[1]) < 1e-9 };
  }
  const adjacent = (o, a, b) => o.some((p, i) => same(p, a) && same(o[(i + 1) % 4], b) || same(p, b) && same(o[(i + 1) % 4], a));

  const S = window.StepKinds;
  const PROPS = { sides: 'It has four sides.', para: 'It has two pairs of parallel lines.', right: 'All four angles are right angles.', opp: 'Its opposite sides are equal.', equal: 'All four sides are equal.' };
  /* l4props：{kind:'square'|'rectangle', fig} */
  S.l4props = ({ kind, fig }) => { const sq = kind === 'square'; return [
    { zh: `看这个图形：四条边、四个角都是直角。${sq ? '量一量，<b>四条边一样长</b>，是<b>正方形（square）</b>。' : '上下两条边一样长，左右两条边一样长，但<b>长和宽不一样</b>，是<b>长方形（rectangle）</b>。'}`, en: sq ? 'All four sides are equal: a square.' : 'Opposite sides are equal but length ≠ breadth: a rectangle.', render: s => { s.innerHTML = wrap(`<div class="center">${fig}</div>`, line(kind)); } },
    { zh: `${sq ? '正方形' : '长方形'}的性质：${(sq ? ['sides', 'equal', 'para', 'right'] : ['sides', 'para', 'right', 'opp']).map(k => `<b>${PROPS[k]}</b>`).join(' ')}。写出其中任意两条就可以。`, en: 'Any two of these properties.', render: s => { s.innerHTML = wrap(`<div class="center">${fig}</div>`, ...(sq ? ['sides', 'equal', 'para', 'right'] : ['sides', 'para', 'right', 'opp']).map(k => `<div class="expand-line" style="font-size:20px">✓ ${PROPS[k]}</div>`)); } },
  ]; };
  /* l4rectside：{w,h,square,mode:'opp'|'times'|'sum4'|'sum2', given, k, x, y, labels} */
  S.l4rectside = q => {
    const fig = (hl, lab) => `<div class="center">${rectFig({ w: q.w, h: q.h, ticks: q.square ? true : false, labels: lab || q.labels, hl })}</div>`;
    const steps = [];
    if (q.mode === 'opp') steps.push({ zh: `这是长方形：<b>对边相等</b>（opposite sides are equal）。x 对面的边是 ${q.x} cm，所以 x = <b>${q.x}</b>；y 对面的边是 ${q.y} cm，所以 y = <b>${q.y}</b>。`, en: `Opposite sides are equal: x = ${q.x}, y = ${q.y}.`, render: s => { s.innerHTML = wrap(fig('right', q.labels), line(`x = ${q.x} cm，y = ${q.y} cm`)); } });
    if (q.mode === 'times') steps.push({ zh: `长是宽的 ${q.k} 倍。${q.given.what === 'length' ? `长 = ${q.given.v}，宽 = ${q.given.v} ÷ ${q.k} = <b>${q.given.v / q.k}</b>` : `宽 = ${q.given.v}，长 = ${q.given.v} × ${q.k} = <b>${q.given.v * q.k}</b>`}。再用对边相等：x = <b>${q.x}</b>，y = <b>${q.y}</b>。`, en: `Length = ${q.k} × breadth. x = ${q.x}, y = ${q.y}.`, render: s => { s.innerHTML = wrap(fig(), line(q.given.what === 'length' ? `${q.given.v} ÷ ${q.k} = ${q.given.v / q.k}` : `${q.given.v} × ${q.k} = ${q.given.v * q.k}`), line(`x = ${q.x} cm，y = ${q.y} cm`)); } });
    if (q.mode === 'sum4') steps.push({ zh: `正方形<b>四条边相等</b>。四条边加起来是 ${q.given.v} cm，一条边 = ${q.given.v} ÷ 4 = <b>${q.x}</b> cm。所以 x = y = <b>${q.x}</b>。`, en: `${q.given.v} ÷ 4 = ${q.x}.`, render: s => { s.innerHTML = wrap(fig(), line(`${q.given.v} ÷ 4 = ${q.x}`), line(`x = y = ${q.x} cm`)); } });
    if (q.mode === 'sum2') steps.push({ zh: `正方形四条边相等。两条边加起来是 ${q.given.v} cm，一条边 = ${q.given.v} ÷ 2 = <b>${q.x}</b> cm。所以 x = y = <b>${q.x}</b>。`, en: `${q.given.v} ÷ 2 = ${q.x}.`, render: s => { s.innerHTML = wrap(fig(), line(`${q.given.v} ÷ 2 = ${q.x}`), line(`x = y = ${q.x} cm`)); } });
    if (q.mode === 'sq') steps.push({ zh: `这是正方形（边上有小记号表示相等）：<b>四条边都一样长</b>，都是 ${q.x} cm。所以 x = <b>${q.x}</b>，y = <b>${q.y}</b>。`, en: `A square has four equal sides: x = y = ${q.x}.`, render: s => { s.innerHTML = wrap(fig(), line(`x = y = ${q.x} cm`)); } });
    return [{ zh: `先看图形：${q.square ? '边上有小记号，四条边相等，是<b>正方形</b>' : '是<b>长方形</b>，对边相等'}。再看已知的边和条件。`, en: q.square ? 'A square.' : 'A rectangle.', render: s => { s.innerHTML = wrap(fig()); } }].concat(steps);
  };
  /* l4comp：组合图形 {fig(o), steps:[{zh,en,expr,hl}], ans} */
  S.l4comp = q => [{ zh: '先看图：标出已知的长度，想一想要求的边由哪几段组成，或者和哪条边一样长。', en: 'Look at the given lengths.', render: s => { s.innerHTML = wrap(`<div class="center">${q.fig({})}</div>`); } }].concat(q.steps.map((st, i) => ({ zh: st.zh, en: st.en || st.expr, render: s => { s.innerHTML = wrap(`<div class="center">${q.fig({ hl: st.hl })}</div>`, ...q.steps.slice(0, i + 1).map((x, j) => line(j === i ? `<b>${x.expr}</b>` : x.expr))); } })));
  /* l4cornerang：{w,h,rot,square,wedges,zval} */
  S.l4cornerang = q => { const given = q.wedges.filter(w => w.v !== undefined).map(w => w.v), zi = q.wedges.findIndex(w => w.v === undefined); return [
    { zh: `${q.square ? '正方形' : '长方形'}的每个角都是<b>直角 90°</b>。这个角被分成了 ${q.wedges.length} 份：${q.wedges.map(w => w.label).join('、')}，加起来正好 90°。`, en: 'Each corner is 90°. The parts add up to 90°.', render: s => { s.innerHTML = wrap(`<div class="center">${cornerFig(q)}</div>`, line(`${q.wedges.map(w => w.label).join(' + ')} = 90°`)); } },
    { zh: `所以 ∠z = 90° − ${given.join('° − ')}° = <b>${q.zval}°</b>。`, en: `∠z = 90° − ${given.join('° − ')}° = ${q.zval}°.`, render: s => { s.innerHTML = wrap(`<div class="center">${cornerFig(Object.assign({}, q, { hl: zi }))}</div>`, line(`90° − ${given.join('° − ')}° = ${q.zval}°`)); } },
  ]; };
  /* l4drawsq：{n, dots, segs, kind, answer, sides?} */
  S.l4drawsq = q => { const sq = q.kind === 'square'; const fixed = [...new Set(q.segs.flat().map(p => p.join(',')))].map(s => s.split(',').map(Number)); return [
    { zh: q.sides ? `要画${sq ? '正方形' : '长方形'}，边长 ${q.sides.join(' cm 和 ')} cm。在方格纸上一格是 1 cm，数格子画。` : `已经给了${q.segs.length === 1 ? '一条边' : '两条边'}。${sq ? '正方形<b>四条边一样长</b>，相邻的边<b>互相垂直</b>' : '长方形<b>对边一样长</b>，相邻的边<b>互相垂直</b>'}。`, en: sq ? 'All sides equal, all corners right angles.' : 'Opposite sides equal, all corners right angles.', render: s => { s.innerHTML = wrap(`<div class="center">${gridFig(q.n, { dots: q.dots, segs: q.segs, fixed, cm: !!q.sides })}</div>`); } },
    { zh: q.segs.length ? (q.segs[0][0][0] !== q.segs[0][1][0] && q.segs[0][0][1] !== q.segs[0][1][1] ? `给的边是斜的：从一端到另一端走了 ${Math.abs(q.segs[0][1][0] - q.segs[0][0][0])} 格和 ${Math.abs(q.segs[0][1][1] - q.segs[0][0][1])} 格。要画垂直的边，把这两个数<b>换一下</b>（横的变竖的），从两端各画一条同样的斜线。` : `从给的边的两端，各画一条<b>垂直</b>的边${sq ? '，长度和给的边一样' : ''}，再把末端连起来。`) : `先画一条边，再在两端画垂直的边${sq ? '，一样长' : ''}，最后连起来。`, en: 'Draw perpendicular sides from both ends, then join.', render: s => { s.innerHTML = wrap(`<div class="center">${gridFig(q.n, { dots: q.dots, segs: q.segs, fixed, poly: q.answer, answer: true, cm: !!q.sides })}</div>`, line(sq ? 'square' : 'rectangle')); } },
  ]; };

  /* ---------- 题型 l4drawpoly：点格点画正方形/长方形 q={n,dots?,segs,kind:'square'|'rect',sides?:[a,b],answer,cm?,names?} ---------- */
  window.QTypes.l4drawpoly = q => {
    const fixed = [...new Set(q.segs.flat().map(p => p.join(',')))].map(s => s.split(',').map(Number)); let picked = [];
    const need = 4 - fixed.length;
    const all = () => fixed.concat(picked);
    const draw = (box, o) => { const host = $('#gf', box); const pts = all(); const c = pts.length === 4 ? classify(pts) : null; host.innerHTML = gridFig(q.n, Object.assign({ dots: q.dots, segs: q.segs, fixed, poly: pts.length === 4 ? (c ? c.ordered : orderPts(pts)) : picked, live: !box.dataset.locked, cm: q.cm, names: q.names }, o || {})); host.querySelectorAll('.gpt').forEach(cc => cc.onclick = () => { if (box.dataset.locked) return; const p = [+cc.dataset.x, +cc.dataset.y]; if (fixed.some(f => same(f, p))) return; const i = picked.findIndex(x => same(x, p)); if (i >= 0) picked.splice(i, 1); else if (picked.length < need) picked.push(p); draw(box); $('#submit', box).disabled = picked.length !== need; }); };
    const valid = pts => { const c = classify(pts); if (!c) return false; if (q.kind === 'square' && !c.square) return false; if (q.kind === 'oblong' && c.square) return false; if (!q.segs.every(([a, b]) => adjacent(c.ordered, a, b))) return false; if (q.sides) { const s = c.sides.slice().sort((x, y) => x - y), r = q.sides.slice().sort((x, y) => x - y); if (Math.abs(s[0] - r[0]) > 1e-9 || Math.abs(s[1] - r[1]) > 1e-9) return false; } return true; };
    const parse = v => { try { return JSON.parse(v || '[]'); } catch (e) { return []; } };
    return {
      prompt: q.prompt || { zh: q.sides ? `画一个${q.kind === 'square' ? '正方形' : '长方形'}${q.names ? ' ' + q.names.map(x => x.t).join('') : ''}，边长 ${q.sides.join(' cm、')} cm` : `${q.segs.length ? '用给出的线作为边，' : ''}画一个${q.kind === 'square' ? '正方形' : '长方形'}`, en: q.sides ? `Draw a ${q.kind === 'square' ? 'square' : 'rectangle'} with sides ${q.sides.join(' cm and ')} cm` : `Draw a ${q.kind === 'square' ? 'square' : 'rectangle'}${q.segs.length ? ' from the given line' + (q.segs.length > 1 ? 's' : '') : ''}` },
      stage: '',
      custom: {
        html: () => `<div class="center"><div id="gf"></div><div class="sub">👆 点${need}个格点作为${q.segs.length ? '剩下的' : ''}顶点（再点一次取消）${q.dots ? '' : '，一格 = 1 cm'}</div><div class="center mt"><button type="button" class="btn secondary small" id="clearAll">清空</button> <button class="btn ok" id="submit" disabled>检查 ✔</button></div></div>`,
        bind: (box, submit) => { delete box.dataset.locked; picked = []; draw(box); $('#clearAll', box).onclick = () => { if (box.dataset.locked) return; picked = []; draw(box); $('#submit', box).disabled = true; }; $('#submit', box).onclick = () => submit(); },
        value: () => picked.length === need ? JSON.stringify(picked) : null,
        markWrong: (box, val) => { picked = parse(val); draw(box, { bad: true }); setTimeout(() => { if (!box.dataset.locked) { picked = []; draw(box); $('#submit', box).disabled = true; } }, 1300); },
        showAnswer: box => { box.dataset.locked = '1'; picked = q.answer.filter(p => !fixed.some(f => same(f, p))); draw(box, { answer: true }); $('#submit', box).disabled = true; $('#clearAll', box).disabled = true; },
        lock: box => { box.dataset.locked = '1'; draw(box, { answer: true }); $('#submit', box).disabled = true; $('#clearAll', box).disabled = true; },
        restore: (box, val, status) => { box.dataset.locked = '1'; picked = parse(val); if (picked.length !== need) picked = q.answer.filter(p => !fixed.some(f => same(f, p))); draw(box, status === 'bad' ? { bad: true } : { answer: true }); $('#submit', box).disabled = true; $('#clearAll', box).disabled = true; },
      },
      hint: q.hint || { zh: q.kind === 'square' ? '四条边一样长，相邻两条边互相垂直。斜线的话把"横几格、竖几格"换过来画。' : '对边一样长，四个角都是直角。', en: 'Perpendicular sides; equal sides for a square.' },
      answerText: `${q.kind === 'square' ? '正方形' : '长方形'} ${q.answer.map(p => `(${p})`).join('')}`,
      check: v => valid(fixed.concat(parse(v))),
      answerDisplay: v => parse(v).map(p => `(${p})`).join(''),
      explainKind: 'l4drawsq', n: { n: q.n, dots: q.dots, segs: q.segs, kind: q.kind, answer: q.answer, sides: q.sides },
    };
  };
  window.L4GEO = { rectFig, compFig, cornerFig, gridFig, classify, PROPS };
})();
