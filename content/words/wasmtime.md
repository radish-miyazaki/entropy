---
title: Wasmtime
aliases: []
description: WebAssembly Component をコンパイルし、サンドボックスの中で実行する WASM の処理系
tags: [word, webassembly]
date: 2024-10-18
---

## TL;DR

[[wasm-runtimes|WASM の処理系]]の 1 つ。[[webassembly-component|WebAssembly Component]] をコンパイルし、[[sandbox|サンドボックス]]の中で実行する。

## 仕組み

[[rust|Rust]] などのコードからも、CLI からも実行できる。CLI は [[cargo|Cargo]] でインストールできる。

```sh
$ cargo install wasmtime-cli
```

## 例

サンドボックスの中で動くので、Component からはシェルと異なるファイルシステムが見える。シェルからは見えるファイルも、Wasmtime 上の Component からは存在しないものとして扱われる。アクセスさせたいディレクトリは、実行時に `--dir` で明示する。

```sh
$ wasmtime --dir . target/wasm32-wasip1/debug/grep-wasi.wasm file src/main.rs
```

環境変数も切り離されている。次のコードは、`cargo run` で実行すると設定されている環境変数の一覧を表示するが、Wasmtime 上で実行すると何も表示しない。

```rust
use std::env;

fn main() {
    for (key, value) in env::vars() {
        println!("{key}: {value}");
    }
}
```

## 注意点

ファイルシステムと環境変数のほか、[[socket|ソケット]]の状態や、Component が使うメモリ空間も、Wasmtime が動く環境から切り離されている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[wasm-runtimes|WASM の処理系]]
- [[wasi|WASI]]
- [[webassembly-component-model|WebAssembly Component Model]]
- [[cargo-component]]

## 出典

- [Wasmtime](https://wasmtime.dev/)
- [Wasmtime ドキュメント](https://docs.wasmtime.dev/introduction.html)
- [Wasmtime CLI](https://docs.wasmtime.dev/cli.html)
- [Wasmtime をコードから使う](https://docs.wasmtime.dev/lang.html)
- [bytecodealliance/wasmtime](https://github.com/bytecodealliance/wasmtime)
