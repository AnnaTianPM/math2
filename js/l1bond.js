/* Level 1：数字组合（number bond）绘制、讲解、题型 bond */
(function () {
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '"': '&quot;', '>': '&gt;' }[c]));
  const line = t => `<div class="expand-line">${t}</div>`;
  const L = window.L1;

  /* bond(w, a, b, o)：值可为数字、'?'、或 {input:key}；o.hl = 'w'|'a'|'b' 高亮 */
  function bond(w, a, b, o = {}) {
    const cell = (v, k) => {
      const hl = o.hl === k ? 'hl' : '';
      if (v && typeof v === 'object' && v.input) return `<span class="bond-c ${k} ${hl}"><input class="blank bondin" data-key="${v.input}" type="text" inputmode="numeric" maxlength="2" autocomplete="off"></span>`;
      return `<span class="bond-c ${k} ${hl} ${v === '?' ? 'q' : ''}">${v === undefined || v === null ? '' : v}</span>`;
    };
    return `<span class="bond ${o.cls || ''}"><svg viewBox="0 0 220 150" width="220" height="150"><line x1="86" y1="66" x2="150" y2="40" stroke="#2b2b3a" stroke-width="2.5"/><line x1="86" y1="84" x2="150" y2="110" stroke="#2b2b3a" stroke-width="2.5"/></svg>${cell(w, 'w')}${cell(a, 'a')}${cell(b, 'b')}</span>`;
  }
  /* 两组物品并排：groups = [{icon, n, cls?}] ；o.nums 标号；o.hl 高亮第几组 */
  function groups(gs, o = {}) {
    return `<div class="bond-groups">${gs.map((g, i) => `<span class="bond-grp ${o.hl === i ? 'hl' : ''} ${o.dim !== undefined && o.dim !== i ? 'dim' : ''}">${L.row(g.icon, g.n, { nums: o.nums === i || o.nums === 'all' ? g.n : undefined, cls: g.cls || '' })}${o.count ? `<b class="grp-cnt">${g.n}</b>` : ''}</span>`).join('<span class="bond-plus">＋</span>')}</div>`;
  }
  const wrap = (...parts) => `<div class="l1wrap">${parts.join('')}</div>`;

  const S = window.StepKinds;
  /* l1bond：看图做数字组合 {groups:[{icon,n},{icon,n}], label?} */
  S.l1bond = ({ groups: gs }) => {
    const a = gs[0].n, b = gs[1].n, w = a + b;
    return [
      { zh: `图里有两种：先数第一种，有 <b>${a}</b> 个。`, en: `Count the first kind: ${a}.`, render: s => { s.innerHTML = wrap(groups(gs, { nums: 0, hl: 0 }), bond('?', a, '?', { hl: 'a' })); } },
      { zh: `再数第二种，有 <b>${b}</b> 个。`, en: `Count the second kind: ${b}.`, render: s => { s.innerHTML = wrap(groups(gs, { nums: 1, hl: 1 }), bond('?', a, b, { hl: 'b' })); } },
      { zh: `合在一起数一数，一共 <b>${w}</b> 个。${a} and ${b} make <b>${w}</b>。大圈写整体 ${w}，两个小圈写部分 ${a} 和 ${b}。`, en: `${a} and ${b} make ${w}.`, render: s => { s.innerHTML = wrap(groups(gs, { nums: 'all' }), bond(w, a, b, { hl: 'w' }), line(`${a} and ${b} make ${w}`)); } },
    ];
  };
  /* l1bondwhole：已知两部分求整体 {a, b} */
  S.l1bondwhole = ({ a, b }) => {
    const w = a + b;
    return [
      { zh: `两个小圈是部分：${a} 和 ${b}。大圈要填的是<b>合起来</b>一共多少。`, en: `The parts are ${a} and ${b}. The whole is how many altogether.`, render: s => { s.innerHTML = wrap(bond('?', a, b, { hl: 'w' })); } },
      { zh: `画点点：${a} 个和 ${b} 个放在一起。`, en: `Draw ${a} dots and ${b} dots.`, render: s => { s.innerHTML = wrap(groups([{ icon: '🟠', n: a }, { icon: '🔵', n: b }], { count: true }), bond('?', a, b)); } },
      { zh: `全部数一遍：一共 <b>${w}</b>。${a} and ${b} make <b>${w}</b>。`, en: `${a} and ${b} make ${w}.`, render: s => { s.innerHTML = wrap(groups([{ icon: '🟠', n: a }, { icon: '🔵', n: b }], { nums: 'all' }), bond(w, a, b, { hl: 'w' }), line(`${a} and ${b} make ${w}`)); } },
    ];
  };
  /* l1bondpart：已知整体和一部分求另一部分 {w, a} */
  S.l1bondpart = ({ w, a }) => {
    const b = w - a;
    return [
      { zh: `大圈是整体 <b>${w}</b>，一个小圈是 <b>${a}</b>。要找另一个小圈。`, en: `The whole is ${w}. One part is ${a}. Find the other part.`, render: s => { s.innerHTML = wrap(bond(w, a, '?', { hl: 'b' })); } },
      { zh: `先画 ${w} 个点，把 <b>${a}</b> 个圈起来当第一部分。`, en: `Draw ${w} dots. Circle ${a} of them.`, render: s => { s.innerHTML = wrap(`<div class="center">${L.row('🟠', w, { hl: Array.from({ length: a }, (_, i) => i), dim: true })}</div>`, bond(w, a, '?')); } },
      { zh: `剩下的数一数：<b>${b}</b> 个。所以 ${a} and <b>${b}</b> make ${w}。`, en: `${b} are left. ${a} and ${b} make ${w}.`, render: s => { s.innerHTML = wrap(`<div class="center">${L.row('🟠', w, { hl: Array.from({ length: b }, (_, i) => a + i), dim: true })}</div>`, bond(w, a, b, { hl: 'b' }), line(`${a} and ${b} make ${w}`)); } },
    ];
  };
  /* l1bondmatch：凑成 total 的所有组合 {total, a?} */
  S.l1bondmatch = ({ total, a }) => {
    const pairs = Array.from({ length: total + 1 }, (_, i) => [i, total - i]);
    const one = a !== undefined ? a : Math.floor(total / 2);
    return [
      { zh: `要凑成 <b>${total}</b>。拿一个数，比如 ${one}：画 ${total} 个点，圈掉 ${one} 个，剩下几个就是它的搭档。`, en: `Make ${total}. Take ${one}: draw ${total} dots, circle ${one}, the rest is its partner.`, render: s => { s.innerHTML = wrap(`<div class="center">${L.row('🟠', total, { hl: Array.from({ length: one }, (_, i) => i), dim: true })}</div>`, bond(total, one, '?', { hl: 'b' })); } },
      { zh: `剩下 <b>${total - one}</b> 个：${one} and ${total - one} make ${total}。`, en: `${one} and ${total - one} make ${total}.`, render: s => { s.innerHTML = wrap(`<div class="center">${L.row('🟠', total, { hl: Array.from({ length: total - one }, (_, i) => one + i), dim: true })}</div>`, bond(total, one, total - one, { hl: 'b' }), line(`${one} and ${total - one} make ${total}`)); } },
      { zh: `凑成 ${total} 的搭档：${pairs.map(([x, y]) => `${x}+${y}`).join('，')}。两个数一个变大，另一个就变小。`, en: `Pairs that make ${total}: ${pairs.map(([x, y]) => `${x} and ${y}`).join(', ')}.`, render: s => { s.innerHTML = `<div class="wordtab">${pairs.map(([x, y]) => `<span class="${x === one ? 'hl' : ''}"><b>${x} + ${y}</b>${total}</span>`).join('')}</div>`; } },
    ];
  };

  /* ---------- 题型 bond：q = {id, type:'bond', w, a, b, blank:['w'|'a'|'b',...], pic, prompt, hint, explain, anyOrder} ---------- */
  window.QTypes.bond = q => {
    const blanks = q.blank;
    const val = k => blanks.includes(k) ? { input: k } : q[k];
    const html = () => `<div class="bondq">${q.pic || ''}<div class="center mt">${bond(val('w'), val('a'), val('b'))}</div>${q.text ? `<div class="fill">${q.text}</div>` : ''}<div class="center mt"><button class="btn ok" id="submit">检查 ✔</button></div></div>`;
    const inputs = box => [...box.querySelectorAll('input.bondin')];
    function bind(box, submit) { const ins = inputs(box); ins.forEach(i => { i.onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); submit(); } }; }); box.querySelector('#submit').onclick = () => submit(); if (ins[0]) ins[0].focus({ preventScroll: true }); }
    const value = box => { const v = {}; let any = false; inputs(box).forEach(i => { const t = i.value.trim(); if (t) any = true; v[i.dataset.key] = t; }); return any ? JSON.stringify(v) : null; };
    const okMap = v => { const m = {}; const swap = q.anyOrder !== false && blanks.includes('a') && blanks.includes('b') && String(v.a) === String(q.b) && String(v.b) === String(q.a) && v.a !== v.b; blanks.forEach(k => { m[k] = swap ? true : String(v[k]) === String(q[k]); }); return m; };
    const check = s => { try { const m = okMap(JSON.parse(s)); return blanks.every(k => m[k]); } catch (e) { return false; } };
    function markWrong(box, s) { const v = JSON.parse(s), m = okMap(v); inputs(box).forEach(i => { const ok = m[i.dataset.key]; i.classList.toggle('good', ok); i.classList.toggle('badf', !ok); if (ok) i.disabled = true; }); }
    function lock(box) { inputs(box).forEach(i => i.disabled = true); box.querySelector('#submit').disabled = true; }
    function showAnswer(box) { inputs(box).forEach(i => { i.value = q[i.dataset.key]; i.classList.remove('badf'); i.classList.add('good'); }); lock(box); }
    function restore(box, s, status) { try { const v = JSON.parse(s || '{}'), m = okMap(v); inputs(box).forEach(i => { i.value = v[i.dataset.key] || ''; i.classList.add(m[i.dataset.key] ? 'good' : 'badf'); }); } catch (e) { /* */ } lock(box); }
    const ansText = `${q.a} and ${q.b} make ${q.w}`;
    return {
      prompt: q.prompt || { zh: '把数字组合填完整', en: 'Complete the number bond.' }, stage: '',
      custom: { html, bind, value, markWrong, showAnswer, lock, restore },
      hint: q.hint || { zh: '大圈是整体（一共），两个小圈是部分。两个部分合起来等于整体。', en: 'The two parts make the whole.' },
      answerText: ansText, check,
      answerDisplay: s => { try { const v = JSON.parse(s); return ['w', 'a', 'b'].map(k => blanks.includes(k) ? (v[k] || '_') : q[k]).join(' / '); } catch (e) { return s; } },
      explainKind: q.explain[0], n: q.explain[1],
    };
  };

  window.L1.bond = bond; window.L1.groups = groups;
})();
