---
title: Effective Rust 項目34 C から Rust のコードを呼び出す
description: C から Rust の関数を呼び出すときの定義の仕方と、生ポインタ、ヒープメモリ、panic! の扱いで注意すべき点
tags: [book-chapter, rust]
date: 2025-01-26
book: "[[Effective Rust]]"
chapter: 34
---

## TL;DR

- C から Rust のコードを呼び出すには、関数に `extern "C"` と `#[no_mangle]` を、データ構造に `#[repr(C)]` を付ける。
- C から渡される[[raw-pointer|生ポインタ]]は、Rust の参照の前提（NULL でない、有効なメモリを指す）を満たすとは限らない。その確認はプログラマの役割である。

## 内容

[[Effective Rust 項目34 FFI境界を通過するものを制御しよう|項目34 FFI境界を通過するものを制御しよう]]のうち、C から Rust を呼び出す場合の話である。

### 定義の仕方

基本的には、Rust から C のコードを呼び出す場合と同じように定義すれば呼び出せる。

- 関数には `extern "C"` を付ける。
- Rust のシンボルはデフォルトで[[name-mangling|マングリング]]されるので、関数定義に `#[no_mangle]` を付ける。マングリングしないシンボルは他のすべてのシンボルと衝突しうるので、C に公開するシンボル名には接頭辞を付けることを検討する。
- データ構造には `#[repr(C)]` を付けて、メモリレイアウトを C と互換にする。

### 生ポインタを参照に変換する

C から渡されるポインタは生ポインタなので、操作するには参照に変換する必要がある。

```rust
#[no_mangle]
pub extern "C" fn add_contents(p: *const FfiStruct) -> u32 {
    // C から与えられた生ポインタを Rust の参照に変換
    let s: &FfiStruct = unsafe { &*p };
    s.integer + s.byte as u32
}
```

しかし、この定義では C 側から `NULL` を渡せてしまう。

```c
uint32_t result = add_contents(NULL);
```

Rust の参照が前提とする[[invariant|不変条件]]と保証を満たしているかを確かめるのは、プログラマの役割である。`as_ref` を使えば NULL を `None` として扱える。

```rust
#[no_mangle]
pub extern "C" fn add_contents(p: *const FfiStruct) -> u32 {
    let s = match unsafe { p.as_ref() } {
        Some(r) => r,
        None => return 0,
    };
    s.integer + s.byte as u32
}
```

### 生ポインタはヒープを指す

Rust のコードでは、メモリ安全性によって、無効になったスタック上の変数への参照が返ることはない（[[Effective Rust 項目8 参照型とポインタ型に慣れよう|項目8]]）。しかし生ポインタでは、これが起こりうる。

```rust
#[no_mangle]
pub extern "C" fn new_struct(v: u32) -> *mut FfiStruct {
    let mut s = FfiStruct::new(v);
    &mut s // 関数から抜けると無効になるスタック上のオブジェクトへの生ポインタを返す
}
```

そのため、生ポインタはスタックではなくヒープのメモリを指すべきである。ただし、`Box` 自体はスタック上にあり、関数が終わると `Box` と一緒にヒープのメモリも解放されるので（[[Effective Rust 項目14 生存期間とヒープ|生存期間とヒープ]]）、単に `Box` に入れるだけでは足りない。

代わりに [`Box::into_raw`](https://doc.rust-lang.org/std/boxed/struct.Box.html#method.into_raw) を使うと、`Box` を消費して、ヒープのメモリを管理する責任を呼び出し側が引き受けられる。

> After calling this function, the caller is responsible for the memory previously managed by the Box.

```rust
#[no_mangle]
pub extern "C" fn new_struct_heap(v: u32) -> *mut FfiStruct {
    let s = FfiStruct::new(v);
    let b = Box::new(s);
    Box::into_raw(b)
}
```

逆に [`Box::from_raw`](https://doc.rust-lang.org/std/boxed/struct.Box.html#method.from_raw) を使うと、生ポインタからヒープのメモリを管理する `Box` を作れる。この `Box` がドロップされると、メモリが解放される。

```rust
#[no_mangle]
pub extern "C" fn free_struct_raw(p: *mut FfiStruct) {
    if p.is_null() {
        return;
    }
    let _b = unsafe { Box::from_raw(p) };
}
```

ただし、C 側が誤って同じポインタで `free_struct_raw` を 2 回呼ぶと、二重解放になり[[undefined-behavior|未定義動作]]を引き起こす。これは Rust では防げない。

### panic! を FFI 境界の外に出さない

`panic!` が FFI 境界を越えると未定義動作になるので、越えないようにする。C はアンワインドでスタックが巻き戻ることを想定していないし、Rust 自身もパニックが FFI 境界を越えて伝わることを想定していない（[[Effective Rust 項目18 Don't panic|項目18 Don't panic]]）。

## キーワード

- [[ffi|FFI]]
- [[name-mangling|マングリング]]
- [[raw-pointer|生ポインタ]]
- [[invariant|不変条件]]
- 二重解放
- [[undefined-behavior|未定義動作]]
- [[rust|Rust]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
