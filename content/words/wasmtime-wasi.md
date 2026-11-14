---
title: wasmtime-wasi
aliases: []
description: WASI で定義されたインタフェースの実装を、WebAssembly Component を利用するホストコード向けに提供する Rust のクレート
tags: [word, rust, webassembly]
date: 2024-10-22
---

## TL;DR

[[wasi|WASI]] で定義されているインタフェースの実装を、ホストコード（[[webassembly-component|WebAssembly Component]] を利用しているコード）向けに提供する [[rust|Rust]] の[[crate|クレート]]。

## 仕組み

ソースコードは [[wasmtime|Wasmtime]] と同じリポジトリで管理されている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[wasmtime|Wasmtime]]
- [[wasi|WASI]]
- [[webassembly-component|WebAssembly Component]]

## 出典

- [wasmtime_wasi - docs.rs](https://docs.rs/wasmtime-wasi/latest/wasmtime_wasi/)
- [bytecodealliance/wasmtime - GitHub](https://github.com/bytecodealliance/wasmtime)
