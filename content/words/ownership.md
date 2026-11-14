---
title: 所有権
aliases: []
description: Rust がメモリを管理するための規則。値には所有者が 1 つだけあり、所有者がスコープを抜けると値は破棄される
tags: [word, rust]
date: 2026-11-14
---

## TL;DR

[[rust|Rust]] のプログラムがメモリを管理するための規則の集まり。値には所有者が 1 つだけあり、所有者がスコープを抜けると値は破棄される。

## なぜ必要か

The Rust Programming Language によると、[[garbage-collection|ガベージコレクタ]]を持つ言語では、使われなくなったメモリを GC が探して片付ける。GC のない多くの言語では、プログラマがメモリを解放する時点を見極め、明示的に解放しなければならない。解放を忘れればメモリを無駄にし、早すぎれば無効な変数が残り、2 回解放すればバグになる。確保と解放をちょうど 1 回ずつ対応させる必要がある。

所有権を使うと、Rust はコンパイル時に規則を確かめ、決まった時点でメモリを解放する。所有権の機能は、実行時にプログラムを遅くしない。

## 仕組み

所有権の規則は次の 3 つである。

- Rust の各値には所有者がいる
- 所有者は同時に 1 つだけである
- 所有者がスコープを抜けると、値は破棄（drop）される

変数がスコープを抜けると、Rust は自動で `drop` という関数を呼び、メモリを返す。

## 例

`String` を別の変数に代入すると、所有権が移る（ムーブ）。ムーブ後の `s1` は無効になるので、スコープを抜けても二重解放は起きない。

```rust
let s1 = String::from("hello");
let s2 = s1;

println!("{s1}, world!"); // コンパイルエラー: borrow of moved value: `s1`
```

ヒープのデータもコピーしたいときは、`s1.clone()` で明示的にディープコピーする。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[borrowing-rules|借用規則]]
- [[borrow-checker|借用チェッカ]]
- [[lifetime|ライフタイム]]
- [[raii|RAII]]
- [[memory-safety|メモリ安全性]]

## 出典

- [What Is Ownership? - The Rust Programming Language](https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html)
