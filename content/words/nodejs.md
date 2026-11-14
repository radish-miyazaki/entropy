---
title: Node.js
aliases: [Node]
description: 非同期のイベント駆動で動く、スケーラブルなネットワークアプリケーションのための JavaScript ランタイム
tags: [word, javascript]
date: 2026-11-14
---

## TL;DR

非同期のイベント駆動で動く [[javascript|JavaScript]] のランタイム。スケーラブルなネットワークアプリケーションを作るために設計されている。

## なぜ必要か

公式サイトによると、一般的な[[concurrency|並行処理]]のモデルは OS の[[thread|スレッド]]を使うが、スレッドを使うネットワーク処理は比較的非効率で、扱いもとても難しい。Node.js にはロックがないので、プロセスが[[deadlock|デッドロック]]する心配もない。

## 仕組み

Node.js はイベントループを、ライブラリではなくランタイムの構成要素として持つ。入力されたスクリプトを実行したあとに自動でイベントループに入り、実行するコールバックがなくなると抜ける。

Node.js の関数はほとんど I/O を直接行わないので、標準ライブラリの同期メソッドを使わない限りプロセスはブロックしない。[[http|HTTP]] は第一級の扱いで、ストリーミングと低遅延を考えて設計されている。

スレッドを持たない設計だが、`child_process.fork()` で子プロセスを作ったり、`cluster` モジュールでプロセス間でソケットを共有したりすれば、複数のコアを使える。

## 例

接続のたびにコールバックが呼ばれ、仕事がなければ Node.js は休む。

```javascript
const { createServer } = require("node:http")

const server = createServer((req, res) => {
  res.statusCode = 200
  res.setHeader("Content-Type", "text/plain")
  res.end("Hello World")
})

server.listen(3000, "127.0.0.1")
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[deno|Deno]]
- [[bun|Bun]]
- [[npm|npm]]
- [[typescript|TypeScript]]

## 出典

- [About Node.js](https://nodejs.org/en/about)
