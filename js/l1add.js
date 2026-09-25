/* Level 1：10 以内加法的讲解动画（数字组合加、往后数、加法故事、找和、缺数、应用题） */
(function () {
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '"': '&quot;', '>': '&gt;' }[c]));
  const line = t => `<div class="expand-line">${t}</div>`;
  const L = window.L1;
  const wrap = (...parts) => `<div class="l1wrap">${parts.join('')}</div>`;
  const img = (name, w) => `<img class="figimg" src="img/${name}.png" alt="" style="max-width:${w || 360}px">`;

  /* 往后数的一排：第一组 a 个（下标 1..a），第二组 b 个（上面标 a+1..a+b） */
  function counton(a, b, icon, o = {}) {
    const k = o.k === undefined ? b : o.k;   // 已经数到第 k 个
    const first = `<span class="co-grp">${Array.from({ length: a }, (_, i) => `<span class="co-item"><span class="co-top"></span><span class="co-ico">${icon}</span><b class="co-bot">${i + 1}</b></span>`).join('')}<b class="co-start">${a}</b></span>`;
    const second = `<span class="co-grp on">${Array.from({ length: b }, (_, i) => `<span class="co-item ${i < k ? 'hl' : ''}"><span class="co-top">${i < k ? `<i class="co-arrow"></i>${a + i + 1}` : ''}</span><span class="co-ico">${icon}</span><b class="co-bot">${i + 1}</b></span>`).join('')}</span>`;
    return `<div class="counton">${first}<span class="bond-plus">＋</span>${second}</div>`;
  }
  /* 数字跳跃：from 开始跳 n 次 */
  const hops = (from, n, k) => `<div class="hops">${Array.from({ length: n + 1 }, (_, i) => `<span class="hop ${i === 0 ? 'start' : i <= k ? 'on' : ''}">${i > 0 && i <= k ? '<i class="co-arrow"></i>' : ''}${from + i}</span>`).join('')}</div>`;
  const eq = (a, b, s, o = {}) => `<div class="eqline"><span class="eq-c ${o.hl === 'a' ? 'hl' : ''}">${a}</span> + <span class="eq-t ${o.hl === 'b' ? 'hl' : ''}">${b}</span> = <span class="eq-s ${o.hl === 's' ? 'hl' : ''}">${s}</span></div>`;

  const S = window.StepKinds;
  /* l1addbond：看图用数字组合加 {groups:[{icon,n},{icon,n}], pic?, noun} */
  S.l1addbond = ({ groups: gs, pic, noun }) => {
    const a = gs[0].n, b = gs[1].n, w = a + b;
    const scene = hl => pic ? `<div class="center">${img(pic, 300)}</div>` : L.groups(gs, hl);
    return [
      { zh: `先数第一组：<b>${a}</b> 个。写在第一个小圈。`, en: `Count the first group: ${a}.`, render: s => { s.innerHTML = wrap(scene({ nums: 0, hl: 0 }), L.bond('?', a, '?', { hl: 'a' })); } },
      { zh: `再数第二组：<b>${b}</b> 个。写在第二个小圈。`, en: `Count the second group: ${b}.`, render: s => { s.innerHTML = wrap(scene({ nums: 1, hl: 1 }), L.bond('?', a, b, { hl: 'b' })); } },
      { zh: `${a} and ${b} make <b>${w}</b>。数字组合帮我们做加法：<b>${a} + ${b} = ${w}</b>。`, en: `${a} and ${b} make ${w}, so ${a} + ${b} = ${w}.`, render: s => { s.innerHTML = wrap(L.bond(w, a, b, { hl: 'w' }), eq(a, b, w, { hl: 's' })); } },
      { zh: `反过来加也一样：<b>${b} + ${a} = ${w}</b>。所以一共有 <b>${w}</b>${noun ? ' ' + esc(noun) : ''}。`, en: `${b} + ${a} = ${w} too. There are ${w} ${noun || ''} in all.`, render: s => { s.innerHTML = wrap(L.bond(w, a, b), eq(a, b, w), eq(b, a, w), line(`There are ${w} ${noun || ''} in all.`)); } },
    ];
  };
  /* l1counton：往后数 {a, b, icon} */
  S.l1counton = ({ a, b, icon = '🔵' }) => {
    const sum = a + b;
    const steps = [
      { zh: `第一组有 <b>${a}</b> 个，不用一个个重数，直接从 <b>${a}</b> 开始。`, en: `The first group has ${a}. Start from ${a}.`, render: s => { s.innerHTML = wrap(counton(a, b, icon, { k: 0 }), hops(a, b, 0)); } },
    ];
    for (let i = 1; i <= b; i++) steps.push({ zh: `往后数第 ${i} 个：<b>${a + i}</b>。`, en: `Count on: ${a + i}.`, render: s => { s.innerHTML = wrap(counton(a, b, icon, { k: i }), hops(a, b, i)); } });
    steps.push({ zh: `数完第二组的 ${b} 个，停在 <b>${sum}</b>。所以 <b>${a} + ${b} = ${sum}</b>。`, en: `Stop at ${sum}. ${a} + ${b} = ${sum}.`, render: s => { s.innerHTML = wrap(counton(a, b, icon), hops(a, b, b), eq(a, b, sum, { hl: 's' })); } });
    return steps;
  };
  /* l1cubes：看方块写加法 {a, b} */
  S.l1cubes = ({ a, b }) => {
    const sum = a + b;
    return [
      { zh: `数第一堆方块：<b>${a}</b> 个。`, en: `Count the first tower: ${a}.`, render: s => { s.innerHTML = wrap(L.groups([{ icon: '🟧', n: a }, { icon: '🟧', n: b }], { nums: 0, hl: 0 }), eq(a, '?', '?', { hl: 'a' })); } },
      { zh: `第二堆有 <b>${b}</b> 个。`, en: `The second tower: ${b}.`, render: s => { s.innerHTML = wrap(L.groups([{ icon: '🟧', n: a }, { icon: '🟧', n: b }], { nums: 1, hl: 1 }), eq(a, b, '?', { hl: 'b' })); } },
      { zh: `从 ${a} 往后数 ${b} 个：${Array.from({ length: b }, (_, i) => a + i + 1).join('、')}。<b>${a} + ${b} = ${sum}</b>。`, en: `Count on from ${a}: ${sum}.`, render: s => { s.innerHTML = wrap(hops(a, b, b), eq(a, b, sum, { hl: 's' })); } },
    ];
  };
  /* l1morethan：b more than a {a, b} */
  S.l1morethan = ({ a, b }) => {
    const sum = a + b;
    return [
      { zh: `“${b} more than ${a}” 就是<b>比 ${a} 多 ${b}</b>：从 ${a} 开始再加 ${b}，算式是 <b>${a} + ${b}</b>。`, en: `${b} more than ${a} means ${a} + ${b}.`, render: s => { s.innerHTML = wrap(line(`${b} more than ${a} = ${a} + ${b}`)); } },
      { zh: `从 ${a} 往后数 ${b} 个：${Array.from({ length: b }, (_, i) => a + i + 1).join('、')}。`, en: `Count on ${b} from ${a}.`, render: s => { s.innerHTML = wrap(hops(a, b, b)); } },
      { zh: `停在 <b>${sum}</b>：${b} more than ${a} = ${a} + ${b} = <b>${sum}</b>。`, en: `${a} + ${b} = ${sum}.`, render: s => { s.innerHTML = wrap(hops(a, b, b), eq(a, b, sum, { hl: 's' })); } },
    ];
  };
  /* l1story：看图讲加法故事 {pic, a, b, la, lb, noun} */
  S.l1story = ({ pic, a, b, la, lb, noun }) => {
    const sum = a + b;
    return [
      { zh: `先数第一种：<b>${a}</b> ${esc(la)}。`, en: `${a} ${la}.`, render: s => { s.innerHTML = wrap(`<div class="center">${img(pic, 320)}</div>`, line(`${a} ${esc(la)}`)); } },
      { zh: `再数第二种：<b>${b}</b> ${esc(lb)}。`, en: `${b} ${lb}.`, render: s => { s.innerHTML = wrap(`<div class="center">${img(pic, 320)}</div>`, line(`${a} ${esc(la)}`), line(`${b} ${esc(lb)}`)); } },
      { zh: `写成数字组合：${a} and ${b} make <b>${sum}</b>。`, en: `${a} and ${b} make ${sum}.`, render: s => { s.innerHTML = wrap(L.bond(sum, a, b, { hl: 'w' })); } },
      { zh: `圆圈填 ${a}，三角填 ${b}，方框填和：<b>${a} + ${b} = ${sum}</b>。一共有 <b>${sum}</b> ${esc(noun)}。`, en: `${a} + ${b} = ${sum}. There are ${sum} ${noun} altogether.`, render: s => { s.innerHTML = wrap(`<div class="eqline"><span class="eq-c">${a}</span> + <span class="eq-t">${b}</span> = <span class="eq-s hl">${sum}</span></div>`, line(`There are ${sum} ${esc(noun)} altogether.`)); } },
    ];
  };
  /* l1sumpick：哪个算式等于 target {target, options:[[x,y]...]} */
  S.l1sumpick = ({ target, options }) => {
    const draw = k => `<div class="pick-opts">${options.map(([x, y], i) => `<span class="sum-opt ${i < k ? (x + y === target ? 'right' : 'wrong') : ''}">${x} + ${y}${i < k ? `<b>= ${x + y}</b>` : ''}</span>`).join('')}</div>`;
    const steps = [{ zh: `圆圈里是 <b>${target}</b>。把每个算式都算一算，找出等于 ${target} 的。`, en: `Which one makes ${target}? Work out each one.`, render: s => { s.innerHTML = wrap(line(target), draw(0)); } }];
    options.forEach(([x, y], i) => steps.push({ zh: `${x} + ${y} = <b>${x + y}</b>${x + y === target ? `，就是它！` : `，不是 ${target}。`}`, en: `${x} + ${y} = ${x + y}${x + y === target ? '. Yes!' : '.'}`, render: s => { s.innerHTML = wrap(line(target), draw(i + 1)); } }));
    return steps;
  };
  /* l1missing：缺一个加数 {a?, b?, sum} 已知一个数 k */
  S.l1missing = ({ a, b, sum }) => {
    const k = a !== undefined ? a : b, miss = sum - k;
    const text = a !== undefined ? `${a} + ___ = ${sum}` : `___ + ${b} = ${sum}`;
    return [
      { zh: `算式 <b>${text}</b>：已经知道 ${k}，要找加几才到 ${sum}。`, en: `${text}: how many more from ${k} to ${sum}?`, render: s => { s.innerHTML = wrap(line(text)); } },
      { zh: `从 ${k} 往后数到 ${sum}，数一数跳了几下：${miss === 0 ? '不用跳，已经是 ' + sum : Array.from({ length: miss }, (_, i) => k + i + 1).join('、')}。`, en: `Count on from ${k} to ${sum}: ${miss} hops.`, render: s => { s.innerHTML = wrap(hops(k, miss, miss), line(`${miss} 下`)); } },
      { zh: `跳了 <b>${miss}</b> 下，所以空格填 <b>${miss}</b>：${a !== undefined ? `${a} + ${miss}` : `${miss} + ${b}`} = ${sum}。`, en: `The missing number is ${miss}.`, render: s => { s.innerHTML = wrap(hops(k, miss, miss), line(a !== undefined ? `${a} + <b>${miss}</b> = ${sum}` : `<b>${miss}</b> + ${b} = ${sum}`)); } },
    ];
  };
  /* l1word：一步加法应用题 {en, zh, a, b, la, lb, sentence} */
  S.l1word = ({ en, zh, a, b, la, lb, sentence }) => {
    const sum = a + b;
    const text = `<div class="wp-text"><div class="wp-en">${esc(en)}</div><div class="wp-zh">${esc(zh)}</div></div>`;
    return [
      { zh: `读题，找出两个数：<b>${a}</b>（${esc(la)}）和 <b>${b}</b>（${esc(lb)}）。问“一共 / altogether / in all”，要用<b>加法</b>。`, en: `Two numbers: ${a} and ${b}. "Altogether" means add.`, render: s => { s.innerHTML = wrap(text); } },
      { zh: `画出来：${a} 个和 ${b} 个。`, en: `Draw ${a} and ${b}.`, render: s => { s.innerHTML = wrap(L.groups([{ icon: '🟠', n: a }, { icon: '🔵', n: b }], { count: true })); } },
      { zh: `从 ${a} 往后数 ${b} 个：<b>${a} + ${b} = ${sum}</b>。`, en: `${a} + ${b} = ${sum}.`, render: s => { s.innerHTML = wrap(hops(a, b, b), eq(a, b, sum, { hl: 's' })); } },
      { zh: `写答句：${esc(sentence).replace('___', `<b>${sum}</b>`)}`, en: sentence.replace('___', String(sum)), render: s => { s.innerHTML = wrap(eq(a, b, sum), line(esc(sentence).replace('___', `<b>${sum}</b>`))); } },
    ];
  };

  window.L1.counton = counton; window.L1.hops = hops; window.L1.eq = eq;
})();
