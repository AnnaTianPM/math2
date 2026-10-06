/* Level 4 · Unit 4  整数应用题（最多三步） */
(function () {
  const U = window.MATH_DATA.levels[4].units;
  const unit = num => U.find(u => u.num === num);
  const ubar = window.L3.ubar, fmt = window.L4.fmt;
  const num = a => ({ a });
  const wp = (en, zh) => `<div class="wp-text"><div class="wp-en">${en}</div><div class="wp-zh">${zh}</div></div>`;
  /* W(id, en, zh, ans, steps, sentence, o{bar, read, hint, fields?, text?}) */
  const W = (id, en, zh, ans, steps, sentence, o = {}) => ({ id, type: 'fill', pic: wp(en, zh), label: en.slice(0, 70), prompt: { zh: o.ask || '算一算，填答案', en: 'Solve the word problem' }, text: o.text || '{{a}}', fields: o.fields || { a: num(ans) }, answerText: o.fields ? Object.values(o.fields).map(f => f.a).join(', ') : String(ans), hint: o.hint, explain: ['l4steps', { en, zh, ans, steps, sentence, bar: o.bar, read: o.read }] });
  const cells = (n, v, o = {}) => ubar([Object.assign({ n, first: v, bottom: '?' }, o)]);

  const Q = [
    W('l4-4-1-A1', 'There are 255 balloons in a pack. How many balloons are there in a dozen such packs?', '一包有 255 个气球。一打（12 包）这样的气球一共有多少个？', 3060,
      [{ zh: '一打 = <b>12</b>。12 包，每包 255 个，求一共，用乘法：12 × 255 = <b>3060</b>（竖式：255 × 12 = 255 × 2 + 255 × 10 = 510 + 2550）。', en: '12 × 255 = 3060.', expr: '12 × 255 = 3060' }],
      { zh: '一打这样的气球有 ___ 个。', en: 'There are ___ balloons in a dozen such packs.' },
      { bar: cells(12, 255), read: { zh: '"a dozen" 是一打，就是 <b>12</b>。12 个 255 合起来，几个几用<b>乘法</b>。', en: 'A dozen = 12. 12 groups of 255: multiply.' }, hint: { zh: 'a dozen = 12。', en: 'A dozen is 12.' } }),
    W('l4-4-1-A2', 'A factory manufactures 2275 watches in a week. How many watches does it manufacture in 3 days?', '一家工厂一星期生产 2275 只手表。3 天生产多少只？', 975,
      [{ zh: '一星期 = <b>7 天</b>。先求一天生产多少：2275 ÷ 7 = <b>325</b>。', en: '2275 ÷ 7 = 325 a day.', expr: '2275 ÷ 7 = 325' }, { zh: '再求 3 天：3 × 325 = <b>975</b>。', en: '3 × 325 = 975.', expr: '3 × 325 = 975' }],
      { zh: '3 天生产 ___ 只手表。', en: 'It manufactures ___ watches in 3 days.' },
      { bar: ubar([{ n: 7, top: 2275, bottom: '?', bottomN: 3 }]), read: { zh: '一星期有 7 天，2275 是 7 天的总数。先算 1 天的，再算 3 天的。', en: 'A week has 7 days. Find one day first, then 3 days.' }, hint: { zh: '一星期 7 天：先 ÷ 7 求一天，再 × 3。', en: '÷ 7 then × 3.' } }),
    W('l4-4-1-A3', 'A shirt cost $253 and a tie cost $78. David bought 4 such shirts and 3 such ties. How much did he spend altogether?', '一件衬衫 253 元，一条领带 78 元。David 买了 4 件衬衫和 3 条领带。他一共花了多少钱？', 1246,
      [{ zh: '4 件衬衫：4 × $253 = <b>$1012</b>。', en: '4 × $253 = $1012.', expr: '4 × $253 = $1012' }, { zh: '3 条领带：3 × $78 = <b>$234</b>。', en: '3 × $78 = $234.', expr: '3 × $78 = $234' }, { zh: '合起来：$1012 + $234 = <b>$1246</b>。', en: '$1012 + $234 = $1246.', expr: '$1012 + $234 = $1246' }],
      { zh: '他一共花了 ___ 元。', en: 'He spent $___ altogether.' },
      { bar: ubar([{ label: 'shirts', n: 4, first: '$253' }, { label: 'ties', n: 3, first: '$78' }], { right: '?' }), read: { zh: '两种东西分别算总价，再加起来。', en: 'Find the cost of the shirts and the ties, then add.' }, hint: { zh: '衬衫总价 + 领带总价。', en: 'Shirts total plus ties total.' } }),
    W('l4-4-1-A4', 'A bag costs 4 times as much as a dress. If the bag costs $276, how much does Anna spend on the bag and 3 such dresses?', '一个包的价钱是一条裙子的 4 倍。包是 276 元，Anna 买这个包和 3 条这样的裙子要花多少钱？', 483,
      [{ zh: '包是裙子的 4 倍，包 $276 → 1 条裙子：$276 ÷ 4 = <b>$69</b>。', en: '$276 ÷ 4 = $69 for a dress.', expr: '$276 ÷ 4 = $69' }, { zh: '包 + 3 条裙子 = 4 units + 3 units = 7 units：7 × $69 = <b>$483</b>。', en: '7 × $69 = $483.', expr: '7 × $69 = $483' }],
      { zh: 'Anna 买包和 3 条裙子要花 ___ 元。', en: 'Anna spends $___ on the bag and 3 such dresses.' },
      { bar: ubar([{ label: 'bag', n: 4, top: '$276' }, { label: 'dresses', n: 3, bottom: '?', bottomN: 3 }]), read: { zh: '裙子画 1 格，包就是 4 格 = $276。要买 1 个包（4 格）和 3 条裙子（3 格），一共 7 格。', en: 'Dress = 1 unit, bag = 4 units = $276. Bag + 3 dresses = 7 units.' }, hint: { zh: '先算 1 条裙子（$276 ÷ 4），再算 7 份。', en: 'Find one dress first.' } }),
    W('l4-4-1-A5', 'Jason had some marbles. He gave 35 marbles to each of his 4 brothers and still had 219 marbles left. How many marbles did Jason have at first?', 'Jason 有一些弹珠。他给 4 个弟弟每人 35 颗，还剩 219 颗。Jason 原来有多少颗弹珠？', 359,
      [{ zh: '送出去的：4 × 35 = <b>140</b> 颗。', en: '4 × 35 = 140 given away.', expr: '4 × 35 = 140' }, { zh: '原来的 = 送出去的 + 剩下的：140 + 219 = <b>359</b>。', en: '140 + 219 = 359.', expr: '140 + 219 = 359' }],
      { zh: 'Jason 原来有 ___ 颗弹珠。', en: 'Jason had ___ marbles at first.' },
      { bar: ubar([{ n: 5, first: 35, dashed: true, bottom: '?' }]), read: { zh: '原来的数 = 送出去的 + 剩下的 219。送出去的是 4 个 35。', en: 'At first = given away + 219 left.' }, hint: { zh: '先算送了多少（4 × 35），再加上剩下的。', en: '4 × 35, then add 219.' } }),
    W('l4-4-1-A6', '114 men and 686 women went to a concert. Each ticket cost $17. How much money was collected in all?', '114 个男士和 686 个女士去听音乐会。每张票 17 元。一共收了多少钱？', 13600,
      [{ zh: '先算一共多少人：114 + 686 = <b>800</b>。', en: '114 + 686 = 800 people.', expr: '114 + 686 = 800' }, { zh: '800 张票，每张 $17：800 × $17 = <b>$13 600</b>。', en: '800 × $17 = $13 600.', expr: '800 × $17 = $13 600' }],
      { zh: '一共收了 ___ 元。', en: '$___ was collected in all.' },
      { bar: ubar([{ n: 2, top: '?' }]).replace('?', '114 | 686'), read: { zh: '每张票一样贵，先把人数加起来，再乘票价。', en: 'Add the people first, then multiply by $17.' }, hint: { zh: '人数加起来再 × 17。', en: 'Total people × 17.' } }),
    W('l4-4-1-A7', 'A baker bakes 840 loaves of bread in a day. How many loaves of bread will he bake in 6 weeks?', '一个面包师一天烤 840 个面包。6 个星期他烤多少个？', 35280,
      [{ zh: '一星期 7 天：7 × 840 = <b>5880</b> 个。', en: '7 × 840 = 5880 a week.', expr: '7 × 840 = 5880' }, { zh: '6 个星期：6 × 5880 = <b>35 280</b>。', en: '6 × 5880 = 35 280.', expr: '6 × 5880 = 35 280' }],
      { zh: '6 个星期他烤 ___ 个面包。', en: 'He will bake ___ loaves of bread in 6 weeks.' },
      { bar: ubar([{ label: '1 week', n: 7, first: 840, bottom: '?' }, { label: '6 weeks', n: 6, first: '5880', bottom: '?' }]), read: { zh: '先算一星期（7 天），再算 6 星期。', en: 'One week first (7 days), then 6 weeks.' }, hint: { zh: '840 × 7 × 6。', en: '840 × 7, then × 6.' } }),
    W('l4-4-1-A8', 'Angela has 896 stickers. She gives 50 stickers to each of her seven friends. She sorts the remaining stickers equally into three albums. How many stickers are there in each album?', 'Angela 有 896 张贴纸。她给 7 个朋友每人 50 张，剩下的平均放进 3 本册子。每本册子有多少张？', 182,
      [{ zh: '送出去的：7 × 50 = <b>350</b> 张。', en: '7 × 50 = 350.', expr: '7 × 50 = 350' }, { zh: '剩下的：896 − 350 = <b>546</b> 张。', en: '896 − 350 = 546.', expr: '896 − 350 = 546' }, { zh: '平均放进 3 本：546 ÷ 3 = <b>182</b>。', en: '546 ÷ 3 = 182.', expr: '546 ÷ 3 = 182' }],
      { zh: '每本册子有 ___ 张贴纸。', en: 'There are ___ stickers in each album.' },
      { bar: ubar([{ n: 10, first: 50, dashed: true, top: 896, bottom: '?', bottomN: 3 }]), read: { zh: '三步：先算送掉多少，再算剩多少，最后平均分成 3 份。', en: 'Given away, then left, then share by 3.' }, hint: { zh: '896 − 7 × 50，再 ÷ 3。', en: '896 − 350, then ÷ 3.' } }),
    W('l4-4-1-A9', "There were 400 sweets in a pack. The principal of a school bought 25 such packs of sweets for 2000 children on Children's Day. (a) How many sweets did the principal buy altogether? (b) If each child was given 7 sweets, how many more packs of sweets were needed?", '一包有 400 颗糖。校长为 2000 个孩子买了 25 包。(a) 校长一共买了多少颗糖？(b) 如果每个孩子分 7 颗，还需要再买几包？', 10,
      [{ zh: '(a) 25 包，每包 400 颗：25 × 400 = <b>10 000</b> 颗。', en: '25 × 400 = 10 000.', expr: '25 × 400 = 10 000' }, { zh: '(b) 2000 个孩子每人 7 颗，需要：2000 × 7 = <b>14 000</b> 颗。', en: '2000 × 7 = 14 000 needed.', expr: '2000 × 7 = 14 000' }, { zh: '还差：14 000 − 10 000 = <b>4000</b> 颗。', en: '14 000 − 10 000 = 4000 more.', expr: '14 000 − 10 000 = 4000' }, { zh: '4000 颗要几包：4000 ÷ 400 = <b>10</b> 包。', en: '4000 ÷ 400 = 10 packs.', expr: '4000 ÷ 400 = 10' }],
      { zh: '(a) 一共买了 10 000 颗糖；(b) 还需要 ___ 包。', en: '(a) 10 000 sweets; (b) ___ more packs were needed.' },
      { text: '(a) {{a}} sweets\n(b) {{b}} more packs', fields: { a: num(10000), b: num(10) }, ask: '先算买了多少颗，再算还差几包', read: { zh: '(b) 要先算总共需要多少颗，和已经买的比一比，差的再换算成包数。', en: 'Find how many are needed, compare, then convert to packs.' }, hint: { zh: '(a) 25 × 400；(b) 2000 × 7 需要的 − 已买的，再 ÷ 400。', en: '(a) 25 × 400; (b) (2000 × 7 − 10 000) ÷ 400.' } }),
    W('l4-4-1-A10', "Helen is 16 years old and her mother is 44 years old this year. How many years ago was Helen's mother five times as old as Helen?", 'Helen 今年 16 岁，妈妈 44 岁。几年前妈妈的年龄是 Helen 的 5 倍？', 9,
      [{ zh: '用<b>猜一猜、查一查</b>（Guess and Check）。猜 4 年前：妈妈 44 − 4 = 40，Helen 16 − 4 = 12，40 ÷ 12 = 3 R 4，不是 5 倍。', en: 'Guess 4 years ago: 40 and 12. Not 5 times.', expr: '4 years ago: 40, 12 → 40 ÷ 12 = 3 R 4 ✗' }, { zh: '猜 8 年前：妈妈 36，Helen 8，36 ÷ 8 = 4 R 4，还不是。倍数要更大，年数要再多一点。', en: 'Guess 8 years ago: 36 and 8. Not 5 times.', expr: '8 years ago: 36, 8 → 36 ÷ 8 = 4 R 4 ✗' }, { zh: '猜 9 年前：妈妈 44 − 9 = 35，Helen 16 − 9 = 7，35 ÷ 7 = <b>5</b> ✓ 正好 5 倍。', en: '9 years ago: 35 and 7. 35 ÷ 7 = 5 ✓', expr: '9 years ago: 35, 7 → 35 ÷ 7 = 5 ✓' }],
      { zh: '___ 年前妈妈的年龄是 Helen 的 5 倍。', en: "Helen's mother was five times as old as Helen ___ years ago." },
      { bar: `<table class="pv4"><tr><th>Guess</th><th>Mother</th><th>Helen</th><th>5 times?</th></tr><tr><td>4</td><td>40</td><td>12</td><td>40 ÷ 12 = 3 R 4</td></tr><tr><td>8</td><td>36</td><td>8</td><td>36 ÷ 8 = 4 R 4</td></tr><tr><td>9</td><td>35</td><td>7</td><td>35 ÷ 7 = 5 ✓</td></tr></table>`, read: { zh: '两个人每过一年都长 1 岁，所以"几年前"两个人要<b>减同一个数</b>。一个一个试，看哪一年妈妈正好是 Helen 的 5 倍。', en: 'Both get younger by the same number of years. Guess and check.' }, hint: { zh: '两人同时减去同样的年数，试到妈妈 = Helen × 5。', en: 'Subtract the same number from both ages until one is 5 times the other.' } }),
    W('l4-4-1-A11', 'A hi-fi system costs $328. A television set costs four times as much as the hi-fi system. Mr Simon buys the hi-fi system and the television set and pays for them in eight monthly instalments. How much must he pay for the electrical appliances each month?', '一套音响 328 元。一台电视是音响的 4 倍。Simon 先生买了音响和电视，分 8 个月付清。他每个月要付多少钱？', 205,
      [{ zh: '音响 1 份，电视 4 份，一共 5 份：5 × $328 = <b>$1640</b>。', en: '5 × $328 = $1640.', expr: '5 × $328 = $1640' }, { zh: '分 8 个月：$1640 ÷ 8 = <b>$205</b>。', en: '$1640 ÷ 8 = $205.', expr: '$1640 ÷ 8 = $205' }],
      { zh: '他每个月要付 ___ 元。', en: 'He must pay $___ each month.' },
      { bar: ubar([{ label: 'hi-fi', n: 1, top: '$328' }, { label: 'TV', n: 4 }], { right: '?' }), read: { zh: '音响画 1 格，电视画 4 格，两样一共 5 格。先算总价，再平均分到 8 个月。', en: 'Hi-fi = 1 unit, TV = 4 units, total 5 units. Then ÷ 8.' }, hint: { zh: '总价 = 5 × 328，再 ÷ 8。', en: '5 × 328, then ÷ 8.' } }),
    W('l4-4-1-A12', 'Michael had $3600. After spending $320, he still had twice as much money as Cynthia. Find the total amount of money they had at first.', 'Michael 有 3600 元。花了 320 元后，他的钱还是 Cynthia 的 2 倍。他们两人原来一共有多少钱？', 5240,
      [{ zh: 'Michael 花完剩下：$3600 − $320 = <b>$3280</b>。', en: '$3600 − $320 = $3280.', expr: '$3600 − $320 = $3280' }, { zh: '$3280 是 Cynthia 的 2 倍，Cynthia：$3280 ÷ 2 = <b>$1640</b>。', en: '$3280 ÷ 2 = $1640 (Cynthia).', expr: '$3280 ÷ 2 = $1640' }, { zh: '原来一共：Michael 原来的 $3600 + Cynthia 的 $1640 = <b>$5240</b>。', en: '$3600 + $1640 = $5240.', expr: '$3600 + $1640 = $5240' }],
      { zh: '他们原来一共有 ___ 元。', en: 'The total amount of money they had at first was $___.' },
      { bar: ubar([{ label: 'Michael', n: 3, top: '$3600' }, { label: 'Cynthia', n: 1 }], { right: '?' }), read: { zh: '注意：问的是<b>原来</b>一共多少，Michael 要用没花钱之前的 $3600。Cynthia 的钱没变。', en: 'At first: use Michael\'s original $3600. Cynthia\'s money did not change.' }, hint: { zh: '(3600 − 320) ÷ 2 是 Cynthia 的钱，再加 Michael 原来的 3600。', en: 'Cynthia = (3600 − 320) ÷ 2; then add 3600.' } }),
    W('l4-4-1-A13', 'Kenny bought a book and four identical pens for $12. Charlie bought the same book and two similar pens. Charlie paid $4 less than Kenny. What was the cost of the book?', 'Kenny 买了一本书和 4 支一样的笔，花了 12 元。Charlie 买了同样的书和 2 支笔，比 Kenny 少付 4 元。这本书多少钱？', 4,
      [{ zh: '两人都买了同一本书，Kenny 只是多买了 <b>2 支笔</b>，多付 $4，所以 1 支笔：$4 ÷ 2 = <b>$2</b>。', en: '2 pens cost $4, so 1 pen = $2.', expr: '$4 ÷ 2 = $2' }, { zh: 'Kenny 的 4 支笔：4 × $2 = $8。书 = $12 − $8 = <b>$4</b>。', en: '$12 − 4 × $2 = $4.', expr: '$12 − (4 × $2) = $4' }],
      { zh: '这本书 ___ 元。', en: 'The cost of the book was $___.' },
      { bar: ubar([{ label: 'Kenny', n: 5, top: '$12' }, { label: 'Charlie', n: 3, bottom: '?', bottomN: 1 }]), read: { zh: '比一比两个人买的：书一样，笔差 2 支，钱差 $4。所以差的 $4 就是 2 支笔的钱。', en: 'Same book; the difference of 2 pens is $4.' }, hint: { zh: '差 2 支笔 = 差 $4 → 1 支笔 $2；书 = 12 − 4 × 2。', en: '2 pens = $4.' } }),
    W('l4-4-1-A14', '250 adults and some children went to a zoo. The admission ticket for each adult was $12 and the admission ticket for each child was $9. If $6915 was collected from the sale of all the tickets, how many children went to the zoo?', '250 个大人和一些小孩去动物园。大人票每张 12 元，小孩票每张 9 元。一共收了 6915 元，有多少个小孩去了动物园？', 435,
      [{ zh: '大人的票钱：250 × $12 = <b>$3000</b>。', en: '250 × $12 = $3000.', expr: '250 × $12 = $3000' }, { zh: '小孩的票钱：$6915 − $3000 = <b>$3915</b>。', en: '$6915 − $3000 = $3915.', expr: '$6915 − $3000 = $3915' }, { zh: '每张 $9：$3915 ÷ 9 = <b>435</b> 个小孩。', en: '$3915 ÷ 9 = 435.', expr: '$3915 ÷ $9 = 435' }],
      { zh: '有 ___ 个小孩去了动物园。', en: '___ children went to the zoo.' },
      { bar: ubar([{ label: 'adults', n: 2, first: '250 × $12' }, { label: 'children', n: 3, dashed: true, first: '$9', bottom: '?' }], { right: '$6915' }), read: { zh: '总钱数 = 大人的票钱 + 小孩的票钱。先算大人的，剩下的就是小孩的，再按每张 $9 算人数。', en: 'Total = adults + children. Find the adults\' part first.' }, hint: { zh: '6915 − 250 × 12，再 ÷ 9。', en: '(6915 − 3000) ÷ 9.' } }),
    W('l4-4-1-A15', 'Mr Stewart received a bonus. He gave $2000 to his wife and distributed a sum of money equally among his six children. He was left with $1350, which was $400 more than the amount of money given to each child. How much was his bonus?', 'Stewart 先生拿到一笔奖金。他给妻子 2000 元，又把一笔钱平均分给 6 个孩子。他自己剩下 1350 元，比每个孩子拿到的多 400 元。他的奖金是多少？', 9050,
      [{ zh: '剩下的 $1350 比每个孩子多 $400，所以每个孩子：$1350 − $400 = <b>$950</b>。', en: '$1350 − $400 = $950 each child.', expr: '$1350 − $400 = $950' }, { zh: '6 个孩子一共：6 × $950 = <b>$5700</b>。', en: '6 × $950 = $5700.', expr: '6 × $950 = $5700' }, { zh: '奖金 = 妻子的 + 孩子的 + 剩下的：$2000 + $5700 + $1350 = <b>$9050</b>。', en: '$2000 + $5700 + $1350 = $9050.', expr: '$2000 + $5700 + $1350 = $9050' }],
      { zh: '他的奖金是 ___ 元。', en: 'His bonus was $___.' },
      { bar: ubar([{ label: 'wife', n: 2, top: '$2000' }, { label: 'children', n: 6, first: '?' }, { label: 'left', n: 1, top: '$1350' }], { right: '?' }), read: { zh: '奖金分成三部分：妻子 $2000、6 个孩子、剩下 $1350。先用"多 $400"算出每个孩子拿多少。', en: 'Bonus = wife + 6 children + $1350 left. Find each child\'s share first.' }, hint: { zh: '每个孩子 = 1350 − 400；奖金 = 2000 + 6 × 950 + 1350。', en: 'Each child = 1350 − 400.' } }),
  ];

  unit(4).kps = [
    {
      id: 'l4-4-1', available: true,
      title: { zh: '两步和三步应用题', en: 'Solve up to three-step word problems' },
      intro: { zh: '先读题找已知和问题，画线段图，一步一步算：常见的有"先算一份再算几份"、"先算总数再平均分"、"先算一部分再求另一部分"。最后写答句。', en: 'Read, draw a bar model, work step by step, then write the answer sentence.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '应用题', en: 'Do these word problems. Show your working clearly' },
          example: { kind: 'l4steps', n: { en: 'A box holds 36 cupcakes. A baker packs 9 such boxes and sells 25 cupcakes. How many cupcakes are left?', zh: '一盒装 36 个纸杯蛋糕。面包师装了 9 盒，卖掉 25 个。还剩多少个？', ans: 299, bar: cells(9, 36), read: { zh: '先算 9 盒一共多少个，再减去卖掉的。', en: 'Find the total first, then subtract.' }, steps: [{ zh: '9 盒，每盒 36 个：9 × 36 = <b>324</b>。', en: '9 × 36 = 324.', expr: '9 × 36 = 324' }, { zh: '卖掉 25 个：324 − 25 = <b>299</b>。', en: '324 − 25 = 299.', expr: '324 − 25 = 299' }], sentence: { zh: '还剩 ___ 个纸杯蛋糕。', en: '___ cupcakes are left.' } }, title: { zh: '9 × 36 = 324，324 − 25 = 299', en: 'Two steps: multiply, then subtract' } },
          questions: Q },
      ],
    },
  ];
})();
