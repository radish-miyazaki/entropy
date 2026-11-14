---
title: std::pin::Pin
aliases: [std::pin::Pin を理解する, Pin]
description: ポインタの指す値をメモリ上の位置に固定するための Rust の型。自己参照データ構造を安全に扱うために導入された
tags: [word, rust]
date: 2025-01-31
---

## TL;DR

ポインタが指す値を、メモリ上の位置に固定（ピン留め）するための [[rust|Rust]] の型。自己参照データ構造を安全に扱うために導入された。ただし、値を完全に固定できるわけでも、[[memory-safety|メモリ安全性]]を完全に保証するわけでもない。

## なぜ必要か

コンパイラが生成する `Future` は、自分自身を指すポインタを含むことがある。これは `Pin` の最もよくある用途である。

> These compiler-generated Futures may contain self-referential pointers, one of the most common use cases for Pin. More details on this point are provided in the pin module docs, but suffice it to say they require the guarantees provided by pinning to be implemented soundly.

自己参照データ構造の値がムーブされると、内部のポインタが古いアドレスを指したままになる。`Pin` は値をムーブできないようにして、この問題を防ぐ。

## 仕組み

`Pin` が固定するのは、ポインタそのものではなく、ポインタが指す値である。

> It is important to stress that the thing in the Pin is not the value which we want to pin itself, but rather a pointer to that value! A Pin<Ptr> does not pin the Ptr but rather the pointer's pointee value.

ヒープ上に値を固定したいときは、[`Box::pin`](https://doc.rust-lang.org/std/boxed/struct.Box.html#method.pin) を使う。ヒープ上のデータはポインタを通じて管理されるので、基本的にはムーブされにくい。

## 注意点

### メモリアドレスを完全に固定できるわけではない

[`std::marker::Unpin`](https://doc.rust-lang.org/std/marker/trait.Unpin.html) を実装した型は、`Pin::new` でそのまま包めて、普通にムーブできる。そのため、完全な固定は保証されない。

> If the pointee value's type implements Unpin, we are free to disregard these requirements entirely and can wrap any pointer to that value in Pin directly via Pin::new.

### 適切に使うには unsafe を理解する必要がある

`Pin` は内部のデータへのアクセスを制限する。そのため、固定された値を直接変更しようとすると [[unsafe-rust|unsafe]] を使う必要がある。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[Effective Rust 項目15 自己参照データ構造を避けよう]]
- [[Async Rust ―高いパフォーマンスと安全性を両立するRustによる非同期処理]]

## 出典

- [Pin in std::pin - Rust](https://doc.rust-lang.org/std/pin/struct.Pin.html)
