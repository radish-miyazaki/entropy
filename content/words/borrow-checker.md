---
title: 借用チェッカ
aliases: [borrow checker]
description: Rust のコンパイラの中で、参照と所有権の規則が守られているかを検査し、メモリ安全性をコンパイル時に保証する仕組み
tags: [word, rust]
date: 2026-11-14
---

## TL;DR

[[rust|Rust]] のコンパイラの中で、参照（借用）と所有権の規則が守られているかを検査する部分。あるアイテムへの複数の不変参照か、単一の可変参照のどちらかだけを許し、両方が同時に存在することは許さない。

## なぜ必要か

The Rust Programming Language によると、参照の規則をコンパイル時に検査するので、Rust はコンパイル時に[[data-race|データ競合]]を防げる。参照先のデータが参照より先にスコープを外れないことも保証するので、ダングリング参照も起きない。[[Effective Rust 項目16 unsafeコードを書かないようにしよう|Effective Rust 項目16]] によると、この仕組みのおかげで、Rust のメモリ安全性は実行時のオーバーヘッドなしで保証される。

## 仕組み

rustc 開発ガイドによると、借用チェッカは次のことを確かめる。

- 変数は使う前に初期化されている
- 同じ値を 2 回ムーブしない
- 借用されている値をムーブしない
- 可変に借用されている場所に、その参照以外からアクセスしない
- 不変に借用されている場所を書き換えない

借用チェッカは、コンパイラの中間表現である MIR の上で動く。MIR を使うと生存期間を制御フローグラフから導けるので、参照の[[lifetime|生存期間]]はスコープの末尾ではなく、最後に使われた時点までになる（[[non-lexical-lifetimes|ノンレキシカル生存期間]]）。

## 例

```rust
let mut s = String::from("hello");
let r1 = &s;
let r2 = &s;
println!("{r1} and {r2}");
// r1 と r2 はここで最後に使われたので、可変参照を作れる
let r3 = &mut s;
```

## 注意点

- 借用チェッカのエラーメッセージは、違反した箇所と理由を示してくれるので、まず読む（[[Effective Rust 項目15 借用チェッカのエラーを解消するにはまずエラーメッセージを読もう|Effective Rust 項目15]]）。
- `Rc<RefCell<T>>` を使うと借用チェッカの制約を避けられるが、借用違反が実行時の panic になり、使い方によっては循環参照を生む（[[Effective Rust 項目15 スマートポインタを活用しよう|スマートポインタを活用しよう]]）。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[borrowing-rules|借用ルール]]
- [[non-lexical-lifetimes|ノンレキシカル生存期間]]
- [[lifetime-elision|生存期間省略ルール]]
- [[data-race|データ競合]]

## 出典

- [References and Borrowing - The Rust Programming Language](https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html)
- [The borrow checker - Rust Compiler Development Guide](https://rustc-dev-guide.rust-lang.org/borrow-check.html)
- [[Effective Rust 項目15 借用チェッカを理解しよう]]
