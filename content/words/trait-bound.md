---
title: トレイト境界
aliases: []
description: Rust で、ジェネリクスの型パラメータが実装していなければならないトレイトを指定する制約
tags: [word, rust]
date: 2026-11-14
---

## TL;DR

[[rust|Rust]] で、[[generics|ジェネリクス]]の型パラメータが実装していなければならない[[trait|トレイト]]を指定する制約。`T: Summary` のように書く。

## なぜ必要か

トレイト境界がなければ、ジェネリックな型 `T` の値に対してどのメソッドも呼べない。The Rust Programming Language によると、トレイト境界を書くと、ジェネリックなコードに渡す具体的な型が必要な振る舞いを持つかをコンパイラが確かめるので、エラーを実行時ではなくコンパイル時に見つけられる。

## 仕組み

引数に `&impl Summary` と書く `impl Trait` の構文は、トレイト境界の糖衣構文である。`impl Trait` で書いた 2 つの引数は別々の型でもよいが、トレイト境界で `<T: Summary>` と書けば同じ型に揃えられる。

複数のトレイトを要求するときは `T: Summary + Display` のように `+` でつなぐ。境界が多くてシグネチャが読みにくいときは、`where` 句に分けて書ける。

## 例

```rust
fn some_function<T, U>(t: &T, u: &U) -> i32
where
    T: Display + Clone,
    U: Clone + Debug,
{
    unimplemented!()
}
```

[[Effective Rust]] は、クロージャを受け取るときは関数ポインタより `Fn*` のトレイト境界を使い、型変換には `From` を実装して境界には `Into` を使うよう勧めている。

## 注意点

[[Effective Rust]] によると、ジェネリクスのトレイト境界には複数のトレイトを指定できるが、[[trait-object|トレイトオブジェクト]]は 1 つのトレイトの vtable しか持てない。トレイトオブジェクトで同じことをするには、両方を束ねたトレイトを定義する必要がある。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[trait|トレイト]]
- [[generics|ジェネリクス]]
- [[trait-object|トレイトオブジェクト]]
- [[blanket-implementation|ブランケット実装]]

## 出典

- [Traits: Defining Shared Behavior - The Rust Programming Language](https://doc.rust-lang.org/book/ch10-02-traits.html)
- [[Effective Rust 項目12 ジェネリクスとトレイトオブジェクトのトレードオフを理解しよう|Effective Rust 項目12]]
