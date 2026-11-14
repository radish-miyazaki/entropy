---
title: Newtype パターン
aliases: [Newtype]
description: 1 つのフィールドを持つタプル構造体で型を包み、実行時のコストなしに新しい型を作る Rust のデザインパターン
tags: [word, rust]
date: 2024-10-08
---

## TL;DR

1 つのフィールドを持つタプル構造体を使って、既存の型を包む不透明なラッパを作る [[rust|Rust]] の[[design-pattern|デザインパターン]]。[[rust-design-patterns|Rust Design Patterns]] で紹介されている。

## 仕組み

型エイリアスと違い、元の型とは別の新しい型が作られる。それでいて、実行時の追加のオーバーヘッドは発生しない（[[zero-cost-abstraction|ゼロコスト抽象化]]）。クラスで包むと実行時のオーバーヘッドが発生する。[[scala|Scala]] に [[opaque-types|Opaque types]] が生まれたのも、これを避けるためである。

## 例

```rust
#[derive(Debug, Clone, Copy)]
pub struct BookId(uuid::Uuid);

impl BookId {
    pub fn new() -> Self {
        Self(uuid::Uuid::new_v4())
    }
}
```

## 自分の理解

[[object-oriented-programming|オブジェクト指向プログラミング]]における [[value-object|Value Object]] のようなものと解釈している。

## 関連

- [[value-object|値オブジェクト]]
- [[domain-primitive|ドメインプリミティブ]]
- [[opaque-types|Opaque types]]

## 出典

- [Newtype - Rust Design Patterns](https://rust-unofficial.github.io/patterns/patterns/behavioural/newtype.html)
- [Newtype（日本語訳）](https://qiita.com/Yappii_111/items/654717e6a6a980722189#newtype)
- [Newtype パターンの解説（Rust メモ）](https://nossie531.github.io/rust_memo/newtype.xhtml)
