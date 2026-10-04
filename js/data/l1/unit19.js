/* Level 1 · Unit 19  100 以内的减法 */
(function () {
  const U = window.MATH_DATA.levels[1].units;
  const unit = num => U.find(u => u.num === num);
  const L = window.L1;
  const pic = html => `<div class="center">${html}</div>`;
  const F = (id, p, text, fields, explain, zh, en, o) => Object.assign({ id, type: 'fill', pic: p, label: text.replace(/\{\{\w+\}\}/g, '___').replace(/\n/g, ' '), prompt: { zh, en: en || 'Fill in the blanks' }, text, fields, answerText: Object.values(fields).map(f => f.a).join(', '), explain }, o || {});
  const B = (id, w, a, b, blank, p, explain, o) => Object.assign({ id, type: 'bond', w, a, b, blank, pic: p, explain, label: `${w} ← ${a} , ${b}` }, o || {});
  const C = (id, a, b, o) => Object.assign({ id, type: 'column', a, b, op: '-', width: 2, label: `${a} − ${b} = ${a - b}`, explain: ['l1colsub', { a, b }] }, o || {});
  const seq = (a, b) => { const r = []; for (let i = a; i <= b; i++) r.push(i); return r; };
  const strip = (a, b) => pic(L.stripN(seq(Math.max(0, a - b - 1), Math.min(100, a + 1)), { circle: [a] }));
  const T = n => Math.floor(n / 10) * 10, O = n => n % 10;

  const backA = [[56, 2], [68, 7], [87, 4], [79, 5], [96, 1], [48, 2], [66, 4], [59, 6], [75, 5], [99, 2]];
  const bondB = [[46, 5], [57, 7], [78, 3], [95, 1], [89, 2], [67, 6], [56, 4], [49, 3], [98, 5], [85, 3]];
  const colC = [[65, 2], [76, 5], [47, 3], [84, 4], [97, 5], [58, 1], [79, 4], [46, 0], [69, 7], [94, 3]];
  const tensD = [[55, 10], [83, 30], [100, 40], [76, 20], [91, 10], [69, 20], [94, 30], [87, 40], [72, 10], [98, 20]];
  const colE = [[75, 20], [88, 20], [61, 10], [93, 50], [54, 10], [86, 30], [97, 30], [80, 40], [79, 10], [92, 40]];
  const colF = [[78, 12], [46, 25], [89, 54], [99, 45], [75, 32], [67, 51], [85, 65], [79, 28], [68, 34], [97, 52]];
  const regA = [59, 81, 60, 95, 77, 53, 68, 86, 74, 92];
  const regB = [[61, 6], [54, 7], [73, 9], [97, 8], [100, 5], [85, 7], [66, 9], [72, 6], [50, 8], [92, 9]];
  const regC = [[55, 28], [92, 46], [71, 17], [90, 55], [83, 65], [72, 59], [94, 57], [85, 26], [63, 38], [76, 29]];

  unit(19).kps = [
    {
      id: 'l1-19-1', available: true,
      title: { zh: '不退位减法', en: 'Subtract numbers without regrouping' },
      intro: { zh: '往回数、拆成几十和几先用个位减、或者列竖式先减个位再减十位。', en: 'Count back, split into tens and ones, or subtract in columns: ones first, then tens.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '数字条上往回数', en: 'Subtract the following numbers by counting back' },
          example: { kind: 'l1on100', n: { a: 45, b: 3, op: '-' }, title: { zh: '45 − 3：从 45 往回跳 3 格', en: '45 − 3 = 42' } },
          questions: backA.map(([a, b], i) => F(`l1-19-1-A${i + 1}`, strip(a, b), `${a} − ${b} = {{s}}`, { s: { a: a - b } }, ['l1on100', { a, b, op: '-' }], `从 ${a} 往回数 ${b} 格`, `Count back ${b} from ${a}`, { label: `${a} − ${b} = ${a - b}`, hint: { zh: `从 ${a} 一格一格往回跳 ${b} 格。`, en: `${b} hops back.` } })) },
        { id: 'B', type: 'bond', title: { zh: '拆成几十和几', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'l1splitsub', n: { a: 64, b: 2 }, title: { zh: '64 − 2：64 = 60 + 4，4 − 2 = 2，60 + 2 = 62', en: '64 − 2 = 62' } },
          questions: bondB.map(([a, b], i) => B(`l1-19-1-B${i + 1}`, a, T(a), O(a), ['a', 'b'], '', ['l1splitsub', { a, b }], { anyOrder: false, text: `${a} − ${b} = {{s}}`, fields: { s: { a: a - b } }, label: `${a} − ${b} = ${a - b}`, prompt: { zh: `把 ${a} 拆成几十和几，先用个位减，再加回几十`, en: 'Split into tens and ones.' }, hint: { zh: `${a} = ${T(a)} + ${O(a)}；${O(a)} − ${b} = ${O(a) - b}；${T(a)} + ${O(a) - b} = ${a - b}。`, en: `${T(a)} and ${O(a)}.` } })) },
        { id: 'C', type: 'column', title: { zh: '列竖式减', en: 'Subtract these numbers' },
          example: { kind: 'l1colsub', n: { a: 53, b: 2 }, title: { zh: '53 − 2：先减个位 3 − 2 = 1，再减十位 5 − 0 = 5', en: '53 − 2 = 51' } },
          questions: colC.map(([a, b], i) => C(`l1-19-1-C${i + 1}`, a, b, { hint: { zh: '先减个位，再减十位。', en: 'Ones first, then tens.' } })) },
        { id: 'D', type: 'fill', title: { zh: '减整十', en: 'Subtract the following numbers by counting back' },
          example: { kind: 'l1tens100', n: { a: 62, b: 20, op: '-' }, title: { zh: '62 − 20 = 42：十位减 2，个位不变', en: '62 − 20 = 42' } },
          questions: tensD.map(([a, b], i) => F(`l1-19-1-D${i + 1}`, '', `${a} − ${b} = {{s}}`, { s: { a: a - b } }, ['l1tens100', { a, b, op: '-' }], `减 ${b} 就是减 ${b / 10} 个十`, `Subtract ${b}`, { label: `${a} − ${b} = ${a - b}`, hint: { zh: `十位减 ${b / 10}，个位不变。`, en: `Tens go down by ${b / 10}.` } })) },
        { id: 'E', type: 'column', title: { zh: '竖式减整十', en: 'Subtract these numbers' },
          example: { kind: 'l1colsub', n: { a: 56, b: 10 }, title: { zh: '56 − 10：个位 6 − 0 = 6，十位 5 − 1 = 4', en: '56 − 10 = 46' } },
          questions: colE.map(([a, b], i) => C(`l1-19-1-E${i + 1}`, a, b, { hint: { zh: '个位减 0 不变，十位减一减。', en: 'Ones first, then tens.' } })) },
        { id: 'F', type: 'column', title: { zh: '两位数减两位数', en: 'Subtract these numbers' },
          example: { kind: 'l1colsub', n: { a: 97, b: 36 }, title: { zh: '97 − 36：7 − 6 = 1，9 − 3 = 6', en: '97 − 36 = 61' } },
          questions: colF.map(([a, b], i) => C(`l1-19-1-F${i + 1}`, a, b, { hint: { zh: '先减个位，再减十位。', en: 'Ones first, then tens.' } })) },
      ],
    },
    {
      id: 'l1-19-2', available: true,
      title: { zh: '退位减法', en: 'Subtract numbers with regrouping' },
      intro: { zh: '个位不够减，从十位借 1 个十变成 10 个一，加到个位再减。十位记得少 1。', en: 'When the ones are not enough, regroup 1 ten into 10 ones. Subtract the ones, then the tens.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '重新分组', en: 'Regroup the following tens and ones' },
          example: { kind: 'l1regroup', n: { n: 72 }, title: { zh: '72 = 7 tens 2 ones = 6 tens 12 ones', en: '72 = 7 tens 2 ones = 6 tens 12 ones' } },
          questions: regA.map((n, i) => F(`l1-19-2-A${i + 1}`, '', `${n} = {{t}} tens {{o}} one${O(n) === 1 ? '' : 's'}\n= {{t2}} tens {{o2}} ones`, { t: { a: T(n) / 10 }, o: { a: O(n) }, t2: { a: T(n) / 10 - 1 }, o2: { a: O(n) + 10 } }, ['l1regroup', { n }], `先写 ${n} 有几个十几个一，再把 1 个十拆成 10 个一`, `Regroup ${n}`, { label: `${n} = ${T(n) / 10} tens ${O(n)} ones = ${T(n) / 10 - 1} tens ${O(n) + 10} ones`, hint: { zh: `${n} 是 ${T(n) / 10} 个十 ${O(n)} 个一。拆开 1 个十：十位少 1，个位多 10。`, en: '1 ten = 10 ones.' } })) },
        { id: 'B', type: 'column', title: { zh: '两位数减一位数（退位）', en: 'Regroup and subtract these numbers' },
          example: { kind: 'l1colsub', n: { a: 82, b: 5 }, title: { zh: '82 − 5：2 不够减 5，借 1 个十：12 − 5 = 7；十位 7 − 0 = 7', en: '82 − 5 = 77' } },
          questions: regB.map(([a, b], i) => C(`l1-19-2-B${i + 1}`, a, b, { hint: { zh: '个位不够减，向十位借 1：个位加 10 再减，十位少 1。', en: 'Regroup 1 ten into 10 ones.' } })) },
        { id: 'C', type: 'column', title: { zh: '两位数减两位数（退位）', en: 'Regroup and subtract these numbers' },
          example: { kind: 'l1colsub', n: { a: 60, b: 37 }, title: { zh: '60 − 37：0 不够减 7，借 1 个十：10 − 7 = 3；十位 5 − 3 = 2', en: '60 − 37 = 23' } },
          questions: regC.map(([a, b], i) => C(`l1-19-2-C${i + 1}`, a, b, { hint: { zh: '个位不够减，向十位借 1：个位加 10 再减，十位少 1 再减。', en: 'Regroup 1 ten into 10 ones.' } })) },
      ],
    },
  ];
})();
