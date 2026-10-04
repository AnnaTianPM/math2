/* Level 1：40 以内加减法（Unit 11-12）讲解动画 */
(function () {
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '"': '&quot;', '>': '&gt;' }[c]));
  const line = t => `<div class="expand-line">${t}</div>`;
  const L = window.L1, A = window.ArithUI;
  const wrap = (...parts) => `<div class="l1wrap">${parts.join('')}</div>`;
  const seq = (a, b) => { const r = []; for (let i = a; i <= b; i++) r.push(i); return r; };
  const img = (name, w) => `<img class="figimg" src="img/${name}.png" alt="" style="max-width:${w || 420}px">`;
  const eq = (a, op, b, s, hl) => `<div class="eqline"><span class="eq-s ${hl === 'a' ? 'hl' : ''}">${a}</span> ${op} <span class="eq-s ${hl === 'b' ? 'hl' : ''}">${b}</span> = <span class="eq-s ${hl === 's' ? 'hl' : ''}">${s}</span></div>`;
  const col = cfg => `<div class="center">${A.columnHTML(Object.assign({ width: cfg.op === '+' && cfg.a + cfg.b >= 100 ? 3 : 2 }, cfg))}</div>`;
  const T = n => Math.floor(n / 10), O = n => n % 10;

  const S = window.StepKinds;
  /* l1add40on：数字条 20-40 往后数 {a, b} */
  S.l1add40on = ({ a, b }) => {
    const sum = a + b, from = Math.max(20, Math.min(a, sum - 20 < 20 ? 20 : a)), to = 40;
    const strip = o => L.strip(Object.assign({ from: Math.min(from, a), to }, o));
    const steps = [{ zh: `圈出 <b>${a}</b>，往后跳 ${b} 格。`, en: `Circle ${a}. Count on ${b}.`, render: s => { s.innerHTML = wrap(strip({ circle: [a] }), eq(a, '+', b, '?')); } }];
    for (let i = 1; i <= b; i++) steps.push({ zh: `第 ${i} 格：${a + i}。`, en: `${a + i}.`, render: s => { s.innerHTML = wrap(strip({ circle: [a], on: seq(a + 1, a + i) }), line(`${i} 格`)); } });
    steps.push({ zh: `停在 <b>${sum}</b>：${a} + ${b} = ${sum}。`, en: `${a} + ${b} = ${sum}.`, render: s => { s.innerHTML = wrap(strip({ circle: [a, sum], on: seq(a + 1, sum) }), eq(a, '+', b, sum, 's')); } });
    return steps;
  };
  /* l1addtens：加整十 {a, b} b=10/20 */
  S.l1addtens = ({ a, b }) => {
    const sum = a + b, from = Math.max(1, Math.min(a, 20)), to = Math.max(40, sum);
    const strip = o => L.strip(Object.assign({ from, to }, o));
    const steps = [{ zh: `加 <b>${b}</b> 就是加 ${b / 10} 个十。在数字条上从 ${a} 往后数 ${b} 格，也可以直接看十位加 ${b / 10}。`, en: `Add ${b / 10} tens.`, render: s => { s.innerHTML = wrap(strip({ circle: [a] }), eq(a, '+', b, '?')); } }];
    for (let i = 10; i <= b; i += 10) steps.push({ zh: `跳 ${i} 格：${a + i}。`, en: `${a + i}.`, render: s => { s.innerHTML = wrap(strip({ circle: [a, a + i], on: seq(a + 1, a + i) }), line(`${a} + ${i} = ${a + i}`)); } });
    steps.push({ zh: `<b>${a} + ${b} = ${sum}</b>：个位不变（${O(a)}），十位 ${T(a)} + ${b / 10} = ${T(sum)}。`, en: `${a} + ${b} = ${sum}. The ones stay the same.`, render: s => { s.innerHTML = wrap(strip({ circle: [a, sum], on: seq(a + 1, sum) }), eq(a, '+', b, sum, 's')); } });
    return steps;
  };
  /* l1splitadd：拆成几十和几再加 {a, b} 两位数 + 一位数 */
  S.l1splitadd = ({ a, b }) => {
    const sum = a + b, t = T(a) * 10, o = O(a);
    return [
      { zh: `把 <b>${a}</b> 拆成 <b>${t}</b> 和 <b>${o}</b>。`, en: `Split ${a} into ${t} and ${o}.`, render: s => { s.innerHTML = wrap(L.bond(a, t, o, { hl: 'w' }), eq(a, '+', b, '?')); } },
      { zh: `先加个位：${o} + ${b} = <b>${o + b}</b>。`, en: `${o} + ${b} = ${o + b}.`, render: s => { s.innerHTML = wrap(L.bond(a, t, o, { hl: 'b' }), line(`${o} + ${b} = ${o + b}`)); } },
      { zh: `再加回 ${t}：${t} + ${o + b} = <b>${sum}</b>。所以 ${a} + ${b} = ${sum}。`, en: `${t} + ${o + b} = ${sum}.`, render: s => { s.innerHTML = wrap(line(`${t} + ${o + b} = ${sum}`), eq(a, '+', b, sum, 's')); } },
    ];
  };
  /* l1coladd：两位数竖式加法 {a, b} */
  S.l1coladd = ({ a, b }) => {
    const sum = a + b, o = O(a) + O(b), carry = o >= 10 ? 1 : 0, od = o % 10, t = T(a) + T(b) + carry;
    const steps = [
      { zh: `上下对齐：个位对个位（Ones），十位对十位（Tens）。`, en: 'Line up the ones and the tens.', render: s => { s.innerHTML = col({ a, b, op: '+' }); } },
      carry ? { zh: `先加个位：${O(a)} + ${O(b)} = <b>${o}</b>。${o} 个一要<b>进位</b>：写 ${od}，向十位进 1（10 ones = 1 ten）。`, en: `Add the ones: ${O(a)} + ${O(b)} = ${o}. Regroup: write ${od}, carry 1.`, render: s => { s.innerHTML = wrap(col({ a, b, op: '+', result: ['', od], carries: { t: 1 }, hl: 'o' }), line(`${O(a)} + ${O(b)} = ${o} = 1 ten ${od} ones`)); } }
        : { zh: `先加个位：${O(a)} + ${O(b)} = <b>${o}</b>，写在个位。`, en: `Add the ones: ${O(a)} + ${O(b)} = ${o}.`, render: s => { s.innerHTML = wrap(col({ a, b, op: '+', result: ['', od], hl: 'o' }), line(`${O(a)} ones + ${O(b)} ones = ${o} ones`)); } },
      { zh: `再加十位：${carry ? '进上来的 1 + ' : ''}${T(a)} + ${T(b)} = <b>${t}</b>，写在十位${t >= 10 ? '（10 个十就是 1 个百，写到百位）' : ''}。`, en: `Add the tens: ${carry ? '1 + ' : ''}${T(a)} + ${T(b)} = ${t}.`, render: s => { s.innerHTML = wrap(col({ a, b, op: '+', result: t >= 10 ? [1, 0, od] : [t, od], carries: carry ? { t: 1 } : {}, hl: 't' }), line(`${carry ? '1 + ' : ''}${T(a)} tens + ${T(b)} tens = ${t} tens`)); } },
      { zh: `所以 <b>${a} + ${b} = ${sum}</b>。`, en: `${a} + ${b} = ${sum}.`, render: s => { s.innerHTML = wrap(col({ a, b, op: '+', result: t >= 10 ? [1, 0, od] : [t, od], carries: carry ? { t: 1 } : {} }), eq(a, '+', b, sum, 's')); } },
    ];
    return steps;
  };
  /* l1three：三个数凑十 {nums:[x,y,z], pair:[i,j], pic?, split?:[idx, p1, p2]} */
  S.l1three = ({ nums, pair, pic, split }) => {
    const [x, y, z] = nums, total = x + y + z;
    const scene = pic ? `<div class="center">${img(pic, 420)}</div>` : `<div class="center">${L.groups(nums.map(n => ({ icon: '🔵', n })))}</div>`;
    if (!split) {
      const p = nums[pair[0]], q = nums[pair[1]], rest = nums.find((_, i) => !pair.includes(i));
      return [
        { zh: `三个数相加：${x} + ${y} + ${z}。先找两个能<b>凑成 10</b> 的：<b>${p} + ${q} = 10</b>。`, en: `Find two numbers that make 10: ${p} + ${q} = 10.`, render: s => { s.innerHTML = wrap(scene, line(`${p} + ${q} = 10`)); } },
        { zh: `再把剩下的 ${rest} 加上去：${rest} + 10 = <b>${total}</b>。`, en: `${rest} + 10 = ${total}.`, render: s => { s.innerHTML = wrap(scene, line(`${rest} + 10 = ${total}`), eq(`${x} + ${y}`, '+', z, total, 's')); } },
      ];
    }
    const [si, p1, p2] = split, sv = nums[si], others = nums.filter((_, i) => i !== si);
    const partner = others.find(n => n + p1 === 10), other = others.find(n => n !== partner) !== undefined ? others.find((n, i) => others.indexOf(partner) !== i) : others[0];
    return [
      { zh: `${x} + ${y} + ${z}：没有两个数正好凑 10。把 <b>${sv}</b> 拆成 <b>${p1}</b> 和 <b>${p2}</b>。`, en: `Split ${sv} into ${p1} and ${p2}.`, render: s => { s.innerHTML = wrap(scene, L.bond(sv, p1, p2, { hl: 'w' })); } },
      { zh: `${p1} 和 ${partner} 凑成 10：${partner} + ${p1} = 10。剩下 ${other} + ${p2} = <b>${other + p2}</b>。`, en: `${partner} + ${p1} = 10. ${other} + ${p2} = ${other + p2}.`, render: s => { s.innerHTML = wrap(L.bond(sv, p1, p2), line(`${partner} + ${p1} = 10`), line(`${other} + ${p2} = ${other + p2}`)); } },
      { zh: `${other + p2} + 10 = <b>${total}</b>。`, en: `${other + p2} + 10 = ${total}.`, render: s => { s.innerHTML = wrap(line(`${other + p2} + 10 = ${total}`), eq(`${x} + ${y}`, '+', z, total, 's')); } },
    ];
  };
  /* l1word40：应用题 {en, zh, a, b, op, sentence, cmp?} */
  S.l1word40 = ({ en, zh, a, b, op, sentence, cmp }) => {
    const ans = op === '+' ? a + b : a - b;
    const text = `<div class="wp-text"><div class="wp-en">${esc(en)}</div><div class="wp-zh">${esc(zh)}</div></div>`;
    const bar = op === '+'
      ? `<div class="bar2"><div class="barrow"><span class="barseg" style="flex:${a}">${a}</span><span class="barseg alt" style="flex:${b}">${b}</span></div><div class="barlab">?</div></div>`
      : cmp === 'less'
        ? `<div class="bar2"><div class="barrow"><span class="barseg" style="flex:${a}">${a}</span></div><div class="barrow" style="margin-top:4px;border-color:transparent"><span class="barseg" style="flex:${a - b};border:2px solid var(--ink);border-radius:4px">?</span><span class="barseg alt" style="flex:${b};background:none;border:2px dashed var(--ink);border-radius:4px">${b}</span></div></div>`
      : cmp
        ? `<div class="bar2"><div class="barrow"><span class="barseg" style="flex:${a}">${a}</span></div><div class="barrow" style="margin-top:4px;border-color:transparent"><span class="barseg alt" style="flex:${b};border:2px solid var(--ink);border-radius:4px">${b}</span><span class="barseg" style="flex:${a - b};background:none;border:2px dashed var(--ink);border-radius:4px">?</span></div></div>`
        : `<div class="bar2"><div class="barlab">${a}</div><div class="barrow"><span class="barseg alt" style="flex:${b}">${b}</span><span class="barseg" style="flex:${a - b}">?</span></div></div>`;
    const colSteps = op === '+' ? S.l1coladd({ a, b }) : S.l1colsub({ a, b });
    return [
      { zh: op === '+' ? (cmp ? `读题：一个是 <b>${a}</b>，另一个<b>比它多 ${b}</b>。“多”就是在 ${a} 上再加 ${b}。` : `读题：两部分 <b>${a}</b> 和 <b>${b}</b>，问“一共 / now / altogether”，合起来用<b>加法</b>。`) : (cmp === 'less' ? `读题：一个是 <b>${a}</b>，另一个<b>比它少 ${b}</b>（fewer）。“少”就是从 ${a} 里去掉 ${b}，用<b>减法</b>。` : cmp ? `读题：一个是 <b>${a}</b>，一个是 <b>${b}</b>，问“多几 / 少几”（more / fewer）。比较两个数差多少，用<b>减法</b>：大的减小的。` : `读题：一共 <b>${a}</b>，拿走 / 减去 <b>${b}</b>，问剩下多少，用<b>减法</b>。`), en: op === '+' ? 'Add.' : 'Subtract.', render: s => { s.innerHTML = wrap(text); } },
      { zh: `画条形图：${op === '+' ? `${a} 和 ${b} 接起来，整条是 ?` : cmp === 'less' ? `上面一条是 ${a}，下面一条短 ${b}，短的那条是 ?` : cmp ? `上面一条是 ${a}，下面一条是 ${b}，多出来的一段是 ?` : `整条是 ${a}，拿走 ${b}，剩下 ?`}。列算式：<b>${a} ${op === '+' ? '+' : '−'} ${b}</b>。`, en: `${a} ${op} ${b}.`, render: s => { s.innerHTML = wrap(bar, eq(a, op === '+' ? '+' : '−', b, '?')); } },
      ...colSteps.slice(1),
      { zh: `答：${esc(sentence).replace('___', `<b>${ans}</b>`)}`, en: sentence.replace('___', String(ans)), render: s => { s.innerHTML = wrap(eq(a, op === '+' ? '+' : '−', b, ans, 's'), line(esc(sentence).replace('___', `<b>${ans}</b>`))); } },
    ];
  };
  /* l1colsub：两位数竖式减法 {a, b}（Unit 12 用，先放这里） */
  S.l1colsub = ({ a, b }) => {
    const diff = a - b, borrow = O(a) < O(b), o = borrow ? O(a) + 10 - O(b) : O(a) - O(b), t = T(a) - (borrow ? 1 : 0) - T(b);
    return [
      { zh: `上下对齐：个位对个位，十位对十位。`, en: 'Line up the ones and the tens.', render: s => { s.innerHTML = col({ a, b, op: '-' }); } },
      borrow ? { zh: `个位 ${O(a)} 不够减 ${O(b)}，向十位<b>借 1</b>（1 ten = 10 ones）：${O(a)} + 10 = ${O(a) + 10}，${O(a) + 10} − ${O(b)} = <b>${o}</b>。十位 ${T(a)} 变成 ${T(a) - 1}。`, en: `${O(a)} is less than ${O(b)}. Regroup 1 ten: ${O(a) + 10} − ${O(b)} = ${o}.`, render: s => { s.innerHTML = wrap(col({ a, b, op: '-', result: ['', o], regroup: { t: T(a) - 1, o: O(a) + 10 }, strike: { t: true, o: true }, hl: 'o' }), line(`${O(a) + 10} − ${O(b)} = ${o}`)); } }
        : { zh: `先减个位：${O(a)} − ${O(b)} = <b>${o}</b>。`, en: `${O(a)} − ${O(b)} = ${o}.`, render: s => { s.innerHTML = wrap(col({ a, b, op: '-', result: ['', o], hl: 'o' }), line(`${O(a)} ones − ${O(b)} ones = ${o} ones`)); } },
      { zh: `再减十位：${borrow ? T(a) - 1 : T(a)} − ${T(b)} = <b>${t}</b>。`, en: `${borrow ? T(a) - 1 : T(a)} − ${T(b)} = ${t}.`, render: s => { s.innerHTML = wrap(col({ a, b, op: '-', result: [t || '', o], regroup: borrow ? { t: T(a) - 1, o: O(a) + 10 } : {}, strike: borrow ? { t: true, o: true } : {}, hl: 't' }), line(`${borrow ? T(a) - 1 : T(a)} tens − ${T(b)} tens = ${t} tens`)); } },
      { zh: `所以 <b>${a} − ${b} = ${diff}</b>。`, en: `${a} − ${b} = ${diff}.`, render: s => { s.innerHTML = wrap(col({ a, b, op: '-', result: [t || '', o], regroup: borrow ? { t: T(a) - 1, o: O(a) + 10 } : {}, strike: borrow ? { t: true, o: true } : {} }), eq(a, '−', b, diff, 's')); } },
    ];
  };
})();
