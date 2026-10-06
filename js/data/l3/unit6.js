/* Level 3 · Unit 6  乘法（竖式） */
(function () {
  const U = window.MATH_DATA.levels[3].units;
  const unit = num => U.find(u => u.num === num);
  const num = a => ({ a });
  const C = (id, a, b, o) => Object.assign({ id, type: 'column', a, b, op: '×', width: a * b >= 1000 ? 4 : 3, label: `${a} × ${b} = ${a * b}` }, o || {});
  const F = (id, p, text, fields, explain, zh, en, o) => Object.assign({ id, type: 'fill', pic: p, label: text.replace(/\{\{\w+\}\}/g, '___').replace(/\n/g, ' '), prompt: { zh, en: en || 'Fill in the blanks' }, text, fields, answerText: Object.values(fields).map(f => f.a).join(', '), explain }, o || {});

  const noA = [[112, 4], [33, 2], [210, 2], [302, 3], [442, 2], [212, 4], [31, 3], [100, 3], [121, 4], [134, 2]];
  const matchA = [[49, 5], [147, 4], [94, 2], [231, 7], [375, 3], [105, 8]];
  const crossB = [['a', 112, 8], ['b', 79, 9], ['c', 62, 5], ['d', 214, 4], ['e', 118, 7], ['f', 91, 7], ['g', 102, 6], ['h', 46, 8], ['i', 98, 9], ['j', 80, 8]];
  const balloons = [[537, 6, 'H'], [416, 5, 'O'], [133, 7, 'W'], [600, 2, 'B'], [204, 5, 'E'], [743, 4, 'L'], [391, 8, 'T'], [169, 9, 'N'], [824, 3, 'C']];
  const nameSeq = [1200, 2080, 1200, 2080, null, 3128, 3222, 1020, null, 2472, 2972, 2080, 931, 1521];
  const letterOf = v => balloons.find(b => b[0] * b[1] === v)[2];
  const name = nameSeq.map(v => v === null ? ' ' : letterOf(v)).join('');

  unit(6).kps = [
    {
      id: 'l3-6-1', available: true,
      title: { zh: '不进位乘法', en: 'Multiply numbers without regrouping' },
      intro: { zh: '竖式乘法：乘数写在个位下面。先用个位乘，再用十位乘，再用百位乘，每一位的结果写在对应的位上。', en: 'Multiply the ones first, then the tens, then the hundreds.' },
      sections: [
        { id: 'A', type: 'column', title: { zh: '列竖式乘', en: 'Multiply these numbers. Show your working clearly' },
          example: { kind: 'l3mulcol', n: { a: 12, b: 4 }, title: { zh: '12 × 4：2 × 4 = 8，1 个十 × 4 = 4 个十，48', en: '12 × 4 = 48' } },
          questions: noA.map(([a, b], i) => C(`l3-6-1-A${i + 1}`, a, b)) },
      ],
    },
    {
      id: 'l3-6-2', available: true,
      title: { zh: '进位乘法', en: 'Multiply numbers by regrouping ones, tens, hundreds and thousands' },
      intro: { zh: '某一位乘出来满 10 就进位：9 × 5 = 45 个一 = 4 个十 5 个一，写 5 进 4，下一位乘完要加上进的 4。', en: 'Regroup when a product is 10 or more. Add the carried number to the next place.' },
      sections: [
        { id: 'A', type: 'match', title: { zh: '门找房子', en: 'Match each door to the correct house' },
          example: { kind: 'l3mulcol', n: { a: 49, b: 5 }, title: { zh: '49 × 5 = 245', en: '49 × 5 = 245' } },
          questions: [{ id: 'l3-6-2-A1', type: 'match', label: '门（算式）连房子（积）', left: matchA.map(([a, b]) => ({ id: `${a}x${b}`, html: `🚪 ${a} × ${b}`, text: `${a} × ${b}` })), right: [188, 1125, 840, 245, 588, 1617].map(n => ({ id: String(n), html: `🏠 ${n}`, text: String(n) })), pairs: Object.fromEntries(matchA.map(([a, b]) => [`${a}x${b}`, String(a * b)])), prompt: { zh: '算出每扇门上的乘法，连到积相同的房子', en: 'Work out each product and match it to the house.' }, hint: { zh: '一个一个列竖式算。', en: 'Multiply in columns one at a time.' }, explain: ['l3mulcol', { a: 147, b: 4 }] }] },
        { id: 'B', type: 'fill', title: { zh: '填字游戏（填数字）', en: 'Fill in each box with the correct answer' },
          example: { kind: 'l3mulcol', n: { a: 112, b: 8 }, title: { zh: '112 × 8 = 896', en: '112 × 8 = 896' } },
          questions: crossB.map(([k, a, b], i) => F(`l3-6-2-B${i + 1}`, '', `(${k}) ${a} × ${b} = {{p}}`, { p: num(a * b) }, ['l3mulcol', { a, b }], `${a} × ${b} 是多少？`, `(${k}) ${a} × ${b}`, { label: `${a} × ${b} = ${a * b}`, hint: { zh: '列竖式，从个位乘起，注意进位。', en: 'Multiply in columns.' } })) },
        { id: 'C', type: 'fill', title: { zh: '气球：她最喜欢的明星是谁', en: 'Sandra is watching a circus performance with her family. Find out who her favourite star is' },
          example: { kind: 'l3mulcol', n: { a: 537, b: 6 }, title: { zh: '537 × 6 = 3222 → H', en: '537 × 6 = 3222' } },
          questions: balloons.map(([a, b, L], i) => F(`l3-6-2-C${i + 1}`, '', `🎈 ${a} × ${b} = {{p}}　（字母 ${L}）`, { p: num(a * b) }, ['l3mulcol', { a, b }], `算出气球上的积，这个积对应字母 ${L}`, `${a} × ${b}`, { label: `${a} × ${b} = ${a * b} (${L})`, hint: { zh: '列竖式，注意每一位的进位。', en: 'Multiply in columns.' } }))
            .concat([F('l3-6-2-C10', `<div class="center" style="font-size:18px;line-height:2">${nameSeq.map(v => v === null ? '<span style="display:inline-block;width:24px"></span>' : `<span style="display:inline-block;width:52px;border-bottom:2px solid #888;text-align:center;margin:0 3px">${v}</span>`).join('')}</div>`, 'Her favourite star is {{w}}.', { w: { a: name, kind: 'choice', options: [name, 'BOBO THE LION', 'TOTO THE CLOWN', 'BOBO THE TIGER'] } }, ['l3mulcol', { a: 600, b: 2 }], '把每个数换成对应的字母，拼出名字', 'Who is her favourite star?', { label: name, hint: { zh: '1200 是 600 × 2 → B，2080 是 416 × 5 → O……', en: 'Match each number to its letter.' } })]) },
      ],
    },
  ];
})();
