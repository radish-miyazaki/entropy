---
title: トレイトオブジェクト安全性
aliases: [オブジェクト安全性, object safety]
description: トレイトオブジェクトにできるトレイトが満たすべき条件。現在は dyn compatibility と呼ばれる
tags: [word, rust]
date: 2025-01-02
---

## TL;DR

[[rust|Rust]] で、[[trait|トレイト]]を[[trait-object|トレイトオブジェクト]]（`dyn Trait`）にするために満たすべき条件。以前はオブジェクト安全性（object safety）と呼ばれ、今の Rust Reference では dyn compatibility と呼ばれている。

## 仕組み

大まかには、次の 2 つのルールに従うトレイトだけがトレイトオブジェクトにできる。

1. ジェネリックなメソッド（`fn some_fn<T>(t: T)` など）を持たない
2. 戻り値や、レシーバ以外の引数の型に `Self` を使わない

Rust Reference には、さらに細かい条件がある。スーパートレイトもすべて dyn compatible であること、`Sized` をスーパートレイトに持たないこと、関連定数を持たないことなどである。`where Self: Sized` を付けたメソッドはトレイトオブジェクトから呼べなくなる代わりに、条件の対象から外れる。

## 例

次のトレイトは、どのメソッドも条件を破っているのでトレイトオブジェクトにできない。

```rust
trait DynIncompatible {
    const CONST: i32 = 1;        // 関連定数を持てない
    fn foo() {}                  // Sized の境界がない関連関数
    fn returns(&self) -> Self;   // 戻り値に Self
    fn typed<T>(&self, x: T) {}  // ジェネリックな型パラメータ
}
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[trait|トレイト]]
- [[trait-object|トレイトオブジェクト]]

## 出典

- [Traits - The Rust Reference](https://doc.rust-lang.org/reference/items/traits.html#dyn-compatibility)
