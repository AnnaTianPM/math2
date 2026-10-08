/* Level 4 · Unit 12  小数应用题 */
(function () {
  const U = window.MATH_DATA.levels[4].units;
  const unit = num => U.find(u => u.num === num);
  const ubar = window.L3.ubar;
  const dec = a => ({ a: String(a), kind: 'dec' });
  const wp = (en, zh) => `<div class="wp-text"><div class="wp-en">${en}</div><div class="wp-zh">${zh}</div></div>`;
  const W = (id, en, zh, ans, steps, sentence, o = {}) => ({ id, type: 'fill', pic: wp(en, zh), label: en.slice(0, 70), prompt: { zh: o.ask || '算一算，填答案（小数）', en: 'Solve the word problem' }, text: o.text || '{{a}}', fields: o.fields || { a: dec(ans) }, answerText: o.fields ? Object.values(o.fields).map(f => f.a).join(', ') : String(ans), hint: o.hint, explain: ['l4steps', { en, zh, ans, steps, sentence, bar: o.bar, read: o.read }] });

  const Q = [
    W('l4-12-1-A1', 'Mrs Roberts bought 2.4 kg of meat. Mrs Davidson bought 1.35 kg of meat more than her. How many kilograms of meat did they buy altogether?', 'Roberts 太太买了 2.4 kg 肉。Davidson 太太比她多买 1.35 kg。两人一共买了多少千克？', '6.15',
      [{ zh: 'Davidson：2.4 + 1.35 = <b>3.75</b> kg（小数点对齐，2.40 + 1.35）。', expr: '2.4 + 1.35 = 3.75 kg' }, { zh: '一共：2.4 + 3.75 = <b>6.15</b> kg。', expr: '2.4 + 3.75 = 6.15 kg' }],
      { zh: '两人一共买了 ___ kg 肉。', en: 'They bought ___ kg of meat altogether.' },
      { bar: ubar([{ label: 'Roberts', n: 2, top: '2.4 kg' }, { label: 'Davidson', n: 3, bottom: '2.4 + 1.35' }], { right: '?' }), read: { zh: '"more than" 先算 Davidson 买了多少，再把两人的加起来。', en: 'Find Davidson first, then add.' }, hint: { zh: '2.4 + 1.35 是 Davidson 的，再加 2.4。', en: 'Davidson = 2.4 + 1.35.' } }),
    W('l4-12-1-A2', 'Joan had $108.25. She spent $43.05 to buy a present for her mother and $12.20 on lunch. How much money had she left?', 'Joan 有 108.25 元。她花 43.05 元给妈妈买礼物，12.20 元吃午饭。她还剩多少钱？', '53',
      [{ zh: '花掉的：$43.05 + $12.20 = <b>$55.25</b>。', expr: '$43.05 + $12.20 = $55.25' }, { zh: '剩下：$108.25 − $55.25 = <b>$53</b>。', expr: '$108.25 − $55.25 = $53' }],
      { zh: '她还剩 ___ 元。', en: 'She had $___ left.' },
      { read: { zh: '先把两笔花费加起来，再从总数里减。', en: 'Add the two amounts spent, then subtract.' }, hint: { zh: '108.25 − 43.05 − 12.20。', en: '108.25 − 43.05 − 12.20.' } }),
    W('l4-12-1-A3', 'A bag of rice and two identical packs of sugar have a mass of 6 kg. The bag of rice and the pack of sugar have a mass of 4.5 kg. Find the mass of five such packs of sugar.', '一袋米和两包一样的糖共重 6 kg。一袋米和一包糖共重 4.5 kg。五包这样的糖重多少？', '7.5',
      [{ zh: '比一比：都有一袋米，差的就是 <b>1 包糖</b>：6 − 4.5 = <b>1.5</b> kg。', expr: '6 − 4.5 = 1.5 kg' }, { zh: '5 包糖：1.5 × 5 = <b>7.5</b> kg。', expr: '1.5 × 5 = 7.5 kg' }],
      { zh: '五包糖重 ___ kg。', en: 'Five such packs of sugar have a mass of ___ kg.' },
      { bar: ubar([{ label: 'rice+2 sugar', n: 3, top: '6 kg' }, { label: 'rice+1 sugar', n: 2, bottom: '4.5 kg' }]), read: { zh: '两组都有一袋米，多出来的那包糖就是 6 − 4.5。', en: 'The difference is one pack of sugar.' }, hint: { zh: '一包糖 = 6 − 4.5。', en: 'One pack = 6 − 4.5.' } }),
    W('l4-12-1-A4', 'A train travelled 180.63 km on Monday. It travelled 2.1 km more on Tuesday than on Monday. It travelled 1.2 km less on Wednesday than on Tuesday. What was the distance travelled by the train on Wednesday?', '火车星期一行驶 180.63 km。星期二比星期一多 2.1 km。星期三比星期二少 1.2 km。星期三行驶了多少千米？', '181.53',
      [{ zh: '星期二：180.63 + 2.1 = <b>182.73</b> km。', expr: '180.63 + 2.1 = 182.73 km' }, { zh: '星期三：182.73 − 1.2 = <b>181.53</b> km。', expr: '182.73 − 1.2 = 181.53 km' }],
      { zh: '星期三行驶了 ___ km。', en: 'The train travelled ___ km on Wednesday.' },
      { read: { zh: '一天一天算：先算星期二，再算星期三。', en: 'Tuesday first, then Wednesday.' }, hint: { zh: '2.1 写成 2.10 对齐。', en: 'Write 2.1 as 2.10.' } }),
    W('l4-12-1-A5', 'Cindy has a mass of 24.3 kg. The mass of her father is 3 times as heavy as Cindy. What is the total mass of Cindy and her father?', 'Cindy 重 24.3 kg。爸爸的体重是 Cindy 的 3 倍。两人一共重多少？', '97.2',
      [{ zh: '爸爸：24.3 × 3 = <b>72.9</b> kg。', expr: '24.3 × 3 = 72.9 kg' }, { zh: '一共：24.3 + 72.9 = <b>97.2</b> kg（也可以 24.3 × 4）。', expr: '24.3 + 72.9 = 97.2 kg' }],
      { zh: '两人一共重 ___ kg。', en: 'The total mass of Cindy and her father is ___ kg.' },
      { bar: ubar([{ label: 'Cindy', n: 1, top: '24.3 kg' }, { label: 'father', n: 3 }], { right: '?' }), read: { zh: 'Cindy 1 份，爸爸 3 份，一共 4 份。', en: 'Cindy 1 unit, father 3 units: 4 units.' }, hint: { zh: '24.3 × 4。', en: '24.3 × 4.' } }),
    W('l4-12-1-A6', 'A ribbon is 21.75 m long. Johnson cuts two pieces of ribbon measuring a total of 2.4 m from it. The remaining piece of ribbon is then cut into three equal pieces. What is the length of each of the three pieces of ribbon?', '一条丝带长 21.75 m。Johnson 剪掉两段共 2.4 m。剩下的平均剪成 3 段。每段长多少？', '6.45',
      [{ zh: '剩下：21.75 − 2.4 = <b>19.35</b> m。', expr: '21.75 − 2.4 = 19.35 m' }, { zh: '平均 3 段：19.35 ÷ 3 = <b>6.45</b> m。', expr: '19.35 ÷ 3 = 6.45 m' }],
      { zh: '每段长 ___ m。', en: 'Each of the three pieces is ___ m long.' },
      { bar: ubar([{ n: 4, top: '21.75 m', bottom: '?', bottomN: 1 }]), read: { zh: '先减掉剪走的 2.4 m，剩下的除以 3。', en: 'Subtract 2.4, then divide by 3.' }, hint: { zh: '(21.75 − 2.4) ÷ 3。', en: '(21.75 − 2.4) ÷ 3.' } }),
    W('l4-12-1-A7', 'A box of chocolates cost $11.45. John bought three such boxes of chocolates. If he gave the cashier a fifty-dollar note, how much change would he receive?', '一盒巧克力 11.45 元。John 买了 3 盒，付了一张 50 元。他应找回多少钱？', '15.65',
      [{ zh: '3 盒：$11.45 × 3 = <b>$34.35</b>。', expr: '$11.45 × 3 = $34.35' }, { zh: '找零：$50 − $34.35 = <b>$15.65</b>。', expr: '$50 − $34.35 = $15.65' }],
      { zh: '他应找回 ___ 元。', en: 'He would receive $___ change.' },
      { read: { zh: '先算 3 盒多少钱，再用 50 减。', en: 'Cost of 3 boxes, then 50 minus that.' }, hint: { zh: '50 写成 50.00 再减。', en: 'Write 50 as 50.00.' } }),
    W('l4-12-1-A8', 'Mr Jackson needed 12.76 l of paint to paint a room. (a) How much paint would he need if he wanted to paint three similar rooms? (b) If a litre of paint cost $5, how much money did Mr Jackson pay for the paint for three rooms?', 'Jackson 先生刷一个房间需要 12.76 L 油漆。(a) 刷三个一样的房间需要多少油漆？(b) 每升油漆 5 元，刷三个房间的油漆要多少钱？', '191.4',
      [{ zh: '(a) 3 个房间：12.76 × 3 = <b>38.28</b> L。', expr: '12.76 × 3 = 38.28 l' }, { zh: '(b) 每升 $5：38.28 × 5 = <b>$191.40</b>。', expr: '38.28 × $5 = $191.40' }],
      { zh: '(a) 需要 38.28 L；(b) 要付 ___ 元。', en: '(a) 38.28 l; (b) He paid $___.' },
      { text: '(a) {{a}} l\n(b) ${{b}}', fields: { a: dec('38.28'), b: dec('191.4') }, ask: '(a) 先算三个房间要多少升，(b) 再算钱', read: { zh: '(b) 用 (a) 的升数乘每升的价钱。', en: 'Use (a) × $5.' }, hint: { zh: '(a) 12.76 × 3；(b) 结果 × 5。', en: '12.76 × 3, then × 5.' } }),
    W('l4-12-1-A9', 'Mr Woods had a sack of sugar. He sold 38.25 kg of it and packed the rest equally into six bags. If each bag of sugar had a mass of 0.75 kg, how much sugar did Mr Woods have at first?', 'Woods 先生有一袋糖。他卖了 38.25 kg，剩下的平均装成 6 袋，每袋 0.75 kg。他原来有多少糖？', '42.75',
      [{ zh: '6 袋：0.75 × 6 = <b>4.5</b> kg。', expr: '0.75 × 6 = 4.5 kg' }, { zh: '原来 = 卖掉的 + 装袋的：38.25 + 4.5 = <b>42.75</b> kg。', expr: '38.25 + 4.5 = 42.75 kg' }],
      { zh: 'Woods 先生原来有 ___ kg 糖。', en: 'Mr Woods had ___ kg of sugar at first.' },
      { bar: ubar([{ n: 7, first: '0.75', dashed: true, bottom: '?' }]), read: { zh: '原来的 = 卖掉的 38.25 + 6 袋的总重。', en: 'At first = sold + 6 bags.' }, hint: { zh: '先算 6 袋重多少。', en: '0.75 × 6 first.' } }),
    W('l4-12-1-A10', 'Clement bought 2 bottles of orange juice and a bottle of apple juice for $6.55. The bottle of apple juice cost $0.35 less than a bottle of orange juice. What was the cost of a bottle of orange juice?', 'Clement 买了 2 瓶橙汁和 1 瓶苹果汁，共 6.55 元。苹果汁比一瓶橙汁便宜 0.35 元。一瓶橙汁多少钱？', '2.3',
      [{ zh: '苹果汁比橙汁少 $0.35。如果给苹果汁补上 $0.35，就变成 <b>3 瓶橙汁</b>：$6.55 + $0.35 = <b>$6.90</b>。', expr: '$6.55 + $0.35 = $6.90' }, { zh: '3 瓶橙汁 $6.90，1 瓶：$6.90 ÷ 3 = <b>$2.30</b>。', expr: '$6.90 ÷ 3 = $2.30' }],
      { zh: '一瓶橙汁 ___ 元。', en: 'A bottle of orange juice cost $___.' },
      { bar: ubar([{ label: 'orange', n: 1 }, { label: 'orange', n: 1 }, { label: 'apple', n: 1, bottom: '−$0.35' }], { right: '$6.55' }), read: { zh: '把苹果汁"补齐"成橙汁的价钱，总价就是 3 瓶橙汁。', en: 'Add $0.35 to make 3 orange juices.' }, hint: { zh: '(6.55 + 0.35) ÷ 3。', en: '(6.55 + 0.35) ÷ 3.' } }),
  ];

  unit(12).kps = [
    { id: 'l4-12-1', available: true, title: { zh: '小数应用题', en: 'Solve word problems related to decimals' },
      intro: { zh: '和整数应用题一样：读题、画线段图、一步一步算。小数加减要对齐小数点，乘除和整数一样最后点上小数点。钱的答案保留两位小数。', en: 'Read, draw a model, work step by step. Line up decimal points when adding or subtracting.' },
      sections: [{ id: 'A', type: 'fill', title: { zh: '应用题', en: 'Do these word problems. Show your working clearly' }, example: { kind: 'l4steps', n: { en: 'A pen costs $1.85 and a ruler costs $0.60 less than the pen. How much do the pen and the ruler cost altogether?', zh: '一支笔 1.85 元，一把尺比笔便宜 0.60 元。笔和尺一共多少钱？', ans: '3.1', bar: ubar([{ label: 'pen', n: 2, top: '$1.85' }, { label: 'ruler', n: 1, bottom: '−$0.60' }], { right: '?' }), read: { zh: '先算尺的价钱，再加起来。', en: 'Find the ruler first.' }, steps: [{ zh: '尺：$1.85 − $0.60 = <b>$1.25</b>。', expr: '$1.85 − $0.60 = $1.25' }, { zh: '一共：$1.85 + $1.25 = <b>$3.10</b>。', expr: '$1.85 + $1.25 = $3.10' }], sentence: { zh: '一共 ___ 元。', en: 'They cost $___ altogether.' } }, title: { zh: '先算一个，再加起来', en: 'Two steps' } }, questions: Q }] },
  ];
})();
