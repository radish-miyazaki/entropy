---
title: 生ポインタ
aliases: []
description: 安全性も生存も保証されない Rust のポインタ型。*const T と *mut T があり、参照外しは unsafe になる
tags: [word, rust]
date: 2026-11-14
---

## TL;DR

安全性も、指す先が生きていることも保証されない [[rust|Rust]] のポインタ型。`*const T` と `*mut T` の 2 つがあり、参照外しは `unsafe` な操作になる。

## なぜ必要か

The Rust Reference によると、生ポインタの利用は一般に推奨されない。生ポインタは、外部のコードとの相互運用や、性能が重要な処理や低レベルの処理を書くために存在する。[[Effective Rust 項目15 スマートポインタを活用しよう|Effective Rust 項目15]] でも、[[smart-pointer|スマートポインタ]]で表せない場合の最後の手段としている。

## 仕組み

`*const i32` は、32 ビット整数を指す生ポインタを表す。生ポインタは `&raw const` や `&raw mut` で直接作れ、作ること自体は安全である。生ポインタをコピーしたりドロップしたりしても、ほかの値の生存期間には影響しない。比べるときは、指す先の値ではなくアドレスで比べる。

`&*` や `&mut *` で再借用すると、生ポインタを参照に変換できる。

## 注意点

Effective Rust では、次のような注意点を挙げている。

- Rust の参照を生ポインタにして [[ffi|FFI]] 境界に渡すと、生存期間の制約が失われ、[[memory-safety|メモリ安全性]]が保証されなくなる
- C から渡される生ポインタは、NULL でない、有効なメモリを指す、という Rust の参照の前提を満たすとは限らない。その確認はプログラマの役割である
- 生ポインタの型は `Send` と `Sync` を実装していない

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[smart-pointer|スマートポインタ]]
- [[unsafe-rust|Unsafe Rust]]
- [[ffi|FFI]]
- [[memory-safety|メモリ安全性]]

## 出典

- [Pointer types - The Rust Reference](https://doc.rust-lang.org/reference/types/pointer.html)
- [[Effective Rust 項目15 スマートポインタを活用しよう|Effective Rust 項目15 スマートポインタを活用しよう]]
- [[Effective Rust 項目34 C から Rust のコードを呼び出す|Effective Rust 項目34 C から Rust のコードを呼び出す]]
- [[Effective Rust 項目34 Rust と C の FFI で生じるメモリ安全性の問題|Effective Rust 項目34 Rust と C の FFI で生じるメモリ安全性の問題]]
