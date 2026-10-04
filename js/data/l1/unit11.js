/* Level 1 · Unit 11  40 以内的加法 */
(function () {
  const U = window.MATH_DATA.levels[1].units;
  const unit = num => U.find(u => u.num === num);
  const L = window.L1;
  const pic = html => `<div class="center">${html}</div>`;
  const img = (name, w) => L.img('l1u11/' + name, w || 420);
  const F = (id, p, text, fields, explain, zh, en, o) => Object.assign({ id, type: 'fill', pic: p, label: text.replace(/\{\{\w+\}\}/g, '___').replace(/\n/g, ' '), prompt: { zh, en: en || 'Fill in the blanks' }, text, fields, answerText: Object.values(fields).map(f => f.a).join(', '), explain }, o || {});
  const B = (id, w, a, b, blank, p, explain, o) => Object.assign({ id, type: 'bond', w, a, b, blank, pic: p, explain, label: `${w} ← ${a} , ${b}` }, o || {});
  const C = (id, a, b, o) => Object.assign({ id, type: 'column', a, b, op: '+', width: 2, label: `${a} + ${b} = ${a + b}` }, o || {});
  const wp = (en, zh) => `<div class="wp-text"><div class="wp-en">${en}</div><div class="wp-zh">${zh}</div></div>`;
  const strip = circle => pic(L.strip({ from: 20, to: 40, circle }));
  const T = n => Math.floor(n / 10) * 10, O = n => n % 10;

  const onA = [[20, 4], [32, 6], [25, 3], [33, 7], [22, 8], [27, 2], [30, 5], [36, 3], [24, 4], [31, 9]];
  const bondB = [[34, 5], [36, 2], [21, 4], [22, 6], [32, 1], [26, 3], [31, 6], [25, 1], [35, 4], [33, 3]];
  const colC = [[23, 6], [34, 3], [21, 8], [9, 30], [33, 5], [20, 7], [31, 2], [3, 25], [24, 2], [37, 1]];
  const tensD = [[25, 10], [19, 20], [13, 20], [29, 10], [20, 20]];
  const colE = [[16, 20], [10, 20], [27, 10], [30, 10], [20, 18]];
  const colF = [[24, 15], [21, 18], [11, 26], [14, 22], [27, 12], [13, 25], [23, 16], [16, 21], [12, 24], [23, 15]];
  const regA = [[15, 5], [18, 3], [4, 26], [25, 6], [28, 9], [14, 7], [8, 16], [24, 8], [19, 4], [27, 6]];
  const regB = [[15, 18], [28, 12], [19, 16], [16, 16], [14, 17], [21, 19], [18, 13], [17, 23], [19, 19], [14, 26]];
  // 三个数：nums, 凑十的两个下标, 图；split: [拆哪个下标, p1, p2]
  const threeA = [[[5, 6, 4], [1, 2], 'm1'], [[9, 3, 7], [1, 2], 'm2'], [[2, 2, 8], [1, 2], 'm3'], [[5, 5, 7], [0, 1], 'm4'], [[4, 6, 8], [0, 1], 'm5'], [[6, 3, 9], null, 'm6', [0, 1, 5]], [[2, 6, 7], null, 'm7', [1, 3, 3]], [[5, 8, 1], null, 'm8', [1, 5, 3]], [[7, 7, 5], null, 'm9', [1, 3, 4]], [[9, 8, 9], null, 'm10', [1, 1, 7]]];
  const threeB = [[[3, 4, 6], [1, 2]], [[7, 3, 5], [0, 1]], [[5, 9, 5], [0, 2]], [[1, 6, 9], [0, 2]], [[2, 7, 8], [0, 2]], [[3, 6, 6], null, [2, 4, 2]], [[8, 5, 9], null, [0, 3, 5]], [[7, 7, 2], null, [1, 3, 4]], [[4, 8, 8], null, [2, 2, 6]], [[6, 7, 9], null, [0, 3, 3]]];
  const words = [
    ['Zoe has 16 pencils. Joel has 14 more pencils than Zoe. How many pencils does Joel have?', 'Zoe 有 16 支铅笔。Joel 比 Zoe 多 14 支。Joel 有几支？', 16, 14, 'Joel has ___ pencils.', true],
    ['Bryan reads 17 pages of a book on Monday. He reads another 18 pages of the book on Tuesday. How many pages of the book does he read in two days?', 'Bryan 星期一读了 17 页书，星期二又读了 18 页。两天一共读了几页？', 17, 18, 'He reads ___ pages of the book in two days.', false],
    ['Claudia makes 25 paper stars in school. She makes another 15 paper stars at home. How many paper stars does she make altogether?', 'Claudia 在学校折了 25 颗纸星星，在家又折了 15 颗。一共折了几颗？', 25, 15, 'She makes ___ paper stars altogether.', false],
    ['Jaden collects 22 ice cream sticks. Joshua collects 7 more ice cream sticks than Jaden. How many ice cream sticks does Joshua collect?', 'Jaden 收集了 22 根雪糕棒。Joshua 比 Jaden 多 7 根。Joshua 收集了几根？', 22, 7, 'Joshua collects ___ ice cream sticks.', true],
    ['There are 31 guppies in a tank. 6 more guppies are added to the tank. How many guppies are there in all?', '鱼缸里有 31 条孔雀鱼，又放进 6 条。一共有几条？', 31, 6, 'There are ___ guppies in all.', false],
    ['There are 12 students in the school hall. 24 more students enter the hall. How many students are there in the school hall altogether?', '礼堂里有 12 个学生，又进来 24 个。礼堂里一共有几个学生？', 12, 24, 'There are ___ students in the school hall altogether.', false],
    ['Rachel has 23 picture cards. Rhonda has 16 more picture cards than Rachel. How many picture cards does Rhonda have?', 'Rachel 有 23 张图片卡。Rhonda 比 Rachel 多 16 张。Rhonda 有几张？', 23, 16, 'Rhonda has ___ picture cards.', true],
    ['There are 26 passengers on a train. 8 more passengers board the train. How many passengers are there on the train now?', '火车上有 26 名乘客，又上来 8 名。现在火车上有几名乘客？', 26, 8, 'There are ___ passengers on the train now.', false],
    ['Class A has 35 students. Class B has 5 more students than Class A. How many students does Class B have?', 'A 班有 35 个学生。B 班比 A 班多 5 个。B 班有几个学生？', 35, 5, 'Class B has ___ students.', true],
    ['Mr Tan buys 30 marker pens. Mr Lee buys 8 more marker pens than Mr Tan. How many marker pens does Mr Lee buy?', 'Tan 先生买了 30 支记号笔。Lee 先生比他多买 8 支。Lee 先生买了几支？', 30, 8, 'Mr Lee buys ___ marker pens.', true],
  ];
  const threeQ = (id, nums, pair, p, split) => { const [x, y, z] = nums, total = x + y + z; const n = { nums, pair, pic: p ? 'l1u11/' + p : undefined, split };
    if (!split) { const a = nums[pair[0]], b = nums[pair[1]], rest = nums.find((_, i) => !pair.includes(i));
      return F(id, p ? pic(img(p, 440)) : '', `${x} + ${y} + ${z} = {{s}}\n{{p}} + {{q}} = 10\n${rest} + 10 = {{s2}}`, { s: { a: total }, p: { a }, q: { a: b }, s2: { a: total } }, ['l1three', n], '先找两个凑成 10 的数，再加剩下的', 'Add by making 10', { accept: [{ s: total, p: a, q: b, s2: total }, { s: total, p: b, q: a, s2: total }], label: `${x} + ${y} + ${z} = ${total}`, hint: { zh: `${a} + ${b} = 10。`, en: `${a} + ${b} = 10.` } }); }
    const [si, p1, p2] = split, sv = nums[si], others = nums.filter((_, i) => i !== si), partner = others.find(v => v + p1 === 10), other = others[others.indexOf(partner) === 0 ? 1 : 0];
    return B(id, sv, p1, p2, ['a', 'b'], p ? pic(img(p, 440)) : '', ['l1three', n], { anyOrder: false, text: `${x} + ${y} + ${z} = {{s}}`, fields: { s: { a: total } }, label: `${x} + ${y} + ${z} = ${total}`, prompt: { zh: `把 ${sv} 拆成两部分，一部分和 ${partner} 凑成 10，再算总数`, en: `Split ${sv} to make 10, then add.` }, hint: { zh: `${partner} 差 ${p1} 到 10，所以 ${sv} 拆成 ${p1} 和 ${p2}；${other} + ${p2} = ${other + p2}，再加 10。`, en: `Split ${sv} into ${p1} and ${p2}.` } }); };

  unit(11).kps = [
    {
      id: 'l1-11-1', available: true,
      title: { zh: '不进位加法', en: 'Add numbers without regrouping' },
      intro: { zh: '两位数加法：可以在数字条上往后数；也可以把数拆成几十和几，先加个位再加十位；或者列竖式，个位对个位、十位对十位。', en: 'Count on, split into tens and ones, or add in columns: ones first, then tens.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '数字条上往后数', en: 'Add the following numbers by counting on' },
          example: { kind: 'l1add40on', n: { a: 21, b: 2 }, title: { zh: '21 + 2：从 21 往后跳 2 格', en: '21 + 2 = 23' } },
          questions: onA.map(([a, b], i) => F(`l1-11-1-A${i + 1}`, strip([a]), `${a} + ${b} = {{s}}`, { s: { a: a + b } }, ['l1add40on', { a, b }], `从 ${a} 往后数 ${b} 格`, `Count on ${b} from ${a}`, { label: `${a} + ${b} = ${a + b}`, hint: { zh: `从 ${a} 一格一格跳 ${b} 格。`, en: `${b} hops.` } })) },
        { id: 'B', type: 'bond', title: { zh: '拆成几十和几', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'l1splitadd', n: { a: 23, b: 3 }, title: { zh: '23 + 3：23 = 20 + 3，3 + 3 = 6，20 + 6 = 26', en: '23 + 3 = 26' } },
          questions: bondB.map(([a, b], i) => B(`l1-11-1-B${i + 1}`, a, T(a), O(a), ['a', 'b'], '', ['l1splitadd', { a, b }], { anyOrder: false, text: `${a} + ${b} = {{s}}`, fields: { s: { a: a + b } }, label: `${a} + ${b} = ${a + b}`, prompt: { zh: `把 ${a} 拆成几十和几，先加个位再加回几十`, en: 'Split into tens and ones.' }, hint: { zh: `${a} = ${T(a)} + ${O(a)}；${O(a)} + ${b} = ${O(a) + b}；${T(a)} + ${O(a) + b} = ${a + b}。`, en: `${T(a)} and ${O(a)}.` } })) },
        { id: 'C', type: 'column', title: { zh: '列竖式加', en: 'Add these numbers' },
          example: { kind: 'l1coladd', n: { a: 32, b: 4 }, title: { zh: '32 + 4：先加个位 2 + 4 = 6，再加十位 3 + 0 = 3', en: '32 + 4 = 36' } },
          questions: colC.map(([a, b], i) => C(`l1-11-1-C${i + 1}`, a, b, { hint: { zh: '先加个位，再加十位。', en: 'Ones first, then tens.' } })) },
        { id: 'D', type: 'fill', title: { zh: '加 10、加 20', en: 'Add the following numbers by counting on' },
          example: { kind: 'l1addtens', n: { a: 22, b: 10 }, title: { zh: '22 + 10 = 32：十位加 1，个位不变', en: '22 + 10 = 32' } },
          questions: tensD.map(([a, b], i) => F(`l1-11-1-D${i + 1}`, '', `${a} + ${b} = {{s}}`, { s: { a: a + b } }, ['l1addtens', { a, b }], `加 ${b} 就是加 ${b / 10} 个十`, `Add ${b}`, { label: `${a} + ${b} = ${a + b}`, hint: { zh: `十位加 ${b / 10}，个位不变。`, en: `Tens go up by ${b / 10}.` } })) },
        { id: 'E', type: 'column', title: { zh: '竖式加整十', en: 'Add these numbers' },
          example: { kind: 'l1coladd', n: { a: 21, b: 10 }, title: { zh: '21 + 10：个位 1 + 0 = 1，十位 2 + 1 = 3', en: '21 + 10 = 31' } },
          questions: colE.map(([a, b], i) => C(`l1-11-1-E${i + 1}`, a, b, { hint: { zh: '个位加 0 不变，十位加起来。', en: 'Ones first, then tens.' } })) },
        { id: 'F', type: 'column', title: { zh: '两位数加两位数', en: 'Add these numbers' },
          example: { kind: 'l1coladd', n: { a: 23, b: 12 }, title: { zh: '23 + 12：3 + 2 = 5，2 + 1 = 3', en: '23 + 12 = 35' } },
          questions: colF.map(([a, b], i) => C(`l1-11-1-F${i + 1}`, a, b, { hint: { zh: '先加个位，再加十位。', en: 'Ones first, then tens.' } })) },
      ],
    },
    {
      id: 'l1-11-2', available: true,
      title: { zh: '进位加法', en: 'Add numbers with regrouping' },
      intro: { zh: '个位加起来满 10 要进位：10 个一变成 1 个十，写在十位上面的小格里，加十位的时候记得加上。', en: 'When the ones make 10 or more, regroup: 10 ones = 1 ten. Carry 1 to the tens.' },
      sections: [
        { id: 'A', type: 'column', title: { zh: '两位数加一位数（进位）', en: 'Add and regroup these numbers' },
          example: { kind: 'l1coladd', n: { a: 29, b: 7 }, title: { zh: '29 + 7：9 + 7 = 16，写 6 进 1；1 + 2 = 3', en: '29 + 7 = 36' } },
          questions: regA.map(([a, b], i) => C(`l1-11-2-A${i + 1}`, a, b, { hint: { zh: '个位满 10 进 1，十位记得加上进的 1。', en: 'Regroup the ones.' } })) },
        { id: 'B', type: 'column', title: { zh: '两位数加两位数（进位）', en: 'Add and regroup these numbers' },
          example: { kind: 'l1coladd', n: { a: 15, b: 15 }, title: { zh: '15 + 15：5 + 5 = 10，写 0 进 1；1 + 1 + 1 = 3', en: '15 + 15 = 30' } },
          questions: regB.map(([a, b], i) => C(`l1-11-2-B${i + 1}`, a, b, { hint: { zh: '个位满 10 进 1，十位三个数相加。', en: 'Regroup the ones.' } })) },
      ],
    },
    {
      id: 'l1-11-3', available: true,
      title: { zh: '三个数相加', en: 'Add three numbers' },
      intro: { zh: '三个数相加，先找两个能凑成 10 的，再加第三个。没有正好凑 10 的，就把一个数拆开来凑。', en: 'Find two numbers that make 10, then add the third. If none, split one number to make 10.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '看图凑十', en: 'Add by making 10' },
          example: { kind: 'l1three', n: { nums: [3, 5, 5], pair: [1, 2], pic: 'l1u11/mex' }, title: { zh: '3 + 5 + 5：5 + 5 = 10，3 + 10 = 13', en: '3 + 5 + 5 = 13' } },
          questions: threeA.map(([nums, pair, p, split], i) => threeQ(`l1-11-3-A${i + 1}`, nums, pair, p, split)) },
        { id: 'B', type: 'fill', title: { zh: '用数字组合凑十', en: 'Add by making 10 with number bonds' },
          example: { kind: 'l1three', n: { nums: [4, 8, 2], pair: [1, 2] }, title: { zh: '4 + 8 + 2：8 + 2 = 10，4 + 10 = 14', en: '4 + 8 + 2 = 14' } },
          questions: threeB.map(([nums, pair, split], i) => threeQ(`l1-11-3-B${i + 1}`, nums, pair, null, split)) },
      ],
    },
    {
      id: 'l1-11-4', available: true,
      title: { zh: '加法应用题', en: 'Solve addition word problems' },
      intro: { zh: '“一共、又来了、比它多几”都用加法。先列算式，用竖式算，再写答句。', en: 'Altogether, more come, more than: add. Write the equation, add in columns, answer.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '读题列式', en: 'Solve these word problems. Show your working clearly' },
          example: { kind: 'l1word40', n: { en: 'Andy has 21 bookmarks. His mother gives him 9 more bookmarks. How many bookmarks does he have now?', zh: 'Andy 有 21 个书签，妈妈又给了他 9 个。他现在有几个？', a: 21, b: 9, op: '+', sentence: 'He has ___ bookmarks now.' }, title: { zh: '21 + 9 = 30', en: '21 + 9 = 30' } },
          questions: words.map(([en, zh, a, b, sent, cmp], i) => F(`l1-11-4-A${i + 1}`, wp(en, zh), `{{x}} + {{y}} = {{z}}\n${sent.replace('___', '{{d}}')}`, { x: { a }, y: { a: b }, z: { a: a + b }, d: { a: a + b } }, ['l1word40', { en, zh, a, b, op: '+', sentence: sent, cmp }], cmp ? '“比它多几”就是在它上面再加几，用加法' : '合起来，用加法', en, { accept: [{ x: a, y: b, z: a + b, d: a + b }, { x: b, y: a, z: a + b, d: a + b }], label: en, hint: { zh: `${a} + ${b}，列竖式算。`, en: `${a} + ${b}.` } })) },
      ],
    },
  ];
})();
