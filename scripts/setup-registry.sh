#!/usr/bin/env bash
# Menarik repo referensi/skill yang kamu minta. Butuh internet + git + npm.
set -e
cd "$(dirname "$0")/.."

echo "==> npm install (gsap, lenis, shadcn/ui primitives, recharts, dst.)"
npm install

mkdir -p .claude/skills vendor

echo "==> Skill untuk AI coding assistant (Claude Code dll.)"
for r in nextlevelbuilder/ui-ux-pro-max-skill leonxlnx/taste-skill wheresryan22/anatomy; do
  name=$(basename "$r")
  [ -d ".claude/skills/$name" ] || git clone --depth 1 "https://github.com/$r" ".claude/skills/$name"
done

echo "==> Registry komponen UI (disalin ke vendor/ sebagai referensi)"
for r in nolly-studio/cult-ui nischayhq/skiper-ui bklit/bklit-ui KingTroy125/evilcharts.v1; do
  name=$(basename "$r")
  [ -d "vendor/$name" ] || git clone --depth 1 "https://github.com/$r" "vendor/$name"
done

echo "Selesai. Jalankan: npm run dev"
echo "Untuk menambah komponen shadcn resmi: npx shadcn@latest add <nama>"
