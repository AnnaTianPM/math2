/* Level 1 · Unit 9  长度 */
(function () {
  const U = window.MATH_DATA.levels[1].units;
  const unit = num => U.find(u => u.num === num);
  const L = window.L1;
  const pic = html => `<div class="center">${html}</div>`;
  const img = (name, w) => L.img('l1u9/' + name, w || 420);
  const choice = (a, options) => ({ a, kind: 'choice', options });
  const TSL = ['taller', 'shorter', 'longer'];
  const F = (id, p, text, fields, explain, zh, en, o) => Object.assign({ id, type: 'fill', pic: p, label: text.replace(/\{\{\w+\}\}/g, '___').replace(/\n/g, ' '), prompt: { zh, en: en || 'Fill in the blanks' }, text, fields, answerText: Object.values(fields).map(f => f.a).join(', '), explain }, o || {});
  const pick = (id, p, opts, ans, zh, en, explain, hint) => ({ id, type: 'pickone', pic: pic(img(p, 360)), label: en, options: opts, answer: ans, prompt: { zh, en }, hint: hint || { zh: '把两样东西的一头对齐，看另一头。', en: 'Line up one end.' }, explain });
  const P = (pic, steps, w) => ['l1pic', { pic: 'l1u9/' + pic, w: w || 420, steps }];
  const EX = (pic, steps, w, title) => ({ kind: 'l1pic', n: { pic: 'l1u9/' + pic, w: w || 420, steps }, title });

  /* KP1 */
  const pickA = [['a1', '哪座楼更高？', 'Which is taller?', ['左边的楼', '右边的楼'], 1, 'building', 'taller'], ['a2', '哪面旗更矮？', 'Which is shorter?', ['左边的旗', '右边的旗'], 0, 'flag', 'shorter'], ['a3', '哪条皮带更长？', 'Which is longer?', ['上面的皮带', '下面的皮带'], 1, 'belt', 'longer'], ['a4', '订书机和剪刀，哪个更短？', 'Which is shorter?', ['订书机 stapler', '剪刀 scissors'], 0, 'stapler', 'shorter'], ['a5', '狗和猫，哪个更高？', 'Which is taller?', ['狗 dog', '猫 cat'], 0, 'dog', 'taller'], ['a6', '机器人和玩具兵，哪个更矮？', 'Which is shorter?', ['机器人 robot', '玩具兵 toy soldier'], 1, 'toy soldier', 'shorter'], ['a7', '鳄鱼和蜥蜴，哪个更长？', 'Which is longer?', ['鳄鱼 crocodile', '蜥蜴 lizard'], 0, 'crocodile', 'longer'], ['a8', '胡萝卜和辣椒，哪个更短？', 'Which is shorter?', ['胡萝卜 carrot', '辣椒 chilli'], 1, 'chilli', 'shorter']];
  const cmpB = [['b1', 'sun hat', 'top hat', 'shorter', 'taller'], ['b2', 'pencil case', 'briefcase', 'shorter', 'longer'], ['b3', 'elephant', 'lion', 'taller', 'shorter'], ['b4', 'sandwich', 'french loaf', 'shorter', 'longer'], ['b5', 'Sherine', 'Shermaine', 'shorter', 'taller'], ['b6', 'earthworm', 'caterpillar', 'longer', 'shorter'], ['b7', 'tree', 'lamp post', 'taller', 'shorter'], ['b8', 'boat', 'shark', 'shorter', 'longer']];
  const drawC = [['c1', 'shorter', 'bush 灌木'], ['c2', 'longer', 'arm 手臂'], ['c3', 'taller', 'cupboard 柜子'], ['c4', 'shorter', 'snake 蛇'], ['c5', 'shorter', 'skirt 裙子'], ['c6', 'longer', 'bus 公交车'], ['c7', 'taller', 'cake 蛋糕'], ['c8', 'shorter', 'racket 球拍']];
  /* KP2 */
  const multi = [
    ['m1', ['sneakers', 'boots', 'slippers'], 'tall', ['boots', 'sneakers', 'slippers'], 'The sneakers are {{a}} than the boots.\nThe boots are {{b}} than the slippers.\nThe {{c}} are the shortest.\nThe {{d}} are the tallest.', { a: 'shorter', b: 'taller', c: 'slippers', d: 'boots' }],
    ['m2', ['Nancy', 'Joey', 'Amanda', 'Sally'], 'tall', ['Amanda', 'Nancy', 'Joey', 'Sally'], 'Nancy is {{a}} than Joey.\nSally is {{b}} than Amanda.\n{{c}} is the tallest.\n{{d}} is the shortest.', { a: 'taller', b: 'shorter', c: 'Amanda', d: 'Sally' }],
    ['m3', ['trumpet', 'violin', 'guitar'], 'long', ['guitar', 'trumpet', 'violin'], 'The trumpet is {{a}} than the violin.\nThe violin is {{b}} than the guitar.\nThe {{c}} is the longest.\nThe {{d}} is the shortest.', { a: 'longer', b: 'shorter', c: 'guitar', d: 'violin' }],
    ['m4', ['squid', 'whale', 'shark', 'dolphin'], 'long', ['whale', 'shark', 'dolphin', 'squid'], 'The squid is {{a}} than the whale.\nThe shark is {{b}} than the dolphin.\nThe {{c}} is the shortest.\nThe {{d}} is the longest.', { a: 'shorter', b: 'longer', c: 'squid', d: 'whale' }],
    ['m5', ['Albert', 'Bradford', 'Cody'], 'tall', ['Albert', 'Cody', 'Bradford'], 'Cody is {{a}} than Bradford but {{b}} than Albert.\n{{c}} is the tallest.\n{{d}} is the shortest.', { a: 'taller', b: 'shorter', c: 'Albert', d: 'Bradford' }],
    ['m6', ['shorts', 'pants', 'bermudas'], 'long', ['pants', 'bermudas', 'shorts'], 'The bermudas are {{a}} than the pants but {{b}} than the shorts.\nThe {{c}} are the shortest.\nThe {{d}} are the longest.', { a: 'shorter', b: 'longer', c: 'shorts', d: 'pants' }],
    ['m7', ['hamster', 'rabbit', 'tortoise', 'parrot'], 'tall', ['rabbit', 'parrot', 'hamster', 'tortoise'], 'The parrot is {{a}} than the rabbit.\nThe hamster is {{b}} than the tortoise.\nThe {{c}} is the shortest.\nThe {{d}} is the tallest.', { a: 'shorter', b: 'taller', c: 'tortoise', d: 'rabbit' }],
    ['m8', ['umbrella', 'broom', 'torchlight', 'feather duster'], 'long', ['broom', 'umbrella', 'feather duster', 'torchlight'], 'The feather duster is {{a}} than the torchlight.\nThe umbrella is {{b}} than the broom.\nThe {{c}} is the longest.\nThe {{d}} is the shortest.', { a: 'longer', b: 'shorter', c: 'broom', d: 'torchlight' }],
  ];
  const logicD = [['Box A is taller than Box B but shorter than Box C.', '盒子 A 比 B 高，但比 C 矮。', 'Box {{a}} is the tallest.\nBox {{b}} is the shortest.', { a: 'C', b: 'B' }, ['A', 'B', 'C'], 'C > A > B'], ['Crayon A is shorter than Crayon B but longer than Crayon C.', '蜡笔 A 比 B 短，但比 C 长。', 'Crayon {{a}} is the shortest.\nCrayon {{b}} is the longest.', { a: 'C', b: 'B' }, ['A', 'B', 'C'], 'B > A > C'], ['Bottle A is shorter than Bottle B but taller than Bottle C. Bottle D is the shortest.', '瓶子 A 比 B 矮，但比 C 高。D 最矮。', 'Bottle {{a}} is the tallest.\nBottle {{b}} is the shortest.', { a: 'B', b: 'D' }, ['A', 'B', 'C', 'D'], 'B > A > C > D'], ['String A is longer than String B but shorter than String C. String D is the longest.', '绳子 A 比 B 长，但比 C 短。D 最长。', 'String {{a}} is the longest.\nString {{b}} is the shortest.', { a: 'D', b: 'B' }, ['A', 'B', 'C', 'D'], 'D > C > A > B']];
  /* KP3 */
  const startS = [['s1', 'trees', 'Tree', 'tall', 'D', 'E'], ['s2', 'nails', 'Nail', 'long', 'A', 'C'], ['s3', 'teddy bears', 'Teddy bear', 'tall', 'B', 'D'], ['s4', 'fish', 'Fish', 'long', 'E', 'A']];
  /* KP4 */
  const objA = [['o1', 'snail 蜗牛', 'snail', 2, 'blocks 方块'], ['o2', 'pencil case 铅笔盒', 'pencil case', 5, 'paper clips 回形针'], ['o3', 'purse 钱包', 'purse', 6, 'coins 硬币'], ['o4', 'laptop 电脑', 'laptop computer', 8, 'pins 大头针'], ['o5', 'racket 球拍', 'racket', 12, 'nuts 螺母'], ['o6', 'sofa 沙发', 'sofa', 8, 'shoes 鞋']];
  const objB = [['p1', 'shoe 鞋', 'shoe', 'coins', 9, 'ice cream sticks', 3], ['p2', 'clock 闹钟', 'clock', 'paper clips', 8, 'matchsticks', 5], ['p3', 'rolling pin 擀面杖', 'rolling pin', 'spoons', 4, 'rulers', 2], ['p4', 'banana 香蕉', 'banana', 'marbles', 10, 'sweets', 7], ['p5', 'fish 鱼', 'fish', 'toothpicks', 7, 'chillies', 4], ['p6', 'rope 绳子', 'rope', 'buttons', 13, 'needles', 5], ['p7', 'flute 长笛', 'flute', 'keys', 6, 'pencils', 4], ['p8', 'hockey stick 曲棍球杆', 'hockey stick', 'pucks', 15, 'wrenches', 6], ['p9', 'handbag 手提包', 'handbag', 'safety pins', 8, 'hairbrushes', 3], ['p10', 'fishing rod 鱼竿', 'fishing rod', 'baits', 14, 'bottles', 7]];
  /* KP5 */
  const unitsA = [['u1', 'fluorescent light 日光灯', 'fluorescent light', 18], ['u2', 'hot dog 热狗', 'hot dog sandwich', 5], ['u3', 'hi-fi 音响', 'hi-fi system', 9], ['u4', 'folder 文件夹', 'folder', 10], ['u5', 'long bean 长豆', 'long bean', 16], ['u6', 'goal post 球门', 'goal post', 20], ['u7', 'car 汽车', 'car', 7], ['u8', 'bathtub 浴缸', 'bathtub', 17]];
  const ABC = ['A', 'B', 'C'], ABCD = ['A', 'B', 'C', 'D'], ABCDEF = ['A', 'B', 'C', 'D', 'E', 'F'];
  const room = [['The door is {{a}} units tall.', { a: 6 }], ['The couch is {{a}} units long and {{b}} units tall.', { a: 6, b: 3 }], ['The fan is {{a}} units long.', { a: 4 }], ['The painting is {{a}} units long and {{b}} units tall.', { a: 8, b: 2 }], ['The dining table is {{a}} units long and {{b}} units tall.', { a: 4, b: 2 }], ['The fruit basket is {{a}} units long and {{b}} units tall.', { a: 2, b: 2 }], ['The bed is {{a}} units long and {{b}} units tall.', { a: 6, b: 4 }], ['The air conditioner is {{a}} units long.', { a: 3 }], ['The dressing table is {{a}} units long and {{b}} units tall.', { a: 3, b: 5 }], ['The cupboard is {{a}} units long and {{b}} units tall.', { a: 5, b: 7 }]];
  const roomW = [['The door is {{a}} than the couch.', 'taller'], ['The dining table is {{a}} than the cupboard.', 'shorter'], ['The fan is {{a}} than the air conditioner.', 'longer'], ['The fruit basket is {{a}} than the dressing table.', 'shorter']];
  const ROOMS = ['cupboard', 'dressing table', 'air conditioner', 'bed', 'fan', 'painting', 'couch', 'door', 'fruit basket', 'dining table'];

  unit(9).kps = [
    {
      id: 'l1-9-1', available: true,
      title: { zh: '比高矮、比长短', en: 'Compare lengths and heights' },
      intro: { zh: 'tall 高、short 矮/短、long 长。比的时候把一头对齐，看另一头。taller 更高，shorter 更矮/更短，longer 更长。', en: 'tall, short, long. Line up one end and compare the other. taller, shorter, longer.' },
      sections: [
        { id: 'A', type: 'pickone', title: { zh: '哪个更高/更矮/更长', en: 'Circle the correct answer' },
          example: EX('bex', [{ zh: '两条丝带一头对齐，上面的短一截：上面的 shorter。两个人站在一起，左边的头高：左边的 taller。', en: 'Line up one end. The one that sticks out more is longer / taller.', line: 'shorter · taller' }], 460, { zh: '一头对齐比一比', en: 'Line up one end and compare' }),
          questions: pickA.map(([p, zh, en, opts, ans, name, word], i) => pick(`l1-9-1-A${i + 1}`, p, opts, ans, zh, en, P(p, [{ zh: `两个一头对齐比一比：${opts[ans]} ${word === 'taller' ? '更高' : word === 'longer' ? '更长' : '更短/更矮'}。`, en: `The ${name} is ${word}.`, line: `${name}: ${word}` }], 440))) },
        { id: 'B', type: 'fill', title: { zh: '填 taller、shorter 或 longer', en: 'Fill in each blank with "taller", "shorter" or "longer"' },
          example: { kind: 'l1len2', n: { pic: 'l1u9/bex', a: 'Tim', b: 'Danny', word: 'taller', w: 460 }, title: { zh: 'Tim is taller than Danny; Danny is shorter than Tim', en: 'taller / shorter' } },
          questions: cmpB.map(([p, a, b, w1, w2], i) => F(`l1-9-1-B${i + 1}`, pic(img(p, 440)), `The ${a} is {{x}} than the ${b}.\nThe ${b} is {{y}} than the ${a}.`.replace(/The Sherine/, 'Sherine').replace(/the Shermaine/, 'Shermaine').replace(/The Shermaine/, 'Shermaine').replace(/the Sherine/, 'Sherine'), { x: choice(w1, TSL), y: choice(w2, TSL) }, ['l1len2', { pic: 'l1u9/' + p, a, b, word: w1, w: 440 }], `${a} 和 ${b} 比，谁高谁矮（谁长谁短）？`, 'taller, shorter or longer?', { label: `${a} ${w1} than ${b}`, hint: { zh: '站着的东西比高矮（taller/shorter），躺着的比长短（longer/shorter）。', en: 'Standing: taller/shorter. Lying: longer/shorter.' } })) },
        { id: 'C', type: 'sizepick', title: { zh: '画一个更高/更矮/更长的', en: 'Draw a taller, shorter or longer object' },
          example: EX('cex', [{ zh: '画 a taller glass（更高的杯子）：要比原来的高。画 a shorter screwdriver（更短的螺丝刀）：要比原来的短。', en: 'A taller glass is higher than the original. A shorter screwdriver is shorter.', line: 'taller · shorter' }], 460, { zh: '更高的杯子、更短的螺丝刀', en: 'a taller glass, a shorter screwdriver' }),
          questions: drawC.map(([p, want, name], i) => ({ id: `l1-9-1-C${i + 1}`, type: 'sizepick', pic: 'l1u9/' + p, want, name, label: `a ${want} ${name}` })) },
      ],
    },
    {
      id: 'l1-9-2', available: true,
      title: { zh: '几个一起比', en: 'Compare more than two objects' },
      intro: { zh: '最高 tallest、最长 longest、最短 shortest。先找最高和最矮的，再两两比。', en: 'tallest, longest, shortest. Find the ends first, then compare pairs.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '看图填一填', en: 'Look at the pictures and fill in each blank with the correct answer' },
          example: { kind: 'l1len3', n: { pic: 'l1u9/m1', order: ['boots', 'sneakers', 'slippers'], kind: 'tall', w: 440 }, title: { zh: 'boots 最高，slippers 最矮', en: 'boots tallest, slippers shortest' } },
          questions: multi.map(([p, names, kind, order, text, ans], i) => { const fields = {}; Object.keys(ans).forEach(k => { fields[k] = choice(ans[k], TSL.includes(ans[k]) ? TSL : names); });
            return F(`l1-9-2-A${i + 1}`, pic(img(p, 440)), text, fields, ['l1len3', { pic: 'l1u9/' + p, order, kind, w: 440 }], `比一比 ${names.join('、')}`, 'Compare', { label: `${names.join('/')}：${order.join(' > ')}`, hint: { zh: `从${kind === 'tall' ? '高' : '长'}到短：${order.join(' > ')}。`, en: order.join(' > ') } }); }) },
        { id: 'B', type: 'fill', title: { zh: '读句子想一想', en: 'Read each sentence carefully and fill in each blank' },
          example: { kind: 'l1pic', n: { steps: [{ zh: 'Box A 比 B 高、比 C 矮，说明 C 比 A 高，A 比 B 高：C > A > B。最高 C，最矮 B。', en: 'A is taller than B but shorter than C: C > A > B.', line: 'C > A > B' }] }, title: { zh: '按句子排顺序', en: 'Order from the sentence' } },
          questions: logicD.map(([en, zh, text, ans, opts, order], i) => F(`l1-9-2-B${i + 1}`, `<div class="wp-text"><div class="wp-en">${en}</div><div class="wp-zh">${zh}</div></div>`, text, { a: choice(ans.a, opts), b: choice(ans.b, opts) }, ['l1pic', { steps: [{ zh: `${zh}排一排：<b>${order}</b>。`, en: order, line: order }, { zh: `所以最前面的是最${en.includes('long') ? '长' : '高'}，最后面的最短：${ans.a}、${ans.b}。`, en: `${ans.a}, ${ans.b}.`, line: `${ans.a} · ${ans.b}` }] }], '读句子，想一想谁最高（最长）、谁最矮（最短）', en, { label: en, hint: { zh: `排一排：${order}。`, en: order } })) },
      ],
    },
    {
      id: 'l1-9-3', available: true,
      title: { zh: '从起跑线开始比', en: 'Compare lengths from a common starting line' },
      intro: { zh: '大家都从同一条起跑线出发，看另一头谁最远，谁就最高（最长）。', en: 'All start from the same line. The one reaching farthest is the tallest or longest.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '起跑线', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'l1startline', n: { pic: 'l1u9/s1', w: 440, est: 'D', shortest: 'E', kind: 'tall' }, title: { zh: '树 D 最高，树 E 最矮', en: 'Tree D is the tallest. Tree E is the shortest.' } },
          questions: startS.map(([p, noun, Noun, kind, est, sh], i) => F(`l1-9-3-A${i + 1}`, pic(img(p, 440)), kind === 'tall' ? `${Noun} {{a}} is the tallest.\n${Noun} {{b}} is the shortest.` : `${Noun} {{a}} is the longest.\n${Noun} {{b}} is the shortest.`, { a: choice(est, ['A', 'B', 'C', 'D', 'E']), b: choice(sh, ['A', 'B', 'C', 'D', 'E']) }, ['l1startline', { pic: 'l1u9/' + p, w: 440, est, shortest: sh, kind }], `${noun} 都从起跑线开始，哪个最${kind === 'tall' ? '高' : '长'}、哪个最短？`, 'Which is the tallest / longest? Which is the shortest?', { label: `${noun}：${est} 最${kind === 'tall' ? '高' : '长'}，${sh} 最短`, hint: { zh: '看离起跑线最远的一头。', en: 'Look at the far end.' } })) },
      ],
    },
    {
      id: 'l1-9-4', available: true,
      title: { zh: '用东西量长度', en: 'Measure length using common objects' },
      intro: { zh: '把小东西一个挨一个排好，数有几个，就说“大约几个……长”。东西越小，用得越多。', en: 'Lay objects end to end and count. Smaller objects need more of them.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '数一数有几个', en: 'Count and fill in each blank with the correct answer' },
          example: { kind: 'l1measure', n: { pic: 'l1u9/oex', w: 420, items: [{ name: 'blocks', n: 4 }] }, title: { zh: '青蛙大约 4 块积木长', en: 'The frog is about 4 blocks long' } },
          questions: objA.map(([p, zh, name, n, unit], i) => F(`l1-9-4-A${i + 1}`, pic(img(p, 420)), `The ${name} is about {{a}} ${unit.split(' ')[0]} long.`, { a: { a: n } }, ['l1measure', { pic: 'l1u9/' + p, w: 420, items: [{ name: unit.split(' ')[0], n }] }], `${zh}大约几个${unit.split(' ')[1]}长？数一数`, 'How many?', { label: `${zh}：${n} ${unit}`, hint: { zh: '一个一个数排在下面的小东西。', en: 'Count the objects.' } })) },
        { id: 'B', type: 'fill', title: { zh: '用两种东西量', en: 'Count and fill in each blank with the correct answer' },
          example: { kind: 'l1measure', n: { pic: 'l1u9/pex', w: 420, items: [{ name: 'stamps', n: 6 }, { name: 'highlighter pens', n: 2 }] }, title: { zh: '信封大约 6 张邮票长，也是 2 支荧光笔长', en: '6 stamps long, 2 highlighter pens long' } },
          questions: objB.map(([p, zh, name, u1, n1, u2, n2], i) => F(`l1-9-4-B${i + 1}`, pic(img(p, 420)), `(a) The ${name} is about {{a}} ${u1} long.\n(b) It is about {{b}} ${u2} long.`, { a: { a: n1 }, b: { a: n2 } }, ['l1measure', { pic: 'l1u9/' + p, w: 420, items: [{ name: u1, n: n1 }, { name: u2, n: n2 }] }], `${zh}大约几个 ${u1}、几个 ${u2} 长？`, 'Count both rows', { label: `${zh}：${n1} ${u1}，${n2} ${u2}`, hint: { zh: '两排分别数。小的东西数出来多，大的少。', en: 'Count each row.' } })) },
      ],
    },
    {
      id: 'l1-9-5', available: true,
      title: { zh: '用 unit 量长度', en: 'Measure length in units' },
      intro: { zh: '规定一个小东西或一个格子是 1 unit，数有几个 unit。', en: 'One object or one square is 1 unit. Count the units.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '几个 unit 长', en: 'Count and fill in each blank with the correct answer' },
          example: { kind: 'l1units', n: { pic: 'l1u9/uex', w: 420, lines: [{ zh: '每个瓶盖是 1 unit。数一数：7 个，所以饮料箱大约 7 units 长。', en: 'Each cap is 1 unit: 7 units long.', line: 'about 7 units long' }] }, title: { zh: '7 units', en: '7 units long' } },
          questions: unitsA.map(([p, zh, name, n], i) => F(`l1-9-5-A${i + 1}`, pic(img(p, 420)), `The ${name} is about {{a}} units long.`, { a: { a: n } }, ['l1units', { pic: 'l1u9/' + p, w: 420, lines: [{ zh: `数一数下面的小东西：<b>${n}</b> 个，所以大约 ${n} units 长。`, en: `${n} units long.`, line: `about ${n} units long` }] }], `${zh}大约几个 unit 长？`, 'How many units?', { label: `${zh}：${n} units`, hint: { zh: '每个小东西是 1 unit，数一数。', en: 'Count.' } })) },
        { id: 'B', type: 'fill', title: { zh: '数格子', en: 'Look at the picture and fill in each blank with the correct answer' },
          example: { kind: 'l1units', n: { pic: 'l1u9/g1', w: 440, lines: [{ zh: '鱼 A 从头到尾跨了 9 条格子线：9 units。竖线每两条之间是 1 unit。', en: 'Fish A spans 9 units.', line: 'A: 9 units' }] }, title: { zh: '从头到尾数格子', en: 'Count the squares from end to end' } },
          questions: [
            F('l1-9-5-B1', pic(img('g1', 460)), '(a) Fish A is about {{a}} units long.\n(b) Fish B is about {{b}} units long.\n(c) Fish C is about {{c}} units long.\n(d) Fish D is about {{d}} units long.\n(e) Fish {{e}} is the longest.\n(f) Fish {{f}} is the shortest.', { a: { a: 9 }, b: { a: 7 }, c: { a: 12 }, d: { a: 10 }, e: choice('C', ABCD), f: choice('B', ABCD) }, ['l1units', { pic: 'l1u9/g1', w: 460, lines: [{ zh: 'A 9 units，B 7 units，C 12 units，D 10 units。', en: 'A 9, B 7, C 12, D 10.', line: 'A 9 · B 7 · C 12 · D 10' }, { zh: '最长 C（12），最短 B（7）。', en: 'Longest C, shortest B.', line: 'longest C · shortest B' }] }], '每条鱼从头到尾占几格？', 'Count the units', { label: '鱼 A-D：9, 7, 12, 10', hint: { zh: '从鱼嘴数到鱼尾，一格 1 unit。', en: 'Count from nose to tail.' } }),
            F('l1-9-5-B2', pic(img('g2', 460)), '(a) Beetle A is about {{a}} units long.\n(b) Beetle B is about {{b}} units long.\n(c) Beetle C is about {{c}} units long.\n(d) Beetle D is about {{d}} units long.\n(e) Beetle {{e}} is the shortest.\n(f) Beetle {{f}} is the longest.', { a: { a: 6 }, b: { a: 9 }, c: { a: 8 }, d: { a: 11 }, e: choice('A', ABCD), f: choice('D', ABCD) }, ['l1units', { pic: 'l1u9/g2', w: 460, lines: [{ zh: 'A 6 units，B 9 units，C 8 units，D 11 units。', en: 'A 6, B 9, C 8, D 11.', line: 'A 6 · B 9 · C 8 · D 11' }, { zh: '最短 A（6），最长 D（11）。', en: 'Shortest A, longest D.', line: 'shortest A · longest D' }] }], '每只甲虫从头到脚占几格（横线）？', 'Count the units', { label: '甲虫 A-D：6, 9, 8, 11', hint: { zh: '横线每两条之间是 1 unit，从上数到下。', en: 'Count the rows.' } }),
          ] },
        { id: 'C', type: 'fill', title: { zh: '方格里的纸条', en: 'Each square stands for 1 unit. Fill in each blank with the correct answer' },
          example: { kind: 'l1units', n: { pic: 'l1u9/strips', w: 360, lines: [{ zh: 'A 横着占 4 格：4 units。B 竖着占 3 格：3 units。C 竖 5 格，D 横 2 格，E 横 2 格，F 1 格。', en: 'A 4, B 3, C 5, D 2, E 2, F 1.', line: 'A4 B3 C5 D2 E2 F1' }] }, title: { zh: '数每条占几格', en: 'Count the squares' } },
          questions: [F('l1-9-5-C1', pic(img('strips', 360)), 'Strip {{a}} is the longest. It is {{b}} units long.\nStrip {{c}} is the shortest. It is {{d}} unit long.\nStrip {{e}} is as long as Strip {{f}}. They are both {{g}} units long.\nStrip {{h}} is longer than Strip B but shorter than Strip C.\nThe strip that is 3 units long is Strip {{i}}.', { a: choice('C', ABCDEF), b: { a: 5 }, c: choice('F', ABCDEF), d: { a: 1 }, e: choice('D', ABCDEF), f: choice('E', ABCDEF), g: { a: 2 }, h: choice('A', ABCDEF), i: choice('B', ABCDEF) }, ['l1units', { pic: 'l1u9/strips', w: 360, lines: [{ zh: 'A 4，B 3，C 5，D 2，E 2，F 1。', en: 'A 4, B 3, C 5, D 2, E 2, F 1.', line: 'A4 B3 C5 D2 E2 F1' }, { zh: '最长 C（5），最短 F（1），D 和 E 一样长（2），比 B（3）长比 C（5）短的是 A（4），3 units 的是 B。', en: 'C longest, F shortest, D = E, A is between B and C, B is 3 units.', line: 'C · F · D=E · A · B' }] }], '数每条纸条占几格，再回答', 'Count each strip', { accept: [{ a: 'C', b: 5, c: 'F', d: 1, e: 'D', f: 'E', g: 2, h: 'A', i: 'B' }, { a: 'C', b: 5, c: 'F', d: 1, e: 'E', f: 'D', g: 2, h: 'A', i: 'B' }], label: '纸条：C 最长 5，F 最短 1，D=E 2，A 4，B 3', hint: { zh: 'A 4，B 3，C 5，D 2，E 2，F 1。', en: 'A4 B3 C5 D2 E2 F1' } })] },
        { id: 'D', type: 'fill', title: { zh: '房间里的东西', en: 'Look at the picture carefully and fill in each blank. Each square stands for 1 unit' },
          example: { kind: 'l1units', n: { pic: 'l1u9/room', w: 460, lines: [{ zh: '门竖着占 6 格：6 units tall。沙发横 6 格、竖 3 格：6 units long，3 units tall。', en: 'Door 6 units tall. Couch 6 long, 3 tall.', line: 'door 6 · couch 6 × 3' }] }, title: { zh: '横着数是 long，竖着数是 tall', en: 'Across: long. Up: tall.' } },
          questions: [
            ...room.map(([text, ans], i) => F(`l1-9-5-D${i + 1}`, pic(img('room', 460)), text, Object.fromEntries(Object.entries(ans).map(([k, v]) => [k, { a: v }])), ['l1units', { pic: 'l1u9/room', w: 460, lines: [{ zh: `横着数格子是 long，竖着数是 tall：${text.replace(/\{\{a\}\}/, ans.a).replace(/\{\{b\}\}/, ans.b)}`, en: text.replace(/\{\{a\}\}/, ans.a).replace(/\{\{b\}\}/, ans.b), line: Object.values(ans).join(' × ') }] }], '数格子：横着几格是 long，竖着几格是 tall', 'Count the squares', { label: text.replace(/\{\{\w+\}\}/g, '__'), hint: { zh: '沿着东西的边数格子。', en: 'Count along the edges.' } })),
            ...roomW.map(([text, ans], i) => F(`l1-9-5-D${11 + i}`, pic(img('room', 460)), text, { a: choice(ans, TSL) }, ['l1units', { pic: 'l1u9/room', w: 460, lines: [{ zh: text.replace('{{a}}', ans), en: text.replace('{{a}}', ans), line: ans }] }], '比一比格子数', 'Compare', { label: text.replace('{{a}}', ans), hint: { zh: '数两样东西各占几格再比。', en: 'Count both.' } })),
            F('l1-9-5-D15', pic(img('room', 460)), 'The {{a}} is the tallest and the {{b}} is the shortest.', { a: choice('cupboard', ROOMS), b: choice('fan', ROOMS) }, ['l1units', { pic: 'l1u9/room', w: 460, lines: [{ zh: '竖着数：柜子 7 格最高；风扇和空调都只有 1 格最矮（答 fan 或 air conditioner 都对）。', en: 'Cupboard 7 units tall. Fan / air conditioner 1 unit.', line: 'tallest cupboard · shortest fan' }] }], '哪样东西最高、哪样最矮？', 'tallest and shortest', { accept: [{ a: 'cupboard', b: 'fan' }, { a: 'cupboard', b: 'air conditioner' }], label: '最高 cupboard，最矮 fan / air conditioner', hint: { zh: '竖着数格子。', en: 'Count up.' } }),
            F('l1-9-5-D16', pic(img('room', 460)), 'The {{a}} is the longest and the {{b}} is the shortest.', { a: choice('painting', ROOMS), b: choice('fruit basket', ROOMS) }, ['l1units', { pic: 'l1u9/room', w: 460, lines: [{ zh: '横着数：画 8 格最长；果篮 2 格最短。', en: 'Painting 8 units long. Fruit basket 2 units.', line: 'longest painting · shortest fruit basket' }] }], '哪样东西最长、哪样最短？', 'longest and shortest', { label: '最长 painting，最短 fruit basket', hint: { zh: '横着数格子。', en: 'Count across.' } }),
          ] },
      ],
    },
  ];
})();
