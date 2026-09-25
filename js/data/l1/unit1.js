/* Level 1 · Unit 1  10 以内的数 */
(function () {
  const U = window.MATH_DATA.levels[1].units;
  const unit = num => U.find(u => u.num === num);
  const L = window.L1, W = L.word;
  const pic = html => `<div class="center">${html}</div>`;
  const img = name => L.img('l1u1/' + name, 440);
  const choice = (a, options) => ({ a, kind: 'choice', options });
  const wordOpts = n => { const s = Math.max(0, Math.min(n - 1, 7)); return Array.from({ length: 4 }, (_, i) => W(s + i)); };
  const F = (id, p, text, fields, explain, zh, en, o) => Object.assign({ id, type: 'fill', pic: p, label: text.replace(/\{\{\w+\}\}/g, '___').replace(/\n/g, ' '), prompt: { zh, en: en || 'Fill in the blank' }, text, fields, answerText: Object.values(fields).map(f => f.a).join(', '), explain }, o || {});

  /* ---- 数据 ---- */
  const countA = [['🐱', 6, 'cats'], ['🚗', 4, 'cars'], ['🐬', 8, 'dolphins'], ['🐭', 1, 'mouse'], ['🚲', 2, 'bicycles'], ['🧽', 3, 'erasers'], ['🌸', 5, 'flowers'], ['🐦', 7, 'birds'], ['🐟', 9, 'fish'], ['👢', 10, 'boots']];
  const room = [['book', '📕', 10], ['chair', '🪑', 2], ['doll', '🧸', 4], ['pencil', '✏️', 6], ['sticker', '🏷️', 7]];
  const farm = [['dog', '🐶', 1], ['sheep', '🐑', 9], ['horses', '🐴', 8], ['ducks', '🦆', 3], ['chickens', '🐔', 5]];
  const shapesD = [['🔺', 3, 'triangles'], ['➕', 5, 'crosses'], ['🟪', 4, 'squares'], ['🔻', 6, 'triangles'], ['⭐', 7, 'stars'], ['⚫', 9, 'circles'], ['🔶', 8, 'diamonds'], ['❤️', 10, 'hearts']];
  const drawA = [[3, '🌸', '🏺', 'There are 3 flowers in the vase.', '花瓶里有 3 朵花。'], [6, '🍊', '🥣', 'There are 6 oranges in this bowl.', '碗里有 6 个橙子。'], [2, '🛞', '🚲', 'The bicycle has 2 wheels.', '自行车有 2 个轮子。'], [4, '🦵', '🪵', 'The table has 4 legs.', '桌子有 4 条腿。'], [7, '🐟', '🫙', 'There are 7 fish in this tank.', '鱼缸里有 7 条鱼。'], [5, '✨', '⭐', 'A star has 5 points.', '星星有 5 个角。'], [10, '🥚', '🧺', 'There are 10 eggs in the carton.', '盒子里有 10 个鸡蛋。'], [8, '🦵', '🕷️', 'The spider has 8 legs.', '蜘蛛有 8 条腿。']];
  const circleB = [['🍎', 8, ['seven', 'eight', 'nine']], ['🪥', 2, ['one', 'two', 'three']], ['🐘', 5, ['five', 'six', 'seven']], ['🐞', 6, ['six', 'seven', 'eight']], ['👧', 4, ['four', 'five', 'six']], ['🐛', 7, ['six', 'seven', 'eight']], ['☂️', 9, ['seven', 'eight', 'nine']], ['🧢', 10, ['eight', 'nine', 'ten']]];
  const tools = [['hammer', '🔨', 1], ['saw', '🪚', 0], ['nail', '📌', 10], ['spanner', '🔧', 5], ['screwdriver', '🪛', 2]];
  const sewing = [['scissors', '✂️', 3], ['spool of thread', '🧵', 6], ['safety pin', '🧷', 4], ['button', '🔘', 9], ['needle', '🪡', 8]];
  const keys = ['two', 'six', 'one', 'nine', 'five', 'three', 'four', 'seven', 'eight', 'ten'], cars = [5, 8, 2, 7, 6, 3, 10, 9, 1, 4];
  const drawB = [[1, '🎩', 'hat'], [4, '🥕', 'carrots'], [6, '⚽', 'balls'], [3, '🧦', 'socks'], [8, '🐟', 'fish']];
  const cmpA = [[['forks', '🍴', 4], ['spoons', '🥄', 4]], [['cows', '🐄', 6], ['goats', '🐐', 5]], [['bees', '🐝', 8], ['beetles', '🪲', 8]], [['stones', '🪨', 7], ['marbles', '🔮', 9]], [['stamps', '📮', 10], ['envelopes', '✉️', 10]]];
  const cmpB = [[['frogs', '🐸', 3], ['lily pads', '🪷', 6]], [['basketballs', '🏀', 4], ['soccer balls', '⚽', 5]], [['corn', '🌽', 7], ['carrots', '🥕', 5]], [['rulers', '📏', 9], ['scissors', '✂️', 6]], [['seahorses', '🐎', 8], ['starfish', '⭐', 10]]];
  const cmpC = [['trees', ['trees', '🌳', 3], ['flowers', '🌸', 6]], ['bowl', ['oranges', '🍊', 5], ['apples', '🍎', 4]], ['shirts', ['shirts', '👕', 3], ['dresses', '👗', 4]], ['children', ['boys', '👦', 7], ['girls', '👧', 3]], ['catsdogs', ['cats', '🐱', 8], ['dogs', '🐶', 5]]];
  const cntA = [[['🍪', 3], ['🥯', 7]], [['🌹', 6], ['🌻', 2]], [['🐦', 7], ['🐟', 8]], [['🧁', 10], ['🍪', 7]], [['🚌', 5], ['🚗', 9]]];
  const greaterB = [[3, 4, 'tridown'], [6, 9, 'circ'], [5, 2, 'tri'], [8, 7, 'rect'], [9, 10, 'oval']];
  const smallerC = [[10, 8], [1, 3], [7, 9], [5, 4], [6, 8]];
  const sameD = [
    ['same1', [['circle', '⚪', 4], ['square', '⬜', 5], ['triangle', '🔺', 3], ['star', '⭐', 5]], ['square', 'star']],
    ['same2', [['apple', '🍎', 8], ['orange', '🍊', 7], ['pear', '🍐', 7], ['grapes', '🍇', 6]], ['orange', 'pear']],
    ['same3', [['boy', '👦', 3], ['girl', '👧', 5], ['boy with glasses', '🧒', 7], ['girl with glasses', '👓', 3]], ['boy', 'girl with glasses']],
    ['same4', [['bee', '🐝', 2], ['beetle', '🪲', 4], ['fly', '🪰', 2], ['ladybird', '🐞', 2]], ['bee', 'fly', 'ladybird']],
  ];
  const moreA = [[7, 1, 'a'], [3, 1, 'a'], [1, 1, 'a'], [8, 1, 'b'], [5, 1, 'b'], [2, 1, 'b'], [4, -1, 'a'], [8, -1, 'a'], [7, -1, 'a'], [6, -1, 'b'], [9, -1, 'b'], [5, -1, 'b']];
  const patB = [[[2, 3, 4, 5, 6], [1, 2]], [[8, 7, 6, 5, 4], [1, 3]], [[5, 4, 3, 2, 1], [0, 4]], [[6, 7, 8, 9, 10], [2, 3]], [[7, 6, 5, 4, 3], [1, 4]]];

  const frames2 = (a, b) => pic(`<div class="cmp-dots" style="gap:14px">${L.frame(a[0], a[1])}${L.frame(b[0], b[1])}</div>`);
  const numshape = (n, cls) => `<span class="numshape ${cls}">${n}</span>`;
  const wordsTable = (items, folder) => items.map(([name, icon, n], i) => `${icon} ${name}: {{n${i}}} {{w${i}}}`).join('\n');
  const wordsFields = items => { const f = {}; items.forEach(([name, icon, n], i) => { f['n' + i] = { a: n }; f['w' + i] = choice(W(n), wordOpts(n)); }); return f; };
  const stampQ = (id, n, icon, scene, en, zh, pr) => ({ id, type: 'stamp', n, icon, scene: scene ? `<span class="scene">${scene}</span>` : '', sentence: { en, zh }, label: en, prompt: pr });

  unit(1).kps = [
    {
      id: 'l1-1-1', available: true,
      title: { zh: '数一数：1 到 10', en: 'Count numbers from 1 to 10' },
      intro: { zh: '用手指着，一个一个数：1、2、3……最后数到的数就是一共有几个。不要漏掉，也不要重复。', en: 'Point and count one by one. The last number you say is how many there are.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '数一数，写数字', en: 'Count and write the numbers on the lines provided' },
          example: { kind: 'l1count', n: { icon: '🐌', n: 3, frame: true, noun: 'snails' }, title: { zh: '3 只蜗牛', en: '1, 2, 3 → 3 snails' } },
          questions: countA.map(([icon, n, noun], i) => F(`l1-1-1-A${i + 1}`, pic(L.frame(icon, n)), `{{a}} ${icon}`, { a: { a: n } }, ['l1count', { icon, n, frame: true, noun }], '数一数有几个，写数字', 'Count and write the number', { label: `数 ${icon} → ${n}`, hint: { zh: '用手指着一个一个数，数到最后一个是几就写几。', en: 'Point and count.' } })) },
        { id: 'B', type: 'fill', title: { zh: 'Susie 的房间', en: "This is Susie's room. Count and write the numbers in the table below" },
          example: { kind: 'l1count', n: { icon: '📕', n: 10, pic: 'l1u1/room', noun: 'books' }, title: { zh: '房间里有几本书？', en: 'How many books?' } },
          questions: [F('l1-1-1-B1', pic(img('room')), room.map(([name, icon, n]) => `${icon} ${name}: {{${name}}}`).join('\n'), Object.fromEntries(room.map(([name, icon, n]) => [name, { a: n }])), ['l1count', { icon: '🪑', n: 2, pic: 'l1u1/room', noun: 'chairs' }], '在图里找一找，每样东西有几个？', 'Count and write the numbers', { label: 'Susie 的房间：book, chair, doll, pencil, sticker', hint: { zh: '一样一样找：书在书架和桌子上，铅笔在笔筒里，贴纸在桌上。', en: 'Look on the shelf, the table and the desk.' } })] },
        { id: 'C', type: 'fill', title: { zh: 'Jack 叔叔的农场', en: "This is Uncle Jack's farm. Count and write the numbers in the boxes below" },
          example: { kind: 'l1count', n: { icon: '🦆', n: 3, pic: 'l1u1/farm', noun: 'ducks' }, title: { zh: '池塘里有几只鸭子？', en: 'How many ducks?' } },
          questions: [F('l1-1-1-C1', pic(img('farm')), farm.map(([name, icon, n]) => `${icon} ${name}: {{${name}}}`).join('\n'), Object.fromEntries(farm.map(([name, icon, n]) => [name, { a: n }])), ['l1count', { icon: '🐴', n: 8, pic: 'l1u1/farm', noun: 'horses' }], '农场里每种动物有几只？', 'Count and write the numbers', { label: 'Jack 叔叔的农场：dog, sheep, horses, ducks, chickens', hint: { zh: '羊和马比较多，数的时候可以从左到右一行一行数。', en: 'Count row by row.' } })] },
        { id: 'D', type: 'fill', title: { zh: '数图形', en: 'Count and write the numbers on the lines provided' },
          example: { kind: 'l1count', n: { icon: '🟢', n: 4, noun: 'circles' }, title: { zh: '4 个圆', en: '4 circles' } },
          questions: shapesD.map(([icon, n, noun], i) => F(`l1-1-1-D${i + 1}`, pic(L.row(icon, n, { cls: 'shapes-row' })), `{{a}} ${noun}`, { a: { a: n } }, ['l1count', { icon, n, noun }], '数一数有几个图形', 'Count the shapes', { label: `数 ${icon} → ${n}` })) },
      ],
    },
    {
      id: 'l1-1-2', available: true,
      title: { zh: '数字和英文单词', en: 'Read and write numbers within 10 in numerals and words' },
      intro: { zh: '每个数字都有一个英文名字：1 one、2 two、3 three、4 four、5 five、6 six、7 seven、8 eight、9 nine、10 ten，0 是 zero。', en: 'Each number has a word: one, two, three ... ten. Zero means none.' },
      sections: [
        { id: 'A', type: 'stamp', title: { zh: '读句子，画出正确的数量', en: 'Read each sentence carefully. Complete the drawing' },
          example: { kind: 'l1stamp', n: { n: 1, icon: '〰️', scene: '<span class="scene">🐱</span>', sentence: 'The cat has 1 tail.' }, title: { zh: '猫有 1 条尾巴', en: 'The cat has 1 tail' } },
          questions: drawA.map(([n, icon, scene, en, zh], i) => stampQ(`l1-1-2-A${i + 1}`, n, icon, scene, en, zh, { zh: '句子里说有几个？就放几个。', en: 'Read the number in the sentence and show that many.' })) },
        { id: 'B', type: 'fill', title: { zh: '数一数，选对的单词', en: 'Count and circle the correct word' },
          example: { kind: 'l1words', n: { n: 3, icon: '🍌' }, title: { zh: '3 根香蕉 → three', en: '1, 2, 3 bananas → three' } },
          questions: circleB.map(([icon, n, opts], i) => F(`l1-1-2-B${i + 1}`, pic(L.row(icon, n)), `{{w}}`, { w: choice(W(n), opts) }, ['l1words', { n, icon }], '数一数，选出对的英文单词', 'Count and choose the correct word', { label: `${icon} × ${n} → ${W(n)}` })) },
        { id: 'C', type: 'fill', title: { zh: '爸爸的工具箱', en: "Count the number of things in Father's tool box. Write in numerals and words" },
          example: { kind: 'l1words', n: { n: 5, icon: '🔧' }, title: { zh: '5 把扳手：5, five', en: '5 spanners: 5, five' } },
          questions: [F('l1-1-2-C1', pic(img('toolbox')), wordsTable(tools), wordsFields(tools), ['l1words', { n: 10, icon: '📌' }], '每样工具有几个？写数字，再选英文。没有的写 0（zero）。', 'Write in numerals and words', { label: '工具箱：hammer, saw, nail, spanner, screwdriver', hint: { zh: '工具箱里没有锯子（saw），所以是 0，zero。钉子有 10 根。', en: 'There is no saw: 0, zero.' } })] },
        { id: 'D', type: 'fill', title: { zh: '妈妈的针线盒', en: "Count the number of things in Mother's sewing kit. Write in numerals and words" },
          example: { kind: 'l1words', n: { n: 3, icon: '✂️' }, title: { zh: '3 把剪刀：3, three', en: '3 pairs of scissors: 3, three' } },
          questions: [F('l1-1-2-D1', pic(img('sewing')), wordsTable(sewing), wordsFields(sewing), ['l1words', { n: 9, icon: '🔘' }], '每样东西有几个？写数字，再选英文。', 'Write in numerals and words', { label: '针线盒：scissors, thread, safety pin, button, needle', hint: { zh: '纽扣和针比较多，一个一个点着数。', en: 'Count the buttons and needles carefully.' } })] },
      ],
    },
    {
      id: 'l1-1-3', available: true,
      title: { zh: '数字配单词', en: 'Match numerals to words from 1 to 10' },
      intro: { zh: '看到英文单词，想一想它是几，再找到那个数字。', en: 'Read the word, think of the number, and match.' },
      sections: [
        { id: 'A', type: 'match', title: { zh: '钥匙配汽车', en: 'Match each key to the correct car' },
          example: { kind: 'l1match', n: { n: 2 }, title: { zh: 'two → 2', en: 'two → 2' } },
          questions: [{ id: 'l1-1-3-A1', type: 'match', label: '钥匙（单词）配汽车（数字）', left: keys.map(w => ({ id: w, html: `🔑 ${w}`, text: w })), right: cars.map(n => ({ id: String(n), html: `🚗 ${n}`, text: String(n) })), pairs: Object.fromEntries(keys.map(w => [w, String(L.WORDS.indexOf(w))])), prompt: { zh: '每把钥匙上是英文，找到写着这个数字的汽车，连起来', en: 'Match each key to the correct car.' }, hint: { zh: 'one 1、two 2、three 3、four 4、five 5、six 6、seven 7、eight 8、nine 9、ten 10。', en: 'one=1 ... ten=10' }, explain: ['l1words', { n: 6, icon: '🔑' }] }] },
        { id: 'B', type: 'stamp', title: { zh: '画出正确的数量', en: 'Draw to show the correct number' },
          example: { kind: 'l1stamp', n: { n: 3, icon: '🍎', sentence: '3 apples' }, title: { zh: '3 apples → 画 3 个苹果', en: '3 apples' } },
          questions: drawB.map(([n, icon, noun], i) => stampQ(`l1-1-3-B${i + 1}`, n, icon, '', `${n} ${noun}`, `${n} 个 ${noun}`, { zh: '看数字，放几个', en: 'Show the number.' })) },
      ],
    },
    {
      id: 'l1-1-4', available: true,
      title: { zh: '一个对一个，比多少', en: 'Match and compare numbers' },
      intro: { zh: '把两种东西一个对一个连起来。都有对子就是一样多（the same as）；多出来的那种就是更多（more），另一种更少（fewer）。', en: 'Match one to one. If some are left over, that kind has more; the other has fewer.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: 'more than、fewer than 还是 the same as', en: 'Fill in each blank with the words "more than", "fewer than" or "the same as"' },
          example: { kind: 'l1compare', n: { a: { label: 'boys', icon: '👦', n: 3 }, b: { label: 'girls', icon: '👧', n: 3 } }, title: { zh: '3 个男孩和 3 个女孩：一样多', en: 'The number of boys is the same as the number of girls' } },
          questions: cmpA.map(([[la, ia, na], [lb, ib, nb]], i) => { const rel = na === nb ? 'the same as' : na > nb ? 'more than' : 'fewer than';
            return F(`l1-1-4-A${i + 1}`, pic(L.pair({ label: la, icon: ia, n: na }, { label: lb, icon: ib, n: nb })), `The number of ${la} is {{r}} the number of ${lb}.`, { r: choice(rel, ['more than', 'fewer than', 'the same as']) }, ['l1compare', { a: { label: la, icon: ia, n: na }, b: { label: lb, icon: ib, n: nb } }], `${la} 比 ${lb} 多、少，还是一样多？`, `Compare ${la} and ${lb}`, { label: `${la} ${na} vs ${lb} ${nb}`, hint: { zh: '看有没有多出来没对子的：都有对子就是 the same as。', en: 'Any left over?' } }); }) },
        { id: 'B', type: 'fill', title: { zh: '谁多谁少', en: 'Match and fill in each blank with the correct word(s)' },
          example: { kind: 'l1compare', n: { a: { label: 'hamsters', icon: '🐹', n: 4 }, b: { label: 'rabbits', icon: '🐰', n: 2 } }, title: { zh: 'more hamsters than rabbits；fewer rabbits than hamsters', en: 'There are more hamsters than rabbits' } },
          questions: cmpB.map(([[la, ia, na], [lb, ib, nb]], i) => { const more = na > nb ? la : lb, less = na > nb ? lb : la;
            return F(`l1-1-4-B${i + 1}`, pic(L.pair({ label: la, icon: ia, n: na }, { label: lb, icon: ib, n: nb }, { lines: false })), `There are more {{a}} than {{b}}.\nThere are fewer {{c}} than {{d}}.`, { a: choice(more, [la, lb]), b: choice(less, [la, lb]), c: choice(less, [la, lb]), d: choice(more, [la, lb]) }, ['l1compare', { a: { label: la, icon: ia, n: na }, b: { label: lb, icon: ib, n: nb } }], `${la} 和 ${lb}，哪个多哪个少？`, `Which has more? Which has fewer?`, { label: `${la} ${na} / ${lb} ${nb}`, hint: { zh: `先数：${la} ${na} 个，${lb} ${nb} 个。多的填在 more 后面，少的填在 fewer 后面。`, en: 'Count each kind first.' } }); }) },
        { id: 'C', type: 'fill', title: { zh: '看图填 more / fewer', en: 'Fill in each blank with the correct word' },
          example: { kind: 'l1compare', n: { a: { label: 'boys', icon: '👦', n: 6 }, b: { label: 'bicycles', icon: '🚲', n: 4 } }, title: { zh: '6 个男孩 4 辆自行车：more boys than bicycles', en: '6 is more than 4' } },
          questions: cmpC.map(([picName, [la, ia, na], [lb, ib, nb]], i) => { const more = na > nb ? la : lb, less = na > nb ? lb : la;
            const nameForm = i === 0 || i === 3 || i === 4;
            return nameForm
              ? F(`l1-1-4-C${i + 1}`, pic(img(picName)), `There are more {{a}} than {{b}}.\nThere are fewer {{c}} than {{d}}.`, { a: choice(more, [la, lb]), b: choice(less, [la, lb]), c: choice(less, [la, lb]), d: choice(more, [la, lb]) }, ['l1compare', { a: { label: la, icon: ia, n: na }, b: { label: lb, icon: ib, n: nb } }], `数一数 ${la} 和 ${lb}，哪个多哪个少？`, 'Fill in the blanks', { label: `${la} ${na} / ${lb} ${nb}`, hint: { zh: `先数：${la} ${na}，${lb} ${nb}。`, en: 'Count first.' } })
              : F(`l1-1-4-C${i + 1}`, pic(img(picName)), `There are {{a}} ${la} than ${lb}.\nThere are {{b}} ${lb} than ${la}.`, { a: choice(na > nb ? 'more' : 'fewer', ['more', 'fewer']), b: choice(na > nb ? 'fewer' : 'more', ['more', 'fewer']) }, ['l1compare', { a: { label: la, icon: ia, n: na }, b: { label: lb, icon: ib, n: nb } }], `数一数 ${la} 和 ${lb}，填 more 还是 fewer？`, 'Fill in more or fewer', { label: `${la} ${na} / ${lb} ${nb}`, hint: { zh: `先数：${la} ${na}，${lb} ${nb}。`, en: 'Count first.' } }); }) },
      ],
    },
    {
      id: 'l1-1-5', available: true,
      title: { zh: '数一数，比大小', en: 'Count and compare numbers' },
      intro: { zh: '数出两种东西各有几个，再比数字：多的那个数大（greater），少的那个数小（smaller）。', en: 'Count both, then compare the numbers: more means greater, fewer means smaller.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '数一数，填一填', en: 'Count and fill in the blanks with the correct numbers' },
          example: { kind: 'l1greater', n: { a: 5, b: 4, which: 'greater' }, title: { zh: '5 个苹果 4 个橙子：5 大 4 小', en: '5 is greater than 4. 4 is smaller than 5.' } },
          questions: cntA.map(([[ia, na], [ib, nb]], i) => { const g = Math.max(na, nb), s = Math.min(na, nb);
            return F(`l1-1-5-A${i + 1}`, frames2([ia, na], [ib, nb]), `${ia} {{a}}　${ib} {{b}}\n{{c}} is greater than {{d}}.\n{{e}} is smaller than {{f}}.`, { a: { a: na }, b: { a: nb }, c: { a: g }, d: { a: s }, e: { a: s }, f: { a: g } }, ['l1greater', { a: na, b: nb, which: 'greater' }], '先数出两种各有几个，再比一比', 'Count, then compare', { label: `${ia} ${na} / ${ib} ${nb}`, hint: { zh: '格子多的那个数大。greater 是大，smaller 是小。', en: 'More filled boxes means greater.' } }); }) },
        { id: 'B', type: 'pickone', title: { zh: '点大的数', en: 'Colour the greater number' },
          example: { kind: 'l1greater', n: { a: 8, b: 6, which: 'greater' }, title: { zh: '8 和 6：8 大', en: '8 is greater than 6' } },
          questions: greaterB.map(([a, b, cls], i) => ({ id: `l1-1-5-B${i + 1}`, type: 'pickone', pic: '', label: `${a} 和 ${b} 哪个大`, options: [numshape(a, cls), numshape(b, cls)], answer: a > b ? 0 : 1, prompt: { zh: '哪个数大？点它', en: 'Which number is greater?' }, hint: { zh: '想象画点点：哪个画得多就是哪个大。', en: 'Think of dots: more dots means greater.' }, explain: ['l1greater', { a, b, which: 'greater' }] })) },
        { id: 'C', type: 'pickone', title: { zh: '点小的数', en: 'Circle the smaller number' },
          example: { kind: 'l1greater', n: { a: 6, b: 4, which: 'smaller' }, title: { zh: '6 和 4：4 小', en: '4 is smaller than 6' } },
          questions: smallerC.map(([a, b], i) => ({ id: `l1-1-5-C${i + 1}`, type: 'pickone', pic: '', label: `${a} 和 ${b} 哪个小`, options: [numshape(a, 'plain'), numshape(b, 'plain')], answer: a < b ? 0 : 1, prompt: { zh: '哪个数小？点它', en: 'Which number is smaller?' }, hint: { zh: '数数的时候先数到的数小。', en: 'The number you count first is smaller.' }, explain: ['l1greater', { a, b, which: 'smaller' }] })) },
        { id: 'D', type: 'pickmany', title: { zh: '找数量一样的', en: 'Count and circle the items of the same number' },
          example: { kind: 'l1same', n: { items: [{ label: 'A', icon: '🅰️', n: 6 }, { label: 'B', icon: '🅱️', n: 5 }, { label: 'C', icon: '©️', n: 6 }, { label: 'D', icon: '🇩', n: 4 }] }, title: { zh: 'A 和 C 都是 6 个', en: 'A and C: 6 each' } },
          questions: sameD.map(([picName, items, ans], i) => ({ id: `l1-1-5-D${i + 1}`, type: 'pickmany', pic: pic(img(picName)), label: `找一样多的：${items.map(it => it[1]).join(' ')}`, options: items.map(([label, icon]) => ({ val: label, html: `<span class="big">${icon}</span>${label}`, text: `${icon} ${label}` })), answer: ans, prompt: { zh: '每一种数一数，把数量一样的都点出来', en: 'Count each kind. Pick the ones with the same number.' }, explain: ['l1same', { items: items.map(([label, icon, n]) => ({ label, icon, n })), pic: 'l1u1/' + picName }] })) },
      ],
    },
    {
      id: 'l1-1-6', available: true,
      title: { zh: '数字的规律：多 1 少 1', en: 'Make number patterns' },
      intro: { zh: '1 more 就是再多一个，数字大 1；1 less 就是少一个，数字小 1。数数的顺序：1 2 3 4 5 6 7 8 9 10。', en: '1 more: the next number. 1 less: the number before.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '多 1 和少 1', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'l1moreless', n: { n: 2, delta: 1 }, title: { zh: '1 more than 2 is 3', en: '1 more than 2 is 3' } },
          questions: moreA.map(([n, d, form], i) => { const ans = n + d, ml = d > 0 ? 'more' : 'less';
            return F(`l1-1-6-A${i + 1}`, '', form === 'a' ? `1 ${ml} than ${n} is {{a}}.` : `{{a}} is 1 ${ml} than ${n}.`, { a: { a: ans } }, ['l1moreless', { n, delta: d }], d > 0 ? `比 ${n} 多 1 是几？` : `比 ${n} 少 1 是几？`, undefined, { hint: { zh: d > 0 ? `${n} 往后数一个。` : `${n} 往前数一个。`, en: d > 0 ? 'Count on one.' : 'Count back one.' } }); }) },
        { id: 'B', type: 'fill', title: { zh: '填数字规律', en: 'Complete each number pattern' },
          example: { kind: 'pattern', n: { seq: [4, 5, 6, 7, 8], blanks: [0, 4] }, title: { zh: '4, 5, 6, 7, 8：每次多 1', en: 'Count on: 4, 5, 6, 7 and 8' } },
          questions: patB.map(([seq, blanks], i) => { const keys = 'abcde'.split(''); const fields = {}; const text = seq.map((n, k) => blanks.includes(k) ? (fields[keys[k]] = { a: n }, `{{${keys[k]}}}`) : String(n)).join('  →  '); const fpic = pic(`<span class="l1row">${seq.map((n, k) => `<span class="flower">${blanks.includes(k) ? '?' : n}</span>`).join('')}</span>`);
            return F(`l1-1-6-B${i + 1}`, fpic, text, fields, ['pattern', { seq, blanks }], seq[1] > seq[0] || (blanks.includes(1) && seq[2] > seq[0]) ? '数字越来越大，每次多 1，填空格' : '数字越来越小，每次少 1，填空格', 'Complete the pattern', { label: seq.map((n, k) => blanks.includes(k) ? '__' : n).join(', '), hint: { zh: '看给出的数是往大数还是往小数，每次差 1。', en: 'Count on or count back by 1.' } }); }) },
        { id: 'C', type: 'fill', title: { zh: '从学校走到图书馆', en: 'Benjamin can walk to the library from his school. Fill in each blank with the correct number in numeral or word' },
          example: { kind: 'l1path', n: {}, title: { zh: '1 到 10，数字和英文', en: 'Numerals and words from 1 to 10' } },
          questions: [F('l1-1-6-C1', pic(`<div class="wordtab path"><span><b>10</b>ten</span><span><b>9</b>?</span><span><b>?</b>eight</span><span><b>7</b>?</span><span><b>?</b>six</span><span><b>5</b>?</span><span><b>?</b>four</span><span><b>3</b>?</span><span><b>?</b>two</span><span><b>1</b>?</span></div><div class="sub">🏫 School → Library 📚</div>`),
            `9 = {{w9}}\n{{n8}} = eight\n7 = {{w7}}\n{{n6}} = six\n5 = {{w5}}\n{{n4}} = four\n3 = {{w3}}\n{{n2}} = two\n1 = {{w1}}\nThe library is {{s}} steps away from the school.`,
            { w9: choice('nine', wordOpts(9)), n8: { a: 8 }, w7: choice('seven', wordOpts(7)), n6: { a: 6 }, w5: choice('five', wordOpts(5)), n4: { a: 4 }, w3: choice('three', wordOpts(3)), n2: { a: 2 }, w1: choice('one', wordOpts(1)), s: { a: 10 } },
            ['l1path', {}], '每个圈上面是数字，下面是英文，把空的补上。图书馆离学校几步？', 'Fill in the numeral or word', { label: '学校到图书馆：1 到 10 的数字和英文', hint: { zh: '从学校 1 开始往图书馆数：1 one, 2 two, 3 three ... 10 ten。', en: 'Count from 1 to 10.' } })] },
      ],
    },
  ];
})();
