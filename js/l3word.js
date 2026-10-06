/* Level 3：竖式乘法、乘除应用题线段图 讲解动画 */
(function () {
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '"': '&quot;', '>': '&gt;' }[c]));
  const line = t => `<div class="expand-line">${t}</div>`;
  const wrap = (...parts) => `<div class="l1wrap">${parts.join('')}</div>`;
  const A = window.ArithUI;
  const K = ['o', 't', 'h', 'th'], NAME = { o: ['个', 'ones'], t: ['十', 'tens'], h: ['百', 'hundreds'], th: ['千', 'thousands'] };
  const split = n => ({ th: Math.floor(n / 1000), h: Math.floor(n / 100) % 10, t: Math.floor(n / 10) % 10, o: n % 10 });
  const S = window.StepKinds;

  /* l3mulcol：竖式乘法 {a, b} b 一位数 */
  S.l3mulcol = ({ a, b }) => {
    const prod = a * b, w = prod >= 1000 ? 4 : 3, va = split(a), res = Array(w).fill(''), carries = {};
    const col = cfg => `<div class="center">${A.columnHTML(Object.assign({ a, b, op: '×', width: w }, cfg))}</div>`;
    const steps = [{ zh: `${a} × ${b}：把 ${b} 写在个位下面。<b>从个位开始</b>，每一位都乘 ${b}。`, en: `Multiply each digit by ${b}, starting from the ones.`, render: s => { s.innerHTML = col({}); } }];
    let carry = 0; const used = K.slice(0, String(a).length);
    used.forEach((k, i) => {
      const x = va[k], p = x * b, s = p + carry, d = s % 10, c = Math.floor(s / 10), last = i === used.length - 1;
      if (last) String(s).split('').reverse().forEach((ch, j) => { res[w - 1 - i - j] = +ch; }); else res[w - 1 - i] = d;
      const snap = res.slice(), nc = Object.assign({}, carries); if (c && !last) nc[K[i + 1]] = c;
      steps.push({ zh: `${i === 0 ? '先' : last ? '最后' : '再'}算${NAME[k][0]}位：${x} ${NAME[k][1]} × ${b} = ${p} ${NAME[k][1]}${carry ? `，加上进来的 ${carry}：${p} + ${carry} = ${s}` : ''}${c && !last ? `。满 10 <b>进位</b>：写 ${d}，向${NAME[K[i + 1]][0]}位进 ${c}` : `，写 ${last ? s : d}`}。`, en: `${NAME[k][1]}: ${x} × ${b} = ${p}${carry ? ` + ${carry} = ${s}` : ''}.${c && !last ? ` Regroup: write ${d}, carry ${c}.` : ''}`, render: st => { st.innerHTML = col({ result: snap, carries: nc, hl: k }); } });
      Object.assign(carries, nc); carry = c;
    });
    steps.push({ zh: `所以 <b>${a} × ${b} = ${prod}</b>。`, en: `${a} × ${b} = ${prod}.`, render: s => { s.innerHTML = wrap(col({ result: res, carries }), line(`${a} × ${b} = ${prod}`)); } });
    return steps;
  };

  /* 单位线段图 rows=[{label, n, first?, dashed?, top?, bottom?, bottomN?}], o.right 总数花括号 */
  function ubar(rows, o = {}) {
    const W = 520, x0 = 90, bh = 34, gap = 22, unit = Math.min(60, (W - x0 - 70) / Math.max(...rows.map(r => r.n)));
    let s = '', y = 30;
    const brace = (x1, x2, yy, up, label) => { const d = up ? -8 : 8; return `<path d="M${x1} ${yy} v${d} H${x2} v${-d}" fill="none" stroke="#7cb342" stroke-width="2"/><text x="${(x1 + x2) / 2}" y="${yy + (up ? -14 : 24)}" text-anchor="middle" font-size="17" font-weight="800" fill="#2b2b3a">${label}</text>`; };
    rows.forEach(r => {
      if (r.label) s += `<text x="${x0 - 10}" y="${y + bh / 2 + 6}" text-anchor="end" font-size="16" font-weight="700" fill="#4b3fc4">${esc(r.label)}</text>`;
      for (let i = 0; i < r.n; i++) s += `<rect x="${x0 + i * unit}" y="${y}" width="${unit}" height="${bh}" fill="${i === 0 && r.first !== undefined ? '#e9e4ff' : '#fff'}" stroke="#2b2b3a" stroke-width="1.5" ${r.dashed && i > 0 ? 'stroke-dasharray="5 4"' : ''}/>`;
      if (r.first !== undefined) s += brace(x0, x0 + unit, y - 4, true, r.first);
      if (r.top !== undefined) s += brace(x0, x0 + r.n * unit, y - 4, true, r.top);
      if (r.bottom !== undefined) s += brace(x0, x0 + (r.bottomN || r.n) * unit, y + bh + 4, false, r.bottom);
      r._y = y; y += bh + gap + (r.top !== undefined || r.first !== undefined ? 14 : 0) + (r.bottom !== undefined ? 14 : 0);
    });
    if (o.right !== undefined) { const xr = x0 + Math.max(...rows.map(r => r.n)) * unit + 10, y1 = rows[0]._y, y2 = rows[rows.length - 1]._y + bh; s += `<path d="M${xr} ${y1} h8 V${y2} h-8" fill="none" stroke="#7cb342" stroke-width="2"/><text x="${xr + 14}" y="${(y1 + y2) / 2 + 6}" font-size="17" font-weight="800" fill="#2b2b3a">${o.right}</text>`; }
    return `<svg viewBox="0 0 ${W} ${y + 10}" width="${W}" height="${y + 10}" style="max-width:100%;height:auto">${s}</svg>`;
  }
  window.L3.ubar = ubar;

  /* l3mdword：乘除应用题 q = {en, zh, model, sentence} model.kind mul|div|times|units */
  S.l3mdword = q => {
    const m = q.model, ans = window.WordUI.answerOf(q), eq = window.WordUI.equationOf(q);
    const text = `<div class="wp-text"><div class="wp-en">${esc(q.en)}</div><div class="wp-zh">${esc(q.zh)}</div></div>`;
    const sent = `<div class="expand-line">${esc(q.sentence.en).replace('___', `<b style="color:#ff9f43">${ans}</b>`)}</div>`;
    let bar, read, draw;
    if (m.kind === 'mul') { bar = showA => ubar([{ n: m.a, first: m.unit ? `${m.unit}${m.b}` : m.b, bottom: showA ? ans : '?' }]); read = `已知 <b>${m.a}</b> 个（组），每个 <b>${m.b}</b>。求一共多少，几个几用<b>乘法</b>。`; draw = `画 ${m.a} 个格子，每格 ${m.b}，整条是 ?。`; }
    else if (m.kind === 'div') { const share = m.how === 'share'; bar = showA => share ? ubar([{ n: m.by, top: m.total, bottom: showA ? ans : '?', bottomN: 1 }]) : ubar([{ n: ans, first: m.by, dashed: true, top: m.total, bottom: showA ? ans : '?' }]); read = share ? `已知一共 <b>${m.total}</b>，平均分成 <b>${m.by}</b> 份，求每份多少，用<b>除法</b>。` : `已知一共 <b>${m.total}</b>，每份 <b>${m.by}</b>，求有几份，用<b>除法</b>。`; draw = share ? `整条是 ${m.total}，切成 ${m.by} 格，一格是 ?。` : `整条是 ${m.total}，每格 ${m.by}，数有几格。`; }
    else if (m.kind === 'times') { bar = showA => ubar([{ label: m.base.label, n: 1, top: m.base.v }, { label: m.other.label, n: m.k, bottom: showA ? ans : '?' }]); read = `${m.base.label} 有 <b>${m.base.v}</b>。${m.other.label} 是它的 <b>${m.k} 倍</b>（${m.k === 2 ? 'twice' : m.k + ' times'} as many）。求 ${m.other.label}，用<b>乘法</b>。`; draw = `${m.base.label} 画 1 格，${m.other.label} 画 ${m.k} 格一样长的，? 是 ${m.k} 格。`; }
    else { bar = showA => ubar([{ label: m.big.label, n: m.k }, { label: m.small.label, n: 1, bottom: showA ? ans : '?' }], { right: m.total }); read = `${m.big.label} 是 ${m.small.label} 的 <b>${m.k} 倍</b>，两个合起来一共 <b>${m.total}</b>。求 ${m.small.label}。`; draw = `${m.small.label} 画 1 格，${m.big.label} 画 ${m.k} 格，一共 ${m.k + 1} 格 = ${m.total}。`; }
    const steps = [
      { zh: '先读题，找出已知的数和要求的问题。', en: 'Read the problem.', render: s => { s.innerHTML = wrap(text); } },
      { zh: read, en: eq.expr, render: s => { s.innerHTML = wrap(text, `<div class="center">${bar(false)}</div>`); } },
      { zh: `画线段图：${draw}`, en: 'Draw the bar model.', render: s => { s.innerHTML = wrap(`<div class="center">${bar(false)}</div>`); } },
    ];
    if (m.kind === 'units') steps.push({ zh: `${m.k + 1} units → ${m.total}，1 unit → ${m.total} ÷ ${m.k + 1} = <b>${ans}</b>。`, en: `${m.k + 1} units → ${m.total}; 1 unit → ${ans}.`, render: s => { s.innerHTML = wrap(`<div class="center">${bar(true)}</div>`, line(`${m.k + 1} units → ${m.total}`), line(`1 unit → ${m.total} ÷ ${m.k + 1} = ${ans}`)); } });
    else steps.push({ zh: `列算式：<b>${eq.expr} = ${ans}</b>${m.kind === 'div' ? `（想：${m.by} × ${ans} = ${m.total}）` : ''}。`, en: `${eq.expr} = ${ans}.`, render: s => { s.innerHTML = wrap(`<div class="center">${bar(true)}</div>`, line(`${eq.expr} = ${ans}`)); } });
    steps.push({ zh: `写答句：${esc(q.sentence.zh).replace('___', `<b>${ans}</b>`)}`, en: q.sentence.en.replace('___', String(ans)), render: s => { s.innerHTML = wrap(`<div class="center">${bar(true)}</div>`, sent); } });
    return steps;
  };
})();
