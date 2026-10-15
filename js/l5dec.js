/* Level 5 · Unit 9  小数：×÷ 10、100、1000 及倍数，单位换算 讲解动画 */
(function () {
  const line = t => `<div class="expand-line">${t}</div>`;
  const wrap = (...parts) => `<div class="l1wrap">${parts.join('')}</div>`;
  const S = window.StepKinds;
  const zeros = p => String(p).length - 1;
  /* shift('3.56', 2) → '356'；shift('45', -2) → '0.45'：按字符串移动小数点，不用浮点 */
  function shift(v, n) {
    let s = String(v).replace(/\s/g, ''); let [ip, fp = ''] = s.split('.');
    if (n > 0) { fp = fp.padEnd(n, '0'); ip = ip + fp.slice(0, n); fp = fp.slice(n); }
    else if (n < 0) { const m = -n; ip = ip.padStart(m + 1, '0'); fp = ip.slice(-m) + fp; ip = ip.slice(0, -m); }
    ip = ip.replace(/^0+(?=\d)/, ''); fp = fp.replace(/0+$/, '');
    return fp ? `${ip}.${fp}` : ip;
  }
  /* fmt：整数部分 5 位以上按千位加空格（书上写法 48 040.9） */
  const fmt = v => { let [ip, fp] = String(v).replace(/\s/g, '').split('.'); if (ip.length > 4) ip = ip.replace(/\B(?=(\d{3})+(?!\d))/g, ' '); return fp !== undefined ? `${ip}.${fp}` : ip; };
  const clean = x => String(parseFloat(Number(x).toPrecision(12)));
  const mulInt = (a, k) => clean(Number(a) * k), divInt = (a, k) => clean(Number(a) / k);
  /* 小数点移动示意：原数的数字一排，被跳过的数字画波浪线，新的小数点用橙色 */
  function pointRow(a, n) {
    let [ip, fp = ''] = String(a).replace(/\s/g, '').split('.');
    let digits, old;
    if (n > 0) { digits = ip + fp.padEnd(n, '0'); old = ip.length; }
    else { const m = -n; const pip = ip.padStart(m + 1, '0'); digits = pip + fp; old = pip.length; }
    const nw = old + n, lo = Math.min(old, nw), hi = Math.max(old, nw);
    let h = '';
    for (let i = 0; i <= digits.length; i++) {
      if (i === old && i === nw) h += '<span class="pt new">.</span>';
      else if (i === nw) h += '<span class="pt new">.</span>';
      else if (i === old) h += '<span class="pt old">.</span>';
      if (i < digits.length) h += `<span class="dg${i >= lo && i < hi ? ' hop' : ''}">${digits[i]}</span>`;
    }
    return `<div class="dsh">${h}</div><div class="dsh-cap">小数点向${n > 0 ? '右' : '左'}移 ${Math.abs(n)} 位 · point moves ${Math.abs(n)} place${Math.abs(n) > 1 ? 's' : ''} ${n > 0 ? 'right' : 'left'}</div>`;
  }
  const moveZh = (p, right) => `${right ? '乘' : '除以'} ${fmt(p)}，小数点向<b>${right ? '右' : '左'}</b>移 <b>${zeros(p)}</b> 位${right ? '（位数不够就添 0）' : '（位数不够在前面添 0）'}`;
  /* l5dmul：{a, p} */
  S.l5dmul = ({ a, p }) => { const r = shift(a, zeros(p)); return [
    { zh: `${moveZh(p, true)}。`, en: `× ${p}: move the decimal point ${zeros(p)} place(s) to the right.`, render: s => { s.innerHTML = wrap(line(`${fmt(a)} × ${fmt(p)}`), pointRow(a, zeros(p))); } },
    { zh: `所以 ${fmt(a)} × ${fmt(p)} = <b>${fmt(r)}</b>。`, en: `${fmt(a)} × ${p} = ${fmt(r)}.`, render: s => { s.innerHTML = wrap(line(`${fmt(a)} × ${fmt(p)} = ${fmt(r)}`)); } },
  ]; };
  /* l5ddiv：{a, p} */
  S.l5ddiv = ({ a, p }) => { const r = shift(a, -zeros(p)); return [
    { zh: `${moveZh(p, false)}。`, en: `÷ ${p}: move the decimal point ${zeros(p)} place(s) to the left.`, render: s => { s.innerHTML = wrap(line(`${fmt(a)} ÷ ${fmt(p)}`), pointRow(a, -zeros(p))); } },
    { zh: `所以 ${fmt(a)} ÷ ${fmt(p)} = <b>${fmt(r)}</b>。`, en: `${fmt(a)} ÷ ${p} = ${fmt(r)}.`, render: s => { s.innerHTML = wrap(line(`${fmt(a)} ÷ ${fmt(p)} = ${fmt(r)}`)); } },
  ]; };
  const findN = (a, r, dir) => [1, 2, 3].find(n => shift(a, dir * n) === shift(r, 0));
  /* l5dmissmul：{a?, p?, r} */
  S.l5dmissmul = ({ a, p, r }) => { if (a !== undefined) { const n = findN(a, r, 1), pp = 10 ** n; return [
    { zh: `${fmt(a)} × ? = ${fmt(r)}。比一比：小数点从 ${fmt(a)} 到 ${fmt(r)} 向右移了 <b>${n}</b> 位。`, en: `The point moved ${n} place(s) right.`, render: s => { s.innerHTML = wrap(line(`${fmt(a)} × ? = ${fmt(r)}`), pointRow(a, n)); } },
    { zh: `右移 ${n} 位就是乘 <b>${fmt(pp)}</b>。检查：${fmt(a)} × ${fmt(pp)} = ${fmt(r)} ✓`, en: `${fmt(a)} × ${pp} = ${fmt(r)}.`, render: s => { s.innerHTML = wrap(line(`${fmt(a)} × ${fmt(pp)} = ${fmt(r)}`)); } },
  ]; } const n = zeros(p), q = shift(r, -n); return [
    { zh: `? × ${fmt(p)} = ${fmt(r)}。反过来想：? = ${fmt(r)} ÷ ${fmt(p)}，把 ${fmt(r)} 的小数点向<b>左</b>移 <b>${n}</b> 位。`, en: `? = ${fmt(r)} ÷ ${p}: move the point ${n} place(s) left.`, render: s => { s.innerHTML = wrap(line(`? × ${fmt(p)} = ${fmt(r)}`), pointRow(r, -n)); } },
    { zh: `所以 ? = <b>${fmt(q)}</b>。检查：${fmt(q)} × ${fmt(p)} = ${fmt(r)} ✓`, en: `${fmt(q)} × ${p} = ${fmt(r)}.`, render: s => { s.innerHTML = wrap(line(`${fmt(q)} × ${fmt(p)} = ${fmt(r)}`)); } },
  ]; };
  /* l5dmissdiv：{a?, p?, q} */
  S.l5dmissdiv = ({ a, p, q }) => { if (a !== undefined) { const n = findN(a, q, -1), pp = 10 ** n; return [
    { zh: `${fmt(a)} ÷ ? = ${fmt(q)}。比一比：小数点从 ${fmt(a)} 到 ${fmt(q)} 向左移了 <b>${n}</b> 位。`, en: `The point moved ${n} place(s) left.`, render: s => { s.innerHTML = wrap(line(`${fmt(a)} ÷ ? = ${fmt(q)}`), pointRow(a, -n)); } },
    { zh: `左移 ${n} 位就是除以 <b>${fmt(pp)}</b>。检查：${fmt(a)} ÷ ${fmt(pp)} = ${fmt(q)} ✓`, en: `${fmt(a)} ÷ ${pp} = ${fmt(q)}.`, render: s => { s.innerHTML = wrap(line(`${fmt(a)} ÷ ${fmt(pp)} = ${fmt(q)}`)); } },
  ]; } const n = zeros(p), r = shift(q, n); return [
    { zh: `? ÷ ${fmt(p)} = ${fmt(q)}。反过来想：? = ${fmt(q)} × ${fmt(p)}，把 ${fmt(q)} 的小数点向<b>右</b>移 <b>${n}</b> 位。`, en: `? = ${fmt(q)} × ${p}: move the point ${n} place(s) right.`, render: s => { s.innerHTML = wrap(line(`? ÷ ${fmt(p)} = ${fmt(q)}`), pointRow(q, n)); } },
    { zh: `所以 ? = <b>${fmt(r)}</b>。检查：${fmt(r)} ÷ ${fmt(p)} = ${fmt(q)} ✓`, en: `${fmt(r)} ÷ ${p} = ${fmt(q)}.`, render: s => { s.innerHTML = wrap(line(`${fmt(r)} ÷ ${fmt(p)} = ${fmt(q)}`)); } },
  ]; };
  const pOf = b => 10 ** (String(b).length - String(b).replace(/0+$/, '').length);
  /* l5dmulsplit：{a, b} b = k × p，先 × k 再 × p */
  S.l5dmulsplit = ({ a, b }) => { const p = pOf(b), k = b / p, m = mulInt(a, k), r = shift(m, zeros(p)); return [
    { zh: `${fmt(b)} 不是整十整百，先<b>拆开</b>：${fmt(b)} = ${k} × ${fmt(p)}。所以 ${fmt(a)} × ${fmt(b)} = ${fmt(a)} × <b>${k}</b> × ${fmt(p)}。`, en: `${b} = ${k} × ${p}.`, render: s => { s.innerHTML = wrap(line(`${fmt(a)} × ${fmt(b)} = ${fmt(a)} × ${k} × ${fmt(p)}`)); } },
    { zh: `先算 ${fmt(a)} × ${k} = <b>${fmt(m)}</b>（照整数乘，小数位数不变）。`, en: `${fmt(a)} × ${k} = ${fmt(m)}.`, render: s => { s.innerHTML = wrap(line(`= ${fmt(m)} × ${fmt(p)}`)); } },
    { zh: `再乘 ${fmt(p)}：小数点向右移 ${zeros(p)} 位，得 <b>${fmt(r)}</b>。`, en: `× ${p}: ${fmt(r)}.`, render: s => { s.innerHTML = wrap(pointRow(m, zeros(p)), line(`${fmt(a)} × ${fmt(b)} = ${fmt(r)}`)); } },
  ]; };
  /* l5ddivsplit：{a, b} b = k × p，先 ÷ k 再 ÷ p（书上的顺序） */
  S.l5ddivsplit = ({ a, b }) => { const p = pOf(b), k = b / p, m = divInt(a, k), r = shift(m, -zeros(p)); return [
    { zh: `${fmt(b)} = ${k} × ${fmt(p)}，除以 ${fmt(b)} 可以<b>分两步</b>：先 ÷ ${k}，再 ÷ ${fmt(p)}。`, en: `÷ ${b} = ÷ ${k} then ÷ ${p}.`, render: s => { s.innerHTML = wrap(line(`${fmt(a)} ÷ ${fmt(b)} = ${fmt(a)} ÷ ${k} ÷ ${fmt(p)}`)); } },
    { zh: `先 ÷ ${k}：${fmt(a)} ÷ ${k} = <b>${fmt(m)}</b>。`, en: `${fmt(a)} ÷ ${k} = ${fmt(m)}.`, render: s => { s.innerHTML = wrap(line(`= ${fmt(m)} ÷ ${fmt(p)}`)); } },
    { zh: `再 ÷ ${fmt(p)}：小数点向左移 ${zeros(p)} 位，得 <b>${fmt(r)}</b>。`, en: `÷ ${p}: ${fmt(r)}.`, render: s => { s.innerHTML = wrap(pointRow(m, -zeros(p)), line(`${fmt(a)} ÷ ${fmt(b)} = ${fmt(r)}`)); } },
  ]; };
  /* l5dchain：{v, op:'×'|'÷', mode:'num'|'p'}  1215 = ? × 10 = ? × 100 = ? × 1000 / 4849 = 484.9 × ? = … */
  S.l5dchain = ({ v, op, mode }) => { const ps = [10, 100, 1000]; const dir = op === '×' ? -1 : 1;
    const nums = ps.map(p => shift(v, dir * zeros(p)));
    const parts = ps.map((p, i) => mode === 'num' ? `${fmt(nums[i])} ${op} ${fmt(p)}` : `${fmt(nums[i])} ${op} ${fmt(p)}`);
    return [
      { zh: `等号两边要一样大。${op === '×' ? `"? × 10 = ${fmt(v)}" 就是 ? = ${fmt(v)} ÷ 10：小数点左移 1 位` : `"? ÷ 10 = ${fmt(v)}" 就是 ? = ${fmt(v)} × 10：小数点右移 1 位`}${mode === 'p' ? `。这题给了数，要找乘（除）的是 10、100 还是 1000：看小数点移了几位` : ''}。`, en: mode === 'num' ? `Undo the ${op}: move the point the other way.` : 'Count how many places the point moved.', render: s => { s.innerHTML = wrap(line(`${fmt(v)} = ${parts[0]}`)); } },
      ...ps.map((p, i) => ({ zh: mode === 'num' ? `${fmt(v)} = <b>${fmt(nums[i])}</b> ${op} ${fmt(p)}：小数点${op === '×' ? '左' : '右'}移 ${zeros(p)} 位。` : `${fmt(nums[i])} 到 ${fmt(v)} 小数点${op === '×' ? '右' : '左'}移了 ${zeros(p)} 位，所以 ${op} <b>${fmt(p)}</b>。`, en: `${fmt(v)} = ${parts[i]}.`, render: s => { s.innerHTML = wrap(line(`${fmt(v)} = ${parts.slice(0, i + 1).join(' = ')}`), pointRow(mode === 'num' ? v : nums[i], mode === 'num' ? dir * zeros(p) : -dir * zeros(p))); } })),
    ]; };
  /* ---- 单位换算 ---- */
  const UN = { m: '米', cm: '厘米', km: '千米', kg: '千克', g: '克', l: '升', ml: '毫升' };
  const K = { 'm>cm': 100, 'km>m': 1000, 'kg>g': 1000, 'l>ml': 1000 };
  const pair = (from, to) => K[`${from}>${to}`] ? { k: K[`${from}>${to}`], big: from, small: to, mul: true } : { k: K[`${to}>${from}`], big: to, small: from, mul: false };
  /* l5unit：{v, from, to} */
  S.l5unit = ({ v, from, to }) => { const { k, big, small, mul } = pair(from, to); const r = shift(v, (mul ? 1 : -1) * zeros(k)); return [
    { zh: `记住：<b>1 ${big} = ${fmt(k)} ${small}</b>（1 ${UN[big]} = ${fmt(k)} ${UN[small]}）。`, en: `1 ${big} = ${k} ${small}.`, render: s => { s.innerHTML = wrap(line(`1 ${big} = ${fmt(k)} ${small}`)); } },
    mul ? { zh: `大单位换小单位，<b>乘</b> ${fmt(k)}：${fmt(v)} × ${fmt(k)}，小数点向右移 ${zeros(k)} 位 = <b>${fmt(r)}</b>。`, en: `${fmt(v)} × ${k} = ${fmt(r)}.`, render: s => { s.innerHTML = wrap(line(`${fmt(v)} ${from} = ${fmt(v)} × ${fmt(k)} ${to}`), pointRow(v, zeros(k))); } }
      : { zh: `小单位换大单位，<b>除以</b> ${fmt(k)}：${fmt(v)} ÷ ${fmt(k)}，小数点向左移 ${zeros(k)} 位 = <b>${fmt(r)}</b>。`, en: `${fmt(v)} ÷ ${k} = ${fmt(r)}.`, render: s => { s.innerHTML = wrap(line(`${fmt(v)} ${from} = ${fmt(v)} ÷ ${fmt(k)} ${to}`), pointRow(v, -zeros(k))); } },
    { zh: `所以 ${fmt(v)} ${from} = <b>${fmt(r)} ${to}</b>。`, en: `${fmt(v)} ${from} = ${fmt(r)} ${to}.`, render: s => { s.innerHTML = wrap(line(`${fmt(v)} ${from} = ${fmt(r)} ${to}`)); } },
  ]; };
  /* l5unitc：{v, big, small} 70.095 kg → 70 kg 95 g */
  S.l5unitc = ({ v, big, small }) => { const k = K[`${big}>${small}`]; const [ip, fp = ''] = String(v).split('.'); const dec = fp ? `0.${fp}` : '0'; const sm = shift(dec, zeros(k)); return [
    { zh: `把 ${fmt(v)} ${big} 拆成<b>整数部分</b>和<b>小数部分</b>：${fmt(ip)} ${big} + ${dec} ${big}。`, en: `${fmt(v)} = ${fmt(ip)} + ${dec}.`, render: s => { s.innerHTML = wrap(line(`${fmt(v)} ${big} = ${fmt(ip)} ${big} + ${dec} ${big}`)); } },
    { zh: `小数部分换成 ${small}：1 ${big} = ${fmt(k)} ${small}，${dec} × ${fmt(k)} = <b>${fmt(sm)}</b> ${small}。`, en: `${dec} × ${k} = ${fmt(sm)} ${small}.`, render: s => { s.innerHTML = wrap(line(`${dec} × ${fmt(k)} = ${fmt(sm)} ${small}`), pointRow(dec, zeros(k))); } },
    { zh: `所以 ${fmt(v)} ${big} = <b>${fmt(ip)} ${big} ${fmt(sm)} ${small}</b>。`, en: `${fmt(v)} ${big} = ${fmt(ip)} ${big} ${fmt(sm)} ${small}.`, render: s => { s.innerHTML = wrap(line(`${fmt(v)} ${big} = ${fmt(ip)} ${big} ${fmt(sm)} ${small}`)); } },
  ]; };
  /* l5unitd：{w, s, big, small} 52 m 40 cm → 52.4 m */
  S.l5unitd = ({ w, s, big, small }) => { const k = K[`${big}>${small}`]; const d = shift(s, -zeros(k)); const r = clean(Number(w) + Number(d)); return [
    { zh: `先把 ${fmt(s)} ${small} 换成 ${big}：1 ${big} = ${fmt(k)} ${small}，${fmt(s)} ÷ ${fmt(k)} = <b>${d}</b> ${big}。`, en: `${fmt(s)} ÷ ${k} = ${d} ${big}.`, render: el => { el.innerHTML = wrap(line(`${fmt(s)} ${small} = ${fmt(s)} ÷ ${fmt(k)} = ${d} ${big}`), pointRow(s, -zeros(k))); } },
    { zh: `再加上整数部分：${fmt(w)} + ${d} = <b>${fmt(r)}</b> ${big}。`, en: `${fmt(w)} + ${d} = ${fmt(r)} ${big}.`, render: el => { el.innerHTML = wrap(line(`${fmt(w)} ${big} ${fmt(s)} ${small} = ${fmt(w)} + ${d} = ${fmt(r)} ${big}`)); } },
  ]; };
  window.L5DEC = { shift, fmt, zeros, pOf, mulInt, divInt, clean, pointRow };
})();
