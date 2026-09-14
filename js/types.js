/* 通用题型与讲解步骤（注册表）
 * window.QTypes[type](q)  -> questionView 对象
 * window.StepKinds[kind](param) -> steps 数组
 * 依赖 app.js 在运行时提供的 window.UI（pvTable, bigNum, split, esc, wordChoices）
 */
window.QTypes = window.QTypes || {};
window.StepKinds = window.StepKinds || {};

(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const U = () => window.UI;
  const split = n => n === 1000 ? { h: 10, t: 0, o: 0 } : { h: Math.floor(n / 100), t: Math.floor(n / 10) % 10, o: n % 10 };
  const placeZh = { h: '百位', t: '十位', o: '个位' };
  const placeEn = { h: 'hundreds', t: 'tens', o: 'ones' };
  const C = { h: '#4a90e2', t: '#27ae60', o: '#f39c12' };
  const col = (k, s) => `<b style="color:${C[k]}">${s}</b>`;

  // 数字条：[a, b, c, ...]，可标注箭头文字
  function numRow(nums, opts = {}) {
    const hl = opts.hl || [];
    return `<div class="numrow">${opts.label ? `<div class="numrow-label">${opts.label}</div>` : ''}<div class="numrow-boxes">${nums.map((n, i) => `<span class="nbox ${hl.includes(i) ? 'on' : ''} ${n === '' || n === null ? 'blank' : ''}">${n === null ? '?' : n}</span>`).join('')}</div></div>`;
  }

  /* ================= 讲解步骤 ================= */

  // 拆分：825 = 8 hundreds 2 tens 5 ones = 800 + 20 + 5
  window.StepKinds.expand = n => {
    const v = split(n), ui = U();
    const stage = (shown, extra = '') => `<div class="center">${ui.bigNum(n, { h: shown.h, t: shown.t, o: shown.o })}${ui.pvTable(v, shown)}${extra}</div>`;
    const steps = [
      { zh: `看 <b>${n}</b>，它有三个数位：百位、十位、个位。`, en: `${n} has three places: hundreds, tens and ones.`, render: st => { st.innerHTML = stage({ h: 1, t: 1, o: 1 }); } },
      { zh: `${col('h', v.h)} 在百位，表示 ${v.h} 个百，就是 ${col('h', v.h * 100)}。`, en: `${v.h} in the hundreds place means ${v.h} hundreds = ${v.h * 100}.`, render: st => { st.innerHTML = stage({ h: 1 }, `<div class="expand-line">${col('h', v.h * 100)}</div>`); } },
      { zh: `${col('t', v.t)} 在十位，表示 ${v.t} 个十，就是 ${col('t', v.t * 10)}。`, en: `${v.t} in the tens place means ${v.t} tens = ${v.t * 10}.`, render: st => { st.innerHTML = stage({ t: 1 }, `<div class="expand-line">${col('h', v.h * 100)} + ${col('t', v.t * 10)}</div>`); } },
      { zh: `${col('o', v.o)} 在个位，表示 ${v.o} 个一，就是 ${col('o', v.o)}。`, en: `${v.o} in the ones place means ${v.o} ones = ${v.o}.`, render: st => { st.innerHTML = stage({ o: 1 }, `<div class="expand-line">${col('h', v.h * 100)} + ${col('t', v.t * 10)} + ${col('o', v.o)}</div>`); } },
      { zh: `所以 <b>${n}</b> = ${v.h} 个百 ${v.t} 个十 ${v.o} 个一 = ${v.h * 100} + ${v.t * 10} + ${v.o}。`, en: `So ${n} = ${v.h} hundreds ${v.t} tens ${v.o} ones = ${v.h * 100} + ${v.t * 10} + ${v.o}.`, render: st => { st.innerHTML = stage({ h: 1, t: 1, o: 1 }, `<div class="expand-line">${n} = ${col('h', v.h * 100)} + ${col('t', v.t * 10)} + ${col('o', v.o)}</div>`); } },
    ];
    return steps;
  };

  // 数位：In 123, the digit 1 is in the hundreds place
  window.StepKinds.digitplace = n => {
    const v = split(n), ui = U();
    const stage = on => `<div class="center">${ui.bigNum(n, on)}${ui.pvTable(v, on)}</div>`;
    return [
      { zh: `一个三位数从左到右是：百位、十位、个位。`, en: 'From left to right: hundreds place, tens place, ones place.', render: st => { st.innerHTML = stage({ h: 1, t: 1, o: 1 }); } },
      { zh: `最左边的 ${col('h', v.h)} 在<b>百位</b>（hundreds place）。`, en: `The digit ${v.h} on the left is in the hundreds place.`, render: st => { st.innerHTML = stage({ h: 1 }); } },
      { zh: `中间的 ${col('t', v.t)} 在<b>十位</b>（tens place）。`, en: `The digit ${v.t} in the middle is in the tens place.`, render: st => { st.innerHTML = stage({ t: 1 }); } },
      { zh: `最右边的 ${col('o', v.o)} 在<b>个位</b>（ones place）。`, en: `The digit ${v.o} on the right is in the ones place.`, render: st => { st.innerHTML = stage({ o: 1 }); } },
    ];
  };

  // 比较两个数
  window.StepKinds.compare = ({ a, b }) => {
    const va = split(a), vb = split(b), ui = U();
    const table = (hlKey) => `<div class="cmp-table"><div class="cmp-head"></div><div class="cmp-head h">百 H</div><div class="cmp-head t">十 T</div><div class="cmp-head o">个 O</div>
      ${[[a, va], [b, vb]].map(([n, v]) => `<div class="cmp-num">${n}</div>${['h', 't', 'o'].map(k => `<div class="cmp-cell ${k} ${hlKey === k ? 'hl' : ''}">${v[k]}</div>`).join('')}`).join('')}</div>`;
    const steps = [{ zh: `比较 <b>${a}</b> 和 <b>${b}</b>，把它们的百、十、个对齐写好。`, en: `Compare ${a} and ${b}. Line up the hundreds, tens and ones.`, render: st => { st.innerHTML = `<div class="center">${table(null)}</div>`; } }];
    const word = (x, y) => x > y ? '大' : x < y ? '小' : '一样';
    const wordEn = (x, y) => x > y ? 'greater' : x < y ? 'smaller' : 'the same';
    const keys = ['h', 't', 'o'];
    for (const k of keys) {
      const x = va[k], y = vb[k];
      if (x !== y) {
        steps.push({ zh: `先比${placeZh[k]}：${col(k, x)} 比 ${col(k, y)} ${word(x, y)}。所以 <b>${a}</b> 比 <b>${b}</b> <b>${word(x, y)}</b>（${a} is ${wordEn(x, y)} than ${b}）。`, en: `Compare the ${placeEn[k]}: ${x} is ${wordEn(x, y)} than ${y}. So ${a} is ${wordEn(x, y)} than ${b}.`, render: st => { st.innerHTML = `<div class="center">${table(k)}<div class="expand-line">${a} is <b>${wordEn(x, y)}</b> than ${b}</div></div>`; } });
        break;
      } else {
        steps.push({ zh: `先比${placeZh[k]}：都是 ${col(k, x)}，一样大，再比下一位。`, en: `The ${placeEn[k]} are the same (${x}). Compare the next place.`, render: st => { st.innerHTML = `<div class="center">${table(k)}</div>`; } });
      }
    }
    if (a === b) steps.push({ zh: '每一位都一样，两个数相等。', en: 'All places are the same, so the numbers are equal.', render: st => { st.innerHTML = `<div class="center">${table(null)}</div>`; } });
    return steps;
  };

  // 排序
  window.StepKinds.arrange = ({ nums, order }) => {
    const asc = order === 'asc', ui = U();
    const sorted = nums.slice().sort((x, y) => asc ? x - y : y - x);
    const table = (hlKey, marks) => `<div class="cmp-table"><div class="cmp-head"></div><div class="cmp-head h">百 H</div><div class="cmp-head t">十 T</div><div class="cmp-head o">个 O</div>
      ${nums.map(n => { const v = split(n); const rank = marks ? marks[n] : ''; return `<div class="cmp-num">${rank ? `<span class="rank">${rank}</span>` : ''}${n}</div>${['h', 't', 'o'].map(k => `<div class="cmp-cell ${k} ${hlKey === k ? 'hl' : ''}">${v[k]}</div>`).join('')}`; }).join('')}</div>`;
    const steps = [{ zh: `把 ${nums.join('、')} 从${asc ? '小到大' : '大到小'}排。先把它们的百、十、个对齐。`, en: `Arrange ${nums.join(', ')} from ${asc ? 'smallest to greatest' : 'greatest to smallest'}. Line up the places.`, render: st => { st.innerHTML = `<div class="center">${table(null)}</div>`; } }];
    // 百位
    const hs = [...new Set(nums.map(n => split(n).h))].sort((x, y) => asc ? x - y : y - x);
    steps.push({ zh: `先比<b>百位</b>：${hs.map(h => col('h', h)).join(asc ? ' 比 ' : ' 比 ')}${hs.length > 1 ? (asc ? ' 小' : ' 大') : ''}。百位${asc ? '小' : '大'}的排前面。`, en: `Compare the hundreds first. ${asc ? 'Smaller' : 'Greater'} hundreds go first.`, render: st => { st.innerHTML = `<div class="center">${table('h')}</div>`; } });
    // 同百位比十位
    const groups = {};
    nums.forEach(n => { const h = split(n).h; (groups[h] = groups[h] || []).push(n); });
    const tie = Object.values(groups).filter(g => g.length > 1);
    if (tie.length) steps.push({ zh: `百位一样的（${tie.map(g => g.join(' 和 ')).join('；')}），再比<b>十位</b>${tie.some(g => { const ts = g.map(n => split(n).t); return new Set(ts).size < ts.length; }) ? '，十位也一样就比<b>个位</b>' : ''}。`, en: 'For numbers with the same hundreds, compare the tens (then the ones).', render: st => { st.innerHTML = `<div class="center">${table('t')}</div>`; } });
    const marks = {}; sorted.forEach((n, i) => { marks[n] = i + 1; });
    steps.push({ zh: `排好了：<b>${sorted.join(', ')}</b>`, en: `In order: ${sorted.join(', ')}`, render: st => { st.innerHTML = `<div class="center">${table(null, marks)}<div class="expand-line">${sorted.join(', ')}</div></div>`; } });
    return steps;
  };

  // 多几 / 少几：{ start, delta }  delta>0 more, <0 less
  window.StepKinds.moreless = ({ start, delta }) => {
    const more = delta > 0, n = Math.abs(delta);
    const stepSize = n >= 100 ? 100 : n >= 10 ? 10 : 1;
    const count = n / stepSize;
    const seq = []; for (let i = 0; i <= count; i++) seq.push(start + (more ? 1 : -1) * i * stepSize);
    const end = start + delta;
    const label = `${n} ${more ? 'more' : 'less'}`;
    const zhWhat = stepSize === 1 ? `${count} 个一` : stepSize === 10 ? `${count} 个十` : `${count} 个百`;
    return [
      { zh: `${n} ${more ? 'more' : 'less'} than ${start}：比 ${start} <b>${more ? '多' : '少'} ${n}</b>。`, en: `${n} ${more ? 'more' : 'less'} than ${start}.`, render: st => { st.innerHTML = `<div class="center">${numRow([start].concat(Array(count).fill(null)), { label })}</div>`; } },
      { zh: `从 ${start} 开始，${more ? '往前数' : '往回数'} ${zhWhat}${stepSize > 1 ? `（每次${more ? '加' : '减'} ${stepSize}）` : ''}。`, en: `Start at ${start}, count ${more ? 'on' : 'back'} ${count} ${stepSize === 1 ? 'ones' : stepSize === 10 ? 'tens' : 'hundreds'}.`, render: st => { st.innerHTML = `<div class="center">${numRow(seq, { label, hl: seq.map((_, i) => i) })}</div>`; } },
      { zh: `数到 <b>${end}</b>。所以 ${n} ${more ? 'more' : 'less'} than ${start} is <b>${end}</b>。`, en: `We reach ${end}. So ${n} ${more ? 'more' : 'less'} than ${start} is ${end}.`, render: st => { st.innerHTML = `<div class="center">${numRow(seq, { label, hl: [seq.length - 1] })}<div class="expand-line">${start} ${more ? '+' : '−'} ${n} = ${end}</div></div>`; } },
    ];
  };

  // 数字规律：{ seq: 完整序列, blanks: [下标...] }
  window.StepKinds.pattern = ({ seq, blanks }) => {
    const step = seq[1] - seq[0];
    const known = seq.map((n, i) => blanks.includes(i) ? null : n);
    const more = step > 0, s = Math.abs(step);
    const label = `${s} ${more ? 'more' : 'less'}`;
    const steps = [
      { zh: `先看已经给出的数，找规律：相邻两个数差多少？`, en: 'Look at the numbers given. What is the difference between neighbours?', render: st => { st.innerHTML = `<div class="center">${numRow(known)}</div>`; } },
    ];
    // 找两个相邻已知数
    let i0 = -1; for (let i = 0; i < seq.length - 1; i++) if (known[i] !== null && known[i + 1] !== null) { i0 = i; break; }
    if (i0 < 0) for (let i = 0; i < seq.length - 2; i++) if (known[i] !== null && known[i + 2] !== null) { i0 = i; break; }
    if (i0 >= 0 && known[i0 + 1] !== null) steps.push({ zh: `${known[i0]} → ${known[i0 + 1]}，每次<b>${more ? '加' : '减'} ${s}</b>（${label}）。`, en: `${known[i0]} → ${known[i0 + 1]}: each time ${more ? 'add' : 'subtract'} ${s}.`, render: st => { st.innerHTML = `<div class="center">${numRow(known, { label, hl: [i0, i0 + 1] })}</div>`; } });
    else steps.push({ zh: `每次<b>${more ? '加' : '减'} ${s}</b>（${label}）。`, en: `Each time ${more ? 'add' : 'subtract'} ${s}.`, render: st => { st.innerHTML = `<div class="center">${numRow(known, { label })}</div>`; } });
    const filled = known.slice();
    blanks.slice().sort((a, b) => a - b).forEach(bi => {
      const prev = bi > 0 ? seq[bi - 1] : null, next = bi < seq.length - 1 ? seq[bi + 1] : null;
      filled[bi] = seq[bi];
      const snapshot = filled.slice();
      const zh = prev !== null ? `${prev} ${more ? '+' : '−'} ${s} = <b>${seq[bi]}</b>` : `${next} ${more ? '−' : '+'} ${s} = <b>${seq[bi]}</b>`;
      steps.push({ zh: `填空：${zh}。`, en: `Fill in: ${zh.replace(/<[^>]+>/g, '')}.`, render: st => { st.innerHTML = `<div class="center">${numRow(snapshot, { label, hl: [bi] })}</div>`; } });
    });
    steps.push({ zh: `完整的规律是：<b>${seq.join(', ')}</b>`, en: `The pattern is ${seq.join(', ')}.`, render: st => { st.innerHTML = `<div class="center">${numRow(seq, { label })}</div>`; } });
    return steps;
  };

  /* ================= 题型 ================= */

  /* fill：填空题
   * q = { id, type:'fill', text:'{{n}} = {{h}} hundreds ...', fields:{ h:{a:3}, w:{a:'...', kind:'choice', options:[...]} },
   *       prompt?:{zh,en}, blocks?:{h,t,o}, bigNum?:n, explain?:[kind, param], hint?:{zh,en} }
   * 字段 kind：num（默认，数字）| text | choice（options）
   */
  window.QTypes.fill = q => {
    const keys = Object.keys(q.fields);
    const isChoiceLong = f => f.kind === 'choice' && f.options.some(o => String(o).length > 12);
    // 模板渲染：{{k}} 替换为输入控件；\n 换行
    function html() {
      let t = esc(q.text).replace(/\n/g, '<br>');
      keys.forEach(k => {
        const f = q.fields[k];
        let ctl;
        if (f.kind === 'choice' && !isChoiceLong(f)) ctl = `<span class="seg" data-key="${k}">${f.options.map(o => `<button type="button" class="segbtn" data-val="${esc(o)}">${esc(o)}</button>`).join('')}</span>`;
        else if (f.kind === 'choice') ctl = `<span class="seg-placeholder" data-key="${k}">?</span>`;
        else ctl = `<input class="blank" data-key="${k}" type="text" inputmode="${f.kind === 'text' ? 'text' : 'numeric'}" autocomplete="off" spellcheck="false" maxlength="${f.kind === 'text' ? 40 : Math.max(String(f.a).length, 1)}" style="width:${f.kind === 'text' ? 12 : Math.max(String(f.a).length, 2) * 0.9 + 1.2}em">`;
        t = t.replace(`{{${k}}}`, ctl);
      });
      const longChoices = keys.filter(k => isChoiceLong(q.fields[k])).map(k => `<div class="choices small-choices" data-key="${k}">${q.fields[k].options.map((o, i) => `<button type="button" class="choice" data-val="${esc(o)}"><span class="key">${i + 1}</span>${esc(o)}</button>`).join('')}</div>`).join('');
      return `<div class="fill">${t}</div>${longChoices}<div class="center mt"><button class="btn ok" id="submit">检查 ✔</button></div>`;
    }
    function bind(box, submit) {
      const inputs = [...box.querySelectorAll('input.blank')];
      inputs.forEach((inp, i) => {
        inp.onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); submit(); } };
        inp.oninput = () => { if (inp.maxLength > 0 && inp.value.length >= inp.maxLength && inputs[i + 1]) inputs[i + 1].focus(); };
      });
      box.querySelectorAll('.segbtn, .small-choices .choice').forEach(b => b.onclick = () => {
        const group = b.parentElement;
        group.querySelectorAll('button').forEach(x => x.classList.remove('sel'));
        b.classList.add('sel');
        const ph = box.querySelector(`.seg-placeholder[data-key="${group.dataset.key}"]`); if (ph) ph.textContent = b.dataset.val;
        // 全部填完自动检查（只有选择项时）
        if (inputs.length === 0 && keys.every(k => q.fields[k].kind !== 'choice' || box.querySelector(`[data-key="${k}"] .sel`))) submit();
      });
      $('#submit', box).onclick = () => submit();
      if (inputs[0]) inputs[0].focus({ preventScroll: true });
    }
    function value(box) {
      const v = {};
      for (const k of keys) {
        const f = q.fields[k];
        if (f.kind === 'choice') { const sel = box.querySelector(`[data-key="${k}"] .sel`); if (!sel) return null; v[k] = sel.dataset.val; }
        else { const inp = box.querySelector(`input.blank[data-key="${k}"]`); if (!inp.value.trim()) return null; v[k] = inp.value.trim(); }
      }
      return JSON.stringify(v);
    }
    const norm = (k, s) => q.fields[k].kind === 'text' ? String(s).toLowerCase().replace(/\s+/g, ' ').trim() : String(s).trim();
    const ok = (k, s) => norm(k, s) === norm(k, q.fields[k].a);
    function markWrong(box, val) {
      const v = JSON.parse(val);
      keys.forEach(k => {
        const good = ok(k, v[k]);
        const inp = box.querySelector(`input.blank[data-key="${k}"]`);
        if (inp) { inp.classList.toggle('good', good); inp.classList.toggle('badf', !good); if (good) inp.disabled = true; }
        const grp = box.querySelector(`[data-key="${k}"]`);
        if (grp && !inp) { const sel = grp.querySelector('.sel'); if (sel) sel.classList.add(good ? 'right' : 'wrong'); if (good) grp.querySelectorAll('button').forEach(x => x.disabled = true); }
      });
      const first = box.querySelector('input.blank.badf'); if (first) { first.select(); }
    }
    function showAnswer(box) {
      keys.forEach(k => {
        const inp = box.querySelector(`input.blank[data-key="${k}"]`);
        if (inp) { inp.value = q.fields[k].a; inp.classList.remove('badf'); inp.classList.add('good'); }
        const grp = box.querySelector(`[data-key="${k}"]`);
        if (grp && !inp) { grp.querySelectorAll('button').forEach(x => { if (norm(k, x.dataset.val) === norm(k, q.fields[k].a)) x.classList.add('right'); }); const ph = box.querySelector(`.seg-placeholder[data-key="${k}"]`); if (ph) ph.textContent = q.fields[k].a; }
      });
      lock(box);
    }
    function lock(box) { box.querySelectorAll('input.blank').forEach(i => i.disabled = true); box.querySelectorAll('.segbtn, .small-choices .choice').forEach(b => b.disabled = true); const s = box.querySelector('#submit'); if (s) s.disabled = true; }
    function restore(box, val, status) {
      let v = {}; try { v = JSON.parse(val || '{}'); } catch (e) { /* ignore */ }
      keys.forEach(k => {
        const inp = box.querySelector(`input.blank[data-key="${k}"]`);
        if (inp) { inp.value = v[k] !== undefined ? v[k] : ''; inp.classList.add(ok(k, v[k]) ? 'good' : 'badf'); }
        const grp = box.querySelector(`[data-key="${k}"]`);
        if (grp && !inp) grp.querySelectorAll('button').forEach(x => { if (v[k] !== undefined && norm(k, x.dataset.val) === norm(k, v[k])) x.classList.add(ok(k, v[k]) ? 'right' : 'wrong'); if (norm(k, x.dataset.val) === norm(k, q.fields[k].a)) x.classList.add('right'); });
        const ph = box.querySelector(`.seg-placeholder[data-key="${k}"]`); if (ph) ph.textContent = v[k] !== undefined ? v[k] : '?';
      });
      lock(box);
    }
    const answerText = q.answerText || keys.map(k => q.fields[k].a).join(', ');
    const stage = q.blocks ? `<div class="blocks">${Blocks.render(q.blocks, { scale: 1.4 })}</div>` : q.bigNum !== undefined ? U().bigNum(q.bigNum) : '';
    return {
      prompt: q.prompt || { zh: '填一填', en: 'Fill in the blanks' },
      stage,
      custom: { html, bind, value, markWrong, showAnswer, lock, restore },
      hint: q.hint || { zh: '想一想百位、十位、个位各是几。', en: 'Think about the hundreds, tens and ones.' },
      answerText,
      check: val => { try { const v = JSON.parse(val); return keys.every(k => ok(k, v[k])); } catch (e) { return false; } },
      answerDisplay: val => { try { const v = JSON.parse(val); return keys.map(k => v[k]).join(', '); } catch (e) { return val; } },
      explainKind: q.explain ? q.explain[0] : null, n: q.explain ? q.explain[1] : null,
    };
  };

  /* arrange：点数字排序  q = { id, type:'arrange', nums:[...], order:'asc'|'desc' } */
  window.QTypes.arrange = q => {
    const asc = q.order === 'asc';
    const sorted = q.nums.slice().sort((x, y) => asc ? x - y : y - x);
    function html() {
      return `<div class="arrange">
        <div class="tiles" id="tiles">${q.nums.map((n, i) => `<button type="button" class="tile" data-i="${i}" data-val="${n}">${n}</button>`).join('')}</div>
        <div class="arrow-hint">👇 按顺序点数字（${asc ? '从小到大' : '从大到小'}）｜ Tap the numbers in order（${asc ? 'smallest first' : 'greatest first'}）</div>
        <div class="slots" id="slots">${q.nums.map(() => '<span class="slot"></span>').join('')}</div>
        <div class="center mt"><button class="btn secondary small" id="undo">撤销一个 ↩</button> <button class="btn ok" id="submit" disabled>检查 ✔</button></div></div>`;
    }
    let picked = [];
    function draw(box) {
      const slots = box.querySelectorAll('.slot');
      slots.forEach((s, i) => { s.textContent = picked[i] !== undefined ? picked[i].val : ''; s.classList.toggle('filled', picked[i] !== undefined); });
      box.querySelectorAll('.tile').forEach(t => t.classList.toggle('used', picked.some(p => p.i === +t.dataset.i)));
      const sub = box.querySelector('#submit'); if (sub) sub.disabled = picked.length !== q.nums.length;
    }
    function bind(box, submit) {
      picked = [];
      box.querySelectorAll('.tile').forEach(t => t.onclick = () => { if (t.classList.contains('used') || t.disabled) return; picked.push({ i: +t.dataset.i, val: +t.dataset.val }); draw(box); if (picked.length === q.nums.length) setTimeout(submit, 250); });
      box.querySelector('#undo').onclick = () => { picked.pop(); draw(box); };
      box.querySelector('#submit').onclick = () => submit();
      draw(box);
    }
    const value = () => picked.length === q.nums.length ? picked.map(p => p.val).join(', ') : null;
    function markWrong(box) {
      const slots = box.querySelectorAll('.slot');
      slots.forEach((s, i) => s.classList.add(picked[i] && picked[i].val === sorted[i] ? 'right' : 'wrong'));
      // 让孩子重来：清空
      setTimeout(() => { picked = []; draw(box); slots.forEach(s => s.classList.remove('right', 'wrong')); }, 1200);
    }
    function showAnswer(box) { const slots = box.querySelectorAll('.slot'); slots.forEach((s, i) => { s.textContent = sorted[i]; s.classList.remove('wrong'); s.classList.add('filled', 'right'); }); lock(box); }
    function lock(box) { box.querySelectorAll('.tile, #undo, #submit').forEach(b => b.disabled = true); }
    function restore(box, val, status) {
      const vals = String(val || '').split(',').map(s => +s.trim()).filter(x => !isNaN(x));
      const slots = box.querySelectorAll('.slot');
      slots.forEach((s, i) => { s.textContent = vals[i] !== undefined ? vals[i] : sorted[i]; s.classList.add('filled', vals[i] === sorted[i] || vals[i] === undefined ? 'right' : 'wrong'); });
      lock(box);
    }
    return {
      prompt: { zh: asc ? '从小到大排一排' : '从大到小排一排', en: asc ? 'Arrange from the smallest' : 'Arrange from the greatest' },
      stage: '',
      custom: { html, bind, value, markWrong, showAnswer, lock, restore },
      hint: { zh: '先比百位，百位一样再比十位，十位也一样就比个位。', en: 'Compare the hundreds first, then the tens, then the ones.' },
      answerText: sorted.join(', '),
      check: val => val === sorted.join(', '),
      explainKind: 'arrange', n: { nums: q.nums, order: q.order },
    };
  };

})();
