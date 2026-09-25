/* Unit 16 象形图 */
(function () {
  const U = window.MATH_DATA.units;
  const unit = num => U.find(u => u.num === num);
  const G = window.PG;
  const pic = (spec, o) => `<div class="center">${G.graph(spec, o)}</div>`;
  const choice = (a, options) => ({ a, kind: 'choice', options });
  const t = (spec, L) => spec.cats.find(c => c.label === L).n * spec.scale;

  /* ---- 图表数据（与书一致） ---- */
  const zoo = { title: 'Animals in the zoo', cats: [['Monkey', 6], ['Lion', 2], ['Giraffe', 4], ['Zebra', 3], ['Snake', 3]].map(([label, n]) => ({ label, n })), sym: '⭐', scale: 4, unit: 'animals' };
  const milk = { title: 'Number of packets of milk sold in a week', cats: [['Monday', 3], ['Tuesday', 5], ['Wednesday', 8], ['Thursday', 7], ['Friday', 4]].map(([label, n]) => ({ label, n })), sym: '🥛', scale: 10, unit: 'packets of milk', vertical: true };
  const books = { title: 'Number of books sold in a bookstore', cats: [['Comic', 4], ['Fairytale', 6], ['Fiction', 3], ['Colouring', 7]].map(([label, n]) => ({ label, n })), sym: '📕', scale: 4, unit: 'books' };
  const cinema = { title: 'Number of people at the cinema', cats: [['Monday', 2], ['Tuesday', 3], ['Wednesday', 5], ['Thursday', 5], ['Friday', 7], ['Saturday', 9], ['Sunday', 10]].map(([label, n]) => ({ label, n })), sym: '🔺', scale: 5, unit: 'people' };
  const ice = { title: 'Favourite ice cream flavours', cats: [['butter pecan', 3], ['chocolate', 5], ['coffee', 1], ['cookies & cream', 2], ['strawberry', 4], ['vanilla', 6]].map(([label, n]) => ({ label, n })), sym: '🙂', scale: 2, unit: 'students' };
  const days5 = milk.cats.map(c => c.label), days7 = cinema.cats.map(c => c.label);

  const fq = (id, spec, text, fields, explain, zh, en, o) => ({ id, type: 'fill', pic: pic(spec, o), label: text.replace(/\{\{\w+\}\}/g, '___'), prompt: { zh, en: en || 'Fill in the blank' }, text, fields, answerText: Object.values(fields).map(f => f.a).join(', '), explain, hint: { zh: '先看每个符号代表几个，再数一数那一行有几个符号，用 乘法 算出数量。', en: 'Count the symbols, then multiply by the scale.' } });

  unit(16).kps = [
    {
      id: 'u16-1', available: true,
      title: { zh: '看懂象形图', en: 'Read and understand picture graphs with scales' },
      intro: { zh: '象形图用一个个小图案表示数量。要先看图下面的说明：每个图案代表几个。数一数有几个图案，再乘以每个代表的数量。', en: 'A picture graph uses symbols. Check the scale: each symbol stands for a number. Count the symbols, then multiply.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '动物园里的动物', en: 'Tom and Michael went to the zoo and saw these animals. They drew a picture graph to show the number of each animal' },
          example: { kind: 'pgcount', n: { spec: zoo, cat: 'Zebra', sentence: 'They saw __ zebras.' }, title: { zh: '他们看到了几只斑马？', en: 'How many zebras?' } },
          questions: [
            fq('u16-1-A1', zoo, 'They saw {{a}} giraffes.', { a: { a: 16 } }, ['pgcount', { spec: zoo, cat: 'Giraffe' }], '他们看到了几只长颈鹿？'),
            fq('u16-1-A2', zoo, 'They saw {{a}} monkeys.', { a: { a: 24 } }, ['pgcount', { spec: zoo, cat: 'Monkey' }], '他们看到了几只猴子？'),
            fq('u16-1-A3', zoo, 'They saw {{a}} more giraffes than lions.', { a: { a: 8 } }, ['pgdiff', { spec: zoo, a: 'Giraffe', b: 'Lion', word: 'more' }], '长颈鹿比狮子多几只？'),
            fq('u16-1-A4', zoo, 'They saw {{a}} fewer snakes than monkeys.', { a: { a: 12 } }, ['pgdiff', { spec: zoo, a: 'Snake', b: 'Monkey', word: 'fewer' }], '蛇比猴子少几条？'),
            fq('u16-1-A5', zoo, 'They saw the most number of {{a}}.', { a: choice('monkeys', ['monkeys', 'lions', 'giraffes', 'zebras', 'snakes']) }, ['pgmost', { spec: zoo, which: 'most' }], '哪种动物最多？', 'Which animal did they see the most?'),
            fq('u16-1-A6', zoo, 'They saw the least number of {{a}}.', { a: choice('lions', ['monkeys', 'lions', 'giraffes', 'zebras', 'snakes']) }, ['pgmost', { spec: zoo, which: 'least' }], '哪种动物最少？', 'Which animal did they see the least?'),
          ] },
        { id: 'B', type: 'fill', title: { zh: '一周卖出的牛奶', en: 'Study the picture graph carefully. Fill in each blank with the correct answer' },
          example: { kind: 'pgscale', n: { spec: { title: 'Number of apples eaten', cats: [{ label: 'Ali', n: 2 }, { label: 'Ben', n: 4 }, { label: 'Cara', n: 3 }], sym: '🍎', scale: 5, unit: 'apples', vertical: true }, cat: 'Ben', total: 20 }, title: { zh: '图上没写每个代表几个，怎么办？', en: 'Finding the scale: Ben ate 20 apples' } },
          questions: [
            fq('u16-1-B1', milk, 'The most number of packets of milk were sold on {{a}}.', { a: choice('Wednesday', days5) }, ['pgmost', { spec: milk, which: 'most' }], '哪一天卖出的牛奶最多？', 'On which day were the most packets sold?', { scaleText: '?' }),
            fq('u16-1-B2', milk, '50 packets of milk were sold on Tuesday.\nEach 🥛 stands for {{a}} packets of milk.', { a: { a: 10 } }, ['pgscale', { spec: milk, cat: 'Tuesday', total: 50 }], '星期二卖了 50 盒。每个 🥛 代表几盒？', '50 packets were sold on Tuesday. Each symbol stands for how many packets?', { scaleText: '?' }),
            fq('u16-1-B3', milk, '{{a}} packets of milk were sold on Friday.', { a: { a: 40 } }, ['pgcount', { spec: milk, cat: 'Friday' }], '星期五卖了几盒牛奶？（每个 🥛 代表 10 盒）'),
            fq('u16-1-B4', milk, 'There were {{a}} more packets of milk sold on Thursday than on Friday.', { a: { a: 30 } }, ['pgdiff', { spec: milk, a: 'Thursday', b: 'Friday', word: 'more' }], '星期四比星期五多卖几盒？'),
            fq('u16-1-B5', milk, 'There were {{a}} fewer packets of milk sold on Monday than on Friday.', { a: { a: 10 } }, ['pgdiff', { spec: milk, a: 'Monday', b: 'Friday', word: 'fewer' }], '星期一比星期五少卖几盒？'),
            fq('u16-1-B6', milk, '{{a}} packets of milk were sold on Tuesday and Thursday.', { a: { a: 120 } }, ['pgsum', { spec: milk, cats: ['Tuesday', 'Thursday'] }], '星期二和星期四一共卖了几盒？'),
          ] },
        { id: 'C', type: 'fill', title: { zh: '书店卖出的书', en: 'Study the picture graph below. Fill in each blank with the correct answer' },
          example: { kind: 'pgcount', n: { spec: books, cat: 'Fairytale', sentence: '__ Fairytale books were sold.' }, title: { zh: '卖出了几本童话书？', en: 'How many Fairytale books were sold?' } },
          questions: [
            fq('u16-1-C1', books, '{{a}} books were the most popular.', { a: choice('Colouring', ['Comic', 'Fairytale', 'Fiction', 'Colouring']) }, ['pgmost', { spec: books, which: 'most' }], '哪种书最受欢迎（卖得最多）？', 'Which books were the most popular?'),
            fq('u16-1-C2', books, '{{a}} books were the least popular.', { a: choice('Fiction', ['Comic', 'Fairytale', 'Fiction', 'Colouring']) }, ['pgmost', { spec: books, which: 'least' }], '哪种书最不受欢迎（卖得最少）？', 'Which books were the least popular?'),
            fq('u16-1-C3', books, '4 fewer Fairytale books were sold than {{a}} books.', { a: choice('Colouring', ['Comic', 'Fairytale', 'Fiction', 'Colouring']) }, ['pgplus', { spec: books, cat: 'Fairytale', add: 4 }], '童话书比哪种书少卖了 4 本？', 'Fairytale books sold 4 fewer than which books?'),
            fq('u16-1-C4', books, '{{a}} more Comic books were sold than Fiction books.', { a: { a: 4 } }, ['pgdiff', { spec: books, a: 'Comic', b: 'Fiction', word: 'more' }], '漫画书比小说多卖几本？'),
            fq('u16-1-C5', books, '{{a}} fewer Comic books were sold than Colouring books.', { a: { a: 12 } }, ['pgdiff', { spec: books, a: 'Comic', b: 'Colouring', word: 'fewer' }], '漫画书比涂色书少卖几本？'),
          ] },
        { id: 'D', type: 'fill', title: { zh: '电影院的人数', en: 'Study the picture graph below. Fill in each blank with the correct answer' },
          example: { kind: 'pgcount', n: { spec: cinema, cat: 'Monday', sentence: '__ people went to the cinema on Monday.' }, title: { zh: '星期一有多少人去电影院？', en: 'How many people on Monday?' } },
          questions: [
            fq('u16-1-D1', cinema, '{{a}} people went to the cinema for a movie on Wednesday.', { a: { a: 25 } }, ['pgcount', { spec: cinema, cat: 'Wednesday' }], '星期三有多少人去看电影？'),
            fq('u16-1-D2', cinema, '{{a}} more people went to the cinema for a movie on Friday than on Tuesday.', { a: { a: 20 } }, ['pgdiff', { spec: cinema, a: 'Friday', b: 'Tuesday', word: 'more' }], '星期五比星期二多多少人？'),
            fq('u16-1-D3', cinema, '2 children went to the cinema on Monday. There were {{a}} adults at the cinema on Monday.', { a: { a: 8 } }, ['pgpart', { spec: cinema, cat: 'Monday', given: 2, givenLabel: 'children（小孩）', askLabel: 'adults（大人）' }], '星期一有 2 个小孩去电影院，那么有几个大人？'),
            fq('u16-1-D4', cinema, '{{a}} people went to the cinema for a movie over the weekend.', { a: { a: 95 } }, ['pgsum', { spec: cinema, cats: ['Saturday', 'Sunday'] }], '周末（星期六和星期日）一共有多少人去看电影？'),
            fq('u16-1-D5', cinema, '16 adults went to the cinema on Thursday. There were {{a}} children at the cinema on Thursday.', { a: { a: 9 } }, ['pgpart', { spec: cinema, cat: 'Thursday', given: 16, givenLabel: 'adults（大人）', askLabel: 'children（小孩）' }], '星期四有 16 个大人去电影院，那么有几个小孩？'),
          ] },
        { id: 'E', type: 'fill', title: { zh: '最喜欢的冰淇淋口味', en: 'A class of students are asked to name their favourite ice cream flavours. Their teacher draws a graph to show the number of students who like each flavour' },
          example: { kind: 'pgcount', n: { spec: ice, cat: 'chocolate', sentence: '__ students like chocolate.' }, title: { zh: '几个学生喜欢巧克力味？', en: 'How many students like chocolate?' } },
          questions: [
            fq('u16-1-E1', ice, '{{a}} students like butter pecan.', { a: { a: 6 } }, ['pgcount', { spec: ice, cat: 'butter pecan' }], '几个学生喜欢奶油山核桃味（butter pecan）？'),
            fq('u16-1-E2', ice, '{{a}} students like strawberry.', { a: { a: 8 } }, ['pgcount', { spec: ice, cat: 'strawberry' }], '几个学生喜欢草莓味？'),
            fq('u16-1-E3', ice, '{{a}} more students like chocolate than cookies & cream.', { a: { a: 6 } }, ['pgdiff', { spec: ice, a: 'chocolate', b: 'cookies & cream', word: 'more' }], '喜欢巧克力的比喜欢曲奇奶油的多几个？'),
            fq('u16-1-E4', ice, 'The most popular ice cream flavour is {{a}}.', { a: choice('vanilla', ice.cats.map(c => c.label)) }, ['pgmost', { spec: ice, which: 'most' }], '最受欢迎的口味是哪个？', 'Which flavour is the most popular?'),
            fq('u16-1-E5', ice, 'The least popular ice cream flavour is {{a}}.', { a: choice('coffee', ice.cats.map(c => c.label)) }, ['pgmost', { spec: ice, which: 'least' }], '最不受欢迎的口味是哪个？', 'Which flavour is the least popular?'),
            fq('u16-1-E6', ice, 'There are {{a}} students in the class altogether.', { a: { a: 42 } }, ['pgsum', { spec: ice, cats: ice.cats.map(c => c.label) }], '班里一共有多少学生？'),
          ] },
      ],
    },
    {
      id: 'u16-2', available: true,
      title: { zh: '自己画象形图', en: 'Create picture graphs with scales' },
      intro: { zh: '先数一数每一种有多少个，再看每个图案代表几个，用 除法 算出要画几个图案，最后在每一列画出来。', en: 'Count each kind, divide by the scale, then draw that many symbols in each column.' },
      sections: [
        { id: 'A', type: 'pgmake', title: { zh: '同学们养的宠物', en: "Below is a chart showing the animals that Carl's schoolmates keep as pets. Help Carl to complete the picture graph below" },
          example: { kind: 'pgmake', n: { items: [{ label: 'Car', icon: '🚗', n: 4 }, { label: 'Bear', icon: '🧸', n: 6 }, { label: 'Ball', icon: '⚽', n: 2 }], scale: 2, sym: '⭐', unit: 'toys' }, title: { zh: '玩具有几个，每个 ⭐ 代表 2 个', en: 'Each ⭐ stands for 2 toys' } },
          questions: [{ id: 'u16-2-A1', type: 'pgmake', label: 'Pets：Rabbit 3, Terrapin 5, Fish 10, Cat 4, Bird 7', items: [{ label: 'Rabbit', icon: '🐰', n: 6 }, { label: 'Terrapin', icon: '🐢', n: 10 }, { label: 'Fish', icon: '🐟', n: 20 }, { label: 'Cat', icon: '🐱', n: 8 }, { label: 'Bird', icon: '🐦', n: 14 }], scale: 2, sym: '⭐', unit: 'pets', prompt: { zh: '上面是同学们养的宠物。数一数每种有几只，帮 Carl 画出下面的象形图（每个 ⭐ 代表 2 只）。', en: 'Help Carl to complete the picture graph below. Each ⭐ stands for 2 pets.' } }] },
        { id: 'B', type: 'pgmake', title: { zh: 'Mason 先生卖的水果', en: "Below is a table that shows the fruit sold at Mr Mason's stall. Help Mr Mason to complete the picture graph below" },
          example: { kind: 'pgmake', n: { items: [{ label: 'Egg', icon: '🥚', n: 9 }, { label: 'Bread', icon: '🍞', n: 3 }, { label: 'Cake', icon: '🧁', n: 6 }], scale: 3, sym: '⭕', unit: 'items' }, title: { zh: '每个 ⭕ 代表 3 个', en: 'Each ⭕ stands for 3 items' } },
          questions: [{ id: 'u16-2-B1', type: 'pgmake', label: 'Fruit：Apple 5, Mango 3, Orange 6, Papaya 2, Pear 4, Watermelon 1', items: [{ label: 'Apple', icon: '🍎', n: 15 }, { label: 'Mango', icon: '🥭', n: 9 }, { label: 'Orange', icon: '🍊', n: 18 }, { label: 'Papaya', icon: G.PAPAYA, n: 6 }, { label: 'Pear', icon: '🍐', n: 12 }, { label: 'Watermelon', icon: '🍉', n: 3 }], scale: 3, sym: '⭕', unit: 'fruit', prompt: { zh: '上面是 Mason 先生卖出的水果。数一数每种有几个，帮他画出象形图（每个 ⭕ 代表 3 个）。', en: 'Help Mr Mason to complete the picture graph. Each ⭕ stands for 3 fruit.' } }] },
        { id: 'C', type: 'pgmake', title: { zh: '停车场里的车', en: 'Below are the vehicles at a car park. Complete the picture graph below' },
          example: { kind: 'pgmake', n: { items: [{ label: 'Bike', icon: '🚲', n: 3 }, { label: 'Boat', icon: '⛵', n: 2 }, { label: 'Plane', icon: '✈️', n: 4 }], scale: 1, sym: G.RECT, rows: [[2, 0, 1, 2], [0, 2, 1, 0, 2]], unit: 'vehicles' }, title: { zh: '每个方块代表 1 辆，有几辆就画几个', en: 'Each box stands for 1 vehicle' } },
          questions: [{ id: 'u16-2-C1', type: 'pgmake', label: 'Vehicles：Car 10, Van 4, Truck 3, Bus 2, Motorcycle 6', items: [{ label: 'Car', icon: '🚗', n: 10 }, { label: 'Van', icon: '🚐', n: 4 }, { label: 'Truck', icon: '🚚', n: 3 }, { label: 'Bus', icon: '🚌', n: 2 }, { label: 'Motorcycle', icon: '🏍️', n: 6 }], scale: 1, sym: G.RECT, rows: [[4, 4, 4, 4, 4, 4, 0, 0, 0], [3, 3, 2, 2, 2, 1, 1, 1, 1], [0, 0, 0, 0, 0, 0, 0]], unit: 'vehicles', prompt: { zh: '上面是停车场里的车。数一数每种有几辆，画出象形图（每个方块代表 1 辆）。', en: 'Complete the picture graph. Each box stands for 1 vehicle.' } }] },
      ],
    },
  ];
})();
