/* Level 3 · Unit 15  垂直与平行 */
(function () {
  const U = window.MATH_DATA.levels[3].units;
  const unit = num => U.find(u => u.num === num);
  const G = window.L3.geo;
  const seg = (name, a, b) => ({ name, a, b });
  const pic = (n, segs, o) => `<div class="center">${G.grid(n, segs, o)}</div>`;
  // 判断题：segs 两条（无名字）
  const tick = (id, n, segs, rel, i) => { const [s, t] = segs; const ok = rel === 'perp' ? G.isPerp(s, t) && G.intersects(s, t) : G.isPara(s, t); return { id, type: 'pickone', pic: pic(n, segs.map(x => Object.assign({ showName: false }, x))), label: `图 ${i + 1}：${ok ? '✓' : '✗'}`, options: ['✓ 是', '✗ 不是'], answer: ok ? 0 : 1, prompt: { zh: rel === 'perp' ? '这两条线互相垂直吗？' : '这两条线互相平行吗？', en: rel === 'perp' ? 'Is the pair of lines perpendicular?' : 'Is the pair of lines parallel?' }, hint: rel === 'perp' ? { zh: '看相交的地方是不是正方形的角。', en: 'Do they meet at a right angle?' } : { zh: '看两条线走向是不是一样（横竖格子数相同）。', en: 'Do they go the same way?' }, explain: ['l3perpcheck', { n, segs, rel }] }; };
  // 找出所有垂直/平行的线对（多选）
  const pairs = (id, n, segs, rel, labels) => { const opts = [], ans = []; segs.forEach((s, i) => segs.slice(i + 1).forEach(t => { const val = `${s.name}|${t.name}`; const html = `${s.name} ${rel === 'perp' ? '⊥' : '//'} ${t.name}`; const ok = rel === 'perp' ? G.isPerp(s, t) && G.intersects(s, t) : G.isPara(s, t) && !G.collinear(s, t); if (ok || opts.length < 14 || Math.random() < 0) opts.push({ val, html, text: html }); if (ok) ans.push(val); }));
    // 控制选项数：保留全部正确 + 至多 9 个干扰
    const wrong = opts.filter(o => !ans.includes(o.val)).slice(0, 9), right = opts.filter(o => ans.includes(o.val)); const all = right.concat(wrong).sort((x, y) => x.val < y.val ? -1 : 1);
    return { id, type: 'pickmany', pic: pic(n, segs, { labels }), label: `${ans.length} 对`, options: all, answer: ans, prompt: { zh: rel === 'perp' ? '找出图中所有互相垂直的线对（点选所有）' : '找出图中所有互相平行的线对（点选所有）', en: rel === 'perp' ? 'Identify all pairs of perpendicular lines.' : 'Identify all pairs of parallel lines.' }, hint: rel === 'perp' ? { zh: '横线和竖线相交一定垂直；两条斜线一个往右上一个往右下、格数相同也垂直。', en: 'Look for square corners.' } : { zh: '方向一样的才平行：都横、都竖，或斜的横竖格数一样。', en: 'Same direction.' }, explain: ['l3pairs', { n, segs, rel, labels }] }; };
  const drawQ = (id, n, base, rel, count, fixed, labels) => ({ id, type: 'l3drawline', n, base, rel, count, fixed, labels, label: `画 ${count} 条${rel === 'perp' ? '垂' : '平行'}线` });

  /* ---- 垂直 ---- */
  const perpTick = [[seg('', [1, 1], [1, 5]), seg('', [1, 1], [4, 1])], [seg('', [0, 3], [2, 1]), seg('', [2, 1], [4, 3])], [seg('', [1, 0], [1, 5]), seg('', [1, 0], [4, 3])], [seg('', [1, 1], [3, 3]), seg('', [3, 3], [1, 5])], [seg('', [0, 3], [5, 3]), seg('', [1, 5], [4, 1])], [seg('', [1, 1], [3, 5]), seg('', [1, 4], [4, 1])]];
  const perpB1 = [seg('AB', [0, 3], [7, 3]), seg('DC', [1, 0], [1, 4]), seg('KJ', [3, 0], [6, 3]), seg('FE', [1, 6], [3, 3]), seg('HG', [4, 7], [4, 3])];
  const perpB2 = [seg('AB', [6, 6], [1, 1]), seg('CD', [0, 2], [2, 0]), seg('KJ', [7, 3], [4, 6]), seg('NO', [3, 1], [7, 1]), seg('LM', [5, 5], [5, 1]), seg('EF', [2, 8], [4, 4]), seg('GH', [4, 9], [4, 6])];
  const perpB3 = [seg('AB', [0, 3], [2, 1]), seg('BC', [2, 1], [2, 2]), seg('CD', [2, 2], [5, 2]), seg('DE', [5, 2], [5, 4]), seg('EF', [5, 4], [2, 4]), seg('FG', [2, 4], [2, 5]), seg('GA', [2, 5], [0, 3])];
  const perpB4 = [seg('AB', [0, 5], [0, 2]), seg('BC', [0, 2], [2, 2]), seg('CD', [2, 2], [2, 0]), seg('DE', [2, 0], [3, 0]), seg('EF', [3, 0], [3, 2]), seg('FG', [3, 2], [5, 2]), seg('GH', [5, 2], [5, 5]), seg('HA', [5, 5], [0, 5])];
  const perpDraw = [[seg('YZ', [1, 4], [7, 4])], [seg('YZ', [1, 2], [6, 7])], [seg('YZ', [4, 0], [4, 7])], [seg('YZ', [0, 7], [7, 0])]];
  const perpThrough = [[seg('AB', [1, 4], [7, 4]), [[4, 1]]], [seg('EF', [2, 0], [2, 6]), [[5, 3]]], [seg('KL', [6, 1], [1, 6]), [[2, 1], [5, 5]]], [seg('ST', [1, 1], [6, 6]), [[2, 5], [6, 3]]]];
  /* ---- 平行 ---- */
  const paraTick = [[seg('', [1, 1], [4, 1]), seg('', [1, 4], [4, 4])], [seg('', [0, 0], [4, 3]), seg('', [0, 2], [4, 4])], [seg('', [0, 4], [2, 1]), seg('', [3, 1], [5, 4])], [seg('', [1, 4], [3, 0]), seg('', [2, 4], [4, 0])], [seg('', [1, 1], [1, 5]), seg('', [3, 0], [3, 4])], [seg('', [0, 1], [4, 1]), seg('', [0, 3], [4, 4])]];
  const paraB1 = [seg('AB', [0, 4], [5, 4]), seg('BC', [5, 4], [4, 0]), seg('DC', [1, 0], [4, 0]), seg('AD', [0, 4], [1, 0])];
  const paraB2 = [seg('AB', [0, 4], [4, 4]), seg('BC', [4, 4], [5, 0]), seg('DC', [1, 0], [5, 0]), seg('AD', [0, 4], [1, 0])];
  const paraB3 = [seg('CD', [0, 0], [4, 0]), seg('DE', [4, 0], [5, 1]), seg('EF', [5, 1], [4, 2]), seg('AF', [0, 2], [4, 2]), seg('AB', [0, 2], [1, 1]), seg('CB', [0, 0], [1, 1])];
  const paraB4 = [seg('CD', [0, 1], [7, 1]), seg('AB', [0, 3], [7, 3]), seg('EF', [1, 0], [2, 4]), seg('GH', [2, 0], [3, 5]), seg('JK', [4, 0], [4, 5]), seg('ML', [5, 0], [6, 5])];
  const paraB5 = [seg('AB', [0, 7], [3, 7]), seg('LM', [1, 5], [4, 5]), seg('HG', [3, 0], [3, 3]), seg('FE', [6, 0], [6, 3]), seg('ON', [4, 1], [0, 5]), seg('KJ', [7, 2], [3, 6]), seg('PQ', [0, 0], [2, 2]), seg('DC', [7, 4], [5, 3])];
  const paraDraw = [[seg('YZ', [3, 1], [3, 5])], [seg('YZ', [4, 1], [2, 6])], [seg('YZ', [1, 1], [4, 5])]];
  const paraThrough = [[seg('AB', [4, 0], [4, 6]), [[1, 3]]], [seg('EF', [0, 2], [5, 2]), [[2, 5]]], [seg('KL', [0, 1], [4, 3]), [[3, 0], [2, 5]]], [seg('ST', [6, 1], [2, 5]), [[3, 1], [6, 5]]]];
  const lbl = segs => { const m = new Map(); segs.forEach(s => { m.set(s.name[0], s.a); m.set(s.name[1], s.b); }); return [...m.entries()].map(([t, p]) => ({ p, t })); };

  unit(15).kps = [
    {
      id: 'l3-15-1', available: true,
      title: { zh: '垂直线', en: 'Identify and draw perpendicular lines' },
      intro: { zh: '两条线相交成直角（正方形的角），就叫互相垂直，记作 AB ⊥ CD，交点处画一个小方块。横线和竖线相交一定垂直。', en: 'Perpendicular lines meet at a right angle. We write AB ⊥ CD.' },
      sections: [
        { id: 'A', type: 'pickone', title: { zh: '是不是垂直', en: 'Put a tick if the pair of lines is perpendicular, a cross if not' },
          example: { kind: 'l3perpcheck', n: { n: 5, segs: [seg('', [1, 1], [1, 4]), seg('', [1, 4], [4, 4])], rel: 'perp' }, title: { zh: '竖线和横线相交：垂直 ✓', en: 'Perpendicular' } },
          questions: perpTick.map((segs, i) => tick(`l3-15-1-A${i + 1}`, 5, segs, 'perp', i)) },
        { id: 'B', type: 'pickmany', title: { zh: '找出所有垂直的线对', en: 'For each diagram, identify all pairs of perpendicular lines' },
          example: { kind: 'l3pairs', n: { n: 5, segs: [seg('AB', [0, 2], [5, 2]), seg('CD', [2, 0], [2, 4]), seg('EF', [3, 4], [5, 0])], rel: 'perp' }, title: { zh: 'AB ⊥ CD', en: 'AB ⊥ CD' } },
          questions: [[8, perpB1], [10, perpB2], [6, perpB3], [6, perpB4]].map(([n, segs], i) => pairs(`l3-15-1-B${i + 1}`, n, segs, 'perp', lbl(segs))) },
        { id: 'C', type: 'l3drawline', title: { zh: '画 3 条垂直于 YZ 的线', en: 'Draw 3 lines perpendicular to YZ. Each line must pass through at least two points on the grid' },
          example: { kind: 'l3drawexp', n: { n: 7, base: seg('YZ', [1, 3], [6, 3]), rel: 'perp' }, title: { zh: '横线 YZ 的垂线是竖线', en: 'Perpendicular to a horizontal line' } },
          questions: perpDraw.map(([base], i) => drawQ(`l3-15-1-C${i + 1}`, 7, base, 'perp', 3)) },
        { id: 'D', type: 'l3drawline', title: { zh: '过某点画垂线', en: 'Draw a line perpendicular to the given line through the given point(s)' },
          example: { kind: 'l3drawexp', n: { n: 7, base: seg('AB', [1, 5], [6, 5]), rel: 'perp', fixed: [3, 2] }, title: { zh: '过点 C 画 AB 的垂线', en: 'Through point C' } },
          questions: perpThrough.map(([base, fixed], i) => drawQ(`l3-15-1-D${i + 1}`, 7, base, 'perp', fixed.length, fixed)) },
      ],
    },
    {
      id: 'l3-15-2', available: true,
      title: { zh: '平行线', en: 'Identify and draw parallel lines' },
      intro: { zh: '两条线方向一样、永远不会相交，就叫互相平行，记作 AB // CD，用箭头 ▸▸ 标记。在格子上看：横走几格、竖走几格都相同就平行。', en: 'Parallel lines never meet. We write AB // CD.' },
      sections: [
        { id: 'A', type: 'pickone', title: { zh: '是不是平行', en: 'Put a tick if the pair of lines is parallel, a cross if not' },
          example: { kind: 'l3perpcheck', n: { n: 5, segs: [seg('', [0, 1], [3, 4]), seg('', [1, 0], [4, 3])], rel: 'para' }, title: { zh: '两条斜线走向一样：平行 ✓', en: 'Parallel' } },
          questions: paraTick.map((segs, i) => tick(`l3-15-2-A${i + 1}`, 5, segs, 'para', i)) },
        { id: 'B', type: 'pickmany', title: { zh: '找出所有平行的线对', en: 'For each diagram, identify all pairs of parallel lines' },
          example: { kind: 'l3pairs', n: { n: 5, segs: [seg('AB', [0, 1], [5, 1]), seg('CD', [0, 4], [5, 4]), seg('EF', [1, 0], [1, 5])], rel: 'para' }, title: { zh: 'AB // CD', en: 'AB // CD' } },
          questions: [[6, paraB1], [6, paraB2], [6, paraB3], [8, paraB4], [8, paraB5]].map(([n, segs], i) => pairs(`l3-15-2-B${i + 1}`, n, segs, 'para', lbl(segs))) },
        { id: 'C', type: 'l3drawline', title: { zh: '画 2 条平行于 YZ 的线', en: 'Draw 2 lines parallel to YZ. Each line must pass through at least two points on the grid' },
          example: { kind: 'l3drawexp', n: { n: 7, base: seg('YZ', [2, 1], [5, 5]), rel: 'para' }, title: { zh: '走向一样的线', en: 'Same direction' } },
          questions: paraDraw.map(([base], i) => drawQ(`l3-15-2-C${i + 1}`, 7, base, 'para', 2)) },
        { id: 'D', type: 'l3drawline', title: { zh: '过某点画平行线', en: 'Draw a line parallel to the given line through the given point(s)' },
          example: { kind: 'l3drawexp', n: { n: 7, base: seg('AB', [1, 1], [5, 3]), rel: 'para', fixed: [1, 4] }, title: { zh: '过点 C 画 AB 的平行线', en: 'Through point C' } },
          questions: paraThrough.map(([base, fixed], i) => drawQ(`l3-15-2-D${i + 1}`, 7, base, 'para', fixed.length, fixed)) },
      ],
    },
  ];
})();
