/* Level 1 单元目录 */
(function () {
  const U = window.MATH_DATA.levels[1].units;
  [
    [1, '10 以内的数', 'Numbers within 10'],
    [2, '有趣的数字组合', 'Fun with Number Bonds'],
    [3, '10 以内的加法', 'Adding Numbers within 10'],
    [4, '10 以内的减法', 'Subtracting Numbers within 10'],
    [5, '图形和规律', 'Shapes and Patterns'],
    [6, '序数和位置', 'Ordinal Numbers and Positions'],
    [7, '20 以内的数', 'Numbers within 20'],
    [8, '20 以内的加减法', 'Adding and Subtracting Numbers within 20'],
    [9, '长度', 'Length'],
    [10, '40 以内的数', 'Numbers within 40'],
    [11, '40 以内的加法', 'Adding Numbers within 40'],
    [12, '40 以内的减法', 'Subtracting Numbers within 40'],
    [13, '象形图', 'Picture Graphs'],
    [14, '乘法', 'Multiplying'],
    [15, '除法', 'Dividing'],
    [16, '时间', 'Time'],
  ].forEach(([num, zh, en]) => U.push({ id: `l1u${num}`, num, title: { zh, en }, kps: [] }));
})();
