/* Level 3 · Unit 3  10 000 以内的减法 */
(function () {
  const U = window.MATH_DATA.levels[3].units;
  const unit = num => U.find(u => u.num === num);
  const L = window.L3;
  const pic = html => `<div class="center">${html}</div>`;
  const num = a => ({ a });
  const F = (id, p, text, fields, explain, zh, en, o) => Object.assign({ id, type: 'fill', pic: p, label: text.replace(/\{\{\w+\}\}/g, '___').replace(/\n/g, ' '), prompt: { zh, en: en || 'Fill in the blanks' }, text, fields, answerText: Object.values(fields).map(f => f.a).join(', '), explain }, o || {});
  const C = (id, a, b, o) => Object.assign({ id, type: 'column', a, b, op: '-', width: 4, label: `${a} − ${b} = ${a - b}`, explain: ['l3colsub', { a, b }], hint: { zh: '从个位开始减，不够减向前一位借 1（前一位是 0 就再往前借）。', en: 'Start from the ones. Regroup when the digit is too small.' } }, o || {});
  const T = n => Math.floor(n / 10) * 10, O = n => n % 10;
  const pairPic = (a, b) => pic(`<div class="disc-pair"><span class="lbl">${a}</span>${L.discs(a)}<span class="lbl">− ${b}</span>${L.discs(b)}</div>`);

  const discA = [[3669, 568], [6975, 142], [5959, 3654], [7795, 4581], [9698, 8682]];
  const colB = [[3869, 235], [7787, 4325], [6848, 2005], [2426, 1310], [8818, 7107], [4945, 2632], [5794, 3780], [9697, 4477], [5589, 1368], [9936, 6823]];
  const regA = [[5881, 4058], [2900, 890], [4136, 2128], [7431, 5611], [9130, 3684], [8292, 2505], [5392, 2886], [4988, 3969], [9368, 1487], [2376, 1487], [8000, 4659], [3576, 1899], [6005, 4769], [8010, 3865], [5353, 1526], [3350, 1598], [6206, 2062], [9123, 2576], [7007, 4334], [8181, 1989]];
  const m2 = [[99, 13], [67, 44], [86, 32], [45, 24], [79, 61], [57, 16], [88, 23], [65, 31], [96, 54], [77, 42]];
  const m1 = [[54, 27], [71, 49], [45, 18], [83, 55], [66, 29], [90, 62], [72, 33], [51, 16], [80, 47], [44, 28]];

  unit(3).kps = [
    {
      id: 'l3-3-1', available: true,
      title: { zh: '10 000 以内的减法', en: 'Subtract numbers within 10 000' },
      intro: { zh: '减法在圆片图上就是划掉：减几个千就划掉几个 1000……列竖式时对齐数位，从个位减起。', en: 'Cross out the discs you take away. In columns, subtract from the ones.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '看圆片求差', en: 'Find the difference between these numbers' },
          example: { kind: 'l3discsub', n: { a: 1845, b: 423 }, title: { zh: '1845 − 423 = 1422', en: 'The difference between 1845 and 423 is 1422' } },
          questions: discA.map(([a, b], i) => F(`l3-3-1-A${i + 1}`, pairPic(a, b), `The difference between ${a} and ${b} is {{s}}.`, { s: num(a - b) }, ['l3discsub', { a, b }], `${a} 和 ${b} 的差是多少？`, `Find the difference`, { label: `${a} − ${b} = ${a - b}`, hint: { zh: '每一种圆片划掉要减的个数，不够划就把前一位的 1 个拆成 10 个。', en: 'Cross out the discs. Regroup when needed.' } })) },
        { id: 'B', type: 'column', title: { zh: '列竖式减', en: 'Subtract these numbers. Show your working clearly' },
          example: { kind: 'l3colsub', n: { a: 3869, b: 235 }, title: { zh: '3869 − 235 = 3634', en: '3869 − 235 = 3634' } },
          questions: colB.map(([a, b], i) => C(`l3-3-1-B${i + 1}`, a, b)) },
      ],
    },
    {
      id: 'l3-3-2', available: true,
      title: { zh: '退位减法', en: 'Perform subtraction by regrouping ones, tens, hundreds and thousands' },
      intro: { zh: '哪一位不够减，就向前一位借 1 当 10。前一位是 0 的话，要再往前一位借，一路借过来。', en: 'Regroup from the next place. If that place is 0, regroup from the place before it.' },
      sections: [
        { id: 'A', type: 'column', title: { zh: '列竖式减（退位）', en: 'Subtract these numbers. Show your working clearly' },
          example: { kind: 'l3colsub', n: { a: 9776, b: 1085 }, title: { zh: '9776 − 1085：百位 7 不够减 0？够；十位 7 − 8 不够，向百位借 1', en: '9776 − 1085 = 8691' } },
          questions: regA.map(([a, b], i) => C(`l3-3-2-A${i + 1}`, a, b)) },
      ],
    },
    {
      id: 'l3-3-3', available: true,
      title: { zh: '心算减法', en: 'Subtract numbers mentally' },
      intro: { zh: '两位数心算减法：把两个数都拆成几十和几，几十减几十、几减几再合起来；或者把减数拆开，先减到整十，再减剩下的。', en: 'Split both numbers into tens and ones, or subtract to a ten first.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '拆成几十和几', en: 'Do the following subtraction sums' },
          example: { kind: 'l3msub2', n: { a: 58, b: 25 }, title: { zh: '58 − 25：50 − 20 = 30，8 − 5 = 3，30 + 3 = 33', en: '58 − 25 = 33' } },
          questions: m2.map(([a, b], i) => F(`l3-3-3-A${i + 1}`, '', `${a} − ${b} = {{s}}\n${a} = {{t1}} + {{o1}}　${b} = {{t2}} + {{o2}}\n{{x1}} − {{y1}} = {{z1}}\n{{x2}} − {{y2}} = {{z2}}\n{{x3}} + {{y3}} = {{z3}}`, { s: num(a - b), t1: num(T(a)), o1: num(O(a)), t2: num(T(b)), o2: num(O(b)), x1: num(T(a)), y1: num(T(b)), z1: num(T(a) - T(b)), x2: num(O(a)), y2: num(O(b)), z2: num(O(a) - O(b)), x3: num(T(a) - T(b)), y3: num(O(a) - O(b)), z3: num(a - b) }, ['l3msub2', { a, b }], '把两个数拆成几十和几，几十减几十，几减几，再合起来', 'Split into tens and ones', { label: `${a} − ${b} = ${a - b}`, hint: { zh: `${a} = ${T(a)} + ${O(a)}，${b} = ${T(b)} + ${O(b)}。`, en: 'Tens minus tens, ones minus ones.' } })) },
        { id: 'B', type: 'fill', title: { zh: '先减到整十', en: 'Do the following subtraction sums' },
          example: { kind: 'l3msub1', n: { a: 62, b: 36 }, title: { zh: '62 − 36：把 36 拆成 32 和 4，62 − 32 = 30，30 − 4 = 26', en: '62 − 36 = 26' } },
          questions: m1.map(([a, b], i) => { const p = b - O(a), q = O(a), ten = a - p;
            return F(`l3-3-3-B${i + 1}`, '', `${a} − ${b} = {{s}}\n${b} = {{p}} + {{q}}\n{{x1}} − {{y1}} = {{z1}}\n{{x2}} − {{y2}} = {{z2}}`, { s: num(a - b), p: num(p), q: num(q), x1: num(a), y1: num(p), z1: num(ten), x2: num(ten), y2: num(q), z2: num(a - b) }, ['l3msub1', { a, b }], `把 ${b} 拆开，先把 ${a} 减到整十`, 'Subtract to a ten first', { accept: [{ s: a - b, p, q, x1: a, y1: p, z1: ten, x2: ten, y2: q, z2: a - b }, { s: a - b, p: q, q: p, x1: a, y1: p, z1: ten, x2: ten, y2: q, z2: a - b }], label: `${a} − ${b} = ${a - b}`, hint: { zh: `${a} 的个位是 ${q}，所以把 ${b} 拆成 ${p} 和 ${q}：${a} − ${p} = ${ten}，再减 ${q}。`, en: `Split ${b} into ${p} and ${q}.` } }); }) },
      ],
    },
  ];
})();
