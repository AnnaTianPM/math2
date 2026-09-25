/* 象形图（Unit 16）：图表绘制、讲解动画、题型 pgmake（画象形图） */
(function () {
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '"': '&quot;', '>': '&gt;' }[c]));
  const line = t => `<div class="expand-line">${t}</div>`;
  const sym = (s, cls) => `<span class="pg-sym ${cls || ''}">${s}</span>`;
  const rep = (s, n, cls) => Array.from({ length: n }, () => sym(s, cls)).join('');
  const RECT = '<span class="pg-rect"></span>';
  const PAPAYA = '<svg viewBox="0 0 40 40" width="1em" height="1em" style="vertical-align:-0.15em"><ellipse cx="20" cy="22" rx="12" ry="16" fill="#f5a623" stroke="#c77d12" stroke-width="2"/><path d="M20 6 q3 -4 6 -3" stroke="#3a8f2f" stroke-width="3" fill="none"/><ellipse cx="20" cy="24" rx="5" ry="8" fill="#e8834b"/><circle cx="19" cy="21" r="1.4" fill="#4a2a10"/><circle cx="22" cy="25" r="1.4" fill="#4a2a10"/><circle cx="18" cy="28" r="1.4" fill="#4a2a10"/></svg>';

  /* graph(spec, o)
   * spec = { title, cats:[{label, n, icon?}], sym, scale, unit, vertical }
   * o = { hl:[labels], counts:[...] 覆盖每类符号数, showNum:bool 显示 n×scale, scaleText 覆盖比例文字, live:bool 带加减按钮, note:{label:html} } */
  function graph(spec, o = {}) {
    const hl = new Set(o.hl || []), note = o.note || {};
    const cnt = (c, i) => o.counts ? o.counts[i] : c.n;
    const scaleTxt = o.scaleText !== undefined ? o.scaleText : spec.scale;
    const foot = `<div class="pg-foot">Each ${sym(spec.sym)} stands for <b>${scaleTxt}</b> ${spec.unit}.</div>`;
    const title = spec.title ? `<div class="pg-title">${spec.title}</div>` : '';
    if (spec.vertical) {
      const cols = spec.cats.map((c, i) => `<div class="pg-col ${hl.has(c.label) ? 'hl' : ''}" data-i="${i}">
        ${o.showNum ? `<div class="pg-num">${cnt(c, i)}</div>` : ''}
        <div class="pg-stack">${rep(spec.sym, cnt(c, i), o.live ? 'live' : '')}</div>
        <div class="pg-lab">${c.icon ? `<span class="pg-ico">${c.icon}</span>` : ''}<span>${c.label}</span></div>
        ${o.live ? `<div class="pg-ctl"><button type="button" class="pgm" data-i="${i}" title="减一个">−</button><button type="button" class="pgp" data-i="${i}" title="加一个">+</button></div>` : ''}
        ${note[c.label] ? `<div class="pg-note">${note[c.label]}</div>` : ''}</div>`).join('');
      return `<div class="pg ${o.cls || ''}">${title}<div class="pg-vert" style="--n:${spec.cats.length}">${cols}</div>${foot}</div>`;
    }
    const rows = spec.cats.map((c, i) => `<div class="pg-row ${hl.has(c.label) ? 'hl' : ''}"><div class="pg-lab">${c.label}</div><div class="pg-cells">${rep(spec.sym, cnt(c, i))}${o.showNum ? `<span class="pg-num">${cnt(c, i)} × ${spec.scale} = ${cnt(c, i) * spec.scale}</span>` : ''}${note[c.label] ? `<span class="pg-note">${note[c.label]}</span>` : ''}</div></div>`).join('');
    return `<div class="pg ${o.cls || ''}">${title}<div class="pg-horiz">${rows}</div>${foot}</div>`;
  }
  /* 原始数据图：竖列（像书上）items=[{label, icon, n}]；o.hl 高亮某列；o.count 显示数量 */
  function chart(items, o = {}) {
    const hl = new Set([].concat(o.hl || []));
    return `<div class="pg-chart" style="--n:${items.length}">${items.map(it => `<div class="pgc-col ${hl.has(it.label) ? 'hl' : ''}"><div class="pgc-stack">${rep(it.icon, it.n)}</div>${o.count ? `<div class="pgc-cnt">${it.n}</div>` : ''}<div class="pgc-lab">${it.label}</div></div>`).join('')}</div>`;
  }
  /* 散布场景：rows = [[itemIndex,...],...] ；o.hl 高亮某类 */
  function scene(items, rows, o = {}) {
    const hl = o.hl ? items.findIndex(i => i.label === o.hl) : -1;
    return `<div class="pg-scene">${rows.map(r => `<div class="pgs-row">${r.map(i => sym(items[i].icon, hl === i ? 'hl' : (hl >= 0 ? 'dim' : ''))).join('')}</div>`).join('')}${o.count ? `<div class="pgs-cnt">${items.map(it => `<span>${it.icon} × <b>${it.n}</b></span>`).join('')}</div>` : ''}</div>`;
  }
  const cat = (spec, label) => spec.cats.find(c => c.label === label);
  const total = (spec, label) => cat(spec, label).n * spec.scale;

  const S = window.StepKinds;
  /* pgcount：某一类有多少 {spec, cat, sentence?} */
  S.pgcount = ({ spec, cat: L, sentence }) => {
    const c = cat(spec, L), t = c.n * spec.scale;
    return [
      { zh: `先看图下面的说明：每个 ${sym(spec.sym)} 代表 <b>${spec.scale}</b> 个（${spec.unit}）。`, en: `Each ${spec.sym} stands for ${spec.scale} ${spec.unit}.`, render: s => { s.innerHTML = graph(spec); } },
      { zh: `找到 <b>${L}</b> 这一${spec.vertical ? '列' : '行'}，数一数有几个 ${sym(spec.sym)}：<b>${c.n}</b> 个。`, en: `Find ${L}: ${c.n} ${spec.sym}.`, render: s => { s.innerHTML = graph(spec, { hl: [L], note: { [L]: `${c.n} 个` } }); } },
      { zh: `${c.n} 个 ${sym(spec.sym)}，每个代表 ${spec.scale}：<b>${c.n} × ${spec.scale} = ${t}</b>。${sentence ? sentence.replace('__', `<b>${t}</b>`) : ''}`, en: `${c.n} × ${spec.scale} = ${t}.`, render: s => { s.innerHTML = graph(spec, { hl: [L], note: { [L]: `${c.n} × ${spec.scale} = <b>${t}</b>` } }) + line(`${c.n} × ${spec.scale} = ${t}`); } },
    ];
  };
  /* pgdiff：两类相差 {spec, a, b, word:'more'|'fewer'} 答案 = |a-b| */
  S.pgdiff = ({ spec, a, b, word }) => {
    const ta = total(spec, a), tb = total(spec, b), big = Math.max(ta, tb), small = Math.min(ta, tb);
    return [
      { zh: `先算 <b>${a}</b>：${cat(spec, a).n} 个 ${sym(spec.sym)}，${cat(spec, a).n} × ${spec.scale} = <b>${ta}</b>。`, en: `${a}: ${cat(spec, a).n} × ${spec.scale} = ${ta}.`, render: s => { s.innerHTML = graph(spec, { hl: [a], note: { [a]: `${cat(spec, a).n} × ${spec.scale} = <b>${ta}</b>` } }); } },
      { zh: `再算 <b>${b}</b>：${cat(spec, b).n} 个 ${sym(spec.sym)}，${cat(spec, b).n} × ${spec.scale} = <b>${tb}</b>。`, en: `${b}: ${cat(spec, b).n} × ${spec.scale} = ${tb}.`, render: s => { s.innerHTML = graph(spec, { hl: [a, b], note: { [a]: `<b>${ta}</b>`, [b]: `${cat(spec, b).n} × ${spec.scale} = <b>${tb}</b>` } }); } },
      { zh: `问"${word === 'fewer' ? '少多少（fewer）' : '多多少（more）'}"，用大的减小的：<b>${big} − ${small} = ${big - small}</b>。`, en: `${big} − ${small} = ${big - small}.`, render: s => { s.innerHTML = graph(spec, { hl: [a, b], note: { [a]: `<b>${ta}</b>`, [b]: `<b>${tb}</b>` } }) + line(`${big} − ${small} = ${big - small}`); } },
    ];
  };
  /* pgmost：最多/最少 {spec, which:'most'|'least'} */
  S.pgmost = ({ spec, which }) => {
    const sorted = spec.cats.slice().sort((x, y) => which === 'most' ? y.n - x.n : x.n - y.n), win = sorted[0];
    return [
      { zh: `每个 ${sym(spec.sym)} 代表的数量一样，所以 ${sym(spec.sym)} <b>越${which === 'most' ? '多' : '少'}</b>，数量就越${which === 'most' ? '多' : '少'}。不用算，直接比符号的个数。`, en: `Same scale, so just compare the number of ${spec.sym}.`, render: s => { s.innerHTML = graph(spec); } },
      { zh: `数一数每${spec.vertical ? '列' : '行'}的 ${sym(spec.sym)}：${spec.cats.map(c => `${c.label} ${c.n}`).join('，')}。`, en: spec.cats.map(c => `${c.label} ${c.n}`).join(', '), render: s => { s.innerHTML = graph(spec, { note: Object.fromEntries(spec.cats.map(c => [c.label, `${c.n} 个`])) }); } },
      { zh: `${which === 'most' ? '最多' : '最少'}的是 <b>${win.label}</b>（${win.n} 个 ${sym(spec.sym)}，${win.n} × ${spec.scale} = ${win.n * spec.scale}）。`, en: `${which === 'most' ? 'Most' : 'Least'}: ${win.label}.`, render: s => { s.innerHTML = graph(spec, { hl: [win.label], note: { [win.label]: `<b>${which === 'most' ? '最多' : '最少'}</b>` } }) + line(`${which === 'most' ? 'most' : 'least'}: ${win.label}`); } },
    ];
  };
  /* pgscale：求比例 {spec, cat, total} */
  S.pgscale = ({ spec, cat: L, total: T }) => {
    const c = cat(spec, L), sc = T / c.n;
    return [
      { zh: `题目告诉我们：<b>${L}</b> 一共是 <b>${T}</b>（${spec.unit}）。可是图上没说每个 ${sym(spec.sym)} 代表几个。`, en: `${L}: ${T} in total. The scale is missing.`, render: s => { s.innerHTML = graph(spec, { hl: [L], scaleText: '?' }); } },
      { zh: `数一数 ${L} 有几个 ${sym(spec.sym)}：<b>${c.n}</b> 个。${c.n} 个 ${sym(spec.sym)} 一共代表 ${T}。`, en: `${L} has ${c.n} ${spec.sym} = ${T}.`, render: s => { s.innerHTML = graph(spec, { hl: [L], scaleText: '?', note: { [L]: `${c.n} 个 = ${T}` } }); } },
      { zh: `平均分：<b>${T} ÷ ${c.n} = ${sc}</b>。所以每个 ${sym(spec.sym)} 代表 <b>${sc}</b>（${spec.unit}）。`, en: `${T} ÷ ${c.n} = ${sc}. Each ${spec.sym} stands for ${sc}.`, render: s => { s.innerHTML = graph(spec, { hl: [L], scaleText: sc, note: { [L]: `${T} ÷ ${c.n} = <b>${sc}</b>` } }) + line(`${T} ÷ ${c.n} = ${sc}`); } },
    ];
  };
  /* pgsum：几类相加 {spec, cats:[...]} */
  S.pgsum = ({ spec, cats }) => {
    const vals = cats.map(L => total(spec, L)), sum = vals.reduce((a, b) => a + b, 0);
    const note = Object.fromEntries(cats.map(L => [L, `${cat(spec, L).n} × ${spec.scale} = <b>${total(spec, L)}</b>`]));
    return [
      { zh: `要把 <b>${cats.join('、')}</b> ${cats.length > 2 ? '都' : '两个'}加起来。先分别算出每一${spec.vertical ? '列' : '行'}。`, en: `Add ${cats.join(' + ')}.`, render: s => { s.innerHTML = graph(spec, { hl: cats }); } },
      { zh: cats.map(L => `${L}：${cat(spec, L).n} × ${spec.scale} = <b>${total(spec, L)}</b>`).join('；') + '。', en: cats.map(L => `${L} ${total(spec, L)}`).join(', '), render: s => { s.innerHTML = graph(spec, { hl: cats, note }); } },
      { zh: `加起来：<b>${vals.join(' + ')} = ${sum}</b>。`, en: `${vals.join(' + ')} = ${sum}.`, render: s => { s.innerHTML = graph(spec, { hl: cats, note }) + line(`${vals.join(' + ')} = ${sum}`); } },
    ];
  };
  /* pgpart：总数减去已知部分 {spec, cat, given, givenLabel, askLabel} */
  S.pgpart = ({ spec, cat: L, given, givenLabel, askLabel }) => {
    const c = cat(spec, L), T = c.n * spec.scale;
    return [
      { zh: `先算 <b>${L}</b> 一共有多少人：${c.n} 个 ${sym(spec.sym)}，${c.n} × ${spec.scale} = <b>${T}</b>。`, en: `${L}: ${c.n} × ${spec.scale} = ${T}.`, render: s => { s.innerHTML = graph(spec, { hl: [L], note: { [L]: `${c.n} × ${spec.scale} = <b>${T}</b>` } }); } },
      { zh: `这 ${T} 人里有 <b>${given}</b> 个${givenLabel}，其余的都是${askLabel}。`, en: `${T} people: ${given} ${givenLabel}, the rest are ${askLabel}.`, render: s => { s.innerHTML = graph(spec, { hl: [L], note: { [L]: `<b>${T}</b> = ${given} ${givenLabel} + ? ${askLabel}` } }); } },
      { zh: `用总数减去${givenLabel}：<b>${T} − ${given} = ${T - given}</b>。`, en: `${T} − ${given} = ${T - given}.`, render: s => { s.innerHTML = graph(spec, { hl: [L] }) + line(`${T} − ${given} = ${T - given}`); } },
    ];
  };
  /* pgplus：某类加上一个数，找是哪一类 {spec, cat, add} */
  S.pgplus = ({ spec, cat: L, add }) => {
    const c = cat(spec, L), T = c.n * spec.scale, target = T + add, ans = spec.cats.find(x => x.n * spec.scale === target);
    return [
      { zh: `先算 <b>${L}</b>：${c.n} × ${spec.scale} = <b>${T}</b>。`, en: `${L}: ${c.n} × ${spec.scale} = ${T}.`, render: s => { s.innerHTML = graph(spec, { hl: [L], note: { [L]: `${c.n} × ${spec.scale} = <b>${T}</b>` } }); } },
      { zh: `"${L} 比它少 ${add}"，就是它比 ${L} 多 ${add}：<b>${T} + ${add} = ${target}</b>。`, en: `${T} + ${add} = ${target}.`, render: s => { s.innerHTML = graph(spec, { hl: [L], note: { [L]: `<b>${T}</b>` } }) + line(`${T} + ${add} = ${target}`); } },
      { zh: `哪一${spec.vertical ? '列' : '行'}是 ${target}？${target} ÷ ${spec.scale} = ${target / spec.scale} 个 ${sym(spec.sym)}，是 <b>${ans.label}</b>。`, en: `${target} = ${ans.n} ${spec.sym}: ${ans.label}.`, render: s => { s.innerHTML = graph(spec, { hl: [L, ans.label], note: { [L]: `<b>${T}</b>`, [ans.label]: `${ans.n} × ${spec.scale} = <b>${target}</b>` } }) + line(`${ans.label}`); } },
    ];
  };
  /* pgmake：画象形图 {items:[{label, icon, n}], scale, sym, rows?(散布场景), unit} */
  S.pgmake = ({ items, scale, sym: SY, rows, unit }) => {
    const src = o => rows ? scene(items, rows, o) : chart(items, o);
    const spec = { cats: items.map(it => ({ label: it.label, n: it.n / scale, icon: it.icon })), sym: SY, scale, unit: unit || 'items', vertical: true };
    const steps = [{ zh: `先数一数每一种有多少个。`, en: 'Count each kind first.', render: s => { s.innerHTML = src({}); } }];
    items.forEach(it => steps.push({ zh: `${it.icon} <b>${it.label}</b>：数一数，有 <b>${it.n}</b> 个。`, en: `${it.label}: ${it.n}.`, render: s => { s.innerHTML = src({ hl: it.label, hl2: it.label }); } }));
    steps.push({ zh: `每个 ${sym(SY)} 代表 <b>${scale}</b> 个，所以要用数量 ÷ ${scale}：${items.map(it => `${it.label} ${it.n} ÷ ${scale} = <b>${it.n / scale}</b>`).join('，')}。`, en: `Divide each by ${scale}.`, render: s => { s.innerHTML = src({ count: true }) + line(items.map(it => `${it.n} ÷ ${scale} = ${it.n / scale}`).join('　')); } });
    steps.push({ zh: `在图上每一列画出对应个数的 ${sym(SY)}：${items.map(it => `${it.label} ${it.n / scale} 个`).join('，')}。`, en: 'Draw the symbols in each column.', render: s => { s.innerHTML = graph(spec, { showNum: true }); } });
    return steps;
  };

  /* ---------- 题型 pgmake：点 + − 画象形图 q = { id, type:'pgmake', items, scale, sym, rows?, unit, title, prompt?, hint? } */
  window.QTypes.pgmake = q => {
    const spec = { title: q.title, cats: q.items.map(it => ({ label: it.label, n: it.n / q.scale, icon: it.icon })), sym: q.sym, scale: q.scale, unit: q.unit || 'items', vertical: true };
    const want = spec.cats.map(c => c.n);
    let counts = want.map(() => 0);
    const html = () => `<div class="pgmake">${q.rows ? scene(q.items, q.rows) : chart(q.items)}<div class="center sub mt">👇 点每一列下面的 <b>+</b> 加一个 ${sym(q.sym)}，<b>−</b> 减一个 ${sym(q.sym)}</div><div id="pgg">${graph(spec, { counts, live: true })}</div>
      <div class="center mt"><button class="btn secondary small" id="clearAll">清空</button> <button class="btn ok" id="submit">检查 ✔</button></div></div>`;
    function refresh(box, marks) {
      const g = box.querySelector('#pgg'); g.innerHTML = graph(spec, { counts, live: !box.dataset.locked });
      if (marks) g.querySelectorAll('.pg-col').forEach((col, i) => col.classList.add(marks[i] ? 'right' : 'wrong'));
      bindBtns(box);
    }
    function bindBtns(box) {
      box.querySelectorAll('.pgp').forEach(b => b.onclick = () => { if (box.dataset.locked) return; const i = +b.dataset.i; if (counts[i] < 12) counts[i]++; refresh(box); });
      box.querySelectorAll('.pgm').forEach(b => b.onclick = () => { if (box.dataset.locked) return; const i = +b.dataset.i; if (counts[i] > 0) counts[i]--; refresh(box); });
    }
    function bind(box, submit) {
      counts = want.map(() => 0); refresh(box);
      box.querySelector('#clearAll').onclick = () => { if (box.dataset.locked) return; counts = want.map(() => 0); refresh(box); };
      box.querySelector('#submit').onclick = () => submit();
    }
    const value = () => counts.every(c => c === 0) ? null : JSON.stringify(counts);
    const check = val => { try { const v = JSON.parse(val); return v.length === want.length && v.every((c, i) => c === want[i]); } catch (e) { return false; } };
    function markWrong(box, val) { const v = JSON.parse(val); counts = v; refresh(box, v.map((c, i) => c === want[i])); }
    function lock(box) { box.dataset.locked = '1'; box.querySelectorAll('#clearAll, #submit, .pgp, .pgm').forEach(b => b.disabled = true); }
    function showAnswer(box) { counts = want.slice(); refresh(box, want.map(() => true)); lock(box); }
    function restore(box, val) { try { counts = JSON.parse(val || 'null') || want.map(() => 0); } catch (e) { counts = want.map(() => 0); } refresh(box, counts.map((c, i) => c === want[i])); lock(box); }
    return {
      prompt: q.prompt || { zh: '数一数每种有多少个，再在下面的象形图里画出来', en: 'Count each kind and complete the picture graph.' }, stage: '',
      custom: { html, bind, value, markWrong, showAnswer, lock, restore },
      hint: q.hint || { zh: `先数每一种的个数，再除以 ${q.scale}（每个 ${q.sym} 代表 ${q.scale} 个）。`, en: `Count each kind, then divide by ${q.scale}.` },
      answerText: spec.cats.map(c => `${c.label} ${c.n}`).join(', '), check,
      answerDisplay: val => { try { return JSON.parse(val).map((c, i) => `${spec.cats[i].label} ${c}`).join(', '); } catch (e) { return val; } },
      explainKind: 'pgmake', n: { items: q.items, scale: q.scale, sym: q.sym, rows: q.rows, unit: q.unit },
    };
  };

  window.PG = { graph, chart, scene, RECT, PAPAYA };
})();
