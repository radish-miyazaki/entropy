---
title: WebAssembly Instance
aliases: []
description: WebAssembly Module を実行できる状態にしたもの
tags: [word, webassembly]
date: 2024-10-18
---

## TL;DR

[[webassembly-module|WebAssembly Module]] を実行できる状態にしたもの。

## 仕組み

処理は[[sandbox|サンドボックス]]の中で行われるので、ブラウザが持つリソースにはアクセスできない。たとえば JavaScript の変数にはアクセスできない。

## 例

JavaScript では `WebAssembly.instantiateStreaming` でモジュールをコンパイルし、インスタンス化する。戻り値の `instance`（`WebAssembly.Instance`）の `exports` から、export section で宣言された関数を呼べる。

```js
const { module, instance } = await WebAssembly.instantiateStreaming(fetch("add.wasm"))
const four = instance.exports.add_two(2)
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[webassembly-module|WebAssembly Module]]
- [[webassembly-component-model|WebAssembly Component Model]]

## 出典

- [[Rustで学ぶWebAssembly ―入門からコンポーネントモデルによる開発まで]]
- [WebAssembly.instantiateStreaming() | MDN](https://developer.mozilla.org/ja/docs/WebAssembly/JavaScript_interface/instantiateStreaming_static)
- [WebAssembly.Module.exports() | MDN](https://developer.mozilla.org/ja/docs/WebAssembly/JavaScript_interface/Module/exports_static)
