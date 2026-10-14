/* Level 5 · Unit 6  三角形面积：通用图形 SVG + 讲解 */
(function () {
  const line = t => `<div class="expand-line">${t}</div>`;
  const wrap = (...parts) => `<div class="l1wrap">${parts.join('')}</div>`;
  const INK = '#2b2b3a', OR = '#ff7f2a';
  /* fig({pts:{A:[x,y]}, polys:[{pts:['A','B','C'], fill?, hl?}], segs:[[a,b,dashed?,color?]], rt:[[corner, p1, p2]], labels:[{at|x,y, t, dx,dy}], dims:[{from,to,t,off}], vb?}) 坐标单位任意，自动算 viewBox */
  function fig(o) {
    const P = o.pts, X = p => Array.isArray(p) ? p : P[p];
    let s = '';
    (o.polys || []).forEach(pg => { s += `<polygon points="${pg.pts.map(p => X(p).join(',')).join(' ')}" fill="${pg.fill || '#fff'}" stroke="${pg.hl ? OR : INK}" stroke-width="${pg.hl ? 3 : 1.8}" stroke-linejoin="round"/>`; });
    (o.segs || []).forEach(([a, b, d, c]) => { const A = X(a), B = X(b); s += `<line x1="${A[0]}" y1="${A[1]}" x2="${B[0]}" y2="${B[1]}" stroke="${c || INK}" stroke-width="${c ? 3 : 1.6}" ${d ? 'stroke-dasharray="5 4"' : ''} stroke-linecap="round"/>`; });
    (o.rt || []).forEach(([c, p1, p2]) => { const C = X(c), u = X(p1), v = X(p2); const n = (a, b) => { const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1; return [dx / L * 9, dy / L * 9]; }; const a = n(C, u), b = n(C, v); s += `<path d="M${C[0] + a[0]} ${C[1] + a[1]} L${C[0] + a[0] + b[0]} ${C[1] + a[1] + b[1]} L${C[0] + b[0]} ${C[1] + b[1]}" fill="none" stroke="${INK}" stroke-width="1.3"/>`; });
    (o.dims || []).forEach(d => { const A = X(d.from), B = X(d.to); const dx = B[0] - A[0], dy = B[1] - A[1], L = Math.hypot(dx, dy) || 1, nx = -dy / L * (d.off || 14), ny = dx / L * (d.off || 14); s += `<line x1="${A[0] + nx}" y1="${A[1] + ny}" x2="${B[0] + nx}" y2="${B[1] + ny}" stroke="#555" stroke-width="1.2" marker-start="url(#dm)" marker-end="url(#dm)"/><text x="${(A[0] + B[0]) / 2 + nx * 1.8}" y="${(A[1] + B[1]) / 2 + ny * 1.8 + 4}" font-size="13" font-weight="700" fill="${d.hl ? OR : INK}" text-anchor="middle">${d.t}</text>`; });
    (o.labels || []).forEach(l => { const p = l.at ? X(l.at) : [l.x, l.y]; s += `<text x="${p[0] + (l.dx || 0)}" y="${p[1] + (l.dy || 0) + 4}" font-size="${l.size || 14}" font-weight="700" fill="${l.hl ? OR : INK}" text-anchor="middle" ${l.rot ? `transform="rotate(${l.rot} ${p[0] + (l.dx || 0)} ${p[1] + (l.dy || 0)})"` : ''}>${l.t}</text>`; });
    const xs = Object.values(P).map(p => p[0]), ys = Object.values(P).map(p => p[1]);
    const vb = o.vb || [Math.min(...xs) - 56, Math.min(...ys) - 30, Math.max(...xs) - Math.min(...xs) + 112, Math.max(...ys) - Math.min(...ys) + 60];
    return `<svg viewBox="${vb.join(' ')}" width="${Math.min(vb[2], o.w || 360)}" style="max-width:100%;height:auto;overflow:visible"><defs><marker id="dm" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto-start-reverse"><path d="M0 0 L6 3 L0 6 Z" fill="#555"/></marker></defs>${s}</svg>`;
  }
  const S = window.StepKinds;
  /* l5basehgt：{fig(o), given:'height'|'base', gseg:[a,b], ans:[a,b], vertex} */
  S.l5basehgt = ({ figO, given, gseg, ans }) => { const other = given === 'height' ? 'base' : 'height'; const f = o => fig(Object.assign({}, figO, o)); return [
    { zh: `三角形的<b>底（base）</b>和<b>高（height）</b>互相<b>垂直</b>（有直角记号）。高从一个顶点出发，垂直落到对边（或对边的延长线）上。`, en: 'Base and height are perpendicular to each other.', render: s => { s.innerHTML = wrap(`<div class="center">${f({})}</div>`); } },
    { zh: `图上标了 <b>${given}</b> 是 ${gseg.join('')}。和它垂直（直角记号那条边）的是 <b>${ans.join('')}</b>，所以 ${other} 是 <b>${ans.join('')}</b>（写成 ${ans.slice().reverse().join('')} 也可以）。`, en: `The ${other} is ${ans.join('')}.`, render: s => { s.innerHTML = wrap(`<div class="center">${f({ segs: (figO.segs || []).concat([[ans[0], ans[1], false, OR]]) })}</div>`, line(`${other} = ${ans.join('')}`)); } },
  ]; };
  /* l5triarea：{figO, b, h} */
  S.l5triarea = ({ figO, b, h }) => { const f = o => fig(Object.assign({}, figO, o)); return [
    { zh: `先找一对<b>互相垂直</b>的底和高：底 = <b>${b}</b> cm，高 = <b>${h}</b> cm${figO.note ? `（${figO.note}）` : ''}。`, en: `Base ${b} cm, height ${h} cm.`, render: s => { s.innerHTML = wrap(`<div class="center">${f({})}</div>`, line(`base = ${b}, height = ${h}`)); } },
    { zh: `面积 = ½ × 底 × 高 = ½ × ${b} × ${h} = <b>${b * h / 2}</b> cm²。`, en: `½ × ${b} × ${h} = ${b * h / 2} cm².`, render: s => { s.innerHTML = wrap(`<div class="center">${f({})}</div>`, line(`½ × ${b} × ${h} = ${b * h / 2} cm²`)); } },
  ]; };
  /* l5shaded：{figO, steps:[{zh,en,expr}]} */
  S.l5shaded = ({ figO, steps }) => [{ zh: '先看阴影三角形：它的底是哪条边、对应的高是多少？高和底要垂直，高不一定在三角形里面。', en: 'Find the base and its perpendicular height.', render: s => { s.innerHTML = wrap(`<div class="center">${fig(figO)}</div>`); } }].concat(steps.map((st, i) => ({ zh: st.zh, en: st.en || st.expr, render: s => { s.innerHTML = wrap(`<div class="center">${fig(figO)}</div>`, ...steps.slice(0, i + 1).map((x, j) => line(j === i ? `<b>${x.expr}</b>` : x.expr))); } })));
  window.L5TRI = { fig };
})();
