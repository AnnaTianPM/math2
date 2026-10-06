/* Level 3 · Unit 11 条形图：SVG 绘制 + 讲解 */
(function () {
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '"': '&quot;', '>': '&gt;' }[c]));
  const line = t => `<div class="expand-line">${t}</div>`;
  const wrap = (...parts) => `<div class="l1wrap">${parts.join('')}</div>`;

  /* bargraph(spec, o)  spec = { title, cats:[{label, v}], step, max, min?, horizontal, axis:{x, y}, unit? }
   * o = { hl:[labels], note:{label: text}, w } */
  function bargraph(spec, o = {}) {
    const hl = new Set(o.hl || []), note = o.note || {}, min = spec.min || 0, max = spec.max, step = spec.step, n = spec.cats.length;
    const W = o.w || 520, H = spec.horizontal ? 60 + n * 40 + 40 : 320, pl = spec.horizontal ? 110 : 70, pt = 40, pr = 20, pb = spec.horizontal ? 50 : 60;
    const gw = W - pl - pr, gh = H - pt - pb;
    let s = `<text x="${W / 2}" y="22" text-anchor="middle" font-size="16" font-weight="800" fill="#2b2b3a">${esc(spec.title || '')}</text>`;
    const ticks = []; for (let v = min; v <= max + 1e-9; v += step) ticks.push(v);
    if (!spec.horizontal) {
      const Y = v => pt + gh - (v - min) / (max - min) * gh, bw = gw / n, barw = bw * 0.5;
      ticks.forEach(v => { const y = Y(v); s += `<line x1="${pl}" y1="${y}" x2="${pl + gw}" y2="${y}" stroke="#bbb" stroke-width="1"/><text x="${pl - 8}" y="${y + 4}" text-anchor="end" font-size="12" fill="#333">${v}</text>`; });
      for (let i = 0; i <= n; i++) s += `<line x1="${pl + i * bw}" y1="${pt}" x2="${pl + i * bw}" y2="${pt + gh}" stroke="#ddd" stroke-width="1"/>`;
      s += `<line x1="${pl}" y1="${pt}" x2="${pl}" y2="${pt + gh}" stroke="#333" stroke-width="1.5"/><line x1="${pl}" y1="${pt + gh}" x2="${pl + gw}" y2="${pt + gh}" stroke="#333" stroke-width="1.5"/>`;
      spec.cats.forEach((c, i) => { const x = pl + i * bw + (bw - barw) / 2, y = Y(c.v); s += `<rect x="${x}" y="${y}" width="${barw}" height="${pt + gh - y}" fill="${hl.has(c.label) ? '#ff9f43' : '#c9c3ef'}" stroke="#333" stroke-width="1"/><text x="${x + barw / 2}" y="${pt + gh + 16}" text-anchor="middle" font-size="11" fill="#333">${esc(c.label)}</text>`; if (note[c.label] !== undefined) s += `<text x="${x + barw / 2}" y="${y - 5}" text-anchor="middle" font-size="13" font-weight="800" fill="#d35400">${note[c.label]}</text>`; });
      if (spec.axis) { s += `<text x="${pl - 50}" y="${pt + gh / 2}" text-anchor="middle" font-size="11" fill="#333">${esc(spec.axis.y || '')}</text>`; }
    } else {
      const X = v => pl + (v - min) / (max - min) * gw, bh = gh / n, barh = bh * 0.5;
      ticks.forEach(v => { const x = X(v); s += `<line x1="${x}" y1="${pt}" x2="${x}" y2="${pt + gh}" stroke="#bbb" stroke-width="1"/><text x="${x}" y="${pt + gh + 16}" text-anchor="middle" font-size="12" fill="#333">${v}</text>`; });
      for (let i = 0; i <= n; i++) s += `<line x1="${pl}" y1="${pt + i * bh}" x2="${pl + gw}" y2="${pt + i * bh}" stroke="#ddd" stroke-width="1"/>`;
      s += `<line x1="${pl}" y1="${pt}" x2="${pl}" y2="${pt + gh}" stroke="#333" stroke-width="1.5"/><line x1="${pl}" y1="${pt + gh}" x2="${pl + gw}" y2="${pt + gh}" stroke="#333" stroke-width="1.5"/>`;
      spec.cats.forEach((c, i) => { const y = pt + i * bh + (bh - barh) / 2, x = X(c.v); s += `<rect x="${pl}" y="${y}" width="${x - pl}" height="${barh}" fill="${hl.has(c.label) ? '#ff9f43' : '#c9c3ef'}" stroke="#333" stroke-width="1"/><text x="${pl - 8}" y="${y + barh / 2 + 4}" text-anchor="end" font-size="12" fill="#333">${esc(c.label)}</text>`; if (note[c.label] !== undefined) s += `<text x="${x + 6}" y="${y + barh / 2 + 4}" font-size="13" font-weight="800" fill="#d35400">${note[c.label]}</text>`; });
      if (spec.axis) s += `<text x="${pl + gw / 2}" y="${H - 6}" text-anchor="middle" font-size="12" fill="#333">${esc(spec.axis.x || '')}</text>`;
    }
    return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" style="max-width:100%;height:auto;background:#fff;border-radius:8px">${s}</svg>`;
  }
  window.L3.bargraph = bargraph;
  const cat = (spec, L) => spec.cats.find(c => c.label === L);
  const fmt = (spec, v) => spec.money ? `$${v}` : spec.cents ? `${v}¢` : String(v);
  const allNotes = spec => Object.fromEntries(spec.cats.map(c => [c.label, fmt(spec, c.v)]));

  const S = window.StepKinds;
  const scaleStep = spec => ({ zh: `先看刻度：相邻两条线相差 <b>${spec.step}</b>${spec.horizontal ? '，横着看' : '，竖着看'}。每根条顶端对着的线就是它的数。`, en: `Each gridline is ${spec.step}.`, render: s => { s.innerHTML = wrap(`<div class="center">${bargraph(spec)}</div>`); } });
  /* l3bar：{spec, q:{kind:'read'|'most'|'least'|'diff'|'sum'|'same'|'times'|'pair'|'need', ...}} */
  S.l3bar = ({ spec, q }) => {
    const steps = [scaleStep(spec)];
    const g = (hl, note, extra) => s => { s.innerHTML = wrap(`<div class="center">${bargraph(spec, { hl, note })}</div>`, extra ? line(extra) : ''); };
    if (q.kind === 'read') { const c = cat(spec, q.cat); steps.push({ zh: `找到 <b>${q.cat}</b> 那根条，顶端对着 <b>${fmt(spec, c.v)}</b>。`, en: `${q.cat}: ${c.v}.`, render: g([q.cat], { [q.cat]: fmt(spec, c.v) }, `${q.cat} = ${fmt(spec, c.v)}`) }); }
    else if (q.kind === 'most' || q.kind === 'least') { const sorted = spec.cats.slice().sort((a, b) => q.kind === 'most' ? b.v - a.v : a.v - b.v); steps.push({ zh: `读出每根条：${spec.cats.map(c => `${c.label} ${fmt(spec, c.v)}`).join('，')}。`, en: 'Read each bar.', render: g([], allNotes(spec)) }); steps.push({ zh: `${q.kind === 'most' ? '最高' : '最矮'}的条是 <b>${sorted[0].label}</b>（${fmt(spec, sorted[0].v)}）。`, en: `${sorted[0].label}.`, render: g([sorted[0].label], allNotes(spec), sorted[0].label) }); }
    else if (q.kind === 'diff') { const a = cat(spec, q.a), b = cat(spec, q.b); steps.push({ zh: `${q.a} 是 <b>${fmt(spec, a.v)}</b>，${q.b} 是 <b>${fmt(spec, b.v)}</b>。`, en: `${a.v} and ${b.v}.`, render: g([q.a, q.b], { [q.a]: fmt(spec, a.v), [q.b]: fmt(spec, b.v) }) }); steps.push({ zh: `大的减小的：${Math.max(a.v, b.v)} − ${Math.min(a.v, b.v)} = <b>${Math.abs(a.v - b.v)}</b>。`, en: `${Math.max(a.v, b.v)} − ${Math.min(a.v, b.v)} = ${Math.abs(a.v - b.v)}.`, render: g([q.a, q.b], { [q.a]: fmt(spec, a.v), [q.b]: fmt(spec, b.v) }, `${Math.max(a.v, b.v)} − ${Math.min(a.v, b.v)} = ${Math.abs(a.v - b.v)}`) }); }
    else if (q.kind === 'sum') { const vs = (q.cats ? q.cats.map(L => cat(spec, L)) : spec.cats).map(c => c.v), t = vs.reduce((x, y) => x + y, 0); steps.push({ zh: `读出${q.cats ? q.cats.join('、') : '每根条'}：${(q.cats ? q.cats.map(L => cat(spec, L)) : spec.cats).map(c => `${c.label} ${fmt(spec, c.v)}`).join('，')}。`, en: 'Read the bars.', render: g(q.cats || [], allNotes(spec)) }); steps.push({ zh: `加起来：${vs.join(' + ')} = <b>${fmt(spec, t)}</b>${spec.cents && t >= 100 ? ` = $${(t / 100).toFixed(2)}` : ''}。`, en: `${vs.join(' + ')} = ${t}.`, render: g(q.cats || [], allNotes(spec), `${vs.join(' + ')} = ${t}`) }); }
    else if (q.kind === 'same') { const pairs = []; spec.cats.forEach((a, i) => spec.cats.slice(i + 1).forEach(b => { if (a.v === b.v) pairs.push([a.label, b.label]); })); const p = pairs[0]; steps.push({ zh: `读出每根条，找一样高的：<b>${p[0]}</b> 和 <b>${p[1]}</b> 都是 ${fmt(spec, cat(spec, p[0]).v)}。`, en: `${p[0]} and ${p[1]}.`, render: g(p, allNotes(spec)) }); }
    else if (q.kind === 'times') { const a = cat(spec, q.a), k = q.k; const other = spec.cats.find(c => c.v * k === a.v); steps.push({ zh: `${q.a} 是 <b>${fmt(spec, a.v)}</b>。“${k} 倍”：${a.v} ÷ ${k} = ${a.v / k}，哪根条是 ${a.v / k}？是 <b>${other.label}</b>。`, en: `${a.v} ÷ ${k} = ${a.v / k}: ${other.label}.`, render: g([q.a, other.label], allNotes(spec), `${a.v} ÷ ${k} = ${a.v / k}`) }); }
    else if (q.kind === 'pair') { const a = cat(spec, q.a), need = a.v; const found = []; spec.cats.forEach((x, i) => spec.cats.slice(i + 1).forEach(y => { if (x.v + y.v === need && x.label !== q.a && y.label !== q.a) found.push([x.label, y.label]); })); const p = found[0]; steps.push({ zh: `${q.a} 是 ${fmt(spec, need)}。找两根加起来是 ${need} 的：<b>${p[0]}</b> ${cat(spec, p[0]).v} + <b>${p[1]}</b> ${cat(spec, p[1]).v} = ${need}。`, en: `${p[0]} + ${p[1]} = ${need}.`, render: g([q.a, p[0], p[1]], allNotes(spec), `${cat(spec, p[0]).v} + ${cat(spec, p[1]).v} = ${need}`) }); }
    else if (q.kind === 'need') { const t = spec.cats.reduce((x, c) => x + c.v, 0); steps.push({ zh: `一共存了 ${t}¢ = $${(t / 100).toFixed(2)}。需要 $${q.target}，还差 $${q.target} − $${(t / 100).toFixed(2)} = <b>$${(q.target - t / 100).toFixed(2)}</b>。`, en: `$${q.target} − $${(t / 100).toFixed(2)} = $${(q.target - t / 100).toFixed(2)}.`, render: g([], allNotes(spec), `$${q.target} − $${(t / 100).toFixed(2)} = $${(q.target - t / 100).toFixed(2)}`) }); }
    return steps;
  };
})();
