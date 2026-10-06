/* Level 3 · Unit 10 长度质量体积：单位换算、圆盘秤、量杯 讲解动画 + 题型 l3pour */
(function () {
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '"': '&quot;', '>': '&gt;' }[c]));
  const line = t => `<div class="expand-line">${t}</div>`;
  const wrap = (...parts) => `<div class="l1wrap">${parts.join('')}</div>`;
  const $ = (sel, el) => (el || document).querySelector(sel);
  const S = window.StepKinds;

  /* 圆盘秤：value 克，max 千克；每 100 g 一小格 */
  function cdial(value, max, o = {}) {
    const W = 220, cx = 110, cy = 110, R = 92;
    const ang = g => (g / (max * 1000)) * 2 * Math.PI - Math.PI / 2;
    const pt = (g, r) => [cx + r * Math.cos(ang(g)), cy + r * Math.sin(ang(g))];
    let s = `<circle cx="${cx}" cy="${cy}" r="${R + 8}" fill="#fff" stroke="#333" stroke-width="2"/>`;
    for (let g = 0; g < max * 1000; g += 100) { const major = g % 1000 === 0, half = g % 500 === 0; const [x1, y1] = pt(g, R), [x2, y2] = pt(g, R - (major ? 14 : half ? 10 : 6)); s += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${o.hl !== undefined && g > o.hl - 1000 && g <= o.hl && g % 1000 ? '#ff9f43' : '#333'}" stroke-width="${major ? 2 : 1}"/>`; }
    for (let k = 0; k <= max; k++) { const g = k === max ? 0 : k * 1000; const [x, y] = pt(k * 1000, R - 28); if (k === 0) { s += `<text x="${cx}" y="${cy - R + 24}" text-anchor="middle" font-size="12" fill="#333">0</text><text x="${cx}" y="${cy - R + 40}" text-anchor="middle" font-size="12" font-weight="700" fill="${o.hlKg === max ? '#ff9f43' : '#333'}">${max} kg</text>`; } else if (k < max) s += `<text x="${x}" y="${y + 4}" text-anchor="middle" font-size="12" font-weight="700" fill="${o.hlKg === k ? '#ff9f43' : '#333'}">${k} kg</text>`; }
    if (value !== null && value !== undefined) { const [x, y] = pt(value, R - 18); s += `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="#333" stroke-width="2.5"/><polygon points="${x},${y} ${x - 6 * Math.cos(ang(value) - 0.5)},${y - 6 * Math.sin(ang(value) - 0.5)} ${x - 6 * Math.cos(ang(value) + 0.5)},${y - 6 * Math.sin(ang(value) + 0.5)}" fill="#333"/><circle cx="${cx}" cy="${cy}" r="4" fill="#333"/>`; }
    return `<svg viewBox="0 0 ${W} ${W}" width="${o.w || 200}" height="${o.w || 200}">${s}</svg>`;
  }
  const stepOf = max => max >= 1000 ? 100 : max >= 500 ? 50 : 10;
  /* 量杯：max ml, step 小格 ml, level ml；labels 大刻度 */
  function beaker(o) {
    const max = o.max, step = o.step || stepOf(max), label = o.labels || (max === 1000 ? { 500: '500 ml', 1000: '1 l' } : max === 100 ? { 50: '50', 100: '100 ml' } : Object.fromEntries([100, 200, 300, 400, 500].map(v => [v, v === 500 ? '500 ml' : String(v)])));
    const W = 150, H = 170, x0 = 30, x1 = 110, yb = 150, yt = 30, hgt = yb - yt;
    const Y = ml => yb - (ml / max) * hgt;
    let s = `<path d="M${x0 - 10} ${yt - 8} q10 0 10 10 L${x0} ${yb - 8} q0 8 8 8 L${x1 - 8} ${yb} q8 0 8 -8 L${x1} ${yt + 2} q0 -10 10 -10" fill="none" stroke="#333" stroke-width="2"/>`;
    if (o.level) s = `<rect x="${x0}" y="${Y(o.level)}" width="${x1 - x0}" height="${yb - Y(o.level)}" fill="#bfc3cc" opacity=".8" rx="4"/>` + s;
    for (let ml = step; ml <= max; ml += step) { const y = Y(ml), major = label[ml] !== undefined; s += `<line x1="${x1 - 30}" y1="${y}" x2="${x1 - 30 + (major ? 10 : 5)}" y2="${y}" stroke="#333" stroke-width="${major ? 1.5 : 1}" class="${o.live ? 'tick' : ''}" data-ml="${ml}"/>`; if (major) s += `<text x="${x1 - 16}" y="${y + 4}" font-size="11" fill="#333">${label[ml]}</text>`; }
    s += `<line x1="${x1 - 30}" y1="${Y(step)}" x2="${x1 - 30}" y2="${Y(max)}" stroke="#333" stroke-width="1.5"/>`;
    if (o.live) for (let ml = step; ml <= max; ml += step) s += `<rect class="pourhit" data-ml="${ml}" x="${x0}" y="${Y(ml) - (Y(0) - Y(step)) / 2}" width="${x1 - x0}" height="${Y(0) - Y(step)}" fill="transparent" style="cursor:pointer"/>`;
    return `<svg class="beaker" viewBox="0 0 ${W} ${H}" width="${o.w || 150}" height="${(o.w || 150) * H / W}">${s}</svg>`;
  }
  const beakers = arr => `<div class="center beakers">${arr.map(b => beaker(b)).join('')}</div>`;
  window.L3.cdial = cdial; window.L3.beaker = beaker; window.L3.beakers = beakers;

  /* l3conv：big small 单位换算 {big:'m'|'km'|'kg'|'l', small, factor, bv, sv, dir:'toSmall'|'toBig'} */
  S.l3conv = ({ big, small, factor, bv, sv, dir }) => {
    const total = bv * factor + sv, ZH = { m: '米', km: '千米', kg: '千克', l: '升', cm: '厘米', g: '克', ml: '毫升' };
    const bigs = `${bv} ${big}${sv ? ` ${sv} ${small}` : ''}`;
    if (dir === 'toSmall') return [
      { zh: `1 ${big} = <b>${factor} ${small}</b>。${bv} ${big} = ${bv} × ${factor} = <b>${bv * factor} ${small}</b>。`, en: `1 ${big} = ${factor} ${small}. ${bv} ${big} = ${bv * factor} ${small}.`, render: s => { s.innerHTML = wrap(line(`1 ${big} = ${factor} ${small}`), line(`${bv} ${big} = ${bv * factor} ${small}`)); } },
      { zh: `再加上 ${sv} ${small}：${bv * factor} + ${sv} = <b>${total} ${small}</b>。`, en: `${bv * factor} + ${sv} = ${total} ${small}.`, render: s => { s.innerHTML = wrap(line(`${bigs} = ${bv * factor} ${small} + ${sv} ${small}`), line(`= ${total} ${small}`)); } },
    ];
    return [
      { zh: `1 ${big} = ${factor} ${small}。${total} ${small} 里有几个 ${factor}？<b>${bv}</b> 个${bv > 1 ? '' : ''}，所以是 ${bv} ${big}。`, en: `${total} ${small} has ${bv} × ${factor}.`, render: s => { s.innerHTML = wrap(line(`1 ${big} = ${factor} ${small}`), line(`${total} ${small} = ${bv * factor} ${small} + ${sv} ${small}`)); } },
      { zh: `${bv * factor} ${small} = ${bv} ${big}，剩下 ${sv} ${small}。所以 ${total} ${small} = <b>${bigs}</b>。`, en: `${total} ${small} = ${bigs}.`, render: s => { s.innerHTML = wrap(line(`${total} ${small} = ${bv} ${big} ${sv} ${small}`)); } },
    ];
  };
  /* l3dial：读圆盘秤 {g, max} */
  S.l3dial = ({ g, max }) => { const kg = Math.floor(g / 1000), rest = g % 1000, ticks = rest / 100; return [
    { zh: `这个秤最大 <b>${max} kg</b>，一圈分成 ${max} 大格，每大格 1 kg。两个 kg 之间有 10 小格，每小格 <b>100 g</b>。`, en: `Each small mark is 100 g.`, render: s => { s.innerHTML = wrap(`<div class="center">${cdial(g, max)}</div>`); } },
    { zh: `指针过了 <b>${kg} kg</b>${kg === 0 ? '（还没到 1 kg）' : ''}。`, en: `The pointer is past ${kg} kg.`, render: s => { s.innerHTML = wrap(`<div class="center">${cdial(g, max, { hlKg: kg || max })}</div>`, line(`${kg} kg`)); } },
    { zh: `从 ${kg} kg 再数小格：<b>${ticks}</b> 小格 = ${ticks} × 100 = <b>${rest} g</b>。`, en: `${ticks} small marks = ${rest} g.`, render: s => { s.innerHTML = wrap(`<div class="center">${cdial(g, max, { hl: g })}</div>`, line(`${ticks} × 100 g = ${rest} g`)); } },
    { zh: `所以是 <b>${kg} kg ${rest} g</b>。`, en: `${kg} kg ${rest} g.`, render: s => { s.innerHTML = wrap(`<div class="center">${cdial(g, max)}</div>`, line(`${kg} kg ${rest} g`)); } },
  ]; };
  /* l3readbeaker：读一个或几个量杯 {bs:[{max, step, level}]} */
  S.l3readbeaker = ({ bs }) => {
    const total = bs.reduce((s, b) => s + b.level, 0);
    const steps = [{ zh: `先看每个量杯的刻度：${bs.map(b => `最大 ${b.max >= 1000 ? b.max / 1000 + ' l' : b.max + ' ml'}，每小格 ${b.step || stepOf(b.max)} ml`).filter((v, i, a) => a.indexOf(v) === i).join('；')}。`, en: 'Read the scale of each beaker.', render: s => { s.innerHTML = wrap(beakers(bs)); } }];
    bs.forEach((b, i) => steps.push({ zh: `第 ${i + 1} 杯：水面在 <b>${b.level >= 1000 ? (b.level / 1000) + ' l' + (b.level % 1000 ? ' ' + b.level % 1000 + ' ml' : '') : b.level + ' ml'}</b>。`, en: `Beaker ${i + 1}: ${b.level} ml.`, render: s => { s.innerHTML = wrap(beakers(bs.map((x, j) => Object.assign({}, x, { w: j === i ? 170 : 130 }))), line(`${b.level} ml`)); } }));
    if (bs.length > 1) steps.push({ zh: `加起来：${bs.map(b => b.level + ' ml').join(' + ')} = <b>${total} ml</b>${total >= 1000 ? ` = ${Math.floor(total / 1000)} l ${total % 1000} ml` : ''}。`, en: `Total ${total} ml.`, render: s => { s.innerHTML = wrap(line(`${bs.map(b => b.level + ' ml').join(' + ')} = ${total} ml`), total >= 1000 ? line(`= ${Math.floor(total / 1000)} l ${total % 1000} ml`) : ''); } });
    return steps;
  };
  /* l3drawbeaker：画水位 {max, ml} */
  S.l3drawbeaker = ({ max, ml }) => { const step = stepOf(max), n = ml / step; return [
    { zh: `量杯最大 ${max >= 1000 ? max / 1000 + ' l' : max + ' ml'}，每小格 <b>${step} ml</b>。要画 ${ml} ml。`, en: `Each small mark is ${step} ml.`, render: s => { s.innerHTML = wrap(beakers([{ max, level: 0 }])); } },
    { zh: `${ml} ÷ ${step} = <b>${n}</b>，从底往上数 ${n} 小格，画到那条线。`, en: `Count ${n} marks from the bottom.`, render: s => { s.innerHTML = wrap(beakers([{ max, level: ml }]), line(`${ml} ml = ${n} 格`)); } },
  ]; };
  /* l3map：地图距离 {from, to, m} */
  S.l3map = ({ from, to, m }) => [
    { zh: `在地图上找 ${from} 到 ${to} 的那条线，上面写着 <b>${m} m</b>。`, en: `${from} to ${to}: ${m} m.`, render: s => { s.innerHTML = wrap(line(`${from} → ${to}: ${m} m`)); } },
    { zh: `1 km = 1000 m。${m} m = <b>${Math.floor(m / 1000)} km ${m % 1000} m</b>。`, en: `${m} m = ${Math.floor(m / 1000)} km ${m % 1000} m.`, render: s => { s.innerHTML = wrap(line(`${m} m = ${Math.floor(m / 1000)} km ${m % 1000} m`)); } },
  ];

  /* 题型 l3pour：点量杯刻度画水位 q = { id, type:'l3pour', max, ml } */
  window.QTypes.l3pour = q => {
    let cur = 0;
    const draw = (box, lvl) => { const host = $('#bk', box); host.innerHTML = beaker({ max: q.max, level: lvl, live: true, w: 190 }); host.querySelectorAll('.pourhit').forEach(r => r.onclick = () => { if (box.dataset.locked) return; cur = +r.dataset.ml; draw(box, cur); }); };
    return {
      prompt: { zh: `点量杯上的刻度，把水位画到 ${q.ml} ml`, en: `Draw the correct level of liquid: ${q.ml} ml` }, stage: '',
      custom: {
        html: () => `<div class="center"><div id="bk"></div><div class="sub">👆 点刻度线，水会装到那里　已选：<b id="pv">0</b> ml</div><div class="center mt"><button class="btn ok" id="submit">检查 ✔</button></div></div>`,
        bind: (box, submit) => { delete box.dataset.locked; cur = 0; draw(box, 0); const obs = () => { $('#pv', box).textContent = cur; }; box.addEventListener('click', obs); $('#submit', box).onclick = () => submit(); },
        value: () => cur ? String(cur) : null,
        markWrong: (box, val) => { draw(box, +val); $('#bk', box).classList.add('badf'); },
        showAnswer: box => { cur = q.ml; draw(box, q.ml); $('#pv', box).textContent = q.ml; box.dataset.locked = '1'; $('#submit', box).disabled = true; },
        lock: box => { box.dataset.locked = '1'; $('#submit', box).disabled = true; },
        restore: (box, val, status) => { cur = +val || 0; draw(box, cur); $('#pv', box).textContent = cur; box.dataset.locked = '1'; $('#submit', box).disabled = true; if (status === 'bad') $('#bk', box).classList.add('badf'); },
      },
      hint: { zh: `每小格 ${stepOf(q.max)} ml，${q.ml} ÷ ${stepOf(q.max)} = ${q.ml / stepOf(q.max)} 格。`, en: `Count ${q.ml / stepOf(q.max)} marks.` },
      answerText: `${q.ml} ml`, check: v => +v === q.ml, explainKind: 'l3drawbeaker', n: { max: q.max, ml: q.ml },
    };
  };
})();
