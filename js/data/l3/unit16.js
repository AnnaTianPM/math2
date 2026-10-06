/* Level 3 · Unit 16  面积与周长 */
(function () {
  const U = window.MATH_DATA.levels[3].units;
  const unit = num => U.find(u => u.num === num);
  const G = window.L3.geo;
  const num = a => ({ a });
  const choice = (a, options) => ({ a, kind: 'choice', options });
  const F = (id, p, text, fields, explain, zh, en, o) => Object.assign({ id, type: 'fill', pic: p, label: text.replace(/\{\{\w+\}\}/g, '___').replace(/\n/g, ' '), prompt: { zh, en: en || 'Fill in the blanks' }, text, fields, answerText: Object.values(fields).map(f => f.a).join(', '), explain }, o || {});
  const wp = (en, zh) => `<div class="wp-text"><div class="wp-en">${en}</div><div class="wp-zh">${zh}</div></div>`;
  // 格子工具
  const block = (x0, y0, w, h) => { const o = []; for (let y = y0; y < y0 + h; y++) for (let x = x0; x < x0 + w; x++) o.push({ x, y }); return o; };
  const sq = (...pts) => pts.map(([x, y]) => ({ x, y }));
  const hv = (...pts) => pts.map(([x, y, h]) => ({ x, y, h }));
  const shift = (list, dx, dy) => list.map(c => Object.assign({}, c, { x: c.x + dx, y: c.y + dy }));
  const areaQ = (id, cols, rows, list, i) => F(id, `<div class="center">${G.cells(cols, rows, list, { nogrid: true })}</div>`, 'Area = {{a}} square units', { a: num(G.area(list)) }, ['l3cellarea', { cols, rows, list }], '数整格和半格，算面积', 'Find the area of the figure', { label: `图 ${i + 1}：${G.area(list)}`, hint: { zh: '整格算 1，两个半格算 1。', en: 'Two half squares make one square.' } });

  /* ---- A 10 个图形 ---- */
  const figsA = [
    block(0, 0, 3, 2).concat(hv([0, 2, 'tr'], [1, 2, 'tl'])),                                   // 7
    block(0, 0, 4, 2).concat(hv([4, 0, 'tl'], [4, 1, 'bl'], [0, 2, 'tr'], [3, 2, 'tl'])),      // 10
    block(0, 2, 4, 1).concat(hv([1, 1, 'br'], [2, 1, 'bl'], [1, 0, 'br'], [2, 0, 'bl'])),      // 6
    block(0, 2, 5, 2).concat(hv([2, 1, 'bl'], [2, 0, 'bl'], [5, 2, 'tl'], [5, 3, 'bl'])),      // 12
    sq([1, 0], [1, 1], [1, 2]).concat(hv([0, 0, 'tr'], [0, 2, 'br'], [2, 0, 'tl'], [2, 2, 'bl'])), // 5
    block(0, 1, 4, 2).concat(sq([1, 0])).concat(hv([0, 0, 'br'], [2, 0, 'bl'], [3, 0, 'bl'], [4, 1, 'tl'])), // 11
    block(0, 1, 4, 1).concat(sq([0, 0], [2, 0], [3, 0])).concat(hv([1, 0, 'tl'], [4, 0, 'tl'], [4, 1, 'bl'], [1, 2, 'tr'])), // 9
    block(1, 0, 2, 2).concat(hv([0, 0, 'tr'], [0, 1, 'br'], [3, 0, 'tl'], [3, 1, 'bl'], [1, 2, 'tr'], [2, 2, 'tl'], [1, 3, 'tr'], [2, 3, 'tl'])), // 8
    sq([1, 0], [0, 1], [1, 1], [2, 1], [1, 2]).concat(hv([0, 0, 'br'], [2, 0, 'bl'], [0, 2, 'tr'], [2, 2, 'tl'])), // 7
    block(0, 1, 2, 3).concat(sq([2, 1], [2, 2])).concat(hv([0, 0, 'br'], [1, 0, 'bl'], [2, 3, 'tl'], [3, 1, 'tl'])), // 10
  ];
  /* ---- B 大图 ---- */
  const bigB1 = { cols: 10, rows: 7, figs: {
    A: block(1, 0, 3, 3).concat(sq([0, 1], [4, 1])).concat(hv([0, 0, 'br'], [0, 2, 'tr'], [4, 0, 'bl'], [4, 2, 'tl'])),          // 13
    B: sq([7, 1], [6, 1], [8, 1], [7, 0], [7, 2]).concat(hv([6, 0, 'br'], [8, 0, 'bl'], [6, 2, 'tr'], [8, 2, 'tl'], [5, 1, 'tr'], [5, 0, 'br'], [9, 1, 'tl'], [9, 2, 'tl'])), // 9
    C: block(0, 4, 2, 3).concat(sq([2, 4], [2, 6])).concat(hv([2, 5, 'tr'], [2, 5, 'bl'])).filter((c, i, a) => true),        // 9
    D: block(4, 5, 2, 2).concat(hv([3, 5, 'br'], [4, 4, 'bl'], [5, 4, 'br'], [6, 5, 'bl'], [6, 6, 'tl'], [5, 7 - 1 + 0, 'tr'], [4, 7 - 1 + 0, 'tl'], [3, 6, 'tr'])), // 8
    E: block(7, 4, 2, 3).concat(sq([9, 4], [9, 6])).concat(hv([9, 5, 'tr'], [9, 5, 'bl'], [7, 3, 'br'], [8, 3, 'bl'])),   // 10
  }, qs: [['A', 'a'], ['B', 'b'], ['C', 'c'], ['D', 'd'], ['E', 'e']] };
  const bigB2 = { cols: 10, rows: 7, figs: {
    F: sq([1, 1], [2, 1], [1, 2], [2, 2]).concat(hv([0, 0, 'br'], [1, 0, 'bl'], [2, 0, 'br'], [3, 0, 'bl'], [0, 1, 'tr'], [3, 1, 'tl'], [0, 2, 'br'], [3, 2, 'bl'], [1, 3, 'tr'], [2, 3, 'tl'])), // 9
    G: sq([5, 1], [6, 1], [5, 2], [6, 2], [5, 0], [6, 0]).concat(hv([4, 0, 'br'], [7, 0, 'bl'], [4, 1, 'tr'], [7, 1, 'tl'], [4, 2, 'br'], [7, 2, 'bl'], [5, 3, 'tr'], [6, 3, 'tl'])), // 10
    H: block(8, 0, 2, 3).concat(sq([8, 3], [9, 3], [8, 4])).concat(hv([9, 4, 'tl'], [7, 1, 'tr'], [7, 2, 'br'], [7, 0, 'br'])), // 11
    I: sq([1, 5], [2, 5], [1, 6], [2, 6]).concat(hv([0, 4, 'tl'], [1, 4, 'bl'], [0, 5, 'tr'], [3, 5, 'tl'], [0, 6, 'br'], [3, 6, 'bl'], [2, 4, 'br'], [3, 4, 'tr'])), // 8
    J: block(5, 4, 4, 3).concat(hv([4, 4, 'br'], [4, 5, 'tr'], [4, 5, 'br'], [4, 6, 'tr'], [9, 4, 'bl'], [9, 5, 'tl'], [9, 5, 'bl'], [9, 6, 'tl'])), // 16
  }, qs: [['F', 'a'], ['G', 'b'], ['H', 'c'], ['I', 'd'], ['J', 'e']] };
  const bigPic = big => { const all = []; const labels = []; Object.entries(big.figs).forEach(([k, list]) => { all.push(...list); const fulls = list.filter(c => !c.h); const c = fulls[Math.floor(fulls.length / 2)]; labels.push({ x: c.x, y: c.y, t: k }); }); return `<div class="center">${G.cells(big.cols, big.rows, all, { labels, w: 360 })}</div>`; };
  const bigQs = (pre, big, extra) => { const names = Object.keys(big.figs); const areas = Object.fromEntries(names.map(k => [k, G.area(big.figs[k])])); const qs = big.qs.map(([k, l], i) => F(`${pre}${i + 1}`, bigPic(big), `(${l}) The area of Figure ${k} is {{a}} square units.`, { a: num(areas[k]) }, ['l3cellarea', { cols: big.cols, rows: big.rows, list: big.figs[k] }], `图形 ${k} 的面积是多少？`, `Area of Figure ${k}`, { label: `${k}: ${areas[k]}`, hint: { zh: '数整格，再数半格。', en: 'Count squares and half squares.' } }));
    const sorted = names.slice().sort((a, b) => areas[a] - areas[b]); let n = big.qs.length;
    if (extra.same) { const [p, q] = extra.same; qs.push(F(`${pre}${++n}`, bigPic(big), `(${String.fromCharCode(97 + n - 1)}) Figures {{p}} and {{q}} have the same area.`, { p: choice(p, names), q: choice(q, names) }, ['l3cellarea', { cols: big.cols, rows: big.rows, list: big.figs[p] }], '哪两个图形面积一样？', 'Same area', { accept: [{ p, q }, { p: q, q: p }], label: `${p} = ${q}`, hint: { zh: '把每个面积算出来再比。', en: 'Compare the areas.' } })); }
    qs.push(F(`${pre}${++n}`, bigPic(big), `(${String.fromCharCode(97 + n - 1)}) Figure {{p}} has the smallest area.`, { p: choice(sorted[0], names) }, ['l3cellarea', { cols: big.cols, rows: big.rows, list: big.figs[sorted[0]] }], '哪个面积最小？', 'Smallest area', { label: sorted[0], hint: { zh: '比较算出来的面积。', en: 'Compare.' } }));
    qs.push(F(`${pre}${++n}`, bigPic(big), `(${String.fromCharCode(97 + n - 1)}) Figure {{p}} has the greatest area.`, { p: choice(sorted[sorted.length - 1], names) }, ['l3cellarea', { cols: big.cols, rows: big.rows, list: big.figs[sorted[sorted.length - 1]] }], '哪个面积最大？', 'Greatest area', { label: sorted[sorted.length - 1], hint: { zh: '比较算出来的面积。', en: 'Compare.' } }));
    return qs; };
  /* ---- C/D 画图 ---- */
  const addC = [[block(2, 0, 3, 1).concat(sq([3, 1], [3, 2])), { sq: 3, half: 0 }], [block(2, 0, 2, 1).concat(block(2, 1, 3, 2)).concat(hv([4, 0, 'bl'])), { sq: 4, half: 0 }], [sq([3, 2], [4, 2], [3, 3], [4, 3]), { sq: 2, half: 2 }], [sq([4, 1], [3, 2], [4, 2], [5, 2]), { sq: 3, half: 4 }], [sq([3, 2], [4, 2], [5, 2], [6, 2], [3, 3], [6, 3]), { sq: 4, half: 4 }]];
  const addD = [[sq([2, 1], [4, 1], [2, 2], [3, 2], [4, 2]), hv([7, 0, 'br'], [8, 0, 'bl'], [6, 1, 'br'], [9, 1, 'bl']).concat(sq([7, 1], [8, 1])), 8], [sq([2, 1], [3, 1], [2, 2], [3, 2]), sq([7, 1], [7, 2], [6, 2], [8, 2]).concat(hv([7, 0, 'bl'], [6, 1, 'br'], [8, 1, 'bl'], [5, 2, 'br'], [9, 2, 'bl'])), 9], [sq([1, 1], [3, 1], [0, 2], [1, 2], [2, 2], [3, 2], [4, 2]), sq([7, 0], [8, 0], [7, 1], [7, 2], [7, 3]).concat(hv([6, 2, 'br'], [8, 2, 'bl'])), 11]];
  /* ---- E 周长 ---- */
  const perimE = [block(0, 0, 4, 3).filter(c => !((c.x === 0 && c.y === 0) || (c.x === 0 && c.y === 2))), block(0, 0, 4, 3).filter(c => !((c.x === 3 && c.y === 1) || (c.x === 1 && c.y === 2))), block(1, 1, 3, 2).concat(sq([1, 0], [3, 0], [1, 3], [3, 3], [0, 1], [4, 2])), block(1, 1, 4, 2).concat(sq([1, 0], [3, 0], [2, 3], [4, 3])), block(0, 1, 8, 2).concat(sq([1, 0], [3, 0], [5, 0], [7, 0]))];
  /* ---- F 两张大图 ---- */
  const bigF1 = { cols: 11, rows: 10, figs: { A: block(1, 1, 3, 2).concat(sq([1, 0], [3, 0], [4, 1], [1, 3], [3, 3])), B: block(6, 1, 5, 2).concat(sq([6, 0], [8, 0], [10, 0], [8, 3])), C: block(0, 6, 5, 2).concat(sq([5, 6], [2, 8])), D: block(3, 5, 8, 2).map(c => Object.assign({}, c, { y: c.y + 4 })).filter(c => c.y < 10).concat([]).length ? block(2, 8, 8, 2) : [] } };
  bigF1.figs.D = block(2, 8, 8, 2).filter(c => c.x >= 2);
  bigF1.figs.C = block(0, 5, 5, 2).concat(sq([5, 5], [2, 7]));
  const bigF2 = { cols: 11, rows: 10, figs: { E: block(1, 1, 5, 2).concat(sq([1, 0], [3, 0], [5, 0], [1, 3], [3, 3], [5, 3], [0, 1])), F: block(7, 1, 4, 4).concat(sq([7, 0], [9, 0], [6, 1], [6, 3])), G: block(1, 6, 6, 2).concat(sq([1, 5], [3, 5], [5, 5], [3, 8])), H: block(7, 6, 5, 3).filter(c => c.x < 11).concat(sq([7, 5], [9, 5])) } };
  bigF2.figs.H = block(6, 6, 5, 3).concat(sq([6, 5], [8, 5], [10, 5]));
  const bigFQs = (pre, big) => { const names = Object.keys(big.figs); const A = Object.fromEntries(names.map(k => [k, G.area(big.figs[k])])), P = Object.fromEntries(names.map(k => [k, G.perim(big.figs[k]).p])); const pic = () => { const all = [], labels = []; names.forEach(k => { all.push(...big.figs[k]); const fulls = big.figs[k]; const c = fulls[Math.floor(fulls.length / 2)]; labels.push({ x: c.x, y: c.y, t: k }); }); return `<div class="center">${G.cells(big.cols, big.rows, all, { labels, w: 380, unit: '1 m' })}</div>`; };
    const qs = []; let n = 0; const L = () => `(${String.fromCharCode(97 + n++)})`;
    names.forEach(k => qs.push(F(`${pre}${n + 1}`, pic(), `${L()} The area of Figure ${k} is {{a}} m².`, { a: num(A[k]) }, ['l3cellarea', { cols: big.cols, rows: big.rows, list: big.figs[k] }], `图形 ${k} 的面积？每格 1 m²`, `Area of ${k}`, { label: `${k} 面积 ${A[k]}`, hint: { zh: '数格子。', en: 'Count the squares.' } })));
    names.forEach(k => qs.push(F(`${pre}${n + 1}`, pic(), `${L()} The perimeter of Figure ${k} is {{a}} m.`, { a: num(P[k]) }, ['l3cellperim', { cols: big.cols, rows: big.rows, list: big.figs[k], unit: 'm' }], `图形 ${k} 的周长？每边 1 m`, `Perimeter of ${k}`, { label: `${k} 周长 ${P[k]}`, hint: { zh: '沿着外面一圈数边。', en: 'Count the edges around.' } })));
    const sA = names.slice().sort((a, b) => A[a] - A[b]), sP = names.slice().sort((a, b) => P[a] - P[b]);
    [[sA[0], 'has the smallest area', '面积最小'], [sA[sA.length - 1], 'has the greatest area', '面积最大'], [sP[0], 'has the shortest perimeter', '周长最短'], [sP[sP.length - 1], 'has the longest perimeter', '周长最长']].forEach(([k, en, zh]) => qs.push(F(`${pre}${n + 1}`, pic(), `${L()} Figure {{p}} ${en}.`, { p: choice(k, names) }, ['l3cellarea', { cols: big.cols, rows: big.rows, list: big.figs[k] }], `哪个图形${zh}？`, en, { label: `${zh}: ${k}`, hint: { zh: '比较前面算出的数。', en: 'Compare.' } })));
    return qs; };
  /* ---- G 多边形周长 ---- */
  const polyG = [
    [[[0, 0], [90, 0], [90, 40], [60, 40], [60, 90], [0, 90]], ['9 cm', '4 cm', '3 cm', '5 cm', '6 cm', '9 cm'], [9, 4, 3, 5, 6, 9], 'cm'],
    [[[0, 0], [130, 0], [150, 90], [0, 90]], ['13 cm', '10 cm', '15 cm', '9 cm'], [13, 10, 15, 9], 'cm'],
    [[[40, 0], [130, 70], [0, 80]], ['14 cm', '17 cm', '11 cm'], [14, 17, 11], 'cm'],
    [[[0, 100], [45, 0], [85, 60], [125, 0], [170, 100]], ['15 m', '9 m', '9 m', '15 m', '22 m'], [15, 9, 9, 15, 22], 'm'],
    [[[0, 0], [150, 0], [150, 10], [115, 10], [115, 40], [75, 40], [75, 70], [0, 70]], ['30 m', '2 m', '7 m', '6 m', '8 m', '5 m', '15 m', '14 m'], [30, 2, 7, 6, 8, 5, 15, 14], 'm'],
  ];
  const rects = [[3, 12, 'm', 'tall'], [13, 4, 'cm', 'slant'], [6, 6, 'm', 'diamond'], [15, 8, 'cm'], [9, 16, 'm', 'tall']];
  const words = [
    ['Andrew is making a rectangle using a piece of wire. The rectangle is 14 cm by 18 cm. How much wire does Andrew need?', 'Andrew 用铁丝做一个 14 cm × 18 cm 的长方形。要多长的铁丝？', 'perim', 18, 14, 'cm', 'Andrew needs ___ cm of wire.'],
    ['Mary mops her room. Her room is 6 m by 8 m. What is the area that Mary mops?', 'Mary 拖地，房间 6 m × 8 m。拖的面积多大？', 'area', 8, 6, 'm', 'The area that Mary mops is ___ m².'],
    ['Jerry is jogging around a square field. If he has jogged 240 m after one round, what is the length of each side of the square field?', 'Jerry 绕正方形操场跑一圈 240 m。每条边多长？', 'side', 240, 0, 'm', 'The length of each side of the square field is ___ m.'],
    ['Mr Wilson plants carrots along a plot of soil that measures 2 m by 50 m. What is the area of the plot of soil?', 'Wilson 先生在 2 m × 50 m 的地里种胡萝卜。这块地面积多大？', 'area', 50, 2, 'm', 'The area of the plot of soil is ___ m².'],
    ['A farmer wants to build a fence around the rectangular compound of his house. The compound is 16 m by 20 m. How long will the fence be?', '农夫要围 16 m × 20 m 的院子。篱笆多长？', 'perim', 20, 16, 'm', 'The fence will be ___ m long.'],
    ['Stephanie paints her living room wall. The wall is 9 m by 4 m. What is the area that Stephanie paints?', 'Stephanie 刷 9 m × 4 m 的墙。刷的面积多大？', 'area', 9, 4, 'm', 'The area that Stephanie paints is ___ m².'],
  ];

  unit(16).kps = [
    {
      id: 'l3-16-1', available: true,
      title: { zh: '数格子求面积', en: 'Find the area of figures in square units' },
      intro: { zh: '面积就是图形盖住几个方格（square units）。整格算 1，三角形半格算 ½，两个半格合成 1 格。', en: 'Area is the number of squares covered. Two half squares make one square.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '数一数面积', en: 'Find the area of each figure' },
          example: { kind: 'l3cellarea', n: { cols: 4, rows: 3, list: block(0, 1, 3, 2).concat(hv([3, 1, 'tl'], [3, 2, 'bl'])) }, title: { zh: '6 个整格 + 2 个半格 = 7', en: '7 square units' } },
          questions: figsA.map((list, i) => areaQ(`l3-16-1-A${i + 1}`, Math.max(...list.map(c => c.x)) + 1, Math.max(...list.map(c => c.y)) + 1, list, i)) },
        { id: 'B', type: 'fill', title: { zh: '涂色图形的面积', en: 'Find the area of the shaded figures' },
          example: { kind: 'l3cellarea', n: { cols: 4, rows: 3, list: block(1, 0, 2, 3).concat(hv([0, 1, 'tr'], [3, 1, 'tl'])) }, title: { zh: '6 + 1 = 7', en: '7 square units' } },
          questions: bigQs('l3-16-1-B', bigB1, { same: ['B', 'C'] }).concat(bigQs('l3-16-1-B', bigB2, {}).map((q, i) => Object.assign(q, { id: `l3-16-1-B${9 + i}` }))) },
        { id: 'C', type: 'l3areadraw', title: { zh: '添格子', en: 'Add squares or half-squares to the figure, then find the area' },
          example: { kind: 'l3cellarea', n: { cols: 5, rows: 3, list: block(1, 0, 3, 1).concat(sq([2, 1], [2, 2])) }, title: { zh: '添 3 个整格后数面积', en: 'Add 3 squares, then count' } },
          questions: addC.map(([init, req], i) => ({ id: `l3-16-1-C${i + 1}`, type: 'l3areadraw', cols: 8, rows: 4, grids: [{ init, req }], label: `添 ${req.sq} 整格 ${req.half} 半格 → ${G.area(init) + req.sq + req.half / 2}` })) },
        { id: 'D', type: 'l3areadraw', title: { zh: '画出指定面积的图形', en: 'Draw the following figures' },
          example: { kind: 'l3cellarea', n: { cols: 5, rows: 3, list: block(0, 0, 3, 2).concat(sq([3, 0])) }, title: { zh: '面积 7 的图形可以有很多种', en: 'Many figures have area 7' } },
          questions: [{ id: 'l3-16-1-D1', type: 'l3areadraw', cols: 6, rows: 4, grids: [{ init: [], target: 7 }, { init: [], target: 7 }], distinct: true, label: '两个面积 7 的不同图形' }, { id: 'l3-16-1-D2', type: 'l3areadraw', cols: 6, rows: 5, grids: [{ init: [], target: 10 }, { init: [], target: 10 }], distinct: true, label: '两个面积 10 的不同图形' }].concat(addD.map(([a, b, t], i) => ({ id: `l3-16-1-D${i + 3}`, type: 'l3areadraw', cols: 10, rows: 4, grids: [{ init: a, target: t }, { init: b, target: t }], label: `两个图都添到面积 ${t}` }))) },
        { id: 'E', type: 'fill', title: { zh: '数格子求周长', en: 'Find the perimeter of each shaded figure (each square is 1 cm by 1 cm)' },
          example: { kind: 'l3cellperim', n: { cols: 3, rows: 2, list: block(0, 0, 3, 2), unit: 'cm' }, title: { zh: '3 + 2 + 3 + 2 = 10 cm', en: '10 cm' } },
          questions: perimE.map((list, i) => F(`l3-16-1-E${i + 1}`, `<div class="center">${G.cells(Math.max(...list.map(c => c.x)) + 1, Math.max(...list.map(c => c.y)) + 1, list, { unit: '1 cm' })}</div>`, 'Perimeter = {{a}} cm', { a: num(G.perim(list).p) }, ['l3cellperim', { cols: Math.max(...list.map(c => c.x)) + 1, rows: Math.max(...list.map(c => c.y)) + 1, list, unit: 'cm' }], '沿着涂色部分外面一圈数边，每边 1 cm', 'Find the perimeter', { label: `图 ${i + 1}：${G.perim(list).p} cm`, hint: { zh: '只数外面一圈的边。', en: 'Count the outside edges only.' } })) },
        { id: 'F', type: 'fill', title: { zh: '面积和周长（每格 1 m）', en: 'Study the figures. Each square is 1 m by 1 m' },
          example: { kind: 'l3cellperim', n: { cols: 4, rows: 3, list: block(0, 0, 4, 2).concat(sq([1, 2])), unit: 'm' }, title: { zh: '面积 9 m²，周长 14 m', en: 'Area 9 m², perimeter 14 m' } },
          questions: bigFQs('l3-16-1-F', bigF1).concat(bigFQs('l3-16-1-F', bigF2).map((q, i) => Object.assign(q, { id: `l3-16-1-F${13 + i}` }))) },
        { id: 'G', type: 'fill', title: { zh: '把边长加起来', en: 'Find the perimeter of each figure' },
          example: { kind: 'l3polyperim', n: { pts: [[0, 0], [80, 0], [80, 50], [0, 50]], labels: [{ i: 0, t: '8 cm' }, { i: 1, t: '5 cm' }, { i: 2, t: '8 cm' }, { i: 3, t: '5 cm' }], sides: [8, 5, 8, 5], unit: 'cm' }, title: { zh: '8 + 5 + 8 + 5 = 26 cm', en: '26 cm' } },
          questions: polyG.map(([pts, lab, sides, u], i) => { const labels = lab.map((t, j) => ({ i: j, t })); const p = sides.reduce((a, b) => a + b, 0); return F(`l3-16-1-G${i + 1}`, `<div class="center">${G.polyfig(pts, labels)}</div>`, `Perimeter = {{a}} ${u}`, { a: num(p) }, ['l3polyperim', { pts, labels, sides, unit: u }], '把所有边的长度加起来', 'Find the perimeter', { label: `图 ${i + 1}：${p} ${u}`, hint: { zh: `${sides.join(' + ')}。`, en: 'Add all the sides.' } }); }) },
      ],
    },
    {
      id: 'l3-16-2', available: true,
      title: { zh: '用公式算面积和周长', en: 'Use the formula to find the area of figures' },
      intro: { zh: '长方形面积 = 长 × 宽；周长 = 长 + 宽 + 长 + 宽。正方形四条边一样长。', en: 'Area = length × breadth. Perimeter = length + breadth + length + breadth.' },
      sections: [{ id: 'A', type: 'fill', title: { zh: '算面积和周长', en: 'Find the area and perimeter of each figure' },
        example: { kind: 'l3rect', n: { l: 5, b: 4, unit: 'cm' }, title: { zh: '5 × 4 = 20 cm²，5 + 4 + 5 + 4 = 18 cm', en: 'Area 20 cm², perimeter 18 cm' } },
        questions: rects.map(([l, b, u], i) => F(`l3-16-2-A${i + 1}`, `<div class="center">${G.rect(l, b, u)}</div>`, `Area = {{a}} ${u}²\nPerimeter = {{p}} ${u}`, { a: num(l * b), p: num(2 * (l + b)) }, ['l3rect', { l, b, unit: u }], `长 ${l} ${u}，宽 ${b} ${u}，面积和周长各是多少？`, 'Area and perimeter', { label: `${l} × ${b}`, hint: { zh: `面积 ${l} × ${b}，周长 ${l} + ${b} + ${l} + ${b}。`, en: `Area ${l} × ${b}.` } })) }],
    },
    {
      id: 'l3-16-3', available: true,
      title: { zh: '面积周长应用题', en: 'Solve word problems related to area and perimeter' },
      intro: { zh: '围一圈（铁丝、篱笆、跑一圈）→ 周长；盖住多大（拖地、刷墙、一块地）→ 面积。', en: 'Around the outside → perimeter. Covering → area.' },
      sections: [{ id: 'A', type: 'fill', title: { zh: '应用题', en: 'Do these word problems. Show your working clearly' },
        example: { kind: 'l3areaword', n: { en: 'Stacey wants to decorate the edge of her photo frame with lace. The photo frame is 15 cm by 10 cm. How much lace will Stacey need?', zh: 'Stacey 要给 15 cm × 10 cm 的相框边上装花边。要多长？', kind: 'perim', l: 15, b: 10, unit: 'cm', sentence: 'Stacey will need ___ cm of lace.' }, title: { zh: '15 + 10 + 15 + 10 = 50 cm', en: '50 cm' } },
        questions: words.map(([en, zh, kind, l, b, u, sent], i) => { const ans = kind === 'perim' ? 2 * (l + b) : kind === 'area' ? l * b : l / 4; return F(`l3-16-3-A${i + 1}`, wp(en, zh), sent.replace('___', '{{a}}'), { a: num(ans) }, ['l3areaword', { en, zh, kind, l, b, unit: u, sentence: sent }], kind === 'perim' ? '围一圈，求周长' : kind === 'area' ? '盖住多大，求面积' : '正方形周长 ÷ 4', en, { label: en.slice(0, 50), hint: { zh: kind === 'perim' ? '长 + 宽 + 长 + 宽。' : kind === 'area' ? '长 × 宽。' : '周长 ÷ 4。', en: kind === 'perim' ? 'Add the four sides.' : kind === 'area' ? 'Length × breadth.' : 'Perimeter ÷ 4.' } }); }) }],
    },
  ];
})();
