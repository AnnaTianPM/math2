/* Level 4 · Unit 10  小数：圆片、数位表、数轴、比较排序、四舍五入、分数互化 讲解动画 */
(function () {
  const line = t => `<div class="expand-line">${t}</div>`;
  const wrap = (...parts) => `<div class="l1wrap">${parts.join('')}</div>`;
  const L3 = window.L3, frac = L3.frac, FR = window.L4FRAC;
  const gcd = (a, b) => b ? gcd(b, a % b) : a;
  const dpOf = s => String(s).includes('.') ? String(s).split('.')[1].length : 0;
  const toI = (s, dp) => Math.round(Number(s) * 10 ** dp);
  const fromI = (i, dp) => (i / 10 ** dp).toFixed(dp);
  const trim0 = s => String(s).includes('.') ? String(s).replace(/0+$/, '').replace(/\.$/, '') : String(s);
  const K = ['H', 'T', 'O', 't', 'h', 'th'];
  const EN = { H: 'hundreds', T: 'tens', O: 'ones', t: 'tenths', h: 'hundredths', th: 'thousandths' };
  const ZH = { H: '百位', T: '十位', O: '个位', t: '十分位', h: '百分位', th: '千分位' };
  const VAL = { H: 100, T: 10, O: 1, t: 0.1, h: 0.01, th: 0.001 };
  const DP = { H: 0, T: 0, O: 0, t: 1, h: 2, th: 3 };
  const CSS = { H: 'var(--hund)', T: 'var(--tens)', O: 'var(--ones)', t: '#8e44ad', h: '#16a085', th: '#c0392b' };
  const col = (k, s) => `<b style="color:${CSS[k]}">${s}</b>`;
  const valStr = (k, d) => (d * VAL[k]).toFixed(DP[k]);
  /* 拆位：'70.24' → [{k:'T',d:7},{k:'O',d:0},{k:'t',d:2},{k:'h',d:4}] */
  function digitsOf(s) {
    const [ip, fp = ''] = String(s).split('.'); const out = [];
    const ik = ['O', 'T', 'H']; ip.split('').reverse().forEach((d, i) => out.unshift({ k: ik[i], d: +d }));
    fp.split('').forEach((d, i) => out.push({ k: ['t', 'h', 'th'][i], d: +d }));
    return out;
  }
  /* 数位表 */
  function pvd(s, o = {}) {
    const ds = digitsOf(s); const ks = ds.map(x => x.k);
    const head = ks.map((k, i) => `${k === 't' ? '<th class="dot">·</th>' : ''}<th>${EN[k][0].toUpperCase() + EN[k].slice(1)}</th>`).join('');
    const row = ds.map((x, i) => `${x.k === 't' ? '<td class="dot">.</td>' : ''}<td style="color:${CSS[x.k]}" class="${o.hl === x.k ? 'hl' : ''}">${x.d}</td>`).join('');
    return `<table class="pv4 pvd"><tr>${head}</tr><tr>${row}</tr></table>`;
  }
  const big = (s, hl) => `<div class="bignum">${digitsOf(s).map(x => `${x.k === 't' ? '<span class="d">.</span>' : ''}<span class="d" style="color:${CSS[x.k]};${hl && hl !== x.k ? 'opacity:.3' : ''}">${x.d}</span>`).join('')}</div>`;
  /* 圆片：rows {o,t,h,th}，o.hl 行，o.on 已数个数 */
  function discs(c, o = {}) {
    const rows = [['o', 1, '1'], ['t', 0.1, '0.1'], ['h', 0.01, '0.01'], ['th', 0.001, '0.001']].filter(r => c[r[0]] !== undefined && c[r[0]] > 0);
    return `<div class="ddiscs">${rows.map(([k, v, lab]) => `<div class="drow ${o.hl === k ? 'hl' : ''}">${Array.from({ length: c[k] }, (_, i) => `<span class="disc d${lab.replace('.', '')} ${o.on && o.on[k] !== undefined && i < o.on[k] ? 'on' : ''}">${lab}</span>`).join('')}</div>`).join('')}</div>`;
  }
  const discVal = c => ((c.o || 0) + (c.t || 0) * 0.1 + (c.h || 0) * 0.01 + (c.th || 0) * 0.001);
  const discDp = c => c.th ? 3 : c.h !== undefined ? 2 : 1;
  /* 小数数轴：lo 起点字符串, step 字符串, N 格数, per 大刻度间隔, arrows [{i,text?}] */
  function numline(lo, step, N, per, arrows = [], o = {}) {
    const dp = dpOf(step), L = toI(lo, dp), S = toI(step, dp), W = 560, x0 = 36, x1 = 524, y = 44, X = i => x0 + (x1 - x0) * i / N;
    const lab = i => trim0(fromI(L + i * S, dp));
    let s = `<line x1="${x0 - 14}" y1="${y}" x2="${x1 + 14}" y2="${y}" stroke="#333" stroke-width="2"/>`;
    for (let i = 0; i <= N; i++) { const major = i % per === 0, hl = (o.hl || []).includes(i); s += `<line x1="${X(i)}" y1="${y - (major ? 10 : 6)}" x2="${X(i)}" y2="${y + (major ? 10 : 6)}" stroke="${hl ? '#ff9f43' : '#333'}" stroke-width="${hl || major ? 2 : 1}"/>`; if (major && (!o.labels || o.labels.includes(i))) s += `<text x="${X(i)}" y="${y + 26}" text-anchor="middle" font-size="14" font-weight="700">${lab(i)}</text>`; }
    arrows.forEach(a => { const x = X(a.i); s += `<rect x="${x - 26}" y="2" width="52" height="24" rx="3" fill="${a.text !== undefined ? '#e8f7ec' : '#fff'}" stroke="${a.text !== undefined ? '#1a7f37' : '#ff7f2a'}" stroke-width="1.5"/><text x="${x}" y="19" text-anchor="middle" font-size="14" font-weight="800" fill="#1a7f37">${a.text !== undefined ? a.text : ''}</text><line x1="${x}" y1="26" x2="${x}" y2="${y - 13}" stroke="#333" stroke-width="1.5"/><polygon points="${x},${y - 9} ${x - 4},${y - 16} ${x + 4},${y - 16}" fill="#333"/>`; });
    if (o.hops) for (let i = o.hops[0] + 1; i <= o.hops[1]; i++) s += `<circle cx="${X(i)}" cy="${y}" r="4" fill="#ff9f43"/>`;
    return `<svg viewBox="0 0 ${W} 80" width="${W}" style="max-width:100%;height:auto">${s}</svg>`;
  }
  const lineVal = (lo, step, i) => { const dp = dpOf(step); return fromI(toI(lo, dp) + i * toI(step, dp), dp); };
  /* 字符串四舍五入到 dp 位（半进位） */
  function roundStr(s, dp) { const [ip, fp = ''] = String(s).split('.'); const f = fp.padEnd(dp + 1, '0'); const keep = ip + f.slice(0, dp), next = +f[dp]; let n = BigInt(keep) + (next >= 5 ? 1n : 0n); let str = n.toString().padStart(dp + 1, '0'); return dp ? `${str.slice(0, -dp)}.${str.slice(-dp)}` : str; }
  const S = window.StepKinds;

  /* l4tenthfig：{kind, d, shaded, opts} 涂了几份 → 0.n */
  S.l4tenthfig = ({ kind, d, shaded, opts }) => { const n = Array.isArray(shaded) ? shaded.length : shaded; return [
    { zh: `图形分成 <b>${d}</b> 份一样大的，数一数涂色的：<b>${n}</b> 份。`, en: `${n} out of ${d} equal parts are shaded.`, render: s => { s.innerHTML = wrap(`<div class="center">${window.FracUI.figSVG(kind, d, shaded, Object.assign({ w: 200 }, opts || {}))}</div>`, line(`${n} out of ${d}`)); } },
    { zh: `${n} 份里的 ${d} 份是 ${frac(n, d)}。十分之几写成小数就是 <b>0.${n}</b>（小数点后第一位是十分位）。`, en: `${n}/${d} = 0.${n}.`, render: s => { s.innerHTML = wrap(line(`${frac(n, d, true)} = 0.${n}`)); } },
  ]; };
  /* l4shade100：{n} */
  S.l4shade100 = ({ n }) => [
    { zh: `0.${String(n).padStart(2, '0')} = ${frac(n, 100)}：一共 100 格，要涂 <b>${n}</b> 格。`, en: `${n} out of 100.`, render: s => { s.innerHTML = wrap(`<div class="center">${window.FracUI.figSVG('grid', 100, n, { rows: 10, cols: 10, w: 200 })}</div>`, line(`0.${String(n).padStart(2, '0')} = ${frac(n, 100, true)}`)); } },
    { zh: `一列是 10 格 = 0.1。${Math.floor(n / 10)} 列是 ${n - n % 10} 格，再加 ${n % 10} 格，一共 ${n} 格。涂在哪里都可以，数量对就行。`, en: `${Math.floor(n / 10)} full columns and ${n % 10} more.`, render: s => { s.innerHTML = wrap(`<div class="center">${window.FracUI.figSVG('grid', 100, n, { rows: 10, cols: 10, w: 200 })}</div>`); } },
  ];
  /* l4discdec：{o,t,h,th} */
  S.l4discdec = c => { const dp = discDp(c), total = discVal(c).toFixed(dp); const rows = [['o', '1', 1, 'ones', '个'], ['t', '0.1', 0.1, 'tenths', '十分之一'], ['h', '0.01', 0.01, 'hundredths', '百分之一'], ['th', '0.001', 0.001, 'thousandths', '千分之一']].filter(r => c[r[0]] !== undefined); let run = 0; const parts = [];
    const steps = [{ zh: `每行一种圆片：1、0.1、0.01${c.th !== undefined ? '、0.001' : ''}。一行一行数，再加起来。`, en: 'Count each row, then add.', render: s => { s.innerHTML = wrap(`<div class="center">${discs(c)}</div>`); } }];
    rows.forEach(([k, lab, v, en, zh]) => { const n = c[k] || 0; run += n * v; parts.push(`${n} ${en}`); const sum = run.toFixed(dp); steps.push({ zh: n ? `${n} 个 ${lab}（${n} ${en}）= <b>${(n * v).toFixed(DP[k === 'o' ? 'O' : k])}</b>。${parts.length > 1 ? `加起来 ${sum}。` : ''}` : `没有 ${lab} 的圆片，${en} 是 0。`, en: `${n} ${en} = ${(n * v).toFixed(DP[k === 'o' ? 'O' : k])}.`, render: s => { s.innerHTML = wrap(`<div class="center">${discs(c, { hl: k, on: { [k]: n } })}</div>`, line(`${n} × ${lab} = ${(n * v).toFixed(DP[k === 'o' ? 'O' : k])}`), line(sum)); } }); });
    steps.push({ zh: `${parts.join(' + ')} = <b>${total}</b>。`, en: `${total}.`, render: s => { s.innerHTML = wrap(`<div class="center">${discs(c)}</div>`, pvd(total), line(total)); } });
    return steps; };
  /* l4frac2dec：{w, n, d} d = 10/100/1000 或可乘成它们 */
  S.l4frac2dec = ({ w, n, d }) => { const target = [10, 100, 1000].find(x => x % d === 0 && x >= d) || d; const k = target / d, n2 = n * k; const dp = String(target).length - 1; const whole = Math.floor(n2 / target), rem = n2 % target; const fracDec = (rem / target).toFixed(dp); const total = (w + n2 / target).toFixed(dp);
    const steps = [];
    if (k > 1) steps.push({ zh: `分母 ${d} 不是 10、100、1000，先变一变：分子分母都乘 <b>${k}</b>，${frac(n, d)} = ${frac(n2, target)}。`, en: `${n}/${d} = ${n2}/${target}.`, render: s => { s.innerHTML = wrap(line(`${frac(n, d, true)} = ${frac(n2, target, true)}`), line(`× ${k}`)); } });
    if (n2 >= target) steps.push({ zh: `${frac(n2, target)} 比 1 大，拆开：${frac(n2, target)} = ${frac(whole * target, target)} + ${frac(rem, target)} = ${whole} + ${fracDec}。`, en: `${n2}/${target} = ${whole} + ${fracDec}.`, render: s => { s.innerHTML = wrap(line(`${frac(n2, target, true)} = ${frac(whole * target, target, true)} + ${frac(rem, target, true)}`), line(`= ${whole} + ${fracDec}`)); } });
    else steps.push({ zh: `${target === 10 ? '十分之几' : target === 100 ? '百分之几' : '千分之几'}写成小数：小数点后 ${dp} 位。${frac(n2, target)} = <b>${fracDec}</b>${n2 < target / 10 ? '（不够的位用 0 占着）' : ''}。`, en: `${n2}/${target} = ${fracDec}.`, render: s => { s.innerHTML = wrap(line(`${frac(n2, target, true)} = ${fracDec}`)); } });
    steps.push({ zh: `${w || n2 >= target ? `整数部分 ${w + whole}，` : ''}合起来 = <b>${total}</b>。`, en: `${total}.`, render: s => { s.innerHTML = wrap(line(`${w ? w + ' + ' : ''}${frac(n, d, true)} = ${total}`), pvd(total)); } });
    return steps; };
  /* l4words2dec：{w, n, unit} n 个 1/unit */
  S.l4words2dec = ({ w, n, unit }) => { const dp = String(unit).length - 1, name = { 10: 'tenths', 100: 'hundredths', 1000: 'thousandths' }[unit], zh = { 10: '十分之一', 100: '百分之一', 1000: '千分之一' }[unit]; const whole = Math.floor(n / unit), rem = n % unit, total = (w + n / unit).toFixed(dp); return [
    { zh: `${n} ${name} 就是 ${n} 个${zh} = ${frac(n, unit)}${n >= unit ? `。${unit} 个${zh}凑成 1：${n} ÷ ${unit} = ${whole} 余 ${rem}，所以是 <b>${whole}</b> one${whole > 1 ? 's' : ''} ${rem} ${name}` : ''}。`, en: `${n} ${name} = ${n}/${unit}${n >= unit ? ` = ${whole} + ${rem}/${unit}` : ''}.`, render: s => { s.innerHTML = wrap(line(`${n} ${name} = ${frac(n, unit, true)}`), n >= unit ? line(`= ${whole} + ${frac(rem, unit, true)}`) : ''); } },
    { zh: `${w ? `${w} ones + ` : ''}${whole ? `${whole} + ` : ''}${(rem / unit).toFixed(dp)} = <b>${total}</b>。`, en: `${total}.`, render: s => { s.innerHTML = wrap(line(`${w ? w + ' + ' : ''}${whole ? whole + ' + ' : ''}${(rem / unit).toFixed(dp)} = ${total}`), pvd(total)); } },
  ]; };
  /* l4decline：{lo, step, N, per, arrows:[i]} */
  S.l4decline = ({ lo, step, N, per, arrows }) => [
    { zh: `看数轴：大刻度是 ${trim0(lineVal(lo, step, 0))}、${trim0(lineVal(lo, step, per))}……两个大刻度之间 ${per} 小格，所以每小格是 <b>${step}</b>。`, en: `Each marking is ${step}.`, render: s => { s.innerHTML = wrap(`<div class="center">${numline(lo, step, N, per, arrows.map(i => ({ i })))}</div>`, line(`每格 ${step}`)); } },
    ...arrows.map((i, k) => { const base = Math.floor(i / per) * per, hops = i - base, v = lineVal(lo, step, i); return { zh: `第 ${k + 1} 个箭头：从 <b>${trim0(lineVal(lo, step, base))}</b> 往右数 ${hops} 小格，${trim0(lineVal(lo, step, base))} + ${hops} × ${step} = <b>${trim0(v)}</b>。`, en: `${trim0(lineVal(lo, step, base))} + ${hops} × ${step} = ${trim0(v)}.`, render: s => { s.innerHTML = wrap(`<div class="center">${numline(lo, step, N, per, arrows.map((j, m) => m <= k ? { i: j, text: trim0(lineVal(lo, step, j)) } : { i: j }), { hl: [i], hops: [base, i] })}</div>`, line(trim0(v))); } }; }),
  ];
  /* l4decpv：{n} */
  S.l4decpv = ({ n }) => { const ds = digitsOf(n); return [
    { zh: `小数点左边是整数部分（${ds.filter(x => DP[x.k] === 0).map(x => ZH[x.k]).join('、')}），右边依次是<b>十分位、百分位、千分位</b>（tenths, hundredths, thousandths）。`, en: 'Left of the point: tens, ones. Right: tenths, hundredths, thousandths.', render: s => { s.innerHTML = wrap(`<div class="center">${big(n)}</div>`, pvd(n)); } },
    ...ds.map(x => ({ zh: `数字 ${col(x.k, x.d)} 在<b>${ZH[x.k]}</b>（${EN[x.k]} place），表示 ${x.d} 个 ${VAL[x.k]}，值是 <b>${valStr(x.k, x.d)}</b>。`, en: `${x.d} in the ${EN[x.k]} place: ${valStr(x.k, x.d)}.`, render: s => { s.innerHTML = wrap(`<div class="center">${big(n, x.k)}</div>`, pvd(n, { hl: x.k }), line(`${x.d} × ${VAL[x.k]} = ${valStr(x.k, x.d)}`)); } })),
  ]; };
  /* l4decexpand：{n} */
  S.l4decexpand = ({ n }) => { const ds = digitsOf(n).filter(x => x.d); const parts = ds.map(x => valStr(x.k, x.d)); return [
    { zh: `${n} 每一位的值：${ds.map(x => `${ZH[x.k]} ${col(x.k, x.d)} → ${valStr(x.k, x.d)}`).join('，')}。`, en: 'Value of each digit.', render: s => { s.innerHTML = wrap(`<div class="center">${big(n)}</div>`, pvd(n)); } },
    { zh: `所以 <b>${n} = ${parts.join(' + ')}</b>。`, en: `${n} = ${parts.join(' + ')}.`, render: s => { s.innerHTML = wrap(line(`${n} = ${parts.map((p, i) => col(ds[i].k, p)).join(' + ')}`)); } },
  ]; };
  /* 比较：返回 {k, idx}  list 字符串 */
  function cmpTable(list, o = {}) { const dp = Math.max(...list.map(dpOf)); const rows = list.map(s => Number(s).toFixed(dp)); const iw = Math.max(...rows.map(r => r.split('.')[0].length)); return `<table class="pv4 pvd"><tr><th></th><th>整数 whole</th><th class="dot">·</th>${['t', 'h', 'th'].slice(0, dp).map(k => `<th>${EN[k]}</th>`).join('')}</tr>${rows.map((r, i) => { const [ip, fp = ''] = r.split('.'); return `<tr><td style="font-size:16px">${o.marks && o.marks[i] ? `<span class="rank">${o.marks[i]}</span>` : ''}${list[i]}</td><td class="${o.hl === 'O' ? 'hl' : ''}">${ip}</td><td class="dot">.</td>${fp.split('').map((d, j) => `<td class="${o.hl === ['t', 'h', 'th'][j] ? 'hl' : ''}" style="color:${CSS[['t', 'h', 'th'][j]]}">${d}</td>`).join('')}</tr>`; }).join('')}</table>`; }
  function cmpSteps(list, want, o = {}) { const dp = Math.max(...list.map(dpOf)); const rows = list.map(s => Number(s).toFixed(dp)); const ints = rows.map(r => +r.split('.')[0]); const steps = []; let alive = list.map((_, i) => i);
    const pick = arr => want === 'greater' ? Math.max(...arr) : Math.min(...arr);
    if (new Set(ints).size > 1) { const best = pick(ints); alive = alive.filter(i => ints[i] === best); steps.push({ zh: `先比<b>整数部分</b>：${ints.join('、')}，${want === 'greater' ? '最大' : '最小'}的是 ${best}${alive.length > 1 ? '（有并列，再比小数）' : ''}。`, en: `Compare the whole numbers first.`, render: s => { s.innerHTML = wrap(`<div class="center">${cmpTable(list, { hl: 'O' })}</div>`); } }); }
    else steps.push({ zh: `整数部分都是 ${ints[0]}，一样，比小数部分。`, en: 'Same whole numbers.', render: s => { s.innerHTML = wrap(`<div class="center">${cmpTable(list, { hl: 'O' })}</div>`); } });
    ['t', 'h', 'th'].slice(0, dp).forEach((k, j) => { if (alive.length <= 1) return; const dg = alive.map(i => +rows[i].split('.')[1][j]); const best = pick(dg); const next = alive.filter(i => +rows[i].split('.')[1][j] === best); steps.push({ zh: new Set(dg).size > 1 ? `再比<b>${ZH[k]}</b>：${dg.join('、')}，${want === 'greater' ? '大' : '小'}的是 ${best}。` : `${ZH[k]}都是 ${dg[0]}，一样，再比下一位。`, en: `Compare the ${EN[k]}.`, render: s => { s.innerHTML = wrap(`<div class="center">${cmpTable(list, { hl: k })}</div>`); } }); alive = next; });
    return { steps, winner: alive[0] }; }
  /* l4deccmp：{list, want} */
  S.l4deccmp = ({ list, want }) => { const { steps, winner } = cmpSteps(list, want); return [{ zh: `比较 ${list.join('、')}：把小数点对齐，<b>从整数部分开始</b>一位一位比。`, en: 'Line up the decimal points. Compare from the left.', render: s => { s.innerHTML = wrap(`<div class="center">${cmpTable(list)}</div>`); } }].concat(steps, [{ zh: `所以${want === 'greater' ? '最大' : '最小'}的是 <b>${list[winner]}</b>。`, en: `${list[winner]} is the ${want === 'greater' ? 'greatest' : 'smallest'}.`, render: s => { s.innerHTML = wrap(line(list[winner])); } }]); };
  /* l4decorder：{list, asc} */
  S.l4decorder = ({ list, asc }) => { const idx = list.map((_, i) => i).sort((a, b) => asc ? list[a] - list[b] : list[b] - list[a]); const marks = {}; idx.forEach((i, r) => { marks[i] = r + 1; }); const dp = Math.max(...list.map(dpOf)); return [
    { zh: `把 ${list.join('、')} 从${asc ? '小到大' : '大到小'}排。先对齐小数点${dp > 0 && list.some(s => dpOf(s) < dp) ? '，位数不够的在后面补 0' : ''}。`, en: 'Line up the decimal points.', render: s => { s.innerHTML = wrap(`<div class="center">${cmpTable(list)}</div>`); } },
    { zh: `先比整数部分，一样再比十分位、百分位、千分位。`, en: 'Compare whole numbers, then tenths, hundredths, thousandths.', render: s => { s.innerHTML = wrap(`<div class="center">${cmpTable(list, { hl: 't' })}</div>`); } },
    { zh: `排好了：<b>${idx.map(i => list[i]).join(', ')}</b>。`, en: idx.map(i => list[i]).join(', '), render: s => { s.innerHTML = wrap(`<div class="center">${cmpTable(list, { marks })}</div>`, line(idx.map(i => list[i]).join(asc ? ' &lt; ' : ' &gt; '))); } },
  ]; };
  /* l4decmoreless：{n, delta, more} */
  S.l4decmoreless = ({ n, delta, more }) => { const dp = Math.max(dpOf(n), dpOf(delta)); const res = fromI(toI(n, dp) + (more ? 1 : -1) * toI(delta, dp), dp); const k = { 1: 't', 2: 'h', 3: 'th' }[dpOf(delta)]; const a = Number(n).toFixed(dp); const carry = digitsOf(a).find(x => x.k === k).d + (more ? 1 : -1) > 9 || digitsOf(a).find(x => x.k === k).d + (more ? 1 : -1) < 0; return [
    { zh: `${delta} ${more ? 'more' : 'less'} than ${n}：比 ${n} <b>${more ? '多' : '少'} ${delta}</b>。${delta} 是 1 个${ZH[k].replace('位', '')}之一，主要是<b>${ZH[k]}</b>在变${dpOf(n) < dp ? `（${n} 写成 ${a}，补 0 对齐）` : ''}。`, en: `Only the ${EN[k]} place changes.`, render: s => { s.innerHTML = wrap(`<div class="center">${big(a, k)}</div>`, pvd(a, { hl: k })); } },
    { zh: `${ZH[k]} ${digitsOf(a).find(x => x.k === k).d} ${more ? '+' : '−'} 1${carry ? '，满 10 / 不够减，<b>前一位跟着变</b>' : ''}：${a} ${more ? '+' : '−'} ${delta} = <b>${trim0(res)}</b>。`, en: `${a} ${more ? '+' : '−'} ${delta} = ${trim0(res)}.`, render: s => { s.innerHTML = wrap(`<div class="center">${big(res, k)}</div>`, line(`${a} ${more ? '+' : '−'} ${delta} = ${trim0(res)}`)); } },
  ]; };
  /* l4decpat：{seq, blanks} seq 字符串 */
  S.l4decpat = ({ seq, blanks }) => { const dp = Math.max(...seq.map(dpOf)); const I = seq.map(s => toI(s, dp)); const st = I[1] - I[0]; const stepS = fromI(Math.abs(st), dp); const more = st > 0; const known = seq.map((s, i) => blanks.includes(i) ? null : s); const nb = arr => `<div class="numrow"><div class="numrow-boxes">${arr.map((v, i) => `<span class="nbox ${v === null ? 'blank' : ''} ${(arguments[1] || []).includes(i) ? 'on' : ''}">${v === null ? '?' : v}</span>`).join('')}</div></div>`; return [
    { zh: `先看相邻两个数差多少：${seq[0]} → ${seq[1]}，${more ? '加' : '减'}了 <b>${trim0(stepS)}</b>。再看 ${seq[1]} → ${seq[2]}，也是${more ? '加' : '减'} ${trim0(stepS)}。`, en: `Each time ${more ? '+' : '−'} ${trim0(stepS)}.`, render: s => { s.innerHTML = wrap(`<div class="center">${nb(known)}</div>`, line(`每次 ${more ? '+' : '−'} ${trim0(stepS)}`)); } },
    ...blanks.map(b => ({ zh: `${seq[b - 1]} ${more ? '+' : '−'} ${trim0(stepS)} = <b>${seq[b]}</b>${dpOf(seq[b]) < dp ? `（${fromI(I[b], dp)}，末尾的 0 可以不写）` : ''}。`, en: `${seq[b - 1]} ${more ? '+' : '−'} ${trim0(stepS)} = ${seq[b]}.`, render: s => { s.innerHTML = wrap(`<div class="center">${nb(seq.map((v, i) => i <= b ? v : known[i]))}</div>`, line(`${seq[b - 1]} ${more ? '+' : '−'} ${trim0(stepS)} = ${seq[b]}`)); } })),
  ]; };
  /* l4decround：{n, dp} */
  S.l4decround = ({ n, dp }) => { const ans = roundStr(n, dp); const [ip, fp = ''] = String(n).split('.'); const next = fp[dp]; const keepK = ['O', 't', 'h'][dp], nextK = ['t', 'h', 'th'][dp]; const lo = ip + (dp ? '.' + fp.slice(0, dp) : ''); const hi = roundStr(fromI(toI(lo, dp) + 1, dp), dp); return [
    { zh: `四舍五入到${dp === 0 ? '<b>整数</b>（nearest whole number）' : `<b>${dp} 位小数</b>（${dp} decimal place${dp > 1 ? 's' : ''}）`}：留到<b>${ZH[keepK]}</b>，看它后面一位——<b>${ZH[nextK]}</b>的数字。${n} 在 ${lo} 和 ${hi} 之间。`, en: `Look at the ${EN[nextK]} digit.`, render: s => { s.innerHTML = wrap(`<div class="center">${big(n, nextK)}</div>`, pvd(n, { hl: nextK })); } },
    { zh: `${ZH[nextK]}是 <b>${next}</b>，${+next >= 5 ? '≥ 5，<b>进 1</b>' : '< 5，<b>舍去</b>'}：${n} ≈ <b>${ans}</b>${dp && ans.endsWith('0') ? `（保留 ${dp} 位小数，末尾的 0 要写）` : ''}。`, en: `${next} is ${+next >= 5 ? '5 or more: round up' : 'less than 5: round down'}. ${n} ≈ ${ans}.`, render: s => { s.innerHTML = wrap(line(`${n} ≈ ${ans}`)); } },
  ]; };
  /* l4dec2frac：{n} */
  S.l4dec2frac = ({ n }) => { const dp = dpOf(n), unit = 10 ** dp; const [ip, fp] = String(n).split('.'); const w = +ip, num = +fp; const g = gcd(num, unit); const sn = num / g, sd = unit / g; return [
    { zh: `${n} 小数点后有 ${dp} 位，就是${dp === 1 ? '十' : dp === 2 ? '百' : '千'}分之几：${n} = ${w ? `${w} + ` : ''}${frac(num, unit)}${w ? ` = ${FR.mixed(w, num, unit)}` : ''}。`, en: `${n} = ${w ? w + ' ' : ''}${num}/${unit}.`, render: s => { s.innerHTML = wrap(line(`${n} = ${w ? FR.mixed(w, num, unit, true) : frac(num, unit, true)}`)); } },
    g > 1 ? { zh: `${num} 和 ${unit} 都能除以 <b>${g}</b>，化简：${frac(num, unit)} = ${frac(sn, sd)}。答案 <b>${w ? FR.mixed(w, sn, sd) : frac(sn, sd)}</b>。`, en: `${num}/${unit} = ${sn}/${sd}.`, render: s => { s.innerHTML = wrap(line(`${w ? FR.mixed(w, num, unit, true) : frac(num, unit, true)} = ${w ? FR.mixed(w, sn, sd, true) : frac(sn, sd, true)}`), line(`÷ ${g}`)); } }
      : { zh: `${num} 和 ${unit} 没有公因数，已经最简：<b>${w ? FR.mixed(w, num, unit) : frac(num, unit)}</b>。`, en: 'Already in simplest form.', render: s => { s.innerHTML = wrap(line(w ? FR.mixed(w, num, unit, true) : frac(num, unit, true))); } },
  ]; };
  window.L4DEC = { digitsOf, pvd, big, discs, discVal, discDp, numline, lineVal, roundStr, trim0, toI, fromI, dpOf, EN, ZH, VAL, DP, valStr, cmpTable };
})();
