/* Unit 14 分数 */
(function () {
  const U = window.MATH_DATA.units;
  const unit = num => U.find(u => u.num === num);
  const F = window.FracUI;
  const fig = (kind, d, n, opts) => F.figSVG(kind, d, n, Object.assign({ w: 150 }, opts || {}));
  const fr = (n, d) => `${n}/${d}`;

  // A：平均分 ✓/✗（用书上的图）
  const eqAns = ['✓', '✗', '✓', '✗', '✗', '✓', '✗', '✓', '✓', '✗'];
  // B：涂色部分是几分之几（书上的图）+ 讲解用的等价画法
  const shB = [[3, 8, 'circle', 8], [2, 6, 'tri3', 6], [7, 12, 'grid', 12, { rows: 2, cols: 6 }], [4, 7, 'strips', 7], [6, 10, 'circle', 10], [2, 3, 'tri3', 3], [5, 9, 'grid', 9, { rows: 3, cols: 3 }], [4, 5, 'hstrips', 5], [8, 11, 'circle', 11], [3, 4, 'sq4', 4]];
  // C：涂色
  const shC = [[4, 9, 'grid', { rows: 3, cols: 3 }], [5, 11, 'strips'], [6, 8, 'circle'], [5, 6, 'grid', { rows: 3, cols: 2 }], [3, 10, 'rowdiag', { cells: 5 }], [1, 4, 'tri4'], [5, 7, 'circle'], [3, 5, 'hstrips'], [8, 12, 'rect12'], [3, 3, 'tri3']];
  // D：没涂色（书上的图）
  const nsD = [[2, 5, 'pent5'], [1, 3, 'circle'], [2, 6, 'grid', { rows: 3, cols: 2 }], [4, 7, 'circle'], [1, 2, 'strips'], [5, 8, 'sq8'], [2, 5, 'grid', { rows: 1, cols: 5 }], [6, 9, 'tri4'], [3, 4, 'sq4'], [4, 10, 'grid', { rows: 2, cols: 5 }]];
  // E：n out of d
  const eE = [[2, 4], [4, 6], [4, 8], [2, 5], [6, 7], [2, 3], [1, 4], [4, 9], [5, 6], [7, 10]];
  const fracField = (n, d) => ({ a: fr(n, d), kind: 'frac' });

  // parts & whole A
  const pwA = [['A loaf of bread is cut into 5 equal parts. Jason eats 3 such parts.', '一条面包平均切成 5 份，Jason 吃了 3 份。', 5, 3, 'bread', 'Jason', 'strips'], ['A pizza is cut into 6 equal parts. Rosita eats 3 such parts.', '一个披萨平均切成 6 份，Rosita 吃了 3 份。', 6, 3, 'pizza', 'Rosita', 'circle'], ['Hazel cuts a piece of cardboard into 9 equal parts. She uses 7 such parts for colouring.', 'Hazel 把一张纸板平均剪成 9 份，用了 7 份涂色。', 9, 7, 'cardboard', 'Hazel', 'grid'], ['Chef Daniels cuts a piece of dough into 7 equal parts. He uses 3 such parts for baking.', 'Daniels 厨师把一块面团平均分成 7 份，用了 3 份烘焙。', 7, 3, 'dough', 'Chef Daniels', 'strips'], ['Aunt Susie cuts a ribbon into 10 equal parts. She uses 4 such parts for decorating presents.', 'Susie 阿姨把一条丝带平均剪成 10 份，用了 4 份装饰礼物。', 10, 4, 'ribbon', 'Aunt Susie', 'strips']];
  const pwB = [[null, [1, 2]], [[3, 7], null], [null, [4, 11]], [null, [9, 12]], [[2, 5], null], [[6, 8], null], [[3, 9], null], [null, [1, 4]], [null, [1, 6]], [[5, 10], null]];

  // compare
  const cmpA = [[[1, 2], [1, 4], 'hstrips', 'grid'], [[3, 8], [3, 6], 'circle', 'circle'], [[5, 7], [5, 9], 'strips', 'strips'], [[2, 6], [2, 3], 'tri4', 'tri3'], [[4, 4], [4, 8], 'grid', 'sq8']];
  const cmpB = [[[2, 6], [2, 4], 'hstrips', 'hstrips'], [[1, 3], [1, 5], 'circle', 'circle'], [[6, 10], [6, 12], 'strips', 'strips'], [[3, 5], [3, 4], 'circle', 'sq4'], [[4, 5], [4, 10], 'strips', 'rowdiag']];
  const figOpts = (kind, d) => kind === 'grid' ? { rows: d <= 4 ? 2 : 3, cols: d <= 4 ? d / 2 : d / 3 } : kind === 'rowdiag' ? { cells: d / 2 } : {};
  const cmpQ = (id, a, b, ka, kb, want) => {
    const better = want === 'greater' ? (a[0] / a[1] > b[0] / b[1] ? a : b) : (a[0] / a[1] < b[0] / b[1] ? a : b);
    return { id, type: 'fill', pic: `<div class="fig-row"><div class="fig-item">${fig(ka, a[1], a[0], figOpts(ka, a[1]))}<div>${F.frac(a[0], a[1], true)}</div></div><div class="fig-item">${fig(kb, b[1], b[0], figOpts(kb, b[1]))}<div>${F.frac(b[0], b[1], true)}</div></div></div>`,
      label: `${fr(a[0], a[1])} 和 ${fr(b[0], b[1])} 哪个${want === 'greater' ? '大' : '小'}`, prompt: { zh: `哪个分数${want === 'greater' ? '大' : '小'}？`, en: `Which fraction is ${want}?` },
      text: `The ${want} fraction is {{c}}.`, fields: { c: { a: fr(better[0], better[1]), kind: 'choice', options: [fr(a[0], a[1]), fr(b[0], b[1])] } }, answerText: fr(better[0], better[1]),
      explain: ['cmpfrac', { list: [a, b], want }], hint: { zh: '看图里涂色的部分哪个多。分母一样比分子，分子一样比分母（分母大的反而小）。', en: 'Look at which shaded part is bigger.' } };
  };
  const cmpText = (id, list, want, superl) => {
    const val = f => f[0] / f[1];
    const best = list.reduce((b, f) => (want === 'greater' ? val(f) > val(b) : val(f) < val(b)) ? f : b, list[0]);
    return { id, type: 'fill', pic: `<div class="fig-row">${list.map(f => `<div class="fig-item">${F.frac(f[0], f[1], true)}</div>`).join('<span style="font-size:28px;color:#bbb">|</span>')}</div>`,
      label: `${list.map(f => fr(f[0], f[1])).join(', ')} 哪个${want === 'greater' ? '大' : '小'}`, prompt: { zh: `哪个分数最${want === 'greater' ? '大' : '小'}？`, en: `Circle the ${superl} fraction` },
      text: `The ${superl} fraction is {{c}}.`, fields: { c: { a: fr(best[0], best[1]), kind: 'choice', options: list.map(f => fr(f[0], f[1])) } }, answerText: fr(best[0], best[1]),
      explain: ['cmpfrac', { list, want }], hint: { zh: '分母一样：分子大的大。分子一样：分母大的每份小，所以分数小。', en: 'Same bottom: bigger top is greater. Same top: bigger bottom is smaller.' } };
  };
  // C/D 涂色再选
  const shadePick = (id, items, kind, want) => {
    const val = f => f[0] / f[1];
    const bestIdx = items.reduce((b, f, i) => (want === 'greater' ? val(f) > val(items[b]) : val(f) < val(items[b])) ? i : b, 0);
    return { id, type: 'shade', label: `涂 ${items.map(f => fr(f[0], f[1])).join('、')} 再选最${want === 'greater' ? '大' : '小'}`,
      prompt: { zh: `先把每个分数涂出来，再选出最${want === 'greater' ? '大' : '小'}的`, en: `Colour the parts to show the fractions, then circle the ${want === 'greater' ? 'greatest' : 'smallest'}` },
      figs: items.map((f, i) => ({ kind: Array.isArray(kind) ? kind[i] : kind, d: f[1], n: f[0], opts: figOpts(Array.isArray(kind) ? kind[i] : kind, f[1]), label: `<div>${F.frac(f[0], f[1], true)}</div>` })),
      pick: { zh: `涂好后，点最${want === 'greater' ? '大' : '小'}的那个分数下面的按钮`, btn: want === 'greater' ? '这个最大' : '这个最小', answer: bestIdx, answerText: `最${want === 'greater' ? '大' : '小'}是 ${fr(items[bestIdx][0], items[bestIdx][1])}` },
      explain: ['cmpfrac', { list: items, want }], hint: { zh: '每个图先涂对份数；涂完看哪个涂色最多（或最少）。', en: 'Shade each, then compare the shaded parts.' } };
  };

  // arrange
  const arrA = [[[1, 6], [5, 6], [3, 6]], [[2, 8], [2, 3], [2, 9]], [[4, 11], [4, 12], [4, 10]], [[2, 5], [4, 5], [1, 5], [3, 5]], [[3, 7], [3, 3], [3, 9], [3, 5]], [[6, 8], [6, 10], [6, 9], [6, 7]]];
  const arrB = [[[3, 4], [2, 4], [1, 4]], [[4, 7], [2, 7], [6, 7]], [[5, 10], [5, 9], [5, 12]], [[7, 8], [3, 8], [1, 8], [5, 8]], [[1, 4], [1, 2], [1, 3], [1, 1]], [[7, 9], [7, 11], [7, 12], [7, 10]]];

  // add / subtract
  const addQ = (id, d, parts) => { const t = parts.reduce((s, x) => s + x, 0); return { id, type: 'fill', text: `${parts.map(p => `${p}/${d}`).join(' + ')} = {{r}}`, fields: { r: fracField(t, d) }, accept: t === d ? [{ r: fr(t, d) }, { r: '1/1' }] : undefined, answerText: fr(t, d), prompt: { zh: '加一加（分母相同，分子相加）', en: 'Add these fractions' }, explain: ['addfrac', { d, parts }], hint: { zh: `分母都是 ${d}，不变；分子加起来：${parts.join(' + ')}。`, en: `Keep the bottom number ${d}; add the top numbers.` } }; };
  const subQ = (id, d, start, parts) => { const r = parts.reduce((s, x) => s - x, start); const st = start === d ? '1' : `${start}/${d}`; return { id, type: 'fill', text: `${st}${parts.map(p => ` − ${p}/${d}`).join('')} = {{r}}`, fields: { r: fracField(r, d) }, accept: r === 0 ? [{ r: fr(0, d) }, { r: '0/0' }, { r: '0/1' }] : undefined, answerText: fr(r, d), prompt: { zh: '减一减（分母相同，分子相减）', en: 'Subtract these fractions' }, explain: ['subfrac', { d, start, parts }], hint: { zh: start === d ? `1 就是 ${d}/${d}。分母不变，分子相减。` : `分母都是 ${d}，不变；分子相减：${start} − ${parts.join(' − ')}。`, en: `Keep the bottom number; subtract the top numbers.` } }; };

  unit(14).kps = [
    {
      id: 'u14-1', available: true,
      title: { zh: '认识分数：平均分与几分之几', en: 'Understand that fractions are equal parts' },
      intro: { zh: '把一个图形平均分成几份，每份一样大。涂了几份就是几分之几：下面写一共几份（分母），上面写涂了几份（分子）。', en: 'Equal parts are the same size. Bottom number: total parts. Top number: shaded parts.' },
      sections: [
        { id: 'A', type: 'gridq', title: { zh: '是平均分的打 ✓', en: 'Put a tick in the box if the shape is divided into equal parts' },
          example: { kind: 'equalparts', n: {}, title: { zh: '什么是平均分', en: 'Equal parts' } },
          questions: [0, 1].map(r => ({ id: `u14-1-A${r + 1}`, type: 'gridq', cols: 5, label: `平均分 第 ${r + 1} 组`, prompt: { zh: '每个图形是平均分吗？是打 ✓，不是打 ✗', en: 'Equal parts? ✓ or ✗' },
            items: Array.from({ length: 5 }, (_, j) => ({ pic: F.img(`u14/eq${r * 5 + j + 1}`, 110), field: { a: eqAns[r * 5 + j], kind: 'choice', options: ['✓', '✗'] } })),
            hint: { zh: '每一份都一样大吗？有大有小就不是平均分。', en: 'Are all the parts the same size?' }, explain: ['equalparts', {}] })) },
        { id: 'B', type: 'fill', title: { zh: '涂色的部分是几分之几？', en: 'What fraction of each figure is shaded?' },
          example: { kind: 'fracshaded', n: { kind: 'strips', d: 4, n: 1 }, title: { zh: '4 份里涂了 1 份：1/4', en: '1 out of 4: 1/4' } },
          questions: shB.map(([n, d, kind, dd, opts], i) => ({ id: `u14-1-B${i + 1}`, type: 'fill', pic: F.img(`u14/sh${i + 1}`, 170), label: `涂色 ${fr(n, d)}`, prompt: { zh: '涂色的部分是几分之几？', en: 'What fraction is shaded?' },
            text: '{{f}} of the figure is shaded.', fields: { f: fracField(n, d) }, answerText: fr(n, d), explain: ['fracshaded', { kind, d, n, opts, pic: `u14/sh${i + 1}` }],
            hint: { zh: '先数一共几份写下面，再数涂色几份写上面。', en: 'Count all parts (bottom), then shaded parts (top).' } })) },
        { id: 'C', type: 'shade', title: { zh: '涂一涂，涂出这个分数', en: 'Shade the parts to show the correct fractions' },
          example: { kind: 'fracshade', n: { kind: 'circle', d: 3, n: 1 }, title: { zh: '涂出 1/3', en: 'Shade 1/3' } },
          questions: shC.map(([n, d, kind, opts], i) => ({ id: `u14-1-C${i + 1}`, type: 'shade', label: `涂出 ${fr(n, d)}`, prompt: { zh: `点格子，涂出 ${n}/${d}`, en: `Shade ${n}/${d}` }, figs: [{ kind, d, n, opts, label: `<div>${F.frac(n, d, true)}</div>` }], explain: ['fracshade', { kind, d, n, opts }] })) },
        { id: 'D', type: 'fill', title: { zh: '没涂色的部分是几分之几？', en: 'What fraction of each figure is not shaded?' },
          example: { kind: 'fracnot', n: { kind: 'strips', d: 4, n: 1 }, title: { zh: '4 份涂了 1 份，没涂的是 3/4', en: '3 out of 4 are not shaded: 3/4' } },
          questions: nsD.map(([n, d, kind, opts], i) => ({ id: `u14-1-D${i + 1}`, type: 'fill', pic: F.img(`u14/ns${i + 1}`, 170), label: `没涂色 ${fr(n, d)}`, prompt: { zh: '没涂色的部分是几分之几？', en: 'What fraction is NOT shaded?' },
            text: '{{f}} of the figure is not shaded.', fields: { f: fracField(n, d) }, answerText: fr(n, d), explain: ['fracnot', { kind, d, n: d - n, opts, pic: `u14/ns${i + 1}` }],
            hint: { zh: '数一共几份，再数“没涂色”的几份。小心别数成涂色的。', en: 'Count the parts that are NOT shaded.' } })) },
        { id: 'E', type: 'fill', title: { zh: '几份里的几份', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'fracshaded', n: { kind: 'grid', d: 4, n: 2, opts: { rows: 2, cols: 2 } }, title: { zh: '2 out of 4：2/4 涂色，2/4 没涂色', en: '2 out of 4' } },
          questions: eE.map(([n, d], i) => ({ id: `u14-1-E${i + 1}`, type: 'fill', pic: F.img(`u14/e${i + 1}`, 160), label: `${n} out of ${d}`, prompt: { zh: '看图填一填', en: 'Fill in the blanks' },
            text: `{{a}} out of {{b}} equal parts are shaded.\n{{c}} of the figure is shaded.\n{{d}} of the figure is not shaded.`, fields: { a: { a: n }, b: { a: d }, c: fracField(n, d), d: fracField(d - n, d) }, answerText: `${n} out of ${d}; ${fr(n, d)} shaded; ${fr(d - n, d)} not shaded`,
            explain: ['fracnot', { kind: 'grid', d, n, opts: { rows: 1, cols: d }, pic: `u14/e${i + 1}` }], hint: { zh: '涂色几份、一共几份；没涂色 = 一共 − 涂色。', en: 'Not shaded = total − shaded.' } })) },
      ],
    },
    {
      id: 'u14-2', available: true,
      title: { zh: '部分与整体', en: 'Understand parts and whole' },
      intro: { zh: '吃掉的份数 + 剩下的份数 = 全部份数。所以吃掉的分数和剩下的分数合起来就是 1 个整体（a whole）。', en: 'Parts eaten + parts left = the whole.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '吃掉多少，剩下多少', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'partwhole', n: { d: 8, n: 2, who: '弟弟', what: '蛋糕' }, title: { zh: '蛋糕 8 份吃了 2 份', en: 'Cake cut into 8, 2 eaten' } },
          questions: pwA.map(([en, zh, d, n, what, who, kind], i) => ({ id: `u14-2-A${i + 1}`, type: 'fill', pic: `<div class="wp-en">${en}</div><div class="wp-zh">${zh}</div><div class="center" style="margin-top:8px">${fig(kind, d, n, figOpts(kind, d))}</div>`, label: en,
            prompt: { zh: '填一填', en: 'Fill in the blanks' },
            text: `(a) {{a}} parts of the ${what} are left.\n(b) Fraction of the ${what} that is used/eaten is {{b}}.\n(c) Fraction of the ${what} left is {{c}}.\n(d) {{d}} and {{e}} make a whole.`,
            fields: { a: { a: d - n }, b: fracField(n, d), c: fracField(d - n, d), d: fracField(n, d), e: fracField(d - n, d) }, accept: [{ a: d - n, b: fr(n, d), c: fr(d - n, d), d: fr(n, d), e: fr(d - n, d) }, { a: d - n, b: fr(n, d), c: fr(d - n, d), d: fr(d - n, d), e: fr(n, d) }],
            answerText: `${d - n} left; ${fr(n, d)}; ${fr(d - n, d)}; ${fr(n, d)} and ${fr(d - n, d)}`, explain: ['partwhole', { d, n, who, what }],
            hint: { zh: `一共 ${d} 份，用掉 ${n} 份。剩下 = ${d} − ${n}。用掉的是 ${n}/${d}，剩下的是（剩下份数）/${d}。`, en: `Left = ${d} − ${n}. Fractions are out of ${d}.` } })) },
        { id: 'B', type: 'fill', title: { zh: '合起来是一个整体', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'makewhole', n: { d: 3, n: 1 }, title: { zh: '2/3 和 1/3 合起来是 1', en: '2/3 and 1/3 make a whole' } },
          questions: pwB.map(([left, right], i) => { const g = left || right, d = g[1], miss = d - g[0]; const text = left ? `${left[0]}/${left[1]} and {{r}} make a whole.` : `{{r}} and ${right[0]}/${right[1]} make a whole.`;
            return { id: `u14-2-B${i + 1}`, type: 'fill', text, fields: { r: fracField(miss, d) }, answerText: fr(miss, d), prompt: { zh: '还差几分之几才是一个整体？', en: 'Make a whole' }, explain: ['makewhole', { d, n: g[0] }], hint: { zh: `一个整体是 ${d}/${d}。${d} − ${g[0]} = ？份。`, en: `A whole is ${d}/${d}.` } }; }) },
      ],
    },
    {
      id: 'u14-3', available: true,
      title: { zh: '比较分数', en: 'Compare fractions' },
      intro: { zh: '分母一样：分子大的大（份数多）。分子一样：分母大的反而小（切得越碎每份越小）。', en: 'Same bottom: bigger top is greater. Same top: bigger bottom is smaller.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '哪个大？', en: 'Circle the greater fraction' },
          example: { kind: 'cmpfrac', n: { list: [[1, 2], [1, 4]], want: 'greater' }, title: { zh: '1/2 和 1/4 哪个大', en: '1/2 or 1/4' } },
          questions: cmpA.map(([a, b, ka, kb], i) => cmpQ(`u14-3-A${i + 1}`, a, b, ka, kb, 'greater')) },
        { id: 'B', type: 'fill', title: { zh: '哪个小？', en: 'Circle the smaller fraction' },
          example: { kind: 'cmpfrac', n: { list: [[2, 6], [2, 4]], want: 'smaller' }, title: { zh: '2/6 和 2/4 哪个小', en: '2/6 or 2/4' } },
          questions: cmpB.map(([a, b, ka, kb], i) => cmpQ(`u14-3-B${i + 1}`, a, b, ka, kb, 'smaller')) },
        { id: 'C', type: 'shade', title: { zh: '涂一涂，再选最大的', en: 'Colour the parts to show the fractions. Then circle the greatest fraction' },
          example: { kind: 'cmpfrac', n: { list: [[1, 8], [3, 8], [5, 8]], want: 'greater' }, title: { zh: '1/8、3/8、5/8 谁最大', en: 'Greatest of 1/8, 3/8, 5/8' } },
          questions: [shadePick('u14-3-C1', [[1, 8], [3, 8], [5, 8]], 'strips', 'greater'), shadePick('u14-3-C2', [[2, 6], [2, 8], [2, 10]], 'circle', 'greater'), shadePick('u14-3-C3', [[1, 4], [2, 4], [3, 4]], 'tri4', 'greater')] },
        { id: 'D', type: 'shade', title: { zh: '涂一涂，再选最小的', en: 'Colour the parts to show the fractions. Then circle the smaller fraction' },
          example: { kind: 'cmpfrac', n: { list: [[3, 9], [2, 9]], want: 'smaller' }, title: { zh: '3/9 和 2/9 谁小', en: 'Smaller of 3/9 and 2/9' } },
          questions: [shadePick('u14-3-D1', [[3, 9], [2, 9]], 'circle', 'smaller'), shadePick('u14-3-D2', [[4, 5], [4, 8]], 'strips', 'smaller'), shadePick('u14-3-D3', [[8, 10], [6, 10]], 'strips', 'smaller')] },
        { id: 'E', type: 'fill', title: { zh: '哪个大？（不看图）', en: 'Circle the greater fraction' },
          example: { kind: 'cmpfrac', n: { list: [[2, 3], [1, 3]], want: 'greater' }, title: { zh: '2/3 和 1/3', en: '2/3 or 1/3' } },
          questions: [[[2, 3], [1, 3]], [[4, 8], [4, 5]], [[7, 10], [7, 11]], [[2, 4], [3, 4]], [[6, 9], [5, 9]]].map((l, i) => cmpText(`u14-3-E${i + 1}`, l, 'greater', 'greater')) },
        { id: 'F', type: 'fill', title: { zh: '哪个小？（不看图）', en: 'Circle the smaller fraction' },
          example: { kind: 'cmpfrac', n: { list: [[1, 5], [1, 3]], want: 'smaller' }, title: { zh: '1/5 和 1/3', en: '1/5 or 1/3' } },
          questions: [[[1, 5], [1, 3]], [[2, 6], [2, 8]], [[4, 8], [3, 8]], [[7, 7], [6, 7]], [[11, 12], [10, 12]]].map((l, i) => cmpText(`u14-3-F${i + 1}`, l, 'smaller', 'smaller')) },
        { id: 'G', type: 'fill', title: { zh: '三个里哪个最大？', en: 'Circle the greatest fraction' },
          example: { kind: 'cmpfrac', n: { list: [[3, 5], [4, 5], [5, 5]], want: 'greater' }, title: { zh: '3/5、4/5、5/5', en: '3/5, 4/5, 5/5' } },
          questions: [[[3, 5], [4, 5], [5, 5]], [[1, 10], [1, 11], [1, 12]], [[5, 7], [5, 8], [5, 9]], [[1, 6], [3, 6], [2, 6]], [[5, 11], [7, 11], [9, 11]]].map((l, i) => cmpText(`u14-3-G${i + 1}`, l, 'greater', 'greatest')) },
        { id: 'H', type: 'fill', title: { zh: '三个里哪个最小？', en: 'Circle the smallest fraction' },
          example: { kind: 'cmpfrac', n: { list: [[1, 3], [1, 4], [1, 5]], want: 'smaller' }, title: { zh: '1/3、1/4、1/5', en: '1/3, 1/4, 1/5' } },
          questions: [[[1, 3], [1, 4], [1, 5]], [[7, 7], [4, 7], [5, 7]], [[5, 9], [6, 9], [3, 9]], [[2, 8], [2, 6], [2, 4]], [[8, 10], [9, 10], [10, 10]]].map((l, i) => cmpText(`u14-3-H${i + 1}`, l, 'smaller', 'smallest')) },
      ],
    },
    {
      id: 'u14-4', available: true,
      title: { zh: '给分数排队', en: 'Arrange fractions' },
      intro: { zh: '先看分母一样还是分子一样，再按大小排。', en: 'Compare, then arrange in order.' },
      sections: [
        { id: 'A', type: 'arrangef', title: { zh: '从大到小', en: 'Arrange these fractions. Begin with the greatest' },
          example: { kind: 'arrangef', n: { list: [[1, 6], [5, 6], [3, 6]], desc: true }, title: { zh: '1/6、5/6、3/6 从大到小', en: 'Greatest first' } },
          questions: arrA.map((list, i) => ({ id: `u14-4-A${i + 1}`, type: 'arrangef', list, desc: true, label: `${list.map(f => fr(f[0], f[1])).join(', ')} 从大到小` })) },
        { id: 'B', type: 'arrangef', title: { zh: '从小到大', en: 'Arrange these fractions. Begin with the smallest' },
          example: { kind: 'arrangef', n: { list: [[3, 4], [2, 4], [1, 4]], desc: false }, title: { zh: '3/4、2/4、1/4 从小到大', en: 'Smallest first' } },
          questions: arrB.map((list, i) => ({ id: `u14-4-B${i + 1}`, type: 'arrangef', list, desc: false, label: `${list.map(f => fr(f[0], f[1])).join(', ')} 从小到大` })) },
      ],
    },
    {
      id: 'u14-5', available: true,
      title: { zh: '同分母分数加减', en: 'Add and subtract like fractions' },
      intro: { zh: '分母一样的分数，加减时分母不变，只把分子加起来或减掉。1 可以写成 d/d。', en: 'Same bottom number: add or subtract the top numbers only.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '加一加', en: 'Add these fractions' },
          example: { kind: 'addfrac', n: { d: 8, parts: [1, 2] }, title: { zh: '1/8 + 2/8 = 3/8', en: '1/8 + 2/8 = 3/8' } },
          questions: [[10, [1, 6]], [12, [3, 7]], [7, [2, 4]], [6, [2, 3]], [8, [3, 5]], [9, [1, 5, 2]], [5, [1, 2, 1]], [6, [2, 1, 1]], [11, [2, 1, 3]], [12, [5, 3, 4]]].map(([d, parts], i) => addQ(`u14-5-A${i + 1}`, d, parts)) },
        { id: 'B', type: 'fill', title: { zh: '减一减', en: 'Subtract these fractions' },
          example: { kind: 'subfrac', n: { d: 4, start: 3, parts: [1] }, title: { zh: '3/4 − 1/4 = 2/4', en: '3/4 − 1/4 = 2/4' } },
          questions: [[9, 5, [3]], [7, 6, [1]], [10, 10, [1]], [5, 5, [5]], [8, 4, [3]], [6, 5, [1, 2]], [11, 10, [3, 4]], [8, 6, [1, 2]], [12, 10, [2, 5]], [9, 8, [6, 2]]].map(([d, s, parts], i) => subQ(`u14-5-B${i + 1}`, d, s, parts)) },
      ],
    },
  ];
})();
