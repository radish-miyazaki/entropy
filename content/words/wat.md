---
title: WAT
aliases: [WebAssembly Text format]
description: WebAssembly を人間が読んだり編集したりできるようにするための、S 式で書くテキスト形式
tags: [word, webassembly]
date: 2024-10-18
---

## TL;DR

[[webassembly|WebAssembly]] を人間が読んだり編集したりできるようにするためのテキスト形式。拡張子は `.wat` である。

## なぜ必要か

WASM ファイルはバイナリなので、そのままでは人間が読めない。WAT に変換すれば、ソースコードのように読める。

## 仕組み

WAT は [[lisp|Lisp]] と同じように [[s-expression|S 式]]で書く。たとえば `(type (;1;) (func (param i32)))` は、`(func (param i32))` という型に `;1;` という名前を付けている。

```wat
(module $hello_world-e14b9d39b15f9b16.wasm
  (type (;0;) (func))
  (type (;1;) (func (param i32)))
  (type (;2;) (func (param i32 i32)))
  (type (;3;) (func (param i32 i32) (result i32)))
  (type (;4;) (func (param i32) (result i32)))
  (type (;5;) (func (param i32 i32 i32) (result i32)))
  (type (;6;) (func (param i32 i32 i32)))
  (type (;7;) (func (param i32 i32 i32 i32) (result i32)))
  (type (;8;) (func (result i32)))
```

## 例

WASM ファイルと WAT は相互に変換できる。[[wasm-tools]] を使うと、`print` で WASM から WAT に、`parse` で WAT から WASM に変換できる。

```sh
# WASM ファイル → WAT
$ wasm-tools print target/wasm32-wasip1/release/hello-world.wasm > hello.wat

# WAT → WASM ファイル
$ wasm-tools parse hello.wat -o hello.wasm
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[webassembly|WebAssembly]]
- [[webassembly-module|WebAssembly Module]]
- [[wasm-tools]]

## 出典

- [[Rustで学ぶWebAssembly ―入門からコンポーネントモデルによる開発まで]]
- [WebAssembly テキスト形式の理解 | MDN](https://developer.mozilla.org/ja/docs/WebAssembly/Understanding_the_text_format)
