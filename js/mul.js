/* 乘除法：图片组渲染 + 讲解动画 (mulgroups, mulfact, commute, divshare, divgroup, factfam) */
(function () {
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ---------- 图片 ---------- */
  // groups 组，每组 each 个 emoji；opts.hl 高亮前 n 组；opts.cross 划掉
  function groupsHTML(groups, each, emoji, opts = {}) {
    const hl = opts.hl === undefined ? -1 : opts.hl;
    const perRow = each >= 8 ? 4 : each >= 5 ? 5 : 6;
    let s = `<div class="pic-groups">`;
    for (let g = 0; g < groups; g++) {
      s += `<div class="pic-group ${g < hl ? 'on' : ''} ${opts.circle ? 'circle' : ''}" style="--per:${Math.min(each, perRow)}">${Array.from({ length: each }, () => `<span class="pic-item">${emoji}</span>`).join('')}${opts.label ? `<span class="pic-label">${each}</span>` : ''}</div>`;
    }
    return s + '</div>';
  }
  // 散放的 total 个（分组前）
  function looseHTML(total, emoji, opts = {}) {
    const on = opts.on || 0;
    return `<div class="pic-loose">${Array.from({ length: total }, (_, i) => `<span class="pic-item ${i < on ? 'on' : ''}">${emoji}</span>`).join('')}</div>`;
  }
  // 阵列 rows × cols；opts.by = 'row' | 'col' 高亮方式，opts.n 高亮几行/列
  function arrayHTML(rows, cols, emoji, opts = {}) {
    let s = `<div class="pic-array" style="grid-template-columns: repeat(${cols}, auto)">`;
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const on = opts.by === 'row' ? r < (opts.n || 0) : opts.by === 'col' ? c < (opts.n || 0) : false;
      s += `<span class="pic-item ${on ? 'on' : ''}">${emoji}</span>`;
    }
    return s + '</div>';
  }
  const line = t => `<div class="expand-line">${t}</div>`;
  function numRow(nums, hl) {
    return `<div class="numrow"><div class="numrow-boxes">${nums.map((n, i) => `<span class="nbox ${i < hl ? 'on' : ''}">${n}</span>`).join('')}</div></div>`;
  }

  /* ---------- 讲解 ---------- */
  // 等组：groups 组，每组 each
  window.StepKinds.mulgroups = ({ groups, each, emoji, noun }) => {
    const total = groups * each;
    const adds = Array(groups).fill(each).join(' + ');
    const steps = [
      { zh: `看图：一共有 <b>${groups}</b> 组，每组有 <b>${each}</b> 个${noun ? noun : ''}。`, en: `There are ${groups} groups. Each group has ${each}.`, render: s => { s.innerHTML = groupsHTML(groups, each, emoji, { label: true }); } },
    ];
    // 逐组加
    for (let g = 1; g <= groups; g++) {
      const sum = g * each;
      if (groups > 5 && g > 2 && g < groups) continue;
      steps.push({ zh: g === 1 ? `第 1 组：${each}` : `${g === groups && groups > 5 ? '一直加到第' : '第'} ${g} 组：${Array(g).fill(each).join(' + ')} = <b>${sum}</b>`, en: `${g} group${g > 1 ? 's' : ''}: ${Array(g).fill(each).join(' + ')} = ${sum}`, render: s => { s.innerHTML = groupsHTML(groups, each, emoji, { hl: g, label: true }) + line(`${Array(g).fill(each).join(' + ')} = ${sum}`); } });
    }
    steps.push({ zh: `${groups} 个 ${each} 加起来是 ${total}。用乘法写就是：<b>${groups} × ${each} = ${total}</b>（${groups} ${each}s = ${total}）。`, en: `${groups} ${each}s = ${total}. We write ${groups} × ${each} = ${total}.`, render: s => { s.innerHTML = groupsHTML(groups, each, emoji, { hl: groups, label: true }) + line(`${adds} = ${total}<br>${groups} × ${each} = ${total}`); } });
    return steps;
  };

  // 乘法口诀：a × b（跳着数 + 5/10 的巧算）
  window.StepKinds.mulfact = ({ a, b, base }) => {
    const total = a * b;
    const seq = Array.from({ length: a }, (_, i) => (i + 1) * b);
    const steps = [
      { zh: `${a} × ${b} 就是 ${a} 个 ${b} 加起来。我们 ${b} 个 ${b} 个地数：`, en: `${a} × ${b} means ${a} groups of ${b}. Count in ${b}s:`, render: s => { s.innerHTML = groupsHTML(a, b, '🔵') + numRow(seq, 0); } },
      { zh: seq.join('，') + `。数了 ${a} 次，到 <b>${total}</b>。`, en: seq.join(', ') + `. So ${a} × ${b} = ${total}.`, render: s => { s.innerHTML = groupsHTML(a, b, '🔵', { hl: a }) + numRow(seq, a); } },
    ];
    if (base === undefined && a !== 5 && a !== 10 && a > 1) base = a >= 8 ? 10 : 5;
    if (base && base !== a) {
      const rest = a - base, more = rest > 0;
      const baseSeq = Array.from({ length: Math.max(a, base) }, (_, i) => (i + 1) * b);
      steps.push({ zh: `巧算：先记住 ${base} × ${b} = ${base * b}。${a} 比 ${base} ${more ? '多' : '少'} ${Math.abs(rest)}，所以${more ? '再加' : '再减'} ${Math.abs(rest)} 个 ${b}：${base * b} ${more ? '+' : '−'} ${Math.abs(rest) * b} = <b>${total}</b>。`, en: `${base} × ${b} = ${base * b}. ${more ? 'Add' : 'Take away'} ${Math.abs(rest)} ${b}s: ${base * b} ${more ? '+' : '−'} ${Math.abs(rest) * b} = ${total}.`, render: s => { s.innerHTML = numRow(baseSeq, base) + line(`${base} × ${b} = ${base * b}<br>${base * b} ${more ? '+' : '−'} ${Math.abs(rest) * b} = ${total}`); } });
    }
    steps.push({ zh: `所以 <b>${a} × ${b} = ${total}</b>。`, en: `So ${a} × ${b} = ${total}.`, render: s => { s.innerHTML = line(`${a} × ${b} = ${total}`); } });
    return steps;
  };

  // 交换律：rows × cols 的阵列
  window.StepKinds.commute = ({ rows, cols, emoji }) => {
    const total = rows * cols;
    return [
      { zh: `这些东西排成了 ${rows} 行 ${cols} 列。`, en: `${rows} rows and ${cols} columns.`, render: s => { s.innerHTML = arrayHTML(rows, cols, emoji); } },
      { zh: `一行一行数：每行 ${cols} 个，有 ${rows} 行，<b>${rows} × ${cols} = ${total}</b>。`, en: `Count by rows: ${rows} rows of ${cols}. ${rows} × ${cols} = ${total}.`, render: s => { s.innerHTML = arrayHTML(rows, cols, emoji, { by: 'row', n: rows }) + line(`${rows} × ${cols} = ${total}`); } },
      { zh: `一列一列数：每列 ${rows} 个，有 ${cols} 列，<b>${cols} × ${rows} = ${total}</b>。`, en: `Count by columns: ${cols} columns of ${rows}. ${cols} × ${rows} = ${total}.`, render: s => { s.innerHTML = arrayHTML(rows, cols, emoji, { by: 'col', n: cols }) + line(`${cols} × ${rows} = ${total}`); } },
      { zh: `两种数法结果一样！所以 <b>${rows} × ${cols} = ${cols} × ${rows} = ${total}</b>。乘法交换两个数的位置，答案不变。`, en: `${rows} × ${cols} = ${cols} × ${rows}. Multiply in any order, the answer is the same.`, render: s => { s.innerHTML = arrayHTML(rows, cols, emoji) + line(`${rows} × ${cols} = ${cols} × ${rows} = ${total}`); } },
    ];
  };

  // 平均分：total 个分成 groups 组
  window.StepKinds.divshare = ({ total, groups, emoji, noun }) => {
    const each = total / groups;
    const steps = [
      { zh: `有 ${total} 个${noun || ''}，要平均分成 <b>${groups}</b> 组（每组一样多）。`, en: `Divide ${total} into ${groups} equal groups.`, render: s => { s.innerHTML = looseHTML(total, emoji); } },
      { zh: `一个一个轮流放：先每组放 1 个……`, en: 'Put one in each group, then another one...', render: s => { s.innerHTML = groupsHTML(groups, 1, emoji, { circle: true }) + `<div class="sub center">还剩 ${total - groups} 个</div>`; } },
    ];
    if (each > 2) steps.push({ zh: `再每组放 1 个……一直放到没有剩下的。`, en: 'Keep going until nothing is left.', render: s => { s.innerHTML = groupsHTML(groups, 2, emoji, { circle: true }) + `<div class="sub center">还剩 ${total - 2 * groups} 个</div>`; } });
    steps.push({ zh: `分完了：每组有 <b>${each}</b> 个。`, en: `Each group has ${each}.`, render: s => { s.innerHTML = groupsHTML(groups, each, emoji, { circle: true, label: true, hl: groups }); } });
    steps.push({ zh: `用除法写：<b>${total} ÷ ${groups} = ${each}</b>。可以用乘法检查：${groups} × ${each} = ${total} ✔`, en: `${total} ÷ ${groups} = ${each}. Check: ${groups} × ${each} = ${total}.`, render: s => { s.innerHTML = groupsHTML(groups, each, emoji, { circle: true, label: true }) + line(`${total} ÷ ${groups} = ${each}`); } });
    return steps;
  };

  // 按每组几个分：total 个，每组 each
  window.StepKinds.divgroup = ({ total, each, emoji, noun }) => {
    const groups = total / each;
    const steps = [
      { zh: `有 ${total} 个${noun || ''}，每 <b>${each}</b> 个一组，能分成几组？`, en: `Divide ${total} into groups of ${each}.`, render: s => { s.innerHTML = looseHTML(total, emoji); } },
      { zh: `每 ${each} 个圈一圈……`, en: `Circle ${each} at a time...`, render: s => { s.innerHTML = groupsHTML(groups, each, emoji, { circle: true, hl: 1 }); } },
      { zh: `圈完了，数一数有 <b>${groups}</b> 圈。`, en: `There are ${groups} groups.`, render: s => { s.innerHTML = groupsHTML(groups, each, emoji, { circle: true, hl: groups }); } },
      { zh: `用除法写：<b>${total} ÷ ${each} = ${groups}</b>。检查：${groups} × ${each} = ${total} ✔`, en: `${total} ÷ ${each} = ${groups}. Check: ${groups} × ${each} = ${total}.`, render: s => { s.innerHTML = groupsHTML(groups, each, emoji, { circle: true }) + line(`${total} ÷ ${each} = ${groups}`); } },
    ];
    return steps;
  };

  // 乘除法一家：a × b = t
  window.StepKinds.factfam = ({ a, b, emoji }) => {
    const t = a * b, e = emoji || '🟣';
    const eqs = [`${a} × ${b} = ${t}`, `${b} × ${a} = ${t}`, `${t} ÷ ${a} = ${b}`, `${t} ÷ ${b} = ${a}`];
    const show = n => line(eqs.slice(0, n).join('<br>'));
    return [
      { zh: `${a}、${b}、${t} 这三个数是一家人，可以写出 4 个算式。先看图：${a} 行，每行 ${b} 个。`, en: `${a}, ${b} and ${t} make a fact family: 4 equations.`, render: s => { s.innerHTML = arrayHTML(a, b, e); } },
      { zh: `一行一行数：<b>${eqs[0]}</b>`, en: eqs[0], render: s => { s.innerHTML = arrayHTML(a, b, e, { by: 'row', n: a }) + show(1); } },
      { zh: `一列一列数：<b>${eqs[1]}</b>`, en: eqs[1], render: s => { s.innerHTML = arrayHTML(a, b, e, { by: 'col', n: b }) + show(2); } },
      { zh: `反过来，${t} 个分成 ${a} 组，每组 ${b} 个：<b>${eqs[2]}</b>`, en: eqs[2], render: s => { s.innerHTML = arrayHTML(a, b, e, { by: 'row', n: a }) + show(3); } },
      { zh: `${t} 个分成 ${b} 组，每组 ${a} 个：<b>${eqs[3]}</b>`, en: eqs[3], render: s => { s.innerHTML = arrayHTML(a, b, e, { by: 'col', n: b }) + show(4); } },
      { zh: `记住：乘法算式里的积（${t}），就是除法算式里被除的数。`, en: 'The product in multiplication is the number being divided.', render: s => { s.innerHTML = show(4); } },
    ];
  };

  window.MulUI = { groupsHTML, looseHTML, arrayHTML };
})();
