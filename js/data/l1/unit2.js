/* Level 1 · Unit 2  有趣的数字组合 */
(function () {
  const U = window.MATH_DATA.levels[1].units;
  const unit = num => U.find(u => u.num === num);
  const L = window.L1;
  const pic = html => `<div class="center">${html}</div>`;
  const B = (id, w, a, b, blank, pic, explain, o) => Object.assign({ id, type: 'bond', w, a, b, blank, pic, explain, label: `${blank.includes('w') ? '?' : w} ← ${blank.includes('a') ? '?' : a} , ${blank.includes('b') ? '?' : b}` }, o || {});

  // A：涂色 / 不涂色（用实心和空心图形）
  const shadedA = [['▲', 3, '△', 3], ['■', 3, '□', 5], ['■', 0, '□', 5], ['◆', 6, '◇', 4], ['★', 3, '☆', 6]];
  // B：两种东西
  const picB = [['🍰', 5, '🍽️', 2], ['🐦', 3, '🐤', 7], ['🍎', 4, '🍏', 2], ['👕', 8, '👔', 0], ['☕', 2, '🥂', 7], ['🏸', 4, '🪶', 1], ['🍒', 6, '🍦', 2], ['🕯️', 7, '🔥', 3], ['🐵', 2, '🍌', 5], ['🚗', 5, '🚲', 4]];
  const picBnote = ['5 块蛋糕和 2 个盘子', '3 只飞的鸟和 7 只树上的鸟', '碗里 4 个苹果和外面 2 个', '8 件衣服和 0 件（另一种没有）', '2 个杯子和 7 个高脚杯', '4 个球拍和 1 个羽毛球', '6 颗樱桃和 2 个冰淇淋', '7 根蜡烛和 3 根火柴', '2 只猴子和 5 根香蕉', '5 辆车和 4 辆自行车'];
  // C：连线凑数
  const matchC = [[6, '🍴', [2, 0, 3, 1], '🥄', [3, 6, 4, 5]], [7, '🦋', [3, 4, 1, 0], '🌱', [7, 4, 6, 3]], [8, '👦', [5, 2, 8, 4], '⚽', [4, 3, 0, 6]], [9, '🧁', [3, 4, 2, 1], '🎁', [5, 8, 7, 6]]];
  // KP2 A：求整体；B：求部分
  const wholeA = [[3, 7], [8, 1], [2, 4], [0, 10], [4, 4]];
  const partB = [[5, 5], [2, 0], [7, 2], [6, 3], [9, 7]];

  const shadeGroups = ([i1, n1, i2, n2]) => [{ icon: `<span class="shp-glyph">${i1}</span>`, n: n1 }, { icon: `<span class="shp-glyph hollow">${i2}</span>`, n: n2 }];
  const twoGroups = ([i1, n1, i2, n2]) => [{ icon: i1, n: n1 }, { icon: i2, n: n2 }];

  unit(2).kps = [
    {
      id: 'l1-2-1', available: true,
      title: { zh: '做数字组合', en: 'Make number bonds' },
      intro: { zh: '一个数可以分成两部分。大圈是整体（一共几个），两个小圈是部分。比如 4 可以分成 1 和 3：1 and 3 make 4。', en: 'A number bond shows a whole and its two parts. 1 and 3 make 4.' },
      sections: [
        { id: 'A', type: 'bond', title: { zh: '涂色的和没涂色的', en: 'Look at each picture carefully. Fill in each part with the correct answer' },
          example: { kind: 'l1bond', n: { groups: [{ icon: '<span class="shp-glyph hollow">○</span>', n: 1 }, { icon: '<span class="shp-glyph">●</span>', n: 3 }] }, title: { zh: '1 个白的、3 个灰的：4 分成 1 和 3', en: '1 and 3 make 4' } },
          questions: shadedA.map((row, i) => { const gs = shadeGroups(row), w = row[1] + row[3];
            return B(`l1-2-1-A${i + 1}`, w, row[1], row[3], ['a', 'b'], pic(L.groups(gs)), ['l1bond', { groups: gs }], { prompt: { zh: `一共 ${w} 个图形，涂色的几个？没涂色的几个？填两个小圈`, en: 'How many are shaded? How many are not? Fill in the parts.' }, hint: { zh: '先数涂了色（深色）的，再数没涂色（白色）的。', en: 'Count the shaded ones, then the unshaded ones.' } }); }) },
        { id: 'B', type: 'bond', title: { zh: '看图填数字组合', en: 'Study each picture carefully. Fill in the missing numbers' },
          example: { kind: 'l1bond', n: { groups: [{ icon: '👶', n: 2 }, { icon: '🧒', n: 3 }] }, title: { zh: '2 个小宝宝和 3 个小朋友：5 分成 2 和 3', en: '2 and 3 make 5' } },
          questions: picB.map((row, i) => { const gs = twoGroups(row), w = row[1] + row[3];
            return B(`l1-2-1-B${i + 1}`, w, row[1], row[3], ['w', 'a', 'b'], pic(L.groups(gs)), ['l1bond', { groups: gs }], { label: picBnote[i], prompt: { zh: '图里有两种东西。两个小圈填每种几个，大圈填一共几个', en: 'Fill in the parts and the whole.' }, hint: { zh: `${picBnote[i]}。先数每一种，再全部数一遍。`, en: 'Count each kind, then count all.' } }); }) },
        { id: 'C', type: 'match', title: { zh: '连线凑成 6、7、8、9', en: 'Match the numbers to make 6, 7, 8 and 9' },
          example: { kind: 'l1bondmatch', n: { total: 5, a: 2 }, title: { zh: '凑成 5：2 和 3', en: '2 and 3 make 5' } },
          questions: matchC.map(([total, li, ln, ri, rn], i) => ({ id: `l1-2-1-C${i + 1}`, type: 'match', label: `连线凑成 ${total}`, left: ln.map(n => ({ id: 'L' + n, html: `${li} ${n}`, text: String(n) })), right: rn.map(n => ({ id: 'R' + n, html: `${ri} ${n}`, text: String(n) })), pairs: Object.fromEntries(ln.map(n => ['L' + n, 'R' + (total - n)])), prompt: { zh: `左右两个数加起来要等于 ${total}，把它们连起来`, en: `Match the numbers to make ${total}.` }, hint: { zh: `想一想：${total} 个点，圈掉左边的数，剩下几个？`, en: `Think: ${total} dots, take away the left number.` }, explain: ['l1bondmatch', { total, a: ln[0] }] })) },
      ],
    },
    {
      id: 'l1-2-2', available: true,
      title: { zh: '补全数字组合', en: 'Complete number bonds by filling in the missing parts' },
      intro: { zh: '知道两个部分，合起来就是整体。知道整体和一个部分，把整体画成点点、圈掉一部分，剩下的就是另一部分。', en: 'Parts together make the whole. Whole take away one part gives the other part.' },
      sections: [
        { id: 'A', type: 'bond', title: { zh: '求整体', en: 'Fill in the missing number for each number bond' },
          example: { kind: 'l1bondwhole', n: { a: 3, b: 2 }, title: { zh: '3 and 2 make 5', en: '3 and 2 make 5' } },
          questions: wholeA.map(([a, b], i) => B(`l1-2-2-A${i + 1}`, a + b, a, b, ['w'], '', ['l1bondwhole', { a, b }], { text: `${a} and ${b} make {{w}}.`.replace('{{w}}', '___'), prompt: { zh: `${a} 和 ${b} 合起来是几？填大圈`, en: `${a} and ${b} make ___.` }, hint: { zh: `从 ${a} 往后数 ${b} 个。`, en: `Count on ${b} from ${a}.` } })) },
        { id: 'B', type: 'bond', title: { zh: '求另一部分', en: 'Fill in the missing number for each number bond' },
          example: { kind: 'l1bondpart', n: { w: 8, a: 6 }, title: { zh: '6 and 2 make 8', en: '6 and 2 make 8' } },
          questions: partB.map(([w, a], i) => B(`l1-2-2-B${i + 1}`, w, a, w - a, ['b'], '', ['l1bondpart', { w, a }], { text: `${a} and ___ make ${w}.`, prompt: { zh: `整体是 ${w}，一部分是 ${a}，另一部分是几？`, en: `${a} and ___ make ${w}.` }, hint: { zh: `画 ${w} 个点，圈掉 ${a} 个，数剩下的。`, en: `Draw ${w} dots, cover ${a}.` } })) },
      ],
    },
  ];
})();
