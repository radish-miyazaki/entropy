---
title: no_std
aliases: []
description: Rust のクレートが std を使わず、core（と alloc）だけで動くことを示す属性
tags: [word, rust]
date: 2026-11-14
---

## TL;DR

[[rust|Rust]] のクレートが標準ライブラリの `std` を使わず、`core`（必要なら `alloc`）だけで動くことを示す属性。OS のない環境で動くファームウェア、カーネル、[[bootloader|ブートローダ]]のコードに使う。

## なぜ必要か

The Embedded Rust Book によると、ホスト環境では POSIX などの OS のインタフェースが、ファイル、ネットワーク、メモリ管理、スレッドの機能を提供する。一方、[[bare-metal|ベアメタル]]環境には OS がなく、プログラムより前に読み込まれるコードもない。`std` は OS の抽象化と、`main` の前にスタックオーバーフローの保護やコマンドライン引数の処理を行うランタイムを含むので、こうした環境では使えない。

## 仕組み

クレートのトップレベル（`src/lib.rs`）に `#![no_std]` を付ける。`core` は標準ライブラリのうちプラットフォームに依存しない部分で、浮動小数点数、文字列、スライスなどの基本型と、アトミック操作や SIMD を提供する。ヒープのアロケータは持たない。

ヒープを使うには、`alloc` クレートとアロケータを用意する。`Vec` や `BTreeMap` などのコレクションには、グローバルアロケータの設定が要る。安全な乱数生成器がないので、`HashMap` と `HashSet` は使えない。

## 例

[[Effective Rust 項目33 ライブラリコードをno_std互換にすることを検討しよう|Effective Rust 項目33]] では、一部の機能だけ `std` が必要なら、フィーチャで切り替える書き方を紹介している。

```rust
#![cfg_attr(not(feature = "std"), no_std)]

#[cfg(feature = "alloc")]
extern crate alloc;
```

## 注意点

[[Effective Rust]] によると、依存ライブラリが `std` に依存していてもコンパイラは警告しない。そこで、`thumbv6m-none-eabi` のような `std` のないターゲットへ[[cross-compilation|クロスコンパイル]]して、no_std 互換であることを [[continuous-integration|CI]] で確かめる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[bare-metal|ベアメタル]]
- [[freestanding-environment|フリースタンディング環境]]
- [[cross-compilation|クロスコンパイル]]

## 出典

- [A no_std Rust Environment - The Embedded Rust Book](https://docs.rust-embedded.org/book/intro/no-std.html)
- [[Effective Rust]]
