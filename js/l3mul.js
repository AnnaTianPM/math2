/* Level 3 · Unit 5-7 乘除法 讲解动画 */
(function () {
  const line = t => `<div class="expand-line">${t}</div>`;
  const wrap = (...parts) => `<div class="l1wrap">${parts.join('')}</div>`;
  const M = window.MulUI;

  const S = window.StepKinds;
  /* l3mulsplit：a × b = base × b ± k × b {a, b, base} */
  S.l3mulsplit = ({ a, b, base }) => {
    const total = a * b, k = Math.abs(a - base), more = a > base, sign = more ? '+' : '−';
    const pic = o => `<div class="center">${M.groupsHTML(Math.max(a, base), b, '🔵', o)}</div>`;
    return [
      { zh: `${a} × ${b} 不好记？先用好记的 <b>${base} × ${b} = ${base * b}</b>。`, en: `Start from ${base} × ${b} = ${base * b}.`, render: s => { s.innerHTML = wrap(pic({ hl: base, label: true }), line(`${base} × ${b} = ${base * b}`)); } },
      { zh: `${a} 比 ${base} ${more ? '多' : '少'} ${k}，所以${more ? '再加' : '再减'} <b>${k} × ${b} = ${k * b}</b>。`, en: `${a} is ${k} ${more ? 'more' : 'less'} than ${base}: ${more ? 'add' : 'subtract'} ${k} × ${b} = ${k * b}.`, render: s => { s.innerHTML = wrap(pic({ hl: a, label: true }), line(`${base} × ${b} = ${base * b}`), line(`${k} × ${b} = ${k * b}`)); } },
      { zh: `${a} × ${b} = ${base * b} ${sign} ${k * b} = <b>${total}</b>。`, en: `${a} × ${b} = ${base * b} ${sign} ${k * b} = ${total}.`, render: s => { s.innerHTML = wrap(pic({ hl: a, label: true }), line(`${a} × ${b} = ${base * b} ${sign} ${k * b} = ${total}`)); } },
    ];
  };
  /* l3missing：缺因数 {a?, b, total} 想乘法口诀 */
  S.l3missing = ({ b, total, pos }) => {
    const a = total / b, seq = Array.from({ length: a }, (_, i) => (i + 1) * b);
    return [
      { zh: `${pos === 'front' ? `___ × ${b} = ${total}` : `${b} × ___ = ${total}`}：想 <b>几个 ${b} 是 ${total}</b>？${b} 个 ${b} 个地数。`, en: `How many ${b}s make ${total}?`, render: s => { s.innerHTML = wrap(line(`${pos === 'front' ? `? × ${b}` : `${b} × ?`} = ${total}`)); } },
      { zh: `${seq.join('、')}。数了 <b>${a}</b> 次到 ${total}，所以是 ${a}。`, en: `${seq.join(', ')}: ${a} times.`, render: s => { s.innerHTML = wrap(`<div class="center">${M.groupsHTML(a, b, '🔵', { hl: a, label: true })}</div>`, line(`${a} × ${b} = ${total}`)); } },
    ];
  };
})();
