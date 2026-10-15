/* Level 5 · Unit 12  速率：单位法（先求 1 个单位的量） 讲解动画 */
(function () {
  const line = t => `<div class="expand-line">${t}</div>`;
  const wrap = (...parts) => `<div class="l1wrap">${parts.join('')}</div>`;
  const S = window.StepKinds;
  const arrow = (l, r, hl) => `<div class="expand-line" style="font-size:26px">${l} <span style="color:#ff7f2a">→</span> ${hl ? `<b style="color:#ff7f2a">${r}</b>` : r}</div>`;
  /* l5rate：{a, ua, b, ub, c, r, res, rExpr?, resExpr?, note?}
   * a ua → b ub；1 ua → b ÷ a = r ub；c ua → c × r = res ub */
  S.l5rate = ({ a, ua, b, ub, c, r, res, rExpr, resExpr, note }) => { const steps = [
    { zh: `rate（速率）就是"每 1 个单位对应多少"。题目告诉我们：<b>${a} ${ua} → ${b} ${ub}</b>。${note || ''}`, en: `${a} ${ua} → ${b} ${ub}.`, render: s => { s.innerHTML = wrap(arrow(`${a} ${ua}`, `${b} ${ub}`)); } },
    { zh: `先求 <b>1 ${ua}</b> 对应多少：把 ${b} 平均分成 ${a} 份，${rExpr || `${b} ÷ ${a}`} = <b>${r} ${ub}</b>。`, en: `1 ${ua} → ${b} ÷ ${a} = ${r} ${ub}.`, render: s => { s.innerHTML = wrap(arrow(`${a} ${ua}`, `${b} ${ub}`), arrow(`1 ${ua}`, `${rExpr || `${b} ÷ ${a}`} = ${r} ${ub}`, true)); } },
  ]; if (c !== undefined) steps.push({ zh: `再求 <b>${c} ${ua}</b>：1 ${ua} 是 ${r} ${ub}，${c} ${ua} 就是 ${resExpr || `${c} × ${r}`} = <b>${res} ${ub}</b>。`, en: `${c} ${ua} → ${c} × ${r} = ${res} ${ub}.`, render: s => { s.innerHTML = wrap(arrow(`1 ${ua}`, `${r} ${ub}`), arrow(`${c} ${ua}`, `${resExpr || `${c} × ${r}`} = ${res} ${ub}`, true)); } }); return steps; };
})();
