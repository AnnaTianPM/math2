/* Level 3 · Unit 12 分数：等值分数、最简、异分母比较与加减 讲解 + 图形 */
(function () {
  const line = t => `<div class="expand-line">${t}</div>`;
  const wrap = (...parts) => `<div class="l1wrap">${parts.join('')}</div>`;
  const frac = (n, d, big) => `<span class="frac ${big ? 'big' : ''}"><span class="n">${n}</span><span class="d">${d}</span></span>`;
  const gcd = (a, b) => b ? gcd(b, a % b) : a;
  const lcm = (a, b) => a / gcd(a, b) * b;

  /* 图形：kind strips|grid|circle|tri4|pent5，d 份，shaded 前 n 份；o.w */
  function fig(kind, d, shaded, o = {}) {
    const w = o.w || 130, on = i => i < shaded;
    let polys = '', vb = '0 0 100 100', h = w;
    const P = [];
    if (kind === 'strips') { const cw = 100 / d; for (let i = 0; i < d; i++) P.push([[i * cw, 30], [(i + 1) * cw, 30], [(i + 1) * cw, 70], [i * cw, 70]]); vb = '0 25 100 50'; h = w / 2; }
    else if (kind === 'grid') { const r = o.rows, c = o.cols, cw = 100 / c, ch = 100 / r; for (let i = 0; i < r; i++) for (let j = 0; j < c; j++) P.push([[j * cw, i * ch], [(j + 1) * cw, i * ch], [(j + 1) * cw, (i + 1) * ch], [j * cw, (i + 1) * ch]]); }
    else if (kind === 'circle') { for (let i = 0; i < d; i++) { const a0 = -Math.PI / 2 + i * 2 * Math.PI / d, a1 = a0 + 2 * Math.PI / d; const pts = [[50, 50]]; for (let k = 0; k <= 12; k++) { const a = a0 + (a1 - a0) * k / 12; pts.push([50 + 46 * Math.cos(a), 50 + 46 * Math.sin(a)]); } P.push(pts); } }
    else if (kind === 'tri4') { const A = [50, 8], B = [6, 92], C = [94, 92], ab = [28, 50], ac = [72, 50], bc = [50, 92]; P.push([A, ab, ac], [ab, B, bc], [ab, bc, ac], [ac, bc, C]); }
    else if (kind === 'pent5') { const v = []; for (let i = 0; i < 5; i++) { const a = -Math.PI / 2 + i * 2 * Math.PI / 5; v.push([50 + 46 * Math.cos(a), 54 + 46 * Math.sin(a)]); } for (let i = 0; i < 5; i++) P.push([[50, 54], v[i], v[(i + 1) % 5]]); }
    P.forEach((pts, i) => { polys += `<polygon points="${pts.map(p => p.map(v => v.toFixed(1)).join(',')).join(' ')}" fill="${on(i) ? '#9d8fee' : '#fff'}" stroke="#2b2b3a" stroke-width="1.2"/>`; });
    return `<span class="fig"><svg viewBox="${vb}" width="${w}" height="${h}" style="overflow:visible">${polys}</svg></span>`;
  }
  /* 分数数轴：d 份，标出 labels（分数或 0/1）o.w */
  function fline(d, o = {}) {
    const W = 520, x0 = 40, x1 = 480, y = 26;
    let s = `<line x1="${x0 - 20}" y1="${y}" x2="${x1 + 20}" y2="${y}" stroke="#333" stroke-width="2"/>`;
    for (let i = 0; i <= d; i++) { const x = x0 + (x1 - x0) * i / d; const hl = o.hl && o.hl.includes(i); s += `<line x1="${x}" y1="${y - 7}" x2="${x}" y2="${y + 7}" stroke="${hl ? '#ff9f43' : '#333'}" stroke-width="${hl ? 3 : 1.5}"/>`; const lab = i === 0 ? '0' : i === d ? '1' : null; if (lab) s += `<text x="${x}" y="${y + 24}" text-anchor="middle" font-size="14" font-weight="700">${lab}</text>`; else if (!o.noLabels) s += `<text x="${x}" y="${y + 20}" text-anchor="middle" font-size="11" fill="${hl ? '#d35400' : '#333'}">${i}</text><line x1="${x - 6}" y1="${y + 23}" x2="${x + 6}" y2="${y + 23}" stroke="#333" stroke-width="1"/><text x="${x}" y="${y + 36}" text-anchor="middle" font-size="11" fill="${hl ? '#d35400' : '#333'}">${d}</text>`; }
    return `<svg viewBox="0 0 ${W} 46" width="${W}" height="46" style="max-width:100%;height:auto">${s}</svg>`;
  }
  const flines = (ds, hls) => `<div class="center" style="display:flex;flex-direction:column;gap:4px">${ds.map((d, i) => fline(d, { hl: hls ? hls[i] : null })).join('')}</div>`;
  window.L3.fig = fig; window.L3.fline = fline; window.L3.flines = flines; window.L3.frac = frac;

  const S = window.StepKinds;
  /* l3equivfig：{n, d, kind, k} 第一图 n/d，第二图分成 d*k 份 */
  S.l3equivfig = ({ n, d, kind, k, opts }) => { const n2 = n * k, d2 = d * k; const pics = sh => `<div class="center fig-row">${fig(kind, d, n, opts)}${fig(kind, d2, sh, Object.assign({}, opts, opts && opts.rows ? { rows: opts.rows * (k === 2 ? 1 : 1), cols: opts.cols * k } : {}))}</div>`; return [
    { zh: `第一个图分成 <b>${d}</b> 份，涂了 <b>${n}</b> 份：${n}/${d}。第二个图把每一份再分成 ${k} 小份，一共 <b>${d2}</b> 份。`, en: `The second figure has ${d2} equal parts.`, render: s => { s.innerHTML = wrap(pics(0), line(`${d} × ${k} = ${d2} 份`)); } },
    { zh: `要涂同样大的一块：${n} 份 × ${k} = <b>${n2}</b> 小份。`, en: `Shade ${n} × ${k} = ${n2} parts.`, render: s => { s.innerHTML = wrap(pics(n2), line(`${n} × ${k} = ${n2}`)); } },
    { zh: `涂色部分一样大，所以 ${frac(n, d, true)} = ${frac(n2, d2, true)}，它们是<b>等值分数</b>（equivalent fractions）。`, en: `${n}/${d} = ${n2}/${d2}.`, render: s => { s.innerHTML = wrap(pics(n2), line(`${frac(n, d, true)} = ${frac(n2, d2, true)}`)); } },
  ]; };
  /* l3equivline：{ds:[2,6,8], n:[1,3,4]} 数轴上对齐 */
  S.l3equivline = ({ ds, ns }) => [
    { zh: `三条数轴一样长（0 到 1），只是分的份数不同：${ds.join('、')} 份。`, en: 'Same length, different number of parts.', render: s => { s.innerHTML = wrap(flines(ds)); } },
    { zh: `找<b>上下对齐</b>的刻度：${ns.map((n, i) => `${n}/${ds[i]}`).join('、')} 在同一个位置。`, en: 'Look for marks that line up.', render: s => { s.innerHTML = wrap(flines(ds, ns.map(n => [n]))); } },
    { zh: `在同一个位置，大小就一样：${ns.map((n, i) => frac(n, ds[i], true)).join(' = ')}，是等值分数。`, en: `${ns.map((n, i) => `${n}/${ds[i]}`).join(' = ')}.`, render: s => { s.innerHTML = wrap(flines(ds, ns.map(n => [n])), line(ns.map((n, i) => frac(n, ds[i], true)).join(' = '))); } },
  ];
  /* l3equivmul：{n, d, k, miss:'n'|'d'} */
  S.l3equivmul = ({ n, d, k, miss }) => [
    { zh: `分子分母<b>乘同一个数</b>，分数大小不变。${miss === 'd' ? `分子 ${n} 变成了 ${n * k}：${n} × <b>${k}</b> = ${n * k}。` : `分母 ${d} 变成了 ${d * k}：${d} × <b>${k}</b> = ${d * k}。`}`, en: `Multiply top and bottom by ${k}.`, render: s => { s.innerHTML = wrap(line(`${frac(n, d, true)} = ${frac(miss === 'n' ? '?' : n * k, miss === 'd' ? '?' : d * k, true)}`), line(`× ${k}`)); } },
    { zh: `${miss === 'd' ? `分母也乘 ${k}：${d} × ${k} = <b>${d * k}</b>` : `分子也乘 ${k}：${n} × ${k} = <b>${n * k}</b>`}。所以 ${frac(n, d, true)} = ${frac(n * k, d * k, true)}。`, en: `${n}/${d} = ${n * k}/${d * k}.`, render: s => { s.innerHTML = wrap(line(`${frac(n, d, true)} = ${frac(n * k, d * k, true)}`)); } },
  ];
  /* l3equivlist：{n, d} 列出 ×2..×5 */
  S.l3equivlist = ({ n, d }) => [
    { zh: `从 ${frac(n, d, true)} 出发，分子分母同时乘 2、3、4、5……`, en: 'Multiply top and bottom by 2, 3, 4, 5...', render: s => { s.innerHTML = wrap(line(frac(n, d, true))); } },
    { zh: [2, 3, 4, 5].map(k => `× ${k}：${frac(n * k, d * k, true)}`).join('　'), en: 'Equivalent fractions.', render: s => { s.innerHTML = wrap(line([1, 2, 3, 4, 5].map(k => frac(n * k, d * k, true)).join(' = '))); } },
  ];
  /* l3simplest：{n, d} */
  S.l3simplest = ({ n, d }) => { const g = gcd(n, d); return [
    { zh: `找一个能同时整除 <b>${n}</b> 和 <b>${d}</b> 的最大的数：${g}。`, en: `The greatest number that divides both ${n} and ${d} is ${g}.`, render: s => { s.innerHTML = wrap(line(`${frac(n, d, true)}`), line(`${n} ÷ ${g} = ${n / g}，${d} ÷ ${g} = ${d / g}`)); } },
    { zh: `分子分母都<b>除以 ${g}</b>：${frac(n, d, true)} = ${frac(n / g, d / g, true)}。${n / g} 和 ${d / g} 不能再同时除了，这就是<b>最简分数</b>。`, en: `${n}/${d} = ${n / g}/${d / g} in simplest form.`, render: s => { s.innerHTML = wrap(line(`${frac(n, d, true)} = ${frac(n / g, d / g, true)}`), line(`÷ ${g}`)); } },
  ]; };
  /* l3cmpfig：{a:[n,d], b:[n,d], kind, opts, want} 同分母看图 */
  S.l3cmpfig = ({ a, b, kind, opts, want }) => { opts = opts || {}; const big = a[0] > b[0] ? a : b, small = a[0] > b[0] ? b : a; return [
    { zh: `两个图都分成 <b>${a[1]}</b> 份（一样大的份）。左边涂了 ${a[0]} 份 = ${frac(a[0], a[1])}，右边涂了 ${b[0]} 份 = ${frac(b[0], b[1])}。`, en: `${a[0]}/${a[1]} and ${b[0]}/${b[1]}.`, render: s => { s.innerHTML = wrap(`<div class="center fig-row">${fig(kind, a[1], a[0], opts)}${fig(kind, b[1], b[0], opts)}</div>`); } },
    { zh: `分母一样，比分子：${big[0]} > ${small[0]}，所以 ${frac(big[0], big[1], true)} is greater than ${frac(small[0], small[1], true)}，${frac(small[0], small[1], true)} is smaller than ${frac(big[0], big[1], true)}。`, en: `${big[0]}/${big[1]} > ${small[0]}/${small[1]}.`, render: s => { s.innerHTML = wrap(line(`${frac(big[0], big[1], true)} &gt; ${frac(small[0], small[1], true)}`)); } },
  ]; };
  /* l3cmp：异分母比较 {a:[n,d], b:[n,d], want:'greater'|'smaller'} */
  S.l3cmp = ({ a, b, want }) => { const L = lcm(a[1], b[1]), a2 = [a[0] * L / a[1], L], b2 = [b[0] * L / b[1], L]; const ka = L / a[1], kb = L / b[1]; const pick = (want === 'greater' ? a2[0] > b2[0] : a2[0] < b2[0]) ? a : b; return [
    { zh: `分母不一样（${a[1]} 和 ${b[1]}），不能直接比。先把它们变成<b>同分母</b>：${a[1]} 和 ${b[1]} 的公倍数是 <b>${L}</b>。`, en: `Make the same denominator: ${L}.`, render: s => { s.innerHTML = wrap(line(`${frac(a[0], a[1], true)} 和 ${frac(b[0], b[1], true)}`), line(`分母 → ${L}`)); } },
    { zh: `${ka > 1 ? `${frac(a[0], a[1], true)} = ${frac(a2[0], L, true)}（× ${ka}）` : `${frac(a[0], a[1], true)} 不变`}；${kb > 1 ? `${frac(b[0], b[1], true)} = ${frac(b2[0], L, true)}（× ${kb}）` : `${frac(b[0], b[1], true)} 不变`}。`, en: `${a2[0]}/${L} and ${b2[0]}/${L}.`, render: s => { s.innerHTML = wrap(line(`${frac(a[0], a[1], true)} = ${frac(a2[0], L, true)}`), line(`${frac(b[0], b[1], true)} = ${frac(b2[0], L, true)}`)); } },
    { zh: `现在比分子：${a2[0]} 和 ${b2[0]}，${want === 'greater' ? '大' : '小'}的是 ${Math[want === 'greater' ? 'max' : 'min'](a2[0], b2[0])}，所以${want === 'greater' ? '较大' : '较小'}的分数是 <b>${frac(pick[0], pick[1], true)}</b>。`, en: `The ${want} fraction is ${pick[0]}/${pick[1]}.`, render: s => { s.innerHTML = wrap(line(`${frac(a2[0], L, true)} ${a2[0] > b2[0] ? '&gt;' : '&lt;'} ${frac(b2[0], L, true)}`), line(frac(pick[0], pick[1], true))); } },
  ]; };
  /* l3arrange：{list:[[n,d]...], desc} */
  S.l3arrange = ({ list, desc }) => { const L = list.reduce((m, f) => lcm(m, f[1]), 1); const conv = list.map(f => [f[0] * L / f[1], L]); const idx = list.map((_, i) => i).sort((x, y) => desc ? conv[y][0] - conv[x][0] : conv[x][0] - conv[y][0]); const sameD = list.every(f => f[1] === list[0][1]); return [
    { zh: sameD ? `分母都是 ${list[0][1]}，直接比分子。` : `分母不同，先全部变成同分母 <b>${L}</b>：${list.map((f, i) => `${frac(f[0], f[1], true)} = ${frac(conv[i][0], L, true)}`).join('，')}。`, en: sameD ? 'Same denominator: compare the numerators.' : `Change to denominator ${L}.`, render: s => { s.innerHTML = wrap(line(list.map(f => frac(f[0], f[1], true)).join('　')), sameD ? '' : line(conv.map(c => frac(c[0], c[1], true)).join('　'))); } },
    { zh: `比分子，从${desc ? '大到小' : '小到大'}：${idx.map(i => conv[i][0]).join(desc ? ' > ' : ' < ')}。`, en: 'Order the numerators.', render: s => { s.innerHTML = wrap(line(idx.map(i => frac(conv[i][0], L, true)).join(desc ? ' &gt; ' : ' &lt; '))); } },
    { zh: `换回原来的分数：<b>${idx.map(i => `${list[i][0]}/${list[i][1]}`).join(', ')}</b>。`, en: idx.map(i => `${list[i][0]}/${list[i][1]}`).join(', '), render: s => { s.innerHTML = wrap(line(idx.map(i => frac(list[i][0], list[i][1], true)).join(desc ? ' &gt; ' : ' &lt; '))); } },
  ]; };
  /* l3addsub：{terms:[[n,d]...], ops:['+','-'...], start?:1} 1 − a − b 时 start=1 */
  S.l3addsub = ({ terms, ops, start }) => {
    const all = (start ? [[1, 1]] : []).concat(terms), L = all.reduce((m, f) => lcm(m, f[1]), 1);
    const conv = all.map(f => [f[0] * L / f[1], L]);
    const signs = ['+'].concat(ops);
    const expr = (arr, fn) => arr.map((f, i) => `${i ? ` ${signs[i] === '-' ? '−' : '+'} ` : ''}${fn(f)}`).join('');
    let acc = conv[0][0]; const run = [conv[0][0]]; for (let i = 1; i < conv.length; i++) { acc = signs[i] === '-' ? acc - conv[i][0] : acc + conv[i][0]; run.push(acc); }
    const g = gcd(acc, L) || 1;
    const steps = [{ zh: `分母不一样，先变成<b>同分母 ${L}</b>${start ? '（1 = ' + L + '/' + L + '）' : ''}：${all.map((f, i) => f[1] === L ? `${frac(f[0], f[1], true)} 不变` : `${frac(f[0], f[1], true)} = ${frac(conv[i][0], L, true)}`).join('，')}。`, en: `Change to denominator ${L}.`, render: s => { s.innerHTML = wrap(line(expr(all, f => frac(f[0], f[1], true))), line(expr(conv, f => frac(f[0], f[1], true)))); } }];
    for (let i = 1; i < conv.length; i++) { const prev = run[i - 1], cur = run[i]; steps.push({ zh: `分母相同就只算分子：${prev} ${signs[i] === '-' ? '−' : '+'} ${conv[i][0]} = <b>${cur}</b>，分母还是 ${L}。`, en: `${prev} ${signs[i]} ${conv[i][0]} = ${cur}.`, render: s => { s.innerHTML = wrap(line(expr(conv, f => frac(f[0], f[1], true))), line(`${prev} ${signs[i] === '-' ? '−' : '+'} ${conv[i][0]} = ${cur}`), line(frac(cur, L, true))); } }); }
    steps.push({ zh: `答案 ${frac(acc, L, true)}${g > 1 ? `，化简：分子分母都除以 ${g} = <b>${frac(acc / g, L / g, true)}</b>` : '（已经是最简）'}。`, en: `${acc}/${L}${g > 1 ? ` = ${acc / g}/${L / g}` : ''}.`, render: s => { s.innerHTML = wrap(line(`${expr(all, f => frac(f[0], f[1], true))} = ${frac(acc, L, true)}${g > 1 ? ' = ' + frac(acc / g, L / g, true) : ''}`)); } });
    return steps;
  };
})();
