---
title: WebAssembly Component
aliases: []
description: WebAssembly Component Model に従って作られた WASM ファイル
tags: [word, webassembly]
date: 2024-10-18
---

## TL;DR

[[webassembly-component-model|WebAssembly Component Model]] に従って作られた [[webassembly|WebAssembly]] のファイル。

## なぜ必要か

Component Model のドキュメントによると、コアモジュールの関数がやりとりできるのは整数と浮動小数点数だけである。文字列などは線形メモリ上のオフセットと長さに直して渡すしかなく、メモリの共有は命名の約束に頼っている。言語ごとにメモリレイアウトの前提が違うので、異なる言語で書いたモジュールをつなぐと誤りが起きやすい。

## 仕組み

Component は、コアモジュールとは別のバイナリ形式を持ち、中に含むモジュールの import と export だけで外とやりとりする。メモリを export できないので、他の Component が読むメモリに書き込んで通信することはできない。この制約がサンドボックスを強め、ガベージコレクションを使う Component と線形メモリを使う Component をつなげるようにしている。

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

## 出典

- [Why the Component Model? - The WebAssembly Component Model](https://component-model.bytecodealliance.org/design/why-component-model.html)
