/* Unit 10 两步加减应用题、Unit 11 质量 */
(function () {
  const U = window.MATH_DATA.units;
  const unit = num => U.find(u => u.num === num);
  const MS = window.MassUI;
  const S = (en, zh) => ({ en, zh });
  const A = (parts) => ({ kind: 'add', parts: parts.map(([label, v]) => ({ label, v })) });
  const Sb = (whole, known, unk) => ({ kind: 'sub', whole: { label: whole[0], v: whole[1] }, known: { label: known[0], v: known[1] }, unknown: { label: unk } });
  const Cm = (base, other, diff, otherIs) => ({ kind: 'cmp', base: { label: base[0], v: base[1] }, other: { label: other }, diff, otherIs });
  const W2 = (id, en, zh, s1, s2) => ({ id, type: 'word2', en, zh, steps: [s1, s2] });
  const W = (id, en, zh, model, sentence) => ({ id, type: 'word', en, zh, model, sentence });

  // ================= Unit 10 =================
  unit(10).kps = [
    {
      id: 'u10-1', available: true,
      title: { zh: '两步加减应用题', en: 'Solve two-step addition and subtraction word problems' },
      intro: { zh: '有的题要算两次：先用 (a) 算出一个数，再用这个数算 (b)。每一步都画 bar model。', en: 'Solve part (a) first, then use its answer for part (b).' },
      sections: [{ id: 'A', type: 'word2', title: { zh: '应用题', en: 'Do these word problems' },
        example: { kind: 'word2', n: W2('ex', 'There are 75 men and 55 women at a meeting. 61 of them wear glasses.', '会议上有 75 个男士和 55 个女士。其中 61 人戴眼镜。', { ask: S('How many people are there at the meeting?', '会议一共有多少人？'), model: A([['men', 75], ['women', 55]]), sentence: S('There are ___ people at the meeting.', '会议一共有 ___ 人。') }, { ask: S('How many of them do not wear glasses?', '不戴眼镜的有多少人？'), model: Sb(['people', 'ANS1'], ['glasses', 61], 'no glasses'), sentence: S('___ of them do not wear glasses.', '不戴眼镜的有 ___ 人。') }), title: { zh: '75 + 55，再减 61', en: 'Two steps' } },
        questions: [
          W2('u10-1-A1', 'Plank A is 18 m long. 7 m of it is sawn off. Plank B is 10 m longer than Plank A now.', '木板 A 长 18 m，锯掉了 7 m。木板 B 比现在的木板 A 长 10 m。', { ask: S('How long is Plank A now?', '木板 A 现在多长？'), model: Sb(['Plank A', 18], ['sawn off', 7], 'left'), sentence: S('Plank A is now ___ m long.', '木板 A 现在长 ___ m。') }, { ask: S('How long is Plank B?', '木板 B 多长？'), model: Cm(['Plank A', 'ANS1'], 'Plank B', 10, 'more'), sentence: S('Plank B is ___ m long.', '木板 B 长 ___ m。') }),
          W2('u10-1-A2', 'Daniel has $420. Darius has $90 less than Daniel. Darius spends $210 on shopping.', 'Daniel 有 420 元。Darius 比 Daniel 少 90 元。Darius 购物花了 210 元。', { ask: S('How much money does Darius have?', 'Darius 有多少钱？'), model: Cm(['Daniel', 420], 'Darius', 90, 'less'), sentence: S('Darius has $___.', 'Darius 有 ___ 元。') }, { ask: S('How much money does Darius have left?', 'Darius 还剩多少钱？'), model: Sb(['Darius', 'ANS1'], ['spent', 210], 'left'), sentence: S('Darius has $___ left.', 'Darius 还剩 ___ 元。') }),
          W2('u10-1-A3', 'Sofia collects 388 saga seeds. Tyler collects 99 more saga seeds than Sofia.', 'Sofia 收集了 388 颗相思豆。Tyler 比 Sofia 多收集 99 颗。', { ask: S('How many saga seeds does Tyler collect?', 'Tyler 收集了多少颗？'), model: Cm(['Sofia', 388], 'Tyler', 99, 'more'), sentence: S('Tyler collects ___ saga seeds.', 'Tyler 收集了 ___ 颗。') }, { ask: S('How many saga seeds do they collect altogether?', '他们一共收集了多少颗？'), model: A([['Sofia', 388], ['Tyler', 'ANS1']]), sentence: S('They collect ___ saga seeds altogether.', '他们一共收集了 ___ 颗。') }),
          W2('u10-1-A4', "Gordon's tower of blocks is 46 cm tall. He adds 16 cm of blocks to it. Helda's tower is 28 cm shorter than Gordon's tower now.", 'Gordon 的积木塔高 46 cm。他又加了 16 cm。Helda 的塔比现在 Gordon 的塔矮 28 cm。', { ask: S("How tall is Gordon's tower now?", 'Gordon 的塔现在多高？'), model: A([['tower', 46], ['added', 16]]), sentence: S("Gordon's tower is now ___ cm tall.", 'Gordon 的塔现在高 ___ cm。') }, { ask: S("How tall is Helda's tower?", 'Helda 的塔多高？'), model: Cm(['Gordon', 'ANS1'], 'Helda', 28, 'less'), sentence: S("Helda's tower is ___ cm tall.", 'Helda 的塔高 ___ cm。') }),
          W2('u10-1-A5', 'Monica and Natalia have 60 m of ribbon altogether. Monica has 27 m of ribbon. Natalia then buys another 13 m of ribbon.', 'Monica 和 Natalia 一共有 60 m 丝带。Monica 有 27 m。后来 Natalia 又买了 13 m。', { ask: S('How much ribbon does Natalia have at first?', 'Natalia 原来有多少丝带？'), model: Sb(['total', 60], ['Monica', 27], 'Natalia'), sentence: S('Natalia has ___ m of ribbon at first.', 'Natalia 原来有 ___ m 丝带。') }, { ask: S('How much ribbon does Natalia have in the end?', 'Natalia 最后有多少丝带？'), model: A([['Natalia', 'ANS1'], ['bought', 13]]), sentence: S('Natalia has ___ m of ribbon in the end.', 'Natalia 最后有 ___ m 丝带。') }),
          W2('u10-1-A6', 'A florist has 500 stalks of flowers. He sells 183 stalks in the morning and 249 stalks in the afternoon.', '花店有 500 枝花。上午卖了 183 枝，下午卖了 249 枝。', { ask: S('How many stalks of flowers does he have left at the end of the morning?', '上午结束时还剩多少枝？'), model: Sb(['flowers', 500], ['morning', 183], 'left'), sentence: S('He has ___ stalks of flowers left at the end of the morning.', '上午结束时还剩 ___ 枝。') }, { ask: S('How many stalks of flowers does he have left at the end of the day?', '一天结束时还剩多少枝？'), model: Sb(['left', 'ANS1'], ['afternoon', 249], 'left'), sentence: S('He has ___ stalks of flowers left at the end of the day.', '一天结束时还剩 ___ 枝。') }),
          W2('u10-1-A7', 'Raquel has $125. Her father gives her $80 and her mother gives her $65.', 'Raquel 有 125 元。爸爸给了她 80 元，妈妈给了她 65 元。', { ask: S('How much money does Raquel have after receiving money from her father?', '收到爸爸的钱后 Raquel 有多少钱？'), model: A([['Raquel', 125], ['father', 80]]), sentence: S('Raquel has $___ after receiving $80 from her father.', '收到爸爸的钱后 Raquel 有 ___ 元。') }, { ask: S('How much money does Raquel have in the end?', 'Raquel 最后有多少钱？'), model: A([['after father', 'ANS1'], ['mother', 65]]), sentence: S('Raquel has $___ in the end.', 'Raquel 最后有 ___ 元。') }),
          W2('u10-1-A8', 'A puppy is 41 cm long. A kitten is 15 cm shorter than the puppy.', '小狗长 41 cm。小猫比小狗短 15 cm。', { ask: S('What is the length of the kitten?', '小猫多长？'), model: Cm(['puppy', 41], 'kitten', 15, 'less'), sentence: S('The length of the kitten is ___ cm.', '小猫长 ___ cm。') }, { ask: S('What is the total length of the puppy and the kitten?', '小狗和小猫一共多长？'), model: A([['puppy', 41], ['kitten', 'ANS1']]), sentence: S('The total length of the puppy and the kitten is ___ cm.', '小狗和小猫一共长 ___ cm。') }),
          W2('u10-1-A9', 'Roderick has 257 local stamps and 134 foreign stamps. Stephanie has 79 more stamps than Roderick.', 'Roderick 有 257 张本地邮票和 134 张外国邮票。Stephanie 比 Roderick 多 79 张。', { ask: S('How many stamps does Roderick have altogether?', 'Roderick 一共有多少张？'), model: A([['local', 257], ['foreign', 134]]), sentence: S('Roderick has ___ stamps altogether.', 'Roderick 一共有 ___ 张。') }, { ask: S('How many stamps does Stephanie have?', 'Stephanie 有多少张？'), model: Cm(['Roderick', 'ANS1'], 'Stephanie', 79, 'more'), sentence: S('Stephanie has ___ stamps.', 'Stephanie 有 ___ 张。') }),
          W2('u10-1-A10', 'Mr Wong bought 384 pens on Monday and 288 pens on Tuesday.', 'Wong 先生星期一买了 384 支笔，星期二买了 288 支。', { ask: S('How many more pens did he buy on Monday than on Tuesday?', '星期一比星期二多买多少支？'), model: Sb(['Monday', 384], ['Tuesday', 288], 'more'), sentence: S('Mr Wong bought ___ more pens on Monday than on Tuesday.', '星期一比星期二多买 ___ 支。') }, { ask: S('How many pens did he buy in the two days?', '两天一共买了多少支？'), model: A([['Monday', 384], ['Tuesday', 288]]), sentence: S('He bought ___ pens in the two days.', '两天一共买了 ___ 支。') }),
        ] }],
    },
  ];

  // ================= Unit 11 =================
  const bal = (id, left, right, tilt, text, fieldsFn) => { const l = { label: left[0], emoji: left[1] }, r = { label: right[0], emoji: right[1] };
    const q = { id, type: 'fill', pic: MS.balance(l, r, tilt), label: `${left[0]} vs ${right[0]}`, prompt: { zh: '看天平，填一填', en: 'Look at the balance and fill in' }, text, explain: ['balance', { left: l, right: r, tilt }], hint: { zh: '天平哪边低，哪边重。一样高就一样重。', en: 'The lower side is heavier.' } };
    Object.assign(q, fieldsFn(l, r)); return q; };
  const heavyLite = (id, left, right, tilt) => bal(id, left, right, tilt, `The ${left[0]} is {{c}} the ${right[0]}.`, () => ({ fields: { c: { a: tilt === 'left' ? 'heavier than' : tilt === 'right' ? 'lighter than' : 'as heavy as', kind: 'choice', options: ['heavier than', 'lighter than', 'as heavy as'] } }, answerText: tilt === 'left' ? 'heavier than' : tilt === 'right' ? 'lighter than' : 'as heavy as' }));
  const whichHL = (id, left, right, tilt) => bal(id, left, right, tilt, `The {{h}} is heavier.\nThe {{l}} is lighter.`, () => { const h = tilt === 'left' ? left[0] : right[0], l = tilt === 'left' ? right[0] : left[0]; return { fields: { h: { a: h, kind: 'choice', options: [left[0], right[0]] }, l: { a: l, kind: 'choice', options: [left[0], right[0]] } }, answerText: `${h}; ${l}` }; });
  const bal2 = (id, p1, p2, order) => { const mk = p => [{ label: p[0][0], emoji: p[0][1] }, { label: p[1][0], emoji: p[1][1] }, p[2]];
    const a = mk(p1), b = mk(p2); const opts = order;
    return { id, type: 'fill', pic: `<div class="scale-row">${MS.balance(a[0], a[1], a[2])}${MS.balance(b[0], b[1], b[2])}</div>`, label: `${order.join(' > ')}`, prompt: { zh: '看两个天平，比一比', en: 'Look at the two balances' },
      text: `The {{h}} is the heaviest.\nThe {{l}} is the lightest.\nHeaviest to lightest: {{o1}}, {{o2}}, {{o3}}`,
      fields: { h: { a: order[0], kind: 'choice', options: opts }, l: { a: order[2], kind: 'choice', options: opts }, o1: { a: order[0], kind: 'choice', options: opts }, o2: { a: order[1], kind: 'choice', options: opts }, o3: { a: order[2], kind: 'choice', options: opts } },
      answerText: order.join(', '), explain: ['balance2', { pairs: [a, b], order }], hint: { zh: '每个天平低的那边重。把两个结果连起来想。', en: 'Lower side is heavier. Combine the two results.' } }; };
  const kgc = (id, item, tilt) => ({ id, type: 'fill', pic: MS.balance({ label: item, emoji: '📦' }, { label: '1 kg', emoji: '⚖️' }, tilt), label: `${item} vs 1 kg`, prompt: { zh: '比 1 kg 重还是轻？', en: 'More than, less than or as heavy as 1 kg?' },
    text: `The mass of the ${item} is {{c}} 1 kg.`, fields: { c: { a: tilt === 'left' ? 'more than' : tilt === 'right' ? 'less than' : 'as heavy as', kind: 'choice', options: ['more than', 'less than', 'as heavy as'] } }, answerText: tilt === 'left' ? 'more than' : tilt === 'right' ? 'less than' : 'as heavy as', explain: ['kgcompare', { item, tilt }], hint: { zh: '东西那边低就比 1 kg 重，高就比 1 kg 轻，一样高就一样重。', en: 'Lower = heavier.' } });
  const dialQ = (id, item, value, opts) => ({ id, type: 'fill', pic: MS.dial(value, Object.assign({ item }, opts)), label: `${item} ${value} ${opts.unit}`, prompt: { zh: '看秤，读一读', en: 'Read the scale' }, text: `The mass of the ${item} is {{v}} ${opts.unit}.`, fields: { v: { a: value } }, answerText: `${value} ${opts.unit}`, explain: ['readdial', Object.assign({ value, item }, opts)], hint: { zh: '看指针指着哪个数字。', en: 'Look where the pointer is.' } });
  const multiScale = (id, items, opts, extra) => { // items [[name, value]]; extra: [text, key, answer, choices?]
    const fields = {}; const text = items.map(([n, v], i) => (fields['m' + i] = { a: v }, `The mass of the ${n} is {{m${i}}} ${opts.unit}.`)).concat(extra.map(([t, k, a, ch]) => (fields[k] = ch ? { a, kind: 'choice', options: ch } : { a }, t.replace('___', `{{${k}}}`)))).join('\n');
    const pics = items.map(([n, v]) => opts.digital ? MS.digital(v, opts.unit, n) : MS.dial(v, Object.assign({ item: n }, opts))).join('');
    return { id, type: 'fill', pic: `<div class="scale-row">${pics}</div>`, label: items.map(i => i.join(' ')).join(', '), prompt: { zh: '读秤，比一比', en: 'Read the scales and compare' }, text, fields, answerText: items.map(i => i[1]).join(', ') + '; ' + extra.map(e => e[2]).join(', '), explain: ['readdial', Object.assign({ value: items[0][1], item: items[0][0] }, opts)], hint: { zh: '先读出每个的重量，再比大小。', en: 'Read each mass, then compare.' } }; };
  const gcube = (id, item, n, emoji) => ({ id, type: 'fill', pic: MS.balance({ label: item, emoji }, { label: `${n} × 1 g`, emoji: '🧊' }, 'level'), label: `${item} ≈ ${n} g`, prompt: { zh: '每个小方块 1 g，这个东西大约几克？', en: 'Each cube is 1 g. About how heavy?' }, text: `The mass of each cube is 1 g.\nThe mass of the ${item} is about {{v}} g.`, fields: { v: { a: n } }, answerText: `${n} g`, explain: ['gramcubes', { item, n }], hint: { zh: `天平平了，${n} 个 1 g 就是 ${n} g。`, en: `${n} cubes = ${n} g.` } });
  const mEq = (id, a, b, op, u) => ({ id, type: 'fill', text: `${a} ${u} ${op === '+' ? '+' : '−'} ${b} ${u} = {{p}} ${u}`, fields: { p: { a: op === '+' ? a + b : a - b } }, answerText: `${op === '+' ? a + b : a - b} ${u}`, prompt: { zh: '算一算', en: 'Work it out' }, explain: [op === '+' ? 'coladd' : 'colsub', { a, b }], hint: { zh: '单位相同，数字直接加减。', en: 'Same unit: just add or subtract.' } });
  const mulDivW = (id, en, zh, a, b, op, sentence, emoji) => { const isMul = op === '×', ans = isMul ? a * b : a / b;
    return { id: id, type: 'fill', label: en, prompt: { zh, en }, text: `{{x}} ${isMul ? '×' : '÷'} {{y}} = {{z}}\n${sentence.replace('___', '{{d}}')}`, fields: { x: { a: a }, y: { a: b }, z: { a: ans }, d: { a: ans } }, accept: isMul ? [{ x: a, y: b, z: ans, d: ans }, { x: b, y: a, z: ans, d: ans }] : undefined,
      answerText: `${a} ${isMul ? '×' : '÷'} ${b} = ${ans}`, explain: isMul ? ['mulgroups', { groups: a, each: b, emoji, noun: '' }] : op === '÷g' ? ['divgroup', { total: a, each: b, emoji, noun: '' }] : ['divshare', { total: a, groups: b, emoji, noun: '' }], hint: isMul ? { zh: `${a} 个 ${b}，用乘法。`, en: 'Multiply.' } : { zh: `一共 ${a}，平均分，用除法。`, en: 'Divide.' } }; };
  const KG = { max: 10, unit: 'kg', step: 1, minor: 0.5 }, G = { max: 800, unit: 'g', step: 100, minor: 50 };

  unit(11).kps = [
    {
      id: 'u11-1', available: true,
      title: { zh: '比较轻重', en: 'Compare two or more masses' },
      intro: { zh: '用天平比轻重：哪边低，哪边重（heavier）；哪边高，哪边轻（lighter）；一样高就一样重（as heavy as）。', en: 'On a balance, the lower side is heavier.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '看天平填一填', en: 'Fill in each blank with heavier than, lighter than or as heavy as' },
          example: { kind: 'balance', n: { left: { label: 'pear', emoji: '🍐' }, right: { label: 'apple', emoji: '🍎' }, tilt: 'left' }, title: { zh: '梨比苹果重', en: 'The pear is heavier than the apple' } },
          questions: [heavyLite('u11-1-A1', ['pen', '🖊️'], ['book', '📕'], 'right'), heavyLite('u11-1-A2', ['brick', '🧱'], ['shoe', '👟'], 'left'), heavyLite('u11-1-A3', ['cake', '🎂'], ['cookie', '🍪'], 'left'), heavyLite('u11-1-A4', ['cup', '☕'], ['mug', '🍵'], 'level'), heavyLite('u11-1-A5', ['egg', '🥚'], ['melon', '🍈'], 'right'), heavyLite('u11-1-A6', ['pumpkin', '🎃'], ['lemon', '🍋'], 'left'), heavyLite('u11-1-A7', ['feather', '🪶'], ['stone', '🪨'], 'right'), heavyLite('u11-1-A8', ['ball', '⚽'], ['ball', '🏀'], 'level'), heavyLite('u11-1-A9', ['toy car', '🚗'], ['bicycle', '🚲'], 'right'), heavyLite('u11-1-A10', ['dog', '🐕'], ['mouse', '🐭'], 'left')] },
        { id: 'B', type: 'fill', title: { zh: '哪个重，哪个轻', en: 'Which is heavier? Which is lighter?' },
          example: { kind: 'balance', n: { left: { label: 'watermelon', emoji: '🍉' }, right: { label: 'grapes', emoji: '🍇' }, tilt: 'left' }, title: { zh: '西瓜重，葡萄轻', en: 'Watermelon heavier, grapes lighter' } },
          questions: [whichHL('u11-1-B1', ['tennis ball', '🎾'], ['shuttlecock', '🏸'], 'left'), whichHL('u11-1-B2', ['kitten', '🐱'], ['puppy', '🐶'], 'right'), whichHL('u11-1-B3', ['handbag', '👜'], ['purse', '👛'], 'left'), whichHL('u11-1-B4', ['toy castle', '🏰'], ['toy car', '🚗'], 'right'), whichHL('u11-1-B5', ['clock', '⏰'], ['watch', '⌚'], 'left')] },
        { id: 'C', type: 'fill', title: { zh: '两个天平，排一排', en: 'Look at the balances and arrange the items' },
          example: { kind: 'balance2', n: { pairs: [[{ label: 'rabbit', emoji: '🐰' }, { label: 'guinea pig', emoji: '🐹' }, 'left'], [{ label: 'guinea pig', emoji: '🐹' }, { label: 'hamster', emoji: '🐭' }, 'left']], order: ['rabbit', 'guinea pig', 'hamster'] }, title: { zh: '兔子 > 豚鼠 > 仓鼠', en: 'rabbit > guinea pig > hamster' } },
          questions: [
            bal2('u11-1-C1', [['rabbit', '🐰'], ['guinea pig', '🐹'], 'left'], [['guinea pig', '🐹'], ['hamster', '🐭'], 'left'], ['rabbit', 'guinea pig', 'hamster']),
            bal2('u11-1-C2', [['chilli', '🌶️'], ['cucumber', '🥒'], 'right'], [['cucumber', '🥒'], ['brinjal', '🍆'], 'right'], ['brinjal', 'cucumber', 'chilli']),
            bal2('u11-1-C3', [['carton of milk', '🥛'], ['bottle of soda', '🧃'], 'left'], [['bottle of soda', '🧃'], ['cup of coffee', '☕'], 'left'], ['carton of milk', 'bottle of soda', 'cup of coffee']),
            bal2('u11-1-C4', [['tennis ball', '🎾'], ['soccer ball', '⚽'], 'right'], [['soccer ball', '⚽'], ['basketball', '🏀'], 'right'], ['basketball', 'soccer ball', 'tennis ball']),
            bal2('u11-1-C5', [['frog', '🐸'], ['terrapin', '🐢'], 'left'], [['terrapin', '🐢'], ['snail', '🐌'], 'left'], ['frog', 'terrapin', 'snail']),
            bal2('u11-1-C6', [['pair of glasses', '👓'], ['cap', '🧢'], 'right'], [['cap', '🧢'], ['belt', '👔'], 'right'], ['belt', 'cap', 'pair of glasses']),
            bal2('u11-1-C7', [['watermelon', '🍉'], ['jackfruit', '🍈'], 'right'], [['jackfruit', '🍈'], ['durian', '🥥'], 'right'], ['durian', 'jackfruit', 'watermelon']),
            bal2('u11-1-C8', [['doll', '🪆'], ['teddy bear', '🧸'], 'right'], [['teddy bear', '🧸'], ['toy robot', '🤖'], 'right'], ['toy robot', 'teddy bear', 'doll']),
            bal2('u11-1-C9', [['pen', '🖊️'], ['eraser', '🧽'], 'left'], [['eraser', '🧽'], ['sharpener', '🔪'], 'left'], ['pen', 'eraser', 'sharpener']),
            bal2('u11-1-C10', [['croissant', '🥐'], ['doughnut', '🍩'], 'left'], [['doughnut', '🍩'], ['cheesecake', '🍰'], 'left'], ['croissant', 'doughnut', 'cheesecake']),
          ] },
      ],
    },
    {
      id: 'u11-2', available: true,
      title: { zh: '用千克（kg）量', en: 'Measure and compare masses in kilograms' },
      intro: { zh: '千克（kg）是量重东西的单位。1 kg 大约是一大瓶水那么重。看秤的指针指着几就是几千克。', en: 'Kilogram (kg) for heavy things. Read the pointer on the scale.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '比 1 kg 重还是轻', en: 'Fill in each blank with more than, less than or as heavy as' },
          example: { kind: 'kgcompare', n: { item: 'bag of rice', tilt: 'left' }, title: { zh: '一袋米比 1 kg 重', en: 'The bag of rice is more than 1 kg' } },
          questions: [kgc('u11-2-A1', 'bag of potatoes', 'left'), kgc('u11-2-A2', 'bag of sugar', 'level'), kgc('u11-2-A3', 'loaf of bread', 'right'), kgc('u11-2-A4', 'packet of flour', 'level'), kgc('u11-2-A5', 'bunch of grapes', 'right'), kgc('u11-2-A6', 'watermelon', 'left'), kgc('u11-2-A7', 'pumpkin', 'left'), kgc('u11-2-A8', 'bag of salt', 'level'), kgc('u11-2-A9', 'bag of chips', 'right'), kgc('u11-2-A10', 'sack of rice', 'left')] },
        { id: 'B', type: 'fill', title: { zh: '读秤（千克）', en: 'Read the scales' },
          example: { kind: 'readdial', n: Object.assign({ value: 2, item: 'bag of onions' }, KG), title: { zh: '指针指着 2，就是 2 kg', en: 'The pointer is at 2: 2 kg' } },
          questions: [dialQ('u11-2-B1', 'bag of onions', 3, KG), dialQ('u11-2-B2', 'luggage', 45, { max: 60, unit: 'kg', step: 10, minor: 5 }), dialQ('u11-2-B3', 'bag of flour', 8, KG), dialQ('u11-2-B4', 'parcel', 4, KG), dialQ('u11-2-B5', 'bag of rice', 6, KG), dialQ('u11-2-B6', 'child', 22, { max: 50, unit: 'kg', step: 10, minor: 5 }), dialQ('u11-2-B7', 'bag of apples', 5, KG), dialQ('u11-2-B8', 'cabbage', 2, KG), dialQ('u11-2-B9', 'box', 12, { max: 20, unit: 'kg', step: 5, minor: 1 }), dialQ('u11-2-B10', 'basket of fruit', 7, KG)] },
        { id: 'C', type: 'fill', title: { zh: '读秤，比一比', en: 'Study the pictures and fill in the blanks' },
          example: { kind: 'readdial', n: Object.assign({ value: 9, item: 'box of clothes' }, KG), title: { zh: '衣服 9 kg，玩具 6 kg', en: 'clothes 9 kg, toys 6 kg' } },
          questions: [
            multiScale('u11-2-C1', [['box of clothes', 9], ['box of toys', 6]], KG, [['The box of ___ is heavier.', 'h', 'clothes', ['clothes', 'toys']], ['The box of ___ is lighter.', 'l', 'toys', ['clothes', 'toys']]]),
            multiScale('u11-2-C2', [['luggage A', 15], ['luggage B', 20]], { max: 25, unit: 'kg', step: 5, minor: 1 }, [['Luggage ___ is lighter.', 'l', 'A', ['A', 'B']], ['Luggage ___ is heavier.', 'h', 'B', ['A', 'B']]]),
            multiScale('u11-2-C3', [['watermelon', 4], ['durian', 5], ['pineapple', 2]], KG, [['The ___ is the heaviest.', 'h', 'durian', ['watermelon', 'durian', 'pineapple']], ['The ___ is the lightest.', 'l', 'pineapple', ['watermelon', 'durian', 'pineapple']], ['Heaviest to lightest: ___', 'o', 'durian, watermelon, pineapple', ['durian, watermelon, pineapple', 'pineapple, watermelon, durian', 'watermelon, durian, pineapple']]]),
            multiScale('u11-2-C4', [['Alan', 71], ['Susan', 55], ['Anne', 38]], { max: 80, unit: 'kg', step: 10, minor: 5 }, [['___ is the lightest.', 'l', 'Anne', ['Alan', 'Susan', 'Anne']], ['___ is the heaviest.', 'h', 'Alan', ['Alan', 'Susan', 'Anne']], ['Lightest to heaviest: ___', 'o', 'Anne, Susan, Alan', ['Anne, Susan, Alan', 'Alan, Susan, Anne', 'Susan, Anne, Alan']]]),
          ] },
      ],
    },
    {
      id: 'u11-3', available: true,
      title: { zh: '用克（g）量', en: 'Measure and compare masses in grams' },
      intro: { zh: '克（g）用来量轻的东西。1 g 很轻，大约一颗小方块那么重。1000 g = 1 kg。', en: 'Gram (g) for light things. 1000 g = 1 kg.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '读克数', en: 'Look at the pictures and fill in the blanks' },
          example: { kind: 'gramcubes', n: { item: 'stapler', n: 4 }, title: { zh: '订书机和 4 个 1 g 方块一样重', en: 'The stapler is about 4 g' } },
          questions: [gcube('u11-3-A1', 'stapler', 4, '📎'), gcube('u11-3-A2', 'water bottle', 6, '🧴'), gcube('u11-3-A3', 'book', 20, '📕'), gcube('u11-3-A4', 'vase', 9, '🏺'), gcube('u11-3-A5', 'calculator', 19, '🧮'), dialQ('u11-3-A6', 'calendar', 200, G), dialQ('u11-3-A7', 'CDs', 450, G), dialQ('u11-3-A8', 'strawberry', 50, G), dialQ('u11-3-A9', 'tablet', 380, G), dialQ('u11-3-A10', 'bar of soap', 120, G)] },
        { id: 'B', type: 'fill', title: { zh: '读秤，比一比', en: 'Study the pictures and fill in the blanks' },
          example: { kind: 'readdial', n: Object.assign({ value: 230, item: 'frog' }, G), title: { zh: '青蛙 230 g', en: 'frog 230 g' } },
          questions: [
            multiScale('u11-3-B1', [['frog', 230], ['snail', 80], ['terrapin', 110]], G, [['The ___ is the lightest.', 'l', 'snail', ['frog', 'snail', 'terrapin']], ['The ___ is the heaviest.', 'h', 'frog', ['frog', 'snail', 'terrapin']], ['Lightest to heaviest: ___', 'o', 'snail, terrapin, frog', ['snail, terrapin, frog', 'frog, terrapin, snail', 'terrapin, snail, frog']]]),
            multiScale('u11-3-B2', [['toy car', 195], ['toy ship', 350], ['toy plane', 285]], { unit: 'g', digital: true }, [['The ___ is the heaviest.', 'h', 'toy ship', ['toy car', 'toy ship', 'toy plane']], ['The ___ is the lightest.', 'l', 'toy car', ['toy car', 'toy ship', 'toy plane']], ['Heaviest to lightest: ___', 'o', 'toy ship, toy plane, toy car', ['toy ship, toy plane, toy car', 'toy car, toy plane, toy ship', 'toy plane, toy ship, toy car']]]),
            multiScale('u11-3-B3', [['loaf of bread', 200], ['bottle of jam', 300], ['carton of eggs', 250], ['carton of milk', 400]], G, [['The ___ is the heaviest.', 'h', 'carton of milk', ['loaf of bread', 'bottle of jam', 'carton of eggs', 'carton of milk']], ['The ___ is the lightest.', 'l', 'loaf of bread', ['loaf of bread', 'bottle of jam', 'carton of eggs', 'carton of milk']], ['Lightest to heaviest: ___', 'o', 'bread, eggs, jam, milk', ['bread, eggs, jam, milk', 'milk, jam, eggs, bread', 'bread, jam, eggs, milk']]]),
            multiScale('u11-3-B4', [['hole puncher', 250], ['tape dispenser', 530], ['stapler', 180], ['mechanical sharpener', 360]], { unit: 'g', digital: true }, [['The ___ is the lightest.', 'l', 'stapler', ['hole puncher', 'tape dispenser', 'stapler', 'mechanical sharpener']], ['The ___ is the heaviest.', 'h', 'tape dispenser', ['hole puncher', 'tape dispenser', 'stapler', 'mechanical sharpener']], ['Heaviest to lightest: ___', 'o', 'tape dispenser, sharpener, hole puncher, stapler', ['tape dispenser, sharpener, hole puncher, stapler', 'stapler, hole puncher, sharpener, tape dispenser', 'tape dispenser, hole puncher, sharpener, stapler']]]),
          ] },
      ],
    },
    {
      id: 'u11-4', available: true,
      title: { zh: '质量的加减', en: 'Add and subtract mass' },
      intro: { zh: '单位相同的质量可以直接加减，画 bar model 帮忙。', en: 'Add or subtract masses with the same unit.' },
      sections: [{ id: 'A', type: 'word', title: { zh: '应用题', en: 'Do these word problems' },
        example: { kind: 'word', n: W('ex', 'A calculator has a mass of 215 g. A tape dispenser has a mass of 365 g. What is the mass of the two items?', '计算器 215 g，胶带座 365 g。两样东西一共多重？', A([['calculator', 215], ['dispenser', 365]]), S('The mass of the two items is ___ g.', '两样东西一共 ___ g。')), title: { zh: '215 g + 365 g', en: '215 g + 365 g' } },
        questions: [
          W('u11-4-A1', 'Mary uses 50 kg of flour, 14 kg of sugar and 13 kg of butter to bake some cakes. How many kilograms of ingredients does she use altogether?', 'Mary 用了 50 kg 面粉、14 kg 糖和 13 kg 黄油做蛋糕。一共用了多少千克材料？', A([['flour', 50], ['sugar', 14], ['butter', 13]]), S('She uses ___ kg of ingredients altogether.', '她一共用了 ___ kg 材料。')),
          W('u11-4-A2', 'A contractor uses 83 kg of cement and sand to build a wall. If he uses 27 kg of sand, how much cement does he use?', '承包商用 83 kg 水泥和沙子砌墙。其中沙子 27 kg，水泥用了多少？', Sb(['total', 83], ['sand', 27], 'cement'), S('He uses ___ kg of cement.', '他用了 ___ kg 水泥。')),
          W('u11-4-A3', "Jason has a mass of 43 kg. Tom is 10 kg heavier than Jason. What is Tom's mass?", 'Jason 43 kg。Tom 比 Jason 重 10 kg。Tom 多重？', Cm(['Jason', 43], 'Tom', 10, 'more'), S("Tom's mass is ___ kg.", 'Tom ___ kg。')),
          W('u11-4-A4', "Andy's family consumes 13 kg of rice every month. Wayne's family consumes 4 kg less of rice. How much rice does Wayne's family consume every month?", 'Andy 家每月吃 13 kg 米。Wayne 家少吃 4 kg。Wayne 家每月吃多少米？', Cm(['Andy', 13], 'Wayne', 4, 'less'), S("Wayne's family consumes ___ kg of rice every month.", 'Wayne 家每月吃 ___ kg 米。')),
          W('u11-4-A5', 'There is 179 g of milk powder in a tin. 221 g more of milk powder is required to fill the tin. What is the capacity of the tin?', '罐里有 179 g 奶粉。还要 221 g 才能装满。罐子能装多少？', A([['in tin', 179], ['more', 221]]), S('The capacity of the tin is ___ g.', '罐子能装 ___ g。')),
          W('u11-4-A6', 'Kelly bought 380 g of meat. She then bought some fish. If the total mass of these two items was 945 g, how many grams of fish did she buy?', 'Kelly 买了 380 g 肉，又买了一些鱼。两样一共 945 g，鱼买了多少克？', Sb(['total', 945], ['meat', 380], 'fish'), S('She bought ___ g of fish.', '她买了 ___ g 鱼。')),
          W('u11-4-A7', 'Bonita has 165 g of coffee beans at home. She buys another 450 g of coffee beans from the shop. How much coffee beans does she have now?', 'Bonita 家里有 165 g 咖啡豆。她又买了 450 g。现在有多少？', A([['had', 165], ['bought', 450]]), S('She has ___ g of coffee beans now.', '她现在有 ___ g 咖啡豆。')),
          W('u11-4-A8', 'Paulo has 500 g of margarine. He uses 212 g of it for cooking. How much margarine has Paulo left?', 'Paulo 有 500 g 人造黄油。做饭用了 212 g。还剩多少？', Sb(['had', 500], ['used', 212], 'left'), S('Paulo has ___ g of margarine left.', 'Paulo 还剩 ___ g。')),
          W('u11-4-A9', 'The mass of a cow is 640 kg. It is 330 kg lighter than a horse. What is the mass of the horse?', '牛重 640 kg。牛比马轻 330 kg。马多重？（牛轻，所以马重）', Cm(['cow', 640], 'horse', 330, 'more'), S('The mass of the horse is ___ kg.', '马重 ___ kg。')),
          W('u11-4-A10', 'Margaret has 790 g of plasticine. She uses some of it to make a model and has 374 g of plasticine left. How much plasticine does Margaret use to make the model?', 'Margaret 有 790 g 橡皮泥。做了一个模型后还剩 374 g。做模型用了多少？', Sb(['had', 790], ['left', 374], 'used'), S('Margaret uses ___ g of plasticine to make the model.', 'Margaret 用了 ___ g 橡皮泥。')),
        ] }],
    },
    {
      id: 'u11-5', available: true,
      title: { zh: '质量的乘除', en: 'Multiply and divide mass' },
      intro: { zh: '几个一样重的东西一共多重，用乘法；平均分，用除法。', en: 'Equal masses: multiply. Share equally: divide.' },
      sections: [{ id: 'A', type: 'fill', title: { zh: '应用题', en: 'Do these word problems' },
        example: { kind: 'mulgroups', n: { groups: 5, each: 3, emoji: '📦', noun: 'kg' }, title: { zh: '5 个包裹各 3 kg：5 × 3 = 15 kg', en: '5 parcels of 3 kg: 5 × 3 = 15 kg' } },
        questions: [
          mulDivW('u11-5-A1', 'Aunt Eunice bought 3 similar bags of tomatoes. Each bag had a mass of 2 kg. What was the total mass of the 3 bags of tomatoes?', 'Eunice 阿姨买了 3 袋一样的西红柿，每袋 2 kg。3 袋一共多重？', 3, 2, '×', 'The total mass of the 3 bags of tomatoes was ___ kg.', '🍅'),
          mulDivW('u11-5-A2', 'Wilson bought 20 kg of rice. Each sack of rice had a mass of 5 kg. How many sacks of rice did Wilson buy?', 'Wilson 买了 20 kg 米，每袋 5 kg。他买了几袋？', 20, 5, '÷g', 'Wilson bought ___ sacks of rice.', '🍚'),
          mulDivW('u11-5-A3', 'Priscilla has 10 sweets. Each sweet has a mass of 4 g. What is the total mass of these 10 sweets?', 'Priscilla 有 10 颗糖，每颗 4 g。10 颗一共多重？', 10, 4, '×', 'The total mass of these 10 sweets is ___ g.', '🍬'),
          mulDivW('u11-5-A4', 'Mother bought 12 kg of lychees. She divided the lychees equally into 4 bags. What was the mass of each bag of lychees?', '妈妈买了 12 kg 荔枝，平均分成 4 袋。每袋多重？', 12, 4, '÷', 'The mass of each bag of lychees was ___ kg.', '🍒'),
          mulDivW('u11-5-A5', 'The mass of a small statue is 9 kg. What is the mass of 5 such statues?', '一个小雕像 9 kg。5 个一共多重？', 5, 9, '×', 'The mass of 5 such statues is ___ kg.', '🗿'),
          mulDivW('u11-5-A6', 'Two boxes of pencils weigh 160 g. How much does each box of pencils weigh?', '两盒铅笔重 160 g。每盒多重？', 160, 2, '÷', 'Each box of pencils weighs ___ g.', '✏️'),
          mulDivW('u11-5-A7', 'A box of staples weighs 100 g. How much do 2 boxes of staples weigh?', '一盒订书钉 100 g。2 盒多重？', 2, 100, '×', '2 boxes of staples weigh ___ g.', '📎'),
          mulDivW('u11-5-A8', 'A wholesaler has 50 kg of rice. He fills the rice equally into 10-kg bags. How many bags of rice are there?', '批发商有 50 kg 米，装成每袋 10 kg。有几袋？', 50, 10, '÷g', 'There are ___ bags of rice.', '🍚'),
          mulDivW('u11-5-A9', 'Dennis bought 4 terrapins from the pet shop. Each terrapin weighed 200 g. What was the total mass of the terrapins?', 'Dennis 买了 4 只乌龟，每只 200 g。一共多重？', 4, 200, '×', 'The total mass of the terrapins was ___ g.', '🐢'),
          mulDivW('u11-5-A10', 'Uncle has 360 g of salt. He keeps the salt equally in 3 containers. How much salt is there in each container?', '叔叔有 360 g 盐，平均装进 3 个罐子。每罐多少？', 360, 3, '÷', 'There is ___ g of salt in each container.', '🧂'),
        ] }],
    },
  ];
})();
