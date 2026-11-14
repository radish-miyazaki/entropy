---
title: jco
aliases: []
description: JavaScript から WebAssembly Component を利用するためのコードを生成するツール
tags: [word, javascript, webassembly]
date: 2024-10-30
---

## TL;DR

[[javascript|JavaScript]] から [[webassembly-component|WebAssembly Component]] を利用するためのコードを生成するツール。[[bytecode-alliance|Bytecode Alliance]] が開発している。

## 仕組み

README によると、jco は JavaScript の WebAssembly エコシステム向けの多機能ツールを目指している。主に次のことができる。

- [[wit|WIT]] のワールドから、JavaScript や TypeScript のコンポーネントのプロジェクトを作る（`jco scaffold`）
- JavaScript や TypeScript から Component をビルドする
- Component を、[[nodejs|Node.js]] やブラウザで動く ES モジュールに変換する（トランスパイル）
- Component を単発のアプリケーションや Web サーバーとして実行する
- wasm-tools を JavaScript のライブラリとして使う

## 例

組み込みの [[wasi|WASI]] のワールドからプロジェクトを作ってビルドする例は、次のとおりである。

```sh
pnpm install @bytecodealliance/jco
pnpm exec jco scaffold my-command --wit builtin:wasi-command
cd my-command
pnpm install
pnpm build
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[webassembly-component|WebAssembly Component]]
- [[bytecode-alliance|Bytecode Alliance]]

## 出典

- [bytecodealliance/jco - GitHub](https://github.com/bytecodealliance/jco)
