/* 长度/质量/容量：尺子、天平等图形 + 讲解 */
(function () {
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const COLORS = ['#6c5ce7', '#ff9f43', '#2ecc71', '#4a90e2', '#e84393', '#00b894'];
  const line = t => `<div class="expand-line">${t}</div>`;

  /* 尺子 + 物品条：items = [{label, from, to}]，max 刻度；opts.hl 高亮某项，opts.unit 'cm' */
  function ruler(items, opts = {}) {
    const max = opts.max || 15, unit = opts.unit || 'cm';
    const W = 620, x0 = 40, x1 = 600, scale = (x1 - x0) / max;
    const rowH = 34, top = 16;
    const H = top + items.length * rowH + 60;
    let s = '';
    items.forEach((it, i) => {
      const y = top + i * rowH, xa = x0 + it.from * scale, xb = x0 + it.to * scale;
      const c = COLORS[i % COLORS.length], hl = opts.hl === i;
      s += `<line x1="${xa}" y1="${y}" x2="${xa}" y2="${H - 40}" stroke="${c}" stroke-dasharray="4 3" stroke-width="1"/>`;
      s += `<line x1="${xb}" y1="${y}" x2="${xb}" y2="${H - 40}" stroke="${c}" stroke-dasharray="4 3" stroke-width="1"/>`;
      s += `<rect x="${xa}" y="${y + 4}" width="${xb - xa}" height="${rowH - 10}" rx="8" fill="${c}" fill-opacity="${hl ? .55 : .28}" stroke="${c}" stroke-width="${hl ? 3 : 1.5}"/>`;
      s += `<text x="${(xa + xb) / 2}" y="${y + rowH / 2 + 3}" text-anchor="middle" font-size="15" font-weight="700" fill="#2b2b3a">${esc(it.label)}${hl ? ` = ${it.to - it.from} ${unit}` : ''}</text>`;
    });
    // 尺
    const ry = H - 40;
    s += `<rect x="${x0 - 10}" y="${ry}" width="${x1 - x0 + 20}" height="34" fill="#fffbe6" stroke="#bbb"/>`;
    for (let i = 0; i <= max; i++) {
      const x = x0 + i * scale;
      s += `<line x1="${x}" y1="${ry}" x2="${x}" y2="${ry + 12}" stroke="#333" stroke-width="1.5"/><text x="${x}" y="${ry + 28}" text-anchor="middle" font-size="12" fill="#333">${i}</text>`;
      if (i < max) for (let k = 1; k < 10; k += 1) { const xx = x + k * scale / 10; s += `<line x1="${xx}" y1="${ry}" x2="${xx}" y2="${ry + (k === 5 ? 8 : 4)}" stroke="#666" stroke-width=".7"/>`; }
    }
    s += `<text x="${x0 - 8}" y="${ry + 28}" text-anchor="end" font-size="11" fill="#666">${unit}</text>`;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" style="max-width:100%;height:auto">${s}</svg>`;
  }

  /* 横条比较（已知长度）：items = [{label, v}]，unit；opts.vertical 竖条（高度） */
  function bars(items, opts = {}) {
    const unit = opts.unit || 'm', max = Math.max(...items.map(i => i.v));
    if (opts.vertical) {
      const W = 120 * items.length + 40, H = 240, base = 200;
      let s = '';
      items.forEach((it, i) => { const x = 40 + i * 120, h = 160 * it.v / max, c = COLORS[i % COLORS.length];
        s += `<rect x="${x}" y="${base - h}" width="70" height="${h}" rx="6" fill="${c}" fill-opacity=".3" stroke="${c}" stroke-width="2"/><text x="${x + 35}" y="${base - h - 8}" text-anchor="middle" font-size="16" font-weight="700" fill="${c}">${opts.showV === false ? '' : it.v + ' ' + unit}</text><text x="${x + 35}" y="${base + 22}" text-anchor="middle" font-size="16" font-weight="700" fill="#2b2b3a">${esc(it.label)}</text>`; });
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" style="max-width:100%;height:auto">${s}</svg>`;
    }
    const W = 560, H = 44 * items.length + 10, x0 = 110;
    let s = '';
    items.forEach((it, i) => { const y = 6 + i * 44, w = 420 * it.v / max, c = COLORS[i % COLORS.length];
      s += `<text x="${x0 - 10}" y="${y + 24}" text-anchor="end" font-size="16" font-weight="700" fill="#2b2b3a">${esc(it.label)}</text><rect x="${x0}" y="${y + 4}" width="${w}" height="30" rx="6" fill="${c}" fill-opacity=".3" stroke="${c}" stroke-width="2"/><text x="${x0 + w / 2}" y="${y + 24}" text-anchor="middle" font-size="15" font-weight="700" fill="#2b2b3a">${opts.showV === false ? '' : it.v + ' ' + unit}</text>`; });
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" style="max-width:100%;height:auto">${s}</svg>`;
  }

  /* 米尺旁边的物品（比 1 m 长/短） */
  function metreStick(label, emoji, frac) {
    const W = 460, H = 120, x0 = 30, len = 400;
    const objW = len * frac;
    let s = `<text x="${x0 + objW / 2}" y="28" text-anchor="middle" font-size="16" font-weight="700" fill="#2b2b3a">${esc(label)}</text>`;
    s += `<rect x="${x0}" y="36" width="${objW}" height="28" rx="8" fill="#ff9f43" fill-opacity=".35" stroke="#ff9f43" stroke-width="2"/><text x="${x0 + objW / 2}" y="56" text-anchor="middle" font-size="18">${emoji}</text>`;
    s += `<rect x="${x0}" y="78" width="${len}" height="22" fill="#fffbe6" stroke="#333"/>`;
    for (let i = 0; i <= 10; i++) { const x = x0 + i * len / 10; s += `<line x1="${x}" y1="78" x2="${x}" y2="${i % 5 === 0 ? 92 : 86}" stroke="#333"/>`; }
    s += `<text x="${x0}" y="116" font-size="12" fill="#333">0</text><text x="${x0 + len}" y="116" text-anchor="end" font-size="12" fill="#333">1 m</text>`;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" style="max-width:100%;height:auto">${s}</svg>`;
  }

  /* ---------- 讲解 ---------- */
  // 读尺子：一个物品 from→to
  window.StepKinds.readruler = ({ items, idx, unit }) => {
    const it = items[idx], len = it.to - it.from;
    const u = unit || 'cm';
    if (it.from === 0) return [
      { zh: `看 ${it.label}：左边对齐尺子的 <b>0</b>。`, en: `${it.label} starts at 0.`, render: s => { s.innerHTML = ruler(items, { hl: idx, unit: u, max: Math.max(15, ...items.map(i => i.to)) }); } },
      { zh: `右边对着刻度 <b>${it.to}</b>，所以长 <b>${len} ${u}</b>。`, en: `It ends at ${it.to}, so it is ${len} ${u} long.`, render: s => { s.innerHTML = ruler(items, { hl: idx, unit: u, max: Math.max(15, ...items.map(i => i.to)) }) + line(`${it.label} = ${len} ${u}`); } },
    ];
    return [
      { zh: `看 ${it.label}：左边<b>不是</b>从 0 开始，是从 <b>${it.from}</b> 开始，右边到 <b>${it.to}</b>。`, en: `${it.label} starts at ${it.from} and ends at ${it.to}.`, render: s => { s.innerHTML = ruler(items, { hl: idx, unit: u, max: Math.max(15, ...items.map(i => i.to)) }); } },
      { zh: `长度 = 右边刻度 − 左边刻度 = ${it.to} − ${it.from} = <b>${len} ${u}</b>。`, en: `Length = ${it.to} − ${it.from} = ${len} ${u}.`, render: s => { s.innerHTML = ruler(items, { hl: idx, unit: u, max: Math.max(15, ...items.map(i => i.to)) }) + line(`${it.to} − ${it.from} = ${len} ${u}`); } },
    ];
  };
  // 比较两个长度差
  window.StepKinds.lendiff = ({ items, a, b, unit, vertical }) => {
    const u = unit || 'cm', A = items[a], B = items[b];
    const big = A.v >= B.v ? A : B, small = A.v >= B.v ? B : A;
    return [
      { zh: `${A.label} 是 ${A.v} ${u}，${B.label} 是 ${B.v} ${u}。`, en: `${A.label} is ${A.v} ${u}. ${B.label} is ${B.v} ${u}.`, render: s => { s.innerHTML = bars(items, { unit: u, vertical }); } },
      { zh: `${big.label} 长，${small.label} 短。相差多少用减法：${big.v} − ${small.v} = <b>${big.v - small.v} ${u}</b>。`, en: `${big.v} − ${small.v} = ${big.v - small.v} ${u}.`, render: s => { s.innerHTML = bars(items, { unit: u, vertical }) + line(`${big.v} − ${small.v} = ${big.v - small.v} ${u}`); } },
    ];
  };
  // 排序
  window.StepKinds.lenorder = ({ items, unit, vertical, desc }) => {
    const u = unit || 'cm';
    const sorted = items.slice().sort((x, y) => desc ? y.v - x.v : x.v - y.v);
    return [
      { zh: `看每一个的长度：${items.map(i => `${i.label} ${i.v} ${u}`).join('，')}。`, en: items.map(i => `${i.label} ${i.v} ${u}`).join(', '), render: s => { s.innerHTML = bars(items, { unit: u, vertical }); } },
      { zh: `最${desc ? '长' : '短'}的是 <b>${sorted[0].label}</b>，最${desc ? '短' : '长'}的是 <b>${sorted[sorted.length - 1].label}</b>。`, en: `${desc ? 'Longest' : 'Shortest'}: ${sorted[0].label}. ${desc ? 'Shortest' : 'Longest'}: ${sorted[sorted.length - 1].label}.`, render: s => { s.innerHTML = bars(sorted, { unit: u, vertical }); } },
      { zh: `从${desc ? '长到短' : '短到长'}排：<b>${sorted.map(i => i.label).join(', ')}</b>`, en: sorted.map(i => i.label).join(', '), render: s => { s.innerHTML = bars(sorted, { unit: u, vertical }) + line(sorted.map(i => i.label).join(', ')); } },
    ];
  };
  // 比 1 m 长还是短
  window.StepKinds.metre = ({ label, emoji, frac, dim }) => [
    { zh: `把${label}和 1 米的尺子放在一起比。`, en: `Compare ${label} with the 1 m rule.`, render: s => { s.innerHTML = metreStick(label, emoji, frac); } },
    { zh: `${label}的${dim || '长度'}${frac > 1 ? '超过了尺子的 1 m 那头，比 1 m <b>长（more）</b>' : '没到尺子的 1 m 那头，比 1 m <b>短（less）</b>'}。`, en: `It is ${frac > 1 ? 'more' : 'less'} than 1 m.`, render: s => { s.innerHTML = metreStick(label, emoji, frac) + line(`${frac > 1 ? 'more' : 'less'} than 1 m`); } },
  ];

  window.MeasureUI = { ruler, bars, metreStick };
})();
