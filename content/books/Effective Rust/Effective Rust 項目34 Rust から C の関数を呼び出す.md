---
title: Effective Rust › Rust から C の関数を呼び出す
description: Rust から C の関数を extern "C" で宣言して呼び出す方法と、FFI のコードが unsafe になること、サイズの決まった型を使うべきこと
tags: [book-chapter, rust]
date: 2025-01-25
book: "[[Effective Rust]]"
chapter: 34
---

## TL;DR

- C の関数は、`extern "C"` ブロックで宣言すれば Rust から呼び出せる。FFI の呼び出しは自動的に unsafe になる。
- FFI 境界では、`uint32_t` のようにサイズの決まった型を使う。
- C と Rust の宣言が食い違っても、ビルドツールは警告しない。

## 内容

[[Effective Rust 項目34 FFI境界を通過するものを制御しよう|項目34 FFI境界を通過するものを制御しよう]]のうち、Rust から C の関数を呼び出す場合の話である。

### extern "C" で宣言する

最も簡単な [[ffi|FFI]] の操作は、ポインタや参照、メモリアドレスが関わらない「値」を引数に取る C の関数を呼び出すことである。

```c
/* lib.c */
#include "lib.h"

int add(int x, int y) {
    return x + y;
}
```

この `add` を呼び出すには、Rust 側で次のように宣言する。

```rust
use std::os::raw::c_int;

extern "C" {
    pub fn add(x: c_int, y: c_int) -> c_int;
}
```

`extern "C"` は、関数の定義を外部の C のライブラリが提供することを示す。こうして宣言した関数は、[[name-mangling|マングリング]]されない。

### 注意点

Rust の FFI のコードは自動的に unsafe になるので、呼び出しを `unsafe { }` で囲む必要がある。[[Effective Rust 項目16 unsafeコードを書かないようにしよう|項目16]]のアドバイスは、ここでは当てはまらない。

FFI 境界では、サイズの決まった型を使おう。上のコードでは C の `int` を `c_int` に対応させているが、両者が等しいとは限らない。C 側では `<stdint.h>` の `uint32_t` などの型を使う。既存のコードが `int` や `long` を使っているなら、それは諦める。

マングリングされないのでリンク時には名前の一致しか見ず、関数のシグネチャは確かめないため、C と Rust の宣言が一致していなくてもビルドツールは警告せず、実行するまで分からない。回避策は [[Effective Rust 項目35 手動でFFIマッピングを書かずにbindgenを用いよう|項目35]] にある。

## キーワード

- [[ffi|FFI]]
- [[name-mangling|マングリング]]
- [[rust-bindgen|bindgen]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
