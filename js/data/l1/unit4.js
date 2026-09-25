/* Level 1 · Unit 4  10 以内的减法 */
(function () {
  const U = window.MATH_DATA.levels[1].units;
  const unit = num => U.find(u => u.num === num);
  const L = window.L1;
  const pic = html => `<div class="center">${html}</div>`;
  const img = (name, w) => L.img('l1u4/' + name, w || 380);
  const F = (id, p, text, fields, explain, zh, en, o) => Object.assign({ id, type: 'fill', pic: p, label: text.replace(/\{\{\w+\}\}/g, '___').replace(/\n/g, ' '), prompt: { zh, en: en || 'Fill in the blanks' }, text, fields, answerText: Object.values(fields).map(f => f.a).join(', '), explain }, o || {});
  const wp = (en, zh) => `<div class="wp-text"><div class="wp-en">${en}</div><div class="wp-zh">${zh}</div></div>`;
  const eqBox = () => `<div class="eqline"><span class="eq-s">?</span> − <span class="eq-c">?</span> = <span class="eq-t">?</span></div>`;

  /* ---- 数据 ---- */
  const crossA = [['🍷', 10, 6], ['🐟', 8, 3], ['🌸', 9, 4], ['🚲', 6, 5], ['☕', 7, 1], ['🐭', 5, 0], ['🛞', 8, 5], ['🧢', 7, 3], ['🍦', 10, 7], ['🐞', 9, 2]];
  const crossB = [['🔺', 5, 3], ['🔻', 7, 0], ['🟪', 6, 4], ['🔶', 8, 2], ['⭐', 10, 4]];
  const leftC = [['books', 7, 3, 'books'], ['cars', 10, 5, 'toy cars'], ['pens', 5, 0, 'pens'], ['butterflies', 9, 2, 'butterflies'], ['dresses', 8, 4, 'dresses']];
  const onD = [[6, 1], [3, 2], [8, 6], [10, 4], [7, 5], [9, 5], [5, 4], [6, 3], [10, 2], [8, 1]];
  const backE = [[10, 5], [7, 1], [9, 2], [4, 3], [8, 4], [6, 2], [5, 1], [10, 3], [9, 6], [7, 2]];
  const bondF = [['melons', 6, 3, '西瓜 6 个、汉堡 3 个'], ['cups', 4, 4, '热的 4 杯、冷的 4 杯'], ['vase', 4, 2, '花瓶里 4 朵、地上 2 朵'], ['bears', 3, 5, '左边 3 只、右边 5 只'], ['eggs', 5, 5, '蛋盒里 5 个、打碎 5 个']];
  const bondG = [['phones', 10, 3, 'Mr Johnson has ___ telephones left.', '电话'], ['trains', 3, 1, '___ trains remained at the station.', '火车'], ['starfish', 7, 1, 'There are ___ starfish left.', '海星'], ['horses', 5, 2, 'There are ___ rocking horses left.', '摇摇马'], ['milk', 9, 5, 'There are ___ cartons of milk left.', '牛奶']];
  const storyA = [
    ['shapes', 6, 4, 'triangles and rectangles', 'triangles', 'rectangles', '三角形和长方形'],
    ['cats', 9, 3, 'cats', 'cats have ribbons', 'cats have no ribbons', '猫'],
    ['boys', 5, 2, 'boys', 'boys wear caps', 'boys do not wear caps', '男孩'],
    ['cakes', 10, 6, 'cakes', 'cakes have candles', 'cakes do not have candles', '蛋糕'],
    ['umbrellas', 7, 4, 'umbrellas', 'umbrellas are opened', 'umbrellas are closed', '雨伞'],
    ['desk', 9, 4, 'books', 'books are on the table', 'books are on the rack', '书'],
    ['flowers', 8, 7, 'stalks of flowers', 'stalks have bloomed', 'stalk has not bloomed', '花'],
    ['chests', 10, 8, 'chests', 'chests are closed', 'chests are opened', '宝箱'],
    ['hamsters', 6, 1, 'hamsters', 'hamster is awake', 'hamsters are asleep', '仓鼠'],
    ['bananas', 7, 0, 'bananas', 'bananas are peeled', 'bananas are not peeled', '香蕉'],
  ];
  const matchB = [[6, 2], [5, 0], [7, 4], [9, 9], [8, 1], [10, 2]], cheese = [8, 7, 0, 5, 4, 3];
  const fillC = [[2, 0], [7, 6], [9, 2], [5, 1], [6, 6], [4, 3], [10, 3], [8, 2], [10, 5], [9, 6]];
  const wordA = [
    ['Jean buys 10 red and green apples. 5 of the apples are green. How many red apples are there?', 'Jean 买了 10 个红苹果和绿苹果。其中 5 个是绿的。红苹果有几个？', 10, 5, 'There are ___ red apples.'],
    ['Ben has 5 toy aeroplanes. He gives 3 toy aeroplanes to his cousin. How many toy aeroplanes has Ben left?', 'Ben 有 5 架玩具飞机，送给表弟 3 架。Ben 还剩几架？', 5, 3, 'Ben has ___ toy aeroplanes left.'],
    ['There are 6 frogs on a rock. 3 frogs hop away. How many frogs are left?', '石头上有 6 只青蛙，跳走了 3 只。还剩几只？', 6, 3, '___ frogs are left.'],
    ['A teacher has 8 black and blue marker pens. 6 of the marker pens are black. How many blue marker pens are there?', '老师有 8 支黑色和蓝色的记号笔。其中 6 支是黑色的。蓝色的有几支？', 8, 6, 'There are ___ blue marker pens.'],
    ['There are 7 children. 3 of the children wear glasses. How many children do not wear glasses?', '有 7 个小朋友，其中 3 个戴眼镜。不戴眼镜的有几个？', 7, 3, '___ children do not wear glasses.'],
  ];
  const wordB = [
    ['There are 9 matchsticks in a matchbox. 5 matchsticks are used. How many matchsticks are left in the matchbox?', '火柴盒里有 9 根火柴，用掉了 5 根。盒里还剩几根？', 9, 5, '___ matchsticks are left in the matchbox.'],
    ['Hannah has 6 hamsters. She gives 4 hamsters to her brother. How many hamsters has Hannah left?', 'Hannah 有 6 只仓鼠，送给弟弟 4 只。Hannah 还剩几只？', 6, 4, 'Hannah has ___ hamsters left.'],
    ['There are 10 roses at a florist. 8 roses are sold. How many roses are there left at the florist?', '花店有 10 朵玫瑰，卖掉了 8 朵。花店还剩几朵？', 10, 8, 'There are ___ roses left at the florist.'],
    ['Peter has 7 cherries. He eats 2 cherries. How many cherries has Peter left?', 'Peter 有 7 颗樱桃，吃了 2 颗。还剩几颗？', 7, 2, 'Peter has ___ cherries left.'],
    ['8 children are playing in the park. 4 children go home for dinner. How many children are left in the park?', '8 个小朋友在公园玩，4 个回家吃晚饭了。公园里还剩几个？', 8, 4, '___ children are left in the park.'],
  ];
  const famA = [
    ['birds', 5, 2, 'birds on the branch', 'birds flown away', 'How many birds are on the branch?', 'How many birds have flown away?', 'How many birds are there in all?', '鸟'],
    ['hearts', 3, 6, 'hearts', 'stars', 'How many of the shapes are hearts?', 'How many of the shapes are stars?', 'How many shapes are there altogether?', '图形'],
    ['dogs', 4, 2, 'dogs playing', 'dogs sleeping', 'How many dogs are playing?', 'How many dogs are sleeping?', 'How many dogs are there in all?', '狗'],
    ['doors', 7, 3, 'doors closed', 'doors open', 'How many doors are closed?', 'How many doors are open?', 'How many doors are there altogether?', '门'],
    ['socks', 8, 0, 'good socks', 'torn socks', 'How many socks are good?', 'How many socks are torn?', 'How many socks are there altogether?', '袜子'],
  ];
  const famB = [['gifts', 5, 4, 'gifts with a bow', 'gifts without a bow', '礼物'], ['aircraft', 2, 3, 'helicopters', 'aeroplanes', '飞机'], ['trees', 6, 4, 'big trees', 'small trees', '树'], ['ducks', 1, 5, 'duck flying', 'ducks in the pond', '鸭子'], ['icecream', 5, 3, 'soft ice creams', 'ice creams in cones', '冰淇淋']];

  const cross = (id, icon, a, b, frame) => ({ id, type: 'crossout', icon, a, b, frame, label: `${a} − ${b} = ${a - b}（划掉 ${icon}）` });
  const bondQ = (id, w, a, b, blank, p, explain, o) => Object.assign({ id, type: 'bond', w, a, b, blank, pic: p, explain, label: `${w} ← ${a} , ${b}` }, o || {});

  unit(4).kps = [
    {
      id: 'l1-4-1', available: true,
      title: { zh: '减法：划掉、往后数、往回数、数字组合', en: 'Subtract by crossing out, counting on, counting back and using number bonds' },
      intro: { zh: '减法就是拿走一部分。可以划掉几个再数剩下的；也可以在数字条上从小数往后数到大数，数跳了几下；或者从大数往回数几下。', en: 'Subtract by crossing out, by counting on from the smaller number, or by counting back from the bigger number.' },
      sections: [
        { id: 'A', type: 'crossout', title: { zh: '划掉几个，写答案', en: 'Cross out the correct number of things in each set. Fill in each blank with the correct answer' },
          example: { kind: 'l1cross', n: { icon: '🦋', a: 5, b: 2 }, title: { zh: '5 只蝴蝶划掉 2 只：5 − 2 = 3', en: '5 − 2 = 3' } },
          questions: crossA.map(([icon, a, b], i) => cross(`l1-4-1-A${i + 1}`, icon, a, b)) },
        { id: 'B', type: 'crossout', title: { zh: '十格图里划掉图形', en: 'Cross out the correct number of shapes. Fill in each blank with the correct answer' },
          example: { kind: 'l1cross', n: { icon: '⚫', a: 4, b: 1 }, title: { zh: '4 个圆划掉 1 个：4 − 1 = 3', en: '4 − 1 = 3' } },
          questions: crossB.map(([icon, a, b], i) => cross(`l1-4-1-B${i + 1}`, icon, a, b, true)) },
        { id: 'C', type: 'fill', title: { zh: '还剩几个？', en: 'How many are left? Write the correct answers on the lines provided' },
          example: { kind: 'l1left', n: { icon: '🔺', a: 8, gone: 3, noun: 'triangles' }, title: { zh: '8 个三角划掉 3 个：8 − 3 = 5', en: '8 − 3 = 5 triangles left' } },
          questions: leftC.map(([name, a, gone, noun], i) => F(`l1-4-1-C${i + 1}`, pic(img(name, 400)), `{{a}} − {{b}} = {{c}}\nThere are {{d}} ${noun} left.`, { a: { a }, b: { a: gone }, c: { a: a - gone }, d: { a: a - gone } }, ['l1left', { pic: 'l1u4/' + name, icon: '', a, gone, noun }], `数一数一共几个、划掉几个，写减法算式`, 'Write the subtraction sentence', { label: `${noun}：${a} − ${gone} = ${a - gone}`, hint: { zh: `全部（包括划掉的）有 ${a} 个，划掉 ${gone} 个。`, en: `${a} in all, ${gone} crossed out.` } })) },
        { id: 'D', type: 'fill', title: { zh: '往后数做减法', en: 'Subtract these numbers by counting on. Use the numbers in the box below to help you count' },
          example: { kind: 'l1subon', n: { a: 9, b: 3 }, title: { zh: '9 − 3：从 3 数到 9 跳了 6 下', en: 'Count on from 3 and stop at 9: 9 − 3 = 6' } },
          questions: onD.map(([a, b], i) => F(`l1-4-1-D${i + 1}`, pic(L.strip({ circle: [a, b] })), `${a} − ${b} = {{x}}`, { x: { a: a - b } }, ['l1subon', { a, b }], `从 ${b} 往后数到 ${a}，跳了几下？`, `Count on from ${b} to ${a}`, { label: `${a} − ${b} = ${a - b}`, hint: { zh: `从 ${b} 开始一下一下往后跳，跳到 ${a} 停，数跳了几下。`, en: `Count on from ${b} to ${a}.` } })) },
        { id: 'E', type: 'fill', title: { zh: '往回数做减法', en: 'Subtract these numbers by counting back. Use the numbers in the box below to help you count' },
          example: { kind: 'l1subback', n: { a: 5, b: 2 }, title: { zh: '5 − 2：从 5 往回数 2 下停在 3', en: 'Count back from 5 and stop at 3: 5 − 2 = 3' } },
          questions: backE.map(([a, b], i) => F(`l1-4-1-E${i + 1}`, pic(L.strip({ circle: [a] })), `${a} − ${b} = {{x}}`, { x: { a: a - b } }, ['l1subback', { a, b }], `从 ${a} 往回数 ${b} 下，停在几？`, `Count back ${b} from ${a}`, { label: `${a} − ${b} = ${a - b}`, hint: { zh: `从 ${a} 往回跳 ${b} 下。`, en: `Count back ${b} from ${a}.` } })) },
        { id: 'F', type: 'bond', title: { zh: '看图填数字组合', en: 'Fill in the missing numbers in each number bond to show the parts and whole' },
          example: { kind: 'l1bond', n: { groups: [{ icon: '🐦', n: 2 }, { icon: '🐤', n: 6 }] }, title: { zh: '飞的 2 只、树上 6 只：8 分成 2 和 6', en: '2 and 6 make 8' } },
          questions: bondF.map(([name, a, b, zh], i) => bondQ(`l1-4-1-F${i + 1}`, a + b, a, b, ['w', 'a', 'b'], pic(img(name, 340)), ['l1bond', { groups: [{ icon: '🟠', n: a }, { icon: '🔵', n: b }] }], { label: zh, prompt: { zh: '图里有两组，小圈填每组几个，大圈填一共', en: 'Fill in the parts and the whole.' }, hint: { zh: zh + '。', en: 'Count each group.' } })) },
        { id: 'G', type: 'bond', title: { zh: '划掉的和剩下的', en: 'Study the pictures below and fill in the blanks with the correct answers' },
          example: { kind: 'l1subbond', n: { pic: 'l1u4/cars_ex', a: 4, gone: 3, noun: 'toy cars', sentence: 'Paul has ___ toy car left.' }, title: { zh: '4 辆车划掉 3 辆：4 分成 3 和 1，剩 1', en: '4 − 3 = 1 toy car left' } },
          questions: bondG.map(([name, a, gone, sent, zh], i) => bondQ(`l1-4-1-G${i + 1}`, a, gone, a - gone, ['w', 'a', 'b'], pic(img(name, 380)), ['l1subbond', { pic: 'l1u4/' + name, a, gone, noun: sent.replace(/.*___ /, '').replace(/ left\.|\.$/, ''), sentence: sent }], { text: sent.replace('___', '{{t}}'), fields: { t: { a: a - gone } }, label: `${zh}：${a} − ${gone} = ${a - gone}`, prompt: { zh: '大圈填全部，一个小圈填划掉的，另一个填剩下的，再填句子', en: 'Whole, crossed out, left.' }, hint: { zh: `全部 ${a} 个，划掉 ${gone} 个。`, en: `${a} in all, ${gone} crossed out.` } })) },
      ],
    },
    {
      id: 'l1-4-2', available: true,
      title: { zh: '减法算式和减法故事', en: 'Make subtraction equations and stories' },
      intro: { zh: '看图讲减法故事：一共几个，其中一种几个，减掉就是另一种。方框填整体，圆圈填减掉的，三角填剩下的。', en: 'Whole − one part = the other part. Square − circle = triangle.' },
      sections: [
        { id: 'A', type: 'bond', title: { zh: '看图讲减法故事', en: 'Look at the pictures and make subtraction stories' },
          example: { kind: 'l1substory', n: { pic: 'l1u4/girls_ex', w: 8, a: 3, la: 'girls have short hair', lb: 'girls have long hair', noun: 'girls' }, title: { zh: '8 个女孩，3 个短发：8 − 3 = 5 个长发', en: '8 − 3 = 5' } },
          questions: storyA.map(([name, w, a, noun, la, lb, zh], i) => bondQ(`l1-4-2-A${i + 1}`, w, a, w - a, ['w', 'a', 'b'], pic(img(name, 340)), ['l1substory', { pic: 'l1u4/' + name, w, a, la, lb, noun }], { text: `There are {{t1}} ${noun}.\n{{t2}} ${la}.\n{{s}} − {{c}} = {{tr}}\n{{t3}} ${lb}.`, fields: { t1: { a: w }, t2: { a }, s: { a: w }, c: { a }, tr: { a: w - a }, t3: { a: w - a } }, label: `${zh}：${w} − ${a} = ${w - a}`, prompt: { zh: `数一数${zh}，讲一个减法故事`, en: 'Make a subtraction story' }, hint: { zh: `一共 ${w}，${la} 是 ${a}。`, en: `${w} in all, ${a} ${la}.` } })) },
        { id: 'B', type: 'match', title: { zh: '老鼠找奶酪', en: 'Match each mouse to the correct cheese' },
          example: { kind: 'l1subback', n: { a: 6, b: 2 }, title: { zh: '6 − 2 = 4，连到 4 号奶酪', en: '6 − 2 = 4' } },
          questions: [{ id: 'l1-4-2-B1', type: 'match', label: '老鼠（算式）连奶酪（答案）', left: matchB.map(([a, b]) => ({ id: `${a}-${b}`, html: `🐭 ${a} − ${b}`, text: `${a}−${b}` })), right: cheese.map(n => ({ id: String(n), html: `🧀 ${n}`, text: String(n) })), pairs: Object.fromEntries(matchB.map(([a, b]) => [`${a}-${b}`, String(a - b)])), prompt: { zh: '每只老鼠身上有一个减法算式，算出来，连到写着答案的奶酪', en: 'Work out each subtraction and match it to the cheese.' }, hint: { zh: '每个算式都算一算，往回数或划掉。', en: 'Work out each one.' }, explain: ['l1subback', { a: 7, b: 4 }] }] },
        { id: 'C', type: 'fill', title: { zh: '减法填空', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'l1subon', n: { a: 8, b: 4 }, title: { zh: '8 − 4：从 4 数到 8 跳了 4 下', en: '8 − 4 = 4' } },
          questions: fillC.map(([a, b], i) => F(`l1-4-2-C${i + 1}`, '', `${a} − ${b} = {{x}}`, { x: { a: a - b } }, ['l1subon', { a, b }], `${a} 减 ${b} 是几？`, undefined, { label: `${a} − ${b} = ${a - b}`, hint: { zh: `从 ${b} 往后数到 ${a}，或从 ${a} 往回数 ${b} 下。`, en: `Count on from ${b} to ${a}.` } })) },
      ],
    },
    {
      id: 'l1-4-3', available: true,
      title: { zh: '一步减法应用题', en: 'Solve one-step subtraction story sums' },
      intro: { zh: '一共有几个，拿走 / 用掉 / 其中一部分是几个，问剩下多少或另一部分多少，就用减法。', en: '"Left", "how many are not", "the rest": subtract.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '写算式，写答句', en: 'Do these story sums carefully. Show your working clearly' },
          example: { kind: 'l1subword', n: { en: 'There are 6 packets of biscuits. Amanda eats 2 packets of biscuits. How many packets of biscuits are left?', zh: '有 6 包饼干，Amanda 吃了 2 包。还剩几包？', a: 6, b: 2, sentence: '___ packets of biscuits are left.' }, title: { zh: '6 − 2 = 4', en: '6 − 2 = 4' } },
          questions: wordA.map(([en, zh, a, b, sent], i) => F(`l1-4-3-A${i + 1}`, wp(en, zh), `{{s}} − {{c}} = {{t}}\n${sent.replace('___', '{{d}}')}`, { s: { a }, c: { a: b }, t: { a: a - b }, d: { a: a - b } }, ['l1subword', { en, zh, a, b, sentence: sent }], '读题，写减法算式，再填答句', en, { label: en, hint: { zh: `一共 ${a}，减去 ${b}。`, en: `${a} − ${b}.` } })) },
        { id: 'B', type: 'fill', title: { zh: '还剩多少？', en: 'How many are left? Write the correct answers on the lines provided' },
          example: { kind: 'l1subword', n: { en: 'There are 5 tomatoes in the fridge. 2 tomatoes are rotten and thrown away. How many tomatoes are there left in the fridge?', zh: '冰箱里有 5 个西红柿，2 个烂了扔掉。冰箱里还剩几个？', a: 5, b: 2, sentence: 'There are ___ tomatoes left in the fridge.' }, title: { zh: '5 − 2 = 3', en: '5 − 2 = 3' } },
          questions: wordB.map(([en, zh, a, b, sent], i) => F(`l1-4-3-B${i + 1}`, wp(en, zh), sent.replace('___', '{{d}}'), { d: { a: a - b } }, ['l1subword', { en, zh, a, b, sentence: sent }], '读题，算一算还剩多少', en, { label: en, hint: { zh: `${a} − ${b}。`, en: `${a} − ${b}.` } })) },
      ],
    },
    {
      id: 'l1-4-4', available: true,
      title: { zh: '算式家族', en: 'Make fact families' },
      intro: { zh: '三个数（两部分和整体）可以写 4 个算式：2 个加法、2 个减法，它们是一家人。', en: 'Two parts and a whole give two additions and two subtractions: a fact family.' },
      sections: [
        { id: 'A', type: 'bond', title: { zh: '看图写算式', en: 'Study the pictures below and fill in the blanks with the correct answers' },
          example: { kind: 'l1factfam', n: { a: 2, b: 3, la: 'standing pins', lb: 'fallen pins', noun: 'bowling pins' }, title: { zh: '2 个站着 3 个倒了：5 − 3 = 2，5 − 2 = 3，2 + 3 = 5', en: 'A fact family of 2, 3 and 5' } },
          questions: famA.map(([name, a, b, la, lb, q1, q2, q3, zh], i) => { const w = a + b;
            return bondQ(`l1-4-4-A${i + 1}`, w, a, b, ['w', 'a', 'b'], pic(img(name, 340)), ['l1factfam', { pic: 'l1u4/' + name, a, b, la, lb }], { text: `${q1}  {{p1}} − {{p2}} = {{p3}}\n${q2}  {{q1}} − {{q2}} = {{q3}}\n${q3}  {{r1}} + {{r2}} = {{r3}} or {{s1}} + {{s2}} = {{s3}}`, fields: { p1: { a: w }, p2: { a: b }, p3: { a }, q1: { a: w }, q2: { a }, q3: { a: b }, r1: { a }, r2: { a: b }, r3: { a: w }, s1: { a: b }, s2: { a }, s3: { a: w } }, accept: [{ p1: w, p2: b, p3: a, q1: w, q2: a, q3: b, r1: a, r2: b, r3: w, s1: b, s2: a, s3: w }, { p1: w, p2: b, p3: a, q1: w, q2: a, q3: b, r1: b, r2: a, r3: w, s1: a, s2: b, s3: w }], label: `${zh}：${a}、${b}、${w}`, prompt: { zh: `数一数${zh}，填数字组合，再回答三个问题（写算式）`, en: 'Fill in the number bond and write the equations.' }, hint: { zh: `${la} ${a}，${lb} ${b}，一共 ${w}。问一种就用 ${w} 减另一种。`, en: `${a} and ${b} make ${w}.` } }); }) },
        { id: 'B', type: 'fill', title: { zh: '写一个算式家族', en: 'Study each picture carefully. Write a fact family' },
          example: { kind: 'l1factfam', n: { a: 2, b: 6, la: 'shaded', lb: 'unshaded', noun: 'triangles' }, title: { zh: '2 + 6 = 8，6 + 2 = 8，8 − 6 = 2，8 − 2 = 6', en: 'A fact family of 2, 6 and 8' } },
          questions: famB.map(([name, a, b, la, lb, zh], i) => { const w = a + b; const alts = []; [[a, b], [b, a]].forEach(([x, y]) => [[b, a], [a, b]].forEach(([m, n]) => alts.push({ a1: x, a2: y, a3: w, b1: y, b2: x, b3: w, c1: w, c2: m, c3: w - m, d1: w, d2: n, d3: w - n })));
            return F(`l1-4-4-B${i + 1}`, pic(img(name, 400)), `{{a1}} + {{a2}} = {{a3}}　　{{c1}} − {{c2}} = {{c3}}\n{{b1}} + {{b2}} = {{b3}}　　{{d1}} − {{d2}} = {{d3}}`, { a1: { a }, a2: { a: b }, a3: { a: w }, b1: { a: b }, b2: { a }, b3: { a: w }, c1: { a: w }, c2: { a: b }, c3: { a }, d1: { a: w }, d2: { a }, d3: { a: b } }, ['l1factfam', { pic: 'l1u4/' + name, a, b, la, lb }], `数一数${zh}（两种各几个），写 2 个加法和 2 个减法`, 'Write a fact family', { accept: alts, label: `${zh}：${a}、${b}、${w}`, hint: { zh: `${la} ${a}，${lb} ${b}，一共 ${w}。加法两个数换位置；减法用 ${w} 减。`, en: `${a}, ${b} and ${w}.` } }); }) },
      ],
    },
  ];
})();
