/* Unit 5 乘法与除法（等组、连加、平均分、乘除法一家） */
(function () {
  const U = window.MATH_DATA.units;
  const unit = num => U.find(u => u.num === num);
  const G = (groups, each, emoji, opts) => window.MulUI.groupsHTML(groups, each, emoji, Object.assign({ label: false }, opts || {}));
  const words = { 1: 'one', 2: 'twos', 3: 'threes', 4: 'fours', 5: 'fives', 6: 'sixes', 7: 'sevens', 8: 'eights', 9: 'nines', 10: 'tens' };

  // A：N fives = __ ; N × 5 = __
  const qa = (id, groups, each, emoji, noun) => ({
    id, type: 'fill', pic: G(groups, each, emoji), label: `${groups} 组，每组 ${each} 个${noun}`,
    prompt: { zh: '看图，填一填', en: 'Look at the picture and fill in' },
    text: `${groups} ${words[each]} = {{a}}\n${groups} × ${each} = {{b}}`,
    fields: { a: { a: groups * each }, b: { a: groups * each } }, answerText: String(groups * each),
    explain: ['mulgroups', { groups, each, emoji, noun }],
    hint: { zh: `${groups} 组，每组 ${each} 个。${each} 个 ${each} 个地数：${Array.from({ length: groups }, (_, i) => (i + 1) * each).join('、')}。`, en: `${groups} groups of ${each}. Count in ${each}s.` },
  });
  // A 后半："N groups of M apples = __ ; N × M = __"
  const qa2 = (id, groups, each, emoji, noun) => Object.assign(qa(id, groups, each, emoji, noun), { text: `${groups} groups of ${each} ${noun} = {{a}}\n${groups} × ${each} = {{b}}` });
  // B：连加 + 乘法 + 答句
  const qb = (id, groups, each, emoji, noun) => {
    const fields = {}; const adds = [];
    for (let i = 0; i < groups; i++) { fields['p' + i] = { a: each }; adds.push(`{{p${i}}}`); }
    fields.s = { a: groups * each }; fields.m1 = { a: groups }; fields.m2 = { a: each }; fields.p = { a: groups * each }; fields.t = { a: groups * each };
    return { id, type: 'fill', pic: G(groups, each, emoji), label: `${groups} 组，每组 ${each} 个${noun}`,
      prompt: { zh: '看图：先写连加，再写乘法', en: 'Write the repeated addition and the multiplication' },
      text: `${adds.join(' + ')} = {{s}}\n{{m1}} × {{m2}} = {{p}}\nThere are {{t}} ${noun} altogether.`,
      fields, answerText: `${Array(groups).fill(each).join(' + ')} = ${groups * each}; ${groups} × ${each} = ${groups * each}`,
      accept: [Object.assign({}, Object.fromEntries(Object.keys(fields).map(k => [k, fields[k].a]))), Object.assign({}, Object.fromEntries(Object.keys(fields).map(k => [k, fields[k].a])), { m1: each, m2: groups })],
      explain: ['mulgroups', { groups, each, emoji, noun }],
      hint: { zh: `有 ${groups} 组，每组 ${each} 个，就是 ${groups} 个 ${each} 相加。乘法写成“组数 × 每组几个”。`, en: `${groups} groups of ${each}: add ${each} ${groups} times.` } };
  };
  // C：__ × 7 = __ 形式
  const qc = (id, groups, each, emoji, noun, form) => {
    const total = groups * each;
    const text = form === 'g' ? `{{a}} × ${each} = {{b}}` : form === 'e' ? `${groups} × {{a}} = {{b}}` : `{{a}} × {{c}} = {{b}}\nThere are {{t}} ${noun} altogether.`;
    const fields = form === 'g' ? { a: { a: groups }, b: { a: total } } : form === 'e' ? { a: { a: each }, b: { a: total } } : { a: { a: groups }, c: { a: each }, b: { a: total }, t: { a: total } };
    const q = { id, type: 'fill', pic: G(groups, each, emoji), label: `${groups} 组，每组 ${each} 个${noun}`, prompt: { zh: '看图，填一填', en: 'Look at the picture and fill in' }, text, fields,
      answerText: `${groups} × ${each} = ${total}`, explain: ['mulgroups', { groups, each, emoji, noun }],
      hint: { zh: `数一数有几组，每组几个。${groups} 组，每组 ${each} 个。`, en: `Count the groups and how many in each group.` } };
    if (form === 'both') q.accept = [{ a: groups, c: each, b: total, t: total }, { a: each, c: groups, b: total, t: total }];
    return q;
  };
  // D："Multiply 5 by 8" → 5 × 8 = 40
  const qd = (id, a, b, emoji, noun) => ({ id, type: 'fill', pic: G(b, a, emoji), label: `Multiply ${a} by ${b}`, prompt: { zh: `Multiply ${a} by ${b}（${a} 乘以 ${b}）`, en: `Multiply ${a} by ${b}` },
    text: `{{x}} × {{y}} = {{p}}`, fields: { x: { a: a }, y: { a: b }, p: { a: a * b } }, answerText: `${a} × ${b} = ${a * b}`,
    accept: [{ x: a, y: b, p: a * b }, { x: b, y: a, p: a * b }],
    explain: ['mulgroups', { groups: b, each: a, emoji, noun }],
    hint: { zh: `“Multiply ${a} by ${b}”就是 ${a} × ${b}：${b} 组，每组 ${a} 个。`, en: `Multiply ${a} by ${b} means ${a} × ${b}.` } });
  // 除法：平均分 / 按组分
  const qdiv = (id, total, by, emoji, noun, kind) => {
    const res = total / by;
    const text = kind === 'share' ? `${total} ÷ {{a}} = {{b}}\nThere are {{c}} ${noun} in each group.` : `${total} ÷ {{a}} = {{b}}\nThere are {{c}} groups of ${noun}.`;
    return { id, type: 'fill', pic: window.MulUI.looseHTML(total, emoji), label: kind === 'share' ? `Divide ${total} ${noun} into ${by} equal groups` : `Divide ${total} ${noun} into groups of ${by}`,
      prompt: kind === 'share' ? { zh: `把 ${total} 个${noun}平均分成 ${by} 组`, en: `Divide ${total} ${noun} into ${by} equal groups` } : { zh: `把 ${total} 个${noun}每 ${by} 个分一组`, en: `Divide ${total} ${noun} into groups of ${by}` },
      text, fields: { a: { a: by }, b: { a: res }, c: { a: res } }, answerText: `${total} ÷ ${by} = ${res}`,
      explain: [kind === 'share' ? 'divshare' : 'divgroup', kind === 'share' ? { total, groups: by, emoji, noun } : { total, each: by, emoji, noun }],
      hint: kind === 'share' ? { zh: `平均分成 ${by} 组，就是 ${total} ÷ ${by}。想：${by} × 几 = ${total}？`, en: `${total} ÷ ${by}. Think: ${by} × ? = ${total}.` } : { zh: `每 ${by} 个一组，就是 ${total} ÷ ${by}。想：几 × ${by} = ${total}？`, en: `${total} ÷ ${by}. Think: ? × ${by} = ${total}.` } };
  };
  // 乘除法一家
  const qfam = (id, rows, cols, emoji, noun) => {
    const t = rows * cols;
    return { id, type: 'fill', pic: window.MulUI.arrayHTML(rows, cols, emoji), label: `${rows} 组，每组 ${cols} 个${noun}：写 4 个算式`,
      prompt: { zh: '看图，写两个乘法算式和两个除法算式', en: 'Write two multiplication and two division equations' },
      text: `{{a1}} × {{a2}} = {{a3}}\n{{b1}} × {{b2}} = {{b3}}\n{{c1}} ÷ {{c2}} = {{c3}}\n{{d1}} ÷ {{d2}} = {{d3}}`,
      fields: { a1: { a: rows }, a2: { a: cols }, a3: { a: t }, b1: { a: cols }, b2: { a: rows }, b3: { a: t }, c1: { a: t }, c2: { a: rows }, c3: { a: cols }, d1: { a: t }, d2: { a: cols }, d3: { a: rows } },
      accept: [
        { a1: rows, a2: cols, a3: t, b1: cols, b2: rows, b3: t, c1: t, c2: rows, c3: cols, d1: t, d2: cols, d3: rows },
        { a1: cols, a2: rows, a3: t, b1: rows, b2: cols, b3: t, c1: t, c2: rows, c3: cols, d1: t, d2: cols, d3: rows },
        { a1: rows, a2: cols, a3: t, b1: cols, b2: rows, b3: t, c1: t, c2: cols, c3: rows, d1: t, d2: rows, d3: cols },
        { a1: cols, a2: rows, a3: t, b1: rows, b2: cols, b3: t, c1: t, c2: cols, c3: rows, d1: t, d2: rows, d3: cols },
      ],
      answerText: `${rows} × ${cols} = ${t}, ${cols} × ${rows} = ${t}, ${t} ÷ ${rows} = ${cols}, ${t} ÷ ${cols} = ${rows}`,
      explain: ['factfam', { a: rows, b: cols, emoji }],
      hint: { zh: `${rows} 行，每行 ${cols} 个，一共 ${t}。乘法：${rows} × ${cols} 和 ${cols} × ${rows}；除法用 ${t} 去除。`, en: `${rows} rows of ${cols} = ${t}.` } };
  };

  unit(5).kps = [
    {
      id: 'u5-1', available: true,
      title: { zh: '等组与连加（认识乘法）', en: 'Multiply using equal groups and repeated addition' },
      intro: { zh: '几个相同的数加起来，可以用乘法写：3 个 4 相加 = 3 × 4 = 12。乘号 × 读作“乘”。', en: 'Equal groups can be written as multiplication: 3 fours = 3 × 4 = 12.' },
      sections: [
        {
          id: 'A', type: 'fill',
          title: { zh: '看图填一填：几个几', en: 'Look at the pictures and fill in the blanks' },
          example: { kind: 'mulgroups', n: { groups: 2, each: 3, emoji: '🍪', noun: '饼干' }, title: { zh: '2 threes = 2 × 3 = 6', en: '2 threes = 2 × 3 = 6' } },
          questions: [
            qa('u5-1-A1', 3, 4, '🍓', '草莓'), qa('u5-1-A2', 4, 3, '🍓', '草莓'),
            qa('u5-1-A3', 6, 5, '🐥', '小鸡'), qa('u5-1-A4', 5, 6, '🐥', '小鸡'),
            qa('u5-1-A5', 10, 2, '🐞', '瓢虫'), qa('u5-1-A6', 2, 10, '🐞', '瓢虫'),
            qa('u5-1-A7', 4, 8, '✏️', '铅笔'), qa('u5-1-A8', 8, 4, '✏️', '铅笔'),
            qa('u5-1-A9', 5, 7, '🕯️', '蜡烛'), qa('u5-1-A10', 7, 5, '🕯️', '蜡烛'),
            qa2('u5-1-A11', 5, 4, '🥛', 'glasses'), qa2('u5-1-A12', 4, 5, '🥛', 'glasses'),
            qa2('u5-1-A13', 7, 3, '🥚', 'eggs'), qa2('u5-1-A14', 3, 7, '🥚', 'eggs'),
            qa2('u5-1-A15', 3, 10, '🍎', 'apples'), qa2('u5-1-A16', 10, 3, '🍎', 'apples'),
            qa2('u5-1-A17', 4, 2, '🧒', 'children'), qa2('u5-1-A18', 2, 4, '🧒', 'children'),
            qa2('u5-1-A19', 9, 3, '🫛', 'peas'), qa2('u5-1-A20', 3, 9, '🫛', 'peas'),
          ]
        },
        {
          id: 'B', type: 'fill',
          title: { zh: '连加 → 乘法', en: 'Write the repeated addition and multiplication' },
          example: { kind: 'mulgroups', n: { groups: 3, each: 2, emoji: '🥿', noun: 'slippers' }, title: { zh: '2 + 2 + 2 = 6 → 3 × 2 = 6', en: '2 + 2 + 2 = 3 × 2 = 6' } },
          questions: [
            qb('u5-1-B1', 5, 3, '🥬', 'cabbages'), qb('u5-1-B2', 2, 5, '📚', 'books'), qb('u5-1-B3', 4, 4, '🐱', 'kittens'), qb('u5-1-B4', 3, 6, '🦋', 'butterflies'),
            qb('u5-1-B5', 7, 4, '🥛', 'cartons of milk'), qb('u5-1-B6', 5, 2, '🍊', 'oranges'), qb('u5-1-B7', 3, 4, '👟', 'shoes'), qb('u5-1-B8', 2, 10, '🌸', 'flowers'),
            qb('u5-1-B9', 7, 2, '🥢', 'chopsticks'), qb('u5-1-B10', 8, 3, '🐟', 'fish'),
          ]
        },
        {
          id: 'C', type: 'fill',
          title: { zh: '看图写乘法算式', en: 'Look at the pictures and fill in the blanks' },
          example: { kind: 'mulgroups', n: { groups: 4, each: 3, emoji: '🧸', noun: 'teddy bears' }, title: { zh: '4 组，每组 3 个：4 × 3 = 12', en: '4 groups of 3: 4 × 3 = 12' } },
          questions: [
            qc('u5-1-C1', 6, 2, '🧦', 'socks', 'e'), qc('u5-1-C2', 4, 7, '🧒', 'children', 'g'), qc('u5-1-C3', 2, 8, '🧁', 'cupcakes', 'e'), qc('u5-1-C4', 5, 4, '🍪', 'cookies', 'e'), qc('u5-1-C5', 4, 6, '🍓', 'strawberries', 'g'),
            qc('u5-1-C6', 6, 3, '🐱', 'kittens', 'both'), qc('u5-1-C7', 8, 10, '🧅', 'onions', 'both'), qc('u5-1-C8', 4, 3, '🧸', 'teddy bears', 'both'), qc('u5-1-C9', 5, 5, '📖', 'magazines', 'both'), qc('u5-1-C10', 9, 2, '🍐', 'pears', 'both'),
          ]
        },
        {
          id: 'D', type: 'fill',
          title: { zh: 'Multiply A by B', en: 'Look at the pictures and fill in the blanks' },
          example: { kind: 'mulgroups', n: { groups: 6, each: 3, emoji: '🧁', noun: 'cupcakes' }, title: { zh: 'Multiply 3 by 6：3 × 6 = 18', en: 'Multiply 3 by 6: 3 × 6 = 18' } },
          questions: [
            qd('u5-1-D1', 5, 8, '🍡', '丸子'), qd('u5-1-D2', 4, 4, '🥫', '罐头'), qd('u5-1-D3', 3, 5, '🎈', '气球'), qd('u5-1-D4', 5, 6, '🖐️', '手指'), qd('u5-1-D5', 10, 5, '✏️', '铅笔'),
            qd('u5-1-D6', 5, 5, '💐', '花'), qd('u5-1-D7', 7, 5, '🪙', '硬币'), qd('u5-1-D8', 4, 10, '🔮', '弹珠'), qd('u5-1-D9', 6, 6, '🃏', '卡片'), qd('u5-1-D10', 8, 2, '🦆', '鸭子'),
          ]
        },
      ],
    },
    {
      id: 'u5-2', available: true,
      title: { zh: '平均分与分组（认识除法）', en: 'Divide by sharing equally and using equal groups' },
      intro: { zh: '把东西平均分，用除法。12 ÷ 3 = 4：12 个分成 3 组，每组 4 个；也可以是每 3 个一组，分成 4 组。', en: 'Sharing equally is division: 12 ÷ 3 = 4.' },
      sections: [
        {
          id: 'A', type: 'fill',
          title: { zh: '看图，写除法算式', en: 'Look at the pictures and fill in the blanks' },
          example: { kind: 'divshare', n: { total: 12, groups: 3, emoji: '🔮', noun: '弹珠' }, title: { zh: '12 个弹珠平均分成 3 组', en: 'Divide 12 marbles into 3 equal groups' } },
          questions: [
            qdiv('u5-2-A1', 20, 2, '🧢', 'bottle caps', 'share'), qdiv('u5-2-A2', 16, 4, '✉️', 'envelopes', 'share'), qdiv('u5-2-A3', 30, 10, '⭐', 'stars', 'share'), qdiv('u5-2-A4', 15, 5, '🦋', 'butterflies', 'share'), qdiv('u5-2-A5', 24, 3, '🍒', 'cherries', 'share'),
            qdiv('u5-2-A6', 20, 4, '🍦', 'ice cream cones', 'group'), qdiv('u5-2-A7', 18, 3, '🖊️', 'pens', 'group'), qdiv('u5-2-A8', 25, 5, '🥬', 'cabbages', 'group'), qdiv('u5-2-A9', 8, 2, '🐶', 'puppies', 'group'), qdiv('u5-2-A10', 30, 10, '🔘', 'buttons', 'group'),
          ]
        },
      ],
    },
    {
      id: 'u5-3', available: true,
      title: { zh: '乘除法一家（一图四式）', en: 'Make multiplication and division stories' },
      intro: { zh: '一幅图可以写两个乘法算式和两个除法算式，它们是一家人。', en: 'One picture, two multiplication and two division equations.' },
      sections: [
        {
          id: 'A', type: 'fill',
          title: { zh: '每幅图写两个乘法和两个除法算式', en: 'Write two multiplication and division equations for each picture' },
          example: { kind: 'factfam', n: { a: 3, b: 4, emoji: '🟣' }, title: { zh: '3 × 4 = 12 的一家', en: 'Fact family of 3, 4 and 12' } },
          questions: [
            qfam('u5-3-A1', 8, 2, '👞', 'shoes'), qfam('u5-3-A2', 7, 3, '🍌', 'bananas'), qfam('u5-3-A3', 3, 6, '👕', 'shirts'), qfam('u5-3-A4', 6, 4, '🧁', 'cupcakes'), qfam('u5-3-A5', 4, 3, '🧒', 'children'),
          ]
        },
      ],
    },
  ];
})();
