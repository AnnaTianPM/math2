/* Level 4 · Unit 5  角 */
(function () {
  const U = window.MATH_DATA.levels[4].units;
  const unit = num => U.find(u => u.num === num);
  const G = window.L4ANG, DIRS = G.DIRS;
  const pic = html => `<div class="center">${html}</div>`;
  const num = a => ({ a });
  const choice = (a, options) => ({ a, kind: 'choice', options });
  const text = a => ({ a, kind: 'text' });
  const ang = a => ({ a, kind: 'angname' });
  const F = (id, p, t, fields, explain, zh, en, o) => Object.assign({ id, type: 'fill', pic: p, label: t.replace(/\{\{\w+\}\}/g, '___').replace(/\n/g, ' '), prompt: { zh, en: en || 'Fill in the blanks' }, text: t, fields, answerText: Object.values(fields).map(f => f.a).join(', '), explain }, o || {});
  const wp = (en, zh) => `<div class="wp-text"><div class="wp-en">${en}</div><div class="wp-zh">${zh}</div></div>`;

  /* ---- KP1 ---- */
  const nameA = [[['A', 55], ['C', 0], 'B'], [['X', 125], ['Z', 180], 'Y'], [['L', 0], ['N', 270], 'M']];
  const tri = [{ x: 110, y: 30, name: 'A' }, { x: 190, y: 170, name: 'B' }, { x: 30, y: 170, name: 'C' }];
  const triAng = [{ i: 0, letter: 'z', from: 2, to: 1 }, { i: 1, letter: 'y', from: 0, to: 2 }, { i: 2, letter: 'x', from: 1, to: 0 }];
  const rect1 = [{ x: 30, y: 40, name: 'M' }, { x: 190, y: 40, name: 'J' }, { x: 190, y: 160, name: 'K' }, { x: 30, y: 160, name: 'L' }];
  const rect1Ang = [{ i: 0, letter: 'a', from: 3, to: 1 }, { i: 1, letter: 'd', from: 0, to: 2 }, { i: 2, letter: 'c', from: 1, to: 3 }, { i: 3, letter: 'b', from: 2, to: 0 }];
  const pent = [{ x: 110, y: 25, name: 'O' }, { x: 195, y: 85, name: 'P' }, { x: 165, y: 175, name: 'Q' }, { x: 55, y: 175, name: 'R' }, { x: 25, y: 85, name: 'S' }];
  const pentAng = [{ i: 0, letter: 'f', from: 4, to: 1 }, { i: 1, letter: 'g', from: 0, to: 2 }, { i: 2, letter: 'h', from: 1, to: 3 }, { i: 3, letter: 'd', from: 2, to: 4 }, { i: 4, letter: 'e', from: 3, to: 0 }];
  const rect2 = [{ x: 30, y: 40, name: 'W' }, { x: 200, y: 40, name: 'T' }, { x: 200, y: 160, name: 'U' }, { x: 30, y: 160, name: 'V' }];
  const rect2Segs = [[0, 1], [1, 2], [2, 3], [3, 0], [0, 2]];
  const rect2Ang = [{ i: 0, letter: 'a', from: 3, to: 2 }, { i: 0, letter: 'b', from: 2, to: 1 }, { i: 1, letter: 'c', from: 0, to: 2 }, { i: 2, letter: 'd', from: 1, to: 0 }, { i: 2, letter: 'e', from: 0, to: 3 }, { i: 3, letter: 'f', from: 2, to: 0 }];
  const readC = [['ABC', 18, 'right'], ['DEF', 45, 'right'], ['GHI', 160, 'left'], ['JKL', 79, 'left'], ['MNO', 34, 'right'], ['PQR', 97, 'left'], ['STU', 112, 'right'], ['VWX', 151, 'left'], ['XYZ', 26, 'right'], ['SAP', 103, 'left']];
  const measD = [[{ letter: 'a' }, 0, 98], [{ letter: 'b' }, 118, 62], [{ letter: 'x' }, 0, 175], [{ letter: 'y' }, 0, 13], [{ letter: 'z' }, 273, 87], [{ name: 'PQR', l: ['R', 'P'], v: 'Q' }, 0, 105], [{ name: 'XWY', l: ['X', 'Y'], v: 'W' }, 207, 126], [{ name: 'ABC', l: ['C', 'A'], v: 'B' }, 0, 26], [{ name: 'DEF', l: ['D', 'F'], v: 'E' }, 32, 148], [{ name: 'LMN', l: ['N', 'L'], v: 'M' }, 0, 42]];
  /* ---- KP2 ---- */
  const drawA = [30, 57, 90, 122, 177, 11, 65, 113, 139, 84];
  const drawB = [['p', 75], ['q', 108], ['r', 45], ['s', 134], ['t', 9], ['u', 91], ['v', 130], ['w', 23], ['x', 169], ['y', 30]];
  /* ---- KP3 ---- */
  const TQ = ['quarter', 'half', 'three-quarter'];
  const names = { north: 'Tony', 'north-east': 'Andy', east: 'Susan', 'south-east': 'Wendy', south: 'Maggie', 'south-west': 'Sam', west: 'Joel', 'north-west': 'Zack' };
  const kids = ['Tony', 'Andy', 'Susan', 'Wendy', 'Maggie', 'Sam', 'Joel', 'Zack'];
  const items = [{ shape: 'rectangle', x: 0, y: 1 }, { shape: 'circle', x: 5, y: 1 }, { shape: 'square', x: 3, y: 3 }, { shape: 'triangle', x: 7, y: 3 }, { shape: 'star', x: 1, y: 5 }, { shape: 'cross', x: 5, y: 5 }, { shape: 'semicircle', x: 2, y: 7 }];
  const gridQ = [['circle', 'triangle'], ['semicircle', 'star'], ['square', 'triangle'], ['cross', 'star'], ['square', 'semicircle'], ['circle', 'rectangle'], ['triangle', 'cross'], ['star', 'circle']];
  const faceQ = [['north', 'south-west', true, 'deg'], ['west', 'east', false, 'deg'], ['north-west', 'north-east', false, 'deg'], ['south', 'south-east', false, 'deg'], ['east', 'south', true, 'turn'], ['north', 'east', false, 'turn']];
  const pieces = [{ x: 3, y: 0, g: '♝', name: 'black bishop' }, { x: 2, y: 1, g: '♟', num: 1, name: 'black pawn 1' }, { x: 3, y: 1, g: '♟', num: 2, name: 'black pawn 2' }, { x: 1, y: 2, g: '♔', name: 'white king' }, { x: 7, y: 3, g: '♜', name: 'black rook' }, { x: 5, y: 4, g: '♗', name: 'white bishop' }, { x: 6, y: 5, g: '♙', num: 2, name: 'white pawn 2' }, { x: 7, y: 5, g: '♚', name: 'black king' }, { x: 5, y: 6, g: '♙', num: 1, name: 'white pawn 1' }, { x: 4, y: 7, g: '♞', name: 'black knight' }, { x: 5, y: 7, g: '♖', name: 'white rook' }, { x: 6, y: 7, g: '♕', name: 'white queen' }];
  const chessQ = [['White king', 'black pawn 1'], ['Black bishop', 'black pawn 2'], ['White queen', 'white pawn 1'], ['Black king', 'white pawn 2'], ['White bishop', 'white pawn 2'], ['Black king', 'black rook'], ['Black king', 'white rook'], ['Black knight', 'white rook']];
  const townQ = [['Andy', 'F', 45, true], ['Beth', 'E', 90, false], ['Cody', 'D', 135, true], ['Danielle', 'G', 45, false], ['Ethan', 'H', 90, true], ['Fiona', 'A', 135, false]];
  const townName = { north: 'A', 'north-east': 'B', east: 'C', 'south-east': 'D', south: 'E', 'south-west': 'F', west: 'G', 'north-west': 'H' };
  const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
  const dirPic = (a, b) => { const A = items.find(i => i.shape === a), B = items.find(i => i.shape === b); return G.dirOf(B, A); };
  const chessDir = (a, b) => { const A = pieces.find(p => p.name === a.toLowerCase()), B = pieces.find(p => p.name === b); return G.dirOf(B, A); };

  unit(5).kps = [
    {
      id: 'l4-5-1', available: true,
      title: { zh: '认识角和量角', en: 'Understand and measure angles' },
      intro: { zh: '角有一个顶点和两条边，起名时顶点字母放中间：∠ABC 或 ∠CBA。量角器有内外两圈刻度，从底线那条边压着的 0 开始读。', en: 'Name an angle with the vertex in the middle. Read a protractor from the scale that starts at 0 on the base arm.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '给角起两个名字', en: 'Name the marked angles in different ways' },
          example: { kind: 'l4angname', n: { a: 'P', v: 'Q', b: 'R', fig: G.angleFig([{ deg: 0, label: 'R' }, { deg: 50, label: 'P' }], { vertex: 'Q', w: 240 }) }, title: { zh: '顶点 Q 放中间：∠PQR 或 ∠RQP', en: '∠PQR or ∠RQP' } },
          questions: nameA.map(([[a, da], [b, db], v], i) => { const fig = G.angleFig([{ deg: db, label: b }, { deg: da, label: a }], { vertex: v, w: 240 }); return F(`l4-5-1-A${i + 1}`, pic(fig), `∠{{p}}　or　∠{{q}}`, { p: text(`${a}${v}${b}`), q: text(`${b}${v}${a}`) }, ['l4angname', { a, v, b, fig }], '这个角有两种叫法，都写出来（3 个字母）', 'Name the marked angle in two ways', { accept: [{ p: `${a}${v}${b}`, q: `${b}${v}${a}` }, { p: `${b}${v}${a}`, q: `${a}${v}${b}` }], label: `∠${a}${v}${b} / ∠${b}${v}${a}`, hint: { zh: `顶点 ${v} 的字母要放在中间。`, en: `The vertex ${v} goes in the middle.` } }); }) },
        { id: 'B', type: 'fill', title: { zh: '换一种叫法', en: 'Name the marked angles in another way' },
          example: { kind: 'l4angletter', n: { name: 'ACB', letter: 'x', fig: G.polyFig(tri, { angles: triAng }), figHl: G.polyFig(tri, { angles: triAng, hl: 'x' }) }, title: { zh: '∠ACB：顶点 C，就是 ∠x', en: '∠ACB = ∠x' } },
          questions: [
            { id: 'l4-5-1-B1', fig: () => G.polyFig(tri, { angles: triAng }), pts: tri, angs: triAng, qs: [['ABC', 'y'], ['ACB', 'x'], ['BAC', 'z']], mode: 'letter' },
            { id: 'l4-5-1-B2', fig: () => G.polyFig(rect1, { angles: rect1Ang }), pts: rect1, angs: rect1Ang, qs: [['KLM', 'b'], ['KJM', 'd'], ['JML', 'a'], ['JKL', 'c']], mode: 'letter' },
            { id: 'l4-5-1-B3', fig: () => G.polyFig(pent, { angles: pentAng }), pts: pent, angs: pentAng, qs: [['d', 'SRQ'], ['e', 'OSR'], ['f', 'SOP'], ['g', 'OPQ'], ['h', 'PQR']], mode: 'name' },
            { id: 'l4-5-1-B4', fig: () => G.polyFig(rect2, { angles: rect2Ang, segs: rect2Segs }), pts: rect2, angs: rect2Ang, segs: rect2Segs, qs: [['a', 'UWV'], ['b', 'UWT'], ['c', 'UTW'], ['d', 'TUW'], ['e', 'VUW'], ['f', 'UVW']], mode: 'name' },
          ].map(d => { const fields = {}; const letters = d.angs.map(a => a.letter); const t = d.qs.map(([k, v], j) => { fields['f' + j] = d.mode === 'letter' ? choice(v, letters) : ang(v); return d.mode === 'letter' ? `∠${k} = ∠{{f${j}}}` : `∠${k} = ∠{{f${j}}}`; }).join('\n');
            const first = d.qs[0]; const figHl = l => G.polyFig(d.pts, { angles: d.angs, segs: d.segs, hl: l });
            const explain = d.mode === 'letter' ? ['l4angletter', { name: first[0], letter: first[1], fig: d.fig(), figHl: figHl(first[1]) }] : ['l4letterang', { letter: first[0], v: first[1][1], a: first[1][0], b: first[1][2], fig: d.fig(), figHl: figHl(first[0]) }];
            return F(d.id, pic(d.fig()), t, fields, explain, d.mode === 'letter' ? '每个角对应图上哪个小写字母？' : '每个小写字母的角，用三个大写字母怎么叫？（顶点放中间）', 'Name each angle in another way', { label: d.qs.map(([k, v]) => `${k}=${v}`).join(' '), hint: { zh: d.mode === 'letter' ? '中间的字母是顶点，先找顶点再看夹在哪两条边之间。' : '先找小写字母在哪个顶点，顶点字母写中间，两边的字母写两头。', en: 'The middle letter is the vertex.' } }); }) },
        { id: 'C', type: 'fill', title: { zh: '读量角器', en: 'Read and write the angles on the lines provided' },
          example: { kind: 'l4readprot', n: { deg: 30, side: 'right', labels: ['M', 'A', 'T'] }, title: { zh: '底线的边在右边，读外圈：∠MAT = 30°', en: '∠MAT = 30°' } },
          questions: readC.map(([nm, deg, side], i) => { const labels = [nm[0], nm[1], nm[2]]; const rd = side === 'right' ? deg : 180 - deg; const lab = { left: side === 'right' ? '' : nm[0], right: side === 'right' ? nm[0] : '', center: nm[1] };
            return F(`l4-5-1-C${i + 1}`, pic(G.protractor({ rays: [{ deg: rd, label: nm[2] }], labels: lab })), `∠${nm} = {{a}}°`, { a: num(deg) }, ['l4readprot', { deg, side, labels }], `读出 ∠${nm} 是几度`, `Read ∠${nm}`, { label: `∠${nm} = ${deg}°`, hint: { zh: `底线的边 ${nm[1]}${nm[0]} 指向${side === 'right' ? '右' : '左'}边，要读${side === 'right' ? '外' : '内'}圈。`, en: `Read the ${side === 'right' ? 'outer' : 'inner'} scale.` } }); }) },
        { id: 'D', type: 'l4measure', title: { zh: '估一估、量一量', en: 'Estimate and measure the marked angles using a protractor' },
          example: { kind: 'l4estmeas', n: { rays: [{ deg: 0 }, { deg: 70 }], deg: 70, letter: 'm' }, title: { zh: '先估（比直角小一点，约 70°），再放量角器量', en: 'Estimate, then measure' } },
          questions: measD.map(([o, rot, deg], i) => { const rays = o.l ? [{ deg: rot, label: o.l[0] }, { deg: rot + deg, label: o.l[1] }] : [{ deg: rot }, { deg: rot + deg }]; return { id: `l4-5-1-D${i + 1}`, type: 'l4measure', rays, deg, letter: o.letter, name: o.name, vertex: o.v, label: `∠${o.name || o.letter} = ${deg}°` }; }) },
      ],
    },
    {
      id: 'l4-5-2', available: true,
      title: { zh: '画 180° 以内的角', en: 'Draw angles to 180°' },
      intro: { zh: '画角：先画底线，量角器中心对准顶点，从底线压着的 0 那圈数到要画的度数，点一个点，再和顶点连起来。', en: 'Draw the base line, put the centre on the vertex, count from 0 to the degree, mark a dot and join it to the vertex.' },
      sections: [
        { id: 'A', type: 'l4drawangle', title: { zh: '在量角器上画角', en: 'Draw and mark each angle on the protractor provided' },
          example: { kind: 'l4drawprot', n: { deg: 25 }, title: { zh: '从右边的 0 用外圈数到 25，点一点，连起来', en: 'Draw 25°' } },
          questions: drawA.map((deg, i) => ({ id: `l4-5-2-A${i + 1}`, type: 'l4drawangle', deg, label: '', labelText: `${deg}°` })) },
        { id: 'B', type: 'l4drawangle', title: { zh: '画指定的角', en: 'Draw and mark each angle using a protractor' },
          example: { kind: 'l4drawprot', n: { deg: 140 }, title: { zh: '140° 超过 90，点在左半边', en: 'Draw 140°' } },
          questions: drawB.map(([l, deg], i) => ({ id: `l4-5-2-B${i + 1}`, type: 'l4drawangle', deg, label: l })) },
      ],
    },
    {
      id: 'l4-5-3', available: true,
      title: { zh: '转动与八方位', en: 'Understand turns and an 8-point compass' },
      intro: { zh: '转一整圈是 360° = 4 个直角；1/4 圈 90°，1/2 圈 180°，3/4 圈 270°。罗盘八个方向：北、东北、东、东南、南、西南、西、西北，相邻两个方向差 45°。', en: 'A complete turn is 360°. The 8 compass points are 45° apart.' },
      sections: [
        { id: 'A', type: 'fill', title: { zh: '转动和直角', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'l4turn', n: {}, title: { zh: '一整圈 = 4 个直角 = 360°', en: 'A complete turn = 4 right angles = 360°' } },
          questions: [
            ['A {{a}}-turn equals to 1 right angle.', { a: choice('quarter', TQ) }, 'quarter'],
            ['A half-turn equals to {{a}}°.', { a: num(180) }, 'half'],
            ['A {{a}}-turn equals to 270°.', { a: choice('three-quarter', TQ) }, 'three-quarter'],
            ['A complete turn equals to {{a}} right angles.', { a: num(4) }, 'complete'],
            ['{{a}} of a complete turn is 180°.', { a: choice('Half', ['Quarter', 'Half', 'Three-quarters']) }, 'half'],
            ['{{a}} of a complete turn is 90°.', { a: choice('Quarter', ['Quarter', 'Half', 'Three-quarters']) }, 'quarter'],
            ['Three-quarters of a complete turn equals to {{a}} right angles.', { a: num(3) }, 'three-quarter'],
            ['A complete turn equals to {{a}}°.', { a: num(360) }, 'complete'],
          ].map(([t, fields, hl], i) => F(`l4-5-3-A${i + 1}`, '', t, fields, ['l4turn', { hl }], '转动和直角、度数的关系', 'Turns and right angles', { label: t.replace('{{a}}', Object.values(fields)[0].a), hint: { zh: '一整圈 360° = 4 个直角，1/4 圈就是 1 个直角 90°。', en: 'A complete turn is 4 right angles.' } })) },
        { id: 'B', type: 'fill', title: { zh: '每个人在 X 的哪个方向', en: 'Which direction is each child from X?' },
          example: { kind: 'l4compass', n: { name: 'Tony', dir: 'north', names }, title: { zh: 'Tony 在正上方：north', en: 'Tony: north' } },
          questions: kids.map((k, i) => { const dir = DIRS.find(d => names[d] === k); return F(`l4-5-3-B${i + 1}`, pic(G.compass({ names, w: 230 })), `${k}: {{a}}`, { a: choice(dir, DIRS) }, ['l4compass', { name: k, dir, names }], `${k} 在 X 的哪个方向？`, `Which direction is ${k} from X?`, { label: `${k}: ${dir}`, hint: { zh: '上北下南左西右东，斜的方向先说南北再说东西。', en: 'N up, S down, W left, E right.' } }); }) },
        { id: 'C', type: 'fill', title: { zh: '网格上的方向', en: 'Look at the picture and fill in each blank' },
          example: { kind: 'l4griddir', n: { items, a: 'circle', b: 'rectangle', dir: 'east' }, title: { zh: '从长方形指向圆：正右边，east', en: 'The circle is east of the rectangle' } },
          questions: gridQ.map(([a, b], i) => { const dir = dirPic(a, b); return F(`l4-5-3-C${i + 1}`, pic(G.gridMap(items, { w: 300 })), `The ${a} is {{d}} of the ${b}.`, { d: choice(dir, DIRS) }, ['l4griddir', { items, a, b, dir }], `${a} 在 ${b} 的哪个方向？`, `The ${a} is ___ of the ${b}`, { label: `${a} is ${dir} of ${b}`, hint: { zh: `先找 ${b}，从它出发看 ${a} 在哪边；斜的就是两个方向合起来。`, en: `Start from the ${b}.` } }); }) },
        { id: 'D', type: 'fill', title: { zh: '面向哪里、转多少', en: 'Fill in each blank with the correct answer' },
          example: { kind: 'l4turnface', n: { from: 'north', to: 'east', cw: true }, title: { zh: '北 → 东 顺时针：2 格 = 90°，quarter-turn', en: 'North to east clockwise: 90°' } },
          questions: faceQ.map(([from, to, cw, kind], i) => { const a = DIRS.indexOf(from), b = DIRS.indexOf(to), deg = (cw ? ((b - a) % 8 + 8) % 8 : ((a - b) % 8 + 8) % 8) * 45; const tn = { 90: 'quarter', 180: 'half', 270: 'three-quarter' }[deg];
            const t = kind === 'deg' ? `George is facing ${from}. If he turns {{a}}° in the ${cw ? 'clockwise' : 'anticlockwise'} direction, he will face ${to}.` : `George is facing ${from}. If he makes a {{a}}-turn in the ${cw ? 'clockwise' : 'anticlockwise'} direction, he will face ${to}.`;
            return F(`l4-5-3-D${i + 1}`, pic(G.compass({ hl: from, w: 220 })), t, { a: kind === 'deg' ? num(deg) : choice(tn, TQ) }, ['l4turnface', { from, to, cw }], `面向${G.DZH[from]}，${cw ? '顺' : '逆'}时针转到${G.DZH[to]}，转了多少？`, t.replace('{{a}}', '___'), { label: t.replace('{{a}}', kind === 'deg' ? deg : tn), hint: { zh: '相邻两个方向之间 45°，顺时针和钟表一样方向，数一数经过几格。', en: 'Each step between compass points is 45°.' } }); }) },
        { id: 'E', type: 'fill', title: { zh: '棋盘上的方向', en: 'Look at the chessboard and fill in each blank' },
          example: { kind: 'l4chess', n: { pieces, a: 'black knight', b: 'white rook', dir: 'west' }, title: { zh: '黑马在白车的正左边：west', en: 'Black knight is west of white rook' } },
          questions: chessQ.map(([a, b], i) => { const dir = chessDir(a, b); return F(`l4-5-3-E${i + 1}`, pic(G.chess(pieces, { w: 300 })), `${a} is {{d}} of ${b}.`, { d: choice(dir, DIRS) }, ['l4chess', { pieces, a: a.toLowerCase(), b, dir }], `${a} 在 ${b} 的哪个方向？`, `${a} is ___ of ${b}`, { label: `${a} is ${dir} of ${b}`, hint: { zh: `先找 ${b}，再看 ${a.toLowerCase()} 在它的哪边。`, en: `Start from the ${b}.` } }); }) },
        { id: 'F', type: 'fill', title: { zh: '小镇和首都', en: '8 small towns A–H are connected to the capital city M by roads' },
          example: { kind: 'l4towns', n: { who: 'Tom', from: 'E', deg: 45, cw: true, ans: 'H' }, title: { zh: '从 E 到 M 面向北，顺时针 45° 面向东北 → B', en: 'From E to M facing north, 45° clockwise → B' } },
          questions: townQ.map(([who, from, deg, cw], i) => { const fromDir = Object.keys(townName).find(k => townName[k] === from); const facing = DIRS[(DIRS.indexOf(fromDir) + 4) % 8]; const ans = townName[G.turnTo(facing, deg, cw)];
            const t = `${who} travels from Town ${from} to City M. If ${who === 'Beth' || who === 'Danielle' || who === 'Fiona' ? 'she' : 'he'} makes a ${deg}° turn in the ${cw ? 'clockwise' : 'anticlockwise'} direction, ${who === 'Beth' || who === 'Danielle' || who === 'Fiona' ? 'she' : 'he'} will reach Town {{a}}.`;
            return F(`l4-5-3-F${i + 1}`, pic(G.towns({ w: 230 })), t, { a: choice(ans, ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']) }, ['l4towns', { who, from, deg, cw, ans }], `${who} 从 ${from} 到 M，${cw ? '顺' : '逆'}时针转 ${deg}°，会到哪个镇？`, t.replace('{{a}}', '___'), { label: t.replace('{{a}}', ans), hint: { zh: `从 ${from} 走到 M 时，面朝的方向和 ${from} 相反；再按 45° 一格转。`, en: `Arriving at M, ${who} faces away from ${from}. Each step is 45°.` } }); }) },
      ],
    },
  ];
})();
