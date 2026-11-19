---
name: band-l3-study
description: Use when checking the BAND group "2026 분당 초등 L3" for new posts and turning L3 class materials into interactive quiz lessons (월/금반 schedule), publishing them to the quiz site and the Notion study page. Used by the daily 9PM routine.
---
# BAND L3 → 인터랙티브 공부 자료 (월/금반)

Child attends the **월/금반** of 크라센 분당 초등 L3. Every Mon and Fri class covers all subjects, so all homework and review must be done **before the next class** (월 수업 전 / 금 수업 전).

## Sources
- BAND: https://www.band.us/band/97376330/post (needs the user's BAND login in the browser).
- Post detail: https://band.us/band/97376330/post/<no>. Read post text from `main`.
- File download: clicking a file link calls `api-kr.band.us/v1.1/get_file_url` (signed; calling it directly returns "not authorized"). Hook `XMLHttpRequest` in the page to capture the response JSON (`result_data.url`), then `fetch()` that URL and save. Read PDFs with `pdftotext -layout`. Whiteboard photos: `main img` with `coresos-phinf.pstatic.net` src; read the image visually.
- Track processed post numbers in `state.json` (this folder): `{ "lastPostNo": 894, "processed": [...] }`.

## L3 filter
Include posts with L3 / L3&L4 / L3-L4 or no level mark. Skip posts whose file/title names another level only (e.g. "L6"). Skip LIVE videos (no content). Never copy the 답지 password from posts into any output.

## Categories → lesson file
| Cat | How to recognise | Lesson sections (quiz types) |
|-|-|-|
| LC | Khanyo/Rea "LC/Listening Materials", Reading Voyage Starter 2 Unit PDF (+ passage PDF, MP3), Mon/Tue ~2PM | 단어 뜻(mc) · 영영 뜻→단어(type) · 동의어(mc) · 내용 이해(mc) · Core Sentence 빈칸(type, `say` TTS) · 문장 만들기(order, incl. MKE & Target Structure) · 말하기(speak) |
| WR | "Writing (Class) Materials", SP&WR PDF (TOEFL q, Fast Speaking, Essay stage), Wed/Thu | 전치사/문법(mc) · Fast Speaking 문장(order; mark the 숙제 numbers from the post) · TOEFL 표현(mc) · TOEFL 말하기 틀(speak) · 에세이 단어(mc) · 에세이 단계 구조(mc). Never write the essay or TOEFL answer for the child: use frames/questions. |
| WB | Whiteboard photo posts | Not a separate lesson: use as answer key to fill/verify the matching LC/WR lesson (definitions, comprehension answers, note-taking sentences). |
| KT | 박서현 "한국인T 수업 자료" (Review Test 학생용/AK, RC 단어 리스트, 크코센 구조분석, This Is Voca, Grammar Inside) | RC 단어(mc) · 동의어/반의어(mc) · This Is Voca(mc) · 크코센 구조분석(mc) · 문법 고르기(mc) · 영작(order, with `extra` distractor tokens) |
| PK | ★누적패킷★ | 문법 영작 by grammar topic(order) · 말하기 총정리(speak); plan = day-by-day until the test |
| HW | HW Guide / 숙제 공지 | No quiz: add items to the related lesson's `checklist` with due date |

Use only facts from the materials (answer keys, whiteboard, AK). If you must infer an answer, say so in `explain`.

## Lesson file format (`site/lessons/<YYYY-MM-DD>-<CAT>-<slug>.js`)
```js
L3.add({ id, date, category: 'LC'|'WR'|'KT'|'PK', categoryLabel, title, due, source /*band post url*/, note,
  plan: ['요일: 섹션 ...'], checklist: ['숙제 ...'],
  sections: [{ id, title, guide, type: 'mc'|'type'|'order'|'speak', items: [
    { q, answer, choices?, accept?, say?, hint?, explain?, extra? } ] }] });
```
- mc without `choices` auto-picks distractors from the same section's answers.
- order splits `answer` on spaces; keep punctuation attached.
- Add the id to the top of `site/lessons/manifest.js` and bump `L3_VERSION`.
- Test locally: `cd site && python3 -m http.server 8765`, open http://localhost:8765, run each new section once.

## 월/금반 study plan (put the matching lines in each lesson's `plan`)
| 날 | 할 일 |
|-|-|
| 월 (수업) 밤 | 새 LC + KT 자료: LC 단어 뜻, RC 단어 |
| 화 | LC 영영 뜻·동의어·내용 이해 / This Is Voca |
| 수 | LC Core Sentence 빈칸·문장 만들기 → Booklet 다시 쓰기 / 크코센 구조분석 |
| 목 | LC 말하기 → 단어·Core Sentence 3번씩 녹음 업로드 / KT 문법·영작 / 오늘 다시 풀 문제 |
| 금 수업 전 | 오답노트 전체 풀기 (Review Test 대비) |
| 금 (수업) 밤 | 새 WR + KT 자료: 전치사, Fast Speaking 문장 |
| 토 | TOEFL 표현·말하기 → TOEFL 1분 녹음 + Self Evaluation / KT 단어 |
| 일 | 에세이 단어·구조 → Booklet 아웃라인/드래프트, Fast Speaking 2번씩 녹음, 업로드 / KT 크코센·문법 |
| 월 수업 전 | 오답노트 전체 풀기 |

## Publish
- Site: https://younkyungjang.github.io/l3-study/ (repo younkyungjang/l3-study, local clone = `site/`). Push: `cd site && git add -A && git commit -m "..." && git push "https://x-access-token:$(cat ../.secrets/github_token)@github.com/younkyungjang/l3-study.git" HEAD:main`. Pages rebuilds in ~30-60s; check `curl <siteUrl>lessons/manifest.js`. Never print the token. ("failed to store: -60008" from git is harmless.)
- Notion (the logged-in Notion account, workspace Kay): page "MJ Crassen" with "수업 자료" database; ids and the exact row recipe are in `config.json` → `notion.howToAddRow`. Set ALL row properties at creation (later property edits fail with 400; to change a row, remove and recreate it, then update `config.json` → `notion.rows`). Row page = 마감/밴드 quote → `## 퀴즈` + embed of `<siteUrl>#/lesson/<id>` → 공부 순서 → 숙제 체크 (to-dos) → 정답 노트.
- When a whiteboard post (WB) arrives for an existing lesson, edit that lesson file, push, and recreate its Notion row.
- Finish with a short Korean summary: which posts were new, which lessons were created, what to do tomorrow.

## Keep the GitHub copy in sync (for other desktops)
The repo also holds a copy of this skill in `site/setup/` (SKILL.md, config.json, state.json, install.sh, SETUP.md).
Before every push: `cp SKILL.md config.json state.json site/setup/` so another desktop can resume from the latest state.
Never copy `.secrets/` into `site/`. The repo and the Pages site are public: no tokens, passwords, emails, or the child's name.
Only ONE desktop may run the nightly routine at a time, otherwise posts get processed twice and Notion rows duplicate.
