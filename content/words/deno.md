---
title: Deno
aliases: []
description: Ryan Dahl が Node.js の反省を踏まえて作った JavaScript / TypeScript ランタイム
tags: [word, javascript, typescript]
date: 2024-09-11
---

## TL;DR

Ryan Dahl が [[nodejs|Node.js]] の反省を踏まえて作った、[[javascript|JavaScript]] / [[typescript|TypeScript]] のランタイム。WebAssembly も実行できる。

## 仕組み

`.ts` ファイルを、`tsc` やビルド手順、設定なしでそのまま実行できる。

デフォルトで安全に動くよう設計されている。コードはサンドボックスの中で動き、許可を与えるまでファイル、ネットワーク、環境変数にアクセスできない。

HTTP サーバは `Deno.serve` で立て、Web 標準の `Request` と `Response` を使う。フォーマッタ（`deno fmt`）、リンタ（`deno lint`）、テストランナー（`deno test`）、タスクランナー（`deno task`）なども本体に含まれており、追加のパッケージを入れる必要がない。

`package.json` と `node_modules` を持つ Node.js のプロジェクトもそのまま動かせる。`npm:` での import と ES Modules を混ぜられるので、少しずつ移行できる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[deno-deploy|Deno Deploy]]
- [[nodejs|Node.js]]

## 出典

- [Deno](https://deno.com/)
- [Deno Runtime - Deno Docs](https://docs.deno.com/runtime/)
