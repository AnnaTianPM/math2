/* Level 1 · Unit 18  100 以内的加法 */
(function () {
  const U = window.MATH_DATA.levels[1].units;
  const unit = num => U.find(u => u.num === num);
  const L = window.L1;
  const pic = html => `<div class="center">${html}</div>`;
  const F = (id, p, text, fields, explain, zh, en, o) => Object.assign({ id, type: 'fill', pic: p, label: text.replace(/\{\{\w+\}\}/g, '___').replace(/\n/g, ' '), prompt: { zh, en: en || 'Fill in the blanks' }, text, fields, answerText: Object.values(fields).map(f => f.a).join(', '), explain }, o || {});
  const B = (id, w, a, b, blank, p, explain, o) => Object.assign({ id, type: 'bond', w, a, b, blank, pic: p, explain, label: `${w} ← ${a} , ${b}` }, o || {});
  const C = (id, a, b, o) => Object.assign({ id, type: 'column', a, b, op: '+', width: a + b >= 100 ? 3 : 2, label: `${a} + ${b} = ${a + b}`, explain: ['l1coladd', { a, b }] }, o || {});
  const seq = (a, b) => { const r = []; for (let i = a; i <= b; i++) r.push(i); return r; };
  const strip = (a, b) => pic(L.stripN(seq(Math.max(0, a - 1), Math.min(100, a + b + 1)), { circle: [a] }));
  const T = n => Math.floor(n / 10) * 10, O = n => n % 10;

  const onA = [[55, 3], [61, 8], [80, 7], [73, 2], [94, 5], [47, 1], [66, 3], [52, 5], [84, 2], [70, 4]];
  const bondB = [[43, 4], [75, 1], [95, 4], [62, 6], [81, 5], [54, 3], [73, 6], [92, 2], [44, 1], [61, 7]];
  const colC = [[56, 3], [82, 6], [41, 4], [5, 74], [90, 6], [65, 2], [53, 1], [94, 4], [5, 61], [86, 1]];
  const tensD = [[75, 20], [53, 40], [49, 30], [64, 20], [50, 10], [48, 40], [67, 10], [70, 30], [82, 10], [41, 20]];
  const colE = [[77, 20], [43, 30], [62, 20], [59, 40], [20, 48], [45, 10], [60, 30], [44, 40], [66, 10], [30, 51]];
  const colF = [[42, 36], [25, 74], [53, 13], [41, 46], [63, 31], [27, 52], [44, 14], [45, 51], [66, 23], [15, 82]];
  const regA = [[62, 8], [57, 5], [7, 78], [89, 9], [46, 8], [77, 6], [4, 56], [65, 8], [84, 7], [48, 9]];
  const regB = [[28, 64], [35, 47], [68, 18], [41, 19], [39, 37], [28, 36], [59, 15], [46, 47], [66, 34], [27, 58]];

  unit(18).kps = [
    {
      id: 'l1-18-1', available: true,
      title: { zh: '不进位加法', en: 'Add numbers without regrouping' },
      intro: { zh: '和 40 以内一样：往后数、拆成几十和几、或者列竖式先加个位再加十位。', en: 'Count on, split into tens and ones, or add in columns: ones first, then tens.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '数字条上往后数', en: 'Add the following numbers by counting on' },
          example: { kind: 'l1on100', n: { a: 42, b: 4, op: '+' }, title: { zh: '42 + 4：从 42 往后跳 4 格', en: '42 + 4 = 46' } },
          questions: onA.map(([a, b], i) => F(`l1-18-1-A${i + 1}`, strip(a, b), `${a} + ${b} = {{s}}`, { s: { a: a + b } }, ['l1on100', { a, b, op: '+' }], `从 ${a} 往后数 ${b} 格`, `Count on ${b} from ${a}`, { label: `${a} + ${b} = ${a + b}`, hint: { zh: `从 ${a} 一格一格跳 ${b} 格。`, en: `${b} hops.` } })) },
        { id: 'B', type: 'bond', title: { zh: '拆成几十和几', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'l1splitadd', n: { a: 51, b: 3 }, title: { zh: '51 + 3：51 = 50 + 1，1 + 3 = 4，50 + 4 = 54', en: '51 + 3 = 54' } },
          questions: bondB.map(([a, b], i) => B(`l1-18-1-B${i + 1}`, a, T(a), O(a), ['a', 'b'], '', ['l1splitadd', { a, b }], { anyOrder: false, text: `${a} + ${b} = {{s}}`, fields: { s: { a: a + b } }, label: `${a} + ${b} = ${a + b}`, prompt: { zh: `把 ${a} 拆成几十和几，先加个位再加回几十`, en: 'Split into tens and ones.' }, hint: { zh: `${a} = ${T(a)} + ${O(a)}；${O(a)} + ${b} = ${O(a) + b}；${T(a)} + ${O(a) + b} = ${a + b}。`, en: `${T(a)} and ${O(a)}.` } })) },
        { id: 'C', type: 'column', title: { zh: '列竖式加', en: 'Add these numbers' },
          example: { kind: 'l1coladd', n: { a: 63, b: 2 }, title: { zh: '63 + 2：先加个位 3 + 2 = 5，再加十位 6 + 0 = 6', en: '63 + 2 = 65' } },
          questions: colC.map(([a, b], i) => C(`l1-18-1-C${i + 1}`, a, b, { hint: { zh: '先加个位，再加十位。', en: 'Ones first, then tens.' } })) },
        { id: 'D', type: 'fill', title: { zh: '加整十', en: 'Add the following numbers by counting on' },
          example: { kind: 'l1tens100', n: { a: 41, b: 10, op: '+' }, title: { zh: '41 + 10 = 51：十位加 1，个位不变', en: '41 + 10 = 51' } },
          questions: tensD.map(([a, b], i) => F(`l1-18-1-D${i + 1}`, '', `${a} + ${b} = {{s}}`, { s: { a: a + b } }, ['l1tens100', { a, b, op: '+' }], `加 ${b} 就是加 ${b / 10} 个十`, `Add ${b}`, { label: `${a} + ${b} = ${a + b}`, hint: { zh: `十位加 ${b / 10}，个位不变。`, en: `Tens go up by ${b / 10}.` } })) },
        { id: 'E', type: 'column', title: { zh: '竖式加整十', en: 'Add these numbers' },
          example: { kind: 'l1coladd', n: { a: 56, b: 10 }, title: { zh: '56 + 10：个位 6 + 0 = 6，十位 5 + 1 = 6', en: '56 + 10 = 66' } },
          questions: colE.map(([a, b], i) => C(`l1-18-1-E${i + 1}`, a, b, { hint: { zh: '个位加 0 不变，十位加起来。', en: 'Ones first, then tens.' } })) },
        { id: 'F', type: 'column', title: { zh: '两位数加两位数', en: 'Add these numbers' },
          example: { kind: 'l1coladd', n: { a: 64, b: 11 }, title: { zh: '64 + 11：4 + 1 = 5，6 + 1 = 7', en: '64 + 11 = 75' } },
          questions: colF.map(([a, b], i) => C(`l1-18-1-F${i + 1}`, a, b, { hint: { zh: '先加个位，再加十位。', en: 'Ones first, then tens.' } })) },
      ],
    },
    {
      id: 'l1-18-2', available: true,
      title: { zh: '进位加法', en: 'Add numbers with regrouping' },
      intro: { zh: '个位加起来满 10 要进位：写个位数，向十位进 1，加十位时记得加上。', en: 'When the ones make 10 or more, regroup: write the ones digit and carry 1 to the tens.' },
      sections: [
        { id: 'A', type: 'column', title: { zh: '两位数加一位数（进位）', en: 'Add and regroup these numbers' },
          example: { kind: 'l1coladd', n: { a: 45, b: 6 }, title: { zh: '45 + 6：5 + 6 = 11，写 1 进 1；1 + 4 = 5', en: '45 + 6 = 51' } },
          questions: regA.map(([a, b], i) => C(`l1-18-2-A${i + 1}`, a, b, { hint: { zh: '个位满 10 进 1，十位记得加上进的 1。', en: 'Regroup the ones.' } })) },
        { id: 'B', type: 'column', title: { zh: '两位数加两位数（进位）', en: 'Add and regroup these numbers' },
          example: { kind: 'l1coladd', n: { a: 48, b: 24 }, title: { zh: '48 + 24：8 + 4 = 12，写 2 进 1；1 + 4 + 2 = 7', en: '48 + 24 = 72' } },
          questions: regB.map(([a, b], i) => C(`l1-18-2-B${i + 1}`, a, b, { hint: { zh: '个位满 10 进 1，十位三个数相加。', en: 'Regroup the ones.' } })) },
      ],
    },
  ];
})();
