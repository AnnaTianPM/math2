/* 课程数据：单元 -> 知识点 -> 例题 / 练习 / 出题器
 * 每个知识点分成若干部分（A/B/C），每部分 = 一道例题 + 紧跟的练习题（和课本顺序一致）
 * 题型：
 *   blocks    看方块写数字        {h,t,o,answer}
 *   num2words 数字 -> 英文单词    {n}
 *   words2num 英文单词 -> 数字    {n}
 */
window.MATH_DATA = { levels: {} };
[1, 2, 3, 4, 5].forEach(n => { window.MATH_DATA.levels[n] = { num: n, units: [] }; });
window.MATH_DATA.units = window.MATH_DATA.levels[2].units;   // Level 2（本文件及 unit*.js 都写进这里）

(function () {
  const U = window.MATH_DATA.units;

  // ---------- 工具 ----------
  const q3 = (id, h, t, o) => ({ id, type: 'blocks', h, t, o, answer: h * 100 + t * 10 + o });
  const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  // 随机三位数（偶尔带 0，偶尔 1000）
  function randNum() {
    const r = Math.random();
    if (r < 0.05) return 1000;
    if (r < 0.2) return rnd(1, 9) * 100 + rnd(1, 9) * 10;        // 个位是 0
    if (r < 0.35) return rnd(1, 9) * 100 + rnd(1, 9);             // 十位是 0
    if (r < 0.4) return rnd(1, 9) * 100;                          // 整百
    return rnd(101, 999);
  }
  const split = n => n === 1000 ? { h: 10, t: 0, o: 0 } : { h: Math.floor(n / 100), t: Math.floor(n / 10) % 10, o: n % 10 };
  const NW = NumWords;
  // 英文选项（正确 + 3 个混淆项），顺序固定
  function wordOptions(n, seed) {
    const v = split(n), mk = (h, t, o) => h * 100 + t * 10 + o;
    let c = n === 1000 ? [100, 110, 900] : [mk(v.h, v.o, v.t), mk(v.t, v.h, v.o), mk(v.h, v.t, (v.o + 1) % 10), mk(v.h, (v.t + 1) % 10, v.o), mk((v.h % 9) + 1, v.t, v.o), v.t === 1 ? mk(v.h, v.o, 1) : mk(v.h, 1, v.o)];
    c = [...new Set(c)].filter(x => x !== n && x >= 100 && x <= 1000).slice(0, 3);
    const list = [n, ...c].map(NW.toWords);
    // 固定打乱
    const k = (seed * 7 + n) % list.length;
    return list.slice(k).concat(list.slice(0, k));
  }
  // 数字规律题：seq 完整序列，blanks 要填的下标
  function patternQ(id, seq, blanks) {
    const fields = {};
    const text = seq.map((n, i) => blanks.includes(i) ? (fields['b' + i] = { a: n }, `{{b${i}}}`) : String(n)).join(',  ');
    return { id, type: 'fill', text, fields, prompt: { zh: '找规律，填一填', en: 'Complete the number pattern' }, answerText: seq.join(', '), explain: ['pattern', { seq, blanks }],
      hint: { zh: '先看相邻两个数差多少，每次加几或减几。', en: 'Find the difference between neighbours.' } };
  }

  // ================= Unit 1 =================
  U.push({
    id: 'u1', num: 1,
    title: { zh: '1000 以内的数', en: 'Numbers within 1000' },
    kps: [
      {
        id: 'u1-1', available: true,
        title: { zh: '认识并读写 1000 以内的数', en: 'Recognise and write numbers within 1000 in numerals and words' },
        intro: {
          zh: '一个数由“百、十、个”组成。先数有几个百，再数有几个十，最后数有几个一。',
          en: 'A number is made of hundreds, tens and ones. Count the hundreds, then the tens, then the ones.'
        },
        sections: [
          {
            id: 'A', type: 'blocks',
            title: { zh: '数一数，写出正确的数', en: 'Count and write the correct numbers' },
            example: { kind: 'blocks', n: 425, title: { zh: '看方块，写数字', en: 'Count the blocks, write the number' } },
            questions: [
              q3('u1-1-A1', 3, 8, 7), q3('u1-1-A2', 5, 3, 0), q3('u1-1-A3', 8, 0, 7), q3('u1-1-A4', 6, 6, 9),
              q3('u1-1-A5', 10, 0, 0), q3('u1-1-A6', 2, 9, 8), q3('u1-1-A7', 4, 1, 1), q3('u1-1-A8', 9, 9, 0),
              q3('u1-1-A9', 1, 2, 3), q3('u1-1-A10', 7, 0, 6),
            ]
          },
          {
            id: 'B', type: 'num2words',
            title: { zh: '用英文单词写出下面的数', en: 'Write the following numbers in words' },
            example: { kind: 'num2words', n: 378, title: { zh: '数字 → 英文单词', en: 'Number → words' } },
            questions: [760, 378, 456, 202, 1000, 624, 871, 513, 935, 144].map((n, i) => ({ id: `u1-1-B${i + 1}`, type: 'num2words', n }))
          },
          {
            id: 'C', type: 'words2num',
            title: { zh: '把英文单词写成数字', en: 'Write the numbers on the lines provided' },
            example: { kind: 'words2num', n: 562, title: { zh: '英文单词 → 数字', en: 'Words → number' } },
            questions: [562, 779, 110, 358, 907, 241, 699, 412, 527, 836].map((n, i) => ({ id: `u1-1-C${i + 1}`, type: 'words2num', n }))
          },
        ],
        // 无限练习出题器
        generate(type, seq) {
          const n = randNum();
          const id = `gen-u1-1-${type}-${Date.now()}-${seq}`;
          if (type === 'blocks') { const s = split(n); return { id, type, ...s, answer: n, gen: true }; }
          return { id, type, n, gen: true };
        }
      },
      // ---------- 知识点 2：数位与位值 ----------
      {
        id: 'u1-2', available: true,
        title: { zh: '数位与位值', en: 'Identify the place value of numbers within 1000' },
        intro: { zh: '三位数从左到右是百位、十位、个位。百位上的数字表示几个百，十位表示几个十，个位表示几个一。', en: 'From left to right: hundreds place, tens place, ones place.' },
        sections: [
          {
            id: 'A', type: 'fill',
            title: { zh: '数一数，写出数字和英文', en: 'Count and write the correct numbers and words' },
            example: { kind: 'blocks', n: 321, title: { zh: '看方块，填百十个、数字和英文', en: 'Count the blocks, write the number and words' } },
            questions: [195, 506, 888, 642, 330, 707, 229, 900, 474, 563].map((n, i) => {
              const v = split(n);
              return { id: `u1-2-A${i + 1}`, type: 'fill', blocks: v, label: `看方块（${n}）`,
                prompt: { zh: '数一数，填一填', en: 'Count and fill in' },
                text: 'Hundreds 百 {{h}}   Tens 十 {{t}}   Ones 个 {{o}}\nNumber 数字: {{n}}\nWords 英文: {{w}}',
                fields: { h: { a: v.h }, t: { a: v.t }, o: { a: v.o }, n: { a: n }, w: { a: NW.toWords(n), kind: 'choice', options: wordOptions(n, i) } },
                answerText: `${v.h} hundreds ${v.t} tens ${v.o} ones = ${n}, ${NW.toWords(n)}`,
                explain: ['blocks', n] };
            })
          },
          {
            id: 'B', type: 'fill',
            title: { zh: '填一填：几个百、几个十、几个一', en: 'Fill in each blank with the correct answer' },
            example: { kind: 'expand', n: 825, title: { zh: '825 = 8 个百 2 个十 5 个一', en: '825 = 8 hundreds 2 tens 5 ones' } },
            questions: [101, 342, 264, 630, 705, 583, 856, 459, 977, 1000].map((n, i) => {
              const v = split(n);
              return { id: `u1-2-B${i + 1}`, type: 'fill', text: `${n} = {{h}} hundreds {{t}} tens {{o}} ones`,
                fields: { h: { a: v.h }, t: { a: v.t }, o: { a: v.o } }, answerText: `${v.h} hundreds ${v.t} tens ${v.o} ones`, explain: ['expand', n] };
            })
          },
          {
            id: 'C', type: 'fill',
            title: { zh: '填一填：拆成几百加几十加几', en: 'Fill in each blank with the correct answer' },
            example: { kind: 'expand', n: 579, title: { zh: '579 = 500 + 70 + 9', en: '579 = 500 + 70 + 9' } },
            questions: [
              [235, '235 = {{a}} + 30 + 5', { a: 200 }],
              [616, '616 = 600 + {{a}} + 6', { a: 10 }],
              [408, '408 = 400 + 0 + {{a}}', { a: 8 }],
              [163, '163 = {{a}} + {{b}} + 3', { a: 100, b: 60 }],
              [890, '890 = 800 + {{a}} + {{b}}', { a: 90, b: 0 }],
              [524, '524 = {{a}} + 20 + {{b}}', { a: 500, b: 4 }],
              [378, '378 = {{a}} + {{b}} + {{c}}', { a: 300, b: 70, c: 8 }],
              [951, '951 = {{a}} + {{b}} + {{c}}', { a: 900, b: 50, c: 1 }],
              [272, '272 = {{a}} + {{b}} + {{c}}', { a: 200, b: 70, c: 2 }],
              [749, '749 = {{a}} + {{b}} + {{c}}', { a: 700, b: 40, c: 9 }],
            ].map(([n, text, f], i) => {
              const v = split(n), fields = {};
              Object.keys(f).forEach(k => fields[k] = { a: f[k] });
              fields.h = { a: v.h }; fields.t = { a: v.t }; fields.o = { a: v.o };
              return { id: `u1-2-C${i + 1}`, type: 'fill', text: text + '\n{{h}} hundreds\n{{t}} tens\n{{o}} ones', fields,
                answerText: `${n} = ${v.h * 100} + ${v.t * 10} + ${v.o}; ${v.h} hundreds ${v.t} tens ${v.o} ones`, explain: ['expand', n] };
            })
          },
          {
            id: 'D', type: 'fill',
            title: { zh: '填一填：数字在哪一位', en: 'Fill in each blank with the correct answer' },
            example: { kind: 'digitplace', n: 123, title: { zh: '123 里的 1、2、3 各在哪一位', en: 'In 123, which place is each digit in?' } },
            questions: [
              [671, 7, 'tens'], [415, 4, 'hundreds'], [567, 7, 'ones'], [341, 3, 'hundreds'], [754, 5, 'tens'], [296, 6, 'ones'],
            ].map(([n, d, place], i) => ({ id: `u1-2-D${i + 1}`, type: 'fill', text: `In ${n}, the digit ${d} is in the {{p}} place.`,
              fields: { p: { a: place, kind: 'choice', options: ['hundreds', 'tens', 'ones'] } }, answerText: place, explain: ['digitplace', n],
              hint: { zh: '从左往右：百位、十位、个位。', en: 'Left to right: hundreds, tens, ones.' } }))
            .concat([
              [928, 'hundreds', 9], [873, 'ones', 3], [609, 'tens', 0], [132, 'hundreds', 1], [460, 'tens', 6], [738, 'ones', 8],
            ].map(([n, place, d], i) => ({ id: `u1-2-D${i + 7}`, type: 'fill', text: `In ${n}, the digit {{d}} is in the ${place} place.`,
              fields: { d: { a: d } }, answerText: String(d), explain: ['digitplace', n],
              hint: { zh: '从左往右：百位、十位、个位。', en: 'Left to right: hundreds, tens, ones.' } })))
          },
        ],
      },
      // ---------- 知识点 3：比较和排列 ----------
      {
        id: 'u1-3', available: true,
        title: { zh: '比较和排列 1000 以内的数', en: 'Compare and arrange numbers within 1000' },
        intro: { zh: '比较两个数，先比百位；百位一样再比十位；十位也一样再比个位。', en: 'Compare the hundreds first, then the tens, then the ones.' },
        sections: [
          {
            id: 'A', type: 'fill',
            title: { zh: '填 smaller（小）还是 greater（大）', en: "Fill in each blank with 'smaller' or 'greater'" },
            example: { kind: 'compare', n: { a: 400, b: 40 }, title: { zh: '400 和 40 谁大', en: '400 is greater than 40' } },
            questions: [[926, 962], [370, 730], [805, 580], [235, 352], [110, 101], [679, 697], [545, 454], [798, 789], [410, 411], [990, 999]]
              .map(([a, b], i) => ({ id: `u1-3-A${i + 1}`, type: 'fill', text: `${a} is {{c}} than ${b}.`,
                fields: { c: { a: a > b ? 'greater' : 'smaller', kind: 'choice', options: ['smaller', 'greater'] } },
                answerText: a > b ? 'greater' : 'smaller', explain: ['compare', { a, b }],
                hint: { zh: '先比百位，一样再比十位，再比个位。smaller 是小，greater 是大。', en: 'Compare hundreds, then tens, then ones.' } }))
          },
          {
            id: 'B', type: 'arrange',
            title: { zh: '从小到大排一排', en: 'Arrange these numbers in order. Begin with the smallest' },
            example: { kind: 'arrange', n: { nums: [397, 379, 973, 937], order: 'asc' }, title: { zh: '397、379、973、937 从小到大', en: 'Arrange from the smallest' } },
            questions: [[192, 129, 319, 219], [715, 571, 751, 511], [163, 116, 316, 313], [404, 434, 443, 344], [676, 767, 667, 766]]
              .map((nums, i) => ({ id: `u1-3-B${i + 1}`, type: 'arrange', nums, order: 'asc' }))
          },
          {
            id: 'C', type: 'arrange',
            title: { zh: '从大到小排一排', en: 'Arrange these numbers in order. Begin with the greatest' },
            example: { kind: 'arrange', n: { nums: [570, 705, 507, 750], order: 'desc' }, title: { zh: '570、705、507、750 从大到小', en: 'Arrange from the greatest' } },
            questions: [[314, 413, 134, 341], [289, 960, 187, 517, 608], [320, 190, 857, 220, 456], [927, 279, 727, 970, 290], [868, 668, 886, 888, 686]]
              .map((nums, i) => ({ id: `u1-3-C${i + 1}`, type: 'arrange', nums, order: 'desc' }))
          },
          {
            id: 'D', type: 'fill',
            title: { zh: '多几、少几', en: 'Fill in each blank with the correct answer' },
            example: { kind: 'moreless', n: { start: 200, delta: -2 }, title: { zh: '2 less than 200 是多少', en: '2 less than 200 is 198' } },
            questions: [
              [3, 'more', 330], [5, 'less', 550], [10, 'more', 691], [4, 'less', 402], [200, 'more', 800], [100, 'less', 211],
            ].map(([k, w, start], i) => { const ans = w === 'more' ? start + k : start - k; return { id: `u1-3-D${i + 1}`, type: 'fill', text: `${k} ${w} than ${start} is {{a}}.`, fields: { a: { a: ans } }, answerText: String(ans), explain: ['moreless', { start, delta: w === 'more' ? k : -k }], hint: { zh: `more 是多，less 是少。从 ${start} 开始${w === 'more' ? '往前' : '往回'}数 ${k}。`, en: `Count ${w === 'more' ? 'on' : 'back'} ${k} from ${start}.` } }; })
            .concat([
              [4, 'more', 896], [10, 'less', 915], [100, 'more', 369], [3, 'less', 740], [5, 'more', 178], [200, 'less', 553],
            ].map(([k, w, start], i) => { const ans = w === 'more' ? start + k : start - k; return { id: `u1-3-D${i + 7}`, type: 'fill', text: `{{a}} is ${k} ${w} than ${start}.`, fields: { a: { a: ans } }, answerText: String(ans), explain: ['moreless', { start, delta: w === 'more' ? k : -k }], hint: { zh: `more 是多，less 是少。从 ${start} 开始${w === 'more' ? '往前' : '往回'}数 ${k}。`, en: `Count ${w === 'more' ? 'on' : 'back'} ${k} from ${start}.` } }; }))
          },
        ],
      },
      // ---------- 知识点 4：数字规律 ----------
      {
        id: 'u1-4', available: true,
        title: { zh: '完成数字规律', en: 'Complete number patterns' },
        intro: { zh: '先看相邻两个数差多少，找到规律（每次加几或减几），再把空填上。', en: 'Find the difference between neighbours, then fill in the blanks.' },
        sections: [
          {
            id: 'A', type: 'fill',
            title: { zh: '完成数字规律（越来越大）', en: 'Complete the number patterns' },
            example: { kind: 'pattern', n: { seq: [280, 290, 300, 310, 320], blanks: [2, 3] }, title: { zh: '280, 290, __, __, 320', en: '280, 290, __, __, 320' } },
            questions: [
              [[762, 764, 766, 768, 770], [1, 4]], [[434, 438, 442, 446, 450], [2, 3]], [[450, 550, 650, 750, 850], [0, 1]], [[509, 512, 515, 518, 521], [2, 4]], [[860, 870, 880, 890, 900], [0, 3]],
            ].map(([seq, blanks], i) => patternQ(`u1-4-A${i + 1}`, seq, blanks))
          },
          {
            id: 'B', type: 'fill',
            title: { zh: '完成数字规律（越来越小）', en: 'Complete the number patterns' },
            example: { kind: 'pattern', n: { seq: [970, 870, 770, 670, 570], blanks: [3, 4] }, title: { zh: '970, 870, 770, __, __', en: '970, 870, 770, __, __' } },
            questions: [
              [[698, 694, 690, 686, 682], [1, 2]], [[990, 980, 970, 960, 950], [0, 4]], [[316, 313, 310, 307, 304], [0, 2]], [[940, 740, 540, 340, 140], [1, 2]], [[232, 227, 222, 217, 212], [0, 1]],
            ].map(([seq, blanks], i) => patternQ(`u1-4-B${i + 1}`, seq, blanks))
          },
        ],
      },
    ]
  });

  // 后续单元（占位，做好后逐个开放）
  const later = [
    [2, '1000 以内的加法', 'Adding Numbers within 1000'],
    [3, '1000 以内的减法', 'Subtracting Numbers within 1000'],
    [4, '加减法应用题', 'Word Problems on Addition and Subtraction'],
    [5, '乘法与除法', 'Multiplying and Dividing'],
    [6, '2、5、10 的乘除法', 'Multiplying and Dividing Numbers by 2, 5 and 10'],
    [7, '3、4 的乘除法', 'Multiplying and Dividing Numbers by 3 and 4'],
    [8, '乘除法应用题', 'Word Problems on Multiplication and Division'],
    [9, '长度', 'Length'],
    [10, '两步加减应用题', 'Two-Step Word Problems on Addition and Subtraction'],
    [11, '质量', 'Mass'],
    [12, '钱', 'Money'],
    [13, '平面图形与立体图形', 'Two-Dimensional and Three-Dimensional Figures'],
    [14, '分数', 'Fractions'],
    [15, '时间', 'Time'],
    [16, '象形图', 'Picture Graphs'],
    [17, '容量', 'Volume'],
  ];
  later.forEach(([num, zh, en]) => U.push({ id: `u${num}`, num, title: { zh, en }, kps: [] }));
})();
