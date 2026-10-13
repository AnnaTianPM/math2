/* Level 5 · Unit 4  分数乘法：整数×分数、分数×分数（约分）、带分数×整数 讲解动画 */
(function () {
  const line = t => `<div class="expand-line">${t}</div>`;
  const wrap = (...parts) => `<div class="l1wrap">${parts.join('')}</div>`;
  const frac = window.L3.frac, mixed = window.L4FRAC.mixed;
  const gcd = (a, b) => b ? gcd(b, a % b) : a;
  const S = window.StepKinds;
  const fin = (n, d) => { const g = gcd(n, d); n /= g; d /= g; if (d === 1) return { html: `<b>${n}</b>`, txt: String(n) }; if (n > d) { const w = Math.floor(n / d), r = n % d; return { html: mixed(w, r, d, true), txt: `${w} ${r}/${d}` }; } return { html: frac(n, d, true), txt: `${n}/${d}` }; };
  /* 约分展示：a/b × c/d，交叉约分 */
  const cancelHTML = (a, b, c, d) => { const g1 = gcd(a, d), g2 = gcd(c, b); const cell = (v, g, pos) => g > 1 ? `<span class="canc"><s>${v}</s><i class="${pos}">${v / g}</i></span>` : String(v); return `<span class="frac big"><span class="n">${cell(a, g1, 'up')}</span><span class="d">${cell(b, g2, 'dn')}</span></span> × <span class="frac big"><span class="n">${cell(c, g2, 'up')}</span><span class="d">${cell(d, g1, 'dn')}</span></span>`; };
  /* l5fracwhole：{n, d, k} n/d × k */
  S.l5fracwhole = ({ n, d, k }) => { const g = gcd(k, d), r = fin(n * k, d); return g > 1 ? [
    { zh: `${frac(n, d)} × ${k}：整数 ${k} 可以看成 ${frac(k, 1)}。先<b>约分</b>：${k} 和分母 ${d} 都能除以 ${g}，${k} → ${k / g}，${d} → ${d / g}。`, en: `Cancel ${k} and ${d} by ${g}.`, render: s => { s.innerHTML = wrap(line(cancelHTML(n, d, k, 1))); } },
    { zh: `约完再乘：${n} × ${k / g} = ${n * k / g}${d / g > 1 ? `，分母 ${d / g}` : ''}。答案 ${r.html}。`, en: `${n} × ${k / g} = ${n * k / g}.`, render: s => { s.innerHTML = wrap(line(`${frac(n, d, true)} × ${k} = ${d / g > 1 ? frac(n * k / g, d / g, true) : n * k / g}${d / g > 1 && r.txt !== `${n * k / g}/${d / g}` ? ' = ' + r.html : ''}`)); } },
  ] : [
    { zh: `${frac(n, d)} × ${k}：分子乘整数，分母不变：${frac(n, d)} × ${k} = ${frac(`${n} × ${k}`, d)} = ${frac(n * k, d)}。`, en: `${n} × ${k} over ${d}.`, render: s => { s.innerHTML = wrap(line(`${frac(n, d, true)} × ${k} = ${frac(n * k, d, true)}`)); } },
    { zh: `${frac(n * k, d)}：${n * k} ÷ ${d}${(n * k) % d ? `，化简/写成带分数` : ' 正好整除'} = ${r.html}。`, en: `= ${r.txt}.`, render: s => { s.innerHTML = wrap(line(`${frac(n * k, d, true)} = ${r.html}`)); } },
  ]; };
  /* l5fracfrac：{a, b, c, d} a/b × c/d */
  S.l5fracfrac = ({ a, b, c, d }) => { const g1 = gcd(a, d), g2 = gcd(c, b), r = fin(a * c, b * d); const canc = g1 > 1 || g2 > 1; return [
    { zh: `分数乘分数：<b>分子乘分子，分母乘分母</b>。${canc ? `先交叉约分更省事：${g1 > 1 ? `${a} 和 ${d} 都除以 ${g1}` : ''}${g1 > 1 && g2 > 1 ? '，' : ''}${g2 > 1 ? `${c} 和 ${b} 都除以 ${g2}` : ''}。` : '这里没有能约的，直接乘。'}`, en: canc ? 'Cancel first.' : 'Multiply tops and bottoms.', render: s => { s.innerHTML = wrap(line(cancelHTML(a, b, c, d))); } },
    { zh: `${canc ? `约完：${frac(a / g1, b / g2)} × ${frac(c / g2, d / g1)}，` : ''}分子 ${a / g1} × ${c / g2} = ${a * c / g1 / g2}，分母 ${b / g2} × ${d / g1} = ${b * d / g1 / g2}。答案 ${r.html}。`, en: `= ${r.txt}.`, render: s => { s.innerHTML = wrap(line(`${frac(a, b, true)} × ${frac(c, d, true)} = ${frac(a * c / g1 / g2, b * d / g1 / g2, true)}${r.txt !== `${a * c / g1 / g2}/${b * d / g1 / g2}` ? ' = ' + r.html : ''}`)); } },
  ]; };
  /* l5mixwhole：{w, n, d, k} */
  S.l5mixwhole = ({ w, n, d, k }) => { const N = w * d + n, g = gcd(k, d), r = fin(N * k, d); return [
    { zh: `带分数先化成<b>假分数</b>：${mixed(w, n, d)} = ${frac(N, d)}（${w} × ${d} + ${n} = ${N}）。`, en: `${w} ${n}/${d} = ${N}/${d}.`, render: s => { s.innerHTML = wrap(line(`${mixed(w, n, d, true)} × ${k} = ${frac(N, d, true)} × ${k}`)); } },
    { zh: g > 1 ? `${k} 和分母 ${d} 约分（都除以 ${g}）：${frac(N, d / g)} × ${k / g}。` : `分子乘整数：${N} × ${k} = ${N * k}，分母 ${d}。`, en: g > 1 ? `Cancel by ${g}.` : `${N} × ${k} = ${N * k}.`, render: s => { s.innerHTML = wrap(line(g > 1 ? cancelHTML(N, d, k, 1) : `${frac(N, d, true)} × ${k} = ${frac(N * k, d, true)}`)); } },
    { zh: `${g > 1 ? `${N} × ${k / g} = ${N * k / g}${d / g > 1 ? `，分母 ${d / g}` : ''}。` : `${frac(N * k, d)}。`}答案 ${r.html}。`, en: `= ${r.txt}.`, render: s => { s.innerHTML = wrap(line(`${mixed(w, n, d, true)} × ${k} = ${r.html}`)); } },
  ]; };
  window.L5MUL = { fin };
})();
