---
title: cargo-semver-checks
aliases: []
description: 公開前のクレートを前のバージョンと比べ、SemVer に反する破壊的変更がないかを検査する Cargo の拡張ツール
tags: [word, rust, バージョニング]
date: 2026-11-14
---

## TL;DR

[[rust|Rust]] のクレートに、[[semantic-versioning|SemVer]] の違反がないかを検査するツール。公開する前に `cargo semver-checks` を実行すると、バージョン番号に見合わない[[breaking-change|破壊的変更]]を見つけられる。

## なぜ必要か

[[Effective Rust 項目21 セマンティックバージョン（SemVer）を理解しよう|Effective Rust 項目21]] によると、変更が後方互換かどうかを目で確かめるのは大変なので、cargo-semver-checks などを [[continuous-integration|CI]] で動かすとよい。

## 仕組み

README によると、rustdoc の JSON 出力を情報源にしている。リントは Trustfall というクエリエンジンのクエリとして書かれていて、リントを作る手間と保守する手間を減らしている。比べる基準は、デフォルトでは crates.io にある前のバージョンである。バージョン、git のリビジョン、ソースのディレクトリ、rustdoc の JSON ファイルで基準を指定することもできる。

## 例

```sh
cargo install cargo-semver-checks --locked
cargo semver-checks
```

GitHub Actions 用のアクション `obi1kenobi/cargo-semver-checks-action` も用意されている。

## 注意点

すべての破壊的変更を検出できるわけではない。フィールドや引数の型の変更、ジェネリクスやライフタイムの変更などには、まだリントがない。一部のフィーチャを有効にしたときだけ起きる破壊的変更も見逃すことがある。一方で、誤検知はバグとして扱われる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[breaking-change|破壊的変更]]
- [[semantic-versioning|セマンティックバージョニング]]
- [[cargo|Cargo]]
- [[cargo-deny|cargo-deny]]

## 出典

- [obi1kenobi/cargo-semver-checks](https://github.com/obi1kenobi/cargo-semver-checks)
- [[Effective Rust 項目21 セマンティックバージョン（SemVer）を理解しよう|Effective Rust 項目21 セマンティックバージョン（SemVer）を理解しよう]]
- [[Effective Rust 項目31 ツールのエコシステムを活用しよう|Effective Rust 項目31 ツールのエコシステムを活用しよう]]
