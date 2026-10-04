/* Level 1：40 以内的数（Unit 10-12）讲解动画 */
(function () {
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '"': '&quot;', '>': '&gt;' }[c]));
  const line = t => `<div class="expand-line">${t}</div>`;
  const L = window.L1;
  const wrap = (...parts) => `<div class="l1wrap">${parts.join('')}</div>`;
  const seq = (a, b) => { const r = []; for (let i = a; i <= b; i++) r.push(i); return r; };
  const img = (name, w) => `<img class="figimg" src="img/${name}.png" alt="" style="max-width:${w || 420}px">`;
  const WORDS = L.WORDS, TENS = ['', '', 'twenty', 'thirty', 'forty'];
  const word40 = n => n <= 20 ? WORDS[n] : (n % 10 === 0 ? TENS[n / 10] : `${TENS[Math.floor(n / 10)]}-${WORDS[n % 10]}`);
  /* 十格图组：n 个物品 → 满框 + 余数框；o.k = 已圈几组 */
  function tens(icon, n, o = {}) {
    const full = Math.floor(n / 10), rest = n % 10;
    const parts = [];
    for (let i = 0; i < full; i++) parts.push(L.frame(icon, 10, { cls: (o.k !== undefined && i < o.k) ? 'hlf' : '', nums: o.nums && i === 0 ? 10 : undefined }));
    if (rest) parts.push(L.frame(icon, rest, { cls: o.hlrest ? 'hlf' : '', nums: o.numsRest ? rest : undefined }));
    return `<div class="frames2 wrapf">${parts.join('<span class="bond-plus">＋</span>')}</div>`;
  }
  /* 三角点阵（书上的 10 点三角） */
  const tri10 = hl => `<span class="tri10 ${hl ? 'hl' : ''}"><svg viewBox="0 0 60 56" width="60" height="56">${[[30, 8], [20, 24], [40, 24], [10, 40], [30, 40], [50, 40], [0, 56], [20, 56], [40, 56], [60, 56]].map(([x, y]) => `<circle cx="${x * 0.9 + 3}" cy="${y * 0.85 + 6}" r="5" fill="#b8b8c8" stroke="#555" stroke-width="1"/>`).join('')}</svg></span>`;
  const dotsN = (n, hl) => `<span class="l1dots"><svg viewBox="0 0 ${n * 14 + 2} 16" width="${n * 14 + 2}" height="16">${seq(0, n - 1).map(i => `<circle cx="${i * 14 + 8}" cy="8" r="6" fill="#b8b8c8" stroke="#555" stroke-width="1"/>`).join('')}</svg></span>`;
  const triRow = (n, o = {}) => `<div class="frames2">${seq(1, Math.floor(n / 10)).map(i => tri10(o.hl === 'tens')).join('')}${n % 10 ? `<span class="${o.hl === 'ones' ? 'hldots' : ''}">${dotsN(n % 10)}</span>` : ''}</div>`;
  const eq = (a, op, b, s, hl) => `<div class="eqline"><span class="eq-s ${hl === 'a' ? 'hl' : ''}">${a}</span> ${op} <span class="eq-s ${hl === 'b' ? 'hl' : ''}">${b}</span> = <span class="eq-s ${hl === 's' ? 'hl' : ''}">${s}</span></div>`;
  const strip40 = (o) => L.strip(Object.assign({ from: 20, to: 40 }, o));

  const S = window.StepKinds;
  /* l1count40：10 个一组数 {icon, n} */
  S.l1count40 = ({ icon, n }) => {
    const full = Math.floor(n / 10), rest = n % 10;
    const steps = [{ zh: `东西很多，一个一个数容易乱。先 <b>10 个一组</b> 圈起来。`, en: 'Circle in groups of 10.', render: s => { s.innerHTML = wrap(tens(icon, n)); } }];
    for (let i = 1; i <= full; i++) steps.push({ zh: `第 ${i} 组：<b>${i * 10}</b>。十个十个地数：${seq(1, i).map(k => k * 10).join('、')}。`, en: `${i * 10}.`, render: s => { s.innerHTML = wrap(tens(icon, n, { k: i }), line(seq(1, i).map(k => k * 10).join(', '))); } });
    if (rest) steps.push({ zh: `剩下不够 10 个的接着一个一个数：${seq(full * 10 + 1, n).join('、')}。`, en: `Count on: ${seq(full * 10 + 1, n).join(', ')}.`, render: s => { s.innerHTML = wrap(tens(icon, n, { k: full, hlrest: true, numsRest: true }), line(`${full * 10}, ${seq(full * 10 + 1, n).join(', ')}`)); } });
    steps.push({ zh: `一共 <b>${n}</b> 个。`, en: `${n} in all.`, render: s => { s.innerHTML = wrap(tens(icon, n), line(`${n}`)); } });
    return steps;
  };
  /* l1tri40：数三角点阵 {n} */
  S.l1tri40 = ({ n }) => {
    const full = Math.floor(n / 10), rest = n % 10;
    return [
      { zh: `每个三角形里有 <b>10</b> 个点（1、2、3、4 四行：1+2+3+4 = 10）。`, en: 'Each triangle has 10 dots.', render: s => { s.innerHTML = wrap(triRow(n), line('10')); } },
      { zh: `有 ${full} 个三角形：${seq(1, full).map(k => k * 10).join('、')}，就是 <b>${full * 10}</b>。`, en: `${full} triangles: ${full * 10}.`, render: s => { s.innerHTML = wrap(triRow(n, { hl: 'tens' }), line(`${full * 10}`)); } },
      { zh: rest ? `再数散的点：${rest} 个。${full * 10} + ${rest} = <b>${n}</b>。` : `没有散的点，一共 <b>${n}</b>。`, en: `${n} dots.`, render: s => { s.innerHTML = wrap(triRow(n, { hl: 'ones' }), line(`${full * 10} + ${rest} = ${n}`)); } },
    ];
  };
  /* l1word40：数字 ↔ 英文 {n} */
  S.l1word40 = ({ n }) => {
    const t = Math.floor(n / 10), o = n % 10;
    return [
      { zh: n <= 20 ? `${n} 的英文是 <b>${word40(n)}</b>（11 到 20 要单独记）。` : `先看几个十：${t * 10} 是 <b>${TENS[t]}</b>。`, en: n <= 20 ? `${n} is ${word40(n)}.` : `${t * 10} is ${TENS[t]}.`, render: s => { s.innerHTML = wrap(`<div class="wordtab">${[20, 30, 40].map(x => `<span class="${x === t * 10 && n > 20 ? 'hl' : ''}"><b>${x}</b>${TENS[x / 10]}</span>`).join('')}</div>`); } },
      n > 20 && o ? { zh: `再看几个一：${o} 是 <b>${WORDS[o]}</b>。中间用短横线连起来：<b>${word40(n)}</b>。`, en: `${o} is ${WORDS[o]}. ${word40(n)}.`, render: s => { s.innerHTML = wrap(line(`${TENS[t]} - ${WORDS[o]}`), line(word40(n))); } }
        : { zh: `所以 <b>${n} = ${word40(n)}</b>。`, en: `${n} = ${word40(n)}.`, render: s => { s.innerHTML = wrap(line(`${n} = ${word40(n)}`)); } },
    ];
  };
  /* l1tens40：几个十几个一 {icon?, pic?, n} */
  S.l1tens40 = ({ icon, pic, n }) => {
    const t = Math.floor(n / 10), o = n % 10;
    const scene = h => pic ? `<div class="center">${img(pic, 400)}</div>` : tens(icon || '🔵', n, h);
    return [
      { zh: `每一堆都是 <b>10 个</b>。数有几堆：<b>${t}</b> 堆，就是 ${t} tens = <b>${t * 10}</b>。`, en: `${t} groups of 10: ${t} tens = ${t * 10}.`, render: s => { s.innerHTML = wrap(scene({ k: t }), line(`${t} tens = ${t * 10}`)); } },
      { zh: `散的有 <b>${o}</b> 个：${o} ones。`, en: `${o} ones.`, render: s => { s.innerHTML = wrap(scene({ hlrest: true }), line(`${o} ones`)); } },
      { zh: `<b>${n} = ${t} tens ${o} ones = ${t * 10} + ${o}</b>。`, en: `${n} = ${t} tens ${o} ones.`, render: s => { s.innerHTML = wrap(`<table class="tochart"><tr><th>Tens</th><th>Ones</th></tr><tr><td>${t}</td><td>${o}</td></tr></table>`, line(`${n} = ${t * 10} + ${o}`)); } },
    ];
  };
  /* l1make40：20 and 8 make 28 {a, b, miss:'sum'|'a'|'b'} */
  S.l1make40 = ({ a, b, miss }) => {
    const sum = a + b;
    return [
      { zh: `${a} 是 <b>${a / 10} 个十</b>，${miss === 'b' ? '要凑到 ' + sum : b + ' 是几个一'}。十和一合起来就是两位数。`, en: `${a} is ${a / 10} tens.`, render: s => { s.innerHTML = wrap(tens('🔵', sum, { k: a / 10 })); } },
      { zh: miss === 'sum' ? `${a} + ${b}：几个十不变，一位加上去：<b>${sum}</b>。` : miss === 'a' ? `${sum} 里的十是 <b>${a}</b>（${sum} = ${a} + ${b}）。` : `${sum} 减掉 ${a} 还剩几个一：<b>${b}</b>。`, en: `${a} and ${b} make ${sum}.`, render: s => { s.innerHTML = wrap(tens('🔵', sum, { k: a / 10, hlrest: true }), line(`${a} and ${b} make ${sum}`)); } },
    ];
  };
  /* l1setcmp：两组比较 {ia, na, ib, nb, mode:'cmp'|'diff'} */
  S.l1setcmp = ({ ia, na, ib, nb, mode }) => {
    const big = Math.max(na, nb), small = Math.min(na, nb);
    const draw = (hl) => `<div class="cmp-dots"><div class="${hl === 'a' ? 'hl' : ''}"><b class="bignum">A</b>${L.row(ia, na, { cls: 'tight' })}</div><div class="${hl === 'b' ? 'hl' : ''}"><b class="bignum">B</b>${L.row(ib, nb, { cls: 'tight' })}</div></div>`;
    const steps = [
      { zh: `数 Set A：<b>${na}</b> 个。`, en: `Set A: ${na}.`, render: s => { s.innerHTML = wrap(draw('a'), line(`A = ${na}`)); } },
      { zh: `数 Set B：<b>${nb}</b> 个。`, en: `Set B: ${nb}.`, render: s => { s.innerHTML = wrap(draw('b'), line(`A = ${na}　B = ${nb}`)); } },
    ];
    if (mode === 'diff') steps.push({ zh: `多的减少的：<b>${big} − ${small} = ${big - small}</b>。Set ${na > nb ? 'A' : 'B'} has ${big - small} more，Set ${na > nb ? 'B' : 'A'} has ${big - small} fewer。`, en: `${big} − ${small} = ${big - small}.`, render: s => { s.innerHTML = wrap(draw(), eq(big, '−', small, big - small, 's'), line(`${big - small} more / ${big - small} fewer`)); } });
    else steps.push({ zh: `比一比：${big} 大、${small} 小。<b>${big} is greater than ${small}</b>，<b>${small} is smaller than ${big}</b>。`, en: `${big} is greater than ${small}.`, render: s => { s.innerHTML = wrap(draw(), line(`${big} &gt; ${small}`)); } });
    return steps;
  };
  /* l1strip40：数字条上多几少几 {n, d} d 可负 */
  S.l1strip40 = ({ n, d }) => {
    const ans = n + d, more = d > 0, k = Math.abs(d);
    const steps = [{ zh: `在数字条上圈出 <b>${n}</b>。“${k} ${more ? 'more' : 'less'}” 就往${more ? '后' : '前'}跳 ${k} 格。`, en: `Circle ${n}. ${k} ${more ? 'more' : 'less'}: ${more ? 'count on' : 'count back'} ${k}.`, render: s => { s.innerHTML = wrap(strip40({ circle: [n] })); } }];
    for (let i = 1; i <= k; i++) { const cur = n + (more ? i : -i); steps.push({ zh: `第 ${i} 格：${cur}。`, en: `${cur}.`, render: s => { s.innerHTML = wrap(strip40({ circle: [n], on: more ? seq(n + 1, cur) : seq(cur, n - 1) }), line(`${i} 格`)); } }); }
    steps.push({ zh: `停在 <b>${ans}</b>：${k} ${more ? 'more' : 'less'} than ${n} is <b>${ans}</b>。`, en: `${k} ${more ? 'more' : 'less'} than ${n} is ${ans}.`, render: s => { s.innerHTML = wrap(strip40({ circle: [n, ans], on: more ? seq(n + 1, ans) : seq(ans, n - 1) }), line(`${ans}`)); } });
    return steps;
  };
  /* l1stripback：已知结果反推 {ans, d, form:'how'|'what'}：___ less than 30 is 28 / 2 more than ___ is 25 */
  S.l1stripback = ({ a, b, form }) => {
    // form 'how': ? more/less than a is b ; form 'what': k more/less than ? is b (k = a)
    if (form === 'how') { const d = b - a, more = d > 0, k = Math.abs(d); return [
      { zh: `圈出 <b>${a}</b> 和 <b>${b}</b>。看从 ${a} 到 ${b} 跳了几格。`, en: `Circle ${a} and ${b}. How many hops?`, render: s => { s.innerHTML = wrap(strip40({ circle: [a, b] })); } },
      { zh: `跳了 <b>${k}</b> 格，${b} 在 ${a} 的${more ? '后面' : '前面'}，所以是 <b>${k} ${more ? 'more' : 'less'}</b> than ${a}。`, en: `${k} ${more ? 'more' : 'less'} than ${a} is ${b}.`, render: s => { s.innerHTML = wrap(strip40({ circle: [a, b], on: more ? seq(a + 1, b) : seq(b, a - 1) }), line(`${k} ${more ? 'more' : 'less'}`)); } },
    ]; }
    const k = a, more = form === 'more', start = more ? b - k : b + k; return [
      { zh: `${k} ${more ? 'more' : 'less'} than ? is ${b}：结果是 ${b}，往${more ? '回' : '后'}退 ${k} 格找起点。`, en: `Start from ${b} and go ${more ? 'back' : 'on'} ${k}.`, render: s => { s.innerHTML = wrap(strip40({ circle: [b] })); } },
      { zh: `退 ${k} 格到 <b>${start}</b>。检查：${k} ${more ? 'more' : 'less'} than ${start} is ${b} ✔。`, en: `${k} ${more ? 'more' : 'less'} than ${start} is ${b}.`, render: s => { s.innerHTML = wrap(strip40({ circle: [start, b], on: more ? seq(start + 1, b) : seq(b, start - 1) }), line(`${start}`)); } },
    ];
  };
  /* l1cmp40：比大小 {a, b, which} 看十位再看个位 */
  S.l1cmp40 = ({ a, b, which }) => {
    const win = which === 'greater' ? Math.max(a, b) : Math.min(a, b), lose = a === win ? b : a;
    const ta = Math.floor(a / 10), tb = Math.floor(b / 10);
    const chart = (n, hl) => `<table class="tochart ${hl ? 'hl' : ''}"><tr><th>Tens</th><th>Ones</th></tr><tr><td>${Math.floor(n / 10)}</td><td>${n % 10}</td></tr><tr><td colspan="2"><b>${n}</b></td></tr></table>`;
    return [
      { zh: `先比<b>十位</b>（几个十）：${a} 有 ${ta} 个十，${b} 有 ${tb} 个十。`, en: `Compare the tens first: ${ta} and ${tb}.`, render: s => { s.innerHTML = wrap(`<div class="fig-row">${chart(a)}${chart(b)}</div>`); } },
      ta !== tb ? { zh: `十位不一样：${Math.max(ta, tb)} 个十多，所以 <b>${Math.max(a, b)}</b> 大。`, en: `${Math.max(ta, tb)} tens is more, so ${Math.max(a, b)} is greater.`, render: s => { s.innerHTML = wrap(`<div class="fig-row">${chart(a, a > b)}${chart(b, b > a)}</div>`, line(`${Math.max(a, b)} &gt; ${Math.min(a, b)}`)); } }
        : { zh: `十位一样，再比<b>个位</b>：${a % 10} 和 ${b % 10}，${Math.max(a, b) % 10} 大，所以 <b>${Math.max(a, b)}</b> 大。`, en: `Same tens, compare the ones: ${Math.max(a, b)} is greater.`, render: s => { s.innerHTML = wrap(`<div class="fig-row">${chart(a, a > b)}${chart(b, b > a)}</div>`, line(`${Math.max(a, b)} &gt; ${Math.min(a, b)}`)); } },
      { zh: `题目要${which === 'greater' ? '大的' : '小的'}：<b>${win}</b>。`, en: `${win} is ${which}.`, render: s => { s.innerHTML = wrap(line(`${win} is ${which} than ${lose}`)); } },
    ];
  };
  /* l1order40：排序 {nums, desc} */
  S.l1order40 = ({ nums, desc }) => {
    const sorted = nums.slice().sort((x, y) => desc ? y - x : x - y);
    const chart = (n, hl) => `<table class="tochart ${hl ? 'hl' : ''}"><tr><th>T</th><th>O</th></tr><tr><td>${Math.floor(n / 10)}</td><td>${n % 10}</td></tr><tr><td colspan="2"><b>${n}</b></td></tr></table>`;
    return [
      { zh: `先看每个数的十位，十位大的数大；十位一样再看个位。`, en: 'Compare tens first, then ones.', render: s => { s.innerHTML = wrap(`<div class="fig-row">${nums.map(n => chart(n)).join('')}</div>`); } },
      { zh: `${desc ? '最大' : '最小'}的是 <b>${sorted[0]}</b>，然后 ${sorted.slice(1, -1).join('、')}${sorted.length > 2 ? '，' : ''}${desc ? '最小' : '最大'}的是 <b>${sorted[sorted.length - 1]}</b>。`, en: sorted.join(', '), render: s => { s.innerHTML = wrap(`<div class="fig-row">${sorted.map((n, i) => chart(n, i === 0)).join('')}</div>`, line(sorted.join(', '))); } },
    ];
  };
  /* l1pat40：数字规律 {seq, blanks} */
  S.l1pat40 = ({ seq: sq, blanks }) => {
    const known = sq.map((n, i) => blanks.includes(i) ? null : n);
    let d = 0; for (let i = 0; i < sq.length - 1; i++) if (known[i] !== null && known[i + 1] !== null) { d = sq[i + 1] - sq[i]; break; }
    if (!d) for (let i = 0; i < sq.length - 2; i++) if (known[i] !== null && known[i + 2] !== null) { d = (sq[i + 2] - sq[i]) / 2; break; }
    const more = d > 0, k = Math.abs(d);
    const row = (show, hl) => `<div class="nstrip">${sq.map((n, i) => `<span class="ns ${hl && hl.includes(i) ? 'on' : ''} ${blanks.includes(i) && !show ? 'blankn' : ''}">${blanks.includes(i) && !show ? '?' : n}</span>`).join('')}</div>`;
    return [
      { zh: `看相邻两个给出的数差多少：每次<b>${more ? '加' : '减'} ${k}</b>（${k} ${more ? 'more' : 'less'}）。`, en: `Each time ${more ? 'add' : 'subtract'} ${k}.`, render: s => { s.innerHTML = wrap(row(false), line(`${k} ${more ? 'more' : 'less'}`)); } },
      { zh: `按规律填：${blanks.map(i => `<b>${sq[i]}</b>`).join('、')}。`, en: blanks.map(i => sq[i]).join(', '), render: s => { s.innerHTML = wrap(row(true, blanks), line(sq.join(', '))); } },
    ];
  };

  window.L1.tens = tens; window.L1.triRow = triRow; window.L1.word40 = word40; window.L1.TENS = TENS; window.L1.strip40 = strip40;
})();
