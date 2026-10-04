/* Level 1 · Unit 17  100 以内的数 */
(function () {
  const U = window.MATH_DATA.levels[1].units;
  const unit = num => U.find(u => u.num === num);
  const L = window.L1, W = L.word100;
  const pic = html => `<div class="center">${html}</div>`;
  const choice = (a, options) => ({ a, kind: 'choice', options });
  const F = (id, p, text, fields, explain, zh, en, o) => Object.assign({ id, type: 'fill', pic: p, label: text.replace(/\{\{\w+\}\}/g, '___').replace(/\n/g, ' '), prompt: { zh, en: en || 'Fill in the blanks' }, text, fields, answerText: Object.values(fields).map(f => f.a).join(', '), explain }, o || {});
  const seq = (a, b, s = 1) => { const r = []; for (let i = a; i <= b; i += s) r.push(i); return r; };
  const frames = (icon, n) => pic(L.tens(icon, n));
  const wordOpts = n => { const base = [n]; const pool = [n - 1, n + 1, n - 10, n + 10, n - 2, n + 2].filter(x => x >= 40 && x <= 100 && !base.includes(x)); while (base.length < 4) base.push(pool.shift()); return base.sort((a, b) => a - b).map(W); };
  const numshape = (n, cls) => `<span class="numshape ${cls}">${n}</span>`;
  const setPic = (ia, na, ib, nb) => pic(`<div class="setbox2 big"><div class="setbox"><b>Set A</b>${L.tens(ia, na)}</div><div class="setbox"><b>Set B</b>${L.tens(ib, nb)}</div></div>`);
  const strip = (nums, circle) => pic(L.stripN(nums, { circle }));
  const patPic = (sq, blanks) => pic(`<div class="nstrip">${sq.map((n, i) => `<span class="ns ${blanks.includes(i) ? 'blankn' : ''}">${blanks.includes(i) ? '?' : n}</span>`).join('')}</div>`);
  const patQ = (id, sq, blanks) => { const keys = 'abcde'.split(''); const fields = {}; const text = sq.map((n, k) => blanks.includes(k) ? (fields[keys[k]] = { a: n }, `{{${keys[k]}}}`) : String(n)).join(', ');
    return F(id, patPic(sq, blanks), text, fields, ['l1pat40', { seq: sq, blanks }], '找规律，填空格', 'Complete the pattern', { label: sq.map((n, k) => blanks.includes(k) ? '__' : n).join(', '), hint: { zh: '看给出的数每次差几。', en: 'Find the difference.' } }); };

  /* ---- KP1 ---- */
  const countA = [['🌹', 59], ['📄', 61], ['🧵', 80], ['🍫', 47], ['🧃', 72], ['🐟', 84], ['🍪', 56], ['🌿', 93], ['🍇', 65], ['🎳', 100]];
  const countB = [['🫘', 48], ['📌', 77], ['🥛', 81], ['🥤', 64], ['🍓', 99], ['💡', 46], ['🦋', 58], ['🍄', 83], ['🧀', 74], ['🐢', 95]];
  const triC = [63, 86, 55, 78, 49, 97, 62, 54, 71, 90];
  const wordsD = [75, 96, 63, 55, 81, 100, 44, 79, 52, 97];
  const numsE = [50, 92, 64, 85, 76, 99, 43, 61, 87, 78];
  /* ---- KP2 ---- */
  const tensA = [['🐜', 50], ['🔘', 79], ['🧵', 66], ['🍭', 85], ['🦋', 92], ['🧱', 57], ['🧅', 44], ['🐜', 91], ['🧱', 88], ['🍬', 73]];
  const triB = [53, 76, 69, 82, 94, 51, 60, 75, 98, 87];
  const makeC = [[50, 1, 'sum'], [70, 3, 'sum'], [40, 6, 'sum'], [60, 8, 'sum'], [90, 5, 'a'], [80, 2, 'a'], [40, 1, 'a'], [50, 7, 'b'], [90, 0, 'b'], [70, 4, 'b']];
  const plusD = [[60, 9, 'sum'], [80, 5, 'sum'], [100, 0, 'sum'], [50, 6, 'sum'], [40, 8, 'a'], [70, 7, 'a'], [90, 1, 'a'], [60, 3, 'b'], [80, 4, 'b'], [50, 2, 'b']];
  /* ---- KP3 ---- */
  // [icon, na, nb, 第一句是 less 还是 more 在前, 第三句是 fewer 还是 more 在前]
  const setA = [['🧈', 52, 50, 'less', 'fewer'], ['🍓', 65, 60, 'more', 'more'], ['🐌', 70, 80, 'less', 'fewer'], ['🧅', 83, 86, 'more', 'more'], ['🐞', 98, 100, 'less', 'fewer']];
  const s2 = seq(80, 100, 2), s3 = seq(60, 90, 3), s5 = seq(45, 100, 5);
  const stripB = [[s2, 80, 2, 'a'], [s2, 92, -2, 'a'], [s2, 86, 2, 'b'], [s2, 96, -2, 'b'], [s3, 66, 3, 'a'], [s3, 63, -3, 'a'], [s3, 72, 3, 'b'], [s3, 90, -3, 'b'], [s5, 45, 5, 'a'], [s5, 70, -5, 'a'], [s5, 95, 5, 'b'], [s5, 60, -5, 'b'], [s5, 50, 10, 'a'], [s5, 55, -10, 'a'], [s5, 80, 10, 'b'], [s5, 95, -10, 'b']];
  const matchC = [['3 less than 99', 96], ['2 more than 48', 50], ['10 less than 92', 82], ['5 more than 62', 67], ['2 less than 76', 74], ['10 more than 49', 59], ['5 less than 46', 41], ['3 more than 65', 68]];
  const backD = [['how', 42, 47], ['how', 83, 81], ['how', 54, 64], ['how', 79, 76], ['more', 2, 95], ['less', 5, 53], ['more', 3, 88], ['less', 10, 62]];
  const greatE = [[41, 51], [72, 64], [83, 56], [98, 77], [65, 100], [44, 49], [52, 50], [79, 78], [93, 95], [80, 87]];
  const smallF = [[60, 70, 'tri'], [85, 55, 'sq'], [44, 63, 'circ'], [99, 76, 'trid'], [57, 100, 'dia'], [62, 68, 'tri'], [46, 43, 'sq'], [88, 81, 'circ'], [53, 57, 'trid'], [94, 92, 'dia']];
  const greatG = [[43, 52, 61], [97, 88, 79], [60, 100, 80], [75, 45, 95], [54, 86, 62], [42, 40, 41], [63, 67, 65], [91, 94, 98], [56, 50, 53], [73, 79, 76]];
  const smallH = [[[62, 40, 84], 'tri'], [[51, 95, 73], 'sq'], [[100, 77, 44], 'circ'], [[65, 53, 86], 'trid'], [[49, 91, 78], 'dia'], [[53, 56, 50], 'tri'], [[85, 82, 89], 'sq'], [[46, 48, 41], 'circ'], [[92, 99, 97], 'trid'], [[67, 69, 65], 'dia']];
  const setI = [
    [[49, 63, 57, 74], '(a) The smallest number is {{a}}.\n(b) The greatest number is {{b}}.\n(c) {{c}} and {{d}} are smaller than 63.\n(d) {{e}} and {{f}} are greater than 57.\n(e) {{g}} is smaller than 63 but greater than 49.\n(f) {{h}} is greater than 57 but smaller than 74.', { a: 49, b: 74, c: 49, d: 57, e: 63, f: 74, g: 57, h: 63 }],
    [[96, 82, 64, 79], '(a) The greatest number is {{a}}.\n(b) The smallest number is {{b}}.\n(c) {{c}} and {{d}} are greater than 79.\n(d) {{e}} and {{f}} are smaller than 82.\n(e) {{g}} is greater than 79 but smaller than 96.\n(f) {{h}} is smaller than 82 but greater than 64.', { a: 96, b: 64, c: 96, d: 82, e: 64, f: 79, g: 82, h: 79 }],
    [[60, 85, 100, 45], '(a) The smallest number is {{a}}.\n(b) The greatest number is {{b}}.\n(c) {{c}} and {{d}} are smaller than 85.\n(d) {{e}} and {{f}} are greater than 60.\n(e) {{g}} is smaller than 85 but greater than 45.\n(f) {{h}} is greater than 60 but smaller than 100.', { a: 45, b: 100, c: 60, d: 45, e: 85, f: 100, g: 60, h: 85 }],
    [[71, 53, 76, 58], '(a) The greatest number is {{a}}.\n(b) The smallest number is {{b}}.\n(c) {{c}} and {{d}} are greater than 58.\n(d) {{e}} and {{f}} are smaller than 71.\n(e) {{g}} is greater than 58 but smaller than 76.\n(f) {{h}} is smaller than 71 but greater than 53.', { a: 76, b: 53, c: 71, d: 76, e: 53, f: 58, g: 71, h: 58 }],
  ];
  const orderJ = [[[67, 44, 81], 'desc'], [[93, 59, 100, 78], 'desc'], [[66, 92, 45, 50], 'desc'], [[79, 95, 57], 'asc'], [[48, 64, 68, 46], 'asc'], [[87, 73, 77, 83], 'asc']];
  /* ---- KP4 ---- */
  const patA = [[[42, 44, 46, 48, 50], [3, 4]], [[72, 75, 78, 81, 84], [2, 3]], [[60, 64, 68, 72, 76], [0, 1]], [[55, 60, 65, 70, 75], [0, 3]], [[40, 50, 60, 70, 80], [1, 2]]];
  const patB = [[[100, 96, 92, 88, 84], [3, 4]], [[87, 84, 81, 78, 75], [1, 3]], [[95, 90, 85, 80, 75], [0, 4]], [[64, 62, 60, 58, 56], [1, 2]], [[90, 80, 70, 60, 50], [0, 2]]];

  unit(17).kps = [
    {
      id: 'l1-17-1', available: true,
      title: { zh: '数一数：40 到 100', en: 'Count numbers from 40 to 100' },
      intro: { zh: '10 个一组：10、20、30……90、100，再接着一个一个数。', en: 'Count in tens: 10, 20, ... 100, then count on by ones.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '十个十个数，再一个一个数', en: 'Count in tens and ones. Write the correct numbers on the lines provided' },
          example: { kind: 'l1count40', n: { icon: '✏️', n: 45 }, title: { zh: '10, 20, 30, 40, 41, 42, 43, 44, 45', en: 'Count in tens, then ones' } },
          questions: countA.map(([icon, n], i) => { const chain = seq(10, Math.floor(n / 10) * 10, 10).concat(seq(Math.floor(n / 10) * 10 + 1, n)); const keys = 'abcdefghijklmnopqrst'.split(''); const fields = {}; const text = chain.map((x, k) => k < 2 ? String(x) : (fields[keys[k]] = { a: x }, `{{${keys[k]}}}`)).join(', ');
            return F(`l1-17-1-A${i + 1}`, frames(icon, n), text, fields, ['l1count40', { icon, n }], '先十个十个数，剩下的一个一个数', 'Count in tens and ones', { label: `${icon} × ${n}`, hint: { zh: `每一组 10 个：10、20、30……然后接着一个一个数。`, en: 'Count 10, 20, ... then count on.' } }); }) },
        { id: 'B', type: 'fill', title: { zh: '圈 10 个一组，数一数', en: 'Circle groups of 10. Count and write the correct numbers on the lines provided' },
          example: { kind: 'l1count40', n: { icon: '⚽', n: 52 }, title: { zh: '5 组 10 再加 2：52', en: '10, 20, 30, 40, 50, 51, 52' } },
          questions: countB.map(([icon, n], i) => F(`l1-17-1-B${i + 1}`, frames(icon, n), '{{a}}', { a: { a: n } }, ['l1count40', { icon, n }], '10 个一组数，一共几个？', 'Count', { label: `${icon} × ${n}`, hint: { zh: `有 ${Math.floor(n / 10)} 组 10，再加 ${n % 10} 个。`, en: `${Math.floor(n / 10)} tens and ${n % 10}.` } })) },
        { id: 'C', type: 'fill', title: { zh: '数三角形里的点', en: 'Count the dots and write the correct numbers on the lines provided' },
          example: { kind: 'l1tri40', n: { n: 40 }, title: { zh: '4 个三角形：40 个点', en: '10, 20, 30, 40' } },
          questions: triC.map((n, i) => F(`l1-17-1-C${i + 1}`, pic(L.triRow(n)), '{{a}}', { a: { a: n } }, ['l1tri40', { n }], '每个三角形是 10 个点，一共几个点？', 'Count the dots', { label: `点阵 ${n}`, hint: { zh: `${Math.floor(n / 10)} 个三角形是 ${Math.floor(n / 10) * 10}，再加散的 ${n % 10} 个。`, en: `${Math.floor(n / 10)} triangles = ${Math.floor(n / 10) * 10}.` } })) },
        { id: 'D', type: 'fill', title: { zh: '写英文', en: 'Write the following numbers in words' },
          example: { kind: 'l1word100', n: { n: 68 }, title: { zh: '68 = sixty-eight', en: 'sixty-eight' } },
          questions: wordsD.map((n, i) => F(`l1-17-1-D${i + 1}`, '', `${n} = {{w}}`, { w: choice(W(n), wordOpts(n)) }, ['l1word100', { n }], `${n} 的英文是什么？`, 'Write in words', { label: `${n} = ${W(n)}`, hint: { zh: 'fifty 50，sixty 60，seventy 70，eighty 80，ninety 90，one hundred 100。', en: 'fifty, sixty, seventy, eighty, ninety.' } })) },
        { id: 'E', type: 'fill', title: { zh: '英文写成数字', en: 'Write the numbers on the lines provided' },
          example: { kind: 'l1word100', n: { n: 73 }, title: { zh: 'seventy-three = 73', en: 'seventy-three = 73' } },
          questions: numsE.map((n, i) => F(`l1-17-1-E${i + 1}`, '', `${W(n)} = {{n}}`, { n: { a: n } }, ['l1word100', { n }], `${W(n)} 是几？`, 'Write in numerals', { label: `${W(n)} = ${n}`, hint: { zh: '前面的词是几十，后面的是几。', en: 'Tens word, then ones.' } })) },
      ],
    },
    {
      id: 'l1-17-2', available: true,
      title: { zh: '几个十、几个一（40 到 100）', en: 'Use tens and ones to show numbers from 40 to 100' },
      intro: { zh: '每 10 个是 1 ten。43 = 4 tens 3 ones = 40 + 3。', en: '43 = 4 tens 3 ones = 40 + 3.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '看图写几个十几个一', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'l1tens40', n: { icon: '🍒', n: 43 }, title: { zh: '43 = 4 tens 3 ones', en: '43 = 40 + 3' } },
          questions: tensA.map(([icon, n], i) => { const t = Math.floor(n / 10), o = n % 10;
            return F(`l1-17-2-A${i + 1}`, frames(icon, n), `{{n}} = {{t}} tens {{o}} one${o === 1 ? '' : 's'}`, { n: { a: n }, t: { a: t }, o: { a: o } }, ['l1tens40', { icon, n }], `每堆 10 个，一共几个？几个十、几个一？`, 'tens and ones', { label: `${n} = ${t} tens ${o} ones`, hint: { zh: `数有几堆（每堆 10），再数散的。`, en: 'Count the groups of 10.' } }); }) },
        { id: 'B', type: 'fill', title: { zh: '点阵：几个十几个一', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'l1tens40', n: { n: 42 }, title: { zh: '42 = 40 + 2：Tens 4，Ones 2', en: '42 = 40 + 2' } },
          questions: triB.map((n, i) => { const t = Math.floor(n / 10), o = n % 10;
            return F(`l1-17-2-B${i + 1}`, pic(L.triRow(n)), `Tens: {{t}}　Ones: {{o}}\n{{n}} = {{a}} + {{b}}`, { t: { a: t }, o: { a: o }, n: { a: n }, a: { a: t * 10 }, b: { a: o } }, ['l1tens40', { n }], '每个三角形 10 个点。几个十、几个一？写成 几十 + 几', 'Tens and ones', { label: `${n} = ${t * 10} + ${o}`, hint: { zh: `${t} 个三角形是 ${t} tens，散的 ${o} 个是 ones。`, en: `${t} tens ${o} ones.` } }); }) },
        { id: 'C', type: 'fill', title: { zh: '几十和几合起来', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'l1make40', n: { a: 60, b: 4, miss: 'sum' }, title: { zh: '60 and 4 make 64', en: '60 and 4 make 64' } },
          questions: makeC.map(([a, b, miss], i) => { const sum = a + b; const text = miss === 'sum' ? `${a} and ${b} make {{x}}.` : miss === 'a' ? `{{x}} and ${b} make ${sum}.` : `${a} and {{x}} make ${sum}.`;
            return F(`l1-17-2-C${i + 1}`, '', text, { x: { a: miss === 'sum' ? sum : miss === 'a' ? a : b } }, ['l1make40', { a, b, miss }], miss === 'sum' ? `${a} 和 ${b} 合起来是几？` : miss === 'a' ? `几和 ${b} 合起来是 ${sum}？` : `${a} 和几合起来是 ${sum}？`, undefined, { label: `${a} and ${b} make ${sum}`, hint: { zh: '几十加几个一，十位不变。', en: 'Tens stay, add the ones.' } }); }) },
        { id: 'D', type: 'fill', title: { zh: '加法填空', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'l1make40', n: { a: 70, b: 2, miss: 'sum' }, title: { zh: '70 + 2 = 72', en: '70 + 2 = 72' } },
          questions: plusD.map(([a, b, miss], i) => { const sum = a + b; const text = miss === 'sum' ? `${a} + ${b} = {{x}}` : miss === 'a' ? `{{x}} + ${b} = ${sum}` : `${a} + {{x}} = ${sum}`;
            return F(`l1-17-2-D${i + 1}`, '', text, { x: { a: miss === 'sum' ? sum : miss === 'a' ? a : b } }, ['l1make40', { a, b, miss }], '填空', undefined, { label: `${a} + ${b} = ${sum}`, hint: { zh: `${sum} = ${a} + ${b}。`, en: `${sum} = ${a} + ${b}.` } }); }) },
      ],
    },
    {
      id: 'l1-17-3', available: true,
      title: { zh: '比较和排序（100 以内）', en: 'Compare and arrange numbers within 100' },
      intro: { zh: '比大小先看十位，十位一样再看个位。多几少几：大的减小的。', en: 'Compare tens first, then ones. How many more or less: subtract.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '两组比一比', en: 'Count the number of items for each set by making 10. Fill in each blank with the correct answer' },
          example: { kind: 'l1setcmp100', n: { ia: '🔮', na: 45, ib: '🔮', nb: 48 }, title: { zh: '48 is 3 more than 45；45 is 3 less than 48', en: '48 − 45 = 3' } },
          questions: setA.map(([icon, na, nb, first, third], i) => { const big = Math.max(na, nb), small = Math.min(na, nb), d = big - small, moreSet = na > nb ? 'A' : 'B', fewerSet = na > nb ? 'B' : 'A';
            const l1 = first === 'less' ? `{{c}} is {{d}} less than {{e}}.\n{{f}} is {{g}} more than {{h}}.` : `{{c}} is {{d}} more than {{e}}.\n{{f}} is {{g}} less than {{h}}.`;
            const l2 = third === 'fewer' ? `Set {{i}} has fewer.\nSet {{j}} has more.` : `Set {{i}} has more.\nSet {{j}} has fewer.`;
            const fields = { a: { a: na }, b: { a: nb }, c: { a: first === 'less' ? small : big }, d: { a: d }, e: { a: first === 'less' ? big : small }, f: { a: first === 'less' ? big : small }, g: { a: d }, h: { a: first === 'less' ? small : big }, i: choice(third === 'fewer' ? fewerSet : moreSet, ['A', 'B']), j: choice(third === 'fewer' ? moreSet : fewerSet, ['A', 'B']) };
            return F(`l1-17-3-A${i + 1}`, setPic(icon, na, icon, nb), `Set A: {{a}}　Set B: {{b}}\n${l1}\n${l2}`, fields, ['l1setcmp100', { ia: icon, na, ib: icon, nb }], '10 个一组数出两组各几个，再比多几少几', 'Count and compare', { label: `A ${na} / B ${nb}`, hint: { zh: `先数，再用大的减小的：${big} − ${small}。`, en: `${big} − ${small}.` } }); }) },
        { id: 'B', type: 'fill', title: { zh: '数字条上多几、少几', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'l1strip100', n: { nums: seq(50, 70, 2), n: 54, d: 2 }, title: { zh: '每格加 2：2 more than 54 is 56', en: '2 more than 54 is 56' } },
          questions: stripB.map(([nums, n, d, form], i) => { const ans = n + d, k = Math.abs(d), ml = d > 0 ? 'more' : 'less';
            return F(`l1-17-3-B${i + 1}`, strip(nums, [n]), form === 'a' ? `${k} ${ml} than ${n} is {{a}}.` : `{{a}} is ${k} ${ml} than ${n}.`, { a: { a: ans } }, ['l1strip100', { nums, n, d }], `比 ${n} ${d > 0 ? '多' : '少'} ${k} 是几？`, undefined, { label: `${k} ${ml} than ${n} = ${ans}`, hint: { zh: `数字条每格加 ${nums[1] - nums[0]}，从 ${n} 往${d > 0 ? '后' : '前'}跳 ${k / (nums[1] - nums[0])} 格。`, en: `${d > 0 ? 'Count on' : 'Count back'} ${k}.` } }); }) },
        { id: 'C', type: 'match', title: { zh: '上衣配短裤', en: 'Match the following shirts to the correct shorts' },
          example: { kind: 'l1back100', n: { a: 3, b: 96, form: 'less' }, title: { zh: '3 less than 99 是 96', en: '3 less than 99 is 96' } },
          questions: [{ id: 'l1-17-3-C1', type: 'match', label: '上衣（多几少几）连短裤（答案）', left: matchC.map(([t]) => ({ id: t, html: `👕 ${t}`, text: t })), right: [82, 96, 41, 68, 50, 67, 59, 74].map(n => ({ id: String(n), html: `🩳 ${n}`, text: String(n) })), pairs: Object.fromEntries(matchC.map(([t, n]) => [t, String(n)])), prompt: { zh: '每件上衣上是一句话，算出来连到对的短裤', en: 'Work out each shirt and match it to the shorts.' }, hint: { zh: 'more 就加，less 就减。', en: 'more: add; less: subtract.' }, explain: ['l1back100', { a: 10, b: 82, form: 'less' }] }] },
        { id: 'D', type: 'fill', title: { zh: '反过来想', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'l1back100', n: { a: 42, b: 47, form: 'how' }, title: { zh: '47 − 42 = 5：5 more than 42 is 47', en: '5 more than 42 is 47' } },
          questions: backD.map(([form, a, b], i) => { const ans = form === 'how' ? Math.abs(b - a) : (form === 'more' ? b - a : b + a); const text = form === 'how' ? `{{x}} ${b > a ? 'more' : 'less'} than ${a} is ${b}.` : `${a} ${form} than {{x}} is ${b}.`;
            return F(`l1-17-3-D${i + 1}`, '', text, { x: { a: ans } }, ['l1back100', { a, b, form }], form === 'how' ? `从 ${a} 到 ${b} 差几？` : `${a} ${form === 'more' ? '多' : '少'} 之后是 ${b}，原来是几？`, undefined, { label: text.replace('{{x}}', ans), hint: { zh: form === 'how' ? '大的减小的。' : `从 ${b} ${form === 'more' ? '减' : '加'} ${a}。`, en: form === 'how' ? 'Subtract.' : `${b} ${form === 'more' ? '−' : '+'} ${a}.` } }); }) },
        { id: 'E', type: 'pickone', title: { zh: '点大的数', en: 'Circle the greater number' },
          example: { kind: 'l1cmp40', n: { a: 41, b: 51, which: 'greater' }, title: { zh: '先比十位：51 大', en: '51 is greater' } },
          questions: greatE.map(([a, b], i) => ({ id: `l1-17-3-E${i + 1}`, type: 'pickone', pic: '', label: `${a} / ${b} 哪个大`, options: [numshape(a, 'plain'), numshape(b, 'plain')], answer: a > b ? 0 : 1, prompt: { zh: '哪个数大？点它', en: 'Which is greater?' }, hint: { zh: '先比十位，十位一样再比个位。', en: 'Tens first, then ones.' }, explain: ['l1cmp40', { a, b, which: 'greater' }] })) },
        { id: 'F', type: 'pickone', title: { zh: '点小的数', en: 'Colour the smaller number' },
          example: { kind: 'l1cmp40', n: { a: 60, b: 70, which: 'smaller' }, title: { zh: '60 只有 6 个十：60 小', en: '60 is smaller' } },
          questions: smallF.map(([a, b, cls], i) => ({ id: `l1-17-3-F${i + 1}`, type: 'pickone', pic: '', label: `${a} / ${b} 哪个小`, options: [numshape(a, cls), numshape(b, cls)], answer: a < b ? 0 : 1, prompt: { zh: '哪个数小？点它', en: 'Which is smaller?' }, hint: { zh: '先比十位。', en: 'Tens first.' }, explain: ['l1cmp40', { a, b, which: 'smaller' }] })) },
        { id: 'G', type: 'pickone', title: { zh: '点最大的', en: 'Circle the greatest number' },
          example: { kind: 'l1order40', n: { nums: [43, 52, 61], desc: true }, title: { zh: '61 最大', en: '61 is the greatest' } },
          questions: greatG.map((ns, i) => ({ id: `l1-17-3-G${i + 1}`, type: 'pickone', pic: '', label: `最大：${ns.join(', ')}`, options: ns.map(n => numshape(n, 'plain')), answer: ns.indexOf(Math.max(...ns)), prompt: { zh: '三个数里哪个最大？点它', en: 'Which is the greatest?' }, hint: { zh: '先比十位。', en: 'Tens first.' }, explain: ['l1order40', { nums: ns, desc: true }] })) },
        { id: 'H', type: 'pickone', title: { zh: '点最小的', en: 'Colour the smallest number' },
          example: { kind: 'l1order40', n: { nums: [62, 40, 84], desc: false }, title: { zh: '40 最小', en: '40 is the smallest' } },
          questions: smallH.map(([ns, cls], i) => ({ id: `l1-17-3-H${i + 1}`, type: 'pickone', pic: '', label: `最小：${ns.join(', ')}`, options: ns.map(n => numshape(n, cls)), answer: ns.indexOf(Math.min(...ns)), prompt: { zh: '三个数里哪个最小？点它', en: 'Which is the smallest?' }, hint: { zh: '先比十位。', en: 'Tens first.' }, explain: ['l1order40', { nums: ns, desc: false }] })) },
        { id: 'I', type: 'fill', title: { zh: '四个数填一填', en: 'Fill in the blanks with the correct numbers' },
          example: { kind: 'l1order40', n: { nums: [49, 63, 57, 74], desc: true }, title: { zh: '74 最大，49 最小', en: '74, 63, 57, 49' } },
          questions: setI.map(([nums, text, ans], i) => F(`l1-17-3-I${i + 1}`, pic(`<div class="numbox">${nums.map(n => `<span>${n}</span>`).join('')}</div>`), text, Object.fromEntries(Object.entries(ans).map(([k, v]) => [k, { a: v }])), ['l1order40', { nums, desc: true }], '看这四个数，回答问题', 'Answer the questions', { accept: [ans, Object.assign({}, ans, { c: ans.d, d: ans.c }), Object.assign({}, ans, { e: ans.f, f: ans.e }), Object.assign({}, ans, { c: ans.d, d: ans.c, e: ans.f, f: ans.e })], label: `${nums.join(', ')}`, hint: { zh: `从大到小：${nums.slice().sort((a, b) => b - a).join(', ')}。`, en: nums.slice().sort((a, b) => b - a).join(', ') } })) },
        { id: 'J', type: 'arrange', title: { zh: '排一排', en: 'Arrange the following numbers in order' },
          example: { kind: 'l1order40', n: { nums: [67, 44, 81], desc: true }, title: { zh: '从大到小：81, 67, 44', en: '81, 67, 44' } },
          questions: orderJ.map(([nums, order], i) => ({ id: `l1-17-3-J${i + 1}`, type: 'arrange', nums, order })) },
      ],
    },
    {
      id: 'l1-17-4', available: true,
      title: { zh: '数字规律（100 以内）', en: 'Complete number patterns' },
      intro: { zh: '看相邻两个数差几，每次加几或减几，接着填。', en: 'Find how much the numbers go up or down each time.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '越来越大', en: 'Complete the number patterns' },
          example: { kind: 'l1pat40', n: { seq: [57, 58, 59, 60, 61], blanks: [3, 4] }, title: { zh: '57, 58, 59, 60, 61：每次多 1', en: '1 more each time' } },
          questions: patA.map(([sq, blanks], i) => patQ(`l1-17-4-A${i + 1}`, sq, blanks)) },
        { id: 'B', type: 'fill', title: { zh: '越来越小', en: 'Complete the number patterns' },
          example: { kind: 'l1pat40', n: { seq: [52, 51, 50, 49, 48], blanks: [3, 4] }, title: { zh: '52, 51, 50, 49, 48：每次少 1', en: '1 less each time' } },
          questions: patB.map(([sq, blanks], i) => patQ(`l1-17-4-B${i + 1}`, sq, blanks)) },
      ],
    },
  ];
})();
