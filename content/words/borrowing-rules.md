---
title: 借用ルール
aliases: [borrowing rules]
description: Rust の参照が守らなければならない、スコープと不変参照・可変参照の数についての 2 つのルール
tags: [word, rust]
date: 2025-01-28
---

## TL;DR

[[rust|Rust]] の参照が守らなければならない 2 つのルール。参照のスコープは参照先の[[lifetime|生存期間]]より短くなければならず、ある値への参照は「任意の数の不変参照」か「1 つの可変参照」のどちらかしか同時に存在できない。

## なぜ必要か

The Rust Programming Language によると、参照を作ることを借用と呼ぶ。可変参照を 1 つに限ることで、[[data-race|データ競合]]を含むコードをコンパイルの段階で拒否できる。また、参照より先に参照先がスコープを抜けないことをコンパイラが保証するので、[[dangling-pointer|ダングリング参照]]も生まれない。

## 仕組み

### ルール 1: 参照のスコープは参照先の生存期間より小さい

すべての参照のスコープは、参照先のアイテムの生存期間よりも小さくなければならない。参照の生存期間には[[non-lexical-lifetimes|ノンレキシカル生存期間]]が適用される。そのため、参照の生存期間はブロックの末尾までではなく、その参照が最後に使われた時点までに縮められる。

### ルール 2: 不変参照と可変参照は同時に存在できない

アイテムには所有者がいる。所有者に加えて存在できるのは、そのアイテムへの任意の数の不変参照か、1 つの可変参照のどちらかだけである。不変参照と可変参照が同時に存在することはできない。

## 例

同じ値への可変参照を 2 つ同時に使うと、コンパイルエラー E0499 になる。

```rust
let r1 = &mut s;
let r2 = &mut s;
println!("{r1}, {r2}");
// error[E0499]: cannot borrow `s` as mutable more than once at a time
```

不変参照が使われている間に可変参照を作ると、E0502 になる。

```rust
let r1 = &s;
let r2 = &s;
let r3 = &mut s;
println!("{r1}, {r2}, and {r3}");
// error[E0502]: cannot borrow `s` as mutable because it is also borrowed as immutable
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[non-lexical-lifetimes|ノンレキシカル生存期間]]
- [[lifetime-elision|生存期間省略ルール]]
- [[Effective Rust 項目14 生存期間を理解しよう]]
- [[Effective Rust 項目15 借用チェッカを理解しよう]]

## 出典

- [[Effective Rust]]
- [References and Borrowing - The Rust Programming Language](https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html)
