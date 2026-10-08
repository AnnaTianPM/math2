/* Level 4 · Unit 15  时间：秒针、12/24 小时制、时间线求时长/起止 讲解动画 */
(function () {
  const line = t => `<div class="expand-line">${t}</div>`;
  const wrap = (...parts) => `<div class="l1wrap">${parts.join('')}</div>`;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '"': '&quot;', '>': '&gt;' }[c]));
  const C = window.ClockUI, pad = n => String(n).padStart(2, '0');
  /* 解析 "12 20" | "7.45 pm" | "08 05" → 分钟（0..1439） */
  function toM(s) { s = String(s).trim(); let m = s.match(/^(\d{1,2})[ .:](\d{2})\s*(am|pm)?$/i); if (!m) return NaN; let h = +m[1], mi = +m[2]; const ap = m[3] && m[3].toLowerCase(); if (ap) { if (ap === 'am' && h === 12) h = 0; if (ap === 'pm' && h !== 12) h += 12; } return h * 60 + mi; }
  const f24 = m => { m = ((m % 1440) + 1440) % 1440; return `${pad(Math.floor(m / 60))} ${pad(m % 60)}`; };
  const f12 = m => { m = ((m % 1440) + 1440) % 1440; let h = Math.floor(m / 60); const ap = h >= 12 ? 'pm' : 'am'; h %= 12; if (h === 0) h = 12; return `${h}.${pad(m % 60)} ${ap}`; };
  const fmt = (m, k) => k === '24' ? f24(m) : f12(m);
  /* 时间线 pts=[{t, seg?}] 箭头在上 */
  function timeline(pts, o = {}) {
    const W = 560, x0 = 40, x1 = 520, y = 46, n = pts.length, X = i => x0 + (x1 - x0) * i / Math.max(1, n - 1);
    let s = `<line x1="${x0}" y1="${y}" x2="${x1}" y2="${y}" stroke="#333" stroke-width="2"/>`;
    pts.forEach((p, i) => { const x = X(i); s += `<line x1="${x}" y1="${y - 8}" x2="${x}" y2="${y + 8}" stroke="#333" stroke-width="2"/><text x="${x}" y="${y + 26}" text-anchor="middle" font-size="12" font-weight="700" fill="#333">${esc(p.t)}</text>`; if (i > 0 && p.seg) { const xa = X(i - 1), xb = x, back = o.back; const mx = (xa + xb) / 2; s += `<path d="M${back ? xb : xa} ${y - 10} Q${mx} ${y - 34} ${back ? xa : xb} ${y - 10}" fill="none" stroke="#d35400" stroke-width="1.8" marker-end="url(#tla)"/><text x="${mx}" y="${y - 26}" text-anchor="middle" font-size="13" font-weight="800" fill="#d35400">${esc(p.seg)}</text>`; } });
    return `<svg viewBox="0 0 ${W} 80" width="${W}" style="max-width:100%;height:auto"><defs><marker id="tla" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 Z" fill="#d35400"/></marker></defs>${s}</svg>`;
  }
  /* 从 a 到 b：整小时跳 + 剩余分钟（和书一致） */
  function hops(a, b, k) { const pts = [{ t: fmt(a, k) }]; let cur = a; const end = b < a ? b + 1440 : b; while (cur + 60 <= end) { cur += 60; pts.push({ t: fmt(cur, k), seg: '1 h' }); } if (end > cur) pts.push({ t: fmt(end, k), seg: `${end - cur} min` }); return pts; }
  const durStr = d => { const h = Math.floor(d / 60), m = d % 60; return h && m ? `${h} h ${m} min` : h ? `${h} h` : `${m} min`; };
  /* 带秒针的钟 */
  function clockSec(h, m, sec, o = {}) {
    const base = C.clockSVG({ h, m }, { w: o.w || 150 });
    const deg = (sec * 6 - 90) * Math.PI / 180, x = 100 + 82 * Math.cos(deg), y = 100 + 82 * Math.sin(deg);
    let extra = `<line x1="100" y1="100" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="#e74c3c" stroke-width="2" stroke-linecap="round"/><circle cx="100" cy="100" r="4" fill="#e74c3c"/>`;
    if (o.arc !== undefined) { const a0 = (o.arc * 6 - 90) * Math.PI / 180, a1 = deg; let sweep = ((sec - o.arc) * 6 + 360) % 360; if (sweep === 0) sweep = 360; extra = `<path d="M100 100 L${(100 + 86 * Math.cos(a0)).toFixed(1)} ${(100 + 86 * Math.sin(a0)).toFixed(1)} A86 86 0 ${sweep > 180 ? 1 : 0} 1 ${(100 + 86 * Math.cos(a1)).toFixed(1)} ${(100 + 86 * Math.sin(a1)).toFixed(1)} Z" fill="rgba(255,159,67,.3)"/>` + extra; }
    return base.replace(/<circle cx="100" cy="100" r="5"[^>]*\/>/, m0 => extra + m0);
  }
  const S = window.StepKinds;
  /* l4secs：{from, to} 秒针从数字 from 到 to（h,m 固定） */
  S.l4secs = ({ from, to, h, m }) => { const n = ((to - from) + 12) % 12 || 12, sec = n * 5; const two = (a, b) => `<div class="fig-row">${a}<div style="font-size:24px;font-weight:800;color:#7a7a8c">→</div>${b}</div>`; return [
    { zh: `红色的细长针是<b>秒针</b>（second hand）。秒针走<b>一个数字</b>是 5 秒，走一圈是 60 秒 = 1 分钟。`, en: 'The thin red hand is the second hand. Each number is 5 seconds.', render: s => { s.innerHTML = wrap(`<div class="center">${two(clockSec(h, m, from * 5), clockSec(h, m, to * 5))}</div>`); } },
    { zh: `左边秒针指着 <b>${from}</b>，右边指着 <b>${to}</b>。从 ${from} 顺时针数到 ${to}，走了 <b>${n}</b> 个数字。`, en: `From ${from} to ${to}: ${n} numbers.`, render: s => { s.innerHTML = wrap(`<div class="center">${two(clockSec(h, m, from * 5), clockSec(h, m, to * 5, { arc: from * 5 }))}</div>`, line(`${n} 个数字`)); } },
    { zh: `${n} × 5 = <b>${sec}</b> 秒。`, en: `${n} × 5 = ${sec} s.`, render: s => { s.innerHTML = wrap(`<div class="center">${clockSec(h, m, to * 5, { arc: from * 5, w: 200 })}</div>`, line(`${n} × 5 = ${sec} s`)); } },
  ]; };
  /* l4to24：{t:'8.25 am'} */
  S.l4to24 = ({ t }) => { const m = toM(t), h12 = +t.split('.')[0], ap = t.split(' ')[1], h24 = Math.floor(m / 60); return [
    { zh: `24 小时制从 00 00（午夜）数到 23 59，不用 am / pm。<b>上午（am）</b>的小时数基本不变，<b>下午（pm）</b>的小时数要<b>加 12</b>。特别：12 am 是 00，12 pm 还是 12。`, en: 'pm: add 12 to the hour. 12 am → 00, 12 pm → 12.', render: s => { s.innerHTML = wrap(`<div class="center"><table class="pv4"><tr><th>12 小时制</th><th>24 小时制</th></tr><tr><td>12.00 am</td><td>00 00</td></tr><tr><td>1.00 am … 11.00 am</td><td>01 00 … 11 00</td></tr><tr><td>12.00 pm</td><td>12 00</td></tr><tr><td>1.00 pm … 11.00 pm</td><td>13 00 … 23 00</td></tr></table></div>`); } },
    { zh: `${t}：${ap === 'pm' ? (h12 === 12 ? '12 pm 的小时数还是 12' : `下午，${h12} + 12 = ${h24}`) : (h12 === 12 ? '12 am 是午夜，小时写 00' : `上午，小时数 ${h12} 不变，写两位 ${pad(h24)}`)}；分钟不变。写成 <b>${f24(m)}</b>（小时和分钟中间空一格，不写点）。`, en: `${t} = ${f24(m)}.`, render: s => { s.innerHTML = wrap(line(`${t} = ${f24(m)}`)); } },
  ]; };
  /* l4to12：{t:'18 36'} */
  S.l4to12 = ({ t }) => { const m = toM(t), h24 = Math.floor(m / 60); return [
    { zh: `24 小时制的小时数 <b>${pad(h24)}</b>：${h24 < 12 ? '小于 12，是<b>上午 am</b>' : '12 或更大，是<b>下午 pm</b>'}。${h24 > 12 ? `小时数减 12：${h24} − 12 = ${h24 - 12}` : h24 === 0 ? '00 就是 12 am' : h24 === 12 ? '12 就是 12 pm' : `小时数 ${h24} 不变`}。`, en: `${h24 < 12 ? 'am' : 'pm'}${h24 > 12 ? `, ${h24} − 12 = ${h24 - 12}` : ''}.`, render: s => { s.innerHTML = wrap(line(`${t} → ${h24 < 12 ? 'am' : 'pm'}`)); } },
    { zh: `分钟不变，中间用点：<b>${f12(m)}</b>。`, en: `${t} = ${f12(m)}.`, render: s => { s.innerHTML = wrap(line(`${t} = ${f12(m)}`)); } },
  ]; };
  /* l4dur：{a, b, k} 求时长 */
  S.l4dur = ({ a, b, k }) => { const A = toM(a), B = toM(b), pts = hops(A, B, k), hrs = pts.filter(p => p.seg === '1 h').length, mn = ((B - A) + 1440) % 1440 - hrs * 60, d = ((B - A) + 1440) % 1440; return [
    { zh: `画时间线：从 <b>${a}</b> 到 <b>${b}</b>。先一小时一小时往后跳，跳到不够 1 小时为止。`, en: 'Count on in hours, then minutes.', render: s => { s.innerHTML = wrap(`<div class="center">${timeline(pts.slice(0, hrs + 1))}</div>`); } },
    { zh: `跳了 <b>${hrs}</b> 个 1 h${hrs ? `，到 ${pts[hrs].t}` : ''}${mn ? `；再到 ${b} 还差 <b>${mn} min</b>` : ''}。`, en: `${hrs} h${mn ? ` + ${mn} min` : ''}.`, render: s => { s.innerHTML = wrap(`<div class="center">${timeline(pts)}</div>`, line(`${hrs ? `${hrs} h` : ''}${hrs && mn ? ' + ' : ''}${mn ? `${mn} min` : ''}`)); } },
    { zh: `所以时长是 <b>${durStr(d)}</b>。`, en: durStr(d), render: s => { s.innerHTML = wrap(`<div class="center">${timeline(pts)}</div>`, line(`${a} → ${b} = ${durStr(d)}`)); } },
  ]; };
  /* l4endstart：{t, dur, mode:'end'|'start', k} */
  S.l4endstart = ({ t, dur, mode, k }) => { const T = toM(t), end = mode === 'end' ? T + dur : T - dur, ans = fmt(end, k); const h = Math.floor(dur / 60), mn = dur % 60;
    const fwd = mode === 'end'; const pts = []; let cur = T; pts.push({ t: fmt(cur, k) }); for (let i = 0; i < h; i++) { cur += fwd ? 60 : -60; pts.push({ t: fmt(cur, k), seg: '1 h' }); } if (mn) { cur += fwd ? mn : -mn; pts.push({ t: fmt(cur, k), seg: `${mn} min` }); }
    const shown = fwd ? pts : pts.slice().reverse().map((p, i, arr) => ({ t: p.t, seg: i ? arr[i - 1].seg : undefined }));
    return [
      { zh: fwd ? `从 <b>${t}</b> 开始，往后数 ${durStr(dur)}：先一小时一小时加，再加分钟。` : `已知结束时间 <b>${t}</b>，往<b>回</b>数 ${durStr(dur)}：先一小时一小时减，再减分钟。`, en: fwd ? `Count on ${durStr(dur)} from ${t}.` : `Count back ${durStr(dur)} from ${t}.`, render: s => { s.innerHTML = wrap(`<div class="center">${timeline(fwd ? [pts[0]] : [pts[0]])}</div>`); } },
      ...pts.slice(1).map((p, i) => ({ zh: `${fwd ? '加' : '减'} ${p.seg}：到 <b>${p.t}</b>。`, en: `${p.seg} → ${p.t}.`, render: s => { const part = pts.slice(0, i + 2); s.innerHTML = wrap(`<div class="center">${timeline(fwd ? part : part.slice().reverse().map((x, j, arr) => ({ t: x.t, seg: j ? arr[j - 1].seg : undefined })), { back: !fwd })}</div>`, line(p.t)); } })),
      { zh: `所以${fwd ? '结束' : '开始'}时间是 <b>${ans}</b>。`, en: ans, render: s => { s.innerHTML = wrap(`<div class="center">${timeline(shown, { back: !fwd })}</div>`, line(ans)); } },
    ]; };
  window.L4TIME = { toM, f24, f12, fmt, timeline, hops, durStr, clockSec };
})();
