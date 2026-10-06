/* Level 3 · Unit 7  除法 */
(function () {
  const U = window.MATH_DATA.levels[3].units;
  const unit = num => U.find(u => u.num === num);
  const L = window.L3;
  const num = a => ({ a });
  const choice = (a, options) => ({ a, kind: 'choice', options });
  const F = (id, p, text, fields, explain, zh, en, o) => Object.assign({ id, type: 'fill', pic: p, label: text.replace(/\{\{\w+\}\}/g, '___').replace(/\n/g, ' '), prompt: { zh, en: en || 'Fill in the blanks' }, text, fields, answerText: Object.values(fields).map(f => f.a).join(', '), explain }, o || {});
  const bracket = (a, b) => `<div class="center">${L.ldivHTML(a, b)}</div>`;
  const D = (id, a, b, o) => { const q = Math.floor(a / b), r = a % b; return F(id, bracket(a, b), r || (o && o.showR) ? `Quotient: {{q}}　Remainder: {{r}}` : `{{q}}`, r || (o && o.showR) ? { q: num(q), r: num(r) } : { q: num(q) }, ['l3ldiv', { a, b }], `${a} ÷ ${b} 商是几？${r || (o && o.showR) ? '余数是几？' : ''}`, 'Divide these numbers. Show your working clearly', { label: `${a} ÷ ${b} = ${q}${r ? ' R ' + r : ''}`, hint: { zh: '从最高位开始除，余下的和下一位合起来再除。', en: 'Divide from the highest place.' } }); };
  const letterQ = (id, a, b, Lt, ico) => { const q = Math.floor(a / b), r = a % b; return F(id, '', `${ico} ${Lt}：${a} ÷ ${b} = {{q}}${r ? ' R {{r}}' : ''}`, r ? { q: num(q), r: num(r) } : { q: num(q) }, ['l3ldiv', { a, b }], `算出 ${a} ÷ ${b}，这个结果对应字母 ${Lt}`, `${a} ÷ ${b}`, { label: `${a} ÷ ${b} = ${q}${r ? ' R ' + r : ''} (${Lt})`, hint: { zh: '列短除式算。', en: 'Divide.' } }); };
  const nameQ = (id, seq, letters, ans, options, zh, en) => F(id, `<div class="center" style="font-size:18px;line-height:2">${seq.map(v => `<span style="display:inline-block;width:56px;border-bottom:2px solid #888;text-align:center;margin:0 3px">${v}</span>`).join('')}</div>`, `${en} {{w}}`, { w: choice(ans, options) }, ['l3ldiv', letters[0]], zh, en, { label: ans, hint: { zh: '把每个结果换成对应的字母。', en: 'Match each result to its letter.' } });
  const formAns = (digits, wantBig, odd) => { const par = d => odd ? d % 2 === 1 : d % 2 === 0; const cand = digits.filter(par).sort((x, y) => x - y), onesD = wantBig ? cand[0] : cand[cand.length - 1]; const rest = digits.slice(); rest.splice(rest.indexOf(onesD), 1); rest.sort((x, y) => wantBig ? y - x : x - y); return +`${rest.join('')}${onesD}`; };

  const remA = [[67, 7], [17, 5], [25, 3], [88, 9], [29, 4], [52, 6], [43, 8], [58, 7], [33, 5], [29, 6]];
  const remB = [[469, 4], [947, 3], [671, 4], [784, 5], [983, 6]];
  const giftC = [[17, 2, 'M'], [43, 6, 'R'], [55, 8, 'E'], [38, 4, 'A'], [60, 7, 'C']];
  const mentalA = [[8, 2], [6, 3], [8, 4], [10, 5]];
  const noB = [[28, 2], [36, 3], [66, 6], [46, 2], [69, 3], [84, 4], [62, 2], [96, 3], [88, 8], [84, 2]];
  const noC = [[202, 2], [440, 2], [864, 2], [639, 3], [488, 4]];
  const doorD = [[22, 2, 'R'], [48, 2, 'S'], [39, 3, 'M'], [48, 4, 'H'], [20, 2, 'O'], [64, 2, 'U']];
  const regA = [[90, 5], [84, 3], [36, 2], [76, 4], [96, 6], [98, 7], [72, 3], [75, 5], [94, 2], [68, 4]];
  const regB = [[792, 8], [637, 7], [138, 6], [702, 3], [972, 9]];
  const boomC = [[52, 2, 'N'], [85, 5, 'R'], [54, 3, 'O'], [84, 6, 'K'], [96, 4, 'A'], [91, 7, 'G']];
  const formD = [[[1, 4, 9], true, false, 2], [[1, 2, 6], false, true, 3], [[5, 8, 7], true, true, 4], [[9, 3, 6], false, false, 5], [[4, 7, 1], true, false, 6]];

  unit(7).kps = [
    {
      id: 'l3-7-1', available: true,
      title: { zh: '商和余数', en: 'Find quotient and remainder by dividing' },
      intro: { zh: '除不尽的时候剩下的叫余数（remainder），余数一定比除数小。13 ÷ 2 = 6 R 1：6 × 2 = 12，13 − 12 = 1。', en: 'What is left over is the remainder. It is always smaller than the divisor.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '两位数除以一位数', en: 'Divide these numbers. Show your working clearly' },
          example: { kind: 'l3ldiv', n: { a: 13, b: 2 }, title: { zh: '13 ÷ 2 = 6 R 1', en: '13 ÷ 2 = 6 R 1' } },
          questions: remA.map(([a, b], i) => D(`l3-7-1-A${i + 1}`, a, b, { showR: true })) },
        { id: 'B', type: 'fill', title: { zh: '三位数除以一位数', en: 'Divide these numbers. Show your working clearly' },
          example: { kind: 'l3ldiv', n: { a: 947, b: 3 }, title: { zh: '947 ÷ 3 = 315 R 2', en: '947 ÷ 3 = 315 R 2' } },
          questions: remB.map(([a, b], i) => D(`l3-7-1-B${i + 1}`, a, b, { showR: true })) },
        { id: 'C', type: 'fill', title: { zh: '生日礼物是什么', en: 'Bryan is buying a birthday present for his brother. Divide these numbers to find out what present he is getting for his brother' },
          example: { kind: 'l3ldiv', n: { a: 17, b: 2 }, title: { zh: '17 ÷ 2 = 8 R 1 → M', en: '17 ÷ 2 = 8 R 1' } },
          questions: giftC.map(([a, b, Lt], i) => letterQ(`l3-7-1-C${i + 1}`, a, b, Lt, '🎁')).concat([nameQ('l3-7-1-C6', ['8 R 4', '9 R 2', '8 R 1', '6 R 7', '7 R 1', '9 R 2'], [{ a: 60, b: 7 }], 'CAMERA', ['CAMERA', 'CARAME', 'MARACE', 'ERMACA'], '把每个结果换成字母，礼物是什么？', "Bryan's birthday present for his brother is a")]) },
      ],
    },
    {
      id: 'l3-7-2', available: true,
      title: { zh: '不退位除法', en: 'Divide numbers without regrouping' },
      intro: { zh: '每一位都能整除时，从最高位开始一位一位除：84 ÷ 4，8 个十 ÷ 4 = 2 个十，4 个一 ÷ 4 = 1，所以是 21。', en: 'Divide the tens, then the ones.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '心算：几、几十、几百', en: 'Divide these numbers mentally' },
          example: { kind: 'l3divmental', n: { a: 9, b: 3 }, title: { zh: '9 ÷ 3 = 3，90 ÷ 3 = 30，900 ÷ 3 = 300', en: '9 ÷ 3, 90 ÷ 3, 900 ÷ 3' } },
          questions: mentalA.map(([a, b], i) => F(`l3-7-2-A${i + 1}`, '', `${a} ÷ ${b} = {{x}}\n${a * 10} ÷ ${b} = {{y}}\n${a * 100} ÷ ${b} = {{z}}`, { x: num(a / b), y: num(a * 10 / b), z: num(a * 100 / b) }, ['l3divmental', { a, b }], `${a} ÷ ${b} 会了，${a * 10} ÷ ${b}、${a * 100} ÷ ${b} 呢？`, 'Divide mentally', { label: `${a} ÷ ${b}, ${a * 10} ÷ ${b}, ${a * 100} ÷ ${b}`, hint: { zh: `${a * 10} 是 ${a} 个十，商也是几个十。`, en: `${a} tens ÷ ${b}.` } })) },
        { id: 'B', type: 'fill', title: { zh: '两位数短除', en: 'Divide these numbers. Show your working clearly' },
          example: { kind: 'l3ldiv', n: { a: 24, b: 2 }, title: { zh: '24 ÷ 2：2 个十 ÷ 2 = 1 个十，4 ÷ 2 = 2，12', en: '24 ÷ 2 = 12' } },
          questions: noB.map(([a, b], i) => D(`l3-7-2-B${i + 1}`, a, b)) },
        { id: 'C', type: 'fill', title: { zh: '三位数短除', en: 'Divide these numbers. Show your working clearly' },
          example: { kind: 'l3ldiv', n: { a: 639, b: 3 }, title: { zh: '639 ÷ 3 = 213', en: '639 ÷ 3 = 213' } },
          questions: noC.map(([a, b], i) => D(`l3-7-2-C${i + 1}`, a, b)) },
        { id: 'D', type: 'fill', title: { zh: '哪个房间没有门', en: 'Divide these numbers. Answer the question that follows' },
          example: { kind: 'l3ldiv', n: { a: 22, b: 2 }, title: { zh: '22 ÷ 2 = 11 → R', en: '22 ÷ 2 = 11' } },
          questions: doorD.map(([a, b, Lt], i) => letterQ(`l3-7-2-D${i + 1}`, a, b, Lt, '🚪')).concat([nameQ('l3-7-2-D7', [13, 32, 24, 12, 11, 10, 10, 13], [{ a: 39, b: 3 }], 'MUSHROOM', ['MUSHROOM', 'MUSHROMO', 'SHUMROOM', 'MOSHRUOM'], '把每个结果换成字母，哪个房间没有门？', 'Which room has no door?')]) },
      ],
    },
    {
      id: 'l3-7-3', available: true,
      title: { zh: '退位除法', en: 'Divide numbers by regrouping hundreds, tens and ones' },
      intro: { zh: '高位除完有余数，就把余数变成下一位的 10 个再合起来除：32 ÷ 2，3 个十 ÷ 2 = 1 个十余 1 个十，1 个十 = 10 个一，10 + 2 = 12，12 ÷ 2 = 6，所以是 16。', en: 'Regroup the remainder into the next place and divide again.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '两位数', en: 'Divide these numbers. Show your working clearly' },
          example: { kind: 'l3ldiv', n: { a: 32, b: 2 }, title: { zh: '32 ÷ 2 = 16', en: '32 ÷ 2 = 16' } },
          questions: regA.map(([a, b], i) => D(`l3-7-3-A${i + 1}`, a, b)) },
        { id: 'B', type: 'fill', title: { zh: '三位数', en: 'Divide these numbers. Show your working clearly' },
          example: { kind: 'l3ldiv', n: { a: 702, b: 3 }, title: { zh: '702 ÷ 3 = 234', en: '702 ÷ 3 = 234' } },
          questions: regB.map(([a, b], i) => D(`l3-7-3-B${i + 1}`, a, b)) },
        { id: 'C', type: 'fill', title: { zh: '什么动物走路跳、站着坐', en: 'Divide these numbers. Answer the question that follows' },
          example: { kind: 'l3ldiv', n: { a: 52, b: 2 }, title: { zh: '52 ÷ 2 = 26 → N', en: '52 ÷ 2 = 26' } },
          questions: boomC.map(([a, b, Lt], i) => letterQ(`l3-7-3-C${i + 1}`, a, b, Lt, '🪃')).concat([nameQ('l3-7-3-C7', [14, 24, 26, 13, 24, 17, 18, 18], [{ a: 84, b: 6 }], 'KANGAROO', ['KANGAROO', 'KANGOROA', 'GANKAROO', 'KONGAROA'], '把每个结果换成字母，这是什么动物？', 'What jumps when it walks and sits when it stands?')]) },
        { id: 'D', type: 'fill', title: { zh: '组数再除', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'l3formdiv', n: { digits: [2, 5, 8], big: true, odd: true, b: 3 }, title: { zh: '用 2、5、8 组最大的奇数 825，825 ÷ 3 = 275', en: '825 ÷ 3 = 275' } },
          questions: formD.map(([digits, big, odd, b], i) => { const n = formAns(digits, big, odd), q = Math.floor(n / b), r = n % b; const en = `(a) Form the ${big ? 'greatest' : 'smallest'} 3-digit ${odd ? 'odd' : 'even'} number using the digits ${digits[0]}, ${digits[1]} and ${digits[2]}. (b) Divide this number by ${b}.`;
            return F(`l3-7-3-D${i + 1}`, `<div class="wp-text"><div class="wp-en">${en}</div><div class="wp-zh">(a) 用 ${digits.join('、')} 组最${big ? '大' : '小'}的三位${odd ? '奇' : '偶'}数。(b) 把这个数除以 ${b}。</div></div>`, r ? `(a) {{n}}\n(b) {{q}} R {{r}}` : `(a) {{n}}\n(b) {{q}}`, r ? { n: num(n), q: num(q), r: num(r) } : { n: num(n), q: num(q) }, ['l3formdiv', { digits, big, odd, b }], '先组数，再除', en, { label: `${n} ÷ ${b} = ${q}${r ? ' R ' + r : ''}`, hint: { zh: `${odd ? '奇' : '偶'}数个位是${odd ? '1、3、5、7、9' : '0、2、4、6、8'}，先定个位再排其他位；然后短除。`, en: 'Fix the ones digit first, then divide.' } }); }) },
      ],
    },
  ];
})();
