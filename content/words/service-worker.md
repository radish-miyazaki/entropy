---
title: Service Worker
aliases: []
description: サーバへのリクエストを横取りし、キャッシュから返すかネットワークから取得するかを決められる技術
tags: [word, web]
date: 2024-11-13
---

## TL;DR

Web サーバへのリクエストを横取りし、レスポンスをキャッシュから返すか、ネットワークから取得するかを決められる技術。[[javascript|JavaScript]] で制御する。

## なぜ必要か

ネットワークに接続できないときでも、リソースをキャッシュから取得できる。そのため、オフラインでもアプリを動かせ、モバイルアプリのような体験をユーザに提供できる。

## 仕組み

MDN によると、Service Worker は Web アプリケーション、ブラウザ、ネットワークの間に入るプロキシサーバのように振る舞う。ワーカーのコンテキストで動くので [[dom|DOM]] にはアクセスできず、メインの JavaScript とは別のスレッドで動いて、ほかの処理を妨げない。

`ServiceWorkerContainer.register()` で登録すると、ダウンロード、インストール、有効化の順に進む。`install` イベントではキャッシュの構築などの準備をし、`activate` イベントでは古いキャッシュを片付ける。`fetch` イベントでは、`FetchEvent.respondWith()` でレスポンスを自由に変えられる。プッシュ通知やバックグラウンド同期の API も使える。

## 注意点

完全に非同期に設計されているので、同期型の XHR や [[web-storage-api|Web Storage]] は使えない。セキュリティ上の理由から、HTTPS でしか動かない。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[pwa|PWA]]
- [[worker-thread|ワーカースレッド]]
- [[web-worker|Web Worker]]

## 出典

- [サービスワーカー API - MDN Web Docs](https://developer.mozilla.org/ja/docs/Web/API/Service_Worker_API)
