---
title: cargo-fuzz
aliases: []
description: libFuzzer を使って Rust のコードをファズテストする Cargo のサブコマンド
tags: [word, rust, cargo]
date: 2025-01-20
---

## TL;DR

[[libfuzzer|libFuzzer]] を使って [[rust|Rust]] のコードを[[fuzz-testing|ファズテスト]]するための Cargo のサブコマンド。

## 仕組み

Rust のコンパイラは [[llvm|LLVM]] で作られているので、libFuzzer の機能を Rust から利用できる。`cargo fuzz init` でファズテスト用のサブプロジェクト（`fuzz` ディレクトリ）を作り、`cargo fuzz add <ターゲット名>` でファズターゲットを足し、`cargo fuzz run <ターゲット名>` で実行する。

```rust
#![no_main]

use libfuzzer_sys::fuzz_target;

fuzz_target!(|data: &[u8]| {
    let _ = some_crate::is_fuzz(data);
});
```

## 注意点

- 不安定なコマンドラインフラグを使うので、nightly のコンパイラが必要である（`cargo +nightly fuzz run fuzz_target_1`）
- libFuzzer が LLVM のサニタイザに依存するため、x86-64 と Aarch64 の Unix 系 OS でしか動かない。Windows には対応していない
- ワークスペースのクレートでは、`fuzz` ディレクトリを `workspace.members` に加える必要がある

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[fuzz-testing|ファズテスト]]
- [[libfuzzer|libFuzzer]]
- [[Effective Rust 項目30 ユニットテスト以上のものを書こう]]
- [[Effective Rust 項目31 ツールのエコシステムを活用しよう]]

## 出典

- [rust-fuzz/cargo-fuzz](https://github.com/rust-fuzz/cargo-fuzz)
