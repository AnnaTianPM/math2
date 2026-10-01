/* Level 1 · Unit 5  图形和规律 */
(function () {
  const U = window.MATH_DATA.levels[1].units;
  const unit = num => U.find(u => u.num === num);
  const L = window.L1, shp = L.shp;
  const pic = html => `<div class="center">${html}</div>`;
  const img = (name, w) => L.img('l1u5/' + name, w || 380);
  const choice = (a, options) => ({ a, kind: 'choice', options });
  const SH = ['square', 'triangle', 'circle', 'rectangle'];
  const F = (id, p, text, fields, explain, zh, en, o) => Object.assign({ id, type: 'fill', pic: p, label: text.replace(/\{\{\w+\}\}/g, '___').replace(/\n/g, ' '), prompt: { zh, en: en || 'Fill in the blanks' }, text, fields, answerText: Object.values(fields).map(f => f.a).join(', '), explain }, o || {});
  const K = (kind, o) => ({ kind, o });
  const sm = (kind, o) => K(kind, Object.assign({ s: 0.7 }, o || {}));
  const big = (kind, o) => K(kind, Object.assign({ s: 1.4 }, o || {}));
  const field = items => `<div class="shapefield static">${items.map(it => shp(it.kind, it.o)).join('')}</div>`;
  const pm = (id, items, ans, label, zh, en, explain, hint) => ({ id, type: 'pickmany', pic: '', label, options: items.map((it, i) => ({ val: String(i), html: shp(it.kind, it.o), text: L.ZH[L.NAMES[it.kind]] })), answer: ans.map(String), prompt: { zh, en }, explain, hint });

  /* ---- KP1 认识图形 ---- */
  const nameA = [['circ', 'circle'], ['rect', 'rectangle'], ['tri', 'triangle'], ['sq', 'square']];
  const fieldC = [
    ['circles', [K('sq'), K('rect'), K('circ'), K('trid'), big('circ'), K('rectv'), K('sq'), K('rectv'), K('tri'), big('sq'), K('circ'), big('circ'), K('trid')], [2, 4, 10, 11]],
    ['triangles', [K('circ'), K('dia'), K('trir'), K('rect'), K('trid'), K('sq'), K('trithin'), big('sq'), K('tri'), K('rectv'), K('rect'), K('circ'), big('tri'), K('dia')], [2, 4, 6, 8, 12]],
    ['rectangles', [K('dia'), K('circ'), K('tril'), K('circ'), K('rectv'), K('rect'), big('rect'), K('rectv'), K('trid'), K('circ'), K('sq'), K('rectv'), K('tri'), K('circ'), K('dia')], [4, 5, 6, 7, 11]],
    ['not circles', [K('circ'), K('trid'), K('ovalv'), K('dia'), K('oval'), K('sq'), K('circ'), K('tri'), big('circ')], [1, 2, 3, 4, 5, 7]],
    ['not triangles', [K('trir'), K('dia'), K('para'), K('rect'), K('rectv'), K('para'), K('trid'), K('kite'), K('rtrir')], [1, 2, 3, 4, 5, 7]],
    ['not rectangles', [K('trap'), K('rectv'), K('para'), K('parav'), K('kite'), K('rectv'), K('pent'), K('rect'), K('tri')], [0, 2, 3, 4, 6, 8]],
  ];
  const tagD = [['tri', 1], ['rect', 0], ['circ', 3], ['tri', 1], ['sq', 2, { s: 1.3 }], ['sq', 2, { s: 0.7 }], ['trir', 1], ['circ', 3], ['dia', 2], ['tri', 1], ['rect', 0, { s: 1.3 }], ['circ', 3], ['tri', 1, { s: 1.3 }], ['rect', 0, { s: 1.2 }], ['circ', 3, { s: 1.3 }]];
  const missE = [['e1', ['triangle']], ['e2', ['circle']], ['e3', ['rectangle']], ['e4', ['square', 'triangle']], ['e5', ['circle', 'rectangle']]];
  /* ---- KP2 边和角 ---- */
  const sidesB = [['sq', 'square', 4], ['circ', 'circle', 0], ['tri', 'triangle', 3], ['rect', 'rectangle', 4]];
  /* ---- KP3 分类 ---- */
  const groupA = [['g1', 'colour', false], ['g2', 'shape', false], ['g3', 'size', false], ['g4', 'shape', true], ['g5', 'colour', true], ['g6', 'size', true]];
  const simB = [
    [[K('rtri'), K('rtri'), K('circ'), K('rtrir', { s: 0.8 }), K('rect')], [0, 1]],
    [[K('circ'), K('sq'), K('rtrir'), K('circ'), K('rect')], [0, 3]],
    [[K('sq'), K('rtri'), K('rectv'), K('circ'), K('sq')], [0, 4]],
    [[K('rect', { s: 1.2 }), K('rect', { s: 0.8, h: 40 }), K('rect', { s: 1.2 }), K('circ', { s: 0.6 }), K('tri')], [0, 2]],
    [[K('sq'), K('rtrir'), K('rect'), K('rtrir'), K('circ', { s: 0.7 })], [1, 3]],
    [[K('rectv', { s: 1.3 }), K('rectv'), K('rect'), K('circ', { s: 0.6 }), K('rectv')], [1, 4]],
  ];
  /* ---- KP4 生活中的图形 ---- */
  const objA = [['o1', 'circle', '车轮'], ['o2', 'rectangle', '门'], ['o3', 'triangle', '三角尺'], ['o4', 'square', '便条纸'], ['o5', 'triangle', '三角旗'], ['o6', 'rectangle', '空调'], ['o7', 'circle', '网球'], ['o8', 'square', '棋盘']];
  const colB = [['b1', 'rectangle', '计算器'], ['b2', 'triangle', '警示牌'], ['b3', 'rectangle', '磁铁'], ['b4', 'circle', '钟'], ['b5', 'circle', '盘子'], ['b6', 'rectangle', '手机'], ['b7', 'triangle', '风筝'], ['b8', 'square', '画框']];
  const COL = { square: 'blue', circle: 'yellow', rectangle: 'red', triangle: 'green' };
  const haveC = [['c1', 'square', ['stamp', 'glass', 'book', 'biscuit'], ['stamp', 'biscuit']], ['c2', 'circle', ['ruler', 'water bottle', 'orange', 'chair'], ['water bottle', 'orange']], ['c3', 'triangle', ['cake', 'television', 'trophy', 'fan'], ['cake', 'trophy']], ['c4', 'rectangle', ['umbrella', 'briefcase', 'ice cream', 'eraser'], ['briefcase', 'eraser']]];
  const notD = [['d1', 'square', ['table', 'die', 'plate', 'brick'], ['plate', 'brick']], ['d2', 'circle', ['pie', 'glasses', 'bucket', 'crayon'], ['pie', 'glasses']], ['d3', 'triangle', ['party hat', 'soccer ball', 'gift box', 'door stopper'], ['soccer ball', 'gift box']], ['d4', 'rectangle', ['vase', 'tissue box', 'playing cards', 'globe'], ['vase', 'globe']]];
  const traceE = [['t1', 'triangle', '卷笔刀'], ['t2', 'rectangle', '火柴盒'], ['t3', 'circle', '牛奶罐'], ['t4', 'square', '闹钟'], ['t5', 'rectangle', '遥控器'], ['t6', 'circle', '水晶球'], ['t7', 'square', '积木'], ['t8', 'triangle', '笔筒']];
  /* ---- KP5 规律 ---- */
  const patA = [
    { seq: [K('rectv'), K('rect'), K('rect'), K('rectv'), K('rect'), K('rect'), K('rectv')], blanks: [5, 6], cands: [K('rectv'), K('rect')], answer: [1, 0], rule: '长方形一会儿竖、一会儿横（位置在变）。' },
    { seq: [K('rtri'), K('rtrir'), K('trid'), K('rtri'), K('rtrir'), K('trid'), K('rtri')], blanks: [5, 6], cands: [K('rtri'), K('rtrir'), K('trid')], answer: [2, 0], rule: '三角形的样子在变。' },
    { seq: [K('rect', { lines: 'h' }), K('rect', { lines: 'v' }), K('rect', { lines: 'd' }), K('rect', { lines: 'h' }), K('rect', { lines: 'v' }), K('rect', { lines: 'd' })], blanks: [4, 5], cands: [K('rect', { lines: 'h' }), K('rect', { lines: 'v' }), K('rect', { lines: 'd' })], answer: [1, 2], rule: '条纹的方向在变：横、竖、斜。' },
    { seq: [K('rect', { dot: 'tr' }), K('rectv', { dot: 'br' }), K('rect', { dot: 'tr' }), K('rectv', { dot: 'br' }), K('rect', { dot: 'tr' }), K('rectv', { dot: 'br' }), K('rect', { dot: 'tr' })], blanks: [4, 5], cands: [K('rect', { dot: 'tr' }), K('rectv', { dot: 'br' })], answer: [0, 1], rule: '长方形和点的位置在变。' },
    { seq: [K('circ'), K('rectv'), K('sq'), K('circ'), K('rectv'), K('sq'), K('circ')], blanks: [3], cands: [K('circ'), K('rectv'), K('sq')], answer: [0], rule: '形状在变：圆、长方形、正方形。' },
    { seq: [K('tri', { inner: 'v' }), K('tri', { inner: 'h' }), K('tri', { inner: 'v' }), K('tri', { inner: 'h' }), K('tri', { inner: 'v' }), K('tri', { inner: 'h' })], blanks: [2], cands: [K('tri', { inner: 'v' }), K('tri', { inner: 'h' })], answer: [0], rule: '三角形里面的小长方形一会儿竖一会儿横。' },
  ];
  const patB = [['pb1', 1, 'A change in colour. ○ comes after ●(grey).', '颜色在变：深、浅、白，重复。'], ['pb2', 1, 'A change in colour.', '颜色在变：浅、白、深。'], ['pb3', 0, 'A change in colour and orientation.', '颜色和方向在变。'], ['pb4', 1, 'A change in colour and orientation.', '颜色和方向在变。']];
  const patC = [['pc1', 1, 'A change in size.', '大小在变：小、中、大。'], ['pc2', 1, 'A change in position of the cone.', '圆锥的方向在变。'], ['pc3', 0, 'A change in position of dots on the cubes.', '方块上的点的位置在变。'], ['pc4', 1, 'A change in type and position of pyramids.', '金字塔的样子和方向在变。']];
  const imgPick = (id, name, ans, en, zh, kind) => ({ id, type: 'pickone', pic: pic(img(name, 460)), label: `规律 ${name}`, options: [`<span class="shp2">${img(name + 'a', 90)}</span>`, `<span class="shp2">${img(name + 'b', 90)}</span>`], answer: ans, prompt: { zh: '下一个是什么？点它', en: 'What comes next? Pick it.' }, hint: { zh, en }, explain: [kind, { pic: 'l1u5/' + name, a: 'l1u5/' + name + 'a', b: 'l1u5/' + name + 'b', answer: ans, rule: en }] });

  const sidesPic = () => `<span class="shp2"><svg viewBox="0 0 420 150" width="420" height="150" font-size="13" font-weight="800" fill="#c2410c">
    <polygon points="70,15 125,120 15,120" fill="#fff" stroke="#2b2b3a" stroke-width="2"/><line x1="150" y1="40" x2="105" y2="62" stroke="#c2410c" stroke-width="2"/><text x="153" y="44">(1)</text><circle cx="15" cy="120" r="4" fill="#ff6b35"/><line x1="15" y1="145" x2="15" y2="128" stroke="#c2410c" stroke-width="2"/><text x="22" y="146">(2)</text>
    <rect x="200" y="20" width="90" height="90" fill="#fff" stroke="#2b2b3a" stroke-width="2"/><circle cx="290" cy="20" r="4" fill="#ff6b35"/><line x1="320" y1="35" x2="296" y2="24" stroke="#c2410c" stroke-width="2"/><text x="322" y="40">(3)</text><line x1="245" y1="140" x2="245" y2="114" stroke="#c2410c" stroke-width="2"/><text x="252" y="143">(4)</text>
    <rect x="350" y="15" width="55" height="110" fill="#fff" stroke="#2b2b3a" stroke-width="2"/><line x1="330" y1="60" x2="347" y2="60" stroke="#c2410c" stroke-width="2"/><text x="305" y="64">(5)</text><circle cx="405" cy="125" r="4" fill="#ff6b35"/><line x1="395" y1="145" x2="402" y2="131" stroke="#c2410c" stroke-width="2"/><text x="372" y="146">(6)</text></svg></span>`;

  unit(5).kps = [
    {
      id: 'l1-5-1', available: true,
      title: { zh: '认识正方形、圆形、三角形、长方形', en: 'Identify and recognise squares, circles, triangles and rectangles' },
      intro: { zh: '正方形 square：4 条一样长的边。长方形 rectangle：4 条边，两长两短。三角形 triangle：3 条边。圆形 circle：圆圆的，没有边。', en: 'Square: 4 equal sides. Rectangle: 4 sides. Triangle: 3 sides. Circle: round.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '这是什么图形？', en: 'Study the pictures below. Fill in each blank with the correct answer' },
          example: { kind: 'l1shapename', n: { kind: 'sq' }, title: { zh: '4 条边一样长：square', en: 'square' } },
          questions: nameA.map(([kind, name], i) => F(`l1-5-1-A${i + 1}`, pic(shp(kind, { s: 2 })), '{{a}}', { a: choice(name, SH) }, ['l1shapename', { kind }], '这是什么图形？选一选', 'Name the shape', { label: `${L.ZH[name]} ${name}`, hint: { zh: '数一数有几条边。', en: 'Count the sides.' } })) },
        { id: 'B', type: 'match', title: { zh: '图形连名字', en: 'Match each shape to its correct name' },
          example: { kind: 'l1shapename', n: { kind: 'tri' }, title: { zh: '3 条边：triangle', en: 'triangle' } },
          questions: [{ id: 'l1-5-1-B1', type: 'match', label: '图形连名字', left: [['trid', 'triangle'], ['rectv', 'rectangle'], ['circ', 'circle'], ['dia', 'square']].map(([k, n]) => ({ id: k, html: shp(k, { s: 0.9 }), text: L.ZH[n] })), right: SH.map(n => ({ id: n, html: n, text: n })), pairs: { trid: 'triangle', rectv: 'rectangle', circ: 'circle', dia: 'square' }, prompt: { zh: '把每个图形和它的英文名字连起来（歪着的正方形也是正方形）', en: 'Match each shape to its name.' }, hint: { zh: '数边：3 条是 triangle，圆的是 circle，4 条一样长是 square（转一下还是它），两长两短是 rectangle。', en: 'Count the sides.' }, explain: ['l1shapename', { kind: 'dia' }] }] },
        { id: 'C', type: 'pickmany', title: { zh: '点出对的图形', en: 'For each question, colour the correct shape' },
          example: { kind: 'l1shapename', n: { kind: 'rect' }, title: { zh: '找出所有正方形', en: 'squares' } },
          questions: fieldC.map(([what, items, ans], i) => pm(`l1-5-1-C${i + 1}`, items, ans, `点出所有 ${what}`, `点出所有的 ${what}（${what.startsWith('not') ? '不是' : ''}${L.ZH[what.replace('not ', '').replace(/s$/, '')]}）`, `Pick all the ${what}.`, ['l1shapename', { kind: { circles: 'circ', triangles: 'tri', rectangles: 'rect' }[what.replace('not ', '')] }], { zh: what.startsWith('not') ? '“not” 是“不是”：把不是这种图形的都点出来。' : '一个一个看，是这种图形就点。', en: what.startsWith('not') ? '"Not" means pick the other shapes.' : 'Pick every one.' })) },
        { id: 'D', type: 'cycle', title: { zh: '给图形标号', en: "Write the number '1' on all rectangles, '2' on all triangles, '3' on all squares and '4' on all circles" },
          example: { kind: 'l1shapename', n: { kind: 'dia' }, title: { zh: '歪着的正方形还是正方形', en: 'A tilted square is still a square' } },
          questions: [{ id: 'l1-5-1-D1', type: 'cycle', label: '长方形 1、三角形 2、正方形 3、圆形 4', items: tagD.map(([kind, ans, o]) => ({ kind, o, ans })), labels: ['1', '2', '3', '4'], legend: '<b>1</b> rectangle 长方形　<b>2</b> triangle 三角形　<b>3</b> square 正方形　<b>4</b> circle 圆形', prompt: { zh: '长方形标 1，三角形标 2，正方形标 3，圆形标 4', en: '1 on rectangles, 2 on triangles, 3 on squares, 4 on circles.' } }] },
        { id: 'E', type: 'fill', title: { zh: '缺了什么图形？', en: 'Name the missing shape(s) in each picture' },
          example: { kind: 'l1shapename', n: { kind: 'sq' }, title: { zh: '机器人：三角形、圆形、长方形都有，缺正方形', en: 'The robot has no square' } },
          questions: missE.map(([name, ans], i) => F(`l1-5-1-E${i + 1}`, pic(img(name, 220)), ans.length === 1 ? 'Missing: {{a}}' : 'Missing: {{a}} and {{b}}', ans.length === 1 ? { a: choice(ans[0], SH) } : { a: choice(ans[0], SH), b: choice(ans[1], SH) }, ['l1shapename', { kind: { square: 'sq', circle: 'circ', triangle: 'tri', rectangle: 'rect' }[ans[0]] }], '四种图形里，这幅画缺了哪种？', 'Which shape is missing?', { accept: ans.length === 2 ? [{ a: ans[0], b: ans[1] }, { a: ans[1], b: ans[0] }] : undefined, label: `${name}：缺 ${ans.join(', ')}`, hint: { zh: '正方形、三角形、圆形、长方形，一个一个找，哪个找不到？', en: 'Which of the four shapes is not there?' } })) },
        { id: 'F', type: 'fill', title: { zh: '城堡里有几个图形', en: 'The picture below is made up of different shapes. Count the squares, rectangles, circles and triangles' },
          example: { kind: 'l1shapename', n: { kind: 'tri' }, title: { zh: '屋顶和旗子都是三角形', en: 'Roofs and flags are triangles' } },
          questions: [F('l1-5-1-F1', pic(img('castle', 420)), 'There are {{s}} squares.\nThere are {{r}} rectangles.\nThere are {{c}} circles.\nThere are {{t}} triangles.', { s: { a: 6 }, r: { a: 7 }, c: { a: 3 }, t: { a: 5 } }, ['l1shapename', { kind: 'rect' }], '数一数城堡里有几个正方形、长方形、圆形、三角形', 'Count the shapes', { label: '城堡：6 正方形、7 长方形、3 圆形、5 三角形', hint: { zh: '小窗户是正方形（6 个）；门、塔、旗杆、墙是长方形；塔顶的球和门把手是圆形；屋顶和旗子是三角形。', en: 'Windows are squares; towers, walls, poles and door are rectangles.' } })] },
      ],
    },
    {
      id: 'l1-5-2', available: true,
      title: { zh: '边和角', en: 'Name sides and corners of shapes' },
      intro: { zh: '边 side 是直直的线；角 corner 是两条边碰到的尖尖的地方。圆形没有边也没有角。', en: 'A side is a straight line. A corner is where two sides meet. A circle has none.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: 'side 还是 corner', en: 'Fill in each blank with the words "side" or "corner"' },
          example: { kind: 'l1sides', n: { kind: 'tri' }, title: { zh: '三角形：3 条边 3 个角', en: 'triangle: 3 sides, 3 corners' } },
          questions: [F('l1-5-2-A1', pic(sidesPic()), '(1) {{a}}　(2) {{b}}\n(3) {{c}}　(4) {{d}}\n(5) {{e}}　(6) {{f}}', { a: choice('side', ['side', 'corner']), b: choice('corner', ['side', 'corner']), c: choice('corner', ['side', 'corner']), d: choice('side', ['side', 'corner']), e: choice('side', ['side', 'corner']), f: choice('corner', ['side', 'corner']) }, ['l1sides', { kind: 'sq' }], '箭头指着的是边 side 还是角 corner？', 'side or corner?', { label: '边和角：side, corner, corner, side, side, corner', hint: { zh: '指着直线的是 side，指着尖尖点的是 corner。', en: 'Line: side. Point: corner.' } })] },
        { id: 'B', type: 'fill', title: { zh: '数边和角', en: 'Count and write the number of sides and corners' },
          example: { kind: 'l1sides', n: { kind: 'circ' }, title: { zh: '圆形：0 条边 0 个角', en: 'circle: 0 sides, 0 corners' } },
          questions: [F('l1-5-2-B1', pic(`<div class="shaperow">${sidesB.map(([k, n]) => `<span class="shp2 lab">${shp(k, { s: 1.2 })}<i>${n}</i></span>`).join('')}</div>`), sidesB.map(([k, n], i) => `${n}: {{s${i}}} sides, {{c${i}}} corners`).join('\n'), Object.fromEntries(sidesB.flatMap(([k, n, v], i) => [[`s${i}`, { a: v }], [`c${i}`, { a: v }]])), ['l1sides', { kind: 'rect' }], '每个图形有几条边、几个角？', 'How many sides and corners?', { label: 'square 4/4, circle 0/0, triangle 3/3, rectangle 4/4', hint: { zh: '沿着图形一圈数边，再数尖尖的角。圆形都是 0。', en: 'Count around the shape.' } })] },
      ],
    },
    {
      id: 'l1-5-3', available: true,
      title: { zh: '按大小、形状、颜色分类', en: 'Group shapes by size, shape and colour' },
      intro: { zh: '分类可以按形状 shape、大小 size 或颜色 colour。看每个框里的图形什么是一样的。', en: 'Shapes can be grouped by shape, size or colour.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '按什么分的？', en: 'Fill in each blank with the words "size", "shape" or "colour"' },
          example: { kind: 'l1group', n: { pic: 'l1u5/g1', by: 'colour' }, title: { zh: '左框都是浅色，右框都是深色：按颜色分', en: 'grouped by colour' } },
          questions: groupA.map(([name, by, not], i) => F(`l1-5-3-A${i + 1}`, pic(img(name, 460)), not ? 'The shapes are not grouped by {{a}}.' : 'The shapes are grouped by {{a}}.', { a: choice(by, ['size', 'shape', 'colour']) }, ['l1group', { pic: 'l1u5/' + name, by, not }], not ? '这两框图形没有按什么分？' : '这两框图形是按什么分的？', not ? 'Not grouped by what?' : 'Grouped by what?', { label: `${name}：${not ? 'not ' : ''}${by}`, hint: { zh: not ? '哪一样在同一个框里是乱的（有大有小、有深有浅、形状不同）？' : '哪一样在同一个框里是一样的？', en: not ? 'Which one is mixed inside each box?' : 'Which one is the same inside each box?' } })) },
        { id: 'B', type: 'pickmany', title: { zh: '找两个一样的', en: 'For each question, colour the two similar shapes' },
          example: { kind: 'l1similar', n: { items: [K('circ'), K('rtri'), K('circ', { s: 0.6 }), K('sq'), K('circ', { s: 0.6 })], ans: [2, 4] }, title: { zh: '两个小圆一样', en: 'the two small circles' } },
          questions: simB.map(([items, ans], i) => pm(`l1-5-3-B${i + 1}`, items, ans, `找两个一样的 (${i + 1})`, '哪两个形状一样、大小也一样？点出来', 'Pick the two similar shapes.', ['l1similar', { items, ans }], { zh: '形状和大小都要一样才算。', en: 'Same shape and same size.' })) },
      ],
    },
    {
      id: 'l1-5-4', available: true,
      title: { zh: '生活中的图形', en: 'Identify and recognise shapes in everyday objects' },
      intro: { zh: '很多东西的样子就是这些图形：钟是圆形，门是长方形，三角尺是三角形。看轮廓。', en: 'Look at the outline of everyday objects.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '这个东西是什么形状？', en: 'Name the shape of each object' },
          example: { kind: 'l1objshape', n: { pic: 'l1u5/o4', shape: 'square', zh: '便条纸四条边一样长。' }, title: { zh: '便条纸：square', en: 'square' } },
          questions: objA.map(([name, shape, zh], i) => F(`l1-5-4-A${i + 1}`, pic(img(name, 200)), '{{a}}', { a: choice(shape, SH) }, ['l1objshape', { pic: 'l1u5/' + name, shape }], `${zh}是什么形状？`, 'Name the shape', { label: `${zh}：${shape}`, hint: { zh: '看外面的轮廓。', en: 'Look at the outline.' } })) },
        { id: 'B', type: 'fill', title: { zh: '该涂什么颜色？', en: 'Colour the shapes accordingly: square = blue, circle = yellow, rectangle = red, triangle = green' },
          example: { kind: 'l1objshape', n: { pic: 'l1u5/b4', shape: 'circle' }, title: { zh: '钟是圆形，涂黄色', en: 'clock: circle = yellow' } },
          questions: colB.map(([name, shape, zh], i) => F(`l1-5-4-B${i + 1}`, pic(img(name, 200)), '{{a}}', { a: choice(COL[shape], ['blue', 'yellow', 'red', 'green']) }, ['l1objshape', { pic: 'l1u5/' + name, shape }], `${zh}是什么形状？按规则该涂什么颜色？（square 蓝、circle 黄、rectangle 红、triangle 绿）`, 'Which colour?', { label: `${zh}：${shape} = ${COL[shape]}`, hint: { zh: `它是 ${shape}。square = blue，circle = yellow，rectangle = red，triangle = green。`, en: `It is a ${shape}.` } })) },
        { id: 'C', type: 'pickmany', title: { zh: '哪些东西有这个形状', en: 'Name the objects that have the given shapes' },
          example: { kind: 'l1objshape', n: { pic: 'l1u5/o2', shape: 'rectangle' }, title: { zh: '门是长方形', en: 'door: rectangle' } },
          questions: haveC.map(([name, shape, opts, ans], i) => ({ id: `l1-5-4-C${i + 1}`, type: 'pickmany', pic: pic(img(name, 460)), label: `${shape}：${ans.join(', ')}`, options: opts.map(o => ({ val: o, html: o, text: o })), answer: ans, prompt: { zh: `哪两样东西是 ${shape}（${L.ZH[shape]}）？点出来`, en: `Which objects are ${shape}s?` }, explain: ['l1objshape', { pic: 'l1u5/' + name, shape }], hint: { zh: '看每样东西的轮廓，有两样是。', en: 'Two of them.' } })) },
        { id: 'D', type: 'pickmany', title: { zh: '哪些东西没有这个形状', en: 'Name the objects that do not have the given shapes' },
          example: { kind: 'l1objshape', n: { pic: 'l1u5/o7', shape: 'circle' }, title: { zh: '球是圆形', en: 'ball: circle' } },
          questions: notD.map(([name, shape, opts, ans], i) => ({ id: `l1-5-4-D${i + 1}`, type: 'pickmany', pic: pic(img(name, 460)), label: `not ${shape}：${ans.join(', ')}`, options: opts.map(o => ({ val: o, html: o, text: o })), answer: ans, prompt: { zh: `哪两样东西<b>不是</b> ${shape}（${L.ZH[shape]}）？点出来`, en: `Which objects do not have a ${shape}?` }, explain: ['l1objshape', { pic: 'l1u5/' + name, shape }], hint: { zh: '先找出是这个形状的，剩下的两样就是。', en: 'Find the two that are not.' } })) },
        { id: 'E', type: 'fill', title: { zh: '底面是什么形状', en: 'Trace the bottom of each object and name the shape' },
          example: { kind: 'l1objshape', n: { pic: 'l1u5/t3', shape: 'circle', zh: '罐子的底是圆的。' }, title: { zh: '罐子底：circle', en: 'circle' } },
          questions: traceE.map(([name, shape, zh], i) => F(`l1-5-4-E${i + 1}`, pic(img(name, 180)), '{{a}}', { a: choice(shape, SH) }, ['l1objshape', { pic: 'l1u5/' + name, shape }], `${zh}放在桌上，底面是什么形状？`, 'What shape is the bottom?', { label: `${zh}底面：${shape}`, hint: { zh: '想象把它放在纸上描一圈底边。', en: 'Imagine tracing around the bottom.' } })) },
      ],
    },
    {
      id: 'l1-5-5', available: true,
      title: { zh: '找规律', en: 'Complete patterns in sequence' },
      intro: { zh: '规律就是一组一组重复。看看是什么在变：形状、颜色、大小、方向，再接着填。', en: 'A pattern repeats. Find what changes: shape, colour, size or position.' },
      sections: [
        { id: 'A', type: 'patfill', title: { zh: '补全规律', en: 'Complete the patterns' },
          example: { kind: 'l1pattern', n: { seq: [K('circ'), K('tri'), K('sq'), K('circ'), K('tri'), K('sq'), K('circ'), K('tri'), K('sq')], blanks: [7, 8], rule: '形状在变：圆、三角、正方形。' }, title: { zh: '○ △ □ 重复', en: 'circle, triangle, square' } },
          questions: patA.map((p, i) => Object.assign({ id: `l1-5-5-A${i + 1}`, type: 'patfill', label: `规律 ${i + 1}：${p.rule}` }, p)) },
        { id: 'B', type: 'pickone', title: { zh: '下一个图形是什么', en: 'What is the next figure in the pattern? Tick the correct answer' },
          example: { kind: 'l1patimg', n: { pic: 'l1u5/pb1', a: 'l1u5/pb1a', b: 'l1u5/pb1b', answer: 1, rule: 'A change in colour.' }, title: { zh: '颜色在变', en: 'A change in colour' } },
          questions: patB.map(([name, ans, en, zh], i) => imgPick(`l1-5-5-B${i + 1}`, name, ans, en, zh, 'l1patimg')) },
        { id: 'C', type: 'pickone', title: { zh: '下一个物体是什么', en: 'What is the next object in the pattern? Tick the correct answer' },
          example: { kind: 'l1patimg', n: { pic: 'l1u5/pc2', a: 'l1u5/pc2a', b: 'l1u5/pc2b', answer: 1, rule: 'A change in position.' }, title: { zh: '方向在变', en: 'A change in position' } },
          questions: patC.map(([name, ans, en, zh], i) => imgPick(`l1-5-5-C${i + 1}`, name, ans, en, zh, 'l1patimg')) },
      ],
    },
  ];
})();
