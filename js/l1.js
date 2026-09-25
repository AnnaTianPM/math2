/* Level 1 通用：十格图、一一对应、点子图、讲解动画；题型 stamp（画/放东西）、match（连线）、pickmany（多选） */
(function () {
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '"': '&quot;', '>': '&gt;' }[c]));
  const line = t => `<div class="expand-line">${t}</div>`;
  const WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'];
  const word = n => WORDS[n];
  const img = (name, w) => `<img class="figimg" src="img/${name}.png" alt="" ${w ? `style="max-width:${w}px"` : ''}>`;

  /* 十格图：2 行 5 格，前 n 格放 icon。o.nums = 标 1..k 的编号；o.hl = 高亮下标 */
  function frame(icon, n, o = {}) {
    const cells = [];
    for (let i = 0; i < 10; i++) cells.push(`<span class="tf-cell ${i < n ? 'on' : ''} ${o.hl === i ? 'hl' : ''}">${i < n ? `<span class="tf-ico">${icon}</span>` : ''}${o.nums !== undefined && i < o.nums && i < n ? `<b class="tf-num">${i + 1}</b>` : ''}</span>`);
    return `<span class="tf ${o.cls || ''}">${cells.join('')}</span>`;
  }
  /* 一排：n 个 icon，o.nums 编号，o.hl 高亮下标数组，o.dim 其余变淡 */
  function row(icon, n, o = {}) {
    const hl = new Set(o.hl || []);
    return `<span class="l1row ${o.cls || ''}">${Array.from({ length: n }, (_, i) => `<span class="l1item ${hl.has(i) ? 'hl' : ''} ${o.dim && !hl.has(i) ? 'dim' : ''} ${o.gone && o.gone.includes(i) ? 'gone' : ''}">${icon}${o.nums !== undefined && i < o.nums ? `<b class="tf-num">${i + 1}</b>` : ''}</span>`).join('')}</span>`;
  }
  const dots = (n, o = {}) => `<span class="l1dots ${o.cls || ''}">${Array.from({ length: n }, (_, i) => `<span class="dot ${o.hl !== undefined && i >= o.hl ? 'x' : ''}"></span>`).join('')}</span>`;
  /* 一一对应：上下两排，中间虚线连 min(a,b) 对。o.lines=false 不画线；o.count 标数量 */
  function pair(a, b, o = {}) {
    const m = Math.max(a.n, b.n), k = Math.min(a.n, b.n);
    const cols = Array.from({ length: m }, (_, i) => `<span class="pair-col"><span class="pair-top">${i < a.n ? a.icon : ''}</span><span class="pair-line ${o.lines === false || i >= k ? 'none' : ''}"></span><span class="pair-bot">${i < b.n ? b.icon : ''}</span></span>`).join('');
    return `<div class="pair"><div class="pair-lab"><span>${esc(a.label)}${o.count ? ` <b>${a.n}</b>` : ''}</span><span>${esc(b.label)}${o.count ? ` <b>${b.n}</b>` : ''}</span></div><div class="pair-cols">${cols}</div></div>`;
  }
  const big = (n, cls) => `<span class="bignum ${cls || ''}">${n}</span>`;

  const S = window.StepKinds;
  /* l1count：数一数 {icon, n, frame?, pic?, noun} */
  S.l1count = ({ icon, n, frame: fr, pic, noun }) => {
    const draw = k => pic ? `<div class="center">${img(pic, 420)}</div><div class="center mt">${row(icon, n, { nums: k })}</div>` : `<div class="center">${fr ? frame(icon, n, { nums: k }) : row(icon, n, { nums: k })}</div>`;
    const steps = [{ zh: pic ? `在图里找一找 <b>${esc(noun || '')}</b> ${icon}，一个一个数。` : `一个一个数，指着数：不要漏掉，也不要数两次。`, en: pic ? `Find the ${noun || ''} in the picture and count.` : 'Point and count one by one.', render: s => { s.innerHTML = '<div class="l1wrap">' + (draw(0)) + '</div>'; } }];
    steps.push({ zh: `数：${Array.from({ length: n }, (_, i) => i + 1).join('、')}。最后数到的数就是一共有几个。`, en: `Count: ${Array.from({ length: n }, (_, i) => i + 1).join(', ')}.`, render: s => { s.innerHTML = '<div class="l1wrap">' + (draw(n)) + '</div>'; } });
    steps.push({ zh: `一共有 <b>${n}</b> 个${noun ? '（' + esc(noun) + '）' : ''}。写 <b>${n}</b>。`, en: `There are ${n}. Write ${n}.`, render: s => { s.innerHTML = '<div class="l1wrap">' + (draw(n) + line(`${n}`)) + '</div>'; } });
    return steps;
  };
  /* l1words：数字 ↔ 英文 {n, icon} */
  S.l1words = ({ n, icon }) => [
    { zh: `先数一数有几个：<b>${n}</b>。`, en: `Count: ${n}.`, render: s => { s.innerHTML = '<div class="l1wrap">' + (`<div class="center">${row(icon || '🔵', n, { nums: n })}</div>`) + '</div>'; } },
    { zh: `${n} 的英文是 <b>${word(n)}</b>。数字和单词是一对：<b>${n} = ${word(n)}</b>。`, en: `${n} in words is ${word(n)}.`, render: s => { s.innerHTML = '<div class="l1wrap">' + (`<div class="center">${row(icon || '🔵', n)}</div>` + line(`${n} &nbsp;=&nbsp; ${word(n)}`)) + '</div>'; } },
    { zh: `记住 1 到 10：${Array.from({ length: 10 }, (_, i) => `${i + 1} ${word(i + 1)}`).join('，')}。`, en: 'Remember the words from one to ten.', render: s => { s.innerHTML = '<div class="l1wrap">' + (`<div class="wordtab">${Array.from({ length: 11 }, (_, i) => `<span class="${i === n ? 'hl' : ''}"><b>${i}</b>${word(i)}</span>`).join('')}</div>`) + '</div>'; } },
  ];
  /* l1stamp：按数字画 {n, icon, scene} */
  S.l1stamp = ({ n, icon, scene, sentence }) => [
    { zh: `读一读：${sentence ? esc(sentence.replace(/\.$/, '')) : `要画 <b>${n}</b> 个 ${icon}`}。要画的数字是 <b>${n}</b>。`, en: `We need ${n} ${icon}.`, render: s => { s.innerHTML = '<div class="l1wrap">' + (`<div class="center stamp-scene">${scene || ''}</div>`) + '</div>'; } },
    { zh: `一边画一边数：${Array.from({ length: n }, (_, i) => i + 1).join('、')}。数到 ${n} 就停。`, en: `Draw and count: 1 to ${n}.`, render: s => { s.innerHTML = '<div class="l1wrap">' + (`<div class="center stamp-scene">${scene || ''}${row(icon, n, { nums: n })}</div>`) + '</div>'; } },
    { zh: `画好了，正好 <b>${n}</b> 个 ${icon}。再数一遍检查。`, en: `${n} ${icon}. Count again to check.`, render: s => { s.innerHTML = '<div class="l1wrap">' + (`<div class="center stamp-scene">${scene || ''}${row(icon, n)}</div>` + line(`${n}`)) + '</div>'; } },
  ];
  /* l1match：单词找数字 {w} */
  S.l1match = ({ n }) => [
    { zh: `看单词 <b>${word(n)}</b>。想一想它是几？可以数点点：`, en: `Read "${word(n)}". Which number is it?`, render: s => { s.innerHTML = '<div class="l1wrap">' + (line(word(n)) + `<div class="center">${dots(n)}</div>`) + '</div>'; } },
    { zh: `${word(n)} 就是 <b>${n}</b>，把它们连起来。`, en: `${word(n)} is ${n}. Match them.`, render: s => { s.innerHTML = '<div class="l1wrap">' + (`<div class="center matchdemo"><span class="mkey">${word(n)}</span><span class="mline"></span><span class="mcar">${n}</span></div>`) + '</div>'; } },
  ];
  /* l1compare：一一对应比较 {a:{label,icon,n}, b:{...}} */
  S.l1compare = ({ a, b }) => {
    const rel = a.n === b.n ? 'same' : a.n > b.n ? 'more' : 'fewer';
    const relEn = rel === 'same' ? 'the same as' : rel === 'more' ? 'more than' : 'fewer than';
    const relZh = rel === 'same' ? '一样多' : rel === 'more' ? '多' : '少';
    const moreOne = a.n >= b.n ? a : b, lessOne = a.n >= b.n ? b : a;
    return [
      { zh: `把 ${esc(a.label)} 和 ${esc(b.label)} <b>一个对一个</b>连起来。`, en: `Match one ${a.label} to one ${b.label}.`, render: s => { s.innerHTML = '<div class="l1wrap">' + (pair(a, b)) + '</div>'; } },
      { zh: `数一数：${esc(a.label)} 有 <b>${a.n}</b> 个，${esc(b.label)} 有 <b>${b.n}</b> 个。${rel === 'same' ? '每个都有对子，没有多出来的。' : `${esc(moreOne.label)} 多出来 ${moreOne.n - lessOne.n} 个没有对子。`}`, en: `${a.label}: ${a.n}. ${b.label}: ${b.n}.`, render: s => { s.innerHTML = '<div class="l1wrap">' + (pair(a, b, { count: true })) + '</div>'; } },
      { zh: `所以 ${esc(a.label)} 比 ${esc(b.label)} <b>${relZh}</b>：The number of ${esc(a.label)} is <b>${relEn}</b> the number of ${esc(b.label)}.${rel !== 'same' ? `<br>也可以说：There are <b>more</b> ${esc(moreOne.label)} than ${esc(lessOne.label)}，There are <b>fewer</b> ${esc(lessOne.label)} than ${esc(moreOne.label)}。` : ''}`, en: `${a.label} is ${relEn} ${b.label}.`, render: s => { s.innerHTML = '<div class="l1wrap">' + (pair(a, b, { count: true }) + line(rel === 'same' ? `${a.n} = ${b.n}` : `${moreOne.n} > ${lessOne.n}`)) + '</div>'; } },
    ];
  };
  /* l1greater：比大小 {a, b, which:'greater'|'smaller'} */
  S.l1greater = ({ a, b, which }) => {
    const win = which === 'greater' ? Math.max(a, b) : Math.min(a, b), lose = win === a ? b : a;
    const draw = hl => `<div class="cmp-dots"><div class="${hl && win === a ? 'hl' : ''}">${big(a)} ${dots(a)}</div><div class="${hl && win === b ? 'hl' : ''}">${big(b)} ${dots(b)}</div></div>`;
    return [
      { zh: `把两个数都画成点点：${a} 画 ${a} 个，${b} 画 ${b} 个。`, en: `Draw ${a} dots and ${b} dots.`, render: s => { s.innerHTML = '<div class="l1wrap">' + (draw(false)) + '</div>'; } },
      { zh: `比一比哪排长：${Math.max(a, b)} 那排更长，所以 ${Math.max(a, b)} 大，${Math.min(a, b)} 小。`, en: `${Math.max(a, b)} is greater. ${Math.min(a, b)} is smaller.`, render: s => { s.innerHTML = '<div class="l1wrap">' + (draw(false) + line(`${Math.max(a, b)} &gt; ${Math.min(a, b)}`)) + '</div>'; } },
      { zh: `题目要${which === 'greater' ? '大的（greater）' : '小的（smaller）'}：<b>${win}</b>。${win} is ${which === 'greater' ? 'greater' : 'smaller'} than ${lose}.`, en: `${win} is ${which} than ${lose}.`, render: s => { s.innerHTML = '<div class="l1wrap">' + (draw(true) + line(`${win} is ${which} than ${lose}`)) + '</div>'; } },
    ];
  };
  /* l1moreless：多 1 / 少 1 {n, delta} 求 n+delta */
  S.l1moreless = ({ n, delta }) => {
    const ans = n + delta, more = delta > 0;
    return [
      { zh: `先画 <b>${n}</b> 个圈。`, en: `Draw ${n} circles.`, render: s => { s.innerHTML = '<div class="l1wrap">' + (`<div class="center">${row('⭕', n, { nums: n })}</div>`) + '</div>'; } },
      { zh: more ? `“1 more” 就是<b>再多 1 个</b>：再画 1 个。` : `“1 less” 就是<b>少 1 个</b>：划掉 1 个。`, en: more ? '1 more: draw one more.' : '1 less: take one away.', render: s => { s.innerHTML = '<div class="l1wrap">' + (`<div class="center">${more ? row('⭕', n + 1, { hl: [n] }) : row('⭕', n, { gone: [n - 1] })}</div>`) + '</div>'; } },
      { zh: `再数一数：<b>${ans}</b>。所以 1 ${more ? 'more' : 'less'} than ${n} is <b>${ans}</b>，也就是 ${ans} is 1 ${more ? 'more' : 'less'} than ${n}。`, en: `1 ${more ? 'more' : 'less'} than ${n} is ${ans}.`, render: s => { s.innerHTML = '<div class="l1wrap">' + (`<div class="center">${row('⭕', ans, { nums: ans })}</div>` + line(`${n} ${more ? '+' : '−'} 1 = ${ans}`)) + '</div>'; } },
    ];
  };
  /* l1same：找数量一样的 {items:[{label, icon, n}], pic} */
  S.l1same = ({ items, pic }) => {
    const cnt = {}; items.forEach(it => { (cnt[it.n] = cnt[it.n] || []).push(it); });
    const same = Object.values(cnt).find(g => g.length > 1) || [];
    const draw = hl => `<div class="center">${pic ? img(pic, 260) : ''}</div><div class="vol-list center-list">${items.map(it => `<div class="vol-item ${hl && same.includes(it) ? 'hl' : ''}"><span class="vol-name">${it.icon} ${esc(it.label)}</span>${dots(it.n)}<b class="cups-cnt">${it.n}</b></div>`).join('')}</div>`;
    return [
      { zh: `一种一种数，数完一种做个记号：${items.map(it => `${it.icon} ${it.n}`).join('，')}。`, en: items.map(it => `${it.label} ${it.n}`).join(', '), render: s => { s.innerHTML = '<div class="l1wrap">' + (draw(false)) + '</div>'; } },
      { zh: `找数量<b>一样</b>的：${same.map(it => `${it.icon} ${esc(it.label)}`).join(' 和 ')} 都是 <b>${same[0] ? same[0].n : ''}</b>。把它们圈起来。`, en: `${same.map(it => it.label).join(' and ')} have the same number: ${same[0] ? same[0].n : ''}.`, render: s => { s.innerHTML = '<div class="l1wrap">' + (draw(true) + line(same.map(it => it.icon).join(' = '))) + '</div>'; } },
    ];
  };
  /* l1path：数字和单词接龙 */
  S.l1path = () => [
    { zh: `从学校（1）走到图书馆（10），每一步数字大 1。每个圈上面是数字，下面是英文。`, en: 'Count on from 1 to 10. Numeral on top, word below.', render: s => { s.innerHTML = '<div class="l1wrap">' + (`<div class="wordtab">${Array.from({ length: 10 }, (_, i) => `<span><b>${i + 1}</b>${word(i + 1)}</span>`).join('')}</div>`) + '</div>'; } },
    { zh: `看到数字就写它的英文，看到英文就写数字。一共走了 <b>10</b> 步。`, en: 'Write the missing numeral or word. 10 steps in all.', render: s => { s.innerHTML = '<div class="l1wrap">' + (`<div class="wordtab">${Array.from({ length: 10 }, (_, i) => `<span class="hl"><b>${i + 1}</b>${word(i + 1)}</span>`).join('')}</div>` + line('10 steps')) + '</div>'; } },
  ];

  /* ---------- 题型 stamp：点按钮放东西 q = {id, type:'stamp', n, icon, scene(html), sentence:{en,zh}} ---------- */
  window.QTypes.stamp = q => {
    let k = 0;
    const html = () => `<div class="stamp"><div class="wp-text"><div class="wp-en">${esc(q.sentence.en)}</div><div class="wp-zh">${esc(q.sentence.zh)}</div></div>
      <div class="stamp-scene">${q.scene || ''}<span class="l1row" id="stampRow"></span></div>
      <div class="center sub mt">👇 点“放一个”画出正确的数量</div>
      <div class="center mt"><button type="button" class="btn accent big" id="stampAdd">放一个 ${q.icon}</button> <button type="button" class="btn secondary" id="stampRm">拿走一个</button> <button type="button" class="btn secondary small" id="clearAll">清空</button> <button class="btn ok" id="submit">检查 ✔</button></div></div>`;
    function refresh(box) { box.querySelector('#stampRow').innerHTML = Array.from({ length: k }, () => `<span class="l1item pop">${q.icon}</span>`).join(''); }
    function bind(box, submit) {
      k = 0; refresh(box);
      box.querySelector('#stampAdd').onclick = () => { if (box.dataset.locked) return; if (k < 12) k++; refresh(box); };
      box.querySelector('#stampRm').onclick = () => { if (box.dataset.locked) return; if (k > 0) k--; refresh(box); };
      box.querySelector('#clearAll').onclick = () => { if (box.dataset.locked) return; k = 0; refresh(box); };
      box.querySelector('#submit').onclick = () => submit();
    }
    const value = () => k === 0 ? null : String(k);
    const check = v => parseInt(v, 10) === q.n;
    function markWrong(box, v) { k = parseInt(v, 10) || 0; refresh(box); box.querySelector('#stampRow').classList.add('badrow'); }
    function lock(box) { box.dataset.locked = '1'; box.querySelectorAll('#stampAdd, #stampRm, #clearAll, #submit').forEach(b => b.disabled = true); }
    function showAnswer(box) { k = q.n; refresh(box); box.querySelector('#stampRow').classList.remove('badrow'); box.querySelector('#stampRow').classList.add('goodrow'); lock(box); }
    function restore(box, v, status) { k = parseInt(v, 10) || 0; refresh(box); box.querySelector('#stampRow').classList.add(status === 'bad' ? 'badrow' : 'goodrow'); lock(box); }
    return {
      prompt: q.prompt || { zh: '读一读句子，放上正确的数量', en: 'Read and show the correct number.' }, stage: '',
      custom: { html, bind, value, markWrong, showAnswer, lock, restore },
      hint: { zh: `句子里的数字是 ${q.n}，一边放一边数，数到 ${q.n} 就停。`, en: `The number is ${q.n}. Count as you place.` },
      answerText: `${q.n} ${q.icon}`, check, answerDisplay: v => `${v} ${q.icon}`,
      explainKind: 'l1stamp', n: { n: q.n, icon: q.icon, scene: q.scene, sentence: q.sentence.en },
    };
  };

  /* ---------- 题型 match：连线 q = {id, type:'match', left:[{id,html}], right:[{id,html}], pairs:{leftId:rightId}} ---------- */
  window.QTypes.match = q => {
    let pairs = {}, sel = null;
    const COLORS = ['#6c5ce7', '#ff9f43', '#2ecc71', '#e84393', '#00b894', '#fd79a8', '#0984e3', '#e17055', '#6ab04c', '#8e44ad'];
    const html = () => `<div class="match"><div class="center sub">👇 先点左边的一个，再点右边和它配对的那个</div><div class="match-cols"><div class="match-col" id="mL">${q.left.map(it => `<button type="button" class="mitem" data-side="L" data-id="${esc(it.id)}">${it.html}</button>`).join('')}</div><div class="match-col" id="mR">${q.right.map(it => `<button type="button" class="mitem" data-side="R" data-id="${esc(it.id)}">${it.html}</button>`).join('')}</div></div>
      <div class="center mt"><button type="button" class="btn secondary small" id="clearAll">清空</button> <button class="btn ok" id="submit">检查 ✔</button></div></div>`;
    function refresh(box, marks) {
      const order = Object.keys(pairs);
      box.querySelectorAll('.mitem').forEach(b => {
        const id = b.dataset.id, side = b.dataset.side; b.classList.remove('sel', 'paired', 'right', 'wrong'); b.style.borderColor = ''; b.querySelector('.mchip')?.remove();
        const lid = side === 'L' ? id : order.find(l => pairs[l] === id);
        if (lid !== undefined && pairs[lid] !== undefined) { const c = COLORS[order.indexOf(lid) % COLORS.length]; b.classList.add('paired'); b.style.borderColor = c; b.insertAdjacentHTML('beforeend', `<span class="mchip" style="background:${c}">${order.indexOf(lid) + 1}</span>`); if (marks) b.classList.add(marks[lid] ? 'right' : 'wrong'); }
        if (sel && sel === id && side === 'L') b.classList.add('sel');
      });
    }
    function bind(box, submit) {
      pairs = {}; sel = null; refresh(box);
      box.querySelectorAll('.mitem').forEach(b => b.onclick = () => {
        if (box.dataset.locked) return;
        const id = b.dataset.id, side = b.dataset.side;
        if (side === 'L') { if (pairs[id] !== undefined) delete pairs[id]; sel = sel === id ? null : id; }
        else { const owner = Object.keys(pairs).find(l => pairs[l] === id); if (owner) delete pairs[owner]; if (sel) { pairs[sel] = id; sel = null; } }
        refresh(box);
      });
      box.querySelector('#clearAll').onclick = () => { if (box.dataset.locked) return; pairs = {}; sel = null; refresh(box); };
      box.querySelector('#submit').onclick = () => submit();
    }
    const value = () => Object.keys(pairs).length ? JSON.stringify(pairs) : null;
    const okPair = (l, r) => q.pairs[l] === r;
    const check = v => { try { const p = JSON.parse(v); return q.left.every(it => okPair(it.id, p[it.id])); } catch (e) { return false; } };
    function markWrong(box, v) { pairs = JSON.parse(v); const marks = {}; Object.keys(pairs).forEach(l => { marks[l] = okPair(l, pairs[l]); }); refresh(box, marks); box.querySelectorAll('.mitem[data-side="L"]').forEach(b => { if (pairs[b.dataset.id] === undefined) b.classList.add('wrong'); }); }
    function lock(box) { box.dataset.locked = '1'; box.querySelectorAll('#clearAll, #submit').forEach(b => b.disabled = true); }
    function showAnswer(box) { pairs = Object.assign({}, q.pairs); const marks = {}; Object.keys(pairs).forEach(l => { marks[l] = true; }); refresh(box, marks); lock(box); }
    function restore(box, v) { try { pairs = JSON.parse(v || '{}'); } catch (e) { pairs = {}; } const marks = {}; Object.keys(pairs).forEach(l => { marks[l] = okPair(l, pairs[l]); }); refresh(box, marks); lock(box); }
    const nameOf = (list, id) => { const it = list.find(x => x.id === id); return it ? (it.text || it.id) : id; };
    return {
      prompt: q.prompt || { zh: '把左边和右边配对连起来', en: 'Match each one on the left to the correct one on the right.' }, stage: '',
      custom: { html, bind, value, markWrong, showAnswer, lock, restore },
      hint: q.hint || { zh: '不确定的先跳过，先连有把握的，剩下的再想。', en: 'Match the ones you are sure of first.' },
      answerText: q.left.map(it => `${nameOf(q.left, it.id)}→${nameOf(q.right, q.pairs[it.id])}`).join(', '), check,
      answerDisplay: v => { try { const p = JSON.parse(v); return Object.keys(p).map(l => `${nameOf(q.left, l)}→${nameOf(q.right, p[l])}`).join(', '); } catch (e) { return v; } },
      explainKind: q.explain ? q.explain[0] : 'l1match', n: q.explain ? q.explain[1] : { n: 1 },
    };
  };

  /* ---------- 题型 pickmany：多选 q = {id, type:'pickmany', pic, options:[{val, html}], answer:[vals], explain} ---------- */
  window.QTypes.pickmany = q => {
    let on = new Set();
    const html = () => `<div class="pickmany"><div class="center sub">👇 点选所有对的（可以选几个）</div><div class="pick-opts">${q.options.map(o => `<button type="button" class="choice pick-opt pm" data-val="${esc(o.val)}">${o.html}</button>`).join('')}</div>
      <div class="center mt"><button type="button" class="btn secondary small" id="clearAll">清空</button> <button class="btn ok" id="submit">检查 ✔</button></div></div>`;
    function refresh(box, marks) { box.querySelectorAll('.pm').forEach(b => { b.classList.toggle('sel', on.has(b.dataset.val)); if (marks) { const want = q.answer.includes(b.dataset.val); if (on.has(b.dataset.val)) b.classList.add(want ? 'right' : 'wrong'); else if (want && marks === 'all') b.classList.add('right'); } }); }
    function bind(box, submit) {
      on = new Set(); refresh(box);
      box.querySelectorAll('.pm').forEach(b => b.onclick = () => { if (box.dataset.locked) return; on.has(b.dataset.val) ? on.delete(b.dataset.val) : on.add(b.dataset.val); refresh(box); });
      box.querySelector('#clearAll').onclick = () => { if (box.dataset.locked) return; on = new Set(); refresh(box); };
      box.querySelector('#submit').onclick = () => submit();
    }
    const value = () => on.size ? JSON.stringify([...on]) : null;
    const check = v => { try { const a = JSON.parse(v); return a.length === q.answer.length && q.answer.every(x => a.includes(x)); } catch (e) { return false; } };
    function markWrong(box, v) { on = new Set(JSON.parse(v)); refresh(box, true); }
    function lock(box) { box.dataset.locked = '1'; box.querySelectorAll('#clearAll, #submit, .pm').forEach(b => b.disabled = true); }
    function showAnswer(box) { on = new Set(q.answer); refresh(box, 'all'); lock(box); }
    function restore(box, v) { try { on = new Set(JSON.parse(v || '[]')); } catch (e) { on = new Set(); } refresh(box, true); lock(box); }
    const label = val => { const o = q.options.find(x => x.val === val); return o ? (o.text || val) : val; };
    return {
      prompt: q.prompt, stage: q.pic || '',
      custom: { html, bind, value, markWrong, showAnswer, lock, restore },
      hint: q.hint || { zh: '每一种都数一数，把数量写在旁边，再找一样的。', en: 'Count each kind, then find the same numbers.' },
      answerText: q.answer.map(label).join(', '), check, answerDisplay: v => { try { return JSON.parse(v).map(label).join(', '); } catch (e) { return v; } },
      explainKind: q.explain[0], n: q.explain[1],
    };
  };

  window.L1 = { frame, row, dots, pair, big, img, word, WORDS };
})();
