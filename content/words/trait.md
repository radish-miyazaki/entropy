---
title: トレイト
aliases: []
description: Rust で、型が持つ機能を定義し、他の型と共有するための仕組み。他の言語のインタフェースに近い
tags: [word, rust]
date: 2026-11-14
---

## TL;DR

[[rust|Rust]] で、ある型が持つ機能を定義し、他の型と共有するための仕組み。メソッドのシグネチャの集まりで、他の言語の[[interface|インタフェース]]に近い。

## なぜ必要か

The Rust Programming Language によると、トレイトを使うと共通の振る舞いを抽象的に定義できる。[[trait-bound|トレイト境界]]と組み合わせると、[[generics|ジェネリクス]]の型を「ある振る舞いを持つ任意の型」に制限できる。[[Effective Rust]] は、Go や Java のインタフェース、C++ の抽象クラスに当たるものとして紹介し、将来の柔軟性が心配なら具象型ではなくトレイトを受け取るよう勧めている。

## 仕組み

トレイトを実装する型は、トレイトが定めたメソッドを同じシグネチャで定義しなければならず、コンパイラがそれを確かめる。トレイトはメソッドのデフォルト実装を持てる。デフォルト実装は、同じトレイトの他のメソッドを呼んでもよい。

トレイトを実装できるのは、トレイトか型の少なくとも一方が自分の[[crate|クレート]]で定義されている場合だけである。この制約を[[orphan-rule|孤児ルール]]と呼ぶ。トレイト境界を満たすすべての型にトレイトを実装することもでき、これを[[blanket-implementation|ブランケット実装]]と呼ぶ。

## 例

```rust
pub trait Summary {
    fn summarize_author(&self) -> String;

    fn summarize(&self) -> String {
        format!("(Read more from {}...)", self.summarize_author())
    }
}
```

`Summary` を実装する型は、`summarize_author` だけを定義すれば `summarize` も使える。

## 注意点

インタフェースに似ているが、違いもある。たとえば、外部のクレートのトレイトを外部のクレートの型に実装することはできない。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[trait-bound|トレイト境界]]
- [[trait-object|トレイトオブジェクト]]
- [[blanket-implementation|ブランケット実装]]
- [[orphan-rule|孤児ルール]]
- [[dyn-compatibility|トレイトオブジェクト安全性]]
- [[interface|インタフェース]]
- [[type-class|型クラス]]

## 出典

- [Traits: Defining Shared Behavior - The Rust Programming Language](https://doc.rust-lang.org/book/ch10-02-traits.html)
- [[Effective Rust 項目2 型システムを用いて共通の挙動を表現しよう|Effective Rust 項目2]]
