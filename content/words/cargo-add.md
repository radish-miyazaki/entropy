---
title: cargo add
aliases: []
description: Cargo.toml に依存関係を追加する Cargo のコマンド
tags: [word, rust, cargo]
date: 2024-10-06
---

## TL;DR

[[cargo-toml|Cargo.toml]] に依存関係を追加する [[cargo|Cargo]] のコマンド。

## 仕組み

`cargo add <クレート名>@<バージョン>` の形で使う。バージョンを省略すると、最新のバージョンを追加する。

`--features` を付けると、クレートの特定の feature を有効にして追加できる。`--dev` を付けると、テストやベンチマークでだけ使う、リリースビルドに含めないクレートとして追加できる。

## 例

```sh
$ cargo add axum --features macros
$ cargo add tokio --features full
$ cargo add rstest --dev
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[cargo-toml|Cargo.toml]]
- [[cargo-make]]

## 出典

- [cargo add - The Cargo Book](https://doc.rust-lang.org/cargo/commands/cargo-add.html)
