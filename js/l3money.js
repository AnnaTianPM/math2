/* Level 3 · Unit 9 钱：元分换算、凑 $1、拆元分加减、竖式、应用题 讲解动画 */
(function () {
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '"': '&quot;', '>': '&gt;' }[c]));
  const line = t => `<div class="expand-line">${t}</div>`;
  const wrap = (...parts) => `<div class="l1wrap">${parts.join('')}</div>`;
  const F = c => `$${(c / 100).toFixed(2)}`;        // 分 → $x.xx
  const D = c => Math.floor(c / 100), C = c => c % 100;
  const bond = (w, a, b, o) => window.L1.bond(w, a, b, o || {});
  const S = window.StepKinds;

  /* 钱的竖式（文本） o.hl: 'c'|'d'，o.res 是否显示结果，o.carry */
  function mcol(a, b, op, o = {}) {
    const r = op === '+' ? a + b : a - b;
    const fmt = c => (c / 100).toFixed(2);
    const w = Math.max(fmt(a).length, fmt(b).length, fmt(r).length);
    const row = (pre, c, cls) => { const s = fmt(c).padStart(w, ' '); const [d, ce] = s.split('.'); return `${pre}$ <span class="${cls === 'd' ? 'mhl' : ''}">${d.split('').join(' ')}</span> . <span class="${cls === 'c' ? 'mhl' : ''}">${ce.split('').join(' ')}</span>`; };
    const hl = o.hl;
    let s = `${o.carry ? `<span class="mcarry">${o.carry}</span>\n` : ''}${row('  ', a, hl)}\n${row(op === '+' ? '+ ' : '− ', b, hl)}\n${'─'.repeat(w * 2 + 4)}`;
    if (o.res) s += `\n${row('  ', r, hl)}`;
    return `<pre class="ldiv mcol">${s}</pre>`;
  }
  window.L3.mcol = mcol;

  /* l3c2d：分→元 {c} */
  S.l3c2d = ({ c }) => [
    { zh: `${c}¢：100 分 = 1 元。${c} 里有 <b>${D(c)}</b> 个 100${C(c) ? `，还剩 <b>${C(c)}</b> 分` : ''}。`, en: `${c}¢ = ${D(c)} dollars${C(c) ? ` and ${C(c)} cents` : ''}.`, render: s => { s.innerHTML = wrap(line(`${c}¢ = ${D(c) * 100}¢ + ${C(c)}¢`)); } },
    { zh: `写成 <b>${F(c)}</b>：小数点前是元，后面两位是分${C(c) < 10 ? `（${C(c)} 分要写成 0${C(c)}）` : ''}。`, en: `${c}¢ = ${F(c)}.`, render: s => { s.innerHTML = wrap(line(`${c}¢ = ${F(c)}`)); } },
  ];
  /* l3d2c：元→分 {c} */
  S.l3d2c = ({ c }) => [
    { zh: `${F(c)}：小数点前面 <b>${D(c)}</b> 元 = ${D(c) * 100} 分，后面 <b>${C(c)}</b> 分。`, en: `${D(c)} dollars = ${D(c) * 100}¢, plus ${C(c)}¢.`, render: s => { s.innerHTML = wrap(line(`${F(c)} = $${D(c)} + ${C(c)}¢`)); } },
    { zh: `${D(c) * 100}¢ + ${C(c)}¢ = <b>${c}¢</b>。`, en: `${F(c)} = ${c}¢.`, render: s => { s.innerHTML = wrap(line(`${D(c) * 100}¢ + ${C(c)}¢ = ${c}¢`)); } },
  ];
  /* l3make1：凑 $1 {c} */
  S.l3make1 = ({ c, dollars }) => { const r = 100 - c; return [
    { zh: `$1 = 100¢。${dollars ? F(c) : c + '¢'} 再加多少是 100¢？`, en: '$1 = 100¢.', render: s => { s.innerHTML = wrap(`<div class="center">${bond('$1', `${c}¢`, '?', { hl: 'w' })}</div>`); } },
    { zh: `100 − ${c} = <b>${r}</b>：${c}¢ 和 ${r}¢ 凑成 $1${dollars ? `，写成元是 <b>${F(r)}</b>` : ''}。`, en: `${c}¢ + ${r}¢ = $1.`, render: s => { s.innerHTML = wrap(`<div class="center">${bond('$1', `${c}¢`, `${r}¢`, { hl: 'b' })}</div>`, line(`${c}¢ + ${r}¢ = $1`)); } },
  ]; };
  /* l3msplitadd：拆元分加 {a, b}（分） */
  S.l3msplitadd = ({ a, b }) => { const d = D(a) + D(b), c = C(a) + C(b), t = a + b; return [
    { zh: `把两个数都拆成<b>元</b>和<b>分</b>：${F(a)} = $${D(a)} + ${C(a)}¢，${F(b)} = $${D(b)} + ${C(b)}¢。`, en: 'Split into dollars and cents.', render: s => { s.innerHTML = wrap(`<div class="center"><div class="bond-groups">${bond(F(a), `$${D(a)}`, `${C(a)}¢`, { hl: 'w' })}${bond(F(b), `$${D(b)}`, `${C(b)}¢`, { hl: 'w' })}</div></div>`); } },
    { zh: `先加元：$${D(a)} + $${D(b)} = <b>$${d}</b>。`, en: `$${D(a)} + $${D(b)} = $${d}.`, render: s => { s.innerHTML = wrap(line(`$${D(a)} + $${D(b)} = $${d}`)); } },
    { zh: `再加分：${C(a)}¢ + ${C(b)}¢ = <b>${c}¢</b>${c >= 100 ? `，满 100 分换成 $1：${c}¢ = $1 + ${c - 100}¢` : ''}。`, en: `${C(a)}¢ + ${C(b)}¢ = ${c}¢.`, render: s => { s.innerHTML = wrap(line(`$${D(a)} + $${D(b)} = $${d}`), line(`${C(a)}¢ + ${C(b)}¢ = ${c}¢`)); } },
    { zh: `合起来：$${d} + ${c}¢ = <b>${F(t)}</b>。`, en: `${F(a)} + ${F(b)} = ${F(t)}.`, render: s => { s.innerHTML = wrap(line(`$${d} + ${c}¢ = ${F(t)}`)); } },
  ]; };
  /* l3mmake1add：凑 $1 再加 {a, b}：把 a 拆成 (a−comp) 和 comp */
  S.l3mmake1add = ({ a, b }) => { const comp = 100 - C(b), p = a - comp, t = a + b; return [
    { zh: `${F(b)} 的分是 ${C(b)}¢，再加 ${comp}¢ 就凑成 $1。所以把 <b>${F(a)}</b> 拆成 <b>${F(p)}</b> 和 <b>${comp}¢</b>。`, en: `${C(b)}¢ + ${comp}¢ = $1. Split ${F(a)} into ${F(p)} and ${comp}¢.`, render: s => { s.innerHTML = wrap(`<div class="center">${bond(F(a), F(p), `${comp}¢`, { hl: 'w' })}</div>`, line(`${F(a)} + ${F(b)} = ?`)); } },
    { zh: `先凑：${comp}¢ + ${C(b)}¢ = $1，所以 ${comp}¢ + ${F(b)} = <b>${F(b + comp)}</b>。`, en: `${comp}¢ + ${F(b)} = ${F(b + comp)}.`, render: s => { s.innerHTML = wrap(`<div class="center">${bond(F(a), F(p), `${comp}¢`, { hl: 'b' })}</div>`, line(`${comp}¢ + ${F(b)} = ${F(b + comp)}`)); } },
    { zh: `再加剩下的：${F(p)} + ${F(b + comp)} = <b>${F(t)}</b>。`, en: `${F(p)} + ${F(b + comp)} = ${F(t)}.`, render: s => { s.innerHTML = wrap(`<div class="center">${bond(F(a), F(p), `${comp}¢`, { hl: 'a' })}</div>`, line(`${F(p)} + ${F(b + comp)} = ${F(t)}`)); } },
  ]; };
  /* l3msplitsub：拆元分减 {a, b} */
  S.l3msplitsub = ({ a, b }) => { const d = D(a) - D(b), c = C(a) - C(b), t = a - b; return [
    { zh: `拆成元和分：${F(a)} = $${D(a)} + ${C(a)}¢，${F(b)} = $${D(b)} + ${C(b)}¢。`, en: 'Split into dollars and cents.', render: s => { s.innerHTML = wrap(`<div class="center"><div class="bond-groups">${bond(F(a), `$${D(a)}`, `${C(a)}¢`, { hl: 'w' })}${bond(F(b), `$${D(b)}`, `${C(b)}¢`, { hl: 'w' })}</div></div>`); } },
    { zh: `先减元：$${D(a)} − $${D(b)} = <b>$${d}</b>。`, en: `$${D(a)} − $${D(b)} = $${d}.`, render: s => { s.innerHTML = wrap(line(`$${D(a)} − $${D(b)} = $${d}`)); } },
    { zh: `再减分：${C(a)}¢ − ${C(b)}¢ = <b>${c}¢</b>。`, en: `${C(a)}¢ − ${C(b)}¢ = ${c}¢.`, render: s => { s.innerHTML = wrap(line(`$${D(a)} − $${D(b)} = $${d}`), line(`${C(a)}¢ − ${C(b)}¢ = ${c}¢`)); } },
    { zh: `合起来：$${d} + ${c}¢ = <b>${F(t)}</b>。`, en: `${F(a)} − ${F(b)} = ${F(t)}.`, render: s => { s.innerHTML = wrap(line(`$${d} + ${c}¢ = ${F(t)}`)); } },
  ]; };
  /* l3mtake1：从 $1 里减 {a, b}：a = (a−100) + $1，$1 − b = comp */
  S.l3mtake1 = ({ a, b }) => { const p = a - 100, comp = 100 - b, t = a - b; return [
    { zh: `${F(a)} 的分（${C(a)}¢）不够减 ${b}¢。把 <b>${F(a)}</b> 拆成 <b>${F(p)}</b> 和 <b>$1</b>，用 $1 去减。`, en: `Split ${F(a)} into ${F(p)} and $1.`, render: s => { s.innerHTML = wrap(`<div class="center">${bond(F(a), F(p), '$1', { hl: 'w' })}</div>`, line(`${F(a)} − ${F(b)} = ?`)); } },
    { zh: `$1 − ${b}¢ = <b>${comp}¢</b>。`, en: `$1 − ${b}¢ = ${comp}¢.`, render: s => { s.innerHTML = wrap(`<div class="center">${bond(F(a), F(p), '$1', { hl: 'b' })}</div>`, line(`$1 − ${b}¢ = ${comp}¢`)); } },
    { zh: `再加回去：${F(p)} + ${comp}¢ = <b>${F(t)}</b>。`, en: `${F(p)} + ${comp}¢ = ${F(t)}.`, render: s => { s.innerHTML = wrap(`<div class="center">${bond(F(a), F(p), '$1', { hl: 'a' })}</div>`, line(`${F(p)} + ${comp}¢ = ${F(t)}`)); } },
  ]; };
  /* l3msubsplit：把减数拆成元和分 {a, b} */
  S.l3msubsplit = ({ a, b }) => { const m = a - D(b) * 100, t = a - b; return [
    { zh: `把减数 <b>${F(b)}</b> 拆成 <b>$${D(b)}</b> 和 <b>${C(b)}¢</b>，分两次减。`, en: `Split ${F(b)} into $${D(b)} and ${C(b)}¢.`, render: s => { s.innerHTML = wrap(`<div class="center">${bond(F(b), `$${D(b)}`, `${C(b)}¢`, { hl: 'w' })}</div>`, line(`${F(a)} − ${F(b)} = ?`)); } },
    { zh: `先减元：${F(a)} − $${D(b)} = <b>${F(m)}</b>。`, en: `${F(a)} − $${D(b)} = ${F(m)}.`, render: s => { s.innerHTML = wrap(`<div class="center">${bond(F(b), `$${D(b)}`, `${C(b)}¢`, { hl: 'a' })}</div>`, line(`${F(a)} − $${D(b)} = ${F(m)}`)); } },
    { zh: `再减分：${F(m)} − ${C(b)}¢ = <b>${F(t)}</b>${C(m) < C(b) ? `（${C(m)}¢ 不够减，先拆出 $1：$1 − ${C(b)}¢ = ${100 - C(b)}¢）` : ''}。`, en: `${F(m)} − ${C(b)}¢ = ${F(t)}.`, render: s => { s.innerHTML = wrap(`<div class="center">${bond(F(b), `$${D(b)}`, `${C(b)}¢`, { hl: 'b' })}</div>`, line(`${F(m)} − ${C(b)}¢ = ${F(t)}`)); } },
  ]; };
  /* l3mcol：钱的竖式 {a, b, op} */
  S.l3mcol = ({ a, b, op }) => {
    const add = op === '+', r = add ? a + b : a - b, sym = add ? '+' : '−';
    const cc = add ? C(a) + C(b) : (C(a) >= C(b) ? C(a) - C(b) : C(a) + 100 - C(b)), regroup = add ? cc >= 100 : C(a) < C(b);
    return [
      { zh: `钱的竖式：<b>小数点对齐</b>，元对元，分对分。`, en: 'Line up the decimal points.', render: s => { s.innerHTML = wrap(`<div class="center">${mcol(a, b, op)}</div>`); } },
      { zh: `先算<b>分</b>：${C(a)}¢ ${sym} ${C(b)}¢${regroup ? (add ? ` = ${cc}¢，满 100 分<b>进 $1</b>，分写 ${cc - 100}` : `，不够减，向元<b>借 $1</b> = 100¢：${C(a) + 100}¢ − ${C(b)}¢ = ${cc}¢`) : ` = ${cc}¢`}。`, en: `Cents: ${C(a)} ${sym} ${C(b)}${regroup ? ' (regroup)' : ''}.`, render: s => { s.innerHTML = wrap(`<div class="center">${mcol(a, b, op, { hl: 'c' })}</div>`, line(`${C(a)}¢ ${sym} ${C(b)}¢ = ${add ? cc : cc}¢`)); } },
      { zh: `再算<b>元</b>：$${D(a)} ${sym} $${D(b)}${regroup ? (add ? ' + 进的 $1' : ' − 借走的 $1') : ''} = <b>$${D(r)}</b>。`, en: `Dollars: $${D(r)}.`, render: s => { s.innerHTML = wrap(`<div class="center">${mcol(a, b, op, { hl: 'd', res: true })}</div>`, line(`$${D(a)} ${sym} $${D(b)}${regroup ? (add ? ' + $1' : ' − $1') : ''} = $${D(r)}`)); } },
      { zh: `所以 <b>${F(a)} ${sym} ${F(b)} = ${F(r)}</b>。`, en: `${F(a)} ${sym} ${F(b)} = ${F(r)}.`, render: s => { s.innerHTML = wrap(`<div class="center">${mcol(a, b, op, { res: true })}</div>`, line(`${F(a)} ${sym} ${F(b)} = ${F(r)}`)); } },
    ];
  };
  /* l3mword：钱应用题 {en, zh, steps:[{a,b,op,why}], sentence} 分为单位 */
  S.l3mword = ({ en, zh, steps, sentence }) => {
    const text = `<div class="wp-text"><div class="wp-en">${esc(en)}</div><div class="wp-zh">${esc(zh)}</div></div>`;
    const out = [{ zh: '先读题，找出已知的钱数和要求的问题。', en: 'Read the problem.', render: s => { s.innerHTML = wrap(text); } }];
    let last = 0;
    steps.forEach((st, i) => { const a = st.a === 'ANS' ? last : st.a, b = st.b === 'ANS' ? last : st.b, r = st.op === '+' ? a + b : a - b; last = r;
      out.push({ zh: `${steps.length > 1 ? `第 ${i + 1} 步：` : ''}${st.why}列算式 <b>${F(a)} ${st.op === '+' ? '+' : '−'} ${F(b)}</b>，小数点对齐算。`, en: `${F(a)} ${st.op} ${F(b)}.`, render: s => { s.innerHTML = wrap(line(`${F(a)} ${st.op === '+' ? '+' : '−'} ${F(b)} = ?`), `<div class="center">${mcol(a, b, st.op)}</div>`); } });
      out.push({ zh: `${F(a)} ${st.op === '+' ? '+' : '−'} ${F(b)} = <b>${F(r)}</b>。`, en: `= ${F(r)}.`, render: s => { s.innerHTML = wrap(`<div class="center">${mcol(a, b, st.op, { res: true })}</div>`, line(`${F(a)} ${st.op === '+' ? '+' : '−'} ${F(b)} = ${F(r)}`)); } }); });
    out.push({ zh: `答：${esc(sentence.zh).replace('___', `<b>${F(last)}</b>`)}`, en: sentence.en.replace('___', F(last)), render: s => { s.innerHTML = wrap(line(esc(sentence.en).replace('___', `<b>${F(last)}</b>`))); } });
    return out;
  };
})();
