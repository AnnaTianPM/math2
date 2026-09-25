/* 分数：图形分块绘制、讲解动画、题型（shade 涂色、arrangef 分数排序） */
(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '"': '&quot;', '>': '&gt;' }[c]));
  const line = t => `<div class="expand-line">${t}</div>`;
  const frac = (n, d, big) => `<span class="frac ${big ? 'big' : ''}"><span class="n">${n}</span><span class="d">${d}</span></span>`;
  const img = (src, w) => `<img class="figimg" src="img/${src}.png" alt="" ${w ? `style="max-width:${w}px"` : ''}>`;

  /* ---------- 分块几何 ----------
   * pieces(kind, d) -> [{pts:[[x,y]...]}] 在 0..100 坐标系
   * kind: strips(竖条) hstrips(横条) circle grid(r×c, d=r*c 时用 opts) tri3 tri4 sq4 sq8 rowdiag(5格对角=10) rect12 */
  function pieces(kind, d, opts = {}) {
    const P = [];
    if (kind === 'strips') { const w = 100 / d; for (let i = 0; i < d; i++) P.push({ pts: [[i * w, 25], [(i + 1) * w, 25], [(i + 1) * w, 75], [i * w, 75]] }); }
    else if (kind === 'hstrips') { const h = 100 / d; for (let i = 0; i < d; i++) P.push({ pts: [[20, i * h], [80, i * h], [80, (i + 1) * h], [20, (i + 1) * h]] }); }
    else if (kind === 'grid') { const r = opts.rows, c = opts.cols, w = 100 / c, h = 100 / r; for (let i = 0; i < r; i++) for (let j = 0; j < c; j++) P.push({ pts: [[j * w, i * h], [(j + 1) * w, i * h], [(j + 1) * w, (i + 1) * h], [j * w, (i + 1) * h]] }); }
    else if (kind === 'circle') { for (let i = 0; i < d; i++) { const a0 = -Math.PI / 2 + i * 2 * Math.PI / d, a1 = a0 + 2 * Math.PI / d; const pts = [[50, 50]]; for (let k = 0; k <= 12; k++) { const a = a0 + (a1 - a0) * k / 12; pts.push([50 + 48 * Math.cos(a), 50 + 48 * Math.sin(a)]); } P.push({ pts }); } }
    else if (kind === 'tri3') { const A = [50, 5], B = [5, 90], C = [95, 90], O = [50, 62]; P.push({ pts: [A, B, O] }, { pts: [A, O, C] }, { pts: [B, C, O] }); }
    else if (kind === 'tri4') { const A = [50, 5], B = [5, 90], C = [95, 90], ab = [27.5, 47.5], ac = [72.5, 47.5], bc = [50, 90]; P.push({ pts: [A, ab, ac] }, { pts: [ab, B, bc] }, { pts: [ac, bc, C] }, { pts: [ab, bc, ac] }); }
    else if (kind === 'sq4') { const O = [50, 50]; P.push({ pts: [[5, 5], [95, 5], O] }, { pts: [[95, 5], [95, 95], O] }, { pts: [[95, 95], [5, 95], O] }, { pts: [[5, 95], [5, 5], O] }); }
    else if (kind === 'sq8') { const O = [50, 50], c = [[5, 5], [50, 5], [95, 5], [95, 50], [95, 95], [50, 95], [5, 95], [5, 50]]; for (let i = 0; i < 8; i++) P.push({ pts: [c[i], c[(i + 1) % 8], O] }); }
    else if (kind === 'rowdiag') { const n = opts.cells || 5, w = 100 / n; for (let i = 0; i < n; i++) { const x0 = i * w, x1 = (i + 1) * w; P.push({ pts: [[x0, 30], [x1, 30], [x1, 70]] }, { pts: [[x0, 30], [x1, 70], [x0, 70]] }); } }
    else if (kind === 'rect12') { for (let r = 0; r < 2; r++) for (let c = 0; c < 3; c++) { const x0 = c * 33.3, x1 = (c + 1) * 33.3, y0 = 15 + r * 35, y1 = 15 + (r + 1) * 35; if ((r + c) % 2 === 0) P.push({ pts: [[x0, y0], [x1, y0], [x1, y1]] }, { pts: [[x0, y0], [x1, y1], [x0, y1]] }); else P.push({ pts: [[x0, y0], [x1, y0], [x0, y1]] }, { pts: [[x1, y0], [x1, y1], [x0, y1]] }); } }
    else if (kind === 'pent5') { const cx = 50, cy = 55, R = 48; const v = []; for (let i = 0; i < 5; i++) { const a = -Math.PI / 2 + i * 2 * Math.PI / 5; v.push([cx + R * Math.cos(a), cy + R * Math.sin(a)]); } for (let i = 0; i < 5; i++) P.push({ pts: [[cx, cy], v[i], v[(i + 1) % 5]] }); }
    return P;
  }
  /* figSVG(kind, d, shaded, opts) shaded = 数量 或 下标数组；opts: w, live(可点), rows, cols, cells, id */
  function figSVG(kind, d, shaded, opts = {}) {
    const P = pieces(kind, d, opts), w = opts.w || 120;
    const on = Array.isArray(shaded) ? new Set(shaded) : new Set(Array.from({ length: shaded || 0 }, (_, i) => i));
    const polys = P.map((p, i) => `<polygon class="piece ${on.has(i) ? 'on' : ''} ${opts.hl === i ? 'hl' : ''}" data-i="${i}" points="${p.pts.map(x => x.map(v => v.toFixed(1)).join(',')).join(' ')}" fill="${on.has(i) ? '#9d8fee' : '#fff'}" stroke="#2b2b3a" stroke-width="1.6" stroke-linejoin="round"/>`).join('');
    const lbls = opts.numbers ? P.map((p, i) => { const cx = p.pts.reduce((s, x) => s + x[0], 0) / p.pts.length, cy = p.pts.reduce((s, x) => s + x[1], 0) / p.pts.length; return `<text x="${cx.toFixed(1)}" y="${(cy + 3).toFixed(1)}" text-anchor="middle" font-size="9" font-weight="700" fill="#4b3fc4" pointer-events="none">${i + 1}</text>`; }).join('') : '';
    const vb = (kind === 'strips' || kind === 'rowdiag') ? '0 20 100 60' : (kind === 'rect12') ? '0 10 100 80' : '0 0 100 100';
    const h = (kind === 'strips' || kind === 'rowdiag') ? w * 0.6 : (kind === 'rect12') ? w * 0.8 : w;
    return `<span class="fig ${opts.live ? 'live' : ''}" ${opts.id ? `id="${opts.id}"` : ''}><svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" width="${w}" height="${h}" style="overflow:visible">${polys}${lbls}</svg></span>`;
  }
  // 条形分数模型：d 格，前 a 格 a 色，再 b 格 b 色
  const bar = (d, a, b, x) => `<span class="fbar-model">${Array.from({ length: d }, (_, i) => `<span class="${i < a ? 'a' : i < a + (b || 0) ? 'b' : i < a + (b || 0) + (x || 0) ? 'x' : ''}"></span>`).join('')}</span>`;

  /* ---------- 讲解 ---------- */
  window.StepKinds.equalparts = () => [
    { zh: '把一个图形分成几份，每一份<b>一样大</b>，才叫平均分（equal parts）。', en: 'Equal parts are all the same size.', render: s => { s.innerHTML = `<div class="fig-row">${figSVG('grid', 4, 0, { rows: 2, cols: 2, w: 130 })}<div class="sub">4 份一样大 ✓</div></div>`; } },
    { zh: '看这个：分成了 3 块，但有大有小，<b>不是</b>平均分。', en: 'These 3 parts are not the same size, so not equal parts.', render: s => { s.innerHTML = `<div class="fig-row"><span class="fig"><svg viewBox="0 0 100 100" width="130" height="130"><polygon points="5,5 95,5 95,50 5,50" fill="#fff" stroke="#2b2b3a" stroke-width="1.6"/><polygon points="5,50 50,50 50,95 5,95" fill="#fff" stroke="#2b2b3a" stroke-width="1.6"/><polygon points="50,50 95,50 95,95 50,95" fill="#fff" stroke="#2b2b3a" stroke-width="1.6"/></svg></span><div class="sub">上面一块比下面两块大 ✗</div></div>`; } },
    { zh: '检查的办法：想象把它们剪下来叠在一起，能不能完全重合？', en: 'Imagine cutting the parts out: do they match exactly?', render: s => { s.innerHTML = `<div class="fig-row">${figSVG('sq4', 4, 0, { w: 130 })}<div class="sub">4 个三角形一样大 ✓</div>${figSVG('tri4', 4, 0, { w: 130 })}<div class="sub">4 个小三角形一样大 ✓</div></div>`; } },
  ];
  window.StepKinds.fracshaded = ({ kind, d, n, opts, pic }) => {
    const fig = (sh, o) => pic ? img(pic, 200) : figSVG(kind, d, sh, Object.assign({ w: 170 }, opts || {}, o || {}));
    return [
      { zh: '先数一数：图形一共被平均分成了<b>几份</b>？', en: 'How many equal parts?', render: s => { s.innerHTML = `<div class="center">${fig(n, { numbers: !pic })}${line(`一共 ${d} 份`)}</div>`; } },
      { zh: `一共 <b>${d}</b> 份，这个数写在分数线<b>下面</b>（分母 denominator）。`, en: `${d} parts in all: that is the bottom number.`, render: s => { s.innerHTML = `<div class="center">${fig(n)}${line(`<span class="frac big"><span class="n">?</span><span class="d">${d}</span></span>`)}</div>`; } },
      { zh: `再数涂色的：<b>${n}</b> 份。写在分数线<b>上面</b>（分子 numerator）。`, en: `${n} parts are shaded: that is the top number.`, render: s => { s.innerHTML = `<div class="center">${fig(n)}${line(frac(n, d, true))}</div>`; } },
      { zh: `${n} out of ${d} equal parts is shaded. So <b>${n}/${d}</b> of the figure is shaded（${d} 份里的 ${n} 份）。`, en: `${n} out of ${d}: ${n}/${d} is shaded.`, render: s => { s.innerHTML = `<div class="center">${fig(n)}${line(`${n} out of ${d} → ${frac(n, d, true)}`)}</div>`; } },
    ];
  };
  window.StepKinds.fracnot = ({ kind, d, n, opts, pic }) => {
    const fig = o => pic ? img(pic, 200) : figSVG(kind, d, n, Object.assign({ w: 170 }, opts || {}, o || {}));
    return [
      { zh: `一共 <b>${d}</b> 份（分母）。`, en: `${d} equal parts.`, render: s => { s.innerHTML = `<div class="center">${fig({ numbers: !pic })}${line(`一共 ${d} 份`)}</div>`; } },
      { zh: `涂色的有 ${n} 份，那<b>没涂色</b>的就是 ${d} − ${n} = <b>${d - n}</b> 份。`, en: `${n} shaded, so ${d} − ${n} = ${d - n} not shaded.`, render: s => { s.innerHTML = `<div class="center">${fig()}${line(`${d} − ${n} = ${d - n}`)}</div>`; } },
      { zh: `没涂色的是 <b>${d - n}/${d}</b>。注意题目问的是 <b>not shaded</b>，别数错了！`, en: `${d - n}/${d} is not shaded.`, render: s => { s.innerHTML = `<div class="center">${fig()}${line(`not shaded: ${frac(d - n, d, true)}`)}</div>`; } },
    ];
  };
  window.StepKinds.fracshade = ({ kind, d, n, opts }) => [
    { zh: `要涂出 ${n}/${d}：下面的 <b>${d}</b> 说明图形分成 ${d} 份（数一数是不是）。`, en: `${n}/${d}: the bottom number ${d} is the number of equal parts.`, render: s => { s.innerHTML = `<div class="center">${figSVG(kind, d, 0, Object.assign({ w: 170, numbers: true }, opts || {}))}${line(frac(n, d, true))}</div>`; } },
    { zh: `上面的 <b>${n}</b> 说明要涂 ${n} 份。涂哪 ${n} 份都可以，只要数量对。`, en: `The top number ${n} is how many parts to shade. Any ${n} parts will do.`, render: s => { s.innerHTML = `<div class="center">${figSVG(kind, d, n, Object.assign({ w: 170 }, opts || {}))}${line(`涂 ${n} 份 = ${frac(n, d, true)}`)}</div>`; } },
    { zh: `涂好后再数一遍：涂了 ${n} 份，一共 ${d} 份，就是 ${n}/${d}。`, en: `Check: ${n} of ${d} shaded.`, render: s => { s.innerHTML = `<div class="center">${figSVG(kind, d, n, Object.assign({ w: 170 }, opts || {}))}</div>`; } },
  ];
  window.StepKinds.partwhole = ({ d, n, who, what }) => [
    { zh: `${what}被平均分成 <b>${d}</b> 份，${who}吃/用掉了 <b>${n}</b> 份。`, en: `${d} equal parts, ${n} used.`, render: s => { s.innerHTML = `<div class="center">${bar(d, n)}</div>`; } },
    { zh: `(a) 剩下几份？${d} − ${n} = <b>${d - n}</b> 份。`, en: `${d} − ${n} = ${d - n} parts left.`, render: s => { s.innerHTML = `<div class="center">${bar(d, n)}${line(`${d} − ${n} = ${d - n}`)}</div>`; } },
    { zh: `(b) 用掉的分数：${d} 份里的 ${n} 份，就是 <b>${n}/${d}</b>。`, en: `${n} out of ${d}: ${n}/${d}.`, render: s => { s.innerHTML = `<div class="center">${bar(d, n)}${line(`用掉 ${frac(n, d, true)}`)}</div>`; } },
    { zh: `(c) 剩下的分数：${d} 份里的 ${d - n} 份，就是 <b>${d - n}/${d}</b>。`, en: `${d - n} out of ${d}: ${d - n}/${d}.`, render: s => { s.innerHTML = `<div class="center">${bar(d, n, d - n)}${line(`剩下 ${frac(d - n, d, true)}`)}</div>`; } },
    { zh: `(d) ${n} 份 + ${d - n} 份 = ${d} 份，就是整个。所以 <b>${n}/${d}</b> 和 <b>${d - n}/${d}</b> 合起来是 1 个整体（make a whole）。`, en: `${n}/${d} and ${d - n}/${d} make a whole.`, render: s => { s.innerHTML = `<div class="center">${bar(d, n, d - n)}${line(`${frac(n, d, true)} + ${frac(d - n, d, true)} = ${frac(d, d, true)} = 1`)}</div>`; } },
  ];
  window.StepKinds.makewhole = ({ d, n }) => [
    { zh: `一个整体是 ${d}/${d}（${d} 份全部）。已经有 ${n}/${d}，还差几份才满？`, en: `A whole is ${d}/${d}. We have ${n}/${d}.`, render: s => { s.innerHTML = `<div class="center">${bar(d, n)}${line(`${frac(n, d, true)} + ? = ${frac(d, d, true)}`)}</div>`; } },
    { zh: `${d} − ${n} = <b>${d - n}</b>，还差 ${d - n} 份，就是 <b>${d - n}/${d}</b>。`, en: `${d} − ${n} = ${d - n}, so ${d - n}/${d}.`, render: s => { s.innerHTML = `<div class="center">${bar(d, n, d - n)}${line(`${frac(n, d, true)} + ${frac(d - n, d, true)} = 1`)}</div>`; } },
  ];
  // 比较：list = [[n,d],...]，want 'greater'|'smaller'
  window.StepKinds.cmpfrac = ({ list, want }) => {
    const bars = hl => `<div class="fig-row">${list.map(([n, d], i) => `<div class="fig-item ${hl === i ? 'on' : ''}">${bar(d, n)}<div>${frac(n, d)}</div></div>`).join('')}</div>`;
    const sameD = list.every(f => f[1] === list[0][1]), sameN = list.every(f => f[0] === list[0][0]);
    const val = f => f[0] / f[1];
    const best = list.reduce((b, f, i) => (want === 'greater' ? val(f) > val(list[b]) : val(f) < val(list[b])) ? i : b, 0);
    const steps = [{ zh: '把每个分数画成条：整条一样长，看涂色的部分。', en: 'Draw each fraction as a bar of the same length.', render: s => { s.innerHTML = bars(null); } }];
    if (sameD) steps.push({ zh: `分母一样（都分成 ${list[0][1]} 份，每份一样大），分子<b>大</b>的份数多，就<b>大</b>。`, en: 'Same bottom number: more parts means greater.', render: s => { s.innerHTML = bars(null); } });
    else if (sameN) steps.push({ zh: `分子一样（都拿 ${list[0][0]} 份），但分母<b>大</b>的切得更碎、每份更<b>小</b>，所以分母大的反而<b>小</b>。`, en: 'Same top number: bigger bottom number means smaller pieces, so smaller.', render: s => { s.innerHTML = bars(null); } });
    steps.push({ zh: `${want === 'greater' ? '最大' : '最小'}的是 <b>${list[best][0]}/${list[best][1]}</b>，看条上涂色最${want === 'greater' ? '长' : '短'}的那个。`, en: `The ${want === 'greater' ? 'greatest' : 'smallest'} is ${list[best][0]}/${list[best][1]}.`, render: s => { s.innerHTML = bars(best); } });
    return steps;
  };
  window.StepKinds.arrangef = ({ list, desc }) => {
    const sorted = list.slice().sort((a, b) => desc ? b[0] / b[1] - a[0] / a[1] : a[0] / a[1] - b[0] / b[1]);
    const bars = L => `<div class="fig-row">${L.map(([n, d]) => `<div class="fig-item">${bar(d, n)}<div>${frac(n, d)}</div></div>`).join('')}</div>`;
    const sameD = list.every(f => f[1] === list[0][1]);
    return [
      { zh: '先把每个分数画成条。', en: 'Draw each as a bar.', render: s => { s.innerHTML = bars(list); } },
      { zh: sameD ? `分母都一样，直接比分子：分子越大越大。` : `分子都一样，比分母：分母越大，每份越小，分数越小。`, en: sameD ? 'Same bottom: compare the top numbers.' : 'Same top: bigger bottom means smaller.', render: s => { s.innerHTML = bars(list); } },
      { zh: `从${desc ? '大到小' : '小到大'}：<b>${sorted.map(f => f[0] + '/' + f[1]).join(', ')}</b>`, en: sorted.map(f => f[0] + '/' + f[1]).join(', '), render: s => { s.innerHTML = bars(sorted); } },
    ];
  };
  window.StepKinds.addfrac = ({ d, parts }) => {
    const total = parts.reduce((s, x) => s + x, 0);
    const steps = [{ zh: `分母一样（都是 ${d} 份），可以直接加：把涂色的份数加起来，分母<b>不变</b>。`, en: 'Same bottom number: add the top numbers, keep the bottom.', render: s => { s.innerHTML = `<div class="center">${bar(d, parts[0], parts[1], parts[2] || 0)}${line(parts.map(p => frac(p, d, true)).join(' + ') + ' = ?')}</div>`; } }];
    steps.push({ zh: `${parts.join(' + ')} = <b>${total}</b> 份。`, en: `${parts.join(' + ')} = ${total}.`, render: s => { s.innerHTML = `<div class="center">${bar(d, total)}${line(`${parts.join(' + ')} = ${total}`)}</div>`; } });
    steps.push({ zh: `所以答案是 <b>${total}/${d}</b>${total === d ? '，也就是 1 个整体' : ''}。`, en: `Answer: ${total}/${d}.`, render: s => { s.innerHTML = `<div class="center">${bar(d, total)}${line(parts.map(p => frac(p, d, true)).join(' + ') + ' = ' + frac(total, d, true))}</div>`; } });
    return steps;
  };
  window.StepKinds.subfrac = ({ d, start, parts }) => {
    let cur = start; const steps = [];
    const s0 = start === d ? `1 就是 ${d}/${d}（整个都在）。` : '';
    steps.push({ zh: `${s0}分母一样，直接减：从 ${start} 份里拿走，分母<b>不变</b>。`, en: 'Same bottom number: subtract the top numbers.', render: s => { s.innerHTML = `<div class="center">${bar(d, start)}${line(frac(start, d, true) + parts.map(p => ' − ' + frac(p, d, true)).join('') + ' = ?')}</div>`; } });
    parts.forEach(p => { const c0 = cur, nxt = cur - p; steps.push({ zh: `${c0} − ${p} = <b>${nxt}</b> 份。`, en: `${c0} − ${p} = ${nxt}.`, render: s => { s.innerHTML = `<div class="center">${bar(d, nxt, 0, c0 - nxt)}${line(`${c0} − ${p} = ${nxt}`)}</div>`; } }); cur = nxt; });
    steps.push({ zh: `所以答案是 <b>${cur}/${d}</b>${cur === 0 ? '，就是 0，一点都不剩' : ''}。`, en: `Answer: ${cur}/${d}.`, render: s => { s.innerHTML = `<div class="center">${bar(d, cur)}${line(frac(cur, d, true))}</div>`; } });
    return steps;
  };

  /* ---------- 题型 shade：点格子涂色 ----------
   * q = { id, type:'shade', figs:[{kind, d, n, opts, label(html)}], pick?:{ prompt, answer(idx), zh } } */
  window.QTypes.shade = q => {
    let sets = q.figs.map(() => new Set()), picked = null;
    function html() {
      return `<div class="fig-row">${q.figs.map((f, i) => `<div class="fig-item" data-i="${i}">${f.label || ''}${figSVG(f.kind, f.d, [], Object.assign({ w: 150, live: true, id: 'fig' + i }, f.opts || {}))}<div class="lbl">已涂 <b class="cnt">0</b> / ${f.d}</div>${q.pick ? `<button type="button" class="btn small secondary pickbtn" data-i="${i}">${q.pick.btn || '选这个'}</button>` : ''}</div>`).join('')}</div>
        ${q.pick ? `<div class="center sub">${esc(q.pick.zh)}</div>` : ''}<div class="center mt"><button class="btn secondary small" id="clearAll">清空</button> <button class="btn ok" id="submit">检查 ✔</button></div>`;
    }
    function refresh(box) { q.figs.forEach((f, i) => { const el = box.querySelector('#fig' + i); if (!el) return; el.querySelectorAll('.piece').forEach(p => { const on = sets[i].has(+p.dataset.i); p.classList.toggle('on', on); p.setAttribute('fill', on ? '#9d8fee' : '#fff'); }); const c = box.querySelector(`.fig-item[data-i="${i}"] .cnt`); if (c) c.textContent = sets[i].size; }); box.querySelectorAll('.fig-item').forEach(it => it.classList.toggle('on', picked !== null && +it.dataset.i === picked)); }
    function bind(box, submit) {
      sets = q.figs.map(() => new Set()); picked = null;
      q.figs.forEach((f, i) => box.querySelector('#fig' + i).querySelectorAll('.piece').forEach(p => p.onclick = () => { if (box.dataset.locked) return; const k = +p.dataset.i; sets[i].has(k) ? sets[i].delete(k) : sets[i].add(k); refresh(box); }));
      box.querySelectorAll('.pickbtn').forEach(b => b.onclick = () => { if (box.dataset.locked) return; picked = +b.dataset.i; refresh(box); });
      box.querySelector('#clearAll').onclick = () => { sets = q.figs.map(() => new Set()); picked = null; refresh(box); };
      box.querySelector('#submit').onclick = () => submit();
    }
    const value = () => { if (sets.every(s => s.size === 0) && picked === null) return null; return JSON.stringify({ s: sets.map(s => [...s]), p: picked }); };
    const okFig = (i, arr) => arr.length === q.figs[i].n;
    function check(val) { try { const v = JSON.parse(val); return v.s.every((arr, i) => okFig(i, arr)) && (!q.pick || v.p === q.pick.answer); } catch (e) { return false; } }
    function markWrong(box, val) { const v = JSON.parse(val); q.figs.forEach((f, i) => { const it = box.querySelector(`.fig-item[data-i="${i}"]`); it.classList.remove('right', 'wrong'); it.classList.add(okFig(i, v.s[i]) ? 'right' : 'wrong'); }); if (q.pick && v.p !== null && v.p !== q.pick.answer) { const b = box.querySelector(`.pickbtn[data-i="${v.p}"]`); if (b) b.classList.add('wrong'); } }
    function lock(box) { box.dataset.locked = '1'; box.querySelectorAll('#clearAll, #submit, .pickbtn').forEach(b => b.disabled = true); }
    function showAnswer(box) { sets = q.figs.map(f => new Set(Array.from({ length: f.n }, (_, i) => i))); picked = q.pick ? q.pick.answer : null; refresh(box); q.figs.forEach((f, i) => { const it = box.querySelector(`.fig-item[data-i="${i}"]`); it.classList.remove('wrong'); it.classList.add('right'); }); lock(box); }
    function restore(box, val, status) { try { const v = JSON.parse(val || '{}'); sets = (v.s || q.figs.map(() => [])).map(a => new Set(a)); picked = v.p === undefined ? null : v.p; } catch (e) { /* */ } refresh(box); q.figs.forEach((f, i) => { const it = box.querySelector(`.fig-item[data-i="${i}"]`); it.classList.add(okFig(i, [...sets[i]]) ? 'right' : 'wrong'); }); lock(box); }
    return {
      prompt: q.prompt || { zh: '点格子涂色，涂出这个分数', en: 'Click the parts to shade the fraction' }, stage: '',
      custom: { html, bind, value, markWrong, showAnswer, lock, restore },
      hint: q.hint || { zh: '分数下面的数是一共几份，上面的数是要涂几份。数一数已涂的数量对不对。', en: 'Bottom number: total parts. Top number: parts to shade.' },
      answerText: q.figs.map(f => `${f.n}/${f.d}`).join(', ') + (q.pick ? `；${q.pick.answerText}` : ''), check,
      answerDisplay: val => { try { const v = JSON.parse(val); return v.s.map((a, i) => `${a.length}/${q.figs[i].d}`).join(', '); } catch (e) { return val; } },
      explainKind: q.explain ? q.explain[0] : 'fracshade', n: q.explain ? q.explain[1] : { kind: q.figs[0].kind, d: q.figs[0].d, n: q.figs[0].n, opts: q.figs[0].opts },
    };
  };

  /* ---------- 题型 arrangef：分数排序（点选） q = { id, type:'arrangef', list:[[n,d],...], desc:bool } */
  window.QTypes.arrangef = q => {
    const val = f => f[0] / f[1];
    const sorted = q.list.slice().sort((a, b) => q.desc ? val(b) - val(a) : val(a) - val(b));
    const key = f => f[0] + '/' + f[1];
    let picked = [];
    function html() {
      return `<div class="arrange"><div class="tiles" id="tiles">${q.list.map((f, i) => `<button type="button" class="tile frac-tile" data-i="${i}" data-val="${key(f)}"><span>${f[0]}</span><span class="d">${f[1]}</span></button>`).join('')}</div>
        <div class="arrow-hint">👇 按顺序点（${q.desc ? '从大到小，先点最大的' : '从小到大，先点最小的'}）</div>
        <div class="slots" id="slots">${q.list.map(() => '<span class="slot"></span>').join('')}</div>
        <div class="center mt"><button class="btn secondary small" id="undo">撤销一个 ↩</button> <button class="btn ok" id="submit" disabled>检查 ✔</button></div></div>`;
    }
    function draw(box) { const slots = box.querySelectorAll('.slot'); slots.forEach((s, i) => { s.innerHTML = picked[i] !== undefined ? frac(q.list[picked[i]][0], q.list[picked[i]][1]) : ''; s.classList.toggle('filled', picked[i] !== undefined); }); box.querySelectorAll('.tile').forEach(t => t.classList.toggle('used', picked.includes(+t.dataset.i))); const sub = box.querySelector('#submit'); if (sub) sub.disabled = picked.length !== q.list.length; }
    function bind(box, submit) { picked = []; box.querySelectorAll('.tile').forEach(t => t.onclick = () => { if (t.classList.contains('used') || t.disabled) return; picked.push(+t.dataset.i); draw(box); if (picked.length === q.list.length) setTimeout(submit, 250); }); box.querySelector('#undo').onclick = () => { picked.pop(); draw(box); }; box.querySelector('#submit').onclick = () => submit(); draw(box); }
    const value = () => picked.length === q.list.length ? picked.map(i => key(q.list[i])).join(', ') : null;
    const answer = sorted.map(key).join(', ');
    function markWrong(box) { const slots = box.querySelectorAll('.slot'); slots.forEach((s, i) => s.classList.add(picked[i] !== undefined && key(q.list[picked[i]]) === key(sorted[i]) ? 'right' : 'wrong')); setTimeout(() => { picked = []; draw(box); slots.forEach(s => s.classList.remove('right', 'wrong')); }, 1200); }
    function lock(box) { box.querySelectorAll('.tile, #undo, #submit').forEach(b => b.disabled = true); }
    function showAnswer(box) { box.querySelectorAll('.slot').forEach((s, i) => { s.innerHTML = frac(sorted[i][0], sorted[i][1]); s.classList.remove('wrong'); s.classList.add('filled', 'right'); }); lock(box); }
    function restore(box, val) { const vals = String(val || '').split(',').map(x => x.trim()); box.querySelectorAll('.slot').forEach((s, i) => { const v = vals[i] || key(sorted[i]); const [n, d] = v.split('/'); s.innerHTML = frac(n, d); s.classList.add('filled', v === key(sorted[i]) ? 'right' : 'wrong'); }); lock(box); }
    return {
      prompt: { zh: q.desc ? '从大到小排一排（先点最大的）' : '从小到大排一排（先点最小的）', en: q.desc ? 'Arrange, begin with the greatest' : 'Arrange, begin with the smallest' }, stage: '',
      custom: { html, bind, value, markWrong, showAnswer, lock, restore },
      hint: { zh: '分母一样就比分子，分子大的大；分子一样就比分母，分母大的反而小。', en: 'Same bottom: compare tops. Same top: bigger bottom is smaller.' },
      answerText: answer, check: v => v === answer, explainKind: 'arrangef', n: { list: q.list, desc: q.desc },
    };
  };

  window.FracUI = { frac, figSVG, bar, pieces, img };
})();
