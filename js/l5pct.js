/* Level 5 · Unit 10  百分数：百格图、百分数↔小数/分数、求一个数的百分之几 讲解动画 */
(function () {
  const line = t => `<div class="expand-line">${t}</div>`;
  const wrap = (...parts) => `<div class="l1wrap">${parts.join('')}</div>`;
  const frac = (n, d, big) => window.L3.frac(n, d, big);
  const gcd = (a, b) => b ? gcd(b, a % b) : a;
  const S = window.StepKinds;
  const fmt = n => { const s = String(n); return s.length > 4 && !s.includes('.') ? s.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : s; };
  /* 百格图：cells = 要涂的格子编号集合（行优先 0–99）或数字 n（涂前 n 格） */
  function grid100(cells, o = {}) {
    const w = o.w || 200, on = typeof cells === 'number' ? new Set(Array.from({ length: cells }, (_, i) => i)) : new Set(cells);
    let h = '';
    for (let i = 0; i < 100; i++) { const r = Math.floor(i / 10), c = i % 10; h += `<rect x="${c * 10}" y="${r * 10}" width="10" height="10" fill="${on.has(i) ? (o.fill || '#b9b2d6') : '#fff'}" stroke="#555" stroke-width="0.8"/>`; }
    if (o.rowsHl) h += `<rect x="0" y="0" width="100" height="${o.rowsHl * 10}" fill="none" stroke="#ff7f2a" stroke-width="2.5"/>`;
    return `<span class="fig"><svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 102 102" width="${w}" height="${w}">${h}</svg></span>`;
  }
  /* l5pctgrid：{cells, n} 看图说百分之几 */
  S.l5pctgrid = ({ cells, n }) => [
    { zh: `大正方形被平均分成 <b>100</b> 格。percent（百分之）就是"每 100 份里的几份"：每一格是 <b>1%</b>。`, en: '100 equal squares: each square is 1%.', render: s => { s.innerHTML = wrap(grid100(cells), line('100 格 → 每格 1%')); } },
    { zh: `数一数涂色的格子：一共 <b>${n}</b> 格，就是 ${n} out of 100 = <b>${n}%</b>。`, en: `${n} out of 100 squares are shaded: ${n}%.`, render: s => { s.innerHTML = wrap(grid100(cells), line(`${n} / 100 = ${n}%`)); } },
    { zh: `没涂色的：100 − ${n} = <b>${100 - n}</b> 格，就是 <b>${100 - n}%</b>。涂色的 + 没涂的 = 100%。`, en: `100 − ${n} = ${100 - n}: ${100 - n}% are unshaded.`, render: s => { s.innerHTML = wrap(line(`100 − ${n} = ${100 - n} → ${100 - n}%`), line(`${n}% + ${100 - n}% = 100%`)); } },
  ];
  /* l5pctfill：{n} 涂 n% */
  S.l5pctfill = ({ n }) => { const rows = Math.floor(n / 10), rest = n % 10; return [
    { zh: `${n}% 就是 100 格里涂 <b>${n}</b> 格（每格 1%）。`, en: `${n}% = ${n} out of 100 squares.`, render: s => { s.innerHTML = wrap(line(`${n}% → ${n} 格`)); } },
    { zh: `一行 10 格就是 10%。先涂 <b>${rows}</b> 整行 = ${rows * 10} 格${rest ? `，再涂 <b>${rest}</b> 格` : ''}，一共 ${n} 格。`, en: `${rows} full rows${rest ? ` and ${rest} more squares` : ''}.`, render: s => { s.innerHTML = wrap(grid100(n, { rowsHl: rows }), line(`${rows} × 10${rest ? ` + ${rest}` : ''} = ${n}`)); } },
  ]; };
  /* l5pct2df：{p} 百分数 → 小数、最简分数 */
  S.l5pct2df = ({ p }) => { const g = gcd(p, 100), n = p / g, d = 100 / g; const dec = (p / 100).toString(); return [
    { zh: `${p}% 就是 100 份里的 ${p} 份：${p}% = ${frac(p, 100)}。`, en: `${p}% = ${p}/100.`, render: s => { s.innerHTML = wrap(line(`${p}% = ${frac(p, 100, true)}`)); } },
    { zh: `化小数：${p} ÷ 100，小数点向左移 2 位 → <b>${dec}</b>。`, en: `${p} ÷ 100 = ${dec}.`, render: s => { s.innerHTML = wrap(line(`${frac(p, 100, true)} = ${p} ÷ 100 = ${dec}`)); } },
    g > 1 ? { zh: `化最简分数：分子分母都除以最大公因数 <b>${g}</b>：${frac(p, 100)} = <b>${d === 1 ? n : frac(n, d)}</b>。`, en: `÷ ${g}: ${n}/${d}.`, render: s => { s.innerHTML = wrap(line(`${frac(p, 100, true)} → ÷ ${g} → ${d === 1 ? n : frac(n, d, true)}`)); } }
      : { zh: `${p} 和 100 没有公因数（除了 1），${frac(p, 100)} 已经是最简分数。`, en: `${p}/100 is already in simplest form.`, render: s => { s.innerHTML = wrap(line(frac(p, 100, true))); } },
  ]; };
  /* l5dec2pct：{d} 小数 → 百分数 */
  S.l5dec2pct = ({ d }) => { const p = Math.round(d * 100); const two = (d).toFixed(2); return [
    { zh: `小数写成"百分之几"：先写成两位小数 ${two}，就是 ${frac(p, 100)}（${p} 个百分之一）。`, en: `${d} = ${two} = ${p}/100.`, render: s => { s.innerHTML = wrap(line(`${d} = ${two} = ${frac(p, 100, true)}`)); } },
    { zh: `${frac(p, 100)} 就是 <b>${p}%</b>。（小数 × 100 加 %：小数点右移 2 位）`, en: `${p}/100 = ${p}%.`, render: s => { s.innerHTML = wrap(line(`${frac(p, 100, true)} = ${p}%`)); } },
  ]; };
  /* l5frac2pct：{n, d} 分数 → 百分数 */
  S.l5frac2pct = ({ n, d }) => { const mul = d < 100, k = mul ? 100 / d : d / 100, p = mul ? n * k : n / k; return [
    { zh: `百分数的分母是 100。把分母 ${d} 变成 100：${mul ? `${d} × <b>${k}</b> = 100，分子也 × ${k}` : `${d} ÷ <b>${k}</b> = 100，分子也 ÷ ${k}`}。`, en: `Make the denominator 100: ${mul ? '×' : '÷'} ${k}.`, render: s => { s.innerHTML = wrap(line(`${frac(n, d, true)} = ${frac(`${n} ${mul ? '×' : '÷'} ${k}`, `${d} ${mul ? '×' : '÷'} ${k}`, true)}`)); } },
    { zh: `${frac(n, d)} = ${frac(p, 100)} = <b>${p}%</b>。`, en: `${n}/${d} = ${p}/100 = ${p}%.`, render: s => { s.innerHTML = wrap(line(`${frac(n, d, true)} = ${frac(p, 100, true)} = ${p}%`)); } },
  ]; };
  /* l5pctof：{p, q, unit, pre} p% × q */
  S.l5pctof = ({ p, q, unit = '', pre = '' }) => { const r = p * q / 100; const show = v => `${pre}${fmt(v)}${unit ? ' ' + unit : ''}`; return [
    { zh: `${p}% 就是 ${frac(p, 100)}。"${p}% of ${show(q)}" 就是 ${frac(p, 100)} × ${show(q)}。`, en: `${p}% × ${show(q)} = ${p}/100 × ${show(q)}.`, render: s => { s.innerHTML = wrap(line(`${p}% × ${show(q)} = ${frac(p, 100, true)} × ${show(q)}`)); } },
    { zh: `先乘再除：${p} × ${fmt(q)} = ${fmt(p * q)}，再 ÷ 100（小数点左移 2 位）= <b>${fmt(r)}</b>。`, en: `${p} × ${fmt(q)} ÷ 100 = ${fmt(r)}.`, render: s => { s.innerHTML = wrap(line(`${p} × ${fmt(q)} ÷ 100 = ${fmt(p * q)} ÷ 100 = ${fmt(r)}`)); } },
    { zh: `所以 ${p}% of ${show(q)} = <b>${show(r)}</b>。也可以先约分：${q % 100 === 0 ? `${fmt(q)} ÷ 100 = ${fmt(q / 100)}，再 × ${p}` : p % 10 === 0 && q % 10 === 0 ? `${p} 和 ${fmt(q)} 各去掉一个 0 再算` : `1% 是 ${show(q)} ÷ 100 = ${fmt(q / 100)}，${p}% 就是 ${p} × ${fmt(q / 100)}`}。`, en: `${p}% of ${show(q)} = ${show(r)}.`, render: s => { s.innerHTML = wrap(line(`${p}% × ${show(q)} = ${show(r)}`)); } },
  ]; };
  window.L5PCT = { grid100, gcd };
})();
