/* Math Land 页面逻辑 */
(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const app = $('#app');
  const DATA = window.MATH_DATA;
  // 给 types.js 用的工具（函数声明会提升，这里可以直接引用）
  window.UI = { pvTable, bigNum, split: n => split(n), esc, wordChoices: q => wordChoices(q), cnt: (n, u) => cnt(n, u) };

  // ---------- 通用 ----------
  function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
  // 年级：DATA.levels[n] = { num, units }；每个 unit / kp 标上 level
  const LEVELS = [1, 2, 3, 4, 5];
  LEVELS.forEach(n => { const lv = DATA.levels[n]; if (!lv) return; lv.units.forEach(u => { u.level = n; u.kps.forEach(k => { k.level = n; }); }); });
  const levelReady = n => !!(DATA.levels[n] && DATA.levels[n].units.some(u => u.kps.length));
  const kpHref = (kp, rest) => `#/L${kp.level}/kp/${kp.id}${rest || ''}`;
  const lvHref = n => `#/L${n}`;
  function findKP(id) {
    for (const n of LEVELS) { const lv = DATA.levels[n]; if (!lv) continue; for (const u of lv.units) for (const k of u.kps) if (k.id === id) return { level: n, unit: u, kp: k }; }
    return null;
  }
  const split = n => n === 1000 ? { h: 10, t: 0, o: 0 } : { h: Math.floor(n / 100), t: Math.floor(n / 10) % 10, o: n % 10 };

  // 朗读（浏览器自带，中文 + 英文）
  let autoSpeak = localStorage.getItem('mathland.autoSpeak') === '1';   // 默认不自动朗读，手动勾选后记住
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
    const cards = LEVELS.map(n => {
      const ok = levelReady(n);
      const units = ok ? DATA.levels[n].units.filter(u => u.kps.length).length : 0;
      return ok ? `<a class="level-card" href="${lvHref(n)}"><div class="level-num">${n}</div><div class="level-name">Level ${n}</div><div class="sub">${units} 个单元</div></a>`
        : `<div class="level-card soon"><div class="level-num">${n}</div><div class="level-name">Level ${n}</div><span class="soon-tag">即将推出</span></div>`;
    }).join('');
    app.innerHTML = `<h1>你好！今天学哪一级？ <span class="en">Choose your level</span></h1>
      <p class="sub">已经拿到 ${st.stars} 颗星星 ⭐ ｜ 答对 ${st.correct} 题</p>
      <div class="level-grid">${cards}</div>`;
  }
  // 年级页：该年级的单元 + 知识点列表
  function renderLevel(n) {
    setNav('home');
    if (!levelReady(n)) { app.innerHTML = `<div class="crumb"><a href="#/">首页</a> › Level ${n}</div><div class="card center"><h2>Level ${n} 即将推出</h2><a class="btn" href="#/">回首页</a></div>`; return; }
    const st = Store.stats();
    let html = `<div class="crumb"><a href="#/">首页</a> › Level ${n}</div>
      <h1>Level ${n}：今天想学什么？ <span class="en">What shall we learn today?</span></h1>
      <p class="sub">已经拿到 ${st.stars} 颗星星 ⭐ ｜ 答对 ${st.correct} 题 ｜ <a href="#/">换一个 Level</a></p>`;
    for (const u of DATA.levels[n].units) {
      html += `<section class="unit"><div class="unit-head"><span class="unit-num">${u.num}</span><h2>${esc(u.title.zh)} <span class="en">${esc(u.title.en)}</span></h2></div>`;
      if (!u.kps.length) { html += `<div class="sub">即将推出 Coming soon</div></section>`; continue; }
      html += `<div class="kp-grid">`;
      for (const k of u.kps) {
        if (!k.available) {
          html += `<div class="kp-card soon"><div class="kp-title">${esc(k.title.zh)}</div><div class="kp-en">${esc(k.title.en)}</div><span class="soon-tag">即将推出</span></div>`;
          continue;
        }
        const s = kpStars(k);
        html += `<a class="kp-card" href="${kpHref(k)}"><div class="kp-title">${esc(k.title.zh)}</div><div class="kp-en">${esc(k.title.en)}</div>
          <div class="stars">${starsHTML(s.stars)} <span class="sub">${s.done}/${s.total} 题</span></div></a>`;
      }
      html += `</div></section>`;
    }
    app.innerHTML = html;
  }

  // ---------- 知识点页 ----------
  // #/kp/u1-1            知识点总览（各部分列表）
  // #/kp/u1-1/A          第 A 部分：例题 + 紧跟的练习
  // #/kp/u1-1/infinite/x 无限练习
  function renderKP(kpId, sub, arg) {
    setNav('');
    const found = findKP(kpId);
    if (!found || !found.kp.available) { app.innerHTML = '<div class="card">还没有这个知识点哦。<a href="#/">回首页</a></div>'; return; }
    const { unit, kp } = found;
    app.innerHTML = `
      <div class="crumb"><a href="#/">首页</a> › <a href="${lvHref(kp.level)}">Level ${kp.level}</a> › Unit ${unit.num} ${esc(unit.title.zh)} ${sub && sub !== 'infinite' ? `› <a href="${kpHref(kp)}">${esc(kp.title.zh)}</a> › 第 ${sub} 部分` : ''}</div>
      <h1>${esc(kp.title.zh)} <span class="en">${esc(kp.title.en)}</span></h1>
      <div id="mode"></div>`;
    const box = $('#mode');
    if (!sub) return renderOverview(kp, box);
    if (sub === 'infinite') return renderOverview(kp, box);   // 随机出题暂不开放，题目全部来自课本
    const sec = kp.sections.find(x => x.id === sub);
    if (!sec) return renderOverview(kp, box);
    renderSection(kp, sec, box, arg === 'wrong');
  }

  // 总览：各部分（例题 + 练习）按顺序排列
  function renderOverview(kp, box) {
    const cards = kp.sections.map((s, i) => {
      const st = sectionStats(s);
      const started = st.ok + st.fixed + st.bad > 0;
      const finished = started && st.ok + st.fixed + st.bad === st.total;
      const wrongs = s.questions.filter(q => (Store.getProgress(q.id) || {}).status === 'bad').length;
      return `<div class="card sec-card"><div class="row">
        <span class="unit-num">${s.id}</span>
        <div class="grow"><h2 style="margin:0">${esc(s.title.zh)} <span class="en">${esc(s.title.en)}</span></h2>
          <div class="sub">📖 例题：${esc(s.example.title.zh)} ｜ ✏️ ${st.total} 题 ${started ? `｜ ✅ ${st.ok} 🟡 ${st.fixed} ❌ ${st.bad}` : ''}</div></div>
        <a class="btn ${finished ? 'secondary' : ''}" href="${kpHref(kp, '/' + s.id)}">${finished ? '再看一遍' : started ? '继续 ▶' : '开始 ▶'}</a>
        ${wrongs ? `<a class="btn secondary" href="${kpHref(kp, '/' + s.id + '/wrong')}">只做错题 (${wrongs})</a>` : ''}
        ${started ? `<button class="btn secondary small" data-clear="${s.id}" title="把这部分的记录全部清掉，重新开始">清空记录</button>` : ''}
      </div></div>`;
    }).join('');
    box.innerHTML = `
      <div class="card"><div class="sub">${esc(kp.intro.zh)}<br><span class="en">${esc(kp.intro.en)}</span></div></div>
      ${cards}
      <div class="center mt"><button class="btn secondary small" id="clearKP">重做整个知识点（清空 A/B/C 全部记录）🔁</button></div>`;
    $('#clearKP', box).onclick = () => {
      const ids = kp.sections.flatMap(sec => sec.questions.map(q => q.id));
      if (confirm(`确定清空这个知识点全部 ${ids.length} 道题的记录吗？（错题本里的这些题也会移出）`)) { Store.clearMany(ids); updateWrongBadge(); renderOverview(kp, box); }
    };
    box.querySelectorAll('[data-clear]').forEach(b => b.onclick = () => {
      const sec = kp.sections.find(x => x.id === b.dataset.clear);
      if (confirm(`确定清空第 ${sec.id} 部分的 ${sec.questions.length} 道题的记录吗？（错题本里的这些题也会移出）`)) {
        Store.clearMany(sec.questions.map(q => q.id)); updateWrongBadge(); renderOverview(kp, box);
      }
    });
  }

  // 一个部分：先例题（分步讲解），下面紧跟练习
  function renderSection(kp, sec, box, onlyWrong) {
    const idx = kp.sections.indexOf(sec);
    let questions = sec.questions;
    if (onlyWrong) questions = sec.questions.filter(q => (Store.getProgress(q.id) || {}).status === 'bad');
    if (!questions.length) { questions = sec.questions; onlyWrong = false; }
    box.innerHTML = `
      <div class="sec-head"><span class="unit-num">${sec.id}</span><h2 style="margin:0">${esc(sec.title.zh)} <span class="en">${esc(sec.title.en)}</span></h2></div>
      <div class="card" id="stepper"></div>
      <div class="center" style="margin:-6px 0 14px"><span class="sub">👆 先看例题，再做下面的练习 ｜ Example first, then practise below 👇</span></div>
      <div id="practice"></div>`;
    const practiceBox = $('#practice', box);
    const scrollToPractice = () => { practiceBox.scrollIntoView({ behavior: 'smooth', block: 'start' }); const inp = $('#ans', practiceBox); if (inp) setTimeout(() => inp.focus({ preventScroll: true }), 400); };
    mountStepper($('#stepper', box), buildSteps(sec.example.kind, sec.example.n), {
      title: `📖 例题 Example：${esc(sec.example.title.zh)} <span class="en">${esc(sec.example.title.en)}</span>`,
      doneLabel: '开始练习 ✏️', onDone: scrollToPractice,
    });
    runSession(kp, practiceBox, { mode: 'book', section: sec, questions, retry: onlyWrong, next: kp.sections[idx + 1] || null, noAutoFocus: true });
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
      $('#next', el).textContent = i === steps.length - 1 ? (opts.doneLabel || '完成 ✔') : '下一步 ▶';
      if (autoSpeak) speak(s.zh.replace(/<[^>]+>/g, ''), s.en.replace(/<[^>]+>/g, ''));
    }
    $('#prev', el).onclick = () => show(i - 1);
    $('#next', el).onclick = () => { if (i === steps.length - 1) { if (opts.onClose) opts.onClose(); else if (opts.onDone) opts.onDone(); else show(0); } else show(i + 1); };
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
    if (window.StepKinds && window.StepKinds[kind]) return window.StepKinds[kind](n);
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
  function renderInfiniteMenu(kp, box, type) {
    const types = { blocks: ['看方块写数字', 'Blocks → number'], num2words: ['数字 → 英文（选择题）', 'Number → words'], words2num: ['英文 → 数字', 'Words → number'] };
    if (type && types[type]) return runSession(kp, box, { mode: 'gen', genType: type });
    box.innerHTML = `<div class="card"><h2>♾️ 无限练习：想练哪一种？ <span class="en">Which type?</span></h2><p class="sub">题目是随机生成的，想做多少做多少。</p>
      <div class="row">${Object.entries(types).map(([k, [zh, en]]) => `<a class="btn" href="${kpHref(kp, '/infinite/' + k)}">${zh} <span style="opacity:.8;font-size:14px">${en}</span></a>`).join('')}</div></div>`;
  }

  // ---------- 题目展示与判分 ----------
  // 固定种子的随机数，让同一道题每次的选项顺序一样
  function seeded(seed) { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  // 数字→英文 的选择题选项：正确答案 + 3 个容易混淆的错误答案
  function wordChoices(q) {
    if (q.choices) return q.choices;
    const n = q.n, rnd = seeded(n * 7919 + (q.id.length * 131));
    const v = split(n);
    const mk = (h, t, o) => h * 100 + t * 10 + o;
    let cands = n === 1000 ? [100, 110, 900, 101] : [
      mk(v.h, v.o, v.t), mk(v.t, v.h, v.o), mk(v.o, v.t, v.h),
      mk(v.h, v.t, (v.o + 1) % 10), mk(v.h, (v.t + 1) % 10, v.o), mk((v.h % 9) + 1, v.t, v.o),
      mk(v.h, v.t, (v.o + 9) % 10), mk(v.h, (v.t + 9) % 10, v.o),
      v.t === 1 ? mk(v.h, v.o, 1) : mk(v.h, 1, v.o),   // 十几 和 几十 混淆
    ];
    cands = [...new Set(cands)].filter(x => x !== n && x >= 100 && x <= 1000);
    for (let i = cands.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [cands[i], cands[j]] = [cands[j], cands[i]]; }
    const list = [n, ...cands.slice(0, 3)].map(NumWords.toWords);
    for (let i = list.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [list[i], list[j]] = [list[j], list[i]]; }
    q.choices = list;
    return list;
  }

  // 一句话说明这道题是什么（题号悬停、错题本用）
  function qLabel(q) {
    if (q.label) return q.label;
    if (q.type === 'fill') return q.text.replace(/\{\{\w+\}\}/g, '__').replace(/\n/g, ' ');
    if (q.type === 'arrange') return `${q.nums.join(', ')} ${q.order === 'asc' ? '从小到大' : '从大到小'}`;
    if (q.type === 'blocks') return `看方块写数字（${q.h} 个百 ${q.t} 个十 ${q.o} 个一）`;
    if (q.type === 'num2words') return `${q.n} 用英文怎么说`;
    return `${NumWords.toWords(q.n)} 是多少`;
  }

  function questionView(q) {
    if (window.QTypes && window.QTypes[q.type]) return window.QTypes[q.type](q);
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
      prompt: { zh: '这个数用英文怎么说？选一选', en: 'Which is this number in words?' },
      stage: bigNum(q.n),
      inputType: 'choice', choices: wordChoices(q), label: '',
      hint: { zh: `先看百位：${q.n === 1000 ? '1000 是 one thousand' : `${split(q.n).h} 是 ${NumWords.ones[split(q.n).h]}，所以开头是 ${NumWords.parts(q.n).h}`}${q.n % 100 ? '。再看后面的数是不是对的。' : '。后面是 0，后面什么都没有。'}`, en: 'Look at the hundreds first, then check the rest.' },
      answerText: NumWords.toWords(q.n),
      check: val => NumWords.wordsEqual(val, NumWords.toWords(q.n)),
      diagnose: val => { const m = NumWords.fromWords(val); return (m !== null && m !== q.n) ? { zh: `你选的是 ${m}，题目是 ${q.n} 哦。`, en: `You chose ${m}, but the number is ${q.n}.` } : null; },
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

  /* 练习会话：mode = book（课本题，记录进度）| redo（错题本重做）| gen（随机题，暂未开放）
   * cfg.retry = true 时，忽略这些题以前的记录，当作新题重做（“只做错题”用） */
  function runSession(kp, box, cfg) {
    const state = { i: 0, attempts: 0, results: {}, answers: {}, streak: 0, best: 0, genSeq: 0, phase: 'answer', done: 0, right: 0 };
    let questions = cfg.questions ? cfg.questions.slice() : [];
    const nextGen = () => kp.generate(cfg.genType, state.genSeq++);
    if (cfg.mode === 'gen') questions = [nextGen()];
    const book = cfg.mode === 'book';
    const listeners = [];
    function listen(fn) { document.addEventListener('keydown', fn); listeners.push(fn); }
    function unlisten() { listeners.forEach(f => document.removeEventListener('keydown', f)); listeners.length = 0; }
    window.addEventListener('hashchange', unlisten, { once: true });

    // 这道题的状态：本次做过用本次的；课本模式再看保存的记录
    const statusOf = q => state.results[q.id] !== undefined ? state.results[q.id] : (book && !cfg.retry ? (Store.getProgress(q.id) || {}).status : undefined);
    const answerOf = q => state.answers[q.id] !== undefined ? state.answers[q.id] : (book ? (Store.getProgress(q.id) || {}).answer : undefined);
    function record(q, status, answer) {
      state.results[q.id] = status; state.answers[q.id] = answer;
      if (book) Store.setProgress(q.id, status, answer);
    }
    const statusLabel = r => r === 'ok' ? '（做对）' : r === 'fixed' ? '（改对）' : r === 'bad' ? '（做错）' : '（没做）';
    // 从第一道没做的题开始
    if (cfg.mode !== 'gen') { const k = questions.findIndex(q => !statusOf(q)); state.i = k < 0 ? 0 : k; }

    const current = () => questions[state.i];
    let curQV = null;   // 当前题的视图（每次 render 只生成一次，保持题内状态）
    const isLast = () => cfg.mode !== 'gen' && state.i === questions.length - 1;

    function navHTML() {
      if (cfg.mode === 'gen') return `<span class="streak">已做 ${state.done} 题 ｜ 答对 ${state.right} ｜ 连对 🔥 ${state.streak}（最高 ${state.best}）</span>`;
      return `<div class="qnav">
        <button class="navbtn" id="prevQ" title="上一题" ${state.i === 0 ? 'disabled' : ''}>◀</button>
        <div class="qprogress">${questions.map((qq, j) => { const r = statusOf(qq); return `<button class="qdot ${j === state.i ? 'cur' : ''} ${r || ''}" data-jump="${j}" title="第 ${j + 1} 题：${esc(qLabel(qq))}${statusLabel(r)}">${j + 1}</button>`; }).join('')}</div>
        <button class="navbtn" id="nextQ" title="下一题" ${isLast() ? 'disabled' : ''}>▶</button>
        <button class="btn small secondary" id="resultBtn">看结果 🏁</button></div>`;
    }

    function render() {
      unlisten();
      const q = current(), qv = curQV = questionView(q);
      const head = cfg.mode === 'gen' ? '♾️ 练习' : cfg.mode === 'redo' ? '📕 错题重做' : `✏️ 练习 Practice`;
      const inputArea = qv.custom ? qv.custom.html() : qv.choices
        ? `<div class="choices" id="choices">${qv.choices.map((c, i) => `<button class="choice" data-val="${esc(c)}"><span class="key">${i + 1}</span>${esc(c)}</button>`).join('')}</div>
           <div class="center sub" id="choiceTip">点一个答案，或按键盘 1 2 3 4 ｜ Click an answer or press 1-4</div>`
        : `<div class="answer-row"><label>答案 Answer:</label>
           <input class="ans" id="ans" type="text" inputmode="numeric" autocomplete="off" spellcheck="false" placeholder="?">
           <button class="btn ok" id="submit">检查 ✔</button></div>`;
      box.innerHTML = `<div class="card">
        <div class="qhead"><h2>${head}</h2>${navHTML()}</div>
        <div class="question">${cfg.mode === 'gen' ? '' : `第 ${state.i + 1} 题：`}${qv.prompt.zh} <button class="speak" id="qSpeak">🔊</button><span class="en">${qv.prompt.en}</span></div>
        <div class="qstage">${qv.stage}</div>
        ${inputArea}
        <div class="feedback" id="fb"></div>
        <div class="actions" id="actions"></div>
        <div class="toolbar">
          ${cfg.mode === 'gen' ? '' : '<button class="btn secondary small" id="redoBtn" title="清掉这道题的记录，重新作答">重做这题 🔄</button>'}
          ${book ? '<button class="btn secondary small" id="redoAll" title="清掉这部分全部记录，从第 1 题重新开始">重做这部分 🔁</button>' : ''}
          <a class="btn secondary small" href="${kpHref(kp)}" id="quit">${cfg.mode === 'gen' ? '结束练习' : '返回知识点'}</a>
        </div>
      </div>`;
      if ($('#redoBtn', box)) $('#redoBtn', box).onclick = () => redoCurrent(q);
      if ($('#redoAll', box)) $('#redoAll', box).onclick = redoSection;
      $('#qSpeak', box).onclick = () => speak(qv.prompt.zh, qv.prompt.en + (q.type === 'words2num' ? '. ' + NumWords.toWords(q.n) : ''));
      if (cfg.mode === 'gen') $('#quit', box).onclick = e => { e.preventDefault(); finishGen(); };
      else {
        $('#prevQ', box).onclick = () => jumpTo(state.i - 1);
        $('#nextQ', box).onclick = () => jumpTo(state.i + 1);
        $('#resultBtn', box).onclick = finish;
        box.querySelectorAll('[data-jump]').forEach(b => b.onclick = () => jumpTo(parseInt(b.dataset.jump, 10)));
      }
      const done = statusOf(q);
      if (done) showReviewed(q, qv, done); else setupAnswering(q, qv);
    }

    // 还没做：可以作答
    function setupAnswering(q, qv) {
      state.phase = 'answer'; state.attempts = 0;
      const inp = $('#ans', box);
      if (inp) {
        if (!cfg.noAutoFocus || state.i > 0) inp.focus({ preventScroll: true });
        $('#submit', box).onclick = () => submit();
        inp.onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); submit(); } };
      }
      if (qv.choices) {
        box.querySelectorAll('.choice').forEach(b => b.onclick = () => submit(b.dataset.val));
        listen(e => { const k = parseInt(e.key, 10); if (state.phase === 'answer' && k >= 1 && k <= qv.choices.length && !$('.overlay')) { const b = box.querySelectorAll('.choice')[k - 1]; if (b && !b.disabled) b.click(); } });
      }
      if (qv.custom) qv.custom.bind(box, () => submit(qv.custom.value(box)));
    }

    // 已经做过：只读回看，可重做
    function showReviewed(q, qv, status) {
      state.phase = 'next';
      const ans = answerOf(q);
      const inp = $('#ans', box), fb = $('#fb', box);
      if (inp) { inp.value = ans !== undefined ? ans : ''; inp.disabled = true; inp.classList.add(status === 'bad' ? 'shake' : 'good'); $('#submit', box).disabled = true; }
      if (qv.choices) {
        box.querySelectorAll('.choice').forEach(b => b.disabled = true);
        markChoice(qv.answerText, 'right');
        if (status === 'bad' && ans) markChoice(ans, 'wrong');
        const tip = $('#choiceTip', box); if (tip) tip.textContent = '';
      }
      if (qv.custom) qv.custom.restore(box, ans, status);
      fb.className = 'feedback ' + (status === 'bad' ? 'bad' : 'ok');
      fb.innerHTML = status === 'ok' ? '✅ 这题做对了 <span class="en">Correct</span>'
        : status === 'fixed' ? '🟡 这题改对了 <span class="en">Fixed</span>'
        : `❌ 这题做错了，正确答案是：<b>${esc(qv.answerText)}</b><span class="en">The answer is ${esc(qv.answerText)}</span>`;
      $('#actions', box).innerHTML = `${status === 'bad' && qv.explainKind ? '<button class="btn accent" id="explainBtn">看讲解 📖</button>' : ''}
        <button class="btn" id="nextBtn">${isLast() ? '看结果 🏁' : '下一题 ▶'} <span style="font-size:13px;opacity:.8">(Enter)</span></button>`;
      if (status === 'bad' && qv.explainKind) $('#explainBtn', box).onclick = () => showExplain(qv.explainKind, qv.n);
      $('#nextBtn', box).onclick = next;
      scrollToActions();
      listen(e => { if (e.key === 'Enter' && state.phase === 'next' && !$('.overlay')) { e.preventDefault(); next(); } });
    }

    // 清掉这道题的记录，重新作答
    function redoCurrent(q) {
      const had = !!statusOf(q) || state.phase === 'next';
      delete state.results[q.id]; delete state.answers[q.id];
      if (book) { Store.clearProgress(q.id); updateWrongBadge(); }
      render();
      const fb = $('#fb', box); if (fb) fb.innerHTML = had ? '🔄 记录已清掉，重新做一次吧 <span class="en">Cleared, try again</span>' : '';
      const inp = $('#ans', box); if (inp) inp.focus({ preventScroll: true });
    }
    function redoSection() {
      if (!confirm(`确定把这部分 ${questions.length} 道题的记录全部清掉，从第 1 题重新开始吗？`)) return;
      state.results = {}; state.answers = {};
      Store.clearMany(questions.map(q => q.id)); updateWrongBadge();
      state.i = 0; render();
      const inp = $('#ans', box); if (inp) inp.focus({ preventScroll: true });
      box.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function markChoice(val, cls) { box.querySelectorAll('.choice').forEach(b => { if (b.dataset.val === val) { b.classList.add(cls); b.disabled = true; } }); }

    function submit(chosen) {
      if (state.phase !== 'answer') return;
      const q = current(), qv = curQV || questionView(q);
      const inp = $('#ans', box), fb = $('#fb', box);
      const val = chosen !== undefined ? chosen : (inp ? inp.value.trim() : null);
      if (val === null || val === '') { if (inp) inp.focus(); return; }
      if (qv.check(val)) {
        if (inp) inp.classList.add('good');
        if (qv.choices) { markChoice(val, 'right'); box.querySelectorAll('.choice').forEach(b => b.disabled = true); }
        if (qv.custom) qv.custom.lock(box);
        const firstTry = state.attempts === 0;
        fb.className = 'feedback ok';
        fb.innerHTML = firstTry ? '🎉 太棒了！答对了！<span class="en">Excellent! Correct!</span>' : '👍 改对了！<span class="en">Good, you fixed it!</span>';
        confetti();
        state.done++; state.right++; state.streak++; state.best = Math.max(state.best, state.streak);
        record(q, firstTry ? 'ok' : 'fixed', val);
        if (firstTry) Store.addStar(1);
        if (cfg.mode === 'redo') {
          const gone = Store.wrongSolved(q.id);
          fb.innerHTML += gone ? '<span class="hint">🎊 连对两次，这题从错题本移出啦！</span>' : '<span class="hint">再答对一次就能从错题本移出。</span>';
          updateWrongBadge();
        } else if (Store.wrongList().some(w => w.q.id === q.id)) {
          const gone = Store.wrongSolved(q.id); updateWrongBadge();
          if (gone) fb.innerHTML += '<span class="hint">🎊 这题从错题本移出啦！</span>';
        }
        afterAnswer(q, qv, true);
      } else {
        state.attempts++;
        if (inp) { inp.classList.remove('shake'); void inp.offsetWidth; inp.classList.add('shake'); }
        if (qv.choices) markChoice(val, 'wrong');
        if (qv.custom && state.attempts === 1) qv.custom.markWrong(box, val);
        fb.className = 'feedback bad';
        if (state.attempts === 1) {
          const d = qv.diagnose ? qv.diagnose(val) : null;
          fb.innerHTML = `🤔 再想一想 <span class="en">Try again</span><span class="hint">${d ? d.zh + ' ' : ''}提示：${qv.hint.zh}<br><span class="en">${(d ? d.en + ' ' : '') + qv.hint.en}</span></span>`;
          if (inp) inp.select();
          if (autoSpeak) speak('再想一想。' + (d ? d.zh : '') + qv.hint.zh, '');
        } else {
          fb.innerHTML = `❌ 正确答案是：<b>${esc(qv.answerText)}</b><span class="en">The answer is ${esc(qv.answerText)}</span>`;
          if (qv.choices) { markChoice(qv.answerText, 'right'); box.querySelectorAll('.choice').forEach(b => b.disabled = true); }
          if (qv.custom) qv.custom.showAnswer(box);
          state.done++; state.streak = 0;
          record(q, 'bad', val);
          if (cfg.mode === 'redo') Store.wrongFailed(q.id);
          Store.addWrong(q, kp.id, qv.answerDisplay ? qv.answerDisplay(val) : val, qv.answerText);
          updateWrongBadge();
          afterAnswer(q, qv, false);
        }
      }
    }

    function afterAnswer(q, qv, correct) {
      state.phase = 'next';
      const inp = $('#ans', box); if (inp) { inp.disabled = true; inp.blur(); $('#submit', box).disabled = true; }
      // 题号颜色刷新
      const nav = $('.qnav', box); if (nav) { nav.outerHTML = navHTML(); bindNav(); }
      $('#actions', box).innerHTML = `${correct || !qv.explainKind ? '' : '<button class="btn accent" id="explainBtn">看讲解 📖</button>'}
        <button class="btn" id="nextBtn">${isLast() ? '看结果 🏁' : '下一题 ▶'} <span style="font-size:13px;opacity:.8">(Enter)</span></button>`;
      $('#nextBtn', box).onclick = next;
      if (!correct && qv.explainKind) $('#explainBtn', box).onclick = () => showExplain(qv.explainKind, qv.n);
      scrollToActions();
      // 延迟一拍再监听，避免刚才提交用的那个回车事件冒泡上来又触发“下一题”
      setTimeout(() => { if (state.phase === 'next') listen(e => { if (e.key === 'Enter' && state.phase === 'next' && !$('.overlay')) { e.preventDefault(); next(); } }); }, 50);
    }
    // 答完后把反馈和按钮滚到看得见的地方
    function scrollToActions() {
      const el = $('#actions', box);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 30);
    }
    function bindNav() {
      if (cfg.mode === 'gen') return;
      $('#prevQ', box).onclick = () => jumpTo(state.i - 1);
      $('#nextQ', box).onclick = () => jumpTo(state.i + 1);
      $('#resultBtn', box).onclick = finish;
      box.querySelectorAll('[data-jump]').forEach(b => b.onclick = () => jumpTo(parseInt(b.dataset.jump, 10)));
    }

    function jumpTo(j) {
      if (j === state.i || j < 0 || j >= questions.length) return;
      state.i = j; render();
      const inp = $('#ans', box); if (inp && !inp.disabled) inp.focus({ preventScroll: true });
    }
    function next() {
      if (cfg.mode === 'gen') { questions.push(nextGen()); state.i++; render(); return; }
      if (state.i < questions.length - 1) { state.i++; render(); const inp = $('#ans', box); if (inp && !inp.disabled) inp.focus({ preventScroll: true }); }
      else finish();
    }

    function finish() {
      unlisten();
      const n = questions.length;
      let right = 0, wrong = 0, undone = 0;
      const list = questions.map((q, j) => {
        const r = statusOf(q), qv = questionView(q);
        if (r === 'ok' || r === 'fixed') right++; else if (r === 'bad') wrong++; else undone++;
        const icon = r === 'ok' ? '✅' : r === 'fixed' ? '🟡' : r === 'bad' ? '❌' : '⬜';
        const yours = r === 'bad' ? ` <span class="sub">你的答案：${esc(qv.answerDisplay ? qv.answerDisplay(answerOf(q) || '') : (answerOf(q) || ''))}</span>` : !r ? ' <span class="sub">没做</span>' : '';
        return `<li><button class="qdot ${r || ''}" data-jump="${j}" title="回到这题">${j + 1}</button> <span class="${r === 'bad' ? 'bad' : r ? 'ok' : 'skip'}">${icon}</span> <b>${esc(qv.answerText)}</b>${yours}</li>`;
      }).join('');
      const answered = right + wrong;
      const face = answered === 0 ? '📝' : right === answered ? '🏆' : right >= answered * 0.7 ? '😊' : '💪';
      const wrongQs = questions.filter(q => statusOf(q) === 'bad');
      const nextBtn = cfg.next ? `<a class="btn accent big" href="${kpHref(kp, '/' + cfg.next.id)}">下一部分 (${cfg.next.id}) ▶</a>` : `<a class="btn accent big" href="${kpHref(kp)}">完成这个知识点 🏁</a>`;
      box.innerHTML = `<div class="card center"><div class="summary-big">${face}</div>
        <h2>答对 ${right} / ${answered} 题${undone ? `，还有 ${undone} 题没做` : ''}</h2>
        <ul class="result-list" style="text-align:left;max-width:460px;margin:10px auto">${list}</ul>
        <div class="actions">${wrongQs.length ? '<button class="btn" id="redoWrong">再做一遍错题 🔁</button>' : ''}
          ${undone ? '<button class="btn secondary" id="backToQ">回去做题 ✏️</button>' : ''}
          ${cfg.mode === 'book' ? nextBtn : `<a class="btn" href="${kpHref(kp)}">返回知识点</a>`}</div></div>`;
      if (answered && right === answered) confetti();
      box.querySelectorAll('[data-jump]').forEach(b => b.onclick = () => { state.i = parseInt(b.dataset.jump, 10); render(); box.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
      if (wrongQs.length) $('#redoWrong', box).onclick = () => { runSession(kp, box, Object.assign({}, cfg, { questions: wrongQs, retry: true, noAutoFocus: false })); box.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
      if (undone) $('#backToQ', box).onclick = () => { const k = questions.findIndex(q => !statusOf(q)); state.i = k < 0 ? 0 : k; render(); box.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
    }
    function finishGen() {
      unlisten();
      box.innerHTML = `<div class="card center"><div class="summary-big">${state.right >= 10 ? '🏆' : '😊'}</div><h2>这次做了 ${state.done} 题，答对 ${state.right} 题，最长连对 ${state.best} 🔥</h2>
        <div class="actions"><a class="btn secondary" href="${kpHref(kp)}">返回知识点</a></div></div>`;
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
    const lvOf = w => { const f = findKP(w.kp); return f ? f.level : 2; };
    const lvCounts = {}; list.forEach(w => { const n = lvOf(w); lvCounts[n] = (lvCounts[n] || 0) + 1; });
    const lvKeys = Object.keys(lvCounts).map(Number).sort();
    const filter = renderWrong.filter && lvCounts[renderWrong.filter] ? renderWrong.filter : 0;
    const shown = filter ? list.filter(w => lvOf(w) === filter) : list;
    const byKP = {};
    shown.forEach(w => { (byKP[w.kp] = byKP[w.kp] || []).push(w); });
    let html = `<h1>📕 错题本 <span class="en">Mistakes</span></h1><p class="sub">共 ${list.length} 题。重做时连续答对 2 次，题目会自动移出。</p>
      ${lvKeys.length > 1 ? `<div class="row" style="margin-bottom:10px"><button class="btn small ${filter ? 'secondary' : ''}" data-lv="0">全部 (${list.length})</button>${lvKeys.map(n => `<button class="btn small ${filter === n ? '' : 'secondary'}" data-lv="${n}">Level ${n} (${lvCounts[n]})</button>`).join('')}</div>` : ''}
      <div class="row" style="margin-bottom:14px"><button class="btn accent big" id="redoAll">重做全部错题 🔁</button><button class="btn secondary small" id="clearAll">清空错题本</button></div>`;
    for (const [kpId, ws] of Object.entries(byKP)) {
      const f = findKP(kpId);
      html += `<div class="card"><h2><span class="tag">Level ${f ? f.level : '?'}</span> ${f ? esc(f.kp.title.zh) : kpId} <span class="en">${f ? esc(f.kp.title.en) : ''}</span></h2>`;
      html += ws.map(w => {
        const qv = questionView(w.q);
        const stage = w.q.type === 'blocks' ? `<div class="blocks">${Blocks.render(w.q, { scale: 0.7 })}</div>` : w.q.type === 'num2words' ? `<b>${w.q.n}</b> → 英文` : w.q.type === 'words2num' ? `<b>${NumWords.toWords(w.q.n)}</b> → 数字` : esc(qLabel(w.q));
        return `<div class="wrong-item"><div><div class="wrong-q"><span class="tag">${w.q.gen ? '随机题' : w.q.id.split('-').slice(2).join('-')}</span>${stage}</div>
          <div class="wrong-meta">你的答案：<b class="bad">${esc(w.yourAnswer)}</b> ｜ 正确：<b class="ok">${esc(qv.answerText)}</b> ｜ 错了 ${w.times} 次 ｜ 还需答对 ${w.need} 次</div></div>
          <div><button class="btn small secondary" data-explain="${w.q.id}">看讲解</button> <button class="btn small secondary" data-del="${w.q.id}">移出</button></div></div>`;
      }).join('');
      html += '</div>';
    }
    app.innerHTML = html;
    app.querySelectorAll('[data-lv]').forEach(b => b.onclick = () => { renderWrong.filter = +b.dataset.lv; renderWrong(); });
    $('#redoAll').onclick = () => {
      // 按知识点分组重做（当前只有一个知识点，取第一组）
      const kpId = Object.keys(byKP)[0];
      const f = findKP(kpId);
      app.innerHTML = `<h1>📕 错题重做</h1><div id="redoBox"></div>`;
      runSession(f.kp, $('#redoBox'), { mode: 'redo', questions: shown.filter(w => w.kp === kpId).map(w => w.q) });
    };
    $('#clearAll').onclick = () => { if (confirm('确定清空错题本吗？')) { Store.clearWrong(); updateWrongBadge(); renderWrong(); } };
    app.querySelectorAll('[data-del]').forEach(b => b.onclick = () => { Store.removeWrong(b.dataset.del); updateWrongBadge(); renderWrong(); });
    app.querySelectorAll('[data-explain]').forEach(b => b.onclick = () => { const w = list.find(x => x.q.id === b.dataset.explain); const qv = questionView(w.q); if (qv.explainKind) showExplain(qv.explainKind, qv.n); else alert('这道题没有分步讲解'); });
  }

  // ---------- 进度 ----------
  function renderStats() {
    setNav('stats');
    const st = Store.stats();
    let rows = '';
    for (const n of LEVELS) { if (!levelReady(n)) continue; rows += `<h3 class="lv-head">Level ${n}</h3>`;
      for (const u of DATA.levels[n].units) for (const k of u.kps) if (k.available) {
        const s = kpStars(k);
        rows += `<div class="wrong-item"><div><div class="wrong-q"><a href="${kpHref(k)}">Unit ${u.num} · ${esc(k.title.zh)}</a></div><div class="wrong-meta">完成 ${s.done}/${s.total} ｜ 答对 ${s.right}</div></div><div class="stars">${starsHTML(s.stars)}</div></div>`;
      } }
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
    if (parts[0] === 'kp') { location.replace('#/L2/' + parts.join('/')); return; }   // 旧链接 → Level 2
    const lm = /^L(\d)$/.exec(parts[0]);
    if (lm) { const n = +lm[1]; if (parts[1] === 'kp') return renderKP(parts[2], parts[3], parts[4]); return renderLevel(n); }
    if (parts[0] === 'wrong') return renderWrong();
    if (parts[0] === 'stats') return renderStats();
    renderHome();
  }
  window.addEventListener('hashchange', route);
  updateWrongBadge();
  route();
})();
