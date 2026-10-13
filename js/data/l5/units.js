/* Level 5 单元目录 */
(function () {
  const U = window.MATH_DATA.levels[5].units;
  [
    [1, '1000 万以内的数', 'Whole Numbers'],
    [2, '整数的运算', 'Operations of Whole Numbers'],
    [3, '分数和带分数', 'Fractions and Mixed Numbers'],
    [4, '整数、分数与带分数的乘法', 'Multiplying Whole Numbers, Fractions and Mixed Numbers'],
    [5, '分数应用题', 'Word Problems on Fractions'],
    [6, '三角形的面积', 'Area of Triangles'],
    [7, '比', 'Ratio'],
    [8, '正方体和长方体的体积', 'Volume of Cubes and Cuboids'],
    [9, '小数', 'Decimals'],
    [10, '百分数', 'Percentage'],
    [11, '平均数', 'Average'],
    [12, '速率', 'Rate'],
    [13, '角', 'Angles'],
    [14, '三角形', 'Triangles'],
    [15, '四边形', 'Quadrilaterals'],
  ].forEach(([num, zh, en]) => U.push({ id: `l5u${num}`, num, title: { zh, en }, kps: [] }));
})();
