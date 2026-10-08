/* Level 4 · Unit 15  时间 */
(function () {
  const U = window.MATH_DATA.levels[4].units;
  const unit = num => U.find(u => u.num === num);
  const T = window.L4TIME;
  const pic = html => `<div class="center">${html}</div>`;
  const num = a => ({ a });
  const text = a => ({ a, kind: 'text' });
  const choice = (a, options) => ({ a, kind: 'choice', options });
  const time = a => ({ a, kind: 'time' });
  const F = (id, p, t, fields, explain, zh, en, o) => Object.assign({ id, type: 'fill', pic: p, label: t.replace(/\{\{\w+\}\}/g, '___').replace(/\n/g, ' '), prompt: { zh, en: en || 'Fill in the blanks' }, text: t, fields, answerText: Object.values(fields).map(f => f.a).join(' '), explain }, o || {});
  const wp = (en, zh) => `<div class="wp-text"><div class="wp-en">${en}</div><div class="wp-zh">${zh}</div></div>`;
  const two = (a, b) => `<div class="fig-row">${a}<div style="font-size:24px;font-weight:800;color:#7a7a8c">→</div>${b}</div>`;
  /* 24 小时制答案：接受 "08 25" "0825" "08:25" "08.25" */
  const t24 = s => { const [h, m] = s.split(' '); return { field: text(s), alts: [s, h + m, `${h}:${m}`, `${h}.${m}`, `${+h} ${m}`, `${+h}.${m}`] }; };
  const Q24 = (id, p, t, ans, explain, zh, en, o) => { const { field, alts } = t24(ans); return F(id, p, t, { a: field }, explain, zh, en, Object.assign({ accept: alts.map(a => ({ a })) }, o || {})); };
  /* 12 小时制答案 "6.36 pm" → time + am/pm */
  const Q12 = (id, p, t, ans, explain, zh, en, o) => { const [hm, ap] = ans.split(' '); return F(id, p, t.replace('{{a}}', '{{t}} {{ap}}'), { t: time(hm), ap: choice(ap, ['am', 'pm']) }, explain, zh, en, o); };
  /* 时长答案 "1 h 15 min" */
  const QD = (id, p, t, mins, explain, zh, en, o) => F(id, p, t.replace('{{a}}', '{{h}} h {{m}} min'), { h: num(Math.floor(mins / 60)), m: num(mins % 60) }, explain, zh, en, o);

  /* KP1 秒 */
  const secs = [[3, 11, 2, 15, 'wash his hands'], [12, 7, 9, 0, 'walk from his room to the kitchen'], [9, 10, 6, 45, 'pick a piece of paper from the floor'], [5, 11, 11, 0, 'wash his spoon and fork at the basin'], [4, 6, 10, 15, 'drink a glass of water'], [7, 12, 6, 45, 'do a maths sum'], [1, 11, 7, 5, 'tidy his study table'], [1, 5, 8, 5, 'tie his shoelaces'], [2, 11, 5, 45, 'recite the Pledge'], [8, 9, 1, 40, 'turn off the TV']];
  const kp1 = secs.map(([from, to, h, m, act], i) => { const n = ((to - from) + 12) % 12 || 12; return F(`l4-15-1-A${i + 1}`, pic(two(T.clockSec(h, m, from * 5), T.clockSec(h, m, to * 5))), `James took {{a}} s to ${act}.`, { a: num(n * 5) }, ['l4secs', { from, to, h, m }], `秒针从 ${from} 走到 ${to}，走了几秒？`, `How many seconds did James take to ${act}?`, { label: `秒针 ${from}→${to} = ${n * 5} s`, hint: { zh: '秒针走一个数字是 5 秒，数一数走了几个数字再乘 5。', en: 'Each number is 5 seconds.' } }); });

  /* KP2 */
  const toA = ['8.25 am', '12.09 am', '6.17 pm', '3.20 pm', '5.45 pm', '2.37 am', '7.59 am', '4.35 pm', '9.50 am', '11.29 pm'];
  const toB = ['18 36', '10 55', '06 36', '12 49', '23 42', '16 05', '09 20', '01 15', '14 30', '20 40'];
  const kp2A = toA.map((t, i) => Q24(`l4-15-2-A${i + 1}`, '', `${t} = {{a}}`, T.f24(T.toM(t)), ['l4to24', { t }], `${t} 用 24 小时制怎么写？`, 'Express using the 24-hour clock', { label: `${t} = ${T.f24(T.toM(t))}`, hint: { zh: 'pm 小时加 12；12 am 是 00；写四位数字，小时和分钟中间空一格。', en: 'pm: add 12. 12 am → 00.' } }));
  const kp2B = toB.map((t, i) => Q12(`l4-15-2-B${i + 1}`, '', `${t} = {{a}}`, T.f12(T.toM(t)), ['l4to12', { t }], `${t} 用 12 小时制怎么写？`, 'Express using the 12-hour clock', { label: `${t} = ${T.f12(T.toM(t))}`, hint: { zh: '小时 ≥ 12 是 pm，大于 12 要减 12；小于 12 是 am。', en: '12 or more → pm (subtract 12 if more than 12).' } }));

  /* KP3 时长 */
  const dur = [['12 20', '12 50', 'Mindy took {{a}} to travel from the library to her house.'], ['19 30', '20 45', "Jennifer's tuition lasted {{a}}."], ['18 45', '21 05', 'The barbecue session lasted {{a}}.'], ['17 40', '18 30', 'Mr James went cycling for {{a}}.'], ['13 15', '14 55', 'The movie lasted {{a}}.'], ['11 10', '14 15', 'The karaoke session lasted {{a}}.'], ['14 05', '16 05', 'Charlie took {{a}} to clean his room.'], ['10 55', '11 20', 'Janine took {{a}} to wash her dog.'], ['08 30', '12 40', 'The school track and field event lasted {{a}}.'], ['09 00', '10 00', "Susan's ballet class lasted {{a}}."]];
  const kp3 = dur.map(([a, b, t], i) => { const d = T.toM(b) - T.toM(a); return QD(`l4-15-3-A${i + 1}`, pic(T.timeline([{ t: a }, { t: b, seg: '?' }])), t, d, ['l4dur', { a, b, k: '24' }], `从 ${a} 到 ${b} 是多长时间？`, 'Find the duration', { label: `${a}→${b} = ${T.durStr(d)}`, hint: { zh: '从开始时间一小时一小时往后数，不够一小时再数分钟。', en: 'Count on in hours, then minutes.' } }); });

  /* KP4 起止 */
  const es = [['08 00', 45, 'end', '24', 'Peggy finished her swimming lesson at {{a}}.'], ['13 10', 90, 'end', '24', 'The television programme ended at {{a}}.'], ['7.45 pm', 135, 'start', '12', 'Ronald left for his fishing trip at {{a}}.'], ['12.15 pm', 200, 'start', '12', 'Zack and his family reached the zoo at {{a}}.'], ['11 20', 280, 'end', '24', 'The workers finished paving the road at {{a}}.'], ['15 30', 120, 'start', '24', 'Jerome took a nap at {{a}}.'], ['11.05 pm', 225, 'start', '12', 'Wendy started her revision at {{a}}.'], ['8.05 am', 35, 'end', '12', 'Father finished reading his newspapers at {{a}}.'], ['19 10', 70, 'start', '24', 'Mother started preparing dinner at {{a}}.'], ['10.30 am', 175, 'end', '12', "Mr Wayne's meeting ended at {{a}}."]];
  const kp4 = es.map(([t, d, mode, k, tx], i) => { const ans = T.fmt(T.toM(t) + (mode === 'end' ? d : -d), k); const p = pic(T.timeline(mode === 'end' ? [{ t }, { t: '?', seg: T.durStr(d) }] : [{ t: '?' }, { t, seg: T.durStr(d) }])); const mk = k === '24' ? Q24 : Q12; return mk(`l4-15-4-A${i + 1}`, p, tx, ans, ['l4endstart', { t, dur: d, mode, k }], mode === 'end' ? `${t} 开始，经过 ${T.durStr(d)}，什么时候结束？` : `${t} 结束，持续了 ${T.durStr(d)}，什么时候开始？`, mode === 'end' ? 'Find the ending time' : 'Find the starting time', { label: `${t} ${mode === 'end' ? '+' : '−'} ${T.durStr(d)} = ${ans}`, hint: { zh: mode === 'end' ? '先加整小时，再加分钟。' : '从结束时间往回减：先减整小时，再减分钟。', en: mode === 'end' ? 'Add hours, then minutes.' : 'Count back hours, then minutes.' } }); });

  /* KP5 应用题 */
  const WT = (id, en, zh, kind, ans, explain, o = {}) => { const p = wp(en, zh); const mk = kind === '24' ? Q24 : kind === '12' ? Q12 : QD; return mk(id, p, o.text || '{{a}}', ans, explain, o.ask || '算一算', 'Solve the word problem', { label: en.slice(0, 60), hint: o.hint }); };
  const kp5 = [
    WT('l4-15-5-A1', 'Mike started doing his project at 5.15 pm. He finished his project at 8.30 pm. How long did he take to do his project?', 'Mike 5.15 pm 开始做项目，8.30 pm 做完。他用了多长时间？', 'dur', 195, ['l4dur', { a: '5.15 pm', b: '8.30 pm', k: '12' }], { hint: { zh: '5.15 往后数 3 小时到 8.15，再 15 分钟。', en: '3 h to 8.15 pm, then 15 min.' } }),
    WT('l4-15-5-A2', "The time shown on Basil's watch is 3.20 pm. If his watch is 30 min faster, what should be the correct time?", 'Basil 的表显示 3.20 pm。他的表快了 30 分钟，正确时间应该是几点？', '12', '2.50 pm', ['l4endstart', { t: '3.20 pm', dur: 30, mode: 'start', k: '12' }], { hint: { zh: '表快了就要往回减 30 分钟。', en: 'Fast watch: subtract 30 min.' } }),
    WT('l4-15-5-A3', "Benjamin reached his grandmother's house at 13 40. If the journey from his house to his grandmother's house took 25 min, at what time did Benjamin leave his house?", 'Benjamin 13 40 到奶奶家。路上用了 25 分钟，他几点出门？', '24', '13 15', ['l4endstart', { t: '13 40', dur: 25, mode: 'start', k: '24' }], { hint: { zh: '到达时间往回减 25 分钟。', en: 'Count back 25 min.' } }),
    WT('l4-15-5-A4', 'Mrs Drew went to a shopping centre at 16 00. She finished her shopping at 17 45. How long did she spend at the shopping centre?', 'Drew 太太 16 00 去商场，17 45 买完。她在商场待了多长时间？', 'dur', 105, ['l4dur', { a: '16 00', b: '17 45', k: '24' }], { hint: { zh: '16 00 → 17 00 是 1 h，再 45 min。', en: '1 h then 45 min.' } }),
    WT('l4-15-5-A5', 'A concert lasted 3 h 15 min. If the concert ended at 23 55, at what time did the concert start?', '音乐会持续 3 h 15 min，23 55 结束。几点开始？', '24', '20 40', ['l4endstart', { t: '23 55', dur: 195, mode: 'start', k: '24' }], { hint: { zh: '从 23 55 往回减 3 h，再减 15 min。', en: 'Count back 3 h 15 min.' } }),
    WT('l4-15-5-A6', 'The time for a plane to fly from Singapore to Penang is 90 min. If the plane leaves Singapore at 12.40 pm, at what time will the plane reach Penang?', '从新加坡飞槟城要 90 分钟。飞机 12.40 pm 起飞，几点到？', '12', '2.10 pm', ['l4endstart', { t: '12.40 pm', dur: 90, mode: 'end', k: '12' }], { hint: { zh: '90 min = 1 h 30 min，往后加。', en: '90 min = 1 h 30 min.' } }),
    WT('l4-15-5-A7', 'An examination started at 08 05. It lasted 2 hour 30 min. At what time did the examination end?', '考试 08 05 开始，持续 2 h 30 min。几点结束？', '24', '10 35', ['l4endstart', { t: '08 05', dur: 150, mode: 'end', k: '24' }], { hint: { zh: '加 2 h 到 10 05，再加 30 min。', en: '2 h then 30 min.' } }),
    WT('l4-15-5-A8', 'A coach travelled from Town X to Town Y. The coach started the journey at 10.35 pm and reached Town Y at 7.15 am the next morning. How long was the journey?', '长途车 10.35 pm 出发，第二天早上 7.15 am 到。路上用了多长时间？', 'dur', 520, ['l4dur', { a: '10.35 pm', b: '7.15 am', k: '12' }], { hint: { zh: '跨过午夜：10.35 pm → 11 pm 25 min，11 pm → 7 am 8 h，7 am → 7.15 am 15 min。', en: 'Count through midnight.' } }),
    WT('l4-15-5-A9', 'When it is 9.30 pm in Easter Island, the clock in Seoul shows 12.30 pm. If the time in Seoul is 4 pm, what is the time in Easter Island?', '复活节岛 9.30 pm 时，首尔是 12.30 pm。首尔 4 pm 时，复活节岛是几点？', '12', '1.00 am', ['l4tz', {}], { hint: { zh: '首尔从 12.30 pm 到 4 pm 过了 3 h 30 min，复活节岛也过同样长：9.30 pm + 3 h 30 min。', en: 'Both clocks move 3 h 30 min.' } }),
    WT('l4-15-5-A10', 'Kaitlyn woke up for school at 06 30. If she slept 7 h 35 min, what time did she go to bed the night before?', 'Kaitlyn 06 30 起床。她睡了 7 h 35 min，前一天晚上几点睡的？', '24', '22 55', ['l4endstart', { t: '06 30', dur: 455, mode: 'start', k: '24' }], { hint: { zh: '从 06 30 往回减 7 h 到 23 30，再减 35 min。', en: 'Count back 7 h 35 min through midnight.' } }),
  ];
  window.StepKinds.l4tz = () => [
    { zh: '两地的钟不一样，但<b>时间走得一样快</b>。先看首尔过了多久：12.30 pm → 4.00 pm 是 3 h 30 min。', en: 'Seoul: 12.30 pm → 4 pm is 3 h 30 min.', render: s => { s.innerHTML = `<div class="l1wrap"><div class="center">${T.timeline([{ t: '12.30 pm' }, { t: '4.00 pm', seg: '3 h 30 min' }])}</div><div class="expand-line">Seoul: 3 h 30 min</div></div>`; } },
    { zh: '复活节岛也过了 3 h 30 min：9.30 pm + 3 h = 12.30 am，再 + 30 min = <b>1.00 am</b>。', en: '9.30 pm + 3 h 30 min = 1.00 am.', render: s => { s.innerHTML = `<div class="l1wrap"><div class="center">${T.timeline([{ t: '9.30 pm' }, { t: '12.30 am', seg: '3 h' }, { t: '1.00 am', seg: '30 min' }])}</div><div class="expand-line">1.00 am</div></div>`; } },
  ];

  unit(15).kps = [
    { id: 'l4-15-1', available: true, title: { zh: '秒', en: 'Measure time in seconds' }, intro: { zh: '钟面上细长的是秒针，走一个数字是 5 秒，走一圈 60 秒 = 1 分钟。', en: 'The second hand moves one number every 5 seconds.' },
      sections: [{ id: 'A', type: 'fill', title: { zh: '秒针走了几秒', en: 'Write the correct duration on the lines provided' }, example: { kind: 'l4secs', n: { from: 12, to: 6, h: 9, m: 0 }, title: { zh: '秒针从 12 走到 6：6 × 5 = 30 s', en: '30 s' } }, questions: kp1 }] },
    { id: 'l4-15-2', available: true, title: { zh: '12 小时制和 24 小时制', en: 'Express time in 12-hour clock and 24-hour clock' }, intro: { zh: '24 小时制写成四位数（08 25、18 17），不用 am/pm。pm 的小时加 12；12 am 是 00 00，12 pm 是 12 00。', en: '24-hour clock: four digits, no am/pm. Add 12 for pm.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '写成 24 小时制', en: 'Express the following using the 24-hour clock' }, example: { kind: 'l4to24', n: { t: '3.20 pm' }, title: { zh: '3.20 pm：3 + 12 = 15 → 15 20', en: '3.20 pm = 15 20' } }, questions: kp2A },
        { id: 'B', type: 'fill', title: { zh: '写成 12 小时制', en: 'Express the following using the 12-hour clock' }, example: { kind: 'l4to12', n: { t: '18 36' }, title: { zh: '18 36：18 − 12 = 6 → 6.36 pm', en: '18 36 = 6.36 pm' } }, questions: kp2B },
      ] },
    { id: 'l4-15-3', available: true, title: { zh: '求时长', en: 'Find the duration of two different times' }, intro: { zh: '画时间线，从开始一小时一小时往后数，最后数分钟。', en: 'Count on in hours, then in minutes.' },
      sections: [{ id: 'A', type: 'fill', title: { zh: '时间线求时长', en: 'For each time line, fill in the blank with the correct answer' }, example: { kind: 'l4dur', n: { a: '12 20', b: '12 50', k: '24' }, title: { zh: '12 20 → 12 50：30 min', en: '30 min' } }, questions: kp3 }] },
    { id: 'l4-15-4', available: true, title: { zh: '求开始或结束时间', en: 'Calculate the starting or ending time given the duration' }, intro: { zh: '求结束时间：从开始往后加。求开始时间：从结束往回减。都是先算整小时再算分钟。', en: 'Count on for the end, count back for the start.' },
      sections: [{ id: 'A', type: 'fill', title: { zh: '时间线求起止', en: 'For each time line, fill in the blank with the correct answer' }, example: { kind: 'l4endstart', n: { t: '08 00', dur: 45, mode: 'end', k: '24' }, title: { zh: '08 00 + 45 min = 08 45', en: '08 45' } }, questions: kp4 }] },
    { id: 'l4-15-5', available: true, title: { zh: '时间应用题', en: 'Solve word problems related to time' }, intro: { zh: '读清楚给的是开始、结束还是时长；表快了往回减；跨过午夜分段数。', en: 'Decide what is given. Count through midnight in parts.' },
      sections: [{ id: 'A', type: 'fill', title: { zh: '应用题', en: 'Do these word problems. Show your working clearly' }, example: { kind: 'l4dur', n: { a: '5.15 pm', b: '8.30 pm', k: '12' }, title: { zh: '5.15 pm → 8.30 pm：3 h 15 min', en: '3 h 15 min' } }, questions: kp5 }] },
  ];
})();
