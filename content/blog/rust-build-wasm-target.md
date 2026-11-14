---
title: Rust のビルドターゲットを WASM にしてビルドする
description: rustup で WASM 向けのビルドターゲットを追加し、cargo build の --target で指定すると、Rust のコードを .wasm ファイルとして出力できる
tags: [blog, rust]
date: 2024-10-16
draft: false
---

## TL;DR

- `rustup target add` で WASM 向けのビルドターゲット（`wasm32-wasip1` など）を追加し、`cargo build --target` で指定すると、[[rust|Rust]] のコードを [[webassembly|WebAssembly]] のファイルとして出力できる。

## 背景

Rust のコードをビルドして、WASM ファイルとして出力したかった。

## 検証

まず `rustup target list` で、WASM をビルドターゲットとして指定できるかを確かめる。

```sh
$ rustup target list
aarch64-apple-darwin (installed)
...
# WASM に関するアーキテクチャ
wasm32-unknown-emscripten
wasm32-unknown-unknown (installed)
wasm32-wasi
wasm32-wasip1
wasm32-wasip1-threads
...
```

WASM に関するターゲットは 5 つあり、それぞれ次の違いがある。

- `wasm32-unknown-emscripten`: [Emscripten](https://emscripten.org/) を使って WASM にコンパイルする
- `wasm32-unknown-unknown`: 実行環境について何も前提を持たない、最小限のターゲット
- `wasm32-wasi`: [[wasi|WASI]] を対象にしたターゲット
- `wasm32-wasip1`: WASI の Preview1 に対応したターゲット
- `wasm32-wasip1-threads`: `wasm32-wasip1` にスレッドのサポートを足したターゲットで、マルチスレッドの処理ができる

使いたいターゲットに `(installed)` が付いていなければ、`rustup target add` で追加する。

```sh
$ rustup target add wasm32-wasip1
info: downloading component 'rust-std' for 'wasm32-wasip1'
info: installing component 'rust-std' for 'wasm32-wasip1'
```

もう一度 `rustup target list` を実行すると、`(installed)` が付いている。

```sh
$ rustup target list
...
wasm32-wasip1 (installed)
...
```

最後に、`cargo build` の `--target` オプションで WASM のアーキテクチャを指定してビルドする。

```sh
$ cargo build --target wasm32-wasip1
```

## 結果

成果物として `./target/wasm32-wasip1/release/hello-world.wasm` が出力された。

## 考察

上に挙げたアーキテクチャであれば、どれを選んでも WASM ファイルが生成されるようである。

## キーワード

- [[rust|Rust]]
- [[webassembly|WebAssembly]]
- [[wasi|WASI]]

## 参考

- [Emscripten](https://emscripten.org/)
