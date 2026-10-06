/* Level 3 · Unit 14 角：画角、分类讲解、点选直角题型 */
(function () {
  const line = t => `<div class="expand-line">${t}</div>`;
  const wrap = (...parts) => `<div class="l1wrap">${parts.join('')}</div>`;
  const $ = (sel, el) => (el || document).querySelector(sel);
  /* angleSVG(deg, rot, o): 顶点在中心，两条射线，rot 第一条射线方向（度，0 = 向右，逆时针） */
  function angleSVG(deg, rot, o = {}) {
    const W = 150, cx = 40 + (o.cx || 35), cy = 100, r = 80, ang = d => (-d) * Math.PI / 180;
    const p = d => [cx + r * Math.cos(ang(d)), cy + r * Math.sin(ang(d))];
    const [x1, y1] = p(rot), [x2, y2] = p(rot + deg);
    let s = `<line x1="${cx}" y1="${cy}" x2="${x1}" y2="${y1}" stroke="#2b2b3a" stroke-width="2.5"/><line x1="${cx}" y1="${cy}" x2="${x2}" y2="${y2}" stroke="#2b2b3a" stroke-width="2.5"/>`;
    if (deg === 90) { const q = 14, [ax, ay] = [cx + q * Math.cos(ang(rot)), cy + q * Math.sin(ang(rot))], [bx, by] = [cx + q * Math.cos(ang(rot + 90)), cy + q * Math.sin(ang(rot + 90))]; s += `<path d="M${ax} ${ay} L${ax + bx - cx} ${ay + by - cy} L${bx} ${by}" fill="none" stroke="#2b2b3a" stroke-width="2"/>`; }
    else { const ra = 18, [ax, ay] = [cx + ra * Math.cos(ang(rot)), cy + ra * Math.sin(ang(rot))], [bx, by] = [cx + ra * Math.cos(ang(rot + deg)), cy + ra * Math.sin(ang(rot + deg))]; s += `<path d="M${ax} ${ay} A${ra} ${ra} 0 ${deg > 180 ? 1 : 0} 0 ${bx} ${by}" fill="none" stroke="#2b2b3a" stroke-width="1.5"/>`; }
    if (o.square) { const q = 16, [ax, ay] = [cx + q * Math.cos(ang(rot)), cy + q * Math.sin(ang(rot))], [bx, by] = [cx + q * Math.cos(ang(rot + 90)), cy + q * Math.sin(ang(rot + 90))]; s += `<path d="M${ax} ${ay} L${ax + bx - cx} ${ay + by - cy} L${bx} ${by}" fill="none" stroke="#ff9f43" stroke-width="2.5" stroke-dasharray="4 3"/><line x1="${cx}" y1="${cy}" x2="${cx + r * 0.9 * Math.cos(ang(rot + 90))}" y2="${cy + r * 0.9 * Math.sin(ang(rot + 90))}" stroke="#ff9f43" stroke-width="2" stroke-dasharray="6 4"/>`; }
    return `<svg viewBox="0 0 ${W + 60} 160" width="${o.w || 170}" height="${(o.w || 170) * 160 / (W + 60)}" style="overflow:visible">${s}</svg>`;
  }
  /* 多边形 + 可点顶点 pts 0..100 坐标；o.live, o.marks(直角下标), o.hl */
  const isRight = (pts, i) => { const n = pts.length, a = pts[(i + n - 1) % n], b = pts[i], c = pts[(i + 1) % n]; const v1 = [a[0] - b[0], a[1] - b[1]], v2 = [c[0] - b[0], c[1] - b[1]]; return Math.abs(v1[0] * v2[0] + v1[1] * v2[1]) < 1e-6; };
  function polySVG(pts, o = {}) {
    const marks = new Set(o.marks || []), hl = new Set(o.hl || []), n = pts.length;
    let s = `<polygon points="${pts.map(p => p.join(',')).join(' ')}" fill="#f7f5ff" stroke="#2b2b3a" stroke-width="2"/>`;
    pts.forEach((p, i) => { if (marks.has(i)) { const a = pts[(i + n - 1) % n], c = pts[(i + 1) % n]; const u = [a[0] - p[0], a[1] - p[1]], v = [c[0] - p[0], c[1] - p[1]]; const nu = Math.hypot(...u), nv = Math.hypot(...v), q = 7; const ux = u[0] / nu * q, uy = u[1] / nu * q, vx = v[0] / nv * q, vy = v[1] / nv * q; s += `<path d="M${p[0] + ux} ${p[1] + uy} L${p[0] + ux + vx} ${p[1] + uy + vy} L${p[0] + vx} ${p[1] + vy}" fill="none" stroke="#d35400" stroke-width="2"/>`; } if (o.live) s += `<circle class="vtx ${hl.has(i) ? 'on' : ''}" data-i="${i}" cx="${p[0]}" cy="${p[1]}" r="6" fill="${hl.has(i) ? '#ff9f43' : '#fff'}" stroke="#6c5ce7" stroke-width="2" style="cursor:pointer"/>`; });
    return `<svg class="polyfig" viewBox="-6 -6 112 112" width="${o.w || 190}" height="${o.w || 190}">${s}</svg>`;
  }
  window.L3.angleSVG = angleSVG; window.L3.polySVG = polySVG; window.L3.isRight = isRight;

  const S = window.StepKinds;
  const NAME = { acute: ['锐角 acute angle', '比直角小'], right: ['直角 right angle', '正好是一个方角'], obtuse: ['钝角 obtuse angle', '比直角大'] };
  /* l3angle：{deg, rot} */
  S.l3angle = ({ deg, rot }) => { const type = deg < 90 ? 'acute' : deg === 90 ? 'right' : 'obtuse'; return [
    { zh: `先找<b>直角</b>做标准：直角是正方形的角（90°），像书的角。把一个直角放在这个角的顶点上比一比。`, en: 'Compare with a right angle (a square corner).', render: s => { s.innerHTML = wrap(`<div class="center">${angleSVG(deg, rot, { square: true })}</div>`); } },
    { zh: deg === 90 ? `两条边正好和直角重合，这是<b>直角</b>（right angle），标一个小方块。` : deg < 90 ? `这个角的张口<b>比直角小</b>，是<b>锐角</b>（acute angle）。` : `这个角的张口<b>比直角大</b>，是<b>钝角</b>（obtuse angle）。`, en: `${type} angle.`, render: s => { s.innerHTML = wrap(`<div class="center">${angleSVG(deg, rot, { square: deg !== 90 })}</div>`, line(NAME[type][0])); } },
  ]; };
  /* l3rightfig：{pts} */
  S.l3rightfig = ({ pts }) => { const rights = pts.map((_, i) => i).filter(i => isRight(pts, i)); return [
    { zh: `这个图形有 ${pts.length} 个角。一个一个看：哪个角是正方形的角（两条边互相<b>垂直</b>）？`, en: 'Check each corner.', render: s => { s.innerHTML = wrap(`<div class="center">${polySVG(pts, { live: false })}</div>`); } },
    { zh: `能放进一个小方块的是直角：一共 <b>${rights.length}</b> 个，标上小方块。斜的边碰到的角不是直角。`, en: `${rights.length} right angles.`, render: s => { s.innerHTML = wrap(`<div class="center">${polySVG(pts, { marks: rights })}</div>`, line(`${rights.length} 个直角`)); } },
  ]; };

  /* 题型 l3rightpick：点顶点标直角 q = { id, type:'l3rightpick', pts, answer:[idx] } */
  window.QTypes.l3rightpick = q => {
    let sel = new Set();
    const draw = box => { const host = $('#pf', box); host.innerHTML = polySVG(q.pts, { live: true, hl: [...sel], marks: [...sel] }); host.querySelectorAll('.vtx').forEach(c => c.onclick = () => { if (box.dataset.locked) return; const i = +c.dataset.i; sel.has(i) ? sel.delete(i) : sel.add(i); draw(box); }); };
    const same = arr => arr.length === q.answer.length && arr.every(i => q.answer.includes(i));
    return {
      prompt: { zh: '点图形的顶点，把所有直角标出来', en: 'Mark all the right angles in the figure' }, stage: '',
      custom: {
        html: () => `<div class="center"><div id="pf"></div><div class="sub">👆 点顶点上的小圆点，标出直角（再点一次取消）</div><div class="center mt"><button class="btn secondary small" id="clearAll">清空</button> <button class="btn ok" id="submit">检查 ✔</button></div></div>`,
        bind: (box, submit) => { delete box.dataset.locked; sel = new Set(); draw(box); $('#clearAll', box).onclick = () => { if (box.dataset.locked) return; sel = new Set(); draw(box); }; $('#submit', box).onclick = () => submit(); },
        value: () => sel.size ? JSON.stringify([...sel].sort((a, b) => a - b)) : null,
        markWrong: (box, val) => { sel = new Set(JSON.parse(val)); draw(box); $('#pf', box).classList.add('badf'); },
        showAnswer: box => { sel = new Set(q.answer); draw(box); box.dataset.locked = '1'; $('#submit', box).disabled = true; $('#clearAll', box).disabled = true; },
        lock: box => { box.dataset.locked = '1'; $('#submit', box).disabled = true; $('#clearAll', box).disabled = true; },
        restore: (box, val, status) => { try { sel = new Set(JSON.parse(val || '[]')); } catch (e) { sel = new Set(); } draw(box); box.dataset.locked = '1'; $('#submit', box).disabled = true; if (status === 'bad') $('#pf', box).classList.add('badf'); },
      },
      hint: { zh: '直角是正方形的角，两条边一横一竖互相垂直。斜边碰到的角不算。', en: 'A right angle is a square corner.' },
      answerText: `${q.answer.length} 个直角`, check: v => { try { return same(JSON.parse(v)); } catch (e) { return false; } },
      answerDisplay: v => { try { return JSON.parse(v).length + ' 个'; } catch (e) { return v; } },
      explainKind: 'l3rightfig', n: { pts: q.pts },
    };
  };
})();
