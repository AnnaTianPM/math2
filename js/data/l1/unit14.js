/* Level 1 · Unit 14  乘法 */
(function () {
  const U = window.MATH_DATA.levels[1].units;
  const unit = num => U.find(u => u.num === num);
  const L = window.L1, M = window.MulUI, W = L.MULWORDS;
  const pic = (g, e, icon) => `<div class="center">${M.groupsHTML(g, e, icon)}</div>`;
  const img = name => `<img src="img/l1u14/${name}.png" alt="">`;
  const F = (id, p, text, fields, explain, zh, en, o) => Object.assign({ id, type: 'fill', pic: p, label: text.replace(/\{\{\w+\}\}/g, '___').replace(/\n/g, ' '), prompt: { zh, en: en || 'Fill in the blanks' }, text, fields, answerText: Object.values(fields).map(f => f.a).join(', '), explain }, o || {});
  const wp = (en, zh) => `<div class="wp-text"><div class="wp-en">${en}</div><div class="wp-zh">${zh}</div></div>`;
  const wordOpts = e => { const all = [2, 3, 4, 5, 6, 7, 8, 9, 10].filter(x => x !== e); const pick = [e, all[(e * 3) % all.length], all[(e * 5 + 1) % all.length], all[(e * 7 + 2) % all.length]]; const uniq = [...new Set(pick)]; let k = 0; while (uniq.length < 4) { if (!uniq.includes(all[k])) uniq.push(all[k]); k++; } return uniq.sort((a, b) => a - b).map(x => W[x]); };
  const adds = (n, key) => Array.from({ length: n }, (_, i) => `{{${key}${i + 1}}}`).join(' + ');
  const addFields = (n, key, e) => Object.fromEntries(Array.from({ length: n }, (_, i) => [`${key}${i + 1}`, { a: e }]));
  const num = a => ({ a });

  /* ---- KP1 Add the same number ---- */
  const A = [[3, 3, '🍑'], [4, 2, '🥢'], [4, 5, '🍞'], [2, 6, '📚'], [3, 8, '🥏'], [6, 4, '🐥'], [5, 7, '🎈'], [2, 9, '🦀'], [7, 3, '🕯️'], [3, 10, '🍬']];
  const B = [[4, 3, '🪁'], [8, 2, '✈️'], [5, 5, '🚗'], [6, 7, '🥚'], [3, 6, '📮'], [2, 10, '🐚'], [7, 4, '🍦'], [9, 3, '🥣'], [4, 9, '🪙'], [10, 2, '👟']];
  const C = [[5, 2, '🚚', 'toy trucks'], [6, 5, '🍆', 'brinjals'], [10, 3, '🐞', 'ladybirds'], [8, 4, '🍪', 'cookies'], [4, 6, '🥤', 'cans of soda']];
  // [groups, each, img, 单个名词, 复数名词, 部件]
  const D = [[5, 8, 'spider', 'A spider', 'spiders', 'legs'], [7, 2, 'house', 'Each house', 'houses', 'windows'], [9, 4, 'goat', 'A goat', 'goats', 'legs'], [3, 9, 'comb', 'Each comb', 'combs', 'teeth'], [4, 10, 'choc', 'One chocolate bar', 'chocolate bars', 'square pieces']];
  /* ---- KP2 Make multiplication equations ---- */
  const E = [[4, 3, '🥝', 'kiwis'], [7, 5, '🧒', 'children'], [8, 4, '⌚', 'watches'], [6, 6, '🏠', 'houses'], [5, 8, '✏️', 'pencils']];
  const Fq = [[2, 8, '🥚'], [5, 5, '🌼'], [9, 2, '🔋'], [3, 7, '🍪'], [10, 4, '🥥']];
  const G = [[8, 3, '🐵', 'monkeys'], [5, 4, '🥪', 'sandwiches'], [4, 7, '☕', 'cups'], [6, 2, '👧', 'girls'], [7, 3, '🐞', 'ladybirds']];
  /* ---- KP3 word problems ---- */
  const words = [
    ['There are 4 vases. There are 6 flowers in each vase. How many flowers are there altogether?', '有 4 个花瓶，每个花瓶里有 6 朵花。一共有几朵花？', 4, 6, '🌷', 'There are ___ flowers altogether.'],
    ['There are 8 baskets. There are 3 fruit in each basket. How many pieces of fruit are there in all?', '有 8 个篮子，每个篮子里有 3 个水果。一共有几个水果？', 8, 3, '🍎', 'There are ___ pieces of fruit in all.'],
    ['There are 3 fish tanks in a shop. There are 6 fish in each tank. How many fish are there altogether?', '店里有 3 个鱼缸，每个鱼缸里有 6 条鱼。一共有几条鱼？', 3, 6, '🐟', 'There are ___ fish altogether.'],
    ['There are 8 horses on a farm. Each horse has 4 legs. How many legs do the horses have in all?', '农场里有 8 匹马，每匹马有 4 条腿。一共有几条腿？', 8, 4, '🦵', 'The horses have ___ legs in all.'],
    ['Susie has 5 flags. There are 3 stars on each flag. How many stars are there altogether?', 'Susie 有 5 面旗，每面旗上有 3 颗星。一共有几颗星？', 5, 3, '⭐', 'There are ___ stars altogether.'],
    ['There are 4 plates on the table. There are 5 cakes on each plate. How many cakes are there in all?', '桌上有 4 个盘子，每个盘子里有 5 块蛋糕。一共有几块蛋糕？', 4, 5, '🍰', 'There are ___ cakes in all.'],
    ['Brenda has 9 pairs of earrings. Each pair has 2 earrings. How many earrings does Brenda have altogether?', 'Brenda 有 9 对耳环，每对 2 只。她一共有几只耳环？', 9, 2, '💎', 'Brenda has ___ earrings altogether.'],
    ['There are 4 trees in a garden. Sam sees 7 birds on each tree. How many birds does Sam see altogether?', '花园里有 4 棵树，Sam 看到每棵树上有 7 只鸟。他一共看到几只鸟？', 4, 7, '🐦', 'Sam sees ___ birds altogether.'],
    ['There are 3 groups of boys at a field. Each group consists of 4 boys. How many boys are there in all?', '操场上有 3 组男孩，每组 4 人。一共有几个男孩？', 3, 4, '👦', 'There are ___ boys in all.'],
    ['Candy has 2 packs of lollipops. There are 8 lollipops in each pack. How many lollipops does Candy have in all?', 'Candy 有 2 包棒棒糖，每包 8 根。她一共有几根？', 2, 8, '🍭', 'Candy has ___ lollipops in all.'],
  ];

  unit(14).kps = [
    {
      id: 'l1-14-1', available: true,
      title: { zh: '重复加同一个数', en: 'Add the same number' },
      intro: { zh: '每组一样多的时候，可以把同一个数一遍一遍地加。3 个 3 加起来，英文叫 3 threes；4 个 2 叫 4 twos。', en: 'When the groups are equal, add the same number again and again. 3 + 3 + 3 is 3 threes.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '看图加一加', en: 'Study the pictures below and fill in each blank with the correct answer' },
          example: { kind: 'l1addsame', n: { groups: 2, each: 4, icon: '🌽' }, title: { zh: '4 + 4 = 8，2 fours = 8', en: '2 fours = 8' } },
          questions: A.map(([g, e, icon], i) => F(`l1-14-1-A${i + 1}`, pic(g, e, icon), `${Array(g).fill(e).join(' + ')} = {{s}}\n${g} ${W[e]} = {{t}}`, { s: num(g * e), t: num(g * e) }, ['l1addsame', { groups: g, each: e, icon }], `${g} 个 ${e} 加起来是多少？`, `${g} ${W[e]} = ?`, { label: `${g} ${W[e]} = ${g * e}`, hint: { zh: `一组一组加：${e}、${2 * e}、${3 * e}……`, en: `Count in ${e}s.` } })) },
        { id: 'B', type: 'fill', title: { zh: '自己写加法算式', en: 'Study the pictures below and fill in each blank with the correct answer' },
          example: { kind: 'l1addsame', n: { groups: 3, each: 5, icon: '🖊️' }, title: { zh: '5 + 5 + 5 = 15，3 fives = 15', en: '3 fives = 15' } },
          questions: B.map(([g, e, icon], i) => F(`l1-14-1-B${i + 1}`, pic(g, e, icon), `${adds(g, 'a')} = {{s}}\n{{n}} ${W[e]} = {{t}}`, Object.assign(addFields(g, 'a', e), { s: num(g * e), n: num(g), t: num(g * e) }), ['l1addsame', { groups: g, each: e, icon }], `有几组？每组几个？写出加法算式`, 'Write the addition', { label: `${g} ${W[e]} = ${g * e}`, hint: { zh: `${g} 组，每组 ${e} 个，就是 ${g} 个 ${e} 相加。`, en: `${g} groups of ${e}.` } })) },
        { id: 'C', type: 'fill', title: { zh: '几个几', en: 'Study the pictures below and fill in each blank with the correct answer' },
          example: { kind: 'l1addsame', n: { groups: 3, each: 4, icon: '🧽', countFirst: true }, title: { zh: '12 块橡皮，3 fours = 12', en: '3 fours = 12' } },
          questions: C.map(([g, e, icon, noun], i) => F(`l1-14-1-C${i + 1}`, pic(g, e, icon), `There are {{t}} ${noun}.\n${g} {{w}} = {{t2}}`, { t: num(g * e), w: { a: W[e], kind: 'choice', options: wordOpts(e) }, t2: num(g * e) }, ['l1addsame', { groups: g, each: e, icon, countFirst: true }], `一共有几个？${g} 组每组几个，英文怎么说？`, 'How many? Which word?', { label: `${g} ${W[e]} = ${g * e}`, hint: { zh: `每组 ${e} 个，${g} 个 ${e} 叫 ${g} ${W[e]}。`, en: `${g} groups of ${e}.` } })) },
        { id: 'D', type: 'fill', title: { zh: '先数一个有几个', en: 'Study the pictures below and fill in each blank with the correct answer' },
          example: { kind: 'l1addsame', n: { groups: 6, each: 6, icon: '💐', countFirst: true }, title: { zh: '一束 6 朵，6 束一共 36 朵', en: '6 sixes = 36' } },
          questions: D.map(([g, e, im, one, many, part], i) => F(`l1-14-1-D${i + 1}`, pic(g, 1, img(im)), `${one} has {{e}} ${part}.\n${adds(g, 'a')} = {{s}}\n${g} {{w}} = {{t}}\n${g} ${many} have {{t2}} ${part} altogether.`, Object.assign({ e: num(e) }, addFields(g, 'a', e), { s: num(g * e), w: { a: W[e], kind: 'choice', options: wordOpts(e) }, t: num(g * e), t2: num(g * e) }), ['l1addsame', { groups: g, each: e, icon: '🔵', countFirst: true }], `先数一个有几${part === 'legs' ? '条腿' : part === 'windows' ? '扇窗' : part === 'teeth' ? '个齿' : '块'}，再算 ${g} 个一共有几`, `Count one first`, { label: `${g} ${W[e]} = ${g * e}`, hint: { zh: `一个有 ${e} 个，${g} 个 ${e} 相加。`, en: `${g} ${W[e]}.` } })) },
      ],
    },
    {
      id: 'l1-14-2', available: true,
      title: { zh: '列乘法算式', en: 'Make multiplication equations and stories' },
      intro: { zh: '几组、每组几个，就用乘法：组数 × 每组的个数 = 总数。× 读作“乘”。3 × 2 = 6 就是 3 个 2 是 6。', en: 'Groups × number in each group = total. We say "times". 3 × 2 = 6 means 3 twos are 6.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '几组、每组几个', en: 'Study the pictures and fill in each blank with the correct answer' },
          example: { kind: 'l1mul', n: { groups: 3, each: 2, icon: '🧦', adds: true }, title: { zh: '3 groups of 2 socks，3 × 2 = 6', en: '3 × 2 = 6' } },
          questions: E.map(([g, e, icon, noun], i) => F(`l1-14-2-A${i + 1}`, pic(g, e, icon), `{{g}} groups of {{e}} ${noun}\n{{g2}} × {{e2}} = {{t}}`, { g: num(g), e: num(e), g2: num(g), e2: num(e), t: num(g * e) }, ['l1mul', { groups: g, each: e, icon, adds: true }], `有几组？每组几个？写出乘法算式`, 'Write the multiplication equation', { label: `${g} × ${e} = ${g * e}`, hint: { zh: `先数组数，再数每组几个：组数 × 每组 = 总数。`, en: 'groups × each = total' } })) },
        { id: 'B', type: 'fill', title: { zh: '加法和乘法', en: 'Complete the addition and multiplication equations' },
          example: { kind: 'l1mul', n: { groups: 4, each: 4, icon: '🐠', adds: true }, title: { zh: '4 + 4 + 4 + 4 = 16，4 × 4 = 16', en: '4 × 4 = 16' } },
          questions: Fq.map(([g, e, icon], i) => F(`l1-14-2-B${i + 1}`, pic(g, e, icon), `${adds(g, 'a')} = {{s}}\n{{g}} × {{e}} = {{t}}`, Object.assign(addFields(g, 'a', e), { s: num(g * e), g: num(g), e: num(e), t: num(g * e) }), ['l1mul', { groups: g, each: e, icon, adds: true }], `写出加法算式和乘法算式`, 'Write both equations', { label: `${g} × ${e} = ${g * e}`, hint: { zh: `${g} 组，每组 ${e}：加 ${g} 次，乘法就是 ${g} × ${e}。`, en: `${g} groups of ${e}.` } })) },
        { id: 'C', type: 'fill', title: { zh: '几组、每组几个、一共几个', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'l1mul', n: { groups: 3, each: 6, icon: '🌻' }, title: { zh: '3 groups，6 in each group，18 altogether', en: '3 × 6 = 18' } },
          questions: G.map(([g, e, icon, noun], i) => F(`l1-14-2-C${i + 1}`, pic(g, e, icon), `(a) There are {{g}} groups of ${noun}.\n(b) There are {{e}} ${noun} in each group.\n(c) There are {{t}} ${noun} altogether.`, { g: num(g), e: num(e), t: num(g * e) }, ['l1mul', { groups: g, each: e, icon }], `几组？每组几个？一共几个？`, 'Groups, each, altogether', { label: `${g} × ${e} = ${g * e}`, hint: { zh: `组数 × 每组 = 总数。`, en: 'groups × each = total' } })) },
      ],
    },
    {
      id: 'l1-14-3', available: true,
      title: { zh: '乘法应用题', en: 'Solve multiplication word problems' },
      intro: { zh: '题目里说“有几个……，每个里面有几个”，问一共多少，就用乘法：个数 × 每个里面的数。', en: '"There are ... Each has ..." Multiply to find the total.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '读题列式', en: 'Do these word problems' },
          example: { kind: 'l1mulword', n: { en: 'There are 3 boxes. There are 5 pencils in each box. How many pencils are there altogether?', zh: '有 3 个盒子，每个盒子里有 5 支铅笔。一共有几支铅笔？', groups: 3, each: 5, icon: '✏️', sentence: 'There are ___ pencils altogether.' }, title: { zh: '3 × 5 = 15', en: '3 × 5 = 15' } },
          questions: words.map(([en, zh, g, e, icon, sent], i) => F(`l1-14-3-A${i + 1}`, wp(en, zh) + pic(g, e, icon), `{{g}} × {{e}} = {{t}}\n${sent.replace('___', '{{d}}')}`, { g: num(g), e: num(e), t: num(g * e), d: num(g * e) }, ['l1mulword', { en, zh, groups: g, each: e, icon, sentence: sent }], '有几个？每个里面几个？用乘法', en, { accept: [{ g, e, t: g * e, d: g * e }, { g: e, e: g, t: g * e, d: g * e }], label: en, hint: { zh: `${g} 个，每个 ${e}：${g} × ${e}。`, en: `${g} × ${e}.` } })) },
      ],
    },
  ];
})();
