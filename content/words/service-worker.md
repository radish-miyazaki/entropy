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
