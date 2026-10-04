/* Level 1：100 以内的数（Unit 17）讲解动画：英文数词到 100、带步长的数字条、大数量两组比较 */
(function () {
  const line = t => `<div class="expand-line">${t}</div>`;
  const L = window.L1;
  const wrap = (...parts) => `<div class="l1wrap">${parts.join('')}</div>`;
  const WORDS = L.WORDS, TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  const word100 = n => n === 100 ? 'one hundred' : n <= 20 ? WORDS[n] : (n % 10 === 0 ? TENS[n / 10] : `${TENS[Math.floor(n / 10)]}-${WORDS[n % 10]}`);
  /* 任意数列的数字条 */
  const stripN = (nums, o = {}) => { const on = new Set(o.on || []), c = new Set(o.circle || []); return `<div class="nstrip">${nums.map(n => `<span class="ns ${c.has(n) ? 'circle' : ''} ${on.has(n) ? 'on' : ''}">${n}</span>`).join('')}</div>`; };
  const eq = (a, op, b, s, hl) => `<div class="eqline"><span class="eq-s ${hl === 'a' ? 'hl' : ''}">${a}</span> ${op} <span class="eq-s ${hl === 'b' ? 'hl' : ''}">${b}</span> = <span class="eq-s ${hl === 's' ? 'hl' : ''}">${s}</span></div>`;

  const S = window.StepKinds;
  /* l1word100：英文数词 {n} */
  S.l1word100 = ({ n }) => {
    const t = Math.floor(n / 10), o = n % 10;
    const tab = `<div class="wordtab">${[40, 50, 60, 70, 80, 90, 100].map(x => `<span class="${x === t * 10 ? 'hl' : ''}">${x} ${word100(x)}</span>`).join('')}</div>`;
    if (n === 100) return [{ zh: `100 的英文是 <b>one hundred</b>（一个一百）。`, en: '100 = one hundred.', render: s => { s.innerHTML = wrap(tab, line('100 = one hundred')); } }];
    return [
      { zh: `先看几个十：${t * 10} 是 <b>${TENS[t]}</b>。`, en: `${t * 10} is ${TENS[t]}.`, render: s => { s.innerHTML = wrap(tab, line(`${t * 10} = ${TENS[t]}`)); } },
      o ? { zh: `再看几个一：${o} 是 <b>${WORDS[o]}</b>。中间用短横线连起来：<b>${word100(n)}</b>。`, en: `${o} is ${WORDS[o]}: ${word100(n)}.`, render: s => { s.innerHTML = wrap(line(`${TENS[t]} - ${WORDS[o]}`), line(`${n} = ${word100(n)}`)); } }
        : { zh: `所以 <b>${n} = ${word100(n)}</b>。`, en: `${n} = ${word100(n)}.`, render: s => { s.innerHTML = wrap(line(`${n} = ${word100(n)}`)); } },
    ];
  };
  /* l1strip100：带步长的数字条上多几少几 {nums, n, d} d 可负，按格跳 */
  S.l1strip100 = ({ nums, n, d }) => {
    const ans = n + d, more = d > 0, k = Math.abs(d), step = nums[1] - nums[0], hops = k / step;
    const i0 = nums.indexOf(n), i1 = nums.indexOf(ans);
    const between = (a, b) => nums.slice(Math.min(a, b), Math.max(a, b) + 1);
    const steps = [{ zh: `这条数字条每格<b>${step === 1 ? '加 1' : '加 ' + step}</b>。圈出 <b>${n}</b>。“${k} ${more ? 'more' : 'less'}” 就往${more ? '后' : '前'}跳 ${hops} 格${hops > 1 ? `（每格 ${step}，${hops} × ${step} = ${k}）` : ''}。`, en: `Each box is ${step}. ${k} ${more ? 'more' : 'less'}: ${hops} hop${hops > 1 ? 's' : ''}.`, render: s => { s.innerHTML = wrap(stripN(nums, { circle: [n] })); } }];
    for (let i = 1; i <= hops; i++) { const cur = nums[i0 + (more ? i : -i)]; steps.push({ zh: `第 ${i} 格：${cur}。`, en: `${cur}.`, render: s => { s.innerHTML = wrap(stripN(nums, { circle: [n], on: between(i0 + (more ? 1 : -1), i0 + (more ? i : -i)) }), line(`${i} 格`)); } }); }
    steps.push({ zh: `停在 <b>${ans}</b>：${k} ${more ? 'more' : 'less'} than ${n} is <b>${ans}</b>。`, en: `${k} ${more ? 'more' : 'less'} than ${n} is ${ans}.`, render: s => { s.innerHTML = wrap(stripN(nums, { circle: [n, ans], on: between(i0 + (more ? 1 : -1), i1) }), line(`${ans}`)); } });
    return steps;
  };
  /* l1back100：反推 {a, b, form:'how'|'more'|'less'}（不用数字条，看十位个位） */
  S.l1back100 = ({ a, b, form }) => {
    if (form === 'how') { const d = b - a, more = d > 0, k = Math.abs(d); return [
      { zh: `从 <b>${a}</b> 到 <b>${b}</b>，${more ? '变大' : '变小'}了多少？用大的减小的：${Math.max(a, b)} − ${Math.min(a, b)} = <b>${k}</b>。`, en: `${Math.max(a, b)} − ${Math.min(a, b)} = ${k}.`, render: s => { s.innerHTML = wrap(eq(Math.max(a, b), '−', Math.min(a, b), k, 's')); } },
      { zh: `${b} 比 ${a} ${more ? '大' : '小'}，所以是 <b>${k} ${more ? 'more' : 'less'}</b> than ${a} is ${b}。`, en: `${k} ${more ? 'more' : 'less'} than ${a} is ${b}.`, render: s => { s.innerHTML = wrap(line(`${k} ${more ? 'more' : 'less'} than ${a} is ${b}`)); } },
    ]; }
    const k = a, more = form === 'more', start = more ? b - k : b + k; return [
      { zh: `${k} ${more ? 'more' : 'less'} than ? is ${b}：结果是 ${b}，反过来${more ? '减' : '加'} ${k} 找原来的数。`, en: `Work backwards: ${b} ${more ? '−' : '+'} ${k}.`, render: s => { s.innerHTML = wrap(eq(b, more ? '−' : '+', k, '?')); } },
      { zh: `${b} ${more ? '−' : '+'} ${k} = <b>${start}</b>。检查：${k} ${more ? 'more' : 'less'} than ${start} is ${b} ✔。`, en: `${k} ${more ? 'more' : 'less'} than ${start} is ${b}.`, render: s => { s.innerHTML = wrap(eq(b, more ? '−' : '+', k, start, 's'), line(`${k} ${more ? 'more' : 'less'} than ${start} is ${b}`)); } },
    ];
  };
  /* l1setcmp100：两大组比较（十格图） {ia, na, ib, nb} */
  S.l1setcmp100 = ({ ia, na, ib, nb }) => {
    const big = Math.max(na, nb), small = Math.min(na, nb), d = big - small;
    const draw = hl => `<div class="cmp-dots"><div class="${hl === 'a' ? 'hl' : ''}"><b class="bignum">A</b>${L.tens(ia, na)}</div><div class="${hl === 'b' ? 'hl' : ''}"><b class="bignum">B</b>${L.tens(ib, nb)}</div></div>`;
    return [
      { zh: `Set A：10 个一组数，${Math.floor(na / 10)} 组是 ${Math.floor(na / 10) * 10}，再加 ${na % 10}：<b>${na}</b>。`, en: `Set A: ${na}.`, render: s => { s.innerHTML = wrap(draw('a'), line(`A = ${na}`)); } },
      { zh: `Set B：${Math.floor(nb / 10)} 组是 ${Math.floor(nb / 10) * 10}，再加 ${nb % 10}：<b>${nb}</b>。`, en: `Set B: ${nb}.`, render: s => { s.innerHTML = wrap(draw('b'), line(`A = ${na}　B = ${nb}`)); } },
      { zh: `大的减小的：${big} − ${small} = <b>${d}</b>。${small} is ${d} less than ${big}；${big} is ${d} more than ${small}。Set ${na > nb ? 'A' : 'B'} has more，Set ${na > nb ? 'B' : 'A'} has fewer。`, en: `${big} − ${small} = ${d}.`, render: s => { s.innerHTML = wrap(eq(big, '−', small, d, 's'), line(`${small} is ${d} less than ${big}`), line(`${big} is ${d} more than ${small}`)); } },
    ];
  };
  /* l1on100：数字条上往后/往回数 1-9 {a, b, op} 窗口 a 附近 */
  S.l1on100 = ({ a, b, op }) => {
    const ans = op === '+' ? a + b : a - b, lo = Math.min(a, ans) - 1, hi = Math.max(a, ans) + 1;
    const nums = []; for (let i = Math.max(0, lo); i <= Math.min(100, hi); i++) nums.push(i);
    const seqn = (x, y) => { const r = []; for (let i = x; i <= y; i++) r.push(i); return r; };
    const steps = [{ zh: `圈出 <b>${a}</b>，往${op === '+' ? '后' : '回'}跳 ${b} 格。`, en: `Circle ${a}. Count ${op === '+' ? 'on' : 'back'} ${b}.`, render: s => { s.innerHTML = wrap(stripN(nums, { circle: [a] }), eq(a, op === '+' ? '+' : '−', b, '?')); } }];
    for (let i = 1; i <= b; i++) { const cur = op === '+' ? a + i : a - i; steps.push({ zh: `第 ${i} 格：${cur}。`, en: `${cur}.`, render: s => { s.innerHTML = wrap(stripN(nums, { circle: [a], on: op === '+' ? seqn(a + 1, cur) : seqn(cur, a - 1) }), line(`${i} 格`)); } }); }
    steps.push({ zh: `停在 <b>${ans}</b>：${a} ${op === '+' ? '+' : '−'} ${b} = ${ans}。`, en: `${a} ${op} ${b} = ${ans}.`, render: s => { s.innerHTML = wrap(stripN(nums, { circle: [a, ans], on: op === '+' ? seqn(a + 1, ans) : seqn(ans, a - 1) }), eq(a, op === '+' ? '+' : '−', b, ans, 's')); } });
    return steps;
  };
  /* l1tens100：加减整十，按十跳 {a, b, op} */
  S.l1tens100 = ({ a, b, op }) => {
    const ans = op === '+' ? a + b : a - b, k = b / 10, nums = []; for (let i = Math.min(a, ans); i <= Math.max(a, ans); i += 10) nums.push(i);
    const hop = i => op === '+' ? a + i * 10 : a - i * 10;
    const steps = [{ zh: `${op === '+' ? '加' : '减'} <b>${b}</b> 就是${op === '+' ? '加' : '减'} ${k} 个十。每格跳 10，从 ${a} 往${op === '+' ? '后' : '回'}跳 ${k} 格。`, en: `${op === '+' ? 'Add' : 'Subtract'} ${k} tens.`, render: s => { s.innerHTML = wrap(stripN(nums, { circle: [a] }), eq(a, op === '+' ? '+' : '−', b, '?')); } }];
    for (let i = 1; i <= k; i++) steps.push({ zh: `跳 ${i} 格（${i * 10}）：${hop(i)}。`, en: `${hop(i)}.`, render: s => { s.innerHTML = wrap(stripN(nums, { circle: [a, hop(i)], on: nums.filter(n => op === '+' ? n > a && n <= hop(i) : n < a && n >= hop(i)) }), line(`${a} ${op === '+' ? '+' : '−'} ${i * 10} = ${hop(i)}`)); } });
    steps.push({ zh: `<b>${a} ${op === '+' ? '+' : '−'} ${b} = ${ans}</b>：个位不变（${a % 10}），十位 ${Math.floor(a / 10)} ${op === '+' ? '+' : '−'} ${k} = ${Math.floor(ans / 10)}。`, en: `${a} ${op} ${b} = ${ans}. The ones stay the same.`, render: s => { s.innerHTML = wrap(stripN(nums, { circle: [a, ans], on: nums.filter(n => n !== a) }), eq(a, op === '+' ? '+' : '−', b, ans, 's')); } });
    return steps;
  };
  window.L1.word100 = word100; window.L1.stripN = stripN;
})();
