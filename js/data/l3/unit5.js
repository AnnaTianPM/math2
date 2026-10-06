/* Level 3 · Unit 5  乘 6、7、8、9 */
(function () {
  const U = window.MATH_DATA.levels[3].units;
  const unit = num => U.find(u => u.num === num);
  const G = (groups, each, emoji) => window.MulUI.groupsHTML(groups, each, emoji);
  const A = (rows, cols, emoji) => window.MulUI.arrayHTML(rows, cols, emoji);
  const num = a => ({ a });
  // 看图写两个乘法算式：groups 组，每组 each
  const qpic2 = (id, g, e, emoji, noun) => ({ id, type: 'fill', pic: `<div class="center">${G(g, e, emoji)}</div>`, label: `${g} × ${e} = ${g * e}`, prompt: { zh: `${g} 组，每组 ${e} 个${noun}。写两个乘法算式`, en: 'Study the pictures carefully. Write two multiplication equations' }, text: `{{a}} × {{b}} = {{p}}\n{{c}} × {{d}} = {{q}}`,
    fields: { a: num(g), b: num(e), p: num(g * e), c: num(e), d: num(g), q: num(g * e) }, accept: [{ a: g, b: e, p: g * e, c: e, d: g, q: g * e }, { a: e, b: g, p: g * e, c: g, d: e, q: g * e }], answerText: `${g} × ${e} = ${g * e}; ${e} × ${g} = ${g * e}`,
    explain: ['commute', { rows: g, cols: e, emoji }], hint: { zh: `${g} 组，每组 ${e}：${g} × ${e}；交换位置 ${e} × ${g}，答案一样。`, en: `${g} groups of ${e}. ${g} × ${e} = ${e} × ${g}.` } });
  const qarr = (id, r, c, emoji) => ({ id, type: 'fill', pic: `<div class="center">${A(r, c, emoji)}</div>`, label: `${r} 行 ${c} 列`, prompt: { zh: '一行一行数，再一列一列数。写两个乘法算式', en: 'Study the pictures carefully. Write two multiplication equations' }, text: `{{a}} × {{b}} = {{p}}\n{{c}} × {{d}} = {{q}}`,
    fields: { a: num(r), b: num(c), p: num(r * c), c: num(c), d: num(r), q: num(r * c) }, accept: [{ a: r, b: c, p: r * c, c: c, d: r, q: r * c }, { a: c, b: r, p: r * c, c: r, d: c, q: r * c }], answerText: `${r} × ${c} = ${r * c}; ${c} × ${r} = ${r * c}`,
    explain: ['commute', { rows: r, cols: c, emoji }], hint: { zh: `${r} 行，每行 ${c} 个；${c} 列，每列 ${r} 个。`, en: `${r} rows of ${c}, or ${c} columns of ${r}.` } });
  const qfact = (id, a, b) => ({ id, type: 'fill', text: `${a} × ${b} = {{p}}`, fields: { p: num(a * b) }, answerText: String(a * b), label: `${a} × ${b} = ${a * b}`, prompt: { zh: '算一算', en: 'Fill in the blank' }, explain: ['mulfact', { a, b }], hint: { zh: `${a} 个 ${b}，${b} 个 ${b} 个地数 ${a} 次。`, en: `Count in ${b}s ${a} times.` } });
  const qmiss = (id, b, total, pos) => { const a = total / b; return { id, type: 'fill', text: pos === 'front' ? `{{x}} × ${b} = ${total}` : `${b} × {{x}} = ${total}`, fields: { x: num(a) }, answerText: String(a), label: pos === 'front' ? `${a} × ${b} = ${total}` : `${b} × ${a} = ${total}`, prompt: { zh: '几乘几？填一填', en: 'Fill in the blank' }, explain: ['l3missing', { b, total, pos }], hint: { zh: `想：几个 ${b} 是 ${total}？`, en: `How many ${b}s make ${total}?` } }; };
  const qsplit = (id, a, b, base) => { const k = Math.abs(a - base), more = a > base, sign = more ? '+' : '−';
    return { id, type: 'fill', text: `${a} × ${b} = ?\n${base} × ${b} = {{p}}\n${k} × ${b} = {{q}}\n${a} × ${b} = {{r}} ${sign} {{s}}\n= {{t}}`, fields: { p: num(base * b), q: num(k * b), r: num(base * b), s: num(k * b), t: num(a * b) }, answerText: `${base * b} ${sign} ${k * b} = ${a * b}`, label: `${a} × ${b} = ${base * b} ${sign} ${k * b}`, prompt: { zh: `用 ${base} × ${b} 来算 ${a} × ${b}`, en: `Use ${base} × ${b} to work out ${a} × ${b}` }, explain: ['l3mulsplit', { a, b, base }], hint: { zh: `${a} 比 ${base} ${more ? '多' : '少'} ${k}，所以${more ? '加' : '减'} ${k} 个 ${b}。`, en: `${more ? 'Add' : 'Subtract'} ${k} × ${b}.` } }; };
  const qdiv = (id, en, zh, total, by, kind, sentence, noun) => { const res = total / by;
    return { id, type: 'fill', label: en, pic: `<div class="wp-text"><div class="wp-en">${en}</div><div class="wp-zh">${zh}</div></div>`, prompt: { zh: '写除法算式，再填答句', en: 'Fill in each blank with the correct answer' }, text: `{{a}} ÷ {{b}} = {{c}}\n${sentence.replace('___', '{{d}}')}`,
      fields: { a: num(total), b: num(by), c: num(res), d: num(res) }, answerText: `${total} ÷ ${by} = ${res}`,
      explain: [kind === 'share' ? 'divshare' : 'divgroup', kind === 'share' ? { total, groups: by, emoji: '🟣', noun } : { total, each: by, emoji: '🟣', noun }],
      hint: { zh: `想乘法：${by} × 几 = ${total}？${by} × ${res} = ${total}。`, en: `Think: ${by} × ? = ${total}.` } }; };

  const tables = {
    6: { pics: [[2, '🫛', '豌豆荚（每荚 6 颗）'], [5, '📚', '层书（每层 6 本）'], [10, '💐', '束花（每束 6 朵）'], [4, '🚛', '辆货车（每辆 6 个轮子）'], [7, '🐜', '只蚂蚁（每只 6 条腿）']], facts: [1, 9, 5, 0, 2, 8, 7, 4, 6, 3, 10], miss: [[48, 'front'], [30, 'front'], [42, 'front'], [18, 'back'], [36, 'back']], split: [[9, 5], [7, 5], [8, 5], [6, 10], [8, 10], [7, 10]] },
    7: { pics: [[4, '🪮', '把梳子（每把 7 个齿）'], [6, '🪙', '叠硬币（每叠 7 个）'], [9, '🌴', '棵木瓜树（每棵 7 个）'], [5, '🌯', '盘春卷（每盘 7 个）'], [8, '✏️', '捆铅笔（每捆 7 支）']], facts: [2, 3, 6, 8, 1, 0, 4, 5, 9, 7, 10], miss: [[28, 'front'], [70, 'front'], [56, 'front'], [14, 'back'], [63, 'back']], split: [[8, 5], [9, 5], [7, 5], [7, 10], [6, 10], [8, 10]] },
    8: { pics: [[5, '🐙', '只章鱼（每只 8 条腿）'], [3, '🍫', '块巧克力（每块 8 格）'], [6, '🥚', '盒鸡蛋（每盒 8 个）'], [2, '🎈', '束气球（每束 8 个）'], [9, '💗', '条丝带（每条 8 颗心）']], facts: [0, 10, 7, 8, 2, 5, 9, 3, 6, 4, 1], miss: [[24, 'front'], [8, 'front'], [72, 'front'], [32, 'back'], [56, 'back']], split: [[7, 5], [9, 5], [8, 5], [8, 10], [7, 10], [6, 10]] },
    9: { pics: [[5, '🎂', '个蛋糕（每个 9 根蜡烛）'], [2, '🐟', '个鱼缸（每缸 9 条鱼）'], [7, '🍪', '盘饼干（每盘 9 块）'], [4, '🧒', '组小朋友（每组 9 人）'], [10, '🖌️', '筒画笔（每筒 9 支）']], facts: [3, 4, 2, 1, 0, 10, 9, 8, 5, 6, 7], miss: [[45, 'front'], [90, 'front'], [36, 'front'], [54, 'back'], [72, 'back']], split: [[9, 5], [8, 5], [7, 5], [6, 10], [7, 10], [8, 10]] },
  };
  const kpFor = n => ({
    id: `l3-5-${n - 5}`, available: true,
    title: { zh: `乘 ${n}`, en: `Multiply numbers by ${n}` },
    intro: { zh: `${n} 的乘法表：${Array.from({ length: 10 }, (_, i) => (i + 1) * n).join('、')}。不记得的可以用 5 × ${n} 或 10 × ${n} 来推。`, en: `Count in ${n}s. Use 5 × ${n} and 10 × ${n} to work out the others.` },
    sections: [
      { id: 'A', type: 'fill', title: { zh: '看图写两个乘法算式', en: 'Study the pictures carefully. Write two multiplication equations' },
        example: { kind: 'commute', n: { rows: 3, cols: n, emoji: '🔵' }, title: { zh: `3 × ${n} = ${3 * n}，${n} × 3 = ${3 * n}`, en: `3 × ${n} = ${n} × 3` } },
        questions: tables[n].pics.map(([g, emoji, noun], i) => qpic2(`l3-5-${n - 5}-A${i + 1}`, g, n, emoji, noun)) },
      { id: 'B', type: 'fill', title: { zh: `${n} 的乘法表`, en: 'Fill in each blank with the correct answer' },
        example: { kind: 'mulfact', n: { a: 7, b: n }, title: { zh: `7 × ${n} = ${7 * n}`, en: `7 × ${n}` } },
        questions: tables[n].facts.map((a, i) => qfact(`l3-5-${n - 5}-B${i + 1}`, a, n)).concat(tables[n].miss.map(([t, pos], i) => qmiss(`l3-5-${n - 5}-B${i + 12}`, n, t, pos))) },
      { id: 'C', type: 'fill', title: { zh: `用 5 × ${n} 和 10 × ${n} 来算`, en: 'Fill in each blank with the correct answer' },
        example: { kind: 'l3mulsplit', n: { a: 6, b: n, base: 5 }, title: { zh: `6 × ${n} = 5 × ${n} + 1 × ${n} = ${6 * n}`, en: `6 × ${n} = ${5 * n} + ${n}` } },
        questions: tables[n].split.map(([a, base], i) => qsplit(`l3-5-${n - 5}-C${i + 1}`, a, n, base)) },
    ],
  });

  const arr = [[4, 6, '🧊'], [5, 7, '🥚'], [8, 4, '🐌'], [2, 9, '🔑'], [7, 6, '🍃'], [7, 3, '🍬'], [1, 8, '🥭'], [9, 8, '🧦']];
  const divs = [
    ['Arrange 30 balls equally in 6 rows.', '把 30 个球平均排成 6 行。', 30, 6, 'share', 'There are ___ balls in each row.', '个球'],
    ['Place 28 marbles equally into 7 containers.', '把 28 颗弹珠平均放进 7 个容器。', 28, 7, 'share', 'There are ___ marbles in each container.', '颗弹珠'],
    ['Group 27 students equally into 9 teams.', '把 27 个学生平均分成 9 队。', 27, 9, 'share', 'There are ___ students in each team.', '个学生'],
    ['Pack 48 crayons equally into 8 boxes.', '把 48 支蜡笔平均装进 8 个盒子。', 48, 8, 'share', 'There are ___ crayons in each box.', '支蜡笔'],
    ['Divide 49 cherries equally among friends. Each friend gets 7 cherries.', '把 49 颗樱桃平均分给朋友，每人 7 颗。', 49, 7, 'group', 'There are ___ friends.', '颗樱桃'],
    ['Set 40 chairs equally to round tables. There are 8 chairs to each round table.', '把 40 把椅子平均放到圆桌旁，每桌 8 把。', 40, 8, 'group', 'There are ___ round tables.', '把椅子'],
    ['Share 36 toys equally among children. Each child gets 6 toys.', '把 36 个玩具平均分给小朋友，每人 6 个。', 36, 6, 'group', 'There are ___ children.', '个玩具'],
    ['Place 90 cookies equally onto trays. Each tray has 9 cookies.', '把 90 块饼干平均放到托盘上，每盘 9 块。', 90, 9, 'group', 'There are ___ trays of cookies.', '块饼干'],
  ];

  unit(5).kps = [6, 7, 8, 9].map(kpFor).concat([
    {
      id: 'l3-5-5', available: true,
      title: { zh: '阵列：两个乘法算式', en: 'Multiply numbers by 6, 7, 8 and 9' },
      intro: { zh: '排成行和列的东西，一行一行数是 行 × 列，一列一列数是 列 × 行，答案一样。', en: 'Count by rows or by columns: rows × columns = columns × rows.' },
      sections: [{ id: 'A', type: 'fill', title: { zh: '看阵列写两个乘法算式', en: 'Study the pictures carefully. Write two multiplication equations' },
        example: { kind: 'commute', n: { rows: 6, cols: 3, emoji: '🍪' }, title: { zh: '6 × 3 = 18，3 × 6 = 18', en: '6 × 3 = 3 × 6' } },
        questions: arr.map(([r, c, emoji], i) => qarr(`l3-5-5-A${i + 1}`, r, c, emoji)) }],
    },
    {
      id: 'l3-5-6', available: true,
      title: { zh: '用乘法口诀做除法', en: 'Divide numbers using multiplication facts' },
      intro: { zh: '除法想乘法：30 ÷ 6 = ?，想 6 × 几 = 30，6 × 5 = 30，所以是 5。', en: 'Think of the multiplication fact: 6 × ? = 30.' },
      sections: [{ id: 'A', type: 'fill', title: { zh: '除法应用', en: 'Fill in each blank with the correct answer' },
        example: { kind: 'divshare', n: { total: 14, groups: 7, emoji: '🍫', noun: '块巧克力' }, title: { zh: '14 ÷ 7 = 2，每盒 2 块', en: '14 ÷ 7 = 2' } },
        questions: divs.map(([en, zh, t, b, kind, sent, noun], i) => qdiv(`l3-5-6-A${i + 1}`, en, zh, t, b, kind, sent, noun)) }],
    },
  ]);
})();
