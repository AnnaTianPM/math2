/* Level 5 · Unit 7  比：求比、化简、等价比 讲解动画 */
(function () {
  const line = t => `<div class="expand-line">${t}</div>`;
  const wrap = (...parts) => `<div class="l1wrap">${parts.join('')}</div>`;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const gcd = (a, b) => b ? gcd(b, a % b) : a;
  const gcdAll = arr => arr.reduce((g, v) => gcd(g, v));
  const R = arr => arr.join(' : ');
  const tbl = (names, vals, o = {}) => `<table class="pv4 dtab"><tr>${names.map(n => `<th>${esc(n)}</th>`).join('')}</tr><tr>${vals.map((v, i) => `<td class="${o.hl ? 'hl' : ''}" style="font-size:22px">${v}</td>`).join('')}</tr></table>`;
  const S = window.StepKinds;
  /* l5ratio：{names:[..], vals:[..], pic?} 求比并化简 */
  S.l5ratio = ({ names, vals, pic, note }) => { const g = gcdAll(vals), red = vals.map(v => v / g); return [
    { zh: `比（ratio）就是<b>按顺序</b>写出两个（或三个）数量，中间用冒号。${note ? note + '。' : ''}${names.join(' : ')} = <b>${R(vals)}</b>。`, en: `${names.join(' : ')} = ${R(vals)}.`, render: s => { s.innerHTML = wrap(pic ? `<div class="center">${pic}</div>` : '', tbl(names, vals), line(R(vals))); } },
    g > 1 ? { zh: `化成<b>最简</b>：每个数都除以它们的最大公因数 <b>${g}</b>：${R(vals)} = <b>${R(red)}</b>。`, en: `÷ ${g}: ${R(red)}.`, render: s => { s.innerHTML = wrap(line(`${R(vals)} → ÷ ${g} → ${R(red)}`)); } }
      : { zh: `${R(vals)} 已经没有公因数（除了 1），就是最简形式。`, en: 'Already in simplest form.', render: s => { s.innerHTML = wrap(line(R(vals))); } },
  ]; };
  /* l5equiv：{from:[..], to:[.. with null]} 等价比 */
  S.l5equiv = ({ from, to }) => { const i = to.findIndex((v, k) => v !== null && from[k] !== null); const mul = to[i] > from[i]; const k = mul ? to[i] / from[i] : from[i] / to[i]; const full = from.map(v => mul ? v * k : v / k); return [
    { zh: `等价比：每一项都<b>乘或除以同一个数</b>。先找一对已知的：${from[i]} → ${to[i]}，是${mul ? `乘了 <b>${k}</b>` : `除以了 <b>${k}</b>`}。`, en: `${from[i]} → ${to[i]}: ${mul ? '×' : '÷'} ${k}.`, render: s => { s.innerHTML = wrap(line(`${R(from)} = ${R(to.map(v => v === null ? '?' : v))}`), line(`${from[i]} ${mul ? '×' : '÷'} ${k} = ${to[i]}`)); } },
    { zh: `其他每一项也${mul ? '乘' : '除以'} ${k}：${from.map((v, j) => to[j] === null ? `${v} ${mul ? '×' : '÷'} ${k} = <b>${full[j]}</b>` : '').filter(Boolean).join('，')}。所以 ${R(from)} = <b>${R(full)}</b>。`, en: `${R(from)} = ${R(full)}.`, render: s => { s.innerHTML = wrap(line(`${R(from)} = ${R(full)}`)); } },
  ]; };
  /* l5simp：{vals} */
  S.l5simp = ({ vals }) => { const g = gcdAll(vals), red = vals.map(v => v / g); return [
    { zh: `找 ${vals.join('、')} 的<b>最大公因数</b>：是 <b>${g}</b>。`, en: `HCF is ${g}.`, render: s => { s.innerHTML = wrap(line(R(vals))); } },
    { zh: `每一项都除以 ${g}：${vals.map((v, j) => `${v} ÷ ${g} = ${red[j]}`).join('，')}。${R(vals)} = <b>${R(red)}</b>。`, en: `${R(vals)} = ${R(red)}.`, render: s => { s.innerHTML = wrap(line(`${R(vals)} → ÷ ${g} → ${R(red)}`)); } },
  ]; };
  window.L5RATIO = { gcdAll, R };
})();
