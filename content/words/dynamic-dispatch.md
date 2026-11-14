---
title: 動的ディスパッチ
aliases: []
description: どのメソッドを呼ぶかをコンパイル時ではなく実行時に決める仕組み
tags: [word, プログラミング言語]
date: 2026-11-14
---

## TL;DR

どのメソッドを呼ぶかを、コンパイル時ではなく実行時に決める仕組み。対になるのは、コンパイル時に呼び出すメソッドが決まる静的ディスパッチである。

## なぜ必要か

コンパイラが、コードで使われうる型をすべて知っているとは限らない。The Rust Programming Language では、トレイトオブジェクトを使うと、異なる型の値を 1 つのコレクションに入れて同じように扱えるとしている。この柔軟さには動的ディスパッチが必要になる。

## 仕組み

The Rust Programming Language によると、動的ディスパッチでは、コンパイラは実行時にどのメソッドを呼ぶかを判断するコードを出力する。Rust のトレイトオブジェクトは、トレイトを実装した型の値へのポインタと、その型のメソッドを実行時に探すための表へのポインタを持つ。[[Effective Rust 項目12 ジェネリクスとトレイトオブジェクトのトレードオフを理解しよう|Effective Rust]] では、この表を vtable と呼んでいる。

一方、[[generics|ジェネリクス]]は、コンパイラが具体的な型ごとに実装を生成する単相化によって、静的ディスパッチになる。

## 例

```rust
// 動的ディスパッチ: 異なる型を 1 つの Vec に入れられる
pub struct Screen {
    pub components: Vec<Box<dyn Draw>>,
}

// 静的ディスパッチ: 型ごとに単相化されるが、1 つの Vec には 1 つの型だけ
pub struct Screen<T: Draw> {
    pub components: Vec<T>,
}
```

[[Go の interface と Generics の内部構造と進化]]によると、[[go|Go]] のインタフェースも、`itab` というメソッドポインタの表を経由して、実行時にメソッドを呼び出す。

## 注意点

The Rust Programming Language によると、実行時の探索には静的ディスパッチにはないコストがかかる。また、コンパイラがメソッドをインライン化できなくなり、一部の最適化が効かなくなる。同じ型だけを扱うなら、ジェネリクスとトレイト境界を使うほうがよい。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[generics|ジェネリクス]]
- [[dyn-compatibility|トレイトオブジェクト安全性]]

## 出典

- [Using Trait Objects to Abstract over Shared Behavior - The Rust Programming Language](https://doc.rust-lang.org/book/ch18-02-trait-objects.html)
- [[Effective Rust 項目12 ジェネリクスとトレイトオブジェクトのトレードオフを理解しよう]]
- [[Go の interface と Generics の内部構造と進化]]
