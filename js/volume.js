/* 容量（Unit 17）：容器与水位 SVG、杯子计数、读刻度、讲解动画 */
(function () {
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '"': '&quot;', '>': '&gt;' }[c]));
  const line = t => `<div class="expand-line">${t}</div>`;
  const WATER = '#7fb8ff', WATER2 = '#4a90e2', INK = '#2b2b3a';
  let uid = 0;

  /* vessel(o): { w, h, level(0-1), shape:'cup'|'jar'|'bottle'|'basin'|'cube'|'trough'|'bucket'|'can'|'flask'|'jug'|'mug', marks:{max, step, labelEvery}, label, sub, hl, handle, color, inner } */
  function vessel(o = {}) {
    const w = o.w || 60, h = o.h || 70, ml = o.marks ? 36 : 6, neck = ['jar', 'bottle', 'flask', 'can'].includes(o.shape) ? 22 : (o.shape === 'cube' || o.shape === 'trough' ? 18 : 0);
    const id = 'v' + (uid++);
    const x0 = ml, y0 = neck + 6, x1 = x0 + w, y1 = y0 + h, W = x1 + (o.handle ? 26 : 10), H = y1 + (o.label ? 24 : 0) + (o.sub ? 20 : 0) + 8;
    const t = o.shape === 'basin' ? 0.16 : (o.shape === 'cup' || o.shape === 'bucket' || o.shape === 'mug' ? 0.08 : 0);
    const body = `M${x0} ${y0} L${x1} ${y0} L${x1 - w * t} ${y1} L${x0 + w * t} ${y1} Z`;
    let extra = '';
    if (o.shape === 'jar' || o.shape === 'bottle' || o.shape === 'flask' || o.shape === 'can') {
      const nw = o.shape === 'jar' ? w * 0.6 : w * 0.34, nx = o.shape === 'can' ? x1 - nw - 4 : x0 + (w - nw) / 2;
      extra += `<path d="M${nx} ${y0} L${nx} ${y0 - neck + 4} L${nx + nw} ${y0 - neck + 4} L${nx + nw} ${y0}" fill="#fff" stroke="${INK}" stroke-width="2"/>`;
    }
    if (o.shape === 'cube' || o.shape === 'trough') {
      const d = 16; extra += `<path d="M${x0} ${y0} L${x0 + d} ${y0 - d} L${x1 + d} ${y0 - d} L${x1} ${y0} Z" fill="#f4f4f8" stroke="${INK}" stroke-width="2"/><path d="M${x1} ${y0} L${x1 + d} ${y0 - d} L${x1 + d} ${y1 - d} L${x1} ${y1} Z" fill="#e3e3ea" stroke="${INK}" stroke-width="2"/>`;
    }
    if (o.handle) extra += `<path d="M${x1} ${y0 + h * 0.2} q22 0 22 ${h * 0.25} q0 ${h * 0.25} -22 ${h * 0.25}" fill="none" stroke="${INK}" stroke-width="3"/>`;
    const lv = Math.max(0, Math.min(1, o.level || 0)), wy = y1 - h * lv;
    const water = lv > 0 ? `<rect x="${x0 - 2}" y="${wy}" width="${w + 4}" height="${h * lv + 2}" fill="${o.color || WATER}" clip-path="url(#${id})"/><line x1="${x0}" y1="${wy}" x2="${x1}" y2="${wy}" stroke="${WATER2}" stroke-width="2" stroke-dasharray="${o.marks ? '4 3' : '0'}" clip-path="url(#${id})"/>` : '';
    let marks = '';
    if (o.marks) {
      const { max, step = 1, labelEvery = 1 } = o.marks, top = y0 + h * 0.12, bottom = y1 - h * 0.06;
      for (let v = step; v <= max + 1e-9; v += step) { const y = bottom - (bottom - top) * (v / max); const big = Math.abs(v / labelEvery - Math.round(v / labelEvery)) < 1e-9; marks += `<line x1="${x0 + 3}" y1="${y}" x2="${x0 + (big ? 16 : 9)}" y2="${y}" stroke="${INK}" stroke-width="${big ? 2 : 1.2}"/>${big ? `<text x="${x0 - 3}" y="${y + 4}" font-size="12" font-weight="700" text-anchor="end" fill="${INK}">${v}${o.marks.unit === false ? '' : ' l'}</text>` : ''}`; }
      marks += `<line x1="${x0 + 3}" y1="${top}" x2="${x0 + 3}" y2="${bottom}" stroke="${INK}" stroke-width="1.5"/>`;
    }
    const inner = o.inner ? `<text x="${(x0 + x1) / 2}" y="${y0 + h * 0.42}" font-size="13" font-weight="800" text-anchor="middle" fill="${INK}">${esc(o.inner)}</text>` : '';
    const label = o.label ? `<text x="${(x0 + x1) / 2}" y="${y1 + 18}" font-size="15" font-weight="800" text-anchor="middle" fill="${INK}">${esc(o.label)}</text>` : '';
    const sub = o.sub ? `<text x="${(x0 + x1) / 2}" y="${y1 + (o.label ? 36 : 18)}" font-size="13" font-weight="700" text-anchor="middle" fill="#7a7a8c">${esc(o.sub)}</text>` : '';
    return `<span class="vessel ${o.hl ? 'hl' : ''} ${o.cls || ''}"><svg viewBox="0 0 ${W} ${H}" width="${W * (o.scale || 1.5)}" height="${H * (o.scale || 1.5)}"><defs><clipPath id="${id}"><path d="${body}"/></clipPath></defs>${extra}${water}<path d="${body}" fill="none" stroke="${INK}" stroke-width="2.4"/>${marks}${inner}${label}${sub}</svg></span>`;
  }
  /* 水位在刻度上的位置：让 level 与 marks 一致 */
  const levelFor = (value, max) => 0.06 + 0.82 * (value / max);
  /* 一排杯子/瓶子，每个标 v l；o.hl = 索引集合 */
  function cups(vals, o = {}) {
    const hl = new Set(o.hl || []);
    return `<span class="cups">${vals.map((v, i) => `<span class="cup ${hl.has(i) ? 'hl' : ''} ${o.dim && !hl.has(i) ? 'dim' : ''}"><svg viewBox="0 0 34 44" width="38" height="50"><path d="M4 4 L30 4 L27 40 L7 40 Z" fill="${WATER}" stroke="${INK}" stroke-width="2"/><text x="17" y="27" font-size="13" font-weight="800" text-anchor="middle" fill="${INK}">${v}${o.unit === false ? '' : ' l'}</text></svg></span>`).join('')}${o.count !== undefined ? `<b class="cups-cnt">${o.count}</b>` : ''}</span>`;
  }
  const bottleRow = (n, o = {}) => `<span class="cups">${Array.from({ length: n }, (_, i) => `<span class="cup ${o.dim ? 'dim' : ''}"><svg viewBox="0 0 22 44" width="22" height="44"><path d="M8 3 L14 3 L14 12 L19 18 L19 40 L3 40 L3 18 L8 12 Z" fill="${WATER}" stroke="${INK}" stroke-width="2"/></svg></span>`).join('')}${o.count !== undefined ? `<b class="cups-cnt">× ${o.count}</b>` : ''}</span>`;
  const row = (items, o = {}) => `<div class="fig-row vol-row ${o.cls || ''}">${items.join('')}</div>`;
  const arrow = '<span class="vol-arrow">⇨</span>';
  const V = v => `${v} l`;

  const S = window.StepKinds;
  /* volcmp：比较两个容器 {items:[vesselOpts+label], a, b, rel:'more'|'less'|'same'} */
  S.volcmp = ({ items, a, b, rel }) => {
    const draw = hl => row(items.map(it => vessel(Object.assign({}, it, { hl: hl && hl.includes(it.label) }))));
    const relZh = rel === 'more' ? '多' : rel === 'less' ? '少' : '一样多', relEn = rel === 'same' ? 'the same amount of' : rel;
    const why = rel === 'same' ? '两个容器里水的高度和宽度差不多，水一样多。' : rel === 'more' ? `${a} 里的水比 ${b} 多（更宽或更高）。` : `${a} 里的水比 ${b} 少（更窄或更矮）。`;
    return [
      { zh: `看每个容器里有多少水（蓝色部分）。比较 <b>${a}</b> 和 <b>${b}</b>。`, en: `Look at the water in ${a} and ${b}.`, render: s => { s.innerHTML = draw([a, b]); } },
      { zh: `${why}`, en: `${a} has ${relEn} water ${rel === 'same' ? 'as' : 'than'} ${b}.`, render: s => { s.innerHTML = draw([a, b]) + line(`${a}：${relZh}`); } },
      { zh: `所以：${a} contains <b>${relEn}</b> water ${rel === 'same' ? 'as' : 'than'} ${b}。`, en: `${a} contains ${relEn} water ${rel === 'same' ? 'as' : 'than'} ${b}.`, render: s => { s.innerHTML = draw([a, b]) + line(`${a} … <b>${relEn}</b> … ${b}`); } },
    ];
  };
  /* volmost：哪个最多/最少 {items, which, ans, order?} */
  S.volmost = ({ items, which, ans }) => {
    const draw = hl => row(items.map(it => vessel(Object.assign({}, it, { hl: hl && hl.includes(it.label) }))));
    return [
      { zh: `要找水<b>${which === 'most' ? '最多' : '最少'}</b>的容器。看每个容器里蓝色的水有多少，不光看高度，也要看容器有多宽。`, en: `Find the container with the ${which} water. Look at height and width.`, render: s => { s.innerHTML = draw([]); } },
      { zh: `一个个比：水${which === 'most' ? '最多' : '最少'}的是 <b>${ans}</b>。`, en: `Container ${ans} has the ${which} water.`, render: s => { s.innerHTML = draw([ans]) + line(`${which}: ${ans}`); } },
    ];
  };
  /* volcups：容器 = 几杯 {items:[{label, n, per}], mode:'most'|'least'|'diff'|'same'|'lessthan'|'morethan', a, b} */
  S.volcups = ({ items, mode, a, b }) => {
    const tot = it => it.n * (it.per || 1);
    const draw = (hl, count) => `<div class="vol-list">${items.map(it => `<div class="vol-item ${hl && hl.includes(it.label) ? 'hl' : ''}"><span class="vol-name">${esc(it.label)}</span>${arrow}${it.per ? cups(Array(it.n).fill(it.per), { count: count ? tot(it) + ' l' : undefined }) : bottleRow(it.n, { count: count ? it.n : undefined })}</div>`).join('')}</div>`;
    const A = items.find(i => i.label === a), B = items.find(i => i.label === b);
    const steps = [
      { zh: `数一数每个容器能装几${items[0].per ? '杯' : '瓶'}：${items.map(it => `${it.label} ${it.n}`).join('，')}。`, en: items.map(it => `${it.label}: ${it.n}`).join(', '), render: s => { s.innerHTML = draw([], true); } },
    ];
    if (mode === 'most' || mode === 'least') { const win = items.slice().sort((x, y) => mode === 'most' ? tot(y) - tot(x) : tot(x) - tot(y))[0]; steps.push({ zh: `${mode === 'most' ? '杯数最多' : '杯数最少'}的装水最${mode === 'most' ? '多' : '少'}：<b>${win.label}</b>。`, en: `The ${win.label} holds the ${mode} water.`, render: s => { s.innerHTML = draw([win.label], true) + line(`${mode}: ${win.label}`); } }); }
    else if (mode === 'diff') steps.push({ zh: `${a} 是 ${A.n}，${b} 是 ${B.n}，相差：<b>${Math.max(A.n, B.n)} − ${Math.min(A.n, B.n)} = ${Math.abs(A.n - B.n)}</b>。`, en: `${Math.max(A.n, B.n)} − ${Math.min(A.n, B.n)} = ${Math.abs(A.n - B.n)}.`, render: s => { s.innerHTML = draw([a, b], true) + line(`${Math.max(A.n, B.n)} − ${Math.min(A.n, B.n)} = ${Math.abs(A.n - B.n)}`); } });
    else if (mode === 'same') steps.push({ zh: `找瓶数一样的：<b>${a}</b> 和 <b>${b}</b> 都是 ${A.n} 瓶，水一样多。`, en: `${a} and ${b} both have ${A.n} bottles: the same amount.`, render: s => { s.innerHTML = draw([a, b], true) + line(`${a} = ${b}`); } });
    else steps.push({ zh: `${mode === 'lessthan' ? '比' : '比'} ${b} ${mode === 'lessthan' ? '少' : '多'}的：${b} 是 ${B.n} 瓶，<b>${a}</b> 是 ${A.n} 瓶，${A.n} ${mode === 'lessthan' ? '<' : '>'} ${B.n}。`, en: `${a} has ${mode === 'lessthan' ? 'less' : 'more'} water than ${b}.`, render: s => { s.innerHTML = draw([a, b], true) + line(`${A.n} ${mode === 'lessthan' ? '<' : '>'} ${B.n}`); } });
    return steps;
  };
  /* volmark：比 1 l 多还是少 {v: vesselOpts, ref, cmp:'more'|'less'} */
  S.volmark = ({ v, ref = 1, cmp }) => [
    { zh: `找到容器上 <b>${ref} l</b> 的刻度线，再看水面（蓝色虚线）在哪里。`, en: `Find the ${ref} l mark. Where is the water line?`, render: s => { s.innerHTML = row([vessel(v)]); } },
    { zh: cmp === 'more' ? `水面在 ${ref} l 刻度线的<b>上面</b>，所以水比 ${ref} l <b>多</b>：more than ${ref} l。` : `水面在 ${ref} l 刻度线的<b>下面</b>，所以水比 ${ref} l <b>少</b>：less than ${ref} l。`, en: `The water is ${cmp === 'more' ? 'above' : 'below'} the ${ref} l mark: ${cmp} than ${ref} l.`, render: s => { s.innerHTML = row([vessel(Object.assign({}, v, { hl: true }))]) + line(`${cmp} than ${ref} l`); } },
  ];
  /* volread：读刻度 {v, value} */
  S.volread = ({ v, value }) => {
    const m = v.marks;
    return [
      { zh: `看刻度：最上面标着 <b>${m.max} l</b>${m.labelEvery > 1 ? `，每个大格是 ${m.labelEvery} l，小格是 ${m.step} l` : `，每一格是 ${m.step} l`}。`, en: `The scale goes up to ${m.max} l. Each mark is ${m.step} l.`, render: s => { s.innerHTML = row([vessel(v)]); } },
      { zh: `从下往上数到水面（蓝色虚线）：${m.labelEvery > 1 && value % m.labelEvery !== 0 ? `先到 ${Math.floor(value / m.labelEvery) * m.labelEvery} l，再数 ${(value % m.labelEvery) / m.step} 小格` : `数 ${value / m.step} 格`}，是 <b>${value} l</b>。`, en: `Count up to the water line: ${value} l.`, render: s => { s.innerHTML = row([vessel(Object.assign({}, v, { hl: true }))]) + line(`${value} l of water`); } },
    ];
  };
  /* voladd：几杯加起来 {vals:[2,2,2,2], who, thing, emoji} */
  S.voladd = ({ vals, sentence, emoji }) => {
    const sum = vals.reduce((a, b) => a + b, 0), same = vals.every(v => v === vals[0]);
    const draw = (hl, count) => row([`<span class="vol-emoji">${emoji || '🪣'}</span>`, arrow, cups(vals, { hl, count })]);
    return [
      { zh: `容器里的水倒成了 <b>${vals.length}</b> 杯，每杯上写着几升。`, en: `The water fills ${vals.length} cups.`, render: s => { s.innerHTML = draw([]); } },
      { zh: `把每杯的升数加起来：<b>${vals.join(' + ')} = ${sum}</b>${same && vals.length > 2 ? `，也可以用乘法 ${vals.length} × ${vals[0]} = ${sum}` : ''}。`, en: `${vals.join(' + ')} = ${sum}.`, render: s => { s.innerHTML = draw(vals.map((_, i) => i), sum + ' l') + line(`${vals.join(' + ')} = ${sum} l`); } },
      { zh: `答：${esc(sentence).replace('___', `<b>${sum}</b>`)}`, en: sentence.replace('___', String(sum)), render: s => { s.innerHTML = draw([], sum + ' l') + line(esc(sentence).replace('___', `<b>${sum}</b>`)); } },
    ];
  };
  /* volpaint：三桶颜料 {items:[{label, v, color, h}], mode:'diff'|'same'|'order', a, b} */
  S.volpaint = ({ items, mode, a, b }) => {
    const draw = hl => row(items.map(it => vessel({ w: 44, h: it.h, level: 1, color: it.color, inner: it.label, sub: V(it.v), hl: hl && hl.includes(it.label), cls: 'paint' })));
    const A = items.find(i => i.label === a), B = items.find(i => i.label === b);
    if (mode === 'diff') return [
      { zh: `${a} 是 ${A.v} l，${b} 是 ${B.v} l。`, en: `${a}: ${A.v} l, ${b}: ${B.v} l.`, render: s => { s.innerHTML = draw([a, b]); } },
      { zh: `相差多少用减法：<b>${Math.max(A.v, B.v)} − ${Math.min(A.v, B.v)} = ${Math.abs(A.v - B.v)}</b> l。`, en: `${Math.max(A.v, B.v)} − ${Math.min(A.v, B.v)} = ${Math.abs(A.v - B.v)} l.`, render: s => { s.innerHTML = draw([a, b]) + line(`${Math.max(A.v, B.v)} − ${Math.min(A.v, B.v)} = ${Math.abs(A.v - B.v)} l`); } },
    ];
    if (mode === 'same') { const others = items.filter(i => i.label !== a); return [
      { zh: `哪一桶和另外两桶加起来一样多？先把小的两桶加起来：${others.map(o => `${o.label} ${o.v}`).join(' + ')} = <b>${others.reduce((s, o) => s + o.v, 0)}</b> l。`, en: `${others.map(o => o.v).join(' + ')} = ${others.reduce((s, o) => s + o.v, 0)} l.`, render: s => { s.innerHTML = draw(others.map(o => o.label)) + line(`${others.map(o => o.v).join(' + ')} = ${others.reduce((s, o) => s + o.v, 0)} l`); } },
      { zh: `正好等于 <b>${a}</b>（${A.v} l）。所以 ${a} 和 ${others.map(o => o.label).join(' + ')} 一样多。`, en: `That equals ${a} (${A.v} l).`, render: s => { s.innerHTML = draw([a]) + line(`${A.v} = ${others.map(o => o.v).join(' + ')}`); } },
    ]; }
    const sorted = items.slice().sort((x, y) => x.v - y.v);
    return [
      { zh: `按升数从小到大排：先找最少的 <b>${sorted[0].label}</b>（${sorted[0].v} l）。`, en: `Least first: ${sorted[0].label}.`, render: s => { s.innerHTML = draw([sorted[0].label]); } },
      { zh: `然后是 <b>${sorted[1].label}</b>（${sorted[1].v} l），最多的是 <b>${sorted[2].label}</b>（${sorted[2].v} l）。`, en: `${sorted.map(i => i.label).join(', ')}.`, render: s => { s.innerHTML = draw(sorted.map(i => i.label)) + line(sorted.map(i => `${i.label} ${i.v} l`).join(' → ')); } },
    ];
  };
  /* volbasins：几个盆各倒成几杯 {items:[{label, vals}], mode:'sum'|'between'|'order', a} */
  S.volbasins = ({ items, mode, a }) => {
    const tot = it => it.vals.reduce((s, v) => s + v, 0);
    const draw = (hl, count) => `<div class="vol-list">${items.map(it => `<div class="vol-item ${hl && hl.includes(it.label) ? 'hl' : ''}">${vessel({ w: 70, h: 30, shape: 'basin', level: 0.5, label: it.label, scale: 0.9 })}${arrow}${cups(it.vals, { count: count ? tot(it) + ' l' : undefined })}</div>`).join('')}</div>`;
    if (mode === 'sum') { const it = items.find(i => i.label === a); return [
      { zh: `Basin ${a} 倒成了 ${it.vals.length} 杯：${it.vals.map(V).join('、')}。`, en: `Basin ${a}: ${it.vals.map(V).join(', ')}.`, render: s => { s.innerHTML = draw([a]); } },
      { zh: `加起来：<b>${it.vals.join(' + ')} = ${tot(it)}</b> l。`, en: `${it.vals.join(' + ')} = ${tot(it)} l.`, render: s => { s.innerHTML = draw([a], true) + line(`${it.vals.join(' + ')} = ${tot(it)} l`); } },
    ]; }
    const sorted = items.slice().sort((x, y) => tot(y) - tot(x));
    if (mode === 'between') return [
      { zh: `先算每个盆有几升：${items.map(it => `${it.label} ${tot(it)} l`).join('，')}。`, en: items.map(it => `${it.label} ${tot(it)} l`).join(', '), render: s => { s.innerHTML = draw([], true); } },
      { zh: `比一个多、又比另一个少的，是中间那个：<b>${sorted[1].label}</b>（${tot(sorted[1])} l）。它比 <b>${sorted[2].label}</b>（${tot(sorted[2])} l）多，比 <b>${sorted[0].label}</b>（${tot(sorted[0])} l）少。`, en: `Basin ${sorted[1].label} has more than ${sorted[2].label} but less than ${sorted[0].label}.`, render: s => { s.innerHTML = draw([sorted[1].label], true) + line(`${sorted[2].label} < <b>${sorted[1].label}</b> < ${sorted[0].label}`); } },
    ];
    return [
      { zh: `先算每个盆有几升：${items.map(it => `${it.label} ${tot(it)} l`).join('，')}。`, en: items.map(it => `${it.label} ${tot(it)} l`).join(', '), render: s => { s.innerHTML = draw([], true); } },
      { zh: `从多到少排：<b>${sorted.map(i => i.label).join('，')}</b>（${sorted.map(i => tot(i) + ' l').join(' > ')}）。`, en: `Greatest to smallest: ${sorted.map(i => i.label).join(', ')}.`, render: s => { s.innerHTML = draw(sorted.map(i => i.label), true) + line(sorted.map(i => `${i.label} ${tot(i)} l`).join(' → ')); } },
    ];
  };

  window.VolUI = { vessel, cups, bottleRow, row, arrow, levelFor };
})();
