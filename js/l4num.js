/* Level 4 · Unit 1  100 000 以内的数：五位数圆片、数位、比较、组数、多少、四舍五入、估算 讲解动画 */
(function () {
  const line = t => `<div class="expand-line">${t}</div>`;
  const wrap = (...parts) => `<div class="l1wrap">${parts.join('')}</div>`;
  const NW = window.NumWords || NumWords;
  const K = ['tt', 'th', 'h', 't', 'o'], VAL = { tt: 10000, th: 1000, h: 100, t: 10, o: 1 };
  const ZH = { tt: '万位', th: '千位', h: '百位', t: '十位', o: '个位' };
  const EN = { tt: 'ten thousands', th: 'thousands', h: 'hundreds', t: 'tens', o: 'ones' };
  const ZHU = { tt: '万', th: '千', h: '百', t: '十', o: '一' };
  const CSS = { tt: 'var(--tenth)', th: 'var(--thou)', h: 'var(--hund)', t: 'var(--tens)', o: 'var(--ones)' };
  const col = (k, s) => `<b style="color:${CSS[k]}">${s}</b>`;
  const split = n => ({ tt: Math.floor(n / 10000), th: Math.floor(n / 1000) % 10, h: Math.floor(n / 100) % 10, t: Math.floor(n / 10) % 10, o: n % 10 });
  const fmt = n => { const s = String(Math.abs(n)); return (n < 0 ? '−' : '') + (s.length > 4 ? s.replace(/(\d)(?=(\d{3})$)/, '$1 ') : s); };
  const kindOf = v => v >= 10000 ? 'tt' : v >= 1000 ? 'th' : v >= 100 ? 'h' : v >= 10 ? 't' : 'o';

  /* 五列圆片图 */
  function discs(n, o = {}) {
    const v = split(n), on = o.on || {}, cross = o.cross || {};
    return `<div class="discs five">${K.map(k => `<div class="dcol ${o.hl === k ? 'hl' : ''}">${Array.from({ length: v[k] }, (_, i) => `<span class="disc d${VAL[k]} ${on[k] !== undefined && i < on[k] ? 'on' : ''} ${cross[k] !== undefined && i >= v[k] - cross[k] ? 'x' : ''}">${fmt(VAL[k])}</span>`).join('')}</div>`).join('')}</div>`;
  }
  /* 一排同样的圆片（数千、数万） */
  const discrow = (unit, count, on) => `<div class="discrow">${Array.from({ length: count }, (_, i) => `<span class="disc d${unit} ${on !== undefined && i < on ? 'on' : ''}">${fmt(unit)}</span>`).join('')}</div>`;
  /* 五列数位表 */
  function pv(n, o = {}) {
    const v = n === null ? null : split(n);
    return `<table class="pv4 five"><tr><th>Ten thousands</th><th>Thousands</th><th>Hundreds</th><th>Tens</th><th>Ones</th></tr><tr>${K.map(k => `<td class="${k} ${o.hl === k ? 'hl' : ''} ${v === null || (o.blank && o.blank.includes(k)) ? 'blankc' : ''}">${v === null || (o.blank && o.blank.includes(k)) ? '?' : v[k]}</td>`).join('')}</tr></table>`;
  }
  const big = (n, hl) => { const v = split(n); return `<div class="bignum">${K.filter(k => k !== 'tt' || v.tt).map(k => `<span class="d ${k}" style="${hl && hl !== k ? 'opacity:.3;' : ''}${k === 'tt' ? 'margin-right:12px' : ''}">${v[k]}</span>`).join('')}</div>`; };
  /* 五列比较表 */
  function cmp(nums, o = {}) {
    const marks = o.marks || {};
    return `<div class="cmp-table five"><div class="cmp-head"></div><div class="cmp-head tt">万 TTh</div><div class="cmp-head th">千 Th</div><div class="cmp-head h">百 H</div><div class="cmp-head t">十 T</div><div class="cmp-head o">个 O</div>${nums.map(n => { const v = split(n); return `<div class="cmp-num">${marks[n] ? `<span class="rank">${marks[n]}</span>` : ''}${fmt(n)}</div>${K.map(k => `<div class="cmp-cell ${k} ${o.hl === k ? 'hl' : ''}">${k === 'tt' && !v.tt ? '' : v[k]}</div>`).join('')}`; }).join('')}</div>`;
  }
  const numRow = (nums, o = {}) => `<div class="numrow">${o.label ? `<div class="numrow-label">${o.label}</div>` : ''}<div class="numrow-boxes">${nums.map((n, i) => `<span class="nbox ${(o.hl || []).includes(i) ? 'on' : ''} ${n === null ? 'blank' : ''}">${n === null ? '?' : fmt(n)}</span>`).join('')}</div></div>`;
  const numline = (...a) => window.L3.numline(...a);

  const S = window.StepKinds;
  /* l4skip：数千 / 数万 {unit, count} */
  S.l4skip = ({ unit, count }) => {
    const chain = Array.from({ length: count }, (_, i) => (i + 1) * unit);
    const name = unit === 10000 ? '万' : '千';
    return [
      { zh: `每个圆片都是 <b>${fmt(unit)}</b>，一共 ${count} 个。一个一个数，每数一个加 ${fmt(unit)}。`, en: `Each disc is ${fmt(unit)}. Count in ${unit === 10000 ? 'ten thousands' : 'thousands'}.`, render: s => { s.innerHTML = wrap(`<div class="center">${discrow(unit, count)}</div>`); } },
      { zh: `${chain.map(fmt).join('、')}。`, en: chain.map(fmt).join(', '), render: s => { s.innerHTML = wrap(`<div class="center">${discrow(unit, count, count)}</div>`, line(chain.map(fmt).join(', '))); } },
      { zh: `${count} 个${name}是 <b>${fmt(count * unit)}</b>${count * unit === 100000 ? '（十万，one hundred thousand）' : ''}。`, en: `${count} ${unit === 10000 ? 'ten thousands' : 'thousands'} make ${fmt(count * unit)}.`, render: s => { s.innerHTML = wrap(line(`${count} × ${fmt(unit)} = ${fmt(count * unit)}`)); } },
    ];
  };
  /* l4count：数五列圆片 {n} */
  S.l4count = ({ n }) => {
    const v = split(n), steps = [{ zh: `一格一格数：先数 <b>10 000</b> 的，再数 1000、100、10、1 的。`, en: 'Count the ten thousands, then thousands, hundreds, tens and ones.', render: s => { s.innerHTML = wrap(`<div class="center">${discs(n)}</div>`); } }];
    let run = 0;
    K.forEach(k => { if (!v[k]) { steps.push({ zh: `${ZHU[k]}这一格是空的，${EN[k]} 是 0。`, en: `No ${EN[k]}.`, render: s => { s.innerHTML = wrap(`<div class="center">${discs(n, { hl: k })}</div>`, line(fmt(run))); } }); return; }
      const chain = Array.from({ length: v[k] }, (_, i) => run + (i + 1) * VAL[k]); const start = run; run += v[k] * VAL[k];
      steps.push({ zh: `数 ${fmt(VAL[k])} 的：${start ? `从 ${fmt(start)} 接着数，` : ''}${chain.map(fmt).join('、')}。`, en: chain.map(fmt).join(', '), render: s => { s.innerHTML = wrap(`<div class="center">${discs(n, { hl: k, on: { [k]: v[k] } })}</div>`, line(chain.map(fmt).join(', '))); } }); });
    steps.push({ zh: `所以是 <b>${fmt(n)}</b>：${v.tt} 个万、${v.th} 个千、${v.h} 个百、${v.t} 个十、${v.o} 个一。`, en: `${fmt(n)}.`, render: s => { s.innerHTML = wrap(`<div class="center">${discs(n)}</div>`, pv(n), line(fmt(n))); } });
    return steps;
  };
  /* l4words：数字 → 英文 {n} */
  S.l4words = ({ n }) => {
    const v = split(n), th = Math.floor(n / 1000), h = v.h, r = n % 100, w = NW.toWords(n);
    const thW = NW.toWords(th);
    const tab = hl => `<div class="center">${big(n, hl)}${pv(n, { hl })}</div>`;
    const steps = [{ zh: `先看 <b>thousand 前面</b>的部分：万位和千位合起来是 ${col('tt', v.tt)}${col('th', v.th)} = ${th}，说 <b>${thW} thousand</b>。`, en: `${th} thousands: ${thW} thousand.`, render: s => { s.innerHTML = wrap(tab('th'), line(`${thW} thousand`)); } }];
    if (h) steps.push({ zh: `再看百位 ${col('h', h)}：<b>${NW.ones[h]} hundred</b>，前面加逗号。`, en: `${NW.ones[h]} hundred.`, render: s => { s.innerHTML = wrap(tab('h'), line(`${thW} thousand, ${NW.ones[h]} hundred`)); } });
    else steps.push({ zh: `百位是 ${col('h', 0)}，不用说 hundred。`, en: 'No hundreds.', render: s => { s.innerHTML = wrap(tab('h'), line(`${thW} thousand`)); } });
    if (r) steps.push({ zh: `最后是十位和个位 ${col('t', v.t)}${col('o', v.o)} = ${r}：说 <b>and ${NW.toWords(r)}</b>${r < 20 ? '（11 到 19 要单独记）' : ''}。`, en: `and ${NW.toWords(r)}.`, render: s => { s.innerHTML = wrap(tab('t'), line(w)); } });
    else steps.push({ zh: `十位个位都是 0，后面不用说了。`, en: 'Nothing after.', render: s => { s.innerHTML = wrap(tab('t'), line(w)); } });
    steps.push({ zh: `连起来：<b>${w}</b>（${NW.toZh(n)}）。`, en: w, render: s => { s.innerHTML = wrap(`<div class="center">${big(n)}</div>`, line(w)); } });
    return steps;
  };
  /* l4read：英文 → 数字 {n} */
  S.l4read = ({ n }) => {
    const v = split(n), th = Math.floor(n / 1000), w = NW.toWords(n), r = n % 100;
    const hlw = part => `<div class="center" style="font-size:22px;font-weight:700">${part ? w.replace(part, `<mark>${part}</mark>`) : w}</div>`;
    const thW = `${NW.toWords(th)} thousand`, hW = v.h ? `${NW.ones[v.h]} hundred` : '', rW = r ? NW.toWords(r) : '';
    return [
      { zh: `找 <b>thousand</b> 前面的词：<b>${NW.toWords(th)}</b> = ${th}，这是几个千。${th >= 10 ? `两位数 ${th}：万位写 ${col('tt', v.tt)}，千位写 ${col('th', v.th)}。` : `千位写 ${col('th', v.th)}。`}`, en: `${thW} → ${th} thousands.`, render: s => { s.innerHTML = wrap(hlw(thW), pv(n, { blank: ['h', 't', 'o'], hl: 'th' })); } },
      v.h ? { zh: `找 <b>hundred</b> 前面的词：<b>${NW.ones[v.h]}</b> = ${v.h}，百位写 ${col('h', v.h)}。`, en: `${hW} → ${v.h}.`, render: s => { s.innerHTML = wrap(hlw(hW), pv(n, { blank: ['t', 'o'], hl: 'h' })); } }
        : { zh: `没有 hundred 这个词，百位写 ${col('h', 0)}。`, en: 'No "hundred": 0 in the hundreds place.', render: s => { s.innerHTML = wrap(hlw(thW), pv(n, { blank: ['t', 'o'], hl: 'h' })); } },
      r ? { zh: `and 后面是 <b>${rW}</b> = ${r}：十位 ${col('t', v.t)}，个位 ${col('o', v.o)}。${r < 10 ? '只有个位，十位写 0。' : ''}`, en: `${rW} = ${r}.`, render: s => { s.innerHTML = wrap(hlw(rW), pv(n, { hl: 't' })); } }
        : { zh: `后面没有词了，十位个位都写 0。`, en: 'Nothing after: 0 and 0.', render: s => { s.innerHTML = wrap(hlw(''), pv(n, { hl: 't' })); } },
      { zh: `合起来：<b>${fmt(n)}</b>。`, en: `${fmt(n)}.`, render: s => { s.innerHTML = wrap(`<div class="center">${big(n)}</div>`, pv(n)); } },
    ];
  };
  /* l4pv：位值 {n, pic?:false} */
  S.l4pv = ({ n, pic }) => {
    const v = split(n), scene = hl => `<div class="center">${pic === false ? big(n, hl) : discs(n, { hl })}</div>`;
    const steps = [{ zh: `五位数从左到右是：<b>万位、千位、百位、十位、个位</b>（ten thousands, thousands, hundreds, tens, ones）。`, en: 'Ten thousands, thousands, hundreds, tens, ones.', render: s => { s.innerHTML = wrap(scene(), pv(n)); } }];
    K.forEach(k => steps.push({ zh: `数字 ${col(k, v[k])} 在<b>${ZH[k]}</b>（${EN[k]} place），表示 ${v[k]} 个${ZHU[k]}，值是 <b>${fmt(v[k] * VAL[k])}</b>。`, en: `The digit ${v[k]} is in the ${EN[k]} place. Its value is ${fmt(v[k] * VAL[k])}.`, render: s => { s.innerHTML = wrap(scene(k), pv(n, { hl: k }), line(`${v[k]} × ${fmt(VAL[k])} = ${fmt(v[k] * VAL[k])}`)); } }));
    steps.push({ zh: `<b>${fmt(n)} = ${K.map(k => fmt(v[k] * VAL[k])).join(' + ')}</b>。`, en: `${fmt(n)} = ${K.map(k => fmt(v[k] * VAL[k])).join(' + ')}.`, render: s => { s.innerHTML = wrap(`<div class="center">${big(n)}</div>`, line(`${fmt(n)} = ${K.map(k => fmt(v[k] * VAL[k])).join(' + ')}`)); } });
    return steps;
  };
  /* l4expand：拆分 {n, miss:'tt'|'th'|'h'|'t'|'o'|'sum', form?:'units'} */
  S.l4expand = ({ n, miss, form }) => {
    const v = split(n), parts = K.map(k => fmt(v[k] * VAL[k]));
    const units = K.map(k => `${v[k]} ${v[k] === 1 ? EN[k].replace(/s$/, '') : EN[k]}`);
    const eqn = hl => K.map(k => `<span style="${hl === k ? 'background:#fff3d6;padding:0 4px;border-radius:4px' : ''}">${col(k, form === 'units' ? units[K.indexOf(k)] : fmt(v[k] * VAL[k]))}</span>`).join(' + ');
    const steps = [{ zh: `${fmt(n)} 的每一位：万位 ${col('tt', v.tt)}、千位 ${col('th', v.th)}、百位 ${col('h', v.h)}、十位 ${col('t', v.t)}、个位 ${col('o', v.o)}。`, en: 'Look at each place.', render: s => { s.innerHTML = wrap(`<div class="center">${big(n)}</div>`, pv(n)); } }];
    K.forEach(k => steps.push({ zh: `${ZH[k]}的 ${col(k, v[k])} 表示 <b>${v[k]} 个${ZHU[k]}</b>（${units[K.indexOf(k)]}）= ${fmt(v[k] * VAL[k])}。`, en: `${units[K.indexOf(k)]} = ${fmt(v[k] * VAL[k])}.`, render: s => { s.innerHTML = wrap(pv(n, { hl: k }), line(eqn(k))); } }));
    steps.push({ zh: `所以 <b>${fmt(n)} = ${form === 'units' ? units.join(' + ') : parts.join(' + ')}</b>${miss && miss !== 'sum' ? `，空格填 <b>${form === 'units' ? v[miss] : fmt(v[miss] * VAL[miss])}</b>` : ''}。`, en: `${fmt(n)} = ${form === 'units' ? units.join(' + ') : parts.join(' + ')}.`, render: s => { s.innerHTML = wrap(line(`${fmt(n)} = ${form === 'units' ? units.join(' + ') : parts.join(' + ')}`)); } });
    return steps;
  };
  /* l4compare：比较 {a, b, pic?:'discs'|'pv'} */
  S.l4compare = ({ a, b, pic }) => {
    const va = split(a), vb = split(b), la = String(a).length, lb = String(b).length;
    const scene = hl => pic === 'discs' ? `<div class="center"><div class="disc-pair"><span class="lbl">${fmt(a)}</span>${discs(a, { hl })}<span class="lbl">${fmt(b)}</span>${discs(b, { hl })}</div></div>` : `<div class="center">${cmp([a, b], { hl })}</div>`;
    const steps = [{ zh: `比较 <b>${fmt(a)}</b> 和 <b>${fmt(b)}</b>：把万、千、百、十、个对齐，<b>从最高位开始</b>一位一位比。`, en: `Compare ${fmt(a)} and ${fmt(b)}, starting from the highest place.`, render: s => { s.innerHTML = wrap(scene()); } }];
    if (la !== lb) { const big_ = la > lb ? a : b, small = la > lb ? b : a; steps.push({ zh: `${fmt(big_)} 是 ${String(big_).length} 位数，${fmt(small)} 是 ${String(small).length} 位数。<b>位数多的数大</b>：${fmt(big_)} is greater than ${fmt(small)}，${fmt(small)} is smaller than ${fmt(big_)}。`, en: `${fmt(big_)} has more digits, so it is greater.`, render: s => { s.innerHTML = wrap(scene('tt'), line(`${fmt(big_)} &gt; ${fmt(small)}`)); } }); return steps; }
    for (const k of K) { const x = va[k], y = vb[k];
      if (x !== y) { const big_ = x > y ? a : b, small = x > y ? b : a; steps.push({ zh: `比${ZH[k]}：${col(k, x)} 和 ${col(k, y)}，${Math.max(x, y)} 大。所以 <b>${fmt(big_)} is greater than ${fmt(small)}</b>，<b>${fmt(small)} is smaller than ${fmt(big_)}</b>。`, en: `${EN[k]}: ${Math.max(x, y)} is greater. So ${fmt(big_)} is greater than ${fmt(small)}.`, render: s => { s.innerHTML = wrap(scene(k), line(`${fmt(big_)} &gt; ${fmt(small)}`)); } }); break; }
      steps.push({ zh: `比${ZH[k]}：都是 ${col(k, x)}，一样，再比下一位。`, en: `${EN[k]} are the same. Compare the next place.`, render: s => { s.innerHTML = wrap(scene(k)); } }); }
    if (a === b) steps.push({ zh: '每一位都一样，两个数相等。', en: 'Equal.', render: s => { s.innerHTML = wrap(scene()); } });
    return steps;
  };
  /* l4arrange：排序 {nums, order} */
  S.l4arrange = ({ nums, order }) => {
    const asc = order === 'asc', sorted = nums.slice().sort((x, y) => asc ? x - y : y - x), marks = {}; sorted.forEach((n, i) => { marks[n] = i + 1; });
    const top = nums.every(n => n >= 10000) ? 'tt' : 'th';
    const tops = [...new Set(nums.map(n => split(n)[top]))];
    const groups = {}; nums.forEach(n => { (groups[split(n)[top]] = groups[split(n)[top]] || []).push(n); }); const tie = Object.values(groups).filter(g => g.length > 1);
    return [
      { zh: `把 ${nums.map(fmt).join('、')} 从${asc ? '小到大' : '大到小'}排。先对齐万、千、百、十、个。`, en: `Arrange from ${asc ? 'smallest' : 'greatest'}.`, render: s => { s.innerHTML = wrap(`<div class="center">${cmp(nums)}</div>`); } },
      { zh: `先比<b>${ZH[top]}</b>：${tops.length > 1 ? `${ZH[top]}${asc ? '小' : '大'}的排前面。` : `${ZH[top]}都一样。`}`, en: `Compare the ${EN[top]} first.`, render: s => { s.innerHTML = wrap(`<div class="center">${cmp(nums, { hl: top })}</div>`); } },
      ...(tie.length ? [{ zh: `${ZH[top]}一样的（${tie.map(g => g.map(fmt).join(' 和 ')).join('；')}）再比下一位，还一样就继续往右比。`, en: 'Same highest place: compare the next place, and so on.', render: s => { s.innerHTML = wrap(`<div class="center">${cmp(nums, { hl: K[K.indexOf(top) + 1] })}</div>`); } }] : []),
      { zh: `排好了：<b>${sorted.map(fmt).join(', ')}</b>。`, en: sorted.map(fmt).join(', '), render: s => { s.innerHTML = wrap(`<div class="center">${cmp(nums, { marks })}</div>`, line(sorted.map(fmt).join(', '))); } },
    ];
  };
  /* 组数：穷举 */
  function perms(arr) { if (arr.length <= 1) return [arr]; const out = []; arr.forEach((d, i) => { const rest = arr.slice(); rest.splice(i, 1); perms(rest).forEach(p => out.push([d].concat(p))); }); return out; }
  function formAns(digits, wantBig, odd) {
    const list = perms(digits).filter(p => p[0] !== 0 && (odd ? p[p.length - 1] % 2 === 1 : p[p.length - 1] % 2 === 0)).map(p => +p.join(''));
    return wantBig ? Math.max(...list) : Math.min(...list);
  }
  /* l4form：用 5 个数字组最大/最小的奇/偶数 {digits, big, odd} */
  S.l4form = ({ digits, big: wantBig, odd }) => {
    const ans = formAns(digits, wantBig, odd), ds = String(ans).split('').map(Number), onesD = ds[ds.length - 1], rest = ds.slice(0, -1);
    const cand = [...new Set(digits.filter(d => odd ? d % 2 === 1 : d % 2 === 0))].sort((x, y) => x - y);
    const zeroNote = !wantBig && digits.includes(0) && onesD !== 0 ? '0 不能放在最前面（万位），所以 0 放在第二位。' : '';
    const row = (pick, used) => `<div class="center"><div class="digits-row">${digits.map(d => `<span class="${used && used.includes(d) ? 'used' : ''} ${pick === d ? 'pick' : ''}">${d}</span>`).join('')}</div></div>`;
    return [
      { zh: `要用 ${digits.join('、')} 组一个<b>${wantBig ? '最大' : '最小'}的五位${odd ? '奇数' : '偶数'}</b>。${odd ? '奇数' : '偶数'}看<b>个位</b>：个位必须是${odd ? '奇数（1、3、5、7、9）' : '偶数（0、2、4、6、8）'}。`, en: `${odd ? 'Odd' : 'Even'} numbers end in ${odd ? '1, 3, 5, 7, 9' : '0, 2, 4, 6, 8'}.`, render: s => { s.innerHTML = wrap(row()); } },
      { zh: `能放个位的有：${cand.join('、')}。要${wantBig ? '最大' : '最小'}，个位用 <b>${onesD}</b>（把${wantBig ? '大' : '小'}的数字留给前面的高位）。`, en: `Ones digit: ${onesD}.`, render: s => { s.innerHTML = wrap(row(onesD), line(`_ _ _ _ ${onesD}`)); } },
      { zh: `剩下 ${rest.slice().sort((x, y) => x - y).join('、')}，${wantBig ? '从大到小' : '从小到大'}排在万、千、百、十位：${rest.join('、')}。${zeroNote}`, en: `Arrange the rest ${wantBig ? 'from greatest' : 'from smallest'}.${zeroNote ? ' 0 cannot be the first digit.' : ''}`, render: s => { s.innerHTML = wrap(row(null, [onesD]), line(`${rest.join(' ')} ${onesD}`)); } },
      { zh: `答案：<b>${fmt(ans)}</b>。`, en: `${fmt(ans)}.`, render: s => { s.innerHTML = wrap(`<div class="center">${big(ans)}</div>`, line(fmt(ans))); } },
    ];
  };
  /* l4sameq：用同样的数字组比 n 小/大的数 {n, rel} */
  const sameAns = (n, rel) => { const ds = String(n).split('').map(Number); const list = [...new Set(perms(ds).filter(p => p[0] !== 0).map(p => +p.join('')))].filter(x => rel === 'smaller' ? x < n : x > n).sort((x, y) => rel === 'smaller' ? x - y : y - x); return list.slice(0, 2); };
  S.l4sameq = ({ n, rel }) => {
    const ds = String(n).split('').map(Number), [e1, e2] = sameAns(n, rel), small = rel === 'smaller';
    return [
      { zh: `${fmt(n)} 的数字是 ${ds.join('、')}。用<b>同样的 5 个数字</b>换顺序，组出比 ${fmt(n)} <b>${small ? '小' : '大'}</b>的数。`, en: `Rearrange the digits ${ds.join(', ')} to make a ${rel} number.`, render: s => { s.innerHTML = wrap(`<div class="center">${big(n)}</div>`, `<div class="center"><div class="digits-row">${ds.map(d => `<span>${d}</span>`).join('')}</div></div>`); } },
      { zh: `最简单的办法：把数字${small ? '从小到大' : '从大到小'}排，就是最${small ? '小' : '大'}的数 <b>${fmt(e1)}</b>${small && ds.includes(0) ? '（0 不能放最前面）' : ''}，它一定比 ${fmt(n)} ${small ? '小' : '大'}。`, en: `Arrange the digits ${small ? 'from smallest' : 'from greatest'}: ${fmt(e1)}.`, render: s => { s.innerHTML = wrap(`<div class="center">${cmp([n, e1])}</div>`, line(`${fmt(e1)} ${small ? '&lt;' : '&gt;'} ${fmt(n)}`)); } },
      { zh: `再换一个：比如 <b>${fmt(e2)}</b>，也比 ${fmt(n)} ${small ? '小' : '大'}。只要万位比 ${split(n).tt} ${small ? '小' : '大'}，或者万位一样、后面的位更${small ? '小' : '大'}，就可以。`, en: `Another one: ${fmt(e2)}.`, render: s => { s.innerHTML = wrap(`<div class="center">${cmp([n, e1, e2])}</div>`, line(`${fmt(e1)}, ${fmt(e2)}`)); } },
    ];
  };
  window.QTypes.l4sameq = q => {
    const ds = String(q.n).split('').sort().join(''), small = q.rel === 'smaller', ex = sameAns(q.n, q.rel);
    const valid = s => /^\d{5}$/.test(s) && s[0] !== '0' && s.split('').sort().join('') === ds && (small ? +s < q.n : +s > q.n);
    const html = () => `<div class="fill l4sameq">What are two numbers ${q.rel} than ${fmt(q.n)} that can be formed using the same digits?<br><input class="blank" data-k="a" type="text" inputmode="numeric" autocomplete="off" maxlength="5"> , <input class="blank" data-k="b" type="text" inputmode="numeric" autocomplete="off" maxlength="5"></div><div class="center mt"><button class="btn ok" id="submit">检查 ✔</button></div>`;
    const inputs = box => [...box.querySelectorAll('input.blank')];
    const parse = val => { try { return JSON.parse(val || '{}'); } catch (e) { return {}; } };
    return {
      prompt: { zh: `用 ${fmt(q.n)} 的 5 个数字，组两个比它${small ? '小' : '大'}的数`, en: `Two numbers ${q.rel} than ${fmt(q.n)} with the same digits` },
      stage: `<div class="center">${big(q.n)}</div>`,
      custom: {
        html,
        bind: (box, submit) => { const ins = inputs(box); ins.forEach((inp, i) => { inp.onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); submit(); } }; inp.oninput = () => { if (inp.value.length >= 5 && ins[i + 1]) ins[i + 1].focus(); }; }); box.querySelector('#submit').onclick = () => submit(); ins[0].focus({ preventScroll: true }); },
        value: box => { const [a, b] = inputs(box).map(i => i.value.trim()); return a && b ? JSON.stringify({ a, b }) : null; },
        markWrong: (box, val) => { const v = parse(val); inputs(box).forEach(inp => { const k = inp.dataset.k, good = valid(v[k]) && v.a !== v.b; inp.classList.toggle('good', good); inp.classList.toggle('badf', !good); }); const f = box.querySelector('input.badf'); if (f) f.select(); },
        showAnswer: box => { inputs(box).forEach((inp, i) => { inp.value = ex[i]; inp.classList.remove('badf'); inp.classList.add('good'); inp.disabled = true; }); box.querySelector('#submit').disabled = true; },
        lock: box => { inputs(box).forEach(i => i.disabled = true); box.querySelector('#submit').disabled = true; },
        restore: (box, val) => { const v = parse(val); inputs(box).forEach(inp => { inp.value = v[inp.dataset.k] || ''; inp.classList.add(valid(v[inp.dataset.k]) && v.a !== v.b ? 'good' : 'badf'); inp.disabled = true; }); box.querySelector('#submit').disabled = true; },
      },
      hint: { zh: `把数字${small ? '从小到大' : '从大到小'}排就一定${small ? '小' : '大'}；0 不能放在万位。`, en: `Arrange the digits ${small ? 'from smallest' : 'from greatest'}.` },
      answerText: `例如 ${fmt(ex[0])}, ${fmt(ex[1])}`,
      check: val => { const v = parse(val); return valid(v.a) && valid(v.b) && v.a !== v.b; },
      answerDisplay: val => { const v = parse(val); return `${v.a}, ${v.b}`; },
      explainKind: 'l4sameq', n: { n: q.n, rel: q.rel },
    };
  };
  /* l4cmpdigit：哪个数里数字 d 的值更大/小 {a, b, d, want} */
  S.l4cmpdigit = ({ a, b, d, want }) => {
    const place = n => K.find(k => split(n)[k] === d), ka = place(a), kb = place(b), xa = d * VAL[ka], xb = d * VAL[kb];
    const ans = want === 'greater' ? (xa > xb ? a : b) : (xa < xb ? a : b);
    return [
      { zh: `在 ${fmt(a)} 里，数字 ${d} 在<b>${ZH[ka]}</b>，值是 <b>${fmt(xa)}</b>。`, en: `In ${fmt(a)}, the digit ${d} is in the ${EN[ka]} place: ${fmt(xa)}.`, render: s => { s.innerHTML = wrap(`<div class="center">${big(a, ka)}</div>`, pv(a, { hl: ka }), line(fmt(xa))); } },
      { zh: `在 ${fmt(b)} 里，数字 ${d} 在<b>${ZH[kb]}</b>，值是 <b>${fmt(xb)}</b>。`, en: `In ${fmt(b)}, the digit ${d} is in the ${EN[kb]} place: ${fmt(xb)}.`, render: s => { s.innerHTML = wrap(`<div class="center">${big(b, kb)}</div>`, pv(b, { hl: kb }), line(fmt(xb))); } },
      { zh: `${fmt(xa)} 和 ${fmt(xb)}，${fmt(Math.max(xa, xb))} 大。要找 ${d} 的值更<b>${want === 'greater' ? '大' : '小'}</b>的，答案是 <b>${fmt(ans)}</b>。`, en: `${fmt(ans)} has the ${want} value of the digit ${d}.`, render: s => { s.innerHTML = wrap(line(`${fmt(xa)} ${xa > xb ? '&gt;' : '&lt;'} ${fmt(xb)} → ${fmt(ans)}`)); } },
    ];
  };
  /* l4moreless：多/少 {start, delta} 任意 delta，按位拆开一步步加减 */
  S.l4moreless = ({ start, delta }) => {
    const more = delta > 0, n = Math.abs(delta), end = start + delta, sign = more ? '+' : '−';
    const parts = []; let r = n; [10000, 1000, 100, 10, 1].forEach(u => { const c = Math.floor(r / u); if (c) { parts.push(c * u); r -= c * u; } });
    if (parts.length === 1) {
      const u = 10 ** Math.floor(Math.log10(n)), k = kindOf(u), count = n / u;
      const chain = Array.from({ length: count + 1 }, (_, i) => start + (more ? 1 : -1) * i * u);
      const carry = K.slice(0, K.indexOf(k)).some(kk => split(start)[kk] !== split(end)[kk]);
      return [
        { zh: `${fmt(n)} ${more ? 'more' : 'less'} than ${fmt(start)}：比 ${fmt(start)} <b>${more ? '多' : '少'} ${fmt(n)}</b>。${fmt(n)} 是 ${count} 个${ZHU[k]}，主要是<b>${ZH[k]}</b>在变。`, en: `${fmt(n)} is ${count} ${EN[k]}. The ${EN[k]} place changes.`, render: s => { s.innerHTML = wrap(`<div class="center">${big(start, k)}</div>`, pv(start, { hl: k })); } },
        { zh: `从 ${fmt(start)} ${more ? '往后' : '往回'}数 ${count} 个${ZHU[k]}：${chain.slice(1).map(fmt).join('、')}。`, en: chain.slice(1).map(fmt).join(', '), render: s => { s.innerHTML = wrap(`<div class="center">${numRow(chain, { hl: chain.map((_, i) => i).slice(1) })}</div>`); } },
        { zh: `${ZH[k]} ${split(start)[k]} ${sign} ${count} = ${split(start)[k] + (more ? count : -count)}${carry ? '，满 10 / 不够减，<b>前一位也跟着变</b>' : '，其他位不变'}。答案 <b>${fmt(end)}</b>。`, en: `${fmt(n)} ${more ? 'more' : 'less'} than ${fmt(start)} is ${fmt(end)}.`, render: s => { s.innerHTML = wrap(`<div class="center">${big(end, k)}</div>`, line(`${fmt(start)} ${sign} ${fmt(n)} = ${fmt(end)}`)); } },
      ];
    }
    const chain = [start]; parts.forEach(p => chain.push(chain[chain.length - 1] + (more ? p : -p)));
    const steps = [{ zh: `${fmt(n)} ${more ? 'more' : 'less'} than ${fmt(start)}：比 ${fmt(start)} <b>${more ? '多' : '少'} ${fmt(n)}</b>。把 ${fmt(n)} 按数位拆开：${parts.map(fmt).join(' + ')}，一位一位${more ? '加' : '减'}。`, en: `Split ${fmt(n)} into ${parts.map(fmt).join(' + ')} and ${more ? 'add' : 'subtract'} place by place.`, render: s => { s.innerHTML = wrap(`<div class="center">${numRow([start].concat(parts.map(() => null)))}</div>`, line(`${fmt(n)} = ${parts.map(fmt).join(' + ')}`)); } }];
    parts.forEach((p, i) => steps.push({ zh: `${fmt(chain[i])} ${sign} ${fmt(p)} = <b>${fmt(chain[i + 1])}</b>（${more ? '加' : '减'} ${p / 10 ** Math.floor(Math.log10(p))} 个${ZHU[kindOf(p)]}）。`, en: `${fmt(chain[i])} ${sign} ${fmt(p)} = ${fmt(chain[i + 1])}.`, render: s => { s.innerHTML = wrap(`<div class="center">${numRow(chain.slice(0, i + 2).concat(parts.slice(i + 1).map(() => null)), { hl: [i + 1] })}</div>`, line(`${fmt(chain[i])} ${sign} ${fmt(p)} = ${fmt(chain[i + 1])}`)); } }));
    steps.push({ zh: `所以 ${fmt(n)} ${more ? 'more' : 'less'} than ${fmt(start)} is <b>${fmt(end)}</b>。`, en: `${fmt(start)} ${sign} ${fmt(n)} = ${fmt(end)}.`, render: s => { s.innerHTML = wrap(`<div class="center">${numRow(chain, { hl: [chain.length - 1] })}</div>`, line(`${fmt(start)} ${sign} ${fmt(n)} = ${fmt(end)}`)); } });
    return steps;
  };
  /* l4round：四舍五入 {n, to} to = 10 / 100 / 1000 */
  const roundTo = (n, to) => Math.round(n / to) * to;
  const roundInfo = (n, to) => { const lo = Math.floor(n / to) * to, hi = lo + to, mid = lo + to / 2; return { lo, hi, mid, ans: roundTo(n, to) }; };
  S.l4round = ({ n, to }) => {
    const { lo, hi, mid, ans } = roundInfo(n, to), name = { 10: '十', 100: '百', 1000: '千' }[to], en = { 10: 'ten', 100: 'hundred', 1000: 'thousand' }[to];
    const dk = { 10: 'o', 100: 't', 1000: 'h' }[to], dv = split(n)[dk];
    const nl = arrows => `<div class="center">${numline(lo, hi, to / 10, [lo, mid, hi], arrows)}</div>`;
    const exact = n === lo;
    return [
      { zh: `把 ${fmt(n)} 四舍五入到最接近的<b>${name}</b>（nearest ${en}）：${exact ? `${fmt(n)} 本来就是整${name}。` : `${fmt(n)} 在 <b>${fmt(lo)}</b> 和 <b>${fmt(hi)}</b> 之间。`}`, en: `${fmt(n)} is between ${fmt(lo)} and ${fmt(hi)}.`, render: s => { s.innerHTML = wrap(nl([{ v: n, text: fmt(n) }])); } },
      exact ? { zh: `所以 ${fmt(n)} ≈ <b>${fmt(ans)}</b>，不用变。`, en: `${fmt(n)} ≈ ${fmt(ans)}.`, render: s => { s.innerHTML = wrap(nl([{ v: n, text: fmt(n), hl: true }]), line(`${fmt(n)} ≈ ${fmt(ans)}`)); } }
        : { zh: `中间是 ${fmt(mid)}。${n === mid ? `${fmt(n)} 正好在中间，规定<b>进上去</b>，取 ${fmt(hi)}。` : `${fmt(n)} ${n > mid ? '过了中间，离' : '没到中间，离'} <b>${fmt(ans)}</b> 更近。`}看${ZH[dk]}的 ${dv}：${dv >= 5 ? '≥ 5 进上去' : '< 5 舍掉'}。`, en: `${n === mid ? 'Exactly halfway: round up.' : `It is nearer to ${fmt(ans)}.`} The ${EN[dk]} digit is ${dv}: ${dv >= 5 ? 'round up' : 'round down'}.`, render: s => { s.innerHTML = wrap(nl([{ v: n, text: fmt(n), hl: true }]), line(`${fmt(n)} ≈ ${fmt(ans)}`)); } },
      { zh: `所以 <b>${fmt(n)} ≈ ${fmt(ans)}</b>。`, en: `${fmt(n)} ≈ ${fmt(ans)}.`, render: s => { s.innerHTML = wrap(line(`${fmt(n)} ≈ ${fmt(ans)}`)); } },
    ];
  };
  /* l4est：估算 {nums, ops, tos:[10] | [10,100]} */
  S.l4est = ({ nums, ops, tos }) => {
    const expr = ns => ns.map((x, i) => (i ? ` ${ops[i - 1] === '-' ? '−' : '+'} ` : '') + fmt(x)).join('');
    const calc = ns => ns.reduce((acc, x, i) => i ? (ops[i - 1] === '-' ? acc - x : acc + x) : x, 0);
    const steps = [];
    tos.forEach(to => {
      const name = { 10: '十', 100: '百' }[to], en = { 10: 'ten', 100: 'hundred' }[to], rs = nums.map(x => roundTo(x, to));
      steps.push({ zh: `先把每个数四舍五入到最接近的<b>${name}</b>：${nums.map((x, i) => `${x} ≈ ${rs[i]}`).join('，')}。`, en: `Round each number to the nearest ${en}: ${nums.map((x, i) => `${x} ≈ ${rs[i]}`).join(', ')}.`, render: s => { s.innerHTML = wrap(`<div class="center">${nums.map((x, i) => `<div class="expand-line">${x} ≈ ${rs[i]}</div>`).join('')}</div>`); } });
      steps.push({ zh: `再算：${expr(rs)} = <b>${fmt(calc(rs))}</b>。所以 ${expr(nums)} ≈ <b>${fmt(calc(rs))}</b>。`, en: `${expr(rs)} = ${fmt(calc(rs))}. So ${expr(nums)} ≈ ${fmt(calc(rs))}.`, render: s => { s.innerHTML = wrap(line(`${expr(rs)} = ${fmt(calc(rs))}`), line(`${expr(nums)} ≈ ${fmt(calc(rs))}`)); } });
    });
    return steps;
  };

  window.L4 = { discs, discrow, pv, big, cmp, split, fmt, formAns, sameAns, roundTo };
})();
