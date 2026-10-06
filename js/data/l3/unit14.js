/* Level 3 · Unit 14  角 */
(function () {
  const U = window.MATH_DATA.levels[3].units;
  const unit = num => U.find(u => u.num === num);
  const L = window.L3;
  // [deg, rot]
  const angles = [[35, 0], [135, 0], [125, 0], [90, 90], [25, 180], [90, 0], [110, 70], [30, 95], [40, 100], [90, 270], [120, 230], [90, 180]];
  const figs = [
    [[[10, 60], [90, 60], [90, 10]], [1]],
    [[[10, 10], [80, 10], [55, 40], [80, 70], [10, 70]], [0, 4]],
    [[[10, 10], [80, 10], [20, 52], [76, 36], [80, 70], [10, 70]], [0, 5]],
    [[[15, 10], [85, 5], [82, 62], [15, 62]], [3]],
    [[[10, 15], [55, 10], [85, 45], [85, 70], [65, 70], [65, 55], [10, 55]], [4, 5, 6]],
    [[[10, 10], [65, 10], [65, 45], [85, 72], [10, 66]], [0, 1]],
  ];
  const opts = ['Acute 锐角', 'Right 直角', 'Obtuse 钝角'];
  unit(14).kps = [{
    id: 'l3-14-1', available: true,
    title: { zh: '认识角和直角', en: 'Identify angles and right angles' },
    intro: { zh: '直角（right angle）是正方形的角，用小方块标记。比直角小的是锐角（acute），比直角大的是钝角（obtuse）。拿一个直角去比一比就知道。', en: 'A right angle is a square corner. Smaller: acute. Larger: obtuse.' },
    sections: [
      { id: 'A', type: 'pickone', title: { zh: '这是什么角', en: 'Identify the angles. Put a tick in the correct box' },
        example: { kind: 'l3angle', n: { deg: 60, rot: 10 }, title: { zh: '比直角小：锐角', en: 'Acute angle' } },
        questions: angles.map(([deg, rot], i) => ({ id: `l3-14-1-A${i + 1}`, type: 'pickone', pic: `<div class="center">${L.angleSVG(deg, rot)}</div>`, label: `角 ${i + 1}`, options: opts, answer: deg < 90 ? 0 : deg === 90 ? 1 : 2, prompt: { zh: '这个角是锐角、直角还是钝角？', en: 'Acute, right or obtuse?' }, hint: { zh: '和书的角（直角）比一比：小的锐角，正好直角，大的钝角。', en: 'Compare with a square corner.' }, explain: ['l3angle', { deg, rot }] })) },
      { id: 'B', type: 'l3rightpick', title: { zh: '标出直角', en: 'Mark all the right angles in each figure' },
        example: { kind: 'l3rightfig', n: { pts: [[10, 10], [80, 10], [80, 70], [10, 70]] }, title: { zh: '长方形有 4 个直角', en: 'A rectangle has 4 right angles' } },
        questions: figs.map(([pts, answer], i) => ({ id: `l3-14-1-B${i + 1}`, type: 'l3rightpick', pts, answer, label: `图 (${'abcdef'[i]})：${answer.length} 个直角` })) },
    ],
  }];
})();
