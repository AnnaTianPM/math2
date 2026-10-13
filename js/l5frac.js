/* Level 5 · Unit 3  分数与除法、分数化小数 讲解动画 */
(function () {
  const line = t => `<div class="expand-line">${t}</div>`;
  const wrap = (...parts) => `<div class="l1wrap">${parts.join('')}</div>`;
  const frac = window.L3.frac, mixed = window.L4FRAC.mixed, D = window.L4DEC;
  const gcd = (a, b) => b ? gcd(b, a % b) : a;
  const S = window.StepKinds;
  /* l5div2frac：{a, b} a ÷ b 写成分数 */
  S.l5div2frac = ({ a, b }) => { const g = gcd(a, b), n = a / g, d = b / g, w = Math.floor(n / d), r = n % d; const steps = [
    { zh: `<b>除法就是分数</b>：${a} ÷ ${b} 的意思是把 ${a} 平均分成 ${b} 份，每份是 ${frac(a, b)}（被除数做分子，除数做分母）。`, en: `${a} ÷ ${b} = ${a}/${b}.`, render: s => { s.innerHTML = wrap(line(`${a} ÷ ${b} = ${frac(a, b, true)}`)); } }];
    if (g > 1) steps.push({ zh: `${a} 和 ${b} 都能除以 ${g}，化简：${frac(a, b)} = <b>${frac(n, d)}</b>。`, en: `${a}/${b} = ${n}/${d}.`, render: s => { s.innerHTML = wrap(line(`${frac(a, b, true)} = ${frac(n, d, true)}`), line(`÷ ${g}`)); } });
    if (n > d) steps.push({ zh: `${frac(n, d)} 是假分数，${n} ÷ ${d} = ${w} 余 ${r}，写成带分数 <b>${mixed(w, r, d)}</b>。`, en: `${n}/${d} = ${w} ${r}/${d}.`, render: s => { s.innerHTML = wrap(line(`${frac(n, d, true)} = ${mixed(w, r, d, true)}`)); } });
    steps.push({ zh: `所以 ${a} ÷ ${b} = <b>${n > d ? `${w} ${r}/${d}` : `${n}/${d}`}</b>。`, en: 'Done.', render: s => { s.innerHTML = wrap(line(`${a} ÷ ${b} = ${n > d ? mixed(w, r, d, true) : frac(n, d, true)}`)); } });
    return steps; };
  /* l5frac2div：{w, n, d} 分数/带分数 → 除法算式 */
  S.l5frac2div = ({ w, n, d }) => { const N = w * d + n; return (w ? [{ zh: `先把带分数化成假分数：${mixed(w, n, d)} = ${frac(N, d)}（${w} × ${d} + ${n} = ${N}）。`, en: `${w} ${n}/${d} = ${N}/${d}.`, render: s => { s.innerHTML = wrap(line(`${mixed(w, n, d, true)} = ${frac(N, d, true)}`)); } }] : []).concat([
    { zh: `分数就是除法：分子 ÷ 分母。${frac(N, d)} = <b>${N} ÷ ${d}</b>。`, en: `${N}/${d} = ${N} ÷ ${d}.`, render: s => { s.innerHTML = wrap(line(`${frac(N, d, true)} = ${N} ÷ ${d}`)); } },
  ]); };
  /* l5frac2dec：{w, n, d} 分数化小数（保留 2 位） */
  S.l5frac2dec = ({ w, n, d }) => {
    const exact = [10, 100].find(x => x % d === 0);
    const q = n / d, q3 = Math.floor(q * 1000) / 1000, r2 = D.roundStr(q.toFixed(4), 2), total = (w + +r2).toFixed(2);
    const steps = [];
    if (exact) { const k = exact / d; steps.push({ zh: `分母 ${d} 能变成 ${exact}：分子分母都乘 ${k}，${frac(n, d)} = ${frac(n * k, exact)} = <b>${(n / d).toFixed(exact === 10 ? 1 : 2)}</b>。`, en: `${n}/${d} = ${n * k}/${exact} = ${(n / d).toFixed(exact === 10 ? 1 : 2)}.`, render: s => { s.innerHTML = wrap(line(`${frac(n, d, true)} = ${frac(n * k, exact, true)} = ${(n / d).toFixed(exact === 10 ? 1 : 2)}`)); } }); }
    else {
      const a = `${n}.000`, intA = n * 1000, { steps: ls } = window.L3.ldivSteps(intA, d); ls.forEach(st => { st.qStart = ls.filter(x => x.skip).length; });
      const last = ls[ls.length - 1];
      steps.push({ zh: `分母 ${d} 变不成 10 或 100，就用<b>除法</b>：${frac(n, d)} = ${n} ÷ ${d}。在 ${n} 后面添 0 继续除，除到<b>小数点后第 3 位</b>就够了。`, en: `${n}/${d} = ${n} ÷ ${d}. Divide to 3 decimal places.`, render: s => { s.innerHTML = wrap(`<div class="center">${window.L4DOPS.dvHTML(a, d)}</div>`); } });
      steps.push({ zh: `除得 ${n} ÷ ${d} ≈ ${q3.toFixed(3)}…`, en: `≈ ${q3.toFixed(3)}`, render: s => { s.innerHTML = wrap(`<div class="center">${window.L4DOPS.dvHTML(a, d, last)}</div>`, line(`${n} ÷ ${d} ≈ ${q3.toFixed(3)}…`)); } });
      steps.push({ zh: `保留 2 位小数：看第 3 位 ${String(q3.toFixed(3)).slice(-1)}，${+String(q3.toFixed(3)).slice(-1) >= 5 ? '≥ 5 进 1' : '< 5 舍去'}：${frac(n, d)} ≈ <b>${r2}</b>。`, en: `${n}/${d} ≈ ${r2}.`, render: s => { s.innerHTML = wrap(line(`${q3.toFixed(3)}… ≈ ${r2}`)); } });
    }
    if (w) steps.push({ zh: `带分数的整数部分 ${w} 不动：${mixed(w, n, d)} ≈ ${w} + ${exact ? (n / d).toFixed(exact === 10 ? 1 : 2) : r2} = <b>${exact ? (w + n / d).toFixed(exact === 10 ? 1 : 2) : total}</b>。`, en: `${w} + ${r2} = ${total}.`, render: s => { s.innerHTML = wrap(line(`${mixed(w, n, d, true)} ≈ ${w} + ${exact ? (n / d).toFixed(exact === 10 ? 1 : 2) : r2} = ${exact ? (w + n / d).toFixed(exact === 10 ? 1 : 2) : total}`)); } });
    return steps;
  };
})();
