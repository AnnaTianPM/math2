/* Level 4 · Unit 4  多步应用题：数据驱动的分步讲解 l4steps */
(function () {
  const line = t => `<div class="expand-line">${t}</div>`;
  const wrap = (...parts) => `<div class="l1wrap">${parts.join('')}</div>`;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const S = window.StepKinds;
  /* l4steps：{en, zh, bar?(html), read?{zh,en}, steps:[{zh, en?, expr}], sentence:{zh,en}, ans} */
  S.l4steps = q => {
    const text = `<div class="wp-text"><div class="wp-en">${esc(q.en)}</div><div class="wp-zh">${esc(q.zh)}</div></div>`;
    const bar = q.bar ? `<div class="center">${q.bar}</div>` : '';
    const out = [{ zh: '先读题：找出已知的数，看清楚问的是什么。', en: 'Read the problem. What is given? What is asked?', render: s => { s.innerHTML = wrap(text); } }];
    if (q.read) out.push({ zh: q.read.zh, en: q.read.en || '', render: s => { s.innerHTML = wrap(text, bar); } });
    const lines = [];
    q.steps.forEach((st, i) => { lines.push(st.expr); const snap = lines.slice(); out.push({ zh: `${q.steps.length > 1 ? `第 ${i + 1} 步：` : ''}${st.zh}`, en: st.en || st.expr, render: s => { s.innerHTML = wrap(bar, ...snap.map((l, j) => line(j === snap.length - 1 ? `<b>${l}</b>` : l))); } }); });
    out.push({ zh: `写答句：${esc(q.sentence.zh).replace('___', `<b>${q.ans}</b>`)}`, en: q.sentence.en.replace('___', String(q.ans)), render: s => { s.innerHTML = wrap(bar, ...lines.map(l => line(l)), `<div class="expand-line" style="color:#1a7f37">${esc(q.sentence.en).replace('___', `<b>${q.ans}</b>`)}</div>`); } });
    return out;
  };
})();
