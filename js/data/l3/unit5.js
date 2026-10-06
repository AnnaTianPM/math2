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

  // 看图写两个乘法两个除法：g 组每组 e
  const qmd = (id, g, e, emoji, noun) => { const t = g * e; return { id, type: 'fill', pic: `<div class="center">${G(g, e, emoji)}</div>`, label: `${g} 组 ${e} 个${noun}`, prompt: { zh: `${g} 组，每组 ${e} 个${noun}。写两个乘法算式和两个除法算式`, en: 'Write two multiplication and division sentences' }, text: `{{a}} × {{b}} = {{p}}　{{t1}} ÷ {{d1}} = {{q1}}\n{{c}} × {{d}} = {{q}}　{{t2}} ÷ {{d2}} = {{q2}}`,
    fields: { a: num(g), b: num(e), p: num(t), t1: num(t), d1: num(g), q1: num(e), c: num(e), d: num(g), q: num(t), t2: num(t), d2: num(e), q2: num(g) },
    accept: [{ a: g, b: e, p: t, t1: t, d1: g, q1: e, c: e, d: g, q: t, t2: t, d2: e, q2: g }, { a: e, b: g, p: t, t1: t, d1: e, q1: g, c: g, d: e, q: t, t2: t, d2: g, q2: e }, { a: g, b: e, p: t, t1: t, d1: e, q1: g, c: e, d: g, q: t, t2: t, d2: g, q2: e }, { a: e, b: g, p: t, t1: t, d1: g, q1: e, c: g, d: e, q: t, t2: t, d2: e, q2: g }],
    answerText: `${g} × ${e} = ${t}, ${e} × ${g} = ${t}, ${t} ÷ ${g} = ${e}, ${t} ÷ ${e} = ${g}`, explain: ['factfam', { a: g, b: e, emoji }], hint: { zh: `${g}、${e}、${t} 是一家：两个乘法、两个除法。`, en: `${g}, ${e}, ${t} make a fact family.` } }; };
  const qfam = (id, a, b, front) => { const t = a * b; const l1 = front ? `{{x}} × ${b} = ${t}` : `${a} × {{x}} = ${t}`, l2 = `${b} × {{y}} = ${t}`;
    return { id, type: 'fill', text: `${l1}\n${l2}\n${t} ÷ {{p}} = {{q}}\n${t} ÷ {{r}} = {{s}}`, fields: { x: num(front ? a : b), y: num(a), p: num(a), q: num(b), r: num(b), s: num(a) }, accept: [{ x: front ? a : b, y: a, p: a, q: b, r: b, s: a }, { x: front ? a : b, y: a, p: b, q: a, r: a, s: b }], answerText: `${a} × ${b} = ${t}, ${t} ÷ ${a} = ${b}, ${t} ÷ ${b} = ${a}`, label: `${a} × ${b} = ${t} 一家`, prompt: { zh: '完成乘除法一家', en: 'Complete the multiplication and division equations' }, explain: ['factfam', { a, b }], hint: { zh: `${a} × ${b} = ${t}，反过来 ${t} ÷ ${a} = ${b}，${t} ÷ ${b} = ${a}。`, en: `${a}, ${b}, ${t} are a fact family.` } }; };
  const Sn = (en, zh) => ({ en, zh });
  const W = (id, en, zh, model, sentence) => ({ id, type: 'word', en, zh, model, sentence, label: en.slice(0, 50), explain: ['l3mdword', { en, zh, model, sentence }], hint: { zh: model.kind === 'mul' ? '几个几，用乘法。' : model.kind === 'div' ? '平均分，用除法，想乘法口诀。' : model.kind === 'times' ? '“几倍 / times as many”：小的 × 倍数。' : '画线段图：小的 1 格，大的几格，一共几格就除以几。', en: 'Draw a bar model.' } });
  const mdPics = [[9, 8, '🍭', '棒棒糖'], [7, 6, '🧁', '纸杯蛋糕'], [9, 6, '🌸', '花'], [6, 7, '🍎', '苹果'], [9, 4, '🪑', '椅子']];
  const fams = [[8, 9, false], [7, 5, false], [9, 3, false], [6, 10, false], [4, 7, true], [10, 8, true], [9, 6, true], [7, 9, true]];
  const words = [
    W('l3-5-8-A1', 'Samantha bought 6 bags of oranges. There were 8 oranges in each bag. How many oranges did she buy altogether?', 'Samantha 买了 6 袋橙子，每袋 8 个。她一共买了几个？', { kind: 'mul', a: 6, b: 8 }, Sn('She bought ___ oranges altogether.', '她一共买了 ___ 个橙子。')),
    W('l3-5-8-A2', 'Jacky has 42 stickers. He shares these stickers with another 6 friends. How many stickers does each of them have?', 'Jacky 有 42 张贴纸，和另外 6 个朋友平分（一共 7 人）。每人几张？', { kind: 'div', total: 42, by: 7, how: 'share' }, Sn('Each of them has ___ stickers.', '每人 ___ 张。')),
    W('l3-5-8-A3', 'There are 9 slices of bread on a tray. There are twice as many slices of cheese as bread on the tray. How many slices of cheese are there on the tray?', '托盘上有 9 片面包，奶酪片是面包的 2 倍。奶酪有几片？', { kind: 'times', base: { label: 'bread', v: 9 }, other: { label: 'cheese' }, k: 2 }, Sn('There are ___ slices of cheese on the tray.', '奶酪有 ___ 片。')),
    W('l3-5-8-A4', 'There are 40 cars and vans at a car park. If there are 4 times as many cars as vans, how many vans are there at the car park?', '停车场有 40 辆轿车和货车。轿车是货车的 4 倍，货车有几辆？', { kind: 'units', total: 40, k: 4, big: { label: 'cars' }, small: { label: 'vans' } }, Sn('There are ___ vans at the car park.', '货车有 ___ 辆。')),
    W('l3-5-8-A5', 'A group of people are going to the zoo by car. They need 7 cars altogether. If 5 people sit in each car, how many people are there in the group?', '一群人坐车去动物园，一共要 7 辆车，每辆坐 5 人。一共几人？', { kind: 'mul', a: 7, b: 5 }, Sn('There are ___ people in the group.', '一共 ___ 人。')),
    W('l3-5-8-A6', 'A fruiterer packs 36 apples equally into some baskets. If there are 4 apples in each basket, how many baskets of apples are there?', '水果商把 36 个苹果平均装进篮子，每篮 4 个。有几篮？', { kind: 'div', total: 36, by: 4, how: 'group' }, Sn('There are ___ baskets of apples.', '有 ___ 篮。')),
    W('l3-5-8-A7', 'Alden has 6 bottle caps. Byron has 5 times as many bottle caps as Alden. How many bottle caps does Byron have?', 'Alden 有 6 个瓶盖，Byron 是他的 5 倍。Byron 有几个？', { kind: 'times', base: { label: 'Alden', v: 6 }, other: { label: 'Byron' }, k: 5 }, Sn('Byron has ___ bottle caps.', 'Byron 有 ___ 个。')),
    W('l3-5-8-A8', 'Mrs Fields bakes 28 cookies and muffins. If she bakes 3 times as many cookies as muffins, how many muffins does she bake?', 'Fields 太太烤了 28 个饼干和松饼，饼干是松饼的 3 倍。松饼几个？', { kind: 'units', total: 28, k: 3, big: { label: 'cookies' }, small: { label: 'muffins' } }, Sn('She bakes ___ muffins.', '松饼 ___ 个。')),
    W('l3-5-8-A9', 'Susan uses 9 buttons to sew a dress. How many buttons does she use to sew 9 such dresses?', 'Susan 缝一条裙子用 9 颗扣子。缝 9 条要几颗？', { kind: 'mul', a: 9, b: 9 }, Sn('She uses ___ buttons.', '要 ___ 颗。')),
    W('l3-5-8-A10', 'Mrs Arnold bought 64 apples. She put them equally into 8 bags. How many apples were there in each bag?', 'Arnold 太太买了 64 个苹果，平均装进 8 个袋子。每袋几个？', { kind: 'div', total: 64, by: 8, how: 'share' }, Sn('There were ___ apples in each bag.', '每袋 ___ 个。')),
    W('l3-5-8-A11', 'Stephanie saves $8 in a day. How much does she save in a week?', 'Stephanie 一天存 $8。一周存多少？', { kind: 'mul', a: 7, b: 8, unit: '$' }, Sn('She saves $___ in a week.', '一周存 $___。')),
    W('l3-5-8-A12', 'There are 54 patrons in a cinema. If there are 5 times as many adults as children, how many children are there in the cinema?', '电影院有 54 位观众，成人是儿童的 5 倍。儿童几人？', { kind: 'units', total: 54, k: 5, big: { label: 'adults' }, small: { label: 'children' } }, Sn('There are ___ children in the cinema.', '儿童 ___ 人。')),
    W('l3-5-8-A13', '10 volleyball teams compete in a tournament. If there are 6 players in each volleyball team, how many players are there altogether?', '10 支排球队比赛，每队 6 人。一共几人？', { kind: 'mul', a: 10, b: 6 }, Sn('There are ___ players altogether.', '一共 ___ 人。')),
    W('l3-5-8-A14', 'Mr Daniels packs 80 pens equally into boxes. If there are 10 pens in each box, how many boxes does Mr Daniels use?', 'Daniels 先生把 80 支笔平均装盒，每盒 10 支。用了几个盒子？', { kind: 'div', total: 80, by: 10, how: 'group' }, Sn('Mr Daniels uses ___ boxes.', '用了 ___ 个盒子。')),
    W('l3-5-8-A15', 'There are 9 houses along a road. If there are 3 times as many trees as houses, how many trees are there along the road?', '路边有 9 座房子，树是房子的 3 倍。有几棵树？', { kind: 'times', base: { label: 'houses', v: 9 }, other: { label: 'trees' }, k: 3 }, Sn('There are ___ trees along the road.', '有 ___ 棵树。')),
    W('l3-5-8-A16', 'Caleb and Dora collect 24 seashells from the beach. If Dora collects twice as many seashells as Caleb, how many seashells does Caleb collect?', 'Caleb 和 Dora 一共捡了 24 个贝壳，Dora 是 Caleb 的 2 倍。Caleb 捡了几个？', { kind: 'units', total: 24, k: 2, big: { label: 'Dora' }, small: { label: 'Caleb' } }, Sn('Caleb collects ___ seashells.', 'Caleb 捡了 ___ 个。')),
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
    {
      id: 'l3-5-7', available: true,
      title: { zh: '乘除法一家', en: 'Write multiplication and division sentences' },
      intro: { zh: '一幅图可以写两个乘法算式和两个除法算式：9 × 8 = 72，8 × 9 = 72，72 ÷ 9 = 8，72 ÷ 8 = 9。', en: 'Each picture gives two multiplication and two division sentences.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '看图写两个乘法两个除法', en: 'Study the pictures carefully. Write two multiplication and division sentences for each picture' },
          example: { kind: 'factfam', n: { a: 3, b: 6, emoji: '🍪' }, title: { zh: '3 × 6 = 18，6 × 3 = 18，18 ÷ 3 = 6，18 ÷ 6 = 3', en: 'Fact family of 3, 6, 18' } },
          questions: mdPics.map(([g, e, emoji, noun], i) => qmd(`l3-5-7-A${i + 1}`, g, e, emoji, noun)) },
        { id: 'B', type: 'fill', title: { zh: '完成乘除法算式', en: 'Complete the multiplication and division equations' },
          example: { kind: 'factfam', n: { a: 9, b: 2 }, title: { zh: '9 × 2 = 18，2 × 9 = 18，18 ÷ 2 = 9，18 ÷ 9 = 2', en: 'Fact family of 9, 2, 18' } },
          questions: fams.map(([a, b, front], i) => qfam(`l3-5-7-B${i + 1}`, a, b, front)) },
      ],
    },
    {
      id: 'l3-5-8', available: true,
      title: { zh: '乘除法应用题', en: 'Solve word problems related to multiplication and division' },
      intro: { zh: '几个几 → 乘法；平均分 → 除法；“是它的几倍 / times as many” → 小的 × 倍数；“两个一共多少，大的是小的几倍，求小的” → 画线段图，小的 1 格，大的几格，一共几格就除以几。', en: 'Groups → multiply. Share equally → divide. "times as many" → draw units.' },
      sections: [
        { id: 'A', type: 'word', title: { zh: '应用题', en: 'Do these word problems. Show your working clearly' },
          example: { kind: 'l3mdword', n: { en: 'Stacey and Stella have 27 coloured beads. If Stacey has twice as many coloured beads as Stella, how many coloured beads does Stella have?', zh: 'Stacey 和 Stella 一共有 27 颗彩珠，Stacey 是 Stella 的 2 倍。Stella 有几颗？', model: { kind: 'units', total: 27, k: 2, big: { label: 'Stacey' }, small: { label: 'Stella' } }, sentence: Sn('Stella has ___ coloured beads.', 'Stella 有 ___ 颗。') }, title: { zh: '3 units → 27，1 unit → 9', en: '27 ÷ 3 = 9' } },
          questions: words },
      ],
    },
  ]);
})();
