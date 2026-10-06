/* Level 3 · Unit 9  钱 */
(function () {
  const U = window.MATH_DATA.levels[3].units;
  const unit = num => U.find(u => u.num === num);
  const L = window.L3;
  const num = a => ({ a });
  const mon = c => ({ a: (c / 100).toFixed(2), kind: 'money' });
  const Fm = c => `$${(c / 100).toFixed(2)}`;
  const Dd = c => Math.floor(c / 100), Cc = c => c % 100;
  const F = (id, p, text, fields, explain, zh, en, o) => Object.assign({ id, type: 'fill', pic: p, label: text.replace(/\{\{\w+\}\}/g, '___').replace(/\n/g, ' '), prompt: { zh, en: en || 'Fill in the blanks' }, text, fields, answerText: Object.values(fields).map(f => f.a).join(', '), explain }, o || {});
  const col = (a, b, op) => `<div class="center">${L.mcol(a, b, op)}</div>`;
  const wp = (en, zh) => `<div class="wp-text"><div class="wp-en">${en}</div><div class="wp-zh">${zh}</div></div>`;

  const c2d = [15, 105, 400, 950, 825, 70, 220, 345, 505, 610];
  const d2c = [290, 115, 405, 30, 5, 800, 765, 320, 550, 605];
  const make1c = [25, 50, 15, 90, 65], make1d = [30, 45, 5, 60, 75];
  const splitAdd = [[400, 225], [1445, 600], [305, 515], [775, 220], [835, 1245]];
  const addE = [[600, 1095], [4320, 800], [1400, 9075], [3000, 6890], [905, 55], [2400, 90], [80, 7000], [8240, 680], [5360, 225], [4350, 180]];
  const addF = [[990, 50], [745, 95], [580, 275], [655, 460], [370, 885], [225, 1275], [3350, 4450], [5135, 2965], [1775, 30], [1090, 1195]];
  const colG = [[8675, 3745], [51555, 7925], [435, 90], [7320, 1800], [12580, 21440], [21700, 14285], [5620, 6415], [4970, 2850], [6790, 1770], [37865, 49235]];
  const splitSub = [[1065, 700], [995, 150], [1470, 1130], [2885, 80], [3550, 525]];
  const subB = [[2590, 80], [7855, 400], [3670, 60], [8275, 20], [4860, 45], [9950, 35], [8730, 410], [6955, 335], [9260, 130], [5880, 750]];
  const take1 = [[910, 60], [705, 70], [1030, 55], [1545, 90], [825, 65]];
  const subD = [[1150, 180], [3910, 890], [655, 260], [2520, 775], [1835, 1395]];
  const colE = [[5000, 560], [28050, 6660], [2310, 230], [75870, 32940], [14305, 2180], [95560, 8945], [4925, 560], [1000, 345], [65920, 9225], [51230, 46785]];
  const S = (en, zh) => ({ en, zh });
  const words = [
    ['Ashley buys a can of orange juice for $1.10 and a packet of rice for $3.50. How much does Ashley pay altogether?', 'Ashley 买了 $1.10 的橙汁和 $3.50 的米。一共付多少？', [{ a: 110, b: 350, op: '+', why: '两样合起来用加法。' }], S('Ashley pays $___ altogether.', 'Ashley 一共付 $___。')],
    ['Charlene bought a pair of shoes and two blouses for $75.35. If she gave the cashier $100, how much change would she receive?', 'Charlene 买鞋和两件上衣花了 $75.35。付给收银员 $100，找回多少？', [{ a: 10000, b: 7535, op: '-', why: '找零 = 付的钱 − 花的钱。' }], S('She would receive $___ change.', '找回 $___。')],
    ['Desmond gave $500 to his parents. His brother gave them $200 more than Desmond. How much did his parents receive altogether?', 'Desmond 给父母 $500，弟弟比他多给 $200。父母一共收到多少？', [{ a: 50000, b: 20000, op: '+', why: '先算弟弟给了多少：比 $500 多 $200。' }, { a: 50000, b: 'ANS', op: '+', why: '再把两人的加起来。' }], S('His parents received $___ altogether.', '父母一共收到 $___。')],
    ['Sally spends $75.70 to pay her phone bill, $125 on transport and $360 on food every month. How much does she spend altogether every month?', 'Sally 每月电话费 $75.70、交通 $125、伙食 $360。每月一共花多少？', [{ a: 7570, b: 12500, op: '+', why: '三样加起来，先加前两样。' }, { a: 'ANS', b: 36000, op: '+', why: '再加第三样。' }], S('She spends $___ altogether every month.', '每月一共花 $___。')],
    ['Amanda pays $750 for a table and five similar chairs. If the table costs $200, how much do the chairs cost?', 'Amanda 买一张桌子和五把椅子花了 $750。桌子 $200，椅子一共多少？', [{ a: 75000, b: 20000, op: '-', why: '总价减去桌子的价钱。' }], S('The chairs cost $___.', '椅子一共 $___。')],
    ['Beth saved $500 in January. She saved $350 in February. She needed to save $1000 in total by March. How much did Beth have to save in March?', 'Beth 一月存 $500，二月存 $350，到三月要一共存 $1000。三月要存多少？', [{ a: 50000, b: 35000, op: '+', why: '先算一二月存了多少。' }, { a: 100000, b: 'ANS', op: '-', why: '再用 $1000 减去已经存的。' }], S('Beth had to save $___ in March.', '三月要存 $___。')],
    ['Geraldine bought a soft toy for $34.90. She gave the shopkeeper 4 ten-dollar notes. How much change would she receive?', 'Geraldine 买了 $34.90 的毛绒玩具，付了 4 张 $10。找回多少？', [{ a: 4000, b: 3490, op: '-', why: '4 张 $10 是 $40，找零 = $40 − $34.90。' }], S('She would receive $___ change.', '找回 $___。')],
  ];

  unit(9).kps = [
    {
      id: 'l3-9-1', available: true,
      title: { zh: '元和分的加法', en: 'Add money in dollars and cents' },
      intro: { zh: '$1 = 100¢。写钱用小数点：小数点前是元，后面两位是分。加钱可以先加元再加分，分满 100 换成 $1；也可以列竖式，小数点对齐。', en: '$1 = 100¢. Add the dollars, then the cents. Regroup 100¢ into $1. Or add in columns with the decimal points lined up.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '分写成元', en: 'Write the amounts of money in dollars' },
          example: { kind: 'l3c2d', n: { c: 135 }, title: { zh: '135¢ = $1.35', en: '135¢ = $1.35' } },
          questions: c2d.map((c, i) => F(`l3-9-1-A${i + 1}`, '', `${c}¢ = $ {{a}}`, { a: mon(c) }, ['l3c2d', { c }], `${c}¢ 是多少元？`, 'Write in dollars', { label: `${c}¢ = ${Fm(c)}`, hint: { zh: '100 分是 1 元，剩下的分写在小数点后两位。', en: '100¢ = $1.' } })) },
        { id: 'B', type: 'fill', title: { zh: '元写成分', en: 'Write the amounts of money in cents' },
          example: { kind: 'l3d2c', n: { c: 245 }, title: { zh: '$2.45 = 245¢', en: '$2.45 = 245¢' } },
          questions: d2c.map((c, i) => F(`l3-9-1-B${i + 1}`, '', `${Fm(c)} = {{a}}¢`, { a: num(c) }, ['l3d2c', { c }], `${Fm(c)} 是多少分？`, 'Write in cents', { label: `${Fm(c)} = ${c}¢`, hint: { zh: '元 × 100 再加上分。', en: 'Dollars × 100 plus cents.' } })) },
        { id: 'C', type: 'fill', title: { zh: '凑成 $1', en: 'Write the correct answers on the lines provided' },
          example: { kind: 'l3make1', n: { c: 20 }, title: { zh: '20¢ + 80¢ = $1', en: '20¢ and 80¢ make $1' } },
          questions: make1c.map((c, i) => F(`l3-9-1-C${i + 1}`, '', `${c}¢ + {{a}}¢ = $1`, { a: num(100 - c) }, ['l3make1', { c }], `${c}¢ 再加几分是 $1？`, 'Make $1', { label: `${c}¢ + ${100 - c}¢ = $1`, hint: { zh: '$1 = 100¢，100 − ' + c + '。', en: '100 − ' + c + '.' } }))
            .concat(make1d.map((c, i) => F(`l3-9-1-C${i + 6}`, '', `${Fm(c)} + $ {{a}} = $1`, { a: mon(100 - c) }, ['l3make1', { c, dollars: true }], `${Fm(c)} 再加多少是 $1？`, 'Make $1', { label: `${Fm(c)} + ${Fm(100 - c)} = $1`, hint: { zh: `${Fm(c)} 是 ${c}¢，100 − ${c} = ${100 - c}¢，写成 ${Fm(100 - c)}。`, en: `100 − ${c} = ${100 - c}.` } }))) },
        { id: 'D', type: 'fill', title: { zh: '拆成元和分再加', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'l3msplitadd', n: { a: 535, b: 300 }, title: { zh: '$5 + $3 = $8，35¢ + 0¢ = 35¢，$8.35', en: '$5.35 + $3.00 = $8.35' } },
          questions: splitAdd.map(([a, b], i) => F(`l3-9-1-D${i + 1}`, '', `${Fm(a)} = $ {{d1}} + {{c1}}¢　${Fm(b)} = $ {{d2}} + {{c2}}¢\n${Fm(a)} + ${Fm(b)} = $ {{s}}`, { d1: num(Dd(a)), c1: num(Cc(a)), d2: num(Dd(b)), c2: num(Cc(b)), s: mon(a + b) }, ['l3msplitadd', { a, b }], '把两个数拆成元和分，先加元再加分', 'Split into dollars and cents', { label: `${Fm(a)} + ${Fm(b)} = ${Fm(a + b)}`, hint: { zh: '元加元，分加分，再合起来。', en: 'Dollars plus dollars, cents plus cents.' } })) },
        { id: 'E', type: 'fill', title: { zh: '直接加', en: 'Write the correct answers on the lines provided' },
          example: { kind: 'l3msplitadd', n: { a: 600, b: 1095 }, title: { zh: '$6.00 + $10.95 = $16.95', en: '$6.00 + $10.95 = $16.95' } },
          questions: addE.map(([a, b], i) => F(`l3-9-1-E${i + 1}`, '', `${Fm(a)} + ${Fm(b)} = $ {{s}}`, { s: mon(a + b) }, ['l3msplitadd', { a, b }], `${Fm(a)} + ${Fm(b)} 是多少？`, 'Add', { label: `${Fm(a)} + ${Fm(b)} = ${Fm(a + b)}`, hint: { zh: '先加元，再加分。', en: 'Dollars first, then cents.' } })) },
        { id: 'F', type: 'fill', title: { zh: '先凑 $1 再加', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'l3mmake1add', n: { a: 440, b: 80 }, title: { zh: '$4.40 = $4.20 + 20¢，80¢ + 20¢ = $1，$4.20 + $1 = $5.20', en: '$4.40 + $0.80 = $5.20' } },
          questions: addF.map(([a, b], i) => { const comp = 100 - Cc(b), p = a - comp; return F(`l3-9-1-F${i + 1}`, '', `${Fm(a)} = $ {{p}} + {{q}}¢\n${Fm(a)} + ${Fm(b)} = $ {{s}}`, { p: mon(p), q: num(comp), s: mon(a + b) }, ['l3mmake1add', { a, b }], `把 ${Fm(a)} 拆开，让分和 ${Cc(b)}¢ 凑成 $1`, 'Make $1 first', { label: `${Fm(a)} + ${Fm(b)} = ${Fm(a + b)}`, hint: { zh: `${Cc(b)}¢ 再加 ${comp}¢ 是 $1，所以从 ${Fm(a)} 里拆出 ${comp}¢。`, en: `${Cc(b)}¢ + ${comp}¢ = $1.` } }); }) },
        { id: 'G', type: 'fill', title: { zh: '竖式加', en: 'Add these amounts. Show your working clearly' },
          example: { kind: 'l3mcol', n: { a: 2350, b: 1320, op: '+' }, title: { zh: '$23.50 + $13.20 = $36.70', en: '$23.50 + $13.20 = $36.70' } },
          questions: colG.map(([a, b], i) => F(`l3-9-1-G${i + 1}`, col(a, b, '+'), `$ {{s}}`, { s: mon(a + b) }, ['l3mcol', { a, b, op: '+' }], '小数点对齐，先加分再加元', 'Add in columns', { label: `${Fm(a)} + ${Fm(b)} = ${Fm(a + b)}`, hint: { zh: '分满 100 进 $1。', en: 'Regroup 100¢ as $1.' } })) },
      ],
    },
    {
      id: 'l3-9-2', available: true,
      title: { zh: '元和分的减法', en: 'Subtract money in dollars and cents' },
      intro: { zh: '减钱先减元再减分。分不够减就从元里拿出 $1 = 100¢ 来减。竖式小数点对齐。', en: 'Subtract the dollars, then the cents. Regroup $1 as 100¢ when needed.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '拆成元和分再减', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'l3msplitsub', n: { a: 3940, b: 500 }, title: { zh: '$39 − $5 = $34，40¢ − 0¢ = 40¢，$34.40', en: '$39.40 − $5.00 = $34.40' } },
          questions: splitSub.map(([a, b], i) => F(`l3-9-2-A${i + 1}`, '', `${Fm(a)} = $ {{d1}} + {{c1}}¢　${Fm(b)} = $ {{d2}} + {{c2}}¢\n${Fm(a)} − ${Fm(b)} = $ {{s}}`, { d1: num(Dd(a)), c1: num(Cc(a)), d2: num(Dd(b)), c2: num(Cc(b)), s: mon(a - b) }, ['l3msplitsub', { a, b }], '拆成元和分，先减元再减分', 'Split into dollars and cents', { label: `${Fm(a)} − ${Fm(b)} = ${Fm(a - b)}`, hint: { zh: '元减元，分减分。', en: 'Dollars minus dollars, cents minus cents.' } })) },
        { id: 'B', type: 'fill', title: { zh: '直接减', en: 'Write the correct answers on the lines provided' },
          example: { kind: 'l3msplitsub', n: { a: 2590, b: 80 }, title: { zh: '$25.90 − $0.80 = $25.10', en: '$25.90 − $0.80 = $25.10' } },
          questions: subB.map(([a, b], i) => F(`l3-9-2-B${i + 1}`, '', `${Fm(a)} − ${Fm(b)} = $ {{s}}`, { s: mon(a - b) }, ['l3msplitsub', { a, b }], `${Fm(a)} − ${Fm(b)} 是多少？`, 'Subtract', { label: `${Fm(a)} − ${Fm(b)} = ${Fm(a - b)}`, hint: { zh: '先减元，再减分。', en: 'Dollars first, then cents.' } })) },
        { id: 'C', type: 'fill', title: { zh: '拆出 $1 来减', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'l3mtake1', n: { a: 1220, b: 40 }, title: { zh: '$12.20 = $11.20 + $1，$1 − 40¢ = 60¢，$11.80', en: '$12.20 − $0.40 = $11.80' } },
          questions: take1.map(([a, b], i) => F(`l3-9-2-C${i + 1}`, '', `${Fm(a)} = $ {{p}} + $ {{q}}\n${Fm(a)} − ${Fm(b)} = $ {{s}}`, { p: mon(a - 100), q: mon(100), s: mon(a - b) }, ['l3mtake1', { a, b }], `分不够减，从 ${Fm(a)} 里拆出 $1 来减`, 'Take $1 out first', { label: `${Fm(a)} − ${Fm(b)} = ${Fm(a - b)}`, hint: { zh: `${Fm(a)} = ${Fm(a - 100)} + $1，$1 − ${b}¢ = ${100 - b}¢。`, en: `$1 − ${b}¢ = ${100 - b}¢.` } })) },
        { id: 'D', type: 'fill', title: { zh: '把减数拆成元和分', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'l3msubsplit', n: { a: 940, b: 370 }, title: { zh: '$9.40 − $3 = $6.40，$6.40 − 70¢ = $5.70', en: '$9.40 − $3.70 = $5.70' } },
          questions: subD.map(([a, b], i) => F(`l3-9-2-D${i + 1}`, '', `${Fm(b)} = $ {{p}} + {{q}}¢\n${Fm(a)} − ${Fm(b)} = $ {{s}}`, { p: num(Dd(b)), q: num(Cc(b)), s: mon(a - b) }, ['l3msubsplit', { a, b }], `把 ${Fm(b)} 拆成元和分，分两次减`, 'Split the number you subtract', { label: `${Fm(a)} − ${Fm(b)} = ${Fm(a - b)}`, hint: { zh: `先减 $${Dd(b)}，再减 ${Cc(b)}¢。`, en: `Subtract $${Dd(b)}, then ${Cc(b)}¢.` } })) },
        { id: 'E', type: 'fill', title: { zh: '竖式减', en: 'Subtract these amounts. Show your working clearly' },
          example: { kind: 'l3mcol', n: { a: 780, b: 350, op: '-' }, title: { zh: '$7.80 − $3.50 = $4.30', en: '$7.80 − $3.50 = $4.30' } },
          questions: colE.map(([a, b], i) => F(`l3-9-2-E${i + 1}`, col(a, b, '-'), `$ {{s}}`, { s: mon(a - b) }, ['l3mcol', { a, b, op: '-' }], '小数点对齐，先减分再减元', 'Subtract in columns', { label: `${Fm(a)} − ${Fm(b)} = ${Fm(a - b)}`, hint: { zh: '分不够减，向元借 $1 = 100¢。', en: 'Regroup $1 as 100¢.' } })) },
      ],
    },
    {
      id: 'l3-9-3', available: true,
      title: { zh: '钱的应用题', en: 'Solve word problems related to money' },
      intro: { zh: '一共 / 合起来用加法；找零 / 剩下 / 多多少用减法。两步题先算第一步。写答案要带小数点两位。', en: 'Altogether: add. Change / left / how much more: subtract. Write the answer with two decimal places.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '应用题', en: 'Do these word problems. Show your working clearly' },
          example: { kind: 'l3mword', n: { en: 'A movie DVD costs $26.60. A music CD costs $13.95. How much more does the movie DVD cost than the music CD?', zh: '电影 DVD $26.60，音乐 CD $13.95。DVD 比 CD 贵多少？', steps: [{ a: 2660, b: 1395, op: '-', why: '贵多少 = 大的减小的。' }], sentence: S('The movie DVD costs $___ more than the music CD.', 'DVD 比 CD 贵 $___。') }, title: { zh: '$26.60 − $13.95 = $12.65', en: '$26.60 − $13.95 = $12.65' } },
          questions: words.map(([en, zh, steps, sentence], i) => { let last = 0; steps.forEach(st => { const a = st.a === 'ANS' ? last : st.a, b = st.b === 'ANS' ? last : st.b; last = st.op === '+' ? a + b : a - b; });
            return F(`l3-9-3-A${i + 1}`, wp(en, zh), sentence.en.replace('___', '{{d}}'), { d: mon(last) }, ['l3mword', { en, zh, steps, sentence }], steps.map(s => s.why).join(''), en, { label: en.slice(0, 50), hint: { zh: steps.map(s => s.why).join(''), en: 'Work it out step by step.' } }); })
            .concat([F('l3-9-3-A8', wp('After Andy had spent $80.35 and Aaron had spent $43.60, both had the same amount of money left. (a) If Andy had $19.65 left, how much money did Aaron have at first? (b) How much more money did Andy have than Aaron?', 'Andy 花了 $80.35，Aaron 花了 $43.60 之后，两人剩的钱一样多。(a) Andy 剩 $19.65，Aaron 原来有多少？(b) Andy 原来比 Aaron 多多少？'), '(a) Aaron had $ {{a}} at first.\n(b) Andy had $ {{b}} more than Aaron.', { a: mon(6325), b: mon(3675) }, ['l3mword', { en: 'After Andy had spent $80.35 and Aaron had spent $43.60, both had the same amount of money left. If Andy had $19.65 left, how much money did Aaron have at first? How much more money did Andy have than Aaron?', zh: 'Andy 花了 $80.35，Aaron 花了 $43.60 之后，两人剩的钱一样多。Andy 剩 $19.65。', steps: [{ a: 4360, b: 1965, op: '+', why: '两人剩的一样多，Aaron 也剩 $19.65。Aaron 原来 = 花的 + 剩的。' }, { a: 8035, b: 1965, op: '+', why: 'Andy 原来 = 花的 + 剩的。' }, { a: 'ANS', b: 6325, op: '-', why: 'Andy 原来 − Aaron 原来。' }], sentence: S('Andy had $___ more than Aaron.', 'Andy 比 Aaron 多 $___。') }], '两人剩的一样多，先算 Aaron 原来有多少，再比较', 'Two parts', { label: 'Andy / Aaron', hint: { zh: 'Aaron 原来 = $43.60 + $19.65；Andy 原来 = $80.35 + $19.65；再相减。', en: 'spent + left = at first.' } })]) },
      ],
    },
  ];
})();
