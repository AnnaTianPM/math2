/* 数字 <-> 英文单词 */
const NumWords = (() => {
  const ones = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
    'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  const zh = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];

  // 0-99 的英文
  function under100(n) {
    if (n < 20) return ones[n];
    const t = Math.floor(n / 10), o = n % 10;
    return o ? `${tens[t]}-${ones[o]}` : tens[t];
  }
  // 0-1000 的英文（英式：three hundred and twenty-one）
  const seg = n => { const h = Math.floor(n / 100), r = n % 100; return h ? `${ones[h]} hundred${r ? ' and ' + under100(r) : ''}` : under100(r); };
  // 0-9 999 999 的英文（英式）：段与段之间用逗号，最后一段若不含 and 则用 and 连接
  function toWords(n) {
    if (n < 1000) return seg(n);
    const m = Math.floor(n / 1000000), t = Math.floor(n / 1000) % 1000, r = n % 1000, list = [];
    if (m) list.push(`${seg(m)} million`); if (t) list.push(`${seg(t)} thousand`); if (r) list.push(seg(r));
    return list.map((x, i) => i === 0 ? x : (i === list.length - 1 && !x.includes(' and ') ? ' and ' : ', ') + x).join('');
  }
  // 拆成三部分，用于分步讲解：{h:'three hundred', and:'and', t:'twenty', o:'one', rest:'twenty-one'}
  function parts(n) {
    if (n === 1000) return { h: 'one thousand', rest: '' };
    const h = Math.floor(n / 100), r = n % 100;
    return { h: h ? `${ones[h]} hundred` : '', rest: r ? under100(r) : '' };
  }
  // 中文读法
  function toZh(n) {
    if (n >= 10000) { const w = Math.floor(n / 10000), rest = n % 10000; const ws = w < 10 ? zh[w] : w === 10 ? '十' : w < 20 ? '十' + zh[w % 10] : toZh(w); return ws + '万' + (rest ? (rest < 1000 ? '零' + toZh(rest) : toZh(rest)) : ''); }
    if (n >= 1000) { const th = Math.floor(n / 1000), rest = n % 1000; if (!rest) return zh[th] + '千'; const r = toZh(rest); return zh[th] + '千' + (rest < 100 ? '零' + r.replace(/^一十/, '一十') : r); }
    if (n === 1000) return '一千';
    const h = Math.floor(n / 100), t = Math.floor(n / 10) % 10, o = n % 10;
    let s = '';
    if (h) s += zh[h] + '百';
    if (t) s += zh[t] + '十';
    else if (h && o) s += '零';
    if (o) s += zh[o];
    if (!h && !t && !o) s = '零';
    return s;
  }
  // 归一化用于判分：小写、去 and、连字符变空格、多空格合一
  function normalize(s) {
    return String(s).toLowerCase().replace(/-/g, ' ').replace(/\band\b/g, ' ').replace(/[^a-z ]/g, ' ')
      .replace(/\s+/g, ' ').trim();
  }
  function wordsEqual(a, b) { return normalize(a) === normalize(b); }
  // 把单词解析成数字（用于诊断孩子写的是哪个数），解析失败返回 null
  function fromWords(s) {
    const w = normalize(s).split(' ').filter(Boolean);
    let total = 0, cur = 0, seen = false;
    for (const t of w) {
      const i = ones.indexOf(t), j = tens.indexOf(t);
      if (i >= 0) { cur += i; seen = true; }
      else if (j >= 2) { cur += j * 10; seen = true; }
      else if (t === 'hundred') { cur = (cur || 1) * 100; }
      else if (t === 'thousand') { total += (cur || 1) * 1000; cur = 0; }
      else if (t === 'million') { total += (cur || 1) * 1000000; cur = 0; }
      else return null;
    }
    return seen || total ? total + cur : null;
  }
  return { toWords, parts, toZh, normalize, wordsEqual, fromWords, ones, tens };
})();
