/* Unit 6（2、5、10 的乘除法）、Unit 7（3、4 的乘除法） */
(function () {
  const U = window.MATH_DATA.units;
  const unit = num => U.find(u => u.num === num);
  const G = (groups, each, emoji) => window.MulUI.groupsHTML(groups, each, emoji);
  const A = (rows, cols, emoji) => window.MulUI.arrayHTML(rows, cols, emoji);

  // 看图：a × b = __
  const qpic = (id, a, b, emoji, noun) => ({ id, type: 'fill', pic: G(a, b, emoji), label: `${a} × ${b}（${a} 组，每组 ${b} 个${noun}）`,
    prompt: { zh: '看图，填一填', en: 'Look at the picture and fill in' }, text: `${a} × ${b} = {{p}}`, fields: { p: { a: a * b } }, answerText: String(a * b),
    explain: ['mulgroups', { groups: a, each: b, emoji, noun }], hint: { zh: `${a} 组，每组 ${b} 个。${b} 个 ${b} 个地数 ${a} 次。`, en: `${a} groups of ${b}.` } });
  // 口诀：a × b = __
  const qfact = (id, a, b) => ({ id, type: 'fill', text: `${a} × ${b} = {{p}}`, fields: { p: { a: a * b } }, answerText: String(a * b), prompt: { zh: '算一算', en: 'Fill in the blank' },
    explain: ['mulfact', { a, b }], hint: { zh: `${a} × ${b} 就是 ${a} 个 ${b}。${b} 个 ${b} 个地数：${Array.from({ length: a }, (_, i) => (i + 1) * b).join('、')}。`, en: `Count in ${b}s ${a} times.` } });
  // 巧算：a × b = base×b ± __ = __
  const qtrick = (id, a, b, base) => { const d = (a - base) * b, sign = d >= 0 ? '+' : '−';
    return { id, type: 'fill', text: `${a} × ${b} = ${base * b} ${sign} {{d}}\n= {{p}}`, fields: { d: { a: Math.abs(d) }, p: { a: a * b } }, answerText: `${base * b} ${sign} ${Math.abs(d)} = ${a * b}`,
      prompt: { zh: `用 ${base} × ${b} = ${base * b} 来算`, en: `Use ${base} × ${b} = ${base * b}` }, explain: ['mulfact', { a, b, base }],
      hint: { zh: `${a} 比 ${base} ${d >= 0 ? '多' : '少'} ${Math.abs(a - base)}，就${d >= 0 ? '多' : '少'} ${Math.abs(a - base)} 个 ${b}，也就是 ${Math.abs(d)}。`, en: `${a} is ${Math.abs(a - base)} ${d >= 0 ? 'more' : 'less'} than ${base}: ${d >= 0 ? 'add' : 'subtract'} ${Math.abs(d)}.` } }; };
  // 交换律看图：rows × cols
  const qcomm = (id, rows, cols, emoji, noun) => ({ id, type: 'fill', pic: A(rows, cols, emoji), label: `${rows} 行 ${cols} 列的${noun}`,
    prompt: { zh: '一行一行数，再一列一列数', en: 'Count by rows, then by columns' }, text: `{{a}} × {{b}} = {{p}}\n{{c}} × {{d}} = {{q}}`,
    fields: { a: { a: rows }, b: { a: cols }, p: { a: rows * cols }, c: { a: cols }, d: { a: rows }, q: { a: rows * cols } },
    accept: [{ a: rows, b: cols, p: rows * cols, c: cols, d: rows, q: rows * cols }, { a: cols, b: rows, p: rows * cols, c: rows, d: cols, q: rows * cols }],
    answerText: `${rows} × ${cols} = ${rows * cols}; ${cols} × ${rows} = ${rows * cols}`, explain: ['commute', { rows, cols, emoji }],
    hint: { zh: `${rows} 行，每行 ${cols} 个；${cols} 列，每列 ${rows} 个。两种算式答案一样。`, en: `${rows} rows of ${cols}, or ${cols} columns of ${rows}.` } });
  // 交换律填空
  const qcommB = (id, text, fields, accept, answerText, a, b) => ({ id, type: 'fill', text, fields, accept, answerText, prompt: { zh: '填一填', en: 'Fill in the blanks' }, explain: ['commute', { rows: a, cols: b, emoji: '🔵' }], hint: { zh: '交换两个数的位置，乘积不变。', en: 'Multiply in any order, the answer is the same.' } });
  // 用乘法口诀做除法
  const qdivw = (id, en, zh, total, by, kind, sentence, noun) => { const res = total / by;
    return { id, type: 'fill', label: en, prompt: { zh, en }, text: `{{a}} ÷ {{b}} = {{c}}\n${sentence.replace('___', '{{d}}')}`,
      fields: { a: { a: total }, b: { a: by }, c: { a: res }, d: { a: res } }, answerText: `${total} ÷ ${by} = ${res}`,
      explain: [kind === 'share' ? 'divshare' : 'divgroup', kind === 'share' ? { total, groups: by, emoji: '🟣', noun } : { total, each: by, emoji: '🟣', noun }],
      hint: { zh: `想乘法：${by} × 几 = ${total}？${by} × ${res} = ${total}，所以 ${total} ÷ ${by} = ${res}。`, en: `Think: ${by} × ? = ${total}.` } }; };
  // 乘除法一家（填空版）
  const qfam2 = (id, a, b) => { const t = a * b;
    if (a === b) return { id, type: 'fill', text: `${a} × {{x}} = ${t}\n${t} ÷ {{y}} = {{z}}`, fields: { x: { a: b }, y: { a: a }, z: { a: b } }, answerText: `${a} × ${b} = ${t}; ${t} ÷ ${a} = ${b}`, prompt: { zh: '完成乘除法一家', en: 'Complete the equations' }, explain: ['factfam', { a, b }], hint: { zh: `${a} × ${b} = ${t}，反过来 ${t} ÷ ${a} = ${b}。`, en: `${a} × ${b} = ${t}, so ${t} ÷ ${a} = ${b}.` } };
    return { id, type: 'fill', text: `${a} × {{x}} = ${t}\n${b} × {{y}} = ${t}\n${t} ÷ {{p}} = {{q}}\n${t} ÷ {{r}} = {{s}}`, fields: { x: { a: b }, y: { a: a }, p: { a: a }, q: { a: b }, r: { a: b }, s: { a: a } },
      accept: [{ x: b, y: a, p: a, q: b, r: b, s: a }, { x: b, y: a, p: b, q: a, r: a, s: b }], answerText: `${a} × ${b} = ${t}, ${b} × ${a} = ${t}, ${t} ÷ ${a} = ${b}, ${t} ÷ ${b} = ${a}`,
      prompt: { zh: '完成乘除法一家', en: 'Complete the multiplication and division equations' }, explain: ['factfam', { a, b }], hint: { zh: `${a}、${b}、${t} 是一家：${a} × ${b} = ${t}，${t} ÷ ${a} = ${b}，${t} ÷ ${b} = ${a}。`, en: `${a}, ${b}, ${t} are a fact family.` } }; };
  // 乘法 → 除法算式
  const qm2d = (id, a, b) => { const t = a * b;
    if (a === b) return { id, type: 'fill', text: `${a} × ${b} = ${t}\n{{p}} ÷ {{q}} = {{r}}`, fields: { p: { a: t }, q: { a: a }, r: { a: b } }, answerText: `${t} ÷ ${a} = ${b}`, prompt: { zh: '写出除法算式', en: 'Write the division equation' }, explain: ['factfam', { a, b }], hint: { zh: `乘法的积 ${t} 放在除法最前面。`, en: `Start with ${t}.` } };
    return { id, type: 'fill', text: `${a} × ${b} = ${t}\n{{p}} ÷ {{q}} = {{r}}\n{{s}} ÷ {{t}} = {{u}}`, fields: { p: { a: t }, q: { a: b }, r: { a: a }, s: { a: t }, t: { a: a }, u: { a: b } },
      accept: [{ p: t, q: b, r: a, s: t, t: a, u: b }, { p: t, q: a, r: b, s: t, t: b, u: a }], answerText: `${t} ÷ ${b} = ${a}; ${t} ÷ ${a} = ${b}`,
      prompt: { zh: '写出两个除法算式', en: 'Write the division equations' }, explain: ['factfam', { a, b }], hint: { zh: `乘法的积 ${t} 放在除法最前面：${t} ÷ ${b} = ${a}，${t} ÷ ${a} = ${b}。`, en: `Start with ${t}: ${t} ÷ ${b} = ${a}, ${t} ÷ ${a} = ${b}.` } }; };

  const tableKP = (uid, n, picQs, factList, trickList, trickBases) => ({
    id: uid, available: true,
    title: { zh: `${n} 的乘法表`, en: `Multiply numbers within multiplication table of ${n}` },
    intro: { zh: `${n} 的乘法：${n} 个 ${n} 个地数。${Array.from({ length: 12 }, (_, i) => (i + 1) * n).join('、')}。`, en: `Count in ${n}s: ${Array.from({ length: 12 }, (_, i) => (i + 1) * n).join(', ')}.` },
    sections: [
      { id: 'A', type: 'fill', title: { zh: '看图算一算', en: 'Look at the pictures and fill in the blanks' },
        example: { kind: 'mulgroups', n: { groups: picQs[0][0], each: n, emoji: picQs[0][1], noun: picQs[0][2] }, title: { zh: `${picQs[0][0]} × ${n}`, en: `${picQs[0][0]} × ${n}` } },
        questions: picQs.map(([a, emoji, noun], i) => qpic(`${uid}-A${i + 1}`, a, n, emoji, noun)) },
      { id: 'B', type: 'fill', title: { zh: `${n} 的乘法口诀`, en: 'Fill in each blank with the correct answer' },
        example: { kind: 'mulfact', n: { a: 7, b: n }, title: { zh: `7 × ${n}`, en: `7 × ${n}` } },
        questions: factList.map((a, i) => qfact(`${uid}-B${i + 1}`, a, n)) },
    ].concat(trickList ? [{ id: 'C', type: 'fill', title: { zh: `用 5 × ${n} 和 10 × ${n} 巧算`, en: 'Fill in each blank with the correct answer' },
        example: { kind: 'mulfact', n: { a: 4, b: n, base: 5 }, title: { zh: `4 × ${n} = ${5 * n} − ${n}`, en: `4 × ${n} = ${5 * n} − ${n}` } },
        questions: trickList.map((a, i) => qtrick(`${uid}-C${i + 1}`, a, n, trickBases[i])) }] : []),
  });

  // ================= Unit 6 =================
  unit(6).kps = [
    tableKP('u6-1', 2, [[3, '🐒', '猴子'], [5, '🧁', '纸杯蛋糕'], [6, '🥫', '罐头'], [8, '🍆', '茄子'], [10, '🐟', '鱼']], [1, 2, 4, 5, 6, 7, 8, 9, 11, 12], [3, 6, 7, 12, 9, 8], [5, 5, 5, 10, 10, 10]),
    tableKP('u6-2', 5, [[4, '🖐️', '手指'], [5, '🐸', '青蛙'], [7, '🍌', '香蕉'], [9, '🎳', '保龄球瓶'], [10, '✏️', '铅笔']], [1, 2, 3, 5, 6, 7, 8, 9, 11, 12], null),
    tableKP('u6-3', 10, [[2, '🍇', '葡萄'], [5, '🐞', '瓢虫'], [6, '🍫', '巧克力'], [8, '🔩', '钉子'], [9, '🌹', '玫瑰']], [1, 3, 4, 5, 6, 7, 8, 10, 11, 12], null),
    {
      id: 'u6-4', available: true,
      title: { zh: '乘法可以交换顺序', en: 'Multiply numbers in any order' },
      intro: { zh: '2 × 4 和 4 × 2 答案一样，都是 8。一行一行数和一列一列数，数出来的总数相同。', en: '2 × 4 = 4 × 2. Multiply in any order, the answer is the same.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '看图，写两个乘法算式', en: 'Look at the pictures and fill in the blanks' },
          example: { kind: 'commute', n: { rows: 2, cols: 4, emoji: '💡' }, title: { zh: '2 × 4 = 4 × 2 = 8', en: '2 × 4 = 4 × 2 = 8' } },
          questions: [qcomm('u6-4-A1', 5, 3, '🐌', '蜗牛'), qcomm('u6-4-A2', 2, 10, '🌞', '太阳'), qcomm('u6-4-A3', 2, 8, '👒', '帽子'), qcomm('u6-4-A4', 6, 5, '🐸', '青蛙'), qcomm('u6-4-A5', 1, 10, '🍒', '樱桃'), qcomm('u6-4-A6', 2, 11, '🥪', '三明治')] },
        { id: 'B', type: 'fill', title: { zh: '填一填', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'commute', n: { rows: 3, cols: 5, emoji: '🔵' }, title: { zh: '3 × 5 = 5 × 3 = 15', en: '3 × 5 = 5 × 3 = 15' } },
          questions: [
            qcommB('u6-4-B1', '2 × 1 = 1 × 2 = {{p}}', { p: { a: 2 } }, null, '2', 2, 1),
            qcommB('u6-4-B2', '5 × 8 = {{a}} × {{b}} = {{p}}', { a: { a: 8 }, b: { a: 5 }, p: { a: 40 } }, [{ a: 8, b: 5, p: 40 }, { a: 5, b: 8, p: 40 }], '8 × 5 = 40', 5, 8),
            qcommB('u6-4-B3', '10 × 6 = {{a}} × {{b}} = {{p}}', { a: { a: 6 }, b: { a: 10 }, p: { a: 60 } }, [{ a: 6, b: 10, p: 60 }, { a: 10, b: 6, p: 60 }], '6 × 10 = 60', 10, 6),
            qcommB('u6-4-B4', '{{a}} × {{b}} = 12 × 2 = {{p}}', { a: { a: 2 }, b: { a: 12 }, p: { a: 24 } }, [{ a: 2, b: 12, p: 24 }, { a: 12, b: 2, p: 24 }], '2 × 12 = 24', 12, 2),
            qcommB('u6-4-B5', '{{a}} × {{b}} = 9 × 5 = {{p}}', { a: { a: 5 }, b: { a: 9 }, p: { a: 45 } }, [{ a: 5, b: 9, p: 45 }, { a: 9, b: 5, p: 45 }], '5 × 9 = 45', 9, 5),
            qcommB('u6-4-B6', '{{a}} × {{b}} = 9 × 10 = {{p}}', { a: { a: 10 }, b: { a: 9 }, p: { a: 90 } }, [{ a: 10, b: 9, p: 90 }, { a: 9, b: 10, p: 90 }], '10 × 9 = 90', 9, 10),
          ] },
      ],
    },
    {
      id: 'u6-5', available: true,
      title: { zh: '用乘法口诀做除法', en: 'Divide numbers using multiplication facts' },
      intro: { zh: '算 6 ÷ 2，想：2 × 几 = 6？2 × 3 = 6，所以 6 ÷ 2 = 3。', en: 'To find 6 ÷ 2, think 2 × ? = 6.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '写出除法算式', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'divshare', n: { total: 6, groups: 2, emoji: '⭐', noun: '贴纸' }, title: { zh: '6 张贴纸平均贴在 2 张纸上', en: 'Stick 6 stickers equally on 2 pieces of paper' } },
          questions: [
            qdivw('u6-5-A1', 'Share 20 erasers equally among 10 students.', '把 20 块橡皮平均分给 10 个学生。', 20, 10, 'share', 'Each student gets ___ erasers.', '橡皮'),
            qdivw('u6-5-A2', 'Pack 8 packs of tissue paper equally into 2 school bags.', '把 8 包纸巾平均装进 2 个书包。', 8, 2, 'share', 'There are ___ packs of tissue paper in each school bag.', '纸巾'),
            qdivw('u6-5-A3', 'Put 25 pencils equally into 5 pencil holders.', '把 25 支铅笔平均放进 5 个笔筒。', 25, 5, 'share', 'There are ___ pencils in each pencil holder.', '铅笔'),
            qdivw('u6-5-A4', 'Pack 60 mobile phone sets equally into 10 shipping boxes.', '把 60 部手机平均装进 10 个箱子。', 60, 10, 'share', 'There are ___ mobile phone sets in each shipping box.', '手机'),
            qdivw('u6-5-A5', 'Slot 18 shuttlecocks equally into 2 tubes.', '把 18 个羽毛球平均放进 2 个筒。', 18, 2, 'share', 'There are ___ shuttlecocks in each tube.', '羽毛球'),
            qdivw('u6-5-A6', 'Place 40 chicks equally in 5 pens.', '把 40 只小鸡平均放进 5 个围栏。', 40, 5, 'share', 'There are ___ chicks in each pen.', '小鸡'),
            qdivw('u6-5-A7', 'Put 10 muffins equally on plates. There are 2 muffins on each plate.', '把 10 个松饼放在盘子里，每盘 2 个。', 10, 2, 'group', 'There are ___ plates of muffins.', '松饼'),
            qdivw('u6-5-A8', 'Pack 50 sweets equally into packs. There are 10 sweets in each pack.', '把 50 颗糖装袋，每袋 10 颗。', 50, 10, 'group', 'There are ___ packs of sweets.', '糖'),
            qdivw('u6-5-A9', 'Arrange 30 brochures equally onto tables. There are 5 brochures on each table.', '把 30 本小册子放在桌上，每桌 5 本。', 30, 5, 'group', 'There are ___ tables.', '小册子'),
            qdivw('u6-5-A10', 'Sort 70 saga seeds equally into groups of 10.', '把 70 颗相思豆每 10 颗分一组。', 70, 10, 'group', 'There are ___ groups of saga seeds.', '相思豆'),
            qdivw('u6-5-A11', 'Group 22 chopsticks equally into pairs of 2.', '把 22 根筷子每 2 根一双。', 22, 2, 'group', 'There are ___ pairs of chopsticks.', '筷子'),
            qdivw('u6-5-A12', 'Serve 40 grapes equally in bowls of 5.', '把 40 颗葡萄装碗，每碗 5 颗。', 40, 5, 'group', 'There are ___ bowls of grapes.', '葡萄'),
          ] },
      ],
    },
  ];

  // ================= Unit 7 =================
  unit(7).kps = [
    tableKP('u7-1', 3, [[2, '🐌', '蜗牛'], [3, '🍍', '菠萝'], [4, '🥫', '罐子'], [6, '💐', '花'], [7, '🎾', '球']], [1, 3, 4, 5, 6, 8, 9, 10, 11, 12], [7, 4, 3, 8, 11, 12], [5, 5, 5, 10, 10, 10]),
    tableKP('u7-2', 4, [[3, '🐴', '马'], [5, '🥚', '鸡蛋'], [6, '📌', '大头针'], [8, '🍰', '蛋糕'], [10, '🔥', '火柴']], [1, 2, 4, 5, 6, 7, 8, 9, 11, 12], [3, 6, 7, 12, 9, 8], [5, 5, 5, 10, 10, 10]),
    {
      id: 'u7-3', available: true,
      title: { zh: '乘法可以交换顺序', en: 'Multiply numbers in any order' },
      intro: { zh: '3 × 2 和 2 × 3 答案一样。一行一行数和一列一列数，总数相同。', en: 'Multiply in any order, the answer is the same.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '看图，写两个乘法算式', en: 'Look at the pictures and fill in the blanks' },
          example: { kind: 'commute', n: { rows: 3, cols: 4, emoji: '🌳' }, title: { zh: '3 × 4 = 4 × 3 = 12', en: '3 × 4 = 4 × 3 = 12' } },
          questions: [qcomm('u7-3-A1', 3, 2, '🌳', '树'), qcomm('u7-3-A2', 5, 4, '🚗', '汽车'), qcomm('u7-3-A3', 3, 9, '🐰', '兔子'), qcomm('u7-3-A4', 4, 1, '🔮', '水晶球'), qcomm('u7-3-A5', 3, 10, '🍬', '糖'), qcomm('u7-3-A6', 4, 11, '🥛', '牛奶')] },
        { id: 'B', type: 'fill', title: { zh: '填一填', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'commute', n: { rows: 4, cols: 5, emoji: '🔵' }, title: { zh: '4 × 5 = 5 × 4 = 20', en: '4 × 5 = 5 × 4 = 20' } },
          questions: [
            qcommB('u7-3-B1', '4 × 1 = 1 × 4 = {{p}}', { p: { a: 4 } }, null, '4', 4, 1),
            qcommB('u7-3-B2', '3 × 4 = {{a}} × {{b}} = {{p}}', { a: { a: 4 }, b: { a: 3 }, p: { a: 12 } }, [{ a: 4, b: 3, p: 12 }, { a: 3, b: 4, p: 12 }], '4 × 3 = 12', 3, 4),
            qcommB('u7-3-B3', '4 × 6 = {{a}} × {{b}} = {{p}}', { a: { a: 6 }, b: { a: 4 }, p: { a: 24 } }, [{ a: 6, b: 4, p: 24 }, { a: 4, b: 6, p: 24 }], '6 × 4 = 24', 4, 6),
            qcommB('u7-3-B4', '{{a}} × {{b}} = 5 × 3 = {{p}}', { a: { a: 3 }, b: { a: 5 }, p: { a: 15 } }, [{ a: 3, b: 5, p: 15 }, { a: 5, b: 3, p: 15 }], '3 × 5 = 15', 5, 3),
            qcommB('u7-3-B5', '{{a}} × {{b}} = 12 × 4 = {{p}}', { a: { a: 4 }, b: { a: 12 }, p: { a: 48 } }, [{ a: 4, b: 12, p: 48 }, { a: 12, b: 4, p: 48 }], '4 × 12 = 48', 12, 4),
            qcommB('u7-3-B6', '{{a}} × {{b}} = 11 × 3 = {{p}}', { a: { a: 3 }, b: { a: 11 }, p: { a: 33 } }, [{ a: 3, b: 11, p: 33 }, { a: 11, b: 3, p: 33 }], '3 × 11 = 33', 11, 3),
          ] },
      ],
    },
    {
      id: 'u7-4', available: true,
      title: { zh: '用乘法口诀做除法', en: 'Divide numbers using multiplication facts' },
      intro: { zh: '算 6 ÷ 3，想：3 × 几 = 6？3 × 2 = 6，所以 6 ÷ 3 = 2。', en: 'To find 6 ÷ 3, think 3 × ? = 6.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '写出除法算式', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'divshare', n: { total: 6, groups: 3, emoji: '🧦', noun: '袜子' }, title: { zh: '6 只袜子平均分成 3 堆', en: 'Divide 6 socks equally into 3 piles' } },
          questions: [
            qdivw('u7-4-A1', 'Arrange 12 books equally into 4 stacks.', '把 12 本书平均叠成 4 摞。', 12, 4, 'share', 'There are ___ books in each stack.', '书'),
            qdivw('u7-4-A2', 'Put 9 guppies equally in 3 bowls.', '把 9 条孔雀鱼平均放进 3 个鱼缸。', 9, 3, 'share', 'There are ___ guppies in each bowl.', '孔雀鱼'),
            qdivw('u7-4-A3', 'Share 28 buns equally among 4 friends.', '把 28 个面包平均分给 4 个朋友。', 28, 4, 'share', 'Each friend gets ___ buns.', '面包'),
            qdivw('u7-4-A4', 'Pack 24 books equally onto 3 shelves.', '把 24 本书平均放到 3 层书架上。', 24, 3, 'share', 'There are ___ books on each shelf.', '书'),
            qdivw('u7-4-A5', 'Hammer 18 nails equally onto planks. There are 3 nails on each plank.', '把 18 颗钉子钉到木板上，每块木板 3 颗。', 18, 3, 'group', 'There are ___ planks.', '钉子'),
            qdivw('u7-4-A6', 'Serve 16 chicken wings on plates. There are 4 chicken wings on each plate.', '把 16 个鸡翅装盘，每盘 4 个。', 16, 4, 'group', 'There are ___ plates of chicken wings.', '鸡翅'),
            qdivw('u7-4-A7', 'Gather 30 children into groups of 3.', '把 30 个孩子每 3 人分一组。', 30, 3, 'group', 'There are ___ groups of children.', '孩子'),
            qdivw('u7-4-A8', 'Pack 32 chocolate sticks into boxes of 4.', '把 32 根巧克力棒装盒，每盒 4 根。', 32, 4, 'group', 'There are ___ boxes of chocolate sticks.', '巧克力棒'),
          ] },
      ],
    },
    {
      id: 'u7-5', available: true,
      title: { zh: '乘除法一家', en: 'Write multiplication and division fact families' },
      intro: { zh: '3 × 4 = 12，4 × 3 = 12，12 ÷ 3 = 4，12 ÷ 4 = 3。三个数一家，四个算式。', en: '3 × 4 = 12, 4 × 3 = 12, 12 ÷ 3 = 4, 12 ÷ 4 = 3.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '完成乘除法一家', en: 'Complete the multiplication and division equations' },
          example: { kind: 'factfam', n: { a: 3, b: 4 }, title: { zh: '3、4、12 一家', en: 'Fact family of 3, 4, 12' } },
          questions: [qfam2('u7-5-A1', 5, 6), qfam2('u7-5-A2', 4, 2), qfam2('u7-5-A3', 10, 3), qfam2('u7-5-A4', 2, 2), qfam2('u7-5-A5', 3, 7), qfam2('u7-5-A6', 2, 8), qfam2('u7-5-A7', 5, 5), qfam2('u7-5-A8', 10, 9), qfam2('u7-5-A9', 3, 12), qfam2('u7-5-A10', 4, 11)] },
        { id: 'B', type: 'fill', title: { zh: '乘法 → 除法', en: 'Write division equation(s) for each multiplication equation' },
          example: { kind: 'factfam', n: { a: 6, b: 2 }, title: { zh: '6 × 2 = 12 → 12 ÷ 2 = 6，12 ÷ 6 = 2', en: '6 × 2 = 12 → 12 ÷ 2 = 6, 12 ÷ 6 = 2' } },
          questions: [qm2d('u7-5-B1', 5, 4), qm2d('u7-5-B2', 3, 3), qm2d('u7-5-B3', 2, 10), qm2d('u7-5-B4', 9, 2), qm2d('u7-5-B5', 8, 5), qm2d('u7-5-B6', 8, 3), qm2d('u7-5-B7', 4, 4), qm2d('u7-5-B8', 11, 10), qm2d('u7-5-B9', 12, 2), qm2d('u7-5-B10', 9, 5)] },
      ],
    },
  ];
})();
