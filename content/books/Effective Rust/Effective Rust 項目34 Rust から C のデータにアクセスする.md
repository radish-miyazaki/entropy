---
title: Effective Rust 項目34 Rust から C のデータにアクセスする
description: FFI で使う Rust の型には repr(C) を付けてメモリレイアウトを合わせ、文字列は CString と CStr で扱う
tags: [book-chapter, rust]
date: 2025-01-25
book: "[[Effective Rust]]"
chapter: 34
---

## TL;DR

- C と Rust では構造体のメモリレイアウトが違うので、FFI で使う Rust の型には `#[repr(C)]` を付ける。
- C と Rust では文字列の定義がまったく違うので、所有する文字列は `CString`、借用する文字列は `CStr` で扱う。

## 内容

[[Effective Rust 項目34 FFI境界を通過するものを制御しよう|項目34 FFI境界を通過するものを制御しよう]]のうち、Rust から C のデータにアクセスする場合の話である。

### 構造体

C も Rust も、関連するデータを 1 つにまとめるのに構造体を使う。しかし、各フィールドをメモリ上のどこにどの順で置くか（[メモリレイアウト](https://doc.rust-lang.org/reference/type-layout.html)）は異なる。この食い違いを防ぐために、FFI で使う Rust の型には `#[repr(C)]` を付ける。

```c
/* この構造体を変えたら、lib.rs にも反映する */
typedef struct {
    uint8_t byte;
    uint32_t integer;
} FfiStruct;
```

```rust
/// この構造体を変えたら、lib.h と lib.c にも反映する
#[repr(C)]
pub struct FfiStruct {
    pub byte: u8,
    pub integer: u32,
}
```

関数のときと同じく、定義が一致していなくてもビルドツールは警告しない。[[rust-bindgen|bindgen]] で生成し、一致していることを [[continuous-integration|CI]] で確かめる（[[Effective Rust 項目35 手動でFFIマッピングを書かずにbindgenを用いよう|項目35]]）。

### 文字列

Rust と C では、文字列のデフォルトの定義がまったく違う。Rust の `String` は [[utf-8|UTF-8]] でエンコードされたデータを持ち、長さを明示的に管理する。データにゼロバイト（`\0`）を含んでもよく、`"Hello\0World"` の長さは 11 バイトである。一方、C の `char *` は（符号の有無が決まっていない）バイト値を持ち、長さはデータ内で最初に現れるゼロバイトで暗黙に決まる。`"Hello\0World"` の長さは 5 バイトになる。

この違いを埋めるために、C の文字列を所有するときは [`CString`](https://doc.rust-lang.org/std/ffi/struct.CString.html) 型、借用するときは [`CStr`](https://doc.rust-lang.org/std/ffi/struct.CStr.html) 型で扱う。[`CStr::as_ptr`](https://doc.rust-lang.org/std/ffi/struct.CStr.html#method.as_ptr) を使うと、C の文字列（`const char*`）を受け取る FFI の関数にデータを渡せる。ただし `const` なので、渡した先で文字列の内容を書き換える必要がある場合には使えない。

## キーワード

- [[ffi|FFI]]
- メモリレイアウト
- [[utf-8|UTF-8]]
- [[rust-bindgen|bindgen]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
