/* Level 1 · Unit 16 时间：整点、半点 讲解动画 */
(function () {
  const line = t => `<div class="expand-line">${t}</div>`;
  const wrap = (...parts) => `<div class="l1wrap">${parts.join('')}</div>`;
  const C = window.ClockUI;
  const say = (h, m) => m === 0 ? `${h} o'clock` : `half past ${h}`;
  const zh = (h, m) => m === 0 ? `${h} 点整` : `${h} 点半`;
  const clock = (h, m, o) => `<div class="center">${C.clockSVG({ h, m }, Object.assign({ w: 220 }, o || {}))}</div>`;

  const S = window.StepKinds;
  /* l1clock：读整点/半点 {h, m} */
  S.l1clock = ({ h, m }) => {
    const nx = h % 12 + 1;
    return [
      { zh: `钟面上有两根针：<b>长针</b>是分针（minute hand），<b>短针</b>是时针（hour hand）。先看长针。`, en: 'Long hand: minute hand. Short hand: hour hand.', render: s => { s.innerHTML = wrap(clock(h, m)); } },
      m === 0
        ? { zh: `长针指着 <b>12</b>，就是整点，英文说 <b>o'clock</b>。`, en: 'Minute hand at 12: o\'clock.', render: s => { s.innerHTML = wrap(clock(h, m, { hlM: true, hlNum: 12 }), line(`长针 → 12：o'clock`)); } }
        : { zh: `长针指着 <b>6</b>，就是半点，英文说 <b>half past</b>（过了一半）。`, en: 'Minute hand at 6: half past.', render: s => { s.innerHTML = wrap(clock(h, m, { hlM: true, hlNum: 6 }), line(`长针 → 6：half past`)); } },
      m === 0
        ? { zh: `短针正好指着 <b>${h}</b>，所以是 <b>${say(h, m)}</b>（${zh(h, m)}）。`, en: `Hour hand at ${h}: ${say(h, m)}.`, render: s => { s.innerHTML = wrap(clock(h, m, { hlH: true, hlNum: h }), line(say(h, m))); } }
        : { zh: `短针在 <b>${h}</b> 和 ${nx} 之间，已经过了 ${h}，还没到 ${nx}，所以是 <b>${say(h, m)}</b>（${zh(h, m)}）。`, en: `Hour hand between ${h} and ${nx}: ${say(h, m)}.`, render: s => { s.innerHTML = wrap(clock(h, m, { hlH: true, hlNum: h }), line(say(h, m))); } },
    ];
  };
  /* l1clockmatch：几个钟逐个读 {times:[[h,m],...]} */
  S.l1clockmatch = ({ times }) => times.map(([h, m], i) => ({ zh: `第 ${i + 1} 个钟：长针指 ${m === 0 ? '12，整点' : '6，半点'}；短针${m === 0 ? `指着 ${h}` : `在 ${h} 和 ${h % 12 + 1} 之间`}，所以是 <b>${say(h, m)}</b>。`, en: say(h, m), render: s => { s.innerHTML = wrap(clock(h, m, { hlH: true, hlM: true }), line(say(h, m))); } }));
  window.L1.sayTime = say;
})();
