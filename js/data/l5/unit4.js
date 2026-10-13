/* Level 5 · Unit 4  整数、分数与带分数的乘法 */
(function () {
  const U = window.MATH_DATA.levels[5].units;
  const unit = num => U.find(u => u.num === num);
  const frac = window.L3.frac, mixed = window.L4FRAC.mixed, fin = window.L5MUL.fin;
  const pic = html => `<div class="center">${html}</div>`;
  const mx = a => ({ a, kind: 'mixed' });
  const F = (id, p, text, fields, explain, zh, en, o) => Object.assign({ id, type: 'fill', pic: p, label: text.replace(/\{\{\w+\}\}/g, '___').replace(/\n/g, ' '), prompt: { zh, en: en || 'Fill in the blanks' }, text, fields, answerText: Object.values(fields).map(f => f.a).join(', '), explain }, o || {});
  const big = h => pic(`<div style="font-size:30px;font-weight:800">${h} =</div>`);

  const fwA = [[1, 5, 60], [2, 3, 24], [4, 7, 42], [5, 9, 54], [10, 11, 33], [3, 2, 28], [5, 4, 16], [9, 5, 65], [13, 10, 70], [12, 11, 88]];
  const ffB = [[4, 9, 3, 8], [5, 12, 4, 7], [2, 5, 6, 10], [11, 12, 3, 9], [8, 9, 3, 4], [2, 5, 2, 3], [5, 6, 3, 10], [7, 10, 4, 21], [5, 7, 14, 25], [8, 15, 9, 20]];
  const piC = [[4, 7, 9, 5], [18, 4, 2, 9], [7, 3, 1, 8], [5, 6, 12, 5], [16, 9, 3, 8], [10, 11, 21, 6], [3, 8, 15, 2], [23, 5, 10, 12], [25, 9, 18, 35], [30, 63, 27, 10]];
  const iiD = [[13, 10, 20, 8], [10, 3, 21, 5], [9, 2, 13, 6], [10, 7, 21, 4], [24, 15, 30, 18], [49, 9, 30, 7], [15, 11, 35, 12], [33, 8, 41, 7], [17, 6, 19, 9], [41, 14, 21, 12]];
  const mwE = [[[2, 3, 5], 40, 0], [[6, 1, 8], 18, 0], [[3, 1, 3], 16, 1], [[4, 3, 4], 20, 1], [[5, 5, 9], 35, 0], [[8, 2, 7], 56, 0], [[5, 7, 11], 99, 1], [[4, 5, 6], 74, 1], [[8, 9, 10], 64, 0], [[5, 8, 15], 85, 1]];
  const ffQ = (pre, list, zh, en) => list.map(([a, b, c, d], i) => { const r = fin(a * c, b * d); return F(`${pre}${i + 1}`, big(`${frac(a, b, true)} × ${frac(c, d, true)}`), `${a}/${b} × ${c}/${d} = {{a}}`, { a: mx(r.txt) }, ['l5fracfrac', { a, b, c, d }], zh, en, { label: `= ${r.txt}`, hint: { zh: '分子乘分子，分母乘分母；先交叉约分更快。答案要最简，假分数写成带分数。', en: 'Cancel first, then multiply tops and bottoms.' } }); });

  unit(4).kps = [
    { id: 'l5-4-1', available: true, title: { zh: '分数乘整数', en: 'Find the product of fractions and whole numbers' }, intro: { zh: '分数乘整数：分子乘整数，分母不变；整数和分母能约分的先约。', en: 'Multiply the numerator by the whole number; cancel with the denominator first if you can.' },
      sections: [{ id: 'A', type: 'fill', title: { zh: '分数 × 整数', en: 'Multiply the fractions by the whole numbers' }, example: { kind: 'l5fracwhole', n: { n: 1, d: 4, k: 12 }, title: { zh: '¼ × 12：12 和 4 约分，1 × 3 = 3', en: '1/4 × 12 = 3' } }, questions: fwA.map(([n, d, k], i) => { const r = fin(n * k, d); return F(`l5-4-1-A${i + 1}`, big(`${frac(n, d, true)} × ${k}`), `${n}/${d} × ${k} = {{a}}`, { a: mx(r.txt) }, ['l5fracwhole', { n, d, k }], '分子乘整数，分母不变（先约分）', 'Multiply', { label: `= ${r.txt}`, hint: { zh: `${k} 和 ${d} 能不能约分？`, en: `Cancel ${k} with ${d}?` } }); }) }] },
    { id: 'l5-4-2', available: true, title: { zh: '真分数乘真分数', en: 'Find the product of proper fractions' }, intro: { zh: '分子乘分子，分母乘分母。交叉约分（上面的和对面下面的）更省事。', en: 'Tops × tops, bottoms × bottoms. Cancel diagonally first.' },
      sections: [{ id: 'A', type: 'fill', title: { zh: '真分数 × 真分数', en: 'Multiply these proper fractions. Express your answer in its simplest form' }, example: { kind: 'l5fracfrac', n: { a: 1, b: 2, c: 2, d: 3 }, title: { zh: '½ × ⅔：2 和 2 约分 → 1/3', en: '1/2 × 2/3 = 1/3' } }, questions: ffQ('l5-4-2-A', ffB, '分子乘分子，分母乘分母，答案最简', 'Multiply, simplest form') }] },
    { id: 'l5-4-3', available: true, title: { zh: '真分数乘假分数', en: 'Find the product of proper and improper fractions' }, intro: { zh: '方法一样：约分、相乘；结果大于 1 就写成带分数。', en: 'Same method; write the answer as a mixed number if it is more than 1.' },
      sections: [{ id: 'A', type: 'fill', title: { zh: '真分数 × 假分数', en: 'Multiply the proper fractions by the improper fractions' }, example: { kind: 'l5fracfrac', n: { a: 1, b: 3, c: 4, d: 3 }, title: { zh: '⅓ × 4/3 = 4/9', en: '1/3 × 4/3 = 4/9' } }, questions: ffQ('l5-4-3-A', piC, '约分再相乘，大于 1 写带分数', 'Multiply') }] },
    { id: 'l5-4-4', available: true, title: { zh: '假分数乘假分数', en: 'Find the product of improper fractions' }, intro: { zh: '先交叉约分再相乘，结果写成整数或带分数。', en: 'Cancel, multiply, then write as a whole or mixed number.' },
      sections: [{ id: 'A', type: 'fill', title: { zh: '假分数 × 假分数', en: 'Multiply these improper fractions' }, example: { kind: 'l5fracfrac', n: { a: 3, b: 2, c: 4, d: 3 }, title: { zh: '3/2 × 4/3：3 和 3、4 和 2 约分 → 2', en: '3/2 × 4/3 = 2' } }, questions: ffQ('l5-4-4-A', iiD, '约分再相乘，写成整数或带分数', 'Multiply') }] },
    { id: 'l5-4-5', available: true, title: { zh: '带分数乘整数', en: 'Find the product of mixed numbers and whole numbers' }, intro: { zh: '带分数先化成假分数，再和整数相乘（能约分先约），最后写成带分数。', en: 'Change the mixed number to an improper fraction first.' },
      sections: [{ id: 'A', type: 'fill', title: { zh: '带分数 × 整数', en: 'Multiply the mixed numbers by the whole numbers' }, example: { kind: 'l5mixwhole', n: { w: 1, n: 2, d: 3, k: 10 }, title: { zh: '1⅔ × 10 = 5/3 × 10 = 50/3 = 16⅔', en: '1 2/3 × 10 = 16 2/3' } }, questions: mwE.map(([[w, n, d], k, rev], i) => { const N = w * d + n, r = fin(N * k, d); const h = rev ? `${k} × ${mixed(w, n, d, true)}` : `${mixed(w, n, d, true)} × ${k}`; return F(`l5-4-5-A${i + 1}`, big(h), `${rev ? `${k} × ${w} ${n}/${d}` : `${w} ${n}/${d} × ${k}`} = {{a}}`, { a: mx(r.txt) }, ['l5mixwhole', { w, n, d, k }], '先化成假分数再乘', 'Multiply', { label: `= ${r.txt}`, hint: { zh: `${w} ${n}/${d} = ${N}/${d}。`, en: `${w} ${n}/${d} = ${N}/${d}.` } }); }) }] },
  ];
})();
