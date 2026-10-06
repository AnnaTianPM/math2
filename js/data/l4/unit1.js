/* Level 4 · Unit 1  100 000 以内的数 */
(function () {
  const U = window.MATH_DATA.levels[4].units;
  const unit = num => U.find(u => u.num === num);
  const L = window.L4, NW = window.NumWords || NumWords, fmt = L.fmt, sp = L.split;
  const pic = html => `<div class="center">${html}</div>`;
  const num = a => ({ a });
  const choice = (a, options) => ({ a, kind: 'choice', options });
  const F = (id, p, text, fields, explain, zh, en, o) => Object.assign({ id, type: 'fill', pic: p, label: text.replace(/\{\{\w+\}\}/g, '___').replace(/\n/g, ' '), prompt: { zh, en: en || 'Fill in the blanks' }, text, fields, answerText: Object.values(fields).map(f => f.a).join(', '), explain }, o || {});
  const numshape = n => `<span class="numshape plain">${fmt(n)}</span>`;
  const K = ['tt', 'th', 'h', 't', 'o'], VAL = { tt: 10000, th: 1000, h: 100, t: 10, o: 1 }, PZ = { tt: '万', th: '千', h: '百', t: '十', o: '个' }, PE = { tt: 'ten thousands', th: 'thousands', h: 'hundreds', t: 'tens', o: 'ones' };
  const wordOpts = n => { const ds = String(n).split(''); const swap = (i, j) => { const d = ds.slice(); [d[i], d[j]] = [d[j], d[i]]; return +d.join(''); }; let c = [swap(2, 3), swap(3, 4), swap(1, 2), swap(0, 1), swap(1, 4), swap(2, 4)]; c = [...new Set(c)].filter(x => x !== n && x >= 10000 && x <= 99999).slice(0, 3); const list = [n, ...c].map(NW.toWords); const k = n % list.length; return list.slice(k).concat(list.slice(0, k)); };
  const patQ = (id, sq, blanks) => { const fields = {}; const text = sq.map((n, i) => blanks.includes(i) ? (fields['b' + i] = num(n), `{{b${i}}}`) : fmt(n)).join(',  '); return F(id, '', text, fields, ['pattern', { seq: sq, blanks }], '找规律，填一填', 'Complete the number pattern', { label: sq.map((n, i) => blanks.includes(i) ? '__' : fmt(n)).join(', '), hint: { zh: '先看相邻两个数差多少，每次加几或减几。', en: 'Find the difference between neighbours.' } }); };
  const wp = (en, zh) => `<div class="wp-text"><div class="wp-en">${en}</div><div class="wp-zh">${zh}</div></div>`;

  /* ---- KP1 ---- */
  const skipA = [4, 6, 7, 9, 10], skipB = [5, 6, 8, 9, 10];
  const countC = [25987, 40133, 59056, 84484, 66500, 91090, 17717, 38608, 70965, 23456];
  const wordsD = [23701, 40825, 68090, 55002, 14011, 37654, 82300, 99166, 71447, 26212];
  const readE = [11602, 92314, 57012, 60245, 82001, 23450, 44500, 78123, 39987, 95059];
  /* ---- KP2 ---- */
  const pvA = [[64925, [6, 4, 9, 2, 5]], [80647, [8, 0, 6, 4, 7]], [12534, [1, 2, 5, 3, 4]], [49783, [4, 9, 7, 8, 3]], [25168, [2, 5, 1, 6, 8]]];
  const boxB = [78035, 58217, 81420, 24608, 30579];
  const standB = [83246, 16792, 45183, 67854, 92361];
  const sumC = [38416, 73021, 56302, 91270, 67859];
  const expD = [[1106, 'h', 'units'], [35248, 'tt', 'units'], [50364, 't', 'units'], [24680, 'th', 'units'], [79135, 'o', 'units'], [63724, 'th'], [30517, 't'], [19100, 'th', 'rev'], [3136, 'h', 'rev'], [88627, 'tt']];
  const formE = [[[1, 2, 3, 4, 5], true, true], [[6, 7, 8, 9, 0], false, false], [[1, 2, 3, 4, 5], true, false], [[6, 7, 8, 9, 0], false, true], [[1, 7, 4, 8, 3], true, true], [[2, 6, 5, 9, 0], false, false], [[5, 3, 6, 1, 2], true, false], [[9, 4, 0, 8, 7], false, true]];
  /* ---- KP3 ---- */
  const greatA = [[98075, 97085], [24680, 26480], [53179, 53719], [36412, 36214], [79586, 79568]];
  const smallB = [[10738, 9173], [24536, 25346], [48975, 48795], [67132, 67123], [82467, 82469]];
  const ascC = [[5931, 1359, 1593, 5319], [14632, 41562, 24163, 12643], [6845, 4586, 8564, 4685], [23245, 22435, 23425, 22345], [48769, 46789, 48679, 46879]];
  const descD = [[7014, 1407, 7410, 1740], [39628, 26983, 63892, 96268], [2653, 3652, 5236, 5362], [50345, 50435, 50354, 50453], [78678, 78687, 78677, 78688]];
  const sameE = [[58642, 'smaller'], [39107, 'greater'], [90365, 'smaller'], [67412, 'greater']];
  const digF = [[41039, 95104, 1, 'greater'], [26385, 67438, 3, 'smaller'], [79512, 69437, 7, 'greater'], [24089, 42098, 4, 'smaller'], [50429, 50492, 9, 'greater'], [83276, 83762, 2, 'smaller'], [15947, 14957, 5, 'greater'], [32864, 23684, 8, 'smaller']];
  /* ---- KP4 ---- */
  const mlA = [[94606, -20], [21721, -2000], [55055, -500], [74567, -30000], [62388, -7000], [80493, 1000], [15050, 50], [43789, 300], [36636, 9000], [79779, 20000]];
  const mlA2 = [[21475, -3000], [10000, -100], [60606, -6000], [88008, -80], [100000, -10000], [4381, 6000], [90000, 99], [55555, 555], [28282, 2000], [54321, 12345]];
  const patB = [[[11727, 12227, 12727, 13227, 13727], [0, 2]], [[28694, 30694, 32694, 34694, 36694], [1, 3]], [[7530, 7540, 7550, 7560, 7570], [0, 3]], [[55632, 55832, 56032, 56232, 56432], [1, 2]], [[33045, 33050, 33055, 33060, 33065], [2, 3]], [[87455, 88455, 89455, 90455, 91455], [3, 4]]];
  const patC = [[[99885, 99880, 99875, 99870, 99865], [0, 2]], [[4432, 3432, 2432, 1432, 432], [0, 4]], [[40404, 40204, 40004, 39804, 39604], [2, 3]], [[10030, 10020, 10010, 10000, 9990], [1, 4]], [[76188, 71188, 66188, 61188, 56188], [1, 3]], [[69169, 69069, 68969, 68869, 68769], [1, 2]]];
  /* ---- KP5 ---- */
  const r10 = [771, 848, 661, 296, 1087, 1782, 39917, 46547, 11201, 59999];
  const r100 = [536, 881, 3084, 1117, 6944, 89544, 23891, 12057, 61272, 74808];
  const r1000 = [4400, 3800, 9595, 6077, 5105, 17171, 73737, 20876, 87099, 99911];
  /* ---- KP6 ---- */
  const estA = [[672, 48], [66, 725], [44, 525], [123, 321], [988, 899]];
  const estB = [[419, 38], [519, 21], [224, 35], [768, 678], [950, 333]];
  const estC = [[238, 362], [778, 544], [425, 685], [803, 843], [951, 151]];
  const estD = [[496, 246], [512, 352], [870, 708], [687, 278], [925, 445]];
  const estE = [[[234, 345, 567], ['+', '+']], [[151, 262, 435], ['+', '+']], [[867, 678, 786], ['+', '+']], [[745, 354, 163], ['-', '-']], [[850, 425, 215], ['-', '-']], [[924, 501, 343], ['-', '-']]];

  const pairPic = (a, b) => pic(`<div class="disc-pair"><span class="lbl">${fmt(a)}</span>${L.discs(a)}<span class="lbl">${fmt(b)}</span>${L.discs(b)}</div>`);
  const estCalc = (ns, ops, to) => ns.map(x => L.roundTo(x, to)).reduce((acc, x, i) => i ? (ops[i - 1] === '-' ? acc - x : acc + x) : x, 0);
  const exprOf = (ns, ops) => ns.map((x, i) => (i ? ` ${ops[i - 1] === '-' ? '−' : '+'} ` : '') + x).join('');
  const estQ = (id, ns, ops, to) => F(id, '', `${exprOf(ns, ops)} ≈ {{a}}`, { a: num(estCalc(ns, ops, to)) }, ['l4est', { nums: ns, ops, tos: [to] }], `先把每个数四舍五入到最接近的${to === 10 ? '十' : '百'}，再${ops[0] === '-' ? '减' : '加'}`, `Round off to the nearest ${to === 10 ? 'ten' : 'hundred'} and estimate`, { label: `${exprOf(ns, ops)} ≈ ${estCalc(ns, ops, to)}`, hint: { zh: `${ns.map(x => `${x} ≈ ${L.roundTo(x, to)}`).join('，')}。`, en: 'Round each number first.' } });

  unit(1).kps = [
    {
      id: 'l4-1-1', available: true,
      title: { zh: '读写 100 000 以内的数', en: 'Count and write numbers within 100 000 in numerals and words' },
      intro: { zh: '五位数多了一个万位（ten thousands）。写的时候万位和千位后面空一格：25 987。英文先说几十几 thousand，再说几 hundred and 几十几。', en: 'A 5-digit number has a ten thousands place. In words: __ thousand, __ hundred and __.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '一千一千地数', en: 'Write the numbers on the lines provided' },
          example: { kind: 'l4skip', n: { unit: 1000, count: 3 }, title: { zh: '1000、2000、3000', en: '1000, 2000, 3000' } },
          questions: skipA.map((c, i) => { const fields = {}; const text = Array.from({ length: c }, (_, j) => (fields['b' + j] = num((j + 1) * 1000), `{{b${j}}}`)).join(', '); return F(`l4-1-1-A${i + 1}`, pic(L.discrow(1000, c)), text, fields, ['l4skip', { unit: 1000, count: c }], '一个圆片 1000，一千一千地数', 'Count in thousands', { label: `${c} 个 1000`, hint: { zh: '1000、2000、3000……每数一个加 1000。', en: 'Add 1000 each time.' } }); }) },
        { id: 'B', type: 'fill', title: { zh: '一万一万地数', en: 'Write the numbers on the lines provided' },
          example: { kind: 'l4skip', n: { unit: 10000, count: 4 }, title: { zh: '10 000、20 000、30 000、40 000', en: '10 000, 20 000, 30 000, 40 000' } },
          questions: skipB.map((c, i) => { const fields = {}; const text = Array.from({ length: c }, (_, j) => (fields['b' + j] = num((j + 1) * 10000), `{{b${j}}}`)).join(', '); return F(`l4-1-1-B${i + 1}`, pic(L.discrow(10000, c)), text, fields, ['l4skip', { unit: 10000, count: c }], '一个圆片 10 000，一万一万地数', 'Count in ten thousands', { label: `${c} 个 10 000`, hint: { zh: '10 000、20 000、30 000……每数一个加 10 000；10 个一万是 100 000。', en: 'Add 10 000 each time.' } }); }) },
        { id: 'C', type: 'fill', title: { zh: '数圆片写数', en: 'Write the numbers on the lines provided' },
          example: { kind: 'l4count', n: { n: 12345 }, title: { zh: '10 000、11 000、12 000、12 100……12 345', en: '12 345' } },
          questions: countC.map((n, i) => F(`l4-1-1-C${i + 1}`, pic(L.discs(n)), '{{a}}', { a: num(n) }, ['l4count', { n }], '数一数圆片，这是多少？', 'Count and write the number', { label: `圆片 ${fmt(n)}`, hint: { zh: '先数 10 000 有几个，再数 1000、100、10、1。', en: 'Ten thousands first, then thousands, hundreds, tens, ones.' } })) },
        { id: 'D', type: 'fill', title: { zh: '数字写成英文', en: 'Write the following numbers in words' },
          example: { kind: 'l4words', n: { n: 72845 }, title: { zh: '72 845 = seventy-two thousand, eight hundred and forty-five', en: '72 845 in words' } },
          questions: wordsD.map((n, i) => F(`l4-1-1-D${i + 1}`, pic(L.big(n)), '{{w}}', { w: choice(NW.toWords(n), wordOpts(n)) }, ['l4words', { n }], `${fmt(n)} 用英文怎么说？`, 'Which is this number in words?', { label: `${fmt(n)} = ${NW.toWords(n)}`, hint: { zh: '万位千位合起来说几十几 thousand，百位说 hundred，然后 and 几十几。', en: 'thousand, hundred, and the rest.' } })) },
        { id: 'E', type: 'fill', title: { zh: '英文写成数字', en: 'Write the correct numbers in numerals on the lines provided' },
          example: { kind: 'l4read', n: { n: 72845 }, title: { zh: 'seventy-two thousand, eight hundred and forty-five = 72 845', en: '72 845' } },
          questions: readE.map((n, i) => F(`l4-1-1-E${i + 1}`, pic(`<div style="font-size:22px;font-weight:700">${NW.toWords(n)}</div>`), '{{a}}', { a: num(n) }, ['l4read', { n }], '这是多少？写数字', 'Write the number', { label: NW.toWords(n), hint: { zh: 'thousand 前面的两位数写在万位和千位，hundred 前面是百位，and 后面是十位个位；没提到的位写 0。', en: 'The number before "thousand" fills the ten thousands and thousands; hundred → hundreds; the rest → tens and ones.' } })) },
      ],
    },
    {
      id: 'l4-1-2', available: true,
      title: { zh: '数位与位值', en: 'Understand the place value of numbers within 100 000' },
      intro: { zh: '五位数从左到右：万位、千位、百位、十位、个位。数字在哪一位，值就是数字 × 那一位：8 在万位是 80 000，8 在十位是 80。', en: 'Ten thousands, thousands, hundreds, tens, ones. The value of a digit depends on its place.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '数位表、哪一位、位值', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'l4pv', n: { n: 13254 }, title: { zh: '13 254：1 在万位，值 10 000；3 在千位，值 3000……', en: '13 254 = 10 000 + 3000 + 200 + 50 + 4' } },
          questions: pvA.map(([n, order], i) => { const v = sp(n); const val = d => K.filter(k => v[k] === d).map(k => v[k] * VAL[k])[0];
            return F(`l4-1-2-A${i + 1}`, pic(L.discs(n)), `(a) Ten thousands {{tt}}　Thousands {{th}}　Hundreds {{h}}　Tens {{t}}　Ones {{o}}\n(b) The digit {{d1}} is in the ten thousands place.\nThe digit {{d2}} is in the thousands place.\nThe digit {{d3}} is in the hundreds place.\nThe digit {{d4}} is in the tens place.\nThe digit {{d5}} is in the ones place.\n(c) The value of the digit ${order[0]} is {{v1}}.\nThe value of the digit ${order[1]} is {{v2}}.\nThe value of the digit ${order[2]} is {{v3}}.\nThe value of the digit ${order[3]} is {{v4}}.\nThe value of the digit ${order[4]} is {{v5}}.`, { tt: num(v.tt), th: num(v.th), h: num(v.h), t: num(v.t), o: num(v.o), d1: num(v.tt), d2: num(v.th), d3: num(v.h), d4: num(v.t), d5: num(v.o), v1: num(val(order[0])), v2: num(val(order[1])), v3: num(val(order[2])), v4: num(val(order[3])), v5: num(val(order[4])) }, ['l4pv', { n }], '数圆片填数位表，再写每个数字在哪一位、值是多少', 'Place value', { label: `${fmt(n)} 的数位与位值`, hint: { zh: '圆片每列一位。数字 × 它所在的位（10 000/1000/100/10/1）就是它的值。', en: 'digit × place = value.' } }); }) },
        { id: 'B', type: 'fill', title: { zh: '每个数字的值', en: 'Write the correct value of each digit in its respective box' },
          example: { kind: 'l4pv', n: { n: 15326, pic: false }, title: { zh: '15 326：6、20、300、5000、10 000', en: '15 326 → 6, 20, 300, 5000, 10 000' } },
          questions: boxB.map((n, i) => { const v = sp(n); return F(`l4-1-2-B${i + 1}`, pic(L.big(n)), `${fmt(n)}\n${v.o} (ones) → {{o}}\n${v.t} (tens) → {{t}}\n${v.h} (hundreds) → {{h}}\n${v.th} (thousands) → {{th}}\n${v.tt} (ten thousands) → {{tt}}`, { o: num(v.o), t: num(v.t * 10), h: num(v.h * 100), th: num(v.th * 1000), tt: num(v.tt * 10000) }, ['l4pv', { n, pic: false }], `${fmt(n)} 里每个数字的值是多少？`, 'Write the value of each digit', { label: `${fmt(n)} 每位的值`, hint: { zh: '个位的值就是它自己，十位 × 10，百位 × 100，千位 × 1000，万位 × 10 000。', en: 'Multiply the digit by its place.' } }); })
            .concat(standB.map((n, i) => { const v = sp(n); return F(`l4-1-2-B${i + 6}`, '', `In ${fmt(n)},\n(a) the digit ${v.tt} stands for {{tt}}.\n(b) the digit ${v.th} stands for {{th}}.\n(c) the digit ${v.h} stands for {{h}}.\n(d) the digit ${v.t} stands for {{t}}.\n(e) the digit ${v.o} stands for {{o}}.`, { tt: num(v.tt * 10000), th: num(v.th * 1000), h: num(v.h * 100), t: num(v.t * 10), o: num(v.o) }, ['l4pv', { n, pic: false }], `${fmt(n)} 里每个数字表示多少？`, 'What does each digit stand for?', { label: `${fmt(n)} 每位 stands for`, hint: { zh: '看数字在哪一位：万位 × 10 000，千位 × 1000……', en: 'digit × place.' } }); })) },
        { id: 'C', type: 'fill', title: { zh: '几万几千几百几十几合起来', en: 'Write the correct values on the lines provided' },
          example: { kind: 'l4expand', n: { n: 36631, miss: 'sum' }, title: { zh: '30 000 + 6000 + 600 + 30 + 1 = 36 631', en: '36 631' } },
          questions: sumC.map((n, i) => { const v = sp(n); const parts = K.map(k => v[k] * VAL[k]).filter(x => x); return F(`l4-1-2-C${i + 1}`, pic(L.discs(n)), `${parts.map(fmt).join(' + ')} = {{a}}`, { a: num(n) }, ['l4expand', { n, miss: 'sum' }], '几万、几千、几百、几十、几合起来是多少？', 'Add them up', { label: `${parts.map(fmt).join(' + ')} = ${fmt(n)}`, hint: { zh: '万位写几万的几，千位写几千的几……没有的位写 0。', en: 'Write each digit in its place; 0 for a missing place.' } }); }) },
        { id: 'D', type: 'fill', title: { zh: '拆成几万几千几百几十几', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'l4expand', n: { n: 5217, miss: 'h', form: 'units' }, title: { zh: '5217 = 5 thousands + 2 hundreds + 1 ten + 7 ones', en: '5217 = 5 thousands + 2 hundreds + 1 ten + 7 ones' } },
          questions: expD.map(([n, miss, mode], i) => { const v = sp(n); const parts = {}; K.forEach(k => { parts[k] = v[k] * VAL[k]; });
            const unitName = k => `${v[k]} ${v[k] === 1 ? PE[k].replace(/s$/, '') : PE[k]}`;
            let text, ans;
            if (mode === 'units') { const ks = n >= 10000 ? K : K.slice(1); text = `${fmt(n)} = ${ks.map(k => k === miss ? `{{x}} ${v[k] === 1 ? PE[k].replace(/s$/, '') : PE[k]}` : unitName(k)).join(' + ')}`; ans = v[miss]; }
            else if (mode === 'rev') { const ks = K.filter(k => parts[k]); text = `${ks.map(k => k === miss ? '{{x}}' : fmt(parts[k])).join(' + ')} = ${fmt(n)}`; ans = parts[miss]; }
            else { const ks = K.filter(k => parts[k]); text = `${fmt(n)} = ${ks.map(k => k === miss ? '{{x}}' : fmt(parts[k])).join(' + ')}`; ans = parts[miss]; }
            return F(`l4-1-2-D${i + 1}`, '', text, { x: num(ans) }, ['l4expand', { n, miss, form: mode === 'units' ? 'units' : undefined }], '空格里填几？', 'Fill in the missing value', { label: text.replace('{{x}}', fmt(ans)), hint: { zh: `看 ${fmt(n)} 的${PZ[miss]}位是几${mode === 'units' ? '' : `，它表示几个${PZ[miss]}`}。`, en: `Look at the ${PE[miss]} digit of ${fmt(n)}.` } }); }) },
        { id: 'E', type: 'fill', title: { zh: '用 5 个数字组数', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'l4form', n: { digits: [3, 8, 1, 6, 5], big: true, odd: true }, title: { zh: '用 3、8、1、6、5 组最大的奇数：86 531', en: 'Greatest odd number from 3, 8, 1, 6, 5' } },
          questions: formE.map(([digits, wantBig, odd], i) => { const ans = L.formAns(digits, wantBig, odd); const en = `What is the ${wantBig ? 'greatest' : 'smallest'} 5-digit ${odd ? 'odd' : 'even'} number that can be formed using ${digits.slice(0, 4).join(', ')} and ${digits[4]}?`;
            return F(`l4-1-2-E${i + 1}`, wp(en, `用 ${digits.join('、')} 组成的最${wantBig ? '大' : '小'}的五位${odd ? '奇' : '偶'}数是多少？`), '{{a}}', { a: num(ans) }, ['l4form', { digits, big: wantBig, odd }], `最${wantBig ? '大' : '小'}的${odd ? '奇' : '偶'}数是几？`, en, { label: en, hint: { zh: `${odd ? '奇数' : '偶数'}的个位必须是${odd ? '1、3、5、7、9' : '0、2、4、6、8'}；先定个位，再把其他数字${wantBig ? '从大到小' : '从小到大'}排${digits.includes(0) ? '，0 不能放最前面' : ''}。`, en: `Fix the ones digit first (${odd ? 'odd' : 'even'}), then arrange the rest.` } }); }) },
      ],
    },
    {
      id: 'l4-1-3', available: true,
      title: { zh: '比较和排序', en: 'Compare and arrange numbers within 100 000' },
      intro: { zh: '比大小先看位数：五位数比四位数大。位数一样就从万位开始比，万位一样比千位，再比百位、十位、个位。', en: 'More digits means greater. Otherwise compare the ten thousands first, then thousands, hundreds, tens and ones.' },
      sections: [
        { id: 'A', type: 'pickone', title: { zh: '点大的数', en: 'Circle the greater number' },
          example: { kind: 'l4compare', n: { a: 48165, b: 49561, pic: 'discs' }, title: { zh: '万位一样，比千位：49 561 大', en: '49 561 is greater than 48 165' } },
          questions: greatA.map(([a, b], i) => ({ id: `l4-1-3-A${i + 1}`, type: 'pickone', pic: '', label: `${fmt(a)} / ${fmt(b)} 哪个大`, options: [numshape(a), numshape(b)], answer: a > b ? 0 : 1, prompt: { zh: '哪个数大？点它', en: 'Which is greater?' }, hint: { zh: '从万位开始比，一样就比下一位。', en: 'Ten thousands first.' }, explain: ['l4compare', { a, b, pic: 'pv' }] })) },
        { id: 'B', type: 'pickone', title: { zh: '点小的数', en: 'Circle the smaller number' },
          example: { kind: 'l4compare', n: { a: 13986, b: 13689, pic: 'discs' }, title: { zh: '万、千一样，比百位：13 689 小', en: '13 689 is smaller than 13 986' } },
          questions: smallB.map(([a, b], i) => ({ id: `l4-1-3-B${i + 1}`, type: 'pickone', pic: '', label: `${fmt(a)} / ${fmt(b)} 哪个小`, options: [numshape(a), numshape(b)], answer: a < b ? 0 : 1, prompt: { zh: '哪个数小？点它', en: 'Which is smaller?' }, hint: { zh: String(a).length !== String(b).length ? '先看位数：位数少的数小。' : '从万位开始比，一样就比下一位。', en: 'Ten thousands first.' }, explain: ['l4compare', { a, b, pic: 'pv' }] })) },
        { id: 'C', type: 'arrange', title: { zh: '从小到大排', en: 'Arrange the following numbers in increasing order' },
          example: { kind: 'l4arrange', n: { nums: [5931, 1359, 1593, 5319], order: 'asc' }, title: { zh: '1359, 1593, 5319, 5931', en: 'Increasing order' } },
          questions: ascC.map((nums, i) => ({ id: `l4-1-3-C${i + 1}`, type: 'arrange', nums, order: 'asc', fmt, explain: ['l4arrange', { nums, order: 'asc' }] })) },
        { id: 'D', type: 'arrange', title: { zh: '从大到小排', en: 'Arrange the following numbers in decreasing order' },
          example: { kind: 'l4arrange', n: { nums: [7014, 1407, 7410, 1740], order: 'desc' }, title: { zh: '7410, 7014, 1740, 1407', en: 'Decreasing order' } },
          questions: descD.map((nums, i) => ({ id: `l4-1-3-D${i + 1}`, type: 'arrange', nums, order: 'desc', fmt, explain: ['l4arrange', { nums, order: 'desc' }] })) },
        { id: 'E', type: 'l4sameq', title: { zh: '同样的数字组更小 / 更大的数', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'l4sameq', n: { n: 58642, rel: 'smaller' }, title: { zh: '用 5、8、6、4、2 组比 58 642 小的数：24 568、24 586……', en: 'Two numbers smaller than 58 642 with the same digits' } },
          questions: sameE.map(([n, rel], i) => ({ id: `l4-1-3-E${i + 1}`, type: 'l4sameq', n, rel, label: `两个比 ${fmt(n)} ${rel === 'smaller' ? '小' : '大'}的数（同样的数字）` })) },
        { id: 'F', type: 'pickone', title: { zh: '哪个数里这个数字的值更大 / 更小', en: 'Circle the correct number' },
          example: { kind: 'l4cmpdigit', n: { a: 41039, b: 95104, d: 1, want: 'greater' }, title: { zh: '41 039 里 1 是 1000，95 104 里 1 是 100：41 039', en: 'Which has a greater value of the digit 1?' } },
          questions: digF.map(([a, b, d, want], i) => { const place = n => K.find(k => sp(n)[k] === d); const xa = d * VAL[place(a)], xb = d * VAL[place(b)]; const ans = want === 'greater' ? (xa > xb ? a : b) : (xa < xb ? a : b);
            return { id: `l4-1-3-F${i + 1}`, type: 'pickone', pic: wp(`Which number has a ${want} value of the digit ${d}?`, `哪个数里数字 ${d} 的值更${want === 'greater' ? '大' : '小'}？`), label: `digit ${d} ${want}: ${fmt(a)} / ${fmt(b)}`, options: [numshape(a), numshape(b)], answer: ans === a ? 0 : 1, prompt: { zh: `哪个数里数字 ${d} 的值更${want === 'greater' ? '大' : '小'}？点它`, en: `Which number has a ${want} value of the digit ${d}?` }, hint: { zh: `先找 ${d} 在每个数的哪一位，位越靠左值越大。`, en: `Find the place of ${d} in each number.` }, explain: ['l4cmpdigit', { a, b, d, want }] }; }) },
      ],
    },
    {
      id: 'l4-1-4', available: true,
      title: { zh: '数字规律', en: 'Complete number patterns' },
      intro: { zh: '多 10、100、1000、10 000 主要改一位；多几百几十几就按数位拆开，一位一位加。找规律先看相邻两数差多少。', en: 'Adding 10, 100, 1000 or 10 000 changes one place. For other amounts, add place by place. For patterns, find the difference between neighbours.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '多几、少几', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'l4moreless', n: { start: 18096, delta: 2000 }, title: { zh: '2000 more than 18 096 is 20 096：千位 8 + 2 = 10，进到万位', en: '2000 more than 18 096 is 20 096' } },
          questions: mlA.map(([start, d], i) => F(`l4-1-4-A${i + 1}`, '', `{{a}} is ${fmt(Math.abs(d))} ${d > 0 ? 'more' : 'less'} than ${fmt(start)}.`, { a: num(start + d) }, ['l4moreless', { start, delta: d }], `比 ${fmt(start)} ${d > 0 ? '多' : '少'} ${fmt(Math.abs(d))} 是几？`, `${fmt(Math.abs(d))} ${d > 0 ? 'more' : 'less'} than ${fmt(start)}`, { label: `${fmt(Math.abs(d))} ${d > 0 ? 'more' : 'less'} than ${fmt(start)} = ${fmt(start + d)}`, hint: { zh: `${fmt(Math.abs(d))} 是几个${PZ[K.find(k => VAL[k] === 10 ** Math.floor(Math.log10(Math.abs(d))))]}，就改那一位。`, en: 'Change that place.' } }))
            .concat(mlA2.map(([start, d], i) => F(`l4-1-4-A${i + 11}`, '', `${fmt(Math.abs(d))} ${d > 0 ? 'more' : 'less'} than ${fmt(start)} is {{a}}.`, { a: num(start + d) }, ['l4moreless', { start, delta: d }], `比 ${fmt(start)} ${d > 0 ? '多' : '少'} ${fmt(Math.abs(d))} 是几？`, `${fmt(Math.abs(d))} ${d > 0 ? 'more' : 'less'} than ${fmt(start)}`, { label: `${fmt(Math.abs(d))} ${d > 0 ? 'more' : 'less'} than ${fmt(start)} = ${fmt(start + d)}`, hint: { zh: Math.abs(d) % 10 ** Math.floor(Math.log10(Math.abs(d))) ? `把 ${fmt(Math.abs(d))} 按数位拆开，一位一位${d > 0 ? '加' : '减'}。` : `${fmt(Math.abs(d))} 是几个${PZ[K.find(k => VAL[k] === 10 ** Math.floor(Math.log10(Math.abs(d))))]}，就改那一位（注意进位 / 退位）。`, en: 'Add or subtract place by place.' } }))) },
        { id: 'B', type: 'fill', title: { zh: '数列规律（递增）', en: 'Complete the number patterns' },
          example: { kind: 'pattern', n: { seq: [626, 646, 666, 686, 706], blanks: [3, 4] }, title: { zh: '每次 +20：686、706', en: '+20 each time' } },
          questions: patB.map(([sq, blanks], i) => patQ(`l4-1-4-B${i + 1}`, sq, blanks)) },
        { id: 'C', type: 'fill', title: { zh: '数列规律（递减）', en: 'Complete the number patterns' },
          example: { kind: 'pattern', n: { seq: [1131, 1081, 1031, 981, 931], blanks: [3, 4] }, title: { zh: '每次 −50：981、931', en: '−50 each time' } },
          questions: patC.map(([sq, blanks], i) => patQ(`l4-1-4-C${i + 1}`, sq, blanks)) },
      ],
    },
    {
      id: 'l4-1-5', available: true,
      title: { zh: '四舍五入到十、百、千', en: 'Round off numbers to the nearest ten, hundred and thousand' },
      intro: { zh: '四舍五入看后面一位：到十看个位，到百看十位，到千看百位。那一位 ≥ 5 就进上去，< 5 就舍掉。正好在中间（5、50、500）规定进上去。', en: 'Look at the next digit: 5 or more rounds up, less than 5 rounds down. Exactly halfway rounds up.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '到最接近的十', en: 'Round off the following numbers to the nearest ten' },
          example: { kind: 'l4round', n: { n: 564, to: 10 }, title: { zh: '564 在 560 和 570 之间，离 560 近：564 ≈ 560', en: '564 ≈ 560' } },
          questions: r10.map((n, i) => F(`l4-1-5-A${i + 1}`, '', `${fmt(n)} ≈ {{a}}`, { a: num(L.roundTo(n, 10)) }, ['l4round', { n, to: 10 }], `${fmt(n)} 四舍五入到最接近的十是多少？`, 'Round off to the nearest ten', { label: `${fmt(n)} ≈ ${fmt(L.roundTo(n, 10))}`, hint: { zh: '看个位：≥ 5 进，< 5 舍。', en: 'Look at the ones digit.' } })) },
        { id: 'B', type: 'fill', title: { zh: '到最接近的百', en: 'Round off the following numbers to the nearest hundred' },
          example: { kind: 'l4round', n: { n: 564, to: 100 }, title: { zh: '564 在 500 和 600 之间，离 600 近：564 ≈ 600', en: '564 ≈ 600' } },
          questions: r100.map((n, i) => F(`l4-1-5-B${i + 1}`, '', `${fmt(n)} ≈ {{a}}`, { a: num(L.roundTo(n, 100)) }, ['l4round', { n, to: 100 }], `${fmt(n)} 四舍五入到最接近的百是多少？`, 'Round off to the nearest hundred', { label: `${fmt(n)} ≈ ${fmt(L.roundTo(n, 100))}`, hint: { zh: '看十位：≥ 5 进，< 5 舍。', en: 'Look at the tens digit.' } })) },
        { id: 'C', type: 'fill', title: { zh: '到最接近的千', en: 'Round off the following numbers to the nearest thousand' },
          example: { kind: 'l4round', n: { n: 3500, to: 1000 }, title: { zh: '3500 正好在 3000 和 4000 中间，进上去：3500 ≈ 4000', en: '3500 ≈ 4000' } },
          questions: r1000.map((n, i) => F(`l4-1-5-C${i + 1}`, '', `${fmt(n)} ≈ {{a}}`, { a: num(L.roundTo(n, 1000)) }, ['l4round', { n, to: 1000 }], `${fmt(n)} 四舍五入到最接近的千是多少？`, 'Round off to the nearest thousand', { label: `${fmt(n)} ≈ ${fmt(L.roundTo(n, 1000))}`, hint: { zh: '看百位：≥ 5 进，< 5 舍。', en: 'Look at the hundreds digit.' } })) },
      ],
    },
    {
      id: 'l4-1-6', available: true,
      title: { zh: '估算和与差', en: 'Estimate sums and differences' },
      intro: { zh: '估算：先把每个数四舍五入（到十或到百），再用整十整百的数加减。', en: 'Round off each number first, then add or subtract.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '到十估算加法', en: 'Round off to the nearest ten and estimate' },
          example: { kind: 'l4est', n: { nums: [36, 12], ops: ['+'], tos: [10] }, title: { zh: '36 ≈ 40，12 ≈ 10：40 + 10 = 50', en: '36 + 12 ≈ 50' } },
          questions: estA.map(([a, b], i) => estQ(`l4-1-6-A${i + 1}`, [a, b], ['+'], 10)) },
        { id: 'B', type: 'fill', title: { zh: '到十估算减法', en: 'Round off to the nearest ten and estimate' },
          example: { kind: 'l4est', n: { nums: [932, 19], ops: ['-'], tos: [10] }, title: { zh: '932 ≈ 930，19 ≈ 20：930 − 20 = 910', en: '932 − 19 ≈ 910' } },
          questions: estB.map(([a, b], i) => estQ(`l4-1-6-B${i + 1}`, [a, b], ['-'], 10)) },
        { id: 'C', type: 'fill', title: { zh: '到百估算加法', en: 'Round off to the nearest hundred and estimate' },
          example: { kind: 'l4est', n: { nums: [159, 149], ops: ['+'], tos: [100] }, title: { zh: '159 ≈ 200，149 ≈ 100：200 + 100 = 300', en: '159 + 149 ≈ 300' } },
          questions: estC.map(([a, b], i) => estQ(`l4-1-6-C${i + 1}`, [a, b], ['+'], 100)) },
        { id: 'D', type: 'fill', title: { zh: '到百估算减法', en: 'Round off to the nearest hundred and estimate' },
          example: { kind: 'l4est', n: { nums: [334, 154], ops: ['-'], tos: [100] }, title: { zh: '334 ≈ 300，154 ≈ 200：300 − 200 = 100', en: '334 − 154 ≈ 100' } },
          questions: estD.map(([a, b], i) => estQ(`l4-1-6-D${i + 1}`, [a, b], ['-'], 100)) },
        { id: 'E', type: 'fill', title: { zh: '三个数：到十和到百', en: 'Round off the following numbers and estimate their values' },
          example: { kind: 'l4est', n: { nums: [234, 345, 567], ops: ['+', '+'], tos: [10, 100] }, title: { zh: '到十：230 + 350 + 570 = 1150；到百：200 + 300 + 600 = 1100', en: 'Nearest ten 1150, nearest hundred 1100' } },
          questions: estE.map(([ns, ops], i) => F(`l4-1-6-E${i + 1}`, '', `${exprOf(ns, ops)}\nNearest ten ≈ {{t}}\nNearest hundred ≈ {{h}}`, { t: num(estCalc(ns, ops, 10)), h: num(estCalc(ns, ops, 100)) }, ['l4est', { nums: ns, ops, tos: [10, 100] }], '先到十估一次，再到百估一次', 'Estimate to the nearest ten, then to the nearest hundred', { label: `${exprOf(ns, ops)} ≈ ${estCalc(ns, ops, 10)} / ${estCalc(ns, ops, 100)}`, hint: { zh: `到十：${ns.map(x => L.roundTo(x, 10)).join('、')}；到百：${ns.map(x => L.roundTo(x, 100)).join('、')}。`, en: 'Round each number, then calculate.' } })) },
      ],
    },
  ];
})();
