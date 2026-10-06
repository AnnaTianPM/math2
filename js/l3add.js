/* Level 3 · Unit 2-3  10 000 以内加减：四位竖式、圆片加减、心算 讲解动画 */
(function () {
  const line = t => `<div class="expand-line">${t}</div>`;
  const wrap = (...parts) => `<div class="l1wrap">${parts.join('')}</div>`;
  const A = window.ArithUI, L3 = window.L3;
  const K = ['o', 't', 'h', 'th'], NAME = { o: ['个', 'ones'], t: ['十', 'tens'], h: ['百', 'hundreds'], th: ['千', 'thousands'] };
  const CSS = { th: 'var(--thou)', h: 'var(--hund)', t: 'var(--tens)', o: 'var(--ones)' };
  const col = (k, s) => `<b style="color:${CSS[k]}">${s}</b>`;
  const split = n => ({ th: Math.floor(n / 1000), h: Math.floor(n / 100) % 10, t: Math.floor(n / 10) % 10, o: n % 10 });
  const colHTML = cfg => `<div class="center">${A.columnHTML(Object.assign({ width: 4 }, cfg))}</div>`;
  const T = n => Math.floor(n / 10) * 10, O = n => n % 10;

  const S = window.StepKinds;
  /* l3coladd：四位竖式加法 {a, b} */
  S.l3coladd = ({ a, b }) => {
    const sum = a + b, va = split(a), vb = split(b), res = ['', '', '', ''], carries = {};
    const steps = [{ zh: `把 ${a} 和 ${b} 上下对齐：个位对个位、十位对十位、百位对百位、千位对千位。<b>从个位开始加</b>。`, en: 'Line up the places. Start from the ones.', render: s => { s.innerHTML = colHTML({ a, b, op: '+' }); } }];
    let carry = 0;
    K.forEach((k, i) => {
      const x = va[k], y = vb[k], s = x + y + carry, d = s % 10, c = Math.floor(s / 10);
      res[3 - i] = k === 'th' ? s : d; const snap = res.slice(); const nc = Object.assign({}, carries); if (c && k !== 'th') nc[K[i + 1]] = 1;
      const ctxt = carry ? ` + 进上来的 1` : '';
      steps.push({ zh: `${i === 0 ? '先' : i === 3 ? '最后' : '再'}加${NAME[k][0]}位：${col(k, x)} + ${col(k, y)}${ctxt} = ${s}${c && k !== 'th' ? `。满 10 要<b>进位</b>：写 ${d}，向${NAME[K[i + 1]][0]}位进 1` : `，写 ${k === 'th' ? s : d}`}。`, en: `Add the ${NAME[k][1]}: ${x} + ${y}${carry ? ' + 1' : ''} = ${s}.${c && k !== 'th' ? ` Regroup: write ${d}, carry 1.` : ''}`, render: st => { st.innerHTML = colHTML({ a, b, op: '+', result: snap, carries: nc, hl: k }); } });
      Object.assign(carries, nc); carry = c;
    });
    steps.push({ zh: `所以 <b>${a} + ${b} = ${sum}</b>。`, en: `${a} + ${b} = ${sum}.`, render: s => { s.innerHTML = wrap(colHTML({ a, b, op: '+', result: res, carries }), line(`${a} + ${b} = ${sum}`)); } });
    return steps;
  };
  /* l3colsub：四位竖式减法 {a, b} */
  S.l3colsub = ({ a, b }) => {
    const diff = a - b, va = split(a), vb = split(b), res = ['', '', '', ''], regroup = {}, strike = {};
    const cur = Object.assign({}, va);
    const steps = [{ zh: `把 ${a} 和 ${b} 上下对齐，<b>从个位开始减</b>。不够减就向前一位借 1。`, en: 'Line up the places. Start from the ones. Regroup when needed.', render: s => { s.innerHTML = colHTML({ a, b, op: '-' }); } }];
    K.forEach((k, i) => {
      let x = cur[k]; const y = vb[k];
      if (x < y) { const nk = K[i + 1]; let j = i + 1; while (cur[K[j]] === 0) j++; // 连续借位
        for (let m = j; m > i; m--) { const kk = K[m], lower = K[m - 1]; cur[kk] -= 1; regroup[kk] = cur[kk]; strike[kk] = true; cur[lower] += 10; regroup[lower] = cur[lower]; strike[lower] = true; }
        x = cur[k];
        const snapR = Object.assign({}, regroup), snapS = Object.assign({}, strike);
        steps.push({ zh: `${NAME[k][0]}位 ${col(k, va[k])} 不够减 ${col(k, y)}，向${NAME[nk][0]}位<b>借 1</b>${j > i + 1 ? `（${NAME[nk][0]}位是 0，要先从${NAME[K[j]][0]}位借）` : ''}：${NAME[k][0]}位变成 ${x}。`, en: `${va[k]} is less than ${y}. Regroup 1 ${NAME[nk][1].replace(/s$/, '')}: ${x} ${NAME[k][1]}.`, render: st => { st.innerHTML = colHTML({ a, b, op: '-', result: res.slice(), regroup: snapR, strike: snapS, hl: k }); } }); }
      const d = x - y; res[3 - i] = d; const snap = res.slice(), snapR = Object.assign({}, regroup), snapS = Object.assign({}, strike);
      steps.push({ zh: `${i === 0 ? '先' : i === 3 ? '最后' : '再'}减${NAME[k][0]}位：${x} − ${col(k, y)} = <b>${d}</b>。`, en: `${NAME[k][1]}: ${x} − ${y} = ${d}.`, render: st => { st.innerHTML = colHTML({ a, b, op: '-', result: snap, regroup: snapR, strike: snapS, hl: k }); } });
    });
    const final = res.map((d, i) => i === 0 && d === 0 ? '' : d);
    steps.push({ zh: `所以 <b>${a} − ${b} = ${diff}</b>。检查：${diff} + ${b} = ${a} ✔`, en: `${a} − ${b} = ${diff}.`, render: s => { s.innerHTML = wrap(colHTML({ a, b, op: '-', result: final, regroup, strike }), line(`${a} − ${b} = ${diff}`)); } });
    return steps;
  };
  /* l3discadd：圆片加法 {a, b} */
  S.l3discadd = ({ a, b }) => {
    const sum = a + b, pair = hl => `<div class="center"><div class="disc-pair"><span class="lbl">${a}</span>${L3.discs(a, { hl })}<span class="lbl">+ ${b}</span>${L3.discs(b, { hl })}</div></div>`;
    return [
      { zh: `${a} 和 ${b} 的圆片：把同一种圆片<b>合起来</b>数。`, en: 'Put the discs together.', render: s => { s.innerHTML = wrap(pair()); } },
      ...['o', 't', 'h', 'th'].map(k => ({ zh: `${NAME[k][0]}：${split(a)[k]} 个 + ${split(b)[k]} 个 = ${split(a)[k] + split(b)[k]} 个${split(a)[k] + split(b)[k] >= 10 ? `，10 个换成 1 个${NAME[K[K.indexOf(k) + 1]][0]}` : ''}。`, en: `${NAME[k][1]}: ${split(a)[k]} + ${split(b)[k]}.`, render: s => { s.innerHTML = wrap(pair(k)); } })),
      { zh: `合起来是 <b>${sum}</b>。写成竖式检查一遍：`, en: `${sum}.`, render: s => { s.innerHTML = wrap(`<div class="center"><div class="disc-pair"><span class="lbl">= ${sum}</span>${L3.discs(sum)}</div></div>`); } },
      ...S.l3coladd({ a, b }).slice(1),
    ];
  };
  /* l3mental2：拆十拆一 {a, b} 两位数 */
  S.l3mental2 = ({ a, b }) => {
    const sum = a + b, t = T(a) + T(b), o = O(a) + O(b);
    const bonds = hl => `<div class="center"><div class="bond-groups">${window.L1.bond(a, T(a), O(a), { hl })}${window.L1.bond(b, T(b), O(b), { hl })}</div></div>`;
    return [
      { zh: `${a} + ${b}：把两个数都拆成<b>几十和几</b>：${a} = ${T(a)} + ${O(a)}，${b} = ${T(b)} + ${O(b)}。`, en: `Split into tens and ones.`, render: s => { s.innerHTML = wrap(bonds('w')); } },
      { zh: `几十加几十：${T(a)} + ${T(b)} = <b>${t}</b>。`, en: `${T(a)} + ${T(b)} = ${t}.`, render: s => { s.innerHTML = wrap(bonds('a'), line(`${T(a)} + ${T(b)} = ${t}`)); } },
      { zh: `几加几：${O(a)} + ${O(b)} = <b>${o}</b>。`, en: `${O(a)} + ${O(b)} = ${o}.`, render: s => { s.innerHTML = wrap(bonds('b'), line(`${T(a)} + ${T(b)} = ${t}`), line(`${O(a)} + ${O(b)} = ${o}`)); } },
      { zh: `合起来：${t} + ${o} = <b>${sum}</b>。所以 ${a} + ${b} = ${sum}。`, en: `${t} + ${o} = ${sum}.`, render: s => { s.innerHTML = wrap(line(`${t} + ${o} = ${sum}`), line(`${a} + ${b} = ${sum}`)); } },
    ];
  };
  /* l3mental1：凑整十 {a, b, round:'a'|'b'} 把另一个数拆成 补数 + 剩下 */
  S.l3mental1 = ({ a, b, round }) => {
    const r = round === 'b' ? b : a, s = round === 'b' ? a : b, comp = (10 - O(r)) % 10 || 10, rest = s - comp, ten = r + comp, sum = a + b;
    const bond = hl => `<div class="center">${window.L1.bond(s, comp, rest, { hl })}</div>`;
    return [
      { zh: `${a} + ${b}：${r} 离整十只差 ${comp}（${r} + ${comp} = ${ten}）。把 <b>${s}</b> 拆成 <b>${comp}</b> 和 <b>${rest}</b>。`, en: `${r} needs ${comp} to make ${ten}. Split ${s} into ${comp} and ${rest}.`, render: st => { st.innerHTML = wrap(bond('w'), line(`${a} + ${b} = ?`)); } },
      { zh: `先凑整十：${r} + ${comp} = <b>${ten}</b>。`, en: `${r} + ${comp} = ${ten}.`, render: st => { st.innerHTML = wrap(bond('a'), line(`${r} + ${comp} = ${ten}`)); } },
      { zh: `再加剩下的：${ten} + ${rest} = <b>${sum}</b>。所以 ${a} + ${b} = ${sum}。`, en: `${ten} + ${rest} = ${sum}.`, render: st => { st.innerHTML = wrap(bond('b'), line(`${r} + ${comp} = ${ten}`), line(`${ten} + ${rest} = ${sum}`)); } },
    ];
  };
})();
