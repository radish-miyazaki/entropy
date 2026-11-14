---
title: フィーチャ統合
aliases: [feature unification]
description: 同じクレートに異なるフィーチャ指定があると、Cargo はビルド時にそれらの和集合を有効にする
tags: [word, rust]
date: 2025-01-11
---

## TL;DR

同じクレートに対して異なるフィーチャの指定があるとき、[[rust|Rust]] のビルドツール Cargo が、すべての指定の和集合を有効にしてそのクレートをビルドする仕組みである。

## なぜ必要か

依存グラフの中で同じクレートを 1 つだけビルドし、コピーが複数できないようにするためである。

## 仕組み

あるクレートが `crate-a` と `crate-b` に依存しているとする。`crate-a` は `serde` クレートの `derive` フィーチャを、`crate-b` は `std` フィーチャを指定している。この場合、`serde` はビルド時に `derive` と `std` の両方が有効になる。

依存グラフ内の各クレートで、どのフィーチャが有効になっているかは次のコマンドで確認できる。

```sh
$ cargo tree --edges features
```

## 注意点

フィーチャ統合があるので、フィーチャは「追加的（additive）」に設計する。フィーチャを有効にしたことで機能が無効になってはならず、どの組み合わせで有効にしても安全であるべきだ。たとえば `no_std` 環境に対応したいときは、`no_std` フィーチャを作るのではなく、`std` を有効にする `std` フィーチャを作る。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[cargo-toml|Cargo.toml]]
- [[Effective Rust 項目26 忍び寄るフィーチャに注意しよう]]
- [[Effective Rust 項目25 依存グラフを管理しよう]]

## 出典

- [Features - The Cargo Book](https://doc.rust-lang.org/cargo/reference/features.html#feature-unification)
