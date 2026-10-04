/* Level 1 · Unit 13  象形图 */
(function () {
  const U = window.MATH_DATA.levels[1].units;
  const unit = num => U.find(u => u.num === num);
  const L = window.L1, G = L.pgraph, RECT = window.PG.RECT, PAPAYA = window.PG.PAPAYA;
  const pic = (spec, o) => `<div class="center">${G(spec, o)}</div>`;
  const im = name => `<img src="img/l1u13/${name}.png" alt="">`;
  const num = a => ({ a });
  const ch = (a, options) => ({ a, kind: 'choice', options });
  /* 图表：cats = [label, icon, n, word(填空选项用的词)] */
  const mk = (title, cats, o) => Object.assign({ title, cats: cats.map(([label, icon, n, word]) => ({ label, icon, n, word: word || label })) }, o || {});
  const words = spec => spec.cats.map(c => c.word);
  const labelOf = (spec, word) => spec.cats.find(c => c.word === word).label;
  const cnt = (spec, L) => spec.cats.find(c => c.label === L).n;
  // 题目：text 用 {{a}} 数字 / {{p}} {{q}} 选项；explain 自动根据 kind 生成
  const Q = (id, spec, text, fields, explain, zh, en, o) => Object.assign({ id, type: 'fill', pic: pic(spec), label: text.replace(/\{\{\w+\}\}/g, '___'), prompt: { zh, en: en || 'Fill in the blank' }, text, fields, answerText: Object.values(fields).map(f => f.a).join(', '), explain, hint: { zh: '每个符号代表 1 个，一个一个数。', en: 'Each symbol stands for 1. Count.' } }, o || {});
  // 常用题
  const count = (id, spec, L, text, zh) => Q(id, spec, text, { a: num(cnt(spec, L)) }, ['l1pgcount', { spec, cat: L }], zh || `${L} 有几个？`, 'How many?');
  const diff = (id, spec, a, b, text, word, zh) => Q(id, spec, text, { a: num(Math.abs(cnt(spec, a) - cnt(spec, b))) }, ['l1pgdiff', { spec, a, b, word }], zh || `${a} 比 ${b} ${word === 'fewer' ? '少' : '多'}几个？`, word === 'fewer' ? 'How many fewer?' : 'How many more?');
  const most = (id, spec, which, text, zh) => { const win = spec.cats.slice().sort((x, y) => which === 'most' ? y.n - x.n : x.n - y.n)[0]; return Q(id, spec, text, { p: ch(win.word, words(spec)) }, ['l1pgmost', { spec, which }], zh || (which === 'most' ? '哪一种最多？' : '哪一种最少？'), which === 'most' ? 'Which is the greatest?' : 'Which is the smallest?'); };
  const same = (id, spec, text, zh) => { let pr; for (let i = 0; i < spec.cats.length && !pr; i++) for (let j = i + 1; j < spec.cats.length; j++) if (spec.cats[i].n === spec.cats[j].n) { pr = [spec.cats[i].word, spec.cats[j].word]; break; } return Q(id, spec, text, { p: ch(pr[0], words(spec)), q: ch(pr[1], words(spec)) }, ['l1pgsame', { spec }], zh || '哪两种一样多？', 'Which two are the same?', { accept: [{ p: pr[0], q: pr[1] }, { p: pr[1], q: pr[0] }] }); };
  const find = (id, spec, a, b, k, word, text, zh, extraAccept) => Q(id, spec, text, { p: ch(spec.cats.find(c => c.label === a).word, words(spec)), q: ch(spec.cats.find(c => c.label === b).word, words(spec)) }, ['l1pgfind', { spec, k, word, a, b }], zh || `哪一种比哪一种${word === 'fewer' ? '少' : '多'} ${k} 个？`, `${k} ${word} ___ than ___`, extraAccept ? { accept: extraAccept } : undefined);
  const sum = (id, spec, text, zh) => Q(id, spec, text, { a: num(spec.cats.reduce((s, c) => s + c.n, 0)) }, ['l1pgsum', { spec }], zh || '一共有多少？', 'How many altogether?');
  const types = (id, spec, text, zh) => Q(id, spec, text, { a: num(spec.cats.length) }, ['l1pgtypes', { spec }], zh || '有几种？', 'How many types?');
  const pair = (id, spec, a, b, total, text, zh) => Q(id, spec, text, { p: ch(spec.cats.find(c => c.label === a).word, words(spec)), q: ch(spec.cats.find(c => c.label === b).word, words(spec)) }, ['l1pgpair', { spec, total, a, b }], zh || `哪两种加起来是 ${total}？`, `Which two make ${total}?`, { accept: [{ p: spec.cats.find(c => c.label === a).word, q: spec.cats.find(c => c.label === b).word }, { p: spec.cats.find(c => c.label === b).word, q: spec.cats.find(c => c.label === a).word }] });

  /* ---------- KP1 读图（每类自己的图标） ---------- */
  const snacks = mk('Snacks Prepared by Mrs Lee', [['Cupcake', '🧁', 5, 'cupcakes'], ['Curry Puff', '🥟', 3, 'curry puffs'], ['Sandwich', '🥪', 4, 'sandwiches'], ['Spring Roll', '🌯', 2, 'spring rolls']], { vertical: true });
  const sports = mk('Favourite Sports of Students', [['Basketball', '🧒', 7, 'basketball'], ['Swimming', '🧒', 6, 'swimming'], ['Football', '🧒', 10, 'football'], ['Badminton', '🧒', 6, 'badminton'], ['Cycling', '🧒', 4, 'cycling']]);
  const insects = mk('Insects in a School Garden', [['Butterfly', '🦋', 4, 'butterflies'], ['Bee', '🐝', 5, 'bees'], ['Ant', '🐜', 7, 'ants'], ['Ladybird', '🐞', 2, 'ladybirds']], { vertical: true });
  const fruit = mk("Fruit Sold at Mr Tan's Stall", [['Apple', '🍎', 8, 'apples'], ['Orange', '🍊', 10, 'oranges'], ['Pear', '🍐', 5, 'pears'], ['Mango', '🥭', 5, 'mangoes'], ['Papaya', PAPAYA, 3, 'papayas']]);
  const toys = mk("Toys in David's Room", [['Toy Car', '🚗', 8, 'toy cars'], ['Toy Robot', '🤖', 4, 'toy robots'], ['Toy Soldier', '💂', 13, 'toy soldiers'], ['Toy Dog', '🐕', 10, 'toy dogs']], { vertical: true, wide: true });
  const stat = mk('Stationery Items Valerie Buys', [['Eraser', im('st1'), 6, 'erasers'], ['Pen', im('st2'), 9, 'pens'], ['Pencil', im('st3'), 11, 'pencils'], ['Ruler', im('st4'), 6, 'rulers'], ['Sharpener', im('st5'), 5, 'sharpeners']]);
  const vehicles = mk('Vehicles at a Car Park', [['Car', '🚗', 12, 'cars'], ['Lorry', '🚚', 3, 'lorries'], ['Motorcycle', '🏍️', 9, 'motorcycles'], ['Van', '🚐', 5, 'vans']], { vertical: true, wide: true });
  const crock = mk('Crockery in a Kitchen Sink', [['Bowl', '🥣', 3, 'bowls'], ['Cup', '☕', 10, 'cups'], ['Fork', '🍴', 4, 'forks'], ['Plate', '🍽️', 8, 'plates'], ['Spoon', '🥄', 4, 'spoons']]);
  const exSpec = mk('Game Cards Collection', [['Alan', '🃏', 5, 'Alan'], ['Bala', '🃏', 8, 'Bala'], ['Caleb', '🃏', 4, 'Caleb'], ['Dave', '🃏', 9, 'Dave']]);

  const kp1 = [
    { id: 'A', spec: snacks, title: { zh: 'Lee 太太准备的点心', en: 'This graph shows some snacks Mrs Lee prepares for her children' }, qs: s => [
      count('l1-13-1-A1', s, 'Cupcake', '{{a}} cupcakes are prepared.'), count('l1-13-1-A2', s, 'Curry Puff', '{{a}} curry puffs are prepared.'), count('l1-13-1-A3', s, 'Sandwich', '{{a}} sandwiches are prepared.'), count('l1-13-1-A4', s, 'Spring Roll', '{{a}} spring rolls are prepared.'),
      diff('l1-13-1-A5', s, 'Cupcake', 'Spring Roll', '{{a}} more cupcakes than spring rolls are prepared.', 'more'), diff('l1-13-1-A6', s, 'Curry Puff', 'Sandwich', '{{a}} fewer curry puff than sandwiches is prepared.', 'fewer'),
      most('l1-13-1-A7', s, 'most', 'The number of {{p}} is the greatest.'), most('l1-13-1-A8', s, 'least', 'The number of {{p}} is the smallest.'), sum('l1-13-1-A9', s, 'Mrs Lee prepares {{a}} pieces of snacks altogether.')] },
    { id: 'B', spec: sports, title: { zh: '同学们最喜欢的运动', en: 'This graph shows the favourite sports of the students in a class' }, qs: s => [
      count('l1-13-1-B1', s, 'Basketball', '{{a}} students like basketball.'), count('l1-13-1-B2', s, 'Football', '{{a}} students like football.'), count('l1-13-1-B3', s, 'Cycling', '{{a}} students like cycling.'),
      diff('l1-13-1-B4', s, 'Basketball', 'Swimming', '{{a}} more student likes basketball than swimming.', 'more'), diff('l1-13-1-B5', s, 'Cycling', 'Badminton', '{{a}} fewer students like cycling than badminton.', 'fewer'),
      most('l1-13-1-B6', s, 'most', 'The number of students who like {{p}} is the greatest.'), most('l1-13-1-B7', s, 'least', 'The number of students who like {{p}} is the smallest.'), same('l1-13-1-B8', s, 'The number of students who like {{p}} and {{q}} is the same.'), sum('l1-13-1-B9', s, 'There are {{a}} students in the class altogether.')] },
    { id: 'C', spec: insects, title: { zh: '校园里的昆虫', en: 'This graph shows the insects in a school garden' }, qs: s => [
      count('l1-13-1-C1', s, 'Butterfly', 'There are {{a}} butterflies.'), count('l1-13-1-C2', s, 'Bee', 'There are {{a}} bees.'), count('l1-13-1-C3', s, 'Ant', 'There are {{a}} ants.'), count('l1-13-1-C4', s, 'Ladybird', 'There are {{a}} ladybirds.'),
      diff('l1-13-1-C5', s, 'Butterfly', 'Ant', 'There are {{a}} fewer butterflies than ants.', 'fewer'), diff('l1-13-1-C6', s, 'Bee', 'Ladybird', 'There are {{a}} more bees than ladybirds.', 'more'),
      most('l1-13-1-C7', s, 'least', 'The garden has the smallest number of {{p}}.'), most('l1-13-1-C8', s, 'most', 'The garden has the greatest number of {{p}}.'), sum('l1-13-1-C9', s, 'There are {{a}} insects altogether.')] },
    { id: 'D', spec: fruit, title: { zh: 'Tan 先生卖的水果', en: 'This graph shows the fruit Mr Tan sells at his stall' }, qs: s => [
      count('l1-13-1-D1', s, 'Apple', '{{a}} apples are sold.'), count('l1-13-1-D2', s, 'Orange', '{{a}} oranges are sold.'), count('l1-13-1-D3', s, 'Papaya', '{{a}} papayas are sold.'),
      diff('l1-13-1-D4', s, 'Pear', 'Apple', '{{a}} fewer pears than apples are sold.', 'fewer'), diff('l1-13-1-D5', s, 'Mango', 'Papaya', '{{a}} more mangoes than papayas are sold.', 'more'),
      most('l1-13-1-D6', s, 'least', 'The number of {{p}} is the smallest.'), most('l1-13-1-D7', s, 'most', 'The number of {{p}} is the greatest.'), same('l1-13-1-D8', s, 'There is a same number of {{p}} and {{q}}.'), sum('l1-13-1-D9', s, 'Mr Tan sells {{a}} fruit altogether.')] },
    { id: 'E', spec: toys, title: { zh: 'David 房间里的玩具', en: "This graph shows the toys in David's room" }, qs: s => [
      count('l1-13-1-E1', s, 'Toy Car', 'There are {{a}} toy cars.'), count('l1-13-1-E2', s, 'Toy Robot', 'There are {{a}} toy robots.'), count('l1-13-1-E3', s, 'Toy Soldier', 'There are {{a}} toy soldiers.'), count('l1-13-1-E4', s, 'Toy Dog', 'There are {{a}} toy dogs.'),
      find('l1-13-1-E5', s, 'Toy Soldier', 'Toy Car', 5, 'more', 'There are 5 more {{p}} than {{q}}.'), find('l1-13-1-E6', s, 'Toy Robot', 'Toy Dog', 6, 'fewer', 'There are 6 fewer {{p}} than {{q}}.'),
      most('l1-13-1-E7', s, 'most', 'The number of {{p}} is the greatest.'), most('l1-13-1-E8', s, 'least', 'The number of {{p}} is the smallest.'), sum('l1-13-1-E9', s, 'David has {{a}} toys altogether.')] },
    { id: 'F', spec: stat, title: { zh: 'Valerie 买的文具', en: 'This graph shows the stationery items Valerie buys from a bookstore' }, qs: s => [
      count('l1-13-1-F1', s, 'Pen', 'There are {{a}} pens.'), count('l1-13-1-F2', s, 'Pencil', 'There are {{a}} pencils.'), count('l1-13-1-F3', s, 'Sharpener', 'There are {{a}} sharpeners.'),
      find('l1-13-1-F4', s, 'Pen', 'Pencil', 2, 'fewer', 'There are 2 fewer {{p}} than {{q}}.'), find('l1-13-1-F5', s, 'Pencil', 'Sharpener', 6, 'more', 'There are 6 more {{p}} than {{q}}.'),
      most('l1-13-1-F6', s, 'least', 'The number of {{p}} is the smallest.'), most('l1-13-1-F7', s, 'most', 'The number of {{p}} is the greatest.'), same('l1-13-1-F8', s, 'There is a same number of {{p}} and {{q}}.'), sum('l1-13-1-F9', s, 'Valerie buys {{a}} stationery items altogether.')] },
    { id: 'G', spec: vehicles, title: { zh: '停车场里的车', en: 'This graph shows the vehicles at a car park' }, qs: s => [
      count('l1-13-1-G1', s, 'Car', 'There are {{a}} cars.'), count('l1-13-1-G2', s, 'Lorry', 'There are {{a}} lorries.'), count('l1-13-1-G3', s, 'Motorcycle', 'There are {{a}} motorcycles.'), count('l1-13-1-G4', s, 'Van', 'There are {{a}} vans.'),
      find('l1-13-1-G5', s, 'Car', 'Van', 7, 'more', 'There are 7 more {{p}} than {{q}}.'), find('l1-13-1-G6', s, 'Lorry', 'Motorcycle', 6, 'fewer', 'There are 6 fewer {{p}} than {{q}}.'),
      most('l1-13-1-G7', s, 'most', 'The number of {{p}} is the greatest.'), most('l1-13-1-G8', s, 'least', 'The number of {{p}} is the smallest.'), sum('l1-13-1-G9', s, 'There are {{a}} vehicles altogether.')] },
    { id: 'H', spec: crock, title: { zh: '水槽里的餐具', en: 'This graph shows the crockery in a kitchen sink' }, qs: s => [
      count('l1-13-1-H1', s, 'Bowl', 'There are {{a}} bowls.'), count('l1-13-1-H2', s, 'Cup', 'There are {{a}} cups.'), count('l1-13-1-H3', s, 'Plate', 'There are {{a}} plates.'),
      find('l1-13-1-H4', s, 'Fork', 'Plate', 4, 'fewer', 'There are 4 fewer {{p}} than {{q}}.', null, [{ p: 'forks', q: 'plates' }, { p: 'spoons', q: 'plates' }]), find('l1-13-1-H5', s, 'Cup', 'Bowl', 7, 'more', 'There are 7 more {{p}} than {{q}}.'),
      most('l1-13-1-H6', s, 'least', 'The number of {{p}} is the smallest.'), most('l1-13-1-H7', s, 'most', 'The number of {{p}} is the greatest.'), same('l1-13-1-H8', s, 'There is a same number of {{p}} and {{q}}.'), sum('l1-13-1-H9', s, 'There are {{a}} pieces of crockery in the kitchen sink.')] },
  ];

  /* ---------- KP2 画图 ---------- */
  const mkv = (title, sym, cats, o) => Object.assign({ title, sym, cats: cats.map(([label, icon, n, fixed]) => Object.assign({ label, icon, n }, fixed !== undefined ? { fixed } : {})) }, o || {});
  const zoo = mkv('Animals at the Zoo', '⚪', [['Parrot', '🦜', 2, 2], ['Lion', '🦁', 3], ['Tiger', '🐯', 2], ['Giraffe', '🦒', 5], ['Monkey', '🐵', 7]], { unit: 'animal', unitZh: '只' });
  const play = mkv('Games at the Playground', '⭐', [['Hopscotch', '🔲', 4], ['Soccer', '⚽', 9], ['Chapteh', '🪶', 2], ['Five Stones', '🔺', 5]], { vertical: true, unit: 'child', unitZh: '个小朋友' });
  const park = mkv('Activities at the Park', '🔺', [['Soccer', '⚽', 7], ['Kite-flying', '🪁', 4], ['Feeding', '🦆', 2], ['Walking', '🚶', 5]], { unit: 'child', unitZh: '个小朋友' });
  const pet = mkv('Animals in a Pet Shop', '❤️', [['Canary', '🐦', 5], ['Dog', '🐕', 4], ['Guinea Pig', '🐹', 7], ['Rabbit', '🐰', 4], ['Terrapin', '🐢', 10]], { vertical: true, unit: 'animal', unitZh: '只' });
  const veg = mkv('Vegetables Madam Neo Sells', '🔶', [['Brinjal', '🍆', 4], ['Cabbage', '🥬', 3], ['Carrot', '🥕', 6], ['Cucumber', '🥒', 7], ['Potato', '🥔', 9]], { unit: 'vegetable', unitZh: '个' });
  const exMake = mkv('Fruit in a Basket', '⚪', [['Apple', '🍎', 3], ['Banana', '🍌', 2], ['Grapes', '🍇', 1]], { unit: 'fruit', unitZh: '个' });
  const makeQ = (id, p, spec, zh, en) => ({ id, type: 'l1pgmake', pic: 'l1u13/' + p, spec, label: spec.cats.map(c => `${c.label} ${c.n}`).join(', '), prompt: { zh, en } });

  /* ---------- KP3 解读（统一符号） ---------- */
  const nat = mk("Natasha's Picks", [['🙂', '🙂', 6, '🙂'], ['🌸', '🌸', 9, '🌸'], ['🤍', '🤍', 7, '🤍'], ['⭐', '⭐', 8, '⭐']], { sym: RECT, vertical: true, unit: 'pick', unitZh: '次' });
  const toss = mk("Nathaniel's Tosses", [['➕', '➕', 10, '➕'], ['➖', '➖', 7, '➖']], { sym: '⚪', unit: 'toss', unitZh: '次' });
  const reb = mk("Rebecca's Picks", [['A', '', 8, 'A'], ['B', '', 4, 'B'], ['C', '', 5, 'C'], ['D', '', 7, 'D'], ['E', '', 5, 'E']], { sym: RECT, vertical: true, unit: 'pick', unitZh: '次' });
  const die = mk("Ricardo's Tosses", [['<span class="dice">⚀</span> 1', '', 4, '1'], ['<span class="dice">⚁</span> 2', '', 6, '2'], ['<span class="dice">⚂</span> 3', '', 9, '3'], ['<span class="dice">⚃</span> 4', '', 7, '4'], ['<span class="dice">⚄</span> 5', '', 8, '5'], ['<span class="dice">⚅</span> 6', '', 6, '6']], { sym: '🔷', unit: 'toss', unitZh: '次' });
  const laundry = mk("Items in Mrs Wilson's Laundry Basket", [['Handkerchief', '🧣', 5, 'handkerchiefs'], ['Scarf', '🧶', 2, 'scarfs'], ['Shirt', '👕', 4, 'shirts'], ['Shorts', '🩳', 4, 'shorts'], ['Socks', '🧦', 8, 'socks']], { sym: RECT, vertical: true, unit: 'item', unitZh: '件' });
  const hobby = mk('Hobbies of Children', [['Cooking', '🍲', 7, 'cooking'], ['Gardening', '🪴', 3, 'gardening'], ['Model Making', '🏠', 4, 'model making'], ['Reading', '📕', 12, 'reading'], ['Stamp Collecting', '📮', 9, 'stamp collecting']], { sym: '🙂', unit: 'child', unitZh: '个小朋友' });
  const pastry = mk('Pastries Mr Goodman Sells', [['Cheesecake', '🍰', 3, 'cheesecakes'], ['Croissant', '🥐', 8, 'croissants'], ['Doughnut', '🍩', 9, 'doughnuts'], ['Muffin', '🧁', 4, 'muffins'], ['Sandwich', '🥪', 6, 'sandwiches'], ['Swiss Roll', '🍥', 6, 'swiss rolls']], { sym: '🔺', vertical: true, unit: 'piece', unitZh: '个' });
  const paint = mk('Paintings Alfred the Artist Composes', [['Monday', '', 5, 'Monday'], ['Tuesday', '', 4, 'Tuesday'], ['Wednesday', '', 2, 'Wednesday'], ['Thursday', '', 3, 'Thursday'], ['Friday', '', 5, 'Friday'], ['Saturday', '', 6, 'Saturday'], ['Sunday', '', 7, 'Sunday']], { sym: RECT, unit: 'painting', unitZh: '幅' });

  const kp3 = [
    { id: 'A', spec: nat, title: { zh: 'Natasha 抽卡片', en: 'Natasha has 4 picture cards. She closes her eyes, picks 1 picture card and puts it back, many times. This graph shows the picture cards she picks' }, qs: s => [
      count('l1-13-3-A1', s, '🙂', '🙂 is picked {{a}} times.'), count('l1-13-3-A2', s, '🌸', '🌸 is picked {{a}} times.'), count('l1-13-3-A3', s, '🤍', '🤍 is picked {{a}} times.'), count('l1-13-3-A4', s, '⭐', '⭐ is picked {{a}} times.'),
      diff('l1-13-3-A5', s, '🌸', '🙂', '🌸 is picked {{a}} more times than 🙂.', 'more'), diff('l1-13-3-A6', s, '🤍', '⭐', '🤍 is picked {{a}} fewer times than ⭐.', 'fewer'),
      most('l1-13-3-A7', s, 'most', '{{p}} is picked the most times.'), most('l1-13-3-A8', s, 'least', '{{p}} is picked the least times.'), sum('l1-13-3-A9', s, 'Natasha makes {{a}} picks altogether.')] },
    { id: 'B', spec: toss, title: { zh: 'Nathaniel 抛筹码', en: 'Nathaniel has a counter with sides ➕ and ➖. He tosses the counter many times. This graph shows the sides Nathaniel gets' }, qs: s => [
      count('l1-13-3-B1', s, '➕', 'Nathaniel gets ➕ {{a}} times.'), count('l1-13-3-B2', s, '➖', 'He gets ➖ {{a}} times.'), diff('l1-13-3-B3', s, '➕', '➖', 'He gets ➕ {{a}} more times than ➖.', 'more'), sum('l1-13-3-B4', s, 'Nathaniel tosses the counter {{a}} times altogether.')] },
    { id: 'C', spec: reb, title: { zh: 'Rebecca 抽字母卡', en: 'Rebecca has 5 letter cards A, B, C, D and E. She closes her eyes, picks 1 letter card and puts it back, many times. This graph shows the alphabet cards she picks' }, qs: s => [
      count('l1-13-3-C1', s, 'A', 'A is picked {{a}} times.'), count('l1-13-3-C2', s, 'B', 'B is picked {{a}} times.'), count('l1-13-3-C3', s, 'D', 'D is picked {{a}} times.'),
      same('l1-13-3-C4', s, '{{p}} is picked as many times as {{q}}.'), most('l1-13-3-C5', s, 'least', '{{p}} is picked the least number of times.'), most('l1-13-3-C6', s, 'most', '{{p}} is picked the most number of times.'),
      find('l1-13-3-C7', s, 'B', 'A', 4, 'fewer', '{{p}} is picked 4 fewer times than {{q}}.'), pair('l1-13-3-C8', s, 'C', 'E', 10, '{{p}} and {{q}} are picked 10 times in total.'), sum('l1-13-3-C9', s, 'Rebecca makes {{a}} picks altogether.')] },
    { id: 'D', spec: die, title: { zh: 'Ricardo 掷骰子', en: 'Ricardo has a die with sides 1 to 6. He tosses the die many times. This graph shows the sides Ricardo gets' }, qs: s => [
      count('l1-13-3-D1', s, '<span class="dice">⚀</span> 1', 'Ricardo gets ⚀ 1 {{a}} times.'), count('l1-13-3-D2', s, '<span class="dice">⚃</span> 4', 'He gets ⚃ 4 {{a}} times.'), find('l1-13-3-D3', s, '<span class="dice">⚄</span> 5', '<span class="dice">⚀</span> 1', 4, 'more', 'He gets {{p}} 4 more times than {{q}}.'),
      most('l1-13-3-D4', s, 'most', 'He gets {{p}} the most number of times.'), most('l1-13-3-D5', s, 'least', 'He gets {{p}} the least number of times.'), same('l1-13-3-D6', s, 'He gets {{p}} as many times as {{q}}.'),
      pair('l1-13-3-D7', s, '<span class="dice">⚀</span> 1', '<span class="dice">⚃</span> 4', 11, 'He gets {{p}} and {{q}} 11 times in total.'), pair('l1-13-3-D8', s, '<span class="dice">⚂</span> 3', '<span class="dice">⚄</span> 5', 17, 'He gets {{p}} and {{q}} 17 times in total.'), sum('l1-13-3-D9', s, 'Ricardo tosses the die {{a}} times altogether.')] },
    { id: 'E', spec: laundry, title: { zh: 'Wilson 太太的洗衣篮', en: "This graph shows the items in Mrs Wilson's laundry basket" }, qs: s => [
      types('l1-13-3-E1', s, 'There are {{a}} types of laundry.'), count('l1-13-3-E2', s, 'Handkerchief', 'There are {{a}} handkerchiefs.'), find('l1-13-3-E3', s, 'Socks', 'Scarf', 6, 'more', 'There are 6 more {{p}} than {{q}}.'),
      find('l1-13-3-E4', s, 'Shirt', 'Handkerchief', 1, 'fewer', 'There is 1 fewer {{p}} than {{q}}.', null, [{ p: 'shirts', q: 'handkerchiefs' }, { p: 'shorts', q: 'handkerchiefs' }]), same('l1-13-3-E5', s, 'There are as many {{p}} as {{q}}.'),
      most('l1-13-3-E6', s, 'most', 'The laundry basket has the most number of {{p}}.'), most('l1-13-3-E7', s, 'least', 'The laundry basket has the least number of {{p}}.'),
      Q('l1-13-3-E8', s, 'If 3 more {{p}} are added to the laundry basket, its number will be the same as the number of handkerchiefs.', { p: ch('scarfs', words(s)) }, ['l1pgplus', { spec: s, add: 3, target: 'Handkerchief', ans: 'Scarf' }], '再加 3 个就和手帕一样多的是哪种？', 'Which one?'),
      sum('l1-13-3-E9', s, "There are {{a}} items in Mrs Wilson's laundry basket altogether.")] },
    { id: 'F', spec: hobby, title: { zh: '小朋友的爱好', en: 'This graph shows the hobbies of a group of children' }, qs: s => [
      count('l1-13-3-F1', s, 'Cooking', '{{a}} children like cooking.'), count('l1-13-3-F2', s, 'Model Making', '{{a}} children like model making.'), count('l1-13-3-F3', s, 'Stamp Collecting', '{{a}} children like stamp collecting.'),
      diff('l1-13-3-F4', s, 'Stamp Collecting', 'Reading', '{{a}} fewer children like stamp collecting than reading.', 'fewer'), diff('l1-13-3-F5', s, 'Model Making', 'Gardening', '{{a}} more child likes model making than gardening.', 'more'),
      most('l1-13-3-F6', s, 'least', 'The least popular hobby is {{p}}.'), most('l1-13-3-F7', s, 'most', 'The most popular hobby is {{p}}.'),
      Q('l1-13-3-F8', s, 'If 2 children switch from {{p}} to {{q}}, the two hobbies will be equally popular.', { p: ch('cooking', words(s)), q: ch('gardening', words(s)) }, ['l1pgswitch', { spec: s, k: 2, from: 'Cooking', to: 'Gardening' }], '2 个小朋友从哪组换到哪组，两组就一样多？', 'Which two?'),
      sum('l1-13-3-F9', s, 'There are {{a}} children altogether.')] },
    { id: 'G', spec: pastry, title: { zh: 'Goodman 先生卖的点心', en: 'This graph shows the pastries Mr Goodman sells in his bakery' }, qs: s => [
      types('l1-13-3-G1', s, 'There are {{a}} types of pastries.'), count('l1-13-3-G2', s, 'Croissant', 'There are {{a}} croissants.'), count('l1-13-3-G3', s, 'Muffin', 'There are {{a}} muffins.'),
      find('l1-13-3-G4', s, 'Doughnut', 'Cheesecake', 6, 'more', 'There are 6 more {{p}} than {{q}}.'), find('l1-13-3-G5', s, 'Muffin', 'Croissant', 4, 'fewer', 'There are 4 fewer {{p}} than {{q}}.'), same('l1-13-3-G6', s, 'There are as many {{p}} as {{q}}.'),
      most('l1-13-3-G7', s, 'most', 'Mr Goodman sells the most number of {{p}}.'), most('l1-13-3-G8', s, 'least', 'He sells the least number of {{p}}.'), sum('l1-13-3-G9', s, 'Mr Goodman sells {{a}} pieces of pastries altogether.')] },
    { id: 'H', spec: paint, title: { zh: 'Alfred 一周画的画', en: 'This graph shows the number of paintings Alfred the artist composes in a week' }, qs: s => [
      count('l1-13-3-H1', s, 'Tuesday', 'Alfred composes {{a}} paintings on Tuesday.'), count('l1-13-3-H2', s, 'Thursday', 'He composes {{a}} paintings on Thursday.'), count('l1-13-3-H3', s, 'Saturday', 'He composes {{a}} paintings on Saturday.'),
      diff('l1-13-3-H4', s, 'Wednesday', 'Monday', 'He composes {{a}} fewer paintings on Wednesday than on Monday.', 'fewer'), diff('l1-13-3-H5', s, 'Sunday', 'Friday', 'He composes {{a}} more paintings on Sunday than on Friday.', 'more'),
      same('l1-13-3-H6', s, 'He composes as many paintings on {{p}} as on {{q}}.'), most('l1-13-3-H7', s, 'least', 'He composes the least number of paintings on {{p}}.'), most('l1-13-3-H8', s, 'most', 'He composes the most number of paintings on {{p}}.'), sum('l1-13-3-H9', s, 'Alfred composes {{a}} paintings altogether.')] },
  ];

  const section = g => ({ id: g.id, type: 'fill', title: g.title, example: g.ex || { kind: 'l1pgcount', n: { spec: g.spec, cat: g.spec.cats[0].label }, title: { zh: `${g.spec.cats[0].label} 有几个？`, en: `How many ${g.spec.cats[0].word}?` } }, questions: g.qs(g.spec) });

  unit(13).kps = [
    {
      id: 'l1-13-1', available: true,
      title: { zh: '看懂象形图', en: 'Understand and read data from simple picture graphs' },
      intro: { zh: '象形图用一个个小图案表示数量，每个图案代表 1 个。数一数有几个图案，就知道有多少；比一比哪一行长，就知道谁多谁少。', en: 'A picture graph uses pictures to show numbers. Each picture stands for 1. Count the pictures.' },
      sections: kp1.map(g => section(g)).map((s, i) => i === 0 ? Object.assign(s, { example: { kind: 'l1pgdiff', n: { spec: exSpec, a: 'Bala', b: 'Alan', word: 'more' }, title: { zh: 'Bala 比 Alan 多几张游戏卡？', en: 'Bala has __ more game cards than Alan.' } } }) : s),
    },
    {
      id: 'l1-13-2', available: true,
      title: { zh: '画象形图', en: 'Create picture graphs based on the given data' },
      intro: { zh: '看图数一数每一种有几个，有几个就画几个符号。一种一种数，别数重了。', en: 'Count each kind in the picture, then draw one symbol for each.' },
      sections: [
        { id: 'A', type: 'l1pgmake', title: { zh: '动物园里的动物', en: 'Sally went to the zoo last Sunday. Draw a picture graph to show the animals she saw. Use ⚪ to represent 1 animal' },
          example: { kind: 'l1pgmake', n: { spec: exMake, rows: [[0, 1, 0, 2], [0, 1]] }, title: { zh: '数一数篮子里的水果，画成象形图', en: 'Count and draw' } },
          questions: [makeQ('l1-13-2-A1', 'zoo', zoo, '数一数 Sally 看到的每种动物有几只，填进表里（鹦鹉已经填好 2 只）', 'Draw a picture graph to show the animals she saw at the zoo.')] },
        { id: 'B', type: 'l1pgmake', title: { zh: '操场上的游戏', en: 'Jeremy is at the playground. Draw a picture graph to show the games the children are playing. Use ⭐ to represent 1 child' },
          example: { kind: 'l1pgmake', n: { spec: exMake, rows: [[0, 1, 0, 2], [0, 1]] }, title: { zh: '数一数篮子里的水果，画成象形图', en: 'Count and draw' } },
          questions: [makeQ('l1-13-2-B1', 'play', play, '数一数玩每种游戏的小朋友有几个（跳房子、踢足球、踢毽子、抓石子）', 'Draw a picture graph to show the games the children are playing.')] },
        { id: 'C', type: 'l1pgmake', title: { zh: '公园里的活动', en: 'The picture shows a group of children at the park. Draw a picture graph to show the activities the children are doing. Use 🔺 to represent 1 child' },
          example: { kind: 'l1pgmake', n: { spec: exMake, rows: [[0, 1, 0, 2], [0, 1]] }, title: { zh: '数一数篮子里的水果，画成象形图', en: 'Count and draw' } },
          questions: [makeQ('l1-13-2-C1', 'park', park, '数一数做每种活动的小朋友有几个（踢足球、放风筝、喂鸭子、散步）', 'Draw a picture graph to show the activities the children are doing.')] },
        { id: 'D', type: 'l1pgmake', title: { zh: '宠物店里的动物', en: 'Kevin goes to the pet shop. Draw a picture graph to show the animals in the pet shop. Use ❤️ to represent 1 animal' },
          example: { kind: 'l1pgmake', n: { spec: exMake, rows: [[0, 1, 0, 2], [0, 1]] }, title: { zh: '数一数篮子里的水果，画成象形图', en: 'Count and draw' } },
          questions: [makeQ('l1-13-2-D1', 'pet', pet, '数一数宠物店里每种动物有几只（金丝雀、狗、豚鼠、兔子、龟）', 'Draw a picture graph to show the animals in the pet shop.')] },
        { id: 'E', type: 'l1pgmake', title: { zh: 'Neo 太太卖的蔬菜', en: 'The picture shows the vegetables Madam Neo sells at the market. Draw a picture graph of the vegetables Madam Neo sells. Use 🔶 to represent 1 vegetable' },
          example: { kind: 'l1pgmake', n: { spec: exMake, rows: [[0, 1, 0, 2], [0, 1]] }, title: { zh: '数一数篮子里的水果，画成象形图', en: 'Count and draw' } },
          questions: [makeQ('l1-13-2-E1', 'veg', veg, '数一数每种蔬菜有几个（茄子、卷心菜、胡萝卜、黄瓜、土豆）', 'Draw a picture graph of the vegetables Madam Neo sells.')] },
      ],
    },
    {
      id: 'l1-13-3', available: true,
      title: { zh: '解读象形图', en: 'Understand and interpret data from picture graphs' },
      intro: { zh: '这些图用同一种符号表示数量，每个符号代表 1 次或 1 个。先看清每行/每列是什么，再数符号。', en: 'Each symbol stands for 1. Read the labels, then count the symbols.' },
      sections: kp3.map(g => section(g)),
    },
  ];
})();
