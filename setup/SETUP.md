# 새 데스크탑에서 L3 공부 자동화 이어가기

밴드 "2026 분당 초등 L3" 새 글 → 퀴즈 생성 → GitHub Pages + Notion(MJ Crassen) 업로드를
매일 밤 9시에 자동으로 하던 설정을 다른 데스크탑으로 옮기는 방법이에요.

## 어디에 무엇이 있나요

| 구성 | 위치 | 옮길 필요 |
|-|-|-|
| 퀴즈 사이트 | https://younkyungjang.github.io/l3-study/ | 없음 (인터넷) |
| 퀴즈 소스 | 이 저장소 (`index.html`, `app.js`, `lessons/`) | install.sh가 받아요 |
| Notion 페이지 | MJ Crassen (workspace "Kay") 안의 "수업 자료" 데이터베이스 | 없음 (같은 계정 로그인) |
| 스킬 (작업 방법) | 이 저장소 `setup/SKILL.md` | install.sh가 복사해요 |
| 설정 (Notion ID 등) | `setup/config.json` | install.sh가 복사해요 |
| 마지막 처리 글 번호 | `setup/state.json` | install.sh가 복사해요 |
| GitHub 토큰 | 저장소에 **없음** (보안) | 3단계에서 직접 |
| 매일 밤 9시 루틴 | 각 데스크탑의 Aside | 5단계에서 새로 만들기 |
| 아이 오답 기록 | 퀴즈를 푸는 기기의 브라우저 | 없음 |

## 1단계: 브라우저 로그인 (새 데스크탑의 Aside 브라우저)

- 밴드: https://www.band.us/band/97376330/post 원래 쓰던 방법(이메일/전화번호/네이버/구글)으로 로그인, **Keep me logged in 체크**
- Notion: MJ Crassen 페이지가 있는 계정 (workspace "Kay")
- GitHub: younkyungjang 계정

## 2단계: 스킬 설치

터미널에서:

```bash
curl -fsSL https://raw.githubusercontent.com/younkyungjang/l3-study/main/setup/install.sh -o /tmp/install.sh
bash /tmp/install.sh            # Aside 계정 폴더가 ~/.aside/u/0 가 아니면 경로를 뒤에 붙이기
```

또는 Aside에게: "https://github.com/younkyungjang/l3-study 의 setup/SETUP.md 대로 band-l3-study 스킬 설치해줘"

설치되면 `<Aside 계정 폴더>/skills/user/band-l3-study/` 에 아래가 생겨요.

```
SKILL.md  config.json  state.json  site/ (이 저장소)  .secrets/ (비어 있음)
```

## 3단계: GitHub 토큰

매일 밤 퀴즈를 저장소에 올리려면 토큰이 필요해요. 둘 중 하나:

- **A. 기존 토큰 옮기기:** 원래 데스크탑의 `skills/user/band-l3-study/.secrets/github_token` 파일을 USB/AirDrop으로 새 데스크탑의 같은 위치에 복사. (메일·메신저로 보내지 않기)
- **B. 새 토큰 만들기 (추천):** https://github.com/settings/personal-access-tokens/new
  - Repository access: Only select repositories → `l3-study`
  - Permissions: Contents = Read and write, Pages = Read and write
  - 만든 토큰을 `.secrets/github_token` 파일에 한 줄로 저장, `chmod 600`
  - 원래 토큰("l3-study nightly publish (Aside)")은 Fine-grained tokens에서 삭제

확인:

```bash
cd <Aside 계정 폴더>/skills/user/band-l3-study/site
git push "https://x-access-token:$(cat ../.secrets/github_token)@github.com/younkyungjang/l3-study.git" HEAD:main
# "Everything up-to-date" 가 나오면 OK
```

## 4단계: 원래 데스크탑 루틴 끄기

두 데스크탑이 동시에 돌면 같은 글을 두 번 처리해서 Notion에 자료가 중복돼요.
원래 데스크탑의 Aside에서 루틴 **"밴드 L3 새 자료 → 공부 퀴즈 (월/금반)"** 을 일시정지(또는 삭제)해 주세요.

## 5단계: 새 데스크탑에서 루틴 만들기

새 데스크탑 Aside에게 아래를 그대로 요청하세요.

> band-l3-study 스킬(skills/user/band-l3-study/SKILL.md)을 읽고, 매일 밤 9시(Asia/Seoul)에 실행되는 루틴을 만들어줘.
> 내용: 밴드 "2026 분당 초등 L3"에서 state.json의 lastPostNo 이후 새 글을 확인하고, L3 글만 골라 카테고리별로 퀴즈 레슨을 만들어 로컬 테스트 후 GitHub에 push하고 Notion "수업 자료"에 행을 추가한 다음 state.json을 갱신해.
> 밴드가 로그아웃이면 로그인이 필요하다고만 짧게 알려줘. 새 글이 없으면 한 줄로 끝내. 답지 비밀번호와 토큰은 절대 출력하지 마.
> 그리고 지금 바로 한 번 실행해서 밀린 글을 처리해줘.

## 6단계: 확인

- 퀴즈 홈 https://younkyungjang.github.io/l3-study/ 에 새 자료 카드가 보이는지
- Notion MJ Crassen → 수업 자료 에 새 행이 생겼는지

## 참고

- 이 저장소와 퀴즈 사이트는 **공개(public)** 예요. 토큰, 비밀번호, 이메일, 아이 이름은 올리지 않아요.
- 루틴은 처리할 때마다 `SKILL.md`, `config.json`, `state.json` 을 `setup/` 에 복사해서 같이 올려요. 그래서 다음에 또 데스크탑을 옮겨도 이 문서대로 하면 이어서 할 수 있어요.
- Notion 행 속성은 만든 뒤에 수정하면 오류(400)가 나요. 고칠 땐 행을 지우고 다시 만들어요 (자세한 방법은 config.json의 `howToAddRow`).
