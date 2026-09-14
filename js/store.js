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
  function clearProgress(qid) { delete data.progress[qid]; delete data.wrong[qid]; save(); }
  function clearMany(qids) { qids.forEach(id => { delete data.progress[id]; delete data.wrong[id]; }); save(); }

  // 错题本：wrong[qid] = { q, kp, yourAnswer, correct, times, need, ts }
  function addWrong(q, kpId, yourAnswer, correctText) {
    const w = data.wrong[q.id] || { q, kp: kpId, times: 0, need: 2 };
    w.times++;
    w.need = 2;          // 需要连续答对 2 次才能移出
    w.yourAnswer = yourAnswer;
    w.correct = correctText;
    w.ts = Date.now();
    data.wrong[q.id] = w;
    data.stats.wrong++;
    save();
  }
  // 错题重做答对：need-1，到 0 移出
  function wrongSolved(qid) {
    const w = data.wrong[qid];
    if (!w) return false;
    w.need--;
    if (w.need <= 0) { delete data.wrong[qid]; save(); return true; }
    save(); return false;
  }
  function wrongFailed(qid) {
    const w = data.wrong[qid];
    if (w) { w.need = 2; w.times++; save(); }
  }
  function removeWrong(qid) { delete data.wrong[qid]; save(); }
  function clearWrong() { data.wrong = {}; save(); }
  function wrongList() { return Object.values(data.wrong).sort((a, b) => b.ts - a.ts); }

  function addStar(n) { data.stats.stars += n; data.stats.correct++; save(); }
  function stats() { return data.stats; }

  function exportJSON() { return JSON.stringify(data, null, 2); }
  function importJSON(text) { data = JSON.parse(text); save(); }
  function reset() { data = { progress: {}, wrong: {}, stats: { correct: 0, wrong: 0, stars: 0 } }; save(); }

  return { setProgress, getProgress, clearProgress, clearMany, addWrong, wrongSolved, wrongFailed, removeWrong, clearWrong, wrongList, addStar, stats, exportJSON, importJSON, reset };
})();
