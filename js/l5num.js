/* Level 5 · Unit 1  1000 万以内的数：七列圆片、数位表、读写、拆分 讲解动画 */
(function () {
  const line = t => `<div class="expand-line">${t}</div>`;
  const wrap = (...parts) => `<div class="l1wrap">${parts.join('')}</div>`;
  const NW = window.NumWords || NumWords;
  const K = ['m', 'ht', 'tt', 'th', 'h', 't', 'o'], VAL = { m: 1000000, ht: 100000, tt: 10000, th: 1000, h: 100, t: 10, o: 1 };
  const ZH = { m: '百万位', ht: '十万位', tt: '万位', th: '千位', h: '百位', t: '十位', o: '个位' };
  const EN = { m: 'millions', ht: 'hundred thousands', tt: 'ten thousands', th: 'thousands', h: 'hundreds', t: 'tens', o: 'ones' };
  const CSS = { m: '#d35400', ht: '#2980b9', tt: 'var(--tenth)', th: 'var(--thou)', h: 'var(--hund)', t: 'var(--tens)', o: 'var(--ones)' };
  const col = (k, s) => `<b style="color:${CSS[k]}">${s}</b>`;
  const split = n => { const v = {}; K.forEach(k => { v[k] = Math.floor(n / VAL[k]) % 10; }); if (n >= 10000000) v.m = Math.floor(n / 1000000); return v; };
  const fmt = n => { const s = String(Math.abs(n)); return (n < 0 ? '−' : '') + (s.length > 4 ? s.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : s); };
  const cls = k => `d${VAL[k]}`;
  /* 七列圆片（书上 D 的样子，每列竖排） */
  function discs(n, o = {}) {
    const v = split(n), on = o.on || {};
    return `<div class="discs seven">${K.map(k => `<div class="dcol ${o.hl === k ? 'hl' : ''}">${Array.from({ length: v[k] }, (_, i) => `<span class="disc ${cls(k)} ${on[k] !== undefined && i < on[k] ? 'on' : ''}">${fmt(VAL[k])}</span>`).join('')}</div>`).join('')}</div>`;
  }
  const discrow = (unit, count, on) => `<div class="discrow">${Array.from({ length: count }, (_, i) => `<span class="disc d${unit} ${on !== undefined && i < on ? 'on' : ''}">${fmt(unit)}</span>`).join('')}</div>`;
  function pv(n, o = {}) {
    const v = n === null ? null : split(n), ks = o.keys || K.filter((k, i) => v === null || v[k] || K.slice(i + 1).some(kk => v[kk]) || k === 'o');
    const short = { m: 'M', ht: 'HTh', tt: 'TTh', th: 'Th', h: 'H', t: 'T', o: 'O' };
    return `<table class="pv4 seven"><tr>${ks.map(k => `<th title="${EN[k]}">${short[k]}<br><small>${EN[k]}</small></th>`).join('')}</tr><tr>${ks.map(k => `<td style="color:${CSS[k]}" class="${o.hl === k ? 'hl' : ''} ${v === null || (o.blank && o.blank.includes(k)) ? 'blankc' : ''}">${v === null || (o.blank && o.blank.includes(k)) ? '?' : v[k]}</td>`).join('')}</tr></table>`;
  }
  const big = (n, hl) => { const v = split(n), ks = K.filter((k, i) => v[k] || K.slice(0, i).some(kk => v[kk])); return `<div class="bignum">${ks.map((k, i) => `<span class="d" style="color:${CSS[k]};${hl && hl !== k ? 'opacity:.3;' : ''}${(k === 'th' || k === 'm') && i < ks.length - 1 ? 'margin-right:12px' : ''}">${v[k]}</span>`).join('')}</div>`; };
  const numRow = (nums, o = {}) => `<div class="numrow">${o.label ? `<div class="numrow-label">${o.label}</div>` : ''}<div class="numrow-boxes">${nums.map((n, i) => `<span class="nbox ${(o.hl || []).includes(i) ? 'on' : ''} ${n === null ? 'blank' : ''}">${n === null ? '?' : fmt(n)}</span>`).join('')}</div></div>`;
  const S = window.StepKinds;
  const UNAME = { 10000: ['万', 'ten thousands'], 100000: ['十万', 'hundred thousands'], 1000000: ['百万', 'millions'] };
  /* l5skip：{unit, count} */
  S.l5skip = ({ unit, count }) => { const chain = Array.from({ length: count }, (_, i) => (i + 1) * unit), [zh, en] = UNAME[unit]; return [
    { zh: `每个圆片都是 <b>${fmt(unit)}</b>（${zh}），一共 ${count} 个。一个一个数，每数一个加 ${fmt(unit)}。`, en: `Each disc is ${fmt(unit)}. Count in ${en}.`, render: s => { s.innerHTML = wrap(`<div class="center">${discrow(unit, count)}</div>`); } },
    { zh: `${chain.map(fmt).join('、')}。`, en: chain.map(fmt).join(', '), render: s => { s.innerHTML = wrap(`<div class="center">${discrow(unit, count, count)}</div>`, line(chain.map(fmt).join(', '))); } },
    { zh: `${count} 个${zh}是 <b>${fmt(count * unit)}</b>${count * unit === 1000000 ? '（一百万，one million）' : count * unit === 10000000 ? '（一千万，ten million）' : ''}。`, en: `${count} ${en} make ${fmt(count * unit)}.`, render: s => { s.innerHTML = wrap(line(`${count} × ${fmt(unit)} = ${fmt(count * unit)}`)); } },
  ]; };
  /* l5count：七列圆片 {n} */
  S.l5count = ({ n }) => { const v = split(n); let run = 0; const steps = [{ zh: `一列一列数：先数 <b>1 000 000</b> 的，再数 100 000、10 000、1000、100、10、1 的。`, en: 'Count each column from the millions down to the ones.', render: s => { s.innerHTML = wrap(`<div class="center">${discs(n)}</div>`); } }];
    K.forEach(k => { if (!v[k]) { steps.push({ zh: `${ZH[k]}这一列是空的，写 0。`, en: `No ${EN[k]}: 0.`, render: s => { s.innerHTML = wrap(`<div class="center">${discs(n, { hl: k })}</div>`, pv(n, { blank: K.slice(K.indexOf(k) + 1) })); } }); return; } const start = run; run += v[k] * VAL[k]; steps.push({ zh: `${v[k]} 个 ${fmt(VAL[k])} = ${fmt(v[k] * VAL[k])}${start ? `，加上前面的 ${fmt(start)} 是 ${fmt(run)}` : ''}。${ZH[k]}写 ${col(k, v[k])}。`, en: `${v[k]} ${EN[k]} = ${fmt(v[k] * VAL[k])}.`, render: s => { s.innerHTML = wrap(`<div class="center">${discs(n, { hl: k, on: { [k]: v[k] } })}</div>`, pv(n, { hl: k, blank: K.slice(K.indexOf(k) + 1) }), line(fmt(run))); } }); });
    steps.push({ zh: `所以是 <b>${fmt(n)}</b>。写的时候每三位空一格。`, en: `${fmt(n)}.`, render: s => { s.innerHTML = wrap(`<div class="center">${big(n)}</div>`, pv(n), line(fmt(n))); } });
    return steps; };
  /* 段：millions / thousands / rest */
  const segs = n => ({ m: Math.floor(n / 1000000), t: Math.floor(n / 1000) % 1000, r: n % 1000 });
  /* l5words：数字 → 英文 {n} */
  S.l5words = ({ n }) => { const { m, t, r } = segs(n), w = NW.toWords(n); const parts = []; if (m) parts.push([`${NW.toWords(m)} million`, `百万段：${m} → <b>${NW.toWords(m)} million</b>`]); if (t) parts.push([`${NW.toWords(t)} thousand`, `千段：${t} → <b>${NW.toWords(t)} thousand</b>`]); else parts.push(['', '千段是 000，不用说 thousand']); if (r) parts.push([NW.toWords(r), `最后三位：${r} → <b>${NW.toWords(r)}</b>`]); else parts.push(['', '最后三位是 000，后面不用说了']); const hl = ['m', 'th', 'h'];
    return [{ zh: `七位数<b>三位一段</b>：百万段、千段、最后三位。${fmt(n)} 分成 ${m} | ${String(t).padStart(3, '0')} | ${String(r).padStart(3, '0')}，每段按三位数读，再加上 million / thousand。`, en: 'Read in groups of three: million, thousand, and the rest.', render: s => { s.innerHTML = wrap(`<div class="center">${big(n)}</div>`, pv(n)); } }].concat(parts.map((p, i) => ({ zh: p[1] + '。', en: p[0] || '', render: s => { s.innerHTML = wrap(`<div class="center">${big(n, hl[i])}</div>`, line(parts.slice(0, i + 1).map(x => x[0]).filter(Boolean).join(', '))); } })), [{ zh: `连起来：<b>${w}</b>（${NW.toZh(n)}）。段和段之间用逗号，最后一段前面没有 and 就用 and。`, en: w, render: s => { s.innerHTML = wrap(`<div class="center">${big(n)}</div>`, line(w)); } }]); };
  /* l5read：英文 → 数字 {n} */
  S.l5read = ({ n }) => { const { m, t, r } = segs(n), w = NW.toWords(n); const hlw = part => `<div class="center" style="font-size:20px;font-weight:700">${part ? w.replace(part, `<mark>${part}</mark>`) : w}</div>`;
    return [
      { zh: `找 <b>million</b> 前面的词：${m ? `<b>${NW.toWords(m)}</b> = ${m}，百万位写 ${col('m', m)}` : '没有 million，百万位是 0'}。`, en: m ? `${NW.toWords(m)} million → ${m}.` : 'No million.', render: s => { s.innerHTML = wrap(hlw(m ? `${NW.toWords(m)} million` : ''), pv(n, { keys: K, blank: K.slice(1), hl: 'm' })); } },
      { zh: `找 <b>thousand</b> 前面的词：${t ? `<b>${NW.toWords(t)}</b> = ${t}，写在千段三位 ${String(t).padStart(3, '0')}（不够三位前面补 0）` : '没有 thousand，千段写 000'}。`, en: t ? `${NW.toWords(t)} thousand → ${String(t).padStart(3, '0')}.` : 'No thousand: 000.', render: s => { s.innerHTML = wrap(hlw(t ? `${NW.toWords(t)} thousand` : ''), pv(n, { keys: K, blank: K.slice(4), hl: 'th' })); } },
      { zh: `剩下的词：${r ? `<b>${NW.toWords(r)}</b> = ${r}，写在最后三位 ${String(r).padStart(3, '0')}` : '没有了，最后三位写 000'}。`, en: r ? `${NW.toWords(r)} → ${String(r).padStart(3, '0')}.` : 'Nothing left: 000.', render: s => { s.innerHTML = wrap(hlw(r ? NW.toWords(r) : ''), pv(n, { keys: K, hl: 'h' })); } },
      { zh: `合起来：<b>${fmt(n)}</b>。`, en: fmt(n), render: s => { s.innerHTML = wrap(`<div class="center">${big(n)}</div>`, line(fmt(n))); } },
    ]; };
  /* l5expand：{n, parts:[numbers with null for missing]} */
  S.l5expand = ({ n, parts }) => { const mi = parts.indexOf(null), others = parts.filter(x => x !== null), sum = others.reduce((a, b) => a + b, 0), miss = n - sum; const v = split(n); const vals = K.filter(k => v[k]).map(k => fmt(v[k] * VAL[k]));
    return [
      { zh: `${fmt(n)} 每一位的值：${K.filter(k => v[k]).map(k => `${col(k, v[k])} → ${fmt(v[k] * VAL[k])}`).join('，')}。`, en: 'Value of each digit.', render: s => { s.innerHTML = wrap(`<div class="center">${big(n)}</div>`, pv(n), line(`${fmt(n)} = ${vals.join(' + ')}`)); } },
      { zh: `题目已经给了 ${others.map(fmt).join(' + ')}${others.length > 1 ? ` = ${fmt(sum)}` : ''}，空格 = ${fmt(n)} − ${fmt(sum)} = <b>${fmt(miss)}</b>。${others.some(x => x % 10 !== 0 && x > 9 && String(x).replace(/0+$/, '').length > 1) || miss !== vals.map(x => +x.replace(/ /g, '')).find(x => x === miss) ? '（题目把几位合在一起写了，照样用减法）' : ''}`, en: `${fmt(n)} − ${fmt(sum)} = ${fmt(miss)}.`, render: s => { s.innerHTML = wrap(line(`${fmt(n)} = ${parts.map(x => x === null ? `<b style="color:#ff7f2a">${fmt(miss)}</b>` : fmt(x)).join(' + ')}`), line(`${fmt(n)} − ${fmt(sum)} = ${fmt(miss)}`)); } },
    ]; };
  window.L5 = { discs, discrow, pv, big, split, fmt, K, VAL, numRow };
})();
