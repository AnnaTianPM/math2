/* Level 3 · Unit 1  10 000 以内的数：圆片、四位数位值、数轴、组数 讲解动画 */
(function () {
  const line = t => `<div class="expand-line">${t}</div>`;
  const wrap = (...parts) => `<div class="l1wrap">${parts.join('')}</div>`;
  const NW = window.NumWords || NumWords;
  const K = ['th', 'h', 't', 'o'], VAL = { th: 1000, h: 100, t: 10, o: 1 };
  const ZH = { th: '千位', h: '百位', t: '十位', o: '个位' }, EN = { th: 'thousands', h: 'hundreds', t: 'tens', o: 'ones' }, ZHU = { th: '千', h: '百', t: '十', o: '一' };
  const CSS = { th: 'var(--thou)', h: 'var(--hund)', t: 'var(--tens)', o: 'var(--ones)' };
  const col = (k, s) => `<b style="color:${CSS[k]}">${s}</b>`;
  const split = n => ({ th: Math.floor(n / 1000), h: Math.floor(n / 100) % 10, t: Math.floor(n / 10) % 10, o: n % 10 });
  const seq = (a, b) => { const r = []; for (let i = a; i <= b; i++) r.push(i); return r; };

  /* 圆片图（书上的 1000/100/10/1） o.hl: 高亮的位, o.on: {k: 已数的个数} */
  function discs(n, o = {}) {
    const v = split(n), on = o.on || {}, cross = o.cross || {};
    return `<div class="discs">${K.map(k => `<div class="dcol ${o.hl === k ? 'hl' : ''}">${Array.from({ length: v[k] }, (_, i) => `<span class="disc d${VAL[k]} ${on[k] !== undefined && i < on[k] ? 'on' : ''} ${cross[k] !== undefined && i >= v[k] - cross[k] ? 'x' : ''}">${VAL[k]}</span>`).join('')}</div>`).join('')}</div>`;
  }
  /* 数位表 */
  function pv(n, o = {}) {
    const v = n === null ? null : split(n);
    return `<table class="pv4"><tr><th>Thousands</th><th>Hundreds</th><th>Tens</th><th>Ones</th></tr><tr>${K.map(k => `<td class="${k} ${o.hl === k ? 'hl' : ''} ${v === null || (o.blank && o.blank.includes(k)) ? 'blankc' : ''}">${v === null || (o.blank && o.blank.includes(k)) ? '?' : v[k]}</td>`).join('')}</tr></table>`;
  }
  const big = (n, hl) => `<div class="bignum">${K.map(k => `<span class="d ${k}" style="${hl && hl !== k ? 'opacity:.3' : ''}">${split(n)[k]}</span>`).join('')}</div>`;
  /* 四列比较表 */
  function cmp(nums, o = {}) {
    const marks = o.marks || {};
    return `<div class="cmp-table four"><div class="cmp-head"></div><div class="cmp-head th">千 Th</div><div class="cmp-head h">百 H</div><div class="cmp-head t">十 T</div><div class="cmp-head o">个 O</div>${nums.map(n => { const v = split(n); return `<div class="cmp-num">${marks[n] ? `<span class="rank">${marks[n]}</span>` : ''}${n}</div>${K.map(k => `<div class="cmp-cell ${k} ${o.hl === k ? 'hl' : ''}">${v[k]}</div>`).join('')}`; }).join('')}</div>`;
  }
  /* 数轴 SVG：lo..hi，step 小格，labels 大刻度，arrows=[{v, text?}] */
  function numline(lo, hi, step, labels, arrows = [], o = {}) {
    const W = 560, x0 = 40, x1 = W - 40, H = 86, y = 58;
    const X = v => x0 + (v - lo) / (hi - lo) * (x1 - x0);
    let s = `<svg class="nline" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"><line x1="${x0 - 20}" y1="${y}" x2="${x1 + 20}" y2="${y}" stroke="#333" stroke-width="2"/><polygon points="${x1 + 26},${y} ${x1 + 16},${y - 5} ${x1 + 16},${y + 5}" fill="#333"/><polygon points="${x0 - 26},${y} ${x0 - 16},${y - 5} ${x0 - 16},${y + 5}" fill="#333"/>`;
    for (let v = lo; v <= hi + 1e-9; v += step) { const major = labels.includes(v); s += `<line x1="${X(v)}" y1="${y - (major ? 10 : 6)}" x2="${X(v)}" y2="${y + (major ? 10 : 6)}" stroke="#333" stroke-width="${major ? 2 : 1}"/>`; if (major) s += `<text x="${X(v)}" y="${y + 26}" text-anchor="middle" font-size="15" font-weight="700" fill="#333">${v}</text>`; }
    arrows.forEach(a => { const x = X(a.v), t = a.text !== undefined ? String(a.text) : ''; s += `<rect x="${x - 30}" y="4" width="60" height="22" rx="3" fill="${a.hl ? '#fff3d6' : '#fff'}" stroke="${a.hl ? '#ff9f43' : '#333'}" stroke-width="1.5"/><text x="${x}" y="20" text-anchor="middle" font-size="14" font-weight="700" fill="${t ? '#1a7f37' : '#333'}">${t}</text><line x1="${x}" y1="26" x2="${x}" y2="${y - 12}" stroke="#333" stroke-width="1.5"/><polygon points="${x},${y - 8} ${x - 4},${y - 15} ${x + 4},${y - 15}" fill="#333"/>`; if (o.hops && a.v !== undefined && o.hops.v === a.v) { const from = o.hops.from; for (let v = from; v !== a.v; v += Math.sign(a.v - from) * step) s += `<circle cx="${X(v + Math.sign(a.v - from) * step)}" cy="${y}" r="4" fill="#ff9f43"/>`; } });
    return s + '</svg>';
  }

  const S = window.StepKinds;
  /* l3count：数圆片 {n} */
  S.l3count = ({ n }) => {
    const v = split(n), steps = [{ zh: `一格一格数：先数 <b>1000</b> 的，再数 100 的、10 的、1 的。`, en: 'Count the thousands, then hundreds, tens and ones.', render: s => { s.innerHTML = wrap(`<div class="center">${discs(n)}</div>`); } }];
    let run = 0;
    K.forEach(k => { if (!v[k]) { steps.push({ zh: `${ZHU[k]}这一格是空的，${EN[k]} 是 0。`, en: `No ${EN[k]}.`, render: s => { s.innerHTML = wrap(`<div class="center">${discs(n, { hl: k })}</div>`, line(`${run}`)); } }); return; }
      const chain = Array.from({ length: v[k] }, (_, i) => run + (i + 1) * VAL[k]); const start = run; run += v[k] * VAL[k];
      steps.push({ zh: `数 ${VAL[k]} 的：${start ? `从 ${start} 接着数，` : ''}${chain.join('、')}。`, en: chain.join(', '), render: s => { s.innerHTML = wrap(`<div class="center">${discs(n, { hl: k, on: { [k]: v[k] } })}</div>`, line(chain.join(', '))); } }); });
    steps.push({ zh: `所以是 <b>${n}</b>：${v.th} 个千、${v.h} 个百、${v.t} 个十、${v.o} 个一。`, en: `${n}.`, render: s => { s.innerHTML = wrap(`<div class="center">${discs(n)}</div>`, pv(n), line(`${n}`)); } });
    return steps;
  };
  /* l3words：数字 → 英文 {n} */
  S.l3words = ({ n }) => {
    const v = split(n), rest = n % 1000, r = n % 100, w = NW.toWords(n);
    const tab = hl => `<div class="center">${big(n, hl)}${pv(n, { hl })}</div>`;
    const steps = [{ zh: `先看千位 ${col('th', v.th)}：${v.th} 个千说 <b>${NW.ones[v.th]} thousand</b>。`, en: `${v.th} thousand.`, render: s => { s.innerHTML = wrap(tab('th'), line(`${NW.ones[v.th]} thousand`)); } }];
    if (v.h) steps.push({ zh: `再看百位 ${col('h', v.h)}：<b>${NW.ones[v.h]} hundred</b>，前面加逗号。`, en: `${NW.ones[v.h]} hundred.`, render: s => { s.innerHTML = wrap(tab('h'), line(`${NW.ones[v.th]} thousand, ${NW.ones[v.h]} hundred`)); } });
    else steps.push({ zh: `百位是 ${col('h', 0)}，不用说 hundred。`, en: 'No hundreds.', render: s => { s.innerHTML = wrap(tab('h'), line(`${NW.ones[v.th]} thousand`)); } });
    if (r) steps.push({ zh: `最后是十位和个位 ${col('t', v.t)}${col('o', v.o)} = ${r}：说 <b>and ${NW.toWords(r)}</b>${r < 20 ? '（11 到 19 要单独记）' : ''}。`, en: `and ${NW.toWords(r)}.`, render: s => { s.innerHTML = wrap(tab('t'), line(w)); } });
    else steps.push({ zh: `十位个位都是 0，后面不用说了。`, en: 'Nothing after.', render: s => { s.innerHTML = wrap(tab('t'), line(w)); } });
    steps.push({ zh: `连起来：<b>${w}</b>（${NW.toZh(n)}）。`, en: w, render: s => { s.innerHTML = wrap(`<div class="center">${big(n)}</div>`, line(w)); } });
    return steps;
  };
  /* l3read：英文 → 数字 {n} */
  S.l3read = ({ n }) => {
    const v = split(n), w = NW.toWords(n), r = n % 100;
    const hlw = part => `<div class="center" style="font-size:22px;font-weight:700">${w.replace(part, `<mark>${part}</mark>`)}</div>`;
    const thW = `${NW.ones[v.th]} thousand`, hW = v.h ? `${NW.ones[v.h]} hundred` : '', rW = r ? NW.toWords(r) : '';
    return [
      { zh: `找 <b>thousand</b> 前面的词：<b>${NW.ones[v.th]}</b> = ${v.th}，千位写 ${col('th', v.th)}。`, en: `${thW} → ${v.th} in the thousands place.`, render: s => { s.innerHTML = wrap(hlw(thW), pv(n, { blank: ['h', 't', 'o'], hl: 'th' })); } },
      v.h ? { zh: `找 <b>hundred</b> 前面的词：<b>${NW.ones[v.h]}</b> = ${v.h}，百位写 ${col('h', v.h)}。`, en: `${hW} → ${v.h}.`, render: s => { s.innerHTML = wrap(hlw(hW), pv(n, { blank: ['t', 'o'], hl: 'h' })); } }
        : { zh: `没有 hundred 这个词，百位写 ${col('h', 0)}。`, en: 'No "hundred": 0 in the hundreds place.', render: s => { s.innerHTML = wrap(hlw(thW), pv(n, { blank: ['t', 'o'], hl: 'h' })); } },
      r ? { zh: `and 后面是 <b>${rW}</b> = ${r}：十位 ${col('t', v.t)}，个位 ${col('o', v.o)}。`, en: `${rW} = ${r}.`, render: s => { s.innerHTML = wrap(hlw(rW), pv(n, { hl: 't' })); } }
        : { zh: `后面没有词了，十位个位都写 0。`, en: 'Nothing after: 0 and 0.', render: s => { s.innerHTML = wrap(hlw(w), pv(n, { hl: 't' })); } },
      { zh: `合起来：<b>${n}</b>。`, en: `${n}.`, render: s => { s.innerHTML = wrap(`<div class="center">${big(n)}</div>`, pv(n)); } },
    ];
  };
  /* l3pv：位值 {n, pic?} */
  S.l3pv = ({ n, pic }) => {
    const v = split(n), scene = hl => `<div class="center">${pic === false ? big(n, hl) : discs(n, { hl })}</div>`;
    const steps = [{ zh: `四位数从左到右是：<b>千位、百位、十位、个位</b>（thousands, hundreds, tens, ones）。`, en: 'Thousands, hundreds, tens, ones.', render: s => { s.innerHTML = wrap(scene(), pv(n)); } }];
    K.forEach(k => steps.push({ zh: `数字 ${col(k, v[k])} 在<b>${ZH[k]}</b>（${EN[k]} place），表示 ${v[k]} 个${ZHU[k]}，值是 <b>${v[k] * VAL[k]}</b>。`, en: `The digit ${v[k]} is in the ${EN[k]} place. Its value is ${v[k] * VAL[k]}.`, render: s => { s.innerHTML = wrap(scene(k), pv(n, { hl: k }), line(`${v[k]} × ${VAL[k]} = ${v[k] * VAL[k]}`)); } }));
    steps.push({ zh: `<b>${n} = ${v.th * 1000} + ${v.h * 100} + ${v.t * 10} + ${v.o}</b>。`, en: `${n} = ${v.th * 1000} + ${v.h * 100} + ${v.t * 10} + ${v.o}.`, render: s => { s.innerHTML = wrap(`<div class="center">${big(n)}</div>`, line(`${n} = ${v.th * 1000} + ${v.h * 100} + ${v.t * 10} + ${v.o}`)); } });
    return steps;
  };
  /* l3expand：拆分 {n, miss:'th'|'h'|'t'|'o'|'sum'} */
  S.l3expand = ({ n, miss }) => {
    const v = split(n), parts = K.map(k => v[k] * VAL[k]);
    const eqn = hl => K.map(k => `<span style="${hl === k ? 'background:#fff3d6;padding:0 4px;border-radius:4px' : ''}">${col(k, v[k] * VAL[k])}</span>`).join(' + ');
    const steps = [{ zh: `${n} 的每一位：千位 ${col('th', v.th)}、百位 ${col('h', v.h)}、十位 ${col('t', v.t)}、个位 ${col('o', v.o)}。`, en: 'Look at each place.', render: s => { s.innerHTML = wrap(`<div class="center">${big(n)}</div>`, pv(n)); } }];
    K.forEach(k => steps.push({ zh: `${ZH[k]}的 ${col(k, v[k])} 表示 ${v[k]} 个${ZHU[k]} = <b>${v[k] * VAL[k]}</b>。`, en: `${v[k]} ${EN[k]} = ${v[k] * VAL[k]}.`, render: s => { s.innerHTML = wrap(pv(n, { hl: k }), line(eqn(k))); } }));
    steps.push({ zh: `所以 <b>${n} = ${parts.join(' + ')}</b>${miss && miss !== 'sum' ? `，空格填 <b>${v[miss] * VAL[miss]}</b>` : ''}。`, en: `${n} = ${parts.join(' + ')}.`, render: s => { s.innerHTML = wrap(line(`${n} = ${parts.join(' + ')}`)); } });
    return steps;
  };
  /* l3compare：比较两个四位数 {a, b, pic?:'discs'|'pv'|'line'} */
  S.l3compare = ({ a, b, pic }) => {
    const va = split(a), vb = split(b);
    const scene = hl => pic === 'discs' ? `<div class="center"><div class="disc-pair"><span class="lbl">${a}</span>${discs(a, { hl })}<span class="lbl">${b}</span>${discs(b, { hl })}</div></div>` : `<div class="center">${cmp([a, b], { hl })}</div>`;
    const steps = [{ zh: `比较 <b>${a}</b> 和 <b>${b}</b>：把千、百、十、个对齐，<b>从千位开始</b>一位一位比。`, en: `Compare ${a} and ${b}, starting from the thousands.`, render: s => { s.innerHTML = wrap(scene()); } }];
    for (const k of K) { const x = va[k], y = vb[k];
      if (x !== y) { const big_ = x > y ? a : b, small = x > y ? b : a; steps.push({ zh: `比${ZH[k]}：${col(k, x)} 和 ${col(k, y)}，${Math.max(x, y)} 大。所以 <b>${big_} is greater than ${small}</b>，<b>${small} is smaller than ${big_}</b>。`, en: `${EN[k]}: ${Math.max(x, y)} is greater. So ${big_} is greater than ${small}.`, render: s => { s.innerHTML = wrap(scene(k), line(`${big_} &gt; ${small}`)); } }); break; }
      steps.push({ zh: `比${ZH[k]}：都是 ${col(k, x)}，一样，再比下一位。`, en: `${EN[k]} are the same. Compare the next place.`, render: s => { s.innerHTML = wrap(scene(k)); } }); }
    if (a === b) steps.push({ zh: '每一位都一样，两个数相等。', en: 'Equal.', render: s => { s.innerHTML = wrap(scene()); } });
    return steps;
  };
  /* l3arrange：排序 {nums, order} */
  S.l3arrange = ({ nums, order }) => {
    const asc = order === 'asc', sorted = nums.slice().sort((x, y) => asc ? x - y : y - x), marks = {}; sorted.forEach((n, i) => { marks[n] = i + 1; });
    const ths = [...new Set(nums.map(n => split(n).th))];
    const groups = {}; nums.forEach(n => { (groups[split(n).th] = groups[split(n).th] || []).push(n); }); const tie = Object.values(groups).filter(g => g.length > 1);
    return [
      { zh: `把 ${nums.join('、')} 从${asc ? '小到大' : '大到小'}排。先对齐千、百、十、个。`, en: `Arrange from ${asc ? 'smallest' : 'greatest'}.`, render: s => { s.innerHTML = wrap(`<div class="center">${cmp(nums)}</div>`); } },
      { zh: `先比<b>千位</b>：${ths.length > 1 ? `千位${asc ? '小' : '大'}的排前面。` : '千位都一样。'}`, en: 'Compare the thousands first.', render: s => { s.innerHTML = wrap(`<div class="center">${cmp(nums, { hl: 'th' })}</div>`); } },
      ...(tie.length ? [{ zh: `千位一样的（${tie.map(g => g.join(' 和 ')).join('；')}）再比<b>百位</b>，百位也一样就比十位、个位。`, en: 'Same thousands: compare hundreds, then tens, then ones.', render: s => { s.innerHTML = wrap(`<div class="center">${cmp(nums, { hl: 'h' })}</div>`); } }] : []),
      { zh: `排好了：<b>${sorted.join(', ')}</b>。`, en: sorted.join(', '), render: s => { s.innerHTML = wrap(`<div class="center">${cmp(nums, { marks })}</div>`, line(sorted.join(', '))); } },
    ];
  };
  /* l3form：用 4 个数字组最大/最小的奇/偶数 {digits, big:true|false, odd:true|false} */
  S.l3form = ({ digits, big: wantBig, odd }) => {
    const par = d => odd ? d % 2 === 1 : d % 2 === 0;
    const cand = digits.filter(par).sort((x, y) => x - y), onesD = wantBig ? cand[0] : cand[cand.length - 1];
    const rest = digits.slice(); rest.splice(rest.indexOf(onesD), 1); rest.sort((x, y) => wantBig ? y - x : x - y);
    const ans = +`${rest.join('')}${onesD}`;
    const row = (pick, used) => `<div class="center"><div class="digits-row">${digits.map(d => `<span class="${used && used.includes(d) ? 'used' : ''} ${pick === d ? 'pick' : ''}">${d}</span>`).join('')}</div></div>`;
    return [
      { zh: `要用 ${digits.join('、')} 组一个<b>${wantBig ? '最大' : '最小'}的${odd ? '奇数' : '偶数'}</b>。${odd ? '奇数' : '偶数'}看<b>个位</b>：个位必须是${odd ? '奇数（1、3、5、7、9）' : '偶数（0、2、4、6、8）'}。`, en: `${odd ? 'Odd' : 'Even'} numbers end in ${odd ? '1, 3, 5, 7, 9' : '0, 2, 4, 6, 8'}.`, render: s => { s.innerHTML = wrap(row()); } },
      { zh: `能放个位的有：${cand.join('、')}。要${wantBig ? '最大' : '最小'}，个位就用${wantBig ? '最小' : '最大'}的那个：<b>${onesD}</b>（把${wantBig ? '大' : '小'}的数字留给前面的高位）。`, en: `Ones digit: ${onesD}.`, render: s => { s.innerHTML = wrap(row(onesD), line(`_ _ _ ${onesD}`)); } },
      { zh: `剩下 ${rest.slice().sort((x, y) => x - y).join('、')}，${wantBig ? '从大到小' : '从小到大'}排在千位、百位、十位：${rest.join('、')}。`, en: `Arrange the rest ${wantBig ? 'from greatest' : 'from smallest'}.`, render: s => { s.innerHTML = wrap(row(null, [onesD]), line(`${rest.join(' ')} ${onesD}`)); } },
      { zh: `答案：<b>${ans}</b>。`, en: `${ans}.`, render: s => { s.innerHTML = wrap(`<div class="center">${big(ans)}</div>`, line(`${ans}`)); } },
    ];
  };
  /* l3moreless：多/少 {start, delta} delta 可为 1/10/100/1000 的倍数 */
  S.l3moreless = ({ start, delta }) => {
    const more = delta > 0, n = Math.abs(delta), stepSize = n >= 1000 ? 1000 : n >= 100 ? 100 : n >= 10 ? 10 : 1, count = n / stepSize, end = start + delta;
    const k = { 1000: 'th', 100: 'h', 10: 't', 1: 'o' }[stepSize];
    const chain = Array.from({ length: count + 1 }, (_, i) => start + (more ? 1 : -1) * i * stepSize);
    return [
      { zh: `${n} ${more ? 'more' : 'less'} than ${start}：比 ${start} <b>${more ? '多' : '少'} ${n}</b>。${n} 是 ${count} 个${ZHU[k]}，只有<b>${ZH[k]}</b>会变。`, en: `Only the ${EN[k]} place changes.`, render: s => { s.innerHTML = wrap(`<div class="center">${big(start, k)}</div>`, pv(start, { hl: k })); } },
      { zh: `从 ${start} ${more ? '往后' : '往回'}数 ${count} 个${ZHU[k]}：${chain.slice(1).join('、')}。`, en: chain.slice(1).join(', '), render: s => { s.innerHTML = wrap(`<div class="center"><div class="numrow"><div class="numrow-boxes">${chain.map((x, i) => `<span class="nbox ${i ? 'on' : ''}">${x}</span>`).join('')}</div></div></div>`); } },
      { zh: `${ZH[k]} ${split(start)[k]} ${more ? '+' : '−'} ${count} = ${split(end)[k]}${stepSize < 1000 && split(end).th !== split(start).th || (stepSize < 100 && split(end).h !== split(start).h) || (stepSize < 10 && split(end).t !== split(start).t) ? '（要进位 / 退位）' : ''}，其他位不变。答案 <b>${end}</b>。`, en: `${n} ${more ? 'more' : 'less'} than ${start} is ${end}.`, render: s => { s.innerHTML = wrap(`<div class="center">${big(end, k)}</div>`, line(`${start} ${more ? '+' : '−'} ${n} = ${end}`)); } },
    ];
  };
  /* l3diff：a 比 b 多/少多少 {a, b} */
  S.l3diff = ({ a, b }) => {
    const va = split(a), vb = split(b), d = Math.abs(a - b), more = a > b, kd = K.find(k => va[k] !== vb[k]);
    return [
      { zh: `${a} is ___ ${more ? 'more' : 'less'} than ${b}：问 ${a} 比 ${b} ${more ? '多' : '少'}多少。把两个数对齐，看哪一位不一样。`, en: 'Line up the places and find the difference.', render: s => { s.innerHTML = wrap(`<div class="center">${cmp([a, b])}</div>`); } },
      { zh: `${ZH[kd]}不一样：${col(kd, va[kd])} 和 ${col(kd, vb[kd])}，差 ${Math.abs(va[kd] - vb[kd])} 个${ZHU[kd]} = <b>${Math.abs(va[kd] - vb[kd]) * VAL[kd]}</b>${d !== Math.abs(va[kd] - vb[kd]) * VAL[kd] ? `；其他位也有差别，用减法：${Math.max(a, b)} − ${Math.min(a, b)} = <b>${d}</b>` : ''}。`, en: `${Math.max(a, b)} − ${Math.min(a, b)} = ${d}.`, render: s => { s.innerHTML = wrap(`<div class="center">${cmp([a, b], { hl: kd })}</div>`, line(`${Math.max(a, b)} − ${Math.min(a, b)} = ${d}`)); } },
      { zh: `所以 ${a} is <b>${d}</b> ${more ? 'more' : 'less'} than ${b}。`, en: `${a} is ${d} ${more ? 'more' : 'less'} than ${b}.`, render: s => { s.innerHTML = wrap(line(`${a} is ${d} ${more ? 'more' : 'less'} than ${b}`)); } },
    ];
  };
  /* l3numline：数轴读数再比较 {lo, hi, step, labels, a, b} */
  S.l3numline = ({ lo, hi, step, labels, a, b }) => {
    const near = v => labels.slice().sort((x, y) => Math.abs(x - v) - Math.abs(y - v))[0];
    const per = (labels[1] - labels[0]) / step;
    const read = (v, shownA) => { const L = near(v), hops = Math.round(Math.abs(v - L) / step); return { zh: `第${shownA ? '二' : '一'}个箭头：离它最近的大刻度是 <b>${L}</b>，从 ${L} ${v > L ? '往右' : '往左'}数 ${hops} 小格，每格 ${step}：${L} ${v > L ? '+' : '−'} ${hops} × ${step} = <b>${v}</b>。`, en: `${L} ${v > L ? '+' : '−'} ${hops} × ${step} = ${v}.`, render: s => { s.innerHTML = wrap(`<div class="center">${numline(lo, hi, step, labels, [{ v: a, text: shownA || v === a ? a : '', hl: v === a }, { v: b, text: v === b ? b : (shownA ? '' : ''), hl: v === b }], { hops: { v, from: L } })}</div>`, line(`${L} ${v > L ? '+' : '−'} ${hops} × ${step} = ${v}`)); } }; };
    return [
      { zh: `先看数轴：大刻度是 ${labels.join('、')}，两个大刻度之间有 ${per} 小格，所以每小格是 <b>${step}</b>。`, en: `Each small step is ${step}.`, render: s => { s.innerHTML = wrap(`<div class="center">${numline(lo, hi, step, labels, [{ v: a }, { v: b }])}</div>`, line(`每格 ${step}`)); } },
      read(a, false), read(b, true),
      { zh: `数轴上<b>越往右越大</b>：${Math.max(a, b)} is greater than ${Math.min(a, b)}，${Math.min(a, b)} is smaller than ${Math.max(a, b)}。`, en: `${Math.max(a, b)} is greater than ${Math.min(a, b)}.`, render: s => { s.innerHTML = wrap(`<div class="center">${numline(lo, hi, step, labels, [{ v: a, text: a }, { v: b, text: b }])}</div>`, line(`${Math.min(a, b)} &lt; ${Math.max(a, b)}`)); } },
    ];
  };
  window.L3 = { discs, pv, big, cmp, numline, split };
})();
