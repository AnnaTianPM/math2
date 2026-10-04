/* Level 1 · Unit 20 钱：认识硬币纸币、兑换、数钱、分和元的加减 讲解动画 */
(function () {
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '"': '&quot;', '>': '&gt;' }[c]));
  const line = t => `<div class="expand-line">${t}</div>`;
  const wrap = (...parts) => `<div class="l1wrap">${parts.join('')}</div>`;
  const M = window.MoneyUI, A = window.ArithUI;
  const NAMES = { 1: 'one cent', 5: 'five cents', 10: 'ten cents', 20: 'twenty cents', 50: 'fifty cents', 100: 'one dollar', 200: 'two dollars', 500: 'five dollars', 1000: 'ten dollars', 5000: 'fifty dollars', 10000: 'one hundred dollars' };
  const ZH = { 1: '1 分', 5: '5 分', 10: '1 角（10 分）', 20: '2 角（20 分）', 50: '5 角（50 分）', 100: '1 元', 200: '2 元', 500: '5 元', 1000: '10 元', 5000: '50 元', 10000: '100 元' };
  const show = v => v >= 100 ? `$${v / 100}` : `${v}¢`;
  const col = cfg => `<div class="center">${A.columnHTML(Object.assign({ width: 2 }, cfg))}</div>`;
  const T = n => Math.floor(n / 10), O = n => n % 10;

  const S = window.StepKinds;
  /* l1coinname：认识一枚钱 {v} */
  S.l1coinname = ({ v }) => [
    { zh: `看上面写的数字：<b>${show(v)}</b>。${v >= 100 ? '$ 是元（dollar）' : '¢ 是分（cent）'}。`, en: `It says ${show(v)}.`, render: s => { s.innerHTML = wrap(`<div class="center">${M.piece(v, { hl: true })}</div>`); } },
    { zh: `这是 <b>${NAMES[v]}</b>（${ZH[v]}）。`, en: NAMES[v], render: s => { s.innerHTML = wrap(`<div class="center">${M.piece(v)}</div>`, line(NAMES[v])); } },
  ];
  /* l1moneycount：数一类钱有几个 {items:[v...], v} */
  S.l1moneycount = ({ items, v }) => {
    const idx = items.map((x, i) => x === v ? i : -1).filter(i => i >= 0);
    return [
      { zh: `找出所有 <b>${show(v)}</b>${v >= 200 ? '纸币' : '硬币'}。`, en: `Find all the ${show(v)} ${v >= 200 ? 'notes' : 'coins'}.`, render: s => { s.innerHTML = wrap(`<div class="center">${M.group(items)}</div>`); } },
      { zh: `一个一个数：一共 <b>${idx.length}</b> 个。`, en: `${idx.length}.`, render: s => { s.innerHTML = wrap(`<div class="center">${M.group(items, { sel: idx })}</div>`, line(`${idx.length} × ${show(v)}`)); } },
    ];
  };
  /* l1moneyvalue：一组同面值的总值 {v, n} */
  S.l1moneyvalue = ({ v, n }) => {
    const items = Array(n).fill(v), total = v * n;
    const steps = [{ zh: `${n} 个 <b>${show(v)}</b>，${v >= 100 ? '一个一个' : `${v} 个 ${v} 个`}地数。`, en: `${n} × ${show(v)}. Count in ${v >= 100 ? 'ones' : v + 's'}.`, render: s => { s.innerHTML = wrap(`<div class="center">${M.group(items, { dimAfter: 0 })}</div>`); } }];
    for (let i = 1; i <= n; i++) steps.push({ zh: `${show(v * i)}`, en: show(v * i), render: s => { s.innerHTML = wrap(`<div class="center">${M.group(items, { dimAfter: i, hlIdx: i - 1 })}</div>`, line(Array.from({ length: i }, (_, k) => show(v * (k + 1))).join('，'))); } });
    steps.push({ zh: `一共 <b>${show(total)}</b>。`, en: `Total ${show(total)}.`, render: s => { s.innerHTML = wrap(`<div class="center">${M.group(items)}</div>`, line(`${n} × ${show(v)} = ${show(total)}`)); } });
    return steps;
  };
  /* l1exchange：换钱 {big, small} big = n × small */
  S.l1exchange = ({ big, small }) => {
    const n = big / small, items = Array(n).fill(small);
    const steps = [{ zh: `<b>${show(big)}</b> 可以换成几个 <b>${show(small)}</b>？${show(small)} 一个一个加，加到 ${show(big)} 为止。`, en: `How many ${show(small)} make ${show(big)}?`, render: s => { s.innerHTML = wrap(`<div class="center">${M.piece(big)}</div><div class="center" style="font-size:24px">⇅</div><div class="center">${M.group(items, { dimAfter: 0 })}</div>`); } }];
    const marks = n <= 5 ? Array.from({ length: n }, (_, i) => i + 1) : [1, 2, n];
    marks.forEach(i => steps.push({ zh: `${i} 个：${show(small * i)}${i === n ? `，正好是 ${show(big)}` : ''}。`, en: show(small * i), render: s => { s.innerHTML = wrap(`<div class="center">${M.piece(big)}</div><div class="center" style="font-size:24px">⇅</div><div class="center">${M.group(items, { dimAfter: i, hlIdx: i - 1 })}</div>`, line(`${i} × ${show(small)} = ${show(small * i)}`)); } }));
    steps.push({ zh: `所以 <b>${show(big)} = ${n} 个 ${show(small)}</b>。`, en: `${show(big)} = ${n} × ${show(small)}.`, render: s => { s.innerHTML = wrap(`<div class="center">${M.piece(big)}</div><div class="center">${M.group(items)}</div>`, line(`${show(big)} = ${n} × ${show(small)}`)); } });
    return steps;
  };
  /* l1countmoney：按顺序往上数 {items} 结果用 ¢ 或 $ */
  S.l1countmoney = ({ items }) => {
    const sorted = items.slice().sort((a, b) => b - a), total = sorted.reduce((s, v) => s + v, 0);
    const fmtT = total >= 100 && total % 100 === 0 ? `$${total / 100}` : total < 100 ? `${total}¢` : M.fmt(total);
    const steps = [{ zh: '先数大的，再数小的。从最大的开始往上加（counting on）。', en: 'Start with the largest and count on.', render: s => { s.innerHTML = wrap(`<div class="center">${M.group(sorted, { dimAfter: 0 })}</div>`); } }];
    let run = 0;
    sorted.forEach((v, i) => { run += v; const r = run; steps.push({ zh: `${i === 0 ? '' : '再加 ' + show(v) + '：'}<b>${r < 100 || r % 100 ? (r < 100 ? r + '¢' : M.fmt(r)) : '$' + r / 100}</b>`, en: `${r < 100 ? r + '¢' : M.fmt(r)}`, render: s => { s.innerHTML = wrap(`<div class="center">${M.group(sorted, { dimAfter: i + 1, hlIdx: i })}</div>`, line(sorted.slice(0, i + 1).map((_, k) => { const t = sorted.slice(0, k + 1).reduce((a, b) => a + b, 0); return t < 100 ? t + '¢' : (t % 100 ? M.fmt(t) : '$' + t / 100); }).join(' → '))); } }); });
    steps.push({ zh: `一共 <b>${fmtT}</b>。`, en: `Total ${fmtT}.`, render: s => { s.innerHTML = wrap(`<div class="center">${M.group(sorted)}</div>`, line(fmtT)); } });
    return steps;
  };
  /* l1makeamount：从一堆钱里选出正好 target {items, target} */
  S.l1makeamount = ({ items, target }) => {
    const sol = (() => { const n = items.length; for (let mask = 1; mask < (1 << n); mask++) { let s = 0; const p = []; for (let i = 0; i < n; i++) if (mask & (1 << i)) { s += items[i]; p.push(i); } if (s === target) return p; } return []; })();
    const sel = sol.slice().sort((a, b) => items[b] - items[a]);
    const steps = [{ zh: `要凑出 <b>${show(target)}</b>。先从大的开始拿，一边拿一边加，不要超过 ${show(target)}。`, en: `Make ${show(target)}: start with the largest.`, render: s => { s.innerHTML = wrap(`<div class="center">${M.group(items)}</div>`, line(`? = ${show(target)}`)); } }];
    let run = 0;
    sel.forEach((idx, k) => { run += items[idx]; const r = run; steps.push({ zh: `拿 ${show(items[idx])}：${k === 0 ? '' : '加起来 '}<b>${show(r)}</b>${r === target ? '，正好！' : `，还差 ${show(target - r)}`}。`, en: show(r), render: s => { s.innerHTML = wrap(`<div class="center">${M.group(items, { sel: sel.slice(0, k + 1) })}</div>`, line(`${sel.slice(0, k + 1).map(i => show(items[i])).join(' + ')} = ${show(r)}`)); } }); });
    return steps;
  };
  /* l1centsadd / l1centssub：分的竖式 {a, b, op, groupsA?, groupsB?} */
  S.l1centsop = ({ a, b, op, ga, gb }) => {
    const ans = op === '+' ? a + b : a - b, sym = op === '+' ? '+' : '−';
    const colSteps = (op === '+' ? S.l1coladd({ a, b }) : S.l1colsub({ a, b })).slice(1);
    const pics = ga ? `<div class="center money-two"><span>${M.group(ga)}<b>${show(a)}</b></span><span class="op">${sym}</span><span>${M.group(gb)}<b>${show(b)}</b></span></div>` : '';
    const steps = [];
    if (ga) { steps.push({ zh: `先数左边：<b>${show(a)}</b>。再数右边：<b>${show(b)}</b>。`, en: `${show(a)} and ${show(b)}.`, render: s => { s.innerHTML = wrap(pics); } }); }
    steps.push({ zh: `${show(a)} ${sym} ${show(b)}：分和分${op === '+' ? '相加' : '相减'}，像普通的数一样列竖式，最后加上 ¢。`, en: `${a}¢ ${sym} ${b}¢: work in columns.`, render: s => { s.innerHTML = wrap(col({ a, b, op })); } });
    colSteps.forEach(st => steps.push(Object.assign({}, st, { zh: st.zh.replace(/<b>(\d+) (\+|−) (\d+) = (\d+)<\/b>/, '<b>$1¢ $2 $3¢ = $4¢</b>') })));
    steps.push({ zh: `答案：<b>${show(ans)}</b>${ans === 100 ? '（100¢ 就是 $1）' : ''}。`, en: `${show(ans)}.`, render: s => { s.innerHTML = wrap(line(`${show(a)} ${sym} ${show(b)} = ${show(ans)}`)); } });
    return steps;
  };
  /* l1dollarsop：元的竖式 {a, b, op, ga?, gb?} */
  S.l1dollarsop = ({ a, b, op, ga, gb }) => {
    const ans = op === '+' ? a + b : a - b, sym = op === '+' ? '+' : '−';
    const colSteps = (op === '+' ? S.l1coladd({ a, b }) : S.l1colsub({ a, b })).slice(1);
    const pics = ga ? `<div class="center money-two"><span>${M.group(ga)}<b>$${a}</b></span><span class="op">${sym}</span><span>${M.group(gb)}<b>$${b}</b></span></div>` : '';
    const steps = [];
    if (ga) steps.push({ zh: `先数左边：<b>$${a}</b>。再数右边：<b>$${b}</b>。`, en: `$${a} and $${b}.`, render: s => { s.innerHTML = wrap(pics); } });
    steps.push({ zh: `$${a} ${sym} $${b}：元和元${op === '+' ? '相加' : '相减'}，列竖式，前面写 $。`, en: `$${a} ${sym} $${b}: work in columns.`, render: s => { s.innerHTML = wrap(col({ a, b, op })); } });
    colSteps.forEach(st => steps.push(Object.assign({}, st, { zh: st.zh.replace(/<b>(\d+) (\+|−) (\d+) = (\d+)<\/b>/, '<b>$$$1 $2 $$$3 = $$$4</b>') })));
    steps.push({ zh: `答案：<b>$${ans}</b>。`, en: `$${ans}.`, render: s => { s.innerHTML = wrap(line(`$${a} ${sym} $${b} = $${ans}`)); } });
    return steps;
  };
  /* l1shop：商店题 {en, zh, items:[[name, price]], pick:[names], op, extra?, unit:'c'|'d', sentence, ans} */
  S.l1shop = ({ en, zh, prices, a, b, op, unit, sentence, ans, pair }) => {
    const u = unit === 'd' ? v => `$${v}` : v => `${v}¢`;
    const text = `<div class="wp-text"><div class="wp-en">${esc(en)}</div><div class="wp-zh">${esc(zh)}</div></div>`;
    const tab = hl => `<div class="price-tags">${prices.map(([n, p]) => `<span class="ptag ${hl && hl.includes(n) ? 'hl' : ''}">${n} <b>${u(p)}</b></span>`).join('')}</div>`;
    if (pair) return [
      { zh: `要找两样东西加起来正好 <b>${u(ans)}</b>。先看每样的价钱。`, en: `Which two make exactly ${u(ans)}?`, render: s => { s.innerHTML = wrap(text, tab()); } },
      { zh: `试一试：<b>${pair[0]}</b> ${u(a)} + <b>${pair[1]}</b> ${u(b)} = ${u(a + b)} ✔。`, en: `${pair[0]} + ${pair[1]} = ${u(a + b)}.`, render: s => { s.innerHTML = wrap(tab(pair), line(`${u(a)} + ${u(b)} = ${u(a + b)}`)); } },
    ];
    const sym = op === '+' ? '+' : '−';
    const colSteps = (op === '+' ? S.l1coladd({ a, b }) : S.l1colsub({ a, b })).slice(1, -1);
    return [
      { zh: `读题，找到要用的价钱${op === '+' ? '，两样合起来用<b>加法</b>' : '，找零 / 还差多少 / 多多少用<b>减法</b>'}。`, en: op === '+' ? 'Add.' : 'Subtract.', render: s => { s.innerHTML = wrap(text, tab()); } },
      { zh: `列算式：<b>${u(a)} ${sym} ${u(b)}</b>。`, en: `${u(a)} ${sym} ${u(b)}.`, render: s => { s.innerHTML = wrap(line(`${u(a)} ${sym} ${u(b)} = ?`), col({ a, b, op })); } },
      ...colSteps,
      { zh: `答：${esc(sentence).replace('___', `<b>${u(ans)}</b>`)}`, en: sentence.replace('___', u(ans)), render: s => { s.innerHTML = wrap(line(`${u(a)} ${sym} ${u(b)} = ${u(ans)}`), line(esc(sentence).replace('___', `<b>${u(ans)}</b>`))); } },
    ];
  };
  /* ---------- 题型 l1pickmoney：点选硬币/纸币凑出 target q = { id, type:'l1pickmoney', icon?, target(cents), sets:[[...]] } */
  window.QTypes.l1pickmoney = q => {
    let sel = q.sets.map(() => new Set());
    const many = q.sets.length > 1;
    const html = () => `<div class="pick-sets">${q.icon ? `<div class="center scene-ico">${q.icon} <b style="font-size:22px;vertical-align:middle">${show(q.target)}</b></div>` : ''}${q.sets.map((set, si) => `<div class="pick-set" data-si="${si}"><div class="sub">${many ? `第 ${si + 1} 种 Way ${si + 1}：` : ''}点选凑成 <b>${show(q.target)}</b>　已选：<b class="pick-sum" id="sum${si}">0¢</b></div>${M.group(set)}</div>`).join('')}
      <div class="center mt"><button class="btn ok" id="submit">检查 ✔</button></div></div>`;
    const sumOf = (si, idx) => idx.reduce((s, i) => s + q.sets[si][i], 0);
    function sums(box) { q.sets.forEach((set, si) => { const t = sumOf(si, [...sel[si]]); const el = box.querySelector(`#sum${si}`); if (el) { el.textContent = t >= 100 && t % 100 ? M.fmt(t) : show(t); el.classList.toggle('ok', t === q.target); } }); }
    function bind(box, submit) {
      sel = q.sets.map(() => new Set());
      box.querySelectorAll('.pick-set').forEach(ps => { const si = +ps.dataset.si; [...ps.querySelectorAll('.money')].forEach((m, i) => { m.onclick = () => { if (m.classList.contains('locked')) return; if (sel[si].has(i)) { sel[si].delete(i); m.classList.remove('sel'); } else { sel[si].add(i); m.classList.add('sel'); } sums(box); }; }); });
      box.querySelector('#submit').onclick = () => submit();
    }
    const value = () => sel.every(s => s.size === 0) ? null : JSON.stringify(sel.map(s => [...s].sort((a, b) => a - b)));
    function markWrong(box, val) { const v = JSON.parse(val); q.sets.forEach((set, si) => { const ok = sumOf(si, v[si] || []) === q.target; const ps = box.querySelector(`.pick-set[data-si="${si}"]`); ps.classList.toggle('right', ok); ps.classList.toggle('wrong', !ok); if (ok) ps.querySelectorAll('.money').forEach(m => m.classList.add('locked')); }); }
    function solution(set) { const n = set.length; for (let mask = 1; mask < (1 << n); mask++) { let s = 0; const p = []; for (let i = 0; i < n; i++) if (mask & (1 << i)) { s += set[i]; p.push(i); } if (s === q.target) return p; } return []; }
    function lock(box) { box.querySelectorAll('.money').forEach(m => m.classList.add('locked')); const s = box.querySelector('#submit'); if (s) s.disabled = true; }
    function showAnswer(box) { q.sets.forEach((set, si) => { const ps = box.querySelector(`.pick-set[data-si="${si}"]`); const ms = [...ps.querySelectorAll('.money')]; ms.forEach(m => m.classList.remove('sel')); sel[si] = new Set(solution(set)); solution(set).forEach(i => ms[i].classList.add('sel')); ps.classList.remove('wrong'); ps.classList.add('right'); }); lock(box); sums(box); }
    function restore(box, val) { let v = []; try { v = JSON.parse(val || '[]'); } catch (e) { /* */ } q.sets.forEach((set, si) => { const ps = box.querySelector(`.pick-set[data-si="${si}"]`); const ms = [...ps.querySelectorAll('.money')]; (v[si] || []).forEach(i => { if (ms[i]) ms[i].classList.add('sel'); }); sel[si] = new Set(v[si] || []); const ok = sumOf(si, v[si] || []) === q.target; ps.classList.add(ok ? 'right' : 'wrong'); }); sums(box); lock(box); }
    return {
      prompt: q.prompt || { zh: many ? `用两种不同的方法凑出 ${show(q.target)}` : `点选硬币或纸币，凑出正好 ${show(q.target)}`, en: many ? `Make ${show(q.target)} in two different ways` : `Pick coins or notes to make exactly ${show(q.target)}` },
      stage: '',
      custom: { html, bind, value, markWrong, showAnswer, lock, restore },
      hint: { zh: '先选大的，再用小的补齐。看“已选”有没有变成目标。', en: 'Pick the large ones first, then fill in with small ones.' },
      answerText: q.sets.map(set => solution(set).map(i => show(set[i])).join('+')).join(' / '), check: v => { try { const o = JSON.parse(v); return q.sets.every((set, si) => sumOf(si, o[si] || []) === q.target); } catch (e) { return false; } },
      answerDisplay: v => { try { const o = JSON.parse(v); return o.map((idx, si) => show(sumOf(si, idx))).join(' / '); } catch (e) { return v; } },
      explainKind: 'l1makeamount', n: { items: q.sets[0], target: q.target },
    };
  };
  window.L1.MONEY_NAMES = NAMES;
})();
