---
title: cargo-component
aliases: []
description: Rust で WebAssembly Component を作成、ビルド、公開するための Cargo の拡張ツール
tags: [word, rust, webassembly]
date: 2024-10-18
---

## TL;DR

[[webassembly-component|WebAssembly Component]] を簡単に作れるようにする [[cargo|Cargo]] の拡張ツール。

## 仕組み

主なサブコマンドは次のとおり。

| サブコマンド | 説明                                                                                        |
| ------------ | ------------------------------------------------------------------------------------------- |
| `new`        | WebAssembly Component を作るための Rust プロジェクトを作成する                              |
| `build`      | WebAssembly Component をビルドする                                                          |
| `publish`    | 作成した WebAssembly Component をレジストリ（[[wa-dev                                       | wa.dev]] など）に公開する |
| `serve`      | `wasi:http/proxy` を実装したプロジェクトをビルドし、できた WebAssembly Component を実行する |

## 注意点

ターゲットを指定せずにビルドすると、`wasm32-wasip1`（[[wasi|WASI]] Preview 1）がターゲットになる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[webassembly-component-model|WebAssembly Component Model]]
- [[wasmtime|Wasmtime]]
- [[wac]]
- [[wasm-tools]]

## 出典

- [bytecodealliance/cargo-component](https://github.com/bytecodealliance/cargo-component)
- [cargo-component の Usage](https://github.com/bytecodealliance/cargo-component?tab=readme-ov-file#usage)
