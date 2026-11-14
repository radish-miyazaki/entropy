---
title: MSRV
aliases: [Minimum Supported Rust Version]
description: クレートが動作を保証する最小の Rust のバージョンで、Cargo.toml の rust-version で宣言する
tags: [word, rust]
date: 2025-01-24
---

## TL;DR

Minimum Supported Rust Version の略。パッケージがサポートする最小の [[rust|Rust]] ツールチェーンのバージョンで、[[cargo-toml|Cargo.toml]] の `rust-version` で宣言する。

## なぜ必要か

サポートされていない古いツールチェーンでビルドしたとき、Cargo が分かりやすいエラーを出せる。宣言がないと、利用者は構文エラーや標準ライブラリの機能不足といった、原因の分かりにくいエラーを受け取ることになる。

## 仕組み

```toml
[package]
rust-version = "1.56"
```

値は `1.56` のような素のバージョン番号で書き、`>=` などの演算子やプレリリースの識別子は使えない。Cargo はこの値を次のように使う。

- ツールチェーンが古ければエラーにする（`--ignore-rust-version` で回避できる）
- `cargo add` は `rust-version` と互換性のある最新の依存を選ぶ
- 依存を解決するとき、Rust のバージョンを考慮することがある
- [[clippy|Clippy]] の `incompatible_msrv` などのツールも参照する

## 注意点

`rust-version` を上げることは、軽微な非互換の変更とみなされる。[[semantic-versioning|セマンティックバージョニング]]の上でどう扱うかは、クレートによって方針が分かれる。Cargo のドキュメントは、どのバージョンをいつまでサポートするかの方針（たとえば「最新から 2 リリースまで」）を決めて公開し、方針に合わせて `rust-version` をすぐに更新することを勧めている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[Effective Rust 項目21 セマンティックバージョン（SemVer）を理解しよう]]
- [[Effective Rust 項目32 CIシステムを設定しよう]]

## 出典

- [The rust-version field - The Cargo Book](https://doc.rust-lang.org/cargo/reference/rust-version.html)
- https://github.com/rust-lang/api-guidelines/discussions/231
