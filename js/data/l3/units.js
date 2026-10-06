/* Level 3 单元目录 */
(function () {
  const U = window.MATH_DATA.levels[3].units;
  [
    [1, '10 000 以内的数', 'Numbers within 10 000'],
    [2, '10 000 以内的加法', 'Adding Numbers within 10 000'],
    [3, '10 000 以内的减法', 'Subtracting Numbers within 10 000'],
    [4, '加减法应用题', 'Word Problems on Addition and Subtraction'],
    [5, '乘 6、7、8、9', 'Multiplying Numbers by 6, 7, 8 and 9'],
    [6, '乘法', 'Multiplying Numbers'],
    [7, '除法', 'Dividing Numbers'],
    [8, '四则两步应用题', 'Two-Step Word Problems on the Four Operations'],
    [9, '钱', 'Money'],
    [10, '长度、质量和体积', 'Length, Mass and Volume'],
    [11, '条形图', 'Bar Graphs'],
    [12, '分数', 'Fractions'],
    [13, '时间', 'Time'],
    [14, '角', 'Angles'],
    [15, '垂直与平行', 'Perpendicular and Parallel Lines'],
    [16, '面积与周长', 'Area and Perimeter'],
  ].forEach(([num, zh, en]) => U.push({ id: `l3u${num}`, num, title: { zh, en }, kps: [] }));
})();
