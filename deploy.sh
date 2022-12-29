#!/usr/bin/env sh

set -e

pnpm run docs:build
cd docs/.vitepress/dist

msg="github actions 自动部署"

git init
git add -A
git commit -m "${msg}"
git push -f  git@github.com:aidenup/aiden-Notes.git master:gh-pages

cd -
rm -rf docs/.vitepress/dist