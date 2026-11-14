---
title: トランクベース開発
aliases: []
description: すべての開発者がトランクと呼ばれる単一のメインブランチに、頻繁に変更を統合していくブランチ戦略
tags: [word, ブランチ戦略, devops]
date: 2024-10-02
---

## TL;DR

ソースコード管理のブランチ戦略の 1 つ。すべての開発者が、トランクと呼ばれる単一のメインブランチ（`main` や `master`）に、直接またはごく短命なブランチを経由して、頻繁に変更を統合していく。DevOps の文脈で挙げられることが多い。

## なぜ必要か

[[gitflow|Gitflow]] では、`develop` や長く残る `feature`、`release` など、複数の長命なブランチを使い分ける。そのためコンフリクトが起こりやすく、複雑なマージ作業（Merge Hell）にもなりやすい。トランクベース開発では、ブランチの形がシンプルで、コンフリクトが起こりにくい。

ほかにも次の利点がある。

- 頻繁にトランクにマージするので、[[continuous-integration|CI]]/CD と相性がよく、常に最新のコードでテストやデプロイができる
- 差分が小さいうちにマージするので、コンフリクトが起きにくく、起きても解決が楽である
- 全員の変更がすぐトランクに入るので、プロジェクト全体の状況を把握しやすい
- 変更がすぐ自動テストされるので、問題を早く見つけられる
- トランクが安定しているので、緊急の修正や計画外のリリースにも対応しやすい

## 仕組み

開発の中心となるブランチは `main` または `master` だけである。新機能やバグ修正のためにブランチを作る場合も、そのブランチは数時間から数日以内でトランクにマージする。開発者は自分の変更を 1 日に何度もトランクにマージし、トランクを常にリリースできる状態に保つことを目指す。

未完成の機能や、特定のユーザだけに公開したい機能もトランクにマージするので、[[feature-flag|フィーチャーフラグ]]（機能フラグ、フィーチャートグルとも）がよく使われる。

## 注意点

トランクの安定性を保つことが重要なので、網羅的で信頼性の高い自動テストが欠かせない。CI のテストが落ちたら緊急事態として扱い、すぐに `git revert` するか修正して、トランクを正常な状態に戻す。

開発者は、頻繁にコミットしてマージできるよう、小さな単位で作業する必要がある。未完成の機能を安全にマージするために、フィーチャーフラグの設計と管理も必須になる。

## 自分の理解

フィーチャーフラグのライブラリとしては、[[ruby|Ruby]] なら [Flipper](https://github.com/flippercloud/flipper)、[[go|Go]] なら [[go-feature-flag|GO Feature Flag]] あたりだろうか。

## 関連

- [[github-flow|GitHub Flow]]
- [[gitflow|Gitflow]]
- [[feature-flag|フィーチャーフラグ]]
- [[continuous-integration|継続的インテグレーション]]

## 出典

- [トランクベース開発 - Atlassian](https://www.atlassian.com/ja/continuous-delivery/continuous-integration/trunk-based-development)
- [トランクベース開発のブランチ戦略（Zenn）](https://zenn.dev/sun_asterisk/articles/trunk-based-development-strategy)
- [トランクベース開発（Qiita）](https://qiita.com/kaaaichi_i/items/9153573e224d653e6f24)
- [トランクベース開発について（Zenn）](https://zenn.dev/tetoteto/articles/trunk_base_develop)
- [トランクベース開発（Zenn）](https://zenn.dev/takamin55/articles/2876db9d0693f3)
