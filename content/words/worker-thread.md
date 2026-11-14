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

## 例

```js
const worker = new Worker("worker.js")
```

## 注意点

2024 年現在、JavaScript の言語自体にはマルチスレッドの機能はなく、シングルスレッドで動く。ワーカースレッドは、ブラウザが提供している機能である。

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
