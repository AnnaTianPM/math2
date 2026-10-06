/* Level 3 · Unit 2  10 000 以内的加法 */
(function () {
  const U = window.MATH_DATA.levels[3].units;
  const unit = num => U.find(u => u.num === num);
  const L = window.L3;
  const pic = html => `<div class="center">${html}</div>`;
  const num = a => ({ a });
  const F = (id, p, text, fields, explain, zh, en, o) => Object.assign({ id, type: 'fill', pic: p, label: text.replace(/\{\{\w+\}\}/g, '___').replace(/\n/g, ' '), prompt: { zh, en: en || 'Fill in the blanks' }, text, fields, answerText: Object.values(fields).map(f => f.a).join(', '), explain }, o || {});
  const C = (id, a, b, o) => Object.assign({ id, type: 'column', a, b, op: '+', width: 4, label: `${a} + ${b} = ${a + b}`, explain: ['l3coladd', { a, b }], hint: { zh: '从个位开始加，满 10 向前一位进 1，别忘了加进上来的 1。', en: 'Start from the ones. Carry when the sum is 10 or more.' } }, o || {});
  const T = n => Math.floor(n / 10) * 10, O = n => n % 10;
  const pairPic = (a, b) => pic(`<div class="disc-pair"><span class="lbl">${a}</span>${L.discs(a)}<span class="lbl">+ ${b}</span>${L.discs(b)}</div>`);

  const discA = [[3311, 545], [408, 7270], [6254, 2513], [1936, 8032], [5143, 4706]];
  const colB = [[5210, 4689], [4037, 232], [6512, 3076], [4378, 1521], [5321, 3435], [53, 3612], [2450, 2528], [6642, 2045], [4162, 5417], [5652, 2244]];
  const sumA = [[4078, 3659], [6528, 1473], [4699, 5277], [3965, 2245], [2856, 4786]];
  const regB = [[1745, 6487], [8499, 1324], [3356, 4134], [4348, 1625], [7430, 1932], [2282, 5453], [4908, 1767], [6274, 1538], [9126, 184], [4873, 4783], [5480, 2385], [3869, 2435], [3863, 5576], [5657, 3638], [5375, 2917], [6281, 1198], [4633, 3047], [2282, 4060], [3632, 6269], [4956, 3965]];
  const matchC = [[4147, 2836], [1939, 4205], [7450, 1550], [3740, 1470], [2698, 1507]];
  const m2 = [[37, 62], [71, 23], [64, 25], [55, 12], [44, 41], [83, 15], [22, 57], [34, 34], [66, 13], [41, 56]];
  // [a, b, 凑整十的是哪个]
  const m1 = [[64, 29, 'b'], [18, 78, 'b'], [15, 95, 'b'], [49, 32, 'a'], [46, 47, 'a'], [98, 23, 'a'], [59, 19, 'b'], [25, 48, 'b'], [37, 44, 'a'], [96, 56, 'a']];

  unit(2).kps = [
    {
      id: 'l3-2-1', available: true,
      title: { zh: '10 000 以内的加法', en: 'Add numbers within 10 000' },
      intro: { zh: '四位数相加和三位数一样：对齐数位，从个位开始加。圆片图里把同一种圆片合起来数。', en: 'Line up the places and add from the ones. With discs, put the same discs together.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '看圆片求和', en: 'Find the sum of these numbers' },
          example: { kind: 'l3discadd', n: { a: 2675, b: 124 }, title: { zh: '2675 + 124 = 2799', en: 'The sum of 2675 and 124 is 2799' } },
          questions: discA.map(([a, b], i) => F(`l3-2-1-A${i + 1}`, pairPic(a, b), `The sum of ${a} and ${b} is {{s}}.`, { s: num(a + b) }, ['l3discadd', { a, b }], `${a} 和 ${b} 的和是多少？`, `Find the sum of ${a} and ${b}`, { label: `${a} + ${b} = ${a + b}`, hint: { zh: '把同一种圆片合起来数，或者列竖式从个位加起。', en: 'Add the same discs together, or add in columns.' } })) },
        { id: 'B', type: 'column', title: { zh: '列竖式加', en: 'Add these numbers. Show your working clearly' },
          example: { kind: 'l3coladd', n: { a: 5210, b: 4689 }, title: { zh: '5210 + 4689 = 9899', en: '5210 + 4689 = 9899' } },
          questions: colB.map(([a, b], i) => C(`l3-2-1-B${i + 1}`, a, b)) },
      ],
    },
    {
      id: 'l3-2-2', available: true,
      title: { zh: '进位加法', en: 'Perform addition by regrouping ones, tens and hundreds' },
      intro: { zh: '哪一位加起来满 10，就向前一位进 1：10 个一是 1 个十，10 个十是 1 个百，10 个百是 1 个千。', en: 'Regroup: 10 ones = 1 ten, 10 tens = 1 hundred, 10 hundreds = 1 thousand.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '求和', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'l3coladd', n: { a: 2794, b: 5637 }, title: { zh: '2794 + 5637 = 8431：个位、十位、百位都进位', en: 'The sum of 2794 and 5637 is 8431' } },
          questions: sumA.map(([a, b], i) => F(`l3-2-2-A${i + 1}`, '', `The sum of ${a} and ${b} is {{s}}.`, { s: num(a + b) }, ['l3coladd', { a, b }], `${a} 和 ${b} 的和是多少？`, `Find the sum`, { label: `${a} + ${b} = ${a + b}`, hint: { zh: '在纸上列竖式，从个位加起，满 10 进 1。', en: 'Add in columns. Regroup when needed.' } })) },
        { id: 'B', type: 'column', title: { zh: '列竖式加（进位）', en: 'Add these numbers. Show your working clearly' },
          example: { kind: 'l3coladd', n: { a: 1745, b: 6487 }, title: { zh: '1745 + 6487 = 8232', en: '1745 + 6487 = 8232' } },
          questions: regB.map(([a, b], i) => C(`l3-2-2-B${i + 1}`, a, b)) },
        { id: 'C', type: 'match', title: { zh: '蝴蝶找花', en: 'Match each butterfly to the correct flower' },
          example: { kind: 'l3coladd', n: { a: 4147, b: 2836 }, title: { zh: '4147 + 2836 = 6983', en: '4147 + 2836 = 6983' } },
          questions: [{ id: 'l3-2-2-C1', type: 'match', label: '蝴蝶（算式）连花（得数）', left: matchC.map(([a, b]) => ({ id: `${a}+${b}`, html: `🦋 ${a} + ${b}`, text: `${a} + ${b}` })), right: [6144, 4205, 9000, 5210, 6983].map(n => ({ id: String(n), html: `🌸 ${n}`, text: String(n) })), pairs: Object.fromEntries(matchC.map(([a, b]) => [`${a}+${b}`, String(a + b)])), prompt: { zh: '算出每只蝴蝶上的加法，连到得数相同的花', en: 'Work out each sum and match it to the flower.' }, hint: { zh: '一只一只算，列竖式。', en: 'Add in columns one at a time.' }, explain: ['l3coladd', { a: 7450, b: 1550 }] }] },
      ],
    },
    {
      id: 'l3-2-3', available: true,
      title: { zh: '心算加法', en: 'Add numbers mentally' },
      intro: { zh: '两位数心算：一种是把两个数都拆成几十和几，几十加几十、几加几再合起来；另一种是先把一个数凑成整十，再加剩下的。', en: 'Split both numbers into tens and ones, or make one number a ten first.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '拆成几十和几', en: 'Do the following addition sums' },
          example: { kind: 'l3mental2', n: { a: 45, b: 54 }, title: { zh: '45 + 54：40 + 50 = 90，5 + 4 = 9，90 + 9 = 99', en: '45 + 54 = 99' } },
          questions: m2.map(([a, b], i) => F(`l3-2-3-A${i + 1}`, '', `${a} + ${b} = {{s}}\n${a} = {{t1}} + {{o1}}　${b} = {{t2}} + {{o2}}\n{{x1}} + {{y1}} = {{z1}}\n{{x2}} + {{y2}} = {{z2}}\n{{x3}} + {{y3}} = {{z3}}`, { s: num(a + b), t1: num(T(a)), o1: num(O(a)), t2: num(T(b)), o2: num(O(b)), x1: num(T(a)), y1: num(T(b)), z1: num(T(a) + T(b)), x2: num(O(a)), y2: num(O(b)), z2: num(O(a) + O(b)), x3: num(T(a) + T(b)), y3: num(O(a) + O(b)), z3: num(a + b) }, ['l3mental2', { a, b }], '把两个数拆成几十和几，先加几十，再加几，最后合起来', 'Split into tens and ones', { label: `${a} + ${b} = ${a + b}`, hint: { zh: `${a} = ${T(a)} + ${O(a)}，${b} = ${T(b)} + ${O(b)}。几十加几十，几加几。`, en: 'Tens plus tens, ones plus ones.' } })) },
        { id: 'B', type: 'fill', title: { zh: '先凑整十', en: 'Do the following addition sums' },
          example: { kind: 'l3mental1', n: { a: 57, b: 36, round: 'a' }, title: { zh: '57 + 36：把 36 拆成 3 和 33，57 + 3 = 60，60 + 33 = 93', en: '57 + 36 = 93' } },
          questions: m1.map(([a, b, round], i) => { const r = round === 'b' ? b : a, s = round === 'b' ? a : b, comp = 10 - O(r), rest = s - comp, ten = r + comp;
            return F(`l3-2-3-B${i + 1}`, '', `${a} + ${b} = {{s}}\n${s} = {{p}} + {{q}}\n{{x1}} + {{y1}} = {{z1}}\n{{x2}} + {{y2}} = {{z2}}`, { s: num(a + b), p: num(comp), q: num(rest), x1: num(r), y1: num(comp), z1: num(ten), x2: num(ten), y2: num(rest), z2: num(a + b) }, ['l3mental1', { a, b, round }], `把 ${s} 拆开，先让 ${r} 凑成整十`, 'Make a ten first', { accept: [{ s: a + b, p: comp, q: rest, x1: r, y1: comp, z1: ten, x2: ten, y2: rest, z2: a + b }, { s: a + b, p: rest, q: comp, x1: r, y1: comp, z1: ten, x2: ten, y2: rest, z2: a + b }, { s: a + b, p: comp, q: rest, x1: comp, y1: r, z1: ten, x2: rest, y2: ten, z2: a + b }, { s: a + b, p: rest, q: comp, x1: comp, y1: r, z1: ten, x2: rest, y2: ten, z2: a + b }], label: `${a} + ${b} = ${a + b}`, hint: { zh: `${r} 加 ${comp} 就是 ${ten}，所以把 ${s} 拆成 ${comp} 和 ${rest}。`, en: `${r} + ${comp} = ${ten}. Split ${s} into ${comp} and ${rest}.` } }); }) },
      ],
    },
  ];
})();
