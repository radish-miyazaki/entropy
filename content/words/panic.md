---
title: panic
aliases: []
description: 回復できないエラーで通常の処理の流れを止める、Rust と Go の仕組み
tags: [word, rust, go]
date: 2026-11-14
---

## TL;DR

回復できないエラーが起きたときに、通常の処理の流れを止める仕組み。[[rust|Rust]] では `panic!` マクロ、[[go|Go]] では組み込み関数の `panic` で起こせる。配列の範囲外アクセスのような実行時エラーでも起きる。

## 仕組み

### Rust

The Rust Programming Language によると、パニックは `panic!` を明示的に呼ぶか、配列の範囲外アクセスのようにパニックする操作をすると起きる。既定では巻き戻し（unwinding）が起き、スタックをさかのぼって各関数のデータを片付ける。`Cargo.toml` で `panic = 'abort'` を指定すると、片付けずにすぐ終了し、バイナリも小さくなる。環境変数 `RUST_BACKTRACE=1` を付けて実行すると、バックトレースを表示できる。

### Go

The Go Blog によると、`panic` は通常の制御の流れを止めて、パニックを始める。パニックした関数の `defer` した呼び出しは実行され、パニックは呼び出し元へ伝わる。誰も回復しなければ[[goroutine|ゴルーチン]]が終わり、プログラムがクラッシュする。`recover` でパニックしたゴルーチンの制御を取り戻せるが、`recover` が役に立つのは `defer` した関数の中だけである。

## 注意点

Rust の公式ドキュメントでは、パニックは手の打ちようがない回復不能なエラーのためのもので、回復できるエラーには `Result` を使う。[[Effective Rust 項目18 Don't panic|Effective Rust 項目18]] でも、`catch_unwind` で例外を真似ず、`Result` を使うよう勧めている。

Go の慣習でも、パッケージの中でパニックを使っても、外部に公開する API では明示的なエラーの値を返す。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[error-handling|エラーハンドリング]]
- [[goroutine|ゴルーチン]]

## 出典

- [Unrecoverable Errors with panic! - The Rust Programming Language](https://doc.rust-lang.org/book/ch09-01-unrecoverable-errors-with-panic.html)
- [Defer, Panic, and Recover - The Go Blog](https://go.dev/blog/defer-panic-and-recover)
- [[Effective Rust]]
