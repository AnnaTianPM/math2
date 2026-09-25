/* Unit 13 平面图形与立体图形 */
(function () {
  const U = window.MATH_DATA.units;
  const unit = num => U.find(u => u.num === num);
  const SU = window.ShapeUI;
  const sh = (k, o) => SU.shape2d(k, Object.assign({ w: 90 }, o || {}));
  const so = (k, o) => SU.solid3d(k, Object.assign({ w: 90 }, o || {}));
  const img = SU.img;
  const NAMES2 = ['square', 'rectangle', 'triangle', 'circle', 'semicircle', 'quarter circle'];
  const NAMES3 = ['cube', 'cuboid', 'cone', 'cylinder', 'sphere'];
  const k2 = name => name === 'quarter circle' ? 'quarter' : name;

  // 认名字（选择）
  const nameQ = (id, pic, answer, options, explainKind, kind) => ({ id, type: 'fill', pic, label: `这是什么图形（${answer}）`, prompt: { zh: '这是什么图形？', en: 'Identify the shape' },
    text: 'This is a {{n}}.', fields: { n: { a: answer, kind: 'choice', options } }, answerText: answer, explain: [explainKind, { kind }],
    hint: { zh: '数一数有几条边、有没有弯的边。', en: 'Count the sides. Any curves?' } });
  // 直线/曲线 网格
  const lcAns = 'B A C A A C B C C B A B A C B C B A C C'.split(' ');
  // 有平面 网格
  const fsAns = '✓ ✗ ✗ ✓ ✗ ✓ ✓ ✗ ✓ ✗ ✓ ✗ ✗ ✓ ✗ ✓ ✓ ✗ ✗ ✓'.split(' ');
  // C 部分 20 个图形（自己画）：编号答案 1 square 2 rectangle 3 triangle 4 circle 5 semicircle 6 quarter
  const cShapes = [
    ['triangle', {}], ['quarter', { rot: 90, size: .7 }], ['circle', {}], ['triangle', { variant: 'right', rot: 180, size: .9 }],
    ['quarter', { rot: 180, size: .6 }], ['semicircle', { rot: 90 }], ['rectangle', { variant: 'tall' }], ['semicircle', { size: .8 }], ['square', { size: .7 }],
    ['quarter', { size: .8 }], ['triangle', { variant: 'down', size: .5 }], ['circle', { size: .45 }], ['quarter', { rot: 90, size: .8 }],
    ['square', { rot: 45 }], ['semicircle', { rot: 270, size: .6 }], ['rectangle', {}], ['circle', { size: .7 }], ['triangle', { variant: 'right', size: .9 }], ['semicircle', { rot: 180 }],
  ];
  const cAns = ['3', '6', '4', '3', '6', '5', '2', '5', '1', '6', '3', '4', '6', '1', '5', '2', '4', '3', '5'];
  // 组合图形 A
  const combA = [['triangle', 'rectangle'], ['circle', 'square'], ['triangle', 'quarter'], ['rectangle', 'circle'], ['semicircle', 'quarter'], ['square', 'rectangle'], ['circle', 'semicircle'], ['square', 'quarter'], ['triangle', 'circle'], ['semicircle', 'rectangle']];
  const nm = k => k === 'quarter' ? 'quarter circle' : k;
  // 组合图形 B：题干 + 正确选项
  const combB = [['a square and a rectangle', 1], ['a triangle and a circle', 2], ['a semicircle and a quarter circle', 0], ['a square and a circle', 1], ['a rectangle and a semicircle', 2], ['a triangle and a quarter circle', 1], ['a square and a triangle', 0], ['a rectangle and a quarter circle', 2], ['a circle and a semicircle', 1], ['a square and a quarter circle', 2]];
  // 组合图形 C：图形由哪些拼成（选择）
  const combC = [['semicircle, rectangle', ['semicircle', 'rectangle']], ['triangle, rectangle, semicircle', ['triangle', 'rectangle', 'semicircle']], ['semicircle, quarter circle, triangle', ['semicircle', 'quarter', 'triangle']], ['quarter circle, quarter circle, rectangle', ['quarter', 'quarter', 'rectangle']], ['triangle, triangle, square, triangle, triangle', ['triangle', 'square']], ['quarter circle, quarter circle', ['quarter', 'quarter']], ['rectangle, triangle, semicircle', ['rectangle', 'triangle', 'semicircle']], ['quarter circle, square, quarter circle', ['quarter', 'square']], ['square, square, semicircle', ['square', 'semicircle']], ['triangle, quarter circle', ['triangle', 'quarter']]];
  const combCopts = [['semicircle, rectangle', 'circle, square', 'quarter circle, rectangle'], ['triangle, rectangle, semicircle', 'triangle, square, circle', 'rectangle, semicircle'], ['semicircle, quarter circle, triangle', 'circle, triangle', 'semicircle, semicircle, square'], ['quarter circle, quarter circle, rectangle', 'semicircle, rectangle', 'circle, square'], ['4 triangles and a square', '4 squares', '2 triangles and a circle'], ['2 quarter circles', 'a semicircle and a circle', '2 semicircles'], ['rectangle, triangle, semicircle', 'square, triangle, circle', 'rectangle, quarter circle'], ['2 quarter circles and a square', 'a circle and a square', '2 semicircles and a rectangle'], ['2 squares and a semicircle', 'a rectangle and a circle', '2 rectangles and a quarter circle'], ['a triangle and a quarter circle', 'a triangle and a semicircle', 'a rectangle and a quarter circle']];
  const combCans = ['semicircle, rectangle', 'triangle, rectangle, semicircle', 'semicircle, quarter circle, triangle', 'quarter circle, quarter circle, rectangle', '4 triangles and a square', '2 quarter circles', 'rectangle, triangle, semicircle', '2 quarter circles and a square', '2 squares and a semicircle', 'a triangle and a quarter circle'];
  // 立体组合 A
  const combSo = [['cylinder', 'cuboid'], ['cone', 'cylinder'], ['cube', 'cuboid'], ['cuboid', 'cylinder'], ['cone', 'cube'], ['sphere', 'cube'], ['sphere', 'cylinder'], ['cone', 'cuboid'], ['sphere', 'cuboid'], ['cone', 'cube']];
  const combSoB = [['cube', 'cone', 'sphere'], ['cube', 'cuboid', 'cylinder'], ['cuboid', 'cone', 'sphere'], ['cube', 'cone', 'cylinder'], ['cuboid', 'cylinder', 'sphere']];

  // 规律：T(k, opts)
  const T = (k, o) => Object.assign({ k }, o || {});
  const sq = o => T('square', o), tri = o => T('triangle', o), cir = o => T('circle', o), semi = o => T('semicircle', o), qua = o => T('quarter', o), rect = o => T('rectangle', o);
  const cube = o => T('cube', o), cuboid = o => T('cuboid', o), cone = o => T('cone', o), cyl = o => T('cylinder', o), sph = o => T('sphere', o);
  const rep = (unit, n) => Array.from({ length: n }, (_, i) => unit[i % unit.length]);
  const patQ = (id, unit, options, answerTok) => {
    const seq = rep(unit, 8), next = unit[8 % unit.length];
    const ansIdx = options.findIndex(o => JSON.stringify(o) === JSON.stringify(next));
    return { id, type: 'pickone', pic: `<div class="pat-row">${seq.map(t => `<span class="pat-cell">${SU.tok(t, { w: 64 })}</span>`).join('')}<span class="pat-cell next"><b>?</b></span></div>`,
      options: options.map(o => SU.tok(o, { w: 70 })), answer: ansIdx, label: '找规律：下一个是什么',
      prompt: { zh: '找规律，下一个是哪个？', en: 'Which comes next?' }, explain: ['pattern2', { seq, period: unit.length, next }],
      hint: { zh: `找出重复的一组（${unit.length} 个），再数数第 9 个是这一组里的第几个。`, en: `Find the repeating group of ${unit.length}.` } };
  };

  unit(13).kps = [
    {
      id: 'u13-1', available: true,
      title: { zh: '认识平面图形', en: 'Recognise squares, rectangles, triangles, circles, semicircles and quarter circles' },
      intro: { zh: '正方形 square、长方形 rectangle、三角形 triangle、圆形 circle、半圆 semicircle、四分之一圆 quarter circle。看边是直的还是弯的、有几条边。', en: 'Six flat shapes. Look at the sides: straight or curved, and how many.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '这是什么图形？', en: 'Identify the shapes below' },
          example: { kind: 'shapesall', n: {}, title: { zh: '六种平面图形', en: 'Six flat shapes' } },
          questions: [['triangle', 'triangle', {}], ['quarter', 'quarter circle', {}], ['square', 'square', {}], ['circle', 'circle', {}], ['rectangle', 'rectangle', {}], ['semicircle', 'semicircle', {}]]
            .map(([k, a, o], i) => nameQ(`u13-1-A${i + 1}`, sh(k, Object.assign({ w: 140 }, o)), a, NAMES2, 'shape2d', k)) },
        { id: 'B', type: 'fill', title: { zh: '转个方向还认识吗？', en: 'Match each shape to its correct name' },
          example: { kind: 'shape2d', n: { kind: 'square' }, title: { zh: '正方形转 45° 还是正方形', en: 'A turned square is still a square' } },
          questions: [['semicircle', 'semicircle', { rot: 180 }], ['square', 'square', { rot: 45 }], ['quarter', 'quarter circle', { rot: 90 }], ['rectangle', 'rectangle', { variant: 'tall' }], ['circle', 'circle', {}], ['triangle', 'triangle', { variant: 'down' }]]
            .map(([k, a, o], i) => nameQ(`u13-1-B${i + 1}`, sh(k, Object.assign({ w: 140 }, o)), a, NAMES2, 'shape2d', k)) },
        { id: 'C', type: 'gridq', title: { zh: '给图形编号：1 正方形 2 长方形 3 三角形 4 圆 5 半圆 6 四分之一圆', en: "Write '1' on squares, '2' on rectangles, '3' on triangles, '4' on circles, '5' on semicircles and '6' on quarter circles" },
          example: { kind: 'shapesall', n: {}, title: { zh: '六种图形对应 1 到 6', en: 'Shapes 1 to 6' } },
          questions: [{ id: 'u13-1-C1', type: 'gridq', cols: 5, label: '20 个图形编号', prompt: { zh: '每个图形是几号？（1 正方形 2 长方形 3 三角形 4 圆 5 半圆 6 四分之一圆）', en: '1 square, 2 rectangle, 3 triangle, 4 circle, 5 semicircle, 6 quarter circle' },
            items: cShapes.map(([k, o], i) => ({ pic: sh(k, Object.assign({ w: 80 }, o)), field: { a: cAns[i], kind: 'choice', options: ['1', '2', '3', '4', '5', '6'] } })),
            hint: { zh: '先看有没有弯的边：没有弯边的是 1、2、3；圆的是 4；一条直边一条弧是 5；两条直边一条弧是 6。', en: 'Curved or straight sides? How many?' }, explain: ['shapesall', {}] }] },
        { id: 'D', type: 'gridq', title: { zh: 'A 只有直线，B 只有曲线，C 既有直线又有曲线', en: "Write 'A' below figures with straight lines only, 'B' curves only, 'C' both" },
          example: { kind: 'linecurve', n: {}, title: { zh: '直线、曲线怎么分', en: 'Straight lines and curves' } },
          questions: [0, 1, 2, 3].map(r => ({ id: `u13-1-D${r + 1}`, type: 'gridq', cols: 5, label: `直线/曲线 第 ${r + 1} 组`, prompt: { zh: '每个图形：A 只有直线，B 只有曲线，C 两种都有', en: 'A straight only, B curves only, C both' },
            items: Array.from({ length: 5 }, (_, j) => ({ pic: img(`u13/lc${r * 5 + j + 1}`, 110), field: { a: lcAns[r * 5 + j], kind: 'choice', options: ['A', 'B', 'C'] } })),
            hint: { zh: '用手指沿着图形的边走一圈：全是直的选 A，全是弯的选 B，有直有弯选 C。', en: 'Trace the edges: all straight A, all curved B, both C.' }, explain: ['linecurve', {}] })) },
      ],
    },
    {
      id: 'u13-2', available: true,
      title: { zh: '拼图形：把图形组合起来', en: 'Combine shapes to make new figures' },
      intro: { zh: '两个或几个图形拼在一起可以变成新图形。反过来，看到一个图形，想一想它是由哪些图形拼成的。', en: 'Shapes can be put together to make new figures.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '这个图形由哪两个图形组成？', en: 'Each figure is made up of two different shapes. Name the two shapes' },
          example: { kind: 'combine', n: { pic: 'u13/cs1', parts: ['triangle', 'rectangle'] }, title: { zh: '三角形 + 长方形', en: 'triangle and rectangle' } },
          questions: combA.map(([a, b], i) => ({ id: `u13-2-A${i + 1}`, type: 'fill', pic: img(`u13/cs${i + 1}`, 200), label: `${nm(a)} + ${nm(b)}`, prompt: { zh: '这个图形由哪两个图形组成？', en: 'Name the two shapes' },
            text: 'This figure is made up of a {{a}}\nand a {{b}}.', fields: { a: { a: nm(a), kind: 'choice', options: NAMES2 }, b: { a: nm(b), kind: 'choice', options: NAMES2 } },
            accept: [{ a: nm(a), b: nm(b) }, { a: nm(b), b: nm(a) }], answerText: `${nm(a)} and ${nm(b)}`, explain: ['combine', { pic: `u13/cs${i + 1}`, parts: [a, b] }],
            hint: { zh: '想象在图形中间画一条线，把它分成两块，每一块是什么？', en: 'Imagine a line cutting the figure into two parts.' } })) },
        { id: 'B', type: 'pickone', title: { zh: '哪个图形是这两个拼成的？', en: 'Circle the correct figure' },
          example: { kind: 'combine', n: { pic: 'u13/csb1_2', parts: ['square', 'rectangle'] }, title: { zh: '正方形 + 长方形', en: 'square and rectangle' } },
          questions: combB.map(([desc, ans], i) => ({ id: `u13-2-B${i + 1}`, type: 'pickone', pic: `<div class="wp-en">This figure is made up of ${desc}.</div>`, options: [1, 2, 3].map(k => img(`u13/csb${i + 1}_${k}`, 130)), answer: ans, label: desc,
            prompt: { zh: '哪一个是由这两个图形拼成的？', en: 'Which figure?' }, explain: ['combine', { pic: `u13/csb${i + 1}_${ans + 1}`, parts: desc.replace(/^a /, '').split(' and a ').map(k2) }],
            hint: { zh: '每个图形都试着分成两块，看是不是题目说的那两种。', en: 'Split each figure into two parts and check.' } })) },
        { id: 'C', type: 'fill', title: { zh: '这个图形是由哪些图形拼成的？', en: 'Draw lines to show the different shapes that make up each figure' },
          example: { kind: 'combine', n: { pic: 'u13/cc1', parts: ['semicircle', 'rectangle'] }, title: { zh: '半圆 + 长方形', en: 'semicircle and rectangle' } },
          questions: combC.map(([ans, parts], i) => ({ id: `u13-2-C${i + 1}`, type: 'fill', pic: img(`u13/cc${i + 1}`, 220), label: combCans[i], prompt: { zh: '想一想，在哪里画线能把它分成基本图形？它由什么拼成？', en: 'Which shapes make up this figure?' },
            text: 'This figure is made up of: {{a}}', fields: { a: { a: combCans[i], kind: 'choice', options: combCopts[i] } }, answerText: combCans[i], explain: ['combine', { pic: `u13/cc${i + 1}`, parts: [parts[0], parts[1]] }],
            hint: { zh: '找到图形里"直的一段"和"弯的一段"分别属于哪种图形。', en: 'Find the straight parts and the curved parts.' } })) },
        { id: 'D', type: 'fill', title: { zh: '数一数图里有几个什么图形', en: 'Look at each figure carefully and fill in the blanks' },
          example: { kind: 'countshapes', n: { pic: 'u13/ship', counts: { square: 8, rectangle: 3, circle: 6, semicircle: 2, quarter: 3, triangle: 4 } }, title: { zh: '数船上的图形', en: 'Count the shapes on the ship' } },
          questions: [['ship', [8, 3, 6, 2, 3, 4]], ['robot', [3, 9, 6, 4, 4, 5]]].map(([pic, c], i) => ({ id: `u13-2-D${i + 1}`, type: 'fill', pic: img(`u13/${pic}`, 360), label: `数${pic === 'ship' ? '船' : '机器人'}上的图形`, prompt: { zh: '这个图形是由几个什么组成的？', en: 'The figure is formed by' },
            text: '(a) {{s}} squares\n(b) {{r}} rectangles\n(c) {{c}} circles\n(d) {{m}} semicircles\n(e) {{q}} quarter circles\n(f) {{t}} triangles',
            fields: { s: { a: c[0] }, r: { a: c[1] }, c: { a: c[2] }, m: { a: c[3] }, q: { a: c[4] }, t: { a: c[5] } }, answerText: c.join(', '),
            explain: ['countshapes', { pic: `u13/${pic}`, counts: { square: c[0], rectangle: c[1], circle: c[2], semicircle: c[3], quarter: c[4], triangle: c[5] } }],
            hint: { zh: '一种一种地数，数过的用手指按住，别数漏也别数重。', en: 'Count one kind at a time.' } })) },
      ],
    },
    {
      id: 'u13-3', available: true,
      title: { zh: '在点格纸上画图形', en: 'Draw figures using dot or square grid paper' },
      intro: { zh: '照着左边的图，在右边的点格上画一模一样的：数清楚每条边走了几个点，从同样的位置开始画。', en: 'Copy the shape: count the dots on each side and start from the same spot.' },
      sections: [
        { id: 'A', type: 'gridcopy', title: { zh: '在点格上画', en: 'Draw the same shape on the dot grid' },
          example: { kind: 'gridcopy', n: {}, title: { zh: '怎么在点格上画图', en: 'How to draw on a dot grid' } },
          questions: [[[1, 1], [4, 1], [4, 4], [3, 5], [2, 5], [1, 4]], [[3, 1], [4, 1], [5, 2], [5, 5], [4, 6], [3, 6], [3, 4], [1, 4], [1, 3], [3, 3]], [[1, 5], [1, 3], [3, 1], [4, 2], [6, 0], [7, 1], [7, 5]], [[1, 1], [3, 1], [3, 3], [5, 3], [5, 1], [7, 1], [7, 6], [1, 6]], [[2, 1], [6, 1], [6, 2], [3, 5], [6, 5], [6, 6], [1, 6], [1, 5], [4, 2], [2, 2]]]
            .map((poly, i) => ({ id: `u13-3-A${i + 1}`, type: 'gridcopy', grid: 'dot', n: 8, poly, label: `点格画图 ${i + 1}` })) },
        { id: 'B', type: 'gridcopy', title: { zh: '在方格上画', en: 'Draw the same shape on the square grid' },
          example: { kind: 'gridcopy', n: {}, title: { zh: '方格和点格一样，点在格子的角上', en: 'On a square grid the dots are the corners' } },
          questions: [[[0, 0], [5, 0], [5, 1], [4, 1], [4, 3], [3, 3], [3, 4], [2, 4], [2, 3], [1, 3], [1, 1], [0, 1]], [[0, 2], [2, 0], [4, 2], [3, 2], [3, 4], [5, 4], [5, 5], [1, 5], [1, 2]], [[1, 0], [5, 0], [2, 2], [5, 3], [5, 4], [1, 4]], [[0, 5], [0, 4], [1, 4], [1, 2], [2, 0], [3, 2], [3, 3], [4, 3], [4, 4], [5, 4], [5, 5]], [[0, 0], [3, 0], [3, 1], [2, 1], [2, 2], [1, 2], [1, 3], [2, 3], [2, 4], [5, 4], [5, 5], [0, 5]]]
            .map((poly, i) => ({ id: `u13-3-B${i + 1}`, type: 'gridcopy', grid: 'square', n: 6, poly, label: `方格画图 ${i + 1}` })) },
      ],
    },
    {
      id: 'u13-4', available: true,
      title: { zh: '认识立体图形', en: 'Recognise cubes, cuboids, cones, cylinders and spheres' },
      intro: { zh: '正方体 cube、长方体 cuboid、圆锥 cone、圆柱 cylinder、球 sphere。看它有没有尖尖的顶、平平的面、圆圆的边。', en: 'Five solids: cube, cuboid, cone, cylinder, sphere.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '这是什么立体图形？', en: 'Name the solids below' },
          example: { kind: 'solidsall', n: {}, title: { zh: '五种立体图形', en: 'Five solids' } },
          questions: ['cuboid', 'cone', 'cylinder', 'cube', 'sphere'].map((k, i) => nameQ(`u13-4-A${i + 1}`, img(`u13/sa${i + 1}`, 160), k, NAMES3, 'solid3d', k)) },
        { id: 'B', type: 'fill', title: { zh: '换个样子还认识吗？', en: 'Match each solid to its correct name' },
          example: { kind: 'solid3d', n: { kind: 'cylinder' }, title: { zh: '扁扁的圆柱也是圆柱', en: 'A flat cylinder is still a cylinder' } },
          questions: ['sphere', 'cuboid', 'cone', 'cube', 'cylinder'].map((k, i) => nameQ(`u13-4-B${i + 1}`, img(`u13/sb${i + 1}`, 160), k, NAMES3, 'solid3d', k)) },
        { id: 'C', type: 'fill', title: { zh: '生活中的立体图形', en: 'Identify the solids below' },
          example: { kind: 'solidsall', n: {}, title: { zh: '骰子是正方体，足球是球', en: 'A dice is a cube, a ball is a sphere' } },
          questions: ['cube', 'sphere', 'cone', 'cylinder', 'cuboid'].map((k, i) => nameQ(`u13-4-C${i + 1}`, img(`u13/sc${i + 1}`, 180), k, NAMES3, 'solid3d', k)) },
        { id: 'D', type: 'gridq', title: { zh: '有平面打 ✓，没有平面打 ✗', en: 'Tick the solids that have flat surfaces and cross those that do not' },
          example: { kind: 'flatsurface', n: {}, title: { zh: '什么是平面', en: 'Flat surfaces' } },
          questions: [0, 1, 2, 3].map(r => ({ id: `u13-4-D${r + 1}`, type: 'gridq', cols: 5, label: `平面 第 ${r + 1} 组`, prompt: { zh: '这个东西有平平的面吗？有打 ✓，没有打 ✗', en: 'Flat surface? ✓ or ✗' },
            items: Array.from({ length: 5 }, (_, j) => ({ pic: img(`u13/fs${r * 5 + j + 1}`, 110), field: { a: fsAns[r * 5 + j], kind: 'choice', options: ['✓', '✗'] } })),
            hint: { zh: '想一想：把它放在桌上，能不能稳稳地站住？软的、圆的东西没有平面。', en: 'Can it stand steadily on a table?' }, explain: ['flatsurface', {}] })) },
      ],
    },
    {
      id: 'u13-5', available: true,
      title: { zh: '拼立体图形', en: 'Combine solids to make new figures' },
      intro: { zh: '几个立体图形叠在一起可以拼成新东西。看看每一部分是什么。', en: 'Solids can be stacked to make new figures.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '由哪两个立体图形组成？', en: 'Each figure is made up of two different solids. Name the two solids' },
          example: { kind: 'combine', n: { pic: 'u13/cso1', parts: ['cylinder', 'cuboid'] }, title: { zh: '圆柱 + 长方体', en: 'cylinder and cuboid' } },
          questions: combSo.map(([a, b], i) => ({ id: `u13-5-A${i + 1}`, type: 'fill', pic: img(`u13/cso${i + 1}`, 200), label: `${a} + ${b}`, prompt: { zh: '这个图形由哪两个立体图形组成？', en: 'Name the two solids' },
            text: 'This figure is made up of a {{a}}\nand a {{b}}.', fields: { a: { a, kind: 'choice', options: NAMES3 }, b: { a: b, kind: 'choice', options: NAMES3 } },
            accept: [{ a, b }, { a: b, b: a }], answerText: `${a} and ${b}`, explain: ['combine', { pic: `u13/cso${i + 1}`, parts: [a, b] }],
            hint: { zh: '上面一块是什么？下面一块是什么？', en: 'What is on top? What is at the bottom?' } })) },
        { id: 'B', type: 'gridq', title: { zh: '用到了哪些立体图形？（用到的打 ✓）', en: 'Put a tick below the solids that make up each figure' },
          example: { kind: 'solidsall', n: {}, title: { zh: '五种立体图形', en: 'Five solids' } },
          questions: combSoB.map((used, i) => ({ id: `u13-5-B${i + 1}`, type: 'gridq', cols: 5, pic: img(`u13/csob${i + 1}`, 300), label: `拼立体 ${i + 1}：${used.join(', ')}`, prompt: { zh: '上面这个图形用到了哪些立体图形？用到的打 ✓，没用到的打 ✗', en: 'Which solids make up the figure?' },
            items: NAMES3.map(k => ({ pic: `${so(k, { w: 70 })}<div class="shape-name">${SU.SOLID_NAMES[k][0]}<br><span class="en">${k}</span></div>`, field: { a: used.includes(k) ? '✓' : '✗', kind: 'choice', options: ['✓', '✗'] } })),
            hint: { zh: '把图形一块一块拆开看：每一块是五种里的哪一种？', en: 'Look at each piece one by one.' }, explain: ['solidsall', {}] })) },
      ],
    },
    {
      id: 'u13-6', available: true,
      title: { zh: '图形规律', en: 'Make patterns with shapes and solids' },
      intro: { zh: '规律就是几个图形一组，一直重复。找出重复的一组，就知道下一个是什么。', en: 'A pattern repeats a group of shapes. Find the group to know what comes next.' },
      sections: [
        { id: 'A', type: 'pickone', title: { zh: '平面图形规律（一）', en: 'Put a tick in the correct boxes to complete the patterns' },
          example: { kind: 'pattern2', n: { seq: rep([sq({ size: 1 }), sq({ size: .65 }), sq({ size: .4 })], 8), period: 3, next: sq({ size: .4 }) }, title: { zh: '大、中、小重复', en: 'Big, medium, small' } },
          questions: [
            patQ('u13-6-A1', [sq({ size: 1 }), sq({ size: .65 }), sq({ size: .4 })], [sq({ size: 1 }), sq({ size: .65 }), sq({ size: .4 })]),
            patQ('u13-6-A2', [sq(), tri(), cir()], [sq(), cir(), tri()]),
            patQ('u13-6-A3', [tri({ variant: 'down', fill: 'dark' }), tri({ variant: 'down', fill: 'grey' }), tri({ variant: 'down' })], [tri({ variant: 'down' }), tri({ variant: 'down', fill: 'grey' }), tri({ variant: 'down', fill: 'dark' })]),
            patQ('u13-6-A4', [semi(), semi({ rot: 90 }), semi({ rot: 180 }), semi({ rot: 270 })], [semi({ rot: 90 }), semi(), semi({ rot: 180 })]),
            patQ('u13-6-A5', [cir({ size: .7 }), cir({ size: 1 }), cir({ size: .4 })], [cir({ size: .4 }), cir({ size: 1 }), cir({ size: .7 })]),
            patQ('u13-6-A6', [tri({ variant: 'down' }), cir(), sq({ rot: 45 })], [tri({ variant: 'down' }), cir(), sq({ rot: 45 })]),
            patQ('u13-6-A7', [rect({ variant: 'tall' }), rect({ variant: 'tall', fill: 'dark' }), rect({ variant: 'tall', fill: 'grey' })], [rect({ variant: 'tall' }), rect({ variant: 'tall', fill: 'dark' }), rect({ variant: 'tall', fill: 'grey' })]),
            patQ('u13-6-A8', [qua(), qua({ rot: 90 }), qua({ rot: 180 }), qua({ rot: 270 })], [qua({ rot: 180 }), qua(), qua({ rot: 270 })]),
          ] },
        { id: 'B', type: 'pickone', title: { zh: '平面图形规律（二）', en: 'Put a tick in the correct boxes to complete the patterns' },
          example: { kind: 'pattern2', n: { seq: rep([sq(), tri({ variant: 'right' }), tri({ variant: 'right', size: .5 }), sq({ size: .5 })], 8), period: 4, next: sq() }, title: { zh: '四个一组', en: 'A group of four' } },
          questions: [
            patQ('u13-6-B1', [sq(), tri({ variant: 'right' }), tri({ variant: 'right', size: .5 }), sq({ size: .5 })], [sq(), tri({ variant: 'right' }), tri({ variant: 'right', size: .5 })]),
            patQ('u13-6-B2', [semi({ rot: 90 }), cir({ fill: 'dark' }), semi({ rot: 270 }), semi({ rot: 90, fill: 'dark' }), cir(), semi({ rot: 270, fill: 'dark' })], [cir(), semi({ rot: 270 }), semi({ rot: 90, fill: 'dark' })]),
            patQ('u13-6-B3', [rect({ variant: 'tall', fill: 'dark' }), rect({ fill: 'grey', size: .8 }), rect({ variant: 'tall' }), rect({ fill: 'dark', size: .8 }), rect({ variant: 'tall', fill: 'grey' }), rect({ size: .8 })], [rect({ variant: 'tall', fill: 'grey' }), rect({ fill: 'dark', size: .8 }), rect({ variant: 'tall' })]),
            patQ('u13-6-B4', [qua({ rot: 270 }), qua({ rot: 90 }), qua({ rot: 180, size: .7 }), qua({ size: 1 })], [qua({ rot: 270 }), qua({ rot: 180, size: .7 }), qua()]),
            patQ('u13-6-B5', [sq({ size: .5 }), cir({ fill: 'grey', size: .6 }), sq({ fill: 'grey' }), cir()], [cir({ fill: 'grey', size: .6 }), sq({ fill: 'grey' }), sq({ size: .5 })]),
            patQ('u13-6-B6', [tri({ fill: 'grey' }), tri({ variant: 'down', fill: 'grey' }), rect({ variant: 'tall', fill: 'grey', size: .7 }), tri({ fill: 'grey' }), tri({ variant: 'down', fill: 'grey' }), rect({ fill: 'grey', size: .7 })], [rect({ fill: 'grey', size: .7 }), rect({ variant: 'tall', fill: 'grey', size: .7 }), tri({ fill: 'dark' })]),
            patQ('u13-6-B7', [semi({ rot: 90, fill: 'dark', size: .6 }), semi({ rot: 90 }), semi({ rot: 270, fill: 'dark' }), semi({ rot: 270, size: .6 })], [semi({ rot: 90, fill: 'dark', size: .6 }), semi({ rot: 90 }), semi({ rot: 270, fill: 'dark' })]),
            patQ('u13-6-B8', [tri({ variant: 'right' }), qua({ rot: 90, size: .6 }), tri({ variant: 'right', size: .6 }), qua({ rot: 270 })], [qua({ rot: 90, size: .6 }), tri({ variant: 'right', size: .6 }), tri({ variant: 'right' })]),
          ] },
        { id: 'C', type: 'pickone', title: { zh: '立体图形规律（一）', en: 'Make patterns with solids' },
          example: { kind: 'pattern2', n: { seq: rep([sph({ size: .7 }), sph({ size: 1 }), sph({ size: .45 })], 8), period: 3, next: sph({ size: .45 }) }, title: { zh: '中、大、小重复', en: 'Medium, big, small' } },
          questions: [
            patQ('u13-6-C1', [sph({ size: .7 }), sph({ size: 1 }), sph({ size: .45 })], [sph({ size: .45 }), sph({ size: .7 }), sph({ size: 1 })]),
            patQ('u13-6-C2', [cuboid({ variant: 'tall' }), cone(), cyl()], [cuboid({ variant: 'tall' }), cone(), cyl()]),
            patQ('u13-6-C3', [cube(), cube({ fill: 'grey' }), cube({ fill: 'dark' })], [cube(), cube({ fill: 'dark' }), cube({ fill: 'grey' })]),
            patQ('u13-6-C4', [cone(), cone({ variant: 'right' }), cone({ variant: 'down' }), cone({ variant: 'left' })], [cone({ variant: 'right' }), cone(), cone({ variant: 'down' })]),
            patQ('u13-6-C5', [cyl({ size: 1 }), cyl({ size: .7 }), cyl({ size: .5 })], [cyl({ size: .5 }), cyl({ size: 1 }), cyl({ size: .7 })]),
            patQ('u13-6-C6', [sph({ fill: 'grey' }), cube(), cone({ variant: 'down' })], [sph({ fill: 'grey' }), cube(), cone({ variant: 'down' })]),
            patQ('u13-6-C7', [cuboid({ variant: 'tall', fill: 'grey' }), cuboid({ variant: 'tall' }), cuboid({ variant: 'tall', fill: 'dark' })], [cuboid({ variant: 'tall', fill: 'grey' }), cuboid({ variant: 'tall', fill: 'dark' }), cuboid({ variant: 'tall' })]),
            patQ('u13-6-C8', [cyl({ variant: 'lying' }), cyl()], [cyl({ variant: 'lying' }), cyl(), cyl({ size: .6 })]),
          ] },
        { id: 'D', type: 'pickone', title: { zh: '立体图形规律（二）', en: 'Make patterns with solids' },
          example: { kind: 'pattern2', n: { seq: rep([cube({ size: .5 }), cuboid({ variant: 'tall', size: .8 }), cube({ size: .9 }), cuboid({ variant: 'tall' })], 8), period: 4, next: cube({ size: .5 }) }, title: { zh: '四个一组', en: 'A group of four' } },
          questions: [
            patQ('u13-6-D1', [cube({ size: .5 }), cuboid({ variant: 'tall', size: .8 }), cube({ size: .9 }), cuboid({ variant: 'tall' })], [cuboid({ variant: 'tall' }), cube({ size: .9 }), cube({ size: .5 })]),
            patQ('u13-6-D2', [cone({ variant: 'down', fill: 'dark' }), sph({ fill: 'grey', size: .7 }), cone({ variant: 'down' }), sph({ fill: 'dark', size: .7 })], [sph({ fill: 'grey', size: .7 }), cone({ variant: 'down', fill: 'dark' }), cone({ variant: 'down' })]),
            patQ('u13-6-D3', [cyl(), cyl({ fill: 'grey' }), cyl({ fill: 'dark' })], [cyl({ fill: 'dark' }), cyl({ fill: 'grey' }), cyl()]),
            patQ('u13-6-D4', [cuboid({ variant: 'tall' }), cuboid({ variant: 'flat', size: .6 }), cuboid({ variant: 'tall', size: .6 }), cuboid()], [cuboid({ variant: 'flat', size: .6 }), cuboid({ variant: 'tall' }), cuboid()]),
            patQ('u13-6-D5', [sph({ fill: 'dark', size: .7 }), cyl({ fill: 'grey', size: .7 }), cyl({ fill: 'dark' }), sph({ fill: 'grey' })], [sph({ fill: 'dark', size: .7 }), cyl({ fill: 'grey', size: .7 }), cyl({ fill: 'dark' })]),
            patQ('u13-6-D6', [cube(), cone({ fill: 'dark' }), cone({ variant: 'down' }), cube({ fill: 'dark' }), cone(), cone({ variant: 'down', fill: 'dark' })], [cube({ fill: 'dark' }), cone(), cone({ variant: 'down' })]),
            patQ('u13-6-D7', [cone({ variant: 'right', fill: 'dark' }), cone({ variant: 'right', size: .5 }), cone({ variant: 'left' }), cone({ variant: 'left', fill: 'dark', size: .5 })], [cone({ variant: 'right', fill: 'dark' }), cone({ variant: 'left', fill: 'dark' }), cone({ variant: 'right', size: .5 })]),
            patQ('u13-6-D8', [cuboid({ variant: 'tall' }), cyl({ size: .6 }), cuboid({ variant: 'tall', size: .5 }), cyl()], [cuboid({ variant: 'tall', size: .5 }), cuboid({ variant: 'tall' }), cyl({ size: .6 })]),
          ] },
      ],
    },
  ];
})();
