/* 本地存储：进度 + 错题本（存在浏览器 localStorage 里） */
const Store = (() => {
  const KEY = 'mathland.v1';
  let data = { progress: {}, wrong: {}, stats: { correct: 0, wrong: 0, stars: 0 } };
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) data = Object.assign(data, JSON.parse(raw));
  } catch (e) { /* ignore */ }

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) { /* ignore */ }
  }

  // progress[qid] = { status: 'ok' | 'bad' | 'fixed', attempts, answer }
  function setProgress(qid, status, answer) {
    const p = data.progress[qid] || { attempts: 0 };
    p.attempts++;
    p.answer = answer;
    // 以前错过、现在对了 → fixed（黄色）；从没错过 → ok（绿色）
    if (status === 'bad') p.status = 'bad';
    else p.status = (status === 'fixed' || p.status === 'bad' || p.status === 'fixed') ? 'fixed' : 'ok';
    data.progress[qid] = p;
    save();
  }
  function getProgress(qid) { return data.progress[qid]; }
  // 清掉一道题的记录（进度 + 错题本里的这条）
  // 重做只清做题状态，错题本记录保留
  function clearProgress(qid) { delete data.progress[qid]; save(); }
  function clearMany(qids) { qids.forEach(id => { delete data.progress[id]; }); save(); }

  // 错题本：wrong[qid] = { q, kp, yourAnswer, correct, times, need, ts }
  // yourAnswer/raw = 这次做错时最后填的；firstTry = 这次第一遍填的（{disp, raw}）
  function addWrong(q, kpId, yourAnswer, correctText, raw, firstTry) {
    const w = data.wrong[q.id] || { q, kp: kpId, times: 0, need: 2, history: [] };
    w.q = q;
    w.times++;
    w.need = 2;          // 需要连续答对 2 次才算掌握
    w.done = false;      // 掌握过又错了：回到待重做
    w.ts = Date.now();
    w.history = w.history || [];
    if (firstTry && firstTry.disp !== undefined && firstTry.disp !== yourAnswer) w.history.push({ ans: firstTry.disp, raw: firstTry.raw, ts: w.ts });
    w.history.push({ ans: yourAnswer, raw, ts: w.ts });
    if (w.first === undefined) { const f = w.history[0]; w.first = f.ans; w.firstRaw = f.raw; w.firstTs = w.ts; }   // 第一次填错的答案永久保留
    w.yourAnswer = yourAnswer; w.raw = raw;
    w.correct = correctText;
    data.wrong[q.id] = w;
    data.stats.wrong++;
    save();
  }
  // 错题重做答对：need-1，到 0 移出
  function wrongSolved(qid) {
    const w = data.wrong[qid];
    if (!w) return false;
    w.need--;
    if (w.need <= 0) { w.done = true; w.doneTs = Date.now(); save(); return true; }   // 掌握：归档，不删
    save(); return false;
  }
  function wrongFailed(qid) {
    const w = data.wrong[qid];
    if (w) { w.need = 2; w.times++; save(); }
  }
  function removeWrong(qid) { delete data.wrong[qid]; save(); }
  function clearWrong() { data.wrong = {}; save(); }
  function wrongList() { return Object.values(data.wrong).filter(w => !w.done).sort((a, b) => b.ts - a.ts); }
  function wrongDone() { return Object.values(data.wrong).filter(w => w.done).sort((a, b) => (b.doneTs || 0) - (a.doneTs || 0)); }

  function addStar(n) { data.stats.stars += n; data.stats.correct++; save(); }
  function stats() { return data.stats; }

  function exportJSON() { return JSON.stringify(data, null, 2); }
  function importJSON(text) { data = JSON.parse(text); save(); }
  function reset() { data = { progress: {}, wrong: {}, stats: { correct: 0, wrong: 0, stars: 0 } }; save(); }

  return { setProgress, getProgress, clearProgress, clearMany, addWrong, wrongSolved, wrongFailed, removeWrong, clearWrong, wrongList, wrongDone, addStar, stats, exportJSON, importJSON, reset };
})();
