/* Level 3 · Unit 12  分数 */
(function () {
  const U = window.MATH_DATA.levels[3].units;
  const unit = num => U.find(u => u.num === num);
  const L = window.L3, frac = L.frac;
  const num = a => ({ a });
  const fr = (n, d) => ({ a: `${n}/${d}`, kind: 'frac' });
  const gcd = (a, b) => b ? gcd(b, a % b) : a;
  const F = (id, p, text, fields, explain, zh, en, o) => Object.assign({ id, type: 'fill', pic: p, label: text.replace(/\{\{\w+\}\}/g, '___').replace(/\n/g, ' '), prompt: { zh, en: en || 'Fill in the blanks' }, text, fields, answerText: Object.values(fields).map(f => f.a).join(', '), explain }, o || {});
  const equivs = (n, d) => { const g = gcd(n, d), n0 = n / g, d0 = d / g; const out = []; for (let k = 1; k <= 8; k++) if (d0 * k <= 120) out.push(`${n0 * k}/${d0 * k}`); return out; };
  const acceptFor = (key, n, d) => equivs(n, d).map(s => ({ [key]: s }));
  const perms3 = arr => [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]].map(p => ({ p: arr[p[0]], q: arr[p[1]], r: arr[p[2]] }));
  const two = (a, b) => `<div class="center fig-row">${a}${b}</div>`;

  const shadeA = [[1, 2, 'circle', 4], [3, 4, 'circle', 2], [4, 6, 'strips', 4], [2, 5, 'strips', 4], [5, 7, 'strips', 4]];
  const linesB = [[[2, 6, 8], [1, 3, 4]], [[3, 9, 15], [1, 3, 5]], [[3, 9, 15], [2, 6, 10]]];
  const makeC = [[4, 8, 5, 'd'], [3, 7, 4, 'n'], [1, 10, 8, 'd'], [5, 9, 7, 'd'], [3, 4, 4, 'd'], [7, 12, 3, 'n'], [2, 6, 6, 'n'], [6, 11, 7, 'd'], [3, 5, 6, 'n'], [8, 12, 4, 'n']];
  // [n, d, blanks: for k=2..5 which part is blank ('n'|'d')]
  const listD = [[1, 5, ['n', 'd', 'd', 'd']], [3, 8, ['n', 'n', 'd', 'd']], [2, 5, ['d', 'n', 'd', 'd']], [1, 4, ['d', 'n', 'd', 'd']], [1, 7, ['n', 'n', 'd', 'd']]];
  const simp = [[3, 9], [8, 16], [36, 45], [35, 42], [9, 63], [22, 33], [64, 72], [12, 18], [9, 24], [12, 36], [7, 28], [8, 20], [25, 35], [60, 96], [63, 81], [28, 44], [24, 32], [18, 30], [15, 27], [24, 108]];
  const cmpA = [[[4, 10], [5, 10], 'grid', { rows: 2, cols: 5 }, 'smaller'], [[4, 8], [5, 8], 'circle', null, 'smaller'], [[7, 12], [6, 12], 'grid', { rows: 4, cols: 3 }, 'greater'], [[3, 4], [2, 4], 'tri4', null, 'greater'], [[3, 5], [4, 5], 'pent5', null, 'smaller'], [[6, 9], [5, 9], 'grid', { rows: 3, cols: 3 }, 'greater']];
  const greatB = [[[2, 3], [6, 12]], [[3, 8], [2, 5]], [[4, 6], [2, 8]], [[2, 7], [1, 9]], [[3, 11], [1, 4]]];
  const smallC = [[[1, 6], [5, 6]], [[4, 9], [2, 9]], [[3, 6], [3, 9]], [[5, 8], [5, 11]], [[7, 12], [7, 9]]];
  const descD = [[[3, 9], [8, 9], [5, 9]], [[4, 6], [2, 8], [3, 4]], [[7, 12], [3, 4], [1, 6]], [[2, 5], [8, 9], [4, 15]], [[6, 7], [6, 12], [6, 9]]];
  const ascE = [[[2, 3], [2, 5], [2, 4]], [[3, 8], [4, 6], [1, 4]], [[6, 10], [3, 6], [1, 5]], [[12, 20], [18, 20], [11, 20]], [[4, 7], [5, 6], [2, 3]]];
  const addA = [[[1, 4], [1, 2]], [[5, 12], [1, 6]], [[2, 5], [3, 10]], [[3, 8], [1, 4]], [[1, 3], [7, 12]], [[8, 15], [2, 5]], [[1, 5], [7, 25]], [[1, 12], [1, 2]], [[2, 9], [1, 3]], [[5, 16], [1, 4]]];
  const subB = [[[4, 5], [7, 10]], [[7, 8], [3, 4]], [[5, 6], [5, 12]], [[4, 9], [1, 3]], [[5, 8], [1, 2]], [[14, 15], [2, 3]], [[13, 18], [1, 3]], [[2, 3], [1, 2]], [[3, 4], [2, 3]], [[5, 6], [3, 5]]];
  // [terms, ops, start(1?), text]
  const mixC = [[[[1, 9], [1, 3], [4, 9]], ['+', '+'], 0, 'Find the sum of 1/9, 1/3 and 4/9.'], [[[1, 4], [3, 8], [1, 8]], ['+', '+'], 0, 'Find the sum of 1/4, 3/8 and 1/8.'], [[[7, 12], [1, 6]], ['-', '-'], 1, 'Find 1 − 7/12 − 1/6.'], [[[1, 3], [5, 9]], ['-', '-'], 1, 'Find 1 − 1/3 − 5/9.'], [[[3, 10], [1, 2], [1, 10]], ['+', '+'], 0, 'What is 3/10 + 1/2 + 1/10?'], [[[2, 6], [1, 3], [1, 6]], ['+', '+'], 0, 'What is 2/6 + 1/3 + 1/6?'], [[[3, 8], [1, 2]], ['-', '-'], 1, 'What is 1 − 3/8 − 1/2?'], [[[3, 5], [1, 10]], ['-', '-'], 1, 'What is 1 − 3/5 − 1/10?']];
  const calc = (terms, ops, start) => { const lcm = (a, b) => a / gcd(a, b) * b; const all = (start ? [[1, 1]] : []).concat(terms); const Lc = all.reduce((m, f) => lcm(m, f[1]), 1); const signs = ['+'].concat(ops); let acc = 0; all.forEach((f, i) => { const v = f[0] * Lc / f[1]; acc = i === 0 ? v : (signs[i] === '-' ? acc - v : acc + v); }); return [acc, Lc]; };
  const opQ = (id, terms, ops, start, text, zh) => { const [n, d] = calc(terms, ops, start); const g = gcd(n, d); return F(id, '', `${text} {{a}}`, { a: fr(n / g, d / g) }, ['l3addsub', { terms, ops, start }], zh, text, { accept: acceptFor('a', n, d), label: `${text} ${n / g}/${d / g}`, hint: { zh: '分母不同，先通分成同分母，再算分子。', en: 'Make the denominators the same first.' } }); };
  const fracHTML = f => frac(f[0], f[1], true);

  unit(12).kps = [
    {
      id: 'l3-12-1', available: true,
      title: { zh: '等值分数', en: 'Recognise and understand equivalent fractions' },
      intro: { zh: '涂色部分一样大的分数叫等值分数。分子分母同时乘（或除以）同一个数，分数大小不变。', en: 'Equivalent fractions show the same amount. Multiply or divide the top and bottom by the same number.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '看图写等值分数', en: 'Write the equivalent fraction' },
          example: { kind: 'l3equivfig', n: { n: 1, d: 3, kind: 'strips', k: 2 }, title: { zh: '1/3 = 2/6：每份再分成 2 份', en: '1/3 = 2/6' } },
          questions: shadeA.map(([n, d, kind, k], i) => F(`l3-12-1-A${i + 1}`, two(L.fig(kind, d, n), L.fig(kind, d * k, 0)), `${frac(n, d, true)} = {{a}}`, { a: fr(n * k, d * k) }, ['l3equivfig', { n, d, kind, k }], `第二个图分成了 ${d * k} 份，涂同样大的部分要涂几份？`, 'Write the equivalent fraction', { label: `${n}/${d} = ${n * k}/${d * k}`, hint: { zh: `每一份变成了 ${k} 小份，涂 ${n} × ${k} 份。`, en: `Each part becomes ${k} parts.` } })) },
        { id: 'B', type: 'fill', title: { zh: '数轴上找等值分数', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'l3equivline', n: { ds: [2, 4, 8], ns: [1, 2, 4] }, title: { zh: '1/2、2/4、4/8 在同一位置', en: '1/2 = 2/4 = 4/8' } },
          questions: linesB.map(([ds, ns], i) => F(`l3-12-1-B${i + 1}`, L.flines(ds), `{{p}}, {{q}} and {{r}} are equivalent fractions.`, { p: fr(ns[0], ds[0]), q: fr(ns[1], ds[1]), r: fr(ns[2], ds[2]) }, ['l3equivline', { ds, ns }], i === 2 ? '找另一组上下对齐的三个分数（不是 1/3 那组）' : '找上下对齐的三个分数', 'Which fractions line up?', { accept: perms3(ns.map((n, j) => `${n}/${ds[j]}`)), label: ns.map((n, j) => `${n}/${ds[j]}`).join(' = '), hint: { zh: '看哪些刻度在同一条竖线上。', en: 'Look for marks that line up.' } })) },
        { id: 'C', type: 'fill', title: { zh: '填数使分数相等', en: 'Fill in each box with the correct answer to make the fraction equivalent' },
          example: { kind: 'l3equivmul', n: { n: 2, d: 3, k: 3, miss: 'n' }, title: { zh: '2/3 = 6/9：分子分母都乘 3', en: '2/3 = 6/9' } },
          questions: makeC.map(([n, d, k, miss], i) => F(`l3-12-1-C${i + 1}`, '', `${frac(n, d, true)} = ${miss === 'n' ? `${frac('{{x}}', d * k, true)}` : `${frac(n * k, '{{x}}', true)}`}`, { x: num(miss === 'n' ? n * k : d * k) }, ['l3equivmul', { n, d, k, miss }], '分子分母要乘同一个数，空格填几？', 'Make the fraction equivalent', { label: `${n}/${d} = ${n * k}/${d * k}`, hint: { zh: `${miss === 'n' ? `${d} × 几 = ${d * k}？分子也乘它。` : `${n} × 几 = ${n * k}？分母也乘它。`}`, en: `Multiply both by ${k}.` } })) },
        { id: 'D', type: 'fill', title: { zh: '列出等值分数', en: 'List down all the equivalent fractions' },
          example: { kind: 'l3equivlist', n: { n: 1, d: 3 }, title: { zh: '1/3 = 2/6 = 3/9 = 4/12 = 5/15', en: 'Equivalent fractions of 1/3' } },
          questions: listD.map(([n, d, blanks], i) => { const fields = {}; const parts = blanks.map((b, j) => { const k = j + 2, key = 'k' + k; fields[key] = num(b === 'n' ? n * k : d * k); return b === 'n' ? frac(`{{${key}}}`, d * k, true) : frac(n * k, `{{${key}}}`, true); }); return F(`l3-12-1-D${i + 1}`, '', `${frac(n, d, true)} = ${parts.join(' = ')}`, fields, ['l3equivlist', { n, d }], `${n}/${d} 的等值分数：分子分母依次乘 2、3、4、5`, 'List the equivalent fractions', { label: `${n}/${d} 的等值分数`, hint: { zh: '每个分数的分子分母都是原来的几倍，看给出的那个数是原来的几倍。', en: 'Multiply top and bottom by the same number.' } }); }) },
      ],
    },
    {
      id: 'l3-12-2', available: true,
      title: { zh: '最简分数', en: 'Express a fraction in its simplest form' },
      intro: { zh: '分子分母同时除以它们的最大公因数，除到不能再除，就是最简分数。', en: 'Divide the top and bottom by the greatest number that divides both.' },
      sections: [{ id: 'A', type: 'fill', title: { zh: '化成最简分数', en: 'Express each fraction in its simplest form' },
        example: { kind: 'l3simplest', n: { n: 7, d: 21 }, title: { zh: '7/21 = 1/3：都除以 7', en: '7/21 = 1/3' } },
        questions: simp.map(([n, d], i) => { const g = gcd(n, d); return F(`l3-12-2-A${i + 1}`, '', `${frac(n, d, true)} = {{a}}`, { a: fr(n / g, d / g) }, ['l3simplest', { n, d }], `${n}/${d} 的最简分数是什么？`, 'Simplest form', { label: `${n}/${d} = ${n / g}/${d / g}`, hint: { zh: `${n} 和 ${d} 都能被 ${g} 整除。`, en: `Divide both by ${g}.` } }); }) }],
    },
    {
      id: 'l3-12-3', available: true,
      title: { zh: '比较和排序', en: 'Compare and arrange fractions' },
      intro: { zh: '分母相同比分子，分子大的大；分子相同比分母，分母大的反而小；都不同就先通分成同分母再比。', en: 'Same denominator: compare numerators. Same numerator: bigger denominator means smaller. Otherwise make the denominators the same.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '看图比较', en: 'Fill in each blank with the correct fraction' },
          example: { kind: 'l3cmpfig', n: { a: [2, 6], b: [3, 6], kind: 'circle', want: 'greater' }, title: { zh: '3/6 is greater than 2/6', en: '3/6 > 2/6' } },
          questions: cmpA.map(([a, b, kind, opts, w], i) => F(`l3-12-3-A${i + 1}`, two(L.fig(kind, a[1], a[0], opts || {}), L.fig(kind, b[1], b[0], opts || {})), `{{p}} is ${w} than {{q}}.`, { p: fr(a[0], a[1]), q: fr(b[0], b[1]) }, ['l3cmpfig', { a, b, kind, opts, want: w }], `左图是几分之几？右图呢？哪个${w === 'greater' ? '大' : '小'}？`, `Which is ${w}?`, { label: `${a[0]}/${a[1]} is ${w} than ${b[0]}/${b[1]}`, hint: { zh: '数每个图一共几份、涂了几份。分母一样比分子。', en: 'Count the parts.' } })) },
        { id: 'B', type: 'pickone', title: { zh: '点大的分数', en: 'Compare these fractions. Circle the greater fraction' },
          example: { kind: 'l3cmp', n: { a: [2, 3], b: [6, 12], want: 'greater' }, title: { zh: '2/3 = 8/12 > 6/12', en: '2/3 is greater' } },
          questions: greatB.map(([a, b], i) => ({ id: `l3-12-3-B${i + 1}`, type: 'pickone', pic: '', label: `${a[0]}/${a[1]} / ${b[0]}/${b[1]} 哪个大`, options: [fracHTML(a), fracHTML(b)], answer: a[0] / a[1] > b[0] / b[1] ? 0 : 1, prompt: { zh: '哪个分数大？点它', en: 'Which is greater?' }, hint: { zh: '先通分成同分母再比分子。', en: 'Make the denominators the same.' }, explain: ['l3cmp', { a, b, want: 'greater' }] })) },
        { id: 'C', type: 'pickone', title: { zh: '点小的分数', en: 'Compare these fractions. Circle the smaller fraction' },
          example: { kind: 'l3cmp', n: { a: [3, 6], b: [3, 9], want: 'smaller' }, title: { zh: '3/6 = 9/18，3/9 = 6/18，3/9 小', en: '3/9 is smaller' } },
          questions: smallC.map(([a, b], i) => ({ id: `l3-12-3-C${i + 1}`, type: 'pickone', pic: '', label: `${a[0]}/${a[1]} / ${b[0]}/${b[1]} 哪个小`, options: [fracHTML(a), fracHTML(b)], answer: a[0] / a[1] < b[0] / b[1] ? 0 : 1, prompt: { zh: '哪个分数小？点它', en: 'Which is smaller?' }, hint: { zh: '分子一样时分母大的小；否则通分。', en: 'Same numerator: bigger denominator is smaller.' }, explain: ['l3cmp', { a, b, want: 'smaller' }] })) },
        { id: 'D', type: 'arrangef', title: { zh: '从大到小排', en: 'Arrange the fractions in order. Begin with the greatest' },
          example: { kind: 'l3arrange', n: { list: [[1, 2], [3, 4], [1, 8]], desc: true }, title: { zh: '通分成 8：6/8 > 4/8 > 1/8', en: '3/4, 1/2, 1/8' } },
          questions: descD.map((list, i) => ({ id: `l3-12-3-D${i + 1}`, type: 'arrangef', list, desc: true, explain: ['l3arrange', { list, desc: true }] })) },
        { id: 'E', type: 'arrangef', title: { zh: '从小到大排', en: 'Arrange the fractions in order. Begin with the smallest' },
          example: { kind: 'l3arrange', n: { list: [[2, 3], [2, 5], [2, 4]], desc: false }, title: { zh: '分子一样，分母大的小：2/5 < 2/4 < 2/3', en: '2/5, 2/4, 2/3' } },
          questions: ascE.map((list, i) => ({ id: `l3-12-3-E${i + 1}`, type: 'arrangef', list, desc: false, explain: ['l3arrange', { list, desc: false }] })) },
      ],
    },
    {
      id: 'l3-12-4', available: true,
      title: { zh: '分数加减', en: 'Add and subtract fractions' },
      intro: { zh: '分母不同的分数相加减，先通分成同分母（找公倍数），再把分子加减，最后化简。1 可以写成 几/几。', en: 'Make the denominators the same, then add or subtract the numerators. Simplify the answer.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '加法', en: 'Add these fractions' },
          example: { kind: 'l3addsub', n: { terms: [[2, 3], [1, 9]], ops: ['+'] }, title: { zh: '2/3 + 1/9 = 6/9 + 1/9 = 7/9', en: '2/3 + 1/9 = 7/9' } },
          questions: addA.map(([a, b], i) => opQ(`l3-12-4-A${i + 1}`, [a, b], ['+'], 0, `${frac(a[0], a[1], true)} + ${frac(b[0], b[1], true)} =`, '分母不同，先通分再加')) },
        { id: 'B', type: 'fill', title: { zh: '减法', en: 'Subtract these fractions' },
          example: { kind: 'l3addsub', n: { terms: [[1, 2], [1, 5]], ops: ['-'] }, title: { zh: '1/2 − 1/5 = 5/10 − 2/10 = 3/10', en: '1/2 − 1/5 = 3/10' } },
          questions: subB.map(([a, b], i) => opQ(`l3-12-4-B${i + 1}`, [a, b], ['-'], 0, `${frac(a[0], a[1], true)} − ${frac(b[0], b[1], true)} =`, '分母不同，先通分再减')) },
        { id: 'C', type: 'fill', title: { zh: '三个数的加减', en: 'Do these sums. Write the correct answers on the lines provided' },
          example: { kind: 'l3addsub', n: { terms: [[1, 4], [1, 2]], ops: ['-', '-'], start: 1 }, title: { zh: '1 − 1/4 − 1/2 = 4/4 − 1/4 − 2/4 = 1/4', en: '1 − 1/4 − 1/2 = 1/4' } },
          questions: mixC.map(([terms, ops, start, text], i) => opQ(`l3-12-4-C${i + 1}`, terms, ops, start, text.replace(/(\d+)\/(\d+)/g, (_, n, d) => frac(n, d, true)).replace(/\?$/, '').replace(/\.$/, '') + (text.includes('?') ? '' : ''), start ? '1 写成 几/几，再通分一起算' : '三个分数通分成同分母再加')) },
      ],
    },
  ];
})();
