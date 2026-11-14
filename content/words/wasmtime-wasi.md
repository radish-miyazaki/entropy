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

docs.rs のドキュメントによると、このクレートは複数のバージョンの WASI を Wasmtime のホスト側で実装したもので、[[tokio|Tokio]] とクレート独自の実装を組み合わせている。各操作は、デフォルトではプラットフォームのネイティブな機能で実装される。コアモジュール向けの WASIp1（`wasi_snapshot_preview1`）は `p1` モジュールで、Component 向けの WASIp2 は `p2` モジュールで提供される。WASIp3 の対応は実験的で、まだ不完全である。

主な型として、WASI の実装に必要な状態を `Store` ごとに持つ `WasiCtx`、それを作る `WasiCtxBuilder`、埋め込み側の型から `WasiCtx` を取り出すトレイト `WasiView` がある。

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
