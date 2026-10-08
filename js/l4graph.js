/* Level 4 · Unit 14  表格、条形图、折线图：绘制 + 数据驱动讲解 l4data */
(function () {
  const line = t => `<div class="expand-line">${t}</div>`;
  const wrap = (...parts) => `<div class="l1wrap">${parts.join('')}</div>`;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '"': '&quot;', '>': '&gt;' }[c]));
  /* 数据表：head [h1,h2], rows [[label, value]], o.hl 高亮 label 列表, o.blank 显示 ? 的 label */
  function table(head, rows, o = {}) {
    const vert = o.vert; const hl = new Set(o.hl || []), blank = new Set(o.blank || []);
    const cell = (r, i) => `<td class="${hl.has(r[0]) ? 'hl' : ''}" style="font-size:18px">${blank.has(r[0]) ? '?' : (o.fmt ? o.fmt(r[1]) : r[1])}</td>`;
    if (vert) return `<table class="pv4 dtab"><tr><th>${esc(head[0])}</th><th>${esc(head[1])}</th></tr>${rows.map(r => `<tr><td class="lab ${hl.has(r[0]) ? 'hl' : ''}" style="font-size:16px;font-weight:700">${esc(r[0])}</td>${cell(r)}</tr>`).join('')}</table>`;
    return `<table class="pv4 dtab"><tr><th>${esc(head[0])}</th>${rows.map(r => `<th class="${hl.has(r[0]) ? 'hl' : ''}">${esc(r[0])}</th>`).join('')}</tr><tr><th>${esc(head[1])}</th>${rows.map(cell).join('')}</tr></table>`;
  }
  /* 正字计数（五个一组） */
  function tally(n, o = {}) {
    const groups = Math.floor(n / 5), rest = n % 5; let s = '', x = 4;
    const stroke = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#2b2b3a" stroke-width="2" stroke-linecap="round"/>`;
    for (let g = 0; g < groups; g++) { for (let i = 0; i < 4; i++) s += stroke(x + i * 7, 4, x + i * 7, 26); s += stroke(x - 3, 24, x + 25, 6); x += 36; }
    for (let i = 0; i < rest; i++) { s += stroke(x, 4, x, 26); x += 7; }
    return `<svg viewBox="0 0 ${Math.max(x + 6, 30)} 30" height="26" style="vertical-align:middle">${s}</svg>`;
  }
  /* 折线图 spec = {labels, vals, step, max, min?, axisY, axisX} o.hl=[idx], o.mark=[idx] */
  function linegraph(spec, o = {}) {
    const W = o.w || 520, H = 300, pl = 80, pt = 24, pr = 24, pb = 56, gw = W - pl - pr, gh = H - pt - pb, min = spec.min || 0, max = spec.max, n = spec.labels.length;
    const X = i => pl + gw * (i + 0.5) / n, Y = v => pt + gh - (v - min) / (max - min) * gh;
    let s = '';
    for (let v = min; v <= max + 1e-9; v += spec.step) { const y = Y(v); const major = ((v - min) / spec.step) % (spec.majorEvery || 1) === 0; s += `<line x1="${pl}" y1="${y}" x2="${pl + gw}" y2="${y}" stroke="${major ? '#bbb' : '#e3e3e3'}" stroke-width="1"/>${major ? `<text x="${pl - 8}" y="${y + 4}" text-anchor="end" font-size="12" fill="#333">${v}</text>` : ''}`; }
    for (let i = 0; i < n; i++) s += `<line x1="${X(i)}" y1="${pt}" x2="${X(i)}" y2="${pt + gh}" stroke="#ddd" stroke-width="1"/><text x="${X(i)}" y="${pt + gh + 18}" text-anchor="middle" font-size="12" fill="#333">${esc(spec.labels[i])}</text>`;
    s += `<line x1="${pl}" y1="${pt}" x2="${pl}" y2="${pt + gh}" stroke="#333" stroke-width="1.5"/><line x1="${pl}" y1="${pt + gh}" x2="${pl + gw}" y2="${pt + gh}" stroke="#333" stroke-width="1.5"/>`;
    s += `<polyline points="${spec.vals.map((v, i) => `${X(i)},${Y(v)}`).join(' ')}" fill="none" stroke="#2b2b3a" stroke-width="2"/>`;
    spec.vals.forEach((v, i) => { const hl = (o.hl || []).includes(i); s += `<circle cx="${X(i)}" cy="${Y(v)}" r="${hl ? 6 : 4}" fill="${hl ? '#ff9f43' : '#2b2b3a'}"/>`; if (hl) s += `<line x1="${pl}" y1="${Y(v)}" x2="${X(i)}" y2="${Y(v)}" stroke="#ff9f43" stroke-width="1.5" stroke-dasharray="4 3"/><text x="${X(i) + 8}" y="${Y(v) - 8}" font-size="13" font-weight="800" fill="#d35400">${v}</text>`; });
    if (spec.axisY) s += `<text x="14" y="${pt + gh / 2}" text-anchor="middle" font-size="11" fill="#333" transform="rotate(-90 14 ${pt + gh / 2})">${esc(spec.axisY)}</text>`;
    if (spec.axisX) s += `<text x="${pl + gw / 2}" y="${H - 8}" text-anchor="middle" font-size="12" fill="#333">${esc(spec.axisX)}</text>`;
    return `<svg viewBox="0 0 ${W} ${H}" width="${W}" style="max-width:100%;height:auto;background:#fff;border-radius:8px">${s}</svg>`;
  }
  /* l4data：{fig(o)→html, intro?{zh,en}, steps:[{zh,en?,expr,hl?}]} */
  window.StepKinds.l4data = ({ fig, intro, steps }) => [{ zh: intro ? intro.zh : '先看清楚表（图）里每一项的数，再看问题问的是什么。', en: intro ? intro.en : 'Read the data first.', render: s => { s.innerHTML = wrap(`<div class="center">${fig({})}</div>`); } }].concat(steps.map((st, i) => ({ zh: st.zh, en: st.en || st.expr || '', render: s => { s.innerHTML = wrap(`<div class="center">${fig({ hl: st.hl })}</div>`, ...steps.slice(0, i + 1).filter(x => x.expr).map((x, j, arr) => line(j === arr.length - 1 ? `<b>${x.expr}</b>` : x.expr))); } })));
  window.L4GR = { table, tally, linegraph };
})();
