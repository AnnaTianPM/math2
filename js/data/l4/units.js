/* Level 4 单元目录 */
(function () {
  const U = window.MATH_DATA.levels[4].units;
  [
    [1, '100 000 以内的数', 'Numbers within 100 000'],
    [2, '因数与倍数', 'Factors and Multiples'],
    [3, '整数的乘除', 'Multiplying and Dividing Whole Numbers'],
    [4, '整数应用题', 'Word Problems on Whole Numbers'],
    [5, '角', 'Angles'],
    [6, '正方形和长方形', 'Squares and Rectangles'],
    [7, '对称', 'Symmetry'],
    [8, '分数', 'Fractions'],
    [9, '分数的加减', 'Adding and Subtracting Fractions'],
    [10, '小数', 'Decimals'],
    [11, '小数的四则运算', 'Four Operations of Decimals'],
    [12, '小数应用题', 'Word Problems on Decimals'],
    [13, '面积与周长', 'Area and Perimeter'],
    [14, '表格和折线图', 'Tables and Line Graphs'],
    [15, '时间', 'Time'],
  ].forEach(([num, zh, en]) => U.push({ id: `l4u${num}`, num, title: { zh, en }, kps: [] }));
})();
