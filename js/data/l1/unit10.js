/* Level 1 · Unit 10  40 以内的数 */
(function () {
  const U = window.MATH_DATA.levels[1].units;
  const unit = num => U.find(u => u.num === num);
  const L = window.L1, shp = L.shp, W = L.word40;
  const pic = html => `<div class="center">${html}</div>`;
  const img = (name, w) => L.img('l1u10/' + name, w || 400);
  const choice = (a, options) => ({ a, kind: 'choice', options });
  const F = (id, p, text, fields, explain, zh, en, o) => Object.assign({ id, type: 'fill', pic: p, label: text.replace(/\{\{\w+\}\}/g, '___').replace(/\n/g, ' '), prompt: { zh, en: en || 'Fill in the blanks' }, text, fields, answerText: Object.values(fields).map(f => f.a).join(', '), explain }, o || {});
  const seq = (a, b) => { const r = []; for (let i = a; i <= b; i++) r.push(i); return r; };
  const loose = (icon, n) => pic(`<div class="bond-groups wrapg">${seq(1, Math.floor(n / 10)).map(() => L.row(icon, 10, { cls: 'tight' })).join('<span class="bond-plus">＋</span>')}${n % 10 ? '<span class="bond-plus">＋</span>' + L.row(icon, n % 10, { cls: 'tight' }) : ''}</div>`);
  const wordOpts = n => { const base = [n]; const pool = [n - 1, n + 1, n - 10, n + 10, n - 2].filter(x => x >= 10 && x <= 40 && !base.includes(x)); while (base.length < 4) base.push(pool.shift()); return base.sort((a, b) => a - b).map(W); };

  /* ---- KP1 数一数 ---- */
  const countA = [['🧹', 24, [10, 20, 21, 22, 23, 24], [10]], ['🍩', 32, [10, 20, 30, 31, 32], [10, 20]], ['🐦', 29, [10, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29], [10]], ['🍄', 34, [10, 20, 30, 31, 32, 33, 34], [10, 20]], ['🔪', 39, [10, 20, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39], [10, 20]], ['🐦', 27, [10, 20, 21, 22, 23, 24, 25, 26, 27], [10]], ['📚', 23, [10, 20, 21, 22, 23], [10]], ['🍊', 36, [10, 20, 30, 31, 32, 33, 34, 35, 36], [10, 20]]];
  const countB = [['🍭', 35], ['🐜', 30], ['🐱', 22], ['📎', 31], ['✏️', 20], ['🧶', 33], ['🐌', 28], ['🧦', 40]];
  const triC = [20, 32, 31, 27, 38, 22, 35, 40, 29, 36];
  const wordsD = [20, 15, 39, 27, 11, 40, 35, 21, 30, 34];
  const numsE = [14, 24, 30, 19, 26, 18, 32, 13, 22, 38];
  /* ---- KP2 ---- */
  const tensA = [['t1', 21], ['t2', 39], ['t3', 40], ['t4', 26], ['t5', 33], ['t6', 37], ['t7', 24], ['t8', 32]];
  const triB = [25, 29, 40, 36, 33, 27, 20, 39, 22, 35];
  const makeC = [[30, 7, 'sum'], [20, 1, 'sum'], [20, 10, 'sum'], [20, 8, 'sum'], [30, 2, 'a'], [30, 4, 'a'], [20, 6, 'a'], [30, 8, 'b'], [20, 3, 'b'], [30, 10, 'b']];
  const plusD = [[30, 8, 'sum'], [20, 4, 'sum'], [30, 1, 'sum'], [20, 0, 'sum'], [30, 9, 'a'], [30, 3, 'a'], [20, 2, 'a'], [20, 5, 'b'], [20, 7, 'b'], [30, 6, 'b']];
  /* ---- KP3 ---- */
  const setA = [['🎾', 14, '🎾', 8], ['🍆', 7, '🍆', 12], ['🔩', 6, '🔩', 17], ['🖍️', 15, '🖍️', 9], ['🐤', 5, '🐤', 11]];
  const setB = [['🪃', 14, '🪃', 9, 'catapults'], ['🍦', 16, '🍦', 8, 'ice cream cones'], ['🫖', 7, '🫖', 13, 'kettles'], ['🦉', 15, '🦉', 6, 'owls'], ['🍭', 5, '🍭', 12, 'lollipops']];
  /* ---- KP4 ---- */
  const mlA = [[20, 2, 'a'], [39, -1, 'a'], [29, 3, 'a'], [31, -3, 'a'], [34, 1, 'a'], [27, -2, 'a'], [37, 3, 'b'], [24, -1, 'b'], [28, 2, 'b'], [36, -3, 'b'], [26, 1, 'b'], [38, -2, 'b']];
  const matchB = [['3 less than 23', 20], ['2 more than 32', 34], ['1 less than 28', 27], ['3 more than 30', 33], ['2 less than 25', 23], ['1 more than 39', 40]];
  const backC = [['how', 30, 28], ['how', 36, 37], ['how', 29, 26], ['more', 2, 25], ['less', 1, 34], ['more', 3, 31]];
  const greatD = [[28, 33], [30, 25], [32, 27], [21, 23], [30, 34], [35, 33]];
  const smallE = [[31, 29, 'tri'], [34, 24, 'sq'], [38, 40, 'circ'], [22, 28, 'trid'], [29, 26, 'dia'], [36, 37, 'oval']];
  const greatF = [[27, 30, 24], [34, 28, 31], [32, 29, 35], [28, 25, 22], [33, 39, 36], [36, 35, 37]];
  const smallG = [[[27, 31, 29], 'tri'], [[32, 38, 26], 'sq'], [[30, 20, 40], 'circ'], [[27, 21, 24], 'trid'], [[25, 27, 23], 'dia'], [[34, 38, 36], 'oval']];
  const setH = [
    [[35, 22, 28, 32], '(a) The greatest number is {{a}}.\n(b) The smallest number is {{b}}.\n(c) {{c}} is greater than 32.\n(d) {{d}} is smaller than 28.\n(e) 32 is greater than {{e}} and {{f}} but smaller than {{g}}.', { a: 35, b: 22, c: 35, d: 22, e: 22, f: 28, g: 35 }, [{ e: 22, f: 28 }, { e: 28, f: 22 }]],
    [[24, 39, 40, 27], '(a) The smallest number is {{a}}.\n(b) The greatest number is {{b}}.\n(c) 1 less than 40 is {{c}}.\n(d) 3 more than 24 is {{d}}.\n(e) {{e}} and {{f}} are smaller than 40 but greater than 24.', { a: 24, b: 40, c: 39, d: 27, e: 39, f: 27 }, [{ e: 39, f: 27 }, { e: 27, f: 39 }]],
    [[29, 36, 31, 35], '(a) The greatest number is {{a}}.\n(b) The smallest number is {{b}}.\n(c) {{c}} is 2 more than 29.\n(d) {{d}} is 1 less than 36.\n(e) {{e}} is smaller than 35 but greater than 29.', { a: 36, b: 29, c: 31, d: 35, e: 31 }, null],
    [[30, 23, 32, 20], '(a) The smallest number is {{a}}.\n(b) The greatest number is {{b}}.\n(c) {{c}} is 3 more than 20.\n(d) {{d}} is 2 less than 32.\n(e) {{e}} is greater than 23 but smaller than 32.', { a: 20, b: 32, c: 23, d: 30, e: 30 }, null],
  ];
  const orderI = [[[25, 35, 30], 'desc'], [[28, 22, 34, 40], 'desc'], [[27, 39, 21, 33], 'desc'], [[38, 20, 29], 'asc'], [[31, 35, 27, 23], 'asc'], [[36, 24, 28, 32], 'asc']];
  /* ---- KP5 ---- */
  const patA = [[[28, 29, 30, 31, 32], [2, 4]], [[32, 34, 36, 38, 40], [3, 4]], [[22, 23, 24, 25, 26], [0, 3]], [[15, 18, 21, 24, 27], [2, 3]], [[31, 33, 35, 37, 39], [0, 1]]];
  const patB = [[[32, 30, 28, 26, 24], [1, 3]], [[40, 39, 38, 37, 36], [2, 3]], [[26, 23, 20, 17, 14], [0, 2]], [[31, 30, 29, 28, 27], [0, 1]], [[27, 25, 23, 21, 19], [1, 3]]];

  const numshape = (n, cls) => `<span class="numshape ${cls}">${n}</span>`;
  const setPic = (ia, na, ib, nb) => pic(`<div class="setbox2"><div class="setbox"><b>Set A</b>${L.row(ia, na, { cls: 'tight' })}</div><div class="setbox"><b>Set B</b>${L.row(ib, nb, { cls: 'tight' })}</div></div>`);
  const strip = (circle) => pic(L.strip40({ circle }));
  const patPic = (sq, blanks) => pic(`<div class="nstrip">${sq.map((n, i) => `<span class="ns ${blanks.includes(i) ? 'blankn' : ''}">${blanks.includes(i) ? '?' : n}</span>`).join('')}</div>`);
  const patQ = (id, sq, blanks, kind) => { const keys = 'abcde'.split(''); const fields = {}; const text = sq.map((n, k) => blanks.includes(k) ? (fields[keys[k]] = { a: n }, `{{${keys[k]}}}`) : String(n)).join(', ');
    return F(id, patPic(sq, blanks), text, fields, ['l1pat40', { seq: sq, blanks }], '找规律，填空格', 'Complete the pattern', { label: sq.map((n, k) => blanks.includes(k) ? '__' : n).join(', '), hint: { zh: '看给出的数每次差几。', en: 'Find the difference.' } }); };

  unit(10).kps = [
    {
      id: 'l1-10-1', available: true,
      title: { zh: '数一数：20 到 40', en: 'Count numbers from 20 to 40' },
      intro: { zh: '东西多的时候 10 个一组圈起来：10、20、30，再接着一个一个数。', en: 'Circle groups of 10: 10, 20, 30, then count on by ones.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '十个十个数，再一个一个数', en: 'Count in tens and ones. Write the correct numbers on the lines provided' },
          example: { kind: 'l1count40', n: { icon: '🥜', n: 21 }, title: { zh: '10, 20, 21', en: '10, 20, 21' } },
          questions: countA.map(([icon, n, chain, given], i) => { const keys = 'abcdefghijkl'.split(''); const fields = {}; const text = chain.map((x, k) => given.includes(x) ? String(x) : (fields[keys[k]] = { a: x }, `{{${keys[k]}}}`)).join(', ');
            return F(`l1-10-1-A${i + 1}`, loose(icon, n), text, fields, ['l1count40', { icon, n }], '先十个十个数，剩下的一个一个数', 'Count in tens and ones', { label: `${icon} × ${n}`, hint: { zh: `每一组 10 个：10、20${n >= 30 ? '、30' : ''}，然后接着数。`, en: 'Count 10, 20, ... then count on.' } }); }) },
        { id: 'B', type: 'fill', title: { zh: '圈 10 个一组，数一数', en: 'Circle in groups of 10. Count and write the correct numbers on the lines provided' },
          example: { kind: 'l1count40', n: { icon: '🌸', n: 26 }, title: { zh: '两组 10 再加 6：26', en: '10, 20, then 21 to 26' } },
          questions: countB.map(([icon, n], i) => F(`l1-10-1-B${i + 1}`, loose(icon, n), '{{a}}', { a: { a: n } }, ['l1count40', { icon, n }], '10 个一组数，一共几个？', 'Count', { label: `${icon} × ${n}`, hint: { zh: `有 ${Math.floor(n / 10)} 组 10，再加 ${n % 10} 个。`, en: `${Math.floor(n / 10)} tens and ${n % 10}.` } })) },
        { id: 'C', type: 'fill', title: { zh: '数三角形里的点', en: 'Count the dots and write the correct numbers on the lines provided' },
          example: { kind: 'l1tri40', n: { n: 23 }, title: { zh: '两个三角形 20 个点，加 3 个：23', en: '10, 20, then 21, 22, 23' } },
          questions: triC.map((n, i) => F(`l1-10-1-C${i + 1}`, pic(L.triRow(n)), '{{a}}', { a: { a: n } }, ['l1tri40', { n }], '每个三角形是 10 个点，一共几个点？', 'Count the dots', { label: `点阵 ${n}`, hint: { zh: `${Math.floor(n / 10)} 个三角形是 ${Math.floor(n / 10) * 10}，再加散的 ${n % 10} 个。`, en: `${Math.floor(n / 10)} triangles = ${Math.floor(n / 10) * 10}.` } })) },
        { id: 'D', type: 'fill', title: { zh: '写英文', en: 'Write the following numbers in words' },
          example: { kind: 'l1word40', n: { n: 28 }, title: { zh: '28 = twenty-eight', en: 'twenty-eight' } },
          questions: wordsD.map((n, i) => F(`l1-10-1-D${i + 1}`, '', `${n} = {{w}}`, { w: choice(W(n), wordOpts(n)) }, ['l1word40', { n }], `${n} 的英文是什么？`, 'Write in words', { label: `${n} = ${W(n)}`, hint: { zh: '20 twenty，30 thirty，40 forty；二十几就是 twenty- 再加个位。', en: 'twenty, thirty, forty.' } })) },
        { id: 'E', type: 'fill', title: { zh: '英文写成数字', en: 'Write the correct numbers on the lines provided' },
          example: { kind: 'l1word40', n: { n: 33 }, title: { zh: 'thirty-three = 33', en: 'thirty-three = 33' } },
          questions: numsE.map((n, i) => F(`l1-10-1-E${i + 1}`, '', `${W(n)} = {{n}}`, { n: { a: n } }, ['l1word40', { n }], `${W(n)} 是几？`, 'Write in numerals', { label: `${W(n)} = ${n}`, hint: { zh: 'twenty 是 20，thirty 是 30，后面的是个位。', en: 'twenty = 20, thirty = 30.' } })) },
      ],
    },
    {
      id: 'l1-10-2', available: true,
      title: { zh: '几个十、几个一（20 到 40）', en: 'Use tens and ones to show numbers from 20 to 40' },
      intro: { zh: '每 10 个是 1 ten。35 = 3 tens 5 ones = 30 + 5。', en: '35 = 3 tens 5 ones = 30 + 5.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '看图写几个十几个一', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'l1tens40', n: { pic: 'l1u10/tex', n: 35 }, title: { zh: '35 = 3 tens 5 ones', en: '35 = 30 + 5' } },
          questions: tensA.map(([p, n], i) => { const t = Math.floor(n / 10), o = n % 10;
            return F(`l1-10-2-A${i + 1}`, pic(img(p, 420)), `${n} = {{t}} tens {{o}} one${o === 1 ? '' : 's'}`, { t: { a: t }, o: { a: o } }, ['l1tens40', { pic: 'l1u10/' + p, n }], `每堆 10 个，${n} 是几个十、几个一？`, 'tens and ones', { label: `${n} = ${t} tens ${o} ones`, hint: { zh: `数有几堆（每堆 10），再数散的。`, en: 'Count the groups of 10.' } }); }) },
        { id: 'B', type: 'fill', title: { zh: '点阵：几个十几个一', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'l1tens40', n: { n: 31 }, title: { zh: '31 = 30 + 1：Tens 3，Ones 1', en: '31 = 30 + 1' } },
          questions: triB.map((n, i) => { const t = Math.floor(n / 10), o = n % 10;
            return F(`l1-10-2-B${i + 1}`, pic(L.triRow(n)), `Tens: {{t}}　Ones: {{o}}\n{{n}} = {{a}} + {{b}}`, { t: { a: t }, o: { a: o }, n: { a: n }, a: { a: t * 10 }, b: { a: o } }, ['l1tens40', { n }], '每个三角形 10 个点。几个十、几个一？写成 几十 + 几', 'Tens and ones', { label: `${n} = ${t * 10} + ${o}`, hint: { zh: `${t} 个三角形是 ${t} tens，散的 ${o} 个是 ones。`, en: `${t} tens ${o} ones.` } }); }) },
        { id: 'C', type: 'fill', title: { zh: '几十和几合起来', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'l1make40', n: { a: 20, b: 5, miss: 'sum' }, title: { zh: '20 and 5 make 25', en: '20 and 5 make 25' } },
          questions: makeC.map(([a, b, miss], i) => { const sum = a + b; const text = miss === 'sum' ? `${a} and ${b} make {{x}}.` : miss === 'a' ? `{{x}} and ${b} make ${sum}.` : `${a} and {{x}} make ${sum}.`;
            return F(`l1-10-2-C${i + 1}`, '', text, { x: { a: miss === 'sum' ? sum : miss === 'a' ? a : b } }, ['l1make40', { a, b, miss }], miss === 'sum' ? `${a} 和 ${b} 合起来是几？` : miss === 'a' ? `几和 ${b} 合起来是 ${sum}？` : `${a} 和几合起来是 ${sum}？`, undefined, { label: `${a} and ${b} make ${sum}`, hint: { zh: '几十加几个一，十位不变。', en: 'Tens stay, add the ones.' } }); }) },
        { id: 'D', type: 'fill', title: { zh: '加法填空', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'l1make40', n: { a: 30, b: 4, miss: 'sum' }, title: { zh: '30 + 4 = 34', en: '30 + 4 = 34' } },
          questions: plusD.map(([a, b, miss], i) => { const sum = a + b; const text = miss === 'sum' ? `${a} + ${b} = {{x}}` : miss === 'a' ? `{{x}} + ${b} = ${sum}` : `${a} + {{x}} = ${sum}`;
            return F(`l1-10-2-D${i + 1}`, '', text, { x: { a: miss === 'sum' ? sum : miss === 'a' ? a : b } }, ['l1make40', { a, b, miss }], '填空', undefined, { label: `${a} + ${b} = ${sum}`, hint: { zh: `${sum} = ${a} + ${b}。`, en: `${sum} = ${a} + ${b}.` } }); }) },
      ],
    },
    {
      id: 'l1-10-3', available: true,
      title: { zh: '比较两组：多几少几', en: 'Compare sets and numbers by subtraction' },
      intro: { zh: '数出两组各几个，大的数 greater，小的数 smaller；多几少几用减法：大 − 小。', en: 'Count both sets. Greater and smaller. How many more: subtract.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '哪组多', en: 'Count the number of items for each set. Fill in each blank with the correct answer' },
          example: { kind: 'l1setcmp', n: { ia: '🐝', na: 11, ib: '🐝', nb: 9, mode: 'cmp' }, title: { zh: '11 is greater than 9；9 is smaller than 11', en: '11 > 9' } },
          questions: setA.map(([ia, na, ib, nb], i) => { const big = Math.max(na, nb), small = Math.min(na, nb);
            return F(`l1-10-3-A${i + 1}`, setPic(ia, na, ib, nb), `Set A: {{a}}　Set B: {{b}}\n{{c}} is greater than {{d}}.\n{{e}} is smaller than {{f}}.`, { a: { a: na }, b: { a: nb }, c: { a: big }, d: { a: small }, e: { a: small }, f: { a: big } }, ['l1setcmp', { ia, na, ib, nb, mode: 'cmp' }], '数两组各几个，哪个大哪个小', 'Count and compare', { label: `A ${na} / B ${nb}`, hint: { zh: '先数再比。', en: 'Count first.' } }); }) },
        { id: 'B', type: 'fill', title: { zh: '多几个、少几个', en: 'Count the number of items for each set. Fill in each blank with the correct answer' },
          example: { kind: 'l1setcmp', n: { ia: '🐝', na: 12, ib: '🐝', nb: 8, mode: 'diff' }, title: { zh: '12 − 8 = 4：A 多 4，B 少 4', en: '12 − 8 = 4' } },
          questions: setB.map(([ia, na, ib, nb, noun], i) => { const big = Math.max(na, nb), small = Math.min(na, nb), d = big - small;
            return F(`l1-10-3-B${i + 1}`, setPic(ia, na, ib, nb), `Set A: {{a}}　Set B: {{b}}\n{{c}} − {{d}} = {{e}}\nSet A has {{f}} ${noun} than Set B.\nSet B has {{g}} ${noun} than Set A.`, { a: { a: na }, b: { a: nb }, c: { a: big }, d: { a: small }, e: { a: d }, f: choice(na > nb ? `${d} more` : `${d} fewer`, [`${d} more`, `${d} fewer`]), g: choice(na > nb ? `${d} fewer` : `${d} more`, [`${d} more`, `${d} fewer`]) }, ['l1setcmp', { ia, na, ib, nb, mode: 'diff' }], '数两组，用减法算多几个', 'Subtract to compare', { label: `A ${na} / B ${nb}：差 ${d}`, hint: { zh: `大的减小的：${big} − ${small}。`, en: `${big} − ${small}.` } }); }) },
      ],
    },
    {
      id: 'l1-10-4', available: true,
      title: { zh: '比较和排序（40 以内）', en: 'Compare and arrange numbers within 40' },
      intro: { zh: '多几少几在数字条上跳。比大小先看十位，十位一样再看个位。', en: 'More/less: hop on the number strip. Compare tens first, then ones.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '多几、少几', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'l1strip40', n: { n: 25, d: 1 }, title: { zh: '1 more than 25 is 26；2 less than 40 is 38', en: '1 more than 25 is 26' } },
          questions: mlA.map(([n, d, form], i) => { const ans = n + d, k = Math.abs(d), ml = d > 0 ? 'more' : 'less';
            return F(`l1-10-4-A${i + 1}`, strip([n]), form === 'a' ? `${k} ${ml} than ${n} is {{a}}.` : `{{a}} is ${k} ${ml} than ${n}.`, { a: { a: ans } }, ['l1strip40', { n, d }], `比 ${n} ${d > 0 ? '多' : '少'} ${k} 是几？`, undefined, { label: `${k} ${ml} than ${n} = ${ans}`, hint: { zh: `从 ${n} 往${d > 0 ? '后' : '前'}跳 ${k} 格。`, en: `${d > 0 ? 'Count on' : 'Count back'} ${k}.` } }); }) },
        { id: 'B', type: 'match', title: { zh: '箭射靶子', en: 'Match the following arrows to the correct targets' },
          example: { kind: 'l1strip40', n: { n: 23, d: -3 }, title: { zh: '3 less than 23 是 20', en: '3 less than 23 is 20' } },
          questions: [{ id: 'l1-10-4-B1', type: 'match', label: '箭（多几少几）连靶子（答案）', left: matchB.map(([t]) => ({ id: t, html: `🏹 ${t}`, text: t })), right: [34, 40, 23, 20, 33, 27].map(n => ({ id: String(n), html: `🎯 ${n}`, text: String(n) })), pairs: Object.fromEntries(matchB.map(([t, n]) => [t, String(n)])), prompt: { zh: '每支箭上是一句话，算出来连到对的靶子', en: 'Work out each arrow and match it to the target.' }, hint: { zh: 'more 往后数，less 往前数。', en: 'more: count on; less: count back.' }, explain: ['l1strip40', { n: 32, d: 2 }] }] },
        { id: 'C', type: 'fill', title: { zh: '反过来想', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'l1stripback', n: { a: 30, b: 28, form: 'how' }, title: { zh: '从 30 到 28 退了 2：2 less than 30 is 28', en: '2 less than 30 is 28' } },
          questions: backC.map(([form, a, b], i) => { const ans = form === 'how' ? Math.abs(b - a) : (form === 'more' ? b - a : b + a); const text = form === 'how' ? `{{x}} ${b > a ? 'more' : 'less'} than ${a} is ${b}.` : `${a} ${form} than {{x}} is ${b}.`;
            return F(`l1-10-4-C${i + 1}`, strip(form === 'how' ? [a, b] : [b]), text, { x: { a: ans } }, ['l1stripback', { a, b, form }], form === 'how' ? `从 ${a} 到 ${b} 跳了几格？` : `${a} ${form === 'more' ? '多' : '少'} 之后是 ${b}，原来是几？`, undefined, { label: text.replace('{{x}}', ans), hint: { zh: form === 'how' ? '在数字条上数两个数之间跳了几格。' : `从 ${b} 往${form === 'more' ? '回' : '后'}退 ${a} 格。`, en: 'Use the strip.' } }); }) },
        { id: 'D', type: 'pickone', title: { zh: '点大的数', en: 'Circle the greater number' },
          example: { kind: 'l1cmp40', n: { a: 28, b: 33, which: 'greater' }, title: { zh: '先比十位：33 大', en: '33 is greater' } },
          questions: greatD.map(([a, b], i) => ({ id: `l1-10-4-D${i + 1}`, type: 'pickone', pic: '', label: `${a} / ${b} 哪个大`, options: [numshape(a, 'plain'), numshape(b, 'plain')], answer: a > b ? 0 : 1, prompt: { zh: '哪个数大？点它', en: 'Which is greater?' }, hint: { zh: '先比十位，十位一样再比个位。', en: 'Tens first, then ones.' }, explain: ['l1cmp40', { a, b, which: 'greater' }] })) },
        { id: 'E', type: 'pickone', title: { zh: '点小的数', en: 'Colour the smaller number' },
          example: { kind: 'l1cmp40', n: { a: 31, b: 29, which: 'smaller' }, title: { zh: '29 只有 2 个十：29 小', en: '29 is smaller' } },
          questions: smallE.map(([a, b, cls], i) => ({ id: `l1-10-4-E${i + 1}`, type: 'pickone', pic: '', label: `${a} / ${b} 哪个小`, options: [numshape(a, cls), numshape(b, cls)], answer: a < b ? 0 : 1, prompt: { zh: '哪个数小？点它', en: 'Which is smaller?' }, hint: { zh: '先比十位。', en: 'Tens first.' }, explain: ['l1cmp40', { a, b, which: 'smaller' }] })) },
        { id: 'F', type: 'pickone', title: { zh: '点最大的', en: 'Circle the greatest number' },
          example: { kind: 'l1order40', n: { nums: [27, 30, 24], desc: true }, title: { zh: '30 最大', en: '30 is the greatest' } },
          questions: greatF.map((ns, i) => ({ id: `l1-10-4-F${i + 1}`, type: 'pickone', pic: '', label: `最大：${ns.join(', ')}`, options: ns.map(n => numshape(n, 'plain')), answer: ns.indexOf(Math.max(...ns)), prompt: { zh: '三个数里哪个最大？点它', en: 'Which is the greatest?' }, hint: { zh: '先比十位。', en: 'Tens first.' }, explain: ['l1order40', { nums: ns, desc: true }] })) },
        { id: 'G', type: 'pickone', title: { zh: '点最小的', en: 'Colour the smallest number' },
          example: { kind: 'l1order40', n: { nums: [27, 31, 29], desc: false }, title: { zh: '27 最小', en: '27 is the smallest' } },
          questions: smallG.map(([ns, cls], i) => ({ id: `l1-10-4-G${i + 1}`, type: 'pickone', pic: '', label: `最小：${ns.join(', ')}`, options: ns.map(n => numshape(n, cls)), answer: ns.indexOf(Math.min(...ns)), prompt: { zh: '三个数里哪个最小？点它', en: 'Which is the smallest?' }, hint: { zh: '先比十位。', en: 'Tens first.' }, explain: ['l1order40', { nums: ns, desc: false }] })) },
        { id: 'H', type: 'fill', title: { zh: '四个数填一填', en: 'Fill in the blanks with the correct numbers' },
          example: { kind: 'l1order40', n: { nums: [35, 22, 28, 32], desc: true }, title: { zh: '35 最大，22 最小', en: '35, 32, 28, 22' } },
          questions: setH.map(([nums, text, ans, accept], i) => F(`l1-10-4-H${i + 1}`, pic(`<div class="numbox">${nums.map(n => `<span>${n}</span>`).join('')}</div>`), text, Object.fromEntries(Object.entries(ans).map(([k, v]) => [k, { a: v }])), ['l1order40', { nums, desc: true }], '看这四个数，回答问题', 'Answer the questions', { accept: accept ? accept.map(alt => Object.assign({}, ans, alt)) : undefined, label: `${nums.join(', ')}`, hint: { zh: `从大到小：${nums.slice().sort((a, b) => b - a).join(', ')}。`, en: nums.slice().sort((a, b) => b - a).join(', ') } })) },
        { id: 'I', type: 'arrange', title: { zh: '排一排', en: 'Arrange the following numbers in order' },
          example: { kind: 'l1order40', n: { nums: [25, 35, 30], desc: true }, title: { zh: '从大到小：35, 30, 25', en: '35, 30, 25' } },
          questions: orderI.map(([nums, order], i) => ({ id: `l1-10-4-I${i + 1}`, type: 'arrange', nums, order })) },
      ],
    },
    {
      id: 'l1-10-5', available: true,
      title: { zh: '数字规律（40 以内）', en: 'Complete number patterns' },
      intro: { zh: '看相邻两个数差几，每次加几或减几，接着填。', en: 'Find how much the numbers go up or down each time.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '越来越大', en: 'Complete the number patterns' },
          example: { kind: 'l1pat40', n: { seq: [17, 18, 19, 20, 21], blanks: [3, 4] }, title: { zh: '17, 18, 19, 20, 21：每次多 1', en: '1 more each time' } },
          questions: patA.map(([sq, blanks], i) => patQ(`l1-10-5-A${i + 1}`, sq, blanks)) },
        { id: 'B', type: 'fill', title: { zh: '越来越小', en: 'Complete the number patterns' },
          example: { kind: 'l1pat40', n: { seq: [37, 36, 35, 34, 33], blanks: [3, 4] }, title: { zh: '37, 36, 35, 34, 33：每次少 1', en: '1 less each time' } },
          questions: patB.map(([sq, blanks], i) => patQ(`l1-10-5-B${i + 1}`, sq, blanks)) },
      ],
    },
  ];
})();
