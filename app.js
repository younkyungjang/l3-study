/* L3 Study Quiz engine
 * Lessons register themselves with L3.add({...}) (see lessons/*.js).
 * Progress (wrong answers, review boxes, checklists) is stored in localStorage on this device.
 */
(function () {
  const STORE_KEY = 'l3quiz.v1';
  const INTERVALS = [0, 1, 2, 4, 7]; // days until next review for box 1..4
  const lessons = {};
  const $app = () => document.getElementById('app');

  // ---------- storage ----------
  function load() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch (e) { return {}; }
  }
  let db = load();
  db.items = db.items || {}; db.sections = db.sections || {}; db.checks = db.checks || {};
  function save() { localStorage.setItem(STORE_KEY, JSON.stringify(db)); }

  function today() { const d = new Date(); d.setHours(0, 0, 0, 0); return d; }
  function ymd(d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  function addDays(n) { const d = today(); d.setDate(d.getDate() + n); return ymd(d); }

  // ---------- helpers ----------
  function esc(s) { return String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
  function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function norm(s) {
    return String(s).toLowerCase().replace(/[’‘`]/g, "'").replace(/[“”]/g, '"')
      .replace(/\s+/g, ' ').replace(/\s*([,.?!])\s*/g, '$1 ').replace(/[.?!]+\s*$/, '').trim();
  }
  function speak(text) {
    if (!('speechSynthesis' in window) || !text) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text); u.lang = 'en-US'; u.rate = 0.85;
    const v = speechSynthesis.getVoices().find(v => /en[-_]US/i.test(v.lang));
    if (v) u.voice = v;
    speechSynthesis.speak(u);
  }
  window.__speak = speak;

  // Flatten a lesson into items with stable keys
  function itemsOf(lesson, secIdx) {
    const out = [];
    lesson.sections.forEach((sec, si) => {
      if (secIdx != null && si !== secIdx) return;
      sec.items.forEach((it, ii) => {
        out.push(Object.assign({ type: sec.type || 'mc' }, it, {
          key: lesson.id + ':' + (sec.id || si) + ':' + ii,
          lessonId: lesson.id, secIdx: si, secTitle: sec.title, _sec: sec,
        }));
      });
    });
    return out;
  }
  function choicesFor(item) {
    if (item.choices) return shuffle(item.choices);
    const pool = [...new Set(item._sec.items.map(x => x.answer).filter(a => a !== item.answer))];
    return shuffle([item.answer, ...shuffle(pool).slice(0, 3)]);
  }

  // Review state
  function wrongItems(onlyDue) {
    const t = ymd(today());
    const res = [];
    for (const id in lessons) {
      for (const it of itemsOf(lessons[id])) {
        const st = db.items[it.key];
        if (!st || !st.box) continue;
        if (onlyDue && st.due > t) continue;
        res.push(it);
      }
    }
    return res;
  }
  function recordResult(item, firstTryCorrect, everWrongThisSession) {
    const st = db.items[item.key] || { box: 0, wrong: 0, right: 0 };
    if (!firstTryCorrect || everWrongThisSession) {
      st.wrong++; st.box = 1; st.due = addDays(1); st.last = ymd(today());
    } else {
      st.right++;
      if (st.box) {
        st.box++;
        if (st.box > 4) { st.box = 0; st.due = null; st.mastered = ymd(today()); }
        else st.due = addDays(INTERVALS[st.box]);
      }
    }
    db.items[item.key] = st; save();
  }

  // ---------- views ----------
  function header(title, back) {
    return `<header class="top">${back ? `<a class="back" href="${back}">← 뒤로</a>` : ''}<h1>${esc(title)}</h1></header>`;
  }

  function lessonProgress(lesson) {
    let done = 0;
    lesson.sections.forEach((s, si) => { if (db.sections[lesson.id + ':' + si]) done++; });
    const checks = lesson.checklist || [];
    const checked = checks.filter((_, ci) => db.checks[lesson.id + ':' + ci]).length;
    return { done, total: lesson.sections.length, checked, checks: checks.length };
  }

  function viewHome() {
    const due = wrongItems(true).length, all = wrongItems(false).length;
    const list = Object.values(lessons).sort((a, b) => (b.date || '').localeCompare(a.date || ''));
    const cards = list.map(l => {
      const p = lessonProgress(l);
      const pct = Math.round(100 * (p.done + p.checked) / Math.max(1, p.total + p.checks));
      return `<a class="card cat-${esc(l.category)}" href="#/lesson/${encodeURIComponent(l.id)}">
        <div class="tag">${esc(l.categoryLabel || l.category)}</div>
        <div class="ctitle">${esc(l.title)}</div>
        <div class="meta">${l.due ? '마감 ' + esc(l.due) + ' · ' : ''}퀴즈 ${p.done}/${p.total} · 숙제 ${p.checked}/${p.checks}</div>
        <div class="bar"><span style="width:${pct}%"></span></div></a>`;
    }).join('');
    $app().innerHTML = header('L3 영어 공부 (월/금반)') + `
      <a class="review-cta ${due ? '' : 'calm'}" href="#/review">
        <b>오늘 다시 풀 문제 ${due}개</b><span>틀린 문제는 맞힐 때까지 계속 나와요 · 오답노트 전체 ${all}개</span></a>
      ${all ? `<div class="row"><a class="btn ghost" href="#/review/all">수업 전 마무리: 오답노트 전체 풀기 (${all})</a></div>` : ''}
      <h2>수업 자료</h2><div class="cards">${cards || '<p>아직 자료가 없어요.</p>'}</div>`;
  }

  function viewLesson(id) {
    const l = lessons[id];
    if (!l) { $app().innerHTML = header('자료를 찾을 수 없어요', '#/'); return; }
    const secs = l.sections.map((s, si) => {
      const done = db.sections[l.id + ':' + si];
      const wrong = itemsOf(l, si).filter(it => db.items[it.key]?.box).length;
      return `<a class="sec ${done ? 'done' : ''}" href="#/lesson/${encodeURIComponent(l.id)}/${si}">
        <span class="num">${si + 1}</span><span class="stitle">${esc(s.title)}<small>${esc(s.guide || '')}</small></span>
        <span class="sstat">${done ? '완료' : s.items.length + '문제'}${wrong ? ` · <em>오답 ${wrong}</em>` : ''}</span></a>`;
    }).join('');
    const checks = (l.checklist || []).map((c, ci) => {
      const k = l.id + ':' + ci;
      return `<label class="check"><input type="checkbox" data-k="${esc(k)}" ${db.checks[k] ? 'checked' : ''}> ${esc(c)}</label>`;
    }).join('');
    $app().innerHTML = header(l.title, '#/') + `
      <div class="info">${l.due ? `<b>마감</b> ${esc(l.due)}<br>` : ''}${l.note ? esc(l.note) + '<br>' : ''}${l.source ? `<a href="${esc(l.source)}" target="_blank">밴드 원본 글 보기</a>` : ''}</div>
      ${l.plan ? `<h2>공부 순서</h2><ol class="plan">${l.plan.map(p => `<li>${esc(p)}</li>`).join('')}</ol>` : ''}
      <h2>퀴즈</h2><div class="secs">${secs}</div>
      ${checks ? `<h2>숙제 체크</h2><div class="checks">${checks}</div>` : ''}`;
    $app().querySelectorAll('input[type=checkbox]').forEach(cb => cb.onchange = () => { db.checks[cb.dataset.k] = cb.checked; save(); });
  }

  // ---------- quiz runner ----------
  let runToken = 0;
  function runQuiz(items, opts) {
    const myRun = ++runToken;
    let queue = shuffle(items);
    const total = items.length;
    const state = {}; // key -> {wrong:bool}
    let firstRight = 0, answered = 0;

    function finish() {
      if (opts.onDone) opts.onDone();
      const wrongs = items.filter(it => state[it.key]?.wrong);
      $app().innerHTML = header(opts.title, opts.back) + `
        <div class="result"><div class="big">${firstRight} / ${total}</div><p>한 번에 맞힌 문제</p>
        ${wrongs.length ? `<h3>다시 복습할 문제 (${wrongs.length})</h3><ul>${wrongs.map(w => `<li>${esc(w.q)} → <b>${esc(w.answer)}</b></li>`).join('')}</ul><p class="small">이 문제들은 내일 '오늘 다시 풀 문제'에 다시 나와요.</p>` : '<p>모두 한 번에 맞혔어요!</p>'}
        <div class="row"><a class="btn" href="${opts.back}">돌아가기</a> <button class="btn ghost" id="again">한 번 더</button></div></div>`;
      document.getElementById('again').onclick = () => runQuiz(items, opts);
    }

    function next() {
      if (myRun !== runToken) return; // user navigated away
      if (!queue.length) return finish();
      const it = queue[0];
      const remaining = new Set(queue.map(q => q.key)).size;
      const prog = Math.round(100 * (total - remaining) / total);
      let body = '';
      const sayBtn = it.say ? `<button class="say" id="say">듣기</button>` : '';
      if (it.type === 'mc') {
        body = `<div class="choices">${choicesFor(it).map(c => `<button class="choice" data-v="${esc(c)}">${esc(c)}</button>`).join('')}</div>`;
      } else if (it.type === 'type') {
        body = `<form id="f"><input id="inp" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="정답을 입력하세요"><button class="btn">확인</button></form>${it.hint ? `<p class="hint">힌트: ${esc(it.hint)}</p>` : ''}`;
      } else if (it.type === 'order') {
        const words = it.answer.replace(/[.?!]$/, '').split(' ');
        if (!/^(I|I'm|I'll|I've|I'd)$/.test(words[0])) words[0] = words[0].charAt(0).toLowerCase() + words[0].slice(1); // don't give away the first word
        const toks = shuffle(words.concat(it.extra || []));
        body = `<div class="built" id="built"></div><div class="tokens">${toks.map((t, i) => `<button class="tok" data-i="${i}">${esc(t)}</button>`).join('')}</div>
          <div class="row"><button class="btn ghost" id="undo">하나 지우기</button><button class="btn" id="ok">확인</button></div>`;
      } else if (it.type === 'speak') {
        body = `<p class="small">소리 내어 영어로 말해 본 다음 정답을 확인하세요.</p><button class="btn" id="reveal">정답 보기</button>
          <div id="rv" hidden><div class="answer">${esc(it.answer)}</div><button class="say" id="say2">듣기</button>
          <div class="row"><button class="btn good" id="me-ok">맞게 말했어요</button><button class="btn bad" id="me-no">틀렸어요</button></div></div>`;
      }
      $app().innerHTML = header(opts.title, opts.back) + `
        <div class="progress"><span style="width:${prog}%"></span></div>
        <div class="qbox"><div class="sec-label">${esc(it.secTitle || '')}${state[it.key]?.wrong ? ' · <em>다시 도전</em>' : ''}</div>
        <div class="q">${esc(it.q)}</div>${sayBtn}${body}<div id="fb"></div></div>`;
      const sb = document.getElementById('say'); if (sb) sb.onclick = () => speak(it.say);

      const judge = (ok, given) => {
        const fb = document.getElementById('fb');
        $app().querySelectorAll('button.choice,button.tok,#ok,#undo,#f button').forEach(b => b.disabled = true);
        if (!state[it.key]) state[it.key] = { wrong: false };
        if (ok) {
          if (!state[it.key].wrong) firstRight++;
          recordResult(it, true, state[it.key].wrong);
          queue.shift();
          fb.innerHTML = `<div class="fb good">정답!${it.explain ? `<br><small>${esc(it.explain)}</small>` : ''}</div>`;
          if (it.type !== 'speak' && !it.explain) setTimeout(next, 700);
          else fb.innerHTML += `<button class="btn" id="nx">다음</button>`;
        } else {
          state[it.key].wrong = true;
          recordResult(it, false, true);
          queue.shift();
          queue.splice(Math.min(3, queue.length), 0, it); // comes back soon
          fb.innerHTML = `<div class="fb bad">${given != null ? `내 답: ${esc(given)}<br>` : ''}정답: <b>${esc(it.answer)}</b>${it.explain ? `<br><small>${esc(it.explain)}</small>` : ''}<br><small>이 문제는 조금 뒤에 다시 나와요.</small></div><button class="btn" id="nx">다음</button>`;
        }
        const nx = document.getElementById('nx'); if (nx) { nx.onclick = next; nx.focus(); }
      };

      if (it.type === 'mc') {
        $app().querySelectorAll('.choice').forEach(b => b.onclick = () => {
          const ok = b.dataset.v === it.answer;
          b.classList.add(ok ? 'right' : 'wrong');
          if (!ok) $app().querySelectorAll('.choice').forEach(x => { if (x.dataset.v === it.answer) x.classList.add('right'); });
          judge(ok, ok ? null : b.dataset.v);
        });
      } else if (it.type === 'type') {
        const inp = document.getElementById('inp'); inp.focus();
        document.getElementById('f').onsubmit = e => {
          e.preventDefault(); const v = inp.value; if (!v.trim()) return;
          const ok = [it.answer, ...(it.accept || [])].some(a => norm(a) === norm(v));
          inp.disabled = true; judge(ok, ok ? null : v);
        };
      } else if (it.type === 'order') {
        const built = [];
        const draw = () => document.getElementById('built').innerHTML = built.map(b => `<span>${esc(b.t)}</span>`).join(' ') || '<i>단어를 순서대로 눌러 문장을 만드세요</i>';
        draw();
        $app().querySelectorAll('.tok').forEach(b => b.onclick = () => { built.push({ t: b.textContent, b }); b.disabled = true; draw(); });
        document.getElementById('undo').onclick = () => { const x = built.pop(); if (x) { x.b.disabled = false; draw(); } };
        document.getElementById('ok').onclick = () => {
          const v = built.map(b => b.t).join(' ');
          const ok = [it.answer, ...(it.accept || [])].some(a => norm(a) === norm(v));
          judge(ok, ok ? null : v);
        };
      } else if (it.type === 'speak') {
        document.getElementById('reveal').onclick = () => { document.getElementById('rv').hidden = false; document.getElementById('reveal').hidden = true; };
        document.getElementById('say2').onclick = () => speak(it.say || it.answer);
        document.getElementById('me-ok').onclick = () => { document.getElementById('me-ok').disabled = document.getElementById('me-no').disabled = true; judge(true); };
        document.getElementById('me-no').onclick = () => { document.getElementById('me-ok').disabled = document.getElementById('me-no').disabled = true; judge(false); };
      }
    }
    next();
  }

  function viewSection(id, si) {
    const l = lessons[id]; if (!l) return viewHome();
    const sec = l.sections[si];
    runQuiz(itemsOf(l, si), {
      title: sec.title, back: '#/lesson/' + encodeURIComponent(id),
      onDone: () => { db.sections[l.id + ':' + si] = ymd(today()); save(); },
    });
  }

  function viewReview() {
    const items = wrongItems(true);
    if (!items.length) {
      const all = wrongItems(false);
      $app().innerHTML = header('오늘 다시 풀 문제', '#/') + `<div class="result"><p>오늘 복습할 문제가 없어요.</p>
        ${all.length ? `<p class="small">오답노트에 ${all.length}개가 있지만 아직 복습 날짜가 아니에요.</p><button class="btn ghost" id="force">그래도 지금 풀기</button>` : ''}</div>`;
      const f = document.getElementById('force'); if (f) f.onclick = () => runQuiz(all, { title: '오답노트 전체', back: '#/' });
      return;
    }
    runQuiz(items, { title: '오늘 다시 풀 문제', back: '#/' });
  }

  function route() {
    runToken++;
    if (window.speechSynthesis) speechSynthesis.cancel();
    const h = decodeURIComponent(location.hash.slice(1) || '/');
    const m = h.split('/').filter(Boolean);
    if (m[0] === 'lesson' && m[2] != null) return viewSection(m[1], +m[2]);
    if (m[0] === 'lesson') return viewLesson(m[1]);
    if (m[0] === 'review' && m[1] === 'all') return runQuiz(wrongItems(false), { title: '오답노트 전체', back: '#/' });
    if (m[0] === 'review') return viewReview();
    viewHome();
  }

  window.L3 = {
    add(lesson) { lessons[lesson.id] = lesson; },
    start() {
      const ids = window.L3_MANIFEST || [];
      let left = ids.length;
      const go = () => { window.addEventListener('hashchange', route); route(); };
      if (!left) return go();
      ids.forEach(id => {
        const s = document.createElement('script'); s.src = 'lessons/' + id + '.js?v=' + (window.L3_VERSION || '1');
        s.onload = s.onerror = () => { if (--left === 0) go(); };
        document.head.appendChild(s);
      });
    },
  };
})();
