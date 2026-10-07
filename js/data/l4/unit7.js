/* Level 4 · Unit 7  对称 */
(function () {
  const U = window.MATH_DATA.levels[4].units;
  const unit = num => U.find(u => u.num === num);
  const G = window.L4SYM;
  const pic = html => `<div class="center">${html}</div>`;
  const choice = (a, options) => ({ a, kind: 'choice', options });
  const F = (id, p, t, fields, explain, zh, en, o) => Object.assign({ id, type: 'fill', pic: p, label: t.replace(/\{\{\w+\}\}/g, '___').replace(/\n/g, ' '), prompt: { zh, en: en || 'Fill in the blanks' }, text: t, fields, answerText: Object.values(fields).map(f => f.a).join(', '), explain }, o || {});
  const YN = a => choice(a ? 'Yes' : 'No', ['Yes', 'No']);

  /* KP1 A 字母 */
  const letters = [['A', ['v']], ['M', ['v']], ['O', ['v', 'h']], ['D', ['h']], ['E', ['h']], ['F', []], ['G', []], ['H', ['v', 'h']], ['L', []], ['N', []], ['Z', []], ['C', ['h']], ['K', ['h']], ['R', []], ['S', []]];
  /* KP1 B 图形（0..100 坐标）+ 虚线 */
  const tree = 'M50 4 L62 26 L56 26 L68 48 L60 48 L74 72 L56 72 L56 96 L44 96 L44 72 L26 72 L40 48 L32 48 L44 26 L38 26 Z';
  const heart = 'M50 92 C20 70 6 52 10 34 C14 18 34 14 50 32 C66 14 86 18 90 34 C94 52 80 70 50 92 Z';
  const star = 'M50 4 L61 36 L95 36 L68 57 L78 90 L50 70 L22 90 L32 57 L5 36 L39 36 Z';
  const house = 'M20 50 L35 32 L44 32 L44 20 L56 20 L56 32 L65 32 L80 50 L65 72 L35 72 Z';
  const arrow = 'M6 40 L54 40 L54 22 L94 50 L54 78 L54 60 L6 60 Z';
  const bottle = 'M30 10 L70 10 L70 30 L58 30 L58 44 C78 54 78 86 50 92 C22 86 22 54 42 44 L42 30 L30 30 Z';
  const cross = 'M30 8 L50 32 L70 8 L92 30 L68 50 L92 70 L70 92 L50 68 L30 92 L8 70 L32 50 L8 30 Z';
  const curved = 'M22 10 C40 22 60 22 78 10 L78 92 C60 80 40 80 22 92 Z';
  const flower = 'M50 8 C62 8 66 20 60 26 C72 20 84 28 80 40 C92 44 92 58 80 60 C84 72 72 80 60 74 C66 80 62 92 50 92 C38 92 34 80 40 74 C28 80 16 72 20 60 C8 58 8 44 20 40 C16 28 28 20 40 26 C34 20 38 8 50 8 Z';
  const zshape = 'M10 20 L46 48 L74 48 L74 30 L92 60 L74 90 L74 72 L46 72 L46 90 L10 90 Z';
  const dotted = [[tree, 'v', true], [heart, 'h', false], [star, 'v', true], [house, 'h', false], [arrow, 'v', false], [bottle, 'v', true], [cross, 'v', true], [curved, 'h', false], [flower, 'v', true], [zshape, 'h', false]];
  /* KP2 候选线 */
  const V = [50, 0, 50, 100], H = [0, 50, 100, 50], D1 = [0, 0, 100, 100], D2 = [100, 0, 0, 100];
  const square = 'M15 15 L85 15 L85 85 L15 85 Z';
  const tri = 'M50 8 L92 80 L8 80 Z';
  const ishape = 'M28 12 L72 12 L72 22 L58 26 L58 74 L72 78 L72 88 L28 88 L28 78 L42 74 L42 26 L28 22 Z';
  const crown = 'M10 30 L26 60 L38 30 L50 60 L62 30 L74 60 L90 30 L90 84 L10 84 Z';
  const magnet = 'M10 22 L40 22 L40 40 L30 40 C22 40 22 60 30 60 L40 60 L40 78 L10 78 L10 60 L4 60 L4 40 L10 40 Z M40 22 L62 22 C92 22 92 78 62 78 L40 78 L40 60 L62 60 C72 60 72 40 62 40 L40 40 Z';
  const hexagon = 'M27 10 L73 10 L96 50 L73 90 L27 90 L4 50 Z';
  const weight = 'M38 8 L62 8 L62 18 L54 22 L54 32 L70 36 L70 92 L30 92 L30 36 L46 32 L46 22 L38 18 Z';
  const ovals = 'M20 20 C8 20 8 80 20 80 C32 80 32 20 20 20 Z M50 20 C38 20 38 80 50 80 C62 80 62 20 50 20 Z M80 20 C68 20 68 80 80 80 C92 80 92 20 80 20 Z';
  const fork = 'M4 42 L40 42 L40 30 L60 30 L96 40 L72 44 L96 50 L72 56 L96 60 L60 70 L40 70 L40 58 L4 58 Z';
  const triLines = [[50, 0, 50, 100], [8, 80, 71, 44].map(x => x), [92, 80, 29, 44], H];
  const starL = a => { const r = 60, c = 50, rad = (90 + a) * Math.PI / 180; return [c + r * Math.cos(rad), 52 - r * Math.sin(rad), c - r * Math.cos(rad), 52 + r * Math.sin(rad)]; };
  const hexL = a => { const r = 60, rad = a * Math.PI / 180; return [50 + r * Math.cos(rad), 50 - r * Math.sin(rad), 50 - r * Math.cos(rad), 50 + r * Math.sin(rad)]; };
  const symQ = [
    [square, [V, H, D1, D2], [0, 1, 2, 3]],
    [tri, [[50, 0, 50, 100], [0, 92, 78, 38], [100, 92, 22, 38], [0, 55, 100, 55]], [0, 1, 2]],
    [ishape, [V, H, D1, D2], [0, 1]],
    [crown, [V, H, D1, D2], [0]],
    [magnet, [H, V, D1], [0]],
    [star, [starL(0), starL(72), starL(144), starL(216), starL(288), [0, 50, 100, 50]], [0, 1, 2, 3, 4]],
    [hexagon, [hexL(0), hexL(60), hexL(120), hexL(90), hexL(30), hexL(150)], [0, 1, 2, 3, 4, 5]],
    [weight, [V, H, D1], [0]],
    [ovals, [V, H, D1, D2], [0, 1]],
    [fork, [H, V, D2], [0]],
  ];
  /* KP3 A 补全图形 {cols, rows, axis, paths} */
  const mirQ = [
    { cols: 6, rows: 6, axis: { h: 3 }, paths: [[[1, 3], [1, 2], [2, 2], [3, 0], [4, 2], [5, 2], [5, 3]]] },
    { cols: 8, rows: 8, axis: { v: 4 }, paths: [[[4, 0], [6, 2], [5, 2], [5, 5], [7, 5], [6, 6], [7, 7], [5, 7], [5, 8], [4, 8]]] },
    { cols: 8, rows: 8, axis: { h: 4 }, paths: [[[1, 4], [1, 2], [2, 3], [3, 0], [5, 2], [5, 0], [6, 0], [6, 4]]] },
    { cols: 10, rows: 10, axis: { h: 5 }, paths: [[[1, 5], [1, 4], [4, 4], [4, 3], [3, 3], [5, 1], [7, 3], [6, 3], [6, 4], [9, 4], [9, 5]]] },
    { cols: 12, rows: 8, axis: { v: 6 }, paths: [[[6, 2], [8, 0], [11, 0], [11, 6], [8, 6], [6, 4]], [[9, 2], [10, 2], [10, 4], [9, 4], [9, 2]]] },
    { cols: 6, rows: 5, axis: { h: 2 }, paths: [[[1, 2], [1, 4], [3, 3], [4, 4], [5, 4], [5, 2]]] },
    { cols: 8, rows: 8, axis: { v: 4 }, paths: [[[4, 0], [3, 2], [4, 2], [2, 4], [3, 4], [0, 6], [3, 6], [3, 8], [4, 8]]] },
    { cols: 8, rows: 8, axis: { v: 4 }, paths: [[[4, 0], [0, 0], [0, 8], [4, 8]], [[0, 1], [3, 3], [4, 3]], [[0, 5], [3, 5], [4, 5]], [[0, 7], [3, 6], [4, 6]]] },
    { cols: 10, rows: 6, axis: { h: 3 }, paths: [[[0, 3], [0, 5], [1, 6], [4, 6], [5, 5], [6, 6], [9, 6], [10, 5], [10, 3]], [[2, 3], [2, 4], [3, 5], [4, 4], [4, 3]], [[6, 3], [6, 4], [7, 5], [8, 4], [8, 3]]] },
    { cols: 10, rows: 10, axis: { v: 5 }, paths: [[[5, 0], [7, 1], [9, 3], [10, 5], [9, 7], [7, 9], [5, 10]], [[5, 3], [7, 4], [8, 5], [7, 6], [5, 7]], [[5, 4], [6, 5], [5, 6]]] },
  ];
  /* KP3 B 图案 */
  const cellsOf = rows => { const g = {}; rows.forEach((row, r) => Object.keys(row).forEach(c => { g[`${c},${r}`] = row[c]; })); return g; };
  const F1 = 1;
  const patQ = [
    { cols: 8, rows: 6, axis: { v: 4 }, given: cellsOf([{ 1: F1, 3: F1 }, { 0: F1, 2: F1 }, { 1: F1, 3: F1 }, { 0: F1, 2: F1 }, { 1: F1, 3: F1 }, { 0: F1, 2: F1 }]) },
    { cols: 6, rows: 6, axis: { h: 3 }, given: cellsOf([{ 2: F1, 3: F1 }, { 1: F1, 4: F1 }, { 0: F1, 5: F1 }]) },
    { cols: 6, rows: 6, axis: { v: 3 }, given: cellsOf([{ 0: F1, 2: F1 }, { 1: F1 }, { 0: F1, 2: F1 }, { 1: F1 }, { 0: F1, 2: F1 }, { 1: F1 }]) },
    { cols: 6, rows: 6, axis: { h: 3 }, given: cellsOf([{ 1: 'tr', 2: 'tr', 3: 'tr', 4: 'tr', 5: 'tr' }, { 0: 'tr', 1: 'tr', 2: 'tr', 3: 'tr', 4: 'tr', 5: 'tr' }, { 0: 'tr', 1: 'tr', 2: 'tr', 3: 'tr', 4: 'tr', 5: 'tr' }]) },
    { cols: 6, rows: 6, axis: { v: 3 }, given: cellsOf([{ 1: F1 }, { 0: F1, 2: F1 }, { 0: F1, 2: F1 }, { 1: F1 }, { 0: F1, 2: F1 }, { 0: F1, 2: F1 }]) },
    { cols: 6, rows: 6, axis: { h: 3 }, given: cellsOf([{ 1: 'bl', 4: 'br' }, { 0: F1, 2: 'tr', 3: 'tl', 5: F1 }, { 0: 'tl', 1: 'tr', 3: 'br', 4: 'bl', 5: 'tr' }]) },
    { cols: 6, rows: 6, axis: { v: 3 }, given: cellsOf([0, 1, 2, 3, 4, 5].map(r => r % 2 === 0 ? { 0: F1, 1: 'br', 2: 'tl' } : { 0: 'tl', 1: F1, 2: 'br' })) },
    { cols: 6, rows: 6, axis: { h: 3 }, given: cellsOf([{ 0: F1, 5: F1 }, { 1: F1, 4: F1 }, { 2: F1, 3: F1 }]) },
    { cols: 8, rows: 8, axis: { v: 4 }, given: cellsOf([0, 1, 2, 3, 4, 5, 6, 7].map(r => r % 2 === 0 ? { 1: F1, 2: F1 } : { 0: F1, 3: F1 })) },
    { cols: 8, rows: 8, axis: { h: 4 }, given: cellsOf([{ 1: 'bl', 2: 'br', 5: 'bl', 6: 'br' }, { 0: 'bl', 1: F1, 2: F1, 3: 'br', 4: 'bl', 5: F1, 6: F1, 7: 'br' }, { 1: 'tl', 2: 'tr', 5: 'tl', 6: 'tr' }, { 3: 'bl', 4: 'br' }]) },
  ];

  unit(7).kps = [
    { id: 'l4-7-1', available: true, title: { zh: '认识对称图形', en: 'Identify symmetric figures' },
      intro: { zh: '沿一条线对折，两边能完全重合，这个图形就是对称的，这条线叫对称轴。', en: 'A figure is symmetric if it folds exactly onto itself. The fold line is the line of symmetry.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '字母对称吗？', en: "Write 'Yes' if the letter is symmetric and 'No' if it is not" }, example: { kind: 'l4letter', n: { ch: 'T', lines: ['v'] }, title: { zh: 'T 竖着折能重合：Yes', en: 'T is symmetric' } },
          questions: letters.map(([ch, lines], i) => F(`l4-7-1-A${i + 1}`, pic(G.letterSVG(ch, { w: 150 })), `${ch}: {{a}}`, { a: YN(lines.length > 0) }, ['l4letter', { ch, lines }], `字母 ${ch} 对称吗？`, `Is the letter ${ch} symmetric?`, { label: `${ch}: ${lines.length ? 'Yes' : 'No'}`, hint: { zh: '想一想竖着折、横着折能不能完全重合。', en: 'Try folding it vertically and horizontally.' } })) },
        { id: 'B', type: 'fill', title: { zh: '虚线是对称轴吗？', en: "Write 'Yes' if the dotted line is a line of symmetry, 'No' if it is not" }, example: { kind: 'l4dotline', n: { d: star, axis: 'h', yes: false }, title: { zh: '星星横着折，上下对不上：No', en: 'Not a line of symmetry' } },
          questions: dotted.map(([d, axis, yes], i) => F(`l4-7-1-B${i + 1}`, pic(G.figSVG(d, { axis, w: 170 })), `{{a}}`, { a: YN(yes) }, ['l4dotline', { d, axis, yes }], '虚线是对称轴吗？', 'Is the dotted line a line of symmetry?', { label: `图 ${i + 1}: ${yes ? 'Yes' : 'No'}`, hint: { zh: '沿虚线对折，两边完全一样才是。', en: 'Fold along the dotted line.' } })) },
      ] },
    { id: 'l4-7-2', available: true, title: { zh: '找出对称轴', en: 'Identify the lines of symmetry in figures' },
      intro: { zh: '有的图形有一条对称轴，有的有好几条（正方形 4 条、五角星 5 条、正六边形 6 条）。', en: 'Some figures have more than one line of symmetry.' },
      sections: [{ id: 'A', type: 'l4symlines', title: { zh: '点出所有对称轴', en: 'Mark the line(s) of symmetry in each figure' }, example: { kind: 'l4symlines', n: { d: 'M50 10 L90 50 L50 90 L10 50 Z', cands: [V, H, D1, D2], answer: [0, 1] }, title: { zh: '菱形：竖线、横线是对称轴，斜线不是', en: 'A rhombus has 2 lines of symmetry' } },
        questions: symQ.map(([d, cands, answer], i) => ({ id: `l4-7-2-A${i + 1}`, type: 'l4symlines', d, cands, answer, label: `图 ${i + 1}：${answer.length} 条对称轴` })) }] },
    { id: 'l4-7-3', available: true, title: { zh: '补全对称图形和图案', en: 'Complete symmetric figures and patterns' },
      intro: { zh: '补另一半：每个点到对称轴几格，对面就几格。涂格子的图案一列对一列、一行对一行地照着涂，半格要翻方向。', en: 'Each point goes the same distance across the line. Mirror patterns cell by cell.' },
      sections: [
        { id: 'A', type: 'l4mirror', title: { zh: '补全对称图形', en: 'Complete the symmetric figures' }, example: { kind: 'l4mirror', n: { cols: 6, rows: 6, axis: { v: 3 }, paths: [[[3, 0], [1, 2], [2, 2], [2, 5], [3, 5]]] }, title: { zh: '每个顶点翻到对面同样远的地方', en: 'Mirror each vertex' } }, questions: mirQ.map((q, i) => Object.assign({ id: `l4-7-3-A${i + 1}`, type: 'l4mirror', label: `补全图形 ${i + 1}` }, q)) },
        { id: 'B', type: 'l4pattern', title: { zh: '补全对称图案', en: 'Complete the symmetric patterns' }, example: { kind: 'l4pattern', n: { cols: 6, rows: 4, axis: { v: 3 }, given: cellsOf([{ 0: F1, 2: 'tr' }, { 1: F1 }, { 0: 'bl', 2: F1 }, { 1: F1 }]) }, title: { zh: '一列对一列涂，半格翻方向', en: 'Mirror the cells' } }, questions: patQ.map((q, i) => Object.assign({ id: `l4-7-3-B${i + 1}`, type: 'l4pattern', label: `补全图案 ${i + 1}` }, q)) },
      ] },
  ];
})();
