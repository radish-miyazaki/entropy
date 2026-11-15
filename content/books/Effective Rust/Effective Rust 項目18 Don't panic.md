---
title: "Effective Rust › Don't panic"
description: panic は回復不能なバグのための仕組みなので、catch_unwind で例外のように使わず、ライブラリでは Result を返そうという項目
tags: [book-chapter, rust]
date: 2025-01-03
book: "[[Effective Rust]]"
chapter: 18
---

## TL;DR

- `panic!` を使うより、`Result` を使う。
- `catch_unwind` で例外を真似るのは、abort される場合があること、例外安全性、FFI の問題から避ける。
- [[panic|パニック]]は `panic!` 以外からも起きるので、人の目ではなく CI で検出する。

## 内容

https://effective-rust.com/panic.html

> panic! を使うよりも、Result を使おう

### panic で例外を真似ない

パニックは、プログラム中の回復不能なバグに対処するための仕組みである。そのため、デフォルトではパニックしたスレッドを停止させる。

一見すると、[`std::panic::catch_unwind`](https://doc.rust-lang.org/std/panic/fn.catch_unwind.html) を使えば例外の仕組みを真似できそうに見える。

```rust
fn divide_recover(a: i64, b: i64, default: i64) -> i64 {
    let result = std::panic::catch_unwind(|| divide(a, b));
    match result {
        Ok(x) => x,
        Err(_) => default,
    }
}
```

しかし、次の問題があるので避けたほうがよい。

1. パニックが常に巻き戻し（unwind）されるとは限らない。コンパイラのオプションや `Cargo.toml` のプロファイルで、パニック時にすぐプロセスを中止（abort）するよう設定できる。[[webassembly|WebAssembly]] のように、設定によらず常に abort するビルドターゲットもある

   ```toml
   [profile.release]
   panic = 'abort'
   ```

2. データ構造の処理中にパニックが起きると、データ構造が整合した状態に保たれる保証がなくなる。いわゆる例外安全性の問題で、Google が C++ で例外を禁じた理由の 1 つでもある（[Google C++ Style Guide](https://google.github.io/styleguide/cppguide.html#Exceptions)）
3. パニックの伝搬は FFI 境界と相性が悪い（[[Effective Rust 項目34 FFI境界を通過するものを制御しよう|項目34]]、[参考](https://doc.rust-lang.org/nomicon/ffi.html#ffi-and-unwinding)）。Rust のコードで起きたパニックが、FFI 境界を越えて他の言語の呼び出し元に伝わらないよう、`catch_unwind` で止める

代わりに、ライブラリのコードでは `Result` を返し、[[error-handling|エラー処理]]を利用者に任せる。

### panic を使ってよい場面

例外的に、次の場面ではパニックしてもよい。

- `main` 関数の中
- エラーがきわめてまれで、利用者に毎回 `unwrap` を書かせたくない場合
- エラーの原因が不正な入力ではなく、内部データの破損である場合

不正な入力が想定内なら、入口となる関数を 2 つ用意するとよい。1 つは常に成功することを前提とし、失敗すればパニックするもの（例: `String::from_utf8_unchecked`）である。パニックすることは、[API ガイドライン](https://rust-lang.github.io/api-guidelines/documentation.html#function-docs-include-error-panic-and-safety-considerations-c-failure)に従ってドキュメントの決まった節に書く（[[Effective Rust 項目27 パブリックインターフェイスのドキュメントを書こう|項目27]]）。もう 1 つは `Result` を返すもの（例: `String::from_utf8`）である。

### panic を避けるための注意点

パニックは `panic!` 以外からも起きる。

- `unwrap`、`unwrap_err`、`expect`、`expect_err`
- `unreachable!`
- 範囲外のインデックスでのスライスの参照（`slice[index]`）
- 0 による除算（`x / y`）

人間によるチェックでは不十分なので、CI でパニックしうるコードを検出する。たとえば [no_panic](https://docs.rs/no-panic/latest/no_panic/) クレートを使う。

## キーワード

- [[panic|パニック]]
- [[error-handling|エラー処理]]
- [[webassembly|WebAssembly]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
