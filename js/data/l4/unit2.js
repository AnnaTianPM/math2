/* Level 4 · Unit 2  因数与倍数 */
(function () {
  const U = window.MATH_DATA.levels[4].units;
  const unit = num => U.find(u => u.num === num);
  const FM = window.L4FM;
  const num = a => ({ a });
  const F = (id, p, text, fields, explain, zh, en, o) => Object.assign({ id, type: 'fill', pic: p, label: text.replace(/\{\{\w+\}\}/g, '___').replace(/\n/g, ' '), prompt: { zh, en: en || 'Fill in the blanks' }, text, fields, answerText: Object.values(fields).map(f => f.a).join(', '), explain }, o || {});
  const ORD = ['', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth'];
  const CNT = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];

  const pairsA = [12, 42, 36];
  const commonB = [[8, 16], [14, 28], [9, 18]];
  const mulA = [[5, 4], [9, 3], [7, 4], [10, 5], [11, 6]];
  const nthB = [[6, 7], [5, 7], [9, 8], [7, 8], [12, 9]];
  const cmulC = [[2, 3, 6, 2], [4, 8, 6, 3], [6, 12, 6, 3]];

  unit(2).kps = [
    {
      id: 'l4-2-1', available: true,
      title: { zh: '因数与公因数', en: 'List factors and common factors of whole numbers' },
      intro: { zh: '两个整数相乘得到 12，这两个数就是 12 的因数（factor）。找因数从 1 开始一对一对试：1×12、2×6、3×4。两个数都有的因数叫公因数（common factor）。', en: 'If a × b = 12, then a and b are factors of 12. Try 1, 2, 3, ... in pairs. Factors shared by two numbers are common factors.' },
      sections: [
        { id: 'A', type: 'l4fpairs', title: { zh: '写因数对，列出所有因数', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'l4factors', n: { n: 6 }, title: { zh: '6 = 1 × 6 = 2 × 3，因数是 1、2、3、6', en: 'The factors of 6 are 1, 2, 3 and 6' } },
          questions: pairsA.map((n, i) => ({ id: `l4-2-1-A${i + 1}`, type: 'l4fpairs', n, label: `${n} 的因数对与因数` })) },
        { id: 'B', type: 'numlist', title: { zh: '因数和公因数', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'l4common', n: { a: 4, b: 6 }, title: { zh: '4 的因数 1、2、4；6 的因数 1、2、3、6；公因数 1、2', en: 'The common factors of 4 and 6 are 1, 2' } },
          questions: commonB.map(([a, b], i) => { const fa = FM.factorsOf(a), fb = FM.factorsOf(b), c = fa.filter(x => fb.includes(x));
            return { id: `l4-2-1-B${i + 1}`, type: 'numlist', label: `${a} 和 ${b} 的因数与公因数`, lines: [{ text: `(a) The factors of ${a} are {{x}}.`, a: fa }, { text: `(b) The factors of ${b} are {{x}}.`, a: fb }, { text: `(c) The common factors of ${a} and ${b} are {{x}}.`, a: c }], prompt: { zh: `先写 ${a} 和 ${b} 各自的因数，再写两个数都有的因数`, en: `List the factors of ${a} and ${b}, then the common factors` }, hint: { zh: '从 1 开始一对一对试；两行都出现的数就是公因数。', en: 'Try 1, 2, 3, ... Common factors appear in both lists.' }, explain: ['l4common', { a, b }] }; }) },
      ],
    },
    {
      id: 'l4-2-2', available: true,
      title: { zh: '倍数与公倍数', en: 'List multiples and common multiples of whole numbers' },
      intro: { zh: '5 乘 1、2、3…… 得到 5、10、15……，这些都是 5 的倍数（multiple）。第 7 个倍数就是 5 × 7。两个数都有的倍数叫公倍数（common multiple）。', en: 'Multiples of 5: 5 × 1, 5 × 2, 5 × 3, ... The seventh multiple is 5 × 7. Multiples shared by two numbers are common multiples.' },
      sections: [
        { id: 'A', type: 'numlist', title: { zh: '前几个倍数', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'l4multiples', n: { n: 3, k: 4 }, title: { zh: '3 的前 4 个倍数：3、6、9、12', en: 'The first four multiples of 3 are 3, 6, 9, 12' } },
          questions: mulA.map(([n, k], i) => ({ id: `l4-2-2-A${i + 1}`, type: 'numlist', label: `${n} 的前 ${k} 个倍数`, lines: [{ text: `The first ${CNT[k]} multiples of ${n} are {{x}}.`, a: FM.multiples(n, k) }], prompt: { zh: `${n} 的前 ${k} 个倍数是哪些？`, en: `The first ${CNT[k]} multiples of ${n}` }, hint: { zh: `${n} × 1、${n} × 2、${n} × 3……每次加 ${n}。`, en: `Add ${n} each time.` }, explain: ['l4multiples', { n, k }] })) },
        { id: 'B', type: 'fill', title: { zh: '第几个倍数', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'l4nthmul', n: { n: 4, k: 6 }, title: { zh: '4 的第 6 个倍数是 4 × 6 = 24', en: 'The sixth multiple of 4 is 24' } },
          questions: nthB.map(([n, k], i) => F(`l4-2-2-B${i + 1}`, '', `The ${ORD[k]} multiple of ${n} is {{a}}.`, { a: num(n * k) }, ['l4nthmul', { n, k }], `${n} 的第 ${k} 个倍数是多少？`, `The ${ORD[k]} multiple of ${n}`, { label: `The ${ORD[k]} multiple of ${n} = ${n * k}`, hint: { zh: `第 ${k} 个倍数就是 ${n} × ${k}。`, en: `${n} × ${k}.` } })) },
        { id: 'C', type: 'numlist', title: { zh: '倍数和公倍数', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'l4cmul', n: { a: 3, b: 4, k: 6 }, title: { zh: '3 的倍数 3…18，4 的倍数 4…24，公倍数 12', en: 'Common multiple of 3 and 4: 12' } },
          questions: cmulC.map(([a, b, k, cn], i) => { const ma = FM.multiples(a, k), mb = FM.multiples(b, k), c = ma.filter(x => mb.includes(x));
            return { id: `l4-2-2-C${i + 1}`, type: 'numlist', label: `${a} 和 ${b} 的倍数与公倍数`, lines: [{ text: `(a) The first ${CNT[k]} multiples of ${a} are {{x}}.`, a: ma }, { text: `(b) The first ${CNT[k]} multiples of ${b} are {{x}}.`, a: mb }, { text: `(c) The ${CNT[cn]} common multiples of ${a} and ${b} are {{x}}.`, a: c }], prompt: { zh: `先写 ${a} 和 ${b} 的前 ${k} 个倍数，再找两行都有的数`, en: `List the first ${CNT[k]} multiples of ${a} and ${b}, then the common multiples` }, hint: { zh: `每次加 ${a} / 加 ${b}；两行都出现的就是公倍数。`, en: 'Common multiples appear in both lists.' }, explain: ['l4cmul', { a, b, k }] }; }) },
      ],
    },
  ];
})();
