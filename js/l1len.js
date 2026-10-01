/* Level 1：长度（Unit 9）讲解；通用图解步骤 l1pic；题型 sizepick（选更高/更矮的） */
(function () {
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '"': '&quot;', '>': '&gt;' }[c]));
  const line = t => `<div class="expand-line">${t}</div>`;
  const L = window.L1;
  const wrap = (...parts) => `<div class="l1wrap">${parts.join('')}</div>`;
  const img = (name, w) => `<img class="figimg" src="img/${name}.png" alt="" style="max-width:${w || 420}px">`;
  const S = window.StepKinds;
  /* l1pic：通用图解 {pic, w, steps:[{zh, en, line?}]} */
  S.l1pic = ({ pic, w, steps }) => steps.map(st => ({ zh: st.zh, en: st.en, render: s => { s.innerHTML = wrap(pic ? `<div class="center">${img(pic, w)}</div>` : '', st.line ? line(st.line) : ''); } }));
  /* l1len2：两个比较 {pic, a, b, word, zh} */
  S.l1len2 = ({ pic, a, b, word, w }) => {
    const Z = { taller: '高', shorter: word === 'shorter' ? '矮/短' : '', longer: '长' };
    return [
      { zh: `比较<b>长短 / 高矮</b>要看两头：把它们的底端（或一头）对齐，看另一头谁露出来多。`, en: 'Line up one end and compare the other end.', render: s => { s.innerHTML = wrap(`<div class="center">${img(pic, w)}</div>`); } },
      { zh: `<b>${esc(a)}</b> 比 ${esc(b)} ${word === 'taller' ? '高' : word === 'longer' ? '长' : '矮（短）'}：${esc(a)} is <b>${word}</b> than ${esc(b)}。`, en: `${a} is ${word} than ${b}.`, render: s => { s.innerHTML = wrap(`<div class="center">${img(pic, w)}</div>`, line(`${esc(a)} is ${word} than ${esc(b)}`)); } },
      { zh: `反过来说也对：${esc(b)} is <b>${word === 'taller' ? 'shorter' : word === 'longer' ? 'shorter' : (word === 'shorter' ? 'taller / longer' : word)}</b> than ${esc(a)}。`, en: `${b} is ${word === 'shorter' ? 'taller or longer' : 'shorter'} than ${a}.`, render: s => { s.innerHTML = wrap(line(`${esc(b)} is ${word === 'shorter' ? 'taller / longer' : 'shorter'} than ${esc(a)}`)); } },
    ];
  };
  /* l1len3：多个比较 {pic, order:[names from tallest/longest], kind:'tall'|'long', w} */
  S.l1len3 = ({ pic, order, kind, w }) => {
    const est = kind === 'tall' ? 'tallest' : 'longest', zh1 = kind === 'tall' ? '最高' : '最长';
    return [
      { zh: `有 ${order.length} 个，先找<b>${zh1}（${est}）</b>的和<b>最短（shortest）</b>的。`, en: `Find the ${est} and the shortest.`, render: s => { s.innerHTML = wrap(`<div class="center">${img(pic, w)}</div>`); } },
      { zh: `${zh1}：<b>${esc(order[0])}</b>。最短：<b>${esc(order[order.length - 1])}</b>。`, en: `${est}: ${order[0]}. Shortest: ${order[order.length - 1]}.`, render: s => { s.innerHTML = wrap(`<div class="center">${img(pic, w)}</div>`, line(`${est}: ${esc(order[0])}　shortest: ${esc(order[order.length - 1])}`)); } },
      { zh: `从${zh1}到最短排一排：<b>${order.map(esc).join(' › ')}</b>。两两比：前面的比后面的${kind === 'tall' ? '高' : '长'}。`, en: order.join(' > '), render: s => { s.innerHTML = wrap(line(order.map(esc).join(' › '))); } },
    ];
  };
  /* l1startline：起跑线 {pic, w, est, shortest, kind} */
  S.l1startline = ({ pic, w, est, shortest, kind }) => [
    { zh: `它们都从同一条<b>起跑线（start line）</b>开始，所以只要看另一头谁最远。`, en: 'They start from the same line, so compare the other end.', render: s => { s.innerHTML = wrap(`<div class="center">${img(pic, w)}</div>`); } },
    { zh: `离起跑线最远的是 <b>${est}</b>，它${kind === 'tall' ? '最高（tallest）' : '最长（longest）'}；最近的是 <b>${shortest}</b>，最短（shortest）。`, en: `${est} is the ${kind === 'tall' ? 'tallest' : 'longest'}. ${shortest} is the shortest.`, render: s => { s.innerHTML = wrap(`<div class="center">${img(pic, w)}</div>`, line(`${kind === 'tall' ? 'tallest' : 'longest'}: ${est}　shortest: ${shortest}`)); } },
  ];
  /* l1measure：用物品量 {pic, w, items:[{name, n}]} */
  S.l1measure = ({ pic, w, items }) => {
    const steps = [{ zh: `用小东西一个挨一个排在旁边，<b>不能有空隙、不能重叠</b>，数有几个。`, en: 'Lay the objects end to end with no gaps. Count them.', render: s => { s.innerHTML = wrap(`<div class="center">${img(pic, w)}</div>`); } }];
    items.forEach(it => steps.push({ zh: `数 ${esc(it.name)}：1、2……<b>${it.n}</b>。大约 <b>${it.n}</b> 个 ${esc(it.name)} 长。${items.length > 1 ? '东西越小，用的个数越多。' : ''}`, en: `About ${it.n} ${it.name} long.`, render: s => { s.innerHTML = wrap(`<div class="center">${img(pic, w)}</div>`, line(`about ${it.n} ${esc(it.name)} long`)); } }));
    return steps;
  };
  /* l1units：数格子 {pic, w, lines:[text]} */
  S.l1units = ({ pic, w, lines }) => [
    { zh: `每一格（或每一个小东西）算 <b>1 unit</b>。从一头数到另一头。`, en: 'Each square is 1 unit. Count from end to end.', render: s => { s.innerHTML = wrap(`<div class="center">${img(pic, w)}</div>`); } },
    ...lines.map(t => ({ zh: t.zh, en: t.en, render: s => { s.innerHTML = wrap(`<div class="center">${img(pic, w)}</div>`, line(t.line)); } })),
  ];

  /* 题型 sizepick：同一张图两种大小，选更高/更矮 q = {id, type:'sizepick', pic, want:'taller'|'shorter'|'longer', name} */
  window.QTypes.sizepick = q => {
    const bigFirst = Math.random() < 0.5;   // 固定在构造时
    const opts = bigFirst ? ['big', 'small'] : ['small', 'big'];
    const wantBig = q.want !== 'shorter';
    const answer = opts.indexOf(wantBig ? 'big' : 'small');
    const html = () => `<div class="pick-opts">${opts.map((o, i) => `<button type="button" class="choice pick-opt" data-val="${i}" data-i="${i}"><span class="key">${i + 1}</span><span class="sizeimg ${o}">${img(q.pic, 220)}</span></button>`).join('')}</div>`;
    const opt = (box, i) => box.querySelector(`.pick-opt[data-i="${i}"]`);
    return {
      prompt: q.prompt || { zh: `哪一个是<b>${q.want === 'taller' ? '更高' : q.want === 'longer' ? '更长' : '更矮 / 更短'}</b>的 ${esc(q.name)}？点它`, en: `Which is the ${q.want} ${q.name}?` }, stage: `<div class="center sub">原来的 ${esc(q.name)}：</div><div class="center">${img(q.pic, 200)}</div>`,
      choices: ['0', '1'],
      custom: { html, bind() { }, value: () => null,
        markWrong: (box, val) => { const b = opt(box, val); if (b) { b.classList.add('wrong'); b.disabled = true; } },
        showAnswer: box => { opt(box, answer).classList.add('right'); box.querySelectorAll('.pick-opt').forEach(b => b.disabled = true); },
        lock: box => { opt(box, answer).classList.add('right'); box.querySelectorAll('.pick-opt').forEach(b => b.disabled = true); },
        restore: (box, val, status) => { if (status === 'bad' && val !== undefined) { const b = opt(box, val); if (b) b.classList.add('wrong'); } opt(box, answer).classList.add('right'); box.querySelectorAll('.pick-opt').forEach(b => b.disabled = true); } },
      hint: { zh: q.want === 'shorter' ? '更矮/更短就是比原来小的那个。' : '更高/更长就是比原来大的那个。', en: 'Compare with the original.' },
      answerText: `第 ${answer + 1} 个（${q.want}）`, check: v => String(v) === String(answer), answerDisplay: v => `第 ${parseInt(v, 10) + 1} 个`,
      explainKind: 'l1pic', n: { pic: q.pic, w: 220, steps: [{ zh: `“${q.want}” 就是${q.want === 'shorter' ? '更矮、更短' : q.want === 'taller' ? '更高' : '更长'}。画的时候要比原来的${q.want === 'shorter' ? '小一点' : '大一点'}。`, en: `Draw a ${q.want} one.`, line: q.want }] },
    };
  };
})();
