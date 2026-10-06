/* Level 4 · Unit 3  整数的乘除 */
(function () {
  const U = window.MATH_DATA.levels[4].units;
  const unit = num => U.find(u => u.num === num);
  const M = window.L4MUL, L3 = window.L3, fmt = window.L4.fmt;
  const pic = html => `<div class="center">${html}</div>`;
  const num = a => ({ a });
  const choice = (a, options) => ({ a, kind: 'choice', options });
  const F = (id, p, text, fields, explain, zh, en, o) => Object.assign({ id, type: 'fill', pic: p, label: text.replace(/\{\{\w+\}\}/g, '___').replace(/\n/g, ' '), prompt: { zh, en: en || 'Fill in the blanks' }, text, fields, answerText: Object.values(fields).map(f => f.a).join(', '), explain }, o || {});

  const mul1A = [[412, 4], [547, 2], [610, 5], [935, 3], [109, 7], [5317, 6], [2011, 8], [6028, 9], [1526, 5], [8437, 8]];
  const tensB = [[18, 20], [69, 40], [98, 30], [53, 60], [77, 90], [42, 80]];
  const mul2C = [[46, 18], [35, 20], [67, 36], [91, 27], [89, 16], [126, 50], [625, 73], [619, 24], [281, 53], [380, 36]];
  const divA = [[1355, 5], [4827, 3], [9804, 2], [6088, 8], [1458, 6], [1131, 3], [7024, 4], [6223, 7], [9117, 9], [9920, 5]];
  const divB = [[4569, 8], [1348, 5], [4240, 7], [3134, 4], [9381, 9], [3737, 3], [5740, 6], [6519, 8], [2792, 7], [4391, 9]];
  const estA = [[59, 17], [35, 64], [82, 71], [43, 98], [56, 24], [623, 55], [917, 31], [151, 94], [360, 49], [848, 88]];
  const estB = [[237, 5], [454, 3], [573, 6], [715, 8], [982, 4], [4927, 7], [8080, 9], [6446, 5], [5353, 6], [9619, 8]];
  const reason = [[84, 52, '×'], [68, 97, '×'], [403, 91, '×'], [976, 38, '×'], [43, 8, '÷'], [85, 9, '÷'], [538, 6, '÷'], [768, 7, '÷'], [8765, 4, '÷'], [9424, 5, '÷']];

  unit(3).kps = [
    {
      id: 'l4-3-1', available: true,
      title: { zh: '乘一位数和两位数', en: 'Multiply by 1-digit and 2-digit numbers' },
      intro: { zh: '乘一位数：从个位开始，每一位都乘，满 10 进位。乘两位数分两步：先乘个位，再乘十位（后面添 0），最后把两行加起来。', en: 'Multiply each digit from the ones, regrouping when needed. For a 2-digit multiplier, multiply by the ones, then by the tens, then add.' },
      sections: [
        { id: 'A', type: 'column', title: { zh: '竖式乘一位数', en: 'Do these sums. Show your working clearly' },
          example: { kind: 'l4mul1', n: { a: 218, b: 3 }, title: { zh: '218 × 3 = 654：8×3=24 写 4 进 2，1×3+2=5，2×3=6', en: '218 × 3 = 654' } },
          questions: mul1A.map(([a, b], i) => ({ id: `l4-3-1-A${i + 1}`, type: 'column', a, b, op: '×', explain: ['l4mul1', { a, b }], label: `${a} × ${b} = ${fmt(a * b)}`, hint: { zh: '从个位开始乘，满 10 进位；前面的位乘完要加上进来的数。', en: 'Multiply from the ones; regroup when needed.' } })) },
        { id: 'B', type: 'fill', title: { zh: '乘整十数', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'l4mul10', n: { a: 16, b: 30 }, title: { zh: '16 × 30 = 16 × 3 tens = 48 tens = 480', en: '16 × 30 = 480' } },
          questions: tensB.map(([a, b], i) => { const t = b / 10, p = a * t; const tens = i < 3;
            return F(`l4-3-1-B${i + 1}`, '', tens ? `${a} × ${b} = {{x}} × {{y}} tens\n= {{t}} tens\n= {{p}}` : `${a} × ${b} = {{x}} × {{y}} × 10\n= {{t}} × 10\n= {{p}}`, { x: num(a), y: num(t), t: num(p), p: num(a * b) }, ['l4mul10', { a, b }], `${b} 是 ${t} 个十，先算 ${a} × ${t}，再乘 10`, `${a} × ${b}`, { label: `${a} × ${b} = ${a * b}`, hint: { zh: `${b} = ${t} 个十。先算 ${a} × ${t}，后面添一个 0。`, en: `${b} = ${t} tens.` } }); }) },
        { id: 'C', type: 'fill', title: { zh: '竖式乘两位数', en: 'Do these sums. Show your working clearly' },
          example: { kind: 'l4mul2', n: { a: 24, b: 35 }, title: { zh: '24 × 35：24×5=120，24×30=720，120+720=840', en: '24 × 35 = 840' } },
          questions: mul2C.map(([a, b], i) => F(`l4-3-1-C${i + 1}`, pic(M.mul2HTML({ a, b })), `${a} × ${b} = {{a}}`, { a: num(a * b) }, ['l4mul2', { a, b }], `分两步：先乘个位的 ${b % 10}，再乘 ${Math.floor(b / 10) * 10}，两行相加`, 'Multiply these numbers', { label: `${a} × ${b} = ${fmt(a * b)}`, hint: { zh: `${a} × ${b % 10} 和 ${a} × ${Math.floor(b / 10) * 10}，加起来。`, en: `${a} × ${b % 10} plus ${a} × ${Math.floor(b / 10) * 10}.` } })) },
      ],
    },
    {
      id: 'l4-3-2', available: true,
      title: { zh: '除以一位数', en: 'Divide by 1-digit numbers' },
      intro: { zh: '四位数除以一位数：从千位开始，一位一位除；每次余下的和下一位合起来再除。最后除不尽的是余数（R）。', en: 'Divide from the thousands, one place at a time. Bring down the next digit each time. What is left at the end is the remainder.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '短除法', en: 'Do these sums. Show your working clearly' },
          example: { kind: 'l3ldiv', n: { a: 2712, b: 4 }, title: { zh: '2712 ÷ 4：27÷4=6 余 3，31÷4=7 余 3，32÷4=8 → 678', en: '2712 ÷ 4 = 678' } },
          questions: divA.map(([a, b], i) => F(`l4-3-2-A${i + 1}`, pic(L3.ldivHTML(a, b)), `${a} ÷ ${b} = {{q}}`, { q: num(a / b) }, ['l3ldiv', { a, b }], `${a} ÷ ${b} 商是几？`, 'Divide these numbers', { label: `${a} ÷ ${b} = ${a / b}`, hint: { zh: '从千位开始除，余下的和下一位合起来再除。', en: 'Divide from the highest place.' } })) },
        { id: 'B', type: 'fill', title: { zh: '有余数的除法', en: 'Do these sums. Show your working clearly' },
          example: { kind: 'l3ldiv', n: { a: 2713, b: 4 }, title: { zh: '2713 ÷ 4 = 678 R 1', en: '2713 ÷ 4 = 678 R 1' } },
          questions: divB.map(([a, b], i) => { const q = Math.floor(a / b), r = a % b; return F(`l4-3-2-B${i + 1}`, '', `${a} ÷ ${b} = {{q}} R {{r}}`, { q: num(q), r: num(r) }, ['l3ldiv', { a, b }], `${a} ÷ ${b} 商是几？余数是几？`, 'Divide. Write the quotient and the remainder', { label: `${a} ÷ ${b} = ${q} R ${r}`, hint: { zh: '列短除式；最后减剩下的就是余数，余数一定比除数小。', en: 'The remainder must be smaller than the divisor.' } }); }) },
      ],
    },
    {
      id: 'l4-3-3', available: true,
      title: { zh: '估算乘法和除法', en: 'Estimate answers in multiplication and division' },
      intro: { zh: '估算乘法：把每个数四舍五入成整十、整百再乘。估算除法：把被除数换成一个接近它、又能被除数整除的整十、整百数。', en: 'Round off each number before multiplying. For division, choose a nearby number that the divisor divides exactly.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '估算乘法', en: 'Estimate the value' },
          example: { kind: 'l4estmul', n: { a: 23, b: 46 }, title: { zh: '23 ≈ 20，46 ≈ 50：20 × 50 = 1000', en: '23 × 46 ≈ 1000' } },
          questions: estA.map(([a, b], i) => { const ra = M.roundFactor(a), rb = M.roundFactor(b); return F(`l4-3-3-A${i + 1}`, '', `${a} × ${b} ≈ {{x}} × {{y}}\n= {{p}}`, { x: num(ra), y: num(rb), p: num(ra * rb) }, ['l4estmul', { a, b }], '先把两个数四舍五入，再乘', `Estimate ${a} × ${b}`, { label: `${a} × ${b} ≈ ${ra} × ${rb} = ${fmt(ra * rb)}`, hint: { zh: `两位数到整十，三位数到整百：${a} ≈ ${ra}，${b} ≈ ${rb}。`, en: `${a} ≈ ${ra}, ${b} ≈ ${rb}.` } }); }) },
        { id: 'B', type: 'fill', title: { zh: '估算除法', en: 'Estimate the value' },
          example: { kind: 'l4estdiv', n: { a: 158, b: 4 }, title: { zh: '158 ≈ 160，160 ÷ 4 = 40', en: '158 ÷ 4 ≈ 40' } },
          questions: estB.map(([a, b], i) => { const ra = M.estDivisor(a, b); return F(`l4-3-3-B${i + 1}`, '', `${a} ÷ ${b} ≈ {{x}} ÷ ${b}\n= {{q}}`, { x: num(ra), q: num(ra / b) }, ['l4estdiv', { a, b }], `把 ${a} 换成接近它、又能被 ${b} 整除的数，再除`, `Estimate ${a} ÷ ${b}`, { label: `${a} ÷ ${b} ≈ ${ra} ÷ ${b} = ${ra / b}`, hint: { zh: `想 ${b} 的乘法表，找一个接近 ${a} 的整${a >= 1000 ? '百' : '十'}数。`, en: `Think of the ${b} times table.` } }); }) },
      ],
    },
    {
      id: 'l4-3-4', available: true,
      title: { zh: '检查答案合不合理', en: 'Check that answers are reasonable' },
      intro: { zh: '算完以后再估算一次：如果准确答案和估算结果很接近，答案就是合理的（reasonable）；差很多就要回头检查。', en: 'After working out the exact answer, estimate. If the two are close, the answer is reasonable.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '算一算、估一估、合理吗', en: 'Do these sums. Show your working clearly' },
          example: { kind: 'l4reason', n: { a: 84, b: 52, op: '×' }, title: { zh: '84 × 52 = 4368；估算 80 × 50 = 4000；接近，合理', en: '84 × 52 = 4368 ≈ 4000, reasonable' } },
          questions: reason.map(([a, b, op], i) => { const mul = op === '×'; const exact = mul ? a * b : Math.floor(a / b), rem = mul ? 0 : a % b; const est = mul ? M.roundFactor(a) * M.roundFactor(b) : M.estDivisor(a, b) / b;
            const fields = mul ? { p: num(exact), e: num(est), yn: choice('Yes', ['Yes', 'No']) } : { q: num(exact), r: num(rem), e: num(est), yn: choice('Yes', ['Yes', 'No']) };
            const text = `(a) ${mul ? 'Multiply' : 'Divide'} ${a} by ${b}. ${mul ? '{{p}}' : '{{q}} R {{r}}'}\n(b) Estimate the value of ${a} ${op} ${b}. {{e}}\n(c) State if your actual answer is reasonable. {{yn}}`;
            const o = { label: `${a} ${op} ${b} = ${fmt(exact)}${rem ? ' R ' + rem : ''}，估算 ${fmt(est)}，Yes`, hint: { zh: mul ? '(a) 列竖式；(b) 两个数都四舍五入再乘；(c) 两个结果接近就是 Yes。' : '(a) 列短除式；(b) 把被除数换成能整除的接近数；(c) 两个结果接近就是 Yes。', en: 'Work it out, estimate, then compare.' } };
            if (a === 9424) o.accept = [{ q: exact, r: rem, e: 1880, yn: 'Yes' }, { q: exact, r: rem, e: 1900, yn: 'Yes' }];
            return F(`l4-3-4-A${i + 1}`, '', text, fields, ['l4reason', { a, b, op }], `先算出 ${a} ${op} ${b}，再估算，最后判断合不合理`, `${mul ? 'Multiply' : 'Divide'} ${a} by ${b}, estimate, and check`, o); }) },
      ],
    },
  ];
})();
