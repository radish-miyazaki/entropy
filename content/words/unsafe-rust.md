---
title: Unsafe Rust
aliases: [unsafe]
description: unsafe キーワードで、コンパイラがメモリ安全性を検査できない 5 つの操作を使えるようにする Rust の機能
tags: [word, rust]
date: 2026-11-14
---

## TL;DR

`unsafe` キーワードを使って、コンパイラがメモリ安全性を検査できない操作を使えるようにする [[rust|Rust]] の機能。安全性を保証する責任はプログラマが負う。

## なぜ必要か

The Rust Programming Language によると、静的解析は保守的なので、コンパイラは正しいプログラムでも安全だと証明できなければ拒否する。また、OS やハードウェアを直接扱う低レベルのプログラミングには、コンパイラが検証できない操作が欠かせない。Unsafe Rust はこうした場面のためにある。

## 仕組み

`unsafe` ブロックの中では、次の 5 つの操作ができるようになる。

- 生ポインタの参照外し
- unsafe な関数やメソッドの呼び出し
- 可変な静的変数へのアクセスと変更
- unsafe なトレイトの実装
- `union` のフィールドへのアクセス

`unsafe` は借用チェッカーなどの検査を止めるものではない。unsafe なコードで参照を使えば、その参照は通常どおり検査される。

## 例

生ポインタを作るのは安全なコードでもできるが、参照外しには `unsafe` ブロックが必要である。

```rust
fn main() {
    let mut num = 5;

    let r1 = &raw const num;
    let r2 = &raw mut num;

    unsafe {
        println!("r1 is: {}", *r1);
        println!("r2 is: {}", *r2);
    }
}
```

## 注意点

The Rust Programming Language は、`unsafe` ブロックを小さく保つよう勧めている。メモリ安全性に関わるバグは必ず `unsafe` ブロックの中にあるので、範囲が小さいほど調べやすい。標準ライブラリの `split_at_mut` のように、内部で unsafe なコードを使い、外には安全な API だけを見せる書き方もできる。前提を破ると[[undefined-behavior|未定義動作]]になる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[undefined-behavior|未定義動作]]
- [[memory-safety|メモリ安全性]]
- [[borrowing-rules|借用ルール]]
- [[ffi|FFI]]

## 出典

- [Unsafe Rust - The Rust Programming Language](https://doc.rust-lang.org/book/ch20-01-unsafe-rust.html)
