---
title: bindgen
aliases: [cargo-bindgen]
description: C と C++ のライブラリに対する Rust の FFI バインディングを自動で生成するツール
tags: [word, rust]
date: 2025-01-24
---

## TL;DR

C と C++ のライブラリに対する [[rust|Rust]] の FFI バインディングを自動で生成するツール。

## なぜ必要か

C のヘッダに合わせた Rust の型や関数宣言を手で書くと、間違いが入りやすい。bindgen を使えば、ヘッダからこれらを機械的に作れる。

## 仕組み

たとえば、2 つの整数フィールドを持つ構造体 `CoolStruct` と関数 `cool_function` を宣言した C のヘッダ `cool.h` を渡すと、同じフィールドを持つ `#[repr(C)]` の Rust の構造体と、`extern "C"` の関数宣言を生成する。Rust のコードからは、生成された型と関数を使ってライブラリを呼び出せる。

`build.rs` からライブラリとして使う方法と、コマンドラインから使う方法がある。コマンドラインのツールは次のようにインストールする。

```sh
$ cargo install bindgen-cli
$ bindgen -V
bindgen 0.71.1
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[Effective Rust 項目35 手動でFFIマッピングを書かずにbindgenを用いよう]]
- [[Effective Rust 項目34 Rust から C のデータにアクセスする]]
- [[Effective Rust 項目31 ツールのエコシステムを活用しよう]]

## 出典

- [rust-lang/rust-bindgen](https://github.com/rust-lang/rust-bindgen)
- [Introduction - The bindgen User Guide](https://rust-lang.github.io/rust-bindgen/introduction.html)
