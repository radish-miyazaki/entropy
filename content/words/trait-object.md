---
title: トレイトオブジェクト
aliases: [dyn Trait]
description: Rust で、トレイトを実装した値と、そのメソッドを実行時に引くための表を指すポインタ。動的ディスパッチに使う
tags: [word, rust]
date: 2026-11-14
---

## TL;DR

[[rust|Rust]] で、ある[[trait|トレイト]]を実装した型の値と、その型のメソッドを実行時に引くための表（vtable）の両方を指すもの。`&dyn Trait` や `Box<dyn Trait>` の形で使い、[[dynamic-dispatch|動的ディスパッチ]]を実現する。

## なぜ必要か

[[generics|ジェネリクス]]では、型パラメータは 1 つの具体的な型に決まる。トレイトオブジェクトを使うと、同じトレイトを実装した異なる型の値を、1 つのコレクションにまとめて扱える。

## 仕組み

The Rust Programming Language によると、トレイトオブジェクトは参照や `Box<T>` のようなポインタに `dyn` キーワードとトレイト名を付けて作る。ジェネリクスはコンパイル時に具体的な型ごとのコードを生成し、呼ぶメソッドがコンパイル時に決まる（静的ディスパッチ）。トレイトオブジェクトでは、実行時にトレイトオブジェクト内のポインタをたどって呼ぶメソッドを決める。

[[Effective Rust]] によると、トレイトオブジェクトは値へのポインタと vtable へのポインタからなるファットポインタである。vtable には、メソッドの関数ポインタに加え、型のサイズやアラインメント、`drop` 関数へのポインタも入っている。

## 例

```rust
pub trait Draw {
    fn draw(&self);
}

pub struct Screen {
    pub components: Vec<Box<dyn Draw>>,
}
```

`Screen` は、`Draw` を実装していればボタンでもセレクトボックスでも `components` に入れられる。

## 注意点

実行時にメソッドを引くコストがかかり、インライン化などの最適化も効かなくなる。トレイトオブジェクトにできるのは、[[dyn-compatibility|トレイトオブジェクト安全性]]の条件を満たすトレイトだけである。また、具体的な型の情報は失われるので、`Box<dyn Error>` からは元のエラー型のメソッドを呼べない。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[trait|トレイト]]
- [[dynamic-dispatch|動的ディスパッチ]]
- [[dyn-compatibility|トレイトオブジェクト安全性]]
- [[generics|ジェネリクス]]
- [[trait-bound|トレイト境界]]

## 出典

- [Using Trait Objects to Abstract over Shared Behavior - The Rust Programming Language](https://doc.rust-lang.org/book/ch18-02-trait-objects.html)
- [[Effective Rust 項目8 参照型とポインタ型に慣れよう|Effective Rust 項目8]]
- [[Effective Rust 項目12 ジェネリクスとトレイトオブジェクトのトレードオフを理解しよう|Effective Rust 項目12]]
