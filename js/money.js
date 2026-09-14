/* 钱：纸币/硬币绘制 + 讲解 + 选钱题型 */
(function () {
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const line = t => `<div class="expand-line">${t}</div>`;
  const fmt = c => `$${(c / 100).toFixed(2)}`;

  // 面值（分）：10000 5000 1000 500 200 | 100 50 20 10 5
  const NOTE_COLORS = { 10000: '#f39c12', 5000: '#3498db', 1000: '#e74c3c', 500: '#27ae60', 200: '#8e44ad' };
  function piece(v, opts = {}) {
    const cls = `money ${opts.sel ? 'sel' : ''} ${opts.dim ? 'dim' : ''} ${opts.hl ? 'hl' : ''}`;
    if (v >= 200) {
      const c = NOTE_COLORS[v];
      return `<span class="${cls} note" data-v="${v}" style="--c:${c}"><b>$${v / 100}</b><i>${{ 10000: 'ONE HUNDRED', 5000: 'FIFTY', 1000: 'TEN', 500: 'FIVE', 200: 'TWO' }[v]} DOLLARS</i></span>`;
    }
    if (v === 100) return `<span class="${cls} coin gold" data-v="${v}"><b>$1</b></span>`;
    const size = v === 50 ? 'big' : v === 5 ? 'small' : '';
    return `<span class="${cls} coin ${size}" data-v="${v}"><b>${v}¢</b></span>`;
  }
  // items: 面值数组（分）
  function group(items, opts = {}) {
    return `<div class="money-group">${items.map((v, i) => piece(v, { sel: opts.sel && opts.sel.includes(i), dim: opts.dimAfter !== undefined && i >= opts.dimAfter, hl: opts.hlIdx === i })).join('')}</div>`;
  }
  const total = items => items.reduce((s, v) => s + v, 0);

  /* ---------- 讲解 ---------- */
  // 数一组钱：先大后小，累加
  window.StepKinds.countmoney = ({ items }) => {
    const sorted = items.slice().sort((a, b) => b - a);
    const steps = [{ zh: '数钱的时候，先数大的（纸币），再数小的（硬币）。把钱从大到小排一排。', en: 'Count the notes first, then the coins. Arrange from largest to smallest.', render: s => { s.innerHTML = group(sorted, { dimAfter: 0 }); } }];
    let run = 0;
    sorted.forEach((v, i) => {
      run += v;
      steps.push({ zh: `${i === 0 ? '' : '再加 '}${v >= 100 ? `$${v / 100}` : `${v}¢`}：一共 <b>${fmt(run)}</b>`, en: `${i === 0 ? '' : 'Add '}${v >= 100 ? `$${v / 100}` : `${v}¢`}: ${fmt(run)}`, render: s => { s.innerHTML = group(sorted, { dimAfter: i + 1, hlIdx: i }) + line(fmt(run)); } });
    });
    const t = total(items), d = Math.floor(t / 100), c = t % 100;
    steps.push({ zh: `一共 <b>${fmt(t)}</b>：${d} 元 ${c} 分（${d} dollars and ${c} cents）${c === 0 ? `，也可以写成 $${d}` : ''}。`, en: `Total ${fmt(t)}: ${d} dollars and ${c} cents.`, render: s => { s.innerHTML = group(sorted) + line(`${fmt(t)} = ${d} dollars ${c} cents`); } });
    return steps;
  };
  // 元 ↔ 分
  window.StepKinds.dollars2cents = ({ dollars }) => {
    const c = Math.round(dollars * 100), d = Math.floor(c / 100), r = c % 100;
    return [
      { zh: `$${dollars.toFixed(2)} 里，小数点前面是<b>元</b>（${d}），后面是<b>分</b>（${r}）。`, en: `$${dollars.toFixed(2)}: ${d} dollars and ${r} cents.`, render: s => { s.innerHTML = line(`$${dollars.toFixed(2)} = $${d} + ${r}¢`); } },
      { zh: `1 元 = 100 分，所以 ${d} 元 = ${d * 100} 分。`, en: `$1 = 100¢, so $${d} = ${d * 100}¢.`, render: s => { s.innerHTML = line(`$${d} = ${d * 100}¢`); } },
      { zh: `${d * 100}¢ + ${r}¢ = <b>${c}¢</b>`, en: `${d * 100}¢ + ${r}¢ = ${c}¢`, render: s => { s.innerHTML = line(`${d * 100}¢ + ${r}¢ = ${c}¢`); } },
    ];
  };
  window.StepKinds.cents2dollars = ({ cents }) => {
    const d = Math.floor(cents / 100), r = cents % 100;
    return [
      { zh: `${cents}¢：每 100 分换成 1 元。${cents} 里有 ${d} 个 100${r ? `，还剩 ${r}` : ''}。`, en: `${cents}¢ = ${d} hundreds${r ? ` and ${r}` : ''}.`, render: s => { s.innerHTML = line(`${cents}¢ = ${d * 100}¢ + ${r}¢`); } },
      { zh: `${d * 100}¢ = $${d}${r ? `，${r}¢ 写在小数点后面` : ''}。`, en: `${d * 100}¢ = $${d}.`, render: s => { s.innerHTML = line(`${d * 100}¢ = $${d}<br>${r}¢`); } },
      { zh: `所以 ${cents}¢ = <b>$${(cents / 100).toFixed(2)}</b>。${r < 10 && r > 0 ? `注意：${r} 分要写成 0${r}，占两位。` : ''}`, en: `So ${cents}¢ = $${(cents / 100).toFixed(2)}.`, render: s => { s.innerHTML = line(`${cents}¢ = $${(cents / 100).toFixed(2)}`); } },
    ];
  };
  // 比较金额
  window.StepKinds.cmpmoney = ({ items }) => { // [{label, v(cents)}]
    const sorted = items.slice().sort((a, b) => b.v - a.v);
    const table = hl => `<table class="money-table"><tr><th></th><th>Dollars 元</th><th>Cents 分</th></tr>${items.map(it => `<tr><td>${esc(it.label)}</td><td class="${hl === 'd' ? 'hl' : ''}">${Math.floor(it.v / 100)}</td><td class="${hl === 'c' ? 'hl' : ''}">${String(it.v % 100).padStart(2, '0')}</td></tr>`).join('')}</table>`;
    const sameD = new Set(items.map(i => Math.floor(i.v / 100))).size < items.length;
    const steps = [
      { zh: '把每个金额的元和分分开写在表里。', en: 'Write the dollars and cents in a table.', render: s => { s.innerHTML = table(null); } },
      { zh: `先比<b>元</b>：${items.map(i => `${i.label} ${Math.floor(i.v / 100)}`).join('，')}。元多的钱就多。`, en: 'Compare the dollars first.', render: s => { s.innerHTML = table('d'); } },
    ];
    if (sameD) steps.push({ zh: '元一样多的，再比<b>分</b>。', en: 'If the dollars are the same, compare the cents.', render: s => { s.innerHTML = table('c'); } });
    steps.push({ zh: `从多到少：<b>${sorted.map(i => `${i.label} ${fmt(i.v)}`).join(' > ')}</b>`, en: sorted.map(i => `${i.label} ${fmt(i.v)}`).join(' > '), render: s => { s.innerHTML = table(null) + line(sorted.map(i => fmt(i.v)).join(' > ')); } });
    return steps;
  };

  /* ---------- 题型：选钱凑数 ---------- */
  // q = { id, type:'pickmoney', target(cents), sets:[[...], [...]] }  每组要选出一些凑成 target
  window.QTypes.pickmoney = q => {
    let sel = q.sets.map(() => new Set());
    function html() {
      return `<div class="pick-sets">${q.sets.map((set, si) => `<div class="pick-set" data-si="${si}"><div class="sub">第 ${si + 1} 种 Way ${si + 1}：点选凑成 <b>${fmt(q.target)}</b>　已选：<b class="pick-sum" id="sum${si}">$0.00</b></div>${group(set)}</div>`).join('')}
        <div class="center mt"><button class="btn ok" id="submit">检查 ✔</button></div></div>`;
    }
    function sums(box) { q.sets.forEach((set, si) => { const t = [...sel[si]].reduce((s, i) => s + set[i], 0); const el = box.querySelector(`#sum${si}`); if (el) { el.textContent = fmt(t); el.classList.toggle('ok', t === q.target); } }); }
    function bind(box, submit) {
      sel = q.sets.map(() => new Set());
      box.querySelectorAll('.pick-set').forEach(ps => { const si = +ps.dataset.si; [...ps.querySelectorAll('.money')].forEach((m, i) => { m.onclick = () => { if (m.classList.contains('locked')) return; if (sel[si].has(i)) { sel[si].delete(i); m.classList.remove('sel'); } else { sel[si].add(i); m.classList.add('sel'); } sums(box); }; }); });
      box.querySelector('#submit').onclick = () => submit();
    }
    const value = () => JSON.stringify(sel.map(s => [...s].sort((a, b) => a - b)));
    const sumOf = (si, idx) => idx.reduce((s, i) => s + q.sets[si][i], 0);
    function markWrong(box, val) { const v = JSON.parse(val); q.sets.forEach((set, si) => { const ok = sumOf(si, v[si]) === q.target; const ps = box.querySelector(`.pick-set[data-si="${si}"]`); ps.classList.toggle('right', ok); ps.classList.toggle('wrong', !ok); if (ok) ps.querySelectorAll('.money').forEach(m => m.classList.add('locked')); }); }
    // 标准答案：贪心找一组子集
    function solution(set) { const idx = set.map((v, i) => i).sort((a, b) => set[b] - set[a]); const pick = []; let rem = q.target; for (const i of idx) if (set[i] <= rem) { pick.push(i); rem -= set[i]; } if (rem !== 0) { /* 回溯 */ const n = set.length; for (let mask = 1; mask < (1 << n); mask++) { let s = 0; const p = []; for (let i = 0; i < n; i++) if (mask & (1 << i)) { s += set[i]; p.push(i); } if (s === q.target) return p; } } return pick; }
    function showAnswer(box) { q.sets.forEach((set, si) => { const ps = box.querySelector(`.pick-set[data-si="${si}"]`); const ms = [...ps.querySelectorAll('.money')]; ms.forEach(m => m.classList.remove('sel')); solution(set).forEach(i => ms[i].classList.add('sel')); ps.classList.remove('wrong'); ps.classList.add('right'); }); lock(box); sums(box); }
    function lock(box) { box.querySelectorAll('.money').forEach(m => m.classList.add('locked')); const s = box.querySelector('#submit'); if (s) s.disabled = true; }
    function restore(box, val) { let v = []; try { v = JSON.parse(val || '[]'); } catch (e) { /* */ } q.sets.forEach((set, si) => { const ps = box.querySelector(`.pick-set[data-si="${si}"]`); const ms = [...ps.querySelectorAll('.money')]; (v[si] || []).forEach(i => { if (ms[i]) ms[i].classList.add('sel'); }); sel[si] = new Set(v[si] || []); const ok = sumOf(si, v[si] || []) === q.target; ps.classList.add(ok ? 'right' : 'wrong'); }); sums(box); lock(box); }
    return {
      prompt: { zh: `用两种不同的方法选出 ${fmt(q.target)}`, en: `Pick ${fmt(q.target)} in two different ways` },
      stage: '',
      custom: { html, bind, value, markWrong, showAnswer, lock, restore },
      hint: { zh: '先选大的纸币，再用硬币补齐零头。看"已选"的数字有没有变成目标。', en: 'Pick the notes first, then use coins for the cents.' },
      answerText: fmt(q.target),
      check: v => { try { const o = JSON.parse(v); return q.sets.every((set, si) => sumOf(si, o[si] || []) === q.target); } catch (e) { return false; } },
      answerDisplay: v => { try { const o = JSON.parse(v); return o.map((idx, si) => fmt(sumOf(si, idx))).join(' / '); } catch (e) { return v; } },
      explainKind: 'countmoney', n: { items: q.sets[0].filter((v, i) => solution(q.sets[0]).includes(i)) },
    };
  };

  window.MoneyUI = { piece, group, total, fmt };
})();
