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
  function toWords(n) {
    if (n === 1000) return 'one thousand';
    if (n < 100) return under100(n);
    const h = Math.floor(n / 100), r = n % 100;
    return r ? `${ones[h]} hundred and ${under100(r)}` : `${ones[h]} hundred`;
  }
  // 拆成三部分，用于分步讲解：{h:'three hundred', and:'and', t:'twenty', o:'one', rest:'twenty-one'}
  function parts(n) {
    if (n === 1000) return { h: 'one thousand', rest: '' };
    const h = Math.floor(n / 100), r = n % 100;
    return { h: h ? `${ones[h]} hundred` : '', rest: r ? under100(r) : '' };
  }
  // 中文读法
  function toZh(n) {
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
      else if (t === 'hundred') { cur = (cur || 1) * 100; total += cur; cur = 0; }
      else if (t === 'thousand') { cur = (cur || 1) * 1000; total += cur; cur = 0; }
      else return null;
    }
    return seen || total ? total + cur : null;
  }
  return { toWords, parts, toZh, normalize, wordsEqual, fromWords, ones, tens };
})();
