---
title: Web Worker
aliases: [Web Workers API]
description: Web コンテンツのスクリプトを、UI をブロックしないバックグラウンドのスレッドで動かすためのブラウザの API
tags: [word, フロントエンド, javascript]
date: 2025-01-31
---

## TL;DR

Web コンテンツのスクリプトを、バックグラウンドの[[thread|スレッド]]で動かすためのブラウザの API。重い処理を UI をブロックせずに実行できる。

## なぜ必要か

ブラウザの [[javascript|JavaScript]] は、通常メインスレッドで動く。メインスレッドで重い処理をすると、その間 UI が反応しなくなる。Web Worker を使えば、重い処理を別のスレッドに逃がせる。

## 仕組み

Worker は `window` とは別のグローバルコンテキストで動き、その中では `window` の代わりに `self` を使う。`fetch()` などでネットワークリクエストを送れるほか、WebSocket や IndexedDB も使える。

メインスレッドと Worker は、`postMessage()` でメッセージを送り、`onmessage` で受け取る。データは共有されず、構造化複製アルゴリズムでコピーされる。`ArrayBuffer` のような Transferable オブジェクトは、コピーせずに所有権ごと移せる。

Worker には次の種類がある。

- 専用ワーカー（Dedicated Worker）: `new Worker()` で作り、作ったスクリプトだけが使える。
- 共有ワーカー（Shared Worker）: `new SharedWorker()` で作り、複数のウィンドウや iframe から `port` を通して使える。
- [[service-worker|Service Worker]]: Web アプリ、ブラウザ、ネットワークの間のプロキシとして動き、オフライン対応やプッシュ通知に使う。

## 例

```js
// main.js
const myWorker = new Worker("worker.js")
myWorker.postMessage([3, 4])
myWorker.onmessage = (e) => {
  console.log(`Received: ${e.data}`) // Received: Result: 12
}
```

```js
// worker.js
onmessage = (e) => {
  postMessage(`Result: ${e.data[0] * e.data[1]}`)
}
```

## 注意点

Worker から DOM を直接操作することはできず、`window` のメソッドやプロパティの多くも使えない。ページを変更したいときは、メインスレッドにメッセージを送り、メインスレッド側で変更する。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[service-worker|Service Worker]]
- [[worker-thread|ワーカースレッド]]
- [[partytown|Partytown]]

## 出典

- [Web Worker の使用 - MDN](https://developer.mozilla.org/ja/docs/Web/API/Web_Workers_API/Using_web_workers)
- [Using Web Workers - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)
