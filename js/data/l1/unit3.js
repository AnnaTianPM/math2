/* Level 1 · Unit 3  10 以内的加法 */
(function () {
  const U = window.MATH_DATA.levels[1].units;
  const unit = num => U.find(u => u.num === num);
  const L = window.L1;
  const pic = html => `<div class="center">${html}</div>`;
  const img = (name, w) => L.img('l1u3/' + name, w || 380);
  const F = (id, p, text, fields, explain, zh, en, o) => Object.assign({ id, type: 'fill', pic: p, label: text.replace(/\{\{\w+\}\}/g, '___').replace(/\n/g, ' '), prompt: { zh, en: en || 'Fill in the blanks' }, text, fields, answerText: Object.values(fields).map(f => f.a).join(', '), explain }, o || {});
  const B = (id, w, a, b, blank, explain, o) => Object.assign({ id, type: 'bond', w, a, b, blank, pic: '', explain, label: `${blank.includes('w') ? '?' : w} ← ${blank.includes('a') ? '?' : a} , ${blank.includes('b') ? '?' : b}` }, o || {});
  const wp = (en, zh) => `<div class="wp-text"><div class="wp-en">${en}</div><div class="wp-zh">${zh}</div></div>`;

  /* ---- 数据 ---- */
  const bondA = [['penguins', 5, 4, 'penguins in all', '企鹅'], ['boys', 5, 2, 'boys altogether', '男孩'], ['flowers', 4, 4, 'flowers altogether', '花'], ['rabbits', 5, 5, 'rabbits in all', '兔子'], ['pencils', 3, 3, 'pencils altogether', '铅笔']];
  const bondB = [[7, null, 3], [9, null, 5], [null, 0, 7], [6, 1, null], [10, null, 8], [8, 2, null], [4, 3, null], [null, 2, 5], [9, 0, null], [null, 4, 1]];
  const countA = [['🐭', 3, 5], ['👞', 6, 4], ['🐱', 2, 1], ['🏸', 5, 4], ['🍔', 2, 3]];
  const cubesB = [[3, 6], [5, 5], [1, 6], [4, 6], [2, 5]];
  const moreC = [[4, 5], [3, 6], [1, 2], [5, 0], [6, 4]];
  const storyA = [
    ['tables', 5, 4, 'tables', 'chairs', 'There are {{a}} tables.', 'There are {{b}} chairs.', 'tables and chairs altogether', '桌子和椅子'],
    ['apples', 6, 2, 'apples', 'mangoes', 'There are {{a}} apples.', 'There are {{b}} mangoes.', 'apples and mangoes altogether', '苹果和芒果'],
    ['music', 2, 3, 'children playing the drum', 'children playing the guitar', '{{a}} children are playing the drum.', '{{b}} children are playing the guitar.', 'children altogether', '小朋友'],
    ['cups', 5, 5, 'cups filled with coffee', 'empty cups', '{{a}} cups are filled with coffee.', '{{b}} cups are empty.', 'cups altogether', '杯子'],
    ['bowls', 4, 3, 'guppies in the big bowl', 'guppies in the small bowl', 'There are {{a}} guppies in the big bowl.', 'There are {{b}} guppies in the small bowl.', 'guppies in all', '孔雀鱼'],
    ['coconut', 6, 0, 'coconuts on the tree', 'coconuts on the ground', 'There are {{a}} coconuts on the tree.', 'There are {{b}} coconuts on the ground.', 'coconuts altogether', '椰子'],
    ['caterpillars', 7, 1, 'caterpillars on the branch', 'caterpillar on the leaf', '{{a}} caterpillars are on the branch.', '{{b}} caterpillar is on the leaf.', 'caterpillars in all', '毛毛虫'],
    ['candles', 6, 3, 'candles lit', 'candles not lit', '{{a}} candles are lit.', '{{b}} candles are not lit.', 'candles altogether', '蜡烛'],
    ['shirt', 5, 2, 'buttons on the front', 'buttons on the collar', 'There are {{a}} buttons on the front.', 'There are {{b}} buttons on the collar.', 'buttons on the shirt', '纽扣'],
    ['canteen', 3, 7, 'children queueing for food', 'children eating', '{{a}} children are queueing for food.', '{{b}} children are eating.', 'children at the canteen', '小朋友'],
  ];
  const pickB = [[7, [[1, 5], [4, 4], [7, 0], [8, 1]]], [5, [[3, 2], [2, 4], [5, 2], [1, 7]]], [6, [[3, 1], [3, 2], [3, 3], [3, 4]]], [4, [[4, 1], [3, 4], [2, 1], [0, 4]]], [8, [[1, 6], [5, 3], [2, 4], [7, 2]]]];
  const missC = [[1, null, 8], [3, null, 5], [null, 4, 8], [5, null, 6], [null, 7, 9], [null, 6, 10], [null, 3, 3], [3, null, 7], [2, null, 2], [null, 8, 10]];
  const wordA = [
    ['2 boys are drinking in a canteen. 5 boys are eating in the same canteen. How many boys are in the canteen?', '食堂里有 2 个男孩在喝水，5 个男孩在吃饭。食堂里一共有几个男孩？', 2, 5, 'drinking', 'eating', '___ boys are in the canteen.'],
    ['Sean has 3 toy cars. He also has 6 toy aeroplanes. How many toys does he have altogether?', 'Sean 有 3 辆玩具车，还有 6 架玩具飞机。他一共有几个玩具？', 3, 6, 'toy cars', 'toy aeroplanes', 'He has ___ toys altogether.'],
    ['There are 4 caterpillars on a branch. There is 1 caterpillar on a leaf. How many caterpillars are there in all?', '树枝上有 4 条毛毛虫，叶子上有 1 条。一共有几条毛毛虫？', 4, 1, 'on the branch', 'on the leaf', 'There are ___ caterpillars in all.'],
    ['Stella has 4 blue hair clips. She also has 4 pink hair clips. How many hair clips does she have altogether?', 'Stella 有 4 个蓝发夹和 4 个粉发夹。她一共有几个发夹？', 4, 4, 'blue', 'pink', 'She has ___ hair clips altogether.'],
    ['There are 7 chairs in the hall. There are 3 chairs in the room. How many chairs are there altogether?', '大厅里有 7 把椅子，房间里有 3 把。一共有几把椅子？', 7, 3, 'in the hall', 'in the room', 'There are ___ chairs altogether.'],
  ];
  const wordB = [
    ['There are 6 socks in the washing machine. There are 2 socks in the laundry basket. How many socks are there altogether?', '洗衣机里有 6 只袜子，洗衣篮里有 2 只。一共有几只袜子？', 6, 2, 'in the washing machine', 'in the basket', 'There are ___ socks altogether.'],
    ['Andy borrows 5 books from the library. He borrows 1 more book from his friend. How many books does he borrow altogether?', 'Andy 从图书馆借了 5 本书，又从朋友那里借了 1 本。他一共借了几本？', 5, 1, 'from the library', 'from his friend', 'He borrows ___ books altogether.'],
    ['There are 4 spoons on the table. There are 6 spoons in the sink. How many spoons are there altogether?', '桌上有 4 把勺子，水池里有 6 把。一共有几把勺子？', 4, 6, 'on the table', 'in the sink', 'There are ___ spoons altogether.'],
    ['There are 6 plates in the dishwasher. There is 1 plate on the kitchen counter. How many plates are there altogether?', '洗碗机里有 6 个盘子，台面上有 1 个。一共有几个盘子？', 6, 1, 'in the dishwasher', 'on the counter', 'There are ___ plates altogether.'],
    ['Jane has 3 butter cookies. Joan has 5 chocolate cookies. How many cookies do the girls have altogether?', 'Jane 有 3 块黄油饼干，Joan 有 5 块巧克力饼干。两个女孩一共有几块饼干？', 3, 5, 'butter cookies', 'chocolate cookies', 'The girls have ___ cookies altogether.'],
  ];
  const eqBox = (c, t, s) => `<div class="eqline"><span class="eq-c">${c}</span> + <span class="eq-t">${t}</span> = <span class="eq-s">${s}</span></div>`;

  unit(3).kps = [
    {
      id: 'l1-3-1', available: true,
      title: { zh: '用数字组合做加法', en: 'Add using number bonds' },
      intro: { zh: '两部分合起来就是加法。先数每一部分，写成数字组合，再写算式：部分 + 部分 = 整体。', en: 'Parts together make the whole. Write the number bond, then the addition sentence.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '看图写加法算式', en: 'Study the pictures below and fill in the blanks with the correct answers. Use number bonds to help you with addition' },
          example: { kind: 'l1addbond', n: { groups: [{ icon: '🎤', n: 2 }, { icon: '💃', n: 3 }], noun: 'girls' }, title: { zh: '2 个唱歌 3 个跳舞：2 + 3 = 5', en: '2 + 3 = 5 or 3 + 2 = 5' } },
          questions: bondA.map(([name, a, b, tail, zh], i) => { const w = a + b;
            return F(`l1-3-1-A${i + 1}`, pic(img(name, 360) + '<div class="mt">' + L.bond('?', '?', '?') + '</div>'), `{{a}} + {{b}} = {{w}} or {{b2}} + {{a2}} = {{w2}}\nThere are {{t}} ${tail}.`, { a: { a }, b: { a: b }, w: { a: w }, b2: { a: b }, a2: { a }, w2: { a: w }, t: { a: w } }, ['l1addbond', { groups: [{ icon: '🟠', n: a }, { icon: '🔵', n: b }], pic: 'l1u3/' + name, noun: tail.replace(/ (in all|altogether)$/, '') }], `数一数两组各有几只${zh}，写两个加法算式，再填一共有几只`, 'Write two addition sentences', { accept: [{ a, b, w, b2: b, a2: a, w2: w, t: w }, { a: b, b: a, w, b2: a, a2: b, w2: w, t: w }], label: `${zh}：${a} + ${b} = ${w}`, hint: { zh: `左边 ${a}，右边 ${b}。两个数交换位置加，结果一样。`, en: `${a} on the left, ${b} on the right.` } }); }) },
        { id: 'B', type: 'bond', title: { zh: '补全数字组合', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'l1bondpart', n: { w: 6, a: 2 }, title: { zh: '2 and 4 make 6', en: '2 and 4 make 6' } },
          questions: bondB.map(([w, a, b], i) => { const blank = w === null ? ['w'] : a === null ? ['a'] : ['b']; const W = w === null ? a + b : w, A = a === null ? W - b : a, Bv = b === null ? W - A : b;
            return B(`l1-3-1-B${i + 1}`, W, A, Bv, blank, w === null ? ['l1bondwhole', { a: A, b: Bv }] : ['l1bondpart', { w: W, a: blank[0] === 'a' ? Bv : A }], { prompt: w === null ? { zh: `${A} 和 ${Bv} 合起来是几？`, en: `${A} and ${Bv} make ___.` } : { zh: `整体是 ${W}，一部分是 ${blank[0] === 'a' ? Bv : A}，另一部分是几？`, en: `Find the missing part.` }, hint: { zh: w === null ? `从 ${A} 往后数 ${Bv} 个。` : `画 ${W} 个点，圈掉 ${blank[0] === 'a' ? Bv : A} 个，数剩下的。`, en: 'Use dots.' } }); }) },
      ],
    },
    {
      id: 'l1-3-2', available: true,
      title: { zh: '往后数做加法', en: 'Add by counting on' },
      intro: { zh: '加法可以“往后数”：第一个数不用重数，从它开始，第二个数是几就往后数几个，停在哪就是答案。', en: 'Start from the first number and count on. Where you stop is the answer.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '往后数，填加法算式', en: 'Complete the addition sentences by counting on' },
          example: { kind: 'l1counton', n: { a: 4, b: 2, icon: '🐚' }, title: { zh: '4 + 2：从 4 数，5、6', en: '4 + 2 = 6' } },
          questions: countA.map(([icon, a, b], i) => F(`l1-3-2-A${i + 1}`, pic(L.groups([{ icon, n: a }, { icon, n: b }])), `${a} + {{b}} = {{s}}`, { b: { a: b }, s: { a: a + b } }, ['l1counton', { a, b, icon }], `左边 ${a} 个，右边几个？从 ${a} 往后数`, `Count on from ${a}`, { label: `${a} + ${b} = ${a + b}`, hint: { zh: `右边有 ${b} 个。从 ${a} 开始往后数 ${b} 个。`, en: `Count on ${b} from ${a}.` } })) },
        { id: 'B', type: 'fill', title: { zh: '看方块写加法', en: 'Look at each picture carefully. Write the addition sentence on the lines provided' },
          example: { kind: 'l1cubes', n: { a: 4, b: 3 }, title: { zh: '4 + 3 = 7', en: '4 + 3 = 7' } },
          questions: cubesB.map(([a, b], i) => F(`l1-3-2-B${i + 1}`, pic(L.groups([{ icon: '🟧', n: a }, { icon: '🟧', n: b }])), `{{a}} + {{b}} = {{s}}`, { a: { a }, b: { a: b }, s: { a: a + b } }, ['l1cubes', { a, b }], '数一数两堆方块各几个，写加法算式', 'Write the addition sentence', { accept: [{ a, b, s: a + b }, { a: b, b: a, s: a + b }], label: `${a} + ${b} = ${a + b}`, hint: { zh: `左边 ${a} 个，右边 ${b} 个，从 ${a} 往后数。`, en: `${a} and ${b}.` } })) },
        { id: 'C', type: 'fill', title: { zh: 'more than：多几', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'l1morethan', n: { a: 3, b: 2 }, title: { zh: '2 more than 3 = 3 + 2 = 5', en: '2 more than 3 = 3 + 2 = 5' } },
          questions: moreC.map(([b, a], i) => F(`l1-3-2-C${i + 1}`, '', `${b} more than ${a} = {{x}} + {{y}} = {{s}}`, { x: { a }, y: { a: b }, s: { a: a + b } }, ['l1morethan', { a, b }], `比 ${a} 多 ${b} 是几？写成加法`, `${b} more than ${a}`, { accept: [{ x: a, y: b, s: a + b }, { x: b, y: a, s: a + b }], label: `${b} more than ${a} = ${a + b}`, hint: { zh: `“${b} more than ${a}” 就是 ${a} + ${b}。从 ${a} 往后数 ${b} 个。`, en: `${a} + ${b}.` } })) },
      ],
    },
    {
      id: 'l1-3-3', available: true,
      title: { zh: '加法算式和加法故事', en: 'Make addition equations and stories' },
      intro: { zh: '看图讲一个加法故事：几个这样、几个那样，合起来一共多少。圆圈填第一个数，三角填第二个数，方框填和。', en: 'Tell an addition story from the picture: circle + triangle = square.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '看图讲加法故事', en: 'Look at the pictures and make addition stories' },
          example: { kind: 'l1story', n: { pic: 'l1u3/zebras', a: 4, b: 2, la: 'zebras are eating grass', lb: 'zebras are not eating grass', noun: 'zebras' }, title: { zh: '4 只在吃草，2 只没吃：4 + 2 = 6', en: '4 + 2 = 6 zebras in all' } },
          questions: storyA.map(([name, a, b, la, lb, s1, s2, tail, zh], i) => F(`l1-3-3-A${i + 1}`, pic(img(name, 340)), `${s1}\n${s2}\n{{c}} + {{d}} = {{e}}\nThere are {{f}} ${tail}.`, { a: { a }, b: { a: b }, c: { a }, d: { a: b }, e: { a: a + b }, f: { a: a + b } }, ['l1story', { pic: 'l1u3/' + name, a, b, la, lb, noun: tail.replace(/ (in all|altogether)$/, '') }], `数一数图里的${zh}，讲一个加法故事`, 'Make an addition story', { accept: [{ a, b, c: a, d: b, e: a + b, f: a + b }, { a, b, c: b, d: a, e: a + b, f: a + b }], label: `${zh}：${a} + ${b} = ${a + b}`, hint: { zh: `第一句 ${a}，第二句 ${b}，加起来。`, en: `${a} + ${b}.` } })) },
        { id: 'B', type: 'pickone', title: { zh: '哪个算式等于圆圈里的数', en: 'Colour the correct rectangle to match the sum in the circle' },
          example: { kind: 'l1sumpick', n: { target: 9, options: [[2, 6], [3, 7], [4, 5], [5, 2]] }, title: { zh: '9 = 4 + 5', en: '4 + 5 = 9' } },
          questions: pickB.map(([target, options], i) => ({ id: `l1-3-3-B${i + 1}`, type: 'pickone', pic: pic(`<span class="bond-c w" style="position:static;display:inline-flex">${target}</span>`), label: `${target} = ?：${options.map(([x, y]) => x + '+' + y).join(' / ')}`, options: options.map(([x, y]) => `<span class="sum-opt">${x} + ${y}</span>`), answer: options.findIndex(([x, y]) => x + y === target), prompt: { zh: `哪个算式等于 ${target}？点它`, en: `Which one makes ${target}?` }, hint: { zh: '每个算式都算一算。', en: 'Work out each one.' }, explain: ['l1sumpick', { target, options }] })) },
        { id: 'C', type: 'fill', title: { zh: '填缺的数', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'l1missing', n: { b: 6, sum: 9 }, title: { zh: '___ + 6 = 9：从 6 数到 9 跳了 3 下', en: '3 + 6 = 9' } },
          questions: missC.map(([a, b, sum], i) => F(`l1-3-3-C${i + 1}`, '', a !== null ? `${a} + {{x}} = ${sum}` : `{{x}} + ${b} = ${sum}`, { x: { a: sum - (a !== null ? a : b) } }, ['l1missing', a !== null ? { a, sum } : { b, sum }], `空格填几，才能等于 ${sum}？`, 'Fill in the missing number', { label: a !== null ? `${a} + ___ = ${sum}` : `___ + ${b} = ${sum}`, hint: { zh: `从 ${a !== null ? a : b} 往后数到 ${sum}，数跳了几下。`, en: `Count on from ${a !== null ? a : b} to ${sum}.` } })) },
      ],
    },
    {
      id: 'l1-3-4', available: true,
      title: { zh: '一步加法应用题', en: 'Solve one-step addition story sums' },
      intro: { zh: '读题找两个数，问“一共 / altogether / in all”就用加法。先写算式，再写答句。', en: 'Find the two numbers. "Altogether" or "in all" means add.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '写算式，写答句', en: 'Do these story sums carefully. Show your working clearly' },
          example: { kind: 'l1word', n: { en: 'There are 4 people standing in a room. There are 5 people sitting in the same room. How many people are there in the room altogether?', zh: '房间里有 4 个人站着，5 个人坐着。房间里一共有几个人？', a: 4, b: 5, la: 'standing', lb: 'sitting', sentence: 'There are ___ people in the room altogether.' }, title: { zh: '4 + 5 = 9', en: '4 + 5 = 9' } },
          questions: wordA.map(([en, zh, a, b, la, lb, sent], i) => F(`l1-3-4-A${i + 1}`, wp(en, zh), `{{c}} + {{d}} = {{e}}\n${sent.replace('___', '{{f}}')}`, { c: { a }, d: { a: b }, e: { a: a + b }, f: { a: a + b } }, ['l1word', { en, zh, a, b, la, lb, sentence: sent }], '读题，写加法算式，再填答句', en, { accept: [{ c: a, d: b, e: a + b, f: a + b }, { c: b, d: a, e: a + b, f: a + b }], label: en, hint: { zh: `两个数是 ${a} 和 ${b}，问一共，用加法。`, en: `${a} + ${b}.` } })) },
        { id: 'B', type: 'fill', title: { zh: '一共有多少？', en: 'How many are there altogether? Write the correct answers on the lines provided' },
          example: { kind: 'l1word', n: { en: 'There are 3 pink roses in a garden. There are 3 red roses in the same garden. How many roses are there altogether?', zh: '花园里有 3 朵粉玫瑰和 3 朵红玫瑰。一共有几朵玫瑰？', a: 3, b: 3, la: 'pink', lb: 'red', sentence: 'There are ___ roses altogether.' }, title: { zh: '3 + 3 = 6', en: '3 + 3 = 6' } },
          questions: wordB.map(([en, zh, a, b, la, lb, sent], i) => F(`l1-3-4-B${i + 1}`, wp(en, zh), sent.replace('___', '{{f}}'), { f: { a: a + b } }, ['l1word', { en, zh, a, b, la, lb, sentence: sent }], '读题，算一算一共有多少', en, { label: en, hint: { zh: `${a} + ${b}，从 ${a} 往后数 ${b} 个。`, en: `${a} + ${b}.` } })) },
      ],
    },
  ];
})();
