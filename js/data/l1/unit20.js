/* Level 1 · Unit 20  钱 */
(function () {
  const U = window.MATH_DATA.levels[1].units;
  const unit = num => U.find(u => u.num === num);
  const M = window.MoneyUI, NAMES = window.L1.MONEY_NAMES;
  const pic = html => `<div class="center">${html}</div>`;
  const choice = (a, options) => ({ a, kind: 'choice', options });
  const num = a => ({ a });
  const F = (id, p, text, fields, explain, zh, en, o) => Object.assign({ id, type: 'fill', pic: p, label: text.replace(/\{\{\w+\}\}/g, '___').replace(/\n/g, ' '), prompt: { zh, en: en || 'Fill in the blanks' }, text, fields, answerText: Object.values(fields).map(f => f.a).join(', '), explain }, o || {});
  const C = (id, a, b, op, unit, o) => Object.assign({ id, type: 'column', a, b, op, width: op === '+' && a + b >= 100 ? 3 : 2, label: `${unit === 'd' ? '$' : ''}${a} ${op === '+' ? '+' : '−'} ${unit === 'd' ? '$' : ''}${b}${unit === 'c' ? '¢' : ''}`, prompt: { zh: unit === 'c' ? '分的加减，列竖式算' : '元的加减，列竖式算', en: unit === 'c' ? 'Work out the cents.' : 'Work out the dollars.' }, explain: [unit === 'c' ? 'l1centsop' : 'l1dollarsop', { a, b, op }] }, o || {});
  const show = v => v >= 100 ? `$${v / 100}` : `${v}¢`;
  const wp = (en, zh) => `<div class="wp-text"><div class="wp-en">${en}</div><div class="wp-zh">${zh}</div></div>`;
  const D = n => n * 100;
  const sum = arr => arr.reduce((s, v) => s + v, 0);
  const allNames = Object.values(NAMES);
  const nameOpts = v => { const vs = [1, 5, 10, 20, 50, 100, 200, 500, 1000, 5000, 10000]; const i = vs.indexOf(v); const pick = [v, vs[(i + 1) % vs.length], vs[(i + vs.length - 1) % vs.length], vs[(i + 5) % vs.length]]; return [...new Set(pick)].map(x => NAMES[x]); };
  const two = (ga, gb) => pic(`<div class="money-two"><span>${M.group(ga)}</span><span class="op">?</span><span>${M.group(gb)}</span></div>`);
  const tags = (prices, u) => `<div class="price-tags">${prices.map(([n, p]) => `<span class="ptag">${n} <b>${u === 'd' ? '$' + p : p + '¢'}</b></span>`).join('')}</div>`;

  /* ---- KP1 ---- */
  const nameA = [1, 5, 10, 20, 50, 100, 200, 500, 1000, 10000];
  const wordB = [['three cents', 3, 'c'], ['twelve cents', 12, 'c'], ['fifteen cents', 15, 'c'], ['twenty-five cents', 25, 'c'], ['seventy-six cents', 76, 'c'], ['four dollars', 4, 'd'], ['eight dollars', 8, 'd'], ['seventeen dollars', 17, 'd'], ['fifty dollars', 50, 'd'], ['ninety-two dollars', 92, 'd']];
  const coinsC = [5, 20, 100, 20, 1, 5, 10, 10, 5, 50, 50, 20, 20, 10, 100, 10, 50, 1, 10, 5, 1, 10, 20];   // 1¢×3 5¢×4 10¢×6 20¢×5 50¢×3 $1×2
  const notesD = [5000, 500, 1000, 200, 10000, 500, 200, 200, 200, 1000, 1000, 5000, 500, 5000, 10000, 1000, 200, 500].slice(0, 17);   // $2×5 $5×4 $10×3 $50×3 $100×2
  /* ---- KP2 ---- */
  const valA = [[1, 9], [5, 7], [10, 6], [20, 4], [50, 4], [100, 7]];
  const valB = [[200, 8], [500, 5], [1000, 4], [5000, 2]];
  /* ---- KP3 ---- */
  const exA = [[10000, 1000], [5000, 500], [1000, 100], [500, 50], [200, 20], [100, 10], [50, 5], [10, 1]];
  const exB = [[50, 10, 'ten-cent coins'], [100, 50, 'fifty-cent coins'], [500, 100, 'one-dollar coins'], [1000, 500, 'five-dollar notes'], [10, 5, 'five-cent coins'], [5000, 1000, 'ten-dollar notes'], [200, 50, 'fifty-cent coins'], [100, 20, 'twenty-cent coins'], [10000, 500, 'five-dollar notes'], [100, 5, 'five-cent coins']];
  /* ---- KP4 ---- */
  const amtA = [[20, 20, 5, 5], [50, 10, 10, 1, 1, 1], [20, 20, 20, 10, 10, 1], [50, 5, 5, 5, 5, 5], [50, 20, 10, 10, 5, 1, 1, 1], [1000, 1000, 200, 200, 200], [5000, 500, 500, 100, 100, 100, 100], [1000, 1000, 1000, 1000, 500, 500, 500, 100, 100], [5000, 200, 200, 200, 200, 200, 200], [5000, 1000, 1000, 1000, 500, 500, 200, 200, 200, 100, 100, 100]];
  const pickB = [[35, [20, 20, 10, 10, 5, 5], '🍊'], [45, [10, 10, 10, 5, 5, 5, 5], '🧀'], [60, [50, 20, 20, 10, 5], '🐟'], [70, [20, 20, 10, 10, 5, 5, 5, 5], '☕'], [95, [50, 50, 20, 10, 10, 10, 5, 5], '🍨'], [D(8), [1000, 500, 500, 200, 200, 100, 100], '👕'], [D(19), [1000, 1000, 500, 500, 200, 100, 100, 100], '🧸'], [D(36), [1000, 1000, 1000, 500, 200, 100, 100, 100], '✈️'], [D(65), [5000, 1000, 1000, 200, 200, 200, 100, 100], '🌀'], [D(84), [5000, 1000, 1000, 500, 500, 500, 200, 200, 100], '👟']];
  const pickC = [[25, [[20, 20, 10, 5, 5], [10, 10, 10, 5, 5]], '🍬'], [40, [[50, 20, 10, 5, 5, 5], [10, 10, 5, 5, 5, 5, 5]], '🥕'], [55, [[50, 20, 10, 10, 5, 5], [20, 20, 10, 10, 5, 5]], '🖊️'], [75, [[50, 50, 20, 20, 10, 5, 5], [20, 20, 20, 10, 10, 5, 5]], '📓'], [90, [[50, 50, 20, 10, 5, 5, 5], [20, 20, 20, 10, 10, 5, 5, 5]], '🥪'], [D(5), [[200, 200, 200, 100, 100], [200, 100, 100, 100, 100]], '🧴'], [D(23), [[1000, 1000, 500, 200, 200, 100, 100], [500, 500, 500, 500, 500, 200, 100, 100]], '🤖'], [D(48), [[1000, 1000, 500, 200, 100, 100, 1000, 1000, 500, 200], [1000, 1000, 500, 500, 200, 100, 100, 1000, 500, 200, 200]], '🏸'], [D(72), [[5000, 5000, 1000, 1000, 1000, 500, 200], [5000, 1000, 500, 200, 200, 200, 100, 100]], '🧹'], [D(99), [[5000, 1000, 1000, 500, 200, 5000, 1000, 1000, 200, 200], [5000, 1000, 500, 200, 200, 100, 1000, 1000, 500, 200, 200, 100]], '🖨️']];
  /* ---- KP5 分 ---- */
  const cA = [[[5, 5], [10, 5, 5]], [[20, 10], [10, 5]], [[20, 10, 10, 5], [10, 10]], [[20, 5], [50, 5]], [[50, 10], [20, 10, 5]]];
  const cB = [[20, 15], [25, 30], [40, 20], [50, 25], [35, 55]];
  const cC = [[[20, 20, 10], [10, 5]], [[50, 10, 5], [20, 5]], [[50, 20, 5], [50, 10]], [[20, 20, 20, 20], [20, 20, 10]], [[50, 20, 20, 5], [20, 10, 10, 5]]];
  const cD = [[40, 35], [55, 45], [60, 25], [85, 60], [90, 50]];
  const statP = [['pencil', 30], ['eraser', 20], ['ruler', 65], ['notebook', 40], ['bookmark', 55], ['pen', 70], ['clip', 15]];
  const snackP = [['fishballs', 30], ['chicken nuggets', 35], ['doughnut', 25], ['curry puff', 60], ['sandwich', 95], ['chicken wing', 75], ['cheese dog', 40]];
  const fruitP = [['kiwifruit', 85], ['starfruit', 60], ['watermelon', 50], ['apple', 40], ['pineapple', 55], ['papaya', 45], ['honeydew', 70]];
  /* ---- KP6 元 ---- */
  const dA = [[[1000, 1000, 100], [1000, 500, 200]], [[1000, 1000, 200, 100], [1000, 1000, 1000, 500, 200, 100]], [[5000, 1000], [1000, 500]], [[1000, 1000, 200, 200], [5000, 500, 200, 200]], [[1000, 1000, 1000, 200, 200, 200], [5000, 1000, 200]]];
  const dB = [[33, 67], [76, 19], [54, 22], [41, 48], [85, 13]];
  const dC = [[[1000, 1000, 500, 100], [1000, 500, 200, 100]], [[1000, 1000, 1000, 1000, 200], [1000, 1000, 500]], [[5000, 5000], [5000, 100]], [[5000, 1000, 1000, 200, 100], [1000, 1000, 1000, 1000, 500, 200]], [[5000, 1000, 1000, 1000, 1000, 200, 200], [1000, 1000, 1000, 500, 200, 200]]];
  const dD = [[57, 14], [63, 35], [40, 19], [82, 56], [91, 48]];
  const toyP = [['toy aeroplane', 17], ['doll', 20], ['playing cards', 8], ['toy robot', 35], ['toy monkey', 14], ['toy helicopter', 60], ['toy car', 44]];
  const deptP = [['socks', 5], ['handbag', 45], ['polo shirt', 12], ['shorts', 8], ['pants', 30], ['skirt', 38], ['blouse', 27], ['shirt', 25]];
  const shopP = [['beach ball', 8], ['bag', 25], ['beach umbrella', 33], ['swimming costume', 25], ['mat', 13], ['slippers', 5], ['swimming trunks', 12], ['float', 16]];
  /* ---- KP7 ---- */
  const words = [
    ['Frankie buys an eraser for 60¢ and a ruler for 25¢. How much does he spend in all?', 'Frankie 买了 60¢ 的橡皮和 25¢ 的尺子。他一共花了多少？', 60, 25, '+', 'c', 'He spends ___ in all.'],
    ['Nelson has a daily allowance of 90¢. He spends 55¢ and saves the rest of his money. How much does he save every day?', 'Nelson 每天有 90¢ 零花钱，花掉 55¢，剩下的存起来。他每天存多少？', 90, 55, '-', 'c', 'He saves ___ every day.'],
    ['Grandmother spends $34 on transport every week. She spends $55 on food every week. How much does she spend altogether in a week?', '奶奶每周交通花 $34，吃饭花 $55。她一周一共花多少？', 34, 55, '+', 'd', 'She spends ___ altogether in a week.'],
    ['Father buys a DVD player for $68. He pays the cashier $100. How much change does he get?', '爸爸买了 $68 的 DVD 机，付给收银员 $100。他找回多少钱？', 100, 68, '-', 'd', 'He gets ___ in change.'],
    ['Mary saves $40. Her mother gives her another $15. How much money does she have now?', 'Mary 存了 $40，妈妈又给她 $15。她现在有多少钱？', 40, 15, '+', 'd', 'She has ___ now.'],
    ['Tommy wants to buy a lollipop that costs 70¢. He only has 45¢. How much more money does he need?', 'Tommy 想买 70¢ 的棒棒糖，他只有 45¢。他还差多少钱？', 70, 45, '-', 'c', 'He needs ___ more.'],
    ['Candice spends $29 on a blouse. She spends $12 more on a skirt than on the blouse. How much does she spend on the skirt?', 'Candice 买上衣花了 $29，买裙子比上衣多花 $12。裙子花了多少？', 29, 12, '+', 'd', 'She spends ___ on the skirt.'],
    ['Donna has 95¢ in her purse. She donates 20¢ to charity. How much has she left?', 'Donna 钱包里有 95¢，捐了 20¢。她还剩多少？', 95, 20, '-', 'c', 'She has ___ left.'],
    ['An eraser costs 25¢. A sharpener costs 65¢. How much do the two items cost altogether?', '橡皮 25¢，卷笔刀 65¢。两样一共多少钱？', 25, 65, '+', 'c', 'The two items cost ___ altogether.'],
    ['At a garage sale, a rocking chair is selling for $77. A radio is selling for $34 less than the rocking chair. How much is the radio selling for?', '摇椅卖 $77，收音机比摇椅便宜 $34。收音机卖多少钱？', 77, 34, '-', 'd', 'The radio is selling for ___.'],
  ];

  const u = unit => unit === 'd' ? v => `$${v}` : v => `${v}¢`;
  const blank = (unit, key) => unit === 'd' ? `${'$'}{{${key}}}` : `{{${key}}}¢`;
  const shopQ = (id, prices, unit, en, zh, a, b, op, sent) => F(id, wp(en, zh) + tags(prices, unit), sent.replace('___', blank(unit, 'd')), { d: num(op === '+' ? a + b : a - b) }, ['l1shop', { en, zh, prices, a, b, op, unit, sentence: sent, ans: op === '+' ? a + b : a - b }], op === '+' ? '两样合起来，用加法' : '找零 / 还差 / 多多少，用减法', en, { label: `${u(unit)(a)} ${op === '+' ? '+' : '−'} ${u(unit)(b)}`, hint: { zh: `看价钱：${u(unit)(a)} ${op === '+' ? '+' : '−'} ${u(unit)(b)}。`, en: `${u(unit)(a)} ${op} ${u(unit)(b)}.` } });
  const pairQ = (id, prices, unit, en, zh, p1, p2, total) => { const names = prices.map(p => p[0]); const a = prices.find(p => p[0] === p1)[1], b = prices.find(p => p[0] === p2)[1];
    return F(id, wp(en, zh) + tags(prices, unit), '{{p}} and {{q}}', { p: choice(p1, names), q: choice(p2, names) }, ['l1shop', { en, zh, prices, a, b, unit, ans: total, pair: [p1, p2] }], `哪两样加起来正好 ${u(unit)(total)}？`, en, { accept: [{ p: p1, q: p2 }, { p: p2, q: p1 }], label: `${p1} + ${p2} = ${u(unit)(total)}`, hint: { zh: '两个价钱加起来试一试。', en: 'Try adding pairs.' } }); };
  const whichQ = (id, prices, unit, en, zh, a, b, ansName) => F(id, wp(en, zh) + tags(prices, unit), '{{p}}', { p: choice(ansName, prices.map(p => p[0])) }, ['l1shop', { en, zh, prices, a, b, op: '-', unit, sentence: `She buys the ___.`.replace('___', ansName), ans: a - b }], `花掉的是多少？是哪一样？`, en, { label: `${u(unit)(a)} − ${u(unit)(b)} = ${u(unit)(a - b)} → ${ansName}`, hint: { zh: `原来的钱减剩下的钱，就是买的东西的价钱。`, en: 'Money at first − money left = price.' } });

  unit(20).kps = [
    {
      id: 'l1-20-1', available: true,
      title: { zh: '认识硬币和纸币', en: 'Know money in cents and dollars' },
      intro: { zh: '硬币：1¢、5¢、10¢、20¢、50¢、$1；纸币：$2、$5、$10、$50、$100。¢ 是分（cent），$ 是元（dollar）。', en: 'Coins: 1¢, 5¢, 10¢, 20¢, 50¢, $1. Notes: $2, $5, $10, $50, $100.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '这是多少钱', en: 'Write the value of each coin or note in words' },
          example: { kind: 'l1coinname', n: { v: 5000 }, title: { zh: '$50 = fifty dollars', en: 'fifty dollars' } },
          questions: nameA.map((v, i) => F(`l1-20-1-A${i + 1}`, pic(M.piece(v)), '{{w}}', { w: choice(NAMES[v], nameOpts(v)) }, ['l1coinname', { v }], '这是多少钱？选英文', 'Which is it?', { label: `${show(v)} = ${NAMES[v]}`, hint: { zh: '看上面的数字和符号：¢ 是分，$ 是元。', en: '¢ cents, $ dollars.' } })) },
        { id: 'B', type: 'fill', title: { zh: '英文写成数字', en: 'Write the values of money in numerals' },
          example: { kind: 'l1coinname', n: { v: 20 }, title: { zh: 'twenty cents = 20¢', en: '20¢' } },
          questions: wordB.map(([w, n, un], i) => F(`l1-20-1-B${i + 1}`, '', `${w} = ${blank(un, 'n')}`, { n: num(n) }, ['l1word100', { n }], `${w} 是多少？`, 'Write in numerals', { label: `${w} = ${u(un)(n)}`, hint: { zh: 'cents 写 ¢，dollars 写 $。', en: 'cents → ¢, dollars → $.' } })) },
        { id: 'C', type: 'fill', title: { zh: '数硬币', en: 'Find the number of coins in the picture below' },
          example: { kind: 'l1moneycount', n: { items: [10, 5, 10, 50, 10], v: 10 }, title: { zh: '找出所有 10¢，数一数', en: 'Count the 10¢ coins' } },
          questions: [F('l1-20-1-C1', pic(M.group(coinsC)), '{{a}} 1¢ coins\n{{b}} 5¢ coins\n{{c}} 10¢ coins\n{{d}} 20¢ coins\n{{e}} 50¢ coins\n{{f}} $1 coins', { a: num(3), b: num(4), c: num(6), d: num(5), e: num(3), f: num(2) }, ['l1moneycount', { items: coinsC, v: 10 }], '每种硬币各有几个？', 'How many of each coin?', { label: '数硬币', hint: { zh: '一种一种找，找到一个数一个。', en: 'Count one kind at a time.' } })] },
        { id: 'D', type: 'fill', title: { zh: '数纸币', en: 'Find the number of notes in the picture below' },
          example: { kind: 'l1moneycount', n: { items: [500, 200, 1000, 500, 200], v: 500 }, title: { zh: '找出所有 $5，数一数', en: 'Count the $5 notes' } },
          questions: [F('l1-20-1-D1', pic(M.group(notesD)), '{{a}} $2 notes\n{{b}} $5 notes\n{{c}} $10 notes\n{{d}} $50 notes\n{{e}} $100 notes', { a: num(5), b: num(4), c: num(3), d: num(3), e: num(2) }, ['l1moneycount', { items: notesD, v: 200 }], '每种纸币各有几张？', 'How many of each note?', { label: '数纸币', hint: { zh: '一种一种找。', en: 'Count one kind at a time.' } })] },
      ],
    },
    {
      id: 'l1-20-2', available: true,
      title: { zh: '一组钱有多少', en: 'Find the value of a group of coins and notes' },
      intro: { zh: '同样的硬币，几个几个地数：5¢ 就 5 个 5 个数，10¢ 就 10 个 10 个数。', en: 'Count in 5s for 5¢ coins, in 10s for 10¢ coins, and so on.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '硬币的总值', en: 'Study the coins carefully and write the correct values' },
          example: { kind: 'l1moneyvalue', n: { v: 20, n: 3 }, title: { zh: '3 个 20¢：20、40、60，一共 60¢', en: '3 × 20¢ = 60¢' } },
          questions: valA.map(([v, n], i) => F(`l1-20-2-A${i + 1}`, pic(M.group(Array(n).fill(v))), v * n >= 100 && (v * n) % 100 === 0 ? '${{t}}' : '{{t}}¢', { t: num(v * n >= 100 && (v * n) % 100 === 0 ? v * n / 100 : v * n) }, ['l1moneyvalue', { v, n }], `${n} 个 ${show(v)} 一共多少？`, 'How much altogether?', { label: `${n} × ${show(v)} = ${show(v * n)}`, hint: { zh: `${v >= 100 ? '一个一个' : v + ' 个 ' + v + ' 个'}地数。`, en: `Count in ${v >= 100 ? 'ones' : v + 's'}.` } })) },
        { id: 'B', type: 'fill', title: { zh: '纸币的总值', en: 'Study the notes carefully and write the correct values' },
          example: { kind: 'l1moneyvalue', n: { v: 1000, n: 3 }, title: { zh: '3 张 $10：10、20、30，一共 $30', en: '3 × $10 = $30' } },
          questions: valB.map(([v, n], i) => F(`l1-20-2-B${i + 1}`, pic(M.group(Array(n).fill(v))), '${{t}}', { t: num(v * n / 100) }, ['l1moneyvalue', { v, n }], `${n} 张 ${show(v)} 一共多少？`, 'How much altogether?', { label: `${n} × ${show(v)} = ${show(v * n)}`, hint: { zh: `${v / 100} 个 ${v / 100} 个地数。`, en: `Count in ${v / 100}s.` } })) },
      ],
    },
    {
      id: 'l1-20-3', available: true,
      title: { zh: '换钱', en: 'Exchange coins and notes' },
      intro: { zh: '大的钱可以换成几个小的钱，总数一样多。10 个 10¢ 换 $1，2 个 50¢ 也换 $1。', en: 'A note or coin can be exchanged for smaller ones of the same total value.' },
      sections: [
        { id: 'A', type: 'match', title: { zh: '连一连：一样多的钱', en: 'Match the following values of money' },
          example: { kind: 'l1exchange', n: { big: 100, small: 10 }, title: { zh: '$1 = 10 个 10¢', en: '$1 = 10 × 10¢' } },
          questions: [{ id: 'l1-20-3-A1', type: 'match', label: '纸币/硬币 配 10 个小钱', left: exA.map(([big]) => ({ id: 'b' + big, html: M.piece(big), text: show(big) })), right: [1000, 5, 50, 100, 20, 500, 1, 10].map(small => ({ id: 's' + small, html: M.group(Array(10).fill(small)), text: `10 × ${show(small)}` })), pairs: Object.fromEntries(exA.map(([big, small]) => ['b' + big, 's' + small])), prompt: { zh: '左边每一张钱，右边 10 个哪种小钱加起来和它一样多？', en: 'Match each note or coin to 10 smaller ones of the same value.' }, hint: { zh: '10 个 10¢ 是 $1，10 个 $1 是 $10……', en: '10 × 10¢ = $1.' }, explain: ['l1exchange', { big: 1000, small: 100 }] }] },
        { id: 'B', type: 'fill', title: { zh: '能换几个', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'l1exchange', n: { big: 100, small: 20 }, title: { zh: '$1 = 5 个 20¢', en: '$1 = 5 twenty-cent coins' } },
          questions: exB.map(([big, small, name], i) => F(`l1-20-3-B${i + 1}`, '', `${show(big)} = {{n}} ${name}`, { n: num(big / small) }, ['l1exchange', { big, small }], `${show(big)} 能换几个 ${show(small)}？`, `How many ${name}?`, { label: `${show(big)} = ${big / small} × ${show(small)}`, hint: { zh: `${show(small)} 一个一个加，加到 ${show(big)}。`, en: `Count in ${show(small)}s.` } })) },
      ],
    },
    {
      id: 'l1-20-4', available: true,
      title: { zh: '数一数有多少钱', en: 'Find the amount of money' },
      intro: { zh: '先数大的再数小的，从最大的开始往上加。凑钱的时候也先拿大的，再用小的补齐。', en: 'Count on from the largest. To make an amount, start with the largest and fill in with smaller ones.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '往上数', en: 'Find the following amounts of money by counting on' },
          example: { kind: 'l1countmoney', n: { items: [50, 20, 10, 5, 1] }, title: { zh: '50、70、80、85、86：86¢', en: '86¢' } },
          questions: amtA.map((items, i) => { const t = sum(items), d = t >= 100; return F(`l1-20-4-A${i + 1}`, pic(M.group(items)), d ? '${{t}}' : '{{t}}¢', { t: num(d ? t / 100 : t) }, ['l1countmoney', { items }], '从大到小往上加，一共多少？', 'How much altogether?', { label: show(t), hint: { zh: '先数最大的，再一个一个加上去。', en: 'Count on from the largest.' } }); }) },
        { id: 'B', type: 'l1pickmoney', title: { zh: '凑出正好的钱', en: 'Look at each picture and colour the correct amount of money' },
          example: { kind: 'l1makeamount', n: { items: [20, 20, 10, 10, 5], target: 30 }, title: { zh: '30¢：拿 20¢ 和 10¢', en: '20¢ + 10¢ = 30¢' } },
          questions: pickB.map(([target, set, icon], i) => ({ id: `l1-20-4-B${i + 1}`, type: 'l1pickmoney', icon, target, sets: [set], label: `凑 ${show(target)}` })) },
        { id: 'C', type: 'l1pickmoney', title: { zh: '两种凑法', en: 'Look at each picture and colour the correct amount of money in two different ways' },
          example: { kind: 'l1makeamount', n: { items: [10, 10, 10, 5, 5], target: 25 }, title: { zh: '25¢：10¢ + 10¢ + 5¢', en: '10¢ + 10¢ + 5¢ = 25¢' } },
          questions: pickC.map(([target, sets, icon], i) => ({ id: `l1-20-4-C${i + 1}`, type: 'l1pickmoney', icon, target, sets, label: `两种方法凑 ${show(target)}` })) },
      ],
    },
    {
      id: 'l1-20-5', available: true,
      title: { zh: '分的加减', en: 'Add and subtract money in cents' },
      intro: { zh: '分和分相加减，像普通的数一样列竖式，答案后面写 ¢。', en: 'Add or subtract cents like ordinary numbers. Write ¢ after the answer.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '看硬币加一加', en: 'Add the cents' },
          example: { kind: 'l1centsop', n: { a: 20, b: 30, op: '+', ga: [20], gb: [10, 10, 10] }, title: { zh: '20¢ + 30¢ = 50¢', en: '20¢ + 30¢ = 50¢' } },
          questions: cA.map(([ga, gb], i) => F(`l1-20-5-A${i + 1}`, two(ga, gb), `{{a}}¢ + {{b}}¢ = {{s}}¢`, { a: num(sum(ga)), b: num(sum(gb)), s: num(sum(ga) + sum(gb)) }, ['l1centsop', { a: sum(ga), b: sum(gb), op: '+', ga, gb }], '先数两边各多少，再加起来', 'Count, then add', { label: `${sum(ga)}¢ + ${sum(gb)}¢ = ${sum(ga) + sum(gb)}¢`, hint: { zh: '左边先数，右边再数，再相加。', en: 'Count each side, then add.' } })) },
        { id: 'B', type: 'column', title: { zh: '分的竖式加法', en: 'Add the cents' },
          example: { kind: 'l1centsop', n: { a: 15, b: 25, op: '+' }, title: { zh: '15¢ + 25¢ = 40¢', en: '15¢ + 25¢ = 40¢' } },
          questions: cB.map(([a, b], i) => C(`l1-20-5-B${i + 1}`, a, b, '+', 'c', { hint: { zh: '先加个位，满 10 进 1。', en: 'Ones first.' } })) },
        { id: 'C', type: 'fill', title: { zh: '看硬币减一减', en: 'Subtract the cents' },
          example: { kind: 'l1centsop', n: { a: 40, b: 30, op: '-', ga: [20, 20], gb: [20, 10] }, title: { zh: '40¢ − 30¢ = 10¢', en: '40¢ − 30¢ = 10¢' } },
          questions: cC.map(([ga, gb], i) => F(`l1-20-5-C${i + 1}`, two(ga, gb), `{{a}}¢ − {{b}}¢ = {{s}}¢`, { a: num(sum(ga)), b: num(sum(gb)), s: num(sum(ga) - sum(gb)) }, ['l1centsop', { a: sum(ga), b: sum(gb), op: '-', ga, gb }], '先数两边各多少，再相减', 'Count, then subtract', { label: `${sum(ga)}¢ − ${sum(gb)}¢ = ${sum(ga) - sum(gb)}¢`, hint: { zh: '左边先数，右边再数，再相减。', en: 'Count each side, then subtract.' } })) },
        { id: 'D', type: 'column', title: { zh: '分的竖式减法', en: 'Subtract the cents' },
          example: { kind: 'l1centsop', n: { a: 35, b: 15, op: '-' }, title: { zh: '35¢ − 15¢ = 20¢', en: '35¢ − 15¢ = 20¢' } },
          questions: cD.map(([a, b], i) => C(`l1-20-5-D${i + 1}`, a, b, '-', 'c', { hint: { zh: '先减个位，不够减向十位借 1。', en: 'Ones first.' } })) },
        { id: 'E', type: 'fill', title: { zh: '文具店', en: 'Below are the items sold in a stationery shop. Study the pictures and fill in each blank' },
          example: { kind: 'l1shop', n: { en: 'Amy buys a pencil and a clip. How much does she spend?', zh: 'Amy 买了一支铅笔和一个夹子。她花了多少？', prices: statP, a: 30, b: 15, op: '+', unit: 'c', sentence: 'She spends ___.', ans: 45 }, title: { zh: '30¢ + 15¢ = 45¢', en: '30¢ + 15¢ = 45¢' } },
          questions: [
            shopQ('l1-20-5-E1', statP, 'c', 'Sally buys an eraser and a notebook. How much does she spend altogether?', 'Sally 买了橡皮和笔记本。她一共花了多少？', 20, 40, '+', 'She spends ___ altogether.'),
            shopQ('l1-20-5-E2', statP, 'c', 'James buys a bookmark and a notebook. How much must he pay for both items?', 'James 买了书签和笔记本。两样要付多少？', 55, 40, '+', 'He must pay ___.'),
            shopQ('l1-20-5-E3', statP, 'c', 'Stella buys a clip. She gives the shopkeeper 50¢. How much change will she get?', 'Stella 买了一个夹子，付给店主 50¢。她找回多少？', 50, 15, '-', 'She will get ___ change.'),
            shopQ('l1-20-5-E4', statP, 'c', 'Carol wants to buy a pen and a pencil. How much must she pay for the two items?', 'Carol 想买一支钢笔和一支铅笔。两样要付多少？', 70, 30, '+', 'She must pay ___.'),
            pairQ('l1-20-5-E5', statP, 'c', 'Ben has 80¢. He wants to buy two items from the shop. What are the two items he can buy that cost exactly that amount of money?', 'Ben 有 80¢，想买两样东西正好花完。是哪两样？', 'ruler', 'clip', 80)] },
        { id: 'F', type: 'fill', title: { zh: '学校小卖部', en: 'Below are the snacks sold at the school canteen. Study the pictures and fill in each blank' },
          example: { kind: 'l1shop', n: { en: 'Tom buys a doughnut and a cheese dog. How much does he spend?', zh: 'Tom 买了甜甜圈和芝士热狗。他花了多少？', prices: snackP, a: 25, b: 40, op: '+', unit: 'c', sentence: 'He spends ___.', ans: 65 }, title: { zh: '25¢ + 40¢ = 65¢', en: '25¢ + 40¢ = 65¢' } },
          questions: [
            shopQ('l1-20-5-F1', snackP, 'c', 'David buys fishballs and a curry puff. How much does he spend altogether?', 'David 买了鱼丸和咖喱角。他一共花了多少？', 30, 60, '+', 'He spends ___ altogether.'),
            shopQ('l1-20-5-F2', snackP, 'c', 'Susan uses a 50¢ coin to buy a doughnut. How much change will she get?', 'Susan 用一个 50¢ 硬币买甜甜圈。她找回多少？', 50, 25, '-', 'She will get ___ change.'),
            shopQ('l1-20-5-F3', snackP, 'c', 'Michael uses 5 twenty-cent coins to buy a sandwich. How much change will he get?', 'Michael 用 5 个 20¢ 硬币买三明治。他找回多少？', 100, 95, '-', 'He will get ___ change.'),
            shopQ('l1-20-5-F4', snackP, 'c', 'Rachel buys chicken nuggets and a cheese dog. How much does she spend altogether?', 'Rachel 买了鸡块和芝士热狗。她一共花了多少？', 35, 40, '+', 'She spends ___ altogether.'),
            whichQ('l1-20-5-F5', snackP, 'c', 'Greg has 2 fifty-cent coins. He buys a snack and has 25¢ left. What does he buy?', 'Greg 有 2 个 50¢ 硬币。他买了一样零食，还剩 25¢。他买了什么？', 100, 25, 'chicken wing')] },
        { id: 'G', type: 'fill', title: { zh: '水果摊', en: 'Below are the cut fruit sold at a stall. Study the pictures and fill in each blank' },
          example: { kind: 'l1shop', n: { en: 'Lily buys apple and papaya. How much does she spend?', zh: 'Lily 买了苹果和木瓜。她花了多少？', prices: fruitP, a: 40, b: 45, op: '+', unit: 'c', sentence: 'She spends ___.', ans: 85 }, title: { zh: '40¢ + 45¢ = 85¢', en: '40¢ + 45¢ = 85¢' } },
          questions: [
            shopQ('l1-20-5-G1', fruitP, 'c', 'Kelly buys starfruit and apple. How much does she spend altogether?', 'Kelly 买了杨桃和苹果。她一共花了多少？', 60, 40, '+', 'She spends ___ altogether.'),
            shopQ('l1-20-5-G2', fruitP, 'c', 'Peter wants to buy kiwifruit. He has a fifty-cent coin. How much more does he need?', 'Peter 想买猕猴桃，他有一个 50¢ 硬币。他还差多少？', 85, 50, '-', 'He needs ___ more.'),
            shopQ('l1-20-5-G3', fruitP, 'c', 'Joanne uses four 20¢ coins to buy honeydew. How much change will she get?', 'Joanne 用 4 个 20¢ 硬币买哈密瓜。她找回多少？', 80, 70, '-', 'She will get ___ change.'),
            shopQ('l1-20-5-G4', fruitP, 'c', 'Andrew buys watermelon and papaya. He has 5¢ left. How much does he have at first?', 'Andrew 买了西瓜和木瓜，还剩 5¢。他原来有多少钱？', 95, 5, '+', 'He has ___ at first.'),
            whichQ('l1-20-5-G5', fruitP, 'c', 'Rosie has 2 fifty-cent coins. She buys a fruit and has 45¢ left. What does she buy?', 'Rosie 有 2 个 50¢ 硬币。她买了一种水果，还剩 45¢。她买了什么？', 100, 45, 'pineapple')] },
      ],
    },
    {
      id: 'l1-20-6', available: true,
      title: { zh: '元的加减', en: 'Add and subtract money in dollars' },
      intro: { zh: '元和元相加减，列竖式，前面写 $。', en: 'Add or subtract dollars in columns. Write $ in front.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '看纸币加一加', en: 'Add the dollars' },
          example: { kind: 'l1dollarsop', n: { a: 12, b: 10, op: '+', ga: [1000, 200], gb: [500, 500] }, title: { zh: '$12 + $10 = $22', en: '$12 + $10 = $22' } },
          questions: dA.map(([ga, gb], i) => { const a = sum(ga) / 100, b = sum(gb) / 100; return F(`l1-20-6-A${i + 1}`, two(ga, gb), `\${{a}} + \${{b}} = \${{s}}`, { a: num(a), b: num(b), s: num(a + b) }, ['l1dollarsop', { a, b, op: '+', ga, gb }], '先数两边各多少，再加起来', 'Count, then add', { label: `$${a} + $${b} = $${a + b}`, hint: { zh: '左边先数，右边再数，再相加。', en: 'Count each side, then add.' } }); }) },
        { id: 'B', type: 'column', title: { zh: '元的竖式加法', en: 'Add the dollars' },
          example: { kind: 'l1dollarsop', n: { a: 28, b: 45, op: '+' }, title: { zh: '$28 + $45 = $73', en: '$28 + $45 = $73' } },
          questions: dB.map(([a, b], i) => C(`l1-20-6-B${i + 1}`, a, b, '+', 'd', { hint: { zh: '先加个位，满 10 进 1。', en: 'Ones first.' } })) },
        { id: 'C', type: 'fill', title: { zh: '看纸币减一减', en: 'Subtract the dollars' },
          example: { kind: 'l1dollarsop', n: { a: 15, b: 3, op: '-', ga: [1000, 500], gb: [200, 100] }, title: { zh: '$15 − $3 = $12', en: '$15 − $3 = $12' } },
          questions: dC.map(([ga, gb], i) => { const a = sum(ga) / 100, b = sum(gb) / 100; return F(`l1-20-6-C${i + 1}`, two(ga, gb), `\${{a}} − \${{b}} = \${{s}}`, { a: num(a), b: num(b), s: num(a - b) }, ['l1dollarsop', { a, b, op: '-', ga, gb }], '先数两边各多少，再相减', 'Count, then subtract', { label: `$${a} − $${b} = $${a - b}`, hint: { zh: '左边先数，右边再数，再相减。', en: 'Count each side, then subtract.' } }); }) },
        { id: 'D', type: 'column', title: { zh: '元的竖式减法', en: 'Subtract the dollars' },
          example: { kind: 'l1dollarsop', n: { a: 35, b: 21, op: '-' }, title: { zh: '$35 − $21 = $14', en: '$35 − $21 = $14' } },
          questions: dD.map(([a, b], i) => C(`l1-20-6-D${i + 1}`, a, b, '-', 'd', { hint: { zh: '先减个位，不够减向十位借 1。', en: 'Ones first.' } })) },
        { id: 'E', type: 'fill', title: { zh: '玩具店', en: 'Below are the items sold at a toy store. Study the pictures and fill in each blank' },
          example: { kind: 'l1shop', n: { en: 'Ann buys a doll and playing cards. How much does she pay?', zh: 'Ann 买了娃娃和扑克牌。她付多少？', prices: toyP, a: 20, b: 8, op: '+', unit: 'd', sentence: 'She pays ___.', ans: 28 }, title: { zh: '$20 + $8 = $28', en: '$20 + $8 = $28' } },
          questions: [
            shopQ('l1-20-6-E1', toyP, 'd', 'Sean wants to buy a toy monkey and a pack of playing cards. How much must he pay altogether?', 'Sean 想买玩具猴和一副扑克牌。他一共要付多少？', 14, 8, '+', 'He must pay ___ altogether.'),
            shopQ('l1-20-6-E2', toyP, 'd', 'How much more does a toy car cost than a toy robot?', '玩具车比玩具机器人贵多少？', 44, 35, '-', 'A toy car costs ___ more.'),
            shopQ('l1-20-6-E3', toyP, 'd', 'Ken wants a toy robot and a toy helicopter for his birthday. How much do the two toys cost altogether?', 'Ken 生日想要玩具机器人和玩具直升机。两样一共多少钱？', 35, 60, '+', 'The two toys cost ___ altogether.'),
            shopQ('l1-20-6-E4', toyP, 'd', 'Susan has $50. She wants to buy a toy monkey. How much change will she receive?', 'Susan 有 $50，想买玩具猴。她找回多少？', 50, 14, '-', 'She will receive ___ change.'),
            pairQ('l1-20-6-E5', toyP, 'd', 'Adeline buys two items for exactly $25. What are the two items?', 'Adeline 买了两样东西正好 $25。是哪两样？', 'playing cards', 'toy aeroplane', 25)] },
        { id: 'F', type: 'fill', title: { zh: '百货商店', en: 'Below are the items sold in a department store. Study the pictures and fill in each blank' },
          example: { kind: 'l1shop', n: { en: 'Ivy buys shorts and socks. How much does she pay?', zh: 'Ivy 买了短裤和袜子。她付多少？', prices: deptP, a: 8, b: 5, op: '+', unit: 'd', sentence: 'She pays ___.', ans: 13 }, title: { zh: '$8 + $5 = $13', en: '$8 + $5 = $13' } },
          questions: [
            shopQ('l1-20-6-F1', deptP, 'd', 'Jason buys a pair of socks and a shirt. How much does he pay in all?', 'Jason 买了一双袜子和一件衬衫。他一共付多少？', 5, 25, '+', 'He pays ___ in all.'),
            shopQ('l1-20-6-F2', deptP, 'd', 'How much more does a skirt cost than a pair of pants?', '裙子比长裤贵多少？', 38, 30, '-', 'A skirt costs ___ more.'),
            shopQ('l1-20-6-F3', deptP, 'd', 'Andrea buys a polo shirt and a pair of shorts. How much does she pay altogether?', 'Andrea 买了 polo 衫和短裤。她一共付多少？', 12, 8, '+', 'She pays ___ altogether.'),
            shopQ('l1-20-6-F4', deptP, 'd', 'Sally has $20. She wants to buy a handbag. How much more money will she need?', 'Sally 有 $20，想买手提包。她还差多少？', 45, 20, '-', 'She will need ___ more.'),
            pairQ('l1-20-6-F5', deptP, 'd', 'Zoe wants to buy two items. She only has $65. Which two items can she buy that cost exactly that sum of money?', 'Zoe 想买两样东西，她只有 $65。哪两样正好花完？', 'skirt', 'blouse', 65)] },
        { id: 'G', type: 'fill', title: { zh: 'Johnson 先生的店', en: "Below are the items sold in Mr Johnson's shop. Study the pictures and fill in each blank" },
          example: { kind: 'l1shop', n: { en: 'Max buys a float and slippers. How much does he pay?', zh: 'Max 买了游泳圈和拖鞋。他付多少？', prices: shopP, a: 16, b: 5, op: '+', unit: 'd', sentence: 'He pays ___.', ans: 21 }, title: { zh: '$16 + $5 = $21', en: '$16 + $5 = $21' } },
          questions: [
            shopQ('l1-20-6-G1', shopP, 'd', 'Stephanie buys a swimming costume and a pair of slippers. How much does she pay altogether?', 'Stephanie 买了泳衣和一双拖鞋。她一共付多少？', 25, 5, '+', 'She pays ___ altogether.'),
            pairQ('l1-20-6-G2', shopP, 'd', 'Bob buys two items and pays exactly $29 for them. What are the two items?', 'Bob 买了两样东西正好付 $29。是哪两样？', 'float', 'mat', 29),
            shopQ('l1-20-6-G3', shopP, 'd', 'Christine buys a bag and a pair of swimming trunks for her brother. How much does she pay in all?', 'Christine 给弟弟买了包和泳裤。她一共付多少？', 25, 12, '+', 'She pays ___ in all.'),
            shopQ('l1-20-6-G4', shopP, 'd', 'David wants to buy a mat. He only has $10. How much more money does he need?', 'David 想买垫子，他只有 $10。他还差多少？', 13, 10, '-', 'He needs ___ more.'),
            shopQ('l1-20-6-G5', shopP, 'd', 'How much less does a pair of swimming trunks cost than a swimming costume?', '泳裤比泳衣便宜多少？', 25, 12, '-', 'A pair of swimming trunks costs ___ less.')] },
      ],
    },
    {
      id: 'l1-20-7', available: true,
      title: { zh: '钱的应用题', en: 'Solve word problems related to money' },
      intro: { zh: '“一共、又给了、多几”用加法；“剩下、找零、还差、少几”用减法。列算式，竖式算，写答句。', en: 'Altogether, more: add. Left, change, how much more needed, less: subtract.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '读题列式', en: 'Do these word problems. Show your working clearly' },
          example: { kind: 'l1shop', n: { en: 'Venice has $28. Her father gives her another $15. How much money does she have now?', zh: 'Venice 有 $28，爸爸又给她 $15。她现在有多少钱？', prices: [], a: 28, b: 15, op: '+', unit: 'd', sentence: 'She has ___ now.', ans: 43 }, title: { zh: '$28 + $15 = $43', en: '$28 + $15 = $43' } },
          questions: words.map(([en, zh, a, b, op, un, sent], i) => { const ans = op === '+' ? a + b : a - b; const bl = k => un === 'd' ? `\${{${k}}}` : `{{${k}}}¢`;
            return F(`l1-20-7-A${i + 1}`, wp(en, zh), `${bl('x')} ${op === '+' ? '+' : '−'} ${bl('y')} = ${bl('z')}\n${sent.replace('___', bl('d'))}`, { x: num(a), y: num(b), z: num(ans), d: num(ans) }, ['l1shop', { en, zh, prices: [], a, b, op, unit: un, sentence: sent, ans }], op === '+' ? '合起来 / 又给了 / 多几，用加法' : '剩下 / 找零 / 还差 / 少几，用减法', en, { accept: op === '+' ? [{ x: a, y: b, z: ans, d: ans }, { x: b, y: a, z: ans, d: ans }] : undefined, label: en, hint: { zh: `${u(un)(a)} ${op === '+' ? '+' : '−'} ${u(un)(b)}，列竖式算。`, en: `${u(un)(a)} ${op} ${u(un)(b)}.` } }); }) },
      ],
    },
  ];
})();
