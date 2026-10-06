/* Level 3 · Unit 8  四则两步应用题 */
(function () {
  const U = window.MATH_DATA.levels[3].units;
  const unit = num => U.find(u => u.num === num);
  const S = (en, zh) => ({ en, zh });
  const A = parts => ({ kind: 'add', parts: parts.map(([label, v]) => ({ label, v })) });
  const Sb = (whole, known, unk) => ({ kind: 'sub', whole: { label: whole[0], v: whole[1] }, known: { label: known[0], v: known[1] }, unknown: { label: unk } });
  const Cm = (base, other, diff, otherIs) => ({ kind: 'cmp', base: { label: base[0], v: base[1] }, other: { label: other }, diff, otherIs });
  const Mul = (a, b, unit) => Object.assign({ kind: 'mul', a, b }, unit ? { unit } : {});
  const Div = (total, by, how) => ({ kind: 'div', total, by, how });
  const Tm = (base, other, k) => ({ kind: 'times', base: { label: base[0], v: base[1] }, other: { label: other }, k });
  const Un = (total, k, big, small) => ({ kind: 'units', total, k, big: { label: big }, small: { label: small } });
  const W2 = (id, en, zh, s1, s2) => ({ id, type: 'word2', en, zh, steps: [s1, s2], label: en.slice(0, 60) });
  // 单答案两步题
  const W1 = (id, en, zh, ask1, m1, sent1, ask2, m2, sentence) => ({ id, type: 'word', en, zh, model: { kind: 'chain', first: m1, second: m2, ask1, ask2, sentence1: sent1 }, sentence, label: en.slice(0, 60), hint: { zh: `分两步：先 ${ask1.zh}，再 ${ask2.zh}`, en: `Step 1: ${ask1.en} Step 2: ${ask2.en}` } });

  const qs = [
    W1('l3-8-1-A1', 'Samantha saved $135 in January. She saved twice as much in February. How much did Samantha save in the two months?', 'Samantha 一月存了 $135，二月存了一月的 2 倍。两个月一共存了多少？',
      S('How much did she save in February?', '二月存了多少？'), Tm(['Jan', 135], 'Feb', 2), S('She saved $___ in February.', '二月存了 $___。'),
      S('How much in the two months?', '两个月一共多少？'), A([['Jan', 135], ['Feb', 'ANS1']]), S('Samantha saved $___ in the two months.', '两个月一共存了 $___。')),
    W1('l3-8-1-A2', 'Troy plans to spend $280 equally over a week. If he spends $28 on Monday, how much money does he have left on that day?', 'Troy 打算一周平均花 $280。如果他星期一花了 $28，那天他还剩多少？',
      S('How much can he spend each day?', '每天可以花多少？'), Div(280, 7, 'share'), S('He has $___ to spend on Monday.', '星期一可以花 $___。'),
      S('How much is left on Monday?', '星期一还剩多少？'), Sb(['Monday', 'ANS1'], ['spent', 28], 'left'), S('He has $___ left on that day.', '那天还剩 $___。')),
    W2('l3-8-1-A3', '28 boys and 34 girls visited the library. Each of them borrowed 4 books.', '28 个男孩和 34 个女孩去了图书馆，每人借了 4 本书。',
      { ask: S('How many students visited the library?', '多少个学生去了图书馆？'), model: A([['boys', 28], ['girls', 34]]), sentence: S('___ students visited the library.', '___ 个学生去了图书馆。') },
      { ask: S('How many books did they borrow altogether?', '一共借了几本？'), model: Mul('ANS1', 4), sentence: S('They borrowed ___ books altogether.', '一共借了 ___ 本。') }),
    W1('l3-8-1-A4', 'Mr Johnson has a 100 m length of rope. He uses 52 m of it for his boat and cuts the remaining rope into 6 equal pieces. What is the length of each piece of rope?', 'Johnson 先生有 100 m 绳子，用了 52 m 在船上，剩下的平均剪成 6 段。每段多长？',
      S('How much rope remains?', '还剩多少绳子？'), Sb(['rope', 100], ['boat', 52], 'left'), S('___ m of rope remains.', '还剩 ___ m。'),
      S('How long is each piece?', '每段多长？'), Div('ANS1', 6, 'share'), S('The length of each piece of rope is ___ m.', '每段长 ___ m。')),
    W2('l3-8-1-A5', 'Mrs Campbell buys 5 boxes of pencils. There are 24 pencils in each box.', 'Campbell 太太买了 5 盒铅笔，每盒 24 支。',
      { ask: S('How many pencils are there altogether?', '一共几支？'), model: Mul(5, 24), sentence: S('There are ___ pencils altogether.', '一共 ___ 支。') },
      { ask: S('If she gives 39 pencils to her students, how many pencils are left?', '给学生 39 支后还剩几支？'), model: Sb(['pencils', 'ANS1'], ['given', 39], 'left'), sentence: S('___ pencils are left.', '还剩 ___ 支。') }),
    W2('l3-8-1-A6', '111 marbles are shared equally among three boys, Andy, Barry and Corey.', '111 颗弹珠平均分给 Andy、Barry、Corey 三个男孩。',
      { ask: S('How many marbles does each boy get?', '每人分到几颗？'), model: Div(111, 3, 'share'), sentence: S('Each boy gets ___ marbles.', '每人 ___ 颗。') },
      { ask: S('If Andy is given 14 more marbles, how many marbles does he have now?', '再给 Andy 14 颗，他现在有几颗？'), model: A([['Andy', 'ANS1'], ['more', 14]]), sentence: S('He has ___ marbles now.', '他现在有 ___ 颗。') }),
    W1('l3-8-1-A7', 'At a year-end sale, a $968 laptop computer now costs $49 less. If Mr Chan buys 4 such sets at the discounted price, how much does he have to pay in all?', '年末促销，$968 的笔记本电脑便宜了 $49。Chan 先生按折扣价买 4 台，一共要付多少？',
      S('What is the discounted price?', '折扣价是多少？'), Sb(['laptop', 968], ['discount', 49], 'discounted price'), S('The discounted price is $___.', '折扣价是 $___。'),
      S('How much for 4 sets?', '4 台多少钱？'), Mul(4, 'ANS1', '$'), S('He has to pay $___ in all.', '一共要付 $___。')),
    W2('l3-8-1-A8', '258 people visited an art exhibition in the morning. 267 people visited the exhibition in the afternoon.', '上午有 258 人参观艺术展，下午有 267 人。',
      { ask: S('How many people visited the exhibition altogether in the day?', '一天一共多少人？'), model: A([['morning', 258], ['afternoon', 267]]), sentence: S('___ people visited the exhibition altogether.', '一共 ___ 人。') },
      { ask: S('If there were 4 times as many adults as children, how many children were there?', '成人是儿童的 4 倍，儿童有几人？'), model: Un('ANS1', 4, 'adults', 'children'), sentence: S('There were ___ children.', '儿童有 ___ 人。') }),
    W2('l3-8-1-A9', 'Steve earns $1375 a month. John earns $70 less than Steve. Paul earns twice as much as John.', 'Steve 每月挣 $1375。John 比 Steve 少 $70。Paul 是 John 的 2 倍。',
      { ask: S('How much does John earn?', 'John 挣多少？'), model: Cm(['Steve', 1375], 'John', 70, 'less'), sentence: S('John earns $___.', 'John 挣 $___。') },
      { ask: S('How much does Paul earn?', 'Paul 挣多少？'), model: Tm(['John', 'ANS1'], 'Paul', 2), sentence: S('Paul earns $___.', 'Paul 挣 $___。') }),
    W2('l3-8-1-A10', 'There are 425 girls in a school. There are twice as many boys as girls.', '学校有 425 个女生，男生是女生的 2 倍。',
      { ask: S('How many boys are there?', '男生有几人？'), model: Tm(['girls', 425], 'boys', 2), sentence: S('There are ___ boys.', '男生 ___ 人。') },
      { ask: S('How many students are there altogether?', '一共几个学生？'), model: A([['girls', 425], ['boys', 'ANS1']]), sentence: S('There are ___ students altogether.', '一共 ___ 个学生。') }),
    W2('l3-8-1-A11', 'Jason collected 312 stamps last month. He collected 68 more stamps this month.', 'Jason 上个月收集了 312 张邮票，这个月比上个月多 68 张。',
      { ask: S('How many stamps did Jason collect this month?', '这个月收集了几张？'), model: Cm(['last month', 312], 'this month', 68, 'more'), sentence: S('Jason collected ___ stamps this month.', '这个月收集了 ___ 张。') },
      { ask: S("How many stamps would each friend get if this month's collection was given equally to two friends?", '平均分给两个朋友，每人几张？'), model: Div('ANS1', 2, 'share'), sentence: S('Each friend would get ___ stamps.', '每人 ___ 张。') }),
    W2('l3-8-1-A12', 'Sandra spends $175 on food every month. Jenny spends $159 on food every month.', 'Sandra 每月伙食费 $175，Jenny 每月 $159。',
      { ask: S('How much more money does Sandra spend on food than Jenny?', 'Sandra 比 Jenny 多花多少？'), model: Sb(['Sandra', 175], ['Jenny', 159], 'more'), sentence: S('Sandra spends $___ more than Jenny.', 'Sandra 比 Jenny 多花 $___。') },
      { ask: S('How much more does Sandra spend than Jenny in 6 months?', '6 个月多花多少？'), model: Mul(6, 'ANS1', '$'), sentence: S('Sandra spends $___ more than Jenny in 6 months.', '6 个月多花 $___。') }),
    W2('l3-8-1-A13', 'Johnson travels 98 km from his home to the city. He travels the same distance from the city back to home.', 'Johnson 从家到城里 98 km，回来也是同样的距离。',
      { ask: S('How far does Johnson travel to and fro the city?', '来回一共多少 km？'), model: Mul(2, 98), sentence: S('Johnson travels ___ km to and fro the city.', '来回 ___ km。') },
      { ask: S('He travels to and fro every day in a week. How far will he travel in all?', '一周每天来回，一共多少 km？'), model: Mul(7, 'ANS1'), sentence: S('He will travel ___ km in all.', '一共 ___ km。') }),
    W2('l3-8-1-A14', 'Emelda saved $160 every month for half a year. She then bought 8 presents with that sum of money.', 'Emelda 半年里每月存 $160，然后用这笔钱买了 8 份礼物。',
      { ask: S('How much did Emelda save in half a year?', '半年存了多少？'), model: Mul(6, 160, '$'), sentence: S('Emelda saved $___ in half a year.', '半年存了 $___。') },
      { ask: S('How much did she pay for each present if they cost the same?', '每份礼物多少钱？'), model: Div('ANS1', 8, 'share'), sentence: S('She paid $___ for each present.', '每份 $___。') }),
    W2('l3-8-1-A15', 'Nelly sews 8 dresses in a week. Each dress uses 6 m of cloth.', 'Nelly 一周缝 8 条裙子，每条用 6 m 布。',
      { ask: S('How much cloth does she use for the 8 dresses?', '8 条裙子用多少布？'), model: Mul(8, 6), sentence: S('She uses ___ m of cloth.', '用 ___ m 布。') },
      { ask: S('If she buys 100 m of cloth, how much cloth has she left?', '买了 100 m 布，还剩多少？'), model: Sb(['cloth', 100], ['used', 'ANS1'], 'left'), sentence: S('She has ___ m of cloth left.', '还剩 ___ m。') }),
    W1('l3-8-1-A16', 'Kelly bought 9 packets of candy canes. There were 25 candy canes in each packet. If Kelly were to give 5 candy canes to each student, how many students did she have?', 'Kelly 买了 9 包拐杖糖，每包 25 根。每个学生发 5 根，她有多少个学生？',
      S('How many candy canes altogether?', '一共几根糖？'), Mul(9, 25), S('There were ___ candy canes altogether.', '一共 ___ 根。'),
      S('How many students?', '多少个学生？'), Div('ANS1', 5, 'group'), S('She had ___ students.', '她有 ___ 个学生。')),
    W1('l3-8-1-A17', 'Linda bought 3 crates of apples. There were 24 apples in each crate. She then bought 245 oranges. How many fruit did she buy altogether?', 'Linda 买了 3 箱苹果，每箱 24 个，又买了 245 个橙子。一共买了多少水果？',
      S('How many apples?', '苹果几个？'), Mul(3, 24), S('She bought ___ apples.', '苹果 ___ 个。'),
      S('How many fruit altogether?', '一共多少水果？'), A([['apples', 'ANS1'], ['oranges', 245]]), S('She bought ___ fruit altogether.', '一共 ___ 个水果。')),
    W1('l3-8-1-A18', 'A radio costs $95. A television set costs $190. If Ken buys two radios and a television set, how much does he need to pay in total?', '收音机 $95，电视机 $190。Ken 买两台收音机和一台电视机，一共要付多少？',
      S('How much for two radios?', '两台收音机多少钱？'), Mul(2, 95, '$'), S('Two radios cost $___.', '两台收音机 $___。'),
      S('How much in total?', '一共多少？'), A([['radios', 'ANS1'], ['television', 190]]), S('He needs to pay $___ in total.', '一共要付 $___。')),
    W1('l3-8-1-A19', 'Jack bought a chair for $75. He then bought a table that cost thrice as much as the chair. How much did Jack pay for the furniture?', 'Jack 买了 $75 的椅子，又买了一张价钱是椅子 3 倍的桌子。他一共付了多少？',
      S('How much is the table?', '桌子多少钱？'), Tm(['chair', 75], 'table', 3), S('The table costs $___.', '桌子 $___。'),
      S('How much for the furniture?', '家具一共多少？'), A([['chair', 75], ['table', 'ANS1']]), S('Jack paid $___ for the furniture.', '一共付了 $___。')),
    W1('l3-8-1-A20', 'Maria scored a total of 171 marks for English and Mathematics. The marks for English was twice that of Mathematics. How many marks did she score for English?', 'Maria 英语和数学一共 171 分，英语是数学的 2 倍。英语多少分？',
      S('How many marks for Mathematics?', '数学多少分？'), Un(171, 2, 'English', 'Mathematics'), S('She scored ___ marks for Mathematics.', '数学 ___ 分。'),
      S('How many marks for English?', '英语多少分？'), Tm(['Mathematics', 'ANS1'], 'English', 2), S('She scored ___ marks for English.', '英语 ___ 分。')),
  ];

  unit(8).kps = [
    {
      id: 'l3-8-1', available: true,
      title: { zh: '四则两步应用题', en: 'Solve two-step word problems related to addition, subtraction, multiplication and division' },
      intro: { zh: '先想第一步算什么，再用第一步的答案算第二步。几倍 → 乘；平均分 → 除；一共 → 加；剩下 / 多多少 → 减。每一步都画线段图。', en: 'Work out step 1 first, then use its answer in step 2. Draw a bar model for each step.' },
      sections: [
        { id: 'A', type: 'word', title: { zh: '应用题', en: 'Do these word problems. Show your working clearly' },
          example: { kind: 'word', n: { en: 'Mr Lim buys 4 boxes of pens. There are 12 pens in each box. He gives 15 pens away. How many pens does he have left?', zh: 'Lim 先生买了 4 盒笔，每盒 12 支，送出 15 支。还剩几支？', model: { kind: 'chain', first: Mul(4, 12), second: Sb(['pens', 'ANS1'], ['given', 15], 'left'), ask1: S('How many pens altogether?', '一共几支笔？'), ask2: S('How many left?', '还剩几支？'), sentence1: S('He has ___ pens altogether.', '一共 ___ 支。') }, sentence: S('He has ___ pens left.', '还剩 ___ 支。') }, title: { zh: '4 × 12 = 48，48 − 15 = 33', en: 'Two steps' } },
          questions: qs },
      ],
    },
  ];
})();
