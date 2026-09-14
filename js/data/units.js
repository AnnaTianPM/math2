/* 课程数据：单元 -> 知识点 -> 例题 / 练习 / 出题器
 * 每个知识点分成若干部分（A/B/C），每部分 = 一道例题 + 紧跟的练习题（和课本顺序一致）
 * 题型：
 *   blocks    看方块写数字        {h,t,o,answer}
 *   num2words 数字 -> 英文单词    {n}
 *   words2num 英文单词 -> 数字    {n}
 */
window.MATH_DATA = { units: [] };

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
      { id: 'u1-2', available: false, title: { zh: '数位与位值', en: 'Identify the place value of numbers within 1000' } },
      { id: 'u1-3', available: false, title: { zh: '比较和排列 1000 以内的数', en: 'Compare and arrange numbers within 1000' } },
      { id: 'u1-4', available: false, title: { zh: '完成数字规律', en: 'Complete number patterns' } },
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
