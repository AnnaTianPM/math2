/* Level 1 · Unit 7  20 以内的数 */
(function () {
  const U = window.MATH_DATA.levels[1].units;
  const unit = num => U.find(u => u.num === num);
  const L = window.L1, W = n => L.WORDS[n], shp = L.shp;
  const pic = html => `<div class="center">${html}</div>`;
  const choice = (a, options) => ({ a, kind: 'choice', options });
  const wordOpts = n => { const s = Math.max(10, Math.min(n - 1, 17)); return Array.from({ length: 4 }, (_, i) => W(s + i)); };
  const F = (id, p, text, fields, explain, zh, en, o) => Object.assign({ id, type: 'fill', pic: p, label: text.replace(/\{\{\w+\}\}/g, '___').replace(/\n/g, ' '), prompt: { zh, en: en || 'Fill in the blanks' }, text, fields, answerText: Object.values(fields).map(f => f.a).join(', '), explain }, o || {});
  const frames = (icon, n) => `<div class="frames2">${L.frame(icon, 10)}<span class="bond-plus">＋</span>${L.frame(icon, n - 10)}</div>`;
  const loose = (icon, n) => `<div class="bond-groups">${L.row(icon, 10)}<span class="bond-plus">＋</span>${L.row(icon, n - 10)}</div>`;
  const dots2 = (a, b) => pic(`<div class="cmp-dots">${[a, b].map(n => `<div class="dots20"><b>${n}</b>${L.frame('⚪', Math.min(10, n), { cls: 'small' })}${L.frame('⚪', Math.max(0, n - 10), { cls: 'small' })}</div>`).join('')}</div>`);
  const dots3 = nums => pic(`<div class="cmp-dots">${nums.map(n => `<div class="dots20"><b>${n}</b>${L.frame('⚪', Math.min(10, n), { cls: 'small' })}${L.frame('⚪', Math.max(0, n - 10), { cls: 'small' })}</div>`).join('')}</div>`);

  const countA = [['📦', 18], ['🍦', 17], ['✏️', 11], ['🧽', 20], ['✂️', 16]];
  const wordsB = [['🪀', 13], ['🎀', 14], ['🔑', 12], ['🧦', 15], ['🎩', 19]];
  const nwC = [[11, 'n'], [18, 'w'], [20, 'n'], [12, 'w'], [14, 'n'], [15, 'w'], [13, 'w'], [16, 'n'], [17, 'w'], [19, 'n']];
  const makeD = [['🕯️', 14], ['🍬', 18], ['💡', 17], ['🍩', 20], ['🔨', 12]];
  const makeE = [13, 17, 14, 11, 20, 16, 12, 19, 15, 18];
  const tensA = [['🦀', 20], ['🐟', 16], ['🍌', 13], ['🔮', 19], ['🚚', 11], ['🖊️', 14], ['💍', 17], ['🍪', 12], ['🔧', 18], ['🐛', 15]];
  const tensB = [[13, 't'], [15, 't'], [17, 'o'], [19, 'o'], [14, 't'], [11, 't'], [20, 'o'], [18, 'o'], [12, 'b'], [16, 'b']];
  const smallA = [[20, 11], [15, 17], [13, 10], [18, 12], [16, 19]];
  const greatB = [[20, 15], [14, 18], [10, 16], [13, 11], [17, 12]];
  const smallC = [[12, 16, 14], [15, 17, 13], [13, 10, 16], [14, 11, 17], [17, 20, 14]];
  const greatD = [[14, 20, 18], [15, 13, 17], [16, 19, 13], [16, 13, 14], [16, 17, 18]];
  const descE = [[12, 10, 14], [15, 18, 12], [20, 14, 17], [16, 19, 20], [18, 15, 17]];
  const ascF = [[15, 11, 19], [15, 16, 14], [12, 14, 13], [20, 10, 15], [20, 17, 13]];
  const mlA = [[11, 1, 'a'], [14, -1, 'a'], [16, 1, 'a'], [20, -1, 'a'], [17, 1, 'b'], [18, -1, 'b'], [15, 1, 'b'], [19, -1, 'b'], [13, 1, 'b'], [16, -1, 'b'], [19, 1, 'b'], [11, -1, 'b']];
  const patB = [[[10, 11, 12, 13], [1], 'circ'], [[16, 15, 14, 13], [2], 'trid'], [[11, 12, 13, 14, 15], [3, 4], 'dia'], [[18, 17, 16, 15, 14], [3, 4], 'tri'], [[12, 13, 14, 15, 16], [1, 3], 'sq'], [[8, 9, 10, 11, 12, 13], [3, 4, 5], 'trid'], [[15, 16, 17, 18, 19, 20], [0, 1, 5], 'circ'], [[20, 19, 18, 17, 16, 15], [1, 2, 4], 'trid']];
  const nums = n => String(n);

  unit(7).kps = [
    {
      id: 'l1-7-1', available: true,
      title: { zh: '数一数：10 到 20', en: 'Count numbers from 10 to 20' },
      intro: { zh: '先圈出 10 个，再接着数 11、12……10 和几合起来就是十几。', en: 'Circle 10 first, then count on: 11, 12 ... 10 and some more make a teen number.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '数一数，写数字', en: 'Count and write the correct number in numerals on each line' },
          example: { kind: 'l1teen', n: { icon: '📏', n: 15 }, title: { zh: '10 and 5 make 15', en: '10 and 5 make 15' } },
          questions: countA.map(([icon, n], i) => F(`l1-7-1-A${i + 1}`, pic(loose(icon, n)), `{{a}}`, { a: { a: n } }, ['l1teen', { icon, n }], '先圈 10 个，再接着数，一共几个？', 'Count and write the number', { label: `${icon} × ${n}`, hint: { zh: `左边正好 10 个，再数右边的：10 and ${n - 10} make ${n}。`, en: `10 and ${n - 10}.` } })) },
        { id: 'B', type: 'fill', title: { zh: '数一数，写英文', en: 'Count and write the correct number in words on each line' },
          example: { kind: 'l1teen', n: { icon: '🧸', n: 17, words: true }, title: { zh: '10 and 7 make 17：seventeen', en: 'seventeen' } },
          questions: wordsB.map(([icon, n], i) => F(`l1-7-1-B${i + 1}`, pic(loose(icon, n)), `10 and {{k}} make {{n}}.\n{{w}}`, { k: { a: n - 10 }, n: { a: n }, w: choice(W(n), wordOpts(n)) }, ['l1teen', { icon, n, words: true }], '10 和几合起来是几？再选英文', 'Count and write in words', { label: `${icon} × ${n} = ${W(n)}`, hint: { zh: `${n} 的英文：${W(n)}。`, en: W(n) } })) },
        { id: 'C', type: 'fill', title: { zh: '数字和英文', en: 'Write the correct number in numerals or words' },
          example: { kind: 'l1teen', n: { icon: '🔵', n: 11, words: true }, title: { zh: '11 eleven、12 twelve、13 thirteen……20 twenty', en: 'eleven, twelve, thirteen ... twenty' } },
          questions: nwC.map(([n, k], i) => F(`l1-7-1-C${i + 1}`, pic(`<div class="wordtab">${[10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(x => `<span class="${x === n ? 'hl' : ''}"><b>${k === 'n' ? x : (x === n ? '?' : x)}</b>${k === 'w' ? W(x) : (x === n ? '?' : W(x))}</span>`).join('')}</div>`), k === 'n' ? `${n} = {{w}}` : `${W(n)} = {{n}}`, k === 'n' ? { w: choice(W(n), wordOpts(n)) } : { n: { a: n } }, ['l1teen', { icon: '🔵', n, words: true }], k === 'n' ? `${n} 的英文是什么？` : `${W(n)} 是几？`, k === 'n' ? 'Write in words' : 'Write in numerals', { label: `${n} = ${W(n)}`, hint: { zh: '看上面的对照表。', en: 'Use the table.' } })) },
        { id: 'D', type: 'fill', title: { zh: '10 和几合起来', en: 'Count and fill in each blank with the correct answer' },
          example: { kind: 'l1teen', n: { icon: '🍔', n: 16 }, title: { zh: '10 and 6 make 16', en: '10 and 6 make 16' } },
          questions: makeD.map(([icon, n], i) => F(`l1-7-1-D${i + 1}`, pic(frames(icon, n)), `10 and {{k}} make {{n}}.`, { k: { a: n - 10 }, n: { a: n } }, ['l1teen', { icon, n }], '满的十格图是 10，第二个框里有几个？合起来是几？', '10 and ___ make ___', { label: `10 and ${n - 10} make ${n}`, hint: { zh: '数第二个框里的。', en: 'Count the second frame.' } })) },
        { id: 'E', type: 'fill', title: { zh: '填一填', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'l1teen', n: { icon: '🔵', n: 14 }, title: { zh: '10 and 4 make 14', en: '10 and 4 make 14' } },
          questions: makeE.map((n, i) => F(`l1-7-1-E${i + 1}`, '', `10 and {{k}} make ${n}.`, { k: { a: n - 10 } }, ['l1teen', { icon: '🔵', n }], `10 和几合起来是 ${n}？`, undefined, { label: `10 and ${n - 10} make ${n}`, hint: { zh: `从 10 数到 ${n} 数了几个。`, en: `Count on from 10 to ${n}.` } })) },
      ],
    },
    {
      id: 'l1-7-2', available: true,
      title: { zh: '几个十、几个一', en: 'Use tens and ones to show numbers from 10 to 20' },
      intro: { zh: '10 个一捆成 1 个十（1 ten）。十几 = 1 ten 和几个 ones；20 = 2 tens 0 ones。', en: '10 ones make 1 ten. A teen number is 1 ten and some ones. 20 is 2 tens 0 ones.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '看图写几个十几个一', en: 'Circle 10. Fill in each blank with the correct answer' },
          example: { kind: 'l1tensones', n: { icon: '🐚', n: 15 }, title: { zh: '1 ten 5 ones = 15', en: '1 ten 5 ones = 15' } },
          questions: tensA.map(([icon, n], i) => { const t = Math.floor(n / 10), o = n % 10;
            return F(`l1-7-2-A${i + 1}`, pic(loose(icon, n)), `{{t}} ten${t > 1 ? 's' : ''} {{o}} one${o === 1 ? '' : 's'} = {{n}}`, { t: { a: t }, o: { a: o }, n: { a: n } }, ['l1tensones', { icon, n }], '圈出 10 个是 1 个十，剩下几个一？', 'tens and ones', { label: `${icon}：${t} ten ${o} ones = ${n}`, hint: { zh: n === 20 ? '两组都是满 10，所以是 2 tens 0 ones。' : `1 ten，剩下 ${o} ones。`, en: `${t} tens ${o} ones.` } }); }) },
        { id: 'B', type: 'fill', title: { zh: '填数字', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'l1tensones', n: { icon: '🔵', n: 18 }, title: { zh: '1 ten 8 ones = 18', en: '1 ten 8 ones = 18' } },
          questions: tensB.map(([n, k], i) => { const t = Math.floor(n / 10), o = n % 10;
            const text = k === 't' ? `{{t}} ten${t > 1 ? 's' : ''} ${o} one${o === 1 ? '' : 's'} = ${n}` : k === 'o' ? `${t} ten${t > 1 ? 's' : ''} {{o}} one${o === 1 ? '' : 's'} = ${n}` : `{{t}} ten {{o}} ones = ${n}`;
            const fields = k === 't' ? { t: { a: t } } : k === 'o' ? { o: { a: o } } : { t: { a: t }, o: { a: o } };
            return F(`l1-7-2-B${i + 1}`, '', text, fields, ['l1tensones', { icon: '🔵', n }], `${n} 是几个十、几个一？`, 'tens and ones', { label: `${t} ten ${o} ones = ${n}`, hint: { zh: `${n} = ${t * 10} + ${o}。`, en: `${n} = ${t * 10} + ${o}.` } }); }) },
      ],
    },
    {
      id: 'l1-7-3', available: true,
      title: { zh: '比较和排序', en: 'Compare and arrange numbers within 20' },
      intro: { zh: '十几的数都有一个 10，比大小只要比后面的几个一：一多的数大。', en: 'Teen numbers all have one ten. Compare the ones: more ones means greater.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '哪个小', en: 'Colour the smaller number. Fill in each blank with the correct answer' },
          example: { kind: 'l1cmp20', n: { a: 16, b: 14, which: 'smaller' }, title: { zh: '14 is smaller than 16', en: '14 is smaller than 16' } },
          questions: smallA.map(([a, b], i) => F(`l1-7-3-A${i + 1}`, dots2(a, b), `{{x}} is smaller than {{y}}.`, { x: { a: Math.min(a, b) }, y: { a: Math.max(a, b) } }, ['l1cmp20', { a, b, which: 'smaller' }], `${a} 和 ${b} 哪个小？`, 'Which is smaller?', { label: `${Math.min(a, b)} is smaller than ${Math.max(a, b)}`, hint: { zh: '比第二个框里的点，少的小。', en: 'Fewer dots in the second frame.' } })) },
        { id: 'B', type: 'fill', title: { zh: '哪个大', en: 'Colour the greater number. Fill in each blank with the correct answer' },
          example: { kind: 'l1cmp20', n: { a: 13, b: 19, which: 'greater' }, title: { zh: '19 is greater than 13', en: '19 is greater than 13' } },
          questions: greatB.map(([a, b], i) => F(`l1-7-3-B${i + 1}`, dots2(a, b), `{{x}} is greater than {{y}}.`, { x: { a: Math.max(a, b) }, y: { a: Math.min(a, b) } }, ['l1cmp20', { a, b, which: 'greater' }], `${a} 和 ${b} 哪个大？`, 'Which is greater?', { label: `${Math.max(a, b)} is greater than ${Math.min(a, b)}`, hint: { zh: '比第二个框里的点，多的大。', en: 'More dots in the second frame.' } })) },
        { id: 'C', type: 'pickone', title: { zh: '点最小的', en: 'Circle the smallest number' },
          example: { kind: 'l1order20', n: { nums: [15, 12, 18], desc: false }, title: { zh: '12 最小', en: '12 is the smallest' } },
          questions: smallC.map((ns, i) => ({ id: `l1-7-3-C${i + 1}`, type: 'pickone', pic: '', label: `最小：${ns.join(', ')}`, options: ns.map(n => `<span class="numshape circ">${n}</span>`), answer: ns.indexOf(Math.min(...ns)), prompt: { zh: '三个数里哪个最小？点它', en: 'Which is the smallest?' }, hint: { zh: '都是十几，比个位。', en: 'Compare the ones.' }, explain: ['l1order20', { nums: ns, desc: false }] })) },
        { id: 'D', type: 'pickone', title: { zh: '点最大的', en: 'Circle the greatest number' },
          example: { kind: 'l1order20', n: { nums: [11, 17, 14], desc: true }, title: { zh: '17 最大', en: '17 is the greatest' } },
          questions: greatD.map((ns, i) => ({ id: `l1-7-3-D${i + 1}`, type: 'pickone', pic: '', label: `最大：${ns.join(', ')}`, options: ns.map(n => `<span class="numshape circ">${n}</span>`), answer: ns.indexOf(Math.max(...ns)), prompt: { zh: '三个数里哪个最大？点它', en: 'Which is the greatest?' }, hint: { zh: '都是十几，比个位；20 是 2 个十，最大。', en: 'Compare the ones.' }, explain: ['l1order20', { nums: ns, desc: true }] })) },
        { id: 'E', type: 'arrange', title: { zh: '从大到小排', en: 'Arrange the numbers in order. Begin with the greatest' },
          example: { kind: 'l1order20', n: { nums: [13, 19, 16], desc: true }, title: { zh: '19, 16, 13', en: '19, 16, 13' } },
          questions: descE.map((ns, i) => ({ id: `l1-7-3-E${i + 1}`, type: 'arrange', nums: ns, order: 'desc' })) },
        { id: 'F', type: 'arrange', title: { zh: '从小到大排', en: 'Arrange the numbers in order. Begin with the smallest' },
          example: { kind: 'l1order20', n: { nums: [17, 12, 14], desc: false }, title: { zh: '12, 14, 17', en: '12, 14, 17' } },
          questions: ascF.map((ns, i) => ({ id: `l1-7-3-F${i + 1}`, type: 'arrange', nums: ns, order: 'asc' })) },
      ],
    },
    {
      id: 'l1-7-4', available: true,
      title: { zh: '数字规律', en: 'Make number patterns' },
      intro: { zh: '1 more 是后面一个数，1 less 是前面一个数。规律是每次加 1 或减 1。', en: '1 more is the next number; 1 less is the number before. Patterns go up or down by 1.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '多 1 少 1', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'l1moreless', n: { n: 10, delta: 1 }, title: { zh: '1 more than 10 is 11', en: '1 more than 10 is 11' } },
          questions: mlA.map(([n, d, form], i) => { const ans = n + d, ml = d > 0 ? 'more' : 'less';
            return F(`l1-7-4-A${i + 1}`, '', form === 'a' ? `1 ${ml} than ${n} is {{a}}.` : `{{a}} is 1 ${ml} than ${n}.`, { a: { a: ans } }, ['l1moreless', { n, delta: d }], d > 0 ? `比 ${n} 多 1 是几？` : `比 ${n} 少 1 是几？`, undefined, { hint: { zh: d > 0 ? `${n} 后面一个数。` : `${n} 前面一个数。`, en: d > 0 ? 'The next number.' : 'The number before.' } }); }) },
        { id: 'B', type: 'fill', title: { zh: '补全规律', en: 'Complete each number pattern' },
          example: { kind: 'pattern', n: { seq: [8, 9, 10, 11], blanks: [3] }, title: { zh: '8, 9, 10, 11：每次多 1', en: 'Each number increases by 1' } },
          questions: patB.map(([seq, blanks, kind], i) => { const keys = 'abcdef'.split(''); const fields = {}; const text = seq.map((n, k) => blanks.includes(k) ? (fields[keys[k]] = { a: n }, `{{${keys[k]}}}`) : nums(n)).join('  →  ');
            return F(`l1-7-4-B${i + 1}`, pic(`<div class="shaperow">${seq.map((n, k) => `<span class="shp2 numshp">${shp(kind, { s: 1.1, fill: 'y' })}<b>${blanks.includes(k) ? '?' : n}</b></span>`).join('')}</div>`), text, fields, ['pattern', { seq, blanks }], seq[1] > seq[0] ? '数字每次多 1，填空格' : '数字每次少 1，填空格', 'Complete the pattern', { label: seq.map((n, k) => blanks.includes(k) ? '__' : n).join(', '), hint: { zh: '看给出的数是往大还是往小，每次差 1。', en: 'Up or down by 1.' } }); }) },
      ],
    },
  ];
})();
