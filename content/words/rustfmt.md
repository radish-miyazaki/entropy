---
title: rustfmt
aliases: []
description: Rust のコードをスタイルガイドに沿って整形する公式のフォーマッタ
tags: [word, rust]
date: 2026-11-14
---

## TL;DR

[[rust|Rust]] のコードを、スタイルガイドに沿って整形するツール。デフォルトでは Rust 公式のスタイルガイドに従う。

## なぜ必要か

整形をツールに任せると、コードの見た目がそろい、レビューで書き方の好みを議論しなくて済む。[[Effective Rust]] の項目 32 では、[[continuous-integration|CI]] で rustfmt による整形をチェックすることを勧めている。

## 仕組み

[rustfmt の README](https://github.com/rust-lang/rustfmt) によると、`rustup component add rustfmt` で入れ、プロジェクトのディレクトリで `cargo fmt` を実行する。`cargo fmt` は単一のクレートにもワークスペースにも使える。設定は `rustfmt.toml` か `.rustfmt.toml` に書く。

`--check` を付けると、整形されていない入力があったときにエラーの終了コードを返す。CI では `cargo fmt --all -- --check` のように使う。

## 例

```sh
cargo fmt                  # 整形する
cargo fmt --all -- --check # 整形されていなければ失敗する
```

## 注意点

マクロの定義や呼び出しは、一部しか整形されない。[[Effective Rust]] の項目 28 でも、マクロの中のコードは Rust の構文の慣習に従わないので、rustfmt で整形されないことを[[macro|マクロ]]のデメリットに挙げている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[clippy|Clippy]]
- [[cargo|Cargo]]
- [[prettier|Prettier]]

## 出典

- [rust-lang/rustfmt](https://github.com/rust-lang/rustfmt)
- [[Effective Rust 項目28 マクロのデメリット|Effective Rust 項目28]]
- [[Effective Rust 項目32 CIシステムを設定しよう|Effective Rust 項目32]]
