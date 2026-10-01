/* Level 1：图形与规律、序数与位置 —— SVG 图形、讲解动画、题型 patfill（填规律）、cycle（点图形标号） */
(function () {
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '"': '&quot;', '>': '&gt;' }[c]));
  const line = t => `<div class="expand-line">${t}</div>`;
  const L = window.L1;
  const wrap = (...parts) => `<div class="l1wrap">${parts.join('')}</div>`;
  const img = (name, w) => `<img class="figimg" src="img/${name}.png" alt="" style="max-width:${w || 360}px">`;
  const INK = '#2b2b3a';
  const FILL = { w: '#fff', g: '#c9c9d4', d: '#6b6b7b', b: '#8fc4ff', y: '#ffe08a', r: '#ff9a9a', gr: '#9be3b7' };

  /* shp(kind, o)：kind = sq rect rectv circ tri trid tril trir oval ovalv dia para parav trap kite rtri(◺) rtrir(◿)
   * o: fill('w'|'g'|'d'|...), s(大小倍数), lines('h'|'v'|'d'), dot('tr'|'br'|'bl'|'tl'), inner('v'|'h'), w/h 覆盖, hl */
  function shp(kind, o = {}) {
    const s = o.s || 1, W = Math.round((o.w || 60) * s), H = Math.round((o.h || 60) * s);
    const f = FILL[o.fill || 'w'], st = `fill="${f}" stroke="${INK}" stroke-width="2"`;
    let body = '';
    const P = pts => `<polygon points="${pts.map(p => p.join(',')).join(' ')}" ${st}/>`;
    switch (kind) {
      case 'sq': body = `<rect x="4" y="4" width="${W - 8}" height="${H - 8}" ${st}/>`; break;
      case 'rect': body = `<rect x="4" y="${H * 0.25}" width="${W - 8}" height="${H * 0.5}" ${st}/>`; break;
      case 'rectv': body = `<rect x="${W * 0.28}" y="4" width="${W * 0.44}" height="${H - 8}" ${st}/>`; break;
      case 'circ': body = `<circle cx="${W / 2}" cy="${H / 2}" r="${Math.min(W, H) / 2 - 4}" ${st}/>`; break;
      case 'oval': body = `<ellipse cx="${W / 2}" cy="${H / 2}" rx="${W / 2 - 4}" ry="${H * 0.28}" ${st}/>`; break;
      case 'ovalv': body = `<ellipse cx="${W / 2}" cy="${H / 2}" rx="${W * 0.26}" ry="${H / 2 - 4}" ${st}/>`; break;
      case 'tri': body = P([[W / 2, 4], [W - 4, H - 4], [4, H - 4]]); break;
      case 'trid': body = P([[4, 4], [W - 4, 4], [W / 2, H - 4]]); break;
      case 'tril': body = P([[W - 4, 4], [W - 4, H - 4], [4, H / 2]]); break;
      case 'trir': body = P([[4, 4], [4, H - 4], [W - 4, H / 2]]); break;
      case 'rtri': body = P([[4, 4], [W - 4, H - 4], [4, H - 4]]); break;
      case 'rtrir': body = P([[W - 4, 4], [W - 4, H - 4], [4, H - 4]]); break;
      case 'trithin': body = P([[W / 2, 4], [W * 0.68, H - 4], [W * 0.32, H - 4]]); break;
      case 'dia': body = P([[W / 2, 4], [W - 4, H / 2], [W / 2, H - 4], [4, H / 2]]); break;
      case 'para': body = P([[W * 0.3, H * 0.25], [W - 4, H * 0.25], [W * 0.7, H * 0.75], [4, H * 0.75]]); break;
      case 'parav': body = P([[W * 0.4, 4], [W * 0.75, 4], [W * 0.6, H - 4], [W * 0.25, H - 4]]); break;
      case 'trap': body = P([[W * 0.3, 4], [W * 0.5, 4], [W - 4, H - 4], [4, H - 4]]); break;
      case 'kite': body = P([[W / 2, 4], [W - 4, H * 0.4], [W / 2, H - 4], [4, H * 0.4]]); break;
      case 'pent': body = P([[4, H * 0.3], [W * 0.6, 4], [W - 4, H * 0.5], [W * 0.6, H - 4], [4, H * 0.7]]); break;
      default: body = `<rect x="4" y="4" width="${W - 8}" height="${H - 8}" ${st}/>`;
    }
    let extra = '';
    if (o.lines) { const id = 'ln' + Math.random().toString(36).slice(2, 7); const d = o.lines === 'h' ? 'M0 4 H8' : o.lines === 'v' ? 'M4 0 V8' : 'M0 8 L8 0'; extra = `<defs><pattern id="${id}" width="8" height="8" patternUnits="userSpaceOnUse"><path d="${d}" stroke="${INK}" stroke-width="1.2"/></pattern></defs>`; body = body.replace(`fill="${f}"`, `fill="url(#${id})"`); }
    if (o.dot) { const x = o.dot.includes('r') ? W - 10 : 10, y = o.dot.includes('t') ? (kind === 'rect' ? H * 0.25 + 6 : 10) : (kind === 'rect' ? H * 0.75 - 6 : H - 10); extra += `<circle cx="${x}" cy="${y}" r="3" fill="${INK}"/>`; }
    if (o.inner) extra += o.inner === 'v' ? `<rect x="${W / 2 - 4}" y="${H * 0.4}" width="8" height="${H * 0.45}" fill="#fff" stroke="${INK}" stroke-width="1.5"/>` : `<rect x="${W * 0.32}" y="${H * 0.68}" width="${W * 0.36}" height="8" fill="#fff" stroke="${INK}" stroke-width="1.5"/>`;
    return `<span class="shp2 ${o.hl ? 'hl' : ''} ${o.cls || ''}"><svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">${extra}${body}</svg></span>`;
  }
  const NAMES = { sq: 'square', rect: 'rectangle', rectv: 'rectangle', circ: 'circle', tri: 'triangle', trid: 'triangle', tril: 'triangle', trir: 'triangle', rtri: 'triangle', rtrir: 'triangle', trithin: 'triangle', oval: 'oval', ovalv: 'oval', dia: 'square', para: 'parallelogram', parav: 'parallelogram', trap: 'trapezium', kite: 'kite', pent: 'pentagon' };
  const ZH = { square: '正方形', rectangle: '长方形', circle: '圆形', triangle: '三角形', oval: '椭圆', parallelogram: '平行四边形', trapezium: '梯形', kite: '风筝形', pentagon: '五边形' };
  const SIDES = { square: 4, rectangle: 4, circle: 0, triangle: 3 };
  const ORD = ['', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth'];
  const ORDS = ['', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th'];
  /* 一排带序号的 icon：from 'left'|'right'，k = 第几个（1 起），o.count = 已数到几 */
  function ordRow(icon, n, k, from, o = {}) {
    const idx = from === 'right' ? n - k : k - 1, count = o.count === undefined ? k : o.count;
    return `<div class="ordrow ${from === 'right' ? 'fromright' : ''}">${Array.from({ length: n }, (_, i) => { const pos = from === 'right' ? n - i : i + 1; return `<span class="orditem ${i === idx && count >= k ? 'hl' : ''}"><span class="ordico">${icon}</span><b class="ordlab">${pos <= count ? (o.words ? ORD[pos] : ORDS[pos]) : ''}</b></span>`; }).join('')}</div>`;
  }

  const S = window.StepKinds;
  /* l1shapename {kind} */
  S.l1shapename = ({ kind }) => { const name = NAMES[kind]; return [
    { zh: `看这个图形：它有 ${SIDES[name] === 0 ? '<b>没有</b>直的边，是圆圆的' : `<b>${SIDES[name]}</b> 条边、<b>${SIDES[name]}</b> 个角`}。`, en: SIDES[name] === 0 ? 'It is round, with no straight sides.' : `It has ${SIDES[name]} sides and ${SIDES[name]} corners.`, render: s => { s.innerHTML = wrap(shp(kind, { s: 2 })); } },
    { zh: `${name === 'square' ? '4 条边一样长，是' : name === 'rectangle' ? '4 条边，对边一样长，但不是四条都一样，是' : name === 'triangle' ? '3 条边 3 个角，是' : '圆圆的，是'}<b>${ZH[name]} ${name}</b>。`, en: `It is a ${name}.`, render: s => { s.innerHTML = wrap(shp(kind, { s: 2, hl: true }), line(name)); } },
  ]; };
  /* l1sides {kind} */
  S.l1sides = ({ kind }) => { const name = NAMES[kind], n = SIDES[name]; const W = 120, pts = { sq: [[6, 6], [114, 6], [114, 114], [6, 114]], rect: [[6, 30], [114, 30], [114, 90], [6, 90]], tri: [[60, 6], [114, 114], [6, 114]], circ: [] }[kind === 'rectv' ? 'rect' : kind] || [];
    const draw = (sides, corners) => `<span class="shp2"><svg viewBox="0 0 120 120" width="150" height="150">${kind === 'circ' ? `<circle cx="60" cy="60" r="54" fill="#fff" stroke="${INK}" stroke-width="2"/>` : `<polygon points="${pts.map(p => p.join(',')).join(' ')}" fill="#fff" stroke="${INK}" stroke-width="2"/>${pts.map((p, i) => { const q = pts[(i + 1) % pts.length]; return i < sides ? `<line x1="${p[0]}" y1="${p[1]}" x2="${q[0]}" y2="${q[1]}" stroke="#ff9f43" stroke-width="6" stroke-linecap="round"/><text x="${(p[0] + q[0]) / 2}" y="${(p[1] + q[1]) / 2 + 5}" font-size="14" font-weight="800" fill="#c2410c" text-anchor="middle">${i + 1}</text>` : ''; }).join('')}${pts.map((p, i) => i < corners ? `<circle cx="${p[0]}" cy="${p[1]}" r="7" fill="#6c5ce7"/><text x="${p[0]}" y="${p[1] - 10}" font-size="14" font-weight="800" fill="#6c5ce7" text-anchor="middle">${i + 1}</text>` : '').join('')}`}</svg></span>`;
    return [
      { zh: `<b>边 side</b> 是直直的线，<b>角 corner</b> 是两条边碰到的尖尖的地方。先数 ${name} 的边。`, en: 'A side is a straight line. A corner is where two sides meet.', render: s => { s.innerHTML = wrap(draw(0, 0)); } },
      { zh: n === 0 ? `圆形没有直直的边，所以边是 <b>0</b>。` : `沿着一圈数边：${Array.from({ length: n }, (_, i) => i + 1).join('、')}，一共 <b>${n}</b> 条边。`, en: n === 0 ? 'A circle has no straight sides: 0.' : `${n} sides.`, render: s => { s.innerHTML = wrap(draw(n, 0), line(`${n} sides`)); } },
      { zh: n === 0 ? `也没有尖尖的角，角是 <b>0</b>。` : `再数角：<b>${n}</b> 个角。边有几条，角就有几个。`, en: n === 0 ? 'No corners: 0.' : `${n} corners.`, render: s => { s.innerHTML = wrap(draw(n, n), line(`${n} sides, ${n} corners`)); } },
    ]; };
  /* l1group {pic, by, not} */
  S.l1group = ({ pic, by, not }) => {
    const Z = { colour: '颜色', shape: '形状', size: '大小' };
    return [
      { zh: `看两个框：左框和右框里的图形，<b>什么一样、什么不一样</b>？`, en: 'Compare the two boxes. What is the same? What is different?', render: s => { s.innerHTML = wrap(img(pic, 460)); } },
      { zh: not ? `每个框里${by === 'colour' ? '颜色' : by === 'shape' ? '形状' : '大小'}都不一样（没有按它分），其他都一样。所以<b>没有</b>按 <b>${Z[by]} ${by}</b> 分。` : `每个框里的图形${by === 'colour' ? '颜色一样（左边浅、右边深）' : by === 'shape' ? '形状一样（左边都是三角形、右边都是长方形）' : '大小一样（一个框大、一个框小）'}，其他都不同。所以是按 <b>${Z[by]} ${by}</b> 分的。`, en: not ? `They are not grouped by ${by}.` : `They are grouped by ${by}.`, render: s => { s.innerHTML = wrap(img(pic, 460), line(not ? `not grouped by ${by}` : `grouped by ${by}`)); } },
    ];
  };
  /* l1similar {items:[{kind,o}], ans:[idx]} */
  S.l1similar = ({ items, ans }) => {
    const row = hl => `<div class="shaperow">${items.map((it, i) => shp(it.kind, Object.assign({}, it.o || {}, { hl: hl && ans.includes(i) }))).join('')}</div>`;
    return [
      { zh: `“相似 similar” 就是<b>形状一样、大小也一样</b>的。一个一个比。`, en: 'Similar shapes have the same shape and size.', render: s => { s.innerHTML = wrap(row(false)); } },
      { zh: `第 ${ans[0] + 1} 个和第 ${ans[1] + 1} 个都是 <b>${ZH[NAMES[items[ans[0]].kind]]}</b>，大小一样。就是它们。`, en: `The ${ORD[ans[0] + 1]} and the ${ORD[ans[1] + 1]} are the same.`, render: s => { s.innerHTML = wrap(row(true)); } },
    ];
  };
  /* l1objshape {pic, shape, hint} */
  S.l1objshape = ({ pic, shape, zh }) => [
    { zh: `看这个东西的<b>外形</b>（轮廓）。${zh || ''}`, en: 'Look at the outline of the object.', render: s => { s.innerHTML = wrap(img(pic, 200)); } },
    { zh: `它的轮廓是 <b>${ZH[shape]} ${shape}</b>。`, en: `Its shape is a ${shape}.`, render: s => { s.innerHTML = wrap(`<div class="fig-row">${img(pic, 200)}<span class="vol-arrow">⇨</span>${shp({ square: 'sq', rectangle: 'rect', circle: 'circ', triangle: 'tri' }[shape], { s: 1.6, hl: true })}</div>`, line(shape)); } },
  ];
  /* l1pattern {seq:[{kind,o}], blanks:[idx], rule} */
  S.l1pattern = ({ seq, blanks, rule }) => {
    const row = (show, hl) => `<div class="shaperow">${seq.map((it, i) => blanks.includes(i) && !show ? `<span class="shp2 blank-shp">?</span>` : shp(it.kind, Object.assign({}, it.o || {}, { hl: hl && hl.includes(i) }))).join('')}</div>`;
    const period = (() => { for (let p = 1; p < seq.length; p++) { let ok = true; for (let i = 0; i + p < seq.length; i++) { if (blanks.includes(i) || blanks.includes(i + p)) continue; if (JSON.stringify(seq[i]) !== JSON.stringify(seq[i + p])) { ok = false; break; } } if (ok) return p; } return 1; })();
    return [
      { zh: `找规律：图形是一组一组<b>重复</b>的。看前面几个，哪里变了？${rule ? esc(rule) : ''}`, en: `Look for the repeating group. ${rule || ''}`, render: s => { s.innerHTML = wrap(row(false)); } },
      { zh: `每 <b>${period}</b> 个一组重复：${seq.slice(0, period).map(it => ZH[NAMES[it.kind]]).join('、')}……`, en: `The group of ${period} repeats.`, render: s => { s.innerHTML = wrap(row(false, Array.from({ length: period }, (_, i) => i))); } },
      { zh: `空格就按这个规律接着填：往前数 ${period} 个，和它一样。`, en: `Each blank is the same as the shape ${period} places before it.`, render: s => { s.innerHTML = wrap(row(true, blanks)); } },
    ];
  };
  /* l1patimg {pic, a, b, answer(0|1), rule} */
  S.l1patimg = ({ pic, a, b, answer, rule }) => [
    { zh: `看这一排，什么在变？${esc(rule)}`, en: rule, render: s => { s.innerHTML = wrap(img(pic, 420)); } },
    { zh: `按规律，空格应该是下面这个：`, en: 'So the next one is:', render: s => { s.innerHTML = wrap(img(pic, 420), `<div class="fig-row">${[a, b].map((p, i) => `<span class="${i === answer ? 'shp2 hl' : 'shp2'}">${img(p, 90)}</span>`).join('')}</div>`); } },
  ];
  /* l1ordinal {icon, n, k, from} */
  S.l1ordinal = ({ icon, n, k, from }) => {
    const steps = [{ zh: `序数说的是<b>第几个</b>。先看从哪边开始数：这题从<b>${from === 'right' ? '右' : '左'}</b>边数。`, en: `Count from the ${from}.`, render: s => { s.innerHTML = wrap(ordRow(icon, n, k, from, { count: 0 })); } }];
    for (let i = 1; i <= k; i++) steps.push({ zh: `${ORDS[i]} ${ORD[i]}${i === k ? `：就是这个！第 ${k} 个 = <b>${ORDS[k]} / ${ORD[k]}</b>。` : ''}`, en: `${ORD[i]}${i === k ? '. This one!' : ''}`, render: s => { s.innerHTML = wrap(ordRow(icon, n, k, from, { count: i, words: true }), i === k ? line(`${ORDS[k]} = ${ORD[k]}`) : ''); } });
    return steps;
  };
  /* l1ordlist {pic, order:[names], zh} 排名列表 */
  S.l1ordlist = ({ pic, order, zh }) => [
    { zh: zh || '看图，谁在最前面？按顺序排一排。', en: 'Who is in front? Put them in order.', render: s => { s.innerHTML = wrap(img(pic, 400)); } },
    { zh: `顺序是：${order.map((n, i) => `<b>${ORDS[i + 1]}</b> ${esc(n)}`).join('，')}。`, en: order.map((n, i) => `${ORDS[i + 1]} ${n}`).join(', '), render: s => { s.innerHTML = wrap(img(pic, 400), `<div class="wordtab">${order.map((n, i) => `<span><b>${ORDS[i + 1]}</b>${esc(n)}</span>`).join('')}</div>`); } },
  ];
  /* l1posword {pic, zh, en} 通用图解 */
  S.l1posword = ({ pic, zh, en, w }) => [
    { zh: `<b>before</b> 在前面，<b>after</b> 在后面，<b>between</b> 在两个中间。`, en: 'before = in front, after = behind, between = in the middle of two.', render: s => { s.innerHTML = wrap(img(pic, w || 440)); } },
    { zh, en, render: s => { s.innerHTML = wrap(img(pic, w || 440), line(en)); } },
  ];
  /* l1leftright {icon, n, k, from} */
  S.l1leftright = ({ icon, n, k, from }) => [
    { zh: `“from the <b>${from}</b>” 就是从<b>${from === 'right' ? '右' : '左'}</b>边开始数。`, en: `Start counting from the ${from}.`, render: s => { s.innerHTML = wrap(ordRow(icon, n, k, from, { count: 0 })); } },
    { zh: `从${from === 'right' ? '右' : '左'}往${from === 'right' ? '左' : '右'}数：${Array.from({ length: k }, (_, i) => ORDS[i + 1]).join('、')}。第 <b>${ORDS[k]}</b> 个就是它。`, en: `${ORDS[k]} from the ${from}.`, render: s => { s.innerHTML = wrap(ordRow(icon, n, k, from), line(`${ORDS[k]} from the ${from}`)); } },
  ];
  /* l1riddle {letters, clues:[[k,from]]} */
  S.l1riddle = ({ letters, clues }) => {
    const ans = clues.map(([k, from]) => from === 'right' ? letters[letters.length - k] : letters[k - 1]);
    const row = hl => `<div class="shaperow">${letters.map((c, i) => `<span class="shp2 letter ${hl === i ? 'hl' : ''}">${c}</span>`).join('')}</div>`;
    const steps = [{ zh: `每条线索告诉你从左或从右数第几个字母。一条一条找。`, en: 'Each clue gives a letter: count from the left or the right.', render: s => { s.innerHTML = wrap(row(-1)); } }];
    clues.forEach(([k, from], i) => steps.push({ zh: `(${'abcdefgh'[i]}) ${ORDS[k]} from the ${from}：<b>${ans[i]}</b>。`, en: `${ORDS[k]} from the ${from}: ${ans[i]}.`, render: s => { s.innerHTML = wrap(row(from === 'right' ? letters.length - k : k - 1), line(ans.slice(0, i + 1).join(' '))); } }));
    steps.push({ zh: `连起来读：<b>${ans.join('')}</b>！`, en: ans.join(''), render: s => { s.innerHTML = wrap(line(ans.join(''))); } });
    return steps;
  };

  /* ---------- 题型 patfill：点候选图形填进空格 q = {id, type:'patfill', seq:[{kind,o}], blanks:[idx], cands:[{kind,o}], answer:[candIdx...]} ---------- */
  window.QTypes.patfill = q => {
    let filled = [];
    const html = () => `<div class="patfill"><div class="center sub">👇 点下面的图形，按顺序填进空格（点空格可以清掉）</div><div class="shaperow" id="pfRow"></div><div class="pick-opts" id="pfCands">${q.cands.map((c, i) => `<button type="button" class="choice pick-opt pfc" data-i="${i}">${shp(c.kind, c.o)}</button>`).join('')}</div>
      <div class="center mt"><button type="button" class="btn secondary small" id="clearAll">清空</button> <button class="btn ok" id="submit">检查 ✔</button></div></div>`;
    function refresh(box, marks) {
      let bi = 0;
      box.querySelector('#pfRow').innerHTML = q.seq.map((it, i) => { if (!q.blanks.includes(i)) return shp(it.kind, it.o); const k = bi++; const v = filled[k]; return `<span class="pfblank ${v === undefined ? 'empty' : ''} ${marks ? (marks[k] ? 'right' : 'wrong') : ''}" data-k="${k}">${v === undefined ? '?' : shp(q.cands[v].kind, q.cands[v].o)}</span>`; }).join('');
      box.querySelectorAll('.pfblank').forEach(b => b.onclick = () => { if (box.dataset.locked) return; const k = +b.dataset.k; if (filled[k] !== undefined) { filled[k] = undefined; while (filled.length && filled[filled.length - 1] === undefined) filled.pop(); refresh(box); } });
    }
    function bind(box, submit) {
      filled = []; refresh(box);
      box.querySelectorAll('.pfc').forEach(b => b.onclick = () => { if (box.dataset.locked) return; let k = filled.findIndex(v => v === undefined); if (k < 0) k = filled.length; if (k >= q.blanks.length) return; filled[k] = +b.dataset.i; refresh(box); });
      box.querySelector('#clearAll').onclick = () => { if (box.dataset.locked) return; filled = []; refresh(box); };
      box.querySelector('#submit').onclick = () => submit();
    }
    const value = () => filled.some(v => v !== undefined) ? JSON.stringify(filled.map(v => v === undefined ? null : v)) : null;
    const parse = s => { try { return JSON.parse(s).map(v => v === null ? undefined : v); } catch (e) { return []; } };
    const check = s => { const v = parse(s); return q.answer.every((a, k) => v[k] === a); };
    function markWrong(box, s) { filled = parse(s); refresh(box, q.answer.map((a, k) => filled[k] === a)); }
    function lock(box) { box.dataset.locked = '1'; box.querySelectorAll('#clearAll, #submit, .pfc').forEach(b => b.disabled = true); }
    function showAnswer(box) { filled = q.answer.slice(); refresh(box, q.answer.map(() => true)); lock(box); }
    function restore(box, s) { filled = parse(s); refresh(box, q.answer.map((a, k) => filled[k] === a)); lock(box); }
    const nm = i => ZH[NAMES[q.cands[i].kind]] + (q.cands[i].o && q.cands[i].o.lines ? '(条纹)' : '');
    return {
      prompt: q.prompt || { zh: '找规律，把空格填上', en: 'Complete the pattern.' }, stage: '',
      custom: { html, bind, value, markWrong, showAnswer, lock, restore },
      hint: q.hint || { zh: '看前面几个是怎么重复的，空格和它前面一组的同一个位置一样。', en: 'Find the repeating group.' },
      answerText: q.answer.map(nm).join(', '), check, answerDisplay: s => parse(s).map(v => v === undefined ? '_' : nm(v)).join(', '),
      explainKind: 'l1pattern', n: { seq: q.seq, blanks: q.blanks, rule: q.rule },
    };
  };

  /* ---------- 题型 cycle：点图形轮流标号 q = {id, type:'cycle', items:[{kind,o,ans}], labels:['1','2','3','4'], legend} ---------- */
  window.QTypes.cycle = q => {
    let tags = [];
    const html = () => `<div class="cycleq"><div class="center sub">${q.legend || ''}</div><div class="center sub">👇 点一个图形，再点一次换下一个数字</div><div class="shapefield" id="cyField"></div>
      <div class="center mt"><button type="button" class="btn secondary small" id="clearAll">清空</button> <button class="btn ok" id="submit">检查 ✔</button></div></div>`;
    function refresh(box, marks) {
      box.querySelector('#cyField').innerHTML = q.items.map((it, i) => `<span class="cyitem ${marks ? (marks[i] ? 'right' : 'wrong') : ''}" data-i="${i}">${shp(it.kind, it.o)}<b class="cytag">${tags[i] === undefined ? '' : q.labels[tags[i]]}</b></span>`).join('');
      box.querySelectorAll('.cyitem').forEach(el => el.onclick = () => { if (box.dataset.locked) return; const i = +el.dataset.i; tags[i] = tags[i] === undefined ? 0 : (tags[i] + 1) % (q.labels.length + 1); if (tags[i] === q.labels.length) tags[i] = undefined; refresh(box); });
    }
    function bind(box, submit) { tags = []; refresh(box); box.querySelector('#clearAll').onclick = () => { if (box.dataset.locked) return; tags = []; refresh(box); }; box.querySelector('#submit').onclick = () => submit(); }
    const value = () => tags.some(t => t !== undefined) ? JSON.stringify(q.items.map((_, i) => tags[i] === undefined ? null : tags[i])) : null;
    const parse = s => { try { return JSON.parse(s).map(v => v === null ? undefined : v); } catch (e) { return []; } };
    const okAt = (v, i) => v[i] === q.items[i].ans;
    const check = s => { const v = parse(s); return q.items.every((_, i) => okAt(v, i)); };
    function markWrong(box, s) { tags = parse(s); refresh(box, q.items.map((_, i) => okAt(tags, i))); }
    function lock(box) { box.dataset.locked = '1'; box.querySelectorAll('#clearAll, #submit').forEach(b => b.disabled = true); }
    function showAnswer(box) { tags = q.items.map(it => it.ans); refresh(box, q.items.map(() => true)); lock(box); }
    function restore(box, s) { tags = parse(s); refresh(box, q.items.map((_, i) => okAt(tags, i))); lock(box); }
    return {
      prompt: q.prompt, stage: '',
      custom: { html, bind, value, markWrong, showAnswer, lock, restore },
      hint: q.hint || { zh: '长方形写 1，三角形写 2，正方形写 3，圆形写 4。歪着的正方形也是正方形。', en: '1 rectangle, 2 triangle, 3 square, 4 circle.' },
      answerText: q.items.map(it => q.labels[it.ans]).join(' '), check, answerDisplay: s => parse(s).map(v => v === undefined ? '_' : q.labels[v]).join(' '),
      explainKind: 'l1shapename', n: { kind: 'sq' },
    };
  };

  window.L1.shp = shp; window.L1.NAMES = NAMES; window.L1.ZH = ZH; window.L1.ORD = ORD; window.L1.ORDS = ORDS; window.L1.ordRow = ordRow;
})();
