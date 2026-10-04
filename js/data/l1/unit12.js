/* Level 1 · Unit 12  40 以内的减法 */
(function () {
  const U = window.MATH_DATA.levels[1].units;
  const unit = num => U.find(u => u.num === num);
  const L = window.L1;
  const pic = html => `<div class="center">${html}</div>`;
  const F = (id, p, text, fields, explain, zh, en, o) => Object.assign({ id, type: 'fill', pic: p, label: text.replace(/\{\{\w+\}\}/g, '___').replace(/\n/g, ' '), prompt: { zh, en: en || 'Fill in the blanks' }, text, fields, answerText: Object.values(fields).map(f => f.a).join(', '), explain }, o || {});
  const B = (id, w, a, b, blank, p, explain, o) => Object.assign({ id, type: 'bond', w, a, b, blank, pic: p, explain, label: `${w} ← ${a} , ${b}` }, o || {});
  const C = (id, a, b, o) => Object.assign({ id, type: 'column', a, b, op: '-', width: 2, label: `${a} − ${b} = ${a - b}`, explain: ['l1colsub', { a, b }] }, o || {});
  const wp = (en, zh) => `<div class="wp-text"><div class="wp-en">${en}</div><div class="wp-zh">${zh}</div></div>`;
  const strip = circle => pic(L.strip({ from: 20, to: 40, circle }));
  const T = n => Math.floor(n / 10) * 10, O = n => n % 10;

  const backA = [[23, 3], [36, 2], [40, 8], [27, 5], [39, 6], [28, 8], [26, 4], [37, 7], [40, 5], [30, 3]];
  const bondB = [[24, 1], [39, 8], [26, 6], [28, 4], [37, 2], [38, 5], [29, 7], [33, 3], [36, 4], [27, 2]];
  const colC = [[25, 2], [37, 4], [29, 3], [31, 1], [35, 4], [26, 4], [28, 5], [39, 7], [27, 6], [38, 3]];
  const tensD = [[40, 20], [36, 10], [31, 20], [40, 10], [29, 20]];
  const colE = [[25, 10], [30, 20], [28, 20], [39, 10], [37, 20]];
  const colF = [[21, 11], [35, 14], [38, 25], [27, 12], [26, 15], [39, 37], [36, 16], [29, 13], [34, 12], [28, 22]];
  const regA = [20, 33, 29, 40, 35, 22, 31, 38, 26, 21];
  const regB = [[30, 4], [25, 7], [23, 8], [38, 9], [32, 5], [40, 6], [20, 3], [34, 8], [26, 9], [36, 7]];
  const regC = [[23, 14], [30, 18], [40, 15], [26, 19], [33, 17], [40, 26], [21, 13], [33, 26], [40, 32], [20, 16]];
  // [en, zh, a, b, 答句, cmp]  cmp: false 拿走 / 'diff' 多几少几 / 'less' 比它少几
  const words = [
    ['Uncle Donald has 26 apples at his stall. Uncle Jack has 8 fewer apples than Uncle Donald at his stall. How many apples does Uncle Jack have?', 'Donald 叔叔的摊位上有 26 个苹果。Jack 叔叔比他少 8 个。Jack 叔叔有几个苹果？', 26, 8, 'Uncle Jack has ___ apples.', 'less'],
    ['Aunt Marie bakes 40 cookies. She sells 23 cookies. How many cookies has she left?', 'Marie 阿姨烤了 40 块饼干，卖掉 23 块。她还剩几块？', 40, 23, 'She has ___ cookies left.', false],
    ['Peter scores 24 points in a dart game. His brother scores 16 points. How many more points does Peter score than his brother?', 'Peter 飞镖游戏得了 24 分，弟弟得了 16 分。Peter 比弟弟多几分？', 24, 16, 'Peter scores ___ more points than his brother.', 'diff'],
    ['Josephine buys 37 pieces of coloured paper. She uses 5 pieces for drawing. How many pieces of coloured paper has Josephine left?', 'Josephine 买了 37 张彩纸，画画用掉 5 张。她还剩几张？', 37, 5, 'Josephine has ___ pieces of coloured paper left.', false],
    ['There are 39 chickens on Farm A and 24 chickens on Farm B. How many more chickens are there on Farm A than on Farm B?', 'A 农场有 39 只鸡，B 农场有 24 只。A 农场比 B 农场多几只？', 39, 24, 'There are ___ more chickens on Farm A than on Farm B.', 'diff'],
    ['20 birds are feeding in a park. 9 of them fly away. How many birds are left in the park?', '公园里有 20 只鸟在吃东西，飞走了 9 只。公园里还剩几只？', 20, 9, '___ birds are left in the park.', false],
    ['Matthew makes 35 clay figurines and Michael makes 25 clay figurines. How many fewer clay figurines does Michael make than Matthew?', 'Matthew 做了 35 个泥人，Michael 做了 25 个。Michael 比 Matthew 少做几个？', 35, 25, 'Michael makes ___ fewer clay figurines than Matthew.', 'diff'],
    ['Felicia sells 15 daisies and 28 roses at her shop. How many more roses than daisies does Felicia sell?', 'Felicia 的店里卖出 15 朵雏菊和 28 朵玫瑰。玫瑰比雏菊多卖几朵？', 28, 15, 'Felicia sells ___ more roses than daisies.', 'diff'],
    ['There are 40 students in a class. 21 of them are boys and the rest are girls. How many girls are there in the class?', '班里有 40 个学生，其中 21 个是男生，其余是女生。女生有几个？', 40, 21, 'There are ___ girls in the class.', false],
    ['38 tourists visit an amusement park. 14 of them decide to take the roller coaster ride. How many tourists do not take the roller coaster ride?', '38 名游客去游乐园，其中 14 人决定坐过山车。有几人不坐过山车？', 38, 14, '___ tourists do not take the roller coaster ride.', false],
  ];

  unit(12).kps = [
    {
      id: 'l1-12-1', available: true,
      title: { zh: '不退位减法', en: 'Subtract numbers without regrouping' },
      intro: { zh: '两位数减法：可以在数字条上往回数；也可以把数拆成几十和几，先用个位减；或者列竖式，先减个位再减十位。', en: 'Count back, split into tens and ones, or subtract in columns: ones first, then tens.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '数字条上往回数', en: 'Subtract the following numbers by counting back' },
          example: { kind: 'l1sub40back', n: { a: 25, b: 4 }, title: { zh: '25 − 4：从 25 往回跳 4 格', en: '25 − 4 = 21' } },
          questions: backA.map(([a, b], i) => F(`l1-12-1-A${i + 1}`, strip([a]), `${a} − ${b} = {{s}}`, { s: { a: a - b } }, ['l1sub40back', { a, b }], `从 ${a} 往回数 ${b} 格`, `Count back ${b} from ${a}`, { label: `${a} − ${b} = ${a - b}`, hint: { zh: `从 ${a} 一格一格往回跳 ${b} 格。`, en: `${b} hops back.` } })) },
        { id: 'B', type: 'bond', title: { zh: '拆成几十和几', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'l1splitsub', n: { a: 35, b: 3 }, title: { zh: '35 − 3：35 = 30 + 5，5 − 3 = 2，30 + 2 = 32', en: '35 − 3 = 32' } },
          questions: bondB.map(([a, b], i) => B(`l1-12-1-B${i + 1}`, a, T(a), O(a), ['a', 'b'], '', ['l1splitsub', { a, b }], { anyOrder: false, text: `${a} − ${b} = {{s}}`, fields: { s: { a: a - b } }, label: `${a} − ${b} = ${a - b}`, prompt: { zh: `把 ${a} 拆成几十和几，先用个位减，再加回几十`, en: 'Split into tens and ones.' }, hint: { zh: `${a} = ${T(a)} + ${O(a)}；${O(a)} − ${b} = ${O(a) - b}；${T(a)} + ${O(a) - b} = ${a - b}。`, en: `${T(a)} and ${O(a)}.` } })) },
        { id: 'C', type: 'column', title: { zh: '列竖式减', en: 'Subtract these numbers' },
          example: { kind: 'l1colsub', n: { a: 34, b: 3 }, title: { zh: '34 − 3：先减个位 4 − 3 = 1，再减十位 3 − 0 = 3', en: '34 − 3 = 31' } },
          questions: colC.map(([a, b], i) => C(`l1-12-1-C${i + 1}`, a, b, { hint: { zh: '先减个位，再减十位。', en: 'Ones first, then tens.' } })) },
        { id: 'D', type: 'fill', title: { zh: '减 10、减 20', en: 'Subtract the following numbers by counting back' },
          example: { kind: 'l1subtens', n: { a: 24, b: 10 }, title: { zh: '24 − 10 = 14：十位减 1，个位不变', en: '24 − 10 = 14' } },
          questions: tensD.map(([a, b], i) => F(`l1-12-1-D${i + 1}`, '', `${a} − ${b} = {{s}}`, { s: { a: a - b } }, ['l1subtens', { a, b }], `减 ${b} 就是减 ${b / 10} 个十`, `Subtract ${b}`, { label: `${a} − ${b} = ${a - b}`, hint: { zh: `十位减 ${b / 10}，个位不变。`, en: `Tens go down by ${b / 10}.` } })) },
        { id: 'E', type: 'column', title: { zh: '竖式减整十', en: 'Subtract these numbers' },
          example: { kind: 'l1colsub', n: { a: 33, b: 10 }, title: { zh: '33 − 10：个位 3 − 0 = 3，十位 3 − 1 = 2', en: '33 − 10 = 23' } },
          questions: colE.map(([a, b], i) => C(`l1-12-1-E${i + 1}`, a, b, { hint: { zh: '个位减 0 不变，十位减一减。', en: 'Ones first, then tens.' } })) },
        { id: 'F', type: 'column', title: { zh: '两位数减两位数', en: 'Subtract these numbers' },
          example: { kind: 'l1colsub', n: { a: 28, b: 14 }, title: { zh: '28 − 14：8 − 4 = 4，2 − 1 = 1', en: '28 − 14 = 14' } },
          questions: colF.map(([a, b], i) => C(`l1-12-1-F${i + 1}`, a, b, { hint: { zh: '先减个位，再减十位。', en: 'Ones first, then tens.' } })) },
      ],
    },
    {
      id: 'l1-12-2', available: true,
      title: { zh: '退位减法', en: 'Subtract numbers with regrouping' },
      intro: { zh: '个位不够减，就从十位借 1 个十：1 个十变成 10 个一，加到个位上再减。十位记得少 1。', en: 'When the ones are not enough, regroup 1 ten into 10 ones. Then subtract the ones, then the tens.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '重新分组', en: 'Regroup the following tens and ones' },
          example: { kind: 'l1regroup', n: { n: 24 }, title: { zh: '24 = 2 tens 4 ones = 1 ten 14 ones', en: '24 = 2 tens 4 ones = 1 ten 14 ones' } },
          questions: regA.map((n, i) => F(`l1-12-2-A${i + 1}`, '', `${n} = {{t}} tens {{o}} ones\n= {{t2}} ten {{o2}} ones`, { t: { a: T(n) / 10 }, o: { a: O(n) }, t2: { a: T(n) / 10 - 1 }, o2: { a: O(n) + 10 } }, ['l1regroup', { n }], `先写 ${n} 有几个十几个一，再把 1 个十拆成 10 个一`, `Regroup ${n}`, { label: `${n} = ${T(n) / 10} tens ${O(n)} ones = ${T(n) / 10 - 1} ten ${O(n) + 10} ones`, hint: { zh: `${n} 是 ${T(n) / 10} 个十 ${O(n)} 个一。拆开 1 个十：十位少 1，个位多 10。`, en: '1 ten = 10 ones.' } })) },
        { id: 'B', type: 'column', title: { zh: '两位数减一位数（退位）', en: 'Regroup and subtract these numbers' },
          example: { kind: 'l1colsub', n: { a: 31, b: 6 }, title: { zh: '31 − 6：1 不够减 6，借 1 个十：11 − 6 = 5；十位 2 − 0 = 2', en: '31 − 6 = 25' } },
          questions: regB.map(([a, b], i) => C(`l1-12-2-B${i + 1}`, a, b, { hint: { zh: '个位不够减，向十位借 1：个位加 10 再减，十位少 1。', en: 'Regroup 1 ten into 10 ones.' } })) },
        { id: 'C', type: 'column', title: { zh: '两位数减两位数（退位）', en: 'Regroup and subtract these numbers' },
          example: { kind: 'l1colsub', n: { a: 32, b: 18 }, title: { zh: '32 − 18：2 不够减 8，借 1 个十：12 − 8 = 4；十位 2 − 1 = 1', en: '32 − 18 = 14' } },
          questions: regC.map(([a, b], i) => C(`l1-12-2-C${i + 1}`, a, b, { hint: { zh: '个位不够减，向十位借 1：个位加 10 再减，十位少 1 再减。', en: 'Regroup 1 ten into 10 ones.' } })) },
      ],
    },
    {
      id: 'l1-12-3', available: true,
      title: { zh: '减法应用题', en: 'Solve subtraction word problems' },
      intro: { zh: '“剩下、飞走了、卖掉了、比它少几、多几”都用减法。先列算式，用竖式算，再写答句。', en: 'Left, fly away, sold, fewer than, how many more: subtract. Write the equation, subtract in columns, answer.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '读题列式', en: 'Solve these word problems. Show your working clearly' },
          example: { kind: 'l1word40', n: { en: 'Janice has 35 stickers. She gives 19 stickers to her sister. How many stickers has she left?', zh: 'Janice 有 35 张贴纸，送给妹妹 19 张。她还剩几张？', a: 35, b: 19, op: '-', sentence: 'She has ___ stickers left.' }, title: { zh: '35 − 19 = 16', en: '35 − 19 = 16' } },
          questions: words.map(([en, zh, a, b, sent, cmp], i) => F(`l1-12-3-A${i + 1}`, wp(en, zh), `{{x}} − {{y}} = {{z}}\n${sent.replace('___', '{{d}}')}`, { x: { a }, y: { a: b }, z: { a: a - b }, d: { a: a - b } }, ['l1word40', { en, zh, a, b, op: '-', sentence: sent, cmp }], cmp === 'less' ? '“比它少几”就是从它里面去掉几，用减法' : cmp ? '问“多几 / 少几”，大的减小的' : '拿走一部分，用减法', en, { label: en, hint: { zh: `${a} − ${b}，列竖式算。`, en: `${a} − ${b}.` } })) },
      ],
    },
  ];
})();
