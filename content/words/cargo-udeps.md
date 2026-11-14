---
title: cargo-udeps
aliases: []
description: Cargo.toml に書かれた使われていない依存を見つける Cargo のサブコマンド
tags: [word, rust, cargo]
date: 2025-01-24
---

## TL;DR

[[cargo-toml|Cargo.toml]] に書かれた、使われていない[[dependency|依存関係]]を見つける Cargo のサブコマンド。

## 仕組み

`cargo metadata` で取得したメタデータを利用している。ビルド自体は stable の Rust でできるが、実行には nightly が必要である。

```sh
cargo install cargo-udeps --locked
cargo +nightly udeps
```

## 注意点

- 標準ライブラリやその依存が使っているクレート、依存先がすでに使っているクレートなど、検出できない未使用の依存がある
- クレートを名前だけで照合するので、同じ名前で異なるバージョンのクレートがあるとうまく判定できない
- doc テストでしか使っていない依存は、未使用と報告される。`Cargo.toml` の `package.metadata.cargo-udeps.ignore` に書くと無視できる

```toml
[package.metadata.cargo-udeps.ignore]
normal = ["if_chain"]
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[cargo-machete]]
- [[Effective Rust 項目31 ツールのエコシステムを活用しよう]]
- [[Effective Rust 項目32 CIシステムを設定しよう]]

## 出典

- [est31/cargo-udeps](https://github.com/est31/cargo-udeps)
