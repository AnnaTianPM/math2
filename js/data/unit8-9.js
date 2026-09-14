/* Unit 8 乘除法应用题、Unit 9 长度 */
(function () {
  const U = window.MATH_DATA.units;
  const unit = num => U.find(u => u.num === num);
  const M = window.MeasureUI;

  // ---------- Unit 8 ----------
  // 乘法应用题：groups × each
  const mw = (id, en, zh, groups, each, sentence, emoji, noun) => ({ id, type: 'fill', label: en, prompt: { zh, en },
    text: `{{a}} × {{b}} = {{c}}\n${sentence.replace('___', '{{d}}')}`, fields: { a: { a: groups }, b: { a: each }, c: { a: groups * each }, d: { a: groups * each } },
    accept: [{ a: groups, b: each, c: groups * each, d: groups * each }, { a: each, b: groups, c: groups * each, d: groups * each }],
    answerText: `${groups} × ${each} = ${groups * each}`, explain: ['mulgroups', { groups, each, emoji, noun }],
    hint: { zh: `有 ${groups} 组（份），每组 ${each} 个，求一共多少，用乘法：${groups} × ${each}。`, en: `${groups} groups of ${each}: multiply.` } });
  const dw = (id, en, zh, total, by, kind, sentence, emoji, noun) => ({ id, type: 'fill', label: en, prompt: { zh, en },
    text: `{{a}} ÷ {{b}} = {{c}}\n${sentence.replace('___', '{{d}}')}`, fields: { a: { a: total }, b: { a: by }, c: { a: total / by }, d: { a: total / by } },
    answerText: `${total} ÷ ${by} = ${total / by}`, explain: [kind === 'share' ? 'divshare' : 'divgroup', kind === 'share' ? { total, groups: by, emoji, noun } : { total, each: by, emoji, noun }],
    hint: { zh: kind === 'share' ? `一共 ${total} 个，平均分成 ${by} 份，求每份几个，用除法：${total} ÷ ${by}。` : `一共 ${total} 个，每 ${by} 个一份，求有几份，用除法：${total} ÷ ${by}。`, en: `Divide: ${total} ÷ ${by}.` } });

  unit(8).kps = [
    {
      id: 'u8-1', available: true,
      title: { zh: '乘法应用题', en: 'Solve multiplication word problems' },
      intro: { zh: '有几份，每份几个，求一共多少：用乘法。', en: 'Groups × each = total.' },
      sections: [{ id: 'A', type: 'fill', title: { zh: '应用题', en: 'Do these word problems' },
        example: { kind: 'mulgroups', n: { groups: 6, each: 5, emoji: '🍎', noun: '苹果' }, title: { zh: '6 袋苹果，每袋 5 个：6 × 5 = 30', en: '6 bags of 5 apples: 6 × 5 = 30' } },
        questions: [
          mw('u8-1-A1', 'Sam does 10 sit-ups every day. How many sit-ups does he do in 8 days?', 'Sam 每天做 10 个仰卧起坐。8 天做多少个？', 8, 10, 'Sam does ___ sit-ups in 8 days.', '💪', '仰卧起坐'),
          mw('u8-1-A2', 'Sharon bought 4 pieces of cloth. Each piece of cloth had 7 flowers sewn on it. How many flowers were there altogether?', 'Sharon 买了 4 块布，每块布上缝了 7 朵花。一共有多少朵花？', 4, 7, 'There were ___ flowers altogether.', '🌸', '花'),
          mw('u8-1-A3', 'Mary learns 5 songs every week. How many songs will she learn in 10 weeks?', 'Mary 每周学 5 首歌。10 周学多少首？', 10, 5, 'Mary will learn ___ songs in 10 weeks.', '🎵', '歌'),
          mw('u8-1-A4', 'There are 3 eggs in a bag. How many eggs are there in 6 such bags?', '一袋有 3 个鸡蛋。6 袋有多少个？', 6, 3, 'There are ___ eggs in 6 such bags.', '🥚', '鸡蛋'),
          mw('u8-1-A5', 'There are 12 children in an activity group. How many children are there in 2 such groups?', '一个活动小组有 12 个孩子。2 个小组有多少个？', 2, 12, 'There are ___ children in 2 such groups.', '🧒', '孩子'),
          mw('u8-1-A6', 'A child has 7 sweets. How many sweets do 5 children have?', '一个孩子有 7 颗糖。5 个孩子有多少颗？', 5, 7, '5 children have ___ sweets.', '🍬', '糖'),
          mw('u8-1-A7', 'Ricky buys 4 packs of stickers. There are 9 stickers in each pack. How many stickers does he buy?', 'Ricky 买了 4 包贴纸，每包 9 张。他买了多少张？', 4, 9, 'Ricky buys ___ stickers.', '⭐', '贴纸'),
          mw('u8-1-A8', 'Terry did 8 pages of homework. Each page had 10 questions. How many questions did Terry do altogether?', 'Terry 做了 8 页作业，每页 10 题。一共做了多少题？', 8, 10, 'Terry did ___ questions altogether.', '❓', '题'),
          mw('u8-1-A9', 'Aunt Fiona decorated 3 cakes in an hour. How many cakes did she decorate in 5 hours?', 'Fiona 阿姨一小时装饰 3 个蛋糕。5 小时装饰多少个？', 5, 3, 'Aunt Fiona decorated ___ cakes in 5 hours.', '🎂', '蛋糕'),
          mw('u8-1-A10', 'Madeline wrapped 11 presents with a roll of sticky tape. How many presents did she wrap with 2 such rolls of sticky tape?', 'Madeline 用一卷胶带包了 11 个礼物。2 卷能包多少个？', 2, 11, 'Madeline wrapped ___ presents with 2 such rolls of sticky tape.', '🎁', '礼物'),
        ] }],
    },
    {
      id: 'u8-2', available: true,
      title: { zh: '除法应用题', en: 'Solve division word problems' },
      intro: { zh: '知道一共多少，平均分成几份（或每份几个），求每份几个（或有几份）：用除法。', en: 'Total ÷ groups = each, or total ÷ each = groups.' },
      sections: [{ id: 'A', type: 'fill', title: { zh: '应用题', en: 'Do these word problems' },
        example: { kind: 'divshare', n: { total: 15, groups: 3, emoji: '🔘', noun: '纽扣' }, title: { zh: '15 颗纽扣缝在 3 件衬衫上：15 ÷ 3 = 5', en: '15 buttons on 3 shirts: 15 ÷ 3 = 5' } },
        questions: [
          dw('u8-2-A1', 'Peter groups 5 trading cards into one stack. If he has 25 trading cards, how many stacks does he group them into?', 'Peter 每 5 张卡片叠成一摞。他有 25 张卡片，能叠成几摞？', 25, 5, 'group', 'Peter groups the trading cards into ___ stacks.', '🃏', '卡片'),
          dw('u8-2-A2', 'Janet packs 10 packets of biscuits into one bag. If there are 100 packets of biscuits, how many such bags does Janet need?', 'Janet 每 10 包饼干装一袋。有 100 包饼干，需要几个袋子？', 100, 10, 'group', 'Janet needs ___ such bags.', '🍪', '饼干'),
          dw('u8-2-A3', 'Randy has 16 pieces of chocolate. He shares them with 3 friends. How many pieces of chocolate does each of them have?', 'Randy 有 16 块巧克力，和 3 个朋友一起分（一共 4 个人）。每人分到几块？', 16, 4, 'share', 'Each of them has ___ pieces of chocolate.', '🍫', '巧克力'),
          dw('u8-2-A4', 'Grace and 2 friends share 30 oranges equally. How many oranges does each of them have?', 'Grace 和 2 个朋友平分 30 个橙子（一共 3 个人）。每人分到几个？', 30, 3, 'share', 'Each of them has ___ oranges.', '🍊', '橙子'),
          dw('u8-2-A5', 'Kelly bought 18 stalks of orchids. She placed them equally into 2 vases. How many stalks of orchids were there in each vase?', 'Kelly 买了 18 枝兰花，平均插进 2 个花瓶。每个花瓶几枝？', 18, 2, 'share', 'There were ___ stalks of orchids in each vase.', '🌷', '兰花'),
          dw('u8-2-A6', 'Miss Drew gave 36 sweets to some children. Each child received 4 sweets. How many children did Miss Drew give the sweets to?', 'Drew 老师把 36 颗糖分给一些孩子，每个孩子 4 颗。分给了几个孩子？', 36, 4, 'group', 'Miss Drew gave the sweets to ___ children.', '🍬', '糖'),
          dw('u8-2-A7', 'Mother bought 21 buns. She placed them equally on some plates. There were 3 buns on each plate. How many plates did she use?', '妈妈买了 21 个面包，平均放在盘子里，每盘 3 个。用了几个盘子？', 21, 3, 'group', 'Mother used ___ plates.', '🥐', '面包'),
          dw('u8-2-A8', 'Uncle Ben packs 40 pens equally into 10 boxes. How many pens are there in each box?', 'Ben 叔叔把 40 支笔平均装进 10 个盒子。每盒几支？', 40, 10, 'share', 'There are ___ pens in each box.', '🖊️', '笔'),
          dw('u8-2-A9', '45 participants are put into groups of 5. How many such groups are there?', '45 个参加者每 5 人分一组。有几组？', 45, 5, 'group', 'There are ___ such groups of participants.', '🧑', '参加者'),
          dw('u8-2-A10', '16 logs are loaded equally onto 2 wheelbarrows. How many logs are there on each wheelbarrow?', '16 根木头平均装到 2 辆手推车上。每辆几根？', 16, 2, 'share', 'There were ___ logs on each wheelbarrow.', '🪵', '木头'),
        ] }],
    },
  ];

  // ---------- Unit 9 ----------
  const moreLess = (id, label, emoji, frac, dim, dimEn) => ({ id, type: 'fill', pic: M.metreStick(label, emoji, frac), label: `${label} 比 1 m ${frac > 1 ? '长' : '短'}`,
    prompt: { zh: '看图，比 1 米长还是短？', en: 'More or less than 1 m?' }, text: `The ${dimEn} of the ${label} is {{c}} than 1 m.`,
    fields: { c: { a: frac > 1 ? 'more' : 'less', kind: 'choice', options: ['more', 'less'] } }, answerText: frac > 1 ? 'more' : 'less', explain: ['metre', { label, emoji, frac, dim }],
    hint: { zh: '看它有没有超过尺子上 1 m 的位置。超过了是 more（多），没超过是 less（少）。', en: 'Does it go past the 1 m mark?' } });
  const sortItems = (id, dimEn, items) => ({ id, type: 'fill', label: `${dimEn} more/less than 1 m`, prompt: { zh: `想一想，这些东西的${{ Length: '长度', Width: '宽度', Height: '高度' }[dimEn]}比 1 米长还是短？`, en: `${dimEn} more than 1 m or less than 1 m?` },
    text: items.map(([name], i) => `${name}: {{i${i}}}`).join('\n'), fields: Object.fromEntries(items.map(([name, ans], i) => [`i${i}`, { a: ans, kind: 'choice', options: ['more than 1 m', 'less than 1 m'] }])),
    answerText: items.map(([n, a]) => `${n}: ${a}`).join('; '), hint: { zh: '1 米大约是一个 6 岁小朋友张开手臂那么长。想想这个东西比这个长还是短。', en: '1 m is about as long as your arms stretched out.' } });
  const cmpM = (id, items, unitStr, kind, qs, vertical) => { // qs: array of [text, key, answer, explainRef]
    const fields = {}; const text = qs.map(([t, k, a]) => { fields[k] = typeof a === 'string' ? { a, kind: 'choice', options: items.map(i => i.label.replace(/^\w+ /, '')) } : { a }; return t.replace('___', `{{${k}}}`); }).join('\n');
    return { id, type: 'fill', pic: M.bars(items, { unit: unitStr, vertical }), label: items.map(i => `${i.label} ${i.v} ${unitStr}`).join('，'), prompt: { zh: '看图，填一填', en: 'Fill in the blanks' }, text, fields,
      answerText: qs.map(([t, k, a]) => a).join(', '), explain: ['lenorder', { items, unit: unitStr, vertical, desc: kind === 'desc' }],
      hint: { zh: '长的减短的就是相差多少。', en: 'Longer − shorter = difference.' } }; };
  const orderPic = (id, noun, items, desc, vertical) => { // items [{label,v}] v relative size
    const sorted = items.slice().sort((x, y) => desc ? y.v - x.v : x.v - y.v);
    const short = items.slice().sort((x, y) => x.v - y.v)[0].label, long = items.slice().sort((x, y) => y.v - x.v)[0].label;
    const letters = items.map(i => i.label);
    return { id, type: 'fill', pic: M.bars(items, { unit: '', showV: false, vertical }), label: `${noun} A/B/C 排序`, prompt: { zh: '看图比一比', en: 'Look at the picture and fill in' },
      text: `${noun} {{a}} is the ${vertical ? 'tallest' : 'longest'}.\n${noun} {{b}} is the shortest.\nFrom ${desc ? (vertical ? 'tallest' : 'longest') + ' to shortest' : 'shortest to ' + (vertical ? 'tallest' : 'longest')}: {{c}}, {{d}}, {{e}}`,
      fields: { a: { a: long, kind: 'choice', options: letters }, b: { a: short, kind: 'choice', options: letters }, c: { a: sorted[0].label, kind: 'choice', options: letters }, d: { a: sorted[1].label, kind: 'choice', options: letters }, e: { a: sorted[2].label, kind: 'choice', options: letters } },
      answerText: `${long}, ${short}; ${sorted.map(i => i.label).join(', ')}`, explain: ['lenorder', { items: items.map(i => ({ label: i.label, v: i.v })), unit: '格', vertical, desc }],
      hint: { zh: '用眼睛比一比哪个最长、哪个最短。', en: 'Compare by eye.' } }; };
  const rulerQ = (id, items, qs, max) => { // qs: [text, key, answer]
    const fields = {}; const text = qs.map(([t, k, a, opts]) => { fields[k] = opts ? { a, kind: 'choice', options: opts } : { a }; return t.replace('___', `{{${k}}}`); }).join('\n');
    return { id, type: 'fill', pic: M.ruler(items, { max: max || 15 }), label: items.map(i => i.label).join(' / ') + ' 量一量', prompt: { zh: '看尺子，量一量', en: 'Read the ruler' }, text, fields,
      answerText: qs.map(([t, k, a]) => a).join(', '), explain: ['readruler', { items, idx: 0 }],
      hint: { zh: '看物品的左边对着几，右边对着几。右边减左边就是长度。左边对着 0 的话，右边是几就是几厘米。', en: 'Right mark − left mark = length.' } }; };
  const lineQ = (id, len) => rulerQ(id, [{ label: 'line', from: 0, to: len }], [['The line is ___ cm long.', 'a', len]], 16);
  const drawQ = (id, ab, delta, more) => ({ id, type: 'fill', pic: M.ruler([{ label: ab, from: 0, to: ab.length ? { AB: 4, CD: 7, EF: 3, GH: 8, IJ: 6, KL: 5 }[ab] : 0 }], { max: 15 }), label: `${ab} 和比它${more ? '长' : '短'} ${delta} cm 的线`,
    prompt: { zh: '看图算一算', en: 'Work it out' }, text: `(a) Line ${ab} is {{a}} cm long.\n(b) A line ${delta} cm ${more ? 'longer' : 'shorter'} than ${ab} is {{b}} cm long.`,
    fields: { a: { a: { AB: 4, CD: 7, EF: 3, GH: 8, IJ: 6, KL: 5 }[ab] }, b: { a: { AB: 4, CD: 7, EF: 3, GH: 8, IJ: 6, KL: 5 }[ab] + (more ? delta : -delta) } },
    answerText: `${{ AB: 4, CD: 7, EF: 3, GH: 8, IJ: 6, KL: 5 }[ab]} cm; ${{ AB: 4, CD: 7, EF: 3, GH: 8, IJ: 6, KL: 5 }[ab] + (more ? delta : -delta)} cm`,
    hint: { zh: `${more ? '长' : '短'} ${delta} cm 就是${more ? '加' : '减'} ${delta}。`, en: `${more ? 'Add' : 'Subtract'} ${delta}.` } });
  const lenEq = (id, a, b, op, u) => ({ id, type: 'fill', text: `${a} ${u} ${op === '+' ? '+' : '−'} ${b} ${u} = {{p}} ${u}`, fields: { p: { a: op === '+' ? a + b : a - b } }, answerText: `${op === '+' ? a + b : a - b} ${u}`, prompt: { zh: '算一算（单位一样，直接算）', en: 'Work it out' }, explain: [op === '+' ? 'coladd' : 'colsub', { a, b }], hint: { zh: '单位相同，数字直接加减，单位不变。', en: 'Same unit: just add or subtract the numbers.' } });
  const lenEq3 = (id, a, b, c, u) => ({ id, type: 'fill', text: `${a} ${u} + ${b} ${u} + ${c} ${u} = {{p}} ${u}`, fields: { p: { a: a + b + c } }, answerText: `${a + b + c} ${u}`, prompt: { zh: '算一算', en: 'Work it out' }, explain: ['coladd', { a: a + b, b: c }], hint: { zh: `先算 ${a} + ${b} = ${a + b}，再加 ${c}。`, en: `${a} + ${b} = ${a + b}, then add ${c}.` } });
  const W = (id, en, zh, model, sentence) => ({ id, type: 'word', en, zh, model, sentence });

  unit(9).kps = [
    {
      id: 'u9-1', available: true,
      title: { zh: '用米尺量：比 1 米长还是短', en: 'Measure length, width and height using a metre rule' },
      intro: { zh: '米（m）是量长东西的单位。1 米大约是小朋友张开双臂的长度。比 1 米长叫 more than 1 m，比 1 米短叫 less than 1 m。', en: 'A metre (m) is a unit of length. More than 1 m or less than 1 m.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '看图：比 1 米长还是短', en: 'Fill in each blank with "more" or "less"' },
          example: { kind: 'metre', n: { label: 'rope', emoji: '🪢', frac: 1.3, dim: '长度' }, title: { zh: '绳子比 1 m 长', en: 'The rope is more than 1 m' } },
          questions: [moreLess('u9-1-A1', 'shovel', '🪏', 1.25, '长度', 'length'), moreLess('u9-1-A2', 'safe box', '🗄️', 0.6, '宽度', 'width'), moreLess('u9-1-A3', 'Kevin', '🧒', 1.2, '高度', 'height'), moreLess('u9-1-A4', 'feather duster', '🧹', 0.75, '长度', 'length'), moreLess('u9-1-A5', 'car', '🚗', 1.8, '宽度', 'width'), moreLess('u9-1-A6', 'bonsai plant', '🪴', 0.7, '高度', 'height')] },
        { id: 'B', type: 'fill', title: { zh: '想一想：比 1 米长还是短', en: 'Sort the items: more than 1 m or less than 1 m' },
          example: { kind: 'metre', n: { label: 'bed', emoji: '🛏️', frac: 1.9, dim: '长度' }, title: { zh: '床比 1 m 长，铅笔盒比 1 m 短', en: 'A bed is longer than 1 m' } },
          questions: [
            sortItems('u9-1-B1', 'Length', [['bed 床', 'more than 1 m'], ['pencil case 铅笔盒', 'less than 1 m'], ['shoe 鞋', 'less than 1 m'], ['mop 拖把', 'more than 1 m'], ['remote control 遥控器', 'less than 1 m'], ['skipping rope 跳绳', 'more than 1 m']]),
            sortItems('u9-1-B2', 'Width', [['bus 公交车', 'more than 1 m'], ['laptop 笔记本电脑', 'less than 1 m'], ['pool table 台球桌', 'more than 1 m'], ['briefcase 公文包', 'less than 1 m'], ['lift 电梯', 'more than 1 m'], ['telephone 电话', 'less than 1 m']]),
            sortItems('u9-1-B3', 'Height', [['door 门', 'more than 1 m'], ['lorry 卡车', 'more than 1 m'], ['table lamp 台灯', 'less than 1 m'], ['flag pole 旗杆', 'more than 1 m'], ['pencil holder 笔筒', 'less than 1 m'], ['water flask 水壶', 'less than 1 m']]),
          ] },
      ],
    },
    {
      id: 'u9-2', available: true,
      title: { zh: '比较和排列长度（米）', en: 'Compare and order lengths in metres' },
      intro: { zh: '比较长度：长的减短的，就是长了多少（或短了多少）。', en: 'Longer − shorter = how much longer.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '填一填', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'lenorder', n: { items: [{ label: 'String A', v: 3 }, { label: 'String B', v: 1 }, { label: 'String C', v: 5 }], unit: 'm', desc: true }, title: { zh: 'String A 3 m、B 1 m、C 5 m', en: 'Strings A, B, C' } },
          questions: [
            cmpM('u9-2-A1', [{ label: 'Ribbon A', v: 2 }, { label: 'Ribbon B', v: 6 }, { label: 'Ribbon C', v: 4 }], 'm', 'asc', [['Ribbon ___ is the shortest.', 'a', 'A'], ['Ribbon ___ is the longest.', 'b', 'B'], ['Ribbon A is ___ m shorter than Ribbon C.', 'c', 2], ['Ribbon C is ___ m shorter than Ribbon B.', 'd', 2], ['Ribbon B is ___ m longer than Ribbon C.', 'e', 2], ['Ribbon B is ___ m longer than Ribbon A.', 'f', 4]]),
            cmpM('u9-2-A2', [{ label: 'Window A', v: 3 }, { label: 'Window B', v: 1 }, { label: 'Window C', v: 5 }], 'm', 'desc', [['Window ___ is the tallest.', 'a', 'C'], ['Window ___ is the shortest.', 'b', 'B'], ['Window A is ___ m shorter than Window C.', 'c', 2], ['Window B is ___ m shorter than Window A.', 'd', 2], ['Window C is ___ m taller than Window B.', 'e', 4], ['Window C is ___ m taller than Window A.', 'f', 2]], true),
          ] },
        { id: 'B', type: 'fill', title: { zh: '看图排一排', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'lenorder', n: { items: [{ label: 'A', v: 5 }, { label: 'B', v: 3 }, { label: 'C', v: 7 }], unit: '', desc: true }, title: { zh: '从长到短排', en: 'Longest to shortest' } },
          questions: [orderPic('u9-2-B1', 'Crocodile', [{ label: 'A', v: 6 }, { label: 'B', v: 5 }, { label: 'C', v: 8 }], true), orderPic('u9-2-B2', 'Mountain', [{ label: 'A', v: 9 }, { label: 'B', v: 3 }, { label: 'C', v: 5 }], true, true), orderPic('u9-2-B3', 'Lorry', [{ label: 'A', v: 5 }, { label: 'B', v: 7 }, { label: 'C', v: 4 }], false), orderPic('u9-2-B4', 'Statue', [{ label: 'A', v: 9 }, { label: 'B', v: 7 }, { label: 'C', v: 5 }], false, true)] },
      ],
    },
    {
      id: 'u9-3', available: true,
      title: { zh: '用厘米量短的东西', en: 'Measure lengths of shorter objects in centimetres' },
      intro: { zh: '厘米（cm）用来量短的东西。量的时候看左边对着几、右边对着几，右边减左边就是长度。', en: 'Centimetre (cm) for short objects. Right mark − left mark = length.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '看尺子读长度', en: 'Look at the pictures and fill in the blanks' },
          example: { kind: 'readruler', n: { items: [{ label: 'pencil case', from: 0, to: 6 }], idx: 0 }, title: { zh: '铅笔盒 6 cm', en: 'The pencil case is 6 cm' } },
          questions: [
            rulerQ('u9-3-A1', [{ label: 'chopsticks', from: 0, to: 14 }, { label: 'highlighter pen', from: 0, to: 8 }], [['The chopsticks are ___ cm long.', 'a', 14], ['The highlighter pen is ___ cm long.', 'b', 8]]),
            rulerQ('u9-3-A2', [{ label: 'strawberry', from: 0, to: 5 }, { label: 'leaf', from: 0, to: 12 }], [['The length of the strawberry is ___ cm.', 'a', 5], ['The length of the leaf is ___ cm.', 'b', 12]]),
            rulerQ('u9-3-A3', [{ label: 'fork', from: 1, to: 14 }, { label: 'lipstick', from: 4, to: 11 }, { label: 'correction fluid', from: 3, to: 12 }], [['The fork is ___ cm long.', 'a', 13], ['The lipstick is ___ cm long.', 'b', 7], ['The correction fluid is ___ cm long.', 'c', 9]]),
            rulerQ('u9-3-A4', [{ label: 'earthworm', from: 4, to: 14 }, { label: 'centipede', from: 1, to: 15 }, { label: 'beetle', from: 5, to: 11 }], [['The length of the earthworm is ___ cm.', 'a', 10], ['The length of the centipede is ___ cm.', 'b', 14], ['The length of the beetle is ___ cm.', 'c', 6]]),
          ] },
        { id: 'B', type: 'fill', title: { zh: '量一量这些东西', en: 'Measure the lengths of these items' },
          example: { kind: 'readruler', n: { items: [{ label: 'pencil case', from: 0, to: 6 }], idx: 0 }, title: { zh: '铅笔盒 6 cm', en: 'The pencil case is 6 cm' } },
          questions: [rulerQ('u9-3-B1', [{ label: 'pen', from: 0, to: 5 }], [['The pen is ___ cm long.', 'a', 5]], 10), rulerQ('u9-3-B2', [{ label: 'storybook', from: 0, to: 3 }], [['The storybook is ___ cm wide.', 'a', 3]], 10), rulerQ('u9-3-B3', [{ label: 'sticky note', from: 0, to: 4 }], [['The sticky note is ___ cm long.', 'a', 4]], 10), rulerQ('u9-3-B4', [{ label: 'calculator', from: 0, to: 6 }], [['The calculator is ___ cm wide.', 'a', 6]], 10), rulerQ('u9-3-B5', [{ label: 'calendar', from: 0, to: 7 }], [['The calendar is ___ cm long.', 'a', 7]], 10)] },
        { id: 'C', type: 'fill', title: { zh: '量线段', en: 'Measure the lengths of these lines' },
          example: { kind: 'readruler', n: { items: [{ label: 'line', from: 0, to: 9 }], idx: 0 }, title: { zh: '线段 9 cm', en: 'The line is 9 cm' } },
          questions: [lineQ('u9-3-C1', 6), lineQ('u9-3-C2', 8), lineQ('u9-3-C3', 4), lineQ('u9-3-C4', 10), lineQ('u9-3-C5', 15)] },
        { id: 'D', type: 'fill', title: { zh: '比它长几厘米、短几厘米', en: 'Lines longer or shorter than a given line' },
          example: { kind: 'readruler', n: { items: [{ label: 'AB', from: 0, to: 4 }], idx: 0 }, title: { zh: 'AB 4 cm，比它长 4 cm 的线是 8 cm', en: 'AB is 4 cm; 4 cm longer is 8 cm' } },
          questions: [drawQ('u9-3-D1', 'AB', 4, true), drawQ('u9-3-D2', 'CD', 2, false), drawQ('u9-3-D3', 'EF', 3, true), drawQ('u9-3-D4', 'GH', 1, false), drawQ('u9-3-D5', 'IJ', 2, true), drawQ('u9-3-D6', 'KL', 3, false)] },
      ],
    },
    {
      id: 'u9-4', available: true,
      title: { zh: '比较和排列长度（厘米）', en: 'Compare and order lengths in centimetres' },
      intro: { zh: '先量出每个的长度，再比较：长的减短的就是相差多少。', en: 'Measure each, then compare.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '量一量，比一比', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'readruler', n: { items: [{ label: 'cucumber', from: 0, to: 11 }, { label: 'brinjal', from: 0, to: 9 }, { label: 'long bean', from: 0, to: 14 }], idx: 0 }, title: { zh: '黄瓜、茄子、豆角', en: 'Cucumber, brinjal, long bean' } },
          questions: [
            rulerQ('u9-4-A1', [{ label: 'cucumber', from: 0, to: 11 }, { label: 'brinjal', from: 0, to: 9 }, { label: 'long bean', from: 0, to: 14 }], [['The cucumber is ___ cm long.', 'a', 11], ['The brinjal is ___ cm long.', 'b', 9], ['The long bean is ___ cm long.', 'c', 14], ['The cucumber is ___ cm longer than the brinjal.', 'd', 2], ['The brinjal is ___ cm shorter than the long bean.', 'e', 5], ['The long bean is ___ cm longer than the cucumber.', 'f', 3], ['The ___ is the shortest.', 'g', 'brinjal', ['cucumber', 'brinjal', 'long bean']], ['The ___ is the longest.', 'h', 'long bean', ['cucumber', 'brinjal', 'long bean']], ['Shortest to longest: ___', 'i', 'brinjal, cucumber, long bean', ['brinjal, cucumber, long bean', 'cucumber, brinjal, long bean', 'long bean, cucumber, brinjal']]]),
            rulerQ('u9-4-A2', [{ label: 'Rod A', from: 2, to: 8 }, { label: 'Rod B', from: 1, to: 14 }, { label: 'Rod C', from: 5, to: 15 }], [['Rod A is ___ cm long.', 'a', 6], ['Rod B is ___ cm long.', 'b', 13], ['Rod C is ___ cm long.', 'c', 10], ['Rod A is ___ cm shorter than Rod B.', 'd', 7], ['Rod B is ___ cm longer than Rod C.', 'e', 3], ['Rod A is ___ cm shorter than Rod C.', 'f', 4], ['Rod ___ is the longest.', 'g', 'B', ['A', 'B', 'C']], ['Rod ___ is the shortest.', 'h', 'A', ['A', 'B', 'C']], ['Longest to shortest: ___', 'i', 'B, C, A', ['B, C, A', 'A, C, B', 'C, B, A']]]),
            rulerQ('u9-4-A3', [{ label: 'glue', from: 6, to: 11 }, { label: 'eraser', from: 10, to: 13 }, { label: 'stapler', from: 2, to: 9 }, { label: 'pencil', from: 0, to: 10 }], [['The bottle of glue is ___ cm long.', 'a', 5], ['The eraser is ___ cm long.', 'b', 3], ['The stapler is ___ cm long.', 'c', 7], ['The pencil is ___ cm long.', 'd', 10], ['The stapler is ___ cm longer than the bottle of glue.', 'e', 2], ['The eraser is ___ cm shorter than the pencil.', 'f', 7], ['The pencil is ___ cm longer than the stapler.', 'g', 3], ['The shortest item is the ___.', 'h', 'eraser', ['glue', 'eraser', 'stapler', 'pencil']], ['The longest item is the ___.', 'i', 'pencil', ['glue', 'eraser', 'stapler', 'pencil']], ['Shortest to longest: ___', 'j', 'eraser, glue, stapler, pencil', ['eraser, glue, stapler, pencil', 'glue, eraser, stapler, pencil', 'pencil, stapler, glue, eraser']]]),
            rulerQ('u9-4-A4', [{ label: 'Ribbon A', from: 0, to: 8 }, { label: 'Ribbon B', from: 0, to: 5 }, { label: 'Ribbon C', from: 0, to: 12 }, { label: 'Ribbon D', from: 0, to: 9 }], [['Ribbon A is ___ cm long.', 'a', 8], ['Ribbon B is ___ cm long.', 'b', 5], ['Ribbon C is ___ cm long.', 'c', 12], ['Ribbon D is ___ cm long.', 'd', 9], ['Ribbon A is ___ cm shorter than Ribbon C.', 'e', 4], ['Ribbon D is ___ cm longer than Ribbon B.', 'f', 4], ['Ribbon B is ___ cm shorter than Ribbon A.', 'g', 3], ['Ribbon ___ is the longest.', 'h', 'C', ['A', 'B', 'C', 'D']], ['Ribbon ___ is the shortest.', 'i', 'B', ['A', 'B', 'C', 'D']], ['Longest to shortest: ___', 'j', 'C, D, A, B', ['C, D, A, B', 'B, A, D, C', 'C, A, D, B']]]),
          ] },
      ],
    },
    {
      id: 'u9-5', available: true,
      title: { zh: '长度的加减', en: 'Add and subtract length' },
      intro: { zh: '单位相同的长度可以直接加减，答案带上单位。', en: 'Add or subtract lengths with the same unit.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '加一加', en: 'Add the following lengths' },
          example: { kind: 'coladd', n: { a: 125, b: 275 }, title: { zh: '125 m + 275 m = 400 m', en: '125 m + 275 m = 400 m' } },
          questions: [lenEq('u9-5-A1', 236, 279, '+', 'm'), lenEq('u9-5-A2', 399, 121, '+', 'm'), lenEq('u9-5-A3', 56, 65, '+', 'cm'), lenEq3('u9-5-A4', 35, 40, 55, 'cm'), lenEq3('u9-5-A5', 24, 9, 36, 'm'), lenEq3('u9-5-A6', 101, 82, 98, 'cm')] },
        { id: 'B', type: 'fill', title: { zh: '减一减', en: 'Subtract the following lengths' },
          example: { kind: 'colsub', n: { a: 100, b: 49 }, title: { zh: '100 cm − 49 cm = 51 cm', en: '100 cm − 49 cm = 51 cm' } },
          questions: [lenEq('u9-5-B1', 200, 65, '-', 'm'), lenEq('u9-5-B2', 310, 185, '-', 'm'), lenEq('u9-5-B3', 125, 89, '-', 'cm'), lenEq('u9-5-B4', 468, 318, '-', 'cm'), lenEq('u9-5-B5', 533, 355, '-', 'm'), lenEq('u9-5-B6', 401, 202, '-', 'cm')] },
        { id: 'C', type: 'word', title: { zh: '应用题', en: 'Do these word problems' },
          example: { kind: 'word', n: W('ex', 'Charlotte walked 345 m to a café. She then walked another 150 m to the park. How far did she walk in all?', 'Charlotte 走了 345 m 到咖啡馆，又走了 150 m 到公园。她一共走了多远？', { kind: 'add', parts: [{ label: 'café', v: 345 }, { label: 'park', v: 150 }] }, { en: 'She walked ___ m in all.', zh: '她一共走了 ___ m。' }), title: { zh: '345 m + 150 m', en: '345 m + 150 m' } },
          questions: [
            W('u9-5-C1', 'Belinda sewed 278 cm of curtains on Monday. She sewed 516 cm of curtains on Tuesday. Find the total length of curtains Belinda sewed on both days.', 'Belinda 星期一缝了 278 cm 窗帘，星期二缝了 516 cm。两天一共缝了多长？', { kind: 'add', parts: [{ label: 'Monday', v: 278 }, { label: 'Tuesday', v: 516 }] }, { en: 'The total length of curtains Belinda sewed on both days was ___ cm.', zh: '两天一共缝了 ___ cm。' }),
            W('u9-5-C2', 'A guinea pig is 13 cm long. A rabbit is 31 cm long. How much longer is the rabbit than the guinea pig?', '豚鼠长 13 cm，兔子长 31 cm。兔子比豚鼠长多少？', { kind: 'sub', whole: { label: 'rabbit', v: 31 }, known: { label: 'guinea pig', v: 13 }, unknown: { label: 'longer' } }, { en: 'The rabbit is ___ cm longer than the guinea pig.', zh: '兔子比豚鼠长 ___ cm。' }),
            W('u9-5-C3', 'After school, Sandra goes to the food centre (120 m from school) to buy lunch before making her way home (225 m from the food centre). How far does she travel?', '放学后 Sandra 先去 120 m 外的美食中心买午饭，再走 225 m 回家。她一共走了多远？', { kind: 'add', parts: [{ label: 'school→food centre', v: 120 }, { label: 'food centre→home', v: 225 }] }, { en: 'She travels ___ m.', zh: '她一共走了 ___ m。' }),
            W('u9-5-C4', 'A contractor paints 65 cm of a 150-cm plank yellow. He paints the rest of it red. What is the length of the plank painted red?', '一块 150 cm 的木板，65 cm 刷成黄色，其余刷成红色。红色部分有多长？', { kind: 'sub', whole: { label: 'plank', v: 150 }, known: { label: 'yellow', v: 65 }, unknown: { label: 'red' } }, { en: 'The length of the plank painted red is ___ cm.', zh: '红色部分长 ___ cm。' }),
            W('u9-5-C5', "The stadium is 350 m away from Jason's house. Jason jogs to the stadium and back to his house. How far does he jog?", '体育场离 Jason 家 350 m。Jason 跑到体育场再跑回家。他一共跑了多远？', { kind: 'add', parts: [{ label: 'to stadium', v: 350 }, { label: 'back home', v: 350 }] }, { en: 'He jogs ___ m.', zh: '他一共跑了 ___ m。' }),
            W('u9-5-C6', '500 m of a new road needs to be paved. If 271 m of it is completed, how much more of the road needs to be paved?', '一条 500 m 的新路要铺。已经铺好 271 m，还要铺多少？', { kind: 'sub', whole: { label: 'road', v: 500 }, known: { label: 'done', v: 271 }, unknown: { label: 'left' } }, { en: '___ m more of the road needs to be paved.', zh: '还要铺 ___ m。' }),
            W('u9-5-C7', 'Bernard is 148 cm tall. Benedict is 12 cm taller than Bernard. How tall is Benedict?', 'Bernard 身高 148 cm。Benedict 比 Bernard 高 12 cm。Benedict 多高？', { kind: 'cmp', base: { label: 'Bernard', v: 148 }, other: { label: 'Benedict' }, diff: 12, otherIs: 'more' }, { en: 'Benedict is ___ cm tall.', zh: 'Benedict 身高 ___ cm。' }),
            W('u9-5-C8', "Amanda has a piece of ribbon that is 26 cm long. June has a piece of ribbon that is 13 cm shorter than Amanda's ribbon. What is the length of June's ribbon?", 'Amanda 的丝带长 26 cm。June 的丝带比 Amanda 的短 13 cm。June 的丝带多长？', { kind: 'cmp', base: { label: 'Amanda', v: 26 }, other: { label: 'June' }, diff: 13, otherIs: 'less' }, { en: "June's ribbon is ___ cm long.", zh: 'June 的丝带长 ___ cm。' }),
            W('u9-5-C9', 'In a relay race, team member A runs a distance of 200 m. Team member B then runs a distance of 300 m. Team member C runs another 400 m. What is the total distance covered by the team?', '接力赛中，A 跑了 200 m，B 跑了 300 m，C 跑了 400 m。全队一共跑了多远？', { kind: 'add', parts: [{ label: 'A', v: 200 }, { label: 'B', v: 300 }, { label: 'C', v: 400 }] }, { en: 'The total distance covered by the team is ___ m.', zh: '全队一共跑了 ___ m。' }),
            W('u9-5-C10', 'A seamstress has 24 m of lace. She uses 9 m of the lace for some dresses. How much lace does the seamstress have left?', '裁缝有 24 m 花边。她用了 9 m 做裙子。还剩多少花边？', { kind: 'sub', whole: { label: 'lace', v: 24 }, known: { label: 'used', v: 9 }, unknown: { label: 'left' } }, { en: 'The seamstress has ___ m of lace left.', zh: '裁缝还剩 ___ m 花边。' }),
          ] },
      ],
    },
    {
      id: 'u9-6', available: true,
      title: { zh: '长度的乘除', en: 'Multiply and divide length' },
      intro: { zh: '几段一样长的接起来，用乘法；把一段平均分成几份，用除法。单位不变。', en: 'Equal lengths joined: multiply. A length cut into equal parts: divide.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '乘一乘', en: 'Multiply the following lengths' },
          example: { kind: 'mulfact', n: { a: 4, b: 9 }, title: { zh: '9 m × 4 = 36 m', en: '9 m × 4 = 36 m' } },
          questions: [[9, 4, 'm'], [12, 2, 'cm'], [11, 5, 'cm'], [8, 3, 'm'], [10, 10, 'm']].map(([a, b, u], i) => ({ id: `u9-6-A${i + 1}`, type: 'fill', text: `${a} ${u} × ${b} = {{p}} ${u}`, fields: { p: { a: a * b } }, answerText: `${a * b} ${u}`, prompt: { zh: '算一算', en: 'Work it out' }, explain: ['mulfact', { a: b, b: a }], hint: { zh: `${b} 个 ${a} ${u}。`, en: `${b} groups of ${a} ${u}.` } })) },
        { id: 'B', type: 'fill', title: { zh: '除一除', en: 'Divide the following lengths' },
          example: { kind: 'divshare', n: { total: 18, groups: 2, emoji: '📏', noun: 'cm' }, title: { zh: '18 cm ÷ 2 = 9 cm', en: '18 cm ÷ 2 = 9 cm' } },
          questions: [[18, 2, 'cm'], [32, 4, 'cm'], [70, 10, 'm'], [21, 3, 'm'], [55, 5, 'cm']].map(([a, b, u], i) => ({ id: `u9-6-B${i + 1}`, type: 'fill', text: `${a} ${u} ÷ ${b} = {{p}} ${u}`, fields: { p: { a: a / b } }, answerText: `${a / b} ${u}`, prompt: { zh: '算一算', en: 'Work it out' }, explain: ['divshare', { total: a, groups: b, emoji: '📏', noun: u }], hint: { zh: `想：${b} × 几 = ${a}？`, en: `Think: ${b} × ? = ${a}.` } })) },
        { id: 'C', type: 'fill', title: { zh: '应用题', en: 'Do these word problems' },
          example: { kind: 'mulgroups', n: { groups: 7, each: 4, emoji: '🧱', noun: 'm' }, title: { zh: '每天砌 4 m，一周（7 天）砌 28 m', en: '4 m a day, 7 days: 7 × 4 = 28 m' } },
          questions: [
            ['Felix placed 3 boxes side by side. The length of each box was 10 cm. What was the length of the 3 boxes?', 'Felix 把 3 个盒子并排放。每个盒子长 10 cm。3 个盒子一共多长？', 3, 10, '×', 'The length of the 3 boxes was ___ cm.', '📦'],
            ['Mr Oliver cuts a rope of length 6 m into two equal pieces. What is the length of each piece of rope?', 'Oliver 先生把 6 m 长的绳子剪成相等的两段。每段多长？', 6, 2, '÷', 'The length of each piece of rope is ___ m.', '🪢'],
            ['Johnny placed 8 toothpicks in a straight line. The length of each toothpick was 5 cm. What was the length of 8 such toothpicks?', 'Johnny 把 8 根牙签排成一直线。每根牙签长 5 cm。8 根一共多长？', 8, 5, '×', 'The length of 8 such toothpicks was ___ cm.', '🥢'],
            ['Leon tears a strip of paper of length 27 cm into equal pieces. Each piece of paper measures 3 cm. How many pieces of paper does Leon have?', 'Leon 把 27 cm 长的纸条撕成相等的小段，每段 3 cm。他撕成了几段？', 27, 3, '÷g', 'Leon has ___ pieces of paper.', '📄'],
            ['The height of a flag pole is 9 m. What is the total height of 2 such flag poles?', '一根旗杆高 9 m。2 根这样的旗杆一共多高？', 2, 9, '×', 'The total height of 2 such flag poles is ___ m.', '🚩'],
            ['A field of length 120 m is divided equally into partitions of 10 m. How many partitions are there?', '一块 120 m 长的场地平均分成每段 10 m。分成了几段？', 120, 10, '÷g', 'There are ___ partitions.', '🟩'],
            ['Elaine arranges 11 erasers in a row. The length of each eraser is 4 cm. What is the length of 11 such erasers?', 'Elaine 把 11 块橡皮排成一排。每块橡皮长 4 cm。11 块一共多长？', 11, 4, '×', 'The length of 11 such erasers is ___ cm.', '🧽'],
            ['The length of a piece of string is 32 cm. Elaine cuts the string into equal pieces. Each piece of string measures 4 cm. How many pieces of string does Elaine have?', '一根绳子长 32 cm。Elaine 把它剪成相等的小段，每段 4 cm。剪成了几段？', 32, 4, '÷g', 'Elaine has ___ pieces of string.', '🧵'],
            ['An artist paints 3 m of a wall mural in a day. How many metres of the wall mural does he paint in a week?', '画家一天画 3 m 壁画。一周（7 天）画多少米？', 7, 3, '×', 'He paints ___ m of the wall mural in a week.', '🎨'],
            ['An electrician snips 40 m of cable into 5 equal lengths. How long is each piece of cable?', '电工把 40 m 电缆剪成相等的 5 段。每段多长？', 40, 5, '÷', 'Each piece of cable is ___ m long.', '🔌'],
          ].map(([en, zh, a, b, op, sentence, emoji], i) => {
            const isMul = op === '×', ans = isMul ? a * b : a / b;
            return { id: `u9-6-C${i + 1}`, type: 'fill', label: en, prompt: { zh, en }, text: `{{x}} ${isMul ? '×' : '÷'} {{y}} = {{z}}\n${sentence.replace('___', '{{d}}')}`,
              fields: { x: { a: a }, y: { a: b }, z: { a: ans }, d: { a: ans } }, accept: isMul ? [{ x: a, y: b, z: ans, d: ans }, { x: b, y: a, z: ans, d: ans }] : undefined,
              answerText: `${a} ${isMul ? '×' : '÷'} ${b} = ${ans}`, explain: isMul ? ['mulgroups', { groups: a, each: b, emoji, noun: '' }] : op === '÷g' ? ['divgroup', { total: a, each: b, emoji, noun: '' }] : ['divshare', { total: a, groups: b, emoji, noun: '' }],
              hint: isMul ? { zh: `${a} 个 ${b}，用乘法。`, en: 'Multiply.' } : { zh: `一共 ${a}，平均分，用除法。`, en: 'Divide.' } };
          }) },
      ],
    },
  ];
})();
