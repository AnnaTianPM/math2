/* Unit 17 容量 */
(function () {
  const U = window.MATH_DATA.units;
  const unit = num => U.find(u => u.num === num);
  const VU = window.VolUI;
  const S = (en, zh) => ({ en, zh });
  const choice = (a, options) => ({ a, kind: 'choice', options });
  const pic = html => `<div class="center">${html}</div>`;
  const vrow = items => VU.row(items.map(it => VU.vessel(it)));
  const W = (id, en, zh, model, sentence) => ({ id, type: 'word', en, zh, model, sentence });
  const W2 = (id, en, zh, s1, s2) => ({ id, type: 'word2', en, zh, steps: [s1, s2] });
  const A_ = parts => ({ kind: 'add', parts: parts.map(([label, v]) => ({ label, v })) });
  const Sb = (whole, known, unk) => ({ kind: 'sub', whole: { label: whole[0], v: whole[1] }, known: { label: known[0], v: known[1] }, unknown: { label: unk } });
  const mulDivW = (id, en, zh, a, b, op, sentence, emoji, noun) => { const isMul = op === '×', ans = isMul ? a * b : a / b;
    return { id, type: 'fill', label: en, prompt: { zh, en }, text: `{{x}} ${isMul ? '×' : '÷'} {{y}} = {{z}}\n${sentence.replace('___', '{{d}}')}`, fields: { x: { a: a }, y: { a: b }, z: { a: ans }, d: { a: ans } }, accept: isMul ? [{ x: a, y: b, z: ans, d: ans }, { x: b, y: a, z: ans, d: ans }] : undefined,
      answerText: `${a} ${isMul ? '×' : '÷'} ${b} = ${ans}`, explain: isMul ? ['mulgroups', { groups: a, each: b, emoji, noun }] : op === '÷g' ? ['divgroup', { total: a, each: b, emoji, noun }] : ['divshare', { total: a, groups: b, emoji, noun }], hint: isMul ? { zh: `${a} 个 ${b} l，用乘法。`, en: 'Multiply.' } : { zh: `一共 ${a} l，平均分，用除法。`, en: 'Divide.' } }; };
  const cmpHint = { zh: '看蓝色的水：又高又宽的多，矮的窄的少。一样高一样宽就是一样多。', en: 'Compare the height and width of the water.' };

  /* ---- 容器数据 ---- */
  const mugs = [{ label: 'A', w: 56, h: 66, level: 0.45, shape: 'mug', handle: true }, { label: 'B', w: 56, h: 86, level: 0.35, shape: 'mug', handle: true }, { label: 'C', w: 56, h: 66, level: 0.3, shape: 'mug', handle: true }];
  const basins = [{ label: 'A', w: 76, h: 56, level: 0.5, shape: 'basin' }, { label: 'B', w: 130, h: 60, level: 0.62, shape: 'basin' }, { label: 'C', w: 76, h: 64, level: 0.44, shape: 'basin' }];
  const b1 = [['A', 0.52], ['B', 0.2], ['C', 0.36], ['D', 0.66]].map(([label, level]) => ({ label, w: 50, h: 76, level }));
  const b2 = [{ label: 'A', w: 52, h: 52, level: 0.14, shape: 'cube' }, { label: 'B', w: 120, h: 34, level: 0.62, shape: 'basin' }, { label: 'C', w: 54, h: 48, level: 0.46, shape: 'basin' }];
  const b3 = [{ label: 'A', w: 50, h: 72, level: 0.6 }, { label: 'B', w: 34, h: 72, level: 0.56 }, { label: 'C', w: 62, h: 60, level: 0.56 }, { label: 'D', w: 84, h: 62, level: 0.72 }];
  const jugs = [{ label: 'pitcher', n: 8, per: 1 }, { label: 'teapot', n: 5, per: 1 }, { label: 'bowl', n: 2, per: 1 }];
  const tanks = [{ label: 'A', n: 10 }, { label: 'B', n: 7 }, { label: 'C', n: 12 }, { label: 'D', n: 10 }];
  const cmpPic = items => pic(vrow(items));
  const jugPic = () => pic(`<div class="vol-list">${jugs.map(it => `<div class="vol-item"><span class="vol-name">${it.label}</span>${VU.arrow}${VU.cups(Array(it.n).fill(1))}</div>`).join('')}</div>`);
  const tankPic = () => pic(`<div class="vol-list">${tanks.map(it => `<div class="vol-item">${VU.vessel({ w: 44, h: 44, shape: 'cube', level: 0, label: it.label, scale: 1 })}${VU.arrow}${VU.bottleRow(it.n)}</div>`).join('')}</div>`);
  // 读刻度容器
  const rv = (o, max, value, marks) => Object.assign({ marks: Object.assign({ max }, marks || {}), level: VU.levelFor(value, max) }, o);
  const markA = [
    ['beaker', rv({ w: 56, h: 70, shape: 'cup' }, 1.25, 0.62, { step: 1.25, labelEvery: 1.25, unit: false }), 'less'],
    ['glass jar', rv({ w: 56, h: 80, shape: 'jar' }, 2, 1.45, { step: 1 }), 'more'],
    ['flask', rv({ w: 40, h: 80, shape: 'flask' }, 1.25, 0.6, { step: 1.25, labelEvery: 1.25 }), 'less'],
    ['trough', rv({ w: 140, h: 44, shape: 'trough' }, 3, 2.4, { step: 1 }), 'more'],
    ['bottle', rv({ w: 50, h: 80, shape: 'bottle' }, 1.25, 0.58, { step: 1.25, labelEvery: 1.25 }), 'less'],
  ];
  // 修正 markA 的标签：只画 1 l / 2 l / 3 l 的刻度
  markA[0][1].marks = { max: 1.25, step: 1, labelEvery: 1 }; markA[2][1].marks = { max: 1.25, step: 1, labelEvery: 1 }; markA[4][1].marks = { max: 1.25, step: 1, labelEvery: 1 };
  const readB = [
    ['container', rv({ w: 70, h: 80 }, 5, 3, { step: 1, labelEvery: 5 }), 3],
    ['bucket', rv({ w: 70, h: 84, shape: 'bucket', handle: true }, 8, 5, { step: 1, labelEvery: 1 }), 5],
    ['barrel', rv({ w: 70, h: 96 }, 20, 15, { step: 1, labelEvery: 5 }), 15],
    ['jug', rv({ w: 66, h: 70, shape: 'jar', handle: true }, 2, 2, { step: 1, labelEvery: 1 }), 2],
    ['container', rv({ w: 64, h: 84, shape: 'can', handle: false }, 10, 8, { step: 1, labelEvery: 5 }), 8],
    ['tank', rv({ w: 96, h: 80, shape: 'cube' }, 25, 20, { step: 5, labelEvery: 5 }), 20],
  ];
  const cupsQ = [
    ['🪣', [2, 2, 2, 2], 'Wendy used ___ l of water to wash laundry.', 'Wendy 用了 ___ 升水洗衣服。'],
    ['🫖', [2, 2], 'Amy makes ___ l of juice.', 'Amy 做了 ___ 升果汁。'],
    ['🍲', [1, 1, 1], 'Mother makes ___ l of soup.', '妈妈做了 ___ 升汤。'],
    ['🚰', [2, 2, 2, 2, 2], 'Michael orders ___ l of drinking water for his office.', 'Michael 给办公室订了 ___ 升饮用水。'],
    ['🔫', [1, 1, 1, 1, 1, 1, 1], 'The children use ___ l of water for their water pistol.', '孩子们的水枪用了 ___ 升水。'],
  ];
  const paint = [{ label: 'White', v: 6, color: '#f3f3f3', h: 72 }, { label: 'Blue', v: 4, color: '#8fc4ff', h: 56 }, { label: 'Green', v: 2, color: '#9be3b7', h: 40 }];
  const paintPic = pic(VU.row(paint.map(it => VU.vessel({ w: 44, h: it.h, level: 1, color: it.color, inner: it.label, sub: `${it.v} l`, cls: 'paint' }))));
  const bas = [{ label: 'A', vals: [2, 2, 1] }, { label: 'B', vals: [2, 2, 2, 2, 2, 1] }, { label: 'C', vals: [2, 2, 2, 2] }];
  const basPic = pic(`<div class="vol-list">${bas.map(it => `<div class="vol-item">${VU.vessel({ w: 70, h: 30, shape: 'basin', level: 0.5, label: it.label, scale: 0.9 })}${VU.arrow}${VU.cups(it.vals)}</div>`).join('')}</div>`);
  const colors = ['white', 'blue', 'green'], ABC = ['A', 'B', 'C'], ABCD = ['A', 'B', 'C', 'D'];

  const F = (id, p, text, fields, explain, zh, en, o) => Object.assign({ id, type: 'fill', pic: p, label: text.replace(/\{\{\w+\}\}/g, '___').replace(/\n/g, ' '), prompt: { zh, en: en || 'Fill in the blank' }, text, fields, answerText: Object.values(fields).map(f => f.a).join(', '), explain, hint: cmpHint }, o || {});
  const cmpQ = (id, items, a, b, rel, noun) => F(id, cmpPic(items), rel === 'same' ? `${noun} ${a} contains the {{r}} amount of water as ${noun} ${b}.` : `${noun} ${a} contains {{r}} water than ${noun} ${b}.`, { r: choice(rel, ['more', 'less', 'same']) }, ['volcmp', { items, a, b, rel }], `${noun} ${a} 里的水和 ${noun} ${b} 比，是多、少还是一样？`, `Compare ${noun} ${a} with ${noun} ${b}`);
  const mostQ = (id, items, which, ans, opts) => F(id, cmpPic(items), `Container {{r}} has the ${which} amount of water.`, { r: choice(ans, opts) }, ['volmost', { items, which, ans }], `哪个容器的水${which === 'most' ? '最多' : '最少'}？`, `Which container has the ${which} water?`);

  unit(17).kps = [
    {
      id: 'u17-1', available: true,
      title: { zh: '比一比：谁的水多', en: 'Compare volumes of liquid' },
      intro: { zh: '容量就是容器里装了多少水。比较时看蓝色的水：又高又宽的多；一样高一样宽就是一样多。', en: 'Volume is how much liquid a container holds. Compare the height and width of the water.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '填 more、less 还是 same', en: "Fill in each blank with 'more', 'less' or 'same'" },
          example: { kind: 'volcmp', n: { items: [{ label: 'A', w: 50, h: 80, shape: 'bottle', level: 0.62 }, { label: 'B', w: 50, h: 80, shape: 'bottle', level: 0.42 }, { label: 'C', w: 50, h: 80, shape: 'bottle', level: 0.42 }], a: 'A', b: 'B', rel: 'more' }, title: { zh: 'Bottle A 比 Bottle B 水多', en: 'Bottle A contains more water than Bottle B' } },
          questions: [
            cmpQ('u17-1-A1', mugs, 'A', 'B', 'same', 'Mug'), cmpQ('u17-1-A2', mugs, 'B', 'C', 'more', 'Mug'), cmpQ('u17-1-A3', mugs, 'C', 'A', 'less', 'Mug'),
            cmpQ('u17-1-A4', basins, 'A', 'B', 'less', 'Basin'), cmpQ('u17-1-A5', basins, 'B', 'A', 'more', 'Basin'), cmpQ('u17-1-A6', basins, 'A', 'C', 'same', 'Basin'),
          ] },
        { id: 'B', type: 'fill', title: { zh: '看图填空', en: 'Study the pictures carefully. Fill in each blank with the correct answer' },
          example: { kind: 'volmost', n: { items: [{ label: 'A', w: 50, h: 70, level: 0.3 }, { label: 'B', w: 50, h: 70, level: 0.8 }, { label: 'C', w: 50, h: 70, level: 0.55 }], which: 'most', ans: 'B' }, title: { zh: '哪个容器水最多？', en: 'Which container has the most water?' } },
          questions: [
            mostQ('u17-1-B1', b1, 'most', 'D', ABCD), mostQ('u17-1-B2', b1, 'least', 'B', ABCD),
            mostQ('u17-1-B3', b2, 'most', 'B', ABC), mostQ('u17-1-B4', b2, 'least', 'A', ABC),
            mostQ('u17-1-B5', b3, 'most', 'D', ABCD), mostQ('u17-1-B6', b3, 'least', 'B', ABCD),
            F('u17-1-B7', jugPic(), 'The {{r}} holds the most amount of water.', { r: choice('pitcher', ['pitcher', 'teapot', 'bowl']) }, ['volcups', { items: jugs, mode: 'most' }], '哪个容器装的水最多？（看能倒成几杯）', 'Which holds the most water?', { hint: { zh: '数一数每个容器能倒成几杯，杯数越多水越多。', en: 'Count the glasses.' } }),
            F('u17-1-B8', jugPic(), 'The {{r}} holds the least amount of water.', { r: choice('bowl', ['pitcher', 'teapot', 'bowl']) }, ['volcups', { items: jugs, mode: 'least' }], '哪个容器装的水最少？', 'Which holds the least water?', { hint: { zh: '数一数每个容器能倒成几杯，杯数越少水越少。', en: 'Count the glasses.' } }),
            F('u17-1-B9', jugPic(), 'The teapot holds {{r}} more glasses of water than the bowl.', { r: { a: 3 } }, ['volcups', { items: jugs, mode: 'diff', a: 'teapot', b: 'bowl' }], '茶壶比碗多装几杯水？', undefined, { hint: { zh: '茶壶 5 杯，碗 2 杯，用减法。', en: 'Subtract.' } }),
            F('u17-1-B10', jugPic(), 'The bowl holds {{r}} fewer glasses of water than the pitcher.', { r: { a: 6 } }, ['volcups', { items: jugs, mode: 'diff', a: 'bowl', b: 'pitcher' }], '碗比水壶少装几杯水？', undefined, { hint: { zh: '水壶 8 杯，碗 2 杯，用减法。', en: 'Subtract.' } }),
            F('u17-1-B11', tankPic(), 'Tank {{r}} has the least amount of water.', { r: choice('B', ABCD) }, ['volcups', { items: tanks, mode: 'least' }], '哪个水箱的水最少？', 'Which tank has the least water?', { hint: { zh: '数瓶子，最少的就是。', en: 'Count the bottles.' } }),
            F('u17-1-B12', tankPic(), 'Tank {{r}} has the most amount of water.', { r: choice('C', ABCD) }, ['volcups', { items: tanks, mode: 'most' }], '哪个水箱的水最多？', 'Which tank has the most water?', { hint: { zh: '数瓶子，最多的就是。', en: 'Count the bottles.' } }),
            F('u17-1-B13', tankPic(), 'Tanks {{r}} and {{s}} have the same amount of water.', { r: choice('A', ABCD), s: choice('D', ABCD) }, ['volcups', { items: tanks, mode: 'same', a: 'A', b: 'D' }], '哪两个水箱的水一样多？', 'Which two tanks have the same amount of water?', { accept: [{ r: 'A', s: 'D' }, { r: 'D', s: 'A' }], hint: { zh: '找瓶数一样的两个。', en: 'Find two tanks with the same number of bottles.' } }),
            F('u17-1-B14', tankPic(), 'Tank {{r}} has less water than Tank A.', { r: choice('B', ABCD) }, ['volcups', { items: tanks, mode: 'lessthan', a: 'B', b: 'A' }], '哪个水箱的水比 A 少？', 'Which tank has less water than Tank A?', { hint: { zh: 'A 是 10 瓶，找比 10 少的。', en: 'Fewer than 10 bottles.' } }),
            F('u17-1-B15', tankPic(), 'Tank {{r}} has more water than Tank D.', { r: choice('C', ABCD) }, ['volcups', { items: tanks, mode: 'morethan', a: 'C', b: 'D' }], '哪个水箱的水比 D 多？', 'Which tank has more water than Tank D?', { hint: { zh: 'D 是 10 瓶，找比 10 多的。', en: 'More than 10 bottles.' } }),
          ] },
      ],
    },
    {
      id: 'u17-2', available: true,
      title: { zh: '升（l）：读一读有多少水', en: 'Read and measure volume of liquid in litres' },
      intro: { zh: '水的多少用 升（litre，写成 l）来量。容器上的刻度线告诉我们有几升：看水面在哪条线。', en: 'We measure liquid in litres (l). Read the water line against the scale.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '比 1 升多还是少？', en: "Fill in each blank with 'more than' or 'less than'" },
          example: { kind: 'volmark', n: { v: rv({ w: 60, h: 76, shape: 'jar' }, 1.25, 0.7, { step: 1, labelEvery: 1 }), cmp: 'less' }, title: { zh: '水面在 1 l 线下面：less than 1 l', en: 'The water is below the 1 l mark' } },
          questions: markA.map(([name, v, cmp], i) => F(`u17-2-A${i + 1}`, pic(VU.vessel(v)), `The ${name} has {{r}} 1 l of water.`, { r: choice(`${cmp} than`, ['more than', 'less than']) }, ['volmark', { v, ref: 1, cmp }], `这个${['烧杯', '玻璃罐', '保温壶', '水槽', '瓶子'][i]}里的水比 1 升多还是少？`, `Is it more than or less than 1 l?`, { hint: { zh: '找 1 l 的刻度线，水面在它上面就是 more than，下面就是 less than。', en: 'Compare the water line with the 1 l mark.' } })) },
        { id: 'B', type: 'fill', title: { zh: '写出有几升水', en: 'Write the volume of water in each container on the lines provided' },
          example: { kind: 'volread', n: { v: rv({ w: 66, h: 80, shape: 'bucket', handle: true }, 6, 4, { step: 1, labelEvery: 1 }), value: 4 }, title: { zh: '水面在 4 l 的线上：4 l', en: 'Read the scale: 4 l' } },
          questions: readB.map(([name, v, value], i) => F(`u17-2-B${i + 1}`, pic(VU.vessel(v)), '{{r}} l of water', { r: { a: value } }, ['volread', { v, value }], `这个容器里有几升水？`, 'How many litres of water?', { hint: { zh: `最上面是 ${v.marks.max} l，${v.marks.labelEvery > 1 ? `每个大格 ${v.marks.labelEvery} l，小格 ${v.marks.step} l` : '每格 1 l'}。从下往上数到水面。`, en: 'Count the marks up to the water line.' } })) },
        { id: 'C', type: 'fill', title: { zh: '倒成几杯，一共几升', en: 'Look at each picture carefully. Fill in each blank with the correct answer' },
          example: { kind: 'voladd', n: { vals: [1, 1, 1], sentence: 'Thomas used ___ l of water to water his plants.', emoji: '🪴' }, title: { zh: '1 + 1 + 1 = 3 l', en: 'Thomas used 3 l of water to water his plants' } },
          questions: [
            ...cupsQ.map(([emoji, vals, en, zh], i) => { const sum = vals.reduce((a, b) => a + b, 0); return F(`u17-2-C${i + 1}`, pic(VU.row([`<span class="vol-emoji">${emoji}</span>`, VU.arrow, VU.cups(vals)])), en.replace('___', '{{r}}'), { r: { a: sum } }, ['voladd', { vals, sentence: en, emoji }], zh.replace('___', '几'), en.replace('___', '___'), { hint: { zh: '把每杯上的升数加起来。', en: 'Add up the litres on the cups.' } }); }),
            F('u17-2-C6', paintPic, 'He uses {{r}} l more white than blue paint.', { r: { a: 2 } }, ['volpaint', { items: paint, mode: 'diff', a: 'White', b: 'Blue' }], 'Scott 用三种颜料刷房间。白色比蓝色多用几升？', 'Scott uses three different colours of paint to paint his room.', { hint: { zh: '6 − 4', en: '6 − 4' } }),
            F('u17-2-C7', paintPic, 'He uses {{r}} l less green than blue paint.', { r: { a: 2 } }, ['volpaint', { items: paint, mode: 'diff', a: 'Green', b: 'Blue' }], '绿色比蓝色少用几升？', 'Scott uses three different colours of paint to paint his room.', { hint: { zh: '4 − 2', en: '4 − 2' } }),
            F('u17-2-C8', paintPic, 'He uses {{r}} l more white than green paint.', { r: { a: 4 } }, ['volpaint', { items: paint, mode: 'diff', a: 'White', b: 'Green' }], '白色比绿色多用几升？', 'Scott uses three different colours of paint to paint his room.', { hint: { zh: '6 − 2', en: '6 − 2' } }),
            F('u17-2-C9', paintPic, 'He uses the same amount of {{r}} paint as he does {{s}} and {{t}} paint together.', { r: choice('white', colors), s: choice('blue', colors), t: choice('green', colors) }, ['volpaint', { items: paint, mode: 'same', a: 'White' }], '哪种颜料的量等于另外两种加起来？', 'Which colour equals the other two together?', { accept: [{ r: 'white', s: 'blue', t: 'green' }, { r: 'white', s: 'green', t: 'blue' }], hint: { zh: '4 + 2 = 6', en: '4 + 2 = 6' } }),
            F('u17-2-C10', paintPic, '{{r}}, {{s}}, {{t}}\n(least → greatest)', { r: choice('green', colors), s: choice('blue', colors), t: choice('white', colors) }, ['volpaint', { items: paint, mode: 'order' }], '把三种颜料的量从少到多排一排。', 'Arrange the amounts of paint, in litres, from least to greatest.', { hint: { zh: '先找最少的。', en: 'Least first.' } }),
            F('u17-2-C11', basPic, 'Basin A has {{r}} l of water.', { r: { a: 5 } }, ['volbasins', { items: bas, mode: 'sum', a: 'A' }], '盆 A 有几升水？', undefined, { hint: { zh: '2 + 2 + 1', en: '2 + 2 + 1' } }),
            F('u17-2-C12', basPic, 'Basin B has {{r}} l of water.', { r: { a: 11 } }, ['volbasins', { items: bas, mode: 'sum', a: 'B' }], '盆 B 有几升水？', undefined, { hint: { zh: '2 + 2 + 2 + 2 + 2 + 1', en: 'Add the cups.' } }),
            F('u17-2-C13', basPic, 'Basin C has {{r}} l of water.', { r: { a: 8 } }, ['volbasins', { items: bas, mode: 'sum', a: 'C' }], '盆 C 有几升水？', undefined, { hint: { zh: '2 + 2 + 2 + 2', en: '2 + 2 + 2 + 2' } }),
            F('u17-2-C14', basPic, 'Basin {{r}} has more water than Basin {{s}} but less water than Basin {{t}}.', { r: choice('C', ABC), s: choice('A', ABC), t: choice('B', ABC) }, ['volbasins', { items: bas, mode: 'between' }], '哪个盆的水比一个盆多、又比另一个盆少？', 'Which basin is in between?', { hint: { zh: 'A 5 l，B 11 l，C 8 l。中间的是谁？', en: 'A 5 l, B 11 l, C 8 l.' } }),
            F('u17-2-C15', basPic, '{{r}}, {{s}}, {{t}}\n(greatest → smallest)', { r: choice('B', ABC), s: choice('C', ABC), t: choice('A', ABC) }, ['volbasins', { items: bas, mode: 'order' }], '把三个盆按水从多到少排一排。', 'Arrange the basins from the greatest to the smallest volume of water.', { hint: { zh: '先找最多的。', en: 'Greatest first.' } }),
          ] },
      ],
    },
    {
      id: 'u17-3', available: true,
      title: { zh: '升的应用题', en: 'Solve word problems related to adding, subtracting, multiplying and dividing volume' },
      intro: { zh: '和以前的应用题一样：一共 → 加；剩下、多多少 → 减；几个几 → 乘；平均分 → 除。单位是升（l）。', en: 'Altogether: add. Left / how many more: subtract. Groups of: multiply. Share equally: divide.' },
      sections: [
        { id: 'A', type: 'word', title: { zh: '加法', en: 'Adding volume' },
          example: { kind: 'word', n: W('ex', 'Mr Benson filled his car with 10 litres of petrol on Monday. He filled his car with 20 litres of petrol on Thursday. How many litres of petrol did Mr Benson fill his car in all?', 'Benson 先生星期一给车加了 10 升油，星期四加了 20 升。一共加了多少升？', A_([['Monday', 10], ['Thursday', 20]]), S('Mr Benson filled his car with ___ l of petrol in all.', 'Benson 先生一共加了 ___ 升油。')), title: { zh: '10 l + 20 l = 30 l', en: '10 l + 20 l = 30 l' } },
          questions: [
            W('u17-3-A1', 'Mrs Simon prepares 3 litres of barley water. Mrs Adam prepares 5 litres of chrysanthemum tea. How many litres of drink do they prepare altogether?', 'Simon 太太准备了 3 升薏米水，Adam 太太准备了 5 升菊花茶。她们一共准备了多少升饮料？', A_([['Mrs Simon', 3], ['Mrs Adam', 5]]), S('They prepare ___ l of drink altogether.', '她们一共准备了 ___ 升。')),
            W('u17-3-A2', 'Jason fills an empty tank with 4 litres of water. Jack fills the same tank with 3 litres of water. Tim tops up the tank with 5 litres of water. How much water can the tank hold?', 'Jason 往空水箱倒了 4 升水，Jack 又倒了 3 升，Tim 再加了 5 升就满了。水箱能装多少水？', A_([['Jason', 4], ['Jack', 3], ['Tim', 5]]), S('The tank can hold ___ l of water.', '水箱能装 ___ 升水。')),
          ] },
        { id: 'B', type: 'word', title: { zh: '减法', en: 'Subtracting volume' },
          example: { kind: 'word', n: W('ex', 'A wooden barrel can hold up to 120 litres of water. If there are 85 litres of water in the barrel, how much more water is needed to fill it?', '一个木桶能装 120 升水。桶里已有 85 升，还要加多少升才能装满？', Sb(['barrel', 120], ['in the barrel', 85], 'needed'), S('___ l more of water is needed to fill it.', '还需要 ___ 升水。')), title: { zh: '120 l − 85 l = 35 l', en: '120 l − 85 l = 35 l' } },
          questions: [
            W('u17-3-B1', 'Kim buys 8 litres of orange juice. She gives 2 litres of orange juice to Jane. How much orange juice has Kim left?', 'Kim 买了 8 升橙汁，给了 Jane 2 升。Kim 还剩多少橙汁？', Sb(['bought', 8], ['given to Jane', 2], 'left'), S('Kim has ___ l of orange juice left.', 'Kim 还剩 ___ 升橙汁。')),
            W2('u17-3-B2', 'There are 9 litres of water in an office water dispenser. Mr Ford uses it to fill his 1-litre bottle and Mr Hughes uses it to fill his 2-litre bottle. How much water is left in the dispenser?', '饮水机里有 9 升水。Ford 先生装满了 1 升的瓶子，Hughes 先生装满了 2 升的瓶子。饮水机里还剩多少水？', { ask: S('How much water did Mr Ford and Mr Hughes use altogether?', '两人一共用了多少水？'), model: A_([['Mr Ford', 1], ['Mr Hughes', 2]]), sentence: S('They used ___ l of water altogether.', '他们一共用了 ___ 升。') }, { ask: S('How much water is left in the dispenser?', '饮水机里还剩多少水？'), model: Sb(['dispenser', 9], ['used', 'ANS1'], 'left'), sentence: S('___ l of water is left in the dispenser.', '饮水机里还剩 ___ 升水。') }),
          ] },
        { id: 'C', type: 'fill', title: { zh: '乘法', en: 'Multiplying volume' },
          example: { kind: 'mulgroups', n: { groups: 2, each: 2, emoji: '🪣', noun: '' }, title: { zh: 'Sandy 用 2 桶水装鱼缸，每桶 2 升：2 × 2 = 4 l', en: 'Sandy fills a fish tank with 2 pails of water. Each pail holds 2 litres: 2 × 2 l = 4 l' } },
          questions: [
            mulDivW('u17-3-C1', 'Uncle Norman filled 6 fish tanks with water. Each fish tank contained 4 litres of water. How many litres of water did Uncle Norman use to fill the fish tanks?', 'Norman 叔叔给 6 个鱼缸装水，每个鱼缸装 4 升。他一共用了多少升水？', 6, 4, '×', 'Uncle Norman used ___ l of water to fill the fish tanks.', '🐟', ''),
            mulDivW('u17-3-C2', '3 litres of paint is required to paint a room. How much paint is required to paint 5 such rooms?', '刷一个房间要 3 升颜料。刷 5 个这样的房间要多少颜料？', 5, 3, '×', '___ l of paint is required.', '🎨', ''),
          ] },
        { id: 'D', type: 'fill', title: { zh: '除法', en: 'Dividing volume' },
          example: { kind: 'divshare', n: { total: 6, groups: 3, emoji: '🥤', noun: '' }, title: { zh: '6 升汽水平均倒进 3 个瓶子：6 ÷ 3 = 2 l', en: '6 litres of soda is poured equally into 3 bottles: 6 l ÷ 3 = 2 l' } },
          questions: [
            mulDivW('u17-3-D1', 'Mandy fills an empty container with 16 l of water. She then pours all the water equally into some jugs. Each jug holds 4 l of water. How many jugs does she use?', 'Mandy 往空容器里装了 16 升水，再平均倒进一些壶里，每个壶装 4 升。她用了几个壶？', 16, 4, '÷g', 'She uses ___ jugs.', '🫗', ''),
            mulDivW('u17-3-D2', 'A storage tank contains 60 litres of water. The water is used to fill some containers equally. If each container holds 5 litres of water, how many such containers are there?', '储水箱有 60 升水，平均装进一些容器，每个容器装 5 升。有几个这样的容器？', 60, 5, '÷g', 'There are ___ such containers.', '🪣', ''),
          ] },
      ],
    },
  ];
})();
