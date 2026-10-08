/* Level 4 · Unit 11  小数四则：竖式加减乘、短除、估算、检查合理 讲解动画 */
(function () {
  const line = t => `<div class="expand-line">${t}</div>`;
  const wrap = (...parts) => `<div class="l1wrap">${parts.join('')}</div>`;
  const D = window.L4DEC, L3 = window.L3;
  const ZH = D.ZH, EN = D.EN;
  const dpOf = D.dpOf, toI = D.toI, fromI = D.fromI, trim0 = D.trim0;
  const kAt = (r, dp) => r < dp ? ['t', 'h', 'th'][dp - 1 - r] : ['O', 'T', 'H', 'Th'][r - dp];
  const kZH = k => ZH[k] || '千位', kEN = k => EN[k] || 'thousands';
  /* 竖式（小数点对齐）lines=[{s, cls?}] 字符串右对齐；hlCol 从右数第几位数字（不含点）高亮 */
  function dcol(o) {
    const W = Math.max(...o.lines.map(l => l.s.length)) + 1;
    const mark = (s, hl) => { if (hl === undefined) return s; let r = -1; return s.split('').map(ch => { if (ch === '.' || ch === ' ') return ch; r++; return r === hl ? `<span class="hl">${ch}</span>` : ch; }).reverse().join('').split('').reverse().join(''); };
    const fix = (s, hl) => { if (hl === undefined) return s; const chars = s.split(''); let r = -1; for (let i = chars.length - 1; i >= 0; i--) { if (chars[i] === '.' || chars[i] === ' ' || chars[i] === '+' || chars[i] === '−' || chars[i] === '×') continue; r++; if (r === hl) chars[i] = `<span class="hl">${chars[i]}</span>`; } return chars.join(''); };
    return `<pre class="mul2 dcol">${o.carry !== undefined ? `<span class="cr">${o.carry.padStart(W, ' ')}</span>` : ''}${o.lines.map(l => `${l.rule ? '<span class="ln"></span>' : ''}<span class="${l.cls || ''}">${fix(l.s.padStart(W, ' '), o.hl)}</span>`).join('\n')}</pre>`;
  }
  const buildCarry = (str, car) => { const arr = str.split('').map(() => ' '); let r = -1; for (let i = str.length - 1; i >= 0; i--) { if (str[i] === '.') continue; r++; if (car[r]) arr[i] = String(car[r]); } return arr.join(''); };
  const alignDp = (a, b) => { const dp = Math.max(dpOf(a), dpOf(b)); return [Number(a).toFixed(dp), Number(b).toFixed(dp), dp]; };
  const S = window.StepKinds;
  /* l4dcol：{a, b, op:'+'|'-'} 小数竖式加减 */
  S.l4dcol = ({ a, b, op }) => {
    const [A, B, dp] = alignDp(a, b), add = op === '+';
    const da = A.replace('.', '').split('').map(Number).reverse(), db = B.replace('.', '').split('').map(Number).reverse();
    const n = Math.max(da.length, db.length); while (da.length < n) da.push(0); while (db.length < n) db.push(0);
    const resI = add ? toI(A, dp) + toI(B, dp) : toI(A, dp) - toI(B, dp); const R = fromI(resI, dp);
    const rd = R.replace('.', '').split('').map(Number).reverse();
    const sym = add ? '+' : '−';
    const show = (filled, hl, carry) => { let rs = ''; for (let r = 0; r < Math.max(n, rd.length); r++) rs = (r < filled ? String(rd[r] !== undefined ? rd[r] : '') : ' ') + (r === dp ? '.' : '') + rs; rs = rs.replace(/^\s+/, ''); return `<div class="center">${dcol({ lines: [{ s: A }, { s: `${sym} ${B}` }, { s: rs, rule: true, cls: 'ans' }], hl, carry })}</div>`; };
    const steps = [{ zh: `${A} ${sym} ${B}：<b>小数点对齐</b>，个位对个位、十分位对十分位。${add ? '从最右边一位开始加' : '从最右边一位开始减'}，和整数一样。`, en: 'Line up the decimal points. Start from the right.', render: s => { s.innerHTML = show(0); } }];
    let carry = 0; const car = {};
    for (let r = 0; r < n; r++) { const k = kAt(r, dp); let x = da[r], y = db[r], s, txt;
      if (add) { s = x + y + carry; const d = s % 10, c = Math.floor(s / 10); txt = `${kZH(k)}：${x} + ${y}${carry ? ` + 进上来的 ${carry}` : ''} = ${s}${c ? `，写 ${d} 进 1` : `，写 ${d}`}`; carry = c; if (c) car[r + 1] = 1; }
      else { let bor = 0; let xx = x - carry; if (xx < y) { xx += 10; bor = 1; } s = xx - y; txt = `${kZH(k)}：${x}${carry ? ` − 借走的 1` : ''}${bor ? ` 不够减 ${y}，向前一位借 1 当 10：${xx} − ${y}` : ` − ${y}`} = ${s}`; carry = bor; }
      const filled = r + 1, carryLine = add ? buildCarry(A, Object.assign({}, car)) : undefined;
      steps.push({ zh: `${txt}${r === dp - 1 ? '。<b>写到十分位后记得点上小数点</b>' : ''}。`, en: `${kEN(k)}: ${s}.`, render: s2 => { s2.innerHTML = show(filled, r, carryLine); } });
    }
    steps.push({ zh: `所以 <b>${A} ${sym} ${B} = ${R}</b>。`, en: `${A} ${sym} ${B} = ${R}.`, render: s => { s.innerHTML = wrap(show(99), line(`${A} ${sym} ${B} = ${R}`)); } });
    return steps;
  };
  /* l4dmul：{a, b} 小数 × 一位整数 */
  S.l4dmul = ({ a, b }) => {
    const dp = dpOf(a), da = a.replace('.', '').split('').map(Number).reverse(), n = da.length;
    const prodI = toI(a, dp) * b, R = fromI(prodI, dp), rd = R.replace('.', '').split('').map(Number).reverse();
    const show = (filled, hl, carry) => { let rs = ''; for (let r = 0; r < rd.length; r++) rs = (r < filled ? String(rd[r]) : ' ') + (r === dp ? '.' : '') + rs; rs = rs.replace(/^\s+/, ''); return `<div class="center">${dcol({ lines: [{ s: a }, { s: `× ${b}` }, { s: rs, rule: true, cls: 'ans' }], hl, carry })}</div>`; };
    const steps = [{ zh: `${a} × ${b}：把 ${b} 写在最右边一位下面。<b>从最右边开始</b>，每一位都乘 ${b}，满 10 进位，和整数乘法一样；最后把小数点<b>对齐点上</b>。`, en: 'Multiply each digit from the right. Put the decimal point in line.', render: s => { s.innerHTML = show(0); } }];
    let carry = 0; const car = {};
    for (let r = 0; r < n; r++) { const k = kAt(r, dp), x = da[r], p = x * b, s = p + carry, last = r === n - 1, d = last ? s : s % 10, c = last ? 0 : Math.floor(s / 10);
      if (c) car[r + 1] = c; const carryLine = buildCarry(a, Object.assign({}, car));
      steps.push({ zh: `${kZH(k)}：${x} × ${b} = ${p}${carry ? ` + 进上来的 ${carry} = ${s}` : ''}${c ? `，写 ${s % 10} 进 ${c}` : `，写 ${d}`}${r === dp - 1 ? '。<b>点上小数点</b>' : ''}。`, en: `${kEN(k)}: ${x} × ${b} = ${p}${carry ? ` + ${carry}` : ''}.`, render: s2 => { s2.innerHTML = show(last ? 99 : r + 1, r, carryLine); } });
      carry = c; }
    steps.push({ zh: `所以 <b>${a} × ${b} = ${R}</b>${R.endsWith('0') && dp ? `（末尾的 0 可以保留写成 ${R}，也可以写 ${trim0(R)}）` : ''}。`, en: `${a} × ${b} = ${R}.`, render: s => { s.innerHTML = wrap(show(99), line(`${a} × ${b} = ${R}`)); } });
    return steps;
  };
  /* 小数短除 HTML：aStr 含小数点，b 整数，st 为 L3.ldivSteps 的某一步 */
  function dvHTML(aStr, b, st) {
    const ip = aStr.split('.')[0].length, digits = aStr.replace('.', ''), n = digits.length, pad = k => ' '.repeat(Math.max(0, k));
    const colOf = i => 3 + i + (i >= ip && aStr.includes('.') ? 1 : 0);
    let qline = ''; if (st) { const first = n - st.q.length - (st.rows.length ? 0 : 0); const start = n - String(st.qFull || '').length; const arr = Array(colOf(n - 1) + 1).fill(' '); const off = st.qStart; st.q.split('').forEach((ch, j) => { arr[colOf(off + j) - 1] = ch; }); if (aStr.includes('.') && st.q.length > 0 && off + st.q.length > ip) arr[colOf(ip) - 2] = '.'; qline = arr.join('').replace(/\s+$/, ''); }
    let out = `<span class="lq">${qline.padEnd(colOf(n - 1), ' ')}</span>\n<span class="ldv">${b}</span><span class="lbr">)</span>${aStr}`;
    if (st) st.rows.forEach(r => { const end = colOf(r.indent); const txt = pad(end - r.text.length) + r.text; out += `\n${r.kind === 'sub' ? '<span class="lsub">' : ''}${r.kind === 'rem' && r.last ? '<span class="lrem">' : ''}${txt}${r.kind === 'sub' ? '</span>' : ''}${r.kind === 'rem' && r.last ? '</span>' : ''}`; });
    return `<pre class="ldiv">${out}</pre>`;
  }
  /* l4ddiv：{a:'7.8', b:3, orig?:'7.8'} 小数 ÷ 一位整数（a 已补 0 到能整除） */
  S.l4ddiv = ({ a, b, orig }) => {
    const ip = a.split('.')[0].length, dp = dpOf(a), intA = +a.replace('.', ''), { steps: ls, q } = L3.ldivSteps(intA, b);
    const n = a.replace('.', '').length; const skipped = ls.filter(x => x.skip).length; ls.forEach(st => { st.qStart = skipped; });
    const Q = fromI(q, dp);
    const out = [];
    if (orig && orig !== a) out.push({ zh: `${orig} ÷ ${b}：除不尽的时候可以在小数末尾<b>添 0</b>（${orig} = ${a}，大小不变），再继续除。`, en: `${orig} = ${a}. Add zeros to keep dividing.`, render: s => { s.innerHTML = wrap(`<div class="center">${dvHTML(a, b)}</div>`, line(`${orig} = ${a}`)); } });
    out.push({ zh: `${a} ÷ ${b}：写成短除式。<b>从最高位开始</b>一位一位除，和整数一样；商的小数点要和被除数的小数点<b>对齐</b>。`, en: 'Divide from the highest place. Line up the decimal point in the answer.', render: s => { s.innerHTML = wrap(`<div class="center">${dvHTML(a, b)}</div>`); } });
    ls.forEach((st, i) => { const idx = n - 1 - st.place, k = kAt(st.place, dp); const name = kZH(k), nameEn = kEN(k);
      if (st.skip) { out.push({ zh: `${name}的 ${st.d} 比 ${b} 小，不够除，和下一位合起来看。`, en: `${st.d} is less than ${b}.`, render: s => { s.innerHTML = wrap(`<div class="center">${dvHTML(a, b)}</div>`); } }); return; }
      const isLast = st.place === 0;
      const prevK = st.place + 1 <= n - 1 ? kAt(st.place + 1, dp) : null;
      const zh = `${i === 0 || ls[i - 1].skip ? '先' : '再'}除<b>${name}</b>：${st.prev ? `上一位余 ${st.prev} 个${kZH(prevK).replace('位', '')}${prevK === 'O' && k === 't' ? ' = 10 个十分之一' : ''}，和这一位的 ${st.d} 合起来是 ${st.cur}，` : ''}${st.cur} ÷ ${b} = <b>${st.qd}</b>${st.rem ? ` 余 ${st.rem}` : ''}，商 ${st.qd} 写在${name}上面${k === 't' ? '（<b>先点上小数点</b>）' : ''}，${st.qd} × ${b} = ${st.sub}，${st.cur} − ${st.sub} = ${st.rem}${isLast ? (st.rem ? `，还剩 ${st.rem}` : '，除尽了') : ''}。`;
      out.push({ zh, en: `${nameEn}: ${st.cur} ÷ ${b} = ${st.qd}${st.rem ? ` R ${st.rem}` : ''}.`, render: s => { s.innerHTML = wrap(`<div class="center">${dvHTML(a, b, st)}</div>`, line(`${st.cur} ÷ ${b} = ${st.qd}${st.rem ? ` R ${st.rem}` : ''}`)); } }); });
    out.push({ zh: `所以 <b>${orig || a} ÷ ${b} = ${Q}</b>。检查：${Q} × ${b} = ${a} ✔`, en: `${orig || a} ÷ ${b} = ${Q}.`, render: s => { s.innerHTML = wrap(`<div class="center">${dvHTML(a, b, ls[ls.length - 1])}</div>`, line(`${orig || a} ÷ ${b} = ${Q}`)); } });
    return out;
  };
  /* l4decscale：{x, y, op} 2×3 → 0.2×3 → 0.02×3 或 ÷ */
  S.l4decscale = ({ x, y, op }) => { const mul = op === '×'; const base = mul ? x * y : x / y; const f = (v, dp) => (v).toFixed(dp); const r1 = f(base / 10, dpOf(f(base, 0)) + 1), r2 = f(base / 100, 2); return [
    { zh: `先记住整数的：<b>${x} ${op} ${y} = ${base}</b>。`, en: `${x} ${op} ${y} = ${base}.`, render: s => { s.innerHTML = wrap(line(`${x} ${op} ${y} = ${base}`)); } },
    { zh: `${f(x / 10, 1)} 是 ${x} 个<b>十分之一</b>（${x} tenths）。${mul ? `${x} tenths × ${y} = ${base} tenths` : `${x} tenths ÷ ${y} = ${base} tenths`} = <b>${trim0(f(base / 10, 1))}</b>。`, en: `${x} tenths ${op} ${y} = ${base} tenths = ${trim0(f(base / 10, 1))}.`, render: s => { s.innerHTML = wrap(line(`${x} ${op} ${y} = ${base}`), line(`${f(x / 10, 1)} ${op} ${y} = ${trim0(f(base / 10, 1))}`)); } },
    { zh: `${f(x / 100, 2)} 是 ${x} 个<b>百分之一</b>（${x} hundredths）。${x} hundredths ${op} ${y} = ${base} hundredths = <b>${f(base / 100, 2)}</b>。规律：被${mul ? '乘' : '除'}数小数点往左移几位，答案也往左移几位。`, en: `${x} hundredths ${op} ${y} = ${base} hundredths = ${f(base / 100, 2)}.`, render: s => { s.innerHTML = wrap(line(`${x} ${op} ${y} = ${base}`), line(`${f(x / 10, 1)} ${op} ${y} = ${trim0(f(base / 10, 1))}`), line(`${f(x / 100, 2)} ${op} ${y} = ${f(base / 100, 2)}`)); } },
  ]; };
  /* l4decest：{a, b, op} 估算（各四舍五入到整数） */
  const estOf = (a, b, op) => { const A = +D.roundStr(a, 0), B = typeof b === 'number' ? b : +D.roundStr(b, 0); return { A, B, v: op === '+' ? A + B : op === '-' ? A - B : op === '×' ? A * B : A / B }; };
  S.l4decest = ({ a, b, op }) => { const { A, B, v } = estOf(a, b, op); const sym = op === '-' ? '−' : op; return [
    { zh: `估算：先把每个小数<b>四舍五入到整数</b>（看十分位）：${a} ≈ <b>${A}</b>${typeof b === 'number' ? '' : `，${b} ≈ <b>${B}</b>`}。`, en: `${a} ≈ ${A}${typeof b === 'number' ? '' : `, ${b} ≈ ${B}`}.`, render: s => { s.innerHTML = wrap(line(`${a} ≈ ${A}`), typeof b === 'number' ? '' : line(`${b} ≈ ${B}`)); } },
    { zh: `再算整数：${A} ${sym} ${B} = <b>${v}</b>。所以 ${a} ${sym} ${b} ≈ ${v}。`, en: `${A} ${sym} ${B} = ${v}.`, render: s => { s.innerHTML = wrap(line(`${A} ${sym} ${B} = ${v}`), line(`${a} ${sym} ${b} ≈ ${v}`)); } },
  ]; };
  /* l4decode：{items:[[letter,a,b,op]], codes:[...]} */
  S.l4decode = ({ items, codes }) => { const map = {}; items.forEach(([L, a, b, op]) => { map[estOf(a, b, op).v] = L; }); const word = codes.map(c => map[c] || '?').join(''); return [
    { zh: `每个字母对应一个估算结果：${items.map(([L, a, b, op]) => `${L} = ${estOf(a, b, op).v}`).join('，')}。`, en: 'Each letter has a value.', render: s => { s.innerHTML = wrap(`<div class="center"><table class="pv4"><tr>${items.map(i => `<th>${i[0]}</th>`).join('')}</tr><tr>${items.map(([L, a, b, op]) => `<td>${estOf(a, b, op).v}</td>`).join('')}</tr></table></div>`); } },
    { zh: `把方格里的数换成字母：${codes.map(c => `${c} → ${map[c]}`).join('，')}，拼出 <b>${word}</b>。`, en: word, render: s => { s.innerHTML = wrap(`<div class="center"><table class="pv4"><tr>${codes.map(c => `<td>${map[c]}</td>`).join('')}</tr><tr>${codes.map(c => `<td style="font-size:16px">${c}</td>`).join('')}</tr></table></div>`, line(word)); } },
  ]; };
  /* l4dreason：{a, b, op} */
  const exactOf = (a, b, op) => { if (op === '+' || op === '-') { const [A, B, dp] = alignDp(a, String(b)); return fromI(op === '+' ? toI(A, dp) + toI(B, dp) : toI(A, dp) - toI(B, dp), dp); } const dp = dpOf(a); if (op === '×') return fromI(toI(a, dp) * b, dp); return fromI(toI(a, dp) / b, dp); };
  S.l4dreason = ({ a, b, op }) => { const exact = exactOf(a, b, op), { v } = estOf(a, b, op); const sym = op === '-' ? '−' : op;
    const ex = op === '+' || op === '-' ? S.l4dcol({ a, b: String(b), op }) : op === '×' ? S.l4dmul({ a, b }) : S.l4ddiv({ a, b });
    return [{ zh: `(a) 先<b>算出准确值</b>：${a} ${sym} ${b}。`, en: `(a) Calculate ${a} ${sym} ${b}.`, render: s => { s.innerHTML = wrap(line(`${a} ${sym} ${b} = ?`)); } }].concat(ex, [{ zh: `(b) 再<b>估算</b>检查。`, en: '(b) Estimate.', render: s => { s.innerHTML = wrap(line(`${a} ${sym} ${b} = ${exact}`), line('估算 estimate：?')); } }], S.l4decest({ a, b, op }), [{ zh: `(c) 准确值 <b>${exact}</b> 和估算值 <b>${v}</b> 很接近，所以答案是<b>合理的</b>：Yes。`, en: `${exact} is close to ${v}: reasonable, Yes.`, render: s => { s.innerHTML = wrap(line(`${exact} ≈ ${v} ✓`), line('Reasonable: Yes')); } }]); };
  window.L4DOPS = { dcol, dvHTML, estOf, exactOf, alignDp };
})();
