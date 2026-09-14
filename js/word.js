/* 应用题（加减）：bar model 画图讲解 + 题型
 * q = { id, type:'word', en, zh, model, ans, sentence:{en,zh}, unit?:'$' }
 * model:
 *   { kind:'add', parts:[{label, v}, ...] }                       部分+部分=整体（求整体）
 *   { kind:'sub', whole:{label,v}, known:{label,v}, unknown:{label} } 整体-部分（求另一部分）
 *   { kind:'cmp', base:{label,v}, other:{label}, diff, otherIs:'more'|'less' } 比较（求另一个）
 */
(function () {
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const PURPLE = '#6c5ce7', ORANGE = '#ff9f43', GREY = '#bbb';

  function answerOf(q) {
    const m = q.model;
    if (m.kind === 'add') return m.parts.reduce((s, p) => s + p.v, 0);
    if (m.kind === 'sub') return m.whole.v - m.known.v;
    return m.otherIs === 'more' ? m.base.v + m.diff : m.base.v - m.diff;
  }
  function equationOf(q) {
    const m = q.model, ans = answerOf(q);
    if (m.kind === 'add') return { expr: m.parts.map(p => p.v).join(' + '), op: '+', ans };
    if (m.kind === 'sub') return { expr: `${m.whole.v} − ${m.known.v}`, op: '-', ans };
    return { expr: m.otherIs === 'more' ? `${m.base.v} + ${m.diff}` : `${m.base.v} − ${m.diff}`, op: m.otherIs === 'more' ? '+' : '-', ans };
  }

  /* ---------- bar model SVG ---------- */
  // opts: { showQ, showAns, hl }  宽度按值比例，最小宽度保证可读
  function bar(q, opts = {}) {
    const m = q.model, ans = answerOf(q);
    const W = 520, H = 150, x0 = 90, barH = 40;
    let s = '';
    const box = (x, y, w, h, fill, label, dashed) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" fill-opacity=".18" stroke="${fill}" stroke-width="2.5" rx="6" ${dashed ? 'stroke-dasharray="6 4"' : ''}/><text x="${x + w / 2}" y="${y + h / 2 + 7}" text-anchor="middle" font-size="20" font-weight="700" fill="#2b2b3a">${label}</text>`;
    const cap = (x, y, t, color = '#7a7a8c') => `<text x="${x}" y="${y}" text-anchor="middle" font-size="15" font-weight="600" fill="${color}">${esc(t)}</text>`;
    const brace = (x1, x2, y, up, label, color = ORANGE) => {
      const mid = (x1 + x2) / 2, d = up ? -10 : 10;
      return `<path d="M${x1} ${y} v${d} H${x2} v${-d}" fill="none" stroke="${color}" stroke-width="2.5"/><text x="${mid}" y="${y + (up ? -18 : 30)}" text-anchor="middle" font-size="22" font-weight="800" fill="${color}">${label}</text>`;
    };
    if (m.kind === 'add') {
      const total = ans, avail = W - x0 - 20;
      let x = x0;
      const y = 40;
      m.parts.forEach((p, i) => {
        const w = Math.max(70, avail * p.v / total);
        s += box(x, y, w, barH, PURPLE, p.v) + cap(x + w / 2, y - 8, p.label, '#4b3fc4');
        p._x = x; p._w = w; x += w;
      });
      if (opts.showQ) s += brace(x0, x, y + barH + 6, false, opts.showAns ? ans : '?');
    } else if (m.kind === 'sub') {
      const total = m.whole.v, avail = W - x0 - 20;
      const y = 60;
      const w1 = Math.max(70, avail * m.known.v / total), w2 = Math.max(70, avail - w1);
      s += brace(x0, x0 + w1 + w2, y - 6, true, m.whole.v, '#4b3fc4');
      s += box(x0, y, w1, barH, PURPLE, m.known.v) + cap(x0 + w1 / 2, y + barH + 20, m.known.label, '#4b3fc4');
      s += box(x0 + w1, y, w2, barH, ORANGE, opts.showQ ? (opts.showAns ? ans : '?') : '', !opts.showAns) + cap(x0 + w1 + w2 / 2, y + barH + 20, m.unknown.label, ORANGE);
    } else {
      const big = Math.max(m.base.v, ans), avail = W - x0 - 20;
      const wBase = Math.max(70, avail * m.base.v / big), wOther = Math.max(70, avail * ans / big);
      const yA = 30, yB = 90;
      const rows = m.otherIs === 'more' ? [[m.other.label, wOther, true, yA], [m.base.label, wBase, false, yB]] : [[m.base.label, wBase, false, yA], [m.other.label, wOther, true, yB]];
      rows.forEach(([label, w, isOther, y]) => {
        s += `<text x="${x0 - 10}" y="${y + barH / 2 + 7}" text-anchor="end" font-size="17" font-weight="700" fill="${isOther ? ORANGE : '#4b3fc4'}">${esc(label)}</text>`;
        s += box(x0, y, w, barH, isOther ? ORANGE : PURPLE, isOther ? (opts.showQ ? (opts.showAns ? ans : '?') : '') : m.base.v, isOther && !opts.showAns);
      });
      // 差
      const xs = Math.min(wBase, wOther), xl = Math.max(wBase, wOther);
      const yLong = m.otherIs === 'more' ? yA : yB;
      const yShort = m.otherIs === 'more' ? yB : yA;
      s += `<path d="M${x0 + xs} ${yShort + barH + 4} v8 H${x0 + xl} v-8" fill="none" stroke="${ORANGE}" stroke-width="2.5"/><text x="${x0 + (xs + xl) / 2}" y="${yShort + barH + 30}" text-anchor="middle" font-size="18" font-weight="800" fill="${ORANGE}">${m.diff} ${m.otherIs}</text>`;
      if (m.otherIs === 'less') { /* 差在下面 */ }
    }
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" style="max-width:100%;height:auto">${s}</svg>`;
  }

  window.StepKinds.word = q => {
    const m = q.model, ans = answerOf(q), eq = equationOf(q);
    const colKind = eq.op === '+' ? 'coladd' : 'colsub';
    const nums = eq.expr.split(/ [+−] /).map(Number);
    const textBlock = `<div class="wp-text"><div class="wp-en">${esc(q.en)}</div><div class="wp-zh">${esc(q.zh)}</div></div>`;
    const sentence = (fill) => `<div class="expand-line">${esc(q.sentence.en).replace('___', `<b style="color:${ORANGE}">${fill}</b>`)}</div>`;
    const steps = [
      { zh: '先把题目读一遍，找出已知的数和要求的问题。', en: 'Read the problem. What do we know? What do we need to find?', render: s => { s.innerHTML = textBlock; } },
    ];
    if (m.kind === 'add') {
      steps.push({ zh: `已知：${m.parts.map(p => `${p.label} ${p.v}`).join('，')}。要求的是<b>一共 / altogether</b>，就是把两部分合起来。`, en: `We know ${m.parts.map(p => `${p.label} = ${p.v}`).join(', ')}. We want the total.`, render: s => { s.innerHTML = textBlock + bar(q, {}); } });
      steps.push({ zh: '画 bar model：每一部分画一条，接在一起，整条的长度就是“?”。', en: 'Draw a bar for each part. The whole bar is "?".', render: s => { s.innerHTML = bar(q, { showQ: true }); } });
    } else if (m.kind === 'sub') {
      steps.push({ zh: `已知：一共 ${m.whole.v}，其中 ${m.known.label} 是 ${m.known.v}。要求的是<b>另一部分</b>（${m.unknown.label}）。`, en: `Total is ${m.whole.v}. ${m.known.label} is ${m.known.v}. Find ${m.unknown.label}.`, render: s => { s.innerHTML = textBlock + bar(q, {}); } });
      steps.push({ zh: '画 bar model：整条是总数，切成两段，一段是已知的，另一段就是“?”。', en: 'The whole bar is the total. One part is known; the other is "?".', render: s => { s.innerHTML = bar(q, { showQ: true }); } });
    } else {
      const moreZh = m.otherIs === 'more' ? '多' : '少';
      steps.push({ zh: `已知：${m.base.label} 有 ${m.base.v}。${m.other.label} 比 ${m.base.label} <b>${moreZh} ${m.diff}</b>（${m.diff} ${m.otherIs}）。要求 ${m.other.label} 有多少。`, en: `${m.base.label} has ${m.base.v}. ${m.other.label} has ${m.diff} ${m.otherIs}. Find ${m.other.label}.`, render: s => { s.innerHTML = textBlock + bar(q, {}); } });
      steps.push({ zh: `画 bar model：两条并排比。${m.otherIs === 'more' ? `${m.other.label} 那条要长一截，长出来的部分就是 ${m.diff}。` : `${m.other.label} 那条要短一截，短的部分就是 ${m.diff}。`}“${moreZh}”所以用${m.otherIs === 'more' ? '加' : '减'}法。`, en: `Draw two bars. "${m.otherIs}" means ${m.otherIs === 'more' ? 'add' : 'subtract'}.`, render: s => { s.innerHTML = bar(q, { showQ: true }); } });
    }
    steps.push({ zh: `列算式：<b>${eq.expr} = ?</b>`, en: `Write the equation: ${eq.expr} = ?`, render: s => { s.innerHTML = bar(q, { showQ: true }) + `<div class="expand-line">${eq.expr} = ?</div>`; } });
    // 竖式：两个数直接用 coladd/colsub 的最后一步；三个数分两步
    if (nums.length === 2) {
      const sub = window.StepKinds[colKind]({ a: nums[0], b: nums[1] });
      const last = sub[sub.length - 1];
      steps.push({ zh: `列竖式算：${eq.expr} = <b>${ans}</b>（想看每一步？做完题点“看讲解”里的竖式讲解）。`, en: `Work it out: ${eq.expr} = ${ans}.`, render: s => { last.render(s); s.innerHTML += `<div class="expand-line">${eq.expr} = ${ans}</div>`; } });
    } else {
      const mid = nums[0] + nums[1];
      const s1 = window.StepKinds.coladd({ a: nums[0], b: nums[1] }); const l1 = s1[s1.length - 1];
      const s2 = window.StepKinds.coladd({ a: mid, b: nums[2] }); const l2 = s2[s2.length - 1];
      steps.push({ zh: `先算前两个：${nums[0]} + ${nums[1]} = <b>${mid}</b>`, en: `First ${nums[0]} + ${nums[1]} = ${mid}.`, render: s => { l1.render(s); s.innerHTML += `<div class="expand-line">${nums[0]} + ${nums[1]} = ${mid}</div>`; } });
      steps.push({ zh: `再加第三个：${mid} + ${nums[2]} = <b>${ans}</b>`, en: `Then ${mid} + ${nums[2]} = ${ans}.`, render: s => { l2.render(s); s.innerHTML += `<div class="expand-line">${mid} + ${nums[2]} = ${ans}</div>`; } });
    }
    steps.push({ zh: `写答句：${esc(q.sentence.zh).replace('___', `<b>${ans}</b>`)}`, en: q.sentence.en.replace('___', String(ans)), render: s => { s.innerHTML = bar(q, { showQ: true, showAns: true }) + sentence(ans); } });
    return steps;
  };

  window.QTypes.word = q => {
    const ans = answerOf(q), eq = equationOf(q);
    const sent = esc(q.sentence.en).replace('___', `<input class="blank" id="ans" data-key="a" type="text" inputmode="numeric" autocomplete="off" maxlength="4" style="width:4em">`);
    return {
      prompt: { zh: '读题，算一算，把答案填进答句', en: 'Solve the word problem' },
      stage: `<div class="wp-text"><div class="wp-en">${esc(q.en)}</div><div class="wp-zh"><button class="speak small-speak" id="zhToggle" title="显示/隐藏中文">中</button><span id="zhText" hidden>${esc(q.zh)}</span></div></div>`,
      custom: {
        html: () => `<div class="fill">${sent}</div><div class="center mt"><button class="btn ok" id="submit">检查 ✔</button></div>`,
        bind: (box, submit) => {
          const inp = box.querySelector('#ans'); inp.onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); submit(); } }; box.querySelector('#submit').onclick = () => submit(); inp.focus({ preventScroll: true });
          const t = box.querySelector('#zhToggle'); if (t) t.onclick = () => { const z = box.querySelector('#zhText'); z.hidden = !z.hidden; };
        },
        value: box => { const v = box.querySelector('#ans').value.trim(); return v || null; },
        markWrong: box => { const i = box.querySelector('#ans'); i.classList.add('badf'); i.select(); },
        showAnswer: box => { const i = box.querySelector('#ans'); i.value = ans; i.classList.remove('badf'); i.classList.add('good'); i.disabled = true; box.querySelector('#submit').disabled = true; },
        lock: box => { box.querySelector('#ans').disabled = true; box.querySelector('#submit').disabled = true; },
        restore: (box, val, status) => { const i = box.querySelector('#ans'); i.value = val || ''; i.classList.add(status === 'bad' ? 'badf' : 'good'); i.disabled = true; box.querySelector('#submit').disabled = true; const t = box.querySelector('#zhToggle'); if (t) t.onclick = () => { const z = box.querySelector('#zhText'); z.hidden = !z.hidden; }; },
      },
      hint: { zh: q.model.kind === 'add' ? '“一共 / altogether / in all / in total”是把几部分合起来，用加法。' : q.model.kind === 'sub' ? '知道总数和其中一部分，求另一部分，用减法。' : (q.model.otherIs === 'more' ? '“比……多 more than”：求多的那个，用加法。' : '“比……少 fewer than”：求少的那个，用减法。'), en: `Try ${eq.expr}.` },
      answerText: String(ans),
      check: v => parseInt(v, 10) === ans,
      explainKind: 'word', n: q,
    };
  };
})();
