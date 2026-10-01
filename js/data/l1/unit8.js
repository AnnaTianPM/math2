/* Level 1 · Unit 8  20 以内的加减法 */
(function () {
  const U = window.MATH_DATA.levels[1].units;
  const unit = num => U.find(u => u.num === num);
  const L = window.L1;
  const pic = html => `<div class="center">${html}</div>`;
  const F = (id, p, text, fields, explain, zh, en, o) => Object.assign({ id, type: 'fill', pic: p, label: text.replace(/\{\{\w+\}\}/g, '___').replace(/\n/g, ' '), prompt: { zh, en: en || 'Fill in the blanks' }, text, fields, answerText: Object.values(fields).map(f => f.a).join(', '), explain }, o || {});
  const wp = (en, zh) => `<div class="wp-text"><div class="wp-en">${en}</div><div class="wp-zh">${zh}</div></div>`;
  const B = (id, w, a, b, blank, p, explain, o) => Object.assign({ id, type: 'bond', w, a, b, blank, pic: p, explain, label: `${w} ← ${a} , ${b}` }, o || {});
  const frames = (icon, a, b) => pic(`<div class="frames2">${L.frame(icon, a)}<span class="bond-plus">＋</span>${L.frame(icon, b)}</div>`);
  const groups = (icon, a, b) => pic(`<div class="bond-groups">${L.row(icon, a)}<span class="bond-plus">＋</span>${L.row(icon, b)}</div>`);
  const strip = (from, to, circle) => pic(L.strip({ from, to, circle }));

  const onA = [['🐱', 12, 4], ['⚽', 9, 8], ['📎', 11, 8], ['🪁', 13, 7], ['🐢', 14, 4], ['🥭', 8, 8]];
  const onB = [[7, 6], [10, 5], [12, 7], [8, 4], [13, 5], [14, 6], [9, 7], [11, 9], [15, 4], [10, 7]];
  const m10A = [['🟦', 9, 9], ['⚪', 6, 6], ['🔻', 8, 5], ['🔶', 7, 4], ['🔺', 9, 7]];
  const m10B = [['👧', 8, 3], ['🍦', 8, 7], ['📌', 9, 8], ['☕', 11, 5], ['🐰', 12, 8]];
  const m10C = [['🍬', 8, 4, 'small'], ['🍌', 7, 7, 'small'], ['🎒', 9, 5, 'small'], ['🐶', 11, 4, 'big'], ['🍇', 12, 5, 'big']];
  const m10D = [[8, 8, 'small'], [9, 6, 'small'], [13, 4, 'big'], [15, 3, 'big'], [5, 14, 'big']];
  const addE = [[8, 6], [5, 7], [6, 11], [13, 2], [12, 6], [9, 11], [5, 8], [7, 9], [4, 15], [17, 3]];
  const backA = [['🐦', 16, 5], ['🧢', 18, 8], ['🏺', 20, 3], ['🍓', 19, 6], ['🎀', 17, 5], ['⏰', 14, 4], ['📕', 20, 7], ['🪮', 19, 3]];
  const backB = [[15, 2], [19, 7], [16, 6], [20, 5], [14, 3], [18, 4], [17, 1], [16, 4], [20, 9], [19, 5]];
  const s10A = [['🟦', 12, 4], ['⚪', 15, 8], ['🔻', 17, 9], ['🔶', 13, 7], ['🔺', 11, 2]];
  const s10B = [['🌰', 13, 9], ['🥄', 16, 8], ['🔒', 17, 7], ['🐟', 18, 5], ['🥪', 20, 6]];
  const s10C = [['🎈', 12, 3], ['🏺', 11, 7], ['🍈', 15, 9], ['🐌', 18, 6], ['🍊', 19, 8]];
  const s10D = [[12, 7], [14, 8], [16, 6], [18, 3], [20, 4]];
  const subE = [[16, 9], [11, 8], [15, 3], [19, 2], [20, 5], [19, 3], [18, 7], [16, 7], [12, 6], [15, 5]];
  const words = [
    ['Mike colours 6 stars blue. He colours 7 stars red. How many stars does Mike colour altogether?', 'Mike 把 6 颗星星涂成蓝色，7 颗涂成红色。他一共涂了几颗？', 6, 7, '+', 'Mike colours ___ stars altogether.'],
    ['Peter has 15 toy cars. Ben has 8 toy cars. How many more toy cars does Peter have than Ben?', 'Peter 有 15 辆玩具车，Ben 有 8 辆。Peter 比 Ben 多几辆？', 15, 8, '-', 'Peter has ___ more toy cars than Ben.'],
    ['Sarah bought 4 flowers on Monday. She bought 10 flowers on Tuesday. How many flowers did Sarah buy in two days?', 'Sarah 星期一买了 4 朵花，星期二买了 10 朵。两天一共买了几朵？', 4, 10, '+', 'Sarah bought ___ flowers in two days.'],
    ['Tricia folds 16 paper stars. She gives 8 paper stars to her friend. How many paper stars has Tricia left?', 'Tricia 折了 16 颗纸星星，送给朋友 8 颗。她还剩几颗？', 16, 8, '-', 'Tricia has ___ paper stars left.'],
    ['David reads 12 pages of a book before lunch. He reads another 7 pages after lunch. How many pages does David read altogether?', 'David 午饭前读了 12 页书，午饭后又读了 7 页。他一共读了几页？', 12, 7, '+', 'David reads ___ pages altogether.'],
    ['Alan has 20 blue and red marker pens. 8 of them are blue. How many red marker pens are there?', 'Alan 有 20 支蓝色和红色的记号笔，其中 8 支是蓝色的。红色的有几支？', 20, 8, '-', 'There are ___ red marker pens.'],
    ['There are 14 vehicles in a car park. 6 more vehicles enter the car park. How many vehicles are there in the car park now?', '停车场有 14 辆车，又进来 6 辆。现在停车场有几辆车？', 14, 6, '+', 'There are ___ vehicles in the car park now.'],
    ['A fishmonger has 17 fish. He sells some fish. He has 6 fish left. How many fish are sold?', '鱼贩有 17 条鱼，卖掉一些后还剩 6 条。卖掉了几条？', 17, 6, '-', '___ fish are sold.'],
  ];

  unit(8).kps = [
    {
      id: 'l1-8-1', available: true,
      title: { zh: '往后数做加法', en: 'Add by counting on' },
      intro: { zh: '从大的数开始，往后数小的数那么多个，停在哪就是答案。可以用数字条帮忙。', en: 'Start from the bigger number and count on. A number strip helps.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '看图往后数', en: 'Count on and fill in each blank with the correct answer' },
          example: { kind: 'l1counton', n: { a: 8, b: 5, icon: '🍓' }, title: { zh: '8 + 5：从 8 数，9、10、11、12、13', en: '8 + 5 = 13' } },
          questions: onA.map(([icon, a, b], i) => F(`l1-8-1-A${i + 1}`, groups(icon, a, b), `${a} + ${b} = {{s}}`, { s: { a: a + b } }, ['l1counton', { a, b, icon }], `从 ${a} 往后数 ${b} 个`, `Count on from ${a}`, { label: `${a} + ${b} = ${a + b}`, hint: { zh: `${a} 后面：${Array.from({ length: b }, (_, k) => a + k + 1).join('、')}。`, en: `Count on ${b}.` } })) },
        { id: 'B', type: 'fill', title: { zh: '数字条上往后数', en: 'Circle the answer on the number strip. Fill in each blank' },
          example: { kind: 'l1strip', n: { a: 11, b: 3, op: '+' }, title: { zh: '11 + 3：圈 11，往后跳 3 格', en: '11 + 3 = 14' } },
          questions: onB.map(([a, b], i) => F(`l1-8-1-B${i + 1}`, strip(a, 20, [a]), `${a} + ${b} = {{s}}`, { s: { a: a + b } }, ['l1strip', { a, b, op: '+' }], `从 ${a} 往后跳 ${b} 格，停在几？`, `Count on ${b} from ${a}`, { label: `${a} + ${b} = ${a + b}`, hint: { zh: `从 ${a} 开始一格一格数 ${b} 格。`, en: `${b} hops.` } })) },
      ],
    },
    {
      id: 'l1-8-2', available: true,
      title: { zh: '凑十法做加法', en: 'Add by making 10' },
      intro: { zh: '把一个数拆开，先给另一个数凑成 10，再加剩下的。10 加几很好算。', en: 'Split one number to make 10 with the other, then add the rest.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '十格图凑十', en: 'Make 10 using the ten-frames. Fill in each blank' },
          example: { kind: 'l1make10', n: { a: 7, b: 6, icon: '🔵' }, title: { zh: '7 + 6：6 拆成 3 和 3，7 + 3 = 10，10 + 3 = 13', en: '7 + 6 = 10 + 3 = 13' } },
          questions: m10A.map(([icon, a, b], i) => F(`l1-8-2-A${i + 1}`, frames(icon, a, b), `${a} + ${b} = 10 + {{r}}\n= {{s}}`, { r: { a: a + b - 10 }, s: { a: a + b } }, ['l1make10', { a, b, icon }], `把右边的搬几个过去填满 10，还剩几个？`, 'Make 10 first', { label: `${a} + ${b} = 10 + ${a + b - 10} = ${a + b}`, hint: { zh: `${Math.max(a, b)} 差 ${10 - Math.max(a, b)} 到 10，从另一边搬 ${10 - Math.max(a, b)} 个。`, en: `Move ${10 - Math.max(a, b)} over.` } })) },
        { id: 'B', type: 'fill', title: { zh: '看图凑十', en: 'Circle to make 10. Fill in each blank' },
          example: { kind: 'l1make10', n: { a: 6, b: 5, icon: '🍎' }, title: { zh: '6 + 5 = 10 + 1 = 11', en: '6 + 5 = 10 + 1 = 11' } },
          questions: m10B.map(([icon, a, b], i) => F(`l1-8-2-B${i + 1}`, groups(icon, a, b), `${a} + ${b} = 10 + {{r}}\n= {{s}}`, { r: { a: a + b - 10 }, s: { a: a + b } }, [a > 10 ? 'l1make10big' : 'l1make10', { a, b, icon }], '先圈 10 个，剩下几个？', 'Circle 10 first', { label: `${a} + ${b} = 10 + ${a + b - 10} = ${a + b}`, hint: { zh: '圈出 10 个，数圈外的。', en: 'Circle 10, count the rest.' } })) },
        { id: 'C', type: 'bond', title: { zh: '用数字组合凑十', en: 'Use number bonds to make 10. Fill in each blank' },
          example: { kind: 'l1make10big', n: { a: 12, b: 3 }, title: { zh: '12 + 3：12 = 10 + 2，10 + 2 + 3 = 15', en: '12 + 3 = 10 + 2 + 3 = 15' } },
          questions: m10C.map(([icon, a, b, which], i) => { const split = which === 'small' ? b : a, p1 = which === 'small' ? 10 - a : 10, p2 = split - p1;
            return B(`l1-8-2-C${i + 1}`, split, p1, p2, ['a', 'b'], groups(icon, a, b), [which === 'small' ? 'l1make10' : 'l1make10big', { a, b, icon }], { text: `${a} + ${b} = 10 + {{r}}\n= {{s}}`, fields: { r: { a: a + b - 10 }, s: { a: a + b } }, anyOrder: false, label: `${a} + ${b}：${split} 拆成 ${p1} 和 ${p2}`, prompt: { zh: which === 'small' ? `把 ${b} 拆成两部分，一部分给 ${a} 凑成 10` : `把 ${a} 拆成 10 和几`, en: 'Split to make 10.' }, hint: { zh: which === 'small' ? `${a} 差 ${10 - a} 到 10，所以 ${b} 拆成 ${10 - a} 和 ${b - (10 - a)}。` : `${a} = 10 + ${a - 10}。`, en: 'Make 10.' } }); }) },
        { id: 'D', type: 'bond', title: { zh: '拆数凑十', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'l1make10', n: { a: 9, b: 4 }, title: { zh: '9 + 4：4 拆成 1 和 3，9 + 1 = 10，10 + 3 = 13', en: '9 + 4 = 13' } },
          questions: m10D.map(([a, b, which], i) => { const big = Math.max(a, b), small = Math.min(a, b); const split = which === 'small' ? small : big, p1 = which === 'small' ? 10 - big : 10, p2 = split - p1;
            return B(`l1-8-2-D${i + 1}`, split, p1, p2, ['a', 'b'], '', [which === 'small' ? 'l1make10' : 'l1make10big', { a, b }], { text: `${a} + ${b} = {{s}}`, fields: { s: { a: a + b } }, anyOrder: false, label: `${a} + ${b} = ${a + b}`, prompt: { zh: which === 'small' ? `把 ${small} 拆开，先给 ${big} 凑 10，再算和` : `把 ${big} 拆成 10 和几，再算和`, en: 'Split and make 10.' }, hint: { zh: which === 'small' ? `${big} + ${10 - big} = 10，10 + ${small - (10 - big)} = ${a + b}。` : `${big - 10} + ${small} = ${big - 10 + small}，10 + ${big - 10 + small} = ${a + b}。`, en: 'Make 10.' } }); }) },
        { id: 'E', type: 'fill', title: { zh: '加法练习', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'l1make10', n: { a: 8, b: 6 }, title: { zh: '8 + 6 = 14', en: '8 + 6 = 14' } },
          questions: addE.map(([a, b], i) => F(`l1-8-2-E${i + 1}`, '', `${a} + ${b} = {{s}}`, { s: { a: a + b } }, [Math.max(a, b) > 10 ? 'l1make10big' : 'l1make10', { a, b }], `${a} 加 ${b} 是几？`, undefined, { label: `${a} + ${b} = ${a + b}`, hint: { zh: Math.max(a, b) > 10 ? `${Math.max(a, b)} 拆成 10 和 ${Math.max(a, b) - 10}。` : `先凑 10。`, en: 'Make 10.' } })) },
      ],
    },
    {
      id: 'l1-8-3', available: true,
      title: { zh: '往回数做减法', en: 'Subtract by counting back' },
      intro: { zh: '从大的数开始往回数，减几就往回数几个。', en: 'Start from the bigger number and count back.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '看图往回数', en: 'Count back and fill in each blank with the correct answer' },
          example: { kind: 'l1countback', n: { icon: '🐢', a: 15, b: 4 }, title: { zh: '15 − 4：从 15 往回数 4 个', en: '15 − 4 = 11' } },
          questions: backA.map(([icon, a, b], i) => F(`l1-8-3-A${i + 1}`, pic(L.row(icon, a)), `${a} − ${b} = {{d}}`, { d: { a: a - b } }, ['l1countback', { icon, a, b }], `一共 ${a} 个，往回数 ${b} 个`, `Count back ${b} from ${a}`, { label: `${a} − ${b} = ${a - b}`, hint: { zh: `从 ${a} 往回：${Array.from({ length: b }, (_, k) => a - k - 1).join('、')}。`, en: `Count back ${b}.` } })) },
        { id: 'B', type: 'fill', title: { zh: '数字条上往回数', en: 'Circle the answer on the number strip. Fill in each blank' },
          example: { kind: 'l1strip', n: { a: 13, b: 3, op: '-' }, title: { zh: '13 − 3：圈 13，往回跳 3 格', en: '13 − 3 = 10' } },
          questions: backB.map(([a, b], i) => F(`l1-8-3-B${i + 1}`, strip(Math.max(1, a - 12), a, [a]), `${a} − ${b} = {{d}}`, { d: { a: a - b } }, ['l1strip', { a, b, op: '-' }], `从 ${a} 往回跳 ${b} 格，停在几？`, `Count back ${b} from ${a}`, { label: `${a} − ${b} = ${a - b}`, hint: { zh: `从 ${a} 往回一格一格数 ${b} 格。`, en: `${b} hops back.` } })) },
      ],
    },
    {
      id: 'l1-8-4', available: true,
      title: { zh: '从 10 里减', en: 'Subtract from 10' },
      intro: { zh: '十几减几：把十几拆成 10 和几，先从 10 里减，再把剩下的加回去。', en: 'Split the teen number into 10 and ones. Subtract from 10, then add the ones back.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '十格图里减', en: 'Cross out from the full ten-frame. Fill in each blank' },
          example: { kind: 'l1sub10', n: { a: 11, b: 6, icon: '🔵' }, title: { zh: '11 − 6：10 − 6 = 4，4 + 1 = 5', en: '11 − 6 = 5' } },
          questions: s10A.map(([icon, a, b], i) => F(`l1-8-4-A${i + 1}`, frames(icon, 10, a - 10), `${a} − ${b}：10 − ${b} = {{x}}\n{{y}} + ${a - 10} = {{z}}`, { x: { a: 10 - b }, y: { a: 10 - b }, z: { a: a - b } }, ['l1sub10', { a, b, icon }], `先从满的 10 里划掉 ${b} 个，再加上右边的 ${a - 10} 个`, 'Subtract from 10 first', { label: `${a} − ${b} = ${a - b}`, hint: { zh: `10 − ${b} = ${10 - b}，${10 - b} + ${a - 10} = ${a - b}。`, en: `10 − ${b} first.` } })) },
        { id: 'B', type: 'fill', title: { zh: '看图从 10 里减', en: 'Circle 10 and subtract. Fill in each blank' },
          example: { kind: 'l1sub10', n: { a: 14, b: 7, icon: '🚗' }, title: { zh: '14 − 7：10 − 7 = 3，3 + 4 = 7', en: '14 − 7 = 7' } },
          questions: s10B.map(([icon, a, b], i) => F(`l1-8-4-B${i + 1}`, groups(icon, 10, a - 10), `${a} − ${b} = {{d}}`, { d: { a: a - b } }, ['l1sub10', { a, b, icon }], `圈出 10 个，从 10 里减 ${b}，再加剩下的`, 'Subtract from 10', { label: `${a} − ${b} = ${a - b}`, hint: { zh: `10 − ${b} = ${10 - b}，再加 ${a - 10}。`, en: `10 − ${b}, then add ${a - 10}.` } })) },
        { id: 'C', type: 'bond', title: { zh: '用数字组合减', en: 'Use number bonds. Fill in each blank' },
          example: { kind: 'l1sub10', n: { a: 16, b: 5, icon: '🐞' }, title: { zh: '16 = 10 和 6；10 − 5 = 5，5 + 6 = 11', en: '16 − 5 = 11' } },
          questions: s10C.map(([icon, a, b], i) => B(`l1-8-4-C${i + 1}`, a, 10, a - 10, ['a', 'b'], groups(icon, 10, a - 10), ['l1sub10', { a, b, icon }], { text: `${a} − ${b} = {{d}}`, fields: { d: { a: a - b } }, label: `${a} − ${b} = ${a - b}`, prompt: { zh: `把 ${a} 拆成 10 和几，再算 ${a} − ${b}`, en: `Split ${a} into 10 and ones.` }, hint: { zh: `10 − ${b} = ${10 - b}，${10 - b} + ${a - 10} = ${a - b}。`, en: 'Subtract from 10.' } })) },
        { id: 'D', type: 'bond', title: { zh: '拆数再减', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'l1sub10', n: { a: 13, b: 5 }, title: { zh: '13 − 5：10 − 5 = 5，5 + 3 = 8', en: '13 − 5 = 8' } },
          questions: s10D.map(([a, b], i) => B(`l1-8-4-D${i + 1}`, a, 10, a - 10, ['a', 'b'], '', [a - 10 >= b ? 'l1subbig' : 'l1sub10', { a, b }], { text: `${a} − ${b} = {{d}}`, fields: { d: { a: a - b } }, label: `${a} − ${b} = ${a - b}`, prompt: { zh: `把 ${a} 拆成 10 和几，再减 ${b}`, en: 'Split into 10 and ones.' }, hint: { zh: a - 10 >= b ? `${a - 10} − ${b} = ${a - 10 - b}，10 + ${a - 10 - b}。` : `10 − ${b} = ${10 - b}，加 ${a - 10}。`, en: 'Use the 10.' } })) },
        { id: 'E', type: 'fill', title: { zh: '减法练习', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'l1sub10', n: { a: 17, b: 8 }, title: { zh: '17 − 8 = 9', en: '17 − 8 = 9' } },
          questions: subE.map(([a, b], i) => F(`l1-8-4-E${i + 1}`, '', `${a} − ${b} = {{d}}`, { d: { a: a - b } }, [a - 10 >= b ? 'l1subbig' : 'l1sub10', { a, b }], `${a} 减 ${b} 是几？`, undefined, { label: `${a} − ${b} = ${a - b}`, hint: { zh: `${a} = 10 + ${a - 10}。`, en: 'Use the 10.' } })) },
      ],
    },
    {
      id: 'l1-8-5', available: true,
      title: { zh: '应用题', en: 'Solve one-step story sums' },
      intro: { zh: '合起来、一共、又来了 → 加；剩下、拿走、多多少 → 减。', en: 'Altogether / more come: add. Left / give away / how many more: subtract.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '读题写算式', en: 'Do these story sums carefully. Show your working clearly' },
          example: { kind: 'l1wordpm', n: { en: 'Karen has 8 dolls. Her mother gives her 6 more dolls. How many dolls does Karen have now?', zh: 'Karen 有 8 个娃娃，妈妈又给了她 6 个。她现在有几个？', a: 8, b: 6, op: '+', sentence: 'Karen has ___ dolls now.' }, title: { zh: '8 + 6 = 14', en: '8 + 6 = 14' } },
          questions: words.map(([en, zh, a, b, op, sent], i) => F(`l1-8-5-A${i + 1}`, wp(en, zh), `{{x}} ${op === '+' ? '+' : '−'} {{y}} = {{z}}\n${sent.replace('___', '{{d}}')}`, { x: { a }, y: { a: b }, z: { a: op === '+' ? a + b : a - b }, d: { a: op === '+' ? a + b : a - b } }, ['l1wordpm', { en, zh, a, b, op, sentence: sent }], op === '+' ? '两个数合起来，用加法' : '用减法', en, { accept: op === '+' ? [{ x: a, y: b, z: a + b, d: a + b }, { x: b, y: a, z: a + b, d: a + b }] : undefined, label: en, hint: { zh: `${a} ${op === '+' ? '+' : '−'} ${b}。`, en: `${a} ${op} ${b}.` } })) },
      ],
    },
  ];
})();
