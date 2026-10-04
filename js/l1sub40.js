/* Level 1：40 以内减法（Unit 12）讲解动画 */
(function () {
  const line = t => `<div class="expand-line">${t}</div>`;
  const L = window.L1, A = window.ArithUI;
  const wrap = (...parts) => `<div class="l1wrap">${parts.join('')}</div>`;
  const seq = (a, b) => { const r = []; for (let i = a; i <= b; i++) r.push(i); return r; };
  const eq = (a, b, s, hl) => `<div class="eqline"><span class="eq-s ${hl === 'a' ? 'hl' : ''}">${a}</span> − <span class="eq-s ${hl === 'b' ? 'hl' : ''}">${b}</span> = <span class="eq-s ${hl === 's' ? 'hl' : ''}">${s}</span></div>`;
  const T = n => Math.floor(n / 10), O = n => n % 10;

  const S = window.StepKinds;
  /* l1sub40back：数字条 20-40 往回数 {a, b} */
  S.l1sub40back = ({ a, b }) => {
    const d = a - b, from = Math.min(20, d), to = Math.max(40, a);
    const strip = o => L.strip(Object.assign({ from, to }, o));
    const steps = [{ zh: `圈出 <b>${a}</b>，往回跳 ${b} 格。`, en: `Circle ${a}. Count back ${b}.`, render: s => { s.innerHTML = wrap(strip({ circle: [a] }), eq(a, b, '?')); } }];
    for (let i = 1; i <= b; i++) steps.push({ zh: `第 ${i} 格：${a - i}。`, en: `${a - i}.`, render: s => { s.innerHTML = wrap(strip({ circle: [a], on: seq(a - i, a - 1) }), line(`${i} 格`)); } });
    steps.push({ zh: `停在 <b>${d}</b>：${a} − ${b} = ${d}。`, en: `${a} − ${b} = ${d}.`, render: s => { s.innerHTML = wrap(strip({ circle: [a, d], on: seq(d, a - 1) }), eq(a, b, d, 's')); } });
    return steps;
  };
  /* l1subtens：减整十 {a, b} b=10/20 */
  S.l1subtens = ({ a, b }) => {
    const d = a - b, from = Math.max(1, Math.min(d, 20)), to = Math.max(40, a);
    const strip = o => L.strip(Object.assign({ from, to }, o));
    const steps = [{ zh: `减 <b>${b}</b> 就是减 ${b / 10} 个十。在数字条上从 ${a} 往回数 ${b} 格，也可以直接看十位减 ${b / 10}。`, en: `Take away ${b / 10} tens.`, render: s => { s.innerHTML = wrap(strip({ circle: [a] }), eq(a, b, '?')); } }];
    for (let i = 10; i <= b; i += 10) steps.push({ zh: `往回 ${i} 格：${a - i}。`, en: `${a - i}.`, render: s => { s.innerHTML = wrap(strip({ circle: [a, a - i], on: seq(a - i, a - 1) }), line(`${a} − ${i} = ${a - i}`)); } });
    steps.push({ zh: `<b>${a} − ${b} = ${d}</b>：个位不变（${O(a)}），十位 ${T(a)} − ${b / 10} = ${T(d)}。`, en: `${a} − ${b} = ${d}. The ones stay the same.`, render: s => { s.innerHTML = wrap(strip({ circle: [a, d], on: seq(d, a - 1) }), eq(a, b, d, 's')); } });
    return steps;
  };
  /* l1splitsub：拆成几十和几再减 {a, b} 两位数 − 一位数（不退位） */
  S.l1splitsub = ({ a, b }) => {
    const d = a - b, t = T(a) * 10, o = O(a);
    return [
      { zh: `把 <b>${a}</b> 拆成 <b>${t}</b> 和 <b>${o}</b>。`, en: `Split ${a} into ${t} and ${o}.`, render: s => { s.innerHTML = wrap(L.bond(a, t, o, { hl: 'w' }), eq(a, b, '?')); } },
      { zh: `先用个位减：${o} − ${b} = <b>${o - b}</b>。`, en: `${o} − ${b} = ${o - b}.`, render: s => { s.innerHTML = wrap(L.bond(a, t, o, { hl: 'b' }), line(`${o} − ${b} = ${o - b}`)); } },
      { zh: `再加回 ${t}：${t} + ${o - b} = <b>${d}</b>。所以 ${a} − ${b} = ${d}。`, en: `${t} + ${o - b} = ${d}.`, render: s => { s.innerHTML = wrap(line(`${t} + ${o - b} = ${d}`), eq(a, b, d, 's')); } },
    ];
  };
  /* l1regroup：重新分组 {n}  n = t tens o ones = (t-1) ten (o+10) ones */
  S.l1regroup = ({ n }) => {
    const t = T(n), o = O(n), icon = '🔵';
    const framesA = `<div class="center">${L.tens(icon, n, { k: t })}</div>`;
    const framesB = `<div class="center"><div class="frames2 wrapf">${seq(1, t - 1).map(() => L.frame(icon, 10)).join('<span class="bond-plus">＋</span>')}${t > 1 ? '<span class="bond-plus">＋</span>' : ''}${L.frame(icon, 10, { cls: 'hlf' })}${o ? `<span class="bond-plus">＋</span>${L.frame(icon, o, { cls: 'hlf' })}` : ''}</div></div>`;
    const chart = (tt, oo) => `<table class="tochart"><tr><th>Tens</th><th>Ones</th></tr><tr><td>${tt}</td><td>${oo}</td></tr></table>`;
    return [
      { zh: `<b>${n}</b> 有 <b>${t}</b> 个十和 <b>${o}</b> 个一：${n} = ${t} tens ${o} ones。`, en: `${n} = ${t} tens ${o} ones.`, render: s => { s.innerHTML = wrap(framesA, chart(t, o)); } },
      { zh: `把其中 <b>1 个十</b>拆开，变成 <b>10 个一</b>（1 ten = 10 ones）。`, en: 'Regroup 1 ten into 10 ones.', render: s => { s.innerHTML = wrap(framesB, line(`1 ten = 10 ones`)); } },
      { zh: `十位少了 1：${t} − 1 = <b>${t - 1}</b>；个位多了 10：${o} + 10 = <b>${o + 10}</b>。所以 ${n} = ${t - 1} ten${t - 1 === 1 ? '' : 's'} ${o + 10} ones。`, en: `${n} = ${t - 1} ten ${o + 10} ones.`, render: s => { s.innerHTML = wrap(framesB, chart(t - 1, o + 10), line(`${n} = ${t} tens ${o} ones = ${t - 1} ten ${o + 10} ones`)); } },
    ];
  };
})();
