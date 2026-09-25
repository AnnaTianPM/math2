/* 时间：钟面绘制、讲解动画、题型 clockset（点钟面画指针） */
(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '"': '&quot;', '>': '&gt;' }[c]));
  const line = t => `<div class="expand-line">${t}</div>`;
  const pad = m => String(m).padStart(2, '0');
  const fmt = (h, m) => `${h}.${pad(m)}`;
  const zhTime = (h, m) => m === 0 ? `${h} 点整` : m === 30 ? `${h} 点半` : `${h} 点 ${m} 分`;
  const enTime = (h, m) => m === 0 ? `${h} o'clock` : `${h}.${pad(m)}`;

  /* clockSVG({h,m}, opts): opts.w, hour/minute:bool(是否画), hlMin(高亮 0..m 的弧), minuteLabels(外圈 5,10..), hlNum(高亮数字), live, id, boxes(外圈填空框) */
  function clockSVG(t, opts = {}) {
    const w = opts.w || 170, R = 90, cx = 100, cy = 100;
    const h = t ? t.h : null, m = t ? t.m : null;
    const showH = opts.hour !== false && h !== null, showM = opts.minute !== false && m !== null;
    const ang = deg => (deg - 90) * Math.PI / 180;
    const pt = (deg, r) => [cx + r * Math.cos(ang(deg)), cy + r * Math.sin(ang(deg))];
    let s = `<circle cx="${cx}" cy="${cy}" r="${R + 6}" fill="#fff" stroke="#8a8aa0" stroke-width="5"/><circle cx="${cx}" cy="${cy}" r="${R}" fill="#fffdf7" stroke="#2b2b3a" stroke-width="1.5"/>`;
    if (opts.hlMin) { const deg = opts.hlMin * 6; const [x1, y1] = pt(0, R - 2), [x2, y2] = pt(deg, R - 2); s += `<path d="M${cx} ${cy} L${x1} ${y1} A${R - 2} ${R - 2} 0 ${deg > 180 ? 1 : 0} 1 ${x2} ${y2} Z" fill="rgba(255,159,67,.28)"/>`; }
    for (let i = 0; i < 60; i++) { const big = i % 5 === 0; const [x1, y1] = pt(i * 6, R - (big ? 9 : 5)), [x2, y2] = pt(i * 6, R - 1); s += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#2b2b3a" stroke-width="${big ? 2.2 : 1}"/>`; }
    for (let n = 1; n <= 12; n++) { const [x, y] = pt(n * 30, R - 22); const hl = opts.hlNum === n; s += `<text x="${x}" y="${y + 6}" text-anchor="middle" font-size="17" font-weight="800" fill="${hl ? '#ff9f43' : '#2b2b3a'}" ${hl ? 'stroke="#ff9f43" stroke-width=".6"' : ''}>${n}</text>`; if (opts.minuteLabels) { const [mx, my] = pt(n * 30, R + 20); s += `<text x="${mx}" y="${my + 4}" text-anchor="middle" font-size="11" font-weight="700" fill="#4b3fc4">${n * 5}</text>`; } }
    if (showH) { const deg = h * 30 + m / 2; const [x, y] = pt(deg, 46); s += `<line class="hand hour" x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="${opts.hlH ? '#ff9f43' : '#2b2b3a'}" stroke-width="7" stroke-linecap="round"/>`; }
    if (showM) { const deg = m * 6; const [x, y] = pt(deg, 72); const [ax, ay] = pt(deg, 60); s += `<line class="hand minute" x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="${opts.hlM ? '#ff9f43' : '#6c5ce7'}" stroke-width="4.5" stroke-linecap="round"/><polygon points="${x},${y} ${ax + (ay - cy) * 0.08},${ay - (ax - cx) * 0.08} ${ax - (ay - cy) * 0.08},${ay + (ax - cx) * 0.08}" fill="${opts.hlM ? '#ff9f43' : '#6c5ce7'}"/>`; }
    s += `<circle cx="${cx}" cy="${cy}" r="5" fill="#2b2b3a"/>`;
    const vb = opts.minuteLabels ? '-10 -10 220 220' : '0 0 200 200';
    return `<span class="clock ${opts.live ? 'live' : ''}" ${opts.id ? `id="${opts.id}"` : ''}><svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" width="${w}" height="${w}">${s}${opts.live ? `<circle class="clk-hit" cx="${cx}" cy="${cy}" r="${R + 6}" fill="transparent"/>` : ''}</svg></span>`;
  }
  const two = (a, b, mid) => `<div class="fig-row">${a}<div style="font-size:24px;font-weight:800;color:#7a7a8c">${mid || '→'}</div>${b}</div>`;

  /* ---------- 讲解 ---------- */
  window.StepKinds.clockparts = () => [
    { zh: '钟面上有 12 个数字。<b>短针</b>是时针（hour hand），指着几点；<b>长针</b>是分针（minute hand），指着几分。', en: 'Short hand: hour. Long hand: minutes.', render: s => { s.innerHTML = `<div class="center">${clockSVG({ h: 7, m: 10 }, { w: 220 })}</div>`; } },
    { zh: '分针每走一个数字，就是 <b>5 分钟</b>。从 12 开始数：5、10、15……到 12 是 60 分钟，正好一圈。', en: 'Each number is 5 minutes for the minute hand.', render: s => { s.innerHTML = `<div class="center">${clockSVG({ h: 7, m: 10 }, { w: 240, minuteLabels: true })}</div>`; } },
    { zh: '这个钟：时针刚过 7，分针指着 2（2 × 5 = 10 分）。所以是 <b>7.10</b>，7 点 10 分。', en: 'Hour hand just past 7, minute hand at 2 → 7.10.', render: s => { s.innerHTML = `<div class="center">${clockSVG({ h: 7, m: 10 }, { w: 240, minuteLabels: true, hlNum: 2, hlMin: 10 })}${line('7.10')}</div>`; } },
  ];
  window.StepKinds.minutesafter = ({ h, m }) => {
    const n = m / 5;
    const steps = [{ zh: `先看时针（短针）：在 ${h} 和 ${h + 1 > 12 ? 1 : h + 1} 之间，所以是 ${h} 点多（after ${h} o'clock）。`, en: `Hour hand is past ${h}: after ${h} o'clock.`, render: s => { s.innerHTML = `<div class="center">${clockSVG({ h, m }, { w: 220, hlH: true })}</div>`; } }];
    steps.push({ zh: `再看分针（长针）指着数字 <b>${n}</b>。从 12 开始，每个数字 5 分钟，5 个 5 个地数。`, en: `Minute hand points to ${n}. Count in 5s from 12.`, render: s => { s.innerHTML = `<div class="center">${clockSVG({ h, m }, { w: 220, hlM: true, hlNum: n })}</div>`; } });
    steps.push({ zh: `${Array.from({ length: n }, (_, i) => (i + 1) * 5).join('、')}。数了 ${n} 次：<b>${n} × 5 = ${m}</b> 分钟。`, en: `${n} × 5 = ${m} minutes.`, render: s => { s.innerHTML = `<div class="center">${clockSVG({ h, m }, { w: 220, hlM: true, hlMin: m, minuteLabels: true })}${line(`${n} × 5 = ${m}`)}</div>`; } });
    steps.push({ zh: `所以是 <b>${m} minutes after ${h} o'clock</b>，也就是 ${h} 点 ${m} 分，写成 ${fmt(h, m)}。`, en: `${m} minutes after ${h} o'clock: ${fmt(h, m)}.`, render: s => { s.innerHTML = `<div class="center">${clockSVG({ h, m }, { w: 220, hlMin: m })}${line(`${m} minutes after ${h} o'clock = ${fmt(h, m)}`)}</div>`; } });
    return steps;
  };
  window.StepKinds.readclock = ({ h, m }) => {
    const n = m / 5;
    const steps = [{ zh: `看时针（短针）：${m === 0 ? `正好指着 <b>${h}</b>` : `在 ${h} 和 ${h % 12 + 1} 之间，刚过 <b>${h}</b>`}，所以是 ${h} 点。`, en: `Hour hand: ${h}.`, render: s => { s.innerHTML = `<div class="center">${clockSVG({ h, m }, { w: 220, hlH: true, hlNum: h })}</div>`; } }];
    if (m === 0) steps.push({ zh: `分针指着 12，就是整点：<b>${h} o'clock</b>，写成 ${fmt(h, 0)}。`, en: `Minute hand at 12: ${h} o'clock.`, render: s => { s.innerHTML = `<div class="center">${clockSVG({ h, m }, { w: 220, hlM: true })}${line(`${h} o'clock = ${fmt(h, 0)}`)}</div>`; } });
    else {
      steps.push({ zh: `分针（长针）指着 <b>${n}</b>：${n} × 5 = <b>${m}</b> 分。${m === 30 ? '30 分也叫 half past（半）。' : m === 15 ? '15 分也叫 quarter past。' : m === 45 ? '45 分也叫 quarter to（差一刻）。' : ''}`, en: `Minute hand at ${n}: ${n} × 5 = ${m} minutes.`, render: s => { s.innerHTML = `<div class="center">${clockSVG({ h, m }, { w: 220, hlM: true, hlNum: n, hlMin: m })}${line(`${n} × 5 = ${m}`)}</div>`; } });
      steps.push({ zh: `合起来：<b>${fmt(h, m)}</b>（${zhTime(h, m)}），英文说 ${m === 30 ? `half past ${h}` : `${h} ${m === 15 ? 'fifteen' : m === 45 ? 'forty-five' : m}`}。`, en: `The time is ${fmt(h, m)}.`, render: s => { s.innerHTML = `<div class="center">${clockSVG({ h, m }, { w: 220 })}${line(fmt(h, m))}</div>`; } });
    }
    return steps;
  };
  window.StepKinds.drawhands = ({ h, m, mode }) => {
    const n = m / 5;
    const steps = [{ zh: `要画 <b>${fmt(h, m)}</b>：点前面是几点（${h}），点后面是几分（${pad(m)}）。`, en: `${fmt(h, m)}: ${h} is the hour, ${pad(m)} is the minutes.`, render: s => { s.innerHTML = `<div class="center">${clockSVG(null, { w: 220 })}${line(fmt(h, m))}</div>`; } }];
    steps.push({ zh: `分针（长针）：${m} 分 = ${n} × 5，所以指着数字 <b>${n === 0 ? 12 : n}</b>。`, en: `Minute hand: ${m} ÷ 5 = ${n === 0 ? 12 : n}.`, render: s => { s.innerHTML = `<div class="center">${clockSVG({ h, m }, { w: 220, hour: false, hlM: true, hlNum: n === 0 ? 12 : n })}${line(`${m} 分 → 指着 ${n === 0 ? 12 : n}`)}</div>`; } });
    if (mode !== 'minute') steps.push({ zh: `时针（短针）：${m === 0 ? `整点，正好指着 <b>${h}</b>` : `${h} 点已经过了 ${m} 分，所以指在 <b>${h}</b> 和 ${h % 12 + 1} 之间${m >= 30 ? '，靠近 ' + (h % 12 + 1) : '，靠近 ' + h}`}。`, en: `Hour hand: ${m === 0 ? `exactly at ${h}` : `between ${h} and ${h % 12 + 1}`}.`, render: s => { s.innerHTML = `<div class="center">${clockSVG({ h, m }, { w: 220, hlH: true, hlNum: h })}</div>`; } });
    steps.push({ zh: `画好了：短针指 ${h} 点方向，长针指 ${n === 0 ? 12 : n}，就是 <b>${fmt(h, m)}</b>。`, en: `Done: ${fmt(h, m)}.`, render: s => { s.innerHTML = `<div class="center">${clockSVG({ h, m }, { w: 220 })}${line(fmt(h, m))}</div>`; } });
    return steps;
  };
  window.StepKinds.ampm = () => [
    { zh: '一天有 24 小时，钟面只有 12 个数字，所以要分 <b>am</b> 和 <b>pm</b>。', en: 'A day has 24 hours; the clock shows 12. So we say am or pm.', render: s => { s.innerHTML = `<div class="center" style="font-size:60px">🌅 🕛 🌙</div>`; } },
    { zh: '<b>am</b>：半夜 12 点到中午 12 点前。早上起床、吃早饭、上午上课，都是 am。', en: 'am: midnight to noon. Morning things are am.', render: s => { s.innerHTML = `<div class="center"><div style="font-size:56px">🌅 🍳 🎒</div>${line('am = 上午')}</div>`; } },
    { zh: '<b>pm</b>：中午 12 点到半夜 12 点前。午饭、下午、晚上、睡觉，都是 pm。', en: 'pm: noon to midnight. Afternoon and evening things are pm.', render: s => { s.innerHTML = `<div class="center"><div style="font-size:56px">🍽️ 🌇 🌙</div>${line('pm = 下午 / 晚上')}</div>`; } },
    { zh: '判断的窍门：看题目里的词。breakfast、morning、sunrise 是 am；lunch、afternoon、dinner、evening、night 是 pm。', en: 'Look for clue words: morning → am; afternoon, evening, night → pm.', render: s => { s.innerHTML = line('morning → am　|　afternoon / night → pm'); } },
  ];
  window.StepKinds.timeafter = ({ h, m, dur }) => {
    const total = h * 60 + m + dur; const h2 = ((Math.floor(total / 60) - 1) % 12) + 1, m2 = total % 60;
    const durZh = dur === 30 ? '30 分钟（半小时）' : '1 小时';
    const steps = [{ zh: `开始是 <b>${fmt(h, m)}</b>。过了 ${durZh} 之后是几点？`, en: `Start at ${fmt(h, m)}. What time is it ${dur === 30 ? '30 min' : '1 h'} later?`, render: s => { s.innerHTML = `<div class="center">${clockSVG({ h, m }, { w: 200 })}${line(`${fmt(h, m)} + ${dur === 30 ? '30 min' : '1 h'} = ?`)}</div>`; } }];
    if (dur === 30) steps.push({ zh: `30 分钟 = 分针走<b>半圈</b>（6 个数字）。${m === 0 ? '分针从 12 走到 6' : '分针从 6 走到 12'}，时针也跟着走半格。`, en: '30 minutes: the minute hand goes half way round.', render: s => { s.innerHTML = two(clockSVG({ h, m }, { w: 180 }), clockSVG({ h: h2, m: m2 }, { w: 180, hlM: true, hlMin: m2 === 0 ? 0 : 30 })); } });
    else steps.push({ zh: `1 小时 = 分针走<b>一整圈</b>回到原处，时针往前走<b>一个数字</b>：从 ${h} 到 ${h2}。`, en: '1 hour: the minute hand goes all the way round; the hour hand moves one number.', render: s => { s.innerHTML = two(clockSVG({ h, m }, { w: 180 }), clockSVG({ h: h2, m: m2 }, { w: 180, hlH: true, hlNum: h2 })); } });
    steps.push({ zh: `所以 <b>${fmt(h2, m2)}</b> is ${dur === 30 ? '30 min' : '1 h'} after <b>${fmt(h, m)}</b>。`, en: `${fmt(h2, m2)} is ${dur === 30 ? '30 min' : '1 h'} after ${fmt(h, m)}.`, render: s => { s.innerHTML = two(clockSVG({ h, m }, { w: 180 }), clockSVG({ h: h2, m: m2 }, { w: 180 })) + line(`${fmt(h2, m2)} is ${dur === 30 ? '30 min' : '1 h'} after ${fmt(h, m)}`); } });
    return steps;
  };

  /* ---------- 题型 clockset：点钟面放指针 ----------
   * q = { id, type:'clockset', target:{h,m}, mode:'minute'|'both', givenHour:bool, caption(html), text?/fields? (附加填空，同 fill 的 time 字段) } */
  window.QTypes.clockset = q => {
    let hour = null, minute = null;
    const T = q.target;
    const extra = q.fields ? Object.keys(q.fields) : [];
    function html() {
      return `<div class="clockset">${q.caption || ''}<div class="center">${clockSVG(null, { w: 240, live: true, id: 'clk' })}</div>
        <div class="center sub">${q.mode === 'minute' ? '点钟面<b>外圈</b>的数字，放<b>分针</b>（长针）' : '点<b>外圈</b>数字放分针（长针），点<b>里圈</b>放时针（短针）'}</div>
        ${q.text ? `<div class="fill">${esc(q.text).replace(/\{\{(\w+)\}\}/g, (_, k) => `<span class="timein" data-key="${k}"><input class="blank" data-key="${k}" data-part="h" type="text" inputmode="numeric" maxlength="2" autocomplete="off"><b>.</b><input class="blank" data-key="${k}" data-part="m" type="text" inputmode="numeric" maxlength="2" autocomplete="off"></span>`)}</div>` : ''}
        <div class="center mt"><button class="btn secondary small" id="clearAll">清空</button> <button class="btn ok" id="submit">检查 ✔</button></div></div>`;
    }
    function draw(box) {
      const el = box.querySelector('#clk'); if (!el) return;
      const t = { h: hour === null ? (q.givenHour ? T.h : null) : hour, m: minute };
      // 时针位置：给定时针时按目标分钟偏移；自己放时按已放分钟偏移
      const hm = t.h === null ? null : (q.givenHour && hour === null ? T.m : (minute === null ? 0 : minute));
      const svgT = { h: t.h, m: t.h === null ? (minute === null ? null : minute) : hm };
      const showMin = minute !== null;
      const inner = clockSVG(svgT, { w: 240, live: true, minute: showMin, hour: t.h !== null });
      // 只替换分针：若分针未放，用 svgT.m 仅供时针偏移，不画分针
      el.outerHTML = inner.replace('<span class="clock live" >', '<span class="clock live" id="clk">');
      if (!showMin && t.h !== null) { /* 时针已画（minute:false 时仍按 hm 偏移） */ }
      bindClock(box);
    }
    function bindClock(box) {
      const hit = box.querySelector('#clk .clk-hit'); if (!hit) return;
      hit.onclick = e => {
        if (box.dataset.locked) return;
        const svg = hit.ownerSVGElement, r = svg.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width * 200 - 100, y = (e.clientY - r.top) / r.height * 200 - 100;
        const dist = Math.sqrt(x * x + y * y), deg = (Math.atan2(y, x) * 180 / Math.PI + 90 + 360) % 360;
        if (q.mode === 'minute' || dist > 52) { minute = Math.round(deg / 30) % 12 * 5; }
        else { hour = Math.round(deg / 30) % 12; if (hour === 0) hour = 12; }
        draw(box);
      };
    }
    function bind(box, submit) {
      hour = null; minute = null; draw(box);
      box.querySelector('#clearAll').onclick = () => { hour = null; minute = null; draw(box); };
      box.querySelector('#submit').onclick = () => submit();
      box.querySelectorAll('input.blank').forEach(i => { i.onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); submit(); } }; });
    }
    const readTimes = box => { const v = {}; for (const k of extra) { const ps = box.querySelectorAll(`input.blank[data-key="${k}"]`); v[k] = `${ps[0].value.trim()}.${ps[1].value.trim()}`; } return v; };
    function value(box) { if (minute === null && (q.mode === 'minute' || hour === null) && extra.every(k => readTimes(box)[k] === '.')) return null; return JSON.stringify({ h: hour, m: minute, t: readTimes(box) }); }
    const normT = s => { const [h, m] = String(s).split('.'); return `${parseInt(h, 10)}.${pad(parseInt(m || '0', 10))}`; };
    const clockOk = v => v.m === T.m && (q.mode === 'minute' || v.h === T.h);
    const fieldOk = (k, s) => s && s !== '.' && normT(s) === normT(q.fields[k].a);
    function check(val) { try { const v = JSON.parse(val); return clockOk(v) && extra.every(k => fieldOk(k, v.t[k])); } catch (e) { return false; } }
    function markWrong(box, val) { const v = JSON.parse(val); box.querySelector('#clk').classList.toggle('bad', !clockOk(v)); box.querySelector('#clk').classList.toggle('goodc', clockOk(v)); extra.forEach(k => { const ok = fieldOk(k, v.t[k]); box.querySelectorAll(`input.blank[data-key="${k}"]`).forEach(i => { i.classList.toggle('good', ok); i.classList.toggle('badf', !ok); if (ok) i.disabled = true; }); }); }
    function lock(box) { box.dataset.locked = '1'; box.querySelectorAll('#clearAll, #submit, input').forEach(b => b.disabled = true); }
    function showAnswer(box) { hour = T.h; minute = T.m; draw(box); box.querySelector('#clk').classList.remove('bad'); box.querySelector('#clk').classList.add('goodc'); extra.forEach(k => { const [h, m] = String(q.fields[k].a).split('.'); const ps = box.querySelectorAll(`input.blank[data-key="${k}"]`); ps[0].value = h; ps[1].value = m; ps.forEach(i => { i.classList.remove('badf'); i.classList.add('good'); }); }); lock(box); }
    function restore(box, val, status) { try { const v = JSON.parse(val || '{}'); hour = v.h === undefined ? null : v.h; minute = v.m === undefined ? null : v.m; draw(box); extra.forEach(k => { const [h, m] = String((v.t || {})[k] || '.').split('.'); const ps = box.querySelectorAll(`input.blank[data-key="${k}"]`); ps[0].value = h || ''; ps[1].value = m || ''; ps.forEach(i => i.classList.add(fieldOk(k, (v.t || {})[k]) ? 'good' : 'badf')); }); box.querySelector('#clk').classList.add(clockOk(v) ? 'goodc' : 'bad'); } catch (e) { /* */ } lock(box); }
    return {
      prompt: q.prompt || (q.mode === 'minute' ? { zh: `画出分针：The time is ${fmt(T.h, T.m)}`, en: `Draw the minute hand. The time is ${fmt(T.h, T.m)}.` } : { zh: `画出时针和分针：The time is ${fmt(T.h, T.m)}`, en: `Draw both hands. The time is ${fmt(T.h, T.m)}.` }),
      stage: '',
      custom: { html, bind, value, markWrong, showAnswer, lock, restore },
      hint: q.hint || { zh: `${pad(T.m)} 分：分针指着 ${T.m / 5 === 0 ? 12 : T.m / 5}（${T.m} ÷ 5）。${q.mode === 'minute' ? '' : `时针${T.m === 0 ? '正好指着 ' + T.h : '在 ' + T.h + ' 和 ' + (T.h % 12 + 1) + ' 之间'}。`}`, en: `Minute hand at ${T.m / 5 === 0 ? 12 : T.m / 5}.` },
      answerText: fmt(T.h, T.m) + (extra.length ? '；' + extra.map(k => q.fields[k].a).join(', ') : ''),
      check, answerDisplay: val => { try { const v = JSON.parse(val); return (v.h !== null ? v.h : '?') + '.' + (v.m !== null ? pad(v.m) : '??'); } catch (e) { return val; } },
      explainKind: q.explain ? q.explain[0] : 'drawhands', n: q.explain ? q.explain[1] : { h: T.h, m: T.m, mode: q.mode },
    };
  };

  window.ClockUI = { clockSVG, fmt, pad, two };
})();
