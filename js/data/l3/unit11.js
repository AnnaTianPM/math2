/* Level 3 · Unit 11  条形图 */
(function () {
  const U = window.MATH_DATA.levels[3].units;
  const unit = num => U.find(u => u.num === num);
  const L = window.L3;
  const num = a => ({ a });
  const mon = v => ({ a: v.toFixed(2), kind: 'money' });
  const choice = (a, options) => ({ a, kind: 'choice', options });
  const mk = (title, cats, step, max, o) => Object.assign({ title, cats: cats.map(([label, v]) => ({ label, v })), step, max }, o || {});
  const labels = spec => spec.cats.map(c => c.label);
  const F = (id, spec, text, fields, q, zh, en, o) => Object.assign({ id, type: 'fill', pic: `<div class="center">${L.bargraph(spec)}</div>`, label: text.replace(/\{\{\w+\}\}/g, '___'), prompt: { zh, en: en || 'Study the bar graph and fill in the blank' }, text, fields, answerText: Object.values(fields).map(f => f.a).join(', '), explain: ['l3bar', { spec, q }], hint: { zh: '先看刻度每格是多少，再看条的顶端对着哪条线。', en: 'Check the scale, then read the top of the bar.' } }, o || {});
  const cat = (spec, Lb) => spec.cats.find(c => c.label === Lb).v;

  const fruit = mk('Fruit sold on Sunday', [['oranges', 16], ['apples', 28], ['bananas', 36], ['watermelons', 20]], 4, 40, { axis: { y: 'Number of fruit' } });
  const park = mk('Animals at a park', [['butterflies', 14], ['dragonflies', 2], ['birds', 20], ['bees', 8], ['ducks', 16]], 1, 20, { axis: { y: 'Number of animals' } });
  const save = mk("Hubert's savings in a week", [['Saturday', 35], ['Friday', 45], ['Thursday', 5], ['Wednesday', 20], ['Tuesday', 40], ['Monday', 15]], 5, 50, { horizontal: true, axis: { x: 'Amount of money in cents' }, cents: true });
  const inst = mk('Instruments played in a music school', [['drums', 10], ['trumpet', 4], ['guitar', 18], ['violin', 6], ['piano', 12]], 2, 20, { horizontal: true, axis: { x: 'Number of students' } });
  const charity = mk('Money raised for charity', [['Amy', 80], ['Beth', 60], ['Cathy', 110], ['Dora', 80], ['Emily', 130], ['Fiona', 70]], 20, 140, { axis: { y: 'Amount of money raised ($)' }, money: true });
  const flowers = mk('Paper flowers folded by students', [['Amelie', 38], ['Bryan', 28], ['Cayden', 18], ['Desiree', 24]], 4, 40, { horizontal: true, axis: { x: 'Number of flowers folded' } });

  const qs = [
    [fruit, 'A fruiterer sold some fruit on one Sunday.', '水果商星期日卖的水果', [
      ['{{a}} apples were sold.', { a: num(28) }, { kind: 'read', cat: 'apples' }, '卖了几个苹果？'],
      ['The fruiterer sold the most number of {{p}}.', { p: choice('bananas', labels(fruit)) }, { kind: 'most' }, '哪种卖得最多？'],
      ['The fruiterer sold the least number of {{p}}.', { p: choice('oranges', labels(fruit)) }, { kind: 'least' }, '哪种卖得最少？'],
      ['He sold {{a}} more bananas than oranges.', { a: num(20) }, { kind: 'diff', a: 'bananas', b: 'oranges' }, '香蕉比橙子多卖几个？'],
      ['He sold {{a}} more apples than watermelons.', { a: num(8) }, { kind: 'diff', a: 'apples', b: 'watermelons' }, '苹果比西瓜多卖几个？'],
      ['The total number of fruit sold on that Sunday was {{a}}.', { a: num(100) }, { kind: 'sum' }, '一共卖了几个水果？']]],
    [park, 'Angeline and her sister drew a bar graph of what they had seen at the park.', '公园里看到的动物', [
      ['They saw {{a}} birds.', { a: num(20) }, { kind: 'read', cat: 'birds' }, '看到几只鸟？'],
      ['There were {{a}} more ducks than butterflies.', { a: num(2) }, { kind: 'diff', a: 'ducks', b: 'butterflies' }, '鸭子比蝴蝶多几只？'],
      ['There were {{a}} fewer bees than birds.', { a: num(12) }, { kind: 'diff', a: 'bees', b: 'birds' }, '蜜蜂比鸟少几只？'],
      ['They saw the least number of {{p}}.', { p: choice('dragonflies', labels(park)) }, { kind: 'least' }, '哪种最少？'],
      ['They saw the most number of {{p}}.', { p: choice('birds', labels(park)) }, { kind: 'most' }, '哪种最多？'],
      ['There were {{a}} animals altogether at the park.', { a: num(60) }, { kind: 'sum' }, '一共几只动物？']]],
    [save, 'Hubert recorded the amount of money he had saved in a week.', 'Hubert 一周的储蓄', [
      ['He saved {{a}} cents on Friday.', { a: num(45) }, { kind: 'read', cat: 'Friday' }, '星期五存了几分？'],
      ['He saved {{a}} cents more on Tuesday than on Monday.', { a: num(25) }, { kind: 'diff', a: 'Tuesday', b: 'Monday' }, '星期二比星期一多存几分？'],
      ['He saved 7 times more on Saturday than on {{p}}.', { p: choice('Thursday', labels(save)) }, { kind: 'times', a: 'Saturday', k: 7 }, '星期六存的是哪天的 7 倍？'],
      ['He saved $ {{a}} altogether in a week.', { a: mon(1.6) }, { kind: 'sum' }, '一周一共存了多少？'],
      ['Hubert needed $10 to buy a present. He would need to save $ {{a}} more.', { a: mon(8.4) }, { kind: 'need', target: 10 }, '要买 $10 的礼物，还差多少？']]],
    [inst, 'The bar graph illustrates the instruments played by the students in a music school.', '音乐学校学生学的乐器', [
      ['{{a}} students play the violin.', { a: num(6) }, { kind: 'read', cat: 'violin' }, '几个学生学小提琴？'],
      ['{{a}} students play the drums.', { a: num(10) }, { kind: 'read', cat: 'drums' }, '几个学生学鼓？'],
      ['{{a}} more students play the guitar than the trumpet.', { a: num(14) }, { kind: 'diff', a: 'guitar', b: 'trumpet' }, '学吉他的比学小号的多几人？'],
      ['{{a}} fewer students play the piano than the guitar.', { a: num(6) }, { kind: 'diff', a: 'piano', b: 'guitar' }, '学钢琴的比学吉他的少几人？'],
      ['There are {{a}} students in the music school.', { a: num(50) }, { kind: 'sum' }, '一共几个学生？']]],
    [charity, 'A group of friends sold flowers to raise money for charity.', '为慈善筹的钱', [
      ['Cathy raised $ {{a}}.', { a: num(110) }, { kind: 'read', cat: 'Cathy' }, 'Cathy 筹了多少？'],
      ['Fiona raised $ {{a}}.', { a: num(70) }, { kind: 'read', cat: 'Fiona' }, 'Fiona 筹了多少？'],
      ['{{p}} and {{q}} raised the same amount of money.', { p: choice('Amy', labels(charity)), q: choice('Dora', labels(charity)) }, { kind: 'same' }, '哪两人筹的一样多？', { accept: [{ p: 'Amy', q: 'Dora' }, { p: 'Dora', q: 'Amy' }] }],
      ['The difference between the highest amount and the lowest amount is $ {{a}}.', { a: num(70) }, { kind: 'diff', a: 'Emily', b: 'Beth' }, '最多和最少相差多少？'],
      ['Emily raised as much as {{p}} and {{q}} combined.', { p: choice('Beth', labels(charity)), q: choice('Fiona', labels(charity)) }, { kind: 'pair', a: 'Emily' }, 'Emily 筹的等于哪两人之和？', { accept: [{ p: 'Beth', q: 'Fiona' }, { p: 'Fiona', q: 'Beth' }] }],
      ['The total amount of money raised was $ {{a}}.', { a: num(530) }, { kind: 'sum' }, '一共筹了多少？']]],
    [flowers, 'Some students help to fold paper flowers to decorate their classroom.', '学生折的纸花', [
      ['Amelie folds {{a}} paper flowers.', { a: num(38) }, { kind: 'read', cat: 'Amelie' }, 'Amelie 折了几朵？'],
      ['Bryan folds {{a}} paper flowers.', { a: num(28) }, { kind: 'read', cat: 'Bryan' }, 'Bryan 折了几朵？'],
      ['Cayden folds {{a}} fewer paper flowers than Desiree.', { a: num(6) }, { kind: 'diff', a: 'Cayden', b: 'Desiree' }, 'Cayden 比 Desiree 少几朵？'],
      ['{{p}} folds the most number of paper flowers.', { p: choice('Amelie', labels(flowers)) }, { kind: 'most' }, '谁折得最多？'],
      ['{{p}} folds the least number of paper flowers.', { p: choice('Cayden', labels(flowers)) }, { kind: 'least' }, '谁折得最少？'],
      ['The students fold {{a}} paper flowers altogether.', { a: num(108) }, { kind: 'sum' }, '一共折了几朵？']]],
  ];

  unit(11).kps = [{
    id: 'l3-11-1', available: true,
    title: { zh: '读条形图', en: 'Read and interpret data from bar graphs' },
    intro: { zh: '条形图用条的高度（或长度）表示数量。先看刻度每格是多少，再看每根条顶端对着哪条线。多几、少几用减法，一共用加法。', en: 'Bars show the numbers. Check the scale first, then read the top of each bar.' },
    sections: qs.map(([spec, en, zh, items], si) => ({ id: 'ABCDEF'[si], type: 'fill', title: { zh, en },
      example: { kind: 'l3bar', n: { spec, q: items[0][2] }, title: { zh: items[0][3], en: items[0][0].replace('{{a}}', '?').replace('{{p}}', '?') } },
      questions: items.map(([text, fields, q, qzh, extra], i) => F(`l3-11-1-${'ABCDEF'[si]}${i + 1}`, spec, text, fields, q, qzh, undefined, extra)) })),
  }];
})();
