/* Level 5 · Unit 3  分数和带分数 */
(function () {
  const U = window.MATH_DATA.levels[5].units;
  const unit = num => U.find(u => u.num === num);
  const frac = window.L3.frac, mixed = window.L4FRAC.mixed, FR = window.L4FRAC;
  const pic = html => `<div class="center">${html}</div>`;
  const num = a => ({ a });
  const mx = a => ({ a, kind: 'mixed' });
  const dec = a => ({ a: String(a), kind: 'dec' });
  const F = (id, p, text, fields, explain, zh, en, o) => Object.assign({ id, type: 'fill', pic: p, label: text.replace(/\{\{\w+\}\}/g, '___').replace(/\n/g, ' '), prompt: { zh, en: en || 'Fill in the blanks' }, text, fields, answerText: Object.values(fields).map(f => f.a).join(', '), explain }, o || {});
  const gcd = (a, b) => b ? gcd(b, a % b) : a;
  const show = (w, n, d) => w ? mixed(w, n, d, true) : frac(n, d, true);

  const divA = [[4, 14], [5, 75], [9, 39], [12, 64], [13, 117], [12, 8], [29, 5], [36, 7], [42, 4], [82, 6]];
  const fracB = [[0, 3, 10], [0, 6, 7], [0, 8, 9], [0, 11, 12], [0, 15, 101], [2, 4, 5], [4, 5, 6], [7, 7, 8], [10, 1, 10], [11, 11, 13]];
  const decC = [[0, 5, 20], [0, 6, 25], [0, 4, 7], [6, 2, 9], [7, 3, 13], [0, 3, 8], [0, 9, 11], [13, 1, 3], [5, 5, 14], [2, 11, 12]];
  const addA = [[[2, 7, 8], [1, 1, 3]], [[4, 4, 9], [1, 3, 4]], [[10, 2, 5], [3, 2, 7]], [[2, 1, 2], [3, 2, 3]], [[4, 1, 4], [6, 1, 6]], [[3, 1, 6], [5, 5, 9]], [[3, 2, 3], [4, 4, 5]], [[9, 6, 7], [2, 1, 4]], [[7, 7, 8], [8, 4, 5]], [[6, 3, 5], [6, 7, 12]]];
  const subB = [[[5, 3, 5], [1, 3, 10]], [[4, 9, 10], [2, 2, 3]], [[12, 5, 8], [4, 3, 4]], [[3, 1, 2], [1, 1, 6]], [[8, 3, 4], [5, 5, 6]], [[6, 3, 11], [3, 1, 2]], [[2, 4, 5], [1, 3, 4]], [[4, 1, 7], [3, 1, 3]], [[10, 2, 5], [6, 3, 7]], [[9, 4, 5], [2, 8, 9]]];
  const AS = (id, a, b, op) => { const ans = FR.addsubAns([a, b], [op]); return F(id, pic(`<div style="font-size:30px;font-weight:800">${mixed(...a, true)} ${op === '-' ? '−' : '+'} ${mixed(...b, true)} =</div>`), `${a[0]} ${a[1]}/${a[2]} ${op === '-' ? '−' : '+'} ${b[0]} ${b[1]}/${b[2]} = {{a}}`, { a: mx(ans) }, ['l4addsub', { terms: [a, b], ops: [op] }], '先化成假分数再通分，答案写最简带分数', 'Express the answer in its simplest form', { label: `= ${ans}`, hint: { zh: '带分数先化成假分数，再通分。', en: 'Change to improper fractions, then use a common denominator.' } }); };

  unit(3).kps = [
    { id: 'l5-3-1', available: true, title: { zh: '分数与除法', en: 'Make a connection between fractions and division' },
      intro: { zh: '除法就是分数：a ÷ b = a/b。分子比分母大就写成带分数；分数也可以反过来写成除法算式。', en: 'a ÷ b = a/b. A fraction is the numerator divided by the denominator.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '除法写成分数', en: 'Find the value. Express your answer as a fraction in its simplest form or as a mixed number' }, example: { kind: 'l5div2frac', n: { a: 10, b: 4 }, title: { zh: '10 ÷ 4 = 10/4 = 5/2 = 2½', en: '10 ÷ 4 = 2 1/2' } }, questions: divA.map(([a, b], i) => { const g = gcd(a, b), n = a / g, d = b / g, w = Math.floor(n / d), r = n % d; const ans = n > d ? `${w} ${r}/${d}` : `${n}/${d}`; return F(`l5-3-1-A${i + 1}`, '', `${a} ÷ ${b} = {{a}}`, { a: mx(ans) }, ['l5div2frac', { a, b }], '写成最简分数或带分数', 'As a fraction or mixed number', { label: `${a} ÷ ${b} = ${ans}`, hint: { zh: `${a}/${b}，再约分${n > d ? '、化成带分数' : ''}。`, en: `${a}/${b}, then simplify.` } }); }) },
        { id: 'B', type: 'fill', title: { zh: '分数写成除法', en: 'Express each fraction or mixed number as a division sentence' }, example: { kind: 'l5frac2div', n: { w: 1, n: 2, d: 3 }, title: { zh: '1⅔ = 5/3 = 5 ÷ 3', en: '1 2/3 = 5 ÷ 3' } }, questions: fracB.map(([w, n, d], i) => { const N = w * d + n; return F(`l5-3-1-B${i + 1}`, pic(`<div style="font-size:30px">${show(w, n, d)} =</div>`), `${w ? w + ' ' : ''}${n}/${d} = {{a}} ÷ {{b}}`, { a: num(N), b: num(d) }, ['l5frac2div', { w, n, d }], '写成"几 ÷ 几"', 'Write as a division sentence', { label: `= ${N} ÷ ${d}`, hint: { zh: w ? '先化成假分数，分子 ÷ 分母。' : '分子 ÷ 分母。', en: 'Numerator ÷ denominator.' } }); }) },
      ] },
    { id: 'l5-3-2', available: true, title: { zh: '分数化小数', en: 'Convert fractions to decimals' },
      intro: { zh: '分母能变成 10 或 100 的直接变；不能的用分子 ÷ 分母，除到第 3 位小数再四舍五入到 2 位。带分数的整数部分不动。', en: 'Change the denominator to 10 or 100, or divide and round to 2 decimal places.' },
      sections: [{ id: 'A', type: 'fill', title: { zh: '化成小数（保留 2 位）', en: 'Convert the fractions to decimals. Round off to 2 decimal places' }, example: { kind: 'l5frac2dec', n: { w: 0, n: 2, d: 3 }, title: { zh: '2 ÷ 3 = 0.666… ≈ 0.67', en: '2/3 ≈ 0.67' } }, questions: decC.map(([w, n, d], i) => { const exact = [10, 100].find(x => x % d === 0); const ans = exact ? (w + n / d).toFixed(exact === 10 ? 1 : 2) : (w + +window.L4DEC.roundStr((n / d).toFixed(4), 2)).toFixed(2); return F(`l5-3-2-A${i + 1}`, pic(`<div style="font-size:30px">${show(w, n, d)} ${exact ? '=' : '≈'}</div>`), `${w ? w + ' ' : ''}${n}/${d} ${exact ? '=' : '≈'} {{a}}`, { a: dec(ans) }, ['l5frac2dec', { w, n, d }], exact ? '分母变成 10 或 100' : '分子 ÷ 分母，保留 2 位小数', 'Convert to a decimal', { label: `= ${ans}`, hint: { zh: exact ? `分母乘几变成 ${exact}？` : `${n} ÷ ${d}，除到第 3 位再四舍五入。`, en: exact ? `Denominator → ${exact}.` : `${n} ÷ ${d}, round to 2 d.p.` } }); }) }] },
    { id: 'l5-3-3', available: true, title: { zh: '带分数加减', en: 'Add and subtract mixed numbers' },
      intro: { zh: '带分数加减：分数部分通分，整数和整数加减；分数部分超过 1 要进位，不够减要向整数借 1。也可以先全部化成假分数。', en: 'Use a common denominator; regroup when the fraction part is more than 1 or not enough to subtract.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '加法', en: 'Add the mixed numbers. Express your answer in its simplest form' }, example: { kind: 'l4addsub', n: { terms: [[1, 2, 3], [2, 3, 4]], ops: ['+'] }, title: { zh: '1⅔ + 2¾ = 20/12 + 33/12 = 53/12 = 4 5/12', en: '1 2/3 + 2 3/4 = 4 5/12' } }, questions: addA.map(([a, b], i) => AS(`l5-3-3-A${i + 1}`, a, b, '+')) },
        { id: 'B', type: 'fill', title: { zh: '减法', en: 'Subtract the mixed numbers. Express your answer in its simplest form' }, example: { kind: 'l4addsub', n: { terms: [[2, 3, 4], [1, 2, 3]], ops: ['-'] }, title: { zh: '2¾ − 1⅔ = 33/12 − 20/12 = 13/12 = 1 1/12', en: '2 3/4 − 1 2/3 = 1 1/12' } }, questions: subB.map(([a, b], i) => AS(`l5-3-3-B${i + 1}`, a, b, '-')) },
      ] },
  ];
})();
