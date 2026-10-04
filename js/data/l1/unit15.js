/* Level 1 · Unit 15  除法（平均分） */
(function () {
  const U = window.MATH_DATA.levels[1].units;
  const unit = num => U.find(u => u.num === num);
  const M = window.MulUI;
  const F = (id, p, text, fields, explain, zh, en, o) => Object.assign({ id, type: 'fill', pic: p, label: text.replace(/\{\{\w+\}\}/g, '___').replace(/\n/g, ' '), prompt: { zh, en: en || 'Fill in the blanks' }, text, fields, answerText: Object.values(fields).map(f => f.a).join(', '), explain }, o || {});
  const wp = (en, zh) => `<div class="wp-text"><div class="wp-en">${en}</div><div class="wp-zh">${zh}</div></div>`;
  const num = a => ({ a });
  const loose = (n, icon) => `<div class="center">${M.looseHTML(n, icon)}</div>`;
  const boxes = (g, icon) => `<div class="center"><div class="divboxes">${Array.from({ length: g }, () => `<span class="divbox"></span>`).join('')}</div></div>`;
  const containers = (g, icon) => `<div class="center"><div class="divboxes">${Array.from({ length: g }, () => `<span class="divbox cont">${icon}</span>`).join('')}</div></div>`;
  const shape = s => `<span class="divshape">${s}</span>`;

  const A = [[8, '◻', 2], [12, '△', 4], [15, '○', 5], [18, '◇', 3], [20, '▽', 5]];
  const B = [[9, '🕯️', 3, '🎂', 'candles', 'cakes', 'candles on each cake', 'on each cake'], [15, '🍎', 3, '🧺', 'apples', 'baskets', 'apples in each basket', 'in each basket'], [24, '🪑', 6, '🟫', 'chairs', 'tables', 'chairs with each table', 'with each table'], [28, '🫘', 4, '🍽️', 'jelly beans', 'plates', 'jelly beans on each plate', 'on each plate'], [16, '✏️', 2, '🗃️', 'pencils', 'pencil holders', 'pencils in each pencil holder', 'in each pencil holder']];
  const C = [[8, '⌚', 4, 'watches'], [10, '🦀', 2, 'crabs'], [12, '🧦', 3, 'socks'], [27, '🧢', 3, 'caps'], [30, '🍩', 6, 'doughnuts']];
  const D = [[18, '🐟', 6, 'fish', 'Place 6 fish into one bowl.', 'bowls of fish'], [16, '🐞', 4, 'ladybirds', 'Place 4 ladybirds into one container.', 'containers of ladybirds'], [14, '🍝', 2, 'plates of pasta', 'Place 2 plates of pasta onto one tray.', 'trays of pasta'], [24, '📕', 3, 'books', 'Place 3 books into one plastic bag.', 'plastic bags of books'], [30, '🧱', 10, 'building blocks', 'Place 10 building blocks into one box.', 'boxes of building blocks']];
  const E = [[10, '🐱', 5, 'kittens'], [21, '🧼', 3, 'bars of soap', 'soap'], [20, '🍰', 2, 'cakes'], [24, '🍃', 4, 'leaves'], [28, '🔮', 7, 'marbles']];
  // [en, zh, total, n, kind('share' groups | 'group' each), icon, sentence, noun]
  const words = [
    ['Mrs James buys 20 pencils. She distributes 4 pencils to each of her children. How many children are there?', 'James 太太买了 20 支铅笔，给每个孩子 4 支。她有几个孩子？', 20, 4, 'group', '✏️', 'There are ___ children.', '支铅笔'],
    ['3 boys share 12 strawberries equally. How many strawberries does each boy get?', '3 个男孩平均分 12 颗草莓。每人分到几颗？', 12, 3, 'share', '🍓', 'Each boy gets ___ strawberries.', '颗草莓'],
    ['Miss Suzy bakes 18 cupcakes. She gives all the cupcakes to 9 students equally. How many cupcakes does each student receive?', 'Suzy 老师烤了 18 个纸杯蛋糕，平均分给 9 个学生。每个学生分到几个？', 18, 9, 'share', '🧁', 'Each student receives ___ cupcakes.', '个纸杯蛋糕'],
    ['Mr Thomas cuts a pizza into 10 slices. The pizza is shared among some people equally. If each person gets 2 slices of pizza, how many people share the pizza?', 'Thomas 先生把披萨切成 10 块，平均分给一些人。每人 2 块，有几个人分？', 10, 2, 'group', '🍕', '___ people share the pizza.', '块披萨'],
    ['A fruiterer has 30 pears. He packs the pears equally into 5 plastic bags. How many pears are there in each plastic bag?', '水果商有 30 个梨，平均装进 5 个袋子。每个袋子里有几个梨？', 30, 5, 'share', '🍐', 'There are ___ pears in each plastic bag.', '个梨'],
  ];

  unit(15).kps = [
    {
      id: 'l1-15-1', available: true,
      title: { zh: '平均分，每组几个', en: 'Find the equal number of items in each group' },
      intro: { zh: '平均分就是每组一样多。一个一个轮流放：每组放 1 个，再每组放 1 个……放完了数一数每组有几个。', en: 'Share equally: put one in each group, then another, until nothing is left. Count how many in each group.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '平均放进几个格子', en: 'Draw the correct number of shapes in each box and fill in each blank with the correct answer' },
          example: { kind: 'divshare', n: { total: 6, groups: 3, emoji: '⭐', noun: '颗星星' }, title: { zh: '6 颗星星平均放进 3 个格子，每格 2 颗', en: 'Put 6 stars equally into 3 groups' } },
          questions: A.map(([t, s, g], i) => F(`l1-15-1-A${i + 1}`, loose(t, shape(s)) + boxes(g), `Put ${t} ${s} equally into ${g} groups.\nThere are {{e}} ${s} in each group.`, { e: num(t / g) }, ['divshare', { total: t, groups: g, emoji: shape(s), noun: '个' }], `${t} 个平均放进 ${g} 个格子，每格几个？`, `Put ${t} equally into ${g} groups`, { label: `${t} ÷ ${g} = ${t / g}`, hint: { zh: `一个一个轮流放，每格放 1 个，放完数一数。`, en: 'One in each box at a time.' } })) },
        { id: 'B', type: 'fill', title: { zh: '一共几个、几个容器、每个放几个', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'divshare', n: { total: 20, groups: 4, emoji: '🌸', noun: '朵花' }, title: { zh: '20 朵花放进 4 个花瓶，每瓶 5 朵', en: '20 flowers, 4 vases, 5 in each vase' } },
          questions: B.map(([t, icon, g, cont, nounT, nounG, nounE, where], i) => F(`l1-15-1-B${i + 1}`, loose(t, icon) + containers(g, cont), `(a) There are {{t}} ${nounT} altogether.\n(b) There are {{g}} ${nounG}.\n(c) Place an equal number of ${nounT} ${where}.\nThere are {{e}} ${nounE}.`, { t: num(t), g: num(g), e: num(t / g) }, ['divshare', { total: t, groups: g, emoji: icon, noun: '个' }], `一共几个？几个${nounG === 'cakes' ? '蛋糕' : nounG === 'baskets' ? '篮子' : nounG === 'tables' ? '桌子' : nounG === 'plates' ? '盘子' : '笔筒'}？平均放，每个放几个？`, 'How many altogether? How many in each?', { label: `${t} ÷ ${g} = ${t / g}`, hint: { zh: `先数总数和容器数，再平均分。`, en: 'Count, then share equally.' } })) },
        { id: 'C', type: 'fill', title: { zh: '圈成几个相等的组', en: 'Ring the objects and fill in each blank with the correct answer' },
          example: { kind: 'divshare', n: { total: 10, groups: 5, emoji: '🌰', noun: '颗橡果' }, title: { zh: '10 颗橡果圈成 5 组，每组 2 颗', en: 'Ring 10 acorns into 5 equal groups' } },
          questions: C.map(([t, icon, g, noun], i) => F(`l1-15-1-C${i + 1}`, loose(t, icon), `(a) There are {{t}} ${noun} altogether.\n(b) Ring the ${noun} into ${g} equal groups.\nThere are {{e}} ${noun} in each group.`, { t: num(t), e: num(t / g) }, ['divshare', { total: t, groups: g, emoji: icon, noun: '个' }], `一共几个？圈成 ${g} 个一样多的组，每组几个？`, `Ring into ${g} equal groups`, { label: `${t} ÷ ${g} = ${t / g}`, hint: { zh: `${t} 个分成 ${g} 组，一组一组轮流放。`, en: `Share ${t} into ${g} groups.` } })) },
      ],
    },
    {
      id: 'l1-15-2', available: true,
      title: { zh: '每组几个，能分几组', en: 'Find the number of equal groups' },
      intro: { zh: '知道每组放几个，就几个几个地圈一圈，圈完数一数有几圈，就是几组。', en: 'Circle the given number at a time. Count the circles: that is the number of groups.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '每个容器放几个，要几个容器', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'divgroup', n: { total: 12, each: 6, emoji: '⚽', noun: '个球' }, title: { zh: '12 个球，每篮 6 个，要 2 个篮子', en: '12 balls, 6 in one basket: 2 baskets' } },
          questions: D.map(([t, icon, e, nounT, place, nounG], i) => F(`l1-15-2-A${i + 1}`, loose(t, icon), `(a) There are {{t}} ${nounT} altogether.\n(b) ${place}\nThere are {{g}} ${nounG}.`, { t: num(t), g: num(t / e) }, ['divgroup', { total: t, each: e, emoji: icon, noun: '个' }], `一共几个？每 ${e} 个放一起，要几个？`, `How many groups of ${e}?`, { label: `${t} ÷ ${e} = ${t / e}`, hint: { zh: `每 ${e} 个圈一圈，数有几圈。`, en: `Circle ${e} at a time.` } })) },
        { id: 'B', type: 'fill', title: { zh: '圈成每组几个', en: 'Ring the objects and fill in each blank with the correct answer' },
          example: { kind: 'divgroup', n: { total: 15, each: 3, emoji: '🌶️', noun: '个辣椒' }, title: { zh: '15 个辣椒，每 3 个一组，圈成 5 组', en: 'Ring 15 chillies into equal groups of 3: 5 groups' } },
          questions: E.map(([t, icon, e, nounT, nounShort], i) => F(`l1-15-2-B${i + 1}`, loose(t, icon), `(a) There are {{t}} ${nounT} altogether.\n(b) Ring the ${nounShort || nounT} into equal groups of ${e}.\nThere are {{g}} groups of ${nounShort || nounT}.`, { t: num(t), g: num(t / e) }, ['divgroup', { total: t, each: e, emoji: icon, noun: '个' }], `一共几个？每 ${e} 个圈一组，能圈几组？`, `Ring into groups of ${e}`, { label: `${t} ÷ ${e} = ${t / e}`, hint: { zh: `每 ${e} 个圈一圈。`, en: `Circle ${e} at a time.` } })) },
      ],
    },
    {
      id: 'l1-15-3', available: true,
      title: { zh: '除法应用题', en: 'Solve division word problems' },
      intro: { zh: '“平均分给几个人”就一人一个轮流分；“每人分几个”就几个几个圈。画一画再数。', en: '"Share equally among n" → one each in turn. "n each" → circle n at a time. Draw, then count.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '读题画一画', en: 'Do these word problems' },
          example: { kind: 'divgroup', n: { total: 25, each: 5, emoji: '🧒', noun: '个小朋友' }, title: { zh: '25 个小朋友，5 人一组，有 5 组', en: '25 children, 5 in a group: 5 groups' } },
          questions: words.map(([en, zh, t, n, kind, icon, sent, noun], i) => F(`l1-15-3-A${i + 1}`, wp(en, zh) + loose(t, icon), sent.replace('___', '{{d}}'), { d: num(t / n) }, kind === 'share' ? ['divshare', { total: t, groups: n, emoji: icon, noun }] : ['divgroup', { total: t, each: n, emoji: icon, noun }], kind === 'share' ? `${t} 个平均分成 ${n} 份，每份几个？` : `${t} 个，每 ${n} 个一份，有几份？`, en, { label: en, hint: { zh: kind === 'share' ? `分成 ${n} 组，一个一个轮流放。` : `每 ${n} 个圈一圈。`, en: kind === 'share' ? `Share into ${n} groups.` : `Circle ${n} at a time.` } })) },
      ],
    },
  ];
})();
