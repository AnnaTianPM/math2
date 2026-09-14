/* 加减法：题型（column 竖式、eq 横式）与讲解动画（counton, countback, mental, column, blocksadd, blockssub） */
(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const split = n => ({ h: Math.floor(n / 100), t: Math.floor(n / 10) % 10, o: n % 10 });
  const C = { h: '#4a90e2', t: '#27ae60', o: '#f39c12' };
  const col = (k, s) => `<b style="color:${C[k]}">${s}</b>`;
  const digits = (n, w = 3) => String(n).padStart(w, ' ').split('');

  function numRow(nums, opts = {}) {
    const hl = opts.hl || [];
    return `<div class="numrow">${opts.label ? `<div class="numrow-label">${opts.label}</div>` : ''}<div class="numrow-boxes">${nums.map((n, i) => `<span class="nbox ${hl.includes(i) ? 'on' : ''}">${n}</span>`).join('')}</div></div>`;
  }

  /* ---------- 竖式渲染 ----------
   * cfg = { a, b, op:'+'|'-', width, carries:{h,t,o}, regroup:{h:'3',t:'9',o:'10'}, strike:{h,t,o}, result:[digits or ''], hl:'o'|'t'|'h'|null }
   */
  function columnHTML(cfg) {
    const w = cfg.width || 4;
    const keys = ['th', 'h', 't', 'o'].slice(4 - w);
    const da = digits(cfg.a, w), db = digits(cfg.b, w);
    const res = cfg.result || Array(w).fill('');
    const carries = cfg.carries || {}, regroup = cfg.regroup || {}, strike = cfg.strike || {};
    const head = keys.map(k => `<div class="col-head ${k}">${{ th: '千', h: 'H 百', t: 'T 十', o: 'O 个' }[k]}</div>`).join('');
    const rowA = keys.map((k, i) => `<div class="col-cell ${k} ${cfg.hl === k ? 'hl' : ''}"><span class="regroup">${regroup[k] !== undefined ? regroup[k] : (carries[k] !== undefined ? `<i class="carry">${carries[k]}</i>` : '')}</span><span class="dg ${strike[k] ? 'strike' : ''}">${da[i].trim()}</span></div>`).join('');
    const rowB = keys.map((k, i) => `<div class="col-cell ${k} ${cfg.hl === k ? 'hl' : ''}">${i === 0 ? `<span class="op">${cfg.op === '-' ? '−' : '+'}</span>` : ''}<span class="dg">${db[i].trim()}</span></div>`).join('');
    const rowR = keys.map((k, i) => `<div class="col-cell res ${k} ${cfg.hl === k ? 'hl' : ''}"><span class="dg">${res[i] === undefined ? '' : res[i]}</span></div>`).join('');
    return `<div class="column" style="grid-template-columns: repeat(${w}, 64px)">${head}${rowA}${rowB}${rowR}</div>`;
  }

  /* ---------- 讲解：竖式加法 ---------- */
  window.StepKinds.coladd = ({ a, b }) => {
    const sum = a + b;
    const w = sum >= 1000 ? 4 : 3;
    const A = split(a), B = split(b);
    const steps = [];
    const st = cfg => stage => { stage.innerHTML = `<div class="center">${columnHTML(Object.assign({ a, b, op: '+', width: w }, cfg))}</div>`; };
    const res = Array(w).fill('');
    const idx = k => w - 1 - ['o', 't', 'h', 'th'].indexOf(k);
    steps.push({ zh: `先把 ${a} 和 ${b} 上下对齐：个位对个位，十位对十位，百位对百位。`, en: 'Line up the ones, tens and hundreds.', render: st({}) });
    const carries = {};
    let carry = 0;
    const names = { o: ['个', 'ones'], t: ['十', 'tens'], h: ['百', 'hundreds'] };
    for (const k of ['o', 't', 'h']) {
      const x = A[k], y = B[k];
      const s = x + y + carry;
      const d = s % 10, c = Math.floor(s / 10);
      const carryTxt = carry ? ` + 进上来的 ${carry}` : '';
      if (k === 'h' && c) { res[idx('th')] = c; }
      res[idx(k)] = d;
      const snapshot = res.slice();
      const newCarries = Object.assign({}, carries);
      if (c && k !== 'h') newCarries[k === 'o' ? 't' : 'h'] = 1;
      const zh = c && k !== 'h'
        ? `${k === 'o' ? '先' : '再'}加${names[k][0]}位：${col(k, x)} + ${col(k, y)}${carryTxt} = ${s}。${s} 个${names[k][0]}要<b>进位</b>：写 ${d}，向${k === 'o' ? '十' : '百'}位进 1。`
        : `${k === 'o' ? '先' : k === 't' ? '再' : '最后'}加${names[k][0]}位：${col(k, x)} + ${col(k, y)}${carryTxt} = ${s}${k === 'h' && c ? `，写 ${s}` : `，写 ${d}`}。`;
      const en = `Add the ${names[k][1]}: ${x} + ${y}${carry ? ' + ' + carry : ''} = ${s}.${c && k !== 'h' ? ` Regroup: write ${d}, carry 1.` : ''}`;
      steps.push({ zh, en, render: st({ carries: newCarries, result: snapshot, hl: k }) });
      Object.assign(carries, newCarries);
      carry = c;
    }
    steps.push({ zh: `所以 ${a} + ${b} = <b>${sum}</b>。`, en: `So ${a} + ${b} = ${sum}.`, render: st({ carries, result: res }) });
    return steps;
  };

  /* ---------- 讲解：竖式减法 ---------- */
  window.StepKinds.colsub = ({ a, b }) => {
    const diff = a - b;
    const A = split(a), B = split(b);
    const steps = [];
    const st = cfg => stage => { stage.innerHTML = `<div class="center">${columnHTML(Object.assign({ a, b, op: '-', width: 3 }, cfg))}</div>`; };
    const res = ['', '', ''];
    const idx = { o: 2, t: 1, h: 0 };
    const names = { o: ['个', 'ones'], t: ['十', 'tens'], h: ['百', 'hundreds'] };
    steps.push({ zh: `先把 ${a} 和 ${b} 上下对齐：个位对个位，十位对十位，百位对百位。`, en: 'Line up the ones, tens and hundreds.', render: st({}) });
    // 当前各位的值（借位后会变）
    const cur = { h: A.h, t: A.t, o: A.o };
    const regroup = {}, strike = {};
    const order = ['o', 't', 'h'];
    for (let i = 0; i < 3; i++) {
      const k = order[i];
      if (cur[k] < B[k]) {
        // 需要借位：从左边找非零位
        let j = i + 1;
        while (j < 3 && cur[order[j]] === 0) j++;
        // 逐级借：从 order[j] 借到 order[i]
        for (let m = j; m > i; m--) {
          const from = order[m], to = order[m - 1];
          cur[from] -= 1; cur[to] += 10;
          strike[from] = true; strike[to] = true;
          regroup[from] = cur[from]; regroup[to] = cur[to];
          const zh = `${names[k][0]}位 ${col(k, k === to ? cur[to] - 10 : cur[k])} 不够减 ${col(k, B[k])}，向${names[from][0]}位<b>借 1</b>：${names[from][0]}位 ${cur[from] + 1} 变成 ${cur[from]}，${names[to][0]}位变成 ${cur[to]}。`;
          const en = `${cur[to] - 10} ${names[k][1]} is less than ${B[k]}. Regroup 1 ${names[from][1].slice(0, -1)} into 10 ${names[to][1]}: ${names[from][1]} become ${cur[from]}, ${names[to][1]} become ${cur[to]}.`;
          steps.push({ zh, en, render: st({ regroup: Object.assign({}, regroup), strike: Object.assign({}, strike), result: res.slice(), hl: to }) });
        }
      }
      const d = cur[k] - B[k];
      res[idx[k]] = d;
      const zh = `${k === 'o' ? '先' : k === 't' ? '再' : '最后'}减${names[k][0]}位：${col(k, cur[k])} − ${col(k, B[k])} = ${d}，写 ${d}。`;
      steps.push({ zh, en: `Subtract the ${names[k][1]}: ${cur[k]} − ${B[k]} = ${d}.`, render: st({ regroup: Object.assign({}, regroup), strike: Object.assign({}, strike), result: res.slice(), hl: k }) });
    }
    steps.push({ zh: `所以 ${a} − ${b} = <b>${diff}</b>${res[0] === 0 ? '（百位是 0，不用写）' : ''}。`, en: `So ${a} − ${b} = ${diff}.`, render: st({ regroup, strike, result: res }) });
    return steps;
  };

  /* ---------- 讲解：数数（counting on / back） ---------- */
  window.StepKinds.count = ({ a, b, op }) => {
    const add = op === '+';
    const step = b % 100 === 0 ? 100 : b % 10 === 0 ? 10 : 1;
    const n = b / step;
    const seq = []; for (let i = 0; i <= n; i++) seq.push(add ? a + i * step : a - i * step);
    const ans = add ? a + b : a - b;
    const unitZh = step === 1 ? '一' : step === 10 ? '十' : '百';
    return [
      { zh: `${a} ${add ? '+' : '−'} ${b}：从 ${a} 开始${add ? '往前' : '往回'}数。${b} 就是 ${n} 个${unitZh}，所以每次${add ? '加' : '减'} ${step}，数 ${n} 次。`, en: `Start at ${a}. Count ${add ? 'on' : 'back'} ${n} ${step === 1 ? 'ones' : step === 10 ? 'tens' : 'hundreds'}.`, render: stg => { stg.innerHTML = `<div class="center">${numRow([a], { label: `${add ? 'count on' : 'count back'} ${b}` })}</div>`; } },
      { zh: seq.join(' → '), en: seq.join(', '), render: stg => { stg.innerHTML = `<div class="center">${numRow(seq, { hl: seq.map((_, i) => i) })}</div>`; } },
      { zh: `数到 <b>${ans}</b>。所以 ${a} ${add ? '+' : '−'} ${b} = <b>${ans}</b>。`, en: `We reach ${ans}. So ${a} ${add ? '+' : '−'} ${b} = ${ans}.`, render: stg => { stg.innerHTML = `<div class="center">${numRow(seq, { hl: [seq.length - 1] })}<div class="expand-line">${a} ${add ? '+' : '−'} ${b} = ${ans}</div></div>`; } },
    ];
  };

  /* ---------- 讲解：心算（凑十 / 拆数） ---------- */
  window.StepKinds.mental = ({ a, b, op }) => {
    const add = op === '+';
    const ans = add ? a + b : a - b;
    const line = (t) => `<div class="expand-line">${t}</div>`;
    if (add) {
      if (b < 10) {
        // a + b: a + 10 - (10 - b)
        const mid = a + 10, back = 10 - b;
        return [
          { zh: `${a} + ${b}，先加 10 再减回去更好算：${b} = 10 − ${back}。`, en: `${b} is 10 − ${back}. Add 10 first, then take away ${back}.`, render: s => { s.innerHTML = line(`${a} + ${b} = ?`); } },
          { zh: `${a} + 10 = <b>${mid}</b>`, en: `${a} + 10 = ${mid}`, render: s => { s.innerHTML = line(`${a} + 10 = ${mid}`); } },
          { zh: `${mid} − ${back} = <b>${ans}</b>`, en: `${mid} − ${back} = ${ans}`, render: s => { s.innerHTML = line(`${a} + 10 = ${mid}<br>${mid} − ${back} = ${ans}`); } },
          { zh: `所以 ${a} + ${b} = <b>${ans}</b>。`, en: `So ${a} + ${b} = ${ans}.`, render: s => { s.innerHTML = line(`${a} + ${b} = ${ans}`); } },
        ];
      }
      if (b % 100 === 0 || (b % 10 === 0 && b < 100)) {
        // 整十/整百：拆 a 的对应位
        const isH = b % 100 === 0;
        const part = isH ? Math.floor(a / 100) * 100 : Math.floor(a / 10) * 10 % 100 + Math.floor(a / 100) * 100;
        const rest = a - part;
        const A = split(a);
        const partVal = isH ? A.h * 100 : A.h * 100 + A.t * 10;
        const restVal = a - partVal;
        const mid = partVal + b;
        return [
          { zh: `${a} + ${b}：${b} 是整${isH ? '百' : '十'}，只要看 ${a} 的${isH ? '百' : '十'}位就行。把 ${a} 拆成 ${partVal} 和 ${restVal}。`, en: `Split ${a} into ${partVal} and ${restVal}.`, render: s => { s.innerHTML = line(`${a} = ${partVal} + ${restVal}`); } },
          { zh: `${partVal} + ${b} = <b>${mid}</b>`, en: `${partVal} + ${b} = ${mid}`, render: s => { s.innerHTML = line(`${partVal} + ${b} = ${mid}`); } },
          { zh: `${mid} + ${restVal} = <b>${ans}</b>`, en: `${mid} + ${restVal} = ${ans}`, render: s => { s.innerHTML = line(`${partVal} + ${b} = ${mid}<br>${mid} + ${restVal} = ${ans}`); } },
          { zh: `所以 ${a} + ${b} = <b>${ans}</b>。`, en: `So ${a} + ${b} = ${ans}.`, render: s => { s.innerHTML = line(`${a} + ${b} = ${ans}`); } },
        ];
      }
      return window.StepKinds.coladd({ a, b });
    } else {
      if (b < 10) {
        const mid = a - 10, back = 10 - b;
        return [
          { zh: `${a} − ${b}，先减 10 再加回来更好算：${b} = 10 − ${back}。`, en: `${b} is 10 − ${back}. Take away 10 first, then add ${back} back.`, render: s => { s.innerHTML = line(`${a} − ${b} = ?`); } },
          { zh: `${a} − 10 = <b>${mid}</b>`, en: `${a} − 10 = ${mid}`, render: s => { s.innerHTML = line(`${a} − 10 = ${mid}`); } },
          { zh: `${mid} + ${back} = <b>${ans}</b>`, en: `${mid} + ${back} = ${ans}`, render: s => { s.innerHTML = line(`${a} − 10 = ${mid}<br>${mid} + ${back} = ${ans}`); } },
          { zh: `所以 ${a} − ${b} = <b>${ans}</b>。`, en: `So ${a} − ${b} = ${ans}.`, render: s => { s.innerHTML = line(`${a} − ${b} = ${ans}`); } },
        ];
      }
      if (b % 100 === 0 || (b % 10 === 0 && b < 100)) {
        const isH = b % 100 === 0;
        const A = split(a);
        const partVal = isH ? A.h * 100 : A.h * 100 + A.t * 10;
        const restVal = a - partVal;
        const mid = partVal - b;
        return [
          { zh: `${a} − ${b}：${b} 是整${isH ? '百' : '十'}。把 ${a} 拆成 ${partVal} 和 ${restVal}。`, en: `Split ${a} into ${partVal} and ${restVal}.`, render: s => { s.innerHTML = line(`${a} = ${partVal} + ${restVal}`); } },
          { zh: `${partVal} − ${b} = <b>${mid}</b>`, en: `${partVal} − ${b} = ${mid}`, render: s => { s.innerHTML = line(`${partVal} − ${b} = ${mid}`); } },
          { zh: `${mid} + ${restVal} = <b>${ans}</b>`, en: `${mid} + ${restVal} = ${ans}`, render: s => { s.innerHTML = line(`${partVal} − ${b} = ${mid}<br>${mid} + ${restVal} = ${ans}`); } },
          { zh: `所以 ${a} − ${b} = <b>${ans}</b>。`, en: `So ${a} − ${b} = ${ans}.`, render: s => { s.innerHTML = line(`${a} − ${b} = ${ans}`); } },
        ];
      }
      return window.StepKinds.colsub({ a, b });
    }
  };

  /* ---------- 讲解：方块加减 ---------- */
  window.StepKinds.blocksadd = ({ a, b }) => {
    const A = split(a), B = split(b), S = split(a + b);
    const ui = window.UI;
    const rows = (hl) => `<div class="blk-table">
      <div class="blk-row"><div class="blk-num">${a}</div>${['h', 't', 'o'].map(k => `<div class="blk-cell ${hl === k ? 'hl' : ''}"><div class="blocks">${Blocks.render({ [k]: A[k] }, { scale: 1 })}</div></div>`).join('')}</div>
      <div class="blk-row"><div class="blk-num">${b}</div>${['h', 't', 'o'].map(k => `<div class="blk-cell ${hl === k ? 'hl' : ''}"><div class="blocks">${Blocks.render({ [k]: B[k] }, { scale: 1 })}</div></div>`).join('')}</div>
      <div class="blk-row head"><div></div><div class="h">Hundreds 百</div><div class="t">Tens 十</div><div class="o">Ones 个</div></div>
      <div class="blk-row sum"><div></div>${['h', 't', 'o'].map(k => `<div class="${k} ${hl === k || hl === 'all' ? 'on' : ''}">${(hl === k || hl === 'all' || (['h', 't', 'o'].indexOf(hl) > ['h', 't', 'o'].indexOf(k))) ? A[k] + B[k] : ''}</div>`).join('')}</div></div>`;
    return [
      { zh: `把 ${a} 和 ${b} 的方块都摆出来：百对百，十对十，个对个。`, en: 'Put the blocks of both numbers in columns.', render: s => { s.innerHTML = rows(null); } },
      { zh: `先数个：${col('o', A.o)} + ${col('o', B.o)} = ${A.o + B.o} 个一。`, en: `Ones: ${A.o} + ${B.o} = ${A.o + B.o}.`, render: s => { s.innerHTML = rows('o'); } },
      { zh: `再数十：${col('t', A.t)} + ${col('t', B.t)} = ${A.t + B.t} 个十。`, en: `Tens: ${A.t} + ${B.t} = ${A.t + B.t}.`, render: s => { s.innerHTML = rows('t'); } },
      { zh: `最后数百：${col('h', A.h)} + ${col('h', B.h)} = ${A.h + B.h} 个百。`, en: `Hundreds: ${A.h} + ${B.h} = ${A.h + B.h}.`, render: s => { s.innerHTML = rows('h'); } },
      { zh: `${A.h + B.h} 个百 ${A.t + B.t} 个十 ${A.o + B.o} 个一，就是 <b>${a + b}</b>。`, en: `That is ${a + b}.`, render: s => { s.innerHTML = rows('all') + `<div class="expand-line">${a} + ${b} = ${a + b}</div>`; } },
    ];
  };
  window.StepKinds.blockssub = ({ a, b }) => {
    const A = split(a), B = split(b), D = split(a - b);
    const cell = (k, hl) => `<div class="blk-cell ${hl === k ? 'hl' : ''}"><div class="blocks" data-k="${k}">${Blocks.render({ [k]: A[k] }, { scale: 1 })}</div></div>`;
    const rows = (hl, crossed) => `<div class="blk-table">
      <div class="blk-row"><div class="blk-num">${a} − ${b}</div>${['h', 't', 'o'].map(k => cell(k, hl)).join('')}</div>
      <div class="blk-row head"><div></div><div class="h">Hundreds 百</div><div class="t">Tens 十</div><div class="o">Ones 个</div></div>
      <div class="blk-row sum"><div></div>${['h', 't', 'o'].map(k => `<div class="${k}">${crossed.includes(k) ? D[k] : ''}</div>`).join('')}</div></div>`;
    // 划掉：把该列后 B[k] 个方块标记
    const cross = (stage, ks) => ks.forEach(k => { const svg = stage.querySelector(`.blocks[data-k="${k}"] svg`); if (!svg) return; const gs = [...svg.querySelectorAll('.blk')]; gs.slice(gs.length - B[k]).forEach(g => g.classList.add('crossed')); });
    return [
      { zh: `摆出 ${a} 的方块。要减去 ${b}，就是拿走 ${B.h} 个百、${B.t} 个十、${B.o} 个一。`, en: `Show ${a} in blocks. Take away ${b}.`, render: s => { s.innerHTML = rows(null, []); } },
      { zh: `先拿走个：${col('o', A.o)} 个一划掉 ${B.o} 个，剩 ${A.o - B.o}。`, en: `Ones: ${A.o} − ${B.o} = ${A.o - B.o}.`, render: s => { s.innerHTML = rows('o', ['o']); cross(s, ['o']); } },
      { zh: `再拿走十：${col('t', A.t)} 个十划掉 ${B.t} 个，剩 ${A.t - B.t}。`, en: `Tens: ${A.t} − ${B.t} = ${A.t - B.t}.`, render: s => { s.innerHTML = rows('t', ['o', 't']); cross(s, ['o', 't']); } },
      { zh: `最后拿走百：${col('h', A.h)} 个百划掉 ${B.h} 个，剩 ${A.h - B.h}。`, en: `Hundreds: ${A.h} − ${B.h} = ${A.h - B.h}.`, render: s => { s.innerHTML = rows('h', ['o', 't', 'h']); cross(s, ['o', 't', 'h']); } },
      { zh: `剩下 ${D.h} 个百 ${D.t} 个十 ${D.o} 个一，就是 <b>${a - b}</b>。`, en: `That is ${a - b}.`, render: s => { s.innerHTML = rows(null, ['o', 't', 'h']) + `<div class="expand-line">${a} − ${b} = ${a - b}</div>`; cross(s, ['o', 't', 'h']); } },
    ];
  };

  /* ================= 题型 ================= */

  /* eq：横式  q = { id, type:'eq', a, b, op, explain?:kind }  答案自动算 */
  window.QTypes.eq = q => {
    const ans = q.op === '+' ? q.a + q.b : q.a - q.b;
    const kind = q.explain || (q.op === '+' ? 'coladd' : 'colsub');
    return {
      prompt: q.prompt || { zh: '算一算', en: 'Work it out' },
      stage: `<div class="eq-big">${q.a} ${q.op === '-' ? '−' : '+'} ${q.b} = <span class="eq-q">?</span></div>`,
      inputType: 'number',
      hint: q.hint || (q.op === '+' ? { zh: '可以先加个位，再加十位，再加百位。', en: 'Add the ones, then the tens, then the hundreds.' } : { zh: '可以先减个位，再减十位，再减百位。不够减就向左边借 1。', en: 'Subtract the ones, then the tens, then the hundreds.' }),
      answerText: String(ans),
      check: v => parseInt(v, 10) === ans,
      explainKind: kind, n: { a: q.a, b: q.b, op: q.op },
    };
  };

  /* column：竖式，每一位一个格子（含千位可选）  q = { id, type:'column', a, b, op } */
  window.QTypes.column = q => {
    const ans = q.op === '+' ? q.a + q.b : q.a - q.b;
    const w = ans >= 1000 ? 4 : 3;
    const ansD = String(ans).padStart(w, '0').split('');
    // 前导 0 允许不填
    const lead = ansD.findIndex(d => d !== '0');
    function html() {
      const keys = ['th', 'h', 't', 'o'].slice(4 - w);
      const da = digits(q.a, w), db = digits(q.b, w);
      const head = keys.map(k => `<div class="col-head ${k}">${{ th: '千', h: 'H 百', t: 'T 十', o: 'O 个' }[k]}</div>`).join('');
      const rowA = keys.map((k, i) => `<div class="col-cell ${k}"><span class="regroup"><input class="carry-in" data-k="${k}" maxlength="2" placeholder="" title="进位/借位（可不填）"></span><span class="dg">${da[i].trim()}</span></div>`).join('');
      const rowB = keys.map((k, i) => `<div class="col-cell ${k}">${i === 0 ? `<span class="op">${q.op === '-' ? '−' : '+'}</span>` : ''}<span class="dg">${db[i].trim()}</span></div>`).join('');
      const rowR = keys.map((k, i) => `<div class="col-cell res ${k}"><input class="col-in" data-i="${i}" maxlength="1" inputmode="numeric" autocomplete="off"></div>`).join('');
      return `<div class="center"><div class="column" style="grid-template-columns: repeat(${w}, 64px)">${head}${rowA}${rowB}${rowR}</div>
        <div class="sub">从右往左填：先个位，再十位，再百位。上面小格可以写进位/借位（不算分）。</div>
        <div class="center mt"><button class="btn ok" id="submit">检查 ✔</button></div></div>`;
    }
    function bind(box, submit) {
      const ins = [...box.querySelectorAll('.col-in')];
      ins.forEach((inp, i) => {
        inp.onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); submit(); } if (e.key === 'Backspace' && !inp.value && ins[i + 1]) { ins[i + 1].focus(); } };
        inp.oninput = () => { inp.value = inp.value.replace(/\D/g, '').slice(-1); if (inp.value && ins[i - 1]) ins[i - 1].focus(); };
      });
      box.querySelectorAll('.carry-in').forEach(c => { c.onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); submit(); } }; });
      $('#submit', box).onclick = () => submit();
      ins[ins.length - 1].focus({ preventScroll: true });
    }
    function value(box) {
      const ins = [...box.querySelectorAll('.col-in')];
      const s = ins.map(i => i.value || '0').join('');
      if (ins.every(i => !i.value)) return null;
      return String(parseInt(s, 10));
    }
    function markWrong(box, val) {
      const ins = [...box.querySelectorAll('.col-in')];
      ins.forEach((inp, i) => { const good = (inp.value || '0') === ansD[i]; inp.classList.toggle('good', good && (inp.value || i >= lead)); inp.classList.toggle('badf', !good); });
      const first = ins.slice().reverse().find(i => i.classList.contains('badf')); if (first) first.select();
    }
    function showAnswer(box) { const ins = [...box.querySelectorAll('.col-in')]; ins.forEach((inp, i) => { inp.value = i < lead ? '' : ansD[i]; inp.classList.remove('badf'); inp.classList.add('good'); }); lock(box); }
    function lock(box) { box.querySelectorAll('input').forEach(i => i.disabled = true); const s = box.querySelector('#submit'); if (s) s.disabled = true; }
    function restore(box, val, status) {
      const ins = [...box.querySelectorAll('.col-in')];
      const v = String(val === undefined || val === null ? '' : val).padStart(w, ' ');
      ins.forEach((inp, i) => { const ch = v[i] && v[i] !== ' ' ? v[i] : ''; inp.value = ch; const good = (ch || '0') === ansD[i]; inp.classList.add(good ? 'good' : 'badf'); });
      lock(box);
    }
    return {
      prompt: q.prompt || { zh: '列竖式算一算', en: 'Add' + (q.op === '-' ? '' : '') + ' these numbers' },
      stage: '',
      custom: { html, bind, value, markWrong, showAnswer, lock, restore },
      hint: q.op === '+' ? { zh: '先加个位。满 10 就写个位数、向十位进 1。再加十位（别忘了进上来的 1），最后加百位。', en: 'Add the ones first. If 10 or more, write the ones digit and carry 1.' } : { zh: '先减个位。不够减就向十位借 1（十位减 1，个位加 10）。再减十位，最后减百位。', en: 'Subtract the ones first. If not enough, regroup 1 ten into 10 ones.' },
      answerText: String(ans),
      check: v => parseInt(v, 10) === ans,
      explainKind: q.op === '+' ? 'coladd' : 'colsub', n: { a: q.a, b: q.b },
    };
  };

  /* blocksop：看方块加减（表格题）  q = { id, type:'blocksop', a, b, op } —— 填 H/T/O 三格和结果 */
  window.QTypes.blocksop = q => {
    const ans = q.op === '+' ? q.a + q.b : q.a - q.b;
    const D = split(ans), A = split(q.a), B = split(q.b);
    const add = q.op === '+';
    function html() {
      const row = (n, v, crossN) => `<div class="blk-row"><div class="blk-num">${n}</div>${['h', 't', 'o'].map(k => `<div class="blk-cell"><div class="blocks" data-k="${k}">${Blocks.render({ [k]: v[k] }, { scale: 1 })}</div></div>`).join('')}</div>`;
      const body = add ? row(q.a, A) + row(q.b, B) : row(`${q.a} − ${q.b}`, A);
      return `<div class="blk-table">${body}
        <div class="blk-row head"><div></div><div class="h">Hundreds 百</div><div class="t">Tens 十</div><div class="o">Ones 个</div></div>
        <div class="blk-row sum"><div></div>${['h', 't', 'o'].map(k => `<div><input class="blank bo" data-k="${k}" maxlength="2" inputmode="numeric" autocomplete="off" style="width:2.4em"></div>`).join('')}</div></div>
        <div class="fill">${q.a} ${add ? '+' : '−'} ${q.b} = <input class="blank" data-k="ans" maxlength="4" inputmode="numeric" autocomplete="off" style="width:3.6em"></div>
        <div class="center mt"><button class="btn ok" id="submit">检查 ✔</button></div>`;
    }
    function cross(box) { if (add) return; ['h', 't', 'o'].forEach(k => { const svg = box.querySelector(`.blocks[data-k="${k}"] svg`); if (!svg) return; const gs = [...svg.querySelectorAll('.blk')]; gs.slice(gs.length - B[k]).forEach(g => g.classList.add('crossed')); }); }
    function bind(box, submit) {
      cross(box);
      const ins = [...box.querySelectorAll('input.blank')];
      ins.forEach((inp, i) => { inp.onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); submit(); } }; inp.oninput = () => { if (inp.dataset.k !== 'ans' && inp.value.length >= 1 && ins[i + 1] && (inp.value.length >= 2 || +inp.value !== 1)) ins[i + 1].focus(); }; });
      $('#submit', box).onclick = () => submit();
      ins[0].focus({ preventScroll: true });
    }
    const expect = { h: D.h, t: D.t, o: D.o, ans };
    function value(box) { const v = {}; for (const inp of box.querySelectorAll('input.blank')) { if (!inp.value.trim()) return null; v[inp.dataset.k] = inp.value.trim(); } return JSON.stringify(v); }
    const ok = (k, s) => parseInt(s, 10) === expect[k];
    function markWrong(box, val) { const v = JSON.parse(val); box.querySelectorAll('input.blank').forEach(inp => { const g = ok(inp.dataset.k, v[inp.dataset.k]); inp.classList.toggle('good', g); inp.classList.toggle('badf', !g); if (g) inp.disabled = true; }); const f = box.querySelector('input.blank.badf'); if (f) f.select(); }
    function showAnswer(box) { box.querySelectorAll('input.blank').forEach(inp => { inp.value = expect[inp.dataset.k]; inp.classList.remove('badf'); inp.classList.add('good'); }); lock(box); }
    function lock(box) { box.querySelectorAll('input').forEach(i => i.disabled = true); const s = box.querySelector('#submit'); if (s) s.disabled = true; }
    function restore(box, val) { cross(box); let v = {}; try { v = JSON.parse(val || '{}'); } catch (e) { /* */ } box.querySelectorAll('input.blank').forEach(inp => { inp.value = v[inp.dataset.k] !== undefined ? v[inp.dataset.k] : ''; inp.classList.add(ok(inp.dataset.k, v[inp.dataset.k]) ? 'good' : 'badf'); }); lock(box); }
    return {
      prompt: { zh: add ? '看方块，加一加' : '看方块，划掉的是减去的，算一算', en: add ? 'Add these numbers' : 'Subtract these numbers' },
      stage: '',
      custom: { html, bind, value, markWrong, showAnswer, lock, restore },
      hint: { zh: add ? '把每一列的方块加起来：百加百，十加十，个加个。' : '每一列数一数没划掉的还剩几个。', en: add ? 'Add each column.' : 'Count the blocks that are not crossed out.' },
      answerText: `${D.h}, ${D.t}, ${D.o}; ${ans}`,
      check: v => { try { const o = JSON.parse(v); return ['h', 't', 'o', 'ans'].every(k => ok(k, o[k])); } catch (e) { return false; } },
      answerDisplay: v => { try { const o = JSON.parse(v); return `${o.h}, ${o.t}, ${o.o}; ${o.ans}`; } catch (e) { return v; } },
      explainKind: add ? 'blocksadd' : 'blockssub', n: { a: q.a, b: q.b },
    };
  };

  window.ArithUI = { columnHTML, numRow };
})();
