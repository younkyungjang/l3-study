#!/bin/bash
# band-l3-study 스킬을 새 데스크탑에 설치합니다.
# 사용법: bash install.sh [Aside 계정 폴더]   (기본값: ~/.aside/u/0)
set -e

ASIDE_HOME="${1:-$HOME/.aside/u/0}"
DEST="$ASIDE_HOME/skills/user/band-l3-study"
REPO="https://github.com/younkyungjang/l3-study.git"

if [ ! -d "$ASIDE_HOME" ]; then
  echo "Aside 계정 폴더를 찾을 수 없어요: $ASIDE_HOME"
  echo "Aside를 먼저 설치/로그인한 뒤, 폴더 경로를 인자로 넘겨 주세요."
  exit 1
fi

mkdir -p "$DEST"

# 1) 퀴즈 사이트 소스 (git clone)
if [ -d "$DEST/site/.git" ]; then
  echo "site/ 가 이미 있어서 최신으로 받아요."
  git -C "$DEST/site" pull --ff-only
else
  git clone "$REPO" "$DEST/site"
fi

# 2) 스킬 파일 (SKILL.md, config.json, state.json)
cp "$DEST/site/setup/SKILL.md" "$DEST/SKILL.md"
cp "$DEST/site/setup/config.json" "$DEST/config.json"
cp "$DEST/site/setup/state.json" "$DEST/state.json"

# 3) git 커밋 정보
git -C "$DEST/site" config user.name "younkyungjang"
git -C "$DEST/site" config user.email "younkyungjang@users.noreply.github.com"

# 4) 토큰 자리 (토큰은 저장소에 없어요)
mkdir -p "$DEST/.secrets" && chmod 700 "$DEST/.secrets"

echo ""
echo "설치 완료: $DEST"
if [ -s "$DEST/.secrets/github_token" ]; then
  echo "GitHub 토큰: 있음"
else
  echo "GitHub 토큰: 없음 -> SETUP.md 의 '3단계: GitHub 토큰' 을 따라 $DEST/.secrets/github_token 에 넣어 주세요."
fi
