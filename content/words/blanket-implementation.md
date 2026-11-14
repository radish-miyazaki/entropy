---
title: ブランケット実装
aliases: [blanket implementation]
description: トレイト境界を満たすあらゆる型にトレイトを実装すること
tags: [word, rust]
date: 2024-12-18
---

## TL;DR

[[rust|Rust]] で、トレイト境界を満たすあらゆる型に[[trait|トレイト]]を実装すること。標準ライブラリで広く使われている。

## 仕組み

`impl` の対象を具体的な型ではなく型パラメータ `T` にし、`T` にトレイト境界を付ける。こうすると、境界を満たす型すべてにそのトレイトが実装される。ブランケット実装は、トレイトのドキュメントの「Implementors」の節に載る。

## 例

標準ライブラリは、`Display` トレイトを実装するすべての型に `ToString` トレイトを実装している。

```rust
impl<T: Display> ToString for T {
    // --snip--
}
```

整数は `Display` を実装しているので、`3.to_string()` のように `to_string` メソッドを呼んで `String` に変換できる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[trait|トレイト]]
- [[orphan-rule|孤児ルール]]

## 出典

- [トレイト：共通の振る舞いを定義する - The Rust Programming Language 日本語版](https://doc.rust-jp.rs/book-ja/ch10-02-traits.html)
- [Traits: Defining Shared Behavior - The Rust Programming Language](https://doc.rust-lang.org/book/ch10-02-traits.html)
