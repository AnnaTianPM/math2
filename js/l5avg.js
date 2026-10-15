/* Level 5 · Unit 11  平均数：求总数、求平均、由平均求总数 讲解动画 */
(function () {
  const line = t => `<div class="expand-line">${t}</div>`;
  const wrap = (...parts) => `<div class="l1wrap">${parts.join('')}</div>`;
  const S = window.StepKinds;
  const clean = x => parseFloat(Number(x).toPrecision(12));
  const fmt = n => { const s = String(n); const [ip, fp] = s.split('.'); const g = ip.length > 4 ? ip.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : ip; return fp !== undefined ? `${g}.${fp}` : g; };
  const sum = vals => clean(vals.reduce((a, b) => a + b, 0));
  const show = (v, unit, pre) => `${pre || ''}${pre === '$' ? Number(v).toFixed(2).replace(/\.00$/, '') : fmt(v)}${unit ? ' ' + unit : ''}`;
  /* 条形示意：每个数一根柱子，平均线一条 */
  function bars(vals, avg, o = {}) {
    const max = Math.max(...vals, avg || 0) * 1.15, W = 260, H = 120, n = vals.length, bw = Math.min(40, (W - 10) / n - 8);
    let h = '';
    vals.forEach((v, i) => { const x = 10 + i * ((W - 10) / n) + ((W - 10) / n - bw) / 2, bh = v / max * (H - 20); h += `<rect x="${x}" y="${H - bh}" width="${bw}" height="${bh}" fill="${o.hl ? '#ffd6a8' : '#c7bff0'}" stroke="#4b3fc4" stroke-width="1.2"/><text x="${x + bw / 2}" y="${H - bh - 4}" text-anchor="middle" font-size="9" font-weight="700" fill="#333">${fmt(v)}</text>`; });
    if (avg !== undefined) { const y = H - avg / max * (H - 20); h += `<line x1="4" y1="${y}" x2="${W}" y2="${y}" stroke="#ff7f2a" stroke-width="2" stroke-dasharray="5 3"/><text x="${W}" y="${y - 3}" text-anchor="end" font-size="9" font-weight="700" fill="#ff7f2a">average ${fmt(avg)}</text>`; }
    return `<span class="fig"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W + 4} ${H + 2}" width="${W + 4}" height="${H + 2}">${h}</svg></span>`;
  }
  /* l5avg：{vals, unit, pre} 求平均 */
  S.l5avg = ({ vals, unit = '', pre = '' }) => { const t = sum(vals), n = vals.length, avg = clean(t / n); return [
    { zh: `平均数（average）= <b>总数 ÷ 个数</b>。先把 ${n} 个数<b>加起来</b>：${vals.map(v => show(v, '', pre)).join(' + ')} = <b>${show(t, unit, pre)}</b>。`, en: `Total: ${vals.map(v => show(v, '', pre)).join(' + ')} = ${show(t, unit, pre)}.`, render: s => { s.innerHTML = wrap(bars(vals), line(`${vals.map(v => fmt(v)).join(' + ')} = ${fmt(t)}`)); } },
    { zh: `再<b>除以个数</b> ${n}：${show(t, '', pre)} ÷ ${n} = <b>${show(avg, unit, pre)}</b>。平均数就是把总数平均分成 ${n} 份，每份这么多。`, en: `${show(t, '', pre)} ÷ ${n} = ${show(avg, unit, pre)}.`, render: s => { s.innerHTML = wrap(bars(vals, avg), line(`${fmt(t)} ÷ ${n} = ${fmt(avg)}`)); } },
  ]; };
  /* l5avgtotal：{avg, n} 由平均求总数 */
  S.l5avgtotal = ({ avg, n }) => { const t = clean(avg * n); return [
    { zh: `平均数 = 总数 ÷ 个数，反过来：<b>总数 = 平均数 × 个数</b>。`, en: 'Total = average × number of items.', render: s => { s.innerHTML = wrap(line('总数 = 平均数 × 个数'), line('Total = Average × Number')); } },
    { zh: `${fmt(avg)} × ${n} = <b>${fmt(t)}</b>。`, en: `${fmt(avg)} × ${n} = ${fmt(t)}.`, render: s => { s.innerHTML = wrap(bars(Array(n).fill(avg), avg, { hl: true }), line(`${fmt(avg)} × ${n} = ${fmt(t)}`)); } },
  ]; };
  window.L5AVG = { bars, sum, clean, fmt };
})();
