---
title: cargo-deny
aliases: []
description: Rust プロジェクトの依存グラフを検査し、脆弱性、ライセンス、禁止したクレート、取得元の問題を見つける Cargo の拡張ツール
tags: [word, rust, セキュリティ]
date: 2026-11-14
---

## TL;DR

プロジェクトの依存グラフをリントする [[cargo|Cargo]] のプラグイン。既知の脆弱性を持つバージョン、受け入れられないライセンス、複数のバージョンが混在するクレートなどを検出する。

## なぜ必要か

[[Effective Rust 項目25 依存グラフを管理しよう|Effective Rust 項目25]] によると、依存クレートはコードを書く時間を節約するが、コストもある。脆弱性のように、自分のクレートの外で起きた問題には気づきにくい。cargo-deny を [[continuous-integration|CI]] に組み込めば、こうした問題に気づける。

## 仕組み

公式ドキュメントによると、チェックは次の 4 種類に分かれている。

- licenses: 依存クレートのライセンス
- bans: 禁止したクレートや、重複したバージョン
- advisories: セキュリティ勧告
- sources: クレートの取得元

[[Effective Rust 項目25 依存グラフを管理しよう|Effective Rust 項目25]] によると、チェックは個別に設定でき、例外も指定できる。[[Effective Rust 項目31 ツールのエコシステムを活用しよう|項目31]] によると、cargo-deny は `cargo metadata` で取得したメタデータを使っている。

## 例

`cargo deny init` でプロジェクトの既定の設定ファイルを作り、`cargo deny check` でチェックを実行する。

```sh
cargo deny init
cargo deny check
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[cargo|Cargo]]
- [[cargo-udeps|cargo-udeps]]
- [[cargo-semver-checks|cargo-semver-checks]]
- [[supply-chain-attack|サプライチェーン攻撃]]

## 出典

- [cargo-deny](https://embarkstudios.github.io/cargo-deny/)
- [[Effective Rust 項目25 依存グラフを管理しよう|Effective Rust 項目25 依存グラフを管理しよう]]
- [[Effective Rust 項目31 ツールのエコシステムを活用しよう|Effective Rust 項目31 ツールのエコシステムを活用しよう]]
- [[Effective Rust 項目32 CIシステムを設定しよう|Effective Rust 項目32 CIシステムを設定しよう]]
