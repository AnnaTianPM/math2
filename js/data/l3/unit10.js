/* Level 3 · Unit 10  长度、质量和体积 */
(function () {
  const U = window.MATH_DATA.levels[3].units;
  const unit = num => U.find(u => u.num === num);
  const L = window.L3;
  const num = a => ({ a });
  const F = (id, p, text, fields, explain, zh, en, o) => Object.assign({ id, type: 'fill', pic: p, label: text.replace(/\{\{\w+\}\}/g, '___').replace(/\n/g, ' '), prompt: { zh, en: en || 'Fill in the blanks' }, text, fields, answerText: Object.values(fields).map(f => f.a).join(', '), explain }, o || {});
  const wp = (en, zh) => `<div class="wp-text"><div class="wp-en">${en}</div><div class="wp-zh">${zh}</div></div>`;
  const S = (en, zh) => ({ en, zh });
  // 换算题
  const toSmall = (id, big, small, factor, bv, sv) => F(id, '', `${bv} ${big}${sv ? ` ${sv} ${small}` : ''}\n= {{a}} ${small} + {{b}} ${small}\n= {{c}} ${small}`, { a: num(bv * factor), b: num(sv), c: num(bv * factor + sv) }, ['l3conv', { big, small, factor, bv, sv, dir: 'toSmall' }], `${bv} ${big} ${sv} ${small} 是多少 ${small}？`, `Express in ${small === 'cm' ? 'centimetres' : small === 'm' ? 'metres' : small === 'g' ? 'grams' : 'millilitres'}`, { label: `${bv} ${big} ${sv} ${small} = ${bv * factor + sv} ${small}`, hint: { zh: `1 ${big} = ${factor} ${small}。`, en: `1 ${big} = ${factor} ${small}.` } });
  const toBig = (id, big, small, factor, total) => { const bv = Math.floor(total / factor), sv = total % factor; return F(id, '', `${total} ${small}\n= {{a}} ${small} + {{b}} ${small}\n= {{c}} ${big} {{d}} ${small}`, { a: num(bv * factor), b: num(sv), c: num(bv), d: num(sv) }, ['l3conv', { big, small, factor, bv, sv, dir: 'toBig' }], `${total} ${small} 是几 ${big} 几 ${small}？`, `Express in ${big} and ${small}`, { label: `${total} ${small} = ${bv} ${big} ${sv} ${small}`, hint: { zh: `先拆出整的 ${factor} ${small}。`, en: `1 ${big} = ${factor} ${small}.` } }); };

  const cmA = [[1, 10], [5, 5], [6, 56], [2, 92], [8, 8], [4, 3], [7, 89], [3, 40], [9, 45], [5, 11]];
  const cmB = [101, 710, 805, 978, 390, 521, 606, 759, 432, 212];
  const mC = [[1, 70], [6, 0], [9, 220], [5, 500], [7, 3], [9, 90], [3, 456], [2, 323], [1, 309], [8, 888]];
  const mD = [6830, 1000, 6592, 9225, 4050, 8003, 2006, 3100, 7707, 5055];
  const mapE = [['school', "John's house", 2700], ['market', 'shopping centre', 2350], ['shopping centre', 'library', 1500], ['market', "John's house", 1070], ['school', 'library', 1000]];
  const dials = [[5100, 6], [1800, 2], [2500, 6], [4300, 6], [2600, 4], [3900, 4]];
  const gA = [[1, 238], [3, 300], [9, 569], [5, 955], [7, 67], [6, 60], [4, 8], [8, 642], [2, 484], [3, 102]];
  const gB = [4820, 7997, 6606, 8009, 3033, 5115, 8780, 2200, 9090, 1001];
  const readA = [[[{ max: 500, level: 300 }], 300], [[{ max: 500, level: 500 }, { max: 500, level: 250 }], 750], [[{ max: 1000, level: 1000 }, { max: 500, level: 300 }], 1300], [[{ max: 1000, level: 1000 }, { max: 1000, level: 1000 }, { max: 100, level: 70 }], 2070], [[{ max: 100, level: 100 }, { max: 100, level: 100 }, { max: 500, level: 150 }], 350], [[{ max: 1000, level: 1000 }, { max: 500, level: 500 }, { max: 100, level: 90 }], 1590]];
  const drawB = [[100, 30], [100, 80], [500, 250], [500, 450], [1000, 200], [1000, 600]];
  const mlA = [[4, 368], [1, 11], [8, 818], [2, 202], [3, 8], [8, 96], [7, 478], [9, 9], [5, 555], [6, 330]];
  const mlB = [9909, 3100, 8702, 2000, 5015, 7007, 6060, 4044, 1100, 9898];

  const Sb = (whole, known, unk) => ({ kind: 'sub', whole: { label: whole[0], v: whole[1] }, known: { label: known[0], v: known[1] }, unknown: { label: unk } });
  const A = parts => ({ kind: 'add', parts: parts.map(([label, v]) => ({ label, v })) });
  const Cm = (base, other, diff, otherIs) => ({ kind: 'cmp', base: { label: base[0], v: base[1] }, other: { label: other }, diff, otherIs });
  const W = (id, en, zh, model, sentence, extra) => Object.assign({ id, type: 'word', en, zh, model, sentence, label: en.slice(0, 50) }, extra || {});
  // 答案要写成 big small 两个空的应用题
  const W2u = (id, en, zh, model, factor, big, small, sentEn, sentZh) => { const v = WordUI.answerOf({ model }); const bv = Math.floor(v / factor), sv = v % factor; return F(id, wp(en, zh), `${sentEn.replace('___', `{{a}} ${big} {{b}} ${small}`)}`, { a: num(bv), b: num(sv) }, ['word', { en, zh, model, sentence: S(sentEn.replace('___', `${v} ${small} = ___ ${big} ${sv} ${small}`), sentZh) }], `先算出 ${small}，再换成 ${big} 和 ${small}`, en, { label: en.slice(0, 50), hint: { zh: `算出来是 ${small}，再除以 ${factor} 换成 ${big}。`, en: `1 ${big} = ${factor} ${small}.` } }); };

  const words = [
    W('l3-10-5-A1', 'A pole is longer than a wooden plank by 88 cm. If the length of the pole is 325 cm, what is the length of the wooden plank?', '杆子比木板长 88 cm。杆子长 325 cm，木板多长？', Cm(['pole', 325], 'plank', 88, 'less'), S('The length of the wooden plank is ___ cm.', '木板长 ___ cm。')),
    W('l3-10-5-A2', 'A ribbon of length 840 cm is cut into 5 equal pieces. What is the length of each piece of ribbon?', '840 cm 的丝带平均剪成 5 段。每段多长？', { kind: 'div', total: 840, by: 5, how: 'share' }, S('The length of each piece of ribbon is ___ cm.', '每段 ___ cm。')),
    W('l3-10-5-A3', "Johnson's mass is 38 kg and Benson's mass is 37 kg. What is their total mass?", 'Johnson 38 kg，Benson 37 kg。两人一共多重？', A([['Johnson', 38], ['Benson', 37]]), S('Their total mass is ___ kg.', '一共 ___ kg。')),
    W2u('l3-10-5-A4', 'Susan mixed some flour with butter. The mixture had a mass of 3000 g. If she had used 900 g of butter, how much flour did she use? Express your answer in kilograms and grams.', 'Susan 把面粉和黄油混合，混合物 3000 g。黄油用了 900 g，面粉用了多少？用 kg 和 g 表示。', Sb(['mixture', 3000], ['butter', 900], 'flour'), 1000, 'kg', 'g', 'She used ___ of flour.', '面粉用了 ___。'),
    W('l3-10-5-A5', 'Mandy prepares 10 360 ml of bandung. If she uses 7900 ml of rose syrup, how much milk does she add?', 'Mandy 调了 10 360 ml 饮料，其中玫瑰糖浆 7900 ml。加了多少牛奶？', Sb(['bandung', 10360], ['rose syrup', 7900], 'milk'), S('She adds ___ ml of milk.', '加了 ___ ml 牛奶。')),
    W('l3-10-5-A6', 'Sharon fills her car up with petrol at the beginning of the week. Her car has a tank capacity of 40 l. How much petrol has she used up if there is 18 l of petrol left in her tank at the end of the week?', 'Sharon 周初加满油，油箱 40 l。周末剩 18 l，用了多少？', Sb(['tank', 40], ['left', 18], 'used'), S('She has used up ___ l of petrol.', '用了 ___ l。')),
    W('l3-10-5-A7', 'Mrs Drew bought a pack of biscuits. The mass of the pack of biscuits was 1800 g. She packed the biscuits into 3 equal bags. What was the mass of each bag of biscuits?', 'Drew 太太买了 1800 g 饼干，平均装进 3 袋。每袋多重？', { kind: 'div', total: 1800, by: 3, how: 'share' }, S('The mass of each bag of biscuits was ___ g.', '每袋 ___ g。')),
    W2u('l3-10-5-A8', 'Grace bought a dozen similar cans of orange juice. If the capacity of each can of orange juice was 550 ml, how much orange juice did she buy? Express your answer in litres and millilitres.', 'Grace 买了一打（12 罐）橙汁，每罐 550 ml。一共多少？用 l 和 ml 表示。', { kind: 'mul', a: 12, b: 550 }, 1000, 'l', 'ml', 'She bought ___ of orange juice.', '一共 ___。'),
    W2u('l3-10-5-A9', 'The total length of three sticks is 555 cm. If two of the sticks measure 272 cm in all, what is the length of the third stick? Express your answer in metres and centimetres.', '三根棍子一共 555 cm，其中两根一共 272 cm。第三根多长？用 m 和 cm 表示。', Sb(['three sticks', 555], ['two sticks', 272], 'third stick'), 100, 'm', 'cm', 'The length of the third stick is ___.', '第三根长 ___。'),
    W('l3-10-5-A10', 'A chair has a mass of 2700 g. A table has a mass of 3960 g. How much heavier is the table than the chair?', '椅子 2700 g，桌子 3960 g。桌子比椅子重多少？', Sb(['table', 3960], ['chair', 2700], 'heavier'), S('The table is ___ g heavier than the chair.', '桌子重 ___ g。')),
    W('l3-10-5-A11', 'The length of a garden is 8 m and its breadth is 6 m. If John wants to put up a fence around the garden, how long will the fence be?', '花园长 8 m，宽 6 m。围一圈篱笆要多长？', { kind: 'chain', first: A([['length', 8], ['breadth', 6]]), second: { kind: 'mul', a: 2, b: 'ANS1' }, ask1: S('What is length + breadth?', '长加宽是多少？'), ask2: S('Two of each side: how long?', '两条长两条宽一共多长？'), sentence1: S('Length + breadth = ___ m.', '长 + 宽 = ___ m。') }, S('The fence will be ___ m long.', '篱笆长 ___ m。'), { hint: { zh: '围一圈 = 长 + 宽 + 长 + 宽。', en: 'Add all four sides.' } }),
    W2u('l3-10-5-A13', 'A fishmonger sold 30 960 g of fish on Saturday. He sold 10 040 g of fish on Sunday. How much fish did he sell on both days? Express your answer in kilograms and grams.', '鱼贩星期六卖了 30 960 g 鱼，星期日卖了 10 040 g。两天一共卖了多少？用 kg 和 g 表示。', A([['Saturday', 30960], ['Sunday', 10040]]), 1000, 'kg', 'g', 'He sold ___ of fish on both days.', '两天一共卖了 ___。'),
    W('l3-10-5-A14', 'Stanley bought 8300 ml of paint. Edward bought 6970 ml less paint than Stanley. How much paint did they buy altogether?', 'Stanley 买了 8300 ml 油漆，Edward 比 Stanley 少买 6970 ml。两人一共买了多少？', { kind: 'chain', first: Cm(['Stanley', 8300], 'Edward', 6970, 'less'), second: A([['Stanley', 8300], ['Edward', 'ANS1']]), ask1: S('How much did Edward buy?', 'Edward 买了多少？'), ask2: S('How much altogether?', '一共多少？'), sentence1: S('Edward bought ___ ml.', 'Edward 买了 ___ ml。') }, S('They bought ___ ml of paint altogether.', '一共买了 ___ ml。')),
    W('l3-10-5-A15', 'Kelly used 125 g of flour to make pastries. Her sister used 5 times as much flour to bake cakes. How much more flour did her sister use than Kelly?', 'Kelly 用 125 g 面粉做点心，姐姐用了 5 倍的面粉做蛋糕。姐姐比 Kelly 多用多少？', { kind: 'chain', first: { kind: 'times', base: { label: 'Kelly', v: 125 }, other: { label: 'sister' }, k: 5 }, second: Sb(['sister', 'ANS1'], ['Kelly', 125], 'more'), ask1: S('How much did her sister use?', '姐姐用了多少？'), ask2: S('How much more?', '多多少？'), sentence1: S('Her sister used ___ g.', '姐姐用了 ___ g。') }, S('Her sister used ___ g more flour than Kelly.', '姐姐多用 ___ g。')),
    W('l3-10-5-A16', 'Tree A is 135 cm tall. Tree B is 3 times as tall as Tree A. What is the total height of both trees?', 'A 树高 135 cm，B 树是 A 树的 3 倍。两棵树一共多高？', { kind: 'chain', first: { kind: 'times', base: { label: 'Tree A', v: 135 }, other: { label: 'Tree B' }, k: 3 }, second: A([['Tree A', 135], ['Tree B', 'ANS1']]), ask1: S('How tall is Tree B?', 'B 树多高？'), ask2: S('Total height?', '一共多高？'), sentence1: S('Tree B is ___ cm tall.', 'B 树高 ___ cm。') }, S('The total height of both trees is ___ cm.', '一共高 ___ cm。')),
    W2u('l3-10-5-A17', "Margaret walked from her house to the park (1 km 400 m) and then to the food centre (800 m). She then walked her way home from the food centre (1 km 10 m). What was the total distance Margaret had walked? Express your answer in kilometres and metres.", 'Margaret 从家走到公园 1 km 400 m，再到食阁 800 m，再从食阁走回家 1 km 10 m。一共走了多远？用 km 和 m 表示。', A([['house → park', 1400], ['park → food centre', 800], ['food centre → house', 1010]]), 1000, 'km', 'm', 'Margaret had walked a total distance of ___.', '一共走了 ___。'),
    W2u('l3-10-5-A18', 'Jake uses 6500 ml of water on Monday. His brother uses 2765 ml of water more than Jake. How much water do both of them use? Express your answer in litres and millilitres.', 'Jake 星期一用了 6500 ml 水，弟弟比 Jake 多用 2765 ml。两人一共用了多少？用 l 和 ml 表示。', { kind: 'chain', first: Cm(['Jake', 6500], 'brother', 2765, 'more'), second: A([['Jake', 6500], ['brother', 'ANS1']]), ask1: S('How much does his brother use?', '弟弟用了多少？'), ask2: S('How much altogether?', '一共多少？'), sentence1: S('His brother uses ___ ml.', '弟弟用了 ___ ml。') }, 1000, 'l', 'ml', 'Both of them use ___ of water.', '两人一共用 ___。'),
    F('l3-10-5-A19', wp('Joshua poured a bottle of soft drink into 8 glasses and is left with 250 ml of soft drink. (a) If each glass of soft drink had a volume of 420 ml, find the total volume of 8 such glasses of soft drink. (b) How much soft drink was there in the bottle at first? Express your answer in litres and millilitres.', 'Joshua 把一瓶汽水倒进 8 个杯子，还剩 250 ml。(a) 每杯 420 ml，8 杯一共多少？(b) 原来瓶里有多少？用 l 和 ml 表示。'), '(a) The total volume of 8 glasses is {{a}} ml.\n(b) There was {{l}} l {{m}} ml of soft drink in the bottle at first.', { a: num(3360), l: num(3), m: num(610) }, ['word', { en: 'Joshua poured a bottle of soft drink into 8 glasses of 420 ml each and is left with 250 ml. How much was in the bottle at first?', zh: '8 杯每杯 420 ml，还剩 250 ml，原来有多少？', model: { kind: 'chain', first: { kind: 'mul', a: 8, b: 420 }, second: A([['8 glasses', 'ANS1'], ['left', 250]]), ask1: S('Total of 8 glasses?', '8 杯一共多少？'), ask2: S('How much at first?', '原来有多少？'), sentence1: S('8 glasses hold ___ ml.', '8 杯 ___ ml。') }, sentence: S('There was ___ ml = 3 l 610 ml at first.', '原来有 ___ ml = 3 l 610 ml。') }], '先算 8 杯一共多少，再加剩下的', 'Two parts', { label: 'soft drink', hint: { zh: '8 × 420，再加 250，再换成 l 和 ml。', en: '8 × 420 + 250.' } }),
    { id: 'l3-10-5-A20', type: 'word2', en: 'A waiter filled some pots to the brim with coffee. Each pot could hold 2 l of coffee.', zh: '服务员把咖啡壶装满，每壶 2 l。', label: 'coffee pots', steps: [{ ask: S('If the waiter had 14 l of coffee, how many such pots of coffee could he fill?', '14 l 咖啡能装几壶？'), model: { kind: 'div', total: 14, by: 2, how: 'group' }, sentence: S('He could fill ___ such pots of coffee.', '能装 ___ 壶。') }, { ask: S('If the waiter had 2 pots of coffee left after breakfast, how many pots of coffee were used?', '早餐后剩 2 壶，用了几壶？'), model: Sb(['pots', 'ANS1'], ['left', 2], 'used'), sentence: S('___ pots of coffee were used.', '用了 ___ 壶。') }] },
  ].slice(0);
  words.splice(11, 0, W2u('l3-10-5-A12', "Bob's sack of goods has a mass of 4870 g. His sack of goods is 3560 g heavier than Andy's. What is the mass of the two sacks of goods? Express your answer in kilograms and grams.", 'Bob 的袋子 4870 g，比 Andy 的重 3560 g。两袋一共多重？用 kg 和 g 表示。', { kind: 'chain', first: Cm(['Bob', 4870], 'Andy', 3560, 'less'), second: A([['Bob', 4870], ['Andy', 'ANS1']]), ask1: S("What is the mass of Andy's sack?", 'Andy 的袋子多重？'), ask2: S('What is the total mass?', '两袋一共多重？'), sentence1: S("Andy's sack is ___ g.", 'Andy 的袋子 ___ g。') }, 1000, 'kg', 'g', 'The mass of the two sacks of goods is ___.', '两袋一共 ___。'));

  unit(10).kps = [
    {
      id: 'l3-10-1', available: true,
      title: { zh: '长度：千米、米、厘米', en: 'Express length in kilometres, metres or centimetres' },
      intro: { zh: '1 m = 100 cm，1 km = 1000 m。换成小单位就乘，换成大单位就先拆出整的 100 或 1000。', en: '1 m = 100 cm. 1 km = 1000 m.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '米厘米 → 厘米', en: 'Express the following in centimetres' },
          example: { kind: 'l3conv', n: { big: 'm', small: 'cm', factor: 100, bv: 4, sv: 34, dir: 'toSmall' }, title: { zh: '4 m 34 cm = 400 cm + 34 cm = 434 cm', en: '4 m 34 cm = 434 cm' } },
          questions: cmA.map(([m, c], i) => toSmall(`l3-10-1-A${i + 1}`, 'm', 'cm', 100, m, c)) },
        { id: 'B', type: 'fill', title: { zh: '厘米 → 米厘米', en: 'Express the following in metres and centimetres' },
          example: { kind: 'l3conv', n: { big: 'm', small: 'cm', factor: 100, bv: 3, sv: 23, dir: 'toBig' }, title: { zh: '323 cm = 300 cm + 23 cm = 3 m 23 cm', en: '323 cm = 3 m 23 cm' } },
          questions: cmB.map((c, i) => toBig(`l3-10-1-B${i + 1}`, 'm', 'cm', 100, c)) },
        { id: 'C', type: 'fill', title: { zh: '千米米 → 米', en: 'Express the following in metres' },
          example: { kind: 'l3conv', n: { big: 'km', small: 'm', factor: 1000, bv: 3, sv: 850, dir: 'toSmall' }, title: { zh: '3 km 850 m = 3000 m + 850 m = 3850 m', en: '3 km 850 m = 3850 m' } },
          questions: mC.map(([k, m], i) => toSmall(`l3-10-1-C${i + 1}`, 'km', 'm', 1000, k, m)) },
        { id: 'D', type: 'fill', title: { zh: '米 → 千米米', en: 'Express the following in kilometres and metres' },
          example: { kind: 'l3conv', n: { big: 'km', small: 'm', factor: 1000, bv: 1, sv: 456, dir: 'toBig' }, title: { zh: '1456 m = 1000 m + 456 m = 1 km 456 m', en: '1456 m = 1 km 456 m' } },
          questions: mD.map((m, i) => toBig(`l3-10-1-D${i + 1}`, 'km', 'm', 1000, m)) },
        { id: 'E', type: 'fill', title: { zh: '看地图', en: 'Study the map below and answer the following questions' },
          example: { kind: 'l3map', n: { from: 'school', to: 'library', m: 1000 }, title: { zh: 'school 到 library 1000 m = 1 km', en: '1000 m = 1 km 0 m' } },
          questions: mapE.map(([a, b, m], i) => F(`l3-10-1-E${i + 1}`, `<div class="center"><div class="mapbox"><div>🏫 school —1000 m— 🏛️ library —1500 m— 🏬 shopping centre</div><div>│ 2700 m　　　　　　　　　　　│ 2350 m</div><div>🏠 John's house —1070 m— 🏪 market</div></div></div>`, `The ${a} is {{m}} m away from the ${b}.\nIt is {{k}} km {{r}} m away from the ${b}.`, { m: num(m), k: num(Math.floor(m / 1000)), r: num(m % 1000) }, ['l3map', { from: a, to: b, m }], `${a} 到 ${b} 有多远？写成 m，再写成 km 和 m`, `How far is the ${a} from the ${b}?`, { label: `${a} ↔ ${b}: ${m} m`, hint: { zh: '找连接两个地方的线上的数字。1 km = 1000 m。', en: 'Find the distance on the map. 1 km = 1000 m.' } })) },
      ],
    },
    {
      id: 'l3-10-2', available: true,
      title: { zh: '读秤', en: 'Read the correct mass on scales' },
      intro: { zh: '圆盘秤两个 kg 之间有 10 小格，每小格 100 g。先看指针过了几 kg，再数小格。', en: 'Each small mark between the kilograms is 100 g.' },
      sections: [{ id: 'A', type: 'fill', title: { zh: '读秤', en: 'Read the scales. Write the correct answers on the lines provided' },
        example: { kind: 'l3dial', n: { g: 2300, max: 4 }, title: { zh: '过了 2 kg，再 3 小格：2 kg 300 g', en: '2 kg 300 g' } },
        questions: dials.map(([g, max], i) => F(`l3-10-2-A${i + 1}`, `<div class="center">${L.cdial(g, max)}</div>`, `{{k}} kg {{g}} g`, { k: num(Math.floor(g / 1000)), g: num(g % 1000) }, ['l3dial', { g, max }], '这个秤读数是几 kg 几 g？', 'Read the scale', { label: `${Math.floor(g / 1000)} kg ${g % 1000} g`, hint: { zh: '先看过了几 kg，再数小格（每格 100 g）。', en: 'Each small mark is 100 g.' } })) }],
    },
    {
      id: 'l3-10-3', available: true,
      title: { zh: '质量：千克和克', en: 'Express mass in kilograms and grams' },
      intro: { zh: '1 kg = 1000 g。', en: '1 kg = 1000 g.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '千克克 → 克', en: 'Express the following in grams' },
          example: { kind: 'l3conv', n: { big: 'kg', small: 'g', factor: 1000, bv: 1, sv: 100, dir: 'toSmall' }, title: { zh: '1 kg 100 g = 1000 g + 100 g = 1100 g', en: '1 kg 100 g = 1100 g' } },
          questions: gA.map(([k, g], i) => toSmall(`l3-10-3-A${i + 1}`, 'kg', 'g', 1000, k, g)) },
        { id: 'B', type: 'fill', title: { zh: '克 → 千克克', en: 'Express the following in kilograms and grams' },
          example: { kind: 'l3conv', n: { big: 'kg', small: 'g', factor: 1000, bv: 1, sv: 369, dir: 'toBig' }, title: { zh: '1369 g = 1000 g + 369 g = 1 kg 369 g', en: '1369 g = 1 kg 369 g' } },
          questions: gB.map((g, i) => toBig(`l3-10-3-B${i + 1}`, 'kg', 'g', 1000, g)) },
      ],
    },
    {
      id: 'l3-10-4', available: true,
      title: { zh: '量杯：读数和画水位', en: 'Read and draw correct volume in measuring beakers' },
      intro: { zh: '先看量杯最大是多少、每小格多少 ml，再看水面在哪条线。几个量杯就把读数加起来。1 l = 1000 ml。', en: 'Check the scale of the beaker, then read the water level. Add up several beakers.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '读量杯', en: 'Look at the measuring beaker(s) carefully. Write the correct volume of the container in each blank' },
          example: { kind: 'l3readbeaker', n: { bs: [{ max: 500, level: 400 }, { max: 100, level: 60 }] }, title: { zh: '400 ml + 60 ml = 460 ml', en: '460 ml' } },
          questions: readA.map(([bs, total], i) => total >= 1000 ? F(`l3-10-4-A${i + 1}`, L.beakers(bs), `The volume of the container is {{l}} l {{m}} ml.`, { l: num(Math.floor(total / 1000)), m: num(total % 1000) }, ['l3readbeaker', { bs }], '把几个量杯的读数加起来，写成 l 和 ml', 'Read the beakers', { label: `${Math.floor(total / 1000)} l ${total % 1000} ml`, hint: { zh: '每杯读一下再相加，1000 ml = 1 l。', en: 'Add them up. 1000 ml = 1 l.' } }) : F(`l3-10-4-A${i + 1}`, L.beakers(bs), `The volume of the container is {{m}} ml.`, { m: num(total) }, ['l3readbeaker', { bs }], bs.length > 1 ? '把几个量杯的读数加起来' : '读一读量杯', 'Read the beaker', { label: `${total} ml`, hint: { zh: '看每小格是多少 ml。', en: 'Check the scale.' } })) },
        { id: 'B', type: 'l3pour', title: { zh: '画水位', en: 'Draw the correct level of liquid for each measuring beaker' },
          example: { kind: 'l3drawbeaker', n: { max: 500, ml: 300 }, title: { zh: '每格 100 ml，从底往上数 3 格', en: '300 ml' } },
          questions: drawB.map(([max, ml], i) => ({ id: `l3-10-4-B${i + 1}`, type: 'l3pour', max, ml, label: `画 ${ml} ml` })) },
      ],
    },
    {
      id: 'l3-10-5', available: true,
      title: { zh: '体积：升和毫升', en: 'Express volume in litres and millilitres' },
      intro: { zh: '1 l = 1000 ml。', en: '1 l = 1000 ml.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '升毫升 → 毫升', en: 'Express the following in millilitres' },
          example: { kind: 'l3conv', n: { big: 'l', small: 'ml', factor: 1000, bv: 1, sv: 50, dir: 'toSmall' }, title: { zh: '1 l 50 ml = 1000 ml + 50 ml = 1050 ml', en: '1 l 50 ml = 1050 ml' } },
          questions: mlA.map(([l, m], i) => toSmall(`l3-10-5-A${i + 1}`, 'l', 'ml', 1000, l, m)) },
        { id: 'B', type: 'fill', title: { zh: '毫升 → 升毫升', en: 'Express the following in litres and millilitres' },
          example: { kind: 'l3conv', n: { big: 'l', small: 'ml', factor: 1000, bv: 4, sv: 352, dir: 'toBig' }, title: { zh: '4352 ml = 4000 ml + 352 ml = 4 l 352 ml', en: '4352 ml = 4 l 352 ml' } },
          questions: mlB.map((m, i) => toBig(`l3-10-5-B${i + 1}`, 'l', 'ml', 1000, m)) },
      ],
    },
    {
      id: 'l3-10-6', available: true,
      title: { zh: '长度质量体积应用题', en: 'Solve word problems related to length, mass and volume' },
      intro: { zh: '和普通应用题一样列式，注意单位：答案要求 kg 和 g、l 和 ml、m 和 cm 时，先算出小单位再换算。', en: 'Solve, then convert the units if asked.' },
      sections: [{ id: 'A', type: 'word', title: { zh: '应用题', en: 'Do these word problems. Show your working clearly' },
        example: { kind: 'word', n: { en: 'A bottle holds 1250 ml of water. Tom drinks 400 ml. How much water is left?', zh: '一瓶水 1250 ml，Tom 喝了 400 ml。还剩多少？', model: Sb(['bottle', 1250], ['drinks', 400], 'left'), sentence: S('___ ml of water is left.', '还剩 ___ ml。') }, title: { zh: '1250 − 400 = 850 ml', en: '850 ml' } },
        questions: words }],
    },
  ];
})();
