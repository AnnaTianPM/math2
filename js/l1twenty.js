/* Level 1：20 以内的数与加减（Unit 7-8）讲解动画 */
(function () {
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '"': '&quot;', '>': '&gt;' }[c]));
  const line = t => `<div class="expand-line">${t}</div>`;
  const L = window.L1;
  const wrap = (...parts) => `<div class="l1wrap">${parts.join('')}</div>`;
  const seq = (a, b) => { const r = []; for (let i = a; i <= b; i++) r.push(i); return r; };
  const WORDS = L.WORDS;
  /* 两个十格图：第一个满 10，第二个 k 个。o.nums 标号；o.hl 高亮第几个框 */
  const frames = (icon, n, o = {}) => `<div class="frames2">${L.frame(icon, Math.min(10, n), { nums: o.nums ? 10 : undefined, cls: o.hl === 0 ? 'hlf' : '' })}<span class="bond-plus">＋</span>${L.frame(icon, Math.max(0, n - 10), { nums: o.nums ? n - 10 : undefined, cls: o.hl === 1 ? 'hlf' : '' })}</div>`;
  const dots = (n, hl) => `<div class="dots20 ${hl ? 'hl' : ''}"><b>${n}</b>${L.frame('⚪', Math.min(10, n), { cls: 'small' })}${L.frame('⚪', Math.max(0, n - 10), { cls: 'small' })}</div>`;
  const eq = (a, op, b, s, hl) => `<div class="eqline"><span class="eq-s ${hl === 'a' ? 'hl' : ''}">${a}</span> ${op} <span class="eq-s ${hl === 'b' ? 'hl' : ''}">${b}</span> = <span class="eq-s ${hl === 's' ? 'hl' : ''}">${s}</span></div>`;

  const S = window.StepKinds;
  /* l1teen：10 and k make n {icon, n, words?} */
  S.l1teen = ({ icon, n, words }) => {
    const k = n - 10;
    return [
      { zh: `先圈出 <b>10</b> 个（一个十格图装满就是 10）。`, en: 'Circle 10 first: a full ten-frame is 10.', render: s => { s.innerHTML = wrap(frames(icon, n, { hl: 0 }), line('10')); } },
      { zh: `剩下的接着数：${seq(11, n).join('、')}。10 and <b>${k}</b> make <b>${n}</b>。`, en: `Count on from 10: ${seq(11, n).join(', ')}. 10 and ${k} make ${n}.`, render: s => { s.innerHTML = wrap(frames(icon, n, { nums: true, hl: 1 }), line(`10 and ${k} make ${n}`)); } },
      words ? { zh: `${n} 的英文是 <b>${WORDS[n]}</b>。${n >= 13 && n <= 19 ? `记住：teen 结尾的都是十几（${WORDS[n - 10]} + teen）。` : ''}`, en: `${n} in words is ${WORDS[n]}.`, render: s => { s.innerHTML = wrap(frames(icon, n), line(`${n} = ${WORDS[n]}`)); } }
        : { zh: `所以一共 <b>${n}</b> 个。写 ${n}。`, en: `There are ${n}. Write ${n}.`, render: s => { s.innerHTML = wrap(frames(icon, n), line(`${n}`)); } },
    ];
  };
  /* l1tensones：几个十几个一 {icon, n} */
  S.l1tensones = ({ icon, n }) => {
    const t = Math.floor(n / 10), o = n % 10;
    return [
      { zh: `10 个一组叫 <b>1 ten（一个十）</b>。先圈 10 个。`, en: '10 ones make 1 ten. Circle 10.', render: s => { s.innerHTML = wrap(frames(icon, n, { hl: 0 }), line('1 ten')); } },
      { zh: `圈外剩下的是 <b>ones（一）</b>：数一数有 <b>${o}</b> 个。${t === 2 ? '这题正好又是满满 10 个，所以是 2 tens 0 ones。' : ''}`, en: `The rest are ones: ${o}.`, render: s => { s.innerHTML = wrap(frames(icon, n, { nums: true, hl: 1 }), line(`${t} ten${t > 1 ? 's' : ''} ${o} one${o === 1 ? '' : 's'}`)); } },
      { zh: `<b>${t} ten${t > 1 ? 's' : ''} ${o} one${o === 1 ? '' : 's'} = ${n}</b>。也就是 ${t * 10} + ${o} = ${n}。`, en: `${t} tens ${o} ones = ${n}.`, render: s => { s.innerHTML = wrap(frames(icon, n), line(`${t * 10} + ${o} = ${n}`)); } },
    ];
  };
  /* l1cmp20：比较两数 {a, b, which:'greater'|'smaller'} */
  S.l1cmp20 = ({ a, b, which }) => {
    const win = which === 'greater' ? Math.max(a, b) : Math.min(a, b), lose = a === win ? b : a;
    const draw = hl => `<div class="cmp-dots">${dots(a, hl && win === a)}${dots(b, hl && win === b)}</div>`;
    return [
      { zh: `把两个数画成十格图：每个数都先装满一个 10，再看第二个框里有几个。`, en: 'Show both numbers in ten-frames.', render: s => { s.innerHTML = wrap(draw(false)); } },
      { zh: `都有一个满的 10，所以只比第二个框：${a} 的第二框有 ${a - 10} 个，${b} 的有 ${b - 10} 个。`, en: `Both have a full 10. Compare the second frames: ${a - 10} and ${b - 10}.`, render: s => { s.innerHTML = wrap(draw(false), line(`${a - 10} 和 ${b - 10}`)); } },
      { zh: `${Math.max(a, b)} 的点多，所以 ${Math.max(a, b)} 大、${Math.min(a, b)} 小。题目要${which === 'greater' ? '大的（greater）' : '小的（smaller）'}：<b>${win}</b>。${win} is ${which} than ${lose}。`, en: `${win} is ${which} than ${lose}.`, render: s => { s.innerHTML = wrap(draw(true), line(`${win} is ${which} than ${lose}`)); } },
    ];
  };
  /* l1order20：三个数排序 {nums, desc} */
  S.l1order20 = ({ nums, desc }) => {
    const sorted = nums.slice().sort((x, y) => desc ? y - x : x - y);
    const draw = hl => `<div class="cmp-dots">${nums.map(n => dots(n, hl && hl.includes(n))).join('')}</div>`;
    return [
      { zh: `三个数都画成十格图，比第二个框里的点。`, en: 'Show each number in ten-frames.', render: s => { s.innerHTML = wrap(draw([])); } },
      { zh: `${desc ? '最大' : '最小'}的是 <b>${sorted[0]}</b>（第二框 ${sorted[0] - 10} 个点）。`, en: `${desc ? 'Greatest' : 'Smallest'}: ${sorted[0]}.`, render: s => { s.innerHTML = wrap(draw([sorted[0]]), line(`${sorted[0]}`)); } },
      { zh: `然后是 <b>${sorted[1]}</b>，${desc ? '最小' : '最大'}的是 <b>${sorted[2]}</b>。排好：<b>${sorted.join(', ')}</b>。`, en: `${sorted.join(', ')}.`, render: s => { s.innerHTML = wrap(draw(sorted), line(sorted.join(', '))); } },
    ];
  };
  /* l1strip：数字条上往后/往回数 {a, b, op:'+'|'-', from, to} */
  S.l1strip = ({ a, b, op }) => {
    const ans = op === '+' ? a + b : a - b, from = op === '+' ? a : Math.max(1, a - 12), to = op === '+' ? 20 : a;
    const steps = [{ zh: `在数字条上圈出 <b>${a}</b>。${op === '+' ? `往后数 ${b} 格。` : `往回数 ${b} 格。`}`, en: `Circle ${a}. Count ${op === '+' ? 'on' : 'back'} ${b}.`, render: s => { s.innerHTML = wrap(L.strip({ from, to, circle: [a] }), eq(a, op === '+' ? '+' : '−', b, '?')); } }];
    for (let i = 1; i <= b; i++) { const cur = op === '+' ? a + i : a - i; steps.push({ zh: `第 ${i} 格：${cur}。`, en: `${i}: ${cur}.`, render: s => { s.innerHTML = wrap(L.strip({ from, to, circle: [a], on: op === '+' ? seq(a + 1, cur) : seq(cur, a - 1) }), line(`${i} 格`)); } }); }
    steps.push({ zh: `停在 <b>${ans}</b>。所以 <b>${a} ${op === '+' ? '+' : '−'} ${b} = ${ans}</b>。`, en: `${a} ${op} ${b} = ${ans}.`, render: s => { s.innerHTML = wrap(L.strip({ from, to, circle: [a, ans], on: op === '+' ? seq(a + 1, ans) : seq(ans, a - 1) }), eq(a, op === '+' ? '+' : '−', b, ans, 's')); } });
    return steps;
  };
  /* l1countback：图上划掉往回数 {icon, a, b} */
  S.l1countback = ({ icon, a, b }) => {
    const ans = a - b;
    const draw = k => `<div class="center">${L.row(icon, a, { gone: seq(a - k, a - 1), cls: 'cb' })}</div>`;
    const steps = [{ zh: `一共 <b>${a}</b> 个。减去 ${b}，从 ${a} 往回数，划掉一个数一个。`, en: `${a} in all. Take away ${b}: count back.`, render: s => { s.innerHTML = wrap(draw(0), eq(a, '−', b, '?')); } }];
    for (let i = 1; i <= b; i++) steps.push({ zh: `划掉第 ${i} 个：<b>${a - i}</b>。`, en: `${a - i}.`, render: s => { s.innerHTML = wrap(draw(i), line(`${seq(a - i, a - 1).reverse().join('、')}`)); } });
    steps.push({ zh: `往回数了 ${b} 个，停在 <b>${ans}</b>。<b>${a} − ${b} = ${ans}</b>。`, en: `${a} − ${b} = ${ans}.`, render: s => { s.innerHTML = wrap(draw(b), eq(a, '−', b, ans, 's')); } });
    return steps;
  };
  /* l1make10：凑十加 {a, b, icon} 把 b 拆成 (10-a, rest) */
  S.l1make10 = ({ a, b, icon = '🔵' }) => {
    const big = Math.max(a, b), small = Math.min(a, b), need = 10 - big, rest = small - need, sum = a + b;
    const fr = (x, y, moved) => `<div class="frames2">${L.frame(icon, moved ? 10 : x, { cls: moved ? 'hlf' : '' })}<span class="bond-plus">＋</span>${L.frame(icon, moved ? y - need : y)}</div>`;
    return [
      { zh: `${a} + ${b}：先把两个数放进十格图。<b>${big}</b> 离 10 只差 <b>${need}</b> 个。`, en: `${big} needs ${need} more to make 10.`, render: s => { s.innerHTML = wrap(fr(big, small, false), eq(a, '+', b, '?')); } },
      { zh: `把 ${small} 拆成 <b>${need}</b> 和 <b>${rest}</b>：${need} 个搬过去填满 10。`, en: `Split ${small} into ${need} and ${rest}. Move ${need} over to make 10.`, render: s => { s.innerHTML = wrap(L.bond(small, need, rest, { hl: 'a' }), fr(big, small, true)); } },
      { zh: `现在是 <b>10 + ${rest}</b> = <b>${sum}</b>。所以 ${a} + ${b} = ${sum}。`, en: `10 + ${rest} = ${sum}.`, render: s => { s.innerHTML = wrap(fr(big, small, true), line(`10 + ${rest} = ${sum}`), eq(a, '+', b, sum, 's')); } },
    ];
  };
  /* l1make10big：拆大数（13+4：13=10+3） {a, b} */
  S.l1make10big = ({ a, b }) => {
    const big = Math.max(a, b), small = Math.min(a, b), ones = big - 10, sum = a + b;
    return [
      { zh: `${a} + ${b}：<b>${big}</b> 里有一个 10，把它拆成 <b>10</b> 和 <b>${ones}</b>。`, en: `Split ${big} into 10 and ${ones}.`, render: s => { s.innerHTML = wrap(L.bond(big, 10, ones, { hl: 'w' }), eq(a, '+', b, '?')); } },
      { zh: `先算一位数：${ones} + ${small} = <b>${ones + small}</b>。`, en: `${ones} + ${small} = ${ones + small}.`, render: s => { s.innerHTML = wrap(L.bond(big, 10, ones, { hl: 'b' }), line(`${ones} + ${small} = ${ones + small}`)); } },
      { zh: `再加回 10：10 + ${ones + small} = <b>${sum}</b>。所以 ${a} + ${b} = ${sum}。`, en: `10 + ${ones + small} = ${sum}.`, render: s => { s.innerHTML = wrap(line(`10 + ${ones + small} = ${sum}`), eq(a, '+', b, sum, 's')); } },
    ];
  };
  /* l1sub10：从 10 里减 {a, b, icon}：a = 10 + ones；10 − b 再加 ones */
  S.l1sub10 = ({ a, b, icon = '🔵' }) => {
    const ones = a - 10, left = 10 - b, ans = a - b;
    const fr = (goneK) => `<div class="frames2">${L.frame(icon, 10, { cls: 'hlf' }).replace(/tf-cell on/g, (m, off, str) => m)}<span class="bond-plus">＋</span>${L.frame(icon, ones)}</div>`;
    const frGone = () => `<div class="frames2"><span class="tf hlf">${Array.from({ length: 10 }, (_, i) => `<span class="tf-cell on ${i >= 10 - b ? 'gonecell' : ''}"><span class="tf-ico">${icon}</span></span>`).join('')}</span><span class="bond-plus">＋</span>${L.frame(icon, ones)}</div>`;
    return [
      { zh: `${a} − ${b}：把 <b>${a}</b> 拆成 <b>10</b> 和 <b>${ones}</b>。`, en: `Split ${a} into 10 and ${ones}.`, render: s => { s.innerHTML = wrap(L.bond(a, 10, ones, { hl: 'w' }), fr()); } },
      { zh: `先从 10 里减：<b>10 − ${b} = ${left}</b>（从满的十格图里划掉 ${b} 个）。`, en: `10 − ${b} = ${left}.`, render: s => { s.innerHTML = wrap(frGone(), line(`10 − ${b} = ${left}`)); } },
      { zh: `再把剩下的加回去：<b>${left} + ${ones} = ${ans}</b>。所以 ${a} − ${b} = ${ans}。`, en: `${left} + ${ones} = ${ans}.`, render: s => { s.innerHTML = wrap(frGone(), line(`${left} + ${ones} = ${ans}`), eq(a, '−', b, ans, 's')); } },
    ];
  };
  /* l1subbig：16−6=10 类：拆成 10 和 ones，ones 直接减 {a, b} */
  S.l1subbig = ({ a, b }) => {
    const ones = a - 10, ans = a - b;
    return [
      { zh: `${a} − ${b}：把 ${a} 拆成 <b>10</b> 和 <b>${ones}</b>。`, en: `Split ${a} into 10 and ${ones}.`, render: s => { s.innerHTML = wrap(L.bond(a, 10, ones, { hl: 'w' }), eq(a, '−', b, '?')); } },
      { zh: `${ones} 够减 ${b}：<b>${ones} − ${b} = ${ones - b}</b>。`, en: `${ones} − ${b} = ${ones - b}.`, render: s => { s.innerHTML = wrap(L.bond(a, 10, ones, { hl: 'b' }), line(`${ones} − ${b} = ${ones - b}`)); } },
      { zh: `再加回 10：10 + ${ones - b} = <b>${ans}</b>。`, en: `10 + ${ones - b} = ${ans}.`, render: s => { s.innerHTML = wrap(line(`10 + ${ones - b} = ${ans}`), eq(a, '−', b, ans, 's')); } },
    ];
  };
  /* l1wordpm：一步应用题（加或减，20 以内） {en, zh, a, b, op, sentence} */
  S.l1wordpm = ({ en, zh, a, b, op, sentence }) => {
    const ans = op === '+' ? a + b : a - b;
    const text = `<div class="wp-text"><div class="wp-en">${esc(en)}</div><div class="wp-zh">${esc(zh)}</div></div>`;
    return [
      { zh: op === '+' ? `读题：两部分是 <b>${a}</b> 和 <b>${b}</b>，问“一共 / altogether / now”，合起来用<b>加法</b>。` : `读题：一共 <b>${a}</b>，拿走或已知一部分 <b>${b}</b>，问“剩下 / 多多少 / 另一部分”，用<b>减法</b>。`, en: op === '+' ? 'Put together: add.' : 'Take away or compare: subtract.', render: s => { s.innerHTML = wrap(text); } },
      { zh: `列算式：<b>${a} ${op === '+' ? '+' : '−'} ${b}</b>。${op === '+' ? (Math.max(a, b) >= 10 ? `${Math.max(a, b)} 拆成 10 和 ${Math.max(a, b) - 10}，先加个位。` : `凑十：${Math.max(a, b)} 差 ${10 - Math.max(a, b)} 到 10。`) : (a - 10 >= b ? `${a} 拆成 10 和 ${a - 10}，${a - 10} − ${b}。` : `${a} 拆成 10 和 ${a - 10}，先 10 − ${b} = ${10 - b}。`)}`, en: `${a} ${op} ${b}.`, render: s => { s.innerHTML = wrap(L.bond(op === '+' ? Math.max(a, b) : a, 10, (op === '+' ? Math.max(a, b) : a) - 10 < 0 ? Math.max(a, b) : (op === '+' ? Math.max(a, b) : a) - 10), eq(a, op === '+' ? '+' : '−', b, '?')); } },
      { zh: `算出来：<b>${a} ${op === '+' ? '+' : '−'} ${b} = ${ans}</b>。答：${esc(sentence).replace('___', `<b>${ans}</b>`)}`, en: sentence.replace('___', String(ans)), render: s => { s.innerHTML = wrap(eq(a, op === '+' ? '+' : '−', b, ans, 's'), line(esc(sentence).replace('___', `<b>${ans}</b>`))); } },
    ];
  };
  /* l1numpat：数字规律（图形上的数）{seq, blanks} 复用 pattern */
  S.l1numpat = n => S.pattern(n);
})();
