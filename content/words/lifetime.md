---
title: 生存期間
aliases: [ライフタイム]
description: Rust で、参照が有効である範囲。ダングリング参照を防ぐために借用チェッカが検査する
tags: [word, rust]
date: 2026-11-14
---

## TL;DR

[[rust|Rust]] で、参照が有効である範囲（ライフタイム）。すべての参照は生存期間を持つ。多くの場合は推論されるが、参照どうしの関係が曖昧なときは注釈を書く。

## なぜ必要か

The Rust Programming Language によると、生存期間の主な目的は、ダングリング参照を防ぐことである。参照先の値が参照より先に破棄されると、参照は無効なメモリを指してしまう。

## 仕組み

Rust のコンパイラは、借用チェッカでスコープを比べ、すべての借用が有効かを確かめる。参照の生存期間と参照先の値の生存期間を比べ、値が参照より長く生きなければプログラムを拒否する。

生存期間パラメータは `'a` のようにアポストロフィで始まる名前で書く。注釈は参照の生存期間を延ばすものではなく、複数の参照の生存期間の関係を記述し、コンパイラに検査させるものである。

## 例

```rust
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}
```

`'a` には、`x` と `y` の生存期間のうち短いほうが入る。そのため、戻り値の参照は、どちらかの引数がスコープを抜けた後には使えない。

## 注意点

`'static` は、参照がプログラムの実行中ずっと生き続けられることを表す。エラーメッセージが `'static` を提案しても、多くの場合はダングリング参照や生存期間の食い違いが原因なので、`'static` を付けるのではなく、その原因を直す。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[lifetime-elision|ライフタイムの省略]]
- [[non-lexical-lifetimes|Non-Lexical Lifetimes]]
- [[borrowing-rules|借用ルール]]

## 出典

- [Validating References with Lifetimes - The Rust Programming Language](https://doc.rust-lang.org/book/ch10-03-lifetime-syntax.html)
