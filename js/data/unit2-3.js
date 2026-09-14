/* Unit 2 加法、Unit 3 减法 */
(function () {
  const U = window.MATH_DATA.units;
  const unit = num => U.find(u => u.num === num);
  const eq = (id, a, b, op, explain, extra) => Object.assign({ id, type: 'eq', a, b, op, explain }, extra || {});
  const colq = (id, a, b, op) => ({ id, type: 'column', a, b, op });
  const bq = (id, a, b, op) => ({ id, type: 'blocksop', a, b, op });
  const mentalHint = op => op === '+'
    ? { zh: '加一位数：先加 10 再减回去。加整十/整百：只看十位/百位。', en: 'Add 10 then take away; or add the tens/hundreds only.' }
    : { zh: '减一位数：先减 10 再加回来。减整十/整百：只看十位/百位。', en: 'Take away 10 then add back; or subtract the tens/hundreds only.' };

  // ================= Unit 2 =================
  unit(2).kps = [
    {
      id: 'u2-1', available: true,
      title: { zh: '简单加法与心算', en: 'Perform simple and mental addition of numbers within 1000' },
      intro: { zh: '加一位数可以往前数；加整十、整百只要看十位、百位；也可以先加 10 再减回去。', en: 'Count on, add the tens or hundreds only, or add 10 then take away.' },
      sections: [
        {
          id: 'A', type: 'eq',
          title: { zh: '往前数着加', en: 'Add these numbers by counting on' },
          example: { kind: 'count', n: { a: 35, b: 4, op: '+' }, title: { zh: '35 + 4：从 35 往前数 4 个', en: '35 + 4 by counting on' } },
          questions: [[57, 3], [76, 6], [18, 50], [49, 70], [101, 8], [322, 9], [530, 20], [674, 60], [213, 700], [400, 600]]
            .map(([a, b], i) => eq(`u2-1-A${i + 1}`, a, b, '+', 'count', { hint: { zh: `从 ${a} 开始往前数。${b} 是 ${b % 100 === 0 ? b / 100 + ' 个百，每次加 100' : b % 10 === 0 ? b / 10 + ' 个十，每次加 10' : b + ' 个一，每次加 1'}。`, en: `Count on from ${a}.` } }))
        },
        {
          id: 'B', type: 'blocksop',
          title: { zh: '看方块加一加', en: 'Add these numbers' },
          example: { kind: 'blocksadd', n: { a: 275, b: 24 }, title: { zh: '275 + 24 看方块', en: '275 + 24 with blocks' } },
          questions: [[123, 65], [70, 507], [380, 16], [48, 431], [612, 216], [104, 540], [834, 153], [425, 364]]
            .map(([a, b], i) => bq(`u2-1-B${i + 1}`, a, b, '+'))
        },
        {
          id: 'C', type: 'eq',
          title: { zh: '心算加法', en: 'Add these numbers mentally' },
          example: { kind: 'mental', n: { a: 58, b: 5, op: '+' }, title: { zh: '58 + 5：先加 10 再减 5', en: '58 + 5 = 58 + 10 − 5' } },
          questions: [
            [64, 8], [89, 7], [26, 5], [18, 9], [57, 6], [45, 8], [37, 5], [78, 8], [94, 9], [56, 7],
            [127, 5], [764, 9], [262, 6], [948, 8], [435, 7], [584, 6], [623, 9], [806, 9], [366, 5], [119, 6],
            [513, 6], [836, 20], [723, 80], [190, 70], [428, 40], [762, 70], [503, 90], [869, 80], [623, 60], [770, 200],
            [323, 600], [165, 800], [248, 500], [657, 300], [195, 700], [108, 200], [588, 400], [645, 100], [199, 600], [756, 200],
          ].map(([a, b], i) => eq(`u2-1-C${i + 1}`, a, b, '+', 'mental', { hint: mentalHint('+') }))
        },
      ],
    },
    {
      id: 'u2-2', available: true,
      title: { zh: '不进位加法（竖式）', en: 'Add numbers within 1000 without regrouping' },
      intro: { zh: '列竖式：个位对个位，十位对十位，百位对百位。先加个位，再加十位，最后加百位。', en: 'Line up the digits. Add the ones, then the tens, then the hundreds.' },
      sections: [
        {
          id: 'A', type: 'column',
          title: { zh: '列竖式加一加', en: 'Add these numbers' },
          example: { kind: 'coladd', n: { a: 143, b: 214 }, title: { zh: '143 + 214 竖式', en: '143 + 214' } },
          questions: [[430, 65], [28, 350], [102, 77], [46, 541], [913, 53], [38, 721], [312, 481], [732, 145], [201, 283], [821, 163], [261, 304], [324, 375], [237, 121], [471, 425], [246, 532], [611, 338]]
            .map(([a, b], i) => colq(`u2-2-A${i + 1}`, a, b, '+'))
        },
      ],
    },
    {
      id: 'u2-3', available: true,
      title: { zh: '进位加法（竖式）', en: 'Add numbers within 1000 by regrouping ones, tens or hundreds' },
      intro: { zh: '某一位加起来满 10，就写个位数字，向左边进 1。下一位加的时候别忘了加上进的 1。', en: 'If a column adds to 10 or more, write the ones digit and carry 1 to the next column.' },
      sections: [
        {
          id: 'A', type: 'column',
          title: { zh: '列竖式，注意进位', en: 'Add these numbers by regrouping' },
          example: { kind: 'coladd', n: { a: 135, b: 109 }, title: { zh: '135 + 109 竖式（个位进位）', en: '135 + 109' } },
          questions: [[372, 18], [45, 416], [609, 89], [34, 268], [857, 96], [58, 166], [737, 129], [256, 380], [505, 295], [462, 208], [397, 546], [284, 267], [353, 379], [495, 424], [148, 162], [567, 433]]
            .map(([a, b], i) => colq(`u2-3-A${i + 1}`, a, b, '+'))
        },
      ],
    },
  ];

  // ================= Unit 3 =================
  unit(3).kps = [
    {
      id: 'u3-1', available: true,
      title: { zh: '简单减法与心算', en: 'Perform simple and mental subtraction of numbers within 1000' },
      intro: { zh: '减一位数可以往回数；减整十、整百只要看十位、百位；也可以先减 10 再加回来。', en: 'Count back, subtract the tens or hundreds only, or take away 10 then add back.' },
      sections: [
        {
          id: 'A', type: 'eq',
          title: { zh: '往回数着减', en: 'Subtract these numbers by counting back' },
          example: { kind: 'count', n: { a: 48, b: 6, op: '-' }, title: { zh: '48 − 6：从 48 往回数 6 个', en: '48 − 6 by counting back' } },
          questions: [[29, 8], [63, 5], [91, 40], [85, 30], [407, 7], [734, 9], [256, 50], [510, 20], [1000, 100], [872, 500]]
            .map(([a, b], i) => eq(`u3-1-A${i + 1}`, a, b, '-', 'count', { hint: { zh: `从 ${a} 开始往回数。${b} 是 ${b % 100 === 0 ? b / 100 + ' 个百，每次减 100' : b % 10 === 0 ? b / 10 + ' 个十，每次减 10' : b + ' 个一，每次减 1'}。`, en: `Count back from ${a}.` } }))
        },
        {
          id: 'B', type: 'blocksop',
          title: { zh: '看方块减一减', en: 'Subtract these numbers' },
          example: { kind: 'blockssub', n: { a: 357, b: 24 }, title: { zh: '357 − 24 看方块', en: '357 − 24 with blocks' } },
          questions: [[498, 61], [285, 33], [174, 54], [526, 22], [669, 345], [453, 241], [848, 113], [789, 246]]
            .map(([a, b], i) => bq(`u3-1-B${i + 1}`, a, b, '-'))
        },
        {
          id: 'C', type: 'eq',
          title: { zh: '心算减法', en: 'Subtract these numbers mentally' },
          example: { kind: 'mental', n: { a: 41, b: 3, op: '-' }, title: { zh: '41 − 3：先减 10 再加 7', en: '41 − 3 = 41 − 10 + 7' } },
          questions: [
            [52, 5], [46, 9], [81, 8], [30, 7], [88, 3], [79, 5], [64, 4], [28, 9], [93, 1], [59, 7],
            [620, 5], [404, 6], [875, 4], [740, 2], [519, 9], [264, 7], [329, 6], [183, 5], [916, 3], [534, 8],
            [415, 30], [338, 90], [587, 60], [860, 50], [609, 10], [281, 20], [758, 40], [495, 70], [164, 80], [626, 60],
            [758, 300], [834, 600], [905, 800], [631, 500], [978, 900], [505, 100], [784, 400], [435, 200], [876, 700], [980, 800],
          ].map(([a, b], i) => eq(`u3-1-C${i + 1}`, a, b, '-', 'mental', { hint: mentalHint('-') }))
        },
      ],
    },
    {
      id: 'u3-2', available: true,
      title: { zh: '不退位减法（竖式）', en: 'Subtract numbers within 1000 without regrouping' },
      intro: { zh: '列竖式：个位对个位，十位对十位，百位对百位。先减个位，再减十位，最后减百位。', en: 'Line up the digits. Subtract the ones, then the tens, then the hundreds.' },
      sections: [
        {
          id: 'A', type: 'column',
          title: { zh: '列竖式减一减', en: 'Subtract these numbers' },
          example: { kind: 'colsub', n: { a: 569, b: 234 }, title: { zh: '569 − 234 竖式', en: '569 − 234' } },
          questions: [[279, 43], [465, 52], [688, 28], [147, 42], [996, 75], [354, 11], [932, 121], [736, 204], [375, 152], [859, 607], [628, 224], [595, 430], [997, 627], [884, 243], [764, 530], [559, 147]]
            .map(([a, b], i) => colq(`u3-2-A${i + 1}`, a, b, '-'))
        },
      ],
    },
    {
      id: 'u3-3', available: true,
      title: { zh: '退位减法（竖式）', en: 'Subtract numbers within 1000 by regrouping ones, tens or hundreds' },
      intro: { zh: '某一位不够减，就向左边借 1：左边那位减 1，这一位加 10。', en: 'If a column is not enough, regroup: take 1 from the next column and add 10 to this one.' },
      sections: [
        {
          id: 'A', type: 'column',
          title: { zh: '列竖式，注意退位', en: 'Subtract these numbers by regrouping' },
          example: { kind: 'colsub', n: { a: 353, b: 174 }, title: { zh: '353 − 174 竖式（两次退位）', en: '353 − 174' } },
          questions: [[142, 26], [470, 35], [708, 57], [525, 43], [314, 19], [833, 68], [971, 369], [403, 205], [632, 171], [412, 124], [545, 178], [860, 280], [980, 555], [623, 347], [707, 575], [814, 469]]
            .map(([a, b], i) => colq(`u3-3-A${i + 1}`, a, b, '-'))
        },
      ],
    },
    {
      id: 'u3-4', available: true,
      title: { zh: '被减数有 0 的减法', en: 'Subtract numbers within 1000 across zeroes' },
      intro: { zh: '像 400 − 325 这样，个位十位都是 0：先把 1 个百换成 10 个十，再把 1 个十换成 10 个一。', en: 'Regroup 1 hundred into 10 tens, then 1 ten into 10 ones.' },
      sections: [
        {
          id: 'A', type: 'column',
          title: { zh: '列竖式减一减', en: 'Subtract these numbers' },
          example: { kind: 'colsub', n: { a: 400, b: 325 }, title: { zh: '400 − 325 竖式', en: '400 − 325' } },
          questions: [[200, 31], [300, 99], [500, 67], [400, 144], [700, 202], [300, 158], [900, 375], [800, 416]]
            .map(([a, b], i) => colq(`u3-4-A${i + 1}`, a, b, '-'))
        },
      ],
    },
  ];
})();
