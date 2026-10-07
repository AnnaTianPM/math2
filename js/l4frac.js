/* Level 4 · Unit 8  分数：带分数、假分数、数轴、比较排序、一个数的几分之几 讲解动画 */
(function () {
  const line = t => `<div class="expand-line">${t}</div>`;
  const wrap = (...parts) => `<div class="l1wrap">${parts.join('')}</div>`;
  const L3 = window.L3, frac = L3.frac, fig = L3.fig;
  const gcd = (a, b) => b ? gcd(b, a % b) : a;
  const lcm = (a, b) => a / gcd(a, b) * b;
  const mixed = (w, n, d, big) => n ? `<span class="mixed ${big ? 'big' : ''}"><span class="w">${w}</span>${frac(n, d, big)}</span>` : `<b style="font-size:${big ? 34 : 20}px">${w}</b>`;
  const showF = (f, big) => f.length === 3 ? mixed(f[0], f[1], f[2], big) : f[1] === 1 ? `<b style="font-size:${big ? 34 : 20}px">${f[0]}</b>` : frac(f[0], f[1], big);
  const txtF = f => f.length === 3 ? `${f[0]} ${f[1]}/${f[2]}` : f[1] === 1 ? String(f[0]) : `${f[0]}/${f[1]}`;
  const toImp = f => f.length === 3 ? [f[0] * f[2] + f[1], f[2]] : f;
  const WORD = { 2: 'halves', 3: 'thirds', 4: 'quarters', 5: 'fifths', 6: 'sixths', 7: 'sevenths', 8: 'eighths', 9: 'ninths', 10: 'tenths', 11: 'elevenths', 12: 'twelfths' };
  const ZHW = d => `${d} 分之`;
  /* 分数数轴：lo..hi 整数，每段 d 份；o.labels[i] 每刻度标签 html（可 null），o.arrows=[{i,text?}] */
  function numline(lo, hi, d, o = {}) {
    const N = (hi - lo) * d, W = 560, x0 = 40, x1 = 520, y = 40, X = i => x0 + (x1 - x0) * i / N;
    let s = `<line x1="${x0 - 16}" y1="${y}" x2="${x1 + 16}" y2="${y}" stroke="#333" stroke-width="2"/>`;
    for (let i = 0; i <= N; i++) { const int = i % d === 0, hl = (o.hl || []).includes(i); s += `<line x1="${X(i)}" y1="${y - (int ? 10 : 6)}" x2="${X(i)}" y2="${y + (int ? 10 : 6)}" stroke="${hl ? '#ff9f43' : '#333'}" stroke-width="${hl || int ? 2 : 1.2}"/>`; if (o.labels) { const lb = o.labels[i]; if (lb) s += `<foreignObject x="${X(i) - 18}" y="${y + 12}" width="36" height="44"><div xmlns="http://www.w3.org/1999/xhtml" style="text-align:center;font-size:13px;font-weight:700;line-height:1">${lb}</div></foreignObject>`; } else if (int) s += `<text x="${X(i)}" y="${y + 28}" text-anchor="middle" font-size="16" font-weight="800">${lo + i / d}</text>`; }
    (o.arrows || []).forEach(a => { const x = X(a.i); s += `<line x1="${x}" y1="${y - 34}" x2="${x}" y2="${y - 14}" stroke="#ff7f2a" stroke-width="2"/><polygon points="${x},${y - 12} ${x - 4},${y - 19} ${x + 4},${y - 19}" fill="#ff7f2a"/>`; if (a.text !== undefined) s += `<foreignObject x="${x - 24}" y="${y - 78}" width="48" height="44"><div xmlns="http://www.w3.org/1999/xhtml" style="text-align:center;font-size:14px;font-weight:800;line-height:1;color:#1a7f37">${a.text}</div></foreignObject>`; else s += `<rect x="${x - 14}" y="${y - 66}" width="28" height="28" rx="3" fill="#fff" stroke="#ff7f2a" stroke-width="1.5"/>`; });
    if (o.hops) { for (let i = o.hops[0] + 1; i <= o.hops[1]; i++) s += `<circle cx="${X(i)}" cy="${y}" r="4" fill="#ff9f43"/>`; }
    return `<svg viewBox="0 0 ${W} ${o.labels ? 96 : 76}" width="${W}" style="max-width:100%;height:auto;overflow:visible"><g transform="translate(0 ${o.labels ? 40 : 30})">${s}</g></svg>`;
  }
  const S = window.StepKinds;
  /* l4mixsum：{w, n, d} 3 + 1/2 */
  S.l4mixsum = ({ w, n, d }) => [
    { zh: `<b>${w}</b> 是整数（${w} wholes），<b>${frac(n, d)}</b> 是比 1 小的分数。整数和分数合在一起写，就是<b>带分数（mixed number）</b>。`, en: 'A whole number and a fraction together make a mixed number.', render: s => { s.innerHTML = wrap(`<div class="center fig-row">${Array.from({ length: w }, () => fig('strips', 1, 1, { w: 70 })).join('')}${fig('strips', d, n, { w: 70 })}</div>`, line(`${w} + ${frac(n, d, true)}`)); } },
    { zh: `把分数写在整数右边：${w} + ${frac(n, d)} = <b>${mixed(w, n, d)}</b>，读作 ${w} and ${n} ${n === 1 ? WORD[d].replace(/s$/, '').replace('halve', 'half') : WORD[d]}。`, en: `${w} + ${n}/${d} = ${w} ${n}/${d}.`, render: s => { s.innerHTML = wrap(line(`${w} + ${frac(n, d, true)} = ${mixed(w, n, d, true)}`)); } },
  ];
  /* l4wholes：{w, n, d, kind} */
  S.l4wholes = ({ w, n, d, kind }) => [
    { zh: `先数<b>整的</b>：涂满的有 <b>${w}</b> 个，就是 ${w} wholes。`, en: `${w} wholes.`, render: s => { s.innerHTML = wrap(`<div class="center fig-row">${Array.from({ length: w }, () => fig(kind, 1, 1, { w: 60 })).join('')}${fig(kind, d, n, { w: 60 })}</div>`, line(`${w} wholes`)); } },
    { zh: `再看<b>没涂满</b>的那个：分成 ${d} 份，涂了 <b>${n}</b> 份，是 ${n} ${WORD[d]} = ${frac(n, d)}。`, en: `${n} ${WORD[d]}.`, render: s => { s.innerHTML = wrap(`<div class="center">${fig(kind, d, n, { w: 90 })}</div>`, line(`${n} ${WORD[d]} = ${frac(n, d, true)}`)); } },
    { zh: `合起来：${w} wholes and ${n} ${WORD[d]} = <b>${mixed(w, n, d)}</b>。`, en: `${w} ${n}/${d}.`, render: s => { s.innerHTML = wrap(line(`${w} + ${frac(n, d, true)} = ${mixed(w, n, d, true)}`)); } },
  ];
  /* l4mixline：{lo, hi, d, arrows:[i]} */
  S.l4mixline = ({ lo, hi, d, arrows }) => { const ans = i => [lo + Math.floor(i / d), i % d, d]; return [
    { zh: `看数轴：每两个整数之间分成 <b>${d}</b> 小格，所以每小格是 <b>${frac(1, d)}</b>。`, en: `Each small step is 1/${d}.`, render: s => { s.innerHTML = wrap(`<div class="center">${numline(lo, hi, d, { arrows: arrows.map(i => ({ i })) })}</div>`, line(`每格 ${frac(1, d, true)}`)); } },
    ...arrows.map((i, k) => { const [w, n] = ans(i); return { zh: `第 ${k + 1} 个箭头：在 <b>${w}</b> 右边数 <b>${n}</b> 小格，是 ${w} 又 ${n} 个 ${frac(1, d)} = <b>${mixed(w, n, d)}</b>${gcd(n, d) > 1 ? `（也可以写成 ${mixed(w, n / gcd(n, d), d / gcd(n, d))}）` : ''}。`, en: `${w} and ${n} steps: ${w} ${n}/${d}.`, render: s => { s.innerHTML = wrap(`<div class="center">${numline(lo, hi, d, { arrows: arrows.map((j, m) => m <= k ? { i: j, text: mixed(...ans(j)) } : { i: j }), hl: [i], hops: [i - n, i] })}</div>`, line(`${w} + ${frac(n, d, true)} = ${mixed(w, n, d, true)}`)); } }; }),
  ]; };
  /* l4wholesto：{w, n, d} 2 = ? halves / 3 1/3 = ? thirds */
  S.l4wholesto = ({ w, n, d }) => [
    { zh: `1 个整的 = <b>${d}</b> ${WORD[d]}（${frac(d, d)}）。所以 ${w} 个整的 = ${w} × ${d} = <b>${w * d}</b> ${WORD[d]}。`, en: `1 whole = ${d} ${WORD[d]}, so ${w} wholes = ${w * d}.`, render: s => { s.innerHTML = wrap(`<div class="center fig-row">${Array.from({ length: w }, () => fig('strips', d, d, { w: 70 })).join('')}${n ? fig('strips', d, n, { w: 70 }) : ''}</div>`, line(`1 whole = ${d} ${WORD[d]}`), line(`${w} × ${d} = ${w * d}`)); } },
    n ? { zh: `再加上多出来的 ${n} ${WORD[d]}：${w * d} + ${n} = <b>${w * d + n}</b>。所以 ${mixed(w, n, d)} = ${w * d + n} ${WORD[d]}。`, en: `${w * d} + ${n} = ${w * d + n}.`, render: s => { s.innerHTML = wrap(line(`(${w} × ${d}) + ${n} = ${w * d + n}`)); } }
      : { zh: `所以 ${w} = <b>${w * d}</b> ${WORD[d]}。`, en: `${w} = ${w * d} ${WORD[d]}.`, render: s => { s.innerHTML = wrap(line(`${w} × ${d} = ${w * d}`)); } },
  ];
  /* l4impline：{lo, hi, d, labels, arrows:[i]} 假分数数轴（最简） */
  S.l4impline = ({ lo, hi, d, labels, arrows }) => [
    { zh: `数轴从 0 开始每小格 <b>${frac(1, d)}</b>。过了 1 以后继续数：${frac(d + 1, d)}、${frac(d + 2, d)}……分子比分母大的叫<b>假分数（improper fraction）</b>。`, en: `Keep counting in ${WORD[d]} past 1.`, render: s => { s.innerHTML = wrap(`<div class="center">${numline(lo, hi, d, { labels, arrows: arrows.map(i => ({ i })) })}</div>`); } },
    ...arrows.map((i, k) => { const g = gcd(i, d), sn = i / g, sd = d / g; return { zh: `第 ${k + 1} 个箭头：从 0 数了 <b>${i}</b> 小格，是 ${frac(i, d)}${g > 1 ? `。分子分母都能除以 ${g}，化成最简：<b>${sd === 1 ? sn : frac(sn, sd)}</b>` : '，已经是最简'}。`, en: `${i}/${d}${g > 1 ? ` = ${sn}/${sd}` : ''}.`, render: s => { s.innerHTML = wrap(`<div class="center">${numline(lo, hi, d, { labels, arrows: arrows.map((j, m) => m <= k ? { i: j, text: (() => { const gg = gcd(j, d); return d / gg === 1 ? String(j / gg) : frac(j / gg, d / gg); })() } : { i: j }), hl: [i] })}</div>`, line(`${frac(i, d, true)}${g > 1 ? ` = ${sd === 1 ? `<b>${sn}</b>` : frac(sn, sd, true)}` : ''}`)); } }; }),
  ];
  /* l4mixsimp：{w, n, d} */
  S.l4mixsimp = ({ w, n, d }) => { const g = gcd(n, d); return [
    { zh: `带分数化简，整数 <b>${w}</b> 不动，只化简分数部分 ${frac(n, d)}。`, en: `Keep ${w}. Simplify ${n}/${d}.`, render: s => { s.innerHTML = wrap(line(mixed(w, n, d, true))); } },
    { zh: `${n} 和 ${d} 都能被 <b>${g}</b> 整除：${n} ÷ ${g} = ${n / g}，${d} ÷ ${g} = ${d / g}。所以 ${mixed(w, n, d)} = <b>${mixed(w, n / g, d / g)}</b>。`, en: `${n}/${d} = ${n / g}/${d / g}.`, render: s => { s.innerHTML = wrap(line(`${mixed(w, n, d, true)} = ${mixed(w, n / g, d / g, true)}`), line(`÷ ${g}`)); } },
  ]; };
  /* l4impsimp：{n, d} 假分数最简 */
  S.l4impsimp = ({ n, d }) => { const g = gcd(n, d); return [
    { zh: `找能同时整除 <b>${n}</b> 和 <b>${d}</b> 的最大的数：<b>${g}</b>。`, en: `Both divide by ${g}.`, render: s => { s.innerHTML = wrap(line(frac(n, d, true)), line(`${n} ÷ ${g} = ${n / g}，${d} ÷ ${g} = ${d / g}`)); } },
    { zh: `分子分母都除以 ${g}：${frac(n, d)} = <b>${frac(n / g, d / g)}</b>。还是假分数，但已经最简。`, en: `${n}/${d} = ${n / g}/${d / g}.`, render: s => { s.innerHTML = wrap(line(`${frac(n, d, true)} = ${frac(n / g, d / g, true)}`)); } },
  ]; };
  /* l4toimp：{w, n, d} */
  S.l4toimp = ({ w, n, d }) => [
    { zh: `${mixed(w, n, d)} 里的整数 ${w} 先变成 ${WORD[d]}：1 = ${frac(d, d)}，所以 ${w} = ${frac(w * d, d)}（${w} × ${d} = ${w * d}）。`, en: `${w} = ${w * d}/${d}.`, render: s => { s.innerHTML = wrap(`<div class="center fig-row">${Array.from({ length: w }, () => fig('strips', d, d, { w: 70 })).join('')}${fig('strips', d, n, { w: 70 })}</div>`, line(`${w} = ${frac(w * d, d, true)}`)); } },
    { zh: `再加上 ${frac(n, d)}：${frac(w * d, d)} + ${frac(n, d)} = <b>${frac(w * d + n, d)}</b>。快捷算法：(${w} × ${d}) + ${n} = ${w * d + n}，分母不变。`, en: `(${w} × ${d}) + ${n} = ${w * d + n}.`, render: s => { s.innerHTML = wrap(line(`${mixed(w, n, d, true)} = ${frac(w * d, d, true)} + ${frac(n, d, true)} = ${frac(w * d + n, d, true)}`)); } },
  ];
  /* l4tomixed：{n, d} */
  S.l4tomixed = ({ n, d }) => { const w = Math.floor(n / d), r = n % d; return [
    { zh: `${frac(n, d)}：每 <b>${d}</b> 个 ${WORD[d]} 凑成 1 个整的。${n} ÷ ${d} = <b>${w}</b>${r ? ` 余 <b>${r}</b>` : '，正好整除'}。`, en: `${n} ÷ ${d} = ${w}${r ? ` R ${r}` : ''}.`, render: s => { s.innerHTML = wrap(`<div class="center fig-row">${Array.from({ length: w }, () => fig('strips', d, d, { w: 70 })).join('')}${r ? fig('strips', d, r, { w: 70 }) : ''}</div>`, line(`${n} ÷ ${d} = ${w}${r ? ` R ${r}` : ''}`)); } },
    { zh: r ? `${w} 个整的，还剩 ${r} ${WORD[d]}：${frac(n, d)} = ${frac(w * d, d)} + ${frac(r, d)} = ${w} + ${frac(r, d)} = <b>${mixed(w, r, d)}</b>。` : `正好 ${w} 个整的：${frac(n, d)} = <b>${w}</b>。`, en: r ? `${n}/${d} = ${w} ${r}/${d}.` : `${n}/${d} = ${w}.`, render: s => { s.innerHTML = wrap(line(r ? `${frac(n, d, true)} = ${frac(w * d, d, true)} + ${frac(r, d, true)} = ${mixed(w, r, d, true)}` : `${frac(n, d, true)} = <b>${w}</b>`)); } },
  ]; };
  /* l4cmpmix：{a, b, want} a/b 为 [n,d] 或 [w,n,d] */
  S.l4cmpmix = ({ a, b, want }) => {
    const A = toImp(a), B = toImp(b), L = lcm(A[1], B[1]), A2 = [A[0] * L / A[1], L], B2 = [B[0] * L / B[1], L];
    const pickA = want === 'greater' ? A2[0] > B2[0] : A2[0] < B2[0], pick = pickA ? a : b;
    const steps = [{ zh: `比较 ${showF(a)} 和 ${showF(b)}。${a.length === 3 || b.length === 3 ? '有带分数，先都<b>化成假分数</b>：' + (a.length === 3 ? `${showF(a)} = ${frac(A[0], A[1])}` : '') + (a.length === 3 && b.length === 3 ? '，' : '') + (b.length === 3 ? `${showF(b)} = ${frac(B[0], B[1])}` : '') + '。' : ''}`, en: 'Change mixed numbers to improper fractions first.', render: s => { s.innerHTML = wrap(line(`${showF(a, true)}　${showF(b, true)}`), a.length === 3 || b.length === 3 ? line(`${frac(A[0], A[1], true)}　${frac(B[0], B[1], true)}`) : ''); } }];
    if (A[1] !== B[1]) steps.push({ zh: `分母不同（${A[1]} 和 ${B[1]}），变成同分母 <b>${L}</b>：${frac(A[0], A[1])} = ${frac(A2[0], L)}，${frac(B[0], B[1])} = ${frac(B2[0], L)}。`, en: `Common denominator ${L}.`, render: s => { s.innerHTML = wrap(line(`${frac(A[0], A[1], true)} = ${frac(A2[0], L, true)}`), line(`${frac(B[0], B[1], true)} = ${frac(B2[0], L, true)}`)); } });
    steps.push({ zh: `分母一样比分子：${A2[0]} ${A2[0] > B2[0] ? '>' : '<'} ${B2[0]}，所以${want === 'greater' ? '大' : '小'}的是 <b>${showF(pick)}</b>。`, en: `The ${want} one is ${txtF(pick)}.`, render: s => { s.innerHTML = wrap(line(`${frac(A2[0], L, true)} ${A2[0] > B2[0] ? '&gt;' : '&lt;'} ${frac(B2[0], L, true)}`), line(showF(pick, true))); } });
    return steps;
  };
  /* l4arrmix：{list, desc} */
  S.l4arrmix = ({ list, desc }) => {
    const imps = list.map(toImp), L = imps.reduce((m, f) => lcm(m, f[1]), 1), conv = imps.map(f => [f[0] * L / f[1], L]);
    const idx = list.map((_, i) => i).sort((x, y) => desc ? conv[y][0] - conv[x][0] : conv[x][0] - conv[y][0]);
    return [
      { zh: `先把带分数都化成假分数：${list.map((f, i) => f.length === 3 ? `${showF(f)} = ${frac(imps[i][0], imps[i][1])}` : showF(f)).join('，')}。`, en: 'Change to improper fractions.', render: s => { s.innerHTML = wrap(line(list.map(f => showF(f, true)).join('　')), line(imps.map(f => frac(f[0], f[1], true)).join('　'))); } },
      { zh: `再变成同分母 <b>${L}</b>：${imps.map((f, i) => `${frac(f[0], f[1])} = ${frac(conv[i][0], L)}`).join('，')}。`, en: `Common denominator ${L}.`, render: s => { s.innerHTML = wrap(line(conv.map(c => frac(c[0], c[1], true)).join('　'))); } },
      { zh: `比分子从${desc ? '大到小' : '小到大'}：${idx.map(i => conv[i][0]).join(desc ? ' > ' : ' < ')}，换回原来的数：<b>${idx.map(i => txtF(list[i])).join(', ')}</b>。`, en: idx.map(i => txtF(list[i])).join(', '), render: s => { s.innerHTML = wrap(line(idx.map(i => frac(conv[i][0], L, true)).join(desc ? ' &gt; ' : ' &lt; ')), line(idx.map(i => showF(list[i], true)).join(desc ? ' &gt; ' : ' &lt; '))); } },
    ];
  };
  /* l4fracof：{n, d, total} */
  S.l4fracof = ({ n, d, total }) => { const unit = total / d; return [
    { zh: `${frac(n, d)} of ${total}："of" 就是<b>乘</b>：${frac(n, d)} × ${total}。先求 ${frac(1, d)}：把 ${total} 平均分成 ${d} 份，${total} ÷ ${d} = <b>${unit}</b>。`, en: `${total} ÷ ${d} = ${unit}.`, render: s => { s.innerHTML = wrap(`<div class="center">${L3.ubar([{ n: d, top: total, bottom: '?', bottomN: n }])}</div>`, line(`${total} ÷ ${d} = ${unit}`)); } },
    { zh: `要 ${n} 份：${unit} × ${n} = <b>${unit * n}</b>。所以 ${frac(n, d)} of ${total} = ${unit * n}。`, en: `${unit} × ${n} = ${unit * n}.`, render: s => { s.innerHTML = wrap(`<div class="center">${L3.ubar([{ n: d, top: total, bottom: unit * n, bottomN: n }])}</div>`, line(`${frac(n, d, true)} × ${total} = ${unit * n}`)); } },
  ]; };
  window.L4FRAC = { mixed, showF, txtF, numline, toImp, gcd, lcm, WORD };
})();
