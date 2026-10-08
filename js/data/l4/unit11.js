/* Level 4 · Unit 11  小数的四则运算 */
(function () {
  const U = window.MATH_DATA.levels[4].units;
  const unit = num => U.find(u => u.num === num);
  const D = window.L4DEC, O = window.L4DOPS;
  const pic = html => `<div class="center">${html}</div>`;
  const dec = a => ({ a: String(a), kind: 'dec' });
  const num = a => ({ a });
  const text = a => ({ a, kind: 'text' });
  const choice = (a, options) => ({ a, kind: 'choice', options });
  const F = (id, p, t, fields, explain, zh, en, o) => Object.assign({ id, type: 'fill', pic: p, label: t.replace(/\{\{\w+\}\}/g, '___').replace(/\n/g, ' '), prompt: { zh, en: en || 'Fill in the blanks' }, text: t, fields, answerText: Object.values(fields).map(f => f.a).join(', '), explain }, o || {});
  const sym = op => op === '-' ? '−' : op;
  const colQ = (id, a, b, op) => { const [A, B] = O.alignDp(a, b); const ans = O.exactOf(a, b, op); return F(id, pic(O.dcol({ lines: [{ s: A }, { s: `${sym(op)} ${B}` }, { s: ' ', rule: true }] })), `${A} ${sym(op)} ${B} = {{a}}`, { a: dec(ans) }, ['l4dcol', { a, b, op }], op === '+' ? '小数点对齐，从右边一位开始加' : '小数点对齐，从右边一位开始减', op === '+' ? 'Add these decimals' : 'Subtract these decimals', { label: `${A} ${sym(op)} ${B} = ${ans}`, hint: { zh: '和整数竖式一样，只是小数点要对齐，答案也要点上小数点。', en: 'Line up the decimal points.' } }); };
  const mulQ = (id, a, b) => { const ans = O.exactOf(a, b, '×'); return F(id, pic(O.dcol({ lines: [{ s: a }, { s: `× ${b}` }, { s: ' ', rule: true }] })), `${a} × ${b} = {{a}}`, { a: dec(ans) }, ['l4dmul', { a, b }], '从右边一位开始乘，最后对齐点上小数点', 'Multiply these decimals', { label: `${a} × ${b} = ${ans}`, hint: { zh: '每一位都乘，满 10 进位；小数点和上面对齐。', en: 'Multiply each digit; keep the decimal point in line.' } }); };
  const divQ = (id, a, b, orig) => { const ans = D.fromI(+a.replace('.', '') / b, D.dpOf(a)); return F(id, pic(O.dvHTML(orig || a, b)), `${orig || a} ÷ ${b} = {{a}}`, { a: dec(ans) }, ['l4ddiv', { a, b, orig: orig || a }], '从最高位开始除，商的小数点对齐', 'Divide these decimals', { label: `${orig || a} ÷ ${b} = ${D.trim0(ans)}`, hint: { zh: orig && orig !== a ? `除不尽就在末尾添 0：${orig} = ${a}。` : '从最高位除起，余下的和下一位合起来再除。', en: 'Divide from the highest place.' } }); };
  const scaleQ = (id, x, y, op) => { const mul = op === '×'; const base = mul ? x * y : x / y; const v1 = D.trim0((base / 10).toFixed(2)), v2 = (base / 100).toFixed(2); const s1 = D.trim0((x / 10).toFixed(1)), s2 = (x / 100).toFixed(2); return F(id, '', `${x} ${op} ${y} = {{a}}\n${s1} ${op} ${y} = {{b}}\n${s2} ${op} ${y} = {{c}}`, { a: dec(base), b: dec(v1), c: dec(v2) }, ['l4decscale', { x, y, op }], `先算 ${x} ${op} ${y}，再想 ${x} 个十分之一、${x} 个百分之一`, 'Fill in each blank', { label: `${x} ${op} ${y} 系列`, hint: { zh: `${s1} 是 ${x} 个 0.1，${s2} 是 ${x} 个 0.01。`, en: `${s1} is ${x} tenths; ${s2} is ${x} hundredths.` } }); };
  const estQ = (id, a, b, op) => { const { A, B, v } = O.estOf(a, b, op); return F(id, '', `${a} ${sym(op)} ${b} ≈ {{a}}`, { a: num(v) }, ['l4decest', { a, b, op }], '把每个小数四舍五入到整数再算', 'Estimate', { label: `${a} ${sym(op)} ${b} ≈ ${v}`, hint: { zh: `${a} ≈ ${A}${typeof b === 'number' ? '' : `，${b} ≈ ${B}`}。`, en: 'Round to the nearest whole number first.' } }); };

  const addA = [['6.2', '1.3'], ['56.01', '72.96'], ['9.08', '5.57'], ['5.14', '13.63'], ['39.78', '44.05'], ['24.68', '8.64'], ['17.45', '19.54'], ['52.62', '41.73'], ['60.78', '70.89'], ['93.06', '84.08']];
  const subB = [['9.7', '5.4'], ['4.61', '2.39'], ['21.75', '8.03'], ['97.36', '50.72'], ['80.49', '31.67'], ['15.12', '6.34'], ['38.55', '19.66'], ['53.01', '27.57'], ['62.30', '34.15'], ['76.43', '9.69']];
  const scaleA = [[2, 3], [3, 4], [4, 1], [5, 2], [6, 2]];
  const mulB = [['0.4', 5], ['8.17', 7], ['3.45', 3], ['0.78', 9], ['3.8', 4], ['2.3', 6], ['12.36', 5], ['50.12', 2], ['21.55', 6], ['78.96', 8]];
  const scaleC = [[2, 2], [5, 1], [6, 3], [10, 2], [12, 4]];
  const divD = [['5.25', 5], ['4.890', 2, '4.89'], ['16.4', 4], ['27.45', 9], ['43.40', 4, '43.4'], ['812.7', 9], ['402.150', 6, '402.15'], ['18.0', 5, '18'], ['10.00', 8, '10'], ['368.41', 7]];
  const estA = [['8.48', '7.37', '+'], ['5.70', '10.29', '+'], ['12.16', '11.83', '+'], ['15.05', '21.21', '+'], ['33.92', '26.54', '+'], ['6.72', '2.67', '-'], ['10.19', '5.51', '-'], ['16.88', '11.38', '-'], ['21.93', '13.63', '-'], ['37.27', '26.06', '-']];
  const estB = [['6.56', 4, '×'], ['9.27', 6, '×'], ['11.48', 7, '×'], ['14.64', 8, '×'], ['20.73', 9, '×'], ['9.08', 3, '÷'], ['14.82', 5, '÷'], ['23.93', 6, '÷'], ['35.45', 7, '÷'], ['48.49', 8, '÷']];
  const decode = [['A', '26.54', '92.88', '+'], ['C', '84.05', '77.13', '-'], ['D', '5.4', 8, '×'], ['E', '11.99', 3, '÷'], ['I', '125.09', '68.01', '+'], ['L', '524.87', '128.39', '-'], ['M', '44.19', 5, '×'], ['S', '35.59', 6, '÷']];
  const codes = [40, 4, 7, 193, 220, 120, 397, 6];
  const reason = [['4.58', '5.48', '+'], ['26.26', '13.75', '+'], ['9.61', '4.19', '-'], ['32.07', '15.83', '-'], ['8.55', 5, '×'], ['16.46', 9, '×'], ['7.84', 4, '÷'], ['27.36', 9, '÷']];

  unit(11).kps = [
    { id: 'l4-11-1', available: true, title: { zh: '小数加减', en: 'Add and subtract decimals' },
      intro: { zh: '小数竖式：小数点对齐，和整数一样从右边一位开始加减，答案也要点上小数点。', en: 'Line up the decimal points, then add or subtract like whole numbers.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '加法', en: 'Add these decimals' }, example: { kind: 'l4dcol', n: { a: '0.1', b: '0.3', op: '+' }, title: { zh: '1 tenth + 3 tenths = 4 tenths = 0.4', en: '0.1 + 0.3 = 0.4' } }, questions: addA.map(([a, b], i) => colQ(`l4-11-1-A${i + 1}`, a, b, '+')) },
        { id: 'B', type: 'fill', title: { zh: '减法', en: 'Subtract these decimals' }, example: { kind: 'l4dcol', n: { a: '0.5', b: '0.2', op: '-' }, title: { zh: '5 tenths − 2 tenths = 3 tenths = 0.3', en: '0.5 − 0.2 = 0.3' } }, questions: subB.map(([a, b], i) => colQ(`l4-11-1-B${i + 1}`, a, b, '-')) },
      ] },
    { id: 'l4-11-2', available: true, title: { zh: '小数乘除', en: 'Multiply and divide decimals' },
      intro: { zh: '0.2 × 3：2 个十分之一 × 3 = 6 个十分之一 = 0.6。竖式乘法和整数一样，最后对齐点上小数点。除法从最高位除起，商的小数点和被除数对齐；除不尽时末尾添 0。', en: 'Multiply or divide like whole numbers, then place the decimal point in line.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '乘法规律', en: 'Fill in each blank with the correct answer' }, example: { kind: 'l4decscale', n: { x: 2, y: 4, op: '×' }, title: { zh: '2×4=8，0.2×4=0.8，0.02×4=0.08', en: '0.2 × 4 = 0.8' } }, questions: scaleA.map(([x, y], i) => scaleQ(`l4-11-2-A${i + 1}`, x, y, '×')) },
        { id: 'B', type: 'fill', title: { zh: '竖式乘法', en: 'Multiply these decimals' }, example: { kind: 'l4dmul', n: { a: '5.1', b: 2 }, title: { zh: '1 tenth × 2 = 2 tenths；5 × 2 = 10：10.2', en: '5.1 × 2 = 10.2' } }, questions: mulB.map(([a, b], i) => mulQ(`l4-11-2-B${i + 1}`, a, b)) },
        { id: 'C', type: 'fill', title: { zh: '除法规律', en: 'Fill in each blank with the correct answer' }, example: { kind: 'l4decscale', n: { x: 8, y: 2, op: '÷' }, title: { zh: '8÷2=4，0.8÷2=0.4，0.08÷2=0.04', en: '0.8 ÷ 2 = 0.4' } }, questions: scaleC.map(([x, y], i) => scaleQ(`l4-11-2-C${i + 1}`, x, y, '÷')) },
        { id: 'D', type: 'fill', title: { zh: '短除法', en: 'Divide these decimals' }, example: { kind: 'l4ddiv', n: { a: '7.8', b: 3 }, title: { zh: '7 ÷ 3 = 2 余 1，1 one = 10 tenths，18 tenths ÷ 3 = 6 tenths：2.6', en: '7.8 ÷ 3 = 2.6' } }, questions: divD.map(([a, b, orig], i) => divQ(`l4-11-2-D${i + 1}`, a, b, orig)) },
      ] },
    { id: 'l4-11-3', available: true, title: { zh: '估算', en: 'Estimate the value of decimals' },
      intro: { zh: '估算小数：先把每个数四舍五入到整数（看十分位），再用整数算。', en: 'Round each decimal to the nearest whole number, then calculate.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '估算加减', en: 'Estimate the value of the following sums' }, example: { kind: 'l4decest', n: { a: '1.51', b: '2.62', op: '+' }, title: { zh: '1.51 ≈ 2，2.62 ≈ 3：2 + 3 = 5', en: '1.51 + 2.62 ≈ 5' } }, questions: estA.map(([a, b, op], i) => estQ(`l4-11-3-A${i + 1}`, a, b, op)) },
        { id: 'B', type: 'fill', title: { zh: '估算乘除', en: 'Estimate' }, example: { kind: 'l4decest', n: { a: '2.35', b: 3, op: '×' }, title: { zh: '2.35 ≈ 2：2 × 3 = 6', en: '2.35 × 3 ≈ 6' } }, questions: estB.map(([a, b, op], i) => estQ(`l4-11-3-B${i + 1}`, a, b, op)) },
        { id: 'C', type: 'fill', title: { zh: '估算解密', en: 'Estimate the value of each by rounding off to the nearest whole number. Decode the message' }, example: { kind: 'l4decode', n: { items: decode, codes }, title: { zh: '每个字母一个数，把数换成字母', en: 'Decode the message' } },
          questions: decode.map(([L, a, b, op], i) => { const { v } = O.estOf(a, b, op); return F(`l4-11-3-C${i + 1}`, '', `${L}：${a} ${sym(op)} ${b} = {{a}}`, { a: num(v) }, ['l4decest', { a, b, op }], `算出字母 ${L} 对应的数（先四舍五入到整数）`, `${a} ${sym(op)} ${b}`, { label: `${L} = ${v}`, hint: { zh: '每个数先四舍五入到整数。', en: 'Round first.' } }); })
            .concat([F('l4-11-3-C9', pic(`<table class="pv4"><tr>${codes.map(c => `<td style="font-size:18px">${c}</td>`).join('')}</tr></table>`), 'The message is: {{w}}', { w: text('DECIMALS') }, ['l4decode', { items: decode, codes }], '把方格里的数换成前面算出的字母，拼出单词', 'Decode the message', { label: 'DECIMALS', hint: { zh: '40 是哪个字母？4 呢？按顺序拼。', en: 'Match each number to its letter.' } })]) },
      ] },
    { id: 'l4-11-4', available: true, title: { zh: '检查答案合不合理', en: 'Check that answers are reasonable' },
      intro: { zh: '算完再估算一次，两个结果接近就是合理的（Yes）。', en: 'Calculate, estimate, then compare.' },
      sections: [{ id: 'A', type: 'fill', title: { zh: '算一算、估一估、合理吗', en: 'Do these sums. Show your working clearly' }, example: { kind: 'l4dreason', n: { a: '4.58', b: '5.48', op: '+' }, title: { zh: '4.58 + 5.48 = 10.06；估算 5 + 5 = 10；接近，合理', en: '10.06 ≈ 10, reasonable' } },
        questions: reason.map(([a, b, op], i) => { const exact = O.exactOf(a, b, op), { v } = O.estOf(a, b, op); return F(`l4-11-4-A${i + 1}`, '', `(a) Calculate the value of ${a} ${sym(op)} ${b}. {{a}}\n(b) Estimate the value of ${a} ${sym(op)} ${b}. {{e}}\n(c) State if your answer is reasonable. {{yn}}`, { a: dec(exact), e: num(v), yn: choice('Yes', ['Yes', 'No']) }, ['l4dreason', { a, b, op }], `先算 ${a} ${sym(op)} ${b}，再估算，最后判断`, `Calculate, estimate and check ${a} ${sym(op)} ${b}`, { label: `${a} ${sym(op)} ${b} = ${exact}，估算 ${v}，Yes`, hint: { zh: '(a) 列竖式；(b) 四舍五入到整数再算；(c) 接近就 Yes。', en: 'Work it out, estimate, compare.' } }); }) }] },
  ];
})();
