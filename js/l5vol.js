/* Level 5 · Unit 8  体积：等轴测方块图、点阵画图题型、三视图题型、公式与换算讲解 */
(function () {
  const line = t => `<div class="expand-line">${t}</div>`;
  const wrap = (...parts) => `<div class="l1wrap">${parts.join('')}</div>`;
  const $ = (sel, el) => (el || document).querySelector(sel);
  const INK = '#2b2b3a', PU = '#6c5ce7';
  /* ---------- 等轴测：坐标 (a 向右下, b 向左下, z 向上)，前面 = +b 面（左下），侧面 = +a 面（右下） ---------- */
  const C = 0.866, SN = 0.5;
  function iso(cubes, o = {}) {
    const u = o.u || 22, X = (a, b) => (a - b) * u * C, Y = (a, b, z) => (a + b) * u * SN - z * u;
    const pts = []; cubes.forEach(([a, b, z]) => { [[a, b, z], [a + 1, b + 1, z + 1], [a + 1, b, z], [a, b + 1, z], [a, b, z + 1]].forEach(p => pts.push([X(p[0], p[1]), Y(p[0], p[1], p[2])])); });
    const minX = Math.min(...pts.map(p => p[0])), maxX = Math.max(...pts.map(p => p[0])), minY = Math.min(...pts.map(p => p[1])), maxY = Math.max(...pts.map(p => p[1]));
    const P = (a, b, z) => `${(X(a, b) - minX + 8).toFixed(1)},${(Y(a, b, z) - minY + 8).toFixed(1)}`;
    const sorted = cubes.slice().sort((p, q) => (p[0] + p[1]) - (q[0] + q[1]) || p[2] - q[2]);
    const fills = o.fills || ['#e6e6e6', '#bdbdbd', '#9a9a9a'];
    let s = '';
    sorted.forEach(([a, b, z]) => {
      s += `<polygon points="${P(a, b, z + 1)} ${P(a + 1, b, z + 1)} ${P(a + 1, b + 1, z + 1)} ${P(a, b + 1, z + 1)}" fill="${fills[0]}" stroke="${INK}" stroke-width="1.2" stroke-linejoin="round"/>`;
      s += `<polygon points="${P(a, b + 1, z)} ${P(a + 1, b + 1, z)} ${P(a + 1, b + 1, z + 1)} ${P(a, b + 1, z + 1)}" fill="${fills[1]}" stroke="${INK}" stroke-width="1.2" stroke-linejoin="round"/>`;
      s += `<polygon points="${P(a + 1, b, z)} ${P(a + 1, b + 1, z)} ${P(a + 1, b + 1, z + 1)} ${P(a + 1, b, z + 1)}" fill="${fills[2]}" stroke="${INK}" stroke-width="1.2" stroke-linejoin="round"/>`;
    });
    const W = maxX - minX + 16, H = maxY - minY + 16;
    let extra = '';
    if (o.arrows) { extra = `<text x="${W / 2}" y="-6" font-size="12" font-weight="700" text-anchor="middle" fill="${INK}">top ↓</text><text x="${-4}" y="${H + 14}" font-size="12" font-weight="700" fill="${INK}">front ↗</text><text x="${W + 4}" y="${H / 2 + 4}" font-size="12" font-weight="700" fill="${INK}">← side</text>`; }
    return `<svg viewBox="${o.arrows ? -40 : 0} ${o.arrows ? -22 : 0} ${W + (o.arrows ? 100 : 0)} ${H + (o.arrows ? 40 : 0)}" width="${(W + (o.arrows ? 100 : 0)) * (o.scale || 1)}" style="max-width:100%;height:auto;overflow:visible">${s}${extra}</svg>`;
  }
  /* 高度表 → 方块列表  H[b][a]（b=0 是最后一排） */
  const fromHeights = H => { const out = []; H.forEach((row, b) => row.forEach((h, a) => { for (let z = 0; z < h; z++) out.push([a, b, z]); })); return out; };
  /* 长方体（L 沿 a，B 沿 b，H 向上），带网格线 o.grid；o.labels [L,B,H] 文本 */
  function cuboid(L, B, Hh, o = {}) {
    const u = o.u || 14, X = (a, b) => (a - b) * u * C, Y = (a, b, z) => (a + b) * u * SN - z * u;
    const corners = [[0, 0, 0], [L, 0, 0], [0, B, 0], [L, B, 0], [0, 0, Hh], [L, 0, Hh], [0, B, Hh], [L, B, Hh]].map(p => [X(p[0], p[1]), Y(p[0], p[1], p[2])]);
    const minX = Math.min(...corners.map(p => p[0])), minY = Math.min(...corners.map(p => p[1])), maxX = Math.max(...corners.map(p => p[0])), maxY = Math.max(...corners.map(p => p[1]));
    const P = (a, b, z) => [X(a, b) - minX + 30, Y(a, b, z) - minY + 14];
    const pt = (a, b, z) => P(a, b, z).map(v => v.toFixed(1)).join(',');
    let s = `<polygon points="${pt(0, 0, Hh)} ${pt(L, 0, Hh)} ${pt(L, B, Hh)} ${pt(0, B, Hh)}" fill="#e6e6e6" stroke="${INK}" stroke-width="1.5"/><polygon points="${pt(0, B, 0)} ${pt(L, B, 0)} ${pt(L, B, Hh)} ${pt(0, B, Hh)}" fill="#bdbdbd" stroke="${INK}" stroke-width="1.5"/><polygon points="${pt(L, 0, 0)} ${pt(L, B, 0)} ${pt(L, B, Hh)} ${pt(L, 0, Hh)}" fill="#9a9a9a" stroke="${INK}" stroke-width="1.5"/>`;
    if (o.grid) { const ln = (p, q) => `<line x1="${P(...p)[0]}" y1="${P(...p)[1]}" x2="${P(...q)[0]}" y2="${P(...q)[1]}" stroke="${INK}" stroke-width=".7"/>`; for (let i = 1; i < L; i++) s += ln([i, 0, Hh], [i, B, Hh]) + ln([i, B, 0], [i, B, Hh]); for (let j = 1; j < B; j++) s += ln([0, j, Hh], [L, j, Hh]) + ln([L, j, 0], [L, j, Hh]); for (let k = 1; k < Hh; k++) s += ln([0, B, k], [L, B, k]) + ln([L, 0, k], [L, B, k]); }
    if (o.labels) { const [tl, tb, th] = o.labels; const m = (p, q) => [(P(...p)[0] + P(...q)[0]) / 2, (P(...p)[1] + P(...q)[1]) / 2]; const a1 = m([0, B, 0], [L, B, 0]), b1 = m([L, 0, 0], [L, B, 0]), h1 = m([0, B, 0], [0, B, Hh]); s += `<text x="${a1[0]}" y="${a1[1] + 16}" font-size="12" font-weight="700" text-anchor="middle" fill="${INK}">${tl}</text><text x="${b1[0] + 10}" y="${b1[1] + 12}" font-size="12" font-weight="700" fill="${INK}">${tb}</text><text x="${h1[0] - 8}" y="${h1[1] + 4}" font-size="12" font-weight="700" text-anchor="end" fill="${INK}">${th}</text>`; }
    const W = maxX - minX + 60, Hp = maxY - minY + 44;
    return `<svg viewBox="0 0 ${W} ${Hp}" width="${Math.min(W, o.maxw || 260)}" style="max-width:100%;height:auto;overflow:visible">${s}</svg>`;
  }
  /* 三视图：H[b][a] → {top:[[a,row]], front:[[a,z]], side:[[col,z]]} 用 (col,rowFromTop) 集合 */
  function views(H) { const nb = H.length, na = Math.max(...H.map(r => r.length)), nz = Math.max(...H.flat()); const top = [], front = [], side = []; H.forEach((row, b) => row.forEach((h, a) => { if (h) top.push([a, b]); for (let z = 0; z < h; z++) { front.push([a, nz - 1 - z]); side.push([nb - 1 - b, nz - 1 - z]); } })); const uniq = arr => [...new Set(arr.map(p => p.join(',')))].map(s => s.split(',').map(Number)); return { top: uniq(top), front: uniq(front), side: uniq(side) }; }
  const normSet = cells => { if (!cells.length) return ''; const mx = Math.min(...cells.map(c => c[0])), my = Math.min(...cells.map(c => c[1])); return cells.map(c => `${c[0] - mx},${c[1] - my}`).sort().join(';'); };
  /* 小格子图 */
  function cellGrid(cols, rows, on, o = {}) { const u = 22, pad = 4; let s = ''; const set = new Set(on.map(c => c.join(','))); for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { const k = `${c},${r}`; const mk = o.marks && o.marks[k]; s += `<rect ${o.live ? `class="cellhit" data-c="${c}" data-r="${r}"` : ''} x="${pad + c * u}" y="${pad + r * u}" width="${u}" height="${u}" fill="${mk === 'wrong' ? '#f5a3a3' : set.has(k) ? (o.answer ? '#9bd3a4' : '#8f7fe8') : '#fff'}" stroke="${set.has(k) ? INK : '#bbb'}" stroke-width="${set.has(k) ? 1.5 : .8}" ${o.live ? 'style="cursor:pointer"' : ''}/>`; } return `<svg viewBox="0 0 ${cols * u + pad * 2} ${rows * u + pad * 2}" width="${cols * u + pad * 2}" style="overflow:visible">${s}</svg>`; }
  /* 点阵图 */
  function dotGrid(cols, rows, segs, o = {}) { const u = o.u || 26, pad = 14, X = v => pad + v * u; let s = ''; for (let i = 0; i <= cols; i++) for (let j = 0; j <= rows; j++) s += `<circle cx="${X(i)}" cy="${X(j)}" r="2.2" fill="#555"/>`; (segs || []).forEach(sg => { const col = sg.user ? (o.bad ? '#e74c3c' : PU) : INK; s += `<line x1="${X(sg.a[0])}" y1="${X(sg.a[1])}" x2="${X(sg.b[0])}" y2="${X(sg.b[1])}" stroke="${col}" stroke-width="2.2" stroke-linecap="round"/>`; }); if (o.pending) s += `<circle cx="${X(o.pending[0])}" cy="${X(o.pending[1])}" r="6" fill="${PU}"/>`; if (o.live) for (let i = 0; i <= cols; i++) for (let j = 0; j <= rows; j++) s += `<circle class="gpt" data-x="${i}" data-y="${j}" cx="${X(i)}" cy="${X(j)}" r="${u * 0.42}" fill="transparent" style="cursor:pointer"/>`; const W = pad * 2 + cols * u, Hh = pad * 2 + rows * u; return `<svg class="gridfig" viewBox="0 0 ${W} ${Hh}" width="${Math.min(W, o.w || 360)}" style="max-width:100%;height:auto">${s}</svg>`; }
  const segKey = sg => { const [p, q] = [sg.a, sg.b].sort((x, y) => x[0] - y[0] || x[1] - y[1]); return `${p[0]},${p[1]}-${q[0]},${q[1]}`; };
  const normSegs = (segs, free) => { if (!segs.length) return ''; let dx = 0, dy = 0; if (free) { const xs = segs.flatMap(s => [s.a[0], s.b[0]]), ys = segs.flatMap(s => [s.a[1], s.b[1]]); dx = Math.min(...xs); dy = Math.min(...ys); } return segs.map(s => segKey({ a: [s.a[0] - dx, s.a[1] - dy], b: [s.b[0] - dx, s.b[1] - dy] })).sort().join(';'); };
  /* 长方体线段集合（点阵）：原点 (ox,oy)，w 宽 h 高 d 深（右上偏移） */
  const cuboidSegs = (ox, oy, w, h, d) => { const p = (x, y) => [ox + x, oy + y]; const S = (a, b) => ({ a, b }); return [S(p(0, d), p(w, d)), S(p(w, d), p(w, d + h)), S(p(w, d + h), p(0, d + h)), S(p(0, d + h), p(0, d)), S(p(0, d), p(d, 0)), S(p(w, d), p(w + d, 0)), S(p(d, 0), p(w + d, 0)), S(p(w + d, 0), p(w + d, h)), S(p(w, d + h), p(w + d, h))]; };
  /* 角视立方体：顶面菱形 T R C L + 三条竖线 + 两条底边；k 边长 */
  const cornerSegs = (ox, oy, k) => { const p = (x, y) => [ox + x, oy + y]; const S = (a, b) => ({ a, b }); const T = p(k, 0), R = p(2 * k, k), Cc = p(k, 2 * k), L = p(0, k); return [S(T, R), S(R, Cc), S(Cc, L), S(L, T), S(L, p(0, 2 * k)), S(Cc, p(k, 3 * k)), S(R, p(2 * k, 2 * k)), S(p(0, 2 * k), p(k, 3 * k)), S(p(k, 3 * k), p(2 * k, 2 * k))]; };

  /* ---------- 题型 l5dotdraw ---------- q = {cols, rows, given:[seg], need:[seg], free?, ref?:{cols,rows,segs}} */
  window.QTypes.l5dotdraw = q => {
    let user = [], pending = null;
    const all = () => q.given.concat(user.map(s => Object.assign({ user: true }, s)));
    const draw = (box, o) => { const host = $('#dg', box); host.innerHTML = dotGrid(q.cols, q.rows, all(), Object.assign({ live: !box.dataset.locked, pending }, o || {})); host.querySelectorAll('.gpt').forEach(c => c.onclick = () => { if (box.dataset.locked) return; const p = [+c.dataset.x, +c.dataset.y]; if (!pending) { pending = p; } else { if (pending[0] !== p[0] || pending[1] !== p[1]) { const sg = { a: pending, b: p }, k = segKey(sg), i = user.findIndex(s => segKey(s) === k); if (i >= 0) user.splice(i, 1); else user.push(sg); } pending = null; } draw(box); $('#sc', box).textContent = user.length; }); };
    const parse = v => { try { return JSON.parse(v || '[]'); } catch (e) { return []; } };
    const ok = segs => normSegs(segs, q.free) === normSegs(q.need, q.free);
    return {
      prompt: q.prompt || { zh: q.free ? '照左边的图，在点阵上画出同样的图形' : '把这个图形补画完整', en: q.free ? 'Draw the figure on the dot paper' : 'Complete the drawing' }, stage: q.ref ? `<div class="center">${dotGrid(q.ref.cols, q.ref.rows, q.ref.segs, { w: 200 })}</div>` : '',
      custom: {
        html: () => `<div class="center"><div id="dg"></div><div class="sub">👆 点两个点画一条线（再点同样两个点可以删掉）。已画 <b id="sc">0</b> 条${q.free ? '，画在点阵的哪里都行' : ''}</div><div class="center mt"><button type="button" class="btn secondary small" id="clearAll">清空</button> <button class="btn ok" id="submit">检查 ✔</button></div></div>`,
        bind: (box, submit) => { delete box.dataset.locked; user = []; pending = null; draw(box); $('#clearAll', box).onclick = () => { if (box.dataset.locked) return; user = []; pending = null; draw(box); $('#sc', box).textContent = 0; }; $('#submit', box).onclick = () => submit(); },
        value: () => user.length ? JSON.stringify(user.map(s => [s.a, s.b])) : null,
        markWrong: (box, val) => { user = parse(val).map(([a, b]) => ({ a, b })); draw(box, { bad: true }); setTimeout(() => { if (!box.dataset.locked) draw(box); }, 1200); },
        showAnswer: box => { box.dataset.locked = '1'; user = q.need.map(s => ({ a: s.a, b: s.b })); draw(box); $('#submit', box).disabled = true; $('#clearAll', box).disabled = true; },
        lock: box => { box.dataset.locked = '1'; draw(box); $('#submit', box).disabled = true; $('#clearAll', box).disabled = true; },
        restore: (box, val, status) => { box.dataset.locked = '1'; user = parse(val).map(([a, b]) => ({ a, b })); if (!user.length) user = q.need.map(s => ({ a: s.a, b: s.b })); draw(box, status === 'bad' ? { bad: true } : {}); $('#submit', box).disabled = true; $('#clearAll', box).disabled = true; },
      },
      hint: q.hint || { zh: '长方体画法：先画前面的长方形，再从三个角往右上画一样长的斜线，最后把斜线的末端连起来。', en: 'Front rectangle, three slanted edges, then join.' },
      answerText: `${q.need.length} 条线`, check: v => ok(parse(v).map(([a, b]) => ({ a, b }))), answerDisplay: v => `${parse(v).length} 条线`,
      explainKind: 'l5dotsteps', n: { cols: q.cols, rows: q.rows, given: q.given, need: q.need },
    };
  };
  window.StepKinds.l5dotsteps = ({ cols, rows, given, need }) => { const steps = [{ zh: `先看已经有的线${given.length ? '' : '（这题要从头画）'}。看清楚平行的边要一样长、斜线要同一个方向。`, en: 'Look at the lines given.', render: s => { s.innerHTML = wrap(`<div class="center">${dotGrid(cols, rows, given)}</div>`); } }]; need.forEach((sg, i) => steps.push({ zh: `第 ${i + 1} 条：从 (${sg.a.join(', ')}) 画到 (${sg.b.join(', ')})${sg.zh ? '，' + sg.zh : ''}。`, en: `Line ${i + 1}.`, render: s => { s.innerHTML = wrap(`<div class="center">${dotGrid(cols, rows, given.concat(need.slice(0, i + 1).map(x => Object.assign({ user: true }, x))))}</div>`); } })); return steps; };

  /* ---------- 题型 l5views ---------- q = {H, gw, gh} */
  window.QTypes.l5views = q => {
    const V = views(q.H), names = [['top', '俯视图 Top view'], ['front', '正视图 Front view'], ['side', '侧视图 Side view']];
    let sel = { top: [], front: [], side: [] };
    const draw = (box, o) => { names.forEach(([k]) => { const host = $(`#v_${k}`, box); host.innerHTML = cellGrid(q.gw, q.gh, o && o.answer ? V[k] : sel[k], Object.assign({ live: !box.dataset.locked }, o || {})); host.querySelectorAll('.cellhit').forEach(c => c.onclick = () => { if (box.dataset.locked) return; const p = [+c.dataset.c, +c.dataset.r]; const i = sel[k].findIndex(x => x[0] === p[0] && x[1] === p[1]); if (i >= 0) sel[k].splice(i, 1); else sel[k].push(p); draw(box); }); }); };
    const parse = v => { try { return JSON.parse(v || '{}'); } catch (e) { return { top: [], front: [], side: [] }; } };
    const okAll = s => names.every(([k]) => normSet(s[k] || []) === normSet(V[k]));
    return {
      prompt: { zh: '画出这个立体的俯视图、正视图和侧视图（点格子涂色）', en: 'Draw the top, front and side views of the solid' }, stage: `<div class="center">${iso(fromHeights(q.H), { arrows: true, scale: 1.1 })}</div>`,
      custom: {
        html: () => `<div class="views">${names.map(([k, t]) => `<div class="viewbox"><div class="sub">${t}</div><div id="v_${k}"></div></div>`).join('')}</div><div class="center sub">每个格子代表一个方块的面；画在格子里的哪个位置都行</div><div class="center mt"><button type="button" class="btn secondary small" id="clearAll">清空</button> <button class="btn ok" id="submit">检查 ✔</button></div>`,
        bind: (box, submit) => { delete box.dataset.locked; sel = { top: [], front: [], side: [] }; draw(box); $('#clearAll', box).onclick = () => { if (box.dataset.locked) return; sel = { top: [], front: [], side: [] }; draw(box); }; $('#submit', box).onclick = () => submit(); },
        value: () => names.every(([k]) => sel[k].length) ? JSON.stringify(sel) : null,
        markWrong: (box, val) => { sel = parse(val); names.forEach(([k]) => { const good = normSet(sel[k] || []) === normSet(V[k]); $(`#v_${k}`, box).classList.toggle('badf', !good); }); setTimeout(() => names.forEach(([k]) => $(`#v_${k}`, box) && $(`#v_${k}`, box).classList.remove('badf')), 1300); },
        showAnswer: box => { box.dataset.locked = '1'; sel = { top: V.top, front: V.front, side: V.side }; draw(box, { answer: true }); $('#submit', box).disabled = true; $('#clearAll', box).disabled = true; },
        lock: box => { box.dataset.locked = '1'; draw(box); $('#submit', box).disabled = true; $('#clearAll', box).disabled = true; },
        restore: (box, val, status) => { box.dataset.locked = '1'; sel = parse(val); if (!okAll(sel)) { names.forEach(([k]) => { const good = normSet(sel[k] || []) === normSet(V[k]); if (!good) sel[k] = sel[k] || []; }); } draw(box); if (status === 'bad') names.forEach(([k]) => { if (normSet(sel[k] || []) !== normSet(V[k])) $(`#v_${k}`, box).classList.add('badf'); }); $('#submit', box).disabled = true; $('#clearAll', box).disabled = true; },
      },
      hint: { zh: '俯视图：从上往下看每一格有没有方块；正视图：从前面看每一列有多高；侧视图：从右边看每一排有多高。', en: 'Top: which squares have cubes. Front/side: how tall each column is.' },
      answerText: '三视图', check: v => okAll(parse(v)), answerDisplay: () => '三视图',
      explainKind: 'l5viewsteps', n: { H: q.H },
    };
  };
  window.StepKinds.l5viewsteps = ({ H }) => { const V = views(H), nb = H.length, na = Math.max(...H.map(r => r.length)), nz = Math.max(...H.flat()); return [
    { zh: '先看清立体：哪一面是前面（front），哪一面是侧面（side）。', en: 'Identify the front and side.', render: s => { s.innerHTML = wrap(`<div class="center">${iso(fromHeights(H), { arrows: true, scale: 1.1 })}</div>`); } },
    { zh: `<b>俯视图</b>：从正上方往下看，只看每个位置有没有方块（不管几层高）。有方块的格子涂上。`, en: 'Top view: which positions have cubes.', render: s => { s.innerHTML = wrap(`<div class="center">${cellGrid(na, nb, V.top, { answer: true })}</div>`, line('top view')); } },
    { zh: `<b>正视图</b>：从前面看，每一列最高有几个方块就涂几格（后面的被前面挡住也算进去）。`, en: 'Front view: the tallest stack in each column.', render: s => { s.innerHTML = wrap(`<div class="center">${cellGrid(na, nz, V.front, { answer: true })}</div>`, line('front view')); } },
    { zh: `<b>侧视图</b>：从右边看，每一排（前到后）最高有几个方块。前排在左边，后排在右边。`, en: 'Side view: the tallest stack in each row, front row on the left.', render: s => { s.innerHTML = wrap(`<div class="center">${cellGrid(nb, nz, V.side, { answer: true })}</div>`, line('side view')); } },
  ]; };

  const S = window.StepKinds;
  /* l5countcubes：{names:[..], H:[heights...]} */
  S.l5countcubes = ({ names, Hs }) => { const counts = Hs.map(H => H.flat().reduce((a, b) => a + b, 0)); return [
    { zh: `数方块要一层一层数，或者一列一列数：每一列从下往上有几个。被挡住的方块也要算（下面一定有方块撑着）。`, en: 'Count column by column; hidden cubes count too.', render: s => { s.innerHTML = wrap(`<div class="center fig-row">${Hs.map((H, i) => `<div class="center">${iso(fromHeights(H))}<div class="sub">Solid ${names[i]}</div></div>`).join('')}</div>`); } },
    ...Hs.map((H, i) => ({ zh: `Solid ${names[i]}：每列的高度是 ${H.map(r => r.join('、')).join(' ｜ ')}，加起来 = <b>${counts[i]}</b> 个。`, en: `Solid ${names[i]}: ${counts[i]} cubes.`, render: s => { s.innerHTML = wrap(`<div class="center">${iso(fromHeights(H), { scale: 1.2 })}</div>`, line(`${H.flat().filter(Boolean).join(' + ')} = ${counts[i]}`)); } })),
    { zh: `比一比：${names.map((n, i) => `${n} = ${counts[i]}`).join('，')}。方块越多体积越大。`, en: counts.join(', '), render: s => { s.innerHTML = wrap(line(names.map((n, i) => `${n}: ${counts[i]}`).join('　'))); } },
  ]; };
  /* l5volume：{L,B,H, grid?, cube?} */
  S.l5volume = ({ L, B, H, grid, cube }) => [
    { zh: cube ? `正方体每条棱（edge）都一样长：<b>${L} cm</b>。` : `先读出长（length）<b>${L} cm</b>、宽（breadth）<b>${B} cm</b>、高（height）<b>${H} cm</b>${grid ? '（数一数每条边有几个 1 cm 的小方块）' : ''}。`, en: cube ? `Edge ${L} cm.` : `Length ${L}, breadth ${B}, height ${H}.`, render: s => { s.innerHTML = wrap(`<div class="center">${cuboid(L, B, H, { grid, labels: cube ? [`${L} cm`, '', ''] : [`${L} cm`, `${B} cm`, `${H} cm`], u: grid ? 12 : 10 })}</div>`); } },
    { zh: `体积 = 长 × 宽 × 高 = ${L} × ${B} × ${H} = <b>${L * B * H}</b> cm³。`, en: `${L} × ${B} × ${H} = ${L * B * H} cm³.`, render: s => { s.innerHTML = wrap(line(`${L} × ${B} × ${H} = ${L * B * H} cm³`)); } },
  ];
  /* l5conv：{l, ml, to:'cm3'} 或 {cm3, to:'lml'} */
  S.l5conv = q => q.to === 'cm3' ? [
    { zh: `记住：<b>1 ml = 1 cm³</b>，<b>1 l = 1000 ml = 1000 cm³</b>。`, en: '1 ml = 1 cm³, 1 l = 1000 cm³.', render: s => { s.innerHTML = wrap(line('1 l = 1000 ml = 1000 cm³')); } },
    { zh: `${q.l ? `${q.l} l = ${q.l * 1000} cm³${q.ml ? `，再加 ${q.ml} ml = ${q.ml} cm³：${q.l * 1000} + ${q.ml} = <b>${q.l * 1000 + q.ml}</b> cm³` : ''}` : `${q.ml} ml = <b>${q.ml}</b> cm³`}。`, en: `${q.l * 1000 + q.ml} cm³.`, render: s => { s.innerHTML = wrap(line(`${q.l ? `${q.l} l ${q.ml ? q.ml + ' ml' : ''}` : q.ml + ' ml'} = ${q.l * 1000 + q.ml} cm³`)); } },
  ] : [
    { zh: `${q.cm3} cm³ = ${q.cm3} ml。每 1000 ml 换成 1 l：${q.cm3} ÷ 1000 = ${Math.floor(q.cm3 / 1000)} 余 ${q.cm3 % 1000}。`, en: `${q.cm3} ÷ 1000.`, render: s => { s.innerHTML = wrap(line(`${q.cm3} cm³ = ${q.cm3} ml`)); } },
    { zh: `所以 ${q.cm3} cm³ = <b>${Math.floor(q.cm3 / 1000) ? `${Math.floor(q.cm3 / 1000)} l ${q.cm3 % 1000} ml` : `${q.cm3} ml`}</b>。`, en: 'Done.', render: s => { s.innerHTML = wrap(line(`${q.cm3} cm³ = ${Math.floor(q.cm3 / 1000) ? `${Math.floor(q.cm3 / 1000)} l ${q.cm3 % 1000} ml` : `${q.cm3} ml`}`)); } },
  ];
  window.L5VOL = { iso, fromHeights, cuboid, views, cellGrid, dotGrid, cuboidSegs, cornerSegs };
})();
