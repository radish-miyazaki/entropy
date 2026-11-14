---
title: Dependabot
aliases: []
description: リポジトリの依存関係の更新を検知し、更新のプルリクエストを自動で作る GitHub の機能
tags: [word]
date: 2026-11-14
---

## TL;DR

リポジトリの[[dependency|依存関係]]が古くなったり脆弱性が見つかったりしたときに、更新するプルリクエストを自動で作る [[github|GitHub]] の機能。

## なぜ必要か

依存のバージョンを固定したまま放っておくと、古いバージョンに留まり、安全でなくなるおそれがある。[[Effective Rust]] の項目 25 では、Cargo.lock をバージョン管理するなら、Dependabot などでアップグレードを管理する仕組みも用意するよう勧めている。

## 仕組み

GitHub の公式ドキュメントによると、Dependabot には 2 つの機能がある。

- **バージョン更新**: 既知の脆弱性がなくても、依存を最新に保つためのプルリクエストを作る。リポジトリに `dependabot.yml` をコミットして有効にし、このファイルでマニフェストの場所や更新の方法を指定する。
- **セキュリティ更新**: 既知の脆弱性がある依存を更新するプルリクエストを作る。バージョン更新とは別に有効にする。

古い依存が見つかると、マニフェストを最新のバージョンに更新するプルリクエストが作られる。利用者は変更履歴やリリースノートを確かめ、テストが通ることを確認してからマージする。既定では、新しいバージョンは公開から 3 日たつまで提案されない。この待ち期間（cooldown）はバージョン更新にだけ適用され、セキュリティ更新には適用されない。

## 例

[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目|Effective TypeScript]] の項目 65 によると、Dependabot や [[renovate|Renovate]] には、エンドユーザに直接影響する `dependencies` の更新を優先する設定がある。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[renovate|Renovate]]
- [[semantic-versioning|セマンティックバージョニング]]
- [[dependency-graph|依存グラフ]]

## 出典

- [About Dependabot version updates - GitHub Docs](https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/about-dependabot-version-updates)
- [[Effective Rust 項目25 依存グラフを管理しよう|Effective Rust 項目25]]
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目65 TypeScriptと@typesはdevDependenciesに追加する|Effective TypeScript 第2版 項目65]]
