---
title: Effective Rust 項目34 Rust から C のライブラリを呼び出す
description: Rust から C のライブラリをリンクするには、link 属性か build.rs の cargo:rustc-link-lib で指定し、Cargo.toml の links キーで依存を伝える
tags: [book-chapter, rust]
date: 2025-01-25
book: "[[Effective Rust]]"
chapter: 34
---

## TL;DR

- C のライブラリは、`#[link(name = "...")]` 属性か、`build.rs` で `cargo:rustc-link-lib` を出力して指定する。
- 依存関係を Cargo に伝えるには、[[cargo-toml|Cargo.toml]] の `links` キーを使う。

## 内容

[[Effective Rust 項目34 FFI境界を通過するものを制御しよう|項目34 FFI境界を通過するものを制御しよう]]のうち、Rust から C のライブラリを呼び出す場合の話である。

C のツールチェーンがライブラリを作る方法や形式は、環境によって異なる。たとえば Unix 系では、`ar` コマンドで `libcffi.a` のような[[static-library|静的ライブラリ]]を作って使う。

Rust のビルドシステムでは、使う C のライブラリを次のように指定する。

```rust
#[link(name = "cffi")] // libcffi.a が必要
extern "C" {
    // ...
}
```

ビルドスクリプトの `build.rs` で `cargo:rustc-link-lib` を出力しても指定できる。

```rust
fn main() {
    println!("cargo:rustc-link-lib=cffi");
}
```

この依存関係を Cargo に認識させるには、`Cargo.toml` の `links` キーを使う。

```toml
[package]
links = "cffi"
```

## キーワード

- [[ffi|FFI]]
- [[static-library|静的ライブラリ]]
- [[cargo-toml|Cargo.toml]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%
