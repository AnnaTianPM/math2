/* 画“百、十、个”小方块（SVG） */
const Blocks = (() => {
  const C = { h: '#4a90e2', t: '#27ae60', o: '#f39c12' };
  const CELL = 6;              // 小格边长
  const FLAT = CELL * 10;      // 百 = 10x10

  function grid(x, y, cols, rows, color, cls, id) {
    let s = `<g class="blk ${cls}" data-id="${id}" transform="translate(${x},${y})">`;
    s += `<rect width="${cols * CELL}" height="${rows * CELL}" fill="${color}" fill-opacity=".22" stroke="${color}" stroke-width="1.2"/>`;
    for (let i = 1; i < cols; i++) s += `<line x1="${i * CELL}" y1="0" x2="${i * CELL}" y2="${rows * CELL}" stroke="${color}" stroke-width=".6"/>`;
    for (let j = 1; j < rows; j++) s += `<line x1="0" y1="${j * CELL}" x2="${cols * CELL}" y2="${j * CELL}" stroke="${color}" stroke-width=".6"/>`;
    return s + '</g>';
  }

  /**
   * render({h, t, o}, opts) -> svg string
   * 百：叠放的 10x10 板；十：竖条；个：小方块
   */
  function render(v, opts = {}) {
    const h = v.h || 0, t = v.t || 0, o = v.o || 0;
    const pad = 14, gap = 26;
    // 百：错开叠放
    const off = 7;
    const hW = h ? FLAT + (h - 1) * off : 0;
    const hH = h ? FLAT + (h - 1) * off : 0;
    // 十：并排竖条，超过 5 根分两行
    const tCols = Math.min(t, 5), tRows = t > 5 ? 2 : (t ? 1 : 0);
    const tW = t ? tCols * (CELL + 5) : 0;
    const tH = t ? tRows * (FLAT + 8) : 0;
    // 个：每行 3 个
    const oCols = Math.min(o, 3), oRows = Math.ceil(o / 3);
    const oW = o ? oCols * (CELL + 6) : 0;
    const oH = o ? oRows * (CELL + 6) : 0;

    const width = pad * 2 + hW + (hW ? gap : 0) + tW + (tW ? gap : 0) + oW + 10;
    const height = pad * 2 + Math.max(hH, tH, oH, FLAT);
    let x = pad;
    let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${Math.max(width, 120)} ${height}" width="${Math.max(width, 120) * (opts.scale || 1.6)}" height="${height * (opts.scale || 1.6)}">`;
    // hundreds (从后往前画，让第一块在最上面)
    for (let i = h - 1; i >= 0; i--) {
      s += grid(x + i * off, pad + (h - 1 - i) * off, 10, 10, C.h, 'h', `h${i}`);
    }
    if (h) x += hW + gap;
    for (let i = 0; i < t; i++) {
      const cx = x + (i % 5) * (CELL + 5), cy = pad + Math.floor(i / 5) * (FLAT + 8);
      s += grid(cx, cy, 1, 10, C.t, 't', `t${i}`);
    }
    if (t) x += tW + gap;
    for (let i = 0; i < o; i++) {
      const cx = x + (i % 3) * (CELL + 6), cy = pad + Math.floor(i / 3) * (CELL + 6);
      s += grid(cx, cy, 1, 1, C.o, 'o', `o${i}`);
    }
    return s + '</svg>';
  }

  // 高亮某一类的前 n 个，其余同类变暗；其他类不动或变暗
  function highlight(svgEl, kind, n, dimOthers) {
    svgEl.querySelectorAll('.blk').forEach(g => {
      const k = g.classList.contains('h') ? 'h' : g.classList.contains('t') ? 't' : 'o';
      const idx = parseInt(g.dataset.id.slice(1), 10);
      g.classList.remove('dim', 'hl');
      if (kind === null) return;                 // 全部恢复
      if (k !== kind) { if (dimOthers) g.classList.add('dim'); return; }
      if (idx < n) g.classList.add('hl'); else g.classList.add('dim');
    });
  }

  return { render, highlight, colors: C };
})();
