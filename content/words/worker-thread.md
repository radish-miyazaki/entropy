---
title: ワーカースレッド
aliases: []
description: Web アプリケーションのパフォーマンスと応答性を上げるために、バックグラウンドで実行するスレッド
tags: [word, web, javascript]
date: 2024-11-13
---

## TL;DR

バックグラウンドで実行する[[thread|スレッド]]。Web アプリケーションのパフォーマンスと応答性を上げるために使う。

## なぜ必要か

重い計算や非同期処理をワーカースレッドで実行すれば、UI スレッドをブロックしないので、スムーズな操作を保てる。

## 仕組み

ワーカースレッドは、ユーザが制御できるスレッドである。[[javascript|JavaScript]] から起動できる。

MDN によると、メインスレッドとワーカーは、メッセージでデータをやりとりする。どちらも `postMessage()` で送り、`onmessage` で受け取る。データは共有されず、構造化複製でコピーされる。`ArrayBuffer` などの移譲可能オブジェクトはコピーせずに渡せるので、大きなデータを送るときに速い。移譲した元のオブジェクトは使えなくなる。

ワーカーには 2 種類ある。専用ワーカーは、起動したスクリプトだけが使える。共有ワーカーは、同じオリジンなら別のウィンドウや iframe からも使え、`port` オブジェクトを通して通信する。

## 例

```js
const worker = new Worker("worker.js")
```

MDN の例をもとにした、2 つの数の積をワーカーで計算するコードである。

```js
// main.js
worker.postMessage([2, 3])
worker.onmessage = (e) => {
  console.log(e.data)
}

// worker.js
onmessage = (e) => {
  postMessage(e.data[0] * e.data[1])
}
```

## 注意点

2024 年現在、JavaScript の言語自体にはマルチスレッドの機能はなく、シングルスレッドで動く。ワーカースレッドは、ブラウザが提供している機能である。

ワーカーから [[dom|DOM]] を直接操作することはできない。ページを変えたいときは、メインスレッドにメッセージを送り、メインスレッド側で変更する。一方、[[websocket|WebSocket]] や IndexedDB などは使える。

HTML Standard によると、ワーカーは起動とメモリのコストが高いので、大量に作ることは想定されていない。たとえば画像の 1 ピクセルごとにワーカーを作るのは適切ではない。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[web-worker|Web Worker]]
- [[service-worker|Service Worker]]
- [[thread|スレッド]]

## 出典

- [HTML Standard - Workers](https://html.spec.whatwg.org/multipage/#workers)
- [ウェブワーカーの使用 - MDN Web Docs](https://developer.mozilla.org/ja/docs/Web/API/Web_Workers_API/Using_web_workers)
