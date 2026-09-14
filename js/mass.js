/* 质量：天平、秤、两步应用题讲解 */
(function () {
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const line = t => `<div class="expand-line">${t}</div>`;

  /* 天平：left/right = {label, emoji}；tilt: 'left'(左重) | 'right' | 'level' */
  function balance(left, right, tilt, opts = {}) {
    const W = 360, H = 170;
    const ang = tilt === 'left' ? 12 : tilt === 'right' ? -12 : 0;
    const cx = 180, cy = 110, arm = 130;
    const rad = ang * Math.PI / 180;
    const lx = cx - arm * Math.cos(rad), ly = cy + arm * Math.sin(rad);
    const rx = cx + arm * Math.cos(rad), ry = cy - arm * Math.sin(rad);
    const pan = (x, y, it, hl) => `<line x1="${x - 30}" y1="${y}" x2="${x + 30}" y2="${y}" stroke="#555" stroke-width="3"/><line x1="${x}" y1="${y}" x2="${x}" y2="${y - 6}" stroke="#555" stroke-width="2"/>
      <text x="${x}" y="${y - 12}" text-anchor="middle" font-size="34" ${hl ? 'filter="drop-shadow(0 0 5px #ff9f43)"' : ''}>${it.emoji || ''}</text>
      <text x="${x}" y="${y + 22}" text-anchor="middle" font-size="14" font-weight="700" fill="${hl ? '#ff9f43' : '#2b2b3a'}">${esc(it.label)}</text>`;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" style="max-width:100%;height:auto">
      <rect x="${cx - 40}" y="${cy + 40}" width="80" height="8" rx="3" fill="#888"/><path d="M${cx - 14} ${cy + 40} L${cx} ${cy - 10} L${cx + 14} ${cy + 40} Z" fill="#aaa"/>
      <line x1="${lx}" y1="${ly}" x2="${rx}" y2="${ry}" stroke="#444" stroke-width="5" stroke-linecap="round"/>
      <circle cx="${cx}" cy="${cy}" r="6" fill="#444"/>
      ${pan(lx, ly, left, opts.hl === 'left')}${pan(rx, ry, right, opts.hl === 'right')}</svg>`;
  }

  /* 指针秤：max 刻度，value 当前值，unit；ticks 主刻度间隔 */
  function dial(value, opts = {}) {
    const max = opts.max || 10, unit = opts.unit || 'kg', step = opts.step || 1, minor = opts.minor || 0.5;
    const start = opts.start || 0;
    const W = 240, H = 200, cx = 120, cy = 110, r = 80;
    // 半圆刻度：从左(180°)到右(0°)，用 200° 范围
    const a0 = 200, a1 = -20;
    const angOf = v => (a0 + (a1 - a0) * (v - start) / (max - start)) * Math.PI / 180;
    let s = `<path d="M${cx - r - 14} ${cy} A${r + 14} ${r + 14} 0 1 1 ${cx + r + 14} ${cy}" fill="#fffbe6" stroke="#333" stroke-width="2"/><rect x="${cx - r - 14}" y="${cy}" width="${2 * r + 28}" height="50" fill="#fffbe6" stroke="#333" stroke-width="2"/>`;
    for (let v = start; v <= max + 1e-9; v += minor) {
      const a = angOf(v), major = Math.abs((v - start) / step - Math.round((v - start) / step)) < 1e-9;
      const r1 = r, r2 = major ? r - 12 : r - 6;
      s += `<line x1="${cx + r1 * Math.cos(a)}" y1="${cy - r1 * Math.sin(a)}" x2="${cx + r2 * Math.cos(a)}" y2="${cy - r2 * Math.sin(a)}" stroke="#333" stroke-width="${major ? 2 : 1}"/>`;
      if (major) s += `<text x="${cx + (r - 24) * Math.cos(a)}" y="${cy - (r - 24) * Math.sin(a) + 5}" text-anchor="middle" font-size="13" font-weight="700" fill="#333">${v}</text>`;
    }
    const a = angOf(value);
    s += `<line x1="${cx}" y1="${cy}" x2="${cx + (r - 4) * Math.cos(a)}" y2="${cy - (r - 4) * Math.sin(a)}" stroke="#e84393" stroke-width="3" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="5" fill="#e84393"/>`;
    s += `<text x="${cx}" y="${cy + 30}" text-anchor="middle" font-size="14" font-weight="700" fill="#666">${unit}</text>`;
    if (opts.item) s += `<text x="${cx}" y="${cy + 46}" text-anchor="middle" font-size="16" font-weight="700" fill="#2b2b3a">${esc(opts.item)}</text>`;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" style="max-width:100%;height:auto">${s}</svg>`;
  }
  /* 电子秤 */
  function digital(value, unit, item) {
    return `<div class="digital"><div class="digital-item">${esc(item || '')}</div><div class="digital-screen">${value} ${unit}</div></div>`;
  }
  /* 多个秤并排 */
  function row(html) { return `<div class="scale-row">${html.join('')}</div>`; }

  /* ---------- 讲解 ---------- */
  window.StepKinds.balance = ({ left, right, tilt }) => {
    const heavy = tilt === 'left' ? left : right, lite = tilt === 'left' ? right : left;
    if (tilt === 'level') return [
      { zh: `看天平：两边一样高，平平的。`, en: 'The balance is level.', render: s => { s.innerHTML = balance(left, right, tilt); } },
      { zh: `说明 ${left.label} 和 ${right.label} <b>一样重</b>（as heavy as）。`, en: `${left.label} is as heavy as ${right.label}.`, render: s => { s.innerHTML = balance(left, right, tilt) + line(`${left.label} is as heavy as ${right.label}`); } },
    ];
    return [
      { zh: `看天平：哪边低，哪边就重。`, en: 'The lower side is heavier.', render: s => { s.innerHTML = balance(left, right, tilt); } },
      { zh: `${heavy.label} 那边低，所以 ${heavy.label} <b>重</b>（heavier）。`, en: `${heavy.label} is lower, so it is heavier.`, render: s => { s.innerHTML = balance(left, right, tilt, { hl: tilt }) + line(`${heavy.label} is heavier than ${lite.label}`); } },
      { zh: `${lite.label} 那边高，所以 ${lite.label} <b>轻</b>（lighter）。`, en: `${lite.label} is higher, so it is lighter.`, render: s => { s.innerHTML = balance(left, right, tilt, { hl: tilt === 'left' ? 'right' : 'left' }) + line(`${lite.label} is lighter than ${heavy.label}`); } },
    ];
  };
  // 两个天平推三者顺序：pairs = [[A,B,tilt],[C,D,tilt]]，order 从重到轻
  window.StepKinds.balance2 = ({ pairs, order }) => {
    const html = pairs.map(p => balance(p[0], p[1], p[2])).join('');
    const steps = [{ zh: '两个天平，先一个一个看。', en: 'Look at each balance.', render: s => { s.innerHTML = `<div class="scale-row">${html}</div>`; } }];
    pairs.forEach((p, i) => { const heavy = p[2] === 'left' ? p[0] : p[1], lite = p[2] === 'left' ? p[1] : p[0];
      steps.push({ zh: `第 ${i + 1} 个天平：${heavy.label} 低，${heavy.label} 比 ${lite.label} 重。`, en: `${heavy.label} is heavier than ${lite.label}.`, render: s => { s.innerHTML = `<div class="scale-row">${pairs.map((q, j) => balance(q[0], q[1], q[2], j === i ? { hl: q[2] } : {})).join('')}</div>` + line(`${heavy.label} > ${lite.label}`); } }); });
    steps.push({ zh: `合起来：<b>${order.join(' > ')}</b>。最重的是 ${order[0]}，最轻的是 ${order[order.length - 1]}。`, en: `${order.join(' > ')}`, render: s => { s.innerHTML = `<div class="scale-row">${html}</div>` + line(order.join(' > ')); } });
    return steps;
  };
  window.StepKinds.readdial = ({ value, max, unit, step, minor, start, item }) => [
    { zh: `看秤：指针指着哪个刻度？`, en: 'Where does the pointer point?', render: s => { s.innerHTML = dial(value, { max, unit, step, minor, start, item }); } },
    { zh: `指针指着 <b>${value}</b>，所以是 ${value} ${unit}。${Number.isInteger(value) ? '' : '在两个数中间的小格也要数。'}`, en: `The pointer is at ${value}, so ${value} ${unit}.`, render: s => { s.innerHTML = dial(value, { max, unit, step, minor, start, item }) + line(`${value} ${unit}`); } },
  ];
  window.StepKinds.kgcompare = ({ item, tilt }) => {
    const left = { label: item, emoji: '📦' }, right = { label: '1 kg', emoji: '⚖️' };
    const word = tilt === 'left' ? 'more than' : tilt === 'right' ? 'less than' : 'as heavy as';
    return [
      { zh: `一边放 ${item}，一边放 1 kg 的砝码。`, en: `${item} on one side, 1 kg on the other.`, render: s => { s.innerHTML = balance(left, right, tilt); } },
      { zh: tilt === 'level' ? `一样高，${item} 和 1 kg <b>一样重</b>（as heavy as 1 kg）。` : tilt === 'left' ? `${item} 那边低，${item} <b>比 1 kg 重</b>（more than 1 kg）。` : `${item} 那边高，${item} <b>比 1 kg 轻</b>（less than 1 kg）。`, en: `${item} is ${word} 1 kg.`, render: s => { s.innerHTML = balance(left, right, tilt, { hl: tilt === 'level' ? null : 'left' }) + line(`${word} 1 kg`); } },
    ];
  };
  window.StepKinds.gramcubes = ({ item, n }) => [
    { zh: `天平平了：${item} 和 ${n} 个 1 g 的小方块一样重。`, en: `${item} balances ${n} one-gram cubes.`, render: s => { s.innerHTML = balance({ label: item, emoji: '📦' }, { label: `${n} × 1 g`, emoji: '🧊' }, 'level'); } },
    { zh: `每个方块 1 g，${n} 个就是 <b>${n} g</b>。所以 ${item} 大约 ${n} g。`, en: `${n} cubes = ${n} g.`, render: s => { s.innerHTML = balance({ label: item, emoji: '📦' }, { label: `${n} × 1 g`, emoji: '🧊' }, 'level') + line(`${n} g`); } },
  ];

  // 两步应用题：steps = [q1, q2]（每个都是 word 题的 model），第二步可用第一步的答案（用 'ANS1'）
  window.StepKinds.word2 = q => {
    const resolve = (m, ans1) => JSON.parse(JSON.stringify(m), (k, v) => v === 'ANS1' ? ans1 : v);
    const s1 = window.StepKinds.word(Object.assign({}, q, { en: q.en, zh: q.zh, model: q.steps[0].model, sentence: q.steps[0].sentence }));
    const ans1 = window.WordUI.answerOf({ model: q.steps[0].model });
    const m2 = resolve(q.steps[1].model, ans1);
    const s2 = window.StepKinds.word(Object.assign({}, q, { en: q.steps[1].en || q.en, zh: q.steps[1].zh || q.zh, model: m2, sentence: q.steps[1].sentence }));
    s1[0] = { zh: `这道题要分<b>两步</b>算。先看第一步：${q.steps[0].ask.zh}`, en: `Two steps. Step 1: ${q.steps[0].ask.en}`, render: s1[0].render };
    s2[0] = { zh: `第二步：${q.steps[1].ask.zh}（要用到第一步的答案 ${ans1}）`, en: `Step 2: ${q.steps[1].ask.en}`, render: s2[0].render };
    return s1.concat(s2);
  };

  window.MassUI = { balance, dial, digital, row };
})();
