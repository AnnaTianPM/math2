/* Unit 15 时间 */
(function () {
  const U = window.MATH_DATA.units;
  const unit = num => U.find(u => u.num === num);
  const C = window.ClockUI;
  const clk = (h, m, o) => C.clockSVG({ h, m }, Object.assign({ w: 190 }, o || {}));
  const fmt = C.fmt;
  const timeField = (h, m) => ({ a: fmt(h, m), kind: 'time' });

  // B：minutes after o'clock
  const minB = [[4, 45], [6, 5], [7, 15], [2, 30], [10, 55], [5, 10], [11, 40], [9, 25], [3, 35], [1, 20]];
  // C：write the time
  const timeC = [[10, 0], [5, 15], [1, 30], [12, 0], [6, 45], [9, 20], [2, 50], [11, 35]];
  // draw minute hand / both hands
  const drawA = [[4, 15], [6, 0], [11, 30], [1, 45], [2, 10], [8, 55], [9, 5], [3, 50], [5, 35], [10, 40], [7, 20], [12, 25]];
  const drawB = [[1, 20], [10, 30], [11, 15], [3, 55], [5, 0], [9, 25], [6, 45], [7, 10], [4, 5], [12, 50], [2, 35], [8, 40]];
  // am/pm
  const ampm = [
    ['Shirley eats her breakfast at 8.00 ___.', 'Shirley 8 点吃早饭。', 'am', '🍳'],
    ['The lesson will end at 12.50 ___.', '这节课 12 点 50 分结束。', 'pm', '🏫'],
    ['Claire likes to take her dog for a walk after dinner. She usually reaches home at 9.00 ___.', 'Claire 晚饭后遛狗，通常 9 点到家。', 'pm', '🐕'],
    ['Mrs Thomas goes to the market after preparing breakfast. She leaves her house at 10.00 ___.', 'Thomas 太太做完早饭去市场，10 点出门。', 'am', '🧺'],
    ['Alan and his family enjoy watching the evening news. The news will start at 9.30 ___.', 'Alan 一家看晚间新闻，新闻 9 点半开始。', 'pm', '📺'],
    ['Nelson goes for his early morning jog at 6.30 ___.', 'Nelson 早上 6 点半去晨跑。', 'am', '🏃'],
    ['Mr Philips is having a meeting just before lunch at 11.45 ___.', 'Philips 先生午饭前 11 点 45 分开会。', 'am', '💼'],
    ['Baby Cheryl takes an afternoon nap at 4.30 ___.', '小宝宝 Cheryl 下午 4 点半睡午觉。', 'pm', '👶'],
    ['The sun rises at 7 ___.', '太阳 7 点升起。', 'am', '🌅'],
    ['George and his friends meet up for supper at 10.30 ___.', 'George 和朋友 10 点半吃宵夜。', 'pm', '🍜'],
  ];
  // time after: [start h, m, dur(min)] ; sentence "X is ___ after Y"
  const afterA = [[8, 0, 30], [4, 30, 30], [6, 30, 60], [2, 0, 30, 'half'], [11, 0, 60], [5, 30, 30, 'half'], [12, 30, 60], [10, 0, 30], [3, 30, 30, 'half'], [8, 0, 60]];
  const afterB = [[10, 0, 60, 'right'], [3, 0, 30, 'left'], [8, 30, 60, 'right'], [6, 30, 30, 'left'], [1, 0, 60, 'right']];
  const durEn = d => d === 30 ? '30 min' : '1 h';
  const durEn2 = d => d === 30 ? 'half an hour' : '1 h';
  const addT = (h, m, d) => { const t = h * 60 + m + d; return [((Math.floor(t / 60) - 1) % 12) + 1, t % 60]; };

  unit(15).kps = [
    {
      id: 'u15-1', available: true,
      title: { zh: '看钟表，读时间', en: 'Read and write the correct time' },
      intro: { zh: '短针是时针，指几点；长针是分针，指几分。分针每走一个数字是 5 分钟。时间写成 7.10 这样：点前面是几点，点后面是几分。', en: 'Short hand: hour. Long hand: minutes, 5 minutes per number. Write the time like 7.10.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '分针指着每个数字是几分钟？', en: 'Look at the clock below. Fill in each box with the correct answer' },
          example: { kind: 'clockparts', n: {}, title: { zh: '认识钟面', en: 'Parts of a clock' } },
          questions: [{ id: 'u15-1-A1', type: 'fill', pic: clk(7, 10, { w: 260, minuteLabels: false }), label: '钟面上的分钟数 + 7.10', prompt: { zh: '分针指着每个数字是几分钟？这个钟是几点？', en: 'Fill in the minutes for each number. What time is shown?' },
            text: '1 → {{n1}} min　2 → 10 min　3 → {{n3}} min\n4 → {{n4}} min　5 → 25 min　6 → {{n6}} min\n7 → {{n7}} min　8 → 40 min　9 → {{n9}} min\n10 → {{n10}} min　11 → {{n11}} min　12 → {{n12}} min\nThe time shown on the clock is {{t}} am.',
            fields: { n1: { a: 5 }, n3: { a: 15 }, n4: { a: 20 }, n6: { a: 30 }, n7: { a: 35 }, n9: { a: 45 }, n10: { a: 50 }, n11: { a: 55 }, n12: { a: 60 }, t: timeField(7, 10) },
            answerText: '5, 15, 20, 30, 35, 45, 50, 55, 60; 7.10', explain: ['clockparts', {}], hint: { zh: '每个数字加 5：5、10、15……12 是 60。时针刚过 7，分针指 2（10 分）。', en: 'Count in 5s. Hour hand past 7, minute hand at 2.' } }] },
        { id: 'B', type: 'fill', title: { zh: '几点过了几分钟？', en: 'What is the time? Write the correct minutes' },
          example: { kind: 'minutesafter', n: { h: 8, m: 20 }, title: { zh: '20 minutes after 8 o\'clock', en: '4 × 5 = 20 minutes after 8' } },
          questions: minB.map(([h, m], i) => ({ id: `u15-1-B${i + 1}`, type: 'fill', pic: clk(h, m), label: `${m} minutes after ${h} o'clock`, prompt: { zh: `${h} 点过了几分钟？`, en: 'How many minutes after the hour?' },
            text: `{{m}} minutes after ${h} o'clock`, fields: { m: { a: m } }, answerText: `${m}`, explain: ['minutesafter', { h, m }], hint: { zh: `分针指着 ${m / 5}，${m / 5} × 5 = ？`, en: `Minute hand at ${m / 5}: ${m / 5} × 5.` } })) },
        { id: 'C', type: 'fill', title: { zh: '写出时间', en: 'Write the correct time on the lines provided' },
          example: { kind: 'readclock', n: { h: 5, m: 15 }, title: { zh: '5.15 五点十五分', en: 'five fifteen' } },
          questions: timeC.map(([h, m], i) => ({ id: `u15-1-C${i + 1}`, type: 'fill', pic: clk(h, m), label: `The time is ${fmt(h, m)}`, prompt: { zh: '现在几点？写成 几点.几分（分钟写两位）', en: 'Write the time' },
            text: 'The time is {{t}}.', fields: { t: timeField(h, m) }, answerText: fmt(h, m), explain: ['readclock', { h, m }], hint: { zh: '先看短针在哪个数字后面（几点），再看长针指哪个数字乘 5（几分）。整点分钟写 00。', en: 'Short hand: hour. Long hand × 5: minutes.' } })) },
      ],
    },
    {
      id: 'u15-2', available: true,
      title: { zh: '画时针和分针', en: 'Draw hour and minute hands correctly' },
      intro: { zh: '分钟 ÷ 5 就是分针指的数字（0 分指 12）。时针在这个小时和下一个小时之间，过了 30 分就靠近下一个数字。', en: 'Minute hand: minutes ÷ 5. Hour hand: between this hour and the next.' },
      sections: [
        { id: 'A', type: 'clockset', title: { zh: '画分针（时针已画好）', en: 'Draw the minute hand on each clock' },
          example: { kind: 'drawhands', n: { h: 4, m: 15, mode: 'minute' }, title: { zh: '4.15：分针指 3', en: '4.15: minute hand at 3' } },
          questions: drawA.map(([h, m], i) => ({ id: `u15-2-A${i + 1}`, type: 'clockset', target: { h, m }, mode: 'minute', givenHour: true, label: `画分针 ${fmt(h, m)}`, caption: `<div class="center wp-en">The time is ${fmt(h, m)}.</div>` })) },
        { id: 'B', type: 'clockset', title: { zh: '画时针和分针', en: 'Read the time and draw the hour and minute hands on each clock' },
          example: { kind: 'drawhands', n: { h: 1, m: 20, mode: 'both' }, title: { zh: '1.20：分针指 4，时针在 1 和 2 之间', en: '1.20' } },
          questions: drawB.map(([h, m], i) => ({ id: `u15-2-B${i + 1}`, type: 'clockset', target: { h, m }, mode: 'both', label: `画指针 ${fmt(h, m)}`, caption: `<div class="center wp-en">The time is ${fmt(h, m)}.</div>` })) },
      ],
    },
    {
      id: 'u15-3', available: true,
      title: { zh: 'am 和 pm', en: "Use 'am' and 'pm' correctly" },
      intro: { zh: 'am 是半夜 12 点到中午 12 点前（上午）；pm 是中午 12 点到半夜（下午和晚上）。看题目里是早上的事还是下午晚上的事。', en: 'am: midnight to noon. pm: noon to midnight.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '填 am 还是 pm', en: "Fill in each blank with 'am' or 'pm'" },
          example: { kind: 'ampm', n: {}, title: { zh: '什么是 am 和 pm', en: 'am and pm' } },
          questions: ampm.map(([en, zh, a, emoji], i) => ({ id: `u15-3-A${i + 1}`, type: 'fill', pic: `<div class="wp-text"><div class="wp-en"><span style="font-size:40px;vertical-align:middle;margin-right:10px">${emoji}</span>${en.replace('___', '____')}</div><div class="wp-zh">${zh}</div></div>`, label: en, prompt: { zh: '这是上午还是下午/晚上？', en: 'am or pm?' },
            text: 'It is {{a}}.', fields: { a: { a, kind: 'choice', options: ['am', 'pm'] } }, answerText: a, explain: ['ampm', {}], hint: { zh: '找关键词：breakfast、morning、sunrise 是上午 am；lunch、afternoon、dinner、evening、night 是 pm。', en: 'Look for morning / afternoon / evening clue words.' } })) },
      ],
    },
    {
      id: 'u15-4', available: true,
      title: { zh: '过了半小时、一小时是几点', en: 'Find the time after a certain time given the duration of half hour or one hour' },
      intro: { zh: '过 1 小时：时针往前走一个数字，分针不变。过半小时（30 分）：分针走半圈，12 变 6、6 变 12。', en: '1 hour later: hour hand moves one number. 30 minutes later: minute hand goes half way round.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '看两个钟，填时间', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'timeafter', n: { h: 8, m: 0, dur: 30 }, title: { zh: '8.30 是 8.00 过了 30 分钟', en: '8.30 is 30 min after 8.00' } },
          questions: afterA.map(([h, m, d, half], i) => { const [h2, m2] = addT(h, m, d);
            return { id: `u15-4-A${i + 1}`, type: 'fill', pic: C.two(clk(h, m, { w: 170 }), clk(h2, m2, { w: 170 }), `+ ${durEn(d)}`), label: `${fmt(h2, m2)} is ${durEn(d)} after ${fmt(h, m)}`, prompt: { zh: '左边是开始的时间，右边是之后的时间。填一填。', en: 'Fill in the times' },
              text: `{{b}} is ${half ? durEn2(d) : durEn(d)} after {{a}}.`, fields: { b: timeField(h2, m2), a: timeField(h, m) }, answerText: `${fmt(h2, m2)} is ${durEn(d)} after ${fmt(h, m)}`, explain: ['timeafter', { h, m, dur: d }],
              hint: { zh: '先读左边的钟，再读右边的钟。分钟是 0 写 00，30 写 30。', en: 'Read the left clock, then the right clock.' } }; }) },
        { id: 'B', type: 'clockset', title: { zh: '画出时间，再填一填', en: 'Draw the correct time on each clock. Fill in each blank' },
          example: { kind: 'timeafter', n: { h: 10, m: 0, dur: 60 }, title: { zh: '11.00 是 10.00 过了 1 小时', en: '11.00 is 1 h after 10.00' } },
          questions: afterB.map(([h, m, d, blank], i) => { const [h2, m2] = addT(h, m, d); const target = blank === 'right' ? { h: h2, m: m2 } : { h, m }; const given = blank === 'right' ? { h, m } : { h: h2, m: m2 };
            return { id: `u15-4-B${i + 1}`, type: 'clockset', target, mode: 'both', label: `${fmt(h2, m2)} is ${durEn(d)} after ${fmt(h, m)}（画 ${fmt(target.h, target.m)}）`,
              prompt: { zh: `${blank === 'right' ? '左边' : '右边'}的钟是 ${fmt(given.h, given.m)}。在空钟上画出${blank === 'right' ? `过了 ${d === 30 ? '30 分钟' : '1 小时'}之后` : `${d === 30 ? '30 分钟' : '1 小时'}之前`}的时间，再填空。`, en: `Draw the time on the empty clock, then fill in the blanks.` },
              caption: `<div class="fig-row">${blank === 'right' ? clk(h, m, { w: 150 }) + '<b style="font-size:22px;color:#7a7a8c">+ ' + durEn(d) + ' →</b><span class="sub">画右边 ↓</span>' : '<span class="sub">画左边 ↓</span><b style="font-size:22px;color:#7a7a8c">+ ' + durEn(d) + ' →</b>' + clk(h2, m2, { w: 150 })}</div>`,
              text: `{{b}} is ${d === 30 && i === 3 ? 'half an hour' : durEn(d)} after {{a}}.`, fields: { b: timeField(h2, m2), a: timeField(h, m) }, explain: ['timeafter', { h, m, dur: d }],
              hint: { zh: blank === 'right' ? `从 ${fmt(h, m)} 往后 ${d === 30 ? '30 分钟：分针走半圈' : '1 小时：时针走一个数字'}。` : `右边是 ${fmt(h2, m2)}，往回退 ${d === 30 ? '30 分钟' : '1 小时'} 就是左边的时间。`, en: 'Move the hands forward or back.' } }; }) },
      ],
    },
  ];
})();
