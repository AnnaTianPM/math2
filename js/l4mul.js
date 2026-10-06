/* Level 4 · Unit 3  整数乘除：竖式乘法（1 位、2 位乘数）、乘整十、估算、检查合理 讲解动画 */
(function () {
  const line = t => `<div class="expand-line">${t}</div>`;
  const wrap = (...parts) => `<div class="l1wrap">${parts.join('')}</div>`;
  const A = window.ArithUI, L3 = window.L3;
  const fmt = n => window.L4 ? window.L4.fmt(n) : String(n);
  const K = ['o', 't', 'h', 'th', 'tt'], NAME = { o: ['个', 'ones'], t: ['十', 'tens'], h: ['百', 'hundreds'], th: ['千', 'thousands'], tt: ['万', 'ten thousands'] };
  const CSS = { tt: 'var(--tenth)', th: 'var(--thou)', h: 'var(--hund)', t: 'var(--tens)', o: 'var(--ones)' };
  const col = (k, s) => `<b style="color:${CSS[k]}">${s}</b>`;
  const dig = n => { const d = {}; K.forEach((k, i) => { d[k] = Math.floor(n / 10 ** i) % 10; }); return d; };
  const S = window.StepKinds;

  /* 乘一位数的逐位步骤（给 l4mul1 和 l4mul2 共用）：返回 [{k, x, p, carryIn, s, d, c, last}] */
  function mulDigits(a, b) {
    const va = dig(a), used = K.slice(0, String(a).length), out = []; let carry = 0;
    used.forEach((k, i) => { const x = va[k], p = x * b, s = p + carry, last = i === used.length - 1, d = last ? s : s % 10, c = last ? 0 : Math.floor(s / 10); out.push({ k, x, p, carryIn: carry, s, d, c, last }); carry = c; });
    return out;
  }
  /* l4mul1：竖式乘 1 位数 {a, b} a 最多 4 位 */
  S.l4mul1 = ({ a, b }) => {
    const prod = a * b, w = Math.max(3, String(prod).length), res = Array(w).fill(''), carries = {};
    const colH = cfg => `<div class="center">${A.columnHTML(Object.assign({ a, b, op: '×', width: w }, cfg))}</div>`;
    const steps = [{ zh: `${a} × ${b}：把 ${b} 写在个位下面。<b>从个位开始</b>，每一位都乘 ${b}，满 10 就向前一位进位。`, en: `Multiply each digit by ${b}, starting from the ones.`, render: s => { s.innerHTML = colH({}); } }];
    mulDigits(a, b).forEach((st, i) => {
      if (st.last) String(st.s).split('').reverse().forEach((ch, j) => { res[w - 1 - i - j] = +ch; }); else res[w - 1 - i] = st.d;
      const snap = res.slice(), nc = Object.assign({}, carries); if (st.c) nc[K[i + 1]] = st.c;
      steps.push({ zh: `${i === 0 ? '先' : st.last ? '最后' : '再'}算${NAME[st.k][0]}位：${col(st.k, st.x)} ${NAME[st.k][1]} × ${b} = ${st.p} ${NAME[st.k][1]}${st.carryIn ? `，加上进来的 ${st.carryIn}：${st.p} + ${st.carryIn} = ${st.s}` : ''}${st.c ? `。满 10 <b>进位</b>：写 ${st.d}，向${NAME[K[i + 1]][0]}位进 ${st.c}` : `，写 ${st.d}`}。`, en: `${NAME[st.k][1]}: ${st.x} × ${b} = ${st.p}${st.carryIn ? ` + ${st.carryIn} = ${st.s}` : ''}.${st.c ? ` Regroup: write ${st.d}, carry ${st.c}.` : ''}`, render: s => { s.innerHTML = colH({ result: snap, carries: nc, hl: st.k }); } });
      Object.assign(carries, nc);
    });
    steps.push({ zh: `所以 <b>${a} × ${b} = ${fmt(prod)}</b>。`, en: `${a} × ${b} = ${fmt(prod)}.`, render: s => { s.innerHTML = wrap(colH({ result: res, carries }), line(`${a} × ${b} = ${fmt(prod)}`)); } });
    return steps;
  };

  /* 两位乘数竖式（等宽排版）cfg = {a, b, p1, p2, sum, hl:'a'|'p1'|'p2'|'sum', carries:string} */
  function mul2HTML(cfg) {
    const { a, b } = cfg, W = Math.max(String((a * b)).length, String(a).length, String(b).length + 2) + 1;
    const R = (s, cls) => `<span class="${cls || ''}">${String(s).padStart(W, ' ')}</span>`;
    let out = `<span class="cr">${cfg.carries ? String(cfg.carries).padStart(W, ' ') : ''}</span>`;
    out += R(a, cfg.hl === 'a' ? 'hl' : '') + '\n' + R('× ' + b, '') + '\n<span class="ln"></span>';
    if (cfg.p1 !== undefined) out += R(cfg.p1, cfg.hl === 'p1' ? 'hl' : '') + '\n';
    if (cfg.p2 !== undefined) out += R(cfg.p2, cfg.hl === 'p2' ? 'hl' : '') + '\n<span class="ln"></span>';
    if (cfg.sum !== undefined) out += R(cfg.sum, 'ans ' + (cfg.hl === 'sum' ? 'hl' : ''));
    return `<pre class="mul2">${out}</pre>`;
  }
  /* l4mul2：竖式乘 2 位数 {a, b} */
  S.l4mul2 = ({ a, b }) => {
    const bo = b % 10, bt = Math.floor(b / 10), p1 = a * bo, p2 = a * bt * 10, prod = a * b;
    const pre = cfg => `<div class="center">${mul2HTML(Object.assign({ a, b }, cfg))}</div>`;
    const digitLines = (m, label) => mulDigits(a, m).map(st => `${st.x} ${NAME[st.k][1]} × ${m} = ${st.p}${st.carryIn ? ` + ${st.carryIn} = ${st.s}` : ''}${st.c ? `，写 ${st.d} 进 ${st.c}` : ''}`).join('；');
    const steps = [
      { zh: `${a} × ${b}：乘数 ${b} 有两位，<b>分两步</b>：先乘个位的 ${bo}，再乘十位的 ${bt}（也就是 ${bt * 10}），最后把两次结果加起来。`, en: `Multiply by the ones digit ${bo}, then by the tens digit (${bt * 10}), then add.`, render: s => { s.innerHTML = pre({}); } },
      { zh: `❶ 先算 ${a} × <b>${bo}</b>：${bo === 0 ? `任何数乘 0 都是 0，写 0。` : digitLines(bo) + `。得到 <b>${p1}</b>。`}`, en: `${a} × ${bo} = ${p1}.`, render: s => { s.innerHTML = wrap(pre({ p1, hl: 'p1' }), line(`${a} × ${bo} = ${p1}`)); } },
      { zh: `❷ 再算 ${a} × <b>${bt * 10}</b>：先算 ${a} × ${bt}${bt > 1 ? `（${digitLines(bt)}）` : ''} = ${a * bt}，再乘 10，后面添一个 0：<b>${fmt(p2)}</b>。写在第二行，和第一行的位对齐。`, en: `${a} × ${bt * 10} = ${a * bt} × 10 = ${fmt(p2)}.`, render: s => { s.innerHTML = wrap(pre({ p1, p2, hl: 'p2' }), line(`${a} × ${bt * 10} = ${fmt(p2)}`)); } },
      { zh: `❸ 把两行加起来：${fmt(p1)} + ${fmt(p2)} = <b>${fmt(prod)}</b>。所以 ${a} × ${b} = <b>${fmt(prod)}</b>。`, en: `${fmt(p1)} + ${fmt(p2)} = ${fmt(prod)}.`, render: s => { s.innerHTML = wrap(pre({ p1, p2, sum: prod, hl: 'sum' }), line(`${a} × ${b} = ${fmt(prod)}`)); } },
    ];
    return steps;
  };
  /* l4mul10：乘整十 {a, b} b 是整十 */
  S.l4mul10 = ({ a, b }) => {
    const t = b / 10, p = a * t, prod = a * b;
    return [
      { zh: `${a} × ${b}：${b} 是 <b>${t} 个十</b>（${t} tens），所以 ${a} × ${b} = ${a} × ${t} tens。`, en: `${b} = ${t} tens, so ${a} × ${b} = ${a} × ${t} tens.`, render: s => { s.innerHTML = wrap(line(`${a} × ${b} = ${a} × ${t} tens`)); } },
      { zh: `先算 ${a} × ${t} = <b>${p}</b>，所以是 ${p} 个十（${p} tens）。`, en: `${a} × ${t} = ${p}, so ${p} tens.`, render: s => { s.innerHTML = wrap(line(`${a} × ${t} = ${p}`), line(`= ${p} tens`)); } },
      { zh: `${p} 个十就是 ${p} × 10 = <b>${fmt(prod)}</b>（后面添一个 0）。`, en: `${p} tens = ${fmt(prod)}.`, render: s => { s.innerHTML = wrap(line(`${a} × ${b} = ${p} × 10 = ${fmt(prod)}`)); } },
    ];
  };
  /* 估算规则 */
  const roundFactor = n => n >= 1000 ? Math.round(n / 1000) * 1000 : n >= 100 ? Math.round(n / 100) * 100 : Math.round(n / 10) * 10;
  const gcd = (x, y) => y ? gcd(y, x % y) : x;
  const estDivisor = (a, b) => { const unit = a >= 1000 ? 100 : 10, step = unit * b / gcd(unit, b); return Math.round(a / step) * step; };
  /* l4estmul：估算乘法 {a, b} */
  S.l4estmul = ({ a, b }) => {
    const ra = roundFactor(a), rb = roundFactor(b), near = n => n >= 1000 ? '千' : n >= 100 ? '百' : '十';
    return [
      { zh: `估算 ${a} × ${b}：把每个数<b>四舍五入</b>成好算的数。${a} 到最接近的${near(a)}：${a} ≈ <b>${ra}</b>；${b} 到最接近的${near(b)}：${b} ≈ <b>${rb}</b>。`, en: `Round off: ${a} ≈ ${ra} and ${b} ≈ ${rb}.`, render: s => { s.innerHTML = wrap(line(`${a} ≈ ${ra}`), line(`${b} ≈ ${rb}`)); } },
      { zh: `${ra} × ${rb}：先算 ${ra / 10 ** (String(ra).length - 1)} × ${rb / 10 ** (String(rb).length - 1)} = ${(ra / 10 ** (String(ra).length - 1)) * (rb / 10 ** (String(rb).length - 1))}，再把两个数的 0 一共 ${String(ra).length - 1 + String(rb).length - 1} 个添在后面：<b>${fmt(ra * rb)}</b>。`, en: `${ra} × ${rb} = ${fmt(ra * rb)}.`, render: s => { s.innerHTML = wrap(line(`${ra} × ${rb} = ${fmt(ra * rb)}`)); } },
      { zh: `所以 ${a} × ${b} ≈ <b>${fmt(ra * rb)}</b>。`, en: `${a} × ${b} ≈ ${fmt(ra * rb)}.`, render: s => { s.innerHTML = wrap(line(`${a} × ${b} ≈ ${fmt(ra * rb)}`)); } },
    ];
  };
  /* l4estdiv：估算除法 {a, b} */
  S.l4estdiv = ({ a, b }) => {
    const ra = estDivisor(a, b), unit = a >= 1000 ? '百' : '十';
    return [
      { zh: `估算 ${a} ÷ ${b}：把 ${a} 换成一个<b>接近它、又能被 ${b} 整除</b>的整${unit}数。想 ${b} 的乘法表：${b} × ${ra / b / 10 ** (a >= 1000 ? 2 : 1)} = ${ra / 10 ** (a >= 1000 ? 2 : 1)}，所以 ${a} ≈ <b>${fmt(ra)}</b>。`, en: `Choose a number close to ${a} that ${b} divides exactly: ${a} ≈ ${fmt(ra)}.`, render: s => { s.innerHTML = wrap(line(`${a} ≈ ${fmt(ra)}`)); } },
      { zh: `${fmt(ra)} ÷ ${b} = <b>${fmt(ra / b)}</b>。`, en: `${fmt(ra)} ÷ ${b} = ${fmt(ra / b)}.`, render: s => { s.innerHTML = wrap(line(`${fmt(ra)} ÷ ${b} = ${fmt(ra / b)}`)); } },
      { zh: `所以 ${a} ÷ ${b} ≈ <b>${fmt(ra / b)}</b>。`, en: `${a} ÷ ${b} ≈ ${fmt(ra / b)}.`, render: s => { s.innerHTML = wrap(line(`${a} ÷ ${b} ≈ ${fmt(ra / b)}`)); } },
    ];
  };
  /* l4reason：算一算、估一估、看合理吗 {a, b, op:'×'|'÷'} */
  S.l4reason = ({ a, b, op }) => {
    const mul = op === '×';
    const exact = mul ? a * b : Math.floor(a / b), rem = mul ? 0 : a % b;
    const exactSteps = mul ? (b >= 10 ? S.l4mul2({ a, b }) : S.l4mul1({ a, b })) : S.l3ldiv({ a, b });
    const estSteps = mul ? S.l4estmul({ a, b }) : S.l4estdiv({ a, b });
    const est = mul ? roundFactor(a) * roundFactor(b) : estDivisor(a, b) / b;
    const exactTxt = `${fmt(exact)}${rem ? ` R ${rem}` : ''}`;
    return [
      { zh: `(a) 先<b>算出准确答案</b>：${a} ${op} ${b}。`, en: `(a) Work out ${a} ${op} ${b} exactly.`, render: s => { s.innerHTML = wrap(line(`${a} ${op} ${b} = ?`)); } },
      ...exactSteps.slice(1),
      { zh: `(b) 再<b>估算</b>一下，用来检查。`, en: '(b) Estimate to check.', render: s => { s.innerHTML = wrap(line(`${a} ${op} ${b} = ${exactTxt}`), line(`估算 estimate：${a} ${op} ${b} ≈ ?`)); } },
      ...estSteps,
      { zh: `(c) 比一比：准确答案 <b>${exactTxt}</b>，估算 <b>${fmt(est)}</b>，两个数很接近，所以准确答案是<b>合理的（reasonable）</b>：Yes。如果差很多，就要回头检查计算。`, en: `${exactTxt} is close to ${fmt(est)}, so the answer is reasonable: Yes.`, render: s => { s.innerHTML = wrap(line(`${exactTxt} ≈ ${fmt(est)} ✓`), line('Reasonable: Yes')); } },
    ];
  };
  window.L4MUL = { roundFactor, estDivisor, mul2HTML };
})();
