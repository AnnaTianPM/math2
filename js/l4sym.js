/* Level 4 · Unit 7  对称：字母、对称轴、补全对称图形和图案 */
(function () {
  const line = t => `<div class="expand-line">${t}</div>`;
  const wrap = (...parts) => `<div class="l1wrap">${parts.join('')}</div>`;
  const $ = (sel, el) => (el || document).querySelector(sel);
  const INK = '#2b2b3a', OR = '#ff7f2a', PU = '#6c5ce7';
  const DASH = (x1, y1, x2, y2, c) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c || INK}" stroke-width="1.6" stroke-dasharray="6 4"/>`;

  /* 大字母 SVG（o.lines=[['v']|['h']|['v','h']] 画对称轴） */
  function letterSVG(ch, o = {}) {
    let s = `<text x="60" y="98" font-size="112" font-family="Arial, Helvetica, sans-serif" font-weight="700" text-anchor="middle" fill="#bdbdbd" stroke="${INK}" stroke-width="2">${ch}</text>`;
    (o.lines || []).forEach(k => { s += k === 'v' ? DASH(60, 4, 60, 116, OR) : k === 'h' ? DASH(4, 60, 116, 60, OR) : ''; });
    return `<svg viewBox="0 0 120 120" width="${o.w || 120}" style="max-width:100%;height:auto">${s}</svg>`;
  }
  /* 图形 + 虚线：shape 为 path d（0..100 坐标），axis 'v'|'h'，可选 mirror 翻转演示 */
  function figSVG(d, o = {}) {
    let s = `<path d="${d}" fill="${o.fill || '#fff'}" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>`;
    if (o.ghost) s += `<path d="${d}" fill="#ffe3c2" fill-opacity=".8" stroke="${OR}" stroke-width="2" stroke-dasharray="4 3" transform="${o.axis === 'v' ? 'translate(100 0) scale(-1 1)' : 'translate(0 100) scale(1 -1)'}"/>`;
    if (o.axis) s += o.axis === 'v' ? DASH(50, -6, 50, 106) : DASH(-6, 50, 106, 50);
    (o.lines || []).forEach(l => { s += DASH(l[0], l[1], l[2], l[3], l[4] || OR); });
    return `<svg viewBox="-8 -8 116 116" width="${o.w || 150}" style="max-width:100%;height:auto;overflow:visible">${s}</svg>`;
  }
  /* 对称图形：可点候选线 */
  function linesSVG(d, cands, o = {}) {
    let s = `<path d="${d}" fill="#fff" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>`;
    cands.forEach((c, i) => { const on = (o.on || []).includes(i), mark = o.marks && o.marks[i]; const col = mark === 'right' ? '#1a7f37' : mark === 'wrong' ? '#e74c3c' : on ? OR : '#bbb'; s += `<line x1="${c[0]}" y1="${c[1]}" x2="${c[2]}" y2="${c[3]}" stroke="${col}" stroke-width="${on || mark ? 2.6 : 1.4}" stroke-dasharray="6 4"/>`; if (o.live) s += `<line class="cand" data-i="${i}" x1="${c[0]}" y1="${c[1]}" x2="${c[2]}" y2="${c[3]}" stroke="transparent" stroke-width="14" style="cursor:pointer"/>`; });
    return `<svg viewBox="-12 -12 124 124" width="${o.w || 190}" style="max-width:100%;height:auto;overflow:visible">${s}</svg>`;
  }
  /* 网格 + 折线 + 轴 + 点 */
  function gridPaths(cols, rows, axis, o = {}) {
    const u = o.u || 24, pad = 14, X = v => pad + v * u;
    let s = '';
    for (let i = 0; i <= cols; i++) s += `<line x1="${X(i)}" y1="${X(0)}" x2="${X(i)}" y2="${X(rows)}" stroke="#ccc" stroke-width="1"/>`;
    for (let j = 0; j <= rows; j++) s += `<line x1="${X(0)}" y1="${X(j)}" x2="${X(cols)}" y2="${X(j)}" stroke="#ccc" stroke-width="1"/>`;
    const pl = (paths, col, w) => paths.map(p => `<polyline points="${p.map(q => `${X(q[0])},${X(q[1])}`).join(' ')}" fill="none" stroke="${col}" stroke-width="${w || 2.5}" stroke-linejoin="round" stroke-linecap="round"/>`).join('');
    s += pl(o.paths || [], INK);
    if (o.mirror) s += pl(o.mirror, o.mirrorColor || OR);
    s += axis.v !== undefined ? DASH(X(axis.v), X(0) - 8, X(axis.v), X(rows) + 8) : DASH(X(0) - 8, X(axis.h), X(cols) + 8, X(axis.h));
    (o.picked || []).forEach(p => { s += `<circle cx="${X(p[0])}" cy="${X(p[1])}" r="5" fill="${o.bad ? '#e74c3c' : PU}"/>`; });
    (o.dots || []).forEach(p => { s += `<circle cx="${X(p[0])}" cy="${X(p[1])}" r="3.5" fill="${INK}"/>`; });
    if (o.live) for (let i = 0; i <= cols; i++) for (let j = 0; j <= rows; j++) s += `<circle class="gpt" data-x="${i}" data-y="${j}" cx="${X(i)}" cy="${X(j)}" r="${u * 0.4}" fill="transparent" style="cursor:pointer"/>`;
    return `<svg class="gridfig" viewBox="0 0 ${pad * 2 + cols * u} ${pad * 2 + rows * u}" width="${Math.min(pad * 2 + cols * u, 340)}" style="max-width:100%;height:auto;overflow:visible">${s}</svg>`;
  }
  /* 格子图案：cells {"c,r": 1|'tl'|'tr'|'bl'|'br'} */
  function gridCells(cols, rows, axis, cells, o = {}) {
    const u = o.u || 26, pad = 12, X = v => pad + v * u;
    let s = '';
    const tri = (c, r, k) => { const x = X(c), y = X(r); const P = { tl: `${x},${y} ${x + u},${y} ${x},${y + u}`, tr: `${x},${y} ${x + u},${y} ${x + u},${y + u}`, bl: `${x},${y} ${x + u},${y + u} ${x},${y + u}`, br: `${x + u},${y} ${x + u},${y + u} ${x},${y + u}` }[k]; return `<polygon points="${P}" fill="${o.color || '#a9a9a9'}"/>`; };
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { const k = cells[`${c},${r}`]; const given = o.given && o.given[`${c},${r}`] !== undefined; const mk = o.marks && o.marks[`${c},${r}`]; if (k === 1) s += `<rect x="${X(c)}" y="${X(r)}" width="${u}" height="${u}" fill="${mk === 'wrong' ? '#f5a3a3' : given || !o.live ? '#a9a9a9' : '#8f7fe8'}"/>`; else if (k) s += tri(c, r, k).replace('#a9a9a9', mk === 'wrong' ? '#f5a3a3' : given || !o.live ? '#a9a9a9' : '#8f7fe8'); if (mk === 'missing') s += `<rect x="${X(c) + 3}" y="${X(r) + 3}" width="${u - 6}" height="${u - 6}" fill="none" stroke="#e74c3c" stroke-width="2" stroke-dasharray="3 2"/>`; }
    for (let i = 0; i <= cols; i++) s += `<line x1="${X(i)}" y1="${X(0)}" x2="${X(i)}" y2="${X(rows)}" stroke="#888" stroke-width="1"/>`;
    for (let j = 0; j <= rows; j++) s += `<line x1="${X(0)}" y1="${X(j)}" x2="${X(cols)}" y2="${X(j)}" stroke="#888" stroke-width="1"/>`;
    s += axis.v !== undefined ? DASH(X(axis.v), X(0) - 8, X(axis.v), X(rows) + 8) : DASH(X(0) - 8, X(axis.h), X(cols) + 8, X(axis.h));
    if (o.live) for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) s += `<rect class="cellhit" data-c="${c}" data-r="${r}" x="${X(c)}" y="${X(r)}" width="${u}" height="${u}" fill="transparent" style="cursor:pointer"/>`;
    return `<svg class="gridfig" viewBox="0 0 ${pad * 2 + cols * u} ${pad * 2 + rows * u}" width="${Math.min(pad * 2 + cols * u, 340)}" style="max-width:100%;height:auto;overflow:visible">${s}</svg>`;
  }
  const mirrorPt = (p, axis) => axis.v !== undefined ? [2 * axis.v - p[0], p[1]] : [p[0], 2 * axis.h - p[1]];
  const onAxis = (p, axis) => axis.v !== undefined ? p[0] === axis.v : p[1] === axis.h;
  const flipK = (k, axis) => k === 1 ? 1 : axis.v !== undefined ? { tl: 'tr', tr: 'tl', bl: 'br', br: 'bl' }[k] : { tl: 'bl', bl: 'tl', tr: 'br', br: 'tr' }[k];
  const mirrorCell = (key, axis) => { const [c, r] = key.split(',').map(Number); return axis.v !== undefined ? `${2 * axis.v - 1 - c},${r}` : `${c},${2 * axis.h - 1 - r}`; };
  const sameP = (a, b) => a[0] === b[0] && a[1] === b[1];

  const S = window.StepKinds;
  /* l4letter：{ch, lines:[]} */
  S.l4letter = ({ ch, lines }) => [
    { zh: `对称（symmetric）的意思是：沿一条线<b>对折</b>，两边正好<b>完全重合</b>。试着在字母 ${ch} 上找这样的线：竖着折？横着折？`, en: 'A figure is symmetric if it folds exactly onto itself along a line.', render: s => { s.innerHTML = wrap(`<div class="center">${letterSVG(ch, { w: 160 })}</div>`); } },
    lines.length ? { zh: `${ch} ${lines.includes('v') && lines.includes('h') ? '竖着折、横着折都能重合，有两条对称轴' : lines.includes('v') ? '<b>竖着折</b>左右正好重合' : '<b>横着折</b>上下正好重合'}，所以是对称的：<b>Yes</b>。`, en: 'Yes, it is symmetric.', render: s => { s.innerHTML = wrap(`<div class="center">${letterSVG(ch, { w: 160, lines })}</div>`, line('Yes')); } }
      : { zh: `${ch} 怎么折都不能重合（竖着折左右不一样，横着折上下不一样），不对称：<b>No</b>。`, en: 'No line of symmetry: No.', render: s => { s.innerHTML = wrap(`<div class="center">${letterSVG(ch, { w: 160, lines: ['v', 'h'] })}</div>`, line('No')); } },
  ];
  /* l4dotline：{d, axis, yes} */
  S.l4dotline = ({ d, axis, yes }) => [
    { zh: `虚线是不是<b>对称轴</b>（line of symmetry）？想象沿虚线把图<b>对折</b>，看另一边能不能完全盖住。`, en: 'Fold along the dotted line. Does one half cover the other exactly?', render: s => { s.innerHTML = wrap(`<div class="center">${figSVG(d, { axis, w: 200 })}</div>`); } },
    { zh: yes ? `把一半翻过去（橙色），和另一半<b>完全重合</b>，所以虚线是对称轴：<b>Yes</b>。` : `把一半翻过去（橙色），和另一半<b>对不上</b>，所以虚线不是对称轴：<b>No</b>。`, en: yes ? 'They match: Yes.' : 'They do not match: No.', render: s => { s.innerHTML = wrap(`<div class="center">${figSVG(d, { axis, ghost: true, w: 200 })}</div>`, line(yes ? 'Yes' : 'No')); } },
  ];
  /* l4symlines：{d, cands, answer} */
  S.l4symlines = ({ d, cands, answer }) => [
    { zh: `找对称轴：沿哪条线对折，两边能完全重合？一条一条试。${answer.length > 1 ? '有的图形不止一条。' : ''}`, en: 'Try each line: does the figure fold onto itself?', render: s => { s.innerHTML = wrap(`<div class="center">${linesSVG(d, cands, { w: 220 })}</div>`); } },
    { zh: `能重合的是橙色这 <b>${answer.length}</b> 条，其他的折过去对不上。`, en: `${answer.length} line${answer.length > 1 ? 's' : ''} of symmetry.`, render: s => { s.innerHTML = wrap(`<div class="center">${linesSVG(d, cands, { on: answer, w: 220 })}</div>`, line(`${answer.length} 条对称轴`)); } },
  ];
  /* l4mirror：{cols, rows, axis, paths} */
  S.l4mirror = ({ cols, rows, axis, paths }) => { const mir = paths.map(p => p.map(q => mirrorPt(q, axis))); const pts = [...new Set(paths.flat().filter(p => !onAxis(p, axis)).map(p => p.join(',')))].map(s => s.split(',').map(Number)); return [
    { zh: `虚线是对称轴。要补的另一半和这一半<b>一模一样，只是翻过去</b>。先找这一半的每个<b>顶点</b>。`, en: 'Find each vertex of the given half.', render: s => { s.innerHTML = wrap(`<div class="center">${gridPaths(cols, rows, axis, { paths, dots: pts })}</div>`); } },
    { zh: `每个顶点到虚线有几格，对面就数几格，点出<b>对应的点</b>（在虚线上的点不用动）。`, en: 'Each point goes across the line, the same distance away.', render: s => { s.innerHTML = wrap(`<div class="center">${gridPaths(cols, rows, axis, { paths, dots: pts, picked: pts.map(p => mirrorPt(p, axis)) })}</div>`); } },
    { zh: `把对应的点按同样的顺序连起来，图形就完整了。`, en: 'Join the points in the same order.', render: s => { s.innerHTML = wrap(`<div class="center">${gridPaths(cols, rows, axis, { paths, mirror: mir })}</div>`); } },
  ]; };
  /* l4pattern：{cols, rows, axis, given} */
  S.l4pattern = ({ cols, rows, axis, given }) => { const full = Object.assign({}, given); Object.keys(given).forEach(k => { full[mirrorCell(k, axis)] = flipK(given[k], axis); }); const hasTri = Object.values(given).some(v => v !== 1); return [
    { zh: `虚线是对称轴，另一边要涂成<b>镜子里的样子</b>：离虚线第 1 列（行）对第 1 列（行），第 2 对第 2……一格一格对着涂。`, en: 'Mirror the pattern across the dotted line, column by column.', render: s => { s.innerHTML = wrap(`<div class="center">${gridCells(cols, rows, axis, given)}</div>`); } },
    ...(hasTri ? [{ zh: `半格（三角形）翻过去时方向也要<b>翻转</b>：${axis.v !== undefined ? '左右调换，涂左边变成涂右边' : '上下调换，涂上面变成涂下面'}。`, en: 'Half-shaded cells flip too.', render: s => { s.innerHTML = wrap(`<div class="center">${gridCells(cols, rows, axis, given)}</div>`); } }] : []),
    { zh: `涂好的样子：两边沿虚线对折能完全重合。`, en: 'The completed pattern.', render: s => { s.innerHTML = wrap(`<div class="center">${gridCells(cols, rows, axis, full)}</div>`); } },
  ]; };

  /* ---------- 题型 l4symlines：点候选线 ---------- */
  window.QTypes.l4symlines = q => {
    let on = new Set();
    const draw = (box, o) => { const host = $('#sl', box); host.innerHTML = linesSVG(q.d, q.cands, Object.assign({ on: [...on], live: !box.dataset.locked, w: 230 }, o || {})); host.querySelectorAll('.cand').forEach(c => c.onclick = () => { if (box.dataset.locked) return; const i = +c.dataset.i; on.has(i) ? on.delete(i) : on.add(i); draw(box); }); };
    const parse = v => { try { return JSON.parse(v || '[]'); } catch (e) { return []; } };
    const marksFor = sel => { const m = {}; q.cands.forEach((_, i) => { if (sel.includes(i)) m[i] = q.answer.includes(i) ? 'right' : 'wrong'; }); return m; };
    return {
      prompt: { zh: '点出所有的对称轴（虚线）', en: 'Mark all the lines of symmetry' }, stage: '',
      custom: {
        html: () => `<div class="center"><div id="sl"></div><div class="sub">👆 点虚线选中（变橙色），再点一次取消；可能不止一条</div><div class="center mt"><button type="button" class="btn secondary small" id="clearAll">清空</button> <button class="btn ok" id="submit">检查 ✔</button></div></div>`,
        bind: (box, submit) => { delete box.dataset.locked; on = new Set(); draw(box); $('#clearAll', box).onclick = () => { if (box.dataset.locked) return; on = new Set(); draw(box); }; $('#submit', box).onclick = () => submit(); },
        value: () => on.size ? JSON.stringify([...on].sort((a, b) => a - b)) : null,
        markWrong: (box, val) => { on = new Set(parse(val)); draw(box, { marks: marksFor(parse(val)) }); setTimeout(() => { if (!box.dataset.locked) { on = new Set(); draw(box); } }, 1300); },
        showAnswer: box => { box.dataset.locked = '1'; on = new Set(q.answer); draw(box); $('#submit', box).disabled = true; $('#clearAll', box).disabled = true; },
        lock: box => { box.dataset.locked = '1'; draw(box); $('#submit', box).disabled = true; $('#clearAll', box).disabled = true; },
        restore: (box, val, status) => { box.dataset.locked = '1'; const sel = parse(val); on = new Set(sel.length ? sel : q.answer); draw(box, status === 'bad' ? { marks: marksFor(sel) } : {}); $('#submit', box).disabled = true; $('#clearAll', box).disabled = true; },
      },
      hint: { zh: '沿这条线对折，两边能不能完全重合？', en: 'Fold along the line: do the halves match?' },
      answerText: `${q.answer.length} 条`, check: v => { const a = parse(v); return a.length === q.answer.length && q.answer.every(i => a.includes(i)); }, answerDisplay: v => `${parse(v).length} 条`,
      explainKind: 'l4symlines', n: { d: q.d, cands: q.cands, answer: q.answer },
    };
  };
  /* ---------- 题型 l4mirror：点出对称的顶点 q={cols,rows,axis,paths} ---------- */
  window.QTypes.l4mirror = q => {
    const srcPts = [...new Set(q.paths.flat().filter(p => !onAxis(p, q.axis)).map(p => p.join(',')))].map(s => s.split(',').map(Number));
    const want = srcPts.map(p => mirrorPt(p, q.axis)); let picked = [];
    const draw = (box, o) => { const host = $('#mg', box); host.innerHTML = gridPaths(q.cols, q.rows, q.axis, Object.assign({ paths: q.paths, picked, live: !box.dataset.locked }, o || {})); host.querySelectorAll('.gpt').forEach(c => c.onclick = () => { if (box.dataset.locked) return; const p = [+c.dataset.x, +c.dataset.y]; if (onAxis(p, q.axis) || (q.axis.v !== undefined ? Math.sign(p[0] - q.axis.v) !== Math.sign(want[0][0] - q.axis.v) : Math.sign(p[1] - q.axis.h) !== Math.sign(want[0][1] - q.axis.h))) return; const i = picked.findIndex(x => sameP(x, p)); if (i >= 0) picked.splice(i, 1); else picked.push(p); draw(box); $('#cnt', box).textContent = picked.length; }); };
    const parse = v => { try { return JSON.parse(v || '[]'); } catch (e) { return []; } };
    const ok = pts => pts.length === want.length && want.every(w => pts.some(p => sameP(p, w)));
    const mir = q.paths.map(p => p.map(x => mirrorPt(x, q.axis)));
    return {
      prompt: { zh: '补全对称图形：点出另一半的所有顶点', en: 'Complete the symmetric figure: mark every vertex of the other half' }, stage: '',
      custom: {
        html: () => `<div class="center"><div id="mg"></div><div class="sub">👆 在虚线另一边点格点，标出每个顶点对应的位置（已点 <b id="cnt">0</b> 个，一共要 ${want.length} 个）</div><div class="center mt"><button type="button" class="btn secondary small" id="clearAll">清空</button> <button class="btn ok" id="submit">检查 ✔</button></div></div>`,
        bind: (box, submit) => { delete box.dataset.locked; picked = []; draw(box); $('#clearAll', box).onclick = () => { if (box.dataset.locked) return; picked = []; draw(box); $('#cnt', box).textContent = 0; }; $('#submit', box).onclick = () => submit(); },
        value: () => picked.length ? JSON.stringify(picked) : null,
        markWrong: (box, val) => { picked = parse(val); draw(box, { bad: true }); setTimeout(() => { if (!box.dataset.locked) { picked = []; draw(box); $('#cnt', box).textContent = 0; } }, 1300); },
        showAnswer: box => { box.dataset.locked = '1'; picked = []; draw(box, { mirror: mir, picked: want }); $('#submit', box).disabled = true; $('#clearAll', box).disabled = true; },
        lock: box => { box.dataset.locked = '1'; draw(box, { mirror: mir, picked: [] }); $('#submit', box).disabled = true; $('#clearAll', box).disabled = true; },
        restore: (box, val, status) => { box.dataset.locked = '1'; picked = parse(val); draw(box, status === 'bad' ? { bad: true } : { mirror: mir, picked: [] }); $('#submit', box).disabled = true; $('#clearAll', box).disabled = true; },
      },
      hint: { zh: '每个顶点离虚线几格，对面就数几格点一个点；在虚线上的点不用点。', en: 'Count squares to the line, then the same number on the other side.' },
      answerText: `${want.length} 个点`, check: v => ok(parse(v)), answerDisplay: v => `${parse(v).length} 个点`,
      explainKind: 'l4mirror', n: { cols: q.cols, rows: q.rows, axis: q.axis, paths: q.paths },
    };
  };
  /* ---------- 题型 l4pattern：点格子涂色 q={cols,rows,axis,given,cycle?} ---------- */
  window.QTypes.l4pattern = q => {
    const target = {}; Object.keys(q.given).forEach(k => { target[mirrorCell(k, q.axis)] = flipK(q.given[k], q.axis); });
    const cycle = q.cycle || (Object.values(q.given).some(v => v !== 1) ? [1, 'tl', 'tr', 'br', 'bl'] : [1]);
    let cells = {};
    const isGivenSide = key => { const [c, r] = key.split(',').map(Number); return q.axis.v !== undefined ? (c < q.axis.v) === (Object.keys(q.given)[0].split(',')[0] < q.axis.v) : (r < q.axis.h) === (Object.keys(q.given)[0].split(',')[1] < q.axis.h); };
    const all = () => Object.assign({}, q.given, cells);
    const draw = (box, o) => { const host = $('#pg', box); host.innerHTML = gridCells(q.cols, q.rows, q.axis, all(), Object.assign({ given: q.given, live: !box.dataset.locked }, o || {})); host.querySelectorAll('.cellhit').forEach(c => c.onclick = () => { if (box.dataset.locked) return; const key = `${c.dataset.c},${c.dataset.r}`; if (isGivenSide(key)) return; const cur = cells[key]; const i = cur === undefined ? -1 : cycle.indexOf(cur); if (i === cycle.length - 1) delete cells[key]; else cells[key] = cycle[i + 1]; draw(box); }); };
    const parse = v => { try { return JSON.parse(v || '{}'); } catch (e) { return {}; } };
    const ok = c => Object.keys(target).every(k => c[k] === target[k]) && Object.keys(c).every(k => target[k] === c[k]);
    const marksFor = c => { const m = {}; Object.keys(c).forEach(k => { if (target[k] !== c[k]) m[k] = 'wrong'; }); Object.keys(target).forEach(k => { if (c[k] === undefined) m[k] = 'missing'; }); return m; };
    return {
      prompt: { zh: '补全对称图案：把另一边涂成镜子里的样子', en: 'Complete the symmetric pattern' }, stage: '',
      custom: {
        html: () => `<div class="center"><div id="pg"></div><div class="sub">👆 点格子涂色${cycle.length > 1 ? '（再点切换：整格 → 四种半格 → 空）' : '（再点取消）'}</div><div class="center mt"><button type="button" class="btn secondary small" id="clearAll">清空</button> <button class="btn ok" id="submit">检查 ✔</button></div></div>`,
        bind: (box, submit) => { delete box.dataset.locked; cells = {}; draw(box); $('#clearAll', box).onclick = () => { if (box.dataset.locked) return; cells = {}; draw(box); }; $('#submit', box).onclick = () => submit(); },
        value: () => Object.keys(cells).length ? JSON.stringify(cells) : null,
        markWrong: (box, val) => { cells = parse(val); draw(box, { marks: marksFor(cells) }); },
        showAnswer: box => { box.dataset.locked = '1'; cells = Object.assign({}, target); draw(box); $('#submit', box).disabled = true; $('#clearAll', box).disabled = true; },
        lock: box => { box.dataset.locked = '1'; draw(box); $('#submit', box).disabled = true; $('#clearAll', box).disabled = true; },
        restore: (box, val, status) => { box.dataset.locked = '1'; cells = parse(val); if (!Object.keys(cells).length) cells = Object.assign({}, target); draw(box, status === 'bad' ? { marks: marksFor(cells) } : {}); $('#submit', box).disabled = true; $('#clearAll', box).disabled = true; },
      },
      hint: { zh: '离虚线最近的一列（行）对最近的一列（行），一格一格对着涂；半格要翻方向。', en: 'Mirror column by column. Flip half-cells.' },
      answerText: `${Object.keys(target).length} 格`, check: v => ok(parse(v)), answerDisplay: v => `${Object.keys(parse(v)).length} 格`,
      explainKind: 'l4pattern', n: { cols: q.cols, rows: q.rows, axis: q.axis, given: q.given },
    };
  };
  window.L4SYM = { letterSVG, figSVG, linesSVG, gridPaths, gridCells, mirrorPt };
})();
