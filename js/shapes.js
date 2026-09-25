/* 图形：平面/立体图形 SVG 绘制、讲解动画、三种题型（gridq 网格标注、pickone 选图、gridcopy 点格画图） */
(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const line = t => `<div class="expand-line">${t}</div>`;
  const FILL = { white: '#ffffff', grey: '#9a9aa8', dark: '#3c3c4a', purple: '#6c5ce7', orange: '#ff9f43' };

  /* ---------- 平面图形 ----------
   * shape2d(kind, opts) kind: square rectangle triangle circle semicircle quarter | opts: size(0..1), fill, rot(0/90/180/270), hl
   * 画在 100x100 的 viewBox 里；size 控制缩放 */
  const SHAPE_NAMES = { square: ['正方形', 'square'], rectangle: ['长方形', 'rectangle'], triangle: ['三角形', 'triangle'], circle: ['圆形', 'circle'], semicircle: ['半圆', 'semicircle'], quarter: ['四分之一圆', 'quarter circle'] };
  function path2d(kind, variant) {
    switch (kind) {
      case 'square': return 'M15 15 H85 V85 H15 Z';
      case 'rectangle': return variant === 'tall' ? 'M30 8 H70 V92 H30 Z' : 'M5 30 H95 V70 H5 Z';
      case 'triangle': return variant === 'right' ? 'M15 85 H85 L15 15 Z' : variant === 'down' ? 'M12 20 H88 L50 88 Z' : 'M50 12 L88 85 H12 Z';
      case 'circle': return 'M50 12 A38 38 0 1 1 49.99 12 Z';
      case 'semicircle': return 'M10 68 A40 40 0 0 1 90 68 Z';            // 平边在下，弧在上
      case 'quarter': return 'M15 85 V15 A70 70 0 0 1 85 85 Z';            // 直角在左下
      case 'diamond': return 'M50 10 L90 50 L50 90 L10 50 Z';
    }
    return '';
  }
  function shape2d(kind, opts = {}) {
    const size = opts.size || 1, fill = FILL[opts.fill || 'white'] || opts.fill || '#fff';
    const rot = opts.rot || 0, w = opts.w || 90;
    const stroke = opts.hl ? '#ff9f43' : '#2b2b3a';
    return `<svg class="shp ${opts.hl ? 'hl' : ''}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="${w}" height="${w}"><g transform="rotate(${rot} 50 50) translate(${50 - 50 * size} ${50 - 50 * size}) scale(${size})"><path d="${path2d(kind, opts.variant)}" fill="${fill}" stroke="${stroke}" stroke-width="${opts.hl ? 5 : 3}" stroke-linejoin="round"/></g></svg>`;
  }

  /* ---------- 立体图形 ----------
   * solid3d(kind, opts) kind: cube cuboid cone cylinder sphere | opts: size, fill, variant(cuboid: tall/flat/wide; cone: up/down/left/right; cylinder: up/lying) */
  const SOLID_NAMES = { cube: ['正方体', 'cube'], cuboid: ['长方体', 'cuboid'], cone: ['圆锥', 'cone'], cylinder: ['圆柱', 'cylinder'], sphere: ['球', 'sphere'] };
  function shade(fill) { const c = FILL[fill || 'white'] || '#fff'; return { c, side: fill === 'white' || !fill ? '#e6e6ee' : fill === 'grey' ? '#7a7a8a' : '#23232e', top: fill === 'white' || !fill ? '#f6f6fa' : fill === 'grey' ? '#b4b4c0' : '#55556a' }; }
  function solid3d(kind, opts = {}) {
    const size = opts.size || 1, s = shade(opts.fill), w = opts.w || 90, v = opts.variant || '';
    const st = `stroke="#2b2b3a" stroke-width="2.5" stroke-linejoin="round"`;
    let body = '';
    if (kind === 'cube') body = `<path d="M22 32 L52 20 L82 32 L52 44 Z" fill="${s.top}" ${st}/><path d="M22 32 L52 44 V84 L22 72 Z" fill="${s.c}" ${st}/><path d="M52 44 L82 32 V72 L52 84 Z" fill="${s.side}" ${st}/>`;
    else if (kind === 'cuboid') {
      if (v === 'tall') body = `<path d="M30 20 L50 12 L70 20 L50 28 Z" fill="${s.top}" ${st}/><path d="M30 20 L50 28 V88 L30 80 Z" fill="${s.c}" ${st}/><path d="M50 28 L70 20 V80 L50 88 Z" fill="${s.side}" ${st}/>`;
      else if (v === 'flat') body = `<path d="M10 52 L50 36 L90 52 L50 68 Z" fill="${s.top}" ${st}/><path d="M10 52 L50 68 V80 L10 64 Z" fill="${s.c}" ${st}/><path d="M50 68 L90 52 V64 L50 80 Z" fill="${s.side}" ${st}/>`;
      else body = `<path d="M8 40 L36 28 L92 28 L64 40 Z" fill="${s.top}" ${st}/><path d="M8 40 H64 V72 H8 Z" fill="${s.c}" ${st}/><path d="M64 40 L92 28 V60 L64 72 Z" fill="${s.side}" ${st}/>`;
    } else if (kind === 'cone') {
      const rot = { up: 0, right: 90, down: 180, left: 270 }[v || 'up'] || 0;
      body = `<g transform="rotate(${rot} 50 50)"><path d="M50 10 L18 76 A32 10 0 0 0 82 76 Z" fill="${s.c}" ${st}/><path d="M18 76 A32 10 0 0 0 82 76 A32 10 0 0 0 18 76 Z" fill="${s.side}" ${st}/></g>`;
    } else if (kind === 'cylinder') {
      if (v === 'lying') body = `<path d="M18 30 H78 V70 H18 Z" fill="${s.c}" ${st}/><path d="M18 30 A10 20 0 0 0 18 70 A10 20 0 0 0 18 30" fill="${s.c}" stroke="#2b2b3a" stroke-width="2.5" stroke-dasharray="4 3"/><ellipse cx="78" cy="50" rx="10" ry="20" fill="${s.side}" ${st}/>`;
      else body = `<path d="M28 22 V78 A22 8 0 0 0 72 78 V22 Z" fill="${s.c}" ${st}/><ellipse cx="50" cy="22" rx="22" ry="8" fill="${s.top}" ${st}/>`;
    } else if (kind === 'sphere') {
      const id = 'g' + Math.random().toString(36).slice(2, 7);
      body = `<defs><radialGradient id="${id}" cx="35%" cy="35%" r="65%"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="${opts.fill === 'dark' ? '#2b2b3a' : opts.fill === 'grey' ? '#8a8a98' : '#c8c8d4'}"/></radialGradient></defs><circle cx="50" cy="50" r="38" fill="url(#${id})" ${st}/>`;
    }
    return `<svg class="shp ${opts.hl ? 'hl' : ''}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="${w}" height="${w}"><g transform="translate(${50 - 50 * size} ${50 - 50 * size}) scale(${size})">${body}</g></svg>`;
  }

  // 统一：token → svg。token = { k:'square'|..., size, fill, rot, variant, solid:bool }
  const tok = (t, extra = {}) => (t.solid || SOLID_NAMES[t.k]) ? solid3d(t.k, Object.assign({}, t, extra)) : shape2d(t.k, Object.assign({}, t, extra));
  const tokName = t => (SOLID_NAMES[t.k] || SHAPE_NAMES[t.k] || [t.k, t.k]);
  const img = (src, w) => `<img class="figimg" src="img/${src}.png" alt="" ${w ? `style="max-width:${w}px"` : ''}>`;

  /* ---------- 讲解 ---------- */
  const DESC2D = {
    square: { zh: '4 条一样长的直边，4 个方方正正的角。', en: '4 equal straight sides, 4 square corners.' },
    rectangle: { zh: '4 条直边，对着的两条边一样长；4 个方方正正的角。', en: '4 straight sides, opposite sides equal, 4 square corners.' },
    triangle: { zh: '3 条直边，3 个角。', en: '3 straight sides, 3 corners.' },
    circle: { zh: '一条弯弯的曲线绕一圈，没有角。', en: 'One curved line all the way round, no corners.' },
    semicircle: { zh: '把圆切成两半，一半就是半圆：一条直边 + 一条弧。', en: 'Half a circle: one straight side and one curve.' },
    quarter: { zh: '把圆切成四份，一份就是四分之一圆：两条直边 + 一条弧。', en: 'A quarter of a circle: two straight sides and one curve.' },
  };
  window.StepKinds.shape2d = ({ kind }) => {
    const [zh, en] = SHAPE_NAMES[kind], d = DESC2D[kind];
    const big = o => shape2d(kind, Object.assign({ w: 180 }, o));
    return [
      { zh: `这是一个<b>${zh}</b>（${en}）。`, en: `This is a ${en}.`, render: s => { s.innerHTML = `<div class="center">${big({})}</div>`; } },
      { zh: d.zh, en: d.en, render: s => { s.innerHTML = `<div class="center">${big({ hl: true })}</div>`; } },
      { zh: `不管转个方向、变大变小，它还是<b>${zh}</b>。`, en: `Turned or resized, it is still a ${en}.`, render: s => { s.innerHTML = `<div class="center row" style="justify-content:center">${big({ w: 110 })}${big({ w: 110, rot: 45 })}${big({ w: 110, size: .6 })}</div>`; } },
    ];
  };
  window.StepKinds.shapesall = () => {
    const kinds = Object.keys(SHAPE_NAMES);
    const all = hl => `<div class="shape-row">${kinds.map(k => `<div class="shape-cell ${hl === k ? 'on' : ''}">${shape2d(k, { w: 80 })}<div class="shape-name">${SHAPE_NAMES[k][0]}<br><span class="en">${SHAPE_NAMES[k][1]}</span></div></div>`).join('')}</div>`;
    return [{ zh: '这一单元要认识 6 种平面图形。', en: 'Six flat shapes to know.', render: s => { s.innerHTML = all(null); } }]
      .concat(kinds.map(k => ({ zh: `<b>${SHAPE_NAMES[k][0]}</b>（${SHAPE_NAMES[k][1]}）：${DESC2D[k].zh}`, en: `${SHAPE_NAMES[k][1]}: ${DESC2D[k].en}`, render: s => { s.innerHTML = all(k); } })));
  };
  window.StepKinds.linecurve = () => {
    const ex = (k, o) => shape2d(k, Object.assign({ w: 110 }, o));
    return [
      { zh: '图形的边有两种：<b>直线</b>（straight line）像尺子画的，<b>曲线</b>（curve）是弯弯的。', en: 'Edges are straight lines or curves.', render: s => { s.innerHTML = `<div class="center row" style="justify-content:center;gap:30px"><div>${ex('square', {})}<div class="sub">只有直线 A</div></div><div>${ex('circle', {})}<div class="sub">只有曲线 B</div></div><div>${ex('semicircle', {})}<div class="sub">直线 + 曲线 C</div></div></div>`; } },
      { zh: '<b>A</b>：只有直线。比如正方形、三角形、五角星、箭头。', en: 'A: straight lines only.', render: s => { s.innerHTML = `<div class="center row" style="justify-content:center">${ex('square', { hl: true })}${ex('triangle', { hl: true })}${ex('diamond', { hl: true })}</div>`; } },
      { zh: '<b>B</b>：只有曲线。比如圆、爱心、月牙。', en: 'B: curves only.', render: s => { s.innerHTML = `<div class="center row" style="justify-content:center">${ex('circle', { hl: true })}<span style="font-size:80px">♥</span></div>`; } },
      { zh: '<b>C</b>：既有直线又有曲线。比如半圆、四分之一圆。', en: 'C: both straight lines and curves.', render: s => { s.innerHTML = `<div class="center row" style="justify-content:center">${ex('semicircle', { hl: true })}${ex('quarter', { hl: true })}</div>`; } },
      { zh: '看每个图形的边，用手指沿着边走一遍：有没有弯的地方？有没有直的地方？', en: 'Trace the edge with your finger: any straight parts? any curves?', render: s => { s.innerHTML = `<div class="center">${ex('semicircle', { w: 160, hl: true })}</div>`; } },
    ];
  };
  window.StepKinds.combine = ({ pic, parts }) => {
    const names = parts.map(p => SHAPE_NAMES[p] ? SHAPE_NAMES[p] : SOLID_NAMES[p]);
    const draw = p => SHAPE_NAMES[p] ? shape2d(p, { w: 90, hl: true }) : solid3d(p, { w: 90, hl: true });
    return [
      { zh: '这个图形是两个图形<b>拼</b>起来的。先看整体。', en: 'This figure is made of two shapes.', render: s => { s.innerHTML = `<div class="center">${img(pic, 220)}</div>`; } },
      { zh: `找一找：哪一部分是<b>${names[0][0]}</b>（${names[0][1]}）？`, en: `Find the ${names[0][1]}.`, render: s => { s.innerHTML = `<div class="center row" style="justify-content:center;gap:30px">${img(pic, 220)}${draw(parts[0])}</div>`; } },
      { zh: `另一部分是<b>${names[1][0]}</b>（${names[1][1]}）。`, en: `The other part is a ${names[1][1]}.`, render: s => { s.innerHTML = `<div class="center row" style="justify-content:center;gap:30px">${img(pic, 220)}${draw(parts[1])}</div>`; } },
      { zh: `所以它由 <b>${names[0][0]}</b> 和 <b>${names[1][0]}</b> 组成（${names[0][1]} and ${names[1][1]}）。`, en: `${names[0][1]} and ${names[1][1]}.`, render: s => { s.innerHTML = `<div class="center row" style="justify-content:center;gap:16px">${draw(parts[0])}<b style="font-size:40px">+</b>${draw(parts[1])}<b style="font-size:40px">=</b>${img(pic, 160)}</div>`; } },
    ];
  };
  window.StepKinds.countshapes = ({ pic, counts }) => {
    const order = ['square', 'rectangle', 'circle', 'semicircle', 'quarter', 'triangle'];
    const table = hl => `<table class="money-table">${order.map(k => `<tr><td class="${hl === k ? 'hl' : ''}">${shape2d(k, { w: 34 })} ${SHAPE_NAMES[k][0]}</td><td class="${hl === k ? 'hl' : ''}">${hl === null || order.indexOf(hl) >= order.indexOf(k) ? counts[k] : ''}</td></tr>`).join('')}</table>`;
    return [{ zh: '一种图形一种图形地数，数过的在心里打个勾，别数重复。', en: 'Count one kind of shape at a time.', render: s => { s.innerHTML = `<div class="center row" style="justify-content:center;gap:20px">${img(pic, 300)}${table('none')}</div>`; } }]
      .concat(order.map(k => ({ zh: `数<b>${SHAPE_NAMES[k][0]}</b>：一共 <b>${counts[k]}</b> 个。`, en: `${SHAPE_NAMES[k][1]}s: ${counts[k]}.`, render: s => { s.innerHTML = `<div class="center row" style="justify-content:center;gap:20px">${img(pic, 300)}${table(k)}</div>`; } })));
  };
  const DESC3D = {
    cube: { zh: '6 个面都是一样大的正方形，像骰子、魔方。', en: '6 square faces, all the same, like a dice.' },
    cuboid: { zh: '6 个面都是平的，有长方形，像盒子、砖块。', en: '6 flat faces with rectangles, like a box or a brick.' },
    cone: { zh: '一个尖尖的顶，一个圆圆的平底，侧面是弯的，像冰淇淋筒、生日帽。', en: 'A point on top, a round flat base, curved side, like an ice-cream cone.' },
    cylinder: { zh: '上下两个一样的圆，中间是弯的侧面，像罐头、蜡笔。', en: 'Two flat circles and a curved side, like a can.' },
    sphere: { zh: '圆滚滚的，没有平面，会到处滚，像球。', en: 'Round all over, no flat face, rolls everywhere, like a ball.' },
  };
  window.StepKinds.solid3d = ({ kind }) => {
    const [zh, en] = SOLID_NAMES[kind], d = DESC3D[kind];
    return [
      { zh: `这是一个<b>${zh}</b>（${en}）。`, en: `This is a ${en}.`, render: s => { s.innerHTML = `<div class="center">${solid3d(kind, { w: 180 })}</div>`; } },
      { zh: d.zh, en: d.en, render: s => { s.innerHTML = `<div class="center">${solid3d(kind, { w: 180, hl: true })}</div>`; } },
    ];
  };
  window.StepKinds.solidsall = () => {
    const kinds = Object.keys(SOLID_NAMES);
    const all = hl => `<div class="shape-row">${kinds.map(k => `<div class="shape-cell ${hl === k ? 'on' : ''}">${solid3d(k, { w: 80 })}<div class="shape-name">${SOLID_NAMES[k][0]}<br><span class="en">${SOLID_NAMES[k][1]}</span></div></div>`).join('')}</div>`;
    return [{ zh: '这一单元要认识 5 种立体图形。立体图形是可以拿在手里、有厚度的。', en: 'Five solids to know.', render: s => { s.innerHTML = all(null); } }]
      .concat(kinds.map(k => ({ zh: `<b>${SOLID_NAMES[k][0]}</b>（${SOLID_NAMES[k][1]}）：${DESC3D[k].zh}`, en: `${SOLID_NAMES[k][1]}: ${DESC3D[k].en}`, render: s => { s.innerHTML = all(k); } })));
  };
  window.StepKinds.flatsurface = () => [
    { zh: '<b>平面</b>（flat surface）是平平的面，可以稳稳地放在桌上。', en: 'A flat surface can rest steadily on a table.', render: s => { s.innerHTML = `<div class="center row" style="justify-content:center">${solid3d('cube', { w: 110, hl: true })}${solid3d('cuboid', { w: 110, hl: true })}<div class="sub">有平面 ✓</div></div>`; } },
    { zh: '球是圆滚滚的，没有平面，放在桌上会滚走。', en: 'A sphere has no flat surface; it rolls.', render: s => { s.innerHTML = `<div class="center row" style="justify-content:center">${solid3d('sphere', { w: 110, hl: true })}<div class="sub">没有平面 ✗</div></div>`; } },
    { zh: '圆锥和圆柱有弯的面，也有平的底面。想一想：这个东西有没有一个平平的面？', en: 'Cones and cylinders have curved sides but flat ends.', render: s => { s.innerHTML = `<div class="center row" style="justify-content:center">${solid3d('cone', { w: 110 })}${solid3d('cylinder', { w: 110 })}<div class="sub">底面是平的 ✓</div></div>`; } },
    { zh: '像枕头、气球、羽毛球这种软的、圆的东西，没有平面。', en: 'Soft or round things like a pillow or a balloon have no flat surface.', render: s => { s.innerHTML = `<div class="center" style="font-size:70px">🛏️ 🎈 🏸</div>`; } },
  ];
  // 规律：seq tokens, period
  window.StepKinds.pattern2 = ({ seq, period, next }) => {
    const row = (hl, showNext) => `<div class="pat-row">${seq.map((t, i) => `<span class="pat-cell ${hl && hl(i) ? 'on' : ''}">${tok(t, { w: 64 })}</span>`).join('')}<span class="pat-cell next">${showNext ? tok(next, { w: 64, hl: true }) : '<b>?</b>'}</span></div>`;
    const unit = seq.slice(0, period);
    return [
      { zh: '先看前面几个图形，找出<b>重复的一组</b>。', en: 'Find the group that repeats.', render: s => { s.innerHTML = row(null, false); } },
      { zh: `重复的一组是：${unit.map(t => tokName(t)[0] + (t.fill && t.fill !== 'white' ? `（${t.fill === 'dark' ? '深色' : '灰色'}）` : '') + (t.size && t.size < 0.6 ? '（小）' : t.size && t.size > 0.9 ? '（大）' : '')).join('、')}，一共 ${period} 个，一直重复。`, en: `The group of ${period} repeats.`, render: s => { s.innerHTML = row(i => i < period, false); } },
      { zh: '再看第二组，是不是一模一样？', en: 'The second group is the same.', render: s => { s.innerHTML = row(i => i >= period && i < 2 * period, false); } },
      { zh: `数一数：已经画了 ${seq.length} 个，第 ${seq.length + 1} 个是这一组里的第 ${(seq.length % period) + 1} 个，就是<b>${tokName(next)[0]}</b>。`, en: `The next one is number ${(seq.length % period) + 1} of the group.`, render: s => { s.innerHTML = row(i => i % period === seq.length % period, true); } },
    ];
  };
  window.StepKinds.gridcopy = () => [
    { zh: '左边是原图，右边是空格子。数一数原图每条边走了<b>几个点</b>。', en: 'Count how many dots each side covers.', render: s => { s.innerHTML = line('数点 → 找到起点 → 一段一段画'); } },
    { zh: '在右边找到同样位置的起点，点一下；再点这条边的终点，就画出一条线。', en: 'Click the start dot, then the end dot, to draw a line.', render: s => { s.innerHTML = line('点起点 ● → 点终点 ● = 一条边'); } },
    { zh: '一条边一条边画，最后回到起点，图形就画好啦。画错了点“撤销”。', en: 'Draw side by side until you return to the start.', render: s => { s.innerHTML = line('画完所有边 → 检查'); } },
  ];

  /* ---------- 题型 gridq：一格一题的小网格 ----------
   * q = { id, type:'gridq', items:[{pic(html), field:{a, kind:'choice'|'num', options}}], cols, prompt, hint, explain }
   */
  window.QTypes.gridq = q => {
    const n = q.items.length;
    const norm = s => String(s).trim().toLowerCase();
    function html() {
      return `<div class="gridq" style="--cols:${q.cols || 4}">${q.items.map((it, i) => `<div class="gq-cell" data-i="${i}"><div class="gq-pic">${it.pic}</div>
        ${it.field.kind === 'choice' ? `<div class="gq-seg" data-i="${i}">${it.field.options.map(o => `<button type="button" class="segbtn" data-val="${esc(o)}">${esc(o)}</button>`).join('')}</div>` : `<input class="blank gq-in" data-i="${i}" type="text" inputmode="numeric" autocomplete="off" maxlength="2" style="width:2.4em">`}</div>`).join('')}</div>
        <div class="center mt"><button class="btn ok" id="submit">检查 ✔</button></div>`;
    }
    function bind(box, submit) {
      box.querySelectorAll('.segbtn').forEach(b => b.onclick = () => { if (b.disabled) return; b.parentElement.querySelectorAll('.segbtn').forEach(x => x.classList.remove('sel')); b.classList.add('sel'); });
      const ins = [...box.querySelectorAll('.gq-in')];
      ins.forEach((inp, i) => { inp.onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); submit(); } }; inp.oninput = () => { if (inp.value.length >= 1 && ins[i + 1] && !/^1$/.test(inp.value)) ins[i + 1].focus(); }; });
      $('#submit', box).onclick = () => submit();
      if (ins[0]) ins[0].focus({ preventScroll: true });
    }
    function value(box) {
      const v = [];
      for (let i = 0; i < n; i++) { const it = q.items[i]; if (it.field.kind === 'choice') { const s = box.querySelector(`.gq-seg[data-i="${i}"] .sel`); v.push(s ? s.dataset.val : ''); } else { v.push(box.querySelector(`.gq-in[data-i="${i}"]`).value.trim()); } }
      if (v.every(x => x === '')) return null;
      return JSON.stringify(v);
    }
    const ok = (i, s) => norm(s) === norm(q.items[i].field.a);
    function mark(box, v, reveal) {
      q.items.forEach((it, i) => {
        const cell = box.querySelector(`.gq-cell[data-i="${i}"]`); const good = ok(i, v[i]);
        cell.classList.remove('right', 'wrong'); cell.classList.add(good ? 'right' : 'wrong');
        if (it.field.kind === 'choice') { cell.querySelectorAll('.segbtn').forEach(b => { b.classList.remove('right', 'wrong'); if (b.dataset.val === v[i]) b.classList.add(good ? 'right' : 'wrong'); if (reveal && norm(b.dataset.val) === norm(it.field.a)) b.classList.add('right'); if (good || reveal) b.disabled = true; }); }
        else { const inp = cell.querySelector('.gq-in'); if (reveal && !good) inp.value = it.field.a; inp.classList.toggle('good', good || reveal); inp.classList.toggle('badf', !good && !reveal); if (good || reveal) inp.disabled = true; }
        if (reveal) cell.classList.remove('wrong'), cell.classList.add('right');
      });
      const first = box.querySelector('.gq-cell.wrong .gq-in'); if (first) first.select();
    }
    function lock(box) { box.querySelectorAll('input, .segbtn').forEach(x => x.disabled = true); const s = box.querySelector('#submit'); if (s) s.disabled = true; }
    return {
      prompt: q.prompt, stage: q.pic || '',
      custom: { html, bind, value, markWrong: (box, val) => mark(box, JSON.parse(val), false), showAnswer: box => { mark(box, q.items.map(it => it.field.a), true); lock(box); }, lock,
        restore: (box, val) => { let v = []; try { v = JSON.parse(val || '[]'); } catch (e) { /* */ } q.items.forEach((it, i) => { const cell = box.querySelector(`.gq-cell[data-i="${i}"]`); if (it.field.kind === 'choice') cell.querySelectorAll('.segbtn').forEach(b => { if (b.dataset.val === v[i]) b.classList.add('sel'); }); else cell.querySelector('.gq-in').value = v[i] || ''; }); mark(box, v, false); lock(box); } },
      hint: q.hint, answerText: q.items.map(it => it.field.a).join(', '),
      check: val => { try { const v = JSON.parse(val); return v.length === n && v.every((x, i) => ok(i, x)); } catch (e) { return false; } },
      answerDisplay: val => { try { return JSON.parse(val).join(', '); } catch (e) { return val; } },
      explainKind: q.explain ? q.explain[0] : null, n: q.explain ? q.explain[1] : null,
    };
  };

  /* ---------- 题型 pickone：从几张图里选一张 ----------
   * q = { id, type:'pickone', pic(html), options:[html...], answer:idx, prompt, hint, explain, labels? }
   */
  window.QTypes.pickone = q => {
    // 按钮带 class "choice"，app.js 会自动绑定点击和键盘 1-3
    function html() { return `<div class="pick-opts">${q.options.map((o, i) => `<button type="button" class="choice pick-opt" data-val="${i}" data-i="${i}"><span class="key">${i + 1}</span>${o}</button>`).join('')}</div><div class="center sub">点一个，或按键盘 1 2 3</div>`; }
    function bind() { /* app.js 负责 */ }
    const opt = (box, i) => box.querySelector(`.pick-opt[data-i="${i}"]`);
    return {
      prompt: q.prompt, stage: q.pic,
      choices: q.options.map((_, i) => String(i)),   // 让 app.js 支持键盘 1-3
      custom: { html, bind, value: () => null,
        markWrong: (box, val) => { const b = opt(box, val); if (b) { b.classList.add('wrong'); b.disabled = true; } },
        showAnswer: box => { opt(box, q.answer).classList.add('right'); box.querySelectorAll('.pick-opt').forEach(b => b.disabled = true); },
        lock: box => { const b = opt(box, q.answer); if (b) b.classList.add('right'); box.querySelectorAll('.pick-opt').forEach(b => b.disabled = true); },
        restore: (box, val, status) => { if (status === 'bad' && val !== undefined) { const b = opt(box, val); if (b) b.classList.add('wrong'); } opt(box, q.answer).classList.add('right'); box.querySelectorAll('.pick-opt').forEach(b => b.disabled = true); } },
      hint: q.hint, answerText: `第 ${q.answer + 1} 个`,
      check: val => String(val) === String(q.answer),
      answerDisplay: val => `第 ${parseInt(val, 10) + 1} 个`,
      explainKind: q.explain ? q.explain[0] : null, n: q.explain ? q.explain[1] : null,
    };
  };

  /* ---------- 题型 gridcopy：在点阵/方格上照着画 ----------
   * q = { id, type:'gridcopy', grid:'dot'|'square', n:8, poly:[[x,y],...] }
   */
  window.QTypes.gridcopy = q => {
    const N = q.n || 8, CELL = 32, PAD = 20, S = PAD * 2 + (N - 1) * CELL;
    const edges = poly => { const set = new Set(); for (let i = 0; i < poly.length; i++) { const a = poly[i], b = poly[(i + 1) % poly.length]; set.add(key(a, b)); } return set; };
    const key = (a, b) => { const s = [a.join(','), b.join(',')].sort(); return s.join('|'); };
    const target = edges(q.poly);
    let drawn = [], start = null;
    const px = v => PAD + v * CELL;
    function gridSVG(id, poly, interactive) {
      let s = `<svg class="gc ${interactive ? 'live' : ''}" id="${id}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S} ${S}" width="${S}" height="${S}">`;
      if (q.grid === 'square') { for (let i = 0; i < N; i++) s += `<line x1="${px(i)}" y1="${px(0)}" x2="${px(i)}" y2="${px(N - 1)}" stroke="#c8c8d4"/><line x1="${px(0)}" y1="${px(i)}" x2="${px(N - 1)}" y2="${px(i)}" stroke="#c8c8d4"/>`; }
      if (poly) s += `<polygon points="${poly.map(p => px(p[0]) + ',' + px(p[1])).join(' ')}" fill="rgba(108,92,231,.12)" stroke="#2b2b3a" stroke-width="3" stroke-linejoin="round"/>`;
      s += `<g class="gc-lines"></g>`;
      for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) s += `<circle class="gc-dot" data-x="${x}" data-y="${y}" cx="${px(x)}" cy="${px(y)}" r="${interactive ? 7 : 3.5}" fill="${interactive ? 'rgba(108,92,231,.25)' : '#555'}" stroke="${interactive ? '#6c5ce7' : 'none'}"/>`;
      return s + '</svg>';
    }
    function html() { return `<div class="gc-wrap"><div><div class="sub center">原图 Original</div>${gridSVG('gcA', q.poly, false)}</div><div><div class="sub center">照着画 Draw here</div>${gridSVG('gcB', null, true)}</div></div>
      <div class="center mt"><button class="btn secondary small" id="undo">撤销一段 ↩</button> <button class="btn secondary small" id="clearAll">清空</button> <button class="btn ok" id="submit">检查 ✔</button></div>`; }
    function redraw(box) {
      const g = box.querySelector('#gcB .gc-lines'); if (!g) return;
      g.innerHTML = drawn.map(([a, b]) => `<line x1="${px(a[0])}" y1="${px(a[1])}" x2="${px(b[0])}" y2="${px(b[1])}" stroke="#6c5ce7" stroke-width="4" stroke-linecap="round"/>`).join('');
      box.querySelectorAll('#gcB .gc-dot').forEach(d => d.classList.toggle('start', start && +d.dataset.x === start[0] && +d.dataset.y === start[1]));
    }
    function bind(box, submit) {
      drawn = []; start = null;
      box.querySelectorAll('#gcB .gc-dot').forEach(d => d.onclick = () => { if (box.dataset.locked) return; const p = [+d.dataset.x, +d.dataset.y]; if (!start) { start = p; } else if (start[0] === p[0] && start[1] === p[1]) { start = null; } else { drawn.push([start, p]); start = p; } redraw(box); });
      box.querySelector('#undo').onclick = () => { drawn.pop(); start = drawn.length ? drawn[drawn.length - 1][1] : null; redraw(box); };
      box.querySelector('#clearAll').onclick = () => { drawn = []; start = null; redraw(box); };
      box.querySelector('#submit').onclick = () => submit();
    }
    const value = () => drawn.length ? JSON.stringify(drawn) : null;
    function same(list) { const set = new Set(list.map(([a, b]) => key(a, b))); if (set.size !== target.size) return false; for (const k of target) if (!set.has(k)) return false; return true; }
    function lock(box) { box.dataset.locked = '1'; box.querySelectorAll('#undo, #clearAll, #submit').forEach(b => b.disabled = true); }
    function showTarget(box) { const g = box.querySelector('#gcB .gc-lines'); if (g) g.innerHTML = `<polygon points="${q.poly.map(p => px(p[0]) + ',' + px(p[1])).join(' ')}" fill="none" stroke="#2ecc71" stroke-width="3" stroke-dasharray="6 4"/>` + g.innerHTML; }
    return {
      prompt: q.prompt || { zh: '在右边照着画出一样的图形', en: 'Draw the same shape on the right' }, stage: '',
      custom: { html, bind, value, markWrong: box => { box.querySelector('#gcB').classList.add('bad'); setTimeout(() => box.querySelector('#gcB') && box.querySelector('#gcB').classList.remove('bad'), 800); }, showAnswer: box => { showTarget(box); lock(box); }, lock,
        restore: (box, val, status) => { try { drawn = JSON.parse(val || '[]'); } catch (e) { drawn = []; } redraw(box); if (status === 'bad') showTarget(box); lock(box); } },
      hint: { zh: '数一数原图每条边有几个点，从同样的位置开始，一段一段画。多画的用“撤销”去掉。', en: 'Count the dots on each side; start from the same spot.' },
      answerText: '和原图一样的图形',
      check: val => { try { return same(JSON.parse(val)); } catch (e) { return false; } },
      answerDisplay: () => '画的图形', explainKind: 'gridcopy', n: {},
    };
  };

  window.ShapeUI = { shape2d, solid3d, tok, tokName, img, SHAPE_NAMES, SOLID_NAMES };
})();
