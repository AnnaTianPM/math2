/* Unit 12 钱 */
(function () {
  const U = window.MATH_DATA.units;
  const unit = num => U.find(u => u.num === num);
  const M = window.MoneyUI;
  const fmt = M.fmt;
  const S = (en, zh) => ({ en, zh });
  const D = 100; // 1 dollar in cents

  // A：数一数一共多少钱
  const countQ = (id, items, centsOnly) => { const t = M.total(items);
    return { id, type: 'fill', pic: M.group(items), label: `数钱 ${fmt(t)}`, prompt: { zh: '数一数，一共多少钱？', en: 'Count and write the amount of money' },
      text: centsOnly ? `{{a}} ¢` : `$ {{a}}`, fields: { a: centsOnly ? { a: t } : { a: (t / D).toFixed(2), kind: 'money' } }, answerText: centsOnly ? `${t}¢` : fmt(t), explain: ['countmoney', { items }],
      hint: { zh: '先数纸币（大的），再数硬币。元和分中间用小数点隔开。', en: 'Count the notes first, then the coins.' } }; };
  // B：$12.30 = 12 dollars 30 cents
  const splitQ = (id, amt) => { const c = Math.round(amt * 100), d = Math.floor(c / 100), r = c % 100;
    return { id, type: 'fill', text: `$${amt.toFixed(2)} = {{d}} dollars {{c}} cents`, fields: { d: { a: d }, c: { a: r } }, answerText: `${d} dollars ${r} cents`, prompt: { zh: '几元几分？', en: 'Fill in the blanks' }, explain: ['dollars2cents', { dollars: amt }],
      hint: { zh: '小数点前面是元，后面是分。分要看成两位数：.05 是 5 分，.30 是 30 分。', en: 'Before the point: dollars. After: cents.' } }; };
  // C：两种写法 $7 or $7.00
  const twoWaysQ = (id, items) => { const t = M.total(items), d = t / D;
    return { id, type: 'fill', pic: M.group(items), label: `${fmt(t)} 两种写法`, prompt: { zh: '数一数，用两种方法写', en: 'Count and write the amount of money in two ways' },
      text: `$ {{a}} or $ {{b}}`, fields: { a: { a: String(d) }, b: { a: d.toFixed(2) } }, accept: [{ a: String(d), b: d.toFixed(2) }, { a: d.toFixed(2), b: String(d) }], answerText: `$${d} or $${d.toFixed(2)}`, explain: ['countmoney', { items }],
      hint: { zh: `整元的钱可以写成 $${d}，也可以写成 $${d.toFixed(2)}（后面加 .00）。`, en: `$${d} or $${d.toFixed(2)}.` } }; };
  // D：硬币两种写法 30¢ or $0.30 / $4 or $4.00
  const coinsTwoQ = (id, items) => { const t = M.total(items);
    if (t % 100 === 0) return twoWaysQ(id, items);
    return { id, type: 'fill', pic: M.group(items), label: `${t}¢ 两种写法`, prompt: { zh: '数一数，用两种方法写', en: 'Count and write the amount of money in two ways' },
      text: `{{a}} ¢ or $ {{b}}`, fields: { a: { a: t }, b: { a: (t / D).toFixed(2) } }, answerText: `${t}¢ or $${(t / D).toFixed(2)}`, explain: ['countmoney', { items }],
      hint: { zh: `${t} 分写成元是 $0.${String(t).padStart(2, '0')}：不到 1 元，元的位置写 0。`, en: `${t}¢ = $${(t / D).toFixed(2)}.` } }; };
  // 换算
  const toCentsQ = (id, amt) => ({ id, type: 'fill', text: `$${amt.toFixed(2)} = {{c}} ¢`, fields: { c: { a: Math.round(amt * 100) } }, answerText: `${Math.round(amt * 100)}¢`, prompt: { zh: '换成分', en: 'Express in cents' }, explain: ['dollars2cents', { dollars: amt }], hint: { zh: '1 元 = 100 分。把元乘 100 再加上分。', en: '$1 = 100¢.' } });
  const toDollarsQ = (id, cents) => ({ id, type: 'fill', text: `${cents}¢ = $ {{d}}`, fields: { d: { a: (cents / D).toFixed(2), kind: 'money' } }, answerText: `$${(cents / D).toFixed(2)}`, prompt: { zh: '换成元', en: 'Express in dollars' }, explain: ['cents2dollars', { cents }], hint: { zh: '每 100 分是 1 元，剩下的分写在小数点后面（两位）。', en: '100¢ = $1. Write the leftover cents after the point.' } });
  // 比较
  const cmp2 = (id, en, zh, a, b, more, verb) => { const [n1, v1] = a, [n2, v2] = b; const big = v1 > v2 ? a : b, small = v1 > v2 ? b : a;
    const first = more ? big : small, second = more ? small : big;
    return { id, type: 'fill', label: en, prompt: { zh, en }, text: `(a) $ {{x}} is ${more ? 'more' : 'less'} than $ {{y}}.\n(b) {{w}} ${verb} ${more ? 'more' : 'less'} money.`,
      fields: { x: { a: first[1].toFixed(2), kind: 'money' }, y: { a: second[1].toFixed(2), kind: 'money' }, w: { a: first[0], kind: 'choice', options: [n1, n2] } },
      answerText: `$${first[1].toFixed(2)} is ${more ? 'more' : 'less'} than $${second[1].toFixed(2)}; ${first[0]}`, explain: ['cmpmoney', { items: [{ label: n1, v: Math.round(v1 * 100) }, { label: n2, v: Math.round(v2 * 100) }] }],
      hint: { zh: '先比元，元一样再比分。', en: 'Compare the dollars first, then the cents.' } }; };
  const cmp3 = (id, en, zh, items, order, verbs) => { // order: ['smallest','greatest'] or reversed; verbs [least, most]
    const sorted = items.slice().sort((x, y) => x[1] - y[1]); const small = sorted[0], big = sorted[2];
    const q = order[0] === 'smallest' ? [['(a) $ {{a}} is the smallest amount of money.', 'a', small[1]], ['(b) $ {{b}} is the greatest amount of money.', 'b', big[1]]] : [['(a) $ {{a}} is the greatest amount of money.', 'a', big[1]], ['(b) $ {{b}} is the smallest amount of money.', 'b', small[1]]];
    const q2 = verbs[0] === 'most' ? [['(c) {{c}} ' + verbs[1] + '.', 'c', big[0]], ['(d) {{d}} ' + verbs[2] + '.', 'd', small[0]]] : [['(c) {{c}} ' + verbs[1] + '.', 'c', small[0]], ['(d) {{d}} ' + verbs[2] + '.', 'd', big[0]]];
    const fields = { a: { a: q[0][2].toFixed(2), kind: 'money' }, b: { a: q[1][2].toFixed(2), kind: 'money' }, c: { a: q2[0][2], kind: 'choice', options: items.map(i => i[0]) }, d: { a: q2[1][2], kind: 'choice', options: items.map(i => i[0]) } };
    return { id, type: 'fill', label: en, prompt: { zh, en }, text: [q[0][0], q[1][0], q2[0][0], q2[1][0]].join('\n'), fields, answerText: `${q[0][2].toFixed(2)}, ${q[1][2].toFixed(2)}, ${q2[0][2]}, ${q2[1][2]}`, explain: ['cmpmoney', { items: items.map(i => ({ label: i[0], v: Math.round(i[1] * 100) })) }], hint: { zh: '先比元，元一样再比分。', en: 'Compare dollars first, then cents.' } }; };
  // 应用题
  const W = (id, en, zh, model, sentence) => ({ id, type: 'word', en, zh, model, sentence });
  const W2 = (id, en, zh, s1, s2) => ({ id, type: 'word2', en, zh, steps: [s1, s2] });
  const A_ = parts => ({ kind: 'add', parts: parts.map(([label, v]) => ({ label, v })) });
  const Sb = (whole, known, unk) => ({ kind: 'sub', whole: { label: whole[0], v: whole[1] }, known: { label: known[0], v: known[1] }, unknown: { label: unk } });
  const Cm = (base, other, diff, otherIs) => ({ kind: 'cmp', base: { label: base[0], v: base[1] }, other: { label: other }, diff, otherIs });
  const mulDivW = (id, en, zh, a, b, op, sentence, emoji) => { const isMul = op === '×', ans = isMul ? a * b : a / b;
    return { id, type: 'fill', label: en, prompt: { zh, en }, text: `{{x}} ${isMul ? '×' : '÷'} {{y}} = {{z}}\n${sentence.replace('___', '{{d}}')}`, fields: { x: { a: a }, y: { a: b }, z: { a: ans }, d: { a: ans } }, accept: isMul ? [{ x: a, y: b, z: ans, d: ans }, { x: b, y: a, z: ans, d: ans }] : undefined,
      answerText: `${a} ${isMul ? '×' : '÷'} ${b} = ${ans}`, explain: isMul ? ['mulgroups', { groups: a, each: b, emoji, noun: '$' }] : op === '÷g' ? ['divgroup', { total: a, each: b, emoji, noun: '$' }] : ['divshare', { total: a, groups: b, emoji, noun: '$' }], hint: isMul ? { zh: `${a} 个 ${b} 元，用乘法。`, en: 'Multiply.' } : { zh: `一共 ${a} 元，平均分，用除法。`, en: 'Divide.' } }; };

  unit(12).kps = [
    {
      id: 'u12-1', available: true,
      title: { zh: '数一数有多少钱', en: 'Find the value of a group of notes and coins' },
      intro: { zh: '纸币有 $2、$5、$10、$50、$100，硬币有 5¢、10¢、20¢、50¢、$1。数钱先数纸币再数硬币。100 分 = 1 元，写成 $1.00。', en: 'Count the notes first, then the coins. 100¢ = $1.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '数一数，写出多少钱', en: 'Count and write the correct amount of money' },
          example: { kind: 'countmoney', n: { items: [500, 200, 100, 50, 20] }, title: { zh: '$5、$2、$1、50¢、20¢ 一共 $8.70', en: 'Count: $8.70' } },
          questions: [countQ('u12-1-A1', [10, 10, 5, 5, 5, 5], true), countQ('u12-1-A2', [200, 200, 100, 50]), countQ('u12-1-A3', [1000, 1000, 1000, 200, 200, 200, 200, 20, 20, 10, 10, 10, 5, 5]), countQ('u12-1-A4', [1000, 500, 200, 20, 20, 20, 20, 10]), countQ('u12-1-A5', [200, 200, 200, 200, 100, 100, 10, 5, 5, 5]),
            countQ('u12-1-A6', [5000, 1000, 1000, 100, 100, 10, 10]), countQ('u12-1-A7', [5000, 500, 500, 500, 50, 5]), countQ('u12-1-A8', [200, 200, 200, 200, 10000, 20, 20, 20]), countQ('u12-1-A9', [1000, 1000, 1000, 10000, 10, 10, 5, 5]), countQ('u12-1-A10', [10000, 5000, 1000, 500, 200, 100, 50, 20, 10, 5])] },
        { id: 'B', type: 'fill', title: { zh: '几元几分', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'dollars2cents', n: { dollars: 10.10 }, title: { zh: '$10.10 = 10 dollars 10 cents', en: '$10.10 = 10 dollars 10 cents' } },
          questions: [12.30, 45.45, 67.05, 115.55, 7.90, 0.80, 0.06, 20.15, 59.95, 70.70].map((v, i) => splitQ(`u12-1-B${i + 1}`, v)) },
        { id: 'C', type: 'fill', title: { zh: '两种写法（整元）', en: 'Count and write the amount of money in two ways' },
          example: { kind: 'countmoney', n: { items: [500, 200] }, title: { zh: '$7 或 $7.00', en: '$7 or $7.00' } },
          questions: [[200, 100, 100], [500, 200, 200, 100], [1000, 1000, 1000, 200, 100], [5000, 1000, 500, 200, 200, 200], [10000, 5000, 500, 100], [5000, 1000, 500, 200, 100, 100], [1000, 1000, 1000, 500, 500, 200], [1000, 1000, 1000, 1000, 5000, 500, 200, 100], [10000, 1000, 500, 500, 500], [10000, 5000, 1000, 500, 200]].map((items, i) => twoWaysQ(`u12-1-C${i + 1}`, items)) },
        { id: 'D', type: 'fill', title: { zh: '两种写法（硬币）', en: 'Count and write the amount of money in two ways' },
          example: { kind: 'countmoney', n: { items: [20, 10] }, title: { zh: '30¢ 或 $0.30', en: '30¢ or $0.30' } },
          questions: [[10, 5, 5], [50, 20, 5], [20, 20, 5, 5, 5], [50, 10, 10, 10, 10], [50, 20, 10, 5], [100, 100, 100, 100], [100, 50, 50, 50, 50], [50, 20, 20, 10], [100, 20, 20, 20, 20, 10, 10], [100, 100, 100, 50, 50, 50, 20, 20, 5, 5]].map((items, i) => coinsTwoQ(`u12-1-D${i + 1}`, items)) },
        { id: 'E', type: 'fill', title: { zh: '这个东西多少钱？', en: 'Count and write the correct amount of money' },
          example: { kind: 'countmoney', n: { items: [20, 5, 5] }, title: { zh: '一颗糖 0 元 30 分，就是 $0.30', en: 'A sweet costs 0 dollars and 30 cents: $0.30' } },
          questions: [['slice of fruit', [50, 10]], ['book', [200, 200, 20, 20]], ['box of chocolates', [1000, 100, 10]], ['pencil box', [500, 200, 100, 5]], ['file', [100, 100, 10, 10, 10, 10]], ['toy car', [1000, 500, 100, 50, 20, 20]], ['3-D movie', [1000, 200, 200, 50]], ['buffet meal', [1000, 1000, 500, 50, 20, 10]], ['digital camera', [10000, 1000, 1000, 100, 50, 5]], ['pair of running shoes', [5000, 1000, 1000, 1000, 500, 200, 200]]].map(([name, items], i) => { const t = M.total(items), d = Math.floor(t / D), c = t % D;
            return { id: `u12-1-E${i + 1}`, type: 'fill', pic: M.group(items), label: `${name} ${fmt(t)}`, prompt: { zh: '数一数，这个东西多少钱？', en: 'Count and write the amount' }, text: `A ${name} costs {{d}} dollars and {{c}} cents.
It costs $ {{m}}.`, fields: { d: { a: d }, c: { a: c }, m: { a: (t / D).toFixed(2), kind: 'money' } }, answerText: `${d} dollars ${c} cents = ${fmt(t)}`, explain: ['countmoney', { items }], hint: { zh: '先数纸币和 $1 是几元，再数硬币是几分。写成 $ 的时候中间加小数点，分要写两位。', en: 'Dollars first, then cents. Write cents as two digits after the point.' } }; }) },
        { id: 'F', type: 'pickmoney', title: { zh: '用两种方法选出这么多钱', en: 'Pick the correct amount of money in two different ways' },
          example: { kind: 'countmoney', n: { items: [200, 100, 10, 5] }, title: { zh: '选出 $3.15：$2 + $1 + 10¢ + 5¢', en: 'Pick $3.15' } },
          questions: [
            { id: 'u12-1-F1', type: 'pickmoney', target: 560, sets: [[500, 100, 50, 20, 10, 5], [200, 200, 200, 50, 50, 20, 20, 20, 10]] },
            { id: 'u12-1-F2', type: 'pickmoney', target: 1995, sets: [[1000, 1000, 500, 500, 200, 200, 100, 50, 20, 20, 10, 5], [500, 500, 500, 20, 200, 200, 50, 50, 10, 5, 5, 5, 5]] },
            { id: 'u12-1-F3', type: 'pickmoney', target: 4830, sets: [[5000, 1000, 1000, 10, 1000, 1000, 500, 100, 1000, 500, 200, 20, 200], [1000, 1000, 1000, 10, 500, 500, 200, 100, 500, 200, 100, 10, 10]] },
            { id: 'u12-1-F4', type: 'pickmoney', target: 10110, sets: [[10000, 200, 100, 20, 10, 5], [5000, 5000, 50, 50, 5, 5, 5]] },
            { id: 'u12-1-F5', type: 'pickmoney', target: 12725, sets: [[10000, 1000, 1000, 1000, 500, 500, 200, 20, 10, 5], [5000, 5000, 1000, 1000, 500, 500, 100, 100, 10, 10, 5, 5]] },
          ] },
      ],
    },
    {
      id: 'u12-2', available: true,
      title: { zh: '元和分互换', en: 'Change cents and dollars' },
      intro: { zh: '1 元 = 100 分。$1.85 = 185¢；250¢ = $2.50。', en: '$1 = 100¢. $1.85 = 185¢; 250¢ = $2.50.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '数一数，用元和分两种方法写', en: 'Count and write the amount of money in two ways' },
          example: { kind: 'countmoney', n: { items: [100, 50] }, title: { zh: '$1.50 或 150¢', en: '$1.50 or 150¢' } },
          questions: [[100, 20, 20, 10, 5], [200, 50, 50, 5, 5], [200, 200, 20, 20], [500, 100, 10, 5], [500, 200, 50, 20, 10], [200, 100, 100, 100, 5], [100, 50, 50, 20, 10, 5], [500, 200, 200, 50, 20], [200, 100, 50, 20, 20, 5], [500, 200, 100, 10, 5, 5]].map((items, i) => { const t = M.total(items);
            return { id: `u12-2-A${i + 1}`, type: 'fill', pic: M.group(items), label: `${fmt(t)} = ${t}¢`, prompt: { zh: '数一数，用两种方法写', en: 'Count and write the amount in two ways' }, text: `$ {{a}} or {{b}} ¢`, fields: { a: { a: (t / D).toFixed(2), kind: 'money' }, b: { a: t } }, answerText: `${fmt(t)} or ${t}¢`, explain: ['countmoney', { items }], hint: { zh: '先数出几元几分，再把元乘 100 加上分就是多少分。', en: 'Count, then change to cents: dollars × 100 + cents.' } }; }) },
        { id: 'B', type: 'fill', title: { zh: '换成分', en: 'Express the following in cents' },
          example: { kind: 'dollars2cents', n: { dollars: 1.85 }, title: { zh: '$1.85 = 185¢', en: '$1.85 = 185¢' } },
          questions: [2.25, 5.50, 0.60, 6.01, 7.37, 0.99, 4, 8.08, 1.76, 0.03].map((v, i) => toCentsQ(`u12-2-B${i + 1}`, v)) },
        { id: 'C', type: 'fill', title: { zh: '换成元', en: 'Express the following in dollars' },
          example: { kind: 'cents2dollars', n: { cents: 250 }, title: { zh: '250¢ = $2.50', en: '250¢ = $2.50' } },
          questions: [416, 4, 333, 805, 70, 960, 1000, 629, 18, 52].map((v, i) => toDollarsQ(`u12-2-C${i + 1}`, v)) },
      ],
    },
    {
      id: 'u12-3', available: true,
      title: { zh: '比较钱的多少', en: 'Compare money' },
      intro: { zh: '比较两个金额：先比元，元多的钱多；元一样再比分。', en: 'Compare the dollars first, then the cents.' },
      sections: [{ id: 'A', type: 'fill', title: { zh: '填一填', en: 'Fill in each blank with the correct answer' },
        example: { kind: 'cmpmoney', n: { items: [{ label: 'Christopher', v: 2650 }, { label: 'George', v: 3250 }] }, title: { zh: '$32.50 比 $26.50 多', en: '$32.50 is more than $26.50' } },
        questions: [
          cmp2('u12-3-A1', 'Eve raised $90.70 for charity. Grace raised $87.90 for charity.', 'Eve 为慈善筹了 90.70 元，Grace 筹了 87.90 元。', ['Eve', 90.70], ['Grace', 87.90], true, 'raised'),
          cmp2('u12-3-A2', 'Father spends $16.45 in a day. Mother spends $14.65 in a day.', '爸爸一天花 16.45 元，妈妈一天花 14.65 元。', ['Father', 16.45], ['Mother', 14.65], false, 'spends'),
          cmp2('u12-3-A3', 'Mr James earns $625.50 in a week. Mr Jones earns $625.00 in a week.', 'James 先生一周挣 625.50 元，Jones 先生一周挣 625.00 元。', ['Mr James', 625.50], ['Mr Jones', 625.00], true, 'earns'),
          cmp2('u12-3-A4', 'Jerry saves $45.90 in a month. Noelle saves $55.85 in a month.', 'Jerry 一个月存 45.90 元，Noelle 存 55.85 元。', ['Jerry', 45.90], ['Noelle', 55.85], false, 'saves'),
          cmp2('u12-3-A5', 'Mrs Adams has $65.90. Mrs Drew has $67.80.', 'Adams 太太有 65.90 元，Drew 太太有 67.80 元。', ['Mrs Adams', 65.90], ['Mrs Drew', 67.80], true, 'has'),
          cmp3('u12-3-A6', "Jennifer's weekly allowance is $26.50. Kate's weekly allowance is $19.60. Lucy's weekly allowance is $23.25.", 'Jennifer 每周零花钱 26.50 元，Kate 19.60 元，Lucy 23.25 元。', [['Jennifer', 26.50], ['Kate', 19.60], ['Lucy', 23.25]], ['smallest', 'greatest'], ['most', 'has the most weekly allowance', 'has the least weekly allowance']),
          cmp3('u12-3-A7', 'Alan saves $4.50 in a day. Betty saves $5.15 in a day. Caleb saves $4.45 in a day.', 'Alan 一天存 4.50 元，Betty 5.15 元，Caleb 4.45 元。', [['Alan', 4.50], ['Betty', 5.15], ['Caleb', 4.45]], ['greatest', 'smallest'], ['least', 'saves the least in a day', 'saves the most in a day']),
          cmp3('u12-3-A8', 'Dora spends $187.50 in a month. Edgar spends $185.20 in a month. Fiona spends $182.70 in a month.', 'Dora 一个月花 187.50 元，Edgar 185.20 元，Fiona 182.70 元。', [['Dora', 187.50], ['Edgar', 185.20], ['Fiona', 182.70]], ['smallest', 'greatest'], ['least', 'spends the least in a month', 'spends the most in a month']),
          cmp3('u12-3-A9', 'A shirt costs $49.60. A bag costs $69.40. A pair of shoes costs $46.90.', '衬衫 49.60 元，包 69.40 元，鞋 46.90 元。', [['shirt', 49.60], ['bag', 69.40], ['pair of shoes', 46.90]], ['greatest', 'smallest'], ['most', 'is the most expensive item', 'is the least expensive item']),
          cmp3('u12-3-A10', 'A dining table costs $288. A sofa set costs $448. A cupboard costs $628.', '餐桌 288 元，沙发 448 元，橱柜 628 元。', [['dining table', 288], ['sofa set', 448], ['cupboard', 628]], ['smallest', 'greatest'], ['least', 'is the least expensive item', 'is the most expensive item']),
        ] }],
    },
    {
      id: 'u12-4', available: true,
      title: { zh: '钱的应用题', en: 'Solve word problems related to money' },
      intro: { zh: '和普通应用题一样：合起来用加，拿走/找零用减，几份一样的用乘，平均分用除。', en: 'Add, subtract, multiply or divide, just like other word problems.' },
      sections: [{ id: 'A', type: 'word', title: { zh: '应用题', en: 'Solve these word problems' },
        example: { kind: 'word', n: W('ex', 'Jerome has $10. He spends $4 on a colouring set. How much money has he left?', 'Jerome 有 10 元。他花 4 元买了涂色套装。还剩多少钱？', Sb(['$10', 10], ['spent', 4], 'left'), S('He has $___ left.', '他还剩 ___ 元。')), title: { zh: '$10 − $4 = $6', en: '$10 − $4 = $6' } },
        questions: [
          mulDivW('u12-4-A1', 'A book cost $3. Geraldine bought 6 such books. How much did she pay for the books?', '一本书 3 元。Geraldine 买了 6 本。她付了多少钱？', 6, 3, '×', 'She paid $___ for the books.', '📚'),
          W2('u12-4-A2', 'An ice cream cost 55¢. A nugget cost 25¢ less than the ice cream. What was the total cost of the ice cream and the nugget?', '冰淇淋 55 分。鸡块比冰淇淋便宜 25 分。冰淇淋和鸡块一共多少钱？', { ask: S('How much did the nugget cost?', '鸡块多少钱？'), model: Cm(['ice cream', 55], 'nugget', 25, 'less'), sentence: S('The nugget cost ___¢.', '鸡块 ___ 分。') }, { ask: S('What was the total cost?', '一共多少钱？'), model: A_([['ice cream', 55], ['nugget', 'ANS1']]), sentence: S('The total cost of the ice cream and the nugget was ___¢.', '一共 ___ 分。') }),
          W2('u12-4-A3', 'Aunt Rose earns $350 in a week. Uncle James earns $190 more than Aunt Rose in a week. How much money do both of them earn in a week?', 'Rose 阿姨一周挣 350 元。James 叔叔比她多挣 190 元。两人一周一共挣多少？', { ask: S('How much does Uncle James earn?', 'James 叔叔挣多少？'), model: Cm(['Aunt Rose', 350], 'Uncle James', 190, 'more'), sentence: S('Uncle James earns $___ in a week.', 'James 叔叔一周挣 ___ 元。') }, { ask: S('How much do both of them earn?', '两人一共挣多少？'), model: A_([['Aunt Rose', 350], ['Uncle James', 'ANS1']]), sentence: S('Both of them earn $___ in a week.', '两人一周一共挣 ___ 元。') }),
          W('u12-4-A4', 'Gina bought a doll for $29. She gave the cashier $100. How much change would she receive?', 'Gina 买了一个 29 元的娃娃。她给了收银员 100 元。应该找回多少钱？', Sb(['gave', 100], ['doll', 29], 'change'), S('She would receive $___ in change.', '她应该找回 ___ 元。')),
          mulDivW('u12-4-A5', 'Mr Andrews gives his son $40 to spend over 10 days. If his son spends an equal amount of money every day, how much money does he spend each day?', 'Andrews 先生给儿子 40 元花 10 天。每天花的一样多，每天花多少？', 40, 10, '÷', 'He spends $___ each day.', '💵'),
          mulDivW('u12-4-A6', 'A stationery set costs $5. How much does Norman need to pay if he wants to buy 7 such sets?', '一套文具 5 元。Norman 买 7 套要付多少钱？', 7, 5, '×', 'He needs to pay $___.', '✏️'),
          { id: 'u12-4-A7', type: 'fill', label: 'Mother withdraws $50 from the ATM. She spends $28.85 on provisions.', prompt: { zh: '妈妈从取款机取了 50 元。她买东西花了 28.85 元。还剩多少钱？', en: 'Mother withdraws $50 from the ATM. If she spends $28.85 on provisions, how much money has she left?' }, text: `$50.00 − $28.85 = $ {{a}}\nShe has $ {{b}} left.`, fields: { a: { a: '21.15', kind: 'money' }, b: { a: '21.15', kind: 'money' } }, answerText: '$21.15', hint: { zh: '先把 $50 写成 $50.00，再减：50.00 − 28.85。先减分（100 − 85 = 15），再减元（49 − 28 = 21）。', en: '$50.00 − $28.85: cents first (100 − 85 = 15), then dollars (49 − 28 = 21).' } },
          mulDivW('u12-4-A8', 'Four friends share the cost of a $24 gift equally. How much does each friend pay?', '4 个朋友平分一份 24 元的礼物。每人付多少？', 24, 4, '÷', 'Each friend pays $___.', '🎁'),
          W2('u12-4-A9', 'Vincent has $280 in his savings. After his father gives him $60, Vincent has $110 more than his younger brother. How much does his younger brother have?', 'Vincent 存了 280 元。爸爸给了他 60 元后，Vincent 比弟弟多 110 元。弟弟有多少钱？', { ask: S('How much does Vincent have now?', 'Vincent 现在有多少钱？'), model: A_([['savings', 280], ['father', 60]]), sentence: S('Vincent now has $___.', 'Vincent 现在有 ___ 元。') }, { ask: S('How much does his younger brother have?', '弟弟有多少钱？'), model: Cm(['Vincent', 'ANS1'], 'brother', 110, 'less'), sentence: S('His younger brother has $___.', '弟弟有 ___ 元。') }),
          W('u12-4-A10', 'A class of students has raised $397 for charity. After receiving a donation, they reach their target of $500. How much is the donation?', '一个班为慈善筹到 397 元。收到一笔捐款后达到了 500 元的目标。捐款是多少？', Sb(['target', 500], ['raised', 397], 'donation'), S('The donation is $___.', '捐款是 ___ 元。')),
          mulDivW('u12-4-A11', 'A laser printer costs $268. How much do 2 such printers cost?', '一台激光打印机 268 元。2 台多少钱？', 2, 268, '×', '2 such printers cost $___.', '🖨️'),
          mulDivW('u12-4-A12', 'The cost of a $60 meal is shared equally among some friends. If each friend pays $5, how many friends are there?', '一顿 60 元的饭由几个朋友平摊。每人付 5 元，有几个朋友？', 60, 5, '÷g', 'There are ___ friends.', '🍽️'),
        ] }],
    },
  ];
})();
