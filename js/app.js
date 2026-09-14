/* Math Land 页面逻辑 */
(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const app = $('#app');
  const DATA = window.MATH_DATA;

  // ---------- 通用 ----------
  function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
  function findKP(id) {
    for (const u of DATA.units) for (const k of u.kps) if (k.id === id) return { unit: u, kp: k };
    return null;
  }
  const split = n => n === 1000 ? { h: 10, t: 0, o: 0 } : { h: Math.floor(n / 100), t: Math.floor(n / 10) % 10, o: n % 10 };

  // 朗读（浏览器自带，中文 + 英文）
  let autoSpeak = localStorage.getItem('mathland.autoSpeak') !== '0';
  function speak(zh, en) {
    if (!('speechSynthesis' in window)) return;
    speechSynthesis.cancel();
    const say = (text, lang, rate) => {
      if (!text) return;
      const u = new SpeechSynthesisUtterance(text.replace(/[→|]/g, ' '));
      u.lang = lang; u.rate = rate;
      speechSynthesis.speak(u);
    };
    say(zh, 'zh-CN', 0.95);
    say(en, 'en-US', 0.85);
  }

  function confetti() {
    const box = $('#confetti');
    const colors = ['#6c5ce7', '#ff9f43', '#2ecc71', '#ff6b6b', '#4a90e2', '#ffd166'];
    for (let i = 0; i < 50; i++) {
      const el = document.createElement('i');
      el.style.left = Math.random() * 100 + 'vw';
      el.style.background = colors[i % colors.length];
      el.style.animationDuration = (1.4 + Math.random() * 1.2) + 's';
      el.style.animationDelay = Math.random() * 0.4 + 's';
      box.appendChild(el);
      setTimeout(() => el.remove(), 3000);
    }
  }

  function updateWrongBadge() {
    const n = Store.wrongList().length;
    const b = $('#wrong-count');
    b.textContent = n; b.classList.toggle('zero', n === 0);
  }

  function setNav(name) {
    document.querySelectorAll('[data-nav]').forEach(a => a.classList.toggle('active', a.dataset.nav === name));
  }

  // 知识点星级：按课本练习完成情况
  function kpStars(kp) {
    let total = 0, done = 0, right = 0;
    (kp.sections || []).forEach(s => s.questions.forEach(q => {
      total++;
      const p = Store.getProgress(q.id);
      if (p) { done++; if (p.status === 'ok' || p.status === 'fixed') right++; }
    }));
    const stars = total ? Math.round(3 * right / total) : 0;
    return { total, done, right, stars };
  }
  function starsHTML(n) { return '⭐'.repeat(n) + `<span class="dim">${'⭐'.repeat(3 - n)}</span>`; }

  // ---------- 首页 ----------
  function renderHome() {
    setNav('home');
    const st = Store.stats();
    let html = `<h1>你好！今天想学什么？ <span class="en">What shall we learn today?</span></h1>
      <p class="sub">已经拿到 ${st.stars} 颗星星 ⭐ ｜ 答对 ${st.correct} 题</p>`;
    for (const u of DATA.units) {
      html += `<section class="unit"><div class="unit-head"><span class="unit-num">${u.num}</span><h2>${esc(u.title.zh)} <span class="en">${esc(u.title.en)}</span></h2></div>`;
      if (!u.kps.length) { html += `<div class="sub">即将推出 Coming soon</div></section>`; continue; }
      html += `<div class="kp-grid">`;
      for (const k of u.kps) {
        if (!k.available) {
          html += `<div class="kp-card soon"><div class="kp-title">${esc(k.title.zh)}</div><div class="kp-en">${esc(k.title.en)}</div><span class="soon-tag">即将推出</span></div>`;
          continue;
        }
        const s = kpStars(k);
        html += `<a class="kp-card" href="#/kp/${k.id}"><div class="kp-title">${esc(k.title.zh)}</div><div class="kp-en">${esc(k.title.en)}</div>
          <div class="stars">${starsHTML(s.stars)} <span class="sub">${s.done}/${s.total} 题</span></div></a>`;
      }
      html += `</div></section>`;
    }
    app.innerHTML = html;
  }

  // ---------- 知识点页 ----------
  function renderKP(kpId, mode, arg) {
    setNav('');
    const found = findKP(kpId);
    if (!found || !found.kp.available) { app.innerHTML = '<div class="card">还没有这个知识点哦。<a href="#/">回首页</a></div>'; return; }
    const { unit, kp } = found;
    mode = mode || 'learn';
    const tab = (m, label) => `<a class="btn ${mode === m ? '' : 'inactive'}" href="#/kp/${kp.id}/${m}">${label}</a>`;
    app.innerHTML = `
      <div class="crumb"><a href="#/">首页</a> › Unit ${unit.num} ${esc(unit.title.zh)}</div>
      <h1>${esc(kp.title.zh)} <span class="en">${esc(kp.title.en)}</span></h1>
      <div class="mode-tabs">${tab('learn', '📖 学一学 Learn')}${tab('practice', '✏️ 练一练 Practice')}${tab('infinite', '♾️ 无限练习 More')}</div>
      <div id="mode"></div>`;
    const box = $('#mode');
    if (mode === 'learn') renderLearn(kp, box, arg);
    else if (mode === 'practice') renderPracticeMenu(kp, box, arg);
    else renderInfiniteMenu(kp, box, arg);
  }

  // ---------- 学一学：分步讲解 ----------
  function renderLearn(kp, box, exIdx) {
    exIdx = parseInt(exIdx || 0, 10);
    const ex = kp.examples[exIdx];
    const chips = kp.examples.map((e, i) => `<a class="chip ${i === exIdx ? 'active' : ''}" href="#/kp/${kp.id}/learn/${i}">例题 ${i + 1}：${esc(e.title.zh)}</a>`).join('');
    box.innerHTML = `
      <div class="card"><div class="sub">${esc(kp.intro.zh)}<br><span class="en">${esc(kp.intro.en)}</span></div></div>
      <div class="example-nav">${chips}</div>
      <div class="card" id="stepper"></div>
      <div class="center mt"><a class="btn accent big" href="#/kp/${kp.id}/practice">我学会了，去练一练 ✏️</a></div>`;
    mountStepper($('#stepper'), buildSteps(ex.kind, ex.n), { title: `${esc(ex.title.zh)} <span class="en">${esc(ex.title.en)}</span>` });
  }

  /* 分步讲解引擎：steps = [{zh, en, render(stage)}]，render 可返回一个 cleanup 函数 */
  function mountStepper(el, steps, opts = {}) {
    let i = 0, cleanup = null;
    el.innerHTML = `
      <div class="row"><h2 class="grow">${opts.title || ''}</h2>
        <label class="sub"><input type="checkbox" id="autoSpeak" ${autoSpeak ? 'checked' : ''}> 自动朗读</label>
        <button class="speak" id="speakBtn" title="读一遍">🔊</button></div>
      <div class="stage" id="stage"></div>
      <div class="explain" id="explain"></div>
      <div class="stepbar">
        <button class="btn secondary" id="prev">◀ 上一步</button>
        <div class="dots" id="dots"></div>
        <button class="btn" id="next">下一步 ▶</button>
        <span class="grow"></span>
        ${opts.onClose ? '<button class="btn secondary" id="closeBtn">关闭 ✖</button>' : ''}
      </div>`;
    const stage = $('#stage', el), explain = $('#explain', el), dots = $('#dots', el);
    function show(k) {
      if (cleanup) { cleanup(); cleanup = null; }
      i = Math.max(0, Math.min(steps.length - 1, k));
      const s = steps[i];
      explain.innerHTML = `${s.zh}<span class="en">${s.en}</span>`;
      cleanup = s.render(stage) || null;
      dots.innerHTML = steps.map((_, j) => `<span class="dot ${j <= i ? 'on' : ''}"></span>`).join('');
      $('#prev', el).disabled = i === 0;
      $('#next', el).textContent = i === steps.length - 1 ? '完成 ✔' : '下一步 ▶';
      if (autoSpeak) speak(s.zh.replace(/<[^>]+>/g, ''), s.en.replace(/<[^>]+>/g, ''));
    }
    $('#prev', el).onclick = () => show(i - 1);
    $('#next', el).onclick = () => { if (i === steps.length - 1) { if (opts.onClose) opts.onClose(); else show(0); } else show(i + 1); };
    $('#speakBtn', el).onclick = () => speak(steps[i].zh.replace(/<[^>]+>/g, ''), steps[i].en.replace(/<[^>]+>/g, ''));
    $('#autoSpeak', el).onchange = e => { autoSpeak = e.target.checked; localStorage.setItem('mathland.autoSpeak', autoSpeak ? '1' : '0'); if (!autoSpeak) speechSynthesis.cancel(); };
    if (opts.onClose) $('#closeBtn', el).onclick = opts.onClose;
    show(0);
    return { destroy() { if (cleanup) cleanup(); speechSynthesis.cancel(); } };
  }

  // 位值表 HTML
  function pvTable(v, shown) {
    const cell = (k, val) => `<div class="val ${k} ${shown[k] ? '' : 'blank'}">${shown[k] ? val : '?'}</div>`;
    return `<div class="pv"><div class="head h">百 Hundreds</div><div class="head t">十 Tens</div><div class="head o">个 Ones</div>
      ${cell('h', v.h)}${cell('t', v.t)}${cell('o', v.o)}</div>`;
  }
  function bigNum(n, on = { h: 1, t: 1, o: 1 }) {
    const s = String(n);
    if (n === 1000) return `<div class="bignum"><span class="d h">1000</span></div>`;
    const [a, b, c] = s.padStart(3, '0').split('');
    const d = (k, ch) => `<span class="d ${k}" style="opacity:${on[k] ? 1 : .25}">${ch}</span>`;
    return `<div class="bignum">${d('h', a)}${d('t', b)}${d('o', c)}</div>`;
  }
  const cnt = (n, unit) => `${n} 个${unit}`;

  /* 根据题型和数字动态生成讲解步骤（例题和错题讲解共用） */
  function buildSteps(kind, n) {
    const v = split(n);
    const zhWords = NumWords.toZh(n), enWords = NumWords.toWords(n);
    if (kind === 'blocks') return blocksSteps(n, v, zhWords, enWords);
    if (kind === 'num2words') return num2wordsSteps(n, v, zhWords, enWords);
    return words2numSteps(n, v, zhWords, enWords);
  }

  function blocksSteps(n, v, zhWords, enWords) {
    const svg = Blocks.render(v);
    const shown = { h: 0, t: 0, o: 0 };
    // 逐个高亮并计数
    function countStep(kind, count, unitZh, unitEn, value) {
      return (stage) => {
        stage.innerHTML = `<div><div class="blocks">${svg}</div><div class="center counter" id="counter"></div>${pvTable(v, shown)}</div>`;
        const s = $('svg', stage), c = $('#counter', stage);
        Blocks.highlight(s, kind, 0, true);
        let k = 0;
        const timers = [];
        if (count === 0) { c.innerHTML = `<span style="color:${Blocks.colors[kind]}">一个都没有 → ${kind === 'h' ? '百位' : kind === 't' ? '十位' : '个位'}写 0</span>`; shown[kind] = 1; return; }
        const tick = () => {
          k++;
          Blocks.highlight(s, kind, k, true);
          c.innerHTML = `<span style="color:${Blocks.colors[kind]}">${k} ${unitZh}</span>`;
          if (k < count) timers.push(setTimeout(tick, 450));
          else {
            c.innerHTML = `<span style="color:${Blocks.colors[kind]}">${cnt(count, unitZh)} = ${value}</span>`;
            shown[kind] = 1;
            const t = $('.pv', stage); if (t) t.outerHTML = pvTable(v, shown);
          }
        };
        timers.push(setTimeout(tick, 400));
        return () => timers.forEach(clearTimeout);
      };
    }
    const steps = [
      { zh: '看，这里有一些方块。我们一起来数一数！', en: 'Look at the blocks. Let us count them together!',
        render: stage => { shown.h = shown.t = shown.o = 0; stage.innerHTML = `<div><div class="blocks">${svg}</div>${pvTable(v, shown)}</div>`; } },
      { zh: `先数<b style="color:${Blocks.colors.h}">百</b>。一大板有 100 个小格，就是 1 个百。`, en: 'First count the hundreds. One big square is 100.',
        render: countStep('h', v.h, '百', 'hundreds', v.h * 100) },
      { zh: `再数<b style="color:${Blocks.colors.t}">十</b>。一长条有 10 个小格，就是 1 个十。`, en: 'Next count the tens. One long strip is 10.',
        render: countStep('t', v.t, '十', 'tens', v.t * 10) },
      { zh: `最后数<b style="color:${Blocks.colors.o}">个</b>。一个小方块就是 1。`, en: 'Last count the ones. One small cube is 1.',
        render: countStep('o', v.o, '一', 'ones', v.o) },
      { zh: `合起来：${cnt(v.h, '百')} ${cnt(v.t, '十')} ${cnt(v.o, '一')}，写成 <b>${n}</b>，读作“${zhWords}”。`,
        en: `${v.h} hundreds ${v.t} tens ${v.o} ones = <b>${n}</b>, "${enWords}".`,
        render: stage => { shown.h = shown.t = shown.o = 1; stage.innerHTML = `<div class="center"><div class="blocks">${svg}</div>${pvTable(v, shown)}<div style="margin-top:10px">${bigNum(n)}</div></div>`; } },
    ];
    return steps;
  }

  function num2wordsSteps(n, v, zhWords, enWords) {
    const p = NumWords.parts(n);
    const r = n % 100;
    const chips = (on) => {
      if (n === 1000) return `<div class="wordsplit"><span class="h ${on.h ? 'on' : ''}">one thousand</span></div>`;
      let s = `<div class="wordsplit">`;
      if (p.h) s += `<span class="h ${on.h ? 'on' : ''}">${p.h}</span>`;
      if (p.h && p.rest) s += `<span class="and ${on.and ? 'on' : ''}">and</span>`;
      if (p.rest) s += `<span class="t ${on.r ? 'on' : ''}">${p.rest}</span>`;
      return s + '</div>';
    };
    const restZh = r === 0 ? '' : (r < 20 ? `${r} 是一个特别的词：<b>${p.rest}</b>` : `${Math.floor(r / 10) * 10} 是 <b>${NumWords.tens[Math.floor(r / 10)]}</b>${r % 10 ? `，${r % 10} 是 <b>${NumWords.ones[r % 10]}</b>，中间用小横线连起来：<b>${p.rest}</b>` : ''}`);
    const steps = [
      { zh: `把 <b>${n}</b> 分成百、十、个三部分。`, en: `Split ${n} into hundreds, tens and ones.`,
        render: stage => { stage.innerHTML = `<div class="center">${bigNum(n)}${pvTable(v, { h: 1, t: 1, o: 1 })}</div>`; } },
    ];
    if (n === 1000) {
      steps.push({ zh: '1000 有一个专门的词：<b>one thousand</b>（一千）。', en: '1000 is "one thousand".',
        render: stage => { stage.innerHTML = `<div class="center">${bigNum(n)}<div style="margin-top:14px">${chips({ h: 1 })}</div></div>`; } });
    } else {
      steps.push({ zh: `百位是 <b>${v.h}</b>，就说 <b>${p.h}</b>（${NumWords.ones[v.h]} = ${v.h}，hundred = 百）。`, en: `${v.h} in the hundreds place → "${p.h}".`,
        render: stage => { stage.innerHTML = `<div class="center">${bigNum(n, { h: 1 })}<div style="margin-top:14px">${chips({ h: 1 })}</div></div>`; } });
      if (r) {
        steps.push({ zh: `后面是 <b>${r}</b>：${restZh}。`, en: `Then ${r} → "${p.rest}".`,
          render: stage => { stage.innerHTML = `<div class="center">${bigNum(n, { t: 1, o: 1 })}<div style="margin-top:14px">${chips({ r: 1 })}</div></div>`; } });
        steps.push({ zh: `中间加一个 <b>and</b> 连起来：<b>${enWords}</b>。`, en: `Join them with "and": ${enWords}.`,
          render: stage => { stage.innerHTML = `<div class="center">${bigNum(n)}<div style="margin-top:14px">${chips({ h: 1, and: 1, r: 1 })}</div></div>`; } });
      } else {
        steps.push({ zh: `十位和个位都是 0，后面什么都不用写：<b>${enWords}</b>。`, en: `Tens and ones are 0, so just "${enWords}".`,
          render: stage => { stage.innerHTML = `<div class="center">${bigNum(n)}<div style="margin-top:14px">${chips({ h: 1 })}</div></div>`; } });
      }
    }
    steps.push({ zh: `记住这些单词，写的时候可以看一看。`, en: 'Here are the words you need. Look at them when you write.',
      render: stage => { stage.innerHTML = `<div class="center">${chips({ h: 1, and: 1, r: 1 })}${wordTable()}</div>`; } });
    return steps;
  }

  function wordTable() {
    const o = NumWords.ones, t = NumWords.tens;
    let a = '<table>', b = '<table>';
    for (let i = 1; i <= 10; i++) a += `<tr><td>${i}</td><td>${o[i]}</td><td>${i + 10}</td><td>${o[i + 10] || ''}</td></tr>`;
    a = a.replace('<td>20</td><td></td>', '<td>20</td><td>twenty</td>');
    for (let i = 2; i <= 9; i++) b += `<tr><td>${i * 10}</td><td>${t[i]}</td></tr>`;
    b += `<tr><td>100</td><td>one hundred</td></tr><tr><td>1000</td><td>one thousand</td></tr>`;
    return `<div class="wordtable">${a}</table>${b}</table></div>`;
  }

  function words2numSteps(n, v, zhWords, enWords) {
    const p = NumWords.parts(n);
    const r = n % 100;
    const chips = (on) => {
      if (n === 1000) return `<div class="wordsplit"><span class="h ${on.h ? 'on' : ''}">one thousand</span></div>`;
      let s = `<div class="wordsplit">`;
      if (p.h) s += `<span class="h ${on.h ? 'on' : ''}">${p.h}</span>`;
      if (p.h && p.rest) s += `<span class="and ${on.and ? 'on' : ''}">and</span>`;
      if (p.rest) {
        if (r < 20 || r % 10 === 0) s += `<span class="t ${on.r ? 'on' : ''}">${p.rest}</span>`;
        else { const [a, b] = p.rest.split('-'); s += `<span class="t ${on.r ? 'on' : ''}">${a}</span><span class="o ${on.r ? 'on' : ''}">${b}</span>`; }
      }
      return s + '</div>';
    };
    const stageHTML = (on, shown) => `<div class="center"><div style="margin-bottom:14px">${chips(on)}</div>${pvTable(v, shown)}</div>`;
    const steps = [
      { zh: `先读一读：<b>${enWords}</b>（${zhWords}）。`, en: `Read it: ${enWords}.`,
        render: stage => { stage.innerHTML = stageHTML({ h: 1, and: 1, r: 1 }, {}); } },
    ];
    if (n === 1000) {
      steps.push({ zh: '<b>one thousand</b> 就是 1000：10 个百，写成 1000。', en: '"one thousand" is 1000.',
        render: stage => { stage.innerHTML = stageHTML({ h: 1 }, { h: 1, t: 1, o: 1 }) + bigNum(n); } });
      return steps;
    }
    steps.push({ zh: `<b>${p.h}</b>：${NumWords.ones[v.h]} 是 ${v.h}，hundred 是百，所以百位写 <b>${v.h}</b>。`, en: `"${p.h}" → ${v.h} in the hundreds place.`,
      render: stage => { stage.innerHTML = stageHTML({ h: 1 }, { h: 1 }); } });
    if (r === 0) {
      steps.push({ zh: '后面没有别的词了，十位和个位都写 <b>0</b>。', en: 'Nothing else, so tens and ones are 0.',
        render: stage => { stage.innerHTML = stageHTML({ h: 1 }, { h: 1, t: 1, o: 1 }); } });
    } else if (r < 20) {
      steps.push({ zh: `<b>${p.rest}</b> 是 ${r}：十位写 <b>${v.t}</b>，个位写 <b>${v.o}</b>。`, en: `"${p.rest}" is ${r}: ${v.t} tens and ${v.o} ones.`,
        render: stage => { stage.innerHTML = stageHTML({ r: 1 }, { h: 1, t: 1, o: 1 }); } });
    } else {
      const tw = NumWords.tens[v.t];
      steps.push({ zh: `<b>${tw}</b> 是 ${v.t * 10}，就是 ${v.t} 个十，十位写 <b>${v.t}</b>。`, en: `"${tw}" is ${v.t * 10} → ${v.t} in the tens place.`,
        render: stage => { stage.innerHTML = stageHTML({ r: 1 }, { h: 1, t: 1 }); } });
      steps.push({ zh: v.o ? `<b>${NumWords.ones[v.o]}</b> 是 ${v.o}，个位写 <b>${v.o}</b>。` : '后面没有了，个位写 <b>0</b>。', en: v.o ? `"${NumWords.ones[v.o]}" → ${v.o} in the ones place.` : 'Nothing else, so ones is 0.',
        render: stage => { stage.innerHTML = stageHTML({ r: 1 }, { h: 1, t: 1, o: 1 }); } });
    }
    steps.push({ zh: `把三个数字连起来写：<b>${n}</b>。`, en: `Write the digits together: ${n}.`,
      render: stage => { stage.innerHTML = stageHTML({ h: 1, and: 1, r: 1 }, { h: 1, t: 1, o: 1 }) + bigNum(n); } });
    return steps;
  }

  // ---------- 练一练：菜单 ----------
  function sectionStats(sec) {
    let ok = 0, bad = 0, fixed = 0;
    sec.questions.forEach(q => { const p = Store.getProgress(q.id); if (p) { if (p.status === 'ok') ok++; else if (p.status === 'fixed') fixed++; else bad++; } });
    return { ok, bad, fixed, total: sec.questions.length };
  }
  function renderPracticeMenu(kp, box, secId) {
    if (secId) { const sec = kp.sections.find(s => s.id === secId); if (sec) return runSession(kp, box, { mode: 'book', section: sec, questions: sec.questions }); }
    box.innerHTML = kp.sections.map(s => {
      const st = sectionStats(s);
      const wrongs = s.questions.filter(q => (Store.getProgress(q.id) || {}).status === 'bad');
      return `<div class="card"><div class="row"><div class="grow"><h2>(${s.id}) ${esc(s.title.zh)} <span class="en">${esc(s.title.en)}</span></h2>
        <div class="sub">共 ${st.total} 题 ｜ ✅ ${st.ok} ｜ 🟡 改对 ${st.fixed} ｜ ❌ ${st.bad}</div></div>
        <a class="btn" href="#/kp/${kp.id}/practice/${s.id}">${st.ok + st.fixed + st.bad ? '继续做' : '开始'} ▶</a>
        ${wrongs.length ? `<button class="btn secondary" data-redo="${s.id}">只做错题 (${wrongs.length})</button>` : ''}</div></div>`;
    }).join('');
    box.querySelectorAll('[data-redo]').forEach(b => b.onclick = () => {
      const sec = kp.sections.find(s => s.id === b.dataset.redo);
      const qs = sec.questions.filter(q => (Store.getProgress(q.id) || {}).status === 'bad');
      runSession(kp, box, { mode: 'book', section: sec, questions: qs });
    });
  }

  function renderInfiniteMenu(kp, box, type) {
    const types = { blocks: ['看方块写数字', 'Blocks → number'], num2words: ['数字 → 英文', 'Number → words'], words2num: ['英文 → 数字', 'Words → number'] };
    if (type && types[type]) return runSession(kp, box, { mode: 'gen', genType: type });
    box.innerHTML = `<div class="card"><h2>想练哪一种？ <span class="en">Which type?</span></h2><p class="sub">题目是随机生成的，想做多少做多少。</p>
      <div class="row">${Object.entries(types).map(([k, [zh, en]]) => `<a class="btn" href="#/kp/${kp.id}/infinite/${k}">${zh} <span style="opacity:.8;font-size:14px">${en}</span></a>`).join('')}</div></div>`;
  }

  // ---------- 题目展示与判分 ----------
  function questionView(q) {
    if (q.type === 'blocks') return {
      prompt: { zh: '这是多少？', en: 'What number is this?' },
      stage: `<div class="blocks">${Blocks.render(q, { scale: 1.5 })}</div>`,
      inputType: 'number', label: '',
      hint: { zh: '先数一数有几个百（一大板是 100），再数几个十（一长条是 10），最后数几个一。', en: 'Count the hundreds first, then the tens, then the ones.' },
      answerText: String(q.answer),
      check: val => parseInt(val, 10) === q.answer,
      explainKind: 'blocks', n: q.answer,
    };
    if (q.type === 'num2words') return {
      prompt: { zh: '用英文单词写出这个数', en: 'Write this number in words' },
      stage: bigNum(q.n),
      inputType: 'text', label: '',
      hint: { zh: `先写百位：${NumWords.parts(q.n).h || 'one thousand'}${q.n % 100 ? '，然后 and，再写后面的数。小横线别忘了（如 twenty-one）。' : '，后面是 0 就不用写了。'}`, en: 'Hundreds first, then "and", then the rest. Remember the hyphen (twenty-one).' },
      answerText: NumWords.toWords(q.n),
      check: val => NumWords.wordsEqual(val, NumWords.toWords(q.n)),
      diagnose: val => { const m = NumWords.fromWords(val); return (m !== null && m !== q.n) ? { zh: `你写的是 ${m}，题目是 ${q.n} 哦。`, en: `You wrote ${m}, but the number is ${q.n}.` } : { zh: '检查一下拼写～', en: 'Check your spelling.' }; },
      explainKind: 'num2words', n: q.n,
    };
    return {
      prompt: { zh: '把英文单词写成数字', en: 'Write the number' },
      stage: `<div class="wordsplit"><span class="on" style="color:var(--primary-dark);font-size:30px">${NumWords.toWords(q.n)}</span></div>`,
      inputType: 'number', label: '',
      hint: { zh: `“${NumWords.parts(q.n).h || 'one thousand'}” 告诉你百位是几；后面的词告诉你十位和个位。`, en: 'The "hundred" word tells the hundreds digit; the rest tells the tens and ones.' },
      answerText: String(q.n),
      check: val => parseInt(val, 10) === q.n,
      explainKind: 'words2num', n: q.n,
    };
  }

  /* 练习会话：mode = book（课本题）| gen（无限）| redo（错题本重做） */
  function runSession(kp, box, cfg) {
    const state = { i: 0, attempts: 0, results: {}, streak: 0, best: 0, genSeq: 0, phase: 'answer', done: 0, right: 0 };
    let questions = cfg.questions ? cfg.questions.slice() : [];
    const nextGen = () => kp.generate(cfg.genType, state.genSeq++);
    if (cfg.mode === 'gen') questions = [nextGen()];
    const bookLike = cfg.mode === 'book';
    let onKey = null;

    function current() { return questions[state.i]; }

    function render() {
      const q = current(), qv = questionView(q);
      const total = cfg.mode === 'gen' ? null : questions.length;
      const dots = cfg.mode === 'gen' ? `<span class="streak">已做 ${state.done} 题 ｜ 答对 ${state.right} ｜ 连对 🔥 ${state.streak}（最高 ${state.best}）</span>`
        : `<div class="qprogress">${questions.map((qq, j) => { const r = state.results[qq.id]; return `<span class="qdot ${j === state.i ? 'cur' : ''} ${r || ''}">${j + 1}</span>`; }).join('')}</div>`;
      const head = cfg.mode === 'gen' ? '♾️ 无限练习' : cfg.mode === 'redo' ? '📕 错题重做' : `(${cfg.section.id}) ${esc(cfg.section.title.zh)}`;
      box.innerHTML = `<div class="card">
        <div class="qhead"><h2>${head}</h2>${dots}</div>
        <div class="question">${total ? `第 ${state.i + 1} 题：` : ''}${qv.prompt.zh} <button class="speak" id="qSpeak">🔊</button><span class="en">${qv.prompt.en}</span></div>
        <div class="qstage">${qv.stage}</div>
        <div class="answer-row"><label>答案 Answer:</label>
          <input class="ans ${qv.inputType === 'text' ? 'wide' : ''}" id="ans" type="${qv.inputType === 'number' ? 'text' : 'text'}" inputmode="${qv.inputType === 'number' ? 'numeric' : 'text'}" autocomplete="off" spellcheck="false" placeholder="${qv.inputType === 'number' ? '?' : 'type the words'}">
          <button class="btn ok" id="submit">检查 ✔</button></div>
        <div class="feedback" id="fb"></div>
        <div class="actions" id="actions"></div>
        <div class="center mt"><a class="btn secondary small" href="#/kp/${kp.id}/${cfg.mode === 'gen' ? 'infinite' : 'practice'}" id="quit">${cfg.mode === 'gen' ? '结束练习' : '返回'}</a></div>
      </div>`;
      const inp = $('#ans', box);
      inp.focus();
      state.phase = 'answer'; state.attempts = 0;
      $('#submit', box).onclick = submit;
      $('#qSpeak', box).onclick = () => speak(qv.prompt.zh, qv.prompt.en + (q.type === 'words2num' ? '. ' + NumWords.toWords(q.n) : ''));
      if (cfg.mode === 'gen') $('#quit', box).onclick = e => { e.preventDefault(); finishGen(); };
      window.addEventListener('hashchange', () => { if (onKey) document.removeEventListener('keydown', onKey); onKey = null; }, { once: true });
      inp.onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); submit(); } };
    }

    function submit() {
      if (state.phase !== 'answer') return;
      const q = current(), qv = questionView(q);
      const inp = $('#ans', box), fb = $('#fb', box), actions = $('#actions', box);
      const val = inp.value.trim();
      if (!val) { inp.focus(); return; }
      if (qv.check(val)) {
        inp.classList.add('good');
        const firstTry = state.attempts === 0;
        fb.className = 'feedback ok';
        fb.innerHTML = firstTry ? '🎉 太棒了！答对了！<span class="en">Excellent! Correct!</span>' : '👍 改对了！<span class="en">Good, you fixed it!</span>';
        confetti();
        state.done++; state.right++; state.streak++; state.best = Math.max(state.best, state.streak);
        state.results[q.id] = firstTry ? 'ok' : 'fixed';
        if (bookLike) Store.setProgress(q.id, 'ok');
        if (firstTry) Store.addStar(1);
        if (cfg.mode === 'redo') {
          const gone = Store.wrongSolved(q.id);
          fb.innerHTML += gone ? '<span class="hint">🎊 连对两次，这题从错题本移出啦！</span>' : '<span class="hint">再答对一次就能从错题本移出。</span>';
          updateWrongBadge();
        }
        // 从错题本来的题（book 模式下也可能在错题本里）
        else if (Store.wrongList().some(w => w.q.id === q.id)) { const gone = Store.wrongSolved(q.id); updateWrongBadge(); if (gone) fb.innerHTML += '<span class="hint">🎊 这题从错题本移出啦！</span>'; }
        afterAnswer(actions, q, qv, true);
      } else {
        state.attempts++;
        inp.classList.remove('shake'); void inp.offsetWidth; inp.classList.add('shake');
        if (state.attempts === 1) {
          fb.className = 'feedback bad';
          const d = qv.diagnose ? qv.diagnose(val) : null;
          fb.innerHTML = `🤔 再想一想 <span class="en">Try again</span><span class="hint">${d ? d.zh + ' ' : ''}提示：${qv.hint.zh}<br><span class="en">${(d ? d.en + ' ' : '') + qv.hint.en}</span></span>`;
          inp.select();
          if (autoSpeak) speak('再想一想。' + (d ? d.zh : '') + qv.hint.zh, '');
        } else {
          fb.className = 'feedback bad';
          fb.innerHTML = `❌ 正确答案是：<b>${esc(qv.answerText)}</b><span class="en">The answer is ${esc(qv.answerText)}</span>`;
          state.done++; state.streak = 0;
          state.results[q.id] = 'bad';
          if (bookLike) Store.setProgress(q.id, 'bad');
          if (cfg.mode === 'redo') { Store.wrongFailed(q.id); Store.addWrong(q, kp.id, val, qv.answerText); }
          else Store.addWrong(q, kp.id, val, qv.answerText);
          updateWrongBadge();
          afterAnswer(actions, q, qv, false);
        }
      }
    }

    function afterAnswer(actions, q, qv, correct) {
      state.phase = 'next';
      const isLast = cfg.mode !== 'gen' && state.i === questions.length - 1;
      actions.innerHTML = `${correct ? '' : '<button class="btn accent" id="explainBtn">看讲解 📖</button>'}
        <button class="btn" id="nextBtn">${isLast ? '看结果 🏁' : '下一题 ▶'} <span style="font-size:13px;opacity:.8">(Enter)</span></button>`;
      $('#nextBtn', box).onclick = next;
      if (!correct) $('#explainBtn', box).onclick = () => showExplain(qv.explainKind, qv.n);
      $('#ans', box).blur();
      onKey = e => { if (e.key === 'Enter' && state.phase === 'next' && !$('.overlay')) { e.preventDefault(); next(); } };
      // 延迟一拍再监听，避免刚才提交用的那个回车事件冒泡上来又触发“下一题”
      setTimeout(() => { if (state.phase === 'next' && onKey) document.addEventListener('keydown', onKey); }, 50);
    }

    function next() {
      if (onKey) document.removeEventListener('keydown', onKey); onKey = null;
      if (cfg.mode === 'gen') { questions.push(nextGen()); state.i++; render(); return; }
      if (state.i < questions.length - 1) { state.i++; render(); } else finish();
    }

    function finish() {
      const list = questions.map((q, j) => { const r = state.results[q.id]; const qv = questionView(q); return `<li><span class="${r === 'bad' ? 'bad' : 'ok'}">${r === 'ok' ? '✅' : r === 'fixed' ? '🟡' : '❌'}</span> 第 ${j + 1} 题 <b>${esc(qv.answerText)}</b></li>`; }).join('');
      const wrongQs = questions.filter(q => state.results[q.id] === 'bad');
      const n = questions.length;
      const face = state.right === n ? '🏆' : state.right >= n * 0.7 ? '😊' : '💪';
      box.innerHTML = `<div class="card center"><div class="summary-big">${face}</div><h2>答对 ${state.right} / ${n} 题</h2>
        <ul class="result-list" style="text-align:left;max-width:420px;margin:10px auto">${list}</ul>
        <div class="actions">${wrongQs.length ? '<button class="btn accent" id="redoWrong">再做一遍错题 🔁</button>' : ''}
          <a class="btn" href="#/kp/${kp.id}/practice">返回练习列表</a>
          <a class="btn secondary" href="#/kp/${kp.id}/infinite">无限练习 ♾️</a></div></div>`;
      if (state.right === n) confetti();
      if (wrongQs.length) $('#redoWrong', box).onclick = () => runSession(kp, box, { mode: cfg.mode === 'redo' ? 'redo' : 'book', section: cfg.section, questions: wrongQs });
    }
    function finishGen() {
      document.removeEventListener('keydown', onKey);
      box.innerHTML = `<div class="card center"><div class="summary-big">${state.right >= 10 ? '🏆' : '😊'}</div><h2>这次做了 ${state.done} 题，答对 ${state.right} 题，最长连对 ${state.best} 🔥</h2>
        <div class="actions"><a class="btn" href="#/kp/${kp.id}/infinite">再来一轮</a><a class="btn secondary" href="#/kp/${kp.id}/practice">回到练习</a></div></div>`;
    }
    render();
  }

  // 讲解弹窗
  function showExplain(kind, n) {
    const ov = document.createElement('div');
    ov.className = 'overlay';
    ov.innerHTML = '<div class="card" id="exCard"></div>';
    document.body.appendChild(ov);
    const st = mountStepper($('#exCard', ov), buildSteps(kind, n), { title: '一步一步看 <span class="en">Step by step</span>', onClose: () => { st.destroy(); ov.remove(); } });
    ov.addEventListener('click', e => { if (e.target === ov) { st.destroy(); ov.remove(); } });
  }

  // ---------- 错题本 ----------
  function renderWrong() {
    setNav('wrong');
    const list = Store.wrongList();
    if (!list.length) { app.innerHTML = `<h1>📕 错题本 <span class="en">Mistakes</span></h1><div class="card center"><div class="summary-big">🌈</div><h2>错题本是空的，真棒！</h2><a class="btn" href="#/">去练习</a></div>`; return; }
    const byKP = {};
    list.forEach(w => { (byKP[w.kp] = byKP[w.kp] || []).push(w); });
    let html = `<h1>📕 错题本 <span class="en">Mistakes</span></h1><p class="sub">共 ${list.length} 题。重做时连续答对 2 次，题目会自动移出。</p>
      <div class="row" style="margin-bottom:14px"><button class="btn accent big" id="redoAll">重做全部错题 🔁</button><button class="btn secondary small" id="clearAll">清空错题本</button></div>`;
    for (const [kpId, ws] of Object.entries(byKP)) {
      const f = findKP(kpId);
      html += `<div class="card"><h2>${f ? esc(f.kp.title.zh) : kpId} <span class="en">${f ? esc(f.kp.title.en) : ''}</span></h2>`;
      html += ws.map(w => {
        const qv = questionView(w.q);
        const stage = w.q.type === 'blocks' ? `<div class="blocks">${Blocks.render(w.q, { scale: 0.7 })}</div>` : w.q.type === 'num2words' ? `<b>${w.q.n}</b> → 英文` : `<b>${NumWords.toWords(w.q.n)}</b> → 数字`;
        return `<div class="wrong-item"><div><div class="wrong-q"><span class="tag">${w.q.gen ? '随机题' : w.q.id.replace('u1-1-', '')}</span>${stage}</div>
          <div class="wrong-meta">你写的：<b class="bad">${esc(w.yourAnswer)}</b> ｜ 正确：<b class="ok">${esc(qv.answerText)}</b> ｜ 错了 ${w.times} 次 ｜ 还需答对 ${w.need} 次</div></div>
          <div><button class="btn small secondary" data-explain="${w.q.id}">看讲解</button> <button class="btn small secondary" data-del="${w.q.id}">移出</button></div></div>`;
      }).join('');
      html += '</div>';
    }
    app.innerHTML = html;
    $('#redoAll').onclick = () => {
      // 按知识点分组重做（当前只有一个知识点，取第一组）
      const kpId = Object.keys(byKP)[0];
      const f = findKP(kpId);
      app.innerHTML = `<h1>📕 错题重做</h1><div id="redoBox"></div>`;
      runSession(f.kp, $('#redoBox'), { mode: 'redo', questions: list.filter(w => w.kp === kpId).map(w => w.q) });
    };
    $('#clearAll').onclick = () => { if (confirm('确定清空错题本吗？')) { Store.clearWrong(); updateWrongBadge(); renderWrong(); } };
    app.querySelectorAll('[data-del]').forEach(b => b.onclick = () => { Store.removeWrong(b.dataset.del); updateWrongBadge(); renderWrong(); });
    app.querySelectorAll('[data-explain]').forEach(b => b.onclick = () => { const w = list.find(x => x.q.id === b.dataset.explain); const qv = questionView(w.q); showExplain(qv.explainKind, qv.n); });
  }

  // ---------- 进度 ----------
  function renderStats() {
    setNav('stats');
    const st = Store.stats();
    let rows = '';
    for (const u of DATA.units) for (const k of u.kps) if (k.available) {
      const s = kpStars(k);
      rows += `<div class="wrong-item"><div><div class="wrong-q">Unit ${u.num} · ${esc(k.title.zh)}</div><div class="wrong-meta">完成 ${s.done}/${s.total} ｜ 答对 ${s.right}</div></div><div class="stars">${starsHTML(s.stars)}</div></div>`;
    }
    app.innerHTML = `<h1>⭐ 我的进度 <span class="en">My progress</span></h1>
      <div class="card"><h2>星星 ${st.stars} ⭐ ｜ 答对 ${st.correct} 题 ｜ 错题 ${st.wrong} 次</h2>${rows}</div>
      <div class="card"><h2>备份 <span class="en">Backup</span></h2><p class="sub">进度保存在这台电脑的浏览器里。换电脑或换浏览器前，先导出备份。</p>
        <div class="row"><button class="btn secondary" id="exp">导出进度</button><label class="btn secondary">导入进度 <input type="file" id="imp" accept=".json" hidden></label><button class="btn secondary small" id="reset">清空全部进度</button></div></div>`;
    $('#exp').onclick = () => { const a = document.createElement('a'); a.href = 'data:application/json;charset=utf-8,' + encodeURIComponent(Store.exportJSON()); a.download = 'mathland-progress.json'; a.click(); };
    $('#imp').onchange = e => { const f = e.target.files[0]; if (!f) return; f.text().then(t => { try { Store.importJSON(t); updateWrongBadge(); renderStats(); alert('导入成功'); } catch (err) { alert('文件格式不对'); } }); };
    $('#reset').onclick = () => { if (confirm('确定清空全部进度和错题本吗？')) { Store.reset(); updateWrongBadge(); renderStats(); } };
  }

  // ---------- 路由 ----------
  function route() {
    speechSynthesis && speechSynthesis.cancel();
    const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
    window.scrollTo(0, 0);
    if (!parts.length) return renderHome();
    if (parts[0] === 'kp') return renderKP(parts[1], parts[2], parts[3]);
    if (parts[0] === 'wrong') return renderWrong();
    if (parts[0] === 'stats') return renderStats();
    renderHome();
  }
  window.addEventListener('hashchange', route);
  updateWrongBadge();
  route();
})();
