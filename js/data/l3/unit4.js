/* Level 3 · Unit 4  加减法应用题（两步） */
(function () {
  const U = window.MATH_DATA.levels[3].units;
  const unit = num => U.find(u => u.num === num);
  const S = (en, zh) => ({ en, zh });
  const A = (parts) => ({ kind: 'add', parts: parts.map(([label, v]) => ({ label, v })) });
  const Sb = (whole, known, unk) => ({ kind: 'sub', whole: { label: whole[0], v: whole[1] }, known: { label: known[0], v: known[1] }, unknown: { label: unk } });
  const Cm = (base, other, diff, otherIs) => ({ kind: 'cmp', base: { label: base[0], v: base[1] }, other: { label: other }, diff, otherIs });
  const W2 = (id, en, zh, s1, s2) => ({ id, type: 'word2', en, zh, steps: [s1, s2], label: en.slice(0, 60) });

  const qs = [
    W2('l3-4-1-A1', 'Sandy has 236 stickers. Linda has 127 fewer stickers than Sandy.', 'Sandy 有 236 张贴纸。Linda 比 Sandy 少 127 张。',
      { ask: S('How many stickers does Linda have?', 'Linda 有多少张贴纸？'), model: Cm(['Sandy', 236], 'Linda', 127, 'less'), sentence: S('Linda has ___ stickers.', 'Linda 有 ___ 张贴纸。') },
      { ask: S('How many stickers do they have altogether?', '她们一共有多少张？'), model: A([['Sandy', 236], ['Linda', 'ANS1']]), sentence: S('They have ___ stickers altogether.', '她们一共有 ___ 张。') }),
    W2('l3-4-1-A2', 'Ken travels 3280 m on his motorcycle. Steve travels 568 m further than Ken in his car.', 'Ken 骑摩托车走了 3280 m。Steve 开车比 Ken 多走 568 m。',
      { ask: S('How far does Steve travel?', 'Steve 走了多远？'), model: Cm(['Ken', 3280], 'Steve', 568, 'more'), sentence: S('Steve travels ___ m.', 'Steve 走了 ___ m。') },
      { ask: S('How far do they travel altogether?', '他们一共走了多远？'), model: A([['Ken', 3280], ['Steve', 'ANS1']]), sentence: S('They travel ___ m altogether.', '他们一共走了 ___ m。') }),
    W2('l3-4-1-A3', 'Tina has 2345 stamps in her collection. Candice has 3542 stamps in her collection.', 'Tina 收集了 2345 张邮票。Candice 收集了 3542 张。',
      { ask: S('How many more stamps does Candice have than Tina?', 'Candice 比 Tina 多几张？'), model: Sb(['Candice', 3542], ['Tina', 2345], 'more'), sentence: S('Candice has ___ more stamps than Tina.', 'Candice 比 Tina 多 ___ 张。') },
      { ask: S('How many stamps do they have altogether?', '她们一共有几张？'), model: A([['Tina', 2345], ['Candice', 3542]]), sentence: S('They have ___ stamps altogether.', '她们一共有 ___ 张。') }),
    W2('l3-4-1-A4', 'Joslin earns $2140 a month. Linda earns $150 more than Joslin. Tracy earns $270 less than Linda.', 'Joslin 每月挣 $2140。Linda 比 Joslin 多挣 $150。Tracy 比 Linda 少挣 $270。',
      { ask: S('How much does Linda earn?', 'Linda 挣多少？'), model: Cm(['Joslin', 2140], 'Linda', 150, 'more'), sentence: S('Linda earns $___.', 'Linda 挣 $___。') },
      { ask: S('How much does Tracy earn?', 'Tracy 挣多少？'), model: Cm(['Linda', 'ANS1'], 'Tracy', 270, 'less'), sentence: S('Tracy earns $___.', 'Tracy 挣 $___。') }),
    W2('l3-4-1-A5', 'Rebecca pays $2080 for her television set. Diana pays $275 less than Rebecca for her television set.', 'Rebecca 买电视花了 $2080。Diana 买电视比 Rebecca 少花 $275。',
      { ask: S('How much does Diana pay for her television set?', 'Diana 花了多少？'), model: Cm(['Rebecca', 2080], 'Diana', 275, 'less'), sentence: S('Diana pays $___ for her television set.', 'Diana 花了 $___。') },
      { ask: S('How much do both television sets cost?', '两台电视一共多少钱？'), model: A([['Rebecca', 2080], ['Diana', 'ANS1']]), sentence: S('Both television sets cost $___.', '两台电视一共 $___。') }),
    W2('l3-4-1-A6', '3865 girls went to a concert. 1459 more boys than girls went to the same concert.', '3865 个女孩去听音乐会。去的男孩比女孩多 1459 个。',
      { ask: S('How many boys went to the concert?', '有多少个男孩去了？'), model: Cm(['girls', 3865], 'boys', 1459, 'more'), sentence: S('___ boys went to the concert.', '___ 个男孩去了。') },
      { ask: S('How many children went to the concert altogether?', '一共有多少个孩子去了？'), model: A([['girls', 3865], ['boys', 'ANS1']]), sentence: S('___ children went to the concert altogether.', '一共 ___ 个孩子去了。') }),
    W2('l3-4-1-A7', '2015 people attended a carnival on Saturday. 3585 more people attended the carnival on Sunday than on Saturday.', '星期六有 2015 人参加嘉年华。星期日比星期六多 3585 人。',
      { ask: S('How many people attended the carnival on Sunday?', '星期日有多少人？'), model: Cm(['Saturday', 2015], 'Sunday', 3585, 'more'), sentence: S('___ people attended the carnival on Sunday.', '星期日有 ___ 人。') },
      { ask: S('How many people attended the carnival on both days?', '两天一共多少人？'), model: A([['Saturday', 2015], ['Sunday', 'ANS1']]), sentence: S('___ people attended the carnival on both days.', '两天一共 ___ 人。') }),
    W2('l3-4-1-A8', 'Jason used 1075 kg of cement to build a house on Monday. He used 360 kg less cement on Tuesday than on Monday.', 'Jason 星期一用了 1075 kg 水泥盖房子。星期二比星期一少用 360 kg。',
      { ask: S('How much cement did he use on Tuesday?', '星期二用了多少？'), model: Cm(['Monday', 1075], 'Tuesday', 360, 'less'), sentence: S('He used ___ kg of cement on Tuesday.', '星期二用了 ___ kg。') },
      { ask: S('How much cement did he use on both days?', '两天一共用了多少？'), model: A([['Monday', 1075], ['Tuesday', 'ANS1']]), sentence: S('He used ___ kg of cement on both days.', '两天一共用了 ___ kg。') }),
    W2('l3-4-1-A9', 'A second-hand van costs $5180. It costs $3960 to buy a second-hand motorcycle.', '一辆二手货车 $5180。一辆二手摩托车 $3960。',
      { ask: S('How much cheaper is the second-hand motorcycle than the second-hand van?', '摩托车比货车便宜多少？'), model: Sb(['van', 5180], ['motorcycle', 3960], 'cheaper'), sentence: S('The second-hand motorcycle is $___ cheaper than the second-hand van.', '摩托车比货车便宜 $___。') },
      { ask: S('How much will it cost to buy both the second-hand van and the second-hand motorcycle?', '两辆一起买要多少钱？'), model: A([['van', 5180], ['motorcycle', 3960]]), sentence: S('It will cost $___ to buy both.', '两辆一起买要 $___。') }),
    W2('l3-4-1-A10', 'Joanna spent $2387 on clothes last year. Her parents told her to spend $500 less on clothes this year than last year.', 'Joanna 去年买衣服花了 $2387。父母让她今年比去年少花 $500。',
      { ask: S('How much could Joanna spend on clothes this year?', 'Joanna 今年可以花多少？'), model: Cm(['last year', 2387], 'this year', 500, 'less'), sentence: S('Joanna could spend $___ on clothes this year.', 'Joanna 今年可以花 $___。') },
      { ask: S('If Joanna were to spend $4000 on clothes this year, how much would she have overspent?', '如果她今年花了 $4000，超支了多少？'), model: Sb(['$4000', 4000], ['allowed', 'ANS1'], 'overspent'), sentence: S('She would have overspent by $___.', '她超支了 $___。') }),
  ];

  unit(4).kps = [
    {
      id: 'l3-4-1', available: true,
      title: { zh: '两步加减应用题', en: 'Solve up to two-step word problems related to addition and subtraction' },
      intro: { zh: '两步题先算第一问，再用第一问的答案算第二问。“比……多”用加法，“比……少 / 便宜”用减法，“一共 / 两天 / 两个”用加法，“多多少 / 超支多少”用大的减小的。画 bar model 帮助看清。', en: 'Solve step 1 first, then use its answer in step 2. Draw a bar model to see the relationship.' },
      sections: [
        { id: 'A', type: 'word2', title: { zh: '应用题', en: 'Do these word problems. Show your working clearly' },
          example: { kind: 'word2', n: W2('ex', 'Ravi has 1250 marbles. Sam has 430 fewer marbles than Ravi.', 'Ravi 有 1250 颗弹珠。Sam 比 Ravi 少 430 颗。', { ask: S('How many marbles does Sam have?', 'Sam 有几颗？'), model: Cm(['Ravi', 1250], 'Sam', 430, 'less'), sentence: S('Sam has ___ marbles.', 'Sam 有 ___ 颗。') }, { ask: S('How many marbles do they have altogether?', '一共几颗？'), model: A([['Ravi', 1250], ['Sam', 'ANS1']]), sentence: S('They have ___ marbles altogether.', '一共 ___ 颗。') }), title: { zh: '先减再加', en: 'Two steps' } },
          questions: qs },
      ],
    },
  ];
})();
