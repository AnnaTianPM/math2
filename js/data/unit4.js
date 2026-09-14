/* Unit 4 加减法应用题 */
(function () {
  const U = window.MATH_DATA.units;
  const unit = num => U.find(u => u.num === num);
  const add = (id, en, zh, parts, sentence) => ({ id, type: 'word', en, zh, model: { kind: 'add', parts: parts.map(([label, v]) => ({ label, v })) }, sentence });
  const sub = (id, en, zh, whole, known, unknownLabel, sentence) => ({ id, type: 'word', en, zh, model: { kind: 'sub', whole: { label: whole[0], v: whole[1] }, known: { label: known[0], v: known[1] }, unknown: { label: unknownLabel } }, sentence });
  const cmp = (id, en, zh, base, otherLabel, diff, otherIs, sentence) => ({ id, type: 'word', en, zh, model: { kind: 'cmp', base: { label: base[0], v: base[1] }, other: { label: otherLabel }, diff, otherIs }, sentence });
  const S = (en, zh) => ({ en, zh });

  unit(4).kps = [
    {
      id: 'u4-1', available: true,
      title: { zh: '部分与整体（合起来 / 分开）', en: 'Add and subtract using part-whole' },
      intro: { zh: '两部分合起来求一共，用加法；知道一共和其中一部分，求另一部分，用减法。画 bar model 帮忙看清楚。', en: 'Part + part = whole (add). Whole − part = other part (subtract). Draw a bar model.' },
      sections: [
        {
          id: 'A', type: 'word',
          title: { zh: '应用题', en: 'Do these word problems' },
          example: { kind: 'word', n: add('ex', 'Danny has 576 bookmarks. Jack has 186 bookmarks. How many bookmarks do they have altogether?', 'Danny 有 576 张书签，Jack 有 186 张书签。他们一共有多少张书签？', [['Danny', 576], ['Jack', 186]], S('They have ___ bookmarks altogether.', '他们一共有 ___ 张书签。')), title: { zh: '576 + 186 合起来', en: 'Part + part' } },
          questions: [
            add('u4-1-A1', 'Mr Jones sold 586 cakes on Monday. He sold 237 cakes on Tuesday. How many cakes did he sell altogether?', 'Jones 先生星期一卖了 586 个蛋糕，星期二卖了 237 个。他一共卖了多少个蛋糕？', [['Monday', 586], ['Tuesday', 237]], S('He sold ___ cakes altogether.', '他一共卖了 ___ 个蛋糕。')),
            add('u4-1-A2', 'There were 416 visitors at a museum on Saturday. There were 555 visitors at the museum on Sunday. How many visitors were there altogether on both days?', '博物馆星期六有 416 位游客，星期日有 555 位游客。两天一共有多少位游客？', [['Saturday', 416], ['Sunday', 555]], S('There were ___ visitors altogether on both days.', '两天一共有 ___ 位游客。')),
            add('u4-1-A3', 'There are 428 cars and 169 vans at a car park. How many vehicles are there altogether at the car park?', '停车场有 428 辆小汽车和 169 辆货车。停车场一共有多少辆车？', [['cars', 428], ['vans', 169]], S('There are ___ vehicles altogether at the car park.', '停车场一共有 ___ 辆车。')),
            add('u4-1-A4', 'Denise has 294 picture cards. Kelly has 311 picture cards. How many picture cards do the girls have in all?', 'Denise 有 294 张图片卡，Kelly 有 311 张。两个女孩一共有多少张？', [['Denise', 294], ['Kelly', 311]], S('The girls have ___ picture cards in all.', '两个女孩一共有 ___ 张图片卡。')),
            add('u4-1-A5', 'Sanjey seals 177 envelopes in the morning. He seals 243 envelopes in the afternoon. How many envelopes does Sanjey seal in total?', 'Sanjey 上午封了 177 个信封，下午封了 243 个。他一共封了多少个信封？', [['morning', 177], ['afternoon', 243]], S('Sanjey seals ___ envelopes in total.', 'Sanjey 一共封了 ___ 个信封。')),
            sub('u4-1-A6', 'Walter and Jack spent $837 at a computer fair. If Jack spent $469, how much did Walter spend?', 'Walter 和 Jack 在电脑展一共花了 837 元。Jack 花了 469 元，Walter 花了多少元？', ['total', 837], ['Jack', 469], 'Walter', S('Walter spent $___.', 'Walter 花了 ___ 元。')),
            sub('u4-1-A7', '920 boys and girls took part in a cross country race. If there were 440 boys at the race, how many girls were there?', '920 个男孩和女孩参加了越野赛。其中有 440 个男孩，女孩有多少个？', ['total', 920], ['boys', 440], 'girls', S('There were ___ girls.', '有 ___ 个女孩。')),
            sub('u4-1-A8', 'A fruiterer sold 575 apples and oranges in a week. 299 of the fruit sold were apples. How many oranges did the fruiterer sell?', '水果商一周卖了 575 个苹果和橙子。其中 299 个是苹果，橙子卖了多少个？', ['total', 575], ['apples', 299], 'oranges', S('The fruiterer sold ___ oranges.', '水果商卖了 ___ 个橙子。')),
            sub('u4-1-A9', 'Esther read 154 pages of a storybook in two days. She read 78 pages of the storybook on the first day. How many pages of the storybook did she read on the second day?', 'Esther 两天读了 154 页故事书。第一天读了 78 页，第二天读了多少页？', ['total', 154], ['day 1', 78], 'day 2', S('She read ___ pages of the storybook on the second day.', '她第二天读了 ___ 页。')),
            sub('u4-1-A10', 'There are 413 monkeys and squirrels in a nature reserve. 226 of them are squirrels. How many monkeys are there in the nature reserve?', '自然保护区有 413 只猴子和松鼠。其中 226 只是松鼠，猴子有多少只？', ['total', 413], ['squirrels', 226], 'monkeys', S('There are ___ monkeys in the nature reserve.', '保护区有 ___ 只猴子。')),
          ]
        },
      ],
    },
    {
      id: 'u4-2', available: true,
      title: { zh: '增加与拿走', en: 'Add and subtract by adding on and taking away sets' },
      intro: { zh: '原来有一些，又来了一些，用加法；原来有一些，拿走一些，用减法。', en: 'Adding on → add. Taking away → subtract.' },
      sections: [
        {
          id: 'A', type: 'word',
          title: { zh: '应用题', en: 'Do these word problems' },
          example: { kind: 'word', n: sub('ex', 'Eddy has 280 chickens. He sells 168 chickens. How many chickens has he left?', 'Eddy 有 280 只鸡。他卖掉了 168 只，还剩多少只？', ['had', 280], ['sold', 168], 'left', S('He has ___ chickens left.', '他还剩 ___ 只鸡。')), title: { zh: '280 − 168 拿走', en: 'Taking away' } },
          questions: [
            add('u4-2-A1', 'Andy receives 131 stickers from his father. His sister gives him another 280 stickers. How many stickers does he have altogether?', 'Andy 从爸爸那里得到 131 张贴纸，姐姐又给了他 280 张。他一共有多少张贴纸？', [['father', 131], ['sister', 280]], S('He has ___ stickers altogether.', '他一共有 ___ 张贴纸。')),
            add('u4-2-A2', 'A class of students collected 626 plastic bottles for recycling. They needed to collect 324 more plastic bottles. How many plastic bottles were needed for recycling?', '一个班收集了 626 个塑料瓶做回收。他们还需要再收集 324 个。回收一共需要多少个塑料瓶？', [['collected', 626], ['more', 324]], S('___ plastic bottles were needed for recycling.', '回收一共需要 ___ 个塑料瓶。')),
            add('u4-2-A3', 'Mr Chan has 267 highlighter pens in his stationery shop. He buys another 95 highlighter pens. How many highlighter pens does he have in his stationery shop now?', 'Chan 先生的文具店有 267 支荧光笔。他又进了 95 支。现在店里有多少支荧光笔？', [['had', 267], ['bought', 95]], S('He has ___ highlighter pens in his stationery shop now.', '现在店里有 ___ 支荧光笔。')),
            add('u4-2-A4', 'There are 88 koi fish in a pond. 28 koi fish are added to the pond on Monday. Another 38 koi fish are added to the pond on Tuesday. How many koi fish are there in the pond altogether after the two days?', '池塘里有 88 条锦鲤。星期一放进 28 条，星期二又放进 38 条。两天后池塘里一共有多少条锦鲤？', [['had', 88], ['Monday', 28], ['Tuesday', 38]], S('There are ___ koi fish in the pond altogether after the two days.', '两天后池塘里一共有 ___ 条锦鲤。')),
            add('u4-2-A5', 'There were 445 audience members watching a play in an auditorium. 73 latecomers joined the audience after the first intermission. Another 19 latecomers joined the audience after the second intermission. How many audience members were there in the end?', '礼堂里有 445 位观众在看戏。第一次中场后又来了 73 位，第二次中场后又来了 19 位。最后一共有多少位观众？', [['had', 445], ['1st', 73], ['2nd', 19]], S('There were ___ audience members in the end.', '最后一共有 ___ 位观众。')),
            sub('u4-2-A6', 'Mdm Wong bakes 500 chocolate chip cookies. She sells 336 of them to her customers. How many chocolate chip cookies has she left?', 'Wong 女士烤了 500 块巧克力曲奇。她卖掉了 336 块，还剩多少块？', ['baked', 500], ['sold', 336], 'left', S('She has ___ chocolate chip cookies left.', '她还剩 ___ 块曲奇。')),
            sub('u4-2-A7', 'The Gomez family has 317 pieces of clothing at home. They donate 89 pieces of clothing to charity. How many pieces of clothing have they left?', 'Gomez 一家有 317 件衣服。他们捐了 89 件给慈善机构，还剩多少件？', ['had', 317], ['donated', 89], 'left', S('They have ___ pieces of clothing left.', '他们还剩 ___ 件衣服。')),
            sub('u4-2-A8', 'There are 651 vehicles in a basement car park. 494 of them are driven away after a concert event. How many vehicles are there left in the car park?', '地下停车场有 651 辆车。音乐会结束后开走了 494 辆，停车场还剩多少辆？', ['had', 651], ['left', 494], 'still there', S('There are ___ vehicles left in the car park.', '停车场还剩 ___ 辆车。')),
            sub('u4-2-A9', 'Samantha had 96 picture cards. She gave some to her best friend. She had 78 picture cards left. How many picture cards did she give to her best friend?', 'Samantha 有 96 张图片卡。她送了一些给好朋友，还剩 78 张。她送了多少张？', ['had', 96], ['left', 78], 'gave', S('She gave ___ picture cards to her best friend.', '她送了 ___ 张图片卡给好朋友。')),
            sub('u4-2-A10', 'Donald has 720 trading cards. He gives some to his brother. He has 465 trading cards left. How many trading cards does he give to his brother?', 'Donald 有 720 张交换卡。他给了弟弟一些，还剩 465 张。他给了弟弟多少张？', ['had', 720], ['left', 465], 'gave', S('He gives ___ trading cards to his brother.', '他给了弟弟 ___ 张交换卡。')),
          ]
        },
      ],
    },
    {
      id: 'u4-3', available: true,
      title: { zh: '比较两个数量（多多少 / 少多少）', en: 'Add and subtract by comparing two sets' },
      intro: { zh: '“比……多 more than”：求多的那个，用加法。“比……少 fewer than”：求少的那个，用减法。画两条 bar 比一比。', en: '"more than" → add. "fewer than" → subtract. Draw two bars to compare.' },
      sections: [
        {
          id: 'A', type: 'word',
          title: { zh: '应用题', en: 'Do these word problems' },
          example: { kind: 'word', n: cmp('ex', 'Sally collects 389 stickers. Anne collects 317 more stickers than Sally. How many stickers does Anne collect?', 'Sally 收集了 389 张贴纸。Anne 比 Sally 多收集了 317 张。Anne 收集了多少张？', ['Sally', 389], 'Anne', 317, 'more', S('Anne collects ___ stickers.', 'Anne 收集了 ___ 张贴纸。')), title: { zh: '比 Sally 多 317', en: '317 more than' } },
          questions: [
            cmp('u4-3-A1', 'Jamie scores 538 points in a video game. Her brother scores 188 more points than her in the video game. How many points does he score?', 'Jamie 在游戏里得了 538 分。她弟弟比她多得 188 分。弟弟得了多少分？', ['Jamie', 538], 'brother', 188, 'more', S('He scores ___ points.', '弟弟得了 ___ 分。')),
            cmp('u4-3-A2', 'Jean collected 477 saga seeds from the park. Joan collected 199 more saga seeds than Jean. How many saga seeds did Joan collect?', 'Jean 在公园捡了 477 颗相思豆。Joan 比 Jean 多捡了 199 颗。Joan 捡了多少颗？', ['Jean', 477], 'Joan', 199, 'more', S('Joan collected ___ saga seeds.', 'Joan 捡了 ___ 颗相思豆。')),
            cmp('u4-3-A3', 'A grocer sold 254 potatoes in a week. He sold 66 fewer potatoes than tomatoes. How many tomatoes did he sell in the week?', '杂货商一周卖了 254 个土豆。土豆比西红柿少卖了 66 个。西红柿卖了多少个？（土豆少，所以西红柿多）', ['potatoes', 254], 'tomatoes', 66, 'more', S('He sold ___ tomatoes in the week.', '他一周卖了 ___ 个西红柿。')),
            cmp('u4-3-A4', '323 students take the bus to school. 105 fewer students take the bus than take the MRT to school. How many students take the MRT to school?', '323 个学生坐公交车上学。坐公交的比坐地铁的少 105 人。坐地铁的有多少人？（坐公交的少，所以坐地铁的多）', ['bus', 323], 'MRT', 105, 'more', S('___ students take the MRT to school.', '有 ___ 个学生坐地铁上学。')),
            cmp('u4-3-A5', 'Michael has 462 marbles. He has 291 fewer marbles than Jerry. How many marbles does Jerry have?', 'Michael 有 462 颗弹珠。他比 Jerry 少 291 颗。Jerry 有多少颗？（Michael 少，所以 Jerry 多）', ['Michael', 462], 'Jerry', 291, 'more', S('Jerry has ___ marbles.', 'Jerry 有 ___ 颗弹珠。')),
            cmp('u4-3-A6', 'Eva makes 236 paper stars in the morning. She makes 94 fewer paper stars in the afternoon than in the morning. How many paper stars does Eva make in the afternoon?', 'Eva 上午折了 236 颗纸星星。下午比上午少折 94 颗。下午折了多少颗？', ['morning', 236], 'afternoon', 94, 'less', S('Eva makes ___ paper stars in the afternoon.', 'Eva 下午折了 ___ 颗纸星星。')),
            cmp('u4-3-A7', '569 men took part in the annual marathon. 247 more men than women took part in the marathon. How many women took part in the marathon?', '569 个男士参加了马拉松。男士比女士多 247 人。女士有多少人？（男士多，所以女士少）', ['men', 569], 'women', 247, 'less', S('___ women took part in the marathon.', '有 ___ 位女士参加了马拉松。')),
            cmp('u4-3-A8', 'Philip has 495 green counters. He has 198 more green counters than orange counters. How many orange counters does Philip have?', 'Philip 有 495 个绿色筹码。绿色比橙色多 198 个。橙色筹码有多少个？（绿色多，所以橙色少）', ['green', 495], 'orange', 198, 'less', S('Philip has ___ orange counters.', 'Philip 有 ___ 个橙色筹码。')),
          ]
        },
      ],
    },
  ];
})();
