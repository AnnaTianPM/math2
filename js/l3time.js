/* Level 3 · Unit 13 时间：几分过/差几分、时分换算、时间段、起止时间 讲解 */
(function () {
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '"': '&quot;', '>': '&gt;' }[c]));
  const line = t => `<div class="expand-line">${t}</div>`;
  const wrap = (...parts) => `<div class="l1wrap">${parts.join('')}</div>`;
  const C = window.ClockUI, pad = m => String(m).padStart(2, '0'), fmt = (h, m) => `${h}.${pad(m)}`;
  const clock = (h, m, o) => `<div class="center">${C.clockSVG({ h, m }, Object.assign({ w: 200 }, o || {}))}</div>`;
  // 分钟数（0..1439）↔ 12 小时制
  const toMin = t => { const [hm, ap] = t.split(' '); let [h, m] = hm.split('.').map(Number); if (ap === 'am' && h === 12) h = 0; if (ap === 'pm' && h !== 12) h += 12; return h * 60 + m; };
  const toStr = mins => { mins = ((mins % 1440) + 1440) % 1440; let h = Math.floor(mins / 60), m = mins % 60; const ap = h >= 12 ? 'pm' : 'am'; h = h % 12; if (h === 0) h = 12; return `${h}.${pad(m)} ${ap}`; };
  /* 时间线 SVG：segments [{label, from, to}] */
  function timeline(pts) {
    const W = 560, x0 = 30, x1 = 530, y = 40, n = pts.length;
    const X = i => x0 + (x1 - x0) * i / Math.max(1, n - 1);
    let s = `<line x1="${x0}" y1="${y}" x2="${x1}" y2="${y}" stroke="#333" stroke-width="2"/>`;
    pts.forEach((p, i) => { const x = X(i); s += `<line x1="${x}" y1="${y - 8}" x2="${x}" y2="${y + 8}" stroke="#333" stroke-width="2"/><text x="${x}" y="${y + 26}" text-anchor="middle" font-size="12" font-weight="700" fill="#333">${esc(p.t)}</text>`; if (i > 0) s += `<text x="${(X(i - 1) + x) / 2}" y="${y - 12}" text-anchor="middle" font-size="13" font-weight="800" fill="#d35400">${esc(p.seg)}</text>`; });
    return `<svg viewBox="0 0 ${W} 75" width="${W}" height="75" style="max-width:100%;height:auto">${s}</svg>`;
  }
  window.L3.timeline = timeline; window.L3.toMin = toMin; window.L3.toStr = toStr;

  const S = window.StepKinds;
  /* l3clockpt：读钟 几分过几 / 差几分到几 {h, m} */
  S.l3clockpt = ({ h, m }) => { const n = m / 5, past = m <= 30, nh = h % 12 + 1; return [
    { zh: `短针在 <b>${h}</b> 和 ${nh} 之间，所以是 ${h} 点多。长针指着 ${n}，${n} × 5 = <b>${m}</b> 分：写成 <b>${fmt(h, m)}</b>。`, en: `${fmt(h, m)}.`, render: s => { s.innerHTML = wrap(clock(h, m, { hlNum: n, hlMin: m }), line(fmt(h, m))); } },
    past ? { zh: `${m} 分没有超过 30，说 <b>${m} minutes past ${h}</b>（${h} 点过了 ${m} 分）。`, en: `${m} minutes past ${h}.`, render: s => { s.innerHTML = wrap(clock(h, m, { hlMin: m }), line(`${m} minutes past ${h}`)); } }
      : { zh: `${m} 分超过了 30，改说还差几分到下一个整点：60 − ${m} = ${60 - m}，<b>${60 - m} minutes to ${nh}</b>（差 ${60 - m} 分到 ${nh} 点）。`, en: `${60 - m} minutes to ${nh}.`, render: s => { s.innerHTML = wrap(clock(h, m, { hlMin: m }), line(`60 − ${m} = ${60 - m}`), line(`${60 - m} minutes to ${nh}`)); } },
  ]; };
  /* l3pastto：{form:'past'|'to', h, m}  past: m minutes past h；to: m minutes to h */
  S.l3pastto = ({ form, h, m }) => form === 'past' ? [
    { zh: `“${m} minutes past ${h}”：${h} 点过了 ${m} 分，就是 <b>${fmt(h, m)}</b>。`, en: `${fmt(h, m)}.`, render: s => { s.innerHTML = wrap(clock(h, m, { hlMin: m }), line(`${m} minutes past ${h} = ${fmt(h, m)}`)); } },
  ] : (() => { const ph = h === 1 ? 12 : h - 1, mm = 60 - m; return [
    { zh: `“${m} minutes to ${h}”：还差 ${m} 分才到 ${h} 点，所以还是 ${ph} 点多：60 − ${m} = ${mm} 分，<b>${fmt(ph, mm)}</b>。`, en: `${fmt(ph, mm)}.`, render: s => { s.innerHTML = wrap(clock(ph, mm, { hlMin: mm }), line(`60 − ${m} = ${mm}`), line(`${m} minutes to ${h} = ${fmt(ph, mm)}`)); } },
  ]; })();
  /* l3hm：{h, m, dir:'toMin'|'toH'|'toHM', mins} */
  S.l3hm = ({ h, m, dir, mins }) => dir === 'toMin' ? [
    { zh: `1 h = 60 min。${h} h = ${h} × 60 = <b>${h * 60}</b> min。`, en: `${h} × 60 = ${h * 60} min.`, render: s => { s.innerHTML = wrap(line(`${h} × 60 min = ${h * 60} min`)); } },
    { zh: `再加 ${m} min：${h * 60} + ${m} = <b>${h * 60 + m} min</b>。`, en: `${h * 60} + ${m} = ${h * 60 + m} min.`, render: s => { s.innerHTML = wrap(line(`${h * 60} min + ${m} min = ${h * 60 + m} min`)); } },
  ] : dir === 'toH' ? [
    { zh: `60 min = 1 h。${mins} ÷ 60 = <b>${mins / 60}</b>，所以 ${mins} min = ${mins / 60} h。`, en: `${mins} ÷ 60 = ${mins / 60} h.`, render: s => { s.innerHTML = wrap(line(`${mins} min ÷ 60 = ${mins / 60} h`)); } },
  ] : [
    { zh: `${mins} min 里有几个 60？${Math.floor(mins / 60)} 个：${Math.floor(mins / 60)} × 60 = ${Math.floor(mins / 60) * 60}。`, en: `${Math.floor(mins / 60)} hours.`, render: s => { s.innerHTML = wrap(line(`${mins} min = ${Math.floor(mins / 60) * 60} min + ${mins % 60} min`)); } },
    { zh: `剩下 ${mins} − ${Math.floor(mins / 60) * 60} = ${mins % 60} min。所以 ${mins} min = <b>${Math.floor(mins / 60)} h ${mins % 60} min</b>。`, en: `${Math.floor(mins / 60)} h ${mins % 60} min.`, render: s => { s.innerHTML = wrap(line(`${mins} min = ${Math.floor(mins / 60)} h ${mins % 60} min`)); } },
  ];
  /* 从 a 到 b 的时间线分段（先整小时，再分钟） */
  function segs(a, b) { const pts = [{ t: a }]; let cur = toMin(a), end = toMin(b); if (end < cur) end += 1440; while (cur + 60 <= end) { cur += 60; pts.push({ t: toStr(cur), seg: '1 h' }); } if (end > cur) { pts.push({ t: toStr(end), seg: `${end - cur} min` }); } return pts; }
  /* l3dur：{a, b} 字符串 '2.30 pm' */
  S.l3dur = ({ a, b }) => { const pts = segs(a, b), hrs = pts.filter(p => p.seg === '1 h').length, mn = (toMin(b) - toMin(a) + 1440) % 1440 - hrs * 60; return [
    { zh: `画时间线：从 <b>${a}</b> 开始，一小时一小时往后数，到不够 1 小时为止。`, en: 'Draw a timeline and count on in hours.', render: s => { s.innerHTML = wrap(`<div class="center">${timeline(pts.filter(p => p.seg !== undefined && p.seg !== '1 h' ? false : true))}</div>`); } },
    { zh: `数了 <b>${hrs}</b> 个 1 h，到 ${pts[hrs].t}；再到 ${b} 还差 <b>${mn} min</b>。`, en: `${hrs} h and ${mn} min.`, render: s => { s.innerHTML = wrap(`<div class="center">${timeline(pts)}</div>`, line(`${hrs} h ${mn} min`)); } },
    { zh: `所以 ${a} 到 ${b} 是 <b>${hrs} h ${mn} min</b>。`, en: `${hrs} h ${mn} min.`, render: s => { s.innerHTML = wrap(`<div class="center">${timeline(pts)}</div>`, line(`${a} → ${b} = ${hrs} h ${mn} min`)); } },
  ]; };
  /* l3after：{start, h, m, dir:'after'|'before'} */
  S.l3after = ({ start, h, m, dir }) => { const sign = dir === 'after' ? 1 : -1, mid = toStr(toMin(start) + sign * h * 60), end = toStr(toMin(start) + sign * (h * 60 + m)); const pts = dir === 'after' ? [{ t: start }].concat(h ? [{ t: mid, seg: `${h} h` }] : []).concat(m ? [{ t: end, seg: `${m} min` }] : []) : (m ? [{ t: end }] : []).concat(h ? [{ t: mid, seg: m ? `${m} min` : '' }] : []).concat([{ t: start, seg: h ? `${h} h` : `${m} min` }]); const fixed = pts.map((p, i) => i ? p : { t: p.t }); return [
    { zh: `从 <b>${start}</b> 往${dir === 'after' ? '后' : '前'}${h ? `数 ${h} 小时：时针走 ${h} 格，到 <b>${mid}</b>` : ''}${h && m ? '；' : ''}${m ? `再往${dir === 'after' ? '后' : '前'} ${m} 分钟` : ''}。${h && m ? `注意分钟${dir === 'after' ? '超过 60 要进 1 小时' : '不够减要向小时借 60'}。` : ''}`, en: `${h ? h + ' h' : ''} ${m ? m + ' min' : ''} ${dir} ${start}.`, render: s => { s.innerHTML = wrap(`<div class="center">${timeline(fixed)}</div>`); } },
    { zh: `所以是 <b>${end}</b>。${/am/.test(start) !== /am/.test(end) ? '（跨过了中午 12 点或半夜 12 点，am/pm 变了）' : ''}`, en: `${end}.`, render: s => { s.innerHTML = wrap(`<div class="center">${timeline(fixed)}</div>`, line(`${h ? h + ' h ' : ''}${m ? m + ' min ' : ''}${dir} ${start} = ${end}`)); } },
  ]; };
  /* l3tword：{en, zh, lines:[{zh, en, tl?:[a,b] | calc}]} 自定义讲解 */
  S.l3tword = ({ en, zh, lines }) => [{ zh: '先读题，找出时间和要求的问题。', en: 'Read the problem.', render: s => { s.innerHTML = wrap(`<div class="wp-text"><div class="wp-en">${esc(en)}</div><div class="wp-zh">${esc(zh)}</div></div>`); } }].concat(lines.map(l => ({ zh: l.zh, en: l.en || '', render: s => { s.innerHTML = wrap(l.tl ? `<div class="center">${timeline(segs(l.tl[0], l.tl[1]))}</div>` : '', line(l.calc || l.en || '')); } })));
})();
