/* Level 1 · Unit 13 象形图：每个符号代表 1 个。图表绘制 + 讲解 + 画图题型 */
(function () {
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '"': '&quot;', '>': '&gt;' }[c]));
  const line = t => `<div class="expand-line">${t}</div>`;
  const wrap = (...parts) => `<div class="l1wrap">${parts.join('')}</div>`;
  const sym = (s, cls) => `<span class="pg-sym ${cls || ''}">${s}</span>`;
  const rep = (s, n, cls) => Array.from({ length: Math.max(0, n) }, () => sym(s, cls)).join('');
  const $ = (sel, el) => (el || document).querySelector(sel);

  /* graph(spec, o)
   * spec = { title, cats:[{label, icon?, n, word?}], sym?(统一符号；没有就用每类自己的 icon), vertical, unit, unitZh, wide }
   * o = { hl:[labels], note:{label:html}, counts:[...], live:bool(带输入框), fixed:[i] } */
  function graph(spec, o = {}) {
    const hl = new Set(o.hl || []), note = o.note || {};
    const cnt = (c, i) => o.counts ? o.counts[i] : c.n;
    const symOf = c => spec.sym || c.icon;
    const foot = spec.sym ? `<div class="pg-foot">Each ${sym(spec.sym)} represents 1 ${spec.unit || 'item'}. <span class="zh">每个 ${sym(spec.sym)} 代表 1 ${spec.unitZh || '个'}</span></div>` : '';
    const title = spec.title ? `<div class="pg-title">${spec.title}</div>` : '';
    const lab = c => `${spec.sym && c.icon ? `<span class="pg-ico">${c.icon}</span>` : ''}<span>${c.label}</span>`;
    const inp = (c, i) => o.live ? `<input class="blank pg-in" data-i="${i}" maxlength="2" inputmode="numeric" autocomplete="off" ${c.fixed !== undefined ? `value="${c.fixed}" disabled` : ''}>` : '';
    if (spec.vertical) {
      const cols = spec.cats.map((c, i) => `<div class="pg-col ${hl.has(c.label) ? 'hl' : ''}" data-i="${i}">
        ${note[c.label] ? `<div class="pg-note">${note[c.label]}</div>` : ''}
        <div class="pg-stack ${spec.wide || cnt(c, i) > 8 ? 'wide' : ''}">${rep(symOf(c), cnt(c, i))}</div>
        <div class="pg-lab">${lab(c)}</div>${o.live ? `<div class="pg-ctl">${inp(c, i)}</div>` : ''}</div>`).join('');
      return `<div class="pg l1pg ${o.cls || ''}">${title}<div class="pg-vert">${cols}</div>${foot}</div>`;
    }
    const rows = spec.cats.map((c, i) => `<div class="pg-row ${hl.has(c.label) ? 'hl' : ''}" data-i="${i}"><div class="pg-lab">${lab(c)}</div><div class="pg-cells"><span class="pg-stack row">${rep(symOf(c), cnt(c, i))}</span>${note[c.label] ? `<span class="pg-note">${note[c.label]}</span>` : ''}${o.live ? inp(c, i) : ''}</div></div>`).join('');
    return `<div class="pg l1pg ${o.cls || ''}">${title}<div class="pg-horiz">${rows}</div>${foot}</div>`;
  }
  const cat = (spec, L) => spec.cats.find(c => c.label === L);
  const wordOf = c => c.word || c.label;
  const allNotes = spec => Object.fromEntries(spec.cats.map(c => [c.label, `<b>${c.n}</b>`]));
  const rc = spec => spec.vertical ? '列' : '行';

  const S = window.StepKinds;
  /* l1pgcount：某一类有多少 {spec, cat} */
  S.l1pgcount = ({ spec, cat: L }) => {
    const c = cat(spec, L), s = spec.sym || c.icon;
    return [
      { zh: `找到 <b>${L}</b> 这一${rc(spec)}。${spec.sym ? `每个 ${sym(spec.sym)} 代表 1 个。` : ''}`, en: `Find ${L}.`, render: s => { s.innerHTML = wrap(graph(spec, { hl: [L] })); } },
      { zh: `一个一个数：${Array.from({ length: c.n }, (_, i) => i + 1).join('、')}，一共 <b>${c.n}</b> 个。`, en: `Count: ${c.n}.`, render: st => { st.innerHTML = wrap(graph(spec, { hl: [L], note: { [L]: `<b>${c.n}</b> 个` } }), line(`${wordOf(c)}：${c.n}`)); } },
    ];
  };
  /* l1pgdiff：两类相差多少 {spec, a, b, word:'more'|'fewer'} */
  S.l1pgdiff = ({ spec, a, b, word }) => {
    const ca = cat(spec, a), cb = cat(spec, b), big = Math.max(ca.n, cb.n), small = Math.min(ca.n, cb.n);
    return [
      { zh: `先数 <b>${a}</b>：<b>${ca.n}</b> 个。`, en: `${a}: ${ca.n}.`, render: s => { s.innerHTML = wrap(graph(spec, { hl: [a], note: { [a]: `<b>${ca.n}</b>` } })); } },
      { zh: `再数 <b>${b}</b>：<b>${cb.n}</b> 个。`, en: `${b}: ${cb.n}.`, render: s => { s.innerHTML = wrap(graph(spec, { hl: [a, b], note: { [a]: `<b>${ca.n}</b>`, [b]: `<b>${cb.n}</b>` } })); } },
      { zh: `问“${word === 'fewer' ? '少几（fewer）' : '多几（more）'}”，用大的减小的：<b>${big} − ${small} = ${big - small}</b>。`, en: `${big} − ${small} = ${big - small}.`, render: s => { s.innerHTML = wrap(graph(spec, { hl: [a, b], note: { [a]: `<b>${ca.n}</b>`, [b]: `<b>${cb.n}</b>` } }), line(`${big} − ${small} = ${big - small}`)); } },
    ];
  };
  /* l1pgmost：最多/最少 {spec, which:'most'|'least'} */
  S.l1pgmost = ({ spec, which }) => {
    const sorted = spec.cats.slice().sort((x, y) => which === 'most' ? y.n - x.n : x.n - y.n), win = sorted[0];
    return [
      { zh: `每个符号都代表 1 个，所以符号<b>越${which === 'most' ? '多' : '少'}</b>，数量就越${which === 'most' ? '多' : '少'}。先数一数每一${rc(spec)}。`, en: 'Count each one.', render: s => { s.innerHTML = wrap(graph(spec)); } },
      { zh: spec.cats.map(c => `${c.label} ${c.n}`).join('，') + '。', en: spec.cats.map(c => `${c.label} ${c.n}`).join(', '), render: s => { s.innerHTML = wrap(graph(spec, { note: allNotes(spec) })); } },
      { zh: `${which === 'most' ? '最多（greatest / most）' : '最少（smallest / least）'}的是 <b>${win.label}</b>：${win.n} 个。`, en: `${which === 'most' ? 'Most' : 'Least'}: ${win.label}.`, render: s => { s.innerHTML = wrap(graph(spec, { hl: [win.label], note: allNotes(spec) }), line(`${wordOf(win)}`)); } },
    ];
  };
  /* l1pgsame：哪两类一样多 {spec} */
  S.l1pgsame = ({ spec }) => {
    let pair = null;
    for (let i = 0; i < spec.cats.length && !pair; i++) for (let j = i + 1; j < spec.cats.length; j++) if (spec.cats[i].n === spec.cats[j].n) { pair = [spec.cats[i], spec.cats[j]]; break; }
    return [
      { zh: `先数一数每一${rc(spec)}有几个。`, en: 'Count each one.', render: s => { s.innerHTML = wrap(graph(spec)); } },
      { zh: spec.cats.map(c => `${c.label} ${c.n}`).join('，') + '。', en: spec.cats.map(c => `${c.label} ${c.n}`).join(', '), render: s => { s.innerHTML = wrap(graph(spec, { note: allNotes(spec) })); } },
      { zh: `找数量一样的：<b>${pair[0].label}</b> 和 <b>${pair[1].label}</b> 都是 ${pair[0].n} 个（same / as many as）。`, en: `${pair[0].label} and ${pair[1].label}: both ${pair[0].n}.`, render: s => { s.innerHTML = wrap(graph(spec, { hl: [pair[0].label, pair[1].label], note: allNotes(spec) }), line(`${pair[0].n} = ${pair[0].n}`)); } },
    ];
  };
  /* l1pgfind：找相差 k 的两类 {spec, k, word} 答案：多的, 少的（word=more）或 少的, 多的（fewer） */
  S.l1pgfind = ({ spec, k, word, a, b }) => {
    const ca = cat(spec, a), cb = cat(spec, b);
    return [
      { zh: `先数一数每一${rc(spec)}有几个。`, en: 'Count each one.', render: s => { s.innerHTML = wrap(graph(spec, { note: allNotes(spec) })); } },
      { zh: `要找相差 <b>${k}</b> 的两${rc(spec)}：<b>${ca.label}</b> 有 ${ca.n}，<b>${cb.label}</b> 有 ${cb.n}，${Math.max(ca.n, cb.n)} − ${Math.min(ca.n, cb.n)} = <b>${k}</b>。`, en: `${ca.label} ${ca.n}, ${cb.label} ${cb.n}: ${Math.max(ca.n, cb.n)} − ${Math.min(ca.n, cb.n)} = ${k}.`, render: s => { s.innerHTML = wrap(graph(spec, { hl: [a, b], note: allNotes(spec) }), line(`${Math.max(ca.n, cb.n)} − ${Math.min(ca.n, cb.n)} = ${k}`)); } },
      { zh: word === 'fewer' ? `“${k} fewer ___ than ___”：少的在前：<b>${k} fewer ${wordOf(ca)} than ${wordOf(cb)}</b>。` : `“${k} more ___ than ___”：多的在前：<b>${k} more ${wordOf(ca)} than ${wordOf(cb)}</b>。`, en: `${k} ${word} ${wordOf(ca)} than ${wordOf(cb)}.`, render: s => { s.innerHTML = wrap(graph(spec, { hl: [a, b], note: allNotes(spec) }), line(`${k} ${word} ${wordOf(ca)} than ${wordOf(cb)}`)); } },
    ];
  };
  /* l1pgsum：全部加起来 {spec} */
  S.l1pgsum = ({ spec }) => {
    const ns = spec.cats.map(c => c.n), total = ns.reduce((x, y) => x + y, 0);
    const steps = [
      { zh: `问“一共（altogether）”，要把每一${rc(spec)}都加起来。先数一数：${spec.cats.map(c => `${c.label} ${c.n}`).join('，')}。`, en: 'Add them all.', render: s => { s.innerHTML = wrap(graph(spec, { note: allNotes(spec) })); } },
    ];
    let run = ns[0]; const parts = [`${ns[0]}`];
    for (let i = 1; i < ns.length; i++) { const prev = run; run += ns[i]; parts.push(`${ns[i]}`); const txt = `${prev} + ${ns[i]} = ${run}`; steps.push({ zh: `${txt}${i === ns.length - 1 ? `。一共 <b>${total}</b>。` : '。'}`, en: txt, render: s => { s.innerHTML = wrap(graph(spec, { hl: spec.cats.slice(0, i + 1).map(c => c.label), note: allNotes(spec) }), line(txt)); } }); }
    steps.push({ zh: `<b>${parts.join(' + ')} = ${total}</b>。`, en: `${parts.join(' + ')} = ${total}.`, render: s => { s.innerHTML = wrap(graph(spec, { note: allNotes(spec) }), line(`${parts.join(' + ')} = ${total}`)); } });
    return steps;
  };
  /* l1pgtypes：有几种 {spec} */
  S.l1pgtypes = ({ spec }) => [
    { zh: `问“有几种（types）”，不是数符号，是数有几${rc(spec)}（几个名字）。`, en: 'Count the kinds, not the symbols.', render: s => { s.innerHTML = wrap(graph(spec)); } },
    { zh: `${spec.cats.map((c, i) => `${i + 1}. ${c.label}`).join('　')}，一共 <b>${spec.cats.length}</b> 种。`, en: `${spec.cats.length} types.`, render: s => { s.innerHTML = wrap(graph(spec, { note: Object.fromEntries(spec.cats.map((c, i) => [c.label, `<b>${i + 1}</b>`])) }), line(`${spec.cats.length} types`)); } },
  ];
  /* l1pgpair：哪两类加起来是 total {spec, total, a, b} */
  S.l1pgpair = ({ spec, total, a, b }) => {
    const ca = cat(spec, a), cb = cat(spec, b);
    return [
      { zh: `先数一数每一${rc(spec)}有几个。`, en: 'Count each one.', render: s => { s.innerHTML = wrap(graph(spec, { note: allNotes(spec) })); } },
      { zh: `找两${rc(spec)}加起来是 <b>${total}</b> 的：<b>${a}</b> ${ca.n} + <b>${b}</b> ${cb.n} = ${total}。`, en: `${ca.n} + ${cb.n} = ${total}.`, render: s => { s.innerHTML = wrap(graph(spec, { hl: [a, b], note: allNotes(spec) }), line(`${ca.n} + ${cb.n} = ${total}`)); } },
    ];
  };
  /* l1pgplus：某类加 add 后和 target 一样多 {spec, add, target, ans} */
  S.l1pgplus = ({ spec, add, target, ans }) => {
    const ct = cat(spec, target), ca = cat(spec, ans);
    return [
      { zh: `先看 <b>${target}</b>：<b>${ct.n}</b> 个。`, en: `${target}: ${ct.n}.`, render: s => { s.innerHTML = wrap(graph(spec, { hl: [target], note: { [target]: `<b>${ct.n}</b>` } })); } },
      { zh: `“加 ${add} 个就和它一样多”，那现在应该是 ${ct.n} − ${add} = <b>${ct.n - add}</b> 个。`, en: `${ct.n} − ${add} = ${ct.n - add}.`, render: s => { s.innerHTML = wrap(graph(spec, { hl: [target], note: allNotes(spec) }), line(`${ct.n} − ${add} = ${ct.n - add}`)); } },
      { zh: `哪一${rc(spec)}是 ${ct.n - add} 个？是 <b>${ans}</b>：${ca.n} + ${add} = ${ct.n}。`, en: `${ans}: ${ca.n} + ${add} = ${ct.n}.`, render: s => { s.innerHTML = wrap(graph(spec, { hl: [target, ans], note: allNotes(spec) }), line(`${ca.n} + ${add} = ${ct.n}`)); } },
    ];
  };
  /* l1pgswitch：k 个从 from 换到 to 后一样多 {spec, k, from, to} */
  S.l1pgswitch = ({ spec, k, from, to }) => {
    const cf = cat(spec, from), ct = cat(spec, to);
    return [
      { zh: `${k} 个人换组：一组<b>少 ${k}</b>，另一组<b>多 ${k}</b>，换完一样多，所以这两组原来相差 ${k} + ${k} = <b>${2 * k}</b>。先数一数每一${rc(spec)}。`, en: `The two groups differ by ${2 * k}.`, render: s => { s.innerHTML = wrap(graph(spec, { note: allNotes(spec) })); } },
      { zh: `相差 ${2 * k} 的是 <b>${from}</b>（${cf.n}）和 <b>${to}</b>（${ct.n}）：${cf.n} − ${ct.n} = ${2 * k}。`, en: `${cf.n} − ${ct.n} = ${2 * k}.`, render: s => { s.innerHTML = wrap(graph(spec, { hl: [from, to], note: allNotes(spec) }), line(`${cf.n} − ${ct.n} = ${2 * k}`)); } },
      { zh: `从多的 <b>${from}</b> 换到少的 <b>${to}</b>：${cf.n} − ${k} = ${cf.n - k}，${ct.n} + ${k} = ${ct.n + k}，一样多了。`, en: `${cf.n} − ${k} = ${cf.n - k}, ${ct.n} + ${k} = ${ct.n + k}.`, render: s => { s.innerHTML = wrap(graph(spec, { hl: [from, to], counts: spec.cats.map(c => c.label === from ? c.n - k : c.label === to ? c.n + k : c.n), note: { [from]: `${cf.n} − ${k} = <b>${cf.n - k}</b>`, [to]: `${ct.n} + ${k} = <b>${ct.n + k}</b>` } }), line(`${from} → ${to}`)); } },
    ];
  };
  /* l1pgmake：看图画象形图 {pic, spec} */
  S.l1pgmake = ({ pic, spec, rows }) => {
    const img = pic ? `<div class="center"><img class="figimg" src="img/${pic}.png" alt="" style="max-width:460px"></div>` : `<div class="center">${window.PG.scene(spec.cats, rows)}</div>`;
    const steps = [{ zh: `先在图里找每一种，一种一种数。`, en: 'Count each kind in the picture.', render: s => { s.innerHTML = wrap(img); } }];
    spec.cats.forEach((c, i) => steps.push({ zh: `${c.icon || ''} <b>${c.label}</b>：数一数，有 <b>${c.n}</b> 个，就画 ${c.n} 个 ${sym(spec.sym)}。`, en: `${c.label}: ${c.n}.`, render: s => { s.innerHTML = wrap(img, graph(spec, { hl: [c.label], counts: spec.cats.map((x, j) => j <= i ? x.n : 0), note: { [c.label]: `<b>${c.n}</b>` } })); } }));
    steps.push({ zh: `画好了：${spec.cats.map(c => `${c.label} ${c.n}`).join('，')}。`, en: 'Done.', render: s => { s.innerHTML = wrap(graph(spec, { note: allNotes(spec) })); } });
    return steps;
  };

  /* ---------- 题型 l1pgmake：看图，在每一列/行输入数量，符号跟着画出来 q = { id, type:'l1pgmake', pic, spec, prompt?, hint? } */
  window.QTypes.l1pgmake = q => {
    const spec = q.spec, want = spec.cats.map(c => c.n);
    let counts = spec.cats.map(c => c.fixed !== undefined ? c.fixed : 0);
    const html = () => `<div class="pgmake"><div class="center"><img class="figimg" src="img/${q.pic}.png" alt="" style="max-width:460px"></div>
      <div class="center sub mt">👇 数一数每一种有几个，把数字填在格子里，${sym(spec.sym)} 会自动画出来</div><div id="pgg">${graph(spec, { counts, live: true })}</div>
      <div class="center mt"><button class="btn ok" id="submit">检查 ✔</button></div></div>`;
    function paint(box, i) {
      const el = box.querySelector(`[data-i="${i}"] .pg-stack`); if (!el) return;
      el.innerHTML = rep(spec.sym, counts[i]); el.classList.toggle('wide', spec.wide || counts[i] > 8);
    }
    function bind(box, submit) {
      delete box.dataset.locked;
      const ins = [...box.querySelectorAll('.pg-in')];
      ins.forEach((inp, k) => {
        inp.oninput = () => { inp.value = inp.value.replace(/\D/g, '').slice(0, 2); counts[+inp.dataset.i] = inp.value === '' ? 0 : Math.min(20, +inp.value); paint(box, +inp.dataset.i); };
        inp.onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); const nx = ins.slice(k + 1).find(x => !x.disabled); if (nx) nx.focus(); else submit(); } };
      });
      $('#submit', box).onclick = () => submit();
      const first = ins.find(x => !x.disabled); if (first) first.focus({ preventScroll: true });
    }
    const value = () => counts.every((c, i) => c === 0 || spec.cats[i].fixed !== undefined) ? null : JSON.stringify(counts);
    const check = val => { try { const v = JSON.parse(val); return v.length === want.length && v.every((c, i) => c === want[i]); } catch (e) { return false; } };
    function mark(box, v) { box.querySelectorAll('.pg-col, .pg-row').forEach(el => { const i = +el.dataset.i; el.classList.add(v[i] === want[i] ? 'right' : 'wrong'); const inp = el.querySelector('.pg-in'); if (inp) { inp.value = v[i] || ''; inp.classList.add(v[i] === want[i] ? 'good' : 'badf'); } paint(box, i); }); }
    function markWrong(box, val) { counts = JSON.parse(val); box.querySelectorAll('.pg-col, .pg-row').forEach(el => el.classList.remove('right', 'wrong')); box.querySelectorAll('.pg-in').forEach(i => i.classList.remove('good', 'badf')); mark(box, counts); const bad = [...box.querySelectorAll('.pg-in.badf')][0]; if (bad) bad.select(); }
    function lock(box) { box.querySelectorAll('input').forEach(i => i.disabled = true); const s = box.querySelector('#submit'); if (s) s.disabled = true; }
    function showAnswer(box) { counts = want.slice(); mark(box, counts); lock(box); }
    function restore(box, val) { try { counts = JSON.parse(val || 'null') || spec.cats.map(c => c.fixed || 0); } catch (e) { counts = spec.cats.map(c => c.fixed || 0); } mark(box, counts); lock(box); }
    return {
      prompt: q.prompt || { zh: '看图数一数，画出象形图', en: 'Study the picture carefully. Draw a picture graph.' }, stage: '',
      custom: { html, bind, value, markWrong, showAnswer, lock, restore },
      hint: q.hint || { zh: '一种一种数，数完一种填一个数。', en: 'Count one kind at a time.' },
      answerText: spec.cats.map(c => `${c.label} ${c.n}`).join(', '), check,
      answerDisplay: val => { try { return JSON.parse(val).map((c, i) => `${spec.cats[i].label} ${c}`).join(', '); } catch (e) { return val; } },
      explainKind: 'l1pgmake', n: { pic: q.pic, spec },
    };
  };

  window.L1.pgraph = graph;
})();
