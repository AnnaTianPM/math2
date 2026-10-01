/* Level 1 · Unit 6  序数和位置 */
(function () {
  const U = window.MATH_DATA.levels[1].units;
  const unit = num => U.find(u => u.num === num);
  const L = window.L1, ORD = L.ORD, ORDS = L.ORDS;
  const pic = html => `<div class="center">${html}</div>`;
  const img = (name, w) => L.img('l1u6/' + name, w || 440);
  const choice = (a, options) => ({ a, kind: 'choice', options });
  const F = (id, p, text, fields, explain, zh, en, o) => Object.assign({ id, type: 'fill', pic: p, label: text.replace(/\{\{\w+\}\}/g, '___').replace(/\n/g, ' '), prompt: { zh, en: en || 'Fill in the blanks' }, text, fields, answerText: Object.values(fields).map(f => f.a).join(', '), explain }, o || {});
  const row = (icon, n) => `<span class="l1row ordpick">${Array.from({ length: n }, () => `<span class="l1item">${icon}</span>`).join('')}</span>`;
  /* 一排可点的 icon（pickone），k 第几个，from 左/右，label 标注在某个位置下面 */
  const pickRow = (id, icon, n, k, from, en, zh, hintZh) => { const idx = from === 'right' ? n - k : k - 1;
    return { id, type: 'pickone', pic: '', label: en, options: Array.from({ length: n }, () => icon), answer: idx, prompt: { zh, en }, hint: { zh: hintZh || `从${from === 'right' ? '右' : '左'}边开始数。`, en: `Count from the ${from}.` }, explain: ['l1ordinal', { icon, n, k, from }], cls: 'ordpick' }; };
  const ords = Array.from({ length: 8 }, (_, i) => ORDS[i + 1]);
  const ordw = Array.from({ length: 8 }, (_, i) => ORD[i + 1]);

  /* ---- KP1 ---- */
  const colourA = [['🍄', 5, 2, 'left', 'The second mushroom', '“fourth”标在第 4 个，所以从左数'], ['🥳', 10, 8, 'left', 'The eighth party hat', '“fifth”标在第 5 个，从左数'], ['🎁', 10, 7, 'left', 'The seventh present', '“second”标在第 2 个，从左数'], ['🦋', 10, 3, 'left', 'The third butterfly', '“seventh”标在第 7 个，从左数'], ['🔮', 10, 5, 'left', 'The fifth marble', '“sixth”标在第 6 个，从左数'], ['🐌', 10, 1, 'right', 'The 1st snail', '“8th”标在左数第 3 个，说明是从右边数的'], ['🥭', 10, 9, 'left', 'The 9th mango', '“3rd”标在第 3 个，从左数'], ['👢', 10, 6, 'right', 'The 6th boot', '“10th”标在最左边，说明从右边数'], ['🌸', 10, 4, 'right', 'The 4th flower', '“9th”标在左数第 2 个，说明从右边数'], ['🥞', 10, 10, 'left', 'The 10th pancake', '“2nd”标在第 2 个，从左数']];
  const raceNames = ['MacGyver', 'Steele', 'Trent', 'Bishop', 'Logan', 'Derby', 'Powell'];
  const paraNames = ['Doug', 'Brad', 'Al', 'Rob', 'Mike', 'Steve', 'Gus', 'Will'];
  /* ---- KP2 ---- */
  const queue = ['Sandra', 'Amy', 'Tom', 'Steve', 'Rick', 'Kelly', 'Janet', 'Rose', 'Sam', 'Jason'];
  const vehB = [['car', 'van', 'after'], ['motorcycle', 'van', 'before'], ['pickup', 'motorcycle and bus', 'between'], ['pickup', 'truck', 'after'], ['truck', 'car', 'before'], ['bus', 'pickup and the truck', 'between']];
  const vehText = [['The car is {{a}} the van.'], ['The motorcycle is {{a}} the van.'], ['The pickup is {{a}} the motorcycle and bus.'], ['The pickup is {{a}} the truck.'], ['The truck is {{a}} car.'], ['The bus is {{a}} the pickup and the truck.']];
  /* ---- KP3 ---- */
  const lrA = [['🍓', 8, 5, 'left', 'The 5th strawberry from the left'], ['🦢', 10, 6, 'left', 'The 6th swan from the left'], ['🕯️', 5, 1, 'left', 'The 1st candle from the left'], ['⌚', 7, 4, 'left', 'The 4th watch from the left'], ['🎒', 10, 8, 'right', 'The eighth bag from the right']];
  const riddle = ['T', 'G', 'O', 'N', 'H', 'U', 'D'], clues = [[7, 'left'], [5, 'right'], [6, 'left'], [2, 'left'], [5, 'left'], [4, 'right'], [2, 'right'], [1, 'left']];
  const kids = ['Sam', 'Rose', 'Steve', 'Tom', 'Sandra', 'Amy', 'Janet', 'Ben', 'Jason', 'Rick'];
  const LR = ['left', 'right', 'next to'];
  const trayC = [['The plate is third from the {{a}}.\nIt is also fourth from the {{b}}.', ['left', 'right']], ['The napkin is first from the {{a}}.\nIt is also sixth from the {{b}}.', ['left', 'right']], ['The spoon is {{a}} the knife.\nIt is also {{b}} the glass.', ['next to', 'next to']], ['The fork is {{a}} the napkin.\nIt is also {{b}} the plate.', ['next to', 'next to']], ['The knife is third from the {{a}}.\nIt is {{b}} the plate.', ['right', 'next to']], ['The glass is sixth from the {{a}}.\nIt is also first from the {{b}}.', ['left', 'right']]];

  unit(6).kps = [
    {
      id: 'l1-6-1', available: true,
      title: { zh: '认识序数：第几个', en: 'Understand ordinal numbers' },
      intro: { zh: '序数说的是“第几个”：first 第一（1st）、second 第二（2nd）、third 第三（3rd）、fourth（4th）、fifth（5th）……tenth（10th）。要看清楚从哪边开始数。', en: 'Ordinal numbers tell the position: first, second, third ... Check which side to count from.' },
      sections: [
        { id: 'A', type: 'pickone', title: { zh: '点出对的那个', en: 'Colour the correct item' },
          example: { kind: 'l1ordinal', n: { icon: '🐑', n: 8, k: 4, from: 'left' }, title: { zh: 'The fourth lamb：从左数第 4 只', en: 'the fourth lamb' } },
          questions: colourA.map(([icon, n, k, from, en, hint], i) => pickRow(`l1-6-1-A${i + 1}`, icon, n, k, from, en, `${en}：点第 ${k} 个（从${from === 'right' ? '右' : '左'}数）`, hint)) },
        { id: 'B', type: 'fill', title: { zh: '字母的位置', en: 'Look at the letters of the alphabet carefully. Name their positions' },
          example: { kind: 'l1ordinal', n: { icon: '🔤', n: 8, k: 3, from: 'left' }, title: { zh: 'A first，B second，C third：按字母顺序排位置', en: 'A → B → C: first, second, third' } },
          questions: [
            F('l1-6-1-B1', pic(`<div class="wordtab">${['C', 'H', 'A', 'E', 'G', 'B', 'F', 'D'].map((c, i) => `<span><b>${c}</b>${['third', '?', 'first', '?', '?', 'second', '?', '?'][i]}</span>`).join('')}</div><div class="sub">A → B → C → … 按字母顺序：first, second, third …</div>`), 'H: {{h}}\nE: {{e}}\nG: {{g}}\nF: {{f}}\nD: {{d}}', { h: choice('eighth', ordw), e: choice('fifth', ordw), g: choice('seventh', ordw), f: choice('sixth', ordw), d: choice('fourth', ordw) }, ['l1ordinal', { icon: '🔤', n: 8, k: 5, from: 'left' }], 'A 是 first，B 是 second，C 是 third。按字母顺序，其他字母是第几？', 'Name the positions', { label: '字母 A-H 的位置', hint: { zh: '按 A B C D E F G H 的顺序数：D 第四，E 第五，F 第六，G 第七，H 第八。', en: 'A B C D E F G H.' } }),
            F('l1-6-1-B2', pic(`<div class="wordtab">${['V', 'Y', 'T', 'S', 'X', 'U', 'Z', 'W'].map((c, i) => `<span><b>${c}</b>${['?', '2nd', '?', '?', '3rd', '?', '1st', '?'][i]}</span>`).join('')}</div><div class="sub">Z → Y → X → … 倒着数：1st, 2nd, 3rd …</div>`), 'V: {{v}}\nT: {{t}}\nS: {{s}}\nU: {{u}}\nW: {{w}}', { v: choice('5th', ords), t: choice('7th', ords), s: choice('8th', ords), u: choice('6th', ords), w: choice('4th', ords) }, ['l1ordinal', { icon: '🔤', n: 8, k: 4, from: 'right' }], 'Z 是 1st，Y 是 2nd，X 是 3rd。倒着按字母顺序，其他字母是第几？', 'Name the positions', { label: '字母 S-Z 倒着数的位置', hint: { zh: '倒着数：Z Y X W V U T S → W 4th，V 5th，U 6th，T 7th，S 8th。', en: 'Z Y X W V U T S.' } }),
          ] },
        { id: 'C', type: 'match', title: { zh: '草莓配蛋糕', en: 'Match each strawberry to the correct cake' },
          example: { kind: 'l1ordinal', n: { icon: '🍓', n: 4, k: 1, from: 'left' }, title: { zh: '1st = first', en: '1st = first' } },
          questions: [{ id: 'l1-6-1-C1', type: 'match', label: '1st-first, 2nd-second …', left: [1, 2, 3, 5, 8, 9].map(k => ({ id: ORDS[k], html: `🍓 ${ORDS[k]}`, text: ORDS[k] })), right: [9, 2, 5, 1, 3, 8].map(k => ({ id: ORD[k], html: `🎂 ${ORD[k]}`, text: ORD[k] })), pairs: Object.fromEntries([1, 2, 3, 5, 8, 9].map(k => [ORDS[k], ORD[k]])), prompt: { zh: '草莓上是 1st、2nd 这样的写法，蛋糕上是英文单词，把一样的连起来', en: 'Match 1st to first, 2nd to second …' }, hint: { zh: '1st first，2nd second，3rd third，5th fifth，8th eighth，9th ninth。', en: '1st = first …' }, explain: ['l1ordinal', { icon: '🍓', n: 5, k: 5, from: 'left' }] }] },
        { id: 'D', type: 'fill', title: { zh: '赛车比赛', en: 'There is a car race at the track' },
          example: { kind: 'l1ordlist', n: { pic: 'l1u6/race', order: raceNames, zh: '离终点线（左边）最近的是第 1。' }, title: { zh: '谁最靠近终点谁是 1st', en: 'The car nearest the finish line is 1st' } },
          questions: [F('l1-6-1-D1', pic(img('race', 400)), 'How many cars took part in the race? {{n}}\nWho is 1st? {{a}}\nWho is 3rd? {{b}}\nWho is 5th? {{c}}\nIn which position is Steele? {{d}}\nIn which position is Bishop? {{e}}\nIn which position is Powell? {{f}}\nIn which position is Derby? {{g}}', { n: { a: 7 }, a: choice('MacGyver', raceNames), b: choice('Trent', raceNames), c: choice('Logan', raceNames), d: choice('2nd', ords), e: choice('4th', ords), f: choice('7th', ords), g: choice('6th', ords) }, ['l1ordlist', { pic: 'l1u6/race', order: raceNames }], '终点线在左边，离终点最近的车是第 1 名。数一数，排一排', 'Answer the questions', { label: '赛车：7 辆，MacGyver 1st …', hint: { zh: '从左往右：MacGyver, Steele, Trent, Bishop, Logan, Derby, Powell。', en: 'MacGyver is nearest the finish line.' } })] },
        { id: 'E', type: 'fill', title: { zh: '跳伞练习', en: 'There is a parachute practice on the field' },
          example: { kind: 'l1ordlist', n: { pic: 'l1u6/para', order: paraNames, zh: '离地面（下面）最近的最先落地，是第 1。' }, title: { zh: '谁最低谁先落地', en: 'The lowest one lands first' } },
          questions: [F('l1-6-1-E1', pic(img('para', 400)), 'Who is first? {{a}}\nWho is second? {{b}}\nWho is fifth? {{c}}\nWho is sixth? {{d}}\nIn which position is Will? {{e}}\nIn which position is Steve? {{f}}\nIn which position is Gus? {{g}}\nIn which position is Al? {{h}}', { a: choice('Doug', paraNames), b: choice('Brad', paraNames), c: choice('Mike', paraNames), d: choice('Rob', paraNames), e: choice('eighth', ordw), f: choice('fourth', ordw), g: choice('seventh', ordw), h: choice('third', ordw) }, ['l1ordlist', { pic: 'l1u6/para', order: paraNames }], '谁离地面最近，谁就先落地（第 1）。从低到高排一排', 'Answer the questions', { label: '跳伞：Doug 1st …', hint: { zh: '从低到高：Doug, Brad, Al, Rob, Mike, Steve, Gus, Will。', en: 'Lowest first.' } })] },
      ],
    },
    {
      id: 'l1-6-2', available: true,
      title: { zh: 'before、after、between', en: 'Use position words like "before", "after" and "between"' },
      intro: { zh: 'before 在……前面，after 在……后面，between 在两个……中间。排队时，离柜台最近的是第一个。', en: 'before = in front of, after = behind, between = in the middle of two.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '排队买票', en: 'Fill in each blank with the correct word' },
          example: { kind: 'l1posword', n: { pic: 'l1u6/queue', zh: 'Sandra 最靠近售票口，是 first；Amy 在她后面是 second；Tom third……', en: 'Sandra is first, Amy is second, Tom is third …' }, title: { zh: '靠近柜台的是第一', en: 'Nearest the counter is first' } },
          questions: [F('l1-6-2-A1', pic(img('queue', 480)), 'Tom is {{a}} in the queue.\nThe {{b}} child in the queue is Janet.\nSteve is just before {{c}}.\nJason is just after {{d}}.\nAfter a few minutes, Kelly decides not to watch the movie. Janet is {{e}} in the queue now.\nBen has just arrived at the cinema. If he wants to watch the movie, he must stand after {{f}}.', { a: choice('3rd', ords), b: choice('7th', ords), c: choice('Rick', queue), d: choice('Sam', queue), e: choice('6th', ords), f: choice('Jason', queue) }, ['l1posword', { pic: 'l1u6/queue', zh: '从 Sandra 开始数：1 Sandra，2 Amy，3 Tom，4 Steve，5 Rick，6 Kelly，7 Janet，8 Rose，9 Sam，10 Jason。', en: 'Sandra, Amy, Tom, Steve, Rick, Kelly, Janet, Rose, Sam, Jason.' }], '从售票口开始数：Sandra 是第 1。回答问题', 'Fill in the blanks', { label: '排队：Tom 3rd，7th 是 Janet …', hint: { zh: 'Kelly 走了之后，她后面的人都往前进一位。新来的要排在最后一个人后面。', en: 'When Kelly leaves, everyone behind moves up one.' } })] },
        { id: 'B', type: 'fill', title: { zh: '路上的车', en: 'Fill in each blank with the words "before", "after" or "between"' },
          example: { kind: 'l1posword', n: { pic: 'l1u6/vehicles', zh: '车队往右开，car 在最前面。van 在 car 后面（after），motorcycle 在 pickup 和 van 中间（between）。', en: 'The van is after the car. The motorcycle is between the pickup and the van.', w: 500 }, title: { zh: '最前面的是 car', en: 'The car is in front' } },
          questions: [F('l1-6-2-B1', pic(img('vehicles', 500)), vehText.map((t, i) => t[0].replace('{{a}}', `{{a${i}}}`)).join('\n'), (() => { const f = {}; vehB.forEach(([x, y, a], i) => { f['a' + i] = choice(a, ['before', 'after', 'between']); }); return f; })(), ['l1posword', { pic: 'l1u6/vehicles', zh: '顺序（从前到后）：car, van, motorcycle, pickup, bus, truck。前面的用 before，后面的用 after，夹在中间用 between。', en: 'car, van, motorcycle, pickup, bus, truck.', w: 500 }], '车往右开，car 在最前面。每句填 before、after 还是 between', 'before, after or between?', { label: '车：after, before, between, after, before, between', hint: { zh: '从前到后：car → van → motorcycle → pickup → bus → truck。', en: 'car, van, motorcycle, pickup, bus, truck.' } })] },
        { id: 'C', type: 'fill', title: { zh: '玩具蛇的名字', en: 'Look at the toy snake. Read the sentences and fill in the correct letters' },
          example: { kind: 'l1posword', n: { pic: 'l1u6/snake', zh: '蛇身上有 7 格，已经有 I（第 3 格）和 E（第 6 格）。按线索把字母放进去。', en: '7 boxes. I is in the 3rd box, E in the 6th.', w: 500 }, title: { zh: '按线索放字母', en: 'Use the clues' } },
          questions: [F('l1-6-2-C1', pic(img('snake', 500)), "'S' is after the head: box 1 = {{b1}}\n'R' is before the tail: box 7 = {{b7}}\n'E' is between 'H' and 'R': box 5 = {{b5}}\n'L' is between 'S' and 'I': box 2 = {{b2}}\n'H' is after 'T': box 4 = {{b4}}\nThe name of the toy snake is {{name}}.", { b1: choice('S', ['S', 'L', 'T', 'H', 'R']), b7: choice('R', ['S', 'L', 'T', 'H', 'R']), b5: choice('H', ['S', 'L', 'T', 'H', 'R']), b2: choice('L', ['S', 'L', 'T', 'H', 'R']), b4: choice('T', ['S', 'L', 'T', 'H', 'R']), name: choice('SLITHER', ['SLITHER', 'SLIDER', 'LISTEN', 'SHELTER']) }, ['l1posword', { pic: 'l1u6/snake', zh: '第 1 格 S（在头后面），第 7 格 R（在尾巴前面），第 5 格 H（在 H 和 R 中间的是 E，所以 H 在 E 前面），第 2 格 L，第 4 格 T。连起来 S L I T H E R。', en: 'S L I T H E R', w: 500 }], '按线索，每个格子放哪个字母？最后读出蛇的名字', 'Fill in the letters', { label: '玩具蛇：SLITHER', hint: { zh: '一条一条看：after the head 就是第 1 格；before the tail 就是第 7 格。', en: 'After the head: box 1. Before the tail: box 7.' } })] },
      ],
    },
    {
      id: 'l1-6-3', available: true,
      title: { zh: 'left、right、next to', en: 'Use position words like "left", "right" and "next to"' },
      intro: { zh: 'from the left 从左边数，from the right 从右边数，next to 挨着（旁边）。', en: 'from the left, from the right, next to.' },
      sections: [
        { id: 'A', type: 'pickone', title: { zh: '从左数、从右数', en: 'Read each sentence carefully and colour the correct answer' },
          example: { kind: 'l1leftright', n: { icon: '🦆', n: 6, k: 3, from: 'left' }, title: { zh: 'The 3rd duck from the left', en: 'the 3rd duck from the left' } },
          questions: lrA.map(([icon, n, k, from, en], i) => pickRow(`l1-6-3-A${i + 1}`, icon, n, k, from, en, `${en}：从${from === 'right' ? '右' : '左'}数第 ${k} 个，点它`, `from the ${from} 就是从${from === 'right' ? '右' : '左'}边开始数。`)).concat([
            F('l1-6-3-A6', pic(`<div class="shaperow">${riddle.map(c => `<span class="shp2 letter">${c}</span>`).join('')}</div>`), '(a) 7th from the left: {{a}}\n(b) 5th from the right: {{b}}\n(c) 6th from the left: {{c}}\n(d) 2nd from the left: {{d}}\n(e) 5th from the left: {{e}}\n(f) 4th from the right: {{f}}\n(g) 2nd from the right: {{g}}\n(h) 1st from the left: {{h}}\nWhich nut has a hole in it? {{w}}', { a: choice('D', riddle), b: choice('O', riddle), c: choice('U', riddle), d: choice('G', riddle), e: choice('H', riddle), f: choice('N', riddle), g: choice('U', riddle), h: choice('T', riddle), w: choice('DOUGHNUT', ['DOUGHNUT', 'WALNUT', 'PEANUT', 'COCONUT']) }, ['l1riddle', { letters: riddle, clues }], '按线索找字母，连起来是一个词：哪种“nut”中间有个洞？', 'Solve the riddle', { label: '谜语：DOUGHNUT', hint: { zh: 'from the left 从左数，from the right 从右数。字母连起来是 DOUGHNUT（甜甜圈）。', en: 'DOUGHNUT' } }),
          ]) },
        { id: 'B', type: 'fill', title: { zh: '坐成一排的小朋友', en: 'Fill in each blank with the correct word' },
          example: { kind: 'l1posword', n: { pic: 'l1u6/kids', zh: '10 个小朋友，从左到右：Sam, Rose, Steve, Tom, Sandra, Amy, Janet, Ben, Jason, Rick。中间是第 5 和第 6 个。', en: 'Sam, Rose, Steve, Tom, Sandra, Amy, Janet, Ben, Jason, Rick.', w: 520 }, title: { zh: '10 个人的中间是第 5、6 个', en: 'The middle of 10 is the 5th and 6th' } },
          questions: [F('l1-6-3-B1', pic(img('kids', 520)), '{{a}} and {{b}} are sitting in the middle of the row.\nSteve is sitting between {{c}} and {{d}}.\nRick is sitting next to {{e}}.\nJanet is {{f}} from the left.\nBen is {{g}} from the right.\nSam is last from the {{h}}.', { a: choice('Sandra', kids), b: choice('Amy', kids), c: choice('Rose', kids), d: choice('Tom', kids), e: choice('Jason', kids), f: choice('7th', ords), g: choice('3rd', ords), h: choice('right', ['left', 'right']) }, ['l1posword', { pic: 'l1u6/kids', zh: '从左数：Janet 第 7。从右数：Rick 1，Jason 2，Ben 3。Sam 在最左边，从右数是最后一个。', en: 'Janet is 7th from the left. Ben is 3rd from the right.', w: 520 }], '看这一排小朋友，回答问题', 'Fill in the blanks', { accept: [{ a: 'Sandra', b: 'Amy', c: 'Rose', d: 'Tom', e: 'Jason', f: '7th', g: '3rd', h: 'right' }, { a: 'Amy', b: 'Sandra', c: 'Rose', d: 'Tom', e: 'Jason', f: '7th', g: '3rd', h: 'right' }, { a: 'Sandra', b: 'Amy', c: 'Tom', d: 'Rose', e: 'Jason', f: '7th', g: '3rd', h: 'right' }, { a: 'Amy', b: 'Sandra', c: 'Tom', d: 'Rose', e: 'Jason', f: '7th', g: '3rd', h: 'right' }], label: '小朋友一排：Sandra & Amy 中间 …', hint: { zh: '10 个人，中间是第 5、6 个。from the right 要从 Rick 开始倒着数。', en: 'Count from Rick for "from the right".' } })] },
        { id: 'C', type: 'fill', title: { zh: '餐盘上的东西', en: 'Fill in each blank with the words "left", "right" or "next to"' },
          example: { kind: 'l1posword', n: { pic: 'l1u6/tray', zh: '从左到右：napkin, fork, plate, knife, spoon, glass（6 样）。plate 从左数第 3，从右数第 4。', en: 'napkin, fork, plate, knife, spoon, glass.', w: 460 }, title: { zh: '6 样东西，从左数和从右数', en: 'Count from the left and from the right' } },
          questions: trayC.map(([text, ans], i) => F(`l1-6-3-C${i + 1}`, pic(img('tray', 460)), text, { a: choice(ans[0], LR), b: choice(ans[1], LR) }, ['l1posword', { pic: 'l1u6/tray', zh: '从左到右：napkin, fork, plate, knife, spoon, glass。挨着的用 next to。', en: 'napkin, fork, plate, knife, spoon, glass.', w: 460 }], '填 left、right 还是 next to', 'left, right or next to?', { label: text.replace(/\{\{\w+\}\}/g, '___').replace(/\n/g, ' '), hint: { zh: '从左数第几、从右数第几；挨着的就是 next to。', en: 'next to = beside.' } })) },
      ],
    },
  ];
})();
