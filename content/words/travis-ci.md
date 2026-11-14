---
title: Travis CI
aliases: []
description: リポジトリと連携し、Push のたびに設定したテストやビルドのコマンドを実行する CI サービス
tags: [word]
date: 2024-09-06
---

## TL;DR

[[github|GitHub]] などのリポジトリと連携し、Push のたびに `.travis.yml` で指定したコマンドを実行する [[continuous-integration|CI]] サービス。

## 仕組み

GitHub で使い始める手順は次のとおりである。

1. GitHub アカウントでログインする。
2. リポジトリと連携する。
3. リポジトリのルートに `.travis.yml` を作る。
4. Push する。
5. Travis CI が `script` に指定したコマンドを実行する。

## 例

[[nodejs|Node.js]] のプロジェクトでテスト、リント、ビルドを実行する `.travis.yml` である。Linux ディストリビューションに Ubuntu 22.04 LTS（Jammy Jellyfish）を、言語に Node.js の 18 を指定している。

```yaml
dist: jammy
language: node_js
node_js:
  - 18
script: npm test && npm run lint && npm run build
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[husky|Husky]]

## 出典

- [Travis CI](https://www.travis-ci.com/)
- [Tutorial - Travis CI](https://docs.travis-ci.com/user/tutorial/#to-get-started-with-travis-ci-using-github)
- [Ubuntu 22.04 (Jammy Jellyfish) - Travis CI](https://docs.travis-ci.com/user/reference/jammy/)
- [Building a JavaScript and Node.js project - Travis CI](https://docs.travis-ci.com/user/languages/javascript-with-nodejs/#specifying-nodejs-versions)
