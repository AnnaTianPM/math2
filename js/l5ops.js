/* Level 5 · Unit 2  整数运算：×/÷ 10、100、1000 及倍数，四则混合 讲解动画 */
(function () {
  const line = t => `<div class="expand-line">${t}</div>`;
  const wrap = (...parts) => `<div class="l1wrap">${parts.join('')}</div>`;
  const fmt = n => window.L5.fmt(n);
  const zeros = p => String(p).length - 1, Z = p => '0'.repeat(zeros(p));
  const zname = p => ({ 10: ['十', 'tens'], 100: ['百', 'hundreds'], 1000: ['千', 'thousands'] }[p]);
  const S = window.StepKinds;
  /* l5mul10：{a, p} p = 10/100/1000 */
  S.l5mul10 = ({ a, p }) => [
    { zh: `乘 ${fmt(p)} 就是把 ${fmt(a)} 变成 ${fmt(a)} 个${zname(p)[0]}：每一位都往左移 <b>${zeros(p)}</b> 位，末尾添 ${zeros(p)} 个 0。`, en: `× ${p}: shift every digit ${zeros(p)} place${zeros(p) > 1 ? 's' : ''} left, add ${zeros(p)} zero${zeros(p) > 1 ? 's' : ''}.`, render: s => { s.innerHTML = wrap(line(`${fmt(a)} × ${fmt(p)}`), line(`${fmt(a)}<b style="color:#ff7f2a">${Z(p)}</b>`)); } },
    { zh: `所以 ${fmt(a)} × ${fmt(p)} = <b>${fmt(a * p)}</b>。`, en: `${fmt(a)} × ${fmt(p)} = ${fmt(a * p)}.`, render: s => { s.innerHTML = wrap(line(`${fmt(a)} × ${fmt(p)} = ${fmt(a * p)}`)); } },
  ];
  /* l5missmul：{a?, p?, r} 缺乘数或缺被乘数 */
  S.l5missmul = ({ a, p, r }) => a !== undefined ? [
    { zh: `${fmt(a)} × ? = ${fmt(r)}。比一比：${fmt(r)} 比 ${fmt(a)} 末尾多了 <b>${zeros(r / a)}</b> 个 0。`, en: `${fmt(r)} has ${zeros(r / a)} more zero(s) than ${fmt(a)}.`, render: s => { s.innerHTML = wrap(line(`${fmt(a)} × ? = ${fmt(r)}`), line(`${fmt(a)}<b style="color:#ff7f2a">${Z(r / a)}</b>`)); } },
    { zh: `多 ${zeros(r / a)} 个 0 就是乘了 <b>${fmt(r / a)}</b>。检查：${fmt(a)} × ${fmt(r / a)} = ${fmt(r)} ✓`, en: `${fmt(a)} × ${fmt(r / a)} = ${fmt(r)}.`, render: s => { s.innerHTML = wrap(line(`${fmt(a)} × ${fmt(r / a)} = ${fmt(r)}`)); } },
  ] : [
    { zh: `? × ${fmt(p)} = ${fmt(r)}。反过来想：? = ${fmt(r)} ÷ ${fmt(p)}，把 ${fmt(r)} 末尾的 <b>${zeros(p)}</b> 个 0 去掉。`, en: `? = ${fmt(r)} ÷ ${fmt(p)}: remove ${zeros(p)} zero(s).`, render: s => { s.innerHTML = wrap(line(`? × ${fmt(p)} = ${fmt(r)}`), line(`${fmt(r / p)}<s style="color:#aaa">${Z(p)}</s>`)); } },
    { zh: `所以 ? = <b>${fmt(r / p)}</b>。检查：${fmt(r / p)} × ${fmt(p)} = ${fmt(r)} ✓`, en: `${fmt(r / p)} × ${fmt(p)} = ${fmt(r)}.`, render: s => { s.innerHTML = wrap(line(`${fmt(r / p)} × ${fmt(p)} = ${fmt(r)}`)); } },
  ];
  /* l5mulsplit：{a, b} b = k × p */
  S.l5mulsplit = ({ a, b }) => { const p = 10 ** (String(b).length - String(b).replace(/0+$/, '').length), k = b / p; return [
    { zh: `${b} 不是整十整百，先<b>拆开</b>：${b} = ${k} × ${fmt(p)}。所以 ${fmt(a)} × ${b} = ${fmt(a)} × <b>${k}</b> × ${fmt(p)}。`, en: `${b} = ${k} × ${p}.`, render: s => { s.innerHTML = wrap(line(`${fmt(a)} × ${b} = ${fmt(a)} × ${k} × ${fmt(p)}`)); } },
    { zh: `先算 ${fmt(a)} × ${k} = <b>${fmt(a * k)}</b>。`, en: `${fmt(a)} × ${k} = ${fmt(a * k)}.`, render: s => { s.innerHTML = wrap(line(`= ${fmt(a * k)} × ${fmt(p)}`)); } },
    { zh: `再乘 ${fmt(p)}，末尾添 ${zeros(p)} 个 0：<b>${fmt(a * b)}</b>。`, en: `× ${p}: ${fmt(a * b)}.`, render: s => { s.innerHTML = wrap(line(`${fmt(a)} × ${b} = ${fmt(a * b)}`)); } },
  ]; };
  /* l5div10：{a, p} */
  S.l5div10 = ({ a, p }) => [
    { zh: `除以 ${fmt(p)}：每一位往右移 <b>${zeros(p)}</b> 位，也就是把末尾的 ${zeros(p)} 个 0 去掉。`, en: `÷ ${p}: remove ${zeros(p)} zero(s).`, render: s => { s.innerHTML = wrap(line(`${fmt(a)} ÷ ${fmt(p)}`), line(`${fmt(a / p)}<s style="color:#aaa">${Z(p)}</s>`)); } },
    { zh: `所以 ${fmt(a)} ÷ ${fmt(p)} = <b>${fmt(a / p)}</b>。`, en: `${fmt(a)} ÷ ${fmt(p)} = ${fmt(a / p)}.`, render: s => { s.innerHTML = wrap(line(`${fmt(a)} ÷ ${fmt(p)} = ${fmt(a / p)}`)); } },
  ];
  /* l5missdiv：{a?, p?, q} */
  S.l5missdiv = ({ a, p, q }) => a !== undefined ? [
    { zh: `${fmt(a)} ÷ ? = ${fmt(q)}。比一比：${fmt(a)} 比 ${fmt(q)} 末尾多 <b>${zeros(a / q)}</b> 个 0，所以除以的是 <b>${fmt(a / q)}</b>。`, en: `${fmt(a)} has ${zeros(a / q)} more zero(s): ÷ ${fmt(a / q)}.`, render: s => { s.innerHTML = wrap(line(`${fmt(a)} ÷ ? = ${fmt(q)}`), line(`${fmt(q)}<b style="color:#ff7f2a">${Z(a / q)}</b> ÷ ${fmt(a / q)} = ${fmt(q)}`)); } },
    { zh: `检查：${fmt(a)} ÷ ${fmt(a / q)} = ${fmt(q)} ✓`, en: `${fmt(a)} ÷ ${fmt(a / q)} = ${fmt(q)}.`, render: s => { s.innerHTML = wrap(line(`${fmt(a)} ÷ ${fmt(a / q)} = ${fmt(q)}`)); } },
  ] : [
    { zh: `? ÷ ${fmt(p)} = ${fmt(q)}。反过来：? = ${fmt(q)} × ${fmt(p)}，在 ${fmt(q)} 末尾添 <b>${zeros(p)}</b> 个 0。`, en: `? = ${fmt(q)} × ${fmt(p)}.`, render: s => { s.innerHTML = wrap(line(`? ÷ ${fmt(p)} = ${fmt(q)}`), line(`${fmt(q)}<b style="color:#ff7f2a">${Z(p)}</b>`)); } },
    { zh: `所以 ? = <b>${fmt(q * p)}</b>。检查：${fmt(q * p)} ÷ ${fmt(p)} = ${fmt(q)} ✓`, en: `${fmt(q * p)} ÷ ${fmt(p)} = ${fmt(q)}.`, render: s => { s.innerHTML = wrap(line(`${fmt(q * p)} ÷ ${fmt(p)} = ${fmt(q)}`)); } },
  ];
  /* l5divsplit：{a, b} b = k × p */
  S.l5divsplit = ({ a, b }) => { const p = 10 ** (String(b).length - String(b).replace(/0+$/, '').length), k = b / p; return [
    { zh: `${fmt(b)} = ${fmt(p)} × ${k}，除以 ${fmt(b)} 可以<b>分两步</b>：先 ÷ ${fmt(p)}，再 ÷ ${k}。`, en: `÷ ${b} = ÷ ${p} then ÷ ${k}.`, render: s => { s.innerHTML = wrap(line(`${fmt(a)} ÷ ${fmt(b)} = ${fmt(a)} ÷ ${fmt(p)} ÷ ${k}`)); } },
    { zh: `先 ÷ ${fmt(p)}，去掉 ${zeros(p)} 个 0：${fmt(a)} ÷ ${fmt(p)} = <b>${fmt(a / p)}</b>。`, en: `${fmt(a)} ÷ ${p} = ${fmt(a / p)}.`, render: s => { s.innerHTML = wrap(line(`= ${fmt(a / p)} ÷ ${k}`)); } },
    { zh: `再 ÷ ${k}：${fmt(a / p)} ÷ ${k} = <b>${fmt(a / b)}</b>。`, en: `${fmt(a / p)} ÷ ${k} = ${fmt(a / b)}.`, render: s => { s.innerHTML = wrap(line(`${fmt(a)} ÷ ${fmt(b)} = ${fmt(a / b)}`)); } },
  ]; };
  /* ---- 四则混合 ---- */
  const tok = e => e.replace(/−/g, '-').match(/\d+|[-+×÷()]/g).map(t => /^\d+$/.test(t) ? +t : t);
  const show = (ts, hl) => ts.map((t, i) => { const s = typeof t === 'number' ? fmt(t) : t === '-' ? '−' : t; return hl && i >= hl[0] && i <= hl[1] ? `<b style="color:#ff7f2a">${s}</b>` : s; }).join(' ').replace(/\( /g, '(').replace(/ \)/g, ')');
  function nextOp(ts) {
    let depth = 0, best = null, bd = -1; const open = [];
    ts.forEach((t, i) => { if (t === '(') open.push(i); if (t === ')') { const o = open.pop(); if (open.length >= bd) { bd = open.length; best = [o, i]; } } });
    const [lo, hi] = best ? [best[0] + 1, best[1] - 1] : [0, ts.length - 1];
    for (const ops of [['×', '÷'], ['+', '-']]) for (let i = lo; i <= hi; i++) if (ops.includes(ts[i])) return { i, lo, hi, inner: !!best };
    return null;
  }
  function evalSteps(expr) {
    let ts = tok(expr); const steps = [];
    while (ts.length > 1) {
      if (ts.length === 3 && ts[0] === '(' && ts[2] === ')') { ts = [ts[1]]; break; }
      const o = nextOp(ts); if (!o) break;
      const a = ts[o.i - 1], op = ts[o.i], b = ts[o.i + 1]; const r = op === '×' ? a * b : op === '÷' ? a / b : op === '+' ? a + b : a - b;
      const before = ts.slice(); const hl = [o.i - 1, o.i + 1];
      ts.splice(o.i - 1, 3, r);
      if (o.inner && o.hi - o.lo === 2) { const li = o.i - 2, ri = o.i; if (ts[li] === '(' && ts[ri] === ')') ts.splice(ri, 1), ts.splice(li, 1); }
      const why = o.inner ? '括号里的先算' : op === '×' || op === '÷' ? '没有括号了，先算乘除（从左到右）' : '只剩加减，从左到右算';
      steps.push({ before, hl, after: ts.slice(), text: `${why}：${fmt(a)} ${op === '-' ? '−' : op} ${fmt(b)} = <b>${fmt(r)}</b>`, en: `${fmt(a)} ${op === '-' ? '−' : op} ${fmt(b)} = ${fmt(r)}` });
    }
    return { steps, value: ts[0] };
  }
  S.l5order = ({ expr }) => { const { steps, value } = evalSteps(expr); return [
    { zh: `顺序：先算<b>括号</b>里的，再算<b>乘除</b>，最后算<b>加减</b>；同一级从左到右。`, en: 'Brackets first, then × and ÷, then + and −, left to right.', render: s => { s.innerHTML = wrap(line(show(tok(expr)))); } },
    ...steps.map(st => ({ zh: st.text + '。', en: st.en, render: s => { s.innerHTML = wrap(line(show(st.before, st.hl)), line(`= ${show(st.after)}`)); } })),
    { zh: `所以答案是 <b>${fmt(value)}</b>。`, en: `${fmt(value)}.`, render: s => { s.innerHTML = wrap(line(`${show(tok(expr))} = ${fmt(value)}`)); } },
  ]; };
  window.L5OPS = { evalSteps, zeros };
})();
