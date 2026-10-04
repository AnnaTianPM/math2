/* Level 1 · Unit 16  时间 */
(function () {
  const U = window.MATH_DATA.levels[1].units;
  const unit = num => U.find(u => u.num === num);
  const C = window.ClockUI, say = window.L1.sayTime;
  const clock = (h, m, w) => `<div class="center">${C.clockSVG({ h, m }, { w: w || 200 })}</div>`;
  const opts = (h, m) => { const o = [say(h, m), say(h, m === 0 ? 30 : 0), say(h % 12 + 1, m), say(h === 1 ? 12 : h - 1, m === 0 ? 30 : 0)]; return [...new Set(o)]; };
  const T = (id, h, m, text, zh, extra) => ({ id, type: 'fill', pic: (extra || '') + clock(h, m), label: `${say(h, m)}`, prompt: { zh, en: 'Read the time on the clock.' }, text, fields: { t: { a: say(h, m), kind: 'choice', options: opts(h, m) } }, answerText: say(h, m), explain: ['l1clock', { h, m }], hint: { zh: m === 0 ? '长针指 12 是整点（o\'clock），看短针指着几。' : '长针指 6 是半点（half past），看短针刚过几。', en: m === 0 ? 'Minute hand at 12: o\'clock.' : 'Minute hand at 6: half past.' } });
  const matchQ = (id, times, labels) => ({ id, type: 'match', label: times.map(([h, m]) => say(h, m)).join(', '), left: times.map(([h, m], i) => ({ id: 'c' + i, html: C.clockSVG({ h, m }, { w: 96 }), text: `钟 ${i + 1}` })), right: labels.map(l => ({ id: l, html: l, text: l })), pairs: Object.fromEntries(times.map(([h, m], i) => ['c' + i, say(h, m)])), prompt: { zh: '每个钟配上正确的时间', en: 'Match each clock to the correct time.' }, explain: ['l1clockmatch', { times }], hint: { zh: '先看长针是 12 还是 6，再看短针。', en: 'Minute hand first, then hour hand.' } });

  const hourA = [8, 12, 7, 1, 4, 9];
  const hourB = [[2, 0], [11, 0], [5, 0], [3, 0], [6, 0], [9, 0]];
  const halfA = [3, 11, 1, 5, 2, 7];
  const halfB = [[8, 30], [4, 30], [10, 30], [7, 30], [12, 30], [9, 30]];
  const daily = [
    ['Zoe has her breakfast at {{t}} in the morning.', 'Zoe 早上几点吃早饭？', 8, 0, '🍳'],
    ['John and his family have their dinner at {{t}} in the evening.', 'John 一家晚上几点吃晚饭？', 7, 30, '🍽️'],
    ['Samantha takes her dog for a walk at {{t}} in the evening.', 'Samantha 傍晚几点遛狗？', 5, 0, '🐕'],
    ['Jeremy has to feed his fish at {{t}} every evening.', 'Jeremy 每天傍晚几点喂鱼？', 6, 0, '🐟'],
    ['Tina goes to bed at {{t}} every night.', 'Tina 每天晚上几点睡觉？', 10, 30, '🛏️'],
    ['Sam walks to school at {{t}} every morning.', 'Sam 每天早上几点走路去学校？', 11, 30, '🎒'],
    ['Uncle Chan delivers fresh fish to the wet market at {{t}} in the morning.', 'Chan 叔叔早上几点送鱼到菜市场？', 4, 30, '🐠'],
    ['Father has lunch with his colleagues at {{t}} in the afternoon.', '爸爸下午几点和同事吃午饭？', 1, 0, '🍜'],
    ['Mother arrives at her office for work at {{t}} in the morning.', '妈妈早上几点到办公室？', 9, 0, '🏢'],
    ['Grandmother goes to the park to exercise at {{t}} in the morning.', '奶奶早上几点去公园锻炼？', 6, 30, '🌳'],
    ['Bobby does his homework at {{t}} in the afternoon.', 'Bobby 下午几点做作业？', 3, 30, '📝'],
    ['The school soccer match starts at {{t}} in the morning.', '学校足球赛早上几点开始？', 11, 0, '⚽'],
  ];

  unit(16).kps = [
    {
      id: 'l1-16-1', available: true,
      title: { zh: '整点', en: 'Read time to the hour' },
      intro: { zh: '长针（分针）指着 12，就是整点，英文说 o\'clock。短针（时针）指着几，就是几点。', en: 'When the long minute hand points to 12, we say "o\'clock". The short hour hand tells the hour.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '读出时间', en: 'Read the time on each clock' },
          example: { kind: 'l1clock', n: { h: 10, m: 0 }, title: { zh: '长针指 12，短针指 10：10 o\'clock', en: '10 o\'clock' } },
          questions: hourA.map((h, i) => T(`l1-16-1-A${i + 1}`, h, 0, 'The time is {{t}}.', '现在几点？')) },
        { id: 'B', type: 'match', title: { zh: '钟配时间', en: 'Match each clock to the correct time' },
          example: { kind: 'l1clockmatch', n: { times: [[10, 0], [4, 0]] }, title: { zh: '先看长针，再看短针', en: 'Minute hand, then hour hand' } },
          questions: [matchQ('l1-16-1-B1', hourB, ["5 o'clock", "9 o'clock", "2 o'clock", "6 o'clock", "11 o'clock", "3 o'clock"])] },
      ],
    },
    {
      id: 'l1-16-2', available: true,
      title: { zh: '半点', en: 'Read time to the half hour' },
      intro: { zh: '长针指着 6，就是半点，英文说 half past。短针在两个数字中间，刚过的那个数就是几点半。', en: 'When the minute hand points to 6, we say "half past". The hour hand is between two numbers: it is half past the smaller one.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '读出时间', en: 'Read the time on each clock' },
          example: { kind: 'l1clock', n: { h: 6, m: 30 }, title: { zh: '长针指 6，短针在 6 和 7 之间：half past 6', en: 'half past 6' } },
          questions: halfA.map((h, i) => T(`l1-16-2-A${i + 1}`, h, 30, 'The time is {{t}}.', '现在几点？')) },
        { id: 'B', type: 'match', title: { zh: '钟配时间', en: 'Match each clock to the correct time' },
          example: { kind: 'l1clockmatch', n: { times: [[6, 30], [1, 30]] }, title: { zh: '长针指 6 是 half past', en: 'half past' } },
          questions: [matchQ('l1-16-2-B1', halfB, ['half past 7', 'half past 4', 'half past 9', 'half past 8', 'half past 12', 'half past 10'])] },
      ],
    },
    {
      id: 'l1-16-3', available: true,
      title: { zh: '生活中的时间', en: 'Read time in everyday life' },
      intro: { zh: '看图里的钟，读出时间，填进句子里。morning 早上、afternoon 下午、evening 傍晚、night 晚上。', en: 'Look at the clock in each picture and read the time.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '看钟填时间', en: 'Look at the clock in each picture. Fill in each blank with the correct answer' },
          example: { kind: 'l1clock', n: { h: 7, m: 0 }, title: { zh: 'Lily 早上 7 o\'clock 起床', en: 'Lily wakes up at 7 o\'clock' } },
          questions: daily.map(([text, zh, h, m, icon], i) => T(`l1-16-3-A${i + 1}`, h, m, text, zh, `<div class="center scene-ico">${icon}</div>`)) },
      ],
    },
  ];
})();
