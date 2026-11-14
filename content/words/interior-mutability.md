---
title: 内部可変性
aliases: [interior mutability]
description: 不変参照しかないデータでも変更できるようにする Rust のデザインパターン
tags: [word, rust]
date: 2026-11-14
---

## TL;DR

データへの不変参照しかない状態でも、そのデータを変更できるようにする [[rust|Rust]] のデザインパターンである。通常は[[borrowing-rules|借用ルール]]で禁止されている操作を、`RefCell<T>` などの型で可能にする。

## なぜ必要か

`&self` しか受け取らないメソッドでも、内部の状態を変更できる。[[Effective Rust]] では、`Rc<T>` のような共有所有の値を変更する必要があるときに、内部可変性を持つ型と組み合わせると説明している。

## 仕組み

参照や `Box<T>` では、借用規則はコンパイル時にチェックされる。`RefCell<T>` では、同じ規則が実行時にチェックされる。`borrow` は `Ref<T>`、`borrow_mut` は `RefMut<T>` というスマートポインタを返し、`RefCell<T>` は有効な借用の数を数えている。コンパイル時と同じく、同時に許されるのは複数の不変借用か、1 つの可変借用だけである。規則に違反すると、コンパイルエラーではなく実行時にパニックする。

## 例

`Rc<T>` は複数の所有者を持てるが、データには不変のアクセスしか与えない。`Rc<RefCell<T>>` にすると、複数の所有者を持ち、しかも変更できる値になる。

```rust
let value = Rc::new(RefCell::new(5));
let a = Rc::new(Cons(Rc::clone(&value), Rc::new(Nil)));

*value.borrow_mut() += 10;
```

## 注意点

`RefCell<T>` はシングルスレッド専用で、マルチスレッドで使おうとするとコンパイルエラーになる。マルチスレッドでは、スレッドセーフな `Mutex<T>` を使い、`Arc<Mutex<T>>` のように組み合わせる。借用のチェックが実行時に移るので、その分のコストもかかる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[borrowing-rules|借用ルール]]
- [[rust|Rust]]
- [[immutability|イミュータブル]]

## 出典

- [RefCell\<T\> and the Interior Mutability Pattern - The Rust Programming Language](https://doc.rust-lang.org/book/ch15-05-interior-mutability.html)
- [[Effective Rust 項目8 参照型とポインタ型に慣れよう|Effective Rust 項目8]]
- [[Effective Rust 項目20 過剰な最適化の誘惑を退けよう|Effective Rust 項目20]]
