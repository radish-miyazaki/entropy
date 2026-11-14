---
title: WASI
aliases: [WebAssembly System Interface]
description: WebAssembly がブラウザの外で動くための、標準的なシステムインタフェースを定めた仕様
tags: [word, webassembly]
date: 2024-10-16
---

## TL;DR

[[webassembly|WebAssembly]] がブラウザの外で動くための、標準的な[[system-interface|システムインタフェース]]を定めた仕様。

## 仕組み

WASI はインタフェースをユースケースごとに定義している。

- `wasi:io`: ストリームを使った I/O 処理
- `wasi:clocks`: 経過時間の測定
- `wasi:random`: 乱数の生成
- `wasi:filesystem`: ファイル操作
- `wasi:sockets`: [[socket|ソケット]]通信
- `wasi:cli`: コマンドラインアプリケーション
- `wasi:http`: プロキシのような、[[http|HTTP]] のリクエストとレスポンスに対する処理

Preview 2 は [[webassembly-component-model|WebAssembly Component Model]] のインタフェースに従って作られている。

## 注意点

2024 年 10 月時点では、Preview 1（WASI 0.1）が広く使われており、対応するランタイムも多い。Preview 2（WASI 0.2）は開発中である。Preview 3 の議論も進んでおり、Preview 3 がそのまま Version 1 として標準化される予定である。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[system-interface|システムインタフェース]]
- [[webassembly-component-model|WebAssembly Component Model]]
- [[wasmtime|Wasmtime]]

## 出典

- [WASI.dev](https://wasi.dev/)
- [WebAssembly/WASI](https://github.com/WebAssembly/WASI)
- [WASI Issue #515](https://github.com/WebAssembly/WASI/issues/515)
