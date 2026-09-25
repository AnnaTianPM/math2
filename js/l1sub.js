/* Level 1：10 以内减法的讲解动画（划掉、剩下几个、往后数、往回数、数字组合减、减法故事、应用题、算式家族）+ 题型 crossout */
(function () {
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '"': '&quot;', '>': '&gt;' }[c]));
  const line = t => `<div class="expand-line">${t}</div>`;
  const L = window.L1;
  const wrap = (...parts) => `<div class="l1wrap">${parts.join('')}</div>`;
  const img = (name, w) => `<img class="figimg" src="img/${name}.png" alt="" style="max-width:${w || 360}px">`;
  const seq = (from, to) => { const r = []; for (let i = from; i <= to; i++) r.push(i); return r; };
  /* 一排 icon，后 k 个划掉（或指定下标） */
  const crossRow = (icon, n, gone, o = {}) => L.row(icon, n, Object.assign({ gone: Array.isArray(gone) ? gone : seq(n - gone, n - 1) }, o));
  /* 数字条 1..10：circled = 圈起来的数；hops = [[from,to]...] 跳；dir back/fwd */
  function strip(o = {}) {
    const on = new Set(o.on || []), c = new Set(o.circle || []);
    return `<div class="nstrip">${seq(o.from || 1, o.to || 10).map(n => `<span class="ns ${c.has(n) ? 'circle' : ''} ${on.has(n) ? 'on' : ''}">${n}</span>`).join('')}</div>`;
  }
  const eq = (a, b, s, o = {}) => `<div class="eqline"><span class="eq-s ${o.hl === 'a' ? 'hl' : ''}">${a}</span> − <span class="eq-t ${o.hl === 'b' ? 'hl' : ''}">${b}</span> = <span class="eq-c ${o.hl === 's' ? 'hl' : ''}">${s}</span></div>`;

  const S = window.StepKinds;
  /* l1cross：划掉做减法 {icon, a, b, frame?} */
  S.l1cross = ({ icon, a, b, frame }) => {
    const d = a - b;
    const draw = (k, nums) => `<div class="center">${frame ? L.frame(icon, a, { nums }) : ''}${frame ? '' : crossRow(icon, a, k, { nums })}</div>`;
    const steps = [{ zh: `一共有 <b>${a}</b> 个（先数一遍）。要减去 ${b}，就<b>划掉 ${b} 个</b>。`, en: `There are ${a}. Take away ${b}: cross out ${b}.`, render: s => { s.innerHTML = wrap(draw(0, a), eq(a, b, '?')); } }];
    for (let i = 1; i <= b; i++) steps.push({ zh: `划掉第 ${i} 个。${i === b ? `一共划掉了 ${b} 个。` : ''}`, en: `Cross out ${i}.`, render: s => { s.innerHTML = wrap(`<div class="center">${crossRow(icon, a, i)}</div>`, eq(a, b, '?', { hl: 'b' })); } });
    steps.push({ zh: `数没划掉的：<b>${d}</b> 个。所以 <b>${a} − ${b} = ${d}</b>。`, en: `${d} are left. ${a} − ${b} = ${d}.`, render: s => { s.innerHTML = wrap(`<div class="center">${crossRow(icon, a, b, { nums: d })}</div>`, eq(a, b, d, { hl: 's' })); } });
    return steps;
  };
  /* l1left：图上已划掉，写算式 {pic?, icon, a, gone, noun} */
  S.l1left = ({ pic, icon, a, gone, noun }) => {
    const d = a - gone;
    const scene = o => pic ? `<div class="center">${img(pic, 380)}</div>` : `<div class="center">${crossRow(icon, a, gone, o)}</div>`;
    return [
      { zh: `先数<b>全部</b>（划掉的也要数）：一共 <b>${a}</b> 个。`, en: `Count all, including the crossed ones: ${a}.`, render: s => { s.innerHTML = wrap(scene({ nums: a }), eq(a, '?', '?', { hl: 'a' })); } },
      { zh: `再数<b>划掉</b>的：<b>${gone}</b> 个。`, en: `Count the crossed-out ones: ${gone}.`, render: s => { s.innerHTML = wrap(scene(), eq(a, gone, '?', { hl: 'b' })); } },
      { zh: `没划掉的就是剩下的：<b>${d}</b> 个。<b>${a} − ${gone} = ${d}</b>，There are ${d} ${esc(noun)} left。`, en: `${a} − ${gone} = ${d}. ${d} ${noun} left.`, render: s => { s.innerHTML = wrap(scene(), eq(a, gone, d, { hl: 's' }), line(`There are ${d} ${esc(noun)} left.`)); } },
    ];
  };
  /* l1subon：往后数 {a, b}：从 b 数到 a，跳几下 */
  S.l1subon = ({ a, b }) => {
    const d = a - b;
    const steps = [{ zh: `${a} − ${b}：在数字条上圈出 <b>${b}</b> 和 <b>${a}</b>。从小的数 ${b} 开始往后数，数到 ${a}。`, en: `Circle ${b} and ${a}. Count on from ${b} to ${a}.`, render: s => { s.innerHTML = wrap(strip({ circle: [a, b] }), eq(a, b, '?')); } }];
    for (let i = 1; i <= d; i++) steps.push({ zh: `跳第 ${i} 下：${b + i}。`, en: `Hop ${i}: ${b + i}.`, render: s => { s.innerHTML = wrap(strip({ circle: [a, b], on: seq(b + 1, b + i) }), line(`${i} 下`)); } });
    steps.push({ zh: `从 ${b} 跳到 ${a} 一共跳了 <b>${d}</b> 下。所以 <b>${a} − ${b} = ${d}</b>。`, en: `${d} hops. ${a} − ${b} = ${d}.`, render: s => { s.innerHTML = wrap(strip({ circle: [a, b], on: seq(b + 1, a) }), eq(a, b, d, { hl: 's' })); } });
    return steps;
  };
  /* l1subback：往回数 {a, b}：从 a 往回数 b 下 */
  S.l1subback = ({ a, b }) => {
    const d = a - b;
    const steps = [{ zh: `${a} − ${b}：从 <b>${a}</b> 开始，往<b>回</b>数 ${b} 下。`, en: `Start at ${a}. Count back ${b}.`, render: s => { s.innerHTML = wrap(strip({ circle: [a] }), eq(a, b, '?')); } }];
    for (let i = 1; i <= b; i++) steps.push({ zh: `往回第 ${i} 下：${a - i}。`, en: `Back ${i}: ${a - i}.`, render: s => { s.innerHTML = wrap(strip({ circle: [a], on: seq(a - i, a - 1) }), line(`${i} 下 → ${a - i}`)); } });
    steps.push({ zh: `往回数了 ${b} 下，停在 <b>${d}</b>。所以 <b>${a} − ${b} = ${d}</b>。`, en: `Stop at ${d}. ${a} − ${b} = ${d}.`, render: s => { s.innerHTML = wrap(strip({ circle: [a, d], on: seq(d, a - 1) }), eq(a, b, d, { hl: 's' })); } });
    return steps;
  };
  /* l1subbond：图上划掉 → 数字组合 → 剩下 {pic, a, gone, noun, sentence} */
  S.l1subbond = ({ pic, a, gone, noun, sentence }) => {
    const d = a - gone;
    const scene = `<div class="center">${img(pic, 340)}</div>`;
    return [
      { zh: `数全部：<b>${a}</b> 个，写在大圈（整体）。`, en: `${a} in all: the whole.`, render: s => { s.innerHTML = wrap(scene, L.bond(a, '?', '?', { hl: 'w' })); } },
      { zh: `划掉的有 <b>${gone}</b> 个，写在一个小圈。`, en: `${gone} crossed out: one part.`, render: s => { s.innerHTML = wrap(scene, L.bond(a, gone, '?', { hl: 'a' })); } },
      { zh: `剩下的是另一部分：${a} − ${gone} = <b>${d}</b>。${sentence ? esc(sentence).replace('___', `<b>${d}</b>`) : ''}`, en: `${a} − ${gone} = ${d}.`, render: s => { s.innerHTML = wrap(L.bond(a, gone, d, { hl: 'b' }), eq(a, gone, d), sentence ? line(esc(sentence).replace('___', `<b>${d}</b>`)) : ''); } },
    ];
  };
  /* l1substory：看图讲减法故事 {pic, w, a, la, lb, noun} */
  S.l1substory = ({ pic, w, a, la, lb, noun }) => {
    const b = w - a;
    const scene = `<div class="center">${img(pic, 320)}</div>`;
    return [
      { zh: `先数<b>全部</b>：There are <b>${w}</b> ${esc(noun)}。这是整体，写在大圈。`, en: `${w} ${noun} in all.`, render: s => { s.innerHTML = wrap(scene, L.bond(w, '?', '?', { hl: 'w' })); } },
      { zh: `再数一种：<b>${a}</b> ${esc(la)}。写在一个小圈。`, en: `${a} ${la}.`, render: s => { s.innerHTML = wrap(scene, L.bond(w, a, '?', { hl: 'a' })); } },
      { zh: `另一种就是剩下的：<b>${w} − ${a} = ${b}</b>。方框填整体 ${w}，圆圈填 ${a}，三角填 ${b}。`, en: `${w} − ${a} = ${b}.`, render: s => { s.innerHTML = wrap(L.bond(w, a, b, { hl: 'b' }), eq(w, a, b, { hl: 's' })); } },
      { zh: `所以 <b>${b}</b> ${esc(lb)}。`, en: `${b} ${lb}.`, render: s => { s.innerHTML = wrap(eq(w, a, b), line(`${b} ${esc(lb)}`)); } },
    ];
  };
  /* l1subpick：算式等于几 {a, b} */
  S.l1subpick = ({ a, b }) => S.l1subback({ a, b });
  /* l1subword：一步减法应用题 {en, zh, a, b, sentence} */
  S.l1subword = ({ en, zh, a, b, sentence }) => {
    const d = a - b;
    const text = `<div class="wp-text"><div class="wp-en">${esc(en)}</div><div class="wp-zh">${esc(zh)}</div></div>`;
    return [
      { zh: `读题：一共 <b>${a}</b>，拿走 / 其中一部分是 <b>${b}</b>。问“剩下多少 / 另一部分多少”，用<b>减法</b>。`, en: `${a} in all, ${b} taken away or known. Find the rest: subtract.`, render: s => { s.innerHTML = wrap(text); } },
      { zh: `画 ${a} 个，划掉 ${b} 个。`, en: `Draw ${a}, cross out ${b}.`, render: s => { s.innerHTML = wrap(`<div class="center">${crossRow('🟠', a, b)}</div>`, eq(a, b, '?')); } },
      { zh: `剩下 <b>${d}</b> 个：<b>${a} − ${b} = ${d}</b>。`, en: `${a} − ${b} = ${d}.`, render: s => { s.innerHTML = wrap(`<div class="center">${crossRow('🟠', a, b, { nums: d })}</div>`, eq(a, b, d, { hl: 's' })); } },
      { zh: `写答句：${esc(sentence).replace('___', `<b>${d}</b>`)}`, en: sentence.replace('___', String(d)), render: s => { s.innerHTML = wrap(eq(a, b, d), line(esc(sentence).replace('___', `<b>${d}</b>`))); } },
    ];
  };
  /* l1factfam：算式家族 {pic?, a, b, la, lb, noun} */
  S.l1factfam = ({ pic, a, b, la, lb, noun }) => {
    const w = a + b;
    const scene = pic ? `<div class="center">${img(pic, 320)}</div>` : `<div class="center">${L.groups([{ icon: '🟠', n: a }, { icon: '🔵', n: b }])}</div>`;
    const fam = k => `<div class="famgrid">${[`${a} + ${b} = ${w}`, `${b} + ${a} = ${w}`, `${w} − ${b} = ${a}`, `${w} − ${a} = ${b}`].map((t, i) => `<span class="fam ${i < k ? 'on' : ''}">${i < k ? t : '?'}</span>`).join('')}</div>`;
    return [
      { zh: `数一数：${esc(la)} <b>${a}</b>，${esc(lb)} <b>${b}</b>，一共 <b>${w}</b>。写成数字组合。`, en: `${a} and ${b} make ${w}.`, render: s => { s.innerHTML = wrap(scene, L.bond(w, a, b, { hl: 'w' })); } },
      { zh: `同一个数字组合可以写 <b>2 个加法</b>：${a} + ${b} = ${w}，${b} + ${a} = ${w}。`, en: `Two additions.`, render: s => { s.innerHTML = wrap(L.bond(w, a, b), fam(2)); } },
      { zh: `还可以写 <b>2 个减法</b>：整体减一部分得另一部分。${w} − ${b} = ${a}，${w} − ${a} = ${b}。`, en: `Two subtractions.`, render: s => { s.innerHTML = wrap(L.bond(w, a, b), fam(4)); } },
      { zh: `这 4 个算式是一家人（fact family）：都用 ${a}、${b}、${w} 这三个数。`, en: `These four facts are a fact family.`, render: s => { s.innerHTML = wrap(fam(4), line(`${a}、${b}、${w}`)); } },
    ];
  };

  /* ---------- 题型 crossout：点划掉 + 填答案 q = {id, type:'crossout', icon, a, b, frame?} ---------- */
  window.QTypes.crossout = q => {
    let gone = new Set();
    const d = q.a - q.b;
    const html = () => `<div class="crossq"><div class="center sub">👇 点一个划掉一个，划掉 ${q.b} 个，再填答案</div><div class="center mt" id="cx"></div>
      <div class="fill">${q.a} − ${q.b} = <input class="blank" id="cxans" type="text" inputmode="numeric" maxlength="2" autocomplete="off"></div>
      <div class="center mt"><button type="button" class="btn secondary small" id="clearAll">清空</button> <button class="btn ok" id="submit">检查 ✔</button></div></div>`;
    function refresh(box) {
      const items = Array.from({ length: q.a }, (_, i) => `<span class="l1item cx ${gone.has(i) ? 'gone' : ''}" data-i="${i}">${q.icon}</span>`);
      box.querySelector('#cx').innerHTML = q.frame ? `<span class="tf">${Array.from({ length: 10 }, (_, i) => `<span class="tf-cell ${i < q.a ? 'on' : ''}">${i < q.a ? `<span class="l1item cx tfx ${gone.has(i) ? 'gone' : ''}" data-i="${i}">${q.icon}</span>` : ''}</span>`).join('')}</span>` : `<span class="l1row">${items.join('')}</span>`;
      box.querySelectorAll('.cx').forEach(el => el.onclick = () => { if (box.dataset.locked) return; const i = +el.dataset.i; gone.has(i) ? gone.delete(i) : gone.add(i); refresh(box); });
    }
    function bind(box, submit) { gone = new Set(); refresh(box); const inp = box.querySelector('#cxans'); inp.onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); submit(); } }; box.querySelector('#submit').onclick = () => submit(); box.querySelector('#clearAll').onclick = () => { if (box.dataset.locked) return; gone = new Set(); inp.value = ''; refresh(box); }; }
    const value = box => { const t = box.querySelector('#cxans').value.trim(); if (!gone.size && !t) return null; return JSON.stringify({ g: [...gone], v: t }); };
    const parse = s => { try { return JSON.parse(s); } catch (e) { return { g: [], v: '' }; } };
    const check = s => { const v = parse(s); return v.g.length === q.b && parseInt(v.v, 10) === d; };
    function markWrong(box, s) { const v = parse(s); gone = new Set(v.g); refresh(box); const inp = box.querySelector('#cxans'); inp.value = v.v; const okA = parseInt(v.v, 10) === d; inp.classList.toggle('good', okA); inp.classList.toggle('badf', !okA); box.querySelector('#cx').classList.toggle('badrow', v.g.length !== q.b); box.querySelector('#cx').classList.toggle('goodrow', v.g.length === q.b); }
    function lock(box) { box.dataset.locked = '1'; box.querySelectorAll('#cxans, #submit, #clearAll').forEach(b => b.disabled = true); }
    function showAnswer(box) { gone = new Set(Array.from({ length: q.b }, (_, i) => q.a - 1 - i)); refresh(box); const inp = box.querySelector('#cxans'); inp.value = d; inp.classList.remove('badf'); inp.classList.add('good'); box.querySelector('#cx').classList.remove('badrow'); box.querySelector('#cx').classList.add('goodrow'); lock(box); }
    function restore(box, s, status) { const v = parse(s); gone = new Set(v.g); refresh(box); const inp = box.querySelector('#cxans'); inp.value = v.v; inp.classList.add(parseInt(v.v, 10) === d ? 'good' : 'badf'); box.querySelector('#cx').classList.add(v.g.length === q.b ? 'goodrow' : 'badrow'); lock(box); }
    return {
      prompt: q.prompt || { zh: `一共 ${q.a} 个，划掉 ${q.b} 个，还剩几个？`, en: `Cross out ${q.b}. How many are left?` }, stage: '',
      custom: { html, bind, value, markWrong, showAnswer, lock, restore },
      hint: { zh: `点 ${q.b} 个划掉，再数没划掉的。`, en: `Cross out ${q.b}, then count the rest.` },
      answerText: `划掉 ${q.b} 个；${q.a} − ${q.b} = ${d}`, check, answerDisplay: s => { const v = parse(s); return `划掉 ${v.g.length} 个，答 ${v.v || '_'}`; },
      explainKind: 'l1cross', n: { icon: q.icon, a: q.a, b: q.b, frame: q.frame },
    };
  };

  window.L1.crossRow = crossRow; window.L1.strip = strip; window.L1.subeq = eq;
})();
