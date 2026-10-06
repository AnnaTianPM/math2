/* Level 3 · Unit 1  10 000 以内的数 */
(function () {
  const U = window.MATH_DATA.levels[3].units;
  const unit = num => U.find(u => u.num === num);
  const L = window.L3, NW = window.NumWords || NumWords;
  const pic = html => `<div class="center">${html}</div>`;
  const num = a => ({ a });
  const choice = (a, options) => ({ a, kind: 'choice', options });
  const F = (id, p, text, fields, explain, zh, en, o) => Object.assign({ id, type: 'fill', pic: p, label: text.replace(/\{\{\w+\}\}/g, '___').replace(/\n/g, ' '), prompt: { zh, en: en || 'Fill in the blanks' }, text, fields, answerText: Object.values(fields).map(f => f.a).join(', '), explain }, o || {});
  const numshape = n => `<span class="numshape plain">${n}</span>`;
  const sp = L.split;
  const wordOpts = n => { const v = sp(n), mk = (a, b, c, d) => a * 1000 + b * 100 + c * 10 + d; let c = [mk(v.th, v.h, v.o, v.t), mk(v.th, v.t, v.h, v.o), mk(v.h, v.th, v.t, v.o), mk(v.th, v.h, v.t, (v.o + 1) % 10), mk(v.th, (v.h + 1) % 10, v.t, v.o)]; c = [...new Set(c)].filter(x => x !== n && x >= 1000 && x <= 9999).slice(0, 3); const list = [n, ...c].map(NW.toWords); const k = n % list.length; return list.slice(k).concat(list.slice(0, k)); };
  const patQ = (id, sq, blanks) => { const fields = {}; const text = sq.map((n, i) => blanks.includes(i) ? (fields['b' + i] = num(n), `{{b${i}}}`) : String(n)).join(',  '); return F(id, '', text, fields, ['pattern', { seq: sq, blanks }], '找规律，填一填', 'Complete the number pattern', { label: sq.map((n, i) => blanks.includes(i) ? '__' : n).join(', '), hint: { zh: '先看相邻两个数差多少，每次加几或减几。', en: 'Find the difference between neighbours.' } }); };

  /* ---- KP1 ---- */
  const countA = [3579, 4682, 1099, 5555, 8806, 9390, 2772, 7101, 9876, 6054];
  const readB = [3625, 9099, 6208, 5817, 8035, 4156, 7380, 2571, 1462, 9743];
  const wordsC = [9693, 4313, 8440, 7015, 6505, 1289, 5974, 3721, 2867, 9152];
  /* ---- KP2 ---- */
  const pvA = [[8429, [8, 4, 2, 9]], [5741, [5, 7, 4, 1]], [7368, [7, 3, 6, 8]], [4215, [4, 2, 1, 5]], [9084, [9, 0, 8, 4]]];
  const sumB = [9361, 7075, 2843, 5109, 8264];
  const expC = [[6384, 'th'], [1072, 'h'], [4951, 't'], [9503, 'o'], [3245, 't'], [5818, 'h'], [2756, 'th'], [8668, 'h'], [7120, 't'], [6499, 'o']];
  /* ---- KP3 ---- */
  const discA = [[5178, 3871], [2092, 2129], [7374, 7347], [7650, 8605], [4949, 4944]];
  const pvB = [[8294, 8942, 'greater'], [1704, 1047, 'smaller'], [3010, 3001, 'greater'], [4196, 8196, 'smaller'], [5737, 5377, 'greater'], [6308, 6083, 'smaller'], [9815, 9851, 'greater'], [7250, 7205, 'smaller'], [2642, 2462, 'greater'], [3172, 3217, 'smaller']];
  const lineC = [[6000, 9000, 100, [6000, 7000, 8000, 9000], 6900, 8500, 'smaller'], [5510, 5570, 10, [5510, 5570], 5520, 5560, 'greater'], [8000, 10000, 100, [8000, 9000, 10000], 8300, 9900, 'smaller'], [4040, 4060, 1, [4040, 4050, 4060], 4045, 4056, 'greater'], [7700, 7800, 10, [7700, 7800], 7740, 7770, 'smaller']];
  const gsD = [[1068, 1168], [8843, 8803], [7452, 5252], [3090, 309], [4234, 4324]];
  const greatE = [[4123, 3214], [8568, 8658], [6097, 6079], [5525, 5520], [1999, 9001]];
  const smallF = [[3654, 3653], [7128, 7281], [2305, 2350], [9624, 6942], [4857, 4587]];
  const greatG = [[4614, 4216, 4461, 4146], [9909, 9999, 9099, 9990], [5115, 5515, 5551, 5151], [7386, 7836, 7638, 7863], [2745, 2574, 2457, 2547]];
  const smallH = [[8624, 6284, 2648, 2468], [3829, 3920, 9833, 9230], [5625, 6250, 2056, 2065], [6894, 6498, 6948, 6849], [1307, 1703, 1073, 1370]];
  const descI = [[3619, 6193, 1936, 9316], [5805, 5508, 5850, 5058], [9396, 6939, 3699, 9963], [4120, 2014, 4210, 2104], [6818, 6881, 8116, 8616]];
  const ascJ = [[2424, 8424, 4424, 1424], [8011, 8101, 8001, 8118], [5240, 4025, 5045, 4520], [6339, 6933, 3693, 3369], [4916, 4169, 4691, 4619]];
  const formK = [[[1, 2, 3, 4], true, true], [[5, 6, 7, 8], false, false], [[1, 2, 3, 4], true, false], [[5, 6, 7, 8], false, true], [[9, 0, 1, 2], true, true], [[5, 3, 8, 6], false, false], [[4, 1, 7, 2], true, false], [[8, 9, 3, 5], false, true]];
  /* ---- KP4 ---- */
  const mlA = [[2468, [1, -100, 1000, -10, 100, -1, 10, -1000]], [3579, [-10, 100, -1, 1000, -100, 1, -1000, 10]]];
  const mlB = [[9104, 20], [5520, -5], [2345, 3], [9898, -400], [4774, 3000], [1681, -60], [6006, 200], [8597, -3000]];
  const diffB = [[3269, 3229], [7175, 7675], [8386, 8380], [2010, 2060], [4991, 2991], [9504, 9509], [6789, 6389], [1027, 3027]];
  const patC = [[[1540, 1545, 1550, 1555, 1560], [2, 3]], [[4869, 4769, 4669, 4569, 4469], [1, 4]], [[2330, 2340, 2350, 2360, 2370], [2, 4]], [[8719, 7719, 6719, 5719, 4719], [1, 2]], [[5876, 5886, 5896, 5906, 5916], [2, 3]], [[9100, 9050, 9000, 8950, 8900], [2, 3]], [[6724, 6824, 6924, 7024, 7124], [0, 3]], [[3978, 3478, 2978, 2478, 1978], [1, 4]], [[4051, 5051, 6051, 7051, 8051], [0, 1]], [[7233, 7223, 7213, 7203, 7193], [0, 4]]];

  const formAns = (digits, wantBig, odd) => { const par = d => odd ? d % 2 === 1 : d % 2 === 0; const cand = digits.filter(par).sort((x, y) => x - y), onesD = wantBig ? cand[0] : cand[cand.length - 1]; const rest = digits.slice(); rest.splice(rest.indexOf(onesD), 1); rest.sort((x, y) => wantBig ? y - x : x - y); return +`${rest.join('')}${onesD}`; };
  const pairPic = (a, b) => pic(`<div class="disc-pair"><span class="lbl">${a}</span>${L.discs(a)}<span class="lbl">${b}</span>${L.discs(b)}</div>`);
  const pvPair = (a, b) => pic(`<table class="pv4"><tr><th>Thousands</th><th>Hundreds</th><th>Tens</th><th>Ones</th></tr>${[a, b].map(n => `<tr>${['th', 'h', 't', 'o'].map(k => `<td class="${k}">${sp(n)[k]}</td>`).join('')}</tr>`).join('')}</table>`);

  unit(1).kps = [
    {
      id: 'l3-1-1', available: true,
      title: { zh: '读写 10 000 以内的数', en: 'Count and write numbers within 10 000 in numerals and words' },
      intro: { zh: '四位数有千位、百位、十位、个位。数圆片时先数 1000 的，再数 100、10、1 的。英文：几 thousand，几 hundred，and 几十几。', en: 'A 4-digit number has thousands, hundreds, tens and ones. In words: __ thousand, __ hundred and __.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '数圆片写数', en: 'Write the numbers on the lines provided' },
          example: { kind: 'l3count', n: { n: 2345 }, title: { zh: '1000、2000、2100……2345', en: '2345' } },
          questions: countA.map((n, i) => F(`l3-1-1-A${i + 1}`, pic(L.discs(n)), '{{a}}', { a: num(n) }, ['l3count', { n }], '数一数圆片，这是多少？', 'Count and write the number', { label: `圆片 ${n}`, hint: { zh: '先数 1000 有几个，再数 100、10、1。', en: 'Thousands first, then hundreds, tens, ones.' } })) },
        { id: 'B', type: 'fill', title: { zh: '英文写成数字', en: 'Write the numbers on the lines provided' },
          example: { kind: 'l3read', n: { n: 2345 }, title: { zh: 'two thousand, three hundred and forty-five = 2345', en: '2345' } },
          questions: readB.map((n, i) => F(`l3-1-1-B${i + 1}`, pic(`<div style="font-size:22px;font-weight:700">${NW.toWords(n)}</div>`), '{{a}}', { a: num(n) }, ['l3read', { n }], '这是多少？写数字', 'Write the number', { label: NW.toWords(n), hint: { zh: 'thousand 前面是千位，hundred 前面是百位，and 后面是十位个位；没提到的位写 0。', en: 'thousand → thousands digit; hundred → hundreds digit; the rest → tens and ones.' } })) },
        { id: 'C', type: 'fill', title: { zh: '数字写成英文', en: 'Write the following numbers in words' },
          example: { kind: 'l3words', n: { n: 2345 }, title: { zh: '2345 = two thousand, three hundred and forty-five', en: '2345 in words' } },
          questions: wordsC.map((n, i) => F(`l3-1-1-C${i + 1}`, pic(L.big(n)), '{{w}}', { w: choice(NW.toWords(n), wordOpts(n)) }, ['l3words', { n }], `${n} 用英文怎么说？`, 'Which is this number in words?', { label: `${n} = ${NW.toWords(n)}`, hint: { zh: '千位说 thousand，百位说 hundred，然后 and 几十几。', en: 'thousand, hundred, and the rest.' } })) },
      ],
    },
    {
      id: 'l3-1-2', available: true,
      title: { zh: '数位与位值', en: 'Understand the place value of numbers within 10 000' },
      intro: { zh: '四位数从左到右：千位、百位、十位、个位。数字在哪一位，值就是数字 × 那一位：8 在千位是 8000，8 在十位是 80。', en: 'Thousands, hundreds, tens, ones. The value of a digit depends on its place.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '数位表、哪一位、位值', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'l3pv', n: { n: 1540 }, title: { zh: '1540：1 在千位，值 1000；5 在百位，值 500……', en: '1540 = 1000 + 500 + 40 + 0' } },
          questions: pvA.map(([n, order], i) => { const v = sp(n); const val = d => ['th', 'h', 't', 'o'].filter(k => v[k] === d).map(k => v[k] * { th: 1000, h: 100, t: 10, o: 1 }[k])[0];
            return F(`l3-1-2-A${i + 1}`, pic(L.discs(n)), `(a) Thousands {{th}}　Hundreds {{h}}　Tens {{t}}　Ones {{o}}\n(b) The digit {{d1}} is in the thousands place.\nThe digit {{d2}} is in the hundreds place.\nThe digit {{d3}} is in the tens place.\nThe digit {{d4}} is in the ones place.\n(c) The value of the digit ${order[0]} is {{v1}}.\nThe value of the digit ${order[1]} is {{v2}}.\nThe value of the digit ${order[2]} is {{v3}}.\nThe value of the digit ${order[3]} is {{v4}}.`, { th: num(v.th), h: num(v.h), t: num(v.t), o: num(v.o), d1: num(v.th), d2: num(v.h), d3: num(v.t), d4: num(v.o), v1: num(val(order[0])), v2: num(val(order[1])), v3: num(val(order[2])), v4: num(val(order[3])) }, ['l3pv', { n }], '数圆片填数位表，再写每个数字在哪一位、值是多少', 'Place value', { label: `${n} 的数位与位值`, hint: { zh: '圆片每列一位。数字 × 它所在的位（1000/100/10/1）就是它的值。', en: 'digit × place = value.' } }); }) },
        { id: 'B', type: 'fill', title: { zh: '几千几百几十几合起来', en: 'Write the correct values on the lines provided' },
          example: { kind: 'l3expand', n: { n: 3740, miss: 'sum' }, title: { zh: '3000 + 700 + 40 + 0 = 3740', en: '3740' } },
          questions: sumB.map((n, i) => { const v = sp(n); return F(`l3-1-2-B${i + 1}`, pic(L.discs(n)), `${v.th * 1000} + ${v.h * 100} + ${v.t * 10} + ${v.o} = {{a}}`, { a: num(n) }, ['l3expand', { n, miss: 'sum' }], '几千、几百、几十、几合起来是多少？', 'Add them up', { label: `${v.th * 1000} + ${v.h * 100} + ${v.t * 10} + ${v.o} = ${n}`, hint: { zh: '千位写几千的几，百位写几百的几……', en: 'Write each digit in its place.' } }); }) },
        { id: 'C', type: 'fill', title: { zh: '拆成几千几百几十几', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'l3expand', n: { n: 6384, miss: 'th' }, title: { zh: '6384 = 6000 + 300 + 80 + 4', en: '6384 = 6000 + 300 + 80 + 4' } },
          questions: expC.map(([n, miss], i) => { const v = sp(n); const parts = { th: v.th * 1000, h: v.h * 100, t: v.t * 10, o: v.o }; const text = `${n} = ${['th', 'h', 't', 'o'].map(k => k === miss ? '{{x}}' : parts[k]).join(' + ')}`;
            return F(`l3-1-2-C${i + 1}`, '', text, { x: num(parts[miss]) }, ['l3expand', { n, miss }], '空格里填几？', 'Fill in the missing value', { label: text.replace('{{x}}', parts[miss]), hint: { zh: `看 ${n} 的${{ th: '千', h: '百', t: '十', o: '个' }[miss]}位是几。`, en: `Look at the ${{ th: 'thousands', h: 'hundreds', t: 'tens', o: 'ones' }[miss]} digit.` } }); }) },
      ],
    },
    {
      id: 'l3-1-3', available: true,
      title: { zh: '比较和排序', en: 'Compare and arrange numbers within 10 000' },
      intro: { zh: '比大小从千位开始，千位一样比百位，再比十位、个位。数轴上越往右越大。', en: 'Compare the thousands first, then hundreds, tens and ones. On a number line, numbers get greater to the right.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '看圆片比大小', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'l3compare', n: { a: 6456, b: 6656, pic: 'discs' }, title: { zh: '千位一样，比百位：6656 大', en: '6656 is greater than 6456' } },
          questions: discA.map(([a, b], i) => { const big = Math.max(a, b), small = Math.min(a, b); return F(`l3-1-3-A${i + 1}`, pairPic(a, b), `{{p}} is greater than {{q}}.\n{{r}} is smaller than {{s}}.`, { p: num(big), q: num(small), r: num(small), s: num(big) }, ['l3compare', { a, b, pic: 'discs' }], '哪个大？哪个小？', 'Which is greater? Which is smaller?', { label: `${a} 和 ${b}`, hint: { zh: '从千位开始一位一位比。', en: 'Thousands first.' } }); }) },
        { id: 'B', type: 'fill', title: { zh: '看数位表比大小', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'l3compare', n: { a: 6447, b: 6474, pic: 'pv' }, title: { zh: '千、百一样，比十位：6447 小', en: '6447 is smaller than 6474' } },
          questions: pvB.map(([a, b, w], i) => { const big = Math.max(a, b), small = Math.min(a, b); return F(`l3-1-3-B${i + 1}`, pvPair(a, b), `{{p}} is ${w} than {{q}}.`, { p: num(w === 'greater' ? big : small), q: num(w === 'greater' ? small : big) }, ['l3compare', { a, b, pic: 'pv' }], w === 'greater' ? '哪个大？' : '哪个小？', `Which is ${w}?`, { label: `${a} / ${b}：${w}`, hint: { zh: '千位一样比百位，百位一样比十位……', en: 'Compare place by place.' } }); }) },
        { id: 'C', type: 'fill', title: { zh: '数轴上读数比大小', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'l3numline', n: { lo: 1000, hi: 2000, step: 100, labels: [1000, 1500, 2000], a: 1200, b: 1700 }, title: { zh: '每格 100：1200 和 1700，1700 大', en: '1700 is greater than 1200' } },
          questions: lineC.map(([lo, hi, step, labels, a, b, w], i) => F(`l3-1-3-C${i + 1}`, pic(L.numline(lo, hi, step, labels, [{ v: a }, { v: b }])), `{{p}} is ${w} than {{q}}.`, { p: num(w === 'greater' ? b : a), q: num(w === 'greater' ? a : b) }, ['l3numline', { lo, hi, step, labels, a, b }], '先读出两个箭头指的数，再比大小', 'Read the two numbers, then compare', { label: `数轴 ${a} / ${b}`, hint: { zh: `先算每小格是多少（${step}），从最近的大刻度数过去。`, en: `Each small step is ${step}.` } })) },
        { id: 'D', type: 'fill', title: { zh: 'greater 还是 smaller', en: "Fill in each blank with 'greater' or 'smaller'" },
          example: { kind: 'l3compare', n: { a: 1068, b: 1168, pic: 'pv' }, title: { zh: '1068 is smaller than 1168', en: '1068 is smaller than 1168' } },
          questions: gsD.map(([a, b], i) => F(`l3-1-3-D${i + 1}`, '', `${a} is {{w}} than ${b}.`, { w: choice(a > b ? 'greater' : 'smaller', ['greater', 'smaller']) }, ['l3compare', { a, b, pic: 'pv' }], `${a} 比 ${b} 大还是小？`, 'greater or smaller?', { label: `${a} is ${a > b ? 'greater' : 'smaller'} than ${b}`, hint: { zh: b < 1000 ? '位数多的数大：四位数比三位数大。' : '从千位开始比。', en: 'Compare the thousands first.' } })) },
        { id: 'E', type: 'pickone', title: { zh: '点大的数', en: 'Circle the greater number' },
          example: { kind: 'l3compare', n: { a: 4123, b: 3214, pic: 'pv' }, title: { zh: '千位 4 比 3 大：4123 大', en: '4123 is greater' } },
          questions: greatE.map(([a, b], i) => ({ id: `l3-1-3-E${i + 1}`, type: 'pickone', pic: '', label: `${a} / ${b} 哪个大`, options: [numshape(a), numshape(b)], answer: a > b ? 0 : 1, prompt: { zh: '哪个数大？点它', en: 'Which is greater?' }, hint: { zh: '从千位开始比。', en: 'Thousands first.' }, explain: ['l3compare', { a, b, pic: 'pv' }] })) },
        { id: 'F', type: 'pickone', title: { zh: '点小的数', en: 'Circle the smaller number' },
          example: { kind: 'l3compare', n: { a: 3654, b: 3653, pic: 'pv' }, title: { zh: '千百十都一样，比个位：3653 小', en: '3653 is smaller' } },
          questions: smallF.map(([a, b], i) => ({ id: `l3-1-3-F${i + 1}`, type: 'pickone', pic: '', label: `${a} / ${b} 哪个小`, options: [numshape(a), numshape(b)], answer: a < b ? 0 : 1, prompt: { zh: '哪个数小？点它', en: 'Which is smaller?' }, hint: { zh: '从千位开始比。', en: 'Thousands first.' }, explain: ['l3compare', { a, b, pic: 'pv' }] })) },
        { id: 'G', type: 'pickone', title: { zh: '点最大的数', en: 'Circle the greatest number' },
          example: { kind: 'l3arrange', n: { nums: [4614, 4216, 4461, 4146], order: 'desc' }, title: { zh: '千位都是 4，比百位：4614 最大', en: '4614 is the greatest' } },
          questions: greatG.map((ns, i) => ({ id: `l3-1-3-G${i + 1}`, type: 'pickone', pic: '', label: `最大：${ns.join(', ')}`, options: ns.map(numshape), answer: ns.indexOf(Math.max(...ns)), prompt: { zh: '四个数里哪个最大？点它', en: 'Which is the greatest?' }, hint: { zh: '先比千位，一样再比百位。', en: 'Thousands, then hundreds.' }, explain: ['l3arrange', { nums: ns, order: 'desc' }] })) },
        { id: 'H', type: 'pickone', title: { zh: '点最小的数', en: 'Circle the smallest number' },
          example: { kind: 'l3arrange', n: { nums: [8624, 6284, 2648, 2468], order: 'asc' }, title: { zh: '千位 2 最小的有两个，比百位：2468 最小', en: '2468 is the smallest' } },
          questions: smallH.map((ns, i) => ({ id: `l3-1-3-H${i + 1}`, type: 'pickone', pic: '', label: `最小：${ns.join(', ')}`, options: ns.map(numshape), answer: ns.indexOf(Math.min(...ns)), prompt: { zh: '四个数里哪个最小？点它', en: 'Which is the smallest?' }, hint: { zh: '先比千位，一样再比百位。', en: 'Thousands, then hundreds.' }, explain: ['l3arrange', { nums: ns, order: 'asc' }] })) },
        { id: 'I', type: 'arrange', title: { zh: '从大到小排', en: 'Arrange these numbers in order. Begin with the greatest' },
          example: { kind: 'l3arrange', n: { nums: [3619, 6193, 1936, 9316], order: 'desc' }, title: { zh: '9316, 6193, 3619, 1936', en: 'Begin with the greatest' } },
          questions: descI.map((nums, i) => ({ id: `l3-1-3-I${i + 1}`, type: 'arrange', nums, order: 'desc', explain: ['l3arrange', { nums, order: 'desc' }] })) },
        { id: 'J', type: 'arrange', title: { zh: '从小到大排', en: 'Arrange these numbers in order. Begin with the smallest' },
          example: { kind: 'l3arrange', n: { nums: [2424, 8424, 4424, 1424], order: 'asc' }, title: { zh: '1424, 2424, 4424, 8424', en: 'Begin with the smallest' } },
          questions: ascJ.map((nums, i) => ({ id: `l3-1-3-J${i + 1}`, type: 'arrange', nums, order: 'asc', explain: ['l3arrange', { nums, order: 'asc' }] })) },
        { id: 'K', type: 'fill', title: { zh: '用 4 个数字组数', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'l3form', n: { digits: [2, 5, 7, 8], big: true, odd: true }, title: { zh: '用 2、5、7、8 组最大的奇数：8725', en: 'Greatest odd number from 2, 5, 7, 8' } },
          questions: formK.map(([digits, wantBig, odd], i) => { const ans = formAns(digits, wantBig, odd); const en = `What is the ${wantBig ? 'greatest' : 'smallest'} 4-digit ${odd ? 'odd' : 'even'} number that can be formed using ${digits.slice(0, 3).join(', ')} and ${digits[3]}?`;
            return F(`l3-1-3-K${i + 1}`, `<div class="wp-text"><div class="wp-en">${en}</div><div class="wp-zh">用 ${digits.join('、')} 组成的最${wantBig ? '大' : '小'}的四位${odd ? '奇' : '偶'}数是多少？</div></div>`, '{{a}}', { a: num(ans) }, ['l3form', { digits, big: wantBig, odd }], `最${wantBig ? '大' : '小'}的${odd ? '奇' : '偶'}数是几？`, en, { label: en, hint: { zh: `${odd ? '奇数' : '偶数'}的个位必须是${odd ? '1、3、5、7、9' : '0、2、4、6、8'}；先定个位，再把其他数字${wantBig ? '从大到小' : '从小到大'}排。`, en: `Fix the ones digit first (${odd ? 'odd' : 'even'}), then arrange the rest.` } }); }) },
      ],
    },
    {
      id: 'l3-1-4', available: true,
      title: { zh: '数字规律', en: 'Complete number patterns' },
      intro: { zh: '多 1 / 10 / 100 / 1000 只改一位：多 10 改十位，多 100 改百位，多 1000 改千位。找规律先看相邻两数差多少。', en: 'Adding 10, 100 or 1000 changes only one place. For patterns, find the difference between neighbours.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '多几、少几', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'l3moreless', n: { start: 2468, delta: 100 }, title: { zh: '100 more than 2468 is 2568：只有百位变', en: '100 more than 2468 is 2568' } },
          questions: mlA.flatMap(([start, deltas], gi) => deltas.map((d, j) => F(`l3-1-4-A${gi * 8 + j + 1}`, '', `What is ${Math.abs(d)} ${d > 0 ? 'more' : 'less'} than ${start}? {{a}}`, { a: num(start + d) }, ['l3moreless', { start, delta: d }], `比 ${start} ${d > 0 ? '多' : '少'} ${Math.abs(d)} 是几？`, `${Math.abs(d)} ${d > 0 ? 'more' : 'less'} than ${start}`, { label: `${Math.abs(d)} ${d > 0 ? 'more' : 'less'} than ${start} = ${start + d}`, hint: { zh: `只改${{ 1: '个', 10: '十', 100: '百', 1000: '千' }[Math.abs(d)]}位。`, en: 'Only one place changes.' } }))) },
        { id: 'B', type: 'fill', title: { zh: '多几少几（二）', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'l3moreless', n: { start: 9104, delta: 20 }, title: { zh: '20 more than 9104 is 9124：十位加 2', en: '20 more than 9104 is 9124' } },
          questions: mlB.map(([start, d], i) => F(`l3-1-4-B${i + 1}`, '', `{{a}} is ${Math.abs(d)} ${d > 0 ? 'more' : 'less'} than ${start}.`, { a: num(start + d) }, ['l3moreless', { start, delta: d }], `比 ${start} ${d > 0 ? '多' : '少'} ${Math.abs(d)} 是几？`, undefined, { label: `${Math.abs(d)} ${d > 0 ? 'more' : 'less'} than ${start} = ${start + d}`, hint: { zh: `${Math.abs(d)} 是几个${{ 1: '一', 10: '十', 100: '百', 1000: '千' }[10 ** Math.floor(Math.log10(Math.abs(d)))]}，就改那一位。`, en: 'Change that place only.' } }))
            .concat(diffB.map(([a, b], i) => F(`l3-1-4-B${i + 9}`, '', `${a} is {{a}} ${a > b ? 'more' : 'less'} than ${b}.`, { a: num(Math.abs(a - b)) }, ['l3diff', { a, b }], `${a} 比 ${b} ${a > b ? '多' : '少'}多少？`, undefined, { label: `${a} is ${Math.abs(a - b)} ${a > b ? 'more' : 'less'} than ${b}`, hint: { zh: '对齐看哪一位不一样，差几个那一位。', en: 'Find the place that differs.' } }))) },
        { id: 'C', type: 'fill', title: { zh: '数列规律', en: 'Complete the number patterns' },
          example: { kind: 'pattern', n: { seq: [1540, 1545, 1550, 1555, 1560], blanks: [2, 3] }, title: { zh: '每次 +5：1550、1555', en: '+5 each time' } },
          questions: patC.map(([sq, blanks], i) => patQ(`l3-1-4-C${i + 1}`, sq, blanks)) },
      ],
    },
  ];
})();
