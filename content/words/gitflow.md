---
title: Gitflow
aliases: []
description: master と develop の 2 つの長命なブランチに、feature、release、hotfix の補助ブランチを組み合わせる Git のブランチモデル
tags: [word, git]
date: 2026-11-14
---

## TL;DR

Vincent Driessen が 2010 年に「A successful Git branching model」で提案した、[[git|Git]] のブランチモデル。`master` と `develop` の 2 つの長命なブランチに、`feature`、`release`、`hotfix` の補助ブランチを組み合わせる。

## なぜ必要か

本番に出ているコードと、次のリリースに向けて開発中のコードを分けて管理できる。明示的にバージョンを付けて出すソフトウェアや、複数のバージョンを並行して保守するソフトウェアに向いている。

## 仕組み

`master` は常に本番に出せる状態を表し、`master` へのマージはそのまま新しいリリースになる。`develop` は次のリリースに向けて、完成した変更を集める統合用のブランチである。

補助ブランチは次のとおりである。

- **feature**: `develop` から分岐し、`develop` にマージする
- **release**: `develop` から分岐し、`develop` と `master` の両方にマージする。リリース前の細かい修正やバージョン番号の更新に使う
- **hotfix**: `master` から分岐し、`master` と `develop` の両方にマージする。本番の緊急の修正に使う

## 注意点

Driessen は 2020 年に記事へ追記し、このモデルが教義のように扱われることもあると述べている。継続的にデリバリーされ、ロールバックや複数バージョンの並行運用をしない Web アプリでは、[[github-flow|GitHub Flow]] のような単純なワークフローのほうが合う。また、長命なブランチを使い分けるので、コンフリクトや複雑なマージ作業が起こりやすい。これを避ける方法として[[trunk-based-development|トランクベース開発]]がある。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[github-flow|GitHub Flow]]
- [[trunk-based-development|トランクベース開発]]

## 出典

- [A successful Git branching model » nvie.com](https://nvie.com/posts/a-successful-git-branching-model/)
