/* Level 4 · Unit 2  因数与倍数：讲解动画 + 题型（因数对、数字列表） */
(function () {
  const line = t => `<div class="expand-line">${t}</div>`;
  const wrap = (...parts) => `<div class="l1wrap">${parts.join('')}</div>`;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const numRow = (nums, o = {}) => `<div class="numrow">${o.label ? `<div class="numrow-label">${o.label}</div>` : ''}<div class="numrow-boxes">${nums.map((n, i) => `<span class="nbox ${(o.hl || []).includes(i) ? 'on' : ''} ${n === null ? 'blank' : ''}">${n === null ? '?' : n}</span>`).join('')}</div></div>`;
  const factorsOf = n => { const r = []; for (let i = 1; i <= n; i++) if (n % i === 0) r.push(i); return r; };
  const pairsOf = n => { const r = []; for (let i = 1; i * i <= n; i++) if (n % i === 0) r.push([i, n / i]); return r; };
  const multiples = (n, k) => Array.from({ length: k }, (_, i) => n * (i + 1));
  const parse = s => String(s).split(/[^\d]+/).filter(Boolean).map(Number);
  const sameSet = (s, a) => { const p = parse(s); return p.length === a.length && p.slice().sort((x, y) => x - y).join(',') === a.slice().sort((x, y) => x - y).join(','); };
  const S = window.StepKinds;

  /* l4factors：找 n 的所有因数（因数对） {n} */
  S.l4factors = ({ n }) => {
    const pairs = pairsOf(n), fs = factorsOf(n);
    const tried = []; for (let i = 1; i * i <= n; i++) tried.push(i);
    const table = upto => `<div class="center"><table class="pv4"><tr><th>试一试</th><th>结果</th></tr>${tried.filter(i => i <= upto).map(i => n % i === 0 ? `<tr><td style="font-size:20px">${i} × ${n / i} = ${n}</td><td style="font-size:20px;color:#1a7f37">✓ ${i} 和 ${n / i} 都是因数</td></tr>` : `<tr><td style="font-size:20px">${n} ÷ ${i}</td><td style="font-size:20px;color:#999">✗ 除不尽</td></tr>`).join('')}</table></div>`;
    const steps = [{ zh: `<b>因数（factor）</b>：两个整数相乘得到 ${n}，这两个数都是 ${n} 的因数。从 <b>1</b> 开始一个一个试：${n} = 1 × ${n}。`, en: `Factors multiply to give ${n}. Start from 1: ${n} = 1 × ${n}.`, render: s => { s.innerHTML = wrap(table(1)); } }];
    tried.slice(1).forEach(i => { const ok = n % i === 0; steps.push({ zh: ok ? `试 ${i}：${n} ÷ ${i} = ${n / i}，整除，所以 ${n} = <b>${i} × ${n / i}</b>。` : `试 ${i}：${n} ÷ ${i} 除不尽，${i} 不是因数。`, en: ok ? `${n} = ${i} × ${n / i}.` : `${i} is not a factor.`, render: s => { s.innerHTML = wrap(table(i)); } }); });
    const last = tried[tried.length - 1];
    steps.push({ zh: `试到 ${last + 1}：${last + 1} × ? = ${n} 的另一半${(last + 1) * (last + 1) > n ? `会比 ${last + 1} 小，前面已经有了` : ''}，可以<b>停</b>。把每一对都写下来：${pairs.map(p => `${p[0]} × ${p[1]}`).join('，')}。`, en: `Stop when the pairs start repeating. Pairs: ${pairs.map(p => `${p[0]} × ${p[1]}`).join(', ')}.`, render: s => { s.innerHTML = wrap(table(last), line(pairs.map(p => `${p[0]} × ${p[1]}`).join('　'))); } });
    steps.push({ zh: `把因数对里的数<b>从小到大</b>排好：${n} 的因数是 <b>${fs.join(', ')}</b>，一共 ${fs.length} 个。`, en: `The factors of ${n} are ${fs.join(', ')}.`, render: s => { s.innerHTML = wrap(`<div class="center">${numRow(fs, { hl: fs.map((_, i) => i) })}</div>`, line(`${n} 的因数：${fs.join(', ')}`)); } });
    return steps;
  };
  /* l4common：公因数 {a, b} */
  S.l4common = ({ a, b }) => {
    const fa = factorsOf(a), fb = factorsOf(b), c = fa.filter(x => fb.includes(x));
    const rows = (hlA, hlB) => `<div class="center">${numRow(fa, { label: `${a} 的因数 factors of ${a}`, hl: hlA })}<br>${numRow(fb, { label: `${b} 的因数 factors of ${b}`, hl: hlB })}</div>`;
    return [
      { zh: `先列出 ${a} 的因数：<b>${fa.join(', ')}</b>（从 1 开始试，${pairsOf(a).map(p => `${p[0]}×${p[1]}`).join('、')}）。`, en: `Factors of ${a}: ${fa.join(', ')}.`, render: s => { s.innerHTML = wrap(`<div class="center">${numRow(fa, { label: `${a} 的因数` })}</div>`); } },
      { zh: `再列出 ${b} 的因数：<b>${fb.join(', ')}</b>（${pairsOf(b).map(p => `${p[0]}×${p[1]}`).join('、')}）。`, en: `Factors of ${b}: ${fb.join(', ')}.`, render: s => { s.innerHTML = wrap(rows([], [])); } },
      { zh: `两边都有的数就是<b>公因数（common factors）</b>：<b>${c.join(', ')}</b>。`, en: `The common factors of ${a} and ${b} are ${c.join(', ')}.`, render: s => { s.innerHTML = wrap(rows(fa.map((x, i) => c.includes(x) ? i : -1).filter(i => i >= 0), fb.map((x, i) => c.includes(x) ? i : -1).filter(i => i >= 0)), line(`公因数：${c.join(', ')}`)); } },
    ];
  };
  /* l4multiples：前 k 个倍数 {n, k} */
  S.l4multiples = ({ n, k }) => {
    const ms = multiples(n, k);
    return [
      { zh: `<b>倍数（multiple）</b>：${n} 乘 1、2、3…… 得到的数都是 ${n} 的倍数。第一个倍数是 ${n} × 1 = <b>${n}</b>。`, en: `Multiples of ${n}: ${n} × 1, ${n} × 2, ... The first is ${n}.`, render: s => { s.innerHTML = wrap(`<div class="center">${numRow([n].concat(Array(k - 1).fill(null)), { hl: [0] })}</div>`, line(`${n} × 1 = ${n}`)); } },
      ...ms.slice(1).map((m, i) => ({ zh: `${n} × ${i + 2} = <b>${m}</b>（也就是上一个加 ${n}：${ms[i]} + ${n} = ${m}）。`, en: `${n} × ${i + 2} = ${m}.`, render: s => { s.innerHTML = wrap(`<div class="center">${numRow(ms.slice(0, i + 2).concat(Array(k - i - 2).fill(null)), { hl: [i + 1] })}</div>`, line(`${n} × ${i + 2} = ${m}`)); } })),
      { zh: `所以 ${n} 的前 ${k} 个倍数是 <b>${ms.join(', ')}</b>。`, en: `The first ${k} multiples of ${n} are ${ms.join(', ')}.`, render: s => { s.innerHTML = wrap(`<div class="center">${numRow(ms, { hl: ms.map((_, i) => i) })}</div>`, line(ms.join(', '))); } },
    ];
  };
  /* l4nthmul：第 k 个倍数 {n, k} */
  S.l4nthmul = ({ n, k }) => {
    const ms = multiples(n, k), ord = ['', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth'][k];
    return [
      { zh: `The ${ord} multiple of ${n}：${n} 的<b>第 ${k} 个</b>倍数。第 1 个是 ${n} × 1，第 2 个是 ${n} × 2……第 ${k} 个就是 <b>${n} × ${k}</b>。`, en: `The ${ord} multiple of ${n} is ${n} × ${k}.`, render: s => { s.innerHTML = wrap(`<div class="center">${numRow(ms, { hl: [k - 1] })}</div>`); } },
      { zh: `${n} × ${k} = <b>${n * k}</b>。`, en: `${n} × ${k} = ${n * k}.`, render: s => { s.innerHTML = wrap(`<div class="center">${numRow(ms, { hl: [k - 1] })}</div>`, line(`${n} × ${k} = ${n * k}`)); } },
    ];
  };
  /* l4cmul：公倍数 {a, b, k} 各列前 k 个 */
  S.l4cmul = ({ a, b, k }) => {
    const ma = multiples(a, k), mb = multiples(b, k), c = ma.filter(x => mb.includes(x));
    const rows = (hlA, hlB) => `<div class="center">${numRow(ma, { label: `${a} 的倍数 multiples of ${a}`, hl: hlA })}<br>${numRow(mb, { label: `${b} 的倍数 multiples of ${b}`, hl: hlB })}</div>`;
    return [
      { zh: `先列 ${a} 的前 ${k} 个倍数：<b>${ma.join(', ')}</b>（每次加 ${a}）。`, en: `Multiples of ${a}: ${ma.join(', ')}.`, render: s => { s.innerHTML = wrap(`<div class="center">${numRow(ma, { label: `${a} 的倍数` })}</div>`); } },
      { zh: `再列 ${b} 的前 ${k} 个倍数：<b>${mb.join(', ')}</b>（每次加 ${b}）。`, en: `Multiples of ${b}: ${mb.join(', ')}.`, render: s => { s.innerHTML = wrap(rows([], [])); } },
      { zh: `两边都有的数就是<b>公倍数（common multiples）</b>：<b>${c.join(', ')}</b>${c.length ? `。最小的 ${c[0]} 叫最小公倍数` : ''}。`, en: `Common multiples: ${c.join(', ')}.`, render: s => { s.innerHTML = wrap(rows(ma.map((x, i) => c.includes(x) ? i : -1).filter(i => i >= 0), mb.map((x, i) => c.includes(x) ? i : -1).filter(i => i >= 0)), line(`公倍数：${c.join(', ')}`)); } },
    ];
  };

  /* ---------- 题型 numlist：每行一个“数字列表”空，顺序不限 ----------
   * q = { lines:[{text:'The factors of 8 are {{x}}.', a:[1,2,4,8]}], prompt, hint, pic, explain, label } */
  window.QTypes.numlist = q => {
    const L = q.lines;
    const html = () => `<div class="fill numlist">${L.map((l, i) => `<div class="nl-line">${esc(l.text).replace('{{x}}', `<input class="blank nl" data-i="${i}" type="text" autocomplete="off" spellcheck="false" style="width:${Math.min(22, Math.max(6, l.a.join(', ').length * 0.62 + 2))}em" placeholder="1, 2, 3">`)}</div>`).join('')}</div><div class="center sub">用逗号隔开，顺序不限 ｜ Separate with commas, any order</div><div class="center mt"><button class="btn ok" id="submit">检查 ✔</button></div>`;
    const inputs = box => [...box.querySelectorAll('input.nl')];
    const pv = val => { try { return JSON.parse(val || '[]'); } catch (e) { return []; } };
    return {
      prompt: q.prompt, stage: q.pic || '',
      custom: {
        html,
        bind: (box, submit) => { const ins = inputs(box); ins.forEach((inp, i) => { inp.onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); if (ins[i + 1] && !ins[i + 1].value) ins[i + 1].focus(); else submit(); } }; }); box.querySelector('#submit').onclick = () => submit(); ins[0].focus({ preventScroll: true }); },
        value: box => { const v = inputs(box).map(i => i.value.trim()); return v.every(Boolean) ? JSON.stringify(v) : null; },
        markWrong: (box, val) => { const v = pv(val); inputs(box).forEach((inp, i) => { const good = sameSet(v[i] || '', L[i].a); inp.classList.toggle('good', good); inp.classList.toggle('badf', !good); if (good) inp.disabled = true; }); const f = box.querySelector('input.badf'); if (f) f.select(); },
        showAnswer: box => { inputs(box).forEach((inp, i) => { inp.value = L[i].a.join(', '); inp.classList.remove('badf'); inp.classList.add('good'); inp.disabled = true; }); box.querySelector('#submit').disabled = true; },
        lock: box => { inputs(box).forEach(i => i.disabled = true); box.querySelector('#submit').disabled = true; },
        restore: (box, val) => { const v = pv(val); inputs(box).forEach((inp, i) => { inp.value = v[i] !== undefined ? v[i] : L[i].a.join(', '); inp.classList.add(v[i] === undefined || sameSet(v[i], L[i].a) ? 'good' : 'badf'); inp.disabled = true; }); box.querySelector('#submit').disabled = true; },
      },
      hint: q.hint, answerText: L.map(l => l.a.join(', ')).join(' ｜ '),
      check: val => { const v = pv(val); return L.every((l, i) => sameSet(v[i] || '', l.a)); },
      answerDisplay: val => pv(val).join(' ｜ '),
      explainKind: q.explain ? q.explain[0] : null, n: q.explain ? q.explain[1] : null,
    };
  };
  /* ---------- 题型 l4fpairs：写出 n 的所有因数对 + 因数列表 ---------- q = {n} */
  window.QTypes.l4fpairs = q => {
    const n = q.n, pairs = pairsOf(n), fs = factorsOf(n), key = p => p.slice().sort((x, y) => x - y).join('x'), keys = pairs.map(key);
    const html = () => `<div class="fill fpairs">${pairs.map((_, r) => `<div class="nl-line">${n} = <input class="blank" data-r="${r}" data-s="0" type="text" inputmode="numeric" autocomplete="off" maxlength="2" style="width:3em"> × <input class="blank" data-r="${r}" data-s="1" type="text" inputmode="numeric" autocomplete="off" maxlength="2" style="width:3em"></div>`).join('')}<div class="nl-line">The factors of ${n} are <input class="blank nl" type="text" autocomplete="off" spellcheck="false" style="width:${Math.max(8, fs.join(', ').length * 0.62 + 2)}em" placeholder="1, 2, 3"></div></div><div class="center sub">每行一对，哪对先写都行；因数用逗号隔开 ｜ Any order</div><div class="center mt"><button class="btn ok" id="submit">检查 ✔</button></div>`;
    const ins = box => [...box.querySelectorAll('input.blank')];
    const pv = val => { try { return JSON.parse(val || '{}'); } catch (e) { return {}; } };
    const rowOK = (p, seen) => { const k = key(p); return p[0] * p[1] === n && keys.includes(k) && !seen.includes(k); };
    const judge = v => { const seen = [], rows = (v.pairs || []).map(p => { const ok = rowOK(p, seen); if (ok) seen.push(key(p)); return ok; }); return { rows, list: sameSet(v.list || '', fs) }; };
    return {
      prompt: q.prompt || { zh: `把 ${n} 写成两个数相乘（每一对都写），再列出 ${n} 的所有因数`, en: `Write ${n} as a product of two numbers in every way, then list its factors` },
      stage: '',
      custom: {
        html,
        bind: (box, submit) => { const all = ins(box); all.forEach((inp, i) => { inp.onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); if (all[i + 1] && !all[i + 1].value) all[i + 1].focus(); else submit(); } }; inp.oninput = () => { if (inp.inputMode === 'numeric' && inp.value.length >= 2 && all[i + 1]) all[i + 1].focus(); }; }); box.querySelector('#submit').onclick = () => submit(); all[0].focus({ preventScroll: true }); },
        value: box => { const all = ins(box); if (all.some(i => !i.value.trim())) return null; const ps = pairs.map((_, r) => [+box.querySelector(`input[data-r="${r}"][data-s="0"]`).value, +box.querySelector(`input[data-r="${r}"][data-s="1"]`).value]); return JSON.stringify({ pairs: ps, list: box.querySelector('input.nl').value.trim() }); },
        markWrong: (box, val) => { const j = judge(pv(val)); pairs.forEach((_, r) => box.querySelectorAll(`input[data-r="${r}"]`).forEach(inp => { inp.classList.toggle('good', j.rows[r]); inp.classList.toggle('badf', !j.rows[r]); if (j.rows[r]) inp.disabled = true; })); const nl = box.querySelector('input.nl'); nl.classList.toggle('good', j.list); nl.classList.toggle('badf', !j.list); if (j.list) nl.disabled = true; const f = box.querySelector('input.badf'); if (f) f.select(); },
        showAnswer: box => { pairs.forEach((p, r) => { box.querySelector(`input[data-r="${r}"][data-s="0"]`).value = p[0]; box.querySelector(`input[data-r="${r}"][data-s="1"]`).value = p[1]; }); box.querySelector('input.nl').value = fs.join(', '); ins(box).forEach(i => { i.classList.remove('badf'); i.classList.add('good'); i.disabled = true; }); box.querySelector('#submit').disabled = true; },
        lock: box => { ins(box).forEach(i => i.disabled = true); box.querySelector('#submit').disabled = true; },
        restore: (box, val) => { const v = pv(val); if (!v.pairs) { pairs.forEach((p, r) => { box.querySelector(`input[data-r="${r}"][data-s="0"]`).value = p[0]; box.querySelector(`input[data-r="${r}"][data-s="1"]`).value = p[1]; }); box.querySelector('input.nl').value = fs.join(', '); ins(box).forEach(i => { i.classList.add('good'); i.disabled = true; }); } else { const j = judge(v); pairs.forEach((_, r) => box.querySelectorAll(`input[data-r="${r}"]`).forEach(inp => { inp.value = v.pairs[r][+inp.dataset.s]; inp.classList.add(j.rows[r] ? 'good' : 'badf'); inp.disabled = true; })); const nl = box.querySelector('input.nl'); nl.value = v.list || ''; nl.classList.add(j.list ? 'good' : 'badf'); nl.disabled = true; } box.querySelector('#submit').disabled = true; },
      },
      hint: q.hint || { zh: `从 1 开始试：1 × ${n}，再试 2、3、4……除得尽的就是一对。`, en: 'Try 1, 2, 3, ... in turn.' },
      answerText: `${pairs.map(p => `${p[0]} × ${p[1]}`).join('，')}；因数 ${fs.join(', ')}`,
      check: val => { const j = judge(pv(val)); return j.rows.every(Boolean) && j.list; },
      answerDisplay: val => { const v = pv(val); return `${(v.pairs || []).map(p => `${p[0]} × ${p[1]}`).join('，')}；${v.list || ''}`; },
      explainKind: 'l4factors', n: { n },
    };
  };
  window.L4FM = { factorsOf, pairsOf, multiples };
})();
