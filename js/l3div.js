/* Level 3 · Unit 7 除法：短除竖式、心算 讲解动画 */
(function () {
  const line = t => `<div class="expand-line">${t}</div>`;
  const wrap = (...parts) => `<div class="l1wrap">${parts.join('')}</div>`;
  const NAME = ['个', '十', '百'], NAMEEN = ['ones', 'tens', 'hundreds'];
  const S = window.StepKinds;

  /* 长除法各步：返回 [{qdigits, rows:[{text, indent}], note}] */
  function ldivSteps(a, b) {
    const ds = String(a).split('').map(Number), n = ds.length;
    const steps = []; let cur = 0, q = '', rows = [], started = false;
    ds.forEach((d, i) => {
      const prev = cur; cur = cur * 10 + d;
      const place = n - 1 - i;
      const qd = Math.floor(cur / b), sub = qd * b, rem = cur - sub;
      if (!started && qd === 0 && i < n - 1) { q += ''; steps.push({ q, rows: rows.slice(), place, cur, qd: 0, skip: true, d }); return; }
      started = true; q += String(qd);
      const r1 = rows.slice();
      if (i > 0 && prev > 0 || i > 0) r1.push({ text: String(cur), indent: i, kind: 'bring' });
      r1.push({ text: String(sub), indent: i, kind: 'sub' });
      r1.push({ text: String(rem), indent: i, kind: 'rem', last: i === n - 1 });
      rows = r1; steps.push({ q, rows: rows.slice(), place, cur, qd, sub, rem, d, prev });
      cur = rem;
    });
    return { steps, q: parseInt(q, 10), r: cur };
  }
  function ldivHTML(a, b, st, hl) {
    const n = String(a).length, pad = k => ' '.repeat(k);
    const qline = pad(2 + n - (st ? st.q.length : 0)) + (st ? st.q : '');
    let out = `<span class="lq">${qline.padStart(2 + n)}</span>\n<span class="ldv">${b}</span><span class="lbr">)</span>${String(a)}`;
    if (st) st.rows.forEach(r => { const txt = pad(2 + r.indent + 1 - r.text.length) + r.text; out += `\n${r.kind === 'sub' ? '<span class="lsub">' : ''}${r.kind === 'rem' && r.last ? '<span class="lrem">' : ''}${txt}${r.kind === 'sub' ? '</span>' : ''}${r.kind === 'rem' && r.last ? '</span>' : ''}`; });
    return `<pre class="ldiv ${hl || ''}">${out}</pre>`;
  }
  window.L3.ldivHTML = ldivHTML; window.L3.ldivSteps = ldivSteps;

  /* l3ldiv：短除 {a, b} */
  S.l3ldiv = ({ a, b }) => {
    const { steps: ls, q, r } = ldivSteps(a, b);
    const n = String(a).length;
    const out = [{ zh: `${a} ÷ ${b}：写成短除式，${b} 在外面，${a} 在里面。<b>从最高位开始</b>，一位一位除。`, en: `Divide from the highest place.`, render: s => { s.innerHTML = wrap(`<div class="center">${ldivHTML(a, b)}</div>`); } }];
    ls.forEach((st, i) => {
      const pn = NAME[st.place], pe = NAMEEN[st.place];
      if (st.skip) { out.push({ zh: `${pn}位 ${st.d} 比 ${b} 小，不够除，和下一位合起来看。`, en: `${st.d} is less than ${b}. Look at the next digit too.`, render: s => { s.innerHTML = wrap(`<div class="center">${ldivHTML(a, b)}</div>`); } }); return; }
      const isLast = st.place === 0;
      const zh = `${i === 0 || (i === 1 && ls[0].skip) ? '先' : '再'}除${pn}位：${st.prev ? `${st.prev} 个${NAME[st.place + 1]}余下来变成 ${st.prev * 10} 个${pn}，加上 ${st.d} 是 ${st.cur}，` : ''}${st.cur} ÷ ${b} = <b>${st.qd}</b>${st.rem ? ` 余 ${st.rem}` : ''}。商 ${st.qd} 写在${pn}位上面，${st.qd} × ${b} = ${st.sub} 写在下面，${st.cur} − ${st.sub} = ${st.rem}${isLast ? (st.rem ? `，<b>余数 ${st.rem}</b>` : '，没有余数') : '，再把下一位拉下来'}。`;
      out.push({ zh, en: `${pe}: ${st.cur} ÷ ${b} = ${st.qd}${st.rem ? ` R ${st.rem}` : ''}.`, render: s => { s.innerHTML = wrap(`<div class="center">${ldivHTML(a, b, st)}</div>`, line(`${st.cur} ÷ ${b} = ${st.qd}${st.rem ? ` R ${st.rem}` : ''}`)); } });
    });
    out.push({ zh: `所以 ${a} ÷ ${b} = <b>${q}</b>${r ? ` 余 <b>${r}</b>（${q} R ${r}）` : ''}。检查：${q} × ${b}${r ? ` + ${r}` : ''} = ${a} ✔`, en: `${a} ÷ ${b} = ${q}${r ? ` R ${r}` : ''}.`, render: s => { s.innerHTML = wrap(`<div class="center">${ldivHTML(a, b, ls[ls.length - 1])}</div>`, line(`${a} ÷ ${b} = ${q}${r ? ` R ${r}` : ''}`)); } });
    return out;
  };
  /* l3divmental：8÷2, 80÷2, 800÷2 {a, b} a 一位 */
  S.l3divmental = ({ a, b }) => {
    const q = a / b;
    return [
      { zh: `先记住 <b>${a} ÷ ${b} = ${q}</b>。`, en: `${a} ÷ ${b} = ${q}.`, render: s => { s.innerHTML = wrap(line(`${a} ÷ ${b} = ${q}`)); } },
      { zh: `${a * 10} 是 ${a} 个十，${a} 个十 ÷ ${b} = ${q} 个十 = <b>${q * 10}</b>。`, en: `${a} tens ÷ ${b} = ${q} tens = ${q * 10}.`, render: s => { s.innerHTML = wrap(line(`${a} ÷ ${b} = ${q}`), line(`${a * 10} ÷ ${b} = ${q * 10}`)); } },
      { zh: `${a * 100} 是 ${a} 个百，${a} 个百 ÷ ${b} = ${q} 个百 = <b>${q * 100}</b>。被除数后面多几个 0，商后面也多几个 0。`, en: `${a} hundreds ÷ ${b} = ${q} hundreds = ${q * 100}.`, render: s => { s.innerHTML = wrap(line(`${a} ÷ ${b} = ${q}`), line(`${a * 10} ÷ ${b} = ${q * 10}`), line(`${a * 100} ÷ ${b} = ${q * 100}`)); } },
    ];
  };
  /* l3formdiv：组数再除 {digits, big, odd, b} */
  S.l3formdiv = ({ digits, big, odd, b }) => {
    const f = S.l3form({ digits, big, odd }); const ans = +f[f.length - 1].en.replace(/\D/g, '');
    return f.concat(S.l3ldiv({ a: ans, b }).slice(1));
  };
})();
