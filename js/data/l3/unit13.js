/* Level 3 · Unit 13  时间 */
(function () {
  const U = window.MATH_DATA.levels[3].units;
  const unit = num => U.find(u => u.num === num);
  const L = window.L3, C = window.ClockUI;
  const num = a => ({ a });
  const choice = (a, options) => ({ a, kind: 'choice', options });
  const pad = m => String(m).padStart(2, '0'), fmt = (h, m) => `${h}.${pad(m)}`;
  const tm = (h, m) => ({ a: fmt(h, m), kind: 'time' });
  const F = (id, p, text, fields, explain, zh, en, o) => Object.assign({ id, type: 'fill', pic: p, label: text.replace(/\{\{\w+\}\}/g, '___').replace(/\n/g, ' '), prompt: { zh, en: en || 'Fill in the blanks' }, text, fields, answerText: Object.values(fields).map(f => f.a).join(', '), explain }, o || {});
  const wp = (en, zh) => `<div class="wp-text"><div class="wp-en">${en}</div><div class="wp-zh">${zh}</div></div>`;
  const phrase = (h, m) => m <= 30 ? `${m} minutes past ${h}` : `${60 - m} minutes to ${h % 12 + 1}`;
  const phraseOpts = (h, m) => { const nh = h % 12 + 1; const o = [phrase(h, m), m <= 30 ? `${m} minutes to ${nh}` : `${60 - m} minutes past ${h}`, m <= 30 ? `${60 - m} minutes to ${nh}` : `${m} minutes past ${h}`, `${m} minutes past ${nh}`]; return [...new Set(o)].slice(0, 4); };
  // 时间字符串 → 字段（time + am/pm）
  const tf = str => { const [hm, ap] = str.split(' '); const [h, m] = hm.split('.').map(Number); return { t: tm(h, m), ap: choice(ap, ['am', 'pm']) }; };

  const clocksA = [[4, 25], [5, 50], [10, 15], [3, 5], [6, 55], [9, 30], [7, 40], [2, 10], [10, 45], [4, 35]];
  const B = [['{{t}} is 11 minutes past 1.', { t: tm(1, 11) }, ['l3pastto', { form: 'past', h: 1, m: 11 }]], ['{{t}} is 29 minutes past 6.', { t: tm(6, 29) }, ['l3pastto', { form: 'past', h: 6, m: 29 }]], ['12.25 is {{a}} minutes past 12.', { a: num(25) }, ['l3clockpt', { h: 12, m: 25 }]], ['8.19 is {{a}} minutes past 8.', { a: num(19) }, ['l3clockpt', { h: 8, m: 19 }]], ['4.10 is 10 minutes past {{a}}.', { a: num(4) }, ['l3clockpt', { h: 4, m: 10 }]], ['7.06 is 6 minutes past {{a}}.', { a: num(7) }, ['l3clockpt', { h: 7, m: 6 }]], ['{{t}} is 9 minutes to 12.', { t: tm(11, 51) }, ['l3pastto', { form: 'to', h: 12, m: 9 }]], ['{{t}} is 16 minutes to 3.', { t: tm(2, 44) }, ['l3pastto', { form: 'to', h: 3, m: 16 }]], ['3.55 is {{a}} minutes to 4.', { a: num(5) }, ['l3clockpt', { h: 3, m: 55 }]], ['10.38 is {{a}} minutes to 11.', { a: num(22) }, ['l3clockpt', { h: 10, m: 38 }]], ['5.48 is 12 minutes to {{a}}.', { a: num(6) }, ['l3clockpt', { h: 5, m: 48 }]], ['9.50 is 10 minutes to {{a}}.', { a: num(10) }, ['l3clockpt', { h: 9, m: 50 }]]];
  const toMinA = [[1, 20], [4, 5], [8, 15], [6, 30], [2, 55], [7, 25], [10, 10], [5, 50], [3, 25], [9, 45]];
  const toHB = [420, 300, 600, 240, 540];
  const toHMC = [515, 455, 190, 430, 150, 305, 560, 280, 385, 655];
  const dur = [['2.30 pm', '4.45 pm'], ['10.25 am', '1.40 pm'], ['11.40 am', '3.35 pm'], ['7.10 pm', '10.55 pm'], ['11.30 am', '7.30 pm'], ['1.15 pm', '5.57 pm'], ['3.31 pm', '5.25 pm'], ['12.52 am', '6.18 am'], ['4.46 pm', '11.39 pm'], ['9.44 am', '6.22 pm']];
  const afterA = [[3, 0, '5.00 pm'], [5, 0, '7.00 pm'], [0, 30, '11.30 am'], [0, 49, '8.00 am'], [4, 0, '2.25 pm'], [2, 0, '6.02 am'], [6, 0, '12.56 pm'], [0, 25, '9.35 am'], [0, 11, '10.51 pm'], [0, 40, '1.08 am']];
  const beforeB = [[7, 0, '1.00 pm'], [4, 0, '9.00 am'], [0, 50, '12.30 pm'], [0, 8, '7.00 am'], [5, 0, '11.15 am'], [6, 0, '10.46 pm'], [3, 0, '2.08 pm'], [0, 20, '8.55 am'], [0, 45, '3.44 pm'], [0, 57, '6.12 am']];
  const hmTxt = (h, m) => `${h ? h + (h > 1 ? ' hours' : ' hour') : ''}${h && m ? ' ' : ''}${m ? m + ' minutes' : ''}`;
  const durOf = (a, b) => { const d = (L.toMin(b) - L.toMin(a) + 1440) % 1440; return [Math.floor(d / 60), d % 60]; };

  const words = [
    F('l3-13-5-A1', wp('Susie and her friends watched a play. The play started at 5.30 pm and it lasted 1 h 20 min. What time did the play end?', '演出 5.30 pm 开始，持续 1 h 20 min。几点结束？'), 'The play ended at {{t}} {{ap}}.', tf('6.50 pm'), ['l3tword', { en: 'Play started 5.30 pm, lasted 1 h 20 min.', zh: '5.30 pm 开始，1 h 20 min。', lines: [{ zh: '结束时间 = 开始时间往后数 1 h 20 min：5.30 pm + 1 h = 6.30 pm，再 + 20 min = <b>6.50 pm</b>。', tl: ['5.30 pm', '6.50 pm'], calc: '5.30 pm → 6.30 pm → 6.50 pm' }] }], '开始时间往后数 1 h 20 min', 'What time did it end?', { label: '6.50 pm', hint: { zh: '先加 1 小时，再加 20 分钟。', en: 'Add 1 h, then 20 min.' } }),
    F('l3-13-5-A2', wp("John reached his friend's house at 10.15 am. He stayed there until 2.55 pm. How long did he stay at his friend's house?", 'John 10.15 am 到朋友家，待到 2.55 pm。待了多久？'), "He stayed at his friend's house for {{h}} h {{m}} min.", { h: num(4), m: num(40) }, ['l3dur', { a: '10.15 am', b: '2.55 pm' }], '从 10.15 am 到 2.55 pm 画时间线数', 'How long?', { label: '4 h 40 min', hint: { zh: '一小时一小时数到 2.15 pm，再数分钟。', en: 'Count on in hours, then minutes.' } }),
    F('l3-13-5-A3', wp('Melissa is meeting her friends for dinner at 7 pm. The journey to the restaurant takes 55 minutes. At what time must she leave her house if she wants to reach the restaurant on time?', 'Melissa 7 pm 和朋友吃晚饭，路上要 55 分钟。几点出门？'), 'She must leave her house at {{t}} {{ap}}.', tf('6.05 pm'), ['l3after', { start: '7.00 pm', h: 0, m: 55, dir: 'before' }], '从 7 pm 往前数 55 分钟', 'When must she leave?', { label: '6.05 pm', hint: { zh: '7.00 pm 往前 55 min。', en: '55 min before 7.00 pm.' } }),
    F('l3-13-5-A4', wp('Mr Matthew is a part-time lecturer. He is paid $125 an hour. He teaches 3 h on Monday, 2 h on Tuesday, 3 h on Wednesday, 4 h on Thursday, 2 h on Friday and 5 h on Saturday. How much does Mr Matthew earn in a week?', 'Matthew 先生每小时 $125。周一 3 h、周二 2 h、周三 3 h、周四 4 h、周五 2 h、周六 5 h。一周挣多少？'), 'Mr Matthew earns $ {{a}} in a week.', { a: num(2375) }, ['l3tword', { en: 'Paid $125 an hour. 3 + 2 + 3 + 4 + 2 + 5 hours.', zh: '每小时 $125。', lines: [{ zh: '先算一周几小时：3 + 2 + 3 + 4 + 2 + 5 = <b>19 h</b>。', calc: '3 + 2 + 3 + 4 + 2 + 5 = 19' }, { zh: '再乘每小时的钱：19 × $125 = <b>$2375</b>。', calc: '19 × $125 = $2375' }] }], '先算一周几小时，再乘 $125', 'How much in a week?', { label: '$2375', hint: { zh: '把六天的小时加起来，再 × 125。', en: 'Add the hours, then × 125.' } }),
    F('l3-13-5-A5', wp('Aunt Grace works at a factory. She is paid $9 per hour. She works 8 hours every day. (a) If she works from Monday to Saturday, find the total number of hours she works in a week. (b) How much does she earn in a week?', 'Grace 阿姨每小时 $9，每天工作 8 小时。(a) 周一到周六一周工作几小时？(b) 一周挣多少？'), '(a) She works {{a}} h in a week.\n(b) She earns $ {{b}} in a week.', { a: num(48), b: num(432) }, ['l3tword', { en: '$9 per hour, 8 hours a day, Monday to Saturday.', zh: '每小时 $9，每天 8 h，周一到周六。', lines: [{ zh: '周一到周六是 6 天：8 × 6 = <b>48 h</b>。', calc: '8 × 6 = 48 h' }, { zh: '48 × $9 = <b>$432</b>。', calc: '48 × $9 = $432' }] }], '6 天 × 8 h，再 × $9', 'Two parts', { label: '48 h, $432', hint: { zh: '周一到周六是 6 天。', en: 'Monday to Saturday is 6 days.' } }),
    F('l3-13-5-A6', wp('Dave is a part-time proofreader. He needs 2 hours to proofread a book. He is paid $15 an hour. (a) How many hours does he need to proofread a series of six books? (b) Find the total amount of money he will be paid for proofreading the six books.', 'Dave 校对一本书要 2 小时，每小时 $15。(a) 六本书要几小时？(b) 一共挣多少？'), '(a) He needs {{a}} h.\n(b) He will be paid $ {{b}}.', { a: num(12), b: num(180) }, ['l3tword', { en: '2 hours a book, $15 an hour, six books.', zh: '每本 2 h，每小时 $15，6 本。', lines: [{ zh: '2 × 6 = <b>12 h</b>。', calc: '2 × 6 = 12 h' }, { zh: '12 × $15 = <b>$180</b>。', calc: '12 × $15 = $180' }] }], '先算小时，再算钱', 'Two parts', { label: '12 h, $180', hint: { zh: '2 h × 6 本。', en: '2 × 6.' } }),
    F('l3-13-5-A7', wp('Francis painted 4 drawings. He took 2 hours to paint each drawing. (a) How long did he take to paint the 4 drawings? (b) If he started painting at 10.00 am, what time did he finish?', 'Francis 画了 4 幅画，每幅 2 小时。(a) 一共用了多久？(b) 10.00 am 开始，几点画完？'), '(a) He took {{a}} h.\n(b) He finished at {{t}} {{ap}}.', Object.assign({ a: num(8) }, tf('6.00 pm')), ['l3tword', { en: '4 drawings, 2 hours each, started 10.00 am.', zh: '4 幅，每幅 2 h，10.00 am 开始。', lines: [{ zh: '2 × 4 = <b>8 h</b>。', calc: '2 × 4 = 8 h' }, { zh: '10.00 am 往后数 8 小时：过了中午 12 点变 pm，到 <b>6.00 pm</b>。', tl: ['10.00 am', '6.00 pm'], calc: '10.00 am + 8 h = 6.00 pm' }] }], '先算总时间，再往后数', 'Two parts', { label: '8 h, 6.00 pm', hint: { zh: '10 am 过 2 小时是 12 pm，再过 6 小时。', en: '10 am + 8 h.' } }),
    F('l3-13-5-A8', wp('Shanice took a coach from Singapore to Kuala Lumpur. The journey was 5 hours. (a) If she departed at 8.00 am, what time did she arrive in Kuala Lumpur? (b) If she returned to Singapore on a flight that took 4 h 5 min less than the coach, how long was the flight?', 'Shanice 坐大巴 5 小时。(a) 8.00 am 出发，几点到？(b) 回程坐飞机，比大巴少 4 h 5 min，飞了多久？'), '(a) She arrived at {{t}} {{ap}}.\n(b) The flight was {{b}} min.', Object.assign(tf('1.00 pm'), { b: num(55) }), ['l3tword', { en: 'Coach 5 hours from 8.00 am; flight 4 h 5 min less.', zh: '大巴 5 h，8.00 am 出发；飞机少 4 h 5 min。', lines: [{ zh: '8.00 am + 5 h = <b>1.00 pm</b>。', tl: ['8.00 am', '1.00 pm'], calc: '8.00 am + 5 h = 1.00 pm' }, { zh: '5 h − 4 h 5 min：5 h = 4 h 60 min，60 − 5 = <b>55 min</b>。', calc: '5 h − 4 h 5 min = 55 min' }] }], '到达时间往后数；飞行时间用减法', 'Two parts', { label: '1.00 pm, 55 min', hint: { zh: '5 h 写成 4 h 60 min 再减。', en: '5 h = 4 h 60 min.' } }),
    F('l3-13-5-A9', wp('Kylie finished her movie at 6.25 pm according to her watch. (a) If her watch was 10 minutes fast, what was the actual time she finished her movie? (b) If the movie was 1 h 40 min long, what time did it start?', 'Kylie 的表显示 6.25 pm 看完电影。(a) 表快了 10 分钟，实际几点？(b) 电影 1 h 40 min，几点开始的？'), '(a) The actual time was {{t}} {{ap}}.\n(b) It started at {{t2}} {{ap2}}.', (() => { const a = tf('6.15 pm'), b = tf('4.35 pm'); return { t: a.t, ap: a.ap, t2: b.t, ap2: b.ap }; })(), ['l3tword', { en: 'Watch 10 min fast showed 6.25 pm; movie 1 h 40 min.', zh: '表快 10 min 显示 6.25 pm；电影 1 h 40 min。', lines: [{ zh: '表快了 10 分钟，实际要往前退 10 分钟：6.25 pm − 10 min = <b>6.15 pm</b>。', calc: '6.25 pm − 10 min = 6.15 pm' }, { zh: '开始 = 结束往前数 1 h 40 min：6.15 pm − 1 h = 5.15 pm，− 40 min = <b>4.35 pm</b>。', tl: ['4.35 pm', '6.15 pm'], calc: '6.15 pm − 1 h 40 min = 4.35 pm' }] }], '表快了就往前退；开始时间往前数', 'Two parts', { label: '6.15 pm, 4.35 pm', hint: { zh: '快 10 分钟 → 减 10 分钟。', en: 'Fast by 10 min → subtract 10 min.' } }),
    F('l3-13-5-A10', wp('Tony and Thadeus took turns to work on a sculpture. Tony started working on it first at 9.45 am and took 2 h 40 min. Thadeus took over and worked on it for another 3 h 15 min. (a) How long did both of them work on the sculpture? (b) What time did they finish working on the sculpture?', 'Tony 9.45 am 开始做了 2 h 40 min，Thadeus 接着做了 3 h 15 min。(a) 两人一共做了多久？(b) 几点完成？'), '(a) Both of them worked for {{h}} h {{m}} min.\n(b) They finished at {{t}} {{ap}}.', Object.assign({ h: num(5), m: num(55) }, tf('3.40 pm')), ['l3tword', { en: 'Started 9.45 am; 2 h 40 min + 3 h 15 min.', zh: '9.45 am 开始；2 h 40 min + 3 h 15 min。', lines: [{ zh: '2 h 40 min + 3 h 15 min：小时 2 + 3 = 5，分钟 40 + 15 = 55，一共 <b>5 h 55 min</b>。', calc: '2 h 40 min + 3 h 15 min = 5 h 55 min' }, { zh: '9.45 am 往后数 5 h 55 min：9.45 am + 5 h = 2.45 pm，再 + 55 min = <b>3.40 pm</b>。', tl: ['9.45 am', '3.40 pm'], calc: '9.45 am + 5 h 55 min = 3.40 pm' }] }], '先把两段时间加起来，再从开始时间往后数', 'Two parts', { label: '5 h 55 min, 3.40 pm', hint: { zh: '小时加小时，分钟加分钟。', en: 'Add hours and minutes separately.' } }),
  ];

  unit(13).kps = [
    {
      id: 'l3-13-1', available: true,
      title: { zh: '读写时间', en: 'Read and write the correct time' },
      intro: { zh: '长针每过一个数字是 5 分钟。不超过 30 分说 minutes past（过了几分）；超过 30 分说 minutes to（差几分到下一个整点）。', en: 'Up to 30 minutes: "minutes past". After 30: "minutes to" the next hour.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '读钟', en: 'Fill in each blank with the correct time' },
          example: { kind: 'l3clockpt', n: { h: 1, m: 20 }, title: { zh: '1.20 或 20 minutes past 1', en: '1.20 or 20 minutes past 1' } },
          questions: clocksA.map(([h, m], i) => F(`l3-13-1-A${i + 1}`, `<div class="center">${C.clockSVG({ h, m }, { w: 190 })}</div>`, `{{t}}\nor {{w}}`, { t: tm(h, m), w: choice(phrase(h, m), phraseOpts(h, m)) }, ['l3clockpt', { h, m }], '写出时间（几点几分），再选英文说法', 'Write the time and choose how to say it', { label: `${fmt(h, m)} / ${phrase(h, m)}`, hint: { zh: m <= 30 ? '不超过 30 分，说 past。' : '超过 30 分，说 to 下一个小时。', en: m <= 30 ? 'minutes past' : 'minutes to' } })) },
        { id: 'B', type: 'fill', title: { zh: 'past 和 to', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'l3pastto', n: { form: 'to', h: 6, m: 10 }, title: { zh: '10 minutes to 6 = 5.50', en: '5.50 is 10 minutes to 6' } },
          questions: B.map(([text, fields, explain], i) => F(`l3-13-1-B${i + 1}`, '', text, fields, explain, 'past 是过了几分，to 是还差几分到下一个整点', 'Fill in the blank', { label: text.replace(/\{\{\w+\}\}/g, Object.values(fields)[0].a), hint: { zh: 'to 的时候用 60 减分钟，小时要退 1。', en: 'For "to": 60 − minutes, and the hour is one less.' } })) },
      ],
    },
    {
      id: 'l3-13-2', available: true,
      title: { zh: '时和分的换算', en: 'Express time in minutes or hours and minutes' },
      intro: { zh: '1 h = 60 min。小时 × 60 再加分钟；分钟 ÷ 60 得小时，余下的是分钟。', en: '1 h = 60 min.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '换成分钟', en: 'Express the following in minutes' },
          example: { kind: 'l3hm', n: { h: 3, m: 0, dir: 'toMin' }, title: { zh: '3 h = 3 × 60 = 180 min', en: '3 h = 180 min' } },
          questions: toMinA.map(([h, m], i) => F(`l3-13-2-A${i + 1}`, '', `${h} h ${m} min = {{a}} min`, { a: num(h * 60 + m) }, ['l3hm', { h, m, dir: 'toMin' }], `${h} h ${m} min 是多少分钟？`, 'Express in minutes', { label: `${h} h ${m} min = ${h * 60 + m} min`, hint: { zh: `${h} × 60 + ${m}。`, en: `${h} × 60 + ${m}.` } })) },
        { id: 'B', type: 'fill', title: { zh: '换成小时', en: 'Express the following in hours' },
          example: { kind: 'l3hm', n: { mins: 120, dir: 'toH' }, title: { zh: '120 min = 2 h', en: '120 ÷ 60 = 2' } },
          questions: toHB.map((mins, i) => F(`l3-13-2-B${i + 1}`, '', `${mins} min = {{a}} h`, { a: num(mins / 60) }, ['l3hm', { mins, dir: 'toH' }], `${mins} 分钟是几小时？`, 'Express in hours', { label: `${mins} min = ${mins / 60} h`, hint: { zh: `${mins} ÷ 60。`, en: `${mins} ÷ 60.` } })) },
        { id: 'C', type: 'fill', title: { zh: '换成几时几分', en: 'Express the following in hours and minutes' },
          example: { kind: 'l3hm', n: { mins: 75, dir: 'toHM' }, title: { zh: '75 min = 60 + 15 = 1 h 15 min', en: '75 min = 1 h 15 min' } },
          questions: toHMC.map((mins, i) => F(`l3-13-2-C${i + 1}`, '', `${mins} min = {{h}} h {{m}} min`, { h: num(Math.floor(mins / 60)), m: num(mins % 60) }, ['l3hm', { mins, dir: 'toHM' }], `${mins} 分钟是几时几分？`, 'Express in hours and minutes', { label: `${mins} min = ${Math.floor(mins / 60)} h ${mins % 60} min`, hint: { zh: `${mins} 里有几个 60？`, en: `How many 60s in ${mins}?` } })) },
      ],
    },
    {
      id: 'l3-13-3', available: true,
      title: { zh: '两个时刻之间多久', en: 'Find duration between two different times' },
      intro: { zh: '画时间线：从开始时间一小时一小时往后数，不够一小时了再数分钟。注意跨过 12 点 am 变 pm。', en: 'Draw a timeline. Count on in hours, then in minutes.' },
      sections: [{ id: 'A', type: 'fill', title: { zh: '画时间线算时长', en: 'Draw timelines to find the duration' },
        example: { kind: 'l3dur', n: { a: '4.20 pm', b: '4.50 pm' }, title: { zh: '4.20 pm 到 4.50 pm 是 30 分钟', en: '30 minutes' } },
        questions: dur.map(([a, b], i) => { const [h, m] = durOf(a, b); return F(`l3-13-3-A${i + 1}`, '', `${a} to ${b} = {{h}} h {{m}} min`, { h: num(h), m: num(m) }, ['l3dur', { a, b }], `从 ${a} 到 ${b} 是多久？`, 'Find the duration', { label: `${a} → ${b} = ${h} h ${m} min`, hint: { zh: '一小时一小时往后数，再数分钟。', en: 'Count on in hours, then minutes.' } }); }) }],
    },
    {
      id: 'l3-13-4', available: true,
      title: { zh: '求开始或结束时间', en: 'Find the starting time or ending time' },
      intro: { zh: '"after" 往后数，"before" 往前数。先数小时再数分钟；分钟超过 60 进 1 小时，不够减向小时借 60。', en: '"after": count on. "before": count back. Hours first, then minutes.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '之后是几点', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'l3after', n: { start: '11.40 am', h: 0, m: 30, dir: 'after' }, title: { zh: '30 minutes after 11.40 am is 12.10 pm', en: '12.10 pm' } },
          questions: afterA.map(([h, m, start], i) => { const end = L.toStr(L.toMin(start) + h * 60 + m); return F(`l3-13-4-A${i + 1}`, '', `${hmTxt(h, m)} after ${start} is {{t}} {{ap}}.`, tf(end), ['l3after', { start, h, m, dir: 'after' }], `${start} 之后 ${hmTxt(h, m)} 是几点？`, undefined, { label: `${hmTxt(h, m)} after ${start} = ${end}`, hint: { zh: '往后数，注意过 12 点 am/pm 会变。', en: 'Count on. Watch am/pm.' } }); }) },
        { id: 'B', type: 'fill', title: { zh: '之前是几点', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'l3after', n: { start: '12.30 pm', h: 0, m: 50, dir: 'before' }, title: { zh: '50 minutes before 12.30 pm is 11.40 am', en: '11.40 am' } },
          questions: beforeB.map(([h, m, start], i) => { const end = L.toStr(L.toMin(start) - h * 60 - m); return F(`l3-13-4-B${i + 1}`, '', `${hmTxt(h, m)} before ${start} is {{t}} {{ap}}.`, tf(end), ['l3after', { start, h, m, dir: 'before' }], `${start} 之前 ${hmTxt(h, m)} 是几点？`, undefined, { label: `${hmTxt(h, m)} before ${start} = ${end}`, hint: { zh: '往前数，注意过 12 点 am/pm 会变。', en: 'Count back. Watch am/pm.' } }); }) },
      ],
    },
    {
      id: 'l3-13-5', available: true,
      title: { zh: '时间应用题', en: 'Solve word problems related to time' },
      intro: { zh: '结束 = 开始往后数；开始 = 结束往前数；时长用时间线数。按小时计酬：先算总小时，再乘。', en: 'Count on for ending time, count back for starting time. Use a timeline.' },
      sections: [{ id: 'A', type: 'fill', title: { zh: '应用题', en: 'Do these word problems. Show your working clearly' },
        example: { kind: 'l3after', n: { start: '8.30 am', h: 2, m: 15, dir: 'after' }, title: { zh: '8.30 am 开始，2 h 15 min 后是 10.45 am', en: '10.45 am' } },
        questions: words }],
    },
  ];
})();
