---
title: WebAssembly Component
aliases: []
description: WebAssembly Component Model に従って作られた WASM ファイル
tags: [word, webassembly]
date: 2024-10-18
---

## TL;DR

[[webassembly-component-model|WebAssembly Component Model]] に従って作られた [[webassembly|WebAssembly]] のファイル。

## 仕組み

大きく 2 種類に分けられる。1 つは CLI として実行できるもので、[[rust|Rust]] のバイナリクレートに近い。もう 1 つは他のプログラムの一部として動くもので、Rust のライブラリクレートに近い。

インタフェースは [[wit|WIT]] で定義する。[[cargo-component]] でビルドし、[[wasmtime|Wasmtime]] で実行し、[[wac]] で他の Component と合成できる。ライブラリとして作った Component は、[[warg|Warg]] に対応したレジストリで配布できる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[webassembly-component-model|WebAssembly Component Model]]
- [[webassembly-module|WebAssembly Module]]
- [[wit|WIT]]
