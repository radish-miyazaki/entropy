---
title: GitHub Flow
aliases: []
description: GitHub が提唱する、ブランチとプルリクエストを使った軽量なワークフロー
tags: [word, ブランチ戦略]
date: 2024-10-02
---

## TL;DR

[[github|GitHub]] が提唱する、ブランチをベースにした軽量なワークフロー。既定のブランチから作業用のブランチを切り、プルリクエストでレビューしてからマージする。

## 仕組み

1. 既定のブランチに影響を与えずに作業するため、ブランチを作る。名前は作業内容が分かるよう短く明確にする
2. ブランチ上で変更をコミットし、プッシュする。関連のない変更は別のブランチに分ける
3. プルリクエストを作り、変更の概要と解決する問題を書く。完成前に意見がほしければ下書きにできる
4. レビューの質問や提案に応じて、コミットを追加する
5. 承認を得たら、プルリクエストを既定のブランチにマージする
6. マージしたブランチを削除する。プルリクエストやコミットの履歴は残る

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[trunk-based-development|トランクベース開発]]
- [[gitflow|Gitflow]]

## 出典

- [GitHub フロー - GitHub Docs](https://docs.github.com/ja/get-started/using-github/github-flow)
- [GitHub Flow（Qiita）](https://qiita.com/satohiro/items/7d5abde24222e6026d3d)
- [ブランチ戦略 GitHub Flow - Insight Edge Tech Blog](https://techblog.insightedge.jp/entry/branch-strategy-github-flow)
