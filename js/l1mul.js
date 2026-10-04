/* Level 1 · Unit 14 乘法：重复加同一个数、几个几、乘法算式、应用题 讲解动画 */
(function () {
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '"': '&quot;', '>': '&gt;' }[c]));
  const line = t => `<div class="expand-line">${t}</div>`;
  const wrap = (...parts) => `<div class="l1wrap">${parts.join('')}</div>`;
  const M = window.MulUI;
  const WORDS = { 1: 'ones', 2: 'twos', 3: 'threes', 4: 'fours', 5: 'fives', 6: 'sixes', 7: 'sevens', 8: 'eights', 9: 'nines', 10: 'tens' };
  const eqm = (g, e, t, hl) => `<div class="eqline"><span class="eq-s ${hl === 'g' ? 'hl' : ''}">${g}</span> × <span class="eq-s ${hl === 'e' ? 'hl' : ''}">${e}</span> = <span class="eq-s ${hl === 't' ? 'hl' : ''}">${t}</span></div>`;

  const S = window.StepKinds;
  /* l1addsame：groups 组每组 each，加法 + “n eachs” {groups, each, icon, noun, countFirst} */
  S.l1addsame = ({ groups, each, icon, noun, countFirst }) => {
    const total = groups * each, pic = o => `<div class="center">${M.groupsHTML(groups, each, icon, o)}</div>`;
    const steps = [];
    if (countFirst) steps.push({ zh: `先数一数<b>一个</b>有几${noun ? '个' + noun : '个'}：<b>${each}</b>。`, en: `Count one: ${each}.`, render: s => { s.innerHTML = wrap(pic({ hl: 1, label: true })); } });
    steps.push({ zh: `一共 <b>${groups}</b> 组，每组都是 <b>${each}</b>，一样多。`, en: `${groups} groups of ${each}.`, render: s => { s.innerHTML = wrap(pic({ label: true })); } });
    for (let g = 1; g <= groups; g++) {
      if (groups > 5 && g > 2 && g < groups) continue;
      const sum = g * each, txt = `${Array(g).fill(each).join(' + ')} = ${sum}`;
      steps.push({ zh: g === 1 ? `第 1 组：${each}。` : `${groups > 5 && g === groups ? '一直加到第' : '第'} ${g} 组：${txt}。`, en: txt, render: s => { s.innerHTML = wrap(pic({ hl: g, label: true }), line(txt)); } });
    }
    steps.push({ zh: `${groups} 个 ${each} 加起来是 <b>${total}</b>。英文说 <b>${groups} ${WORDS[each]} = ${total}</b>（${groups} 个 ${each}）。`, en: `${groups} ${WORDS[each]} = ${total}.`, render: s => { s.innerHTML = wrap(pic({ hl: groups, label: true }), line(`${Array(groups).fill(each).join(' + ')} = ${total}`), line(`${groups} ${WORDS[each]} = ${total}`)); } });
    return steps;
  };
  /* l1mul：groups × each {groups, each, icon, noun, adds:bool} */
  S.l1mul = ({ groups, each, icon, noun, adds }) => {
    const total = groups * each, pic = o => `<div class="center">${M.groupsHTML(groups, each, icon, o)}</div>`;
    const steps = [
      { zh: `数一数有几组：<b>${groups}</b> 组（${groups} groups）。`, en: `${groups} groups.`, render: s => { s.innerHTML = wrap(pic({ hl: groups })); } },
      { zh: `每组有几${noun ? '个' + noun : '个'}：<b>${each}</b>（${each} in each group）。`, en: `${each} in each group.`, render: s => { s.innerHTML = wrap(pic({ hl: 1, label: true })); } },
    ];
    if (adds) steps.push({ zh: `加法：${Array(groups).fill(each).join(' + ')} = <b>${total}</b>。`, en: `${Array(groups).fill(each).join(' + ')} = ${total}.`, render: s => { s.innerHTML = wrap(pic({ hl: groups, label: true }), line(`${Array(groups).fill(each).join(' + ')} = ${total}`)); } });
    steps.push({ zh: `${groups} 组，每组 ${each}，用乘法写：<b>${groups} × ${each} = ${total}</b>。× 读作“乘”，意思是“${groups} 个 ${each}”。`, en: `${groups} × ${each} = ${total}.`, render: s => { s.innerHTML = wrap(pic({ hl: groups, label: true }), eqm(groups, each, total, 't')); } });
    return steps;
  };
  /* l1mulword：应用题 {en, zh, groups, each, icon, sentence} */
  S.l1mulword = ({ en, zh, groups, each, icon, sentence }) => {
    const total = groups * each, text = `<div class="wp-text"><div class="wp-en">${esc(en)}</div><div class="wp-zh">${esc(zh)}</div></div>`;
    const pic = o => `<div class="center">${M.groupsHTML(groups, each, icon, o)}</div>`;
    return [
      { zh: `读题：有 <b>${groups}</b> 个（组），每个里面 <b>${each}</b> 个，问一共多少。几个几，用<b>乘法</b>。`, en: 'Groups of equal size: multiply.', render: s => { s.innerHTML = wrap(text); } },
      { zh: `画一画：${groups} 组，每组 ${each}。`, en: `${groups} groups of ${each}.`, render: s => { s.innerHTML = wrap(pic({ label: true }), eqm(groups, each, '?')); } },
      { zh: `<b>${groups} × ${each} = ${total}</b>（${Array(groups).fill(each).join(' + ')} = ${total}）。`, en: `${groups} × ${each} = ${total}.`, render: s => { s.innerHTML = wrap(pic({ hl: groups, label: true }), eqm(groups, each, total, 't')); } },
      { zh: `答：${esc(sentence).replace('___', `<b>${total}</b>`)}`, en: sentence.replace('___', String(total)), render: s => { s.innerHTML = wrap(eqm(groups, each, total, 't'), line(esc(sentence).replace('___', `<b>${total}</b>`))); } },
    ];
  };
  window.L1.MULWORDS = WORDS;
})();
